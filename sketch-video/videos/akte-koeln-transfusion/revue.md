# AKTE 04 « 63 ساعة » — revue visuelle (minutage provisoire)

Revue indépendante du 27.11.2026, faite sur les captures (rien n'a été écrit par moi avant cette étape).
Contrôles de départ : errcheck toutes les 3 s (aucune erreur) · planches 2 images par beat, normales et `--ig`
(`out/planches/revue1/`) · overlapscan 0 → 99 s · mouvement (tout ≥ 3 %) · images en grand des instants suspects,
avec les zones Instagram (x 90 / 990, y 250 / 1470, colonne des boutons x > 915, y 980–1650).
Contrôles de fin : mêmes outils, planches finales dans `out/planches/revue/` (normales et `--ig`).

Gravité : 1 erreur, scène vide ou incompréhensible · 2 vérité · 3 zones Instagram · 4 chevauchements ·
5 personnages · 6 décor incomplet · 7 scène figée · 8 lisibilité · 9 dispositif / différence avec la saison.

## Défauts trouvés

| # | scène | instant (s) | défaut | gravité | correction | état |
|---|---|---|---|---|---|---|
| 1 | 11–12 | 43,9 → 51,3 | Avec la poussée de caméra, l'horloge (et « ≈ 10 min », l'image des « 10 دقايق ») sort à moitié par le bord gauche (x 10–60). | 3 | Chambre (mise en place fixe, scènes 11–13) : horloge x 165 → 240 ; « ≈ 10 min » suit (x 307). | corrigé (horloge x ≥ 98) |
| 2 | 11–12 | 43,5 → 51,3 | Son dos (blouse) dans la colonne des boutons : x 943 au début de la scène 11, 914–923 ensuite. | 3 | Caméra scène 11 : cx 510 → 545 au départ, 560 → 572 à la fin ; scène 12 : palier cx 555 → 562. | corrigé (x ≤ 912) |
| 3 | 14 | 55,7 → 57,2 | Pendant le zoom de b17 (×1,1), la porte « Verwaltung » et sa plaque sortent par la droite (x 830–1020, plaque coupée). | 3 | Porte x 700 → 600, plaque 775 → 675, petit cadre 520 → 470 ; cible du zoom cx 450 → 490. | corrigé (porte x ≤ 900, la lumière de la porte arrive toujours à ses pieds) |
| 4 | 25 | 92,0 → 93,3 | Pendant le zoom final, le haut de la grande poche passe dans la zone y < 250, sous la barre de progression. | 3 | Cible du zoom final cy 960 → 815 ; tableau des pages x 700 → 680. | corrigé (haut de la poche y ≈ 260 avec le dernier « kick ») |
| 5 | 21 | 80,1 → 82,1 | Le pied de la lampe de bureau sort par le bord gauche (x 22–90). | 3 | Lampe (et sa poussière) x 150 → 200. | corrigé (pied x ≥ 94 ; l'abat-jour reste au-dessus de l'étiquette du dossier) |
| 6 | 17 | 64,7 → 68,0 | Elle (au banc des accusés) collée au bord gauche (x ≈ 66–82). En la recentrant, la chaise de l'expert entrait dans la colonne des boutons : la salle est trop large pour une poussée ×1,03. | 3 | Caméra : travelling cx 538 → 552 sans poussée (s 1) ; l'expert, sa chaise et son dossier 805 → 790. | corrigé (elle x ≥ 94, chaise x ≤ 910, à 65,0 / 66,5 / 67,95 s) |
| 7 | 8 | 35,3 → 36,4 | Quand elle tâte sa poche, son coude sort dans la marge (x ≈ 67). | 3 | Elle s'arrête à x 255 au lieu de 235. | corrigé |
| 8 | 7 | 28,6 → 29,8 | La citation tapée passe sur ses chaussures (« allein« ») et sur les plinthes sombres des portes. | 4 | Caméra cy 920 → 905 et, dans cette scène seulement, bande des citations 40 px plus bas (`A.quote(…, { dy: 40 })`). cy 945 a été essayé : le voyant de la porte 2 passait alors sous « كثر من 12 ساعة ». | corrigé |
| 9 | 7, 12, 15, 16, 17, 18, 19 | citations | Les traits du décor (sol, plinthes, façade de la sellette, piètement du fauteuil) traversent les lettres des citations : les mots semblent soulignés (« 1_Tagessatz_≈_1_Tag… »). | 4 / 8 | Bande de papier (opacité 0,9, mesurée une fois les polices chargées) derrière l'allemand et l'arabe de TOUTES les citations : `X.aides.strip`, appelée dans `quote`. | corrigé |
| 10 | 1 | 1,1 → 3,6 | La corniche du tribunal traverse la ligne arabe tapée « المحكمة الابتدائية ديال Köln ». | 4 / 8 | La même bande de papier sous la ligne allemande et la ligne arabe. | corrigé |
| 11 | 15 | 61,4 → 62,8 | Le coin du store touche « ورقة ماشي صحيحة » (arabe de la pastille). | 4 | Store et plante 28 px plus bas (BY 540 → 568). | corrigé |
| 12 | 10 | 40,1 → 43,5 | Sa tête en gros plan, seule, cou coupé net, flotte sur le papier. | 5 / 6 | Nouveau dessin dédié `D.bust04` (decor-3.js) : buste en blouse ouverte, haut gris, badge jaune vierge, posé par-dessus le bas du cou (`A.phC(…, bust)`) ; tête x 240 → 262, y 1085 → 1060 pour que le buste reste dans le cadre et au-dessus des citations. | corrigé |
| 13 | 23 | 85,5 → 88,2 | Même défaut pour la tête de « toi ». | 5 / 6 | Même buste ; la tête est posée AVANT le tube, qui passe devant le buste quand il verse les gouttes. | corrigé |
| 14 | 8 | 35,0 → 36,9 | Sous-titre : sous « Blutführerschein », la traduction « « رخصة » ديال الدم » s'affiche dans le désordre (le moteur met la traduction dans un bloc gauche-à-droite). | 8 | glossaire-episode.js : une marque droite-à-gauche invisible (U+200F) à chaque bout ; les lettres sont inchangées. | corrigé |
| 15 | 3 (intro) | 7,9 → 17,2 | Le tableau de garde déborde (cadre x 55–1010) ; aimants et feutre du bord droit dans la colonne des boutons. | 3 (décor) | — | reste : décor sans information ; la fiche, la photo, « Yassine », @dr.aguilo, j'aime et s'abonner sont entre x 200 et 880. Réduire le tableau changerait toute l'intro. |
| 16 | 7 | 28,4 → 29,8 | Le bas de la porte 3 dans la colonne des boutons (x ≈ 950). | 3 (décor) | — | reste : décor ; le personnage, l'horloge et les textes sont dans le cadre. |
| 17 | 15 | 59,3 → 62,8 | Les tiroirs du bureau dans la colonne des boutons (x ≈ 990) ; le store frôle le bord gauche (x ≈ 55). | 3 (décor) | — | reste : le bureau occupe toute la largeur ; elle, le fauteuil, la manche, la feuille et les textes sont dans le cadre. |
| 18 | 2, 17 | — | L'extrémité droite du banc dans la colonne des boutons (x ≈ 930). | 3 (décor) | — | reste (décor). |
| 19 | 25 | 90,5 → 93,3 | La tubulure descend derrière le sous-titre jusqu'en bas de l'image. | 3 (décor) | — | reste : voulu (le sang continue de descendre), aucun texte. |
| 20 | 22 | 82,1 → 85,5 | Les liens en pointillés jaunes passent devant le buste de « toi ». | 4 | — | reste : ce sont les annotations demandées par le storyboard (bracelet → document → poche). |
| 21 | 12 | 49,8 → 51,3 | Mouvement 4,0 % dans la 2e moitié de b15 (le storyboard vise ≥ 5 %). | 7 | — | reste : la scène bouge (haut-le-cœur, gouttes, poussée de caméra) ; c'est le moment où l'on arrête le sang. |
| 22 | toutes | — | overlapscan : chevauchements de passage seulement (transitions, tampons qui claquent, compteur qui vole et son fondu croisé, cases de l'affiche ; à 64,8 s, pendant le balayage 16 → 17, la plaque « § » passe sous la pastille de la scène 16). | 4 | — | reste (0,1 à 0,3 s, rien de lisible n'est caché à l'arrêt). |

Bilan : 22 points relevés, 14 corrigés (tous ceux de gravité 1 à 7 qui touchent un personnage, un texte ou un objet
de l'histoire), 8 restants (décor en bord de cadre, annotations voulues, passages).
Rien de gravité 1 (erreur, scène vide) ni 2 (vérité) n'a été trouvé à cette étape ; la relecture des textes contre
scenario.md et recherche.md est faite dans la contre-revue.

## Fichiers touchés
- story.js : `phC(…, bust)` (buste sous une tête en gros plan) ; `strip` (bande de papier) dans `quote` et dans X.aides ;
  `quote(…, { dy })` ; chambre : horloge x 240 ; salle : expert x 790.
- scenes-1.js (scène 1), scenes-2.js (scènes 7, 8, 10, 11, 12), scenes-3.js (14, 15, 17), scenes-4.js (21, 23, 25).
- decor-3.js : `D.bust04` (bloc « ajouts revue visuelle », essayé seul avec essai_decor).
- glossaire-episode.js : Blutführerschein (marques U+200F).

---

# Contre-revue (débuts de scène, moments forts, textes) — 27.11.2026

Contrôles faits et regardés : la première seconde de CHAQUE scène image par image (pas 0,2 s, `out/planches/debuts/`) ;
l'accroche sur toute sa durée (0 → 3,6 s, pas 0,2), le rembobinage (7,0 → 7,93), l'intro (8 → 17), la carte (17,3 → 19,8),
la loupe et l'arrêt du sang (45,9 → 51,2), la mort et la glissade (51,4 → 59,2), la balance (68,1 → 80), la règle (82,2 → 90,4),
le sang qui ne revient pas et l'affiche (90,5 → 98,8) (`out/planches/forts1/`, `forts2/`, `forts3/`) ; relecture de tous les
textes à l'écran contre scenario.md (« Mots allemands à l'écran », « Ce qui n'est PAS dit mais montré », « Fin ») et des
citations contre recherche.md (S1, numéros de paragraphe) ; glossaire contre les mots allemands DITS.

| # | scène | instant (s) | défaut | gravité | correction | état |
|---|---|---|---|---|---|---|
| 23 | 2 | 5,54 → 5,98 | La ligne « »Die Angeklagte trägt die Kosten des Verfahrens« — laut Urteil » (pour que « zéro » ne veuille pas dire « rien à payer », scenario.md) ne restait que 0,45 s : elle n'avait pas fini de se taper quand elle s'effaçait. | 2 | Posée à `b2@لا` + 0,6 (après le coup du tampon), effacée à `b3@نرجعو` − 0,15 (avant que le tampon s'envole) : ≈ 1,6 s lisible, plus aucun chevauchement. | corrigé |
| 24 | 12 | 50,8 → 51,3 | « »schwerst vorgeschädigt« (Leberzirrhose, Anämie) » (garde-fou : « pour ne pas faire croire qu'un tiers de poche tue toujours ») ne restait lisible que 0,5 s avant le balayage. | 2 | Posée dès `b15@كيتقيا` + 0,15 (il vomit) : ≈ 1,6 s. | corrigé |
| 25 | 17 | 67,3 → 68,0 | « 1 Tagessatz ≈ 1 Tag Nettoeinkommen » lisible 0,4 s. | 8 | Posée à `b21@7` + 0,1 (« 90 ») : ≈ 0,9 s. | corrigé (court par nature : la scène finit sur « Tagessätze ») |
| 26 | 15 | 62,1 → 62,8 | La citation « »ihr organisatorisches Versagen … überzubürden« » lisible 0,7 s. | 8 | Posée à `b19@وهادشي` au lieu de `b19@ماشي` (+ 0,4 s). | corrigé |
| 27 | 2 | 3,66 | 1re image de la scène (entrée `cut`) : elle seule devant un mur vide ; banc, fenêtre et juges arrivent 0,2 s plus tard. | 1 | La cascade de la salle part 0,2 s avant la coupe (`at: "b2-0.2"`). | corrigé |
| 28 | 10 | 40,11 | 1re image (entrée `cut`) : page vide, la feuille encore hors champ. | 1 | Feuille, barre, poches et tête partent 0,1–0,15 s avant la coupe. | corrigé |
| 29 | 21 | 80,13 | 1re image (entrée `cut`) : mur et banc vides, dossier et lampe absents. | 1 | Dossier et lampe partent 0,2 / 0,08 s avant la coupe. | corrigé |
| 30 | 2 | 7,6 → 8,3 | Au rembobinage, les juges « descendent » derrière le banc : leurs jambes sortent dessous et restent visibles jusqu'au balayage de l'intro. | 5 | Ils s'effacent pendant qu'ils descendent. | corrigé |
| 31 | 4 | 17,6 → 19,8 | La flèche en pointillés de l'épingle (Köln) à la cathédrale passe au-dessus de Berlin et la cathédrale couvre l'est de la carte. | 9 | — | reste : voulu par le storyboard (carte → Rhin → cathédrale) ; Köln, Berlin et l'épingle restent lisibles. |
| 32 | 11 | 43,5 → 44,0 | La poche (rouge) est déjà au crochet dans les premières images de la scène 11 (le niveau baisse ensuite). | 9 | — | reste : la scène commence quand elle l'accroche ; aucun texte ne dit le contraire. |
| 33 | 13 | 51,7 → 52,1 | L'onglet du jour se retape « So · 31.07.2011 » pendant que « 13:37 » se tape : deux frappes en même temps. | 8 | — | reste : storyboard § 3.2 (onglet à `b16@الأحد`) ; les deux restent lisibles. |

Textes : toutes les pastilles sont celles du tableau « Mots allemands à l'écran » (lettre pour lettre) ou de l'annexe B/C du
storyboard ; toutes les citations « laut Urteil » sont verbatim dans recherche.md (S1 Rn. 12, 15, 16, 21, 22, 28, 29, 34,
41, 50, 55, Tenor) ; « 1/3 » = « etwa 1/3 » (S1 Rn. 32) ; dates : Mi 16.05.2012, Sa 30.07.2011, So 31.07.2011 (jours de la
semaine justes), « seit 15.10.2010 », « 13:37 », « gegen 21.50 Uhr ». Mentions : `laut Urteil` dans les scènes 2, 7, 8, 10,
12, 14, 15, 16, 18, 19, 20 ; `Rekonstruktion` / « مشهد تمثيلي » dans 9, 14 (dès b18), 15 ; statut
`Rechtskraft nicht veröffentlicht` dans 21 (jamais « rechtskräftig ») ; aucun nom de personne ni d'hôpital (fiche vierge,
badge vierge) ; « Yassine » sans « Dr. ». Sous-titres : glossaire-episode.js + serie/glossaire.js couvrent tous les mots
allemands dits (Köln, Assistenzärztin, Blutführerschein, Tagessätze, Organisationsverschulden, genug bestraft,
Bedside-Test), vérifié sur les planches (traduction sous le mot).

Bilan de la contre-revue : 11 points, 8 corrigés, 3 restants (voulus ou sans gravité).
Bilan des deux passes : 33 points, 22 corrigés, 11 restants (aucun de gravité 1 à 5 sur un personnage, un texte ou une
information de l'histoire).

Planches finales (regardées) : `out/planches/finales/planche_01.png … planche_06.png` et `planche_01_ig.png … planche_06_ig.png`.
Contrôles finaux : errcheck toutes les 3 s (SV.error=undefined) ; overlapscan 0 → 99 s : seulement des chevauchements de passage
(transitions, tampons qui claquent, compteur qui vole, cases de l'affiche) ; mouvement : « tout bouge (≥ 3 %) ».

# État de l'épisode et suite

## Ce qui est prêt
- Les 25 scènes + l'affiche, sur le minutage PROVISOIRE (timings.js, 98,9 s avec l'affiche) : décors complets qui se
  construisent et vivent, personnages vivants, aucun texte recouvert à l'arrêt, zones Instagram respectées pour tout ce qui
  porte une information (restent seulement des bords de décor, voir le tableau).
- Tous les repères sont des « bN@mot » (ou des rangs pour les nombres) : ils suivront la vraie voix.
- `instagram.md` : BROUILLON de description (phrases darija reprises du scénario, le reste en [FR] à dire avec tes mots,
  sources avec Az., réserves de vérité en commentaire).

## Quand la voix arrivera
1. Montage de la voix sur le modèle de `videos/akte-koeln-schweigen/montage_voix.py` (Scribe, Audio Isolation, FIX darija,
   coupes par phrase, `atempo` 1,3, pauses : `SCENE_START` = i1, b4, b11, b13, b16, b21, b26 ; `EXTRA` b16 ≈ 3,2 s pour
   la scène muette), puis remplacer `beats.js` (si l'auteur a changé un mot) et `timings.js`.
2. Revérifier les repères fragiles (storyboard § 6, « Repères qui dépendent d'un choix de l'auteur ») :
   `b1@مذنبة`, `b23@مذنبة`, `b1@صفر`, `b2@غرامة`, `b2@لا`, `b4@5` (si « في 2012 » est coupé), `b4@سنات`, `b19@تسني`,
   `b28@تسني`, `b11@فدقة`, `b12@عامرة` / `b12@بالمعلومات`, `b17@انهيار`, `b19@وخلاتها`, `b20@شهور`, `b26@السمية` ; et les
   rangs des nombres (`b6@2`, `b7@7`, `b8@6`, `b9@6`, `b13@6`, `b14@2`, `b15@3`, `b21@7`, `b4@5`, `b28@1`, `b29@7`).
   Outil : `node tools/cuetimes.mjs …` (aucun « absent ») puis `errcheck`.
3. Durée de la scène muette : `b16@end` → `b16@end + 1,9` (scène 13 : « المريض ما عاشش » lisible ≥ 1,2 s), puis la glissade
   de la scène 14 jusqu'à b17. Si l'`EXTRA` change, la glissade (`b16@end + 2,3`) et la pastille (`+ 3,2`) sont des décalages
   FIXES à recaler.
4. Décalages fixes à revérifier : scène 15, la manche attend b19 + 0,35 ; scène 18, la pastille `Organisationsverschulden`
   attend `b22@Organisationsverschulden` + 0,42 (vol du compteur) ; scène 2, la ligne des frais (`b2@لا` + 0,6 → `b3@نرجعو`
   − 0,15) ; les cascades qui partent avant une coupe (scènes 2, 10, 21 : − 0,1 à − 0,2 s).
5. Scènes courtes à revoir en premier : 16 (≈ 1,9 s), 21 (≈ 2,0 s), 5 (≈ 2,0 s) ; storyboard R13 dit quoi alléger si elles
   descendent sous 1,6 s.
6. Son : reprendre `son/plan_son.md` (son en-tête liste ce qui doit être refait après le contrôle des ressemblances : scènes
   8, 16, 21) ; bruitages calés sur les mêmes repères ; musique (piano seul) recomposée sur la durée finale.
7. Refaire une planche `--ig` + overlapscan + mouvement après le montage, puis le rendu.

## Points faibles qui restent (du plus visible au moins visible)
1. Scène 22 : les trois liens en pointillés jaunes passent devant le buste de « toi » (annotations voulues ; à revoir si
   l'auteur trouve l'image chargée).
2. Intro (scène 3) : le cadre du tableau de garde déborde (x 55–1010) ; aimants et feutre du bord droit dans la colonne des
   boutons (rien d'écrit).
3. Bords de décor dans la colonne des boutons ou la marge : porte 3 (scène 7), tiroirs du bureau (15), bout du banc (2, 17).
4. Scène 17 : la carte du parquet couvre le bas de la table des juges et une partie de l'expert pendant 1,5 s (c'est le sujet
   de la scène ; l'expert reste visible).
5. Chips sur un décor : l'arabe de « Blutführerschein » (scène 8) touche le haut du tableau ; lisible grâce au contour papier.
6. Scène 12 : 4 % de mouvement dans la 2e moitié de b15 (seuil du storyboard : 5 %).
7. À faire valider par l'auteur (storyboard annexe B) : les chaînes arabes nouvelles (« مصاريف المحاكمة عليها », « كان مريض
   بزاف من قبل », « المسؤولية », « حتى فالاستعجال », « درس من هاد القصة », etc.) et la tête de l'héroïne (R1).

## Revue de Claude (passe finale, 27.11.2026)

Planches complètes et avec zones Instagram regardées une à une, scène muette image par image (52,3 → 56,2 s),
travelling du tableau de service image par image, sous-titres mesurés mot par mot (257 mots), overlapscan, mouvement.

| Défaut | Correction |
|---|---|
| b22 : « Organisationsverschulden » dans le sous-titre allait de x 103 à 936 à son apparition (bord rogné + colonne des boutons) | `index.html` : un mot latin de plus de 18 lettres est rétréci (0,82 em) → x 206–895 au pire moment |
| Scène 7 : le bord haut du tableau de service passait sur le bas de « الإدارة ديال السبيطار » (et frôlait « سيمانة ديال 63 ساعة ») | `story.js`, `kit.chip` : bande de papier derrière l'arabe de toute pastille du HUD (même principe que les citations) |

Vérifié sans correction : la scène muette (pas de moniteur ni de famille, voulu par le storyboard : rien ne dit qu'ils
étaient là ; le temps s'arrête, gris, « المريض ما عاشش ») ; les chevauchements restants de l'overlapscan sont des
passages (volets, compteurs qui roulent, cases de l'affiche) ; mouvement ≥ 3,6 % partout ; aucune erreur de page.

## Voix de l'auteur (28.11.2026)

Enregistrement principal (5 min 07, avec reprises) + reprise de 36 s (accroche, b20, b22). ElevenLabs : Voice Isolator sur
les deux, Scribe v2 + Scribe v1 (v1 garde mieux la darija ; les deux comparés sur les mots douteux). Montage :
`montage_voix.py` (une phrase par beat, meilleure prise, reprise et intro commune égalisées sur l'enregistrement,
×1,3, mastering −15 LUFS) → `voice.wav`, `beats.js`, `timings.js` (104,4 s de voix ; silence de 3,3 s après b16).

Retiré (avec l'accord de l'auteur : « découpe comme tu veux ») : l'ancienne accroche « كان خاصها تدخل الحبس، ولكن خرجت
براءة » (faux : coupable, sans peine ; remplacée par sa reprise) ; « والطبيبة كملات الخدمة ديالها normal » (contraire au
jugement ; remplacée par sa reprise « ما بقاتش قادرة تخدم، دوزات شهور وهي كتداوى ») ; la redite de b10 (« اللي هي la
formation ديال كيفاش دير la transfusion ديال الدم ») ; « المهم » ; « يعني » (b29) ; les faux départs.

Repères : 47 repères qui visaient des mots du script recalés sur ses mots (`scenes-*.js`) ; aucun repère manquant.
Sous-titres : une seule ligne garantie (`index.html` : rétrécit jusqu'à 76 % si besoin ; b10 et b15 à 92 %).
Mots à faire confirmer à l'auteur : b13 « مع العشرة إلا قسمين، علقات » (Scribe : « العشرة القسمين، لقاتو ») ;
b26 « حدا المريض » (Scribe entend « هذا/هاد ») ; b7 « 24 heures » ou « 24 ساعة ».

## Version 2 (28.11.2026, retours de l'auteur)

- Mort : moniteur au mur de la chambre (D.monitor04, scènes 11–13) ; battements partagés image/son (window.ECG04) : 77/min la nuit,
  s'emballe à « كيتقيا », 71/min le dimanche puis deux battements lents et faibles, LIGNE PLATE (cadre rouge, FC 0), bip continu ;
  « المريض ما عاشش » et le gris arrivent sur la ligne plate ; silence porté à 3,9 s (EXTRA b16 5,0) ; scène 14 décalée de 0,6 s.
- Voix : accroche (b1–b2) à ×1,1, le reste ×1,3 ; mastering plus chaud et présent (montage_voix.py, CH v2).
- Son : mixage STÉRÉO (sons placés selon l'image, pages qui traversent, ambiances larges), accents + 3 dB, musique recomposée sur
  le nouveau minutage (piano, violoncelle, cordes douces) à −23 dBFS ; voix ≥ 9 dB au-dessus du fond dans chaque phrase.
- Voice Changer (clone « yassine ») essayé sur 25 s : abîme des mots de darija (« مريض مات » → « بريك بات ») ; non utilisé, à l'auteur
  de juger à l'oreille (out/AKTE04_voix_comparaison_1-2-3.m4a).
