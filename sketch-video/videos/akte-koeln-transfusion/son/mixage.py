# AKTE 04 — mixage final : voix (voice.wav) + musique ElevenLabs (ducking −7 dB, silence à la mort) + bruitages
# (son/plan_bruitages.py) + compteur / horloge / déclics synthétisés ; loudnorm deux passes −14 LUFS, crête −1,5 dB ;
# remuxé sur la vidéo rendue (-c:v copy).
# Usage (depuis sketch-video/) : python3 videos/akte-koeln-transfusion/son/mixage.py <video_rendue.mp4> <sortie.mp4>
import json, os, subprocess, sys, wave
import numpy as np
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); SND = os.path.join(EP, "out", "son"); SR = 48000
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); from plan_bruitages import P, C, SILENCE, REWIND
VID, OUT = sys.argv[1], sys.argv[2]
db = lambda x: 10 ** (x / 20)
def load(f): return np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout, np.float32).copy()
TOTAL = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", VID], capture_output=True, text=True).stdout)
N = int(TOTAL * SR)

# --- tous les repères, calculés par la page (même moteur que l'image)
cues = sorted({e["at"] for e in P} | {e["until"] for e in P if e.get("until")} | {c[1] for c in C} | {c[2] for c in C if c[2]} | set(SILENCE) | {x for r in REWIND for x in r})
cues = [c for c in cues if c != "0"]
r = subprocess.run(["node", "tools/cuetimes.mjs", os.path.join(EP, "index.html")] + cues, capture_output=True, text=True, check=True)
T = dict(json.loads(r.stdout.strip().splitlines()[-1])); T["0"] = 0.0
json.dump(T, open(os.path.join(SND, "cuetimes.json"), "w"), ensure_ascii=False, indent=0)

mix = np.zeros(N, np.float32)
v = load(os.path.join(EP, "voice.wav")); mix[:min(N, len(v))] += v[:N]

# --- musique : ≈ −25 dBFS RMS, −7 dB quand la voix parle, silence complet après la mort
m = load(os.path.join(SND, "music.mp3"))[:N]; m = np.pad(m, (0, N - len(m)))
rms = lambda x: np.sqrt(np.mean(x ** 2) + 1e-12)
m *= db(-25) / rms(m[m != 0] if np.any(m) else m)
hop = int(0.01 * SR); vv = np.pad(v, (0, max(0, N - len(v))))[:N]
env = np.sqrt(np.convolve(vv ** 2, np.ones(hop * 4) / (hop * 4), mode="same")[::hop] + 1e-12)
act = (20 * np.log10(env) > -38).astype(float)
g = np.zeros_like(act); a_up, a_dn = 1 - np.exp(-1 / 6), 1 - np.exp(-1 / 45)
for i in range(1, len(act)): g[i] = g[i - 1] + (act[i] - g[i - 1]) * (a_up if act[i] > g[i - 1] else a_dn)
gain = np.interp(np.arange(N), np.arange(len(g)) * hop, db(-7) ** g)
s0, s1 = T[SILENCE[0]], T[SILENCE[1]]; t = np.arange(N) / SR
gain *= np.clip(np.maximum((s0 - t) / 0.6, (t - s1) / 0.4), 0, 1)       # fondu 0,6 s vers le silence, retour en 0,4 s
fo = int(2.5 * SR); m[-fo:] *= np.linspace(1, 0, fo)
# rembobinage de la musique : ce qu'on vient d'entendre repart à l'envers en accélérant (cassette), sans autre effet
for a, b in REWIND:
    i0, i1 = int(T[a] * SR), int(T[b] * SR); L = i1 - i0
    if L <= 0: continue
    speed = np.linspace(3.0, 5.0, L); pos = i0 - np.cumsum(speed)                 # lecture à l'envers depuis le repère
    pos = np.clip(pos, 0, N - 1); seg = np.interp(pos, np.arange(N), m)
    seg *= 1.0 + 0.15 * np.sin(2 * np.pi * 11 * np.arange(L) / SR)                # léger pleurage de bande
    ramp = np.clip(np.minimum(np.arange(L) / (0.06 * SR), (L - np.arange(L)) / (0.05 * SR)), 0, 1)
    m[i0:i1] = seg * ramp * db(-2)
    gain[i0:i1] = np.maximum(gain[i0:i1], db(-4))                                  # pas trop étouffé sous la voix
mix += m * gain

# --- bruitages générés
cache = {}
def snd(name):
    if name not in cache:
        x = load(os.path.join(SND, name + ".mp3"))
        nz = np.nonzero(np.abs(x) > db(-45))[0]; x = x[nz[0]:] if len(nz) else x      # silence de tête retiré
        cache[name] = x / (np.max(np.abs(x)) + 1e-9)
    return cache[name]
def put(x, st, gdb):
    i = int(max(0, st) * SR)
    if i >= N: return
    e = min(N, i + len(x)); mix[i:e] += x[: e - i] * db(gdb)
def shape(x, fade):
    x = x.copy(); k = min(len(x), int(0.008 * SR)); x[:k] *= np.linspace(0, 1, k)
    if fade: k = min(len(x), int(fade * SR)); x[-k:] *= np.linspace(1, 0, k)
    return x
for e in P:
    base = snd(e["s"]); st = T[e["at"]] + e.get("off", 0.0); src = int(e.get("src", 0) * SR)
    if e.get("every"):                                               # répétition (goutte…)
        k = st
        while k < T[e["until"]] - 0.05: put(shape(base[: int(0.6 * SR)], 0.1), k, e["g"]); k += e["every"]
        continue
    if e.get("until"): L = T[e["until"]] - st
    else: L = e.get("dur") or len(base) / SR
    if e.get("dur"): L = min(L, e["dur"])
    n = int(max(0.05, L) * SR); body = base[src:] if src < len(base) else base
    if len(body) < n:                                                # boucle (ambiances) avec fondus croisés de 0,3 s
        xf = int(0.3 * SR); out = body.copy()
        while len(out) < n:
            a, b = out[-xf:] * np.linspace(1, 0, xf), body[:xf] * np.linspace(0, 1, xf); out = np.concatenate([out[:-xf], a + b, body[xf:]])
        body = out
    put(shape(body[:n], e.get("fade")), st, e["g"])

# --- compteur à rouleaux, horloge, déclics (synthèse, comme le bip du moniteur des autres épisodes)
rng = np.random.default_rng(4)
def click(strong=False, hi=2500, body=180):
    n = int(0.09 * SR); t = np.arange(n) / SR
    nz = rng.standard_normal(n) * np.exp(-t / 0.0012)
    nz = np.convolve(nz, np.sin(2 * np.pi * hi * np.arange(48) / SR) * np.hanning(48), mode="same")
    x = nz / (np.max(np.abs(nz)) + 1e-9) + 0.5 * np.sin(2 * np.pi * body * t) * np.exp(-t / 0.008)
    if strong: x = 1.6 * x + 0.6 * np.sin(2 * np.pi * 900 * t) * np.exp(-t / 0.03)
    return (x / np.max(np.abs(x))).astype(np.float32)
CLIC, CLAC, RELAY, TICK = click(), click(True), click(hi=4200, body=320), click(hi=3200, body=600)
for kind, a, b, k, gdb in C:
    ta = T[a]; tb = T[b] if b else None
    if kind == "roll": [put(CLIC * (0.7 + 0.3 * rng.random()), x, gdb) for x in np.arange(ta, tb, 1 / k)]
    elif kind == "count": [put(CLIC, x, gdb) for x in np.linspace(ta, tb, k)]
    elif kind == "idle": [put(CLIC, x, gdb) for x in np.arange(ta, tb, 1 / k)]
    elif kind == "tick": [put(TICK, x, gdb) for x in np.arange(ta, tb, 1 / k)]
    elif kind == "last": [put(CLIC, ta + d, gdb) for d in (0.0, 0.3, 0.8)]
    elif kind == "clac": put(CLAC, ta, gdb)
    elif kind == "relay": put(RELAY, ta, gdb)

# --- loudnorm deux passes (−14 LUFS, crête −1,5 dB) puis remux
raw = os.path.join(SND, "mix_brut.wav")
with wave.open(raw, "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(mix / max(1.0, np.max(np.abs(mix))), -1, 1) * 32767).astype("<i2").tobytes())
st = subprocess.run(["ffmpeg", "-hide_banner", "-i", raw, "-af", "loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
ln = json.loads(st[st.rindex("{"):st.rindex("}") + 1])
LN = (f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={ln['input_i']}:measured_TP={ln['input_tp']}:measured_LRA={ln['input_lra']}"
      f":measured_thresh={ln['input_thresh']}:offset={ln['target_offset']}:linear=true")
fin = os.path.join(SND, "mix_final.wav")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", raw, "-af", LN, "-ar", str(SR), "-ac", "1", fin], check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", VID, "-i", fin, "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
                "-shortest", "-movflags", "+faststart", OUT], check=True)
print(f"OK -> {OUT} ({TOTAL:.1f} s) ; {len(P)} bruitages, {len(C)} séquences synthétisées")
