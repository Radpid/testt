# sketch-video — vidéos de révision radiologie (Kenntnisprüfung)

Vidéos verticales 1080×1920 au style « sketchnote » : papier pointillé, encre, surligneur jaune, hachures,
caméra qui suit l'explication, puis zoom arrière final qui montre tout le résumé sur un seul écran.
Narration en **darija**, termes médicaux en **allemand**, **ta propre voix**.

Une vidéo = une page HTML (le « poster ») + ton script + ton enregistrement. Le moteur anime le poster mot par mot
au rythme de ta voix et l'exporte en MP4.

```
sketch-video/
├── engine/            moteur (ne pas toucher sauf pour changer le style)
│   ├── runtime.js     animations, caméra, sous-titres, lecteur de prévisualisation
│   ├── sketch.css     style : couleurs, polices, cartes, rubans, chips
│   ├── render.mjs     page -> MP4 (Chrome headless + ffmpeg)
│   ├── fonts/         Lalezar, Kalam, IBM Plex Sans Arabic (licence OFL)
│   └── vendor/        rough.js (traits « dessinés à la main », MIT)
├── tools/align.py     voix -> minutage mot par mot (timings.js)
└── videos/
    └── pneumothorax/  exemple complet
        ├── beats.js   le script (une phrase = un sous-titre)
        ├── index.html le poster + les apparitions
        ├── assets/    images (radio sous licence libre)
        └── timings.js généré par align.py quand tu as enregistré ta voix
```

## Installation (une seule fois)

Sur Windows (PowerShell) :

```powershell
winget install OpenJS.NodeJS.LTS
winget install Gyan.FFmpeg
winget install Python.Python.3.12
# rouvrir le terminal, puis dans le dossier sketch-video :
npm install                      # installe Playwright + Chromium
pip install -r requirements.txt  # faster-whisper (alignement de la voix)
```

Sur macOS : `brew install node ffmpeg python` puis les deux mêmes commandes.

## Faire une vidéo

1. **Écrire** `videos/<sujet>/beats.js` (le texte que tu vas lire) et `index.html` (le poster).
   Le plus simple : demander à Claude Code « fais une vidéo sur le Pleuraerguss »
   (le skill `video-radiologie` du dépôt lui explique tout le format).
2. **Vérifier sans voix** : ouvre `videos/<sujet>/index.html` dans Chrome (espace = lecture, ← → = ±2 s),
   ou génère une planche d'images :
   ```bash
   node engine/render.mjs videos/<sujet> --sheet
   ```
3. **T'enregistrer** en lisant `beats.js` d'une traite (téléphone à 20 cm, pièce calme, débit naturel).
   Pose le fichier dans le dossier : `videos/<sujet>/voice.m4a` (wav, mp3, m4a… tout marche).
4. **Aligner** ta voix sur le script (nettoyage + volume -14 LUFS + minutage de chaque mot) :
   ```bash
   python tools/align.py videos/<sujet>/voice.m4a
   ```
   Le rapport `timings.report.txt` donne une qualité par phrase ; une phrase marquée « à vérifier »
   veut souvent dire que tu as dit autre chose que le script (corrige `beats.js` et relance).
   Pour plus de précision : `--model medium`.
5. **Rendre la vidéo** :
   ```bash
   node engine/render.mjs videos/<sujet>
   ```
   → `videos/<sujet>/out/video.mp4` (environ 2 minutes de calcul pour 1 minute de vidéo).

Testé sur l'audio de la vidéo de référence (darija + termes anglais) : écart moyen de 0,12 s entre
le début réel de chaque phrase et celui calculé, 36 phrases sur 37 à moins de 0,5 s.

## Écrire le poster (aide-mémoire)

Chaque élément qui doit apparaître reçoit un **cue** = le moment où il apparaît :

| cue | signification |
|---|---|
| `data-at="b5"` | au début de la phrase b5 |
| `data-at="b5@Pleuralinie"` | quand tu prononces le mot contenant « Pleuralinie » dans b5 |
| `data-at="b5@end"` | à la fin de b5 |
| `data-at="b5+0.4"` / `"b5@Pleura-0.2"` | avec un décalage en secondes |
| `data-at="prev+0.3"` | 0,3 s après l'élément précédent |

Animations (`data-anim`) : `write` (machine à écrire), `pop`, `fade`, `slide`, `wipe`, `draw` (contour dessiné
pour les cartes et les annotations SVG), `count` (chiffre qui défile, `data-to="5438"`).

Marques ajoutées sur un élément déjà visible : `data-hl` (surligneur jaune), `data-circle` (cercle à la main),
`data-underline`, `data-strike` (rature). Exemple : `<span data-hl="b17@Pleuralinie">Pleuralinie</span>`.

Composants : `.card`, `.bubble`, `.ribbon` (`.ribbon.white`), `.chip` (`.chip.yellow`), `.robot` (`data-stetho`),
`.burst`, `.xray` (image + `<svg class="anno" viewBox="0 0 largeur hauteur">` pour les flèches en
coordonnées de l'image : `<g data-rough="arrow" data-from="800,425" data-to="704,438" data-color="yellow">`,
aussi `ellipse`, `line`, `curve`, `rect`, `area`).

Caméra : elle cadre automatiquement le bloc `data-focus` qui contient l'élément qui apparaît.
`data-zoom="1.9"` force un zoom (ex. détail d'une radio), `data-cam="none"` empêche un élément de déplacer la caméra.
Le poster fait exactement 1080×1920 : c'est l'image finale du dézoom, conçue pour être « screenshotée ».

Texte : classe `ar` (arabe, droite→gauche) ou `de` (allemand). Les mots allemands dans une phrase en darija
sont isolés automatiquement dans les sous-titres pour que « ? » et « ! » restent du bon côté.

## Images radiologiques : droits

- **Wikimedia Commons** : beaucoup de radios en CC0, CC BY ou CC BY-SA → utilisables même pour un cours payant,
  avec crédit (voir la ligne de crédit en bas du poster de l'exemple). Une image CC BY-SA annotée reste CC BY-SA.
- **Radiopaedia** : CC BY-NC-SA → **pas d'usage commercial**. À éviter si tes vidéos ou ton cours sont payants.
- Tes propres images : seulement anonymisées (nom, date, numéro de dossier effacés, y compris dans les métadonnées).

## Notes

- Sans `timings.js`, le moteur estime la durée de chaque phrase : pratique pour monter le poster avant d'enregistrer.
- Si tu modifies `beats.js` après l'alignement, relance `align.py` (sinon les mots modifiés sont ré-estimés).
- Polices sous licence SIL OFL (`engine/fonts/OFL-*.txt`), rough.js sous licence MIT.
