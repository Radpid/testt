export const meta = {
  name: 'akte-construction-legere',
  description: 'Un épisode AKTE, version légère : 3 agents (décors + 1re moitié des scènes, 2e moitié + affiche, revue complète)',
  phases: [
    { title: 'Construction', detail: 'décors restants, HUD, scènes' },
    { title: 'Revue', detail: 'revue par captures, corrections, description, fiche de suite' },
  ],
}

const ROOT = '/home/user/testt/sketch-video'
const SKILL = '/home/user/testt/.claude/skills/serie-storytelling/SKILL.md'

const EP = {
  '04': { n: '04', slug: 'akte-koeln-transfusion', titre: '63 ساعة', sc: 'Scène', parts: ['scènes 1 à 6', 'scènes 7 à 13', 'scènes 14 à 20', 'scènes 21 à 25, puis la scène 26 (affiche-résumé)'] },
  '05': { n: '05', slug: 'akte-krefeld-nacht', titre: 'بوحدهم فالليل', sc: 'S', parts: ['S1 à S7', 'S8 à S15', 'S16 à S21', 'S22 à S26, puis l\'affiche-résumé'] },
  '06': { n: '06', slug: 'akte-lehrte-mtx', titre: 'كلمة وحدة', sc: 'S', parts: ['S1 à S7', 'S8 à S14', 'S15 à S21', 'S22 à S28, puis l\'affiche-résumé'] },
  '07': { n: '07', slug: 'akte-siegburg-whatsapp', titre: 'الگروپ', sc: 'Scène', parts: ['scènes 1 à 5', 'scènes 6 à 11', 'scènes 12 à 16', 'scènes 17 à 21, puis la scène 22 (affiche-résumé)'] },
  '08': { n: '08', slug: 'akte-duesseldorf-titel', titre: 'جوج حروف', sc: 'S', parts: ['S1 à S7', 'S8 à S15', 'S16 à S23', 'S24 à S29, puis l\'affiche-résumé'] },
  '09': { n: '09', slug: 'akte-friedrichshafen-nacht', titre: 'غير سكران', sc: 'S', parts: ['S1 à S7', 'S8 à S14', 'S15 à S22', 'S23 à S29, puis S30 (affiche-résumé)'] },
}
// VERSION LÉGÈRE (3 agents par épisode). args : ["04"] ou ["04@2"] (1 = décors restants + scènes 1–2, 2 = scènes 3–4 + affiche, 3 = revue).
// Ancien commentaire : ["08", "04"] = tout depuis le début ; ["07@4", "06@3"] = reprendre à l'étape n (1 décors 1, 2 décors 2,
// 3 décors 3 + HUD, 4 à 7 scènes 1 à 4, 8 revue, 9 contre-revue). Les étapes d'avant sont sautées ; la première étape
// lancée lit les comptes rendus dans etat-construction.md.
const LIST = (Array.isArray(args) && args.length ? args : Object.keys(EP)).map((a) => {
  const [k, d] = String(a).split('@'); const e = EP[k]; return e ? Object.assign({}, e, { depuis: Math.max(1, +(d || 1)) }) : null
}).filter(Boolean)

const ctx = (e) => `PROJET. Série de Reels Instagram « AKTE » de @dr.aguilo : histoires vraies de médecins jugés en Allemagne, dessinées au trait (rough.js, hachures grises, papier, jaune surligneur #F8CE4E), voix darija de l'auteur, sous-titres karaoké. La saison 2 (six épisodes) est préparée AVANT l'enregistrement de la voix, sur un minutage provisoire. L'écriture est terminée (dossier vérifié, scénario relu, storyboard scène par scène). Tu fais une étape de la CONSTRUCTION de l'épisode AKTE ${e.n} « ${e.titre} ».
Dossier de l'épisode : ${ROOT}/videos/${e.slug}/   ·   Toutes les commandes se lancent depuis ${ROOT}

À LIRE AVANT DE COMMENCER
1. ${SKILL} — les règles de la série (en entier).
2. ${ROOT}/serie/SAISON-2.md — « Ce qui ne change jamais », le tableau des différences, « Interdits de ressemblance », « Objets réservés », et la fiche de l'épisode ${e.n}.
3. ${ROOT}/videos/${e.slug}/storyboard.md — TA RÉFÉRENCE pour l'image : il fait foi. Il est long : repère les sections avec grep -n '^## \\|^### ' puis lis par sections (Conventions, § 0 direction, § 1 distribution, § 2 inventaire, § 3 HUD, § 4 scènes, § 5 scènes imposées, § 6 repères, § 7 risques, § 8 check-list).
4. ${ROOT}/videos/${e.slug}/scenario.md — sections « TEXTE À ENREGISTRER », « Mots allemands à l'écran », « Ce qui n'est PAS dit mais montré », « Fin ». Là où scenario.md et storyboard.md décrivent une image différemment, le storyboard fait foi.
5. Le code : ${ROOT}/videos/_gabarit/ (structure de fichiers à respecter : story.js = socle + distribution + HUD + affiche ; scenes-1.js … scenes-4.js = les scènes ; decor.js, decor-2.js, decor-3.js = les dessins) ; ${ROOT}/serie/lib/stage.js (moteur de scènes : en entier) ; ${ROOT}/serie/lib/motion.js (en entier) ; ${ROOT}/serie/lib/persona.js (options, Persona.Pose, Persona.util.rig, Persona.props, Persona.couple) ; et, comme exemples de TECHNIQUE seulement, ${ROOT}/videos/akte-koeln-transfusion/story.js, scenes-2.js et decor-3.js (AKTE 04, dernier épisode fini, même structure en plusieurs fichiers). Ne reprends jamais un dessin, un décor ni un personnage d'un autre épisode.

RÈGLES DE TRAVAIL
- Lis d'abord videos/${e.slug}/etat-construction.md s'il existe (comptes rendus des étapes déjà faites), puis regarde l'état du dossier (ls, en-têtes des fichiers) : d'autres étapes ont travaillé avant toi. Ne refais pas ce qui est fait ; si une étape précédente est incomplète, complète le strict nécessaire et dis-le dans ta réponse.
- Tu écris SEULEMENT dans videos/${e.slug}/. Interdit de modifier serie/lib/, engine/, tools/, videos/_gabarit/, les autres épisodes, serie/SERIE.md, serie/SAISON-2.md, le skill. S'il manque quelque chose au moteur, écris-le dans l'épisode (fichier de décor, ou X.aides dans story.js).
- Dans le dossier de l'épisode, NE MODIFIE PAS scenario.md, beats.js, preview.json, timings.js, recherche.md : le texte dit et le minutage sont figés. Dans storyboard.md tu peux seulement AJOUTER à la fin une section « Écarts de construction » (ce que tu as fait autrement, et pourquoi).
- Vérité : rien d'inventé à l'écran. Les mentions prévues (« laut Urteil », « laut Presse », « Rekonstruktion », « 1. Instanz », statut du jugement…) sont obligatoires. Aucun nom de personne ni d'hôpital. Les textes arabes et allemands se recopient du scénario et du storyboard, lettre pour lettre (jamais de darija inventée : s'il manque un texte, signale-le). Le nom de l'auteur s'écrit « Yassine », jamais « Dr. Yassine ».
- À la FIN de ton étape, ajoute ton compte rendu à videos/${e.slug}/etat-construction.md (section « ## Étape terminée : <ton étape> » : fait, reste à faire, notes pour la suite) — si le chantier s'arrête, c'est ce qui permet de reprendre.
- Git : aucune commande git. À la FIN de ton étape seulement : tools/sauvegarde.sh videos/${e.slug} "AKTE ${e.n} : <ton étape>" (commit + envoi sous verrou).
- Pas de clé d'API, pas de réseau, pas de voix, pas de son. Pas de rendu MP4 : ne lance jamais engine/render.mjs.
- La machine a 4 cœurs partagés avec d'autres agents : une seule commande de rendu à la fois, pas de boucle de rendus inutile.
- Tes notes et ta réponse sont en français, simples et précises.

OUTILS (depuis ${ROOT})
- node tools/errcheck.mjs videos/${e.slug}/index.html 1 5 12 …   → erreurs JS à ces instants ; un repère « bN@mot » dont le mot n'existe pas dans le beat fait une erreur ; « SV.error=undefined » = aucune erreur.
- node tools/essai_decor.mjs videos/${e.slug} [--only nom1,nom2] [--cols 4] [--cell 500]   → chaque fonction de window.EpDecor dessinée seule (nom, taille, croix rouge = ancrage) dans out/essais/decor_NN.png. Elle appelle D.nom(g, {}) : chaque fonction a donc des valeurs par défaut ; D.nom.essais = [{…}, {…}] montre plusieurs états.
- node tools/planche.mjs videos/${e.slug} [--entre bA,bB] [--ig] [--from s --to s --step 0.1] [--times 1.2,4] [--cols 4] [--per 12]   → planches-contact dans out/planches/ (2 images par beat par défaut ; --ig = zones Instagram en rouge ; --from/--to/--step = image par image).
- node tools/overlapscan.mjs videos/${e.slug}/index.html <t0> <t1> 0.1   → textes qui se recouvrent.
- node tools/mouvement.mjs videos/${e.slug}   → part de l'image qui bouge dans chaque beat ; « FIGÉ » = moins de 3 % (l'intro i1–i3 est calme par nature).
- node tools/cuetimes.mjs videos/${e.slug}/index.html b3 "b7@mot" b9@end   → instant d'un repère.
Un contrôle ne compte que si tu as REGARDÉ les images : ouvre chaque PNG de planche avec l'outil Read et examine chaque vignette.

CE QUE « BIEN FAIT » VEUT DIRE — chaque point a déjà été refusé une fois par l'auteur :
- aucun chevauchement (textes entre eux, texte sur un visage, objet sur une ligne arabe, tête qui en cache une autre, pastille sur un décor) ;
- corps justes : pas de corps déformé, pas de bras en « nouilles » ni croisés en X, mains à distance naturelle de l'épaule (portée Persona ≈ 112 px × échelle) et du BON côté (mesure avec Persona.util.rig), mains en moufle ;
- une personne allongée ou vue de dos est un DESSIN DÉDIÉ, jamais une tête Persona pivotée ;
- personnages vivants : clignements, respiration, regard qui bouge, expression qui change avec la phrase ; les lèvres ne bougent que si le personnage parle ; aucun personnage qui glisse (marche = vrai cycle) ;
- décors COMPLETS (jamais un personnage sur du papier vide), qui se construisent en cascade au début de la scène puis qui vivent (Motion : m.build, m.pend, m.sway, m.drift, m.dust…) ; aucune scène figée ; aucune idée montrée par un schéma nu ;
- bulles : toujours Motion.bubble / m.speech, la queue part du bas et vise la bouche de celui qui parle ;
- pastille allemande + traduction arabe bien DÉTACHÉE dessous ; titres et phrases arabes ≥ 40 px, gras, encre foncée ;
- zones Instagram : contenu important entre x 90 et 990 (décor entre 110 et 960), rien d'important au-dessus de y 250, rien sous y 1470 (les sous-titres sont en bas), rien dans la colonne des boutons (x > 915, y 980–1650) ;
- aucun sujet (personnage, bulle, carte, titre) coupé par le cadre pendant un zoom ;
- un changement visuel toutes les 1,5 à 2 secondes, calé sur les mots (repères « bN@mot ») ;
- darija à l'écran : celle du scénario, jamais d'arabe standard (AKTE 04 : « مذنبة » refusé) ; un mot dont tu doutes → note-le dans revue.md pour que l'auteur le dise avec ses mots ;
- sous-titres : UNE ligne chacun, dans les zones Instagram (contrôle : node tools/soustitres.mjs videos/${e.slug}).`

const NOTES = { type: 'string', description: 'Ce que la suite doit savoir : choix faits, points fragiles, ce qui a été complété d\'une étape précédente.' }
const S_DECOR = { type: 'object', properties: { fonctions_faites: { type: 'array', items: { type: 'string' } }, fonctions_restantes: { type: 'array', items: { type: 'string' } }, notes: NOTES }, required: ['fonctions_faites', 'fonctions_restantes', 'notes'] }
const S_SCENES = { type: 'object', properties: { scenes_faites: { type: 'array', items: { type: 'string' } }, ecarts: { type: 'array', items: { type: 'string' }, description: 'Écarts avec le storyboard, avec la raison' }, defauts_restants: { type: 'array', items: { type: 'string' }, description: 'Défauts vus sur les captures et non corrigés' }, notes: NOTES }, required: ['scenes_faites', 'ecarts', 'defauts_restants', 'notes'] }
const S_REVUE = { type: 'object', properties: { etat: { type: 'string', description: '« prêt pour la voix » ou « réserves »' }, defauts_trouves: { type: 'number' }, defauts_corriges: { type: 'number' }, defauts_restants: { type: 'array', items: { type: 'string' } }, planches: { type: 'array', items: { type: 'string' }, description: 'Chemins absolus des planches finales' }, notes: NOTES }, required: ['etat', 'defauts_trouves', 'defauts_corriges', 'defauts_restants', 'planches', 'notes'] }

const decor1 = (e) => `${ctx(e)}

TON ÉTAPE — « socle et décors, 1re partie ».
1. Mise en place du dossier (sans rien écraser de ce qui existe : beats.js, preview.json, timings.js, les .md, son/) : copie depuis videos/_gabarit/ les fichiers index.html, story.js, scenes-1.js, scenes-2.js, scenes-3.js, scenes-4.js, decor.js, decor-2.js, decor-3.js, glossaire-episode.js, et le dossier assets/ (la photo de l'auteur ; elle reste hors de git).
2. story.js : AKTE_NO = "${e.n}", AKTE_NEXT, TITRE, QUESTION (scenario.md, section « Fin », et storyboard) ; réglage Stage.create(view) si les conventions du storyboard le demandent ; CAST = TOUS les personnages de la distribution (storyboard § 1) avec leurs paramètres Persona EXACTS. index.html : titre de la page. glossaire-episode.js : tous les mots de « Mots allemands à l'écran » de scenario.md qui ne sont pas déjà dans serie/glossaire.js, ou dont la traduction diffère pour cet épisode (regarde le format des deux fichiers).
3. decor.js : dessine, dans cet ordre, (a) les objets SIGNATURE de l'épisode, (b) les pièces du HUD propre (§ 3), (c) le cadre de l'intro de l'auteur, (d) tous les décors et objets dont ont besoin les ${e.parts[0]} du storyboard. Suis l'inventaire (§ 2) : nom des fonctions, tailles, ancrages, parties mobiles, ancres renvoyées. Chaque objet a son ombre décalée et des détails, jamais une forme nue ; les parties qui bougent sont pilotées par les paramètres o ou dessinées à part.
   En tête de decor.js, écris en commentaire la liste COMPLÈTE des fonctions de l'inventaire avec leur état : « fait (decor.js) » ou « à faire ».
4. Contrôle : node tools/essai_decor.mjs videos/${e.slug} — regarde chaque planche (Read) et corrige jusqu'à ce que chaque dessin soit propre, lisible et bien proportionné (à côté d'un personnage Persona d'échelle 1, haut d'environ 480 px). Puis node tools/errcheck.mjs videos/${e.slug}/index.html 1 6 12 : aucune erreur (les scènes d'exemple de scenes-1.js et D.exemple restent en place pour l'instant : l'étape des scènes les remplacera).
5. Sauvegarde : tools/sauvegarde.sh videos/${e.slug} "AKTE ${e.n} : socle et décors 1"
Réponse : la liste des fonctions faites, celles qui restent, et ce que la suite doit savoir.`

const decor2 = (prev, e) => `${ctx(e)}

TON ÉTAPE — « décors, 2e partie ». L'étape précédente a posé le socle et decor.js (objets signature, pièces du HUD, cadre de l'intro, décors des ${e.parts[0]}). Son compte rendu : ${JSON.stringify(prev || 'indisponible : regarde le dossier')}
1. Lis decor.js (conventions, liste d'état en tête, ce qui existe). Regarde ses planches d'essai (relance node tools/essai_decor.mjs videos/${e.slug}) : si un dessin déjà fait est raté (proportions, lisibilité, forme nue), corrige-le.
2. Dans decor-2.js, dessine tous les décors et objets dont ont besoin les ${e.parts[1]} et les ${e.parts[2]} du storyboard et qui n'existent pas encore (inventaire § 2 + description de chaque scène en § 4). Même style, mêmes conventions, mêmes matières que decor.js : l'épisode doit avoir UNE main.
3. Mets à jour la liste d'état en tête de decor.js.
4. Contrôle : node tools/essai_decor.mjs videos/${e.slug} — regarde chaque planche (Read), corrige. node tools/errcheck.mjs videos/${e.slug}/index.html 1 6 : aucune erreur.
5. Sauvegarde : tools/sauvegarde.sh videos/${e.slug} "AKTE ${e.n} : décors 2"
Réponse : fonctions faites, fonctions restantes, et ce que la suite doit savoir.`

const decor3 = (prev, e) => `${ctx(e)}

TON ÉTAPE — « décors, fin + HUD + mises en place ». decor.js et decor-2.js existent. Compte rendu de l'étape précédente : ${JSON.stringify(prev || 'indisponible : regarde le dossier')}
1. Dans decor-3.js : tous les décors et objets qui manquent encore pour les ${e.parts[3]}, puis tout ce qui reste « à faire » dans la liste d'état de decor.js. À la fin, CHAQUE fonction D.xxx citée dans le storyboard doit exister (vérifie avec un grep des noms D.xxx du storyboard contre les fonctions définies) ; si une fonction du storyboard est devenue inutile, dis-le au lieu de la dessiner.
2. Les dessins DÉLICATS listés au § 7 « Risques » du storyboard (personne allongée, personnage vu de dos, mains en gros plan, lettres-objets, coupes anatomiques…) : contrôle-les un par un sur une planche à grande taille (--only … --cols 2 --cell 800), à côté d'un personnage Persona pour l'échelle si besoin, et refais-les jusqu'à ce qu'ils soient vraiment bons. Ce sont eux qui font « amateur » s'ils sont ratés.
3. story.js : (a) le HUD propre à l'épisode (storyboard § 3), dans un bloc à part, sans casser le HUD du socle (barre de progression, logo masqué pendant l'intro) ; (b) sous X.aides, les fonctions d'aide que plusieurs scènes utilisent (elles sont décrites dans « Conventions » et dans l'inventaire) ; (c) sous X.lieux, les « mises en place FIXES » du storyboard (une fonction par lieu, qui pose le décor complet à ses coordonnées, le construit en cascade et le fait vivre, et renvoie ses nœuds). Ces blocs s'écrivent AVANT la ligne (window.EP_PARTS || []).forEach(...).
4. Contrôle : essai_decor (toutes les planches regardées) ; errcheck sans erreur ; pour chaque X.lieux, remplace provisoirement la scène d'exemple de scenes-1.js par un appel au lieu, fais une planche (node tools/planche.mjs videos/${e.slug} --times 0.2,1,2.5 --cols 3), regarde-la (composition, zones Instagram, rien de vide), corrige ; à la fin, scenes-1.js doit de nouveau charger sans erreur.
5. Mets à jour la liste d'état en tête de decor.js (tout doit être « fait » ou « abandonné : raison »). Sauvegarde : tools/sauvegarde.sh videos/${e.slug} "AKTE ${e.n} : décors 3, HUD, mises en place"
Réponse : fonctions faites, fonctions restantes (normalement aucune), et ce que les étapes « scènes » doivent savoir (noms des aides et des lieux, pièges).`

const scenes = (k) => (prev, e) => `${ctx(e)}

TON ÉTAPE — « scènes, partie ${k} sur 4 » : les ${e.parts[k - 1]} du storyboard, à écrire dans scenes-${k}.js.
Compte rendu de l'étape précédente : ${JSON.stringify(prev || 'indisponible : regarde le dossier')}
1. Lis le code de l'épisode : story.js (CAST, HUD, X.aides, X.lieux), les fichiers de décor (noms, paramètres, ancres des fonctions)${k > 1 ? `, et les scènes déjà écrites (scenes-1.js … scenes-${k - 1}.js) pour garder la même main et réutiliser ce qui existe` : ''}. Dans le storyboard, lis à fond tes scènes (§ 4), les conventions, le § 5 (scènes imposées), les repères de tes beats (§ 6) et les risques (§ 7).
2. Écris TOUTES les scènes de ta partie, dans l'ordre, en suivant le storyboard : composition (coordonnées), construction en cascade, vie du décor, jeu des personnages (expressions par repère, regards, mains), caméra, transitions d'entrée, textes, pastilles, mentions de vérité, repères « bN@mot ». ${k === 1 ? 'Remplace les scènes d\'exemple du gabarit (et supprime D.exemple s\'il ne sert plus). L\'ACCROCHE est la scène la plus travaillée de l\'épisode : décor complet, mouvement fort dès la première image, personnage ou objet qui réagit. L\'INTRO de l\'auteur garde tous les éléments du socle (photo assets/portrait.png, anneau jaune, badge Instagram, ruban « Yassine », @dr.aguilo, cœur j\'aime et bouton s\'abonner animés sur les mots, summary: false, logo du haut masqué) dans le cadre propre à l\'épisode.' : ''}${k === 4 ? 'Puis l\'AFFICHE-RÉSUMÉ dans story.js (st.summary : colonnes, marges et recadrage selon le nombre de scènes ; question ÉCRITE ; teaser « AKTE … · قريبا » ; rien dans les zones Instagram).' : ''}
   Une scène = const k = X.use(c); … const m = M.of(c); … Les compositions de lieu passent par X.lieux quand elles existent. Un décor ou un objet qui manque : ajoute-le à la fin de decor-3.js (bloc « ajouts partie ${k} ») et essaie-le seul (essai_decor --only).
   Priorité : d'abord toutes tes scènes complètes et propres (décor complet, personnages vivants, textes, repères), ensuite les raffinements du storyboard. Aucune scène vide ou bâclée à la fin. Si le storyboard demande quelque chose d'infaisable ou qui rend mal à l'image, fais au mieux dans l'esprit de la scène et note l'écart.
3. Contrôles sur TA partie, à refaire après chaque série de corrections, jusqu'à ce que les captures soient propres :
   - node tools/errcheck.mjs videos/${e.slug}/index.html <plusieurs instants de ta partie> : aucune erreur ;
   - node tools/planche.mjs videos/${e.slug} --entre <1er beat>,<dernier beat> puis la même avec --ig : regarde CHAQUE vignette (Read) ;
   - image par image du début de l'accroche ou de tes deux scènes les plus animées : --from <t> --to <t+1.2> --step 0.1 ;
   - node tools/overlapscan.mjs videos/${e.slug}/index.html <t0> <t1> 0.1 : aucun chevauchement de textes ;
   - node tools/mouvement.mjs videos/${e.slug} : aucun de tes beats « FIGÉ ».
   Sur chaque vignette, cherche les défauts de la liste « bien fait » ci-dessus, et vérifie que l'image dit ce que dit la phrase.
${k === 4 ? '4. Contrôle de l\'épisode entier : errcheck toutes les 3 secondes du début à la fin + affiche ; planche des 6 dernières secondes (affiche-résumé) regardée.\n5.' : '4.'} Ajoute à storyboard.md, section « Écarts de construction », ce que tu as fait autrement. Sauvegarde : tools/sauvegarde.sh videos/${e.slug} "AKTE ${e.n} : scènes, partie ${k}"
Réponse : scènes faites, écarts, défauts encore visibles, et ce que la suite doit savoir.`

const revue1 = (prev, e) => `${ctx(e)}

TON ÉTAPE — « revue visuelle indépendante ». Tu n'as écrit aucune de ces scènes : ton travail est de TROUVER tout ce qui ne va pas à l'image, puis de le CORRIGER dans le code. Sois sévère : l'auteur a déjà refusé des épisodes pour des chevauchements, des corps déformés, des bulles mal faites, des décors vides et des scènes figées. Compte rendu de la dernière étape : ${JSON.stringify(prev || 'indisponible : regarde le dossier')}
1. Rendus de tout l'épisode : errcheck toutes les 3 s ; node tools/planche.mjs videos/${e.slug} (2 images par beat) puis --ig ; overlapscan du début à la fin ; mouvement. Ouvre et examine TOUTES les planches, vignette par vignette.
2. Dresse la liste des défauts, scène par scène, dans videos/${e.slug}/revue.md (tableau : scène · instant · défaut · gravité · correction · état). Ordre de gravité : (1) erreur, scène vide ou incompréhensible ; (2) vérité à l'écran (mention manquante, chiffre ou date qui ne correspond pas au scénario, nom à ne pas montrer, image qui affirme plus que les sources : voir storyboard § 7 et scenario « Ce qui n'est PAS dit mais montré ») ; (3) zones Instagram ; (4) chevauchements ; (5) personnages (corps, bras, regard, expression qui ne change pas, lèvres qui bougent sans parole) ; (6) décor incomplet ou vide ; (7) scène figée ; (8) lisibilité de l'arabe et des pastilles ; (9) fidélité au dispositif signature de l'épisode et différence avec les autres épisodes (SAISON-2.md, « Objets réservés »).
3. Corrige dans le code (scenes-N.js, fichiers de décor, story.js) tout ce qui est de gravité 1 à 7, et le reste autant que possible. Après chaque série de corrections, refais la planche de la zone touchée et REGARDE-la : une correction non regardée n'est pas faite. Ne supprime jamais une scène ; n'appauvris pas une scène pour faire disparaître un défaut.
4. Termine par un rendu complet (planches normales + --ig, overlapscan, mouvement, errcheck) et mets revue.md à jour (ce qui est corrigé, ce qui reste et pourquoi).
5. Sauvegarde : tools/sauvegarde.sh videos/${e.slug} "AKTE ${e.n} : revue visuelle et corrections"
Réponse : état, nombre de défauts trouvés et corrigés, défauts restants, chemins des planches.`

const revue2 = (prev, e) => `${ctx(e)}

TON ÉTAPE — « contre-revue et finitions ». Une première revue a corrigé l'épisode (videos/${e.slug}/revue.md). Son compte rendu : ${JSON.stringify(prev || 'indisponible : regarde le dossier')}
Tu regardes ce qu'elle n'a pas pu voir sur 2 images par beat : les DÉBUTS de scène, les transitions, le rythme, et tu refais un passage complet avec un œil neuf.
1. Pour CHAQUE scène : image par image de sa première seconde (node tools/planche.mjs videos/${e.slug} --from <début> --to <début+1.0> --step 0.2 ; regroupe plusieurs scènes par planche avec --times si c'est plus simple). Cherche : première image vide ou incomplète, décor qui apparaît d'un bloc au lieu de se construire, éléments de la scène précédente encore visibles, personnage en pose neutre avant son jeu, texte qui arrive avant son mot, transition qui coupe un sujet.
2. Les moments forts un par un, image par image : l'accroche (toute sa durée, pas 0,1 s), l'intro de l'auteur, la carte, l'explication médicale ou juridique en image, la scène muette s'il y en a une (la personne décédée est MONTRÉE, la couleur s'éteint, la phrase est écrite), la sanction, la règle finale, l'affiche-résumé (grille, question écrite, teaser, zones Instagram).
3. Relis les textes à l'écran contre scenario.md et recherche.md : chaque mot allemand et sa traduction arabe, chaque chiffre, chaque date, chaque mention (« laut Urteil », « laut Presse », « Rekonstruktion », statut du jugement). Les sous-titres : glossaire-episode.js couvre tous les mots allemands dits.
4. Corrige tout ce que tu trouves (mêmes règles que la première revue : regarder après chaque correction, ne rien supprimer, ne rien appauvrir). Reprends aussi les « défauts restants » de revue.md.
5. Rendu final complet : node tools/planche.mjs videos/${e.slug} puis --ig ; overlapscan ; mouvement ; errcheck. Regarde toutes les planches une dernière fois.
6. Écris videos/${e.slug}/instagram.md : un BROUILLON de description prête à coller (même forme que ${ROOT}/videos/akte-koeln-transfusion/instagram.md : accroche, 3 à 5 lignes, la règle, sources avec numéro de dossier, mots-clés), fidèle au scénario et à ses réserves de vérité ; phrases en darija reprises du scénario, le reste en français marqué [FR] pour que l'auteur le dise avec ses mots.
7. Complète revue.md par une section « État de l'épisode et suite » : ce qui est prêt ; ce qu'il faudra faire quand la voix arrivera (montage de la voix sur le modèle de videos/akte-koeln-transfusion/montage_voix.py, remplacement de timings.js, repères fragiles à revérifier — storyboard § 6 —, durée de la scène muette, plan du son son/plan_son.md à reprendre) ; les points faibles qui restent, classés.
8. Sauvegarde : tools/sauvegarde.sh videos/${e.slug} "AKTE ${e.n} : contre-revue, description, fiche de suite"
Réponse : état (« prêt pour la voix » ou « réserves »), défauts trouvés / corrigés / restants, chemins absolus des planches finales (normales et --ig).`

const corps = (txt, e) => txt.slice(ctx(e).length).replace(/^\s+/, '')
const PREV = 'les étapes précédentes sont terminées ; leurs comptes rendus sont dans etat-construction.md (dossier de l\'épisode) : lis-le en premier.'
const enchaine = (titre, morceaux) => `${morceaux[0].ctx}

TON TRAVAIL — « ${titre} » : ${morceaux.length} tâches à faire À LA SUITE, dans l'ordre, sans en sauter. Chaque tâche finit par sa propre sauvegarde et son compte rendu dans etat-construction.md ; ne passe à la suivante qu'une fois la précédente propre. Économise les rendus : une planche par série de corrections, pas plus.

${morceaux.map((m, i) => `════════ TÂCHE ${i + 1} sur ${morceaux.length} ════════\n${m.txt}`).join('\n\n')}

Ta réponse finale porte sur l'ensemble de ton travail.`
const morceau = (txt, e) => ({ ctx: ctx(e), txt: corps(txt, e) })
const S_A = { type: 'object', properties: { fait: { type: 'array', items: { type: 'string' } }, ecarts: { type: 'array', items: { type: 'string' } }, defauts_restants: { type: 'array', items: { type: 'string' } }, notes: NOTES }, required: ['fait', 'ecarts', 'defauts_restants', 'notes'] }
const ETAPES = [
  { label: 'décors restants + scènes 1–2', phase: 'Construction', schema: S_A,
    f: (r, e) => enchaine('décors restants, HUD, mises en place, puis scènes parties 1 et 2', [morceau(decor3(r, e), e), morceau(scenes(1)('voir la tâche précédente et etat-construction.md', e), e), morceau(scenes(2)('voir la tâche précédente et etat-construction.md', e), e)]) },
  { label: 'scènes 3–4 + affiche', phase: 'Construction', schema: S_A,
    f: (r, e) => enchaine('scènes parties 3 et 4, puis l\'affiche-résumé', [morceau(scenes(3)(r, e), e), morceau(scenes(4)('voir la tâche précédente et etat-construction.md', e), e)]) },
  { label: 'revue complète', phase: 'Revue', schema: S_REVUE,
    f: (r, e) => enchaine('revue visuelle, contre-revue, description, fiche de suite', [morceau(revue1(r, e), e), morceau(revue2('voir la tâche précédente et revue.md', e), e)]) },
]
const results = await pipeline(
  LIST,
  ...ETAPES.map((st, i) => (r, e) => {
    if (i + 1 < e.depuis) return Promise.resolve('étape sautée')
    const prev = i + 1 === e.depuis ? PREV : r
    const run = agent(st.f(prev, e), { label: `${e.n} ${st.label}`, phase: st.phase, schema: st.schema })
    return i === ETAPES.length - 1 ? run.then((v) => ({ episode: e.n, slug: e.slug, final: v })) : run
  }),
)
return { episodes: results }
