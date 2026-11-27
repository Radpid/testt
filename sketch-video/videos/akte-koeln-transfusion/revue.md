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
