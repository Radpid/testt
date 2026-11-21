---
name: serie-storytelling
description: Écrire et produire un épisode de la série storytelling « AKTE » de @dr.aguilo (histoire vraie d'un jeune médecin sanctionné en Allemagne, Reel Instagram animé au trait, voix darija de l'auteur + termes allemands). À utiliser quand l'utilisateur demande « l'épisode suivant », un nouveau cas, un scénario, un storyboard, le montage de sa voix, la musique/les bruitages, le rendu ou la description Instagram d'un épisode, ou veut modifier un épisode existant.
---

# Série « AKTE » — cas réels de jeunes médecins en Allemagne

Lis d'abord `sketch-video/serie/SERIE.md` : format, règles de vérité, épisodes (statut, sources).
**Modèle complet et validé : AKTE 01, `sketch-video/videos/ep01-spritze/`** (publié en novembre 2026).
Copier ce dossier pour un nouvel épisode et remplacer le contenu ; ne pas repartir de zéro.

```
videos/epNN-<mot>/
  recherche.md        faits sourcés, citations verbatim, chronologie, statut du jugement
  scenario.md         script darija + plan des scènes (validé par l'auteur)
  montage_voix.py     montage de SA voix : sources, phrases (BEATS), corrections (FIX), pauses
  beats.js            une phrase = un beat = un sous-titre (texte exact de sa voix)
  timings.js          minutage mot par mot (généré par montage_voix.py)
  index.html          réglages (SV_CONFIG), styles, logo
  story.js            les scènes (personnages, caméra, textes, animations)
  son/                musique_plan.json, bruitages_prompts.tsv, plan_bruitages.py, mixage.py, flatline.py
  instagram.md        description prête à coller
```

## Étapes (une validation de l'auteur à chaque étape)

1. **Choix du cas** dans `SERIE.md` (ou nouvelle recherche : jugements VG/OVG/LG/OLG/BGH, presse médicale sérieuse).
2. **Vérification à fond** → `recherche.md` : chronologie sourcée, citations allemandes VERBATIM, points incertains,
   définitif ou non. Sans source, pas de scène.
3. **Script** court en darija → `scenario.md`. L'auteur le relit et le réécrit à sa façon (la darija écrite par
   Claude « sonne IA ») : c'est SON enregistrement qui fait foi, pas le script.
4. **Enregistrement** par l'auteur (+ courtes reprises pour corriger une phrase ou ajouter un mot).
5. **Montage voix** (§ Voix) → `beats.js` + `timings.js`. Lui signaler ce qui a été retiré/corrigé et les mots incertains.
6. **Scènes** (§ Image) → planches contact AVEC la maquette Instagram (§ Zones) → validation.
7. **Son** (§ Son) : musique composée sur la frise de l'épisode, bruitages, mixage.
8. **Rendu final** + `instagram.md` + statut dans `SERIE.md`. Livrer la vidéo ET la description.

## Écrire une histoire qui retient

- **0–2 s : l'accroche** = la conséquence énorme (« طبيب شاب في ألمانيا تحكم عليه بالقتل غير العمدي »).
  Jamais de « Salam, aujourd'hui on va parler de ».
- **Boucle ouverte** : « والحل كان غير في جملة واحدة » → la réponse arrive à la fin (« Was ist da drin? »).
- **Le gel** au moment de l'erreur : STOP + « إيجي، كنت في Place، شنو كنت غادي دير؟ ».
- Une idée par scène, un changement visuel toutes les 1,5–2 s ; **montrer** plutôt que raconter.
- Détails concrets et vrais (date, âge, heure, montant). Pas de détail inventé.
- Le retournement juridique + **la règle** finale, courte et actionnable (cases numérotées).
- **La mort ne se dit pas** : scène muette (moniteur qui ralentit puis ligne plate, proche en silhouette, heure,
  « مات الـBébé » écrit à la main, la couleur s'éteint), ~3,5 s sans voix.
- Fin : appel à commenter + teaser « AKTE NN+1 · قريبا ».
- Écriture de l'auteur : « Bébé » (pas بيبي), « ينجيكتيها » pour « spritzen », mots français/allemands tels qu'il les dit.
- Dialogue reconstitué → « Rekonstruktion » ; citation réelle → « laut Urteil ».

## Voix (sa voix, jamais une voix de synthèse par défaut)

1. **Scribe** (`scribe_v2`, horodatage par mot) sur l'enregistrement et chaque reprise. Re-transcrire aussi le
   résultat monté : la 2e transcription corrige souvent la 1re (AKTE 01 : « وكيتنفس بجهد », « دازت … ونص »).
   Signaler à l'auteur les mots incertains au lieu de deviner.
2. **Audio Isolation** ElevenLabs sur CHAQUE source complète AVANT le montage.
3. **Reprises** : elles n'ont pas le même son (AKTE 01 : +6 à +10 dB de graves, −6 à −20 dB d'aigus, +6 à +10 dB
   de niveau). Les égaliser sur l'original (`match()` : EQ d'appariement par 1/6 d'octave + même RMS), vérifier
   l'écart par bandes (≤ ±3–4 dB). Retirer leurs hésitations (« آآ ») et tout ce qui est faux (ex. « الريفوباسين »
   dans la bouche de l'infirmière).
4. **Montage par phrase, jamais mot par mot** (mot par mot = voix saccadée, refusé). Audio continu tant que les mots
   se suivent ; coupes au point le plus silencieux, fondus de 20 ms. Mots Scribe anormalement longs (> 0,85 s) :
   recaler leur début à l'énergie.
5. **Rythme** : pauses ≤ 0,24 s dans une phrase, 0,10–0,24 s entre phrases, 0,18–0,30 s entre scènes (avant tempo),
   puis `atempo=1.3` (hauteur conservée ; vérifié aussi intelligible que ×1,12).
   **Pauses de sens imposées** (`PAUSE_BEFORE`, même entre mots contigus) : ~0,6 s entre deux phrases distinctes
   (« …الحبس. » / « والرخصة… »), ~0,45 s après un nom de ville (carte), silence de la scène de mort.
6. **Durée** : l'auteur veut court mais **refuse qu'on supprime des scènes ou des phrases** sans le lui demander.
   AKTE 01 : 1 min 32 à ×1,3. Pour descendre vers 1 min, il faut couper des phrases : proposer la liste, ne pas l'imposer.
7. **Mastering « voice-off »** : `highpass 80, EQ +2 dB@120, −2,5 dB@300, +3 dB@3,5 kHz, high-shelf +1,5 dB@9,5 kHz,
   deesser 0,45, compresseur 3:1 (6/90 ms)` → −15 LUFS voix, `alimiter 0.8`. Jamais de gate.

## Image

- **Style** : tout au trait (rough.js, hachures grises), papier à points, **jaune surligneur** #F8CE4E,
  `data-palette="reference"`. Personnages `serie/lib/sketch-cast.js` (tenues coat/PJ, scrubs, oberarzt, robe,
  civil, mother = silhouette sans visage ; poses `SketchCast.Pose` ; mains en moufle, jamais de doigts ;
  `SketchCast.baby` normal/blue). Objets : syringe, crib, monitor (`hr` "!", "" ou "0", jamais de chiffres
  inventés), dock, stamp, ribbon, marker, bed, cabinet, door, clock, gavel.
- **Moteur** `serie/lib/stage.js` : une scène plein écran par idée ; transitions 0,35 s (`whip`, `wipe`, `iris`,
  `fade`, `cut`) ; `c.camera([...])` par scène ; `c.kick(repère, 0.05–0.08)` sur chaque mot fort ; `c.shake`,
  `st.flash`, `st.vignette` ; `walker` ; `c.hud` = calque fixé à l'écran ; scène muette `summary: false`.
  Fin : `st.summary(...)` = affiche-résumé de toutes les scènes + dézoom.
- **Cadrage global** : `Stage.create(sv, { view: { s: 1.06, oy: -46, breathe: 0.04 } })`.
- **Zooms** : l'auteur VEUT des zooms forts (×1,3 à ×1,7) sur des sujets complets et soignés (étiquette de la
  seringue, carte, mère + Bébé, injection avec le Bébé entier, Bébé bleu + moniteur). Jamais un personnage, une
  bulle, une carte ou un titre coupé. Titres de scène (rubans) et textes importants pendant un zoom → `c.hud`.
- **Lieu = carte** : dès qu'une ville est nommée, carte de l'Allemagne au trait (`DE` + `geo(lon, lat)` dans
  story.js d'AKTE 01), Berlin en repère, épingle jaune qui tombe + onde, plan serré sur la carte puis recul.
- **Arabe** ≥ 40 px, gras, encre (pas gris), révélé de droite à gauche (`.wipe(at, 0.7, "rtl")`) ; arabe sous
  chaque mot allemand (`serie/glossaire.js` pour les sous-titres, `k.chip(de, ar)` / `c.de()` dans les scènes).
- **Sous-titres karaoké** (`captions: "karaoke"`) : étiquette blanche + scotch, Plex Arabic Bold, UNE ligne
  (≤ 4 mots), mots à venir en filigrane, chaque mot rebondit, mot en cours surligné ; ne jamais séparer
  « La | seringue » ; pas de traduction en double si elle est déjà à l'écran (`capTr: false`).
- **Repères** calés sur les mots (`"b7@الدم"`, `"b21@end"`, `"b4@جملة+0.2"`) ; vérifier qu'aucun ne manque
  (script beattimes : charge la page, erreur si un mot est introuvable).

## Zones Instagram (mesurées sur une capture réelle du Reel publié, iPhone, novembre 2026)

Instagram affiche la vidéo 1080×1920 à 0,942× de sa hauteur et **rogne ~50 px de chaque côté** (plus sur les
écrans plus allongés). En pixels de la vidéo :

| Zone couverte | Position | Règle |
|---|---|---|
| Bords rognés | x < 50 et x > 1030 | contenu important entre **x 90 et 990** (après le zoom global ×1,06 : monde 100–980) |
| Barre d'état + flèche retour | y < 250 (flèche à gauche) | rien d'important au-dessus de 250 |
| Boutons j'aime/commentaire/repartage/partage | **x > 915, y 980–1650** | aucun texte ni sous-titre dans cette colonne |
| Pseudo, légende, musique | y > 1650 | rien en dessous de 1630 |

- Logo `@dr.aguilo` : `right: 100px; top: 222px` (AKTE 01 l'avait à 30 px du bord → rogné).
- Sous-titres : centrés, `max-width: 720px` (180–900, hors colonne de boutons), 62 px, pages ≤ 15 caractères, `captionBottom: 320`
  (bas à 1600). L'image doit finir au-dessus du haut des sous-titres (~1470).
- Affiche finale : 4 colonnes, entre y 300 et 1250, largeur utile 90–990.
- Contrôle obligatoire : `python3 sketch-video/tools/ig_overlay.py capture.png` sur une planche (un cliché par
  phrase + pics de zoom + affiche finale). Rien d'important sous une zone rouge.

## Son

- **Musique** ElevenLabs Music (`/v1/music`, `composition_plan`) composée par sections calées sur la frise réelle
  de l'épisode (accroche, mystère, hôpital, erreur, urgence, silence, tribunal, leçon) ; la recomposer quand la
  durée change. ~ −25 dBFS, −7 dB de ducking quand la voix parle.
- **Bruitages** ElevenLabs `sound-generation` décrits comme une petite histoire (`son/bruitages_prompts.tsv` :
  tampon, porte de cellule, souffles de transition, pops des étiquettes, pas, alarme, course, ventilateur,
  marteau, stylo, ticks de la règle…), placés sur les mots (`plan_bruitages.py`), 10–25 dB sous la voix.
  Moniteur/ligne plate : synthétisé (`son/flatline.py`), calé sur l'image. Max 4 requêtes ElevenLabs en parallèle ;
  `duration_seconds` ≥ 0,5.
- Mixage (`son/mixage.py`) → −14 LUFS, crête ≤ −1 dB ; remuxer sur la vidéo rendue.

## Vérité

- Si l'enregistrement contient une approximation (date, ce que disent les proches, nom du médicament, durée de
  réanimation), corriger à l'écran ou retirer le mot, et le dire à l'auteur. Ne jamais montrer une peine qui n'a
  pas été prononcée ; dire si le jugement est définitif.

## Avant de livrer (checklist)

- [ ] Transcription du montage relue ; mots incertains signalés à l'auteur.
- [ ] Aucune scène ni phrase supprimée sans son accord ; pauses de sens présentes.
- [ ] Planche avec maquette Instagram : rien sous les zones rouges, aucun zoom qui coupe un sujet, sous-titres sur
      une ligne, logo entièrement visible.
- [ ] Musique recomposée sur la durée finale ; bruitages recalés ; −14 LUFS.
- [ ] `instagram.md` (accroche, résumé, règle, Quellen + Az., « Namen anonymisiert · Szenen nachgestellt · Keine
      Rechtsberatung », hashtags) livré avec la vidéo ; `SERIE.md` à jour.

## Clé ElevenLabs

Fournie par l'auteur (dans le chat, ou variable `ELEVENLABS_API_KEY` de l'environnement) : la garder hors du dépôt
(scratchpad, chmod 600), ne jamais la committer ni l'afficher. **Ne la supprimer que lorsque l'auteur le dit**
(consigne explicite du 21/11/2026), puis lui rappeler de la régénérer.
