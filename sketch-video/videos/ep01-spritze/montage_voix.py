# Montage v2 de la voix, PAR PHRASE (v1 coupait chaque mot -> voix saccadée).
# Usage : python3 montage_voix.py <dossier contenant raw.m4a + scribe_scribe_v2.json>  (modèle pour les prochains épisodes)
# - l'audio reste continu tant que les mots gardés se suivent dans l'enregistrement ;
# - on coupe seulement : mots retirés (hésitations, répétitions), pauses trop longues ;
# - coupes au point le plus silencieux de la pause, fondus enchaînés de 20 ms,
#   blancs remplis avec le fond sonore réel de la pièce (pas de silence numérique).
# Sortie : edited2.wav + edl2.json (minutage mot par mot dans le nouvel audio).
import json, subprocess, sys, os
import numpy as np

D = sys.argv[1]
sys.path.insert(0, os.path.dirname(__file__))
SR = 48000
words = [w for w in json.load(open(os.path.join(D, "scribe_scribe_v2.json")))["words"] if w.get("type") != "spacing"]
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", os.path.join(D, "raw.m4a"), "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                     capture_output=True, check=True).stdout
A = np.frombuffer(raw, np.float32).copy()
# Scribe a collé la pause + la respiration au début de « Hier » (59,86 -> 61,3) : vrai début mesuré à l'énergie
words[103]["start"] = 61.02

R = lambda a, b: list(range(a, b + 1))
BEATS = [
  ("b1", R(0, 8)), ("b2", R(9, 15)), ("b3", R(16, 31)), ("b4", R(32, 42)),
  ("b5", R(45, 57)),
  ("b6", [59, 60, 61, 63, 64, 65, 66, 68, 69, 70, 71, 72]),
  ("b7", R(73, 79)), ("b8", [80, 81, 82, 83, 84, 86, 87, 88, 90]),
  ("b9", R(91, 102)), ("b10", R(103, 107)),
  ("b11", R(108, 115)), ("b12", R(116, 123)),
  ("b13", [125, 126, 127, 129, 131, 132, 133, 134, 135]), ("b14", [137, 138, 139, 140, 142, 143, 145, 146, 147]),
  ("b15", R(148, 160)), ("b16", [162, 163, 165, 166, 167, 168, 169]),
  ("b17", R(170, 176)),
  ("b18", R(181, 192)),
  ("b19", R(194, 197)), ("b20", R(198, 201)), ("b21", R(202, 208)),
  ("b22", R(209, 215)), ("b23", R(216, 221) + [228, 229, 230, 227] + R(234, 237)),
  ("b24", R(238, 246)), ("b25", R(247, 249)), ("b26", R(250, 260)), ("b27", [261, 263, 264, 265, 267, 268, 269, 270, 271]),
  ("b28", R(272, 280)), ("b29", R(281, 291)),
]
FIX = {8: "العمدي،", 21: "بيضا", 49: "Bébé", 100: "Bébé،", 156: "Bébé", 90: "Refobacin.", 114: "الـRefobacin.", 115: "",
       98: "حدا", 168: "Intensivstation.", 169: "", 170: "تلت", 174: "Réanimation،", 176: "بقاش.", 186: "بدل", 187: "كاع",
       196: "fahrlässige", 212: "القاعة،", 215: "الحبس.", 221: "Approbation،", 230: "ليه،", 227: "ولكن", 247: "Was|ist", 249: "drin?",
       246: "كامل:", 135: "القثطير،", 72: "Service.", 280: "عيب.", 116: "إيجي،",
       103: "Hier", 107: "Antibiotikum.", 202: "Da", 208: "müssen."}
SCENE_START = {"b3", "b5", "b6", "b7", "b9", "b11", "b13", "b15", "b18", "b19", "b22", "b24", "b26", "b28"}
EXTRA = {"b17": 1.6, "b12": 0.7}           # silence voulu après ces phrases
# pause entre deux mots gardés : (min, max) si les mots se suivent dans l'enregistrement ; cible si on a retiré des mots
RANGE = {"inner": (0.0, 0.42), "beat": (0.28, 0.55), "scene": (0.5, 0.8)}
TARGET = {"inner": 0.18, "beat": 0.4, "scene": 0.65}
XF = 0.02                                   # fondu enchaîné

# fond sonore de la pièce : la pause la plus longue et la plus calme
gaps = sorted(((words[i + 1]["start"] - words[i]["end"], words[i]["end"]) for i in range(len(words) - 1)), reverse=True)
g, s = gaps[0]
ROOM = A[int((s + 0.4) * SR):int((s + g - 0.4) * SR)].copy()

def room(d):
    n = int(round(d * SR))
    if n <= 0: return np.zeros(0, np.float32)
    rep = np.tile(ROOM, n // len(ROOM) + 1)[:n]
    return rep.astype(np.float32)

FR = int(0.005 * SR)
def quietest(t0, t1, win=0.03):
    """instant le plus silencieux (fenêtre glissante de 30 ms) dans [t0, t1]"""
    if t1 - t0 < 0.012: return (t0 + t1) / 2
    seg = A[int(t0 * SR):int(t1 * SR)]
    if len(seg) < FR * 2: return (t0 + t1) / 2
    e = np.convolve(seg ** 2, np.ones(int(win * SR)) / int(win * SR), mode="same")
    return t0 + int(np.argmin(e)) / SR

# séquence plate des mots gardés, avec le type de frontière avant chaque mot
seq = []
for bid, idx in BEATS:
    for j, i in enumerate(idx):
        kind = None if not seq else ("inner" if j > 0 else ("scene" if bid in SCENE_START else "beat"))
        seq.append({"i": i, "beat": bid, "first": j == 0, "last": j == len(idx) - 1, "kind": kind})

# découpe en morceaux continus [a, b] de l'enregistrement + blancs à insérer entre eux
pieces = []   # (a, b, fill_before)
start = quietest(max(0, words[seq[0]["i"]]["start"] - 0.2), words[seq[0]["i"]]["start"] - 0.02)
cur_a, fill_before = start, 0.25
for k in range(1, len(seq)):
    p, q = seq[k - 1], seq[k]
    wp, wq = words[p["i"]], words[q["i"]]
    extra = EXTRA.get(p["beat"], 0) if p["last"] else 0
    kind = q["kind"]
    lo, hi = RANGE[kind]; lo += extra; hi += extra
    contiguous = q["i"] == p["i"] + 1
    gap = wq["start"] - wp["end"]
    if contiguous and lo <= gap <= hi:
        continue                                   # rien à couper : la phrase reste naturelle
    if contiguous and gap < lo:                    # allonger : insérer du fond au point le plus calme
        c = quietest(wp["end"] - 0.02, wq["start"] + 0.02)
        pieces.append((cur_a, c, fill_before)); cur_a, fill_before = c, lo - gap
        continue
    # raccourcir une pause trop longue, ou recoller par-dessus des mots retirés
    target = hi if contiguous else TARGET[kind] + extra
    nxt_after = words[p["i"] + 1]["start"] if p["i"] + 1 < len(words) else wp["end"] + 0.5
    prv_before = words[q["i"] - 1]["end"] if q["i"] > 0 else wq["start"] - 0.5
    tail = quietest(wp["end"] + 0.03, min(nxt_after - 0.01, wp["end"] + min(0.22, target / 2 + 0.05)))
    head = quietest(max(prv_before + 0.01, wq["start"] - min(0.18, target / 2 + 0.03)), wq["start"] - 0.015)
    tail = max(tail, wp["end"] + 0.01); head = min(head, wq["start"] - 0.005)
    fill = max(0.0, target - (tail - wp["end"]) - (wq["start"] - head))
    pieces.append((cur_a, tail, fill_before)); cur_a, fill_before = head, fill
endw = words[seq[-1]["i"]]["end"]
pieces.append((cur_a, quietest(endw + 0.05, endw + 0.35), fill_before))

# assemblage avec fondus enchaînés ; table raw -> sortie
out = np.zeros(0, np.float32); maps = []
nx = int(XF * SR); fin = np.sin(np.linspace(0, np.pi / 2, nx)) ** 2; fout = 1 - fin
def append(x):
    global out
    if len(out) >= nx and len(x) >= nx:
        o = len(out) - nx
        out = np.concatenate([out[:o], out[o:] * fout + x[:nx] * fin, x[nx:]]).astype(np.float32)
        return o
    o = len(out); out = np.concatenate([out, x]).astype(np.float32); return o
for a, b, f in pieces:
    if f > 0: append(room(f + XF))
    o = append(A[int(a * SR):int(b * SR)])
    maps.append((a, b, o / SR))
out = np.concatenate([out, room(0.6)])

def to_out(t):
    for a, b, o in maps:
        if a - 1e-3 <= t <= b + 1e-3: return o + (t - a)
    raise ValueError(f"mot hors des morceaux : {t}")

out_beats = []
for bid, idx in BEATS:
    toks = []
    for i in idx:
        w = words[i]; s0 = to_out(w["start"])
        pa, pb, po = next(m for m in maps if m[0] - 1e-3 <= w["start"] <= m[1] + 1e-3)
        e0 = po + (min(w["end"], pb) - pa)          # fin du mot dans le même morceau que son début
        text = FIX.get(i, w["text"].strip('"'))
        if text == "" and toks: toks[-1][2] = e0
        elif "|" in text:
            p1, p2 = text.split("|"); m = (s0 + e0) / 2
            toks.append([p1, s0, m]); toks.append([p2, m, e0])
        else: toks.append([text, s0, e0])
    merged = []
    for t in toks:                                   # « الـ » collé au mot suivant (comme dans beats.js)
        if merged and merged[-1][0] == "الـ": merged[-1] = ["الـ" + t[0], merged[-1][1], t[2]]
        else: merged.append(t)
    toks = merged
    out_beats.append({"id": bid, "text": " ".join(x[0] for x in toks), "words": [[round(x[1], 3), round(x[2], 3)] for x in toks],
                      "start": round(toks[0][1], 3), "end": round(toks[-1][2], 3)})

import wave
pcm = (np.clip(out, -1, 1) * 32767).astype("<i2").tobytes()
with wave.open(os.path.join(D, "edited2.wav"), "wb") as wf:
    wf.setnchannels(1); wf.setsampwidth(2); wf.setframerate(SR); wf.writeframes(pcm)
dur = len(out) / SR
json.dump({"duration": round(dur, 3), "beats": out_beats, "pieces": [[round(a, 3), round(b, 3), round(f, 3)] for a, b, f in pieces]}, open(os.path.join(D, "edl2.json"), "w"), ensure_ascii=False, indent=1)
print(f"edited2.wav : {dur:.1f} s, {len(pieces)} morceaux (v1 : 1 morceau par mot)")
for b in out_beats: print(f"{b['id']:>4} {b['start']:6.2f}-{b['end']:6.2f}  {b['text']}")
