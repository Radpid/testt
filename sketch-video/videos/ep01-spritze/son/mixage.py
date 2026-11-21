# Mixage final : voix (voice-off) + musique ElevenLabs avec ducking + bruitages calés sur les repères
import json, subprocess, sys, wave, os
import numpy as np
sys.path.insert(0, os.path.dirname(__file__)); from plan import P
D = os.path.dirname(__file__); SR = 48000
VOICE, MUSIC, OUT, TOTAL = sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4])
def load(f):
    return np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout, np.float32).copy()
db = lambda x: 10 ** (x / 20)
N = int(TOTAL * SR)
mix = np.zeros(N, np.float32)
v = load(VOICE); mix[:min(N, len(v))] += v[:N]
# --- musique : niveau de base puis ducking quand la voix parle
m = load(MUSIC)
# insertion de silence dans la musique (section « Loss », quasi muette) pour suivre une scène muette allongée
if len(sys.argv) > 5:
    at, d = map(float, sys.argv[5].split(":")); i = int(at * SR); z = int(d * SR); xf = int(0.3 * SR)
    head, tail = m[:i].copy(), m[i:].copy(); head[-xf:] *= np.linspace(1, 0, xf); tail[:xf] *= np.linspace(0, 1, xf)
    m = np.concatenate([head, np.zeros(z, np.float32), tail])
m = m[:N]; m = np.pad(m, (0, N - len(m)))
rms = lambda x: np.sqrt(np.mean(x ** 2) + 1e-12)
m *= db(-25) / rms(m[: int(100 * SR)])                # musique ≈ -25 dBFS RMS
hop = int(0.01 * SR); vv = np.pad(v, (0, max(0, N - len(v))))[:N]
env = np.sqrt(np.convolve(vv ** 2, np.ones(hop * 4) / (hop * 4), mode="same")[::hop] + 1e-12)
act = (20 * np.log10(env) > -38).astype(float)
# attaque 60 ms, relâche 450 ms
g = np.zeros_like(act); a_up, a_dn = 1 - np.exp(-1 / 6), 1 - np.exp(-1 / 45)
for i in range(1, len(act)): g[i] = g[i - 1] + (act[i] - g[i - 1]) * (a_up if act[i] > g[i - 1] else a_dn)
duck = db(-7) ** g                                        # -7 dB quand la voix parle
gain = np.interp(np.arange(N), np.arange(len(duck)) * hop, duck)
fo = int(2.5 * SR); m[-fo:] *= np.linspace(1, 0, fo)
mix += m * gain
# --- bruitages
cues = dict(json.load(open(os.path.join(D, "cuetimes.json")))); cues["0"] = 0.0
cache = {}
for name, cue, off, gdb, fade, maxd in P:
    if name not in cache:
        f = os.path.join(D, name + ".wav"); f = f if os.path.exists(f) else os.path.join(D, name + ".mp3")
        x = load(f)
        nz = np.nonzero(np.abs(x) > 10 ** (-45 / 20))[0]          # enlève le silence de tête
        x = x[nz[0]:] if len(nz) else x
        cache[name] = x / (np.max(np.abs(x)) + 1e-9)               # crête à 0 dBFS avant gain
    x = cache[name].copy()
    if maxd: x = x[: int(maxd * SR)]
    if fade:
        k = min(len(x), int(fade * SR)); x[-k:] *= np.linspace(1, 0, k)
    k = min(len(x), int(0.01 * SR)); x[:k] *= np.linspace(0, 1, k)
    st = int(max(0, cues[cue] + off) * SR)
    if st >= N: continue
    e = min(N, st + len(x)); mix[st:e] += x[: e - st] * db(gdb)
tmp = OUT + ".raw.wav"
with wave.open(tmp, "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(mix / max(1.0, np.max(np.abs(mix))), -1, 1) * 32767).astype("<i2").tobytes())
print("mix brut écrit", tmp, f"{TOTAL:.1f}s")
