# État de la construction — AKTE 08 (arrêt volontaire, 27.11.2026)
Comptes rendus des étapes terminées, dans l'ordre. L'étape suivante du chantier doit lire ce fichier en premier.

## Étape terminée : décors 1 (socle + 1re partie des décors)
**Fait :**
- Mise en place : fichiers du gabarit et photo assets/portrait.png déjà copiés par l'étape précédente, vérifiés (la photo est ignorée par git)
- story.js : AKTE_NO 08, AKTE_NEXT 09, TITRE, QUESTION et CAST des cinq personnages, déjà faits par l'étape précédente, vérifiés contre le storyboard et scenario.md ; cadrage view inchangé
- index.html (titre « AKTE 08 – Düsseldorf ») et glossaire-episode.js : déjà faits, vérifiés contre le tableau « Mots allemands à l'écran » et serie/glossaire.js
- A, objets signature, déjà faits par l'étape précédente et vérifiés sur planche : D.plaque, D.lettre, D.etiquette, D.empreinte, D.tampon, D.barre, D.silhouette (option fil ajoutée), D.eclats ; HUD : D.plaquette, D.reglette
- B, façade et intro, déjà faits et vérifiés : D.facade, D.lanterne, D.niveau, D.carton, D.main, D.tournevis, D.porteIntro, D.interphone, D.mur
- C, faits dans cette étape : D.rollkarte, D.amtsgericht, D.globe, D.arc, D.tube
- D, faits dans cette étape : D.cimaise, D.cadre, D.diplome, D.valise, D.pochette
- E, faits dans cette étape : D.atelier, D.etau, D.casse, D.bloc, D.encreur, D.cartes, D.loupe
- Hors inventaire, faits dans cette étape : D.clou, D.suspension, D.cartons, D.outil, D.bon ; déjà faits avant : D.motDr, D.bandeReflet, D.etincelle, D.visCouchee, D.papillon, D.medaillon, D.porteEtiquette
- Contrôles : essai_decor sur les 126 dessins (les 9 planches regardées), composition S1 à S7 aux coordonnées monde avec les personnages Persona et les zones Instagram, errcheck à 1, 6 et 12 s sans erreur (SV.error=undefined)
- En-tête de decor.js corrigé (état réel : 36 fonctions faites sur 76), section « Écarts de construction » ajoutée à storyboard.md, sauvegarde faite (commit 0a2e2d5)

**Reste à faire :**
- B : D.porteBureau, D.corbeille (S29)
- D : D.livre, D.table, D.fenetreArc, D.nuage, D.lampeTable, D.ecran, D.planche (S8, S9), D.socle (S24)
- E : D.fiche (S14, S15, S26)
- F (S12 à S23) : D.patere, D.blouse, D.stetho, D.sabots, D.badge, D.boite, D.enveloppe, D.brief, D.navigateur, D.poste, D.dateur, D.bac, D.strafbefehl, D.salleFace, D.banc, D.tableProc, D.bureauGreffe, D.tableDefense, D.platzschild, D.rebord, D.feuille, D.chariot, D.ordner, D.chemise
- G (S24 à S29) : D.potence, D.chaine, D.different, D.loi, D.fleche
- Plus tard : supprimer D.exemple en même temps que les scènes d'exemple de scenes-1.js

**Notes pour la suite :**

L'étape précédente s'était arrêtée en cours de route (limite d'usage). L'en-tête de decor.js annonçait comme « fait » environ vingt fonctions qui n'existaient pas (rollkarte, globe, cadre, atelier…). J'ai écrit ces fonctions et corrigé l'en-tête ; il donne maintenant l'état réel. Le socle était déjà complet : rien n'a été refait dans story.js, index.html ni glossaire-episode.js. Le fichier partie2.js du scratchpad partagé appartient à un autre épisode : je ne l'ai pas utilisé.

Avant de continuer, la suite doit savoir :
1. Planches d'essai : la page de tools/essai_decor.mjs est limitée à 1080 × 1920. Il faut utiliser `--cols 2 --cell 540 --per 6` ou `--cols 3 --cell 360 --per 15`, sinon la planche est coupée à droite et en bas.
2. Où écrire la suite : decor.js fait environ 1 500 lignes. La suite de l'inventaire va dans decor-2.js et decor-3.js. Ces deux fichiers sont encore ceux du gabarit ; ils peuvent reprendre les aides de `D.util` (el, rr, ln, ombre, grib, visTete, mix, lw, MAT…).
3. Conventions des fonctions : les fonctions « plein cadre » ou en coordonnées monde se posent en (0, 0) : facade, mur, atelier, cimaise, arc. Quand une pièce bouge seule, elle se dessine à part avec `partie` : coin de rollkarte, halo d'amtsgericht, sphere ou pied de globe, cone de cadre, etiquette de valise, barre d'etau. Les pivots sont renvoyés dans `out`.
4. Écarts par rapport au storyboard, aussi notés dans la section « Écarts de construction » de storyboard.md :
   - D.loupe : segments de 130 px au lieu de 160, sinon le coude passe sous la pastille du haut.
   - D.rollkarte : coins de 44 px pour ne pas toucher l'arabe de S2 ; plis placés hors de la zone de la pastille.
   - D.cadre : sceau déplacé pour laisser la place aux tampons.
   - D.atelier : établi ramené entre x 120 et 960.
5. Pour l'étape des scènes :
   - S1 : avec `a: 8`, la paume de D.main va vers (202, 1184). En (212, 1090), la pointe du tournevis passe 94 px au-dessus de la vis (226, 1014). Calcul : paume = cible − out.pointe.
   - S6 : le petit diplôme cache le buste de TOI. Il faut redessiner ses mains par-dessus avec `only: "handL"` / `"handR"`. D.tube est dessiné à l'horizontale : le tourner de 35° en scène.
   - S7 : l'avant-bras qui tient le cachet passe devant le bloc ; il doit ressortir avant `b5@Dr`.
   - Outils et bons de l'atelier : poser `D.atelier({ outils: false, bons: false })`, puis un nœud par outil et par bon aux places de out.outils et out.bons (pivot = x, y).
6. Points à montrer à l'auteur, déjà listés au risque 6 : le globe est volontairement sans aucune côte ni frontière. Le jaune n'est utilisé que pour le laiton (plaques, lettres, anneau du hublot, lettres du casier) ; le sceau des diplômes est gris.

## Étape terminée : décors 2
**Fait :**
- Contrôle de l'existant : les 9 planches de decor.js ont été regardées, aucun dessin raté. Une seule correction dans decor.js : D.etiquette réduit les textes trop grands (largeur, puis hauteur utile) et met un œillet plus petit sur les petites étiquettes. S18 (250 × 84) et la mini-étiquette de D.chemise débordaient ; S1 à S3, S20, S21 et S23 ne changent pas.
- decor-2.js, bibliothèque (S8, S9) : D.table (aussi la dalle de bureau de S18 : prof 12, sans pieds), D.livre (gris, foncé, blanc ; étiquette ; loupe ; emplacement en pointillé), D.fenetreArc (parties ciel et cadre pour les nuages), D.nuage, D.lampeTable (parties chaînette et cône), D.ecran (bras mural depuis la gauche ; partie curseur), D.planche
- decor-2.js, vestiaire (S12, S15) : D.patere (bois, ou tringle d'acier pour S15), D.blouse, D.stetho, D.sabots, D.badge (grand et mini ; photo et fonction animables ; out.l1 et out.nom donnent les places des textes)
- decor-2.js, lettres (S13, S16) : D.boite (A et B ; clapet en partie séparée), D.enveloppe (kammer, neutre, reponse ; rabat ouvert), D.brief (en-tête révélé, corps aux hauteurs données, signature tracée, gris, coin soulevé, option at pour les coordonnées monde)
- decor-2.js, site (S14, S15, S17) : D.navigateur (pleine page ou bande ; rangées, rechargement ; flèche et pointeur en parties), D.poste, D.fiche (fiche, pilule, bio : la bio sert aussi pour S26), D.dateur (molette qui passe à l'année suivante), D.bac (fond et face)
- decor-2.js, tribunal (S18, S19) : D.strafbefehl (feuille qui sort, trombone pour l'étiquette), D.salleFace (vasistas, rais de lumière, dossier du fauteuil), D.banc, D.tableProc, D.bureauGreffe (meuble et clavier séparés), D.tableDefense, D.platzschild (pictogramme, bascule)
- decor-2.js, rebord, feuilles, chariot (S20 à S23) : D.rebord (consoles réglables), D.feuille (titre, flèche vers le haut, écriture qui avance, coin ; sert aussi à la feuille de RIC en S19 et à S27), D.chariot (parties roue et onglet), D.ordner (couvercle, sangle), D.chemise
- Ajoutés hors inventaire : D.lierre (le lierre sur treillage demandé en S13 et S16) et D.dossier (le dossier qui tombe sur le banc en S19, et le dossier ouvert de STA)
- Ordre de chargement réparé : tools/essai_decor.mjs charge decor-2.js avant decor.js (tri alphabétique). decor-2.js et decor-3.js se mettent donc en attente dans D._apres, et decor.js les lance à sa fin. decor-3.js est préparé avec cet en-tête, sans aucun dessin.
- Contrôles : planches d'essai de tous les dessins (15 planches dans out/essais, toutes regardées) ; compositions S8 à S23 aux coordonnées monde du storyboard, avec les textes, les zones Instagram et RIC, STA, GRE (S12 aussi au zoom ×1,33), regardées puis corrigées ; errcheck à 1 et 6 s : SV.error=undefined
- Liste d'état en tête de decor.js mise à jour : 68 fonctions faites sur 76. Section « Écarts de construction » de storyboard.md complétée. Sauvegarde faite : commit 0c99884.

**Reste à faire :**
- decor-3.js, B : D.porteBureau, D.corbeille (S29)
- decor-3.js, D : D.socle (S24)
- decor-3.js, G (S24 à S28) : D.potence, D.chaine, D.different, D.loi, D.fleche
- Plus tard : supprimer D.exemple en même temps que les scènes d'exemple de scenes-1.js

**Notes pour la suite :**

À savoir pour la suite :

1. decor-3.js garde son en-tête actuel : `if (D.util) init(); else D._apres…`. Les dessins vont dans init(). Sinon, tools/essai_decor.mjs plante (le fichier est chargé avant decor.js).

2. Mesuré dans le navigateur : en Kalam, « … » fait 0,64 em, et non 0,47. decor-2.js a une aide `larg(t, s)` qui en tient compte. Exemples : « Dr. med. ……… » fait 207 px à 30, « Ärztekammer Nordrhein » fait 386 px à 36.

3. Écarts par rapport au storyboard, tous notés dans « Écarts de construction » :
   - D.fenetreArc tient dans y 560–880 : l'appui est remonté, l'écran de S9 le cache.
   - D.brief : en-tête en Kalam 33 (à 36, il touchait le tampon dateur) ; plis à −88 et +104 (option plis).
   - D.stetho : le pavillon est à droite (x 820–905), sinon il passait derrière le badge.
   - D.salleFace : rais de lumière à l'opacité 0,24 (à 0,10, on ne les voyait pas).
   - D.badge mini : un anneau d'acier remplace le cordon.
   - D.poste : tiroir déplacé hors de la colonne des boutons.
   - D.fiche : le nom est réduit pour tenir dans la fiche.

4. Problèmes de composition vus sur les essais. Ils relèvent de l'étape des scènes ; les solutions sont écrites dans storyboard.md :
   - S9 : le tampon Berufsdoktorat couvre « Doctorat en Médecine ». Le poser vers (360, 1290).
   - S13 : la glose arabe qui contient «Dr. med.» s'affiche mal (ordre bidirectionnel). Isoler le latin.
   - S18 : la glose « حسب الصحافة » est coupée par le bord de la feuille. La poser en (822, 905).
   - S19 : une feuille tenue en (540, 880) cache tout le visage de RIC (tête de 810 à 922). La tenir basse, centre vers (540, 955).
   - S19, greffière : ordre GRE → meuble → clavier → mains de GRE (`only`).
   - S21 et S23 : la dernière ligne arabe tombe sur la plinthe. Poser `D.mur({ sol: 1420 })`.
   - S23 : l'étiquette et la plaque des tribunaux se recouvrent. Décaler la plaque et sa glose à x 600, et mettre `consoles: [−180, 180]` au rebord.

5. Positions : les sorties `out` donnent les places des textes que posera story.js (badge l1 et nom, navigateur noms et titres, ecran texteX, fiche n et nom, strafbefehl trombone, banc pupitre, chariot onglets et roues). Les poses sont celles du storyboard. Les dessins en coordonnées monde se posent en (0, 0) : salleFace, banc, tableProc, bureauGreffe, tableDefense.

6. Mon script de composition est réutilisable pour vérifier les scènes 24 à 29 : /tmp/claude-0/-home-user-testt/16821d81-3ee0-5654-a925-64cfd373d8b4/scratchpad/compo/compo.mjs. Il est hors du dépôt et peut être effacé.

## Étape interrompue

« décors 3 + HUD + mises en place » avait commencé quand le chantier a été mis en pause : ses fichiers sont sauvegardés tels quels (travail partiel). La reprise relance cette étape ; l'agent regarde ce qui existe et complète.

Où en était l'agent (sa liste de tâches au moment de l'arrêt) :
- fait : decor-3.js (S24–S29) et vérification des noms D.xxx du storyboard
- en cours : story.js (HUD, X.aides, X.lieux, affiche)
- pas commencé : dessins délicats à grande taille, contrôles des lieux, liste d'état
