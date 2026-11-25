# Bip du moniteur (scène de la naissance, AKTE 02) : bips réguliers, qui ralentissent après « زادت », puis la ligne plate.
# Son synthétisé (sinus 1 kHz + harmonique), calé sur le minutage de la voix. Usage : python3 bip_moniteur.py edl3.json out.wav
import json, sys, wave
import numpy as np
T = {b["id"]: b for b in json.load(open(sys.argv[1]))["beats"]}
b15 = T["b15"]; t0 = b15["start"]
i = [k for k, w in enumerate(b15["text"].split()) if "زادت" in w][0]
born, quiet = b15["words"][i][0], b15["end"] + 0.45          # « quiet » = même instant que dans story.js
SR = 48000; x = np.zeros(int(((quiet - t0) + 3.2) * SR), np.float32)
def tone(at, L, a, fade):
    n = int(L * SR); tt = np.arange(n) / SR; env = np.minimum(1, np.minimum(tt / 0.008, (L - tt) / fade))
    s = (np.sin(2 * np.pi * 1000 * tt) + 0.18 * np.sin(2 * np.pi * 2000 * tt)) * env * a; i0 = int(at * SR); x[i0:i0 + n] += s[:len(x) - i0]
t = 0.0
while t < born - t0: tone(t, 0.11, 0.6, 0.012); t += 0.62
gap = 0.75
while t < quiet - t0 - 0.3: tone(t, 0.11, 0.6, 0.012); t += gap; gap *= 1.22
tone(quiet - t0, 2.8, 0.5, 0.6)
x /= np.max(np.abs(x)) * 1.05
with wave.open(sys.argv[2], "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype("<i2").tobytes())
