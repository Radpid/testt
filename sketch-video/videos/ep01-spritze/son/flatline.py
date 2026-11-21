# Moniteur cardiaque synthétique pour la scène muette 11b : 3 bips qui ralentissent (+0,05 / +0,65 / +1,3 s)
# puis la ligne plate continue (+2,0 s), fondu de sortie. Calé sur story.js (flatT = b17@end + 2,0).
# Usage : python3 flatline.py sortie.wav
import sys, wave
import numpy as np
SR, F = 48000, 960.0
def tone(d):
    t = np.arange(int(d * SR)) / SR; x = np.sin(2 * np.pi * F * t) + 0.18 * np.sin(2 * np.pi * 2 * F * t)
    k = int(0.008 * SR); x[:k] *= np.linspace(0, 1, k); x[-k:] *= np.linspace(1, 0, k); return x
out = np.zeros(int(4.7 * SR))
for at in (0.05, 0.65, 1.3):
    b = tone(0.13); s = int(at * SR); out[s:s + len(b)] += b
s = int(2.0 * SR); fl = tone(2.6); fl[-int(0.7 * SR):] *= np.linspace(1, 0, int(0.7 * SR)); out[s:s + len(fl)] += fl
out *= 0.7 / np.max(np.abs(out))
with wave.open(sys.argv[1], "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype("<i2").tobytes())
