# AKTE 07 « الگروپ » — revue visuelle (28.11.2026)

Revue faite sur le minutage PROVISOIRE (timings.js, 69,3 s + affiche). Je n'ai écrit aucune des scènes.
Gravité : 1 erreur / scène vide · 2 vérité · 3 zones Instagram · 4 chevauchement · 5 personnages · 6 décor vide ·
7 scène figée · 8 lisibilité · 9 dispositif signature / ressemblance.

## 1. Première revue (tâche 1)

**Contrôles faits.**
- `errcheck` toutes les 1,5 s de 0,2 à 76 s : aucune erreur (`SV.error=undefined`).
- Planches complètes, 2 images par beat : `out/planches/revue1/planche_01…08.png`, puis la même chose avec `--ig`.
- Planches denses, une image toutes les 0,6 s (116 images) : `out/planches/revue1/dense/planche_01…10.png`.
- Gros plans à pleine résolution, recadrés : en-tête, somme, ELLE et le ticket, haut des pièces, certificat, post-it, aimants (série
  d'images), billet, carte Plans, marche de LUI, appel vidéo, pastilles, recherche « 0 / 0 », règles, page du jugement, affiche.
- Taille réelle à l'écran de toutes les lignes arabes (sonde dans la page) : toutes les traductions font au moins 26 px, en gras,
  à l'encre foncée ; les titres et les phrases de règle font de 40 à 52 px.
- `overlapscan` de 0 à 76 s ; `mouvement` ; `soustitres` (194 mots vérifiés, b9 rétréci à 60 %, tout est dans les zones).
- Textes de l'écran comparés au tableau « Mots allemands à l'écran » et à « Ce qui n'est PAS dit mais montré » du scénario :
  tous figurent mot pour mot (dont « حكم ابتدائي », « الاستئناف ممكن », « ما اعترفات بوالو », « خرج من الگروپ », « دعوى »,
  « طلب 2000 أورو », « مريض حتى للإثنين », « قانون حماية المعطيات », « § 5 EFZG »). Aucun nom de personne ni d'hôpital.

**Défauts trouvés.**

| # | scène | instant | défaut | gravité | correction | état |
|---|---|---|---|---|---|---|
| 1 | 6 canapé | `b5@مشى` → `b5@وكتب` | le bord bas du certificat jaune mord sur les boucles de LUI | 4 | certificat 24 px plus haut (CY 690 → 666) | corrigé, vu |
| 2 | 6 canapé | `b5@وكتب` → `b5@بلي` | la bulle « … » touche sa tête | 4 | bulle 18 px à droite (588 → 606), pointe et points suivent | corrigé, vu |
| 3 | 6 canapé | zoom de `b5@وكتب` | à ×1,12 (cx 545) le rideau gauche passe à x 38 à l'écran, dans le bord rogné | 3 | zoom ×1,10 centré sur cx 535 : rideau à x 58 | corrigé |
| 4 | 7 salle | `b6@حتى` → fin | la 2e marque de colère cache le micro « laut Urteil » du post-it (on lisait « ut Urteil ») | 4 | marque en (668, 866), entre le post-it et la bulle | corrigé, vu |
| 5 | 7 salle | `b6@كتبات` → fin | la bulle « … » touche ses cheveux et sa queue les traverse | 4 | bulle en (640, 896), pointe (614, 1002) à côté des cheveux | corrigé, vu |
| 6 | 12 lettre | `b12@كتباتش` | posé, le coin droit du tampon « erfolglos » touche l'avatar d'ELLE | 4 | tampon 25 px à gauche (590 → 565) | corrigé, vu (pendant la frappe, 0,28 s, le cadre agrandi passe encore sur l'avatar : c'est le geste du tampon) |
| 7 | 15 appel | `b14@الگروپ` → `b14@end` | ELLE « explique » avec un bras cassé : coude levé, avant-bras qui pend dessous | 5 | bras gauche [−35, −125] : coude en bas, avant-bras qui monte, main à hauteur d'épaule | corrigé, vu |
| 8 | 15–16 appel | `b14@70%` → `b15@و30%` | la traduction « 70% privé · 30% خدمة » s'affichait « خدمة privé · 30% 70% » (algorithme bidi) : 30 % semblait collé à « privé » | 8 | une marque RLM invisible après « privé » : on lit 70% privé · 30% خدمة. Les lettres ne changent pas | corrigé, vu |
| 9 | 16 appel | `b15@و30%` → fin | « 30 % » (40 px) sort de la part jaune ; « mindestens » colle à l'icône Dienst | 4 · 8 | D.camembert : « 30 % » à 34 px, déplacé vers le centre de la part | corrigé, vu |
| 10 | 21 page | toute la scène | composition petite et haute : 170 px de papier vide au-dessus de l'étiquette ; la citation du § 8 en 17 px, illisible | 6 · 8 | téléphone et page 60–65 px plus bas, page ×1,08, citation 19 px (≈ 21 px à l'écran) ; la page reste avant la colonne des boutons (x ≤ 911) | corrigé, vu |
| 11 | 4 intro | `i1` → `i3` | le bas de l'écran du téléphone (y 1140 → 1380) reste vide 5,5 s ; `mouvement` dit « FIGÉ » | 6 · 7 | — | non corrigé : c'est le socle de l'intro (cœur et bouton à `i3`, storyboard § 4 sc. 4), l'intro est calme par nature |
| 12 | 9 diagnostics | `b8` → `b8@diagnostics` (1,3 s) | au-dessus du brouillon, le haut du fil (y 600 → 900) n'a que le séparateur de date | 6 | — | non corrigé : c'est la forme du fil (une seule bulle) ; l'accolade se trace, puis la pastille, l'avatar de LUI et la carte « source » remplissent ce haut |
| 13 | 17 jugement | `b16` → `b16@ممنوع` (≈ 1 s) | sous la ligne d'expéditeur, le fil est vide en attendant la 1re bulle | 6 | — | non corrigé : l'expéditeur et le dossier se tapent pendant ce temps ; la bulle arrive sur « ممنوع » |
| 14 | 15 appel | `b14` → `b14@70%` | bande des pastilles vide 1,1 s | 9 | — | non corrigé (déjà signalé par l'étape d'avant : c'est la place des pastilles) |
| 15 | 14 départ | marche | une feuille de la plante du carton touche le bas de sa barbe | 5 (léger) | — | non corrigé : le contact est de quelques pixels, le carton a déjà été descendu de 12 px |
| 16 | 10 | b10 | le sous-titre affiche « [FR] Autrement dit, juste un gaz coincé. » | 8 | — | non corrigé : `beats.js` est figé ; la voix de l'auteur remplacera cette phrase et le sous-titre |
| 17 | 10 | `b10` | la traduction dans la loupe (`TRAD_B10`) est la proposition non garantie du scénario | 2 | — | à faire valider par l'auteur (ses mots de b10) |

**Faux positifs d'`overlapscan`** (vus sur les images) : les entrées de scène (T-NOTIF, plongée, montée, glissement : la scène
d'avant reste visible sous la nouvelle, découpée ou cachée par l'écran opaque) ; les textes découpés (lignes du fil sous la
bande, ticket dans sa fente sous la bulle « à payer ») ; les boîtes de police qui se touchent sans que les lettres se touchent
(titre et sous-titre de l'en-tête, deux lignes de la loupe, « 70 % » / « privat », deux lignes de la question finale) ; la bulle
qui vole au-dessus du « 8 » de la page (0,3 s) ; les numéros de l'affiche posés sur les vignettes.

**Mouvement.** Toutes les scènes de récit sont au-dessus de 3 % (b4 3,4 %, b7 3,4 %, b10 3,7 %, b16 3,8 % au plus bas) ;
seule l'intro (i1–i3) est sous le seuil, voulu. Le silence de la scène 11 est voulu aussi (il tombe dans b10/b11, au-dessus du seuil).

**Planches finales de la tâche 1** : `out/planches/revue1-fin/planche_01…08.png` et `planche_01…08_ig.png`.

## 2. Contre-revue (tâche 2)

**Contrôles faits.**
- Première seconde de CHAQUE scène, image par image (0 / 0,2 / 0,4 / 0,6 / 0,8 / 1,0 s après le début ; 22 débuts) :
  `out/planches/contre/debuts/planche_01…11.png`.
- Moments forts image par image : l'accroche ENTIÈRE (0 → 8,9 s, toutes les 0,25 s : `contre/accroche/`), l'entrée de l'intro,
  le silence (39,6 → 41,05 s, toutes les 0,1 s : `contre/silence/`), la carte « Plans » (`contre/carte/`), le coffre de la règle 2
  (`contre/coffre/`), la scène 21 et l'affiche avec les zones Instagram (`contre/affiche/planche_01_ig.png`) ; en-tête et carte
  « commentaire » de l'affiche en gros plan.
- Tous les textes affichés (217 chaînes, relevées dans la page toutes les 0,25 s) comparés au scénario, à recherche.md et au
  storyboard : chiffres (1.000,00 EUR, 2.000 €, 549 €, 78 %, 70 % / 30 %, 7, 9), dates (29.05, 31.05, 02.06, 25.07, 10.09,
  31.12.2025, 22.05.2026, Juli 2026), dossier « 1 Ca 1741/25 », « Rn. 8 » (le message est cité au Rn. 8 du jugement : F13–F17),
  mentions (« laut Urteil », « laut Urteil (Auszug der Nachricht) », « laut Gericht », « laut ihrer Nachricht »,
  « Rekonstruktion », « Stand Juli 2026: nicht rechtskräftig », « erste Instanz », « Berufung möglich · LAG Köln »,
  « Keine Rechtsberatung »). Toutes les lignes arabes sont lettre pour lettre dans scenario.md ou storyboard.md (script).
  Aucun nom de personne ni d'hôpital ; aucun diagnostic en clair ; jamais « bezahlt », « définitif », « amende ».
- Glossaire : aucun mot allemand DIT (Arbeitsgericht, Siegburg, krank, WhatsApp, privé, la phrase de b9) n'y a d'entrée — c'est
  la règle de l'épisode (R13 : sinon la glose monte sur le menton du téléphone) ; la voix les traduit elle-même. Les autres
  entrées reprennent mot pour mot les gloses du scénario. `soustitres` : 194 mots, b9 rétréci à 60 %, tout dans les zones.

**Défauts trouvés.**

| # | scène | instant | défaut | gravité | correction | état |
|---|---|---|---|---|---|---|
| 18 | 15 appel | `b14` → `b14+0.4` | pendant la montée et la sonnerie, l'écran du téléphone est VIDE (seule la bannière d'appel) : 0,4 s de papier blanc au début de la scène | 1 · 6 | l'appelant en grand sur l'écran d'appel : le sceau du tribunal (r 70, il oscille), « Arbeitsgericht Siegburg », deux ondes de sonnerie ; tout s'efface quand les tuiles s'ouvrent | corrigé, vu image par image |
| 19 | 19 règle 1 | toute la scène | le bas de la page de règle (y 1200 → 1384) restait vide ; la règle collait à l'avatar « toi » | 6 | les deux lignes de la règle descendent (y 1090 / 1160 → 1140 / 1222) | corrigé, vu |
| 20 | 2 | `b2` → `b2+0.42` | le fantôme du téléphone (écran simplifié) remplace d'un coup l'écran détaillé de la scène 1 | 9 | — | non corrigé : voulu par le storyboard (sortie du téléphone) ; il dure 0,4 s et rétrécit aussitôt |
| 21 | 4 intro | `i1` → `i1+0.3` | la bannière « contact » de la T-NOTIF couvre le haut de la fiche ; « Yassine » se trace sur le mot | — | — | rien à faire : c'est la transition signature |
| 22 | 7 | `b6` | le salon reste visible au-dessus de la salle pendant le glissement (0,34 s) | — | — | rien à faire : c'est le glissement voulu (la pièce monte) |
| 23 | 22 affiche | `b20@end+0.15` | le flash et le dézoom montrent quelques cases coupées au bord pendant 0,5 s | — | — | rien à faire : socle de l'affiche ; la grille finie est entière, entre x 90 et 990, carte « commentaire » hors de la colonne des boutons |

Tout le reste des débuts de scène est propre : pas de première image vide (hors n° 18, corrigé), les décors se construisent en
cascade (salle des médecins, salon, lettre, page du jugement), aucun reste de la scène précédente au-delà de la transition voulue,
les personnages jouent dès l'entrée (LUI regarde son téléphone, ELLE tape), aucun texte avant son mot.

**Planches finales** (après toutes les corrections) : `out/planches/final/planche_01…08.png` et `planche_01…08_ig.png`.
Contrôles finaux : errcheck toutes les secondes de 0,1 à 75,1 s (aucune erreur) ; overlapscan 0 → 76 s (trois paires de moins
qu'à la tâche 1, plus aucune paire nouvelle) ; mouvement (b4 3,4 %, b7 3,4 %, b10 3,7 %, b16 3,8 % au plus bas ; intro sous le
seuil, voulu) ; soustitres (aucun débordement).

## 3. État de l'épisode et suite

**Prêt (sur le minutage provisoire).** Les 21 scènes de récit et l'affiche sont construites, revues deux fois et corrigées : aucune
erreur JS, aucun personnage sur papier vide, aucune scène figée hors de l'intro (voulue), aucun texte important dans les zones
Instagram, aucune ligne arabe recouverte. La description `instagram.md` est un brouillon (lignes [FR] à dire avec tes mots).

**Quand la voix arrivera.**
1. Montage : copier `videos/akte-koeln-transfusion/montage_voix.py` dans ce dossier, y mettre les phrases (BEATS) de b1 à b20 et
   l'intro commune (i1–i3, « intro.iso.mp3 » + « intro.scribe2.json », hors git), Audio Isolation sur chaque source, Scribe v2 ET v1,
   `FIX` pour la darija, tempo ×1,3 et accroche (b1–b3) à ×1,1 (`TEMPO_HEAD`, `HEAD`), pauses : `SCENE_START` seulement aux vrais
   changements de contexte. Le script régénère `beats.js` et remplace `timings.js` (garder une copie de l'ancien `beats.js`).
2. Repères : `python3 tools/reperes_voix.py videos/akte-siegburg-whatsapp <ancien_beats.js>`, puis revérifier un par un ceux du
   storyboard § 6.3 : les indices `b3@4`, `b4@3`, `b7@1`, `b19@5` ; les mots que tu peux dire autrement (`b1@جاوبات`,
   `b15@جاوباتها`, `b1@ميساج`, `b3@زميل`, `b19@زميل`, `b6@زميلتو`, `b8@زميلة`, `b4@الكونجيات`, `b4@الكادوات`, `b5@للمستعجلات`,
   `b8@المستعجلات`, `b6@خديت`, `b6@حتى`, `b7@ومشى`, `b8@diagnostics`, `b8@عاوداتهم`, `b13@خلا`, `b14@الگروپ`, `b18@فالگروپ`,
   `b16@تعويض`, `b19@الإذن`). Ceux que la construction a utilisés tels quels : `b13@خلا`, `b14@الگروپ`, `b15@جاوباتها`,
   `b16@تعويض`, `b18@فالگروپ`, `b19@5`, `b19@زميل`, `b19@الإذن`. Puis errcheck, planches et `soustitres`.
3. b10 : tes mots remplacent « [FR] Autrement dit, juste un gaz coincé. » dans le sous-titre ET la constante `TRAD_B10`
   (scenes-2.js, scène 10 : 46 px jusqu'à 26 signes, 40 au-delà). Si b10 dure moins de 1,6 s, ramener `b10+0.9` à `b10+0.6`.
4. Le silence (scène 11, sans voix, pas de décès dans cet épisode) : il vaut 1,3 s aujourd'hui (fin de b10 → b11). Le garder
   entre 1,1 et 1,3 s au montage (`EXTRA` ou `PAUSE_BEFORE` b11) ; sous 1,1 s, espacer les sept avatars de 0,06 s au lieu de 0,09.
5. Son : reprendre `son/plan_son.md` (vibreur sur bois, contrebasse pizzicato et claquements de doigts, aucun son d'interface),
   en appliquant d'abord son encadré « À REFAIRE » (ticket thermique, widget de date silencieux, clavier tapé à la main en scène 18) ;
   l'écran d'appel de la scène 15 a maintenant le sceau et des ondes : le vibreur suffit, pas de sonnerie mélodique.
   Puis musique recomposée sur la durée réelle, mixage stéréo, −14 LUFS, rendu, couverture.

**Points faibles qui restent, du plus important au moins important.**
1. Vérité, à valider par toi : `TRAD_B10` (provisoire, tes mots) ; `GROS_MOT = true` (L6 et la pastille montrent « im Arsch ») ;
   la coche jaune du bon exemple (scène 19 : le storyboard la demande, ce n'est pas une coche de lecture).
2. Sous-titre « [FR] … » en b10 tant que la voix n'est pas là.
3. L'intro (i1–i3) : bas de l'écran du téléphone vide jusqu'à `i3` (socle commun de l'intro, calme par nature).
4. Débuts des scènes 9 et 17 : le haut du fil reste peu rempli environ 1 s (forme du fil : une seule bulle, l'expéditeur qui se tape).
5. Scène 14 : une feuille de la plante du carton touche la barbe de LUI de quelques pixels.
6. Scène 12 : pendant la frappe du tampon « erfolglos » (0,28 s), son cadre agrandi passe sur l'avatar d'ELLE ; posé, il est libre.
7. overlapscan : il reste des paires, toutes vues sur les images et sans gêne (transitions, textes découpés, boîtes de police).
