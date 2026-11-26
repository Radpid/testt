# AKTE 08 — « جوج حروف » (Düsseldorf, 2019) — STORYBOARD

Numéro 08 provisoire : `AKTE_NO = "08"`, `AKTE_NEXT = "09"`, `TITRE = "جوج حروف"`,
`QUESTION = "واش كنتي عارف هاد القاعدة؟"`.
Texte figé et relu : `scenario.md`, `beats.js` (21 beats + intro i1–i3), `timings.js` (minutage **provisoire**, 74,6 s).
Ce document se suffit à lui-même : celui qui construit `decor.js`, `story.js` et `index.html` n'a rien d'autre à décider.
Quand ce document et la fiche de `SAISON-2.md` se contredisent, **c'est ce document qui vaut** : il applique les
écarts imposés par `recherche.md` et par la relecture (`scenario.md`, « Écarts voulus ») —
**pas de guichet, pas de marteau, pas d'employée de la Kammer, pas de « 7 500 € la lettre », pas de plaque ni de
cachet attribués au médecin de l'affaire, pas de visage pour lui, pas de courrier « qui s'empile » (deux lettres
datées), l'ordre des dates (badge → 2009 → site → 2017 → 2019 → 2022), l'épingle sur Düsseldorf dès b2.**

## Conventions (valables pour tout le document)

**Deux repères.** Repère **monde** = repère de la caméra de la scène (1080 × 1920). Repère **écran** = calque `c.hud`
(fixe, jamais zoomé). Vue globale du gabarit, inchangée : `view: { s: 1.06, oy: -20, breathe: 0.04 }`, donc

    écran X = 540 + (x − cx) · S        écran Y = 940 + (y − cy) · S
    S = s · 1,06 · (1 → 1,04 du début à la fin de la scène) · (coup de zoom éventuel)

**Zones Instagram (écran)** : contenu utile entre X 90 et 990, Y 250 et 1470 ; rien d'utile dans X > 915 pour
Y 980–1650 ; rien sous Y 1630. Les sous-titres occupent Y ≈ 1490–1600.

**Une seule caméra de base : `AXE`** = `{ s: 1.0, cx: 540, cy: 930 }`. Toutes les scènes partent d'elle.

| Zone (caméra `AXE`, S de 1,06 à 1,10) | Monde | Écran |
|---|---|---|
| Zone d'action | x 150–930, y 545–1400 | X 127…110 → 953…970 ; Y 532…516 → 1438…1458 |
| Sous la pastille du haut : le monde doit être NU (mur, papier, bois uni) | x 235–845, y 380–535 | pastille : centre (540, 420), son arabe finit vers Y 500 |
| Sans pastille du haut, le monde peut monter jusqu'à | y 420 | Y ≈ 400 (sous la bande du HUD) |
| Colonne des boutons : **rien** (ni personnage, ni texte, ni objet, ni décor qui compte) | x > 870 dès que y ≥ 960 | X > 890…904 pour Y ≥ 972 |
| Symétrie : on laisse aussi vide le coin miroir, sauf mention | x < 210 dès que y ≥ 960 | — |

**Règle de l'axe (la grammaire de caméra de cet épisode).** `cx = 540` dans TOUTES les images-clés, sans exception :
la caméra ne se déplace jamais de côté. Ce sont les décors qui sont dessinés pour que le sujet soit sur l'axe (la carte
est placée pour que Düsseldorf tombe à x = 540). Seuls `s` et `cy` changent.

**Zooms secs.** Un zoom = une image-clé `{ at, s, cx: 540, cy, d: 0.14, ease: "out" }` (retour : `d: 0.16`). Jamais de
`d` > 0,2, jamais de `ease: "lin"`, jamais de travelling : la seule poussée continue est celle du socle (`breathe`
0,04). Niveaux utilisés : ×1,00 · ×1,10 · ×1,15 · ×1,20 · ×1,25 (maximum de l'épisode ×1,25, loin du plafond ×1,7 du
skill : ici ce sont les OBJETS qui frappent, pas la caméra).
Coups de zoom `c.kick` : 0,04 à 0,06. Chaque zoom de ce document a été vérifié : sujet entier, plaque entière, rien
qui entre sous la pastille du haut ni dans la colonne des boutons (les calculs sont donnés dans la scène).

**La frappe — transition signature.** Toutes les scènes entrent par `in: "cut", inDur: 0`. La coupe est « tapée »
par l'objet-héros de la nouvelle scène, qui tombe du haut et claque à sa place. À écrire une fois :

    const frappe = (c, m, node, at, o = {}) => {            // l'objet tombe, touche à l'instant `at`, rebondit
      const a = c.T(at);
      m.build(node, a - 0.124, "drop", { dist: o.dist || 620, dur: 0.34 });   // 1er contact = a (0,3636 × 0,34 s)
      if (o.amp !== 0) c.shake(a, o.amp || 11, 0.3);
      eclats(c, o.x, o.y, a);                               // 8 petits traits d'encre qui s'écartent (D.eclats, § 2)
      return a;                                             // instant du choc : y caler les pendules (m.pend) et le son
    };

**La coupe tombe SUR le choc** : quand `at` est le `from` de la scène, sa première image est celle où l'objet touche
sa place (il fait ensuite deux petits rebonds), l'image tremble et tout ce qui pend dans le décor repart
(`m.pend(n, choc, …)`). La scène est donc lisible dès sa première image, sans aucun fondu d'entrée.
Dans un même lieu (S8 → S9, S20 → S21) : coupe sèche, sans frappe du décor, mais avec la chute d'un nouvel objet.

**Le jaune = le laiton.** Cet épisode n'a pas de teinte : son seul jaune (#F8CE4E, matière `MAT.yellow`) est le
LAITON. Liste fermée de ce qui est jaune dans les scènes de l'histoire : les **plaques en laiton** (`D.plaque`,
`kind: "laiton"`), les **lettres-objets** « D », « r », « . » (`D.lettre`), et l'**épingle de la carte** (règle de
la série). Hors histoire : le hublot en laiton, le cœur et le bouton de l'intro ; le surligneur des sous-titres ; les
pastilles de l'affiche (socle). **Interdits dans les scènes de l'histoire** : `k.chip(…, { yellow: true })`,
`k.ribbon`, `k.marker`, `m.rays`, `m.shapes`, `st.vignette`, `SC.stamp` (sa bande est jaune) et toute lumière jaune
(les halos de lampe sont crème `#FFFDF2`). Toutes les pastilles sont GRISES. Les étiquettes de prix sont en papier
crème `#F3EFE4`, les tampons en encre `#1C1A1C`, les plaques des tribunaux en émail blanc.

**Pastille** = `k.chip(allemand, arabe, x, y, taille, { parent })` du gabarit (arabe détaché, contour papier, corps
arabe = max(26, 0,82 × taille)). **Pastille du haut** = pastille dans `c.hud`, centre écran (540, 420), UNE à la fois,
largeur ≤ 660 : aide `pastille(c, de, ar, at, until, o)` = `k.chip(de, ar, 540, 420, o.size || 30, { parent: c.hud })
.pop(at, 0.3)` puis `.hide(until, 0.15)` (ou `.show(at)` quand la scène l'indique : pas de fondu sur une première
image). Largeur d'une pastille : `max(120, nb de caractères × taille × 0,52 + 60)`.

**Textes.** Latin : classe `de` (Kalam 700), largeur ≈ 0,47 × corps par caractère (toutes les largeurs de ce document
sont calculées ainsi, puis à mesurer avec `getBBox`). Arabe : `ar strong` (Plex Arabic 700) ≥ 26 px sous une
pastille, ≥ 40 px pour une phrase (`ttl`, Lalezar), révélé de droite à gauche (`wipe(at, d, "rtl")`).
Tout texte arabe de ce document vient du tableau « Mots allemands à l'écran » de `scenario.md` ou d'une phrase de
`beats.js` ; les rares gloses ajoutées ici sont marquées **À VALIDER** (liste au § 7, risque 18).

**Repères.** Toujours entre accents graves : `b7@Berufsdoktorat+0.2`. Le moteur prend le PREMIER mot du beat qui
CONTIENT le texte ; un repère fait seulement de chiffres est lu comme un NUMÉRO de mot (indice à partir de 0). Donc
les nombres dits (15000, 2009, 2017, 2019, 60, 60, 2022) et les mots répétés s'écrivent par leur indice : `b1@3`,
`b10@1`, `b12@1`, `b13@1`, `b13@5`, `b13@8`, `b16@7`, `b3@3`, `b3@6`, `b7@8`, `b12@5`, `b12@6`, `b17@5`, `b17@7`,
`b19@4`. Liste complète et vérifiée par script : § 6.

**Aides à écrire une fois dans `story.js`** (en plus du socle du gabarit : `kit`, `drawDE`, `pinAt`, `pp`, `ph`,
`blinkAt`, `rnd`, `breathe`, `rl`) : `frappe(…)` et `eclats(…)` ci-dessus ; `pastille(…)` ; `mode(c, kind)` et
`reglette(c)` (HUD, § 3) ; `motDr(c, m, x, yBase, h, o)` (pose les trois lettres-objets « D », « r », « . » et
renvoie leurs nœuds, § 2 A2) ; `reflet(c, box, x, y, s, fn)` (le visage de « toi » reflété dans une plaque, § 1.2) ;
`pendre(c, m, node, pivot, at)` (= `m.pend(node, at, 9, pivot, { damp: 1.8, freq: 6, idle: 0.8 })`).
Dans chaque scène : `const k = kit(c); c_ = c; const m = M.of(c); k.bg();` puis le décor, `mode(c, …)`,
`reglette(c)` (scènes de l'affaire seulement), la caméra.

---

## 0. Direction en dix lignes

1. **Tournure : l'explication à la 2e personne.** On ne suit pas un personnage, on parle à « نتا ». Trois mondes
   étiquetés à l'écran par une petite plaque émaillée (HUD) : `Beispiel` (toi : plaque, cachet, diplôme),
   `Der Fall · laut Urteil` (l'affaire : badge, deux lettres, site, tribunal) et la règle (`Keine Rechtsberatung —
   frag deine Ärztekammer`). « Toi » a un visage ; le médecin de l'affaire n'en a JAMAIS (pictogramme gris ; au
   tribunal, la caméra est assise à SA place : on ne le voit pas).
2. **Dispositif signature : les lettres sont des OBJETS.** « D », « r » et le point sont trois pièces de laiton
   vissées : elles se vissent, portent une étiquette de prix à ficelle, tombent, claquent, se font tamponner, et
   finissent dans la corbeille. Leur double : les deux petites lettres « i » et « r » du badge « Dr. med. (ir) »,
   qui se détachent et tombent (S15). Le titre « جوج حروف » se VOIT deux fois.
3. **Grammaire de caméra : frontale, symétrique, sur un axe.** Chaque image est composée comme une enseigne : le
   sujet au centre (x = 540), les objets par paires de part et d'autre. `cx = 540` toujours ; zooms SECS (0,14 s),
   jamais de travelling. Très peu de personnages en pied (S6, S24, S29, et l'audience S19).
4. **Transition signature : la frappe** — `cut` + l'objet-héros qui tombe et claque + `c.shake` (0,3 s). 28 scènes
   sur 29 s'ouvrent ou se ponctuent par une frappe ; la seule exception est voulue (S26 : le cachet qui s'ARRÊTE en
   l'air). Pas de `swipe`, pas de `fade`, pas d'`iris`, pas de `slide`.
5. **Teinte : aucune.** Encre, papier, hachures grises ; le jaune est réservé au laiton (liste fermée ci-dessus).
   Reflets : une bande claire qui balaie le laiton toutes les 2,4 s, des étincelles blanches aux arêtes.
6. **Ton : vif, pédagogique, un peu ironique — l'ironie vise la règle, jamais l'homme.** Rythme de marche
   (clarinette, caisse claire aux balais) ; chaque deux-points du texte (« وأول حاجة: », « كتبات ليه: ») est un
   zoom sec ou une frappe. Une seule plage sobre : b15 (l'autre procès), sans percussion, sans effet.
7. **Typographie animée d'un bout à l'autre.** Presque chaque scène est faite d'un MOT posé sur un objet : plaque,
   étiquette à ficelle, tampon d'encre, lettre datée, badge, plaque de tribunal. Les citations réelles sont sur des
   feuilles (« laut Urteil »), jamais dans une bulle. Aucune bulle de parole dans l'épisode : personne ne parle.
8. **Vérité à l'écran.** `1. Instanz` et `nicht rechtskräftig` accompagnent TOUJOURS « 15.000 € » ; `laut Presse`
   sur la dénonciation et sur les 13 500 € ; `Rekonstruktion` sur l'audience ; `(ir) : Tatsache aus dem Urteil —
   keine Regel` chaque fois que « (ir) » est montré ; « (MA) » n'apparaît nulle part ; la peine maximale de la loi
   n'est écrite que dans la règle, sur la barre qui barre les plaques, étiquette `Gesetz`.
9. **Différent des cinq autres** : 04 = compteur à rouleaux, frise latérale, rembobinage ; 05 = hôpital en coupe,
   nuit bleue, caméra-ascenseur ; 06 = bureau vu de dessus, mains, pilulier ; 07 = écran de téléphone ; 09 = écran
   coupé en deux, tache d'encre. Ici : laiton, vis, plaques et étiquettes, cadrages d'enseigne, coupes tapées ;
   aucun compteur, aucune horloge, aucun moniteur médical, aucun lit, aucun patient, aucune vue de dessus, aucun
   téléphone (les comptes du réseau social sont des fiches cartonnées), pas de scène muette (aucun décès dans
   CETTE affaire).
10. **Différent d'AKTE 02 / 03** : pas de cellule, pas de bloc, pas de couloir d'hôpital, pas de coupe anatomique,
    pas de plaque « Im Namen des Volkes », pas d'étagère de livres de droit, pas de balance, pas de panneau
    indicateur, pas de scotch sur la bouche, pas de billets, pas d'ange. Le tribunal est le banc de l'Amtsgericht vu de
    face, plein axe, depuis la place de l'accusé (ni salle vue du fond ni dos : forme d'AKTE 05). Tous les dessins sont neufs (`window.EpDecor`) ; rien d'`UnnaDecor`.

---

## 1. Distribution

Comparée aux distributions existantes (AKTE 02 : femme enceinte cheveux longs foncés, homme brun barbe de trois
jours en pull, sage-femme âgée à chignon gris, juge à couronne grise et lunettes, expert gris barbu à lunettes ;
AKTE 03 : queue de cheval châtain sans lunettes, carré foncé à lunettes, vieux moustachu en blouse, patiente bouclée,
mari châtain barbu en veste, juge au carré gris, Chefarzt chauve à lunettes, infirmière blonde à chignon ; 04 : cheveux
courts châtains, juge chauve à barbe grise, homme bouclé foncé à lunettes ; 05 : boucles foncées à lunettes, blond à
barbe courte, juge gris rasé ; 06 : vieux à couronne et moustache, juge chauve rasé à lunettes ; 07 : blonde aux
cheveux longs, bouclé châtain mal rasé, juge au chignon foncé ; 09 : chignon foncé, garçon bouclé blond).

### 1.1 Personnages Persona (cinq)

| Nom | Rôle | Paramètres Persona EXACTS | Tenue par scène | Accessoire signature | Échelle |
|---|---|---|---|---|---|
| `TOI` | « نتا » : jeune médecin qui vient d'arriver du Maroc — figure générique (`Beispiel`), jamais le médecin de l'affaire | `{ look: "man", hair: "short", hairTone: "dark", beard: "none", glasses: false, seed: 801 }` | S6, S24 : `jacket` (veste claire ouverte sur un tee-shirt) · S29 : `coat` (blouse + stéthoscope, `badge: " "`) · S1, S10, S25 : tête seule (reflet, `Persona.head`) · S5, S11 : tête seule dans un médaillon | le **tube à diplôme** (`D.tube`) en bandoulière dans le dos (S6, S24) ; en S29, les deux lettres de laiton dans sa main | 1,05 (S6) · 1,0 (S24) · 1,05 (S29) · tête ×1,2 (S1), ×0,85 (S10, S25), ×0,72 (médaillon) |
| `KOL` | sa collègue, même diplôme (le public des deux sexes) — générique | `{ look: "woman", hair: "ponytail", hairTone: "dark", glasses: true, seed: 802 }` | S6, S24 : `sweater` · S29 : `coat` (`badge: " "`) | une **pochette à rabat** (`D.pochette`) serrée contre elle : son diplôme est dedans | 1,0 (S6) · 0,96 (S24) · 1,0 (S29) |
| `RIC` | le juge de l'Amtsgericht (un homme, il siège SEUL ; âge et apparence non sourcés → `Rekonstruktion`) | `{ look: "oldman", hair: "short", hairTone: "blond", beard: "short", glasses: false, outfit: "robe", seed: 806 }` (cheveux et barbe blancs) | robe, S19 seulement | la **feuille du jugement** qu'il tient puis pose | 0,80 (au fond, derrière son banc) |
| `STA` | la procureure (une femme) — figurante muette | `{ look: "woman", hair: "bob", hairTone: "blond", glasses: false, outfit: "robe", seed: 807 }` | robe, S19 | un dossier ouvert devant elle | 0,85 |
| `GRE` | la greffière (une femme) — figurante muette | `{ look: "oldwoman", hair: "shortcurly", hairTone: "blond", glasses: true, outfit: "sweater", seed: 808 }` (boucles blanches) | pull, S19 | son clavier : elle tape | 0,82 |

Différences contrôlées : `TOI` = cheveux courts foncés comme le mari d'AKTE 02, mais RASÉ, en veste claire, avec un
tube en bandoulière (jamais de pull, jamais de barbe) ; `KOL` = queue de cheval comme l'Assistenzärztin d'AKTE 03,
mais FONCÉE, avec des LUNETTES, en pull puis en blouse, et sa pochette (jamais de tenue de bloc) ; `RIC` = seul juge
à cheveux ET barbe blancs sans lunettes ; `STA` = seul carré blond ; `GRE` = seule vieille dame bouclée.

### 1.2 Le médecin de l'affaire : jamais un visage (dessins dédiés, § 2)

`recherche.md` § 11 : son apparence n'est sourcée nulle part → silhouette neutre, sans ressemblance, sans marqueur
d'origine. Il existe sous trois formes, et seulement celles-là :

| Forme | Dessin | Où | Détail |
|---|---|---|---|
| **Pictogramme** | `D.silhouette` : buste gris hachuré sans visage (rond + épaules), dans un médaillon rond | S2 (carte), S3 (entre ses deux diplômes), S11 (sur le globe), S12 (photo du badge), S14 et S15 (avatar des deux comptes, en-tête du site), S19 (sur son chevalet de table) | toujours le MÊME pictogramme : c'est « lui ». Jamais d'yeux, de bouche, de cheveux, de lunettes ni de barbe |
| **Son badge** | `D.badge` | S12, S15 | l'objet réel de l'affaire (« laut Urteil ») |
| **Sa place** | `D.platzschild({ text: "Angeklagter", picto: true })` : un chevalet de table émaillé qui porte le pictogramme | S19 seulement | la caméra est assise à sa place, derrière la table de la défense ; à côté, le chevalet `Verteidiger`. **Jamais de dos** (forme d'AKTE 05 et 09) |

**Le reflet de « toi »** (`reflet`) : dans S1, S10 et S25, le visage de `TOI` apparaît REFLÉTÉ dans la plaque de
laiton — `Persona.head` dans un groupe découpé à l'intérieur de la plaque (`c.clipped`), opacité 0,85, trois traits
blancs obliques par-dessus (le brillant), léger flottement (± 2 px, 2,6 rad/s). Le cou et le col sont coupés par le
bord de la plaque, comme dans un miroir : ce n'est pas un personnage coupé par le cadre. C'est le visage de
l'accroche (choc → panique → larme).

### 1.3 Qui parle (`talk`)

**Personne.** Aucun personnage ne bouge les lèvres : `talk: 0` partout, et **aucune bulle de parole** dans
l'épisode (le narrateur est une voix ; le juge ne dit rien : l'annexe du scénario l'exige — « pas de juge qui
parle »). `RIC` lit sa feuille en silence, puis la pose. Il n'y a pas non plus de bulle de pensée : l'envie de
« Dr. » de `TOI` se voit par les lettres de laiton qui sortent du mot « Doctorat » (S6).

### 1.4 Arc des expressions

| Personnage | Scène | Repère → expression (et jeu) |
|---|---|---|
| `TOI` (reflet) | S1 | `0` `bigsmile` + `blush` (fier de sa plaque), `look2: [-0.6, -0.2]` vers « Dr. » · `b1@3` `shock` (yeux ronds, il fixe l'étiquette, `look2: [-0.7, 0.3]`) · `b1@كتبتي` `worried` + `sweat` · `b1@سميتك` `look2: [-0.3, -0.5]` (il lit le pointillé) · `b1@فألمانيا` `sad` + `tears: 0.4` (une larme, pas des sanglots : « imagine ») |
| `TOI` (médaillon) | S5, S11 | S5 : `smile`, `look2: [0.5, -0.3]` (il regarde vers l'Allemagne), `bigsmile` à `b4@لألمانيا` · S11 : `calm`, puis `worried` à `b8@بحالك` (« comme toi »), regard vers l'autre médaillon |
| `TOI` | S6 | `b4@Doctorat` `smile`, regard sur son diplôme (`look2: [0, 0.7]`) · `b4@médecine` `bigsmile` · `b4@المغرب` regard vers le haut (`look2: [-0.3, -0.8]`), `blush` : il voit les lettres « Dr. » sortir du mot |
| `KOL` | S6 | `calm`, regarde le diplôme de `TOI` (`look2: [0.7, 0.4]`) · `b4@المغرب` `smile`, regarde les lettres |
| `TOI` (reflet) | S10 | `smile` · `b7@Dr` `shock` · `b7@Dr+0.25` `sad`, `look2: [0, 0.8]` (il regarde les lettres tombées) |
| `RIC` | S19 | `focused`, `look2: [0, 0.6]` (il lit) · `b13@عليه` il lève les yeux droit vers la caméra (`look2: [0, 0.1]`) · `b13@5` il pose la feuille, `neutral` |
| `STA` | S19 | `neutral`, regarde le juge · `b13@عليه` regarde vers la caméra (la place de l'accusé) |
| `GRE` | S19 | `focused`, `look2: [0, 0.7]` (son écran), clignements ; ses mains tapent |
| `TOI` | S24 | `b17-0.10` `calm` · `b17@Doctorat` `focused` (il montre son diplôme) · `b17@5` `shock` + petit sursaut (`lift` 14 px, 0,2 s) · `b17@7` `worried`, regard vers la plaque de droite · `b17@med` `sad`, épaules qui tombent (`torsoLean: 3`) |
| `KOL` | S24 | `calm`, regarde le diplôme · `b17@5` `worried` · `b17@7` `shock` + sursaut · `b17@med` `sad`, regarde `TOI` |
| `TOI` (reflet) | S25 | `worried`, le regard passe de gauche à droite (`look2: [±0.7, 0.4]`, période 1,2 s : il regarde un tribunal puis l'autre) · `b18@تفاهموش` `shock` 0,3 s puis `worried` |
| `TOI` | S29 | `b21-0.30` `calm`, regard vers la plaque (haut) · `b21@طبيب` `smile` · `b21@ديالك` `bigsmile`, main sur le cœur · `b21@ماشي` `focused`, il regarde les deux lettres dans sa main · `b21@حروف` `bigsmile` : il les jette par-dessus son épaule |
| `KOL` | S29 | `smile` · `b21@ديالك` `bigsmile` · `b21@حروف` `bigsmile` + `blush`, petit saut des épaules (elle rit, bouche fermée : `mouth: "grin"`) |

Tous les personnages vivent : `blink: rnd(blinkAt(t, n))`, respiration `on(breathe(n))`, regard qui bouge, mains
qui agissent (tenir, montrer, taper, jeter). Marche : aucune (personne ne traverse l'image : pas de glissement).

---

## 2. Inventaire des décors et objets à dessiner (`decor.js` → `window.EpDecor = D`)

Convention du gabarit : chaque fonction `D.nom(g, o)` dessine dans `g` autour de son ancrage (0, 0), reçoit ses
paramètres animés dans `o` (valeurs arrondies) et peut renvoyer des ancres lues dans `node.out`. Trait à main levée :
`U.ctx` + `U.shape` / `U.stroke` ; chaque objet a son ombre décalée (`#CDCDC6`, 6–9 px) et des détails, jamais une
forme nue. Les objets sont posés avec `m.obj(D.nom, x, y, s, o)` (statiques) ou `c.sk((g, p) => D.nom(g, p), fn, x, y, s)`
(redessinés quand `o` change). **Aucun dessin n'est repris d'un autre épisode.** 76 fonctions de dessin, classées par famille.

Matières : laiton = `MAT.yellow` ; émail = `MAT.white` + double filet d'encre ; pierre et carton = `MAT.grey` /
`MAT.light` ; bois = `MAT.wood` ; papier `#FFFFFF`, papier crème des étiquettes `#F3EFE4` ; acier des vis `#E1E1DC` ;
« gribouillis » = lignes de texte illisibles, gris `#B9B9B2`, 2 px, longueurs variées (graine fixe).

### A. Le laiton, les lettres, les étiquettes, les tampons (objets signature)

| Nom | Dessin | Taille · ancrage | Parties mobiles | Scènes |
|---|---|---|---|---|
| **`D.plaque(g, o)`** | Plaque de porte vissée. `kind: "laiton"` : corps `MAT.yellow` (hachures à −41°), filet gravé intérieur à 14 px (`#B88A1E`, 2 px), ombre (7, 9). `kind: "email"` : corps blanc, double filet d'encre (plaques des tribunaux, plaquettes). Vis d'acier aux coins (rayon = max(7 ; 0,045 h), fente tournée de `vis`°) : 4 vis, ou 2 (`nVis: 2`, au milieu des petits côtés). `lignes: [{ t, x, y, size, n }]` = textes GRAVÉS (encre + doublure claire `#FFF3C4` décalée de 1,5 px), `n` = nombre de caractères déjà gravés. `points: { x0, y, n, pas, onde }` = le NOM en pointillé : `n` points gravés (rayon 0,16 × pas) ; le point n° ⌊onde⌋ est 1,6 × plus gros et plein d'encre (onde qui court). `trous: [[x, y], …]` = trous de vis vides (`#3A3A37`, r 4). `fantome` 0…1 = trace plus claire (`#FFE9A0`) des lettres « D r . » là où elles étaient. `reflet` 0…1 = bande blanche oblique (26 px, opacité 0,35, découpée par la plaque) à x = lerp(−w/2 − 60, w/2 + 60, reflet) | ancrage = centre. Formats : **XL** 680 × 480 (S1) · **M** 520 × 190 (S10, S25) · **S** 330 × 130 (S24, deux fois) · **porte** 520 × 200 (S29) · **Yassine** 420 × 120 (S4) · **étau** 200 × 84 (S7, S26) · émail : 480 × 56 (S23), 300 × 84 et 260 × 84 (S25), 470 × 120 et 220 × 54 (S20), 210 × 70 (S27), 620 × 40 (affiche). Renvoie `{ coins, bord }` | `vis` (les vis tournent : 360° en 0,3 s à la pose, −360° au dévissage) · `reflet` (cycle de 2,4 s : 0 → 1 en 0,7 s puis pause) · `points.onde` · `lignes[i].n` (gravure lettre par lettre) · le nœud entier (`frappe`, `m.pend`) | S1, S4, S10, S20, S23, S24, S25, S29 |
| **`D.lettre(g, o)`** | Lettre-OBJET en laiton, découpée dans une tôle épaisse. `ch: "D" \| "r" \| "."`. Contours (unité : h = 100, origine en bas à gauche de la lettre, y vers le haut négatif) — **D** (largeur 84) : `M0 -100 L38 -100 C68 -100 84 -78 84 -50 C84 -22 68 0 38 0 L0 0 Z` + contre-forme `M24 -78 L38 -78 C52 -78 60 -66 60 -50 C60 -34 52 -22 38 -22 L24 -22 Z` (`fill-rule: evenodd`) ; **r** (largeur 56, hauteur 68) : `M0 -68 L24 -68 L24 -56 C30 -65 40 -70 56 -68 L56 -44 C44 -48 30 -46 24 -34 L24 0 L0 0 Z` ; **.** (24 × 24) : carré arrondi (r 4) posé sur la ligne. Tranche : le même contour décalé de (5, 6) × h/100, `#B88A1E`, trait 2 (dessiné dessous) ; face `MAT.yellow`, trait 3 ; arête claire : trait blanc 2 px sur les bords haut et gauche ; deux vis de fixation (acier, r 0,05 h, fente tournée de `vis`°) sur le fût — D : (−0,30 h ; −0,86 h) et (−0,30 h ; −0,14 h) ; r : (−0,16 h ; −0,58 h) et (−0,16 h ; −0,10 h) ; point : une vis au centre | ancrage = milieu de la ligne de base (le contour est recentré de −largeur/2). Hauteurs utilisées : 120 (S1) · 60 (S6) · 90 puis 70 (S8, S9) · 70 (S10, S25) · 200 (S20) · 170 (S21) · 220 (S23) · 64 (S24) · 46 (S29, dans la main) · 28 (sur `D.chemise`). Renvoie `{ w, crochet, haut }` — `crochet` (où passe une ficelle) : D (0,10 h ; −h), r (0,20 h ; −0,66 h) | le nœud entier : chute (`frappe`), rebond, rotation, `m.pend` ; `vis` ; battement (`pulse`) sur le mot « Dr. » | S1, S6, S8, S9, S10, S20, S21, S22, S23, S24, S25, S29 |
| `motDr(c, m, x, yBase, h, o)` (aide de `story.js`) | Pose « D », « r », « . » à la suite depuis le bord gauche `x` : centre du D à x + 0,42 h ; du r à x + 1,24 h ; du point à x + 1,74 h ; largeur totale 1,86 h (`o.point: false` : sans le point, 1,52 h). Renvoie `{ D, r, pt }` (trois nœuds indépendants) | — | chaque lettre s'anime seule | partout où « Dr. » est en relief |
| **`D.etiquette(g, o)`** | Étiquette de prix à ficelle. Corps : rectangle `w × h` aux deux coins du haut coupés, papier crème `#F3EFE4`, trait 3, ombre ; œillet (rond blanc r 9, trait 2,5) cerclé d'un renfort `#E1E1DC` (r 15) ; ficelle d'encre 2,5 px, légèrement courbe : UNE ficelle (`ecart: 0`) ou DEUX en « V » depuis (−ecart, 0) et (+ecart, 0) jusqu'à l'œillet (0, `L`). Textes : `l1` (Kalam, corps `s1`) centré, `l2` (corps `s2`) dessous, `ar` (Plex Arabic 700, corps `sAr`) dessous. `gris` 0…1 : le papier passe à `#E6E6E1`, les textes à `#77776F`. `casse` 0…1 : la ficelle se rompt (deux bouts qui pendent) | ancrage = (0, 0) = milieu des points d'accroche = pivot du balancement ; le corps va de y = L − 14 à L − 14 + h. Formats : 330 × 160 (S1) · 300 × 140 (S3) · 290 × 140 et 260 × 140 (S20) · 360 × 190 (S21) · 180 × 110 (S23) · 250 × 84 (S18) · 330 × 84 (S2) | `m.pend` autour de l'ancrage (monde) ; `casse` ; chute ; `gris` ; battement sur le montant | S1, S2, S3, S18, S20, S21, S23 |
| **`D.empreinte(g, o)`** | Empreinte de tampon à l'ENCRE (jamais rouge) : double cadre arrondi (extérieur 5 px, intérieur 2 px), texte Kalam 700 (`text`, corps `size`), sous-ligne éventuelle (`sub`), opacité 0,92, pas de fond (ce qui est dessous reste visible), six petits manques couleur papier (graine fixe) pour l'effet tamponné ; `rot` | ancrage = centre ; taille `w × h` donnée dans la scène | arrive par `node.slam(at, 0.28, amp)` (elle arrive en grand et frappe) | S3, S9, S13, S16, S17, S18, S21, S23, S24 |
| `D.tampon(g, o)` | Le cachet (l'objet) : pommeau et col en bois (`MAT.wood`), virole grise, semelle de caoutchouc sombre 220 × 70 ; ombre elliptique sur le papier, qui rétrécit quand il monte | 220 × 250 · ancrage = centre de la face encrée | `leve` (hauteur) ; tenu par `D.main` | S7, S26 |
| `D.barre(g, o)` | La barre qui barre : bande d'encre pleine 380 × 54 aux bords irréguliers, texte blanc `§ 132a StGB` (Kalam 34) | ancrage = centre ; `rot` −16° | `slam` | S24 |
| **`D.silhouette(g, o)`** | Le médecin de l'affaire, SANS visage : médaillon rond blanc (rayon `r`, anneau d'encre 3 px, ombre) ; dedans un buste `MAT.sil` (gris hachuré, trait `#6E6E68`) : tête = rond de 0,30 r centré à (0 ; −0,18 r), épaules = arc large de 1,3 r de y 0,2 r à 0,8 r, découpé par le médaillon. Ni yeux, ni bouche, ni cheveux. `cadre: "rond" \| "aucun"` (sans médaillon, pour le badge) | ancrage = centre. r 62 (S2) · 56 (S3) · 50 (S11) · 44 et 30 (S14, S15) · 22 (en-tête du site) | `pop` ; léger balancement quand il pend | S2, S3, S11, S12, S14, S15, S17 |
| `D.eclats(g, o)` | Huit petits traits d'encre (3 px, 16 px de long) autour d'un point de choc, répartis sur le demi-cercle du haut et les côtés ; `p` 0…1 : ils s'écartent de 24 à 80 px et s'effacent | ancrage = point de choc | `p` (0,25 s) | toutes les frappes |
| `D.plaquette(g, o)`, `D.reglette(g, o)` | HUD : voir § 3 | — | — | — |

### B. La façade (S1), la porte de l'intro (S4), la porte du bureau (S29)

| Nom | Dessin | Taille · ancrage | Parties mobiles | Scènes |
|---|---|---|---|---|
| `D.facade(g, o)` | Mur de façade en pierre de taille, plein cadre (x 40–1040, y 250–1470) : assises de 150 px depuis y 280, joints verticaux décalés tous les 260 px (`#C9C6BC`, 2,5 px), quatre pierres légèrement hachurées ; **corniche** = dalle saillante de y 1160 à 1190 (x 110–960) avec son ombre ; soubassement plus sombre (`MAT.grey`) de 1190 à 1470 | plein cadre, ancrage (0, 0) | aucune (la vie vient des objets posés dessus) | S1 |
| `D.lanterne(g, o)` | Applique : platine murale 20 × 60, bras en col de cygne (50 px), lanterne hexagonale 56 × 84 (cage d'encre, verre blanc, ampoule) ; halo CRÈME (`#FFFDF2`, ellipse 150 × 120, opacité 0,25 × `halo`) | ancrage = centre de la platine ; `cote: ±1` | la lanterne (nœud séparé) : `m.pend` autour du bout du bras ; `halo` qui frémit (0,9–1) | S1 |
| `D.niveau(g, o)` | Niveau à bulle posé sur la corniche : règle 230 × 34 (`MAT.light`), fiole centrale, bulle décalée de `bulle` × 14 px | ancrage = centre du bas | `bulle` (−1…1) : oscille, sursaute aux chocs | S1 |
| `D.carton(g, o)` | La boîte du graveur : carton ouvert 200 × 90, papier de soie qui dépasse, étiquette `Schilder · Stempel` (Kalam 18 — deux noms communs, pas une enseigne) | ancrage = centre du bas | rabat qui frémit (`m.sway` 1,5°) | S1 |
| **`D.main(g, o)`** | Avant-bras + moufle vus de face, qui ENTRENT PAR LE BAS du cadre. Moufle arrondie 64 × 78, pouce du côté du corps, peau blanche, trait 3 ; manche de 70 px de large avec poignet (`manche: "veste" \| "chemise"`), longue de `L` px (elle sort toujours du cadre) ; `a` = angle de l'avant-bras (0 = vertical). `tient: "tournevis" \| "tampon" \| "stylo" \| null` : l'outil est dessiné dans le poing (tournevis : manche 90 px + tige 110 px) ; `serre` 0…1 (main fermée → ouverte) | ancrage = centre de la paume ; renvoie `{ pointe }` (bout de l'outil) | translation, rotation de 2–4° (elle travaille), `serre`, tremblement | S1, S7, S13, S26, S27 |
| `D.tournevis(g, o)` | Le tournevis seul (200 px), pour sa chute | ancrage = centre | chute + rotation + roulis de 30 px | S1 |
| `D.porteIntro(g, o)` | Porte d'entrée vue de face : dormant de 18 px, vantail en bois (`MAT.wood`) de 600 × 1100 à deux panneaux moulurés en bas, **hublot rond** (ouverture r 132) cerclé d'un **anneau de laiton** (r 132 → 152, `MAT.yellow`, 8 boulons), béquille à droite, fente à courrier sans texte, paillasson. `reflet` = angle d'un éclat blanc qui tourne sur l'anneau | ancrage = centre du hublot ; le vantail va de x −300 à +300, de y −220 à +880 | `reflet` (20°/s) | S4 |
| `D.interphone(g, o)` | Platine d'interphone : plaque d'acier 560 × 150 (`MAT.grey`, r 16, 4 petites vis) qui encadre le cœur et le bouton du socle | ancrage = centre | — (ce sont le cœur et le bouton qui bougent) | S4 |
| `D.mur(g, o)` | Pièce de face générique : mur uni, plinthe, sol en perspective (lignes fuyantes) à partir de `sol` ; options `lambris` (hauteur d'un soubassement en planches), `motif: "uni" \| "rayures" \| "carreaux"` | plein cadre | — | S3, S6, S12, S24, S29 |
| `D.porteBureau(g, o)` | Porte de bureau : dormant, vantail clair 480 × 830, bande vitrée verticale à droite (x +170…+210), béquille à gauche | ancrage = milieu du seuil | — | S29 |
| `D.corbeille(g, o)` | Corbeille à papier en fil d'acier 110 × 130 (treillis en losanges) | ancrage = centre du bas | `choc` 0…1 (elle tangue quand une lettre tombe dedans) | S29 |

### C. Les cartes

| Nom | Dessin | Taille · ancrage | Parties mobiles | Scènes |
|---|---|---|---|---|
| `D.rollkarte(g, o)` | Carte murale d'école : grande feuille `#FBFAF4` (x −350…+350) qui descend d'AU-DESSUS du cadre (y −1400…0), plis légers tous les 220 px, bords à l'encre 2,5 px ; en bas une **baguette** de bois 740 × 20 à deux boutons tournés. L'Allemagne est dessinée par-dessus avec `drawDE` (socle) | ancrage = centre de la baguette | `frappe` (elle descend d'un bloc, sa baguette claque) ; ses deux coins du bas, nœuds séparés, battent ensuite (± 6°, 2,8 s). Pas de balancement de la feuille entière : l'épingle et les textes posés dessus ne suivraient pas | S2 |
| `D.amtsgericht(g, o)` | Petite façade de tribunal : 3 marches, 4 pilastres, fronton triangulaire avec `§`, bandeau `Amtsgericht` (Kalam 20), porte, 2 fenêtres | 210 × 170 · ancrage = centre du bas | pousse du sol (`rise`) ; lampe de la porte qui frémit | S2 |
| `D.globe(g, o)` | Globe d'école sur pied, schématique : sphère = disque blanc R 330 (trait 3,2, ombre), graticule gris `#C9C9C1` (4 parallèles + 5 méridiens en arcs d'ellipse), demi-méridien de support GRIS (`MAT.mid`, pas de laiton) du côté GAUCHE (x = −R − 32), deux pivots, colonne (40 × 90) et pied rond (240 × 50). **Aucune côte, aucune frontière** : seulement la petite Allemagne (`drawDE` réduit) et deux points de départ. Voir risque 6 | ancrage = centre de la sphère | `tour` −1…1 : les méridiens glissent de ± 6 px (4 s), le disque et ce qui est posé dessus ne bougent pas ; la sphère entière (nœud séparé du pied) ne bouge que pour sa frappe | S5, S11 |
| `D.arc(g, o)` | Trajet en pointillé : courbe quadratique A → C → B, tirets 14/10, encre 4 px ; `p` 0…1 = longueur déjà tracée ; `phase` = défilement des tirets ; pointe de flèche quand `p` = 1 | coordonnées monde | `p` ; `phase` (40 px/s) | S5, S11 |
| `D.tube(g, o)` | Tube à diplôme : cylindre 150 × 40 (`MAT.mid`), capuchon, sangle | ancrage = centre | suit le dos de `TOI` (S6, S24) ; glisse le long d'un arc (S11) | S6, S11, S24 |

### D. Les diplômes et l'explication en image (S3, S6, S8, S9, S24)

| Nom | Dessin | Taille · ancrage | Parties mobiles | Scènes |
|---|---|---|---|---|
| `D.cimaise(g, o)` | Rail à tableaux : tringle d'encre de x0 à x1 + crochets | — | — | S3 |
| `D.cadre(g, o)` | Diplôme encadré : cadre bois 18 px, passe-partout 16 px, document avec `t1` (34), `t2`, `t3` (22), gribouillis, sceau en rosette en bas à gauche, deux fils jusqu'au rail ; au-dessus, une **lampe de tableau** (tube de 120 px sur un petit bras) et son cône crème (opacité 0,2) | 280 × 360 · ancrage = centre | `m.pend` autour du point d'accroche (quand le tampon frappe) ; lampe qui frémit | S3 |
| **`D.diplome(g, o)`** | Le diplôme de « toi », générique : feuille à bordure double et fleurons d'angle, ligne 1 `Diplôme de` (34 × k), ligne 2 `Doctorat en Médecine` (46 × k), trois lignes de gribouillis, sceau à deux rubans en bas à droite. **Ni pays, ni université, ni nom.** `roule` 0…1 : les deux bouts encore enroulés | ancrage = centre. Grand : 560 × 270 (k = 1, S6) · petit : 230 × 160 (k = 0,42, S6) · 200 × 130 (S9) · 250 × 180 (S24) | `roule` (il se déroule) ; flottement ± 3 px | S6, S9, S24 |
| `D.valise(g, o)` | Valise cabine à roulettes 150 × 210, poignée télescopique sortie, étiquette de bagage vierge | ancrage = centre du bas | étiquette en pendule | S6 |
| `D.pochette(g, o)` | Pochette à rabat 110 × 80 à élastique | ancrage = centre | suit la main de `KOL` | S6, S24 |
| **`D.livre(g, o)`** | Livre vu par la tranche : dos arrondi, deux nerfs, étiquette `t` (Kalam 20) ; `mat: "gris" \| "blanc" \| "fonce"` ; `icone: "loupe"` (petite loupe : la recherche) | 300 × 46 par défaut (`w`, `h`) · ancrage = centre du bas | chute en cascade ; un livre peut glisser de côté (`dx`) | S8, S9 |
| `D.table(g, o)` | Plateau de table de bibliothèque : dalle de bois x −420…+420, épaisse de 24, deux amorces de pieds | ancrage = milieu du bord avant | — | S8, S9 |
| `D.fenetreArc(g, o)` | Fenêtre cintrée : cadre, croisillon, appui ; ciel `#EEF3F4` derrière (les nuages `D.nuage`, petits et blancs, sont posés par `story.js` dans un groupe découpé) | 320 × 335 · ancrage = centre | nuages (`m.drift`) | S8 |
| `D.lampeTable(g, o)` | Lampe de bibliothèque GRISE : pied, abat-jour en cloche, chaînette, cône crème | 100 × 180 · ancrage = centre du bas | chaînette (`m.pend`, repos 1,2°) | S8, S9 |
| `D.ecran(g, o)` | L'écran « anabin » : moniteur porté par un **bras mural articulé qui vient de la GAUCHE** (de x −430 au bord gauche de la coque : rien ne passe au-dessus, la zone de la pastille reste nue), coque `MAT.mid` (r 16), dalle blanche à fines lignes (`#EDEDE8`, tous les 8 px), barre d'en-tête. **Aucun logo réel** ; les textes sont des nœuds de `story.js` (frappe au clavier) | 500 × 330 · ancrage = centre de la dalle | entre par la gauche (`m.build "left"`) et s'arrête net ; curseur qui clignote (0,5 s) | S9 |
| `D.planche(g, o)` | Planchette de bois posée sur une pile : `= Ärztliche Prüfung` (Kalam 22) | 250 × 30 · ancrage = centre du bas | tombe (`drop`) | S9 |
| `D.socle(g, o)` | Socle de pierre à face gravée (les textes sont posés dessus par `story.js`) | 300 × 180 · ancrage = centre du bas | — | S24 |

### E. L'atelier du graveur (S7, S10, S26)

| Nom | Dessin | Taille · ancrage | Parties mobiles | Scènes |
|---|---|---|---|---|
| `D.atelier(g, o)` | Fond complet : **panneau perforé** (x 170–910, y 560–900 ; trous tous les 40 px) où pendent quatre burins, un compas, une scie bocfil, une équerre (PAS de marteau ni de maillet) ; un fil tendu (y 590) avec trois bons de commande à pinces ; **établi** : dessus de y 940 (fond) à 1200 (bord avant), façade jusqu'à 1400 avec trois tiroirs à poignées coquille | plein cadre | les trois bons (`m.sway` 2°, 2,6–3,2 s) ; les outils (`m.pend`, repos 0,5°) : nœuds séparés | S7, S10, S26 |
| `D.etau(g, o)` | Étau d'établi : socle boulonné, deux mors, vis à barre et boules | 200 × 200 · ancrage = milieu du haut des mors | la barre de serrage frémit ; `serre` | S7, S10, S26 |
| `D.casse(g, o)` | Casier à lettres en bois, 6 × 3 cases, de minuscules lettres de laiton en vrac (capitales Kalam jaunes : A B D K M R S T…) | 260 × 160 · ancrage = centre | deux lettres qui scintillent | S7 |
| `D.bloc(g, o)` | Bloc de papier (collé en tête) ; `empreinte` 0…1 = opacité de l'empreinte du cachet : cadre + ligne 1 `Dr. ………` + ligne 2 `Arzt` ; `dr` 0…1 = force de l'encre sur « Dr. » | 220 × 170 · ancrage = centre | `empreinte`, `dr` | S7, S26 |
| `D.encreur(g, o)` | Boîte à encre en fer 150 × 60, couvercle ouvert | ancrage = centre du bas | — | S7, S26 |
| `D.cartes(g, o)` | Cartes de visite en éventail sur un petit support ; la première porte `Dr. ………` + gribouillis ; `dr` 0…1 | 160 × 120 · ancrage = centre du bas | `dr` | S7 |
| `D.loupe(g, o)` | Lampe-loupe sur bras articulé (deux segments de 160 px, lentille r 60 cerclée) | ancrage = pied du bras | `m.sway` 1° | S7, S10, S26 |
| `D.fiche(g, o)` | Fiche de profil d'un réseau social DESSINÉ (une fiche cartonnée, pas un téléphone, aucun logo) : carte 290 × 190 (r 16), emplacement d'avatar (r 44), nom de compte `nom` (Kalam 34), compteur `n`, mot `Abonnenten` (20), une pastille vide « suivre » ; option `bio` (texte tapé + curseur). Variante `kind: "pilule"` : 280 × 90, avatar r 30 + nom seulement. Variante `kind: "bio"` : fiche en hauteur 200 × 240 — avatar r 34 (un rond vide : c'est TON compte), nom en pointillé, `Bio:` (Kalam 22) + le texte tapé `bio` + curseur | ancrage = centre | compteur (`c.count`) ; curseur ; anneau de l'avatar qui pulse | S14, S15, S26 |

### F. L'affaire (S12 à S23)

| Nom | Dessin | Taille · ancrage | Parties mobiles | Scènes |
|---|---|---|---|---|
| `D.patere(g, o)` | Tringle à patères : barre de 780 px, cinq crochets | ancrage = centre | — | S12 |
| `D.blouse(g, o)` | Blouse blanche VIDE sur un cintre : crochet, épaules, revers, trois boutons, poche de poitrine avec deux stylos, poches basses | 200 × 540 · ancrage = crochet | `m.sway` 0,8°, 3,6 s | S12 |
| `D.stetho(g, o)` | Stéthoscope pendu à une patère | 110 × 300 · ancrage = crochet | `m.pend` (repos 1°) | S12 |
| `D.sabots(g)` | Paire de sabots de service | 120 × 50 · ancrage = centre du bas | — | S12 |
| **`D.badge(g, o)`** | Le badge d'hôpital (objet RÉEL de l'affaire) : cordon double de (0, 0) à la pince (0, 160), pince métallique 60 × 40, carte blanche 560 × 360 (r 22, trait 3,2, fente en haut) ; à gauche le cadre photo 160 × 220 (fond gris) avec `D.silhouette` sans médaillon (`photo` 0…1) ; en bas une bande : code-barres (20 traits), croix, mot `Krankenhaus` (20) — **aucun nom d'hôpital** ; ligne `Assistenzarzt` (28, opacité `fonction`). Les textes « Dr. med. », « ( », « i », « r », « ) » et le pointillé du nom sont des nœuds de `story.js`. `mini: true` : 480 × 250, sans photo ni code-barres, cordon court (S15) | ancrage = haut du cordon (le crochet) | `frappe` + `m.pend` (8°, pivot = crochet) ; `photo` ; `fonction` | S12, S15 |
| `D.boite(g, o)` | Boîte aux lettres murale : corps `MAT.grey`, fente à clapet articulé (`clapet`°), fenêtre à nom (bandelette vierge ou `………`), porte-journal à deux anneaux. `kind: "A"` (anguleuse : l'affaire) · `"B"` (toit arrondi, petit autocollant : celle de « toi ») | 300 × 360 · ancrage = centre | `clapet` (pendule amorti, 30°) | S13, S28 |
| `D.enveloppe(g, o)` | Enveloppe ; `kind: "kammer"` (expéditeur `Ärztekammer Nordrhein`, 16 px, + adresse en gribouillis + fenêtre) · `"neutre"` (fenêtre + gribouillis, aucun texte, aucune couleur) · `"reponse"` (adresse en gribouillis + petit timbre dessiné) ; `ouvert` 0…1 (rabat) | 260 × 170 par défaut · ancrage = centre | chute, `ouvert`, `rot` | S13, S16, S17, S27, S28 |
| **`D.brief(g, o)`** | La lettre de la Kammer : feuille 620 × 540 (`h` réglable), deux plis (y ± 90), en-tête `Ärztekammer Nordrhein` (Kalam 36, en haut à gauche, à (−288, −217)) + filet — **texte seul, aucun logo : ce n'est pas un fac-similé** ; corps en gribouillis SEULEMENT aux hauteurs données par `corps: [y, …]` (le reste est blanc : les citations sont des nœuds de `story.js`) ; signature en gribouillis (`signe` 0…1, tracée peu à peu) ; `tete` 0…1 (l'en-tête se révèle) ; `gris` 0…1 (lettre ancienne, grisée) | ancrage = centre | `tete`, `signe`, `gris` ; respiration du papier (coin qui se soulève de 2°, 2,8 s) | S13, S16 |
| `D.navigateur(g, o)` | Fenêtre de navigateur au trait : barre de titre à trois ronds, champ d'adresse (gribouillis + `.de`), en-tête de page avec le pictogramme (r 22), deux colonnes `Preisliste` et `Impressum` (titres Kalam 28), rangées = gribouillis + signes `€` SANS chiffres (`rows` 0…1) ; les lignes de nom sont des nœuds de `story.js`. **Ni nom de cabinet, ni prix, ni acte.** `recharge` 0…1 : la flèche de rechargement tourne, la page clignote. Variante `bande: true` : 600 × 120 (barre d'adresse + une ligne) | 600 × 420 · ancrage = centre | `rows` ; `recharge` ; curseur | S14, S15, S17 |
| `D.poste(g, o)` | Poste de travail : écran (coque `MAT.mid` 632 × 452, r 18) sur un pied (col 80 × 34, socle 240 × 16), posé sur un bureau (fond du plateau à y +50 sous l'écran, bord avant à y +284, façade jusqu'en bas). Le `D.navigateur` est posé dans la coque par `story.js` | ancrage = milieu du bas de la coque | `frappe` (le tout tombe sur le bureau) | S14, S17 |
| `D.dateur(g, o)` | Tampon DATEUR à molettes, posé debout sur le bureau (celui qui a frappé les dates des lettres en S13 et S16) : bâti d'acier, poignée de bois, fenêtre où se lit l'année `an` sur sa molette ; `cran` 0…1 = la molette tourne d'un cran vers l'année suivante (clac). **Pas de calendrier à feuillets** : les pages qui tournent ou s'arrachent sont le dispositif d'AKTE 06 (remplacé le 26.11.2026) | 130 × 150 · ancrage = centre du bas | `cran` | S17 |
| `D.bac(g, o)` | Bannette à courrier vide | 220 × 70 · ancrage = centre du bas | — | S17 |
| `D.strafbefehl(g, o)` | Enveloppe NEUTRE 520 × 300 (fenêtre, gribouillis) d'où sort une feuille 440 × 420 : en-tête `Amtsgericht Düsseldorf` (22), titre `Strafbefehl` (64), date `25.06.2019` (40), gribouillis ; `sorti` 0…1 | ancrage = milieu du bord haut de l'enveloppe | `frappe` ; `sorti` | S18 |
| `D.salleFace(g, o)`, `D.banc`, `D.tableProc`, `D.bureauGreffe`, `D.tableDefense` | Le banc de l'Amtsgericht vu DE FACE, en cinq morceaux pour pouvoir glisser les personnages entre les meubles (cotes dans S19) : mur clair uni, soubassement PEINT (bande grise, filet d'encre), deux **vasistas hauts à verre dépoli** (ni stores ni lames : celles-ci sont dans AKTE 06), sol uni (rien au plafond : la zone de la pastille reste nue) ; dossier haut du fauteuil du juge ; banc du juge (simple, un pupitre incliné, un code épais GRIS) ; table de la procureure ; bureau de la greffière (petit écran, clavier) ; bord de la table de la défense, au premier plan (la caméra est derrière). **Ni balance, ni plaque au mur, ni boiserie, ni étagère, ni micro, ni marteau, ni emblème** | plein cadre | poussière dans les deux rais de lumière (`m.dust`, blanche) | S19 |
| **`D.platzschild(g, o)`** | Chevalet de table en tôle émaillée (le même émail que `D.plaque({ kind: "email" })`) : plaque 230 × 64 inclinée de 12° vers l'arrière, double filet d'encre, pied en équerre, texte `text` (Kalam 26) ; `picto: true` : le pictogramme sans visage (`D.silhouette`, r 20, `cadre: "aucun"`) à gauche du mot. `bascule` (degrés) : la plaque pivote sur son pied | 230 × 64 (+ pied 20) · ancrage = milieu du pied | `bascule` (7° → 3°, amorti) | S19 |
| `D.rebord(g, o)` | Tablette de pierre sur deux consoles (où se posent les lettres) | `w` × 24 · ancrage = milieu du bord haut | — | S20, S21, S23 |
| `D.feuille(g, o)` | Feuille générique : titre `t` (Kalam 40), sous-titre `sub` (22), gribouillis ; `fleche` 0…1 (une flèche d'encre de 8 px pousse du bord haut, vers le HAUT) ; `ecrit` 0…1 (lignes manuscrites qui s'écrivent) | 230 × 280 (S21) · 300 × 460 (S27) · ancrage = centre | `fleche`, `ecrit` | S21, S27 |
| `D.chariot(g, o)` | Chariot à dossiers : deux tablettes, poignée à gauche, quatre roulettes ; cinq dos de dossiers VIERGES sur la tablette du haut, trois boîtes en bas | 680 × 420 · ancrage = milieu du sol | roulettes qui frétillent (`roule`), onglets qui pendent | S22 |
| `D.ordner(g, o)` | Le gros dossier FERMÉ de l'autre procès : boîte 360 × 420 debout, carton `MAT.mid`, **étiquette rectangulaire vide** (200 × 80, blanche, sans un mot), sangle à boucle (`sangle` 0…1), couvercle qui s'entrouvre (`ouvre` 0…8°) | ancrage = centre du bas | `ouvre`, `sangle` | S22 |
| `D.chemise(g, o)` | La chemise mince du dossier « titre » : 200 × 260 (`MAT.light`), onglet, trois mini-lettres de laiton « D r . » (h 28) sur la couverture, mini-étiquette à ficelle, `119 Cs 426/19` (16 px) | ancrage = centre | glisse (`move`) | S22 |

### G. La règle (S24 à S29)

| Nom | Dessin | Taille · ancrage | Parties mobiles | Scènes |
|---|---|---|---|---|
| `D.potence(g, o)` | Barre porte-enseignes : tringle de 740 px, deux consoles murales à volutes, quatre anneaux à x −260, −100, +100, +260 | ancrage = centre de la tringle | `frappe` | S24 |
| `D.chaine(g, o)` | Chaîne à maillons (ovales 8 × 12 alternés) de (x0, y0) à (x1, y1) | coordonnées monde | suit la plaque qu'elle porte | S24, S25 |
| `D.different(g, o)` | Le signe « ≠ » en fer : deux barres 86 × 16 (`MAT.dark`) + une barre oblique 20 × 100 (20°) | ancrage = centre | `slam` | S25 |
| `D.loi(g, o)` | Carte GRISE « Gesetz » : rectangle hachuré (`MAT.grey`, r 12), onglet `Gesetz` (blanc sur encre, 18 px) en haut à gauche, paragraphe `par` (Kalam 28), lignes `l1`, `l2` (20–22 px) | `w × h` donnés dans la scène · ancrage = centre | `pop` | S24, S25 |
| `D.fleche(g, o)` | Flèche de retour courbe (encre 6 px, pointe), `p` 0…1 | coordonnées monde | `p` | S28 |

---

## 3. HUD propre à l'épisode

Tout est dans `c.hud` (repère écran), recréé dans chaque scène par les aides `mode(c, kind)` et `reglette(c)`, et
piloté par le TEMPS GLOBAL : d'une scène à l'autre rien ne saute. L'intro (S4) n'a ni plaquette ni réglette.

**Socle (inchangé)** : barre de progression `#prog` (X 100–700, Y 236–250) ; logo `#brand` (X ≈ 770–980,
Y 222–268), masqué pendant l'intro.

| Élément | Position (écran) | Forme | Comportement |
|---|---|---|---|
| **Plaquette de mode** (`D.plaquette`) | bord gauche X 100, Y 278–326 (haute de 48) | petite plaque d'ÉMAIL blanc à double filet, deux vis (une à chaque bout) ; texte allemand Kalam 24 + « · » + arabe Plex Arabic 700 de 26 sur la même ligne | dit dans quel monde on est. Quand le mode change (toujours sur une coupe), elle **bascule** comme un volet : `sy` 1 → 0 → 1 en 0,2 s, le texte change au milieu, ses deux vis font un quart de tour. Présente dès la 1re image de chaque scène (aucun fondu) |
| **Réglette des années** (`D.reglette`) | rail d'acier de X 610 à X 970, à Y 302 ; six têtes de vis (r 11) à X = 620, 688, 756, 824, 892, 960 ; années en Kalam 20 centrées dessous (ligne de base Y 340) : `2001 · 2009 · 2015 · 2017 · 2019 · 2022` | une vis par date de l'affaire — le motif de l'épisode. `vide` : contour gris, année grise `#9A9A94` ; `active` : la fente tourne de 90° en 0,25 s, la tête bat (échelle 1,3 → 1), l'année passe à l'encre ; `passée` : acier, fente à l'horizontale, année à l'encre | visible seulement dans l'affaire : `pop` (0,3 s) à `b8-0.10`, `hide` (0,15 s) à `b17-0.10`. Sous le logo (Y 268 → 291), à droite de la plaquette (qui finit à X 570 au plus) |
| **Pastille du haut** | centre (540, 420) | pastille GRISE du gabarit, taille ≤ 36, largeur ≤ 660 ; son arabe finit vers Y 500 | une à la fois : `pop` sur le mot, `hide` 0,08 à 0,15 s avant la suivante |
| **Ligne de dossier** (S1 seulement) | début X 100, ligne de base Y 352 | Kalam 18, gris `#55524B` : `119 Cs 426/19 · nicht rechtskräftig geworden` | `show(0)` ; c'est le « en petit » demandé par le scénario |
| **Note de vérité** (S12 et S15) | c'est une pastille du haut : centre (540, 420), taille 22 (largeur 563) | `(ir) : Tatsache aus dem Urteil — keine Regel` / « واقعة من الملف، ماشي قاعدة » | obligatoire chaque fois que « (ir) » est à l'image ; elle reste jusqu'à la coupe |
| **Carte « Gesetz »** (S24) | centre (540, 432) | `D.loi`, 560 × 96 (voir S24) ; arabe dessous, ligne de base Y 512 | à la place de la pastille du haut |

**Les quatre modes de la plaquette**

| Mode | Texte | Largeur (X 100 → …) | Scènes |
|---|---|---|---|
| `BSP` | `Beispiel` · « مثال » | 250 (→ 350) | S1 · S5 à S10 |
| `FALL` | `Der Fall · laut Urteil` · « حسب الحكم » | 470 (→ 570) | S2, S3 · S11 à S18 · S20 à S23 |
| `REKO` | `Rekonstruktion` · « مشهد تمثيلي » | 400 (→ 500) | S19 (l'audience est mise en scène) |
| `REGEL` | `Keine Rechtsberatung — frag deine Ärztekammer` (Kalam 22) ; SOUS la plaquette, hors d'elle : « ماشي استشارة قانونية — سول الهيئة ديالك » (`ar strong` 26, centré sur X 365, ligne de base Y 358) | 530 (→ 630) | S24 à S29 (pas sur l'affiche, qui a son propre en-tête) |

Bascules : `b2` (BSP → FALL) · `b4-0.30` (→ BSP, après l'intro) · `b8-0.10` (→ FALL) · `b13@المحكمة` (→ REKO) ·
`b13@يعني` (→ FALL) · `b17-0.10` (→ REGEL).

**États de la réglette** (`etat(i, t)`)

| Vis | Devient active à | Ce qu'on voit au même instant |
|---|---|---|
| `2001` | `b8@فإيران+0.2` | l'arc Téhéran → Allemagne arrive (S11) |
| `2009` | `b10@1` | le tampon dateur `08.09.2009` frappe la lettre (S13) |
| `2015` | `b11` | pastille `2015 · eigene Praxis` (S14) |
| `2017` | `b12@1` | le tampon dateur `09.01.2017` (S16) |
| `2019` | `b13@1` | le tampon `EINSPRUCH` sur le Strafbefehl (S18) |
| `2022` | `b16@7` | « 2022 » dit ; l'étiquette de 15 000 € est déjà tombée (S23) |

Une vis reste `active` (elle bat à 2 Hz, amplitude 6 %) jusqu'à ce que la suivante le devienne, puis passe à `passée`.

**Mentions de vérité — où, et lesquelles jamais.**
`laut Urteil` : toute l'affaire (plaquette `FALL`). `laut Presse` : la dénonciation (S17, dans la pastille) et les
13 500 € (S18, sur l'étiquette). `Rekonstruktion` : l'audience (S19, plaquette `REKO`). `1. Instanz` : chaque fois que
« 15.000 € » est à l'image (S1 pastille, S3 étiquette, S20 plaquette, S21 étiquette). `nicht rechtskräftig` : S1
(ligne de dossier), S21 (tampon + pastille), S22 et S23 (sur l'étiquette). `Gesetz` : S24 (§ 132a StGB) et S25
(§ 69 HG NRW). `Beispiel` : tout ce qui est « toi » avant la règle. **Jamais** : « (MA) », « M.D. », un prix à côté
d'un acte, « bezahlt », « rechtskräftig » à côté de « 15.000 € », un nom, un logo réel.

**Contrôle du jaune** : sur une capture de chaque scène de l'histoire, les pixels jaunes (r > 220, g > 180, b < 120)
ne doivent se trouver QUE sur une plaque de laiton, une lettre-objet ou l'épingle. Tout autre jaune est une faute.

---

## 4. Scène par scène

**29 scènes** (28 + l'intro). Durées = minutage provisoire (`timings.js`) ; tout est calé sur des repères, donc tout
se recale seul quand la vraie voix arrive. Les scènes qui ouvrent un nouveau contexte (`sceneStart` de
`preview.json`) commencent 0,10 à 0,30 s AVANT leur beat : la frappe a lieu dans la pause, l'image est en place sur
le premier mot.

| Bloc | Scènes | Beats | `from` | Temps provisoire |
|---|---|---|---|---|
| Accroche | S1 · S2 · S3 | b1–b3 | `0` · `b2` · `b3` | 0,00 → 8,85 |
| Intro | S4 | i1–i3 | `i1-0.15` | 8,85 → 18,10 |
| « Toi » : l'arrivée, le diplôme, le cachet | S5 · S6 · S7 | b4–b5 | `b4-0.30` · `b4@Doctorat` · `b5-0.05` | 18,10 → 24,01 |
| L'explication : Promotion / Berufsdoktorat | S8 · S9 · S10 | b6–b7 | `b6` · `b7` · `b7@ماشي-0.10` | 24,01 → 32,79 |
| L'affaire : d'où il vient, le badge | S11 · S12 | b8–b9 | `b8-0.10` · `b9` | 32,79 → 38,75 |
| 2009, le site, 2017, la dénonciation | S13 · S14 · S15 · S16 · S17 | b10–b12 | `b10` · `b11` · `b11@هاد` · `b12` · `b12@6` | 38,75 → 49,42 |
| Tribunal et sanction | S18 · S19 · S20 | b13 | `b12@end+0.05` · `b13@المحكمة` · `b13@يعني` | 49,42 → 53,60 |
| Le statut du jugement | S21 · S22 · S23 | b14–b16 | `b14` · `b15` · `b16` | 53,60 → 60,87 |
| La règle | S24 · S25 · S26 · S27 · S28 | b17–b20 | `b17-0.10` · `b18` · `b19` · `b19@سول` · `b20` | 60,87 → 71,82 |
| Dernière phrase | S29 | b21 | `b21-0.30` | 71,82 → 74,46 |
| Affiche | — | — | `b21@end+0.15` | 74,46 → 80,2 |

Toutes les scènes : `in: "cut", inDur: 0`. Caméra de départ `AXE`, sauf mention.

### Mises en place FIXES (une place par objet, la même dans toutes les scènes du lieu)

**Façade** (S1 ; monde) : `D.facade` · lanternes : platines en (140, 440) et (940, 440), lanternes pendues en
(190, 430) et (890, 430) (corps x 162–218 et 862–918, y 432–516 : hors de la zone nue de la pastille) · **plaque XL**
680 × 480, centre (540, 800) → x 200–880, y 560–1040 ; vis en (226, 586), (854, 586), (226, 1014), (854, 1014) ·
corniche à y 1160 : `D.carton` en (330, 1160), deux vis de rechange en (505, 1154) et (532, 1156), `D.niveau` en
(650, 1160).

**Atelier du graveur** (S7, S10, S26) : `D.atelier` · `D.loupe` : pied en (150, 600), lentille vers (270, 730) ·
`D.casse` centre (700, 730) (x 570–830, y 650–810) · sur l'établi, trois postes alignés : **gauche** `D.etau` (haut
des mors en (330, 1035)) qui serre une petite plaque de laiton 200 × 84 (centre (330, 990), x 230–430) ; **centre**
`D.bloc` 220 × 170, centre (550, 1090) (x 440–660, y 1005–1175), `D.encreur` derrière lui en (590, 990) ;
**droite** `D.cartes` 160 × 120 en (750, 1100) (x 670–830) — remplacées en S26 par `D.fiche({ kind: "bio" })`
(200 × 240, centre (760, 1040)). S10 est un plan rapproché de l'étau, recentré (voir S10).

**Bibliothèque** (S8, S9) : `D.mur({ motif: "uni" })` · `D.table`, bord avant en (540, 1340) (les livres se posent à
y 1340) · `D.fenetreArc` centre (540, 720) (x 380–700, y 560–880) · `D.lampeTable` en (800, 1340) (S8) puis en
(540, 1340) (S9). Un livre = 46 px de haut ; une pile d'études = 6 livres = de y 1064 à y 1340 ; la thèse de
recherche = un 7e livre de 60 px (y 1004–1064).

**Rebord** (S20, S21, S23) : `D.mur({ motif: "uni" })` nu + `D.rebord` ; les lettres de laiton debout dessus ; les
étiquettes pendues dessous. Seule la taille des lettres change (cotes dans chaque scène).

### Ce qui vit dans chaque mise en place (valeurs à reprendre telles quelles)

| Mise en place | Élément | Mouvement | Amplitude | Période / vitesse |
|---|---|---|---|---|
| partout | tout laiton (plaques, lettres) | bande de reflet · 3 à 4 étincelles blanches (croix de 10 px) aux arêtes | `reflet` 0 → 1 · opacité 0 ↔ 1 | un balayage de 0,7 s toutes les 2,4 s · 1,1 s, déphasées |
| partout | tout ce qui pend (étiquettes, badge, plaques à chaînes, cadres) | `m.pend` au choc, puis repos | 6 à 14° amortis (2,2), puis 0,8° | 7,5 rad/s puis 1,3 rad/s |
| partout | la caméra | poussée du socle + coups de zoom | ×1,00 → ×1,04 · 0,04 à 0,06 | toute la scène · sur les mots forts |
| façade (S1) | lanternes · leur halo · un papillon de nuit · bulle du niveau | `m.pend` repos · opacité · `m.drift` en boucle autour de la lanterne gauche · oscillation | 0,8° · 0,9–1 · rayon 36 px · ± 6 px | 1,3 rad/s · irrégulier · 2,2 s · 1,7 s |
| carte (S2) | coins bas de la feuille · médaillon pendu · tirets des trajets · halo de la porte du tribunal | battement · `m.pend` repos · défilement · opacité | ± 6° · 1,2° · 40 px/s · 0,85–1 | 2,8 s · 1,3 rad/s · continu · irrégulier |
| mur de diplômes (S3) | lampes de tableau · cadres | frémissement · `m.pend` après chaque tampon | 0,9–1 · 3° amortis | irrégulier · 7,5 rad/s |
| porte (S4) | éclat sur l'anneau · poussière · étiquette de sonnette · photo | rotation · `m.dust` 10 grains · `m.sway` · poussée | 360° · — · 0,8° · ×1,00 → ×1,03 | 18 s le tour · 8 px/s · 3 s · toute la scène |
| globe (S5, S11) | méridiens · tirets des arcs · médaillons | `tour` (les méridiens glissent) · défilement · flottement | ± 6 px · 40 px/s · ± 3 px | 4 s · continu · 2,6 rad/s |
| hall (S6) | suspension · étiquette de la valise · grand diplôme · personnages | `m.pend` · `m.pend` repos · flottement · respiration, clignements | 5° amortis puis 1° · 2° · ± 3 px · ± 2 px | 4,4 rad/s · 1,3 rad/s · 2,2 rad/s · 2,6 rad/s |
| atelier (S7, S10, S26) | bons de commande · outils pendus · loupe · limaille (`m.dust`, 8 grains blancs cerclés de gris) | `m.sway` · `m.pend` repos · `m.sway` · dérive | 2° · 0,5° · 1° · — | 2,6–3,2 s · 1,3 rad/s · 3,4 s · 6 px/s |
| bibliothèque (S8, S9) | nuages dans la fenêtre · chaînette de la lampe · poussière dans la lumière · curseur de l'écran | `m.drift` · `m.pend` repos · `m.dust` 8 grains · clignement | 3 nuages · 1,2° · — · — | 12, 15, 18 px/s · 1,3 rad/s · 7 px/s · 0,5 s |
| vestiaire (S12) | blouse sur cintre · stéthoscope · pince du badge | `m.sway` · `m.pend` repos · reflet blanc | 0,8° · 1° · opacité 0 ↔ 1 | 3,6 s · 1,3 rad/s · 1,8 s |
| lettres (S13, S16) | coin de la feuille · encre fraîche du tampon dateur (reflet blanc qui s'éteint) · main qui signe | soulèvement · opacité 1 → 0 · rotation | 2° · — · ± 3° | 2,8 s · 0,8 s · 5 Hz pendant qu'elle écrit |
| site (S14, S17) | curseur · anneaux des avatars · flèche de rechargement | clignement · pulsation · rotation | — · 4 % · 360° | 0,5 s · 1,4 s · 0,3 s par tour |
| banc du tribunal (S19) | poussière dans les deux rais · mains de `GRE` · reflet des deux lettres sur le banc · chevalet `Angeklagter` | `m.dust` 10 grains · frappe au clavier · bande claire · bascule amortie | — · ± 4 px alternés · — · 7° → 3° | 8 px/s · 6 Hz · 2,4 s · 0,4 s |
| rebord (S20, S21, S23) | étiquettes · feuilles « Berufung » | `m.pend` · frémissement d'un coin | voir « partout » · 2° | — · 2,4 s |
| chariot (S22) | roulettes · onglets pendus · poussière soulevée | frétillement · `m.sway` · `m.dust` 6 grains pendant 0,6 s | ± 5° · 3° · — | 9 Hz amorti · 2,2 s · 20 px/s |
| potence (S24) | les deux plaques sur leurs chaînes · personnages | `m.pend` · respiration, clignements, regards | 9° amortis puis 1,5° · — | 6 rad/s puis 1,3 rad/s · — |
| enseigne (S25) | les deux plaques de tribunal · points « … » | `m.sway` en OPPOSITION de phase · `m.typing` | 3° · rebond de 9 px | 2,2 s · 1,5 Hz |
| porte du bureau (S29) | bande vitrée de la porte · personnages | un reflet blanc qui glisse de haut en bas · respiration, clignements, rire | 300 px · ± 2 px | 3 s · 2,6 rad/s |

---

### S1 — L'étiquette tombe sur « Dr. » (accroche A)

- **Beat** b1 · 0,00 → 3,72 (3,7 s) · **Lieu** : la façade, TA future plaque · **Entrée** : première image.
- **À comprendre** : imagine — tu visses « Dr. » devant ton nom, et une amende de 15 000 € vient s'y accrocher.
- **Caméra** : `[{ at: 0, s: 1.0, cx: 540, cy: 930 }, { at: "b1@3", s: 1.2, cx: 540, cy: 840, d: 0.14, ease: "out" },
  { at: "b1@حيت", s: 1.0, cx: 540, cy: 930, d: 0.16, ease: "out" }, { at: "b1@كتبتي", s: 1.2, cx: 540, cy: 790,
  d: 0.14, ease: "out" }, { at: "b1@فألمانيا", s: 1.0, cx: 540, cy: 930, d: 0.16, ease: "out" }]` ;
  `c.shake(0.02, 10, 0.3)` ; `c.kick("b1@غرامة", 0.04)` ; `c.kick("b1@3", 0.05)` ; `c.kick("b1@Dr", 0.05)`.
  Vérifié : au 1er zoom (S ≤ 1,36) le haut de la plaque est à Y 559 (sous l'arabe de la pastille, Y 500), le reflet
  finit à X 866 (< 915), l'étiquette est entière ; au 2e (S ≤ 1,38) la plaque reste entière à l'écran (X 72 → 1008 :
  seuls ses bords passent dans la marge, aucune lettre ni le reflet), son haut est à Y 624, la corniche à Y 1449.
- **Couches (arrière → avant)** : façade · halos des lanternes · lanternes · plaque XL · pointillé du nom · reflet de
  `TOI` (découpé dans la plaque) · bande de reflet · lettres « D », « r », « . » · étiquette à ficelle · corniche et
  ses objets · tournevis (quand il tombe) · avant-bras · HUD (plaquette `BSP`, ligne de dossier, pastille du haut).
- **Composition (monde)** :
  - lettres : `motDr(c, m, 250, 730, 120)` → D x 250–351, r x 365–432, point x 444–473, ligne de base y 730 ;
  - nom en pointillé : `points: { x0: 510, y: 716, n: 9, pas: 40 }` (x 510 → 830) ;
  - étiquette `D.etiquette` : ancrage (368, 630) (entre les crochets du D (312, 610) et du r (423, 651) ;
    `ecart: 55`, décalages verticaux des deux brins −20 et +21), `L: 170` → œillet (368, 800) ; corps 330 × 180
    (x 203–533, y 786–966), `rot: -5` ; `l1: "15.000 €"` (`s1` 70, ligne de base y 868), `l2: "Geldstrafe"`
    (`s2` 28, y 902), `ar: "غرامة"` (`sAr` 30, y 944) ;
  - reflet de `TOI` : `reflet(c, { x: 214, y: 574, w: 652, h: 452 }, 700, 885, 1.2, fn)` → tête x 620–780,
    y 793–965, de trois quarts, tournée vers l'étiquette (`facing: -1`) ; le col est coupé par le bas de la plaque ;
  - mot « سميتك » (`ttl` 50) centré en (670, 680), AU-DESSUS du pointillé, + petite flèche courbe vers le 5e point ;
  - avant-bras `D.main({ manche: "veste", tient: "tournevis", a: 8 })` : paume en (212, 1090), pointe du tournevis
    sur la vis du bas à gauche (226, 1014) ; l'avant-bras sort par le bas vers (150, 1500).
- **Première image (t = 0)** — tout ceci est DÉJÀ visible, sans fondu : la façade, la plaque et ses trois lettres,
  le reflet de `TOI` qui sourit, la main qui tourne la dernière vis, la pastille du haut, la plaquette `BSP`, la ligne
  de dossier, et l'étiquette « 15.000 € » qui arrive en bout de ficelle : `m.build(etiq, -0.12, "drop", { dist: 420,
  dur: 0.34 })` (son premier à-coup tombe à t ≈ 0,00), puis `m.pend(etiq, 0.02, 14, [368, 630], { damp: 1.5,
  freq: 6, idle: 1.0 })`. À t = 0 l'étiquette est en place, lisible, et part en balancier.
- **Construction en cascade** (la façade est là ; ce sont les accessoires qui se posent) : `-0.10` lanterne gauche
  (`"swing"`, pivot (190, 430), 0,4 s) · `-0.04` lanterne droite · `0.02` (le choc de la ficelle) : les deux
  lanternes repartent en pendule (6°), la bulle du niveau saute, les deux vis de rechange sautillent de 6 px ·
  `0.05` le carton (`"left"`, dist 160, 0,3 s) · `0.12` le niveau (`"rise"`, dist 60).
- **Action** :
  - `0` → `b1@3` : la main visse — fente de la vis du bas à gauche (`vis[2]`) à 2 tours/s, la moufle pivote de ± 3°
    à 4 Hz ; `TOI` : `bigsmile`, `blush` ;
  - `b1@غرامة` : battement de l'étiquette (`pulse(…, 0.4, 0.08)`) ;
  - `b1@3` (« 15000 ») : zoom sec ×1,20 sur l'étiquette et le reflet ; `TOI` → `shock` ; la main s'ouvre
    (`serre` 0 → 1 en 0,1 s) et recule de 60 px ; le **tournevis** (nœud `D.tournevis`) tombe de (226, 1060) à la
    corniche (430, 1150) en 0,28 s (`E.in`, rotation 110°), rebondit de 8 px puis roule de 30 px vers la droite en
    0,4 s ; à son arrivée (`b1@3+0.28`) : `c.shake(…, 6, 0.2)`, la bulle du niveau part d'un côté, les vis sautent ;
  - `b1@حيت` : retour ×1,00 ; l'avant-bras sort par le bas (0,25 s) ;
  - `b1@كتبتي` : zoom sec ×1,20 sur « Dr. » ; les vis des trois lettres font un tour (0,3 s), chaque lettre bat
    (`pulse`, 0,3 s, 0,12) à 0,06 s d'écart, la bande de reflet passe ; `TOI` → `worried` + `sweat`, il regarde les
    lettres ;
  - `b1@Dr` : coup de zoom ; quatre étincelles aux arêtes du D et du r ;
  - `b1@قدام` : l'onde court sur le pointillé (`points.onde` 0 → 9 en 0,5 s) ;
  - `b1@سميتك` : « سميتك » s'écrit (`wipe` rtl 0,3 s) + la flèche (`wipe` 0,2 s) ; le 5e point reste gros ;
  - `b1@فألمانيا` : retour ×1,00 ; `TOI` → `sad`, une larme (`tears` 0 → 0,4 en 0,4 s) ; l'étiquette repart en
    balancier (`m.pend(etiq, "b1@فألمانيا", 6, [368, 630])`).
- **Vie** : reflets et étincelles du laiton, lanternes, papillon de nuit, bulle du niveau, rabat du carton,
  clignements et flottement du reflet, étiquette qui ne s'arrête jamais tout à fait (repos 1°).
- **Réagit à l'histoire** : tout ce qui pend repart au choc de la ficelle ; la bulle du niveau et les vis de
  rechange sursautent à chaque choc ; le halo des lanternes baisse de 15 % sur « 15000 » (0,3 s).
- **Textes** — pastille du haut : `Amtsgericht Düsseldorf · 02.08.2019 · 1. Instanz` / « المحكمة الابتدائية · الحكم
  الأول » — grise, taille 24 (largeur 647), `show(0)` (aucun fondu), jusqu'à la coupe. Ligne de dossier (§ 3).
  Sur la plaque : rien d'écrit que le pointillé — c'est le nom du spectateur.
- **Mentions** : plaquette `BSP` (la plaque est un exemple) ; le tribunal, la date, `1. Instanz` et `nicht
  rechtskräftig geworden` sont à l'écran dès t = 0. **Réglette** : absente. **Bulles** : aucune.
- **Affiche** : figer à `b1@Dr+0.2` (plaque, lettres, étiquette, reflet inquiet).

### S2 — C'est arrivé à Düsseldorf, en première instance (accroche B, la carte)

- **Beat** b2 · 3,72 → 6,48 (2,8 s) · **Lieu** : une carte murale d'école · **Entrée** : frappe — la carte descend
  du haut et sa baguette claque (`frappe(c, m, karte, "b2", { dist: 900, x: 540, y: 1340, amp: 9 })` ; le nœud de
  l'Allemagne reçoit le même `m.build`).
- **À comprendre** : ce n'est pas une légende : un médecin, à Düsseldorf, devant l'Amtsgericht.
- **Caméra** : `[{ at: "b2", s: 1.0, cx: 540, cy: 930 }, { at: "b2@Düsseldorf", s: 1.25, cx: 540, cy: 950, d: 0.14,
  ease: "out" }, { at: "b2@فالمحكمة", s: 1.0, cx: 540, cy: 930, d: 0.16, ease: "out" }]` ;
  `c.kick("b2@Düsseldorf+0.4", 0.05)`. Vérifié à ×1,25 (S ≤ 1,43) : médaillon X 150–328, Y 536–714 ; bord est de
  l'Allemagne X 864 ; rien dans la colonne.
- **Couches** : `k.bg()` · feuille de la carte (`D.rollkarte`, baguette en (540, 1340) → feuille x 190–890) ·
  Allemagne · tirets · médaillon · tribunal · épingle · étiquette · HUD.
- **Composition (monde)** :
  - Allemagne : `const geo = drawDE(c, 642, 950, 44)` → x 516–766, y 787–1117 ; **Düsseldorf**
    `geo(6.78, 51.22)` = (540, 949), exactement sur l'axe ; Berlin (722, 892) avec son nom (socle) ;
  - `D.silhouette({ r: 62 })` en (330, 730), pendu à un clou dessiné en (330, 650) ;
  - trajets `D.arc` : médaillon → épingle : A (392, 740), C (470, 800), B (530, 930) ; épingle → tribunal :
    A (528, 962), C (470, 1010), B (440, 1040) ;
  - `D.amtsgericht` en (330, 1090) (x 225–435, y 920–1090) ;
  - étiquette à ficelle `D.etiquette` : ancrage (345, 1096), `L: 50`, corps 300 × 96 (y 1132–1228) :
    `l1: "Missbrauch von Titeln"` (24), `l2: "§ 132a StGB"` (22) ; dessous, hors de l'étiquette : « استعمال لقب
    بلا حق » (`ar strong` 28) centré en (345, 1272).
- **Construction en cascade** : `b2` la carte (frappe : le choc tombe sur la coupe) · `b2+0.10` les coins bas de la feuille
  se mettent à battre.
- **Action** :
  - `b2@لطبيب` : le médaillon `pop` (0,3 s) puis `m.pend` (4°, pivot (330, 650)) ; `b2@لطبيب+0.2` le premier
    trajet se trace jusqu'à `b2@Düsseldorf` ;
  - `b2@Düsseldorf` : zoom sec ×1,25 ; `pinAt(c, 540, 949, "b2@Düsseldorf")` (l'épingle tombe en 0,4 s, vacille) ;
    à `b2@Düsseldorf+0.4` : `m.ripple(540, 949, …, { col: "#9A9A94" })` (ondes GRISES), coup de zoom ;
  - `b2@فالمحكمة` : retour ×1,00 ; le second trajet se trace (0,25 s) ; le tribunal pousse du sol
    (`m.build(…, "b2@فالمحكمة", "rise", { dist: 120, dur: 0.4 })`) ;
  - `b2@فالمحكمة+0.3` : l'étiquette tombe du socle du tribunal (`"drop"`, dist 90) et se balance ; son arabe
    s'écrit à `b2@الابتدائية` (`wipe` rtl 0,3 s).
- **Vie** : coins de la feuille, médaillon pendu, tirets qui défilent, étiquette, lampe de la porte du tribunal.
- **Réagit** : à la chute de l'épingle, le médaillon et la feuille tressaillent (2 px).
- **Textes** — pastille du haut : 1. `Düsseldorf` / « دوسلدورف » — 34 — `pop` à `b2@Düsseldorf`, `hide` à
  `b2@فالمحكمة-0.08` ; 2. `Amtsgericht · 1. Instanz` / « المحكمة الابتدائية · الحكم الأول » — 30 — `pop` à
  `b2@فالمحكمة`.
- **Mentions** : la plaquette bascule en `FALL` à `b2`. **Réglette** : absente (accroche). **Bulles** : aucune.
- **Affiche** : figer à `b2@الابتدائية+0.3`.

### S3 — Un vrai médecin, un vrai doctorat (accroche C, la boucle ouverte)

- **Beat** b3 · 6,48 → 8,85 (2,4 s) · **Lieu** : un mur, deux diplômes encadrés · **Entrée** : frappe — les deux
  cadres tombent au bout de leurs fils (`frappe(c, m, cadreG, "b3", { dist: 300, amp: 9 })`, le droit 0,06 s après :
  `frappe(c, m, cadreD, "b3+0.06", { dist: 300, amp: 0 })`).
- **À comprendre** : il est médecin pour de bon, son doctorat est vrai… et l'amende est là quand même.
- **Caméra** : `[{ at: "b3", s: 1.0, cx: 540, cy: 930 }, { at: "b3@6", s: 1.15, cx: 540, cy: 1010, d: 0.14,
  ease: "out" }]` ; `c.kick("b3@طبيب", 0.04)` ; `c.kick("b3@بدكتوراه", 0.04)`. Vérifié à ×1,15 (S ≤ 1,27) : haut
  des cadres Y 547, médaillon Y 400–542 (entre la plaquette et rien : pas de pastille du haut ici), bas de
  l'étiquette Y 1336.
- **Couches** : `D.mur({ sol: 1345, motif: "rayures" })` (rayures verticales `#EDEDE8` tous les 60 px, plinthe
  1345–1375) · `D.cimaise` à y 566 (x 150–930) · cônes des lampes de tableau · les deux `D.cadre` · médaillon ·
  tampons · lignes arabes · étiquette (ficelle + corps) · HUD.
- **Composition (monde)** :
  - cadre GAUCHE centre (350, 880) (x 210–490, y 700–1060) : `t1: "Approbation"`, `t2: "Facharzt für"`,
    `t3: "Innere Medizin"` ; dessous : « رخصة الطب » (`ar strong` 30) en (350, 1112) puis « اختصاصي فالطب
    الباطني » (26) en (350, 1150) ;
  - cadre DROIT centre (730, 880) (x 590–870) : `t1: "Diplom"`, `t2: "Universität · 1997"`, gribouillis — aucun
    nom d'université ; dessous : « دكتوراه · 1997 » (30) en (730, 1112) ;
  - `D.silhouette({ r: 56 })` en (540, 640), pendu au rail par un fil ;
  - tampons `D.empreinte` : `Arzt ✓` (200 × 76, corps 44, `rot: -8`) en (410, 1000) ; `Doktortitel ✓` (250 × 76,
    corps 38, `rot: -8`) en (735, 1000) (x 610–860 : hors colonne) ;
  - étiquette `D.etiquette` : ancrage (540, 696) (bas du médaillon), `L: 500` → œillet (540, 1196), corps 300 × 140
    (x 390–690, y 1182–1322) : `l1: "15.000 €"` (64), `l2: "Geldstrafe · 1. Instanz"` (22). La ficelle passe dans
    le couloir de 100 px entre les deux cadres.
- **Action** :
  - `b3` : le médaillon est déjà là ; les cadres tombent et tremblent (`m.pend`, 3°) ;
  - `b3@طبيب` : `Arzt ✓` frappe le cadre gauche (`slam(…, 0.28, 10)`), le cadre repart en pendule ; « رخصة
    الطب » s'écrit à `b3@طبيب+0.2` ; « اختصاصي فالطب الباطني » à `b3@3` ;
  - `b3@بدكتوراه` : `Doktortitel ✓` frappe le cadre droit ; « دكتوراه · 1997 » à `b3@بدكتوراه+0.2` ;
  - `b3@6` (le second « بصح ») : zoom sec ×1,15 ; l'étiquette « 15.000 € » tombe du médaillon
    (`m.build(etiq, "b3@6-0.05", "drop", { dist: 500, dur: 0.34 })`, `c.shake("b3@6+0.07", 8, 0.3)`) et se balance
    entre les deux tampons (`m.pend`, 6°, pivot (540, 696)) : la boucle est ouverte, sans point d'interrogation.
- **Vie** : lampes de tableau, cadres, médaillon (pendule de repos 1°), étiquette.
- **Réagit** : chaque tampon fait osciller SON cadre ; la chute de l'étiquette fait osciller les deux.
- **Textes** : ceux des cadres, des tampons et de l'étiquette ; pas de pastille du haut.
- **Mentions** : plaquette `FALL`. **Bulles** : aucune.
- **Affiche** : figer à `b3@6+0.3`.

### S4 — Intro : la plaque « Yassine » (sans « Dr. »)

- **Beats** i1–i3 · 8,85 → 18,10 (9,2 s) · **Lieu** : sa porte d'entrée, vue de face · **Entrée** : `cut`, et la
  plaque « Yassine » qui tombe et claque sur `i1@ياسين`. `summary: false`. Logo du haut masqué (socle).
  **Ni plaquette, ni réglette, ni pastille du haut.**
- **À comprendre** : qui parle, ce qu'est la série, et le geste demandé (j'aime, s'abonner). Le clin d'œil : sa
  plaque de porte dit « Yassine », pas « Dr. ».
- **Caméra** : `[{ at: "i1-0.15", s: 1.06, cx: 540, cy: 900 }, { at: "i2", s: 1.0, cx: 540, cy: 930, d: 0.16,
  ease: "out" }]` ; `c.kick("i3@j'aime", 0.05)` ; `c.kick("i3@abonne", 0.05)`.
- **Couches** : mur de façade uni des deux côtés · `D.porteIntro` (ancrage = centre du hublot (540, 520) ; vantail
  x 240–840, y 300–1400) · la PHOTO dans le hublot · traits du cadre · badge Instagram · plaque « Yassine » ·
  étiquette de sonnette · pastilles · platine d'interphone · cœur, « j'aime », bouton.
- **Composition (monde ; tout le bloc finit à y 1190 → écran Y ≤ 1227, sous la limite de 1300)** :
  - **photo** : `<image href="assets/portrait.png">` 264 × 264 découpée par un cercle r 132 centré en (540, 520) ;
  - **cadre au trait** : deux cercles d'encre (r 132 et r 152, trait 5,5 et 4) + un éclat blanc ;
    **anneau jaune** = le cerclage de laiton du hublot (`D.porteIntro`, r 132 → 152) ;
  - **icône Instagram** (code du socle : carré arrondi blanc + rond + point), échelle 0,9, accrochée en (648, 628) ;
  - **plaque** `D.plaque({ kind: "laiton", w: 420, h: 120, nVis: 2, lignes: [{ t: "Yassine", x: 0, y: 24,
    size: 72, n: 7 }] })` centre (540, 755) (x 330–750, y 695–815) — « Yassine » seul, jamais « Dr. » ;
  - **« @dr.aguilo »** : étiquette de papier dans un porte-étiquette d'acier 360 × 66 centré en (540, 868) ; petit
    glyphe Instagram (socle `hd`) en (402, 868) ; `c.text("@dr.aguilo", 562, 884, 46, "de")` ;
  - pastilles (dans le monde, GRISES, taille 26), centre (540, 962) : `Arzt in Deutschland` / « طبيب فألمانيا » puis
    `echte Fälle · deutsche Gerichte` / « قصص حقيقية من المحاكم » ;
  - **platine** `D.interphone` centre (540, 1115) (x 260–820, y 1040–1190) : **cœur j'aime** (socle
    `PE.props.heart`, taille 1,25) en (380, 1105), mot `j'aime` (`de` 28) en (380, 1172) ; **bouton s'abonner**
    (socle, 300 × 84) centré en (650, 1110) ;
  - béquille de la porte en (800, 890) ; fente à courrier à y 1290 ; paillasson sous y 1400 (décor seulement).
- **Action** :
  - `i1-0.15` : la porte est là (coupe) ; la photo et son anneau `pop` à `i1-0.10` (0,4 s) ; l'icône Instagram à
    `i1+0.05` ;
  - `i1@ياسين` : **frappe** de la plaque, pile sur le prénom (`frappe(c, m, plaque, "i1@ياسين", { dist: 520,
    x: 540, y: 815, amp: 9 })`), ses deux vis font un tour (`vis` 0 → 360 en 0,3 s) ;
  - `i1@ياسين+0.3` : l'étiquette « @dr.aguilo » se révèle (`wipe` 0,3 s) ;
  - `i1@فألمانيا` : pastille 1 (`pop`) ; `i2@حقيقية` : elle sort (`hide` 0,15) ; `i2@حقيقية+0.15` : pastille 2 ;
    `i3` : elle sort ;
  - `i3-0.05` : la platine `pop` (0,3 s) avec le cœur vide et le bouton `+ s'abonner` ;
  - `i3@j'aime` : le cœur se remplit et bat (socle), coup de zoom ; `i3@abonne` : le bouton s'enfonce (échelle
    0,94 → 1 en 0,15 s) et devient `✓ abonné`, coup de zoom.
- **Vie** : voir le tableau (éclat qui tourne sur l'anneau, poussière, étiquette, lente poussée de la photo, reflet
  de la plaque).
- **Textes** : `Yassine` (gravé, 72) · `@dr.aguilo` (46) · les deux pastilles · `j'aime` · `+ s'abonner` → `✓ abonné`.
- **Affiche** : exclue.

### S5 — Toi : du Maroc à l'Allemagne (la carte, 2e forme : le globe)

- **Beat** b4 (début) · 18,10 → 20,00 (1,9 s) · **Lieu** : un globe d'école · **Entrée** : frappe — la sphère
  retombe sur son pied (`frappe(c, m, sphere, "b4-0.30", { dist: 500, x: 540, y: 1250, amp: 9 })`). `summary: false`
  (S11 montre le même globe, complet).
- **À comprendre** : « toi » = celui qui vient d'arriver du Maroc en Allemagne. La 2e personne a un visage.
- **Caméra** : `AXE`, fixe ; `c.kick("b4@لألمانيا+0.3", 0.05)`.
- **Couches** : `k.bg()` · pied du globe · sphère (`D.globe`, centre (540, 920), R 330 → x 210–870, y 590–1250) ·
  petite Allemagne · épingle · noms · point du Maroc · arc · médaillon de `TOI` · mot « نتا » · HUD.
- **Composition (monde)** :
  - petite Allemagne : le contour `DE` du socle par `geoAt(540, 740, 12)` (x 506–574, y 695–785), `MAT.grey`, sans
    Berlin ; **épingle** réduite (×0,55) plantée en (512, 740), déjà là (elle est tombée en S2) ;
  - `Deutschland` (`de` 26) en (540, 646) et « ألمانيا » (`ar strong` 28) en (540, 678) ;
  - **point du Maroc** : rond d'encre r 9 + anneau r 16 en (350, 1000) ; `Marokko` (`de` 28) en (350, 1086),
    « المغرب » (`ar strong` 30) en (350, 1124) — sous le médaillon (qui finit à y 1050) et à 27 px au moins du bord
    de la sphère. **Aucune frontière, aucune côte** (voir risque 6) ;
  - **arc** `D.arc` : A (350, 1000), C (352, 770), B (452, 730) ;
  - **médaillon de `TOI`** : disque blanc r 50 cerclé d'encre + `ph` (tête ×0,72, découpée par le disque) ; départ
    (350, 1000), arrivée (452, 730) — à 88 px à gauche de l'axe ;
  - mot « نتا » (`ttl` 56) en (462, 975), à droite du médaillon, + petite flèche vers lui.
- **Action** :
  - `b4-0.30` : le globe (frappe : choc sur la coupe) ; `b4-0.10` : le point du Maroc et son nom `pop` ;
  - `b4` (« دابا ») : le médaillon de `TOI` `pop` sur le point (0,3 s) ; `b4@نتا` : « نتا » + sa flèche
    (`pop`), coup de zoom 0,04 ;
  - `b4@وصلتي` : « نتا » sort (`hide` 0,15) ; le médaillon suit l'arc (`p` de 0 à 1, `E.inOut`, jusqu'à
    `b4@لألمانيا+0.3`) ; l'arc se trace derrière lui ;
  - `b4@لألمانيا+0.3` : arrivée ; `m.ripple(512, 740, …, { col: "#9A9A94", R: 90 })` ; `TOI` → `bigsmile` ; coup
    de zoom.
- **Vie** : méridiens qui glissent, tirets de l'arc, médaillon qui flotte.
- **Textes** : `Deutschland` / « ألمانيا », `Marokko` / « المغرب », « نتا ». Pas de pastille du haut.
- **Mentions** : la plaquette bascule en `BSP` à `b4-0.30`. **Bulles** : aucune.
- **Affiche** : exclue.

### S6 — Ton diplôme : « Doctorat en Médecine »

- **Beat** b4 (fin) · 20,00 → 22,00 (2,0 s) · **Lieu** : un hall nu, tu viens d'arriver · **Entrée** : frappe — le
  GRAND diplôme tombe (`frappe(c, m, grand, "b4@Doctorat", { dist: 500, x: 540, y: 855, amp: 10 })`).
- **À comprendre** : ce que tu as en main s'appelle « Doctorat en Médecine » — et dans ce mot, tu lis déjà « Dr. ».
- **Caméra** : `AXE`, fixe (un zoom couperait les pieds dans les sous-titres) ; `c.kick("b4@médecine", 0.05)` ;
  `c.kick("b4@المغرب", 0.05)`.
- **Couches** : `D.mur({ sol: 1385, motif: "uni" })` · suspension grise (fil de (540, 420) à l'abat-jour en
  (540, 520), cône crème) · cartons (x 115–245, y 1215–1385) · `D.valise` en (285, 1385) · grand diplôme · lettres
  de laiton · flèches · `TOI` (+ `D.tube` dans le dos) · petit diplôme (devant `TOI`) · `KOL` (+ `D.pochette`) · HUD.
- **Composition (monde)** :
  - **grand diplôme** `D.diplome({ w: 560, h: 270 })` centre (540, 720) (x 260–820, y 585–855) : `Diplôme de`
    (34) / `Doctorat en Médecine` (46, x 324–756) ;
  - `TOI` : pieds (420, 1385), échelle 1,05 (tête de y 931 à 1070), trois quarts, `facing: 1` ; il tient le **petit
    diplôme** `D.diplome({ w: 230, h: 160 })` centre (420, 1150) à deux mains : `reachL` vers (312, 1150),
    `reachR` vers (528, 1150) (par `rl([420, 1385], 1.05, pt)` ; distance épaule → main ≈ 100 px) ; `D.tube` en
    bandoulière : nœud posé à `out.shoulderL` + (−38, 60), incliné de 35°, DERRIÈRE lui ;
  - `KOL` : pieds (680, 1385), échelle 1,0 (tête de y 953), trois quarts, `facing: -1` ; `D.pochette` serrée contre
    sa poitrine en (662, 1185) par `reachR` ; l'autre bras le long du corps ;
  - flèche courbe du petit diplôme vers le grand : de (305, 1072) par (250, 980) à (285, 858), encre 4 px
    (elle passe à GAUCHE de la tête de `TOI`) ;
  - **lettres de laiton** : `motDr(c, m, 300, 585, 60)` → D x 300–350, r x 357–391, point x 397–411, DEBOUT sur le
    bord haut du grand diplôme (y 525–585) ; petite flèche courbe du « D » de « Doctorat » (332, 715) à (325, 600).
- **Action** :
  - `b4@Doctorat` : frappe du grand diplôme, la suspension part en pendule ; le petit diplôme se
    déroule dans les mains de `TOI` (`roule` 1 → 0 en 0,35 s) ; `+0.25` la flèche courbe (`wipe` 0,25 s) ;
  - `b4@médecine` : coup de zoom ; `TOI` → `bigsmile` ; `KOL` regarde le diplôme ;
  - `b4@المغرب` : la petite flèche (`wipe` 0,15 s à `b4@المغرب-0.1`), puis les trois lettres « D », « r », « . »
    SORTENT de derrière le bord du diplôme (`m.build(…, "rise", { dist: 70, dur: 0.35 })`, 0,07 s d'écart), trois
    étincelles ; `TOI` lève les yeux, `blush` ; `KOL` → `smile`.
- **Vie** : suspension, étiquette de la valise, flottement du grand diplôme, respiration et clignements.
- **Réagit** : au choc, l'étiquette de la valise et la suspension repartent.
- **Textes** : ceux du diplôme (français, libellé d'origine : pas de glose). Pas de pastille du haut.
- **Mentions** : plaquette `BSP`. **Bulles** : aucune (l'envie de « Dr. », ce sont les lettres qui sortent du mot).
- **Affiche** : figer à `b4@المغرب+0.35`.

### S7 — La première chose : le cachet, avec « Dr. »

- **Beat** b5 · 22,00 → 24,01 (2,0 s) · **Lieu** : l'atelier du graveur · **Entrée** : frappe — les trois postes
  de l'établi tombent en cascade (`frappe` de l'étau et de sa plaque à `b5-0.05`, amp 8 ; le bloc à `b5`, les cartes
  à `b5+0.06`, amp 0).
- **À comprendre** : à peine arrivé, tu fais faire un cachet, une plaque, des cartes — avec « Dr. » devant ton nom.
- **Caméra** : `[{ at: "b5-0.05", s: 1.0, cx: 540, cy: 930 }, { at: "b5@Dr", s: 1.1, cx: 540, cy: 1060, d: 0.14,
  ease: "out" }]` ; `c.shake("b5@cachet+0.02", 12, 0.3)` ; `c.kick("b5@Dr", 0.05)`. Vérifié à ×1,10 (S ≤ 1,27) :
  la petite plaque commence à X 145, les cartes finissent à X 909 (< 915) ; le haut du panneau perforé sort du
  champ (ce n'est pas le sujet).
- **Couches** : mise en place « Atelier » (ci-dessus) · mini-lettres de laiton sur la petite plaque · `D.tampon`
  · `D.main({ manche: "veste", tient: "tampon" })` · HUD.
- **Composition (monde)** : petite plaque 200 × 84 (centre (330, 990)) : `motDr(c, m, 245, 1002, 30)` (x 245–301)
  + `points: { x0: 320, y: 996, n: 4, pas: 24 }` ; bloc : empreinte à venir (`Dr. ………` / `Arzt`) ; cartes :
  `Dr. ………`. La main monte par le bas-centre et tient le cachet par son col : paume en (550, 880) quand il plane
  (face encrée à y 1010), en (550, 960) quand il frappe (face à y 1090, au centre du bloc).
- **Action** :
  - `b5@حاجة` : la main et le cachet montent du bas (0,2 s) et planent au-dessus du bloc (face encrée à y 1010) ;
  - `b5@cachet` : le cachet S'ABAT sur le bloc (face à y 1090, 0,06 s), secousse 12, la limaille saute, les bons de
    commande claquent ; `b5@cachet+0.17` il se relève de 90 px : l'empreinte est là (`empreinte` 0 → 1) ;
  - `b5@cachet+0.32` : la main pose le cachet sur l'encreur (590, 990) et ressort par le bas (0,2 s) ;
  - `b5@Dr` : zoom sec ×1,10 ; les TROIS « Dr. » battent ensemble — mini-lettres de la plaque (`pulse`), encre de
    l'empreinte (`dr` 0,6 → 1), première carte (`dr` → 1) ; coup de zoom ;
  - `b5@سميتك` : l'onde court sur les pointillés de la plaque et de l'empreinte.
- **Vie** : bons de commande, outils, loupe, limaille, barre de l'étau.
- **Textes** — pastille du haut : 1. `Stempel` / « cachet » — 34 — `pop` à `b5@cachet`, `hide` à `b5@قدام-0.05` ;
  2. `Türschild · Visitenkarte` / « plaque ديال الباب · carte de visite » — 26 — `pop` à `b5@قدام`.
- **Mentions** : plaquette `BSP` — rien de tout cela n'est attribué au médecin de Düsseldorf. **Bulles** : aucune.
- **Affiche** : figer à `b5@Dr+0.3`.

### S8 — En Allemagne, « Dr. » = Promotion (l'explication en image, 1)

- **Beat** b6 · 24,01 → 28,11 (4,1 s) · **Lieu** : la bibliothèque · **Entrée** : frappe — les trois derniers
  livres d'études tombent sur la pile (`frappe` à `b6`, amp 9, puis à `b6+0.08` et `b6+0.16`, amp 0).
- **À comprendre** : les études font une pile ; « Dr. » ne tient que sur un livre de PLUS, posé dessus : la thèse
  de recherche.
- **Caméra** : `AXE`, fixe (un zoom ferait passer la fenêtre sous la pastille du haut) ; `c.kick("b6@Promotion",
  0.06)` ; `c.kick("b6@البحث", 0.05)`.
- **Couches** : mise en place « Bibliothèque » (lampe en (800, 1340)) · ciel et nuages dans la fenêtre · pile ·
  emplacement en pointillé · livre « Dissertation » · lettres de laiton · signe « + » · accolade · pastilles · HUD.
- **Composition (monde)** :
  - **pile d'études** : six `D.livre` posés en (540, 1340 − 46 i), largeurs 300 / 284 en alternance, décalés de
    −6, +5, −3, +7, −4, +3 px ; aucun texte sur les dos ; haut de la pile y 1064 ;
  - **emplacement vide** : rectangle en pointillé (x 400–680, y 1004–1064) ;
  - **le livre de plus** : `D.livre({ w: 280, h: 60, mat: "blanc", icone: "loupe", t: "Dissertation" })` en
    (540, 1064) ;
  - **lettres** : `motDr(c, m, 457, 1004, 90)` → x 457–624, posées sur le livre (y 914–1004) ;
  - signe « + » (Kalam 110, encre) en (760, 1050) ; accolade à gauche de la pile, de (372, 1068) à (372, 1336) ;
  - pastilles de gauche : `Dissertation` / « thèse ديال البحث » — 26 — centre (262, 1010) ; `Studium` /
    « القراية » — 30 — centre (262, 1200).
- **Première image** : table, fenêtre, lampe, les trois premiers livres ; les trois suivants en train de tomber.
- **Action** :
  - `b6@فألمانيا` : pastille du haut 1 ;
  - `b6@Dr` : les trois lettres de laiton apparaissent EN L'AIR (`pop` 0,3 s), ligne de base y 850, elles flottent
    (± 6 px, 0,9 s, ± 4°) ; l'emplacement en pointillé se dessine sur la pile (`wipe` 0,2 s) : il manque un livre ;
  - `b6@Promotion` : le livre blanc TOMBE dans l'emplacement (`frappe(c, m, livreBlanc, "b6@Promotion",
    { dist: 460, x: 540, y: 1064, amp: 10 })`), la pile tasse de 3 px, poussière ; pastille du haut 2 ; coup de zoom ;
  - `b6@thèse` : pastille `Dissertation` (`pop`) ; la petite loupe du dos bat ;
  - `b6@البحث` : les lettres se posent sur le livre, une par une (D, r, point : 0,07 s d'écart, chute de 150 px en
    0,12 s, trois petits chocs), leurs vis font un tour ; coup de zoom ;
  - `b6@زيادة` : le « + » frappe (`slam(…, 0.28, 8)`) à droite de la jointure ;
  - `b6@على` : l'accolade se trace (`wipe` 0,25 s) ; `b6@القراية` : pastille `Studium` (`pop`).
- **Vie** : nuages, chaînette, poussière dans la lumière, reflets du laiton, lettres qui flottent avant de se poser.
- **Textes** — pastille du haut : 1. `in Deutschland` / « فألمانيا » — 30 — `pop` à `b6@فألمانيا`, `hide` à
  `b6@Promotion-0.08` ; 2. `Promotion` / « دكتوراه ديال البحث » — 36 — `pop` à `b6@Promotion`.
- **Mentions** : plaquette `BSP`. **Bulles** : aucune.
- **Affiche** : figer à `b6@القراية+0.3`.

### S9 — Ton diplôme, pour eux : Berufsdoktorat (l'explication en image, 2)

- **Beat** b7 (jusqu'à « المهنة ») · 28,11 → 31,88 (3,8 s) · **Lieu** : la bibliothèque, deux piles · **Entrée** :
  coupe dans le même lieu ; la pile de gauche tombe (`frappe` du 1er livre à `b7`, amp 9, puis un livre toutes les
  0,05 s jusqu'à `b7+0.25`, amp 0).
- **À comprendre** : ta thèse est DANS ta pile d'études ; ta pile s'arrête au niveau de l'examen de médecine. La
  base officielle l'appelle « Berufsdoktorat ».
- **Caméra** : `AXE`, fixe ; `c.kick("b7@Berufsdoktorat", 0.05)`.
- **Couches** : mur · table · fenêtre · lampe en (540, 1340) · pile de DROITE (déjà là) · pile de GAUCHE · petit
  diplôme · planchette · ligne de niveau · écran « anabin » (devant la fenêtre) · textes de l'écran · tampon · HUD.
- **Composition (monde)** :
  - **pile de droite — l'Allemagne** (celle de S8, plus étroite) : six livres en (720, 1340 − 46 i), largeurs
    220 / 208 ; `Dissertation` (210 × 60) de y 1004 à 1064 ; `motDr(c, m, 655, 1004, 70)` (x 655–785) ;
  - **pile de gauche — la tienne** : six livres en (360, 1340 − 46 i), largeurs 220 / 208 ; le 4e (y 1156–1202)
    est `mat: "blanc"` et porte `thèse` (Kalam 22) ;
  - petit diplôme `D.diplome({ w: 200, h: 130 })` centre (360, 1262), `rot: -4`, appuyé contre le bas de la pile ;
  - planchette `D.planche` en (360, 1064) (x 235–485, y 1034–1064) ; au-dessus « الامتحان ديال الطب »
    (`ar strong` 26) centré en (360, 1022) ; ligne de niveau en pointillé à y 1064, de x 485 à x 850 ;
  - **écran** `D.ecran` centre (540, 720) (x 290–790, y 555–885 : il couvre la fenêtre) ; textes ancrés à gauche,
    x 320 : `anabin (KMK)` (`de` 28, y 610) · `Marokko › Diplôme de Doctorat en Médecine` (`de light` 20, y 660) ·
    `„Bei diesem Grad handelt es sich um` (`de` 26, y 730) · `ein Berufsdoktorat …“` (`de` 30, y 774) ·
    `Marokko · Algerien · Tunesien` (`de light` 20, y 852) ; sous l'écran « القاعدة الرسمية ديال الدبلومات »
    (`ar strong` 26) centré en (500, 918) ;
  - tampon `D.empreinte({ text: "Berufsdoktorat", w: 230, h: 60, size: 30, rot: -7 })` en (360, 1262).
- **Action** :
  - `b7` : la pile de gauche tombe, livre après livre ; `b7@ديالك` : le petit diplôme tombe et s'appuie contre elle ;
  - `b7@وخا` : le 4e livre GLISSE de 34 px vers la gauche (0,2 s) : on lit `thèse` ; `b7@thèse` : il bat ;
    `b7@عندهم-0.05` : il rentre dans la pile ;
  - `b7@عندهم` : l'écran entre par la gauche et s'arrête net (`m.build(ecran, "b7@عندهم-0.02", "left", { dist: 520,
    dur: 0.3 })`, `c.shake("b7@عندهم+0.26", 7, 0.25)`) ; en-tête et ligne de recherche (`show` à `+0.15`) ; la
    réponse se tape (`c.write`, ligne 1 de `b7@عندهم+0.2` en 0,5 s) ; la glose arabe s'écrit à `b7@عندهم+0.3` ;
  - `b7@Berufsdoktorat` : la ligne 2 se tape (de `b7@Berufsdoktorat-0.1`, 0,3 s) ; un cadre d'encre se trace
    autour du mot (`wipe` 0,2 s à `+0.25`) ; pastille du haut ; coup de zoom ;
  - `b7@دكتوراه` : la planchette tombe sur TA pile (`"drop"`, dist 200), son arabe à `+0.2` ; le pied de l'écran
    affiche `Marokko · Algerien · Tunesien` ;
  - `b7@8` (« ديال ») : la ligne de niveau se trace vers la droite (`wipe` 0,3 s) : elle arrive SOUS le livre
    blanc de l'autre pile ; `b7@المهنة` : le tampon `Berufsdoktorat` frappe le petit diplôme (`slam(…, 0.28, 8)`).
- **Vie** : curseur de l'écran, chaînette, poussière, reflets du laiton (pile de droite).
- **Textes** — pastille du haut : `Berufsdoktorat` / « دكتوراه ديال المهنة » — 34 — `pop` à `b7@Berufsdoktorat`,
  jusqu'à la coupe (elle reviendra, identique, en S13 : l'écho voulu entre b7 et b10).
- **Mentions** : plaquette `BSP` ; la source est écrite sur l'écran (`anabin (KMK)`). La phrase de la base est à
  faire relire par l'auteur avant affichage (risque 5) — remplacement prêt.
- **Affiche** : figer à `b7@المهنة+0.2`.

### S10 — « ماشي Dr. » : les lettres se dévissent et tombent

- **Beat** b7 (fin) · 31,88 → 32,79 (0,9 s) · **Lieu** : l'atelier, plan rapproché sur l'étau · **Entrée** :
  coupe sèche ; la frappe, ce sont les lettres qui tombent. `summary: false` (trop court pour une case).
- **À comprendre** : donc, pas de « Dr. » : les deux lettres ne tiennent pas sur ta plaque.
- **Caméra** : `[{ at: "b7@ماشي-0.10", s: 1.15, cx: 540, cy: 900 }]`, fixe ; `c.shake("b7@Dr+0.16", 12, 0.3)` ;
  `c.kick("b7@Dr", 0.06)`.
- **Couches** : `D.atelier` (le panneau perforé, ses outils, l'établi — sans le casier, le bloc ni les cartes :
  c'est un autre axe) · `D.etau` recentré (haut des mors en (540, 880)) · **plaque M** 520 × 190 centre
  (540, 800) (x 280–800, y 705–895), serrée par le bas · reflet de `TOI` · lettres · HUD (plaquette `BSP` seule).
- **Composition (monde)** : `motDr(c, m, 320, 828, 70)` (D x 320–379, r x 387–426, point x 434–450) ;
  `points: { x0: 490, y: 818, n: 4, pas: 40 }` ; reflet : `reflet(c, { x: 294, y: 719, w: 492, h: 162 }, 705, 800,
  0.85, fn)`.
- **Action** :
  - `b7@ماشي` : les vis des trois lettres tournent À L'ENVERS (`vis` 0 → −360 en 0,25 s) ; cinq petites vis
    d'acier sautent et tombent ;
  - `b7@Dr` : les trois lettres TOMBENT sur l'établi — D vers (330, 1180) (rotation −70°), r vers (430, 1180)
    (95°), point vers (480, 1180) ; 0,16 s (`E.in`), 0,05 s d'écart, rebond de 12 px ; secousse, coup de zoom ;
    sur la plaque : cinq trous (`trous`) et la trace claire des lettres (`fantome` 0 → 0,8 en 0,2 s) ;
    `TOI` → `shock`, puis `sad` à `b7@Dr+0.25` (il regarde par terre).
- **Vie** : reflet du laiton, limaille, bons de commande.
- **Textes** : aucun (la phrase est dans le sous-titre). **Mentions** : plaquette `BSP`. **Affiche** : exclue.

### S11 — Lui aussi a étudié ailleurs : Téhéran → Düsseldorf (la carte, 3e temps)

- **Beat** b8 · 32,79 → 35,48 (2,7 s) · **Lieu** : le globe de S5 · **Entrée** : frappe — le médaillon SANS visage
  tombe à côté de l'Allemagne (`frappe(c, m, med, "b8-0.10", { dist: 420, x: 628, y: 780, amp: 9 })`).
- **À comprendre** : le médecin de Düsseldorf est dans TA situation : diplômé ailleurs (en Iran), arrivé en Allemagne.
- **Caméra** : `AXE`, fixe ; `c.kick("b8@بحالك", 0.05)` ; `c.kick("b8@فإيران+0.2", 0.04)`.
- **Couches** : `k.bg()` · pied · sphère (centre (540, 920), R 330) · petite Allemagne + épingle (512, 740) · point
  du Maroc et son nom · arc GAUCHE déjà tracé (`p: 1`) · médaillon de `TOI` en (452, 730) · point de l'Iran · arc
  DROIT · petit tube · médaillon du médecin · signe « = » · `2001` · HUD.
- **Composition (monde)** (les mots `Deutschland` / « ألمانيا » de S5 ne sont PAS repris : leur place sert au « = ») :
  - point du Maroc (350, 1000) et ses noms, arc gauche, médaillon de `TOI` en (452, 730) : exactement comme à la
    fin de S5 ;
  - médaillon du médecin `D.silhouette({ r: 50 })` en (628, 730) (x 578–678) — le MIROIR de celui de `TOI` par
    rapport à l'axe (540 ± 88) ;
  - **point de l'Iran** : rond r 9 + anneau r 16 en (730, 1000), miroir du point du Maroc ; `Iran` (`de` 28) en
    (730, 1086), « إيران » (`ar strong` 30) en (730, 1124) (x 695–765 : hors colonne) ; ni frontière ni côte ;
  - **arc droit** `D.arc` : A (730, 1000), C (728, 770), B (628, 730), miroir de l'arc gauche ; un petit `D.tube`
    (échelle 0,5) le suit ;
  - signe « = » (Kalam 60, encre) en (540, 668), entre les deux médaillons, au-dessus de l'Allemagne ;
  - `2001` (`de` 30) en (795, 860), à droite du sommet de l'arc droit.
- **Action** :
  - `b8-0.10` : frappe du médaillon (choc sur la coupe) ; le médaillon de `TOI` sursaute de 6 px ;
  - `b8@Düsseldorf` : l'épingle bat (échelle 1 → 1,3 → 1 en 0,3 s), `m.ripple(512, 740, …, { col: "#9A9A94",
    R: 90 })` ; pastille du haut ;
  - `b8@قرا` : le point de l'Iran et ses deux noms `pop` ;
  - `b8@برا` : l'arc droit se trace jusqu'à `b8@فإيران+0.2`, le petit tube glisse le long (il s'incline selon la
    tangente) ; en même temps les tirets de l'arc GAUCHE se remettent à défiler : les deux trajets vivent ensemble ;
  - `b8@بحالك` : le « = » frappe entre les deux médaillons (`slam(…, 0.28, 7)`), les deux médaillons battent ;
    `TOI` → `worried`, il regarde l'autre médaillon ; coup de zoom ;
  - `b8@فإيران` : `2001` `pop` ; `b8@فإيران+0.2` : l'arc arrive, le tube se range contre le médaillon gris, la vis
    `2001` de la réglette tourne.
- **Vie** : méridiens, tirets des DEUX arcs, médaillons qui flottent.
- **Textes** — pastille du haut : `Düsseldorf` / « دوسلدورف » — 34 — `pop` à `b8@Düsseldorf`, `hide` à
  `b8@بحالك-0.08`. Dans le monde : `Marokko` / « المغرب », `Iran` / « إيران », `2001`.
- **Mentions** : la plaquette bascule en `FALL` à `b8-0.10`. **Réglette** : apparaît (`pop`) à `b8-0.10` ; `2001`
  à `b8@فإيران+0.2`. **Bulles** : aucune.
- **Affiche** : figer à `b8@فإيران+0.4`.

### S12 — Son badge d'hôpital : « Dr. med. (ir) »

- **Beat** b9 · 35,48 → 38,75 (3,3 s) · **Lieu** : un vestiaire d'hôpital sans nom · **Entrée** : frappe — le badge
  tombe au bout de son cordon (`frappe(c, m, badge, "b9", { dist: 600, x: 540, y: 1106, amp: 10 })`, puis
  `m.pend(badge, choc, 8, [540, 566], { damp: 1.6, freq: 6, idle: 0.8 })`).
- **À comprendre** : à l'hôpital, son badge portait bien les deux petites lettres : « (ir) », pour Iran.
- **Caméra** : `[{ at: "b9", s: 1.0, cx: 540, cy: 930 }, { at: "b9@ir", s: 1.15, cx: 540, cy: 860, d: 0.14,
  ease: "out" }]` ; `c.kick("b9@ir", 0.06)`. Vérifié à ×1,15 (S ≤ 1,33) : la tringle passe à Y 549 (sous l'arabe de
  la pastille), la carte va de X 168 à X 913 (< 915), son bas à Y 1267.
- **Couches** : `D.mur({ sol: 1390, motif: "carreaux" })` · `D.patere` centre (540, 566) (crochets à x 230, 385,
  540, 695, 850) · `D.blouse` au crochet x 230 (x 130–330, y 566–1106) · `D.stetho` au crochet x 850 (x 795–905,
  y 566–866) · `D.sabots` en (230, 1390) · **badge** · textes du badge · annotation · HUD.
- **Composition (monde)** — `D.badge` : ancrage (540, 566) ; pince en (540, 726) ; **carte 560 × 360** (x 260–820,
  y 746–1106) :
  - cadre photo 160 × 220 (x 290–450, y 800–1020) avec le pictogramme sans visage ;
  - ligne 1, ligne de base y 880 : `Dr. med.` (`de` 52, début x 474, fin ≈ x 670) puis QUATRE nœuds séparés
    (`de` 52) : `(` en x 684, `i` en 704, `r` en 722, `)` en 748 (à poser à la suite avec `getBBox`, interlettrage
    2 px ; l'ensemble finit vers x 768) ;
  - nom en pointillé : six points (r 5) à partir de x 478, pas 28, à y 940 — aucun nom ;
  - `Assistenzarzt` (`de` 26) en (474, 1000) ; bande du bas (y 1046–1086) : code-barres, croix, `Krankenhaus` ;
  - annotation de la série, écrite « à la main » sur la carte, tournée de −4° : flèche courbe depuis la boucle +
    `= Iran` (`de` 40) en (715, 962) et « إيران » (`ar strong` 40) en (715, 1010) (à droite de `Assistenzarzt`, qui finit à x 633).
- **Action** :
  - `b9` : frappe du badge ; la blouse et le stéthoscope oscillent ; pastille du haut 1 ;
  - `b9@ديالو` : le pictogramme apparaît dans le cadre photo (`photo` 0 → 1, 0,25 s) ;
  - `b9@فالسبيطار` : la bande du bas et `Assistenzarzt` s'impriment (`fonction` 0 → 1, 0,2 s) ;
  - `b9@Dr` : `Dr. med.` s'imprime (`wipe` 0,25 s) ;
  - `b9@ir` : zoom sec ×1,15 ; les quatre signes `(`, `i`, `r`, `)` surgissent (`pop(…, 0.25, 0.4)`, 0,04 s
    d'écart) ; à `b9@ir+0.1` une boucle d'encre se trace autour d'eux (`wipe` 0,2 s) ; à `b9@ir+0.2` la pastille du
    haut 2 (la note de vérité) ; coup de zoom ;
  - `b9@إيران` : la flèche puis `= Iran` / « إيران » s'écrivent (`wipe` 0,25 s ; l'arabe de droite à gauche).
- **Vie** : badge (pendule de repos 0,8°), blouse, stéthoscope, reflet de la pince.
- **Textes** — pastille du haut : 1. `Namensschild` / « badge » — 32 — `pop` à `b9`, `hide` à `b9@Dr-0.05` ;
  2. **note de vérité** `(ir) : Tatsache aus dem Urteil — keine Regel` / « واقعة من الملف، ماشي قاعدة » — 22
  (largeur 563) — `pop` à `b9@ir+0.2`, jusqu'à la coupe.
- **Mentions** : plaquette `FALL` (« laut Urteil » : le badge est décrit dans le jugement). **Réglette** : `2001`
  active. **Bulles** : aucune.
- **Affiche** : figer à `b9@إيران+0.25`.

### S13 — 2009 : la Kammer lui écrit — « Berufsdoktorat, pas Dr. med. »

- **Beat** b10 · 38,75 → 43,22 (4,5 s) · **Lieu** : sa boîte aux lettres, puis la lettre · **Entrée** : frappe —
  l'enveloppe tombe dans la fente (`b10`), puis la LETTRE claque devant (`frappe(c, m, brief, "b10@1", { dist: 700,
  x: 540, y: 1125, amp: 11 })`).
- **À comprendre** : dix ans avant le tribunal, l'Ordre des médecins lui a écrit exactement ce que tu viens
  d'apprendre : c'est un Berufsdoktorat, « Dr. med. » n'est pas possible.
- **Caméra** : `AXE`, fixe (un zoom ferait monter la boîte sous la pastille du haut) ; `c.shake("b10+0.14", 7,
  0.25)` ; `c.kick("b10@Berufsdoktorat", 0.05)` ; `c.kick("b10@Dr", 0.05)`.
- **Couches** : mur de brique (`D.mur({ motif: "carreaux" })` en appareil de brique) · un lierre sur treillage à
  gauche (x 130–260, y 560–880, `m.sway` 1,2°) · **boîte** `D.boite({ kind: "A" })` à l'échelle 0,8, centre
  (540, 700) (x 420–660, y 560–840 ; fente à y 610 ; fenêtre du nom VIDE) · enveloppe 1 · **lettre** `D.brief` ·
  tampon dateur · citations · annotation · main qui signe · HUD.
- **Composition (monde)** — lettre réduite en hauteur pour laisser voir la boîte : feuille 620 × 540, centre
  (540, 1125) (x 230–850, y 855–1395) :
  - en-tête `Ärztekammer Nordrhein` (`de` 36) en (252, 908), filet à y 926 ;
  - tampon dateur `D.empreinte({ text: "08.09.2009", w: 230, h: 66, size: 36, rot: 4 })` en (725, 905) (x 610–840 :
    il ne touche pas l'en-tête, qui finit vers x 607) ;
  - citation Z1 (`de` 24, ancrée à gauche, x 252) : `… um ein Berufsdoktorat handele, welches der` (y 990) /
    `deutschen Promotion nicht entspreche.` (y 1026) ;
  - citation Z2 : `Ein Führen des Titels „Dr. med.“` (y 1100) / `sei daher nicht möglich.` (y 1136) ;
  - annotation de la série sous Z2 : « ماشي «Dr. med.» » (`ttl` 44) centrée en (540, 1205) ;
  - gribouillis du corps (`corps`) : une ligne à y 955, une à y 1063, deux à y 1245 et 1270 — jamais sous un texte ;
  - signature en gribouillis de (420, 1310) à (640, 1300) ; `D.main({ manche: "chemise", tient: "stylo",
    a: 20 })`, paume vers (400, 1350), qui entre par le bas-gauche. **Une main, aucun visage, aucun nom.**
  Les citations sont au style indirect dans le jugement (« handele », « sei ») : les recopier depuis la source avant
  affichage (risque 4), sans les réécrire.
- **Action** :
  - `b10` : la boîte est là ; l'enveloppe `kammer` tombe de (540, 300) dans la fente en 0,14 s, le clapet claque
    (`clapet` : pendule de 30° amorti) ; elle reste à demi sortie ;
  - `b10@1` (« 2009 ») : frappe de la lettre (elle a ses deux plis) ; `b10@1+0.25` : le tampon dateur frappe
    (`slam(…, 0.28, 8)`), son encre brille 0,8 s ; la vis `2009` de la réglette tourne à `b10@1` ;
  - `b10@Ärztekammer` : l'en-tête se révèle (`tete` 0 → 1, 0,3 s) ; pastille du haut 1 ;
  - `b10@كتبات` : la main entre (0,2 s) et SIGNE (`signe` 0 → 1 jusqu'à `b10@ليه+0.2`, la moufle avance de 220 px
    en tremblant de ± 3°), puis ressort ; en même temps Z1 s'écrit (deux lignes, `wipe` 0,3 s, 0,15 s d'écart) ;
  - `b10@Berufsdoktorat` : cadre d'encre autour du mot `Berufsdoktorat` de Z1 (`wipe` 0,2 s) ; pastille du haut 2
    — la MÊME qu'en S9 ; coup de zoom ;
  - `b10@ماشي` : Z2 s'écrit (deux lignes, 0,2 s) ; `b10@Dr` : un trait d'encre barre `„Dr. med.“` (`wipe` 0,15 s),
    coup de zoom ; `b10@med` : l'annotation « ماشي «Dr. med.» » s'écrit (`wipe` rtl 0,3 s).
- **Vie** : lierre, clapet, coin de la feuille, encre du tampon.
- **Textes** — pastille du haut : 1. `Ärztekammer Nordrhein` / « هيئة الأطباء » — 30 — `pop` à
  `b10@Ärztekammer`, `hide` à `b10@Berufsdoktorat-0.08` ; 2. `Berufsdoktorat` / « دكتوراه ديال المهنة » — 34 —
  `pop` à `b10@Berufsdoktorat`.
- **Mentions** : plaquette `FALL` — les deux phrases sont rapportées par le jugement (« laut Urteil »).
  **Réglette** : `2009`. **Bulles** : aucune.
- **Affiche** : figer à `b10@med+0.2`.

### S14 — Ensuite : son site et deux comptes

- **Beat** b11 (début) · 43,22 → 44,77 (1,6 s) · **Lieu** : un écran sur un bureau · **Entrée** : frappe — le
  poste tombe sur le bureau (`frappe(c, m, poste, "b11", { dist: 560, x: 540, y: 1066, amp: 10 })`).
  `summary: false` (S15 reprend le site et les comptes).
- **À comprendre** : plus tard, à son cabinet : une liste de prix, des mentions légales, deux comptes suivis par
  des dizaines de milliers de personnes — signés « Dr. » et « Dr. med. ».
- **Caméra** : `AXE`, fixe ; `c.kick("b11@Instagram+0.12", 0.04)`.
- **Couches** : `D.mur({ motif: "uni" })` · `D.poste` (écran : coque x 224–856, y 564–1016 ; pied ; bureau : fond
  y 1066, bord avant y 1300, façade jusqu'à 1400) · `D.navigateur` dans l'écran (x 240–840, y 580–1000) · textes
  de la page · deux `D.fiche` debout sur le bureau · HUD.
- **Composition (monde)** :
  - page, colonne gauche (x 280–520) : `Preisliste` (`de` 28) en (400, 700), « لائحة الأثمنة » (`ar strong` 26)
    en (400, 734), rangées de gribouillis + `€` (y 760–890), puis `Dr. ………` (`de` 30) en (400, 928) et
    `Dr. med. ………` (`de` 30) en (400, 966) ;
  - colonne droite (x 560–800) : `Impressum` (`de` 28) en (680, 700), « معلومات مول الموقع » (26) en (680, 734),
    gribouillis, `Dr. med. ………` (`de` 30) en (680, 928) ;
  - fiches : `D.fiche({ nom: "dr_………", n: "40.000" })` centre (360, 1165) (x 215–505, y 1070–1260) ;
    `D.fiche({ nom: "dr.med.………", n: "über 16.000" })` centre (720, 1165) (x 575–865) ; avatar = `D.silhouette`
    (r 44). **Aucun vrai nom de compte, aucun logo, aucun prix, aucun acte.**
- **Action** : `b11` frappe du poste (page encore vide) · `b11@site` : la page se remplit (`rows` 0 → 1, 0,3 s),
  les trois lignes de nom s'écrivent à `b11@site+0.15` (`wipe` 0,2 s) · `b11@Instagram` : les deux fiches tombent
  sur le bureau (`"drop"`, dist 300, 0,08 s d'écart ; `c.shake("b11@Instagram+0.12", 6, 0.2)`), leurs compteurs
  montent (`c.count`, 0 → 40 000 et 0 → 16 000 en 0,4 s, format `40.000` / `über 16.000`).
- **Vie** : curseur, anneaux des avatars.
- **Textes** — pastille du haut : `2015 · eigene Praxis` / « cabinet ديالو » — 28 — `show("b11")`.
- **Mentions** : plaquette `FALL` (liste de prix, Impressum, noms de compte et nombres d'abonnés : « laut
  Urteil »). **Réglette** : `2015` à `b11`. **Affiche** : exclue.

### S15 — Les deux lettres tombent (le cœur visuel)

- **Beat** b11 (fin) · 44,77 → 46,05 (1,3 s) · **Lieu** : même mur, trois rangées · **Entrée** : coupe ; frappe du
  petit badge (`frappe(c, m, mini, "b11@هاد", { dist: 400, x: 540, y: 845, amp: 8 })`).
- **À comprendre** : du badge au site, « (ir) » a disparu : il ne reste que « Dr. med. ». Ce sont CES deux lettres.
- **Caméra** : `AXE`, fixe ; `c.kick("b11@الجوج", 0.05)` ; `c.shake("b11@طاحو+0.26", 9, 0.3)`.
- **Couches** : `D.mur({ sol: 1345, motif: "uni" })` · petite tringle (x 440–640, y 545–556) · **rangée A** : badge
  `mini` · **rangée B** : bande du site · **rangée C** : deux pilules · les quatre signes (au-dessus de tout) · HUD.
- **Composition (monde)** :
  - **A** — `D.badge({ mini: true })` : crochet (540, 548), pince (540, 580), carte 480 × 250 (x 300–780,
    y 595–845), sans photo ; ligne de base y 760 : `Dr. med.` (`de` 60, de x 372 à ≈ 598), puis `(` en x 612,
    `i` en 636, `r` en 658, `)` en 688 (quatre nœuds) ;
  - **B** — `D.navigateur({ bande: true })` centre (540, 1000) (x 240–840, y 940–1060) : `Preisliste · Impressum`
    (`de light` 18) en (540, 962) ; `Dr. med. ………` (`de` 52) en (540, 1030) ;
  - **C** — `D.fiche({ kind: "pilule", nom: "dr_………" })` centre (385, 1170) (x 245–525) ;
    `D.fiche({ kind: "pilule", nom: "dr.med.………" })` centre (695, 1170) (x 555–835) ;
  - sol à y 1345 : les signes atterrissent à y 1338 — `(` en x 628, `i` en 668, `r` en 718, `)` en 770.
- **Action** :
  - `b11@هاد` : frappe du badge ; B et C sont déjà là (`pop` à `+0.05` et `+0.12`) ; la note de vérité est à
    l'écran dès la 1re image ;
  - `b11@الجوج` : les quatre signes frétillent (± 8°, 6 Hz), une boucle d'encre les entoure ; coup de zoom ;
  - `b11@طاحو` : ils SE DÉTACHENT et tombent — 0,26 s (`E.in`), rotations `(` −80°, `i` +200°, `r` −150°, `)` +95°,
    ils passent DEVANT B et C, rebondissent de 10 px, quatre petits chocs à 0,04 s d'écart, secousse ; sur le badge
    il reste un blanc ; au même instant un trait d'encre se trace sous chaque forme sans « (ir) » (`wipe` 0,2 s) :
    `Dr. med.` (B), `dr_` et `dr.med.` (C), qui battent une fois.
- **Vie** : badge qui pend, curseur de la bande, anneaux des pilules, signes tombés qui roulent encore de 4°.
- **Textes** — pastille du haut : la **note de vérité** `(ir) : Tatsache aus dem Urteil — keine Regel` /
  « واقعة من الملف، ماشي قاعدة » — 22 — `show("b11@هاد")`.
- **Mentions** : plaquette `FALL`. « (MA) » n'apparaît pas, ni ici ni ailleurs. **Réglette** : `2015`.
- **Affiche** : figer à `b11@طاحو+0.14` (les quatre signes EN TRAIN de tomber, vers y 1000–1100 : une fois au sol,
  à y 1338, ils seraient hors du recadrage des cases, qui s'arrête à y 1310).

### S16 — 2017 : elle lui écrit de nouveau — « enlève-le »

- **Beat** b12 (début) · 46,05 → 47,86 (1,8 s) · **Lieu** : la boîte aux lettres de S13, deux plis · **Entrée** :
  frappe — la 2e lettre claque sur la 1re (`frappe(c, m, brief2, "b12", { dist: 700, x: 540, y: 1125, amp: 11 })`).
- **À comprendre** : huit ans après, deuxième lettre : retire « Dr. med. » de ton site, c'est punissable.
- **Caméra** : `AXE`, fixe ; `c.kick("b12@1+0.25", 0.04)` ; `c.kick("b12@5", 0.05)`.
- **Couches** : mur de brique, lierre, boîte (comme S13) avec DEUX enveloppes dans la fente · **lettre 1**
  (`gris: 0.7`), centre (480, 1060), `rot: -3` : on en voit le haut (y 790–855), avec son tampon `08.09.2009` grisé
  en (640, 822) · **lettre 2**, feuille 620 × 540, centre (540, 1125) · tampon dateur · citation · mini-bande du
  site · HUD.
- **Composition (monde)** — lettre 2 :
  - en-tête `Ärztekammer Nordrhein` (`de` 36) en (252, 908) ; tampon dateur `09.01.2017` (230 × 66, corps 36,
    `rot: -3`) en (725, 905) ;
  - citation Z3 (`de` 24, x 252) : `… berufsrechtlich nicht zulässig und als` (y 990) / `Missbrauch von Titeln
    gemäß § 132a StGB` (y 1026) / `strafbar …` (y 1062) ;
  - gribouillis du corps : lignes à y 955, 1100, 1128, 1280, 1305 ;
  - la demande, montrée et non citée : `D.navigateur({ bande: true })` à l'échelle 0,7 (420 × 84), centre
    (540, 1200), avec `Dr. med. ………` (`de` 36) ; par-dessus, un signe de correcteur : boucle d'encre autour de
    `Dr. med.` + queue qui sort vers la marge (le « deleatur »).
- **Action** : `b12` frappe · `b12@1` (« 2017 ») : vis `2017` de la réglette ; `b12@1+0.25` le tampon dateur
  frappe (`slam(…, 0.28, 8)`), coup de zoom · `b12@عاودات` : l'en-tête se révèle, pastille du haut 1 ·
  `b12@كتبات` : Z3 s'écrit (trois lignes, `wipe` 0,2 s, 0,1 s d'écart) ; un trait ondulé souligne `§ 132a StGB` et
  `strafbar` à `b12@ليه` · `b12@5` (« حيدها ») : la mini-bande `pop`, la boucle du correcteur se trace (`wipe` 0,2 s),
  pastille du haut 2, coup de zoom.
- **Vie** : lierre, clapet, coins des deux feuilles, encre du tampon.
- **Textes** — pastille du haut : 1. `2. Brief · 09.01.2017` / « عاودات كتبات ليه » — 28 — `pop` à
  `b12@عاودات`, `hide` à `b12@5-0.08` ; 2. `entfernen` / « حيدها » — 36 — `pop` à `b12@5`.
- **Mentions** : plaquette `FALL`. **Réglette** : `2017`. **Bulles** : aucune.
- **Affiche** : figer à `b12@5+0.25`.

### S17 — Il ne l'enlève pas ; elle le dénonce

- **Beat** b12 (fin) · 47,86 → 49,42 (1,6 s) · **Lieu** : l'écran de S14 · **Entrée** : frappe du poste
  (`frappe(c, m, poste, "b12@6", { dist: 560, x: 540, y: 1066, amp: 10 })`).
- **À comprendre** : les années passent, la page ne change pas ; alors la Kammer porte plainte.
- **Caméra** : `AXE`, fixe.
- **Couches** : `D.mur` · `D.poste` · `D.navigateur` (x 240–840, y 580–1000) · ligne de nom · tampon · sur le
  bureau : `D.dateur` en (330, 1300) (x 265–395, y 1150–1300) et `D.bac` en (700, 1300) (x 590–810) · enveloppe
  · HUD.
- **Composition (monde)** : dans la page, une seule ligne, grande : `Dr. med. ………` (`de` 60) centrée en
  (540, 790) ; flèche de rechargement dans la barre de titre ; tampon `D.empreinte({ text: "angezeigt", w: 330,
  h: 96, size: 52, rot: -8 })` en (540, 920) ; enveloppe `D.enveloppe({ kind: "kammer", w: 200, h: 130 })` qui tombe
  dans la bannette (arrivée (700, 1235)).
- **Action** : `b12@6` frappe ; dateur sur `2017` · `b12@حيدهاش` : pastille du haut 1 ; la page se RECHARGE
  trois fois (`recharge` à `b12@حيدهاش`, `+0.12`, `+0.24` : elle clignote, la ligne revient intacte) ; la
  molette du dateur tourne de deux crans (`2018` à `+0.06`, `2019` à `+0.20`) · `b12@ودارت` : le tampon `angezeigt`
  frappe (`slam(…, 0.28, 11)`), pastille du haut 2 · `b12@شكاية` : l'enveloppe tombe dans la bannette (`"drop"`,
  dist 200), petit choc.
- **Vie** : curseur, flèche de rechargement, molette du dateur qui vibre encore après chaque cran.
- **Textes** — pastille du haut : 1. `nicht entfernt` / « ما حيدهاش » — 32 — `pop` à `b12@حيدهاش`, `hide` à
  `b12@ودارت-0.08` ; 2. `angezeigt · laut Presse` / « دارت بيه شكاية · حسب الصحافة » — 26 — `pop` à `b12@ودارت`.
- **Mentions** : plaquette `FALL` pour « il ne l'a pas enlevé » (les deux jugements) ; **`laut Presse`** pour la
  dénonciation (deux médias, pas de jugement) : c'est dans la pastille. Le destinataire de la plainte n'est pas
  montré (sources divergentes). **Réglette** : `2017`.
- **Affiche** : figer à `b12@شكاية+0.25`.

### S18 — Le tribunal, 1er temps : un Strafbefehl écrit, et l'opposition

- **Temps** : la pause avant b13 + « في 2019 » · 49,42 → 50,28 (0,9 s) · **Lieu** : un bureau, une enveloppe ·
  **Entrée** : frappe — LA transition signature au sens propre : une lettre tombe et claque
  (`frappe(c, m, sb, "b12@end+0.05", { dist: 700, x: 540, y: 1020, amp: 12 })`). `summary: false`.
- **À comprendre** : d'abord une peine ÉCRITE, sans audience ; il la refuse.
- **Caméra** : `AXE`, fixe ; `c.kick("b13@1", 0.05)`.
- **Couches** : `D.mur({ sol: 1344 })` + plateau de bureau (dalle de y 1320 à 1344) · `D.strafbefehl` (ancrage
  (540, 1020) : enveloppe NEUTRE x 280–800, y 1020–1320 ; feuille x 320–760, y 600–1020, `sorti: 1`) · étiquette
  · tampon · HUD.
- **Composition (monde)** : sur la feuille : `Amtsgericht Düsseldorf` (22, y 650), `Strafbefehl` (64, y 730),
  `25.06.2019` (40, y 795) ; étiquette `D.etiquette` : ancrage (760, 760) (un trombone sur le bord droit),
  `L: 40`, corps 250 × 84 (x 635–885, y 786–870) : `l1: "13.500 €"` (40), `l2: "laut Presse"` (20) ; dessous
  « حسب الصحافة » (`ar strong` 26) en (760, 905) ; tampon `D.empreinte({ text: "EINSPRUCH", w: 320, h: 90,
  size: 54, rot: -10 })` en (500, 900).
- **Action** : `b12@end+0.05` frappe (la feuille est déjà sortie et lisible à la 1re image) · `b13` : l'étiquette
  tombe (`"drop"`, dist 120) et se balance · `b13@1` (« 2019 ») : `EINSPRUCH` frappe (`slam(…, 0.28, 10)`),
  pastille du haut 2, vis `2019` de la réglette, coup de zoom.
- **Textes** — pastille du haut : 1. `Strafbefehl` / « عقوبة مكتوبة بلا جلسة » — 30 — `show("b12@end+0.05")`,
  `hide` à `b13@1-0.05` ; 2. `Einspruch` / « ما قبلش » — 36 — `pop` à `b13@1`.
- **Mentions** : `laut Presse` sur les 13 500 € (une seule agence). Aucun lien de cause à effet n'est montré entre
  l'opposition et le montant suivant. **Affiche** : exclue.

### S19 — Le tribunal, 2e temps : le banc du juge, de face (forme imposée, revue par le dossier)

> **Refait le 26.11.2026 (contrôle des ressemblances de la saison).** La première version montrait la salle
> « vue du fond », l'accusé et son avocat de DOS : c'est la forme imposée d'AKTE 05 (salle vue du fond, deux
> accusés de dos) et celle d'AKTE 09 (les parents de dos sur le banc), et ses fenêtres à lames verticales étaient
> celles de l'audience d'AKTE 06. Ici, comme partout dans l'épisode : plein axe, symétrique, et **la caméra est
> assise à la place de l'accusé** — l'épisode parle à « نتا », c'est donc « toi » que le juge regarde. On ne voit
> ni dos, ni fenêtre à stores. (`scenario.md` écrit encore « costume gris » : il n'est plus montré, rien d'autre
> ne change.)

- **Beat** b13 (« المحكمة حكمات عليه بـ60 Tagessätze ») · 50,28 → 52,22 (1,9 s) · **Lieu** : le banc de
  l'Amtsgericht, vu DE FACE depuis la table de la défense · **Entrée** : frappe — le dossier tombe sur le banc du
  juge (`frappe(c, m, dossier, "b13@المحكمة", { dist: 300, x: 450, y: 930, amp: 8 })`).
- **À comprendre** : une vraie audience, un seul juge ; il lit, puis il lève les yeux — vers nous. Ni guichet ni
  marteau (aucune source ; un tribunal allemand n'a pas de marteau).
- **Caméra** : `AXE`, fixe ; `c.kick("b13@5", 0.05)`.
- **Couches (arrière → avant)** : `D.salleFace` · `RIC` · `D.banc` (+ dossier, code gris, les deux lettres de
  laiton) · `STA` · `D.tableProc` · `GRE` · `D.bureauGreffe` · `D.tableDefense` (bord seulement) · deux
  `D.platzschild` · HUD.
- **Mise en place (monde) — fixe, symétrique autour de x = 540** :

  | Élément | Position | Remarque |
  |---|---|---|
  | `D.salleFace` | mur clair uni jusqu'à y 1000 ; soubassement PEINT (bande grise unie, filet d'encre à y 1000) de y 1000 à 1150 ; sol uni à partir de y 1150 | la zone x 235–845, y 380–535 est du mur NU. Ni boiserie, ni lambris, ni parquet à motif |
  | deux vasistas hauts | x 150–290 et x 790–930, y 570–700, verre dépoli (hachure très pâle), SANS store ni lame | deux rais de lumière pâle descendent en biais vers le banc (opacité 0,10) ; rien sous y 700 |
  | dossier haut du fauteuil du juge | x 470–610, y 760–930 (`MAT.mid`, deux clous) | derrière `RIC` : il donne l'axe |
  | `D.banc` | x 330–750, dessus à y 930, façade jusqu'à y 1150 | pupitre incliné au centre ; code épais GRIS en (640, 930) ; le dossier tombe en (450, 930) ; **les deux lettres de laiton « D » et « r »** (`motDr(c, m, 352, 930, 44, { point: false })`, x 352–419) posées debout sur le banc, à gauche du dossier : ce sont les pièces du procès |
  | `RIC` | pieds (540, 1160), échelle 0,80, de face, DERRIÈRE le banc | on voit sa tête et ses épaules (y 814–930) ; il tient une feuille (90 × 120) à deux mains devant lui, vers (540, 880) |
  | `D.tableProc` + `STA` | table x 140–330, dessus y 1090, façade jusqu'à 1230 ; `STA` pieds (235, 1250), échelle 0,85, trois quarts, `facing: 1` | bras le long du corps : la table cache ses mains |
  | `D.bureauGreffe` + `GRE` | bureau x 700–860, dessus y 1090 ; petit écran x 800–850, y 1030–1090 ; clavier ; `GRE` pieds (775, 1250), échelle 0,82, trois quarts, `facing: -1` | ses mains sur le clavier : `reachL` / `reachR` vers (760, 1085) et (790, 1085), ± 4 px en alternance |
  | `D.tableDefense` (bord) | plateau en légère plongée de x 240 à 840, bord arrière à y 1300, il sort par le bas du cadre (y 1420) | c'est NOTRE table : la caméra est derrière elle |
  | `D.platzschild({ text: "Verteidiger" })` | pied centré (385, 1300), plaque 230 × 64 (x 270–500, y 1232–1296) | chevalet de table en tôle émaillée, face vers le juge ET vers nous (texte lisible) |
  | `D.platzschild({ text: "Angeklagter", picto: true })` | pied centré (695, 1300), plaque 230 × 64 (x 580–810, y 1232–1296) | porte le pictogramme sans visage (`D.silhouette`, r 20, `cadre: "aucun"`) à gauche du mot : c'est « lui » — et c'est la place où l'on est assis |

  Aucun corps n'en touche un autre : `STA` x 190–280, `RIC` x 480–600, `GRE` x 735–825 ; les deux chevalets
  (y 1232–1296) sont sous les mains de `STA` et de `GRE` et finissent à x 810 (hors de la colonne des boutons).
- **Action** :
  - `b13@المحكمة` : frappe du dossier — les deux lettres de laiton sautent de 8 px et retombent (0,2 s) ; tout le
    monde est debout ; pastille du haut 1 ;
  - `b13@حكمات` : `RIC` lève sa feuille de 25 px et lit (yeux baissés), SANS bouger les lèvres ; `GRE` tape ;
  - `b13@عليه` : `RIC` lève les yeux **droit vers la caméra** (`look2: [0, 0.1]`) ; `STA` tourne le regard vers
    nous aussi ; le chevalet `Angeklagter` bascule de 7° vers l'avant et revient à 3° (0,4 s) : il accuse le coup ;
  - `b13@5` (« بـ60 ») : `RIC` pose la feuille sur le pupitre (0,2 s) ; pastille du haut 2 ; coup de zoom.
- **Vie** : poussière dans les deux rais (`m.dust`, blanche), reflet qui balaie les deux lettres de laiton,
  respiration de chacun, clignements, mains de `GRE`.
- **Textes** — pastille du haut : 1. `Amtsgericht Düsseldorf · 02.08.2019` / « المحكمة الابتدائية » — 26 —
  `show("b13@المحكمة")`, `hide` à `b13@5-0.08` ; 2. `60 Tagessätze` / « غرامة بالأيام » — 36 — `pop` à `b13@5`.
  Sur les chevalets : `Verteidiger`, `Angeklagter` (Kalam 26) — annotations de la série, pas des citations.
- **Mentions** : la plaquette bascule en **`REKO`** (`Rekonstruktion` · « مشهد تمثيلي ») : l'image du banc est
  reconstituée ; le juge unique, la procureure, l'avocat (son chevalet) et la greffière sont sourcés (jugement,
  presse). **Bulles** : aucune — pas de juge qui parle. **Réglette** : `2019`.
- **Affiche** : figer à `b13@5+0.2`.

### S20 — La sanction : deux étiquettes sur deux lettres (forme imposée, revue par le dossier)

- **Beat** b13 (« يعني 60 يوم من خلصتو ») · 52,22 → 53,60 (1,4 s) · **Lieu** : le rebord · **Entrée** : frappe —
  le « D » puis le « r » géants tombent sur le rebord (`frappe` du D à `b13@يعني`, du r à `b13@يعني+0.06` ; amp 11).
- **À comprendre** : 60 jours × ce qu'il gagne en un jour = 15 000 € — en première instance.
- **Caméra** : `AXE`, fixe ; `c.kick("b13@خلصتو+0.15", 0.05)`.
- **Couches** : `D.mur({ motif: "uni" })` · `D.rebord({ w: 460 })` en (530, 800) (x 300–760) · lettres · deux
  étiquettes · plaque du résultat · plaquette `1. Instanz` · HUD.
- **Composition (monde)** :
  - `motDr(c, m, 372, 800, 200, { point: false })` → D x 372–540, r x 564–676 (y 600–800) ;
  - étiquette 1 (`D.etiquette`, ancrage (410, 824), `L: 56`, corps 290 × 140 → x 265–555, y 866–1006) :
    `l1: "60 Tagessätze"` (40), `ar: "60 يوم"` (30) ;
  - étiquette 2 (ancrage (700, 824), `L: 56`, corps 260 × 140 → x 570–830) : `l1: "× 250 €"` (56),
    `l2: "pro Tag"` (22) ;
  - résultat : `D.plaque({ kind: "email", w: 470, h: 120, nVis: 2, lignes: [{ t: "= 15.000 €", size: 84 }] })`
    centre (540, 1150) (y 1090–1210) ; `D.plaque({ kind: "email", w: 220, h: 54, lignes: [{ t: "1. Instanz",
    size: 30 }] })` centre (540, 1262) ; « الحكم الأول » (`ar strong` 28) en (540, 1330).
- **Action** : `b13@يعني` frappe des lettres ; `+0.12` l'étiquette 1 tombe (`"drop"`, dist 120)
  et part en balancier (10°) · `b13@8` (« 60 ») : elle bat (`pulse`) · `b13@من` : l'étiquette 2 tombe ·
  `b13@خلصتو` : elle bat ; `b13@خلصتو+0.05` : la plaque du résultat frappe (`frappe(…, { dist: 400, x: 540,
  y: 1210, amp: 10 })`), ses vis tournent ; `+0.25` `1. Instanz` `pop` ; `+0.3` son arabe (`wipe` rtl).
- **Vie** : reflets du laiton, étiquettes, étincelles.
- **Textes** — pastille du haut : `Tagessatz = Netto pro Tag` / « يوم من خلصتو » — 26 — `show("b13@يعني")`.
  Non retenus, faute de temps (en réserve pour une version longue) : `9.700 € netto im Monat`, `die Vielzahl der
  Verwendungen`.
- **Mentions** : la plaquette revient en `FALL` ; `1. Instanz` sous le montant. Les étiquettes disent le CALCUL du
  jugement (60 × 250), pas un prix par lettre. **Réglette** : `2019`.
- **Affiche** : figer à `b13@خلصتو+0.4`.

### S21 — Appel des deux côtés : ce jugement n'est jamais devenu définitif

- **Beat** b14 · 53,60 → 56,54 (2,9 s) · **Lieu** : le rebord (même lieu) · **Entrée** : coupe sèche ; la frappe
  est celle des deux feuilles à `b14@دارو`.
- **À comprendre** : lui ET le parquet ont fait appel : les 15 000 € n'ont jamais été définitifs.
- **Caméra** : `AXE`, fixe (un zoom ferait entrer les flèches sous la pastille) ; `c.kick("b14", 0.04)` ;
  `c.shake("b14@دارو+0.26", 10, 0.3)` ; `c.kick("b14@نهائي", 0.06)`.
- **Couches** : `D.mur` · `D.rebord({ w: 300 })` en (540, 830) (x 390–690) · lettres · étiquette · deux
  `D.feuille` · leurs flèches · tampon · citation · HUD.
- **Composition (monde)** :
  - `motDr(c, m, 410, 830, 170, { point: false })` → D x 410–553, r x 573–668 ;
  - étiquette (ancrage (540, 852), `ecart: 80`, `L: 158` → œillet (540, 1010) ; corps 360 × 190 → x 360–720,
    y 996–1186) : `l1: "15.000 €"` (72), `l2: "1. Instanz"` (26) ;
  - feuille GAUCHE centre (255, 800) (x 140–370, y 660–940) : `t: "Berufung"`, `sub: "Angeklagter"` ; dessous
    « المتهم » (`ar strong` 26) en (255, 985) ;
  - feuille DROITE centre (825, 800) (x 710–940, au-dessus de y 960) : `t: "Berufung"`, `sub:
    "Staatsanwaltschaft"` ; dessous « النيابة » (26) en (825, 985) (x 790–860) ;
  - tampon `D.empreinte({ text: "nicht rechtskräftig", w: 400, h: 84, size: 40, rot: -8 })` en (540, 1095) ;
  - citation `„… zu keinem Zeitpunkt in Rechtskraft erwachsen …“` (`de` 22) centrée en (540, 1262) ; source
    `laut Urteil · LG Düsseldorf, 16.11.2021` (`de light` 18) en (540, 1296) ; « عمره ما ولى نهائي » (`ttl` 44)
    en (540, 1356).
- **Action** :
  - `b14` : coupe ; l'étiquette se balance (elle vient de S20) ; coup de zoom ;
  - `b14@دارو` : les DEUX feuilles entrent en même temps, de la gauche et de la droite (`m.build(…, "left" /
    "right", { dist: 300, dur: 0.3 })`), et claquent contre le mur (secousse) ;
  - `b14@الاستئناف` : leurs flèches poussent vers le HAUT (`fleche` 0 → 1 en 0,3 s, jusqu'à y 585) ; les deux
    gloses arabes s'écrivent ; pastille du haut 1 ;
  - `b14@وهاد` : l'étiquette bat ; `b14@عمره` : la citation s'écrit (`wipe` 0,4 s), sa source à `+0.3` ;
  - `b14@نهائي` : le tampon `nicht rechtskräftig` frappe l'étiquette (`slam(…, 0.28, 12)`), elle grisonne
    (`gris` 0 → 0,6) ; pastille du haut 2 ; « عمره ما ولى نهائي » s'écrit à `+0.1` ; coup de zoom.
- **Vie** : étiquette, coins des feuilles, reflets.
- **Textes** — pastille du haut : 1. `Berufung` / « الاستئناف » — 36 — `pop` à `b14@الاستئناف`, `hide` à
  `b14@نهائي-0.08` ; 2. `nicht rechtskräftig` / « ماشي نهائي » — 34 — `pop` à `b14@نهائي`.
- **Mentions** : plaquette `FALL` ; la citation porte sa source. **Réglette** : `2019`.
- **Affiche** : figer à `b14@نهائي+0.3`.

### S22 — Le dossier entre dans un autre procès (une phrase, neutre)

- **Beat** b15 · 56,54 → 58,30 (1,8 s) · **Lieu** : un chariot à dossiers · **Entrée** : frappe — le gros dossier
  fermé tombe sur la tablette (`frappe(c, m, ordner, "b15", { dist: 500, x: 600, y: 1120, amp: 10 })`).
- **À comprendre** : ce petit dossier a été rangé dans un autre, plus gros, du même médecin. Rien de plus.
- **Caméra** : `AXE`, fixe. **Aucun zoom, aucun coup de zoom, aucune pastille** : c'est la plage sobre de l'épisode.
- **Couches** : `D.mur({ sol: 1390 })` · `D.chariot` (ancrage (525, 1390) : x 190–860 ; tablette du haut à y 1120,
  du bas à y 1340 ; cinq dos vierges x 220–370, y 930–1120) · `D.chemise` (DERRIÈRE le couvercle du gros dossier)
  · `D.ordner` en (600, 1120) (x 420–780, y 700–1120) · HUD.
- **Composition (monde)** : `D.chemise` part de (230, 760) (x 130–330) : ses trois mini-lettres « D r . », sa
  mini-étiquette `15.000 €` grisée et tamponnée, `119 Cs 426/19` ; elle finit en (600, 900), cachée par le gros
  dossier. **L'étiquette du gros dossier reste BLANCHE : ni titre, ni numéro, ni image.**
- **Action** : `b15` frappe · `b15@دخل-0.1` : le couvercle s'entrouvre (`ouvre` 0 → 8) · `b15@دخل` : la chemise
  glisse dedans (`move`, 0,44 s, `inOut`, jusqu'à `b15@فمحاكمة+0.2`) · puis le couvercle se referme (0,15 s) ·
  `b15@أخرى` : la sangle se serre (`sangle` 0 → 1, 0,15 s), petit choc (`c.shake(…, 5, 0.2)`), un peu de poussière.
- **Vie** : roulettes, onglets, poussière.
- **Textes** : aucun, hors le numéro de dossier sur la chemise. **Mentions** : plaquette `FALL`.
  **Réglette** : `2019`. **Jamais** : un mot, un chiffre ou une image de l'autre procès.
- **Affiche** : figer à `b15@أخرى+0.2`.

### S23 — Coupable pour ce « Dr. » : définitif depuis 2022

- **Beat** b16 · 58,30 → 60,87 (2,6 s) · **Lieu** : le rebord · **Entrée** : frappe — « D », « r », « . » géants
  (`frappe` du D à `b16`, amp 11 ; du r à `b16+0.05` et du point à `b16+0.10`, amp 0).
- **À comprendre** : là, il a été déclaré coupable d'avoir porté ce titre — c'est CELA qui est définitif ; les
  15 000 €, eux, sont tombés.
- **Caméra** : `AXE`, fixe ; `c.kick("b16@مذنب", 0.06)` ; `c.kick("b16@نهائي", 0.05)`.
- **Couches** : `D.mur` · `D.rebord({ w: 580 })` en (540, 900) (x 250–830) · lettres · étiquette · plaque des
  tribunaux · tampons · annotation · HUD.
- **Composition (monde)** :
  - `motDr(c, m, 330, 900, 220)` → D x 330–515, r x 541–664, point x 687–739 (y 680–900) ;
  - étiquette (ancrage (265, 925), `L: 70`, corps 180 × 110 → x 175–355, y 981–1091) : `l1: "15.000 €"` (38),
    `l2: "nicht rechtskräftig"` (15), `gris: 0.6` dès la 1re image ;
  - `D.plaque({ kind: "email", w: 480, h: 56, lignes: [{ t: "LG Düsseldorf 16.11.2021 · BGH 02.11.2022",
    size: 22 }] })` centre (560, 975) (x 320–800) ; dessous « محكمة أعلى · أعلى محكمة فألمانيا »
    (`ar strong` 26) centré en (560, 1040) (x 372–748) ;
  - tampon 1 `D.empreinte({ text: "schuldig", w: 400, h: 110, size: 64, rot: -8 })` en (540, 810), SUR les lettres
    (elles restent visibles dessous) ;
  - tampon 2 `D.empreinte({ text: "rechtskräftig", w: 440, h: 100, size: 50, rot: 5 })` en (560, 1150) ;
  - annotation de la série entre deux crochets tracés à la main : `für den Titel keine gesonderte Geldstrafe`
    (`de light` 20) centrée en (560, 1290) ; « بلا غرامة خاصة بـ«Dr.» » (`ar strong` 28) en (560, 1342).
- **Action** :
  - `b16` : frappe des lettres ; l'étiquette grise se balance au bout du rebord ;
  - `b16@لقاوه` : la plaque des tribunaux `pop` (0,3 s), son arabe à `+0.15` ;
  - `b16@مذنب` : le tampon `schuldig` frappe (`slam(…, 0.28, 12)`), pastille du haut 1, coup de zoom ;
  - `b16@Dr` : les trois lettres battent, étincelles ;
  - `b16@نهائي` : le tampon `rechtskräftig` frappe (`slam(…, 0.28, 10)`), pastille du haut 2, coup de zoom ;
  - `b16@نهائي+0.3` : la FICELLE de l'étiquette casse (`casse` 0 → 1 en 0,08 s) ; l'étiquette tombe (0,3 s,
    `E.in`, rotation 82°) et reste à plat au sol en (255, 1330), toute grise (`gris` → 1), petit choc
    (`c.shake(…, 5, 0.2)`) ;
  - `b16@نهائي+0.4` : l'annotation s'écrit (`wipe` 0,3 s), son arabe à `+0.2` ;
  - `b16@7` (« 2022 ») : la vis `2022` de la réglette tourne ; la pastille du haut bat.
- **Vie** : reflets et étincelles du laiton, encre des tampons.
- **Textes** — pastille du haut : 1. `schuldig · Missbrauch von Titeln` / « مذنب · استعمال لقب بلا حق » — 26 —
  `pop` à `b16@مذنب`, `hide` à `b16@نهائي-0.08` ; 2. `rechtskräftig · seit 2022` / « حكم نهائي » — 34 — `pop` à
  `b16@نهائي`.
- **Mentions** : plaquette `FALL`. `rechtskräftig` frappe LOIN de l'étiquette « 15.000 € », qui porte toujours
  `nicht rechtskräftig` et qui tombe. L'annotation est de la série (crochets), pas une citation.
  **Réglette** : `2022` à `b16@7`.
- **Affiche** : figer à `b16@7+0.4`.

### S24 — La règle (1) : avec le Doctorat du Maroc, ni « Dr. » ni « Dr. med. »

- **Beat** b17 · 60,87 → 63,91 (3,0 s) · **Lieu** : un mur, une barre porte-enseignes · **Entrée** : frappe — la
  barre et ses deux plaques tombent du haut (`frappe(c, m, potence, "b17-0.10", { dist: 520, x: 540, y: 600,
  amp: 11 })`, les deux plaques et leurs chaînes reçoivent le même `m.build`), puis les plaques partent en pendule.
- **À comprendre** : retour à toi. Ton diplôme est un Berufsdoktorat : les deux façons d'écrire « docteur » à
  l'allemande te sont fermées — et c'est le code pénal qui les barre.
- **Caméra** : `AXE`, fixe ; `c.kick("b17@5", 0.05)` ; `c.kick("b17@7", 0.05)`.
- **Couches** : `D.mur({ sol: 1390, motif: "uni" })` · `D.potence` centre (540, 600) (x 170–910) · chaînes · plaque
  GAUCHE · plaque DROITE · leurs lettres · `D.socle` · diplôme + tampon · `TOI` (+ tube) · `KOL` (+ pochette) ·
  barres d'encre (au-dessus des plaques) · HUD (plaquette `REGEL`, carte `Gesetz`).
- **Composition (monde)** :
  - **plaque gauche** `D.plaque({ kind: "laiton", w: 330, h: 130, nVis: 2 })` centre (360, 760) (x 195–525,
    y 695–825) ; chaînes des anneaux (280, 600) et (440, 600) à (255, 695) et (465, 695) ;
    `motDr(c, m, 215, 782, 64)` (x 215–334) ; `points: { x0: 360, y: 772, n: 4, pas: 36 }` → elle dit `Dr. ····` ;
  - **plaque droite**, même format, centre (720, 760) (x 555–885, au-dessus de y 960) ; chaînes de (640, 600) et
    (800, 600) à (615, 695) et (825, 695) ; `motDr(c, m, 575, 780, 54)` (x 575–675) puis `med.` gravé (`de` 46,
    de x 686 à ≈ 772, ligne de base y 780) ; `points: { x0: 792, y: 770, n: 3, pas: 30 }` → `Dr. med. ···` ;
  - `D.socle` en (530, 1390) (x 380–680, y 1210–1390) ; gravé sur sa face : `Marokko · Algerien · Tunesien`
    (`de` 20, ≈ 273 px) en (530, 1262), `(anabin · KMK)` (`de light` 18) en (530, 1292), « المغرب · الجزائر · تونس »
    (`ar strong` 26) en (530, 1340) ;
  - diplôme `D.diplome({ w: 250, h: 180 })` debout sur le socle, centre (530, 1118) (x 405–655, y 1028–1208) ;
    tampon `D.empreinte({ text: "Berufsdoktorat", w: 230, h: 56, size: 28, rot: -7 })` en (530, 1140) ;
  - `TOI` : pieds (290, 1390), échelle 1,0 (x 245–335, tête de y 958), veste, trois quarts, `facing: 1`, `D.tube`
    dans le dos ; il MONTRE son diplôme (`PP.point`, la main s'arrête vers (395, 1140), à 10 px du diplôme) ;
  - `KOL` : pieds (770, 1390), échelle 0,96 (x 727–813 : hors colonne ; tête de y 975), pull, trois quarts,
    `facing: -1`, pochette contre elle en (752, 1180) ;
  - mot « نتا » (`ttl` 50) en (290, 905), au-dessus de la tête de `TOI`, + petite flèche vers lui ;
  - **barres** `D.barre({ rot: -16 })` : centres (360, 760) et (720, 760) — chacune porte `§ 132a StGB` en blanc ;
  - **carte `Gesetz`** (HUD) : `D.loi({ w: 560, h: 96, par: "§ 132a StGB", l1: "Freiheitsstrafe bis zu einem Jahr
    oder Geldstrafe" })` centre écran (540, 432) ; dessous « القانون: حبس حتى لعام ولا غرامة » (`ar strong` 26),
    centre (540, 512). GRISE : c'est le texte de la loi, son MAXIMUM, jamais une peine prononcée dans cette affaire.
- **Action** :
  - `b17-0.10` : frappe (choc sur la coupe), chaînes et plaques en pendule (9° amortis) ; la plaquette bascule en
    `REGEL`, la réglette sort ;
  - `b17@نتا` : « نتا » + flèche (`pop`) ; `hide` à `b17@Doctorat` ;
  - `b17@Doctorat` : le diplôme tombe sur le socle (`"drop"`, dist 200, 0,3 s) ; `TOI` le montre, `focused` ;
    `Marokko · Algerien · Tunesien` se grave (`wipe` 0,3 s) ;
  - `b17@ديال` : le tampon `Berufsdoktorat` frappe le diplôme (`slam(…, 0.28, 7)`) ; `(anabin · KMK)` apparaît ;
  - `b17@المغرب` : « المغرب · الجزائر · تونس » s'écrit (`wipe` rtl 0,3 s) ;
  - `b17@5` : la 1re barre S'ABAT sur la plaque gauche (`slam(…, 0.28, 12)`), la plaque repart en pendule (9°),
    ses chaînes cliquettent ; `TOI` → `shock`, sursaut ; la carte `Gesetz` `pop` (0,3 s) ; coup de zoom ;
  - `b17@7` (le 2e « لا ») : la 2e barre s'abat sur la plaque droite ; `KOL` → `shock`, sursaut ; coup de zoom ;
  - `b17@med` : tous deux `sad` ; `KOL` regarde `TOI`.
- **Vie** : plaques sur leurs chaînes, reflets du laiton, respiration, clignements, regards.
- **Réagit** : chaque barre fait repartir SA plaque ; au 2e choc le diplôme vacille sur le socle (2°).
- **Textes** : ceux du socle, des barres, de la carte `Gesetz` ; pas de pastille du haut (la carte en tient lieu).
- **Mentions** : plaquette `REGEL` (`Keine Rechtsberatung — frag deine Ärztekammer` + son arabe) jusqu'à la fin ;
  `Gesetz` sur la carte. La prison n'apparaît QU'ICI, comme texte de loi, loin du médecin. **Bulles** : aucune.
- **Affiche** : figer à `b17@med+0.25`.

### S25 — La règle (2) : quoi écrire à la place ? Même les tribunaux n'ont pas été d'accord

- **Beat** b18 · 63,91 → 66,40 (2,5 s) · **Lieu** : même mur, une enseigne à pendeloques · **Entrée** : frappe —
  ta plaque, SANS « Dr. », tombe (`frappe(c, m, plaqueM, "b18", { dist: 520, x: 540, y: 855, amp: 10 })`), les deux
  petites plaques pendues dessous suivent et se balancent.
- **À comprendre** : il n'y a pas de formule magique à recopier : deux tribunaux ont dit deux choses, et la loi
  change d'un Land à l'autre. (Aucune forme « à écrire » n'est montrée.)
- **Caméra** : `AXE`, fixe ; `c.kick("b18@حتى", 0.04)` ; `c.kick("b18@تفاهموش", 0.05)`.
- **Couches** : `D.mur` · **plaque M** 520 × 190 centre (540, 760) (x 280–800, y 665–855) · reflet de `TOI` ·
  points « … » · chaînes · plaque `Amtsgericht 2019` · plaque `Landgericht 2021` · signe « ≠ » · gloses · carte
  `Gesetz` · HUD.
- **Composition (monde)** :
  - plaque M : `trous` aux cinq emplacements des vis des lettres parties, `fantome: 0.8` (la trace de « Dr. » de
    x 320 à 450), `points: { x0: 490, y: 778, n: 4, pas: 40 }` ; reflet : `reflet(c, { x: 294, y: 679, w: 492,
    h: 162 }, 705, 760, 0.85, fn)` ; dans la trace vide : `m.typing(385, 770, "b18@تكتب", "b19")` ;
  - `D.plaque({ kind: "email", w: 300, h: 84, lignes: [{ t: "Amtsgericht 2019", size: 30 }] })` centre (330, 1050)
    (x 180–480), pendue par deux chaînes de (310, 855) et (430, 855) à (250, 1008) et (410, 1008) ; dessous
    « المحكمة الابتدائية » (`ar strong` 26) en (330, 1135) ;
  - `D.plaque({ kind: "email", w: 260, h: 84, lignes: [{ t: "Landgericht 2021", size: 28 }] })` centre (740, 1050)
    (x 610–870), chaînes de (650, 855) et (770, 855) à (670, 1008) et (810, 1008) ; dessous « محكمة أعلى » (26)
    en (740, 1135) ;
  - `D.different` en (545, 1050) (x 500–590), entre les deux ;
  - carte `D.loi({ w: 640, h: 120, par: "§ 69 HG NRW", l1: "„in der verliehenen Form unter Angabe", l2: "der
    verleihenden Institution“" })` centre (540, 1225) (x 220–860, y 1165–1285), onglet `Gesetz · Landesrecht` ;
    dessous « القانون · كل Land وقانونو » (`ar strong` 28) en (540, 1335).
- **Action** :
  - `b18` : frappe ; les deux petites plaques pendent et se balancent ;
  - `b18@تكتب` : les trois points « … » se mettent à rebondir dans la trace vide : on ne sait pas quoi graver ;
    `TOI` (reflet) `worried`, son regard va d'un tribunal à l'autre ;
  - `b18@فبلاصتها` : la carte `Gesetz` `pop` (0,3 s) — le texte de la loi, montré comme un texte ;
  - `b18@حتى` : les deux plaques de tribunal se mettent à se balancer en OPPOSITION (`m.sway` 3°, phases 0 et π,
    l'amplitude monte de 0 à 3° en 0,4 s) ; coup de zoom ;
  - `b18@المحاكم` : leurs deux gloses arabes s'écrivent ;
  - `b18@تفاهموش` : le « ≠ » frappe entre elles (`slam(…, 0.28, 10)`) ; `TOI` `shock` 0,3 s ; « القانون · كل
    Land وقانونو » s'écrit à `+0.15` ; coup de zoom.
- **Vie** : points « … », plaques en opposition, reflet, clignements du reflet.
- **Textes** : ceux des plaques et de la carte ; pas de pastille du haut.
- **Mentions** : plaquette `REGEL` ; `Gesetz` sur la carte (la citation du § 69 HG NRW est à recopier depuis la
  source, risque 4). **« (MA) », « (ir) » et « M.D. » sont absents de cette scène.**
- **Affiche** : figer à `b18@تفاهموش+0.3`.

### S26 — La règle (3) : avant d'imprimer un cachet ou d'écrire une bio…

- **Beat** b19 (début) · 66,40 → 68,31 (1,9 s) · **Lieu** : l'atelier du graveur · **Entrée** : coupe sèche,
  SANS frappe — c'est la seule scène où l'objet ne claque pas : le cachet s'arrête en l'air. Le contraste est voulu.
- **À comprendre** : AVANT. Le cachet reste levé, la bio reste vide.
- **Caméra** : `AXE`, fixe ; `c.kick("b19@تطبع", 0.04)`.
- **Couches** : mise en place « Atelier » — la petite plaque de l'étau est NUE (trous + trace), le bloc est BLANC
  (`empreinte: 0`), à droite `D.fiche({ kind: "bio" })` centre (760, 1040) (x 660–860, y 920–1160) sur un petit
  support · `D.tampon` · `D.main({ manche: "veste", tient: "tampon" })` · HUD.
- **Action** :
  - `b19` : la main et le cachet montent par le bas (0,2 s), face encrée à y 1010 ;
  - `b19@ما` : le cachet PLONGE vers le bloc…
  - `b19@تطبع` : …et s'ARRÊTE net à 40 px du papier (face à y 1050) : la moufle tremble (± 2 px, 14 Hz, 0,3 s),
    trois petits traits de freinage au-dessus du cachet (0,25 s), l'ombre sur le bloc reste large ; coup de zoom ;
    le bloc reste blanc jusqu'à la coupe ;
  - `b19@cachet` : pastille du haut ;
  - `b19@4` : la pastille sort ; la fiche de profil bat (`pulse`) ;
  - `b19@تكتب` : dans sa ligne `Bio:`, un « D » puis un « r » se tapent (0,1 s d'écart), le curseur clignote ;
  - `b19@bio+0.12` et `+0.22` : deux retours arrière — le « r » puis le « D » s'effacent ; il reste le curseur.
- **Vie** : bons de commande, outils, loupe, limaille, curseur ; la main respire.
- **Textes** — pastille du haut : `Stempel` / « cachet » — 34 — `pop` à `b19@cachet`, `hide` à `b19@4`.
  Sur la fiche : `Bio:` (mot du texte dit, pas de glose).
- **Mentions** : plaquette `REGEL`. **Bulles** : aucune.
- **Affiche** : figer à `b19@bio+0.05` (cachet levé au-dessus du bloc blanc, « Dr » dans la bio).

### S27 — La règle (4) : …demande à un avocat ou à ta Kammer, par écrit

- **Beat** b19 (fin) · 68,31 → 70,50 (2,2 s) · **Lieu** : un mur, un écritoire, deux fentes à courrier ·
  **Entrée** : frappe — la feuille `Anfrage` claque sur l'écritoire (`frappe(c, m, feuille, "b19@سول",
  { dist: 600, x: 540, y: 1120, amp: 10 })`).
- **À comprendre** : tu écris ta question, tu l'envoies à l'un ou à l'autre, et tu gardes la réponse.
- **Caméra** : `AXE`, fixe ; `c.kick("b19@بالكتابة", 0.05)`.
- **Couches** : `D.mur({ sol: 1390 })` · écritoire (planche de bois 340 × 500 à pince, portée par un pied) ·
  `D.feuille({ w: 300, h: 460, t: "Anfrage" })` centre (540, 890) (x 390–690, y 660–1120) · plaque et fente de
  GAUCHE · plaque et fente de DROITE · deux petites enveloppes · `D.main({ manche: "veste", tient: "stylo" })` ·
  phrase arabe · HUD.
- **Composition (monde)** :
  - gauche : `D.plaque({ kind: "email", w: 210, h: 70, nVis: 2, lignes: [{ t: "Rechtsanwalt", size: 28 }] })`
    centre (240, 800) (x 135–345) ; dessous une fente à courrier (rectangle 190 × 54 à clapet, dessinée avec
    `D.boite` réduite à sa fente) centre (240, 880) ; « محامي » (`ar strong` 28) en (240, 965) ;
  - droite : `D.plaque({ …, lignes: [{ t: "Ärztekammer", size: 28 }] })` centre (805, 800) (x 700–910, au-dessus
    de y 960) ; fente centre (805, 880) ; « هيئة الأطباء » (28) en (800, 965) (x 735–865) ;
  - la main entre par le bas, à gauche de l'axe : paume vers (470, 1170), la pointe du stylo parcourt les lignes
    de la feuille (y 760 → 1040) ;
  - deux `D.enveloppe({ kind: "reponse", w: 110, h: 70 })` qui partent de (540, 880) vers (240, 880) et (805, 880) ;
  - phrase de la règle « قبل ما تطبع: سول بالكتابة، وخلي الجواب عندك » (`ttl` 44) centrée en (540, 1300)
    (≈ x 245–835).
- **Action** :
  - `b19@سول` : frappe de la feuille ; la main entre (0,2 s) et ÉCRIT (`ecrit` 0 → 1 jusqu'à
    `b19@Ärztekammer+0.5`, la moufle descend ligne après ligne) ;
  - `b19@محامي` : la plaque `Rechtsanwalt` et sa fente tombent en place (`"drop"`, dist 200, 0,3 s), « محامي »
    s'écrit à `+0.2` ;
  - `b19@Ärztekammer` : la plaque `Ärztekammer` et sa fente tombent, « هيئة الأطباء » à `+0.2` ;
  - `b19@Ärztekammer+0.55` : la main ressort par le bas (0,2 s) — AVANT que la phrase arabe n'apparaisse ;
  - `b19@بالكتابة` : les deux petites enveloppes partent de la feuille et entrent dans les deux fentes (0,3 s,
    `inOut`), les deux clapets claquent (`c.shake("b19@بالكتابة+0.3", 6, 0.2)`) ; pastille du haut ; coup de zoom ;
    à `+0.1` la phrase de la règle s'écrit (`wipe` rtl 0,5 s).
- **Vie** : coin de la feuille, clapets, main qui écrit.
- **Textes** — pastille du haut : `schriftlich` / « بالكتابة » — 36 — `pop` à `b19@بالكتابة`.
- **Mentions** : plaquette `REGEL` — c'est un CONSEIL de la série, pas un texte de loi : aucune plaque ne dit
  « autorisation », rien ne dit que la Kammer « autorise ». **Bulles** : aucune.
- **Affiche** : figer à `b19@بالكتابة+0.45`.

### S28 — La règle (5) : et si elle t'écrit, réponds

- **Beat** b20 · 70,50 → 71,82 (1,3 s) · **Lieu** : TA boîte aux lettres · **Entrée** : frappe — une enveloppe
  de la Kammer tombe dans la fente (`m.build(env, "b20@كتبات-0.12", "drop", { dist: 420, dur: 0.34 })`,
  `c.shake("b20@كتبات", 9, 0.3)`).
- **À comprendre** : une lettre de la Kammer ne reste pas sans réponse — lui en a laissé deux.
- **Caméra** : `AXE`, fixe ; `c.kick("b20@جاوبها", 0.05)`.
- **Couches** : `D.mur({ sol: 1390, motif: "uni" })` · `D.boite({ kind: "B", nom: "………" })` centre (540, 800)
  (x 390–690, y 620–980 ; fente à y 690) · enveloppe `kammer` · enveloppe `reponse` · `D.fleche` · phrase · HUD.
- **Action** :
  - `b20` : la boîte est là, son journal roulé frémit ;
  - `b20@كتبات` : l'enveloppe `Ärztekammer Nordrhein` arrive dans la fente et y reste à demi sortie, le clapet
    claque (pendule de 30°) ;
  - `b20@ليك` : le pointillé du nom, sur la boîte, bat une fois (c'est pour TOI) ;
  - `b20@جاوبها` : une enveloppe `reponse` jaillit de la boîte vers la droite et se pose en (800, 720) (x 700–900,
    y 655–785), penchée de 8°, pendant que la flèche de retour se trace de (640, 690) à elle (`p` 0 → 1 en
    0,25 s) ; pastille du haut ; coup de zoom ; à `+0.1` la phrase « برية من الـKammer؟ جاوب » (`ttl` 44, centrée
    en (540, 1200)) s'écrit (`wipe` rtl 0,35 s).
- **Vie** : clapet, journal, enveloppe qui dépasse.
- **Textes** — pastille du haut : `antworten` / « جاوبها » — 36 — `pop` à `b20@جاوبها`.
- **Mentions** : plaquette `REGEL`. **Bulles** : aucune.
- **Affiche** : figer à `b20@جاوبها+0.3`.

### S29 — Tu es médecin par ton travail, pas par deux lettres

- **Beat** b21 · 71,82 → 74,46 (2,6 s) · **Lieu** : la porte de ton bureau, à l'hôpital · **Entrée** : frappe —
  ta NOUVELLE plaque tombe sur la porte (`frappe(c, m, plaqueP, "b21-0.30", { dist: 520, x: 540, y: 800,
  amp: 10 })`, ses vis font un tour).
- **À comprendre** : sur ta plaque : ton nom, et ton métier — « Ärztin / Arzt ». Les deux lettres vont à la
  corbeille. La boucle de S1 se referme : même objet, sans étiquette de prix.
- **Caméra** : `AXE`, fixe (un zoom couperait les pieds) ; `c.kick("b21@طبيب", 0.05)` ; `c.kick("b21@حروف",
  0.05)` ; `c.shake("b21@حروف+0.35", 6, 0.2)`.
- **Couches** : `D.mur({ sol: 1390, lambris: 1180 })` · `D.porteBureau` (ancrage (540, 1390) : vantail x 300–780,
  y 560–1390) · **plaque « porte »** · glose arabe · `D.corbeille` en (215, 1390) (x 160–270, y 1260–1390 : coin
  bas-gauche, exception voulue à la symétrie) · `TOI` · `KOL` · les deux lettres de laiton · HUD.
- **Composition (monde)** :
  - `D.plaque({ kind: "laiton", w: 520, h: 200, points: { x0: 380, y: 672, n: 9, pas: 40 }, lignes: [{ t:
    "Ärztin / Arzt", x: 0, y: 62, size: 56, n }] })` centre (540, 700) (x 280–800, y 600–800) : le nom en pointillé
    (x 380–700), dessous `Ärztin / Arzt` — **aucun « Dr. », aucune trace, aucun trou** ;
  - « طبيبة / طبيب » (`ar strong` 30) centré en (540, 845), entre la plaque et les têtes ;
  - `TOI` : pieds (400, 1390), échelle 1,05 (tête de y 936), `outfit: "coat"` (blouse + stéthoscope), trois
    quarts, `facing: 1` ; `KOL` : pieds (680, 1390), échelle 1,0 (tête de y 958 ; x 630–730), `outfit: "coat"`,
    trois quarts, `facing: -1` ; chacun à sa place, 180 px entre les deux corps ;
  - les deux lettres : `D.lettre({ ch: "D", h: 46 })` et `D.lettre({ ch: "r", h: 46 })` dans la main gauche de
    `TOI` (paume vers (330, 1150)).
- **Action** :
  - `b21-0.30` : frappe de la plaque (choc sur la coupe) ; tous deux lèvent les yeux vers elle ;
  - `b21` (« نتا ») : `TOI` regarde la caméra et pose la main droite sur sa poitrine (`reachR` vers `out.chest`,
    0,2 s) ;
  - `b21@طبيب` : `Ärztin / Arzt` se GRAVE lettre par lettre (`lignes[0].n` 0 → 13 en 0,4 s, trois étincelles) ;
    « طبيبة / طبيب » s'écrit à `+0.3` ; `TOI` → `smile` ; coup de zoom ;
  - `b21@بالخدمة` : pastille du haut ; `KOL` → `smile`, elle redresse les épaules ;
  - `b21@ديالك` : tous deux `bigsmile` ;
  - `b21@ماشي` : `TOI` sort de sa poche les deux lettres de laiton (`reachL` de (360, 1190) à (330, 1150),
    0,2 s) et les regarde, `focused` ;
  - `b21@بجوج` : il les soupèse (la main monte et descend de 6 px, deux fois) ;
  - `b21@حروف` : il les JETTE par-dessus son épaule — le bras part vers le haut (0,12 s), les deux lettres
    décrivent une cloche de (335, 1150) par (260, 1000) jusqu'à la corbeille (215, 1290) en 0,35 s, en tournant ;
    deux petits chocs, la corbeille tangue (`choc`), secousse légère ; `KOL` rit (`bigsmile` + `blush`) ;
    coup de zoom. Dernière image tenue jusqu'à `b21@end+0.15`.
- **Vie** : reflet de la plaque, reflet qui glisse sur la bande vitrée de la porte, respiration, clignements.
- **Textes** — pastille du haut : `Approbation` / « رخصة الطب » — 32 — `pop` à `b21@بالخدمة`.
- **Mentions** : plaquette `REGEL`. **Bulles** : aucune.
- **Affiche** : dernière case ; figer à `b21@end+0.05`.

### Affiche-résumé (socle `st.summary`, réglages de cet épisode)

- `st.flash("b21@end+0.15", 0.35, 0.85)` puis `st.summary({ at: "b21@end+0.15", in: "cut", dezoomAt:
  "b21@end+0.5", cols: 6, crop: [230, 1310], top: 372, gap: 10, side: 92, freezeAt: […] })`.
- **24 cases, 6 colonnes, 4 rangées** (cases de 132,7 px ; la grille va de y 372 à y 933, la carte commence à
  y 960). Scènes exclues (`summary: false`) : S4 (intro), S5, S10, S14, S18. Ordre des cases (lecture de droite à
  gauche) et instant figé :

  | Case | Scène | `freezeAt` | Case | Scène | `freezeAt` |
  |---|---|---|---|---|---|
  | 1 | S1 | `b1@Dr+0.2` | 13 | S17 | `b12@شكاية+0.25` |
  | 2 | S2 | `b2@الابتدائية+0.3` | 14 | S19 | `b13@5+0.2` |
  | 3 | S3 | `b3@6+0.3` | 15 | S20 | `b13@خلصتو+0.4` |
  | 4 | S6 | `b4@المغرب+0.35` | 16 | S21 | `b14@نهائي+0.3` |
  | 5 | S7 | `b5@Dr+0.3` | 17 | S22 | `b15@أخرى+0.2` |
  | 6 | S8 | `b6@القراية+0.3` | 18 | S23 | `b16@7+0.4` |
  | 7 | S9 | `b7@المهنة+0.2` | 19 | S24 | `b17@med+0.25` |
  | 8 | S11 | `b8@فإيران+0.4` | 20 | S25 | `b18@تفاهموش+0.3` |
  | 9 | S12 | `b9@إيران+0.25` | 21 | S26 | `b19@bio+0.05` |
  | 10 | S13 | `b10@med+0.2` | 22 | S27 | `b19@بالكتابة+0.45` |
  | 11 | S15 | `b11@طاحو+0.14` | 23 | S28 | `b20@جاوبها+0.3` |
  | 12 | S16 | `b12@5+0.25` | 24 | S29 | `b21@end+0.05` |

- **En-tête** (entre x 90 et 990) : `k.ribbon("AKTE 08 · جوج حروف", 540, 312, { size: 36, w: 470 })` ;
  `k.chip("@dr.aguilo", null, 180, 312, 20)` ; teaser `k.chip("AKTE 09 · قريبا", null, 885, 312, 18, { yellow:
  true })` (l'affiche est hors histoire : le jaune du socle y est permis).
- **Carte « commentaire »** : `k.card(110, 960, 760, 300)` à `b21@end+2.7`. Question ÉCRITE (jamais dite) :
  « واش كنتي عارف هاد القاعدة؟ » (`ttl` 47, centre (490, 1060), `wipe` rtl à `b21@end+2.8`) ; « كتب ليا
  فالكومنتير » (`ar strong`, centre (490, 1170), à `b21@end+3.2`) ; flèche du socle vers le bouton commentaire à
  `b21@end+3.4`. Variante au choix de l'auteur : « شنو مكتوب فالدبلوم ديالك؟ ».
- **Statut, sous la carte** (deux plaquettes d'émail `D.plaque({ kind: "email", nVis: 2 })` + leur arabe, entre
  x 110 et 870, à `b21@end+3.6` et `+3.8`) : plaquette `15.000 € (Amtsgericht 2019): nie rechtskräftig geworden`
  (Kalam 20 ; 620 × 40, X 110–730, Y 1282–1322) puis « هاد الحكم عمره ما ولى نهائي » (`ar strong` 26, centre
  (420, 1352)) ; plaquette `Schuldspruch wegen des Titels: rechtskräftig seit 2022` (Y 1372–1412) puis
  « مذنب فهاد «Dr.»: نهائي من 2022 » (centre (420, 1442)). Les deux phrases arabes sont celles de b14 et b16.
- La dernière scène finit en caméra `AXE` : le saut vers l'affiche est couvert par l'éclair.

---

## 5. Les scènes imposées, dans la forme propre à cet épisode

| Scène imposée | Où | Forme propre à AKTE 08 | Ce qui la distingue des autres épisodes |
|---|---|---|---|
| **Accroche très travaillée** | S1–S3 (b1–b3, 8,9 s) | Une façade complète et TA plaque de laiton géante ; dès la 1re image : l'étiquette « 15.000 € » qui arrive en bout de ficelle sur le « D » et le « r », la main qui visse, le visage de « toi » reflété dans le laiton (fierté → choc → sueur → larme), le tournevis qui tombe ; puis la carte (épingle sur Düsseldorf) ; puis deux diplômes tamponnés `Arzt ✓` et `Doktortitel ✓`… et l'étiquette qui retombe entre eux | le personnage qui réagit est un REFLET dans l'objet signature ; le montant pend à deux lettres. 04 ouvre au tribunal, 05 sur une façade de nuit, 06 sur un bureau vu de dessus, 07 dans un téléphone, 09 sur une route |
| **Intro Yassine** | S4 (i1–i3) | Sa porte d'entrée : sa photo dans le hublot (cadre au trait + anneau de laiton jaune + icône Instagram), la plaque de laiton « Yassine » qui tombe et se visse — sans « Dr. » —, l'étiquette de sonnette `@dr.aguilo`, la platine d'interphone avec le cœur j'aime et le bouton s'abonner animés sur `i3@j'aime` et `i3@abonne` ; logo du haut masqué ; bloc fini à Y ≤ 1227 ; `summary: false` | la plaque est l'objet de l'épisode ; « Yassine » sans titre est le clin d'œil au sujet |
| **Le juridique en image** | S8 + S9 (b6–b7) | Deux PILES de livres : les études (six livres) ; « Dr. » ne tient que sur un 7e livre posé dessus (`Dissertation`) ; ta thèse, elle, est DANS ta pile, qui s'arrête au niveau `= Ärztliche Prüfung` ; l'écran `anabin (KMK)` tape la phrase de la base ; tampon `Berufsdoktorat` ; puis S10 : les lettres se dévissent | des objets empilés, aucun schéma nu, aucune coupe anatomique ; AKTE 02 : utérus ; AKTE 03 : vaisseau ; 04 : loupe sur une tubulure ; 06 : pilulier et usine |
| **Carte** | S2 (b2), S5 (b4), S11 (b8) | Trois temps : une carte murale d'école qui se déroule (Allemagne, Berlin en repère, épingle jaune sur Düsseldorf, DÈS que la ville est dite) ; puis un globe d'école schématique où ton médaillon suit un arc Maroc → Allemagne ; puis, sur le même globe, l'arc Téhéran → Allemagne et le signe « = » entre ton médaillon et le sien | deux arcs symétriques et un « = » : la carte sert à dire « comme toi » ; aucune frontière, aucune côte |
| **Scène muette du décès** | — | **Aucune** : il n'y a ni décès ni famille dans CETTE affaire ; `extra` est vide. L'autre procès du même médecin tient en une scène neutre (S22 : un dossier qui entre dans un dossier sans titre) | — |
| **Tribunal** | S18 + S19 (b13) | Un Strafbefehl écrit qui tombe et claque, l'étiquette `13.500 € · laut Presse`, le tampon `EINSPRUCH` ; puis le banc de l'Amtsgericht vu DE FACE depuis la place de l'accusé, `Rekonstruktion` : UN juge qui lit en silence puis nous regarde, la procureure, la greffière qui tape, les deux lettres de laiton posées sur le banc, deux chevalets de table `Verteidiger` / `Angeklagter` | ni guichet ni marteau (aucune source) ; ni balance, ni plaque au mur, ni salle vue du fond, ni personne de dos (05, 09), ni fenêtres à lames (06), ni boîtes aux lettres, ni appel vidéo, ni vue de l'extérieur |
| **Sanction** | S20 (b13), puis S21 et S23 | Le « D » et le « r » géants sur un rebord, une étiquette à ficelle chacun : `60 Tagessätze` et `× 250 €` ; dessous la plaque `= 15.000 €` et `1. Instanz` ; puis le tampon `nicht rechtskräftig` sur l'étiquette (S21), dont la ficelle casse quand tombe `rechtskräftig` sur la culpabilité (S23) | aucune icône de peine, aucun visage qui grimace, aucun billet, aucune « 7 500 € la lettre » : le calcul du jugement, étiqueté |
| **Règle** | S24–S28 (b17–b20) + S29 (b21) | Cinq gestes sur des objets : deux plaques barrées par une barre `§ 132a StGB` ; une plaque vide où rebondissent trois points entre deux tribunaux qui se balancent en sens contraire ; un cachet arrêté en l'air ; une question écrite envoyée dans deux fentes ; une lettre à laquelle on répond ; puis ta plaque « Ärztin / Arzt » et les deux lettres à la corbeille | pas de carte-titre « القاعدة », pas de liste : la règle est jouée par les objets de l'épisode |
| **Affiche-résumé** | après b21 | 24 cases, 6 colonnes ; question écrite « واش كنتي عارف هاد القاعدة؟ » ; `AKTE 09 · قريبا` ; deux plaquettes de statut (jamais définitif / définitif depuis 2022) | — |

---

<!-- REPERES:DEBUT -->
## 6. Repères utilisés

Les **250 repères** de ce document et de `son/plan_son.md` ont été extraits par script et résolus avec la logique du
moteur (`engine/runtime.js` : `parseCue` ; `serie/lib/stage.js` : `T`) sur `beats.js` + `timings.js` du 26.11.2026 :
**aucun repère manquant, aucun mot ambigu** (aucun texte visé n'est contenu dans deux mots du même beat sans être
écrit par son indice). Chaque mot existe tel quel dans `beats.js`. Les instants sont PROVISOIRES : ce sont les mots
qui comptent.

**Règles à garder quand la vraie voix arrivera**
- **Par indice, parce que le mot est un NOMBRE** (un nombre après « @ » est lu comme un numéro de mot, à partir de
  0) : `b1@3` (« 15000 ») · `b10@1` (« 2009، ») · `b12@1` (« 2017 ») · `b13@1` (« 2019، ») · `b13@5` (« بـ60 ») ·
  `b13@8` (« 60 ») · `b16@7` (« 2022. »). Écrire « b1 @ 15000 » ferait planter le moteur (« pas de mot n° 15000 »).
- **Par indice, parce que le mot est répété, très court, ou contenu dans un mot placé AVANT lui** : `b3@3` et
  `b3@6` (les deux « بصح ») · `b7@8` (« ديال », contenu dans « ديالك، » qui le précède) · `b12@5` (« حيدها. »,
  contenu aussi dans « حيدهاش، ») · `b12@6` (« ما ») · `b17@5` et `b17@7` (les deux « لا ») · `b19@4` (le 1er
  « ولا » ; le 2e est le mot 9).
  Si l'auteur ajoute, retire ou déplace un mot dans b1, b3, b7, b10, b12, b13, b16, b17 ou b19, ces indices changent :
  les revérifier avec `tools/cuetimes.mjs`.
- **Par mot** : le moteur prend le PREMIER mot du beat qui CONTIENT le texte (casse, guillemets, ponctuation et
  préfixes collés ignorés). Vérifié pour chaque repère de ce document : `b1@Dr`, `b5@Dr`, `b6@Dr`, `b7@Dr`,
  `b9@Dr`, `b10@Dr`, `b16@Dr` visent bien le « «Dr.» » voulu (aucun autre mot de ces phrases ne contient « dr ») ;
  `b9@ir` vise « (ir)»، » ; `b10@med` et `b17@med` visent « med. » ; `b2@Düsseldorf`, `b8@Düsseldorf`,
  `b10@Ärztekammer`, `b19@Ärztekammer`, `b4@Doctorat`, `b17@Doctorat`, `b11@site`, `b11@Instagram`, `b9@badge`
  passent malgré le préfixe arabe collé (« فـ », « الـ », « بـ », « والـ ») ; `b12@حيدهاش` vise « حيدهاش، »
  (mot 7, le seul qui contienne ce texte) ; `b2@فالمحكمة` et `b13@المحكمة` visent chacun le seul mot de leur
  phrase qui contient « المحكمة » ; `i3@j'aime` fonctionne avec l'apostrophe.
- **Débuts de scène avancés** : `i1-0.15`, `b4-0.30`, `b5-0.05`, `b7@ماشي-0.10`, `b8-0.10`, `b17-0.10`,
  `b21-0.30`, et `b12@end+0.05` (S18, dans la pause avant b13). Il faut au moins 0,35 s de pause avant b4 et b21 et
  0,15 s avant i1, b8 et b17 (`preview.json` les prévoit : 0,42 s et 0,35 s) ; si la vraie voix les raccourcit,
  réduire les avances d'autant.
- **Coupes proposées à l'auteur** (annexe du scénario) : « عاد » (b4) et « ومن بعد » (b11) ne touchent aucun
  repère ; « في 2009، » (b10) supprime le mot visé par `b10@1` → le remplacer par `b10` (frappe de la lettre,
  tampon dateur, vis `2009`) ; b5 en entier → voir risque 11.

**Tous les repères, beat par beat** (S = storyboard seul, sans marque ; (P) ou (P, S) = aussi dans le plan son ;
instant provisoire en secondes)

| Beat | Texte | Repères (instant) |
|---|---|---|
| b1 | تخيل غرامة ديال 15000 أورو، حيت كتبتي «Dr.» قدام سميتك فألمانيا. | `b1@غرامة` 0,44 · `b1@3` 1,08 (P, S) · `b1@3+0.28` 1,36 · `b1@حيت` 1,71 · `b1@كتبتي` 1,95 (P, S) · `b1@Dr` 2,29 · `b1@قدام` 2,49 · `b1@Dr+0.2` 2,49 · `b1@سميتك` 2,79 · `b1@فألمانيا` 3,13 |
| b2 | هادشي وقع لطبيب فـDüsseldorf، فالمحكمة الابتدائية. | `b2` 3,72 (P, S) · `b2+0.10` 3,82 · `b2@لطبيب` 4,30 · `b2@لطبيب+0.2` 4,50 · `b2@Düsseldorf` 4,64 (P, S) · `b2@Düsseldorf+0.4` 5,04 · `b2@فالمحكمة-0.08` 5,23 · `b2@فالمحكمة` 5,31 (P, S) · `b2@فالمحكمة+0.3` 5,61 · `b2@الابتدائية` 5,79 · `b2@الابتدائية+0.3` 6,09 |
| b3 | وهو طبيب ديال بصح، بدكتوراه ديال بصح. | `b3` 6,48 (P, S) · `b3@طبيب` 6,73 (P, S) · `b3@طبيب+0.2` 6,93 · `b3@3` 7,31 · `b3@بدكتوراه` 7,56 (P, S) · `b3@بدكتوراه+0.2` 7,76 · `b3@6` 8,33 (P, S) · `b3@6+0.3` 8,63 |
| i1 | أنا ياسين، طبيب فألمانيا. | `i1-0.15` 8,85 (P, S) · `i1-0.10` 8,90 · `i1+0.05` 9,05 · `i1@ياسين` 9,24 (P, S) · `i1@ياسين+0.3` 9,54 · `i1@فألمانيا` 9,88 |
| i2 | فهاد السلسلة كنحكي ليكم قصص حقيقية من المحاكم الألمانية، باش نتعلمو منها. | `i2@حقيقية` 12,07 · `i2@حقيقية+0.15` 12,22 |
| i3 | إلا عجباتك، دير j'aime و abonne، باش ما تفوتكش القصة الجاية. | `i3-0.05` 14,61 · `i3` 14,66 · `i3@j'aime` 15,54 (P, S) · `i3@abonne` 16,03 (P, S) |
| b4 | دابا نتا: عاد وصلتي لألمانيا بـDoctorat en médecine ديال المغرب. | `b4-0.30` 18,09 (P, S) · `b4-0.10` 18,29 · `b4` 18,39 · `b4@نتا` 18,69 · `b4@وصلتي` 19,18 (P, S) · `b4@لألمانيا` 19,52 · `b4@لألمانيا+0.3` 19,82 · `b4@Doctorat` 20,00 (P, S) · `b4@médecine` 20,78 · `b4@المغرب-0.1` 21,45 · `b4@المغرب` 21,55 (P, S) · `b4@المغرب+0.35` 21,90 |
| b5 | وأول حاجة: cachet، و«Dr.» قدام سميتك. | `b5-0.05` 22,00 (P, S) · `b5` 22,05 · `b5+0.06` 22,11 · `b5@حاجة` 22,34 (P, S) · `b5@cachet` 22,63 (P, S) · `b5@cachet+0.17` 22,80 · `b5@cachet+0.32` 22,95 · `b5@Dr` 23,02 · `b5@قدام-0.05` 23,22 · `b5@قدام` 23,27 · `b5@Dr+0.3` 23,32 · `b5@سميتك` 23,56 |
| b6 | ولكن فألمانيا «Dr.» هي Promotion، يعني thèse ديال البحث زيادة على القراية. | `b6` 24,01 (P, S) · `b6+0.08` 24,09 · `b6+0.16` 24,17 · `b6@فألمانيا` 24,30 · `b6@Dr` 24,78 · `b6@Promotion-0.08` 25,10 · `b6@Promotion` 25,18 (P, S) · `b6@thèse` 26,00 · `b6@البحث` 26,64 (P, S) · `b6@زيادة` 26,98 · `b6@على` 27,32 · `b6@القراية` 27,56 · `b6@القراية+0.3` 27,86 |
| b7 | والدبلوم ديالك، وخا فيه thèse، عندهم Berufsdoktorat: دكتوراه ديال المهنة، ماشي «Dr.». | `b7` 28,11 (P, S) · `b7+0.25` 28,36 · `b7@ديالك` 28,59 (P, S) · `b7@وخا` 28,93 (P, S) · `b7@thèse` 29,42 · `b7@عندهم-0.05` 29,71 · `b7@عندهم` 29,76 (P, S) · `b7@عندهم+0.2` 29,96 · `b7@Berufsdoktorat-0.1` 30,00 · `b7@عندهم+0.3` 30,06 · `b7@Berufsdoktorat` 30,10 · `b7@Berufsdoktorat+0.2` 30,30 · `b7@دكتوراه` 30,86 (P, S) · `b7@8` 31,30 · `b7@المهنة` 31,59 (P, S) · `b7@المهنة+0.2` 31,79 · `b7@ماشي-0.10` 31,88 (P, S) · `b7@ماشي` 31,98 (P, S) · `b7@Dr` 32,27 (P, S) · `b7@Dr+0.25` 32,52 |
| b8 | الطبيب ديال Düsseldorf قرا برا بحالك، فإيران. | `b8-0.10` 32,79 (P, S) · `b8@Düsseldorf` 33,57 · `b8@قرا` 34,15 · `b8@برا` 34,39 (P, S) · `b8@بحالك-0.08` 34,56 · `b8@بحالك` 34,64 · `b8@فإيران` 34,98 · `b8@فإيران+0.2` 35,18 · `b8@فإيران+0.4` 35,38 |
| b9 | والـbadge ديالو فالسبيطار كان فيه «Dr. med. (ir)»، يعني إيران. | `b9` 35,48 (P, S) · `b9@badge` 35,48 · `b9@ديالو` 36,00 · `b9@فالسبيطار` 36,34 · `b9@Dr-0.05` 37,31 · `b9@Dr` 37,36 · `b9@ir` 37,81 (P, S) · `b9@ir+0.1` 37,91 · `b9@ir+0.2` 38,01 · `b9@إيران` 38,30 · `b9@إيران+0.25` 38,55 |
| b10 | في 2009، الـÄrztekammer، يعني هيئة الأطباء، كتبات ليه: Berufsdoktorat، ماشي «Dr. med.». | `b10` 38,75 (P, S) · `b10@1` 38,95 (P, S) · `b10@1+0.25` 39,20 · `b10@Ärztekammer` 39,24 · `b10@كتبات` 41,03 (P, S) · `b10@Berufsdoktorat-0.08` 41,53 · `b10@ليه+0.2` 41,57 · `b10@Berufsdoktorat` 41,61 · `b10@ماشي` 42,38 · `b10@Dr` 42,67 (P, S) · `b10@med` 42,87 · `b10@med+0.2` 43,07 |
| b11 | ومن بعد، فـsite وفـInstagram، هاد الجوج حروف طاحو. | `b11` 43,22 (P, S) · `b11@site` 43,72 (P, S) · `b11@site+0.15` 43,87 · `b11@Instagram` 44,10 (P, S) · `b11@هاد` 44,77 (P, S) · `b11@الجوج` 45,02 · `b11@طاحو` 45,65 (P, S) · `b11@طاحو+0.14` 45,79 |
| b12 | في 2017 عاودات كتبات ليه: حيدها. ما حيدهاش، ودارت بيه شكاية. | `b12` 46,05 (P, S) · `b12@1` 46,25 (P, S) · `b12@1+0.25` 46,50 · `b12@عاودات` 46,55 · `b12@كتبات` 46,93 · `b12@ليه` 47,27 · `b12@5-0.08` 47,44 · `b12@5` 47,52 (P, S) · `b12@5+0.25` 47,77 · `b12@6` 47,86 (P, S) · `b12@حيدهاش` 48,06 (P, S) · `b12@ودارت-0.08` 48,36 · `b12@ودارت` 48,44 (P, S) · `b12@شكاية` 49,03 (P, S) · `b12@شكاية+0.25` 49,28 · `b12@end+0.05` 49,42 (P, S) |
| b13 | في 2019، المحكمة حكمات عليه بـ60 Tagessätze، يعني 60 يوم من خلصتو. | `b13` 49,79 (P, S) · `b13@1-0.05` 49,94 · `b13@1` 49,99 (P, S) · `b13@المحكمة` 50,28 (P, S) · `b13@حكمات` 50,72 (P, S) · `b13@عليه` 51,05 · `b13@5-0.08` 51,27 · `b13@5` 51,35 (P, S) · `b13@5+0.2` 51,55 · `b13@يعني` 52,22 (P, S) · `b13@يعني+0.06` 52,28 · `b13@8` 52,51 · `b13@من` 52,95 (P, S) · `b13@خلصتو` 53,15 (P, S) · `b13@خلصتو+0.05` 53,20 · `b13@خلصتو+0.4` 53,55 |
| b14 | ولكن دارو الاستئناف، وهاد الحكم عمره ما ولى نهائي. | `b14` 53,60 (P, S) · `b14@دارو` 53,90 (P, S) · `b14@الاستئناف` 54,19 · `b14@وهاد` 54,72 · `b14@عمره` 55,35 · `b14@نهائي-0.08` 56,01 · `b14@نهائي` 56,09 (P, S) · `b14@نهائي+0.3` 56,39 |
| b15 | الملف دخل فمحاكمة أخرى ديالو. | `b15` 56,54 (P, S) · `b15@دخل-0.1` 56,78 · `b15@دخل` 56,88 (P, S) · `b15@فمحاكمة+0.2` 57,32 · `b15@أخرى` 57,56 (P, S) · `b15@أخرى+0.2` 57,76 |
| b16 | وتما لقاوه مذنب فهاد «Dr.»: نهائي من 2022. | `b16` 58,30 (P, S) · `b16+0.05` 58,35 · `b16+0.10` 58,40 · `b16@لقاوه` 58,59 · `b16@مذنب` 58,93 (P, S) · `b16@Dr` 59,52 · `b16@نهائي-0.08` 59,64 · `b16@نهائي` 59,72 (P, S) · `b16@نهائي+0.3` 60,02 · `b16@نهائي+0.4` 60,12 · `b16@7` 60,26 · `b16@7+0.4` 60,66 |
| b17 | إيوا نتا: بـDoctorat ديال المغرب، لا «Dr.» لا «Dr. med.». | `b17-0.10` 60,87 (P, S) · `b17@نتا` 61,26 · `b17@Doctorat` 61,51 (P, S) · `b17@ديال` 62,08 (P, S) · `b17@المغرب` 62,38 · `b17@5` 62,76 (P, S) · `b17@7` 63,16 (P, S) · `b17@med` 63,56 · `b17@med+0.25` 63,81 |
| b18 | وشنو تكتب فبلاصتها، حتى المحاكم ما تفاهموش. | `b18` 63,91 (P, S) · `b18@تكتب` 64,20 · `b18@فبلاصتها` 64,50 · `b18@حتى` 64,98 (P, S) · `b18@المحاكم` 65,22 · `b18@تفاهموش` 65,86 (P, S) · `b18@تفاهموش+0.3` 66,16 |
| b19 | قبل ما تطبع cachet ولا تكتب bio، سول محامي ولا الـÄrztekammer، بالكتابة. | `b19` 66,40 (P, S) · `b19@ما` 66,65 · `b19@تطبع` 66,85 (P, S) · `b19@cachet` 67,14 (P, S) · `b19@4` 67,53 · `b19@تكتب` 67,77 (P, S) · `b19@bio` 68,06 (P) · `b19@bio+0.05` 68,11 · `b19@bio+0.12` 68,19 · `b19@سول` 68,31 (P, S) · `b19@محامي` 68,56 (P, S) · `b19@Ärztekammer` 69,14 (P, S) · `b19@Ärztekammer+0.5` 69,64 · `b19@Ärztekammer+0.55` 69,69 · `b19@بالكتابة` 69,91 (P, S) · `b19@بالكتابة+0.45` 70,36 |
| b20 | وإلا كتبات ليك، جاوبها. | `b20` 70,50 (P, S) · `b20@كتبات` 70,79 (P, S) · `b20@ليك` 71,13 · `b20@جاوبها` 71,38 (P, S) · `b20@جاوبها+0.3` 71,68 |
| b21 | نتا طبيب بالخدمة ديالك، ماشي بجوج حروف. | `b21-0.30` 71,81 (P, S) · `b21` 72,11 · `b21@طبيب` 72,36 (P, S) · `b21@بالخدمة` 72,65 · `b21@ديالك` 73,09 · `b21@ماشي` 73,43 (P, S) · `b21@بجوج` 73,72 · `b21@حروف` 74,01 (P, S) · `b21@end+0.05` 74,36 · `b21@end+0.15` 74,46 (P, S) · `b21@end+0.5` 74,81 (P) · `b21@end+2.7` 77,01 · `b21@end+2.8` 77,11 (P, S) · `b21@end+3` 77,31 · `b21@end+3.2` 77,51 · `b21@end+3.4` 77,71 · `b21@end+3.6` 77,91 |
<!-- REPERES:FIN -->

---

## 7. Risques et solutions

| # | Risque | Où | Solution proposée |
|---|---|---|---|
| 1 | **Les lettres-objets sont un dessin dédié** : la contre-forme du « D » (trou) peut être remplie par les hachures de rough.js ; un « r » trop maigre se lit « n » ou « i » en petit | partout (12 scènes) | Écrire `D.lettre` en premier et le valider SEUL sur une planche : D, r, point aux hauteurs 28, 46, 64, 90, 120, 220, sur laiton et sur papier. Remplir avec un `<path fill-rule="evenodd">` puis tracer les deux contours à part (`U.stroke`) et hachurer dans un `clipPath` du même tracé. Si le trou se remplit quand même : le redessiner par-dessus dans la couleur du fond (paramètre `fond`). Sous 40 px de haut, épaissir le fût du r de 15 % |
| 2 | **Le reflet de `TOI` dans la plaque** peut se lire comme une tête coupée ou une tête qui flotte | S1, S10, S25 | Le découper par le filet intérieur de la plaque, ajouter l'amorce du col (deux traits en V sous le menton) pour qu'il soit « dans » le laiton, opacité 0,85, trois traits de brillant par-dessus. Contrôle à ×2 sur S1 à t = 0,5 · 1,3 · 3,3 s. **Solution de repli, si l'auteur veut un personnage entier dès l'accroche** : plaque XL ramenée à 680 × 300 (y 560–860), `TOI` en pied dessous (pieds (700, 1400), échelle 0,9, veste, de trois quarts vers l'étiquette), étiquette inchangée — tout tient sans rien déplacer d'autre |
| 3 | **La caméra à la place de l'accusé** : sans personne au premier plan, l'image peut sembler vide en bas | S19 | le bord de la table de la défense (y 1300–1420) et les deux chevalets `D.platzschild` (y 1232–1296) ferment le bas du cadre ; à vérifier sur capture avec le sous-titre : les deux mots restent lisibles au-dessus de y 1300. Aucun personnage de dos dans l'épisode |
| 4 | **Citations allemandes : le mot à mot n'a pas été recontrôlé pour toutes** (`recherche.md` § 13) | S13 (Z1, Z2), S16 (Z3), S24 (§ 132a StGB), S25 (§ 69 HG NRW) ; S21 (Z13) est vérifiée | Avant le rendu, recopier chaque phrase depuis la page d'origine (liens du § 2 de `recherche.md`) et corriger le texte du nœud ; ne rien réécrire (le style indirect « handele », « sei » reste). Si une phrase ne peut pas être relue : la remplacer par des gribouillis et garder seulement la pastille (`Berufsdoktorat`, `entfernen`) |
| 5 | **La fiche anabin du Maroc n'a pas été relue** (base interactive) | S9 (écran), S24 (socle : `Marokko · Algerien · Tunesien (anabin · KMK)`) | L'auteur ouvre la fiche une fois (point 3 du scénario). **Si le mot « Berufsdoktorat » n'y est pas** : écran → en-tête `KMK · Vereinbarung (2025)`, texte `„… Doktorgrade, die ohne Promotionsstudien` / `und -verfahren vergeben werden` / `(so genannte Berufsdoktorate)“` (accord relu) ; socle → `(KMK)` au lieu de `(anabin · KMK)` et retirer `Algerien · Tunesien` ; la voix dit alors la phrase de remplacement du scénario et la pastille du haut de S9 devient `keine Promotion` / « ماشي Promotion » — la planchette, la ligne de niveau et le tampon ne changent pas |
| 6 | **La carte du Maroc est un sujet sensible** (tracé du Sahara) et celle de l'Iran inutile | S5, S11 | Choix voulu : un globe SCHÉMATIQUE, sans aucune côte ni frontière ; le Maroc et l'Iran sont un point et un nom. Seule l'Allemagne a un contour (règle de la série). Ne pas « améliorer » le globe en y dessinant des pays. À faire valider par l'auteur sur la première planche |
| 7 | **Le logo `@dr.aguilo` reste à l'écran pendant un épisode qui explique que « dr_… » et « dr.med.… » comptent comme port du titre** (S14, S15), et l'intro montre une plaque « Yassine » sans « Dr. » | tout l'épisode | Ce n'est pas un choix de mise en scène : c'est le point 1 des « Points pour l'auteur » (à voir avec sa Kammer ou un avocat AVANT publication). Ne rien changer au logo sans sa décision ; le lui rappeler à la remise des planches |
| 8 | **Objets proches de la colonne des boutons** (X > 915, Y 980–1650) | S24 (`KOL`, x ≤ 813 ; plaque droite jusqu'à x 885 mais au-dessus de y 825), S25 (plaque `Landgericht 2021` jusqu'à x 870, y 1008–1092 ; carte `Gesetz` jusqu'à x 860), S19 (`GRE` jusqu'à x 825, bureau jusqu'à 860), S7 (cartes jusqu'à x 830), S26 (fiche jusqu'à x 860), S20 (étiquette 2 jusqu'à x 830), S14 (fiche jusqu'à x 865), S13/S16 (lettre jusqu'à x 850), gloses de droite (jusqu'à x 865) | Tout est calculé pour x ≤ 870 dès que y ≥ 960 (écran X ≤ 904). À vérifier sur la planche `--ig`, surtout pendant les coups de zoom (+6 %) et en fin de scène (+4 %). Si un bord dépasse : décaler l'objet de 15 px vers la gauche (les compositions ont 20 à 40 px de marge à gauche) |
| 9 | **Le décor passe sous la pastille du haut** quand la caméra bouge | S1 (plaque), S2 (carte), S8 (fenêtre, y 560), S9 (écran, y 555), S12 (tringle, y 566), S13 et S16 (boîte, y 560), S15 (tringle, y 545), S19 (fenêtres, y 570), S24 (carte `Gesetz` au-dessus de la potence, y 600) | C'est pour cela que S6, S8, S9, S13, S15, S16, S21, S23, S29 n'ont AUCUN zoom, et que les zooms de S1, S2, S3, S7, S12 ont un `cy` choisi (calculs dans chaque scène). Contrôle : sur chaque planche, 15 px de mur nu au moins entre l'arabe de la pastille et le premier objet. Sinon : descendre l'objet de 15 px |
| 10 | **Scènes très courtes** | S10 (0,9 s), S18 (0,9 s), S15 et S28 (1,3 s), S20 (1,4 s), S14 et S17 (1,6 s) | Aucune grande cascade dans ces scènes ; S10 et S18 sont exclues de l'affiche. Si la vraie voix raccourcit la pause avant b13 sous 0,3 s : fusionner S18 dans le début de S19 (le Strafbefehl tamponné `EINSPRUCH` est alors la feuille qui tombe sur le banc du juge). Si b7 se termine plus vite : S10 commence à `b7@المهنة` |
| 11 | **Coupes possibles** proposées à l'auteur : « في 2009، » (b10), puis b5 en entier | S13 ; S7 | b10 : remplacer `b10@1` par `b10` (trois endroits : frappe de la lettre, tampon dateur, réglette). b5 coupé : supprimer S7 ; S6 dure jusqu'à `b6` ; l'atelier n'apparaît plus qu'en S10 et S26 (toujours compréhensible : c'est là qu'on fait les plaques) ; l'affiche passe à 23 cases (6 colonnes, dernière rangée incomplète) |
| 12 | **Plans typographiques trop calmes** (mesure : ≥ 5 % des pixels changent en 0,4 s) | S13, S16, S21, S22, S25 | Chaque scène a au moins trois sources de mouvement continu (reflets du laiton, pendules de repos, coin de papier, points « … », poussée du socle) + les frappes. S22 est calme EXPRÈS (roulettes, onglets, poussière) : viser ≥ 3 % là. Si `tools/mouvement.mjs` passe dessous : pendules de repos à 1,5°, respiration du papier à ± 0,8 % |
| 13 | **Textes denses ou superposés** | S9 (écran 5 lignes + glose + planchette + pastille), S13 (4 lignes + annotation + pastille), S23 (plaque + 2 tampons + annotation + pastille), S24 (socle 3 lignes + carte), S25 (2 plaques + carte) | Positions calculées pour ne rien superposer ; `tools/overlapscan.mjs` sur toute la durée. **Superpositions VOULUES, à ignorer dans le scan** : un tampon sur son document (S9 et S24 : `Berufsdoktorat` sur le diplôme ; S21 : `nicht rechtskräftig` sur `15.000 €` ; S3 : les deux coches sur les cadres), le trait qui barre `„Dr. med.“` (S13), les barres `§ 132a StGB` sur les plaques (S24). Si une scène reste trop chargée : S9 → retirer la ligne de recherche de l'écran ; S23 → retirer l'annotation allemande et ne garder que son arabe ; S13 → retirer l'annotation arabe (le sous-titre la dit) |
| 14 | **Affiche** : les cases reprennent le MONDE sans la caméra, recadré entre y 230 et 1310 | S15 (signes au sol à y 1338), S20, S21, S23, S27 (texte arabe sous y 1310), S29 (corbeille) | S15 est figée pendant la chute (signes vers y 1000–1100). Ailleurs, seul un bas de scène secondaire est rogné (sol, corbeille, dernière ligne arabe) : accepté. Vérifier les 24 cases sur une capture à `b21@end+3` ; les reflets (`clipPath`) doivent s'y afficher |
| 15 | **Glyphes absents de Kalam** : `✓`, `≠`, `›`, `„ “`, `×`, `…` | S3, S9, S13, S16, S20, S21, S25 | `≠` est un objet (`D.different`) ; la coche des tampons est un tracé (`D.empreinte({ coche: true })`), pas un caractère ; pour `›` utiliser `·` ; tester `„`, `“`, `×`, `…`, `€`, `§` sur une planche de texte : si un caractère tombe dans une autre police, le remplacer (`"…"` droits, `x`) |
| 16 | **Redessins** : `D.plaque` redessinée à chaque pas du reflet, de l'onde, de la gravure | S1, S29 surtout | Sortir le reflet et les étincelles de `D.plaque` (nœuds à part, simples transformations) ; arrondir `onde` et `n` à l'entier ; même graine → aucun scintillement du trait |
| 17 | **La main qui entre par le bas** (dessin dédié) peut cacher l'action ou flotter | S1, S7, S13, S26, S27 | L'avant-bras sort TOUJOURS du cadre (`L` ≥ 420) ; en S7 la main ressort dès que le cachet a frappé (l'empreinte doit être visible à `b5@Dr`) ; en S27 elle ressort avant la phrase arabe (rien ne passe sur une ligne arabe) ; en S1 elle tient un tournevis POSÉ sur la vis, jamais tendu dans le vide. Planche des cinq mains avant d'écrire les scènes |
| 18 | **Gloses arabes et mots allemands ajoutés par ce document** (absents du tableau du scénario) | plusieurs | Gloses **À VALIDER par l'auteur** : « دكتوراه · 1997 » (S3) · « cabinet ديالو » (S14) · « النيابة » (S21) · « المغرب · الجزائر · تونس » (S24) · « القانون: حبس حتى لعام ولا غرامة » (S24) et « القانون · كل Land وقانونو » (S25), assemblées de deux gloses du scénario · les gloses doubles des pastilles (« محكمة أعلى · أعلى محكمة فألمانيا », « مذنب · استعمال لقب بلا حق »). Tout le reste vient mot pour mot du scénario ou d'une phrase de `beats.js`. Mots allemands ajoutés, à faire relire : `Der Fall`, `Studium`, `in Deutschland`, `2. Brief`, `entfernen`, `nicht entfernt`, `antworten`, `Anfrage`, `pro Tag`, `seit 2022`, `Diplom`, `Universität · 1997`, `Krankenhaus`, `Abonnenten`, `Schilder · Stempel`, `Gesetz · Landesrecht`, les deux plaquettes de statut de l'affiche. Les petits textes d'ambiance (`Krankenhaus`, `Abonnenten`, `Assistenzarzt`, `Diplom`) n'ont pas de glose : ils sont doublés par une pastille ou par le sous-titre |
| 19 | **Vérité à l'image** | partout | Rien de « toi » n'est attribué au médecin : plaque, cachet, cartes, bio = plaquette `Beispiel` ou `REGEL`. Pour lui : seulement le badge, deux lettres datées, un site, deux fiches de compte, un Strafbefehl, une audience, des tampons. `Assistenzarzt` et `Krankenhaus` sur le badge sont sourcés (sans lieu). L'audience est une `Rekonstruktion` ; la main qui signe la lettre de 2009 aussi (elle n'affirme rien : pas de visage, pas de nom). Jamais : un prix près d'un acte, `bezahlt`, `rechtskräftig` près de `15.000 €`, « (MA) », « M.D. », un marteau, un guichet, une employée de la Kammer, un mot ou une image de l'autre procès |
| 20 | **Le jaune ailleurs que sur le laiton** (`k.ribbon`, `m.rays`, `m.shapes`, pastilles jaunes, `SC.stamp`, `m.ripple` par défaut) | scènes de l'histoire | Liste d'interdits dans les conventions ; `m.ripple(…, { col: "#9A9A94" })` ; halos crème ; contrôle par comptage des pixels jaunes (§ 3) |
| 21 | **Tête de `RIC`** : `hairTone: "blond"` sur un `oldman` doit rendre des cheveux et une barbe BLANCS ; proche du juge de 05 (gris, rasé) | S19 | Vérifier sur une tête ×2 ; si la barbe reste grise, garder ; si l'ensemble ressemble à un autre juge de la saison : `hair: "bald"` + `beard: "short"` est pris (04) → préférer `glasses: true` en plus |
| 22 | **Photo de l'intro** | S4 | `assets/portrait.png` n'est jamais dans git ; la copier depuis AKTE 03 au moment du rendu ; si elle manque, le hublot reste vide : le signaler, ne pas inventer un avatar |
| 23 | **`frappe` : la coupe doit tomber sur le contact** | toutes les entrées | Planche image par image (pas de 0,033 s) de `from − 0,05` à `from + 0,4` sur cinq scènes : à la 1re image l'objet touche sa place, opacité 1 ; s'il est encore en l'air, corriger l'avance (0,124 s) dans `frappe`. Jamais plus de deux secousses par seconde (S13, S18, S23 : espacer de 0,2 s au moins) |
| 24 | **Durée réelle** : avec la vraie voix, compter 77–78 s au lieu de 74,6 s | — | Tout est calé sur des mots : rien à refaire, sauf la musique (à recomposer) et les avances de scène (risque du § 6) |

---

## 8. Check-list de contrôle (pour celui qui construit)

**Avant d'écrire les scènes**
- [ ] `index.html` copié du gabarit, titre `AKTE 08 – Düsseldorf`, `SV_CONFIG` inchangé (`hold: 5.6`, `capTr: false`) ;
      `glossaire-episode.js` rempli avec les mots allemands DITS et leur arabe du tableau du scénario : `Dr.`,
      `Promotion`, `Berufsdoktorat`, `Dr. med.`, `Ärztekammer`, `Tagessätze` (déjà dans le glossaire commun),
      `Düsseldorf` ; glose propre à l'épisode `Landgericht` → « محكمة أعلى » (le glossaire commun dit « محكمة
      الاستئناف » : faux ici).
- [ ] Planches d'objets seuls, validées avant tout : **les lettres-objets** (risque 1) ; **les cinq mains**
      (risque 17) ; **les deux chevalets de table** devant le banc de `RIC` (risque 3) ; `D.plaque` dans ses formats (XL, M, S, porte,
      Yassine, émail) ; `D.etiquette` (une ficelle, deux ficelles, grisée, cassée) ; `D.empreinte` (les 11 textes).
- [ ] Les cinq têtes Persona à ×2 (`TOI`, `KOL`, `RIC`, `STA`, `GRE`) : aucune ne ressemble à un personnage
      d'AKTE 02, 03 ou d'un autre épisode de la saison (liste au § 1).
- [ ] `node tools/errcheck.mjs videos/akte-duesseldorf-titel/index.html 0 4 7 10 19 21 23 26 30 32.3 34 37 41 44
      45.5 47 48.5 49.8 51 53 55 57.5 59.5 62 65 67.5 69.5 71 73 78` : aucune erreur, `SV.error` nul.
- [ ] `node tools/cuetimes.mjs videos/akte-duesseldorf-titel/index.html` sur les repères du § 6 : aucun manquant.

**Planches avec la maquette Instagram**
- [ ] `node tools/planche.mjs videos/akte-duesseldorf-titel --beats --ig` : sur chaque image — rien d'utile hors
      de X 90–990 ni au-dessus de Y 250 ; rien sous Y 1470 sauf des avant-bras ; aucun personnage, texte ni objet
      dans la colonne des boutons ; la pastille du haut ne touche aucun objet (15 px de mur nu) ; la plaquette de
      mode et la réglette lisibles sous le logo ; `cx` jamais différent de 540.
- [ ] Début de chaque scène image par image : `node tools/planche.mjs videos/akte-duesseldorf-titel --from T
      --to T+1.0 --step 0.1 --ig` pour T = 0 · 3,7 · 6,5 · 8,8 · 18,1 · 20,0 · 22,0 · 24,0 · 28,1 · 31,9 · 32,8 ·
      35,5 · 38,7 · 43,2 · 44,8 · 46,0 · 47,9 · 49,4 · 50,3 · 52,2 · 53,6 · 56,5 · 58,3 · 60,9 · 63,9 · 66,4 ·
      68,3 · 70,5 · 71,8 : la coupe tombe sur le choc (risque 23) ; rien ne « saute » entre S8 → S9 (la pile de
      droite est la même, déplacée) ni entre S20 → S21.
- [ ] Première image (t = 0) : plaque, lettres, étiquette « 15.000 € » en place, reflet de `TOI`, main qui visse,
      pastille `Amtsgericht Düsseldorf · 02.08.2019 · 1. Instanz`, ligne de dossier — visibles sans fondu.
- [ ] Intro : bas du bloc à Y ≤ 1300 (prévu : 1227) ; logo du haut masqué ; ni plaquette ni réglette ; la plaque dit
      « Yassine », pas « Dr. ».
- [ ] `python3 sketch-video/tools/ig_overlay.py` sur une capture de S1, S19, S24 et de l'affiche.

**Chevauchements**
- [ ] `node tools/overlapscan.mjs videos/akte-duesseldorf-titel/index.html 0 80 0.1` : aucune paire de textes
      superposés, hors la liste des superpositions voulues (risque 13).
- [ ] À l'œil, sur les planches : aucune ligne arabe touchée par un trait, une ficelle, un tampon, une lettre qui
      tombe, une chaîne ou une main ; aucun corps n'en touche un autre (S6, S19, S24, S29) ; aucune pastille sur
      une tête.

**Mouvement**
- [ ] `node tools/mouvement.mjs videos/akte-duesseldorf-titel --min 5` : aucune scène « FIGÉ » (l'intro ne compte
      pas ; S22 : seuil 3 %).

**Vérité et style**
- [ ] Comptage des pixels jaunes : seulement plaques de laiton, lettres-objets, épingle (+ intro, sous-titres,
      affiche).
- [ ] « 15.000 € » n'est jamais à l'image sans `1. Instanz` ou `nicht rechtskräftig` ; `rechtskräftig` jamais à
      moins de 200 px d'une étiquette « 15.000 € » non grisée.
- [ ] Aucun nom de personne, de cabinet, de société, d'université, d'hôpital ni de ville d'hôpital ; boîtes aux
      lettres, badge, plaques et comptes : pointillés ou vide.
- [ ] Le médecin de l'affaire n'a jamais de visage (pictogramme, badge, chevalet de table ; jamais de dos) ; aucune plaque, aucun cachet, aucune
      carte ne lui est attribué ; le gros dossier de S22 n'a ni titre ni image.
- [ ] « (ir) » n'apparaît jamais sans la note `(ir) : Tatsache aus dem Urteil — keine Regel` ; « (MA) » et « M.D. »
      n'apparaissent nulle part.
- [ ] `laut Presse` sur `angezeigt` (S17) et sur `13.500 €` (S18) ; `Rekonstruktion` pendant toute S19 ; `Gesetz`
      sur les deux cartes de loi ; `Keine Rechtsberatung — frag deine Ärztekammer` de S24 à la fin.
- [ ] Personne ne bouge les lèvres ; aucune bulle dans tout l'épisode ; ni marteau, ni guichet, ni balance.
- [ ] Citations allemandes recopiées depuis la source (risque 4) ; fiche anabin vue par l'auteur (risque 5).
- [ ] Affiche : 24 cases lisibles, grille finie avant la carte (y 933 < 960), question écrite, teaser
      `AKTE 09 · قريبا`, deux plaquettes de statut, rien dans la colonne des boutons.
- [ ] Les gloses « À VALIDER » et les mots allemands ajoutés (risque 18), le globe sans frontières (risque 6) et le
      point « @dr.aguilo » (risque 7) sont montrés à l'auteur avec les premières planches.

---

## Écarts de construction

Ajoutés pendant la construction (le reste du document est inchangé). Étape « socle et décors 1 » (S1 à S7, HUD, intro).

- **`D.loupe`** : segments de 130 px (au lieu de 160) et bras attaché au côté haut-gauche de la tête. Avec 160 px, le
  coude montait à y ≈ 497, sous la pastille du haut (zone nue y 380–535). Pied (150, 600) et lentille (270, 730)
  inchangés ; coude en (274, 561).
- **`D.rollkarte`** : coins repliés de 44 px (et non plus grands) : à 62 px, le coin gauche touchait la ligne arabe
  « استعمال لقب بلا حق » (y 1272). Plis de la feuille placés à y monde 1100, 870, 690, 340 (baguette en (540, 1340)) :
  aucun ne passe derrière la pastille du haut, ni à la caméra `AXE` ni au zoom ×1,25. Petite rose des vents grise
  en (802, 600).
- **`D.cadre`** (S3) : le sceau est à gauche à mi-hauteur et les gribouillis à droite ; la bande basse du document est
  laissée libre pour les tampons `Arzt ✓` et `Doktortitel ✓` (sinon le tampon recouvrait le sceau).
- **`D.atelier`** : bord avant de l'établi ramené à x 120–960 (règle « décor entre 110 et 960 »). Places des outils et
  des bons dans `out.outils` / `out.bons` : quatre burins (362, 398, 434, 470 ; y 700), compas (522, 700), scie bocfil
  (252, 808), équerre (800, 828) ; bons (394, 590), (468, 590), (872, 590).
- **Ajouts hors inventaire** : `D.clou` (S2), `D.suspension` et `D.cartons` (S6), `D.outil` et `D.bon` (S7, S10, S26) ;
  option `fil` de `D.silhouette` (le cordon balance avec le médaillon, pivot = `out.accroche`).
- **À savoir pour les scènes** :
  - S1 : la pointe du tournevis de `D.main` est à 172 px de la paume (`out.pointe`). Pour qu'elle touche la vis
    (226, 1014) avec `a: 8`, la paume va vers (202, 1184), pas en (212, 1090).
  - S6 : le petit diplôme (centre (420, 1150)) cache le buste de `TOI` ; ses mains doivent être redessinées
    PAR-DESSUS (`only: "handL"` / `"handR"` après le diplôme). Le tube se pose avec une rotation de 35° (le dessin
    est horizontal).
  - S7 : l'avant-bras qui tient le cachet passe devant le bloc ; il doit ressortir avant `b5@Dr` (risque 17).

Étape « décors 2 » (S8 à S23, dans `decor-2.js` ; `D.fiche` aussi pour S26). Compositions S8 à S23 vérifiées aux
coordonnées monde de ce document, caméra `AXE`, avec les textes principaux, les zones Instagram et, en S19, `RIC`, `STA`, `GRE`.

- **Ordre de chargement** : `tools/essai_decor.mjs` charge `decor-2.js` avant `decor.js` (tri alphabétique). `decor-2.js` et
  `decor-3.js` attendent donc `D.util` (`D._apres`, lancé à la fin de `decor.js`). Rien ne change pour `index.html`.
- **`D.fenetreArc`** : appui remonté (y local 146–160) : la fenêtre tient dans y 560–880 comme écrit plus haut (au lieu de
  320 × 335). Avec l'appui à y 895, il dépassait sous l'écran de S9 et touchait la glose « القاعدة الرسمية ديال الدبلومات » (918).
- **`D.brief`** : en-tête en Kalam 33 (et non 36). Mesuré dans le navigateur, « Ärztekammer Nordrhein » fait 386 px à 36 et
  touchait le tampon dateur (x 610) ; à 33, il finit à x 606. Plis à y local −88 et +104 (monde 1037 et 1229 en S13) au lieu
  de ±90 : à +90 (monde 1215), le pli passait sous l'annotation arabe « ماشي «Dr. med.» ». Option `plis`.
- **`D.stetho`** : la lyre pend au milieu et le pavillon à DROITE (x 820–905 en S12, et non 795–905) : à gauche, le pavillon
  passait derrière le badge (qui finit à x 820).
- **`D.salleFace`** : rais de lumière à l'opacité 0,24 (et non 0,10, invisible sur le mur clair), bords en tirets blancs.
  Option `rais`.
- **`D.badge({ mini: true })`** : un anneau d'acier autour de la petite tringle au lieu d'un cordon (32 px ne suffisent pas
  pour un cordon lisible).
- **`D.poste`** : tiroir du bureau ramené à x 636–872 (hors de la colonne des boutons).
- **`D.etiquette`** (`decor.js`) : les textes trop grands pour l'étiquette sont réduits (largeur, puis hauteur utile) ; l'œillet
  est plus petit sur une petite étiquette. Les étiquettes de S1 à S3, S20, S21, S23 ne changent pas ; celle de S18 (250 × 84,
  40 + 20 px demandés) passe à 30 + 15 px : 40 + 20 ne tient pas sous l'œillet.
- **Noms de compte** (`D.fiche`) : le corps est réduit pour tenir dans la fiche (« … » mesure 0,64 em dans Kalam, pas 0,47) :
  « dr.med.……… » passe à ≈ 25 px dans la fiche, ≈ 28 px dans la pilule.
- **Ajouts hors inventaire** : `D.lierre` (S13, S16 : treillage + lierre, partie `lierre` pour le balancement) et `D.dossier`
  (S19 : le dossier qui tombe sur le banc ; ouvert : celui de `STA`).
- **À savoir pour les scènes** (constaté sur les compositions, rien n'est changé dans le texte ci-dessus) :
  - S9 : le tampon `Berufsdoktorat` en (360, 1262) couvre « Doctorat en Médecine » du petit diplôme (deux mots l'un sur l'autre).
    Le poser plus bas, sur les gribouillis (≈ (360, 1290)), garde les deux lisibles.
  - S13 : la glose « ماشي «Dr. med.» » s'affiche « «.Dr. med» » (ordre bidirectionnel) : isoler le latin (U+2066 … U+2069)
    ou poser « «Dr. med.» » dans un nœud à part.
  - S18 : la glose « حسب الصحافة » en (760, 905) est coupée par le bord droit de la feuille (x 760) : la poser en (822, 905).
  - S19 : `Persona.util.rig` donne pour `RIC` (pieds (540, 1160), ×0,80) : haut de la tête 810, menton 922, épaules 930 (au ras
    du banc). Une feuille de 90 × 120 tenue en (540, 880) cache tout son visage : la tenir basse (centre ≈ (540, 955), on en voit
    le haut au-dessus du pupitre) et ne la lever que de 15 px. Mains de `GRE` : épaules (745 et 805, 1015), clavier en
    (776, 1085) : portée ≈ 75 px, juste. Ordre : `GRE` → `D.bureauGreffe({ partie: "meuble" })` → `partie: "clavier"` →
    mains de `GRE` (`only`).
  - S21 et S23 : la dernière ligne arabe (y 1356 et 1342) tombe sur la plinthe de `D.mur` (sol par défaut 1385, plinthe
    1355–1385) : poser `D.mur({ sol: 1420 })`.
  - S23 : l'étiquette (corps x 175–355, y 981–1091) et la plaque des tribunaux (x 320–800, y 947–1003) se recouvrent sur
    x 320–355 : décaler la plaque et sa glose de 40 px à droite, centres (600, 975) et (600, 1040) → plaque x 360–840
    (l'étiquette reste pendue au bout du rebord, qui commence à x 250).
  - S12 : le badge (x 260–820) passe devant la moitié droite de la blouse (x 130–330) : voulu (le badge pend devant).
  - `D.rebord` en S23 : `consoles: [−180, 180]` (sinon une console tombe sous l'étiquette, en x 265).
