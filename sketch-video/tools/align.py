#!/usr/bin/env python3
"""
Aligne ton enregistrement vocal sur le script (beats.js) et produit timings.js.

    python tools/align.py videos/pneumothorax/voice.m4a
    python tools/align.py videos/pneumothorax/voice.m4a --model medium      (plus précis, plus lent)
    python tools/align.py videos/pneumothorax/voice.m4a --no-clean          (garder l'audio tel quel)

Étapes :
  1. nettoyage de la voix (ffmpeg) : coupe-bas, débruitage léger, compression, volume -14 LUFS
     -> voice.clean.wav (c'est ce fichier qui sera mis dans la vidéo)
  2. transcription mot par mot avec faster-whisper (le script sert d'indice de vocabulaire)
  3. alignement "phonétique" script <-> transcription : on compare les squelettes de consonnes,
     ce qui marche même quand Whisper écrit "نوموثوراكس" pour "Pneumothorax"
  4. écrit timings.js (lu par la page) et timings.report.txt (qualité par beat)

Le darija n'a pas besoin d'être bien transcrit : seul le rythme compte, le texte affiché
vient toujours de beats.js.
"""
import argparse
import difflib
import json
import os
import re
import subprocess
import sys

SR = 16000

# ---------------------------------------------------------------------------
# squelette phonétique commun arabe / latin (consonnes regroupées par familles)
# ---------------------------------------------------------------------------
AR_MAP = {
    "ب": "B", "پ": "B",
    "ت": "T", "ط": "T", "د": "T", "ض": "T", "ث": "T", "ذ": "T", "ظ": "T",
    "ك": "K", "ق": "K", "گ": "K", "ڭ": "K",
    "س": "S", "ص": "S", "ز": "S",
    "ش": "C", "ج": "C", "ژ": "C",
    "ف": "F", "ڤ": "F", "ڥ": "F",
    "ح": "H", "ه": "H",
    "خ": "X",
    "ر": "R", "غ": "R",
    "ل": "L", "م": "M", "ن": "N",
}
LAT_RULES = [  # appliqués dans l'ordre, sur du texte en minuscules
    ("sch", "C"), ("sh", "C"), ("ch", "X"), ("ph", "F"), ("th", "T"), ("ck", "K"), ("qu", "K"),
    ("tz", "S"), ("x", "KS"), ("ß", "S"),
]
LAT_MAP = {
    "b": "B", "p": "B",
    "t": "T", "d": "T",
    "k": "K", "q": "K", "g": "K", "c": "K",
    "s": "S", "z": "S",
    "j": "C",
    "f": "F", "v": "F", "w": "F",
    "h": "H",
    "r": "R", "l": "L", "m": "M", "n": "N",
}
DIGITS = {"0": "SFR", "1": "FHT", "2": "TSF", "3": "TLT", "4": "RBH", "5": "KMS", "6": "ST", "7": "SBH", "8": "TMN", "9": "TSH"}


def skeleton(word):
    """Squelette de consonnes d'un mot (arabe, allemand ou mélange)."""
    w = word.lower()
    out = []
    i = 0
    while i < len(w):
        ch = w[i]
        if ch in AR_MAP:
            out.append(AR_MAP[ch])
            i += 1
            continue
        hit = False
        for src, dst in LAT_RULES:
            if w.startswith(src, i):
                out.append(dst)
                i += len(src)
                hit = True
                break
        if hit:
            continue
        if ch in LAT_MAP:
            out.append(LAT_MAP[ch])
        elif ch in DIGITS:
            out.append(DIGITS[ch])
        i += 1
    # lettres doublées -> une seule ("Kenntnis" -> KNTNS)
    s = "".join(out)
    return re.sub(r"(.)\1+", r"\1", s)


# ---------------------------------------------------------------------------
def load_beats(path):
    src = open(path, encoding="utf-8").read()
    m = re.search(r"window\.BEATS\s*=\s*(\[.*\])\s*;?", src, re.S)
    if not m:
        sys.exit(f"Format inattendu dans {path} (attendu : window.BEATS = [...])")
    body = re.sub(r"//[^\n]*", "", m.group(1))          # commentaires
    body = re.sub(r",\s*([\]\}])", r"\1", body)         # virgules finales
    beats = []
    for b in json.loads(body):
        if isinstance(b, list):
            beats.append({"id": b[0], "text": b[1]})
        else:
            beats.append({"id": b["id"], "text": b["text"]})
    return beats


def ffmpeg(*args):
    r = subprocess.run(["ffmpeg", "-y", "-v", "error", *args], capture_output=True)
    if r.returncode != 0:
        sys.exit("ffmpeg a échoué : " + r.stderr.decode(errors="ignore"))
    return r.stdout


def clean_audio(src, dst):
    chain = ",".join([
        "highpass=f=75",
        "afftdn=nf=-28",                       # débruitage léger
        "acompressor=threshold=-20dB:ratio=3:attack=5:release=90:makeup=2",
        "loudnorm=I=-14:TP=-1.5:LRA=7",        # volume standard réseaux sociaux
    ])
    ffmpeg("-i", src, "-af", chain, "-ar", "48000", "-ac", "1", dst)


def load_pcm(path):
    import numpy as np
    raw = ffmpeg("-i", path, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-")
    return np.frombuffer(raw, dtype=np.float32)


def transcribe(audio, model_name, prompt):
    from faster_whisper import WhisperModel
    model = WhisperModel(model_name, device="auto", compute_type="int8")
    segs, _ = model.transcribe(audio, language="ar", word_timestamps=True, initial_prompt=prompt,
                               beam_size=5, vad_filter=False, condition_on_previous_text=False)
    words = []
    for s in segs:
        for w in s.words or []:
            words.append((float(w.start), float(w.end), w.word.strip()))
        print(f"  [{s.start:6.1f}] {s.text.strip()}", flush=True)
    return words


# ---------------------------------------------------------------------------
def align(beats, hyp_words, total_dur):
    """Retourne pour chaque beat la liste [start, end] de chacun de ses mots."""
    # script -> liste de mots avec leur squelette
    sw = []
    for bi, b in enumerate(beats):
        for w in b["text"].split():
            sw.append({"beat": bi, "text": w, "sk": skeleton(w)})
    ref, ref_owner = [], []
    for wi, w in enumerate(sw):
        for ci, c in enumerate(w["sk"]):
            ref.append(c)
            ref_owner.append((wi, ci))
    hyp, hyp_time = [], []
    for (s, e, t) in hyp_words:
        sk = skeleton(t)
        n = len(sk)
        for ci, c in enumerate(sk):
            hyp.append(c)
            hyp_time.append(s + (e - s) * (ci + 0.5) / n)

    # temps de chaque caractère du script quand il est apparié
    char_t = {}
    sm = difflib.SequenceMatcher(None, ref, hyp, autojunk=False)
    for a, b, size in sm.get_matching_blocks():
        if size < 2 and size > 0:      # ignore les correspondances isolées d'un seul caractère
            continue
        for k in range(size):
            char_t[a + k] = hyp_time[b + k]

    # temps par mot du script
    CH = 0.075  # durée moyenne d'une consonne prononcée (s)
    for wi, w in enumerate(sw):
        n = len(w["sk"])
        ts = [(ci, char_t.get(i)) for i, (owi, ci) in enumerate(ref_owner) if owi == wi and char_t.get(i) is not None]
        if ts and n:
            first_ci, first_t = ts[0]
            last_ci, last_t = ts[-1]
            w["start"] = first_t - (first_ci + 0.5) * CH
            w["end"] = last_t + (n - last_ci - 0.5) * CH
            w["conf"] = len(ts) / n
        else:
            w["start"] = w["end"] = None
            w["conf"] = 0.0

    # interpolation des mots non appariés (au prorata des lettres)
    weight = [max(1, len(w["text"])) for w in sw]
    known = [i for i, w in enumerate(sw) if w["start"] is not None]
    if not known:
        sys.exit("Aucune correspondance entre le script et l'audio : vérifie que c'est le bon enregistrement.")
    first_t = hyp_words[0][0] if hyp_words else 0.0
    last_t = hyp_words[-1][1] if hyp_words else total_dur
    anchors = [(-1, first_t)] + [(i, sw[i]["start"]) for i in known] + [(len(sw), last_t)]
    for (ia, ta), (ib, tb) in zip(anchors, anchors[1:]):
        gap = [i for i in range(ia + 1, ib)]
        if not gap:
            continue
        t_from = sw[ia]["end"] if ia >= 0 and sw[ia]["end"] is not None else ta
        span = max(0.0, tb - t_from)
        tot = sum(weight[i] for i in gap) or 1
        acc = 0
        for i in gap:
            sw[i]["start"] = t_from + span * acc / tot
            acc += weight[i]
            sw[i]["end"] = t_from + span * acc / tot

    # monotonie
    t = 0.0
    for w in sw:
        w["start"] = max(w["start"], t)
        w["end"] = max(w["end"], w["start"] + 0.05)
        t = w["start"]
    for i in range(len(sw) - 1):
        sw[i]["end"] = min(sw[i]["end"], max(sw[i + 1]["start"], sw[i]["start"] + 0.05))

    out = []
    for bi, b in enumerate(beats):
        ws = [w for w in sw if w["beat"] == bi]
        conf = sum(w["conf"] * len(w["sk"]) for w in ws) / max(1, sum(len(w["sk"]) for w in ws))
        out.append({
            "id": b["id"],
            "start": round(ws[0]["start"], 3),
            "end": round(ws[-1]["end"], 3),
            "words": [[round(w["start"], 3), round(w["end"], 3)] for w in ws],
            "conf": round(conf, 2),
        })
    return out


def main():
    ap = argparse.ArgumentParser(description="Aligne la voix sur beats.js et écrit timings.js")
    ap.add_argument("audio", help="ton enregistrement (wav, m4a, mp3…)")
    ap.add_argument("--dir", help="dossier de la vidéo (par défaut : dossier de l'audio)")
    ap.add_argument("--model", default="small", help="modèle Whisper : small (défaut), medium, large-v3…")
    ap.add_argument("--no-clean", action="store_true", help="ne pas nettoyer l'audio")
    ap.add_argument("--max-seconds", type=float, default=None, help="(test) n'utiliser que le début de l'audio")
    args = ap.parse_args()

    vdir = os.path.abspath(args.dir or os.path.dirname(os.path.abspath(args.audio)))
    beats = load_beats(os.path.join(vdir, "beats.js"))
    src = os.path.abspath(args.audio)

    if args.no_clean:
        final_audio = src
        if args.max_seconds:
            final_audio = os.path.join(vdir, "voice.cut.wav")
            ffmpeg("-i", src, "-t", str(args.max_seconds), final_audio)
    else:
        final_audio = os.path.join(vdir, "voice.clean.wav")
        print("1/3 nettoyage de la voix ->", os.path.relpath(final_audio, vdir))
        tmp = src
        if args.max_seconds:
            tmp = os.path.join(vdir, "voice.cut.wav")
            ffmpeg("-i", src, "-t", str(args.max_seconds), tmp)
        clean_audio(tmp, final_audio)

    pcm = load_pcm(final_audio)
    duration = len(pcm) / SR
    # Indice de vocabulaire : seulement les mots latins (termes allemands), jamais les phrases
    # du script — sinon Whisper croit que ce texte a déjà été dit et saute le début de l'audio.
    vocab = []
    for b in beats:
        for w in re.findall(r"[A-Za-zÀ-ÿĀ-ž][A-Za-zÀ-ÿĀ-ž\-]+", b["text"]):
            if w not in vocab:
                vocab.append(w)
    prompt = (", ".join(vocab)[:300] + ".") if vocab else None
    print(f"2/3 transcription ({args.model}, {duration:.1f} s d'audio)…")
    hyp = transcribe(pcm, args.model, prompt)

    print("3/3 alignement…")
    res = align(beats, hyp, duration)
    timings = {"audio": os.path.relpath(final_audio, vdir).replace(os.sep, "/"), "duration": round(duration, 3), "beats": res}
    with open(os.path.join(vdir, "timings.js"), "w", encoding="utf-8") as f:
        f.write("// généré par tools/align.py — ne pas modifier à la main (relance l'outil)\n")
        f.write("window.TIMINGS = " + json.dumps(timings, ensure_ascii=False) + ";\n")
    lines = [f"{'beat':<6}{'début':>8}{'fin':>8}  qualité  texte"]
    for b, r in zip(beats, res):
        flag = "  <-- à vérifier" if r["conf"] < 0.35 else ""
        lines.append(f"{b['id']:<6}{r['start']:>8.2f}{r['end']:>8.2f}  {int(r['conf'] * 100):>5}%   {b['text']}{flag}")
    lines.append("")
    lines.append("Transcription Whisper (pour info) :")
    lines.append(" ".join(w[2] for w in hyp))
    report = "\n".join(lines)
    with open(os.path.join(vdir, "timings.report.txt"), "w", encoding="utf-8") as f:
        f.write(report + "\n")
    print(report.split("\nTranscription")[0])
    print(f"\nOK -> {os.path.join(vdir, 'timings.js')}")


if __name__ == "__main__":
    main()
