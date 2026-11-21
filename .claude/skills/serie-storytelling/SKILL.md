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

## Production (style validé par l'auteur pour AKTE 01)

- **Personnages** : Open Peeps (CC0) via `serie/lib/peeps.js` + `peeps-parts.js` (généré par `npm run build:peeps`).
  Étudiant = corps `Doc`, coiffure `ShortVolumed` ; infirmière = `DocProtectiveClothe` + `Bun` (classe `nurse`) ;
  juge = buste `Turtleneck` + `GrayShort` + `GlassRound` ; proches = silhouettes grises sans visage (classe `sil`).
- **Décors et objets** : `serie/lib/props.js` (dessinés par Fable dans le style Open Peeps). Aperçu :
  `serie/lib/props-preview.html`.
- **Couleurs** : `serie/lib/palette.css`, palette **petrol** (choix de l'auteur). Jamais de jaune surligneur.
- **Animation** : `serie/lib/stage.js` (scènes, transitions, caméra avec zooms et secousses, personnages qui marchent,
  clignent, parlent, changent d'expression ; objets redessinés selon le temps). Un épisode = `index.html` (moteur en
  `mode: "scenes"`) + `beats.js` + `scenes.js` (voir `videos/ep01-spritze/` comme modèle).
- **Arabe sous chaque mot allemand** : `serie/glossaire.js` (sous-titres automatiques) et `c.de(texte, x, y, taille)`
  dans les scènes. L'auteur écrit « Bébé » (pas بيبي) et « ينجيكتيها » pour « spritzen ».
- **Pas de chevauchement** : zone utile y 210–1300, x < 960 pour le texte ; vérifier avec
  `node engine/render.mjs videos/<ep> --sheet` puis `--frames …` sur chaque scène, avant tout rendu final.
- **Voix** : l'auteur enregistre lui-même (la darija écrite par Claude sonne « IA ») ; transcription → `beats.js`,
  alignement, puis éventuellement ElevenLabs Speech-to-Speech avec son clone. Bruitages au mixage final.
