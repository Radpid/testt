# Moniteur du bloc puis de la réa (AKTE 03), synthétisé et calé sur la voix :
#   bips réguliers au bloc → alarme à « وقف » (11:30) → bips qui reviennent à « رجع »
#   → scène muette : bips qui ralentissent puis ligne plate (« quiet » = fin de b16 + 1,1 s, comme story.js).
# Usage : python3 moniteur.py <dossier épisode> out.wav   → piste qui commence au début de b7 (repère « b7 »)
import json, re, sys, wave
import numpy as np
D = sys.argv[1]
T = json.loads(re.search(r"window\.TIMINGS = (\{.*\});", open(D + "/timings.js").read(), re.S).group(1))
B = dict((b, t) for b, t in json.loads(re.search(r"window\.BEATS = (\[.*\]);", open(D + "/beats.js").read().replace(",\n];", "\n];"), re.S).group(1)))
beats = {b["id"]: b for b in T["beats"]}
def word(bid, w):
    toks = B[bid].split(); i = [k for k, x in enumerate(toks) if w in x][0]; return beats[bid]["words"][i][0]
t0 = beats["b7"]["start"]; arrest = word("b15", "وقف"); back = word("b16", "رجع"); end16 = beats["b16"]["end"]
quiet = end16 + 1.1
SR = 48000; x = np.zeros(int((quiet - t0 + 3.2) * SR), np.float32)
def tone(at, L, f, a, fade=0.012):
    n = int(L * SR); tt = np.arange(n) / SR; env = np.minimum(1, np.minimum(tt / 0.006, (L - tt) / fade))
    s = (np.sin(2 * np.pi * f * tt) + 0.18 * np.sin(2 * np.pi * 2 * f * tt)) * env * a; i0 = int((at - t0) * SR)
    if 0 <= i0 < len(x): x[i0:i0 + n] += s[:len(x) - i0]
t = t0
while t < arrest: tone(t, 0.09, 1000, 0.35); t += 0.85            # bloc : bips calmes
t = arrest
while t < back: [tone(t + k * 0.16, 0.11, 1200, 0.6) for k in range(3)]; t += 0.75   # alarme
t = back
while t < end16: tone(t, 0.09, 1000, 0.4); t += 0.6              # le cœur repart
t, gap = end16 + 0.15, 0.6
while t < quiet - 0.25: tone(t, 0.09, 1000, 0.45); t += gap; gap *= 1.3   # scène muette : il ralentit
tone(quiet, 2.8, 1000, 0.4, 0.6)                                  # ligne plate
x /= np.max(np.abs(x)) * 1.05
with wave.open(sys.argv[2], "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype("<i2").tobytes())
print(f"b7={t0:.2f} arrest={arrest:.2f} back={back:.2f} quiet={quiet:.2f}")
