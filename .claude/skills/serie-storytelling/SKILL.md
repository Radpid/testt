---
name: serie-storytelling
description: Écrire et produire un épisode de la série storytelling « AKTE » de @dr.aguilo (histoire vraie d'un médecin ou soignant sanctionné en Allemagne, Reel Instagram animé au trait, voix darija de l'auteur + termes allemands). À utiliser quand l'utilisateur demande « l'épisode suivant », un nouveau cas, un scénario, un storyboard, le montage de sa voix, la musique/les bruitages, le rendu ou la description Instagram d'un épisode, ou veut modifier un épisode existant.
---

# Série « AKTE » — cas réels de médecins et soignants en Allemagne

**Langue avec l'auteur : toujours le français** (messages, explications, propositions, légendes de fichiers).
La darija et l'allemand seulement dans le contenu de la vidéo (script à enregistrer, textes à l'écran).
**Réponses courtes, sans redites** : ce qui a changé, ce qu'il doit valider, rien de plus.

Lis d'abord `sketch-video/serie/SERIE.md` : format, règles de vérité, épisodes (statut, sources).
**Modèle le plus récent et le plus complet : AKTE 04, `sketch-video/videos/akte-koeln-transfusion/`** (fichiers en
plusieurs parties, voix improvisée remontée, moniteur + ligne plate, son stéréo, rembobinage, couverture Instagram :
copier ses scripts `montage_voix.py`, `son/*.py`, `son/ecg_times.mjs`, `cover.html`, `cover.mjs`). AKTE 02
(`videos/akte-unna-geburt/`) : chambre vue de face, pauses ciblées. AKTE 01 (`videos/ep01-spritze/`) : carte, affiche finale.
Nouvel épisode : copier **`sketch-video/videos/_gabarit/`** (socle du skill : pastilles, carte, intro, HUD, affiche
finale, glossaire de l'épisode) et écrire le reste ; ne pas repartir de zéro, ne pas recopier les décors d'un autre.

**Chaque épisode a SA mise en scène** (demande de l'auteur, 26.11.2026 : « très différent de l'autre : pas la même
tournure, pas les mêmes personnages, pas les mêmes décors, et surtout pas le même style — mais le même skill »).
Les règles ci-dessous ne changent jamais ; ce qui change à chaque épisode : la tournure du récit (rembobinage, nuit
heure par heure, objet qu'on suit, écran de téléphone, 2e personne, écran coupé en deux…), le dispositif visuel
signature, la grammaire de caméra, la transition signature, une teinte discrète sur l'objet signature, le ton et la
musique, la FORME des scènes obligées (tribunal, sanction, carte, intro, scène muette). La direction de la saison en
cours est dans `sketch-video/serie/SAISON-2.md` (tableau des différences + fiche par épisode + interdits de
ressemblance) : la lire avant d'écrire, et la tenir à jour.

**Préparer avant la voix** (saison 2) : dossier → script → storyboard détaillé → décors et scènes animées sur un
minutage PROVISOIRE (`tools/preview_timings.mjs`, débit de l'auteur ≈ 3,05 mots/s à ×1,3), contrôlés par captures ;
la voix arrive ensuite, `montage_voix.py` remplace `timings.js` et les repères (« bN@mot ») recalent tout.
Contrôles : `tools/planche.mjs <épisode> [--entre bA,bB] [--ig]` (planches lisibles, zones Instagram),
`tools/planche.mjs --from --to --step 0.1` (début de scène image par image), `tools/essai_decor.mjs` (chaque dessin
de décor seul, avec son ancrage), `tools/mouvement.mjs` (décor figé), `tools/overlapscan.mjs`, `tools/errcheck.mjs`,
`tools/cuetimes.mjs`. Un contrôle ne compte que si les images ont été REGARDÉES.

**Grand chantier à plusieurs agents** (demande de l'auteur : « un grand workflow », puis « un autre workflow ») :
1. *écriture*, un épisode par chaîne : dossier vérifié → scénario → relecture adverse (vérité, skill, darija) →
   storyboard ; puis UN agent compare tous les épisodes entre eux (mêmes images, mêmes personnages, mêmes phrases) ;
2. *construction*, un épisode par chaîne : décors en trois passes (objets signature d'abord, dessins délicats —
   personne allongée, mains, dos — validés seuls à grande taille) → HUD et mises en place fixes (`X.lieux`) →
   scènes en quatre parties → revue visuelle indépendante → contre-revue (débuts de scène image par image) ;
3. *après la voix* : montage de la voix, synchronisation, son, rendu.
**Version économique** (demande de l'auteur : « pas un grand workflow pour rien, mais complet et vraiment revu ») :
`serie/workflows/construction-legere.js` — 3 agents à la suite (décors restants + scènes 1–2 ; scènes 3–4 +
affiche ; revue + contre-revue + `instagram.md`), puis **revue de Claude lui-même** : planches complètes et `--ig`
regardées une à une, scène muette image par image, `tools/soustitres.mjs`, `overlapscan`, `mouvement`.
Chaque agent n'écrit que dans le dossier de son épisode et sauvegarde avec `tools/sauvegarde.sh videos/<épisode>
"message"` (commit + envoi sous verrou). Le texte dit (`scenario.md`, `beats.js`) est figé pendant la construction.
La machine n'a que 4 cœurs : 2 agents à la fois par workflow → lancer plusieurs workflows de 2 épisodes.
Les scripts à enregistrer sont donnés à l'auteur sur une page : `python3 tools/scripts_page.py` →
`serie/saison-2-scripts.html` (une phrase par ligne, traduction française, silences, points à savoir).

```
videos/<episode>/
  recherche.md        faits sourcés, citations verbatim, chronologie, statut du jugement
  scenario.md         le texte EXACT qu'il dira dans l'audio (darija) + plan des scènes (validé par l'auteur)
  montage_voix.py     montage de SA voix : sources, phrases (BEATS), corrections (FIX), pauses, tempo
  beats.js            une phrase = un beat = un sous-titre (texte exact de sa voix)
  timings.js          minutage mot par mot (généré par montage_voix.py)
  storyboard.md       scène par scène : composition, cascade, vie du décor, jeu, caméra, repères (saison 2)
  index.html          réglages (SV_CONFIG), styles, logo, scripts
  decor.js, decor-2.js, decor-3.js   dessins propres à l'épisode (`window.EpDecor`), jamais repris d'un autre
  story.js            socle (kit, carte, aides Persona), distribution `CAST`, HUD, `X.aides`, `X.lieux`, affiche
  scenes-1.js … scenes-4.js   les scènes, une partie de l'épisode par fichier (registre `EP_PARTS`, `X.use(c)`)
  glossaire-episode.js   mots allemands de l'épisode pour les sous-titres
  revue.md            défauts trouvés par captures, corrections, état de l'épisode et suite (saison 2)
  assets/portrait.png photo de l'auteur pour l'intro — JAMAIS dans git (.gitignore)
  son/                sons.py (bruitages ElevenLabs), plan_bruitages.py, musique_plan.json, ecg_times.mjs, mixage.py
  cover.html, cover.mjs   couverture Instagram (image à part, 1080 × 1920)
  instagram.md        description prête à coller (darija, SES mots)
```

## Étapes (une validation de l'auteur à chaque étape — « tu me dis avant qu'on se lance »)

1. **Choix du cas** dans `SERIE.md` ou nouvelle recherche (jugements VG/OVG/LG/OLG/BGH, presse médicale sérieuse).
   Pas seulement des erreurs médicales : faute disciplinaire, éthique, fraude… tant que c'est une histoire VRAIE,
   sourcée, touchante, avec une sanction précise. Le cas n'a pas besoin d'être pénal.
2. **Vérification à fond** → `recherche.md` : chronologie sourcée, citations allemandes VERBATIM, points incertains,
   définitif ou non. Sans source, pas de scène.
3. **Script** → `scenario.md` = le texte qu'il dira dans l'audio : en darija SIMPLE et courante ; toute phrase dont
   la darija n'est pas sûre est écrite en français marquée [FR] (ne jamais inventer de darija) ; chaque mot
   allemand suivi de son sens en français entre parenthèses, ex. Beckenlage (présentation du siège).
   **Chaque étape doit se comprendre seule** : pourquoi, qui, où (AKTE 02 : il a demandé « pourquoi accoucher à
   l'hôtel ? », « comment une médecin à l'hôtel ? », « je n'ai pas compris cet extrait »). Si l'auteur ne comprend
   pas une phrase, le public non plus : la réécrire, expliquer le lien logique.
4. **Enregistrement** par l'auteur (+ courtes reprises pour corriger une phrase ou ajouter un mot). Il ne lit PAS
   le script mot pour mot : il reformule, se reprend, relit un passage après une erreur (AKTE 04 : 5 min pour 1 min 45).
5. **Montage voix** (§ Voix) → `beats.js` + `timings.js`. Lui signaler ce qui a été retiré/corrigé et les mots incertains.
6. **Scènes** (§ Image) → planches contact AVEC la maquette Instagram (§ Zones) + scan des chevauchements → validation.
7. **Son** (§ Son) : musique composée sur la frise de l'épisode, sons naturels, mixage.
8. **Rendu final** + `instagram.md` + **couverture** (§ Couverture) + statut dans `SERIE.md`. Livrer la vidéo, la
   description et la couverture.

## Écrire une histoire qui retient

- **0–2 s : l'accroche = la sanction chiffrée** (prison avec ou sans sursis, amende, dommages et intérêts en euros,
  licenciement, retrait d'Approbation, Berufsverbot…). Jamais de « Salam, aujourd'hui on va parler de ».
  L'accroche doit être **visuellement très travaillée** : décor complet (ex. vraie cellule, grille qui tombe),
  mouvement fort dès la 1re image, personnage qui réagit (choc → panique → larmes).
- **Infirmier/infirmière ET médecin** dans l'histoire quand c'est possible (public soignant au sens large).
- **Touchant** (une vie, une famille, un enfant) ; plus d'animation et plus de décors à chaque épisode, un
  changement visuel toutes les 1,5–2 s ; **montrer** plutôt que raconter ; une idée par scène.
- **Intro auteur juste après l'accroche** (~5–6 s) : il se présente et demande j'aime + abonnement
  (« أنا ياسين، طبيب فألمانيا… إلا عجباتك، دير j'aime و abonne… »). Sa vraie photo dans un cadre au trait + anneau
  jaune + petite icône Instagram ; nom écrit **« Yassine » seulement, jamais « Dr. Yassine »** ; « @dr.aguilo » ;
  cœur j'aime + bouton s'abonner animés sur les mots ; logo du haut masqué pendant l'intro (pas de doublon) ; le
  bloc entier finit au-dessus des sous-titres (≈ y 1300 à l'écran) ; intro `summary: false`.
- **Pas de question au spectateur au milieu** (« et toi, qu'aurais-tu fait ? », sondage, STOP + question) :
  l'histoire avance sans s'arrêter ; l'appel à commenter est seulement ÉCRIT à la fin (pas dit), adapté à
  l'épisode (AKTE 02 : « شنو رأيك فهاد القصة؟ » + « كتب ليا فالكومنتير » + flèche vers le bouton commentaire).
- **Boucle ouverte** possible (« والحل كان غير في جملة واحدة » → réponse à la fin), sans question au public.
- Détails concrets et vrais (date, âge, heure, montant, ville). Pas de détail inventé.
- Le retournement juridique + **la règle** finale, courte et actionnable.
- **La mort ne se dit pas, elle se montre** : scène muette (~3,5–4 s, `EXTRA` dans le montage) — **TOUJOURS un
  moniteur « bip bip »** (retour AKTE 04 : « il n'y a pas le bip bip… un truc qui montre que vraiment le patient
  était mort ») dès que la personne est hospitalisée, même si le jugement ne le cite pas : moniteur au mur
  (AKTE 04 `D.monitor04` : écran sombre, tracé jaune qui balaie, FC, cœur qui bat), battements PARTAGÉS par l'image
  et le son (`window.ECG04` → `son/ecg_times.mjs`), le rythme ralentit et s'affaiblit (bip de plus en plus grave),
  puis LIGNE PLATE (FC 0, cadre rouge) + bip continu ; la phrase écrite et le gris arrivent SUR la ligne plate ;
  l'horloge, la goutte et le compteur s'arrêtent avec elle ; la personne décédée MONTRÉE (AKTE 02 : la petite dans les bras de
  sa maman), la famille qui s'enlace en pleurant, le soignant à genoux, la phrase écrite (« البنت ما عاشتش »), la
  couleur s'éteint (grayscale). Jamais seulement suggérée par un objet (couverture vide).
- Fin : affiche-résumé avec dézoom + appel à commenter écrit + teaser « AKTE NN+1 · قريبا ».
- Écriture de l'auteur : « Bébé » (pas بيبي), mots français/allemands tels qu'il les dit.
- **Pas d'arabe standard à l'écran ni dans la description** (AKTE 04 : « مذنبة n'existe pas en darija ») : pour une
  accroche, une pastille, la description, reprendre en priorité SES mots de l'audio (« مريض مات… لا حبس، لا غرامة ») ;
  sinon [FR] et lui demander son mot.
- Dialogue reconstitué → « Rekonstruktion » ; citation réelle → « laut Urteil ».

## Voix (sa voix ; outils ElevenLabs, c'est son choix)

0. **On monte SES mots, pas le script** : `beats.js` et les sous-titres = ce qu'il a dit (`montage_voix.py` les
   régénère). Garder les identifiants du storyboard (b1…) en rattachant chaque phrase dite à son beat ; meilleure
   prise par phrase, faux départs et phrases relues retirés ; une phrase peut mêler deux prises (AKTE 04 b22).
   Puis recaler les repères des scènes : copier l'ancien `beats.js`, lancer le montage, puis
   `python3 tools/reperes_voix.py videos/<ep> <ancien_beats.js>` (ABSENT = la page planterait ; CHANGE = repère par
   rang). Un repère tout en chiffres est un RANG (« b21@90 » échoue → « b21@7 »).
   **Vérité** : une phrase improvisée fausse est retirée et une courte reprise demandée, avec la phrase proposée
   (AKTE 04 : « خرجت براءة » alors qu'elle est coupable sans peine ; « كملات الخدمة normal » alors qu'elle n'a plus
   pu exercer). Les mots que Scribe hésite à entendre : les lui lister, il confirme.
1. **Scribe** (horodatage par mot) sur l'enregistrement et chaque reprise, en **v2 ET v1** : v2 écrit parfois
   l'arabe standard (reprises courtes : « امرأة انتبهت لخطأها »), v1 garde mieux la darija ; comparer les deux sur
   les mots douteux (`language_code` « ary » est refusé : laisser vide). Re-transcrire aussi le résultat monté.
   Signaler à l'auteur les mots incertains au lieu de deviner.
2. **Sous-titres dans SA darija** : quand Scribe écrit un mot faux ou en arabe standard, le corriger via `FIX`
   (ex. intro transcrite en MSA → texte darija du script ; « زازت » → « دازت »). `""` fusionne, `"a|b"` coupe ;
   « الـ » collé au mot suivant.
3. **Audio Isolation** ElevenLabs sur CHAQUE source complète AVANT le montage.
4. **Reprises** égalisées sur l'original (`match()` : EQ d'appariement 1/6 d'octave + même RMS, écart ≤ ±3–4 dB).
   Retirer leurs hésitations et tout ce qui est faux.
5. **Couper tous les mots sans importance** (« يعني », « المهم », « آآآ », bégaiements, redites, faux départs,
   explications déjà écrites à l'écran) — MAIS **jamais supprimer une scène ou une phrase sans lui demander** :
   proposer la liste. Une info fausse dite à l'oral (AKTE 02 : mauvais pays) → couper le mot, corriger à l'écran,
   le lui dire.
6. **Montage par phrase, jamais mot par mot** (saccadé, refusé). Coupes au point le plus silencieux, fondus 20 ms.
7. **Vitesse : `atempo=1.3`** (hauteur conservée). AKTE 02 : ×1,5 jugé TROP rapide par l'auteur → retour à ×1,3.
   **L'accroche à ×1,1** (AKTE 04 : « au début je parle trop vite ») : deux vitesses, coupe dans la pause entre
   l'accroche et la suite (`TEMPO_HEAD`, `HEAD`, `SPLIT` dans `montage_voix.py` d'AKTE 04).
8. **Rythme enchaîné, pauses ciblées** (retours AKTE 02 : « pas de longues pauses, pas de pauses à l'improviste »)
   — valeurs AVANT ×1,3 dans `montage_voix.py` :
   - même contexte : `beat` 0,09–0,20 s (cible 0,14 → ≈ 0,1 s à l'écoute) ;
   - **changement COMPLET de contexte seulement** (`SCENE_START`) : 0,48–0,6 s (≈ 0,42 s) — accroche → intro,
     intro → histoire (0,65), nouvel événement (douleurs, naissance), expert → tribunal, verdict → peine, leçon ;
   - `PAUSE_BEFORE` là où deux idées se mélangent (AKTE 02 : après « بغينا ولادة طبيعية »  0,45) ;
   - `EXTRA` pour la scène muette (AKTE 02 : 4,2 → ≈ 3,2 s). Jamais de pause à chaque scène « par principe ».
9. **Durée** : AKTE 01 1 min 32 (×1,3) ; AKTE 02 ≈ 1 min 41 avec l'intro (×1,3). Court, mais rien de supprimé sans accord.
10. **Mastering « voice-off » v2** (AKTE 04, « voix plus attirante ») : `highpass 70, +2,5 dB@140, −3 dB@320,
    +1,5 dB@2,8 kHz, +2 dB@5,2 kHz, high-shelf +2 dB@10 kHz, deesser 0,5, compresseur 3,5:1 (5/80 ms, makeup 3),
    aexciter léger (0,8 au-dessus de 7 kHz)` → −15 LUFS en deux passes, `alimiter=limit=0.8:level=0` (sans
    `level=0`, le limiteur remonte tout à 0 dB). Jamais de gate.
    **Voice Changer d'ElevenLabs (son clone « yassine ») : NON** — essayé sur AKTE 04, il déforme la darija
    (« مريض مات » → « بريك بات », « لا حبس » disparaît) ; l'auteur a dit d'oublier. Ne pas le reproposer.
    **Intro commune** (« أنا ياسين… », AKTE 02) : `intro.iso.mp3` + `intro.scribe2.json`, hors git (avec les voix) ;
    la recopier d'un épisode qui l'a, sinon la redemander à l'auteur.
    Puis régénérer `beats.js` / `timings.js` depuis `edl3.json`, et tout ce qui dépend du minutage (bip du
    moniteur, repères des bruitages, sections de la musique).

## Image

- **Style** : tout au trait (rough.js, hachures grises), papier à points, **jaune surligneur** #F8CE4E.
- **Personnages : `serie/lib/persona.js`** (visages détaillés : yeux avec reflet, sourcils, bouche expressive ;
  `expr`, `blink`, `talk`, `look2`, `headTilt`, `tears`, `sweat`, `blush` ; tenues casual/sweater/maternity/coat/
  scrubs/robe/suit ; poses `Persona.Pose` ; `Persona.couple` (holdHands, armAround, lookEachOther, hug, forehead) ;
  `Persona.baby` ; accessoires `Persona.props`). Toujours de NOUVEAUX personnages par épisode, jamais les mêmes
  silhouettes. `sketch-cast.js` = ancien (AKTE 01). Mains en moufle, jamais de doigts.
- **Personnages vivants, jamais figés** : clignements, respiration, regard qui bouge, expression qui CHANGE avec
  la phrase (choc → inquiétude → pleurs), larmes, sueur, mains qui agissent (elle serre les barreaux).
  **Pas d'animation amateur** : pas de personnage qui glisse (marche = vrai cycle `Pose.walk`), pas de membres
  qui se croisent, pas de bras tendu raide dans le vide, pas de tête qui en cache une autre.
- **Couple** : montrer l'amour (main dans la main, bras autour, cœur, regard, blush, sourire) puis la douleur
  (pleurs, étreinte). Composition propre : chacun sa place, aucune tête ni corps qui se chevauchent.
- **Idée abstraite = objet concret** (retour AKTE 02 : la fourche avec un point qui marche était « très amateur ») :
  « une décision, ne pas changer le plan » → vrai panneau indicateur Hausgeburt / Klinik, la médecin qui serre
  son porte-documents « راسي قاصح », un grand « 1 », elle regarde la Klinik, secoue la tête, la Klinik est barrée.
  Jamais de schéma nu. **Chaque scène est ANIMÉE** (retour AKTE 02 : « ça doit être animé ! ») : le personnage
  entre en marchant, réagit (se tourne, lève un objet, secoue la tête, tape du pied + poussière), le texte s'écrit
  à la main, puis il repart ; jamais une pose fixe pendant toute la phrase.
- **Textes sur les objets en darija parlante** qui disent l'attitude (« راسي قاصح ») plutôt qu'un mot neutre
  (« PLAN »).
- **Tenue adaptée à la scène** (blouse de ville à l'arrivée, tenue de bloc pour l'accouchement) ; changer de
  plan pour les moments forts (gros plan des visages, nouvel angle).
- **Bloc opératoire / réa : mise en place FIXE** (retour AKTE 03 : « plein de structures qui overlappent ») — lampe
  au centre, poche à gauche, moniteur AU MUR (bras) à droite, table au milieu avec une VRAIE patiente allongée
  (`decor.js` bed2 : corps sous le drap + tête Persona en profil à l'échelle des soignants, jamais une petite tête
  isolée qui ressemble à un bébé), soignants derrière la table, étiquettes toutes dans la bande du haut (y ≈ 470),
  une à la fois. Une même mise en place pour toutes les scènes du bloc ; zooms ≤ ×1,3 qui ne poussent rien dans le
  logo ni dans la colonne des boutons ; rien à moins de 90 px des bords.
- **Personne allongée** (retours AKTE 03 : « la tête et les bras de la femme allongée », « les corps déformés ») :
  JAMAIS une tête Persona pivotée. Dessin dédié (`decor.js` lyingPatient / bed2) : profil tourné vers le plafond
  (front, nez, lèvres, menton, œil fermé + cils), cheveux qui couvrent l'oreille et s'étalent sur l'oreiller, cou
  court → épaule en blouse, drap avec revers, poitrine qui respire, bras posé le long du corps (même peau que le
  visage), tube du respirateur à la bouche. Proportions des personnages Persona (grosse tête).
- **Bras** : jamais de bras croisés en X ni tendus en « nouilles ». Viser les mains à une distance naturelle de
  l'épaule (≈ 90–150 px à l'échelle 1), du BON côté (mesurer avec `Persona.util.rig` : en trois-quarts facing 1,
  handR = côté droit de l'écran). Derrière une table : bras qui pendent, la table cache les mains. Massage
  cardiaque : soignant sur un marchepied, épaules au-dessus de la poitrine, bras tendus vers le bas.
- **Décors COMPLETS, jamais un personnage sur papier vide** (retour AKTE 03 : « plus de détails, refais tout ») :
  `decor.js` room (mur, carrelage, plinthe, sol en perspective) + objets de la pièce. Bloc : carrelage, armoire
  vitrée, lampe, moniteur au mur, poche, chariot d'instruments, bonnets de bloc (scrubCap, suivent la tête).
  Réa : fenêtre à stores, fleurs, rideau sur rail, rampe de gaz O₂/Air/Vac, horloge. Tribunal : boiseries,
  étagère de livres, plaque « Im Namen des Volkes », dossiers, micro, plaque du Senat. Extérieur : ciel, nuages
  qui flottent, arbres, lampadaire, trottoir. Couloir : portes numérotées à hublot, main courante, panneau
  « Gynäkologie → ». Les objets du décor restent hors des étiquettes et de la colonne des boutons.
- **Bulles** (retour AKTE 03 : « la bulle mal faite » = la pointe sortait du coin arrondi) : toujours
  `Motion.bubble` / `m.speech` (`serie/lib/motion.js`) — UN seul tracé, la queue part du BAS de la bulle (jamais
  d'un coin) et vise la tête/la bouche de celui qui parle ; pensée = rectangle arrondi + 3 petits ronds vers la
  tête ; le texte est dans le même nœud ; la bulle jaillit de sa pointe ; « … » = `m.typing` (points qui
  rebondissent). Jamais posée sur un objet ni sur une étiquette.
- **MOTION DESIGN — le décor bouge, rien n'est figé** (retour AKTE 03 : « des animations encore mieux et un décor
  qui bouge ») avec `const m = Motion.of(c)` :
  - *le décor se construit* au début de la scène, en cascade (0,05–0,3 s d'écart) : `m.build(node, t, "drop" |
    "rise" | "left" | "grow" | "growY" | "swing")` — la lampe descend, l'armoire tombe en place, le moniteur
    pousse du mur, le chariot roule, les bâtiments et l'arbre poussent du sol, les cartes tombent ;
  - *il vit ensuite* : `m.pend` / `m.sway` (lampes, panneaux suspendus, plaque, balance, arbre, rideau, fleurs,
    drapeau), `m.dust` (poussière dans un faisceau, bulles dans un liquide), `m.drift` (nuages, oiseau), soleil
    aux rayons qui tournent (`m.rays`), voiture qui passe, passante au fond du couloir (opacité 0,3, sortie
    avant un zoom), plafonniers qui grésillent, voyant qui clignote, `m.alarm` (voile rouge qui pulse) ;
  - *il réagit à l'histoire* : la lampe tremble à l'arrêt cardiaque, tout se fige au décès (amplitude × `live(t)`),
    rayons + petit saut des têtes à la révélation, `m.ripple` sous l'épingle de la carte ;
  - scènes-schémas sur papier : `m.shapes` (petites formes qui dérivent dans les marges) ;
  - caméra : poussée lente continue (×1,00 → ×1,03, `ease: "lin"`) + les zooms sur les mots forts ;
  - transitions entre lieux : `in: "swipe"` / `"swipeR"` (bord oblique + bande jaune, 0,42 s) ; `cut` dans un
    même lieu ; `iris` / `zoom` pour l'intro, la carte, une révélation ;
  - décor posé avec `m.obj(fn, x, y, s)` (coordonnées monde → pivots simples). Avec la dérive de caméra, garder
    tout le décor entre x 110 et 960 (sinon il passe dans le bord rogné) ;
  - contrôle : planche image par image (10 i/s) d'un début de scène + mesure du mouvement (≥ 5 % des pixels
    changent en 0,4 s dans chaque scène).
- **Chambre / lit : vu DE FACE** (`decor.js` : `bedBack` → personne assise dedans → `bedFront`, la couette cache
  les jambes) ; papa à gauche, soignant à droite ; jamais de personne allongée de travers. Extérieur : bâtiments
  au fond (plus petits) + trottoir, personnages devant.
- **Expliquer le médical en image** : coupe anatomique dans une fenêtre sur le corps + loupe reliée (AKTE 02 :
  utérus + bébé en siège tête en haut, qui bouge, cœur qui bat, fantôme de la bonne position) ; la règle sur une
  carte avec une icône.
- **Peine** : une icône par sanction (barreaux, sacoche barrée, billets) + le visage du condamné en grosses
  grimaces animées ; l'argent part VISIBLEMENT du médecin et arrive dans la main des parents.
- **Bébé/patient décédé** évoqué ensuite en ange (ailes + auréole) à côté de l'expert, sans cadre vert.
- **Moteur** `serie/lib/stage.js` : une scène plein écran par idée ; transitions 0,25–0,35 s ; `c.camera([...])` ;
  `c.kick(repère, 0.05–0.08)` sur chaque mot fort ; `c.shake`, `st.vignette` ; `c.hud` = calque fixé à l'écran ;
  `summary: false` pour exclure une scène de l'affiche ; `st.summary(...)` = affiche-résumé + dézoom.
  Cadrage global `view: { s: 1.06, oy: -20, breathe: 0.04 }`. Ancres Persona (`n.out`, `Persona.util.rig`) déjà
  orientées : pour `facing: -1`, main = x + handR[0].
- **Zooms forts** (×1,3 à ×1,7) sur des sujets complets. Jamais un personnage, une bulle, une carte ou un titre
  coupé. Textes importants pendant un zoom → `c.hud`.
- **Parole** : un personnage ne bouge les lèvres (`talk`) que s'il parle vraiment ; une bulle ou un pointeur de
  parole va sur la bouche du BON personnage (retour AKTE 01).
- **Lieu = carte** : dès qu'une ville est nommée, carte de l'Allemagne au trait, Berlin en repère, épingle jaune.
- **Pastilles (chips) allemand + arabe dessous** : l'arabe bien DÉTACHÉ de la pastille et de son ombre (≈ 20 px),
  gras, encre foncée, contour papier (`paint-order: stroke`) ; jamais sur un visage ni une tête (au-dessus des
  têtes) ; rien (personnage, trait, tampon, ✗, billet) ne passe sur une ligne arabe.
- **Arabe** : titres et phrases ≥ 40 px, gras, encre (pas gris), révélés de droite à gauche ; traductions sous les
  pastilles ≥ 26 px gras.
- **Sous-titres karaoké** : étiquette blanche + scotch, Plex Arabic Bold, UNE ligne (≤ 4 mots), mot en cours
  surligné (le surligneur sur le BON mot, celui qu'il dit) ; `capTr: false` quand la traduction est déjà à l'écran.
- **Repères** calés sur les mots (`"b7@الدم"`, `"b21@end"`, `"b4@جملة+0.2"`) ; vérifier qu'aucun ne manque.
- **Sous-titre = UNE ligne, toujours** (AKTE 04 : « ووقفو ليه la transfusion » passait sur deux lignes et cachait une
  citation) : `index.html` d'AKTE 04 rétrécit la ligne (jusqu'à 76 %) si elle dépasse, et un mot latin > 18 lettres
  (« Organisationsverschulden ») à 0,82 em. Contrôle : `node tools/soustitres.mjs videos/<ep>` (zones + débordement).
- **Pastilles du HUD** : bande de papier derrière l'arabe (`kit.chip` d'AKTE 04) — un bord de décor passait dessous.

## Zones Instagram (mesurées sur une capture réelle du Reel publié, iPhone, novembre 2026)

| Zone couverte | Position (px vidéo) | Règle |
|---|---|---|
| Bords rognés | x < 50 et x > 1030 | contenu important entre **x 90 et 990** |
| Barre d'état + flèche retour | y < 250 | rien d'important au-dessus de 250 |
| Boutons j'aime/commentaire/partage | **x > 915, y 980–1650** | aucun personnage, texte ni objet important |
| Pseudo, légende, musique | y > 1650 | rien en dessous de 1630 |

- Logo `@dr.aguilo` : `right: 100px; top: 222px` (AKTE 01 l'avait trop près du bord → rogné après publication).
- Sous-titres centrés, 180–900, `captionBottom: 320` ; l'image finit au-dessus (~1470) ; pendant une scène muette,
  un titre peut aller en bas (y ≈ 1440).
- Chips du HUD à y 440 : rien du décor (fenêtre…) derrière elles.
- Affiche finale : colonnes selon le nombre de scènes (AKTE 02 : 18 cases, 6 colonnes, `side: 92`), grille finie
  avant la carte « commentaire » ; en-tête (ribbon + @dr.aguilo + « AKTE NN+1 · قريبا ») entre x 90 et 990.
- Contrôles obligatoires : `python3 sketch-video/tools/ig_overlay.py capture.png` sur une planche, et
  `node tools/overlapscan.mjs videos/<ep>/index.html 0 <fin> 0.1` (textes qui se recouvrent).

## Son (sons NATURELS seulement, mais qui « attirent » — retour AKTE 04)

- **Bruitages = vrais bruits de la scène** (barreaux, papier, tampon, poches de sang, pas sur linoléum, porte,
  machine à écrire, balance, horloge…). **JAMAIS** de pop, whoosh, ding/chime, buzzer, « reveal », swell, boom,
  souffles de transition (= « sons typiques IA »). ElevenLabs `sound-generation` avec la fin de description d'AKTE 04
  (`son/sons.py` : « Realistic foley recording, close microphone… No music, no whoosh, no synth… »), 4 requêtes en
  parallèle au plus, `duration_seconds` ≥ 0,5. **Contrôle sans oreille** : tous les sons bout à bout passés dans
  Scribe avec `tag_audio_events=true` → refaire tout son où il entend voix, musique ou « whoosh ».
- **« Bien fait, ça doit attirer »** : mixage **STÉRÉO** (voix au centre ; chaque son placé à gauche/droite d'après
  l'image ; les pages qui tournent TRAVERSENT l'image ; ambiances larges) ; accents (tampons, chutes, touches) + 3 dB ;
  chaque son calé sur le geste à l'image. Voix toujours ≥ 9 dB au-dessus du fond dans chaque phrase (mesure d'AKTE 04).
- **Retours en arrière = vrai rembobinage** (demande de l'auteur) : touche de magnétophone qui claque, cassette qui
  rembobine (bande qui siffle), et la MUSIQUE elle-même qui repart à l'envers en accélérant (`REWIND` de
  `son/mixage.py`), touche stop à l'arrivée.
- **Moniteur** : synthétisé (sinus + harmoniques), un bip par battement dessiné (`window.ECG04`), hauteur qui baisse
  quand il s'éteint, bip continu sur la ligne plate puis silence ; le son généré par ElevenLabs n'a pas de bips nets.
  Compteur, horloge, déclics : synthétisés aussi (calés exactement).
- **Musique** ElevenLabs Music (`/v1/music`, `composition_plan`, sections ≥ 3 s) calée sur la frise réelle ; « bonne
  musique de fond » : piano feutré + violoncelle + cordes graves douces (AKTE 04), sans percussions ni effets ;
  ≈ −23 dBFS, −7 dB sous la voix, SILENCE complet à la mort. La RECOMPOSER à chaque changement de durée. Formats :
  `mp3_44100_128` (le 192 kb/s exige un abonnement supérieur).
- Mixage (`son/mixage.py` d'AKTE 04) → loudnorm deux passes −14 LUFS, crête −1,5 dB ; remuxer sur la vidéo rendue
  (`-c:v copy`), AAC 256 kb/s stéréo.

## Couverture Instagram (demande de l'auteur, AKTE 04)

- Une image À PART (pas dans la vidéo : l'accroche doit rester la 1re seconde), 1080 × 1920, importée dans Instagram
  (« Modifier la couverture » → « Ajouter depuis la pellicule ») : `cover.html` + `node videos/<ep>/cover.mjs`.
- Peu d'écriture : le titre de l'épisode en très grand (surligneur jaune), UNE accroche courte en darija dans SES
  mots (AKTE 04 : « مريض مات… / لا حبس، لا غرامة »), « AKTE NN ». Une image qui raconte l'histoire d'un coup d'œil
  (AKTE 04 : la jeune médecin épuisée sous deux poches identiques « 0 ≠ A »), mêmes personnages et dessins que
  l'épisode, halo jaune. Tout l'important dans le recadrage 3:4 de la grille du profil (y 240–1680) : le vérifier.

## Vérité

- Approximation dans l'enregistrement (date, pays, médicament, durée) → corriger à l'écran ou retirer le mot, et le
  dire à l'auteur. Ne jamais montrer une peine non prononcée ; dire si le jugement est définitif.
- `instagram.md` : Quellen + Az., « Namen anonymisiert · Szenen nachgestellt · Keine Rechtsberatung ».

## Avant de livrer (checklist)

- [ ] Script compris de bout en bout (pourquoi / qui / où) ; transcription relue ; mots incertains signalés.
- [ ] Aucune scène ni phrase supprimée sans son accord ; mots inutiles coupés ; rythme rapide, pauses seulement
      aux changements de contexte.
- [ ] Accroche travaillée avec la sanction ; intro « Yassine » + photo + j'aime/abonne ; pas de question au milieu.
- [ ] Personnages nouveaux et vivants, aucun chevauchement de corps, aucune animation amateur ; le décès montré.
- [ ] Planche avec maquette Instagram + `overlapscan` : rien sous les zones rouges, aucun texte arabe recouvert.
- [ ] Sous-titres = ses mots, une ligne, dans les zones (`tools/soustitres.mjs`) ; repères recalés (`reperes_voix.py`).
- [ ] Accroche à ×1,1 ; décès avec moniteur (ralentit, ligne plate, bip continu) et silence.
- [ ] Sons naturels seulement (contrôle Scribe), stéréo, rembobinage aux retours en arrière ; musique recomposée sur
      la durée finale ; voix ≥ 9 dB au-dessus du fond ; −14 LUFS.
- [ ] `instagram.md` (darija, ses mots, pas d'arabe standard) + couverture livrés avec la vidéo ; `SERIE.md` à jour ;
      photo, voix et clé hors de git.

## Clé ElevenLabs

Fournie par l'auteur : la garder hors du dépôt (scratchpad, chmod 600), ne jamais la committer ni l'afficher.
**Ne la supprimer que lorsque l'auteur le dit** (consigne explicite), puis lui rappeler de la régénérer.
