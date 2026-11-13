---
name: video-radiologie
description: Créer ou modifier une vidéo de révision radiologie pour la Kenntnisprüfung au style sketchnote (darija + termes allemands, voix de l'auteur) avec le moteur sketch-video du dépôt. À utiliser quand l'utilisateur demande une nouvelle vidéo sur un sujet (ex. « fais une vidéo sur le Pleuraerguss »), veut changer le script ou le poster d'une vidéo, aligner son enregistrement vocal ou rendre le MP4.
---

# Vidéo radiologie (sketch-video)

Le moteur est dans `sketch-video/`. Lis `sketch-video/README.md` (aide-mémoire des cues, animations,
composants) et prends `sketch-video/videos/pneumothorax/` comme modèle de référence avant d'écrire quoi que ce soit.

## Nouvelle vidéo : étapes

1. Crée `sketch-video/videos/<sujet-en-minuscules>/` avec `beats.js`, `index.html`, `assets/`.
2. **Script (`beats.js`)** — 15 à 25 beats, 45 à 75 s au total. Structure qui marche :
   - accroche examen : « ف الـKenntnisprüfung غادي يعطيوك هاد الصورة » + question du Prüfer en allemand
     (« Was sehen Sie? », « Was ist Ihre Verdachtsdiagnose? ») + punchline courte ;
   - le diagnostic + « خاصك تشوف 3 حوايج » ;
   - 3 signes radiologiques (terme allemand exact + explication darija simple) ;
   - piège ou urgence (Notfall, Differentialdiagnose, ce qu'il ne faut PAS faire) ;
   - **la phrase de Befund à dire à l'examen**, en allemand correct, sur 1 ou 2 beats ;
   - appel à commenter (« كتب ليا ف الـcomments… »).
   Règles d'écriture :
   - darija marocaine naturelle, en lettres arabes ; les termes médicaux en allemand, en lettres latines,
     avec l'article collé « الـPleuralinie » ;
   - phrases courtes (3 à 9 mots par beat), un beat = un sous-titre ;
   - pas d'abréviation que l'auteur ne prononcera pas tel quel ;
   - format JSON strict (guillemets doubles) : `tools/align.py` le relit.
3. **Exactitude médicale** : n'écris que des notions standard des manuels ou recommandations
   (Leitlinien, ATLS…). Si une valeur ou un geste a plusieurs variantes, donne les deux (comme Monaldi / Bülau).
   Signale à l'utilisateur tout point dont tu n'es pas sûr au lieu de l'inventer.
4. **Image** : cherche sur Wikimedia Commons (API `commons.wikimedia.org/w/api.php`, puis téléchargement direct
   via `upload.wikimedia.org/wikipedia/commons/<h0>/<h0h1>/<Fichier>`, où h = md5 du nom de fichier avec des `_`).
   - Accepte uniquement CC0, domaine public, CC BY, CC BY-SA ; **refuse les licences NC**, donc Radiopaedia.
   - Lis la description du fichier : côté, signes visibles. N'annote que ce que l'image montre vraiment.
   - Ajoute la ligne de crédit en bas du poster (titre, auteur, licence, « via Wikimedia Commons (annotiert) »).
   - Pour placer les flèches, superpose une grille de coordonnées sur l'image (PIL) et vérifie visuellement ;
     les flèches pointent VERS le signe, elles ne le recouvrent pas.
5. **Poster (`index.html`)** — exactement 1080×1920 : c'est l'image finale du dézoom, tout doit y tenir.
   - Blocs `.blk` en position absolue, chacun avec `data-focus` et une largeur de 350 à 700 px
     (au-delà, la caméra ne zoome plus).
   - Ordre de lecture droite→gauche pour l'arabe. Un seul accent couleur : le jaune.
   - Chaque élément : `data-at` lié à un MOT du beat (`b6@Pleuralinie`), pas seulement au début du beat.
   - Annotations sur la radio : `<svg class="anno" viewBox="0 0 W H">` aux dimensions réelles de l'image,
     avec `data-zoom="1.9"` pour zoomer sur le détail.
6. **Vérifie toujours visuellement** avant de rendre la vidéo :
   ```bash
   cd sketch-video
   node engine/render.mjs videos/<sujet> --sheet          # planche toutes les 2 s -> out/sheet.png
   node engine/render.mjs videos/<sujet> --frames 5,12,30  # images précises
   ```
   Ouvre `out/sheet.png` et la dernière image (dézoom) : texte coupé, chevauchements, bidi
   (« ? » ou « ! » du mauvais côté → mettre le passage allemand dans `<span class="de">`),
   flèches mal placées, éléments hors du poster. Corrige, puis recommence.
7. Rends la vidéo sans voix (`node engine/render.mjs videos/<sujet>`) pour que l'utilisateur valide le rythme,
   puis demande-lui de s'enregistrer en lisant `beats.js`.

## Quand l'utilisateur a enregistré sa voix

```bash
cd sketch-video
python tools/align.py videos/<sujet>/voice.m4a        # -> timings.js + timings.report.txt
node engine/render.mjs videos/<sujet>                 # -> out/video.mp4 avec la voix
```
- Lis `timings.report.txt` : un beat « à vérifier » (qualité < 35 %) veut souvent dire que l'utilisateur
  a dit autre chose que le texte. Corrige `beats.js` pour coller à ce qui a été dit, puis relance l'alignement.
- Le darija n'a pas besoin d'être bien transcrit par Whisper : seul le rythme compte.
- Ne mets jamais le script complet comme `initial_prompt` de Whisper : il sauterait le début de l'audio.
  L'outil ne passe que les termes latins.

## À ne pas faire

- Ne modifie pas `engine/` pour un besoin propre à une seule vidéo : mets un `<style>` local dans `index.html`.
- Pas d'images d'IA générative pour les radios (signes inventés = faux apprentissage).
- Pas de données patient : pas de nom, de date ni d'identifiant visibles sur les images.
