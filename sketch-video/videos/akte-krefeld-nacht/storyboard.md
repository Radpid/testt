# AKTE 05 — « بوحدهم فالليل » (Krefeld, 2008) — STORYBOARD

Numéro 05 provisoire (`AKTE_NO = "05"`, `AKTE_NEXT = "06"`, `TITRE = "بوحدهم فالليل"` — titre à valider par l'auteur,
voir `scenario.md`). Texte figé : `scenario.md`, `beats.js` (28 beats), `timings.js` (minutage **provisoire**, 92,2 s).
Ce document se suffit à lui-même : celui qui construit `decor.js`, `story.js` et `index.html` n'a rien d'autre à décider.
Quand ce document et la fiche de `SAISON-2.md` se contredisent (horloge de 22 h à 6 h, Oberarzt endormi, lit « au petit
matin »), **c'est ce document qui vaut** : aucune heure, aucun dormeur, aucune aube (aucune source ne les donne).

Conventions de lecture
- Repère **monde** = repère de la caméra de la scène, 1080 × 1920. Repère **écran** = calque `c.hud` (fixe).
- Vue globale `view: { s: 1.06, oy: -20, breathe: 0.04 }` : écran X = 540 + (x − cx) · S ; écran Y = 940 + (y − cy) · S,
  avec S = s · 1,06 · (1 → 1,04 du début à la fin de la scène).
- **Caméra standard « STD »** : `s 1.0, cx 540, cy 950`. Sous STD : monde x 110 → écran 84…66 ; x 880 → 900…915 ;
  y 592 → 561…545 ; y 1300 → 1311…1326 ; y 1380 → 1396…1414 ; y 1420 → 1438…1458.
- Colonne des boutons Instagram (écran X > 915, Y 980–1650) = sous STD : **monde x > 880 pour y > 985**. Aucun
  personnage, texte ni objet utile dans ce rectangle ; seuls un mur ou un rideau peuvent y passer.
- Un repère s'écrit toujours entre accents graves : `b9@Insulin+0.3`. **Attention** : un repère dont le mot est fait
  seulement de chiffres est lu par le moteur comme un NUMÉRO de mot (écrire « b3 @ 100 » donnerait « mot n° 100 » → erreur). Pour les
  nombres (7500, 32, 100, 47, 2008, 2010) et pour un mot répété dans la phrase, on écrit donc l'indice du mot
  (`b1@0`, `b7@9`). La liste complète et vérifiée est au § 6.
- « pastille » = `k.chip(allemand, arabe, x, y, taille, { yellow, parent })` du gabarit (arabe détaché, contour papier).

---

## 0. Direction en dix lignes

1. **Dispositif signature : l'hôpital en coupe**, comme une maison de poupée — trois étages dans l'ordre de la phrase de
   la presse (en haut « über 100 Patienten », au milieu « Intensivstation », en bas « Notfallambulanz »), une cage
   d'escalier, les pièces éclairées en jaune, et DEUX silhouettes minuscules (0,42) qui courent. Dans l'accroche, le même
   bâtiment est vu fermé : sa façade de 105 fenêtres écrit « 7500 » en fenêtres allumées.
2. **Le tableau de bord de la nuit** (calque fixe, haut de l'écran) : un bandeau de ciel hachuré bleu nuit avec la lune
   et les étoiles, à gauche la **jauge de sucre** sans chiffres, à droite l'**horloge sans chiffres** qui saute de
   « + 2 h » trois fois, au centre UNE pastille à la fois. La caméra bouge sous ce bandeau : le ciel reste, l'immeuble défile.
3. **Grammaire de caméra : l'ascenseur.** Plans très larges (elle est minuscule) alternés avec des plans de pièce à
   l'échelle 1 (son visage). Les mouvements sont VERTICAUX : la caméra descend ou monte d'un étage à l'autre
   (`cy` seul change), jamais de travelling latéral. Trois vrais « ascenseurs » : S11 (chambre ↔ rez-de-chaussée),
   S14 (remontée vers la chambre), S23 (la liste d'appel, du bas vers le haut).
4. **Transition signature : la lumière d'une fenêtre.** Entrée `iris` (0,3 s) + un éclat jaune en forme de fenêtre au
   centre de l'écran (`eclat`), sortie par un voile bleu nuit de 0,2 s (`extinction`). `cut` dans un même lieu.
   Le tribunal arrive par le plus grand éclat (le jour revient), la règle par `zoom`.
5. **Teinte : bleu nuit `#2F3A66`**, en hachures seulement (ciel du bandeau, nuit derrière les vitres, ombres, pièce
   éteinte) — moins de 5 % des pixels. **Le jaune = la lumière** (fenêtres, pièces allumées, gyrophare) **et le sucre**
   (jauge). Tout le reste : encre, papier, hachures grises.
6. **Ton : tension lente.** Rien ne crie : pas d'alarme rouge, pas de secousses en série. Le temps qui passe (tic-tac,
   aiguilles qui tournent), les lumières d'appel qui clignotent, puis UNE lumière qui s'éteint. Musique : cordes tenues,
   pouls discret.
7. **La nuit est au présent, le tribunal au passé** : la nuit (S6–S15) est sous le bandeau de ciel ; le tribunal
   (S16–S21) est en plein jour, sans bandeau, vu du FOND de la salle (on ne voit que des dos : deux accusés, une seule se lève).
8. **Vérité à l'écran** : mention fixe en haut à gauche (« laut Presse », « laut Presse · Rekonstruktion », « Regel von
   heute · Keine Rechtsberatung »), horloge sans chiffres + « Uhrzeiten unbekannt », jauge sans chiffres, Oberarzt
   jamais montré (un cadre vide en pointillés), aucun lien dessiné entre l'insuline et le coma, billets qui ne vont
   vers personne, « Rechtskraft unbekannt ».
9. **Différent des cinq autres** : 04 = compteur d'heures à rouleaux + travelling latéral + rembobinage ; 06 = bureau
   vu de dessus et mains ; 07 = écran de téléphone ; 08 = lettres-objets, frontal ; 09 = écran coupé en deux, encre,
   lampadaire. Ici : coupe d'immeuble, silhouettes minuscules, caméra verticale, fenêtres comme écriture, ciel fixe.
   Aucun lampadaire (09), aucun compteur (04), aucun téléphone portable (07) : le téléphone est un poste mural à cordon.
10. **Différent d'AKTE 02 / 03** : pas de cellule ni de barreaux (02), pas de bloc opératoire, pas de tampon, pas de
    plaque « Im Namen des Volkes », pas d'escalier de la règle ni d'échelle de hiérarchie, pas de cadenas (03), pas de
    marteau. Tribunal vu de dos, sanction en billets comptés un à un, règle = liste d'appel + formulaire. Tous les
    décors sont redessinés dans `decor.js` (`window.EpDecor`) ; aucune fonction d'`UnnaDecor` n'est reprise.

---

## 1. Distribution

Tous neufs (comparés à AKTE 02 : femme enceinte cheveux longs, homme brun barbe de trois jours, sage-femme âgée à
chignon, juge à couronne et lunettes, expert gris à lunettes ; AKTE 03 : queue de cheval châtain, carré foncé à
lunettes, vieux moustachu en blouse, patiente bouclée châtain sans lunettes, mari barbu châtain, juge au carré gris,
Chefarzt chauve à lunettes, infirmière blonde à chignon ; et aux fiches 04, 06, 07, 08, 09 de `SAISON-2.md`).

| Clé | Rôle | Paramètres Persona | Tenue par scène | Accessoire signature | Échelle |
|---|---|---|---|---|---|
| `AZ` | l'Assistenzärztin (32 ans AU JUGEMENT) | `{ look: "woman", hair: "shortcurly", hairTone: "dark", glasses: true, seed: 501 }` | S1 `jacket` (2010, tenue de ville) · S2–S15 `scrubs` · S17, S20 `jacket` · S16, S19 : de dos (`D.dos`, blazer) | le **bip** (`D.biper`) accroché à la hanche droite (toutes les scènes en `scrubs`) ; lunettes | coupe 0,42 · S1 0,62 · pièces 0,95–1,0 |
| `KOL` | le collègue de nuit ; au tribunal « zweiter angeklagter Assistenzarzt » (même personne : très probable, non écrit → « Rekonstruktion ») | `{ look: "man", hair: "short", hairTone: "blond", beard: "short", seed: 502 }` | S2–S14, S25 `coat` (blouse ouverte + stéthoscope) · S20 `sweater` · S16, S19 : de dos (`D.dos`, veste) | blouse blanche + stéthoscope : dans la coupe, on distingue toujours « foncée en gris » (elle) et « blond en blanc » (lui) | coupe 0,42 · S13 0,95 · S20 0,85 |
| `PAT` | le patient, 47 ans, diabétique | dessin dédié `D.gisant` (jamais debout). Référence de tête pour l'ange de S18 : `{ look: "man", hair: "crown", hairTone: "brown", beard: "none", seed: 503 }` | brancard : T-shirt gris (`tenue: "ville"`) · lit : chemise d'hôpital (`tenue: "chemise"`) | **bracelet jaune** au poignet (visible sur le brancard, dans le lit, à la scène muette) | 1,0 (mini dans la coupe : `D.litMini`) |
| `RIC` | le juge (figure muette ; sexe et composition du tribunal non publiés) | `{ look: "oldman", hair: "short", hairTone: "grey", beard: "none", glasses: false, outfit: "robe", seed: 506 }` | robe | une feuille (le jugement) qu'il lève en S19 | 0,62 (au fond de la salle) |
| `GUT` | l'expert (Gutachter) | `{ look: "man", hair: "bald", beard: "moustache", hairTone: "brown", glasses: false, outfit: "sweater", seed: 505 }` | pull à col roulé | baguette (`D.baguette`) + chevalet | 1,0 |
| `SAN` | ambulancière — figurante muette (S8) | `{ look: "woman", hair: "ponytail", hairTone: "blond", outfit: "jacket", seed: 507 }` | veste | le brancard qu'elle pousse ; le bloc-notes qu'elle tend | 0,95 |
| `NSW` | infirmière de nuit — figurante muette, opacité 0,5 (coupe) | `{ look: "woman", hair: "ponytail", hairTone: "grey", outfit: "scrubs", seed: 508 }` | scrubs | petit chariot (`D.chariotMini`) | 0,42 |
| — | l'Oberarzt de garde | **jamais dessiné** : `D.cadreAbsent` (buste en pointillés + « ? ») | — | — | — |
| — | « نتا » (la règle, la dernière phrase) | pas de visage : la main en moufle `D.mainPOV` (S23, S24 — toujours devant le MUR du poste, jamais au-dessus d'un bureau : les mains vues de dessus sont AKTE 06) et une silhouette de dos neutre `D.dos({ hair: "neutre" })` (S26) | manche de scrubs / veste | étiquette jaune « نتا » | — |
| — | collègues anonymes (S3) | `D.silhouetteSoignant` ×3 (aplats hachurés, sans visage) | — | le même petit appareil caché | 0,9 |
| — | Yassine (intro) | sa photo `assets/portrait.png` | — | badge au cordon | — |

Réglages communs : `blink: rnd(blinkAt(t, k))` avec un `k` différent par personnage ; respiration `.on(breathe(k))` ;
à l'échelle 0,42 ajouter `lw: 1.8` (le trait ne doit pas devenir un cheveu) et vérifier sur capture que lunettes et
boucles se lisent. Mains en moufle partout. Aucune tête pivotée : le patient est toujours `D.gisant`.

**Qui parle (`talk`)** : personne dans la nuit, ni au tribunal (aucun dialogue n'est sourcé ; aucune bulle de
dialogue dans l'épisode). Seule exception : `GUT` bouge les lèvres de `b17@schweres` à `b17@Organisationsverschulden+0.9`
(il dépose ; ses mots sont rapportés par la presse → pastille + mention, pas de bulle).

### Arc des expressions

| Beat | `AZ` | `KOL` | Autres |
|---|---|---|---|
| b1 | `worried`, regard vers le haut `look2 [0.3,-0.9]` → `shock` à `b1@0+0.3` (recul de 18 px, `headTilt -4`) → `shock` + `sweat` à `b1@5` | — | — |
| b2 | baisse les yeux sur la feuille `look2 [0.2,0.9]`, `sad` à `b2` → `cry` à `b2@عندها` (`tears` 0 → 1 en 0,5 s, tête qui tremble ±3°) | — | — |
| b3 | `worried` (0,42), regarde l'immeuble ; `sweat` à `b3@7` ; se tourne vers lui à `b3@8` | `neutral` → `worried` à `b3@7` ; la regarde à `b3@8` | — |
| b4 | `sad` (regarde la feuille) → `calm` à `b4@تاقت` (regarde l'appareil : elle lui fait confiance) → `worried` à `b4@التيست` → regarde les silhouettes à `b4@كنديروه` → face caméra `worried` à `b4@8` | — | silhouettes : immobiles, respirent |
| b6 | `calm` en entrant → `smile` à `b6@Assistenzärzte`, remonte ses lunettes à `b6@فطور` (0,3 s) → petit signe de la main à `b6@هي` | `calm` → `smile` ; hoche la tête à `b6@وزميل` | `NSW` : `calm` |
| b7 | `neutral` → `worried` à `b7@3` → `worried` + `sweat` à `b7@9` → `shock` à `b7@المستعجلات+0.2` (le gyrophare) | `worried` à `b7@3`, `sweat` à `b7@9` | — |
| b8 | `focused` → `worried` + `sweat` à `b8@وطالع` | — | `SAN` `neutral` ; `PAT` œil mi-clos, respiration rapide |
| b9 | `worried` → `shock` à `b9@كيدخل+0.2` → `focused` à `b9@والطبيبة` | — | `PAT` œil fermé, bras qui glisse |
| b10 | `worried` + `sweat` (elle court) | `focused` (au rez-de-chaussée) | `PAT` (mini) immobile |
| b11 | `focused` + `sweat` (rez-de-chaussée, vue 1 s) | `worried` | — |
| b12 | `focused` → `calm` à `b12@سريع` (le résultat la rassure) → coup d'œil au tube à `b12@laboratoire`, puis `neutral`, épaules tombantes | — | `PAT` œil fermé, respiration lente |
| b13 | `worried`, regarde le combiné → regarde `KOL`, `sad`, à `b13@joignable` | `worried`, regarde le combiné → la regarde ; petit haussement de bras à `b13@joignable+0.2` | — |
| b14 | `sad` (0,42), immobile, tête basse | `sad`, la regarde | — |
| silence | à la porte : `shock` → `sad`, tête basse (`headTilt 14`), `tears 0.5` | — | `PAT` : plus de respiration |
| b15 | de dos : tête un peu baissée (`bow 0.3`) | de dos : droit | `RIC` `focused`, lit |
| b16 | (de face) `sad`, yeux baissés → regarde le sachet `worried` à `b16@Schnelltest` → `sad`, `mouth: "wavy"`, `tears 0.3` à `b16@وما` | hors champ | — |
| b17 | — | — | `GUT` `focused`, parle ; ange : `sleep` |
| b18 | de dos : se lève à `b18@عليها` ; `slump` + `bow 0.9` + tremblement à `b18@Tötung` | de dos : reste assis, tourne la tête vers elle | `RIC` lève la feuille, `focused` |
| b19 | `sad` → grimaces (bouche `frown` ↔ `wavy` toutes les 0,35 s) → `tears` dès le 8e billet → coup d'œil vers la porte à `b19@الآخر` → `cry` au 15e billet | `neutral`, se retourne une fois vers elle à `b19@الآخر` (`sad`), puis sort — il ne sourit pas | — |
| b20–b24 | — | — | objets et main seulement |
| b25 | (0,42) `sad` | `sad` | « نتا » de dos : se lève à `b25@كتوقف` |

---

## 2. Inventaire des décors et objets (`decor.js` → `window.EpDecor = D`)

Règles d'écriture (celles du gabarit) : chaque fonction dessine dans `g` autour de son ancrage (0,0), reçoit ses
paramètres animés dans `o` (valeurs arrondies), renvoie des ancres ; trait à main levée `U.ctx` / `U.shape` /
`U.stroke` ; ombre décalée `#D2D2CB` (6–8 px) ; jamais de forme nue. Couleurs : `INK #1C1A1C`, `YEL #F8CE4E`,
`NUIT #2F3A66` (hachures seulement), vitre éteinte `#E3E6EA`, mur éclairé `#F6F1DE`, mur éteint `#ECEEF2`.
Les parties qui bougent sont soit pilotées par `o`, soit dessinées à part pour `m.build / m.pend / m.sway / m.drift`.
**Performance** : un `c.sk` se redessine à chaque changement de paramètre ; les grands décors (façade, coupe, salles)
sont donc STATIQUES (`m.obj`), et tout ce qui change vit dans de petits nœuds séparés.

### A. Ciel et tableau de bord (calque fixe)

| Fonction | Dessin | Taille · ancrage | Parties mobiles | Scènes |
|---|---|---|---|---|
| `D.bandeauNuit(g)` | rectangle papier opaque écran 0–1080 × 0–540 (il cache le décor qui passe dessous) ; 34 hachures bleu nuit à −41°, 2,4 px, espacées de 26 px, plus denses en haut (3 rangs : y 256–350 serré, 350–450 un trait sur deux, 450–520 un trait sur quatre) ; bord bas déchiré (trait irrégulier bleu nuit 2 px à y 540 + petites hachures) | 1080 × 540 · coin haut-gauche de l'écran | aucune (lune, étoiles, nuage sont à part) | toutes les scènes de nuit : S1–S3, S5–S15, S23–S25 |
| `D.lune(g, o)` | croissant : disque papier r 30 cerné d'encre 2,6 px, ombre en hachures bleu nuit sur le tiers droit, anneau de halo jaune (opacité `o.halo`) | r 30 (+ halo r 44) · centre | halo qui respire (0,15 → 0,35, période 3,2 s) ; « lever » en S6 | bandeau |
| `D.etoile(g, o)` | étoile à 4 branches, encre, cœur jaune 2 px | r 9 · centre | scintille : échelle 0,7 ↔ 1,15, période 1,6–2,9 s, phase par étoile | bandeau, carte |
| `D.nuageNuit(g, o)` | nuage au trait bleu nuit, 3 bosses, 4 hachures | 120 × 36 · centre | défile de droite à gauche, 9 px/s, y 392 | bandeau |
| `D.horloge(g, o)` | cadran SANS chiffres : couronne hachurée grise, face blanche, 12 traits TOUS identiques (aucun repère de « 12 »), cadran penché de −14° (clou + fil au-dessus), grande et petite aiguille, axe jaune ; `o.h` = angle de la petite aiguille (°), grande aiguille = 12 · `o.h` ; `o.wedge = [a0, a1]` = secteur jaune (opacité 0,55) balayé par un saut ; `o.stop` = aiguilles grises | r 50 · centre | aiguilles (voir § 3), secteur jaune, léger balancement sur son clou (`m.pend`, idle 0,5°) | S6–S15 |
| `D.jauge(g, o)` | thermomètre : tube de verre (24 × 182, reflets), réservoir rond r 20 en bas, liquide JAUNE jusqu'à `o.level` (0–1), accolade « normal » entre 18 % et 32 % de la hauteur avec le mot `normal` (18 px), **aucune graduation chiffrée** ; `o.pulse` (0–1) gonfle le liquide ; `o.grey` (0–1) le décolore ; `o.h` permet une grande version (S22 : 300) | 24 × 182 (+ réservoir) · centre du réservoir | niveau, ménisque qui tremble (±1,2 %, 2,2 rad/s), battement | S8–S15, S22 |
| `D.eclatFenetre(g)` | fenêtre de lumière : rectangle arrondi jaune 300 × 360 à croisillon papier (4 carreaux) | 300 × 360 · centre | échelle 0,3 → 3,2 et opacité 0,55 → 0 en 0,35 s (voir `eclat`) | chaque entrée `iris` |

### B. Façade (accroche)

| Fonction | Dessin | Taille · ancrage | Parties mobiles | Scènes |
|---|---|---|---|---|
| `D.facade(g, o)` | immeuble fermé : corps crépi (blanc + hachure légère), dalle de toit, corniche ; **grille de 15 × 7 fenêtres** (34 × 52, pas 48 × 76 : local x = −354 + 48 c, y = −724 + 76 r) — chaque vitre est un `<rect>` simple (pas de rough) pour changer de couleur sans redessin, cadre encre 2 px, appui ; rez-de-chaussée (192 px de haut) : porte vitrée double 150 × 190 au centre (x −90…60), auvent, deux vitrines sombres, plinthe. Renvoie `{ wins: [105 rect, ordre de lecture ligne par ligne], door: [-15, 0] }` | 750 × 760 · bas-centre (posé en monde (525, 1380)) | les 105 vitres (piloté par `c.tick`) ; lampe de l'auvent qui grésille | S1, S2 |
| `D.enseigneToit(g, o)` | sur le toit : lettres « KRANKENHAUS » (26 px, sur un rail 300 × 34), croix jaune (`o.on`), petite antenne de 30 px avec voyant (`o.blink`) — mot générique, **aucun nom d'hôpital** | 420 × 34 · coin bas-gauche (posé à (250, 620)) | croix qui grésille (0,86 ↔ 1), voyant 1 éclat / 1,4 s | S1, S2, coupe |
| `D.trottoir(g)` | bande de trottoir (y 0–30), bordure, 2 potelets, un banc (x 175…295), totem « Notaufnahme → » (h 150, x 95) | 850 × 30 (+ mobilier) · monde (110, 1380) | — | S1, S2, coupe |
| `D.feuilleJugement(g, o)` | feuille : « URTEIL » en tête, 4 lignes grises, ligne « 7 500 € » surlignée (`o.amount`) ; version `o.big` (S21) : « URTEIL », « Krefeld · 2010 », « fahrlässige Tötung », « Geldstrafe: 7 500 € », 4 lignes grises, dernière ligne « Rechtskraft: » + points de conduite (aucun cadre de tampon) | 90 × 124 (petite) · 440 × 560 (`big`) · centre | tremble dans sa main (±2°, 9 Hz) ; coin qui bat | S1, S3, S19, S21 |

### C. Pièces de nuit et objets communs

| Fonction | Dessin | Taille · ancrage | Parties mobiles | Scènes |
|---|---|---|---|---|
| `D.salleNuit(g, o)` | pièce en coupe à l'échelle 1 : murs coupés (épaisseur 14, hachure serrée « matière coupée »), mur du fond (`o.lit` 1 = `#F6F1DE`, 0 = `#ECEEF2` + hachures bleu nuit dans les deux coins hauts), lisse de protection à `o.rail` (défaut y 1120), plinthe, sol vinyle (3 reflets horizontaux, PAS de lignes de fuite) de `floorY` 1300 à 1420 ; `x0 110, x1 960, top 592` | monde, origine (0,0) | voile jaune de la lumière (opacité 0,10 ↔ 0,14) | S3, S8, S9, S12, S13, S15, S23 |
| `D.fenetreNuit(g, o)` | fenêtre à deux vantaux, appui, store à rouleau (`o.blind` 0–1) avec cordon, nuit en hachures bleu nuit, petit croissant, 3 étoiles ; `o.jour` (0–1) : la vitre passe de la nuit hachurée au jour (papier clair, petit soleil au trait) — sert à S3 pour « كل نهار » | 200 × 250 (paramétrable) · centre | cordon (`m.pend`), store qui bat (±1,5 px), `jour` | S3 (deux : la grande, et une petite qui s'allume et s'éteint trois fois), S12, S15 |
| `D.tacheLumiere(g, o)` | polygone de lumière au sol ou sur le lit (`o.pts`), jaune (lampe) ou papier pâle cerné de bleu nuit (lune) ; `o.croisillon` : la croix d'une fenêtre reste en ombre dans la tache (S21) | libre · monde | opacité qui vacille ; glisse (S21) | S3, S12, S15, S19, S21, S26 |
| `D.plafonnier(g, o)` | suspension courte (fil 50, globe opale r 22, `o.on`) | 44 × 72 · point d'accroche | `m.pend` idle 0,6° ; s'éteint | S3, S12, S15, S13 |
| `D.silhouetteSoignant(g, o)` | silhouette pleine (matière `MAT.sil`, sans visage), `o.kind` 0 chignon · 1 cheveux courts · 2 foulard ; tient à hauteur de poitrine un petit appareil hachuré foncé | ≈ 110 × 400 · pieds | flotte (±3 px), le « ? » au-dessus de l'appareil bat | S3 |
| `D.lecteur(g, o)` | lecteur de glycémie générique, SANS marque : corps arrondi, écran 60 × 44, un bouton, fente en haut ; `o.strip` (0–1) bandelette qui entre ; `o.drop` (0–1) goutte ; `o.disp` : `"off"` · `"dots"` (trois points) · `"approx"` (« ≈ ? ») · `"HI"` (S22 seulement) ; `o.jit` (0–1) : l'affichage tremble et se dédouble (imprécis) ; `o.mystery` (0–1) : aplat hachuré foncé qui cache tout | 90 × 150 · centre | tout ce qui précède | S3 (caché), S12, S15, S17, S22 |
| `D.loupe(g, o)` | médaillon rond : disque blanc, anneau encre 5 px, ombre, reflet ; trait de liaison vers `o.to` | r 110 (paramétrable) · centre | jaillit (`pop`), flotte ±3 px ; le contenu est posé par `story.js` | S3, S12 |
| `D.biper(g, o)` | bip de ceinture : boîtier gris 16 × 22, clip, voyant jaune (`o.on`) | 16 × 22 · centre | voyant ; ondes jaunes (`m.ripple`, R 30) à chaque appel | toutes les scènes où `AZ` est en scrubs |
| `D.etiquetteQui(g, o)` | fanion jaune à pointe vers le bas, texte arabe gras (`o.text`), taille `o.size` | ≈ 90 × 54 · la pointe | `pop`, petit rebond | S6, S11, S26 |

### D. La coupe de l'hôpital (maison de poupée)

Géométrie FIXE (monde), la même dans toutes les scènes de coupe :

```
x :  150 |mur| 162 ........ 400|410 ............ 760|772 ..... 888 |mur| 900
y 587–620  toit : enseigne, antenne                        (zone libre au-dessus : le bandeau)
y 620–640  dalle de toit
y 640–880  ÉTAGE 2   [ Zimmer du patient 162–400 ][ Stationen 410–760 ][ escalier ]     sol y 880
y 880–890  dalle
y 890–1130 ÉTAGE 1   [ Intensivstation 162–760                       ][ escalier ]     sol y 1130
y 1130–1140 dalle
y 1140–1380 ÉTAGE 0  [ Liegendanfahrt 162–430 ][ Notfallambulanz 440–760 ][ escalier ]  sol y 1380
y 1380–1405 trottoir
escalier (deux volées par étage) : (792,1380) → (866,1255) → (792,1130) → (866,1005) → (792,880)
portes vers l'escalier : ouverture dans le mur x 760–772 à chaque étage (190 de haut) ; porte Zimmer ↔ Stationen x 400–410
```

| Fonction | Dessin | Taille · ancrage | Parties mobiles | Scènes |
|---|---|---|---|---|
| `D.coupe(g, o)` | la structure seule : murs extérieurs coupés (12 px, hachure serrée), dalles, cloisons, cage d'escalier (deux volées de 6 marches par étage, main courante, palier), ouverture du rideau roulant dans le mur gauche de l'étage 0 (y 1200–1380), ligne de sol. Renvoie `{ rooms, floors: { f2: 880, f1: 1130, f0: 1380 }, stair: [[792,1380],[866,1255],[792,1130],[866,1005],[792,880]] }` | 750 × 818 · monde (0,0) | aucune (statique) ; entrée : `growY` depuis le sol | S6, S7, S10, S11, S14, S25 |
| `D.lueurPiece(g, o)` | la lumière d'une pièce : voile jaune (`o.w` × `o.h`, opacité 0,16 · `o.on`) + petit plafonnier ; à `o.on = 0` : hachures bleu nuit clairsemées à la place | taille de la pièce · coin haut-gauche | allumage par deux grésillements (0,18 s) ; vacille ±6 % (période propre à chaque pièce) ; **s'éteint** (Zimmer, S14) | coupe |
| `D.litMini(g, o)` | petit lit de profil : cadre, roulettes, matelas, bosse du dormeur (`o.breath`), oreiller ; `o.kind` : `"station"` · `"its"` (avec potence) · `"zimmer"` (petite tête de profil + point jaune du bracelet) · `"vide"` | 110 × 46 (130 pour `zimmer`) · sol, centre | respiration (hauteur ±3 %, période 3 s, phases décalées) | coupe, S22 (×2) |
| `D.moniteurMini(g, o)` | petit moniteur au mur : cadre, tracé (`o.t` phase), voyant (`o.alarm`) | 34 × 26 · centre | tracé qui défile, voyant | coupe, **étage Intensivstation seulement** (jamais dans le Zimmer du patient : pas de ligne plate dans cet épisode) |
| `D.rufanlage(g, o)` | tableau d'appel des patients : cadre 90 × 50, 8 petites lampes (2 × 4), `o.mask` = lampes allumées | 90 × 50 · centre | lampes qui clignotent | coupe (Stationen) |
| `D.panneauEtage(g, o)` | panneau suspendu par deux chaînettes : `o.text` (« Stationen », « Intensiv », « Notfall »), fond jaune si `o.on` | 120 × 34 (+ chaînes 14) · haut-centre | `m.pend` (idle 0,8°), s'allume quand l'étage est nommé | coupe, S8, S22 |
| `D.ambulance(g, o)` | fourgon de profil tourné vers la droite : caisse, cabine, vitres, croix à l'encre, bande hachurée, gyrophare JAUNE (`o.beacon`), roues (`o.roll`) | 230 × 120 · sol, centre | entre en roulant, gyrophare 4 Hz, tangage 1,2 px | S7, S10, S11 |
| `D.brancardMini(g, o)` | mini-brancard avec bosse | 120 × 50 · sol, centre | roule | S10, S11 |
| `D.chariotMini(g)` | petit chariot de soins | 40 × 50 · sol, centre | poussé par `NSW` | coupe |
| `D.jaugeMurale(g, o)` | mini-jauge accrochée au mur du Zimmer (même dessin que `D.jauge`, simplifié) | 12 × 64 · bas | niveau = jauge du bandeau | S10, S11, S14 |
| `D.tabouretMini(g)` | tabouret vide à côté du lit | 26 × 30 · sol | — | S10, S11, S14 |
| `D.trace(g, o)` | pointillé jaune le long de `o.pts`, dessiné jusqu'à `o.p` (0–1) | — · monde | se dessine derrière elle, s'efface en 0,6 s | S10 |

### E. Urgences (S8, S9)

| Fonction | Dessin | Taille · ancrage | Parties mobiles | Scènes |
|---|---|---|---|---|
| `D.portesBattantes(g, o)` | ouverture à deux battants à hublot dans le mur gauche, battants ouverts (`o.open`), nuit hachurée derrière, lueur jaune du gyrophare sur le chambranle (`o.glow`) | 140 × 540 · bas-gauche | battants qui reviennent (`m.pend` 8°, amorti), lueur qui pulse 3 Hz puis s'éteint | S8, S9 |
| `D.lampeExamen(g, o)` | lampe d'examen sur bras articulé fixé au mur, tête ronde, cône de lumière (opacité 0,13) | bras 120, cône 420 · point de fixation | `drop` puis `m.pend` (5°, idle 0,8°) ; poussière dans le cône | S8, S9 |
| `D.armoireMur(g)` | étagère murale OUVERTE à bacs étiquetés (pas l'armoire vitrée d'AKTE 03) | 150 × 120 · coin haut-gauche | `drop` | S8, S9 |
| `D.chariotUrgence(g)` | chariot à tiroirs, boîte de gants, collecteur à couvercle jaune | 130 × 180 · sol, centre | entre en roulant (`right`) | S8, S9 |
| `D.rideauBox(g, o)` | rideau de box sur rail au plafond, plis | 50 × 700 · haut du rail | `m.sway` 0,9° / 3,1 s | S8, S9 |
| `D.brancard(g, o)` | brancard à l'échelle 1 : châssis en X, 4 roues (`o.roll`), matelas (dessus à y −180), barrière baissée, barre de poussée côté pieds, dossier relevé de 12° côté tête ; `o.flip` = tête à droite. Renvoie `{ top: -180, x0, x1, bar: [x, y], pole: [x, y] }` | 440 × 200 · sol, centre | roule (entrée), s'immobilise avec un rebond de 4 px | S8, S9 |
| `D.gisant(root, o)` | **le patient allongé, dessin dédié** (jamais une tête Persona pivotée) : profil tourné vers le plafond (front, nez, lèvres, menton), œil `o.eye` (`"half"` · `"closed"` + cils), cheveux en couronne châtain (crâne dégarni sur le dessus, mèches sur la tempe et la nuque), oreille visible, cou court, épaule ; `o.tenue` `"ville"` (T-shirt gris) ou `"chemise"` (chemise d'hôpital à pois) ; corps sous le drap (poitrine `o.breath`, ventre, genoux, pieds), revers du drap ; bras proche : `o.arm` 0 = main posée sur le ventre → 1 = bras qui glisse et pend au bord du matelas (avant-bras vertical, main ouverte), **bracelet jaune** au poignet ; `o.roll` (0–1) = la tête roule de 8° vers nous. Proportions Persona (grosse tête ≈ 120 px). Renvoie `{ head, mouth, chest, hand, wrist, iv, feet }` | ≈ 400 × 80 · coin haut-gauche du matelas (tête à gauche ; le parent retourne) | respiration, œil, bras, tête | S8, S9, S12, S15 |
| `D.potence(g, o)` | pied à perfusion à roulettes : poche (`o.level`), chambre compte-gouttes (`o.drop` phase), tubulure, **site en Y** ; renvoie `{ port, bag }` | h 420 · sol | gouttes (1 / 0,5 s) | S8, S9, S12, S15 |
| `D.seringue(g, o)` | seringue étiquetée « Insulin » (22 px), piston `o.push` (0–1) | 110 × 22 · embout | piston | S9 |
| `D.protocole(g)` | planchette à pince, feuille « Einsatzprotokoll », 5 lignes | 70 × 96 · centre | passe d'une main à l'autre | S8 |

### F. Chambre du patient (S12, S15)

| Fonction | Dessin | Taille · ancrage | Parties mobiles | Scènes |
|---|---|---|---|---|
| `D.litHopital(g, o)` | lit d'hôpital de profil, tête à GAUCHE : tête et pied de lit, cadre, roues à frein, matelas (dessus y −195), barrière ; renvoie `{ top: -195, x0, x1 }` | 480 × 310 · sol, centre | — | S12, S15 |
| `D.tableChevet(g)` | table de chevet à tiroir et roulettes ; renvoie `{ top }` | 80 × 150 · sol, centre | `right` à l'entrée | S12, S15 |
| `D.tubeLabo(g, o)` | portoir à 3 trous, UN tube à bouchon, **vide** (`o.fill` 0), étiquette « Labor », bon de demande plié à côté ; `o.dim` (0–1) = voile gris | 70 × 90 · bas-centre | voile gris ; tinte | S12, S15, S17 |
| `D.porteChambre(g)` | embrasure ouverte, battant contre le mur, couloir en hachures bleu nuit | 110 × 440 · bas-gauche | — | S12, S15 |

### G. Poste de nuit, téléphone, formulaire (S13, S23, S24)

| Fonction | Dessin | Taille · ancrage | Parties mobiles | Scènes |
|---|---|---|---|---|
| `D.telephoneMural(g)` | poste mural à clavier (12 touches), crochet, voyant ; renvoie `{ cord: [0, 85] }` | 110 × 170 · centre | — | S13, S23 |
| `D.combine(g, o)` | combiné (écouteur en bas quand il pend) | 46 × 150 · attache du cordon (haut) | `m.pend` (14°, amorti 2,2, idle 2,5°) | S13, S23, S24 |
| `D.cordon(g, o)` | cordon en spirale entre `o.a` et `o.b` (`o.n` 9 spires) | — · monde | redessiné quand le combiné bouge (angles arrondis au degré) | S13, S23 |
| `D.listeGarde(g, o)` | tableau de garde sur planchette. Petit (S13) : titre « Hintergrund · Nacht », une ligne « Oberarzt » + icône téléphone + lucarne d'état. Grand (`o.big`, S23) : trois lignes de haut en bas « Chefarzt », « Oberarzt », « Assistenzarzt (du) » avec leurs lucarnes reliées par un trait vertical ; états `"off"` · `"ring"` (clignote jaune) · `"dead"` (hachuré gris) · `"lit"` (jaune plein + rayons) ; `o.hl` = ligne surlignée. Renvoie les ancres des lignes et des lucarnes | 240 × 210 · 520 × 520 (`big`) · centre | lucarnes, surligneur qui monte, `m.pend` à l'entrée | S13, S23 |
| `D.cadreAbsent(g, o)` | cadre accroché à un clou : buste en POINTILLÉS (tête + épaules, aucun trait de visage), « ? » au milieu, plaque « Oberarzt », ligne `o.note` en bas du cadre | 170 × 190 (+ plaque 130 × 32) · centre | `m.pend` (5°), le « ? » bat | S13 |
| `D.mainPOV(g, o)` | grande main en moufle + avant-bras en manche de scrubs qui entre par le bas de l'image ; `o.grip` `"combine"` ou `"stylo"` | avant-bras 320, moufle 110 · centre de la main | tremble (±1,5 px), se déplace | S23, S24 |
| `D.stylo(g)` | stylo-bille | 120 × 14 · pointe | suit la main | S24 |
| `D.formulaire(g, o)` | feuille : « 3 » dans un rond jaune ; titre « Überlastungsanzeige » (tapé lettre par lettre, `o.title` 0–1, puis surligné) ; « (= Gefährdungsanzeige) » ; « schriftlich an den Arbeitgeber » ; trois champs « Datum, Uhrzeit: », « Besetzung: », « Patienten: » remplis d'une écriture en gribouillis (`o.lines` 0–3) ; case à cocher + « Patienten in Gefahr » (`o.tick` 0–1, coche jaune) ; note de bas de page (citation, voir S24). Renvoie `{ box, fields }` | 520 × 630 · centre | écriture, coche, coin qui bat | S24 |
| `D.casierMural(g, o)` | casier à courrier interne fixé au MUR, vu de face : boîte 140 × 120, fente horizontale (`o.on` : la fente s'éclaire en jaune), étiquette « Verwaltung » | 140 × 120 · centre | `drop` ; la fente s'allume | S24 |
| `D.planchette(g)` | planchette à pince pendue à un clou (support de `D.formulaire`), ficelle du stylo attachée à la pince | 560 × 680 · le clou | `drop` + `m.pend` 3° amorti, idle 0,5° | S24 |

### H. Tribunal (S16–S21, S26)

| Fonction | Dessin | Taille · ancrage | Parties mobiles | Scènes |
|---|---|---|---|---|
| `D.salleAudience(g, o)` | salle de JOUR vue du fond : mur (`#F4F1E8`) de y 300 à 1000, lambris à panneaux de y 780 à 1000, cimaise, parquet de 1000 à 1420 (lames qui convergent vers (540, 1000)), `x0 110, x1 960` | monde (0,0) | — | S16–S20, S26 |
| `D.fenetreHaute(g, o)` | haute fenêtre à petits carreaux, jour pâle ; `o.vue = "hopital"` : petit immeuble au loin (100 × 140, 12 vitres jaunes) | 140 × 340 · centre | `growY` ; vitres du petit immeuble qui scintillent | S16, S19, S26 |
| `D.suspension(g)` | globe opale au bout d'un fil (PAS la suspension à cône d'AKTE 03) | fil 80, r 24 · accroche | `drop` + `m.pend` (6°, idle 0,9°) | S16, S19, S26 |
| `D.estrade(g)` | estrade (460 × 40) + pupitre du juge (420 × 160, moulures, plateau), pile de dossiers, lampe de bureau | 460 × 210 · bas-centre | `drop` | S16, S19, S26 |
| `D.tableDefense(g, o)` | table vue de derrière : plateau, 4 pieds | `o.w` × 100 · sol, centre | `rise` | S16, S19, S26 |
| `D.chaiseDos(g)` | chaise vue de dos : dossier à barreaux, pieds | 104 × 136 · sol, centre | `rise` | S16, S19, S26 |
| `D.dos(g, o)` | **personnage vu de dos, dessin dédié** (échelle 0,8) : cheveux `o.hair` — `"boucle-fonce"` (boucles foncées serrées + bouts des branches de lunettes aux oreilles si `o.glasses`), `"court-blond"`, `"neutre"` (court, châtain) — nuque, oreilles, épaules, veste `o.veste` (`"blazer"` foncé · `"veste"` claire · `"pull"`), bras le long du corps (moufles) ; `o.stand` 0 = assis (la chaise cache le bas) → 1 = debout (le corps monte de 88 px, les jambes apparaissent) ; `o.bow` (0–1) tête qui tombe ; `o.slump` (0–1) épaules qui tombent ; `o.turn` (−1…1) tête qui pivote (on voit un peu de joue, jamais d'œil) ; `o.shake` tremblement. Renvoie `{ head, top }` | assis ≈ 152 × 350 · sol, sous la chaise | se lève, s'affaisse, respire (épaules ±1,5 px) | S16, S19, S26 |
| `D.barre(g)` | balustrade : main courante, balustres tournés, socle | 850 × 120 · monde (110, 1300) | `drop` | S16, S19, S26 |
| `D.dossierCarte(g)` | carte en forme de chemise à onglet (support des textes de S16) | 600 × 170 · centre | `pop` | S16 |
| `D.tableBois(g, o)` | table vue de face : plateau en légère plongée (bande `o.y0`…`o.y1`), chant, panneau jusqu'à 1420, veinage | `o.x0`…`o.x1` · monde | — | S17, S20, S21 |
| `D.sachetPreuve(g, o)` | sachet transparent à zip, étiquette ficelée « Beweisstück », reflet (`o.shine`) | 150 × 110 · centre | reflet qui glisse, étiquette `m.pend` | S17 |
| `D.chemise(g)` | chemise cartonnée « Akte » fermée par un élastique | 150 × 84 · centre | coin qui bat | S17 |
| `D.chevalet(g)` | chevalet à trois pieds + panneau blanc | 370 × 440 (+ pieds jusqu'au sol) · centre du panneau | `m.pend` idle 0,4° | S18 |
| `D.schemaHopital(g, o)` | mini-coupe sur le panneau : contour d'immeuble 260 × 300, trois barres d'étage « >100 Patienten », « Intensiv », « Notfall » (20 px), DEUX petits médecins (`o.p` = phase de leur va-et-vient entre les barres), un téléphone avec « ? » sur le toit, dessous « 2 Ärzte · 1 Nacht » (22 px) ; `o.mark` (0–1) = cercle au surligneur jaune autour de l'immeuble | 300 × 380 · centre | les deux points qui font la navette (1,2 s), le cercle | S18 |
| `D.baguette(g)` | baguette de présentation | 190 × 6 · poignée | tape deux fois | S18 |
| `D.ailes(g)` · `D.aureole(g)` | paire d'ailes au trait (plumes en 3 rangs) · anneau jaune | 120 × 80 · 60 × 16 · centre | flottent, l'auréole respire | S18 |
| `D.billet(g, o)` | billet « 500 » : cadre double, valeur aux coins, rosace hachurée | 92 × 50 · centre | vole en arc, se pose, la pile s'écrase de 2 px | S20 |
| `D.porteSalle(g, o)` | porte de salle : chambranle, battant ouvert à 80° (parallélogramme étroit), jour jaune pâle derrière | 160 × 540 · bas-centre | battant `m.pend` (3°), lumière | S20 |

### I. Règle médicale (S22)

| Fonction | Dessin | Taille · ancrage | Parties mobiles | Scènes |
|---|---|---|---|---|
| `D.regle(g, o)` | règle graduée verticale, `o.len`, graduations SANS chiffres, mot « max. » en haut de la courte | 22 × `len` · bas | `growY` | S22 |
| `D.tubeSang(g, o)` | grand tube de prélèvement à bouchon, étiquette « Labor », sang qui monte (`o.fill`, aplat hachuré foncé — pas de rouge) | 60 × 190 · centre | remplissage, bulles (`m.dust`) | S22 |
| `D.cadranHoraire(g, o)` | cadran de la règle : 12 graduations, `o.n` (0–12) marques jaunes allumées l'une après l'autre, aiguille unique | r 105 · centre | marques, aiguille | S22 |
| `D.caseEtage(g, o)` | petite pièce encadrée (une case de la coupe) : `D.litMini("its")` × 2 + `D.moniteurMini`, éclairée si `o.on` | 320 × 270 · coin haut-gauche | s'allume, respire | S22 |
| `D.pictoMedecin(g)` | pictogramme de médecin (tête ronde + blouse) | 24 × 40 · pieds | petit salut à chaque marque | S22 |

### J. Intro et carte

| Fonction | Dessin | Taille · ancrage | Parties mobiles | Scènes |
|---|---|---|---|---|
| `D.badge(g)` | cordon JAUNE en deux brins (du hors-champ haut jusqu'au mousqueton), mousqueton métallique, porte-badge plastique à coins ronds (500 × 587, fente 70 × 16, bandeau jaune 45 px avec « Dienstausweis » 22 px), code-barres en bas à gauche | cordon 220 + carte 500 × 587 · le mousqueton | tout pend au mousqueton (`m.pend`) | S4 |
| `D.pinFenetre(g, o)` | épingle jaune dont la tête est une petite fenêtre à croisillon (`o.on` : vitre jaune + rayons) | 48 × 72 · la pointe | tombe (`slide` + `wobble`), s'allume | S5 |
| `D.fenetreVille(g)` | petite fenêtre éteinte (grise) pour les autres villes | 14 × 14 · centre | — | S5 |
| `D.coupure(g)` | coupure de journal aux bords déchirés : « Ärzte Zeitung » (30 px), « 01.10.2010 » (22 px), 3 lignes grises, 1 ligne surlignée | 300 × 190 · centre | `drop` + `m.pend` 3° | S5 |

---

## 3. HUD propre à l'épisode

Tout est dans `c.hud` (repère écran), recréé dans chaque scène par une aide `nuit(c, o)` (scènes de nuit) ou
`jour(c, o)` (tribunal, règle) et piloté par des fonctions du TEMPS GLOBAL : d'une scène à l'autre, rien ne saute.

**Socle (inchangé)** : barre de progression `#prog` (gauche 100, haut 236, 600 × 14), logo `#brand` (droite 100,
haut 222), masqué pendant l'intro.

**Bandeau de nuit** — `nuit(c, { horloge, jauge, mention })`, ordre des calques : `D.bandeauNuit` → nuage → étoiles →
lune → jauge → horloge → mention → pastille.

| Élément | Position (écran) | Comportement |
|---|---|---|
| bandeau | 0–1080 × 0–540, opaque | fixe ; tout ce qui passe au-dessus de l'écran y 540 est caché : dans les scènes de nuit, l'image utile va de **y 545 à 1440** |
| lune | centre (300, 340), r 30 | S6 : elle se lève de y 420 à 340 en 1,0 s à partir de `b6` ; halo qui respire ; figée à la scène muette |
| étoiles (7) | (470, 318) (556, 352) (616, 300) (668, 372) (716, 300) (400, 384) (236, 392) | scintillent ; S6 : apparaissent une à une (0,08 s d'écart) à partir de `b6+0.2` ; figées à la scène muette |
| nuage | y 392, de x 1020 à 60, 9 px/s | passe DERRIÈRE la lune, l'horloge et la pastille |
| **jauge de sucre** | tube x 118–142, y 318–500 ; réservoir centre (130, 512) r 20 ; mot « السكر » (28 px gras) centre (200, 345) ; accolade + « normal » (18 px) à droite du tube, y 442–468 | absente avant `b8@السكر` ; `pop` 0,35 s à `b8@السكر` avec le niveau 0,12 ; monte à 0,93 de `b8@وطالع` à `b8@وطالع+0.5` (dépassement à 0,97 puis retour) ; ensuite 0,93 ± 0,012 (ménisque) ; à `b9@Insulin+0.3` : tremble 0,6 s (±0,015, 9 Hz), **ne descend pas** ; à `b11@والسكر` : trois battements (échelle 1,08) ; figée à `quiet` (voir S15), `grey` 0 → 1 en 0,6 s |
| **horloge sans chiffres** | centre (912, 356), r 50 | absente avant `b6` ; `pop` 0,4 s à `b6` ; angle de la petite aiguille `H(t) = 290 + 1,5 · (t − T(b6)) + 60 · Σ E.inOut(prog(t, saut_i, 0.6))` ; grande aiguille = 12 · H (elle fait deux tours pendant un saut) ; sauts : `b10@8` (« جوج »), `b11+0.1`, `b14@2` (« الساعات ») ; pendant un saut : secteur jaune entre l'ancienne et la nouvelle position, qui s'efface en 0,8 s ; la dérive ralentit de `b14@end` à `b14@end+0.9` puis **s'arrête** (aiguilles grises à `quiet`) |
| étiquette « + 2 h » | petite pastille jaune, texte `+ 2 h` (36 px), centre (790, 372) | `pop` à `saut_i+0.15`, disparaît à `saut_i+1.3` |
| « Uhrzeiten unbekannt » | texte 18 px, gris encre, centre (912, 424) sous l'horloge | visible avec l'horloge |
| **mention** | texte 22 px (`de light`, `#55524B`), aligné à gauche, x 106, ligne de base y 286 | selon la scène : `laut Presse` · `laut Presse · Rekonstruktion` · `Regel von heute · Keine Rechtsberatung` ; grossit une fois (échelle 1,25, 0,4 s) quand la voix dit « حسب الصحافة » (`b5@8`, `b13@حسب`, `b16`) |
| **pastille du haut** | centre (540, 440), UNE à la fois, taille ≤ 32, largeur ≤ 600 (x 240–840) ; l'arabe finit vers y 515 | `pop` sur le mot, `hide` 0,15–0,2 s avant la suivante |

**Mentions de vérité — lesquelles, et lesquelles jamais** : `laut Presse` (toute l'affaire) et `Rekonstruktion`
(tout ce qui est mis en scène, de S6 à S20) sont les deux seules mentions de l'affaire. **« laut Urteil » n'apparaît
jamais** : aucun texte du jugement n'est publié. **« nicht rechtskräftig » non plus** : on ne sait pas si le jugement
est définitif → `Rechtskraft unbekannt` (S21 et affiche). Pour la règle : `Regel von heute` et `Keine Rechtsberatung`.

Scènes de jour : `jour(c, { mention })` pose seulement la mention (même place) ; les pastilles du haut restent à
(540, 440) : dans ces scènes, le mur ne porte AUCUN objet derrière le rectangle écran x 230–850, y 400–525.

**Aides de transition**
- `eclat(c, at)` : dans le HUD de la scène qui ENTRE, `D.eclatFenetre` au centre (540, 864) — le centre de l'`iris` —
  échelle 0,3 → 3,2, opacité 0,55 → 0 en 0,35 s.
- `extinction(c, at)` : dans le HUD de la scène qui SORT, rectangle plein écran bleu nuit, opacité 0 → 0,22 pendant
  les 0,2 s qui précèdent `at` (= le repère de début de la scène suivante).

**Contrôle de la teinte** : sur une capture de chaque scène de nuit, compter les pixels « bleus » (b > r + 25) :
moins de 5 %. Si c'est plus, espacer les hachures du bandeau (pas 26 → 32).

---

## 4. Scène par scène

**26 scènes** (25 + l'intro). Durées = minutage provisoire (`timings.js`) ; tout est calé sur des repères, donc tout se
recale seul quand la vraie voix arrive. Frise :

| Bloc | Scènes | Beats | Temps provisoire |
|---|---|---|---|
| Accroche | S1 · S2 · S3 | b1–b4 | 0,00 → 10,65 |
| Intro | S4 | i1–i3 | 10,65 → 19,55 |
| Carte | S5 | b5 | 19,55 → 23,08 |
| La nuit | S6 · S7 · S8 · S9 · S10 · S11 · S12 · S13 · S14 | b6–b14 | 23,08 → 54,29 |
| Silence | S15 | (après b14) | 54,29 → 56,81 |
| Tribunal, sanction, statut | S16 · S17 · S18 · S19 · S20 · S21 | b15–b20 | 56,81 → 76,64 |
| Règle | S22 · S23 · S24 | b21–b24 | 76,64 → 88,47 |
| Dernière phrase | S25 · S26 | b25 | 88,47 → 92,02 |
| Affiche | — | — | 92,02 → 97,7 |

Dans chaque scène : `const k = kit(c); k.bg(); c_ = c; const m = M.of(c);` puis, pour les scènes de nuit,
`const hud = nuit(c, {…})`. Sauf mention contraire : caméra STD + poussée lente (`ease: "lin"`).
Aides à écrire une fois dans `story.js` : `facade(c, m, o)`, `coupe(c, m, o)`, `box(c, m, o)`, `chambre(c, m, o)`,
`poste(c, m, o)`, `salle(c, m, o)` (mise en place FIXE de chaque lieu, réutilisée telle quelle), `mini(who, fn)`
(personnage à 0,42 avec `lw: 1.8`), `courir(node, etapes)` (voir S7).

Dans TOUTE scène de nuit, le haut de l'écran (y < 540) appartient au bandeau : le décor commence à monde y 592
(pièces) ou y 587 (toit de la coupe), et rien d'utile ne monte plus haut.

**Ce qui vit dans chaque mise en place** (valeurs à reprendre telles quelles ; chaque scène ne redit que ce qui lui
est propre) :

| Mise en place | Élément | Mouvement | Amplitude | Période / vitesse |
|---|---|---|---|---|
| bandeau | étoiles | échelle | 0,7 ↔ 1,15 | 1,6 à 2,9 s, une phase par étoile |
| bandeau | halo de lune · nuage | opacité · défilement | 0,15 ↔ 0,35 · — | 3,2 s · 9 px/s |
| bandeau | horloge | dérive de la petite aiguille · balancement sur le clou | 1,5°/s · 0,5° | continu · 1,3 rad/s |
| bandeau | jauge | ménisque | ± 1,2 % du tube | 2,2 rad/s |
| façade | 3 vitres hors chiffres · croix · lampe d'auvent · papillons | opacité | 0,2 ↔ 0,45 · 0,86 ↔ 1 · 0,7 ↔ 1 · 6 points | 2,4 s · irrégulier (≈ 9 Hz) · irrégulier · 10 px/s |
| coupe | lueurs des pièces | opacité | ± 6 % | 2,3 · 2,6 · 2,9 · 3,1 · 3,4 s (une par pièce) |
| coupe | lits | hauteur de la bosse | ± 3 % | 3,0 s, phases décalées de 0,7 s |
| coupe | moniteurs · tableau d'appel | tracé qui défile · lampes | — | 1 écran / 1,2 s · une lampe au hasard / 0,9 s (toutes à 2 Hz dès `b10`) |
| coupe | panneaux · antenne · `NSW` | `m.pend` idle · éclat · marche | 0,8° · — · — | 1,3 rad/s · 0,15 s toutes les 1,4 s · 30 px/s |
| coupe | ambulance | gyrophare · tangage | — · 1,2 px | 4 Hz · 30 rad/s |
| box | lampe + poussière · rideau · perfusion | `m.pend` idle · `m.sway` · gouttes | 0,8° · 0,9° · — | 16 px/s (10 grains) · 3,1 s · 1 goutte / 0,5 s |
| box | patient · `AZ` | poitrine · respiration, clignement | ± 4 px · ± 2 px | 1,6 s (S8) puis 2,6 s (S9) · 2,4 s, un clignement / 3,4 s |
| chambre | store · cordon · plafonnier | va-et-vient · `m.pend` · `m.pend` | ± 1,5 px · 1,2° · 0,6° | 2,8 s · 1,3 rad/s |
| chambre | lumière · perfusion · patient | opacité · gouttes · poitrine | ± 10 % · — · ± 3 px | 2,1 s · 1 goutte / 0,6 s · 3,4 s |
| poste | combiné · cadre · tableau · lucarne | `m.pend` | 14° → idle 2,5° · idle 0,6° · idle 0,5° · — | amorti 2,2 · — · — · 2 Hz |
| salle | poussière · suspensions · dos · juge · rayon | grains · `m.pend` · épaules · tête · opacité | 12 grains · 0,9° · ± 1,5 px · ± 2° · ± 8 % | 9 px/s · 1,3 rad/s · 2,6 s · 4 s · 3 s |

---

### S1 — « 7500 » écrit en fenêtres (accroche A)

- **Beats** b1–b2 · 0,00 → 4,97 (5,0 s) · **Lieu** : devant l'hôpital, la nuit · **Entrée** : `cut` (première image).
- **À comprendre** : 7 500 € d'amende pour homicide par négligence, contre une médecin de 32 ans — selon la presse.
- **Caméra** : `{ at: 0, s: 1.0, cx: 540, cy: 950 }` → `{ at: 0.2, s: 1.03, d: 2.3, ease: "lin" }` →
  `{ at: "b2-0.05", s: 1.6, cx: 330, cy: 1245, d: 0.5 }` (zoom sur elle, sujet complet : écran X 408–566, Y 728–1199).
  `c.kick("b1@0+0.55", 0.06)`, `c.kick("b1@5", 0.05)`.
- **Couches (arrière → avant)** : papier · `D.trottoir` (110, 1380) · `D.facade` (525, 1380) · les 105 vitres ·
  `D.enseigneToit` (250, 620) · halo de la lampe de l'auvent + 6 papillons de nuit (`m.dust({ x: 470, y: 1150, w: 110, h: 60 }, 6, { speed: 10, r: 2.2 })`) ·
  totem, banc · `AZ` · la feuille · HUD (bandeau sans horloge ni jauge, mention, pastilles).
- **Positions (monde)** : vitre (colonne c 0–14, rang r 0–6) = x 171 + 48 c, y 656 + 76 r, 34 × 52. Chiffres « 7500 » :
  4 chiffres de 3 × 5 vitres sur les rangs 1 à 5, colonnes 0–2 · 4–6 · 8–10 · 12–14 (colonnes 3, 7, 11 = vides) ;
  matrices (haut → bas) : 7 = `111 001 001 001 001` · 5 = `111 100 111 001 111` · 0 = `111 101 101 101 111`
  (42 vitres allumées ; zone x 171–877, y 732–1088). `AZ` : pieds (300, 1392), échelle 0,62.
- **Construction** : `0` la façade pousse du sol (`m.build(…, 0, "growY", { pivot: [525, 1380], dur: 0.35 })`) ;
  `0.2` l'enseigne tombe (`"drop"`, dist 90, dur 0,3) ; **`b1@0` (premier mot) : les chiffres s'allument** colonne par
  colonne, de gauche à droite — vitre (c, r) à `b1@0 + 0.035·c + 0.02·(r−1)`, avec un grésillement de 0,12 s
  (allumée / éteinte toutes les 0,04 s) avant de rester jaune `#F8CE4E` ; chiffre complet à ≈ 0,8 s.
- **Vie** : étoiles, lune, nuage (bandeau) ; trois vitres hors chiffres — (r0, c2), (r0, c11), (r6, c7) — respirent en
  jaune pâle (opacité 0,2 ↔ 0,45, période 2,4 s) ; croix de l'enseigne et lampe de l'auvent qui grésillent ; voyant
  d'antenne ; papillons ; `AZ` respire et cligne ; la feuille tremble (±2°, 9 Hz) à partir de `b1@5`.
- **Réactions** : à `b1@5` toutes les vitres des chiffres s'éteignent 0,07 s puis se rallument (un battement) ; à
  l'entrée du zoom, les vitres restent allumées derrière elle.
- **Personnage** : `AZ` `outfit: "jacket"`, `view: "three-quarter"`, `facing: 1`, présente dès l'image 0. Elle tient la
  feuille à deux mains devant la poitrine (`reachR [40, -235], bendR -1`, `reachL [4, -228], bendL 1` — à régler avec
  `Persona.util.rig` : mains à 90–130 px des épaules). `D.feuilleJugement` (petite, échelle 0,62) suit `out.handR`.
  Expressions : voir l'arc (b1, b2). Le recul à `b1@0+0.3` est un mouvement du buste (`torsoLean -6`, `headTilt -4`,
  0,25 s), PAS une translation. Larmes à `b2@عندها`.
- **Textes (HUD, centre (540, 440))** — une pastille à la fois :
  1. `Geldstrafe · 7 500 €` / « غرامة » — jaune, 32 — `pop` `b1@1`, `hide` `b1@4`
  2. `fahrlässige Tötung` / « القتل غير العمد » — grise, 32 — `pop` `b1@5`, `hide` `b2@حكم`
  3. `Assistenzärztin · 32 Jahre (Urteil 2010)` / « طبيبة فطور الاختصاص · 32 عام نهار الحكم » — 26 — `pop`
     `b2@طبيبة`, reste jusqu'à la fin (l'âge est celui du JUGEMENT : les mots « Urteil 2010 » ne se retirent pas)
- **Mention** : `laut Presse`, visible dès 0,05 s. **Bulles** : aucune.
- **Affiche** : figer à `b1@5+0.3` (chiffres + pastille 2).

### S2 — Deux pour plus de cent (accroche B)

- **Beats** b3 · 4,97 → 7,39 (2,4 s) · **Lieu** : le même · **Entrée** : `cut`.
- **À comprendre** : cette nuit-là, deux médecins pour plus de cent patients.
- **Caméra** : `{ at: "b3", s: 1.0, cx: 540, cy: 950 }` → `{ at: "b3+0.1", s: 1.04, d: 2.2, ease: "lin" }` ;
  `c.kick("b3@7", 0.06)`.
- **Couches** : comme S1 (même `facade(c, m)`, sans construction) + les deux médecins + le grand « 2 ».
- **Les vitres** : à `b3` les chiffres de S1 sont encore allumés ; `b3+0.1` tout s'éteint en vague du bas vers le haut
  (0,15 s) ; de `b3+0.25` à `b3@7+0.1` les 105 vitres s'allument UNE À UNE dans l'ordre de lecture (≈ 62 par seconde) :
  une vitre = un patient. À la fin, six vitres clignotent lentement (lampes d'appel).
- **Compteur** : pastille jaune du HUD, largeur fixe 520, dont le texte suit la vague — `1 Patient`, `2 Patienten`, …
  (`c.tick`, nombre = min(100, vitres allumées)) — et se fige sur `über 100 Patienten` à `b3@7` ; l'arabe
  « كثر من 100 مريض » apparaît à `b3@7`. `pop` de la pastille à `b3+0.3`.
- **Personnages** : à `b3@2` (« جوج ») la porte vitrée s'ouvre (0,2 s) et les DEUX sortent en marchant (0,5 s, vrai
  cycle `PP.walk`, cadence ×2) : `AZ` (`scrubs`, bip à la hanche) de (525, 1392) à (470, 1392), `KOL` (`coat`) de
  (525, 1392) à (585, 1392), échelle 0,42 ; puis de face, tête levée vers l'immeuble (`look2 [0, -0.9]`). Arc : b3.
  À `b3@8` ils se regardent.
- **Texte dans l'image** : disque jaune r 62, centre (300, 1290), chiffre `2` (110 px) — `pop` à `b3@3` (« أطباء »),
  `wobble`.
- **Vie** : bandeau ; vitres qui clignotent ; papillons ; les deux respirent, lui tient un bloc sous le bras.
- **Mention** : `laut Presse`. **Affiche** : fin de scène (façade pleine, « 2 », `über 100 Patienten`).

### S3 — Le test qu'on fait tous (accroche C)

- **Beats** b4 · 7,39 → 10,65 (3,3 s) · **Lieu** : une pièce de garde, la nuit (pièce en coupe) · **Entrée** : `iris`
  0,3 s + `eclat(c, "b4")` ; `extinction(c, "b4")` dans S2.
- **À comprendre** : on lui a reproché de s'être fiée à un test banal, que tout soignant fait chaque jour — lequel ?
  (réponse en b12). Boucle ouverte, AUCUNE question au spectateur, aucun mot allemand.
- **Caméra** : `{ at: "b4", s: 1.0, cx: 540, cy: 950 }` → `{ at: "b4+0.2", s: 1.04, cx: 520, d: 2.8, ease: "lin" }`.
- **Couches** : papier · `D.salleNuit({ lit: 1 })` · `D.fenetreNuit` centre (215, 750), 170 × 230 · `D.tacheLumiere`
  au sol `[(170,1300),(380,1300),(470,1400),(210,1400)]` jaune 0,22 · `D.plafonnier` (650, 592) · une petite
  `D.fenetreNuit` haute, centre (760, 705), 120 × 150 (`o.jour` 0–1 : vitre de nuit hachurée → vitre claire de jour) · trois `D.silhouetteSoignant` pieds (590, 1300) `kind 0`, (700, 1300) `kind 2`, (810, 1300) `kind 1`,
  hauteurs 400 / 370 / 410 · `AZ` pieds (250, 1300), échelle 1,0 · la feuille (main gauche, pendante) · l'appareil caché
  (main droite) · trait de liaison main (322, 1075) → bord de la loupe (440, 890) · `D.loupe` centre (500, 800), r 105,
  contenant `D.lecteur({ mystery: 1 })` à l'échelle 1,6 et un `?` (90 px) à (500, 822) · texte « كل نهار » · HUD.
- **Construction** (t0 = `b4`) : `t0+0.05` le store descend (`blind` 0 → 0,25) et le plafonnier tombe (`"drop"`, dist 120)
  puis se balance ; `t0+0.12` la petite fenêtre pousse du mur (`"grow"`) ; `b4@تاقت-0.1` la loupe jaillit
  (`pop` 0,35) ; `b4@كنديروه`, `+0.12`, `+0.24` les trois silhouettes montent derrière elle (`"rise"`, dist 220, dur 0,4) ;
  `b4@7` (« كل ») le texte « كل نهار » s'écrit de droite à gauche (0,35 s) et la petite fenêtre fait trois jours en accéléré :
  elle s'allume puis s'éteint trois fois (`jour` 0 → 1 → 0 à `b4@7`, `+0.14`, `+0.28` — la lumière d'une fenêtre, le
  geste de l'épisode). **Pas d'éphéméride qui s'effeuille** : c'est le dispositif d'AKTE 06 (retiré le 26.11.2026).
- **Vie** : nuage et lune dans la fenêtre, store qui bat, tache de lumière qui vacille, plafonnier (idle), le `?` bat
  (échelle 1 ↔ 1,12, 2 Hz) à partir de `b4@التيست`, les silhouettes flottent ±3 px, la loupe flotte ±3 px.
- **Personnage** : `AZ` `scrubs`, trois-quarts `facing: 1`. À `b4` elle regarde la feuille (main gauche, `look2 [-0.3, 0.9]`).
  À `b4@تاقت` elle lève l'appareil (bras droit : de pendant à `reachR [70, -215], bendR -1` en 0,3 s) et le regarde.
  À `b4@كنديروه` elle tourne la tête vers les silhouettes (`look2 [0.9, 0]`). À `b4@8` (« نهار ») face caméra. Arc : b4.
- **Texte dans l'image** : « كل نهار » — arabe gras 40 px, centre (760, 835).
- **Mention** : `laut Presse`. **Pastille** : aucune. **Bulles** : aucune.
- **Affiche** : fin de scène.

### S4 — Intro : le badge de Yassine au bout de son cordon

- **Beats** i1–i3 · 10,65 → 19,55 (8,9 s) · **Entrée** : `iris` 0,3 s · `summary: false` · logo `#brand` masqué (socle).
- **À comprendre** : qui parle, et pourquoi s'abonner. Texte i1–i3 identique à AKTE 03 (déjà enregistré).
- **Caméra** : `{ at: "i1", s: 1.05, cx: 540, cy: 790 }` → `{ at: "i2", s: 1.0, cx: 540, cy: 800, d: 0.5 }`.
  Avec cette caméra, monde y 1124 = écran 1293 à `i3` et 1297 en fin de scène : **tout le bloc finit au-dessus de l'écran y 1300.**
- **Couches** : papier · `m.rays(540, 560, { op: 0.12, R: 520, speed: 6, at: "i1" })` · groupe `bg` = `D.badge`
  (mousqueton en (540, 300), carte x 290–790, y 318–905) + tout ce qui est SUR la carte (enfants du même nœud, pour
  se balancer ensemble) · pastilles sous la carte · boutons.
- **Sur la carte (monde)** : bandeau jaune y 345–390 (« Dienstausweis », 22 px) ; **photo** `assets/portrait.png`
  découpée en rond r 140, centre (540, 560), cerne d'encre 5,5 px, **anneau jaune** r 162 (matière `MAT.yellow`) et
  ombre ; **icône Instagram** dessinée (carré arrondi 72 px + rond jaune + point) accrochée en bas à droite de
  l'anneau, centre (645, 665) ; ruban **« Yassine »** (`k.ribbon`, taille 50) centre (540, 775) — jamais « Dr. » ;
  petit glyphe Instagram (36 px) à (432, 856) + **« @dr.aguilo »** (38 px) centre (560, 868) ; code-barres (décor)
  x 310–400, y 880–898.
- **Sous la carte (fixes)** : pastille de rôle centre (540, 950), taille 24 ; deux boutons en pilule, centre y 1078,
  hauteur 76 : **cœur + « j'aime »** centre (350, 1078), largeur 230 (cœur `PE.props.heart` à gauche du mot) ;
  **« + s'abonner »** centre (670, 1078), largeur 300. Bas du bloc : y 1124.
- **Construction et animation** : `i1` le badge tombe du haut (`m.build(bg, "i1", "drop", { dist: 420, dur: 0.5 })`) puis
  pend (`m.pend(bg, "i1+0.45", 6, [540, 300], { damp: 1.6, freq: 5, idle: 0.5 })`) ; `i1@ياسين` le ruban « Yassine »
  (`wipe` 0,35) ; `i1@ياسين+0.15` « @dr.aguilo » (`fade`) + glyphe (`pop`) ; `i1@فألمانيا` pastille
  `Arzt in Deutschland` / « طبيب فألمانيا » (`pop`), `hide` à `i2@حقيقية` ; `i2@حقيقية+0.15` pastille jaune
  `echte Fälle · deutsche Gerichte` / « قصص حقيقية من المحاكم », `hide` à `i3` ; `i3` et `i3+0.1` les deux boutons
  (`pop` 0,3) ; **`i3@j'aime`** : le cœur se remplit de jaune et bat (échelle +12 %, 0,35 s), la pilule devient jaune ;
  **`i3@abonne`** : le bouton passe à `✓ abonné` sur fond jaune ; `c.kick` 0,05 sur ces deux mots.
- **Vie** : balancement résiduel du badge (0,5°), rayons qui tournent, icône Instagram qui flotte (±3 px), reflet qui
  glisse sur le plastique du porte-badge toutes les 2,5 s.
- **Textes exacts** : `Yassine` · `@dr.aguilo` · `Dienstausweis` · `j'aime` · `+ s'abonner` → `✓ abonné`.

### S5 — Carte de nuit : une seule fenêtre allumée

- **Beats** b5 · 19,55 → 23,08 (3,5 s) · **Entrée** : `iris` 0,3 s + `eclat(c, "b5")`.
- **À comprendre** : Krefeld, nuit du 1er novembre 2008 ; le récit vient de la presse.
- **Caméra** : `{ at: "b5", s: 1.0, cx: 540, cy: 950 }` → `{ at: "b5@Krefeld", s: 1.3, cx: 420, cy: 960, d: 0.45 }` →
  `{ at: "b5@هاد", s: 1.0, cx: 540, cy: 950, d: 0.5 }`.
- **Couches** : papier · 4 étoiles monde (170, 660) (900, 720) (150, 1240) (860, 1060) · carte `drawDE(c, 540, 970, 92, "b5")`
  (Allemagne de x 275 à 799, y 630 à 1320 ; Berlin en repère à (707, 849)) · 6 `D.fenetreVille` éteintes, sans nom
  (Hamburg, Hannover, Leipzig, Frankfurt, Stuttgart, München par `geo(lon, lat)`) · `m.rays(313, 910, { n: 10, R: 80, op: 0.3, speed: 12, at: "b5@Krefeld+0.35" })` ·
  `D.pinFenetre` sur Krefeld `geo(6.56, 51.33)` ≈ (313, 958) · `D.coupure` · texte arabe · HUD (bandeau seul).
- **Construction** : `b5` la carte (`fade` 0,3) ; les 6 fenêtres éteintes (`pop`, 0,05 s d'écart, à partir de `b5+0.15`) ;
  `b5@Krefeld` l'épingle tombe (`slide(…, 0, -160, 0.4, "back")` + `wobble`) ; `b5@Krefeld+0.35` **sa fenêtre s'allume**
  (jaune) + `m.ripple(313, 958, …, { R: 110 })`, répété à `+1.65` et `+2.95` ; `b5@كيما` la coupure de journal tombe
  (`"drop"`, dist 300, dur 0,5) centre (700, 1210), penchée de −4°, puis `m.pend` 3° ; `b5@8` (« الصحافة ») le texte
  « حسب الصحافة » s'écrit de droite à gauche (0,4 s).
- **Vie** : étoiles (monde et bandeau), lueur de l'épingle qui respire, ondes, coupure qui se stabilise.
- **Textes** : UNE pastille `Krefeld (NRW) · Nacht zum 1. November 2008` / « ليلة 1 نونبر 2008 » (*glose à
  valider*), 26 — `pop` `b5@Krefeld`, reste jusqu'à la fin ;
  sur la coupure : `Ärzte Zeitung` (30 px), `01.10.2010` (22 px) ; sous la coupure, détaché : « حسب الصحافة »
  (arabe gras 40 px, centre (700, 1350)).
- **Mention** : `laut Presse` (elle grossit une fois à `b5@8`). **Personnages** : aucun.
- **Affiche** : fin de scène.

### S6 — La coupe : la nuit commence, ils sont deux

- **Beats** b6 · 23,08 → 27,58 (4,5 s) · **Lieu** : l'hôpital en coupe · **Entrée** : `iris` 0,3 s + `eclat(c, "b6")` ;
  `extinction(c, "b6")` dans S5.
- **À comprendre** : la nuit commence ; de garde, deux Assistenzärzte : elle et un collègue.
- **Caméra** : `{ at: "b6", s: 1.0, cx: 540, cy: 950 }` → `{ at: "b6+0.1", s: 1.03, d: 1.1, ease: "lin" }` →
  `{ at: "b6@4-0.1", s: 1.6, cx: 660, cy: 800, d: 0.6 }` (zoom sur eux deux : écran X 390–690, Y 672–1081) ;
  `c.kick("b6@هي", 0.05)`.
- **Mise en place `coupe(c, m, { build: t0 })`** — couches : papier · `D.trottoir` · `D.lueurPiece` × 5 (une par pièce)
  · `D.coupe` · `D.enseigneToit` (250, 620) · mobilier · figurante · personnages · bip · étiquettes · HUD.
  Mobilier (monde) :
  - Zimmer (étage 2, gauche) : `D.litMini({ kind: "vide" })` centre (270, 880) ; `D.tabouretMini` (350, 880) ;
    **pièce ÉTEINTE** dans S6 et S7 (personne n'y est encore).
  - Stationen : deux `D.litMini("station")` centres (465, 880) et (565, 880) ; `D.rufanlage` centre (510, 705) ;
    `D.panneauEtage("Stationen")` accroché en (680, 640) ; zone libre pour les personnages x 610–755.
  - Intensivstation : trois `D.litMini("its")` centres (250, 1130), (430, 1130), (610, 1130), chacun avec un
    `D.moniteurMini` au-dessus (y 960) ; `D.panneauEtage("Intensiv")` en (690, 890) ; zone libre x 670–755.
  - Liegendanfahrt : vide (l'ambulance arrive en S7) ; rideau roulant fermé.
  - Notfallambulanz : `D.litMini("station")` (lit d'examen) centre (540, 1380) ; `D.panneauEtage("Notfall")` en (690, 1140).
- **Construction** (t0 = `b6`) : `t0` trottoir (`wipe` 0,3) ; `t0+0.05` la structure pousse du sol (`"growY"`, pivot
  [525, 1380], dur 0,55) ; `t0+0.30` l'enseigne tombe (`"drop"`, dist 120, dur 0,4) ; `t0+0.40 / 0.48 / 0.58 / 0.68`
  les pièces s'allument de bas en haut (Liegendanfahrt, Notfall, Intensiv, Stationen : deux grésillements de 0,18 s) ;
  `t0+0.5 → 1.0` le mobilier tombe en cascade (lits `"drop"` dist 80, 0,05 s d'écart ; moniteurs `"grow"` depuis le
  mur ; panneaux `"swing"` puis `m.pend`).
- **HUD** : `nuit(c, { horloge: true, jauge: false, mention: "laut Presse · Rekonstruktion" })`. À `b6` : l'horloge
  (`pop`), la lune se lève, les étoiles apparaissent une à une.
- **Vie** : lueurs des pièces qui vacillent ; lits qui respirent ; tracés des moniteurs ; voyant d'antenne ; panneaux
  qui pendent ; `NSW` (opacité 0,5) pousse son chariot dans l'Intensivstation de x 520 à x 300 en 7 s (cycle de marche
  lent, fonction du temps global : elle continue en S7).
- **Personnages** : à `b6@4` (« جوج ») `AZ` sort de la porte de l'escalier (766, 880) et marche jusqu'à (650, 880) en
  0,6 s ; `KOL` suit 0,15 s plus tard jusqu'à (715, 880) ; profil `facing: -1` pendant la marche, puis de face.
  Échelle 0,42. Arc : b6 (lunettes à `b6@فطور`, signe à `b6@هي`, hochement à `b6@وزميل`).
- **Textes** : pastille `Nachtdienst` / « الخدمة ديال الليل », 30 — `pop` `b6+0.3`, `hide` `b6@4+0.1` ; pastille jaune
  `2 Assistenzärzte` / « أطباء فطور الاختصاص », 30 — `pop` `b6@Assistenzärzte`. Dans l'image : `D.etiquetteQui`
  « هي » (26 px), corps centré x 650, pointe sur sa tête (650, 695) — `pop` `b6@هي` ; « زميل ديالها » (26 px),
  corps centré x 752, pointe (715, 695) — `pop` `b6@وزميل`.
- **Mention** : `laut Presse · Rekonstruktion`. **Affiche** : fin de scène.

### S7 — Trois charges, étage par étage

- **Beats** b7 · 27,58 → 31,80 (4,2 s) · **Lieu** : la coupe (identique, déjà construite) · **Entrée** : `cut`.
- **À comprendre** : à eux deux, plus de 100 patients, PLUS les soins intensifs, PLUS les urgences — dans l'ordre de la
  phrase, un étage par « وزيد ».
- **Caméra** (descente lente, verticale) : `{ at: "b7", s: 1.0, cx: 540, cy: 935 }` →
  `{ at: "b7+0.1", s: 1.04, cx: 540, cy: 975, d: 3.6, ease: "lin" }` ; `c.kick("b7@3", 0.05)`,
  `c.kick("b7@Intensivstation", 0.05)`, `c.kick("b7@المستعجلات", 0.06)`.
- **Le cadre d'étage** (trait jaune 6 px, à main levée) : étage 2 = rectangle (158, 636, 606 × 248), `pop` `b7@1`,
  `hide` `b7@5` ; étage 1 = (158, 886, 606 × 248), `pop` `b7@Intensivstation`, `hide` `b7@9` ; étage 0 =
  (158, 1136, 606 × 248), `pop` `b7@المستعجلات`. Le panneau de l'étage passe au jaune au même repère.
- **Ce qui réagit** : `b7@3` (« 100 ») les 8 lampes du tableau d'appel s'allument en vague (une toutes les 0,06 s) ;
  `b7@Intensivstation` le moniteur du lit de droite clignote ; `b7@المستعجلات-0.2` le rideau roulant se lève (0,25 s)
  et **l'ambulance entre** de x −200 à x 300 (0,9 s, `E.out`), gyrophare jaune 4 Hz, roues qui tournent.
- **Personnages** (`courir(node, etapes)` : position interpolée d'étape en étape, cycle `PP.walk` à cadence ×2,6,
  `torsoLean 10`, petit saut de 6 px par marche dans l'escalier, profil dans le sens de la course) :
  - départ (650, 880) / (715, 880).
  - **`b7@5`** (1er « وزيد ») : `AZ` → porte (766, 880) 0,2 s → (792, 880) → (866, 1005) 0,3 s → (792, 1130) 0,3 s →
    (640, 1130) 0,2 s ; `KOL` part 0,12 s après elle et s'arrête à (715, 1130).
  - **`b7@9`** (2e « وزيد ») : `AZ` → (792, 1130) → (866, 1255) → (792, 1380) → (640, 1380) en 1,0 s ; `KOL` 0,12 s
    après, jusqu'à (715, 1380). Ils se tournent vers l'ambulance (`facing: -1`).
  - Ondes jaunes du bip (`m.ripple`, R 30) à `b7@5` et `b7@9`. Arc : b7.
- **Textes (HUD)** : `über 100 Patienten` / « كثر من 100 مريض » — jaune, 30 — `pop` `b7@1`, `hide` `b7@5` ;
  `Intensivstation` / « الإنعاش » — 32 — `pop` `b7@Intensivstation`, `hide` `b7@9` ;
  `Notfallambulanz` / « المستعجلات » — 32 — `pop` `b7@المستعجلات` (orthographe corrigée de la coquille de la source).
- **Vie** : celle de la coupe + gyrophare + tangage de l'ambulance. **Mention** : `laut Presse · Rekonstruktion`.
- **Affiche** : fin de scène (les trois étages allumés, l'ambulance, les deux en bas).

### S8 — Urgences : on amène un homme de 47 ans

- **Beats** b8 · 31,80 → 34,99 (3,2 s) · **Lieu** : box de la Notfallambulanz, échelle 1 · **Entrée** : `iris` 0,3 s +
  `eclat(c, "b8")` ; `extinction(c, "b8")` dans S7.
- **À comprendre** : un homme de 47 ans, diabétique, arrive avec un sucre extrêmement élevé.
- **Caméra** : `{ at: "b8", s: 1.0, cx: 540, cy: 950 }` → `{ at: "b8+0.1", s: 1.03, d: 2.0, ease: "lin" }` →
  `{ at: "b8@وطالع", s: 1.1, cx: 580, cy: 990, d: 0.4 }`.
- **Mise en place `box(c, m, { build: t0 })`** (monde) — couches : `D.salleNuit({ lit: 1, rail: 1120 })` ·
  `D.portesBattantes` bas-gauche (110, 1300) (ouverture x 110–250, y 760–1300) · `D.panneauEtage("Notfallambulanz")`
  (230 × 38) accroché en (420, 600) · `D.armoireMur` coin (715, 640) · `D.lampeExamen` fixée en (560, 660), tête en
  (520, 760) + poussière dans le cône (`m.dust({ x: 380, y: 800, w: 280, h: 300 }, 10, { cone: true })`) ·
  `D.rideauBox` haut (925, 592) · `D.chariotUrgence` sol (800, 1300) · `D.potence` sol (668, 1300) (site en Y ≈ (668, 965)) ·
  `SAN` · `D.brancard({ flip: true })` sol, centre (430, 1300) (x 210–650, dessus du matelas y 1120) · `D.gisant`
  (tête à DROITE, x ≈ 585–640, `tenue: "ville"`) · `AZ` pieds (735, 1300), échelle 0,95 · tubulure potence → avant-bras
  (`c.dyn`, suit `gisant.iv`) · HUD.
- **Construction** (t0 = `b8`) : `t0` la lampe tombe (`"drop"`, dist 160, 0,4 s) puis `m.pend` 5° ; `t0+0.10` panneau
  (`"swing"`) et rideau ; `t0+0.15` étagère (`"drop"`, dist 240) ; `t0+0.20` chariot (`"right"`, dist 200) ;
  **`t0+0.05 → t0+0.95` le brancard entre en roulant** de x −260 à x 430 (`E.out`, roues `roll`, rebond final de 4 px),
  poussé par `SAN` (profil `facing: 1`, vrai cycle de marche, de x −530 à x 170, mains sur la barre) ; les battants
  reviennent (`m.pend` 8°) ; lueur du gyrophare sur le chambranle (3 Hz), éteinte à `t0+1.6`.
- **Personnages** : `AZ` entre par la droite en marchant, de (830, 1300) à (735, 1300), `t0+0.2 → t0+0.7`
  (profil `facing: -1`, opacité 0 → 1 pendant les 0,2 premières secondes ; jamais plus à droite que x 830 : colonne
  des boutons), puis trois-quarts
  `facing: -1`, buste penché vers lui (`torsoLean 6`). `b8@عندو-0.1` : `SAN` lui tend `D.protocole` (bras tendu vers
  (640, 1010), 0,3 s), elle le prend (`reachR`) ; `b8@فيه+0.2` : `SAN` fait demi-tour et sort par la gauche en
  marchant (0,7 s, fondu sous les battants). `PAT` : œil mi-clos, main sur le ventre (`arm 0`), respiration rapide
  (période 1,6 s). Arc : b8. Le collègue n'est pas dans le box.
- **Textes (HUD)** : `Diabetiker · 47 Jahre` / « فيه السكر » — 30 — `pop` `b8@عندو`, `hide` `b8@وطالع-0.15` ;
  `Blutzucker: „extrem erhöht“` / « السكر طالع بزاف » — jaune, 28 — `pop` `b8@وطالع`.
  **La jauge** apparaît à `b8@السكر` et monte à `b8@وطالع` (voir § 3).
- **Vie** : lampe et poussière, rideau, gouttes de la perfusion, respiration du patient, clignements, bandeau, horloge.
- **Mention** : `laut Presse · Rekonstruktion`. **Affiche** : fin de scène.

### S9 — Urgences : le coma ; l'insuline

- **Beats** b9 · 34,99 → 37,72 (2,7 s) · **Lieu** : le même box (`box(c, m)` sans construction) · **Entrée** : `cut`.
- **À comprendre** : peu après, il tombe dans le coma ; la médecin lui donne de l'insuline. **Deux faits posés l'un
  après l'autre, dans l'ordre des phrases de la source — AUCUNE flèche, aucun trait, aucun « donc » entre les deux.**
- **Caméra** : `{ at: "b9", s: 1.1, cx: 580, cy: 990 }` → `{ at: "b9@كيدخل", s: 1.12, cx: 560, cy: 1000, d: 0.4 }`
  (patient entier : écran X 157–639) ; `c.shake("b9@coma", 6, 0.35)`.
- **Ce qui se passe** : `b9+0.2` elle pose le bloc-notes sur le chariot. **`b9@كيدخل`** : l'œil du patient se ferme
  (0,3 s), sa tête roule (`roll` 0 → 1), **son bras glisse du ventre et pend** au bord du matelas (`arm` 0 → 1 en
  0,45 s, puis balancement amorti ±6°), bracelet jaune bien visible ; respiration plus lente (période 2,6 s).
  **`b9@والطبيبة`** : elle se tourne vers la potence, prend `D.seringue` sur le chariot ; **`b9@كتعطيه`** : elle
  l'approche du site en Y (main vers (668, 960), à ≈ 110 px de l'épaule) et pousse le piston (`push` 0 → 1 en 0,5 s).
- **Jauge** : reste à 0,93 ; à `b9@Insulin+0.3` elle tremble, elle ne descend pas.
- **Textes (HUD)** : `hyperglykämisches Koma` / « كوما ديال السكر » — 28 — `pop` `b9@coma`, `hide` `b9@كتعطيه` ;
  `Insulin` / « الأنسولين » — 32 — `pop` `b9@Insulin`. Les deux pastilles occupent la même place l'une après l'autre.
- **Personnages** : `AZ` — arc b9 ; `sweat`. `PAT` — œil fermé. **Mention** : `laut Presse · Rekonstruktion`.
- **Affiche** : figer à `b9@Insulin+0.3`.

### S10 — La coupe : seulement toutes les deux heures environ

- **Beats** b10 · 37,72 → 40,91 (3,2 s) · **Lieu** : la coupe · **Entrée** : `iris` 0,3 s + `eclat(c, "b10")` ;
  `extinction(c, "b10")` dans S9.
- **À comprendre** : avec autant de patients, elle ne peut revenir le voir qu'environ toutes les deux heures. Le
  spectateur voit la distance : lui tout en haut à gauche, elle qui dévale deux étages.
- **Caméra** : `{ at: "b10", s: 1.0, cx: 540, cy: 950 }` → `{ at: "b10+0.1", s: 1.04, d: 3.0, ease: "lin" }` ;
  `c.kick("b10@8", 0.05)`.
- **État de la coupe** (`coupe(c, m, { patient: true })`, sans construction) : le **Zimmer est ALLUMÉ**, avec
  `D.litMini({ kind: "zimmer" })` centre (270, 880), `D.jaugeMurale` (385, 800) — AUCUN moniteur dans sa chambre —
  (niveau = jauge du bandeau), `D.tabouretMini` (350, 880). Liegendanfahrt vide, rideau fermé. Notfall : le lit
  d'examen est occupé (`kind: "station"`). `KOL` (0,42) est en bas, à (715, 1380), penché sur ce lit.
- **Personnage — le trajet de `AZ`** (`courir`, 0,42, `sweat`), enchaîné à partir de **`b10@المرضى`** :
  (330, 880) → porte (405, 880) → (760, 880) : 0,75 s · escalier (792, 880) → (866, 1005) → (792, 1130) : 0,55 s ·
  (700, 1130) : 0,15 s · **pause 0,25 s** (elle se penche vers le moniteur du lit de droite, qui clignote) ·
  (792, 1130) : 0,12 s · escalier → (866, 1255) → (792, 1380) : 0,55 s · (640, 1380) : 0,2 s (total 2,57 s).
  Avant : debout près du lit, à (330, 880) ; à `b10` son bip clignote + ondes jaunes.
  `D.trace` : le pointillé jaune de son trajet se dessine derrière elle et s'efface 0,6 s plus tard.
- **Ce qui réagit** : à `b10` toutes les lampes d'appel se mettent à clignoter (tableau des Stationen, moniteur de
  l'Intensivstation, voyant du rideau roulant) ; à `b10@كل` le rideau se lève et une ambulance entre (0,9 s) ;
  **à `b10@8` (« جوج ») : premier saut de l'horloge, « + 2 h »** (0,6 s) — pendant le saut, toutes les lueurs de
  pièces baissent à 60 % et remontent deux fois, les lits respirent quatre fois plus vite (accéléré).
- **Textes (HUD)** : `nur rund alle zwei Stunden` / « غير كل جوج سوايع تقريبا » — 30 — `pop` `b10@كل`.
- **Vie** : celle de la coupe ; la mini-jauge et la jauge du bandeau battent ensemble ; `NSW` traverse l'Intensivstation.
- **Mention** : `laut Presse · Rekonstruktion`. **Affiche** : fin de scène.

### S11 — L'ascenseur : elle n'est pas près de lui ; le sucre ne redevient pas normal

- **Beats** b11 · 40,91 → 43,73 (2,8 s) · **Lieu** : la coupe (même état que la fin de S10) · **Entrée** : `cut`.
- **À comprendre** : les heures passent ; lui est seul en haut, elle est deux étages plus bas ; sa glycémie ne se
  normalise pas. Le spectateur voit ce qu'elle ne voit pas.
- **Caméra (vrai ascenseur, zoom 1,7, seul `cy` change)** : `{ at: "b11", s: 1.7, cx: 300, cy: 782 }` (le Zimmer :
  écran X 292–720, Y 684–1117) → `{ at: "b11@وهي", s: 1.7, cx: 300, cy: 1180, d: 0.45 }` (la Liegendanfahrt, deux
  étages plus bas : 716 px de course à l'écran) → `{ at: "b11@والسكر", s: 1.7, cx: 300, cy: 782, d: 0.45 }`.
- **Dans le Zimmer** : le patient seul (mini), le tabouret VIDE à côté du lit, la mini-jauge haute qui bat, la pièce
  allumée. **À `b11+0.1` : deuxième saut de l'horloge, « + 2 h ».**
- **En bas** (visible de `b11@وهي+0.2` à `b11@والسكر+0.2`) : ambulance centre (270, 1380), gyrophare ; `AZ` à
  (470, 1380) dans le passage vers la Notfallambulanz, penchée sur `D.brancardMini` centre (545, 1380), `focused`,
  `sweat` ; `KOL` à (400, 1380), `worried` ; `D.etiquetteQui` « هي » (26 px), pointe (470, 1195), `pop` à
  `b11@وهي+0.45`.
- **Retour en haut** : à `b11@والسكر` la jauge du bandeau bat trois fois (échelle 1,08), la mini-jauge clignote ;
  la respiration du patient ralentit (période 3,4 s).
- **Textes (HUD)** : `nicht normalisiert` / « ما رجعش normal » — jaune, 32 — `pop` `b11@كيرجعش`.
- **Mention** : `laut Presse · Rekonstruktion`. **Affiche** : fin de scène.
- **Contrôle** : à 1,7 aucun personnage ni lit coupé par le cadre ; tout ce qui est au-dessus de l'écran y 540
  disparaît sous le bandeau (c'est voulu).

### S12 — La chambre : le test rapide, sans laboratoire

- **Beats** b12 · 43,73 → 47,40 (3,7 s) · **Lieu** : la chambre du patient, échelle 1 · **Entrée** : `iris` 0,3 s +
  `eclat(c, "b12")` ; `extinction(c, "b12")` dans S11.
- **À comprendre** : elle ne mesure qu'avec un test rapide — imprécis — et sans analyse de laboratoire. C'est la
  réponse à la boucle de l'accroche : l'appareil caché se dévoile.
- **Caméra** : `{ at: "b12", s: 1.0, cx: 540, cy: 950 }` → `{ at: "b12@Schnelltest", s: 1.15, cx: 560, cy: 900, d: 0.4 }`
  (elle + la loupe) → `{ at: "b12@بلا", s: 1.15, cx: 560, cy: 1000, d: 0.4 }` (ses mains + la table) ;
  `c.kick("b12@Schnelltest", 0.06)`.
- **Mise en place `chambre(c, m, { lit: 1, build: t0 })`** (monde) — couches : `D.salleNuit({ lit: 1 })` ·
  `D.fenetreNuit` centre (520, 725), 200 × 250 (x 420–620, y 600–850) · `D.plafonnier` (650, 592) allumé ·
  `D.potence` sol (150, 1300), sa chambre compte-gouttes bien visible à (150, 1010) · AUCUN moniteur (chambre ordinaire) · `D.porteChambre` bas-gauche (770, 1300)
  (x 770–880, y 860–1300) · `AZ` · `D.litHopital` sol, centre (410, 1300) (x 170–650, dessus du matelas y 1105) ·
  `D.gisant` (tête à GAUCHE, x ≈ 215–300, `tenue: "chemise"`, `eye: "closed"`, `arm 0`) · mains de `AZ` par-dessus
  (`only: "arms"`) · `D.tableChevet` sol (700, 1300) (x 660–740, dessus y 1150) · `D.tubeLabo` bas-centre (700, 1150) ·
  trait de liaison · `D.loupe` centre (800, 730), r 110 · HUD.
- **Construction** (t0 = `b12`) : `t0+0.05` plafonnier (`"drop"`) ; `t0+0.10` store ; `t0+0.15` la potence roule en place (`"left"`,
  dist 120) ; `t0+0.20` table de chevet (`"right"`, dist 160) ; `t0+0.10` la loupe jaillit (`pop` 0,35).
- **Personnage** : `AZ` (0,95) est DERRIÈRE le lit, pieds (500, 1300) (le lit cache ses jambes), trois-quarts
  `facing: -1`, buste penché ; main gauche sur le poignet du patient (`reachL` vers (455, 1090)), main droite avec le
  lecteur au bout de son doigt (`reachR` vers (478, 1078)) — mains à 100–130 px des épaules. Arc : b12. À
  `b12@laboratoire` elle jette un regard vers le tube (`look2 [-0.8, 0.4]` : dx négatif = vers l'arrière du personnage,
  donc vers la table, à droite de l'image) pendant 0,4 s, puis revient au lecteur.
- **Dans la loupe** (contenu centré (800, 740), échelle 1,5) : le bout de la moufle du patient avec une goutte, et
  `D.lecteur`. De `t0+0.1` à `b12@Schnelltest` : l'appareil est encore l'aplat caché de l'accroche (`mystery: 1`, « ? »).
  **`b12@Schnelltest` : il se dévoile** (`mystery` 1 → 0 en 0,25 s), la bandelette entre (`strip` 0 → 1, 0,3 s), la
  goutte est bue (`drop`), l'écran affiche trois points (`disp: "dots"`). **`b12@سريع`** : résultat en 0,2 s —
  `disp: "approx"` (« ≈ ? », jamais un chiffre, jamais « HI »). **`b12@دقيق`** : l'affichage tremble et se dédouble
  (`jit` 0 → 1) : imprécis.
- **Le tube** : `b12@بلا` la caméra descend vers la table ; `b12@laboratoire` le tube VIDE et son bon « Labor »
  prennent un voile gris (`dim` 0 → 1 en 0,4 s) ; il reste dans son portoir.
- **Textes (HUD)** : `Schnelltest` / « التيست السريع » — jaune, 32 — `pop` `b12@Schnelltest`, `hide` `b12@وماشي` ;
  `ungenau · keine Laboranalyse` / « ماشي دقيق · بلا laboratoire » — 28 — `pop` `b12@دقيق`.
- **Vie** : gouttes de la perfusion (1 goutte / 0,6 s), store, lune dans la fenêtre, lumière du plafonnier,
  respiration du patient (période 3,4 s), clignements, points de l'écran, jauge du bandeau (haute), horloge.
- **Mention** : `laut Presse · Rekonstruktion`. **Affiche** : figer à `b12@دقيق+0.3`.

### S13 — Le téléphone : l'Oberarzt n'est plus joignable

- **Beats** b13 · 47,40 → 51,12 (3,7 s) · **Lieu** : le poste de nuit, échelle 1 · **Entrée** : `iris` 0,3 s +
  `eclat(c, "b13")` ; `extinction(c, "b13")` dans S12.
- **À comprendre** : l'Oberarzt de garde — leur responsable — n'est plus joignable, selon la presse ; on ne sait pas
  pourquoi. **On ne montre ni l'Oberarzt, ni une chambre, ni qui a appelé** : seulement un combiné qui pend.
- **Caméra** : `{ at: "b13", s: 1.0, cx: 540, cy: 950 }` → `{ at: "b13+0.1", s: 1.03, d: 2.6, ease: "lin" }` →
  `{ at: "b13@بقاش", s: 1.12, cx: 550, cy: 930, d: 0.4 }`.
- **Mise en place `poste(c, m, { build: t0 })`** (monde) — couches : `D.salleNuit({ lit: 1 })` · `D.plafonnier`
  (430, 592) · `D.listeGarde` (petit) centre (310, 745) (x 190–430, y 640–850) · `D.telephoneMural` centre (540, 785)
  (x 485–595, y 700–870) · pointillé téléphone (595, 760) → cadre (675, 720) · `D.cadreAbsent` centre (760, 720)
  (x 675–845, y 625–815, plaque `Oberarzt` y 819–851) · `D.cordon` de (540, 870) au combiné · `D.combine` attaché en
  (540, 870), longueur du cordon 170 (centre du combiné ≈ (540, 1060)) · `AZ` pieds (290, 1300) · `KOL` pieds
  (760, 1300) · bulle · HUD.
- **Construction** (t0 = `b13`) : `t0+0.05` le tableau de garde tombe (`"drop"`, dist 220) + `m.pend` 4° ; `t0+0.12`
  le téléphone pousse du mur (`"grow"`, pivot [540, 785]) ; `t0+0.20` le cadre tombe (`"drop"`, dist 260) + `m.pend` 5° ;
  dès `t0+0.3` **le combiné pend et se balance** au bout de son cordon (`m.pend(…, "b13+0.3", 14, [540, 870], { damp: 2.2, idle: 2.5 })`).
- **Ce qui réagit** : la lucarne du tableau de garde clignote (`"ring"`) de `b13+0.3` à `b13@بقاش`, puis passe au
  hachuré gris (`"dead"`) ; trois points jaunes courent sur le pointillé vers le cadre (période 0,5 s) de `b13+0.4` à
  `b13@7` et s'éteignent aux deux tiers du chemin ; à `b13@بقاش` le « ? » du cadre bat ; à `b13@joignable` la note
  `Grund unbekannt` s'écrit dans le bas du cadre.
- **Bulle** (la sonnerie dans l'écouteur, pas une parole) : `m.speech({ x: 430, y: 1010, w: 150, h: 84, tip: [522, 1078], at: "b13@الطبيب", until: "b13@7" })`
  + `m.typing(430, 1014, "b13@الطبيب+0.15", "b13@7")` ; à `b13@7` (« ما ») la bulle se dégonfle : personne.
- **Personnages** : `AZ` (0,95, trois-quarts `facing: 1`) et `KOL` (0,95, trois-quarts `facing: -1`) de part et
  d'autre, bras le long du corps ; **aucun des deux ne tient le combiné, aucun ne parle.** Arc : b13.
- **Textes (HUD)** : `Oberarzt (diensthabend)` / « الطبيب المسؤول » — 30 — `pop` `b13+0.1`, `hide` `b13@7` ;
  `nicht mehr zu erreichen` / « ما بقاش joignable » — jaune, 30 — `pop` `b13@بقاش`. Dans le cadre : `Oberarzt`
  (24 px, plaque) ; `Grund unbekannt` (20 px, y 795).
- **Vie** : combiné et cordon, cadre et tableau qui pendent, lucarne, points de la bulle, respiration, bandeau.
- **Mention** : `laut Presse · Rekonstruktion` (elle grossit une fois à `b13@حسب`). **Affiche** : fin de scène.

### S14 — La coupe : seuls ; les heures passent ; une lumière s'éteint

- **Beats** b14 + le début du silence · 51,12 → `b14@end+1.1` (54,29) (3,2 s) · **Lieu** : la coupe · **Entrée** :
  `iris` 0,3 s + `eclat(c, "b14")` ; `extinction(c, "b14")` dans S13.
- **À comprendre** : ils restent seuls, à deux, dans tout l'immeuble ; les heures passent ; et la lumière de SA
  chambre s'éteint.
- **Caméra** : `{ at: "b14", s: 1.0, cx: 540, cy: 950 }` → `{ at: "b14+0.1", s: 0.94, d: 1.2, ease: "lin" }` (on recule :
  ils sont encore plus petits) → `{ at: "b14@ومن", s: 1.7, cx: 300, cy: 782, d: 0.7 }` (l'ascenseur remonte au Zimmer).
- **État** : `coupe(c, m, { patient: true })` ; `AZ` à (640, 1130) et `KOL` à (715, 1130), immobiles, tête basse (ils
  respirent, clignent) ; autour d'eux toutes les lampes d'appel clignotent.
- **Déroulé** : `b14@بوحدهم` ruban du TITRE dans le HUD ; **`b14@2` (« الساعات ») : troisième saut de l'horloge,
  « + 2 h »** (accéléré des lueurs comme en S10) ; `b14@ومن` le ruban disparaît, la caméra monte ; `b14@بعد` pastille
  `kurz darauf`. Puis la voix se tait :
  - battements de plus en plus espacés de la JAUGE (celle du bandeau et sa petite sœur `D.jaugeMurale` dans le
    Zimmer, échelle 1,08 pendant 0,12 s) : `b14@end-0.70`, `b14@end-0.05`, `b14@end+0.65` — calés sur les derniers
    tics de l'horloge (voir `son/plan_son.md`). Pas de moniteur, pas de bip : la ligne plate est le dispositif
    d'AKTE 02 / 03 (et d'AKTE 09 avec sa ligne) ;
  - `b14@end → +0.9` : l'horloge ralentit et s'arrête ; la jauge cesse de battre ; la pastille disparaît à `+0.3` ;
  - `b14@end+0.55` : la lueur du Zimmer vacille deux fois (60 % pendant 0,08 s) ; **`b14@end+0.95` : elle s'éteint**
    (voile jaune → hachures bleu nuit). Toutes les autres pièces restent allumées.
- **Textes (HUD)** : ruban `TITRE` (« بوحدهم فالليل », Lalezar 56, `k.ribbon(TITRE, 540, 440, { size: 56, parent: c.hud })`) —
  `wipe` de droite à gauche à `b14@بوحدهم`, `hide` à `b14@ومن` ; pastille `kurz darauf` / « شوية من بعد » — 28 —
  `pop` `b14@بعد`, `hide` `b14@end+0.3`.
- **Mention** : `laut Presse · Rekonstruktion`. **Affiche** : fin de scène (une seule pièce éteinte).

### S15 — Scène muette : il est mort

- **Sans voix** · `b14@end+1.1` → `b15` (54,29 → 56,81 ; 2,5 s) · **Lieu** : la chambre (même `chambre(c, m, { lit: 0 })`
  qu'en S12, lumière ÉTEINTE) · **Entrée** : `fade` 0,4 s.
- **À comprendre** : le patient meurt peu après. Jour et heure inconnus : **la fenêtre reste de nuit, aucune aube,
  aucun store qui s'éclaire.**
- Repères locaux : `quiet` = `b14@end+2.0`. `live(t) = 1 − E.inOut(prog(t, quiet, 0.7))` multiplie TOUTES les
  amplitudes (store, cordon, gouttes, nuage de la fenêtre, halo de lune, étoiles du bandeau, respiration).
- **Caméra** : `{ at: "b14@end+1.1", s: 1.0, cx: 540, cy: 950 }` → `{ at: "b14@end+1.2", s: 1.05, cx: 560, cy: 980, d: 2.4, ease: "lin" }`
  (on pousse vers la DROITE du monde : elle, à la porte, reste à l'écran X ≤ 893, hors de la colonne des boutons).
- **Différences avec S12** : plafonnier éteint, mur `#ECEEF2`, hachures bleu nuit dans les coins ; `D.tacheLumiere`
  de lune `[(430,850),(610,850),(700,1300),(480,1300)]` (papier pâle cerné de bleu nuit) ; pas de loupe ; sur la
  table de chevet, le lecteur posé à côté du tube toujours VIDE ; personne près du lit.
- **Déroulé** : `b14@end+1.50` DERNIÈRE goutte dans la chambre compte-gouttes de la perfusion et dernier battement
  de la jauge du bandeau, respiration à peine visible ; **`quiet`** : plus une goutte (`drop` figé), plus de
  respiration, le bras du patient glisse et pend (`arm` 0 → 1 en
  0,5 s — on voit le bracelet jaune), l'horloge du bandeau est arrêtée (aiguilles grises), la jauge se décolore ;
  `b14@end+2.2` : **`AZ` apparaît dans l'embrasure** (`fade` 0,4), pieds (820, 1300), échelle 0,95, trois-quarts
  `facing: -1`, main sur le chambranle (`reachR` vers (775, 1010)), `shock` → `sad` à `+2.8`, tête basse, `tears 0.5` ;
  `b14@end+2.3` : la couleur s'éteint (`c.layer.style.filter = grayscale(0 → 0.85)` en 1,0 s) ;
  `b14@end+2.45` : le texte s'écrit.
- **Textes (HUD, bas de l'écran — il n'y a pas de sous-titre pendant le silence)** : « مات · عندو 47 عام » —
  Lalezar 72, centre X 540, ligne de base Y 1470, `wipe` de droite à gauche 0,5 s ; dessous
  `„Der Patient verstarb kurz darauf.“ — laut Presse` — 26 px, ligne de base Y 1535, `fade` 0,3 s à `b14@end+2.7` ;
  les deux disparaissent à `b15` (0,2 s).
- **Mention** : `laut Presse · Rekonstruktion` (elle à la porte). **Aucune famille, aucune infirmière.**
- **Affiche** : fin de scène.

### S16 — Tribunal vu du fond : deux accusés

- **Beats** b15 · 56,81 → 59,79 (3,0 s) · **Lieu** : salle d'audience, de JOUR, vue du fond · **Entrée** : `iris`
  0,35 s + `eclat(c, "b15", { fort: true })` (échelle jusqu'à 4, opacité 0,7 : le jour revient). Plus de bandeau.
- **À comprendre** : en 2010, les deux Assistenzärzte sont accusés devant un tribunal de Krefeld.
- **Caméra** : `{ at: "b15", s: 1.0, cx: 540, cy: 950 }` → `{ at: "b15+0.1", s: 1.04, d: 2.6, ease: "lin" }`.
- **Mise en place `salle(c, m, { build: t0, accuses: 2 })`** (monde) — couches : `D.salleAudience` ·
  `D.fenetreHaute` centres (220, 730) et (850, 730) (x 150–290 et 780–920, y 560–900) · rayons de jour
  (`D.tacheLumiere` depuis la fenêtre gauche, opacité 0,10) + `m.dust({ x: 240, y: 620, w: 300, h: 420 }, 12)` ·
  `D.suspension` × 2 accrochées en (185, 300) et (895, 300) (hors de la largeur des pastilles) · `RIC` pieds
  (540, 955), échelle 0,62 (tête y 688–770) · `D.estrade` bas-centre (540, 1000) (pupitre x 330–750, dessus y 800) ·
  `D.tableDefense({ w: 430 })` sol (465, 1200), plateau y 1100 · `D.dos` × 2, sol (350, 1290) et (580, 1290) ·
  `D.chaiseDos` × 2 aux mêmes x (par-dessus le bas des corps) · `D.barre` (110, 1300) · HUD.
  `D.dos` gauche : `{ hair: "boucle-fonce", glasses: true, veste: "blazer" }` (elle) ; droite :
  `{ hair: "court-blond", veste: "veste" }` (lui). Assis : sommet de tête y ≈ 941.
- **Construction** (t0 = `b15`) : `t0+0.05` fenêtres (`"growY"`) et rayons ; `t0+0.10` estrade (`"drop"`, dist 300) ;
  `t0+0.15 / 0.22` suspensions (`"drop"` + `m.pend` 6°) ; `t0+0.30` le juge se redresse derrière son pupitre
  (`"rise"`, dist 120) ; `t0+0.30` table (`"rise"`) ; `t0+0.40 / 0.52` chaises + accusés (`"rise"`, dist 200) ;
  `t0+0.50` la balustrade (`"drop"`, dist 160).
- **Personnages** : `RIC` assis, `focused`, lit, puis lève les yeux vers eux à `b15@قدام` ; aucune parole. Elle :
  `bow 0.3`, tourne un peu la tête vers lui à `b15@متهمين` (`turn 0.3`). Lui : droit, hausse légèrement les épaules à
  `b15@قدام`. Les deux respirent (épaules ±1,5 px).
- **Textes (HUD)** : `D.dossierCarte` centre (540, 405), 600 × 170 (y 320–490), `pop` `b15` — ligne 1
  `2010 · ein Gericht in Krefeld` (30 px, base y 372) ; lignes 2–3 (20 px, base y 418 et 446, `fade` `b15+0.5`) :
  `Todesursache (laut Presse): Hirn- und Lungenödem,` / `„zentrales Regulationsversagen“` ; sous la carte, détaché :
  « محكمة فـKrefeld » (arabe gras 28 px, base y 528). **Jamais « Amtsgericht », aucun Aktenzeichen.**
  Dans l'image : pastille `zwei Angeklagte` / « جوج متهمين » — 28 — centre (465, 850), `pop` `b15@متهمين`.
- **Vie** : poussière dans les rayons, suspensions, respiration, clignements du juge.
- **Mention** : `laut Presse · Rekonstruktion`. **Affiche** : fin de scène.

### S17 — Le reproche : les pièces sur la table

- **Beats** b16 · 59,79 → 63,15 (3,4 s) · **Lieu** : la même salle, contre-champ (on voit ENFIN son visage) ·
  **Entrée** : `cut`.
- **À comprendre** : selon la presse, on lui a reproché de s'être fiée au test rapide et de ne pas avoir assez agi.
  C'est le reproche de l'accusation, pas une phrase du tribunal : aucun juge dans ce plan, aucune bulle.
- **Caméra** : `{ at: "b16", s: 1.0, cx: 540, cy: 950 }` → `{ at: "b16@Schnelltest", s: 1.12, cx: 520, cy: 1000, d: 0.35 }`.
- **Couches** (monde) : `D.salleAudience` (mur + lambris) · au fond, petite porte fermée x 700–820, y 640–1000 ·
  deux rangs de dossiers de bancs du public (hachurés) y 1030–1100 · `D.barre` reculée (y 1060–1150) · rayon de jour
  + poussière · `AZ` pieds (280, 1380), échelle 1,0, `outfit: "jacket"`, trois-quarts `facing: 1` (tête y 950–1080) ·
  `D.tableBois({ x0: 110, x1: 960, y0: 1170, y1: 1260 })` (elle est derrière : la table cache ses mains) · sur le
  plateau : `D.sachetPreuve` + `D.lecteur` dedans, centre (540, 1212) ; `D.tubeLabo` couché, centre (690, 1222) ;
  `D.chemise` « Akte » centre (800, 1212) · HUD. `KOL` est hors champ.
- **Déroulé** : `b16` la mention grossit (« حسب الصحافة ») ; **`b16@Schnelltest`** : le sachet se soulève et grossit
  (de (540, 1212) à (560, 965), échelle 1 → 1,6, 0,4 s, `E.back`), reflet qui glisse sur le plastique, étiquette
  ficelée `Beweisstück · Schnelltest` (22 px) qui pend ; **`b16@وما`** : le tube VIDE se redresse et monte (de (690, 1222) à (740, 1030), échelle
  1,5) avec sa petite étiquette `Labor: keine Analyse` (20 px). Ombres douces sur la table sous les deux objets.
- **Personnage** : arc b16 (yeux baissés → regarde le sachet → bouche qui tremble, `tears 0.3`, pas de sanglot).
- **Textes (HUD)** : UNE pastille — `nicht ausreichend gehandelt` / « ما دارتش اللي خاص » — jaune, 30 — `pop`
  `b16@وما` (le mot « Schnelltest » est porté par l'étiquette du sachet : pas de pastille de 0,6 s).
- **Vie** : poussière, respiration, clignements, reflet du sachet, étiquettes qui pendent, coin de la chemise qui bat.
- **Mention** : `laut Presse · Rekonstruktion`. **Affiche** : fin de scène.

### S18 — L'expert : la faute de l'hôpital

- **Beats** b17 · 63,15 → 67,41 (4,3 s) · **Lieu** : la même salle, côté témoin · **Entrée** : `cut`.
- **À comprendre** : l'expert met en cause l'HÔPITAL : grave faute d'organisation.
- **Caméra** : `{ at: "b17", s: 1.0, cx: 540, cy: 950 }` → `{ at: "b17+0.1", s: 1.04, d: 4.0, ease: "lin" }` —
  PAS de zoom : la scène occupe toute la largeur utile (de la pastille de l'expert, x 150, à l'aile de l'ange, x 910) ;
  `c.kick("b17@schweres", 0.06)`, `c.kick("b17@Organisationsverschulden", 0.05)`.
- **Couches** (monde) : `D.salleAudience` (mur + lambris, SANS fenêtre dans ce cadrage) · rayon de jour venu du
  hors-champ gauche `[(110,300),(330,300),(700,1300),(380,1300)]` opacité 0,12 + poussière · `D.chevalet` centre du
  panneau (605, 900) (x 420–790, y 680–1120, pieds jusqu'à 1300) · `D.schemaHopital` centre (605, 890) · `GUT`
  pieds (250, 1300), échelle 1,0, trois-quarts `facing: 1`, `PP.point` · `D.baguette` de sa main (≈ (345, 1050)) au
  panneau (470, 930) · l'ange : `D.ailes` + `Persona.head` (réf. `PAT`, `expr: "sleep"`, échelle 0,5) + `D.aureole`,
  centre (850, 650), envergure des ailes 120 (x 790–910) · HUD.
- **Construction** : `b17` le chevalet tombe en place (`"drop"`, dist 320, 0,5 s) puis `m.pend` idle 0,4° ; `GUT` est
  déjà là (il respire, cligne) ; `b17@لام` l'ange apparaît (`fade` 0,5), puis flotte (±5 px, 3,2 s), auréole qui respire.
- **Déroulé** : sur le panneau, les deux petits médecins font la navette entre les trois barres (1,2 s par
  aller-retour) dès `b17+0.5` ; **`b17@السبيطار`** : un cercle au surligneur jaune se trace autour de l'immeuble
  (`mark` 0 → 1 en 0,5 s) ; **`b17@schweres`** : `GUT` tape deux fois le panneau avec la baguette (`+0` et `+0.25`),
  ses lèvres bougent jusqu'à `b17@Organisationsverschulden+0.9`.
- **Textes** : dans l'image, pastille `Gutachter` / « الخبير » — 30 — centre (250, 790), `pop` `b17`. HUD : pastille
  jaune de largeur fixe 575, taille 30, texte `schweres Organisationsverschulden` révélé en deux temps (le mot
  `schweres` à `b17@schweres`, le reste à `b17@Organisationsverschulden` en 0,7 s) ; arabe « غلط كبير فالتنظيم »
  à `b17@غلط`.
- **Vie** : navette des deux points, poussière, chevalet, ange, baguette. **Bulles** : aucune.
- **Mention** : `laut Presse · Rekonstruktion`. **Affiche** : fin de scène.

### S19 — Le verdict : une seule se lève

- **Beats** b18 · 67,41 → 71,35 (3,9 s) · **Lieu** : la salle vue du fond (`salle(c, m, { accuses: 2 })`, identique à
  S16, sans construction) · **Entrée** : `cut`.
- **À comprendre** : mais le tribunal la condamne, ELLE, pour homicide par négligence.
- **Caméra** : `{ at: "b18", s: 1.0, cx: 540, cy: 950 }` → `{ at: "b18@عليها", s: 1.12, cx: 500, cy: 960, d: 0.5 }`
  (elle debout, entière : écran X 238–475, Y 823–1347) ; `c.kick("b18", 0.05)`, `c.shake("b18@Tötung", 8, 0.35)`.
- **Déroulé** : `b18+0.2` le juge lève une feuille (`reachR` vers le haut, `D.feuilleJugement` à l'échelle 0,5 dans sa
  main) — il ne parle pas ; **`b18@عليها` : ELLE se lève, seule** (`stand` 0 → 1 en 0,5 s, `E.back`), lui reste
  assis et tourne la tête vers elle (`turn 0.5`) ; un rayon de jour de la fenêtre gauche se pose sur elle
  (`D.tacheLumiere` `[(290,600),(290,880),(430,1290),(270,1290)]`, opacité 0 → 0,25 en 0,4 s) + poussière ;
  **`b18@Tötung`** : ses épaules tombent (`slump` 0 → 1), sa tête aussi (`bow` 0,3 → 0,9), elle tremble 0,6 s
  (`shake`, ±1,5°, 8 Hz).
- **Textes** : HUD — `fahrlässige Tötung · § 222 StGB` / « القتل غير العمد » — jaune, 28 — `pop`
  `b18@fahrlässige`. Dans l'image — `32 Jahre · Urteil 2010` / « 32 عام نهار الحكم » — 24 — centre (320, 760),
  au-dessus de sa tête (debout : sommet y ≈ 853), `pop` `b18@يعني`. **Pas de tampon, pas de marteau, aucune phrase du juge.**
- **Vie** : poussière, suspensions, respiration, lui qui remue sur sa chaise.
- **Mention** : `laut Presse · Rekonstruktion`. **Affiche** : fin de scène (une debout, un assis).

### S20 — La sanction : les billets un à un, et l'autre sort libre

- **Beats** b19 · 71,35 → 74,52 (3,2 s) · **Lieu** : la même salle, devant une table · **Entrée** : `zoom` 0,3 s.
- **À comprendre** : elle : 7 500 € d'amende ; l'autre Assistenzarzt : acquitté. Les deux en même temps dans l'image.
- **Caméra** : `{ at: "b19", s: 1.0, cx: 540, cy: 950 }` → `{ at: "b19+0.1", s: 1.04, d: 2.8, ease: "lin" }` ;
  `c.kick("b19@1", 0.06)`.
- **Couches** (monde) : `D.salleAudience` (mur + lambris) · `D.porteSalle` bas-centre (770, 1300) (x 690–850,
  y 760–1300) + lumière du jour au sol (`D.tacheLumiere`, jaune 0,18) · `KOL` · `AZ` pieds (240, 1360), échelle 1,0,
  `outfit: "jacket"`, trois-quarts `facing: 1` (tête y 930–1060) · `D.tableBois({ x0: 110, x1: 610, y0: 1150, y1: 1240 })` ·
  la pile · les billets en vol · son avant-bras droit par-dessus (`only: "armR"`) · compteur · étiquettes · HUD.
- **Les billets** : 15 `D.billet` (15 × 500 = 7 500). Le billet j (0…14) quitte la liasse qu'elle tient en (300, 1085)
  à `b19@1 + 0.177·j`, vole 0,3 s en arc (sommet −40 px, rotation qui s'amortit) et se pose sur la pile en
  (470, 1195 − 5·j) ; la pile s'écrase de 2 px à chaque billet. Sa main fait un petit geste de distribution
  (`reachR` oscille de `[40, -235]` à `[95, -215]`, une fois par billet). Dernier billet posé ≈ `b19@1+2.78`.
  **Les billets ne vont vers personne** : aucune main, aucune caisse, aucune étiquette de destinataire.
- **Le compteur** : texte 64 px, centre (470, 1040), `0 €` → `500 €` → … → `7 500 €` (une marche par billet posé) ;
  au quinzième : surligneur jaune derrière + `c.kick("b19@1+2.8", 0.06)`.
- **Le collègue** : `KOL` (0,85, `outfit: "sweater"`) attend à (640, 1300), trois-quarts `facing: 1` ; à
  **`b19@Assistenzarzt`** il marche vers la porte, de (640, 1300) à (790, 1300) en 1,5 s (vrai cycle de marche, profil) ;
  à `b19@الآخر` il s'arrête 0,3 s et se retourne vers elle (trois-quarts `facing: -1`, `sad`) ; puis il passe la
  porte (opacité 1 → 0 entre x 770 et 800). Le battant bouge (`m.pend` 3°).
- **Textes** : HUD — `Geldstrafe` / « غرامة » — jaune, 32 — `pop` `b19@1`, `hide` `b19@Freispruch-0.1` ;
  `Freispruch · Gründe nicht veröffentlicht` / « براءة » — 26 — `pop` `b19@Freispruch`. Dans l'image, au-dessus de
  la porte : deux lignes de 22 px `zweiter angeklagter` (760, 690) / `Assistenzarzt` (760, 718), `pop`
  `b19@Assistenzarzt`, avec une petite flèche à main levée vers lui.
- **Personnage** : `AZ` — arc b19 (grimaces, larmes dès le 8e billet, `cry` au 15e).
- **Vie** : poussière, porte, lumière, pile qui tressaille. **Mention** : `laut Presse · Rekonstruktion`.
- **Affiche** : fin de scène (pile complète, `7 500 €`, la porte vide).

### S21 — Définitif ? La dernière ligne reste dans l'ombre

- **Beats** b20 · 74,52 → 76,64 (2,1 s) · **Lieu** : la table, en gros plan, sous la fenêtre de la salle · **Entrée** : `cut`.
- **À comprendre** : on ignore si ce jugement est définitif.
- **Caméra** : `{ at: "b20", s: 1.05, cx: 540, cy: 960 }` → `{ at: "b20@نهائي", s: 1.15, cx: 560, cy: 1080, d: 0.4 }`.
- **Couches** : `D.tableBois({ x0: 110, x1: 960, y0: 560, y1: 1420 })` (le plateau remplit l'image) ·
  `D.feuilleJugement({ big: true })` centre (520, 990), penchée de −3° (x 300–740, y 710–1270) · **l'ombre** : hachures
  bleu nuit clairsemées (un trait sur trois, opacité 0,5) sur toute la table et la feuille · **la lumière de la
  fenêtre** : `D.tacheLumiere` en forme de fenêtre à croisillon (parallélogramme 520 × 300 penché de −12°, papier
  clair, la croix du croisillon reste en ombre), dans laquelle les hachures disparaissent et l'encre de la feuille
  est pleine + poussière (`m.dust`, 8 grains) · le `?` · HUD.
- **Sur la feuille** : `URTEIL` (44 px) y 790 ; `Krefeld · 2010` (24 px) y 830 ; `fahrlässige Tötung` (28 px) y 900 ;
  `Geldstrafe: 7 500 €` (34 px, surligné) y 960 ; 4 lignes grises y 1010–1090 ; dernière ligne, seule en bas :
  `Rechtskraft:` (28 px) à x 330, y 1178, suivie de points de conduite jusqu'à x 700. **Aucun cadre de tampon, aucune
  loupe** (voir la note).
- **Déroulé** : `b20` la feuille tombe sur la table (`"drop"`, dist 200, 0,35 s), dans l'ombre ; `b20+0.15` la tache
  de lumière entre par le haut et DESCEND le long de la feuille : centre (520, 760) → (520, 880) en 0,35 s (elle
  éclaire `URTEIL`, `fahrlässige Tötung`) → (520, 1010) en 0,35 s (le montant surligné brille) ; à **`b20@واش`** elle
  glisse encore de 40 px, son bord bas s'arrête à y 1130 — juste AU-DESSUS de la ligne `Rechtskraft:` — et pâlit
  (un nuage : opacité 1 → 0,55 en 0,3 s) ; à **`b20@نهائي`** un `?` (80 px) jaillit au bout des points de conduite, en
  (745, 1170), DANS l'ombre (`pop` + `wobble`).
- **Textes (HUD)** : `Rechtskraft unbekannt` / « ما معروفش واش الحكم نهائي » — jaune, 30 — `pop` `b20@لقيناش`.
- **Vie** : la tache de lumière vacille (opacité ± 6 %, 2,3 s) et son nuage passe, poussière dans la lumière, coin
  de la feuille, `?` qui bat. **Mention** : `laut Presse`.
- **Note (26.11.2026)** : la première version (une loupe qui cherche, un cadre de tampon vide en pointillés avec
  le mot fantôme, un `?`) était, au cadre près, la scène « définitif ? » d'AKTE 04 et d'AKTE 07. Ici la réponse est
  donnée par le dispositif de l'épisode : la lumière d'une fenêtre, qui n'arrive pas jusqu'à la dernière ligne.
- **Affiche** : fin de scène.

### S22 — La règle médicale d'aujourd'hui (le médical expliqué en image)

- **Beats** b21–b22 · 76,64 → 81,38 (4,7 s) · **Lieu** : planche sur papier · **Entrée** : `zoom` 0,3 s.
- **À comprendre** : aujourd'hui, un coma diabétique = le laboratoire (le lecteur est une règle trop courte), et une
  surveillance au moins toutes les heures, en soins intensifs. Médecine générale d'aujourd'hui (Leitlinie 2023) —
  PAS l'expertise du procès.
- **Caméra** : `{ at: "b21", s: 1.0, cx: 540, cy: 900 }` → `{ at: "b22", s: 1.0, cx: 540, cy: 950, d: 0.5 }` ;
  `c.kick("b21@laboratoire", 0.05)`, `c.kick("b22@Intensivstation", 0.05)`.
- **Fond** : papier + `m.shapes({ seed: 5, pts: [[140, 1010], [940, 620], [930, 1010]], at: "b21+0.2" })`.
- **Rang 1 — « خاصو laboratoire »** (monde y 590–965) :
  - `D.lecteur` (échelle 1,5) centre (220, 800) ; mot `Schnelltest` (26 px) centre (220, 950) ;
  - **règle COURTE** `D.regle({ len: 170 })` bas (330, 900) (haut y 730, mot `max.`) ;
  - **colonne de sucre** `D.jauge({ h: 300 })`, réservoir centre (430, 915), tube de y 895 à 595 ; « السكر » (28 px)
    centre (430, 968) ;
  - **règle LONGUE** `D.regle({ len: 300 })` bas (520, 900) (haut y 600) ;
  - `D.tubeSang` centre (640, 800) ; mot `Labor` (26 px) centre (640, 950) ;
  - trois lignes de 26 px alignées à gauche à x 720 : `Blutzucker` y 720 · `Blutgasanalyse` y 770 · `Kalium` y 820,
    chacune précédée d'une coche jaune à x 700.
- **Trait de séparation** à main levée, pointillé, y 1000, x 150–900 (`wipe` à `b22`).
- **Rang 2 — « كل ساعة، فـIntensivstation »** (monde y 1040–1392) :
  - `D.caseEtage` coin (150, 1090), 320 × 270 ; au-dessus `D.panneauEtage("Intensivstation")` (230 × 38) centre
    (310, 1056) ; dessous « الإنعاش » (28 px gras) centre (310, 1392) ; `D.pictoMedecin` pieds (440, 1350) ;
  - `D.cadranHoraire` r 105, centre (680, 1255) ; pastille `mindestens stündlich` / « كل ساعة على الأقل » — 26 —
    centre (680, 1062).
- **Déroulé** : `b21+0.1` lecteur (`"drop"`), règle courte (`"growY"`), colonne (`"growY"`) ; `b21@القواعد` pastille
  d'en-tête ; **`b21@coma`** : la colonne de sucre monte de 0,2 à 0,95 en 0,6 s — elle dépasse le haut de la règle
  courte ; **`b21@السكر`** : l'écran du lecteur affiche `HI` et clignote (3 Hz), le mot `max.` passe au jaune : la
  règle courte ne mesure plus ; **`b21@خاصو`** : le tube arrive (`"drop"`), se remplit (`fill` 0 → 0,8 en 0,5 s), la
  règle longue pousse jusqu'en haut de la colonne (`"growY"`, 0,4 s) ; **`b21@laboratoire`** : les trois coches
  (0,1 s d'écart), surligneur sous `Labor`. **`b22`** : la caméra descend, la case s'allume (`"grow"`), le cadran
  jaillit à `b22+0.1` ; **`b22@كل`** : les 12 marques du cadran s'allument l'une après l'autre (0,11 s d'écart), le
  pictogramme salue le lit à chaque marque, le mini-moniteur bat ; `b22@ساعة` la pastille ; **`b22@Intensivstation`** :
  le panneau passe au jaune, « الإنعاش » apparaît.
- **Textes (HUD)** : `S3-Leitlinie DDG (2023) · Regel von heute` / « القواعد الطبية ديال اليوم » — 26 — `pop`
  `b21@القواعد`. `HI` n'apparaît QUE dans cette scène (explication générale, sans marque, sans chiffre de glycémie).
- **Mention** : `Regel von heute · S3-Leitlinie 2023 (Typ 1) · Keine Rechtsberatung` (20 px).
- **Vie** : formes des marges, ménisque de la colonne, bulles dans le tube (`m.dust`), `HI` qui clignote, lits de la
  case qui respirent, marques du cadran.
- **Affiche** : fin de scène.

### S23 — Appelle… puis monte plus haut

- **Beats** b23 · 81,38 → 84,66 (3,3 s) · **Lieu** : le poste de nuit, vu par TES yeux · **Entrée** : `iris` 0,3 s +
  `eclat(c, "b23")`. Bandeau de nuit SANS horloge ni jauge (ce n'est plus l'affaire : c'est ta garde).
- **À comprendre** : vous êtes trop peu : appelle l'Oberarzt ; injoignable → appelle celui qui est au-dessus de lui.
- **Caméra (ascenseur vers le haut)** : `{ at: "b23", s: 1.0, cx: 540, cy: 970 }` →
  `{ at: "b23@طلع", s: 1.0, cx: 540, cy: 910, d: 0.5 }` ; `c.kick("b23@فوق", 0.06)`.
- **Couches** (monde) : `D.salleNuit({ lit: 1 })` · `D.telephoneMural` centre (175, 860) · `D.listeGarde({ big: true })`
  centre (540, 900) (x 280–800, y 640–1160) · `D.cordon` du poste (175, 945) au combiné · `D.mainPOV({ grip: "combine" })`
  centre de la main (235, 1250), avant-bras qui sort par le bas en (150, 1440) · `D.combine` dans la main · HUD.
- **Le tableau** (monde) : titre `Hintergrund · Nacht` (26 px) y 680. Trois lignes, de haut en bas :
  `Chefarzt` (40 px, x 330) y 790, dessous « رئيس القسم » (28 px gras) ; `Oberarzt` y 930, dessous
  « الطبيب المسؤول » ; `Assistenzarzt` (34 px) y 1070 + fanion jaune « نتا » (34 px). Icônes de téléphone à x 610,
  lucarnes d'état (44 × 52) à x 720, reliées par un trait vertical. Ronds jaunes numérotés : `1` en (302, 918),
  `2` en (302, 778).
- **Déroulé** : `b23` le tableau tombe (`"drop"`, dist 260) + `m.pend` 3°, le téléphone pousse du mur ; `b23+0.2` la
  main monte dans le cadre (`"rise"`, dist 220) ; **`b23@عيّط`** : la main lève le combiné (40 px, 0,25 s), le `1`
  jaillit, surligneur sous `Oberarzt`, des points jaunes montent le long du trait jusqu'à sa lucarne qui clignote
  (`"ring"`) ; **`b23@5`** (« ما ») : trois points d'attente dans la lucarne (`m.typing`) ; **`b23@لقيتيهش`** : la
  lucarne passe au hachuré gris (`"dead"`) ; **`b23@طلع`** : la caméra monte, le surligneur glisse sur `Chefarzt`
  (0,3 s), le `2` jaillit, les points continuent de monter jusqu'à la lucarne du haut ; **`b23@فوق`** : elle
  **s'allume** (jaune plein, `m.ripple`, petits rayons).
- **Textes (HUD)** : `Hintergrunddienst anrufen` / « عيّط للـOberarzt » — 28 — `pop` `b23@عيّط`, `hide`
  `b23@طلع-0.1` ; `dann: Chefarzt` / « طلع للي فوق منو » — jaune, 30 — `pop` `b23@طلع`.
- **Vie** : la main tremble un peu, le cordon se détend, le tableau pend, les lucarnes clignotent, bandeau.
- **Mention** : `Regel von heute · Keine Rechtsberatung`. **Bulles** : aucune (personne ne parle).
- **Affiche** : fin de scène (lucarne du Chefarzt allumée).

### S24 — Et écris-le : Überlastungsanzeige

- **Beats** b24 · 84,66 → 88,47 (3,8 s) · **Lieu** : le MÊME mur du poste de nuit qu'en S23, vu de face (la liste
  d'appel est partie, le formulaire prend sa place) · **Entrée** : `cut`.
- **À comprendre** : écris-le : l'Überlastungsanzeige est un papier qui dit à l'administration que les patients sont
  en danger. **Rien sur ce que ce papier change devant un juge** (aucune source lue ne le dit).
- **Caméra (ascenseur, comme en S23)** : `{ at: "b24", s: 1.0, cx: 540, cy: 960 }` →
  `{ at: "b24@فخطر", s: 1.12, cx: 520, cy: 1090, d: 0.35 }` ; `c.kick("b24@فخطر", 0.06)`.
- **Couches** (monde) : `D.salleNuit({ lit: 1 })` (le mur de S23 : bandeau de nuit, plafonnier hors champ, sa lueur
  jaune sur le mur) · `D.telephoneMural` centre (175, 860), combiné RACCROCHÉ (il se balance encore un peu) ·
  `D.casierMural` centre (860, 700) (x 790–930, y 640–760), « الإدارة » (28 px gras) centre (860, 800) · flèche à
  main levée du coin de la feuille (770, 660) au casier · `D.formulaire` sur sa planchette à pince, pendue à un
  clou en (510, 620), centre (510, 955), penchée de −2° (x 250–770, y 640–1270) · `D.stylo` au bout de sa
  ficelle, attachée à la pince · `D.mainPOV({ grip: "stylo" })` (la main est SOUS et à droite de la pointe : elle
  ne cache pas ce qui s'écrit ; l'avant-bras sort par le bas entre x 430 et 700) · HUD.
  **Ni table, ni tasse, ni lampe de bureau, ni vue plongeante** : le bureau vu de dessus, la tasse qui fume et la
  main qui écrit sur une feuille posée sont la grammaire d'AKTE 06 (corrigé le 26.11.2026). Ici le papier est
  VERTICAL, sur le mur de la nuit, et la caméra reste un ascenseur.
- **Sur la feuille** (monde) : rond jaune `3` en (290, 690) ; titre `Überlastungsanzeige` (46 px) base y 720 ;
  `(= Gefährdungsanzeige)` (22 px) y 760 ; `schriftlich an den Arbeitgeber` (22 px) y 790 ; champs 24 px alignés à
  x 290 : `Datum, Uhrzeit:` y 860 · `Besetzung:` y 930 · `Patienten:` y 1000, chacun suivi d'une écriture en
  gribouillis jusqu'à x 730 ; case à cocher 34 × 34 en (300, 1075) + `Patienten in Gefahr` (30 px) à x 345, base
  y 1088 ; « المرضى فخطر » (30 px gras) centre (450, 1130) ; note de bas de page, 18 px gris, trois lignes centrées
  sur x 510 (y 1180, 1204, 1228) : `Die Überlastungsanzeige entbindet den Arzt` / `nicht von der Pflicht, seine Arbeitsaufgaben`
  / `zu erfüllen. — Marburger Bund Sachsen-Anhalt`.
- **Déroulé** : `b24` la planchette tombe sur son clou (`"drop"`, dist 260, 0,4 s) puis `m.pend` 3° (amorti) ;
  `b24+0.15` la main monte et saisit le stylo qui pendait ; **`b24@Überlastungsanzeige`** : le titre se tape lettre
  par lettre (0,8 s) puis se surligne ; les trois champs se remplissent (`lines` 0 → 1 de
  `b24@Überlastungsanzeige+0.3` à `+0.7` ; 1 → 2 de `b24@ورقة` à `+0.4` ; 2 → 3 de `b24@ورقة+0.45` à `+0.85`), la
  main suit la pointe ; **`b24@للإدارة`** : le casier mural tombe en place (`"drop"`, dist 200), sa fente s'éclaire
  en jaune (une petite fenêtre qui s'allume), la flèche se trace (0,3 s), « الإدارة » apparaît ; `b24@بلي` la main
  descend vers la case ; **`b24@فخطر`** : la coche jaune (`tick` 0 → 1 en 0,2 s), « المرضى فخطر » s'écrit de droite à gauche.
- **Textes (HUD)** : `Überlastungsanzeige` / « ورقة للإدارة: المرضى فخطر » — jaune, 32 — `pop`
  `b24@Überlastungsanzeige`.
- **Vie** : stylo et main, ficelle du stylo, planchette qui pend (idle 0,5°), combiné, lueur du plafonnier qui
  vacille, fente du casier, bandeau de nuit.
- **Mention** : `Regel von heute · Keine Rechtsberatung`. **Affiche** : fin de scène (case cochée).

### S25 — « …la faute de l'hôpital… »

- **Beats** b25 (première moitié) · 88,47 → 90,08 (1,6 s) · **Lieu** : la coupe, de nuit · **Entrée** : `iris` 0,3 s +
  `eclat(c, "b25")` · `summary: false`.
- **À comprendre** : le manque de médecins, c'est la faute de l'hôpital…
- **Caméra** : STD → `{ at: "b25+0.1", s: 1.03, d: 1.4, ease: "lin" }`.
- **Contenu** : `coupe(c, m)` dans l'état de S6 (Zimmer éteint, lit vide), `AZ` à (640, 1130) et `KOL` à (715, 1130),
  minuscules, tête basse ; toutes les lampes d'appel clignotent. **`b25@غلط`** : un grand cercle au surligneur jaune
  (trait 10 px, opacité 0,8) se trace autour de TOUT l'immeuble (ellipse centre (525, 1000), 430 × 440) en 0,5 s.
- **HUD** : bandeau sans horloge ni jauge ; mention `laut Presse` ; aucune pastille.

### S26 — « …mais devant le tribunal, c'est toi qui es debout »

- **Beats** b25 (seconde moitié) · `b25@ولكن` (90,08) → `b25@end+0.15` (92,02) (1,9 s) · **Lieu** : la salle vue du
  fond · **Entrée** : `zoom` 0,25 s (de la nuit au jour sur « ولكن »).
- **À comprendre** : …mais devant le tribunal, c'est TOI qui es debout.
- **Caméra** : `{ at: "b25@ولكن", s: 1.0, cx: 540, cy: 950 }` → `{ at: "b25@نتا", s: 1.15, cx: 460, cy: 980, d: 0.4 }` ;
  `c.kick("b25@كتوقف", 0.07)`.
- **Contenu** : `salle(c, m, { accuses: 1, vue: "hopital" })` — UNE chaise et UN personnage de dos,
  `D.dos({ hair: "neutre", veste: "pull" })`, sol (425, 1290), table centrée sur x 425 (le fanion reste à gauche
  du juge : 25 px de marge) ; dans la fenêtre gauche, au
  loin, le petit immeuble aux vitres jaunes (`D.fenetreHaute({ vue: "hopital" })`) : l'hôpital est resté dehors.
  Le juge (`RIC`) lève les yeux à `b25@ولكن`.
- **Déroulé** : **`b25@نتا`** : `D.etiquetteQui` « نتا » (40 px) jaillit au-dessus de la tête (pointe (425, 925)) et
  suit la tête ; **`b25@كتوقف`** : le personnage SE LÈVE (`stand` 0 → 1 en 0,4 s), un rayon de jour se pose sur lui
  (comme en S19), poussière. On tient l'image jusqu'à `b25@end+0.15`, puis l'éclair blanc du socle et l'affiche.
- **Textes** : seulement le fanion « نتا ». **Mention** : aucune. **Affiche** : dernière case (celle d'où part le dézoom).

---

### Affiche-résumé (socle `st.summary`, réglages de cet épisode)

- **24 cases** = toutes les scènes sauf S4 (intro) et S25 : S1, S2, S3, S5, S6 … S24, S26. **6 colonnes × 4 rangs.**
- `st.flash(LAST + "@end+0.15", 0.35, 0.85)` puis
  `st.summary({ at: LAST + "@end+0.15", in: "cut", dezoomAt: LAST + "@end+0.5", cols: 6, crop: [250, 1410], top: 356, gap: 10, side: 92, freezeAt: { 0: "b1@5+0.3", 7: "b9@Insulin+0.3", 10: "b12@دقيق+0.3" } })`
  — `crop [250, 1410]` garde le bandeau de nuit (écran 250–540) et l'image (jusqu'à 1410) dans chaque case ; case
  132,7 × 142,5 ; la grille va de y 356 à y 956.
- **En-tête** (entre x 90 et 990) : ruban `"AKTE " + AKTE_NO + " · " + TITRE` (« AKTE 05 · بوحدهم فالليل », taille 36,
  largeur 470) centre (540, 312) ; pastille `@dr.aguilo` (20) centre (180, 312) ; pastille jaune
  `"AKTE " + AKTE_NEXT + " · قريبا"` (« AKTE 06 · قريبا », 18) centre (885, 312).
- **Carte « commentaire »** (après la grille) : `k.card(110, 975, 760, 300)` — `pop` à `LAST@end+2.7` ;
  **question ÉCRITE, jamais dite**, sur deux lignes (Lalezar 44) : « فـla garde ديالك: » centre (490, 1050) et
  « شحال من طبيب، وشحال من مريض؟ » centre (490, 1120) — `wipe` de droite à gauche à `LAST@end+2.8` et `+3.0` ;
  « كتب ليا فالكومنتير » (arabe gras 40) centre (490, 1215) — `wipe` à `LAST@end+3.3` ; flèche à main levée vers le
  bouton commentaire : `M780 1190 C 850 1200, 890 1200, 918 1196 M898 1182 L918 1196 L900 1212` — `wipe` à `LAST@end+3.5`.
- **Rappel de vérité** sous la carte : pastille grise `laut Presse · Rechtskraft unbekannt` /
  « حسب الصحافة · ما معروفش واش الحكم نهائي » — 22 — centre (490, 1318), `pop` à `LAST@end+3.6`.
- Numéros jaunes des cases, cadres, ombres : socle inchangé.

---

## 5. Les scènes imposées, dans la forme propre à cet épisode

| Scène imposée | Où | Forme propre à l'épisode | À vérifier |
|---|---|---|---|
| **Accroche = la sanction chiffrée** | S1 → S2 → S3 (b1–b4, 10,6 s) | la façade de nuit écrit « 7500 » en fenêtres allumées dès le premier mot ; puis 105 fenêtres = plus de cent patients et deux silhouettes à la porte ; puis l'appareil caché | chiffres lisibles à ≈ 0,8 s ; elle réagit (inquiète → choc → larmes) ; `laut Presse` dès l'image 1 ; cinq changements visuels en 10 s |
| **Intro Yassine** | S4 (i1–i3) | son **badge qui pend à un cordon** | photo dans un cadre au trait + anneau jaune + icône Instagram ; « Yassine » (jamais « Dr. ») ; « @dr.aguilo » ; cœur j'aime sur `i3@j'aime` ; bouton s'abonner sur `i3@abonne` ; logo du haut masqué ; bloc fini au-dessus de l'écran y 1300 ; `summary: false` |
| **Carte** | S5 (b5) | **carte de nuit**, une seule fenêtre allumée sur Krefeld, Berlin en repère, épingle jaune ; coupure de journal | Krefeld à l'ouest (≈ (313, 958)) ; « حسب الصحافة » écrit |
| **Explication en image** | S22 (b21–b22) pour le médical ; S12 pour le geste ; S18 pour l'organisation (schéma de l'expert) ; S23–S24 pour la règle d'organisation | le lecteur = une **règle trop courte** (au-delà, il affiche `HI`), le laboratoire = la règle longue ; cadran « toutes les heures » ; liste d'appel qu'on remonte ; formulaire qu'on remplit | aucun chiffre de glycémie ; `HI` seulement en S22 ; « Regel von heute » ; « Keine Rechtsberatung » ; rien sur le pénal |
| **Scène muette du décès** | fin de S14 + S15 | dans la coupe, **la lumière de sa chambre s'éteint** ; puis gros plan du lit : la perfusion ne goutte plus, l'horloge et la jauge du bandeau s'arrêtent, bras qui glisse, elle à la porte, la couleur s'éteint | patient MONTRÉ (`D.gisant`) ; phrase écrite ; **aucune aube**, aucune heure, aucune famille ; **ni moniteur ni ligne plate ni bip** (forme d'AKTE 02 / 03) : `son/plan_son.md` § 4 est à réécrire avec la goutte et les tics de l'horloge |
| **Tribunal** | S16, S17, S18, S19 | la salle **vue du fond**, deux accusés de dos, **une seule se lève** ; contre-champ sur les pièces ; l'expert et son chevalet | « ein Gericht in Krefeld » ; ni « Amtsgericht », ni Az., ni Tagessätze, ni parole du juge ; `Rekonstruktion` visible ; pas de marteau, pas de tampon, pas de plaque |
| **Sanction** | S20 (+ S21) | **quinze billets de 500 comptés un à un** pendant que le collègue sort par la porte | les billets ne vont vers personne ; `Freispruch · Gründe nicht veröffentlicht` ; `Rechtskraft unbekannt` (S21 et affiche) |
| **Règle** | S22, S23, S24, puis la phrase finale S25–S26 | planche « règle courte / règle longue » ; liste d'appel (ascenseur vers le haut) ; formulaire | la norme est celle d'AUJOURD'HUI ; citation exacte du Marburger Bund ; « نتا » = main et dos, jamais un visage |
| **Affiche-résumé** | après `b25@end+0.15` | 24 cases, 6 colonnes ; question écrite en deux lignes ; teaser « AKTE 06 · قريبا » ; rappel `laut Presse · Rechtskraft unbekannt` | grille finie (y 956) avant la carte (y 975) ; flèche vers le bouton commentaire ; rien sous y 1630 |

**Sous-titres** : glossaire de l'épisode (`glossaire-episode.js`, à écrire avec `story.js`) — `Assistenzärzte` et
`Assistenzarzt` → « أطباء فطور الاختصاص » / « طبيب فطور الاختصاص » (remplace « طبيب مقيم » du glossaire commun) ;
`Intensivstation` → « الإنعاش » ; `Insulin` → « الأنسولين » ; `Schnelltest` → « التيست السريع » ; `Oberarzt` →
« الطبيب المسؤول » ; `schweres Organisationsverschulden` → « غلط كبير فالتنظيم » ; `fahrlässige Tötung` →
« القتل غير العمد » (le glossaire commun écrit « العمدي ») ; `Freispruch` → « براءة » ; `Überlastungsanzeige` →
« ورقة للإدارة ». Ne PAS y mettre `Krefeld`, `coma`, `normal`, `joignable`, `laboratoire`, `garde` (mots qu'il dit
tels quels). Un sous-titre avec glose est plus haut (son bord supérieur monte vers l'écran y 1440) : sur ces beats,
l'image finit à y 1430.

---

## 6. Repères utilisés

Tous les repères de ce document ont été extraits par script et résolus avec la logique du moteur
(`engine/runtime.js` : `parseCue` ; `serie/lib/stage.js` : `T`) sur `beats.js` + `timings.js` du 26.11.2026 :
**aucun repère manquant, aucun mot ambigu** (aucun mot visé n'apparaît deux fois dans son beat sans être écrit par
son indice). Les instants sont PROVISOIRES ; ce sont les mots qui comptent.

Règles à garder quand la vraie voix arrivera :
- **Par indice** (le mot est un nombre, ou il est répété) : `b1@0` (7500) · `b1@1` · `b1@4` · `b1@5` · `b2@6` (32) ·
  `b3@2` · `b3@3` · `b3@7` (100) · `b3@8` · `b4@7` · `b4@8` · `b5@2` (2008) · `b5@8` · `b6@4` · `b7@1` · `b7@3` (100) ·
  **`b7@5` et `b7@9` (les deux « وزيد »)** · `b10@8` · `b13@7` · `b14@2` · `b19@1` (7500) · `b23@5`. Si
  l'auteur ajoute, retire ou déplace un mot dans ces phrases, ces indices changent : les revérifier avec
  `tools/cuetimes.mjs`.
- **Par mot** : le moteur prend le PREMIER mot du beat qui CONTIENT le texte demandé (préfixes collés compris :
  `b9@coma` vise « فـcoma، », `b12@Schnelltest` vise « بـSchnelltest، », `b19@Assistenzarzt` vise
  « والـAssistenzarzt »). Les signes (ّ  ـ) sont ignorés : `b23@عيّط` fonctionne.
- `b15` (et non « b15 @ 2010 ») pour « فـ2010 » : c'est le premier mot du beat.
- Scène muette : tout est compté depuis `b14@end` (`+0.10` … `+2.7`) ; `quiet` = `b14@end+2.0`. Si le silence monté
  ne fait pas 3,2 s (`EXTRA` de `montage_voix.py`), ces décalages se compriment en proportion.

| Repère | Mot visé dans `beats.js` | Instant provisoire (s) | Décalages utilisés |
|---|---|---|---|
| `b1@0` | n° 0 · 7500 | 0,15 | `+0.3` `+0.55` |
| `b1` | (début) | 0,15 | — |
| `b1@1` | n° 1 · أورو | 0,43 | — |
| `b1@4` | n° 4 · على | 1,39 | — |
| `b1@5` | n° 5 · القتل | 1,62 | `+0.3` |
| `b2` | (début) | 2,60 | `-0.05` |
| `b2@حكم` | n° 1 · حكم | 2,88 | — |
| `b2@طبيبة` | n° 3 · طبيبة | 3,34 | — |
| `b2@عندها` | n° 5 · عندها | 4,12 | — |
| `b2@6` | n° 6 · 32 | 4,44 | — |
| `b3` | (début) | 4,97 | `+0.1` `+0.25` `+0.3` |
| `b3@2` | n° 2 · جوج | 5,57 | — |
| `b3@3` | n° 3 · أطباء | 5,80 | — |
| `b3@7` | n° 7 · 100 | 6,77 | `+0.1` |
| `b3@8` | n° 8 · مريض. | 7,00 | — |
| `b4` | (début) | 7,39 | `+0.2` |
| `b4@تاقت` | n° 2 · تاقت | 8,03 | `-0.1` |
| `b4@التيست` | n° 4 · التيست، | 8,63 | — |
| `b4@كنديروه` | n° 5 · كنديروه | 8,99 | — |
| `b4@7` | n° 7 · كل | 9,77 | — |
| `b4@8` | n° 8 · نهار. | 9,95 | — |
| `i1` | (début) | 10,65 | `+0.45` |
| `i1@ياسين` | n° 1 · ياسين، | 10,88 | `+0.15` |
| `i1@فألمانيا` | n° 3 · فألمانيا. | 11,48 | — |
| `i2` | (début) | 12,04 | — |
| `i2@حقيقية` | n° 5 · حقيقية | 13,56 | `+0.15` |
| `i3` | (début) | 16,00 | `+0.1` |
| `i3@j'aime` | n° 3 · j'aime | 16,83 | — |
| `i3@abonne` | n° 5 · abonne، | 17,30 | — |
| `b5` | (début) | 19,55 | `+0.15` |
| `b5@Krefeld` | n° 1 · Krefeld، | 19,87 | `+0.35` |
| `b5@2` | n° 2 · 2008. | 20,28 | — |
| `b5@هاد` | n° 3 · هاد | 20,56 | — |
| `b5@كيما` | n° 6 · كيما | 21,57 | — |
| `b5@8` | n° 8 · الصحافة. | 22,25 | — |
| `b6` | (début) | 23,08 | `+0.1` `+0.2` `+0.3` |
| `b6@4` | n° 4 · جوج | 24,32 | `-0.1` `+0.1` |
| `b6@Assistenzärzte` | n° 5 · Assistenzärzte، | 24,55 | — |
| `b6@فطور` | n° 8 · فطور | 25,87 | — |
| `b6@هي` | n° 10 · هي | 26,60 | — |
| `b6@وزميل` | n° 11 · وزميل | 26,79 | — |
| `b7` | (début) | 27,58 | `+0.1` |
| `b7@1` | n° 1 · كثر | 27,91 | — |
| `b7@3` | n° 3 · 100 | 28,32 | — |
| `b7@5` | n° 5 · وزيد | 28,83 | — |
| `b7@Intensivstation` | n° 6 · Intensivstation، | 29,11 | — |
| `b7@9` | n° 9 · وزيد | 30,56 | — |
| `b7@المستعجلات` | n° 10 · المستعجلات. | 30,84 | `-0.2` `+0.2` |
| `b8` | (début) | 31,80 | `+0.1` |
| `b8@عندو` | n° 3 · عندو | 32,81 | `-0.1` |
| `b8@فيه` | n° 6 · فيه | 33,50 | `+0.2` |
| `b8@السكر` | n° 7 · السكر، | 33,73 | — |
| `b8@وطالع` | n° 8 · وطالع | 34,06 | `-0.15` `+0.5` |
| `b9` | (début) | 34,99 | `+0.2` |
| `b9@كيدخل` | n° 3 · كيدخل | 35,69 | `+0.2` |
| `b9@coma` | n° 4 · فـcoma،  (partiel) | 36,01 | — |
| `b9@والطبيبة` | n° 5 · والطبيبة | 36,38 | — |
| `b9@كتعطيه` | n° 6 · كتعطيه | 36,83 | — |
| `b9@Insulin` | n° 7 · Insulin. | 37,20 | `+0.3` |
| `b10` | (début) | 37,72 | `+0.1` |
| `b10@المرضى` | n° 1 · المرضى | 37,99 | — |
| `b10@كل` | n° 7 · كل | 39,69 | — |
| `b10@8` | n° 8 · جوج | 39,88 | — |
| `b11` | (début) | 40,91 | `+0.1` |
| `b11@وهي` | n° 2 · وهي | 41,59 | `+0.2` `+0.45` |
| `b11@والسكر` | n° 5 · والسكر | 42,34 | `+0.2` |
| `b11@كيرجعش` | n° 7 · كيرجعش | 42,89 | — |
| `b12` | (début) | 43,73 | — |
| `b12@Schnelltest` | n° 2 · بـSchnelltest،  (partiel) | 44,37 | — |
| `b12@سريع` | n° 5 · سريع | 45,60 | — |
| `b12@وماشي` | n° 6 · وماشي | 45,88 | — |
| `b12@دقيق` | n° 7 · دقيق، | 46,20 | `+0.3` |
| `b12@بلا` | n° 8 · بلا | 46,47 | — |
| `b12@laboratoire` | n° 9 · laboratoire. | 46,70 | — |
| `b13` | (début) | 47,40 | `+0.1` `+0.3` `+0.4` |
| `b13@الطبيب` | n° 2 · الطبيب | 48,31 | `+0.15` |
| `b13@حسب` | n° 5 · حسب | 49,41 | — |
| `b13@7` | n° 7 · ما | 50,05 | — |
| `b13@بقاش` | n° 8 · بقاش | 50,24 | — |
| `b13@joignable` | n° 9 · joignable. | 50,51 | `+0.2` |
| `b14` | (début) | 51,12 | `+0.1` |
| `b14@بوحدهم` | n° 1 · بوحدهم. | 51,40 | — |
| `b14@2` | n° 2 · الساعات | 51,76 | — |
| `b14@ومن` | n° 4 · ومن | 52,45 | — |
| `b14@end` | (fin) | 53,19 | `-0.70` `-0.05` `+0.3` `+0.55` `+0.65` `+0.9` `+0.95` `+1.1` `+1.2` `+1.50` `+2.0` `+2.2` `+2.3` `+2.45` `+2.7` |
| `b14@بعد` | n° 5 · بعد | 52,68 | — |
| `b15` | (début) | 56,81 | `+0.1` `+0.5` |
| `b15@متهمين` | n° 3 · متهمين | 58,13 | — |
| `b15@قدام` | n° 4 · قدام | 58,49 | — |
| `b16` | (début) | 59,79 | — |
| `b16@Schnelltest` | n° 5 · فـSchnelltest،  (partiel) | 61,30 | — |
| `b16@وما` | n° 6 · وما | 61,98 | — |
| `b17` | (début) | 63,15 | `+0.1` `+0.5` |
| `b17@لام` | n° 1 · لام | 63,56 | — |
| `b17@السبيطار` | n° 2 · السبيطار: | 63,79 | — |
| `b17@schweres` | n° 3 · schweres | 64,25 | — |
| `b17@Organisationsverschulden` | n° 4 · Organisationsverschulden، | 64,70 | `+0.9` |
| `b17@غلط` | n° 6 · غلط | 66,15 | — |
| `b18` | (début) | 67,41 | `+0.2` |
| `b18@عليها` | n° 3 · عليها | 68,42 | — |
| `b18@fahrlässige` | n° 4 · بـfahrlässige  (partiel) | 68,74 | — |
| `b18@Tötung` | n° 5 · Tötung، | 69,41 | — |
| `b18@يعني` | n° 6 · يعني | 69,78 | — |
| `b19` | (début) | 71,35 | `+0.1` |
| `b19@1` | n° 1 · 7500 | 71,54 | `+2.78` `+2.8` |
| `b19@Assistenzarzt` | n° 3 · والـAssistenzarzt  (partiel) | 72,09 | — |
| `b19@الآخر` | n° 4 · الآخر | 72,94 | — |
| `b19@Freispruch` | n° 5 · Freispruch، | 73,27 | `-0.1` |
| `b19@end` | (fin) | 74,41 | — |
| `b20` | (début) | 74,52 | `+0.15` |
| `b20@لقيناش` | n° 1 · لقيناش | 74,75 | — |
| `b20@واش` | n° 2 · واش | 75,11 | — |
| `b20@نهائي` | n° 5 · نهائي. | 75,90 | — |
| `b21` | (début) | 76,64 | `+0.1` `+0.2` |
| `b21@القواعد` | n° 1 · القواعد | 76,96 | — |
| `b21@coma` | n° 3 · coma | 77,69 | — |
| `b21@السكر` | n° 5 · السكر | 78,24 | — |
| `b21@خاصو` | n° 6 · خاصو | 78,56 | — |
| `b21@laboratoire` | n° 7 · laboratoire، | 78,84 | — |
| `b22` | (début) | 79,54 | `+0.1` |
| `b22@كل` | n° 1 · كل | 79,95 | — |
| `b22@ساعة` | n° 2 · ساعة، | 80,13 | — |
| `b22@Intensivstation` | n° 3 · فـIntensivstation.  (partiel) | 80,41 | — |
| `b23` | (début) | 81,38 | `+0.2` |
| `b23@عيّط` | n° 3 · عيّط | 82,20 | — |
| `b23@5` | n° 5 · ما | 83,03 | — |
| `b23@لقيتيهش` | n° 6 · لقيتيهش، | 83,21 | — |
| `b23@طلع` | n° 7 · طلع | 83,62 | `-0.1` |
| `b23@فوق` | n° 9 · فوق | 84,08 | — |
| `b24` | (début) | 84,66 | `+0.15` |
| `b24@Überlastungsanzeige` | n° 1 · Überlastungsanzeige، | 85,02 | `+0.3` |
| `b24@ورقة` | n° 3 · ورقة | 86,25 | `+0.45` |
| `b24@للإدارة` | n° 5 · للإدارة | 86,84 | — |
| `b24@بلي` | n° 6 · بلي | 87,25 | — |
| `b24@فخطر` | n° 8 · فخطر. | 87,85 | — |
| `b25` | (début) | 88,47 | `+0.1` |
| `b25@غلط` | n° 2 · غلط | 89,12 | — |
| `b25@ولكن` | n° 5 · ولكن | 90,08 | — |
| `b25@نتا` | n° 8 · نتا | 91,04 | — |
| `b25@كتوقف` | n° 10 · كتوقف. | 91,55 | — |
| `b25@end` | (fin) | 91,87 | `+0.15` |

---

## 7. Risques et solutions

**Personnages difficiles (dessin dédié obligatoire)**
1. **Patient allongé** (S8, S9, S12, S15) : `D.gisant`, jamais une tête Persona pivotée. Risques : tête trop petite
   (elle doit faire ≈ 120 px, comme les soignants), bras qui pend « en nouille ». Solution : avant-bras droit et
   vertical, main ouverte, bracelet jaune ; tester `arm` 0, 0,5 et 1 sur une planche à part avant de monter les scènes.
2. **Personnages de dos** (S16, S19, S26) : Persona n'a pas de vue de dos → `D.dos`. Risque : « se lever » qui
   ressemble à un étirement. Solution : la chaise reste, le corps monte de 88 px d'un bloc, les jambes apparaissent
   derrière le dossier ; pas de visage, jamais d'œil même quand la tête tourne.
3. **Silhouettes à 0,42** (coupe) : traits trop fins, lunettes illisibles, pieds qui flottent dans l'escalier.
   Solution : `lw: 1.8`, contrôle sur capture à l'échelle 1 ; dans l'escalier la position suit la ligne des marches
   avec un saut de 6 px par marche (`courir`) ; jamais de glissade : cycle de marche partout où ils se déplacent.
4. **Main en gros plan** (S23, S24) : `D.mainPOV` — moufle + manche, pas de doigts ; la main reste sous et à droite
   de la pointe du stylo pour ne pas cacher l'écriture.
5. **Bras de `AZ` derrière le lit** (S12) et **derrière la table** (S17, S20) : le meuble cache les jambes ; les
   mains visibles sont redessinées par-dessus (`only: "arms"` / `only: "armR"`), cibles à 90–130 px des épaules, du
   bon côté (mesurer avec `Persona.util.rig`).

**Chevauchements possibles**
6. **Bandeau de nuit** : il est opaque. Tout ce qui monte au-dessus de l'écran y 540 disparaît — voulu pour le
   décor, interdit pour un personnage ou un texte. Points serrés : fanions « هي » / « زميل ديالها » en S6 (sous le
   plafond de l'étage, écran Y ≈ 680–760 au zoom), enseigne du toit (monde y 587–620 : elle affleure le bandeau en
   fin de scène).
7. **Pastille du haut + sa ligne arabe** (jusqu'à l'écran y 515) contre le haut des décors de JOUR : rien sur le mur
   entre x 230 et 850 au-dessus de l'écran y 525 (suspensions décalées à x 185 et 895 ; fenêtres à partir de y 560).
   S22 : le haut de la colonne de sucre (monde y 595) passe à l'écran y 543 avec la caméra `cy 950` — ne pas
   descendre la caméra plus bas.
8. **S16** : la carte-dossier (y 320–490) + « محكمة فـKrefeld » (base y 528) + la pastille « zwei Angeklagte »
   (monde (465, 850), arabe jusqu'à y ≈ 920) au-dessus de têtes dont le sommet est à y 941 : 21 px de marge, à
   vérifier au scan.
9. **S19** : pastille « 32 Jahre · Urteil 2010 » (monde x 152–487) à 18 px de la tête du juge (x 505–575).
10. **S13** : la bulle (x 355–505) entre la tête de `AZ` (x 245–335) et le combiné qui se balance (x 499–581 au
    début) : la bulle n'apparaît qu'à `b13@الطبيب`, quand le balancement est retombé à ±11 px.
11. **S20** : le compteur (x 355–585) entre sa tête (x 190–290) et le collègue au départ (tête x 595–685).
12. **S12** : la loupe (x 690–910, y 620–840) au-dessus de la porte (haut y 860) et à droite de la fenêtre (x 420–620).

**Près des zones Instagram**
13. **Colonne des boutons** : la cage d'escalier de la coupe (monde x 772–888) est juste à gauche de la colonne ; les
    coureurs ne dépassent jamais x 868. `AZ` à la porte en S15 : x 775–865 (écran ≤ 898). Le collègue en S20 :
    disparaît avant x 800. Chariot du box : x ≤ 865. Rideau du box (x 900–950) : simple décor, sans personnage.
14. **Bas de l'image** : trottoir de la coupe à l'écran y 1422–1442 ; sous-titres avec glose jusqu'à y ≈ 1440. Si un
    sous-titre mord sur le trottoir, remonter toute la coupe de 10 px (constante unique).
15. **Bord gauche** : `SAN` en S8 (x 120–210) est à l'écran X ≈ 84–95 pendant une seconde ; figurante, mais si la
    planche la montre rognée, décaler tout le box de +20 px.
16. **Intro** : le bas des deux boutons est à l'écran y 1293–1297. Ne rien ajouter dessous.

**Vérité (un détail faux coûte plus cher qu'un détail laid)**
17. **L'horloge** : sans chiffres, traits identiques, cadran penché, « Uhrzeiten unbekannt » dessous. Ne jamais
    afficher d'heure numérique, ne jamais faire partir les aiguilles d'une heure ronde reconnaissable, ne jamais
    afficher le total des sauts.
18. **Insuline et coma** (S9) : pas de flèche, pas de « → », pas de trait entre les deux pastilles ; la jauge ne
    descend pas mais ne « répond » pas non plus à l'insuline par une animation qui ferait lien.
19. **Le second accusé** a les cheveux blonds du collègue de la nuit : acceptable seulement parce que
    `Rekonstruktion` est à l'écran dans S16, S19 et S20. Si la mention saute, le rendre neutre (`hair: "neutre"`).
20. **L'Oberarzt** : cadre vide. Ne pas lui donner de visage, de lit, de téléphone qui sonne chez lui.
21. **Gloses arabes à valider par l'auteur** (propositions de ce document, pas ses mots) : « ليلة 1 نونبر 2008 » (S5),
    « 32 عام نهار الحكم » (S1, S19), « الخدمة ديال الليل » (S6), « ما معروفش واش الحكم نهائي » (S21, affiche),
    « القواعد الطبية ديال اليوم » et « كل ساعة على الأقل » (S22), « رئيس القسم » (S23), « ورقة للإدارة: المرضى فخطر »
    (S24), « الإدارة » (S24), « جوج متهمين » (S16), « كوما ديال السكر » (S9). Solution de repli : retirer la ligne
    arabe (`k.chip(de, null, …)`) plutôt que d'afficher une darija douteuse. Les autres gloses reprennent mot pour
    mot ce qu'il dit dans la même phrase.
22. **Titre** : `TITRE = "بوحدهم فالليل"` (S14, affiche) tant que l'auteur n'a pas tranché ; une seule constante.
23. **L'ange de S18** (règle du skill) : discret (0,5), sans cadre. Si l'auteur le trouve de trop, le retirer ne
    change rien d'autre.
24. **Larmes au tribunal** (S17, S20) et **elle à la porte** (S15) : mises en scène → `Rekonstruktion` doit rester visible.

**Technique**
25. **Façade** : 105 vitres pilotées par `c.tick` (attributs `fill`), jamais par un redessin `c.sk`. Lisibilité du
    « 7500 » : vitres éteintes `#E3E6EA`, allumées `#F8CE4E` cernées d'encre ; à contrôler sur la planche à 0,8 s.
26. **Entrée `iris`** : le cercle s'ouvre depuis l'écran (540, 864), comme `eclat`. La scène qui entre doit être
    intéressante en son centre dès 0,1 s (dans la coupe : l'étage du milieu).
27. **Zoom 1,7** (S11, S14) : c'est le maximum autorisé ; ne pas ajouter de `c.kick` pendant ces zooms.
28. **Scène muette** : le filtre `grayscale` est posé sur `c.layer` (il ne touche que S15) ; le remettre à zéro quand
    `t` sort de la scène, sinon l'aperçu en va-et-vient garde le gris.
29. **Affiche** : 24 cases = 6 × 4. Si une scène est ajoutée ou retirée, garder un multiple de 6 (marquer une scène
    `summary: false`) ou recalculer `top` pour que la grille finisse avant y 975.
30. **Teinte** : moins de 5 % de pixels bleu nuit par image (bandeau ≈ 1,5 %, vitres et ombres ≈ 1–2 %).
31. **Durée** : la vraie voix fera sans doute 94–96 s ; rien dans ce document ne dépend d'une durée fixe, sauf les
    décalages de la scène muette et la cadence des billets (15 billets en 2,65 s : si b19 dure moins de 2,9 s,
    resserrer l'écart à `(T("b19@end") − T("b19@1") − 0.4) / 15`).

---

## 8. Check-list de contrôle (pour celui qui construit)

Fichiers à créer dans `videos/akte-krefeld-nacht/` : `index.html` (copie du gabarit, titre « AKTE 05 – Krefeld »),
`glossaire-episode.js` (§ 5), `decor.js` (`window.EpDecor`, § 2), `story.js` (socle du gabarit + § 3 et § 4),
`assets/portrait.png` (copie de `_gabarit/assets/`, jamais dans git). Ne toucher ni à `serie/lib/`, ni à `engine/`,
ni à `tools/`. Toutes les commandes se lancent depuis `sketch-video/`.

**1. Erreurs d'exécution**
- [ ] `node tools/errcheck.mjs videos/akte-krefeld-nacht/index.html 0 3 6 9 12 17 21 24 29 33 36 39 42 45 49 52 55 58 61 65 69 73 75 78 80 83 86 89 91 95`
      → aucune erreur, `SV.error = null`.
- [ ] `node tools/cuetimes.mjs videos/akte-krefeld-nacht/index.html b1@0 b3@7 b7@5 b7@9 b10@8 b13@7 b14@2 "b14@end+2.0" b19@1 b23@5 "b25@ولكن"`
      → mêmes instants que le tableau du § 6.

**2. Planches avec la maquette Instagram**
- [ ] `node tools/planche.mjs videos/akte-krefeld-nacht --beats --ig` : deux images par beat. Sur chaque image :
      rien d'utile sous les zones rouges (bords x < 90 / x > 990, haut y < 250, colonne x > 915 pour y 980–1650,
      bas y > 1470) ; pastille du haut entière ; ligne arabe détachée et jamais recouverte ; aucun personnage coupé.
- [ ] Débuts de scène image par image (`--step 0.1`) : `--from 0 --to 2.6` (accroche : « 7500 » lisible avant 0,9 s) ·
      `--from 23 --to 25` (la coupe se construit) · `--from 27.5 --to 31.8` (descente + ambulance) ·
      `--from 31.8 --to 33.2` (le brancard entre) · `--from 40.9 --to 43.7` (l'ascenseur) ·
      `--from 53.1 --to 56.9` (la lumière s'éteint, scène muette) · `--from 56.8 --to 58.3` (le tribunal se construit) ·
      `--from 68.2 --to 70` (elle se lève) · `--from 71.3 --to 74.5` (les billets) · `--from 90 --to 92.6` (« نتا » se lève, affiche).
- [ ] Intro : photo visible, « Yassine » sans « Dr. », bloc fini au-dessus de y 1300, logo du haut absent.
- [ ] Affiche : 24 cases, grille finie avant la carte, question en deux lignes, flèche vers le bouton commentaire,
      « AKTE 06 · قريبا », rappel `laut Presse · Rechtskraft unbekannt`.

**3. Scan des chevauchements**
- [ ] `node tools/overlapscan.mjs videos/akte-krefeld-nacht/index.html 0 97.5 0.1` → aucune paire de textes qui se
      recouvrent (attendus et tolérés : aucun). Regarder de près S16, S19, S22, S24 (les plus chargées).

**4. Mesure du mouvement**
- [ ] `node tools/mouvement.mjs videos/akte-krefeld-nacht --min 5` → aucune scène « FIGÉ » (l'intro i1–i3 ne compte
      pas ; la fin de S15 est figée exprès : la mesurer avant `quiet`).
- [ ] Un changement visuel toutes les 1,5–2 s : relire la planche `--beats` en comptant.

**5. Règles de la série**
- [ ] Personnages : jamais de glissade, de bras raide dans le vide, de tête qui en cache une autre ; lèvres
      immobiles sauf `GUT` en S18 ; expressions qui changent selon l'arc du § 1.
- [ ] Décors complets dans chaque scène ; le décor se construit (cascade) puis vit.
- [ ] Aucune bulle de dialogue ; la seule bulle (S13) part du bas et vise le combiné.
- [ ] Sons : rien à produire maintenant (voir `son/plan_son.md`).

**6. Vérité à l'écran (relire `scenario.md`, « Ce qui n'est PAS dit mais montré »)**
- [ ] `laut Presse` dès la première image, puis sur toutes les scènes de l'affaire ; `Rekonstruktion` de S6 à S20.
- [ ] Aucune heure, aucun chiffre de glycémie, aucune marque ; `HI` seulement en S22.
- [ ] Aucune aube, aucun dormeur, aucune famille, aucune infirmière avec un rôle (figurantes muettes seulement).
- [ ] « ein Gericht in Krefeld » : ni « Amtsgericht », ni Aktenzeichen, ni Tagessätze, ni phrase du juge.
- [ ] Les billets ne vont vers personne ; `Freispruch · Gründe nicht veröffentlicht` ; `Rechtskraft unbekannt` en S21
      et sur l'affiche.
- [ ] Règle : `Regel von heute`, citation exacte du Marburger Bund, `Keine Rechtsberatung`, rien sur le pénal.
- [ ] Aucun nom de personne ni d'hôpital, nulle part (l'enseigne dit seulement « KRANKENHAUS »).
- [ ] Teinte bleu nuit < 5 % ; pas de `git add`, pas de clé d'API.

---

## Écarts de construction

### Étape « socle et décors 1 » (story.js, decor.js A–D + J)

Ce qui a été fait autrement que l'inventaire (§ 2), et pourquoi :
- **`D.trottoir`** : le banc (local x 578–702 → monde 688–812) et le panneau « Notaufnahme → » (mât local x 742, panneau
  594–746 → monde 704–856) sont à DROITE de la porte, pas à x 175–295 / 95 : à gauche, ils tombaient derrière `AZ` (S1, pieds
  (300, 1392)) et sous le disque « 2 » (S2, centre (300, 1290)). Ils restent sous monde x 880 (colonne des boutons). `o.sol` /
  `o.mobilier` séparent la bande (à poser avant la façade) et le mobilier (après la façade) ; pas de mobilier dans la coupe.
- **`D.rideauRoulant`** : ajouté (absent de l'inventaire) — le rideau de la Liegendanfahrt qui se lève en S7
  (`b7@المستعجلات-0.2`) et S10. Ancrage monde (156, 1200) = `D.coupe().rideau`.
- **`D.etiquetteQui`** : hauteur 1,62 × taille (au lieu de 1,5) et ligne de base remontée, sinon le ي final de « هي » et ses
  points touchaient le bord ; largeur estimée pour l'arabe gras ((0,42 n + 0,3) × taille, mesuré) ; renvoie `x0` / `x1`.
- **`D.trace`** : le pointillé jaune est cerné d'encre (le jaune seul disparaissait sur les pièces éclairées de la coupe).
- **`D.litMini({ kind: "zimmer" })`** : la petite tête de profil (nez vers le plafond, couronne de cheveux, œil fermé) est
  dessinée AVANT le drap, le cou entre dessous ; tête ≈ 26 px.
- **`D.jauge`** : avec `pulse`, le liquide s'élargit de 1,2 px au plus (au-delà, le reflet du verre le coupait en deux).

Conflits trouvés en montant les positions de ce storyboard à l'échelle réelle avec les personnages Persona (captures de
contrôle). Les mises en place (`X.lieux`) et les scènes doivent appliquer ces positions corrigées :
- **S6, fanions** : « هي » (pointe (650, 695)) et « زميل ديالها » (pointe (715, 695), corps centré x 752 = `dx: 37`) se
  recouvrent → **`dx: 52`** (corps x 689–845, 10 px d'écart avec « هي », corps x 621–679). Les deux fanions (y 640–682)
  cachaient aussi le panneau « Stationen » accroché en (680, 640) → **panneau « Stationen » en (505, 640)** (x 440–571, il ne
  touche ni le linteau x 400–410 ni la lampe de la pièce x 576–594) et **tableau d'appel `D.rufanlage` en (470, 730)** (sous le
  panneau, au-dessus des têtes des lits). Vérifié sur capture, avec le zoom ×1,6 de `b6@4`.
- **S6–S7, Intensivstation** : moniteurs à y 960 → la tête de `NSW` (0,42, sommet ≈ y 945) passe dessus pendant sa marche →
  **moniteurs à y 935**.
- **S3** : `AZ` à l'échelle 1, pieds (250, 1300) : le haut des cheveux est vers y 855 ; la grande fenêtre centrée (215, 750),
  170 × 230, a son appui jusqu'à y 877 → les cheveux passent dessus → **fenêtre centrée (215, 730), 170 × 200** (appui jusqu'à
  y 842 ; le caisson du store reste sous le plafond, y ≥ 617).
- **S1** : avec `reachR [40, -235]` / `reachL [4, -228]`, les mains d'`AZ` ne sont qu'à 48 et 68 px des épaules (ancres
  `Persona.util.rig`) : à régler dans la scène (90–130 px, comme le demande le storyboard).
