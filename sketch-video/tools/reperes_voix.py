# Après le montage de SA voix : inventaire des repères « bN@mot » / « bN@3 » des scènes, ancien texte (script) vs nouveau (voix).
# Usage : python3 tools/reperes_voix.py videos/<épisode> <ancien_beats.js>   (copier beats.js AVANT de lancer montage_voix.py)
# ABSENT = le mot n'existe plus (la page planterait) ; CHANGE = un repère par rang qui vise maintenant un autre mot.
import re, json, sys, unicodedata, glob, os
EP = sys.argv[1]
def load_beats(p):
    s = open(p).read(); return {m.group(1): m.group(2) for m in re.finditer(r'\["(\w+)",\s*"((?:[^"\\]|\\.)*)"', s)}
old = load_beats(sys.argv[2] if len(sys.argv) > 2 else os.path.join(EP, "out/voix/beats.provisoire.js")); new = load_beats(os.path.join(EP, "beats.js"))
def norm(s):
    s = s.lower(); s = re.sub(r'[ً-ْـ]', '', s)
    return ''.join(ch for ch in s if unicodedata.category(ch)[0] in 'LN')
def find(text, w):
    q = norm(w); ws = text.split()
    for i, x in enumerate(ws):
        if q in norm(x): return i
    return -1
cues = {}
for f in sorted(glob.glob(os.path.join(EP, "scenes-*.js"))) + [os.path.join(EP, "story.js")]:
    for n, line in enumerate(open(f), 1):
        for m in re.finditer(r'["`]((?:b\d+|i\d)@[^"`+\s]+?)(?:[+-][\d.]+)?["`]', line):
            cues.setdefault(m.group(1), []).append(f"{os.path.basename(f)}:{n}")
bad = 0
for c in sorted(cues, key=lambda c: (int(re.sub(r'\D', '', c.split('@')[0]) or 0) + (0 if c[0] == 'b' else -100), c)):
    bid, w = c.split('@', 1)
    if w == 'end': continue
    if w.isdigit():
        k = int(w); o = old[bid].split(); nn = new[bid].split()
        ow = o[k] if k < len(o) else '∅'; nw = nn[k] if k < len(nn) else '∅'
        flag = '' if norm(ow) == norm(nw) else '  <<< CHANGE'
        print(f"{c:22} n°{k}: ancien « {ow} » → nouveau « {nw} »{flag}   {cues[c][0]}"); bad += bool(flag)
    else:
        i = find(new[bid], w)
        if i < 0: print(f"{c:22} ABSENT du nouveau texte   ({len(cues[c])}× ; {cues[c][0]})"); bad += 1
print(f"{len(cues)} repères à mot ; {bad} à revoir")
