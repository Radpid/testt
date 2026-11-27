# AKTE 04 — « 63 ساعة » (Köln, 2011 · jugement de 2012) — STORYBOARD

Numéro provisoire (`const AKTE_NO = "04"`, `AKTE_NEXT = "05"`, à UN seul endroit de `story.js`).
Texte figé : `scenario.md`, `beats.js` (32 beats : b1–b3, i1–i3, b4–b29), `timings.js` **PROVISOIRE** (93,5 s).
Ce document se suit tel quel pour écrire `decor.js`, `story.js`, `index.html`. Tout ce qui bouge y est.
Écrit le 26.11.2026 d'après : le skill, `SERIE.md`, `SAISON-2.md` (fiche 04 + les cinq autres), `recherche.md`,
`serie/lib/stage.js`, `motion.js`, `persona.js`, le gabarit, et (pour la technique seulement) AKTE 03.
Les personnages et les poses difficiles ont été rendus pour essai avant d'être prescrits (voir § 7, R1–R3).

---

## 0. Direction en dix lignes

1. **Tournure : le rembobinage.** On ouvre sur la fin (la balance : coupable, peine 0), on revient en arrière en
   trois pages (`swipeR`) devant trois objets qu'on ne comprend pas encore (la feuille, les deux poches, 63),
   puis le récit repart en avant (`swipe`) et retrouve ces objets dans l'ordre inverse.
2. **Dispositif signature : le compteur à rouleaux** (comme un compteur kilométrique) fixé en haut à gauche de
   l'écran pendant toute l'histoire : il remonte à 00, compte les 63 heures une à une, reçoit le bloc « + > 12 h »,
   **se fige** au décès, puis **quitte l'écran** pour tomber sur le chariot de l'administration au tribunal.
3. **Les deux poches jumelles** : même dessin, même étiquette illisible, aucune lettre. Seule teinte de
   l'épisode : **rouge sang** `#B5332D` (hachure `#8E1F1C`), sur le sang seulement (poches, tubulure, globules).
4. **La frise des heures** : 63 petites cases (une par heure, jamais de jours ni d'heures par jour) qui se
   noircissent, puis le bloc de 24 cases de la garde. Le planning dit ce que dit le jugement, rien de plus.
5. **Caméra : travelling latéral.** Gauche → droite quand l'histoire avance, droite → gauche pendant le
   rembobinage, immobile quand tout s'arrête (décès, dernière phrase). Presque aucun zoom (≤ ×1,15).
6. **Typographie « machine à écrire »** (classe `.tw`) pour tous les chiffres, heures, dates et citations :
   le texte se tape lettre par lettre. **Aucune bulle** : personne ne parle, il n'y a aucun dialogue sourcé.
7. **Les institutions n'ont pas de visage** : le labo est une ombre derrière une vitre dépolie, l'administration
   un fauteuil vu de dos et une manche de costume, le parquet une carte tapée « beantragt ». Seuls ont un
   visage : elle, le patient, le tribunal (un juge + deux Schöffen), l'expert, et « toi » dans la règle.
8. **Formes imposées** : tribunal = la balance en gros plan qui penche (accroche) puis revient (b24) ;
   sanction = le tampon « § 60 » à la place de la peine, aucune icône ; carte = Allemagne → Rhin → silhouette de
   la cathédrale ; intro = la fiche de Yassine épinglée sur le tableau de garde ; scène muette = le patient
   dans son lit, le compteur se fige, puis elle glisse le long du mur. **Pas de moniteur** dans cet épisode.
9. **Ton** : grave, sobre, sans effet ; apaisé à partir de « genug bestraft ». Piano seul.
10. **Différences** — AKTE 02 : cellule, couple, chambre, icônes de peine ; AKTE 03 : bloc opératoire, bulles,
    scotch, escalier ; 05 : coupe de l'hôpital et horloge ; 06 : plongée et mains ; 07 : téléphone ; 08 : lettres ;
    09 : écran coupé. Ici : une balance, un compteur, des cases, des pages qui se tournent, aucune bulle,
    aucune icône de peine, aucun moniteur, aucune main vue de dessus, aucun écran partagé.

---

## Conventions (valables pour tout le document)

**Repères.** « monde » = repère de la scène (1080 × 1920) avant caméra ; « écran » = pixels de la vidéo.
Caméra par défaut de l'épisode : `{ s: 1, cx: 540, cy: 920 }` ; cadrage global `view: { s: 1.06, oy: -20,
breathe: 0.04 }`. Conversion : `écran x = 540 + (x − cx)·k`, `écran y = 940 + (y − cy)·k`, avec
`k = cam.s × 1,06` au début d'une scène et `× 1,10` à la fin (le « breathe »).

| monde (cy 920) | y 380 | y 450 | y 560 | y 1300 (sol) | y 1385 |
|---|---|---|---|---|---|
| écran (début → fin de scène) | 368 → 345 | 442 → 422 | 558 → 543 | 1343 → 1359 | 1433 → 1453 |

**Zones.** Décor entre x 110 et 960 (monde). Rien d'important au-dessus de y 250 ni sous y 1470 (écran).
Aucun personnage, texte ni objet important pour x > 915 et y 980–1650 (écran).

**Trois bandes fixes (écran), les mêmes dans toutes les scènes :**
- **bande HUD** y 262–356 : compteur à gauche (x 112–468), onglet du jour à droite (x 700–962). Le décor ne met
  rien d'important sous ces deux rectangles (en monde : rien d'important au-dessus de y 395 pour x < 490 et x > 680).
  Une **corniche** à y 380 (monde) ferme le haut de tous les décors intérieurs.
- **bande des pastilles** y 420–530 : UNE pastille à la fois, centrée (540, 450), l'arabe détaché dessous
  (`k.chip(de, ar, 540, 450, taille, { parent: c.hud })`). Aucun décor porteur de sens derrière (monde : x 380–700,
  y 425–535).
- **bande des citations** : allemand en `.tw` 20 px à y 1372, arabe gras 28 px à y 1412, centrés x 520, largeur
  ≤ 800 (x 120–900), dans `c.hud`. Elle porte les citations « laut Urteil » et la mention « Rekonstruktion ».

**Typographie.** `.tw { font-family: "AKTE Mono", "Liberation Mono", "DejaVu Sans Mono", monospace; font-weight:
700; fill: var(--ink); }` déclarée dans `index.html` ; `@font-face "AKTE Mono"` = une police libre de machine à
écrire copiée dans `assets/fonts/` si elle est disponible, sinon `local("Liberation Mono Bold")`. À contrôler sur
la machine de rendu (§ 8). Frappe : `c.write(noeud, repère, 0.05 s × nombre de signes)` + un tressaut vertical
de ±1,5 px à chaque signe (`.on()` : `Math.floor((t - a) / 0.05) % 2`).
Allemand manuscrit : `de` (Kalam). Arabe : `ttl` (Lalezar) pour les titres ≥ 40 px, `ar strong` (Plex Arabic
gras) ≥ 26 px pour les traductions, révélés de droite à gauche (`wipe(…, "rtl")`), contour papier
(`paint-order: stroke`) dès qu'ils sont posés sur un décor.

**Couleurs.** Encre `#1C1A1C`, gris hachurés du socle, jaune `#F8CE4E`, **rouge sang `#B5332D` / `#8E1F1C`**
(≤ 5 % de l'image, sur le sang seulement). Aucun bleu, aucun voile rouge (`m.alarm` interdit ici), voyants
d'appel en jaune.

**Parole.** `talk: 0` pour tous, tout le temps. Aucune bulle (`m.speech`, `m.typing` non utilisés).

**Repères numériques — PIÈGE DU MOTEUR.** `sv.cue("b6@63")` lit « 63 » comme un NUMÉRO DE MOT (le 64e) et
plante. Tout mot fait seulement de chiffres se vise par son **rang** (0 = premier mot) : `b6@2` (63), `b7@7`
(24), `b8@6` (12), `b9@6` (9 — et surtout pas `b9@9`, qui tombe sur « السبيطار »), `b13@6` (63), `b14@2` (0),
`b15@3` (10), `b21@7` (90), `b4@5` (2012). « 21:50 » et « 13:37 » contiennent « : » : `b13@21:50` et
`b16@13:37` marchent par le mot. Liste complète et vérifiée au § 6.

**Mise en place fixe.** Trois lieux reviennent ; chacun a UNE mise en place (coordonnées identiques à chaque
retour) : **la balance** (scènes 1, 18, 19, 20), **la salle d'audience** (2, 17), **la chambre** (11, 12, 13).

---

## 1. Distribution

Paramètres `Persona.person` exacts. Aucun ne reprend une tête d'AKTE 02 (longwave foncé enceinte ; homme court
foncé mal rasé ; vieille dame chignon gris à lunettes ; juge couronne grise à lunettes ; expert court gris
barbe lunettes) ni d'AKTE 03 (queue de cheval châtain ; carré foncé à lunettes ; vieil homme court gris
moustache ; bouclée châtain ; homme court châtain barbe ; juge carré gris à lunettes ; chauve gris à lunettes ;
chignon blond), ni des fiches 05–09.

```js
const DOC = { look: "woman",    hair: "short",      hairTone: "brown", beard: "none",      glasses: false, seed: 401 };
const PAT = { look: "oldman",   hair: "shortcurly", hairTone: "grey",  beard: "moustache", glasses: false, outfit: "casual", seed: 402 };
const JUG = { look: "oldman",   hair: "bald",       hairTone: "grey",  beard: "short",     glasses: false, outfit: "robe",    seed: 403 };
const SCF = { look: "oldwoman", hair: "longwave",   hairTone: "grey",  beard: "none",      glasses: false, outfit: "sweater", seed: 404 };
const SCM = { look: "man",      hair: "short",      hairTone: "blond", beard: "none",      glasses: true,  outfit: "jacket",  seed: 405 };
const EXP = { look: "man",      hair: "crown",      hairTone: "brown", beard: "none",      glasses: true,  outfit: "suit",    seed: 406 };
const TOI = { look: "man",      hair: "shortcurly", hairTone: "dark",  beard: "stubble",   glasses: true,  outfit: "coat", badge: " ", seed: 407 };
```

### 1.1 L'Assistenzärztin — `DOC` (héroïne)

- **Écart voulu avec la fiche** : la fiche demande « queue de cheval châtain ». C'est exactement la tête de
  l'Assistenzärztin d'AKTE 03 (`ponytail` + `brown`, même ville, même métier). Règle supérieure : aucune
  silhouette reprise. Donc **cheveux courts châtains** (`short`), la seule coiffure qu'aucune femme de la série
  ne porte. Rendu contrôlé : elle se lit bien comme une jeune femme (cils, lèvres, blouse). Plan B si l'auteur
  tient à la queue de cheval : `hair: "ponytail", hairTone: "blond"` (une ligne à changer).
- **Tenue par scène** : tribunal (1, 2, 17–20) `outfit: "sweater"` ; hôpital (6–12) `outfit: "coat", badge: " "`
  (blouse ouverte sur tenue de garde, stéthoscope, **badge jaune sans nom**) ; effondrement et bureau (14, 15)
  `outfit: "scrubs"` (la blouse est tombée) ; les mois (16) `outfit: "sweater"`.
  Attention : la blouse (`coat`) donne un trait parasite sous le sol en position assise par terre → `scrubs`
  obligatoire dans la scène 14 (vérifié).
- **Accessoire signature** : le badge jaune vierge + le stéthoscope ; dans la scène 14 le stéthoscope tombe au
  sol, dans la scène 16 la blouse pend à une patère.
- **Échelle** : 1,0 en pied (0,92 sur la frise, 0,95 dans la chambre, 1,05 au passe-plat et derrière la barre).
- **La fatigue se voit** (paramètre `f` de 0 à 1, une fonction du temps écrite une fois) :
  `f` = 0,15 (b6) → 0,35 (b7) → 0,55 (b8) → 0,65 (b9–b10) → 0,75 (b11) → 0,85 (b12) → 0,9 (b13) → 1 (b15).
  Effets : paupières lourdes `blink = max(clignement, 0.1 + 0.3·f)` ; `sweat: f > 0.5` ; `torsoLean = 5·f` ;
  `headTilt += 6·f` ; bras qui pendent (`armL: [-3, 6]`, `armR: [3, -6]`) ; marche plus lente ; **cernes** :
  calque `D.cernes` (§ 2, n° 43) posé sur `node.out.eyes`, opacité `f`.
- **Arc des expressions** (calé sur les repères) :

| scène | expression | détail |
|---|---|---|
| 1 | `worried` → `shock` à `b1@مذنبة+0.13` (petit sursaut de 14 px, 0,25 s) → regard vers la droite à `b1@صفر` (`look2 [0.9, -0.4]`) → `sad` à `b1@على` → `cry`, larmes 0 → 1 en 0,6 s à `b1@طبيبة` | mains sur la barre ; la main droite lâche et monte à la bouche à `b1@طبيبة` |
| 2 | `cry` tête baissée (`headTilt 10`) ; à `b2@مات` les épaules tressautent ; à `b3@نرجعو` elle recule en marche arrière | |
| 6 | `calm` → `focused` → `worried` quand le bloc de garde tombe (`b7@زادت`) → soupir, épaules qui tombent | marche |
| 7 | `focused`, sueur ; regard gauche / droite aux voyants ; `worried` à `b8@6` | marche pressée |
| 8 | `calm` ; bâillement (bouche `o`, yeux fermés 0,5 s) à `b9@شهور` ; `worried` à `b10@Blutführerschein`, elle tâte sa poche | |
| 9 | `focused`, puis `worried` à `b11@فدقة` | les deux mains vers le portoir |
| 10 | `focused`, yeux qui balaient, clignements longs | tête seule |
| 11 | `focused` ; léger sourire au patient (`calm`) à `b13@لمريض` | bras levé vers le crochet |
| 12 | `calm` → `worried` à `b15@بدا` → `shock` à `b15@كيتقيا` | la main ferme la roulette à `b15@ووقفو` |
| 14 | `shock` → `sad` → `cry` (larmes 1) ; relève la tête à `b18@الإدارة+0.15` | glisse le long du pilier |
| 15 | `sad`, larmes 0,5, yeux baissés ; `cry` à `b19@وهادشي` | signe |
| 16 | `sad` tête basse → `calm` (bouche `flat`) en relevant la tête vers la fenêtre à `b20@شهور` | assise |
| 17 | `cry`, épaules secouées (F56) | debout derrière sa table |
| 18 | `cry` → lève les yeux, `worried`, à `b22@Organisationsverschulden` | derrière la barre |
| 19 | `sad`, hoche lentement la tête, ferme les yeux à `b23@مذنبة` | |
| 20 | `sad` → yeux fermés, `calm` + larmes à `b24@genug` ; les épaules se relâchent à `b24@كافي` | |

### 1.2 Le patient — `PAT` (63 ans)
Vieil homme aux cheveux gris bouclés et à la moustache grise, chemise d'hôpital (`casual`), bracelet d'identité
(décor, n° 31). Toujours assis dans le lit vu de face (scènes 11, 12, 13), échelle 1,0, jamais allongé de
profil. Arc : `calm`, paupières mi-closes (`blink 0.25`), regarde la médecin (11) → `worried` à `b15@3` →
`pain`, penché en avant (`torsoLean 10`, `headTilt 12`, main sur le ventre : `Pose.handOnBelly`) à
`b15@كيتقيا` → scène 13 : `sleep`, respiration lente, puis immobile, `headTilt 6 → 14`.

### 1.3 Le tribunal (Schöffengericht : un juge + deux Schöffen, selon S13 ; « der Richter » selon la presse)
- **Le juge `JUG`** : chauve, barbe grise courte, robe noire à rabat blanc. Accessoire : le dossier cartonné
  « 613 Ls 3/12 » devant lui. Échelle 0,8, derrière le banc (buste seul). `focused`, il lit (regard vers le
  bas), relève les yeux vers elle à `b2@لا`. Jamais de marteau (les tribunaux allemands n'en ont pas).
- **La Schöffin `SCF`** : longs cheveux gris ondulés, pull, sans lunettes. `calm`, puis `sad` à `b2@مات`.
- **Le Schöffe `SCM`** : cheveux courts très clairs, lunettes, veste. `focused`, prend une note à `b21@النيابة`.
  Les deux Schöffen sont en civil (sans robe), échelle 0,8.
- Aucun des trois ne parle, ne pointe du doigt, ne se lève.

### 1.4 L'expert — `EXP` (scène 17 seulement)
Dégarni, châtain, lunettes, costume ; assis de profil sur une chaise, un dossier « Gutachten » sur les genoux
(décor, n° 22). Échelle 0,85. `focused`, hoche la tête une fois à `b21@للمحكمة+0.4`. Il existe parce qu'un
expert a déposé (F58) ; il ne dit rien.

### 1.5 « Toi » — `TOI` (scènes 22, 23, 24)
Le spectateur : jeune médecin, cheveux noirs bouclés, mal rasé, lunettes rondes, blouse et badge jaune vierge.
Échelle 0,95. Ce n'est PAS l'héroïne : la montrer « bien faire » ferait croire qu'elle n'a pas fait le
Bedside-Test, ce qu'aucune source ne dit. `focused` (22) → `calm` quand les coches tombent → `focused` (23) →
`angry` léger + non de la tête à `b28@تسني` (24).

### 1.6 Sans visage (décor, pas Persona)
- **Le labo** : une ombre grise sans traits derrière la vitre dépolie du passe-plat (n° 26). Mention « Rekonstruktion ».
- **L'administration** : le dossier d'un fauteuil de bureau vu de dos + un avant-bras en manche de costume qui
  tend un stylo (n° 34, 35). Mention « Rekonstruktion ». Aucun visage, aucune parole, aucune date.
- **Le parquet** : une carte tapée « Staatsanwaltschaft : 90 Tagessätze — beantragt — » (scène 17), puis un
  poids en pointillés posé À CÔTÉ de la balance, jamais dessus (scènes 18–20).
- **Yassine** : sa photo (`assets/portrait.png`, hors git), dans la scène 3 seulement.
- **Jamais** : infirmière ou infirmier, famille, Oberarzt, collègue, l'autre patiente (un pictogramme sur une
  étiquette, c'est tout).

---

## 2. Inventaire des décors et objets à dessiner (`decor.js` → `window.EpDecor = D`)

Tout est neuf. Convention du gabarit : `D.nom(g, o)` dessine autour de son ancrage (0,0), ombre décalée
(`#D2D2CB`, 6–8 px), trait `U.shape` / `U.stroke`, peut renvoyer des ancres. Les parties mobiles sont pilotées
par `o` (valeurs arrondies) ou dessinées dans un nœud à part pour `Motion`. « Sc. » = scènes où l'objet sert.

### A. Dispositifs signature

| n° | fonction | dessin | taille · ancrage | ce qui bouge | Sc. |
|---|---|---|---|---|---|
| 1 | `D.rollCounter(g, o)` | boîtier gris hachuré à 4 vis (fente tournée différemment sur chaque vis), `o.n` fenêtres blanches 44 × 56 à bords ombrés (deux bandes grises en haut et en bas = le cylindre), chiffres `.tw` 46 px découpés par fenêtre, petite étiquette gravée `o.label` (12 px), unité `o.unit` (Kalam 30), préfixe `o.prefix` (« + » et « > »), **petite roue crantée** Ø 22 dans l'angle haut droit | 150 × 80 (2 fenêtres) · coin haut gauche | `o.digits` [d1, d2] flottants : la partie décimale décale le chiffre vers le haut de `frac × 56` et fait entrer le suivant par le bas ; `o.blur` 0–1 : chiffres remplacés par 5 traits horizontaux qui défilent (`o.streak` = phase) ; `o.lit` : préfixe « > » en jaune ; `o.tick` : angle de la roue ; `o.dead` 0–1 : boîtier et chiffres virent au gris pâle | HUD, 18, 25 |
| 2 | `D.bloodBag(g, o)` | poche à bords arrondis, bride haute percée d'un œillet, soudure intérieure, deux embouts en bas, **étiquette blanche 70 × 58 : quatre traits gris illisibles + un code-barres de 10 barres, AUCUNE lettre ni « A » ni « 0 »**, cadre en pointillés vide là où l'on attendrait le groupe (`o.ghost`), reflet blanc | 110 × 170 + embouts 26 · l'œillet | `o.level` 0–1 (surface du sang : ligne ondulée dont la phase suit `o.sway`) ; `o.tint` 1 = rouge sang, 0 = gris (poche claire ou vidée) ; `o.empty` : poche plate, plis ; `o.tick` : coche manuscrite ; renvoie `{ out: [0, 196], label: [0, 92] }` | 5, 9, 10, 11, 12, 13, 22, 25 |
| 3 | `D.tube(g, o)` | tubulure : double trait (encre 7 px, blanc 4 px) le long de `o.pts` (points de passage lissés, échantillonnés en 40 points : longueurs calculées en JS, pas de `getTotalLength`), chambre compte-gouttes (petit cylindre, niveau, goutte), roulette de réglage (boîtier + molette) | selon `o.pts` · monde | `o.fill` 0–1 : front rouge depuis la poche ; `o.back` : le front remonte (rembobinage) ; `o.drop` 0–1 : phase de la goutte (négative = elle remonte) ; `o.clamp` 0–1 : molette qui descend et pince | 5, 11, 12, 13, 25 |
| 4 | `D.hourGrid(g, o)` | grille VIDE de `o.cols × o.rows` cases de 46 px tracées à main levée (une seule fois) | 21 × 3 = 966 × 138 ; 12 × 2 = 552 × 92 · coin haut gauche | rien (statique) | 6, 3 (mini) |
| 5 | `D.hourCol(g, o)` | UNE colonne de cases noircies (hachure d'encre serrée, comme gribouillée au stylo, débord de 2 px) | 46 × (46 × rangées) · coin haut gauche | un nœud par colonne, révélé par `wipe(repère, 0.07, "down")` | 6 |
| 6 | `D.dutyBoard(g, o)` | tableau de garde mural : cadre alu 16 px à 4 vis, fond liège `#EFE6D4` à points épars, bandeau d'en-tête, gouttière à feutres en bas (2 feutres, une éponge), 6 aimants ronds gris | `o.w × o.h` · coin haut gauche | rien ; les objets posés dessus sont des nœuds à part | 3, 6, 8 |
| 7 | `D.pinCard(g, o)` | fiche blanche à coin corné, **punaise jaune** en haut au centre, ombre | `o.w × o.h` · la punaise (pivot de `m.pend`) | pendule sur la punaise | 3, 8, 22 |
| 8 | `D.magnetStrip(g, o)` | bandeau magnétique sombre du planning, texte `.tw` blanc, deux rivets | `o.w` × 60 · centre | `m.build(…, "drop")` + secousse | 6 |
| 9 | `D.dayTab(g, o)` | onglet de classeur (coins hauts arrondis, trait de pliure), texte `.tw` 26 px | 262 × 56 · coin haut gauche | le texte se retape à chaque changement | HUD |
| 10 | `D.loopTag(g)` | rond jaune Ø 54 avec « ؟ » (Lalezar 36), attaché par une ficelle | Ø 54 · centre | `m.pend` ; disparaît d'un coup de ciseaux (2 traits) quand la boucle se ferme | 4, 5, 9, 15 ; 21 (celui-là reste : « définitif ? ») |
| 11 | `D.rewindMark(g)` | deux triangles « ◀◀ » pleins + trois fines lignes de balayage horizontales | 70 × 40 · centre | clignote (4 Hz) ; les lignes montent à 900 px/s pendant 0,3 s | HUD, 2, 4, 5, 25 |

### B. Tribunal

| n° | fonction | dessin | taille · ancrage | ce qui bouge | Sc. |
|---|---|---|---|---|---|
| 12 | `D.courtRoom(g, o)` | mur `#F1ECE2`, corniche à y 380, boiseries hachurées de y 700 au sol (cadres en creux tous les 150 px), plinthe, sol en perspective (lignes fuyantes) de y 1300 à 1420 | plein cadre · monde | rien | 1, 2, 17–21 ; `D.wardRoom(g)` = le même principe pour la chambre (mur, corniche 380, bande de protection y 1180, plinthe, sol) : 11, 12, 13, 16 |
| 13 | `D.tallWindow(g, o)` | fenêtre haute à 2 × 4 carreaux, appui, poignée | 140 × 280 · coin haut gauche | rien ; le **rayon** est un nœud à part (`D.lightShaft` : parallélogramme jaune pâle, opacité 0,18, qui glisse de 12 px en 6 s) + `m.dust` dedans | 2, 17 |
| 14 | `D.plaque04(g)` | plaque ronde neutre : deux cercles, un « § » (Kalam 60), pendue à un clou par un fil | Ø 124 · le clou | `m.pend` (clou) | 2, 17 |
| 15 | `D.bench04(g, o)` | banc des juges : long bureau en bois (plateau, façade à 3 panneaux, estrade), 3 plaques de place vierges, pile de 3 dossiers (un jaune), carafe et verre | 600 × 255 · centre du plateau | la carafe : niveau qui frémit (2 px, 1,5 s) | 2, 17 |
| 16 | `D.dock(g, o)` | la barre : rail de bois arrondi sur une façade à planches, verre d'eau, boîte de mouchoirs (un mouchoir qui dépasse) | `o.w` × 300 · coin haut gauche du rail | le mouchoir : `m.sway` 3°, 2,4 s | 1, 18–20 |
| 16 b | `D.dockTable(g)` | petite table de l'accusée vue de trois quarts (plateau, façade), micro sur pied | 180 × 160 · bas centre | rien | 2, 17 |
| 17 | `D.scale04(g, o)` | **la balance** : socle à deux marches, colonne tournée (bagues), fléau à couteau central et fleuron, 2 × 3 chaînes à maillons, deux plateaux creux en laiton (jaune hachuré), **plaquettes pendues sous les plateaux** : à gauche « SCHULD » gravé (20 px), à droite « STRAFE » + une fenêtre à rouleau (un chiffre) | colonne 680, fléau 2 × 215, plateaux Ø 156, chaînes 230 · centre du socle | `o.tilt` (degrés, positif = gauche en bas) ; `o.swL`, `o.swR` (balancement des plateaux, degrés) ; `o.strafe` (chiffre flottant du rouleau, `o.blur`) ; fonction pure `D.scaleGeom(o)` → `{ pivot, panL: [x, y du bord], panR, tagL, tagR }` pour poser les objets sur les plateaux | 1, 18–20 ; ×0,24 dans 2 et 17 |
| 18 | `D.guiltBlock(g, o)` | bloc sombre (hachure d'encre) aux arêtes vives, « SCHULDIG » en blanc, lettres espacées (Kalam 30) ; `o.seams` 0–1 : quatre joints horizontaux qui apparaissent | 150 × 104 · bas centre | tombe (accroche) ; `o.seams` | 1, 18 |
| 19 | `D.slab(g, o)` | une tranche du bloc : plaque grise 140 × 26 avec un **pictogramme** blanc (`o.icon` : `hours` = 3 cases noircies + « 63 » ; `licence` = carte barrée ; `twins` = deux poches ; `sheet` = feuille noire de lignes) | 140 × 26 · centre | chaque tranche est un nœud : elle se soulève, décrit un arc, se pose | 18–20 |
| 20 | `D.coreWeight(g)` | tout petit poids de balance en laiton (jaune), bouton sur le dessus, « 1 » gravé | 44 × 40 · bas centre | pulse une fois quand on l'entoure | 18–20 |
| 21 | `D.weight90(g, o)` | poids de balance à anneau dessiné **en pointillés** (contour `stroke-dasharray`, intérieur vide), « 90 » `.tw` 34 px, étiquette à ficelle « beantragt » ; posé sur une console murale | 80 × 84 · bas centre | `o.dash` : les tirets défilent (décalage) ; `o.gone` 0–1 : les tirets s'écartent et s'effacent | 18–20 |
| 22 | `D.folder(g, o)` | chemise cartonnée, étiquette `.tw` (`o.text` : « Gutachten », « 613 Ls 3/12 »…) | 110 × 80 · centre | rien | 2, 17 |
| 23 | `D.pebble(g, o)` | petit caillou gris irrégulier avec un pictogramme (`o.icon` : `crack` = fissure, `leaf` = feuille de calendrier, `coat` = blouse sur patère) | Ø 46 · bas centre | tombe et roule de 10° | 20 |
| 24 | `D.cart(g, o)` | chariot à dossiers bas, deux roulettes, plaque vissée « Klinikverwaltung » (`.tw` 18 px) | 240 × 120 · centre du plateau | arrive en roulant (`m.build "right"`), roulettes qui tournent | 18–20 |
| 25 | `D.caseFile(g, o)` | le dossier du tribunal vu de face : couverture cartonnée, sangle, étiquette tapée (3 lignes), ligne `.tw` « Rechtskraft : » suivie de l'emplacement d'**une fenêtre à rouleau** (dessinée par `D.rollCounter`, n° 1, à une fenêtre : elle tourne floue et ne s'arrête jamais) ; `D.deskLamp` : lampe de bureau articulée et son cône ; `D.loupeSmall` : loupe à manche Ø 120 (scène 10 seulement) | 560 × 440 · centre | la sangle : rien ; le rouleau : `o.blur`, `o.streak` ; la lampe : `m.sway` 1°, 3 s | 21 |
| 25 b | `D.typedCard(g, o)` | carte blanche à bord perforé (papier de machine), lignes `.tw` fournies par `story.js` ; `o.dashed` : bord en pointillés (= une demande) ; trombone | `o.w × o.h` · centre | tombe (`drop`), tremble à chaque ligne tapée | 2, 17 |

### C. Hôpital

| n° | fonction | dessin | taille · ancrage | ce qui bouge | Sc. |
|---|---|---|---|---|---|
| 26 | `D.labHatch(g, o)` | mur + ouverture du passe-plat (cadre inox), tablette en saillie, enseigne lumineuse « LABOR », volet roulant à lames, voyant jaune ; à l'intérieur (découpé par l'ouverture) : vitre dépolie (hachure très pâle), **frigo à poches** à porte vitrée (deux étagères, six petites poches rouges, diode), **ombre** grise sans traits | ouverture 420 × 260 · coin haut gauche de l'ouverture | `o.shutter` 1 → 0 (les lames remontent) ; `o.shadowX` (l'ombre passe) ; la diode clignote ; l'enseigne grésille | 9 |
| 27 | `D.rack(g, o)` | portoir : socle inox, deux montants, barre à deux crochets (les deux poches s'y pendent : nœuds à part) | 220 × 150 · bas centre | glisse sur la tablette ; renvoie `{ hooks: [[-50, -140], [50, -140]], grip: [-110, -20] }` | 9, 10 |
| 28 | `D.docSheet(g, o)` | **Begleitdokument** : feuille serrée — en-tête à 3 cases, 16 lignes de faux texte (traits gris de longueurs inégales), un tableau 5 × 4 coché, deux codes-barres, 6 petites cases, et un petit champ « Blutgruppe : » en `.tw` 14 px suivi d'un gribouillis (la valeur n'est JAMAIS lisible) ; renvoie les ancres de 6 lignes et du champ | 500 × 830 · coin haut gauche | `o.blur` 0–1 (le nœud reçoit `filter: blur(o.blur × 1,6 px)`) ; le surligneur et la loupe sont des nœuds à part | 10 ; ×0,2 dans 9, 22 |
| 29 | `D.corridor04(g, o)` | couloir : mur, corniche, main courante à y 1120, plinthe, sol ; `o.doors` : portes pleines à imposte (150 × 600), numéro sur une plaquette, **voyant d'appel** au-dessus (`D.callLight`, jaune) ; appliques murales (`D.sconce`) | plein cadre · monde | voyants : clignotent à 2 Hz quand ils sont allumés ; appliques : halo qui s'allume ; `o.night` 0–1 : hachure de nuit qui monte dans les angles hauts | 7, 8, 14 |
| 30 | `D.clock04(g, o)` | horloge ronde à bord épais, 12 traits, aiguilles des heures, des minutes et trotteuse jaune ; `o.sector` : secteur jaune pâle (les 10 minutes) | Ø 100 · centre | `o.h`, `o.m`, `o.s` (angles) ; `o.sector` 0–1 | 7, 11, 12, 13 |
| 31 | `D.bedBack04(g, o)` / `D.bedFront04(g, o)` | lit d'hôpital **vu de face** : tête de lit à panneau, oreiller creusé, barrières latérales repliées ; devant : couette à revers, pied de lit bas, manivelle, 2 roues, pancarte de pied de lit (`o.chart` : deux lignes `.tw` 15 px) ; `D.wristband(g)` : bracelet d'identité (bande blanche, 2 traits) | 370 × 470 · bas centre | la couette se soulève de 3 px avec la respiration (`o.breath`) ; renvoie `{ armOut: [105, -180], chart: [0, -85] }` | 11, 12, 13 ; coin de lit dans 22 |
| 32 | `D.ivPole(g, o)` | potence à 5 roulettes, mât télescopique, **bras à crochet** dont la position est donnée par `o.hook` (elle se règle sur la main levée de la médecin), deuxième crochet vide | hauteur 400 · bas centre | le crochet vide : `m.pend` ; les roulettes : rien | 11, 12, 13 |
| 33 | `D.nightstand04(g)` | table de chevet à tiroir, **deux poches vides** à plat, cochées (`D.bloodBag` `empty`, `tick`), gobelet | 90 × 210 · bas centre | rien | 11, 12 |
| 33 b | `D.nightWindow(g, o)` | fenêtre à croisillon ; `o.p` 0 = jour (carreaux blancs, tache de soleil), 1 = nuit (hachure d'encre serrée, lune blanche, 4 étoiles, un nuage qui dérive) | 180 × 200 · coin haut gauche | le nuage (`m.drift`, 8 px/s) ; la tache de soleil de la scène 13 glisse de 10 px | 11, 12, 13 |
| 33 c | `D.kidneyDish(g)` | haricot inox | 90 × 34 · centre | apparaît (`pop`) | 12 |
| 34 | `D.loupe(g, o)` | **la loupe sur la tubulure** : cercle épais + reflet + manche court ; à l'intérieur (découpé) : fond rose très pâle, 9 **globules** (disques rouge sang à creux central, chacun avec trois petits picots « A » sur le bord), 7 **anticorps** du patient = petites **pinces** en Y (encre, mâchoires ouvertes) | R 150 · centre | `o.flow` 0–1 : les globules entrent par le haut et descendent ; `o.grab` 0–1 : les pinces pivotent vers le globule le plus proche et se referment sur un picot (elles deviennent jaunes) ; `o.burst` 0–1 : les globules pincés se fendent (trait blanc), puis éclatent en 5 fragments qui s'écartent et pâlissent ; les pinces libres frétillent (±8°, 3 Hz) | 12 |
| 35 | `D.officeBack(g)` + `D.blinds(g, o)` + `D.binders(g, o)` | bureau de l'administration : mur, corniche, sol ; store vénitien à 14 lames dans une fenêtre 300 × 340 (`o.open` incline les lames) ; raies de lumière sur le mur (nœud à part) ; étagère de 7 classeurs (dos avec œillet, un classeur penché) ; petite plante en pot sur l'appui | plein cadre | lames : `o.open` oscille (0,5 ± 0,06, 5 s) ; raies : glissent de 6 px ; plante : `m.sway` 2° ; un classeur tombe à plat à la construction (`swing`) | 15 |
| 36 | `D.desk04(g)` | bureau vu de côté : plateau épais, façade pleine avec la plaque vissée « Klinikverwaltung », pot à crayons | 575 × 195 · coin haut gauche du plateau | rien | 15 ; coin de table dans 24 |
| 37 | `D.chairBack(g)` | dossier d'un grand fauteuil de bureau **vu de dos** : masse sombre arrondie, couture centrale, appuie-tête, un accoudoir | 220 × 410 · bas centre | pivote de ±1,5° (4 s) | 15 |
| 38 | `D.suitArm(g, o)` | avant-bras en manche de costume sombre, poignet de chemise blanc, bouton de manchette, **main en moufle** qui tient un stylo (`o.pen`) | longueur `o.len` (115–200) · l'épaule cachée derrière le fauteuil | `o.len` et `o.angle` : le bras s'allonge vers elle, puis pousse le classeur | 15 |
| 39 | `D.formSheet(g, o)` | la feuille à signer : en-tête « Erklärung », 4 lignes de faux texte, **ligne à case** « ☑ Schulung »Transfusion« erhalten » (`.tw`), ligne de signature avec une croix ; `o.sign` 0–1 : la signature (une boucle manuscrite, pas un nom) s'écrit ou se défait ; `o.check` : case cochée ou vide ; `D.pen(g)` ; `D.binderLying(g, o)` : classeur couché, dos tapé « Verantwortung » | grande : 400 × 500 ; petite : 130 × 20 (vue de côté) · centre | signature (`o.sign`), case (`o.check`), la grande version « monte » depuis le bureau | 4, 15, 24, 25 |
| 40 | `D.chair04(g)` ; `D.coatRack(g, o)` ; `D.seasonWindow(g, o)` | chaise à quatre pieds ; patère sur pied avec **la blouse blanche** et le stéthoscope pendus ; fenêtre 320 × 360 avec une branche : `o.p` 0 → 1 = feuilles (8) qui se détachent, puis flocons (10), puis bourgeons (6) ; sa tache de lumière au sol (nœud à part). Aucun calendrier (AKTE 06) | — | la blouse : `m.sway` 1,2°, 3,5 s ; la tache de lumière glisse à chaque saison ; la branche : `m.sway` 1,5° | 16 |
| 41 | `D.staffCard(g, o)` ; `D.monthCell(g, o)` ; `D.licenceCard(g, o)` | sa fiche du personnel (cadre pour une tête, bande jaune vierge à la place du nom, deux lignes `.tw`) ; une case de planning noircie au stylo (comme `D.hourCol`, une seule case), numérotée 1–9 ; **Blutführerschein** : carte au format permis (coins ronds, case photo vide, pictogramme goutte **au trait, pas en rouge**, trois lignes), `o.ghost` 0–1 : contour en pointillés, carte absente, dans une pochette plastique étiquetée | 240 × 300 ; 46 × 46 ; 300 × 180 | la carte « réelle » apparaît 0,15 s puis devient fantôme ; la pochette : reflet qui glisse | 8 ; mini dans 18 |
| 42 | `D.ruleCard(g, o)` ; `D.lessonCard(g, o)` ; `D.bedsideCard(g, o)` ; `D.sampleTube(g)` ; `D.bedIcon(g, o)` | grande carte de la règle (en-tête + 4 lignes : case à cocher 44 px, pictogramme 60 px, texte ; pied) ; carte jaune des deux leçons ; **carte du Bedside-Test** : deux champs ronds « Anti-A », « Anti-B », légende « ● − » / « grumeaux + », ligne « Ergebnis : » ; tube d'échantillon avec un pictogramme de bracelet (= le sang du PATIENT) ; pictogramme de lit numéroté | 430 × 540 ; 400 × 240 ; 340 × 220 ; 30 × 110 ; 110 × 70 | `o.checks` [0–1 × 4] : la coche se trace ; `o.drops`, `o.react` : les gouttes tombent, s'étalent, restent lisses ; `o.result` : « = 0 » s'écrit | 22, 23, 24 ; lits dans 9 |
| 43 | `D.cernes(g, o)` | sous chaque œil un arc gris (`M-11 9 Q0 15 11 9`, 2,2 px), un second à `o.k > 0.6`, ombre grise à 25 % | suit `node.out.eyes` | opacité `o.k` ; en vue de profil, un seul œil (celui de devant) | 6–12 |
| 44 | `D.pillar(g)` ; `D.stetho(g)` ; `D.adminDoor(g, o)` ; `D.frame04(g)` | pilier d'angle du couloir (82 × 920) ; stéthoscope au sol ; porte à plaque « Verwaltung » (`o.open` 0–1 : le battant pivote, un coin de lumière jaune s'allonge sur le sol) ; petit cadre au mur | — | le stéthoscope tombe et rebondit ; la porte s'ouvre | 14 |
| 45 | `D.rhine(g, pts)` ; `D.dom(g)` ; `D.riverWaves(g)` | le Rhin : trait double ondulé qui se trace ; **silhouette de la cathédrale** (deux flèches à crochets, nef, rosace), en encre hachurée ; trois lignes d'eau | cathédrale 260 × 520 · bas centre | le Rhin se trace (0,5 s) ; la cathédrale pousse du sol (`growY`) ; l'eau dérive | 4 |
| 46 | `D.rewKey(g, o)` ; `D.pageFlip(g, o)` ; `D.dripBig(g, o)` | touche « ◀◀ » de magnétophone (`o.down` 0–1) ; trois pages de planning qui tournent à l'envers (`o.p`) ; grande chambre compte-gouttes (goutte `o.drop`) | 150 × 110 ; 200 × 260 ; 110 × 190 | enfoncement, pages, goutte | 25 |

Du socle (gabarit), réutilisés tels quels : `kit` (`chip`, `ribbon`, `card`, `ar`, `prop("stamp", …)`),
`drawDE`, `pinAt`, les éléments de l'intro (photo, anneau, icône Instagram, cœur, bouton).

---

## 3. HUD propre à l'épisode

Calque **global** (pas `c.hud`) : un `<svg id="hud04" viewBox="0 0 1080 1920">` ajouté dans `#poster`
au-dessus de `#stage-svg`, mis à jour par `sv.hooks.push((t) => …)` (état = fonction pure de `t`, redessin
seulement si les paramètres arrondis changent). Raison : il traverse les transitions sans être rogné, et il
n'est pas recopié dans les cases de l'affiche. Coordonnées écran.

### 3.1 Le compteur (x 112–468, y 272–352)

- **Bloc A « WOCHE »** : `D.rollCounter` à (112, 272), 150 × 80, deux fenêtres, unité « h ».
- **Bloc B « NOTDIENST 24 h »** : à (270, 272), 190 × 80, préfixes « + » et « > », deux fenêtres, unité « h » ;
  relié au bloc A par une platine boulonnée. Jamais de somme, jamais de « = », jamais « 75 ».
- **La petite roue** du bloc A tourne à 90°/s tant que le temps de l'histoire avance : c'est elle qui « bat ».

| quand | état |
|---|---|
| 0 → `b3@نرجعو` | invisible (l'accroche est au tribunal) |
| `b3@نرجعو` → `i1 - 0.1` | apparaît (fondu 0,2 s) ; bloc A seul ; rouleaux flous qui défilent À L'ENVERS (`blur 1`, phase décroissante) ; roue qui tourne à l'envers à 360°/s |
| intro (`i1 - 0.1` → `b4 - 0.1`) | masqué, comme le logo |
| `b4` → `b6@كلشي` | comme à `b3@نرجعو` (flou, à l'envers) |
| `b6@كلشي` | **clac** : le flou cesse sur « 00 » (rebond de 4 px), la roue repart à l'endroit |
| `b6@كلشي` → `b6@وحدة` | le bloc A compte de 00 à 63 = le nombre de cases noircies de la frise (3 par colonne) ; arrive à 63 à `b6@وحدة` : **clac**, le compteur grossit ×1,25 pendant 0,4 s (pivot : son coin haut gauche) |
| `b7@garde` | le bloc B sort de derrière le bloc A (glisse de 190 px vers la droite, 0,35 s, `back`), fenêtres à « 00 », « > » éteint |
| `b8@دازت` → `b8@6` | le bloc B compte de 00 à 12 ; à `b8@6` : **clac**, le « > » s'allume en jaune (« mehr als 12 ») |
| `b13@6` | les deux fenêtres « 63 » du bloc A clignotent en jaune (0,4 s) pendant que la pastille « 63 Jahre » apparaît : l'écho 63 heures / 63 ans, sans un mot |
| `b16@end+0.2` → `+0.8` | la roue ralentit et **s'arrête** ; `dead` 0 → 1 : tout le compteur vire au gris |
| scènes 14–17 | figé, gris, opacité 0,6 |
| `b22@Organisationsverschulden` | il reprend ses couleurs, se décroche (petit sursaut), **vole** en arc jusqu'au chariot « Klinikverwaltung » (0,6 s, échelle 1 → 0,62, rotation −6° → 0), puis le calque global le masque et une copie dessinée dans la scène 18 prend sa place sur le chariot |
| ensuite | absent |

Position d'atterrissage (écran) à calculer avec la caméra de la scène 18 :
```js
const toScreen = (sc, t, p) => { const c = sc.camAt(t), V = st.view, life = Math.max(1, sc.end - sc.start);
  const k = c.s * V.s * (1 + V.breathe * E.inOut(clamp((t - sc.start) / life, 0, 1))) * sc.kickAt(t);
  return [540 + (p[0] - c.cx) * k, 960 + V.oy + (p[1] - c.cy) * k, k]; };
```

### 3.2 L'onglet du jour (x 700–962, y 284–340), sous le logo

`D.dayTab`, texte `.tw` 26 px retapé (0,04 s par signe) à chaque changement ; un petit « ◀◀ » (n° 11) le
précède pendant le rembobinage.

| quand | texte |
|---|---|
| 0 → `b3@نرجعو` | `Mi · 16.05.2012` |
| `b3@نرجعو` → `i1` | les chiffres défilent à l'envers (flou), « ◀◀ » clignote |
| intro | masqué |
| scène 4 | `◀◀ 2012` |
| scène 5 | `◀◀ 30.07.2011` |
| scène 6, jusqu'à `b6@كلشي` | `◀◀ ··.··.····` (points) ; à `b6@كلشي` : `Juli 2011` ; à `b7@garde` : `Sa · 30.07.2011` |
| scènes 7–12 | `Sa · 30.07.2011` |
| scène 13, à `b16@الأحد` | `So · 31.07.2011` |
| scènes 14, 15, 16 | **masqué** (fondu 0,3 s) : aucun jour n'est donné pour l'effondrement, la signature, les mois |
| scènes 17–21 | `Mi · 16.05.2012` |
| scènes 22–25, affiche | masqué |

### 3.3 Le reste
- `#prog` (barre de progression) et `#brand` (logo) : socle. Logo masqué pendant l'intro.
- Scènes 22–24 : ruban « القاعدة » (`k.ribbon`, taille 44, `parent: c.hud`) à (400, 322), dans la bande HUD libérée.
- Dans l'accroche (compteur invisible), la bande HUD de gauche porte la ligne tapée du tribunal (scène 1).

---

## 4. Scène par scène

25 scènes + l'affiche. Durées = minutage PROVISOIRE (elles suivront la voix : tout est calé sur des repères).
« Vie » = ce qui bouge en continu une fois le décor posé. `m = Motion.of(c)`. Sauf mention, caméra
`cy: 920`, poussée lente `s 1.00 → 1.03` en `ease: "lin"` sur la durée de la scène.

| n° | scène | beats | début → fin (s) | durée | entrée | affiche |
|---|---|---|---|---|---|---|
| 1 | Accroche : la balance | b1 | 0,00 → 3,66 | 3,7 | `cut` | case 1 |
| 2 | La salle d'audience, puis tout repart en arrière | b2–b3 | 3,66 → 7,94 | 4,3 | `cut` | case 2 |
| 3 | Intro : la fiche de Yassine sur le tableau de garde | i1–i3 | 7,94 → 17,21 | 9,3 | `swipeR` | `summary: false` |
| 4 | Köln 2012 (carte) → la feuille signée | b4 | 17,21 → 19,87 | 2,7 | `swipeR` | case 3 |
| 5 | Les deux poches : le sang remonte | b5 | 19,87 → 21,85 | 2,0 | `swipeR` | case 4 |
| 6 | La frise des heures : 63, puis la garde de 24 h | b6–b7 | 21,85 → 27,44 | 5,6 | `swipeR` | case 5 |
| 7 | Samedi soir, le couloir : plus de 12 heures | b8 | 27,44 → 29,77 | 2,3 | `swipe` | case 6 |
| 8 | Le tableau du personnel : débutante, sans Blutführerschein | b9–b10 | 29,77 → 36,88 | 7,1 | `swipe` | case 7 |
| 9 | Le passe-plat du labo : deux poches à la fois | b11 | 36,88 → 40,11 | 3,2 | `swipe` | case 8 |
| 10 | Le Begleitdokument | b12 | 40,11 → 43,49 | 3,4 | `cut` | case 9 |
| 11 | 21:50, la chambre : elle accroche la poche | b13 | 43,49 → 45,81 | 2,3 | `swipe` | case 10 |
| 12 | 0 contre A : la loupe, 10 minutes, on arrête | b14–b15 | 45,81 → 51,30 | 5,5 | `cut` | case 11 |
| 13 | Dimanche 13:37 — muette 1 : le patient, le compteur se fige | b16 + silence | 51,30 → 54,25 | 2,9 | `swipe` | case 12 |
| 14 | Muette 2 : elle glisse le long du mur ; la convocation | silence + b17–b18 | 54,25 → 59,28 | 5,0 | `fade` | case 13 |
| 15 | Le bureau : la feuille, le stylo | b19 | 59,28 → 62,79 | 3,5 | `swipe` | case 14 |
| 16 | Des mois | b20 | 62,79 → 64,69 | 1,9 | `swipe` | case 15 |
| 17 | Retour au tribunal : 90 Tagessätze demandés | b21 | 64,69 → 68,00 | 3,3 | `swipe` | case 16 |
| 18 | La balance 1 : Organisationsverschulden | b22 | 68,00 → 72,44 | 4,4 | `cut` | case 17 |
| 19 | La balance 2 : sa faute, petite — schuldig | b23 | 72,44 → 76,24 | 3,8 | `cut` | case 18 |
| 20 | La balance 3 : genug bestraft — § 60 | b24 | 76,24 → 80,13 | 3,9 | `cut` | case 19 |
| 21 | Le dossier : définitif ? | b25 | 80,13 → 82,08 | 2,0 | `cut` | case 20 |
| 22 | Règle 1 : au lit, toi-même — nom, groupe, numéro | b26 | 82,08 → 85,50 | 3,4 | `swipe` | case 21 |
| 23 | Règle 2 : le Bedside-Test | b27 | 85,50 → 88,19 | 2,7 | `cut` | case 22 |
| 24 | Règle 3 : ne signe jamais… | b28 | 88,19 → 90,50 | 2,3 | `cut` | case 23 |
| 25 | Le sang ne revient pas | b29 | 90,50 → 93,34 | 2,8 | `swipeR` | case 24 |
| 26 | Affiche-résumé | — | 93,34 → 98,9 | 5,6 | `cut` + flash | — |

`swipe` / `swipeR` : `inDur: 0.42` ; `cut` : `inDur: 0` ; `fade` : `inDur: 0.4`.

---

### Scène 1 — ACCROCHE : la balance (b1 · 0,00 → 3,66)

**À comprendre :** un tribunal a dit « coupable » — et le plateau de la peine est resté vide : zéro.
**Lieu :** salle d'audience, gros plan sur la balance (mise en place « balance »). **Entrée :** `cut` à t = 0.
La première image est complète : rien ne « se construit », le bloc est déjà en train de tomber.

**Mise en place « balance »** (monde, `cy: 900` ; la même dans les scènes 1, 18, 19, 20) :

| couche (arrière → avant) | objet | position |
|---|---|---|
| 1 | `k.bg()` puis `D.courtRoom` | corniche y 380, boiseries dès y 700, sol y 1300 |
| 2 | `D.lightShaft` : rayon oblique jaune pâle | de (150, 400) à (470, 1000), largeur 150 |
| 3 | sellette (petite table haute, comprise dans `D.scale04`, `o.stand`) | x 380–700, plateau y 1240 |
| 4 | `D.scale04` | socle (540, 1240) ; pivot (540, 560) ; fleuron jusqu'à y 520 ; bouts du fléau (325, 560) et (755, 560) à l'horizontale ; bords des plateaux y 790, fonds y 824 ; plaquettes sous les plateaux y 850–894 |
| 5 | objets posés sur les plateaux (suivent `D.scaleGeom`) | voir ci-dessous |
| 6 | elle, `DOC` en `sweater` | x 215, pieds y 1500 (cachés), échelle 1,05 ; haut de la tête y 1041 |
| 7 | `D.dock` (la barre) | rail de x 60 à 400, dessus y 1300, façade jusqu'à 1600 ; verre à (350, 1296) |

Scènes 18–20 seulement : console murale + `D.weight90` (bas centre (900, 700)), `D.cart` (plateau centré
(760, 1180), x 640–880). Rien d'autre : pas de plaque ni de lampe au-dessus du pivot (la bande des pastilles
passe là).

**Inclinaison** (fonction pure du temps, la même pour les quatre scènes) :
`tilt(t) = cible(t) + Σ Δᵢ · e^(-3,2 (t - tᵢ)) · cos(9 (t - tᵢ)) + 0,5 · sin(1,3 t)` où chaque changement de
cible `Δᵢ` à l'instant `tᵢ` laisse un rebond amorti. Balancement des plateaux : `sw = 1,5 · sin(1,7 t + φ)` +
3 fois le rebond.

**Déroulé.**

| instant | ce qui se passe |
|---|---|
| t = −0,15 → 0,17 | `D.guiltBlock` tombe de 420 px en accélérant et frappe le plateau gauche à `b1@مذنبة+0.02` (≈ 0,17) : `c.shake(0.17, 12, 0.4)`, `c.kick(0.17, 0.08)`, cible `tilt` 0 → 13 (rebond jusqu'à 17), cinq petits ronds de poussière grise s'écartent du plateau et s'effacent en 0,4 s, les chaînes tintent |
| 0,17 | pastille (HUD, écran (312, 452), taille 40) : `schuldig` / « مذنبة » — `pop` |
| 0,30 → `b1@صفر` | le rouleau de la plaquette « STRAFE » (sous le plateau droit, qui est monté) défile flou ; à `b1@صفر` (≈ 0,96) : **clac** sur « 0 », le plateau droit sursaute (`sw` +4°), `c.kick("b1@صفر", 0.06)` |
| `b1@صفر` | pastille jaune (HUD, écran (768, 452), taille 40) : `Strafe: 0` / « العقوبة: صفر » — `pop` |
| `b1@محكمة` | ligne tapée dans la bande HUD (compteur absent), `.tw` 22 px (elle doit finir avant x 690, l'onglet du jour commence à 700), départ écran (112, 318) : `Amtsgericht Köln · 16.05.2012 · 613 Ls 3/12` (0,035 s par signe : la ligne doit être finie avant `b1@طبيبة+0.5`) ; dessous, arabe gras 28 px, aligné à droite sur x 680, y 354 : « المحكمة الابتدائية ديال Köln » (`wipe rtl`) |
| `b1@على` → fin | elle : voir l'arc (§ 1.1) ; larmes à `b1@طبيبة` |

**Vie :** fléau (± 0,5°), plateaux et plaquettes qui se balancent, mouchoir de la boîte (`m.sway` 3°, 2,4 s),
eau du verre (2 px, 1,5 s), rayon de lumière qui glisse (12 px en 6 s) + `m.dust({ x: 170, y: 430, w: 300,
h: 520 }, 12, { seed: 4, op: 0.8, speed: 10 })`, respiration (`breathe`), clignements.
**Elle :** trois quarts, `facing: 1`, `look2: [0.7, -0.5]` (elle regarde la balance) ; mains posées sur la barre :
`reachL: [-46, -190]`, `reachR: [46, -190]`, `bendL: 1`, `bendR: -1` ; à `b1@طبيبة` la main droite d'écran
quitte la barre et monte à la bouche (`reachR` → ancre `mouth` + [10, 14], en 0,3 s).
**Caméra :** `[{ at: 0, s: 1, cx: 540, cy: 900 }, { at: 0.2, s: 1.04, cx: 548, cy: 900, d: 3.3, ease: "lin" }]`.
**Mentions :** aucune icône de prison ni de billets. Le chiffre « 0 » est la peine prononcée.
**Affiche :** image à `b1@طبيبة`.

---

### Scène 2 — La salle d'audience, puis tout repart en arrière (b2–b3 · 3,66 → 7,94)

**À comprendre :** un patient est mort par sa faute, et pourtant ni prison ni amende ; pour comprendre, on rembobine.
**Lieu :** la même salle, plan large (mise en place « salle d'audience »). **Entrée :** `cut`.

**Mise en place « salle d'audience »** (monde ; la même dans la scène 17) :

| couche | objet | position |
|---|---|---|
| 1 | `k.bg()`, `D.courtRoom` | corniche 380, boiseries 700, sol 1300 |
| 2 | `D.tallWindow` + `D.lightShaft` + `m.dust` | fenêtre x 120–260, y 420–700 ; rayon de (260, 430) vers (500, 1300) |
| 3 | `D.plaque04` | clou (600, 525), disque centré (600, 600) |
| 4 | `SCF`, `JUG`, `SCM`, échelle 0,8, pieds y 1150 (cachés) | x 410, 570, 835 ; têtes y 800–915 |
| 5 | `D.bench04` | plateau centré (600, 980), x 300–900, façade jusqu'à 1210, estrade jusqu'à 1235 ; dossier « 613 Ls 3/12 » (`D.folder`) devant le juge à (560, 968) |
| 6 | petite balance : `D.scale04` à l'échelle 0,24, bloc sur le plateau gauche | socle (695, 980) ; x 625–766, y 817–980 |
| 7 | elle, `sweater`, échelle 1,0, trois quarts `facing: 1` | x 205, pieds y 1300 ; tête y 863–1010 |
| 8 | `D.dockTable` devant ses jambes | x 120–300, plateau y 1140 |
| 9 | carte tapée (`D.typedCard` 420 × 250, inclinée −3°) | centre (530, 1175) : x 320–740, y 1050–1300 |

**Construction** (cascade très courte, on est dans l'accroche) : rayon de la fenêtre `fade` b2 + 0,00 ; plaque
`drop` (dist 200) b2 + 0,03 puis `m.pend(…, 5°)` ; banc `rise` (dist 90) b2 + 0,05 ; les trois juges `rise`
(dist 70, 0,3 s) b2 + 0,10 / 0,16 / 0,22 ; petite balance `grow` b2 + 0,2 ; carte tapée `drop` (dist 420)
b2 + 0,1, elle tremble de 2 px à chaque ligne.

**Déroulé.**

| instant | ce qui se passe |
|---|---|
| b2 + 0,25 | la carte se tape (`.tw` 22 px, deux lignes) : `Die Angeklagte ist einer` / `fahrlässigen Tötung schuldig.` ; petit `laut Urteil` (`.tw` 15) dans son coin haut droit |
| `b2@مات` | pastille HUD (540, 450), taille 34 : `fahrlässige Tötung` / « القتل غير العمدي » ; les mots `fahrlässigen Tötung` de la carte reçoivent un trait de surligneur ; la Schöffin passe à `sad` ; elle : épaules qui tressautent |
| `b2@لا` | lignes 3–4 de la carte, tapées en 0,5 s : `Von einer Bestrafung` / `wird abgesehen.` ; tampon `k.prop("stamp", …, { text: "§ 60", sub: "ABSEHEN VON STRAFE", size: 78, rot: -8 })` échelle 0,4, `slam` sur le bas droit de la carte à (650, 1238) ; la pastille devient (jaune, taille 28) `§ 60 StGB · Absehen von Strafe` / « الإعفاء من العقوبة » ; le juge lève les yeux vers elle ; `c.kick` 0,06 |
| `b2@غرامة` | bande des citations : `»Die Angeklagte trägt die Kosten des Verfahrens« — laut Urteil` / « مصاريف المحاكمة عليها » (pour que « zéro » ne veuille pas dire « rien à payer ») |
| `b3@علاش` | la pastille et la bande s'effacent (0,15 s) ; à leur place, écran (540, 490) : « علاش؟ » (`ttl` 120 px) sur un trait de surligneur (`k.marker`), `pop` ; pendant 0,3 s toutes les amplitudes de « vie » sont multipliées par 0,2 (l'image retient son souffle) ; `c.kick` 0,07 |
| `b3@نرجعو` | **REMBOBINAGE** (tout est l'inverse exact de ce qu'on vient de voir) : le tampon se décolle (échelle 1 → 2,6, opacité → 0, 0,2 s) ; + 0,1 : les quatre lignes se dé-tapent (0,4 s) ; + 0,3 : la carte remonte (inverse du `drop`, 0,35 s) ; + 0,2 : dans la petite balance le bloc remonte, le fléau revient à plat ; + 0,45 : les trois juges redescendent derrière le banc ; + 0,1 → `i1` : elle **marche à reculons** vers la gauche (x 205 → −140, toujours tournée vers la droite, cycle `Pose.walk` joué à l'envers : `phase = 1 - ((205 - x) / 292 mod 1)`) ; le rayon de la fenêtre recule ; trois fines lignes de balayage montent sur l'image (y 1470 → 250 en 0,3 s, deux fois) ; le HUD passe en rembobinage (§ 3) ; « علاش؟ » reste, accroché en haut |

**Vie :** rayon + poussière ; plaque sur son clou (± 0,5°) ; carafe ; juges qui respirent et clignent ; le juge
tourne une page du dossier à b2 + 1,0 ; le Schöffe remonte ses lunettes à b2 + 1,6.
**Caméra :** `[{ at: "b2", s: 1, cx: 520, cy: 920 }, { at: "b2+0.1", s: 1.03, cx: 545, cy: 920, d: 2.2, ease: "lin" },
{ at: "b3@نرجعو", s: 1, cx: 500, cy: 920, d: 1.0 }]` (à la fin : travelling arrière, vers la gauche).
**Mentions :** `laut Urteil` sur la carte et dans la bande. **Affiche :** image à `b2@end`.

---

### Scène 3 — INTRO : la fiche de Yassine épinglée sur le tableau de garde (i1–i3 · 7,94 → 17,21)

`summary: false`. Logo du haut, compteur et onglet masqués. **Entrée :** `swipeR` (la page revient).
Tout le bloc finit à y 1066 (monde), soit y ≈ 1210 à l'écran en fin de scène : au-dessus de 1300.
**Caméra :** `[{ at: "i1", s: 1.05, cx: 540, cy: 800 }, { at: "i2", s: 1.0, cx: 540, cy: 820, d: 0.5 }]`.

| couche | objet | position (monde) |
|---|---|---|
| 1 | `k.bg()` ; `D.dutyBoard` | x 110–970, y 250–1290 ; en-tête `.tw` 30 `DIENSTPLAN` à (540, 302) |
| 2 | à gauche de la fiche : deux petites notes épinglées (lignes vides, un rond de tasse) | (185, 520) et (180, 760), 120 × 130 |
| 2 | une clé pendue à un crochet | (200, 980) |
| 2 | à droite : mini-frise 7 × 3 cases de 16 px (`D.hourGrid`), 4 aimants, un feutre au bout d'une ficelle | frise (835, 480) ; ficelle de (880, 600) à (880, 780) |
| 3 | `D.pinCard` 520 × 800 | punaise (540, 350) ; fiche x 280–800, y 350–1150 |
| 4 | bloc photo du socle (anneau jaune, photo découpée en rond, anneau au trait, pastille Instagram), échelle 0,78 | centre (540, 560) |
| 5 | ruban `Yassine` (`k.ribbon`, taille 50) — jamais « Dr. » | (540, 800) |
| 6 | petite icône Instagram + `@dr.aguilo` (`de`, 42 px) | icône (425, 868), texte (562, 882) |
| 7 | pastilles (taille 24) | (540, 945) |
| 8 | cœur (taille 1,1) + `j'aime` (28 px) ; bouton `+ s'abonner` → `✓ abonné` (250 × 72) | cœur (400, 990), texte (400, 1058) ; bouton centré (660, 1000) |

**Construction :** tableau présent dès l'entrée ; fiche `m.build(…, "swing", { pivot: [540, 350], deg: -40, dur: 0.6 })`
à `i1`, puis `m.pend(fiche, "i1+0.5", 3, [540, 350], { idle: 0.4 })` — tout le contenu de la fiche est dans le
même nœud, il se balance avec elle ; à `i1` l'anneau jaune **se trace** (`stroke-dashoffset`, 0,6 s) ; ruban
`wipe("i1@ياسين", 0.35)` ; icône + `@dr.aguilo` à `i1@ياسين+0.15` ; pastille 1 `Arzt in Deutschland` /
« طبيب فألمانيا » `pop("i1@فألمانيا")`, `hide("i2@حقيقية", 0.15)` ; pastille 2 (jaune) `echte Fälle · deutsche
Gerichte` / « قصص حقيقية من المحاكم » `pop("i2@حقيقية+0.15")`, `hide("i3", 0.15)` ; cœur et bouton `pop("i3")` /
`pop("i3+0.1")` : ils arrivent comme deux **aimants** qui claquent sur le tableau (petit rebond, pas de son de
« pop ») ; cœur plein + battement à `i3@j'aime` ; bouton jaune « ✓ abonné » à `i3@abonne` ; `c.kick` 0,05 sur
les deux.
**Vie :** fiche (± 0,4°), clé (`m.pend`, idle 1,5°), feutre sur sa ficelle (idle 2°), coin d'une note qui se
soulève (`m.sway` 2°, 2,2 s), reflet qui glisse sur le cadre alu (8 s).

---

### Scène 4 — Köln 2012 → la feuille signée (b4 · 17,21 → 19,87) — rembobinage, 1re page

**À comprendre :** c'était à Cologne, jugé en 2012 ; et avant le jugement il y a une feuille qu'elle a signée (on ne sait pas encore laquelle).
**Lieu :** la carte (forme imposée : Allemagne → Rhin → cathédrale). **Entrée :** `swipeR`.

| couche | objet | position (monde) |
|---|---|---|
| 1 | `k.bg()` ; `m.shapes({ seed: 41, pts: [[150, 470], [930, 430], [140, 1230]], at: "b4+0.2" })` | marges |
| 2 | `drawDE(c, 400, 830, 80, "b4")` (socle) : l'Allemagne, Berlin en repère | x 170–625, y 534–1134 ; Berlin (545, 724) |
| 3 | `D.rhine` : de Bâle à Emmerich, par `geo()` de [7.6, 47.6], [8.4, 49.0], [8.27, 50.0], [7.6, 50.36], [7.1, 50.73], [6.96, 50.94], [6.77, 51.23], [6.25, 51.83] | le long de la frontière ouest |
| 4 | épingle `pinAt(c, 223, 851, "b4@Köln")` + `m.ripple(223, 851, T("b4@Köln") + 0.35, { R: 90 })` | Köln = `geo(6.96, 50.94)` = (223, 851) |
| 5 | trait pointillé courbe de l'épingle au sommet de la cathédrale | (223, 851) → (760, 610) |
| 6 | `D.dom` (silhouette) + `D.riverWaves` à son pied | base (760, 1130) : x 630–890, y 610–1130 ; eau y 1140–1175, x 600–920 |
| 7 | `D.formSheet` (grande, échelle 0,72, inclinée −4°) + `D.pen` + `D.loopTag` | centre (500, 1010) : x 356–644, y 830–1190 ; « ؟ » pendu à son coin haut droit |

**Déroulé.** `b4@Köln` : l'épingle tombe, l'onde part ; pastille HUD jaune (540, 450), taille 40 : `Köln` /
« كولونيا » · `b4@Köln+0.1` : le Rhin se trace du sud au nord (0,5 s) · `b4@Köln+0.2` : la cathédrale pousse du sol
(`growY`, pivot (760, 1130), 0,5 s), le pointillé se trace · `b4@الحكم` : bande des citations
`Amtsgericht Köln · 16.05.2012` / « المحكمة الابتدائية ديال Köln » · `b4@5` (« 2012 ») : l'onglet tape `◀◀ 2012`,
`c.kick` 0,05 · `b4@ورقة-0.1` : la feuille arrive par la droite (`slide`, dx 500, 0,35 s), la pastille « Köln »
s'efface · `b4@سنات` → + 0,5 : la signature **se défait** (`o.sign` 1 → 0), le stylo recule le long du trait et
se lève ; le « ؟ » jaune se balance.
**Vie :** eau qui dérive (`m.drift`, 20 px/s), formes des marges, épingle qui oscille, « ◀◀ » qui clignote.
**Caméra (à l'envers) :** `[{ at: "b4", s: 1, cx: 580, cy: 900 }, { at: "b4+0.1", s: 1.03, cx: 500, cy: 900, d: 2.4, ease: "lin" }]`.
**Affiche :** image à `b4@سنات` (la feuille encore signée).

---

### Scène 5 — Les deux poches : le sang remonte (b5 · 19,87 → 21,85) — rembobinage, 2e page

**À comprendre :** avant la feuille, deux poches de sang — pareilles. **Entrée :** `swipeR`.

| couche | objet | position (monde) |
|---|---|---|
| 1 | `k.bg()` ; grandes cases de planning en filigrane (traits gris, opacité 0,25, cases de 140 px) avec parallaxe `m.par(…, 0.6)` | plein cadre |
| 2 | barre murale à deux crochets | de (230, 560) à (850, 560) ; crochets x 400 et x 680 |
| 3 | deux `D.bloodBag` identiques (même graine), échelle 1,5 | œillets (400, 566) et (680, 566) ; corps jusqu'à y 821, embouts y 860 |
| 4 | `D.tube` depuis la poche de DROITE | (680, 860) → (690, 960) → (640, 1080) → (720, 1200) → (700, 1430) |
| 5 | `D.loopTag` entre les deux | (540, 720) |

**Construction :** barre `drop` b5 + 0,02 ; poches `drop` (dist 300) b5 + 0,06 / 0,12 puis `m.pend(…, 8°, pivot
= œillet, { idle: 1.2 })`, en opposition de phase.
**Déroulé.** `b5@جوج` : pastille HUD (540, 450), taille 36 : `Blutkonserven` / « أكياس الدم » · de b5 + 0,3 à
`b5@الدم+0.2` : dans la tubulure le sang **remonte** (`o.back`, `o.fill` 1 → 0 : le front rouge monte vers la
poche), la goutte de la chambre remonte, le niveau de la poche de droite monte de 0,67 à 1 · `b5@الدم` : `c.kick` 0,05.
**Vie :** surfaces du sang qui ondulent avec le balancement, « ؟ » qui pend, « ◀◀ ».
**Caméra (à l'envers) :** `[{ at: "b5", s: 1, cx: 590, cy: 900 }, { at: "b5+0.1", s: 1.03, cx: 510, cy: 900, d: 1.8, ease: "lin" }]`.
**Teinte :** premier rouge de l'épisode. **Affiche :** image de fin.

---

### Scène 6 — La frise des heures : 63, puis la garde de 24 heures (b6–b7 · 21,85 → 27,44)

**À comprendre :** avant tout, une semaine de 63 heures ; et par-dessus, l'administration lui ajoute une garde de 24 heures.
**Lieu :** le mur du tableau de garde, long (le monde va de x −60 à 1980). **Entrée :** `swipeR` — la dernière
page qui revient. À `b6@كلشي` le rembobinage s'arrête : à partir d'ici tout va de gauche à droite.

| couche | objet | position (monde, `cy: 900`) |
|---|---|---|
| 1 | `k.bg()` ; mur de couloir : corniche 380, main courante y 1120, plinthe, sol 1300 | x −200 → 2200 |
| 2 | `D.dutyBoard` long | x −60 → 1980, y 520 → 1080 ; `DIENSTPLAN` (`.tw` 30) à (150, 575) |
| 3 | frise de la semaine : `D.hourGrid` 21 × 3 | x 130–1096, y 660–798 ; au-dessus, `.tw` 28 : `1 Woche` à (613, 632) |
| 4 | 21 nœuds `D.hourCol` (les cases noircies) | une colonne tous les 46 px |
| 5 | tampon `KLINIKVERWALTUNG` (`k.prop("stamp", …, { size: 30, rot: -6 })`, échelle 0,5) | (1180, 570) |
| 6 | bloc de garde : `D.magnetStrip` `24-Stunden-Notdienst` + `D.hourGrid` 12 × 2 (vide) + `.tw` 24 `Sa 30.07.2011` | bandeau centré (1526, 640) ; grille x 1250–1802, y 690–782 ; date à (1526, 830) |
| 7 | elle, `coat`, échelle 0,92, de profil, `facing: 1` | pieds y 1300 ; haut de la tête y 898 |

**Déroulé.**

| instant | ce qui se passe |
|---|---|
| b6 → `b6@كلشي` | la page arrive ; grille vide ; le compteur défile encore à l'envers ; elle entre par la gauche (x 60 → 300) |
| `b6@كلشي` | compteur : **clac** sur 00 (§ 3) ; l'onglet tape `Juli 2011` |
| `b6@كلشي+0.05` → `b6@وحدة-0.05` | les 21 colonnes se noircissent l'une après l'autre (`wipe` vers le bas, 0,07 s chacune, intervalle = durée ÷ 21, calculé sur les repères) ; le compteur suit (3 par colonne) |
| `b6@2` (« 63 ») | pastille HUD jaune (540, 450), taille 34 : `63-Stunden-Woche` / « سيمانة ديال 63 ساعة » |
| `b6@وحدة` | compteur : **clac** sur 63, il grossit un instant ; `c.kick` 0,07 |
| `b7@الإدارة` | le tampon `KLINIKVERWALTUNG` claque sur le tableau (`slam`, secousse 8) ; pastille (taille 32) : `Klinikverwaltung` / « الإدارة ديال السبيطار » |
| `b7@زادت` | le bandeau et la grille de garde tombent d'en haut (`m.build "drop"`, dist 320, 0,5 s) et claquent (`c.shake(+0.45, 6, 0.3)`) ; elle s'arrête dessous |
| `b7@garde` | compteur : le bloc B sort (§ 3) ; l'onglet tape `Sa · 30.07.2011` ; pastille jaune (taille 32) : `24-Stunden-Notdienst` / « مداومة ديال 24 ساعة » |
| `b7@7` (« 24 ») | les deux chiffres « 24 » du bandeau grossissent (×1,2, 0,3 s) ; `c.kick` 0,05 |

**Elle :** position `x(t)` : 60 → 300 jusqu'à `b6@كلشي+0.4`, puis elle suit la caméra (`x = cx - 180`) et
s'arrête à x 1420 à `b7@زادت+0.6`. **Jamais de glissade** : phase de marche = déplacement ÷ foulée
(`phase = ((x - 60) / (292 × 0.92)) mod 1`). Fatigue `f` de 0,15 à 0,35 : le pas ralentit, le buste se penche.
À l'arrêt : trois quarts, elle lève la tête vers le bloc (`look2: [0.3, -0.9]`, `headTilt -6`), `worried`, puis
la tête retombe (`headTilt 8`), les bras pendent.
**Vie :** aimants ; un feutre qui roule dans la gouttière quand le bloc tombe ; le coin d'une note ; la roue du
compteur ; le reflet du cadre.
**Caméra (le travelling signature) :** `[{ at: "b6", s: 1, cx: 560, cy: 900 }, { at: "b6@كلشي+0.4", s: 1, cx: 1040,
cy: 900, d: T("b7") - T("b6@كلشي") - 0.4 }, { at: "b7", s: 1, cx: 1500, cy: 900, d: 2.0 }, { at: "b7@7", s: 1.03,
cx: 1526, cy: 900, d: 0.6 }]`.
**Vérité :** 63 cases = 63 heures ; aucun nom de jour sur la frise de la semaine, aucune heure par jour, aucun
total. Le samedi 30.07.2011 est dans le jugement. **Affiche :** la case montre le monde x 0–1080 : la frise
de 63 cases, noire.

---

### Scène 7 — Samedi soir, le couloir : plus de 12 heures (b8 · 27,44 → 29,77)

**À comprendre :** le samedi soir elle est de garde depuis plus de 12 heures, à peu près seule, avec plusieurs appels à la fois.
**Lieu :** couloir, la nuit tombe pendant la scène. **Entrée :** `swipe`.

| couche | objet | position (monde) |
|---|---|---|
| 1 | `k.bg()` ; `D.corridor04({ doors: [200, 480, 760] })` | portes 150 × 600 (y 700–1300), numéros 1, 2, 3 ; voyants d'appel à (200, 660), (480, 660), (760, 660) |
| 2 | appliques (`D.sconce`) | (340, 640) et (620, 640) |
| 3 | `D.clock04` | (850, 560) |
| 4 | elle, `coat`, échelle 0,95, de profil puis de face | pieds y 1300 |

**Construction :** portes `rise` (dist 120) b8 + 0,03 / 0,09 / 0,15 ; horloge `grow` b8 + 0,1.
**Déroulé.** Elle traverse en marche pressée : x −60 (b8 + 0,05) → 620 (`b8@5`), phase = déplacement ÷ foulée
(`292 × 0.95`) ; voyant 1 s'allume à b8 + 0,35, voyant 2 à `b8@دازت`, voyant 3 à `b8@كثر` (chacun clignote à
2 Hz) ; à `b8@5` elle s'arrête entre les portes 2 et 3, se tourne de face, regarde à gauche puis à droite
(`look2` −0,8 → 0,8), sueur, `worried`. Les aiguilles de l'horloge **tournent vite** (du matin au soir : aiguille
des heures de 9 h 30 à 21 h 45 sur la durée de la scène) ; `o.night` 0 → 1 (la hachure de nuit monte dans les
angles) ; les appliques s'allument à b8 + 0,7 et + 1,1 (halo jaune).
`b8@بالليل` : bande des citations `»mit Notfallpatienten mehr oder weniger allein« — laut Urteil` /
« تقريبا بوحدها ». `b8@دازت` → `b8@6` : le bloc B du compteur compte de 00 à 12, **clac** et « > » jaune à `b8@6`,
`c.kick` 0,06. `b8@كثر` : pastille HUD jaune (taille 32) : `mehr als 12 Stunden` / « كثر من 12 ساعة ».
**Vie :** voyants, halos qui vacillent (± 6 %), trotteuse, sa blouse qui bat à la marche.
**Caméra :** `[{ at: "b8", s: 1, cx: 500, cy: 920 }, { at: "b8+0.1", s: 1.03, cx: 580, cy: 920, d: 2.1, ease: "lin" }]`.
**Affiche :** image de fin.

---

### Scène 8 — Le tableau du personnel : débutante, 9 mois, et pas de Blutführerschein (b9–b10 · 29,77 → 36,88)

**À comprendre :** elle n'est qu'Assistenzärztin, elle débute (9 mois dans cet hôpital), et elle n'a pas encore reçu la formation qui autorise à transfuser.
**Lieu :** le même couloir, devant le tableau du personnel. **Entrée :** `swipe`.

| couche | objet | position (monde) |
|---|---|---|
| 1 | `k.bg()` ; `D.corridor04({ doors: [], night: 1 })` ; une applique à (230, 600) | — |
| 2 | `D.dutyBoard` | x 330–940, y 540–1160 ; en-tête `.tw` 24 `TEAM` à (635, 580) |
| 3 | `D.staffCard` (sa fiche) sur `D.pinCard` 240 × 300 | punaise (470, 620) ; fiche x 350–590, y 620–920 ; sa tête `ph(470, 730, 0.5, …)` ; `.tw` 20 `Assistenzärztin` (y 840) ; `.tw` 18 `seit 15.10.2010` (y 872) ; bande jaune vierge à la place du nom |
| 4 | 9 `D.monthCell` : une grille 3 × 3 de cases de planning (46 px, tracée comme `D.hourGrid`), numérotées 1–9 en `.tw` 14 dans le coin — PAS des feuillets de calendrier (AKTE 06) | grille x 691–829, y 646–784 (centre (760, 715)) ; dessous `.tw` 26 `9 Monate` (760, 850) et « 9 شهور » gras 28 (760, 892) |
| 5 | `D.licenceCard` dans sa pochette | centre (640, 1040) : x 490–790, y 950–1130 ; étiquette `.tw` 18 `Schulung: Transfusion` à (640, 940) |
| 6 | elle, `coat`, échelle 1,0, trois quarts `facing: 1` | x 205, pieds y 1300 ; tête y 863–1010 |

**Construction :** tableau `drop` (dist 260) b9 + 0,03 ; fiche `swing` b9 + 0,15 puis pendule ; elle entre en
marchant (x −80 → 205, b9 + 0,05 → + 0,85).
**Déroulé b9.** `b9@Assistenzärztin` : pastille HUD (taille 34) `Assistenzärztin` / « طبيبة مقيمة » ; la ligne
`Assistenzärztin` de la fiche se tape · `b9@عاد` : pastille (taille 32) `Berufsanfängerin` / « عاد بدات » ·
`b9@6` (« 9 ») : les neuf cases se noircissent une à une (`wipe` vers le bas, 0,07 s d'écart : le geste de la frise des heures), puis `9 Monate` se
tape et « 9 شهور » se révèle · `b9@السبيطار` : trait de surligneur sous `seit 15.10.2010` · `b9@شهور` : elle bâille.
**Déroulé b10.** `b10` : la pastille s'efface ; la caméra descend vers la pochette · `b10@ناقصاها` : un cercle
jaune se trace autour de la pochette ; bande des citations `»Diese Schulung hatte die Angeklagte … noch
nicht erhalten« — laut Urteil` / « مازال ناقصاها » · `b10@formation` : l'étiquette `Schulung: Transfusion` se tape ·
`b10@Blutführerschein` : la carte apparaît 0,15 s, pleine, puis devient **fantôme** (`o.ghost` 0 → 1 : contour
en pointillés) ; en travers, `.tw` 24, incliné −4° : `noch nicht erhalten` ; pastille HUD jaune (taille 34) :
`Blutführerschein` / « « رخصة » ديال الدم » ; elle baisse les yeux vers la pochette (`look2: [0.7, 0.5]`), tâte
deux fois la poche de sa blouse (`reachR` vers la poche, tressaut de 4 px), `worried` ; `c.kick` 0,06.
**Vie :** fiche sur sa punaise, grille des mois qui frémit sur ses aimants (± 1°), reflet sur la pochette (3 s), halo de l'applique.
**Caméra :** `[{ at: "b9", s: 1, cx: 520, cy: 920 }, { at: "b9+0.1", s: 1.02, cx: 560, cy: 920, d: 3.0, ease: "lin" },
{ at: "b10", s: 1.12, cx: 575, cy: 990, d: 0.5 }]` (à ×1,12 elle reste entière dans le cadre : bord gauche x 145).
**Vérité :** la date du 15.10.2010 et « 9 mois dans cet hôpital » viennent du jugement ; pas de nom sur la fiche.
**Affiche :** image de fin.

---

### Scène 9 — Le passe-plat du labo : deux poches pareilles, en une fois (b11 · 36,88 → 40,11)

**À comprendre :** le labo lui remet deux poches qu'on ne peut pas distinguer, en même temps, pour deux patients différents.
**Lieu :** devant le passe-plat du laboratoire. **Entrée :** `swipe`. **Mention** « Rekonstruktion » (voir bas de scène).

| couche | objet | position (monde) |
|---|---|---|
| 1 | `k.bg()` ; mur de couloir (corniche 380, plinthe, sol 1300) | — |
| 2 | `D.labHatch` | ouverture x 440–860, y 660–920 ; tablette y 920 (x 420–880) ; enseigne `LABOR` x 560–740, y 578–634 ; voyant jaune (885, 700) |
| 3 | à l'intérieur (découpé) : vitre dépolie, frigo à poches (à droite, x 700–850), ombre grise | — |
| 4 | `D.rack` + deux `D.bloodBag` (échelle 0,62, mêmes paramètres) + `D.loopTag` | position finale : socle (580, 920) ; œillets (530, 786) et (630, 786) ; « ؟ » pendu au montant droit |
| 5 | elle, `coat`, échelle 1,05, trois quarts `facing: 1` | x 345, pieds y 1300 |
| 6 | deux `D.bedIcon` numérotés 1 et 2 + deux flèches en pointillés qui NE se croisent PAS | lits (600, 1160) et (760, 1160) ; flèches (530, 907) → (600, 1120) et (630, 907) → (760, 1120) |
| 7 | mention, en haut à droite : `.tw` 18 `Rekonstruktion` (800, 418) + « مشهد تمثيلي » gras 26 (800, 450) | — |

**Construction :** enseigne `drop` b11 + 0,03, elle grésille deux fois ; le volet remonte (`o.shutter` 1 → 0) de
b11 + 0,07 à + 0,45.
**Déroulé.** `b11@labo` : pastille HUD (taille 36) `Labor` / « المختبر » · b11 + 0,3 → `b11@عطاها` : l'ombre passe
derrière la vitre (de droite à gauche) et le portoir **glisse** sur la tablette (de x 760 à 580), les deux poches
se balancent ensemble (`m.pend`, 8°) · elle arrive en marchant (x −80 → 345, b11 + 0,05 → `b11@عطاها`), tend
la main droite d'écran vers la poignée du portoir (`reachR` vers (455, 925), soit `[105, -357]` dans son
repère) · `b11@poches` : un coup de ciseaux (deux traits) coupe la ficelle du « ؟ » : la boucle « deux poches »
est refermée · `b11@بحال` : pastille jaune (taille 34) `quasi identisch` / « بحال بحال » ; un cercle de surligneur
entoure la poche 1 (0,2 s), puis la poche 2 (0,2 s), puis un « = » manuscrit (Kalam 60) se pose entre elles ·
`b11@فدقة` : pastille (taille 34) `gleichzeitig` / « فدقة وحدة » ; le portoir tressaute (4 px) ; elle : `worried` ·
`b11@لجوج` : les deux lits et les deux flèches apparaissent (`pop`, 0,12 s d'écart).
**Vie :** diode du frigo qui clignote (1 Hz), enseigne (± 8 % d'intensité), ombre qui s'éloigne, poches qui se
balancent en amortissant, voyant.
**Caméra :** `[{ at: "b11", s: 1, cx: 500, cy: 920 }, { at: "b11+0.1", s: 1.03, cx: 570, cy: 920, d: 3.0, ease: "lin" }]`.
**Vérité :** personne du labo n'a de visage ; aucun texte lisible sur les poches ; on ne montre pas quelle
poche va à qui. **Affiche :** image de fin.

---

### Scène 10 — Le Begleitdokument (b12 · 40,11 → 43,49)

**À comprendre :** selon le jugement, le groupe n'est écrit que sur une feuille pleine d'informations — pas sur la poche.
**Lieu :** insert, même moment. **Entrée :** `cut`.

| couche | objet | position (monde) |
|---|---|---|
| 1 | `k.bg()` ; `m.shapes({ seed: 12, pts: [[150, 440], [340, 900], [930, 440]] })` | marges |
| 2 | barre + deux `D.bloodBag` (échelle 0,7) | œillets (190, 566) et (300, 566) ; corps y 566–685 |
| 3 | sa tête : `ph(240, 1085, 1.25, …)` | x 160–320, y 990–1175 |
| 4 | `D.docSheet`, inclinée −1,5° | x 400–900, y 500–1330 |
| 5 | surligneur (barre jaune 180 × 22, opacité 0,55) ; `D.loupeSmall` (R 70) | sur les lignes de la feuille |

**Construction :** feuille `drop` (dist 500, 0,45 s) b12 ; poches `drop` b12 + 0,05 ; tête `rise` b12 + 0,1.
**Déroulé.** b12 + 0,2 : pastille HUD (taille 32) `Begleitdokument` / « الورقة اللي مع الكيس » · `b12@وحسب` : bande des
citations `laut Urteil: Blutgruppe »an der Konserve selbst … nicht gekennzeichnet«` / « حسب الحكم » ·
`b12@groupe` : sur chaque poche, le cadre en pointillés vide (`o.ghost`) pulse une fois ; le surligneur part de la
première ligne · `b12@groupe` → `b12@غير` : il saute de ligne en ligne (6 lignes, 0,14 s par saut), ses yeux le
suivent (`look2` de gauche à droite, puis retour) · `b12@غير` : la pastille s'efface · `b12@فورقة` : le
surligneur s'arrête sur le petit champ ; la loupe s'y pose (`pop`) et le grossit ×2,2 : on lit `Blutgruppe:`
(`.tw` 26), la valeur reste un gribouillis ; pastille jaune (taille 36) `Blutgruppe` / « فصيلة الدم » · `b12@عامرة` et
`b12@بالمعلومات` : la feuille **se brouille** deux fois (`o.blur` 0 → 1 → 0 en 0,5 s) pendant qu'elle cligne
longuement (`blink 1` pendant 0,25 s).
**Elle :** `focused`, paupières lourdes, sueur ; tête qui penche de 3°.
**Vie :** poches qui se balancent (1°), feuille qui flotte (`float` 4 px, 3 s), formes des marges.
**Caméra :** `[{ at: "b12", s: 1, cx: 520, cy: 920 }, { at: "b12+0.1", s: 1.03, cx: 565, cy: 920, d: 3.2, ease: "lin" }]`.
**Vérité :** « selon le jugement » est écrit ; rien d'imprimé sur les poches ; la valeur du groupe n'est pas
lisible. **Affiche :** image à `b12@بالمعلومات`.

---

### Scène 11 — 21:50, la chambre : elle accroche la poche (b13 · 43,49 → 45,81)

**À comprendre :** vers 21 h 50 elle pose une poche à un patient de 63 ans — la troisième de sa journée.
**Lieu :** la chambre, vue de face (mise en place « chambre »). **Entrée :** `swipe`.

**Mise en place « chambre »** (monde ; la même dans les scènes 11, 12, 13) :

| couche | objet | position |
|---|---|---|
| 1 | `k.bg()` ; mur de chambre (corniche 380, bande de protection y 1180, plinthe, sol 1300) | — |
| 2 | `D.clock04` | (165, 500) |
| 3 | `D.nightWindow` | x 710–890, y 520–720 |
| 4 | `D.nightstand04` (deux poches vides cochées) | bas centre (155, 1300) : x 110–200 |
| 5 | `D.bedBack04` | bas centre (400, 1300) ; tête de lit x 215–585, y 830–1090 |
| 6 | `PAT`, de face, échelle 1,0 | x 400, pieds y 1335 (cachés) ; tête y 898–1045 ; son bras droit d'écran repose sur la couette : `reachR` vers (505, 1120) |
| 7 | `D.bedFront04` + pancarte | couette dès y 1125 ; pancarte centrée (400, 1215), `.tw` 15 : `Leberzirrhose` / `Anämie` |
| 8 | `D.ivPole` | bas centre (700, 1300) ; crochet à (756, 915) ; second crochet vide |
| 9 | `D.bloodBag` (échelle 0,8) | œillet (756, 921) ; corps x 712–800, y 921–1057 ; embouts y 1073 |
| 10 | `D.tube` | (756, 1073) → (765, 1110) → (720, 1185) → (600, 1160) → (505, 1120) ; roulette à 10 % du trajet |
| 11 | elle, `coat`, échelle 0,95, trois quarts `facing: -1` | x 835 (puis 858), pieds y 1300 |

**Le crochet se règle sur sa main, pas l'inverse :** en pose `Pose.wave`, `facing: -1`, `Persona.util.rig`
donne la main à `[-82.7, -393.5]` ; à l'échelle 0,95 et x 835 : (756, 926). Mesurer de nouveau au montage.

**Construction :** fenêtre `grow` b13 + 0,03 ; lit `rise` (dist 160) b13 + 0,05 ; chevet `left` b13 + 0,1 ;
horloge `grow` b13 + 0,08 ; potence `rise` b13 + 0,12.
**Déroulé.** Au début elle tient la poche devant elle (pose `holdHandOut`, la poche suit l'ancre de sa main) ·
`b13@21:50` : le bord de l'horloge (aiguilles sur 21 h 50) pulse ; pastille HUD (taille 34) `gegen 21.50 Uhr` /
« مع 21:50 » · `b13@علقات` → + 0,4 : le bras monte (mélange `holdHandOut` → `wave`), la poche passe de la main au
crochet au même point et se balance (`m.pend`, 6°) · `b13@poche+0.2` : elle baisse le bras, ouvre la roulette
(`o.clamp` 1 → 0) : le sang descend dans la tubulure (`o.fill` 0 → 0,6 à la fin de la scène), la chambre
goutte · `b13@لمريض` : elle lui adresse un regard calme ; il la regarde · `b13@6` (« 63 ») : pastille jaune
(taille 36) `63 Jahre` / « 63 عام » ; **au même instant le « 63 » du compteur clignote** ; `c.kick` 0,05 ·
`b13@عام` : elle recule d'un pas (x 835 → 858).
**Vie :** nuage devant la lune, trotteuse, respiration du patient (couette + 3 px), second crochet qui oscille,
gouttes.
**Caméra :** `[{ at: "b13", s: 1, cx: 510, cy: 920 }, { at: "b13+0.1", s: 1.03, cx: 560, cy: 920, d: 2.1, ease: "lin" }]`.
**Affiche :** image de fin.

---

### Scène 12 — 0 contre A : la loupe · dix minutes · on arrête (b14–b15 · 45,81 → 51,30)

**À comprendre :** lui est du groupe 0, la poche est A et elle était pour une autre patiente ; ses anticorps détruisent ce sang ; au bout de dix minutes il vomit et on arrête, un tiers est passé.
**Lieu :** la chambre (même mise en place). **Entrée :** `cut`. **C'est l'explication médicale en image.**

Ajouts à la mise en place :

| objet | position (monde) |
|---|---|
| annotation manuscrite « 0 » (Kalam 90) dans un cercle tracé (r 52) + `.tw` 18 `Blutgruppe` au-dessus + petite flèche vers lui | centre (270, 1010) ; étiquette (270, 945) |
| annotation « A » (Kalam 90), cercle r 52, `.tw` 18 `Blutgruppe`, flèche vers la poche | centre (640, 990) ; étiquette (640, 925) |
| étiquette : pictogramme de femme + `.tw` 18 `für eine andere Patientin` + « ديال مريضة أخرى » gras 30 + pointillé jusqu'à la poche | texte (600, 800) et (600, 842) ; pointillé → (756, 915) |
| `D.loupe` + trait de liaison | centre (345, 690), R 150 ; liaison (470, 775) → (640, 1172) sur la tubulure |
| `.tw` 22 `≈ 10 min` | (255, 470), à droite de l'horloge |
| `D.kidneyDish` | (430, 1108) |

Ces lettres sont des annotations de la série, à côté des objets : rien n'est imprimé sur la poche.

| instant | ce qui se passe |
|---|---|
| `b14@groupe` | le cercle de gauche se trace ; `b14@2` (« 0 ») : le « 0 » se pose (`pop`) |
| `b14@poche` | la loupe jaillit du point de liaison (`grow`, pivot (640, 1172)) ; dedans, les globules entrent (`o.flow` 0 → 1 jusqu'à `b14@مريضة`) |
| `b14@4` (« A ») | cercle + « A » ; les picots des globules, dans la loupe, clignotent une fois en même temps |
| `b14@مريضة` | l'étiquette « autre patiente » et son pointillé (`wipe`) |
| `b15@من` | horloge : le secteur jaune des dix minutes s'ouvre (`o.sector` 0 → 1 jusqu'à `b15@دقايق+0.3`, l'aiguille passe de 50 à 00) ; `≈ 10 min` se tape |
| `b15@بعد` → `b15@3+0.2` | dans la loupe les **pinces** se referment sur les picots (`o.grab` 0 → 1) |
| `b15@دقايق` | les globules pincés **éclatent** (`o.burst` 0 → 1 en 0,7 s) ; pastille HUD jaune (taille 36) `Hämolyse` / « تكسر كريات الدم الحمراء » ; `c.shake(…, 5, 0.4)` |
| `b15@بدا` | lui : `worried` ; `b15@كيتقيا` : `pain`, il se penche (`torsoLean 10`, `headTilt 12`, `Pose.handOnBelly`), le haricot apparaît, trois petits traits ondulés ; elle : `shock` ; `c.kick` 0,06 |
| `b15@ووقفو` | sa main ferme la roulette (`reachR` vers (770, 1105) ; `o.clamp` 0 → 1 en 0,25 s) : le front rouge s'arrête, la goutte reste suspendue, dans la loupe plus rien n'entre |
| `b15@ليه` | pastille (taille 40) `1/3` / « الثلث » : le niveau de la poche s'est arrêté à 0,67 |
| `b15@الدم+0.2` | bande des citations `»schwerst vorgeschädigt« (Leberzirrhose, Anämie) — laut Urteil` / « كان مريض بزاف من قبل » |

Niveau de la poche : 1 → 0,67, linéaire, de l'ouverture de la roulette (scène 11) à `b15@ووقفو`.
**Vie :** pinces libres qui frétillent, globules qui dérivent, gouttes, trotteuse, respiration.
**Caméra :** `[{ at: "b14", s: 1, cx: 520, cy: 910 }, { at: "b14+0.1", s: 1.02, cx: 540, cy: 910, d: 2.2, ease: "lin" },
{ at: "b15@بدا", s: 1.12, cx: 520, cy: 990, d: 0.4 }]` (à ×1,12 tout reste dans le cadre : x 78–962).
**Vérité :** pas de Rhésus (les deux étaient Rh+) ; on ne dit pas qui a vu l'erreur (une main ferme la roulette :
c'est celle de la seule personne présente à l'image) ; pas de voile rouge ; rien de choquant.
**Affiche :** image à `b15@ليه`.

---

### Scène 13 — Dimanche, 13:37… puis MUETTE 1 : le patient, le compteur se fige (b16 + silence · 51,30 → 54,25)

**À comprendre :** il est mort le dimanche à 13 h 37. On ne le dit pas : on le voit.
**Lieu :** la chambre, de jour. **Entrée :** `swipe` (la page du dimanche). Elle n'est PAS là : rien ne dit qu'elle
y était. Ni soignant ni famille.

Changements de la mise en place : fenêtre de jour (`o.p: 0`) et tache de soleil sur le mur (parallélogramme
jaune pâle, x 520–690, y 760–1000) ; chevet sans les poches vides, un verre d'eau ; à la potence une poche
**claire** (`o.tint: 0`, niveau 0,8) et le second crochet vide ; tubulure sans rouge ; pas de loupe, pas
d'annotations ; `PAT` adossé, `sleep`, `headTilt 6`.
**Pas de moniteur** (choix de l'épisode) : ce qui « bat », c'est la petite roue du compteur, la trotteuse, la
goutte et la couette.

| instant | ce qui se passe |
|---|---|
| `b16@الأحد` | l'onglet tape `So · 31.07.2011` |
| `b16@13:37` | l'aiguille des minutes saute de 36 à 37 ; dans `c.hud`, écran (540, 480) : `13:37` (`.tw` 96 px), tapé en 0,25 s |
| `b16@end+0.2` = `calme` | `vie(t) = 1 - E.inOut(prog(t, calme, 0.8))` multiplie toutes les amplitudes : la couette cesse de se soulever, la goutte ne tombe plus, la tache de soleil s'arrête, la poussière se pose (`m.dust(…, { to: calme + 0.6 })`), la trotteuse s'arrête à `calme + 0.3`, **la petite roue du compteur ralentit et s'arrête, le compteur devient gris** (§ 3) ; sa tête s'incline (`headTilt` 6 → 14), sa main s'ouvre sur la couette |
| `calme + 0.2` → + 1,2 | `c.layer.style.filter = grayscale(0 → 0.85)` |
| `b16@end+0.6` | écran (540, 1440), dans `c.hud` : « المريض ما عاشش » (`ttl` 72 px), `wipe rtl` 0,5 s ; s'efface avec la scène |

**Vie (avant) :** trotteuse (un pas par 0,1 s), goutte (1,2 s), respiration lente (couette 3 px, 3,4 s), tache
de soleil (10 px en 3 s), poussière dans la lumière.
**Caméra :** immobile. `[{ at: "b16", s: 1, cx: 520, cy: 930 }, { at: "b16+0.1", s: 1.04, cx: 520, cy: 930, d: 2.9, ease: "lin" }]`.
Pas de travelling : le temps s'est arrêté.
**Affiche :** image à `b16@end+1.4`.

---

### Scène 14 — MUETTE 2 : elle glisse le long du mur · l'effondrement · la convocation (silence + b17–b18 · 54,25 → 59,28)

**À comprendre :** elle s'effondre ; et c'est dans cet état que l'administration la convoque.
**Lieu :** un couloir, autre lieu, autre moment, **sans date ni heure** (onglet masqué, aucune horloge).
**Entrée :** `fade` 0,4 s à `b16@end+1.9`. Une seule scène, sans coupe : elle glisse, on nomme, la porte s'ouvre.

| couche | objet | position (monde, `cy: 930`) |
|---|---|---|
| 1 | `k.bg()` ; `D.corridor04({ doors: [], night: 0 })` | main courante y 1120 de x 232 à 700 |
| 2 | `D.pillar` | x 150–232, y 380–1300 |
| 3 | `D.frame04` | (520, 760) |
| 4 | `D.adminDoor` | porte x 700–850, y 720–1300 ; plaque `Verwaltung` (`.tw` 20) à (775, 690) |
| 5 | elle, `scrubs`, échelle 1,0, de profil `facing: 1`, dos contre le pilier | hanche x 262, pieds y 1300 |
| 6 | `D.stetho` | tombe de (290, 1020) à (455, 1292) |

**La glissade** (essayée : elle fonctionne en `scrubs`, pas en `coat`) :
```js
const DEBOUT = { view: "side", armL: [-4, 10], armR: [4, 8], legL: [-1, 0], legR: [1, 0], torsoLean: 0, headTilt: 0 };
const AU_SOL = { view: "side", armL: [58, 62], armR: [66, 56], legL: [132, -92], legR: [138, -96], torsoLean: -5, headTilt: 24, look2: [0, 0.9] };
const k = E.inOut(prog(t, T("b16@end") + 2.3, 0.9)), kb = clamp((k - 0.55) / 0.45, 0, 1);   // les bras ne suivent qu'à la fin
const pose = Object.assign(PE.mix(DEBOUT, AU_SOL, k), { armL: PE.mix(DEBOUT, AU_SOL, kb).armL, armR: PE.mix(DEBOUT, AU_SOL, kb).armR });
```
Le dos reste contre le pilier (la hanche ne bouge pas en x), les pieds glissent vers l'avant, la hanche descend
de y −168 à −17. Expression : `shock` (k < 0,2) → `sad` → `cry`, larmes 1 (k ≥ 0,8).

| instant | ce qui se passe |
|---|---|
| `b16@end+2.3` → + 3,2 | elle glisse (elle attend la fin du fondu d'entrée, qui dure jusqu'à + 2,3) ; à k = 0,5 le stéthoscope tombe (parabole 0,35 s, rebond de 8 px) |
| `b16@end+3.2` | pastille HUD (taille 30) `nervlich zusammengebrochen` / « انهيار عصبي » + petit `laut Urteil` (`.tw` 15) à sa droite ; elle : épaules secouées (± 1,5 px, 6 Hz, une fois sur deux) |
| `b17@انهيار` | sa main monte au visage (`armR: [84, 98]`) ; la caméra s'approche |
| `b18@وهي` | la pastille s'efface |
| `b18@الإدارة` | au fond la porte **s'ouvre** (`o.open` 0 → 1, 0,5 s) : un coin de lumière jaune s'allonge sur le sol jusqu'à ses pieds ; pastille (taille 32) `Klinikverwaltung` / « الإدارة ديال السبيطار » ; mention `Rekonstruktion` / « مشهد تمثيلي » en haut à droite ((800, 418) et (800, 450)) ; à + 0,15 elle relève la tête (`headTilt` 24 → 6, `look2: [0.9, -0.1]`) |
| `b18@عيطات` | la plaque `Verwaltung` pulse (×1,15, 0,3 s) |
| `b18@عليها` | elle commence à se relever (k 1 → 0,75 en 0,4 s) |

**Vie :** larmes, lumière de la porte qui vacille (± 5 %), cadre légèrement de travers qui oscille de 0,5°.
**Caméra :** `[{ at: "b16@end+1.9", s: 1, cx: 520, cy: 930 }, { at: "b17", s: 1.1, cx: 440, cy: 1010, d: 0.6 },
{ at: "b18@الإدارة", s: 1, cx: 560, cy: 950, d: 0.8 }]` (à ×1,1 la porte reste entière dans le cadre).
**Vérité :** aucun jour (« am Tag nach den Vorkommnissen » se compte à partir du samedi : ne jamais écrire
« le lendemain » après le décès) ; « convoquée », pas « forcée ».
**Affiche :** image à `b17@end`.

---

### Scène 15 — Le bureau : la feuille, le stylo — et ce n'est pas vrai (b19 · 59,28 → 62,79)

**À comprendre :** on lui fait signer qu'elle a reçu la formation ; c'est faux, et la responsabilité glisse vers elle.
**Lieu :** bureau de l'administration, par-dessus l'épaule de quelqu'un qu'on ne voit pas. **Entrée :** `swipe`.
Mention `Rekonstruktion` / « مشهد تمثيلي » en haut à droite pendant toute la scène. Aucune date, aucune parole.

| couche | objet | position (monde) |
|---|---|---|
| 1 | `k.bg()` ; `D.officeBack` | corniche 380, sol 1300 |
| 2 | `D.blinds` + plante sur l'appui + raies de lumière sur le mur | store x 130–430, y 440–780 ; plante (400, 772) ; raies x 440–600, y 600–900 |
| 3 | `D.binders` | x 620–900, y 470–640 |
| 4 | `D.chair04` + elle, `scrubs`, `Pose.sitEdge` (profil, `facing: 1`), échelle 1,0 | x 330, pieds y 1300 ; tête y 941–1080 |
| 5 | `D.desk04` (ses genoux passent dessous) | plateau x 385–960, y 1105 ; façade pleine à partir de x 470 seulement (ses genoux et ses pieds, vers x 415–440, restent libres) ; plaque `Klinikverwaltung` sur la façade (x 490–660, y 1160–1200) |
| 6 | petite feuille (vue de côté) + `D.binderLying` `Verantwortung` | feuille x 430–560, y 1095 ; classeur de x 620 à 470 |
| 7 | `D.suitArm` | part de (705, 1150), main vers (585, 1092) |
| 8 | `D.chairBack` (premier plan) | x 690–910, y 1060–1470 |
| 9 | insert : `D.formSheet` grande (400 × 500) | centre (650, 800) : x 450–850, y 550–1050 |

**Construction :** store `drop` b19 + 0,03 ; étagère `drop` b19 + 0,08, un classeur tombe à plat (`swing`) à
b19 + 0,3 ; bureau `rise` b19 + 0,05 ; fauteuil `rise` (dist 300) b19 + 0,1.

| instant | ce qui se passe |
|---|---|
| `b19@وخلاتها` | le bras s'allonge vers elle (`o.len` 115 → 190 en 0,4 s) : il tend le stylo |
| `b19@تسني` | elle prend le stylo (`reachR` vers (425, 1092), à 92 px de son épaule) ; le bras se retire à moitié |
| `b19@ورقة` | la feuille « monte » du bureau et grandit (échelle 0,3 → 1, de (495, 1095) à (650, 800), 0,4 s, `back`) : en-tête `Erklärung` ; le `D.loopTag` « ؟ » de la scène 4 y pend encore |
| `b19@بلي` → `b19@formation` | la ligne à case se tape : `☑ Schulung »Transfusion« erhalten` (`.tw` 22) ; à `b19@formation` un trait de surligneur passe dessous |
| `b19@formation+0.3` → + 0,8 | sa signature s'écrit (`o.sign` 0 → 1), sa main tremble (± 2 px) |
| `b19@وهادشي` | tampon `k.prop("stamp", …, { text: "UNZUTREFFEND", sub: "laut Urteil", size: 44, rot: -10 })`, échelle 0,55, `slam` en travers de la feuille à (650, 860) ; la ficelle du « ؟ » est coupée ; pastille HUD jaune (taille 30) `unzutreffende Erklärung` / « ورقة ماشي صحيحة » ; elle : `cry` |
| `b19@ماشي` | le bras pousse le classeur `Verantwortung` vers elle (x 620 → 470 en 0,5 s) ; bande des citations `»ihr organisatorisches Versagen … überzubürden« — laut Urteil` / « المسؤولية » |

**Vie :** lames du store qui respirent, raies de lumière qui glissent, plante, fauteuil qui pivote de ± 1,5°,
larmes.
**Caméra :** `[{ at: "b19", s: 1, cx: 510, cy: 920 }, { at: "b19+0.1", s: 1.03, cx: 560, cy: 920, d: 3.2, ease: "lin" }]`.
**Affiche :** image à `b19@end`.

---

### Scène 16 — Des mois (b20 · 62,79 → 64,69)

**À comprendre :** elle a passé des mois à se soigner ; elle ne pouvait plus travailler.
**Lieu :** une pièce calme, chez elle ou ailleurs (on ne sait pas : aucun détail qui situe). **Entrée :** `swipe`.

| couche | objet | position (monde) |
|---|---|---|
| 1 | `k.bg()` ; mur nu, corniche 380, sol 1300, tache de lumière au sol | — |
| 2 | `D.seasonWindow` | x 460–780, y 470–830 |
| 3 | `D.coatRack` : la blouse et le stéthoscope pendus | pied (160, 1300) ; blouse y 660–1000 |
| 4 | `D.chair04` + elle, `sweater`, `Pose.sitEdge`, `facing: 1` | x 330, pieds y 1300 |

**Déroulé.** Dès `b20` : la fenêtre passe les saisons (`o.p` 0 → 1 sur toute la scène : les feuilles tombent,
il neige, les bourgeons sortent) ; la tache de lumière de la fenêtre glisse sur le sol de gauche à droite à
chaque saison (trois passages, b20 + 0,2 + i × 0,5) ; bande des citations `»nicht mehr in der Lage, ihrem Beruf
nachzugehen« — laut Urteil` / « ما بقاتش قادرة تخدم » · `b20@شهور` : pastille HUD (taille 24) `über Monate …
psychotherapeutische Behandlung` / « شهور ديال العلاج » ; elle relève la tête vers la fenêtre (`headTilt` 16 → 4,
`look2: [0.8, -0.2]`, `sad` → `calm`).
**Vie :** blouse qui bouge à peine (`m.sway` 1,2°, 3,5 s), branche (1,5°), flocons, respiration.
**Caméra :** `[{ at: "b20", s: 1, cx: 510, cy: 920 }, { at: "b20+0.1", s: 1.03, cx: 550, cy: 920, d: 1.7, ease: "lin" }]`.
**Vérité :** aucun mois, aucune date à l'image (les mois ne sont pas datés) ; pas de médicaments à l'image.
**Pas de calendrier qui s'effeuille** (retiré le 26.11.2026) : les pages qui s'arrachent sont le dispositif
signature d'AKTE 06, et AKTE 05 en avait un aussi ; ici le temps passe par la fenêtre seulement.
**Affiche :** image de fin.

---

### Scène 17 — Retour au tribunal : le parquet demande 90 Tagessätze (b21 · 64,69 → 68,00)

**À comprendre :** on est revenu au début ; le parquet DEMANDE une amende de 90 jours — ce n'est pas la peine.
**Lieu :** la salle d'audience (même mise en place que la scène 2). **Entrée :** `swipe`.
En plus : `D.chair04` + `EXP` assis de profil (`Pose.sitEdge`, `facing: -1`, échelle 0,85) à (805, 1300), tête
y 995–1115, `D.folder` `Gutachten` sur les genoux. Elle : `cry`, épaules secouées.

| instant | ce qui se passe |
|---|---|
| b21 | l'onglet tape `Mi · 16.05.2012` ; le compteur est toujours gris ; la petite balance du banc penche toujours |
| `b21@للمحكمة` | pastille HUD (taille 28) `Amtsgericht Köln · 16.05.2012` / « المحكمة الابتدائية ديال Köln » ; l'expert hoche la tête (à + 0,4) |
| `b21@النيابة` | `D.typedCard` **à bord en pointillés** (400 × 240) tombe au centre (520, 1175) ; ligne 1 tapée, `.tw` 22 : `Staatsanwaltschaft:` ; pastille (taille 32) `Staatsanwaltschaft` / « النيابة العامة » ; le Schöffe note |
| `b21@طلبات` | ligne 3, `.tw` 22 : `— beantragt —` |
| `b21@7` (« 90 ») | ligne 2, `.tw` 46 : `90 Tagessätze` ; pastille (taille 28, GRISE, pas jaune) `90 Tagessätze · beantragt` / « غرامة بالأيام · طلب، ماشي حكم » ; `c.kick` 0,06 |
| `b21@Tagessätze` | bande des citations `1 Tagessatz ≈ 1 Tag Nettoeinkommen` / « نهار = الدخل ديال نهار » |

**Elle :** à b21 + 0,5 elle s'essuie les yeux (`reachR` vers son visage, 0,4 s).
**Vie :** rayon, poussière, plaque, carafe, juges qui clignent.
**Caméra :** `[{ at: "b21", s: 1, cx: 500, cy: 920 }, { at: "b21+0.1", s: 1.03, cx: 570, cy: 920, d: 3.0, ease: "lin" }]`.
**Vérité :** jamais de billets, jamais de montant en euros, jamais le chiffre sans « beantragt » ; aucune
peine de prison, même « encourue ». **Affiche :** image de fin.

---

### Scène 18 — La balance 1 : Organisationsverschulden (b22 · 68,00 → 72,44)

**À comprendre :** le tribunal ouvre le bloc « coupable » : presque tout son poids vient de l'organisation — de l'administration.
**Lieu :** mise en place « balance » (scène 1) + console et poids en pointillés + chariot. **Entrée :** `cut`.
C'est **l'explication juridique en image** (scènes 18 à 20) : plateau gauche = la faute, plateau droit = la peine.

État de départ = fin de l'accroche : `tilt` 13 (gauche en bas), bloc `SCHULDIG` scellé sur le plateau gauche,
plateau droit vide, rouleau « STRAFE » sur 0. Elle : derrière la barre, `sweater`, `cry`.
Sous les plaquettes, deux traductions qui suivent les plateaux (gras 28, contour papier) : « الغلطة » à gauche,
« العقوبة » à droite (`pop` à b22 + 0,2).

| instant | ce qui se passe |
|---|---|
| b22 | sur la console de droite, `D.weight90` tombe en place (`drop`, dist 200) : contour en pointillés, « 90 », étiquette `beantragt` ; ses tirets défilent lentement (il n'est pas posé sur le plateau) ; pastille grise reprise de la scène 17 : `90 Tagessätze · beantragt` / « غرامة بالأيام · طلب، ماشي حكم » |
| `b22@المحكمة` | le chariot `Klinikverwaltung` arrive en roulant par la droite (`m.build "right"`, dist 300, 0,5 s) et s'arrête, plateau centré (760, 1180) |
| `b22@شافت` | un trait de surligneur balaie le bloc : quatre joints apparaissent (`o.seams` 0 → 1 en 0,3 s) ; la pastille grise s'efface ; puis le bloc est remplacé (au même endroit) par 4 `D.slab` empilées + `D.coreWeight` dessus |
| `b22@Organisationsverschulden` | pastille HUD jaune (taille 34) : `Organisationsverschulden` / « غلطة فالتنظيم » ; **le compteur du HUD reprend ses couleurs, se décroche et vole jusqu'au chariot** (0,6 s, § 3.1) où il se pose avec un clac ; `c.kick` 0,06 ; elle lève les yeux |
| `b22@يعني` | tranche ① (`hours`) : elle se soulève, décrit un arc (0,45 s) et se pose sur le chariot ; cible `tilt` 13 → 10,5 |
| `b22@غلطة` | tranche ② (`licence`) ; `tilt` → 8 |
| `b22@كبيرة` | tranche ③ (`twins`) ; `tilt` → 5,5 |
| `b22@فالتنظيم` | tranche ④ (`sheet`) ; `tilt` → 3 ; bande des citations `»gravierendes Organisationsverschulden der Krankenhausverwaltung« — laut Urteil` / « غلطة كبيرة فالتنظيم، ديال الإدارة » |
| `b22@الإدارة` | la plaque `Klinikverwaltung` du chariot reçoit un trait de surligneur ; `c.kick` 0,05 |

Positions sur le chariot : compteur (copie de `D.rollCounter` à l'échelle 0,62, « 63 h » et « + > 12 h »
allumés) y 1130–1180 ; tranches centrées (760, 1117), (760, 1091), (760, 1065), (760, 1039).
À chaque tranche le plateau gauche remonte avec un petit rebond (c'est `tilt(t)`).
**Vie :** fléau, plateaux, tirets du poids « 90 », roulettes du chariot qui finissent de tourner, mouchoir, rayon.
**Caméra :** `[{ at: "b22", s: 1, cx: 560, cy: 900 }, { at: "b22+0.1", s: 1.03, cx: 575, cy: 900, d: 4.2, ease: "lin" }]` — pas de
zoom : tout doit rester dans le cadre (chariot jusqu'à x 880, console jusqu'à x 950 au-dessus de y 742).
**Vérité :** les quatre tranches sont les quatre défauts que le jugement met au compte de l'organisation
(semaine de 63 h + garde ; pas de formation ; deux poches à la fois ; document confus). La signature n'est pas
une tranche : elle vient après les faits. **Affiche :** image de fin.

---

### Scène 19 — La balance 2 : sa faute, petite — et pourtant coupable (b23 · 72,44 → 76,24)

**À comprendre :** ce qui reste sur le plateau est tout petit — elle n'a pas assez bien vérifié la poche — mais ce n'est pas rien : coupable.
**Lieu :** même mise en place, même état. **Entrée :** `cut` (la caméra se décale vers la gauche).

| instant | ce qui se passe |
|---|---|
| `b23@وغلطة` | un cercle jaune se trace autour du petit poids resté seul sur le plateau gauche ; il pulse une fois |
| `b23@صغيرة` | autour de lui, le contour en pointillés de l'ancien bloc (150 × 104) apparaît puis s'efface en 0,8 s (on mesure ce qui a été retiré) ; bande des citations `»am untersten Rand des Denkbaren« — laut Urteil` / « أصغر غلطة ممكنة » |
| `b23@تأكداتش` | pastille HUD (taille 24, ce n'est pas une citation) : `Überprüfung der Blutkonserve: nicht sorgfältig genug` / « ما تأكداتش مزيان من الـpoche » ; au-dessus du petit poids, un pictogramme : une poche et une loupe |
| `b23@داكشي` | le plateau gauche reste un peu plus bas que le droit (`tilt` 3) : une petite flèche jaune le montre |
| `b23@مذنبة` | tampon `k.prop("stamp", …, { text: "SCHULDIG", size: 48, rot: -6 })`, échelle 0,4, `slam` sur la plaquette gauche ; dessous, « الغلطة » devient « مذنبة » (`ttl` 44, `pop`) ; `c.kick` 0,06 ; elle ferme les yeux et hoche la tête |

**Caméra :** `[{ at: "b23", s: 1, cx: 500, cy: 900 }, { at: "b23+0.1", s: 1.03, cx: 520, cy: 900, d: 3.6, ease: "lin" }]`.
**Vérité :** le reproche est celui du jugement (Rn. 36) : un contrôle de la poche pas assez soigneux. Jamais
« elle n'a pas fait le Bedside-Test ». **Affiche :** image de fin.

---

### Scène 20 — La balance 3 : genug bestraft — § 60 (b24 · 76,24 → 80,13)

**À comprendre :** le plateau de la peine se remplit de ce qu'elle a déjà subi ; la balance revient à l'équilibre : il n'y a plus rien à ajouter.
**Lieu :** même mise en place. **Entrée :** `cut`. C'est ici que la balance « revient » et que le tampon
« § 60 » prend la place de la peine.

| instant | ce qui se passe |
|---|---|
| `b24@والمحكمة` | la pastille de la scène 19 s'efface |
| `b24@عاقباتهاش` | le poids « 90 » en pointillés **se dissout** (`o.gone` 0 → 1 en 0,5 s : ses tirets s'écartent et s'effacent), l'étiquette `beantragt` tombe et disparaît : il n'aura jamais été posé |
| `b24@كتبات` | 1er caillou (`crack`, l'effondrement) tombe sur le plateau droit ; `tilt` 3 → 2 |
| `b24@genug` | 2e caillou (`leaf`, les mois) ; `tilt` → 1 ; pastille HUD jaune (taille 36) : `genug bestraft` / « اللي داز عليها كافي » |
| `b24@bestraft` | 3e caillou (`coat`, la blouse qu'elle ne peut plus porter) ; `tilt` → 0 |
| `b24@يعني` → `b24@كافي` | le fléau oscille de moins en moins et **s'immobilise à l'horizontale** (on coupe ici le terme `0,5 · sin(1,3 t)`) |
| `b24@كافي` | tampon `k.prop("stamp", …, { text: "§ 60 StGB", sub: "ABSEHEN VON STRAFE", size: 56, rot: -5 })`, échelle 0,4, `slam` sur la plaquette droite (le rouleau montre toujours 0) ; dessous, « العقوبة » devient « الإعفاء من العقوبة » (gras 30) ; `c.kick` 0,07 ; elle : yeux fermés, `calm`, larmes, les épaules se relâchent |

Les trois cailloux portent les trois images des scènes 14, 15–16 et 16 : le spectateur les reconnaît sans texte.
Image finale, symétrique : à gauche `SCHULDIG` / « مذنبة », à droite `§ 60` / « الإعفاء من العقوبة », le fléau droit.
**Caméra :** `[{ at: "b24", s: 1, cx: 540, cy: 900 }, { at: "b24+0.1", s: 1.05, cx: 540, cy: 900, d: 3.7, ease: "lin" }]`.
**Vérité :** la fatigue et l'organisation ont allégé la FAUTE (scène 18) ; ce qu'elle a subi APRÈS remplit la
PEINE (§ 60). Ne jamais mélanger les deux plateaux. Aucune icône de prison ni de billets.
**Affiche :** image de fin.

---

### Scène 21 — Le dossier : définitif ? on ne sait pas (b25 · 80,13 → 82,08)

**À comprendre :** nous n'avons pas trouvé si ce jugement est définitif.
**Lieu :** le dossier, posé sur le banc. **Entrée :** `cut`.

| couche | objet | position (monde, `cy: 900`) |
|---|---|---|
| 1 | `k.bg()` ; `D.courtRoom` ; plateau du banc (bois) à partir de y 1020 | — |
| 2 | `D.deskLamp` + son cône + `m.dust` dans le cône | pied (190, 1060), tête (300, 640) |
| 3 | `D.caseFile` | centre (540, 800) : x 260–820, y 580–1020 ; étiquette `.tw` 24, trois lignes : `Amtsgericht Köln` / `613 Ls 3/12` / `Urteil vom 16.05.2012` ; dessous, `.tw` 18 `Rechtskraft:` à (330, 936), suivi d'**une fenêtre à rouleau** (le même rouleau que la plaquette « STRAFE » de la balance : `D.rollCounter` à UNE fenêtre large, 190 × 64, sans unité ni étiquette) centrée (600, 930) |
| 4 | `D.loopTag` (« ؟ ») | il tombera au bout de sa ficelle sur la sangle du dossier : point d'attache (770, 640), rond centré (770, 720) |

**Déroulé.** b25 : dossier `drop` (dist 300) · `b25@وما` : le rouleau « Rechtskraft » se met à tourner : flou
(`blur 1`), cinq traits qui défilent, la petite roue crantée tourne — aucune valeur lisible · `b25@لقيناش` :
pastille HUD (taille 30) `Rechtskraft nicht veröffentlicht` / « ما معروفش واش نهائي » · `b25@واش` : le rouleau
ralentit, on croit qu'il va claquer comme le « 0 » de la peine (deux à-coups de 4 px, 0,15 s)… et il repart,
flou · `b25@نهائي` : le `D.loopTag` « ؟ » **tombe au bout de sa ficelle** sur la sangle (`drop`, dist 140) puis se
balance (`m.pend`) : c'est la seule boucle de l'épisode que les ciseaux ne coupent pas. Le rouleau tourne encore
quand la scène se termine.
**Vie :** lampe (`m.sway` 1°, 3 s), poussière dans le cône, sangle du dossier, rouleau flou, pendule du « ؟ ».
**Pourquoi cette forme (26.11.2026) :** la première version (cadre de tampon vide en pointillés, loupe qui
cherche, tampon qui redescend sans frapper, « ? ») était, au cadre près, la scène « définitif ? » d'AKTE 05 et
d'AKTE 07, et son tampon arrêté en l'air celui d'AKTE 06 (« vorbestraft ») et d'AKTE 08 (le cachet). Ici la
réponse est donnée par les deux objets de l'épisode : le rouleau qui ne s'arrête pas et l'étiquette « ؟ ».
**Caméra :** `[{ at: "b25", s: 1, cx: 540, cy: 900 }, { at: "b25+0.1", s: 1.03, cx: 540, cy: 900, d: 1.8, ease: "lin" }]`.
**Mention :** jamais « rechtskräftig », jamais « définitif ». **Affiche :** image de fin.

---

### Scènes 22–24 — LA RÈGLE (b26–b28 · 82,08 → 90,50)

Une même page pour les trois scènes : à droite **la carte de la règle**, qui se remplit ligne après ligne (à
la fin elle est complète : c'est l'image à capturer) ; à gauche, l'illustration animée, qui change à chaque
scène. Compteur et onglet absents ; ruban « القاعدة » dans la bande HUD (§ 3.3).

**Fixe (monde) :**

| objet | position | contenu |
|---|---|---|
| fond | `k.bg()` + cases de planning en filigrane (opacité 0,2) | — |
| `D.ruleCard` | x 500–930, y 430–980 | en-tête (y 430–530) : `.tw` 17 sur deux lignes `Vor JEDER Konserve ·` / `am Patienten · persönlich` ; arabe gras 26 : « قبل كل poche · حدا المريض · براسك » · ligne ① (y 530–608) : bracelet, « ديالو؟ » (gras 34), `.tw` 15 `für diesen Patienten?` · ligne ② (608–686) : étiquette de poche, « الـgroupe؟ », `Blutgruppe passt?` · ligne ③ (686–764) : numéro, « النمرة؟ », `Präparatenummer = Begleitdokument?` · ligne ④ (764–884) : carte de test, `Bedside-Test` (Kalam 28), « ديرو نتا ولا قدام عينيك، » / « وكتب النتيجة » (gras 26, deux lignes) · pied (884–980) : `.tw` 20 `auch im Notfall` + « حتى فالاستعجال » (gras 26) ; `.tw` 13 `Richtlinie Hämotherapie 2023 · 4.9.2 · 4.9.2.1` |
| `D.lessonCard` (jaune) | x 500–900, y 1010–1250 | titre `.tw` 15 `aus diesem Fall` + « درس من هاد القصة » (gras 26) ; ⑤ une seule poche, « poche وحدة فكل مرة » (gras 30) ; ⑥ stylo barré, « عمرك ما تسني على » / « formation ما درتيهاش » (gras 26) |
| illustration | x 110–480, y 560–1300 | voir chaque scène |

#### Scène 22 — au lit, toi-même : le nom, le groupe, le numéro (b26 · 82,08 → 85,50) — entrée `swipe`

Illustration : `TOI` de trois quarts (`facing: 1`), échelle 0,95, à (215, 1300) ; un coin de lit
(`D.bedFront04` partiel, x 330–480, y 1120–1300) d'où sort un avant-bras avec `D.wristband` à (400, 1150) ;
dans sa main gauche d'écran UNE poche (`D.bloodBag`, échelle 0,5, vers (150, 1040)) ; dans sa main droite
d'écran le document (`D.docSheet` × 0,2, vers (300, 1060)). Au-dessus de sa tête : `.tw` 18 `am Patienten`
(290, 815) et « حدا المريض » gras 28 (290, 852).

| instant | ce qui se passe |
|---|---|
| `b26@قبل` | la carte de la règle tombe en place (`drop`, dist 400) ; la carte jaune glisse de la droite avec sa ligne ⑤ |
| `b26@كل` | l'en-tête se tape |
| `b26@poche` | une poche — une seule — apparaît dans sa main ; la ligne ⑤ pulse |
| `b26@حدا` | le coin de lit et l'avant-bras entrent par la droite (`m.build "right"`, dist 200) ; `am Patienten` / « حدا المريض » |
| `b26@شوف` | ses yeux vont de la poche au document, puis au bracelet |
| `b26@براسك` | trait de surligneur sous `persönlich` et sous « براسك » |
| `b26@السمية` | lien ① : arc jaune en pointillés du bracelet (400, 1150) au document (300, 1040) ; la coche ① se trace |
| `b26@groupe` | lien ② : de l'étiquette de la poche (150, 1065) au document (290, 1070) ; coche ② |
| `b26@والنمرة` | lien ③ : du code-barres de la poche (150, 1090) au document (290, 1100) ; coche ③ ; `c.kick` 0,05 ; il passe à `calm` |

Caméra : `[{ at: "b26", s: 1, cx: 520, cy: 920 }, { at: "b26+0.1", s: 1.03, cx: 560, cy: 920, d: 3.2, ease: "lin" }]`.

#### Scène 23 — le Bedside-Test (b27 · 85,50 → 88,19) — entrée `cut`

Illustration : sa tête en gros plan `ph(235, 720, 1.2, …)` ; `D.bedsideCard` centrée (300, 1080) (x 130–470,
y 970–1190) ; au-dessus, `D.sampleTube` à (300, 890), marqué du pictogramme du bracelet : c'est le sang du
PATIENT qu'on teste, pas celui de la poche.

| instant | ce qui se passe |
|---|---|
| `b27@ودير` | la carte de test tombe en place ; le tube arrive |
| `b27@Bedside` | pastille HUD jaune (taille 36) : `Bedside-Test` / « اختبار الفصيلة حدا الفراش » ; le tube s'incline (35°), deux gouttes tombent (à + 0,2 et + 0,4) dans les champs `Anti-A` et `Anti-B` |
| `b27@تأكد` | les deux champs réagissent (`o.react` 0 → 1) : ici ils restent lisses ; la légende « ● − » s'allume (les grumeaux « + » de la légende montrent à quoi ressemble une réaction) |
| `b27@groupe` | sur la ligne `Ergebnis:` un « = 0 » manuscrit (Kalam 60) s'écrit ; coche ④ sur la carte de la règle |
| `b27@المريض` | le pictogramme du bracelet sur le tube pulse ; trait de surligneur sous `auch im Notfall` |

Lui : ses yeux suivent les gouttes ; `focused` → `calm`. Caméra : `[{ at: "b27", s: 1, cx: 540, cy: 920 },
{ at: "b27+0.1", s: 1.04, cx: 540, cy: 920, d: 2.5, ease: "lin" }]`.
Vérité : « par toi ou sous tes yeux », résultat écrit, même en urgence ; le test confirme le groupe du patient
et ne remplace pas la lecture de la poche (c'est pourquoi les lignes ① ② ③ viennent avant).

#### Scène 24 — ne signe jamais une formation que tu n'as pas faite (b28 · 88,19 → 90,50) — entrée `cut`

Illustration : `TOI` à (215, 1300), trois quarts ; un coin de table (x 330–480, plateau y 1150) ; la feuille
`D.formSheet` (échelle 0,42, centre (400, 1020)) avec `D.pen` en travers.

| instant | ce qui se passe |
|---|---|
| `b28@وعمرك` | la feuille et le stylo glissent vers lui depuis la droite (x 620 → 400, 0,35 s) |
| `b28@1` (le premier « ما ») | il lève la main, paume en avant (`reachR` vers (330, 1010)) ; `angry` léger |
| `b28@تسني` | le stylo frétille vers lui ; il fait non de la tête (`headTilt` −6 → 6 → −6 → 0 en 0,5 s) |
| `b28@formation` | la ligne `☑ Schulung … erhalten` pulse ; la coche se défait : `☐` |
| `b28@درتيهاش` | il repousse : la feuille recule de 60 px et s'incline de 6° ; un grand ✗ manuscrit (encre, 8 px) barre la ligne de signature ; coche ⑥ sur la carte jaune, qui pulse ; `c.kick` 0,06 |

Caméra : `[{ at: "b28", s: 1, cx: 520, cy: 920 }, { at: "b28+0.1", s: 1.03, cx: 555, cy: 920, d: 2.1, ease: "lin" }]`.
**Affiche :** images de fin des trois scènes (la carte de plus en plus remplie).

---

### Scène 25 — Le sang ne revient pas (b29 · 90,50 → 93,34)

**À comprendre :** nous avons pu rembobiner l'histoire ; le sang, lui, ne remonte pas.
**Lieu :** gros plan de la tubulure. **Entrée :** `swipeR` (le geste du rembobinage, une dernière fois).
Aucun texte à l'écran : la phrase est dans le sous-titre.

| couche | objet | position (monde, `cy: 900`) |
|---|---|---|
| 1 | `k.bg()` | — |
| 2 | `D.pageFlip` | x 720–920, y 590–850 |
| 3 | trois petites icônes sur une ligne : la feuille (`D.formSheet` × 0,2), les deux poches (× 0,35), le compteur (`D.rollCounter` × 0,45) | y 1210 ; de x 640 / 760 / 880 vers x 150 / 270 / 390 |
| 4 | `D.bloodBag` (échelle 2,2, niveau 0,67) | œillet (540, 120) ; embouts y 551 |
| 5 | `D.dripBig` | x 485–595, y 560–750 |
| 6 | `D.tube` (large) | (540, 750) → (548, 900) → (530, 1060) → (545, 1250) → (540, 1440) ; rouge jusqu'à y 900 |
| 7 | `D.rewKey` | centre (250, 980) |

| instant | ce qui se passe |
|---|---|
| b29 | une goutte est suspendue dans la chambre ; tout est arrêté |
| `b29@القصة` | la touche « ◀◀ » s'enfonce (`o.down` 1) ; les trois icônes filent de droite à gauche derrière la tubulure, les pages tournent à l'envers, lignes de balayage ; la caméra recule vers la gauche |
| `b29@اللور` | la touche remonte ; les icônes s'effacent ; 0,2 s d'immobilité complète |
| `b29@الدم` | la goutte tombe (0,25 s), une onde dans la chambre |
| `b29@دخل` | le front rouge descend de y 900 à 1440 (0,5 s) |
| `b29@7` (le second « ما ») | la touche s'enfonce de nouveau, deux fois (à + 0 et + 0,2) : le front tressaille de 10 px vers le haut et retombe ; la goutte suivante tremble et ne remonte pas |
| `b29@كيرجعش` | la touche remonte, son « ◀◀ » devient gris ; une dernière goutte tombe ; `c.kick` 0,05 |

**Caméra :** `[{ at: "b29", s: 1, cx: 580, cy: 900 }, { at: "b29+0.1", s: 1, cx: 520, cy: 900, d: 1.0, ease: "lin" },
{ at: "b29@الدم", s: 1.1, cx: 540, cy: 820, d: 1.2 }]` — elle recule, puis s'arrête net à « الدم ».
**Affiche :** image de fin (c'est de cette case que part le dézoom).

---

### Scène 26 — L'affiche-résumé

`st.flash("b29@end+0.15", 0.35, 0.85)` puis
`st.summary({ at: "b29@end+0.15", in: "cut", dezoomAt: "b29@end+0.5", cols: 6, crop: [230, 1310], top: 372, gap: 10, side: 92, freezeAt })`.

- **24 cases, 6 colonnes, 4 rangées** (case 132,7 × 132,7 ; la grille finit à y 933, avant la carte du bas à
  y 960). Lecture de droite à gauche, numéros dans une pastille jaune (socle).
- Les scènes doivent être déclarées dans `story.js` dans l'ordre du temps (le rang d'une case = l'ordre des appels `st.scene`, l'intro ne compte pas).
- `freezeAt` (rang de la case, à partir de 0) : `[ "b1@طبيبة", "b2@end", "b4@سنات", null, null, null, null, null,
  "b12@بالمعلومات", null, "b15@ليه", "b16@end+1.4", "b17@end", "b19@end", null, null, null, null, null, null, null,
  null, null, null ]`.
- En-tête (x 90–990) : ruban `AKTE 04 · 63 ساعة` (540, 312), taille 36, largeur 470 ; pastille `@dr.aguilo`
  (180, 312), taille 20 ; pastille jaune `AKTE 05 · قريبا` (885, 312), taille 18 (numéros par `AKTE_NO`).
- Carte du bas `k.card(110, 960, 760, 300)`, `pop("b29@end+2.7")` : question ÉCRITE (jamais dite), `ttl` 44, deux
  lignes : « شحال من ساعة خدمتي » (490, 1040) et « فأطول سيمانة ديالك؟ » (490, 1098), `wipe rtl` à + 2,8 et + 3,0 ;
  « كتب ليا الرقم فالكومنتير » (gras 40) à (490, 1185), + 3,3 ; flèche du socle vers le bouton commentaire, + 3,5.
  Dans la carte, à gauche (x 150–300, y 1030–1110) : un petit `D.rollCounter` dont les deux rouleaux tournent
  flous, unité « h » — il attend le chiffre du spectateur.
- Le calque HUD global est masqué. `SV_CONFIG.hold = 5.6`.
- Le dézoom part de la case 24 (la tubulure) et recule jusqu'à l'affiche entière (2,2 s).

---

## 5. Les scènes imposées, dans la forme propre à cet épisode

| obligation du skill | où | forme ici |
|---|---|---|
| Accroche très travaillée, sanction dans les 2 premières secondes | scènes 1–2 | la balance en gros plan : le bloc `SCHULDIG` tombe sur un plateau à 0,17 s, le rouleau « STRAFE » claque sur 0 à 0,96 s ; elle sursaute, se tourne, pleure ; puis la salle, le jugement tapé, le tampon § 60 ; puis tout repart en arrière |
| Intro Yassine | scène 3 | sa fiche épinglée sur le tableau de garde ; photo dans un cadre au trait + anneau jaune qui se trace + icône Instagram ; « Yassine » ; « @dr.aguilo » ; cœur et bouton en aimants, animés sur « j'aime » et « abonne » ; logo masqué ; fin du bloc à y ≈ 1210 ; `summary: false` |
| Carte dès qu'une ville est nommée | scène 4 (`b4@Köln`) | Allemagne (Berlin en repère) → le Rhin qui se trace → épingle → silhouette de la cathédrale qui pousse au bord de l'eau |
| Explication médicale en image | scène 12 (+ 23) | la loupe sur la tubulure : les pinces (anticorps du receveur) attrapent les globules A, qui éclatent ; les « grumeaux » ne sont montrés que sur la carte du Bedside-Test, là où on les voit vraiment |
| Explication juridique en image | scènes 18–20 (+ 17) | la balance faute / peine : on retire de la faute ce qui revient à l'organisation ; ce qu'elle a subi remplit la peine ; « 1 Tagessatz ≈ 1 Tag Nettoeinkommen » |
| Scène muette du décès | scènes 13 puis 14 | le patient seul dans son lit, 13:37, la petite roue du compteur s'arrête, tout se fige, « المريض ما عاشش », la couleur s'éteint ; puis, ailleurs et sans date, elle glisse le long d'un pilier. Pas de moniteur |
| Tribunal | scènes 1, 17–20 | la balance en gros plan : elle penche dans l'accroche, elle revient à `b24@كافي` ; un juge + deux Schöffen en civil, vus de face derrière le banc (scènes 2 et 17) |
| Sanction | scènes 2 et 20 | le tampon « § 60 » à la place de la peine ; aucune icône (ni barreaux ni billets) ; la demande du parquet = un poids en pointillés jamais posé |
| Règle | scènes 22–24 | une carte qui se remplit (4 lignes officielles + 2 leçons de l'affaire à part), illustrée par « toi » au lit du patient |
| Affiche-résumé | scène 26 | 24 cases, 6 colonnes ; question écrite « شحال من ساعة خدمتي فأطول سيمانة ديالك؟ » + « كتب ليا الرقم فالكومنتير » ; teaser `AKTE 05 · قريبا` |
| Mentions | — | `laut Urteil` : scènes 2, 7, 8, 10, 12, 14, 15, 16, 18, 19 ; `Rekonstruktion` : scènes 9, 14 (dès b18), 15 ; statut : `Rechtskraft nicht veröffentlicht` (scène 21) |

---

## 6. Repères utilisés

**Vérification faite** : tous les repères de ce document ont été extraits par script et résolus avec la même
règle que le moteur (`engine/runtime.js`, `parseCue` : signes et voyelles brèves retirés, le PREMIER mot du beat
qui CONTIENT le texte demandé) contre `beats.js` et `timings.js`. Résultat : 148 repères « beat@mot », tous
trouvés ; aucun mot manquant. Les instants ci-dessous sont PROVISOIRES (ils changeront avec la voix ; les mots,
non). À refaire après le montage de la voix : `node tools/cuetimes.mjs videos/akte-koeln-transfusion/index.html …`.

| beat | repères (mot visé · instant provisoire en s) |
|---|---|
| b1 | `@مذنبة` 0,15 · `@صفر` 0,96 · `@محكمة` 1,83 · `@على` 2,63 · `@طبيبة` 2,88 |
| b2 | `@مات` 3,95 · `@لا` (1re de 2) 4,91 · `@غرامة` 5,54 · `@end` 5,87 |
| b3 | `@علاش` 5,98 · `@نرجعو` 6,85 |
| i1 | `@ياسين` 8,18 · `@فألمانيا` 8,80 |
| i2 | `@حقيقية` 10,97 |
| i3 | `@j'aime` 14,39 · `@abonne` 14,87 |
| b4 | `@الحكم` 17,45 · `@Köln` 18,07 · `@5` = « 2012 » 18,56 · `@ورقة` 18,85 · `@سنات` 19,14 |
| b5 | `@جوج` 20,54 · `@الدم` 21,45 |
| b6 | `@كلشي` 22,14 · `@2` = « 63 » 22,43 · `@وحدة` 24,01 |
| b7 | `@الإدارة` 24,41 · `@زادت` 25,65 · `@garde` 26,22 · `@7` = « 24 » 26,85 |
| b8 | `@بالليل` 27,78 · `@دازت` 28,16 · `@كثر` 28,73 · `@5` = « من » 28,98 · `@6` = « 12 » 29,17 |
| b9 | `@Assistenzärztin` 30,25 · `@عاد` 31,39 · `@6` = « 9 » 31,92 · `@شهور` 32,07 · `@السبيطار` 32,64 |
| b10 | `@ناقصاها` 33,61 · `@formation` 34,04 · `@Blutführerschein` 35,61 |
| b11 | `@labo` 36,88 · `@عطاها` 37,31 · `@poches` 37,88 · `@بحال` (1re de 2) 38,27 · `@فدقة` 38,84 · `@لجوج` 39,42 |
| b12 | `@وحسب` 40,11 · `@groupe` 40,73 · `@غير` 41,59 · `@فورقة` 41,83 · `@عامرة` 42,16 · `@بالمعلومات` 42,50 |
| b13 | `@21:50` 43,68 · `@علقات` 43,97 · `@poche` 44,30 · `@لمريض` 44,64 · `@6` = « 63 » 45,26 · `@عام` 45,46 |
| b14 | `@groupe` 46,01 · `@2` = « 0 » 46,39 · `@poche` 46,54 · `@4` = « A » 47,06 · `@مريضة` 47,50 |
| b15 | `@من` 48,23 · `@بعد` 48,43 · `@3` = « 10 » 48,86 · `@دقايق` 49,06 · `@بدا` 49,39 · `@كيتقيا` 49,64 · `@ووقفو` 50,02 · `@ليه` 50,35 · `@الدم` 50,59 |
| b16 | `@الأحد` 51,64 · `@13:37` 51,97 · `@end` 52,35 |
| b17 | `@انهيار` 56,38 · `@end` 57,05 |
| b18 | `@وهي` 57,16 · `@الإدارة` 58,07 · `@عيطات` 58,50 · `@عليها` 58,84 |
| b19 | `@وخلاتها` 59,28 · `@تسني` 59,71 · `@ورقة` 60,24 · `@بلي` 60,53 · `@formation` 61,06 · `@وهادشي` 61,72 · `@ماشي` 62,10 · `@end` 62,68 |
| b20 | `@شهور` 63,60 |
| b21 | `@للمحكمة` 65,31 · `@النيابة` 65,74 · `@طلبات` 66,17 · `@7` = « 90 » 67,13 · `@Tagessätze` 67,33 |
| b22 | `@المحكمة` 68,29 · `@شافت` 68,72 · `@Organisationsverschulden` 69,01 · `@يعني` 70,23 · `@غلطة` 70,52 · `@كبيرة` 70,81 · `@فالتنظيم` 71,14 · `@الإدارة` 71,90 |
| b23 | `@وغلطة` 72,44 · `@صغيرة` 73,20 · `@تأكداتش` 73,73 · `@داكشي` 75,17 · `@مذنبة` 75,79 |
| b24 | `@والمحكمة` 76,24 · `@عاقباتهاش` 76,91 · `@كتبات` 77,43 · `@genug` 77,76 · `@bestraft` 78,10 · `@يعني` 78,57 · `@كافي` 79,73 |
| b25 | `@وما` 80,13 · `@لقيناش` 80,37 · `@واش` 80,75 · `@نهائي` 81,33 |
| b26 | `@قبل` 82,08 · `@كل` 82,33 · `@poche` 82,52 · `@حدا` 82,86 · `@شوف` 83,48 · `@براسك` 83,72 · `@السمية` 84,06 · `@groupe` 84,44 · `@والنمرة` 84,96 |
| b27 | `@ودير` 85,50 · `@Bedside` 85,79 · `@تأكد` 86,40 · `@groupe` 86,88 · `@المريض` 87,69 |
| b28 | `@وعمرك` 88,19 · `@1` = « ما » 88,52 · `@تسني` 88,72 · `@formation` 89,25 · `@درتيهاش` 89,96 |
| b29 | `@القصة` 90,74 · `@اللور` 91,51 · `@الدم` 91,84 · `@دخل` 92,37 · `@7` = « ما » 92,61 · `@كيرجعش` 92,81 · `@end` 93,19 |

Formes utilisées en plus : le début d'un beat (`"b7"`), sa fin (`"b16@end"`), des décalages (`"b16@end+1.9"`,
`"b4@ورقة-0.1"`, `"b15@3+0.2"`). Le moins est toujours le signe ASCII « - ».

**Règles à respecter en écrivant `story.js`**
1. **Nombres** : jamais `@63`, `@24`, `@12`, `@9`, `@0`, `@10`, `@90`, `@2012` (lus comme un rang : erreur, ou
   pire, un autre mot sans erreur — `b9@9` tombe sur « السبيطار »). Utiliser les rangs du tableau.
2. **Mots répétés** : `b2@لا` vise le premier « لا » (le second : `b2@6`) ; `b11@بحال` le premier ;
   `b11@جوج` viserait le premier « جوج » (le second s'écrit `b11@لجوج`) ; `b28@1` et `b29@7` sont les « ما » voulus.
3. **Mots contenus dans un autre** : `b7@الإدارة` tombe sur « والإدارة » (le premier mot du beat : c'est voulu) ;
   `b12@groupe`, `b19@formation`, `b11@labo`, `b14@poche` marchent malgré le « الـ » collé.
4. Écrire `b27@Bedside` (sans « -Test ») ; `i3@j'aime` avec l'apostrophe droite.

**Repères qui dépendent d'un choix de l'auteur** (à revérifier dès que `beats.js` change) :

| repère | pourquoi il peut bouger |
|---|---|
| `b1@مذنبة`, `b23@مذنبة` | il peut dire « coupable » |
| `b1@صفر` | il peut dire « zéro » |
| `b2@غرامة`, `b2@لا` | « ذعيرة » / « amende » ; « بلا حبس، بلا غرامة » |
| `b4@5` | si « في 2012 » est coupé (proposition de la relecture), le rang 5 devient « سنات » : supprimer ce repère, garder `b4@Köln+0.5` |
| `b4@سنات`, `b19@تسني`, `b28@تسني` | « وقعات / توقع » |
| `b11@فدقة` | « فمرة وحدة » |
| `b12@عامرة`, `b12@بالمعلومات` | coupe proposée de « عامرة بالمعلومات » → se rabattre sur `b12@فورقة+0.3` et `+0.7` |
| `b17@انهيار` | « طاحت », « crise » |
| `b19@وخلاتها` | « عطاتها ورقة تسني عليها » |
| `b20@شهور` et toute la scène 16 | si b20 passe en légende écrite, la scène 16 disparaît de la voix : la garder muette 1,2 s (repère `b19@end+…`) ou la fondre dans la scène 15 |
| `b26@السمية` | « الإسم » |
| tous les rangs (`@2`, `@5`, `@6`, `@7`, `@3`, `@4`, `@1`) | un mot ajouté ou retiré dans la phrase décale le rang |
| `b16@end+0.2` … `+3.2` | dépendent du silence de 3,2 s (`EXTRA` du montage) : s'il change, recaler les cinq décalages de la scène muette (phrase écrite à + 0,6 ; image 2 à + 1,9 ; glissade de + 2,3 à + 3,2 ; pastille à + 3,2 ; b17 commence à + 3,3) |
| `b8@5` | rang du mot « من » : simple instant d'arrêt ; équivalent `b8@6-0.19` |

---

## 7. Risques et solutions

**R1 — L'héroïne ressemblait à celle d'AKTE 03.** La fiche demandait « queue de cheval châtain » = `ponytail` +
`brown`, la tête exacte de l'Assistenzärztin d'AKTE 03 (même ville, même métier). → Cheveux courts châtains
(`short`), rendus et contrôlés ; plan B `ponytail` + `blond`. **À faire valider par l'auteur.**

**R2 — Assise par terre (scène 14).** Pose hors catalogue. Essayée : `Persona.mix(DEBOUT, AU_SOL, k)` donne une
glissade propre en `scrubs` (hanche de −168 à −17) ; en `coat` un trait du pan de blouse sort sous le sol →
`scrubs` obligatoire. Les bras tendus à mi-course font « zombie » → les bras ne suivent qu'après k = 0,55.
Contrôle : planche image par image de `b16@end+1.9` à `+3.5`, pas 0,1.

**R3 — Bras et portée.** Un bras Persona mesure 112 px (à l'échelle 1) : toute cible plus loin est rabotée et
la main reste dans le vide. Toutes les cibles de ce document sont à moins de 105 px × échelle de l'épaule :
barre de la scène 1 (97), portoir (99), roulette (99), stylo (92). En `facing: -1`, `reachR` est la main de
GAUCHE à l'écran : un essai avec la mauvaise main a donné un bras qui barre le visage. Règle : le bras du côté
de la cible ; dans la scène 11, c'est le crochet de la potence qui se règle sur la main levée
(`Persona.util.rig`), pas l'inverse.

**R4 — Le lit.** Personne allongée = dessin dédié, d'après les retours d'AKTE 03. Ici on l'évite : le patient est
ASSIS dans un lit vu de face (Persona de face, couette devant), même pour le décès (yeux fermés, tête qui
s'incline). Pas de profil couché à dessiner.

**R5 — L'administration vue de dos.** Persona n'a pas de vue de dos. → Aucun personnage : un dossier de fauteuil
(masse sombre) + un avant-bras dédié (`D.suitArm`). Le fauteuil occupe x 690–910 : il reste à gauche de la
colonne des boutons (x > 915).

**R6 — La balance : objets qui suivent les plateaux.** Les plateaux bougent (inclinaison + balancement) ; le
bloc, les tranches, le petit poids, les cailloux, les plaquettes, les tampons et les deux traductions arabes
doivent suivre. → Une seule fonction pure `D.scaleGeom(o)` utilisée par le dessin ET par `story.js` ; les objets
posés sont des nœuds dont la position est `geom(tilt(t)).panL` + décalage. Marges vérifiées au pire cas
(`tilt` 13 + rebond) : bas de la plaquette gauche y 942, traduction jusqu'à y 985, sommet de sa tête y 1041.

**R7 — Bandes fixes et décor.** Trois bandes écran sont réservées (HUD, pastilles, citations). Risques de
recouvrement repérés et réglés à l'écriture : pastille large `Organisationsverschulden` (x 298–782) → rien
au-dessus du pivot de la balance ; horloge de la chambre en haut à gauche et fenêtre en haut à droite, hors de la
bande des pastilles ; loupe (x 195–495, y 540–840) sous la bande, au-dessus de la tête du patient (y 898) ;
insert de la scène 15 (y 550–1050) sous la bande, au-dessus du fauteuil (y 1060). À recontrôler avec `overlapscan`.

**R8 — Colonne des boutons (x > 915, y 980–1650).** Objets proches : elle dans la chambre (bord droit x 904 à
912 après son pas en arrière) ; chariot (x ≤ 880) ; carte de la règle (bord droit x 930 mais elle s'arrête à
y 980) ; carte jaune (x ≤ 900) ; fauteuil (x ≤ 910). Avec la poussée de caméra (×1,03 à ×1,05) ces bords
gagnent 15 à 25 px à l'écran : **contrôler sur planche `--ig` en FIN de scène**, et si un bord touche, décaler
toute la mise en place de 20 px vers la gauche.

**R9 — Le travelling de la scène 6** sort du monde 0–1080 (jusqu'à x 1980). C'est voulu, mais : (a) la case de
l'affiche ne montre que x 0–1080 (la frise noire : bien) ; (b) le fond à points couvre jusqu'à x 2580 (assez) ;
(c) la marche doit être calée sur le déplacement (phase = distance ÷ foulée), sinon elle glisse.

**R10 — Le compteur qui quitte le HUD (scène 18).** Passage d'un calque écran à un objet de la scène. → Formule
`toScreen` (§ 3.1) ; fondu croisé de 0,1 s à l'atterrissage ; si le raccord se voit, solution de repli : le
compteur du HUD s'efface sur place (0,2 s) pendant que sa copie tombe d'en haut sur le chariot.

**R11 — Police « machine ».** Aucune police de machine à écrire dans `engine/fonts/`. → `assets/fonts/` de
l'épisode si une police libre est disponible, sinon Liberation Mono Bold (présente sur cette machine). Sans
police à chasse fixe le compteur et les lignes tapées perdent leur caractère : contrôle au § 8.

**R12 — Coût de dessin.** 63 cases, 9 globules, 14 lames de store : ne rien redessiner à chaque image. Grilles
tracées une fois ; colonnes de cases = 21 nœuds révélés par `wipe` ; loupe : paramètres arrondis au 1/20.

**R13 — Durée.** Scènes très courtes : 5 (2,0 s), 16 (1,9 s), 21 (2,0 s). Elles tiennent une seule idée et peu
de texte ; si la voix les raccourcit encore (< 1,6 s), supprimer d'abord la pastille de la scène 16 (garder la
bande), puis l'à-coup du rouleau de la scène 21 (garder le « ؟ »).

**R14 — Vérité.** Points où l'image pourrait en dire plus que les sources, et le garde-fou : poches sans lettre
(« A » et « 0 » = annotations à côté) ; aucune date sur les scènes 14–16 ; « 90 » toujours en pointillés avec
« beantragt » ; aucun total d'heures ; frise sans jours ; l'héroïne absente des scènes de la règle ; l'autre
patiente = un pictogramme ; pas de moniteur ni de soignant au chevet ; la valeur du groupe illisible sur le
document ; jamais « rechtskräftig ».

**R15 — Ressemblances à surveiller avec la saison.** 06 (mains vues de dessus) : ici une seule manche, de côté.
09 (écran coupé) : aucun partage d'écran. 05 (horloge, nuit bleue) : ici l'horloge n'est qu'un accessoire et la
nuit est en hachures grises. 03 (salle d'audience + Assistenzärztin + tampon) : ici la balance, pas de juge qui
pointe, pas de tampon « HAFTET », pas de lampe à cône.

---

## 8. Check-list de contrôle (pour celui qui construit)

**Avant de coder**
- [ ] `index.html` copié du gabarit : `SV_CONFIG = { preset: "instagram", mode: "scenes", hold: 5.6, captions: "karaoke", captionBottom: 320, capSafeRight: 0, capChars: 15, capWords: 4, capTr: false }` ; classe `.tw` ; `motion.js` chargé ; `glossaire-episode.js` (annexe A) ; `assets/portrait.png` copié (hors git).
- [ ] `document.fonts.check('700 40px "AKTE Mono"')` ou, à défaut, Liberation Mono : les chiffres du compteur ont tous la même largeur.

**Après chaque groupe de scènes**
- [ ] `node tools/errcheck.mjs videos/akte-koeln-transfusion/index.html 0.2 5 10 18 21 25 28 32 38 42 44.5 49 52.5 54.8 58.5 61 63.5 66 70 75 79 81 84 87 89.5 92 95` → `SV.error=null`, aucune erreur de page.
- [ ] `node tools/cuetimes.mjs …` sur les repères du § 6 : aucun « absent », aucun « n'a pas de mot n° ».
- [ ] `node tools/planche.mjs videos/akte-koeln-transfusion --beats --ig` : deux images par beat avec les zones Instagram. Regarder surtout la FIN de chaque scène (zoom maximal).
- [ ] Débuts de scène image par image : `--from 0 --to 1.4 --step 0.1` (le bloc, le rouleau) ; `--from 21.8 --to 24.2 --step 0.1` (les 21 colonnes et le compteur) ; `--from 52.3 --to 55.6 --step 0.1` (le décès, la glissade) ; `--from 68.9 --to 72 --step 0.1` (le vol du compteur, les tranches) ; `--from 76.8 --to 80 --step 0.1` (les cailloux, l'équilibre, le tampon).
- [ ] `node tools/overlapscan.mjs videos/akte-koeln-transfusion/index.html 0 99 0.1` : aucun texte sur un autre ; aucune ligne arabe recouverte.
- [ ] `node tools/mouvement.mjs videos/akte-koeln-transfusion` : ≥ 5 % dans chaque scène. Exceptions VOULUES, à noter et non à « corriger » : la fin de la scène 13 (tout se fige), 0,2 s à `b29@اللور`, et l'intro.
- [ ] `python3 tools/ig_overlay.py` sur une capture de fin des scènes 11, 12, 15, 18, 20, 22.

**À l'œil, scène par scène**
- [ ] Accroche : à 0,2 s on lit « schuldig / مذنبة » ; à 1,0 s on lit « Strafe: 0 / العقوبة: صفر » ; aucune icône de prison ni de billets.
- [ ] Le compteur : flou à l'envers (b3–b5), 00 à `b6@كلشي`, 63 à `b6@وحدة`, bloc B à `b7@garde`, « > 12 » à `b8@6`, gris après `b16@end`, envolé à `b22@Organisationsverschulden`. Jamais de somme.
- [ ] L'onglet du jour est masqué dans les scènes 14, 15, 16 ; aucune horloge dans ces scènes.
- [ ] Les deux poches sont strictement identiques ; aucune lettre dessus, nulle part.
- [ ] Rouge seulement sur le sang ; aucune autre teinte ; pas de voile rouge.
- [ ] Personne ne bouge les lèvres ; aucune bulle.
- [ ] Marches : pas de glissade (scènes 2 à reculons, 6, 7, 8, 9) ; bras : aucun bras tendu dans le vide, aucun bras qui barre un visage.
- [ ] Scène 13 : elle n'est pas dans la chambre ; pas de moniteur ; la phrase « المريض ما عاشش » reste lisible ≥ 1,2 s.
- [ ] Scène 20 : image finale symétrique, fléau à l'horizontale et immobile.
- [ ] Scène 21 : le rouleau « Rechtskraft » ne s'arrête jamais sur une valeur ; le « ؟ » reste accroché (aucun coup de ciseaux) ; ni tampon, ni cadre de tampon vide, ni loupe (ce sont les scènes « définitif ? » d'AKTE 05 / 07).
- [ ] Affiche : 24 cases, grille finie à y 933, question en deux lignes dans la carte, flèche vers le bouton commentaire, `AKTE 05 · قريبا` entre x 90 et 990.
- [ ] Aucun nom de personne ni d'hôpital, nulle part (fiches, plaques, étiquettes, dossier).

---

## Annexes

### A. `glossaire-episode.js` (traductions sous les mots allemands DITS, pour les sous-titres)

```js
window.GLOSSARY = Object.assign(window.GLOSSARY || {}, {
  "Köln": "كولونيا",
  "Blutführerschein": "« رخصة » ديال الدم",
  "Organisationsverschulden": "غلطة فالتنظيم",
  "genug bestraft": "اللي داز عليها كافي",
  "Bedside-Test": "اختبار الفصيلة حدا الفراش",
  "schuldig": "مذنبة", "SCHULDIG": "مذنبة",          // la série a « مُدان » (masculin) : ici c'est une femme
});
```
Déjà dans `serie/glossaire.js` : `Assistenzärztin` (« طبيبة مقيمة »), `Tagessätze` (« غرامة بالأيام »). Ne pas
traduire les mots français de la voix (poche, garde, formation, groupe, labo, j'aime, abonne).

### B. Chaînes arabes NOUVELLES (absentes de `scenario.md`) — à faire valider par l'auteur

Toutes les autres chaînes arabes de ce document viennent mot pour mot de `scenario.md` (texte dit ou tableau
des pastilles).

| chaîne | où | pour traduire |
|---|---|---|
| « مصاريف المحاكمة عليها » | scène 2, bande | `Die Angeklagte trägt die Kosten des Verfahrens` |
| « كان مريض بزاف من قبل » | scène 12, bande | `schwerst vorgeschädigt` |
| « المسؤولية » | scène 15, bande | `Verantwortung` / `… überzubürden` |
| « حتى فالاستعجال » | carte de la règle | `auch im Notfall` |
| « درس من هاد القصة » | carte jaune | `aus diesem Fall` |
| « العقوبة: صفر », « الغلطة », « العقوبة », « سيمانة وحدة », « 9 شهور », « مع 21:50 », « 63 عام », « فدقة وحدة », « ديال مريضة أخرى », « مازال ناقصاها », « حدا المريض », « قبل كل poche · حدا المريض · براسك » | plusieurs | ses propres mots, repris de la voix (à relire quand même) |

### C. Textes allemands qui ne sont PAS des citations (annotations de la série, sans guillemets à l'écran)

`Strafe: 0`, `SCHULD`, `STRAFE`, `WOCHE`, `NOTDIENST 24 h`, `DIENSTPLAN`, `TEAM`, `1 Woche`, `9 Monate`,
`Schulung: Transfusion`, `LABOR`, `≈ 10 min`, `Erklärung`, `☑ Schulung »Transfusion« erhalten`, `Verantwortung`,
`Staatsanwaltschaft:`, `1 Tagessatz ≈ 1 Tag Nettoeinkommen`, `Überprüfung der Blutkonserve: nicht sorgfältig
genug`, `Rechtskraft:`, les sous-lignes de la carte de la règle, `aus diesem Fall`, `am Patienten`.
Citations exactes (entre « » … « » à l'écran, avec `laut Urteil`) : celles de la bande des citations et des
pastilles `mehr als 12 Stunden`, `nervlich zusammengebrochen`, `unzutreffende Erklärung`,
`Organisationsverschulden`, `genug bestraft`, `gegen 21.50 Uhr`, `quasi identisch`, `gleichzeitig`.

### D. Ordre d'écriture conseillé pour `story.js`

1. Socle du gabarit (kit, carte, aides Persona, HUD de base, affiche) ; constantes `AKTE_NO`, `TITRE = "63 ساعة"`, `QUESTION`.
2. Distribution (§ 1), fonction `f(t)` de la fatigue, `tilt(t)`, `toScreen`.
3. Calque HUD global (§ 3) — le tester seul sur toute la durée avant d'écrire une scène.
4. Les trois mises en place fixes en fonctions (`setBalance(c, m, o)`, `setSalle(c, m, o)`, `setChambre(c, m, o)`).
5. Les scènes dans l'ordre du temps, contrôle par planche après chaque groupe (1–5, 6–10, 11–14, 15–21, 22–26).

### E. Écarts avec la fiche de `SAISON-2.md`, tous imposés par le dossier ou par une règle supérieure

| fiche | ici | raison |
|---|---|---|
| queue de cheval châtain | cheveux courts châtains | même tête que l'héroïne d'AKTE 03 (R1) |
| le technicien du dépôt de sang (dégarni, lunettes) | une ombre derrière une vitre | le jugement dit « das Labor », sans personne |
| l'administrateur en costume avec son stylo | un fauteuil de dos, une manche, le stylo | personne n'est décrit ; « Rekonstruktion » |
| la juge | un juge (homme) + deux Schöffen | Schöffengericht ; « der Richter » selon la presse |
| compteur 00 → 63 h → + 12 h | 00 → 63, puis bloc « + > 12 h » séparé | jamais de total (« 75 » n'existe pas) |
| planning lun → dim dont les cases se noircissent | frise de 63 cases-heures sans jours | la répartition par jour est inconnue |
| guichet du dépôt de sang (frigo, lampe, passe-plat) | passe-plat, frigo aperçu derrière la vitre | on ne sait pas où ni comment les poches ont été remises |
| (scène muette de la série : moniteur) | pas de moniteur : la roue du compteur s'arrête | forme propre à l'épisode ; aucun bip à inventer |

---

## Écarts de construction

Ajouté pendant la construction (le storyboard ci-dessus n'est pas modifié). Chaque ligne : ce qui est fait autrement, et pourquoi.

| où | storyboard | construit | pourquoi |
|---|---|---|---|
| `D.courtRoom`, `D.corridor04` (sol) | sol de y 1300 à 1420 | même défaut (1420), mais `o.bottom` peut le prolonger et le bas se fond dans le papier (`o.fade`, 70 px) au lieu d'une bande nette | dans la scène 1 la sellette descend à y 1570 et la barre à 1600 : avec un sol arrêté à 1420 les pieds flottaient sur le papier. Scène 1 : `bottom: 1610` |
| scène 2, carte tapée | lignes non placées ; tampon « § 60 » à (650, 1238) | lignes à y −56, −22, 14, 46 dans le repère de la carte (centre (530, 1175)), « laut Urteil » à (192, −84), tampon à (130, 88) dans le même repère (≈ (660, 1258) en monde) | mesuré : le tampon (≈ 108 × 69 à l'échelle 0,4) posé à (650, 1238) recouvrait « wird abgesehen. » |
| scène 5, `D.tube` | tubulure dessinée au trait normal | `o.k: 1.4` (tuyau, chambre et roulette ×1,4) | à côté des poches ×1,5, la tubulure à ×1 paraissait un fil |
| HUD, `D.dayTab` | texte `.tw` 26 px | le texte rétrécit s'il est trop long (« ◀◀ » + « Mi · 16.05.2012 » = 21 px) ; `o.blur` / `o.streak` pour « les chiffres défilent à l'envers, flous » | à 26 px, « ◀◀ » + 15 signes sortait de l'onglet de 262 px |
| scène 2, `D.folder` | « le juge tourne une page du dossier » | `o.page` 0 → 1 : une feuille qui pivote sur le pli | aucune autre pièce ne permettait le geste |
| scènes 3 et 6, cadre alu | « reflet qui glisse sur le cadre alu (8 s) » | `D.glint` : petit reflet dessiné une fois, seul son transform bouge | redessiner tout le tableau à chaque image coûterait trop cher |
| `D.slab` (scène 18) | plaque grise 140 × 26 | 150 × 26, même matière sombre que le bloc | les quatre tranches remplacent le bloc `SCHULDIG` (150 × 104) au même endroit : sans saut de taille ni de couleur |
| `D.pebble` `leaf` (scène 20) | « feuille de calendrier » | une feuille d'arbre (celle qui tombe de la fenêtre des saisons, scène 16) | calendrier et feuillets sont réservés à AKTE 06 (`SAISON-2.md`, objets réservés) |
| `D.loupeSmall` (scène 10) | dans la loupe R 70, `Blutgruppe:` en `.tw` 26 | le texte grossi est ajusté au verre (≈ 17 px à R 70 ; 26 px à partir de R 105) | 11 signes à 26 px = 172 px, plus large que le verre (140 px) |
| `D.coatHung` / `D.coatRack` (scène 16) | blouse de y 660 à 1000 (340 px) | blouse ≈ 141 × 240 (`o.s` 0,72), patère de 600 | à 340 px, la blouse faisait les trois quarts de la médecin assise à côté (Persona : de l'épaule au genou ≈ 190 px) |
| `D.weight90` (scènes 18–20) | étiquette à ficelle `beantragt` | elle pend SOUS l'extrémité droite de la console (x ≈ 840–942, y 714–740) ; à part (`D.stringTag`) pour tomber à `b24@عاقباتهاش` | partant vers la gauche, elle passait dans les chaînes du plateau droit (x ≤ 833) |
| `D.rack`, ancre `grip` (scène 9) | `[-110, -20]` | `[-130, -3]` : poignée au ras du socle, à gauche | depuis son épaule (x 345, échelle 1,05), la cible du storyboard (455, 925) est à ≈ 105 px (portée 118) ; `[-110, -20]` donnait (470, 900), à 141 px : bras raide dans le vide |
| `D.loupe` (scène 12) | globules « découpés » par la loupe | aucun clipPath : les globules entrent par le haut en s'estompant près du bord, le cerclage recouvre le reste | un id de clipPath serait recopié en double par l'affiche-résumé |
| `D.licenceCard` (scène 8) | carte 300 × 180 | pochette 300 × 180 (x 490–790, y 950–1130), carte 244 × 146 dedans | la taille donnée est celle de la place : la pochette la remplit |
| `D.clock04`, `D.nightWindow`, `D.seasonWindow`, `D.bedFront04`, `D.labHatch`, `D.blinds`, `D.cart` | — | `o.part` sépare le fixe (tracé rough) de ce qui bouge à chaque image ; ordre des nœuds dans l'en-tête de `decor-2.js` | coût de dessin (R12) ; les cadres de fenêtre sont des anneaux : le nœud « frame » se pose sur le nœud « sky » sans le cacher |
| `decor-2.js`, `decor-3.js` | — | ils attendent `D.kit` (file `D._later`, relancée par `decor.js`) | l'outil d'essai charge `decor-2.js` avant `decor.js` (tri alphabétique) : sans ce garde, rien ne se dessinait |

**Placements à régler au montage des scènes** (mesurés le 26.11 sur des compositions à l'échelle : décors + Persona aux coordonnées
ci-dessus, caméra de la scène × 1,06 ; à revérifier sur les planches `--ig`) :

| scène | storyboard | à faire | pourquoi |
|---|---|---|---|
| 7 | appliques à (340, 640) et (620, 640) | les mettre entre les portes : (415, 640) et (695, 640) | portes de x 200 à 350, 480 à 630, 760 à 910 (huisserie ± 10) : les appliques tombaient sur les huisseries |
| 7 | voyants d'appel à (200, 660) … | utiliser les ancres `calls` de `D.corridor04` (au-dessus de chaque porte, y 578) | y 660 est sur l'imposte vitrée |
| 7 | horloge à (850, 560) | (850, 520) | à 560, son bord (y 610) touche le haut de l'huisserie de la porte 3 (y 604) |
| 8 | en-tête `TEAM` (635, 580) et zoom ×1,12 (cy 990) à `b10` | effacer l'en-tête avant le zoom, ou ne pas l'écrire | après le zoom il passe à l'écran y ≈ 453, dans la bande des pastilles (pastille `Blutführerschein`) |
| 10 | feuille x 400–900 | contrôler la fin de scène sur planche `--ig` | son bord droit arrive à l'écran x ≈ 905–921 |
| 11 | elle à x 835, bras levé vers le crochet | rien au dessin | la poche (x 712–800) frôle son visage (x ≈ 790) tant que le bras est levé ; elle recule à 858 à `b13@عام` |
| 12 | zoom ×1,12 (cy 990) à `b15@بدا` ; horloge (165, 500), `≈ 10 min` (255, 470) | descendre le zoom (cy ≥ 1040) ou effacer `≈ 10 min` avant | après le zoom ils passent à l'écran y ≈ 300–330, sous le compteur du HUD ; le bord de la loupe touche aussi l'horloge |
| 15 | fauteuil x 690–910, y 1060–1470 | décaler la mise en place d'≈ 30 px vers la gauche | en fin de scène (×1,03 + respiration) son bord droit arrive à l'écran x ≈ 935 (colonne des boutons) ; son piètement passe sous y 1470 (décor sans importance) |
| 16 | patère : pied (160, 1300) | pied à x ≥ 240 | la blouse (± 70) sortait par le bord gauche rogné (écran x ≈ 40) |

**Scènes 1 à 6 (étape « scènes, partie 1 », 27.11)** :

| scène | storyboard | construit | pourquoi |
|---|---|---|---|
| 1 | pastilles `schuldig` et `Strafe: 0` à y 452 (écran) | à y 398 | fléau penché de 13°, son bout droit (écran y ≈ 529) touchait « العقوبة: صفر » |
| 1 | ligne de la bande HUD en `.tw` 22 | `.tw` 21, 0,032 s par signe | à 22 px les 45 signes finissaient à x 706, sur l'onglet du jour (x 700) |
| 2 | carte tapée centrée (530, 1175) ; tampon à (130, 88) dans la carte | carte centrée (530, 1130) ; tampon à (142, 98) | avec la poussée ×1,03 le bas de la carte arrivait à l'écran y ≈ 1363, sur la bande des citations ; le tampon touchait « wird abgesehen. » |
| 2 | frappe à b2 + 0,25 ; surligneur à `b2@مات` | frappe à b2 + 0,45 (la carte a fini de tomber) ; surligneur à max(`b2@مات`, fin de la ligne 2) | dans le minutage provisoire `b2@مات` tombe avant que la ligne 2 soit tapée : le surligneur aurait souligné du vide |
| 2 | « علاش؟ » à (540, 490) | ligne de base y 510 (le mot occupe ≈ 420–520), surligneur centré y 478 | au coup de zoom de `b3@علاش`, le haut de la plaque « § » touchait le mot |
| 3 | cœur `pop("i3")`, bouton `pop("i3+0.1")` | cœur à i3 + 0,05, bouton à i3 + 0,15, entrée en « aimant » (chute de 60 px + petit rebond) | la pastille 2 s'efface à i3 (0,15 s), son arabe est à la hauteur du cœur |
| 4 | cathédrale (760, 1130), feuille centrée (500, 1010), caméra finale cx 500 | cathédrale (720, 1130), feuille (440, 1010), caméra finale cx 530 | en fin de travelling la cathédrale entrait dans la colonne des boutons (écran x ≈ 957) ; à 680 elle cachait « Berlin » |
| 5 | « ؟ » à (540, 720) | même place, ficelle de 123 px : il pend de la barre | avec la ficelle par défaut il flottait dans le vide |
| 5 | niveaux non précisés pour la poche de gauche | gauche 1 ; droite 0,67 → 1 | à la fin les deux poches sont strictement identiques |
| 6 | gouttière du tableau non placée | gouttière sous le bloc de garde (x ≈ 1376–1676) ; le feutre jaune y roule quand le bloc claque | sinon le feutre roulait hors du cadre ; bandeau, grille et date tombent ENSEMBLE (décalés, ils se chevauchaient pendant la chute) ; deux notes épinglées ajoutées au tableau (vie : un coin qui se soulève) |
