# AKTE 09 — « غير سكران » (Friedrichshafen, 2023 · jugement de 2026) — STORYBOARD

Numéro 09 provisoire (`AKTE_NO = "09"`, `AKTE_NEXT = "10"`, `TITRE = "غير سكران"`). Texte figé : `scenario.md`,
`beats.js` (31 beats + intro de 3), `timings.js` (minutage **provisoire**, 99,4 s). Dossier de vérité : `recherche.md`.
Ce document se suffit à lui-même : celui qui construit `decor.js`, `story.js` et `index.html` n'a rien d'autre à
décider. Quand ce document et la fiche de `SAISON-2.md` se contredisent (ce qu'elle « voit », l'âge et le statut de
la médecin, le décès « sur le lit des urgences », les parents à l'aube, la bruine, la procureure), **c'est ce
document qui vaut** : il suit le dossier relu (liste des écarts en annexe E).

Tout est calé sur des repères de mots : quand la vraie voix arrivera, `timings.js` changera et rien ne sera à
réécrire. Les secondes données ici sont celles du minutage provisoire, pour se repérer.

Essais déjà faits et regardés (dossier `out/essais/`, hors git) : `essai_cast.png` (les douze personnages et les
poses difficiles), `essai_diptyque.png` (géométrie des trois positions de la ligne avec les zones Instagram),
`essai_carte.png` (le lac). Les corrections tirées de ces captures sont déjà dans les chiffres ci-dessous
(liste au § 7, « ce que les essais ont montré »).

---

## Conventions (valables pour tout le document)

### Repère : monde = écran

Cet épisode est fait de **cadres fixes**. Dans `story.js` :
`const st = Stage.create(sv, { view: { s: 1, oy: 0, breathe: 0 } })` (et non `1.06 / -20 / 0.04` comme les autres
épisodes). Sans `c.camera`, la caméra est l'identité : **une coordonnée de ce document = un pixel de la vidéo**
(1080 × 1920). Conséquence utile : les zones Instagram se lisent directement —

- contenu important entre **x 90 et 990** (décor entre 110 et 960), **y 270 et 1470** ;
- rien d'important pour **x > 915 quand y est entre 980 et 1650** (colonne des boutons) ;
- logo `@dr.aguilo` : x ≈ 790–980, y 222–268 ; barre de progression : x 100–700, y 236–250 ;
- sous-titres : boîte ≈ y 1492–1600 (jusqu'à ≈ 1455 quand un mot allemand porte sa traduction dessous) :
  aucun texte ni objet porteur de sens sous y 1440, seulement du sol.

Seules les scènes « plein cadre » (les deux cartes S4 et S17, le tribunal et la règle S19 à S28) ont une poussée lente
(`c.camera([{ at: début, s: 1, cx: 540, cy: 960 }, { at: début+0.1, s: 1.025, cx: 540, cy: 960, d: durée, ease: "lin" }])`).
Aucun travelling, aucun zoom de caméra, **aucun `c.kick`** dans tout l'épisode. Deux `c.shake` seulement
(S1 : la plume qui barre la lettre, puis la grille ; S6 : la fracture) et un troisième, léger, à l'alarme (S15).

### Le diptyque : trois calques et une ligne

Toutes les scènes du diptyque (S1, S2, S3, S5 à S16, S18, S29) ont la même charpente, écrite UNE fois
(`const dp = diptyque(c, { ref, … })`, § 3) :

```
c.cam
 ├─ dp.haut   <g clip-path = polygone du haut>      ← tout ce qui est « من برا »
 │    ├─ dp.gH   (Node)  contenu du haut, accroché à la ligne
 │    └─ lavis du haut (transition d'encre)
 ├─ dp.bas    <g clip-path = polygone du bas>       ← tout ce qui est « من الداخل »
 │    ├─ dp.gB   (Node)  contenu du bas (la coupe du crâne, ou le prétoire de l'accroche)
 │    └─ lavis du bas
 └─ dp.sur    <g> sans découpe : objets qui traversent la ligne (feuille « Rat », autocollant qui tombe)
c.hud  ← la ligne, l'horloge, les deux étiquettes-refrain, les pastilles, les mentions (jamais découpés)
```

- Les polygones de découpe sont recalculés à chaque image (`c.tick`) à partir de `LY(t)` et `PENTE(t)` :
  haut = (0, 262) (1080, 262) (1080, yD) (0, yG) ; bas = (0, yG) (1080, yD) (1080, 1480) (0, 1480), avec
  `yG = LY − 540·tan(PENTE)` et `yD = LY + 540·tan(PENTE)` (pente positive = **bout gauche plus haut**).
- Un nœud se range dans une moitié soit par son paramètre `parent` (`c.sk(…, dp.gH.g)`, `c.put(…, dp.gH.g)`,
  `pp(x, y, s, fn, dp.gH.g)`), soit — pour `m.obj`, `m.dust`, `m.rays`, `m.ripple`, qui n'ont pas de parent — par
  `dans(dp.gH, noeud)` = `dp.gH.g.appendChild(noeud.g)`.
- Tout ce que crée le kit dans une moitié reçoit le même parent : `k.chip(…, { parent: dp.gH.g })`,
  `k.prop(kind, x, y, s, fn, 0, dp.gH.g)`, `c.text(…, dp.gH.g)`, `k.ar(…, dp.gB.g)`. Les pastilles A et B, les
  mentions, l'horloge et les étiquettes-refrain vont dans `c.hud`.
- **Le haut est accroché à la ligne** : `dp.gH` porte `translateY = LY(t) − ref`, où `ref` est la position de la
  ligne pour laquelle la scène est dessinée. Quand la ligne monte, le haut monte avec elle comme un store, et
  le cadre du haut (y 262) rogne ce qui dépasse.
- **Le bas suit la ligne** : la coupe du crâne se recentre et change d'échelle (formule au § 3.4).

### Coordonnées du haut : (x, h)

Pour les décors du haut, ce document écrit **(x, h)** : `h` = hauteur au-dessus de la ligne, en pixels
(`y écran = LY − h`). Le sol est toujours à **h 80**. Ainsi une même mise en place (le box des urgences) vaut pour
les trois positions de la ligne :

| position | `LY` | on voit du haut | ce qui tient dans le cadre |
|---|---|---|---|
| « dehors » (le haut domine) | 1030 | h 0 → 760 | tout : personnages debout, pastilles au-dessus des têtes |
| « égal » | 870 | h 0 → 600 | personnages debout jusqu'à l'échelle 1,15 (tête à h 80 + 437 × échelle) |
| « dedans » (le bas domine) | 640 | h 0 → 370 | **bande basse seulement** : le garçon allongé, le lit, le bas du rideau — jamais un personnage debout |
| escamotée (le scanner) | 262 | rien | le bas occupe tout l'écran |

Règle de composition qui en découle : **aucun personnage debout n'est à l'image quand la ligne monte en position
« dedans »** (il serait décapité par le cadre). Les passages vers « dedans » se font toujours sous un lavis
d'encre qui cache le haut pendant qu'il se vide (transition `ENCRE-HAUT`).

### Fonctions du temps (une seule horloge pour les deux récits)

Déclarées une fois au début de `SV_BUILD`, fonctions **pures du temps absolu** `t` (jamais de `t − début de
scène`) : deux scènes qui se suivent dans le même lieu lisent la même valeur, donc les `cut` sont invisibles et
la moitié qui ne change pas ne saute jamais. Écrire `piste(clés)` : la valeur va de la précédente à `v`, à
partir de `at`, en `d` secondes (`ease` par défaut `inOut`).

| fonction | sens | clés (repère → valeur · durée) |
|---|---|---|
| `LY(t)` | y de la ligne | 0 → 870 · `b5-0.10` → 1030 (0) · `b7-0.06` → 640 (0,50) · `b8-0.15` → 1030 (0,45) · `b11-0.06` → 640 (0,50) · `b12-0.15` → 1030 (0,45) · `b15-0.06` → 640 (0,50) · `b16-0.08` → 870 (0,45) · `b17-0.45` → 1030 (0,40) · `b18@Scanner-0.10` → 262 (0,70) · `b19@end+0.1` → 870 (0) · `b31-0.3` → 870 (0) |
| `PENTE(t)` | degrés, bout gauche vers le haut | 0 · `b11@كيتجمع` → 1,5 (1,2, `out`) · `b15@كيضغط` → 4 (0,6, `back`) · `b16` → 5,5 (linéaire jusqu'à `b17-0.45`) · `b17` → 6 (0,3) · `b18@Scanner-0.10` → 0 (0,7) · `b19@end+0.1` → 6 (0) · `b19@end+2.15` → 0 (0,8, `out`) · `b31-0.3` → 0 (0). S'y ajoutent : un souffle `0,2·sin(1,1·t)·VIE(t)` de `b5` à `b19` ; un tremblement `0,35·sin(2π·6·t)` de `b17@دارو` à `b18@Scanner-0.10` |
| `HEURE(t)` | heure montrée par les aiguilles | `b5` → 0,33 · `b8-0.10` → 2,08 (0,6) · `b12-0.10` → 3,0 (0,5) · `b16` → 6,0 (linéaire jusqu'à `b16@end+0.25`) · `b18@Scanner+0.4` → 6,5 (0,4) |
| `ENC(t)` | quantité d'encre, 0 → 1 | 0 · `b11@الدم` → 0,04 (0,25) · `b11@كيتجمع` → 0,22 (1,2, `out`) · `b12` → 0,42 (linéaire jusqu'à `b15-0.30`) · `b15@كينعسش` → 0,62 (0,8) · `b15@كيضغط` → 0,78 (0,5, `back`) · `b16` → 0,95 (linéaire jusqu'à `b17-0.45`) · `b17` → 1,0 (0,4) |
| `FRAC(t)` | la fracture se trace, 0 → 1 | `b7@الراس` → 1 (0,25) |
| `PLEIN(t)` | l'encre remplit toute la boîte | `b19@end+0.3` → 1 (1,9, `inOut`) ; **remis à 0 à `b20`** (S29 remontre la tache de 6 h, pas le noir) |
| `LUM(t)` | lampe d'examen du box, 0 → 1 | `b9` → 1 · `b10@المراقبة+0.1` → 0,45 (0,5) · `b12-0.10` → 0,7 (0,4) · `b13` → 0,85 (0,3) · `b15-0.30` → 0,4 (0,3) · `b17-0.30` → 1 (0,25) · `b31-0.3` → 0,6 (0) |
| `AGITE(t)` | agitation du garçon | 0 · `b12@شافتو-0.3` → 0,7 (0,4) · `b13` → 0,35 (0,4) · `b15-0.30` → 0,12 (0,3) · `b16` → 0 (linéaire jusqu'à `b16@end`) |
| `PEEL(t)` | coin de l'autocollant qui se décolle | 0 · `b17@دارو` → 0,5 (0,6) · `b18@دارو` → 1 (0,3) · `b31-0.3` → 0 (0) · `b31@5` → 0,45 (0,4) |
| `VIE(t)` | 1 = tout respire, 0 = tout est figé | 1 · `b19@end+2.05` → 0 (0,9) · `b20` → 1 (0) |

### Entrées de scène (quatre seulement)

| nom | réglage du moteur | ce qu'on voit |
|---|---|---|
| `cut` | `in: "cut", inDur: 0` | changement sec à l'intérieur d'un même lieu ; grâce aux fonctions du temps, la moitié qui ne change pas ne bouge pas d'un pixel |
| `ENCRE-HAUT` | `in: "fade", inDur: 0.24` + `lavis(c, dp, "haut", t0)` | **la transition signature** : la nouvelle scène arrive avec sa moitié haute noyée d'encre ; comme elle entre en fondu, on voit l'encre monter de la ligne sur l'ancienne image ; puis l'encre est bue par la ligne et découvre le nouveau haut. Le bas, la ligne et l'horloge, identiques dans les deux scènes, ne bronchent pas. Haut caché ≈ 0,3 s : toujours placé sur une pause de la voix |
| `ENCRE-TOUT` | `in: "fade", inDur: 0.3` + `lavis(c, null, "tout", t0)` | même chose sur tout le cadre (entrée et sortie du diptyque) |
| `fade` | `in: "fade", inDur: 0.45` (0,6 pour S19) | fondu simple : **de la scène muette à la règle, il n'y a plus d'encre dans les transitions** (la nuit est finie) ; l'encre ne revient qu'une fois, pour la dernière image (S29) |

`lavis(c, dp, zone, t0)` — un nœud `D.lavis` (§ 2 A7) posé au-dessus du contenu de la zone, dans son groupe
découpé : de `t0` à `t0 + 0,24` cinq taches grandissent depuis cinq points de la ligne (x 120, 330, 540, 760,
960 ; rayon 0 → 900) jusqu'à couvrir la zone ; plein jusqu'à `t0 + 0,30` ; puis la nappe redescend dans la ligne
jusqu'à `t0 + 0,78` (`out`), son bord ondule (8 lobes, ± 6 px, 2 Hz), six gouttes en retard laissent une
traînée de 0,2 s. Zone « tout » : la nappe couvre y 262–1480 et se retire vers le bas du cadre.

### Trois emplacements fixes pour les textes (calque `c.hud`)

- **Mention** (vérité) : étiquette blanche, coin haut gauche, x 104 → (selon le texte), y 282–316, `Kalam` 22,
  encre `#55524B`. Une seule à la fois : « laut Presse » ou « laut Presse · Rekonstruktion ». **Masquée dans les scènes
  « dedans »** (le haut n'y affirme rien ; le bas porte « Schema »), dans S4 et dans les trois scènes de la règle
  (tableau du § 3.5).
- **Pastille A** (une seule pastille à la fois) : `k.chip(allemand, arabe, 680, 322, taille, { parent: c.hud })`,
  largeur ≤ 420 (x 470–890), arabe détaché dessous (ligne de base ≤ y 392). Derrière elle, le décor du haut ne
  met que du mur. Dans les scènes plein cadre : centre (540, 330), largeur ≤ 560. Quand un médaillon occupe le
  haut droit (S12, S14), la pastille A n'est pas utilisée : le médaillon porte sa propre plaque.
- **Pastille B** (scènes « dedans ») : centre (400, 706), largeur ≤ 560 (x 120–680), arabe dessous (≤ y 772).
  La coupe du crâne commence à y 796.
- **Bande des citations** (scènes plein cadre du tribunal) : allemand `Kalam` 22 à y 1378, centré x 520,
  largeur ≤ 760 ; mention à droite ou dessous. Jamais sous y 1440.

« pastille » = `k.chip` du gabarit (arabe gras ≥ 26 px, contour papier, détaché de 20 px). `pop` à l'arrivée
(0,3 s), `hide` (0,15 s) quand la suivante arrive ou à la fin de la scène.

### Typographie, couleurs, parole

- Allemand manuscrit : classe `de` (Kalam gras). Arabe : `ttl` (Lalezar) pour les titres ≥ 40 px, `ar strong`
  (Plex Arabic gras) ≥ 26 px pour les traductions, révélés de droite à gauche (`wipe(…, "rtl")`), contour
  papier (`paint-order: stroke`, 7 px) dès qu'ils sont posés sur un décor.
- Couleurs : encre `#1C1A1C`, gris hachurés du socle (`MAT.grey`, `MAT.mid`, `MAT.white`), papier `#F7F7F1`,
  **jaune `#F8CE4E` réservé à ce qui éclaire ou alerte** : le lampadaire, la lampe d'examen, la lampe-stylo,
  l'autocollant « betrunken », la plaque « CT » quand elle s'allume enfin, le gyrophare, l'épingle de la carte,
  l'étiquette « Verantwortung ». **Aucune teinte** : pas de bleu nuit (c'est AKTE 05), pas de rouge sang (AKTE
  04), pas de voile rouge (`m.alarm` interdit ici). La nuit = hachures d'encre ; le sang = encre noire.
- Parole : `talk: 0` pour tous, sauf quatre moments (§ 1, « Qui parle »). **Une seule bulle** dans l'épisode
  (S12, « ausschlafen lassen », propos rapporté). Aucune bulle pour la médecin : ses mots de la nuit sont inconnus.

### Repères — deux pièges du moteur

- Un repère fait seulement de chiffres est lu comme un **numéro de mot** (0 = premier mot). « 41250 », « 18 »,
  « 2، », « 3، », « 6، », « 3 », « 15 » se visent donc par leur rang : `b1@4`, `b5@6`, `b8@1`, `b12@1`,
  `b17@1`, `b16@0`, `b24@3`, `b25@4`. « بـ15 », « فـ2023 », « فـ2026 », « و20000 », « 8:40 » contiennent autre
  chose que des chiffres : ils se visent par le mot.
- `bN@mot` vise le **premier** mot du beat qui CONTIENT `mot`. Pièges de ce texte : dans b23, « برا » est contenu
  dans « الخبرا » → écrire `b23@3` ; « طبيب » est contenu dans « طبيبة » (b3) et « الطبيبة » (b13) → `b3@5`,
  `b13@6` ; le second « بحال » → `b23@8` ; le second « نهائي » → `b27@8` ; le dernier « سكران » → `b31@5` ;
  «لا» → `b1@1` ; dans b21, « بلا » est contenu dans « قبلاتش » → `b21@6`. Liste complète et contrôlée par script au § 6.

### Mises en place fixes

Cinq lieux reviennent ; chacun a UNE mise en place, écrite comme une fonction de `story.js`, aux coordonnées
identiques à chaque retour : **le prétoire de l'accroche** (S1, S2), **la carte du lac** (S4, S17, rappels en
S7 et S19), **le box des urgences** (S8 à S16, S29), **la coupe du crâne** (S6 à S18, S22, S29), **la salle
d'audience** (S21 à S24).

---

## 0. Direction en dix lignes

1. **Dispositif signature : l'écran coupé en deux par un trait d'encre.** En haut, ce que n'importe qui peut
   voir (« من برا ») ; en bas, ce que personne ne voit (« من الداخل ») : la coupe du crâne. La **tache
   d'encre** — le matériau même de la série — est le saignement : elle perle à la fracture, s'étale sous l'os,
   pousse le cerveau. Une seule horloge, posée À CHEVAL sur la ligne, donne l'heure aux deux moitiés.
2. **La ligne est le personnage.** Elle monte quand la voix dit « من الداخل » (le bas envahit l'écran), elle
   redescend quand on revient dehors, elle **penche** à mesure que la pression monte (0° → 6°, sans graduation
   ni chiffre), elle s'épaissit, elle tremble à 6 h, elle disparaît en haut de l'écran au scanner (les deux
   récits n'en font plus qu'un), et dans la scène muette elle redevient horizontale : **c'est elle, la ligne
   plate du moniteur.**
3. **Grammaire de caméra : aucune.** Cadres fixes, pas de travelling, pas de zoom, pas de `kick`. Le mouvement
   vient de la ligne, de l'encre et du décor qui vit. Les gros plans sont des **médaillons** (un cadre rond dans
   le cadre : la tempe, la feuille, le collègue), jamais un recadrage qui coupe un personnage.
4. **Transition signature : le fondu par l'encre** (`ENCRE-HAUT`, `ENCRE-TOUT`). L'encre monte de la ligne,
   noie la moitié qui change, puis la ligne la boit. Elle ne sert que pendant la nuit. De la scène muette à la
   règle, les transitions sont de simples fondus lents : le jour est revenu. L'encre ne revient qu'une fois,
   pour la dernière image.
5. **Teinte : aucune.** Noir d'encre et jaune. Le jaune n'est jamais décoratif : c'est une lumière ou une
   alerte (lampadaire, lampe, autocollant, plaque « CT », étiquette « Verantwortung »). La plaque « CT » reste
   éteinte toute la nuit, sous les yeux du spectateur, et ne s'allume qu'à 6 h 30.
6. **L'étiquette « betrunken »** est un autocollant jaune qui tombe sur le lit — de nulle part : ni de la main
   de la médecin, ni de celle du collègue — et recouvre à moitié le mot « Verdacht » qu'elle venait d'écrire.
   À la dernière image, il se décolle et le mot reparaît.
7. **Ton : le plus lent et le plus triste de la saison.** Aucun effet, aucun méchant. La médecin doute, écrit
   son doute, demande conseil ; la soignante et l'anesthésiste sont dessinés neutres, avec respect (ils n'ont
   pas été poursuivis). Trois heures passent dans un box où des ombres glissent derrière le rideau. Musique :
   un violoncelle seul, deux registres (le grave = le dedans), des silences.
8. **Vérité à l'écran** : « laut Presse » dès la première image et sur chaque citation ; jamais « laut
   Urteil » ; « Schema » sur la coupe ; « Rekonstruktion » sur l'échange avec le collègue ; l'horloge
   **s'efface** pendant les deux phrases dont l'heure n'est pas publiée ; pas de médicament, pas de perfusion,
   pas d'alarme du moniteur (non sourcée), hélicoptère « alarmiert » posé au sol, décès sans heure ni lieu,
   parents seulement au tribunal, « nicht rechtskräftig (Stand 05.05.2026) ».
9. **Différent des cinq autres** : 04 = compteur à rouleaux, travelling latéral, rembobinage, rouge ; 05 =
   hôpital en coupe, silhouettes minuscules, caméra ascenseur, bleu nuit, lune ; 06 = bureau vu de dessus,
   mains, machine à écrire ; 07 = écran de téléphone ; 08 = lettres-objets, frontal, zooms secs. Ici : diptyque
   horizontal, ligne vivante, encre, médaillons, aucun mouvement de caméra, aucune teinte, et la seule nuit de
   la saison sans lune ni ciel bleu (brume et papillons de nuit dans le cône du lampadaire).
10. **Différent d'AKTE 02 / 03** : pas de cellule ni de barreaux pleins (ici une grille en POINTILLÉS, le
    sursis), pas de bloc opératoire ni de réanimation à fleurs et rideau de fenêtre, pas de plaque « Im Namen
    des Volkes », pas de balance, pas de loupe reliée (médaillon à trois ronds), pas d'ange, pas d'escalier de
    la règle, pas de scotch sur la bouche. Tribunal vu de la rue à l'aube puis de derrière le banc des parents ;
    sanction = grille en pointillés qui s'ouvre + quatre billets en quatre fois ; règle = la feuille de
    surveillance qu'on remplit. Tous les décors sont redessinés dans `decor.js` (`window.EpDecor`).

---

## 1. Distribution

Douze personnages Persona, tous neufs. Contrôle fait contre AKTE 02 (femme `longwave` foncé ; homme `short`
foncé `stubble` ; sage-femme âgée `bun` gris à lunettes ; juge `crown` gris à lunettes ; expert gris à lunettes
et barbe), AKTE 03 (`ponytail` châtain ; `bob` foncé à lunettes ; `oldman` gris moustache en blouse ;
`shortcurly` châtain femme ; homme châtain barbu ; juge `oldwoman` `bob` gris à lunettes ; `bald` gris à
lunettes ; `bun` blond) et contre les storyboards de 04, 05, 06, 07 (la juge de 07 est `bun` foncé **à
lunettes, en robe** : ici le chignon foncé est celui de la médecin, sans lunettes, en blouse, un stylo planté
dedans). Vu sur `out/essais/essai_cast.png`.

```js
const DOC = { look: "woman",    hair: "bun",        hairTone: "dark",  glasses: false,                     seed: 901 };  // la médecin de garde
const GAR = { look: "man",      hair: "shortcurly", hairTone: "blond", beard: "none",  outfit: "sweater", seed: 902 };  // le garçon, 18 ans
const PFL = { look: "oldwoman", hair: "short",      hairTone: "dark",  glasses: false, outfit: "scrubs",  seed: 903 };  // la soignante de nuit
const ANA = { look: "oldman",   hair: "short",      hairTone: "grey",  beard: "none",  glasses: true,  outfit: "scrubs",  seed: 904 };  // l'anesthésiste consulté
const VEL = { look: "man",      hair: "short",      hairTone: "brown", beard: "moustache", glasses: true, outfit: "casual", seed: 905 }; // le cycliste en vélo électrique (PAS court foncé mal rasé : c'est le père d'AKTE 02)
const JUG = { look: "woman",    hair: "shortcurly", hairTone: "grey",  glasses: false, outfit: "robe",    seed: 906 };  // la juge
const PRO = { look: "man",      hair: "short",      hairTone: "brown", beard: "none",  glasses: true,  outfit: "robe",    seed: 907 };  // le procureur
const AVO = { look: "man",      hair: "shortcurly", hairTone: "dark",  beard: "short", glasses: false, outfit: "robe",    seed: 908 };  // l'avocat de la défense
const EX1 = { look: "man",      hair: "short",      hairTone: "blond", beard: "moustache", glasses: false, outfit: "suit", seed: 909 }; // expert (légiste)
const EX2 = { look: "oldman",   hair: "crown",      hairTone: "dark",  beard: "none",  glasses: true,  outfit: "sweater", seed: 910 };  // expert (neurologue)
const MER = { look: "woman",    hair: "bob",        hairTone: "grey",  glasses: false, outfit: "sweater", seed: 911 };  // la mère
const PER = { look: "man",      hair: "crown",      hairTone: "brown", beard: "moustache", glasses: false, outfit: "suit", seed: 912 }; // le père
```

**Leçon de l'essai** : la tenue `jacket` de Persona (haut blanc ouvert) se lit comme une blouse de médecin.
Elle n'est donc portée par PERSONNE ici ; seule `DOC` porte du blanc (`coat`), et seulement la nuit.

| Clé | Rôle (ce que dit le dossier) | Tenue par scène | Accessoire signature (dessin de `decor.js`, suit une ancre Persona) | Échelle |
|---|---|---|---|---|
| `DOC` | la médecin de garde aux urgences. **Ni « jeune », ni « Assistenzärztin », ni âge** (la presse se contredit). Elle doute, écrit son doute, demande conseil | nuit (S2 haut, S8, S9, S12, S15, S16, S28) : `coat` · chez elle et au tribunal (S1 haut et bas, S2 bas, S19, S20, S21, S24) : `sweater` | **le stylo jaune planté dans son chignon** (`D.styloChignon`, ancre `top`), qu'elle tire pour écrire en S9 ; la nuit seulement. Lampe-stylo jaune en main en S8 et S15 (`D.lampeStylo`) | box 0,95 (derrière le lit) · prétoire de l'accroche 0,82 · couloir 0,82 · rue 0,62 · hall 1,0 · salle 0,72 · sanction 1,05 · règle 1,1 |
| `GAR` | le patient, 18 ans. Aucune description dans les sources : boucles blondes et sweat = choix de dessin | Persona seulement en S5 (à vélo, à genoux, titubant) : `sweater` + capuche (`D.capuche`, ancre `neck`). **Partout ailleurs : `D.gisant`** (dessin dédié de personne allongée, § 2 A10) | sa capuche ; les joues rouges (`blush: true`) tant qu'il est debout ; en S18, son sweat plié sur la chaise | S5 0,8 · `D.gisant` 1,0 (0,85 dans le pré, 0,5 sur le brancard de l'ambulance) |
| `PFL` | la soignante de nuit : remarque l'agitation à 3 h (S11), déclenche l'alarme avec la médecin à 6 h (S15). Non poursuivie : neutre, attentive | `scrubs` | montre-broche jaune sur la poitrine (`D.montreBroche`, ancre `chest`) | 0,95 |
| `ANA` | l'anesthésiste « expérimenté » consulté (S2 en médaillon, S12 en médaillon puis en personne, S28 en médaillon). Non poursuivi : **aucune grimace, aucun geste désinvolte** ; il vient, regarde, dit non, parle | `scrubs` | masque chirurgical baissé autour du cou (`D.masqueCou`, ancre `neck`) | médaillon : tête × 1,25 · en pied 0,95 |
| `VEL` | l'autre cycliste (S5 : la collision ; S6 : il le retrouve dans le pré) | `casual` | casque de vélo (`D.casque`, ancre `top`) + petit sac à dos (`D.sacDos`, ancre `chest`, dessiné derrière) | 0,8 (S5) · 0,72 à genoux (S6) |
| `JUG` | la juge du Amtsgericht (une femme ; composition du tribunal inconnue : **elle est seule sur l'estrade**) | `robe` | ses lunettes de lecture à la main ou posées sur le dossier (`D.lunettesLecture`) ; un stylo-plume (`D.plume`) | accroche 0,8 · salle 0,8 · S23 1,1 · médaillon S28 tête × 0,8 |
| `PRO` | le procureur (un homme), figurant muet en S21 | `robe` | une pile de dossiers devant lui | 0,72 |
| `AVO` | l'avocat de la défense, figurant muet en S21, à côté de `DOC` | `robe` | — | 0,72 |
| `EX1` | expert, le légiste (S22) | `suit` | deux photos identiques qu'il tient puis accroche | 0,9 |
| `EX2` | expert, le neurologue (S22) | `sweater` | marteau à réflexes (`D.marteauReflexes`) avec lequel il montre | 0,9 |
| `MER` | la mère, partie civile. **On ne la voit qu'au tribunal** : de dos en S21 (`D.dos`), de face en S24 | `sweater` | foulard clair (`D.foulard`, ancre `neck`) ; un mouchoir | S24 0,95 |
| `PER` | le père, partie civile ; de dos en S21, de face en S24 | `suit` | il tient le bras de sa femme ; mouchoir à carreaux dans la poche | S24 0,95 |
| — | Yassine (intro) | sa photo `assets/portrait.png` | polaroïd scotché | — |
| — | figurants sans visage : l'ambulancier (S7), les ombres qui passent dans le couloir (S14) | `D.silhouette` (aplat hachuré, aucun trait de visage) | — | 0,6 à 0,85 |

Non dessinés, volontairement : l'interniste de garde ; les ambulanciers et le médecin urgentiste avec un visage ;
un frère ou une sœur ; l'avocat des parents ; le médecin de Ravensburg ; la direction de la clinique.

Réglages communs : `blink: rnd(blinkAt(t, k))` avec un `k` par personnage (DOC 1, GAR 2, PFL 3, ANA 4, VEL 5,
JUG 6, PRO 7, AVO 8, EX1 9, EX2 10, MER 11, PER 12) ; respiration `.on(breathe(k))` ; mains en moufle ; aucune
tête Persona pivotée (le garçon couché est toujours `D.gisant`).

### Poses essayées (valeurs mesurées avec `Persona.util.rig`, échelle 1 ; multiplier par l'échelle)

Hauteur 437 ; centre de la tête (0, −363) ; bouche (0, −322) ; épaules (± 35 femme / ± 43 homme, −287) ;
mains au repos (± 41 / ± 49, −166) ; hanche (0, −168).

| pose | paramètres | mesures | où |
|---|---|---|---|
| debout derrière le lit, penchée | `PP.stand` + `view: "three-quarter", facing: -1, torsoLean: -8, headTilt: 10, look2: [0.5, 0.8], reachR: [-95, -215], bendR: 1` | main droite d'écran à (−95, −215) : au-dessus de la tête du garçon | `DOC` S8, S15 |
| main tendue « non » | `PP.holdHandOut` (`armR: [40, -8]`) | main à (106, −188) | `DOC` S1 ; `ANA` S12 (avec `facing: -1`) |
| à genoux, tourné vers la gauche | `PP.kneel` + `facing: -1` | hauteur **361** ; tête (−27, −287) ; mains (−91, −136) et (−119, −158) | `VEL` S6 à 0,72 → 260 px : tient sous h 370 |
| à genoux, tête basse | `PP.kneel` + `facing: 1, headTilt: 14, torsoLean: 16, expr: "pain"` | idem | `GAR` S5 après la chute |
| il titube | `PP.walk(phase)` + `facing: -1`, `headTilt: 9·sin(2,1·t)`, `torsoLean: 4 + 7·sin(1,6·t)`, cadence 1,1 cycle/s | — | `GAR` S5 |
| à vélo | `view: "side", facing: ±1, torsoLean: 22, legR: [70, -95], legL: [28, -42], headTilt: -8`, `reachR` / `reachL` sur le guidon (`bendR: 1, bendL: 1`) ; origine du personnage = selle + 168 × échelle vers le bas (la hanche est sur la selle) ; pédalage : `legR[0]` et `legL[0]` échangent 70 ↔ 28 à 1,4 Hz (deux états + interpolation) | sur l'essai : mains au guidon, dos penché, lisible | `GAR`, `VEL` S5 |
| elle écrit | `view: "front"`, `armL: [-20, 105]` (tient la planchette), `armR: [22, -100]` ± 4° à 7 Hz, `headTilt: 8`, `look2: [0, 0.9]` | mains vers (± 2, −225) | `DOC` S9 |
| elle porte la lettre | `view: "three-quarter", facing: 1`, `reachL: [40, -230]`, `reachR: [78, -236]`, `bendL: -1, bendR: 1` | lettre centrée sur (60, −240) | `DOC` S20 |

À vérifier à la construction, sur capture : le côté des bras en trois-quarts (`facing: -1` : la main « R » est
à gauche de l'écran), et que le bras qui porte ne croise pas l'autre.

### Qui parle (`talk: rnd(talkAt(t, a, b), 10)`)

| qui | de → à | forme |
|---|---|---|
| `JUG` | `b2@وتحكم` → `b2@الحبس` | elle lit le jugement ; pas de bulle |
| `ANA` | `b14@وقال` → `b14@end` | **la seule bulle** : « ausschlafen lassen » + « خليوه ينعس », mention « laut Presse » |
| `EX1` puis `EX2` | `b23@قالو` → `b23@فالراس`, puis `b23@بحال` → `b23@end` | pas de bulle : le négatoscope parle |
| `JUG` | `b24@2` → `b24@end` ; en médaillon : `b30@قالتها` → `b30@زميل` | discours indirect : citation en bande, pas de bulle |
| tous les autres, tout le temps | — | `talk: 0` — en particulier `DOC` (ses mots sont inconnus) et `PFL` |

### Arc des expressions

| beats | `DOC` | autres |
|---|---|---|
| b1 (haut) | `worried`, regarde la lettre `look2: [-0.8, 0.2]` → à `b1@1` `focused`, bras tendu « non », `headTilt: -4` → à `b1@4` `worried`, le bras retombe, elle détourne les yeux `look2: [0.6, 0.4]` | — |
| b2 (bas) | `worried`, `look2: [0.7, -0.2]` (vers la juge) → `shock` à `b2@بـ15` (la grille tombe : recul de 14 px en 0,2 s) → `worried` + `sweat` à `b2@الحبس`, la tête va de gauche à droite (`look2` x : 0,7 → −0,6 → 0,7), une main traverse les tirets puis revient à sa bouche → `cry`, `tears` 0 → 1 en 0,6 s à `b2@sursis+0.2`, tête qui tremble (± 3°, 6 Hz) | `JUG` : `focused`, lit, lève les yeux vers elle à `b2@فألمانيا` |
| b3 (haut) | `worried`, se tourne vers le médaillon à `b3@سولات` (main ouverte vers lui) → `calm` à `b3@الخبرة+0.2` (la feuille revient : elle est rassurée) | `ANA` (médaillon) : `neutral` → hoche la tête une fois à `b3@عندو` (`headTilt` 0 → 6 → 0 en 0,5 s) |
| b3 (bas) | `cry` adouci (`sad`, `tears: 0.6`) → lève la feuille devant elle à `b3@وهادشي+0.45`, `worried`, un espoir → `shock` à `b3@حماهاش` (la feuille se déchire) → `cry` | `JUG` : `focused`, immobile |
| b5 | — | `GAR` à vélo : `calm`, `blush`, yeux mi-clos, il zigzague → `shock` 0,2 s au choc → `pain` à genoux. `VEL` : `focused` → `shock` au choc → `worried` |
| b6 | — | `GAR` : `pain` → à `b6@سكران` `calm` + `blush`, sourire flou (`mouth: "smallsmile"`), `headTilt` qui roule → debout à `b6@ناض` → s'éloigne à `b6@ومشى`. `VEL` : `worried`, main tendue vers lui, il le suit des yeux |
| b7 | — | `GAR` = `D.gisant` (œil fermé). `VEL` à genoux : `worried`, lui touche l'épaule, regarde autour de lui (`look2` x : −0,6 → 0,7 → −0,6 en 1,6 s) |
| b9 | `focused`, penchée, la lampe-stylo sur sa tempe ; à `b9@ضربة` relève un peu la tête, `worried` (ce n'est « que » ça ?) | `GAR` : immobile, respire |
| b10 | `worried`, main au menton à `b10@شكات` ; regarde sa tête `look2: [-0.6, 0.8]` à `b10@فالراس` ; tire le stylo de son chignon à `b10@وكتباتها-0.25` et écrit, `focused` ; à `b10@ولكن` lève les yeux vers la porte « CT » `look2: [0.9, -0.1]`, `worried`, 0,5 s ; à `b10@غير` accroche la planchette, `sad` léger ; s'en va à `b10@المراقبة+0.06` en se retournant une fois | — |
| b12 | — | `PFL` : entre `calm` → à `b12@شافتو` s'arrête net, `worried`, main sur la poitrine, `look2: [-0.5, 0.8]` → à `b12@كثر` `worried` + `headTilt: 6` |
| b13 | `worried`, regarde le garçon ; à `b13@سولات` lève la tête vers la droite, main ouverte ; `focused` en attendant | `ANA` (médaillon) : `neutral`, écoute (`headTilt: 4`) |
| b14 | `worried`, le suit des yeux quand il entre ; à `b14@قبلوش` `sad` (épaules : `lift: -2`) ; à `b14@خليوه` regarde le garçon `look2: [-0.5, 0.8]`, `worried` : elle n'est pas convaincue | `ANA` : entre `neutral` ; à `b14@شافو` se penche, `focused`, `look2: [-0.4, 0.9]`, 0,5 s ; à `b14@قبلوش` se redresse, main à plat (`PP.holdHandOut`, `facing: -1`), secoue la tête deux fois (`look2` x ± 0,6) ; à `b14@وقال` `calm`, parle |
| b17 | court (`sweat`), `shock` → `focused` à `b17@الطبيبة` : lampe-stylo sur ses yeux → `shock` à `b17@دارو` → `focused` + `sweat` à `b17@Réanimation` (elle ventile) | `PFL` : `shock` en entrant → `focused`, frappe le bouton d'alarme à `b17@دارو` |
| b18 | `focused` + `sweat`, pousse le lit vers la porte « CT » | `PFL` : `worried`, pousse avec elle |
| b20 | `worried`, petite, marche, lève la tête vers la plaque à `b20@المحكمة` | — |
| b21 | `worried` ; à `b21@قبلاتش` serre la lettre, `focused` (c'est son droit : aucune honte) ; à `b21@جلسة` se tourne vers la porte qui s'ouvre, `worried`, `sweat` | — |
| b22 | assise à sa table, `sad`, yeux baissés ; à `b22@وكيبكيو` ferme les yeux (`expr: "sleep"` 0,4 s) puis `sad` | `MER`, `PER` de dos (voir S21). `JUG` `focused`. `PRO` `neutral`. `AVO` `calm`, penché vers elle |
| b23 | — | `EX1` `focused` → `calm` en parlant ; `EX2` `focused`, hoche la tête à `b23@بحال` |
| b24 | — | `JUG` : `focused`, pose son stylo à `b24@3`, lève les yeux `look2: [0, -0.1]`, `sad` léger à `b24@ضروري` (elle ne triomphe pas) |
| b25 | `worried` → `shock` à `b25@4` (la grille) → grimaces : `worried` ↔ `sad` toutes les 0,35 s, `sweat` → à `b25@sursis` la grille s'ouvre : elle souffle, `sad`, `tears: 0.5` | `MER`, `PER` : `sad`, ne la regardent pas |
| b26 | `sad`, tend les billets un à un, tête basse (`headTilt: 10`) | `PER` : `sad`, main ouverte, ne sourit pas ; `MER` : `cry` léger (`tears: 0.6`), regarde le sol |
| b30 | `worried` → `calm` quand la feuille « Rat » revient (`b30@زميل`) → `shock` léger quand l'étiquette revient en claquant (`b30@كتبقى`) → `focused`, la main sur l'étiquette (`b30@ديالك`) | `ANA` (médaillon) `neutral`, hoche la tête ; `JUG` (médaillon) `focused`, parle |

---

## 2. Inventaire des décors et objets à dessiner (`decor.js` → `window.EpDecor = D`)

Règles d'écriture (celles du gabarit) : chaque fonction dessine dans `g` autour de son ancrage (0, 0), reçoit ses
paramètres animés dans `o` (valeurs arrondies : le moteur ne redessine que si `o` change), renvoie des ancres ;
trait à main levée `U.ctx` / `U.shape` / `U.stroke`, ombre décalée `#D2D2CB` (6–8 px), des détails, jamais de
forme nue. **Performance** : les grands décors sont STATIQUES (`m.obj`) ; tout ce qui change vit dans de petits
nœuds séparés ; l'encre et l'intérieur du crâne sont en tracés nets (`el("path")`, sans rough) parce qu'ils se
redessinent en continu. Aucune fonction d'`UnnaDecor` ni d'un autre épisode n'est reprise.

« Mobile » : ce qui bouge et comment. « Scènes » : où l'objet sert.

### A. Le dispositif signature

| Fonction | Dessin (formes, détails, textes) | Taille · ancrage | Mobile | Scènes |
|---|---|---|---|---|
| A1 `D.ligne(g, o)` | Le trait de séparation : un trait d'encre à la plume, long de 1240, double passe rough (`r: 1.2`), bords un peu baveux (un second trait `#3A3A37` à 35 %, plus large de 4 px). `o.ep` = épaisseur (6 → 11). `o.gouttes` (0..1) : trois petites gouttes qui pendent sous le trait aux x −330, −40, 250 (longueur 0 → 18 px). `o.ecg` : `null`, ou un tracé (voir § 3.1) qui REMPLACE le trait entre x −430 et 430 | 1240 × ≈ 14 · ancrage = milieu du trait | position et rotation par le nœud (`LY`, `PENTE`) ; `ep` = 6 + 5 × `ENC` ; gouttes = `ENC` au-delà de 0,6 ; tracé ECG redessiné à chaque image en S18 | toutes les scènes du diptyque |
| A2 `D.horlogeLigne(g, o)` | Horloge ronde sans chiffres : cadran blanc, double cercle d'encre, 12 graduations (les quarts plus longs), deux aiguilles (heures 20 px, minutes 30 px), axe plein, ombre. `o.h` = heure décimale. `o.fantome` (0..1) : cadran en pointillés, aiguilles grises `#B9B9B3`, un petit « ? » à la place de l'axe. `o.secteur` = [h0, h1] : part de camembert jaune entre deux heures (les « 3 heures ») | r 44 · ancrage = centre | aiguilles = `HEURE(t)` ; saut de 4 % à chaque changement d'étiquette ; `fantome` de `b13-0.1` à `b15-0.30` ; secteur 3 → 6 pendant b16 | S5 à S16 |
| A3 `D.etiquetteTemps(g, o)` | Étiquette blanche à coins ronds, bord d'encre 3 px, petite encoche à gauche (elle s'accroche à l'horloge). `o.de` (Kalam 28) ; `o.ar` facultatif (Plex Arabic gras 26) sur une 2e ligne | 250 × 52 (une ligne) ou 250 × 88 (deux lignes) · ancrage = centre | `pop` à chaque nouveau texte ; suit la ligne | S5 à S16 |
| A4 `D.refrain(g, o)` | Petite étiquette blanche, bord d'encre : « من برا » ou « من الداخل » (Lalezar 40). `o.actif` : surligneur jaune sous le texte ; sinon opacité 0,45 | 160 × 50 / 180 × 52 · ancrage = centre | impulsion (× 1,25 → 1 en 0,35 s) sur le mot-refrain ; suit la ligne | S5 à S16, S22 (dans le négatoscope) |
| A5 `D.crane(g, o)` | **La coupe du crâne, vue de face** (schéma, pas une planche d'anatomie). De l'extérieur vers l'intérieur : contour de la peau (trait d'encre 3,4, œuf renversé, deux petites oreilles, amorce du cou) ; **l'os** = bande épaisse de 22 px, `MAT.grey` hachuré, qui fait le tour de la voûte et se ferme en bas par la base du crâne ; à l'extérieur, à la tempe gauche de l'écran (−262, −60), la **petite marque** hachurée (ovale 16 × 10, la « Prellpunkt » : la seule chose visible du dehors) ; au même niveau, à travers l'os, **la fracture** : un zigzag de 46 px tracé selon `o.frac` (0..1) + deux éclats d'os de 5 px. `o.rigide` (0..1) : cinq petits traits courts à l'intérieur de l'os, côté droit, qui pulsent (« la boîte ne cède pas ») ; `o.epais` : contour de l'os + 1,5 px. Trois petites étiquettes intégrées, affichées seulement si `o.noms` : « Knochen » + « العظم » au-dessus de la voûte, « Blut » + « الدم » à gauche dehors, « Gehirn » + « المخ » dans l'hémisphère droit (une plage sans sillons y est réservée) ; allemand Kalam 26, arabe Plex gras 30, contour papier | 520 × 560 · ancrage = centre de la boîte crânienne | statique, sauf `frac` (S6), `rigide` et `epais` (S13) | S6 à S18, S22 (deux miniatures), S29 |
| A6 `D.dedans(g, o)` | **L'intérieur, redessiné selon `o.enc`** (tracés nets). La dure-mère : trait fin à 5 px sous l'os. Deux hémisphères blancs, 6 sillons courbes chacun, un ventricule en « C » chacun ; la faux (trait vertical du sommet jusqu'à 60 % de la hauteur) ; le tronc en bas. **L'encre** : une lentille noire `#1C1A1C` entre l'os et la dure-mère, à gauche, centrée sur la fracture ; épaisseur 0 → 86 px, hauteur 40 → 300 px ; bord intérieur bombé, baveux (deux liserés `#1C1A1C` à 35 % et 18 %, 6 et 12 px), 8 gouttelettes satellites le long du bord qui tremblent (± 1,5 px, 3 Hz). Le cerveau **cède** : le bord gauche de l'hémisphère gauche suit le bord de l'encre (+ 6 px), son ventricule s'écrase (largeur × 1 → 0,35), ses sillons se resserrent, la ligne du milieu se bombe vers la droite (0 → 34 px), le ventricule droit glisse de la moitié. `o.pouls` (0..1) : le cerveau « bat » de ± 1 px. `o.plein` (0..1) : l'encre envahit toute la boîte, de gauche à droite, front ondulé (découpe sur l'intérieur de l'os) | même repère que A5 | `enc` = `ENC(t)` arrondi au 1/80 ; `pouls` = `0,5 + 0,5·sin(2π·1,1·t)` × `VIE(t)` ; `plein` = `PLEIN(t)` | S6 à S18, S22, S29 |
| A7 `D.lavis(g, o)` | Le lavis des transitions : nappe d'encre `#1C1A1C` à 96 %, avec cinq « flaques » plus sombres et un bord ondulé de 8 lobes ; halo humide de 14 px (`#3A3A37` à 55 %) le long du bord ; 10 gouttelettes au-delà du bord. `o.p` (0..1) = couverture, `o.bord` = "haut" ou "bas" (sens du retrait), `o.w`, `o.h` | selon la zone · ancrage = milieu du bord accroché à la ligne | voir « Entrées de scène » | toutes les transitions d'encre |
| A8 `D.autocollant(g, o)` | **L'étiquette « betrunken »** : rectangle jaune à coins ronds, bord d'encre 4 px, incliné de −8°, un reflet blanc en haut à gauche, un coin (en bas à droite) qui se décolle selon `o.peel` (0..1 : triangle replié gris clair + ombre). Deux lignes : « betrunken » (Kalam 40) et « سكران » (Plex Arabic gras 30) | 230 × 110 · ancrage = centre | tombe du haut du cadre en tournant (−30° → −8°), rebond, `PEEL(t)` ; chute finale en S16 | S12 à S16, S29 ; miniature (× 0,5) en S22 |
| A9 `D.medaillon(g, o)` | Cadre rond « dans le cadre » : disque papier, anneau d'encre 5 px, liseré jaune de 3 px à l'intérieur, ombre ; **queue en trois ronds décroissants** (r 12, 8, 5) vers `o.vers` (comme une pensée, pas une loupe) ; le contenu est dessiné par l'appelant dans un groupe découpé au rayon | r 110 à 125 · ancrage = centre | `pop` (0,3 s) depuis `o.vers` ; léger flottement (± 3 px, 3,2 s) ; `hide` 0,15 s | S2, S8, S9, S12, S14, S28 |
| A10 `D.gisant(g, o)` | **Le garçon allongé — dessin dédié, jamais une tête Persona pivotée.** Profil tourné vers le plafond, tête à GAUCHE : front, nez, lèvres, menton, œil fermé + trois cils, sourcil clair, joue ; **boucles blondes** (contour bosselé, matière `hairBlond`, 6 petites boucles en « c ») qui couvrent l'oreille et s'écrasent sur l'oreiller ; cou court ; col et **capuche** du sweat en bourrelet derrière la nuque, deux cordons ; puis selon `o.tenue` : `"drap"` = couverture gris clair hachurée du haut de la poitrine aux pieds, revers, un bras posé dessus (manche de sweat, main en moufle), bosse des pieds — ou `"dehors"` = corps entier : sweat (matière `mid`), jean foncé, baskets, un bras le long du corps, une jambe à demi pliée. `o.col: "blouse"` remplace le sweat par un col de chemise d'hôpital (S18). Paramètres : `souffle` (0..1 : la poitrine monte de 4 px), `agite` (0..1 : la tête roule de ± 6°, le bras se soulève et retombe, trois plis de la couverture se déplacent, le genou bouge), `marque` (petite marque hachurée à la tempe, 10 × 7, sans sang ni bosse), `masque` (0/1 : masque + ballon de ventilation sur le visage), `teint` (1 → 0 : la joue rose s'éteint). Renvoie `{ tete, tempe, bouche, poitrine, main, pieds, haut }` | longueur 400, hauteur ≈ 110 · ancrage = dessous de la tête, au ras du matelas ou du sol | respiration (période 3,4 s) × `VIE(t)` ; `AGITE(t)` (bruit à deux fréquences 1,3 et 2,9 Hz, valeurs arrondies au 1/12) | S6 (dehors, × 0,85), S7 (× 0,5), S8 à S16, S18, S29 |
| A11 `D.teteProfil(g, o)` | La même tête de profil, seule, pour les gros plans : boucles, œil fermé, la petite marque à la tempe, un bout d'oreiller. `o.cercle` (0..1) : un cercle en pointillés se trace autour de la marque | 220 × 150 · ancrage = centre | cercle tracé en 0,3 s | S8 (médaillon), S22 (deux fois, identiques) |

### B. Accroche et intro

| Fonction | Dessin | Taille · ancrage | Mobile | Scènes |
|---|---|---|---|---|
| B1 `D.entree(g, o)` | L'entrée de son appartement, vue de l'intérieur : mur `#F1EFE8`, plinthe, parquet (6 lames en perspective) ; **porte** à panneaux avec fente à lettres (clapet), judas, poignée ; **patère** à trois crochets où pend sa **blouse blanche** (dessin plat de blouse + stéthoscope) ; **console** avec une lampe de table (abat-jour jaune, halo), une coupelle et des clés | 1000 × 600 · ancrage = coin bas gauche du mur (sol) | le clapet bat (`m.pend` 22°) à t = 0 ; la blouse se balance (`m.sway` 0,8°, 3,4 s, pivot au crochet) ; le halo de la lampe respire | S1 haut |
| B2 `D.lettre(g, o)` | **Le Strafbefehl**, feuille blanche vue de face : en-tête « Amtsgericht » (Kalam 22), titre « STRAFBEFEHL » (Kalam 40, espacé), quatre lignes grises, « Geldstrafe: » (Kalam 24), le montant **« 41.250 € »** (Kalam 72), trait de soulignement à main levée (`o.souligne` 0..1), cachet rond vide en bas à droite, un pli horizontal au tiers. `o.petit` : version tenue en main (150 × 190, seulement le titre et le montant en Kalam 30). `o.plume` (0..1) : le mot « Einspruch » s'écrit À LA MAIN, à l'encre, en travers du bas de la lettre (Kalam 56, incliné de −9°, un seul trait de plume, une goutte au bout du « h ») — **pas de tampon** : le tampon « EINSPRUCH » est dans AKTE 08 (S18) | 300 × 360 · ancrage = centre | glisse, recule, se soulève d'un coin ; soulignement tracé | S1 haut ; S20 (petit) |
| B3 `D.pretoireCoin(g, o)` | Un coin de salle d'audience : mur `#EFEFEA`, lambris hachuré dès le tiers bas, parquet ; un **rayon de lumière** oblique (parallélogramme blanc à 50 %) venu d'une fenêtre hors champ ; l'**estrade** (marche de 60 px) et le **pupitre** de la juge (façade à trois panneaux, dessus débordant) ; sur le pupitre : lampe à abat-jour jaune, micro col-de-cygne, dossier ouvert | 1000 × 600 · ancrage = coin haut gauche (sous la ligne) | le rayon glisse de 12 px en 6 s ; `m.dust` dans le rayon ; halo de la lampe | S1 bas, S2 bas |
| B4 `D.grillePointillee(g, o)` | **Le sursis** : un cadre de grille dont les 5 barreaux et la traverse sont en POINTILLÉS (`stroke-dasharray: 14 12`, encre 6 px), le cadre en trait continu fin ; on voit parfaitement à travers ; en haut, une plaque « 15 Monate » (Kalam 34, `o.plaque`). `o.ouv` (0..1) : la grille pivote comme un portillon autour de son montant gauche (0 → 28°) | 230 × 370 (S1) ou 260 × 430 (S24) · ancrage = bas du montant gauche | tombe (`m.build "drop"`, rebond) ; tirets qui défilent lentement (`stroke-dashoffset`, 12 px/s) : elle n'est jamais « fermée » ; `ouv` en S24 | S1, S2, S24 |
| B5 `D.feuilleRat(g, o)` | Une feuille de bloc-notes : « Rat vom Kollegen » (Kalam 26) et, dessous, « سولات طبيب » (Plex Arabic gras 34) ; coin corné. `o.dechire` (0..1) : elle se déchire en deux moitiés dentelées qui s'écartent et tournent (± 14°) | 190 × 150 · ancrage = centre | glisse le long du pointillé, traverse la ligne (calque `dp.sur`), se déchire, les moitiés tombent | S2, S28 (entière) |
| B6 `D.couloirNuit(g, o)` | Couloir des urgences la nuit : mur `#EEF0EC`, bande de protection grise à mi-hauteur, sol ; deux plafonniers (rectangle + halo) ; une porte battante à hublot à gauche ; un panneau suspendu « Notaufnahme » (plaque blanche, Kalam 26) ; une applique murale à halo jaune. `o.nu` : le mur et le sol seuls, sur toute la hauteur du cadre (mur jusqu'à y 1300), avec la bande de protection | 1000 × 600 (ou 1000 × 1200 avec `nu`) · ancrage = coin bas gauche | applique et hublot : halo qui respire (opacité 0,86–1) ; panneau `m.pend` (idle 0,6°) ; la porte battante oscille de 2° | S2 haut ; fond des trois scènes de la règle (S26, S27, S28) avec `nu` |
| B7 `D.polaroid(g, o)` | **Le polaroïd de l'intro** : carton blanc 480 × 580, ombre, incliné de −3° ; fenêtre carrée 420 × 420 (fond hachuré clair) ; dedans, la photo `assets/portrait.png` découpée en rond (r 186), **anneau jaune** (r 186 → 204, `MAT.yellow`), contour d'encre ; **badge Instagram** dessiné (carré arrondi 92 px, rond jaune, point) accroché en bas à droite de l'anneau ; marge du bas : la place du nom ; **deux bouts de scotch** gris translucide (110 × 38) sur les coins du haut, à ± 35° | 480 × 580 · ancrage = centre | `pop` ; `m.pend` (4° puis 0,5°), pivot au milieu du bord haut ; un coin de scotch qui se soulève (2 px, 2,6 s) | S3 |

### C. Cartes, presse, horloge

| Fonction | Dessin | Taille · ancrage | Mobile | Scènes |
|---|---|---|---|---|
| C1 `D.carteLac(g, o)` | **Le Bodensee** dans un cartouche à coins ronds (bord d'encre 4 px, fond `#FBFBF6`) : le lac (aplat `#E9EEF0`, contour d'encre 3,5, tracé lissé à partir des 33 points de l'annexe F), six traits de vagues, hachure légère des rives ; au sud, une ligne de petites montagnes ; **trois villes** : Friedrichshafen (au bord du lac), Tettnang (un peu dans les terres), Ravensburg (plus au nord) — points gris `#77776F` r 7, noms en Kalam 24 ; `o.actif` = { tett, rav } les passe en encre + halo jaune ; `o.route` (0..1) : pointillé Friedrichshafen → Ravensburg (courbe, tirets 4/12) + un petit point qui avance en tête ; libellé « Bodensee » (Kalam 40) + « بحيرة » (Plex gras 34) sur l'eau. Renvoie `geo(lon, lat)` et les trois positions | 795 × 650 · ancrage = coin haut gauche du cartouche | vagues qui dérivent (`m.drift`, 14 px/s) ; un voilier (`D.voilier`, 40 px) qui tangue (`m.sway` 5°, 2,4 s) ; route qui se trace | S4, S17 |
| C2 `D.miniCarte(g, o)` | Rappel de la carte en vignette : le lac simplifié, l'épingle jaune, un nom (Kalam 20) ; `o.ville` = "Friedrichshafen" ou "Tettnang" (point + nom) | 200 × 150 · ancrage = centre | `pop` ; `m.ripple` sous le point | S7, S19 |
| C3 `D.coupures(g, o)` | Coupures de presse : rectangles de papier journal (colonnes de lignes grises, un titre en pavé noir illisible, bord dentelé), **sans aucun nom de journal**. `o.n` ; `o.dates` = textes à écrire en haut (Kalam 20) ; `o.vide` : rectangle en pointillés avec « ? » | 170 × 130 (S4) ou 80 × 104 (S25) · ancrage = coin haut gauche | tombent une à une (`m.build "drop"`, 0,12 s d'écart) ; en S25 pendent à un fil par des pinces et se balancent (`m.sway` 2°, phases décalées) | S4, S25 |
| C4 `D.helico(g, o)` | Hélicoptère de secours **posé** : cabine arrondie, poutre de queue, patins, croix dessinée au trait (pas de couleur), posé sur un « H » cerclé. `o.rot` : pales (ellipse aplatie + deux traits, alternance de 3 états) | 190 × 110 · ancrage = milieu des patins | pales qui tournent ; la cabine vibre de 1 px ; **il ne décolle pas** | S17 |
| C5 `D.horlogeGrande(g, o)` | La même horloge sans chiffres, en grand (boîtier, 12 graduations, deux aiguilles), `o.h` ; `o.secteur` | r 60 (S17) ou r 105 (S23) · ancrage = centre | aiguilles (interpolées) ; saut de 5 % à l'arrivée | S17, S23 |
| C6 `D.voilier(g)` | Petit voilier au trait (coque + deux voiles) | 40 × 46 | voir C1 | S4, S17 |

### D. La route, le pré, l'entrée des urgences

| Fonction | Dessin | Taille · ancrage | Mobile | Scènes |
|---|---|---|---|---|
| D1 `D.nuit(g, o)` | Le ciel de nuit **en encre** : trois bandes de hachures obliques `#3A3A37` (opacité 0,5 / 0,35 / 0,2 de haut en bas) sur le papier, ligne de collines sombre en bas, trois fenêtres allumées minuscules au loin (8 × 10, jaunes). Ni lune ni étoiles (ciel couvert) | 1000 × `o.h` · ancrage = coin bas gauche | les fenêtres lointaines scintillent (une s'éteint à mi-scène) | S5, S6, S7 |
| D2 `D.lampadaire(g, o)` | Lampadaire de route : mât, crosse vers la droite, lanterne ; `o.on` (0..1) : halo rond jaune r 60 (50 %) et **cône de lumière** jaune (opacité 0,2 × `on`) qui tombe sur la route (ellipse claire au sol) | hauteur 440, crosse 72 · ancrage = pied | `on` : un grésillement au choc (0,6 ↔ 1, deux fois) ; s'éteint en fondu en S19 (le jour) | S5, S6 (lointain, × 0,3), S19 |
| D3 `D.route(g, o)` | Chaussée vue de côté : bande `#DAD9D2` finement hachurée, tirets centraux, bas-côté d'herbe avec touffes, six piquets de clôture reliés par deux fils | 1000 × 130 · ancrage = coin bas gauche | touffes `m.sway` (3°, phases décalées) | S5 |
| D4 `D.arbreNuit(g, o)` | Arbre en masse sombre (hachures serrées), tronc clair | hauteur 330 · ancrage = pied | `m.sway` 1,2°, 4 s | S5, S6, S7 |
| D5 `D.brume(g, o)` | Nappe de brume : trois bandes horizontales de traits courts gris clair, opacité 0,35 | 400 × 60 | `m.drift` (12 px/s) | S5, S6 |
| D6 `D.papillons(g, o)` | Trois papillons de nuit (deux petits triangles + point) | zone 120 × 120 · ancrage = centre de la lanterne | orbites elliptiques (périodes 1,3 / 1,7 / 2,2 s), ailes qui battent | S5 |
| D7 `D.velo(g, o)` | Vélo vu de côté : deux roues r 50 (jante + 8 rayons, `o.rot` les fait tourner), cadre, selle, guidon, pédalier (`o.ped`). `o.ebike` : cadre plus épais, batterie sur le tube, **phare** avec cône de lumière blanc-jaune `#FFF6C9` (opacité 0,3, longueur 260). Renvoie `{ selle, guidon, pedale }` | 250 × 150 · ancrage = point de contact de la roue arrière | roues, pédalier ; bascule au sol (rotation 0 → 84° autour de la roue arrière, 0,3 s) | S5, S6 (couché, × 0,72) |
| D8 `D.casque(g)`, `D.capuche(g)`, `D.sacDos(g)` | Casque de vélo (coque à trois fentes + jugulaire) ; capuche en bourrelet derrière la nuque + deux cordons ; petit sac à dos | 110 × 60 ; 120 × 70 ; 70 × 90 · ancrage = l'ancre Persona qu'ils suivent | suivent la tête / la nuque (comme `capOn` d'AKTE 03 : même mouvement que le corps) | S5, S6 |
| D9 `D.pre(g, o)` | Le pré : bande d'herbe haute au premier plan (24 brins + 5 touffes), sentier en arrière, quelques fleurs fermées ; trace de pas en pointillés (`o.trace` 0..1) et « ≈ 100 m » (Kalam 24) | 1000 × 210 · ancrage = coin bas gauche | brins `m.sway` (4°, 2,8 s, phases décalées) ; la trace se dessine de gauche à droite | S6 |
| D10 `D.urgencesFacade(g, o)` | L'entrée des urgences, de nuit : mur, toit plat, **auvent** sur deux poteaux, **caisson lumineux « Notaufnahme »** (Kalam 40, halo jaune), portes vitrées coulissantes (`o.ouv` 0..1 les écarte ; lumière chaude à l'intérieur, trapèze de lumière au sol), applique murale, trois bornes, une haie | 660 × 540 · ancrage = coin bas gauche | `ouv` ; le caisson grésille une fois ; papillons absents | S7 |
| D11 `D.rtw(g, o)` | Ambulance vue de côté (fourgon-caisse) : cabine, cellule, bande « RETTUNGSDIENST » (Kalam 20, aucun logo), deux roues (`o.rot`), rampe de deux feux sur le toit (`o.feu` : état 0/1/2, **blancs et jaunes**, pas de bleu), porte arrière (`o.porte` 0..1) | 330 × 190 · ancrage = contact de la roue arrière | entre par la gauche (`m.build "left"`, roues qui tournent, 2 px de tangage), feux alternés 4 Hz + petits rayons `m.rays` | S7 |
| D12 `D.silhouette(g, o)` | Figurant sans visage : aplat `MAT.sil` hachuré, tête ronde, corps, `o.pose` = "pousse" / "marche" ; aucun trait de visage | hauteur 300 · ancrage = pieds | marche (deux états) | S7, S14 (ombres) |

### E. Le box des urgences

| Fonction | Dessin | Taille · ancrage | Mobile | Scènes |
|---|---|---|---|---|
| E1 `D.boxMur(g, o)` | Mur du box `#EEF0EC` de h 80 à h 780 ; bande de protection grise à h 250–264 ; trois prises et deux embouts de gaz gris à h 300–330 (x 380–520) ; sol `#E3E5DF` de h 80 à h −90 avec 9 fuyantes ; à droite de x 700, le **renfoncement du couloir** (mur un peu plus sombre `#E6E8E3`, son sol remonte à h 130) | 1000 × 870 · ancrage = (0, ligne) | — (statique) | S8 à S16, S29 |
| E2 `D.rail(g)` + `D.rideau(g, o)` | Rail de plafond (trait 4 px, 9 galets) de x 120 à 690 à h 748 ; rideau replié à gauche : 7 plis verticaux hachurés, ourlet, embrasse à mi-hauteur | rideau 120 × 646 (de h 742 à h 96) · ancrage = haut gauche, sur le rail | `m.sway` 0,7°, 3,8 s, pivot au rail | S8 à S16, S29 |
| E3 `D.lampeExamen(g, o)` | Lampe d'examen sur bras de plafond : platine en haut du cadre, deux segments, tête conique ; `o.lum` : halo + **cône jaune** (opacité 0,13 × `lum`) dirigé vers l'oreiller | bras 190 · ancrage = platine (470, h 760) ; tête en (410, h 580) | `m.pend` à la construction puis idle 0,4° ; `lum` = `LUM(t)` ; `m.dust` (10 grains, cône) dans le faisceau | S8 à S16, S29 |
| E4 `D.scope(g, o)` | Moniteur sur pied à roulettes : écran 130 × 96 (fond `#F4F4EE`), **tracé à l'encre** (pas de vert) qui défile (`o.t`), petit cœur dessiné, un dôme-témoin éteint sur le dessus ; pied à cinq branches. `o.plat` : ligne plate (S18 seulement). **Jamais d'état « alarme »** (non sourcé) | hauteur 290 · ancrage = pied ; centre de l'écran à (0, −225) | tracé qui défile en continu (phase = `t·1,2 mod 1`, 30 pas) ; gelé quand `VIE` = 0 | S8 à S16, S18, S29 |
| E5 `D.brancard(g, o)` | Lit d'observation / brancard : deux paires de roues à frein, piètement en ciseaux, cadre, barrière latérale abaissée, tête et pied de lit, matelas blanc à bords ronds, **oreiller** ; crochet sur la barrière, côté pied (pour la planchette) | 440 × 150 · ancrage = sol, milieu ; dessus du matelas à −116 | roues qui tressautent (± 1,5 px) × `AGITE` ; roule vers la droite en S16 (roues qui tournent) | S8 à S16, S29 |
| E6 `D.planchette(g, o)` | Planchette à pince avec la feuille de la nuit : trois lignes grises, le mot **« Verdacht »** (Kalam 22) et dessous « Beobachtung » (Kalam 16), `o.mot` (0..1 : le mot s'écrit) | 96 × 130 · ancrage = pince (haut, milieu) | `m.pend` (9°, amorti) quand elle est accrochée ; tressaute avec le lit | S9 à S16, S29 ; en main en S9, S28 |
| E7 `D.porteFond(g, o)` | Porte du fond du couloir, à hublot rond, poignée, plinthe ; **plaque** au-dessus : `o.label` (« CT » Kalam 26, « Intensiv » Kalam 22). `o.lum` (0..1) : plaque gris foncé `#55554F` à lettres papier (éteinte) → jaune à lettres d'encre (allumée), hublot sombre → clair. `o.ouv` (0..1) : le battant s'efface, intérieur jaune pâle | 100 × 250, plaque 90 × 40 (CT) ou 104 × 40 · ancrage = bas, milieu | « CT » : un faux départ en S9 (lueur 0 → 0,25 → 0 en 0,3 s), **s'allume en S16** ; « Intensiv » : un liseré jaune qui fait le tour une fois et s'éteint (S12) ; petit voyant qui clignote à 1 Hz sur chaque plaque | S8 à S16, S29 |
| E8 `D.alarmeMurale(g, o)` | Boîtier d'alarme au mur : plaque, gros bouton rond gris cerclé de jaune, et au-dessus un **gyrophare jaune** (dôme). `o.on` : dôme allumé | 44 × 96 · ancrage = centre du bouton (640, h 470) | `on` clignote à 3 Hz + `m.rays` (R 120, jaune, op 0,4) dès `b17@دارو` | S8 à S16 (éteint), S15 |
| E9 `D.ballon(g, o)` | Masque de ventilation + ballon souple + valve ; `o.p` (0..1) : le ballon se comprime | 110 × 60 · ancrage = le masque (sur la bouche du gisant) | pressions à 0,4 Hz | S15, S16 |
| E10 `D.lampeStylo(g, o)`, `D.styloChignon(g)`, `D.masqueCou(g)`, `D.montreBroche(g)` | Lampe-stylo jaune + petit faisceau (`o.on`) ; stylo jaune planté en biais dans le chignon ; masque chirurgical plié sous le menton avec ses deux élastiques ; montre d'infirmière épinglée (rond jaune + barrette) | 60 × 12 ; 54 × 10 ; 70 × 30 ; 18 × 34 · ancrage = l'ancre suivie (main, `top`, `neck`, `chest`) | suivent le personnage | S2, S8, S9, S11, S12, S15, S28 |
| E11 `D.feuilleGros(g, o)` | Contenu des médaillons « feuille » : la page en gros plan, lignes d'imprimé grises et écriture à la main (Kalam 30). `o.mode: "verdacht"` : « Alkohol » (déjà écrit), puis « Verdacht: Schädelverletzung ? » qui s'écrit (`o.p1`), puis « CT: — » (`o.p2`). `o.mode: "pupillen"` : trois lignes d'imprimé « Bewusstsein », « Motorik », et **« Pupillen: — »** entouré d'un trait | 210 × 210 · ancrage = centre | écriture lettre à lettre (0,05 s par signe) | S9, S14 |
| E12 les ombres du couloir | Pas de dessin nouveau : `D.silhouette` (pose « marche », × 0,85) à l'opacité 0,3, rangée dans `dp.gH` DEVANT les deux portes du fond et DERRIÈRE le pied du lit | hauteur 255 · ancrage = pieds, sur le sol du couloir (h 130) | traverse le renfoncement de droite à gauche (de x 1040 à x 700, puis masquée par le mur du box) ; la deuxième s'arrête 0,4 s au seuil (x 720) et tourne la tête | S14 |

### F. La scène muette

| Fonction | Dessin | Taille · ancrage | Mobile | Scènes |
|---|---|---|---|---|
| F1 `D.chambreNeutre(g)` | Un mur nu `#F2F0E9`, une plinthe, un sol ; une tache de lumière pâle (parallélogramme) sur le mur. **Rien qui dise où l'on est** : ni porte étiquetée, ni rideau, ni fenêtre, ni horloge | 1000 × 600 · ancrage = coin bas gauche | la tache de lumière pâlit avec `VIE` | S18 |
| F2 `D.litNeutre(g, o)` | Lit d'hôpital simple vu de côté : cadre, tête et pied de lit pleins, matelas, oreiller, drap blanc tiré | 460 × 170 · ancrage = sol, milieu | — | S18 |
| F3 `D.chaiseSweat(g)` | Une chaise vide ; sur le dossier, **son sweat à capuche plié** (les deux cordons pendent) | 110 × 210 · ancrage = pieds | les cordons se balancent (`m.sway` 2°) × `VIE` | S18 |
| F4 `D.veilleuse(g, o)` | Petite lampe de chevet murale, halo jaune `o.on` | 60 × 50 · ancrage = fixation | `on` = `VIE(t)` (le dernier jaune s'éteint) | S18 |

### G. Le tribunal

| Fonction | Dessin | Taille · ancrage | Mobile | Scènes |
|---|---|---|---|---|
| G1 `D.aube(g, o)` | Ciel de petit matin : bandes horizontales de hachures grises qui s'éclaircissent vers le bas, soleil bas `#FFE08A` cerclé d'encre (r 46), trois nuages au trait | 1000 × 880 · ancrage = coin haut gauche | soleil qui monte de 40 px pendant la scène + `m.rays` (R 130, op 0,35, 6°/s) ; nuages `m.drift` (10–18 px/s) ; deux oiseaux (`m.drift` + battement) | S19 |
| G2 `D.amtsgericht(g, o)` | **Petit tribunal de province** : bâtiment de deux niveaux (4 fenêtres à petits carreaux par niveau, volets), toit à croupe hachuré avec une lucarne, avant-corps central, porte en arc à deux battants, trois marches, deux lanternes, **plaque « Amtsgericht »** (Kalam 30) au-dessus de la porte ; un banc ; pas de drapeau, pas d'armoiries lisibles | 460 × 550 · ancrage = bas, milieu | `m.build "growY"` ; les lanternes s'éteignent avec le lampadaire | S19 |
| G3 `D.tilleul(g, o)` | Grand tilleul rond (houppier bosselé, hachures claires : c'est le jour), tronc, banc circulaire | hauteur 400 · ancrage = pied | `m.sway` 1,4°, 3,6 s | S19 |
| G4 `D.rue(g, o)` | Trottoir du fond, chaussée (tirets), trottoir du premier plan, bordures, une plaque d'égout, deux bornes | 1000 × 320 · ancrage = coin haut gauche | — | S19 |
| G5 `D.hall(g, o)` | Hall du tribunal : mur `#EFEFEA`, lambris bas hachuré, sol en damier en perspective ; **tableau d'affichage** en liège avec quatre feuilles punaisées (aucun texte lisible) ; banc d'attente ; deux **globes** suspendus | 1000 × 1200 · ancrage = coin haut gauche | globes `m.pend` (idle 0,5°) ; un coin de feuille qui bat (`m.sway` 6°, 1,2 s) | S20 |
| G6 `D.porteSalle(g, o)` | Double porte de la salle d'audience : encadrement mouluré, deux vantaux à panneaux, poignées en laiton (jaune), **plaque « Sitzungssaal »** (Kalam 28) au-dessus. `o.ouv` (0..1) : chaque vantail se referme sur son gond (largeur × 1 → 0,25), intérieur jaune pâle | 300 × 740 · ancrage = bas, milieu | `ouv` (0,45 s, `out`) + `m.rays` (R 420, op 0,18) + trapèze de lumière au sol | S20 |
| G7 `D.encreMontant(g, o)` | **Le montant qui se délave** : le « 41.250 € » de la lettre (Kalam 30 sur la version `petit`) redessiné à part, à l'encre ; `o.delave` (0..1) : les chiffres pâlissent du noir au gris très clair de gauche à droite, trois gouttes d'encre s'en détachent, coulent le long de la lettre et tombent au sol (petites taches rondes qui sèchent), il ne reste qu'un fantôme en pointillé. **Ni étiquette de prix ni ficelle** : c'est l'objet signature d'AKTE 08, dont la ficelle casse aussi (remplacé le 26.11.2026) ; ici c'est l'encre, le matériau de l'épisode | 110 × 40 · ancrage = centre du montant | `delave` 0 → 1 en 0,45 s ; gouttes (chute 0,35 s, rebond nul) | S20 |
| G8 `D.salle(g, o)` | **La salle d'audience** : mur du fond, lambris, deux hautes fenêtres à petits carreaux avec leur rayon de lumière, parquet ; **estrade** et pupitre de la juge au centre (lampe, micro) ; table du procureur à gauche (pile de dossiers), table de la défense à droite ; une barrière basse à balustres. `o.plan` = "fond" (S21, large), "experts" (S22 : le même mur, cadré sur l'estrade vide), "nu" (S24 : mur + lambris + sol) | 1000 × 1200 · ancrage = coin haut gauche | `m.dust` dans les deux rayons ; les rayons glissent (10 px en 6 s) | S21, S22, S24 |
| G9 `D.dos(g, o)` | **Un parent vu de dos**, assis (dessin dédié : Persona n'a pas de vue de dos) : `o.qui: "mere"` = carré gris (casque de cheveux à mi-nuque, raie), nuque, foulard clair, épaules en pull ; `o.qui: "pere"` = couronne de cheveux bruns autour d'un crâne dégarni, oreilles, col de chemise, épaules de veste foncée. `o.penche` (0..1 : la tête s'incline vers l'autre), `o.tremble` (0..1 : épaules qui tressautent, 6 Hz, 3 px), `o.bras` (0..1, père : son bras passe derrière les épaules de sa femme, main en moufle sur son épaule), `o.mouchoir` (0..1, mère : la main monte au visage avec un mouchoir blanc qui dépasse de la joue) | 190 × 300 chacun · ancrage = milieu du dossier du banc | respiration ; voir S21 | S21 |
| G10 `D.bancParties(g)` | Le banc des parties civiles vu de dos : dossier à barreaux, deux montants | 480 × 220 · ancrage = haut, milieu | — | S21 |
| G11 `D.negatoscope(g, o)` | Négatoscope sur pied à roulettes : caisson lumineux à **quatre cases** (2 × 2), `o.l1`, `o.l2` (0..1) = lumière de chaque rangée ; pinces ; en-têtes de rangée (la place des étiquettes-refrain) ; entre les cases, la place d'un signe « = » (rangée 1) et « ≠ » (rangée 2) tracés à l'encre ; une barre de balayage (`o.scan` 0..1) sur la rangée 2 | 500 × 650 · ancrage = haut, milieu | rangées qui s'allument (grésillement de 0,15 s) ; barre de balayage | S22 |
| G12 `D.marteauReflexes(g)`, `D.lunettesLecture(g)`, `D.plume(g, o)`, `D.foulard(g)` | Marteau à réflexes (manche + tête triangulaire) ; lunettes demi-lune ; stylo-plume (`o.goutte` : une goutte d'encre au bec) ; foulard noué | 70 × 16 ; 56 × 18 ; 90 × 12 ; 90 × 46 | suivent la main ou la nuque | S22, S23, S24, S25 |
| G13 `D.pupitreJuge(g)` | Le pupitre vu de face en plan rapproché : dessus, façade à panneaux, lampe à abat-jour jaune, dossier ouvert, micro | 580 × 290 · ancrage = haut, milieu | halo de la lampe | S23 |
| G14 `D.plaqueCT(g, o)` | La plaque « CT » en grand (la même que celle du box) : caisson, lettres Kalam 54 ; `o.lum` (0..1) | 180 × 90 · ancrage = centre | s'allume + `m.rays` (R 200, op 0,3) | S23, S26 |
| G15 `D.billet(g, o)` | Billet de banque dessiné (cadre, rond, « € », hachures), sans valeur lisible | 96 × 52 · ancrage = centre | vol en cloche, rotation 12°, se range en éventail | S24 |
| G16 `D.urteilBlatt(g, o)` | La feuille du jugement, debout dans un porte-document : « URTEIL » (Kalam 36), « Amtsgericht Tettnang · 04.05.2026 » (Kalam 20), six lignes grises, et en bas une **signature gribouillée à l'encre encore humide** : `o.signe` (0..1, elle se trace), trois reflets blancs qui scintillent, **une goutte** qui coule de la signature (`o.goutte` 0..1 → 34 px) | 330 × 430 · ancrage = bas, milieu | signature ; reflets (alternance 0,5 s) ; goutte lente | S25 |
| G17 `D.encrier(g)` | Encrier ouvert + buvard à côté | 80 × 70 | une bulle à la surface de l'encre toutes les 2 s | S25 |

### H. La règle

| Fonction | Dessin | Taille · ancrage | Mobile | Scènes |
|---|---|---|---|---|
| H1 `D.carteDeclencheur(g, o)` | Carte blanche à ombre. `o.mode: "doute"` : icône d'une tête de profil avec la petite marque + un verre, « Kopf + Alkohol » (Kalam 34), « in Zweifelsfällen » (Kalam 28, surligné), un « ? » ; `o.mode: "pire"` : icône d'un visage aux yeux mi-clos + flèche vers le bas, « Verschlechterung » (Kalam 34). La place de l'arabe est sous l'allemand (posé par `story.js`) | 360 × 260 · ancrage = coin haut gauche | tombe (`m.build "drop"`) ; le « ? » oscille (`wobble`) ; la flèche descend de 10 px en boucle | S26 |
| H2 `D.porteCT(g, o)` | La porte « CT » en grand : battant, hublot, **caisson lumineux « CT »** au-dessus (`o.lum`), `o.ouv` ; derrière, l'**anneau du scanner** (grand tore au trait, lit plat) éclairé en jaune pâle | 260 × 720 + caisson 180 × 80 · ancrage = bas, milieu | s'allume, s'ouvre, rayons (R 380, op 0,2) | S26 |
| H3 `D.feuilleSurveillance(g, o)` | **La feuille de surveillance, bien remplie** : titre « Neurologische Überwachung » (Kalam 34) ; quatre colonnes avec une petite icône chacune : horloge « Uhrzeit », œil « Bewusstsein », deux pupilles « Pupillen », bras « Motorik » (Kalam 26 ; l'arabe posé dessous par `story.js`) ; quatre rangées de cases. `o.rangs` = état de chaque case (vide, coche tracée, heure écrite) ; `o.heures` = textes | 720 × 830 · ancrage = coin haut gauche | tombe ; coches tracées (0,18 s) ; heures écrites lettre à lettre ; colonne « Uhrzeit » surlignée en jaune à la fin | S27 |
| H4 `D.etiquetteBagage(g, o)` | Grande étiquette à œillet, jaune, « Verantwortung » (Kalam 34), pendue par une **cordelette élastique** ; `o.etire` (0..1 : la cordelette s'allonge jusqu'à 160 px vers `o.vers`) | 250 × 70 · ancrage = œillet | `m.pend` (idle 2°) ; s'étire puis revient en claquant (amorti) | S28 |
| H5 `D.pips(g, o)` | Trois petits ronds « ● ○ ○ » (le numéro de la règle) | 70 × 18 | le rond plein avance | S26 à S28 |

---

## 3. HUD propre à l'épisode

Tout ce paragraphe vit dans `c.hud` (jamais découpé, jamais déplacé par une caméra) et est créé par
`diptyque(c, o)`. Options : `ref` (1030, 870 ou 640), `horloge` (true / false), `refrains` ("aucun", "dehors",
"deux"), `crane` (true / false).

### 3.1 La ligne (`D.ligne`)

- Nœud unique : `.on((t, s) => { s.px = 540; s.py = 0; s.x += 540; s.y += LY(t); s.r += PENTE(t); })`, le dessin
  étant centré sur (0, 0). Le trait dépasse le cadre des deux côtés (1240 de long).
- Épaisseur 6 px jusqu'à b11, puis `6 + 5 × ENC(t)` ; gouttes sous le trait quand `ENC` > 0,6.
- **Entrée en S5** : la ligne se trace de gauche à droite en 0,4 s (`wipe`) à `b5-0.10`. En S1–S3 elle est déjà là
  (y 870, fine, sans horloge).
- **Elle est masquée** (opacité 0) en S4, S17 et de S19 à S28 ; elle revient en S18 et S29.
- **Mode ECG (S18 seulement)** : entre x −430 et 430, le trait est remplacé par un tracé : une ligne de base et
  des complexes (petite bosse, pic de 34 px, creux de 12 px, bosse) qui défilent de gauche à droite à
  260 px/s. Un complexe naît à chacun des trois bips (§ S18) ; après le troisième, plus rien : la ligne de base
  seule, droite. C'est à ce moment que `PENTE` revient à 0.
- Ce que la ligne ne porte jamais : une graduation, un chiffre, une flèche.

### 3.2 L'horloge et son étiquette

- Horloge : centre (150, `LY(t) − 390·tan(PENTE)`) — elle est posée sur la ligne à x 150 et reste droite.
  Rayon 44 : elle occupe x 106–194. Elle n'apparaît qu'à `b5` (`pop`).
- Étiquette de temps : centre (330, y de la ligne à x 330), accrochée à droite de l'horloge.

| de | à | aiguilles | étiquette | arabe (2e ligne) |
|---|---|---|---|---|
| `b5` | `b8-0.10` | 0 h 20 | « nach Mitternacht » | « من بعد نص الليل » |
| `b8-0.10` | `b12-0.10` | → 2 h 05 | « kurz nach 2 Uhr » | — |
| `b12-0.10` | `b13-0.1` | → 3 h | « 3 Uhr » | — |
| `b13-0.1` | `b15-0.30` | **fantôme** (pointillés, aiguilles grises, « ? ») | « Uhrzeit: nicht berichtet » | « الساعة ما معروفاش » |
| `b15-0.30` | `b16` | 3 h, horloge pleine | aucune étiquette | — |
| `b16` | `b17-0.20` | 3 h → 6 h en continu, secteur jaune qui s'ouvre | « 3 Stunden » | — |
| `b17-0.20` | `b18@Scanner+0.4` | 6 h | « 6 Uhr » | — |
| `b18@Scanner+0.4` | `b19-0.05` | 6 h 30 | « ≈ 6:30 Uhr » | — |

- Quand la ligne monte en haut de l'écran (S16), l'horloge s'arrête à y 372 (`max(LY, 372)`) et y reste, son
  étiquette en (330, 372) : sous la mention du coin haut gauche, à gauche de « من الداخل ».
- En S17 (carte), c'est `D.horlogeGrande` qui prend le relais jusqu'à « 8:40 Uhr ». En S18, plus d'horloge :
  le décès n'a ni heure, ni lieu, ni délai.
- **Pendant b13 et b14, aucune heure n'est lisible nulle part** : ni sur l'horloge, ni dans le décor.

### 3.3 Les deux étiquettes-refrain

- « من برا » : centre (800, y de la ligne à x 800 − 37), côté haut. « من الداخل » : centre (790, y de la ligne
  à x 790 + 50), côté bas. En position « dehors », la seconde est à y ≈ 1054–1106, x 700–880 : hors de la
  colonne des boutons.
- « من برا » apparaît à `b6@برا` ; « من الداخل » à `b7@الداخل`. Ensuite les deux restent : celle de la moitié
  dont on parle est `actif` (surligneur), l'autre à 45 %.
- Impulsions : `b6@برا`, `b7@الداخل`, `b9@برا`, `b11@الداخل`, `b15@الداخل`, `b18@الداخل`.
- À `b18@Scanner-0.10`, « من برا » tombe hors du cadre (chute + rotation, 0,5 s) ; « من الداخل » glisse en
  (560, 316) (x 470–650, y 290–342) et y reste jusqu'à la fin de S16. Ni l'une ni l'autre ne reviennent ensuite sur la ligne.

### 3.4 La coupe du crâne dans la moitié basse

`D.crane` (statique) et `D.dedans` (redessiné) partagent un même nœud parent, enfant de `dp.gB`. Position et
échelle suivent la ligne par interpolation linéaire entre trois réglages :

| `LY` | échelle | centre | la coupe occupe |
|---|---|---|---|
| 1030 (« dehors ») | 0,60 | (560, 1272) | x 404–716, y 1104–1440 |
| 870 (« égal ») | 0,86 | (523, 1195) | x 299–747, y 954–1436 |
| 640 (« dedans ») | 1,05 | (470, 1090) | x 197–743, y 796–1384 |
| 262 (scanner) | 1,45 | (500, 880) | x 123–877, y 474–1286 |

Réglage particulier de la scène muette (S18) : échelle 0,75, centre (523, 1140) (y 930–1350), pour laisser la
place à la phrase écrite. Les trois petites étiquettes intégrées (`o.noms`) ne sont affichées que si l'échelle
dépasse 0,8 (donc pas en position « dehors »).
Avant b7, la moitié basse est **fermée** : papier nu, rien.

### 3.5 Mentions et pastilles

Voir « Trois emplacements fixes » dans les conventions. Rappel des mentions par séquence :

| scènes | mention (coin haut gauche) | étiquette du bas |
|---|---|---|
| S1 | « laut Presse » + « حسب الصحافة » (Plex gras 26, à droite de l'étiquette, x 285–440 ; seule fois où la mention est traduite) | « Urteil 04.05.2026 · nicht rechtskräftig (Stand 05.05.2026) » + « الحكم ما كانش نهائي » (§ S1) |
| S2 | « laut Presse · Rekonstruktion » | idem |
| S4 | aucune (le médaillon de l'Allemagne occupe le coin ; la pastille « laut Presse » est le sujet de la scène) | — |
| S5, S7, S8, S9, S11, S14, S15, S16, S17 | « laut Presse » | de S7 à S16 : « Schema » en bas à gauche (104–214, y 1420–1454) |
| S6, S10, S13 (« dedans ») | aucune | « Schema » + la première fois (S6) « رسم توضيحي » (Plex gras 26, à droite, x 228–400) — chaîne à valider |
| S12 | « laut Presse · Rekonstruktion » | « Schema » |
| S18 | aucune (la phrase écrite porte son « laut Presse ») | — |
| S19 à S25 | « laut Presse » | — |
| S26, S27 | aucune (le ruban « القاعدة » occupe le coin) | « AWMF-Leitlinie 008/001 (Stand 2015) · Keine Rechtsberatung » (Kalam 20, gris, centré x 520, y 1428) |
| S28 | aucune (ruban) | « laut Presse · Keine Rechtsberatung » (Kalam 18, aligné à droite sur x 890, y 1436) |
| S29 | aucune | — |

### 3.6 Barre de progression et logo

Socle du gabarit, inchangé : la barre (x 100–700, y 236–250) ; le logo masqué pendant l'intro (`i1` → `b4`).
`AFTER_INTRO` = `b4`.

---

## 4. Scène par scène

29 scènes + l'affiche. Durées = minutage PROVISOIRE. « Vie » = ce qui bouge en continu une fois le décor posé.
`m = Motion.of(c)`. Scènes du diptyque : coordonnées du haut en **(x, h)** (h = hauteur au-dessus de la ligne) ou,
quand la ligne ne bouge pas pendant la scène (S1, S2, S3, S18, S29), directement en pixels d'écran.

| n° | scène | beats | début → fin (s) | durée | entrée | ligne | affiche |
|---|---|---|---|---|---|---|---|
| S1 | Accroche : la lettre / le verdict | b1–b2 | 0,00 → 5,17 | 5,2 | `cut` | 870 | case 1 |
| S2 | Accroche : elle a demandé — et ça ne l'a pas protégée | b3 | 5,17 → 8,95 | 3,8 | `ENCRE-HAUT` | 870 | case 2 |
| S3 | Intro : le polaroïd de Yassine | i1–i3 | 8,95 → 18,49 | 9,5 | `ENCRE-TOUT` | 870 | `summary: false` |
| S4 | La carte : le Bodensee | b4 | 18,49 → 22,40 | 3,9 | `ENCRE-TOUT` | — | case 3 |
| S5 | La route, la nuit : la chute | b5–b6 | 22,40 → 27,11 | 4,7 | `ENCRE-TOUT` | 1030 | case 4 |
| S6 | Dedans : l'os est cassé (le pré) | b7 | 27,11 → 29,56 | 2,5 | `ENCRE-HAUT` | → 640 | case 5 |
| S7 | 2 h : l'ambulance, les urgences | b8 | 29,56 → 31,83 | 2,3 | `ENCRE-HAUT` | → 1030 | case 6 |
| S8 | Le box : du dehors, une marque | b9 | 31,83 → 33,68 | 1,9 | `ENCRE-HAUT` rapide | 1030 | case 7 |
| S9 | Le box : le doute écrit, pas de scanner, la surveillance | b10 | 33,68 → 37,01 | 3,3 | `cut` | 1030 | case 8 |
| S10 | Dedans : le sang s'accumule sous l'os | b11 | 37,01 → 39,46 | 2,5 | `ENCRE-HAUT` | → 640 | case 9 |
| S11 | 3 h : la soignante le voit s'agiter | b12 | 39,46 → 41,76 | 2,3 | `cut` | → 1030 | case 10 |
| S12 | Cette nuit-là : l'anesthésiste | b13–b14 | 41,76 → 48,07 | 6,3 | `cut` | 1030 | case 11 |
| S13 | Dedans : le sang ne dort pas (le médical en image) | b15 | 48,07 → 50,78 | 2,7 | `ENCRE-HAUT` | → 640 | case 12 |
| S14 | Trois heures | b16 + respiration | 50,78 → 53,25 | 2,5 | `cut` | → 870 | case 13 |
| S15 | 6 h : l'alarme | b17 | 53,25 → 56,77 | 3,5 | `cut` | → 1030 | case 14 |
| S16 | Le scanner : les deux moitiés n'en font plus qu'une | b18 | 56,77 → 59,65 | 2,9 | `cut` | → 262 | case 15 |
| S17 | Un autre hôpital, 8 h 40 | b19 | 59,65 → 61,93 | 2,3 | `ENCRE-TOUT` | — | case 16 |
| S18 | Scène muette : il n'a pas survécu | silence | 61,93 → 64,89 | 3,0 | `fade` 0,45 | 870 | case 17 |
| S19 | 2026 : Tettnang, à l'aube | b20 | 64,89 → 67,41 | 2,5 | `fade` 0,6 | — | case 18 |
| S20 | La porte de la salle : Strafbefehl, Einspruch | b21 | 67,41 → 70,19 | 2,8 | `fade` 0,45 | — | case 19 |
| S21 | La salle : seule accusée ; les parents de dos | b22 | 70,19 → 73,06 | 2,9 | `fade` 0,45 | — | case 20 |
| S22 | Les experts : du dehors, pareil | b23 | 73,06 → 76,04 | 3,0 | `cut` | — | case 21 |
| S23 | La juge : à 3 h au plus tard | b24 | 76,04 → 78,88 | 2,8 | `cut` | — | case 22 |
| S24 | La sanction : le sursis, 20 000 € aux parents | b25–b26 | 78,88 → 83,70 | 4,8 | `fade` 0,45 | — | case 23 |
| S25 | Pas définitif : l'encre n'est pas sèche | b27 | 83,70 → 86,65 | 3,0 | `fade` 0,45 | — | case 24 |
| S26 | La règle 1 : le doute, ou l'état qui change → scanner | b28 | 86,65 → 90,52 | 3,9 | `fade` 0,45 | — | case 25 |
| S27 | La règle 2 : la feuille, l'heure | b29 | 90,52 → 93,84 | 3,3 | `cut` | — | case 26 |
| S28 | La règle 3 : la responsabilité reste | b30 | 93,84 → 96,90 | 3,1 | `cut` | — | case 27 |
| S29 | La dernière phrase : « غير سكران » | b31 | 96,90 → 99,23 | 2,3 | `ENCRE-TOUT` | 870 | case 28 |
| S30 | Affiche-résumé | — | 99,23 → ≈ 104,9 | 5,6 | `cut` + flash | — | — |

Débuts de scène, tels qu'ils s'écrivent dans `from` : S1 `0` · S2 `b3-0.10` · S3 `i1-0.30` · S4 `b4-0.30` ·
S5 `b5-0.10` · S6 `b7-0.30` · S7 `b8-0.15` · S8 `b9-0.10` · S9 `b10` · S10 `b11-0.30` · S11 `b12-0.15` ·
S12 `b13` · S13 `b15-0.30` · S14 `b16-0.08` · S15 `b17-0.45` · S16 `b18` · S17 `b19-0.05` · S18 `b19@end+0.1` ·
S19 `b20-0.25` · S20 `b21` · S21 `b22` · S22 `b23` · S23 `b24` · S24 `b25-0.2` · S25 `b27` · S26 `b28-0.2` ·
S27 `b29` · S28 `b30` · S29 `b31-0.3` · S30 `b31@end+0.15`.

Poussée intérieure (pour que rien ne soit figé sans bouger le cadre) : le contenu de CHAQUE moitié grossit très
lentement autour de son sujet, `1,00 → 1,03`, linéaire, **par séquence de lieu** et non par scène (sinon un
`cut` dans le même lieu ferait un saut) : route S5 ; pré S6 ; entrée S7 ; box A = S8 + S9 ; box B = S10 + S11 +
S12 ; box C = S13 + S14 + S15 + S16 (centre de poussée (430, h 250), la poitrine du garçon). Coupe du crâne : de
`b7` à `b19`, `1,00 → 1,04` autour de son centre (s'ajoute à l'échelle du § 3.4).

---

### S1 — ACCROCHE : la lettre / le verdict (b1–b2 · 0,00 → 5,17)

**À comprendre :** elle a dit « non » à une amende écrite de 41 250 € — et un tribunal l'a condamnée à
15 mois de prison avec sursis. Les deux chiffres sont à l'écran dès la première image, un par moitié.
**Entrée :** `cut` à t = 0. **Ligne :** y 870, horizontale, fine, sans horloge ni étiquettes
(`diptyque(c, { ref: 870, horloge: false, refrains: "aucun", crane: false })`).

**Moitié haute — chez elle (pixels d'écran).**

| couche (arrière → avant) | objet | position |
|---|---|---|
| 1 | `D.entree` | mur x 40–1040, y 270–790 ; parquet y 790–870 ; porte x 120–330, y 330–790, fente à lettres y 598–618 ; patère x 800–940, y 380 ; blouse pendue x 812–908, y 400–650 ; console x 770–940, plateau y 660 ; lampe (880, 585–660) |
| 2 | `DOC` (`sweater`) | x 660, pieds y 790, échelle 0,82 (tête de y 432 à 538), trois-quarts, `facing: -1` |
| 3 | `D.lettre` | centre (300, 600), 300 × 360, inclinée −4° (x 150–450, y 420–780) |
| 4 | « Einspruch » écrit à la plume (`D.lettre`, `o.plume`), Kalam 56, incliné de −9° | ≈ 277 × 77 sur le bas de la lettre, centre (300, 715) ; une goutte d'encre au bout du dernier trait |
| 5 | « ما قبلاتش » (`ar strong`, 34) | centre (300, 842), sur le parquet |

**Moitié basse — le prétoire (pixels d'écran ; mise en place « prétoire de l'accroche », la même en S2).**

| couche | objet | position |
|---|---|---|
| 1 | `D.pretoireCoin` | mur y 870–1380, lambris dès y 1150, sol y 1380–1470 ; rayon de lumière de (120, 880) à (430, 1380), large de 150 |
| 2 | « 15 Monate » (classe `de`, 88 px) | centre (330, 975) — **présent à t = 0** |
| 3 | `JUG` | x 810, pieds y 1320 (sur l'estrade), échelle 0,8 (tête de y 970), trois-quarts, `facing: -1` |
| 4 | estrade + pupitre | estrade x 620–905, y 1320–1380 ; pupitre x 640–900, dessus y 1180, façade jusqu'à 1320 ; lampe (670, 1130–1180) ; micro (760, 1150) ; dossier (800, 1172) |
| 5 | `DOC` (`sweater`) | x 320, pieds y 1380, échelle 0,82 (tête de y 1022), trois-quarts, `facing: 1` |
| 6 | `D.grillePointillee` | montant gauche (205, 1382), 230 × 370 (x 205–435, y 1012–1382), **devant** elle |
| 7 | pastille jaune « auf Bewährung » / « حبس موقوف التنفيذ » | centre (620, 950), taille 30 (x 481–759) ; arabe ≤ y 1015 |
| 8 | étiquette de statut (blanche, 2 lignes) | x 104–760, y 1396–1466 : « Urteil 04.05.2026 · nicht rechtskräftig (Stand 05.05.2026) » (Kalam 22, ligne de base y 1422) ; « الحكم ما كانش نهائي » (Plex gras 26, aligné à droite sur x 750, ligne de base y 1456) — **présente à t = 0** |
| 9 | voile d'attente | rectangle papier à 45 % sur toute la moitié basse, sauf les couches 2 et 8 (dessinées au-dessus) |

**HUD :** mention « laut Presse » + « حسب الصحافة » ; pastille A « Strafbefehl · 41.250 € » / « غرامة مكتوبة بلا
جلسة » (taille 30, x 478–882).

**Déroulé.**

| instant | ce qui se passe |
|---|---|
| t = −0,15 → 0,22 | la lettre arrive par la gauche (de x −80 à x 300, `out`, dépassement de 14 px) : à la première image elle est à mi-course, floue de vitesse (deux traits de vitesse derrière elle) ; le clapet de la fente à lettres bat encore (`m.pend` 22°) ; `DOC` a un petit recul (8 px) |
| `b1@1` (0,45) | « لا » : `DOC` tend le bras, paume vers la lettre (`PP.holdHandOut`, miroir) ; la lettre **recule** de 46 px et s'incline (−4° → −9°) en 0,18 s |
| `b1@1+0.12` | « Einspruch » se trace d'un seul geste en travers de la lettre (`plume` 0 → 1 en 0,28 s, de gauche à droite) ; au bout, la goutte d'encre perle et la lettre tressaute (`c.shake("b1@1+0.4", 6, 0.25)`) |
| `b1@1+0.35` | « ما قبلاتش » se révèle de droite à gauche (0,3 s) |
| `b1@لغرامة` (0,65) | pastille A |
| `b1@4` (1,34) | le montant « 41.250 € » : trait de soulignement tracé (0,3 s) + impulsion × 1,08 |
| `b2-0.10` (1,99) | bascule : un voile papier à 35 % descend sur la moitié HAUTE (0,3 s), celui du bas se lève (0,3 s) |
| `b2@وتحكم` (2,09) | `JUG` lève sa feuille et lit (`talk` jusqu'à `b2@الحبس`) |
| `b2@بـ15` (2,79) | « 15 Monate » : impulsion × 1,12 + trait de surligneur jaune tracé dessous (0,25 s) ; la **grille en pointillés tombe** de la ligne (`m.build "drop"`, 0,45 s, rebond) ; `c.shake("b2@بـ15+0.4", 8, 0.35)` ; `DOC` : `shock`, recul de 14 px |
| `b2@الحبس` (3,63) | `DOC` : panique (`worried` + `sweat`), regarde à gauche, à droite ; elle tend UNE main vers un barreau (`reachR`, à 100 px de l'épaule) : sa moufle passe AU TRAVERS — les tirets s'écartent de 10 px autour d'elle et se referment — puis elle ramène la main contre sa bouche. Elle ne serre JAMAIS les barreaux : c'est le geste de l'accroche d'AKTE 02 (vraie cellule), et ici la grille n'enferme pas |
| `b2@avec` (3,98) | pastille « auf Bewährung » ; les tirets de la grille se mettent à défiler : elle ne se ferme pas |
| `b2@sursis+0.2` (4,47) | `DOC` : larmes (`cry`, `tears` 0 → 1 en 0,6 s), tête qui tremble |
| `b2@فألمانيا` (4,67) | `JUG` lève les yeux vers elle ; l'étiquette de statut a une impulsion (× 1,05) |

**Vie :** la blouse sur la patère (`m.sway` 0,8°), halo de la lampe de la console et de la lampe du pupitre,
rayon de lumière qui glisse + `m.dust({ x: 130, y: 900, w: 300, h: 470 }, 12, { seed: 4, op: 0.8, speed: 10 })`
rangée dans `dp.gB`, tirets de la grille, respirations, clignements.
**Jamais ici :** une cellule, des barreaux pleins, des mains qui serrent les barreaux (AKTE 02), un tampon (AKTE 08), un marteau, le mot « rechtskräftig » seul.
**Affiche :** image à `b2@sursis+0.5`.

---

### S2 — ACCROCHE : elle a demandé — et ça ne l'a pas protégée (b3 · 5,17 → 8,95)

**À comprendre :** c'est une médecin de garde ; cette nuit-là elle a demandé l'avis d'un médecin expérimenté ;
devant le tribunal, cet avis ne l'a pas protégée. (Boucle ouverte : on saura pourquoi à la fin.)
**Entrée :** `ENCRE-HAUT` à `b3-0.10`. **Ligne :** 870. Le bas ne change pas d'un pixel (même fonction, même état :
elle pleure derrière la grille).

**Moitié haute — le couloir des urgences, la nuit (pixels d'écran).**

| couche | objet | position |
|---|---|---|
| 1 | `D.couloirNuit` | mur y 270–790, bande de protection y 610–626, sol y 790–870 ; porte battante x 120–250, y 400–790 (hublot éclairé) ; panneau suspendu « Notaufnahme » x 150–330, y 330–376 ; applique murale (500, 440) |
| 2 | `DOC` (`coat` + `D.styloChignon`) | x 330, pieds y 790, échelle 0,82, trois-quarts, `facing: 1` |
| 3 | pointillé | de (372, 500) à (688, 512), tirets 4/12 |
| 4 | médaillon `D.medaillon` | centre (800, 520), r 110 (y 410–630) ; dedans : `Persona.head` d'`ANA` × 1,25 + `D.masqueCou` + deux traits d'épaules |
| 5 | plaque blanche du médaillon (250 × 88) | centre (800, 690) : « erfahrener Kollege » (Kalam 26) ; « طبيب عندو الخبرة » (Plex gras 26) |

**HUD :** mention « laut Presse · Rekonstruktion » ; pastille A « diensthabende Ärztin » / « الطبيبة ديال la
garde » (taille 28, x 497–863), de `b3@طبيبة` à `b3@سولات+0.3`.

**Déroulé.**

| instant | ce qui se passe |
|---|---|
| `b3-0.10` (5,17) | l'encre monte sur l'entrée, se retire sur le couloir |
| `b3@طبيبة` (5,51) | pastille A ; `DOC` regarde vers la caméra, `worried` |
| `b3@سولات-0.1` (6,40) | le médaillon jaillit (`pop`), le pointillé se trace (0,25 s) |
| `b3@سولات` (6,50) | `DOC` se tourne vers lui, main ouverte ; une petite carte blanche « ? » (40 × 40) file le long du pointillé (0,4 s) |
| `b3@عندو` (7,15) | la plaque du médaillon ; `ANA` hoche la tête une fois |
| `b3@الخبرة+0.1` (7,55) | la **feuille « Rat vom Kollegen »** (`D.feuilleRat`, calque `dp.sur`) sort du médaillon et glisse vers `DOC` : (700, 520) → (372, 500) en 0,3 s ; `DOC` : `calm` |
| `b3@وهادشي` (7,84) | la feuille quitte ses mains, **traverse la ligne** et descend jusqu'aux mains de la `DOC` du bas : (372, 500) → (345, 1140) en 0,4 s |
| `b3@وهادشي+0.45` (8,29) | en bas, elle lève la feuille devant elle à deux mains (centre de la feuille (345, 1140), derrière la grille) : `worried`, un espoir |
| `b3@حماهاش` (8,43) | la feuille **se déchire** (`dechire` 0 → 1 en 0,3 s) ; les deux moitiés tombent au sol en tournant ; `DOC` : `shock` puis `cry` ; `JUG` ne bouge pas |

**Vie :** applique et hublot (halo qui respire), panneau « Notaufnahme » (`m.pend` idle 0,6°), porte battante
(2°), flottement du médaillon, tout le bas comme en S1.
**Affiche :** image à `b3@حماهاش+0.35`.

---

### S3 — INTRO : le polaroïd de Yassine (i1–i3 · 8,95 → 18,49) — `summary: false`

**À comprendre :** c'est Yassine, médecin en Allemagne ; il raconte des histoires vraies des tribunaux ; mets
un j'aime et abonne-toi.
**Entrée :** `ENCRE-TOUT` à `i1-0.30`. **Ligne :** 870 — elle reste à l'écran : le polaroïd est **scotché à cheval
sur elle** (les deux moitiés sont vides, papier nu ; ni horloge ni étiquettes). Logo du haut masqué.

| couche | objet | position (écran) |
|---|---|---|
| 1 | `m.rays(540, 560, { op: 0.12, R: 520, speed: 6, at: "i1" })` | derrière le polaroïd |
| 2 | la ligne | y 870, visible à gauche (x 0–300) et à droite (x 780–1080) du polaroïd |
| 3 | `D.polaroid` | centre (540, 600), 480 × 580, −3° (y 310–890) ; photo ronde r 186 centrée (540, 550) ; anneau jaune r 186–204 ; badge Instagram (690, 700) ; scotchs (345, 322) et (735, 322) |
| 4 | « Yassine » (classe `de`, 64 px), enfant du polaroïd | centre (540, 842), dans la marge blanche — **« Yassine », jamais « Dr. »** |
| 5 | petite icône Instagram (42 × 42) + « @dr.aguilo » (`de`, 46) | icône (412, 948) ; texte centré (562, 964) |
| 6 | pastille « Arzt in Deutschland » / « طبيب فألمانيا » puis « echte Fälle · deutsche Gerichte » / « قصص حقيقية من المحاكم » (jaune) | centre (540, 1040), taille 26 ; arabe ≤ y 1110 |
| 7 | cœur `Persona.props.heart` (taille 1,25) + « j'aime » (`de`, 30) | cœur (330, 1185) ; mot (330, 1255) |
| 8 | bouton « + s'abonner » → « ✓ abonné » (300 × 84) | centre (640, 1190) (x 490–790, y 1148–1232) |

Le bloc finit à y 1262 (< 1300). Rien dans la colonne des boutons.

| instant | ce qui se passe |
|---|---|
| `i1-0.30` | l'encre couvre tout, se retire vers le bas |
| `i1` (9,25) | le polaroïd jaillit (`pop` 0,4 s) et se balance sur ses scotchs (`m.pend` 4°, amorti) ; les rayons s'ouvrent |
| `i1@ياسين` (9,50) | « Yassine » s'écrit à la main (`c.write`, 0,35 s) |
| `i1@ياسين+0.15` | l'icône (`pop`) et « @dr.aguilo » (`fade`) |
| `i1@فألمانيا` (10,14) | pastille « Arzt in Deutschland » ; masquée à `i2@حقيقية` |
| `i2@حقيقية+0.15` (12,52) | pastille jaune « echte Fälle · deutsche Gerichte » ; masquée à `i3` |
| `i3` (15,00) | le cœur (vide) et « j'aime » ; `i3+0.1` : le bouton blanc « + s'abonner » |
| `i3@j'aime` (15,89) | le cœur se remplit de jaune et bat (0,35 s) ; impulsion × 1,05 du polaroïd |
| `i3@abonne` (16,39) | le bouton devient jaune « ✓ abonné » ; impulsion |

**Vie :** balancement du polaroïd (idle 0,5°), coin de scotch qui se soulève, rayons qui tournent, battement
lent du cœur après `i3@j'aime` (une pulsation par 1,2 s).

---

### S4 — LA CARTE : le Bodensee (b4 · 18,49 → 22,40)

**À comprendre :** c'est en Allemagne, tout au sud, au bord du lac de Constance, en 2023 — et tout ce qu'on
sait vient de la presse.
**Entrée :** `ENCRE-TOUT` à `b4-0.30`. Plein cadre : pas de ligne. Mise en place « carte du lac » (essai :
`out/essais/essai_carte.png`, corrigé).

| couche | objet | position (écran) |
|---|---|---|
| 1 | papier (`k.bg()`) | — |
| 2 | médaillon de situation : `drawDE(c, 228, 426, 34, …)` (socle) | l'Allemagne occupe x 130–324, y 300–555 ; Berlin en (290, 381) ; petit cadre 30 × 22 autour de (206, 547) |
| 3 | deux traits de « zoom » en pointillés | de (191, 558) à (110, 690) et de (221, 536) à (420, 690) |
| 4 | `D.carteLac` | cartouche coin haut gauche (110, 690), 795 × 650 (y 690–1340) ; projection de l'annexe F : Friedrichshafen (580, 994), Tettnang (690, 970), Ravensburg (713, 802) ; le lac tient dans x 126–854, y 752–1255 |
| 5 | « Bodensee » (`de`, 40) + « بحيرة » (`ar strong`, 34) | (590, 1130) et (590, 1176), sur l'eau |
| 6 | épingle jaune `pinAt(c, 580, 994, …)` + `m.ripple(580, 994, …)` | pointe sur Friedrichshafen |
| 7 | pastille « Friedrichshafen » (taille 30, sans arabe : nom propre) | centre (450, 820), sur la terre ; un trait court de (560, 843) à (580, 922) |
| 8 | pastille « September 2023 » (taille 34) | centre (640, 335) |
| 9 | `D.coupures` (3 coupures 170 × 130, sans titre lisible) | empilées en (790, 420), décalées de 8 px, tournées de −4°, 3°, 7° |
| 10 | pastille jaune « laut Presse » / « حسب الصحافة » (taille 32) + « kein veröffentlichtes Urteil » (`de`, 22) | pastille centre (630, 460) ; sous-ligne centre (650, 590) |

Pas de mention en haut à gauche dans cette scène (la pastille « laut Presse » EST le sujet).

| instant | ce qui se passe |
|---|---|
| `b4-0.05` (18,74) | l'Allemagne pousse (`m.build "grow"`, 0,4 s) ; Berlin : point + nom |
| `b4@وقعات` (19,13) | le petit cadre apparaît tout en bas de la carte et clignote deux fois |
| `b4@فـ2023` (19,48) | pastille « September 2023 » |
| `b4@حدا` (19,87) | les deux pointillés se tracent (0,25 s) ; le cartouche **se déplie** depuis le petit cadre (`m.build "grow"`, pivot (206, 547), 0,45 s) |
| `b4@بحيرة` (20,12) | le lac se dessine de gauche à droite (`wipe`, 0,4 s), les vagues partent, le voilier arrive |
| `b4@Bodensee` (20,47) | « Bodensee » puis « بحيرة » (`wipe rtl`) |
| `b4@Bodensee+0.25` | l'épingle tombe sur Friedrichshafen + ondes ; `+0.5` : pastille « Friedrichshafen » ; `+0.6` : Tettnang et Ravensburg apparaissent en gris (elles serviront plus tard) |
| `b4@وكنعرفوها` (20,95) | les trois coupures de presse tombent une à une (0,12 s d'écart) |
| `b4@الصحافة-0.3` (21,64) | pastille « laut Presse » ; `b4@الصحافة+0.1` : « kein veröffentlichtes Urteil » |

**Vie :** vagues (`m.drift`), voilier (`m.sway`), épingle qui oscille, coin de la coupure du dessus qui bat,
ligne de montagnes fixe. **Affiche :** image à `b4@end`.

---

### S5 — LA ROUTE, LA NUIT : la chute (b5–b6 · 22,40 → 27,11)

**À comprendre :** après minuit, un garçon de 18 ans tombe à vélo ; du dehors : un garçon ivre qui se relève et
repart en titubant. Rien d'autre.
**Entrée :** `ENCRE-TOUT` à `b5-0.10`. **Ligne :** 1030 (« dehors ») ; elle se trace de gauche à droite pendant que
l'encre se retire ; l'horloge apparaît à `b5`. **Moitié basse : fermée**, papier nu.
`diptyque(c, { ref: 1030, horloge: true, refrains: "dehors", crane: false })`.

**Moitié haute, en (x, h).**

| couche | objet | position |
|---|---|---|
| 1 | `D.nuit` | x 40–1040, de h 200 à h 760 |
| 2 | `D.arbreNuit` | pied (880, h 200), hauteur 330 |
| 3 | `D.route` | chaussée h 80–170, bas-côté h 170–200, piquets x 590–1000 (h 200–250) |
| 4 | `D.lampadaire` | pied (300, h 172) ; lanterne (372, h 600) ; cône jaune jusqu'à la chaussée (x 230–540) |
| 5 | `D.brume` × 2 | h 210–260, dérive lente |
| 6 | `D.papillons` | autour de (372, h 600) |
| 7 | `VEL` (× 0,8) sur `D.velo` (`ebike: true`, × 0,8, tourné vers la gauche) | roues sur h 110 ; phare allumé |
| 8 | `GAR` (× 0,8) sur `D.velo` (× 0,8, tourné vers la droite) | roues sur h 110 |

**HUD :** mention « laut Presse » ; horloge 0 h 20 + « nach Mitternacht » / « من بعد نص الليل » ; pastille A.

**Construction** (sous l'encre qui se retire, à partir de t0 = `b5-0.10`) : lampadaire `growY` (pivot au pied)
à t0 + 0,25 ; arbre `growY` à t0 + 0,30 ; piquets `rise` à t0 + 0,35 ; brume en fondu à t0 + 0,40.

| instant | ce qui se passe |
|---|---|
| `b5` (22,50) | l'horloge jaillit sur la ligne avec son étiquette |
| `b5@نص` (22,95) | le lampadaire s'allume (deux hésitations), le cône tombe sur la route, les papillons arrivent |
| `b5@الليل` (23,15) | `GAR` entre par la gauche à vélo : de x 60 à x 505 (jusqu'à `b5@طاح-0.08`), en zigzag (le vélo penche de ± 4° à 1,3 Hz, de plus en plus) |
| `b5@عندو` (23,74) | `VEL` entre par la droite : de x 1000 à x 610, droit, phare en avant |
| `b5@6` (24,04) | pastille A « 18 Jahre » (taille 34) |
| `b5@طاح` (24,49) | **le choc**, juste à droite du cône de lumière : les deux vélos s'arrêtent net ; le lampadaire grésille ; le vélo de `GAR` bascule (0,3 s), `GAR` passe à genoux à x 470 (`Persona.mix` de la pose « à vélo » vers « à genoux », 0,3 s) ; trois petits arcs de poussière grise au ras de la route (0,4 s) ; `VEL` met pied à terre : debout à x 730, une main sur son guidon, `shock`. **Pas de `c.shake`** |
| `b6@برا` (25,54) | l'étiquette « من برا » jaillit sur la ligne (première fois) |
| `b6@سكران` (25,79) | pastille A → « mehr als 1,9 Promille » / « كثر من 1,9 ‰ فالدم » (taille 28) ; `GAR` relève une tête qui roule, joues rouges |
| `b6@ناض` (26,14) | il se relève (à genoux → debout, 0,3 s), vacille |
| `b6@ومشى` (26,39) | il s'éloigne vers la GAUCHE en titubant, de x 470 à x 360, et traverse le cône du lampadaire ; `VEL` tend la main, le suit des yeux |

**Vie :** brume, papillons, arbre, touffes du bas-côté, fenêtres lointaines, souffle de la ligne, halo du phare.
**Vérité :** la collision avec un vélo électrique vient d'un seul article (la voix dit seulement « il est
tombé ») : la mention « laut Presse » reste affichée. **Ni pluie ni flaque** : rien qui explique la chute.
Aucune plaie, aucun sang. Le garçon ne se tient pas la tête. **Affiche :** image à `b6@كيتمايل`.

---

### S6 — DEDANS : l'os est cassé (b7 · 27,11 → 29,56)

**À comprendre :** pendant qu'on voit un garçon ivre couché dans l'herbe, à l'intérieur l'os du crâne est cassé.
C'est la première fois que la moitié basse s'ouvre.
**Entrée :** `ENCRE-HAUT` à `b7-0.30` (sur le souffle de la voix). **Ligne :** monte de 1030 à 640 à partir de
`b7-0.06`. Scène dessinée pour `ref: 640` ; `refrains: "deux"`, `crane: true`.

**Moitié haute — le pré, en (x, h) ; bande visible h 0–370.**

| couche | objet | position |
|---|---|---|
| 1 | `D.nuit` | de h 200 vers le haut |
| 2 | `D.arbreNuit` × 2 | pieds (150, h 200) et (940, h 200) |
| 3 | `D.lampadaire` lointain (× 0,3), allumé | pied (190, h 205) : c'est celui de la route, cent mètres en arrière |
| 4 | `D.brume` | h 215–250 |
| 5 | `D.velo` (`ebike`, × 0,72), debout sur sa béquille, phare vers la gauche | (900, h 172) |
| 6 | `D.gisant` (`tenue: "dehors"`, × 0,85, `marque: true`) | ancre (400, h 96) : tête x 400–490, pieds x 740 |
| 7 | `VEL` à genoux (× 0,72, `PP.kneel`, `facing: -1`) + casque | pieds (800, h 92) ; sommet à h 352 ; sa main sur la jambe du garçon |
| 8 | `D.pre` (herbe du premier plan) | h 0–120, devant le corps ; trace de pas de (210, h 150) à (400, h 130) ; « ≈ 100 m » en (300, h 178) |

**Moitié basse :** la coupe du crâne (échelle 1,05, centre (470, 1090)). Pastille B « Schädelbruch » / « هرس فعظم
الراس » (taille 34, x 264–536). Étiquette « Schema » + « رسم توضيحي ».

| instant | ce qui se passe |
|---|---|
| `b7-0.30` (27,11) | l'encre monte sur la route ; `b7-0.06` : la ligne monte ; l'encre se retire sur le pré : le garçon est couché dans l'herbe, l'autre cycliste est à genoux près de lui |
| `b7+0.05` (27,46) | en bas, la coupe du crâne **se dessine** (`m.build "grow"`, pivot au centre, 0,45 s) ; la trace de pas « ≈ 100 m » se trace en haut |
| `b7+0.3` | étiquette « Schema » |
| `b7@الداخل` (27,61) | l'étiquette « من الداخل » jaillit sous la ligne (première fois), surlignée ; « من برا » passe à 45 % |
| `b7@العظم` (28,00) | la bande de l'os s'épaissit puis revient (0,5 s) : on le montre du doigt sans flèche |
| `b7@الراس` (28,64) | **la fracture se trace** (0,25 s) ; `c.shake("b7@الراس", 7, 0.3)` ; deux éclats d'os |
| `b7@الراس+0.1` | pastille B + une flèche à main levée de (268, 742) à (178, 1005), le long du bord gauche de la coupe |
| `b7@تهرس` (28,99) | les deux éclats bougent de 4 px ; à l'EXTÉRIEUR de la coupe, la petite marque de la peau s'entoure d'un rond jaune qui pulse une fois : c'est tout ce qu'on voit du dehors |

**Vie :** herbe (`m.sway`), `VEL` qui regarde autour de lui, respiration du garçon, brume, phare, pouls de la
coupe, souffle de la ligne. **Vérité :** on ne sait pas qui a appelé les secours : `VEL` n'a pas de téléphone.
**Affiche :** image à `b7@end`.

---

### S7 — 2 H : l'ambulance, les urgences (b8 · 29,56 → 31,83)

**À comprendre :** peu après 2 h, l'ambulance le dépose aux urgences d'un hôpital de Friedrichshafen.
**Entrée :** `ENCRE-HAUT` à `b8-0.15`. **Ligne :** redescend de 640 à 1030 (0,45 s) sous l'encre. `ref: 1030`.
La pastille B se masque à `b8-0.15`. En bas : la coupe redevient petite, la fracture reste.

**Moitié haute, en (x, h).**

| couche | objet | position |
|---|---|---|
| 1 | `D.nuit` | de h 430 vers le haut |
| 2 | `D.arbreNuit` | pied (180, h 190), hauteur 300 |
| 3 | `D.urgencesFacade` | coin bas gauche (380, h 80) : mur x 380–1040 jusqu'à h 620 ; auvent x 430–900 à h 420–450 ; caisson « Notaufnahme » x 520–820, h 452–512 ; portes vitrées x 590–790, h 80–400 ; haie x 110–260 ; bornes x 300, 330, 360 |
| 4 | brancard miniature : `D.brancard` × 0,5 + `D.gisant` × 0,5 (`tenue: "drap"`) + `D.silhouette` (× 0,6, pose « pousse ») | sort de l'arrière de l'ambulance en (575, h 80), roule jusqu'à (700, h 80), disparaît dans la lumière des portes |
| 5 | `D.rtw`, **avant tourné vers la gauche** | arrive par la droite et s'arrête, l'arrière en x 570 (elle occupe x 240–570) |
| 6 | `D.miniCarte` (`ville: "Friedrichshafen"`) | centre (230, 430) en pixels d'écran (calque `c.hud`) |

**HUD :** mention « laut Presse » ; pastille A « Notaufnahme » / « المستعجلات » (taille 34).

| instant | ce qui se passe |
|---|---|
| `b8-0.10` (29,61) | les aiguilles filent jusqu'à 2 h 05 (0,6 s) ; étiquette « kurz nach 2 Uhr » |
| `b8` (29,71) | l'ambulance entre (0,85 s, `out`), feux blancs et jaunes en alternance, tangage de 2 px |
| `b8@للمستعجلات` (30,31) | pastille A ; le caisson « Notaufnahme » grésille une fois |
| `b8@للمستعجلات+0.25` | l'ambulance est arrêtée ; sa porte arrière s'ouvre (0,25 s) ; les portes vitrées coulissent (0,3 s), la lumière se répand au sol |
| `b8@Friedrichshafen` (30,90) | la mini-carte jaillit en haut à gauche, ondes sous l'épingle ; le brancard roule vers les portes (0,65 s) |

**Vie :** feux de l'ambulance + `m.rays(…, { R: 70, op: 0.35, speed: 40 })`, lumière des portes, arbre, haie.
**Si le temps manque à la construction :** le brancard miniature peut être supprimé (l'ambulance et les portes
suffisent). **Affiche :** image à `b8@end`.

---

### Mise en place FIXE « le box des urgences » (S8 à S16, S29) — en (x, h)

Une seule fonction `box(c, m, dp, { construire: t0 | null })`. Vérifiée sur `out/essais/essai_diptyque.png`.

| couche (arrière → avant) | objet | position |
|---|---|---|
| 1 | `D.boxMur` | mur h 80–780 ; bande de protection h 250–264 ; prises x 380–520, h 300–330 ; renfoncement du couloir à droite de x 700 |
| 2 | `D.porteFond` « CT » | x 715–815, de h 130 à h 380 ; plaque x 720–810, h 392–432 |
| 3 | `D.porteFond` « Intensiv » | x 840–940, de h 130 à h 380 ; plaque x 833–937, h 392–432 |
| 4 | `D.rail` + `D.rideau` | rail h 748, x 120–690 ; rideau x 112–232, de h 742 à h 96 |
| 5 | `D.alarmeMurale` | bouton (640, h 470), gyrophare au-dessus (h 505–530) |
| 6 | `D.lampeExamen` | platine (470, h 760) ; tête (410, h 580) ; cône vers l'oreiller (x 250–470, h 200–300) |
| 7 | personnages debout **derrière le lit** | `DOC` x 430 ; `PFL` ou `ANA` x 575 ; pieds h 80, échelle 0,95 (sommet des têtes à h 495, mentons à h 362 : le lit les cache jusqu'à la taille) |
| 8 | `D.scope` | pied (178, h 80) ; écran x 113–243, h 257–353 ; câble de (243, h 290) à la poitrine (455, h 262) |
| 9 | `D.brancard` | x 255–695 ; matelas à h 196 ; oreiller x 262–372 |
| 10 | `D.gisant` (`tenue: "drap"`, `marque: true`) | ancre (272, h 198) : tête (318, h 246), pieds x 660 |
| 11 | `D.planchette`, accrochée à la barrière, côté pied | pince (610, h 215) (x 562–658, h 85–215) ; « Verdacht » en x 568–652, h 185–205 |
| 12 | `D.autocollant` | centre (505, h 196) : il couvre « Verd » et laisse « acht » |

Emplacements : pastille A (680, 322) ; médaillon G centre (245, 455), r 118, queue vers la tempe ; médaillon D
centre (800, 450), r 110, avec sa plaque blanche 250 × 88 centrée (800, 606) (elle couvre les deux plaques de
porte le temps du médaillon). En position « dedans », seuls restent visibles : le lit, le garçon, la planchette,
l'autocollant, le bas du rideau, l'écran du moniteur, le bas des deux portes.
**Ce qu'il n'y a pas dans ce box :** de perfusion, de seringue, de comprimé, d'horloge murale, de numéro de box.

**Vie du box (toujours) :** tracé du moniteur ; respiration du garçon ; rideau (`m.sway` 0,7°, 3,8 s) ; lampe
(idle 0,4°) + poussière dans le faisceau ; voyants des deux plaques (1 Hz) ; planchette (idle 0,5°).

---

### S8 — LE BOX : du dehors, une marque (b9 · 31,83 → 33,68)

**À comprendre :** la médecin l'examine ; du dehors on ne voit qu'une petite marque de coup.
**Entrée :** `ENCRE-HAUT` rapide à `b9-0.10` (`inDur: 0.18`, retrait fini à t0 + 0,55). **Ligne :** 1030.
`box(…, { construire: t0 })` : sous l'encre, le rideau entre en `swing` (t0 + 0,12), la lampe en `drop`
(t0 + 0,15, 200 px) puis `m.pend` 5°, le moniteur roule en `left` (t0 + 0,22), les deux portes en `growY`
(t0 + 0,26 et + 0,32). `LUM` = 1.

`DOC` (`coat`, stylo dans le chignon) : x 430, derrière le lit, pose « penchée » ; `D.lampeStylo` dans la main
d'écran gauche.

| instant | ce qui se passe |
|---|---|
| `b9@برا` (32,13) | impulsion de « من برا » |
| `b9@غير` (32,38) | elle se penche ; la lampe-stylo s'allume : petit faisceau jaune de sa main (340, h 284) à la tempe (318, h 246) |
| `b9@علامة` (32,63) | **médaillon G** : `D.teteProfil` (la tempe en gros plan) ; à `+0.2`, un cercle en pointillés se trace autour de la petite marque |
| `b9@ضربة-0.2` (33,07) | pastille A « „nur ein Prellpunkt" » / « غير علامة ديال ضربة » (taille 30, x 486–874) ; `DOC` relève un peu la tête, `worried` |

**HUD :** mention « laut Presse ». **Vérité :** la marque est petite, sans plaie ni sang ; la source ne dit pas
où elle se trouve (la tempe est un choix de dessin). **Affiche :** image à `b9@end`.

---

### S9 — LE BOX : le doute écrit, pas de scanner, la surveillance (b10 · 33,68 → 37,01)

**À comprendre :** elle soupçonne une blessure de la tête et l'ÉCRIT ; mais elle ne fait pas de scanner :
seulement une surveillance. (Elle n'a jamais « cru qu'il était seulement ivre ».)
**Entrée :** `cut` à `b10`. **Ligne :** 1030. `box(…, { construire: null })`.

| instant | ce qui se passe |
|---|---|
| `b10` (33,68) | elle se redresse ; `b10+0.1` : le médaillon G (la tempe) se referme ; la pastille de S8 se masque |
| `b10@شكات` (34,12) | main au menton, `worried` ; `b10@فالراس` : elle regarde la tête du garçon |
| `b10@وكتباتها-0.25` (34,56) | elle tire le stylo jaune de son chignon (`reachR` vers `top`, 0,2 s) ; la planchette est dans sa main gauche |
| `b10@وكتباتها` (34,81) | elle écrit (pose « elle écrit ») ; **médaillon G** : `D.feuilleGros` (`mode: "verdacht"`) — sous « Alkohol », la ligne « Verdacht: Schädelverletzung ? » s'écrit (0,6 s) |
| `b10@وكتباتها+0.2` | pastille A « Verdacht » / « الشك » (taille 34) |
| `b10@ولكن` (35,30) | elle lève les yeux vers la porte « CT », au fond |
| `b10@بلا` (35,60) | la plaque « CT » a un faux départ (une lueur qui s'éteint, 0,3 s) ; dans le médaillon, la ligne « CT: — » s'écrit |
| `b10@Scanner` (35,85) | pastille A → « kein CT » / « بلا Scanner » (taille 34) ; la plaque reste sombre |
| `b10@غير` (36,29) | le médaillon se referme ; elle accroche la planchette à la barrière du lit (`m.pend` 9°) ; le stylo retourne dans le chignon |
| `b10@المراقبة` (36,54) | pastille A → « Beobachtung » / « المراقبة » (taille 34) |
| `b10@المراقبة+0.06` | elle sort vers la droite (cycle de marche, 520 px/s) en se retournant une fois ; `b10@المراقبة+0.1` : la lampe baisse (`LUM` → 0,45) |

**HUD :** mention « laut Presse » ; sous le médaillon « feuille », en petit (Kalam 18, centre (245, 592)) :
« Rekonstruktion » (le soupçon noté est sourcé, ses mots exacts ne le sont pas).
**Affiche :** image à `b10@المراقبة+0.3`.

---

### S10 — DEDANS : le sang s'accumule sous l'os (b11 · 37,01 → 39,46)

**À comprendre :** pendant qu'on le surveille, l'encre commence à s'étaler sous l'os.
**Entrée :** `ENCRE-HAUT` à `b11-0.30` : l'encre cache la sortie de la médecin ; quand elle se retire, la ligne
est montée et le haut n'est plus qu'une bande : le garçon seul sur son lit, lumière baissée. `ref: 640`.

| instant | ce qui se passe |
|---|---|
| `b11-0.06` (37,25) | la ligne monte (0,5 s) ; la coupe grandit |
| `b11@الداخل` (37,51) | impulsion de « من الداخل » |
| `b11@الدم` (37,91) | **une perle d'encre** à la fracture (`ENC` 0,04) ; trois gouttelettes glissent le long du bord intérieur de l'os |
| `b11@كيتجمع` (38,20) | l'encre s'étale en lentille (`ENC` → 0,22 en 1,2 s) ; pastille B « Blutung zwischen Schädelknochen und Hirnhaut » / « الدم تحت عظم الراس » (taille 22, x 124–676) ; la ligne commence à pencher (1,5°) |
| `b11@تحت` (38,60) | la bande de l'os, au-dessus de l'encre, s'épaissit puis revient |
| `b11@العظم` (38,85) | une flèche à main levée de la pastille à la lentille : de (150, 772) à (190, 985) |

**Haut (bande) :** rien ne se passe — c'est le propos : il respire, le tracé du moniteur défile, la planchette
pend. **Vérité :** aucun horaire du saignement n'est publié ; l'encre ne porte ni chiffre ni graduation ;
« Schema » reste affiché. **Affiche :** image à `b11@end`.

---

### S11 — 3 H : la soignante le voit s'agiter (b12 · 39,46 → 41,76)

**À comprendre :** à 3 h, la soignante de nuit remarque qu'il est plus agité.
**Entrée :** `cut` à `b12-0.15` (même lieu : le haut, vide de personnages, est identique dans S10 et S11).
**Ligne :** redescend à 1030 (0,45 s). `ref: 1030`. La pastille B se masque à `b12-0.15`.

| instant | ce qui se passe |
|---|---|
| `b12-0.10` (39,51) | les aiguilles passent à 3 h (0,5 s), étiquette « 3 Uhr » ; la lampe remonte un peu (`LUM` → 0,7) ; `PFL` entre par la droite (du couloir), en marchant : de x 980 à x 575 (0,9 s), **derrière le lit** |
| `b12@الفرملية` (39,97) | pastille A « Pflegekraft » / « الفرملية ديال الليل » (taille 34) |
| `b12@شافتو-0.3` (40,16) | le garçon **s'agite** (`AGITE` → 0,7) : la tête roule, un bras se soulève et retombe, la couverture se froisse, les roues du lit tressautent |
| `b12@شافتو` (40,46) | `PFL` s'arrête net, `worried`, une main sur la poitrine, le regarde |
| `b12@agité` (41,05) | pastille A → « „verstärkte Unruhe" » / « ولى agité كثر » (taille 30) |
| `b12@كثر` (41,40) | `PFL` penche la tête ; elle ne fait rien d'autre |

**HUD :** mention « laut Presse ». **En bas :** l'encre continue de gagner, lentement (`ENC` 0,22 → 0,42 jusqu'à
b15), dans la petite coupe.
**Vérité :** on ne sait pas ce que la soignante a fait ensuite : **pas de téléphone, pas de dialogue, aucune
flèche vers la scène suivante**. Le rythme du moniteur ne change pas (rien n'est publié).
**Affiche :** image à `b12@end`.

---

### S12 — CETTE NUIT-LÀ : l'anesthésiste (b13–b14 · 41,76 → 48,07)

**À comprendre :** cette nuit-là (l'heure n'est pas connue), la médecin demande l'avis d'un anesthésiste ;
selon la presse il vient, le regarde, ne le prend pas aux soins intensifs et dit de le laisser dormir.
**Entrée :** `cut` à `b13`. **Ligne :** 1030. `PFL` n'est plus là ; `DOC` est debout derrière le lit (x 430) :
le changement de personnage sur un `cut` dit qu'on a changé de moment, sans dire lequel.

**L'horloge s'efface** à `b13-0.1` : cadran en pointillés, aiguilles grises, étiquette « Uhrzeit: nicht
berichtet » / « الساعة ما معروفاش ». Elle reste ainsi jusqu'à la fin de la scène.

| instant | ce qui se passe |
|---|---|
| `b13` (41,76) | `DOC` regarde le garçon (encore un peu agité : `AGITE` 0,35), `worried` ; `LUM` 0,85 |
| `b13@سولات` (42,89) | elle lève la tête vers la droite, main ouverte ; un pointillé se trace de (480, 600) à (690, 470) (pixels d'écran) ; à `+0.1`, la petite carte « ? » file le long du pointillé (0,4 s) |
| `b13@Anästhesist` (43,24) | **médaillon D** (centre (800, 450), r 110) : la tête d'`ANA` (× 1,25) + masque au cou ; à `+0.1`, sur la plaque blanche : « Anästhesist » (Kalam 28) |
| `b13@6` (44,17) | 2e ligne de la plaque : « طبيب البنج » (Plex gras 26) |
| `b14-0.05` (44,87) | médaillon, plaque et pointillé se referment |
| `b14` (44,92) | `ANA` **entre** par la droite, en marchant : de x 1000 à x 575 (0,75 s), derrière le lit |
| `b14@شافو` (45,81) | il se penche sur le garçon et le regarde (0,5 s) : `focused` |
| `b14@قبلوش` (46,31) | il se redresse, main à plat, secoue la tête deux fois ; `DOC` : `sad` |
| `b14@فالإنعاش` (46,66) | pastille A « Intensivstation » / « الإنعاش » (taille 30) ; autour de la porte « Intensiv », un liseré jaune fait le tour une fois et s'éteint : elle reste fermée |
| `b14@وقال` (47,15) | la pastille se masque ; `ANA` se tourne vers `DOC`, parle (`talk`) |
| `b14@خليوه` (47,45) | **la bulle** (`m.speech`, rangée dans `dp.gH`) : centre (660, 440), 330 × 128, pointe (590, 632) sur sa bouche ; « „ausschlafen lassen" » (Kalam 34, dy −12) et « خليوه ينعس » (Plex gras 30, dy 34) ; `DOC` regarde le garçon, `worried` |
| `b14@خليوه+0.15` (47,60) | **l'autocollant « betrunken / سكران » tombe** du haut du cadre — de personne — et se colle sur le lit : de (505, h 760) à (505, h 196) en 0,35 s, rotation −30° → −8°, rebond ; il recouvre « Verd » de « Verdacht » |

**HUD :** mention « laut Presse · Rekonstruktion » pendant toute la scène.
**Vérité :** ce médecin n'a pas été poursuivi : aucun geste désinvolte, aucun sourire. PAS de seringue, de
comprimé, de perfusion (le médicament a deux versions et n'est jamais nommé). PAS d'interniste. L'autocollant
ne sort ni de sa main à lui, ni de sa main à elle. **Affiche :** image à `b14@ينعس+0.2`.

---

### S13 — DEDANS : le sang ne dort pas (b15 · 48,07 → 50,78) — le médical expliqué en image

**À comprendre :** la boîte crânienne ne s'agrandit pas : l'encre qui entre prend la place du cerveau et le
pousse. Un seul schéma, lent, sans chiffre.
**Entrée :** `ENCRE-HAUT` à `b15-0.30` : l'encre cache les deux médecins ; quand elle se retire, la ligne est
montée, le haut est une bande : le garçon dort sous son autocollant, lumière basse (`LUM` 0,4).
`ref: 640`. L'horloge redevient pleine (3 h), **sans étiquette**.

| instant | ce qui se passe |
|---|---|
| `b15-0.06` (48,31) | la ligne monte (0,5 s), la coupe grandit (échelle 1,05) |
| `b15@الداخل` (48,57) | impulsion de « من الداخل » |
| `b15@الدم` (48,96) | sur la coupe : « Blut » + « الدم », à gauche, dehors, avec un trait court vers la lentille |
| `b15@كينعسش` (49,46) | l'encre gonfle (`ENC` → 0,62 en 0,8 s) ; ses gouttelettes s'agitent ; en haut, le garçon ne bouge presque plus |
| `b15@كيضغط` (49,86) | **elle pousse** : `ENC` → 0,78 avec un petit dépassement ; le bord de l'hémisphère gauche recule, son ventricule s'écrase, la ligne du milieu se bombe vers la droite ; à l'intérieur de l'os, côté droit, cinq petits traits pulsent trois fois (`rigide`) : la boîte ne cède pas ; **la ligne de l'écran penche** (1,5° → 4°) |
| `b15@كيضغط+0.2` | « Knochen » + « العظم » au-dessus de la voûte ; le contour de l'os s'épaissit |
| `b15@المخ` (50,45) | « Gehirn » + « المخ » dans l'hémisphère droit |

Pas de pastille B dans cette scène : les trois petites étiquettes suffisent ; elles restent en S14.
**Vérité :** aucun volume, aucune pression, aucune minute. La ligne qui penche est une image.
**Affiche :** image à `b15@end`.

---

### S14 — TROIS HEURES (b16 + respiration · 50,78 → 53,25)

**À comprendre :** pendant trois heures, personne ne s'occupe vraiment de lui. Les deux moitiés à égalité.
**Entrée :** `cut` à `b16-0.08`. **Ligne :** descend à 870 (0,45 s) et continue de pencher (4° → 5,5°).
`ref: 870`. En haut : le box sans personne. En bas : la coupe (échelle 0,86), `ENC` 0,78 → 0,95.

| instant | ce qui se passe |
|---|---|
| `b16` (50,86) | l'horloge : étiquette « 3 Stunden » ; **les aiguilles tournent de 3 h à 6 h** sans s'arrêter (jusqu'à `b16@end+0.25`) ; un secteur jaune s'ouvre derrière elles |
| `b16@سوايع` (51,01) | au fond, dans le couloir, une première ombre passe (`D.silhouette`, opacité 0,3, de x 1040 à x 700, 0,9 s) sans tourner la tête |
| `b16@واحد` (51,61) | **médaillon D** (centre (800, 440), r 110) : `D.feuilleGros` (`mode: "pupillen"`) ; sur la plaque blanche (centre (800, 596)) : « Pupillen: — » (Kalam 28) et « الخانة خاوية » (Plex gras 26) |
| `b16@واحد+0.3` | une deuxième ombre : elle **s'arrête** au seuil du box (x 720), tourne la tête vers le lit 0,4 s, repart |
| `b16@مزيان` (52,66) | le médaillon et sa plaque se referment ; une troisième ombre passe |
| `b16@مزيان+0.1` (52,76) | **citation** (étiquette blanche du HUD, x 110–620, y 336–452, avec une petite icône de moniteur) : « „Wenn der Monitor … warnt, ist es zu spät." » (Kalam 22, ligne de base y 372) ; « ملي كيصوني الـMonitor، كيكون فات الحال » (Plex gras 28, y 414 — chaîne à valider) ; « laut Presse (Gutachter) » (Kalam 18, y 440). Elle reste pendant la respiration et jusqu'à `b17+0.45` (dans S15) |
| `b16@end` → `b17-0.45` | **0,25 s sans voix dans cette scène** (le reste de la respiration est dans S15) : les aiguilles arrivent sur 6 h ; le garçon ne bouge plus du tout (`AGITE` 0) |

**HUD :** mention « laut Presse » (obligatoire sur cette image).
**Vérité :** la deuxième ombre s'arrête exprès : la source dit que personne ne s'est occupé de lui
« intensivement », pas que personne n'est passé. La case vide veut dire « non notée » : on ne sait pas si le
contrôle a été fait — ne jamais écrire « jamais contrôlé ». Le moniteur ne montre AUCUNE alarme.
**Affiche :** image à `b16@مزيان`.

---

### S15 — 6 H : l'alarme (b17 · 53,25 → 56,77)

**À comprendre :** à 6 h, la médecin et la soignante déclenchent l'alarme de réanimation ; il faut le ventiler.
**Entrée :** `cut` à `b17-0.45` (au milieu de la respiration de la voix). **Ligne :** redescend à 1030 (0,4 s),
pente 6°. `ref: 1030`. La citation de S14 est toujours là (même étiquette, même place) jusqu'à `b17+0.45`.

| instant | ce qui se passe |
|---|---|
| `b17-0.30` (53,40) | la lampe se rallume en grand (`LUM` → 1) |
| `b17-0.25` (53,45) | `DOC` et `PFL` **arrivent en courant** par la droite (cycle de marche rapide, 2,6 cycles/s, buste penché) : `DOC` de x 1000 à x 430, `PFL` de x 1060 à x 575, en 0,7 s |
| `b17-0.20` | étiquette de l'horloge : « 6 Uhr » |
| `b17@الطبيبة` (54,06) | `DOC` se penche (pose « penchée »), lampe-stylo sur les yeux du garçon : `focused` puis `shock` |
| `b17@والفرملية` (54,50) | `PFL` regarde `DOC`, puis le mur |
| `b17@دارو` (55,03) | `PFL` **frappe le bouton d'alarme** (main sur (640, h 470)) : le gyrophare jaune s'allume (3 Hz) + rayons ; `c.shake("b17@دارو", 6, 0.3)` ; la ligne tremble ; le coin de l'autocollant se décolle (`PEEL` → 0,5) |
| `b17@alarme` (55,33) | pastille A « Herzalarm » / « alarme ديال Réanimation » (taille 34) |
| `b17@Réanimation` (56,02) | `DOC` pose le masque sur son visage et presse le ballon (`D.ballon`, une pression toutes les 2,5 s) ; `sweat` |
| `b17@Réanimation+0.25` | pastille A → « Beatmung » / « التنفس الاصطناعي » (taille 34) |

**En bas :** la tache est à son plus large (`ENC` → 1,0), gouttes sous la ligne.
**HUD :** mention « laut Presse ». **Aucun voile rouge**, aucune alarme sur l'écran du moniteur.
**Affiche :** image à `b17@end`.

---

### S16 — LE SCANNER : les deux moitiés n'en font plus qu'une (b18 · 56,77 → 59,65)

**À comprendre :** c'est seulement maintenant qu'on fait le scanner — et ce qui était dedans apparaît. La seule
fois où les deux récits se rejoignent.
**Entrée :** `cut` à `b18`. **Ligne :** monte jusqu'en haut de l'écran (262) et disparaît.

| instant | ce qui se passe |
|---|---|
| `b18@الساعة` (57,31) | **la plaque « CT » s'allume enfin** (deux hésitations, puis jaune franc) + petits rayons ; la pastille A se masque |
| `b18@دارو` (57,71) | la porte « CT » s'ouvre (0,35 s) ; le lit roule vers elle (le groupe lit + garçon + ballon glisse de 250 px vers la droite en 0,6 s, roues qui tournent), `DOC` et `PFL` marchent à côté ; **l'autocollant se détache** (`PEEL` → 1) et tombe au sol (calque `dp.sur`) |
| `b18@Scanner-0.10` (57,91) | **la ligne monte** de 1030 à 262 en 0,7 s et se redresse (pente → 0) ; le haut glisse hors du cadre ; l'étiquette « من برا » tombe ; « من الداخل » glisse en (560, 316) ; la coupe grandit jusqu'à l'échelle 1,45, centre (500, 880) |
| `b18@Scanner+0.4` | l'horloge, arrêtée en (150, 372) : « ≈ 6:30 Uhr » (étiquette centrée (330, 372)) |
| `b18@Scanner+0.5` | un **cadre « CT »** se trace autour de la coupe : rectangle arrondi x 110–890, y 440–1300, quatre repères d'angle, « CT » (Kalam 24) en (150, 478) |
| `b18@بان` (58,45) | une **barre de balayage** jaune (6 px, toute la largeur du cadre) descend de y 450 à y 1290 en 0,6 s ; derrière elle, les deux pastilles arrivent : « Schädelbruch » / « هرس فعظم الراس » (taille 30, centre (700, 392), x 576–824) avec une flèche qui longe le haut et la gauche du cadre jusqu'à la fracture — de (576, 400) à (130, 400) puis (140, 770) ; et « Blutung zwischen Schädelknochen und Hirnhaut » / « الدم تحت عظم الراس » (taille 22, centre (500, 1330), x 224–776, arabe ≤ y 1400) |
| `b18@الداخل` (59,20) | impulsion de « من الداخل » ; le bord de la lentille d'encre pulse une fois |

**HUD :** mention « laut Presse ». L'encre reste noire (on ne passe pas en négatif : l'encre est le sang depuis
le début). **Affiche :** image à `b18@end`.

---

### S17 — UN AUTRE HÔPITAL, 8 H 40 (b19 · 59,65 → 61,93)

**À comprendre :** on l'emmène dans un autre hôpital ; il entre au bloc à 8 h 40. La voix s'arrête là.
**Entrée :** `ENCRE-TOUT` à `b19-0.05`. Plein cadre, pas de ligne. Mise en place « carte du lac » (le
cartouche à la même place qu'en S4), **sans** le médaillon de l'Allemagne.

| couche | objet | position (écran) |
|---|---|---|
| 1 | `D.carteLac` (`actif: { rav }`, `route`) | cartouche (110, 690) ; épingle sur Friedrichshafen (580, 994), sans pastille de nom |
| 2 | `D.helico`, **posé** sur un « H » | patins en (480, 950) (il occupe x 385–575, y 840–950), sur la terre |
| 3 | pastille « Hubschrauber alarmiert » / « عيطو على hélicoptère » (taille 26) | centre (340, 745) (x 162–518) ; arabe ≤ y 815 |
| 4 | `D.horlogeGrande` (r 60) | centre (800, 420) |
| 5 | pastille « OP · 8:40 Uhr » / « البلوك » (taille 30) | centre (800, 540) (x 669–931) ; arabe ≤ y 610 ; un trait fin de (760, 615) à Ravensburg (713, 802) |

| instant | ce qui se passe |
|---|---|
| `b19-0.05` (59,65) | l'encre couvre le scanner, se retire sur la carte ; l'horloge marque 6 h 30 |
| `b19@داوه` (59,70) | les pales de l'hélicoptère tournent ; pastille « Hubschrauber alarmiert » |
| `b19@لسبيطار` (60,00) | le **pointillé** part de Friedrichshafen vers Ravensburg (0,9 s), un petit point en tête ; les aiguilles de la grande horloge se mettent à tourner (jusqu'à `b19@8:40`) |
| `b19@آخر` (60,44) | Ravensburg passe en encre + halo jaune |
| `b19@للبلوك` (60,99) | le point arrive à Ravensburg : ondes (`m.ripple`, R 90) |
| `b19@8:40` (61,58) | les aiguilles s'arrêtent sur 8 h 40 ; pastille « OP · 8:40 Uhr » ; plus rien ne bouge que les vagues |

**HUD :** mention « laut Presse ». **Vérité :** l'hélicoptère a été « alerté » ; le transport en hélicoptère
n'est pas écrit : **il reste au sol**, ce n'est pas lui qui suit le pointillé. On écrit la ville (Ravensburg),
jamais l'hôpital. **Affiche :** image à `b19@end`.

---

### S18 — SCÈNE MUETTE : il n'a pas survécu (silence · 61,93 → 64,89)

**À comprendre, sans un mot :** il est mort. Ni heure, ni lieu, ni délai (la presse donne deux versions).
**Entrée :** `fade` 0,45 à `b19@end+0.1`. **Ligne :** revient à 870, **penchée à 6°** comme elle l'a été toute la
nuit. `ref: 870`, pas d'horloge, pas d'étiquettes-refrain, pas de mention. Aucun sous-titre (pas de beat).
Posons `z = b19@end` (61,83).

**Moitié haute — un lieu neutre, en (x, h) ; visible h 0–600.**

| couche | objet | position |
|---|---|---|
| 1 | `D.chambreNeutre` | mur de h 80 à h 600, tache de lumière x 520–760, h 250–520 |
| 2 | `D.veilleuse` | (330, h 430) |
| 3 | `D.scope` | pied (150, h 80) |
| 4 | `D.litNeutre` | sol, milieu (470, h 80) (x 240–700) ; matelas à h 200 |
| 5 | `D.gisant` (`tenue: "drap"`, `col: "blouse"`, sans marque) | ancre (255, h 200) |
| 6 | `D.chaiseSweat` | pieds (800, h 80) |

**Moitié basse :** la coupe du crâne, ici à l'échelle 0,75, centre (523, 1140) (y 930–1350), pour laisser la
place à la phrase.

| instant | ce qui se passe |
|---|---|
| `b19@end+0.1` | fondu ; le garçon est couché, les yeux fermés ; sa poitrine se soulève à peine ; la veilleuse est allumée ; en bas, l'encre commence à envahir toute la boîte (`PLEIN` 0 → 1 de `b19@end+0.3` à `b19@end+2.2`) |
| `b19@end+0.45`, `b19@end+1.0`, `b19@end+1.65` | **trois battements, de plus en plus espacés** : à chacun, un complexe naît sur la ligne (mode ECG) et file vers la droite ; le même sur l'écran du moniteur ; le troisième est plus petit (pic de 20 px) |
| `b19@end+2.05` | plus de battement : la ligne de base, seule. **Tout se fige** (`VIE` → 0 en 0,9 s) : la poitrine, les cordons du sweat sur la chaise, la poussière ; la veilleuse s'éteint ; l'encre ne bouge plus |
| `b19@end+2.15` | **la ligne se redresse** (6° → 0° en 0,8 s) : c'est elle, la ligne plate |
| `b19@end+2.05` → `+3.05` | la couleur s'éteint : `c.layer.style.filter = grayscale(0 → 0.85)` |
| `b19@end+2.2` | la phrase s'écrit de droite à gauche (0,5 s), dans le HUD : **« ما عاشش · 18 عام »** (`ttl`, 72 px, centre (540, 1440)) ; dessous, « laut Presse » (Kalam 22, centre (540, 1486)) |

**Ce qui n'est pas dans cette scène :** les parents (ils ne sont sourcés qu'au tribunal), la médecin, la
soignante, une horloge, une date, un nom de ville, le mot « bloc » ou « urgences ».
**Affiche :** image à `b19@end+2.9`.

---

### S19 — 2026 : TETTNANG, À L'AUBE (b20 · 64,89 → 67,41)

**À comprendre :** presque trois ans plus tard, la médecin est devant le tribunal de Tettnang.
**Entrée :** `fade` 0,6 à `b20-0.25` : on sort du gris, le jour se lève. Plein cadre, poussée lente. C'est la
forme imposée du tribunal : **petit tribunal de province vu de la rue, au petit matin.**

| couche | objet | position (écran) |
|---|---|---|
| 1 | `D.aube` | (40, 270), 1000 × 880 ; soleil en (840, 1000) qui monte à (840, 960), entre le tribunal et le lampadaire |
| 2 | `D.tilleul` | pied (190, 1150), hauteur 400 |
| 3 | `D.amtsgericht` | bas, milieu (560, 1150) (x 330–790, y 600–1150) ; plaque « Amtsgericht » x 470–650, y 930–975 ; marches x 510–610, y 1150–1180 |
| 4 | `D.lampadaire` (× 0,9), le même que sur la route | pied (880, 1150) |
| 5 | `D.rue` | (40, 1150) : trottoir du fond y 1150–1210, chaussée y 1210–1330, trottoir avant y 1330–1470 |
| 6 | `DOC` (`sweater`), petite | échelle 0,62, pieds y 1205 ; marche de x 130 à x 500 |

**HUD :** mention « laut Presse » ; pastille (540, 330) « Amtsgericht Tettnang » / « المحكمة الابتدائية » (taille
34) ; étiquette blanche « 27.04. + 04.05.2026 » (Kalam 26), centre (250, 450) ; `D.miniCarte`
(`ville: "Tettnang"`), centre (850, 480).

| instant | ce qui se passe |
|---|---|
| `b20-0.25` (64,89) | fondu ; le tribunal pousse du sol (`growY`, à + 0,15), le tilleul (+ 0,2), le lampadaire (+ 0,3), encore allumé |
| `b20@فـ2026` (65,14) | étiquette « 27.04. + 04.05.2026 » |
| `b20@الطبيبة` (65,53) | `DOC` entre par la gauche et marche vers les marches (cycle de marche, 1,5 cycle/s, 1,9 s) |
| `b20@قدام` (65,97) | le lampadaire et les lanternes de la porte s'éteignent (0,5 s) : il fait jour ; pastille « Amtsgericht Tettnang » |
| `b20@المحكمة` (66,27) | elle s'arrête au pied des marches, lève la tête vers la plaque |
| `b20@Tettnang` (66,72) | la mini-carte jaillit, Tettnang pulse (ondes) |

**Vie :** soleil + rayons, nuages, deux oiseaux, tilleul. **Vérité :** décor libre, sans saison ni date
lisibles ; pas d'armoiries. **Affiche :** image à `b20@end`.

---

### S20 — LA PORTE DE LA SALLE : Strafbefehl, Einspruch (b21 · 67,41 → 70,19) — le juridique en image

**À comprendre :** un Strafbefehl est une amende décidée par écrit, sans audience. Elle ne l'a pas acceptée :
c'est pour cela qu'il y a une audience — et là, le tribunal n'est plus lié par le montant écrit.
**Entrée :** `fade` 0,45 à `b21`. Plein cadre, poussée lente.

| couche | objet | position (écran) |
|---|---|---|
| 1 | `D.hall` | (40, 270) : mur jusqu'à y 1300, lambris dès y 900, damier y 1300–1470 ; tableau d'affichage x 130–330, y 560–800 ; banc x 120–340, y 1180–1300 ; globes en x 300 et x 760 (y 270–400) |
| 2 | `D.porteSalle` | bas, milieu (710, 1300) (x 560–860, y 560–1300) ; plaque « Sitzungssaal » x 620–800, y 500–545 ; poignée en (712, 950) |
| 3 | `DOC` (`sweater`) | x 400, pieds y 1300, échelle 1,0 (tête de y 863), pose « elle porte la lettre » |
| 4 | `D.lettre` (`petit: true`, `plume: 1` : « Einspruch » écrit à la main en travers) | centre (470, 1060) |
| 5 | `D.encreMontant` « 41.250 € » | sur la lettre, centre (470, 1085) ; ses gouttes tomberont au sol vers (470, 1300) |

**HUD :** mention « laut Presse » ; pastilles en (540, 330) ; étiquette blanche x 110–540, y 430–540 :
« § 411 Abs. 4 StPO » (Kalam 26, y 468) et « من بعد Einspruch، المحكمة ماشي مربوطة بالغرامة » (Plex gras 26,
y 512 — chaîne à valider).

| instant | ce qui se passe |
|---|---|
| `b21` (67,41) | elle est devant la porte fermée, la lettre à la main ; le montant « 41.250 € » y est écrit à l'encre, bien noir |
| `b21@قبلاتش` (67,86) | le mot « Einspruch » écrit sur la lettre a une impulsion (× 1,08) ; pastille « Einspruch » / « ما قبلاتش » (taille 34) |
| `b21@Strafbefehl` (68,25) | pastille → « Strafbefehl » / « غرامة بلا جلسة » (taille 34) |
| `b21@Strafbefehl+0.4` | l'étiquette « § 411 Abs. 4 StPO » et sa ligne arabe |
| `b21@غرامة` (69,19) | le montant « 41.250 € » a une impulsion (× 1,1) |
| `b21@6` (69,53) | la porte fermée : sa plaque « Sitzungssaal » clignote une fois (c'était « sans » elle) |
| `b21@جلسة` (69,78) | **la double porte s'ouvre** (0,45 s), la lumière sort (rayons + trapèze au sol) et passe sur la lettre ; **le montant se délave** (`delave` 0 → 1 en 0,45 s) : l'encre du chiffre pâlit, trois gouttes coulent et tombent au sol, il ne reste qu'un fantôme en pointillé ; `DOC` se tourne vers la porte, `worried` |

**Vérité :** aucun reproche dans l'image : refuser un Strafbefehl est un droit. On ne dit ni ne montre « à
cause de son refus ». **Affiche :** image à `b21@end`.

---

### Mise en place FIXE « la salle d'audience » (S21 à S24) — pixels d'écran

`D.salle(g, { plan })` : le même mur (lambris, deux hautes fenêtres, rayons de lumière) vu sous trois cadrages.
Les trois scènes de tribunal s'enchaînent en `cut` (même lieu) ; la sanction (S24) reprend le mur nu.

---

### S21 — LA SALLE : seule accusée ; les parents de dos (b22 · 70,19 → 73,06)

**À comprendre :** elle est la seule accusée ; les parents du garçon sont là, ils écoutent ce qui s'est passé
cette nuit-là, et ils pleurent. Forme imposée : **les parents de dos sur le banc.** C'est la première fois
qu'on les voit.
**Entrée :** `fade` 0,45 à `b22`. Plein cadre, poussée lente. `D.salle` (`plan: "fond"`).

| couche (arrière → avant) | objet | position |
|---|---|---|
| 1 | mur, lambris dès y 760, fenêtres x 130–270 et x 810–950 (y 330–640), parquet dès y 1010 | — |
| 2 | `JUG` (robe) | x 540, pieds y 1000 (sur l'estrade), échelle 0,8 (tête de y 650) |
| 3 | estrade y 1000–1060 ; pupitre x 360–720, dessus y 900 | lampe (410, 850–900), micro (600, 870) |
| 4 | `PRO` (robe) derrière sa table | x 215, pieds y 1095, échelle 0,72 (tête de y 780) ; table x 120–310, dessus y 1000 |
| 5 | `DOC` (`sweater`) et `AVO` (robe) derrière la table de la défense | `DOC` x 750, `AVO` x 845, pieds y 1095, échelle 0,72 ; table x 690–900, dessus y 1000 |
| 6 | barrière à balustres | y 1130–1190, x 110–900, ouverte au milieu |
| 7 | `D.dos` mère (x 400) et père (x 570) | ancre = dossier du banc, y 1250 ; sommets des têtes à y ≈ 1020 |
| 8 | `D.bancParties` | haut, milieu (485, 1250), 480 × 220 (jusqu'en bas du cadre) |

Aucune tête n'en cache une autre : les parents (y ≥ 1020) sont sous le pupitre (y ≤ 1000) ; la tête du père
(x 515–625) est à gauche de `DOC` (x 720–780). Rien d'important à droite de x 900.

**HUD :** mention « laut Presse » ; pastilles en (540, 330).

| instant | ce qui se passe |
|---|---|
| `b22@المتهمة` (70,19) | pastille « Angeklagte » / « المتهمة » (taille 34) |
| `b22@غير` (70,63) | un **rond jaune à main levée** se trace autour de `DOC` (ellipse centrée (750, 900), 150 × 360, 0,3 s) : elle seule. Aucune chaise vide, aucune autre silhouette désignée |
| `b22@والوالدين` (71,08) | le rond s'efface ; pastille → « Eltern · Nebenkläger » / « الوالدين » (taille 30) ; un rond jaune se trace autour des deux dos (ellipse centrée (485, 1170), 430 × 330) puis s'efface en 0,6 s |
| `b22@كيسمعو` (71,62) | les deux têtes se relèvent un peu vers la juge (`penche` 0) |
| `b22@وكيبكيو` (72,51) | la mère : ses épaules tressautent (`tremble` 1), sa main monte au visage avec un mouchoir (`mouchoir` 0 → 1 en 0,4 s) ; le père passe son bras derrière elle (`bras` 0 → 1 en 0,5 s) et penche la tête vers la sienne (`penche` 1) ; `DOC` ferme les yeux un instant |

**Vie :** poussière dans les deux rayons, respirations (dos compris), `JUG` qui tourne une page (toutes les
1,4 s), `AVO` qui se penche vers `DOC`. Personne ne parle (`talk: 0`).
**Vérité :** une seule juge sur l'estrade (composition inconnue) ; pas de frère ni de sœur dessiné.
**Affiche :** image à `b22@end`.

---

### S22 — LES EXPERTS : du dehors, pareil (b23 · 73,06 → 76,04)

**À comprendre :** du dehors, l'alcool et le sang dans la tête se ressemblent ; seul le scanner fait la
différence. C'est le diptyque de toute la nuit, résumé sur un négatoscope.
**Entrée :** `cut` à `b23`. Plein cadre. `D.salle` (`plan: "experts"` : mur, lambris dès y 900, sol dès y 1300).

| couche | objet | position (écran) |
|---|---|---|
| 1 | `D.negatoscope` | haut, milieu (500, 470) : caisson x 250–750, y 470–1120, pied jusqu'à y 1300. Rangée 1 : cases x 270–480 et x 520–730, y 540–740 ; rangée 2 : mêmes x, y 830–1030 ; en-têtes y 490–535 et y 780–825 |
| 2 | rangée 1 : deux `D.teteProfil` **identiques** (× 0,85) | centres (375, 615) et (625, 615) ; dessous, dans chaque case : « Alkohol » + « الشراب » / « Blutung » + « الدم فالراس » (Kalam 24 à y 700, Plex gras 26 à y 730) ; `D.autocollant` miniature (× 0,5) collé sur le coin de la case de gauche |
| 3 | en-têtes : `D.refrain` « من برا » (500, 512) et « من الداخل » (500, 802) | — |
| 4 | rangée 2 : deux coupes miniatures (`D.crane` + `D.dedans`, × 0,34) | centres (375, 930) (`enc: 0`) et (625, 930) (`enc: 0.8`) |
| 5 | signes tracés à l'encre : « = » (500, 630) et « ≠ » (500, 945), Kalam 60 | — |
| 6 | `EX1` (`suit`) | x 160, pieds y 1300, échelle 0,9, `PP.point`, `facing: 1` : il montre la rangée 1 |
| 7 | `EX2` (`sweater`) + `D.marteauReflexes` | x 850, pieds y 1300, échelle 0,9, `facing: -1` : il montre la rangée 2 avec son marteau |

**HUD :** mention « laut Presse » ; pastilles en (540, 330) : « Gutachter » / « الخبرا » (taille 34) de `b23@الخبرا`
à `b23@والدم`, puis « Gutachter: „… die einzige Möglichkeit …" » / « غير Scanner كيفرق بين الشراب والضربة
فالراس » (taille 24, x 279–801).

| instant | ce qui se passe |
|---|---|
| `b23@الخبرا` (73,06) | le négatoscope est éteint ; pastille « Gutachter » ; les deux experts de part et d'autre |
| `b23@قالو` (73,46) | `EX1` parle ; la rangée 1 s'allume (grésillement 0,15 s) : deux profils endormis, exactement le même dessin |
| `b23@3` (73,96) | l'en-tête « من برا » a son impulsion (le refrain de la nuit) |
| `b23@الشراب` (74,21) | sous la case de gauche : « Alkohol » / « الشراب » ; le petit autocollant « betrunken » s'y colle |
| `b23@والدم` (74,60) | sous la case de droite : « Blutung » / « الدم فالراس » ; pastille → la citation des experts |
| `b23@فالراس` (74,94) | le signe « = » se trace entre les deux cases |
| `b23@بحال` (75,34) | `EX2` parle et pointe la rangée 2 : elle s'allume, en-tête « من الداخل », une barre de balayage la traverse (0,35 s) — à gauche une boîte intacte, à droite la tache d'encre |
| `b23@8` (75,64) | le signe « ≠ » se trace entre les deux coupes ; la tache de droite pulse |

**Vérité :** phrase des EXPERTS (pas de la juge), au discours indirect dans la presse : pas de bulle. Recontrôler
la citation à l'œil sur la page avant de l'afficher. **Affiche :** image à `b23@end`.

---

### S23 — LA JUGE : à 3 h au plus tard (b24 · 76,04 → 78,88)

**À comprendre :** la juge : à 3 h au plus tard, le scanner était obligatoire.
**Entrée :** `cut` à `b24`. Plein cadre : la juge de face, en plan rapproché, entière au-dessus de son pupitre.

| couche | objet | position (écran) |
|---|---|---|
| 1 | `D.salle` (`plan: "nu"`) | mur, lambris dès y 900 |
| 2 | `D.horlogeGrande` (r 105) | centre (270, 560) |
| 3 | `D.plaqueCT` (180 × 90), éteinte | centre (790, 560) |
| 4 | `JUG` (robe), `D.plume` en main | x 540, pieds y 1250 (cachés), échelle 1,1 (tête de y 769 à 905) |
| 5 | `D.pupitreJuge` | haut, milieu (540, 1040) (x 250–830, façade jusqu'à y 1330) ; lampe à x 310 ; dossier ouvert ; `D.lunettesLecture` posées |
| 6 | sol | y 1330–1470 |

**Textes :** sous l'horloge, « spätestens » (Kalam 28, (270, 700)) et « بالكثير » (`ar strong` 30, (270, 742)) ;
sous la plaque, « zwingend » (Kalam 28, (790, 650)) et « ضروري » (`ar strong` 30, (790, 692)) ; bande des
citations : « „Spätestens um 3 Uhr sei die CT-Untersuchung zwingend gewesen." » (Kalam 22, centre (520, 1378)).
**HUD :** mention « laut Presse ».

| instant | ce qui se passe |
|---|---|
| `b24@والقاضية` (76,04) | elle écrit (la plume bouge), lève les yeux |
| `b24@2` (76,83) | elle parle (`talk` jusqu'à `b24@end`) ; les aiguilles de la grande horloge partent de minuit |
| `b24@3` (77,03) | elles s'arrêtent sur **3 h** (0,4 s) ; un secteur jaune étroit marque le 3 ; saut de 5 % |
| `b24@بالكثير` (77,19) | « spätestens » puis « بالكثير » sous l'horloge |
| `b24@Scanner-0.2` (77,43) | un arc en pointillés se trace de l'horloge à la plaque |
| `b24@Scanner` (77,63) | **la plaque « CT » s'allume** en jaune + rayons |
| `b24@ضروري` (78,32) | « zwingend » puis « ضروري » sous la plaque ; la citation s'écrit dans la bande ; `JUG` pose sa plume, `sad` léger |

**Vérité :** discours indirect dans la presse — pas de bulle, la citation porte « laut Presse ». Ne jamais
écrire « dès l'admission » : les deux experts ne sont pas d'accord là-dessus. **Affiche :** image à `b24@end`.

---

### S24 — LA SANCTION : le sursis, 20 000 € aux parents (b25–b26 · 78,88 → 83,70)

**À comprendre :** homicide par négligence ; 15 mois « auf Bewährung » : la grille n'est pas fermée ; et
20 000 € qu'elle verse aux parents, en plusieurs fois. Forme imposée : **icônes** — barreaux en pointillés,
billets qui vont dans la main des parents.
**Entrée :** `fade` 0,45 à `b25-0.2`. Plein cadre, poussée lente. `D.salle` (`plan: "nu"`, lambris dès y 900,
sol y 1300).

| couche | objet | position (écran) |
|---|---|---|
| 1 | mur + lambris + sol | — |
| 2 | `PER` (`suit`) et `MER` (`sweater` + `D.foulard`), **de face** | `PER` x 700, `MER` x 830, pieds y 1300, échelle 0,95 (têtes de y 885) ; elle lui tient le bras |
| 3 | `DOC` (`sweater`) | x 300, pieds y 1300, échelle 1,05 (tête de y 841), de face |
| 4 | `D.grillePointillee` (260 × 430, `plaque: "15 Monate"`) | montant gauche (170, 1310) (x 170–430, y 880–1310), devant elle |
| 5 | quatre `D.billet` | partent de sa main (400, 1120), arrivent dans la main du père (600, 1121) |

Rien à droite de x 900 (bord droit de `MER` ≈ x 870).
**HUD :** mention « laut Presse » ; pastilles en (540, 330).

| instant | ce qui se passe |
|---|---|
| `b25@الحكم` (79,08) | elle attend, `worried` ; les parents sont à droite, tournés vers le sol |
| `b25@القتل` (79,43) | pastille « fahrlässige Tötung » / « القتل غير العمد » (taille 34) |
| `b25@4` (80,37) | **la grille en pointillés tombe** devant elle (`drop`, 0,45 s, rebond, sans secousse d'écran) ; sur sa traverse : « 15 Monate » ; `DOC` : `shock`, puis grimaces (`worried` ↔ `sad` toutes les 0,35 s, `sweat`) |
| `b25@auf` (80,82) | pastille → « 15 Monate auf Bewährung » / « حبس موقوف التنفيذ » (taille 28) ; les tirets défilent |
| `b25@sursis` (81,91) | **la grille s'ouvre** comme un portillon (`ouv` 0 → 1 en 0,5 s) : elle n'ira pas en prison ; elle souffle, `sad`, une larme |
| `b26@و20000` (82,41) | pastille → « Schmerzensgeld · 20.000 € » / « تعويض للوالدين » (taille 28) ; elle tend le bras ; le père ouvre la main (`PP.holdHandOut`, `facing: -1`) ; **quatre billets partent un à un** (toutes les 0,2 s, vol en cloche de 0,45 s) et se rangent en éventail dans sa main |
| `b26@أورو` (82,80) | au-dessus de la trajectoire : « in Raten » (Kalam 26, centre (500, 1010)) et quatre petits traits de calendrier |
| `b26@للوالدين` (83,10) | la mère pleure sans bruit (`tears: 0.6`), le père regarde les billets, `sad` : personne ne sourit |

**Jamais ici :** de prison ferme, les 21 mois demandés, le Berufsverbot demandé puis refusé (une peine non
prononcée ne se montre pas), le licenciement, l'Approbation. « durch Unterlassung » n'est pas affiché.
**Affiche :** image à `b26@end`.

---

### S25 — PAS DÉFINITIF : l'encre n'est pas sèche (b27 · 83,70 → 86,65)

**À comprendre :** ce jugement n'était pas définitif — et on n'a pas trouvé s'il l'est devenu.
**Entrée :** `fade` 0,45 à `b27`. Plein cadre, poussée lente. Une nature morte sur le pupitre, vue de face (pas de
dessus : la plongée est le style d'AKTE 06).

| couche | objet | position (écran) |
|---|---|---|
| 1 | mur clair ; le dessus du pupitre : trait à y 1180, façade dessous | — |
| 2 | un **fil** tendu, x 520–930, y 560 ; `D.coupures` × 5 (80 × 104) pendues par des pinces | en x 560, 645, 730, 815, 900 ; les trois premières datées « 28.04. », « 05.05. », « 13.05. » (Kalam 20) ; les deux dernières `vide` (pointillés + « ? ») |
| 3 | `D.urteilBlatt`, debout dans son porte-document | bas, milieu (330, 1180) (x 165–495, y 750–1180), inclinée −2° |
| 4 | `D.encrier` + `D.plume` (une goutte au bec) | (560, 1110–1180) ; la plume posée en (640, 1170) |

**HUD :** mention « laut Presse » ; pastilles en (540, 330).

| instant | ce qui se passe |
|---|---|
| `b27@والحكم` (83,70) | la feuille « URTEIL · 04.05.2026 » tombe dans son porte-document (`drop`) ; la signature se trace (0,4 s) |
| `b27@كانش` (84,30) | pastille « nicht rechtskräftig (Stand 05.05.2026) » / « ما كانش نهائي » (taille 24) ; sur la signature, trois reflets scintillent : l'encre est encore humide |
| `b27@نهائي` (84,59) | une **goutte** se détache de la signature et coule lentement (34 px jusqu'à la fin de la scène) |
| `b27@وما` (84,94) | sur le fil, les trois coupures de presse datées tombent une à une (0,15 s d'écart) et se balancent |
| `b27@لقيناش` (85,19) | pastille → « danach: nichts gefunden » / « من بعد ما لقينا والو » (taille 30) ; les deux cases en pointillés apparaissent, avec leur « ? » |
| `b27@8` (86,08) | les deux « ? » ont une impulsion ; la goutte continue de couler |

**Vérité :** jamais « rechtskräftig » seul, jamais « Berufung » (aucun appel connu). Les trois dates sont celles
des articles lus. Aucun nom de journal. **Affiche :** image à `b27@end`.

---

### S26 — LA RÈGLE 1 : le doute, ou l'état qui change → scanner (b28 · 86,65 → 90,52)

**À comprendre :** coup sur la tête + alcool : si tu doutes, ou si son état change, fais le scanner.
**Entrée :** `fade` 0,45 à `b28-0.2`. Plein cadre, poussée lente. Fond : `D.couloirNuit` (`nu: true` : mur
jusqu'à y 1300, sol), la nuit recommence, mais cette fois la plaque va s'allumer.

| couche | objet | position (écran) |
|---|---|---|
| 1 | ruban « القاعدة » (`k.ribbon`, taille 44, largeur 260) + `D.pips` (1er plein) | ruban (230, 340) ; pips (230, 392) |
| 2 | `D.carteDeclencheur` (`mode: "doute"`) | coin (120, 470) (x 120–480, y 470–730) ; dessous de « in Zweifelsfällen » : « إلا شكيتي » (`ar strong` 34, centre (330, 700)) |
| 3 | `D.carteDeclencheur` (`mode: "pire"`) | coin (120, 770) (x 120–480, y 770–1030) ; « ولا تبدلات حالتو » (`ar strong` 34, centre (330, 1000)) |
| 4 | `D.porteCT` | bas, milieu (730, 1240) (x 600–860, y 520–1240) ; caisson « CT » x 640–820, y 430–510 |
| 5 | deux flèches à main levée | de (480, 600) à (600, 760) ; de (480, 900) à (600, 940) |

**HUD :** pas de mention en haut à gauche (le ruban occupe le coin) : la source et l'avertissement sont écrits en
bas — « AWMF-Leitlinie 008/001 (Stand 2015) · Keine Rechtsberatung » (Kalam 20, gris, centre (520, 1428)).
Pastille en (650, 330), largeur ≤ 480.

| instant | ce qui se passe |
|---|---|
| `b28@ضربة` (86,85) | pastille « Schädel-Hirn-Trauma (SHT) » / « ضربة فالراس » (taille 28) ; la carte 1 tombe (`drop`) : la tête de profil avec sa petite marque |
| `b28@الشراب` (87,74) | le verre apparaît à côté de la tête ; « Kopf + Alkohol » |
| `b28@إلا` (88,13) | la pastille se masque ; « in Zweifelsfällen » se surligne en jaune ; le « ? » oscille |
| `b28@شكيتي` (88,38) | « إلا شكيتي » (`wipe rtl`) |
| `b28@ولا` (88,73) | la carte 2 tombe : « Verschlechterung », la flèche vers le bas |
| `b28@تبدلات` (88,98) | « ولا تبدلات حالتو » (`wipe rtl`) |
| `b28@دير` (89,72) | les deux flèches se tracent vers la porte |
| `b28@Scanner` (89,97) | **le caisson « CT » s'allume**, la porte s'ouvre (0,4 s), l'anneau du scanner apparaît dans la lumière + rayons |

**Vérité :** « dans le doute » (indication facultative de la Leitlinie), jamais « toujours » ; l'aggravation →
scanner. Version 2015, en révision : l'écrire. **Affiche :** image à `b28@end`.

---

### S27 — LA RÈGLE 2 : la feuille, l'heure (b29 · 90,52 → 93,84)

**À comprendre :** sans scanner : à intervalles rapprochés, réveille-le, regarde les pupilles, et note l'heure.
La feuille de la nuit, mais remplie.
**Entrée :** `cut` à `b29`. Même fond. Ruban « القاعدة » + pips (2e plein).

| couche | objet | position (écran) |
|---|---|---|
| 1 | ruban + pips ; dessous, `D.plaqueCT` × 0,5, **éteinte**, précédée de « ohne » (Kalam 22) | ruban (230, 340) ; plaque (250, 428), « ohne » (170, 436) |
| 2 | `D.feuilleSurveillance` | coin (150, 470), 720 × 830 (x 150–870, y 470–1300). Colonnes : « Uhrzeit » x 170–350, « Bewusstsein » x 350–530, « Pupillen » x 530–700, « Motorik » x 700–860 ; en-têtes y 540–680 (icône, allemand Kalam 26, arabe Plex gras 26 : « الساعة », « واش فايق », « les pupilles », « الحركة ») ; rangées y 700–840, 840–980, 980–1120, 1120–1260 |
| 3 | `D.styloChignon` (le stylo jaune de la médecin), qui écrit | suit la case en cours |
| 4 | ligne de source | « mindestens jede Stunde, besser jede halbe Stunde — laut Presse » (Kalam 20, centre (510, 1345)) ; « AWMF-Leitlinie 008/001 (Stand 2015) · Keine Rechtsberatung » (Kalam 20, gris, centre (520, 1428)) |

**HUD :** pastilles en (650, 330).

| instant | ce qui se passe |
|---|---|
| `b29` (90,52) | la feuille tombe (`drop`, 0,4 s) |
| `b29@Scanner` (90,82) | « ohne » + la petite plaque « CT » éteinte, en haut à gauche |
| `b29@كل` (91,26) | pastille « engmaschige neurologische Überwachung » / « مراقبة كل شوية » (taille 24, x 401–899) ; dans la marge gauche de la feuille, une flèche ronde « ↻ » se met à tourner (un tour par 1,2 s) ; la ligne de source |
| `b29@فيّقو` (91,76) | rangée 1, « Bewusstsein » : coche tracée ; l'icône de l'œil s'ouvre |
| `b29@شوف` (92,05) | l'icône des pupilles : un petit faisceau jaune passe dessus |
| `b29@pupilles` (92,55) | rangée 1, « Pupillen » : coche ; les deux pupilles de l'icône se resserrent ; `+0.25` : « Motorik », coche |
| `b29@وكتب` (93,04) | rangée 1, « Uhrzeit » : « 23:15 » s'écrit (0,3 s) |
| `b29@الساعة` (93,34) | les rangées 2 et 3 se remplissent d'un trait (0,2 s chacune : trois coches + « 23:45 », « 00:15 ») ; la colonne « Uhrzeit » se surligne en jaune ; pastille → « mit Uhrzeit dokumentiert » / « مكتوب مع الساعة » (taille 28) |

**Vérité :** les heures écrites sont un exemple (volontairement pas celles de l'affaire). « Réveiller » explique
le contrôle de la conscience (ce n'est pas un mot de la Leitlinie). La fréquence « toutes les heures, mieux
toutes les demi-heures » a été citée à l'audience : elle porte « laut Presse ». **Affiche :** image à `b29@end`.

---

### S28 — LA RÈGLE 3 : la responsabilité reste (b30 · 93,84 → 96,90)

**À comprendre :** la juge l'a dit : même si tu demandes l'avis d'un collègue, la responsabilité reste la
tienne. La feuille « Rat » de l'accroche revient — et la boucle ouverte se ferme.
**Entrée :** `cut` à `b30`. Même fond. Ruban + pips (3e plein).

| couche | objet | position (écran) |
|---|---|---|
| 1 | médaillon de la juge (`D.medaillon`, r 78) : `Persona.head` de `JUG` × 0,8 | centre (200, 560), queue vers la bande des citations |
| 2 | médaillon d'`ANA` (r 110) : tête × 1,25 + masque | centre (790, 620) (y 510–730) |
| 3 | pointillé | de (430, 880) à (690, 650) |
| 4 | `DOC` (`coat`, stylo dans le chignon), `D.planchette` dans la main gauche | x 380, pieds y 1300, échelle 1,1 (tête de y 819) ; planchette centrée (330, 1050) |
| 5 | `D.etiquetteBagage` « Verantwortung » | œillet noué à la planchette (400, 1070) ; l'étiquette pend en (470, 1135) |
| 6 | `D.feuilleRat` | arrive du médaillon et se pince sur la planchette |

**Textes :** bande des citations — « „… habe sie nicht von ihrer Verantwortung enthoben." » (Kalam 22, centre
(520, 1362)) et « ما حيدش عليها المسؤولية » (`ar strong` 28, centre (520, 1406)).
**HUD :** mention « laut Presse · Keine Rechtsberatung » **en bas à droite de la bande** (Kalam 18, aligné à
droite sur x 890, y 1436) puisque le ruban tient le coin ; pastille en (650, 330).

| instant | ce qui se passe |
|---|---|
| `b30@والقاضية` (93,84) | le médaillon de la juge jaillit |
| `b30@قالتها` (94,33) | elle parle (`talk` jusqu'à `b30@زميل`) ; la citation allemande s'écrit dans la bande |
| `b30@وخا` (94,73) | le médaillon d'`ANA` jaillit ; le pointillé se trace |
| `b30@تسول` (94,98) | `DOC` lève la tête vers lui ; la petite carte « ? » file le long du pointillé |
| `b30@زميل` (95,28) | la feuille « Rat vom Kollegen » revient (0,35 s) et se pince sur la planchette ; `DOC` : `calm` |
| `b30@المسؤولية` (95,57) | pastille « Verantwortung » / « المسؤولية » (taille 34) ; **l'étiquette jaune part** vers le médaillon le long du pointillé : sa cordelette s'étire (`etire` 0 → 1 en 0,45 s) ; « ما حيدش عليها المسؤولية » dans la bande |
| `b30@كتبقى` (96,11) | la cordelette **la ramène en claquant** (0,18 s) contre la planchette (`m.pend` amorti) ; `DOC` a un petit recul (6 px) |
| `b30@ديالك` (96,45) | des rayons s'ouvrent derrière elle (`m.rays(380, 1000, { R: 420, op: 0.16, at: … })`) ; elle pose la main sur l'étiquette, `focused` |

**Vérité :** phrase de la juge selon la presse (discours indirect), pas un article de loi. `ANA` reste neutre :
il hoche la tête, c'est tout. **Affiche :** image à `b30@end`.

---

### S29 — LA DERNIÈRE PHRASE : « غير سكران » (b31 · 96,90 → 99,23)

**À comprendre :** un homme ivre se réveille — s'il n'est qu'ivre. Le titre s'écrit enfin, sur la ligne.
**Entrée :** `ENCRE-TOUT` à `b31-0.3` (l'encre revient une dernière fois). **Ligne :** 870, horizontale.
`diptyque(c, { ref: 870, horloge: false, refrains: "aucun", crane: true })`.

- **Haut :** `box(…, { construire: null })`, sans personne : le garçon dort sous son autocollant (`PEEL` 0,
  respiration), la planchette pend, `LUM` 0,6.
- **Bas :** la coupe (échelle 0,86, centre (523, 1195)), la tache d'encre de 6 h (`ENC` 1, `PLEIN` 0), sous un
  voile papier à 60 %.
- **Sur la ligne :** étiquette blanche 420 × 110, centre (540, 870), pour le titre.

| instant | ce qui se passe |
|---|---|
| `b31-0.3` (96,90) | l'encre couvre la règle, se retire : le diptyque est revenu, immobile |
| `b31@السكران` (97,20) | l'autocollant « betrunken / سكران » a une impulsion (× 1,08) |
| `b31@كيفيق` (97,64) | une bande de lumière du matin (parallélogramme jaune à 12 %, large de 220) traverse le haut de gauche à droite en 1,0 s ; il continue de dormir |
| `b31@إلا` (97,99) | en bas, le voile se lève (0,3 s) : la tache est là ; son bord pulse une fois |
| `b31@غير` (98,49) | **le titre s'écrit sur la ligne**, de droite à gauche (0,4 s) : « غير سكران » (`ttl`, 84 px) |
| `b31@5` (98,74) | un trait de surligneur jaune se trace sous « غير » seulement (0,25 s) ; **le coin de l'autocollant se décolle** (`PEEL` → 0,45) et le mot « Verdacht » reparaît en entier |

Tenue jusqu'à `b31@end+0.15`, puis l'affiche. **Affiche :** c'est la dernière case (image de fin de scène) : le
dézoom part d'elle.

---

### S30 — L'AFFICHE-RÉSUMÉ (`b31@end+0.15` → fin)

Socle `st.summary` du gabarit, avec les réglages de cet épisode :

```js
st.flash("b31@end+0.15", 0.35, 0.85);
st.summary({ at: "b31@end+0.15", in: "cut", dezoomAt: "b31@end+0.5", cols: 7, crop: [262, 1470], top: 356, gap: 10, side: 92,
             freezeAt: [ /* une entrée par case, voir « Affiche » de chaque scène */ ], below(c, cells) {…}, above(c, cells) {…} });
```

- **28 cases** (S1, S2, S4 à S29 ; l'intro est `summary: false`), **7 colonnes × 4 rangées**, lecture de droite
  à gauche. Largeur d'une case : (1080 − 2 × 92 − 6 × 20) / 7 = 110,9 px ; hauteur : (1470 − 262) × 0,1027 =
  124 px. Rangées à y 356, 490, 624, 758 : la grille finit à **y 882**, donc au-dessus de la colonne des
  boutons (y 980). Colonnes de x 92 à x 988.
- Comme la vue de l'épisode est à l'échelle 1, la dernière case agrandie recouvre EXACTEMENT la dernière image
  de S29 : le dézoom part sans à-coup.
- En-tête (`below`) : ruban « AKTE 09 · غير سكران » (`k.ribbon`, taille 36, largeur 470) en (540, 300) ;
  « @dr.aguilo » (pastille taille 20) en (180, 300) ; « AKTE 10 · قريبا » (pastille jaune taille 18) en
  (885, 300).
- Rappel de vérité, entre la grille et la carte : « laut Presse · nicht rechtskräftig (Stand 05.05.2026) »
  (Kalam 22, centre (490, 916)) et « حسب الصحافة · الحكم ما كانش نهائي » (`ar strong` 26, centre (490, 950)),
  à `b31@end+2.5`.
- Carte « commentaire » (`above`) : `k.card(110, 975, 760, 290)` à `b31@end+2.7` ; la question ÉCRITE (jamais
  dite), sur deux lignes, `ttl` 44 : « سكران طاح على راسو: » (centre (490, 1040)) et « عندكم Scanner ديما، ولا
  مراقبة؟ » (centre (490, 1098)), `wipe rtl` à `b31@end+2.8` et `b31@end+3.0` ; « كتب ليا فالكومنتير »
  (`ar strong` 40, centre (490, 1178)) à `b31@end+3.3` ; la flèche vers le bouton commentaire, **à la place
  exacte du gabarit** (`M780 1150 C 860 1150, 900 1160, 918 1196 M896 1186 L918 1196 L922 1172`), à
  `b31@end+3.5`.
- Numéros des cases : pastille ronde jaune en haut à droite de chaque case (socle).

---

## 5. Les scènes imposées, dans la forme propre à cet épisode

| scène imposée | forme dans AKTE 09 | où | ce qui la distingue des autres épisodes |
|---|---|---|---|
| **Accroche** (la sanction chiffrée, décor complet, mouvement dès la 1re image, personnage qui réagit) | Le diptyque avant qu'on l'explique : en haut la lettre du Strafbefehl (41.250 €) qui arrive et qu'elle repousse, « Einspruch » écrit à la plume en travers ; en bas le prétoire, « 15 Monate », la grille en pointillés qui tombe ; choc → panique → larmes. Puis la feuille « Rat vom Kollegen » traverse la ligne et se déchire | S1, S2 | accroche coupée en deux, verbe de refus en premier ; sursis = pointillés, jamais une cellule (AKTE 02) ; ni balance (04), ni fenêtres (05), ni feuille qui tombe du bureau (06), ni fil de messages (07) |
| **Intro Yassine** | Un **polaroïd scotché à cheval sur la ligne** : photo ronde dans son anneau jaune, badge Instagram, « Yassine » écrit à la main dans la marge, « @dr.aguilo », pastilles, cœur j'aime et bouton s'abonner animés sur `i3@j'aime` et `i3@abonne` ; logo du haut masqué ; bloc fini à y 1262 ; `summary: false` | S3 | 04 fiche épinglée, 05 badge au cordon, 06 trombone sur chemise, 07 fiche contact, 08 plaque de porte |
| **Le médical expliqué en image** | La coupe du crâne en bas de l'écran, pendant TOUTE la nuit : fracture (S6), perle d'encre puis lentille sous l'os (S10), l'encre pousse le cerveau, la boîte ne cède pas, trois mots « العظم / الدم / المخ » (S13), puis le scanner plein écran (S16). Aucun chiffre | S6, S10, S13, S16 | pas de fenêtre sur le corps ni de loupe reliée (02), pas de coupe de vaisseau (03), pas de pinces à globules (04), pas d'usine (06) : ici le schéma est un des deux récits, pas un insert |
| **Le juridique expliqué en image** | La lettre et son montant écrit à l'encre devant la porte de la salle : la porte s'ouvre, l'encre du montant se délave et goutte — après l'opposition, le tribunal n'est plus lié par le montant | S20 | pas d'étiquette de prix à ficelle (08), pas de tampon « Einspruch » (08), pas d'enveloppes renvoyées (06) |
| **Carte** | **Le Bodensee dessiné**, l'épingle au bord du lac ; l'Allemagne en médaillon de situation avec Berlin ; Tettnang et Ravensburg déjà là, en gris, qui s'allumeront. Rappels : vignette en S7 (Friedrichshafen) et S19 (Tettnang) ; la même carte en S17 pour le transfert | S4, S7, S17, S19 | 04 Rhin et cathédrale, 05 carte de nuit à une fenêtre, 06 deux épingles et une ambulance, 07 application « Plans », 08 arcs entre pays |
| **Scène muette du décès** | Le diptyque une dernière fois : en haut le garçon couché dans un lieu sans nom, son sweat plié sur une chaise vide ; en bas l'encre a rempli la boîte ; trois battements courent sur la ligne de séparation, puis elle se redresse et reste plate ; tout se fige, la couleur s'éteint ; « ما عاشش · 18 عام » + « laut Presse ». **Sans les parents** (forme de `SAISON-2.md` corrigée par le dossier) | S18 | la ligne de l'écran EST le tracé du moniteur ; pas de compteur qui s'arrête (04), de fenêtre qui s'éteint (05), de page de calendrier (06), pas de mari au chevet (03) |
| **Tribunal** | Le petit tribunal de province **vu de la rue à l'aube** (le lampadaire de la route s'y éteint), puis la porte de la salle, puis **les parents de dos sur le banc** ; les experts devant un négatoscope ; la juge de face avec l'horloge arrêtée sur 3 h | S19 à S23 | 04 balance en gros plan, 05 salle vue du fond avec deux accusés, 06 quatre boîtes aux lettres, 07 appel vidéo, 08 guichet et marteau |
| **Sanction** | **Icônes** : la grille en pointillés (sursis) tombe puis s'ouvre comme un portillon ; quatre billets partent de sa main, un à un (« in Raten »), et arrivent dans la main du père ; son visage en grimaces | S24 | 04 tampon « § 60 », 05 billets comptés pendant que le collègue sort, 06 étiquettes de prix sur quatre chaises, 07 virement dans le fil, 08 prix accroché aux lettres |
| **Statut du jugement** | La signature du jugement à l'encre encore humide, une goutte qui coule ; sur un fil, trois coupures datées puis deux cases vides « ? » | S25 | pas de tampon qui ne tombe pas (06), pas de dossier fermé (04) |
| **Règle** | Trois temps, avec les objets de la nuit : la plaque « CT » qui s'allume ; la feuille de surveillance qui se remplit, heure comprise ; l'étiquette « Verantwortung » qui revient en claquant | S26, S27, S28 | pas d'escalier (03), pas de liste d'appel ni de formulaire (05), pas de pilulier (06) |
| **Affiche-résumé** | 28 cases, 7 colonnes × 4 rangées, grille finie à y 882 ; question ÉCRITE : « سكران طاح على راسو: عندكم Scanner ديما، ولا مراقبة؟ » + « كتب ليا فالكومنتير » + flèche ; teaser « AKTE 10 · قريبا » ; rappel « laut Presse · nicht rechtskräftig (Stand 05.05.2026) » | S30 | — |

Règles de la série, contrôlées sur ce storyboard : aucune question au spectateur à l'oral ni au milieu ;
l'appel à commenter n'est qu'écrit ; la mort n'est jamais dite ; soignante ET médecin dans l'histoire ;
aucun nom de personne ni d'hôpital à l'écran ; une carte dès la première ville ; pastilles allemand + arabe
détaché ; sons naturels seulement (voir `son/plan_son.md`).

---

## 6. Repères utilisés

Contrôle fait par script le 26.11.2026 (copie exacte de `parseCue` de `engine/runtime.js` et de `Stage.T`) sur ce
document et sur `son/plan_son.md`, contre `beats.js` et `timings.js` : **225 repères de base, 0 erreur.**
Chaque mot visé existe tel quel dans `beats.js`. À refaire après le montage de la voix :
`node tools/cuetimes.mjs videos/akte-friedrichshafen-nacht/index.html …`.

Rappel : `bN` = début du beat ; `bN@end` = sa fin ; `bN@mot` = début du PREMIER mot du beat qui contient `mot`
(ponctuation, tatweel « ـ » et voyelles brèves retirés) ; un repère fait seulement de chiffres est un INDICE de
mot (0 = premier mot) ; `+0.3` / `-0.1` s'ajoutent. Les instants sont ceux du minutage provisoire.

| repère de base | instant provisoire (s) | mot visé | décalages utilisés |
|---|---|---|---|
| **b1** | 0,15 → 1,98 | قالت «لا» لغرامة ديال 41250 أورو. | |
| `b1@1` | 0,45 | **indice** : mot n° 1 = « «لا» » | +0,12 · +0,35 |
| `b1@لغرامة` | 0,65 | « لغرامة » (n° 2) | — |
| `b1@4` | 1,34 | **indice** : mot n° 4 = « 41250 » | — |
| **b2** | 2,09 → 5,16 | وتحكم عليها بـ15 شهر ديال الحبس avec sursis، فألمانيا. | |
| `b2@وتحكم` | 2,09 | « وتحكم » (n° 0) | — |
| `b2` | 2,09 | début du beat | -0,1 |
| `b2@بـ15` | 2,79 | « بـ15 » (n° 2) | — |
| `b2@الحبس` | 3,63 | « الحبس » (n° 5) | — |
| `b2@avec` | 3,98 | « avec » (n° 6) | — |
| `b2@sursis` | 4,27 | « sursis، » (n° 7) | +0,2 · +0,5 |
| `b2@فألمانيا` | 4,67 | « فألمانيا. » (n° 8) | — |
| **b3** | 5,27 → 8,83 | وهي طبيبة فـla garde، سولات طبيب عندو الخبرة… وهادشي ما حماهاش. | |
| `b3` | 5,27 | début du beat | -0,1 |
| `b3@طبيبة` | 5,51 | « طبيبة » (n° 1) | — |
| `b3@سولات` | 6,50 | « سولات » (n° 4) | -0,1 · +0,3 |
| `b3@5` | 6,85 | **indice** : mot n° 5 = « طبيب » | — |
| `b3@عندو` | 7,15 | « عندو » (n° 6) | — |
| `b3@الخبرة` | 7,45 | « الخبرة… » (n° 7) | +0,1 · +0,2 |
| `b3@وهادشي` | 7,84 | « وهادشي » (n° 8) | +0,45 |
| `b3@حماهاش` | 8,43 | « حماهاش. » (n° 10) | +0,35 |
| **i1** | 9,25 → 10,63 | أنا ياسين، طبيب فألمانيا. | |
| `i1` | 9,25 | début du beat | -0,3 |
| `i1@ياسين` | 9,50 | « ياسين، » (n° 1) | +0,15 |
| `i1@فألمانيا` | 10,14 | « فألمانيا. » (n° 3) | — |
| **i2** | 10,74 → 14,89 | فهاد السلسلة كنحكي ليكم قصص حقيقية من المحاكم الألمانية، باش نتعلمو منها. | |
| `i2@حقيقية` | 12,37 | « حقيقية » (n° 5) | +0,15 |
| **i3** | 15,00 → 18,37 | إلا عجباتك، دير j'aime و abonne، باش ما تفوتكش القصة الجاية. | |
| `i3` | 15,00 | début du beat | +0,1 |
| `i3@j'aime` | 15,89 | « j'aime » (n° 3) | — |
| `i3@abonne` | 16,39 | « abonne، » (n° 5) | — |
| **b4** | 18,79 → 22,39 | القصة وقعات فـ2023 حدا بحيرة Bodensee، وكنعرفوها غير من الصحافة. | |
| `b4` | 18,79 | début du beat | -0,3 · -0,05 |
| `b4@وقعات` | 19,13 | « وقعات » (n° 1) | — |
| `b4@فـ2023` | 19,48 | « فـ2023 » (n° 2) | — |
| `b4@حدا` | 19,87 | « حدا » (n° 3) | — |
| `b4@بحيرة` | 20,12 | « بحيرة » (n° 4) | — |
| `b4@Bodensee` | 20,47 | « Bodensee، » (n° 5) | +0,25 |
| `b4@وكنعرفوها` | 20,95 | « وكنعرفوها » (n° 6) | — |
| `b4@الصحافة` | 21,94 | « الصحافة. » (n° 9) | -0,3 · +0,1 |
| `b4@end` | 22,39 | fin du beat | — |
| **b5** | 22,50 → 25,23 | من بعد نص الليل، شاب عندو 18 عام طاح بالـvélo. | |
| `b5` | 22,50 | début du beat | -0,1 |
| `b5@نص` | 22,95 | « نص » (n° 2) | — |
| `b5@الليل` | 23,15 | « الليل، » (n° 3) | — |
| `b5@عندو` | 23,74 | « عندو » (n° 5) | — |
| `b5@6` | 24,04 | **indice** : mot n° 6 = « 18 » | — |
| `b5@طاح` | 24,49 | « طاح » (n° 8) | -0,08 |
| **b6** | 25,34 → 27,13 | من برا: سكران، ناض ومشى كيتمايل. | |
| `b6@برا` | 25,54 | « برا: » (n° 1) | — |
| `b6@سكران` | 25,79 | « سكران، » (n° 2) | — |
| `b6@ناض` | 26,14 | « ناض » (n° 3) | — |
| `b6@ومشى` | 26,39 | « ومشى » (n° 4) | — |
| `b6@كيتمايل` | 26,68 | « كيتمايل. » (n° 5) | — |
| **b7** | 27,41 → 29,29 | من الداخل: العظم ديال الراس تهرس. | |
| `b7` | 27,41 | début du beat | -0,3 · -0,06 · +0,05 · +0,3 |
| `b7@الداخل` | 27,61 | « الداخل: » (n° 1) | — |
| `b7@العظم` | 28,00 | « العظم » (n° 2) | — |
| `b7@الراس` | 28,64 | « الراس » (n° 4) | +0,1 |
| `b7@تهرس` | 28,99 | « تهرس. » (n° 5) | — |
| `b7@end` | 29,29 | fin du beat | — |
| **b8** | 29,71 → 31,82 | مع 2، وصل للمستعجلات فـFriedrichshafen. | |
| `b8` | 29,71 | début du beat | -0,15 · -0,1 |
| `b8@1` | 29,91 | **indice** : mot n° 1 = « 2، » | — |
| `b8@للمستعجلات` | 30,31 | « للمستعجلات » (n° 3) | +0,25 |
| `b8@Friedrichshafen` | 30,90 | « فـFriedrichshafen. » (n° 4) — précédé de « فـ » | — |
| `b8@end` | 31,82 | fin du beat | +0,1 |
| **b9** | 31,93 → 33,57 | من برا: غير علامة ديال ضربة. | |
| `b9` | 31,93 | début du beat | -0,1 · +0,3 |
| `b9@برا` | 32,13 | « برا: » (n° 1) | — |
| `b9@غير` | 32,38 | « غير » (n° 2) | — |
| `b9@علامة` | 32,63 | « علامة » (n° 3) | — |
| `b9@ضربة` | 33,27 | « ضربة. » (n° 5) | -0,2 |
| `b9@end` | 33,57 | fin du beat | — |
| **b10** | 33,68 → 37,03 | الطبيبة شكات فالراس وكتباتها… ولكن بلا Scanner: غير المراقبة. | |
| `b10` | 33,68 | début du beat | +0,1 |
| `b10@شكات` | 34,12 | « شكات » (n° 1) | — |
| `b10@فالراس` | 34,42 | « فالراس » (n° 2) | — |
| `b10@وكتباتها` | 34,81 | « وكتباتها… » (n° 3) | -0,25 · +0,2 |
| `b10@ولكن` | 35,30 | « ولكن » (n° 4) | — |
| `b10@بلا` | 35,60 | « بلا » (n° 5) | — |
| `b10@Scanner` | 35,85 | « Scanner: » (n° 6) | — |
| `b10@غير` | 36,29 | « غير » (n° 7) | — |
| `b10@المراقبة` | 36,54 | « المراقبة. » (n° 8) | +0,06 · +0,1 · +0,3 |
| **b11** | 37,31 → 39,19 | من الداخل: الدم كيتجمع تحت العظم. | |
| `b11` | 37,31 | début du beat | -0,3 · -0,06 |
| `b11@الداخل` | 37,51 | « الداخل: » (n° 1) | — |
| `b11@الدم` | 37,91 | « الدم » (n° 2) | — |
| `b11@كيتجمع` | 38,20 | « كيتجمع » (n° 3) | — |
| `b11@تحت` | 38,60 | « تحت » (n° 4) | — |
| `b11@العظم` | 38,85 | « العظم. » (n° 5) | — |
| `b11@end` | 39,19 | fin du beat | — |
| **b12** | 39,61 → 41,65 | مع 3، الفرملية شافتو ولى agité كثر. | |
| `b12` | 39,61 | début du beat | -0,15 · -0,1 |
| `b12@1` | 39,81 | **indice** : mot n° 1 = « 3، » | — |
| `b12@الفرملية` | 39,97 | « الفرملية » (n° 2) | — |
| `b12@شافتو` | 40,46 | « شافتو » (n° 3) | -0,3 |
| `b12@agité` | 41,05 | « agité » (n° 5) | — |
| `b12@كثر` | 41,40 | « كثر. » (n° 6) | — |
| `b12@end` | 41,65 | fin du beat | — |
| **b13** | 41,76 → 44,81 | فديك الليلة، الطبيبة سولات Anästhesist، يعني طبيب البنج. | |
| `b13` | 41,76 | début du beat | -0,1 |
| `b13@سولات` | 42,89 | « سولات » (n° 3) | — |
| `b13@Anästhesist` | 43,24 | « Anästhesist، » (n° 4) | — |
| `b13@6` | 44,17 | **indice** : mot n° 6 = « طبيب » | — |
| **b14** | 44,92 → 48,09 | حسب الصحافة، جا شافو، ما قبلوش فالإنعاش، وقال: خليوه ينعس. | |
| `b14` | 44,92 | début du beat | -0,05 |
| `b14@شافو` | 45,81 | « شافو، » (n° 3) | — |
| `b14@قبلوش` | 46,31 | « قبلوش » (n° 5) | — |
| `b14@فالإنعاش` | 46,66 | « فالإنعاش، » (n° 6) | — |
| `b14@وقال` | 47,15 | « وقال: » (n° 7) | — |
| `b14@خليوه` | 47,45 | « خليوه » (n° 8) | +0,15 |
| `b14@ينعس` | 47,79 | « ينعس. » (n° 9) | +0,2 |
| `b14@end` | 48,09 | fin du beat | — |
| **b15** | 48,37 → 50,75 | من الداخل: الدم ما كينعسش، كيضغط على المخ. | |
| `b15` | 48,37 | début du beat | -0,3 · -0,06 |
| `b15@الداخل` | 48,57 | « الداخل: » (n° 1) | — |
| `b15@الدم` | 48,96 | « الدم » (n° 2) | — |
| `b15@كينعسش` | 49,46 | « كينعسش، » (n° 4) | — |
| `b15@كيضغط` | 49,86 | « كيضغط » (n° 5) | +0,2 |
| `b15@المخ` | 50,45 | « المخ. » (n° 7) | — |
| `b15@end` | 50,75 | fin du beat | — |
| **b16** | 50,86 → 53,00 | 3 سوايع، حتى واحد ما وقف عليه مزيان. | |
| `b16` | 50,86 | début du beat | -0,08 |
| `b16@0` | 50,86 | **indice** : mot n° 0 = « 3 » | — |
| `b16@سوايع` | 51,01 | « سوايع، » (n° 1) | — |
| `b16@واحد` | 51,61 | « واحد » (n° 3) | +0,3 |
| `b16@مزيان` | 52,66 | « مزيان. » (n° 7) | +0,1 |
| `b16@end` | 53,00 | fin du beat | +0,25 |
| **b17** | 53,70 → 56,66 | مع 6، الطبيبة والفرملية دارو alarme ديال Réanimation. | |
| `b17` | 53,70 | début du beat | -0,45 · -0,3 · -0,25 · -0,2 · +0,45 |
| `b17@1` | 53,90 | **indice** : mot n° 1 = « 6، » | — |
| `b17@الطبيبة` | 54,06 | « الطبيبة » (n° 2) | — |
| `b17@والفرملية` | 54,50 | « والفرملية » (n° 3) | — |
| `b17@دارو` | 55,03 | « دارو » (n° 4) | — |
| `b17@alarme` | 55,33 | « alarme » (n° 5) | — |
| `b17@Réanimation` | 56,02 | « Réanimation. » (n° 7) | +0,25 |
| `b17@end` | 56,66 | fin du beat | — |
| **b18** | 56,77 → 59,59 | وعاد ديك الساعة دارو Scanner: بان اللي من الداخل. | |
| `b18` | 56,77 | début du beat | — |
| `b18@الساعة` | 57,31 | « الساعة » (n° 2) | — |
| `b18@دارو` | 57,71 | « دارو » (n° 3) | — |
| `b18@Scanner` | 58,01 | « Scanner: » (n° 4) | -0,1 · +0,4 · +0,5 |
| `b18@بان` | 58,45 | « بان » (n° 5) | — |
| `b18@الداخل` | 59,20 | « الداخل. » (n° 8) | — |
| `b18@end` | 59,59 | fin du beat | — |
| **b19** | 59,70 → 61,83 | داوه لسبيطار آخر، ودخل للبلوك مع 8:40… | |
| `b19` | 59,70 | début du beat | -0,05 |
| `b19@داوه` | 59,70 | « داوه » (n° 0) | — |
| `b19@لسبيطار` | 60,00 | « لسبيطار » (n° 1) | — |
| `b19@آخر` | 60,44 | « آخر، » (n° 2) | — |
| `b19@للبلوك` | 60,99 | « للبلوك » (n° 4) | — |
| `b19@8:40` | 61,58 | « 8:40… » (n° 6) | — |
| `b19@end` | 61,83 | fin du beat | +0,1 · +0,3 · +0,45 · +1,0 · +1,65 · +2,05 · +2,15 · +2,2 · +2,9 |
| **b20** | 65,14 → 67,30 | فـ2026، الطبيبة قدام المحكمة فـTettnang، | |
| `b20` | 65,14 | début du beat | -0,25 |
| `b20@فـ2026` | 65,14 | « فـ2026، » (n° 0) | — |
| `b20@الطبيبة` | 65,53 | « الطبيبة » (n° 1) | — |
| `b20@قدام` | 65,97 | « قدام » (n° 2) | — |
| `b20@المحكمة` | 66,27 | « المحكمة » (n° 3) | — |
| `b20@Tettnang` | 66,72 | « فـTettnang، » (n° 4) — précédé de « فـ » | — |
| `b20@end` | 67,30 | fin du beat | — |
| **b21** | 67,41 → 70,08 | حيت ما قبلاتش Strafbefehl، يعني غرامة بلا جلسة. | |
| `b21` | 67,41 | début du beat | — |
| `b21@قبلاتش` | 67,86 | « قبلاتش » (n° 2) | — |
| `b21@Strafbefehl` | 68,25 | « Strafbefehl، » (n° 3) | +0,4 |
| `b21@غرامة` | 69,19 | « غرامة » (n° 5) | — |
| `b21@6` | 69,53 | **indice** : mot n° 6 = « بلا » | — |
| `b21@جلسة` | 69,78 | « جلسة. » (n° 7) | — |
| `b21@end` | 70,08 | fin du beat | — |
| **b22** | 70,19 → 72,95 | المتهمة غير هي. والوالدين كيسمعو شنو وقع، وكيبكيو. | |
| `b22` | 70,19 | début du beat | — |
| `b22@المتهمة` | 70,19 | « المتهمة » (n° 0) | — |
| `b22@غير` | 70,63 | « غير » (n° 1) | — |
| `b22@والوالدين` | 71,08 | « والوالدين » (n° 3) | — |
| `b22@كيسمعو` | 71,62 | « كيسمعو » (n° 4) | — |
| `b22@وكيبكيو` | 72,51 | « وكيبكيو. » (n° 7) | — |
| `b22@end` | 72,95 | fin du beat | — |
| **b23** | 73,06 → 75,93 | الخبرا قالو: من برا، الشراب والدم فالراس بحال بحال. | |
| `b23` | 73,06 | début du beat | — |
| `b23@الخبرا` | 73,06 | « الخبرا » (n° 0) | — |
| `b23@قالو` | 73,46 | « قالو: » (n° 1) | — |
| `b23@3` | 73,96 | **indice** : mot n° 3 = « برا، » | — |
| `b23@الشراب` | 74,21 | « الشراب » (n° 4) | — |
| `b23@والدم` | 74,60 | « والدم » (n° 5) | — |
| `b23@فالراس` | 74,94 | « فالراس » (n° 6) | — |
| `b23@بحال` | 75,34 | « بحال » (n° 7) | — |
| `b23@8` | 75,64 | **indice** : mot n° 8 = « بحال. » | — |
| `b23@end` | 75,93 | fin du beat | — |
| **b24** | 76,04 → 78,66 | والقاضية قالت: مع 3 بالكثير، Scanner كان ضروري. | |
| `b24` | 76,04 | début du beat | — |
| `b24@والقاضية` | 76,04 | « والقاضية » (n° 0) | — |
| `b24@2` | 76,83 | **indice** : mot n° 2 = « مع » | — |
| `b24@3` | 77,03 | **indice** : mot n° 3 = « 3 » | — |
| `b24@بالكثير` | 77,19 | « بالكثير، » (n° 4) | — |
| `b24@Scanner` | 77,63 | « Scanner » (n° 5) | -0,2 |
| `b24@ضروري` | 78,32 | « ضروري. » (n° 7) | — |
| `b24@end` | 78,66 | fin du beat | — |
| **b25** | 79,08 → 82,30 | الحكم: القتل غير العمد. 15 شهر auf Bewährung، يعني sursis، | |
| `b25` | 79,08 | début du beat | -0,2 |
| `b25@الحكم` | 79,08 | « الحكم: » (n° 0) | — |
| `b25@القتل` | 79,43 | « القتل » (n° 1) | — |
| `b25@4` | 80,37 | **indice** : mot n° 4 = « 15 » | — |
| `b25@auf` | 80,82 | « auf » (n° 6) | — |
| `b25@sursis` | 81,91 | « sursis، » (n° 9) | — |
| **b26** | 82,41 → 83,59 | و20000 أورو للوالدين. | |
| `b26@و20000` | 82,41 | « و20000 » (n° 0) | — |
| `b26@أورو` | 82,80 | « أورو » (n° 1) | — |
| `b26@للوالدين` | 83,10 | « للوالدين. » (n° 2) | — |
| `b26@end` | 83,59 | fin du beat | — |
| **b27** | 83,70 → 86,43 | والحكم ما كانش نهائي… وما لقيناش واش ولى نهائي. | |
| `b27` | 83,70 | début du beat | — |
| `b27@والحكم` | 83,70 | « والحكم » (n° 0) | — |
| `b27@كانش` | 84,30 | « كانش » (n° 2) | — |
| `b27@نهائي` | 84,59 | « نهائي… » (n° 3) | — |
| `b27@وما` | 84,94 | « وما » (n° 4) | — |
| `b27@لقيناش` | 85,19 | « لقيناش » (n° 5) | — |
| `b27@8` | 86,08 | **indice** : mot n° 8 = « نهائي. » | — |
| `b27@end` | 86,43 | fin du beat | — |
| **b28** | 86,85 → 90,41 | ضربة فالراس مع الشراب: إلا شكيتي، ولا تبدلات حالتو، دير Scanner. | |
| `b28` | 86,85 | début du beat | -0,2 |
| `b28@ضربة` | 86,85 | « ضربة » (n° 0) | — |
| `b28@الشراب` | 87,74 | « الشراب: » (n° 3) | — |
| `b28@إلا` | 88,13 | « إلا » (n° 4) | — |
| `b28@شكيتي` | 88,38 | « شكيتي، » (n° 5) | — |
| `b28@ولا` | 88,73 | « ولا » (n° 6) | — |
| `b28@تبدلات` | 88,98 | « تبدلات » (n° 7) | — |
| `b28@دير` | 89,72 | « دير » (n° 9) | — |
| `b28@Scanner` | 89,97 | « Scanner. » (n° 10) | — |
| `b28@end` | 90,41 | fin du beat | — |
| **b29** | 90,52 → 93,73 | وبلا Scanner: كل شوية فيّقو، شوف les pupilles، وكتب الساعة. | |
| `b29` | 90,52 | début du beat | — |
| `b29@Scanner` | 90,82 | « Scanner: » (n° 1) | — |
| `b29@كل` | 91,26 | « كل » (n° 2) | — |
| `b29@فيّقو` | 91,76 | « فيّقو، » (n° 4) | — |
| `b29@شوف` | 92,05 | « شوف » (n° 5) | — |
| `b29@pupilles` | 92,55 | « pupilles، » (n° 7) | — |
| `b29@وكتب` | 93,04 | « وكتب » (n° 8) | — |
| `b29@الساعة` | 93,34 | « الساعة. » (n° 9) | — |
| `b29@end` | 93,73 | fin du beat | — |
| **b30** | 93,84 → 96,80 | والقاضية قالتها: وخا تسول زميل، المسؤولية كتبقى ديالك. | |
| `b30` | 93,84 | début du beat | — |
| `b30@والقاضية` | 93,84 | « والقاضية » (n° 0) | — |
| `b30@قالتها` | 94,33 | « قالتها: » (n° 1) | — |
| `b30@وخا` | 94,73 | « وخا » (n° 2) | — |
| `b30@تسول` | 94,98 | « تسول » (n° 3) | — |
| `b30@زميل` | 95,28 | « زميل، » (n° 4) | — |
| `b30@المسؤولية` | 95,57 | « المسؤولية » (n° 5) | — |
| `b30@كتبقى` | 96,11 | « كتبقى » (n° 6) | — |
| `b30@ديالك` | 96,45 | « ديالك. » (n° 7) | — |
| `b30@end` | 96,80 | fin du beat | — |
| **b31** | 97,20 → 99,08 | السكران كيفيق… إلا كان غير سكران. | |
| `b31` | 97,20 | début du beat | -0,3 |
| `b31@السكران` | 97,20 | « السكران » (n° 0) | — |
| `b31@كيفيق` | 97,64 | « كيفيق… » (n° 1) | — |
| `b31@إلا` | 97,99 | « إلا » (n° 2) | — |
| `b31@غير` | 98,49 | « غير » (n° 4) | — |
| `b31@5` | 98,74 | **indice** : mot n° 5 = « سكران. » | — |
| `b31@end` | 99,08 | fin du beat | +0,15 · +2,5 · +2,7 · +2,8 · +3,0 · +3,3 · +3,5 |

### Repères fragiles (à revérifier dès que la voix est montée)

- **Les dix-sept repères par indice** : `b1@1`, `b1@4`, `b3@5`, `b5@6`, `b8@1`, `b12@1`, `b13@6`, `b16@0`,
  `b17@1`, `b21@6`, `b23@3`, `b23@8`, `b24@2`, `b24@3`, `b25@4`, `b27@8`, `b31@5`. Ils visent un RANG : si
  l'auteur ajoute ou retire un mot dans la phrase (variantes prévues par le scénario : « فديك الليلة، ما عرفناش
  فوقاش » en b13, « غير Scanner اللي كيفرق… » en b23, « ما يفوتش 3 ديال الليل » en b24, « Herzalarm، يعني… » en
  b17), il faut recompter. Les trois plus sensibles : `b13@6` (le mot « طبيب » de « طبيب البنج »), `b23@3` et
  `b23@8` (toute la scène des experts en dépend), `b24@3` (l'horloge s'arrête sur 3 h).
- **Les nombres dits en entier** (« 41250 », « 20000 », « 8:40 ») : dans `beats.js` ils restent UN mot écrit en
  chiffres ; l'alignement donnera à ce mot toute la durée du nombre parlé. Le soulignement de « 41.250 € »
  (`b1@4`) et les billets (`b26@و20000`) partiront donc au DÉBUT du nombre : c'est voulu.
- **Les repères placés dans une pause** : `b7-0.30`, `b11-0.30`, `b15-0.30` (le souffle avant « من الداخل »),
  `b17-0.45` (la respiration), `b31-0.3`, `b19@end+0.1` → `b20-0.25` (le silence). Si le montage de la voix
  change ces pauses (`PAUSE_BEFORE`, `EXTRA`), vérifier que l'encre a encore le temps de couvrir le haut
  (0,24 s) avant que la ligne ne monte, et que la scène muette garde au moins 3,0 s.
- **`b19@8:40`** : le mot contient « : » et se vise par le mot ; si l'auteur dit « التمنية وربعين » et que le
  sous-titre est réécrit en lettres, remplacer par l'indice du dernier mot.
- **Les deux repères « préfixés »** : `b8@Friedrichshafen` et `b20@Tettnang` visent « فـFriedrichshafen » et
  « فـTettnang » (le mot contient le repère) : sans risque.
---

## 7. Risques et solutions

### Ce que les essais ont montré (captures regardées, corrections déjà intégrées)

| essai | constat | correction dans ce document |
|---|---|---|
| `essai_cast.png` | la tenue `jacket` (haut blanc ouvert) se lit comme une blouse : la médecin « en civil », le cycliste et le père avaient l'air de médecins | plus aucun `jacket` : `DOC` en `sweater` hors de la nuit, `VEL` en `casual`, `PER` en `suit` |
| `essai_cast.png` | la soignante et l'anesthésiste, tous deux à lunettes rondes et en `scrubs`, se confondaient | `PFL` sans lunettes, cheveux foncés ; `ANA` gris, à lunettes, masque au cou |
| `essai_cast.png` | la pose à genoux mesure 361 px (et non ≈ 330) | `VEL` à 0,72 dans le pré (260 px, sommet à h 352 sous le cadre à h 370) |
| `essai_cast.png` | la pose « à vélo » fonctionne (mains au guidon, hanche sur la selle) ; la pose « penchée derrière le lit » aussi | valeurs reprises telles quelles au § 1 |
| `essai_cast.png` | `DOC` en `sweater`, `GAR` et `MER` ont le même pull gris | voir R19 : jamais deux pulls côte à côte, foulard de `MER` |
| `essai_diptyque.png` | en position « dedans », la mention du coin haut gauche tombait sur l'écran du moniteur | mention masquée dans les scènes « dedans » |
| `essai_diptyque.png` | l'arabe de la pastille B touchait le haut de la coupe du crâne | coupe réduite à 1,05 et descendue (centre (470, 1090), haut à y 796) |
| `essai_diptyque.png` | le médaillon gauche frôlait la tête de la médecin ; un distributeur de gants sortait du cadre en position « égal » | médaillon G recentré en (245, 455), r 118 ; `DOC` à x 430 ; distributeur supprimé |
| `essai_carte.png` | un trait de « zoom » traversait « kein veröffentlichtes Urteil » ; « Bodensee » mordait la rive ; la pastille « Friedrichshafen » était posée sur l'eau ; le bas du cartouche était vide | traits de zoom ramenés sur la gauche du cartouche ; libellé au milieu du grand lac ; pastille sur la terre ; cartouche descendu et raccourci (y 690–1340) |

### Risques de construction

| n° | risque | solution proposée |
|---|---|---|
| R1 | **Un personnage décapité par le cadre** quand la ligne monte en position « dedans » | règle absolue : aucun personnage debout à l'image dans S6, S10, S13 ; les passages se font sous `ENCRE-HAUT` ; dans le pré, `VEL` est déjà à genoux (0,72). Contrôle : planche image par image (`--step 0.05`) autour de `b7-0.30`, `b11-0.30`, `b15-0.30` |
| R2 | **La découpe qui bouge** (deux `clipPath` redessinés à chaque image) et l'affiche-résumé, qui recopie le contenu des scènes | un `clipPath` par scène et par moitié (ids uniques) mis à jour dans `c.tick` ; l'affiche exécute les `tick` de chaque scène à l'instant `freezeAt` juste avant de la copier, la découpe reste donc dans le bon état. Contrôle : regarder les 28 cases une à une |
| R3 | **Un `cut` visible dans un même lieu** (saut du bas, de la ligne, de la poussée) | toutes les animations continues sont des fonctions du temps absolu (§ Conventions) ; `box(…, { construire: null })` ne rejoue aucun `m.build` ; la poussée intérieure est définie par séquence de lieu. Contrôle : planche à `--step 0.05` autour de `b10`, `b12-0.15`, `b13`, `b16-0.08`, `b17-0.45`, `b18` |
| R4 | **Scène « figée »** : sans caméra, la mesure du mouvement peut tomber sous le seuil (S10, S13, S14 surtout) | déjà prévus : poussée intérieure des deux moitiés, tracé du moniteur, respiration, rideau, poussière du faisceau, encre qui gagne, souffle de la ligne, ombres du couloir. Si une scène reste sous 3 % : porter la poussée à 1,05 et ajouter `m.dust` (grain de papier, 14 grains, opacité 0,5) dans la moitié basse. **Ne pas ajouter de mouvement de caméra.** La fin de S18 est figée exprès |
| R5 | **Le garçon allongé** (dans l'herbe, sur le brancard, sur le lit) — le dessin le plus difficile de l'épisode | `D.gisant`, dessin dédié, JAMAIS une tête Persona pivotée. À faire en premier, avec sa propre capture d'essai (`out/essais/essai_gisant.png`) : profil, boucles blondes sur l'oreiller, capuche, bras posé, proportions à côté de `DOC` à 0,95 (sa tête : ≈ 100 px de long). Les trois tenues (`drap`, `dehors`, `col: "blouse"`) sur la même planche |
| R6 | **Les parents de dos** : Persona n'a pas de vue de dos | `D.dos`, dessin dédié avec de vrais détails (raie, nuque, foulard, oreilles, col), épaules qui respirent ; essai dédié ; les têtes ne recouvrent ni le pupitre ni l'accusée (coordonnées de S21) |
| R7 | **La chute à vélo** : passer de la pose « à vélo » à la pose « à genoux » en 0,3 s peut croiser des membres | `Persona.mix` contrôlé image par image ; solution de repli : les trois arcs de poussière couvrent le corps pendant 0,15 s et l'on passe directement à la pose à genoux. Le vélo, lui, bascule par simple rotation |
| R8 | **Un personnage qui glisse** | toutes les entrées se font avec un vrai cycle `PP.walk` : `PFL` (S11), `ANA` (S12), `DOC` et `PFL` en courant (S15), `DOC` qui sort (S9), `DOC` dans la rue (S19). Le lit qui roule en S16 a des roues qui tournent et deux personnes qui marchent |
| R9 | **Bras croisés ou raides** | cibles à distance naturelle (90–150 px × échelle) : `DOC` vers la tempe (S8), `PFL` vers le bouton d'alarme (à 65 px à droite de son épaule, hauteur de tête), `DOC` vers deux barreaux VOISINS (S1), `DOC` et la lettre (S20), `PER` main ouverte (S24). Derrière le lit, les bras au repos pendent : le lit les cache |
| R10 | **Colonne des boutons Instagram** (x > 915, y 980–1650) | éléments les plus proches, tous dedans : étiquette « من الداخل » (x ≤ 880) ; `MER` en S24 (bord droit ≈ x 870) ; `EX2` en S22 (x 814–886) ; table de la défense en S21 (x ≤ 900) ; porte « CT » de S26 (x ≤ 860) ; carte du lac (bord x 905) ; feuille de S27 (x ≤ 870). Ce qui dépasse x 915 est toujours au-dessus de y 980 : porte « Intensiv » (y ≤ 900 dans les trois positions), fenêtre de droite de S21, lanterne du lampadaire et mini-carte de S19, pastille « OP · 8:40 Uhr » |
| R11 | **Bas du cadre et sous-titres** | rien de porteur de sens sous y 1440 pendant qu'on parle : étiquette de statut de S1 (y ≤ 1466, seule exception : elle est sous la ligne des textes, à contrôler avec la vraie boîte de sous-titres ; sinon la remonter de 26 px en raccourcissant le pupitre), « Schema » (≤ 1454), bande des citations (≤ 1440). `glossaire-episode.js` reste VIDE pour que la boîte des sous-titres ne grandisse pas (annexe A). La phrase de la scène muette est à y 1440–1486 : aucun sous-titre à ce moment |
| R12 | **Textes qui se recouvrent** | couples à surveiller au scan : pastille A ↔ médaillon D (jamais ensemble) ; pastille A ↔ bulle de S12 (la pastille se masque à `b14@وقال`) ; horloge ↔ mention en S16 (horloge garée à y 372) ; « 15 Monate » ↔ tête de `DOC` (y 985 / 1022) ; arabe de « auf Bewährung » ↔ tête de `JUG` (x ≤ 750 / ≥ 766) ; « ما قبلاتش » ↔ la ligne (y 852 / 870) ; citation de S14 ↔ mention (y 336 / 316) ; pastille de l'hélicoptère ↔ pales (y 815 / 840) ; pastille B ↔ étiquette « من الداخل » (x ≤ 680 / ≥ 700) ; plaque du médaillon D ↔ plaques des portes (elle les couvre entièrement) |
| R13 | **Arabe et latin dans une même ligne** (« alarme ديال Réanimation », « الطبيبة ديال la garde », « عيطو على hélicoptère », « كثر من 1,9 ‰ فالدم », « بلا Scanner », « غير Scanner كيفرق… », « من بعد Einspruch، … », « ملي كيصوني الـMonitor، … ») : l'ordre des mots peut s'inverser à l'affichage | `direction: rtl` + `unicode-bidi: plaintext` sur ces textes ; les relire UN PAR UN sur capture |
| R14 | **Signes absents de la police Kalam** (« ≠ », « ↻ », « ✓ », peut-être « ≈ », « ‰ », « „ " ») | « = », « ≠ », « ↻ » et les coches sont DESSINÉS (tracés à main levée), pas tapés ; contrôler sur capture « ≈ 100 m », « ≈ 6:30 Uhr », « 1,9 ‰ », « § 411 », « 41.250 € », les guillemets allemands ; sinon écrire « ca. » et « Promille » |
| R15 | **L'affiche : 28 cases de 111 px**, petites | réglage par défaut : 7 colonnes × 4 rangées (tout l'épisode y est, grille finie à y 882). Si l'auteur les trouve trop petites : 6 colonnes × 4 rangées (cases de 133 px, grille de y 350 à y 980) en passant S7, S17, S20 et S25 en `summary: false` |
| R16 | **Coût de dessin** : `D.dedans` et le lavis se redessinent souvent | `ENC` arrondi au 1/80 (≤ 80 redessins sur toute la nuit) ; tracés nets sans rough ; le lavis est un seul tracé ; le mode ECG ne vit que 3 s |
| R17 | **La voix réelle change le texte** | (a) plus longue de 3–4 s (nombres dits en entier) : rien à faire, tout suit les repères. (b) l'auteur accepte la coupe n° 1 (b9 devient une étiquette écrite) : S8 perd son beat — la caler de `b8@end+0.1` à `b10`, ses événements en décalages fixes (+ 0,3 / + 0,8 / + 1,2 s), et contrôler que « „nur ein Prellpunkt" » reste 1,2 s à l'écran. (c) coupe n° 2 (« المتهمة غير هي ») : en S21 la pastille « Angeklagte » et le rond jaune se calent sur `b22`. (d) phrases en réserve : voir ci-dessous |
| R19 | **Deux pulls gris dans la même image** : en S24, `DOC` et `MER` portent la même tenue Persona (`sweater`) — vu sur `essai_cast.png` | elles sont aux deux bouts du cadre, `DOC` derrière la grille ; `MER` porte un grand foulard clair (`D.foulard`, 90 × 46, bien visible) et tient le bras de son mari. Ne PAS rhabiller `DOC` en `jacket` (blanc = blouse) |
| R18 | **Phrases en réserve du scénario**, si l'auteur les ajoute | après b16 (« le moniteur… ») : S14 est prolongée, la citation est déjà là. Après b22 (« seule avec 30 patients » + la réponse de la juge) : dans S21, deux étiquettes côte à côte, jamais l'une sans l'autre — « laut Angeklagter » au-dessus d'elle, « laut Gericht » au-dessus de la juge. Après b26 (Berufsverbot demandé, refusé) : une ligne de texte grisée sous la pastille de S24, « Berufsverbot: beantragt — abgelehnt », jamais une icône, jamais le mot seul |

### Risques de vérité (ce qu'une image peut affirmer sans le vouloir)

| l'image interdite | pourquoi | ce qu'on dessine à la place |
|---|---|---|
| une alarme sur l'écran du moniteur, un tracé qui s'affole à 3 h ou à 6 h | rien n'est publié sur le moniteur cette nuit-là | le tracé garde le même rythme ; l'alarme de 6 h est le bouton mural frappé par la soignante |
| une heure lisible pendant b13–b14 | l'heure de la consultation n'est pas publiée | l'horloge-fantôme et « Uhrzeit: nicht berichtet » |
| l'autocollant « betrunken » posé par la médecin ou par le collègue | elle a noté le soupçon ; lui n'a pas été poursuivi | il tombe du haut du cadre, de personne |
| une seringue, un comprimé, une perfusion | le médicament a deux versions, jamais nommé | rien |
| l'hélicoptère en vol avec le patient | la presse dit « alarmiert » | il est posé ; un pointillé neutre relie les deux villes |
| les parents à l'hôpital, une étreinte au chevet | non sourcé (ils ne sont cités qu'à l'audience) | scène muette sans eux ; leurs larmes en S21 |
| un lieu ou une heure pour le décès | deux versions contradictoires | un lieu neutre, pas d'horloge, « laut Presse » |
| une cellule, des barreaux pleins | 15 mois AVEC sursis | la grille en pointillés qui s'ouvre |
| le Berufsverbot, les 21 mois, le licenciement, l'Approbation | peines demandées ou faits hors jugement | rien (sauf décision de l'auteur, R18) |
| « Assistenzärztin », « jung », « 38 Jahre », le nom de l'établissement, la commune du garçon, un nom de personne | contradictoires ou interdits | « diensthabende Ärztin », « Notaufnahme », « Friedrichshafen », « Amtsgericht Tettnang », « Ravensburg » |
| la pluie, une flaque, une plaie, du sang rouge, le garçon qui se tient la tête | inventés | brume et papillons ; une petite marque hachurée ; l'encre noire, en bas seulement |
| un visage fautif ou moqueur pour la soignante ou l'anesthésiste | non poursuivis | neutres, attentifs |

---

## 8. Check-list de contrôle (pour celui qui construit)

Avant d'écrire les scènes :
- [ ] `out/essais/essai_gisant.png` (R5), `essai_dos.png` (R6), `essai_crane.png` (la coupe à `ENC` 0 / 0,22 / 0,62 /
      0,78 / 1 et `PLEIN` 1) regardés et validés.
- [ ] `index.html` copié du gabarit ; `Stage.create(sv, { view: { s: 1, oy: 0, breathe: 0 } })` ; `decor.js` chargé ;
      `glossaire-episode.js` vide ; `assets/portrait.png` présent (jamais dans git).

Après chaque scène, puis sur l'épisode entier (depuis `sketch-video/`) :
- [ ] **Erreurs d'exécution** : `node tools/errcheck.mjs videos/akte-friedrichshafen-nacht/index.html 0 5 9 20 27 37 48 53 58 63 66 75 82 90 98 102`
      → `SV.error=null`, aucune ligne `PAGEERR` / `CONSOLE`.
- [ ] **Repères** : `node tools/cuetimes.mjs videos/akte-friedrichshafen-nacht/index.html` avec la liste du § 6 →
      aucun échec ; à refaire quand `timings.js` viendra de la vraie voix.
- [ ] **Planches avec la maquette Instagram** : `node tools/planche.mjs videos/akte-friedrichshafen-nacht --beats --ig`
      → sur chaque image : rien d'important sous les zones rouges ; l'étiquette « من الداخل », la porte
      « Intensiv », `MER`, `EX2` hors de la colonne des boutons ; le logo jamais recouvert.
- [ ] **Débuts de scène image par image** : `--from <début − 0.4> --to <début + 1.0> --step 0.1` pour les 29 scènes ;
      à `--step 0.05` pour les quatre passages « dedans » et pour le scanner (S16) : aucune tête coupée, aucun saut
      du bas ni de la ligne, l'encre couvre bien tout le haut avant que la ligne ne monte.
- [ ] **Chevauchements** : `node tools/overlapscan.mjs videos/akte-friedrichshafen-nacht/index.html 0 105 0.1` →
      aucune paire parmi celles de R12 ; aucun texte arabe touché par un trait, une goutte d'encre, un billet, la ligne.
- [ ] **Mouvement** : `node tools/mouvement.mjs videos/akte-friedrichshafen-nacht --min 3` → aucune scène « FIGÉ »
      hors intro et fin de S18 ; sinon appliquer R4.
- [ ] **Zones** : `python3 tools/ig_overlay.py` sur une capture de S1, S6, S16, S21, S24, S27, S30.
- [ ] **L'affiche** : 28 cases lisibles, grille finie à y 882, la dernière case = la dernière image de S29, pas
      d'à-coup au départ du dézoom, la question sur deux lignes dans sa carte, la flèche sur le bouton commentaire.

Contrôles propres à cet épisode :
- [ ] La ligne : jamais de graduation ; pente 0° avant b11, 6° à 6 h, 0° après le troisième battement ; elle est
      masquée de S19 à S28.
- [ ] L'horloge : fantôme de `b13-0.1` à `b15-0.30`, aucune heure lisible ailleurs dans l'image pendant ce temps.
- [ ] La plaque « CT » est visible et ÉTEINTE dans S8, S9, S11, S12, S14, S15 ; elle ne s'allume qu'en S16.
- [ ] L'autocollant couvre « Verd » et laisse « acht » ; il se décolle en S29 et le mot reparaît.
- [ ] `talk` : seulement `JUG` (S1, S23, S28), `ANA` (S12), `EX1` / `EX2` (S22). `DOC` et `PFL` : jamais.
- [ ] « laut Presse » présent sur S1, S2, S5, S7 à S9, S11, S12, S14 à S17, S19 à S25, S28 et sur la phrase de
      S18 ; « Rekonstruktion » sur S2, S9 (sous le médaillon), S12 ; « Schema » de S6 à S16 ; jamais « laut Urteil ».
- [ ] Les citations allemandes recontrôlées À L'ŒIL sur les pages des articles (consigne du dossier) et, pour la
      Leitlinie, sur le PDF officiel de l'AWMF.
- [ ] Aucun nom de personne, d'hôpital ni de journal ; aucun logo ; feux d'ambulance sans bleu.
- [ ] Les chaînes arabes de l'annexe B marquées « à valider » relues par l'auteur.
- [ ] Mains en moufle partout ; aucune tête Persona pivotée ; aucun personnage qui glisse.

---

## Annexes

### A. `index.html` et `glossaire-episode.js`

- `index.html` = celui du gabarit ; titre « AKTE 09 – غير سكران » ; `SV_CONFIG` inchangé (`captionBottom: 320`,
  `capWords: 4`, `capTr: false`). Deux classes en plus : `.mn { font-family: Kalam; font-weight: 700; fill: #55524B; }`
  (mentions) et `.bi { direction: rtl; unicode-bidi: plaintext; }` (lignes arabes qui contiennent du latin).
- `glossaire-episode.js` : **vide** (`window.GLOSSARY = Object.assign(window.GLOSSARY || {}, {});`). Les six mots
  allemands dits (Bodensee, Friedrichshafen, Anästhesist, Tettnang, Strafbefehl, auf Bewährung) sont soit des
  noms propres, soit expliqués par la voix dans la même phrase (« يعني … ») et par une pastille : inutile de les
  traduire encore sous le sous-titre, et la boîte reste sur une ligne.

### B. Chaînes arabes de l'écran

Toutes viennent de `scenario.md` (texte dit ou tableau « Mots allemands à l'écran »). **À valider par l'auteur**
(marquées telles dans le scénario) : « رسم توضيحي » (S6) · « ملي كيصوني الـMonitor، كيكون فات الحال » (S14) · « من
بعد Einspruch، المحكمة ماشي مربوطة بالغرامة » (S20) · « مراقبة كل شوية » (S27).
Assemblées ici à partir de mots du texte dit, à relire aussi : « سولات طبيب » (sur la feuille « Rat », S2 et S28) ·
« الشراب » / « الدم فالراس » (négatoscope, S22) · « بالكثير » / « ضروري » (S23) · « إلا شكيتي » / « ولا تبدلات
حالتو » (S26) · « العظم » / « الدم » / « المخ » (coupe, S13) · « حسب الصحافة · الحكم ما كانش نهائي » (affiche) ·
« ما عاشش · 18 عام » (S18) · « القاعدة » (ruban de la règle).
Arabe + latin dans la même ligne (classe `.bi`, R13) : « الطبيبة ديال la garde », « كثر من 1,9 ‰ فالدم », « بلا
Scanner », « ولى agité كثر », « alarme ديال Réanimation », « عيطو على hélicoptère », « غير Scanner كيفرق بين الشراب
والضربة فالراس », « les pupilles ».

### C. Textes allemands qui ne sont PAS des citations (annotations de la série, sans guillemets à l'écran)

« 15 Monate », « Einspruch » (écrit à la plume), « STRAFBEFEHL », « Geldstrafe: », « Amtsgericht », « Rat vom Kollegen », « erfahrener
Kollege », « diensthabende Ärztin », « September 2023 », « kein veröffentlichtes Urteil », « 18 Jahre », « nach
Mitternacht », « kurz nach 2 Uhr », « 3 Uhr », « Uhrzeit: nicht berichtet », « 3 Stunden », « 6 Uhr », « ≈ 6:30
Uhr », « ≈ 100 m », « RETTUNGSDIENST », « Notaufnahme », « Alkohol », « Verdacht », « Verdacht: Schädelverletzung
? », « CT: — », « kein CT », « Beobachtung », « Bewusstsein », « Motorik », « Pupillen: — », « Intensiv », « CT »,
« Schema », « Knochen », « Blut », « Gehirn », « Schädelbruch », « Hubschrauber alarmiert », « OP · 8:40 Uhr »,
« Sitzungssaal », « Blutung », « spätestens », « zwingend », « in Raten », « URTEIL », « danach: nichts gefunden »,
« Kopf + Alkohol », « Verschlechterung », « Neurologische Überwachung », « Uhrzeit », « ohne », « Verantwortung ».

Citations ou termes de source, toujours sous « laut Presse » (ou la Leitlinie) : « „nur ein Prellpunkt" »,
« „verstärkte Unruhe" », « „ausschlafen lassen" », « „Wenn der Monitor … warnt, ist es zu spät." », « „… die einzige
Möglichkeit …" », « „Spätestens um 3 Uhr sei die CT-Untersuchung zwingend gewesen." », « „… habe sie nicht von
ihrer Verantwortung enthoben." », « Blutung zwischen Schädelknochen und Hirnhaut », « mehr als 1,9 Promille »,
« nicht rechtskräftig (Stand 05.05.2026) », « in Zweifelsfällen », « engmaschige neurologische Überwachung »,
« mit Uhrzeit dokumentiert », « mindestens jede Stunde, besser jede halbe Stunde ».

### D. Ordre d'écriture conseillé

1. `decor.js` : `D.gisant` → `D.crane` + `D.dedans` → `D.ligne`, `D.horlogeLigne`, `D.lavis` → le box (E) → le
   reste. Une capture d'essai par famille.
2. `story.js` : les fonctions du temps et `diptyque()` avec une scène vide ; contrôler la ligne seule, de 0 à
   65 s (elle doit monter, descendre, pencher, disparaître, revenir).
3. Le box (`box()`), puis S8 → S16 d'un bloc ; puis S5, S6, S7 ; puis S1, S2, S3 ; S4 et S17 ; S18.
4. Le tribunal S19 → S25, la règle S26 → S28, S29, l'affiche.
5. Les contrôles du § 8, scène par scène puis en entier.

### E. Écarts avec la fiche de `SAISON-2.md` (tous imposés par le dossier relu ou par une règle de la série)

| la fiche disait | ce document fait | raison |
|---|---|---|
| en haut, « ce qu'elle voit (il cuve) » | en haut, ce que n'importe qui voit du dehors ; elle doute et l'écrit | elle a noté le soupçon (F12) |
| « Assistenzärztin de 38 ans », jeune | « diensthabende Ärztin », sans âge | statut contradictoire dans la presse (F28) |
| scène muette : sur le lit des urgences, les parents arrivent à l'aube et s'enlacent | lieu neutre, sans parents ; la ligne devient la ligne plate | réanimé, transféré, opéré ; parents sourcés seulement au tribunal (F26, F27, F43) |
| bruine | brume et papillons de nuit | la météo n'est pas sourcée et une route mouillée « expliquerait » la chute |
| la procureure | un procureur | le dossier dit « un homme » |
| l'étiquette « betrunken » collée sur lui, cachant la plaie | collée sur le lit, cachant à moitié « Verdacht » ; pas de plaie | il n'y a qu'une marque (F11) ; l'étiquette ne doit venir de personne |
| les deux moitiés se rejoignent au scanner — « trop tard » | elles se rejoignent au scanner ; le « trop tard » n'est pas écrit | la voix ne le dit pas ; l'opération a encore lieu ensuite |
| transition `fade` « par l'encre » partout | encre pendant la nuit et pour la dernière image ; fondus simples au tribunal | donner un sens à l'encre (elle appartient à la nuit) |
| « salle d'attente à l'aube » | supprimée | aucun parent à l'hôpital dans les sources |

### F. La carte : projection et tracé du lac (géographie générale — à contrôler sur une vraie carte)

Projection du cartouche : `x = 500 + (lon − 9,40) × 0,674 × 1500`, `y = 1000 − (lat − 47,65) × 1500`.
Friedrichshafen (9,479 ; 47,654) → (580, 994) · Tettnang (9,588 ; 47,670) → (690, 970) · Ravensburg
(9,611 ; 47,782) → (713, 802).

Contour simplifié du lac (longitude, latitude), dans l'ordre, à lisser par des courbes :
(9,75 ; 47,505) (9,75 ; 47,53) (9,68 ; 47,545) (9,63 ; 47,57) (9,60 ; 47,585) (9,54 ; 47,595) (9,52 ; 47,62)
(9,48 ; 47,65) (9,42 ; 47,66) (9,36 ; 47,665) (9,32 ; 47,675) (9,27 ; 47,69) (9,23 ; 47,72) (9,16 ; 47,765)
(9,09 ; 47,795) (9,05 ; 47,815) (9,03 ; 47,80) (9,08 ; 47,77) (9,13 ; 47,745) (9,16 ; 47,725) (9,19 ; 47,705)
(9,21 ; 47,685) (9,21 ; 47,665) (9,19 ; 47,65) (9,24 ; 47,63) (9,29 ; 47,605) (9,38 ; 47,565) (9,43 ; 47,515)
(9,49 ; 47,48) (9,56 ; 47,49) (9,61 ; 47,52) (9,65 ; 47,51) (9,69 ; 47,495).
Le bras ouest (Untersee) n'est pas dessiné : le cartouche s'arrête à Konstanz. Vu sur
`out/essais/essai_carte.png` : la forme se lit comme le Bodensee.

---

## Écarts de construction

### Étape « socle et décors 1 » (26.11.2026)

Ce qui a été dessiné autrement que l'inventaire (§ 2), et pourquoi. Tout a été vu sur `out/essais/` et à l'échelle
réelle à côté des personnages Persona, aux places des scènes S1 à S7.

| objet | storyboard | construit | pourquoi |
|---|---|---|---|
| A2 `D.horlogeLigne`, mode fantôme | aiguilles grises en pointillés | **aucune aiguille**, un grand « ? » | les aiguilles grises montraient encore « 3 h » : une heure lisible pendant b13–b14 (interdit, § 3.2) |
| A11 `D.teteProfil`, `cercle: 1` | cercle en pointillés complet | idem (corrigé) | l'arc fermé ne se dessinait pas : le cercle disparaissait à la fin du tracé |
| B1 `D.entree` | blouse x 812–908 jusqu'à y 650 ; lampe (880, 585–660) | patère et blouse à gauche (crochet (836, 386) à l'écran), blouse plus courte (jusqu'à y 618) ; lampe en (912, 580–652) | la blouse cachait entièrement la lampe de la console |
| B1 `D.entree` | — | pas de paillasson | il passait sous « ما قبلاتش » (300, 842) |
| B1 `D.entree`, clapet | `m.pend` 22° | paramètre `ouv` (0..1) : le clapet se soulève vers nous | un clapet vu de face bat d'avant en arrière ; une rotation dans le plan le ferait tourner comme une aiguille |
| B2 `D.lettre` | cachet rond en bas à droite ; « Einspruch » centré à +115 | cachet en haut à droite ; « Einspruch » centré à +136, montant remonté (ligne de base +72) | « Einspruch » (−9°) touchait le soulignement, le cachet et la goutte |
| B2 `D.lettre`, `petit` | titre et montant en Kalam 30 | titre Kalam 18, montant Kalam 30, « Einspruch » Kalam 25, pas de cachet | « STRAFBEFEHL » en Kalam 30 ne tient pas dans 150 px |
| B4 `D.grillePointillee`, `ouv` | 0 → 28° | portillon vu en perspective, 0 → 70° | à 28° la grille ne se lit pas comme ouverte |
| B5 `D.feuilleRat` | 190 × 150 | ≈ 230 × 150 | « Rat vom Kollegen » en Kalam 26 ne tient pas dans 190 px |
| B6 `D.couloirNuit` | — | plafonniers en x 250 et 860 (local), tout en haut | jamais derrière la pastille A (x 470–890, y 297–392) |
| C1 `D.carteLac` | montagnes en ligne continue au sud | huit sommets groupés au sud-est (les Alpes) + collines basses à gauche | la ligne continue se lisait comme une frise décorative et touchait le bord du cartouche |
| D7 `D.velo` | 250 × 150, roues r 50 | ≈ 390 × 250, roues r 77 à l'échelle 1 | géométrie de l'essai validé de la pose « à vélo » (hanche sur la selle, mains au guidon) : à r 50 le cycliste ne tient pas sur le vélo à la même échelle ; à 0,8 il fait 313 × 200 à l'écran |
| D7 `D.velo`, phare | cône de 260 px | `o.phareL` (260 par défaut) | en S6, vélo garé, le cône traverse le ciel : le passer à ≈ 120 |
| D11 `D.rtw` | 330 × 190 | ≈ 380 × 235 (x −70…310) | à 190 px l'ambulance était à peine plus haute que l'ambulancier (× 0,6 = 180 px) ; en S7 elle occupe x 190–570 au lieu de 240–570 |
| E5 `D.brancard`, barrière | barrière latérale abaissée | partie `barriere` à mi-hauteur, côté pied, DEVANT le garçon, avec le crochet de la planchette en (135, −150) | la planchette pend à h 215 (au-dessus du matelas) : il lui faut un crochet à cette hauteur |
| E10 `D.masqueCou` | sous le menton, ancre `neck` | dessiné de +12 à +48 sous l'ancre | l'ancre `neck` de Persona est à hauteur de bouche : le masque couvrait la bouche |

À savoir pour les scènes : D.velo, D.rtw, D.silhouette, D.casque, D.capuche et D.sacDos sont dessinés de profil vers la
droite (`flip` = vers la gauche, ancres déjà retournées) ; le casque suit l'ancre `top` et doit tourner avec la tête ;
le sac se pose AVANT le personnage. D.silhouette marche avec deux états, `ph` 0,25 et 0,75. Les grands décors ont des
parties (`o.part`) : un fond statique (`m.obj`) et chaque partie mobile dans son propre nœud.

### Étape « décors 2 » (26.11.2026) — S8 à S22, `decor-2.js`

Tout a été vu sur `out/essais/` et à l'échelle réelle, avec les personnages Persona aux places des scènes S8 à S22
(script hors dépôt : `compose2.mjs` dans le dossier de travail de la session, images dans `compo2/` à côté).

| objet | storyboard | construit | pourquoi |
|---|---|---|---|
| E3 `D.lampeExamen` | une lampe | deux parties : `lumiere` (cône, halo, tache) à poser DERRIÈRE les personnages, `bras` devant | le cône passe sur la tête de `DOC` (x 430) : posé devant, il lui jaunissait le visage |
| E4 `D.scope` | tracé qui défile, `plat` | + `o.ecg` (complexes donnés, comme `D.ligne`) et `o.cable` ; une 2e courbe grise (pouls), toujours sans chiffre | S18 : « le même complexe sur l'écran du moniteur » ; le câble suit le lit en S16 |
| E6 `D.planchette` | 96 × 130, « Verdacht » Kalam 22, « Beobachtung » Kalam 16 | 104 × 130, Kalam 20 et 14 ; ancrage = haut de l'anneau (pivot de `m.pend`), accrochée au crochet du brancard (135, −150) → pince à h ≈ 230 | les deux mots ne tenaient pas dans la feuille |
| E6 / A8 | autocollant centré (505, h 196) : il couvre « Verd » | à poser en **(492, h 196)** | à 505, son bord droit (rotation −8°) tombe à x ≈ 624 et cache aussi « a » ; l'ancre `mot` de la planchette donne l'étendue du mot |
| E7 `D.porteFond` | voyant « sur chaque plaque » | voyant dans un petit boîtier AU-DESSUS de la plaque | sur la plaque, il n'avait que 9 px à côté de « Intensiv » |
| E9 `D.ballon` | masque + valve + ballon | idem, `o.masque: false` si `D.gisant` porte déjà son masque (`masque: 1`) : poser alors l'ancrage sur l'ancre `bouche` | ne pas dessiner deux masques |
| E10 `D.montreBroche` | « rond jaune + barrette » | cadran SANS aiguilles | aucune heure lisible à l'image en dehors de l'horloge |
| E11 `D.feuilleGros` | « Verdacht: Schädelverletzung ? » en Kalam 30 | sur trois lignes (« Verdacht: » / « Schädel- » / « verletzung ? »), Kalam 26 ; « CT: — » décalé | en une ligne il sortait du rond (clip r 109) |
| E11, mode `pupillen` | « Pupillen: — » | « Pupillen: » imprimé + une **case vide** entourée ; « Bewusstsein » et « Motorik » suivis de pointillés pâles, sans réponse | la source dit que l'indication MANQUE (F19) : on n'écrit rien dans la case, et on n'affirme rien pour les deux autres |
| C4 `D.helico` | 190 × 110 | aire d'atterrissage cerclée sous les patins (jusqu'à y +17) ; rotor à y −113 | en S17, poser les patins en **(480, 940)** : à 950 l'aire touche la rive du lac |
| C5 `D.horlogeGrande` | « la même horloge en grand » | dessin à part : boîtier hachuré, anneau de suspension, 60 graduations | le storyboard demande un boîtier ; `D.horlogeLigne` n'en a pas |
| F1 `D.chambreNeutre` | ancrage coin bas gauche | (40, h 80) comme les autres décors « coin bas gauche » ; tache x 480–720 (écran 520–760) | même convention que `D.entree`, `D.couloirNuit` |
| F3 `D.chaiseSweat` | 110 × 210 | ≈ 120 × 214, chaise de profil tournée vers le lit ; pan + manche derrière, pan + capuche devant ; partie `cordons` à balancer | lisibilité du sweat plié |
| G1 `D.aube` | trois nuages | nuages en (160, 300), (540, 236), (930, 420) dans le repère (40, 270) | ils évitent la pastille, l'étiquette des dates et la mini-carte de S19 |
| G2 `D.amtsgericht` | fronton non décrit | fronton à œil-de-bœuf (AUCUNE armoirie), chaînes d'angle, banc à droite | décor de province sans symbole officiel |
| G5 `D.hall` | tableau x 130–330, y 560–800 (écran) | y 600–840 | l'étiquette « § 411 » fait trois lignes (y 430–580), voir ci-dessous |
| S20, étiquette | « من بعد Einspruch، المحكمة ماشي مربوطة بالغرامة » sur une ligne, x 110–540 | deux lignes, mêmes mots : « من بعد Einspruch، » / « المحكمة ماشي مربوطة بالغرامة » (`D.etiquette`, y 430–580) | en Plex 26 la phrase fait ≈ 540 px |
| S14, citation | 510 × 116 (x 110–620) | ≈ 605 × 126 (x 110–715) avec l'arabe en 28 | la ligne arabe fait ≈ 466 px ; le médaillon D est refermé quand elle arrive (`b16@مزيان+0.1`) |
| G6 `D.porteSalle` | « chaque vantail se referme sur son gond » | vantaux en perspective (largeur × 1 → 0,25, bords haut et bas qui fuient) | un vantail qui tourne sur son gond se voit en fuite |
| G7 `D.encreMontant` | `delave` | `delave` (les chiffres pâlissent) + `gouttes` (elles coulent, tombent, sèchent ; par défaut = `delave`), `bord` 70, `sol` 215 | les gouttes vont plus loin que le délavage |
| G8 `D.salle`, `fond` | mur, fenêtres, estrade, tables, barrière | + une boiserie derrière l'estrade et le haut dossier du fauteuil de la juge ; fenêtres cintrées. Parties : `fond`, `rayons`, `estrade`, `halo`, `tables`, `barriere` | un mur nu derrière la juge ; ordre de pose : fond, rayons, [JUG], estrade, halo, [PRO, DOC, AVO], tables, barrière, [les deux dos], banc |
| G8, `experts` / `nu` | « cadré sur l'estrade vide » / « mur nu » | `experts` : l'estrade vide est une marche basse (écran x 220–860, y 1240–1300) visible autour du pied du négatoscope ; `nu` : pas de fenêtre, une tache de lumière | S23 pose l'horloge et la plaque « CT » sur ce mur (y 450–700) |
| G9 `D.dos` | 190 × 300 chacun | ≈ 150 × 330 : proportions Persona (tête ±57, épaules ±66 / ±74), sommet de la tête à −234 / −238, épaules à ≈ −98 | au premier essai (épaules ±94), les épaules faisaient 1,6 fois la tête, à côté de `DOC` et `AVO` dessinés en Persona |
| G9, `bras` / `mouchoir` | main du père sur l'épaule de sa femme | main sur son omoplate, près de l'épaule lointaine (`ecart` + 40) ; la mère lève la main GAUCHE (côté écran gauche) | à l'épaule même, la main croisait l'avant-bras levé de la mère |
| G11 `D.negatoscope` | « = » et « ≠ » tracés par la scène | tracés par la fonction (`o.egal`, `o.diff`) ; barre de balayage verticale qui traverse la rangée 2 | Kalam n'a pas « ≠ » (R14) |
| hors inventaire | — | `D.carteQ` (S12), `D.cadreCT` (S16), `D.etiquette` (S14, S19, S20), `D.rond` (S21) | pièces de HUD décrites dans les scènes, sans dessin dans l'inventaire |

À savoir pour les scènes (constaté sur les compositions, rien à changer dans les dessins) :
- S20 : avec la pose « elle porte la lettre » (mains à y −230 / −236), la lettre (centre (470, 1060), 150 × 190) cache le
  menton de `DOC` (y 1003). Descendre les mains vers y −200 : lettre centrée en (470, ≈ 1095), montant en (470, ≈ 1120).
- S22 : `D.teteProfil` à × 0,85 remplit la case ; « Alkohol » / « Blutung » (y 700) tombent sur les boucles. Le poser à × 0,6,
  centré en (375 / 625, 600), pour libérer le bas de la case (y 670–740) ; `EX1` en `PP.point` montre la rangée 2 : lui
  donner un `reachR` vers la rangée 1 (y ≈ 640).
- Le box : `D.lampeExamen` « lumiere » avant les personnages, « bras » après ; `D.dos` du père : partie `corps` avec la mère,
  partie `bras` APRÈS la mère ; `D.bancParties` en dernier.
- `decor-2.js` attend les aides de `decor.js` (`D._`) : il s'exécute tout de suite dans `index.html`, et plus tard (par
  `D._attente`) dans l'outil d'essai, qui charge les fichiers par ordre alphabétique.
