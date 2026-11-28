# Montage v3 de la voix : par phrase, plusieurs prises (enregistrement principal + reprises de l'auteur),
# voix isolée par ElevenLabs, rythme resserré, puis accélération légère (atempo, hauteur conservée).
# AKTE 04 « 63 ساعة » (AG Köln 2012). Usage : python3 montage_voix.py out/voix
#   sources (dans out/voix, hors git) : raw.iso.mp3 + scribe.json (enregistrement principal, Scribe v2),
#   take2.iso.mp3 + take2.scribe.v1.json (reprises, Scribe v1 qui garde la darija), intro.iso.mp3 + intro.scribe2.json (intro commune)
#   -> out/voix/edited.wav (×1,3), edl.json, puis voice.wav (masterisé), beats.js, timings.js
import json, subprocess, sys, os, wave
import numpy as np

D = sys.argv[1]                 # prises de l'épisode (raw.iso.mp3 + scribe.json)
D_INTRO = D                     # intro commune à la série (copiée depuis AKTE 02)
SR = 48000
TEMPO = float(os.environ.get("TEMPO", "1.3"))
TEMPO_HEAD, HEAD = 1.1, ("b1", "b2")   # retour de l'auteur (28.11.2026) : l'accroche (sa reprise) était trop rapide → ×1,1, le reste ×1,3

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
t2_w = words_of(os.path.join(D, "take2.scribe.v1.json"))
SRC = {"raw": (raw_a, raw_w),
       "t2": (match(load(os.path.join(D, "take2.iso.mp3")), t2_w, REF_PSD, REF_RMS), t2_w),          # reprises (autre pièce) égalisées
       "intro": (match(load(os.path.join(D_INTRO, "intro.iso.mp3")), intro_w, REF_PSD, REF_RMS), intro_w)}

R = lambda a, b: list(range(a, b + 1))
BEATS = [   # phrases de SA voix (indices Scribe), mêmes identifiants que le storyboard
  ("b1", [("t2", R(0, 9))]),                     # reprise : « مريض مات بالغلطة ديالها، وما خدات لا حبس لا غرامة. »
  ("b2", [("t2", R(10, 20))]),                   # reprise : « هكا حكمت واحد المحكمة… في طور التخصص. »
  ("b3", [("raw", R(28, 34))]),
  ("i1", [("intro", R(0, 4))]), ("i2", [("intro", R(5, 16))]), ("i3", [("intro", R(17, 25))]),
  ("b4", [("raw", R(35, 45))]), ("b5", [("raw", R(46, 54))]), ("b6", [("raw", R(55, 64))]), ("b7", [("raw", R(65, 71))]),
  ("b8", [("raw", R(72, 83))]), ("b9", [("raw", R(84, 95))]),
  ("b10", [("raw", R(96, 109))]),                # retiré : la redite « اللي هي la formation ديال كيفاش دير la transfusion ديال الدم » (110–120)
  ("b11", [("raw", R(121, 132))]), ("b12", [("raw", R(133, 142))]), ("b13", [("raw", R(143, 152))]),
  ("b14", [("raw", R(153, 162))]), ("b15", [("raw", R(163, 174))]), ("b16", [("raw", R(175, 180))]),
  ("b17", [("raw", R(181, 184))]), ("b18", [("raw", R(188, 193))]),     # faux départ 185–187 retiré
  ("b19", [("raw", R(194, 205))]),
  ("b20", [("t2", R(21, 29))]),                  # reprise ; retiré : « كملات الخدمة ديالها normal » (206–210, contraire au jugement)
  ("b21", [("raw", R(222, 231))]),               # 2e prise ; la 1re (211–221) s'arrête sur « Tag gez… »
  ("b22", [("t2", R(30, 35)), ("raw", R(237, 243))]),   # le mot du jugement (reprise) + la suite de l'enregistrement
  ("b23", [("raw", R(244, 262))]), ("b24", [("raw", R(263, 275))]),
  ("b25", [("raw", R(290, 295))]),               # faux départs 276–289 retirés
  ("b26", [("raw", R(297, 307))]),               # « المهم » retiré
  ("b27", [("raw", R(308, 315))]), ("b28", [("raw", R(316, 323))]),
  ("b29", [("raw", [324, 325] + R(327, 338))]),  # « يعني » retiré ; 2e prise (339–354) moins bonne fin
]   # retirés aussi : l'ancienne accroche 0–27 (« خرجت براءة » est faux : elle a été déclarée coupable, sans peine)
FIX_INTRO = {0: "أنا", 1: "ياسين،", 2: "طبيب", 3: "فألمانيا.", 4: "", 5: "فهاد", 6: "", 7: "السلسلة", 8: "كنحكي", 9: "ليكم",
             10: "قصص", 11: "حقيقية", 12: "من", 13: "المحاكم", 14: "الألمانية،", 15: "باش|نتعلمو", 16: "منها.", 17: "إلا",
             18: "عجباتك،", 19: "دير", 20: "j'aime", 21: "و|abonne،", 22: "باش|ما", 23: "تفوتكش", 24: "القصة", 25: "الجاية."}
FIX = {("raw", k): v for k, v in {
  43: "سنات", 47: "بلاتي،", 63: "سيمانة", 65: "والـservice",
  108: "Blutführerschein.", 109: "",
  121: "labo", 122: "عطاها", 126: "بحال",
  136: "الـgroupe", 145: "إلا|قسمين،", 146: "علقات",
  154: "groupe", 156: "والـpoche", 158: "groupe", 166: "10", 170: "كيتقيا،",
  177: "تقريبا", 180: "ونص…",
  194: "وخلاتها|تسني", 200: "الـformation،", 205: "صحيحش.",
  225: "النيابة", 226: "", 231: "Tagessätze.",
  267: "genug", 268: "bestraft،", 269: "", 274: "راه",
  300: "حدا", 306: "الـgroupe", 309: "Bedside-Test،", 310: "", 313: "الـgroupe"}.items()}
FIX.update({("t2", k): v for k, v in {3: "ديالها،", 7: "حبس،", 25: "تخدم،", 29: "كتداوى.", 33: "Organisationsverschulden،", 34: "", 35: ""}.items()})
FIX.update({("intro", k): v for k, v in FIX_INTRO.items()})
# Rythme : enchaîné ; pause seulement quand le contexte change complètement (valeurs AVANT ×1,3).
SCENE_START = {"i1", "b4", "b11", "b13", "b16", "b21", "b26"}
EXTRA = {"b16": 5.0}   # scène muette après « ونهار الأحد، تقريبا مع لواحدة ونص… » ≈ 3,85 s à l'écoute (moniteur : ralentit, ligne plate, bip continu)
RANGE = {"inner": (0.0, 0.22), "beat": (0.09, 0.2), "scene": (0.48, 0.6)}
TARGET = {"inner": 0.07, "beat": 0.14, "scene": 0.55}
XF = 0.02
PAUSE_BEFORE = {("raw", 35): 0.65}   # fin de l'intro → début de l'histoire

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

# point de coupe des deux vitesses : au milieu de la pause entre la fin de l'accroche (b2) et b3 (temps du montage ×1)
def t1x(src, i, key):
    w = SRC[src][1][i]; _, pa, pb, po = piece_of(src, w["start"]); return po + min(w[key], pb) - pa
_lastH = [x for x in BEATS if x[0] == HEAD[-1]][0][1][-1]; _first = [x for x in BEATS if x[0] == "b3"][0][1][0]
SPLIT = (t1x(_lastH[0], _lastH[1][-1], "end") + t1x(_first[0], _first[1][0], "start")) / 2
tmap = lambda x: x / TEMPO_HEAD if x < SPLIT else SPLIT / TEMPO_HEAD + (x - SPLIT) / TEMPO
out_beats = []
for bid, parts in BEATS:
    toks = []
    for src, idx in parts:
        for i in idx:
            w = SRC[src][1][i]
            _, pa, pb, po = piece_of(src, w["start"])
            s0 = tmap(po + w["start"] - pa); e0 = tmap(po + min(w["end"], pb) - pa)
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

tmp = os.path.join(D, "edited_1x.wav")
with wave.open(tmp, "wb") as wf:
    wf.setnchannels(1); wf.setsampwidth(2); wf.setframerate(SR); wf.writeframes((np.clip(out, -1, 1) * 32767).astype("<i2").tobytes())
ns = int(SPLIT * SR)   # deux vitesses : tête ×1,1, suite ×1,3 (coupe dans un silence), puis recollées
for nm, seg, tp in (("_tete", out[:ns], TEMPO_HEAD), ("_suite", out[ns:], TEMPO)):
    with wave.open(os.path.join(D, nm + "_1x.wav"), "wb") as wf:
        wf.setnchannels(1); wf.setsampwidth(2); wf.setframerate(SR); wf.writeframes((np.clip(seg, -1, 1) * 32767).astype("<i2").tobytes())
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", os.path.join(D, nm + "_1x.wav"), "-af", f"atempo={tp}", "-ar", str(SR), "-ac", "1", os.path.join(D, nm + ".wav")], check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", os.path.join(D, "_tete.wav"), "-i", os.path.join(D, "_suite.wav"), "-filter_complex", "[0:a][1:a]concat=n=2:v=0:a=1",
                "-ar", str(SR), "-ac", "1", os.path.join(D, "edited.wav")], check=True)
dur = tmap(len(out) / SR)
json.dump({"duration": round(dur, 3), "tempo": TEMPO, "beats": out_beats}, open(os.path.join(D, "edl.json"), "w"), ensure_ascii=False, indent=1)
print(f"edited.wav : {dur:.1f} s (tempo x{TEMPO_HEAD} jusqu'à {SPLIT / TEMPO_HEAD:.2f} s, puis x{TEMPO}), {len(pieces)} morceaux")
for b in out_beats: print(f"{b['id']:>5} {b['start']:6.2f}-{b['end']:6.2f}  {b['text']}")


# --- mastering « voice-off » (SKILL : Voix § 10) -> voice.wav, puis beats.js / timings.js
EP = os.path.dirname(os.path.abspath(__file__))
# v2 (28.11.2026, « rendre la voix plus attirante ») : plus de chaleur (140 Hz), moins de carton (320 Hz), présence 2,8 / 5,2 kHz,
# un peu d'air, compression « radio » un peu plus serrée, léger excitateur d'harmoniques au-dessus de 7 kHz.
CH = ("highpass=f=70,equalizer=f=140:t=q:w=0.9:g=2.5,equalizer=f=320:t=q:w=1.2:g=-3,equalizer=f=2800:t=q:w=1.5:g=1.5,"
      "equalizer=f=5200:t=q:w=1.2:g=2,highshelf=f=10000:g=2,deesser=i=0.5,"
      "acompressor=threshold=-24dB:ratio=3.5:attack=5:release=80:knee=4:makeup=3,aexciter=amount=0.8:drive=6:freq=7000:ceil=16000")
m = subprocess.run(["ffmpeg", "-hide_banner", "-i", os.path.join(D, "edited.wav"), "-af", CH + ",loudnorm=I=-15:TP=-1.5:LRA=11:print_format=json",
                    "-f", "null", "-"], capture_output=True, text=True).stderr
ln = json.loads(m[m.rindex("{"):m.rindex("}") + 1])
LN = (f"loudnorm=I=-15:TP=-1.5:LRA=11:measured_I={ln['input_i']}:measured_TP={ln['input_tp']}:measured_LRA={ln['input_lra']}"
      f":measured_thresh={ln['input_thresh']}:offset={ln['target_offset']}:linear=true")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", os.path.join(D, "edited.wav"), "-af", CH + "," + LN + ",alimiter=limit=0.8:level=0",
                "-ar", str(SR), "-ac", "1", os.path.join(EP, "voice.wav")], check=True)
J = lambda o: json.dumps(o, ensure_ascii=False)
with open(os.path.join(EP, "beats.js"), "w") as f:
    f.write("// AKTE 04 (AG Köln 2012, « 63 ساعة ») — texte EXACT de la voix de l'auteur (+ intro commune), mots sans importance retirés.\n"
            "// Un beat = une phrase = un sous-titre. Généré par montage_voix.py (ne pas modifier à la main : corriger FIX dans montage_voix.py).\n"
            "window.BEATS = [\n" + "".join(f"  [{J(b['id'])}, {J(b['text'])}],\n" for b in out_beats) + "];\n")
tim = {"audio": "voice.wav", "duration": round(dur, 3),
       "source": "voix auteur · ElevenLabs Voice Isolator + Scribe · montage par phrase · reprises égalisées · intro commune · tempo x1.3",
       "beats": [{"id": b["id"], "start": b["start"], "end": b["end"], "words": b["words"], "conf": 1} for b in out_beats]}
with open(os.path.join(EP, "timings.js"), "w") as f:
    f.write("// généré par montage_voix.py — minutage mot par mot\nwindow.TIMINGS = " + J(tim) + ";\n")
print("voice.wav, beats.js, timings.js écrits")
