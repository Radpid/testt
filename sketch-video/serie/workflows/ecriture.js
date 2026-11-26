export const meta = {
  name: 'akte-saison2-ecriture',
  description: 'Saison 2 AKTE : pour six affaires, dossier vérifié, scénario darija, relecture adverse, storyboard détaillé, puis contrôle des différences entre épisodes',
  phases: [
    { title: 'Dossier', detail: 'vérifier les faits, les sources et l issue de chaque affaire' },
    { title: 'Scénario', detail: 'texte darija par beats + minutage provisoire' },
    { title: 'Relecture', detail: 'contrôle adverse des faits, des règles du skill et de la darija' },
    { title: 'Storyboard', detail: 'distribution, décors, scène par scène, mouvements, son' },
    { title: 'Différences', detail: 'les six épisodes ne doivent pas se ressembler' },
  ],
}

const EPISODES = [
  { n: '04', slug: 'akte-koeln-transfusion', court: 'Köln · transfusion · « 63 ساعة »' },
  { n: '05', slug: 'akte-krefeld-nacht', court: 'Krefeld · seule la nuit · « بوحدها فالليل »' },
  { n: '06', slug: 'akte-lehrte-mtx', court: 'Lehrte · méthotrexate · « كلمة وحدة »' },
  { n: '07', slug: 'akte-siegburg-whatsapp', court: 'Siegburg · WhatsApp · « الگروپ »' },
  { n: '08', slug: 'akte-duesseldorf-titel', court: 'Düsseldorf · titre Dr. · « جوج حروف »' },
  { n: '09', slug: 'akte-friedrichshafen-nacht', court: 'Friedrichshafen · « غير سكران »' },
]

const ctx = (e) => `Tu travailles dans le dépôt /home/user/testt (tout se passe dans sketch-video/).
PROJET : série Instagram « AKTE » de @dr.aguilo — histoires VRAIES de médecins et de soignants sanctionnés en Allemagne, en Reels 1080×1920 dessinés au trait (encre, papier, jaune surligneur), racontés par la voix de l'auteur en darija marocaine avec les termes allemands. Public : médecins et soignants marocains et maghrébins qui travaillent ou veulent travailler en Allemagne. L'auteur veut que chaque épisode de cette saison soit très différent des autres (tournure, personnages, décors, style de mise en scène) tout en respectant le même skill.

À LIRE D'ABORD, EN ENTIER :
- /home/user/testt/.claude/skills/serie-storytelling/SKILL.md : toutes les règles de la série (elles s'appliquent toutes).
- /home/user/testt/sketch-video/serie/SERIE.md : règles de vérité, épisodes déjà faits.
- /home/user/testt/sketch-video/serie/SAISON-2.md : la partie commune, la fiche de TON épisode (ta feuille de route), et un coup d'œil aux cinq autres fiches pour ne pas leur ressembler.

TON ÉPISODE : AKTE ${e.n} (numéro provisoire) — ${e.court} — dossier /home/user/testt/sketch-video/videos/${e.slug}/

RÈGLES DE TRAVAIL :
- Tu écris seulement dans le dossier de ton épisode. Tu ne modifies jamais serie/lib/, engine/, tools/, SERIE.md, SAISON-2.md ni un autre épisode.
- Pas de git (ni add, ni commit, ni push). Aucune clé d'API. Aucun nom de personne ni d'hôpital dans les textes de la vidéo.
- Documents en français ; la darija et l'allemand seulement dans le contenu de la vidéo.
- Rien d'inventé : un fait sans source n'existe pas. Dans le doute, écris-le comme un doute.
`

const DOSSIER = {
  type: 'object',
  properties: {
    sanction: { type: 'string', description: 'la sanction exacte prononcée, avec montants et juridiction' },
    definitif: { type: 'string', enum: ['oui', 'non', 'inconnu'] },
    nb_sources_serieuses: { type: 'number' },
    issue_trouvee: { type: 'string', description: 'ce qu on sait de la suite (appel, opposition, classement) ou « rien trouvé »' },
    points_incertains: { type: 'array', items: { type: 'string' } },
    alertes: { type: 'array', items: { type: 'string' }, description: 'ce que le scénariste doit absolument savoir (faits de départ faux, accroche à changer, sujet sensible)' },
    resume: { type: 'string' },
  },
  required: ['sanction', 'definitif', 'nb_sources_serieuses', 'points_incertains', 'alertes', 'resume'],
}
const SCENARIO = {
  type: 'object',
  properties: {
    titre_darija: { type: 'string' },
    accroche: { type: 'string', description: 'les deux ou trois premiers beats, en darija' },
    nb_beats: { type: 'number' },
    nb_mots: { type: 'number' },
    duree_estimee_s: { type: 'number' },
    phrases_fr: { type: 'array', items: { type: 'string' }, description: 'phrases laissées en français [FR]' },
    notes: { type: 'string' },
  },
  required: ['titre_darija', 'accroche', 'nb_beats', 'nb_mots', 'duree_estimee_s', 'phrases_fr'],
}
const RELECTURE = {
  type: 'object',
  properties: {
    verdict: { type: 'string', enum: ['prêt', 'réserves'] },
    corrections: { type: 'array', items: { type: 'string' } },
    points_auteur: { type: 'array', items: { type: 'string' }, description: 'ce que l auteur doit savoir ou décider avant d enregistrer' },
    nb_mots: { type: 'number' },
    duree_estimee_s: { type: 'number' },
  },
  required: ['verdict', 'corrections', 'points_auteur', 'nb_mots', 'duree_estimee_s'],
}
const STORYBOARD = {
  type: 'object',
  properties: {
    nb_scenes: { type: 'number' },
    personnages: { type: 'array', items: { type: 'string' } },
    decors: { type: 'array', items: { type: 'string' } },
    reperes_a_verifier: { type: 'array', items: { type: 'string' } },
    risques: { type: 'array', items: { type: 'string' } },
  },
  required: ['nb_scenes', 'personnages', 'decors', 'risques'],
}
const DIFF = {
  type: 'object',
  properties: {
    verdict: { type: 'string' },
    accroches: { type: 'array', items: { type: 'object', properties: { episode: { type: 'string' }, texte: { type: 'string' } }, required: ['episode', 'texte'] } },
    problemes: { type: 'array', items: { type: 'object', properties: { episodes: { type: 'string' }, ou: { type: 'string' }, description: { type: 'string' }, correction: { type: 'string' }, corrige: { type: 'boolean' } }, required: ['episodes', 'ou', 'description', 'correction', 'corrige'] } },
  },
  required: ['verdict', 'accroches', 'problemes'],
}

const dossier = (e) => agent(`${ctx(e)}
ÉTAPE 1 SUR 4 — LE DOSSIER DE VÉRITÉ. Tu écris /home/user/testt/sketch-video/videos/${e.slug}/recherche.md. Tout le reste de l'épisode (texte dit, images, description) s'appuiera uniquement sur ce fichier : ce qui n'y est pas ne sera pas dans la vidéo.

La fiche de ton épisode dans SAISON-2.md donne les faits de départ, les sources déjà lues et la liste « À vérifier / compléter ». Ces faits de départ viennent d'une première lecture rapide : contrôle-les, ne les recopie pas.

MÉTHODE
1. Relis chaque source citée (WebFetch) et note ce qu'elle dit vraiment, avec le verbatim allemand des points importants.
2. Pour chaque point « à vérifier », cherche d'autres sources sérieuses : texte du jugement (openjur, dejure, rewis, nrwe, iww, portails de justice), communiqué du tribunal ou du parquet, presse médicale (Ärzteblatt, Ärzte Zeitung, zm, apotheke adhoc), presse régionale de qualité, dpa. Varie les formulations, en allemand, avec les lieux, les années, les montants.
3. Cherche l'issue : opposition, appel, Rechtskraft, suite disciplinaire. Si tu ne trouves rien, dis « rien trouvé » et liste tes recherches.
4. Source la règle finale dans un texte officiel (loi, Richtlinie de la Bundesärztekammer, Leitlinie AWMF, Rote-Hand-Brief, DSGVO, KMK, page d'une Ärztekammer…) avec la citation exacte et l'URL.
5. Quand deux sources se contredisent, note les deux versions ; ne tranche pas.
Outils : WebSearch et WebFetch (si leurs schémas ne sont pas chargés : ToolSearch avec la requête « select:WebSearch,WebFetch »). Une page qui refuse l'accès (403, mur payant, archive.org) : ne contourne pas, prends une autre source et note-le. Dans tes requêtes, seulement des termes généraux de l'affaire : jamais le nom ni le pseudo de l'auteur de la série.

FORMAT DE recherche.md (en français, citations en allemand)
1. En bref (5 lignes) — puis en gras : statut du jugement (définitif / non définitif / inconnu) et « feu vert » ou « réserves » pour publier, avec la raison.
2. Sources : tableau numéroté S1… (type : jugement, communiqué, presse médicale, presse régionale ; titre ; date ; URL ; lue en entier oui/non).
3. Faits numérotés F1… : un fait par ligne, la source (S…), la fiabilité (A = jugement ou communiqué du tribunal ; B = deux médias concordants ; C = un seul média ; D = incertain ou contradictoire) et, quand il existe, le verbatim allemand court.
4. Chronologie (dates, heures, durées).
5. Personnes : rôle, âge, ce qu'on sait (aucun nom propre de personne ni d'hôpital à reprendre dans la vidéo).
6. Citations verbatim utilisables à l'écran : allemand, traduction française, source, étiquette (« laut Urteil », « laut Gericht », « laut Presse »).
7. Procédure et sanction, étape par étape (montants, Tagessätze, sursis, qui paie quoi à qui) ; définitif ou non.
8. La règle à retenir : texte officiel, citation, URL — et la formulation courte qu'on peut en tirer sans la déformer.
9. L'explication médicale ou juridique en 5 à 8 lignes, simple et exacte, pour la scène « expliqué en image ».
10. Incertain, contradictoire, à ne pas dire.
11. Ce qu'on peut MONTRER sans rien inventer (lieux, objets, gestes sourcés) ; ce qui serait une invention (à étiqueter « Rekonstruktion » ou à éviter) ; y a-t-il une infirmière ou un infirmier, une famille, dans les sources ?
12. Recherches faites (requêtes) et pages inaccessibles.

Ta réponse finale (structurée) résume le dossier pour le scénariste ; mets dans « alertes » tout ce qui change l'accroche ou la tournure prévue dans SAISON-2.md.`,
  { label: `dossier ${e.n}`, phase: 'Dossier', schema: DOSSIER })

const scenario = (d, e) => agent(`${ctx(e)}
ÉTAPE 2 SUR 4 — LE SCÉNARIO (le texte EXACT que l'auteur dira dans l'audio). Le dossier de vérité est prêt : /home/user/testt/sketch-video/videos/${e.slug}/recherche.md. Lis-le en entier. Résumé de l'enquêteur : ${JSON.stringify(d || { note: 'résumé absent : fie-toi au fichier recherche.md' })}

RÉFÉRENCES POUR SA VOIX (ses vrais mots, transcrits de ses enregistrements) : sketch-video/videos/akte-koeln-schweigen/beats.js et sketch-video/videos/akte-unna-geburt/beats.js, plus leurs scenario.md. Imite son vocabulaire, la longueur de ses phrases, sa façon de garder les mots allemands et français.

CE QUE TU ÉCRIS
A) /home/user/testt/sketch-video/videos/${e.slug}/scenario.md
B) /home/user/testt/sketch-video/videos/${e.slug}/beats.js   (window.BEATS = [["b1", "…"], …] : texte exact, une phrase = un beat = un sous-titre ; même en-tête de commentaire que les épisodes existants)
C) /home/user/testt/sketch-video/videos/${e.slug}/preview.json   ({"sceneStart": [ids où le contexte change complètement], "extra": {"bN": 3.2} pour la scène muette s'il y en a une})
puis lance, depuis /home/user/testt/sketch-video : node tools/preview_timings.mjs videos/${e.slug}   (minutage provisoire sans voix) et ajuste le texte jusqu'à tomber dans la durée et le nombre de mots visés par SAISON-2.md pour ton épisode.

RÈGLES DU TEXTE (toutes viennent du skill ; relis « Écrire une histoire qui retient »)
- 0–2 s : l'accroche = la sanction chiffrée, sans bonjour. Si le jugement n'est pas définitif ou si l'issue est inconnue, l'accroche dit seulement ce qui est établi.
- Juste après l'accroche (2 à 4 beats), l'intro : copie i1, i2, i3 MOT POUR MOT depuis akte-koeln-schweigen/beats.js (déjà enregistrée, elle sera réutilisée).
- La TOURNURE imposée par la fiche de ton épisode doit se sentir dans le texte lui-même (ordre du récit, point de vue, rythme) : pas le déroulé chronologique habituel plaqué sur un autre sujet.
- Chaque étape se comprend seule : pourquoi, qui, où. Une idée par phrase. Phrases de 6 à 14 mots, dites d'un souffle.
- Darija marocaine SIMPLE et courante, en lettres arabes, comme dans ses beats (« واحد », « ديالها », « بلي », « حيت », « عاد », « كي… »). Pas d'arabe littéraire. Mots français et allemands en lettres latines, tels qu'il les dit. Nombres importants en chiffres (années, montants, heures).
- Toute phrase dont tu n'es pas sûr en darija : écris-la en français et marque-la [FR]. N'invente jamais de darija.
- Chaque mot allemand est expliqué dans la phrase ou juste après (« … يعني … ») et listé avec son sens français.
- Aucune question au spectateur au milieu ; pas d'appel à commenter dit à voix haute (il sera seulement écrit à la fin).
- La mort ne se dit pas, elle se montre : prévois le silence (scène muette) au bon endroit, et la phrase suivante reprend après.
- Dis clairement, une fois, si le jugement est définitif ou non.
- Fin : la règle, courte et actionnable (2 à 3 phrases), puis une dernière phrase qui reste.
- Chaque phrase s'appuie sur des faits du dossier (F…). Un détail absent du dossier n'entre pas dans le texte.
- Infirmière ou infirmier dans l'histoire seulement si le dossier en contient.

FORMAT DE scenario.md
# AKTE ${e.n} — titre en darija (ville, année)
## Fiche : accroche ; boucle ouverte ; comment le texte applique la tournure imposée ; durée estimée et nombre de mots ; ce qui est dit sur le statut du jugement.
## TEXTE À ENREGISTRER : la liste numérotée des phrases, propre, sans notes (c'est ce que l'auteur lira au micro). L'intro i1–i3 est indiquée « déjà enregistrée ».
## Détail par beat : tableau — id · darija · traduction française fidèle · mots allemands (sens en français + glose arabe courte pour l'écran) · faits utilisés (F…) · pause (changement de contexte / silence).
## Phrases [FR] à traduire par l'auteur.
## Mots allemands à l'écran : pastille allemande + traduction arabe courte.
## Ce qui n'est PAS dit mais montré : scène muette, mentions écrites (« nicht rechtskräftig », « Rekonstruktion », « laut Urteil »…).
## Fin : question écrite adaptée à l'épisode (pas dite) + teaser « AKTE NN+1 · قريبا ».

Ta réponse finale (structurée) donne le titre, l'accroche, les compteurs et les phrases [FR].`,
  { label: `scénario ${e.n}`, phase: 'Scénario', schema: SCENARIO })

const relecture = (s, e) => agent(`${ctx(e)}
ÉTAPE 3 SUR 4 — RELECTURE ADVERSE DU SCÉNARIO. Un autre agent vient d'écrire sketch-video/videos/${e.slug}/scenario.md, beats.js et preview.json à partir de recherche.md. Tu ne l'as pas écrit : ton travail est de trouver ce qui est faux, flou, inventé ou contraire aux règles, puis de le CORRIGER dans les fichiers. Pars du principe qu'il y a des erreurs.

CONTRÔLES (dans cet ordre)
1. VÉRITÉ, beat par beat : chaque affirmation (âge, date, heure, montant, lieu, rôle, cause, ordre des événements, statut du jugement) existe-t-elle dans recherche.md avec une fiabilité suffisante ? Rien de niveau D dans le texte ; le niveau C doit être dit comme « selon la presse » (« حسب الصحافة ») au moins une fois. Pour les cinq affirmations les plus lourdes (sanction, montants, statut définitif, cause du décès, qui a fait quoi), retourne lire la source d'origine en ligne (WebFetch ; ToolSearch « select:WebSearch,WebFetch » si besoin) et vérifie le dossier lui-même. Si le dossier se trompe, corrige recherche.md aussi et signale-le.
2. JUSTICE : rien qui accable une personne au-delà de ce que le tribunal a retenu ; une peine non prononcée n'est jamais montrée ni dite ; « non définitif » dit clairement quand c'est le cas ; aucun nom de personne ni d'hôpital.
3. RÈGLES DU SKILL : accroche = sanction chiffrée en 0–2 s ; intro i1–i3 identique mot pour mot à akte-koeln-schweigen/beats.js ; aucune question au spectateur au milieu ; pas d'appel à commenter dit ; la mort montrée dans un silence et non dite ; chaque étape se comprend seule (pourquoi, qui, où) ; chaque mot allemand expliqué ; règle finale courte et actionnable, et exacte par rapport au texte officiel cité dans le dossier.
4. TOURNURE : la tournure imposée par la fiche de l'épisode dans SAISON-2.md est-elle vraiment dans le texte (ordre du récit, point de vue, rythme), ou est-ce le déroulé habituel « accroche, patient, erreur, tribunal, règle » ? Si c'est le déroulé habituel, réécris l'ordre et les phrases de liaison.
5. DARIJA : compare avec ses vrais mots (akte-koeln-schweigen/beats.js, akte-unna-geburt/beats.js). Remplace l'arabe littéraire par sa darija ; raccourcis les phrases de plus de 14 mots ; toute tournure dont tu n'es pas sûr devient une phrase en français marquée [FR]. Lis le texte à voix haute mentalement : une phrase qui accroche se réécrit.
6. COMPRÉHENSION : quelqu'un qui n'est ni médecin ni juriste suit-il chaque étape ? Les liens logiques (« donc », « parce que ») sont-ils dits ?
7. DURÉE : relance depuis /home/user/testt/sketch-video : node tools/preview_timings.mjs videos/${e.slug} ; reste dans la cible de SAISON-2.md.

Corrige directement scenario.md (toutes ses sections restent cohérentes entre elles), beats.js et preview.json. Termine scenario.md par une section « ## Relecture » : ce que tu as corrigé et pourquoi, et « Points pour l'auteur » (ce qu'il doit savoir ou décider avant d'enregistrer : réserves de vérité, phrases [FR], mots difficiles à prononcer).
Compteurs de l'auteur du scénario : ${JSON.stringify(s || {})}

Ta réponse finale (structurée) : verdict, corrections, points pour l'auteur, compteurs à jour.`,
  { label: `relecture ${e.n}`, phase: 'Relecture', schema: RELECTURE })

const storyboard = (r, e) => agent(`${ctx(e)}
ÉTAPE 4 SUR 4 — LE STORYBOARD. Le texte est relu et figé : sketch-video/videos/${e.slug}/scenario.md, beats.js, timings.js (minutage PROVISOIRE). Tu écris le document que suivra un autre agent pour dessiner les décors et animer chaque scène SANS te poser de question : tout doit y être, jusqu'au plus petit objet qui bouge. L'auteur a demandé « chaque petit détail, chaque petit décor qui doit bouger ».

À LIRE AVANT D'ÉCRIRE
- Le skill, section « Image » et « Zones Instagram » (chaque retour de l'auteur y est noté : ne refais aucune de ces fautes).
- La fiche de ton épisode dans SAISON-2.md : tournure, dispositif signature, style, caméra, transition signature, teinte, personnages, décors, formes imposées pour le tribunal, la sanction, la carte, l'intro et la scène muette.
- Le moteur, pour savoir ce qui est possible et comment ça s'écrit : sketch-video/serie/lib/stage.js (scènes, caméra, transitions, repères), sketch-video/serie/lib/motion.js (bulles, décor qui se construit et qui vit), sketch-video/serie/lib/persona.js (en-tête : paramètres des personnages, poses, expressions), et comment un épisode les utilise : sketch-video/videos/akte-koeln-schweigen/story.js et decor.js (pour la TECHNIQUE seulement : ne reprends ni ses décors ni ses personnages).
- Les distributions d'AKTE 02 et 03 (akte-unna-geburt/story.js, akte-koeln-schweigen/story.js) : aucun de tes personnages ne doit leur ressembler.

CE QUE TU ÉCRIS
A) /home/user/testt/sketch-video/videos/${e.slug}/storyboard.md
B) /home/user/testt/sketch-video/videos/${e.slug}/son/plan_son.md

CONTENU DE storyboard.md
0. Direction en dix lignes : dispositif signature, grammaire de caméra, transitions, teinte, ton, ce qui rend cet épisode différent des cinq autres et d'AKTE 02/03.
1. Distribution : pour chaque personnage — rôle, paramètres Persona exacts (look, hair, hairTone, beard, glasses, outfit par scène, seed), accessoire signature, échelle, et l'arc de ses expressions au fil des beats. Qui parle (talk) et quand.
2. Inventaire des décors et objets à dessiner dans decor.js : pour chacun — nom de fonction, description du dessin (formes, détails, textes), taille et point d'ancrage, parties mobiles (laquelle, comment : m.build, m.sway, m.pend, m.drift, m.dust, m.rays, animation propre), dans quelles scènes il sert.
3. HUD propre à l'épisode (compteur, horloge, cadre de téléphone, ligne de séparation…) : forme, position hors des zones Instagram, comportement.
4. Scène par scène (une scène plein écran par idée ; un changement visuel toutes les 1,5 à 2 s) : numéro et nom ; beats couverts et durée provisoire ; lieu ; transition d'entrée ; composition avec coordonnées (repère 1080×1920 ; contenu entre x 110 et 960, y 250 à 1470 ; rien d'important dans x > 915 pour y 980–1650) ; couches de l'arrière vers l'avant ; construction du décor en cascade (élément, type de build, instant relatif) ; ce qui vit ensuite (élément, mouvement, amplitude, période) ; ce qui réagit à l'histoire ; personnages (position, échelle, orientation, pose, mains, changements d'expression calés sur des repères « bN@mot ») ; caméra (images-clés calées sur des repères, zooms ≤ ×1,7 sur sujets complets) ; textes à l'écran (chaîne exacte, pastille allemande + arabe détaché, taille, position, instant) ; bulles ; mentions (« Rekonstruktion », « laut Urteil », « nicht rechtskräftig ») ; ce que la scène doit faire comprendre en une phrase.
5. Les scènes imposées, dans la forme propre à ton épisode : accroche très travaillée ; intro Yassine (photo dans un cadre au trait + anneau jaune + icône Instagram, « Yassine », « @dr.aguilo », cœur j'aime + bouton s'abonner animés sur les mots, logo du haut masqué, bloc fini au-dessus de y 1300, summary false) ; explication médicale ou juridique en image ; carte ; scène muette du décès s'il y en a un ; tribunal ; sanction ; règle ; affiche-résumé (nombre de cases, colonnes, question écrite, teaser).
6. Liste des repères utilisés (« bN@mot », « bN@end », « bN+0.3 ») : vérifie que chaque mot existe tel quel dans beats.js.
7. Risques : chevauchements possibles, éléments proches des zones Instagram, personnages difficiles (allongé, de dos, vu de dessus), ce qui demandera un dessin dédié — et la solution proposée.
8. Check-list de contrôle pour celui qui construira (planche avec maquette Instagram, scan des chevauchements, mesure du mouvement, erreurs d'exécution).

CONTENU DE son/plan_son.md : les sons NATURELS de chaque scène (jamais de pop, whoosh, ding, buzzer, « reveal », swell, boom), calés sur des repères, avec le niveau ; le moniteur synthétisé s'il y en a un ; les sections de la musique (ambiance, instruments, intensité) calées sur la frise de l'épisode, dans le ton fixé par SAISON-2.md. Aucune génération maintenant.

Résultat de la relecture du texte : ${JSON.stringify(r || {})}

Écris long et précis : ce document est jugé sur sa capacité à être exécuté tel quel. Ta réponse finale (structurée) : nombre de scènes, personnages, décors, repères douteux, risques.`,
  { label: `storyboard ${e.n}`, phase: 'Storyboard', schema: STORYBOARD })

const results = await pipeline(
  EPISODES,
  (e) => dossier(e),
  (d, e) => scenario(d, e).then((s) => ({ d, s })),
  (x, e) => relecture(x.s, e).then((r) => ({ ...x, r })),
  (x, e) => storyboard(x.r, e).then((b) => ({ episode: e.n, slug: e.slug, dossier: x.d, scenario: x.s, relecture: x.r, storyboard: b })),
)

phase('Différences')
const diff = await agent(`Tu travailles dans le dépôt /home/user/testt (sketch-video/). Six épisodes de la série « AKTE » viennent d'être préparés (dossier, scénario, storyboard) par six équipes qui ne se sont pas parlé. L'auteur exige que chaque épisode soit très différent des autres : pas la même tournure, pas les mêmes personnages, pas les mêmes décors, pas le même style de mise en scène — mais les mêmes règles (.claude/skills/serie-storytelling/SKILL.md) et la direction fixée dans sketch-video/serie/SAISON-2.md.

Lis SAISON-2.md, puis pour chacun des six dossiers sketch-video/videos/{akte-koeln-transfusion, akte-krefeld-nacht, akte-lehrte-mtx, akte-siegburg-whatsapp, akte-duesseldorf-titel, akte-friedrichshafen-nacht}/ : scenario.md et storyboard.md. Compare aussi avec les deux épisodes existants (akte-unna-geburt, akte-koeln-schweigen : beats.js et story.js).

CHERCHE LES RESSEMBLANCES, en comparant vraiment côte à côte :
- accroches : même construction de phrase, mêmes mots d'ouverture, même rythme ;
- ordre du récit : deux épisodes qui déroulent les mêmes étapes dans le même ordre malgré des tournures imposées différentes ;
- phrases de fin et règles formulées de la même façon ; questions écrites de fin identiques ;
- personnages : deux distributions avec la même combinaison look / coiffure / teinte / lunettes / barbe / tenue pour un rôle visible (y compris par rapport à AKTE 02 et 03) ;
- décors et objets qui reviennent (même lit, même moniteur, même salle d'audience, même carte, même scène de sanction) ;
- caméra, transitions, dispositif signature : un épisode qui n'applique pas ce que SAISON-2.md lui impose ;
- oublis par rapport au skill (scène imposée manquante, question au milieu, intro absente).

CORRIGE toi-même, dans les storyboard.md concernés, les ressemblances de personnages, de décors et de mise en scène (change l'épisode qui s'écarte le plus de sa fiche ; garde le document cohérent). NE TOUCHE PAS au texte dit (scenario.md, beats.js) ni aux faits : pour le texte, propose seulement la correction. Pas de git.

Réponse finale (structurée) : le verdict, les six accroches telles qu'elles sont écrites, et chaque problème avec les épisodes concernés, l'endroit, la correction, et si tu l'as faite.`,
  { label: 'différences entre épisodes', phase: 'Différences', schema: DIFF })

return { episodes: results, differences: diff }
