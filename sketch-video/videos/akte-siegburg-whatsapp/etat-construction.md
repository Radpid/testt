# État de la construction — AKTE 07 (arrêt volontaire, 27.11.2026)
Comptes rendus des étapes terminées, dans l'ordre. L'étape suivante du chantier doit lire ce fichier en premier.

## Étape terminée : décors 1 (socle + 1re partie des décors)
**Fait :**
- D.tel
- D.telVerre (ajout)
- D.semis
- D.reflet
- D.telMini
- D.barreEtat
- D.enTete
- D.bande (ajout)
- D.saisie
- D.bulle
- D.avatar
- D.avatarPatient
- D.sceau
- D.sepDate
- D.notif (bouton accepter corrigé : combiné au lieu d'une coche)
- D.caviar (texture de feutre ajoutée)
- D.gribouillis
- D.ascenseur
- D.ficheContact (cadre de l'intro)
- D.mention (ajout)
- D.anneau (ajout)
- D.croix (ajout)
- D.icoDienst (refait : plus d'anneaux de calendrier)
- D.icoUrlaub (transat refait en chaise longue lisible)
- D.icoCadeau
- D.piece
- D.porte
- D.pateres
- D.blouse
- D.tableauGardes
- D.aimant
- D.postit (arabe passé à 26 px)
- D.troisPostit
- D.planDeTravail
- D.machineCafe
- D.vapeur
- D.tasses
- D.plante
- D.ticketPoche
- D.colere
- D.poussiere
- story.js : AKTE_NO 07, AKTE_NEXT 08, TITRE, QUESTION, GROS_MOT, CAST complet (12 personnages), X.aides (TEL, VERT, MEMBRES, punch, buzz, defileur, semisY, zoomTel, decoupe)
- index.html : titre « AKTE 07 – الگروپ »
- glossaire-episode.js
- storyboard.md : section « Écarts de construction » ajoutée à la fin

**Reste à faire :**
- A : D.avatarSil (sc. 9), D.avatarToi (sc. 19), D.ligneSysteme (sc. 14), D.pouce (sc. 10-11), D.loupeCitation (sc. 10)
- B : D.billetWeekend (sc. 8), D.interdit, D.aPayer, D.ticketCaisse (avec D.outils.papierTicket), D.compteRecherche, D.pointInterro, D.camembert
- C : D.tuile, D.salleAudience (fond / table), D.fondNeutre, D.commandes, D.plaqueNom, D.champRecherche, D.plansUI, D.ficheLieu, D.coffre, D.cle, D.feuilleDiag
- D : D.widgetDate, D.soleilEte, D.enveloppe, D.lettre, D.stylo, D.pageJugement, D.chrono
- E : D.carton (sc. 14)
- F (salon, sc. 6) : D.fenetre, D.rideau, D.lampadaire, D.canapeDos, D.canapeDevant, D.gueridon, D.tasseFumante, D.tapis, D.certificat
- Fin : retirer D.exemple et les scènes d'exemple de scenes-1.js (étape des scènes)

**Notes pour la suite :**

Reprise : l'agent précédent s'est arrêté (limite d'usage) après avoir fait presque toute l'étape : copie du gabarit, story.js, index.html, glossaire, et dans decor.js tous les dessins des scènes 1 à 5 plus la salle des médecins (sauf le carton). Je n'ai rien refait. J'ai regardé chaque dessin et les maquettes de scènes laissées dans out/essais/compo_1 à compo_5.png, puis corrigé ce qui ne tenait pas :
- D.icoDienst avait deux anneaux et un bandeau, donc il ressemblait au calendrier réservé à AKTE 06. Il a maintenant trois petits bustes en tête de colonne, plus la grille.
- Le bouton « accepter » de D.notif (appel) portait une coche, alors que l'épisode n'en veut aucune. C'est maintenant un combiné de téléphone.
- Le transat de D.icoUrlaub était illisible ; c'est maintenant une chaise longue.
- L'arabe de D.postit passe de 24 à 26 px (règle des traductions).
- D.caviar a reçu une légère texture de feutre.
Aucune erreur JS aux instants 1, 6 et 12 (SV.error=undefined). Sauvegarde faite : de08fd6.

La tête de decor.js renvoyait à une section « Écarts de construction » qui n'existait pas. Je l'ai ajoutée à la fin de storyboard.md : les fonctions ajoutées (telVerre, bande, mention, anneau, croix), les dessins changés, l'ancrage du ticket (o.ax), et le glossaire.

Le glossaire n'est pas vide, contrairement à l'annexe A (R13). Un script vérifie, avec la règle du moteur (mot seul, paire de mots, phrase entière), qu'aucun mot des sous-titres n'y correspond : aucune traduction ne monte sur le menton. Ne jamais y ajouter une clé égale à un mot ou une paire de mots de beats.js.

POUR LA SUITE :
1) tools/essai_decor.mjs charge decor-2.js et decor-3.js AVANT decor.js (ordre alphabétique). Dans ces fichiers, ne lire D.outils, D.TEL, D.VERT qu'à l'intérieur des fonctions.
2) Planches lisibles : --cols 2 --cell 540 --per 6. Le cadre #stage fait 1080 × 1920 et coupe les planches plus grandes (les réglages par défaut 4 colonnes / 12 dessins ne montrent que deux colonnes).
3) Aides communes dans D.outils : tx (côté VISUEL start/middle/end, même pour l'arabe), mesure, ln, el, rond, ovale, rrectInv, bullePath, papierTicket (à reprendre pour D.ticketCaisse), hash, nid, poser (meuble posé à sa place, via D.nom.at).
4) Les meubles ont leur position monde du storyboard dans D.nom.at.
5) D.avatar suit l'échelle prescrite (r/82, descente de 0,14 r) : le menton touche le bord du rond pour les grands avatars (r 78). C'est voulu (photo de profil), mais à surveiller.
6) Le storyboard dit à la fois « aucune balance » (§ 0) et « balance dans D.sceau » (§ 1 et § 2). J'ai gardé la petite balance du sceau, la consigne la plus précise.
7) D.exemple et les scènes d'exemple de scenes-1.js (dont CAST.DOC, qui n'existe pas) restent en place jusqu'à l'étape des scènes.

## Étape terminée : décors 2
**Fait :**
- decor-2.js, salon (sc. 6) : D.fenetre, D.rideau, D.lampadaire (o.partie "lampe" | "cone"), D.canapeDos, D.canapeDevant (plaid à carreaux, franges o.t), D.gueridon, D.tasseFumante, D.tapis, D.certificat (o.cercle, o.tampon)
- decor-2.js, D.widgetDate (sc. 7, 12, 14 : haut/jour/bas, o.petit, roue o.roule + o.pos)
- decor-2.js, D.billetWeekend (o.dechire, o.moitie)
- decor-2.js, le fil : D.avatarSil, D.loupeCitation, D.pouce, D.ligneSysteme
- decor-2.js, ajouts : D.accolade, D.fleche (pleine ou en pointillé, o.p)
- decor-2.js, papier (sc. 12) : D.soleilEte, D.enveloppe (partie dos/devant, o.ouvert), D.lettre (o.plie, o.signature, ancres des avatars), D.stylo
- decor-2.js, « Plans » (sc. 13) : D.champRecherche, D.plansUI (fond/dessus), D.ficheLieu
- decor-2.js, départ (sc. 14) : D.carton (o.dy)
- decor-2.js, appel vidéo (sc. 15-16) : D.tuile (coins masqués, liseré seul), D.salleAudience (fond/table), D.fondNeutre, D.commandes, D.plaqueNom, D.camembert (ancre ico)
- decor.js : D.aimant({ qui: "gris" }) ajouté pour la scène 14 ; liste d'état en tête mise à jour
- storyboard.md : section « Étape décors 2 » ajoutée à la fin des « Écarts de construction »
- Contrôles : essai_decor (73 fonctions, 160 dessins, tout dessine, planches regardées), maquettes de composition des scènes 6, 7, 12, 13, 14, 15, 16 avec Persona et zones Instagram, errcheck 1 et 6 : SV.error=undefined
- Sauvegarde : 73d12a3 « AKTE 07 : décors 2 »

**Reste à faire :**
- decor-3.js, scènes 17 à 21 : D.avatarToi (sc. 19), D.interdit, D.aPayer, D.ticketCaisse (reprendre D.outils.papierTicket) (sc. 17-18), D.compteRecherche, D.pointInterro (sc. 18), D.coffre, D.cle, D.feuilleDiag (sc. 20), D.pageJugement, D.chrono (sc. 21)
- Étape des scènes : retirer D.exemple et les scènes d'exemple de scenes-1.js

**Notes pour la suite :**

Étape précédente : rien n'était incomplet. J'ai regardé toutes ses planches (decor.js) ; aucun dessin raté. J'ai seulement ajouté une variante à D.aimant : la scène 14 veut des aimants gris SANS pictogramme, c'est maintenant { qui: "gris" }.

Ce que j'ai fait autrement que le § 2 (tout est écrit dans storyboard.md, à la fin) :
- D.enveloppe fait 460 × 240 au lieu de 400 × 230 : la lettre fait 440 px de large et ne pouvait pas sortir d'une enveloppe plus étroite. On la voit côté adresse, avec le rabat derrière. Elle se dessine en deux appels : partie "dos", puis la lettre, puis partie "devant".
- D.certificat : « bis 02.06.2025 » ne tient pas en 26 px sur une feuille de 180 px. « bis » est donc au-dessus de la date. Le tampon a r 36 et « Notaufnahme » suit son bord : à plat, le texte débordait du rond.
- D.widgetDate : quand la roue tourne, on voit des traits horizontaux flous. Avec des formes verticales, on lisait un bouton « pause ».
- D.camembert : à r 96, la part jaune ne peut pas contenir à la fois « mindestens », « 30 % » en 40 px et l'icône Dienst. La fonction renvoie l'ancre `ico` (bord haut de la part, elle suit o.ecart). L'icône y va avec l'échelle 0,54.

POUR LES SCÈNES (vu sur des maquettes avec Persona et les zones Instagram ; le script est hors du dépôt, dans le scratchpad : compo.mjs) :
1) Les meubles du salon ont leur position monde dans D.nom.at (D.rideau.atDroite pour le rideau de droite). Le canapé se pose dans cet ordre : canapeDos → LUI → canapeDevant. La composition tient : LUI assis, plaid sur les jambes, certificat posé sur l'accoudoir droit (738, 1040).
2) D.lampadaire({ partie: "cone" }) pose le cône par-dessus le canapé. D.lampadaire({ partie: "lampe" }) dessine la lampe sans le cône. Le cône renvoie sa boîte pour m.dust, en repère local.
3) D.pouce : la main dépasse le bord droit du téléphone. La scène doit la découper à x 906 (la colonne des boutons commence à x 915).
4) Scène 12 : avec la caméra finale du § 4 (×1,06 centrée sur (590, 1010)), le widget et le soleil tombent à x ≈ 60–80 de l'écran, dans la marge rognée. Garder cx 540, ou décaler les deux d'environ 40 px vers la droite.
5) Scène 14 : le carton est centré en (−120, −240) dans le repère de LUI. La feuille de plante arrive sous sa barbe : descendre le carton de 10 à 15 px si elle la touche sur la capture.
6) D.tuile se pose PAR-DESSUS le contenu découpé (c.clipped) : elle masque les coins carrés. Pour le liseré qui passe d'une tuile à l'autre, D.tuile({ lisere: "seul" }) dessine deux nœuds à croiser en fondu.
7) D.salleAudience renvoie la position des pieds des juges dans le repère de la tuile : juge (329, 404), as1 (134, 396), as2 (524, 396). Les dossiers des fauteuils sont dans la partie "fond". Les objets posés sur la table sont dessinés avant le plateau, dans la partie "table".
8) D.lettre : la date et le titre sont à null par défaut, la scène les tape aux ancres renvoyées. Les avatars (LUI dans l'en-tête, ELLE au bloc signature) sont posés par la scène aux ancres avatar et signature (r 34).
9) Ancrages « écran » (pixels de la vidéo, à poser en 0,0) : D.champRecherche, D.plansUI, D.commandes. Ancrage coin haut-gauche : D.ficheLieu (172, 1170), D.ligneSysteme (240, 300), D.tuile, D.salleAudience, D.fondNeutre, D.plaqueNom, D.loupeCitation. Pour D.loupeCitation, o.vers est RELATIF à l'ancrage.
10) Rappels du compte rendu précédent, toujours valables : essai_decor charge decor-2.js et decor-3.js AVANT decor.js. Dans ces fichiers, D.outils, D.avatar, D.gribouillis, D.vapeur ne se lisent qu'à l'intérieur des fonctions. Planches lisibles : --cols 2 --cell 540 --per 6.
11) Toutes les chaînes arabes de decor-2.js ont été vérifiées par script : elles figurent lettre pour lettre dans scenario.md ou storyboard.md. Aucun vert ni bleu ajouté.

## Étape terminée : décors 3 + HUD + mises en place
**Fait :**
- decor-3.js : D.interdit (partie bulle | panneau), D.aPayer (horloge o.h, o.r 22→34), D.ticketCaisse (o.sorti, o.lignes, o.fente), D.compteRecherche (o.etat attente | rien, o.t), D.pointInterro, D.avatarToi, D.coffre (o.ouvert 0→100° avec revers de porte, o.molette, o.poignee), D.cle (o.jaune, o.texte | o.picto stetho, o.cote ; partie « crochet »), D.feuilleDiag, D.pageJugement (o.cercle, o.brille, o.feuilles, o.entete), D.chrono (o.a, o.couronne)
- Scène 22 : aucun dessin nécessaire ; l'affiche de story.js est réglée sur le storyboard (5 colonnes, crop [262, 1470], freezeAt {7, 8, 12}, carte (110, 1160, 760, 290), question sur deux lignes, flèche vers le bouton commentaire)
- decor-2.js : D.pouce, contour continu ajouté (il s'ouvrait aux jonctions, vu à 800 px)
- Contrôle grep : les 85 fonctions définies couvrent tous les noms D.xxx du storyboard (restent seulement TEL, VERT = constantes, et « nom » = exemple générique). essai_decor : 85 fonctions, tout dessine
- story.js, bloc X.hud (§ 3) : telephone, pastille, mention, banniere, ascenseur, compteur, fantome
- story.js, X.aides ajoutées : jaillit, dans, val, avatarVif, bulleFil, tape, curseur, brouillon (+ LIGNES, MOTS9) ; celles d'avant restent (TEL, VERT, MEMBRES, punch, buzz, defileur, semisY, zoomTel, decoupe)
- story.js, X.lieux : fil, contact, plans, appel, regle (ÉCRAN) ; salle, salon (PIÈCE) ; papier (PAPIER)
- Contrôles : 16 scènes d'essai provisoires (tous les lieux, les 4 entrées T-NOTIF / coupe / plongée / montée, fantôme, brouillon L9 + envoi, marche avec carton, juge main levée, affiche), planches avec --ig regardées ; dessins délicats regardés à 540 et 800 px (pouce, carton, clé, coffre, page) ; errcheck sans erreur ; scenes-1.js remis à l'original, il charge sans erreur
- decor.js : liste d'état en tête, tout est « fait », rien d'abandonné ; storyboard.md : section « Étape décors 3, HUD, mises en place » ajoutée
- Sauvegarde : 4c9528c « AKTE 07 : décors 3, HUD, mises en place »

**Reste à faire :**
- Étape des scènes : retirer D.exemple (fin de decor.js) et les scènes d'exemple de scenes-1.js

**Notes pour la suite :**

Étape précédente : rien n'était incomplet. Une seule retouche : le contour de D.pouce s'ouvrait à grande taille, je l'ai fermé.

Contrôles à signaler honnêtement :
- J'ai regardé toutes les planches de mes 11 dessins et celle du pouce. Les 30 autres planches de decor.js et decor-2.js ont déjà été regardées par les étapes d'avant ; je ne les ai pas rouvertes (le pouce est le seul dessin changé).
- J'ai lancé un « git status » en lecture, par erreur (c'est une commande git).

CE QUE LES SCÈNES DOIVENT SAVOIR

Mode d'emploi détaillé : les en-têtes de chaque fonction dans story.js. Exemple de scène d'essai : /tmp/claude-0/-home-user-testt/16821d81-3ee0-5654-a925-64cfd373d8b4/scratchpad/scenes-1.essai.js (hors dépôt, peut disparaître).

1) Scènes ÉCRAN. Il faut :
- appeler `const P = X.lieux.fil(c, {...})` (ou contact, plans, appel, regle), avec `entree: "notif" | "coupe" | "plongee" | "montee"` ;
- déclarer la scène avec `in: "cut"` et inDur 0,36 (notif, montée), 0,4 (plongée) ou 0 (coupe) ;
- ne PAS appeler `k.bg()` : le fond est déjà dans c.hud (troué en T-NOTIF) ;
- passer en `parent` les couches renvoyées : P.contenu, P.tete, P.bande (pastilles), P.dessus (loupe, carte « source », pouce), P.menton, P.notif (bannières), P.fil.g (tout ce qui défile, en coordonnées « défilement 0 ») ;
- mettre `buzz` et `punch` sur P.tel ;
- pour une date qui bascule : `dateAvant` + `date`. Mention : `mention: [de, ar]` ou `[{at, de, ar}, …]`.

2) Pastilles : `X.hud.pastille(c, de, ar, { at, until, size, yellow, micro: "laut Urteil", parent: P.bande })`. Position par défaut (525, 486). Appel vidéo : `y: 392`. PIÈCE / PAPIER : `{ x: 520, y: 420 }` dans c.hud. Les « » d'une citation sont à mettre dans le texte.

3) Brouillon (scènes 8 → 11) : `X.aides.brouillon(c, P.fil.g, { n0, etapes, ecrit, mots9, terne, envoi, elle })`.
- Il renvoie aussi `souligne(i, avant, mot, at)` (ex. sous « 549 € »), `xMot`, `yLigne`.
- `GROS_MOT` est déjà pris en compte pour L6.
- Scène 11 : passer `defile` (defileur), `semisStop`, `pale` et `saisie: { parti }` à X.lieux.fil.

4) Salle des médecins :
- scène 2 : `X.lieux.salle(c, {})` (cascade) ;
- scène 7 : `{ cascade: false, tableauDrop: true, widget: {petit, haut: "SA", jour: "31", bas: "MAI"}, widgetAt, aimants: [{qui: "lui", case: "fr"}, {qui: "lui", case: "so"}] }` ;
- scène 14 : `{ cascade: false, blouses: 2, machine: false, widget: (t) => ({…}), porte: (t) => … }`. Mettre `pos: 0` une fois la roue calée : avec un grand `pos`, le widget paraît vide.
- Les aimants sont DANS le nœud du tableau (ils suivent son balancement) : leurs coordonnées sont celles du monde.
- R.blouses[1] reçoit le m.pend au passage de LUI.

5) Salon : `X.lieux.salon(c, { lui: (t) => ({…}) })`, ou poser LUI soi-même dans R.lui (slot entre dossier et plaid) avec `pp(510, 1276, 1.05, fn, R.lui)`. Le téléphone en main (D.telMini) est à ajouter par la scène.

6) Appel vidéo :
- `X.lieux.appel(c, { entree: "montee", tuilesAt: "b14+0.4", actif: [{at, tuile: "B"}], elle, jug, as1, as2, micro })` ;
- la bannière d'appel se pose à part : `X.hud.banniere(c, { …, parent: P.notif, x: 215, y: 316, w: 620, h: 88, appel: true, appui })` ;
- la plaque « Stationsärztin » est posée par le lieu (P.plaque) : pour la bascule « uneinsichtig », la cacher et poser la nouvelle.

7) Plans : P.geo, P.carte (Node). L'épingle se pose avec `X.aides.dans(P.carte.g, pinAt(...))`, puis on agrandit P.carte autour de l'épingle. Siegburg est bien à l'ouest.

8) Sortie du téléphone : `X.hud.fantome(c, { at, vers, k, rot })`. Scène 12 : `{ dur: 0 }` puis son propre mouvement. Scène 21 : `{ reste: true, parent: c.cam, vert: true }`.

9) Papier : `X.lieux.papier(c, { mention, formes })` + `view: false` dans la scène.

10) Positions des dessins de decor-3 (scènes 17 à 21), vues sur capture : rien ne se chevauche, rien n'est hors zone.
- Scène 17 : poser le ticket AVANT la bulle « à payer » : la bulle cache le haut du ticket, qui paraît sortir de la fente.
- Scène 20 : clés posées sur `D.cle({ partie: "crochet" })` aux mêmes ancrages. La feuille part de (236, 640) : au bord gauche de l'écran, mais dedans.
- D.pointInterro : pivot du balancement = ancre « haut ».

11) Pièges :
- `k.ar` multiplie la taille par 1,3 : pour un `ttl` de 46 px exact, utiliser `c.text`.
- Dans c.hud, une classe CSS « de » écrase un `fill` donné en attribut : utiliser `D.outils.tx`.
- La mesure du vert (R11) reste à faire sur la vraie scène 11.

## Étape terminée : scènes, partie 1 (scènes 1 à 5, scenes-1.js)
**Fait :**
- Reprise de l'étape interrompue : les cinq scènes étaient écrites (accroche 1–3, intro 4, le groupe 5), sans contrôles. D.exemple et les
  scènes d'exemple étaient déjà retirés. L'étape « décors 3, HUD, mises en place » était complète (grep des D.xxx du storyboard : rien ne
  manque ; errcheck sans erreur) : rien refait.
- Contrôles sur captures : planches --entre b1,b4 avec et sans --ig, accroche image par image (0 → 1,4 s), transitions sortie du
  téléphone (b2), plongée (b3), T-NOTIF (i1, b4), gros plans des scènes 2, 3, 5 ; overlapscan 0 → 22 s ; mouvement ; soustitres.
- Corrections : frappe de la somme (×1,45 au lieu de ×1,9 : la bulle sortait de l'écran) ; scène 2, caméra cy 930 et coups de zoom plus
  doux (ses pieds touchaient l'étiquette de mention), fantôme et départ de la plongée recalés ; scène 3, vibreur avec la croix ; scène 5,
  bannière 1,15 s et titre écrit après elle (il s'écrivait caché sous la bannière).
- storyboard.md : « Écarts de construction », section « Étape scènes, partie 1 ».

**Reste à faire :** scènes 6 à 21 (parties 2 à 4).

**Notes pour la suite :**
- Mouvement (tools/mouvement.mjs) : une scène ÉCRAN avec seulement des avatars r 30 qui apparaissent reste sous 3 % (b4 : 2,4 % avant
  correction) ; le semis à 6 px/s ne compte presque pas. Ce qui fait passer le seuil : un saut du fil, une bannière qui remonte, le vibreur
  (buzz) sur un événement, une bulle qui jaillit.
- Script de mesure limité à quelques beats (hors dépôt) : ONLY=b5,b6 node <scratchpad>/mvt.mjs videos/akte-siegburg-whatsapp.
- tools/soustitres.mjs : le sous-titre de b9 (« وزادت: Vielleicht sitzt aber… ») déborde même rétréci à 76 % (partie 2).

## Étape terminée : scènes, partie 2 (scènes 6 à 11, scenes-2.js)
**Fait :**
- scenes-2.js : 6 le canapé (salon, sortie du téléphone vers ses mains, certificat, il tape, sa bulle) ; 7 la salle des médecins
  (glissement, elle tape, aimants qui tombent / claquent, post-it du jugement) ; 8 le brouillon (plongée, L1–L6, billet 549 € qui se
  déchire) ; 9 les diagnostics (accolade, L7–L8, LUI, carte « source » avec la silhouette, barres qui voyagent) ; 10 la dernière ligne
  (loupe mot à mot, traduction provisoire TRAD_B10, pouce) ; 11 le silence (bulle verte, sept avatars « transmis », compteur, tout s'arrête).
- decor-2.js : D.loupeCitation, option `marge` (lien par la marge gauche, il ne barre plus le message) ; essayée seule (essai_decor).
- index.html : un sous-titre qui contient une suite de mots latins peut rétrécir jusqu'à 52 % (b9 débordait à 76 %).
- Contrôles : errcheck (instants de la check-list § 8 : aucune erreur) ; planches --entre b5,b10 avec et sans --ig ; images par image des
  entrées des scènes 6, 7, 8 et du silence (scène 11) ; gros plans des scènes 6, 7, 9, 10 ; overlapscan 21,9 → 41,1 s ; mouvement b5–b10
  (tous ≥ 3 %) ; soustitres (plus de débordement) ; vert de la scène 11 : 2,2 % (R11).
- storyboard.md : « Écarts de construction », section « Étape scènes, partie 2 » ; decor.js : liste d'état (ajout de l'option).

**Reste à faire :** scènes 12 à 21 (parties 3 et 4), puis revue de l'affiche (scène 22, dans story.js).

**Notes pour la suite :**
- Les scènes 9, 10 et 11 passent `at: "b7"` à X.lieux.fil (semis continu entre coupes). La scène 12 (PAPIER) part du téléphone de la
  scène 11 : fantôme `{ dur: 0, vert: true }` à reprendre en (525, 860) plein cadre ; à la fin de la scène 11, la bulle verte est en
  (214, 644) → (798, 1066), ELLE en (832, 1112), les sept avatars en (250 + 84 i, 1196), le « 7 » en (838, 1208).
- Scènes PIÈCE avec `in: "slideUp"` : ne pas appeler k.bg() (le papier monte à y −1500 et cache la scène d'avant pendant le glissement) ;
  `SketchUI.dots(c, -1500, -150, 4080, 2700)`.
- Salle des médecins (scène 14) : avec ELLE ou LUI en pied, pieds à y 1320, la poussée globale (+4 %) + un zoom font toucher l'étiquette
  de mention (y 1404) ; garder cy ≥ 916 et ×1,03 au plus (calcul : écran y = 940 + (y − cy) × 1,06 × 1,04 × s).
- Mouvement (tools/mouvement.mjs) : il mesure deux fenêtres de 0,4 s par beat ; une scène de fil entre deux mots tombe sous 3 % ; ce qui
  aide : un `punch` doux sur un mot fort, un `buzz`, une bannière qui remonte, un objet assez grand qui tressaute.
- TRAD_B10 (scenes-2.js, scène 10) est provisoire : à remplacer par les mots de l'auteur en b10 (taille calculée : 46 px jusqu'à 26 signes,
  40 au-delà, rétrécie pour tenir dans 600 px).
