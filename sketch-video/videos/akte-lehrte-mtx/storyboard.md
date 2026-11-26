# AKTE 06 — « كلمة وحدة » (Lehrte, 2013) — STORYBOARD

Numéro 06 provisoire : `AKTE_NO = "06"`, `AKTE_NEXT = "07"`, `TITRE = "كلمة وحدة"`.
Texte figé : `scenario.md`, `beats.js` (29 beats + intro i1–i3), `timings.js` (minutage **provisoire**, 89,8 s).
Ce document se suffit à lui-même : celui qui construit `decor.js`, `story.js` et `index.html` n'a rien d'autre à décider.
Quand ce document et la fiche de `SAISON-2.md` se contredisent, **c'est ce document qui vaut** (il applique les
corrections du dossier et de la relecture) : pas d'écran « Ausgang offen », pas de « 21 comprimés » ni de compteur,
pas d'ambulance, pas d'infirmière, pas de famille, pas de moniteur, la même fourchette pour les quatre, l'argent vers
une association, la deuxième épingle sans nom, la deuxième main sans genre, et les quatre médecins ne sont JAMAIS
montrés en pied : ce sont des mains du début à la fin.

## Conventions (valables pour tout le document)

**Deux repères.** Repère **monde** = repère de la caméra de la scène (1080 × 1920). Repère **écran** = calque `c.hud`
(fixe). Vue globale du gabarit : `view: { s: 1.06, oy: -20, breathe: 0.04 }`, donc

    écran X = 540 + (x − cx) · S        écran Y = 940 + (y − cy) · S
    S = s · 1,06 · (1 → 1,04 du début à la fin de la scène) · (coup de zoom éventuel)

**Zones Instagram (écran)** : contenu utile entre X 90 et 990, Y 250 et 1470 ; rien d'utile dans X > 915 pour
Y 980–1650 ; rien sous Y 1630. Les sous-titres occupent Y ≈ 1490–1600.

**Deux caméras de base** (toutes les autres sont données scène par scène, avec leurs images-clés) :

| Nom | Images-clés de départ | Zone d'action en monde | Pastille du haut : le monde doit être NU ici | Colonne des boutons en monde |
|---|---|---|---|---|
| `BUR` (plongée à 90° sur un bureau) | `{ s: 1.0, cx: 540, cy: 900 }` | x 150–930, y 540–1360 | x 250–830, y < 530 (seul le plateau) | interdit : x > 865 dès que y ≥ 930 |
| `FACE` (scène de face : chambre, hall, couloir, salle) | `{ s: 1.0, cx: 540, cy: 930 }` | x 150–930, y 570–1400 | x 250–830, y 390–560 (seul le mur) | interdit : x > 865 dès que y ≥ 965 |

Vérification (`BUR`, S de 1,06 à 1,1245) : x 150 → X 127…101 ; x 930 → 953…979 ; x 865 → 885…906 ; y 540 → Y 558…535 ;
y 1360 → 1428…1457 ; y 930 → 972…974. Poussée lente (`ease: "lin"`) : ×1,02 au plus dans les plans larges ; ×1,03 dans les inserts S2 et S8 (leur contenu
reste entre x 160 et 862) ; S9 et S12 ont leurs propres valeurs, vérifiées. Coups de zoom
(`c.kick`) : ≤ 0,05 dans les plans larges, ≤ 0,06 dans les inserts.

**Bras et colonne des boutons.** Un avant-bras qui entre par le bord DROIT reste dans la bande y ≤ 900 (monde) ;
un avant-bras qui entre par le BAS reste à x ≤ 840. Un bras qui descend du haut entre par le coin haut-DROIT, en
diagonale (angle −145°), pour passer à droite de la pastille du haut ; dans ces scènes la pastille est décalée à
gauche (écran X 400) : c'est indiqué.

**Le jaune.** Cet épisode n'a pas de teinte : son seul jaune (#F8CE4E) = les comprimés de MTX. Liste fermée de ce
qui est jaune dans les scènes de l'histoire : les **comprimés** (pilulier, rangée de doses, « tache jaune » sur la
lettre), les **quatre enveloppes du tribunal** (dans la réalité, cet envoi arrive dans une enveloppe jaune : les
comprimés reviennent par la poste) et les **épingles de la carte** (règle de la série). Hors histoire : l'anneau,
le cœur et le bouton de l'intro, le surligneur des sous-titres, les pastilles de l'affiche (socle).
**Interdits dans les scènes de l'histoire** : `k.chip(…, { yellow: true })`, `k.ribbon`, `k.marker`, `m.rays`,
`m.shapes` (ils dessinent en jaune), `st.vignette`. Toutes les pastilles sont GRISES ; on insiste avec un cadre
d'encre, une double frappe ou un coup de zoom.

**Typographie de machine à écrire.** Le moteur n'a pas de police à chasse fixe. Dans `index.html` de l'épisode :

    .tw { font-family: "Liberation Mono", "Courier New", "DejaVu Sans Mono", monospace; font-weight: 700; fill: var(--ink); }

Un caractère `.tw` de corps N occupe 0,6 · N px de large : toutes les largeurs de ce document sont calculées ainsi.
Les textes « frappés » passent par `D.frappe` (un caractère = un `<text>`, voir § 2) : le rendu ne dépend pas de la
machine au-delà de la forme des lettres. Contrôle : § 8.

**Pastille** = `k.chip(allemand, arabe, x, y, taille, { parent })` du gabarit (arabe détaché, contour papier,
corps arabe = max(26, 0,82 × taille)). **Pastille du haut** = pastille dans `c.hud`, centre écran (540, 420), une à
la fois, largeur ≤ 640 ; aide `pastille(c, de, ar, at, until, o)` = `k.chip(de, ar, o.x || 540, 420, o.size || 30,
{ parent: c.hud }).pop(at, 0.3)` puis `.hide(until, 0.15)`.

**Repères.** Toujours entre accents graves : `b9@Methotrexat+0.2`. Le moteur prend le PREMIER mot du beat qui
CONTIENT le texte ; un repère fait seulement de chiffres est lu comme un NUMÉRO de mot (indice à partir de 0).
Donc : les nombres (13500, 2013, 79, 9000, 2000, 6000) et les mots ambigus s'écrivent par leur indice — `b1@5`,
`b4@8`, `b5@3`, `b7@3`, `b13@8`, `b19@1`, `b19@3`, `b24@5`, `b24@7`, `b29@7`. Liste complète et vérifiée : § 6.

**Aides à écrire une fois dans `story.js`** (en plus du socle du gabarit) :
`bureau(c, m, kind, o)` (mise en place FIXE d'un bureau, § 4), `lettre(c, fn, x, y, s, rot)` (= `c.sk` sur
`D.brief`), `mainDe(c, fn)` (= `c.sk` sur `D.main`, sans rotation du nœud), `pastille(…)`, `mention(c, txt)`,
`chaine(c)`, `bord(c, cote)` (§ 3), `chambre(c, m, o)`, `couloir(c, m, o)`.

---

## 0. Direction en dix lignes

1. **Tournure : on suit un objet.** Le héros est une FEUILLE, la lettre de sortie. Elle naît (un mot frappé), reçoit
   deux signatures, voyage, est dépliée, recopiée ; après la mort elle revient en quatre enveloppes du tribunal. Elle
   est au centre de 17 scènes sur 28 ; les humains ne sont que des mains numérotées qui passent.
2. **Dispositif signature : le pilulier de la semaine**, vu de dessus — sept alvéoles « Mo Di Mi Do Fr Sa So ».
   Version juste : UN comprimé jaune. Version fausse : SEPT. Le mot « täglich » a sept lettres : chaque lettre
   frappée fait tomber un comprimé (S8). Sur la lettre, l'erreur se suit de loin grâce à une « tache jaune » : sept
   petits points sous le mot.
3. **Grammaire de caméra : la plongée à 90°.** Comme un banc-titre : bureau vu de dessus, mains qui entrent par
   les bords, objets qui glissent. Plans larges du bureau + inserts (×1,1 à ×1,5) sur une ligne, une signature, un
   médaillon. La caméra ne se relève que quatre fois : la chambre (S15–S16), le hall des boîtes aux lettres (S18),
   le couloir des quatre chaises (S19, S24), l'audience (S22).
4. **Transition signature : la feuille qui glisse** — `in: "slideLeft"`, 0,34 s : la scène suivante arrive par la
   droite, précédée d'un bord de papier (`bord`, § 3), comme une feuille poussée sur le bureau (11 fois). `cut` pour
   les inserts dans un même lieu ; `fade` autour du silence ; `slideUp` pour la règle (c'est NOTRE main qui pousse
   la feuille depuis le bas).
5. **Teinte : aucune.** Encre, papier, hachures grises ; le jaune est réservé aux comprimés (liste fermée dans les
   conventions). Aucune pastille jaune, aucun ruban, aucun rayon.
6. **Ton : mécanique, précis.** Tout est frappé, tamponné, plié, glissé, étiqueté. Les mentions de vérité sont des
   rubans d'étiqueteuse (lettres blanches en relief sur bande noire). Musique : pizzicati secs, rythme de machine à
   écrire. La chaîne s'accélère (le refrain raccourcit à chaque main), s'enraye à la moelle, s'arrête au silence.
7. **Des mains, pas de visages.** Quatre médecins = quatre avant-bras vus de dessus (dessin dédié `D.main`),
   reconnus à un détail (montre ronde, stylo-plume, bracelet de perles, montre carrée) et à un jeton numéroté.
   La cinquième main, c'est le spectateur (« نتا »). Les seuls visages : le patient (un portrait sur une fiche
   tenue par un trombone, vivant, puis figé), le juge (un seul, à l'audience), la photo de Yassine.
8. **Vérité à l'écran.** Rubans « LAUT PRESSE », « REKONSTRUKTION », « ALLGEMEIN · LAUT FACHINFORMATION »,
   « REGEL VON HEUTE · KEINE RECHTSBERATUNG ». Jamais « laut Urteil » (il n'y a pas de jugement), jamais
   « verurteilt », jamais « nicht rechtskräftig » : à la place « keine Verurteilung » et « ob endgültig: nicht
   veröffentlicht ». Le tampon « vorbestraft » ne touche jamais le papier (conditionnel) ; les bulletins de
   paiement s'arrêtent en l'air (on ne sait pas la suite).
9. **Différent des cinq autres** : 04 = compteur à rouleaux + frise latérale + rembobinage ; 05 = hôpital en coupe,
   silhouettes minuscules, caméra-ascenseur, nuit bleue ; 07 = écran de téléphone ; 08 = lettres-objets, frontal,
   marteau ; 09 = écran coupé en deux, tache d'encre. Ici : vue de dessus, mains, papier, un pilulier ; aucun
   compteur, aucune horloge, aucun téléphone portable, aucun marteau, aucun moniteur, aucune silhouette debout.
10. **Différent d'AKTE 02 / 03** : pas de cellule, pas de bloc, pas de coupe anatomique dans le corps (l'usine de la
    moelle est un schéma imprimé sur une notice), pas de plaque « Im Namen des Volkes », pas de tampon qui frappe,
    pas de pastille « 1 Wort » (AKTE 03), pas d'ange à ailes, pas de billets vers une famille, pas de bulle de
    dialogue du tout. Tous les dessins sont neufs (`window.EpDecor`) ; rien d'`UnnaDecor`.

---

## 1. Distribution

Comparée aux distributions existantes (AKTE 02 : femme enceinte cheveux longs, homme brun barbe de trois jours,
sage-femme âgée à chignon, juge à couronne grise et lunettes, expert gris à lunettes ; AKTE 03 : queue de cheval
châtain, carré foncé à lunettes, vieux moustachu en blouse, patiente bouclée, mari barbu châtain, juge au carré gris,
Chefarzt chauve à lunettes, infirmière blonde à chignon ; 04 : cheveux courts châtains, juge chauve à barbe grise,
expert à couronne châtain ; 05 : boucles foncées à lunettes, blond à barbe courte, juge gris rasé sans lunettes).

### 1.1 Personnages Persona (deux seulement)

| Clé | Rôle | Paramètres Persona exacts | Tenue | Accessoire signature | Échelle |
|---|---|---|---|---|---|
| `PAT` | le patient, 79 ans — « le patient de la feuille » | `{ look: "oldman", hair: "crown", hairTone: "grey", beard: "moustache", glasses: true, seed: 611 }` | tête seule (`Persona.head`) dans `D.fichePatient` ; col de gilet dessiné par la fiche | **casquette plate** (`D.casquette`) posée sur la tête, toujours ; lunettes rondes ; la fiche est tenue à la lettre par un **trombone** | tête 0,40 dans la fiche (fiche 130 × 170) ; fiche ×1,2 au mur (S19, S24) |
| `RIC` | le juge de l'audience (un homme, un seul juge, aucun assesseur) | `{ look: "man", hair: "bald", hairTone: "brown", beard: "none", glasses: true, outfit: "robe", seed: 606 }` | robe + rabat blanc, S22 seulement | un dossier fermé sous sa main gauche ; ses deux mains qui s'ouvrent vers les quatre | 1,0, derrière son pupitre |

- `PAT` a les mêmes paramètres de tête que le juge d'AKTE 02 (vieil homme, couronne grise, moustache, lunettes) :
  c'est la **casquette** qui change sa silhouette (elle couvre le crâne, on ne voit que les touffes blanches). Elle
  ne s'enlève jamais sur la fiche. Dans le lit (S15–S16) il n'est pas un Persona : dessin dédié de profil, tourné
  vers le plafond (`D.litGeriatrie`), sans casquette (elle est accrochée à la tête de lit) ni lunettes (pliées sur
  le chevet). Apparence = dessin libre (« REKONSTRUKTION »).
- `RIC` : crâne nu + lunettes + visage rasé + robe, un homme d'âge moyen (`look: "man"`, pas `oldman`). Il était
  d'abord bouclé gris : c'est la tête de la juge d'AKTE 09 (`shortcurly` gris, en robe elle aussi) — changé le
  26.11.2026. Ne pas confondre avec le juge d'AKTE 04 (vieil homme chauve à BARBE grise, sans lunettes) ni avec le
  Chefarzt d'AKTE 03 (vieil homme chauve à MOUSTACHE, en blouse) : ici ni barbe ni moustache, sourcils châtains.
- Réglages communs : `blink: rnd(blinkAt(t, k))` (k = 1 pour `PAT`, 2 pour `RIC`), respiration `.on(breathe(2))`
  pour `RIC`.

### 1.2 Les mains (dessin dédié `D.main`, § 2 B1) — les vrais acteurs

Avant-bras vu de dessus, main en MOUFLE (pouce + bloc, jamais de doigts). Une main n'a pas de visage : son jeu =
la façon d'entrer, la pression (`appui`), le lever (`leve`), le tremblement, le poing, le retrait.

| Clé | Qui | Ce que disent les sources | Détail signature | Manche | Entre par | Échelle | Jeton |
|---|---|---|---|---|---|---|---|
| `M1` | première main : la Stationsärztin | femme | **petite montre ronde** à bracelet fin (main gauche), trotteuse qui avance | blouse blanche RETROUSSÉE (deux revers), poignet nu | le BAS (c'est elle qui est assise au bureau A) ; deux mains pour la frappe | 0,92 | `1` |
| `M2` | deuxième main : contresigne | homme ou femme : les sources se contredisent → **aucun signe de genre** | **stylo-plume** noir à capuchon | blouse blanche longue + poignet de pull foncé côtelé qui dépasse ; aucun bijou, aucune montre, taille moyenne | la GAUCHE | 1,0 | `2` |
| `M3` | troisième main : la médecin de l'admission | femme | **bracelet de six perles** claires + stylo à clic | manche COURTE de casaque hachurée, avant-bras nu | la DROITE (bande y ≤ 900) | 0,92 | `3` |
| `M4` | quatrième main : l'Oberarzt | homme | **grosse montre carrée** en métal | blouse blanche + manchette de chemise rayée ; main plus large, quatre petits traits de poils au poignet | le coin HAUT-DROIT, en diagonale (« اللي فوقها » : il arrive d'au-dessus) | 1,10 | `4` |
| `MT` | « نتا » : le spectateur (b26–b29) | — | aucun bijou | sweat gris chiné à bord-côte | le BAS, au centre (c'est NOTRE main) | 1,06, trait un peu plus épais | `نتا` |
| `MJ` | la main du juge (S23 seulement) | — | — | manche large NOIRE de robe + poignet blanc | le coin haut-GAUCHE | 1,0 | aucun |

Règles : deux bras ne se croisent jamais ; une main ne couvre jamais le portrait du patient ; une main qui
pousse une feuille est posée dessus (paume sur le papier), jamais « dans le vide ». Le jeton (rond de carton au bout
d'une ficelle, noué au poignet) garde son chiffre DROIT à l'écran quel que soit l'angle de la main.

### 1.3 Qui parle (`talk`)

Personne, sauf `RIC` de `b22@قال` à `b22@end` (`talk: rnd(talkAt(t, T("b22@قال"), T("b22@end")), 10)`). Aucune
bulle dans l'épisode : sa phrase est rapportée au style indirect par la presse → elle s'écrit sur une bande de papier
frappée, avec « — laut Presse », jamais dans une bulle. Les mains n'ont pas de bulle.

### 1.4 Arc des expressions (visages) et du jeu (mains)

| Beat | `M1` | `M2` | `M3` | `M4` | Visages / `MT` |
|---|---|---|---|---|---|
| b1 | entre vite à `b1@لربعة`, se pose sur son enveloppe ; **tremble** à `b1@فألمانيا` (±3 px, ±1,2°, 0,5 s) | idem, 0,08 s après | idem, 0,16 s après | idem, 0,24 s après | — |
| b2 | se lève (`leve` 1) à `b2`, **repousse** l'enveloppe à `b2@قبلوهاش`, recule de 70 px, reste ouverte | idem | idem | idem | — |
| b4 | pousse la feuille (geste sûr, 0,35 s), se retire au bord, tapote | reçoit, pousse, se retire | reçoit, pousse, se retire | reçoit, pousse ; la feuille lui échappe | — |
| b6–b7 | — | — | — | — | `PAT` (fiche) : entre `calm`, **sourit** (`smile`) à `b7@مريض`, regarde vers la lettre `look2 [0.5, 0.3]`, cligne |
| b8 | deux mains sur le clavier, frappe régulière (5,5 Hz), la trotteuse tourne ; s'arrête 0,15 s à `b8@service` | — | — | — | `PAT` `calm`, cligne |
| b9 | (insert sans main : ce qu'elle frappe) | — | — | — | — |
| b10 | finit son paraphe, se retire vers le bas | entre à `b10@الثانية`, décapuchonne, **signe d'un trait** à `b10@سنات`, recapuchonne, repousse la feuille à `b10@الغلطة` | — | — | `PAT` `calm` |
| b12 | — | — | entre à `b12@الثالثة`, sort la lettre, la déplie, **coche trois cases** à `b12@l'admission`, clic du stylo à `b12@شافتهاش` | — | `PAT` `calm` |
| b13 | — | — | posée sur le formulaire, immobile | descend à `b13@الرابعة`, **survole la marge** à `b13@الطبيب`, paraphe à `b13@فوقها`, tapote deux fois à `b13@8`, repart | `PAT` `calm` |
| b14 | — | — | recopie au stylo à `b14@تبعو`, se retire à `b14@كل` | à plat sur le coin du plan (il valide), se retire à `b14@كل` | — |
| b16 + silence | — | — | — | — | patient dans le lit : œil fermé, respiration lente ; une dernière montée de poitrine, puis plus rien |
| b17 | — | — | — | — | `PAT` (fiche) : **figé**, gris, coin noir de deuil, plus un seul clignement |
| b21 | les quatre repoussent leur enveloppe dans la corbeille (le geste de b2, expliqué) | idem | idem | idem | — |
| b22 | à la barre : se serre en **poing** à `b22@كل` | se **fige** à `b22@واحد` | **tremble** à `b22@فيهم` | **recule** de 12 px à `b22@مسؤول` | `RIC` : `focused`, yeux sur le dossier `look2 [0, 0.7]` → lève les yeux `look2 [0, 0.35]` à `b22@القاضي` → parle à `b22@قال`, ouvre les deux mains à `b22@كل` → `neutral` + `mouth: "flat"` + un hochement (`headTilt` 0 → 4 → 0) à `b22@مسؤول` |
| b23 | — | — | — | — | `MJ` appuie sur le dossier fermé |
| b26–b28 | — | — | — | — | `MT` : fait glisser six comprimés hors du pilulier (b26), écrit « montags » et barre « 1-0-0-0 » (b27), s'arrête avant de recopier, puis avant de signer, vérifie à la loupe (b28) |
| b29 | fantôme gris, se soulève au passage de la feuille | idem | idem | idem | `MT` s'abat À PLAT sur la feuille à `b29@7` : elle s'arrête ; entoure le mot à `b29@كتوقفها` |

---

## 2. Inventaire des décors et objets à dessiner (`decor.js` → `window.EpDecor = D`)

Règles d'écriture (celles du gabarit) : chaque fonction dessine dans `g` autour de son ancrage (0, 0), reçoit ses
paramètres animés dans `o` (valeurs ARRONDIES par `story.js` : le moteur ne redessine que si `o` change), renvoie
des ancres ; trait à main levée `U.ctx` / `U.shape` / `U.stroke`, matières `MAT.white`, `MAT.grey`, `MAT.mid`,
`MAT.light`, `MAT.wood`, `MAT.dark`, `MAT.robe`, `MAT.yellow` ; chaque objet a une ombre décalée (`#D2D2CB`,
6–10 px) et des détails ; aucune forme nue. Vu de dessus, l'ombre est le seul indice de hauteur : plus un objet est
haut au-dessus du plateau, plus son ombre s'écarte.
`decor.js` est chargé APRÈS `persona.js` : `D.fichePatient` appelle `Persona.head` lui-même.
« Mobile » = ce qui bouge et comment. Toutes les tailles sont à l'échelle 1.

### A. Le papier (objets-héros)

| Fonction | Dessin | Taille · ancrage | Mobile | Scènes |
|---|---|---|---|---|
| `D.brief(g, o)` — **la lettre de sortie** | Feuille A4 `MAT.white`, trait 3, ombre (8, 10), coin corné en bas à droite (34 px). De haut en bas (repère local, feuille de −260 à 260 en x et de −367 à 367 en y) : carré gris hachuré 44 × 44 à (−226, −333) (logo neutre, SANS nom) + deux barres grises ; titre `ENTLASSUNGSBRIEF` (`.tw` 30, départ x −160, ligne de base y −292) ; `Patient:` (`.tw` 18) à (−226, −238) + barre NOIRE 120 × 16 (nom caviardé) + `79 J.` ; cadre `VERLEGUNG →` (150 × 30, `.tw` 18) centre (160, −238) ; filet y −212 ; `Diagnosen:` (−226, −182) + 3 barres grises (y −156, −132, −108 ; longueurs 380, 430, 300) ; `Verlauf:` (−226, −74) + 3 barres (y −48, −24, 0 ; 420, 360, 440) ; `Medikation:` (`.tw` 20 gras) à (−226, 44) ; tableau de 3 lignes (y 76, 112, 148) séparées par des filets fins : lignes 1 et 3 = barres grises, **ligne 2 = `Methotrexat 15 mg`** (`.tw` 18, départ x −226), points de conduite, puis **le mot de fréquence** aligné à droite sur x 226 ; sous le mot, la **tache jaune** : `points` petits ronds jaunes (r 4,5, pas 12, y 128) ; `Unterschrift:` (−226, 236) ; deux traits de signature à y 290 : à DROITE (x 20…226) celui de la première main (`sig1`), à GAUCHE (x −226…−30) celui de la deuxième (`sig2`) — ainsi le bras de `M2`, qui vient de la gauche, ne passe jamais sur le paraphe de `M1` | 520 × 735 · ancre = centre | Tout par paramètres : `titre` 0–16 (caractères frappés) · `cadre` 0–1 (libellés + filets) · `age` 0/1 · `verl` 0–1 · `lignes` 0–6 (barres visibles) · `mtx` 0–17 · `freq` `""` / `"w"` (« wöchentlich » en pointillé gris) / `"t"` (« täglich » à l'encre) / `"p"` (« 1 × pro Woche, montags », S27) + `nfreq` (caractères) · `points` 0–7 · `puls` 0–1 (les points grossissent ×1,6 et tremblent) · `cercle` 0–1 (boucle d'encre tracée autour du mot) · `sig1`, `sig2` 0–1 (paraphe tracé de gauche à droite : `sig1` boucles rondes penchées, `sig2` un seul trait anguleux) · `para` 0–1 (petit paraphe en bas à droite, S12) · `plis` 0/1 (deux plis à y ±122) · `fold` 1 / 0,5 / 0 (pliée en trois : seul le tiers du haut, puis deux tiers, puis ouverte). Le nœud glisse, tourne, change d'échelle. Ancres : `coinHG [-260,-367]`, `mtx [-226,112]`, `freq [170,112]`, `sig1 [123,290]`, `sig2 [-128,290]`, `para [200,330]` | S1, S3, S6, S7, S9, S11, S12, S13, S27, S28 ; en petit dans S5, S10, S17, S23 |
| `D.briefMacro(g, o)` — **l'insert sur la ligne du médicament** | La même feuille vue de très près : papier blanc de x 60 à 1020 et de y 520 à 1390 (monde), bord gauche de la feuille visible à x 60 avec son ombre, rot −1°. `Medikation:` (`.tw` 34) à (170, 610) ; filet y 640 ; ligne 1 : `Methotrexat 15 mg` (`.tw` 56 → 571 px : x 170–741), ligne de base y 700 ; filet y 740 ; **case du mot**, ligne de base y 880, calée à droite sur x 862 : soit « täglich » (`.tw` 100 → 420 px : x 442–862), soit « wöchentlich » en pointillé (`.tw` 64 → 422 px : x 440–862) ; points de conduite de x 170 à 420 sur y 880 seulement si rien n'est écrit à gauche ; filet y 925 | plein cadre · ancre = monde (0, 0) | `l1` 0–17 · `mot` `""` / `"w"` / `"t"` / `"p"` (« 1 × pro Woche », `.tw` 72 → 562 px : x 300–862, ligne de base y 840) + `n` · `boucle` 0–1 (ovale d'encre autour du mot) · micro-secousse du papier pendant la frappe (`story.js`) | S2, S8, S26 |
| `D.frappe(g, o)` — texte frappé | Un `<text class="tw">` par caractère : x = `o.x` + i · 0,6 · `o.size` ; ligne de base décalée de ± 2 % du corps, rotation ± 1°, opacité 0,86–1 (déterministes : `hash(i + seed)`). `style: "encre"` (plein) ou `"pointille"` (sans remplissage, contour `#8E8B82` 1,6 px, tirets 5-4). Le dernier caractère frappé est plus noir | — · ancre = début de la ligne de base | `n` caractères visibles ; `coup` 0–1 = anneau d'impact (r 6 → 22, opacité 0,5 → 0) sous le dernier caractère. Renvoie `fin [x, y]` (place du curseur). Curseur = barre 4 × 0,8 · corps qui clignote (0,5 s) | partout où l'on frappe |
| `D.bande(g, o)` — bande de citation | Bande de papier blanc aux deux bouts déchirés en dents, ombre ; une ou deux lignes `.tw` ; tenue par deux petites punaises grises quand elle est sur un mur | largeur = texte + 44, hauteur 44 par ligne · ancre = centre | arrive par `m.build(…, "left")` ou se frappe (`n`) | S17, S20, S22, S25, S26 |
| `D.enveloppeJaune(g, o)` | Enveloppe `MAT.yellow` : recto avec fenêtre blanche (70 × 34) à gauche, barre d'expéditeur (deux traits) en haut, cadre « date de remise » en haut à droite (rectangle vide, trait 2) ; verso avec rabat en V. Texte optionnel `mot` (`.tw`) sur le recto : `STRAFBEFEHL` ou `EINSPRUCH` | 190 × 108 · ancre = centre | `face` recto/verso · `mot`, `n` (frappe) · glisse, tourne, tremble avec la main | S1, S18, S21 ; pile de quatre en petit dans S23 |
| `D.enveloppeBlanche(g, o)` | Enveloppe blanche longue, rabat ouvert, la lettre pliée dépasse de 60 px | 300 × 150 · centre | `sortie` 0–1 (la lettre sort) | S11 ; en petit dans S10 |
| `D.fichePatient(g, o)` — **le portrait du patient** | Carton blanc à coins ronds (8), ombre ; cadre photo 106 × 112 en haut ; dedans `Persona.head(PAT)` échelle 0,40 + `D.casquette` posée sur `top` + col de gilet en V sous le menton ; bande de légende en bas : `79 J.` (`.tw` 22) | 130 × 170 · centre | `expr`, `blink`, `look2` (transmis à la tête) · `age` 0/1 · `deuil` 0/1 (triangle NOIR dans le coin haut-droit du cadre photo) · `grey` 0–1 (photo et carton passent au gris) | S6–S9, S11–S13 (vivant) ; S17, S19, S24 (figé, deuil) ; mini dans S10, S23 |
| `D.casquette(g, o)` | Casquette plate vue de face : calotte basse en trois pans, petite visière, hachures `MAT.mid` | 126 × 46 · ancre = milieu du bord inférieur | suit la tête ; dans la chambre : accrochée au montant de la tête de lit, se balance (`m.pend`) | fiche ; S15, S16 |
| `D.trombone(g, o)` | Trombone en fil d'acier (double boucle), trait 3,5 gris foncé, reflet | 46 × 16 (`k` = échelle : 1,5 sur la fiche, 3,2 dans l'intro) · centre | glisse en place en 0,2 s, petit rebond ; saute de 6 px aux chocs | S1, S6, S11, intro |
| `D.etiquette(g, o)` — étiquette à ficelle | Étiquette de carton à coin coupé, œillet renforcé, ficelle (courbe) jusqu'au nœud ; une ou deux lignes `.tw` ; `barre` 0–1 = trait d'encre qui raye la ligne 1 et la ligne 2 | `w` × `h` donnés · **ancre = le nœud** (pour `m.pend`) | `m.build(…, "drop")` puis `m.pend` (± 12 à 16°, amorti) ; retournement = `sx` 1 → 0 → 1 en 0,25 s, le texte change à mi-course | S19, S24 (les quatre PRIX, forme imposée de la sanction) — nulle part ailleurs : en accroche, une étiquette qui tombe au bout de sa ficelle est la première image d'AKTE 08 |

### B. Les mains et ce qu'elles tiennent

| Fonction | Dessin | Taille · ancrage | Mobile | Scènes |
|---|---|---|---|---|
| `D.main(g, o)` — **avant-bras vu de dessus** | Repère local AVANT rotation : paume au centre (0, 0), la moufle pointe vers −y, l'avant-bras descend vers +y jusqu'à y +680 (il sort toujours du cadre). Moufle : bloc arrondi 96 × 112 (x −48…48, y −72…40), pouce à gauche (ovale 30 × 44 incliné, centre (−60, −22)), une seule ride courbe à y −30 (jamais de séparation de doigts), `MAT.skin`, trait 3 ; poignet 64 de large de y 36 à 70 ; manche de 92 à 124 de large. Ombre = la même silhouette décalée de (9 + 20·`leve`, 11 + 24·`leve`), `#CFCFC8`. Variantes `who` : **1** revers double à y 190, poignet nu de y 60 à 190, montre ronde (cadran r 17 à y 118, bracelet 12 px, trotteuse `sec`) si `montre` ; **2** manche blanche jusqu'à y 84, bouton rond, poignet de pull `MAT.dark` à 4 côtes de y 66 à 84 ; **3** avant-bras nu jusqu'à y 330 puis manche courte `MAT.grey` à ourlet double, bracelet de 6 perles (r 6) à y 96 ; **4** montre carrée 28 × 28 à bracelet métal `MAT.mid` à y 92, manchette rayée de y 116 à 140, manche blanche ensuite, 4 petits traits à y 66 ; **"toi"** bord-côte `MAT.mid` de y 70 à 96 puis sweat `MAT.grey`, trait 3,4 ; **"juge"** poignet blanc de y 64 à 84 puis manche large `MAT.robe` (140 → 190 de large). `miroir: true` = main gauche (pouce à droite). **`a`** = angle de la main en degrés, appliqué DANS le dessin (0 = elle vient du bas ; 90 = de la gauche ; −90 = de la droite ; 180 = du haut ; −145 = du coin haut-droit ; 145 = du coin haut-gauche) : on ne tourne jamais le nœud. **Jeton** (`jeton: "1"…"4"` ou `"نتا"`) : rond de carton r 28 + œillet + ficelle de 30 px nouée au poignet, chiffre Kalam 34 (ou Lalezar 30) toujours DROIT à l'écran ; `js` = angle de balancement | ≈ 124 × 790 × échelle du personnage · ancre = centre de la paume | `pose` : `"plat"`, `"pousse"` (moufle écrasée de 4 %), `"stylo"` (voir `D.stylo`, pointe à (−30, −96)), `"frappe"`, `"poing"` (bloc 84 × 84, deux plis), `"ouverte"` (pouce écarté) · `leve` 0–1 (hauteur au-dessus du plateau : ombre + échelle 1 → 1,05) · `appui` 0–1 · `sec` 0–59 · le déplacement, le tremblement (± 3 px à 47 rad/s, ± 1,2° à 53 rad/s) et la respiration (± 2 px, 2,4 rad/s) sont faits par `story.js` (`node.on`). Ancres : `paume`, `pointe`, `poignet [0, 64]` | S1, S3, S7, S9, S11, S12, S13, S21, S22, S23, S25–S28 |
| `D.stylo(g, o)` | `kind: "plume"` (corps noir, bague, plume en losange, capuchon posé à côté quand `ouvert`), `"clic"` (corps blanc, agrafe, poussoir : `clic` 0/1), `"bille"` (corps gris, `M4` et `MT`) | longueur 190 · ancre = la pointe | tenu : dessiné par `D.main` (pose `"stylo"`) ; posé sur un bureau : roule de 12° à l'arrivée | S6–S9 (posé), S9, S11–S13, S26–S28 |
| `D.paraphe(g, o)` | Tracé d'encre : `kind: "sig1"`, `"sig2"`, `"oa"` (deux lettres liées), `"coche"` (✓), `"croix"` (✗), `"boucle"` (ovale ouvert autour d'un mot, `w` × `h`), `"barre"` (trait qui raye) | selon `kind` · ancre = début du tracé | révélé par `wipe` de gauche à droite pendant que la pointe du stylo suit | S9, S11, S12, S13, S26–S28 |
| `D.loupe(g, o)` | Loupe vue de dessus : anneau r 110 (trait 9 + liseré), verre blanc à 35 %, deux reflets, manche 150 × 26 vers le bas-droit ; `txt` = texte grossi (`.tw` 40) au centre du verre | r 110 · centre du verre | glisse en 0,3 s, flotte (± 3 px) | S27 |

### C. Le pilulier, les comprimés, la moelle

| Fonction | Dessin | Taille · ancrage | Mobile | Scènes |
|---|---|---|---|---|
| `D.pilulier(g, o)` — **dispositif signature** | Boîtier `MAT.grey` à coins ronds (22) + ombre ; 7 alvéoles blanches 88 × 112 (pas 98 : centres x −294, −196, −98, 0, 98, 196, 294 ; y +10), coins 12, trait 3 ; au-dessus de chaque alvéole un couvercle relevé (bande `MAT.light` 88 × 26, deux points de charnière) portant `Mo Di Mi Do Fr Sa So` (`.tw` 26 gras) | 700 × 170 · centre | `clap` = indice du couvercle qui vient de claquer (écrasé de 12 % pendant 0,1 s) · `long` 0–1 : l'étiquette « Mo » s'allonge en « Montag » (S25) · `grey` 0–1. Ancres `cases[i]`. Les comprimés sont des nœuds À PART | S8, S13, S25 |
| `D.comprime(g, o)` | Rond `MAT.yellow` r 24, barre de sécabilité, reflet blanc, ombre ; `grey` 0–1 | r 24 (`r` réglable) · centre | tombe (`m.build(…, "drop", { dist: 140, dur: 0.3 })`), rebondit ; glisse quand on le pousse ; pulse | S2, S8, S13, S14, S17, S25 |
| `D.rangeeDoses(g, o)` | Rangée de 7 emplacements (pas 60) : `n` comprimés pleins (r 20), les autres = cercles en pointillé | 400 × 44 · centre | `n` change ; les pleins arrivent en cascade | S2, S17 |
| `D.pilulierMini(g, o)` | Petit pilulier vu de trois quarts sur le chevet : boîtier 116 × 32, 7 alvéoles, `n` points jaunes ; `grey` | 116 × 32 · milieu du bas | `grey` 0 → 1 à la mort | S15, S16 |
| `D.notice(g, o)` | Notice dépliée qui remplit le cadre : papier blanc cassé, 2 plis verticaux (x 360, 720) et 3 horizontaux (y 760, 1010, 1260) en traits clairs avec une ombre d'un côté, en-tête `FACHINFORMATION · Methotrexat` (`.tw` 22) à (170, 600), deux colonnes de petites barres grises dans les marges hautes | plein cadre · monde (0, 0) | les plis « respirent » (opacité ± 15 %, 3 s) | S14 |
| `D.usine(g, o)` — **la moelle = l'usine du sang** | Un os long couché (diaphyse + deux têtes arrondies, `MAT.light`, hachures), ouvert par une grande fenêtre (x −290…290, y −190…190) : dedans, **trois tapis roulants** horizontaux (y −120, 0, 120 ; x −220…220), chacun avec deux rouleaux r 18 (un rayon tournant), une bande en tirets qui défile vers la droite et ses pièces : tapis 1 = **globules rouges** (disques r 16 à creux central, `MAT.mid`), tapis 2 = **globules blancs** (ronds r 19 blancs à noyau trilobé foncé), tapis 3 = **plaquettes** (petits éclats clairs 14 × 8). À gauche de chaque tapis, un pictogramme de la pièce dans un rond ; à droite, les trois tapis se déversent dans un tuyau « sang » (double trait, coude) qui sort vers la droite et porte trois petites jauges verticales SANS chiffres | 700 × 520 · centre | `ph` 0–1 (défilement) · `stop [a, b, c]` 0–1 par tapis (1 = arrêté : rouleaux figés, pièces à 35 % d'opacité, bande sans tirets) · `tuyau` 0–1 (densité des pièces dans le tuyau) · `jauge [a, b, c]` 0–1. Ancres `tapis[i]` (point d'impact d'un comprimé) | S14 |

### D. Les bureaux vus de dessus

| Fonction | Dessin | Taille · ancrage | Mobile | Scènes |
|---|---|---|---|---|
| `D.plateau(g, o)` | Fond qui déborde (x −240…1320, y −240…2160). **`kind: "A"`** (Lehrte) : bois clair `#EDE9DF`, lames horizontales (joints tous les 172 px, trait `#CFC8B8` 2,5 un peu ondulé), 3 veines fines par lame, 5 nœuds (ellipses 18 × 10) à (210, 380) (905, 610) (150, 905) (735, 1420) (420, 1560). **`"B"`** (2e clinique) : fond `#E9ECEA` + **sous-main quadrillé** (x 120–960, y 520–1400, coins 20, quadrillage 60 px `#CBD2CF`, bord 3, deux coins de cuir hachurés en bas). **`"C"`** (justice) : fond `#E4E1DA` + **sous-main sombre** (x 110–970, y 515–1405, `MAT.mid`, liseré blanc 3 px à 14 px du bord, piqûres) | plein cadre · monde (0, 0) | fixe (c'est la caméra qui bouge) | A : S1–S3, S5–S9, S28 · B : S11–S13 · C : S17, S20, S21, S23 |
| `D.halo(g, o)` | Flaque de lumière : dégradé radial blanc (opacité 0,34 au centre → 0), rayon `r` | r 300–420 · centre | opacité ± 4 % (2,1 rad/s) ; `r` se resserre sur la lettre ; poussière `m.dust` dedans (10 grains blancs à contour gris, 8 px/s) | tous les bureaux, intro |
| `D.lampe(g, o)` | Lampe d'architecte vue de dessus : abat-jour rond r 56 (`MAT.grey`, cercle intérieur r 30 `#FFFDF2`), bras en deux segments de 14 px vers le coin haut-gauche, ressort. `kind: "banquier"` (bureau C) : abat-jour allongé 150 × 60 `MAT.mid` + chaînette | r 56 · centre de l'abat-jour | `m.build(…, "swing", { pivot: base })` ; tête qui oscille (0,6°, 1,3 rad/s) ; la chaînette pend (`m.pend`) | A, B (ronde) · C (banquier) |
| `D.clavier(g, o)` | Clavier : boîtier `MAT.grey` coins 10 ; 3 rangées de 12 touches (30 × 24, pas 37) + barre d'espace 200 × 22 dans la dernière rangée | 470 × 96 · centre | `touche [rangée, colonne]` = touche enfoncée (plus sombre, rétrécie de 8 %) ; change toutes les 0,09 s pendant la frappe | S6–S9 |
| `D.tasse(g, o)` | Tasse vue de dessus : bord r 56, café r 44 (`MAT.dark`), reflet en croissant, anse à droite ; 3 volutes de vapeur (traits clairs en S) | r 56 · centre | reflet qui tourne lentement ; onde concentrique aux chocs (`onde` 0–1) ; vapeur : 3 volutes qui dérivent vers le haut-droit et s'effacent (cycle 2,4 s, déphasées) | S1, S3, S5–S9 |
| `D.plante(g, o)` | Plante en pot vue de dessus : pot r 26, rosette de 7 feuilles (ellipses 46 × 20, nervure) | r 50 · centre | `m.sway` 1,5°, 3,2 s | S6–S9 ; variante de face en pot haut pour S18 (`kind: "face"`, h 260) |
| `D.encreur(g)` + `D.tampon(g, o)` | Encreur : boîte métal 104 × 76 `MAT.mid`, feutre 84 × 56 `MAT.dark`, couvercle ouvert sur le côté. Tampon vu de dessus : socle bois 96 × 46 + bouton r 24 | 104 × 76 / 96 × 46 · centres | tampon : `h` 0–1 = hauteur (ombre décalée de 6 + 22·h px, échelle 1 + 0,08·h) ; **il ne frappe jamais le papier** dans cet épisode | S1, S6–S9 (posés) ; S20, S21 (il plane) |
| `D.empreinte(g, o)` | Cadre de tampon 150 × 44 + mot `.tw` 20 ; `plein: false` = tout en POINTILLÉ (cadre et lettres en contour) | 150 × 44 · centre | clignote (opacité 0,4–0,9, 6 Hz) | S20 |
| `D.coupelle(g)` | Coupelle r 44 avec 5 trombones en vrac + 2 trombones libres à côté | r 44 · centre | les trombones sautent de 6 px aux chocs | S1, S3, S6–S9, S28 |
| `D.telephone(g, o)`, `D.verre(g)` | Téléphone de bureau vu de dessus (boîtier 120 × 150, combiné posé, 12 touches, cordon en spirale) ; verre d'eau (deux cercles r 38 / 30, reflet) | — · centres | cordon : `m.pend` 6° à l'arrivée puis 1° ; surface de l'eau : ellipse qui ondule (± 2 px) | S11–S13 |
| `D.formAufnahme(g, o)` | Porte-bloc (pince métallique en haut) + formulaire : titre `Aufnahme` (`.tw` 22), 6 lignes avec case à cocher | 230 × 310 · centre | `coche` 0–3 (cases cochées) | S11, S12 |
| `D.planSoins(g, o)` | Plan de médicaments en paysage : en-têtes `Medikament · Dosierung · Mo Di Mi Do Fr Sa So` (`.tw` 16), 4 lignes ; la ligne 2 est vide au départ | 380 × 280 · centre | `nom` 0–1 (« MTX 15 mg » écrit à la main, Kalam 26) · `mot` 0–1 (« täglich » écrit à la main) · `croix` 0–7 (croix dans les sept cases) ; `kind: "mini"` (bande 460 × 80 d'une seule ligne, S27) | S13, S27 |
| `D.dossier(g, o)` | Chemise de dossier de justice vue de dessus : carton `MAT.wood`, dos toilé, étiquette blanche frappée (`titre` : `Staatsanwaltschaft Hildesheim` ou `eingestellt`), signe § en creux ; intérieur clair | 330 × 440 (S17) ou 420 × 560 (S23) · centre | `ouvert` 0–1 (la couverture pivote sur le dos : `sx` de la couverture, l'intérieur apparaît) · `sangle` 0–1 (élastique qui claque en travers) | S17, S23 ; fermé en petit sur le pupitre S22 |
| `D.coupure(g, o)` | Coupure de journal : bords découpés en zigzag, titre = 2 barres noires épaisses, 3 colonnes de petites barres, mention `Presse · 01/2017` (`.tw` 16) | 250 × 330 · centre | glisse en 0,3 s ; un coin se soulève (± 3°, 2,6 s) | S17 |
| `D.porteTampons(g)` | Carrousel à tampons vu de dessus : disque r 44, 6 tampons en étoile | r 44 · centre | tourne de ± 3° (4 s) | S17, S20, S21, S23 |
| `D.casier(g, o)` | Fiche `Führungszeugnis` : carton à coins ronds, titre `.tw` 18, ligne `Eintrag:` + emplacement 150 × 44, petit rond numéroté en haut à droite (`n`) | 230 × 150 · centre | tombe en cascade ; s'empile | S20, S21 |
| `D.corbeille(g, o)` | Corbeille à courrier en fil métallique vue de dessus (grille), étiquette `Amtsgericht · Eingang` (`.tw` 18) sur le bord avant | 300 × 210 · centre | `m.build(…, "drop")` | S21 |
| `D.formUrteil(g)` | Formulaire VIERGE titré `URTEIL` (`.tw` 30), 8 lignes vides, emplacement de signature vide | 220 × 300 · centre | glisse hors du bureau (jamais rempli) | S23 |

### E. La carte

| Fonction | Dessin | Taille · ancrage | Mobile | Scènes |
|---|---|---|---|---|
| `D.cartePapier(g)` | Carte routière dépliée posée sur le bureau : feuille blanc cassé 780 × 800 (x 150–930, y 545–1345), 2 plis verticaux et 1 horizontal, coin haut-droit qui rebique, rose des vents (r 44) à (235, 640), barre d'échelle sans chiffres en bas à gauche | 780 × 800 · monde | aiguille de la rose : `m.sway` 4°, 2,8 s ; le coin rebique (± 2°) | S5, S10 |
| (socle) `drawDE`, `pinAt` | Contour de l'Allemagne + Berlin : `drawDE(c, 430, 965, 78, at)` → l'Allemagne tient dans x 205–650, y 676–1261 ; Berlin à (572, 862) | — | — | S5, S10 |
| `D.medaillon(g)` | Médaillon-loupe « Region Hannover » : disque blanc r 130, double bord d'encre, deux traits qui le relient au point de la grande carte ; dedans : fond de routes en traits gris très clairs (schéma, SANS échelle) | r 130 · centre | `m.build(…, "grow", { pivot: point de la carte })` | S5, S10 |
| `D.iconeKlinik(g)` | Petit bâtiment d'hôpital vu de face (3 × 2 fenêtres, porte, enseigne `+` à l'encre — pas de croix rouge, pas de nom) | 60 × 56 · milieu du bas | pousse du sol (`growY`) | S5, S10 |
| `D.miniLettre(g, o)` | La lettre en tout petit : feuille, 4 barres, la tache jaune (3 points) ; `pliee: true` = pliée en trois dans une enveloppe blanche + mini-fiche du patient tenue par un trombone | 86 × 122 (pliée : 96 × 54) · centre | saute (arc), voyage le long du pointillé, se balance (± 4°) | S5, S10 |

### F. Le tribunal (trois lieux vus de face)

| Fonction | Dessin | Taille · ancrage | Mobile | Scènes |
|---|---|---|---|---|
| `D.hall(g)` | Entrée d'immeuble : mur crépi `#F2F0E9` (y 290–1300), soubassement carrelé (carreaux 60 px, y 1060–1300), plinthe, sol en dalles en perspective, rail de fixation (barre x 200–880, y 770) | plein cadre · monde | — | S18 |
| `D.boiteLettres(g, o)` — en deux couches `fond` / `face` | Boîte aux lettres murale `MAT.grey` : `fond` = intérieur sombre de la fente ; `face` = corps 140 × 200 sous la fente, porte-nom 90 × 26 avec seulement le chiffre `n` (`.tw` 20), petite serrure, trois ouïes ; volet 140 × 34 articulé en haut | 140 × 200 · ancre = milieu du haut (charnière du volet) | volet : `m.pend(…, 24°)` quand une enveloppe passe, puis repos ENTROUVERT sur l'enveloppe ; la boîte : `m.build(…, "drop")` puis `m.pend` 2° | S18 |
| `D.applique(g)`, `D.interphone(g)`, `D.paillasson(g)`, `D.porteParapluies(g)` | Applique murale (globe + patte), interphone (plaque 70 × 110, 4 boutons SANS nom, grille), paillasson 300 × 40 hachuré, porte-parapluies avec un parapluie fermé | — | applique : opacité 0,86–1 irrégulière ; parapluie : `m.sway` 1° | S18 |
| `D.couloir(g)` | Couloir du tribunal : mur `#F1EEE6`, cimaise (rail) à y 930, lambris à lattes verticales `MAT.light` de y 930 à 1300, parquet en perspective, à droite le montant d'une porte + plaque `Saal 1` (x 880–1000 : hors zone utile) | plein cadre · monde | — | S19, S24 |
| `D.chaise(g, o)` | Chaise de bois vue de face : assise à y −170 (130 de large), dossier à 3 barreaux jusqu'à y −340, quatre pieds, entretoise | 130 × 340 · ancre = sol, milieu | `m.build(…, "rise")` ; ne bouge plus | S19, S24 |
| `D.blousePosee(g, o)` | Vêtement posé sur le dossier d'une chaise : col et épaules au-dessus du dossier, manches qui pendent de chaque côté jusqu'à y −120. `who` 1 : blouse à manches retroussées · 2 : blouse longue + stylo-plume dans la poche · 3 : haut de casaque à manches courtes, hachuré · 4 : blouse + col de chemise rayé. Jeton `n` qui pend au coin gauche du dossier | 150 × 230 · ancre = milieu du haut du dossier | `m.build(…, "drop")` ; manches : `m.sway` 1°, 3 s ; jeton : `m.pend` | S19, S24 |
| `D.maisonAsso(g, o)` | Petite maison d'association : mur blanc, toit à deux pentes hachuré, porte, deux fenêtres, enseigne `gemeinnützig` (`.tw` 16) au-dessus de la porte, fente à courrier dans la porte. Aucun nom | 190 × 200 · ancre = milieu du bas | `growY` depuis sa base ; la fente bat (± 6°) | S24 |
| `D.zahlschein(g, o)` | Bulletin de paiement en papier : rectangle 110 × 60, trois cases, `EUR` et `2 000 – 6 000` (`.tw` 13), coin plié | 110 × 60 · centre | vole en arc (rotation ± 10°), flotte (± 4 px) quand il est arrêté | S24 |
| `D.salleAG(g)` | Petite salle d'audience : mur `#F0EEE7`, lambris à lattes `MAT.wood` de y 900 à 1150, estrade (plateau à y 1150, contremarche jusqu'à 1168), néon au plafond (540, 300) 400 × 16 ; aucun emblème, aucune plaque | plein cadre · monde | néon : opacité 0,86–1 irrégulière (≈ 9 Hz par salves) | S22 |
| `D.fenetreLames(g, o)` | Fenêtre à lamelles verticales (8 lames), rebord | 150 × 260 · centre | lames : `m.sway` 0,8°, 2,6 s, déphasées ; rai de lumière au sol + `m.dust` | S22 |
| `D.calendrier(g, o)` | Bloc éphéméride pendu à un clou : carton 150 × 200 `MAT.light`, bandeau haut 150 × 40 `MAT.dark` à deux anneaux, pile de feuillets blancs 130 × 140. `kind: "semaine"` : grand `1.` / `2.` / `3.` (`.tw` 64) + `WOCHE` (`.tw` 26), **aucune date** ; `n` 1–3, ou 0 = carton nu ; `coin` 0–1 (le coin bas-droit du feuillet se décolle). `kind: "date"` (S22, 120 × 160) : `JAN 2017` (`.tw` 16), grand `24` (`.tw` 60), `Dienstag` (`.tw` 16) | 150 × 200 · ancre = le clou | `m.build(…, "drop")` + `m.pend` 4° ; le coin frémit (± 3°, 9 Hz, 0,2 s) avant chaque arrachage | S15, S16 (semaine) ; S22 (date) |
| `D.feuillet(g, o)` | Un feuillet arraché (bord haut déchiré) portant `n.` + `WOCHE` ; `kind: "date"` : le même feuillet d'éphéméride, vu de dessus, portant une ou deux lignes `.tw` (`l1`, `l2` : une date, un mot), taille `w` × `h` | 130 × 140 · centre | tombe en feuille morte : x ± 30 px, rotation ± 25°, 0,6 s (S15) ou 1,3 s (S16) ; `kind: "date"` : tombe à plat, glisse de 14 px, puis son coin bas se soulève (± 4°, 2,6 s) | S15, S16 ; `date` : S1, S5 |
| `D.pupitreAG(g)` | Pupitre du juge : façade lambrissée 460 × 205, plateau débordant (488 × 14), petite plaque `Amtsgericht` (`.tw` 16) | 460 × 205 · ancre = milieu du bas | `m.build(…, "rise")` | S22 |
| `D.tablePrevenus(g)` | Table vue en légère plongée : bord arrière à y 0 (trait épais), plateau en trapèze `MAT.light` qui descend hors cadre | 780 de large · ancre = milieu du bord arrière | — | S22 |
| `D.ruban(g, o)` | Ruban d'étiqueteuse : bande NOIRE `#1C1A1C` de 36 px de haut, coins 5, bouts en deux dents, lettres BLANCHES en relief (`.tw` 20, `#F7F7F1`, espacement 2), liseré clair en haut ; `size: 16` = petit modèle (30 px de haut) | largeur 13,2 × n + 28 (petit modèle : 10,6 × n + 24) · ancre = bord gauche, milieu (HUD) ou centre (monde) | `pop` 0,25 s ; dans le monde : collé sur la table (S22) | HUD (toutes les scènes sauf l'intro et S28) ; S22 (`JEDER` × 4) ; affiche (2) |

### G. La chambre de gériatrie (de face)

| Fonction | Dessin | Taille · ancrage | Mobile | Scènes |
|---|---|---|---|---|
| `D.chambre(g)` | Mur `#F3F1EA` (y 290–1300), barre d'appui murale à y 1010 (double trait), plinthe, sol en lames en perspective, radiateur à ailettes (x 140–390, y 950–1090), à droite une porte entrouverte (x 905–1000, y 560–1300 : battant + bande claire du couloir), hors zone utile | plein cadre · monde | — | S15, S16 |
| `D.fenetre06(g, o)` | Fenêtre à croisée : cadre 250 × 330, ciel `#F2F4F1`, rebord ; dehors une branche d'arbre (trait d'encre) qui entre par le coin haut-droit avec 5 feuilles accrochées, et **des feuilles mortes qui tombent** (fin octobre – novembre : l'automne) : 5 feuilles (losanges 16 × 10, encre et gris) qui descendent en zigzag dans le cadre | 250 × 330 · centre | `jour` 1 → 0,55 (la lumière baisse) · branche : `m.sway` 1,2°, 3,4 s · feuilles : chute en boucle (3,2 s chacune, déphasées de 0,64 s, x ± 14 px) × `live(t)` | S15, S16 |
| `D.voilage(g)` | Voilage clair à plis, bas ondulé | 60 × 340 · ancre = tringle, milieu | `m.sway` 0,9°, 3,1 s + `sx` ± 2 % × `live(t)` | S15, S16 |
| `D.tasseTisane(g, o)` | Tasse de face sur le rebord de la fenêtre + 2 volutes de vapeur | 44 × 36 · milieu du bas | vapeur : monte et s'efface (2,6 s) × `live(t)` ; à la mort elle s'arrête | S15, S16 |
| `D.litGeriatrie(g, o)` — **lit + patient allongé (dessin dédié)** | Vu de PROFIL, tête à gauche. Repère local (0, 0) = sol, milieu du lit ; lit de x −260 à 260. Tête de lit (panneau x −260…−238, y −290…0), pied de lit (x 238…260, y −230…0), cadre (barre y −120), deux roues r 14, matelas (x −236…236, y −170…−122), barrière abaissée (2 barres y −104 et −84, x −150…200). Oreiller (x −228…−104, y −214…−168). **Le patient** : tête de profil tournée vers le PLAFOND, centre (−172, −222), r ≈ 54 — crâne nu à gauche, front, nez qui pointe vers le haut, **grosse moustache blanche**, menton à droite, œil FERMÉ (arc + 3 cils), oreille au milieu, touffes blanches autour de l'oreille et sur la nuque ; cou court ; épaule en chemise de nuit claire ; couverture `MAT.light` de x −96 à 236 (contour haut : y −226 à la poitrine, −206 au ventre, −196 aux jambes, bosse des pieds y −224 à x 205), revers de drap de 22 px ; bras posé sur la couverture de l'épaule (−84, −214) au poignet (40, −196), main en moufle à (62, −194), même peau que le visage | 520 × 290 · sol, milieu | `souffle` 0–1 : la poitrine (x −70…0) monte de 6 px ; `grey` 0–1. Ancres `tete`, `main`, `poitrine [-40,-226]` | S15, S16 |
| `D.potence(g)` + `D.trapeze(g)` | Potence de lit : mât de (0, 0) à (0, −210), bras horizontal jusqu'à (109, −210) ; trapèze = sangle de 70 px + triangle 60 × 50 | ancre = pied du mât / point d'accroche | trapèze : `m.sway` 2°, 3 s × `live(t)` | S15, S16 |
| `D.chevet(g)` | Table de chevet : plateau, tiroir à bouton, porte, quatre petits pieds | 130 × 190 · sol, milieu | — | S15, S16 |
| `D.lunettesPliees(g)`, `D.canne(g)`, `D.pantoufles(g)` | Lunettes rondes pliées (58 × 20) ; canne à poignée courbe (h 260) appuyée ; deux pantoufles | — | — | S15, S16 |

### H. Intro, règle, transitions

| Fonction | Dessin | Taille · ancrage | Mobile | Scènes |
|---|---|---|---|---|
| `D.chemise(g)` | Chemise cartonnée vue de dessus : carton `MAT.wood` 700 × 884 (x 190–890, y 322–1206), onglet (x 230–470, y 290–324), dos toilé à gauche, deux coins élastiques, étiquette blanche vide sur l'onglet | 700 × 916 · monde | arrive avec la transition | S4 (intro) |
| `D.boiteMTX(g, o)` | Boîte de médicament vue de dessus : carton blanc 300 × 150, bande grise, `Methotrexat` (`.tw` 24), et l'inscription officielle `Nur einmal wöchentlich einnehmen, am` + trait à compléter ; `jour` 0–1 = « Montag » écrit à la main sur le trait | 300 × 150 · centre | `jour` | S25 |
| `D.fiches3(g, o)` | Trois fiches à onglet l'une sous l'autre (220 × 84), chacune avec un pictogramme (porte + flèche entrante · deux maisons + flèche · porte + flèche sortante) et un mot `.tw` 24 : `Aufnahme`, `Verlegung`, `Entlassung` | 220 × 304 · centre | `actif` 0–3 : la fiche active a un cadre d'encre double et avance de 14 px | S27 |
| `D.bordFeuille(g, o)` | Le bord d'une grande feuille : bande blanche de 36 px + trait d'encre + ombre de 16 px, sur toute la hauteur (`cote: "gauche"`) ou toute la largeur (`cote: "haut"`) | 52 × 1920 · — | visible seulement pendant la transition (voir § 3) | toutes les entrées `slideLeft` / `slideUp` |
| `D.chaineMains(g, o)` | Voir § 3 | — | — | HUD |

---

## 3. HUD propre à l'épisode

Tout est dans `c.hud` (repère écran), recréé dans chaque scène par les aides `mention(c, txt)` et `chaine(c)`, et
piloté par le TEMPS GLOBAL : d'une scène à l'autre rien ne saute. L'intro (S4) n'a ni ruban ni chaîne.

**Socle (inchangé)** : barre de progression `#prog` (X 100–700, Y 236–250) ; logo `#brand` (X ≈ 770–980,
Y 222–268), masqué pendant l'intro.

| Élément | Position (écran) | Forme | Comportement |
|---|---|---|---|
| **Ruban de mention** | bord gauche X 100, Y 274–310 | `D.ruban` : bande noire, lettres blanches en relief (20 px) | Un ruban par scène (aucun dans l'intro ni en S28), présent dès la 1re image de la scène (`show`). Textes : `LAUT PRESSE` · `REKONSTRUKTION` · `LAUT PRESSE · REKONSTRUKTION` · `ALLGEMEIN · LAUT FACHINFORMATION` · `REGEL VON HEUTE · KEINE RECHTSBERATUNG`. Le plus long fait 530 px (X 100–630) |
| **Chaîne des mains** | cinq ronds r 18 centrés sur Y 302, X = 780, 826, 872, 918 (mains 1 à 4) et 964 (« نتا ») ; reliés par un trait de 2 px | `D.chaineMains` : rond vide (contour 2,5, chiffre Kalam 20 gris) → **actif** (double contour, chiffre encre, échelle qui pulse 1 ↔ 1,12 à 2 Hz) → **passé** (rond hachuré gris, chiffre barré d'un trait oblique : « elle ne l'a pas arrêtée ») ; le 5e : cercle en pointillé vide → plein d'encre avec `✓` blanc | État = fonction du temps global (tableau ci-dessous). Largeur totale X 762–982 : sous le logo, à gauche de rien d'autre |
| **Pastille du haut** | centre (540, 420), ou (400, 420) quand `M4` descend du coin haut-droit | pastille GRISE du gabarit, taille ≤ 34, largeur ≤ 640, l'arabe finit vers Y 500 | une à la fois : `pop` sur le mot, `hide` 0,15 s avant la suivante |
| **Bord de feuille** (`bord(c, "gauche")`) | X −52…0, toute la hauteur | `D.bordFeuille` | invisible une fois la scène en place ; pendant un `slideLeft`, le calque entier est décalé vers la droite : la bande passe en tête et l'on voit une feuille glisser sur l'ancienne image. Pour `slideUp` : `bord(c, "haut")`, bande à Y −52…0 |
| Phrase de la scène muette | centre (540, 1445) et, au-dessus, (540, 1385) | titre arabe 57 px + ligne allemande 26 px | S16 seulement (voir la scène) |

**États de la chaîne des mains** (ce que renvoie `etat(i, t)`) :

| De | À | Rond 1 | Rond 2 | Rond 3 | Rond 4 | Rond « نتا » |
|---|---|---|---|---|---|---|
| `0` | `b4@ربعة` | chaîne absente | | | | |
| `b4@ربعة` | `b5-0.30` | la chaîne `pop` (0,3 s) ; actif à `b4+0.07`, passé à `b4+0.45` | actif `b4+0.50`, passé `b4+0.85` | actif `b4+0.90`, passé `b4+1.25` | actif `b4+1.30`, passé `b4+1.65` | absent |
| `b5` | `b8` | les quatre traits obliques s'effacent l'un après l'autre (0,08 s d'écart, à partir de `b5`) : **tous vides** — on reprend au début | | | | absent |
| `b8` | `b10` | actif | vide | vide | vide | absent |
| `b10` | `b10@الغلطة` | passé | actif à `b10@الثانية` | vide | vide | absent |
| `b10@الغلطة` | `b12@الثالثة` | passé | passé | vide | vide | absent |
| `b12@الثالثة` | `b12@شافتهاش+0.3` | passé | passé | actif | vide | absent |
| `b12@شافتهاش+0.3` | `b13@الرابعة` | passé | passé | passé | vide | absent |
| `b13@الرابعة` | `b13@8+0.2` | passé | passé | passé | actif | absent |
| `b13@8+0.2` | `b26-0.30` | passé | passé | passé | passé | absent |
| `b26-0.30` | `b29@كتوقفها` | passé | passé | passé | passé | cercle en pointillé vide (apparaît en 0,3 s) |
| `b29@كتوقفها` | fin | passé | passé | passé | passé | **plein, `✓`**, un battement (échelle 1,35 → 1 en 0,4 s) |

**Mentions de vérité — lesquelles, et lesquelles jamais.** `LAUT PRESSE` : toute l'affaire (aucun jugement,
aucun communiqué). `REKONSTRUKTION` : tout ce qui est mis en scène (bureau, clavier, mot frappé, signatures, pliage,
trajet, pilulier, plan de soins, apparence du patient, chambre). `ALLGEMEIN · LAUT FACHINFORMATION` : l'usine de la
moelle (mécanisme général, pas constaté chez ce patient). `REGEL VON HEUTE · KEINE RECHTSBERATUNG` : la règle (les
textes cités sont postérieurs aux faits). **« laut Urteil » n'apparaît jamais** (aucun jugement n'existe).
**« nicht rechtskräftig » non plus** (il n'y a pas de jugement à rendre définitif) : on écrit `keine Verurteilung`
(S23) et `ob endgültig: nicht veröffentlicht` (S24, affiche). Jamais `verurteilt`, `schuldig`, `Urteil` (sauf le
formulaire VIERGE qui quitte le bureau en S23), jamais « Ausgang offen ».

**Contrôle du jaune** : sur une capture de chaque scène de l'histoire, les pixels jaunes (r > 220, g > 180, b < 120)
ne doivent se trouver QUE sur des comprimés, des enveloppes ou une épingle. Tout autre jaune est une faute.

---

## 4. Scène par scène

**28 scènes** (27 + l'intro). Durées = minutage provisoire (`timings.js`) ; tout est calé sur des repères, donc tout
se recale seul quand la vraie voix arrive. Les scènes qui ouvrent un nouveau contexte (`sceneStart` de
`preview.json`) commencent 0,30 s AVANT leur beat : la feuille glisse pendant la pause, l'image est en place sur le
premier mot.

| Bloc | Scènes | Beats | `from` | Temps provisoire |
|---|---|---|---|---|
| Accroche | S1 · S2 · S3 | b1–b4 | `0` · `b3` · `b4` | 0,00 → 10,59 |
| Intro | S4 | i1–i3 | `i1-0.30` | 10,59 → 19,83 |
| Carte | S5 | b5 | `b5-0.30` | 19,83 → 22,62 |
| Lehrte : la feuille, mains 1 et 2 | S6 · S7 · S8 · S9 | b6–b10 | `b6` · `b8` · `b9` · `b10` | 22,62 → 35,85 |
| Le voyage | S10 | b11 | `b11-0.30` | 35,85 → 38,07 |
| 2e clinique : mains 3 et 4, « ils suivent la feuille » | S11 · S12 · S13 | b12–b14 | `b12` · `b13` · `b14` | 38,07 → 46,42 |
| La moelle | S14 | b15 | `b15` | 46,42 → 49,15 |
| Les semaines, le silence | S15 · S16 | b16 + silence | `b15@end` · `b16@end+0.05` | 49,15 → 53,71 |
| Cause, Strafbefehl, casier, opposition | S17 · S18 · S19 · S20 · S21 | b17–b21 | `b17-0.10` · `b18` · `b19` · `b20` · `b21` | 53,71 → 68,82 |
| Audience et issue | S22 · S23 · S24 | b22–b25 | `b22-0.30` · `b23` · `b24` | 68,82 → 78,61 |
| Règle | S25 · S26 · S27 | b26–b28 | `b26-0.30` · `b27` · `b28` | 78,61 → 86,27 |
| Dernière phrase | S28 | b29 | `b29-0.20` | 86,27 → 89,68 |
| Affiche | — | — | `b29@end+0.15` | 89,68 → 95,4 |

Dans chaque scène : `const k = kit(c); c_ = c; const m = M.of(c);` puis le fond (`bureau(…)`, `chambre(…)`,
`couloir(…)` ou `k.bg()`), `mention(c, …)`, `chaine(c)`, et — si la scène entre par `slideLeft` ou `slideUp` —
`bord(c, …)`. Sauf mention contraire : caméra `BUR` ou `FACE` + poussée lente `{ s: 1.02, d: durée, ease: "lin" }`.

### Mises en place FIXES (une place par objet, la même dans toutes les scènes du lieu)

**Bureau A — Lehrte** (`bureau(c, m, "A", o)`, plongée, coordonnées monde) :

| Objet | Position | Remarque |
|---|---|---|
| `D.plateau({ kind: "A" })` | plein cadre | — |
| `D.halo` | centre (500, 890), r 400 | + `m.dust({ x: 240, y: 620, w: 520, h: 560 }, 10, { speed: 8, op: 0.7, stroke: "#B9B9B2" })` |
| `D.lampe` | tête (190, 500), bras vers (60, 330) | hors de la zone de la pastille (x < 250) |
| `D.plante` | (885, 470) | absente des versions « accroche » |
| `D.tasse` | (840, 640) | version accroche : (770, 1045) |
| `D.encreur` · `D.tampon` (posé) | (205, 820) · (205, 905) | version accroche (S1) : encreur seul à (215, 1190) |
| `D.coupelle` + 2 trombones libres | (205, 1030) ; trombones (180, 1100), (236, 1118) | version accroche : coupelle (215, 1045) |
| `D.stylo` (posé, `kind: "bille"`) | pointe (775, 725), corps vers (845, 880) | absent des versions accroche |
| `D.clavier` | centre (500, 1240) | absent des versions accroche |
| **`D.brief`** | centre (500, 890), échelle 0,80, rot −1,5° → x 292–708, y 596–1184 | ligne MTX à y ≈ 980, mot de fréquence vers x 636 ; signatures à y ≈ 1122 (`sig1` x 516–681, `sig2` x 319–476) |
| `D.fichePatient` + `D.trombone` | fiche centre (300, 640), rot −6° (x 235–365, y 555–725) ; trombone (312, 590), rot −50°, `k` 1,5 | la fiche chevauche le coin haut-gauche de la lettre ; le titre commence à x 372 : il reste lisible |

Version « accroche » (S1, S3, S28) : plateau, halo, lampe, tasse, coupelle (+ encreur en S1) ; rien d'autre.

**Bureau B — la deuxième clinique** (`bureau(c, m, "B", o)`) :

| Objet | Position | Remarque |
|---|---|---|
| `D.plateau({ kind: "B" })` | plein cadre | sous-main quadrillé |
| ombres d'un store (dessinées dans `story.js`) | 8 bandes obliques (−20°) de 26 px, opacité 0,06, sur tout le cadre | glissent de ± 6 px (période 3 s) : c'est la lumière de ce bureau (pas de lampe : il ne ressemble pas au bureau A) |
| `D.formAufnahme` | centre (770, 760) → x 655–885, y 605–915 | colonne des cases à x 685, lignes à y 720, 760, 800 |
| `D.telephone` | centre (760, 1150) → x 700–820 | cordon vers le bas-gauche |
| `D.verre` | (790, 1300) | — |
| `D.enveloppeBlanche` (vide, après l'ouverture) | (290, 1320), rot −8° | glissée sous le bas de la lettre |
| **`D.brief`** (dépliée, `plis: 1`) | centre (420, 960), échelle 0,80, rot 1° → x 212–628, y 666–1254 | ligne MTX à y ≈ 1050 |
| `D.fichePatient` + trombone | fiche centre (228, 715), rot −5° (x 163–293, y 630–800) ; trombone (240, 664) | — |

**Bureau C — la justice** (`bureau(c, m, "C", o)`) : `D.plateau({ kind: "C" })` ; `D.lampe({ kind: "banquier" })`
à (215, 575) ; `D.porteTampons` à (860, 600) ; `D.halo` centre (500, 900), r 380 ; le reste change à chaque scène.

**Chambre** (`chambre(c, m, o)`, de face, monde) : `D.chambre` ; `D.fenetre06` centre (265, 740) (x 140–390,
y 575–905) + tache de lumière au sol (parallélogramme `M250 905 L400 905 L560 1300 L330 1300 Z`, `#FFFDF2`,
opacité 0,28) + `m.dust({ x: 300, y: 920, w: 240, h: 360 }, 8, { speed: 7 })` ; `D.voilage` tringle (422, 565) ;
`D.tasseTisane` sur le rebord à (330, 905) ; `D.calendrier({ kind: "semaine" })` clou à (590, 618) (bloc x 515–665,
y 618–818) ; `D.litGeriatrie` ancre (610, 1300) (lit x 350–870 ; tête du patient vers (438, 1078), main (672, 1106),
poitrine (570, 1074)) ; `D.potence` pied (361, 1010) + `D.trapeze` accroché à (470, 800) ; `D.casquette` pendue au
coin de la tête de lit (356, 1004) ; `D.chevet` ancre (262, 1300) (plateau à y 1110, x 197–327) avec
`D.pilulierMini` (262, 1108) et `D.lunettesPliees` (290, 1104) ; `D.canne` de (178, 1300) à (196, 1040) ;
`D.pantoufles` (518, 1294). Personne d'autre : ni famille, ni soignant, ni appareil.

**Couloir** (`couloir(c, m, o)`, de face) : `D.couloir` ; quatre `D.chaise` ancrées à (235, 1300), (420, 1300),
(605, 1300), (790, 1300) (la dernière finit à x 855) ; sur chaque dossier `D.blousePosee({ who: i, n: i })`
(ancre (x, 960)) ; `D.fichePatient` (deuil, ×1,2 : 156 × 204) pendue au mur, centre (300, 745) ; à droite du mur,
centre (700, 745) : un grand `D.ruban` d'étiqueteuse `§ 222 StGB` collé sur le mur (S19) ou `D.maisonAsso` (S24, ancre (700, 845)).

### Ce qui vit dans chaque mise en place (valeurs à reprendre telles quelles)

| Mise en place | Élément | Mouvement | Amplitude | Période / vitesse |
|---|---|---|---|---|
| bureaux A, B, C | caméra | poussée lente + dérive latérale | ×1,00 → ×1,02 ; cx ± 8 px | toute la scène |
| bureaux A, C | halo · poussière | opacité · grains | ± 4 % · 10 grains | 2,1 rad/s · 8 px/s |
| bureau A | vapeur de la tasse · reflet du café | 3 volutes · rotation | montent de 60 px en s'effaçant · 360° | 2,4 s (déphasées de 0,8 s) · 14 s |
| bureau A | plante · tête de lampe | `m.sway` · oscillation | 1,5° · 0,6° | 3,2 s · 1,3 rad/s |
| bureau A | trotteuse de la montre de `M1` | saut de 6° | — | 1 saut / s |
| bureau A | curseur sur la lettre | clignement | — | 0,5 s |
| bureau B | ombres du store · cordon du téléphone · eau du verre | glissement · `m.pend` idle · ondulation | ± 6 px · 1° · ± 2 px | 3 s · 1,3 rad/s · 2,2 s |
| bureau C | chaînette de la lampe · carrousel à tampons | `m.pend` idle · rotation | 1,2° · ± 3° | 1,3 rad/s · 4 s |
| partout | la fiche du patient (tant qu'il vit) | clignement · regard | — · `look2` ± 0,2 | 1 clignement / 3,4 s · 4 s |
| partout | une main posée | respiration · jeton | ± 2 px · `m.pend` idle 2° | 2,4 rad/s · 1,3 rad/s |
| chambre | feuilles mortes · branche · voilage · vapeur · trapèze · casquette | chute · `m.sway` · `m.sway` · montée · `m.sway` · `m.pend` idle | 5 feuilles · 1,2° · 0,9° · 2 volutes · 2° · 1,5° | 3,2 s · 3,4 s · 3,1 s · 2,6 s · 3 s · 1,3 rad/s — tout est multiplié par `live(t)` |
| chambre | poitrine du patient · lumière de la fenêtre | `souffle` · opacité | 6 px · ± 6 % | 2,9 s · 2,3 s |
| hall | applique · plante · volets des boîtes | grésillement · `m.sway` · `m.pend` | 0,86–1 · 1,6° · 24° amorti | irrégulier · 3,4 s · amorti 2,2 |
| couloir | manches des blouses · jetons · étiquettes de prix · fiche au mur | `m.sway` · `m.pend` idle · `m.pend` · `m.pend` idle | 1° · 2° · 16° amorti puis 1,5° · 0,8° | 3 s · 1,3 rad/s |
| salle d'audience | lames du store · néon · poussière · juge | `m.sway` · grésillement · grains · respiration, clignement | 0,8° · 0,86–1 · 10 grains · ± 2 px | 2,6 s · irrégulier · 8 px/s · 2,6 rad/s |

---

### S1 — L'amende tombe de la feuille (accroche A)

- **Beats** b1–b2 · 0,00 → 4,71 (4,7 s) · **Lieu** : bureau A, version accroche · **Entrée** : `cut` (première image).
- **À comprendre** : UNE feuille a valu à QUATRE médecins une amende pénale allant jusqu'à 13 500 € — et ils l'ont refusée.
- **Caméra** : `[{ at: 0, s: 1.0, cx: 540, cy: 900 }, { at: 0.2, s: 1.02, cx: 540, cy: 900, d: 4.3, ease: "lin" }]` ;
  `c.shake(0.15, 10, 0.35)` ; `c.kick("b1@5", 0.05)` ; `c.shake("b2@قبلوهاش+0.2", 8, 0.3)` ; `c.kick("b2@قبلوهاش", 0.04)`.
- **Couches (arrière → avant)** : plateau A · halo + poussière · lampe · tasse (770, 1045) · coupelle (215, 1045) ·
  encreur (215, 1190) · les 4 enveloppes jaunes (SOUS la lettre au départ) · la lettre · le feuillet daté ·
  les 4 mains · HUD (ruban `LAUT PRESSE`, pastille).
- **La lettre** : centre (540, 850), échelle 0,74, rot −2° → x 348–732, y 578–1122. État complet :
  `{ titre: 16, cadre: 1, age: 1, verl: 1, lignes: 6, mtx: 17, freq: "t", nfreq: 7, points: 7, sig1: 1, sig2: 1, plis: 1 }`.
- **Première image (t = 0)** — tout ceci est DÉJÀ visible : le plateau, la lettre en fin de chute (échelle
  1,12 → 1 de −0,10 à 0,15 s, `E.out` : à t = 0 elle est à 1,03 et bien lisible), le feuillet daté en train de se
  poser, la pastille du haut avec le montant, le ruban `LAUT PRESSE`. Rien de tout cela n'a de fondu d'entrée.
- **Construction en cascade** : `-0.10` la lettre atterrit · `-0.12` le feuillet daté tombe à plat (`m.build(…, "drop",
  { dist: 180, dur: 0.45 })`), glisse de 14 px, puis son coin bas se soulève (± 4°, 2,6 s) · `0.00` la
  lampe (`"swing"`, 0,4 s) · `0.05` la tasse (`"drop"`, dist 200, 0,35 s ; onde dans le café à 0,40) · `0.10` la
  coupelle (`"left"`, dist 200) · `0.16` l'encreur (`"left"`) · `0.15` (le choc) : les trombones sautent de 6 px, le
  halo se resserre sur la lettre (r 420 → 330 de `b1@ورقة` à `b1@ورقة+0.5`).
- **Le feuillet daté** (`D.feuillet({ kind: "date", w: 190, h: 96 })` : un feuillet d'éphéméride arraché, bord haut
  déchiré) : posé à cheval sur le coin haut-gauche de la lettre, centre (255, 690), rot −8° (x 160–350,
  y 642–738). Ligne 1 `Juli 2016` (`.tw` 28), ligne 2 `Einspruch` (`.tw` 28). C'est le calendrier de l'épisode
  (S15, S16, S22) qui date l'accroche — **pas une étiquette à ficelle** : celles-ci ne servent qu'à la sanction
  (S19, S24) ; en première image elles seraient l'accroche d'AKTE 08 (corrigé le 26.11.2026).
- **Les quatre enveloppes** (`D.enveloppeJaune`, recto) — elles jaillissent de sous la lettre à `b1@جابت`, une
  toutes les 0,07 s, en 0,38 s (`ease: "back"`), depuis (540, 850) vers :

  | | Arrivée (centre) | rot | Main | Angle `a` | Paume (posée sur l'enveloppe) |
  |---|---|---|---|---|---|
  | E1 | (470, 1228) | −6° | `M1` | 0 | (470, 1206) |
  | E2 | (250, 822) | 5° | `M2` | 90 | (272, 822) |
  | E3 | (832, 850) | −4° | `M3` | −90 | (812, 850) |
  | E4 | (835, 640) | 7° | `M4` | −145 | (815, 652) |

- **Les mains** : entrent à `b1@لربعة` (0,30 s chacune, `E.out`, une toutes les 0,08 s dans l'ordre 1-2-3-4, depuis
  420 px plus loin dans l'axe de leur avant-bras), `pose: "plat"`, `leve` 1 → 0 à l'arrivée (elles se posent). Jetons
  `1`…`4` : `pop` à `b1@الأطباء` (0,06 s d'écart) puis `m.pend`. À `b1@فألمانيا` : tremblement 0,5 s, les
  enveloppes tremblent avec elles. À `b2` : `leve` 0 → 1 en 0,12 s (elles se soulèvent). À `b2@قبلوهاش` : chaque
  main REPOUSSE son enveloppe vers le centre (0,22 s, `E.out`) — les quatre enveloppes finissent en tas sur la lettre,
  à (500, 880) rot −12°, (565, 805) rot 9°, (588, 870) rot −5°, (528, 842) rot 14° — puis recule de 70 px dans l'axe
  de son bras, `pose: "ouverte"`, `leve` 0,4, et reste là (respiration).
- **Vie** : halo, poussière, vapeur de la tasse, reflet du café, coin du feuillet daté qui se soulève, jetons, respiration des
  mains ; à `b1@5` le feuillet daté et la pastille font un battement (`pulse(…, 0.4, 0.12)`).
- **Textes** — pastille du haut (540, 420) :
  1. `Strafbefehl · 9 000 – 13 500 € pro Arzt` / « عقوبة مكتوبة: من 9000 حتى 13500 أورو لكل طبيب » — grise, 26 —
     `show(0)` (aucun fondu), `hide` à `b2`
  2. `Einspruch` / « ما قبلوهاش » — grise, 34 — `pop` à `b2@قبلوهاش` ; au même instant un cadre d'encre se trace
     autour du mot `Einspruch` du feuillet daté (`D.paraphe({ kind: "boucle", w: 170, h: 44 })`, `wipe` 0,2 s).
- **Mention** : `LAUT PRESSE` dès 0. **Chaîne** : absente. **Bulles** : aucune.
- **Affiche** : figer à `b1@الأطباء+0.3` (lettre, feuillet daté, 4 enveloppes, 4 mains, pastille 1).

### S2 — Un seul mot (accroche B)

- **Beat** b3 · 4,71 → 7,83 (3,1 s) · **Lieu** : la même lettre, vue de très près · **Entrée** : `cut` (insert).
- **À comprendre** : sur la feuille, le médicament est écrit « chaque jour » à la place de « chaque semaine » : sept
  comprimés au lieu d'un, pour un seul mot.
- **Caméra** : `[{ at: "b3", s: 1.0, cx: 540, cy: 930 }, { at: "b3+0.1", s: 1.03, cx: 548, cy: 930, d: 3.0, ease: "lin" }]` ;
  `c.kick("b3@الفرق", 0.05)`.
- **Couches** : plateau A (on voit 60 px de bois à gauche) · `D.briefMacro` · rangées de comprimés · mots arabes ·
  boucle d'encre · HUD (ruban).
- **Composition (monde)** :

  | Élément | Position | Taille |
  |---|---|---|
  | `Medikation:` | départ (170, 610) | `.tw` 34 |
  | `Methotrexat 15 mg` (déjà frappé : `l1: 17`) | x 170–741, ligne de base y 700 | `.tw` 56 |
  | **« täglich »** (encre) | x 442–862, ligne de base y 880 | `.tw` 100 |
  | « كل نهار » | centre (290, 880) | `ar strong` 52 |
  | 7 comprimés jaunes (`D.comprime`, r 20) sous « täglich » | centres x = 472 + 60·i (i = 0…6), y 950 | — |
  | **« wöchentlich »** (pointillé gris, `D.frappe({ style: "pointille" })`) | x 440–862, ligne de base y 1075 | `.tw` 64 |
  | « كل سيمانة » | centre (290, 1075) | `ar strong` 52 |
  | `D.rangeeDoses({ n: 1 })` (1 comprimé plein + 6 cercles en pointillé) | centres x = 472 + 60·i, y 1135 | r 20 |
  | boucle d'encre autour de « täglich » | ovale centre (652, 850), 470 × 130 | trait 5 |

- **Déroulé** : `b3` la feuille est là, ligne 1 frappée, curseur qui clignote dans la case du mot, à (442, 880) ·
  `b3@دوا` un trait d'encre souligne `Methotrexat` (`wipe` 0,25 s) · `b3@2` (« كل » de « كل نهار ») **« täglich » se
  frappe**, une lettre toutes les 0,06 s (7 lettres en 0,42 s) : à chaque lettre l'anneau d'impact (`coup`), le papier
  tressaille (± 2 px), et UN comprimé tombe sous le mot (`"drop"`, dist 120, 0,25 s, 0,10 s après sa lettre) ·
  `b3@نهار` « كل نهار » (`wipe` de droite à gauche, 0,3 s) · `b3@فبلاصة` « wöchentlich » apparaît en pointillé
  (`wipe` gauche → droite, 0,35 s) avec sa rangée : le comprimé unique tombe, les 6 cercles vides se dessinent ·
  `b3@سيمانة` « كل سيمانة » (`wipe` rtl) · `b3@الفرق` coup de zoom ; les 7 comprimés du haut font une vague (chacun
  saute de 10 px, 0,05 s d'écart) · `b3@كلمة` la boucle d'encre se trace autour de « täglich » (`wipe` 0,35 s) ·
  `b3@وحدة` le mot « täglich » fait un battement (échelle 1,06).
- **Vie** : curseur, poussée de caméra, comprimés qui respirent (échelle ± 2 %, 2,2 s, déphasés), papier qui
  tressaille pendant la frappe.
- **Textes** : pas de pastille du haut — les deux mots allemands sont dans l'image, chacun avec son arabe (52 px
  gras) bien détaché à sa gauche.
- **Mention** : `REKONSTRUKTION` (on ne sait pas ce qui était écrit exactement : le mot frappé est une image).
  **Chaîne** : absente. **Bulles** : aucune.
- **Affiche** : figer à `b3@وحدة+0.2`.

### S3 — Quatre mains (accroche C)

- **Beat** b4 · 7,83 → 10,59 (2,8 s) · **Lieu** : bureau A, version accroche (sans encreur) · **Entrée** : `cut`.
  **`summary: false`** (la dernière scène reprend la même image, avec la main qui arrête).
- **À comprendre** : la feuille est passée par quatre mains ; aucune ne l'a arrêtée.
- **Caméra** : `[{ at: "b4", s: 1.0, cx: 540, cy: 900 }, { at: "b4@وما", s: 1.0, cx: 500, cy: 900, d: 1.2 }]`
  (elle accompagne la feuille qui file à gauche).
- **Couches** : plateau A · halo · lampe · tasse (770, 1045) · coupelle (215, 1045) · la lettre (échelle 0,50 :
  260 × 368, état complet de S1) · les 4 mains · HUD (ruban, chaîne, pastille).
- **Le relais** (centre de la lettre ; chaque poussée dure 0,35 s en `E.inOut`) :

  | Étape | Instant | La lettre va de → à | rot | Main qui pousse (angle, paume) |
  |---|---|---|---|---|
  | 1 | `b4+0.07` | P0 (500, 1130) → P1 (330, 930) | 0° → 14° | `M1` (0, paume (500, 1215) → (470, 1160)) |
  | 2 | `b4+0.50` | P1 → P2 (680, 860) | 14° → −10° | `M2` (90, paume (215, 930) → (270, 915)) |
  | 3 | `b4+0.90` | P2 → P3 (590, 730) | −10° → 8° | `M3` (−90, paume (835, 860) → (790, 835)) |
  | 4 | `b4+1.30` | P3 → vers la gauche | 8° → 3° | `M4` (−145, paume (748, 668) → (715, 690)) |
  | fuite | `b4+1.65` → `b4+2.95` | x 590 → −300 à vitesse constante, y 730 → 760 | 3° | personne |

  Chaque main attend au bord (seul le bout de la moufle dépasse dans le cadre), avance de 110 px quand la feuille
  arrive (0,15 s), pousse, puis **retourne à son bord** en 0,30 s : aucun bras ne reste sur le trajet de la feuille,
  aucun bras n'en croise un autre. `M4` passe à droite de la pastille (son bras est à x > 816 pour y < 527).
- **Vie / réactions** : à `b4@وقفاتها` les quatre mains, revenues au bord, se soulèvent ensemble (`leve` 0 → 0,5 →
  0, 0,4 s : un sursaut inutile) ; à `b4@8` (« يد ») la feuille franchit le bord gauche ; les jetons se balancent.
- **Textes** — pastille du haut : `vier Ärzte` / « ربعة ديال الأطباء » — grise, 32 — `pop` à `b4@ربعة`.
- **Mention** : `LAUT PRESSE · REKONSTRUKTION`. **Chaîne** : elle apparaît à `b4@ربعة` et ses quatre ronds
  s'allument puis se barrent au rythme du relais (§ 3). **Bulles** : aucune.

### S4 — Intro : la photo de Yassine tenue par un trombone

- **Beats** i1–i3 · 10,59 → 19,83 (9,2 s) · **Lieu** : le même bureau, une chemise cartonnée posée dessus ·
  **Entrée** : `slideLeft`, 0,34 s, `from: "i1-0.30"` + `bord(c, "gauche")` · **`summary: false`**.
- **À comprendre** : qui parle, pourquoi cette série ; j'aime + abonnement.
- **Caméra** : `[{ at: "i1-0.30", s: 1.05, cx: 540, cy: 840 }, { at: "i1@ياسين", s: 1.0, cx: 540, cy: 880, d: 0.5 }]` ;
  `c.kick("i3@j'aime", 0.05)`, `c.kick("i3@abonne", 0.05)`.
  **Contrôle du bas du bloc** : le bas de la chemise est à y 1206 monde → Y écran 1299 au plus (S = 1,10) : tout le
  bloc finit au-dessus de Y 1300.
- **Couches** : plateau A · halo (centre (540, 700), r 420) + poussière · lampe (tête (150, 380)) · `D.chemise`
  (rot −1°) · un crayon posé en travers du coin bas-gauche de la chemise ((205, 1120) → (330, 1196)) · deux trombones
  libres (850, 1100), (826, 1150) · la photo · le grand trombone · le badge Instagram · textes · cœur et bouton.
  Pas de rayons jaunes (ils sont remplacés par le halo de la lampe).
- **Composition (monde)** — les éléments obligatoires du socle, dans le cadre propre à l'épisode :

  | Élément | Position | Taille | Instant |
  |---|---|---|---|
  | photo `assets/portrait.png` dans un rond, bord au trait + **anneau jaune** | centre (540, 590) ; anneau r 196, photo r 172, ombre décalée (9, 12) ; rot 2° | y 394–786 | tombe sur la chemise à `i1-0.05` (`"drop"`, dist 220, 0,4 s) |
  | **`D.trombone`** (`k` 3,2 : 150 × 52), par-dessus le haut-gauche de la photo | centre (398, 432), rot −58° | — | glisse depuis (300, 300) à `i1+0.05` (0,25 s) ; la photo pend alors à son trombone : `m.pend(photo, "i1+0.3", 4, [398, 432], { idle: 0.5 })` |
  | badge Instagram dessiné (carré arrondi, rond central jaune) | centre (676, 726) | 80 × 80 | avec la photo |
  | ruban « Yassine » (`k.ribbon("Yassine", 540, 858, { size: 54 })`) | y 819–897 | — | `wipe` à `i1@ياسين` (0,35 s) |
  | petite icône Instagram + `@dr.aguilo` | icône (424, 958) 36 px ; texte centre (566, 972), 42 px | — | `pop` / `fade` à `i1@ياسين+0.15` |
  | pastille `Arzt in Deutschland` / « طبيب فألمانيا » (grise, 24) | centre (540, 1040) | l'arabe finit à y ≈ 1110 | `pop` `i1@فألمانيا`, `hide` `i2@حقيقية` |
  | pastille `echte Fälle · deutsche Gerichte` / « قصص حقيقية من المحاكم » (grise, 24) | centre (540, 1040) | — | `pop` `i2@حقيقية+0.15`, `hide` `i3-0.05` |
  | **cœur j'aime** (`PE.props.heart`, taille 1,0) + « j'aime » | cœur (318, 1136) ; texte (402, 1147), 28 px | y 1100–1170 | `pop` à `i3+0.1` ; se remplit et bat à `i3@j'aime` |
  | **bouton** « + s'abonner » → « ✓ abonné » | centre (668, 1136), 270 × 76 (x 533–803, y 1098–1174) | texte 36 px | `pop` à `i3+0.2` ; devient jaune à `i3@abonne` |

- **Vie** : la photo oscille sur son trombone (0,5°) ; poussière ; halo ; à chaque coup de zoom le crayon roule de
  6° et les deux trombones libres sautent ; pendant i2, la lampe balaie légèrement (halo cx ± 20 px, 4 s).
- **Texte écrit** : « Yassine » seulement (jamais « Dr. ») ; `@dr.aguilo`. **Logo du haut** : masqué par le socle de
  `i1-0.1` à `b5-0.1`.
- **Mention** : aucune (ni ruban, ni chaîne des mains dans l'intro). **Bulles** : aucune.

### S5 — La carte : Lehrte, près de Hannover

- **Beat** b5 · 19,83 → 22,62 (2,8 s) · **Lieu** : une carte dépliée sur le bureau A · **Entrée** : `slideLeft`,
  0,34 s, `from: "b5-0.30"` + `bord`.
- **À comprendre** : on reprend au début — 2013, un hôpital de la ville de Lehrte, tout près de Hannover.
- **Caméra** : `[{ at: "b5-0.30", s: 1.0, cx: 540, cy: 900 }, { at: "b5@3", s: 1.12, cx: 560, cy: 880, d: 0.5 }]` ;
  `c.kick("b5@Lehrte", 0.05)`. (À ×1,12 l'Allemagne reste entière : x 205 → X 102 ; le médaillon finit à X 960, au-dessus de la colonne des
  boutons.)
- **Couches** : plateau A · tasse posée sur le coin bas-gauche de la carte (215, 1280) · `D.cartePapier` ·
  `drawDE(c, 430, 965, 78, "b5")` · point de Hannover · traits du médaillon · `D.medaillon` · contenu du médaillon ·
  feuillet daté · mini-lettre · HUD.
- **Composition (monde)** :

  | Élément | Position | Détail |
  |---|---|---|
  | Allemagne (socle) | x 205–650, y 676–1261 | Berlin : point (572, 862) + `Berlin` 24 px |
  | point de la région | anneau d'encre r 9 à (400, 874) + `Hannover` (20 px, gris, aligné à droite sur x 384, y 880) | c'est de ce point que part le médaillon |
  | **médaillon « Region Hannover »** | centre (770, 760), r 130 (x 640–900, y 630–890) | schéma SANS échelle ; dedans : `Hannover` = rond gris r 10 à (692, 772) + nom (18 px) dessous |
  | hôpital n° 1 (`D.iconeKlinik`) | ancre (812, 742) | pas de nom |
  | **épingle jaune n° 1** (`pinAt`) | pointe (812, 742) | + `m.ripple(812, 742, …, { R: 70 })` |
  | mini-lettre (`D.miniLettre`, échelle 0,55 dans le médaillon) | (846, 792) | — |
  | feuillet daté (`D.feuillet({ kind: "date", w: 150, h: 70 })`) | centre (745, 1092) (x 670–820), rot 5° | `2013` (`.tw` 40) |

- **Déroulé** : `b5-0.30` la carte glisse en place · `b5` l'Allemagne apparaît (`fade` 0,3 s), la rose des vents se
  pose (`"drop"`) ; **la chaîne des mains se remet à zéro** (les quatre traits s'effacent, § 3) ; une mini-lettre
  (échelle 1) apparaît en bas à droite de la carte, à (640, 1230) · `b5@الورقة` elle SAUTE (arc de 120 px de haut, 0,4 s)
  jusqu'au point (400, 874) et s'y pose, à l'échelle 0,4 · `b5@3` (« 2013 ») le feuillet `2013` tombe à plat sur la carte, son coin se soulève ;
  le médaillon GRANDIT depuis le point (`m.build(…, "grow", { pivot: [400, 874], dur: 0.45 })`) ; zoom de caméra ·
  `b5@سبيطار` l'hôpital pousse dans le médaillon (`growY`, 0,3 s) · `b5@Lehrte` l'épingle jaune tombe dessus + onde ;
  pastille ; coup de zoom · `b5@Lehrte+0.2` la mini-lettre du médaillon `pop` à côté de l'épingle.
- **Vie** : aiguille de la rose des vents, coin de la carte qui rebique, vapeur de la tasse, coin du feuillet
  daté, mini-lettre qui oscille (± 4°, 2 s), onde sous l'épingle (une fois).
- **Textes** — pastille du haut : `Lehrte · Region Hannover` / « مدينة Lehrte » — grise, 30 — `pop` à `b5@Lehrte`.
- **Mention** : `LAUT PRESSE`. **Chaîne** : quatre ronds vides. **Bulles** : aucune.
- **Affiche** : figer à `b5@Lehrte+0.6`.

### S6 — La feuille, puis son patient

- **Beats** b6–b7 · 22,62 → 27,47 (4,9 s) · **Lieu** : bureau A complet · **Entrée** : `slideLeft`, 0,34 s, à `b6` + `bord`.
- **À comprendre** : c'est une lettre de sortie ; celle d'un homme de 79 ans qu'on va transférer dans un autre hôpital.
  L'objet est présenté AVANT l'homme.
- **Caméra** : `[{ at: "b6", s: 1.0, cx: 540, cy: 900 }, { at: "b6+0.1", s: 1.02, cx: 540, cy: 900, d: 1.9, ease: "lin" },
  { at: "b7-0.1", s: 1.18, cx: 440, cy: 790, d: 0.5 }, { at: "b7@يحولوه-0.15", s: 1.1, cx: 500, cy: 850, d: 0.5 }]`.
  À ×1,18 : la lettre (x 292–708 → X ≤ 885, bas à Y 1447) et la fiche (x 235–365) sont entières ; la pastille du haut
  ne couvre que du bois (monde y < 465).
- **Couches** : mise en place « bureau A » complète.
- **Construction en cascade** (instants relatifs à `b6`) : `-0.05` **la lettre glisse depuis la droite**
  (`slide("b6-0.05", 620, 0, 0.45)`) — vierge : `{ titre: 0, cadre: 0, lignes: 0, mtx: 0, freq: "", points: 0, sig1: 0,
  sig2: 0, plis: 0 }` · `0.00` lampe (`"swing"`) · `0.05` clavier (`"rise"`, dist 200) · `0.10` tasse (`"drop"`,
  onde à 0,45) · `0.12` plante (`"grow"`) · `0.15` encreur + tampon (`"left"`) · `0.20` coupelle (`"left"`) · `0.25`
  le stylo roule depuis la droite (`"right"`, puis 12° de roulis).
- **Déroulé** : `b6@Entlassungsbrief` le titre `ENTLASSUNGSBRIEF` se frappe (16 lettres en 0,70 s, anneau d'impact,
  curseur) · `b6@يعني` pastille 1 ; le squelette du formulaire se trace (`cadre` 0 → 1 en 0,4 s : `Patient:`,
  `Diagnosen:`, `Verlauf:`, `Medikation:`, `Unterschrift:` et les filets) · `b6@الخروج` la feuille fait un petit
  battement (échelle 1,04, 0,3 s) · `b7` la pastille 1 se cache ; **la fiche du patient glisse depuis la gauche**
  (`slide("b7", -300, 0, 0.4)`) · `b7@مريض` le trombone la fixe au coin de la lettre (0,2 s, rebond) ; il sourit ·
  `b7@3` (« 79 ») `79 J.` se frappe sur la ligne « Patient » de la lettre ET sous le portrait (`age: 1`) ; pastille 2 ·
  `b7@يحولوه` le cadre `VERLEGUNG →` se frappe en haut à droite de la lettre (`verl` 0 → 1 en 0,35 s) ; pastille 3 ·
  `b7@آخر` la lettre avance de 18 px vers la droite et revient (0,3 s) : elle va partir.
- **Personnage** : `PAT` dans la fiche — `calm` à l'entrée, `smile` à `b7@مريض`, `look2: [0.5, 0.3]` (il regarde sa
  lettre), un clignement toutes les 3,4 s. Aucune main dans cette scène : la première n'arrive qu'en S7.
- **Vie** : voir « bureau A ».
- **Textes** — pastille du haut, une à la fois :
  1. `Entlassungsbrief` / « ورقة الخروج » — 32 — `pop` `b6@يعني`, `hide` `b7`
  2. `Patient · 79 Jahre` / « مريض عندو 79 عام » — 30 — `pop` `b7@3`, `hide` `b7@يحولوه-0.1`
  3. `Verlegung · Ende Oktober 2013` / « تحويل لسبيطار آخر » — 28 — `pop` `b7@يحولوه`
- **Mention** : `LAUT PRESSE · REKONSTRUKTION`. **Chaîne** : quatre ronds vides. **Bulles** : aucune.
- **Affiche** : figer à `b7@آخر`.

### S7 — La première main

- **Beat** b8 · 27,47 → 30,18 (2,7 s) · **Lieu** : bureau A · **Entrée** : `cut`.
- **À comprendre** : la première main est celle de la médecin du service ; c'est elle qui écrit la lettre.
- **Caméra** : `[{ at: "b8", s: 1.0, cx: 540, cy: 900 }, { at: "b8+0.1", s: 1.02, cx: 536, cy: 900, d: 2.5, ease: "lin" }]` ;
  `c.kick("b8@الأولى", 0.04)`.
- **État de départ** : bureau A tel qu'à la fin de S6 (titre, squelette, `79 J.`, `VERLEGUNG →`, fiche tenue par le
  trombone), `lignes: 0`.
- **Mains** : `M1`, les DEUX mains, `a: 0`, `pose: "frappe"` — droite : paume (612, 1252) ; gauche (`miroir: true`,
  `montre: true`) : paume (388, 1252). Elles montent du bas à `b8` (0,35 s, `E.out`, depuis y + 420). Jeton `1` au
  poignet droit (il pend vers (650, 1350)) : `pop` à `b8@الأولى` + `m.pend`.
- **Déroulé** : `b8` les mains arrivent ; rond 1 de la chaîne actif · `b8+0.3` → `b8@service` **frappe** : une
  touche du clavier s'enfonce toutes les 0,09 s (`touche` pseudo-aléatoire sous la main qui descend), les deux mains
  alternent (y ± 5 px, 5,5 Hz, en opposition) ; sur la lettre, les barres du texte apparaissent une à une (`lignes`
  0 → 6, une toutes les 0,28 s), le curseur court au bout de la barre en cours · `b8@الأولى` jeton + coup de zoom ·
  `b8@Stationsärztin` pastille · `b8@service` les mains s'immobilisent 0,15 s, le curseur saute au début de la ligne
  2 du tableau « Medikation » et clignote : elle va écrire le médicament.
- **Vie** : trotteuse de la montre (un saut par seconde), vapeur, plante, halo, la fiche du patient qui cligne.
- **Textes** — pastille du haut : `Stationsärztin` / « طبيبة الـservice » — 32 — `pop` `b8@Stationsärztin`.
- **Mention** : `LAUT PRESSE · REKONSTRUKTION`. **Chaîne** : rond 1 actif. **Bulles** : aucune.
- **Affiche** : figer à `b8@service`.

### S8 — « Chaque jour » : sept lettres, sept comprimés (le dispositif signature)

- **Beat** b9 · 30,18 → 33,44 (3,3 s) · **Lieu** : la lettre vue de très près + le pilulier · **Entrée** : `cut` (insert).
- **À comprendre** : il lui fallait le médicament UNE fois par semaine ; elle a écrit « chaque jour ». Le pilulier
  montre la différence : une alvéole, puis sept.
- **Caméra** : `[{ at: "b9", s: 1.0, cx: 540, cy: 930 }, { at: "b9+0.1", s: 1.03, cx: 540, cy: 940, d: 3.1, ease: "lin" }]` ;
  `c.kick("b9@كل", 0.06)`.
- **Couches** : plateau A · `D.briefMacro` · `D.pilulier` (posé sur le bas de la feuille) · comprimés · mots arabes · HUD.
- **Composition (monde)** : `Medikation:` (170, 610) ; ligne 1 (ligne de base y 700) ; case du mot (ligne de base
  y 880, calée à droite sur x 862) ; **`D.pilulier`** centre (510, 1150) → x 160–860, y 1065–1235 ; alvéoles :
  centres x = 216 + 98·i (i = 0…6), y 1160.
- **Déroulé** :

  | Repère | Ce qui se passe |
  |---|---|
  | `b9` | feuille vue de près, ligne 1 vide, curseur à (170, 700) |
  | `b9@Methotrexat` | `Methotrexat 15 mg` se frappe (17 caractères en 0,5 s) ; pastille 1 |
  | `b9@كان` | le pilulier glisse depuis le bas (`m.build(…, "rise", { dist: 300, dur: 0.45 })`), vide, couvercles relevés |
  | `b9@مرة` | **version juste** : « wöchentlich » s'inscrit en pointillé gris dans la case (`wipe` 0,3 s) ; UN comprimé tombe dans « Mo » (`"drop"`, dist 140, 0,3 s ; le couvercle « Mo » claque : `clap: 0`) ; pastille 2 |
  | `b9@فالسيمانة` | « مرة فالسيمانة » (`ar strong` 48, centre (300, 880), `wipe` rtl 0,3 s) |
  | `b9@وكتباتو` | le mot en pointillé s'efface, lettre par lettre de droite à gauche (0,25 s) ; « مرة فالسيمانة » `hide` 0,15 s ; pastille 2 `hide` ; le curseur revient à (442, 880) |
  | `b9@كل` | **« täglich » se frappe à l'encre** (`.tw` 100, x 442–862), une lettre toutes les 0,06 s : à la 1re lettre le comprimé de « Mo » saute (10 px) ; à chaque lettre suivante UN comprimé tombe dans l'alvéole suivante (Di, Mi, Do, Fr, Sa, So ; 0,10 s après sa lettre ; `clap` = son indice) ; coup de zoom |
  | `b9@نهار` | « كل نهار » (`ar strong` 52, centre (290, 880), `wipe` rtl) ; les sept comprimés font une vague (10 px, 0,05 s d'écart) |

- **Vie** : curseur ; papier qui tressaille pendant les deux frappes ; comprimés qui respirent ; couvercles qui
  vibrent 0,1 s après chaque chute. Aucune main : c'est l'insert de ce que `M1` frappe en S7.
- **Vérité** : le pilulier est un SCHÉMA (aucune source ne parle d'un pilulier) ; il montre des alvéoles, jamais un
  nombre de comprimés ni un nombre de jours ; « 15 mg » vient d'une seule source.
- **Textes** — pastille du haut :
  1. `Methotrexat (MTX)` / « دوا » — 32 — `pop` `b9@Methotrexat`, `hide` `b9@خاصو`
  2. `15 mg · 1 × wöchentlich` / « 15 ميليغرام، مرة فالسيمانة » — 30 — `pop` `b9@مرة`, `hide` `b9@وكتباتو`
  (ensuite plus de pastille : le mot allemand est dans l'image, avec son arabe à gauche.)
- **Mention** : `LAUT PRESSE · REKONSTRUKTION`. **Chaîne** : rond 1 actif. **Bulles** : aucune.
- **Affiche** : figer à `b9@نهار+0.2` (« täglich » + sept comprimés).

### S9 — La deuxième main signe

- **Beat** b10 · 33,44 → 35,85 (2,4 s) · **Lieu** : bureau A · **Entrée** : `cut`.
- **À comprendre** : une deuxième personne contresigne la lettre sans voir l'erreur. On ne voit qu'une main, sans
  aucun signe de genre.
- **Caméra** : `[{ at: "b10", s: 1.0, cx: 540, cy: 900 }, { at: "b10+0.1", s: 1.04, cx: 520, cy: 900, d: 2.2, ease: "lin" }]` ;
  `c.kick("b10@سنات", 0.05)`. Pas d'insert : au-delà de ×1,04 la pastille du haut passerait sur la fiche du patient.
- **État de départ** : lettre complète sauf les signatures — `{ lignes: 6, mtx: 17, freq: "t", nfreq: 7, points: 7,
  sig1: 0, sig2: 0 }`. La **tache jaune** (sept points sous le mot, vers (636, 993)) est désormais le repère de
  l'erreur dans tous les plans larges.
- **Mains** :
  - `M1` (droite, `a: 0`, `pose: "stylo"`, stylo `"bille"`) est déjà là : elle trace son paraphe sur le trait de
    DROITE (`sig1` 0 → 1 de `b10` à `b10+0.3`, pointe de (516, 1122) à (681, 1122), paume = pointe + (28, 88)), puis
    se retire vers le bas à `b10+0.35` (0,3 s). Le rond 1 passe à « passé » à `b10`.
  - `M2` (`a: 90`, `pose: "stylo"`, stylo `"plume"`) entre par la gauche à `b10@الثانية` (0,3 s) ; jeton `2` :
    `pop` à `b10@الثانية+0.15`. Sa pointe est à paume + (96, −30). À `b10@سنات` elle signe sur le trait de GAUCHE
    (`sig2` 0 → 1 en 0,45 s, pointe de (319, 1122) à (476, 1122), paume de (223, 1152) à (380, 1152)), d'UN trait
    rapide. À `b10@شافتش` elle recapuchonne (0,2 s). À `b10@الغلطة` elle pousse la feuille de 40 px vers la droite
    (0,25 s) et se retire ; rond 2 « passé ».
- **Réaction** : à `b10@وما` la tache jaune `puls` 1 pendant 0,5 s (les sept points grossissent et tremblent) — à
  630 px de la pointe du stylo, qui ne s'en approche jamais. C'est la première des trois alertes ; elles
  raccourcissent comme le refrain (0,5 s ici, 0,4 s en S11, 0,3 s en S12).
- **Vie** : voir « bureau A » ; la fiche du patient cligne ; le jeton `2` se balance.
- **Textes** — pastille du haut : `gegengezeichnet` / « سنية ثانية » — 30 — `pop` `b10@سنات+0.2`.
- **Mention** : `LAUT PRESSE · REKONSTRUKTION`. **Chaîne** : 1 passé, 2 actif puis passé. **Bulles** : aucune.
- **Affiche** : figer à `b10@شافتش`.

### S10 — La feuille part avec lui

- **Beat** b11 · 35,85 → 38,07 (2,2 s) · **Lieu** : la carte, dans le médaillon · **Entrée** : `slideLeft`, 0,34 s,
  `from: "b11-0.30"` + `bord` · **`summary: false`**.
- **À comprendre** : la feuille voyage avec le patient vers un deuxième hôpital de la région — jamais nommé.
- **Caméra** : `[{ at: "b11-0.30", s: 1.12, cx: 560, cy: 880 }, { at: "b11", s: 1.5, cx: 770, cy: 770, d: 0.5 }]`.
  À ×1,5 le médaillon (r 130) occupe X 333–755, Y 717–1138 : entier, sous la pastille.
- **État de départ** : la carte comme à la fin de S5 (Allemagne, point de Hannover, médaillon, hôpital n° 1 et épingle
  n° 1 à (812, 742), mini-lettre à (846, 792)).
- **Composition dans le médaillon (monde)** : trajet en pointillé `M812 752 C 860 800, 820 860, 760 852` ; hôpital
  n° 2 (`D.iconeKlinik`) ancre (742, 850) ; épingle jaune n° 2, pointe (742, 850). La position de la deuxième épingle
  est SCHÉMATIQUE (ne pas la placer d'après une vraie carte : la ville n'est dans aucune source de l'affaire).
- **Déroulé** : `b11` la mini-lettre se plie (elle devient `pliee: true` : enveloppe blanche + mini-fiche du patient
  au trombone ; écrasement `sy` 1 → 0,6 → 1 en 0,2 s) · `b11@مشات` le pointillé se trace devant elle (`wipe` 0,5 s)
  et elle le suit jusqu'à `b11@للسبيطار`, en se dandinant (± 4°) · `b11@معاه` la mini-fiche fait un battement
  (échelle 1,2) : il voyage avec elle · `b11@للسبيطار` l'hôpital n° 2 pousse ; pastille · `b11@الثاني` l'épingle
  n° 2 tombe + onde (`m.ripple(742, 850, …, { R: 60 })`) ; `c.kick("b11@الثاني", 0.05)`.
- **Vérité** : aucun véhicule (le moyen de transport n'est dit nulle part) ; aucun nom sur la deuxième épingle.
- **Vie** : mini-lettre qui oscille, première épingle immobile, traits de routes du médaillon, coin de carte.
- **Textes** — pastille du haut : `andere Klinik · Region Hannover` / « سبيطار آخر » — 28 — `pop` `b11@للسبيطار`.
- **Mention** : `LAUT PRESSE · REKONSTRUKTION`. **Chaîne** : 1 et 2 passés. **Bulles** : aucune.

### S11 — La troisième main

- **Beat** b12 · 38,07 → 40,79 (2,7 s) · **Lieu** : bureau B (la deuxième clinique) · **Entrée** : `slideLeft`,
  0,34 s, à `b12` + `bord`.
- **À comprendre** : à l'arrivée, la médecin qui fait l'admission ouvre la lettre… et ne voit pas l'erreur.
- **Caméra** : `[{ at: "b12", s: 1.0, cx: 540, cy: 900 }, { at: "b12@l'admission-0.1", s: 1.03, cx: 555, cy: 895, d: 0.5 }]`.
- **Construction en cascade** (relatif à `b12`) : `0.00` sous-main et ombres du store présents · `0.05` porte-bloc
  du formulaire (`"drop"`, dist 220) · `0.12` téléphone (`"right"`, dist 200 ; le cordon se balance) · `0.18` verre
  (`"drop"` ; l'eau ondule) · `0.00` **l'enveloppe blanche** (`D.enveloppeBlanche`, la lettre pliée qui dépasse) et
  la fiche du patient tenue par son trombone glissent depuis la gauche jusqu'à (420, 900) (0,4 s).
- **Main** : `M3` (`a: -90`, `pose: "stylo"`, stylo `"clic"` ; pointe = paume + (−88, 28)) entre par la droite à
  `b12@الثالثة` (0,3 s), paume (590, 880) ; jeton `3` : `pop` à `b12@الثالثة+0.15`.
- **Déroulé** : `b12@الطبيبة` elle tire la lettre hors de l'enveloppe (`sortie` 0 → 1, 0,2 s) ; l'enveloppe vide est
  repoussée en bas à gauche, à (290, 1320), rot −8° (0,25 s) ; **la lettre se déplie** en deux temps (`fold` 1 → 0,5
  à `b12@الطبيبة+0.2`, → 0 à `b12@الطبيبة+0.4`, chaque fois avec un léger dépassement de `sy`) et prend sa place :
  centre (420, 960), échelle 0,80, `plis: 1` ; la fiche vient à (228, 715) ; pastille · `b12@l'admission` sa main va
  au formulaire : **trois coches** (`coche` 1, 2, 3 à 0,15 s d'intervalle ; pointe sur (685, 720), (685, 760),
  (685, 800)) ; la caméra la suit · `b12@5` (« ما ») la tache jaune de la lettre, vers (556, 1062), `puls` 0,4 s —
  la main est sur le formulaire, à 300 px de là · `b12@شافتهاش` clic du stylo (le poussoir s'enfonce) ; rond 3
  « passé » 0,3 s plus tard.
- **Vie** : ombres du store, cordon, eau du verre, la fiche qui cligne, jeton, respiration de la main.
- **Textes** — pastille du haut : `aufnehmende Ärztin` / « الطبيبة ديال l'admission » — 28 — `pop` `b12@الطبيبة+0.1`.
- **Mention** : `LAUT PRESSE · REKONSTRUKTION`. **Chaîne** : 1, 2 passés ; 3 actif puis passé. **Bulles** : aucune.
- **Affiche** : figer à `b12@شافتهاش`.

### S12 — La quatrième main, celle d'au-dessus

- **Beat** b13 · 40,79 → 43,81 (3,0 s) · **Lieu** : bureau B · **Entrée** : `cut`.
- **À comprendre** : l'Oberarzt — le médecin placé au-dessus d'elle — passe sur la lettre à son tour. Lui non plus.
- **Caméra** : `[{ at: "b13", s: 1.06, cx: 520, cy: 900 }, { at: "b13+0.1", s: 1.09, cx: 520, cy: 905, d: 2.8, ease: "lin" }]` ;
  `c.kick("b13@8", 0.04)`.
- **État de départ** : bureau B comme à la fin de S11 (lettre dépliée, trois coches). `M3` attend au bord droit :
  paume (990, 860), seul le bout de la moufle dépasse, immobile (elle laisse la place).
- **Main** : `M4` (`a: -145`, `pose: "stylo"`, stylo `"bille"` ; pointe = paume + (−33, 106)) descend du coin
  haut-droit à `b13@الرابعة` (0,3 s) et se pose (`leve` 1 → 0) sur le haut-droit de la lettre, paume (560, 780) ;
  jeton `4` : `pop` à `b13@الرابعة+0.15`. Son avant-bras remonte vers (0,57 ; −0,82) : il ne croise ni `M3`
  (bande y 812–908 au bord droit) ni la pastille (décalée à gauche).
- **Déroulé** : `b13@Oberarzt` pastille · `b13@الطبيب` **il survole** : la pointe descend le long de la marge
  droite de la lettre, de (608, 700) à (608, 1100), en 0,45 s — elle passe devant la ligne du médicament (y 1050)
  sans ralentir · `b13@فوقها` il paraphe en bas à droite de la lettre (`para` 0 → 1 en 0,25 s, vers (580, 1224)) ·
  `b13@حتى` la tache jaune `puls` 0,3 s (la troisième et la plus courte) · `b13@8` (« هو ») il tapote deux fois
  (`appui` 0 → 1 → 0, deux fois en 0,3 s), puis repart vers son coin (0,3 s) ; rond 4 « passé » à `b13@8+0.2`.
- **Vie** : ombres du store, cordon, la fiche qui cligne, la grosse montre carrée (aiguille des secondes : un saut
  par seconde), jeton.
- **Textes** — pastille du haut, **décalée à X 400** : `Oberarzt` / « الطبيب اللي فوقها » — 32 — `pop` `b13@Oberarzt`.
- **Mention** : `LAUT PRESSE · REKONSTRUKTION`. **Chaîne** : 4 actif puis passé — les quatre ronds sont barrés.
- **Bulles** : aucune. **Affiche** : figer à `b13@حتى`.

### S13 — Ils suivent la feuille : sept fois la dose

- **Beat** b14 · 43,81 → 46,42 (2,6 s) · **Lieu** : bureau B, puis le pilulier · **Entrée** : `cut`.
- **À comprendre** : tous les deux recopient ce que dit la feuille ; le patient reçoit donc la dose de la semaine
  chaque jour : sept fois la dose.
- **Caméra** : `[{ at: "b14", s: 1.0, cx: 540, cy: 860 }, { at: "b14@كل", s: 1.0, cx: 540, cy: 960, d: 0.6 }]` (elle
  DESCEND du plan de soins au pilulier) ; `c.kick("b14@dose", 0.05)`.
- **Composition (monde)** :

  | Élément | Position | Remarque |
  |---|---|---|
  | `D.brief` (dépliée) | centre (330, 900), échelle 0,62, rot −3° → x 169–491, y 672–1128 | tache jaune vers (435, 979) |
  | `D.fichePatient` (échelle 0,78) + trombone | centre (205, 700) | — |
  | `D.planSoins` | centre (690, 780) → x 500–880, y 640–920 | ligne 2 à y ≈ 782 : « Medikament » x 510–640, « Dosierung » x 640–740, sept cases à x = 746 + 19·i |
  | `7 ×` (`.tw` 80) | centre (510, 1070) | frappé |
  | **`D.pilulier`** | centre (510, 1215) → x 160–860, y 1130–1300 | alvéoles : x = 216 + 98·i, y 1225 |
  | flèche en pointillé | `M435 979 C 470 880, 520 840, 556 806` | tirets qui avancent (décalage du pointillé, 60 px/s) |

- **Mains** : `M3` (`a: -90`, stylo `"clic"`) écrit sur le plan : paume de (603, 754) à (948, 754) ; `M4`
  (`a: -145`, `pose: "plat"`) est appuyé sur le coin haut-droit de la LETTRE, paume (440, 720) : c'est sur la feuille
  qu'il s'appuie. Les deux sont en place dès `b14` ; le plan de soins glisse depuis la droite avec `M3` (0,25 s).
- **Déroulé** : `b14@تبعو` la flèche part de la tache jaune ; `M3` écrit `MTX 15 mg` (`nom` 0 → 1, 0,3 s) puis
  `täglich` (`mot` 0 → 1, 0,3 s), à la main ; pastille 1 · `b14@كل` **sept croix** dans les sept cases (`croix` 0 → 7,
  0,06 s d'écart), puis les deux mains se retirent (0,3 s) ; la caméra descend · `b14@نهار` **sept comprimés tombent
  dans le pilulier**, un toutes les 0,07 s (`"drop"`, dist 140 ; chaque couvercle claque) — AUCUNE main ne les donne ·
  `b14@سبع` pastille 2 ; `7 ×` se frappe · `b14@dose` coup de zoom ; les sept comprimés font une vague.
- **Vérité** : « sept fois » = la dose de la semaine donnée chaque jour (calcul) ; aucun nombre de comprimés ni de
  jours ; personne n'est montré en train de donner le médicament (aucune infirmière dans les sources).
- **Vie** : ombres du store, tirets de la flèche, la fiche qui cligne, comprimés qui respirent.
- **Textes** — pastille du haut :
  1. `Medikation übernommen` / « تبعو الورقة » — 28 — **à X 360** — `pop` `b14@تبعو`, `hide` `b14@سبع-0.15`
  2. `7 × Wochendosis` / « سبع مرات la dose » — 32 — à X 540 — `pop` `b14@سبع`
- **Mention** : `LAUT PRESSE · REKONSTRUKTION`. **Chaîne** : quatre ronds barrés. **Bulles** : aucune.
- **Affiche** : figer à `b14@dose` (plan de soins coché + pilulier plein).

### S14 — La moelle, l'usine du sang (le médical expliqué en image)

- **Beat** b15 · 46,42 → 49,15 (2,7 s) · **Lieu** : une notice dépliée (schéma imprimé) · **Entrée** : `slideLeft`,
  0,34 s, à `b15` + `bord`.
- **À comprendre** : en trop grande quantité, ce médicament arrête la moelle — l'usine qui fabrique le sang. C'est
  ce que fait une surdose EN GÉNÉRAL ; rien n'est publié sur le sang de ce patient.
- **Caméra** : `[{ at: "b15", s: 1.0, cx: 540, cy: 930 }, { at: "b15+0.1", s: 1.02, cx: 540, cy: 935, d: 2.6, ease: "lin" }]` ;
  `c.kick("b15@كيضرب", 0.05)`.
- **Couches** : `D.notice` · `D.usine` centre (510, 960) → x 160–860, y 700–1220 (tapis à y 840, 960, 1080) ·
  comprimés · légende · HUD.
- **Légende** (une ligne sous l'os, y 1298) : pictogramme (r 14) + mot, trois fois — « الكريات الحمرا » centre
  (265, 1298) · « الكريات البيضا » centre (510, 1298) · « les plaquettes » centre (745, 1298) — `ar strong` 28
  (ces trois mots sont À VALIDER par l'auteur ; ils apparaissent ensemble à `b15+0.3`, `fade` 0,3 s).
- **Déroulé** :

  | Repère | Ce qui se passe |
  |---|---|
  | `b15` | l'os se dessine (`wipe` gauche → droite, 0,35 s) ; les trois tapis tournent DÉJÀ : les pièces avancent, tombent dans le tuyau, les trois jauges sont pleines |
  | `b15@كثر` | le 1er comprimé tombe de (510, 560) sur le haut de l'os, rebondit, reste là : rien ne change (une dose, l'usine tourne) |
  | `b15@كيضرب` | les six autres tombent, un toutes les 0,11 s : les n° 2 et 3 sur le tapis des plaquettes (x 440 et 580, y 1080), les n° 4 et 5 sur celui des globules blancs (y 960), les n° 6 et 7 sur celui des globules rouges (y 840) ; ils restent coincés dessus |
  | `b15@كيضرب+0.31` · `+0.53` · `+0.75` | les tapis s'arrêtent l'un après l'autre (`stop` 0 → 1 en 0,25 s) : rouleaux figés, pièces grisées ; `c.shake(…, 4, 0.2)` à chaque arrêt |
  | `b15@moelle` | pastille |
  | `b15@المعمل` | le tuyau se vide (`tuyau` 1 → 0 en 0,6 s : les pièces s'espacent, puis plus rien) |
  | `b15@الدم` | les trois jauges tombent à zéro (0,15 s d'écart) |

- **Vie** : tapis, rouleaux, pièces qui tressautent sur les bandes, plis de la notice ; après l'arrêt, seuls les
  comprimés bougent encore (ils respirent) : l'usine est figée, le jaune reste.
- **Textes** — pastille du haut : `Knochenmark` / « المعمل ديال الدم » — 32 — `pop` `b15@moelle`.
- **Mention** : `ALLGEMEIN · LAUT FACHINFORMATION` (X 100–537) + à sa droite, dans le HUD, « بصفة عامة »
  (`ar strong` 26, centre (612, 302) ; À VALIDER). **Chaîne** : quatre ronds barrés. **Bulles** : aucune.
- **Affiche** : figer à `b15@الدم`.

### S15 — Une semaine… deux… trois…

- **Beat** b16 · 49,15 → 50,55 (1,4 s) · **Lieu** : la chambre de gériatrie, de face — **la caméra se relève pour la
  première fois** · **Entrée** : `fade`, 0,25 s, `from: "b15@end"`.
- **À comprendre** : trois semaines passent.
- **Caméra** : `[{ at: "b15@end", s: 1.0, cx: 540, cy: 930 }, { at: "b16", s: 1.02, cx: 540, cy: 935, d: 1.3, ease: "lin" }]`.
- **Couches** : mise en place « chambre » complète. Le patient dort : œil fermé, `souffle` = (sin(2π·t / 2,9) + 1) / 2.
- **Construction** (la scène est courte : pas de grande cascade) : à `b15@end` le calendrier tombe sur son clou
  (`"drop"`, dist 120, 0,3 s) puis `m.pend(…, 4°)` ; le trapèze et la casquette pendent (`m.pend` 6° et 5°).
- **Déroulé** : le calendrier affiche `1.` `WOCHE` · `b16@سيمانة-0.1` le coin du feuillet frémit · `b16@سيمانة`
  **le feuillet 1 s'arrache** (`D.feuillet` : chute en feuille morte de (590, 730) à (560, 1290) en 0,6 s, puis il
  s'efface) ; le bloc affiche `2.` · `b16@جوج` le feuillet 2 s'arrache de la même façon (vers (625, 1290)) ; `3.` ·
  `b16@تلاتة` le coin du feuillet 3 se décolle (`coin` 0 → 0,6 en 0,3 s)… et reste là ; pastille.
- **Vérité** : aucune date sur le calendrier (la date du décès n'est pas publiée) ; le pilulier du chevet (sept
  points jaunes) est un rappel du schéma, couvert par `REKONSTRUKTION` ; personne dans la chambre.
- **Vie** : voir « chambre » (feuilles mortes derrière la vitre, branche, voilage, vapeur de la tisane, trapèze,
  casquette, poussière dans la lumière, poitrine).
- **Textes** — pastille du haut : `3 Wochen` / « تلت سيمانات » — 32 — `pop` `b16@تلاتة`.
- **Mention** : `LAUT PRESSE · REKONSTRUKTION`. **Chaîne** : quatre ronds barrés. **Bulles** : aucune.
- **Affiche** : figer à `b16@جوج+0.1`.

### S16 — Scène muette : il n'a pas survécu

- **Durée** : le silence après b16 · 50,55 → 53,71 (3,2 s) · **Lieu** : la même chambre, plan rapproché ·
  **Entrée** : `cut`, `from: "b16@end+0.05"` (même décor, même état : on change seulement de cadre).
- **À comprendre** : le patient est mort. On le MONTRE, seul dans son lit ; on ne le dit pas.
- **Caméra** : `[{ at: "b16@end+0.05", s: 1.1, cx: 520, cy: 1010 }, { at: "b16@end+0.15", s: 1.14, cx: 520, cy: 1010, d: 3.1, ease: "lin" }]`.
  Contrôle (S de 1,17 à 1,26) : chevet x 197 → X 134 ; pieds sous la couverture x 815 → X 911 ; calendrier y 618 →
  Y 447 ; sol y 1300 → Y 1305 ; la bande Y 1340–1470 ne montre que du plancher : c'est là que s'écrit la phrase.
- **Repères internes** : `quiet` = `b16@end+1.0` ; `live(t) = 1 − E.inOut(prog(t, quiet, 0.8))`.
- **Déroulé** (tout est compté depuis `b16@end`) :

  | Instant | Ce qui se passe |
  |---|---|
  | `+0.05` | même chambre : le calendrier montre `3.` avec le coin décollé ; la pastille « 3 Wochen » reste, puis `hide` à `+0.6` |
  | `+0.2` → `+1.0` | **la dernière respiration** : la poitrine monte une fois, lentement (`souffle` 0,3 → 1 à `+0.5`), redescend à 0 à `+1.0`… et ne remonte plus |
  | `+1.0` (`quiet`) → `+1.8` | **tout se fige** (× `live(t)`) : les feuilles mortes s'arrêtent en l'air derrière la vitre, la branche, le voilage, le trapèze, la casquette ; la vapeur de la tisane cesse de monter et s'efface ; la poussière s'immobilise (`m.dust(…, { to: quiet + 0.6 })`) |
  | `+1.2` → `+2.5` | **le feuillet 3 se détache** et tombe lentement (1,3 s : x ± 30 px, rotation ± 25°), se pose sur le plancher à (566, 1296), glisse de 20 px, reste là ; le bloc ne montre plus que son carton nu (`n: 0`) |
  | `+1.3` → `+2.5` | la lumière baisse (`jour` 1 → 0,55 ; tache de lumière au sol : opacité 0,28 → 0,10) ; **la couleur s'éteint** : `c.layer.style.filter = grayscale(0 → 0,85)` ET `grey` 0 → 1 sur `D.pilulierMini` et `D.litGeriatrie` (pour que la case de l'affiche soit grise elle aussi) |
  | `+1.5` | la phrase s'écrit (`wipe` de droite à gauche, 0,6 s) |
  | `+1.8` | la ligne allemande apparaît (`fade` 0,4 s) |
  | `b17-0.10` | phrase et ligne `hide` (0,2 s) |

- **Personnage** : le patient (`D.litGeriatrie`) — œil fermé du début à la fin, moustache blanche, bras posé sur la
  couverture ; ses lunettes pliées sur le chevet, sa casquette pendue à la tête de lit, sa canne contre le chevet.
  **Ni famille, ni soignant, ni moniteur, ni perfusion, ni aucun appareil** : rien de cela n'est dans les sources.
- **Textes (HUD)** : « المريض ما عاشش · 79 عام » — `k.ar(…, 540, 1445, 44, "ttl", c.hud)` (57 px, encre) ; au-dessus,
  `„Drei Wochen später starb der Patient." — laut Presse` — `de` 26, centre (540, 1385). Pas de pastille du haut
  après `+0.6`.
- **Son** : aucun bip (il n'y a pas de moniteur) ; le silence, puis le papier (voir `son/plan_son.md`).
- **Mention** : `LAUT PRESSE · REKONSTRUKTION`. **Chaîne** : quatre ronds barrés (grisés par le filtre).
- **Affiche** : figer à `b16@end+3.0`.

### S17 — Selon le parquet et la presse : le médicament

- **Beat** b17 · 53,71 → 55,92 (2,2 s) · **Lieu** : bureau C (la justice), plongée · **Entrée** : `fade`, 0,35 s,
  `from: "b17-0.10"` (la couleur revient).
- **À comprendre** : c'est le parquet, et la presse, qui disent que la cause est le médicament. Aucun tribunal ne l'a
  constaté.
- **Caméra** : `[{ at: "b17-0.10", s: 1.0, cx: 540, cy: 900 }, { at: "b17", s: 1.02, cx: 540, cy: 905, d: 2.0, ease: "lin" }]`.
- **Composition (monde)** :

  | Élément | Position | Remarque |
  |---|---|---|
  | `D.dossier` (330 × 440), étiquette `Staatsanwaltschaft Hildesheim` (`.tw` 16, deux lignes) | centre (350, 900) → x 185–515, y 680–1120 | s'ouvre : la couverture pivote sur son dos gauche (`sx` 1 → 0,12) |
  | dans le dossier : `D.brief` échelle 0,42 (tache jaune visible) | centre (372, 920) | la feuille est devenue une pièce du dossier |
  | dans le dossier : `D.fichePatient` — `{ deuil: 1, grey: 1, expr: "calm", blink: 0 }` + trombone | centre (262, 760) | **figé** : il ne cligne plus |
  | `D.coupure` | centre (715, 860) → x 590–840, y 695–1025 | — |
  | deux flèches en pointillé | `M350 1125 C 360 1160, 400 1185, 440 1195` et `M715 1030 C 700 1110, 640 1170, 580 1195` | elles convergent |
  | sept `D.comprime` (r 22) | x = 314 + 62·i, y 1215 | — |
  | `D.bande` : `„aufgrund der Überdosierung"` (`.tw` 26) | centre (500, 1288), x 260–740 | sous elle : « بسبب la dose الزايدة » (`ar strong` 30, centre (500, 1342)) |

- **Construction / déroulé** : `b17-0.10` sous-main ; lampe de banquier (`"drop"`, dist 140) ; carrousel à tampons
  (`"grow"`, +0,1) ; le dossier glisse depuis la gauche (0,35 s) · `b17+0.05` pastille · `b17@النيابة` le dossier
  s'ouvre (0,35 s) : la lettre et la fiche en deuil apparaissent · `b17@والصحافة` la coupure de presse glisse depuis
  la droite (0,3 s) · `b17@السبب` les deux flèches se tracent (`wipe` 0,3 s) · `b17@الدوا` les sept comprimés
  apparaissent en cascade (0,05 s d'écart) ; la bande se frappe (0,4 s) ; 0,3 s plus tard l'arabe (`wipe` rtl).
- **Vie** : chaînette de la lampe, carrousel, coin de la coupure, halo, comprimés qui respirent. La fiche, elle, ne
  bouge plus du tout.
- **Textes** — pastille du haut : `laut Staatsanwaltschaft · laut Presse` / « حسب النيابة والصحافة » — 26 — `pop`
  `b17+0.05` (elle reste toute la scène : c'est elle qui porte l'attribution).
- **Mention** : `LAUT PRESSE`. **Chaîne** : quatre ronds barrés. **Bulles** : aucune.
- **Affiche** : figer à `b17@الدوا+0.3`.

### S18 — 2016 : quatre enveloppes dans quatre boîtes aux lettres (le « tribunal », forme imposée)

- **Beat** b18 · 55,92 → 59,75 (3,8 s) · **Lieu** : un hall d'immeuble, de face · **Entrée** : `slideLeft`, 0,34 s,
  à `b18` + `bord`.
- **À comprendre** : en 2016, le tribunal envoie quatre lettres — une par médecin. Un Strafbefehl est une peine
  écrite, sans audience : le tribunal, ici, c'est le courrier.
- **Caméra** : `[{ at: "b18", s: 1.0, cx: 540, cy: 930 }, { at: "b18+0.1", s: 1.02, cx: 545, cy: 928, d: 1.7, ease: "lin" },
  { at: "b18@Strafbefehl-0.1", s: 1.12, cx: 575, cy: 850, d: 0.45 }]` ; `c.kick("b18@جلسة", 0.04)`.
  À ×1,12 les quatre boîtes vont de X 99 à X 894 : entières, et hors de la colonne des boutons.
- **Composition (monde)** : `D.hall` ; quatre `D.boiteLettres` (140 × 200), haut à y 760, centres x = 288, 456, 624,
  792 (porte-noms `1`, `2`, `3`, `4`) ; `D.applique` (180, 520) ; `D.interphone` (880, 700) ; `D.plante({ kind:
  "face" })` ancre (190, 1300) ; `D.paillasson` (540, 1332) ; `D.porteParapluies` ancre (835, 1300).
  Ordre des couches d'une boîte : `fond` → enveloppe → `face` → volet.
- **Construction en cascade** (relatif à `b18`) : `0.00` mur et sol · `0.05·i` les boîtes tombent (`"drop"`, dist 260,
  0,4 s) puis `m.pend` 2° · `0.10` applique (`"grow"`) · `0.15` plante (`"growY"`) · `0.20` paillasson (`"rise"`) ·
  `0.25` porte-parapluies (`"rise"`).
- **Les enveloppes** : `D.enveloppeJaune` à l'échelle 0,62 (118 × 67). À `b18@ربعة`, une toutes les 0,14 s : chute
  de (xᵢ, 500) à (xᵢ, 772) en 0,32 s (rot ± 8° → 0), le volet claque (`m.pend(…, 24°)`) puis repose entrouvert sur
  l'enveloppe ; elle reste coincée, visible de y 738 à 794.
- **Déroulé** : `b18+0.1` pastille 1 · `b18@ربعة` les quatre enveloppes · `b18@Strafbefehl` zoom (×1,12) ; `STRAFBEFEHL`
  (`.tw` 15) se frappe sur la partie visible de chaque enveloppe (0,3 s) ; pastille 2 à `b18@Strafbefehl+0.1` ·
  `b18@بلا` les quatre enveloppes frémissent (± 3°, 0,3 s) · `b18@جلسة` coup de zoom.
- **Vérité** : les boîtes aux lettres sont une illustration (un Strafbefehl arrive par la poste, dans une enveloppe
  jaune) ; aucun nom sur les boîtes, seulement les chiffres des mains.
- **Vie** : applique qui grésille, plante, parapluie, volets qui finissent de se balancer.
- **Textes** — pastille du haut :
  1. `Amtsgericht Lehrte · Juli 2016` / « المحكمة ديال Lehrte » — 28 — `pop` `b18+0.1`, `hide` `b18@Strafbefehl-0.15`
  2. `Strafbefehl` / « عقوبة مكتوبة بلا جلسة » — 34 — `pop` `b18@Strafbefehl+0.1`
- **Mention** : `LAUT PRESSE`. **Chaîne** : quatre ronds barrés. **Bulles** : aucune.
- **Affiche** : figer à `b18@عقوبة`.

### S19 — Quatre chaises, quatre étiquettes de prix (la « sanction », forme imposée)

- **Beat** b19 · 59,75 → 63,35 (3,6 s) · **Lieu** : le couloir du tribunal, de face · **Entrée** : `slideLeft`,
  0,34 s, à `b19` + `bord`.
- **À comprendre** : de 9 000 à 13 500 € chacun, pour homicide par négligence. La même fourchette pour les quatre :
  on ne sait pas qui devait payer combien.
- **Caméra** : `[{ at: "b19", s: 1.0, cx: 540, cy: 930 }, { at: "b19+0.1", s: 1.02, cx: 536, cy: 930, d: 3.4, ease: "lin" }]` ;
  `c.kick("b19@3", 0.05)`.
- **Couches** : mise en place « couloir » (sans la fiche au début, sans le ruban `§ 222 StGB` au début).
- **Construction en cascade** (relatif à `b19`) : `0.06·i` les chaises montent (`"rise"`, dist 220) · `0.20 + 0.06·i`
  un vêtement tombe sur chaque dossier (`D.blousePosee`, `"drop"`, dist 200) ; les jetons `1`…`4` se balancent.
- **Les étiquettes** : quatre `D.etiquette` (150 × 92) IDENTIQUES, nœud sur le bord avant de l'assise (xᵢ, 1132),
  corps de y 1160 à 1252 ; ligne 1 `9 000 –`, ligne 2 `13 500 €` (`.tw` 26). Elles tombent à partir de `b19@1`
  (0,10 s d'écart ; `m.pend` 16°, amorti).
- **Déroulé** : `b19@1` (« 9000 ») étiquettes + pastille 1 · `b19@3` (« 13500 ») sur les quatre étiquettes la ligne
  2 fait une double frappe (battement 1,15) ; coup de zoom · `b19@fahrlässige` un grand ruban d'étiqueteuse `§ 222 StGB` (`D.ruban`, lettres blanches en relief sur bande
  noire, 44 px de haut) se colle sur le mur, centre (700, 745), d'un coup de pouce (`pop` 0,25 s, écrasé de 6 %) —
  PAS de cadre « § » pendu à un clou : c'est la plaque du tribunal d'AKTE 04 (corrigé le 26.11.2026) ; pastille 2 · `b19@القتل` **la fiche du patient, en deuil**
  (`{ deuil: 1, grey: 1, blink: 0 }`, ×1,2), apparaît au mur (`fade` 0,4 s), centre (300, 745), pendue à une punaise,
  avec un halo blanc derrière elle (r 150, opacité 0,3) ; les manches des blouses frémissent.
- **Vérité** : quatre étiquettes IDENTIQUES (les montants individuels sont inconnus) ; ce sont des amendes proposées
  par écrit, pas une condamnation : le ruban et la suite (S20, S21) le disent.
- **Vie** : manches, jetons, étiquettes, fiche au mur (0,8°), un coin du ruban qui se décolle un peu (± 2°).
- **Textes** — pastille du haut :
  1. `9 000 – 13 500 € pro Arzt` / « من 9000 حتى 13500 أورو لكل طبيب » — 30 — `pop` `b19@1`, `hide` `b19@على`
  2. `fahrlässige Tötung · § 222 StGB` / « القتل غير العمد » — 30 — `pop` `b19@fahrlässige`
- **Mention** : `LAUT PRESSE`. **Chaîne** : quatre ronds barrés. **Bulles** : aucune.
- **Affiche** : figer à `b19@العمد`.

### S20 — « vorbestraft » : le tampon qui ne tombe pas

- **Beat** b20 · 63,35 → 66,69 (3,3 s) · **Lieu** : bureau C, plongée · **Entrée** : `slideLeft`, 0,34 s, à `b20` + `bord`.
- **À comprendre** : avec cette amende, ils AURAIENT eu un casier. Conditionnel : le tampon plane, il ne touche
  jamais le papier.
- **Caméra** : `[{ at: "b20", s: 1.0, cx: 540, cy: 900 }, { at: "b20+0.1", s: 1.02, cx: 540, cy: 905, d: 3.1, ease: "lin" }]` ;
  `c.kick("b20@vorbestraft", 0.05)`.
- **Composition (monde)** : quatre `D.casier` (230 × 150, `n` = 1…4) en deux rangées : centres (330, 730),
  (640, 730), (330, 930), (640, 930) ; l'emplacement du tampon de chaque fiche est à (+30, +30) de son centre :
  (360, 760), (670, 760), (360, 960), (670, 960) ; `D.encreur` (800, 1150) ; `D.tampon` au départ sur l'encreur ;
  `D.bande` à deux lignes, centre (500, 1272) : ligne 1 `„Damit wären die Beschuldigten vorbestraft."` (`.tw` 22,
  x 216–784, ligne de base y 1266), ligne 2 `— Gerichtssprecher` (`.tw` 18, calée à droite sur x 784, y 1294) ; sous
  la bande « بهادشي كانو غادي يوليو بالسوابق » (`ar strong` 28, centre (500, 1350)).
- **Construction en cascade** (relatif à `b20`) : `0.00` lampe, carrousel · `0.05 + 0.07·i` les quatre fiches
  tombent (`"drop"`, dist 220) · `0.25` l'encreur glisse depuis la droite · `0.30` → `0.90` la bande se frappe.
- **Le tampon** (`h` = hauteur ; il se déplace en 0,22 s, `E.inOut`, à `h` 1) :

  | Repère | Position du tampon | Ce qui se passe |
  |---|---|---|
  | `b20@كانو` | quitte l'encreur (`h` 0 → 1 : son ombre s'écarte) | dans la bande, le mot `wären` est souligné d'un trait d'encre (`wipe` 0,25 s) |
  | `b20@غادي` | au-dessus de (360, 760) | il descend (`h` 1 → 0,3 en 0,12 s), **s'arrête avant le papier**, remonte ; dans l'emplacement, `D.empreinte({ mot: "vorbestraft", plein: false })` apparaît en POINTILLÉ et clignote |
  | `b20@يوليو` | au-dessus de (670, 760) | idem |
  | `b20@vorbestraft` | au-dessus de (360, 960) | idem ; pastille 2 ; coup de zoom |
  | `b20@vorbestraft+0.3` | au-dessus de (670, 960) | idem |
  | `b20@عندهم` | revient planer au centre, à (500, 845) | il monte et descend sans fin (`h` 0,3 ↔ 1, période 0,8 s) ; les quatre empreintes en pointillé clignotent ensemble |

- **Vérité** : le tampon ne frappe JAMAIS ; les empreintes restent en pointillé ; la phrase est celle du porte-parole
  du tribunal (une seule source), au conditionnel dans le texte allemand lui-même.
- **Vie** : tampon qui plane, empreintes qui clignotent, chaînette, carrousel, halo.
- **Textes** — pastille du haut :
  1. `über 90 Tagessätze` / « كثر من 90 نهار ديال الغرامة » — 30 (arabe À VALIDER) — `pop` `b20@الغرامة`, `hide`
     `b20@vorbestraft-0.15`
  2. `vorbestraft` / « عندو سوابق » — 34 — `pop` `b20@vorbestraft`
- **Mention** : `LAUT PRESSE`. **Chaîne** : quatre ronds barrés. **Bulles** : aucune.
- **Affiche** : figer à `b20@سوابق`.

### S21 — Les quatre renvoient l'enveloppe : Einspruch

- **Beat** b21 · 66,69 → 68,82 (2,1 s) · **Lieu** : bureau C · **Entrée** : `cut` · **`summary: false`** (même geste
  que l'accroche).
- **À comprendre** : les quatre ont fait opposition — ils n'ont pas accepté. (On ne dit pas pourquoi.)
- **Caméra** : `[{ at: "b21", s: 1.0, cx: 540, cy: 900 }, { at: "b21+0.1", s: 1.02, cx: 540, cy: 900, d: 1.9, ease: "lin" }]` ;
  `c.kick("b21@Einspruch", 0.05)`.
- **État de départ** : bureau C de S20. À `b21`, en 0,25 s : les quatre fiches `Führungszeugnis` glissent en un tas
  (échelle 0,8) vers (250, 640) et leurs empreintes en pointillé s'effacent ; le tampon va planer au-dessus de son
  encreur (800, 1150), `h` 0,6 ; la bande de citation s'en va par le bas ; `D.corbeille` tombe au centre (500, 780)
  (`"drop"`, dist 240, 0,35 s) → x 350–650, y 675–885.
- **Mains et enveloppes** (`D.enveloppeJaune` à l'échelle 0,8 : 152 × 86, recto) — les mains entrent à `b21`
  (0,25 s, 0,05 s d'écart), chacune posée sur son enveloppe :

  | Main | Angle `a` | Paume au départ | Enveloppe au départ → dans la corbeille |
  |---|---|---|---|
  | `M1` | 0 | (500, 1120) | (500, 1085) → (500, 800), rot 4° |
  | `M2` | 90 | (240, 880) | (300, 880) → (470, 790), rot −9° |
  | `M3` | −90 | (800, 840) | (740, 840) → (535, 775), rot 11° |
  | `M4` | −145 | (735, 600) | (700, 640) → (510, 760), rot −4° |

- **Déroulé** : `b21@دارو` elles POUSSENT, l'une après l'autre (0,09 s d'écart, 0,25 s chacune) : les enveloppes
  glissent dans la corbeille et s'y empilent ; sur chacune, à l'arrivée, `EINSPRUCH` se frappe (`.tw` 22, 9 lettres
  en 0,15 s) ; chaque main recule de 60 px, `pose: "ouverte"` · `b21@Einspruch` pastille ; coup de zoom · `b21@قبلوش`
  les quatre mains se retirent (0,3 s) ; **le tampon se repose sur son encreur** (`h` 0,6 → 0 en 0,3 s) : la menace
  est suspendue.
- **Vie** : chaînette, carrousel, tampon qui plane, jetons.
- **Textes** — pastille du haut, **décalée à X 400** : `Einspruch` / « ما قبلوش » — 34 — `pop` `b21@Einspruch`.
- **Mention** : `LAUT PRESSE`. **Chaîne** : quatre ronds barrés. **Bulles** : aucune.

### S22 — 2017, l'audience : « chacun des quatre »

- **Beat** b22 · 68,82 → 71,76 (2,9 s) · **Lieu** : une petite salle d'audience, de face ; nous sommes assis à la
  table des quatre · **Entrée** : `slideLeft`, 0,34 s, `from: "b22-0.30"` + `bord`.
- **À comprendre** : en 2017 il y a bien une audience. Le juge dit — selon la presse — que chacun des quatre porte
  une responsabilité.
- **Caméra** : `[{ at: "b22-0.30", s: 1.0, cx: 540, cy: 930 }, { at: "b22", s: 1.02, cx: 540, cy: 932, d: 2.6, ease: "lin" }]` ;
  `c.kick("b22@مسؤول", 0.05)`.
- **Couches (arrière → avant)** : `D.salleAG` (lambris de y 900 à 1150, estrade : plateau à y 1150, contremarche
  jusqu'à 1168) · `D.fenetreLames` centre (215, 720) (x 140–290, y 590–850) + rai de lumière au sol + poussière ·
  `D.calendrier({ kind: "date" })` clou (850, 620) (x 790–910, y 620–780) · néon · **`RIC`** `pp(540, 1150, 0.9, …)`
  (sommet de la tête ≈ y 763) · `D.pupitreAG` ancre (540, 1150) (x 310–770, y 945–1150) avec, dessus, une pile de
  trois chemises (400, 941) et une lampe de bureau (700, 945) · bande de citation + ligne arabe · `D.tablePrevenus`
  (bord arrière à y 1180) · quatre rubans `JEDER` · les quatre mains · HUD.
- **Le juge** : `RIC`, de face, `outfit: "robe"`. Voir l'arc (§ 1.4). À `b22@كل` il ouvre les deux mains vers eux :
  `reachL: [-125, -250]`, `reachR: [125, -250]` (ses mains arrivent à (428, 925) et (652, 925), juste au-dessus du
  plateau du pupitre, à environ 90 px des épaules — à mesurer avec `Persona.util.rig`), `bendL: 1`, `bendR: -1`. Il parle (`talk`) de `b22@قال` à `b22@end`.
- **Les quatre mains au premier plan** : `D.main`, `a: 0`, `pose: "plat"`, à 0,78 × l'échelle de chacune, paumes
  (240, 1290), (420, 1290), (600, 1290), (780, 1290) dans l'ordre 1-2-3-4, jetons visibles. Elles montent sur la
  table à `b22@فالجلسة` (0,3 s, 0,05 s d'écart).
- **Déroulé** : `b22-0.30` construction : pupitre (`"rise"`, +0,05), fenêtre (`"grow"`, +0,10), calendrier
  (`"drop"` + `m.pend`, +0,15) · `b22` (« فـ2017 ») le grand `24` du calendrier fait un battement · `b22@فالجلسة`
  pastille ; les mains · `b22@القاضي` il lève les yeux du dossier · `b22@قال` il parle ; la bande se frappe (deux
  lignes, 0,5 s) · `b22@كل` il ouvre les mains ; ruban `JEDER` n° 1 (`pop`) ; `M1` se serre en poing · `b22@واحد`
  ruban n° 2 ; `M2` se fige (plus de respiration) · `b22@فيهم` ruban n° 3 ; `M3` tremble · `b22@مسؤول` ruban n° 4 ;
  `M4` recule de 12 px ; la ligne arabe s'écrit ; coup de zoom ; `RIC` hoche la tête.
- **Textes** :
  - pastille du haut : `Hauptverhandlung · 24.01.2017` / « الجلسة » — 28 — `pop` `b22@فالجلسة`, `hide` `b22@قال-0.1`
  - bande de citation (`D.bande`, deux lignes `.tw` 24, punaisée au mur au-dessus du juge) : `„jeder der vier Ärzte
    habe` (ligne de base y 596) / `Verantwortung zu tragen"` (y 628), x 353–727 ; dessous à droite `— laut Presse`
    (`.tw` 18, y 656) ; puis « كل واحد من الربعة مسؤول » (`ar strong` 34, centre (540, 712), `wipe` rtl à `b22@مسؤول`)
  - quatre rubans `JEDER` (`D.ruban`, `.tw` 16 : 77 × 30) collés sur la table, centres (xᵢ, 1200)
- **Vérité** : la phrase est rapportée au style indirect par UN titre de presse : pas de bulle, pas de « laut
  Urteil », le subjonctif `habe` est gardé, `— laut Presse` est obligatoire. Un seul juge, aucun assesseur, aucun
  emblème au mur. Les quatre médecins restent des mains.
- **Vie** : lames de la fenêtre, néon, poussière, respiration et clignements du juge, jetons, coin du calendrier.
- **Mention** : `LAUT PRESSE`. **Chaîne** : quatre ronds barrés. **Bulles** : aucune.
- **Affiche** : figer à `b22@مسؤول+0.2`.

### S23 — Le dossier se referme : eingestellt

- **Beat** b23 · 71,76 → 74,11 (2,4 s) · **Lieu** : le bureau du juge vu de dessus (bureau C) · **Entrée** : `cut`
  (insert en plongée).
- **À comprendre** : mais le dossier est classé — fermé sans jugement.
- **Caméra** : `[{ at: "b23", s: 1.0, cx: 540, cy: 900 }, { at: "b23+0.1", s: 1.02, cx: 536, cy: 905, d: 2.2, ease: "lin" }]` ;
  `c.kick("b23@تسد", 0.04)` ; `c.shake("b23@تسد", 5, 0.25)`.
- **Composition (monde)** : `D.dossier` (420 × 560) centre (455, 910) → x 245–665, y 630–1190, OUVERT au départ
  (couverture sur la tranche, à gauche) ; dedans : `D.brief` échelle 0,50, centre (485, 900) (tache jaune visible) ;
  pile des quatre enveloppes jaunes (échelle 0,5) vers (385, 1090) ; `D.fichePatient` (deuil, échelle 0,8) centre
  (330, 720). `D.formUrteil` (200 × 280) centre (760, 1000) → x 660–860, y 860–1140, VIERGE, un stylo posé dessus.
- **Main** : `MJ` (`a: -145`, `pose: "plat"`) descend du coin haut-droit et se pose sur la couverture refermée,
  paume (520, 820), à `b23@eingestellt+0.3` (0,3 s).
- **Déroulé** : `b23` le dossier ouvert, ses pièces · `b23@الملف` le dossier fait un battement (échelle 1,03) ·
  `b23@eingestellt` **la couverture se referme** (`ouvert` 1 → 0 en 0,4 s) sur la lettre, les enveloppes et le
  portrait ; sur son étiquette `eingestellt` se frappe (`.tw` 40, 11 lettres en 0,4 s) ; pastille 1 · `b23@تسد` la
  sangle élastique claque en travers (`sangle` 0 → 1 en 0,15 s) ; petite secousse · `b23@بلا` pastille 2 ; **le
  formulaire `URTEIL`, vierge, glisse hors du bureau** vers la droite (0,45 s, `E.in`), le stylo roule · `b23@حكم`
  `MJ` appuie une fois (`appui`).
- **Vérité** : aucun jugement n'a été écrit : le formulaire reste VIERGE et quitte l'image. Ne jamais écrire
  `verurteilt`, `schuldig`, ni un paragraphe de loi (aucun n'est cité par les sources).
- **Vie** : chaînette, carrousel, halo, respiration de la main.
- **Textes** — pastille du haut, **décalée à X 400** :
  1. `gegen Geldauflagen eingestellt` / « تسد بشرط الخلاص » — 28 (arabe À VALIDER) — `pop` `b23@eingestellt`, `hide`
     `b23@بلا-0.1`
  2. `keine Verurteilung` / « حتى واحد ما تحكم عليه » — 30 — `pop` `b23@بلا`
- **Mention** : `LAUT PRESSE`. **Chaîne** : quatre ronds barrés. **Bulles** : aucune.
- **Affiche** : figer à `b23@حكم`.

### S24 — 2 000 à 6 000 € pour une association… et la suite, on ne la connaît pas

- **Beats** b24–b25 · 74,11 → 78,61 (4,5 s) · **Lieu** : le couloir aux quatre chaises · **Entrée** : `slideLeft`,
  0,34 s, à `b24` + `bord`.
- **À comprendre** : à condition que chacun verse de 2 000 à 6 000 € à une association. Et on ne sait pas si c'est
  définitif : les bulletins restent en l'air.
- **Caméra** : `[{ at: "b24", s: 1.0, cx: 540, cy: 930 }, { at: "b24+0.1", s: 1.02, cx: 540, cy: 928, d: 4.3, ease: "lin" }]` ;
  `c.kick("b24@5", 0.04)`.
- **État de départ** : couloir de S19 — chaises, vêtements, jetons, étiquettes `9 000 –` / `13 500 €`, fiche du
  patient au mur ; PAS de ruban `§ 222 StGB` ; la maison n'est pas encore là.
- **Déroulé** :

  | Repère | Ce qui se passe |
  |---|---|
  | `b24+0.15` | un trait d'encre RAYE les deux lignes de chaque étiquette (`barre` 0 → 1 en 0,2 s, 0,06 s d'écart) |
  | `b24@واحد` | les quatre étiquettes se RETOURNENT (0,25 s, 0,08 s d'écart) : `2 000 –` / `6 000 €` — les quatre pareilles |
  | `b24@يخلص` | pastille 1 |
  | `b24@5` (« 2000 ») | pastille 2 ; coup de zoom ; à `b24@7` (« 6000 ») la ligne 2 des étiquettes fait un battement |
  | `b24@لجمعية` | `D.maisonAsso` pousse au mur (ancre (700, 845), `growY` 0,35 s) ; quatre `D.zahlschein` quittent les chaises (départ (xᵢ, 1150), un toutes les 0,10 s, vol de 0,9 s) vers la fente de la maison (700, 800), en arc (point de contrôle (xᵢ + 60, 930)) |
  | `b25` | **ils s'arrêtent tous au même instant, en l'air** (progression de chacun bloquée à sa valeur à `b25` : ≈ 54 %, 43 %, 32 %, 21 %) et flottent (± 4 px) ; le reste de chaque trajet se dessine en pointillé (`wipe` 0,3 s) ; pastille 2 `hide` |
  | `b25@عرفناش` | pastille 3 |
  | `b25@نهائي` | un grand `?` (`.tw` 80) `pop` à (520, 770), entre le portrait et la maison, puis `wobble` |

- **Vérité** : « doit payer », pas « a payé » ; à une association, jamais à une famille ni à l'État ; aucun nom
  d'association ; la même fourchette pour les quatre ; on ne sait pas si le classement est définitif.
- **Vie** : manches, jetons, étiquettes, bulletins qui flottent, fente de la maison qui bat, fiche au mur.
- **Textes** — pastille du haut :
  1. `Geldauflage` / « مبلغ خاصو يتخلص » — 32 — `pop` `b24@يخلص`, `hide` `b24@5-0.1`
  2. `2 000 – 6 000 € · gemeinnützige Einrichtung` / « من 2000 حتى 6000 أورو لجمعية » — 24 — `pop` `b24@5`, `hide` `b25`
  3. `ob endgültig: nicht veröffentlicht` / « ما معروفش واش نهائي » — 26 — `pop` `b25@عرفناش`
- **Mention** : `LAUT PRESSE`. **Chaîne** : quatre ronds barrés. **Bulles** : aucune.
- **Affiche** : figer à `b25@نهائي+0.2`.

### S25 — La règle (1) : une alvéole par semaine

- **Beat** b26 · 78,61 → 81,43 (2,8 s) · **Lieu** : TA page (le papier à points de la série, `k.bg()`) — plus de
  bureau : à partir d'ici c'est ta feuille et ta main · **Entrée** : `slideUp`, 0,34 s, `from: "b26-0.30"` +
  `bord(c, "haut")`.
- **À comprendre** : le méthotrexate contre un rhumatisme, c'est UNE fois par semaine.
- **Caméra** : `[{ at: "b26-0.30", s: 1.0, cx: 540, cy: 930 }, { at: "b26", s: 1.02, cx: 540, cy: 932, d: 2.5, ease: "lin" }]` ;
  `c.kick("b26@مرة", 0.05)`.
- **Composition (monde)** :

  | Élément | Position | Détail |
  |---|---|---|
  | carte du titre (`k.card(350, 575, 380, 120)`) + « القاعدة » (`ttl` 84, ligne de base (540, 664)) | y 575–695 | cadre d'encre, pas de jaune |
  | **`D.pilulier`** avec SEPT comprimés au départ | centre (510, 900) → x 160–860, y 815–985 | alvéoles : x = 216 + 98·i, y 910 |
  | `in der Onkologie: anders` (`.tw` 20) + « فـl'oncologie: حساب آخر » (`ar strong` 26 ; À VALIDER) | centres (330, 1035) et (330, 1080) | précision obligatoire |
  | `D.boiteMTX` | centre (330, 1200) → x 180–480, y 1125–1275 | inscription officielle, jour non rempli |
  | `D.bande` : `Rote-Hand-Brief 2019 · EMA 2019 · AkdÄ 2024 · KBV 2025` (`.tw` 18) | centre (500, 1318), x 192–808 | les sources de la règle |
  | `MT` (`a: 0`, `pose: "ouverte"`, jeton `نتا`) | paume (650, 1130) | entre du bas à `b26` |

- **Déroulé** : `b26` le titre s'écrit (`wipe` rtl, 0,4 s) ; la main `MT` monte (0,35 s) ; le 5e rond de la chaîne
  apparaît en pointillé · `b26+0.4` la bande des sources se frappe (0,5 s) · `b26@Methotrexat` la boîte glisse depuis
  la gauche (`"left"`, 0,35 s) · `b26@فالروماتيزم` pastille ; **six comprimés (Di…So) sautent hors de leur alvéole**,
  un toutes les 0,05 s, en arc jusqu'à la paume ouverte de `MT`, et disparaissent dessous · `b26@مرة` il n'en reste
  qu'UN, dans « Mo » : il fait un battement, son couvercle claque ; coup de zoom · `b26@فالسيمانة` la précision
  « Onkologie » apparaît (`fade` 0,3 s).
- **Vérité** : « une fois par semaine » vaut pour les maladies auto-immunes ; en cancérologie le rythme peut être
  quotidien : la ligne « Onkologie » reste jusqu'à la fin de la scène. Les textes cités datent d'après 2013 : ne rien
  écrire qui laisse croire que les quatre médecins les ont ignorés.
- **Vie** : comprimé qui respire, jeton `نتا`, respiration de la main, points du papier (dérive de caméra).
- **Textes** — pastille du haut : `bei Autoimmunerkrankungen: nur einmal wöchentlich` / « فالروماتيزم: مرة
  فالسيمانة » — 22 — `pop` `b26@فالروماتيزم`.
- **Mention** : `REGEL VON HEUTE · KEINE RECHTSBERATUNG`. **Chaîne** : + le 5e rond vide. **Bulles** : aucune.
- **Affiche** : figer à `b26@فالسيمانة`.

### S26 — La règle (2) : « einmal pro Woche », et le jour en toutes lettres

- **Beat** b27 · 81,43 → 83,68 (2,3 s) · **Lieu** : ta feuille, vue de très près · **Entrée** : `cut` (insert).
- **À comprendre** : écris « une fois par semaine », et le JOUR en toutes lettres ; pas un schéma « 1-0-0-0 ».
- **Caméra** : `[{ at: "b27", s: 1.0, cx: 540, cy: 940 }, { at: "b27+0.1", s: 1.02, cx: 540, cy: 944, d: 2.1, ease: "lin" }]` ;
  `c.kick("b27@Woche", 0.04)`.
- **Composition (monde)** — `k.bg()` + `D.briefMacro({ l1: 17, mot: "p" })` :

  | Ligne | Contenu | Position | Instant |
  |---|---|---|---|
  | 1 | `Methotrexat 15 mg` (déjà là) | x 170–741, ligne de base y 700 | — |
  | 2 | **`1 × pro Woche`** (`.tw` 72, frappé) | x 300–862, ligne de base y 840 | `b27@einmal`, 13 caractères en 0,55 s |
  | 2′ | « مرة فالسيمانة » (`ar strong` 40) | centre (700, 902) | `wipe` rtl à `b27@Woche` |
  | 3 | **`montags`** (Kalam 84, écrit À LA MAIN par `MT`) | x 460–760, ligne de base y 1010 | `wipe` 0,4 s à `b27@والنهار`, la pointe du stylo suit |
  | 3′ | « نهار الاثنين » (`ar strong` 40) | centre (610, 1070) | `wipe` rtl à `b27@بالحروف` |
  | 4 | `1-0-0-0` (`.tw` 56), puis RAYÉ | x 300–535, ligne de base y 1180 | `fade` 0,15 s à `b27@بالحروف+0.1` ; trait d'encre (`D.paraphe({ kind: "barre" })`, `wipe` 0,2 s) à `b27@بالحروف+0.3` |
  | 4′ | « ماشي هاكا » (`ar strong` 44) | centre (700, 1182) | `wipe` rtl à `b27@بالحروف+0.35` |
  | 5 | `D.bande` : `„Wochentag der Einnahme ungekürzt eintragen" — EMA 2019` (`.tw` 18) | centre (500, 1300), x 181–819 | se frappe de `b27+0.3` à `b27+0.9` |

- **Main** : `MT` (`a: 0`, `pose: "stylo"`, stylo `"bille"` ; pointe = paume + (−32, −102)). En attente à (620, 1210)
  dès `b27`. Elle écrit `montags` : paume de (492, 1112) à (792, 1112) ; puis raye `1-0-0-0` : paume de (332, 1267)
  à (567, 1267). Elle ne dépasse jamais x 843.
- **Vie** : curseur pendant la frappe de la ligne 2, papier qui tressaille, jeton `نتا`.
- **Vérité** : la consigne officielle du jour « en toutes lettres » porte sur la boîte, la carte du patient et le
  plan de médicaments (c'est un conseil pour la lettre, pas une obligation légale) : d'où la bande « EMA 2019 ».
  « 1-0-0-0 » n'est PAS dit à l'oral : écran seulement.
- **Textes** : pas de pastille du haut (tout est dans l'image, chaque ligne allemande a son arabe détaché dessous).
- **Mention** : `REGEL VON HEUTE · KEINE RECHTSBERATUNG`. **Chaîne** : 5e rond vide. **Bulles** : aucune.
- **Affiche** : figer à `b27@بالحروف+0.3`.

### S27 — La règle (3) : une dose que tu recopies ou que tu signes, tu la vérifies

- **Beat** b28 · 83,68 → 86,27 (2,6 s) · **Lieu** : ta page · **Entrée** : `cut`.
- **À comprendre** : avant de recopier, avant de signer : s'arrêter et vérifier. Pour les médecins ET pour les
  infirmières et infirmiers.
- **Caméra** : `[{ at: "b28", s: 1.0, cx: 540, cy: 930 }, { at: "b28+0.1", s: 1.02, cx: 536, cy: 934, d: 2.4, ease: "lin" }]` ;
  `c.kick("b28@راجعها", 0.05)`.
- **Composition (monde)** :

  | Élément | Position | Détail |
  |---|---|---|
  | `D.brief` — la BONNE lettre : `{ titre: 16, cadre: 1, lignes: 6, mtx: 17, freq: "p", points: 1, sig1: 0, sig2: 0 }` | centre (400, 930), échelle 0,70 → x 218–582, y 672–1188 | ligne de la dose à y ≈ 1008 ; trait de signature de droite à y ≈ 1133 |
  | `D.fiches3` | centre (750, 800) → x 640–860, y 648–952 | `Aufnahme`, `Verlegung`, `Entlassung` |
  | `D.planSoins({ kind: "mini" })` | centre (480, 1275) → x 250–710, y 1235–1315 | la ligne où l'on recopie |
  | flèche en pointillé (recopier) | `M519 1020 C 600 1100, 600 1180, 520 1238` | elle s'arrête à mi-chemin |
  | `D.loupe({ txt: "1 × pro Woche" })` | arrivée : centre (519, 1008) | couvre x 409–629, y 898–1118 |
  | coche `✓` (`D.paraphe({ kind: "coche" })`, 60 px) | (660, 960) | à droite de la loupe |

- **Main** : `MT` (`a: 0`, `pose: "stylo"`). `b28` : paume (560, 1240) (la pointe sur la ligne du mini-plan).
- **Déroulé** : `b28` construction : fiches (`"right"`, +0,05), mini-plan (`"rise"`, +0,10) ; la main entre ·
  `b28@dose` un crochet d'encre encadre la ligne de la dose sur la lettre (`D.paraphe({ kind: "boucle", w: 330,
  h: 40 })`, `wipe` 0,25 s) ; pastille · `b28@كتنقلها` la flèche en pointillé part de la dose vers le mini-plan… et
  **s'arrête à 50 %** ; la main se soulève (`leve` 0,6) ; fiche 1 active · `b28@ولا` fiche 2 active · `b28@كتسني` la
  main va au trait de signature (pointe en l'air au-dessus de (540, 1133)), **s'arrête** encore ; fiche 3 active ·
  `b28@راجعها` **la loupe glisse depuis la droite** (0,3 s) sur la ligne de la dose ; 0,25 s plus tard la coche `✓`
  se trace ; coup de zoom ; puis, à `b28@راجعها+0.5`, la flèche va jusqu'au bout et le paraphe se trace (`sig1`
  0 → 1 en 0,25 s) : maintenant seulement.
- **Vie** : loupe qui flotte, tirets de la flèche, jeton `نتا`, la fiche active qui avance de 14 px.
- **Textes** — pastille du haut : `Schnittstellen: Aufnahme · Verlegung · Entlassung` / « الدخول، التحويل،
  الخروج » — 22 — `pop` `b28@dose`.
- **Mention** : `REGEL VON HEUTE · KEINE RECHTSBERATUNG`. **Chaîne** : 5e rond vide. **Bulles** : aucune.
- **Affiche** : figer à `b28@راجعها+0.3`.

### S28 — Sois la main qui l'arrête

- **Beat** b29 · 86,27 → 89,68 (3,4 s) · **Lieu** : bureau A, version accroche (plateau, halo, lampe, coupelle ;
  pas de tasse) · **Entrée** : `cut`, `from: "b29-0.20"`.
- **À comprendre** : quatre mains l'ont laissée passer ; la cinquième — la tienne — l'arrête.
- **Caméra** : `[{ at: "b29-0.20", s: 1.0, cx: 540, cy: 900 }, { at: "b29@7-0.05", s: 1.06, cx: 470, cy: 920, d: 0.25 },
  { at: "b29@end-0.25", s: 1.0, cx: 540, cy: 940, d: 0.3 }]` ; `c.shake("b29@7", 12, 0.4)`.
- **La lettre** : la MAUVAISE (`{ freq: "t", nfreq: 7, points: 7, sig1: 1, sig2: 1, plis: 1 }`), échelle 0,60
  (312 × 441), rot 2°, y 900. Elle traverse l'image de droite à gauche à vitesse constante :
  x(t) = `lerp(1240, 330, prog(t, T("b29-0.20"), T("b29@7") − T("b29-0.20")))`, puis **s'arrête net** à x 330.
- **Les quatre mains fantômes** (opacité 0,35, tout en gris, jetons `1`…`4`), en haie de part et d'autre du
  trajet, dans l'ordre du passage :

  | Main | Angle `a` | Paume | Réaction |
  |---|---|---|---|
  | `M1` | 0 (du bas) | (700, 1140) | quand le centre de la lettre passe à moins de 90 px de son x : `leve` 0 → 1 → 0 en 0,5 s (elle la laisse passer) |
  | `M2` | 180 (du haut) | (610, 660) | idem |
  | `M3` | 0 | (500, 1140) | idem |
  | `M4` | 180 | (400, 660) | idem |

  (Avec le minutage provisoire : `M1` vers `b29@ما`, `M2` vers `b29@وقفوهاش`, `M3` vers `b29@كون`, `M4` vers
  `b29@نتا`. Les bras du haut sont permis ici : il n'y a ni pastille ni ruban dans cette scène.)
- **La cinquième main** : `MT` (`a: 0`, `pose: "plat"`, jeton `نتا`, opacité 1, trait épais) monte du bas à
  `b29@نتا` (`leve` 1, 0,2 s) et **s'abat à plat sur la lettre à `b29@7`** (« اليد »), paume (330, 930) : `leve`
  1 → 0 en 0,08 s, `appui` 1, secousse, huit petits traits de poussière autour de la main (ils s'écartent de 30 px et
  s'effacent en 0,3 s), les trombones de la coupelle sautent, le halo gagne 10 % pendant 0,2 s. La lettre ne bouge
  plus.
- **Fin** : à `b29@كتوقفها` la moufle glisse de 50 px vers le mot et le tapote (`appui`) : la boucle d'encre se trace
  autour de « täglich » (`cercle` 0 → 1 en 0,3 s), six des sept points jaunes s'éteignent (`points` 7 → 1, un toutes
  les 0,04 s) ; le 5e rond de la chaîne se remplit (`✓`) ; les quatre fantômes s'effacent (opacité 0,35 → 0,12).
  Dernière image, tenue jusqu'à `b29@end+0.15` : la main posée sur la feuille, le mot entouré, un seul point jaune.
- **Vie** : halo, poussière, jeton `نتا`, respiration de la main posée.
- **Textes** : aucun (pas de pastille) : la phrase est dans le sous-titre.
- **Mention** : aucune (pas de ruban : la scène n'affirme aucun fait). **Chaîne** : quatre ronds barrés + le 5e qui se remplit. **Bulles** : aucune.
- **Affiche** : dernière case ; figer à `b29@كتوقفها+0.3`.

### Affiche-résumé (socle `st.summary`, réglages de cet épisode)

- `st.flash("b29@end+0.15", 0.35, 0.85)` puis `st.summary({ at: "b29@end+0.15", in: "cut", dezoomAt: "b29@end+0.5",
  cols: 6, crop: [230, 1310], top: 372, gap: 10, side: 92, freezeAt: […] })`.
- **24 cases, 6 colonnes, 4 rangées** (cases de 132,7 px ; la grille va de y 372 à y 933). Scènes exclues
  (`summary: false`) : S3, S4 (intro), S10, S21. Ordre des cases (lecture de droite à gauche) et instant figé :

  | Case | Scène | `freezeAt` | Case | Scène | `freezeAt` |
  |---|---|---|---|---|---|
  | 1 | S1 | `b1@الأطباء+0.3` | 13 | S16 | `b16@end+3.0` |
  | 2 | S2 | `b3@وحدة+0.2` | 14 | S17 | `b17@الدوا+0.3` |
  | 3 | S5 | `b5@Lehrte+0.6` | 15 | S18 | `b18@عقوبة` |
  | 4 | S6 | `b7@آخر` | 16 | S19 | `b19@العمد` |
  | 5 | S7 | `b8@service` | 17 | S20 | `b20@سوابق` |
  | 6 | S8 | `b9@نهار+0.2` | 18 | S22 | `b22@مسؤول+0.2` |
  | 7 | S9 | `b10@شافتش` | 19 | S23 | `b23@حكم` |
  | 8 | S11 | `b12@شافتهاش` | 20 | S24 | `b25@نهائي+0.2` |
  | 9 | S12 | `b13@حتى` | 21 | S25 | `b26@فالسيمانة` |
  | 10 | S13 | `b14@dose` | 22 | S26 | `b27@بالحروف+0.3` |
  | 11 | S14 | `b15@الدم` | 23 | S27 | `b28@راجعها+0.3` |
  | 12 | S15 | `b16@جوج+0.1` | 24 | S28 | `b29@كتوقفها+0.3` |

- **En-tête** (entre x 90 et 990) : `k.ribbon("AKTE 06 · كلمة وحدة", 540, 312, { size: 36, w: 470 })` ;
  `k.chip("@dr.aguilo", null, 180, 312, 20)` ; teaser `k.chip("AKTE 07 · قريبا", null, 885, 312, 18, { yellow: true })`.
- **Carte « commentaire »** : `k.card(110, 960, 760, 300)` à `b29@end+2.7`. Question ÉCRITE (jamais dite), sur
  DEUX lignes (`ttl`, 47 px) : « واش عمرك سنيتي على ورقة » (centre (490, 1040), `wipe` rtl à `b29@end+2.8`) /
  « بلا ما تقراها كاملة؟ » (centre (490, 1100), à `b29@end+3.0`) ; « كتب ليا فالكومنتير » (`ar strong`, centre
  (490, 1185), à `b29@end+3.3`) ; flèche du socle vers le bouton commentaire à `b29@end+3.5`.
  Variante à choisir par l'auteur (elle parle aussi aux infirmières et infirmiers) : « واش عمرك نقلتي دوا » /
  « بلا ما تراجع la dose؟ ».
- **Statut, sous la carte** (deux rubans `D.ruban` + leur arabe, entre x 110 et 870, apparus à `b29@end+3.6` et
  `+3.8`) : ruban `VERFAHREN EINGESTELLT · KEINE VERURTEILUNG` (bord gauche x 110, Y 1284–1320) puis « تسد الملف بلا
  حكم » (`ar strong` 28, centre (490, 1356)) ; ruban `OB ENDGÜLTIG: NICHT VERÖFFENTLICHT · LAUT PRESSE`
  (Y 1378–1414) puis « ما معروفش واش نهائي » (centre (490, 1452)).
- La dernière scène finit en caméra `{ s: 1.0, cx: 540, cy: 940 }` : le saut vers l'affiche est couvert par l'éclair.

---

## 5. Les scènes imposées, dans la forme propre à cet épisode

| Scène imposée | Où | Forme propre à AKTE 06 | Ce qui la distingue des autres épisodes |
|---|---|---|---|
| **Accroche très travaillée** | S1–S3 (b1–b4, 10,6 s) | Bureau complet vu de dessus ; dès la 1re image : la lettre qui atterrit, le feuillet d'éphéméride daté qui se pose, le montant écrit ; quatre enveloppes jaunes qui jaillissent de SOUS la lettre vers quatre mains ; les mains qui tremblent puis repoussent ; l'insert « täglich » avec sept comprimés ; le relais des quatre mains | aucun visage : ce sont des mains qui jouent (se posent, tremblent, repoussent, laissent filer) ; 04 ouvre au tribunal, 05 sur une façade de nuit, 07 dans un téléphone, 08 sur une plaque, 09 sur une route |
| **Intro Yassine** | S4 (i1–i3) | Sa photo tenue par un trombone géant sur une chemise cartonnée posée sur le bureau ; anneau jaune, badge Instagram, « Yassine », `@dr.aguilo`, cœur + bouton animés sur `i3@j'aime` et `i3@abonne` ; logo du haut masqué ; bloc fini à Y ≤ 1299 ; `summary: false` | le trombone est l'objet de l'épisode (il tiendra la fiche du patient) |
| **Le médical en image** | S8 (le pilulier : 1 alvéole contre 7), S13 (sept fois la dose), S14 (l'usine de la moelle : trois tapis qui s'arrêtent) | schémas d'OBJETS (pilulier, usine imprimée sur une notice) ; aucune coupe dans un corps | AKTE 02 : utérus en coupe ; AKTE 03 : vaisseau ; 04 : loupe sur une tubulure ; 05 : appareil de mesure ; 09 : crâne |
| **Carte** | S5 (b5) et S10 (b11) | Carte dépliée sur le bureau ; Berlin en repère ; un médaillon-loupe « Region Hannover » ; épingle jaune sur Lehrte (nommée), puis la feuille pliée qui suit un pointillé jusqu'à une deuxième épingle SANS nom | pas d'ambulance (non sourcée) ; 04 : Rhin + cathédrale ; 05 : carte de nuit ; 07 : application ; 08 : arcs ; 09 : lac |
| **Scène muette du décès** | S16 (3,2 s après b16) | Le patient seul dans son lit (dessin dédié, de profil), sa dernière respiration, les feuilles mortes qui s'arrêtent derrière la vitre, le dernier feuillet du calendrier qui tombe, la couleur qui s'éteint ; « المريض ما عاشش · 79 عام » + la ligne de presse | ni famille, ni soignant, ni moniteur (rien dans les sources) : pas de bip, seulement le papier |
| **Tribunal** | S18 (b18) + S22 (b22) | Quatre enveloppes jaunes dans quatre boîtes aux lettres (la peine « sans audience ») ; puis l'audience vue depuis la table des quatre : un juge, quatre mains | ni balance, ni marteau, ni salle vue du fond, ni guichet, ni appel vidéo |
| **Sanction** | S19 (b19) + S24 (b24–b25), avec S20, S21, S23 | Quatre chaises vides, un vêtement de soignant sur chaque dossier, quatre étiquettes de prix IDENTIQUES : `9 000 – 13 500 €`, rayé, puis `2 000 – 6 000 €` ; des bulletins de paiement qui partent vers une association et s'arrêtent en l'air | aucun visage qui grimace (personne n'est condamné) ; l'argent ne va pas à une famille ; pas de billets |
| **Règle** | S25–S27 (b26–b28) + S28 (b29) | Sur TA page : le pilulier ramené à un comprimé ; « 1 × pro Woche » + « montags » écrit à la main, « 1-0-0-0 » rayé ; la loupe et la coche avant de recopier ou de signer ; puis ta main qui arrête la feuille | une carte-titre « القاعدة » + trois gestes, pas d'escalier ni de liste d'appel |
| **Affiche-résumé** | après b29 | 24 cases, 6 colonnes ; question écrite sur deux lignes ; `AKTE 07 · قريبا` ; deux rubans de statut | — |

---

<!-- REPERES:DEBUT -->
## 6. Repères utilisés

Les **296 repères** de ce document et de `son/plan_son.md` ont été extraits par script et résolus avec la logique du
moteur (`engine/runtime.js` : `parseCue` ; `serie/lib/stage.js` : `T`) sur `beats.js` + `timings.js` du 26.11.2026 :
**aucun repère manquant, aucun mot ambigu** (aucun texte visé n'est contenu dans deux mots du même beat sans être
écrit par son indice). Chaque mot existe tel quel dans `beats.js`. Les instants sont PROVISOIRES : ce sont les mots
qui comptent.

**Règles à garder quand la vraie voix arrivera**
- **Par indice** (le mot est un nombre, ou son texte est contenu dans un autre mot du beat) : `b1@5` (« لـ13500 ») · `b3@2` (« كل ») · `b4@8` (« يد ») · `b5@3` (« 2013 ») · `b7@3` (« 79 ») · `b12@5` (« ما ») · `b13@8` (« هو ») · `b19@1` (« 9000 ») · `b19@3` (« 13500 ») · `b24@5` (« 2000 ») · `b24@7` (« 6000 ») · `b29@7` (« اليد »).
  Pourquoi : `b4@8` et `b29@7` visent « يد » / « اليد », contenus dans « اليدين » qui vient AVANT dans la phrase ;
  `b3@2` vise le premier des deux « كل » ; `b12@5` et `b13@8` visent des mots très courts (« ما », « هو »). Si
  l'auteur ajoute, retire ou déplace un mot dans ces phrases, ces indices changent : les revérifier avec
  `tools/cuetimes.mjs`.
- **Jamais un nombre après « @ »** autrement que comme indice : « b19 @ 9000 » ou « b1 @ 13500 » feraient planter le
  moteur (« pas de mot n° 9000 »). Pour « فـ2016 » et « فـ2017 », premiers mots de leur beat, on écrit `b18` et `b22`.
- **Par mot** : le moteur prend le PREMIER mot du beat qui CONTIENT le texte (préfixes collés compris) : `b8@service` vise « الـservice. » ; `i3@j'aime` et `b12@l'admission` fonctionnent avec l'apostrophe ; « كل » est unique dans b9, b14 et b22 (`b9@كل`, `b14@كل`, `b22@كل`).
- **Scène muette** : tout est compté depuis `b16@end` (`+0.05` … `+3.0`) ; `quiet` = `b16@end+1.0`. Si le silence
  monté ne fait pas 3,2 s (`EXTRA` de `montage_voix.py`), ces décalages se compriment en proportion.
- **Débuts de scène avancés** : `i1-0.30`, `b5-0.30`, `b11-0.30`, `b22-0.30`, `b26-0.30` (0,30 s avant le beat : il
  faut au moins 0,35 s de pause avant ces beats, sinon réduire à −0,20), `b17-0.10`, `b29-0.20`.

**Tous les repères, beat par beat** (S = storyboard, P = plan son ; instant provisoire en secondes)

| Beat | Texte | Repères (instant) |
|---|---|---|
| b1 | ورقة وحدة جابت غرامة حتى لـ13500 أورو لربعة ديال الأطباء فألمانيا. | `b1@ورقة` 0,15 · `b1@ورقة+0.5` 0,65 · `b1@جابت` 0,72 (S, P) · `b1@5` 1,59 · `b1@لربعة` 2,30 (S, P) · `b1@الأطباء` 2,92 · `b1@الأطباء+0.3` 3,22 · `b1@فألمانيا` 3,35 (S, P) |
| b2 | وما قبلوهاش. | `b2` 3,93 (S, P) · `b2@قبلوهاش` 4,17 (S, P) · `b2@قبلوهاش+0.2` 4,37 |
| b3 | فالورقة، دوا «كل نهار» فبلاصة «كل سيمانة»: الفرق كلمة وحدة. | `b3` 4,71 · `b3+0.1` 4,81 · `b3@دوا` 5,14 · `b3@2` 5,38 (S, P) · `b3@نهار` 5,57 · `b3@فبلاصة` 5,86 (S, P) · `b3@سيمانة` 6,43 · `b3@الفرق` 6,82 · `b3@كلمة` 7,15 (S, P) · `b3@وحدة` 7,44 · `b3@وحدة+0.2` 7,64 |
| b4 | ودازت على ربعة ديال اليدين، وما وقفاتها حتى يد. | `b4` 7,83 · `b4+0.07` 7,91 (S, P) · `b4+0.45` 8,29 · `b4+0.50` 8,34 (S, P) · `b4@ربعة` 8,41 · `b4+0.85` 8,69 · `b4+0.90` 8,73 (S, P) · `b4+1.25` 9,09 · `b4+1.30` 9,13 (S, P) · `b4@وما` 9,37 · `b4+1.65` 9,48 (S, P) · `b4@وقفاتها` 9,61 · `b4@8` 10,27 · `b4@end` 10,47 (P) · `b4+2.95` 10,79 |
| i1 | أنا ياسين، طبيب فألمانيا. | `i1-0.30` 10,59 (S, P) · `i1-0.1` 10,79 · `i1-0.05` 10,84 · `i1` 10,89 (P) · `i1+0.05` 10,94 (S, P) · `i1@ياسين` 11,13 · `i1+0.3` 11,19 · `i1@ياسين+0.15` 11,28 · `i1@فألمانيا` 11,75 |
| i2 | فهاد السلسلة كنحكي ليكم قصص حقيقية من المحاكم الألمانية، باش نتعلمو منها. | `i2@حقيقية` 13,91 · `i2@حقيقية+0.15` 14,06 |
| i3 | إلا عجباتك، دير j'aime و abonne، باش ما تفوتكش القصة الجاية. | `i3-0.05` 16,40 · `i3+0.1` 16,55 · `i3+0.2` 16,65 · `i3@j'aime` 17,31 (S, P) · `i3@abonne` 17,80 |
| b5 | نتبعو هاد الورقة: 2013، سبيطار فمدينة Lehrte. | `b5-0.30` 19,83 (S, P) · `b5-0.1` 20,03 · `b5` 20,13 · `b5@الورقة` 20,70 · `b5@3` 21,08 (S, P) · `b5@سبيطار` 21,37 · `b5@Lehrte` 22,13 (S, P) · `b5@Lehrte+0.2` 22,33 · `b5@Lehrte+0.6` 22,73 |
| b6 | هي Entlassungsbrief، يعني ورقة الخروج، | `b6-0.05` 22,57 (S, P) · `b6` 22,62 · `b6+0.05` 22,67 (P) · `b6+0.1` 22,72 (S, P) · `b6@Entlassungsbrief` 22,81 (S, P) · `b6@يعني` 23,66 · `b6@الخروج` 24,23 |
| b7 | ديال مريض عندو 79 عام، غادي يحولوه لسبيطار آخر. | `b7-0.1` 24,62 · `b7` 24,72 (S, P) · `b7@مريض` 25,01 (S, P) · `b7@3` 25,59 (S, P) · `b7@يحولوه-0.15` 26,16 · `b7@يحولوه-0.1` 26,21 · `b7@يحولوه` 26,31 (S, P) · `b7@آخر` 27,12 |
| b8 | اليد الأولى: Stationsärztin، يعني طبيبة الـservice. | `b8` 27,47 (S, P) · `b8+0.1` 27,57 · `b8@الأولى` 27,75 · `b8+0.3` 27,77 (S, P) · `b8@Stationsärztin` 28,14 · `b8@service` 29,51 (S, P) |
| b9 | الدوا Methotrexat: كان خاصو مرة فالسيمانة، وكتباتو كل نهار. | `b9` 30,18 · `b9+0.1` 30,28 · `b9@Methotrexat` 30,52 (S, P) · `b9@Methotrexat+0.2` 30,72 · `b9@كان` 31,13 (S, P) · `b9@خاصو` 31,37 · `b9@مرة` 31,66 (S, P) · `b9@فالسيمانة` 31,90 · `b9@وكتباتو` 32,42 (S, P) · `b9@كل` 32,84 (S, P) · `b9@نهار` 33,04 · `b9@نهار+0.2` 33,24 · `b9@end` 33,33 (P) |
| b10 | اليد الثانية سنات عليها، وما شافتش الغلطة. | `b10` 33,44 (S, P) · `b10+0.1` 33,54 · `b10@الثانية` 33,73 (S, P) · `b10+0.3` 33,74 · `b10+0.35` 33,79 · `b10@الثانية+0.15` 33,88 · `b10@سنات` 34,15 (S, P) · `b10@سنات+0.2` 34,35 · `b10@وما` 34,77 · `b10@شافتش` 35,01 (S, P) · `b10@الغلطة` 35,35 (S, P) |
| b11 | الورقة مشات معاه للسبيطار الثاني. | `b11-0.30` 35,85 (S, P) · `b11` 36,15 (S, P) · `b11@مشات` 36,53 · `b11@معاه` 36,82 · `b11@للسبيطار` 37,10 · `b11@الثاني` 37,58 (S, P) |
| b12 | اليد الثالثة: الطبيبة ديال l'admission. ما شافتهاش. | `b12` 38,07 (S, P) · `b12@الثالثة` 38,35 · `b12@الثالثة+0.15` 38,50 · `b12@الطبيبة` 38,78 (S, P) · `b12@الطبيبة+0.1` 38,88 · `b12@الطبيبة+0.2` 38,98 (S, P) · `b12@الطبيبة+0.4` 39,18 · `b12@l'admission-0.1` 39,39 · `b12@l'admission` 39,49 (S, P) · `b12@5` 40,06 · `b12@شافتهاش` 40,26 (S, P) · `b12@شافتهاش+0.3` 40,55 |
| b13 | اليد الرابعة: Oberarzt، يعني الطبيب اللي فوقها. حتى هو. | `b13` 40,79 · `b13+0.1` 40,89 · `b13@الرابعة` 41,08 (S, P) · `b13@الرابعة+0.15` 41,23 · `b13@Oberarzt` 41,51 · `b13@الطبيب` 42,27 (S, P) · `b13@فوقها` 42,93 (S, P) · `b13@حتى` 43,27 · `b13@8` 43,51 (S, P) · `b13@8+0.2` 43,71 |
| b14 | وبجوج تبعو الورقة: كل نهار، سبع مرات la dose. | `b14` 43,81 (S, P) · `b14@تبعو` 44,15 (S, P) · `b14@كل` 44,82 (S, P) · `b14@نهار` 45,01 (S, P) · `b14@سبع-0.15` 45,15 · `b14@سبع` 45,30 · `b14@dose` 46,02 · `b14@end` 46,31 |
| b15 | والدوا إلا كثر كيضرب la moelle، المعمل ديال الدم. | `b15` 46,42 (S, P) · `b15+0.1` 46,52 · `b15+0.3` 46,72 · `b15@كثر` 47,04 (S, P) · `b15@كيضرب` 47,28 (S, P) · `b15@كيضرب+0.31` 47,59 · `b15@moelle` 47,81 · `b15@المعمل` 48,19 · `b15@الدم` 48,86 · `b15@end` 49,15 (S, P) |
| b16 | دازت سيمانة… جوج… تلاتة… | `b16` 49,26 · `b16@سيمانة-0.1` 49,44 · `b16@سيمانة` 49,54 (S, P) · `b16@جوج` 49,92 (S, P) · `b16@جوج+0.1` 50,02 · `b16@تلاتة` 50,16 (S, P) · `b16@end` 50,50 (S, P) · `b16@end+0.05` 50,55 · `b16@end+0.15` 50,65 · `b16@end+0.2` 50,70 (P) · `b16@end+1.0` 51,50 (S, P) · `b16@end+1.2` 51,70 (P) · `b16@end+1.3` 51,80 (P) · `b16@end+1.8` 52,30 (P) · `b16@end+2.4` 52,90 (P) · `b16@end+2.5` 53,00 (P) · `b16@end+2.6` 53,10 (P) · `b16@end+3.0` 53,50 |
| b17 | حسب النيابة والصحافة، السبب هو الدوا. | `b17-0.10` 53,71 (S, P) · `b17` 53,81 (S, P) · `b17+0.05` 53,86 · `b17@النيابة` 54,05 (S, P) · `b17@والصحافة` 54,48 (S, P) · `b17@السبب` 54,95 · `b17@الدوا` 55,48 (S, P) · `b17@الدوا+0.3` 55,78 |
| b18 | فـ2016، ربعة ديال الوراق من المحكمة: Strafbefehl، يعني عقوبة بلا جلسة. | `b18` 55,92 (S, P) · `b18+0.1` 56,02 · `b18@ربعة` 56,30 (S, P) · `b18@Strafbefehl-0.15` 57,73 · `b18@Strafbefehl-0.1` 57,78 · `b18@Strafbefehl` 57,88 · `b18@Strafbefehl+0.1` 57,98 · `b18@عقوبة` 58,78 · `b18@بلا` 59,11 (S, P) · `b18@جلسة` 59,35 |
| b19 | من 9000 حتى 13500 أورو، على fahrlässige Tötung: القتل غير العمد. | `b19` 59,75 (S, P) · `b19+0.1` 59,85 · `b19@1` 59,95 (S, P) · `b19+0.2` 59,95 (P) · `b19@3` 60,47 · `b19@على` 61,09 · `b19@fahrlässige` 61,34 (S, P) · `b19@القتل` 62,33 · `b19@العمد` 62,90 |
| b20 | وبهاد الغرامة كانو غادي يوليو vorbestraft، يعني عندهم سوابق. | `b20` 63,35 (S, P) · `b20+0.05` 63,40 (P) · `b20+0.1` 63,45 · `b20@الغرامة` 63,68 · `b20@كانو` 64,11 (S, P) · `b20@غادي` 64,40 · `b20@يوليو` 64,68 · `b20@vorbestraft-0.15` 64,87 · `b20@vorbestraft` 65,02 · `b20@vorbestraft+0.3` 65,32 · `b20@عندهم` 65,92 · `b20@سوابق` 66,25 |
| b21 | الربعة دارو Einspruch، يعني ما قبلوش. | `b21` 66,69 (S, P) · `b21+0.1` 66,79 · `b21@دارو` 67,08 (S, P) · `b21@Einspruch` 67,36 · `b21@قبلوش` 68,36 (S, P) |
| b22 | فـ2017، فالجلسة، القاضي قال: كل واحد فيهم مسؤول. | `b22-0.30` 68,82 (S, P) · `b22` 69,12 · `b22@فالجلسة` 69,50 (S, P) · `b22@القاضي` 69,92 · `b22@قال-0.1` 70,21 · `b22@قال` 70,31 · `b22@كل` 70,55 (S, P) · `b22@واحد` 70,74 · `b22@فيهم` 71,03 · `b22@مسؤول` 71,32 · `b22@مسؤول+0.2` 71,52 · `b22@end` 71,65 |
| b23 | ولكن الملف eingestellt، يعني تسد بلا حكم، | `b23` 71,76 (S, P) · `b23+0.1` 71,86 · `b23@الملف` 72,05 · `b23@eingestellt` 72,38 (S, P) · `b23@eingestellt+0.3` 72,68 · `b23@تسد` 73,28 (S, P) · `b23@بلا-0.1` 73,42 · `b23@بلا` 73,52 (S, P) · `b23@حكم` 73,76 |
| b24 | بشرط كل واحد يخلص من 2000 حتى 6000 أورو لجمعية. | `b24` 74,11 (S, P) · `b24+0.1` 74,21 · `b24+0.15` 74,26 (S, P) · `b24@واحد` 74,60 (S, P) · `b24@يخلص` 74,88 · `b24@5-0.1` 75,27 · `b24@5` 75,37 · `b24@7` 75,89 · `b24@لجمعية` 76,47 (S, P) |
| b25 | وما عرفناش واش هادشي نهائي. | `b25` 76,96 (S, P) · `b25@عرفناش` 77,20 · `b25@نهائي` 78,16 · `b25@نهائي+0.2` 78,36 |
| b26 | القاعدة: Methotrexat فالروماتيزم، مرة فالسيمانة. | `b26-0.30` 78,61 (S, P) · `b26` 78,91 · `b26+0.4` 79,31 · `b26@Methotrexat` 79,34 (S, P) · `b26@فالروماتيزم` 79,95 (S, P) · `b26@مرة` 80,56 (S, P) · `b26@فالسيمانة` 80,80 |
| b27 | كتبها «einmal pro Woche»، والنهار بالحروف. | `b27` 81,43 (S, P) · `b27+0.1` 81,53 · `b27+0.3` 81,73 · `b27@einmal` 81,77 (S, P) · `b27+0.9` 82,33 · `b27@Woche` 82,39 · `b27@والنهار` 82,72 (S, P) · `b27@بالحروف` 83,15 · `b27@بالحروف+0.1` 83,25 · `b27@بالحروف+0.3` 83,45 (S, P) · `b27@بالحروف+0.35` 83,50 · `b27@end` 83,57 (P) |
| b28 | وأي la dose كتنقلها ولا كتسني عليها، راجعها. | `b28` 83,68 · `b28+0.1` 83,78 · `b28@dose` 84,12 · `b28@كتنقلها` 84,41 (S, P) · `b28@ولا` 84,83 · `b28@كتسني` 85,08 · `b28@راجعها` 85,74 (S, P) · `b28@راجعها+0.3` 86,04 · `b28@راجعها+0.5` 86,24 (S, P) |
| b29 | ربعة ديال اليدين ما وقفوهاش. كون نتا اليد اللي كتوقفها. | `b29-0.20` 86,27 (S, P) · `b29@ما` 87,43 · `b29@وقفوهاش` 87,62 · `b29@كون` 88,05 · `b29@نتا` 88,29 · `b29@7-0.05` 88,48 · `b29@7` 88,53 (S, P) · `b29@كتوقفها` 89,11 (S, P) · `b29@end-0.25` 89,28 · `b29@كتوقفها+0.3` 89,41 · `b29@end+0.15` 89,68 (S, P) · `b29@end+0.5` 90,03 · `b29@end+2.7` 92,23 · `b29@end+2.8` 92,33 · `b29@end+3` 92,53 · `b29@end+3.0` 92,53 · `b29@end+3.3` 92,83 · `b29@end+3.5` 93,03 · `b29@end+3.6` 93,13 |

<!-- REPERES:FIN -->

---

## 7. Risques et solutions

| # | Risque | Où | Solution proposée |
|---|---|---|---|
| 1 | **Les mains vues de dessus sont un dessin dédié** (Persona ne sait pas les faire) : risque de mains « patates », de pouce du mauvais côté, de bras raide — c'est LE point qui peut faire « amateur » | toutes les scènes de bureau | Écrire `D.main` en premier et le valider seul sur une planche : 6 variantes × 6 poses × 6 angles (0, 90, −90, 180, −145, 145), à l'échelle 1 et 0,78. Règles : moufle (aucun doigt), pouce à gauche pour une main droite, ombre décalée, avant-bras qui sort toujours du cadre, jamais de bras qui flotte (une main qui pousse est POSÉE sur ce qu'elle pousse), entrée en 0,3 s avec `E.out`, respiration |
| 2 | **Aucun visage dans l'accroche** (le skill demande un personnage qui réagit) | S1–S3 | Le jeu passe par les mains : elles se posent, tremblent (`b1@فألمانيا`), se soulèvent, repoussent (`b2@قبلوهاش`), reculent. Si l'auteur veut un visage dès l'accroche : glisser la fiche du patient (vivant, qui cligne) sous le trombone de la lettre dès S1 — elle a sa place à (372, 600) sans rien déplacer. À lui de décider |
| 3 | **Un bras dans la colonne des boutons** (X > 915, Y 980–1650) | mains qui viennent de droite ou du bas | Règle fixe : bord droit → bande y ≤ 900 ; bas → x ≤ 840 (toutes les paumes de ce document la respectent : la plus à droite par le bas est (792, 1112) en S26). Contrôle sur la planche `--ig` |
| 4 | **Le bras de `M4` (et de `MJ`) passerait sous la pastille du haut** | S1, S3, S12, S13, S21, S23 | Angle −145° (coin haut-droit) + pastille décalée à X 400 (S12, S21, S23) ou X 360 (S13) ; en S1 et S3 la paume est assez à droite (x ≥ 748) pour que le bras passe à x > 816. Vérifier à la loupe que la pastille ne touche aucune manche |
| 5 | **Deux bras qui se croisent** | S12 (`M3` + `M4`), S13, S21 | S12 : `M3` attend au bord droit, paume (990, 860), pendant que `M4` travaille ; S13 : `M4` est sur la LETTRE (à gauche), `M3` sur le plan (à droite), 44 px entre les deux moufles ; S21 : quatre secteurs distincts. Planche image par image de `b13` à `b14@end` |
| 6 | **Personne allongée** (retours AKTE 03 : tête pivotée, corps déformés) | S15, S16 | `D.litGeriatrie` : profil dessiné pour être couché (front, nez vers le plafond, moustache, menton, œil fermé + cils, oreille, touffes blanches), cou court, épaule, couverture avec revers, bras posé, poitrine qui respire ; tête de la taille d'une tête Persona (r ≈ 54). Jamais `Persona.head` pivoté. Contrôle à ×2 sur une capture de S16 |
| 7 | **Police de machine à écrire absente du moteur** | tous les textes `.tw` | Classe `.tw` locale (Liberation Mono est installée sur la machine de rendu) + `D.frappe` caractère par caractère (largeur fixée à 0,6 × corps, donc aucun texte ne déborde si la police change). Capture de contrôle de S2 ; si la police tombe sur une police à empattements bizarres : repli sur Kalam gras avec `letter-spacing` 2 |
| 8 | **Du jaune ailleurs que sur les comprimés** (`k.ribbon`, `m.shapes`, `m.rays`, pastilles jaunes du gabarit, `SC.stamp` avec sa bande jaune) | scènes de l'histoire | Liste d'interdits dans les conventions ; `SC.stamp` n'est pas utilisé (les empreintes sont `D.empreinte`) ; contrôle par comptage des pixels jaunes (§ 3) |
| 9 | **Plans de bureau trop calmes** (mesure : ≥ 5 % des pixels changent en 0,4 s) | S2, S8, S20, S23, S26 surtout | Chaque scène a une action continue (frappe, chute de comprimés, tampon qui plane, main qui respire) + poussée de caméra + halo + poussière. Si `tools/mouvement.mjs` passe sous 5 % : augmenter la dérive de caméra (cx ± 14), faire respirer la feuille (échelle ± 0,6 %, 2,6 s), ajouter l'ombre du store sur les bureaux A et C |
| 10 | **Scènes très courtes** (S15 : 1,4 s ; S21 : 2,1 s ; S10 : 2,2 s) | — | Pas de grande cascade dans ces scènes (indiqué) ; S15 et S16 partagent la même mise en place ; si la vraie voix raccourcit b16, fusionner S15 dans S16 (les deux premiers feuillets tombent alors au début du plan rapproché) |
| 11 | **Textes denses** | S17 (pastille + bande + arabe), S20 (pastille + bande à deux lignes + arabe), S22 (pastille + bande + arabe + 4 rubans), S26 (5 lignes) | Positions calculées pour ne rien superposer ; `tools/overlapscan.mjs` sur toute la durée ; si un texte gêne : S20 → retirer la pastille « über 90 Tagessätze » ; S17 → retirer la bande (l'attribution reste dans la pastille) ; S26 → retirer la bande EMA |
| 12 | **Petits textes** (`STRAFBEFEHL` 15 px sur les enveloppes de S18, en-têtes du plan de soins 16 px, `gemeinnützig` 16 px) | S13, S18, S24 | Ce sont des textes d'ambiance, toujours doublés par une pastille ≥ 22 px avec son arabe ; ne pas les grossir (ils chevaucheraient) |
| 13 | **Affiche** : les cases reprennent le MONDE sans la caméra, recadré entre y 230 et 1310 ; un filtre posé sur le calque n'est pas recopié | S10 (exclue), S16, S13, S26 | Tout le contenu utile de chaque scène est entre y 540 et 1310 (le bas du pilulier de S13, à y 1300, passe juste) ; pour S16 le gris est AUSSI porté par les paramètres `grey` ; vérifier les 24 cases sur une capture à `b29@end+3` |
| 14 | **Vérité à l'image** | partout | Pilulier = schéma, sans compteur ; aucune main ne donne un comprimé ; deuxième main sans aucun signe de genre (ni bague, ni vernis, ni montre ; taille moyenne) ; deuxième épingle sans nom, placée de façon schématique ; calendrier sans date (sauf `24` janvier 2017, sourcé) ; tampon qui ne frappe jamais ; formulaire `URTEIL` vierge ; bulletins arrêtés en l'air ; aucun paragraphe de loi autre que `§ 222 StGB` (qualification citée par le dossier) ; `Staatsanwaltschaft Hildesheim` est une institution, pas une personne : autorisé |
| 15 | **Sensibilité** : la deuxième clinique est psychiatrique, le patient était dément | S11–S16 | Rien de cela à l'image : un bureau d'admission neutre, une chambre ordinaire, un vieil homme qui dort. Pas de barreaux, pas de contention (la barrière du lit est ABAISSÉE), pas de comportement joué |
| 16 | **Ressemblances** | — | Tête de `PAT` = mêmes paramètres que le juge d'AKTE 02 → la casquette est obligatoire sur la fiche ; trombone : aussi dans l'intro (voulu) ; étiquettes de prix : AKTE 08 en accroche sur des LETTRES, ici sur des CHAISES (forme imposée par la fiche) ; pas de pastille « 1 Wort » (AKTE 03) ; pas de tampon qui claque (AKTE 03) ; bulletins de papier et non billets (AKTE 02, 03, 05, 09) |
| 17 | **Transition `slideLeft`** : l'ancienne scène ne bouge pas, la nouvelle la recouvre ; le moteur n'a ni `slideRight` ni `slideDown` | 11 entrées | Le bord de feuille (`bord`) donne l'illusion d'une feuille qui glisse ; le relèvement de caméra vers la chambre se fait en `fade` (0,25 s), pas en glissement |
| 18 | **Coupes possibles** proposées à l'auteur : b20 (vorbestraft) puis b15 (la moelle) | S20, S14 | Si b20 est coupé : supprimer S20, garder la pastille `vorbestraft` + la bande du porte-parole dans S19 (à la place du cadre `§`, de `b19@القتل` à la fin) ; l'affiche passe à 23 cases. Si b15 est coupé : supprimer S14 ; 22 cases. Dans les deux cas garder 6 colonnes (dernière rangée incomplète) |
| 19 | **Indices de mots** (`bN@k`) et scène muette comptée depuis `b16@end` | § 6 | À revérifier avec `tools/cuetimes.mjs` dès que la vraie voix est montée ; si le silence ne fait pas 3,2 s, les décalages de S16 se compriment en proportion |
| 20 | **Redessins** : `D.brief` est redessiné à chaque caractère frappé | S6, S7 | Arrondir tous les paramètres (entiers pour `titre`, `lignes`, `mtx`, `nfreq` ; pas de 0,05 pour les autres) ; même graine → aucun scintillement du trait |
| 21 | **Photo de l'intro** | S4 | `assets/portrait.png` n'est jamais dans git ; la copier depuis AKTE 03 au moment du rendu ; si elle manque, l'anneau reste vide : le signaler, ne pas inventer un avatar |

---

## 8. Check-list de contrôle (pour celui qui construit)

**Avant d'écrire les scènes**
- [ ] `index.html` copié du gabarit ; classe `.tw` ajoutée ; `SV_CONFIG` inchangé (`hold: 5.6`, `capTr: false`) ;
      `glossaire-episode.js` rempli avec les mots allemands DITS (Entlassungsbrief, Stationsärztin, Methotrexat,
      Oberarzt, Strafbefehl, vorbestraft, Einspruch, eingestellt) et leur arabe du tableau du scénario.
- [ ] Planche des MAINS seule (risque 1) validée ; planche du patient allongé à ×2 ; planche de `D.brief` dans ses
      états (vierge, squelette, complète, pliée, bonne version).
- [ ] `node tools/errcheck.mjs videos/akte-lehrte-mtx/index.html 0 5 12 21 31 40 47 51 56 64 70 76 82 88 92` : aucune
      erreur, `SV.error` nul.
- [ ] `node tools/cuetimes.mjs videos/akte-lehrte-mtx/index.html` sur tous les repères du § 6 : aucun manquant.

**Planches avec la maquette Instagram**
- [ ] `node tools/planche.mjs videos/akte-lehrte-mtx --beats --ig` : sur chaque image — rien d'utile hors de X 90–990
      ni au-dessus de Y 250 ; rien sous Y 1470 sauf des avant-bras ; aucune main, aucun texte, aucun objet utile dans
      la colonne des boutons ; la pastille du haut ne touche ni un objet ni une manche ; le ruban de mention et la
      chaîne des mains lisibles sous le logo.
- [ ] Début de chaque scène image par image : `node tools/planche.mjs videos/akte-lehrte-mtx --from T --to T+1.2
      --step 0.1 --ig` pour T = 0 · 4,7 · 7,8 · 10,6 · 19,8 · 22,6 · 38,0 · 46,4 · 49,1 · 50,5 · 55,9 · 59,7 · 68,8 ·
      78,6 · 86,2 : le bord de feuille passe bien en tête de chaque `slideLeft` ; rien ne « saute » entre S6 → S7 → S9,
      S11 → S12 → S13, S15 → S16, S20 → S21 (mêmes états de part et d'autre de la coupe).
- [ ] Première image (t = 0) : la lettre, le feuillet daté, la pastille avec le montant et le ruban `LAUT PRESSE` sont
      visibles sans fondu.
- [ ] Intro : bas du bloc à Y ≤ 1300 ; logo du haut masqué ; pas de ruban ni de chaîne.
- [ ] Scène muette de `b16@end` à `b17` à 0,2 s de pas : la poitrine s'arrête, tout se fige, le feuillet tombe, la
      phrase est entière, sur du plancher nu, et rien ne la touche.

**Chevauchements**
- [ ] `node tools/overlapscan.mjs videos/akte-lehrte-mtx/index.html 0 95 0.1` : aucune paire de textes superposés
      (hors caractères d'un même mot frappé par `D.frappe` : les exclure par leur classe).
- [ ] À l'œil, sur les planches : aucun bras ne croise un autre bras ; aucune main sur le portrait du patient ;
      aucune ligne arabe touchée par un trait, un comprimé, une étiquette ou une main.

**Mouvement**
- [ ] `node tools/mouvement.mjs videos/akte-lehrte-mtx --min 5` : aucune scène « FIGÉ » (l'intro ne compte pas ; la
      fin de S16 est figée exprès : seul le feuillet bouge).

**Vérité et style**
- [ ] Comptage des pixels jaunes : seulement comprimés, enveloppes, épingles (+ intro et sous-titres).
- [ ] Aucun nom de personne ni d'hôpital ; boîtes aux lettres et interphone sans nom ; deuxième épingle sans nom.
- [ ] Les mots `verurteilt`, `schuldig`, « Ausgang offen », « laut Urteil », « nicht rechtskräftig » n'apparaissent
      nulle part ; `Urteil` seulement sur le formulaire vierge de S23.
- [ ] `M2` : aucun signe de genre. Aucun des quatre médecins n'apparaît autrement qu'en main.
- [ ] Le tampon ne touche jamais une fiche ; les bulletins s'arrêtent à `b25` ; le calendrier de la chambre n'a pas
      de date ; le pilulier n'a pas de compteur.
- [ ] `RIC` ne bouge les lèvres que de `b22@قال` à `b22@end` ; aucune bulle dans tout l'épisode.
- [ ] Affiche : 24 cases lisibles, grille finie avant la carte (y 933 < 960), question sur deux lignes, teaser
      `AKTE 07 · قريبا`, deux rubans de statut, rien dans la colonne des boutons.
- [ ] Les gloses arabes marquées « À VALIDER » (S14 : « بصفة عامة » ; S20 ; S23 ; S25) et les trois mots de la
      légende de S14 sont montrés à l'auteur avant le rendu.
