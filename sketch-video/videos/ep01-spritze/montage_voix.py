# Montage v3 de la voix : par phrase, plusieurs prises (enregistrement principal + reprises de l'auteur),
# voix isolée par ElevenLabs, rythme resserré, puis accélération légère (atempo, hauteur conservée).
# Usage : python3 edl3.py <dossier takes/>  -> voice_v3.wav (non masterisé) + edl3.json
import json, subprocess, sys, os, wave
import numpy as np

D = sys.argv[1]
SR = 48000
TEMPO = float(os.environ.get("TEMPO", "1.12"))

def load(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).copy()
def words_of(js):
    return [w for w in json.load(open(js))["words"] if w.get("type") != "spacing"]

SRC = {"raw": (load(os.path.join(D, "raw.iso.mp3")), words_of(os.path.join(D, "../voice_in/scribe_scribe_v2.json")))}
for n in (6, 7, 9, 10, 11, 12):
    SRC[f"t{n}"] = (load(os.path.join(D, f"take{n}.iso.mp3")), words_of(os.path.join(D, f"take{n}.scribe.json")))
SRC["raw"][1][103]["start"] = 61.02     # « Hier » : Scribe y avait collé la pause (inutilisé ici, gardé pour mémoire)

R = lambda a, b: list(range(a, b + 1))
BEATS = [
  ("b1", [("raw", R(0, 8))]), ("b2", [("raw", R(9, 15))]), ("b3", [("raw", R(16, 31))]), ("b4", [("raw", R(32, 42))]),
  ("b5", [("raw", R(45, 57))]),
  ("b6", [("raw", [59, 60, 61, 63, 64, 65, 66, 68, 69, 70, 71, 72])]),
  ("b7", [("raw", R(73, 79))]),
  ("b8", [("t7", [0, 1, 3, 4, 5, 6, 7, 8, 9]), ("raw", [90])]),                 # reprise 7 (sans « آآ ») + « Refobacin »
  ("b9", [("raw", R(91, 100))]),                                                 # sans « وقالت الأم »
  ("b10", [("t9", [0, 1, 3, 4, 8, 9, 10, 11, 12, 13, 14])]),                     # reprise 9 sans « آآآ » ni « الريفوباسين اللي هو »
  ("b11", [("raw", R(108, 115))]), ("b12", [("raw", R(116, 123))]),
  ("b13", [("raw", [125, 126, 127, 129, 131, 132, 133, 134, 135])]), ("b14", [("raw", [137, 138, 139, 140, 142, 143, 145, 146, 147])]),
  ("b15", [("raw", R(148, 160))]), ("b16", [("raw", [162, 163, 165, 166, 167, 168, 169])]),
  ("b17", [("raw", R(170, 174))]),                                              # sans « وما بقاش » (scène muette à la place)
  ("b18", [("raw", R(181, 192))]),
  ("b19", [("raw", R(194, 197)), ("t10", R(0, 4))]),                             # + « يعني تهمة القتل الغير العمد »
  ("b20", [("raw", R(198, 201))]), ("b21", [("raw", R(202, 208))]),
  ("b21b", [("t11", R(0, 8))]),                                                  # « يعني القاضي قال أنه كان عليه على الأقل يسأل »
  ("b22", [("t6", R(0, 3)), ("raw", R(213, 215))]),                              # reprise 6 + « وكانو باغيين الحبس »
  ("b23", [("raw", R(216, 221) + [228, 229, 230, 227] + R(234, 237))]),
  ("b24", [("raw", R(238, 246))]), ("b25", [("raw", R(247, 249))]),
  ("b26", [("t12", R(0, 10))]),                                                  # reprise 12
  ("b27", [("raw", [261, 263, 264, 265, 267, 268, 269, 270, 271])]),
  ("b28", [("raw", R(272, 280))]), ("b29", [("raw", R(281, 291))]),
]
FIX = {("raw", k): v for k, v in {8: "العمدي،", 21: "بيضا", 49: "Bébé", 100: "Bébé،", 156: "Bébé", 90: "Refobacin.", 114: "الـRefobacin.", 115: "",
       98: "حدا", 168: "Intensivstation.", 169: "", 170: "دازت", 151: "دقيقة،", 158: "وكيتنفس", 159: "", 160: "بجهد.", 174: "Réanimation.", 176: "بقاش.", 186: "بدل", 187: "كاع",
       196: "fahrlässige", 197: "Tötung،", 215: "الحبس.", 221: "Approbation،", 230: "ليه،", 227: "ولكن", 247: "Was|ist", 249: "drin?",
       246: "كامل:", 135: "القثطير،", 72: "Service.", 280: "عيب.", 116: "إيجي،",
       202: "Da", 208: "müssen."}.items()}
FIX.update({("t7", 9): "العرق،", ("t9", 14): "الفم.", ("t10", 4): "العمد.", ("t11", 8): "يسأل.", ("t6", 3): "القاعة،",
            ("t12", 0): "الحقنة", ("t12", 10): "تحقنهاش."})
SCENE_START = {"b3", "b5", "b6", "b7", "b9", "b11", "b13", "b15", "b18", "b19", "b22", "b24", "b26", "b28"}
EXTRA = {"b17": 4.6, "b12": 0.35}   # b17 : scène muette « مات الـBébé » + flatline
RANGE = {"inner": (0.0, 0.3), "beat": (0.14, 0.32), "scene": (0.24, 0.42)}
TARGET = {"inner": 0.12, "beat": 0.22, "scene": 0.32}
XF = 0.02

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
    same = p["src"] == q["src"]
    contiguous = same and q["i"] == p["i"] + 1
    gap = wq["start"] - wp["end"]
    if contiguous and lo <= gap <= hi: continue
    if contiguous and gap < lo:
        c = quietest(AU(p), wp["end"] - 0.02, wq["start"] + 0.02)
        pieces.append((cur[0], cur[1], c, fill_before)); cur, fill_before = (q["src"], c), lo - gap
        continue
    target = hi if contiguous else TARGET[q["kind"]] + extra
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
        if merged and merged[-1][0] == "الـ": merged[-1] = ["الـ" + t[0], merged[-1][1], t[2]]
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
