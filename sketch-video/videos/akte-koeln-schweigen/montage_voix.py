# Montage v3 de la voix : par phrase, plusieurs prises (enregistrement principal + reprises de l'auteur),
# voix isolée par ElevenLabs, rythme resserré, puis accélération légère (atempo, hauteur conservée).
# Usage : python3 edl3.py <dossier takes/>  -> voice_v3.wav (non masterisé) + edl3.json
import json, subprocess, sys, os, wave
import numpy as np

D = sys.argv[1]                 # prises de l'épisode (raw.iso.mp3 + scribe.json)
D_INTRO = sys.argv[2]           # intro de l'auteur (intro.iso.mp3 + intro.scribe2.json), commune à la série
SR = 48000
TEMPO = float(os.environ.get("TEMPO", "1.3"))

def load(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).copy()
def words_of(js):
    return [w for w in json.load(open(js))["words"] if w.get("type") != "spacing"]

# --- égalisation d'appariement : les reprises (micro plus proche, autre réglage) prennent le timbre de l'original
def speech_of(a, ws):
    return np.concatenate([a[int(w["start"] * SR):int(w["end"] * SR)] for w in ws if w.get("type", "word") == "word"])
NF = 4096; FQ = np.fft.rfftfreq(NF, 1 / SR)
def psd(x):
    win = np.hanning(NF); P = np.zeros(NF // 2 + 1); k = 0
    for i in range(0, len(x) - NF, NF // 2): P += np.abs(np.fft.rfft(x[i:i + NF] * win)) ** 2; k += 1
    return P / max(k, 1)
def smooth_oct(P, frac=6):
    out = np.empty_like(P)
    for i, f in enumerate(FQ):
        if f < 20: out[i] = P[i]; continue
        lo, hi = f * 2 ** (-1 / (2 * frac)), f * 2 ** (1 / (2 * frac))
        out[i] = P[(FQ >= lo) & (FQ <= hi)].mean()
    return out
def match(x, ws, ref_psd, ref_rms):
    g = 10 * np.log10(ref_psd / (smooth_oct(psd(speech_of(x, ws))) + 1e-20) + 1e-20)
    ref = g[(FQ >= 800) & (FQ <= 2500)].mean(); g -= ref               # on ne touche qu'au timbre ici
    g = np.clip(g, -14, 9); g[FQ < 60] = -14; g[FQ > 15000] = np.minimum(g[FQ > 15000], 6)
    h = np.fft.irfft(10 ** (g / 20), NF); h = np.roll(h, NF // 2) * np.hanning(NF)   # FIR phase linéaire
    L = len(x) + NF; nfft = 1 << (L - 1).bit_length()
    y = np.fft.irfft(np.fft.rfft(x, nfft) * np.fft.rfft(h, nfft), nfft)[NF // 2: NF // 2 + len(x)].astype(np.float32)
    y *= ref_rms / (np.sqrt(np.mean(speech_of(y, ws) ** 2)) + 1e-12)   # même niveau que l'original
    return y
raw_a, raw_w = load(os.path.join(D, "raw.iso.mp3")), words_of(os.path.join(D, "scribe.json"))
raw_sp = speech_of(raw_a, raw_w); REF_PSD = smooth_oct(psd(raw_sp)); REF_RMS = float(np.sqrt(np.mean(raw_sp ** 2)))
intro_w = words_of(os.path.join(D_INTRO, "intro.scribe2.json"))
SRC = {"raw": (raw_a, raw_w), "intro": (match(load(os.path.join(D_INTRO, "intro.iso.mp3")), intro_w, REF_PSD, REF_RMS), intro_w)}   # intro égalisée sur cet enregistrement

R = lambda a, b: list(range(a, b + 1))
BEATS = [   # AKTE 03 « ما قالت والو » (OLG Köln 2025) — phrases de SA voix (indices Scribe)
  ("b1", [("raw", R(0, 5))]), ("b2", [("raw", R(6, 16))]), ("b3", [("raw", R(17, 24))]),
  ("b4", [("raw", R(25, 37))]),                                  # boucle ouverte : le mot allemand, dit à la fin
  ("i1", [("intro", R(0, 4))]), ("i2", [("intro", R(5, 16))]), ("i3", [("intro", R(17, 25))]),
  ("b5", [("raw", R(50, 59))]),                                  # la patiente, Hysteroskopie
  ("b6", [("raw", R(60, 71))]),                                  # ce que c'est : caméra + liquide (montré en coupe)
  ("b7", [("raw", R(72, 83))]),                                  # le bloc : Oberärztin (depuis 1 mois) + Assistenzärztin
  ("b8", [("raw", R(96, 104))]),                                 # Dr. K veut tester l'appareil
  ("b9", [("raw", R(105, 111))]), ("b10", [("raw", R(112, 118))]), ("b11", [("raw", R(119, 125))]),
  ("b12", [("raw", R(126, 134))]),                               # ce qu'elle se dit : la hiérarchie
  ("b13", [("raw", R(135, 145))]),                               # elle savait : l'Oberärztin ne l'avait jamais fait
  ("b14", [("raw", R(164, 172))]),                               # Hämolyse
  ("b15", [("raw", R(190, 196))]), ("b16", [("raw", R(197, 207))]),   # 11:30, réanimation… puis scène muette
  ("b17", [("raw", R(208, 211))]), ("b18", [("raw", R(212, 222))]), ("b19", [("raw", R(223, 227))]),
  ("b20", [("raw", R(228, 238))]), ("b21", [("raw", R(246, 254))]),
  ("b22", [("raw", R(264, 278))]), ("b23", [("raw", R(279, 283))]),
]   # retirés : « كون كنت أنت في بلاصة… تهضر؟ » (pas de question au milieu) et l'appel à commenter dit à la fin (écrit à l'écran)
FIX_INTRO = {0: "أنا", 1: "ياسين،", 2: "طبيب", 3: "فألمانيا.", 4: "", 5: "فهاد", 6: "", 7: "السلسلة", 8: "كنحكي", 9: "ليكم",
             10: "قصص", 11: "حقيقية", 12: "من", 13: "المحاكم", 14: "الألمانية،", 15: "باش|نتعلمو", 16: "منها.", 17: "إلا",
             18: "عجباتك،", 19: "دير", 20: "j'aime", 21: "و|abonne،", 22: "باش|ما", 23: "تفوتكش", 24: "القصة", 25: "الجاية."}
FIX = {("raw", k): v for k, v in {20: "قررت.", 5: "ألمانيا،", 59: "Hysteroskopie.", 201: "Réanimation،", 203: "رجع،", 213: "2025،",
       108: "Wasser،", 71: "مزيان.", 134: "Assistenzärztin.", 145: "العملية."}.items()}
FIX.update({("intro", k): v for k, v in FIX_INTRO.items()})
# Rythme : enchaîné ; pause seulement quand le contexte change complètement (valeurs AVANT x1,3).
SCENE_START = {"b4", "i1", "b5", "b7", "b14", "b15", "b17", "b20", "b22"}
EXTRA = {"b16": 4.2}   # scène muette après « ما فاقتش » (le lendemain, ~24 h : ligne plate) ≈ 3,2 s
RANGE = {"inner": (0.0, 0.22), "beat": (0.09, 0.2), "scene": (0.48, 0.6)}
TARGET = {"inner": 0.07, "beat": 0.14, "scene": 0.55}
XF = 0.02
PAUSE_BEFORE = {("raw", 50): 0.65}   # fin de l'intro → début de l'histoire

def quietest(A, t0, t1, win=0.03):
    if t1 - t0 < 0.012: return (t0 + t1) / 2
    seg = A[int(t0 * SR):int(t1 * SR)]
    if len(seg) < int(win * SR) + 2: return (t0 + t1) / 2
    e = np.convolve(seg ** 2, np.ones(int(win * SR)) / int(win * SR), mode="same")
    return t0 + int(np.argmin(e)) / SR

seq = []
for bid, parts in BEATS:
    flat = [(src, i) for src, idx in parts for i in idx]
    for j, (src, i) in enumerate(flat):
        kind = None if not seq else ("inner" if j > 0 else ("scene" if bid in SCENE_START else "beat"))
        seq.append({"src": src, "i": i, "beat": bid, "last": j == len(flat) - 1, "kind": kind})

W = lambda e: SRC[e["src"]][1][e["i"]]
AU = lambda e: SRC[e["src"]][0]
pieces = []   # (src, a, b, fill_before)
w0 = W(seq[0])
cur = (seq[0]["src"], quietest(AU(seq[0]), max(0, w0["start"] - 0.2), w0["start"] - 0.02)); fill_before = 0.15
for k in range(1, len(seq)):
    p, q = seq[k - 1], seq[k]
    wp, wq = W(p), W(q)
    extra = EXTRA.get(p["beat"], 0) if p["last"] else 0
    lo, hi = RANGE[q["kind"]]; lo += extra; hi += extra
    PB = PAUSE_BEFORE.get((q["src"], q["i"]), 0); lo = max(lo, PB); hi = max(hi, PB)   # pause imposée, même entre mots qui se suivent
    same = p["src"] == q["src"]
    contiguous = same and q["i"] == p["i"] + 1
    gap = wq["start"] - wp["end"]
    if contiguous and lo <= gap <= hi: continue
    if contiguous and gap < lo:
        c = quietest(AU(p), wp["end"] - 0.02, wq["start"] + 0.02)
        pieces.append((cur[0], cur[1], c, fill_before)); cur, fill_before = (q["src"], c), lo - gap
        continue
    target = hi if contiguous else TARGET[q["kind"]] + extra
    target = max(target, PAUSE_BEFORE.get((q["src"], q["i"]), 0))
    Wp, Wq = SRC[p["src"]][1], SRC[q["src"]][1]
    nxt_after = Wp[p["i"] + 1]["start"] if p["i"] + 1 < len(Wp) else wp["end"] + 0.4
    prv_before = Wq[q["i"] - 1]["end"] if q["i"] > 0 else max(0, wq["start"] - 0.4)
    tail = quietest(AU(p), wp["end"] + 0.03, min(nxt_after - 0.01, wp["end"] + min(0.2, target / 2 + 0.05)))
    head = quietest(AU(q), max(prv_before + 0.01, wq["start"] - min(0.16, target / 2 + 0.03)), wq["start"] - 0.015)
    tail = max(tail, wp["end"] + 0.01); head = min(head, wq["start"] - 0.005)
    fill = max(0.0, target - (tail - wp["end"]) - (wq["start"] - head))
    pieces.append((cur[0], cur[1], tail, fill_before)); cur, fill_before = (q["src"], head), fill
we = W(seq[-1])
pieces.append((cur[0], cur[1], quietest(AU(seq[-1]), we["end"] + 0.05, we["end"] + 0.3), fill_before))

out = np.zeros(0, np.float32); maps = []
nx = int(XF * SR); fin = np.sin(np.linspace(0, np.pi / 2, nx)) ** 2; fout = 1 - fin
def append(x):
    global out
    if len(out) >= nx and len(x) >= nx:
        o = len(out) - nx
        out = np.concatenate([out[:o], out[o:] * fout + x[:nx] * fin, x[nx:]]).astype(np.float32); return o
    o = len(out); out = np.concatenate([out, x]).astype(np.float32); return o
for src, a, b, f in pieces:
    if f > 0: append(np.zeros(int((f + XF) * SR), np.float32))
    o = append(SRC[src][0][int(a * SR):int(b * SR)])
    maps.append((src, a, b, o / SR))
out = np.concatenate([out, np.zeros(int(0.4 * SR), np.float32)])

def piece_of(src, t):
    for m in maps:
        if m[0] == src and m[1] - 1e-3 <= t <= m[2] + 1e-3: return m
    raise ValueError(f"mot hors des morceaux : {src} {t}")

out_beats = []
for bid, parts in BEATS:
    toks = []
    for src, idx in parts:
        for i in idx:
            w = SRC[src][1][i]
            _, pa, pb, po = piece_of(src, w["start"])
            s0 = (po + w["start"] - pa) / TEMPO; e0 = (po + min(w["end"], pb) - pa) / TEMPO
            text = FIX.get((src, i), w["text"].strip('"'))
            if text == "" and toks: toks[-1][2] = e0
            elif "|" in text:
                p1, p2 = text.split("|"); m = (s0 + e0) / 2
                toks.append([p1, s0, m]); toks.append([p2, m, e0])
            else: toks.append([text, s0, e0])
    merged = []
    for t in toks:
        if merged and merged[-1][0].endswith("ـ"): merged[-1] = [merged[-1][0] + t[0], merged[-1][1], t[2]]   # « الـ », « والـ », « للـ » collés au mot suivant
        else: merged.append(t)
    out_beats.append({"id": bid, "text": " ".join(x[0] for x in merged), "words": [[round(x[1], 3), round(x[2], 3)] for x in merged],
                      "start": round(merged[0][1], 3), "end": round(merged[-1][2], 3)})

tmp = os.path.join(D, "edited3_1x.wav")
with wave.open(tmp, "wb") as wf:
    wf.setnchannels(1); wf.setsampwidth(2); wf.setframerate(SR); wf.writeframes((np.clip(out, -1, 1) * 32767).astype("<i2").tobytes())
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", tmp, "-af", f"atempo={TEMPO}", "-ar", str(SR), "-ac", "1", os.path.join(D, "edited3.wav")], check=True)
dur = len(out) / SR / TEMPO
json.dump({"duration": round(dur, 3), "tempo": TEMPO, "beats": out_beats}, open(os.path.join(D, "edl3.json"), "w"), ensure_ascii=False, indent=1)
print(f"edited3.wav : {dur:.1f} s (tempo x{TEMPO}), {len(pieces)} morceaux")
for b in out_beats: print(f"{b['id']:>5} {b['start']:6.2f}-{b['end']:6.2f}  {b['text']}")

