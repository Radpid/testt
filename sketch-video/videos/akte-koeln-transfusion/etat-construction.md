# État de la construction — AKTE 04 (arrêt volontaire, 27.11.2026)
Comptes rendus des étapes terminées, dans l'ordre. L'étape suivante du chantier doit lire ce fichier en premier.

## Étape terminée : décors 1 (socle + 1re partie des décors)
**Fait :**
- Socle (étape précédente, vérifié complet) : index.html (titre), story.js (AKTE_NO 04, AKTE_NEXT 05, TITRE « 63 ساعة », QUESTION en deux lignes + QUESTION_SUITE, Stage.create view {s 1.06, oy -20, breathe 0.04}, CAST des 7 personnages DOC/PAT/JUG/SCF/SCM/EXP/TOI avec les paramètres exacts du § 1, TENUE par lieu), glossaire-episode.js (tous les mots du tableau « Mots allemands à l'écran » absents de serie/glossaire.js ou traduits autrement, dont schuldig → مذنبة), assets/portrait.png
- A. Signature : D.rollCounter (blocs A « WOCHE » et B « NOTDIENST 24 h » avec plate, blur, dead, flash, lit, roue), D.bloodBag, D.tube (+ o.k ajouté), D.hourGrid, D.hourCol, D.dutyBoard (+ D.magnet, D.feltPen), D.pinCard, D.magnetStrip, D.dayTab (+ o.blur/o.streak et rétrécissement des textes longs, ajoutés), D.loopTag, D.rewindMark, D.scanLines
- Cadre de l'intro (scène 3) : D.dutyBoard, D.pinCard, D.note04, D.hookKey (anneau corrigé), D.markerString, D.hourGrid mini (trait adouci), D.glint (ajouté : reflet du cadre alu, scènes 3 et 6)
- B. Tribunal (scènes 1, 2) : D.courtRoom (+ o.bottom/o.fade, fuyantes et panneaux découpés au mur), D.tallWindow, D.lightShaft, D.plaque04, D.bench04, D.carafe, D.glass, D.dock, D.tissueBox, D.dockTable, D.scale04 + D.scaleGeom (non énumérable), D.guiltBlock, D.folder (+ o.page ajouté, sangle hors de l'étiquette), D.typedCard (essais recalés pour le tampon § 60)
- Scènes 4 à 6 : D.rhine, D.dom, D.riverWaves, D.formSheet, D.pen, D.wallBar, D.corridor04 (+ o.bottom/o.fade), D.callLight, D.sconce, D.cernes
- Contrôles : essai_decor (16 planches, toutes regardées, aucune fonction vide ni en erreur) ; compositions des scènes 1 à 6 à l'échelle avec Persona, caméra et zones Instagram (scratchpad akte04-compo) ; errcheck 1 6 12 : SV.error=undefined
- storyboard.md : section « Écarts de construction » ajoutée à la fin ; en-tête de decor.js à jour ; sauvegarde fa942a9 « AKTE 04 : socle et décors 1 »

**Reste à faire :**
- B. Tribunal : D.slab, D.coreWeight, D.weight90, D.pebble, D.cart, D.caseFile, D.deskLamp, D.loupeSmall
- C. Hôpital : D.labHatch, D.rack, D.docSheet, D.clock04, D.bedBack04, D.bedFront04, D.wristband, D.ivPole, D.nightstand04, D.nightWindow, D.kidneyDish, D.loupe (globules + pinces), D.officeBack, D.blinds, D.binders, D.desk04, D.chairBack, D.suitArm, D.binderLying, D.chair04, D.coatRack, D.seasonWindow, D.staffCard, D.monthCell, D.licenceCard, D.ruleCard, D.lessonCard, D.bedsideCard, D.sampleTube, D.bedIcon, D.pillar, D.stetho, D.adminDoor, D.frame04, D.wardRoom (la chambre)
- Fin : D.rewKey, D.pageFlip, D.dripBig
- À supprimer avec les scènes d'exemple de scenes-1.js : D.exemple

**Notes pour la suite :**

L'étape précédente s'était arrêtée sur la limite d'usage (commit 165d7fb) : story.js, index.html, glossaire et tous les décors des scènes 1 à 6 étaient déjà écrits. Je les ai contrôlés et corrigés, rien n'a été refait de zéro. Les décors restants (liste ci-dessus) vont dans decor-2.js et decor-3.js, qui sont encore vides.

Ce que la suite doit savoir :
1) Aides partagées : window.EpDecor.kit = { el, ln, tw, MAT, mixc, hs, sample, lens, at, cut, pin, gear, rollWindow, circ, poly, INK, YEL, SH, PAPER, RED, RED2… }. decor-2.js et decor-3.js doivent les reprendre (const K = D.kit) au lieu de les recopier.
2) Sol : D.courtRoom et D.corridor04 s'arrêtent à y 1420 par défaut, puis se fondent dans le papier. Dans la scène 1, passer bottom: 1610, sinon la sellette (jusqu'à y 1570) et la barre (jusqu'à 1600) flottent sur le papier.
3) Scène 2 : taper les lignes de la carte à y −56, −22, 14, 46 (repère de la carte) et poser le tampon « § 60 » à (130, 88) dans le repère de la carte. À (650, 1238), comme le dit le storyboard, il recouvre « wird abgesehen. ».
4) Scène 5 : la tubulure prend k: 1.4 (les poches sont à ×1,5).
5) Performance : pour les objets qui frémissent, utiliser bench04({ carafe: null }) + D.carafe à part, et dock({ props: false }) + D.tissueBox et D.glass à part. Pour la balance, deux nœuds : part "base" (fixe) et part "beam" (redessinée à chaque changement de tilt).
6) D.dayTab : avec rew, un texte de 15 signes passe automatiquement à 21 px. o.blur et o.streak couvrent l'état « rembobinage flou » du § 3.2.
7) D.rollWindow utilise un <svg> imbriqué. La boîte de mesure déborde, mais l'image est bien découpée.
8) Point fragile : le storyboard place le tableau de la scène 3 jusqu'à x 970 et le banc de la scène 2 jusqu'à x 900 (≈ 943 à l'écran). C'est du décor sans importance, mais il touche la colonne des boutons et le bord rogné : à surveiller sur les planches --ig.
9) Le scratchpad est partagé avec d'autres agents. Un agent d'AKTE 05 a écrasé scratchpad/compo/compo.mjs (je n'y ai pas touché). Mes outils de composition sont dans scratchpad/akte04-compo/ (render.mjs + s1_6.js) et peuvent servir pour les scènes suivantes.
10) Aucune commande git, à part une lecture (git log/status) au début pour voir l'état ; la sauvegarde est faite par tools/sauvegarde.sh.

## Étape terminée : décors 2
**Fait :**
- Contrôle de decor.js (étape précédente) : 16 planches d'essai regardées, aucun dessin raté, rien à reprendre. Dans decor.js, seulement deux ajouts techniques : segX et floorFade dans D.kit, et la relance de la file D._later.
- Scène 7 : D.clock04 (o.part face | hands, o.time, o.sector pour les 10 minutes)
- Scène 8 : D.staffCard (bande jaune vierge, aucun nom ; ancres head, line1, line2), D.monthCell (case numérotée, vide ou noircie), D.licenceCard (carte dans sa pochette ; o.ghost = contour en pointillés ; o.glint = reflet)
- Scène 9 : D.labHatch (o.part inside | shutter | front : vitre dépolie, ombre sans traits, frigo à six poches, diode jaune, volet roulant), D.labSign (enseigne LABOR qui grésille, à part), D.rack (ancres hooks, grip, post), D.bedIcon
- Scène 10 : D.docSheet (16 lignes, tableau coché, codes-barres, champ « Blutgruppe: » au gribouillis illisible ; ancres lines, field ; o.blur = filtre CSS), D.loupeSmall
- Scènes 11 à 13 (la chambre) : D.wardRoom (o.band false = mur nu de la scène 16), D.nightWindow (jour/nuit, lune, nuage ; o.part frame | sky), D.lightPatch (tache de soleil sur le mur ou au sol), D.nightstand04 (deux poches vides cochées + gobelet, ou un verre d'eau), D.bedBack04 et D.bedFront04 (lit vu de face ; o.part duvet | frame ; pancarte ; ancre armOut), D.wristband, D.ivPole (crochet réglé sur la main) + D.ivHook, D.kidneyDish
- Scène 12 : D.loupe (9 globules et 7 pinces ; o.flow, o.grab, o.burst, o.wig, o.drift ; sans clipPath), D.groupMark (annotations « 0 » et « A » : cercle tracé, étiquette, flèche, contour papier), D.womanIcon
- Scène 14 : D.pillar, D.stetho, D.adminDoor (o.open : le battant pivote et un coin de lumière jaune s'allonge vers elle), D.doorPlate, D.frame04
- Scène 15 : D.officeBack, D.blinds (o.part frame | slats ; ancre sill), D.blindLight, D.plant04, D.binders + D.binderSpine (le classeur penché, à part), D.desk04 (plaque Klinikverwaltung, façade à partir de x 85), D.chairBack (vu de dos), D.suitArm (manche, poignet, main en moufle qui tient le stylo ; ancres hand, tip), D.binderLying (« Verantwortung »)
- Scènes 15, 16, 17 : D.chair04 (assise à −84 pour Pose.sitEdge ; o.flip pour l'expert), D.coatRack + D.coatHung (blouse, stéthoscope, badge jaune vierge), D.seasonWindow (feuilles, neige, bourgeons ; o.part)
- Scènes 18 à 20 : D.weight90 (pointillés, console ; o.dash, o.gone) + D.stringTag (« beantragt », à part), D.cart (o.part body | wheels), D.slab (hours | licence | twins | sheet), D.coreWeight, D.checkIcon, D.pebble (crack | leaf | coat)
- decor-3.js : en-tête préparé (liste de ce qui reste, même garde de chargement)
- En-tête de decor.js : liste d'état à jour
- storyboard.md : lignes ajoutées à « Écarts de construction » (dessins faits autrement + placements à régler pendant le montage)
- Contrôles : essai_decor complet (32 planches, toutes les fonctions dessinent ; toutes les planches des nouveaux dessins regardées, puis corrigées : main du bras de costume, entrée des globules, neige sur la branche, blouse à l'échelle, contour papier des annotations) ; compositions à l'échelle des scènes 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18 et 20 avec les Persona, la caméra et les zones Instagram ; errcheck 1 6 : SV.error=undefined
- Sauvegarde : 1580c10 « AKTE 04 : décors 2 »

**Reste à faire :**
- decor-3.js (scènes 21 à 25) : D.caseFile, D.deskLamp, D.ruleCard, D.lessonCard, D.bedsideCard, D.sampleTube, D.rewKey, D.pageFlip, D.dripBig
- À supprimer avec les scènes d'exemple de scenes-1.js : D.exemple

**Notes pour la suite :**

Fichiers : /home/user/testt/sketch-video/videos/akte-koeln-transfusion/decor-2.js (nouveau), decor.js (kit et en-tête), decor-3.js (en-tête), storyboard.md (fin de la section « Écarts de construction »).

Ce que la suite doit savoir :
1) Ordre de chargement : l'outil essai_decor charge decor-2.js et decor-3.js AVANT decor.js (tri alphabétique). Sans précaution, plus rien ne se dessinait. decor-2.js et decor-3.js s'ajoutent donc à la file D._later si D.kit n'existe pas encore, et decor.js les relance juste après avoir défini le kit. Dans index.html l'ordre est déjà le bon.
2) Planche d'essai : le cadre #stage la coupe à 1080 px de large. Il faut toujours lancer --cols 2 --per 6.
3) Parties animées : un objet qui bouge à chaque image se pose en deux nœuds, dans cet ordre :
   - clock04 « face » puis « hands » ;
   - nightWindow et seasonWindow « sky » puis « frame » (le cadre est un anneau : il ne cache pas les carreaux) ;
   - bedBack04, puis le patient, puis bedFront04 « duvet », puis « frame » ;
   - labHatch « inside », puis « shutter », puis « front » (sign: false, et D.labSign dans son propre nœud) ;
   - blinds « frame » puis « slats » ;
   - cart « body » puis « wheels ».
   Les pièces qui pendent ou tombent sont des fonctions à part, chacune dans son nœud : ivHook (ancre hook2 de ivPole), coatHung (ancre hook de coatRack, avec coat: false), binderSpine (ancre lean de binders, avec loose: false), stringTag (weight90 avec label: false), doorPlate (adminDoor avec plate: false).
4) Ancres utiles :
   - rack.grip [-130, -3] : à 108 px de son épaule dans la scène 9, donc dans la portée du bras ;
   - bedFront04.armOut [105, -180] : la main du patient se pose sur la couette ;
   - ivPole.hook [56, -385], réglable avec o.hook ;
   - suitArm.tip et suitArm.hand sont donnés dans le repère du parent ;
   - chair04 : la hanche de Pose.sitEdge à y −96 tombe juste sur l'assise (−84) ;
   - docSheet.lines (6 lignes pour le surligneur) et docSheet.field ;
   - staffCard.head [0, 108] : la tête ph à l'échelle 0,5 ;
   - loupe.link : le bord bas droit, pour le trait qui la relie à la tubulure.
5) Le filtre CSS (blur, grayscale) marche bien sur un <g> SVG dans ce Chromium (testé). D.docSheet o.blur l'utilise, et le gris du décès (scène 13) peut s'en servir aussi. À l'échelle de la planche d'essai, le flou de 1,6 px ne se voit pas ; dans la scène il se verra.
6) Placements à régler au montage (le détail est dans le tableau à la fin de storyboard.md) :
   - scène 7 : appliques entre les portes, à x 415 et 695 ; voyants sur les ancres calls ; horloge à y 520 ;
   - scène 8 : l'en-tête « TEAM » passe dans la bande des pastilles après le zoom ×1,12 ;
   - scène 12 : après le zoom ×1,12, l'horloge et « ≈ 10 min » passent sous le compteur du HUD ;
   - scène 15 : décaler la mise en place d'environ 30 px vers la gauche (le fauteuil entre dans la colonne des boutons) ;
   - scène 16 : patère à x ≥ 240 (sinon la blouse sort par le bord gauche) ;
   - scène 11 : la poche frôle son visage tant que son bras est levé.
7) J'ai fait certains dessins autrement que le storyboard (le détail est dans storyboard.md) :
   - slab fait 150 de large (comme le bloc), pas 140 ;
   - le caillou « leaf » est une feuille d'arbre (le calendrier est réservé à AKTE 06) ;
   - le texte de loupeSmall est ajusté au verre (≈ 17 px) ;
   - la blouse pendue est à l'échelle Persona (≈ 141 × 240, pas 340 px de haut) ;
   - l'étiquette « beantragt » pend sous la console, loin des chaînes de la balance ;
   - la loupe n'utilise pas de clipPath, à cause des id que l'affiche-résumé recopierait en double.
8) Mes outils de composition sont dans /tmp/claude-0/-home-user-testt/16821d81-3ee0-5654-a925-64cfd373d8b4/scratchpad/akte04-d2/s7_20.js. Pour les rendre : node …/scratchpad/akte04-compo/render.mjs <repo/sketch-video> <dossier épisode> s7_20.js sortie.png 0.5.
9) Git : en plus de la sauvegarde, j'ai lancé une seule commande en lecture seule (git log/status) pour voir l'état du dépôt.

## Étape interrompue

« décors 3 + HUD + mises en place » avait commencé quand le chantier a été mis en pause : ses fichiers sont sauvegardés tels quels (travail partiel). La reprise relance cette étape ; l'agent regarde ce qui existe et complète.

Où en était l'agent (sa liste de tâches au moment de l'arrêt) :
- fait : decor-3.js (scènes 21–25 + affiche)
- en cours : story.js (HUD, X.aides, X.lieux)
- pas commencé : contrôles, dessins délicats, liste d'état, sauvegarde
