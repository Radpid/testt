---
name: serie-storytelling
description: Écrire et produire un épisode de la série storytelling « cas réels » de @dr.aguilo (histoire vraie d'un jeune médecin sanctionné en Allemagne, Reel animé darija + allemand). À utiliser quand l'utilisateur demande « l'épisode suivant », un nouveau cas, un scénario ou un storyboard pour la série, ou veut modifier un épisode existant.
---

# Série storytelling « cas réels »

Lis d'abord `sketch-video/serie/SERIE.md` : format fixe, règles de vérité, liste des épisodes et sources.
Le moteur vidéo est décrit dans `sketch-video/README.md` (et le skill `video-radiologie` pour la voix ElevenLabs).
Un épisode vit dans `sketch-video/videos/epNN-<mot>/` : `recherche.md`, `scenario.md`, puis `beats.js`, `index.html`.

## Étapes (une validation de l'utilisateur à chaque étape)

1. **Choix du cas** dans `SERIE.md` (ou nouvelle recherche : jugements VG/OVG/LG/OLG/BGH, presse médicale sérieuse).
2. **Vérification à fond** → `recherche.md` : chronologie sourcée, citations allemandes VERBATIM lues dans la source,
   points incertains, statut définitif ou non. Sans source, pas de scène.
3. **Scénario** → `scenario.md` (modèle ci-dessous). Le montrer en entier à l'utilisateur, attendre son accord.
4. **Personnages et décors** en images fixes (captures `--frames`) → validation.
5. **Animation** (scènes, personnages, transitions) → captures `--sheet` → validation.
6. **Voix** : narration darija avec le clone « yassine » ; voix allemandes ElevenLabs différentes pour les personnages si
   l'utilisateur le veut. Contrôle de prononciation avec Whisper.
7. **Rendu final**, cover, légende Instagram. Mettre à jour le statut dans `SERIE.md`.

## Écrire un scénario qui retient (règles)

- **0–2 s : l'accroche** = le geste banal + la conséquence énorme, dans la même phrase.
  Ex. « حاجة كتديرها عشرين مرة ف النهار… و تحكم عليه بالقتل الخطأ ». Jamais de « Salam, aujourd'hui on va parler de ».
- **Boucle ouverte** dès la 1re scène : une question dont la réponse n'arrive qu'à la fin
  (« جملة وحدة كانت غادي تنقذو. شنو هي؟ »).
- **Le gel** au moment de l'erreur : image figée, désaturée, le narrateur s'adresse au spectateur (« STOP. نتا، شنو غادي دير؟ »).
  C'est le moment qu'on partage.
- **Un changement visuel toutes les 1,5–2 s** (personnage qui bouge, zoom, objet qui apparaît, texte) ; une idée par scène ;
  scènes de 3 à 7 s.
- **Montrer, pas raconter** : la seringue laiteuse en gros plan plutôt que « la seringue contenait un sirop ».
- **Détails concrets et vrais** (date, âge, heure, montant) : ils rendent l'histoire crédible. Pas de détail inventé.
- **Le retournement juridique** : ce que le jeune médecin croyait (« c'est la faute de l'organisation ») et ce que le juge a dit.
- **Payoff** : la carte « القاعدة » = une règle actionnable, courte, capturable (souvent un acronyme ou 3 vérifications).
- **Fin** : la réponse à la boucle ouverte, puis l'appel à commenter + teaser de l'épisode suivant.
- Darija marocaine naturelle, phrases de 3 à 9 mots ; allemand correct pour les répliques ; nombres en toutes lettres
  pour la synthèse vocale.
- Respect : aucune image choquante ; la mort se dit sobrement (le moniteur qui s'éteint, une lumière, du silence).
- Dialogue inventé → étiquette « Rekonstruktion » à l'écran ; citation réelle → « Zitat Urteil ».

## Modèle de `scenario.md`

```
# Akte NN — <titre>          durée visée : 70–80 s
Sources : …   Statut du jugement : définitif / non définitif
Boucle ouverte : …   Règle finale : …

| # | t | Ce qu'on voit (personnages, décor, mouvement, caméra) | Voix (darija) | À l'écran (allemand, étiquettes) | Son |
```
Puis : liste des personnages, des décors et des objets à dessiner ; points à faire valider.

## Légende Instagram (modèle)

Accroche (1 ligne) · résumé en 2 phrases · la règle · « Quellen: <tribunal, date, Az.> ; <média, date> » ·
« Namen anonymisiert · Szenen teilweise nachgestellt · Keine Rechtsberatung » · hashtags
(#Kenntnisprüfung #Approbation #Assistenzarzt #ArztInDeutschland #طبيب_في_ألمانيا).

## Production (pipeline validé sur AKTE 01, novembre 2026)

Modèle complet : `videos/ep01-spritze/` (`index.html` + `beats.js` + `timings.js` + `story.js`).

- **Style « référence »** : tout au trait (rough.js, hachures grises), papier uni, **jaune surligneur** (#F8CE4E),
  `data-palette="reference"`. Les essais Open Peeps / palette petrol / « board » ont été abandonnés par l'auteur.
- **Personnages** : `serie/lib/sketch-cast.js` (dessinés par Fable). `SketchCast.person(g, params)` : tenues
  `coat` (étudiant, badge PJ), `scrubs` (infirmière), `oberarzt`, `robe` (juge), `civil`, `mother` (silhouette sans visage) ;
  membres libres (`armL/armR`, `legL/legR`, `torsoLean`, `headTilt`, `view: front|side|back`, `expr`, `talk`) et poses
  `SketchCast.Pose` (stand, walk, run, point, holdObject, carryBaby, leanOverCrib, handsOnHead, standDock…).
  Mains en moufle, **jamais de doigts**. Bébé : `SketchCast.baby` (`state: "normal" | "blue"`).
  Objets : syringe, crib, monitor (`hr` = "!", "" ou "0" — jamais de chiffres inventés), dock, stamp, ribbon, marker…
- **Animation** : `serie/lib/stage.js`. Une scène plein écran par idée, caméra par scène (zoom avant/arrière,
  panoramique), transitions (cut, fade, slideLeft/Up, zoom, iris, wipe), `c.shake`, `st.flash`, `st.vignette`,
  `c.sk(dessin, paramsFn)` pour redessiner un personnage qui bouge, `walker` pour les entrées/sorties.
  Fin : `st.summary(...)` = affiche-résumé de toutes les scènes + dézoom (comme la vidéo de référence).
- **Repères** : chaque animation se cale sur un mot de la voix (`"b7@الدم"`, `"b21@end"`, `"b4@جملة+0.2"`).
  Vérifier qu'aucun repère ne manque : `node <scratchpad>/beattimes.mjs videos/<ep>/index.html` (erreur sinon).
- **Arabe sous chaque mot allemand** : `serie/glossaire.js` (sous-titres, sensible à la casse) et `k.chip(de, ar)` /
  `c.de(texte, x, y, taille, ar)` dans les scènes. L'auteur écrit « Bébé » (pas بيبي) et « ينجيكتيها » pour « spritzen ».
- **Pas de chevauchement** : zone utile y 210–1300 (sous-titres dessous), texte à x < 960 ; quand la caméra
  panoramique, masquer (`.hide`) ce qui sortirait à moitié du cadre. Contrôle : `--frames t1,t2,…` sur chaque scène
  (planche contact), puis rendu final.
- **Voix = l'auteur** (la darija écrite par Claude sonne « IA ») :
  1. Il enregistre à partir du script (il change souvent le texte : c'est SON texte qui fait foi).
  2. ElevenLabs Scribe (`scribe_v2`, horodatage par mot) → transcription ; retirer hésitations, répétitions,
     consignes parlées (« juste le silence » = mettre un vrai silence).
  3. Montage **par phrase, jamais mot par mot** (couper chaque mot et le recoller = voix saccadée, refusé par
     l'auteur). L'audio reste continu tant que les mots gardés se suivent ; on coupe seulement les mots retirés et les
     pauses trop longues, au point le plus silencieux (énergie sur 30 ms), avec fondus enchaînés de 20 ms et le fond
     sonore réel de la pièce (pas de silence numérique). Pauses : ≤ 0,42 s dans une phrase, 0,28–0,55 s entre phrases,
     0,5–0,8 s entre scènes, silence voulu après la mort (≈ 2 s). Vérifier les mots anormalement longs de Scribe
     (> 0,85 s : la pause a été collée au mot) et recaler leur début à l'énergie.
  4. **Audio Isolation** ElevenLabs (garde SA voix, enlève l'écho/le bruit) puis mastering ffmpeg :
     `highpass=75, afftdn léger, EQ +1,5 dB@160, −1,8 dB@320, +2 dB@3,2 kHz, −1,5 dB@7,2 kHz, deesser,
     compresseur doux 2,5:1 (attaque 10 ms, relâche 150 ms)`, puis gain vers −14 LUFS et `alimiter` 0,8.
     Jamais de gate (effet haché). Le Speech-to-Speech avec le clone est une alternative
     (son plus « studio » mais la darija devient moins intelligible : à proposer, pas à imposer).
  5. Re-transcrire le résultat (Scribe) → `beats.js` (une phrase = un beat) + `timings.js` (mots horodatés).
  6. Bruitages discrets ElevenLabs `sound-generation` (tampon, porte de cellule, alarme, flatline, marteau)
     mixés 10–20 dB sous la voix, calés sur les repères. Max 4 requêtes ElevenLabs en parallèle.
- **Reprises de l'auteur** : il renvoie de courtes prises pour corriger une phrase ou ajouter un mot oublié.
  Transcrire chaque prise (Scribe), décider où elle remplace / complète le texte, et monter par phrase
  avec plusieurs sources (`videos/ep01-spritze/montage_voix.py` : `BEATS = [("b8", [("t7", [...]), ("raw", [90])])]`).
  Isoler chaque source AVANT le montage (Audio Isolation sur l'enregistrement complet et sur chaque prise).
  Les reprises n'ont PAS le même son (AKTE 01 : +6 à +10 dB de graves, −6 à −20 dB d'aigus, +6 à +10 dB de niveau) :
  les égaliser sur l'original (EQ d'appariement par 1/6 d'octave + même niveau RMS, `match()` dans montage_voix.py),
  puis vérifier l'écart par bandes (≤ ±3–4 dB). Laisser une respiration (~0,3 s) aux raccords en milieu de phrase.
- **Lieu = carte** (exigence de l'auteur) : dès qu'une ville allemande est nommée, carte de l'Allemagne au trait
  (contour `DE` + `geo(lon, lat)` dans story.js d'AKTE 01), Berlin en repère, épingle jaune qui tombe sur la ville,
  plan serré sur la carte puis recul ; laisser une respiration (~0,45 s) après le nom de la ville.
- **Logo** : pastille `@dr.aguilo` (coin haut droit, sous l'en-tête Instagram), masquée sur l'affiche finale.
- **Cadrage** : l'auteur VEUT des zooms forts (×1,3 à ×1,55), mais chacun cadre un sujet complet et soigné
  (étiquette de la seringue, mère + Bébé, injection avec le Bébé entier, Bébé bleu + moniteur…) : jamais un
  personnage, une bulle ou une carte coupés. Titres de scène (rubans) fixés à l'écran (`parent: c.hud`) pour que
  les zooms ne les coupent pas. Vérifier sur une planche des pics de zoom avant le rendu.
- **Sous-titres centrés** sur toute la largeur (`capSafeRight: 0`), 76 px, pages ≤ 5 mots / 24 caractères,
  `captionBottom: 280` : le bas (≈ 280 px) reste libre car Instagram y affiche pseudo, légende et musique.
- **Livrer aussi la description Instagram** (`instagram.md`, modèle ci-dessus).
- **Durée** : l'auteur veut court MAIS refuse qu'on supprime des scènes ou des phrases (AKTE 01). Garder tout son
  texte, accélérer à ×1,3 (vérifié : aussi intelligible que ×1,12 au contrôle Scribe), pauses très serrées.
  Ne couper du contenu que s'il le demande explicitement.
- **La mort** ne se dit pas : scène muette (moniteur qui ralentit puis ligne plate, mère, heure, « مات الـBébé » écrit,
  la couleur s'éteint), son de moniteur synthétisé (`son/flatline.py`).
- **Rythme** (demande de l'auteur : « beaucoup plus rapide ») : pauses ≤ 0,3 s dans une phrase, 0,14–0,32 s
  entre phrases, 0,18–0,3 s entre scènes, puis `atempo=1.3` (hauteur conservée). Transitions 0,35 s (`whip`).
- **Sous-titres karaoké** (`SV_CONFIG.captions = "karaoke"`) : pages de ≤ 6 mots, gros texte (62 px, Plex Arabic Bold),
  mots à venir en filigrane, chaque mot rebondit quand il est dit, mot en cours surligné en jaune ; ne jamais couper
  « La | seringue ». `captionBottom: 320` pour utiliser le bas de l'écran.
- **Cadrage** : `Stage.create(sv, { view: { s: 1.06, oy: 20, breathe: 0.035 } })` (tout plus grand, poussée lente
  continue) + `c.kick(repère, 0.05–0.08)` sur chaque mot fort. Arabe des scènes ≥ 40 px, gras, encre (pas gris),
  révélé de droite à gauche (`.wipe(at, 0.7, "rtl")`).
- **Son « voice-off »** (`videos/ep01-spritze/son/`) : voix isolée + EQ/compression ; musique ElevenLabs Music
  composée par sections calées sur l'histoire (`musique_plan.json` : accroche, mystère, hôpital, erreur, urgence,
  silence, tribunal, leçon), ~ -25 dBFS et -7 dB de ducking quand la voix parle ; ~70 bruitages ElevenLabs décrits
  comme une petite histoire (`bruitages_prompts.tsv`) et placés sur les mots (`plan_bruitages.py`, `mixage.py`).
  Mixage final −14 LUFS, crête −1 dB.
- **Vérité** : si l'enregistrement contient une approximation (date, ce que les parents voulaient…), la corriger
  à l'écran et le signaler à l'auteur ; ne jamais montrer une peine qui n'a pas été prononcée.
- **Clé ElevenLabs** : fournie par l'auteur pour la session uniquement ; la garder hors du dépôt (scratchpad, chmod 600),
  la supprimer à la fin et lui rappeler de la régénérer.
