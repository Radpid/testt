# AKTE 07 — « الگروپ » (Siegburg, message de 2025 · jugement de 2026) — STORYBOARD

Numéro provisoire (`const AKTE_NO = "07"`, `AKTE_NEXT = "08"`, à UN seul endroit de `story.js`).
Texte figé : `scenario.md`, `beats.js` (23 beats : b1–b3, i1–i3, b4–b20), `timings.js` **PROVISOIRE** (69,3 s).
Ce document se suit tel quel pour écrire `decor.js`, `story.js`, `index.html`. Tout ce qui bouge y est.
Écrit le 26.11.2026 d'après : le skill, `SERIE.md`, `SAISON-2.md` (fiche 07 + les cinq autres), `scenario.md`
(y compris « Ce qui n'est PAS dit mais montré », qui fait loi), `recherche.md`, `serie/lib/stage.js`, `motion.js`,
`persona.js`, le gabarit, et (pour la technique seulement) AKTE 03.
La distribution, les poses difficiles et les mises en page ont été RENDUES pour essai avant d'être prescrites
(§ 7, R7–R9) : `out/essais/essai_cast.png`, `essai_poses.png`, `essai_ecran.png`, `essai_pieces.png` (hors git ;
les `.html` à côté se relancent tels quels). Tous les repères du § 6 ont été contrôlés par script contre
`beats.js`, avec la règle exacte du moteur (`engine/runtime.js`, `parseCue`).

---

## 0. Direction en dix lignes

1. **Tournure : la comédie dans le téléphone.** On ne « raconte » pas : on LIT ce qui s'affiche, dans l'ordre où
   ça s'affiche. Un GRAND smartphone dessiné au trait occupe l'écran du Reel ; son cadre ne bouge jamais d'un
   pixel d'une scène à l'autre. Le ton est léger jusqu'au silence (après b10), sobre ensuite, puis une leçon nette.
2. **Dispositif signature : le fil de discussion et ses avatars vivants.** Neuf têtes rondes (Persona) qui
   clignent et regardent les messages ; UNE bulle (la sienne à elle) qui grandit ligne après ligne de b7 à b9,
   reste un BROUILLON (contour en pointillé) jusqu'à la fin de b10, puis part : c'est seulement à cet instant
   qu'elle prend la teinte de l'épisode. Elle finit collée dans une page du jugement (b20).
3. **Teinte : vert « message envoyé » très pâle** — une hachure `#9CCB98` sur fond papier, sur CETTE bulle
   seulement (plus le petit bouton d'envoi et les sept pastilles « transmis » de la scène 11, qui sont le même
   message). Mesuré sur la maquette la plus chargée : 2,3 % de l'image. Aucun
   autre vert, aucun bleu, aucune coche.
4. **Caméra : le défilement vertical.** Dans le téléphone, la « caméra » est le fil qui monte : son fond (un
   semis de petits motifs gris) remonte sans arrêt (6 px/s : c'est la poussée lente de l'épisode), les
   messages sautent vers le haut quand un nouveau arrive, et tout **s'arrête une seule fois : pendant le
   silence**. Hors du téléphone, la caméra ne bouge que de haut en bas (jamais de travelling
   latéral), zooms ≤ ×1,25.
5. **Transition signature : la notification qui descend.** Une bannière tombe du haut de l'écran du téléphone
   et déroule la nouvelle page de haut en bas, par-dessus l'ancienne encore visible (« T-NOTIF », 0,36 s).
   Hors du téléphone : la même bannière tombe en haut du cadre. `stage.js` n'a pas de glissement haut → bas et
   ne se modifie pas : tout est fait DANS les scènes, avec `in: "cut"`.
6. **Deux pièces seulement** (figure imposée) : la salle des médecins (machine à café, tableau des gardes du
   week-end, patères, porte) et le salon (canapé, plaid, tasse, fenêtre, lampadaire). On y entre en « sortant »
   du téléphone (il rétrécit jusque dans la main du personnage) et on en sort en y replongeant. Deux scènes
   « papier » sans pièce (la lettre de l'été, la page du jugement) : le scénario veut que l'histoire change de
   matière après le silence.
7. **Personne ne réagit dans le fil** : sept avatars au visage neutre, aucun rire, aucune réponse, aucune
   coche, aucun « lu ». Les diagnostics sont des barres noires. Le tribunal est une IMAGE d'appel vidéo
   (« Rekonstruktion »). L'argent est une somme ORDONNÉE (« zu zahlen », une petite horloge « en attente »),
   jamais un virement reçu.
8. **Formes imposées** : tribunal = appel vidéo à deux tuiles (la juge et ses deux assesseurs en civil / elle),
   un camembert 70 / 30 qui passe d'une tuile à l'autre ; sanction = une demande de paiement dans le fil +
   un ticket de caisse de deux lignes ; carte = l'application « Plans » du téléphone, épingle sur le TRIBUNAL ;
   intro = la fiche « contact » de Yassine ; pas de décès, donc pas de scène muette de décès : le seul silence
   est celui du fil (1,3 s).
9. **Ton et son** : contrebasse en pizzicato et claquements de doigts ; aucun son d'interface (ni « ding », ni
   « pop », ni souffle d'envoi) : le bruit signature est le VIBREUR du téléphone posé sur du bois.
10. **Différences** — AKTE 02 : cellule, couple, chambre, icônes de peine ; AKTE 03 : bloc, scotch, escalier,
    transitions `swipe` ; 04 : balance, compteur à rouleaux, travelling latéral, aucune bulle ; 05 : hôpital en
    coupe, nuit bleue, ascenseur ; 06 : plongée à 90°, mains, pilulier ; 08 : lettres-objets, frontal ; 09 :
    écran coupé en deux, encre. Ici : un cadre de téléphone fixe, des avatars ronds, du défilement vertical, du
    texte tapé, un seul vert pâle, aucun `swipe`, aucun moniteur, aucune balance, aucune icône de peine.

---

## Conventions (valables pour tout le document)

### Trois familles de scènes

| famille | scènes | où l'on dessine | repère |
|---|---|---|---|
| **ÉCRAN** (dans le téléphone) | 1, 3, 4, 5, 8, 9, 10, 11, 13, 15, 16, 17, 18, 19, 20 | tout dans `c.hud` (calque fixe) ; `c.cam` ne reçoit que le papier et quatre petites formes | **pixels de la vidéo, exacts** (aucun zoom de caméra) |
| **PIÈCE** (salle des médecins, salon) | 2, 6, 7, 14 | `c.cam`, cadrage global habituel `view: { s: 1.06, oy: -20, breathe: 0.04 }` | « monde » : caméra `{ s: 1, cx: 540, cy: 920 }` ; `écran x = 540 + (x − cx)·k`, `écran y = 940 + (y − cy)·k`, `k = cam.s × 1,06` au début de la scène et `× 1,10` à la fin |
| **PAPIER** (lettre, page du jugement) | 12, 21 | `c.cam`, scène déclarée avec `view: false` | monde = pixels de la vidéo tant que la caméra reste `{ s: 1, cx: 540, cy: 960 }` |

Pourquoi `c.hud` pour les scènes ÉCRAN : le cadre du téléphone doit être identique au pixel près d'une scène à
la suivante ; or le cadrage global agrandit chaque scène de 4 % pendant sa durée, et la remet à zéro au
changement de scène. `c.hud` n'est pas touché par la caméra. Conséquences : `c.camera`, `c.kick` et `c.shake`
n'ont **aucun effet** sur une scène ÉCRAN → on utilise `punch` et `buzz` (plus bas) ; `m.obj`, `m.speech`,
`m.typing`, `m.dust`, `m.rays`, `m.ripple`, `m.shapes` créent leurs nœuds dans `c.cam` → les **re-parenter**
aussitôt (`parent.appendChild(noeud.g)`) ; tout le reste accepte un `parent` (`c.node`, `c.group`, `c.put`,
`c.sk`, `c.text`, `c.clipped`, `k.chip(…, { parent })`, `k.card`, `k.ribbon`, `k.ar`).

Tableau de conversion des scènes PIÈCE (caméra `cy: 920`) :

| monde | y 410 | y 515 | y 540 | y 866 | y 1130 (plinthe) | y 1320 (pieds) |
|---|---|---|---|---|---|---|
| écran (début → fin de scène) | 399 → 378 | 511 → 494 | 537 → 521 | 883 → 880 | 1163 → 1171 | 1364 → 1381 |

### Le téléphone (constantes `TEL`, pixels de la vidéo)

```
coque        x 150 → 900, y 280 → 1440, rayon 64          (centre 525, 860)
écran        x 172 → 878, y 302 → 1384, rayon 42          (706 × 1082)
barre d'état y 302 → 346    date du récit à gauche (x 202), encoche (500–550), réseau + batterie à droite (752–846)
en-tête      y 346 → 440    flèche (x 200), pastille du groupe (252, 393, r 26), titre x 294 y 390 (36 px), sous-titre y 422 (21 px)
bande        y 440 → 574    LA place des pastilles : une à la fois, centre (525, 486) ; arabe détaché, ligne de base ≈ y 552
fil          y 574 → 1300   découpe (172, 574, 706, 726) ; contenu défilant
saisie       y 1300 → 1384  champ arrondi x 196 → 770 (y 1314 → 1370), bouton d'envoi (822, 1342, r 30)
menton       y 1384 → 1440  la mention de source, centrée (525, 1422)
boutons      volume x 144 → 150 (y 520–604 et 624–708), marche x 900 → 906 (y 560–670)
```

Contrôlé sur maquette avec les zones Instagram (`out/essais/essai_ecran.png`) : bord droit à 906 (la colonne
des boutons commence à 915), haut à 280 (le logo finit à 268), bas à 1440 (le sous-titre commence vers 1490, son
scotch vers 1470). **Dans le fil, rien à droite de x 866** (son avatar à elle : centre 832, rayon 32).

Colonnes du fil : avatar des autres centre x 216 (r 30) ; bulles des autres à partir de x 262 ; SES bulles à elle
finissent à x 798 ; son avatar centre (832, bas de bulle + 46), r 32. Queue des bulles : toujours du BAS de la
bulle (`Motion.bubblePath`), pointe = bord de l'avatar de l'auteur : `(806, bas + 30)` pour elle,
`(244, bas + 26)` pour les autres (avatar centre `(216, bas + 36)`).

### Squelette d'une scène ÉCRAN (à écrire UNE fois dans `story.js`)

```js
// ecran(c, o) → { tel, page, fil, dessus, scr }   o = { date, titre, sous, app, trou, mention:[de, ar], entree }
//   c.hud
//    ├─ fond      papier (troué à la place de l'écran si o.trou) + 4 formes m.shapes re-parentées
//    ├─ tel       NŒUD-GROUPE : reçoit buzz(), punch() et les entrées (zoom depuis la main, montée du bas)
//    │   ├─ corps     D.tel(g, { ecran: o.trou ? "trou" : "plein" })
//    │   ├─ page      <g clip-path=…>  rectangle (172, 302, 706, h, rx 42) dont h est animé si T-NOTIF
//    │   │   ├─ papier de l'écran (rect #FCFCF9) · barre d'état · en-tête · bande · saisie
//    │   │   └─ fil   = c.group(c.clipped(172, 574, 706, 726, page))  → .on((t, s) => { s.y -= defile(t); })
//    │   ├─ dessus    ce qui sort du fil (loupe de la citation, carte « source », pouce) : PAS découpé
//    │   └─ menton    mention
//    └─ notif     bannière (découpée par l'écran : elle sort de sous le bord haut)
const punch = (n, at, amt = 0.04, dur = 0.5) => { const a = T(at); n.on((t, s) => { const p = prog(t, a, dur);
  if (p > 0 && p < 1) { s.px = 525; s.py = 860; s.s *= 1 + amt * (p < 0.18 ? E.out(p / 0.18) : 1 - E.inOut((p - 0.18) / 0.82)); } }); };
const buzz = (n, at, amp = 8, dur = 0.38) => { const a = T(at); n.on((t, s) => { const p = prog(t, a, dur);   // le vibreur
  if (p > 0 && p < 1) { s.x += Math.sin((t - a) * 150) * amp * (1 - p); s.px = 525; s.py = 860; s.r += Math.sin((t - a) * 120) * 0.45 * (1 - p); } }); };
// défilement du fil : position de départ y0 + sauts amortis { at, dy, d } ; le glissement continu est celui du SEMIS
const defileur = (y0, sauts) => (t) => y0 + sauts.reduce((y, k) => y + k.dy * E.out(prog(t, T(k.at), k.d || 0.35)), 0);
const semisY = (t0, stop = 1e9) => (t) => ((Math.min(t, stop) - t0) * 6) % 240;   // motif de 240 px de haut, répété
// découpe animée (T-NOTIF) — NE PAS utiliser Node.wipe sur la page : son inset() se mesure sur la boîte englobante,
// qui déborde dès que le fil défile.
// plongée dans le téléphone (ou sortie, avec sortie = true) : le nœud passe de (x0, y0, échelle k0) à sa place (525, 860, 1)
const zoomTel = (n, at, x0, y0, k0 = 0.072, dur = 0.4, sortie = false) => { const a = T(at); n.on((t, s) => {
  const e = sortie ? 1 - E.inOut(prog(t, a, dur)) : E.out(prog(t, a, dur));
  s.px = 525; s.py = 860; s.s *= lerp(k0, 1, e); s.x += (x0 - 525) * (1 - e); s.y += (y0 - 860) * (1 - e); }); };
const decoupe = (c, id, at, dur = 0.32) => { const cp = el("clipPath", { id }, st.defs), r = el("rect", { x: 172, y: 302, width: 706, height: 1082, rx: 42 }, cp);
  if (at != null) { const a = T(at); c.tick((t) => r.setAttribute("height", Math.max(0.01, 1082 * E.out(prog(t, a, dur))).toFixed(1))); } return `url(#${id})`; };
```

### Les entrées de scène (toutes avec `in: "cut"` sauf mention contraire)

| nom | de → vers | recette |
|---|---|---|
| **T-NOTIF** | ÉCRAN → ÉCRAN, nouveau jour ou nouvelle application | `in: "cut", inDur: 0.36`, `trou: true`. La scène sortante reste affichée 0,36 s SOUS la nouvelle (elle vit encore). t0 : la bannière `D.notif` tombe de 100 px (0,16 s, `E.back`) et se pose en (215 → 835, 316 → 404). t0 + 0,04 → + 0,36 : la découpe de la page descend de 0 à 1082 px (`decoupe`). t0 + 0,9 : la bannière remonte (0,2 s) et la date de la barre d'état bascule (glisse de −20 px, 0,2 s). |
| **coupe** | ÉCRAN → ÉCRAN, même fil, même instant | `in: "cut", inDur: 0`, `trou: false`. La nouvelle scène reprend le fil exactement dans l'état où la précédente l'a laissé (mêmes fonctions de construction, états initiaux donnés dans chaque scène). |
| **sortie du téléphone** | ÉCRAN → PIÈCE | `in: "cut", inDur: 0`. Un « fantôme » (`D.tel` avec `mini: true`, écran simplifié), dans `c.hud`, part de la taille pleine et rétrécit en 0,42 s (`zoomTel(…, sortie = true)`) jusqu'à la main du personnage (échelle 0,072) ; il s'efface à t0 + 0,42, remplacé par `D.telMini` dans la main. Le décor se construit derrière, en cascade. |
| **plongée dans le téléphone** | PIÈCE → ÉCRAN | `in: "cut", inDur: 0.4`, `trou: false`. Le nœud `tel` part de la main (échelle 0,072) et grandit jusqu'à 1 en 0,4 s (`zoomTel`) ; le papier (`k.bg()`) apparaît en fondu de t0 + 0,1 à + 0,4 ; la pièce reste visible derrière pendant ce temps. |
| **montée** | PIÈCE ou PAPIER → ÉCRAN, sans personnage | `in: "cut", inDur: 0.36`. Le nœud `tel` monte de 760 px depuis le bas (0,36 s, `E.out`) + `buzz` ; papier en fondu 0,3 s. |
| **glissement** | ÉCRAN ou PIÈCE → PIÈCE | `in: "slideUp", inDur: 0.34` (la pièce monte du bas, comme un fil qu'on fait défiler) + la bannière de date en haut du cadre. |

### Pastilles, mentions, bannière

- **Pastilles** (`k.chip(de, ar, x, y, taille, { parent })`, socle) : UNE à la fois. ÉCRAN : centre (525, 486),
  dans la bande, parent `page` ; largeur ≤ 660 (au pire : taille 22 pour 52 signes). PIÈCE et PAPIER : centre
  (520, 420) dans `c.hud`, largeur ≤ 760 ; rien du décor derrière (monde : x 240 → 800, y 410 → 515 vides).
  Une citation mot pour mot s'écrit entre « » ; une annotation de la série (date, numéro, mot du glossaire)
  sans guillemets. Jaune (`{ yellow: true }`) seulement pour : la somme, la règle, « im Urteil zitiert ».
- **Mention de source** : ÉCRAN → dans le menton, une ligne : allemand `de` 22 px puis, 16 px plus à droite,
  arabe `ar strong` 26 px, ex. « laut Urteil » · « حسب الحكم » ; l'ENSEMBLE est centré sur x 525 (mesurer les
  deux largeurs ; la plus longue, « laut Urteil (Auszug der Nachricht) » + « حسب الحكم », fait ≈ 520 px). PIÈCE et PAPIER → étiquette en bas à
  gauche dans `c.hud` : rectangle arrondi (104 → 470, 1404 → 1450), mêmes deux textes. Quatre mentions :
  « laut Urteil · حسب الحكم », « laut Gericht · حسب المحكمة », « laut ihrer Nachricht · حسب الميساج ديالها »,
  « Rekonstruktion · مشهد تمثيلي ». Quand une pastille ne vient pas de la même source que la mention de la
  scène, elle porte un micro-texte « laut Urteil » (`de light` 17 px) collé sous son coin droit.
- **Bannière** `D.notif` : ÉCRAN → (215 → 835, 316 → 404) ; PIÈCE → (240 → 840, 300 → 384) dans `c.hud`. Icône
  au trait (une petite bulle, aucune marque), titre `de` 28 px à x + 76, arabe `ar strong` 28 px ancré à droite
  (x fin − 22). Elle tombe (`m.build(…, "drop", { dist: 110, dur: 0.16 })`), reste 0,9 à 1,2 s, remonte.
- **Texte tapé** : `c.write(noeud, repère, durée)` ; une ligne de 40 signes en 0,45 s. Un curseur (barre
  verticale 3 × 28, encre) clignote à 2 Hz au bout du texte tant que la bulle est un brouillon.
- **Typographie** : allemand `de` (Kalam 700) ; texte courant des bulles `de light` (Kalam 400) 26 px,
  interligne 42 ; titres arabes `ttl` (Lalezar) ≥ 40 px ; traductions `ar strong` (Plex Arabic 700) ≥ 26 px,
  révélées de droite à gauche (`wipe(…, "rtl")`), contour papier (`paint-order: stroke`) dès qu'elles sont
  posées sur un décor. Aucune police nouvelle.
- **Couleurs** : encre `#1C1A1C`, papier `#F7F7F1`, écran `#FCFCF9`, gris hachurés du socle, jaune `#F8CE4E`,
  **vert** `VERT = { base: "#FCFCF9", hatch: "#9CCB98", gap: 9, fw: 1.3 }` (bulle envoyée) et `#DCEFD9` (bouton
  d'envoi, seulement quand un message vient de partir). Pas de voile rouge (`m.alarm` interdit ici).
- **Parole** : `talk: 0` pour tout le monde, sauf ELLE en b14 et la JUGE en b15 (§ 1). Écrire un message n'est
  pas parler : les lèvres ne bougent pas.

---

## 1. Distribution

Tous neufs. Contrôle fait contre AKTE 02 (femme `longwave` foncé enceinte ; homme `short` foncé `stubble` ;
médecin âgée `bun` gris à lunettes ; juge `crown` gris ; expert gris à lunettes) et AKTE 03 (`ponytail`
châtain ; `bob` foncé à lunettes ; `oldman` gris moustache ; `shortcurly` châtain FEMME ; homme `short`
châtain barbe ; juge `oldwoman` `bob` gris ; `bald` gris à lunettes ; `bun` blond) : aucune combinaison
reprise. Dans cet épisode, **elle seule est blonde, lui seul est bouclé** : on les reconnaît à 60 px.
Contrôle croisé avec les cinq autres storyboards de la saison (26.11.2026) : `K3` était `ponytail` foncé à
lunettes = la collègue `KOL` d'AKTE 08 → carré châtain sans lunettes ; `K5` était `oldwoman` `longwave` gris sans
lunettes = la Schöffin d'AKTE 04 → cheveux courts gris à lunettes ; `AS1` (couronne grise + barbe courte) était
le sosie du juge chauve à barbe grise d'AKTE 04 → couronne FONCÉE.

| const | rôle | look | hair | hairTone | beard | glasses | tenue(s) | seed |
|---|---|---|---|---|---|---|---|---|
| `ELLE` | la Stationsärztin (l'expéditrice) | `woman` | `longwave` | `blond` | — | non | `coat` partout | 701 |
| `LUI` | le médecin en formation (le collègue) | `man` | `shortcurly` | `brown` | `stubble` | non | `sweater` (salon, scène 6) ; `jacket` (départ, scène 14) | 702 |
| `K1` | collègue du groupe | `woman` | `bun` | `brown` | — | non | (tête seule) | 711 |
| `K2` | collègue | `man` | `bald` | `dark` | `short` | oui | (tête seule) | 712 |
| `K3` | collègue | `woman` | `bob` | `brown` | — | non | (tête seule) | 713 |
| `K4` | collègue | `man` | `short` | `dark` | `moustache` | non | (tête seule) | 714 |
| `K5` | collègue | `oldwoman` | `short` | `grey` | — | oui | (tête seule) | 715 |
| `K6` | collègue | `man` | `crown` | `brown` | `stubble` | oui | (tête seule) | 716 |
| `K7` | collègue | `woman` | `short` | `dark` | — | non | (tête seule) | 717 |
| `JUG` | la présidente de la chambre | `woman` | `bun` | `dark` | — | oui | `robe` | 761 |
| `AS1` | assesseur (côté salariés) | `oldman` | `crown` | `dark` | `short` | `glasses: false` | `sweater` | 762 |
| `AS2` | assesseure (côté employeurs) | `oldwoman` | `ponytail` | `grey` | — | `glasses: false` | `suit` | 763 |

Sans visage (dessins de `decor.js`, pas Persona) : la collègue des urgences (`D.avatarSil` : buste gris, coupe
au carré, AUCUN trait de visage, aucun métier) ; « un patient » (`D.avatarPatient` : buste en chemise
d'hôpital) ; « toi » (`D.avatarToi` : buste blanc, anneau jaune) ; le tribunal dans le fil (`D.sceau` : une
balance au trait dans un rond, pas d'armoiries).

### 1.1 ELLE — la Stationsärztin

- **Accessoire signature** : son téléphone, toujours en main (`D.telMini`, coque foncée). Stéthoscope de la
  tenue `coat`. En pied : échelle 1,04, pieds à y 1320 (tête de 866 à 1012). Avatar du fil : r 32.
- Ce n'est pas une méchante de dessin animé (`recherche.md`, § 11) : gardes en plus, week-end perdu. Son visage
  est celui de quelqu'un d'excédé, jamais hilare. Une seule vraie satisfaction : un petit `smile` quand la
  dernière ligne est écrite (b9).
- **Poses (essayées, `essai_poses.png`)** :
  - *elle tape* : `view: "front"`, `armL: [-20, 105]`, `armR: [20, -105]`, `headTilt: 6`, `look2: [0, 0.9]` ;
    mains en (±1, −227) → `D.telMini` centré en (0, −237) × échelle. Frappe : `armL[1]` et `armR[1]` alternent
    entre 105 et 101 (resp. −105 et −101) à 7 Hz, en opposition (deux états seulement : peu de redessins).
    NE PAS utiliser `reachL` / `reachR` en trois-quarts pour cette pose : les coudes partent vers le haut.
  - *téléphone levé d'une main* : `view: "three-quarter"`, `facing: 1`, `armR: [40, -112]`, `armL: [-10, 12]` ;
    main droite en (11, −223) ; téléphone en (11, −245), incliné de 8°.
  - *elle explique* (appel vidéo) : même `armR: [40, -112]` sans téléphone, `view: "front"`.
  - *poings sur les hanches* : `view: "front"`, `armL: [-48, 84]`, `armR: [48, -84]` (mains en (±40, −196)).
- **Arc des expressions** :

| scène | repère | expr · regard · tête |
|---|---|---|
| 1 (avatar) | 0 → `b1@بـ1000` | `angry`, regard vers sa bulle `[-0.6, -0.3]` |
| 1 | `b1@بـ1000` → `+0.65` | `shock`, sursaut de l'avatar (−10 px, 0,25 s) |
| 1 | ensuite | `worried` |
| 2 (en pied) | `b2` → `b2@والمحكمة` | `angry` léger (`focused`), regard sur son téléphone `[0.3, 0.6]` |
| 2 | `b2@والمحكمة` → `b2@حكمات` | `worried`, regard vers la bannière `[0.2, -0.8]` |
| 2 | `b2@حكمات` → `b2@تخلصهم` | `shock`, `sweat: true`, `headTilt: -8` pendant 0,3 s |
| 2 | `b2@تخلصهم` → `b2@جيبها` | `shock`, tête baissée vers sa poche `headTilt: 10`, `look2: [0.2, 1]` |
| 2 | `b2@جيبها` → fin | `angry`, coup de pied au sol |
| 3 (avatar) | toute la scène | `focused` |
| 7 (en pied) | toute la scène | `angry`, sourcils froncés, tête penchée sur l'écran |
| 8 (avatar) | `b7` → `b7@ومشى` | `angry` |
| 8 | `b7@ومشى` → fin | `angry`, yeux au ciel `look2: [0, -1]`, `headTilt: -5` |
| 9 (avatar du fil) | toute la scène | `angry` |
| 9 (avatar de la carte « source ») | `b8@عاوداتهم` → `b8@ليها+0.7` | `focused` ; à `b8@ليها+0.7` `shock` 0,3 s (les barres arrivent), puis `angry` |
| 10 (avatar) | `b9` → `b9@quer` | `angry` |
| 10 | `b9@quer` → `b10@end` | `smile` (petit, soulagé), léger rebond |
| 11 (avatar) | toute la scène | `calm`, cligne |
| 12 (avatar sur la lettre) | `b11@تكتب` → fin | `angry`, regard ailleurs `look2: [-0.9, 0]` |
| 15 (buste, tuile du bas) | `b14@هي` → `b14@end` | `focused`, **`talk`** de `b14@الگروپ` à `b14@end` |
| 16 | `b15` → `b15@ماشي` | `worried` |
| 16 | `b15@ماشي` → `+0.25` | `shock` |
| 16 | ensuite | `angry`, `headTilt: -6`, `look2: [-0.9, -0.2]`, poings sur les hanches |
| 17–18 (avatar) | `b16@و1000` → `+0.5`, puis | `shock`, puis `angry` |

### 1.2 LUI — le médecin en formation

- **Accessoires** : chez lui, un plaid et une tasse qui fume ; au départ, un carton. Jamais dessiné en
  surpoids, aucun symptôme montré, aucune larme : fatigué, puis blessé, digne.
- En pied : assis de face dans le canapé (scène 6 : échelle 1,05, pieds cachés à y 1276, tête de 817 à 965) ;
  debout puis marche (scène 14 : échelle 1,02, pieds à y 1320). Avatar : r 30 dans le fil, r 78 en scène 3.
- **Poses (essayées)** : *il tient son téléphone, de face* : `armL: [-20, 105]`, `armR: [20, -105]` (la plus
  propre des essais) ; *il porte un carton, de profil* : `view: "side"`, `facing: -1`, `armL: [30, 60]`,
  `armR: [24, 70]`, `armLBack: false` → mains en (−95, −225) ; carton 110 × 74 centré en (−120, −240).
  Marche : `PP.walk(phase)` pour les jambes et le buste, les deux `arm*` ci-dessus par-dessus.
- **Arc** : 3 `neutral` → `worried` à `b3@زميل+0.3` · 6 `worried` (regard sur le certificat `[-0.5, -0.6]`
  de `b5@مشى` à `b5@وكتب`) → `focused` en tapant → `worried` · 9 `worried` · 12 `focused` · 13 `focused` ·
  14 `sad` (sans larmes, `tears: 0`), regard vers le tableau puis vers la porte · 17 `calm` · 20 `calm`.

### 1.3 Les sept collègues (K1–K7)

Avatars r 30. `neutral` partout, clignement désynchronisé (`blinkAt(t, 3 + i)`), regard qui suit le dernier
message arrivé (`look2` vers le bas). Scène 5 : `smile` à l'arrivée de chaque sujet (K3 pour « Dienst », K4 pour
« Urlaub », K1 pour le cadeau) ; `bigsmile` pour K1 et K5 au cadeau. **Scène 11 (le silence) : `neutral`,
strictement ; aucun sourire, aucune bouche ouverte.** Ils n'écrivent rien après le jeudi.

### 1.4 Le tribunal

`JUG` au centre, `AS1` à sa droite à elle (à gauche de l'image), `AS2` à sa gauche : bustes derrière une table
(échelles 0,72 / 0,64 / 0,64), dans la tuile du haut de l'appel vidéo. `JUG` : `focused`, prend des notes
(mains cachées par la table) ; en b15 : `armR: [40, -112]` (main levée), **`talk`** de `b15@و30%` à
`b15@end`, `torsoLean: 4`. `AS1` : `calm`, hoche la tête (`headTilt` ± 3°, période 1,6 s) en b15. `AS2` :
`neutral`, regarde vers la tuile du bas (`look2: [0, 0.8]`). Les assesseurs ne portent PAS de robe (loi : juges
non professionnels). Aucun marteau (il n'y en a pas dans un tribunal allemand).

### 1.5 Qui parle

| qui | quand | comment |
|---|---|---|
| ELLE | `b14@الگروپ` → `b14@end` | `talk: talkAt(t, …)` + bulle (`m.speech` re-parentée) contenant le camembert |
| JUG | `b15@و30%` → `b15@end` | `talk` ; pas de bulle : c'est le camembert qui répond |
| tous les autres | jamais | `talk: 0` |

---

## 2. Inventaire des décors et objets à dessiner (`decor.js` → `window.EpDecor = D`)

Convention du gabarit : `D.nom(g, o)` dessine autour de son ancrage (0, 0) et renvoie ses ancres ; trait à main
levée (`U.ctx`, `U.shape`, `U.stroke`), ombre décalée `#D2D2CB` (6–8 px), aucune forme nue. Les parties mobiles
sont soit pilotées par `o` (valeurs arrondies), soit dessinées à part pour `Motion`. « px » = taille à l'échelle 1.
Aucun dessin n'est repris d'AKTE 02 / 03 ni d'un autre épisode (pas de `room`, `bench`, `bookshelf`,
`corridorDoor`, `pendantLamp`, `bed*`, `monitor`, `icon*`).

### A. Le téléphone et son interface (scènes ÉCRAN)

| fonction | dessin | taille · ancrage | parties mobiles | scènes |
|---|---|---|---|---|
| `D.tel(g, o)` | Coque arrondie claire (`MAT.light`, hachure fine), liseré intérieur à 10 px, écran `#FCFCF9` cerné d'encre (3 px), encoche (pastille noire 50 × 14), deux boutons de volume à gauche, un bouton de marche à droite, ombre portée (8, 10). `o.ecran` : `"plein"` ou `"trou"` (coque en anneau, tracé pair-impair : l'écran est transparent). `o.mini` : version simplifiée pour le fantôme (écran avec 5 barres grises et une petite bulle). `o.eteint` 0..1 : voile `#3A3A37` sur l'écran. | 750 × 1160 ; dessiné aux coordonnées `TEL` (ancrage = origine de la vidéo) ; renvoie `{ ecran: [172, 302, 706, 1082], centre: [525, 860] }` | le nœud entier : `buzz`, `punch`, entrées ; fantôme : `scaleTo` + `move` + `rotateTo` | toutes les ÉCRAN ; fantôme en 2, 6, 12, 21 |
| `D.semis(g)` | Fond du fil : semis de petits « + » et de petits ronds gris très pâles `#E4E4DC` (un motif de 706 × 240, répété 5 fois vers le bas) | 706 × 1200 ; ancrage haut-gauche du fil | remonte de 6 px/s en boucle (`s.y -= semisY(t)`), **s'arrête** en scène 11 | toutes les scènes de fil (1, 3, 5, 8–11, 17, 18) |
| `D.reflet(g)` | Bande oblique blanche (opacité 0,22, 70 px de large, inclinée de 20°) | 70 × 1200 ; ancrage haut | traverse l'écran de gauche à droite en 0,5 s au début de chaque scène ÉCRAN (`move`), dans la découpe de l'écran | toutes les ÉCRAN |
| `D.telMini(g, o)` | Petit téléphone tenu en main : coque foncée (`MAT.dark`), écran clair, 3 traits gris, `o.vert` 0/1 : une mini-bulle hachurée de vert | 44 × 84 ; ancrage centre | suit la main (`node.out.handR`) ; `o.lueur` 0/1 : halo jaune pâle derrière l'écran quand il vibre | 2, 6, 7, 21 |
| `D.barreEtat(g, o)` | `o.date` (Kalam 22 px, x 202, y 333), 4 barres de réseau, batterie (`o.batt` 0..1) | 706 × 44 | la date bascule (glisse de −20 px + fondu, 0,2 s) ; la batterie baisse de 0,9 à 0,5 de la scène 5 à la scène 11 (un cran par scène), remonte à 0,9 en scène 13 | toutes les ÉCRAN |
| `D.enTete(g, o)` | Flèche retour, pastille du groupe (trois petits ronds qui se chevauchent dans un rond gris), `o.titre` (36 px), `o.sous` (21 px, `de light`), trait de séparation en bas (y 440) | 706 × 94 | le titre s'écrit (`c.write`) en scène 5 ; un soulignement au surligneur sous `o.sous` en scène 1 | 1, 3, 5, 8–11, 17, 18 |
| `D.saisie(g, o)` | Trait de séparation (y 1300), champ arrondi blanc, bouton d'envoi rond (flèche →) : blanc, ou `#DCEFD9` si `o.parti` | 706 × 84 | `o.appui` 0..1 : le bouton s'enfonce (échelle 0,88) ; curseur clignotant dans le champ quand il est vide | 1, 3, 5, 8–11, 17, 18 |
| `D.bulle(g, o)` | Bulle de MESSAGE en un seul tracé : `Motion.bubblePath(x, y, w, h, 26, tip, 15)` + ombre (5, 7). `o.mat` : `"blanc"`, `"vert"` (= `VERT`), `"jaune"` ; `o.brouillon` : contour en pointillé (`stroke-dasharray: 10 8`), sans ombre | `o.w × o.h` ; ancrage coin haut-gauche ; `o.tip` relatif à l'ancrage (dans les scènes, les pointes sont données en pixels ABSOLUS : retrancher l'ancrage) ; `tip: null` = bulle sans queue | redessinée quand `o.h` change (elle grandit vers le haut, le bas reste fixe) ; jaillit de sa pointe (`pop` avec pivot = pointe) | 1, 3, 5, 6, 8–11, 17–19, 21 |
| `D.avatar(g, o)` | Rond blanc + ombre, tête Persona découpée (`Persona.head(h, o.p)`, échelle `r / 82`, décalée de `0,14 r` vers le bas), anneau : `"encre"`, `"jaune"`, `"pointille"`. `o.badge` : `null`, `"point"` (pastille `#9CCB98` cernée d'encre, r 9, en haut à droite), `"stetho"` (mini-stéthoscope dans un rond blanc, r 18, en bas à droite), `"cle"`. `o.vide` : rond pointillé vide | rayon `o.r` ; ancrage centre | `o.p.blink`, `o.p.expr`, `o.p.look2` (via `c.sk`) ; `pop`, `float` | 1, 3, 5, 8–13, 17, 18, 20 |
| `D.avatarSil(g, o)` | Buste de femme SANS visage : tête ovale et épaules en aplat hachuré gris (`MAT.mid`), coupe au carré, contour encre | rayon `o.r` | flotte (`float(3, 2.8)`) | 9 |
| `D.avatarPatient(g, o)` | Buste sans visage en chemise d'hôpital (encolure nouée, petits pois), bracelet au poignet levé | rayon `o.r` | `pop` ; passe à 35 % d'opacité quand il est barré | 3, 20 |
| `D.avatarToi(g, o)` | Buste blanc sans visage, anneau jaune | rayon `o.r` | `pop` | 19 |
| `D.sceau(g, o)` | Rond blanc cerné d'un double trait, petite balance au trait, « § » dessous. Aucune armoirie | rayon `o.r` | la balance oscille (`m.pend`, ±6°) quand il « écrit » | 1, 2 (bannière), 15, 17, 18 |
| `D.sepDate(g, o)` | Pastille grise claire `#ECECE6` cernée d'encre (2 px), `o.texte` en Kalam 21 px | largeur = texte + 44, hauteur 36 ; ancrage centre | tombe de 30 px (`drop`, 0,25 s) | 1, 8–11, 17, 18 |
| `D.ligneSysteme(g, o)` | Pastille grise allongée : mini-avatar (r 22) qui devient un rond pointillé (`o.parti` 0..1), `o.texte` (`de light` 26 px, gris `#55524B`), `o.ar` (`ar strong` 28 px), micro-étiquette « Rekonstruktion » (17 px) sous le coin droit | 600 × 84 ; ancrage coin haut-gauche | tombe, reste, remonte ; `o.parti` 0 → 1 en 0,4 s | 14 |
| `D.notif(g, o)` | Bannière blanche arrondie (rayon 26), ombre ; carré d'icône à gauche (une bulle au trait ; `o.sceau` : le sceau ; `o.contact` : une silhouette ; `o.jaune` : fond `MAT.yellow`) ; `o.titre`, `o.ligne` (22 px), `o.ar`. `o.appel` : deux boutons ronds à droite (refuser : blanc ; accepter : jaune) | 620 × 88 (ÉCRAN) ou 600 × 84 (PIÈCE) ; ancrage coin haut-gauche | `drop` puis remontée ; `o.appui` : le bouton jaune s'enfonce | 2, 4–7, 15, 17, 19 |
| `D.caviar(g, o)` | Barre de caviardage : deux coups de feutre noir superposés, bords irréguliers | `o.w × 30` ; ancrage coin haut-gauche | se trace de gauche à droite (`wipe`, 0,25 s) ; petites étiquettes volantes en scène 9 | 1, 3, 9, 10, 11, 17, 19, 21 |
| `D.gribouillis(g, o)` | Ligne de texte illisible : trait ondulé gris `#B4B4AE` (3 px) | `o.w × 14` | `wipe` | 1, 3, 19, 21, fantômes |
| `D.pouce(g, o)` | Un pouce en moufle (même peau que Persona), qui entre par le bord droit du téléphone à la hauteur du bouton d'envoi ; `o.appui` 0..1 | 150 × 70 ; ancrage = bout du pouce | glisse de + 90 px (0,2 s), appuie (6 px), repart | 10, 11 |
| `D.ascenseur(g, o)` | Petite barre de défilement grise (6 × 90, arrondie) le long du bord droit de l'écran (x 868) | 6 × 90 | sa position suit `defile(t)` ; elle pâlit quand le fil ne bouge plus | toutes les scènes de fil |
| `D.loupeCitation(g, o)` | Carte blanche (rayon 22) tenue par deux bouts de scotch gris, reliée par un trait courbe à une ligne du fil (`o.vers`) ; liseré intérieur fin | 658 × 190 ; ancrage coin haut-gauche | `pop` depuis `o.vers` ; rétrécit vers `o.vers` | 10 |

### B. Objets du fil

| fonction | dessin | taille · ancrage | parties mobiles | scènes |
|---|---|---|---|---|
| `D.icoDienst(g, o)` | Grille de planning 3 × 2 dans un carré arrondi, une case jaune | 82 × 82 ; ancrage centre | la case jaune saute d'une case à l'autre (`o.k` 0, 1, 2) toutes les 0,5 s | 5, 16 (version 44 px) |
| `D.icoUrlaub(g, o)` | Transat + parasol + petit soleil | 82 × 82 | le parasol oscille (±5°, 2,2 s) ; les rayons tournent | 5 |
| `D.icoCadeau(g, o)` | Paquet cadeau à ruban jaune | 82 × 82 | le nœud remue (±8°, 5 Hz pendant 0,5 s à l'arrivée), le couvercle saute de 6 px | 5 |
| `D.billetWeekend(g, o)` | Billet à bords crantés : pictogramme montagne + soleil, « Wochenende », « 549 € » (Kalam 44 px), ligne perforée au milieu | 300 × 130 ; ancrage centre | `o.dechire` 0..1 : il se déchire le long de la perforation, les deux moitiés s'écartent (± 26 px) et pivotent (± 9°) ; puis elles tombent (`move` + `rotateTo`, 0,5 s) | 8 |
| `D.interdit(g, o)` | Petite bulle de message barrée d'un panneau d'interdiction (rond + barre, encre épaisse) | 80 × 80 ; ancrage centre | le panneau claque (`slam`, sans secousse) | 17, 18, 20 (version 44 px) |
| `D.aPayer(g, o)` | Étiquette arrondie « zu zahlen » (Kalam 26 px) à côté d'une petite HORLOGE (cadran blanc, deux aiguilles) : `o.h` = angle de la grande aiguille ; `o.r` rayon du cadran (22 → 34) | 250 × 50 ; ancrage coin haut-gauche | l'aiguille tourne (un tour en 1,6 s), le cadran grossit en scène 18 | 17, 18 |
| `D.ticketCaisse(g, o)` | Ticket de caisse : papier blanc étroit, bord bas en dents de scie, deux lignes séparées par des pointillés, AUCUNE ligne « total » | 300 × 166 ; ancrage milieu du bord haut | `o.sorti` 0..1 : il sort par le bas de la bulle (découpe) ; ensuite `m.pend` (±2°) | 17, 18 |
| `D.compteRecherche(g, o)` | Fin de champ de recherche : trois points d'attente, puis le compteur « 0 / 0 » (Kalam 26 px) ; `o.etat` : `"attente"` ou `"rien"` | 110 × 40 ; ancrage centre | les points rebondissent (2 Hz), puis le compteur `pop` | 18 |
| `D.pointInterro(g)` | Grand « ? » manuscrit (Kalam 90 px) | 60 × 100 ; ancrage centre | `pop` ; se balance (±10°) | 18 |
| `D.camembert(g, o)` | Disque blanc cerné d'encre ; part de 30 % (de −90° à +18°), part de 70 % hachurée gris clair ; `o.rempli` 0..1 (la hachure du 70 % se remplit en balayant) ; `o.jaune` 0..1 (la part de 30 % devient jaune) ; `o.ecart` 0..1 (elle glisse de 24 px vers l'extérieur) ; `o.barre` 0..1 (un trait raye le mot « privat ») ; textes : « 70 % », « privat », « 30 % » | rayon `o.r` (70 puis 96) ; ancrage centre | tout par `o` ; le disque entier se déplace d'une tuile à l'autre | 15, 16 |

### C. L'appel vidéo, l'application « Plans », la fiche contact, le coffre

| fonction | dessin | taille · ancrage | parties mobiles | scènes |
|---|---|---|---|---|
| `D.tuile(g, o)` | Cadre arrondi (rayon 26) d'une tuile vidéo ; `o.actif` 0..1 : liseré jaune de 9 px par-dessus | `o.w × o.h` ; ancrage coin haut-gauche | le liseré jaune passe d'une tuile à l'autre (deux nœuds, `fade` croisés 0,2 s) | 15, 16 |
| `D.salleAudience(g, o)` | En DEUX appels, parce que la table doit passer DEVANT les bustes. `o.partie: "fond"` : mur clair, lambris de bois jusqu'à mi-hauteur (planches verticales). `o.partie: "table"` : une longue table (plateau + façade), plaque « Arbeitsgericht Siegburg · 1. Kammer » (18 px) sur la façade, pile de dossiers à gauche, carafe et verre à droite, micro sur pied devant la présidente | 658 × 384 ; ancrage coin haut-gauche de la tuile | l'eau de la carafe tremble (2 px) ; la pile de dossiers : la chemise du dessus glisse de 4 px quand la juge parle | 15, 16 |
| `D.fondNeutre(g, o)` | Fond de la tuile du bas : mur hachuré très clair, dossier d'une chaise derrière elle | 658 × 384 | — | 15, 16 |
| `D.commandes(g)` | Trois boutons ronds (micro, caméra, raccrocher : le dernier foncé `#3A3A37`) | r 30, centres (400, 525, 650 ; 1336) | le micro pulse quand quelqu'un parle | 15, 16 |
| `D.plaqueNom(g, o)` | Étiquette blanche arrondie en bas à gauche d'une tuile : `o.de` (24 px) à gauche, `o.ar` (26 px) à droite, micro-texte de source facultatif | 300 × 46 (ou 380 × 46) | bascule (retourne sur son axe horizontal, 0,25 s) quand le texte change | 15, 16 |
| `D.champRecherche(g, o)` | Champ arrondi (196 → 854, 360 → 426), petite loupe à gauche, mini-avatar (r 22) à droite | 658 × 66 | le texte s'écrit (`c.write`) | 13, 18 (sans mini-avatar : `D.compteRecherche` à sa place) |
| `D.plansUI(g)` | Habillage de carte : quadrillage très pâle, boutons « + » et « − » (x 820, y 620 et 680), boussole (x 232, y 640), échelle (trait gradué, x 210 → 330, y 1130) | couvre (172, 440, 706, 730) | l'aiguille de la boussole oscille (±7°, 2,6 s) | 13 |
| `D.ficheLieu(g, o)` | Feuille qui monte du bas de l'écran : poignée grise, titre, deux lignes séparées par un trait | 706 × 214 ; ancrage coin haut-gauche | `rise` 240 px | 13 |
| `D.ficheContact(g)` | Page « contact » : icônes au trait en haut (retour, étoile, crayon), un trait fin sous l'en-tête, rien d'autre (le socle pose la photo, le ruban, les boutons) | couvre l'écran | l'étoile tourne une fois (360°, 0,5 s) à `i3@j'aime` | 4 |
| `D.coffre(g, o)` | Coffre-fort : caisse épaisse hachurée, porte à double cadre, 4 rivets, plaque « Gesundheitsdaten » (26 px), molette crantée (`o.molette` = angle), poignée à trois branches, charnières à gauche ; texte de loi en deux lignes (17 px) sous la molette ; `o.ouvert` 0..1 : la porte pivote sur ses charnières (elle se réduit en largeur + ombre intérieure), on voit une étagère et deux chemises | 360 × 360 ; ancrage centre | `o.ouvert`, `o.molette` ; tremble de 3 px quand la petite bulle rebondit dessus | 20 |
| `D.cle(g, o)` | Clé à anneau rond + étiquette attachée par une ficelle : `o.texte` (« Einwilligung ») ou `o.picto: "stetho"` ; `o.jaune` | 40 × 120 ; ancrage = anneau | `m.pend` à l'accrochage (±16°) ; vol en arc vers un avatar | 20 |
| `D.feuilleDiag(g)` | Petite feuille : « Diagnose » (20 px) + deux barres `D.caviar` | 120 × 150 ; ancrage centre | vole dans le coffre (`move` + `scaleTo 0.5`) | 20 |

### D. Papier (scènes 12 et 21)

| fonction | dessin | taille · ancrage | parties mobiles | scènes |
|---|---|---|---|---|
| `D.widgetDate(g, o)` | Le widget « date » du téléphone, agrandi et posé à plat sur le mur ou sur le papier comme une vignette d'écran (coins arrondis r 22 ; AUCUN clou, AUCUN bloc de feuilles, rien qui s'arrache : l'éphéméride qui s'effeuille est le dispositif d'AKTE 06) : bandeau gris `o.mois`, grand `o.jour` (Kalam 64 px), petit `o.an` | 150 × 170 (ou 110 × 136 au mur) ; ancrage = milieu du bord haut | `pop` (0,25 s) ; `o.roule` 0..1 : les trois lignes défilent vers le haut comme une roue de sélection de date (floues, illisibles), puis se calent avec un petit rebond | 7, 12, 14 |
| `D.soleilEte(g)` | Petit soleil (rond jaune cerné d'encre) | r 34 | `m.rays` derrière (R 62, 10 rayons, vitesse 14) | 12 |
| `D.enveloppe(g, o)` | Enveloppe blanche vue de face, rabat triangulaire (`o.ouvert` 0..1 : il se relève), timbre au trait, intérieur hachuré | 400 × 230 ; ancrage centre | arrive de la droite (`m.build right`, 320 px) ; rabat | 12 |
| `D.lettre(g, o)` | Feuille A4 : en-tête (emplacement d'avatar à gauche, trois traits gris), date à droite, emplacement du titre, cinq lignes `D.gribouillis`, bloc signature en bas (« ✗ » + trait long) ; deux plis horizontaux très légers | 440 × 570 ; ancrage centre | monte hors de l'enveloppe (`move` −365 px, 0,45 s) ; se déplie (`o.plie` 1 → 0 : les deux plis s'aplatissent) | 12 |
| `D.stylo(g)` | Stylo à bille, capuchon jaune | 190 × 22 ; ancrage centre | tombe sur la ligne (rebond), oscille (±3°), puis roule et tombe | 12 |
| `D.pageJugement(g, o)` | Page : en-tête en trois lignes, filet, numéros de marge « 6 », « 7 », « 8 », « 9 » (Kalam 20 px, gris), lignes `D.gribouillis` en face de 6, 7 et 9, emplacement vide en face de 8 (290 × 110), trombone en haut à gauche ; deux feuilles décalées dessous | 350 × 500 ; ancrage centre | `m.build drop` (260 px) ; `float(3, 3.2)` ; cercle jaune à main levée autour du « 8 » (`o.cercle` 0..1) | 21 |
| `D.chrono(g, o)` | Chronomètre mécanique : boîtier rond, couronne, cadran gradué, une aiguille (`o.a`) | r 54 ; ancrage centre | l'aiguille fait un tour en 0,74 s ; la couronne s'enfonce de 4 px au départ | 21 |

### E. La salle des médecins (scènes 2, 7, 14) — monde

| fonction | dessin | position (monde) | parties mobiles |
|---|---|---|---|
| `D.piece(g, o)` | Coque de pièce : mur (aplat `o.mur`), plinthe, sol en perspective (lignes fuyantes), corniche fine en haut (y 290). `o.sol: "lino"` (grandes dalles, petits points) ou `"parquet"` (lames) ; `o.rayures` : papier peint à fines rayures verticales | mur x 40 → 1040, y 290 → `o.solY` ; sol jusqu'à y 1540 | — |
| `D.porte(g, o)` | Porte pleine à poignée, chambranle, plaque « Arztzimmer » (20 px) au-dessus ; `o.ouverte` 0..1 : le battant pivote vers l'intérieur (se réduit en largeur, laisse voir un couloir gris) | battant x 120 → 270, y 600 → 1130 ; plaque (124 → 266, 542 → 578) | `m.build growY` ; `o.ouverte` |
| `D.pateres(g)` + `D.blouse(g, o)` | Tringle à DEUX patères ; blouse blanche pendue (col, poche ; `o.badge` : un badge au trait) | tringle x 292 → 404, y 606 ; emplacements des blouses, y 620 → 900 : x 306–350 et x 356–400. Scènes 2 et 7 : UNE blouse (à gauche), la patère de droite est vide. Scène 14 : DEUX blouses — celle de droite est la sienne à LUI (`badge: true`) : il l'a laissée | tringle `drop` ; chaque blouse `m.sway` (±1°, 3,6 s), `m.pend` (±7°) au passage de LUI en scène 14 |
| `D.tableauGardes(g, o)` | Tableau blanc magnétique à cadre gris : titre « Dienstplan » (22 px), « Wochenende » ; trois colonnes « Fr », « Sa », « So · Tag » ; une rangée d'emplacements ; gouttière en bas | x 424 → 704, y 540 → 806 | `drop` + `m.pend` (±3°, pivot milieu du bord haut) |
| `D.aimant(g, o)` | Aimant rond : `o.qui: "lui"` (gris, pictogramme de cheveux bouclés) ou `"elle"` (blanc cerné de jaune, pictogramme de cheveux longs) | r 26 ; emplacements : Fr (478, 690), So (650, 690) | celui de LUI pivote et tombe dans la gouttière (rebond) ; celui d'ELLE claque à sa place (`slam`, secousse 6) |
| `D.postit(g, o)` | Feuillet jaune pâle `#FFF3B8` à coin corné : `o.de` (15 px), `o.ar` (24 px gras), micro « laut Urteil » | 160 × 78 ; centre (720, 795) | `pop` puis `m.sway` (±3°, 2,4 s, pivot bord haut) |
| `D.troisPostit(g)` | Trois feuillets jaunes sans texte (traits gris) | centre (810, 600) | `m.sway` désynchronisé |
| `D.planDeTravail(g)` | Meuble bas : plateau, deux portes, poignées | x 632 → 866, plateau y 1010, bas y 1150 | `m.build rise` |
| `D.machineCafe(g, o)` | Machine à café : corps, réservoir d'eau à l'arrière, bec, bac, voyant (`o.voyant` 0/1), goutte (`o.goutte` 0..1 : elle tombe du bec dans la tasse) | x 706 → 826, y 846 → 1010 | `drop` (rebond) ; voyant 1 Hz ; goutte toutes les 1,4 s ; vapeur `D.vapeur(g, { t })` (deux volutes qui montent et se dissipent) |
| `D.tasses(g)`, `D.plante(g, o)` | Deux tasses empilées ; plante en pot (feuilles hachurées GRISES : aucun vert hors de la bulle) | tasses x 652 → 700, y 972 → 1010 ; plante x 830 → 864, y 900 → 1010 | plante : `m.build grow`, `m.sway` (±2°, 4 s) |
| `D.ticketPoche(g, o)` | Le TICKET DE CAISSE de l'épisode (même papier que `D.ticketCaisse`, scène 17) en version une ligne : bande blanche étroite, bord bas en dents de scie, « 1.000,00 EUR » (Kalam 34 px), pointillés, « zu zahlen » (20 px). Il sort de la fente de SA poche de blouse (découpe au bord de la poche). **Pas d'étiquette de prix à ficelle** : c'est l'objet signature d'AKTE 08 (remplacé le 26.11.2026) | 200 × 110 ; ancrage = milieu du bord haut, sur la fente de la poche ; il pend devant ses jambes, à droite (x 548 → 748, y 1160 → 1270) | `o.sorti` 0..1 : il s'imprime vers le bas (0,3 s), puis `m.pend` (±3°, pivot = la fente) ; `pulse` |
| `D.colere(g)` | Marque de colère de BD (quatre petits arcs en croix) | 34 × 34 | `pop` + `wobble` |
| `D.poussiere(g, o)` | Trois petits nuages au ras du sol | 120 × 40 | grossissent et s'effacent en 0,35 s (`o.p`) |
| `D.carton(g)` | Carton ouvert : une tasse, une feuille de plante, le tube d'un stéthoscope qui dépassent | 110 × 74 ; ancrage centre | suit les mains de LUI ; le contenu tressaute à chaque pas (2 px) |

### F. Le salon (scène 6) — monde

| fonction | dessin | position (monde) | parties mobiles |
|---|---|---|---|
| `D.fenetre(g)` + `D.rideau(g, o)` | Fenêtre à deux vantaux, ciel gris très pâle `#ECEEEA` (pas de bleu), un nuage blanc dedans (découpé par le cadre) ; deux rideaux clairs à plis | cadre x 150 → 330, y 560 → 890 ; rideaux x 122 → 176 et 304 → 358, y 540 → 910 | fenêtre `grow` ; rideaux `swing` puis `m.sway` (±1,2°, 4,2 s, pivot en haut) ; nuage `m.drift` (12 px/s) |
| `D.lampadaire(g, o)` | Lampadaire à arc : socle rond, tige, abat-jour ; cône de lumière jaune (opacité 0,13) vers le canapé | socle (836, 1175) ; tige jusqu'à y 600 ; abat-jour x 745 → 835, y 535 → 595 | `drop` + `m.pend` (±5° puis ±0,5°, pivot = socle) ; `m.dust` dans le cône (10 grains) |
| `D.canapeDos(g)` | Dossier + accoudoirs du canapé (tissu hachuré, passepoil) | x 250 → 770 ; haut du dossier y 935 ; accoudoirs y 1040 | `rise` |
| `D.canapeDevant(g, o)` | Assise vue de face + PLAID à carreaux posé sur ses genoux (il cache les jambes), franges en bas (`o.t` : elles ondulent) | assise y 1100 → 1290 ; plaid x 390 → 640, y 1085 → 1290 | `rise` avec le dossier et le personnage |
| `D.gueridon(g)` + `D.tasseFumante(g, o)` | Petit guéridon rond ; tasse à anse + vapeur (`o.t`) | plateau x 140 → 236, y 1100 ; tasse (166 → 212, 1060 → 1100) | guéridon `rise` ; tasse `drop` ; vapeur continue |
| `D.tapis(g)` | Tapis ovale à bordure | centre (520, 1340), 660 × 88 | `grow` |
| `D.certificat(g, o)` | Le certificat d'arrêt de travail : feuille JAUNE (`MAT.yellow` : le seul jaune de la pièce), trombone, « Arbeitsunfähigkeits- » / « bescheinigung » (17 px), « bis 02.06.2025 » (26 px) entouré à l'encre (`o.cercle` 0..1), tampon rond « Notaufnahme » (14 px) | 180 × 236 ; ancrage centre | `pop` (incliné de −5°), `float` ; puis rétrécit (×0,42) et va se poser sur l'accoudoir |

---

## 3. HUD propre à l'épisode

Le socle reste : barre de progression (`#prog`, x 100 → 700, y 236 → 250) et logo `@dr.aguilo`
(`right: 100px; top: 222px`), logo masqué pendant l'intro. S'y ajoutent :

1. **Le cadre du téléphone** (scènes ÉCRAN) — c'est LE repère fixe de l'épisode. Position : constantes `TEL`.
   Il ne zoome jamais. Ses seuls mouvements : `buzz` (vibreur : ±8 px et ±0,45° amortis en 0,38 s) quand une
   notification ou la somme arrive ; `punch` (+ 4 à 5 % pendant 0,5 s) sur les mots forts ; les entrées et
   sorties (il rétrécit vers une main, il en revient, il monte du bas).
2. **La date du récit dans la barre d'état** (x 202, y 333, Kalam 22 px) — l'horloge de l'épisode. Elle ne
   porte que des dates sourcées et bascule à chaque changement de jour :

   | scènes | texte |
   |---|---|
   | 1, 3 | `22.05.2026` |
   | 4 (intro) | (vide) |
   | 5 | `Mai 2025` |
   | 8, 9, 10, 11 | `Sa · 31.05.2025` |
   | 13 | `10.09.2025` |
   | 15, 16 | (vide : la date de l'audience n'est pas publiée) |
   | 17, 18 | `22.05.2026` |
   | 19, 20 | (vide) |

   Jamais d'heure (aucune heure d'envoi n'est publiée ; « 20:25 » n'existe que dans SON message à elle).
3. **La bande des pastilles** (y 440 → 574, dans le téléphone) : papier de l'écran, pointillé gris en bas ; une
   pastille à la fois, son arabe détaché dessous. Dans l'appel vidéo, la bande est remontée (y 346 → 486,
   pastille centrée en y 392). Hors du téléphone : pastille en (520, 420).
4. **La mention dans le menton** (y 1384 → 1440) ou l'étiquette en bas à gauche (hors du téléphone).
5. **La bannière de notification** (transition signature), décrite dans les conventions.
6. **L'ascenseur du fil** (`D.ascenseur`, x 868) : il bouge avec le fil ; pendant le silence il est immobile
   et pâle — c'est lui qui dit, sans un mot, que plus rien ne défile.
7. **Le compteur « → 7 »** (scène 11 seulement) : pas un compteur de lectures. Sept pastilles vertes arrivent
   une à une sur sept avatars ; à côté de la rangée, un petit « 7 » (Kalam 40 px, x 838, y 1208) s'incrémente
   de 1 à 7 (`c.count`, calé sur les pastilles). La pastille de la bande dit « übermittelt » (transmis).
8. **Le logo du haut** : inchangé ; il est au-dessus du téléphone (12 px d'écart).

---

## 4. Scène par scène

22 scènes : 21 scènes de récit (dont l'intro, exclue de l'affiche) + l'affiche-résumé. Les instants entre
parenthèses viennent du minutage PROVISOIRE ; seuls les repères font foi. Dans les tableaux « Chronologie »,
chaque ligne est UN changement visible ; aucune scène ne reste plus de 1,2 s sans changement (sauf l'intro,
reprise du socle, et le silence, voulu). Abréviations : `t0` = début de la scène ; « pop » = `Node.pop` ;
« ← » = révélé de droite à gauche.

**Ordre des couches (de l'arrière vers l'avant).** Scènes ÉCRAN : toujours celui du squelette — papier et
formes · coque · page [papier de l'écran, semis, contenu du fil, barre d'état, en-tête, bande et sa pastille,
saisie, ascenseur, reflet] · dessus · menton · bannière. Scènes PIÈCE : coque de la pièce · meubles dans l'ordre
des tableaux du § 2 (E ou F) · personnages · objets tenus · puis, dans `c.hud`, fantôme du téléphone, bannière,
pastille, étiquette de mention. Scènes PAPIER : papier et formes · objets · `c.hud`. Dans chaque tableau
« Composition », les éléments sont listés DANS CET ORDRE (le premier est le plus au fond) ; quand un ordre
particulier compte, il est écrit.

**Le fil vit toujours** (toutes les scènes de fil) : le `D.semis` (petits « + » et ronds gris `#E4E4DC` semés sur
le fond du fil) remonte de 6 px par seconde, en boucle ; le curseur clignote ; les avatars clignent ;
l'ascenseur suit ; un reflet traverse l'écran au début de la scène.

**Le brouillon** (scènes 8, 9, 10 : même objet, reconstruit dans chaque scène avec son état de départ) :
`D.bulle` en (214, 1216 − h), w 584, `brouillon: true`, `mat: "blanc"`, pointe (806, 1246), avatar d'ELLE en
(832, 1262). `h = 44 + 42 × n` pour `n` lignes ; le bas reste à y 1216, le haut monte. Les lignes sont dans un
groupe qui suit le haut de la bulle ; ligne `i` (de 0 à 8) : ligne de base à `haut + 52 + 42 × i`, texte ancré à
gauche à x 238, `de light` 26 px. Texte exact (les coupes « … » sont celles du scénario) :

| n° | texte | arrive en |
|---|---|---|
| L1 | `Nur zu Jedermanns Info …` | scène 8, t0 |
| L2 | `… seinen Dienst am Freitag übernommen` | scène 8, t0 |
| L3 | `Obwohl ich einen Wochenendausflug für 549 €` | scène 8, « 549 » |
| L4 | `gebucht hatte, den ich bezahlen musste.` | scène 8, « 549 » |
| L5 | `Auch diesen Dienst am Sonntag Tag habe ich` | scène 8, « ومشى » |
| L6 | `übernommen … mein WE eh im Arsch war …` | scène 8, « ومشى » |
| L7 | `[barre 150]` `Diagnosen` `[barre 220]` | scène 9 |
| L8 | `[barre 90]` `Laborwerte` `[barre 270]` | scène 9 |
| L9 | `Vielleicht sitzt aber ein Pups quer.` | scène 10, mot par mot |

Une constante `GROS_MOT = true` en tête de `story.js` : à `false`, L6 devient
`übernommen … mein WE eh im A… war …` et la pastille correspondante aussi (décision de l'auteur, voir § 7, R17).
Aucune heure d'envoi sur cette bulle, nulle part.

---

### Scène 1 — ACCROCHE : le tribunal répond dans le fil (b1 · 0,00 → 2,85) — ÉCRAN

**Idée.** Sous un long message, une réponse arrive : pas un collègue, un tribunal — et la réponse est un prix.

**Lieu.** Le fil « Ärzte-AC ». Barre d'état `22.05.2026`. En-tête : « Ärzte-AC » / « WhatsApp-Chatgruppe · 9 Mitglieder ».

**Entrée.** `from: 0, in: "cut", inDur: 0`. Mouvement dès l'image 0 : le téléphone VIBRE (il vient de recevoir
quelque chose). L'image 0 est complète (c'est aussi la vignette du Reel) : téléphone, message vert, les deux
dates, la mention du menton.

**Composition (pixels).**

| élément | position |
|---|---|
| séparateur `Samstag, 31. Mai 2025` | centre (525, 606) |
| B0 — SON message, déjà envoyé (`mat: "vert"`) | `D.bulle` en (300, 640), 482 × 254 ; pointe (806, 924) |
| contenu de B0 | L1 `Nur zu Jedermanns Info …` (x 324, y 682) ; deux `D.gribouillis` (y 716 et 758, largeurs 430 et 410) ; deux lignes de `D.caviar` (y 786 : 150 + 220 ; y 828 : 90 + 270) |
| avatar d'ELLE | centre (832, 940), r 32 |
| séparateur `Freitag, 22. Mai 2026` | centre (525, 986) |
| ligne d'expéditeur | `Arbeitsgericht Siegburg` (`de` 26 px, x 262, y 1042) + `1 Ca 1741/25` (`de light` 19 px, x 566, y 1042) |
| bulle « … » (avant la réponse) | `D.bulle` en (262, 1160), 116 × 66 (y 1160 → 1226), pointe (244, 1252) ; points `m.typing(320, 1196, …)` re-parentés dans le fil. B1 la remplace en grandissant vers le haut (même bas, même pointe). |
| B1 — la réponse | `D.bulle` en (262, 1058), 480 × 168, blanc ; pointe (244, 1252) |
| contenu de B1 | surligneur `k.marker(502, 1132, 420, 62)` ; `1.000,00 EUR` (`de` 76 px, centre (502, 1150)) ; `verurteilt, … zu zahlen` (`de light` 22 px, centre (470, 1204)) ; micro `laut Urteil` (17 px, fin à x 724, y 1210) |
| sceau du tribunal | `D.sceau`, centre (216, 1262), r 30 |

**Couches (de l'arrière vers l'avant).** `c.cam` : `k.bg()` ; quatre formes `m.shapes({ pts: [[108, 430],
[962, 330], [962, 610], [108, 1210]], seed: 7 })`. `c.hud` → `tel` : corps · page [papier de l'écran, semis,
barre d'état, en-tête, bande, fil (séparateurs, B0, avatar, ligne d'expéditeur, bulle « … », B1, sceau),
saisie, ascenseur, reflet] · dessus [anneau jaune autour de B0] · menton.

**Chronologie.**

| repère | ce qui change |
|---|---|
| `0` | `buzz(tel, 0, 9, 0.2)` puis `buzz(tel, 0.25, 7, 0.22)` : deux impulsions de vibreur ; le reflet traverse |
| `b1@جاوبات` (0,57) | la ligne d'expéditeur s'écrit (0,25 s) ; le sceau pop, sa balance oscille ; la bulle « … » jaillit, trois points rebondissent |
| `b1@بـ1000` (0,95) | la bulle « … » disparaît (0,08 s) ; **B1 `slam` (0,28 s)** avec la somme ; `buzz(tel, "b1@بـ1000+0.25", 12, 0.4)` ; `punch(tel, "b1@بـ1000+0.25", 0.05)` ; le fil tressaute (−16 px puis retour, 0,3 s) |
| `b1@أورو` (1,33) | pastille jaune « Schadensersatz » / « تعويض » (taille 30) pop dans la bande |
| `b1@ميساج` (1,85) | un anneau jaune à main levée (ellipse 520 × 290, trait 7 px) se trace autour de B0 (`wipe`, 0,3 s) ; B0 `pulse` (4 %) |
| `b1@فـWhatsApp` (2,18) | un coup de surligneur sous « WhatsApp-Chatgruppe » dans l'en-tête (`wipe`, 0,25 s) |

**Ce qui vit.** Semis, curseur du champ de saisie, clignements, balance du sceau (±6° amorti puis ±1°), anneau
jaune qui respire (échelle ±1 %, 1,4 s).

**Ce qui réagit.** L'avatar d'ELLE : `angry` → `shock` au `slam` (il saute de 10 px) → `worried`.

**Personnages.** ELLE en avatar seulement. Personne ne parle.

**Caméra.** Aucune (cadre fixe) ; `buzz` et `punch` ci-dessus.

**Textes et mentions.** Menton, dès l'image 0 : « Stand Juli 2026: nicht rechtskräftig » · « مازال ماشي نهائي ».
Pastille : « Schadensersatz » / « تعويض ». Jamais « bezahlt », jamais de coche.

---

### Scène 2 — ACCROCHE : elle, et le ticket qui sort de sa poche (b2 · 2,85 → 6,18) — PIÈCE (salle des médecins)

**Idée.** Celle qui a écrit est médecin ; c'est ELLE que le tribunal condamne à payer — le ticket de
caisse sort de SA poche (« من جيبها »).

**Entrée.** `from: "b2", in: "cut", inDur: 0` + **sortie du téléphone** : le fantôme part de la taille pleine
et rétrécit jusqu'à sa main, cible écran (541, 1094), échelle 0,072, rotation + 8°, 0,42 s ; à `b2+0.42`,
`D.telMini` le remplace dans sa main.

**Composition (monde).** Voir § 2 E pour les meubles. ELLE : pieds (530, 1320), échelle 1,04, pose
« téléphone levé d'une main », trois-quarts vers la droite. À la place du widget date : `D.troisPostit` en
(810, 600) (aucune date dans cette scène). Tableau des gardes : visible, VIDE (aucun aimant : cette scène
n'a pas de date et ne dit rien des gardes).

**Couches.** `D.piece({ sol: "lino", solY: 1130 })` · porte · patères + une blouse · tableau des gardes ·
trois post-it · plan de travail · machine à café + vapeur · tasses · plante · ELLE · `D.telMini` (dans sa main
droite : `node.out.handR`) · `D.ticketPoche` (fente de la poche : `hip` + (24, 22) × 1,04) · poussière · `c.hud` :
fantôme, bannière, pastille, étiquette de mention.

**Construction en cascade** (`t0 = b2`).

| élément | build | instant |
|---|---|---|
| pièce (mur, sol) | présente | t0 |
| porte | `growY`, pivot bas, 0,35 s | t0 + 0,04 |
| patères, puis la blouse | `drop` 200 px, 0,4 s ; blouse `m.pend` ±7° | t0 + 0,08 / + 0,14 |
| tableau des gardes | `drop` 260 px, 0,45 s ; `m.pend` ±3° | t0 + 0,12 |
| trois post-it | `pop` | t0 + 0,2 |
| plan de travail | `rise` 200 px, 0,4 s | t0 + 0,18 |
| machine à café | `drop` 240 px (rebond), 0,45 s | t0 + 0,26 |
| tasses, plante | `drop` / `grow` | t0 + 0,32 / + 0,36 |

**Ce qui vit.** Vapeur de la machine (deux volutes, cycle 1,8 s) ; voyant qui clignote (1 Hz) ; une goutte
toutes les 1,4 s ; blouse pendue (±1°, 3,6 s) ; post-it (±3°, 2,4 s) ; plante (±2°, 4 s) ; ELLE respire (±2 px),
cligne.

**Chronologie.**

| repère | ce qui change |
|---|---|
| `b2` (2,85) | le fantôme rétrécit ; la pièce se construit ; ELLE regarde son téléphone, `focused` |
| `b2@طبيبة` (3,23) | pastille « Stationsärztin » / « طبيبة القسم » (taille 30) |
| `b2@والمحكمة` (4,03) | la pastille s'efface (`hide` à `b2@والمحكمة-0.05`) ; la bannière tombe en haut du cadre : sceau + « Arbeitsgericht Siegburg » ; son téléphone s'allume (`lueur`) et tremble (±3 px, 0,3 s) ; ELLE lève les yeux, `worried` |
| `b2@حكمات` (4,50) | ELLE `shock`, sueur, tête en arrière 0,3 s ; à `b2@حكمات+0.15` pastille jaune « verurteilt, … zu zahlen » / « المحكمة حكمات: تخلص » (taille 28) + micro « laut Urteil » |
| `b2@تخلصهم` (5,16) | **le ticket s'imprime hors de sa poche** (`sorti` 0 → 1 en 0,3 s, par à-coups de 12 px) puis pend (`m.pend` ±3°) ; ELLE baisse la tête vers lui |
| `b2@جيبها` (5,73) | ELLE `angry` ; elle tape du pied : le corps descend de 6 px et remonte (0,18 s), `D.poussiere` à ses pieds ; le ticket `pulse` (10 %) ; la bannière remonte |

**Caméra.** `[{ at: "b2", s: 1.0, cx: 540, cy: 920 }, { at: "b2+0.1", s: 1.03, cx: 540, cy: 920, d: 3.1, ease: "lin" }]`
+ `c.kick("b2@حكمات", 0.06)`, `c.kick("b2@تخلصهم", 0.05)`, `c.kick("b2@جيبها", 0.05)`. **Pas de zoom** : un zoom
ferait remonter le tableau des gardes sous la pastille (essayé sur le papier : à ×1,2 son bord passe à y 436).

**Textes et mentions.** Étiquette de mention (bas gauche) pendant toute la scène : « Stand Juli 2026: nicht
rechtskräftig » · « مازال ماشي نهائي ». Sur le ticket : « 1.000,00 EUR » · « zu zahlen ». L'argent ne
bouge pas : aucune pièce, aucun billet ; de la poche ne sort qu'une NOTE à payer (le même ticket reviendra, complet, en scène 17).

---

### Scène 3 — ACCROCHE : pas un patient, un collègue (b3 · 6,18 → 8,97) — ÉCRAN

**Idée.** Le message ne parlait pas d'un patient (barré) : il parlait d'un collègue (entouré de jaune). On ne
sait pas encore ce qu'il disait.

**Entrée.** `from: "b3", in: "cut", inDur: 0.4` + **plongée dans le téléphone** depuis sa main, départ écran
(541, 1105) (là où est son téléphone à la fin de la scène 2 : `k` ≈ 1,135).

**Composition (pixels).** Barre d'état `22.05.2026`, en-tête du groupe.

| élément | position |
|---|---|
| B0 (le même message, réduit) | `D.bulle` vert en (342, 600), 440 × 190 ; L1 lisible, un gribouillis, deux lignes de caviar ; pointe (806, 820) ; avatar d'ELLE (832, 836) |
| flèche à main levée (dans `dessus`) | part de (400, 800), se divise : branche gauche vers (330, 905), branche droite vers (700, 905) |
| `D.avatarPatient` | centre (330, 1000), r 78 |
| avatar de LUI | `D.avatar`, centre (700, 1000), r 78, `badge: "stetho"` |
| mots sous les avatars | « مريض » (`ttl` 52 px, centre (330, 1146)) ; « زميل ديالها » (`ttl` 52 px, centre (700, 1146)) |
| croix | deux traits à main levée (encre, 10 px) sur le patient, 150 × 150 |
| anneau jaune | autour de l'avatar de LUI, r 92, trait 8 px |

**Chronologie.**

| repère | ce qui change |
|---|---|
| `b3` (6,18) | le téléphone grandit ; B0 est là ; le tronc de la flèche se trace (0,25 s) |
| `b3@كتباتش` (6,41) | la branche gauche se trace ; le patient `pop` |
| `b3@مريض` (7,03) | « مريض » ← (0,25 s) ; à `b3@مريض+0.12` la croix `slam` (0,22 s, `buzz` 5) ; le patient passe à 35 % et rétrécit à 0,85 |
| `b3@4` (7,32 — le 2e « كتبات ») | la branche droite se trace ; l'avatar de LUI tombe en place (`drop` 120 px, rebond) |
| `b3@زميل` (7,89) | « زميل ديالها » ← (0,3 s) ; l'anneau jaune se trace ; `punch(tel, "b3@زميل", 0.04)` ; à `b3@زميل+0.15` pastille « Gesundheitsdaten eines Kollegen » / « المعطيات الصحية ديال زميل » (taille 26) |
| `b3@زميل+0.3` | LUI passe de `neutral` à `worried` |

**Ce qui vit.** Les deux avatars flottent (±4 px, 2,6 s, déphasés) ; l'anneau respire ; LUI cligne et regarde
vers la bulle (`look2: [-0.5, -0.6]`) ; semis.

**Textes et mentions.** Menton : la même mention de statut que la scène 1 (toute l'accroche la porte).

---

### Scène 4 — INTRO : la fiche « contact » de Yassine (i1–i3 · 8,97 → 18,14) — ÉCRAN, `summary: false`

**Idée.** L'auteur se présente — dans le téléphone, comme un contact qu'on ouvre.

**Entrée.** `from: "i1", in: "cut", inDur: 0.36, summary: false` + **T-NOTIF** : bannière avec une silhouette
de contact (`contact: true`), sans texte (le prénom arrive avec la voix).

**Composition (pixels).** Les ÉLÉMENTS sont ceux du socle (ne rien retirer), posés dans l'écran du téléphone :

| élément (socle) | position |
|---|---|
| `D.ficheContact` (icônes retour, étoile, crayon) | en-tête, y 393 |
| rayons `m.rays(525, 648, { op: 0.15, R: 330, speed: 6, at: "i1" })` | re-parentés dans la page (découpés par l'écran) |
| photo `assets/portrait.png` dans son cadre au trait | centre (525, 648) ; ombre r 200 ; **anneau jaune r 200** ; photo découpée r 176 (image 356 × 356) ; trait d'encre r 177 (5,5 px) ; reflet blanc en arc |
| **icône Instagram** dessinée, accrochée au cadre | carré arrondi 84 px, centre (661, 784) |
| ruban **« Yassine »** (jamais « Dr. ») | `k.ribbon("Yassine", 525, 912, { size: 56 })` |
| petite icône Instagram + **« @dr.aguilo »** | icône (395, 990) ; texte `de` 46 px, centre (545, 1006) |
| pastilles | centre (525, 1068), taille 26 (arabe jusqu'à y ≈ 1133) |
| **cœur « j'aime »** | `Persona.props.heart`, centre (340, 1196), taille 1,25 ; mot « j'aime » (`de` 30 px) en (340, 1264) |
| **bouton « + s'abonner »** | 300 × 84, centre (650, 1200) |

Le bloc finit à y 1272 (limite : 1300). La bande des pastilles (y 440 → 574) n'est pas utilisée. La zone de
saisie est remplacée par une barre d'accueil (trait gris arrondi, 180 × 8, centre (525, 1352)).

**Chronologie** (repères identiques au gabarit).

| repère | ce qui change |
|---|---|
| `i1` (8,97) | T-NOTIF ; la photo `pop` (0,4 s) ; les rayons s'ouvrent |
| `i1@ياسين` (9,21) | le ruban « Yassine » se trace (`wipe`, 0,35 s) ; à `i1@ياسين+0.15` l'icône et « @dr.aguilo » |
| `i1@فألمانيا` (9,82) | pastille « Arzt in Deutschland » / « طبيب فألمانيا » |
| `i2@حقيقية` (11,97) | elle s'efface ; à `i2@حقيقية+0.15` pastille jaune « echte Fälle · deutsche Gerichte » / « قصص حقيقية من المحاكم » |
| `i3` (14,49) | la pastille s'efface ; le cœur et le bouton `pop` (bouton à `i3+0.1`) |
| `i3@j'aime` (15,34) | le cœur se remplit de jaune et bat ; l'étoile de l'en-tête tourne ; `punch(tel, "i3@j'aime", 0.04)` |
| `i3@abonne` (15,82) | le bouton devient jaune « ✓ abonné » ; `punch(tel, "i3@abonne", 0.04)` |

**Ce qui vit.** Rayons qui tournent ; la photo flotte (±3 px, 3 s) ; un petit point jaune « en ligne » pulse
sur le bord de l'icône Instagram (1,2 s) ; le cœur bat doucement après `i3@j'aime` (±5 %, 0,9 s) ; semis absent
(ce n'est pas un fil).

**Logo du haut.** Masqué de `i1-0.1` à `b4-0.1` (bloc HUD du socle, inchangé).

---

### Scène 5 — Le groupe (b4 · 18,14 → 21,98) — ÉCRAN

**Idée.** Un groupe de neuf médecins d'un service : on y parle des gardes, des congés, et même des cadeaux.

**Entrée.** `from: "b4", in: "cut", inDur: 0.36` + **T-NOTIF** : bannière « Ärzte-AC » / « WhatsApp-Chatgruppe ».
Barre d'état `Mai 2025`.

**Composition (pixels).** Sous la bande, une **rangée fixe de neuf avatars** (hors du fil défilant) : centres
`(229 + 74 × i, 634)`, r 30, dans l'ordre ELLE, LUI, K1 … K7. Le fil est découpé plus bas : (172, 690, 706, 610).
Trois bulles de sujets (blanches), chacune : icône 82 px à gauche, mot allemand (`de` 30 px) et sa traduction
dessous (`ar strong` 28 px, ancrée à droite) :

| bulle | ancrage · taille (défilement 0) | contenu | auteur (avatar à (216, bas + 36)) |
|---|---|---|---|
| A | (262, 720), 330 × 134 | `D.icoDienst` (323, 787) · « Dienst » (x 384, y 778) · « la garde » (fin x 570, y 826) | K3 |
| B | (262, 888), 330 × 134 | `D.icoUrlaub` (323, 955) · « Urlaub » · « الكونجي » | K4 |
| C | (262, 1056), 470 × 134 | `D.icoCadeau` (323, 1123) · « Geburtstagsgeschenk » · « كادو ديال عيد الميلاد » (fin x 710) | K1 |

Défilement (les bulles arrivent par le bas et poussent les autres) : `defile` vaut −336 au départ (A est à
y 1056), `{ at: "b4@الكونجيات", dy: +168 }`, `{ at: "b4@الكادوات", dy: +168 }`, durée 0,3 s, fin en `E.back`.

**Chronologie.**

| repère | ce qui change |
|---|---|
| `b4` (18,14) | T-NOTIF ; à `b4+0.3` le titre « Ärzte-AC » s'écrit dans l'en-tête (0,35 s) |
| `b4@الجراحة` (18,71) | pastille « Ärzte-AC » / « گروپ أطباء الجراحة » (taille 30) |
| `b4@3` (19,13 — le mot « 9 ») | les neuf avatars `pop` un à un (0,06 s d'écart) ; le sous-titre compte de 1 à 9 (`c.count`, 0,55 s) puis affiche « WhatsApp-Chatgruppe · 9 Mitglieder » ; à `b4@3+0.1` la pastille devient « 9 Mitglieder » / « 9 ديال الأعضاء » |
| `b4@les` (19,99) | bulle A jaillit de l'avatar de K3 ; K3 `smile` |
| `b4@الكونجيات` (20,60) | le fil monte ; bulle B (K4) ; le parasol oscille |
| `b4@الكادوات` (21,40) | le fil monte ; bulle C (K1) ; le nœud du paquet remue, le couvercle saute ; K1 et K5 `bigsmile` ; `punch(tel, "b4@الكادوات", 0.03)` |

**Ce qui vit.** Neuf avatars qui clignent en désordre et regardent la dernière bulle ; icônes animées ; semis ;
ascenseur.

**Textes et mentions.** Menton : « laut Urteil » · « حسب الحكم » de `b4` à `b4@les` (le nom, le nombre) ; puis
« Rekonstruktion » · « مشهد تمثيلي » (les SUJETS sont dans le jugement, le texte des bulles est inventé).
Aucun nom sous les avatars, aucune photo réaliste, aucun logo.

---

### Scène 6 — Jeudi : le canapé (b5 · 21,98 → 26,02) — PIÈCE (salon)

**Idée.** Jeudi, l'un des neuf passe aux urgences de leur propre hôpital, reçoit un vrai arrêt de travail, et
écrit seulement au groupe qu'il est malade.

**Entrée.** `from: "b5", in: "cut", inDur: 0` + **sortie du téléphone** vers SES mains (cible écran
(508, 1053), échelle 0,07) + bannière de date en haut du cadre : « Donnerstag, 29. Mai 2025 » / « الخميس »
(de `b5` à `b5+1.1`).

**Composition (monde).** § 2 F. LUI : assis de face, (510, 1276), échelle 1,05, `armL: [-20, 105]`,
`armR: [20, -105]`, `D.telMini` en (510, 1027). Ordre d'empilement : `D.canapeDos` → LUI → `D.canapeDevant`
(le plaid cache les jambes). Zone réservée au certificat puis à la bulle : x 365 → 745, y 572 → 810 (mur nu).

**Construction en cascade** (`t0 = b5`).

| élément | build | instant |
|---|---|---|
| `D.piece({ sol: "parquet", solY: 1150, rayures: true })` | présente | t0 |
| fenêtre ; rideaux | `grow` ; `swing` (−25° → 0) | t0 + 0,05 ; + 0,10 et + 0,14 |
| lampadaire | `drop` 260 px + `m.pend` ±5° | t0 + 0,12 |
| tapis | `grow` | t0 + 0,2 |
| canapé (dos + LUI + devant, ensemble) | `rise` 240 px, 0,45 s | t0 + 0,16 |
| guéridon ; tasse | `rise` ; `drop` | t0 + 0,24 ; + 0,3 |

**Chronologie.**

| repère | ce qui change |
|---|---|
| `b5` (21,98) | le fantôme rétrécit dans ses mains ; bannière de date ; la pièce se construit |
| `b5@مشى` (22,93) | **le certificat jaune `pop`** en (455, 690), incliné de −5° ; LUI le regarde |
| `b5@للمستعجلات` (23,17) | pastille « Notaufnahme » / « المستعجلات » (taille 30) ; le tampon « Notaufnahme » du certificat `slam` (0,2 s, sans secousse) |
| `b5@سبيطارهم` (24,02) | la pastille devient « Arbeitsunfähigkeitsbescheinigung · bis 02.06.2025 » / « شهادة طبية حتى 02.06 » (taille 22) ; un cercle d'encre se trace autour de « bis 02.06.2025 » (0,3 s) |
| `b5@وكتب` (24,48) | le certificat rétrécit (×0,42) et va se poser sur l'accoudoir droit (738, 1040) en 0,4 s ; LUI tape (deux états, 7 Hz) ; petite bulle « … » en (588, 928), 104 × 64, pointe (540, 1022), points `m.typing(640, 960, …)` ; la caméra se rapproche |
| `b5@بلي` (25,19) | la bulle « … » disparaît ; **sa bulle de message** jaillit : `D.bulle` blanc en (375, 625), 370 × 150, pointe (507, 808) ; ligne 1 « krank · Vertretung? » (`de` 38 px, centre (560, 690)) ; ligne 2 « مريض · شكون ياخد بلاصتو؟ » (`ar strong` 28 px, centre (560, 745)) ; petit pictogramme de téléphone collé au coin haut-gauche de la bulle |

**Ce qui vit.** Rideaux (±1,2°, 4,2 s) ; nuage dans la fenêtre ; poussière dans le cône de la lampe ; vapeur de
la tasse ; franges du plaid ; LUI respire et cligne lentement (toutes les 2,6 s).

**Personnages.** LUI : `worried` ; regarde le certificat de `b5@مشى` à `b5@وكتب` ; `focused` en tapant ;
`worried` après. `talk: 0` (il écrit).

**Caméra.** `[{ at: "b5", s: 1.0, cx: 540, cy: 920 }, { at: "b5+0.1", s: 1.03, cx: 540, cy: 920, d: 2.3, ease: "lin" },
{ at: "b5@وكتب-0.1", s: 1.12, cx: 545, cy: 880, d: 0.45 }]`. Mouvement vertical seulement.

**Textes et mentions.** Étiquette de mention : « laut Urteil » · « حسب الحكم » jusqu'à `b5@بلي`, puis
« Rekonstruktion » · « مشهد تمثيلي » (le texte de son message n'est pas publié : on n'écrit que les deux
notions du jugement, « krank » et « Vertretung »). Aucune horloge, aucun symptôme, pas de mouchoirs.

---

### Scène 7 — Samedi : la salle des médecins (b6 · 26,02 → 28,83) — PIÈCE

**Idée.** Samedi, c'est elle qui écrit : elle a repris ses gardes — le tableau du week-end le montre, et elle
tape, furieuse.

**Entrée.** `from: "b6", in: "slideUp", inDur: 0.34` + bannière « Samstag, 31. Mai 2025 » / « السبت »
(de `b6` à `b6+1.0`).

**Composition (monde).** § 2 E. ELLE : (530, 1320), échelle 1,04, de face, pose « elle tape ». Widget date
(pas une éphéméride) : « SA » / « 31 » / « MAI » (x 756 → 866, y 536 → 672). Tableau des gardes : au départ, les deux aimants
de LUI en « Fr » (478, 690) et « So · Tag » (650, 690). Post-it en (720, 795).

**Chronologie.**

| repère | ce qui change |
|---|---|
| `b6` (26,02) | la pièce monte ; bannière ; tableau `drop` + `m.pend`, widget date `pop` (0,25 s) ; ELLE tape |
| `b6+0.35` | une marque `D.colere` pop en (440, 868), entre la patère vide et ses cheveux |
| `b6@زميلتو+0.25` (26,60) | le post-it « zum wiederholten Male » / « ماشي أول مرة » pop sur le coin du tableau |
| `b6@كتبات` (26,73) | bulle « … » au-dessus de son téléphone : `D.bulle` en (598, 873), 104 × 64, pointe (566, 1040), points `m.typing(650, 905, …)` ; elle reste jusqu'à la fin |
| `b6@حتى` (27,06) | deuxième marque de colère en (618, 846), au-dessus de la bulle « … » |
| `b6@خديت` (27,49) | **« Fr »** : l'aimant de LUI pivote (40°) et tombe dans la gouttière (rebond, 0,35 s) ; à `b6@خديت+0.12` l'aimant d'ELLE claque à sa place (`slam`, secousse 6) ; la caméra monte ; pastille « … seinen Dienst am Freitag übernommen » (taille 22) à `b6@خديت+0.1` ; la traduction commune « خديت la garde ديال الجمعة وديال الأحد » (`ar strong` 28 px, centre (520, 488), `c.hud`) ← à `b6@خديت+0.2` et reste |
| `b6@gardes` (28,01) | **« So · Tag »** : même échange d'aimants ; à `b6@gardes+0.15` la pastille devient « Auch diesen Dienst am Sonntag Tag habe ich übernommen » (taille 22, sans arabe : la traduction commune est déjà là) |

**Ce qui vit.** Machine à café (vapeur, voyant, goutte), blouse pendue, plante, post-it, pouces d'ELLE, marques de
colère qui tremblent (`wobble`), points de la bulle.

**Caméra.** `[{ at: "b6", s: 1.0, cx: 540, cy: 920 }, { at: "b6+0.1", s: 1.03, cx: 540, cy: 920, d: 1.2, ease: "lin" },
{ at: "b6@خديت-0.1", s: 1.08, cx: 545, cy: 900, d: 0.4 }]`. À ×1,08 ses pieds sont à y ≈ 1440 à l'écran
(au-dessus du sous-titre) et le haut du tableau à y ≈ 512 (sous la traduction de la pastille).

**Textes et mentions.** Étiquette : « laut ihrer Nachricht » · « حسب الميساج ديالها » (c'est SA version). Le
post-it porte son propre micro « laut Urteil » (c'est le jugement, pas elle, qui dit « une fois de plus »).
Aucun nom ni initiale sur les aimants : seulement deux pictogrammes de coiffure (boucles / cheveux longs).

---

### Scène 8 — Le brouillon : 549 € (b7 · 28,83 → 30,98) — ÉCRAN

**Idée.** Dans son message, elle écrit sa colère : un week-end payé 549 euros, fichu.

**Entrée.** `from: "b7", in: "cut", inDur: 0.4` + **plongée dans le téléphone** depuis sa main, départ écran
(522, 1147). Barre d'état `Sa · 31.05.2025`.

**Composition (pixels).** Séparateur `Samstag, 31. Mai 2025` en (525, 606). Le brouillon (voir plus haut),
`n = 2` à t0. Zone du billet : y 640 → 780. Avatar d'ELLE (832, 1262).

**Chronologie.**

| repère | ce qui change |
|---|---|
| `b7` (28,83) | le téléphone grandit ; à `b7+0.25` L1 et L2 se tapent (0,25 s chacune) ; curseur |
| `b7@1` (29,16 — le mot « 549 ») | L3 puis L4 se tapent (0,45 s) ; la bulle grandit (`n = 4`, le haut monte de 84 px en 0,25 s) ; à `b7@1+0.05` le **billet** `pop` en (420, 706), incliné de −5° ; à `b7@1+0.3` un coup de surligneur sous « 549 € » dans L3 |
| `b7@أورو` (29,40) | pastille « Wochenendausflug für 549 € » / « خرجة ديال الويكاند: 549 أورو » (entre « », taille 26) |
| `b7@ومشى` (30,30) | L5 puis L6 se tapent ; `n = 6` ; **le billet se déchire** (`dechire` 0 → 1 en 0,3 s) ; ses moitiés tombent hors du fil (0,5 s) ; ELLE lève les yeux au ciel ; à `b7@ومشى+0.15` la pastille devient « … mein WE eh im Arsch war … » / « الويكاند ديالي مشى فيها » (taille 24) |

**Ce qui vit.** Curseur, semis, ascenseur, le billet qui flotte (±3 px) avant de se déchirer, clignements.

**Textes et mentions.** Menton : « laut Urteil (Auszug der Nachricht) » · « حسب الحكم ». La voix résume à la
première personne ; l'écran porte les phrases exactes.

---

### Scène 9 — Dans le même message : ses diagnostics (b8 · 30,98 → 35,20) — ÉCRAN

**Idée.** Le même message contient les diagnostics du collègue (illisibles pour nous) ; elle les tenait d'une
collègue des urgences.

**Entrée.** `from: "b8", in: "cut", inDur: 0` (**coupe**). État de départ : brouillon `n = 6`.

**Chronologie.**

| repère | ce qui change |
|---|---|
| `b8` (30,98) | une accolade à main levée se trace à gauche de la bulle, de haut en bas (x 196, y 920 → 1216, 0,3 s) : UN seul message ; la bulle `pulse` (3 %) |
| `b8@كتبات` (31,74) | L7 : barre de 150 (`wipe` 0,25 s), mot « Diagnosen » (`de` 26 px, pop), barre de 220 ; `n = 7` |
| `b8@diagnostics` (32,31) | pastille « Diagnosen · Laborwerte » / « التشخيصات · التحاليل » (taille 28) ; à `b8@diagnostics+0.3` L8 : barre de 90, « Laborwerte », barre de 270 ; `n = 8` |
| `b8@ديالو` (32,92) | l'avatar de LUI (r 50) `pop` en (300, 716), `worried` ; une flèche à main levée part de L7 et monte vers lui (0,25 s) |
| `b8@عاوداتهم` (33,25) | l'avatar de LUI et sa flèche s'effacent (0,15 s) ; la **carte « source »** tombe par-dessus le haut du fil (dans `dessus`) : `k.card(196, 596, 658, 224)` ; à gauche `D.avatarSil` (290, 708, r 56) ; à droite l'avatar d'ELLE (760, 708, r 56) ; le reste du fil passe à 45 % d'opacité |
| `b8@ليها` (33,72) | une flèche en pointillé se trace de la silhouette vers ELLE (x 352 → 698, y 708, 0,4 s) ; deux petites barres noires (70 × 22) glissent le long de la flèche (de `b8@ليها+0.1` à `+0.7`) |
| `b8@زميلة` (34,00) | pastille « eine Kollegin aus der Notaufnahme » / « زميلة من المستعجلات » (entre « », taille 24) ; une petite flèche courbe descend de la pastille vers la silhouette |
| `b8@ليها+0.7` (34,42) | les barres arrivent : l'avatar d'ELLE `shock` 0,3 s (sourcils levés), puis `angry` |
| `b8@المستعجلات+0.2` (34,73) | les deux barres tombent de son avatar dans L7 et L8 (0,35 s) ; le fil revient à 100 % ; à `b8@المستعجلات+0.45` la carte remonte et disparaît (0,2 s) |

**Ce qui vit.** Semis, curseur, silhouette et avatars qui flottent, barres qui tremblent d'un pixel (encre
fraîche) pendant 0,3 s après leur tracé.

**Textes et mentions.** Menton : « laut Urteil » · « حسب الحكم ». Les seuls mots lisibles des deux lignes sont
« Diagnosen » et « Laborwerte ». La silhouette n'a ni blouse, ni téléphone, ni écran, ni dossier : on ne sait
pas COMMENT elle l'a dit ; la flèche ne dit que « de l'une à l'autre ». Jamais ELLE devant un dossier médical.

---

### Scène 10 — La dernière ligne (b9–b10 · 35,20 → 39,71) — ÉCRAN

**Idée.** Sa dernière phrase, la seule qu'on puisse lire : une moquerie. Elle sort du fil ; elle servira plus
tard.

**Entrée.** `from: "b9", in: "cut", inDur: 0` (**coupe**). État de départ : brouillon `n = 8`.

**Composition (pixels).** `D.loupeCitation` en (196, 596), 658 × 190, reliée à L9 (`vers: [238, 1180]`).
Dans la loupe : ligne 1 « Vielleicht sitzt aber » (centre (525, 668)), ligne 2 « ein Pups quer. » (centre
(525, 738)), `de` 54 px. Pour le mot à mot, pas de mesure de largeur : chaque ligne est UN `<text>` fait de
`<tspan>` (un par mot) dont `fill-opacity` passe de 0 à 1 à son repère ; même procédé pour L9 dans la bulle.

**Chronologie.**

| repère | ce qui change |
|---|---|
| `b9` (35,20) | `n = 9` (la bulle prend une ligne, le curseur se place au début de L9) ; les huit premières lignes passent à 55 % |
| `b9@Vielleicht-0.12` (35,41) | la loupe jaillit de L9 (`pop`, pivot (238, 1180), 0,3 s) |
| `b9@Vielleicht` (35,53) · `b9@sitzt` (36,09) · `b9@aber` (36,42) · `b9@ein` (36,71) · `b9@Pups` (36,95) · `b9@quer` (37,23) | à chaque repère, le mot apparaît EN MÊME TEMPS dans L9 (26 px) et dans la loupe (54 px) ; la loupe entière tressaute (échelle +3 %, 0,14 s) à chaque mot |
| `b9@Pups` | coup de surligneur sous « Pups » dans la loupe ; `punch(tel, "b9@Pups", 0.04)` |
| `b9@quer` | l'avatar d'ELLE : petit `smile`, rebond de 6 px |
| `b10` (37,63) | dans la loupe, les deux lignes se resserrent en UNE (« Vielleicht sitzt aber ein Pups quer. », 34 px, centre (525, 650), 0,3 s) ; à `b10+0.15` la traduction ← en `ttl` 46 px, centre (525, 740), révélée en 1,2 s |
| `b10+0.9` (38,53) | pastille « … um den Kläger in der Abteilung bloßzustellen » / « باش تحشمو قدام السرفيس » (entre « », taille 22) |
| `b10@end-0.35` (39,36) | la loupe rétrécit dans L9 (0,25 s) ; les lignes reviennent à 100 % ; le pouce entre par la droite (0,2 s) |
| `b10@end-0.05` (39,66) | le pouce appuie sur le bouton d'envoi (`appui` 0 → 1 en 0,08 s) |

**La traduction de b10 est un TEXTE PROVISOIRE** : `const TRAD_B10 = "يعني: غير شي ريح حاصل ليه."` (proposition
non garantie du scénario). Elle sera remplacée par les mots exacts de l'auteur. Aucun repère ne vise un mot de
b10 : seulement le début du beat, sa fin, et des décalages autour (`b10`, `b10+0.9`, `b10@end-0.35`).

**Ce qui vit.** Semis, curseur, la loupe flotte (±2 px), ses scotchs frémissent, les mots déjà tombés
respirent (±1 %).

**Textes et mentions.** Menton : « laut Urteil (Auszug der Nachricht) » · « حسب الحكم » ; la pastille de b10
vient aussi du jugement. Rien ne rit de LUI : la scène montre SA phrase à elle, attribuée.

---

### Scène 11 — Envoyé : le silence (fin de b10 → b11 · 39,71 → 41,02 ; 1,3 s sans voix) — ÉCRAN

**Idée.** C'est parti, chez sept collègues. Plus rien ne défile.

**Entrée.** `from: "b10@end", in: "cut", inDur: 0` (**coupe**). État de départ : brouillon `n = 9` complet, le
pouce sur le bouton.

**Chronologie** (`t0 = b10@end`).

| repère | ce qui change |
|---|---|
| `b10@end` (39,71) | le pouce relâche et sort (0,2 s) ; le bouton d'envoi devient `#DCEFD9` ; **le contour pointillé devient plein et la hachure verte gagne la bulle** de gauche à droite (deux `D.bulle` superposées, la verte en `wipe` 0,35 s) ; le curseur disparaît ; le **semis s'arrête** ; le fil monte de 150 px (`{ at: "b10@end", dy: 150, d: 0.4 }`) : la bulle va de y 644 à 1066, l'avatar d'ELLE en (832, 1112) |
| `b10@end+0.2` | pastille « an jedenfalls sieben Mitglieder … übermittelt » / « وصل لـ7 ديال الزملاء » (entre « », taille 22) + micro « laut Urteil » |
| `b10@end+0.3` → `+0.84` | sept traits fins en pointillé partent du bas de la bulle (y 1076) vers sept avatars (K1 … K7), un toutes les 0,09 s ; chaque avatar `pop` au bout de son trait — centres `(250 + 84 × i, 1196)`, r 30, posés dans `page`, HORS du fil défilant — puis reçoit sa pastille verte (`badge: "point"`) ; le petit « 7 » compte de 1 à 7 en (838, 1208) |
| `b10@end+0.95` → `b11` | **plus rien ne bouge**, sauf sept clignements désynchronisés. L'ascenseur est immobile et pâle. |

**Personnages.** Sept avatars `neutral`, bouche fermée, regard droit. Aucun point d'écriture, aucune réaction,
aucune coche, pas de « lu ». Ni ELLE ni LUI dans la rangée (les sept = les neuf moins eux deux).

**Mouvement.** Cette scène sera signalée « FIGÉ » par `tools/mouvement.mjs` après 0,95 s : c'est voulu
(c'est le seul arrêt de l'épisode).

**Textes et mentions.** Menton : « Rekonstruktion » · « مشهد تمثيلي » (le jugement ne décrit aucune réaction ;
on n'affirme pas non plus que personne n'a répondu). Pas de ligne « … hat die Gruppe verlassen » ici.

---

### Scène 12 — L'été : la lettre (b11 → milieu de b12 · 41,02 → 44,17) — PAPIER

**Idée.** La suite ne passe plus par le téléphone : en été, il lui demande PAR ÉCRIT de s'engager à ne pas
recommencer. Celle qui a tant écrit n'écrit rien.

**Entrée.** `from: "b11", in: "cut", inDur: 0, view: false`. Le fantôme du téléphone (écran qui s'éteint :
`eteint` 0 → 1 en 0,3 s) glisse vers le bas à gauche et SORT du cadre (déplacement (−300, +900), rotation −18°,
0,5 s, `E.in`) : on pose le téléphone. Pas de bannière : du papier.

**Composition (pixels ; caméra neutre `{ s: 1, cx: 540, cy: 960 }`).**

| élément | position |
|---|---|
| `D.widgetDate({ mois: "JULI", jour: "25", an: "2025" })` | bord haut en (230, 540) ; vignette x 155 → 305, y 540 → 710 |
| `D.soleilEte` + `m.rays(190, 492, { n: 10, R: 62, op: 0.5, speed: 14 })` | centre (190, 492) |
| `D.enveloppe` | centre (620, 1230) (x 420 → 820, y 1115 → 1345) ; ordre : dos de l'enveloppe → lettre → devant de l'enveloppe |
| `D.lettre` (un seul groupe : feuille + tout son contenu) | centre final (620, 865) (x 400 → 840, y 580 → 1150) |
| — avatar de LUI (expéditeur) | (446, 632), r 34 |
| — date `25.07.2025` | `de` 24 px, fin à x 812, y 640 |
| — titre `Unterlassungserklärung` | `de` 34 px, centre (620, 735) |
| — cinq lignes `D.gribouillis` | y 790, 830, 870, 910, 950 |
| — bloc signature | « ✗ » (446, 1066) + trait x 470 → 740, y 1070 ; avatar d'ELLE (790, 1050), r 34 |
| `D.stylo` | centre (600, 1048), incliné de −6° |
| tampon | `k.prop("stamp", 590, 985, 0.5, () => ({ text: "erfolglos", size: 48, rot: -8 }))` |

Fond : `k.bg()` + `m.shapes({ seed: 12, pts: [[130, 880], [950, 520], [140, 1330], [930, 760]], at: "b11+0.2" })`.

**Chronologie.**

| repère | ce qui change |
|---|---|
| `b11` (41,02) | le téléphone sort ; à `b11+0.08` le widget « JULI 25 » `pop` (0,25 s, petit rebond) ; à `b11+0.12` l'enveloppe arrive de la droite ; à `b11+0.2` le soleil `pop`, ses rayons tournent |
| `b11@الطبيب` (41,40) | le rabat se relève (0,25 s) ; la lettre monte hors de l'enveloppe (0,45 s) ; son avatar à LUI est dans l'en-tête, `focused` |
| `b11@طلب` (41,78) | le titre « Unterlassungserklärung » se tape (0,5 s) ; la date se tape à `b11@طلب+0.3` |
| `b11@تكتب` (42,30) | pastille « Unterlassungserklärung · 25.07.2025 » / « التزام مكتوب: ما نعاودش » (taille 26) ; le bloc signature apparaît : la croix, le trait (se trace en 0,3 s), l'avatar d'ELLE (`pop`) ; le stylo tombe sur le trait (rebond) |
| `b11@تعاودهاش` (43,02) | le stylo attend : il oscille (±3°, 0,8 s) ; ELLE détourne le regard |
| `b12-0.05` (43,55) | la caméra descend sur le bloc signature |
| `b12@كتباتش` (43,79) | **le tampon « erfolglos » `slam`** (0,28 s, `c.shake` 8) ; le stylo roule vers la droite et tombe hors du cadre (0,5 s) ; la pastille devient « erfolglos » / « بلا نتيجة » (entre « », taille 34) |

**Ce qui vit.** Widget date qui respire (échelle ±1 %, 2,4 s), rayons du soleil, formes qui dérivent, lettre qui flotte (±2 px, 3 s),
avatars qui clignent, stylo.

**Caméra.** `[{ at: "b11", s: 1, cx: 540, cy: 960 }, { at: "b12-0.05", s: 1.06, cx: 590, cy: 1010, d: 0.4 }]`
(avec `view: false`, `c.kick` est sans effet : ne pas en mettre). Elle DESCEND de 50 px et se rapproche à
peine : à ×1,06 le haut de la lettre est à y 504, juste sous la traduction de la pastille (un zoom plus fort
ferait passer la lettre derrière la pastille) ; la lettre va de x 339 à 805, entière.

**Textes et mentions.** Étiquette : « laut Urteil » · « حسب الحكم ». On ne montre aucune réponse « Nein » : le
jugement dit seulement « erfolglos ». Le trait de signature reste VIDE.

---

### Scène 13 — « Plans » : le tribunal de Siegburg (fin de b12 · 44,17 → 47,20) — ÉCRAN

**Idée.** Il va au tribunal du travail ; ce tribunal est à Siegburg. L'épingle montre le TRIBUNAL, pas
l'hôpital.

**Entrée.** `from: "b12@فمشى", in: "cut", inDur: 0.36` + **montée** du téléphone depuis le bas. Barre d'état
`10.09.2025`.

**Composition (pixels).**

| élément | position |
|---|---|
| `D.champRecherche` | (196 → 854, 360 → 426) ; texte `Arbeitsgericht Siegburg` (`de` 28 px, x 250, y 404) ; mini-avatar de LUI (826, 393), r 22 |
| `D.plansUI` | quadrillage (SOUS la carte), « + / − », boussole, échelle |
| carte de l'Allemagne (contour du socle `DE`, même tracé que `drawDE`, dessiné dans `page`) | `geo = geoAt(500, 866, 74)` → Allemagne x 287 → 708, y 592 → 1147 ; Berlin (634, 768) avec son point et son nom ; la carte, l'épingle et les ondes sont découpées par la zone (172, 574, 706, 596) : rien ne passe sous la bande |
| épingle jaune (socle `pinAt`, re-parentée dans `page`) | Siegburg `geo(7.21, 50.80)` = **(348, 896)** ; `m.ripple(348, 896, …)` re-parenté |
| carte-légende | `k.card(410, 818, 280, 150)` : « Arbeitsgericht » (`de light` 20 px, centre (550, 850)) ; « Siegburg » (`de` 44 px, centre (550, 896)) ; « المحكمة » (`ttl` 40 px, centre (550, 946)) |
| bande | pastille en (525, 486) ; un bandeau de papier (172, 440, 706, 134) posé au-dessus du haut de la carte |
| `D.ficheLieu` | (172, 1170), 706 × 214 : titre « Arbeitsgericht Siegburg » (`de` 28 px, x 204, y 1216) ; ligne 1 « Klage · 10.09.2025 » (`de` 24 px, x 204, y 1268) + « دعوى » (`ar strong` 28 px, fin x 846) ; ligne 2 « gefordert: 2.000 € » (y 1326) + « طلب 2000 أورو » |

**Chronologie.**

| repère | ce qui change |
|---|---|
| `b12@فمشى` (44,17) | le téléphone monte en vibrant (`buzz(tel, "b12@فمشى+0.3", 6)`) ; à `+0.2` la carte `pop` (pivot (500, 866)) ; le reflet passe |
| `b12@Arbeitsgericht` (44,46) | « Arbeitsgericht Siegburg » se tape dans le champ (0,6 s) ; l'avatar de LUI cligne, `focused` |
| `b12@يعني` (45,29) | pastille « Arbeitsgericht » / « محكمة الشغل » (taille 30) |
| `b12@فمدينة` (46,24) | la fiche du lieu monte du bas (`rise` 240 px, 0,3 s) ; ses deux lignes apparaissent à `+0.15` et `+0.3` |
| `b12@Siegburg` (46,62) | **l'épingle tombe** sur (348, 896) (`slide` depuis −160 px, `back`, 0,4 s) ; ondes ; `punch(tel, "b12@Siegburg+0.35", 0.05)` ; à `b12@Siegburg+0.25` la carte grossit (×1,2, pivot l'épingle, 0,5 s) et la carte-légende `pop` |

**Ce qui vit.** Boussole (±7°), ondes sous l'épingle (trois, relancées une fois à `+1.0`), l'épingle oscille
(`wobble`), curseur dans le champ.

**Textes et mentions.** Menton : « laut Urteil » · « حسب الحكم ». Aucune autre ville que Berlin (repère de la
série) ; aucune épingle « hôpital », aucun trajet (on ne sait pas d'où il part).

---

### Scène 14 — Il n'est plus dans le groupe ; il quitte l'hôpital (b13 · 47,20 → 50,17) — PIÈCE (salle des médecins)

**Idée.** Il n'est pas resté dans le groupe (on ne sait pas quand il en est sorti) ; à la fin de l'année, il
est parti de l'hôpital aussi. Le message a compté, il n'est pas la seule cause.

**Entrée.** `from: "b13", in: "slideUp", inDur: 0.34`. En haut du cadre tombe, à la place de la bannière, la
**ligne grise du système** `D.ligneSysteme` (240 → 840, 300 → 384) : « … hat die Gruppe verlassen » /
« خرج من الگروپ », SANS date ni heure, micro « Rekonstruktion » ; son mini-avatar devient un rond pointillé
(`parti` 0 → 1 de `b13+0.3` à `+0.7`). Elle remonte à `b13@وفآخر+0.15`.

**Composition (monde).** La même pièce, sans ELLE. Machine à café éteinte (ni vapeur ni voyant).
La patère de droite, vide dans les scènes 2 et 7, porte maintenant SA blouse à lui (x 356 → 400, avec un
badge) : il l'a laissée. Tableau des gardes : deux aimants de LUI (pictogramme bouclé) et deux aimants gris
sans pictogramme ; aucun aimant d'ELLE. Widget date : AUCUNE date lisible au départ (voir la chronologie).
LUI : debout de profil vers la gauche en (610, 1320), échelle 1,02, tenue `jacket`, le carton dans les bras.

**Chronologie.**

| repère | ce qui change |
|---|---|
| `b13` (47,20) | la pièce monte ; la ligne du système tombe ; LUI regarde le tableau des gardes ; le widget date défile déjà : ses trois lignes roulent vers le haut, floues, comme une roue de sélection de date (le temps passe ; aucun feuillet ne s'arrache ; on ne doit lire AUCUN jour pendant que la ligne « … hat die Gruppe verlassen » est à l'écran) |
| `b13+0.3` et `b13+0.55` | sur le tableau, ses deux aimants à lui se décrochent et tombent dans la gouttière (rebond) |
| `b13@وفآخر` (48,14) | la roue ralentit et se cale (`roule` → 1 en 0,4 s) : « 31 » / « DEZ » / « 2025 », avec un petit rebond à `b13@وفآخر+0.4` |
| `b13@خلا` (48,81) | **il marche vers la porte** : de x 610 à x 235 en 1,15 s (vrai cycle `PP.walk`, phase `((t − a) × 1,7) % 1`, les bras tiennent le carton) ; à `b13@خلا+0.5` la porte s'ouvre (`ouverte` 0 → 1, 0,35 s) ; sa blouse, restée à la patère, se balance à son passage (`m.pend` ±7° à `b13@خلا+0.6`) |
| `b13@السبيطار` (49,28) | pastille « mitursächlich » / « واحد من الأسباب » (entre « », taille 30) + micro « laut Urteil » |
| `b13@خلا+1.15` (49,96) | il passe la porte et disparaît derrière le chambranle (fondu 0,2 s) ; la porte se rabat à moitié (0,3 s) |

**Ce qui vit.** Blouses, trois post-it, plante, widget date qui roule, carton qui tressaute à chaque pas.

**Personnages.** LUI : `sad` sans larmes, clignement lent ; regard vers le tableau puis vers la porte.
`talk: 0`. ELLE n'est pas là (personne ne triomphe).

**Caméra.** `[{ at: "b13", s: 1.0, cx: 540, cy: 920 }, { at: "b13+0.1", s: 1.03, cx: 540, cy: 920, d: 2.8, ease: "lin" }]`.
Fixe : on le regarde partir.

**Textes et mentions.** Étiquette : « laut Urteil » · « حسب الحكم ». La date « 31.12.2025 » est sur le
widget date. L'écran ne dit pas « à cause du message ».

---

### Scène 15 — Appel vidéo : « le groupe est privé à 70 % » (b14 · 50,17 → 52,37) — ÉCRAN

**Idée.** Devant le tribunal, elle se défend : ce groupe, c'est 70 % de privé.

**Entrée.** `from: "b14", in: "cut", inDur: 0.36` + **montée** du téléphone qui vibre + bannière d'appel
(`D.notif({ sceau: true, titre: "Arbeitsgericht Siegburg", appel: true })`) ; à `b14+0.4` le bouton jaune
s'enfonce, la bannière remonte, les deux tuiles `grow` (pivot leur centre, 0,3 s, 0,08 s d'écart).

**Composition (pixels).** Pas d'en-tête ni de fil : la bande des pastilles est remontée (y 346 → 486).

| élément | position |
|---|---|
| pastille | centre (525, 392), taille 22 ; arabe jusqu'à y ≈ 454 |
| tuile A (le tribunal) | `D.tuile` (196, 496, 658 × 384) ; contenu découpé par la tuile, dans cet ordre : `D.salleAudience` (`fond`) → les trois bustes → `D.salleAudience` (`table`) ; table : plateau y 760, façade jusqu'à y 880 ; plaque « Arbeitsgericht Siegburg · 1. Kammer » (centre (525, 822)) |
| — bustes | `JUG` pieds (525, 900), échelle 0,72 (tête de 585 à 690) ; `AS1` pieds (330, 892), échelle 0,64 ; `AS2` pieds (720, 892), échelle 0,64 ; la table les cache sous la poitrine |
| tuile B (elle) | `D.tuile` (196, 896, 658 × 384) ; `D.fondNeutre` ; ELLE en buste, découpée par la tuile : pieds (400, 1500), échelle 1,12 (tête de 1011 à 1168, épaules à 1179), pose « elle explique » ; bouche ≈ (400, 1139) |
| sa bulle | `m.speech({ x: 660, y: 1010, w: 290, h: 200, tip: [492, 1150], … })` re-parentée (bulle de x 515 à 805, y 910 à 1110 : la pointe est SOUS le bas de la bulle, à la hauteur de sa bouche, juste à droite de ses cheveux) ; dedans `D.camembert` centre (660, 996), r 70 ; « 70 % » (`de` 34 px, (635, 1030)) ; « privat » (`de light` 20 px, (635, 1056)) ; « 30 % » (`de` 22 px, (696, 974)) |
| plaque de nom B | `D.plaqueNom` (212, 1222), 300 × 46 : « Stationsärztin » · « طبيبة القسم » (posée sur sa blouse, sous le menton : jamais sur le visage) |
| `D.commandes` | y 1336 |

**Chronologie.**

| repère | ce qui change |
|---|---|
| `b14` (50,17) | montée + vibreur (`buzz(tel, "b14+0.2", 8)`) ; bannière d'appel ; puis les tuiles |
| `b14@هي` (50,88) | le liseré jaune « actif » entoure la tuile B ; le micro des commandes pulse |
| `b14@الگروپ` (51,36) | ELLE parle (`talk`) ; sa bulle jaillit de sa bouche avec le disque vide |
| `b14@70%` (51,74) | la part de 70 % se remplit en balayant (`rempli` 0 → 1, 0,4 s) ; « 70 % » `pop` ; à `b14@70%+0.1` pastille « zu 70% privat und lediglich zu 30 % dienstbezogen » / « 70% privé · 30% خدمة » (entre « », taille 22) + micro « laut Urteil » |
| `b14@privé` (51,93) | « privat » s'écrit sous « 70 % » ; « 30 % » `pop` (petit) ; `punch(tel, "b14@privé", 0.03)` |

**Ce qui vit.** `JUG` écrit (tête penchée, `look2: [0, 0.8]`, se redresse toutes les 1,3 s) ; `AS1` cligne ;
`AS2` regarde vers le bas ; l'eau de la carafe ; ELLE : main qui souligne (`armR[1]` de −112 à −104, 2 Hz
pendant qu'elle parle).

**Textes et mentions.** Menton : « Rekonstruktion » · « مشهد تمثيلي » (l'appel vidéo est une IMAGE : rien ne
dit que l'audience s'est tenue en visioconférence). La pastille est l'argument de la défense, pas un fait.

---

### Scène 16 — Appel vidéo : « et 30 % de travail » (b15 · 52,37 → 54,80) — ÉCRAN

**Idée.** Le tribunal retourne son chiffre : 30 % de travail suffisent — ce groupe n'est pas privé.

**Entrée.** `from: "b15", in: "cut", inDur: 0` (**coupe**). Même composition ; état de départ = fin de la
scène 15.

**Chronologie.**

| repère | ce qui change |
|---|---|
| `b15` (52,37) | le liseré jaune passe de la tuile B à la tuile A (0,2 s) ; ELLE se tait (`talk: 0`), `worried` |
| `b15@جاوباتها` (52,80) | sa bulle se referme (0,18 s) ; **le camembert en sort** et vient se poser à cheval sur les deux tuiles : centre (690, 888), r 96 (déplacement + grossissement, 0,35 s) ; `JUG` lève la main |
| `b15@و30%` (53,26) | `JUG` parle (`talk`) ; **la part de 30 % devient jaune** (`jaune` 0 → 1) et s'écarte (`ecart` 0 → 1, 24 px) ; « 30 % » grossit (40 px), « mindestens » (`de light` 20 px) au-dessus ; pastille « zu mindestens 30% arbeitsbezogene Inhalte » / « 30% خدمة » (entre « », taille 22) + micro « laut Urteil » ; `punch(tel, "b15@و30%", 0.04)` |
| `b15@خدمة` (53,50) | une petite `D.icoDienst` (44 px) `pop` sur la part jaune ; `AS1` hoche la tête |
| `b15@يعني` (53,79) | la pastille devient « nicht ausschließlich persönlichen Zwecken » / « ماشي privé 100% » (entre « », taille 22) |
| `b15@ماشي` (54,07) | sur le disque, un trait d'encre raye « privat » (`barre` 0 → 1, 0,2 s) ; ELLE `shock` 0,25 s puis `angry`, tête détournée, poings sur les hanches |
| `b15@privé` (54,36) | sa plaque de nom bascule : « uneinsichtig » · « ما اعترفات بوالو » (380 × 46) + micro « laut Gericht » |

**Ce qui vit.** Le camembert respire (±1,5 %), la part jaune vibre un instant en sortant, micro des commandes
qui pulse avec la voix de la juge, chemise de dossier qui glisse.

**Textes et mentions.** Menton : « Rekonstruktion » · « مشهد تمثيلي ». Aucune bulle pour la juge : aucune de
ses phrases n'est inventée ; les deux pastilles sont des citations du jugement.

---

### Scène 17 — Le jugement arrive dans le fil (b16 · 54,80 → 57,56) — ÉCRAN

**Idée.** Le jugement, 2026 : interdiction de recommencer, et 1 000 euros À PAYER au collègue. On retrouve
l'image de la première seconde, et cette fois on la comprend.

**Entrée.** `from: "b16", in: "cut", inDur: 0.36` + **T-NOTIF** : bannière sceau + « Arbeitsgericht
Siegburg » / « Urteil vom 22.05.2026 » / « الحكم ». Barre d'état `22.05.2026`. En-tête « Ärzte-AC ».

**Composition (pixels, défilement 0).**

| élément | position |
|---|---|
| SON message, envoyé (vert), qui dépasse en haut du fil | bulle complète, bas à y 640 : seule L9 (ligne de base y 606) est visible sous le bord du fil ; avatar d'ELLE (832, 686) |
| séparateur `Freitag, 22. Mai 2026` | centre (480, 700) |
| ligne d'expéditeur | « Arbeitsgericht Siegburg » (x 262, y 748) + « 1 Ca 1741/25 » |
| bulle « interdiction » | `D.bulle` blanc (262, 764), 480 × 130, **sans queue** (`tip: null` : deux messages de suite du même expéditeur, seule la dernière bulle porte la queue) ; `D.interdit` (322, 829) ; « … es ab sofort zu unterlassen, … » (`de light` 24 px, x 378, y 818) ; « … insbesondere … wie WhatsApp … » (`de light` 21 px, x 378, y 858) |
| bulle « à payer » | `D.bulle` blanc (262, 918), 480 × 200, pointe (244, 1144) ; surligneur + « 1.000,00 EUR » (`de` 68 px, centre (502, 996)) ; `D.aPayer` (290, 1034) ; « gefordert: 2.000 € » (`de light` 22 px, x 560, y 1066), rayé ; « 78 % der Kosten » (`de light` 22 px, centre (502, 1104)) |
| sceau | (216, 1154), r 30 |
| avatar de LUI (le destinataire) | (806, 1030), r 40 |
| flèche en POINTILLÉ | part de sous l'avatar d'ELLE (832, 722), descend en courbe à droite des bulles, arrive au-dessus de LUI (806, 986) |
| `D.ticketCaisse` | milieu du bord haut (430, 1112) : il sort du bas de la bulle « à payer », jusqu'à y 1278 |

**Chronologie.**

| repère | ce qui change |
|---|---|
| `b16` (54,80) | T-NOTIF ; à `b16+0.35` le séparateur tombe, la ligne d'expéditeur s'écrit, le sceau `pop` |
| `b16@ممنوع` (55,51) | la bulle « interdiction » jaillit ; le panneau claque ; à `b16@ممنوع+0.1` pastille « ab sofort zu unterlassen » / « ممنوع تعاودها » (entre « », taille 26) |
| `b16@و1000` (56,26) | **la bulle « à payer » `slam`** ; `buzz(tel, "b16@و1000+0.25", 10)` ; `punch(tel, "b16@و1000+0.25", 0.05)` ; l'avatar d'ELLE `shock` ; l'horloge se met à tourner ; à `+0.3` « gefordert: 2.000 € » puis son trait de rature (0,2 s) ; à `+0.45` « 78 % der Kosten » |
| `b16@تعويض` (56,88) | pastille jaune « Schadensersatz · 1.000,00 EUR » / « تعويض » (taille 26) ; la flèche en pointillé se trace d'ELLE vers le bas (0,35 s) |
| `b16@ليه` (57,21) | l'avatar de LUI `pop` au bout de la flèche, `calm` ; à `b16@ليه+0.1` le ticket de caisse commence à sortir |

**Ce qui vit.** Semis, balance du sceau, horloge, flèche en pointillé dont les tirets avancent
(`stroke-dashoffset`, 30 px/s), clignements.

**Textes et mentions.** Menton : « laut Urteil » · « حسب الحكم ». La somme est ORDONNÉE : étiquette
« zu zahlen » + horloge ; aucun billet ne se déplace, la flèche est en pointillé et ne « livre » rien. Elle part
de SON avatar à elle : c'est elle qui est condamnée, pas l'hôpital (réponse muette au « من جيبها » de
l'accroche).

---

### Scène 18 — Première instance : définitif ? (b17 · 57,56 → 60,40) — ÉCRAN

**Idée.** Ce jugement est de première instance ; nous n'avons pas trouvé s'il est devenu définitif.

**Entrée.** `from: "b17", in: "cut", inDur: 0` (**coupe**). État de départ = fin de la scène 17.

**Chronologie.**

| repère | ce qui change |
|---|---|
| `b17` (57,56) | le ticket finit de sortir (`sorti` → 1 à `b17+0.4`) : ligne 1 « Wochenende · 549 € » + micro « laut ihrer Nachricht » ; ligne 2 « Nachricht · 1.000 € » (`pop` à `b17+0.35`) ; il se balance (`m.pend` ±2°) |
| `b17+0.25` (57,81) | pastille « erste Instanz » / « حكم ابتدائي » (taille 30) ; le cadran de l'horloge grossit (r 22 → 34, 0,3 s), l'aiguille tourne |
| `b17@لقيناش` (58,79) | la pastille devient « Stand Juli 2026: nicht rechtskräftig » / « يوليوز 2026: مازال ماشي نهائي » (taille 24) ; **la recherche du fil s'ouvre** : de `b17@لقيناش-0.2` à `b17@لقيناش`, le titre de l'en-tête glisse vers le haut et `D.champRecherche` descend à sa place (196 → 854, 360 → 426) ; la requête « rechtskräftig » s'y tape (`c.write`, 0,45 s), le curseur clignote |
| `b17@ولى` (59,41) | au bout du champ, `D.compteRecherche` centre (790, 393) : trois points d'attente rebondissent 0,2 s, puis le compteur « 0 / 0 » `pop` ; le fil défile tout seul de 40 px vers le haut puis revient (il a cherché), rien ne se surligne |
| `b17@نهائي` (59,65) | la pastille devient « Berufung möglich · LAG Köln » / « الاستئناف ممكن » (taille 26) ; `D.pointInterro` `pop` dans le fil, à droite du ticket, centre (700, 1200), et se balance |

**Ce qui vit.** Horloge, ticket qui se balance, curseur et points du champ de recherche, « ? », semis, clignements (ELLE `angry`, LUI `calm`).

**Textes et mentions.** Menton : « laut Gericht » · « حسب المحكمة » (communiqué du 13.07.2026). Le ticket a
DEUX lignes et aucun total (frais de justice et d'avocat non chiffrés dans les sources). La recherche ne
trouve rien (« 0 / 0 ») : jamais un tampon « rechtskräftig », jamais « définitif ». Refait le 26.11.2026 : la
première version (une loupe qui cherche, un cadre de tampon vide en pointillé, un « ? ») était la scène
« définitif ? » d'AKTE 04 et d'AKTE 05 ; ici on cherche comme on cherche dans un téléphone.

---

### Scène 19 — La règle (1) : « krank », et jusqu'à quand (b18 · 60,40 → 62,93) — ÉCRAN

**Idée.** Dans le groupe du travail, on écrit seulement « malade » et jusqu'à quand.

**Entrée.** `from: "b18", in: "cut", inDur: 0.36` + **T-NOTIF** : bannière JAUNE « القاعدة » (`ttl` 40 px,
`jaune: true`). Barre d'état vide. Pas de semis (page de règle, papier uni).

**Composition (pixels).**

| élément | position |
|---|---|
| ruban « القاعدة » | `k.ribbon("القاعدة", 525, 396, { size: 46, style: "yellow", parent })` (dans la zone de l'en-tête) |
| pastille | bande, centre (525, 486) |
| le mauvais exemple | SON message en miniature : `D.bulle` vert (408, 600), 234 × 170, lignes en `D.gribouillis` + deux `D.caviar` ; opacité 0,6 ; croix d'encre 150 × 150 centrée (525, 685) |
| le bon exemple | `D.bulle` blanc (280, 838), 490 × 120, pointe (780, 986) ; `D.avatarToi` (804, 1004), r 30 ; texte « krank bis Montag » (`de` 54 px, ancré à gauche x 318, y 916) ; surligneur sous « krank » ; coche (rond jaune r 22 + ✓) en (770, 838) |
| lignes de la règle | « فالگروپ ديال الخدمة » (`ttl` 46 px, centre (525, 1090)) ; « كتب غير krank، وحتى لإمتى » (`ttl` 46 px, centre (525, 1160)) |

**Chronologie.**

| repère | ce qui change |
|---|---|
| `b18` (60,40) | T-NOTIF ; le ruban se déroule (`wipe`, 0,3 s) ; la miniature du mauvais message est là |
| `b18@فالگروپ+0.3` (60,70) | « فالگروپ ديال الخدمة » ← (0,4 s) |
| `b18@كتب` (60,82) | la ligne 2 commence à se révéler ← (linéaire, jusqu'à `b18@لإمتى+0.3`) ; à `b18@كتب+0.1` la bulle blanche jaillit et « krank » s'y tape (0,3 s) |
| `b18@غير` (61,06) | la croix `slam` sur le mauvais exemple (0,22 s, `buzz` 4) |
| `b18@krank` (61,30) | surligneur sous « krank » ; pastille jaune « krank » / « مريض » (taille 34) ; `punch(tel, "b18@krank", 0.04)` |
| `b18@وحتى` (62,20) | « bis Montag » se tape à la suite (0,35 s) ; à `b18@وحتى+0.1` la pastille devient « krank bis Montag » / « مريض حتى للإثنين » (taille 30) |
| `b18@لإمتى` (62,49) | la coche `pop` ; `D.avatarToi` `pop` |

**Ce qui vit.** Curseur au bout du texte tapé, ruban qui ondule (±1°, 3 s), miniature qui tremble quand la
croix tombe, `D.avatarToi` qui flotte.

**Textes et mentions.** Menton : « § 5 EFZG » · « Keine Rechtsberatung » (deux textes `de` 22 px séparés par un
point médian).

---

### Scène 20 — La règle (2) : le coffre (b19 · 62,93 → 66,59) — ÉCRAN

**Idée.** Un diagnostic — d'un patient ou d'un collègue — est dans un coffre ; la clé, c'est l'accord de la
personne. Elle est à LUI, pas au groupe.

**Entrée.** `from: "b19", in: "cut", inDur: 0` (**coupe**) : le ruban « القاعدة » reste ; le reste de la page
est remplacé.

**Composition (pixels).** Contrôlée sur maquette (`essai_ecran.png`, 4e image).

| élément | position |
|---|---|
| `D.coffre` | centre (525, 776), 360 × 360 (x 345 → 705, y 596 → 956) ; plaque « Gesundheitsdaten » ; sous la molette : « Die Verarbeitung … von … Gesundheitsdaten … » / « ist untersagt. » (`de light` 17 px) + « Art. 9 Abs. 1 DSGVO » (15 px) |
| deux petits crochets (vis au trait) + `D.cle` | clé 1 (jaune, étiquette « Einwilligung ») anneau en (770, 650) ; clé 2 (grise, `picto: "stetho"`) anneau en (812, 760) |
| `D.avatarPatient` · avatar de LUI | (300, 1018), r 46 · (750, 1018), r 46, anneau jaune |
| ligne 1 | « الـdiagnostic ديال مريض ولا زميل » (`ttl` 44 px, centre (525, 1136)) |
| ligne 2 | « ما كيتكتبش بلا الإذن ديالو » (`ttl` 44 px, centre (525, 1196)) |
| ligne 3 | « گروپ فيه الخدمة = ماشي privé » (`ar strong` 32 px, centre (525, 1256)), surligneur dessous |
| petit | « Keine Rechtsberatung » (`de light` 20 px, centre (525, 1340)) |

**Chronologie.**

| repère | ce qui change |
|---|---|
| `b19` (62,93) | le coffre tombe en place, porte OUVERTE (`drop` 200 px, rebond, 0,35 s) ; `D.feuilleDiag` vole de (236, 640) dans le coffre (0,35 s, à `b19+0.2`) ; la ligne 1 commence à se révéler ← (linéaire, jusqu'à `b19@زميل+0.3`) |
| `b19@diagnostic+0.55` (63,48) | la porte se ferme (`ouvert` 1 → 0, 0,3 s) ; la molette tourne (540°, 0,5 s) ; `buzz(tel, "b19@diagnostic+0.85", 5)` ; pastille « Gesundheitsdaten » / « المعطيات الصحية » (taille 30) |
| `b19@مريض` (63,91) | `D.avatarPatient` `pop` |
| `b19@زميل` (64,44) | l'avatar de LUI `pop` |
| `b19@5` (64,72 — le mot « ما ») | la ligne 2 commence à se révéler ← (linéaire, jusqu'à `b19@ديالو+0.3`) |
| `b19@كيتكتبش` (64,92) | une petite bulle de message (60 × 44) vole de (250, 900) vers la porte, **rebondit dessus** et retombe en (300, 880) ; une petite croix `pop` au point d'impact ; le coffre tremble (3 px, 0,2 s) |
| `b19@بلا` (65,34) | les deux clés tombent sur leurs crochets et se balancent (`m.pend` ±16°) ; la pastille devient « ohne seine Einwilligung » / « بلا الإذن ديالو » (entre « », jaune, taille 28) |
| `b19@الإذن` (65,58) | la clé jaune se décroche et vole en arc vers l'avatar de LUI (0,45 s) : elle devient son `badge: "cle"` ; à `+0.15` la même clé `pop` sur `D.avatarPatient` ; `punch(tel, "b19@الإذن+0.45", 0.04)` |
| `b19@ديالو` (65,91) | la ligne 3 ← (0,4 s) + surligneur ; « Keine Rechtsberatung » en fondu |

**Ce qui vit.** Clé grise qui oscille (±2°), avatars qui flottent, molette qui frémit, ruban.

**Textes et mentions.** Menton : « DSGVO Art. 9 » · « قانون حماية المعطيات ». Deux clés sont DESSINÉES (celles
que le tribunal a examinées) ; aucun texte ne dit « nur » ni « seulement deux ». La règle complète tient sur
les scènes 19 et 20 : chacune finit sur une image lisible à capturer.

---

### Scène 21 — Le message dans le jugement (b20 · 66,59 → 69,20) — PAPIER

**Idée.** Un message s'écrit en une minute ; celui-ci est resté écrit — dans un jugement, au paragraphe 8.

**Entrée.** `from: "b20", in: "cut", inDur: 0, view: false`. Le téléphone (fantôme dans `c.cam`, écran avec
SON message vert) rétrécit et se range à gauche : centre (300, 900), échelle 0,5, rotation −6°, 0,45 s
(il occupe alors x 112 → 488, y 610 → 1190).

**Composition (pixels ; caméra neutre, aucun zoom).**

| élément | position |
|---|---|
| `D.chrono` | centre (190, 520), r 54 ; mot « دقيقة » (`ttl` 40 px, centre (330, 536)) |
| `D.pageJugement` | centre (690, 880), 350 × 500 (x 515 → 865, y 630 → 1130), inclinée de 2° ; en-tête : « Arbeitsgericht Siegburg » (`de` 22 px, y 676) · « Urteil vom 22.05.2026 » (17 px, y 702) · « 1 Ca 1741/25 » (17 px, y 724) ; numéros de marge à x 538 : « 6 » (y 770), « 7 » (y 826), **« 8 » (y 900)**, « 9 » (y 1040) ; emplacement du § 8 : x 560 → 850, y 866 → 986 |
| la bulle qui voyage | `D.bulle` vert, 290 × 110, contenu : deux `D.gribouillis`, une ligne de caviar, et « … Vielleicht sitzt aber ein Pups quer. » (`de light` 17 px, sur deux lignes) ; départ sur l'écran du petit téléphone (300, 1000), échelle 0,55 ; arrivée centre (705, 926), échelle 1 |

Fond : `k.bg()` + `m.shapes({ seed: 21, pts: [[110, 1300], [960, 420], [950, 1240], [420, 1380]] })`.

**Chronologie.**

| repère | ce qui change |
|---|---|
| `b20` (66,59) | le téléphone rétrécit vers la gauche ; à `b20+0.1` la page et ses deux feuilles tombent (`drop` 260 px, 0,45 s) |
| `b20@كيتكتب` (67,01) | le chronomètre `pop` ; sa couronne s'enfonce ; **l'aiguille fait un tour** (jusqu'à `b20@كيتكتب+0.74`) ; sur le petit écran, la bulle se remplit de lignes (1 → 5 en 0,6 s) |
| `b20@فدقيقة` (67,39) | « دقيقة » ← (0,25 s) |
| `b20@وهادا` (67,77) | **la bulle quitte le téléphone** : elle se soulève (×1,2), vole en arc par (480, 700) jusqu'à l'emplacement du § 8 (0,5 s, `E.inOut`) ; l'écran du téléphone reste vide |
| `b20@بقى` (68,10) | elle se pose : sa hachure verte s'efface (0,3 s), son contour aussi ; il reste le texte, devenu un paragraphe ; la page `pulse` (4 %) |
| `b20@مكتوب` (68,34) | un cercle jaune à main levée se trace autour du « 8 » (0,25 s) ; pastille jaune « im Urteil zitiert · Rn. 8 » / « مكتوب فالحكم » (taille 28) |
| `b20@فالحكم` (68,67) | le trombone brille (petit trait blanc qui glisse) ; tout se pose |

**Ce qui vit.** Page qui flotte (±3 px, 3,2 s), formes qui dérivent, aiguille du chronomètre qui tremble une
fois le tour fini, petit téléphone qui penche (±1°).

**Caméra.** `[{ at: "b20", s: 1, cx: 540, cy: 960 }]` : fixe (dernière image, on laisse lire).

**Textes et mentions.** Étiquette : « laut Urteil » · « حسب الحكم ». Puis `st.flash("b20@end+0.15", 0.35, 0.85)`.

---

### Scène 22 — L'affiche-résumé (`b20@end+0.15` → fin)

`st.summary({ at: "b20@end+0.15", in: "cut", dezoomAt: "b20@end+0.5", cols: 5, crop: [262, 1470], top: 372,
gap: 10, side: 92, freezeAt })` — socle inchangé pour le reste.

- **20 cases** (les 21 scènes de récit moins l'intro), **5 colonnes × 4 rangées**, lecture de droite à gauche.
  Case : 163 × 183 px ; grille de y 372 à 1134.
- `freezeAt` (indice de case → repère) : `{ 7: "b8@المستعجلات", 8: "b10@end-0.5", 12: "b13@خلا+0.7" }` — la
  scène 9 avec la carte « source », la scène 10 avec la loupe et sa traduction, la scène 14 avec LUI qui
  marche. Les autres cases se figent à leur fin.
- **En-tête** (`below`) : ruban « AKTE 07 · الگروپ » (`k.ribbon`, (540, 312), taille 36, largeur 470) ; pastille
  « @dr.aguilo » (180, 312, taille 20) ; pastille jaune « AKTE 08 · قريبا » (885, 312, taille 18). Tout entre
  x 90 et 990.
- **Carte « commentaire »** (`above`) : `k.card(110, 1160, 760, 290)`, pop à `b20@end+2.7`.
  Question ÉCRITE (jamais dite), sur deux lignes : « الگروپ ديال الخدمة ديالكم: » (`ttl` 46 px, centre
  (490, 1236)) et « privé ولا خدمة؟ » (`ttl` 52 px, centre (490, 1302)), ← à `b20@end+2.8` ;
  « كتب ليا فالكومنتير » (`ar strong` 40 px, centre (490, 1392)) ← à `b20@end+3.2` ; flèche à main levée
  `M800 1392 C 870 1392, 905 1360, 916 1300` + pointe, tracée à `b20@end+3.4` (elle vise le bouton
  « commentaire » d'Instagram).
- Le dézoom part de la 20e case (la page du jugement) et recule en 2,2 s.

---

## 5. Les scènes imposées, dans la forme propre à cet épisode

| figure | où | forme ici | ce qui est interdit ici |
|---|---|---|---|
| **Accroche** (sanction chiffrée dans la 1re seconde) | scènes 1–3 | la somme TOMBE dans le fil comme une réponse (`slam` + vibreur) à 0,95 s ; puis elle, le ticket de caisse qui sort de sa poche ; puis « pas un patient : un collègue » | « bezahlt », une coche, des billets qui volent, le mot « amende » |
| **Intro Yassine** | scène 4 | sa fiche « contact » dans le téléphone : photo dans un cadre au trait + anneau jaune + icône Instagram, « Yassine », « @dr.aguilo », cœur et bouton animés sur `i3@j'aime` et `i3@abonne`, logo du haut masqué, bloc fini à y 1272, `summary: false` | « Dr. », un bloc qui descend sous y 1300 |
| **Explication juridique en image** | scènes 15–16 (pourquoi « privé » ne tient pas : le camembert) et 20 (le coffre et ses clés) | deux objets concrets : une part de 30 % qui devient jaune et sort du disque ; un coffre qui se ferme, une clé qui va à son propriétaire | un schéma nu, « § 203 », « Schweigepflicht », « nur » |
| **Carte** | scène 13 | l'application « Plans » : contour de l'Allemagne du socle, Berlin en repère, épingle jaune sur Siegburg, légende « المحكمة » | une épingle « hôpital », un trajet, une autre ville |
| **Scène muette du décès** | — | aucune : personne ne meurt. Le seul arrêt est le silence du fil (scène 11) : tout s'immobilise 1,3 s | moniteur, bip, grayscale, ange |
| **Tribunal** | scènes 15–16 | appel vidéo à deux tuiles, une présidente en robe et deux assesseurs en civil derrière une table ; liseré jaune sur celui qui parle | marteau, boiseries d'AKTE 03, balance d'AKTE 04, robe pour les assesseurs, bulle de la juge |
| **Sanction** | scènes 17–18 | une demande de paiement dans le fil (« zu zahlen » + horloge), l'interdiction (panneau), un ticket de deux lignes sans total, une recherche dans le fil qui ne trouve rien (« 0 / 0 ») pour « définitif ? » | icônes de peine d'AKTE 02, argent qui change de main, tampon (plein ou vide), loupe |
| **Règle** | scènes 19–20 | deux pages de règle sous le ruban « القاعدة » : le bon message (« krank bis Montag ») à côté du mauvais barré ; le coffre | une carte finale unique (trop dense pour l'écran du téléphone) |
| **Affiche-résumé** | scène 22 | 20 cases, 5 colonnes, question écrite sur deux lignes, teaser « AKTE 08 · قريبا » | question dite à voix haute |

---

## 6. Repères utilisés

Contrôle fait par script le 26.11.2026 (copie exacte de `parseCue` de `engine/runtime.js` et de `Stage.T`) sur ce
document et sur `son/plan_son.md` : **217 repères distincts, 125 repères de base, 0 erreur.**
À refaire après le montage de la voix : `node tools/cuetimes.mjs videos/akte-siegburg-whatsapp/index.html …`.

### 6.1 Comment le moteur lit un repère (à connaître avant d'en écrire un)

- `bN` = début du beat ; `bN@end` = sa fin ; `bN@mot` = début du PREMIER mot du beat qui CONTIENT `mot`
  (après avoir retiré la ponctuation, le tatweel « ـ » et les voyelles brèves) ; `+0.3` / `-0.1` s'ajoutent.
- **Un repère fait seulement de chiffres est un INDICE de mot, pas un mot** (le premier mot a l'indice 0).
  Donc : `b7@549` et `b1@1000` plantent (« pas de mot n° 549 ») ; `b4@9` ne plante pas mais vise le 10e mot
  (« وحتى ») au lieu de « 9 » ; `b16@2026` plante. Écrire : `b1@بـ1000`, `b16@و1000`, `b16@فـ2026`, `b14@70%`,
  `b15@و30%` (un signe ou une lettre suffit), et pour les nombres seuls l'indice : `b7@1` (« 549 »), `b4@3` (« 9 »).
- **Le premier mot qui contient** : dans b3, `b3@كتبات` tombe sur « كتباتش » (2e mot), pas sur le « كتبات » de la
  2e phrase → `b3@4`. Dans b19, « ما » est visé par `b19@5`. Dans b2, `b2@المحكمة` tomberait bien sur
  « والمحكمة » (un seul mot le contient), mais ce document écrit le mot entier : `b2@والمحكمة`.

### 6.2 Tous les repères de base (les décalages sont dans la dernière colonne)

| repère de base | instant provisoire | mot visé | décalages utilisés |
|---|---|---|---|
| **b1** | 0,15 → 2,74 | المحكمة جاوبات بـ1000 أورو على ميساج فـWhatsApp. | |
| `b1@جاوبات` | 0,57 | « جاوبات » (n° 1) | — |
| `b1@بـ1000` | 0,95 | « بـ1000 » (n° 2) | +0,25 |
| `b1@أورو` | 1,33 | « أورو » (n° 3) | — |
| `b1@ميساج` | 1,85 | « ميساج » (n° 5) | — |
| `b1@فـWhatsApp` | 2,18 | « فـWhatsApp. » (n° 6) | — |
| **b2** | 2,85 → 6,07 | كتباتو طبيبة فألمانيا، والمحكمة حكمات عليها تخلصهم من جيبها. | |
| `b2` | 2,85 | début du beat | +0,1 · +0,42 |
| `b2@طبيبة` | 3,23 | « طبيبة » (n° 1) | — |
| `b2@والمحكمة` | 4,03 | « والمحكمة » (n° 3) | -0,05 |
| `b2@حكمات` | 4,50 | « حكمات » (n° 4) | +0,15 |
| `b2@تخلصهم` | 5,16 | « تخلصهم » (n° 6) | — |
| `b2@جيبها` | 5,73 | « جيبها. » (n° 8) | — |
| **b3** | 6,17 → 8,55 | وما كتباتش على مريض. كتبات على زميل ديالها. | |
| `b3` | 6,17 | début du beat | — |
| `b3@كتباتش` | 6,41 | « كتباتش » (n° 1) | — |
| `b3@مريض` | 7,03 | « مريض. » (n° 3) | +0,12 |
| `b3@4` | 7,32 | **indice** : mot n° 4 = « كتبات » | — |
| `b3@زميل` | 7,89 | « زميل » (n° 6) | +0,15 · +0,3 |
| **i1** | 8,97 → 10,29 | أنا ياسين، طبيب فألمانيا. | |
| `i1` | 8,97 | début du beat | -0,1 |
| `i1@ياسين` | 9,21 | « ياسين، » (n° 1) | +0,15 |
| `i1@فألمانيا` | 9,82 | « فألمانيا. » (n° 3) | — |
| **i2** | 10,40 → 14,38 | فهاد السلسلة كنحكي ليكم قصص حقيقية من المحاكم الألمانية، باش نتعلمو منها. | |
| `i2@حقيقية` | 11,97 | « حقيقية » (n° 5) | +0,15 |
| **i3** | 14,49 → 17,72 | إلا عجباتك، دير j'aime و abonne، باش ما تفوتكش القصة الجاية. | |
| `i3` | 14,49 | début du beat | +0,1 |
| `i3@j'aime` | 15,34 | « j'aime » (n° 3) | — |
| `i3@abonne` | 15,82 | « abonne، » (n° 5) | — |
| **b4** | 18,14 → 21,87 | گروپ ديال الجراحة، 9 ديال الأطباء: les gardes، الكونجيات، وحتى الكادوات. | |
| `b4` | 18,14 | début du beat | -0,1 · +0,3 |
| `b4@الجراحة` | 18,71 | « الجراحة، » (n° 2) | — |
| `b4@3` | 19,13 | **indice** : mot n° 3 = « 9 » | +0,1 |
| `b4@les` | 19,99 | « les » (n° 6) | — |
| `b4@الكونجيات` | 20,60 | « الكونجيات، » (n° 8) | — |
| `b4@الكادوات` | 21,40 | « الكادوات. » (n° 10) | — |
| **b5** | 21,98 → 25,72 | الخميس، واحد فيهم مشى للمستعجلات ديال سبيطارهم، وكتب فالگروپ بلي مريض. | |
| `b5` | 21,98 | début du beat | +0,1 · +0,3 · +1,1 |
| `b5@مشى` | 22,93 | « مشى » (n° 3) | — |
| `b5@للمستعجلات` | 23,17 | « للمستعجلات » (n° 4) | — |
| `b5@سبيطارهم` | 24,02 | « سبيطارهم، » (n° 6) | — |
| `b5@وكتب` | 24,48 | « وكتب » (n° 7) | -0,1 |
| `b5@بلي` | 25,19 | « بلي » (n° 9) | — |
| **b6** | 26,02 → 28,72 | السبت، زميلتو كتبات حتى هي: خديت les gardes ديالو، | |
| `b6` | 26,02 | début du beat | +0,1 · +0,35 · +1,0 |
| `b6@زميلتو` | 26,35 | « زميلتو » (n° 1) | +0,25 |
| `b6@كتبات` | 26,73 | « كتبات » (n° 2) | — |
| `b6@حتى` | 27,06 | « حتى » (n° 3) | — |
| `b6@خديت` | 27,49 | « خديت » (n° 5) | -0,1 · +0,1 · +0,12 · +0,2 |
| `b6@gardes` | 28,01 | « gardes » (n° 7) | +0,15 |
| **b7** | 28,83 → 30,87 | وخلصت 549 أورو على ويكاند، ومشى فيها. | |
| `b7` | 28,83 | début du beat | +0,25 |
| `b7@1` | 29,16 | **indice** : mot n° 1 = « 549 » | +0,05 · +0,3 |
| `b7@أورو` | 29,40 | « أورو » (n° 2) | — |
| `b7@ومشى` | 30,30 | « ومشى » (n° 5) | +0,15 · +0,35 |
| **b8** | 30,98 → 35,09 | وفنفس الميساج، كتبات les diagnostics ديالو: عاوداتهم ليها زميلة من المستعجلات. | |
| `b8` | 30,98 | début du beat | — |
| `b8@كتبات` | 31,74 | « كتبات » (n° 2) | — |
| `b8@diagnostics` | 32,31 | « diagnostics » (n° 4) | +0,3 |
| `b8@ديالو` | 32,92 | « ديالو: » (n° 5) | — |
| `b8@عاوداتهم` | 33,25 | « عاوداتهم » (n° 6) | — |
| `b8@ليها` | 33,72 | « ليها » (n° 7) | +0,1 · +0,7 |
| `b8@زميلة` | 34,00 | « زميلة » (n° 8) | — |
| `b8@المستعجلات` | 34,53 | « المستعجلات. » (n° 10) | +0,2 · +0,45 |
| **b9** | 35,20 → 37,52 | وزادت: Vielleicht sitzt aber ein Pups quer. | |
| `b9` | 35,20 | début du beat | — |
| `b9@Vielleicht` | 35,53 | « Vielleicht » (n° 1) | -0,12 |
| `b9@sitzt` | 36,09 | « sitzt » (n° 2) | — |
| `b9@aber` | 36,42 | « aber » (n° 3) | — |
| `b9@ein` | 36,71 | « ein » (n° 4) | — |
| `b9@Pups` | 36,95 | « Pups » (n° 5) | — |
| `b9@quer` | 37,23 | « quer. » (n° 6) | — |
| **b10** | 37,63 → 39,71 | [FR] Autrement dit, juste un gaz coincé. | |
| `b10` | 37,63 | début du beat | +0,15 · +0,9 |
| `b10@end` | 39,71 | fin du beat | -0,5 · -0,35 · -0,05 · +0,2 · +0,3 · +0,95 |
| **b11** | 41,02 → 43,49 | فالصيف، الطبيب طلب منها تكتب بلي ما تعاودهاش. | |
| `b11` | 41,02 | début du beat | +0,08 · +0,12 · +0,2 |
| `b11@الطبيب` | 41,40 | « الطبيب » (n° 1) | — |
| `b11@طلب` | 41,78 | « طلب » (n° 2) | +0,3 |
| `b11@تكتب` | 42,30 | « تكتب » (n° 4) | — |
| `b11@تعاودهاش` | 43,02 | « تعاودهاش. » (n° 7) | — |
| **b12** | 43,60 → 47,09 | ما كتباتش. فمشى لـArbeitsgericht، يعني محكمة الشغل، فمدينة Siegburg. | |
| `b12` | 43,60 | début du beat | -0,05 |
| `b12@كتباتش` | 43,79 | « كتباتش. » (n° 1) | +0,15 |
| `b12@فمشى` | 44,17 | « فمشى » (n° 2) | +0,3 |
| `b12@Arbeitsgericht` | 44,45 | « لـArbeitsgericht، » (n° 3) — partie du mot | — |
| `b12@يعني` | 45,29 | « يعني » (n° 4) | — |
| `b12@فمدينة` | 46,24 | « فمدينة » (n° 7) | — |
| `b12@Siegburg` | 46,62 | « Siegburg. » (n° 8) | +0,25 · +0,3 · +0,35 |
| **b13** | 47,20 → 49,75 | وما بقاش فالگروپ. وفآخر العام، خلا حتى السبيطار. | |
| `b13` | 47,20 | début du beat | +0,1 · +0,3 · +0,55 |
| `b13@وفآخر` | 48,14 | « وفآخر » (n° 3) | +0,15 · +0,4 |
| `b13@خلا` | 48,81 | « خلا » (n° 5) | +0,5 · +0,6 · +0,7 · +1,15 · +1,25 |
| `b13@السبيطار` | 49,28 | « السبيطار. » (n° 7) | — |
| **b14** | 50,17 → 52,26 | قدام المحكمة، هي قالت: الگروپ 70% privé. | |
| `b14` | 50,17 | début du beat | +0,2 · +0,4 · +0,5 |
| `b14@هي` | 50,88 | « هي » (n° 2) | — |
| `b14@الگروپ` | 51,36 | « الگروپ » (n° 4) | — |
| `b14@70%` | 51,74 | « 70% » (n° 5) | +0,1 |
| `b14@privé` | 51,93 | « privé. » (n° 6) | — |
| `b14@end` | 52,26 | fin du beat | — |
| **b15** | 52,37 → 54,69 | المحكمة جاوباتها: و30% خدمة. يعني ماشي privé. | |
| `b15` | 52,37 | début du beat | — |
| `b15@جاوباتها` | 52,80 | « جاوباتها: » (n° 1) | — |
| `b15@و30%` | 53,26 | « و30% » (n° 2) | — |
| `b15@خدمة` | 53,50 | « خدمة. » (n° 3) | — |
| `b15@يعني` | 53,79 | « يعني » (n° 4) | — |
| `b15@ماشي` | 54,07 | « ماشي » (n° 5) | — |
| `b15@privé` | 54,36 | « privé. » (n° 6) | — |
| `b15@end` | 54,69 | fin du beat | — |
| **b16** | 54,80 → 57,45 | الحكم فـ2026: ممنوع تعاودها، و1000 أورو تعويض ليه. | |
| `b16` | 54,80 | début du beat | +0,35 |
| `b16@ممنوع` | 55,51 | « ممنوع » (n° 2) | +0,1 |
| `b16@و1000` | 56,26 | « و1000 » (n° 4) | +0,25 |
| `b16@تعويض` | 56,88 | « تعويض » (n° 6) | — |
| `b16@ليه` | 57,21 | « ليه. » (n° 7) | +0,1 |
| **b17** | 57,56 → 59,98 | وهاد الحكم ابتدائي: ما لقيناش واش ولى نهائي. | |
| `b17` | 57,56 | début du beat | +0,25 · +0,35 · +0,4 |
| `b17@لقيناش` | 58,79 | « لقيناش » (n° 4) | -0,2 |
| `b17@ولى` | 59,41 | « ولى » (n° 6) | — |
| `b17@نهائي` | 59,65 | « نهائي. » (n° 7) | — |
| **b18** | 60,40 → 62,82 | فالگروپ، كتب غير krank، يعني مريض، وحتى لإمتى. | |
| `b18` | 60,40 | début du beat | — |
| `b18@فالگروپ` | 60,40 | « فالگروپ، » (n° 0) | +0,3 |
| `b18@كتب` | 60,82 | « كتب » (n° 1) | +0,1 |
| `b18@غير` | 61,06 | « غير » (n° 2) | — |
| `b18@krank` | 61,30 | « krank، » (n° 3) | — |
| `b18@وحتى` | 62,20 | « وحتى » (n° 6) | +0,1 |
| `b18@لإمتى` | 62,49 | « لإمتى. » (n° 7) | +0,3 |
| **b19** | 62,93 → 66,24 | الـdiagnostic ديال مريض ولا زميل ما كيتكتبش بلا الإذن ديالو. | |
| `b19` | 62,93 | début du beat | +0,2 |
| `b19@diagnostic` | 62,93 | « الـdiagnostic » (n° 0) — partie du mot | +0,55 · +0,85 |
| `b19@مريض` | 63,91 | « مريض » (n° 2) | — |
| `b19@زميل` | 64,44 | « زميل » (n° 4) | +0,3 |
| `b19@5` | 64,72 | **indice** : mot n° 5 = « ما » | — |
| `b19@كيتكتبش` | 64,92 | « كيتكتبش » (n° 6) | — |
| `b19@بلا` | 65,34 | « بلا » (n° 7) | — |
| `b19@الإذن` | 65,58 | « الإذن » (n° 8) | +0,45 |
| `b19@ديالو` | 65,91 | « ديالو. » (n° 9) | +0,3 |
| **b20** | 66,59 → 69,05 | الميساج كيتكتب فدقيقة… وهادا بقى مكتوب فالحكم. | |
| `b20` | 66,59 | début du beat | +0,1 |
| `b20@كيتكتب` | 67,01 | « كيتكتب » (n° 1) | +0,74 |
| `b20@فدقيقة` | 67,39 | « فدقيقة… » (n° 2) | — |
| `b20@وهادا` | 67,77 | « وهادا » (n° 3) | — |
| `b20@بقى` | 68,10 | « بقى » (n° 4) | — |
| `b20@مكتوب` | 68,34 | « مكتوب » (n° 5) | — |
| `b20@فالحكم` | 68,67 | « فالحكم. » (n° 6) | — |
| `b20@end` | 69,05 | fin du beat | +0,15 · +0,5 · +2,7 · +2,8 · +3,2 · +3,4 |

### 6.3 Repères fragiles (à revérifier dès que la voix est montée)

| repère | pourquoi il peut casser | solution de repli |
|---|---|---|
| tout mot de **b10** | b10 est une phrase [FR] que l'auteur dira en darija avec ses mots : ses mots n'existent pas encore | aucun repère sur un mot de b10 dans ce document : seulement `b10`, `b10+0.15`, `b10+0.9`, `b10@end-0.5`, `b10@end-0.35`, `b10@end-0.05`, `b10@end` ; si b10 dure moins de 1,6 s, ramener `b10+0.9` à `b10+0.6` |
| `b3@4`, `b4@3`, `b7@1`, `b19@5` | indices : ils se décalent si l'auteur ajoute ou retire un mot AVANT (ex. « 549 أورو » dit « خمسمية وتسعة وربعين أورو » compte pour plusieurs mots) | après le montage, relire `beats.js` et corriger l'indice ; garde-fou à mettre dans `story.js` : `console.assert(sv.cue("b7@1") < sv.cue("b7@أورو"))` |
| `b1@جاوبات`, `b15@جاوباتها` | l'auteur peut dire « ردات » | `b1@1`, `b15@1` |
| `b1@ميساج` | ou « message » | `b1@5` |
| `b3@زميل`, `b19@زميل`, `b6@زميلتو`, `b8@زميلة` | ou « collègue » | `b3@6`, `b19@4`, `b6@1`, `b8@8` |
| `b4@الكونجيات`, `b4@الكادوات` | ou « les congés », « les cadeaux » (deux mots chacun : tous les indices suivants bougent) ; « وحتى الكادوات » fait partie des coupes possibles | `b4@gardes+0.4` et `b4@end-0.45` ; si « الكادوات » est coupé à l'oral, la bulle du cadeau reste (elle est sourcée) sur `b4@end-0.45` |
| `b5@للمستعجلات`, `b8@المستعجلات` | ou « les urgences » | `b5@مشى+0.25`, `b8@end-0.55` |
| `b6@خديت` | version à la 3e personne proposée dans le scénario : « خدات » | `b6@les-0.28` |
| `b6@حتى` | « حتى هي » fait partie des coupes possibles | `b6@كتبات+0.33` |
| `b7@ومشى` | l'auteur peut le dire autrement (« وضاع ») | `b7@end-0.55` |
| `b8@diagnostics` | ou « التشخيصات » | `b8@4` |
| `b8@عاوداتهم` | ou « قالتهم » | `b8@6` |
| `b13@خلا` | ou « بدل » | `b13@5` |
| `b14@الگروپ`, `b18@فالگروپ` | ou « le groupe » (deux mots) | `b14@قالت+0.28`, `b18` |
| `b16@تعويض` | ou « dédommagement » | `b16@6` |
| `b19@الإذن` | ou « بلا ما يوافق » | `b19@بلا+0.24` |
| `b18@كتب` | « ما تكتب غير krank » : le repère marche encore (« تكتب » contient « كتب ») | — |
| scène 11 entière | l'auteur peut ramener le silence de 1,2 s à 0,8 s | tout y est relatif à `b10@end` ; si `T("b11") − T("b10@end") < 1.1`, espacer les sept avatars de 0,06 s au lieu de 0,09 |
| `i1…`, `i2…`, `i3…` | l'intro est réutilisée d'AKTE 03 : mêmes mots | aucun risque |

---

## 7. Risques et solutions

**R1 — La transition T-NOTIF demande de « voir à travers » la nouvelle scène.** `stage.js` empile la scène
entrante AU-DESSUS de la sortante ; pour que l'ancienne page reste visible pendant que la nouvelle se déroule,
la scène entrante ne doit rien peindre d'opaque sur l'écran du téléphone : papier TROUÉ (`fill-rule: evenodd`),
coque en anneau, page découpée par un rectangle dont on anime la hauteur (`decoupe`), et PAS de `k.bg()`.
Contrôle : planche image par image de `b4-0.05` à `b4+0.5`, pas 0,05. **Plan B** si le trou pose un problème
(affiche-résumé, performance) : `in: "cut", inDur: 0`, page pleine, et c'est un store de papier opaque portant
la bannière qui descend sur l'ANCIENNE scène pendant ses 0,26 dernières secondes (`bN-0.26`), la nouvelle page
se construisant ensuite en cascade. Moins beau, sans risque.

**R2 — Tout est dans `c.hud`.** Oublier de re-parenter un nœud de `Motion` le laisse SOUS le téléphone
(invisible). `c.kick` / `c.shake` / `c.camera` ne font rien : `punch` / `buzz`. Les nœuds créés par
`Node.slam` appellent `scene.shake` : sans effet ici, il faut ajouter le `buzz` à la main (c'est fait dans les
tableaux). `Node.pop`, `pulse`, `scaleTo` prennent pour pivot le centre de la boîte englobante : pour une bulle,
donner le pivot explicitement (`s.px`, `s.py` = la pointe).

**R3 — Découpe et défilement.** `Node.wipe` utilise un `inset()` CSS mesuré sur la boîte englobante du groupe :
correct pour un texte ou une barre, FAUX pour un groupe dont le contenu déborde (le fil). Règle : `wipe`
seulement sur des éléments simples ; tout le reste par `clipPath` + rectangle animé. Les identifiants de
`clipPath` doivent être uniques par scène (`"pg" + numéro`).

**R4 — Les repères à chiffres.** Voir § 6.1 : `b7@549` plante, `b4@9` vise le mauvais mot sans rien dire.

**R5 — b10 n'est pas encore écrit.** La traduction affichée dans la loupe est une constante `TRAD_B10`
provisoire ; sa longueur changera (prévoir 46 px jusqu'à 26 signes, 40 px au-delà, jamais moins : sinon deux
lignes et la loupe passe à 230 px de haut, elle reste au-dessus de la bulle seulement si `n ≤ 8` → dans ce cas
remonter la loupe de 40 px, la bande des pastilles étant vide à ce moment-là).

**R6 — Mots que l'auteur peut changer.** Voir § 6.3 ; aucun repère de ce document ne dépend de « ابتدائي ».

**R7 — Bras Persona (essayés, `essai_poses.png`).** En trois-quarts, `reachL` / `reachR` vers un téléphone
tenu devant la poitrine donnent des coudes levés et des avant-bras croisés (les quatre combinaisons de
`bend` ont été essayées : toutes mauvaises). Solution retenue : corps DE FACE et angles directs
(`armL: [-20, 105]`, `armR: [20, -105]`), propres pour ELLE comme pour LUI. Poings sur les hanches :
`[-48, 84]` / `[48, -84]` (à ±60 / 120 les poings se rejoignent sur la poitrine). Un bras mesure 112 px à
l'échelle 1 : ELLE ne peut PAS toucher le tableau des gardes (à 190 px de son épaule) → les aimants bougent
seuls, elle reste sur son téléphone.

**R8 — Assis dans le canapé.** Pas de pose assise de face dans Persona (`sitEdge` est de profil). Solution
(essayée, `essai_pieces.png`) : la technique du lit vu de face — personnage debout de face, pieds à y 1276,
caché à partir des hanches par `D.canapeDevant` (assise + plaid). Le canapé, LUI et le devant montent ensemble
à la construction (un seul groupe, sinon il « flotte » 0,3 s).

**R9 — Sa tête touchait le tableau des gardes.** À l'échelle 1,08 et pieds à y 1300, ses cheveux touchaient
le bas du tableau (essai). Corrigé : échelle 1,04, pieds à y 1320, tableau de y 540 à 806 (60 px d'air).
Le plan de travail s'arrête à x 866 (à 880 il touchait la colonne des boutons en fin de scène).

**R10 — Avatars de 60 px.** Rendus pour essai (`essai_cast.png`, à r 34 et r 62) : lisibles et distincts ; à
r 30 les lunettes de K2, K5 et K6 deviennent très fines (passer `lw: 1.2` à `Persona.head` si elles s'effacent). Deux
précautions : ne redessiner un avatar que si son état change (clignement en deux états, `expr`, `look2`
arrondi à 0,5) ; décaler les clignements (`blinkAt(t, 3 + i)`) — neuf avatars qui clignent ensemble font un
flash. En scène 5, les neuf `c.sk` + trois icônes animées : vérifier la fluidité du rendu.

**R11 — La teinte verte.** Mesurée sur la maquette de la bulle de 9 lignes : 2,3 % de pixels nettement verts
avec `VERT` (hachure seule). Ne PAS donner un fond vert plein à la bulle (elle couvrirait 12 % de l'image). À
remesurer sur la vraie scène 11 (script : compter les pixels où `g − r > 14` et `g − b > 14`) : rester ≤ 5 %.

**R12 — Zones Instagram.** Le téléphone va jusqu'à x 906 (bouton de marche) : c'est du décor, pas du contenu ;
dans le fil rien à droite de x 866 ; rien d'important sous y 1300 dans l'intro (bloc fini à 1272) ; dans les
pièces, rien d'important à droite de x 880 (monde) sous y 950 (monde). L'avatar d'ELLE dans le fil (x 800 →
864) passe à 50 px de la colonne des boutons quand il est sous y 980 : accepté, contrôlé sur maquette.

**R13 — Le sous-titre et le bas du téléphone.** Le sous-titre commence vers y 1490 et son scotch vers 1470 ;
le téléphone finit à 1440. Si un mot latin du sous-titre recevait une traduction dessous (glossaire), le
sous-titre monterait à ≈ 1443 et son scotch à ≈ 1423, SUR le menton. Donc `glossaire-episode.js` ne déclare
AUCUN mot dit à voix haute (annexe A) : la voix les explique elle-même (« يعني محكمة الشغل », « يعني مريض »).

**R14 — L'affiche-résumé et les scènes ÉCRAN.** Chaque case recopie `cam.innerHTML + hud.innerHTML` à
l'instant du gel : les `clipPath` vivent dans `st.defs` et restent valables ; les rectangles animés gardent
leur valeur du gel tant que la scène n'est plus mise à jour (c'est le cas). Vérifier sur une capture de
l'affiche : aucune case vide, aucune page à moitié déroulée (le gel a lieu à la FIN de chaque scène, découpe
pleine). Les cases des scènes 9, 10 et 14 utilisent `freezeAt`.

**R15 — Petits textes allemands.** Les lignes du message font 26 px : lisibles sur téléphone, mais ce ne
sont pas elles qui portent le sens — ce sont les pastilles (arabe ≥ 26 px gras) et la voix. Les textes de 17 px
(loi sur le coffre, numéro du dossier) sont de la texture : rien d'indispensable n'est écrit à moins de 22 px.

**R16 — Le silence est « figé ».** `tools/mouvement.mjs` signalera la scène 11 (et l'intro, calme par
nature) : attendu. Toutes les autres scènes doivent passer le seuil (≥ 5 % de pixels en 0,4 s) : dans les
scènes de fil le semis qui remonte y suffit presque à lui seul.

**R17 — Vérité (liste fermée).** Aucune réaction de collègue, aucune coche, aucun « lu », aucun « message
supprimé » ; diagnostics jamais lisibles ; aucune heure d'envoi ; la ligne « … hat die Gruppe verlassen »
sans date et pas pendant le silence ; l'hôpital jamais situé (l'épingle est le tribunal) ; l'argent ordonné,
pas payé ; la recherche « rechtskräftig » sans résultat (« 0 / 0 »), jamais un tampon ; la collègue des urgences sans visage, sans métier, sans appareil ;
l'appel vidéo étiqueté « Rekonstruktion » ; la juge sans réplique inventée. **À faire décider par l'auteur :**
afficher « … im Arsch … » tel quel (c'est le jugement) ou `GROS_MOT = false`.

**R18 — Elle n'est pas une caricature.** Risque de la comédie : la rendre odieuse, ou rire de LUI. Garde-fous :
jamais de `bigsmile` pour elle ; son seul sourire est petit (b9) ; LUI n'est jamais ridicule (pas de symptôme,
pas de gag sur lui) ; son départ est une scène calme, sans elle.

**R19 — Le tribunal « répond dans le groupe ».** C'est la métaphore du texte (« المحكمة جاوبات ») : la bulle
porte « laut Urteil » et le menton le statut. Ne pas ajouter le tribunal à la rangée des neuf membres.

**R20 — La carte.** Siegburg = `geo(7.21, 50.80)`. Vérifier que l'épingle est bien à l'OUEST, près du coude
du contour (Rhénanie) ; à ×1,2 la carte déborde sous la fiche du lieu : normal (elle est découpée).

**R21 — La photo de l'auteur.** `assets/portrait.png` n'existe pas encore dans ce dossier : la copier depuis
`videos/_gabarit/assets/portrait.png` (jamais dans git).

**R22 — La marche avec le carton (scène 14).** `PP.walk` anime aussi les bras : les écraser par les deux
`arm*` du carton APRÈS le mélange (`Object.assign({}, LUI, PP.walk(ph), { armL: [30, 60], armR: [24, 70],
armLBack: false, … })`). Le carton suit `node.out.handL` / `handR` (repère déjà orienté : avec `facing: -1`
la main est à `x + handR[0]`). Vitesse : 375 px en 1,15 s avec une phase à 1,7 cycle/s ≈ 96 px par pas à
l'échelle 1,02 : contrôler image par image que les pieds ne glissent pas (sinon phase à 1,9).

**R23 — Les bustes de l'appel vidéo.** Persona dessiné en pied puis découpé par la tuile : les jambes
existent sous la découpe (coût de dessin) → passer `hide` n'est pas prévu pour les jambes ; accepter, ou
dessiner les trois juges une seule fois (pas de `c.sk` qui redessine : seuls `blink`, `talk` et `headTilt`
changent, arrondis). La pointe de la bulle d'ELLE doit rester SOUS le bas de la bulle (sinon la queue se
replie : c'était le défaut signalé sur AKTE 03). Non essayés, à contrôler sur capture : la main levée de la
juge en `robe` (manche large : si elle masque le visage d'`AS2`, revenir à `PP.stand` et garder seulement
`talk` + `torsoLean`), et la position de la bulle d'ELLE (elle a été déplacée après la maquette).

**R24 — Durée.** 69,3 s provisoires pour une cible de 60 à 70 s : aucune scène n'a de marge. Si la voix réelle
est plus rapide sur b17 (trois pastilles en 2,2 s), supprimer la première (« erste Instanz » reste dite par
la voix : « ابتدائي »).

---

## 8. Check-list de contrôle (pour celui qui construit)

Depuis `sketch-video/` :

- [ ] `node tools/errcheck.mjs videos/akte-siegburg-whatsapp/index.html 0 5 12 20 24 27 30 33 37 40 42 45 48 51 53 56 59 61 64 68 73`
      → `SV.error=null`, aucune erreur de console. Un repère faux fait échouer TOUTE la page : commencer par là.
- [ ] `node tools/cuetimes.mjs videos/akte-siegburg-whatsapp/index.html b3@4 b4@3 b7@1 b19@5 "b1@بـ1000" "b16@و1000" "b14@70%"`
      → vérifier que ce sont bien « كتبات », « 9 », « 549 », « ما », la somme, la somme, « 70% ».
- [ ] `node tools/planche.mjs videos/akte-siegburg-whatsapp --beats --ig` → sur CHAQUE image : rien d'important
      dans les zones rouges ; le cadre du téléphone au même endroit dans toutes les scènes ÉCRAN ; la mention du
      menton présente ; une seule pastille à la fois ; aucun arabe recouvert.
- [ ] Débuts de scène image par image (`--from … --to … --step 0.1`, et pas 0,05 pour les T-NOTIF) :
      0 → 1,4 (vibreur, somme) ; `b2` → +0,8 (sortie du téléphone) ; `b3` → +0,6 (plongée) ; `i1`, `b4`, `b16`,
      `b18` → +0,6 (T-NOTIF : l'ancienne page visible sous la nouvelle) ; `b6` → +0,6 ; `b10@end` → `b11` (le
      silence) ; `b12@فمشى` → +0,6 ; `b14` → +0,8 ; `b20` → +0,8.
- [ ] `node tools/overlapscan.mjs videos/akte-siegburg-whatsapp/index.html 0 75 0.1` → aucun recouvrement de
      textes hors de ceux voulus (un mot et son surligneur ; L9 et sa copie dans la loupe ne se touchent pas).
- [ ] `node tools/mouvement.mjs videos/akte-siegburg-whatsapp` → toutes les scènes au-dessus du seuil sauf
      l'intro et la scène 11 après `b10@end+0.95`.
- [ ] `python3 tools/ig_overlay.py <capture>` sur une image de chaque famille (ÉCRAN, PIÈCE, PAPIER, affiche).
- [ ] Vert ≤ 5 % sur la scène 11 (R11). Aucun vert ailleurs que sur SA bulle, le bouton d'envoi et les sept
      pastilles « transmis ».
- [ ] Personnages : ELLE et LUI reconnaissables en avatar ; aucun bras croisé ni tendu dans le vide ; LUI assis
      ne flotte pas ; la marche de la scène 14 ne glisse pas ; `talk` seulement en b14 (ELLE) et b15 (JUG).
- [ ] Vérité (R17) : relire les 21 scènes avec la liste « Jamais à l'image » de `scenario.md`.
- [ ] Affiche : 20 cases, 5 colonnes, aucune case vide ; question sur deux lignes ; « AKTE 08 · قريبا » ;
      la flèche vise le bouton « commentaire » ; rien sous y 1470.
- [ ] `assets/portrait.png` présent et hors de git ; `git status` ne montre que le dossier de l'épisode.

---

## Annexes

### A. `index.html` et `glossaire-episode.js`

`index.html` : copie du gabarit (mêmes styles, même `SV_CONFIG` : `preset: "instagram", mode: "scenes",
hold: 5.6, captions: "karaoke", captionBottom: 320, capSafeRight: 0, capChars: 15, capWords: 4, capTr: false`),
titre « AKTE 07 – الگروپ ». Aucune police ni classe nouvelle.

`glossaire-episode.js` : **vide** (R13). Les traductions sont portées par les pastilles :

```js
window.GLOSSARY = Object.assign(window.GLOSSARY || {}, {
  // volontairement vide : « Arbeitsgericht », « krank » et la phrase de b9 sont expliqués par la voix elle-même ;
  // une traduction sous le sous-titre le ferait monter sur le menton du téléphone.
});
```

### B. Chaînes arabes de l'écran

Toutes viennent de `scenario.md` (tableau « Mots allemands à l'écran », gloses à relire par l'auteur) ou des
phrases dites (b3, b5, b6, b18, b19, b20). **Trois seulement sont nouvelles ou provisoires :**

| chaîne | où | statut |
|---|---|---|
| `يعني: غير شي ريح حاصل ليه.` | scène 10, loupe (traduction de b9) | PROVISOIRE : sera remplacée par les mots de l'auteur en b10 |
| `التشخيصات · التحاليل` | scène 9, sous la pastille « Diagnosen · Laborwerte » | réunion de deux gloses du scénario (aucun mot nouveau) |
| `دقيقة` | scène 21, à côté du chronomètre | tiré de b20 (« فدقيقة ») |

Rappels : « Yassine » jamais précédé de « Dr. » ; « مريض » / « زميل ديالها » (scène 3) et les lignes de règle
(scènes 19–20) sont mot pour mot dans les beats ; la question de l'affiche et « كتب ليا فالكومنتير » sont dans
le scénario.

### C. Textes allemands qui ne sont PAS des citations (sans guillemets à l'écran)

Dates et libellés : « Samstag, 31. Mai 2025 », « Donnerstag, 29. Mai 2025 », « Freitag, 22. Mai 2026 »,
« Mai 2025 », « Sa · 31.05.2025 », « 10.09.2025 », « 22.05.2026 », « 25.07.2025 », « JULI 25 », « 31 DEZ 2025 » ;
« WhatsApp-Chatgruppe · 9 Mitglieder » ; « Arbeitsgericht Siegburg », « 1 Ca 1741/25 », « 1. Kammer »,
« Urteil vom 22.05.2026 » ; « Klage · 10.09.2025 », « gefordert: 2.000 € », « 78 % der Kosten » ;
« erste Instanz », « Stand Juli 2026: nicht rechtskräftig », « Berufung möglich · LAG Köln », « rechtskräftig » (requête du champ de recherche, scène 18), « 0 / 0 » ;
« Schadensersatz », « Stationsärztin », « Notaufnahme », « Arbeitsunfähigkeitsbescheinigung · bis 02.06.2025 » ;
« Dienst », « Urlaub », « Geburtstagsgeschenk » ; « Diagnosen », « Laborwerte » ; « 70 % », « privat », « 30 % »,
« mindestens » ; « Wochenende · 549 € », « Nachricht · 1.000 € » (ticket) ; « zu zahlen » ; « krank bis Montag »,
« § 5 EFZG », « DSGVO Art. 9 », « Art. 9 Abs. 1 DSGVO », « Einwilligung », « Gesundheitsdaten », « Diagnose »,
« im Urteil zitiert · Rn. 8 », « Keine Rechtsberatung », « laut Urteil », « laut Gericht », « laut ihrer
Nachricht », « Rekonstruktion ». Décor (jamais traduit, jamais important) : « Arztzimmer », « Dienstplan »,
« Wochenende », « Fr », « Sa », « So · Tag ».
Inventés et étiquetés « Rekonstruktion » : « krank · Vertretung? » (scène 6), « … hat die Gruppe verlassen »
(scène 14).
Citations mot pour mot (entre « » à l'écran, relues à la source par la relecture du scénario) : les neuf
lignes du message, « verurteilt, … zu zahlen », « zum wiederholten Male », « eine Kollegin aus der
Notaufnahme », « … um den Kläger in der Abteilung bloßzustellen », « an jedenfalls sieben Mitglieder …
übermittelt », « erfolglos », « mitursächlich », « zu 70% privat und lediglich zu 30 % dienstbezogen »,
« zu mindestens 30% arbeitsbezogene Inhalte », « nicht ausschließlich persönlichen Zwecken », « uneinsichtig »,
« … es ab sofort zu unterlassen, … », « … insbesondere … wie WhatsApp … », « ohne seine Einwilligung »,
« Die Verarbeitung … von … Gesundheitsdaten … ist untersagt. ».

### D. Ordre d'écriture conseillé

1. `decor.js`, famille A (téléphone, bulle, avatar, bannière) + la fonction `ecran()` + `punch` / `buzz` /
   `decoupe` : faire tourner la scène 1 seule, contrôler l'image 0 avec `--ig`.
2. T-NOTIF sur deux scènes ÉCRAN qui se suivent (4 → 5) : c'est le seul mécanisme délicat (R1).
3. Le brouillon (scènes 8 → 11), d'un seul tenant : une fonction `brouillon(c, fil, { n0, … })`.
4. Les deux pièces (`D.piece` + meubles), puis les scènes 2, 7, 14 (même pièce) et 6.
5. L'appel vidéo (15–16), la carte (13), les règles (19–20), les deux scènes papier (12, 21).
6. L'intro (4) avec le socle, le HUD du socle, l'affiche (22) en dernier (elle dépend du nombre de scènes).

### E. Écarts avec la fiche de `SAISON-2.md` (tous imposés par le dossier, le scénario ou le moteur)

- « avatars qui grimacent », « réactions des collègues » → visages NEUTRES, aucune réaction (le jugement n'en
  décrit pas).
- « compteur vu par N personnes », « coches bleues », « message qu'on ne peut plus effacer » → « → 7 » transmis
  (« übermittelt »), aucune coche, rien sur l'effacement.
- étiquette « Beweis » → « im Urteil zitiert · Rn. 8 ».
- Contrôle des ressemblances de la saison (26.11.2026) : l'étiquette de prix à ficelle de la scène 2 (objet
  signature d'AKTE 08) → un ticket de caisse qui sort de sa poche ; l'éphéméride des scènes 7, 12, 14 (ses
  feuillets arrachés sont le dispositif d'AKTE 06) → le widget « date » du téléphone, qui roule ; la loupe et le
  tampon vide de la scène 18 (identiques à AKTE 04 et 05) → la recherche du fil, « 0 / 0 » ; les avatars `K3`,
  `K5` et l'assesseur `AS1` (sosies de personnages d'AKTE 08 et 04) changés.
- « virement de 1 000 € » → une demande « zu zahlen » avec une horloge ; flèche en pointillé.
- transition « `slideUp` inversé / `wipe` » → T-NOTIF fait dans la scène (`stage.js` n'a pas de glissement
  haut → bas et ne se modifie pas) ; `slideUp` sert seulement à entrer dans une pièce.
- « deux décors seulement hors du téléphone » → tenu pour les PIÈCES (salle des médecins, salon) ; s'y ajoutent
  deux scènes sur papier sans décor (lettre, page du jugement), voulues par le scénario (« du papier, plus une
  bulle »).
- « quatre ou cinq collègues » → sept (les neuf membres moins eux deux).
- « elle, agacée, téléphone en main » → tenu ; mais jamais hilare (R18).

---

## Écarts de construction

Ce que la construction a fait autrement que ce document, et pourquoi (étape « socle et décors 1 », 26.11.2026).

**Fonctions ajoutées hors inventaire** (dans `decor.js`, marquées « (ajout) ») :
- `D.telVerre` — le bord d'encre de l'écran et l'encoche, reposés PAR-DESSUS la page découpée : sinon le papier de
  l'écran recouvre la moitié intérieure du trait de `D.tel`. Ordre d'une scène ÉCRAN : `D.tel` → page → `D.telVerre`
  → menton.
- `D.bande` — la bande des pastilles (papier de l'écran + pointillé gris en bas), `{ y0, y1 }` pour l'appel vidéo.
- `D.mention` — la mention de source, en deux formes : `"menton"` (ÉCRAN, centrée sur (525, 1422)) et
  `"etiquette"` (PIÈCE / PAPIER, en bas à gauche) ; elle mesure les deux textes pour centrer l'ensemble.
- `D.anneau` (anneau jaune à main levée, scènes 1 et 3) et `D.croix` (croix d'encre de la scène 3) : traits décrits
  dans les scènes, écrits une fois comme dessins.
- Partagé avec `decor-2.js` / `decor-3.js` : `D.TEL`, `D.VERT` et `D.outils` (tx, mesure, ln, bullePath,
  papierTicket…). `D.outils.papierTicket` est le papier commun de `D.ticketPoche` et du futur `D.ticketCaisse`.

**Dessins changés par rapport au § 2 :**
- `D.icoDienst` — une feuille de planning SANS anneaux ni bandeau de mois (la première version ressemblait à un
  calendrier, objet réservé à AKTE 06) : trois petits bustes en tête des colonnes, la grille 3 × 2, la case jaune.
- `D.notif({ appel: true })` — le bouton « accepter » porte un combiné de téléphone, pas une coche (§ 0.3 et R17 :
  aucune coche dans l'épisode) ; « refuser » garde sa croix.
- `D.postit` — arabe en 26 px (le § 2 disait 24) : règle de la série, traductions ≥ 26 px gras.
- `D.ticketPoche` — ancrage = la fente de la poche, réglable `o.ax` (part de la largeur à gauche de la fente) ;
  défaut 0,05 : le ticket pend vers la droite, devant rien d'important (x 548 → 748 en scène 2, comme prévu) ;
  `ax: 0.5` = le milieu du bord haut du § 2.
- `D.icoUrlaub` — chaise longue (dossier relevé, couchette sur deux pieds, toile rayée) au lieu de deux montants
  croisés : illisible à 82 px.

**`glossaire-episode.js` n'est pas vide** (l'annexe A le voulait vide, R13) : il porte les gloses du tableau
« Mots allemands à l'écran » du scénario (pour les pastilles, `Stage.gloss`), SAUF tout mot ou groupe de mots qui
figure dans `beats.js`. Vérifié par script avec la règle du moteur (`engine/runtime.js`, mot par mot, paires de
mots et phrase entière) : aucun sous-titre ne reçoit de traduction, donc rien ne monte sur le menton du téléphone.
À ne pas casser : n'y ajouter aucune clé égale à un mot ou une paire de mots d'un beat.

### Étape « décors 2 » (scènes 6 à 16, `decor-2.js`, 26.11.2026)

**Fonctions ajoutées hors inventaire :** `D.accolade` (l'accolade de la scène 9) et `D.fleche` (flèches à main levée des
scènes 9 et 10, pleines ou en pointillé, `o.p` pour la tracer) ; dans `decor.js`, `D.aimant({ qui: "gris" })` (les aimants
sans pictogramme de la scène 14).

**Dessins changés par rapport au § 2 :**
- `D.enveloppe` — 460 × 240 (le § 2 disait 400 × 230) : la lettre fait 440 px de large, elle ne pouvait pas sortir d'une
  enveloppe plus étroite. Vue côté adresse (timbre, oblitération, adresse illisible), rabat DERRIÈRE qui se relève ; en deux
  appels (`partie: "dos"` → lettre → `partie: "devant"`).
- `D.certificat` — « bis 02.06.2025 » ne tient pas en 26 px sur une feuille de 180 px : « bis » (18 px) au-dessus de
  « 02.06.2025 » (26 px). Le tampon rond fait r 36 et « Notaufnahme » (14 px) suit son bord (à plat, il débordait du rond).
- `D.widgetDate` — paramètres `haut` / `jour` / `bas` (alias `mois` / `an`) ; la roue qui tourne montre des traits
  horizontaux flous (`roule` < 1, `pos` = position de la roue) : des formes verticales lisaient « pause ».
- `D.camembert` — « 30 % » dans le bas de la part jaune, « mindestens » juste au-dessus. À r 96, la part ne loge pas en plus
  l'icône « Dienst » : la fonction renvoie l'ancre `ico`, sur le bord haut de la part, où l'icône ne couvre aucun texte.
- `D.tuile` — masque aussi les coins carrés du contenu (`c.clipped` découpe un rectangle) ; `lisere: "seul"` dessine
  seulement le liseré jaune (les deux nœuds qui se croisent en fondu).
- `D.salleAudience` — le fond a les dossiers des trois fauteuils (celui de la présidente plus haut) et deux appliques, pour
  qu'il ne soit pas nu ; lambris clair à planches VERTICALES (rien de commun avec les boiseries d'AKTE 03).
- `D.fondNeutre` — un petit cadre au mur, une étagère basse, le dossier de sa chaise.
- `D.lampadaire` — `partie: "cone"` pour poser le cône de lumière par-dessus le canapé.

**À savoir pour les scènes (vu sur maquettes, hors git, avec Persona et les zones Instagram) :**
- `D.pouce` — la main dépasse le bord droit du téléphone : la découper à x 906 (colonne des boutons à partir de x 915).
- Scène 12 — avec la caméra finale du § 4 (×1,06 centrée sur (590, 1010)), le widget (bord gauche x 155) et le soleil
  (x 137 avec ses rayons) arrivent à x ≈ 79 et 60 à l'écran, dans la marge rognée : garder `cx: 540`, ou décaler widget et
  soleil d'environ 40 px vers la droite.
- Scène 14 — carton centré en (−120, −240) dans le repère de LUI : la feuille de plante arrive sous sa barbe ; le descendre de
  10 à 15 px si elle la touche sur la capture.
- Scène 16 — la plaque « uneinsichtig » (380 px) garde son micro « laut Gericht » collé dessous : il passe sur le bord de la
  tuile B (contour papier, lisible).

### Étape « décors 3, HUD, mises en place » (scènes 17 à 22, `decor-3.js`, `story.js`, 26.11.2026)

**Dessins (`decor-3.js`) changés par rapport au § 2 :**
- `D.interdit` — deux parties (`partie: "bulle"` / `"panneau"`) : le panneau claque sur la bulle (deux nœuds) ; liseré papier autour du
  panneau pour qu'il se détache. Aucun rouge.
- `D.aPayer` — horloge À GAUCHE, étiquette « zu zahlen » à droite ; l'étiquette se pousse quand le cadran grossit (r 22 → 34).
- `D.ticketCaisse` — présenté en colonnes de ticket (« Wochenende » … « 549 € », « Nachricht » … « 1.000 € », points de conduite) : ce
  sont les mots du storyboard et du scénario, lettre pour lettre, sans le « · » ; la somme de la ligne 2 est surlignée de jaune (règle :
  le jaune pour la somme) ; `lignes` 0..2 (la 2e en fondu), `fente` (fente sous la bulle).
- `D.compteRecherche` — à droite de « 0 / 0 », les deux flèches « précédent / suivant », grises (rien à parcourir).
- `D.pointInterro` — 62 px (et non 90) : le « ? » de Kalam est très haut (90 px donnaient 150 px de haut).
- `D.coffre` — 360 × 356 ; la porte s'ouvre de 0 à 100° : sa face se resserre vers la charnière, puis on voit son REVERS à gauche de la
  charnière (plus juste qu'une porte qui se réduit) ; texte de loi réduit à la largeur de la porte si besoin (jamais sous 13,5 px).
- `D.cle` — l'étiquette pend VERTICALEMENT le long de la tige (texte dans le sens de l'étiquette) : à l'horizontale, « Einwilligung »
  sortait de l'écran (clé à x 770) ou passait sur le coffre. Ajout : `D.cle({ partie: "crochet" })`, le crochet (vis + crochet) sur lequel
  la clé tombe.
- `D.pageJugement` — trombone en haut à gauche, incliné vers la gauche (il touchait le « A » de l'en-tête) ; l'emplacement du § 8 est
  VIDE, sans cadre ni pointillé (un cadre vide ressemblait au « tampon vide » réservé).
- `D.pouce` (`decor-2.js`) — contour continu ajouté sous le trait rough : à grande taille, le contour s'ouvrait aux jonctions pouce / main.

**`story.js` — trois blocs nouveaux, avant `(window.EP_PARTS || []).forEach(…)` (le HUD du socle et l'affiche restent après) :**
- `X.hud` (HUD propre, § 3) : `telephone` (le squelette ÉCRAN des Conventions : fond troué en T-NOTIF, coque, page découpée en couches
  `ecran · contenu · barre · tete · bande · saisie · asc · reflet`, verre, `dessus`, `menton`, `notif`), `pastille`, `mention`,
  `banniere`, `ascenseur`, `compteur`, `fantome`. Le fond des scènes ÉCRAN est TOUJOURS dans `c.hud` (papier à points + 4 formes), troué
  ou non : il peut ainsi apparaître en fondu (plongée, montée) ; ne PAS appeler `k.bg()` dans une scène ÉCRAN.
- `X.aides` : en plus de celles des Conventions, `jaillit` (pop à pivot donné), `dans` (re-parenter un nœud de Motion), `val`,
  `avatarVif`, `bulleFil`, `tape`, `curseur`, et `brouillon` (le brouillon des scènes 8 → 11, d'un seul tenant, annexe D).
- `X.lieux` : `fil`, `contact`, `plans`, `appel`, `regle` (ÉCRAN, tous bâtis sur `X.hud.telephone`), `salle`, `salon` (PIÈCE), `papier`.
  Les personnages qui jouent (ELLE, LUI) sont posés par les scènes dans les places prévues (`R.lui` du salon, `P.elle` de l'appel) ; les
  trois juges sont dessinés par le lieu (R23), surchargeables par `o.jug` / `o.as1` / `o.as2`.
- L'ascenseur suit les SAUTS du fil (0,3 px par px de saut), pas le glissement continu du semis.
- Affiche (scène 22) : réglée sur le § 4 (5 colonnes, `crop: [262, 1470]`, `freezeAt`, carte (110, 1160, 760, 290), question sur deux
  lignes 46 / 52 px, « كتب ليا فالكومنتير » 40 px, flèche vers le bouton « commentaire »). Les textes passent par `c.text` (et non `k.ar`,
  qui multiplie la taille par 1,3).

**Vu sur captures (scènes d'essai provisoires, retirées ensuite) :** T-NOTIF (l'ancienne page visible sous la nouvelle, sur fil, appel,
contact, règle), plongée et montée, sortie du téléphone vers une main, salle en cascade, salon (LUI assis derrière le plaid), salle de la
scène 14 (deux blouses, machine éteinte, aimants, LUI qui marche avec son carton : le carton suit `out.handR`), appel vidéo (juge main
levée : la manche ne cache pas AS2), brouillon L9 mot à mot + envoi (la mesure du vert, R11, reste à faire sur la vraie scène 11), page du jugement, coffre ouvert / fermé.

### Étape « scènes, partie 1 » (scènes 1 à 5, `scenes-1.js`, 28.11.2026)

Les cinq scènes avaient été écrites par l'agent précédent (arrêté avant ses contrôles) ; elles ont été contrôlées sur captures
(planches `--entre b1,b4` avec et sans `--ig`, accroche image par image, transitions sortie / plongée / T-NOTIF), puis corrigées.
- Scène 1 — la réponse du tribunal « frappe » (aide `frappe` : `Node.slam` appelle `scene.shake`, sans effet dans `c.hud`) depuis
  ×1,45 et non ×2,6 : plus grande, la bulle débordait de l'écran du téléphone. Anneau jaune 600 × 288 (le § 4 disait 520 × 290) :
  il doit entourer toute la bulle B0, large de 482 px. Séparateur et lignes de B0 remontés de 6 à 10 px (place du contenu).
- Scène 2 — bannière en y 284 et pastilles en (520, 402) (§ 4 : 300 et 420) : l'arabe de la pastille reste au-dessus du tableau des
  gardes. Caméra `cy: 930` (et non 920) et coups de zoom 0,05 / 0,04 / 0,025 (et non 0,06 / 0,05 / 0,05) : avec la poussée du
  cadrage global, ses pieds touchaient l'étiquette de mention (y 1404) au coup de pied. En conséquence, cible du fantôme (541, 1083) et
  départ de la plongée de la scène 3 (541, 1094). Ajouts : le pied se lève avant de frapper, une marque de colère à sa tempe.
- Scène 3 — le vibreur part avec la croix (`b3@مريض+0.16`, 6 px), pas après elle.
- Scène 5 — la bannière T-NOTIF reste 1,15 s (dans la plage 0,9–1,2 s des Conventions) et le titre « Ärzte-AC » s'écrit à `b4+1.3` (§ 4 :
  `b4+0.3`) : la bannière couvre l'en-tête, le titre s'écrivait caché dessous. Deux anciens messages illisibles (K6, K2) en haut du fil :
  le fil n'est pas vide avant les trois sujets.
- Contrôles : aucune erreur JS ; mouvement b1 4,4 %, b2 18 %, b3 11 %, b4 3,4 % (l'intro, calme par nature, est signalée « FIGÉ ») ;
  chevauchements restants : seulement la bulle de la somme pendant sa frappe (0,15 s) et les boîtes de police titre / sous-titre de l'en-tête
  (9 px de marge de police, les lettres ne se touchent pas).

### Étape « scènes, partie 2 » (scènes 6 à 11, `scenes-2.js`, 28.11.2026)

- Scène 6 — caméra finale ×1,12 centrée sur (545, 925) et non (545, 880) : à 880, le bas du canapé passait sous l'étiquette de mention.
  Certificat en (475, 690) (§ 4 : 455) : il touchait le rideau de droite ; posé sur l'accoudoir en (738, 1032), incliné de −14°. Pastilles
  en (520, 412) et bannière en y 284, comme la scène 2. Ajouts : le téléphone de LUI s'éclaire quand il envoie ; il relit sa bulle ensuite.
- Scène 7 — pas de zoom ×1,08 à « خديت » (poussée ×1,03 seulement, caméra cy 916) : la pièce est trop haute, à ×1,08 le haut du tableau
  montait sous la traduction de la pastille ET ses pieds descendaient sur l'étiquette de mention. Papier du fond limité au cadre
  (`k.bg()` monte à y −1500 et cachait le salon pendant le glissement `slideUp`). Bulle « … » en (612, 873) (§ 4 : 598) : elle touchait ses
  cheveux ; 2e marque de colère en (634, 846). Traduction commune en (520, 466), pastilles en (520, 404). Le post-it est DANS le tableau
  (il suit son balancement). Les aimants de LUI tombent dans la gouttière en (455, 770) et (604, 770), à côté du feutre et de la brosse.
- Scène 8 — plongée depuis (529, 1119) (son téléphone avec la caméra de la scène 7). L1 et L2 se tapent plus tôt et plus vite (b7+0,1 et
  b7+0,26, 0,16 s) et L3 attend la fin de L2 : « 549 » arrive 0,33 s après b7, L3 se tapait avant L2. Ajout : le vibreur à la déchirure.
- Scènes 9, 10, 11 — `telephone({ at: "b7" })` : même fil que la scène 8, le semis continue sans saut aux coupes et le reflet ne repasse
  pas. Scène 11 : les petites formes du fond s'arrêtent aussi (leur temps est figé à `b10@end+0.95`).
- Scène 9 — l'accolade suit le haut de la bulle quand elle grandit, puis s'efface à « ديالو ». La flèche « L7 → LUI » passe par la marge
  droite (hors de la bulle) : tout droit, elle barrait six lignes. Les deux barres s'arrêtent au bord de SON avatar (pas sur son visage).
  Ajouts pour le mouvement (le beat était « figé » à 2,4 %) : la silhouette enfle quand les barres partent, l'avatar d'ELLE quand elles
  arrivent, les deux flottent de ±5 px, et un coup de zoom (`punch` 0,025) sur « زميلة ».
- Scène 10 — `D.loupeCitation` a une option `marge` (decor-2.js) : le lien descend dans la marge gauche, entre l'écran et la bulle, jusqu'à un
  petit anneau (r 9) juste avant le « V » de L9 ; en travers, il barrait les huit lignes. Le séparateur de date s'efface sous la loupe (il
  dépassait au-dessus). La loupe « tressaute » 0,28 s (+4,5 %, en penchant de ±1,6°) au lieu de 0,14 s (+3 %), et le téléphone se penche
  doucement au premier mot (`punch` 0,025 sur 0,9 s) : sans cela, le beat b9 était « figé » (0,5 %) entre deux mots.
- Scène 11 — les sept traits partent tous du milieu du bas de la bulle (506, 1072) en éventail : verticaux, le dernier coupait la queue de
  la bulle. Vert mesuré (R11) : 2,2 % de l'image (≤ 5 %) ; 0 % ailleurs dans la partie, 1,0 % en scène 1.
- `index.html` — sous-titre de b9 : les mots latins qui se suivent restent sur une seule page (« وزادت: Vielleicht sitzt aber ein Pups
  quer. ») ; à 76 % il débordait. Une ligne qui contient une suite de mots latins peut maintenant rétrécir jusqu'à 52 % (b9 : 60 %).
- Contrôles : aucune erreur JS ; mouvement b5 18 %, b6 17 %, b7 3,4 %, b8 4 %, b9 16 %, b10 3,2 % ; la scène 11 (entre deux beats) se fige
  comme voulu ; chevauchements restants : seulement pendant les transitions (glissement, plongée), les tampons qui frappent et les boîtes
  de police de textes empilés (certificat, post-it, loupe), lettres distinctes sur les captures.
