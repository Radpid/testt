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

## Étape terminée : décors 3, HUD, mises en place
(reprise de l'étape interrompue ci-dessus : decor-3.js, le HUD, X.aides et X.lieux étaient déjà écrits ; j'ai contrôlé, corrigé et fini)

**Fait :**
- decor-3.js : D.caseFile, D.deskLamp, D.ruleCard, D.lessonCard, D.bedsideCard, D.sampleTube, D.rewKey, D.pageFlip, D.dripBig : tous dessinent, planches d'essai regardées (rien à reprendre). L'affiche (scène 26) réutilise D.rollCounter (story.js, bloc « affiche »).
- grep des noms D.xxx du storyboard contre les fonctions définies : TOUS existent (D.scaleGeom = fonction non énumérable de decor.js ; « D.nom » n'est qu'un exemple de syntaxe dans le storyboard). D.exemple supprimé (plus utilisé).
- story.js : HUD propre (bloc #hud04 : compteur A/B, onglet du jour, vol vers le chariot) ; X.aides ; X.lieux = balance, salle, chambre, regle. Le HUD du socle n'est pas touché.
- Dessins délicats contrôlés à grande taille : lit + patient assis (chambre, nuit et jour), fauteuil de dos, manche de costume, loupe (5 états). Défaut trouvé et corrigé : les PIEDS du patient dépassaient sous le lit (Persona n'a pas d'option pour cacher les jambes) → nouvelle aide X.aides.ppBed (Persona sans les jambes, via X.aides.noLegs), utilisée par X.lieux.chambre.
- Planches des quatre lieux (scènes d'essai de scenes-1.js) regardées avec --ig : décors complets, cascade, vie ; errcheck sur 27 instants : SV.error=undefined ; essai_decor complet : toutes les fonctions dessinent.
- En-tête de decor.js : tout est « fait » (ou « abandonné » pour D.exemple).

**Reste à faire :** les scènes (scenes-1.js … scenes-4.js). scenes-1.js contient encore les scènes d'ESSAI des lieux : l'étape « scènes, partie 1 » les remplace.

**Notes pour la suite :**
1) Lieux : X.lieux.balance(c, o) (scènes 1, 18–20), X.lieux.salle(c, o) (2, 17), X.lieux.chambre(c, o) (11–13), X.lieux.regle(c, o) (22–24) ; paramètres décrits en tête de chaque fonction dans story.js. Les personnages de la scène se posent dans lieu.actors.g (bonne profondeur).
2) Aides (X.aides) : halo, fat/tired (fatigue), ppC/phC (Persona + cernes), ppBed (assis dans un lit, sans jambes), stride/walker (marche sans glissade), colStart/hours (frise et compteur), tilt/calm/geomAt (balance), toScreen/sceneAt, typed (machine à écrire), quote (bande des citations), chip (UNE pastille centrée 540,450 dans c.hud), rekon (mention Rekonstruktion), marker, ring, snip, scan (lignes de rembobinage), grey, stamp, cartCounter.
3) Points fragiles vus sur les planches d'essai : scène 17, l'expert assis (x ≈ 805 + chaise) entre dans la colonne des boutons en fin de scène ; scènes 22–24, le bord droit de la carte jaune frôle x 915 avec la poussée de caméra ; scène 11, la poche frôle le visage de l'héroïne quand son bras est levé.

## Étape terminée : scènes, partie 1
**Fait :** scenes-1.js réécrit : scènes 1 à 6 du storyboard (accroche balance ; salle + rembobinage ; intro de Yassine sur la fiche du tableau de garde, summary: false ; Köln → la feuille ; les deux poches ; la frise des 63 heures + la garde). Les scènes d'ESSAI des lieux (11, 13, 17, 18, 21, 22, 25) ont été retirées de scenes-1.js : les lieux restent dans story.js (X.lieux). Contrôles : errcheck sans erreur ; planches --entre b1,b7 (avec et sans --ig) regardées ; image par image 0 → 1,1 s (accroche) et 21,9 → 23 s (frise, marche) ; overlapscan 0 → 27,4 : seulement des chevauchements de passage (chute de la carte, coup du tampon, balancier de la fiche, transitions, rouleaux du compteur) ; mouvement : aucun beat de b1 à b7 figé (le plus calme : i1 9,6 %). Écarts : storyboard.md, « Écarts de construction ».

**Reste à faire :** scènes 7 à 25 (scenes-2.js à scenes-4.js). Tant qu'elles n'existent pas, la scène 6 dure jusqu'à la fin (beats b8+ « FIGÉ » dans mouvement.mjs : normal).

**Notes pour la suite :**
1) Aides locales de scenes-1.js (à recopier si besoin) : tape() = texte .tw tapé puis « dé-tapé » (rembobinage) ; pendA() = angle d'un pendule amorti, pour les dessins qui dépendent de l'angle (surface du sang : bloodBag o.slope = l'angle de la poche).
2) La classe .ar est en direction rtl : pour aligner un arabe à DROITE sur x, text-anchor "start".
3) Une pastille posée à y 450 passe sous le bout du fléau quand la balance penche (scènes 18–20) : vérifier l'arabe des pastilles.
4) Scène 6 : la marcheuse suit la caméra par une copie de la courbe de caméra SANS secousse (cx(t)) ; phase de marche = distance ÷ foulée (X.aides.stride).

## Étape terminée : scènes, partie 2
**Fait :** scenes-2.js : scènes 7 à 13 du storyboard (couloir du samedi soir ; tableau du personnel ; passe-plat du labo, Rekonstruktion ; Begleitdokument ; chambre 21:50 ; 0 contre A avec la loupe ; dimanche 13:37, muette, tout se fige et devient gris). Contrôles : errcheck sur 27 instants de tout l'épisode sans erreur ; planches --ig de b8 à b16 et images de fin de scène regardées ; image par image de la scène 11 (la poche qui passe de la main au crochet) ; overlapscan 27,4 → 55,6 : seulement des chevauchements de passage (transitions, rouleaux du compteur, chiffres des cases du mois en double par construction, loupe sur le champ « Blutgruppe: ») ; mouvement : aucun beat de b8 à b16 figé (b15 : 4 %). Écarts : storyboard.md, « Écarts de construction ».

**Reste à faire :** scènes 14 à 26 (scenes-3.js, scenes-4.js). Tant qu'elles n'existent pas, la scène 13 dure jusqu'à la fin (b17+ « FIGÉ » : normal).

**Notes pour la suite :**
1) La scène 13 se termine quand la scène 14 commence (storyboard : `b16@end+1.9`) ; son gris (X.aides.grey) agit sur le calque de la scène 13 seulement.
2) Scène 14 (muette 2) : le HUD est déjà gris et l'onglet masqué après `b16@end+1.9` (story.js) ; aucune horloge.
3) scenes-2.js : bagLevel / tubeFill (niveau de la poche, sang dans la tubulure) sont des fonctions du temps partagées entre les scènes 11 et 12 ; pour une main sur un objet, viser l'objet en IK (reachR + bendR) depuis la position du personnage, et vérifier que la cible est à < 105 px × échelle de l'épaule.
4) Points à surveiller : scène 12, après le zoom l'horloge est en partie dans la marge gauche (son rôle est fini) ; scène 11–12, le dos de l'héroïne (x 850) est à 0–5 px de la colonne des boutons.

## Étape terminée : scènes, partie 3
**Fait :** scenes-3.js : scènes 14 à 20 du storyboard (muette 2 : elle glisse le long du pilier, le stéthoscope tombe, « nervlich zusammengebrochen », la porte « Verwaltung » s'ouvre, Rekonstruktion ; le bureau : la manche tend le stylo, elle le prend, l'insert « Erklärung » monte, la ligne se tape, elle signe, tampon UNZUTREFFEND, le « ؟ » coupé, le classeur « Verantwortung » poussé vers elle ; les mois : la fenêtre des saisons, la blouse pendue ; retour au tribunal : carte en pointillés « 90 Tagessätze — beantragt — », pastille grise ; la balance en trois scènes : bloc → quatre tranches vers le chariot, vol du compteur, petit poids « 1 », SCHULDIG / مذنبة, poids « 90 » dissous, trois cailloux, § 60 StGB / الإعفاء من العقوبة, fléau immobile à l'horizontale). Contrôles : errcheck sur 22 instants (SV.error=undefined) ; planches --entre b17,b24 avec et sans --ig regardées ; image par image 54,6 → 55,7 (glissade), 59,9 → 61,0 (stylo, insert), 68,9 → 70,0 (vol du compteur, tranches) ; images de fin des scènes 19 et 20 en grand ; overlapscan 54,2 → 80,1 : seulement des chevauchements de passage (transitions, tampons qui claquent, fondu croisé du compteur à l'atterrissage, compteur qui vole) ; mouvement : b17 à b24 entre 5,5 et 32 %. Écarts : storyboard.md, « Écarts de construction ».

**Reste à faire :** scènes 21 à 25 et l'affiche (scenes-4.js, story.js). Tant qu'elles n'existent pas, la scène 20 dure jusqu'à la fin (b25+ « FIGÉ » : normal).

**Notes pour la suite :**
1) scenes-3.js : `balance3(c, no)` construit la balance complète (scènes 18–20) en fonction du temps ; la caméra de ces scènes est `CAM_B(beat)` (×0,94, cy 954) : la garder si une autre scène reprend la balance.
2) Scène 20 se termine à b25 (cut) : l'image de l'affiche est prise à la fin (tampon § 60 posé, fléau droit).
3) Pastilles près d'une mention « Rekonstruktion » (x ≥ 735, y 404–455) : décaler la pastille (o.x) ; pastilles sur un décor haut : o.y 398.
4) Défaut connu : scène 14, pendant le zoom de b17 (×1,1), la porte fermée (décor) est en partie dans la colonne des boutons.

## Étape terminée : scènes, partie 4
**Fait :** scenes-4.js : scènes 21 à 25 (le dossier « Rechtskraft » : rouleau toujours flou qui ralentit, deux à-coups et repart, le « ؟ » tombe sur la sangle et y reste, lampe, poussière, pastille `Rechtskraft nicht veröffentlicht` ; la règle en trois pages avec « toi » : la carte se remplit, en-tête tapé, coin de lit et bracelet, trois liens en pointillés jaunes, Bedside-Test (tube du patient, deux gouttes, champs lisses, « = 0 »), la feuille qui sort de derrière les cartes, main levée, non de la tête, coche qui se défait, grand ✗, coche ⑥ ; le sang ne revient pas : touche « ◀◀ », pages qui reviennent, icônes qui filent, la goutte tombe, le front rouge descend, tressaille et ne remonte pas, touche grise). decor-3.js : bloc « ajouts partie 4 » (D.benchTop, D.bedCorner, D.tableCorner, essais regardés). story.js : ordre du texte du ruban de l'affiche (bidi). L'affiche-résumé existait déjà (24 cases, 6 colonnes, question en deux lignes, « كتب ليا الرقم فالكومنتير », flèche, petit compteur flou, teaser AKTE 05 · قريبا) : contrôlée.
Contrôles : errcheck toutes les 3 s de 0 à 99 + 93,6 / 95 / 97 / 98,9 (SV.error=undefined) ; planche --entre b25,b29 --ig regardée ; images en grand des scènes 22, 23, 24, 25 ; image par image 90,7 → 91,8 (scène 25) ; planche --ig des 7 dernières secondes (fin de 25, dézoom, affiche) et affiche en grand regardées ; overlapscan 80 → 93,4 : chevauchements de passage seulement (tampon qui claque, transition, feuille derrière la carte) et boîtes de lignes arabes du dessin de la carte (invisibles) ; mouvement : « tout bouge (≥ 3 %) », b25–b29 entre 11 et 30 %.

**Reste à faire (étapes suivantes du chantier) :** revue visuelle indépendante, puis contre-revue (débuts de scène image par image) ; après la voix : montage, synchronisation (tous les repères sont des « bN@mot »), son, rendu.

**Notes pour la suite :**
1) Défauts encore visibles, connus : scène 14, pendant le zoom de b17, la porte fermée (décor) est en partie dans la colonne des boutons ; scène 25, pendant le zoom final, le haut de la grande poche (sa bride) passe sous la barre de progression (zone du haut, y < 250) ; scène 22, les liens en pointillés jaunes passent devant son buste (annotations voulues).
2) Scènes 22–24 : les objets qui doivent passer DERRIÈRE les cartes (coin de lit, feuille) sont insérés avant le nœud de la carte : `R.card.g.parentNode.insertBefore(node.g, R.card.g)`.
3) scenes-4.js `RULE()` : toutes les fonctions du temps de la carte (lignes, coches, surligneurs, leçons) partagées par les scènes 22, 23, 24.
4) Le minutage est PROVISOIRE : après la voix, revérifier en priorité les scènes courtes (21 : 2,0 s ; 16 : 1,9 s) et les décalages fixes (scène 15 : la manche attend b19 + 0,35 ; scène 18 : la pastille attend + 0,42 s après b22@Organisationsverschulden).

## Étape terminée : revue visuelle et corrections
**Fait :** revue indépendante de tout l'épisode sur captures : errcheck toutes les 3 s, planches 2 images par beat normales et `--ig` (`out/planches/revue1/` avant, `out/planches/revue/` après), images en grand des instants suspects avec les zones Instagram, overlapscan 0 → 99, mouvement. 22 points relevés dans `revue.md` (tableau scène · instant · défaut · gravité · correction · état), 14 corrigés : horloge de la chambre (x 240) et caméras des scènes 11–12 ; porte de la scène 14 (x 600) et zoom de b17 ; zoom final de la scène 25 (cy 815) ; lampe de la scène 21 (x 200) ; salle de la scène 17 (travelling sans poussée, expert x 790) ; coude de la scène 8 ; citation de la scène 7 (cy 905 + bande 40 px plus bas) ; bande de papier derrière toutes les citations et la ligne tapée de la scène 1 (`X.aides.strip`) ; store de la scène 15 ; buste dédié `D.bust04` sous les têtes en gros plan (scènes 10 et 23) ; bidi de la traduction de Blutführerschein dans les sous-titres (U+200F). Contrôles finaux : errcheck sans erreur, mouvement « tout bouge », overlapscan : seulement des chevauchements de passage. storyboard.md : tableau « Revue visuelle » ajouté aux « Écarts de construction ».

**Reste à faire :** contre-revue (débuts de scène image par image, moments forts, textes contre scenario/recherche), instagram.md, section « État de l'épisode et suite » de revue.md.

**Notes pour la suite :**
1) `A.phC(x, y, s, fn, bust)` : bust = options de `D.bust04` (outfit "coat" | "scrubs", badge, w, bottom) ; le buste est dessiné PAR-DESSUS le bas du cou.
2) `A.strip(n, px, py)` : bande de papier derrière un nœud texte (mesurée quand les polices sont chargées) ; `quote` l'applique toujours ; `quote(…, { dy })` décale la bande des citations.
3) Restent (décor en bord de cadre, voulus ou sans information) : tableau de l'intro, porte 3 (scène 7), tiroirs du bureau (15), banc (2, 17), tubulure sous les sous-titres (25), liens jaunes devant « toi » (22).
4) Outils de capture de cette étape (scratchpad akte04-revue) : snap.mjs (images pleine taille à des instants donnés), montage.py (planche avec zones Instagram et repères x 90 / 990, y 1470).
