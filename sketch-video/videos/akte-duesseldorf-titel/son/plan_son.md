# AKTE 08 — « جوج حروف » (Düsseldorf, 2019) — PLAN SON

**Rien n'est généré maintenant.** Ce plan se lit avec `storyboard.md` (mêmes numéros de scènes, mêmes repères) et
sera exécuté après la vraie voix : `montage_voix.py` remplacera `timings.js`, puis on écrira
`son/plan_bruitages.py`, `son/musique_plan.json` et `son/mixage.py` sur le modèle d'AKTE 02 / 03.
Tous les instants sont PROVISOIRES (74,6 s + 5,6 s d'affiche) ; seuls les repères comptent.

> **À REFAIRE avant toute génération (contrôle des ressemblances, 26.11.2026 — `storyboard.md` fait foi).**
> S17, `b12@حيدهاش` : plus de feuillets de calendrier tournés (`feuillet_x2`) → deux crans de la molette du
> tampon dateur (le clac sec de `tampon_dateur`, sans frappe). S19 : la salle n'est plus « vue du fond » mais le
> banc vu de face depuis la place de l'accusé ; mêmes sons, plus le tintement des deux lettres de laiton qui
> sautent sur le banc à `b13@المحكمة` et le chevalet de table qui bascule à `b13@عليه` (tôle, très bas).

## 1. Principes

- **Sons NATURELS seulement** : le vrai bruit de ce qu'on voit — du laiton, des vis, du carton au bout d'une ficelle,
  du papier, un tampon, un clapet de boîte aux lettres, des chaînes. **Jamais** de pop, whoosh, ding, carillon,
  buzzer, « reveal », swell, boom, souffle de transition.
- **La transition signature a un vrai bruit, et il change à chaque scène.** La « frappe » n'est jamais un impact
  de banque de sons : c'est le bruit de l'objet qui tombe, sur la matière où il tombe (laiton sur pierre, cadre
  contre un mur, feuille sur un bureau, badge au bout de son cordon…). Il est calé sur la COUPE, à la première
  image de la scène. Court (0,3 à 0,6 s), sec, sans réverbération ajoutée. S'il ressemble à un « boom », le refaire.
- **Signature sonore de l'épisode : deux ou trois pièces de laiton qui se posent** — « D », « r », le point : des
  petits coups francs de métal plein, l'un après l'autre. On les entend en S6 (elles sortent du mot), S8 (elles se
  posent sur le livre), S10 (elles tombent sur l'établi), S20 et S23 (elles claquent sur la pierre), S29 (elles
  tombent dans la corbeille). Leur double léger : quatre petites pièces de plastique qui tombent (S15, le « (ir) »).
- **Ce qui n'existe pas à l'image n'a pas de son** : les pastilles, la plaquette de mode qui bascule, la réglette
  des années, les textes qui s'écrivent seuls, les trajets en pointillé du HUD, les points « … », les coups de zoom,
  les reflets, l'éclair de l'affiche sont MUETS.
- **Il n'y a PAS de moniteur** dans cet épisode (aucun patient, aucun décès dans cette affaire, pas de scène
  muette) : aucun bip, aucun `bip_moniteur.py`. `extra` est vide.
- **Il n'y a PAS de marteau** au tribunal (S19), ni de sonnette dans l'intro (S4 : seulement le clic mécanique de
  deux boutons-poussoirs), ni de voix : personne ne parle à l'image.
- **S26 est la scène du bruit qui ne vient PAS** : le cachet s'arrête en l'air. Surtout aucun son de tampon, aucun
  souffle de geste : on laisse un trou, c'est lui qui se remarque.
- **S22 (l'autre procès) est la plage sobre** : trois bruits de carton et de métal, bas ; pas d'accent.
- Niveaux : en dB SOUS la voix (voix à −15 LUFS) ; frappes entre −6 et −14, autres bruitages entre −14 et −24,
  ambiances entre −28 et −32.
- Ton fixé par `SAISON-2.md` : **vif, pédagogique (clarinette, rythme de marche)**. La caisse claire aux balais est
  un instrument de la MUSIQUE : ses coups ne doublent jamais une frappe de l'image (la musique se tait sur les
  frappes fortes, voir § 5).
- Colonnes : « décalage » = secondes après le repère ; « fin » = fondu de sortie ; « max » = durée gardée.

## 2. Ambiances (lits continus)

| Clé | Ce que c'est | De | À | Niveau | Remarque |
|---|---|---|---|---|---|
| `rue_calme` | rue résidentielle calme : circulation très lointaine, un oiseau, un peu d'air | `0` | `b2` | −28 | S1 : entre d'un coup avec la 1re image |
| `piece_calme` | pièce fermée, silencieuse : presque rien (un bâtiment qui respire) | `b2` | `i1-0.15` | −32 | S2, S3 |
| `hall_vide` | hall nu, légère résonance, une porte très loin | `b4@Doctorat` | `b5-0.05` | −30 | S6 |
| `atelier` | petit atelier : un extracteur d'air discret, la rue derrière une vitre, des outils qui tintent à peine | `b5-0.05` | `b6` | −28 | S7 ; revient en S10 (`b7@ماشي-0.10` → `b8-0.10`) et en S26 (`b19` → `b19@سول`) |
| `bibliotheque` | salle de lecture : silence feutré, un parquet qui craque une fois, une page tournée au loin | `b6` | `b7@ماشي-0.10` | −30 | S8, S9 |
| `vestiaire` | vestiaire d'hôpital : ventilation, un chariot et une porte au loin dans le couloir | `b9` | `b10` | −28 | S12 |
| `rue_calme` | le même lit qu'en S1 (la boîte aux lettres est dehors) | `b10` | `b11` | −30 | S13 ; revient en S16 (`b12` → `b12@6`) |
| `bureau` | bureau : ventilateur d'ordinateur très bas | `b11` | `b12` | −30 | S14, S15 ; revient en S17 et S18 (`b12@6` → `b13@المحكمة`) |
| `salle_audience` | petite salle d'audience : une pièce pleine de gens debout et silencieux, tissus, un parquet | `b13@المحكمة` | `b13@يعني` | −28 | S19 |
| `greffe` | local d'archives : néon discret, un chariot qui roule très loin | `b15` | `b16` | −32 | S22, très bas |
| `cage_escalier` | entrée d'immeuble : légère réverbération, la rue derrière la porte | `b20` | `b21-0.30` | −30 | S28 |
| `couloir_service` | couloir de service d'hôpital, calme : ventilation, des pas feutrés au loin, aucune voix | `b21-0.30` | `b21@end+0.15` | −28 | S29 |

Aucune ambiance sous l'intro (S4), le globe (S5, S11), les scènes du rebord (S20, S21, S23 : seulement les objets),
la règle sur le mur (S24, S25, S27) et l'affiche.

## 3. Bruitages par scène

Format prévu pour `plan_bruitages.py` : (son, repère, décalage s, niveau dB sous la voix, fin s, max s).

| Scène | Son | Repère | Décalage | Niveau | Fin | Max | Ce qu'on voit |
|---|---|---|---|---|---|---|---|
| S1 | `ficelle_tend` (une étiquette de carton qui arrive en bout de ficelle : petit claquement mat, carton qui frotte) | `0` | 0,00 | −10 | 0,2 | 0,5 | l'étiquette « 15.000 € » (1re image) |
| S1 | `tournevis_visse` (tournevis qui serre une vis dans du laiton : petits crans réguliers) | `0` | 0,05 | −18 | 0,2 | 1,0 | la main visse |
| S1 | `carton_balance` (étiquette cartonnée qui se balance et frôle du métal) | `0` | 0,20 | −22 | 0,3 | 1,2 | le balancier |
| S1 | `tournevis_tombe` (tournevis qui tombe sur une dalle de pierre, rebondit et roule un peu) | `b1@3` | 0,28 | −10 | 0,3 | 0,9 | il le lâche sur « 15000 » |
| S1 | `vis_laiton_3` (trois vis de laiton serrées d'un quart de tour, trois crans rapides) | `b1@كتبتي` | 0,00 | −18 | 0,2 | 0,5 | les vis des lettres tournent |
| S2 | `carte_baguette` (carte murale en toile qui se déroule, sa baguette de bois tape le mur) | `b2` | 0,00 | −10 | 0,2 | 0,7 | la carte (frappe) |
| S2 | `epingle_plante` (punaise enfoncée dans du carton épais) | `b2@Düsseldorf` | 0,38 | −14 | 0,1 | 0,3 | l'épingle sur Düsseldorf |
| S2 | `carton_se_dresse` (une découpe de carton qui se redresse) | `b2@فالمحكمة` | 0,05 | −22 | 0,2 | 0,4 | le petit tribunal pousse |
| S2 | `etiquette_carton` (petite étiquette de carton qui tombe en bout de ficelle) | `b2@فالمحكمة` | 0,42 | −18 | 0,2 | 0,4 | l'étiquette `Missbrauch von Titeln` |
| S3 | `cadres_mur` (deux cadres en bois qui retombent contre un mur, leur verre vibre) | `b3` | 0,00 | −10 | 0,3 | 0,6 | les deux diplômes (frappe) |
| S3 | `tampon_bois` (tampon en bois frappé sur du carton sous verre : coup mat) | `b3@طبيب` | 0,26 | −10 | 0,2 | 0,4 | `Arzt ✓` |
| S3 | `tampon_bois` | `b3@بدكتوراه` | 0,26 | −10 | 0,2 | 0,4 | `Doktortitel ✓` |
| S3 | `ficelle_tend` | `b3@6` | 0,07 | −12 | 0,2 | 0,5 | l'étiquette retombe entre eux |
| S4 | `plaque_laiton_bois` (plaque de laiton qui claque à plat contre une porte en bois) | `i1@ياسين` | 0,00 | −14 | 0,2 | 0,5 | la plaque « Yassine » |
| S4 | `vis_laiton_2` (deux vis serrées, deux crans) | `i1@ياسين` | 0,06 | −22 | 0,2 | 0,4 | ses deux vis |
| S4 | `bouton_poussoir` (bouton-poussoir mécanique pressé : un clic sec, AUCUNE sonnerie) | `i3@j'aime` | 0,00 | −18 | 0,1 | 0,3 | le cœur |
| S4 | `bouton_poussoir` | `i3@abonne` | 0,00 | −18 | 0,1 | 0,3 | le bouton s'abonner |
| S5 | `globe_pose` (globe d'école reposé sur son pied : bois creux, axe de métal qui tinte) | `b4-0.30` | 0,00 | −14 | 0,3 | 0,6 | le globe (frappe) |
| S5 | `crayon_trace` (crayon qui trace un long trait continu sur du papier) | `b4@وصلتي` | 0,00 | −22 | 0,2 | 0,7 | l'arc Maroc → Allemagne |
| S6 | `papier_claque` (grande feuille de papier fort qui claque à plat) | `b4@Doctorat` | 0,00 | −12 | 0,2 | 0,5 | le grand diplôme (frappe) |
| S6 | `papier_deroule` (rouleau de papier fort qu'on déroule) | `b4@Doctorat` | 0,05 | −18 | 0,2 | 0,4 | il déroule le sien |
| S6 | `laiton_3_bois` (trois petites pièces de laiton posées sur du bois, l'une après l'autre) | `b4@المغرب` | 0,10 | −14 | 0,2 | 0,5 | « D », « r », « . » sortent du mot — SIGNATURE |
| S7 | `etabli_3_objets` (trois objets posés vite sur un établi : fonte, bloc de papier, carton) | `b5-0.05` | 0,00 | −14 | 0,2 | 0,5 | les trois postes (frappe) |
| S7 | `tampon_encreur` (tampon pressé sur un encreur de feutre) | `b5@حاجة` | 0,10 | −22 | 0,1 | 0,3 | la main prend le cachet |
| S7 | `cachet_bloc` (cachet frappé sur un bloc de papier : coup sourd et net) | `b5@cachet` | 0,00 | −8 | 0,2 | 0,4 | LE cachet |
| S7 | `bons_pinces` (trois feuillets qui claquent sur leur fil) | `b5@cachet` | 0,05 | −24 | 0,2 | 0,4 | les bons de commande sursautent |
| S7 | `cachet_boite_fer` (cachet reposé dans une boîte en fer) | `b5@cachet` | 0,36 | −18 | 0,2 | 0,3 | il le repose |
| S8 | `livres_3` (trois gros livres reliés posés l'un sur l'autre) | `b6` | 0,00 | −12 | 0,2 | 0,5 | la pile d'études (frappe) |
| S8 | `livre_lourd` (un gros livre qui tombe à plat sur une pile) | `b6@Promotion` | 0,00 | −8 | 0,2 | 0,5 | le livre de plus : `Dissertation` |
| S8 | `laiton_3_bois` | `b6@البحث` | 0,10 | −12 | 0,2 | 0,5 | « Dr. » se pose dessus — SIGNATURE |
| S9 | `livres_6` (six livres posés en cascade rapide) | `b7` | 0,00 | −12 | 0,2 | 0,6 | ta pile (frappe) |
| S9 | `papier_pose` (feuille de papier fort posée contre des livres) | `b7@ديالك` | 0,10 | −20 | 0,2 | 0,3 | ton diplôme |
| S9 | `livre_glisse` (un livre tiré à moitié d'une pile : toile contre toile) | `b7@وخا` | 0,00 | −18 | 0,2 | 0,4 | le livre `thèse` sort |
| S9 | `bras_ecran` (bras articulé de métal qui pivote et se bloque en butée) | `b7@عندهم` | 0,00 | −14 | 0,2 | 0,4 | l'écran `anabin` arrive |
| S9 | `clavier_frappe` (frappe rapide sur un clavier d'ordinateur) | `b7@عندهم` | 0,20 | −22 | 0,2 | 0,9 | la réponse se tape |
| S9 | `planchette` (planchette de bois posée sur des livres) | `b7@دكتوراه` | 0,12 | −14 | 0,2 | 0,3 | `= Ärztliche Prüfung` |
| S9 | `tampon_papier` (tampon frappé sur une feuille posée sur du bois) | `b7@المهنة` | 0,26 | −10 | 0,2 | 0,4 | `Berufsdoktorat` |
| S10 | `vis_devisse_3` (trois vis dévissées vite : crans à rebours) | `b7@ماشي` | 0,00 | −16 | 0,1 | 0,3 | les lettres se dévissent |
| S10 | `laiton_3_tombe` (trois pièces de laiton qui tombent sur un établi en bois et rebondissent) | `b7@Dr` | 0,16 | −6 | 0,3 | 0,6 | « D », « r », « . » tombent — SIGNATURE |
| S11 | `carton_bois_creux` (petit disque de carton épais posé sur du bois creux) | `b8-0.10` | 0,00 | −14 | 0,2 | 0,3 | le médaillon sans visage (frappe) |
| S11 | `crayon_trace` | `b8@برا` | 0,00 | −22 | 0,2 | 0,8 | l'arc Téhéran → Allemagne |
| S12 | `badge_cordon` (badge en plastique rigide qui tombe au bout de son cordon, pince métallique qui claque) | `b9` | 0,00 | −10 | 0,3 | 0,6 | le badge (frappe) |
| S12 | `cintre_patere` (cintre qui tinte contre une patère, tissu qui bouge) | `b9` | 0,10 | −24 | 0,3 | 0,6 | la blouse oscille |
| S12 | `feutre_boucle` (feutre qui trace une boucle sur du plastique) | `b9@ir` | 0,10 | −18 | 0,1 | 0,3 | la boucle autour de « (ir) » |
| S13 | `clapet_boite` (une enveloppe glissée dans une boîte aux lettres en métal, le clapet retombe) | `b10` | 0,12 | −12 | 0,2 | 0,5 | l'enveloppe de la Kammer |
| S13 | `papier_claque` | `b10@1` | 0,00 | −10 | 0,2 | 0,5 | la lettre (frappe sur « 2009 ») |
| S13 | `tampon_dateur` (tampon dateur à molettes : clac métallique sec sur papier) | `b10@1` | 0,50 | −10 | 0,2 | 0,3 | `08.09.2009` |
| S13 | `plume_signe` (stylo qui signe : grattement rapide, une demi-seconde) | `b10@كتبات` | 0,20 | −18 | 0,2 | 0,6 | la main signe |
| S13 | `crayon_trait` (un trait de crayon court et sec) | `b10@Dr` | 0,00 | −18 | 0,1 | 0,3 | `„Dr. med.“` est barré |
| S14 | `ecran_bureau` (écran d'ordinateur posé sur un bureau : plastique sur bois) | `b11` | 0,00 | −14 | 0,2 | 0,4 | le poste (frappe) |
| S14 | `souris_clic` (un clic de souris) | `b11@site` | 0,00 | −20 | 0,1 | 0,2 | la page s'ouvre |
| S14 | `fiches_2` (deux fiches cartonnées posées debout sur un bureau) | `b11@Instagram` | 0,12 | −14 | 0,2 | 0,4 | les deux comptes |
| S15 | `badge_cordon` | `b11@هاد` | 0,00 | −14 | 0,2 | 0,4 | le petit badge (frappe) |
| S15 | `plastique_4_tombe` (quatre petites pièces de plastique dur qui tombent sur un sol dur et sautillent) | `b11@طاحو` | 0,26 | −6 | 0,3 | 0,6 | « ( », « i », « r », « ) » tombent — le double de la SIGNATURE |
| S16 | `papier_claque` | `b12` | 0,00 | −10 | 0,2 | 0,5 | la 2e lettre sur la 1re (frappe) |
| S16 | `tampon_dateur` | `b12@1` | 0,50 | −10 | 0,2 | 0,3 | `09.01.2017` |
| S16 | `crayon_boucle` (crayon qui entoure un mot d'un geste) | `b12@5` | 0,05 | −16 | 0,1 | 0,3 | le signe du correcteur |
| S17 | `ecran_bureau` | `b12@6` | 0,00 | −14 | 0,2 | 0,4 | le poste (frappe) |
| S17 | `souris_clic_3` (trois clics de souris, 0,12 s d'écart) | `b12@حيدهاش` | 0,00 | −18 | 0,1 | 0,4 | la page se recharge trois fois |
| S17 | `feuillet_x2` (deux feuillets de calendrier tournés) | `b12@حيدهاش` | 0,06 | −24 | 0,1 | 0,3 | 2018, 2019 |
| S17 | `tampon_bois` | `b12@ودارت` | 0,26 | −8 | 0,2 | 0,4 | `angezeigt` |
| S17 | `enveloppe_bannette` (enveloppe qui tombe dans une bannette en plastique) | `b12@شكاية` | 0,12 | −14 | 0,2 | 0,3 | la plainte part |
| S18 | `enveloppe_epaisse` (enveloppe épaisse qui claque à plat sur un bureau en bois) | `b12@end+0.05` | 0,00 | −8 | 0,2 | 0,5 | le Strafbefehl (frappe : la lettre qui tombe) |
| S18 | `etiquette_carton` | `b13` | 0,12 | −18 | 0,2 | 0,4 | `13.500 € · laut Presse` |
| S18 | `tampon_bois` | `b13@1` | 0,26 | −8 | 0,2 | 0,4 | `EINSPRUCH` |
| S19 | `dossier_pupitre` (dossier cartonné posé sur un pupitre en bois) | `b13@المحكمة` | 0,00 | −12 | 0,2 | 0,4 | le dossier sur le banc (frappe) |
| S19 | `salle_debout` (une petite salle qui se tient debout : tissus, une chaise repoussée) | `b13@المحكمة` | 0,05 | −20 | 0,3 | 0,8 | tout le monde est debout |
| S19 | `clavier_discret` (clavier d'ordinateur, frappe régulière et discrète) | `b13@حكمات` | 0,00 | −24 | 0,2 | 1,2 | la greffière tape |
| S19 | `feuille_pupitre` (une feuille posée sur un pupitre) | `b13@5` | 0,10 | −18 | 0,1 | 0,3 | le juge pose sa feuille — PAS de marteau |
| S20 | `laiton_2_pierre` (deux grosses pièces de laiton posées sur une tablette de pierre, 0,06 s d'écart) | `b13@يعني` | 0,00 | −6 | 0,3 | 0,5 | « D » et « r » géants — SIGNATURE |
| S20 | `etiquette_carton` | `b13@يعني` | 0,24 | −18 | 0,2 | 0,4 | `60 Tagessätze` |
| S20 | `etiquette_carton` | `b13@من` | 0,12 | −18 | 0,2 | 0,4 | `× 250 €` |
| S20 | `plaque_email_mur` (plaque émaillée qui claque contre un mur) | `b13@خلصتو` | 0,05 | −10 | 0,2 | 0,4 | `= 15.000 €` |
| S21 | `feuilles_2_mur` (deux feuilles plaquées contre un mur au même instant) | `b14@دارو` | 0,26 | −10 | 0,2 | 0,4 | les deux `Berufung` |
| S21 | `tampon_lourd` (gros tampon en bois frappé sur du carton épais) | `b14@نهائي` | 0,26 | −6 | 0,3 | 0,5 | `nicht rechtskräftig` sur l'étiquette |
| S22 | `classeur_tablette` (gros classeur posé sur la tablette métallique d'un chariot) | `b15` | 0,00 | −14 | 0,2 | 0,5 | le gros dossier (frappe, retenue) |
| S22 | `chemise_glisse` (chemise cartonnée glissée dans un classeur : carton sur carton) | `b15@دخل` | 0,00 | −18 | 0,2 | 0,5 | le dossier du titre entre dedans |
| S22 | `boucle_sangle` (boucle de sangle qu'on serre : petit cliquet de métal) | `b15@أخرى` | 0,10 | −16 | 0,1 | 0,3 | la sangle |
| S23 | `laiton_3_pierre` (trois grosses pièces de laiton sur de la pierre : deux coups francs et un petit) | `b16` | 0,00 | −6 | 0,3 | 0,5 | « D », « r », « . » géants — SIGNATURE |
| S23 | `tampon_lourd` | `b16@مذنب` | 0,26 | −6 | 0,3 | 0,5 | `schuldig` |
| S23 | `tampon_lourd` | `b16@نهائي` | 0,26 | −6 | 0,3 | 0,5 | `rechtskräftig` |
| S23 | `ficelle_casse` (une ficelle de coton qui casse net) | `b16@نهائي` | 0,30 | −14 | 0,1 | 0,2 | la ficelle de l'étiquette |
| S23 | `carton_sol` (une étiquette de carton qui tombe à plat sur un sol dur) | `b16@نهائي` | 0,62 | −16 | 0,2 | 0,3 | les 15 000 € tombent |
| S24 | `chaines_plaques` (une barre de fer et deux plaques de métal pendues à des chaînes qui tombent en place et se balancent) | `b17-0.10` | 0,00 | −8 | 0,5 | 1,2 | la barre porte-enseignes (frappe) |
| S24 | `papier_pose` | `b17@Doctorat` | 0,12 | −20 | 0,2 | 0,3 | le diplôme sur le socle |
| S24 | `tampon_papier` | `b17@ديال` | 0,26 | −12 | 0,2 | 0,4 | `Berufsdoktorat` |
| S24 | `latte_plaque` (latte de bois claquée sur une plaque de laiton suspendue, chaînes qui cliquettent) | `b17@5` | 0,26 | −6 | 0,4 | 0,7 | la 1re barre : pas de « Dr. » |
| S24 | `latte_plaque` | `b17@7` | 0,26 | −6 | 0,4 | 0,7 | la 2e barre : pas de « Dr. med. » |
| S25 | `plaque_laiton_mur` (plaque de laiton qui claque contre un mur, deux plaquettes émaillées qui tintent dessous) | `b18` | 0,00 | −10 | 0,4 | 0,8 | ta plaque vide (frappe) |
| S25 | `chainettes` (deux plaquettes qui se balancent sur des chaînettes : tintement léger, irrégulier) | `b18@حتى` | 0,00 | −22 | 0,4 | 1,3 | les deux tribunaux se balancent à contresens |
| S25 | `fer_2_barres` (deux barres de fer posées d'un coup) | `b18@تفاهموش` | 0,26 | −8 | 0,2 | 0,4 | le signe « ≠ » |
| S26 | — aucun bruit de cachet — | `b19@تطبع` | — | — | — | — | le cachet s'arrête en l'air : le trou est voulu |
| S26 | `clavier_2_touches` (deux touches de clavier) | `b19@تكتب` | 0,00 | −18 | 0,1 | 0,3 | « D », « r » dans la bio |
| S26 | `clavier_retour_2` (touche retour arrière, deux fois) | `b19@bio` | 0,12 | −18 | 0,1 | 0,3 | il les efface |
| S27 | `papier_claque` | `b19@سول` | 0,00 | −12 | 0,2 | 0,5 | la feuille `Anfrage` (frappe) |
| S27 | `stylo_ecrit` (stylo à bille qui écrit vite sur une feuille posée sur une planche) | `b19@سول` | 0,20 | −18 | 0,3 | 1,3 | la main écrit |
| S27 | `plaque_email_mur` | `b19@محامي` | 0,11 | −14 | 0,2 | 0,4 | la plaque `Rechtsanwalt` |
| S27 | `plaque_email_mur` | `b19@Ärztekammer` | 0,11 | −14 | 0,2 | 0,4 | la plaque `Ärztekammer` |
| S27 | `clapets_2` (deux clapets de fente à courrier qui claquent presque ensemble) | `b19@بالكتابة` | 0,30 | −10 | 0,2 | 0,4 | les deux enveloppes partent |
| S28 | `clapet_boite` | `b20@كتبات` | 0,00 | −10 | 0,2 | 0,5 | la lettre de la Kammer arrive (frappe) |
| S28 | `enveloppe_sort` (enveloppe tirée d'une boîte aux lettres : papier contre métal) | `b20@جاوبها` | 0,00 | −14 | 0,2 | 0,4 | la réponse repart |
| S29 | `plaque_laiton_bois` | `b21-0.30` | 0,00 | −10 | 0,2 | 0,5 | ta nouvelle plaque (frappe) |
| S29 | `vis_laiton_2` | `b21-0.30` | 0,06 | −20 | 0,2 | 0,4 | ses vis |
| S29 | `burin_laiton` (burin qui grave du laiton : petit crissement court) | `b21@طبيب` | 0,00 | −20 | 0,2 | 0,4 | `Ärztin / Arzt` se grave |
| S29 | `laiton_poche` (deux petites pièces de métal sorties d'une poche de tissu, qui s'entrechoquent) | `b21@ماشي` | 0,10 | −18 | 0,2 | 0,4 | il sort les deux lettres |
| S29 | `laiton_corbeille` (deux pièces de laiton qui tombent dans une corbeille en fil de fer : deux tintements) | `b21@حروف` | 0,35 | −8 | 0,4 | 0,6 | les deux lettres à la corbeille — SIGNATURE, dernière fois |
| Affiche | `feuilles_etalees` (feuilles de papier qu'on étale sur une table) | `b21@end+0.5` | 0,00 | −20 | 0,4 | 1,5 | le dézoom sur les 24 cases |
| Affiche | `crayon_ecrit` (crayon qui écrit une ligne) | `b21@end+2.8` | 0,00 | −22 | 0,3 | 0,8 | la question écrite |

Règle d'espacement : jamais deux frappes fortes (≤ −10 dB) à moins de 0,2 s l'une de l'autre ; si la vraie voix
resserre S13 (`papier_claque` puis `tampon_dateur`), S18 ou S23, baisser la seconde de 4 dB.

## 4. Scène muette et moniteur

**Aucune scène muette, aucun moniteur** : cette affaire n'a ni décès ni famille (`recherche.md`, § 5 et § 11).
`EXTRA` reste vide dans `montage_voix.py` ; `bip_moniteur.py` n'est pas créé. Le seul silence voulu est court :
**S22** (b15, « الملف دخل فمحاكمة أخرى ديالو ») — la musique se réduit à une note tenue (§ 5, section I) et les
trois bruitages sont bas. Aucun effet, aucun accent, aucune réverbération : la phrase est neutre, le son aussi.

## 5. Musique

ElevenLabs Music (`/v1/music`, `composition_plan`), composée sur la frise RÉELLE après le montage de la voix, puis
recomposée à chaque changement de durée. Environ −25 dBFS, −7 dB sous la voix.
**Ton (fixé par `SAISON-2.md`) : vif, pédagogique — clarinette, rythme de marche.** Tempo ≈ 112 à la noire, ré
majeur (ré mineur dans l'affaire). Effectif : clarinette (la voix), clarinette basse ou basson (le pas), contrebasse
en pizzicato, caisse claire aux balais, wood-block. Petite formation, prise de près, sèche.
Négatifs : impacts, whooshes, risers, booms, braams, bips, nappes de synthétiseur, percussions de cinéma, cloches,
glockenspiel, carillons, chœurs, voix.

| Section | De | À | Ambiance | Instruments | Intensité (sur 10) |
|---|---|---|---|---|---|
| A · accroche | `0` | `b2` | entrée directe, sans introduction : un court roulement de balais, puis le motif de quatre notes qui monte, en staccato — vif, un peu moqueur | clarinette, contrebasse pizz, caisse claire aux balais | 7 |
| B · « c'est arrivé » | `b2` | `i1-0.15` | le motif passe à la contrebasse, la clarinette descend ; sur `b3@6` une note tenue qui ne se résout pas (la boucle est ouverte) | clarinette, contrebasse | 5 |
| C · intro | `i1-0.15` | `b4-0.30` | le thème, chaleureux et simple, à mi-voix ; rien ne presse | clarinette, contrebasse pizz, balais très doux | 4 |
| D · « toi » | `b4-0.30` | `b6` | la MARCHE s'installe : un pas « oum-pa » discret, la clarinette guillerette — tu arrives, tu es content | clarinette, basson, contrebasse, balais | 6 |
| E · l'explication | `b6` | `b8-0.10` | même pas, texture allégée, phrases en question / réponse (les deux piles) ; un palier à chaque livre qui tombe ; sur `b7@ماشي` trois notes qui descendent | clarinette, contrebasse pizz, wood-block | 5 |
| F · l'affaire | `b8-0.10` | `b12@end+0.05` | la marche passe en mineur, plus sobre, plus régulière — une chronique ; trois paliers d'insistance : `b10` (2009), `b11` (le site : un ostinato de clarinette s'ajoute), `b12` (2017 : la caisse claire entre) | clarinette basse, clarinette, contrebasse, caisse claire sans timbre, wood-block | 5 → 6,5 |
| G · le tribunal | `b12@end+0.05` | `b14` | la marche se resserre : un roulement de caisse claire très doux et tenu, la clarinette dans le grave ; aucune fanfare ; cadence nette sur `b13@خلصتو` | clarinette, basson tenu, caisse claire | 6 |
| H · « ولكن » | `b14` | `b15` | le motif repart mais boite (un temps en trop) : ce jugement ne tient pas debout ; il s'arrête net avant `b14@نهائي` | clarinette, contrebasse pizz | 5 |
| I · l'autre procès | `b15` | `b16` | plage SOBRE : une seule note tenue de clarinette basse, deux pizzicati espacés ; AUCUNE percussion | clarinette basse, contrebasse | 2 |
| J · définitif | `b16` | `b17-0.10` | deux accords graves et posés, l'un vers `b16@مذنب`, l'autre vers `b16@نهائي` (après les tampons, pas dessus) ; puis un souffle de silence avant la règle | basson, clarinette basse, contrebasse | 4 |
| K · la règle | `b17-0.10` | `b21-0.30` | la marche de « toi » revient en majeur, plus claire, plus légère ; elle hésite sur b18 (la clarinette va et vient entre deux notes : on ne sait pas quoi écrire), puis avance droit sur b19 et b20 | clarinette, contrebasse pizz, balais, wood-block | 6 |
| L · dernière phrase | `b21-0.30` | `b21@end+0.15` | on ralentit ; la clarinette seule, chaleureuse ; la cadence se pose juste APRÈS le tintement de la corbeille | clarinette, contrebasse | 5 |
| M · affiche | `b21@end+0.15` | fin (≈ + 5,6 s) | reprise douce du pas de marche, qui s'éteint | contrebasse pizz, balais, clarinette en écho | 3 |

**Les trous de la musique** (une croche à un temps de silence, pour laisser la frappe de l'image seule) :
`b5@cachet` · `b7@Dr` · `b11@طاحو` · `b13@1` · `b14@نهائي` · `b16@مذنب` · `b17@5` · `b17@7` · `b18@تفاهموش` ·
`b21@حروف`. Et un trou SANS frappe : `b19@تطبع` (S26, le cachet arrêté) — la musique s'arrête avec lui, une demi-
seconde, puis repart sur `b19@cachet`.
Chaque deux-points du texte (« دابا نتا: », « وأول حاجة: », « كتبات ليه: », « عاودات كتبات ليه: », « إيوا نتا: »)
est une fin de phrase musicale : la phrase suivante repart sur le mot d'après.

## 6. Catalogue des sons à générer (plus tard)

ElevenLabs `sound-generation` (durée ≥ 0,5 s, quatre requêtes en parallèle au plus), prises sèches, de près, sans
musique ni voix. 81 bruitages et 11 ambiances ; un son qui sert plusieurs fois est généré une seule fois.

| Famille | Clés |
|---|---|
| Laiton (signature) | `laiton_3_bois` · `laiton_3_tombe` · `laiton_2_pierre` · `laiton_3_pierre` · `laiton_poche` · `laiton_corbeille` · `plaque_laiton_bois` · `plaque_laiton_mur` · `plaque_email_mur` · `burin_laiton` |
| Vis et outils | `tournevis_visse` · `tournevis_tombe` · `vis_laiton_2` · `vis_laiton_3` · `vis_devisse_3` · `etabli_3_objets` · `bras_ecran` |
| Carton et ficelle | `ficelle_tend` · `carton_balance` · `etiquette_carton` · `ficelle_casse` · `carton_sol` · `carton_se_dresse` · `carton_bois_creux` · `fiches_2` · `plastique_4_tombe` · `badge_cordon` |
| Papier | `papier_claque` · `papier_deroule` · `papier_pose` · `feuilles_2_mur` · `feuille_pupitre` · `feuillet_x2` · `feuilles_etalees` · `enveloppe_epaisse` · `enveloppe_bannette` · `enveloppe_sort` · `bons_pinces` |
| Tampons | `tampon_bois` · `tampon_papier` · `tampon_lourd` · `tampon_dateur` · `tampon_encreur` · `cachet_bloc` · `cachet_boite_fer` |
| Écriture | `crayon_trace` · `crayon_trait` · `crayon_boucle` · `crayon_ecrit` · `feutre_boucle` · `plume_signe` · `stylo_ecrit` |
| Bureau | `ecran_bureau` · `souris_clic` · `souris_clic_3` · `clavier_frappe` · `clavier_discret` · `clavier_2_touches` · `clavier_retour_2` · `bouton_poussoir` |
| Bois, livres, mobilier | `livres_3` · `livres_6` · `livre_lourd` · `livre_glisse` · `planchette` · `cadres_mur` · `carte_baguette` · `globe_pose` · `epingle_plante` · `cintre_patere` · `dossier_pupitre` · `classeur_tablette` · `chemise_glisse` · `boucle_sangle` |
| Métal suspendu, courrier | `chaines_plaques` · `chainettes` · `latte_plaque` · `fer_2_barres` · `clapet_boite` · `clapets_2` |
| Salle | `salle_debout` |
| Ambiances (30 s en boucle) | `rue_calme` · `piece_calme` · `hall_vide` · `atelier` · `bibliotheque` · `vestiaire` · `bureau` · `salle_audience` · `greffe` · `cage_escalier` · `couloir_service` |

À l'écoute, refuser tout son qui ressemble à un effet : un « clac » avec une queue de réverbération, un frottement
qui siffle, une note. Les tampons doivent rester des bruits de bois et de papier ; les pièces de laiton, des bruits
de métal plein et court (pas de cloche, pas de pièce de monnaie qui tourne).

## 7. Mixage (rappel du skill)

Voix à −15 LUFS (mastering « voice-off ») ; bruitages 6 à 25 dB sous la voix selon le tableau ; musique ≈ −25 dBFS
avec −7 dB de ducking sous la voix ; `loudnorm` deux passes à −14 LUFS, crête −1,5 dB ; remux sur la vidéo rendue
(`-c:v copy`). Vérifier à l'oreille : les dix frappes fortes (−6 à −8 dB) ne masquent jamais un mot — sinon les
reculer de 0,05 s APRÈS le mot ou les baisser de 3 dB ; le trou de S26 s'entend ; S22 reste la plage la plus basse
de l'épisode.
