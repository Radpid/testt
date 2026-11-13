#!/usr/bin/env python3
"""
Génère la voix de la vidéo avec ElevenLabs (ta voix clonée) + le minutage exact de chaque mot.

    export ELEVENLABS_API_KEY=...            (Windows PowerShell : $env:ELEVENLABS_API_KEY="...")
    python tools/tts_elevenlabs.py videos/pneumothorax --voice yassine
    python tools/tts_elevenlabs.py videos/pneumothorax --voice yassine --model eleven_multilingual_v2 --out voice.v2

Produit dans le dossier de la vidéo :
    voice.wav          la voix (volume -14 LUFS, 0,3 s de silence au début)
    timings.js         minutage mot par mot (lu par la page)
    voice.tts.json     réponse brute (alignement caractère par caractère), pour vérifier

La clé n'est jamais écrite sur le disque par cet outil : elle est lue dans la variable d'environnement.
"""
import argparse
import base64
import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.request

API = "https://api.elevenlabs.io/v1"
LEAD = 0.3  # silence ajouté au début (s)


def load_beats(path):
    src = open(path, encoding="utf-8").read()
    m = re.search(r"window\.BEATS\s*=\s*(\[.*\])\s*;?", src, re.S)
    if not m:
        sys.exit(f"Format inattendu dans {path}")
    body = re.sub(r"//[^\n]*", "", m.group(1))
    body = re.sub(r",\s*([\]\}])", r"\1", body)
    return [{"id": b[0], "text": b[1]} if isinstance(b, list) else b for b in json.loads(body)]


def call(method, path, key, payload=None, query=""):
    req = urllib.request.Request(API + path + query, method=method, headers={"xi-api-key": key, "Content-Type": "application/json"},
                                 data=json.dumps(payload).encode() if payload is not None else None)
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"ElevenLabs {e.code} : {e.read().decode(errors='ignore')[:500]}")


def find_voice(key, name_or_id):
    voices = call("GET", "/voices", key)["voices"]
    for v in voices:
        if v["voice_id"] == name_or_id or v["name"].lower() == name_or_id.lower():
            return v
    names = ", ".join(f"{v['name']} ({v['category']})" for v in voices if v["category"] != "premade")
    sys.exit(f"Voix « {name_or_id} » introuvable. Voix perso du compte : {names}")


def tts_text(word):
    # le tatweel (ـ) aide l'affichage "الـPleuralinie" mais gêne la prononciation
    return word.replace("ـ", "")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("dir", help="dossier de la vidéo (contient beats.js)")
    ap.add_argument("--voice", required=True, help="nom ou id de la voix (ex. yassine)")
    ap.add_argument("--model", default="eleven_v4")
    ap.add_argument("--stability", type=float, default=0.5)
    ap.add_argument("--similarity", type=float, default=0.85)
    ap.add_argument("--style", type=float, default=0.15)
    ap.add_argument("--speed", type=float, default=1.0)
    ap.add_argument("--format", default="mp3_44100_128")
    ap.add_argument("--out", default="voice", help="nom de base des fichiers produits (défaut : voice)")
    ap.add_argument("--no-timings", action="store_true", help="ne pas écraser timings.js (essai d'une autre voix)")
    ap.add_argument("--reuse", action="store_true", help="réutiliser l'audio déjà généré si le texte n'a pas changé")
    args = ap.parse_args()

    key = os.environ.get("ELEVENLABS_API_KEY")
    if not key and not args.reuse:
        sys.exit("Définis la variable ELEVENLABS_API_KEY")
    vdir = os.path.abspath(args.dir)
    beats = load_beats(os.path.join(vdir, "beats.js"))

    # texte envoyé + position de chaque mot dans ce texte
    parts, spans, pos = [], [], 0
    for bi, b in enumerate(beats):
        for wi, w in enumerate(b["text"].split()):
            t = tts_text(w)
            if parts:
                parts.append(" ")
                pos += 1
            spans.append((bi, wi, pos, pos + len(t)))
            parts.append(t)
            pos += len(t)
    text = "".join(parts)

    raw = os.path.join(vdir, args.out + ".el.mp3")
    cache = os.path.join(vdir, args.out + ".tts.json")
    cached = json.load(open(cache, encoding="utf-8")) if os.path.exists(cache) and os.path.exists(raw) else None
    if args.reuse and cached and cached.get("text") == text:
        # même texte : on réutilise l'audio déjà généré (aucun caractère consommé)
        voice = {"name": cached["voice"]}
        args.model = cached["model"]
        al = cached["alignment"]
        print(f"réutilisation de {os.path.basename(raw)} (texte inchangé, aucun appel à ElevenLabs)")
    else:
        if args.reuse:
            print("texte modifié depuis la dernière génération : nouvel appel à ElevenLabs")
        voice = find_voice(key, args.voice)
        print(f"voix : {voice['name']} ({voice['voice_id']}, {voice['category']}) · modèle : {args.model} · {len(text)} caractères")
        payload = {
            "text": text,
            "model_id": args.model,
            "voice_settings": {"stability": args.stability, "similarity_boost": args.similarity, "style": args.style,
                               "use_speaker_boost": True, "speed": args.speed},
        }
        res = call("POST", f"/text-to-speech/{voice['voice_id']}/with-timestamps", key, payload, f"?output_format={args.format}")
        al = res.get("alignment") or res.get("normalized_alignment")
        if not al:
            sys.exit("Réponse sans alignement : " + json.dumps({k: v for k, v in res.items() if k != "audio_base64"})[:400])
        with open(raw, "wb") as f:
            f.write(base64.b64decode(res["audio_base64"]))
        with open(cache, "w", encoding="utf-8") as f:
            json.dump({"voice": voice["name"], "model": args.model, "text": text, "alignment": al}, f, ensure_ascii=False)

    chars, st, en = al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]
    if "".join(chars) != text:
        print("attention : le texte aligné diffère du texte envoyé, alignement approximatif")
    n = len(chars)

    # volume -14 LUFS (normalisation en 2 passes) + petit silence au début
    wav = os.path.join(vdir, args.out + ".wav")
    # compression type "voix réseaux sociaux" -> mesure -> gain vers -14 LUFS -> limiteur -1,5 dBTP
    comp = "highpass=f=70,acompressor=threshold=-24dB:ratio=3.5:attack=4:release=90:knee=4"
    r = subprocess.run(["ffmpeg", "-y", "-hide_banner", "-i", raw, "-af", f"{comp},loudnorm=I=-14:TP=-1.5:print_format=json", "-f", "null", "-"],
                       capture_output=True, text=True)
    meas = json.loads(r.stderr[r.stderr.rindex("{"):r.stderr.rindex("}") + 1])
    gain = -13.6 - float(meas["input_i"])
    second = f"{comp},volume={gain:.2f}dB,alimiter=limit=0.84:attack=2:release=50:level=false"
    r = subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", raw, "-af", f"{second},adelay={int(LEAD * 1000)}:all=1",
                        "-ar", "48000", "-ac", "1", wav], capture_output=True)
    if r.returncode:
        sys.exit("ffmpeg : " + r.stderr.decode(errors="ignore"))
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", wav],
                               capture_output=True, text=True).stdout.strip())

    out = []
    for bi, b in enumerate(beats):
        ws = []
        for (sbi, wi, a, z) in spans:
            if sbi != bi:
                continue
            a2, z2 = min(a, n - 1), min(max(a, z - 1), n - 1)
            ws.append([round(st[a2] + LEAD, 3), round(en[z2] + LEAD, 3)])
        out.append({"id": b["id"], "start": ws[0][0], "end": ws[-1][1], "words": ws, "conf": 1.0})

    if not args.no_timings:
        timings = {"audio": os.path.basename(wav), "duration": round(dur, 3), "source": f"elevenlabs:{voice['name']}:{args.model}", "beats": out}
        with open(os.path.join(vdir, "timings.js"), "w", encoding="utf-8") as f:
            f.write("// généré par tools/tts_elevenlabs.py — relance l'outil après chaque changement de beats.js\n")
            f.write("window.TIMINGS = " + json.dumps(timings, ensure_ascii=False) + ";\n")
    for b, o in zip(beats, out):
        print(f"  {b['id']:<5}{o['start']:7.2f}{o['end']:7.2f}  {b['text']}")
    print(f"OK -> {wav} ({dur:.1f} s)" + ("" if args.no_timings else " + timings.js"))


if __name__ == "__main__":
    main()
