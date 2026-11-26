# État de la construction — AKTE 06 (arrêt volontaire, 27.11.2026)
Comptes rendus des étapes terminées, dans l'ordre. L'étape suivante du chantier doit lire ce fichier en premier.

## Étape terminée : décors 1 (socle + 1re partie des décors)
**Fait :**
- Socle (étape précédente, contrôlé) : copie du gabarit (index.html, story.js, scenes-1..4.js, decor.js, decor-2.js, decor-3.js, glossaire-episode.js, assets/portrait.png hors git) ; story.js AKTE_NO 06, AKTE_NEXT 07, TITRE « كلمة وحدة », QUESTION sur deux lignes, view du gabarit { s: 1.06, oy: -20, breathe: 0.04 }, CAST = PAT + RIC (paramètres Persona exacts du § 1.1), MAINS = M1, M2, M3, M4, MT, MJ (who, s, jeton) ; index.html titre + classe .tw ; glossaire-episode.js (mots du tableau absents de serie/glossaire.js + Oberarzt et fahrlässige Tötung redéfinis)
- D.outils (tw, frappe, trace, ombre, barre, mix, gris, MAT…)
- D.frappe
- D.paraphe (sig1, sig2, oa, coche, croix, boucle, barre)
- D.brief (tous les états)
- D.briefMacro
- D.pilulier (corrigé dans cette étape : couvercles 30 px, jours en .tw 24 centrés, « Montag » dans le boîtier)
- D.comprime
- D.rangeeDoses
- D.feuillet (semaine, date)
- D.calendrier (semaine, date)
- D.enveloppeJaune
- D.casquette
- D.fichePatient
- D.trombone
- D.ruban (HUD)
- D.chaineMains (HUD)
- D.bordFeuille (HUD, transitions)
- D.chemise (cadre de l'intro)
- D.plateau (A, B, C)
- D.halo
- D.lampe (ronde, banquier, chainette)
- D.clavier
- D.tasse
- D.vapeur
- D.plante (vue de dessus)
- D.encreur
- D.tampon
- D.coupelle
- D.stylo (bille, plume, clic, crayon)
- D.cartePapier
- D.aiguille
- D.medaillon
- D.iconeKlinik
- D.miniLettre
- D.main (who 1, 2, 3, 4, toi, juge ; poses plat, pousse, stylo, frappe, poing, ouverte ; jeton)

**Reste à faire :**
- D.bande
- D.enveloppeBlanche
- D.etiquette
- D.loupe
- D.pilulierMini
- D.notice
- D.usine
- D.empreinte
- D.telephone
- D.verre
- D.formAufnahme
- D.planSoins
- D.dossier
- D.coupure
- D.porteTampons
- D.casier
- D.corbeille
- D.formUrteil
- D.plante kind « face » (S18)
- D.hall
- D.boiteLettres
- D.applique
- D.interphone
- D.paillasson
- D.porteParapluies
- D.couloir
- D.chaise
- D.blousePosee
- D.maisonAsso
- D.zahlschein
- D.salleAG
- D.fenetreLames
- D.pupitreAG
- D.tablePrevenus
- D.chambre
- D.fenetre06
- D.voilage
- D.tasseTisane
- D.litGeriatrie
- D.potence
- D.trapeze
- D.chevet
- D.lunettesPliees
- D.canne
- D.pantoufles
- D.boiteMTX
- D.fiches3
- (à supprimer avec les scènes d'exemple de scenes-1.js) D.exemple

**Notes pour la suite :**

Sauvegardé : commit 6771ebb « AKTE 06 : socle et décors 1 ».

Ce qui était déjà fait : l'étape précédente (interrompue) avait réalisé les points 1 à 3 (socle, story.js, index.html, glossaire, decor.js a–d pour S1–S7, en-tête d'inventaire complet), sans les contrôler ni les sauvegarder. Je n'ai rien refait. J'ai contrôlé chaque dessin en image (planches d'essai, plus compositions de S1, S2, S4, S5 et S6–S7 aux positions du storyboard, mains et fiche du patient en grand). J'ai corrigé une seule chose, le pilulier, puis ajouté à la fin de storyboard.md la section « Écarts de construction ». errcheck à 1, 6 et 12 s : SV.error=undefined.

Planches d'essai : en 4 colonnes, essai_decor coupe tout ce qui dépasse 1080 px de large (style du moteur). Lancer « --cols 2 --cell 530 --per 6 » ; les planches actuelles de out/essais sont faites ainsi.

Places à corriger à l'étape des scènes (détail dans storyboard.md, « Écarts de construction » ; propositions vérifiées en image sauf le bureau B) :
1. Trombone de la fiche : à (312, 590) rot −50° il couvre la photo. Le poser vertical dans la marge droite de la fiche : centre (355, 624), a 84, k 1.2. Bureau B : ≈ (283, 700), a 85, à vérifier car il passe à 1–2 px du « E » du titre.
2. S1 : tasse en (770, 1185) (elle passait sous la lettre) ; encreur en (215, 1215) (les trombones libres de la coupelle le touchaient).
3. S5 : hôpital (iconeKlinik) ancre (800, 800), épingle pointe (800, 734), mini-lettre du médaillon (858, 760). Mini-lettre posée sur Hannover à (416, 862) au lieu de (400, 874).
4. Bureau A : la fiche cache le libellé « Patient: » de la lettre, ce qui est voulu par le storyboard.

Points fragiles :
- D.brief appelé avec {} donne l'état COMPLET (signatures, 7 points jaunes). Pour une feuille vierge, passer chaque valeur à 0 (titre, cadre, lignes, mtx, points, sig1, sig2…).
- D.halo et D.medaillon utilisent des id fixes (ep06halo, ep06med) pour leur dégradé et leur clipPath. Cela fonctionne tant que leur géométrie reste la même d'un appel à l'autre.
- Gloses à faire valider par l'auteur (glossaire-episode.js) : « بصفة عامة », « كثر من 90 نهار ديال الغرامة », « تسد بشرط الخلاص ».
- Les aides du storyboard (bureau, lettre, mainDe, pastille, mention, chaine, bord, chambre, couloir) ne sont pas encore dans story.js : c'est l'étape « HUD et mises en place fixes ». D.exemple et les scènes d'exemple de scenes-1.js sont restés en place, comme demandé.

Outil hors dépôt : un visualiseur qui compose une mise en place à partir de window.EpDecor et Persona en coordonnées monde, au format JSON. Il est à /tmp/claude-0/-home-user-testt/16821d81-3ee0-5654-a925-64cfd373d8b4/scratchpad/vue.mjs (node vue.mjs spec.json out.png, depuis sketch-video).

## Étape terminée : décors 2
**Fait :**
- Contrôle de decor.js : toutes les planches d'essai regardées, aucun dessin raté, rien corrigé (seul ajout : à la fin, la file D._apres, voir notes)
- D.bande (1 à 3 lignes, frappe n, punaises, mot souligné)
- D.enveloppeBlanche (sortie, vide, a)
- D.etiquette (ancre = nœud ; barre, sx, grey)
- D.empreinte (plein / pointillé lisible)
- D.telephone (+ kind « cordon » seul pour m.pend)
- D.verre (eau)
- D.formAufnahme (coche 0–3)
- D.planSoins (nom, mot, croix ; kind « mini »)
- D.dossier (ouvert, sangle, titre frappé nt ; 330×440 et 420×560)
- D.coupure (coin)
- D.porteTampons (a)
- D.casier (n, slot en (30, 30))
- D.corbeille
- D.pilulierMini (n, grey)
- D.notice (monde, pli)
- D.usine (ph par tapis, stop, tuyau, flux, jauge, grey)
- D.pieceSang (pictogrammes de la légende de S14, ajout)
- D.plante kind « face » (S18, a = angle du feuillage)
- D.chambre (monde)
- D.fenetre06 (jour, br, tf)
- D.voilage
- D.tasseTisane (ph, vap)
- D.litGeriatrie (patient allongé, dessin dédié ; souffle, grey)
- D.potence
- D.trapeze
- D.chevet
- D.lunettesPliees
- D.canne
- D.pantoufles
- D.casquette variante « pendue » (ajout)
- D.hall (monde)
- D.boiteLettres (couches fond / face / volet, ouv)
- D.applique (lum)
- D.interphone
- D.paillasson
- D.porteParapluies (a)
- D.couloir (monde)
- D.chaise
- D.blousePosee (who 1–4, jeton n + js, ms)
- Liste d'état en tête de decor.js mise à jour
- Section « Étape décors 2 » ajoutée aux Écarts de construction de storyboard.md
- errcheck 1, 6, 12 s : SV.error=undefined ; essai_decor : toutes les fonctions dessinent
- Sauvegarde : ca706b7 « AKTE 06 : décors 2 »

**Reste à faire :**
- D.loupe (S27)
- D.formUrteil (S23)
- D.maisonAsso (S24)
- D.zahlschein (S24)
- D.salleAG (S22)
- D.fenetreLames (S22)
- D.pupitreAG (S22)
- D.tablePrevenus (S22)
- D.boiteMTX (S25)
- D.fiches3 (S27)
- (à supprimer avec les scènes d'exemple de scenes-1.js) D.exemple

**Notes pour la suite :**

Sauvegardé : commit ca706b7 « AKTE 06 : décors 2 ». Tout le travail est dans videos/akte-lehrte-mtx/decor-2.js (S8 à S21).

Contrôle de l'étape précédente : j'ai regardé toutes les planches de decor.js. Aucun dessin raté, rien corrigé.

Chargement (point fragile) : tools/essai_decor.mjs charge les fichiers par ordre alphabétique, donc decor-2.js passe avant decor.js. Pour cette raison, decor-2.js attend D.outils dans une file (D._apres), et la fin de decor.js vide cette file. decor-3.js doit faire pareil, sinon l'essai plante (« Cannot destructure D.outils »). index.html charge toujours decor.js en premier.

Planches d'essai : utiliser « --cols 2 --cell 530 --per 6 ». Au-delà, l'outil coupe ce qui dépasse 1080 px de large et 1920 px de haut. Les planches finales sont dans out/essais (31 planches, dossier hors git).

Contrôles faits en image :
- chaque nouveau dessin seul ;
- l'usine et le lit en grand ;
- les mises en place complètes de la chambre, du hall, du couloir, du bureau B (S11) et du bureau C (S17), aux positions du § 4, avec l'outil de composition /tmp/claude-0/-home-user-testt/16821d81-3ee0-5654-a925-64cfd373d8b4/scratchpad/vue.mjs (spec JSON).

Écarts par rapport au § 2 (détail dans storyboard.md, « Étape décors 2 ») :
- formAufnahme : 230 × 330 ; les coches tombent bien sur y 720, 760, 800 en monde.
- planSoins : 404 de large (les colonnes ne changent pas).
- usine : fenêtre à ±180, lattes qui défilent, jauges sur une petite platine.
- notice : plis aussi à y 510 et 1510.
- tête du patient dans le lit : centrée en (−172, −228), dessinée directement couchée, sans rotation.
- blousePosee : dessinée devant la chaise, largeur 178 ; le jeton est noué au coin haut-gauche du dossier.
- boiteLettres : le volet s'ouvre avec le paramètre ouv.
- bande : accepte une 3e ligne (S22).

Placements à corriger à l'étape des scènes (mêmes détails dans storyboard.md) :
- trombone du bureau B en (281, 652), a 85, k 1.1 — vérifié en image ;
- casquette : D.casquette({ pendue: 1 }), crochet en (356, 1004), échelle 0,5 — vérifié en image ;
- S17 : fiche en deuil en (262, 772), la chaînette de la lampe la touchait presque ;
- S18 : interphone en (900, 640) ;
- S18 : « STRAFBEFEHL » doit être frappé avec D.frappe sur la partie visible de l'enveloppe (y ≈ 742–758), pas avec le mot de D.enveloppeJaune, qui est caché par la boîte ;
- S20 : la bande de citation fait 625 px de large (44 caractères).

Pour les scènes :
- D.fenetre06 : passer tf (temps des feuilles qui tombent, figé quand live = 0) et br (angle de la branche).
- D.usine : passer ph comme tableau [p1, p2, p3] pour figer chaque tapis à son arrêt.
- D.litGeriatrie : ancres tete, main, poitrine, oeil, nez, teteDeLit.
- Les dessins à id (clipPath, dégradés) utilisent des id uniques (compteur), on peut donc les redessiner sans risque.

Restent à faire validation : les gloses de l'étape précédente, et les trois mots de la légende de S14 (« الكريات الحمرا », « الكريات البيضا », « les plaquettes »), marqués « à valider » par le storyboard ; aucun texte arabe n'a été écrit dans les dessins.

## Étape interrompue

« décors 3 + HUD + mises en place » avait commencé quand le chantier a été mis en pause : ses fichiers sont sauvegardés tels quels (travail partiel). La reprise relance cette étape ; l'agent regarde ce qui existe et complète.

Où en était l'agent (sa liste de tâches au moment de l'arrêt) :
- fait : decor-3.js (S22–S28 + affiche) et dessins délicats § 7 à grande taille
- en cours : story.js (HUD, X.aides, X.lieux)
- pas commencé : contrôles des lieux, liste d'état
