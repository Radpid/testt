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
