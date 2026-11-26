# AKTE 06 — « كلمة وحدة » (Lehrte, 2013) — PLAN SON

**Rien n'est généré maintenant.** Ce plan se lit avec `storyboard.md` (mêmes numéros de scènes, mêmes repères) et
sera exécuté après la vraie voix : `montage_voix.py` remplacera `timings.js`, puis on écrira
`son/plan_bruitages.py`, `son/musique_plan.json` et `son/mixage.py` sur le modèle d'AKTE 02 / 03.
Tous les instants sont PROVISOIRES (89,8 s + 5,6 s d'affiche) ; seuls les repères comptent.

> **À REFAIRE avant toute génération (contrôle des ressemblances, 26.11.2026 — `storyboard.md` fait foi).**
> S1 et S5 : plus d'étiquette de carton au bout d'une ficelle pour la date (`etiquette_carton`, `b5@3`) → un
> feuillet d'éphéméride qui se pose à plat sur le papier (froissement court). S19, `b19@fahrlässige` : plus de
> cadre de bois qui tape le mur (`cadre_mur`) → un ruban d'étiqueteuse collé d'un coup de pouce (petit bruit
> adhésif). Les quatre étiquettes de prix de S19 / S24 restent. Le juge de S22 est chauve, rasé, à lunettes.

## 1. Principes

- **Sons NATURELS seulement** : le vrai bruit de ce qu'on voit — du papier, du carton, un clavier, un stylo, des
  comprimés, un volet de boîte aux lettres. **Jamais** de pop, whoosh, ding, carillon, buzzer, « reveal », swell,
  boom, souffle de transition.
- **La transition signature a un vrai bruit** : une feuille qui glisse sur un bureau. C'est un frottement de papier
  sur du bois, court et sec (0,3 s), pas un souffle : s'il ressemble à un « whoosh », le refaire ou le retirer.
- **Ce qui n'existe pas à l'image n'a pas de son** : les pastilles, les rubans de mention, la chaîne des mains, les
  bandes de citation qui se « frappent » toutes seules, les coups de zoom, les fondus, l'éclair de l'affiche sont
  MUETS. L'usine de la moelle (S14) est un schéma imprimé : aucun bruit de machine — c'est la musique qui s'enraye.
- **Il n'y a PAS de moniteur** dans cet épisode (aucune source n'en parle, la scène muette n'en montre pas) :
  aucun bip, aucun `bip_moniteur.py`. Le son de la mort, c'est une page de calendrier qui tombe.
- **Le tampon ne frappe jamais** (S20, S21) : surtout pas de bruit de tampon. On entend seulement qu'on le décolle
  de son encreur, puis qu'on l'y repose.
- **Signature sonore de l'épisode** : un comprimé qui tombe dans une alvéole de pilulier en plastique — un petit
  « tac » sec. Une fois (version juste), puis sept fois de suite (version fausse). Il revient en S8, S13, S25.
- Niveaux : en dB SOUS la voix (voix à −15 LUFS) ; bruitages entre −10 et −25, ambiances entre −26 et −32. Pendant
  la scène muette (pas de voix) : valeurs en dBFS.
- Ton fixé par `SAISON-2.md` : **mécanique, précis (pizzicati, machine à écrire)**. La machine à écrire est un
  instrument de la MUSIQUE (une percussion), pas un bruitage : à l'image il y a un clavier d'ordinateur, et son vrai
  bruit est un bruitage. Les deux ne jouent jamais ensemble (voir § 5, sections C et I).
- Colonnes : « décalage » = secondes après le repère ; « fin » = fondu de sortie ; « max » = durée gardée.

## 2. Ambiances (lits continus)

| Clé | Ce que c'est | De | À | Niveau | Remarque |
|---|---|---|---|---|---|
| `bureau_hopital` | petit bureau médical : ventilation d'ordinateur très basse, couloir d'hôpital lointain (un chariot, une porte) | `0` | `i1-0.30` | −28 | entre d'un coup avec la 1re image |
| `bureau_hopital` | le même lit | `b5-0.30` | `b11-0.30` | −28 | carte (S5) puis bureau A (S6–S9) |
| `bureau_admission` | autre pièce, plus claire : lamelles d'un store qui cliquettent à peine, un téléphone qui sonne très loin, une fois | `b12` | `b15` | −28 | bureau B (S11–S13) ; la sonnerie lointaine vers `b12@l'admission`, à −32 |
| `chambre` | chambre silencieuse : un radiateur qui tiquette, le vent léger dehors, deux ou trois feuilles contre la vitre | `b15@end` | `b16@end+1.8` | −28, puis voir § 4 | à partir de `b16@end+1.0` tout s'éteint en 0,8 s (le radiateur d'abord, le vent ensuite) |
| `bureau_justice` | pièce feutrée, boiseries : néon discret, parquet qui craque une fois | `b17-0.10` | `b18` | −30 | S17 ; revient en S20–S21 (`b20` → `b22-0.30`) et en S23 (`b23` → `b24`) |
| `hall` | entrée d'immeuble, un peu de réverbération, la rue derrière la porte | `b18` | `b19` | −28 | S18 |
| `couloir_tribunal` | grand couloir : pas lointains sur du parquet, une porte lourde au loin | `b19` | `b20` | −28 | S19 ; revient en S24 (`b24` → `b26-0.30`) |
| `salle_audience` | petite salle : néon, une chaise qui craque, un papier tourné | `b22-0.30` | `b23` | −28 | S22 |
| `bureau_hopital` | le même lit qu'au début | `b29-0.20` | `b29@end+0.15` | −28 | S28 : on revient au premier bureau |

Aucune ambiance sous l'intro (S4), le voyage sur la carte (S10 : seulement la fin de `bureau_hopital`, à −32), la
notice (S14), la règle (S25–S27 : un silence de papier, seulement les bruitages) et l'affiche.

## 3. Bruitages par scène

Format prévu pour `plan_bruitages.py` : (son, repère, décalage s, niveau dB sous la voix, fin s, max s).

| Scène | Son | Repère | Décalage | Niveau | Fin | Max | Ce qu'on voit |
|---|---|---|---|---|---|---|---|
| S1 | `feuille_tombe` (une feuille A4 qui tombe à plat sur un bureau en bois) | `0` | 0,10 | −12 | 0,2 | 0,5 | la lettre atterrit (1re image) |
| S1 | `trombones_sautent` (quelques trombones qui tressautent dans une coupelle en métal) | `0` | 0,16 | −20 | 0,2 | 0,4 | le choc |
| S1 | `tasse_tinte` (tasse en céramique qui vibre une fois sur le bois) | `0` | 0,40 | −22 | 0,2 | 0,4 | l'onde dans le café |
| S1 | `enveloppes_eventail` (quatre enveloppes de papier épais qui glissent vite sur du bois, l'une après l'autre) | `b1@جابت` | 0,00 | −14 | 0,2 | 0,7 | elles jaillissent de sous la lettre |
| S1 | `paumes_papier` (quatre paumes qui se posent sur du papier, l'une après l'autre, mat) | `b1@لربعة` | 0,25 | −18 | 0,2 | 0,6 | les quatre mains |
| S1 | `papier_tremble` (enveloppe de papier qui tremble sous une main) | `b1@فألمانيا` | 0,00 | −20 | 0,3 | 0,5 | les mains tremblent |
| S1 | `enveloppes_repoussees` (enveloppes repoussées d'un geste sec, qui s'entassent) | `b2@قبلوهاش` | 0,00 | −12 | 0,2 | 0,5 | elles les renvoient |
| S2 | `clavier_7` (sept frappes nettes sur un clavier d'ordinateur, régulières, 0,06 s d'écart) | `b3@2` | 0,00 | −14 | 0,1 | 0,5 | « täglich » se frappe |
| S2 | `comprimes_papier_7` (sept petits comprimés qui tombent un à un sur une feuille de papier posée sur du bois) | `b3@2` | 0,25 | −14 | 0,2 | 0,7 | un comprimé par lettre |
| S2 | `comprime_papier_1` (un seul comprimé, même prise) | `b3@فبلاصة` | 0,25 | −16 | 0,1 | 0,3 | la version juste |
| S2 | `stylo_boucle` (stylo à bille qui trace une boucle rapide sur du papier) | `b3@كلمة` | 0,00 | −16 | 0,1 | 0,4 | le mot est entouré |
| S3 | `feuille_poussee` (une feuille poussée d'une main sur du bois : frottement court) | `b4+0.07` | 0,00 | −16 | 0,1 | 0,35 | main 1 |
| S3 | `feuille_poussee` | `b4+0.50` | 0,00 | −16 | 0,1 | 0,35 | main 2 |
| S3 | `feuille_poussee` | `b4+0.90` | 0,00 | −16 | 0,1 | 0,35 | main 3 |
| S3 | `feuille_poussee` | `b4+1.30` | 0,00 | −16 | 0,1 | 0,35 | main 4 |
| S3 | `feuille_file` (une feuille qui glisse longtemps sur du bois et s'éloigne) | `b4+1.65` | 0,00 | −18 | 0,4 | 1,2 | elle leur échappe |
| S4 | `chemise_glisse` (chemise cartonnée qui glisse sur un bureau) | `i1-0.30` | 0,00 | −18 | 0,2 | 0,4 | la transition : la chemise arrive |
| S4 | `photo_posee` (photo sur carton posée à plat) | `i1` | 0,30 | −20 | 0,1 | 0,3 | la photo tombe sur la chemise |
| S4 | `trombone_clip` (un gros trombone glissé sur du carton : petit frottement métallique + clic) | `i1+0.05` | 0,20 | −18 | 0,1 | 0,3 | le trombone tient la photo |
| S4 | `crayon_roule` (crayon de bois qui roule de quelques centimètres) | `i3@j'aime` | 0,05 | −24 | 0,2 | 0,4 | le crayon bouge au coup de zoom |
| S5 | `carte_depliee` (grande carte routière en papier qu'on déplie et qu'on pose) | `b5-0.30` | 0,00 | −16 | 0,3 | 0,7 | la transition : la carte arrive |
| S5 | `etiquette_carton` (petite étiquette de carton au bout d'une ficelle qui tape une fois le papier) | `b5@3` | 0,35 | −20 | 0,1 | 0,3 | « 2013 » |
| S5 | `epingle` (épingle plantée dans du papier sur du liège, sourd) | `b5@Lehrte` | 0,35 | −14 | — | 0,3 | l'épingle sur Lehrte |
| S6 | `feuille_poussee` | `b6-0.05` | 0,00 | −16 | 0,1 | 0,45 | la lettre vierge arrive |
| S6 | `clavier_pose` (clavier d'ordinateur posé sur un bureau) | `b6+0.05` | 0,35 | −22 | 0,1 | 0,3 | le clavier |
| S6 | `tasse_posee` (tasse de café posée sur du bois) | `b6+0.1` | 0,30 | −20 | 0,1 | 0,3 | la tasse |
| S6 | `clavier_frappe` (frappe rapide et régulière sur un clavier d'ordinateur) | `b6@Entlassungsbrief` | 0,00 | −16 | 0,1 | 0,7 | le titre se frappe |
| S6 | `fiche_carton` (fiche cartonnée qui glisse sur du bois) | `b7` | 0,00 | −18 | 0,1 | 0,4 | la fiche du patient |
| S6 | `trombone_clip` | `b7@مريض` | 0,00 | −16 | 0,1 | 0,3 | le trombone la fixe |
| S6 | `clavier_frappe` | `b7@3` | 0,00 | −18 | 0,1 | 0,3 | « 79 J. » |
| S6 | `clavier_frappe` | `b7@يحولوه` | 0,00 | −18 | 0,1 | 0,35 | « VERLEGUNG → » |
| S7 | `manches_bureau` (deux avant-bras en blouse qui se posent sur un bureau : tissu) | `b8` | 0,10 | −22 | 0,2 | 0,4 | les deux mains arrivent |
| S7 | `clavier_continu` (frappe à deux mains, régulière, sur un clavier d'ordinateur) | `b8+0.3` | 0,00 | −16 | 0,15 | jusqu'à `b8@service` | elle écrit la lettre |
| S8 | `clavier_frappe` | `b9@Methotrexat` | 0,00 | −16 | 0,1 | 0,5 | « Methotrexat 15 mg » |
| S8 | `pilulier_pose` (pilulier en plastique posé sur du papier) | `b9@كان` | 0,40 | −18 | 0,1 | 0,3 | le pilulier arrive |
| S8 | `comprime_alveole_1` (**un** comprimé qui tombe dans une alvéole en plastique + le couvercle qui claque) | `b9@مرة` | 0,28 | −12 | 0,1 | 0,35 | la version juste : un seul « tac » |
| S8 | `clavier_efface` (touche d'effacement, une rafale douce) | `b9@وكتباتو` | 0,00 | −20 | 0,1 | 0,25 | le mot en pointillé s'efface |
| S8 | `clavier_7` | `b9@كل` | 0,00 | −14 | 0,1 | 0,5 | « täglich » |
| S8 | `comprimes_alveoles_6` (**six** comprimés qui tombent un à un dans six alvéoles en plastique, 0,06 s d'écart) | `b9@كل` | 0,16 | −10 | 0,2 | 0,6 | la version fausse : six « tac » de plus |
| S9 | `stylo_paraphe` (stylo à bille, un paraphe court) | `b10` | 0,00 | −18 | 0,1 | 0,3 | main 1 finit de signer |
| S9 | `plume_capuchon` (capuchon de stylo-plume retiré) | `b10@الثانية` | 0,25 | −20 | — | 0,2 | main 2 |
| S9 | `plume_signature` (plume qui gratte le papier, un seul trait rapide) | `b10@سنات` | 0,00 | −12 | 0,1 | 0,45 | elle contresigne |
| S9 | `plume_capuchon_remis` (capuchon remis : petit clic) | `b10@شافتش` | 0,00 | −20 | — | 0,2 | elle referme le stylo |
| S9 | `feuille_poussee` | `b10@الغلطة` | 0,00 | −16 | 0,1 | 0,3 | elle repousse la feuille |
| S10 | `carte_depliee` (version courte) | `b11-0.30` | 0,00 | −18 | 0,2 | 0,4 | la transition : la carte revient |
| S10 | `lettre_pliee` (feuille pliée en trois et glissée dans une enveloppe) | `b11` | 0,00 | −16 | 0,1 | 0,4 | la lettre se plie |
| S10 | `epingle` | `b11@الثاني` | 0,35 | −14 | — | 0,3 | la deuxième épingle |
| S11 | `enveloppe_glisse` (enveloppe de papier qui glisse sur un sous-main) | `b12` | 0,00 | −16 | 0,1 | 0,4 | la transition + l'enveloppe arrive |
| S11 | `enveloppe_ouverte` (lettre tirée hors d'une enveloppe) | `b12@الطبيبة` | 0,00 | −14 | 0,1 | 0,3 | elle sort la lettre |
| S11 | `papier_deplie` (feuille pliée en trois qu'on déplie, deux temps) | `b12@الطبيبة+0.2` | 0,00 | −14 | 0,1 | 0,4 | elle la déplie |
| S11 | `stylo_coches_3` (trois petites coches au stylo à bille) | `b12@l'admission` | 0,00 | −16 | 0,1 | 0,45 | trois cases cochées |
| S11 | `stylo_clic` (stylo à poussoir : un clic) | `b12@شافتهاش` | 0,00 | −14 | — | 0,2 | « ما شافتهاش » |
| S12 | `manche_papier` (manche de chemise qui frotte du papier, une main qui se pose) | `b13@الرابعة` | 0,25 | −20 | 0,1 | 0,3 | main 4 |
| S12 | `stylo_survol` (pointe de stylo qui file le long d'une feuille sans écrire) | `b13@الطبيب` | 0,00 | −20 | 0,1 | 0,45 | il survole la marge |
| S12 | `stylo_paraphe` | `b13@فوقها` | 0,00 | −16 | 0,1 | 0,25 | il paraphe |
| S12 | `tapote_2` (une paume qui tapote deux fois une feuille sur un bureau) | `b13@8` | 0,00 | −14 | 0,1 | 0,3 | « حتى هو » |
| S13 | `feuille_poussee` | `b14` | 0,00 | −18 | 0,1 | 0,25 | le plan de soins arrive |
| S13 | `stylo_ecrit` (stylo à bille qui écrit deux mots) | `b14@تبعو` | 0,05 | −16 | 0,1 | 0,6 | elle recopie |
| S13 | `stylo_croix_7` (sept petites croix au stylo, rapides) | `b14@كل` | 0,00 | −16 | 0,1 | 0,45 | sept cases |
| S13 | `comprimes_alveoles_7` (**sept** comprimés dans sept alvéoles en plastique, 0,07 s d'écart) | `b14@نهار` | 0,22 | −10 | 0,2 | 0,7 | le pilulier se remplit seul |
| S14 | `notice_depliee` (notice de médicament en papier fin qu'on déplie) | `b15` | 0,00 | −16 | 0,2 | 0,5 | la transition : la notice |
| S14 | `comprime_papier_1` | `b15@كثر` | 0,25 | −16 | 0,1 | 0,3 | le premier comprimé |
| S14 | `comprimes_papier_6` (six comprimés qui tombent un à un sur du papier, 0,11 s d'écart) | `b15@كيضرب` | 0,22 | −14 | 0,2 | 0,8 | les six de trop |
| S15 | `ephemeride` (un feuillet d'éphéméride arraché d'un coup sec) | `b16@سيمانة` | 0,00 | −12 | 0,1 | 0,3 | une semaine |
| S15 | `ephemeride` | `b16@جوج` | 0,00 | −12 | 0,1 | 0,3 | deux |
| S15 | `papier_decolle` (coin de papier qui se décolle, à peine) | `b16@تلاتة` | 0,00 | −20 | 0,2 | 0,3 | trois… le feuillet tient encore |
| S16 | voir § 4 | | | | | | |
| S17 | `dossier_glisse` (épaisse chemise cartonnée qui glisse sur un sous-main en cuir) | `b17-0.10` | 0,05 | −18 | 0,2 | 0,35 | le dossier arrive |
| S17 | `dossier_ouvert` (couverture cartonnée qu'on ouvre) | `b17@النيابة` | 0,00 | −14 | 0,1 | 0,35 | le parquet |
| S17 | `coupure_journal` (coupure de journal posée, papier sec) | `b17@والصحافة` | 0,00 | −14 | 0,2 | 0,35 | la presse |
| S17 | `comprimes_cuir_7` (sept comprimés posés un à un sur du cuir, très mats) | `b17@الدوا` | 0,00 | −16 | 0,2 | 0,45 | « السبب هو الدوا » |
| S18 | `feuille_poussee` | `b18` | 0,00 | −20 | 0,1 | 0,3 | la transition |
| S18 | `enveloppe_boite` (une enveloppe glissée dans une boîte aux lettres en métal, puis le volet qui claque) | `b18@ربعة` | 0,00 | −10 | 0,2 | 0,45 | boîte 1 |
| S18 | `enveloppe_boite` | `b18@ربعة` | 0,14 | −10 | 0,2 | 0,45 | boîte 2 |
| S18 | `enveloppe_boite` | `b18@ربعة` | 0,28 | −10 | 0,2 | 0,45 | boîte 3 |
| S18 | `enveloppe_boite` | `b18@ربعة` | 0,42 | −10 | 0,2 | 0,45 | boîte 4 |
| S18 | `papier_fremit` (quatre enveloppes qui frémissent dans leur fente) | `b18@بلا` | 0,00 | −22 | 0,2 | 0,3 | « بلا جلسة » |
| S19 | `feuille_poussee` | `b19` | 0,00 | −20 | 0,1 | 0,3 | la transition |
| S19 | `chaises_parquet` (quatre chaises de bois posées sur un parquet, l'une après l'autre) | `b19` | 0,25 | −18 | 0,2 | 0,5 | les chaises |
| S19 | `tissu_dossier` (une blouse jetée sur un dossier de chaise, quatre fois) | `b19+0.2` | 0,20 | −22 | 0,2 | 0,5 | les vêtements |
| S19 | `etiquettes_carton_4` (quatre étiquettes de carton qui tombent au bout de leur ficelle et tapent le bois) | `b19@1` | 0,30 | −14 | 0,2 | 0,6 | les quatre prix |
| S19 | `cadre_mur` (cadre de bois qui tape une fois contre un mur) | `b19@fahrlässige` | 0,35 | −16 | 0,2 | 0,3 | le cadre « § » |
| S20 | `feuille_poussee` | `b20` | 0,00 | −20 | 0,1 | 0,3 | la transition |
| S20 | `fiches_carton_4` (quatre fiches cartonnées posées l'une après l'autre sur du cuir) | `b20+0.05` | 0,30 | −16 | 0,2 | 0,5 | les quatre fiches |
| S20 | `tampon_decolle` (tampon de bois qu'on décolle d'un encreur : petit bruit collant) | `b20@كانو` | 0,00 | −14 | 0,1 | 0,25 | le tampon se lève — **et aucun bruit de frappe ensuite** |
| S21 | `corbeille_metal` (corbeille à courrier en fil de métal posée sur un bureau) | `b21` | 0,30 | −18 | 0,1 | 0,3 | la corbeille |
| S21 | `enveloppes_corbeille_4` (quatre enveloppes jetées l'une après l'autre dans une corbeille en métal) | `b21@دارو` | 0,20 | −12 | 0,2 | 0,6 | l'opposition |
| S21 | `tampon_repose` (tampon reposé sur son encreur, feutré) | `b21@قبلوش` | 0,30 | −16 | 0,1 | 0,25 | le tampon retourne à sa place |
| S22 | `feuille_poussee` | `b22-0.30` | 0,00 | −20 | 0,1 | 0,3 | la transition |
| S22 | `paumes_table_4` (quatre paumes posées l'une après l'autre sur une table en bois) | `b22@فالجلسة` | 0,25 | −16 | 0,2 | 0,5 | les quatre mains à la barre |
| S22 | `robe_manches` (froissement de larges manches de tissu) | `b22@كل` | 0,00 | −22 | 0,2 | 0,4 | le juge ouvre les mains |
| S22 | `poing_table` (une main qui se referme en poing sur du bois : très léger) | `b22@كل` | 0,10 | −24 | 0,1 | 0,2 | main 1 |
| S23 | `dossier_ferme` (lourde chemise cartonnée qu'on referme : claquement sourd) | `b23@eingestellt` | 0,35 | −10 | 0,2 | 0,4 | le dossier se ferme |
| S23 | `elastique` (sangle élastique qui claque sur du carton) | `b23@تسد` | 0,00 | −10 | 0,1 | 0,25 | « تسد » |
| S23 | `feuille_file` (version courte) | `b23@بلا` | 0,00 | −16 | 0,3 | 0,5 | le formulaire vierge quitte le bureau |
| S23 | `stylo_roule` (stylo qui roule sur du cuir) | `b23@بلا` | 0,15 | −24 | 0,2 | 0,4 | le stylo |
| S24 | `feuille_poussee` | `b24` | 0,00 | −20 | 0,1 | 0,3 | la transition |
| S24 | `stylo_raye_4` (quatre traits de stylo rapides sur du carton) | `b24+0.15` | 0,00 | −16 | 0,1 | 0,45 | les prix rayés |
| S24 | `etiquettes_retournees_4` (quatre petits cartons retournés d'un coup de doigt) | `b24@واحد` | 0,00 | −16 | 0,1 | 0,5 | les nouveaux prix |
| S24 | `feuillets_vol` (quatre feuillets de papier léger qui s'envolent et battent) | `b24@لجمعية` | 0,00 | −16 | **0,1** | **jusqu'à `b25`** | les bulletins partent… le son est COUPÉ net à `b25` : ils s'arrêtent en l'air |
| S25 | `feuille_poussee` (poussée du bas, un peu plus proche du micro) | `b26-0.30` | 0,00 | −16 | 0,1 | 0,35 | la transition : TA feuille |
| S25 | `boite_carton` (boîte de médicament en carton posée, les blisters bougent dedans) | `b26@Methotrexat` | 0,30 | −16 | 0,1 | 0,3 | la boîte |
| S25 | `comprimes_paume_6` (six comprimés qui sautent d'un pilulier et tombent dans une paume) | `b26@فالروماتيزم` | 0,05 | −12 | 0,2 | 0,5 | six de trop s'en vont |
| S25 | `couvercle_clic` (un couvercle de pilulier refermé : clic) | `b26@مرة` | 0,00 | −12 | — | 0,2 | il en reste un |
| S26 | `clavier_frappe` | `b27@einmal` | 0,00 | −16 | 0,1 | 0,55 | « 1 × pro Woche » |
| S26 | `stylo_ecrit` (un mot) | `b27@والنهار` | 0,00 | −12 | 0,1 | 0,4 | « montags », à la main |
| S26 | `stylo_raye` (un trait de stylo appuyé) | `b27@بالحروف+0.3` | 0,00 | −14 | 0,1 | 0,2 | « 1-0-0-0 » rayé |
| S27 | `stylo_leve` (pointe de stylo qui quitte le papier) | `b28@كتنقلها` | 0,10 | −24 | 0,1 | 0,2 | la main s'arrête avant de recopier |
| S27 | `loupe_glisse` (loupe en verre et métal qu'on fait glisser sur du papier, puis qu'on pose) | `b28@راجعها` | 0,00 | −14 | 0,1 | 0,35 | la loupe |
| S27 | `stylo_coche` (une coche nette) | `b28@راجعها` | 0,25 | −12 | — | 0,2 | ✓ |
| S27 | `stylo_paraphe` | `b28@راجعها+0.5` | 0,05 | −16 | 0,1 | 0,25 | maintenant elle signe |
| S28 | `feuille_file` (long glissement régulier d'une feuille sur du bois) | `b29-0.20` | 0,00 | −16 | **0,02** | **jusqu'à `b29@7`** | la feuille traverse le bureau ; le glissement est COUPÉ net par la claque |
| S28 | `paume_claque` (**une paume qui s'abat à plat sur une feuille posée sur un bureau en bois** : claque nette, mate, sans écho) | `b29@7` | 0,00 | −8 | 0,2 | 0,4 | « كون نتا اليد » — le son le plus fort de l'épisode |
| S28 | `trombones_sautent` | `b29@7` | 0,04 | −20 | 0,2 | 0,4 | les trombones |
| S28 | `tapote_1` (une paume qui tapote une fois le papier) | `b29@كتوقفها` | 0,05 | −18 | 0,1 | 0,2 | elle montre le mot |

Rien sur l'affiche.

## 4. La scène muette (S16) — le silence, puis une page

Pas de voix de `b16@end` à `b17` : les niveaux sont en dBFS. Aucun bip, aucune machine, aucune musique après
`b16@end+1.0`.

| Instant | Son | Niveau | Remarque |
|---|---|---|---|
| `b16@end` → `b16@end+1.0` | ambiance `chambre` (radiateur, vent léger) | −34 dBFS | elle continue comme en S15 |
| `b16@end+0.2` | `souffle_dormeur` (UNE respiration lente d'un dormeur : une inspiration, une expiration, très douce) | −32 dBFS | **option** : à faire écouter à l'auteur ; si elle paraît appuyée, la retirer — l'image suffit |
| `b16@end+1.0` → `b16@end+1.8` | l'ambiance s'éteint : le radiateur cesse de tiquer, puis le vent tombe | −34 → −50 dBFS | tout se fige à l'image au même instant |
| `b16@end+1.2` | `feuillet_detache` (un feuillet de papier qui se détache : un froissement minuscule) | −28 dBFS | le feuillet 3 quitte le bloc |
| `b16@end+1.3` → `b16@end+2.4` | `feuillet_chute` (une feuille légère qui descend dans l'air, deux battements) | −30 dBFS | il tombe en feuille morte |
| `b16@end+2.5` | `feuillet_sol` (la feuille touche un plancher de bois et glisse un peu) | −24 dBFS | le seul bruit net du silence |
| `b16@end+2.6` → `b17-0.10` | rien (bruit de fond de la pièce) | −50 dBFS | la phrase est à l'écran |

Si le silence monté ne fait pas 3,2 s, ces instants se compriment en proportion (comme l'image).

## 5. Musique

ElevenLabs Music (`composition_plan`), composée APRÈS le montage de la voix, section par section sur la frise réelle.
Tonalité et tempo fixes pour tout l'épisode : **mineur, 112 à la noire**, petit effectif à cordes.
Instruments : pizzicati de violoncelle et d'alto (l'ostinato), contrebasse en pizzicato, une **machine à écrire**
jouée comme une percussion (frappes sèches, rarement un retour de chariot), un basson pour les tenues courtes,
cordes tenues très douces (sul tasto) pour les moments suspendus.
À ne pas mettre (ce sont les couleurs des autres épisodes) : piano seul (04), tic-tac (05), claquements de doigts et
contrebasse « jazz » (07), clarinette et rythme de marche (08), violoncelle seul chanté à l'archet (09).
Négatifs pour le générateur : impacts, whooshes, risers, booms, swells de cymbale, cloches, bips, voix, nappes de
synthétiseur, batterie.
Niveau : ≈ −25 dBFS, −7 dB de ducking sous la voix ; −27 sous l'intro.

| Section | De | À | Provisoire | Ambiance | Instruments | Intensité (0–10) |
|---|---|---|---|---|---|---|
| A · accroche | `0` | `i1-0.30` | 0,0 → 10,6 | une mécanique déjà en marche, sèche, un peu inquiète ; elle démarre SUR la 1re image, sans introduction | ostinato de pizzicati (alto + violoncelle) + machine à écrire + une note grave tenue | 6 ; un cran de plus de `b2` à `b4@end` |
| B · intro | `i1-0.30` | `b5-0.30` | 10,6 → 19,8 | la même pulsation, allégée, plus chaleureuse | pizzicati seuls + contrebasse sur les temps ; pas de machine à écrire | 3 |
| C · la feuille naît | `b5-0.30` | `b11-0.30` | 19,8 → 35,9 | précis, appliqué, un bureau au travail | l'ostinato reprend ; une voix s'ajoute à chaque main (`b8` : l'alto ; `b10` : le violoncelle double). **De `b8` à `b9@end` la machine à écrire de la musique se TAIT** : on entend le vrai clavier | 4 → 5 |
| D · le voyage, mains 3 et 4, la copie | `b11-0.30` | `b15` | 35,9 → 46,4 | la chaîne s'accélère : même motif, plus serré, un demi-ton plus haut à `b12` | ostinato en doubles par moments, machine à écrire plus dense, contrebasse | 5 → 7 |
| E · la moelle | `b15` | `b15@end` | 46,4 → 49,2 | la mécanique s'enraye : les voix se retirent l'une après l'autre, comme les trois tapis | d'abord la machine à écrire s'arrête (`b15@كيضرب`), puis l'alto, puis le violoncelle ; il reste la note grave | 7 → 2 |
| F · les semaines, le silence | `b15@end` | `b17-0.10` | 49,2 → 53,7 | presque rien | trois pizzicati isolés (un par « semaine »), puis une tenue de cordes très douce qui s'éteint en 1 s ; **silence complet de `b16@end+1.0` à `b17-0.10`** | 2 → 0 |
| G · la justice | `b17-0.10` | `b22-0.30` | 53,7 → 68,8 | reprise sèche, administrative, plus lente d'allure (même tempo, valeurs longues) | contrebasse en pizzicato + machine à écrire espacée (comme un greffe) + basson en notes courtes ; à `b20` l'harmonie reste suspendue (accord non résolu : le conditionnel) ; petit élan à `b21` | 4 → 6 |
| H · l'audience et l'issue | `b22-0.30` | `b26-0.30` | 68,8 → 78,6 | suspendu, sans verdict | la machine à écrire s'arrête ; cordes tenues (alto, violoncelle), un pizzicato par mesure ; à `b25` l'accord ne se résout PAS | 5 → 3 |
| I · la règle | `b26-0.30` | `b29-0.20` | 78,6 → 86,3 | clair, ordonné, rassurant sans être joyeux ; passage en majeur | l'ostinato du début, en majeur, pizzicati + contrebasse ; pas de machine à écrire de `b27` à `b27@end` (vrai clavier, vrai stylo) | 4 → 5 |
| J · la dernière phrase | `b29-0.20` | `b29@end+0.15` | 86,3 → 89,7 | la mécanique de l'accroche revient, complète… et **s'arrête NET sur `b29@7`** (la main s'abat) : 0,5 s sans musique, puis UN accord de pizzicati, doux et résolu, sur `b29@كتوقفها` | ostinato complet + machine à écrire, puis rien, puis l'accord | 6 → 0 → 3 |
| K · affiche | `b29@end+0.15` | fin | 89,7 → 95,4 | la résonance de l'accord, deux ou trois pizzicati légers, fondu de 2 s | pizzicati + contrebasse | 2 → 0 |

L'arrêt net de la section J et le silence de la section F ne peuvent pas être confiés au générateur : composer ces
sections avec une fin sèche, puis **couper au montage** exactement sur `b29@7` et sur `b16@end+1.0` (fondu de 20 ms).
Recomposer la musique à chaque changement de durée de la voix.

## 6. Catalogue des sons à générer (plus tard)

ElevenLabs `sound-generation`, 4 requêtes au plus en parallèle, `duration_seconds` ≥ 0,5 (on recoupe ensuite à la
durée « max » du tableau). 87 bruitages distincts + 7 ambiances :

- **Papier, carton** : `feuille_tombe`, `feuille_poussee`, `feuille_file`, `papier_tremble`, `papier_fremit`,
  `papier_decolle`, `papier_deplie`, `lettre_pliee`, `enveloppes_eventail`, `enveloppes_repoussees`,
  `enveloppe_glisse`, `enveloppe_ouverte`, `enveloppe_boite`, `enveloppes_corbeille_4`, `carte_depliee`,
  `notice_depliee`, `coupure_journal`, `chemise_glisse`, `dossier_glisse`, `dossier_ouvert`, `dossier_ferme`,
  `fiche_carton`, `fiches_carton_4`, `photo_posee`, `etiquette_carton`, `etiquettes_carton_4`,
  `etiquettes_retournees_4`, `ephemeride`, `feuillet_detache`, `feuillet_chute`, `feuillet_sol`, `feuillets_vol`,
  `boite_carton`.
- **Comprimés, pilulier** : `comprime_alveole_1`, `comprimes_alveoles_6`, `comprimes_alveoles_7`,
  `comprime_papier_1`, `comprimes_papier_6`, `comprimes_papier_7`, `comprimes_cuir_7`, `comprimes_paume_6`,
  `pilulier_pose`, `couvercle_clic`.
- **Écrire** : `clavier_frappe`, `clavier_7`, `clavier_continu`, `clavier_efface`, `clavier_pose`, `stylo_paraphe`,
  `stylo_boucle`, `stylo_ecrit`, `stylo_coche`, `stylo_coches_3`, `stylo_croix_7`, `stylo_raye`, `stylo_raye_4`,
  `stylo_survol`, `stylo_leve`, `stylo_clic`, `stylo_roule`, `plume_capuchon`, `plume_signature`,
  `plume_capuchon_remis`, `crayon_roule`.
- **Mains, tissu** : `paumes_papier`, `paumes_table_4`, `paume_claque`, `poing_table`, `tapote_1`, `tapote_2`,
  `manches_bureau`, `manche_papier`, `robe_manches`, `tissu_dossier`, `souffle_dormeur` (option).
- **Objets** : `trombone_clip`, `trombones_sautent`, `tasse_tinte`, `tasse_posee`, `epingle`, `tampon_decolle`,
  `tampon_repose`, `corbeille_metal`, `elastique`, `chaises_parquet`, `cadre_mur`, `loupe_glisse`.
- **Ambiances** (8 à 12 s, bouclables) : `bureau_hopital`, `bureau_admission`, `chambre`, `bureau_justice`, `hall`,
  `couloir_tribunal`, `salle_audience`.

(Le nombre exact de fichiers sera refait quand `plan_bruitages.py` sera écrit ; plusieurs sons « × 4 » ou « × 7 »
peuvent être montés à partir d'une seule prise répétée.)

## 7. Mixage (rappel du skill)

Voix −15 LUFS (déjà masterisée) ; bruitages aux niveaux ci-dessus ; musique ≈ −25 dBFS avec −7 dB de ducking ;
`loudnorm` deux passes à −14 LUFS, crête −1,5 dB ; remux sur la vidéo rendue (`-c:v copy`).
Contrôle à l'écoute : aucun son ne ressemble à un effet de montage ; les sept « tac » se comptent ; le silence de
S16 est vraiment un silence ; la claque de S28 coupe la musique.
