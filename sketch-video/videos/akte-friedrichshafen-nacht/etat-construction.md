# État de la construction — AKTE 09 (arrêt volontaire, 27.11.2026)
Comptes rendus des étapes terminées, dans l'ordre. L'étape suivante du chantier doit lire ce fichier en premier.

## Étape terminée : décors 1 (socle + 1re partie des décors)
**Fait :**
- A (étape précédente, revue et 2 corrections) : D.ligne, D.horlogeLigne (fantôme corrigé : plus d'aiguilles), D.etiquetteTemps, D.refrain, D.mention, D.lavis, D.autocollant, D.medaillon (+ D._.clipRond), D.crane, D.craneNoms, D.dedans, D.gisant, D.teteProfil (cercle à 1 corrigé)
- B1 D.entree (parties fond, clapet, blouse, halo)
- B2 D.lettre (souligne, plume « Einspruch », petit, montant:false)
- B3 D.pretoireCoin (parties fond, rayon, pupitre, halo)
- B4 D.grillePointillee (plaque, dash, trou, ouv)
- B5 D.feuilleRat (dechire)
- B6 D.couloirNuit (parties fond, porte, panneau, halos ; nu)
- B7 D.polaroid (photo, anneau jaune, badge Instagram, scotchs)
- C1 D.carteLac (parties cadre, lac, vagues, nom, villes, route)
- C2 D.miniCarte
- C3 D.coupures (n, i, dates, vide, coin)
- C6 D.voilier
- D1 D.nuit (fond, fenetres)
- D2 D.lampadaire (mat, lumiere)
- D3 D.route (fond, touffes)
- D4 D.arbreNuit
- D5 D.brume
- D6 D.papillons
- D7 D.velo (phare, roues, cadre, pedalier ; ebike, flip, bequille, phareL)
- D8 D.casque, D.capuche, D.sacDos
- D9 D.pre (fond, trace, herbes)
- D10 D.urgencesFacade (fond, portes, caisson)
- D11 D.rtw (caisse, roues, feux ; flip, porte)
- D12 D.silhouette (marche, pousse)
- E5 D.brancard (roues, lit, barriere)
- E10 D.styloChignon, D.masqueCou
- story.js, index.html, glossaire-episode.js : déjà faits par l'étape précédente, vérifiés (CAST exact, AKTE_NO 09/10, question, view s1/oy0/breathe0 ; aucun mot des sous-titres ne déclenche le glossaire)

**Reste à faire :**
- C4 D.helico
- C5 D.horlogeGrande
- E1 D.boxMur
- E2 D.rail + D.rideau
- E3 D.lampeExamen
- E4 D.scope
- E6 D.planchette
- E7 D.porteFond
- E8 D.alarmeMurale
- E9 D.ballon
- E10 D.lampeStylo, D.montreBroche
- E11 D.feuilleGros
- F1 D.chambreNeutre
- F2 D.litNeutre
- F3 D.chaiseSweat
- F4 D.veilleuse
- G1 D.aube
- G2 D.amtsgericht
- G3 D.tilleul
- G4 D.rue
- G5 D.hall
- G6 D.porteSalle
- G7 D.encreMontant
- G8 D.salle
- G9 D.dos
- G10 D.bancParties
- G11 D.negatoscope
- G12 D.marteauReflexes, D.lunettesLecture, D.plume, D.foulard
- G13 D.pupitreJuge
- G14 D.plaqueCT
- G15 D.billet
- G16 D.urteilBlatt
- G17 D.encrier
- H1 D.carteDeclencheur
- H2 D.porteCT
- H3 D.feuilleSurveillance
- H4 D.etiquetteBagage
- H5 D.pips
- D.exemple : à supprimer avec les scènes d'exemple de scenes-1.js

**Notes pour la suite :**

Tout est dans /home/user/testt/sketch-video/videos/akte-friedrichshafen-nacht/decor.js, sauvegardé (commit fc80186). errcheck à 1, 6 et 12 s : SV.error=undefined.

Ce que j'ai trouvé en arrivant : l'en-tête de decor.js marquait B, C1-3, C6, D, E5 et E10 « fait », mais seules les fonctions A existaient. Je les ai toutes écrites. L'en-tête est maintenant exact. story.js, index.html, glossaire-episode.js et assets/ étaient déjà en place et corrects : je n'y ai pas touché.

Deux défauts de l'étape précédente, corrigés :
- l'horloge fantôme montrait encore « 3 h » avec ses aiguilles grises : elle n'a plus d'aiguilles, seulement un « ? » ;
- le cercle de D.teteProfil disparaissait à cercle = 1.

Les écarts avec le storyboard sont listés à la fin de storyboard.md, section « Écarts de construction ». Les principaux :
- la blouse est déplacée (crochet à (836, 386) à l'écran) : elle cachait la lampe de la console ;
- pas de paillasson : il passait sous « ما قبلاتش » ;
- dans la lettre, le cachet est en haut et « Einspruch » est plus bas ;
- D.velo est à l'échelle des personnages (roues r 77, géométrie de l'essai de la pose « à vélo ») ;
- D.rtw fait environ 380 × 235 (en S7 elle va de x 190 à 570) ;
- la grille s'ouvre jusqu'à 70° ;
- le masque est dessiné sous l'ancre `neck`, qui est à hauteur de bouche ;
- la barrière du brancard est une partie DEVANT le garçon, avec le crochet de la planchette.

Pour les scènes :
- Les grands décors ont des parties (o.part). Le fond se pose avec m.obj, chaque partie mobile dans son propre nœud. Le commentaire de chaque fonction donne l'ordre de pose et les ancres.
- Le clapet de la lettre se fait battre avec o.ouv, pas avec m.pend.
- Vélo, ambulance, silhouette, casque, capuche et sac à dos sont de profil vers la droite. o.flip les tourne vers la gauche, et les ancres sont déjà retournées.
- Le casque doit tourner avec la tête. Le sac se pose avant le personnage.
- La silhouette marche avec ph = 0,25 et 0,75 (à 0 et 0,5 les pieds sont joints).
- En S6, mettre phareL ≈ 120 au vélo garé.
- En S6, le casque de VEL arrive à environ y 268 (cadre à 262) : ça passe juste.
- La bascule du vélo en S5 reste à régler dans la scène.

Contrôle : en plus des planches d'essai, j'ai monté S1 à S7 à l'échelle réelle avec les personnages Persona aux places du storyboard. Le script est hors dépôt : /tmp/claude-0/-home-user-testt/16821d81-3ee0-5654-a925-64cfd373d8b4/scratchpad/compose.mjs, images dans le dossier compo/ à côté. L'étape des scènes peut le réutiliser.

Limites de l'outil d'essai : avec --cols 4, ou plus de 6 dessins par planche en 2 colonnes, les images sont coupées. Utiliser --cols 2 --cell 540 --per 6. Pour l'essai du polaroïd, la photo est lue avec un chemin relatif à out/essais.

## Étape terminée : décors 2
**Fait :**
- Étape 1 (revue de decor.js) : planches d'essai de toutes les fonctions existantes regardées ; aucun dessin raté, rien redessiné. decor.js : D._ reçoit en fin de fichier partie, sol, membre, BLOUSE, MUR, NUIT_H, profilGar, TEMPE ; lancement des suites en attente (D._attente) ; en-tête d'état mis à jour ; conventions complétées
- E1 D.boxMur (mur, bande, rampe 3 prises + 2 gaz, sol, renfoncement du couloir ; ancrage (0, ligne), y = −h)
- E2 D.rail (ancrage bout gauche (120, h 748)) + D.rideau (ancrage (112, h 742), filet, 7 plis, embrasse ; m.sway pivot (0,0))
- E3 D.lampeExamen (parties lumiere = cône derrière les personnages, bras ; o.lum ; ancrage platine (470, h 760))
- E4 D.scope (parties pied, ecran, cable ; o.t, o.plat, o.ecg, o.cable ; jamais d'alarme ni de chiffre)
- E6 D.planchette (104 × 130, Verdacht Kalam 20 / Beobachtung Kalam 14, o.mot, o.mot2 ; ancre mot)
- E7 D.porteFond (parties porte, plaque ; label CT / Intensiv, lum, ouv, voyant, liser)
- E8 D.alarmeMurale (o.on, o.appui)
- E9 D.ballon (o.p, o.masque)
- E10 D.lampeStylo (o.vers, o.a, o.L, o.on), D.montreBroche (sans aiguilles)
- E11 D.feuilleGros (modes verdacht : p1, p2 ; pupillen : case vide + cercle ; o.rond = essai seulement)
- C4 D.helico (parties corps, pales ; o.rot 0/1/2 ; posé sur un H cerclé)
- C5 D.horlogeGrande (boîtier, 60 graduations, o.h, o.secteur, o.r)
- F1 D.chambreNeutre (fond, lumiere ; o.vie ; ancrage (40, h 80))
- F2 D.litNeutre (ancre gisant (−215, −120))
- F3 D.chaiseSweat (parties chaise, cordons)
- F4 D.veilleuse (o.on)
- G1 D.aube (fond, soleil, nuages o.i, oiseaux o.i/o.aile)
- G2 D.amtsgericht (fond, lanternes o.lum)
- G3 D.tilleul
- G4 D.rue
- G5 D.hall (fond, globe o.i, coin ; tableau abaissé à y écran 600–840)
- G6 D.porteSalle (fond, vantaux o.ouv, plaque o.flash, lumiere)
- G7 D.encreMontant (o.delave, o.gouttes, o.bord, o.sol)
- G8 D.salle (plans fond / experts / nu ; parties fond, rayons o.dx, estrade, halo, tables, barriere ; ancre poussiere)
- G9 D.dos (mère / père ; parties corps, bras ; penche, tremble + ph, mouchoir, bras, ecart) + D.dosCoupleEssai (essai seulement)
- G10 D.bancParties
- G11 D.negatoscope (l1, l2, egal, diff, scan)
- G12 D.marteauReflexes, D.lunettesLecture, D.plume (o.goutte, o.a), D.foulard
- Hors inventaire (pièces de HUD des scènes) : D.carteQ (S12), D.cadreCT (S16 : p, scan), D.etiquette (S14, S19, S20 : lignes de / ar / mn, icone moniteur, centre), D.rond (S21 : rx, ry, p)
- Contrôles : essai_decor de toutes les fonctions (planches regardées) ; S8, S9, S10, S12, S14 à S22 composées à l'échelle réelle avec les personnages Persona et les zones Instagram (images regardées) ; errcheck 1 et 6 s : SV.error=undefined ; écarts ajoutés à la fin de storyboard.md ; sauvegarde feecc56

**Reste à faire :**
- G13 D.pupitreJuge (S23)
- G14 D.plaqueCT (S23, S26)
- G15 D.billet (S24)
- G16 D.urteilBlatt (S25)
- G17 D.encrier (S25)
- H1 D.carteDeclencheur (S26)
- H2 D.porteCT (S26)
- H3 D.feuilleSurveillance (S27)
- H4 D.etiquetteBagage (S28)
- H5 D.pips (S26–S28)
- D.exemple : à supprimer avec les scènes d'exemple de scenes-1.js

**Notes pour la suite :**

Tout est dans videos/akte-friedrichshafen-nacht/decor-2.js, sauvegardé (commit feecc56). errcheck à 1 et 6 s : SV.error=undefined. L'en-tête de decor.js est à jour et les écarts sont à la fin de storyboard.md, section « Étape décors 2 ».

ORDRE DE CHARGEMENT (à reprendre dans decor-3.js). L'outil d'essai charge les fichiers par ordre alphabétique : decor-2.js avant decor.js. decor-2.js commence donc par :
`if (D._ && D._.partie) suite(); else (D._attente = D._attente || []).push(suite);`
decor.js lance D._attente à sa fin. Dans index.html, l'ordre est decor.js, decor-2.js, decor-3.js : le code s'exécute tout de suite. decor-3.js doit faire pareil et prendre ses aides dans D._ : partie, sol, membre, tx, ar, rr, ombre, matières…

OUTILS.
- Planches lisibles : --cols 2 --cell 540 --per 6, ou --cols 3 --cell 360 --per 15.
- Composition à l'échelle réelle avec Persona : /tmp/claude-0/-home-user-testt/16821d81-3ee0-5654-a925-64cfd373d8b4/scratchpad/compose2.mjs (images dans compo2/).

ANCRAGES ET PARTIES.
- Décors du haut du diptyque : ancrage (0, ligne), y local = −h.
- Box :
  - D.boxMur en (0, LY) ;
  - D.porteFond « CT » en (765, h 130), « Intensiv » en (890, h 130) ;
  - D.rail en (120, h 748), D.rideau en (112, h 742) ;
  - D.alarmeMurale en (640, h 470) ;
  - D.lampeExamen en (470, h 760) : la partie « lumiere » AVANT les personnages, « bras » APRÈS ;
  - D.scope en (178, h 80), câble : o.cable ;
  - la planchette s'accroche au crochet du brancard (ancre crochet).
- Salle (S21), ordre de pose : fond, rayons, [JUG], estrade, halo, [PRO, DOC, AVO], tables, barrière, [D.dos mère, père corps, père bras], D.bancParties.
- D.dos du père : partie « bras » APRÈS la mère.

À RÉGLER DANS LES SCÈNES (vu sur les compositions).
- Autocollant : en (492, h 196). À 505, il cache aussi le « a » de « Verdacht ».
- D.helico en S17 : patins en (480, 940). À 950, l'aire touche le lac.
- S20 : la lettre cache le menton de DOC. Mains vers y −200, lettre en (470, ≈1095), montant en (470, ≈1120).
- S22 : D.teteProfil à ×0,6, centré (375 / 625, 600), sinon les mots de la case tombent sur les boucles. EX1 doit viser la rangée 1 (y ≈ 640) avec un reachR : PP.point vise la rangée 2.
- S14 : la citation fait ≈ 605 × 126 (x 110–715). Le médaillon D est déjà refermé quand elle arrive.
- S20 : l'étiquette « § 411 » tient sur trois lignes (y 430–580). La phrase arabe est coupée en deux, mêmes mots.

À SAVOIR.
- D.feuilleGros « pupillen » : la case est vide. La source dit seulement que l'indication manque. Ne pas y écrire de tiret.
- D.montreBroche n'a pas d'aiguilles : aucune heure lisible.

## Étape interrompue

« décors 3 + HUD + mises en place » avait commencé quand le chantier a été mis en pause : ses fichiers sont sauvegardés tels quels (travail partiel). La reprise relance cette étape ; l'agent regarde ce qui existe et complète.

Où en était l'agent (sa liste de tâches au moment de l'arrêt) :
- en cours : decor-3.js (G13–G17, H1–H5, S29–S30)
- pas commencé : dessins délicats (gisant, dos, crâne), story.js (fonctions du temps, diptyque, X.aides, X.lieux, affiche), contrôles
