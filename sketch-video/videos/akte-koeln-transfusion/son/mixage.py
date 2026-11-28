# AKTE 04 — mixage final STÉRÉO (v2, 28.11.2026) : voix au centre (voice.wav) + musique ElevenLabs stéréo (−23 dBFS, −7 dB sous la voix,
# silence complet à la mort, « rembobinée » comme une cassette aux retours en arrière) + bruitages placés gauche/droite selon l'image
# (son/plan_bruitages.py) + moniteur (bips sur les battements de window.ECG04, puis bip continu de la ligne plate) + compteur, horloge,
# déclics synthétisés ; loudnorm deux passes −14 LUFS, crête −1,5 dB ; remuxé sur la vidéo rendue (-c:v copy).
# Usage (depuis sketch-video/) : python3 videos/akte-koeln-transfusion/son/mixage.py <video_rendue.mp4> <sortie.mp4>
import json, os, re, subprocess, sys, wave
import numpy as np
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); SND = os.path.join(EP, "out", "son"); SR = 48000
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from plan_bruitages import P, C, SILENCE, REWIND, PAN, SWEEP, WIDE, MONITOR, BOOST
VID, OUT = sys.argv[1], sys.argv[2]
db = lambda x: 10 ** (x / 20)
def load(f, ch=1):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ac", str(ch), "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    x = np.frombuffer(raw, np.float32).copy(); return x.reshape(-1, ch).T if ch > 1 else x
TOTAL = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", VID], capture_output=True, text=True).stdout)
N = int(TOTAL * SR)

# --- repères : calculés par la page (même moteur que l'image) ; « FLAT±x » = ligne plate du moniteur
ECG = json.loads(subprocess.run(["node", os.path.join(EP, "son", "ecg_times.mjs")], capture_output=True, text=True, check=True).stdout.strip().splitlines()[-1])
raw_cues = {e["at"] for e in P} | {e["until"] for e in P if e.get("until")} | {c[1] for c in C} | {c[2] for c in C if c[2]} | set(SILENCE) \
    | {x for r in REWIND for x in r} | {MONITOR["flat_end"], "b16", "b15@كيتقيا"}
cues = sorted(c for c in raw_cues if c != "0" and not c.startswith("FLAT"))
r = subprocess.run(["node", "tools/cuetimes.mjs", os.path.join(EP, "index.html")] + cues, capture_output=True, text=True, check=True)
T = dict(json.loads(r.stdout.strip().splitlines()[-1])); T["0"] = 0.0
for c in raw_cues:
    m_ = re.fullmatch(r"FLAT([+-][\d.]+)?", c)
    if m_: T[c] = ECG["flat"] + float(m_.group(1) or 0)
json.dump(T, open(os.path.join(SND, "cuetimes.json"), "w"), ensure_ascii=False, indent=0)

L_ = np.zeros(N, np.float32); R_ = np.zeros(N, np.float32)
def pan_gains(p):  # puissance constante
    a = (np.clip(p, -1, 1) + 1) * np.pi / 4; return np.cos(a), np.sin(a)
def put(x, st, gdb, pan=0.0, sweep=None, wide=False):
    i = int(max(0, st) * SR)
    if i >= N: return
    e = min(N, i + len(x)); y = x[: e - i] * db(gdb)
    if wide:                                                # G et D décorrélés (même son, 23 ms de décalage)
        d = int(0.023 * SR); yr = np.concatenate([np.zeros(d, np.float32), y[:-d]]) if len(y) > d else y
        L_[i:e] += y * 0.8; R_[i:e] += yr * 0.8; return
    if sweep: p = np.linspace(sweep[0], sweep[1], len(y)); gl, gr = pan_gains(p)
    else: gl, gr = pan_gains(pan)
    L_[i:e] += y * gl; R_[i:e] += y * gr

# --- voix (centre)
v = load(os.path.join(EP, "voice.wav")); vv = np.pad(v, (0, max(0, N - len(v))))[:N]
L_ += vv * 0.7071; R_ += vv * 0.7071

# --- musique stéréo : ≈ −23 dBFS RMS, −7 dB quand la voix parle, silence à la mort, rembobinée aux retours en arrière
mus = load(os.path.join(SND, "music.mp3"), 2)[:, :N]; mus = np.pad(mus, ((0, 0), (0, N - mus.shape[1])))
mus *= db(-23) / (np.sqrt(np.mean(mus ** 2)) + 1e-12)
hop = int(0.01 * SR)
env = np.sqrt(np.convolve(vv ** 2, np.ones(hop * 4) / (hop * 4), mode="same")[::hop] + 1e-12)
act = (20 * np.log10(env) > -38).astype(float)
g = np.zeros_like(act); a_up, a_dn = 1 - np.exp(-1 / 6), 1 - np.exp(-1 / 45)
for i in range(1, len(act)): g[i] = g[i - 1] + (act[i] - g[i - 1]) * (a_up if act[i] > g[i - 1] else a_dn)
gain = np.interp(np.arange(N), np.arange(len(g)) * hop, db(-7) ** g)
s0, s1 = T[SILENCE[0]], T[SILENCE[1]]; t = np.arange(N) / SR
gain *= np.clip(np.maximum((s0 - t) / 0.6, (t - s1) / 0.4), 0, 1)
fo = int(2.5 * SR); mus[:, -fo:] *= np.linspace(1, 0, fo)
for a, b in REWIND:                                          # la musique repart à l'envers en accélérant (×3 → ×5), léger pleurage
    i0, i1 = int(T[a] * SR), int(T[b] * SR); Ln = i1 - i0
    if Ln <= 0: continue
    pos = np.clip(i0 - np.cumsum(np.linspace(3.0, 5.0, Ln)), 0, N - 1)
    ramp = np.clip(np.minimum(np.arange(Ln) / (0.06 * SR), (Ln - np.arange(Ln)) / (0.05 * SR)), 0, 1) * (1 + 0.15 * np.sin(2 * np.pi * 11 * np.arange(Ln) / SR))
    for ch in (0, 1): mus[ch, i0:i1] = np.interp(pos, np.arange(N), mus[ch]) * ramp * db(-1)
    gain[i0:i1] = np.maximum(gain[i0:i1], db(-3))
L_ += mus[0] * gain; R_ += mus[1] * gain

# --- bruitages générés
cache = {}
def snd(name):
    if name not in cache:
        x = load(os.path.join(SND, name + ".mp3"))
        nz = np.nonzero(np.abs(x) > db(-45))[0]; x = x[nz[0]:] if len(nz) else x
        cache[name] = x / (np.max(np.abs(x)) + 1e-9)
    return cache[name]
def shape(x, fade):
    x = x.copy(); k = min(len(x), int(0.008 * SR)); x[:k] *= np.linspace(0, 1, k)
    if fade: k = min(len(x), int(fade * SR)); x[-k:] *= np.linspace(1, 0, k)
    return x
for e in P:
    name = e["s"]; base = snd(name); st = T[e["at"]] + e.get("off", 0.0); src = int(e.get("src", 0) * SR)
    gdb = e["g"] + (BOOST[0] if e["g"] > -20 else BOOST[1])
    kw = dict(pan=e.get("pan", PAN.get(name, 0.0)), sweep=SWEEP.get(name), wide=name in WIDE)
    if e.get("every"):
        k = st
        while k < T[e["until"]] - 0.05: put(shape(base[: int(0.6 * SR)], 0.1), k, gdb, pan=kw["pan"] or 0.3); k += e["every"]
        continue
    Ls = T[e["until"]] - st if e.get("until") else (e.get("dur") or len(base) / SR)
    if e.get("dur"): Ls = min(Ls, e["dur"])
    n = int(max(0.05, Ls) * SR); body = base[src:] if src < len(base) else base
    if len(body) < n:
        xf = int(0.3 * SR); out = body.copy()
        while len(out) < n:
            out = np.concatenate([out[:-xf], out[-xf:] * np.linspace(1, 0, xf) + body[:xf] * np.linspace(0, 1, xf), body[xf:]])
        body = out
    put(shape(body[:n], e.get("fade")), st, gdb, **kw)

# --- compteur à rouleaux (HUD en haut à gauche), horloge (à gauche), déclics : synthèse
rng = np.random.default_rng(4)
def click(strong=False, hi=2500, body=180):
    n = int(0.09 * SR); tt = np.arange(n) / SR
    nz = rng.standard_normal(n) * np.exp(-tt / 0.0012)
    nz = np.convolve(nz, np.sin(2 * np.pi * hi * np.arange(48) / SR) * np.hanning(48), mode="same")
    x = nz / (np.max(np.abs(nz)) + 1e-9) + 0.5 * np.sin(2 * np.pi * body * tt) * np.exp(-tt / 0.008)
    if strong: x = 1.6 * x + 0.6 * np.sin(2 * np.pi * 900 * tt) * np.exp(-tt / 0.03)
    return (x / np.max(np.abs(x))).astype(np.float32)
CLIC, CLAC, RELAY, TICK = click(), click(True), click(hi=4200, body=320), click(hi=3200, body=600)
for kind, a, b, k, gdb in C:
    ta = T[a]; tb = T[b] if b else None
    if kind == "roll": [put(CLIC * (0.7 + 0.3 * rng.random()), x, gdb, -0.55) for x in np.arange(ta, tb, 1 / k)]
    elif kind == "count": [put(CLIC, x, gdb, -0.55) for x in np.linspace(ta, tb, k)]
    elif kind == "idle": [put(CLIC, x, gdb, -0.55) for x in np.arange(ta, tb, 1 / k)]
    elif kind == "tick": [put(TICK, x, gdb, -0.6) for x in np.arange(ta, tb, 1 / k)]
    elif kind == "last": [put(CLIC, ta + d, gdb, -0.55) for d in (0.0, 0.3, 0.8)]
    elif kind == "clac": put(CLAC, ta, gdb + 2, -0.55)
    elif kind == "relay": put(RELAY, ta, gdb, 0.2)

# --- moniteur : un bip par battement (hauteur qui baisse le dimanche), puis le bip continu de la ligne plate
def beep(f, dur=0.13):
    tt = np.arange(int(dur * SR)) / SR
    x = np.sin(2 * np.pi * f * tt) + 0.22 * np.sin(2 * np.pi * 2 * f * tt) + 0.08 * np.sin(2 * np.pi * 3 * f * tt)
    env = np.minimum(1, tt / 0.004) * np.clip((dur - tt) / 0.035, 0, 1)
    return (x * env / 1.3).astype(np.float32)
tq, t16 = T["b15@كيتقيا"], T["b16"]
for tb, amp, h in ECG["beats"]:
    gdb = MONITOR["sunday"] if tb >= t16 else MONITOR["react"] if tb >= tq else MONITOR["night"]
    put(beep(MONITOR["f0"] * h) * amp, tb, gdb, MONITOR["pan"])
fl0, fl1 = ECG["flat"], T[MONITOR["flat_end"]]
tt = np.arange(int((fl1 - fl0) * SR)) / SR
tone = (np.sin(2 * np.pi * MONITOR["f0"] * tt) + 0.22 * np.sin(2 * np.pi * 2 * MONITOR["f0"] * tt)) / 1.25
tone *= np.minimum(1, tt / 0.02) * np.clip((tt[-1] - tt) / 0.6, 0, 1)
put(tone.astype(np.float32), fl0, MONITOR["flat_g"], MONITOR["pan"])

# --- loudnorm deux passes (−14 LUFS, crête −1,5 dB) puis remux
mix = np.stack([L_, R_], 1); mix /= max(1.0, np.max(np.abs(mix)))
raw = os.path.join(SND, "mix_brut.wav")
with wave.open(raw, "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(mix, -1, 1) * 32767).astype("<i2").tobytes())
st = subprocess.run(["ffmpeg", "-hide_banner", "-i", raw, "-af", "loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
ln = json.loads(st[st.rindex("{"):st.rindex("}") + 1])
LN = (f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={ln['input_i']}:measured_TP={ln['input_tp']}:measured_LRA={ln['input_lra']}"
      f":measured_thresh={ln['input_thresh']}:offset={ln['target_offset']}:linear=true")
fin = os.path.join(SND, "mix_final.wav")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", raw, "-af", LN, "-ar", str(SR), "-ac", "2", fin], check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", VID, "-i", fin, "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "256k",
                "-shortest", "-movflags", "+faststart", OUT], check=True)
print(f"OK -> {OUT} ({TOTAL:.1f} s, stéréo) ; {len(P)} bruitages, {len(ECG['beats'])} bips de moniteur, ligne plate {fl0:.2f}–{fl1:.2f} s")
