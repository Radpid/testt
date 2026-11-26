# État de la construction — AKTE 05 (arrêt volontaire, 27.11.2026)
Comptes rendus des étapes terminées, dans l'ordre. L'étape suivante du chantier doit lire ce fichier en premier.

## Étape terminée : décors 1 (socle + 1re partie des décors)
**Fait :**
- Socle (fait par l'étape précédente, interrompue, et vérifié ici) : fichiers copiés depuis _gabarit/ (index.html avec le titre « AKTE 05 – Krefeld », story.js, scenes-1…4.js, decor.js, decor-2.js, decor-3.js, glossaire-episode.js, assets/portrait.png hors de git)
- story.js : AKTE_NO "05", AKTE_NEXT "06", TITRE « بوحدهم فالليل », QUESTION sur deux lignes (QUESTION_LIGNES), Stage.create avec view { s: 1.06, oy: -20, breathe: 0.04 }, CAST = AZ, KOL, PAT, GUT, RIC, SAN, NSW avec les paramètres Persona exacts du § 1, affiche-résumé réglée comme le storyboard (24 cases, crop [250, 1410], freezeAt, rappel « laut Presse · Rechtskraft unbekannt »)
- glossaire-episode.js : tous les mots de « Mots allemands à l'écran » absents du glossaire commun ou traduits autrement (Assistenzarzt/-ärztin/-ärzte, Intensivstation, fahrlässige Tötung…) ; gloses « à valider » volontairement absentes
- A. Ciel et tableau de bord : bandeauNuit, lune, etoile, nuageNuit, horloge, jauge, eclatFenetre
- B. Façade : facade (+ D.facade.CHIFFRES « 7500 », 42 vitres), enseigneToit, trottoir, feuilleJugement (petite et grande)
- C. Pièces de nuit : salleNuit, fenetreNuit, tacheLumiere, plafonnier, silhouetteSoignant, lecteur, loupe, biper, etiquetteQui
- D. Coupe : coupe, lueurPiece, litMini, moniteurMini, rufanlage, panneauEtage, ambulance, brancardMini, chariotMini, jaugeMurale, tabouretMini, trace, rideauRoulant (ajout)
- J. Intro et carte : badge, pinFenetre, fenetreVille, coupure
- Corrigé dans cette reprise : jauge (le liquide élargi par pulse était coupé par le reflet), loupe (reflet invisible sur le disque vide), etiquetteQui (le ي de « هي » touchait le bord ; largeur calibrée sur la vraie police arabe ; renvoie x0/x1), litMini « zimmer » (petite tête de profil redessinée, cou sous le drap), trace (liseré d'encre)
- Contrôles : essai_decor complet (15 planches, toutes regardées), trois compositions à l'échelle réelle avec Persona (S1, S3, coupe + zoom ×1,6), bleu nuit mesuré 1,4–1,7 % (< 5 %), errcheck 1 6 12 sans erreur, section « Écarts de construction » ajoutée à la fin de storyboard.md, sauvegarde c561afb

**Reste à faire :**
- E. Urgences (S8, S9) : portesBattantes, lampeExamen, armoireMur, chariotUrgence, rideauBox, brancard, gisant (dessin délicat : personne allongée), potence, seringue, protocole
- F. Chambre (S12, S15) : litHopital, tableChevet, tubeLabo, porteChambre
- G. Poste de nuit (S13, S23, S24) : telephoneMural, combine, cordon, listeGarde, cadreAbsent, mainPOV (mains), stylo, formulaire, casierMural, planchette
- H. Tribunal (S16–S21, S26) : salleAudience, fenetreHaute, suspension, estrade, tableDefense, chaiseDos, dos (dessin délicat : personnage de dos), barre, dossierCarte, tableBois, sachetPreuve, chemise, chevalet, schemaHopital, baguette, ailes, aureole, billet, porteSalle
- I. Règle médicale (S22) : regle, tubeSang, cadranHoraire, caseEtage, pictoMedecin
- Plus tard : HUD nuit()/jour()/eclat()/extinction() et mises en place X.lieux dans story.js ; puis les scènes (et la suppression de D.exemple et des scènes d'exemple de scenes-1.js)

**Notes pour la suite :**

Reprise d'une étape interrompue : le socle et tous les dessins A–D + J (ceux dont S1–S7 ont besoin) étaient déjà écrits. Il manquait le contrôle visuel, quelques corrections et la sauvegarde. L'en-tête de decor.js donne l'état complet de l'inventaire.

Piège de l'outil d'essai : avec ses réglages par défaut (4 colonnes × 500 px), essai_decor produit une planche de 2000 px de large, mais le stage ne fait que 1080 px : les colonnes 3 et 4 sont rognées sans avertissement. Toujours lancer `--cols 2 --cell 540 --per 6` (noté en tête de decor.js).

Conflits trouvés en montant les positions du storyboard à l'échelle réelle. Ils sont détaillés dans storyboard.md, section « Écarts de construction », et les mises en place X.lieux doivent appliquer les corrections :
- S6 : le fanion « زميل ديالها » doit prendre dx 52 (à dx 37 il recouvre « هي »).
- S6 : le panneau « Stationen » passe en (505, 640) et D.rufanlage en (470, 730) (sinon les deux fanions cachent le panneau).
- S6–S7 : moniteurs de l'Intensivstation à y 935 (sinon la tête de NSW passe dessus).
- S3 : grande fenêtre centrée en (215, 730), 170 × 200 (sinon les cheveux d'AZ passent sur l'appui).
- S1 : avec reachR [40, -235] et reachL [4, -228], les mains d'AZ ne sont qu'à 48 et 68 px des épaules, sous la fourchette de 90–130 px demandée par le storyboard. À régler dans la scène.

Choix déjà faits :
- D.trottoir : banc et panneau « Notaufnahme » à droite de la porte. o.sol se pose avant la façade, o.mobilier après ; pas de mobilier dans la coupe.
- D.facade : renvoie les 105 vitres (<rect> à recolorer dans c.tick), ouvrir(k) pour la porte et la lampe de l'auvent.
- D.loupe : le contenu se pose dans out.contenu.
- D.fenetreNuit : o.part = "cordon" dessine le cordon seul, pour m.pend.
- Les grands décors (facade, coupe, salleNuit) sont statiques ; les parties qui bougent sont des nœuds à part.

Points fragiles :
- etiquetteQui à 40 px (« نتا », S26) : le texte est un peu haut dans le fanion. Lisible, mais à surveiller.
- D.exemple et les scènes d'exemple de scenes-1.js sont encore là, exprès : errcheck en a besoin pour l'instant.
- Le script de contrôle des compositions est dans le scratchpad (/tmp/claude-0/-home-user-testt/16821d81-3ee0-5654-a925-64cfd373d8b4/scratchpad/compo/compo.mjs). Il peut servir de modèle pour vérifier les proportions des dessins délicats des étapes suivantes (gisant, dos, mainPOV).

## Étape terminée : décors 2
**Fait :**
- Contrôle de decor.js : essai_decor complet relancé, les 15 planches existantes regardées, aucun dessin raté, rien corrigé.
- decor-2.js (S8 à S21), E. urgences : portesBattantes (part cadre / battants / lueur, o.open, o.glow), lampeExamen, armoireMur (étagère ouverte à bacs étiquetés), chariotUrgence (couvercle jaune, renvoie depot), rideauBox, brancard (tête à gauche, o.flip, dossier o.tilt 12°, renvoie tete / hinge / tilt / bar / pole), potence (o.side, o.level, o.drop, renvoie port / bout / goutte), seringue « Insulin » (o.push, o.dir), protocole « Einsatzprotokoll ».
- D.gisant, DESSIN DÉLICAT (jamais une tête Persona pivotée) : profil tourné vers le plafond tracé en courbes lisses, couronne de cheveux châtains et crâne dégarni, mèches sur l'oreiller, œil half ou closed, roll, tenue ville ou chemise à pois, drap avec revers et ourlet, bras proche arm 0 (main sur le ventre) → 1 (avant-bras vertical qui pend), bracelet JAUNE visible, cathéter (out.iv), o.dossier, o.flip. Vérifié seul à grande taille (arm 0 / 0,5 / 1, dossier 12°) et à l'échelle réelle avec AZ.
- F. chambre : litHopital (barrière du fond levée, barrière côté spectateur baissée, carter qui cache les jambes, renvoie tete), tableChevet, tubeLabo (vide, o.dim, o.fill, o.rack false, o.note, o.noteSide), porteChambre.
- G. poste de nuit : telephoneMural (cord, support), combine, cordon (spirale de o.a à o.b, o.sag), listeGarde petit (S13) ET grand o.big (S23, textes arabes recopiés du storyboard), cadreAbsent (buste en pointillés, « ? », plaque « Oberarzt », note).
- H. tribunal : salleAudience, fenetreHaute (o.vue hopital, 12 vitres jaunes dans out.wins), suspension, estrade (sans plaque ni marteau), tableDefense, chaiseDos, barre, dossierCarte, tableBois, sachetPreuve (part fond / dessus / etiquette), chemise « Akte », chevalet, schemaHopital (part medecins, o.mark), baguette, ailes, aureole, billet « 500 », porteSalle (ouverte ou fermée, part cadre / battant).
- D.dos, DESSIN DÉLICAT : personnage de dos, sans visage ni œil, coiffures boucle-fonce + branches de lunettes / court-blond / neutre, blazer / veste / pull, stand 0→1 (corps monté de 88 px d'un bloc), bow, slump, turn (joue seulement), breath, shake. Vérifié seul et dans S16 / S19.
- Ajouts à l'inventaire : D.bancsPublic (S17) et D.ombreJour (S21 : ombre en hachures effacée dans la tache de la fenêtre, croisillon resté dans l'ombre).
- Compositions à l'échelle réelle de S8, S9, S12, S13, S15, S16, S17, S18, S19, S20 et S21 (Persona + décors, caméra STD, zones Instagram), toutes regardées. Corrigé grâce à elles : bon de demande et feuille de soins qui chevauchaient le pied du lit, schéma qui débordait du panneau et passait sous la pince du chevalet, cercle jaune qui coupait le texte, note qui débordait du cadre, ondes hors de la feuille, cheveux frisés hérissés.
- Liste d'état en tête de decor.js mise à jour. Section « Étape décors 2 » ajoutée à « Écarts de construction » dans storyboard.md.
- Contrôles : essai_decor complet (26 planches, toutes les fonctions dessinent, les nouvelles regardées) ; errcheck 1 6 → SV.error=undefined. Sauvegarde 3902c21 « AKTE 05 : décors 2 ».

**Reste à faire :**
- decor-3.js, G (S23, S24) : mainPOV (main en moufle + manche, grip combine ou stylo), stylo, formulaire (Überlastungsanzeige, citation exacte du Marburger Bund), casierMural, planchette.
- decor-3.js, I (S22) : regle, tubeSang, cadranHoraire, caseEtage, pictoMedecin.
- Ensuite : dans story.js, le HUD nuit() / jour() / eclat() / extinction() et les mises en place X.lieux (facade, coupe, box, chambre, poste, salle) ; puis les scènes, avec la suppression de D.exemple et des scènes d'exemple de scenes-1.js.

**Notes pour la suite :**

Ce que la suite doit savoir :

1. Ordre de chargement. tools/essai_decor.mjs charge decor-2.js et decor-3.js AVANT decor.js (ordre alphabétique). decor-2.js attend donc D.outils dans la file D._apres, et decor.js lance cette file à sa fin (j'ai ajouté une ligne dans decor.js). decor-3.js doit faire pareil s'il utilise D.outils : voir les premières lignes de decor-2.js. index.html charge decor.js en premier, ce qui ne change rien en vrai.

2. Écarts au storyboard, détaillés dans storyboard.md (« Écarts de construction », étape décors 2) :
- D.gisant : l'ancrage est le coin haut du matelas côté tête. Le retournement se fait avec o.flip, dans la fonction. Pour le brancard : m.obj(D.gisant, x + br.out.tete[0], y + br.out.tete[1], 1, { flip: true, dossier: br.out.tilt, … }).
- D.dos se pose à l'échelle 1, pas 0,8. Sommet de la tête à −349 assis et −437 debout, ce qui correspond aux positions de S16 et S19.
- Le site en Y de la potence est sous la chambre compte-gouttes : en S8 il est à (631, 1050).
- Changements de taille : cadreAbsent fait 184 de large, listeGarde petit 256, schemaHopital 340 × 370.

3. Positions à corriger dans les scènes, mesurées avec Persona.util.rig :
- S9 : AZ pieds (765, 1300). Sinon sa main est à 62 px de l'épaule et elle touche le mât de la potence.
- S12 : AZ pieds (590, 1300). Main droite (à gauche de l'écran) sur gisant.out.wrist, main gauche au lecteur (140 px). C'est l'inverse du texte du § 4 : sinon les bras se croisent.
- S15 : main sur le chambranle à (775, 935). À (775, 1010) elle est à 21 px de l'épaule.
- S16 : la pastille « zwei Angeklagte » tombe sur le pupitre.
- S17 : la balustrade reculée cache les bancs du public.

4. Pour animer sans redessiner les grands décors :
- Parties séparées (o.part) : portesBattantes, sachetPreuve, porteSalle, schemaHopital.
- Le « ? » de cadreAbsent peut être retiré avec o.q false ; sa position est dans out.q.
- Les vitres de fenetreHaute (vue hopital) sont dans out.wins, à faire scintiller dans c.tick.
- D.ombreJour n'utilise pas rough : elle peut se redessiner à chaque image (la tache descend).

5. Le fanion « نتا » de S23 n'est pas dessiné dans listeGarde({ big }). Les ancres sont dans out.lignes[i] (texte, fin, tel, lucarne). Il n'y a pas de place entre « Assistenzarzt » et l'icône du téléphone : prévoir le fanion dessous ou au-dessus.

6. Point fragile : les boucles foncées de D.dos restent un peu hérissées à petite taille. Elles se lisent bien comme des « boucles serrées », à revoir sur la planche des scènes.

7. Script des compositions de contrôle, réutilisable pour S22 à S26 : /tmp/claude-0/-home-user-testt/16821d81-3ee0-5654-a925-64cfd373d8b4/scratchpad/compo/compo2.mjs. Pour mesurer les distances main–épaule : /tmp/claude-0/-home-user-testt/16821d81-3ee0-5654-a925-64cfd373d8b4/scratchpad/compo/rig2.cjs.

Fichiers : /home/user/testt/sketch-video/videos/akte-krefeld-nacht/decor-2.js, /home/user/testt/sketch-video/videos/akte-krefeld-nacht/decor.js (en-tête et file D._apres), /home/user/testt/sketch-video/videos/akte-krefeld-nacht/storyboard.md (section ajoutée à la fin).

## Étape interrompue

« décors 3 + HUD + mises en place » avait commencé quand le chantier a été mis en pause : ses fichiers sont sauvegardés tels quels (travail partiel). La reprise relance cette étape ; l'agent regarde ce qui existe et complète.

Où en était l'agent (sa liste de tâches au moment de l'arrêt) :
- fait : decor-3.js (S22–S24) et vérification des noms D.xxx du storyboard
- en cours : story.js (HUD, X.aides, X.lieux)
- pas commencé : dessins délicats à grande taille (gisant, dos, mainPOV), contrôles des lieux, liste d'état
