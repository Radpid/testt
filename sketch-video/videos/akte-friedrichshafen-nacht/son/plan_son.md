# AKTE 09 — « غير سكران » (Friedrichshafen, 2023) — PLAN SON

**Rien n'est généré maintenant.** Ce plan se lit avec `storyboard.md` (mêmes numéros de scènes, mêmes repères) et
sera exécuté après la vraie voix : `montage_voix.py` remplacera `timings.js`, puis on écrira
`son/plan_bruitages.py`, `son/bip_moniteur.py`, `son/musique_plan.json` et `son/mixage.py` sur le modèle d'AKTE
02 / 03. Tous les instants en secondes sont PROVISOIRES (99,4 s + 5,6 s d'affiche) ; seuls les repères comptent.

> **À REFAIRE avant toute génération (contrôle des ressemblances, 26.11.2026 — `storyboard.md` fait foi).**
> S1, `b1@1` : plus de tampon « EINSPRUCH » (c'est AKTE 08) → une plume qui gratte le papier d'un seul trait
> (0,28 s) et une goutte. S20, `b21@جلسة` : plus de ficelle qui casse ni d'étiquette qui tombe (`ficelle_casse`)
> → trois gouttes d'encre qui tombent sur un dallage, espacées de 0,12 s.

## 1. Principes

- **Sons NATURELS seulement** : les vrais bruits de ce qu'on voit (papier, tampon, roue libre, herbe, portes,
  roulettes, stylo, pas, interrupteur, pages, billets). **Jamais** de pop, whoosh, ding, carillon, buzzer,
  « reveal », swell, boom, souffle de transition.
- **Les transitions d'encre sont MUETTES.** Aucun bruit de pinceau, de liquide ou de souffle sur un lavis :
  c'est la musique (la corde grave) qui fait le passage. La ligne qui monte, descend ou penche est MUETTE.
  Les pastilles, les médaillons, le cœur et le bouton de l'intro sont MUETS.
- Deux sons « de machine » qui restent des sons de la scène : le **moniteur** du box (synthétisé, § 4) et
  l'**appel de l'alarme de réanimation** à 6 h (une sonnerie de bip d'équipe, courte, § 3 S15).
- **Le dedans s'entend autrement que le dehors** : dans les scènes « dedans » (S6, S10, S13) le lit sonore du
  haut passe derrière un filtre passe-bas (800 Hz, −6 dB), comme entendu à travers une cloison, et une seule
  chose s'entend net : **la goutte**. C'est un traitement de mixage, pas un effet ajouté.
- Niveaux : en dB SOUS la voix (voix à −15 LUFS) ; bruitages entre −10 et −25, ambiances entre −26 et −32.
  Pendant la scène muette, les valeurs sont en dBFS.
- Ton de l'épisode (fiche `SAISON-2.md`) : **le plus triste de la saison — violoncelle seul, silences.**
  Quand on hésite entre un son et rien : rien.
- Colonne « fin » : fondu de sortie en secondes ; « max » : durée maximale gardée.

## 2. Ambiances (lits continus)

| Clé | Ce que c'est | De | À | Niveau | Remarque |
|---|---|---|---|---|---|
| `appartement` | intérieur calme, le soir : un frigo lointain, une horloge qu'on devine | `0` | `b2-0.10` | −30 | S1, moitié haute |
| `salle_audience` | petite salle boisée : un banc qui craque, une toux lointaine, des feuilles | `b2-0.10` | `i1-0.30` | −28 | S1 bas, S2 ; fondu de sortie 0,3 s |
| `couloir_nuit` | couloir d'hôpital la nuit : ventilation, un néon, un chariot très loin | `b3-0.10` | `i1-0.30` | −30 | S2 haut, mêlé au précédent |
| `lac` | bord de lac : clapotis doux, deux mouettes lointaines, vent léger | `b4-0.05` | `b5-0.10` | −28 | S4 ; aucune ambiance sous l'intro |
| `nuit_campagne` | campagne la nuit : grillons clairsemés, vent dans un arbre, bourdonnement faible d'un lampadaire | `b5-0.10` | `b8-0.15` | −28 | S5, S6 (filtrée à partir de `b7-0.30`) |
| `entree_urgences` | devant un hôpital la nuit : ventilation extérieure, moteur au ralenti | `b8-0.15` | `b9-0.10` | −28 | S7 |
| `box_nuit` | box des urgences : ventilation basse, pas feutrés très loin, un téléphone qui sonne deux fois au bout du couloir (une seule fois, vers `b10`) | `b9-0.10` | `b19-0.05` | −30 | S8 à S16 ; **filtrée** dans S10 (`b11-0.30` → `b12-0.15`) et S13 (`b15-0.30` → `b16-0.08`) ; coupée net à `b18@Scanner-0.10` au profit de `scanner` |
| `scanner` | salle de scanner : rotation régulière de l'anneau, ventilateur | `b18@Scanner-0.10` | `b19-0.05` | −24 | S16 ; fondu d'entrée 0,5 s |
| `lac` | le même lit, plus le rotor (§ 3) | `b19-0.05` | `b19@end+0.1` | −30 | S17 ; fondu de sortie 0,4 s vers le silence |
| `matin_village` | petit matin : merles, un moineau, vent dans un tilleul, une voiture très loin | `b20-0.25` | `b21` | −26 | S19 ; fondu d'entrée 0,6 s (on sort du silence) |
| `hall_tribunal` | hall à forte résonance : pas lointains, une porte au loin | `b21` | `b22` | −28 | S20 |
| `salle_audience` | le même lit qu'en S1 | `b22` | `b28-0.2` | −28 | S21 à S25 |
| `box_nuit` | le même lit que la nuit | `b28-0.2` | `b31@end+0.15` | −32 | la règle (S26–S28) et la dernière image (S29) ; fondu de sortie 0,5 s sous l'affiche |

## 3. Bruitages par scène

Format prévu pour `plan_bruitages.py` : (son, repère, décalage s, niveau dB sous la voix, fin s, max s).

| Scène | Son | Repère | Décalage | Niveau | Fin | Max | Ce qu'on voit |
|---|---|---|---|---|---|---|---|
| S1 | `fente_lettres` (clapet métallique d'une fente à lettres + enveloppe qui glisse sur le sol) | `0` | 0,00 | −12 | 0,2 | 0,7 | la lettre arrive |
| S1 | `papier_repousse` (feuille poussée sur du bois, sec) | `b1@1` | 0,00 | −16 | 0,1 | 0,3 | « لا » : elle repousse la lettre |
| S1 | `tampon` (tampon encreur frappé sur du papier posé sur du bois) | `b1@1` | 0,38 | −10 | — | 0,3 | « EINSPRUCH » |
| S1 | `stylo_trait` (un trait de feutre) | `b1@4` | 0,00 | −20 | — | 0,3 | le soulignement de « 41.250 € » |
| S1 | `feuille_levee` (une feuille qu'on lève, papier épais) | `b2@وتحكم` | −0,05 | −20 | 0,1 | 0,4 | la juge lit |
| S1 | `grille_legere` (petite grille de métal léger qui tombe sur du parquet et vibre) | `b2@بـ15` | 0,40 | −12 | 0,5 | 1,2 | la grille en pointillés tombe |
| S1 | `souffle_coupe` (une inspiration brusque, de femme, très courte) | `b2@بـ15` | 0,50 | −22 | — | 0,4 | le choc |
| S2 | `feuille_bloc` (feuille détachée d'un bloc-notes) | `b3@الخبرة` | 0,10 | −20 | — | 0,3 | la feuille « Rat » sort du médaillon |
| S2 | `feuille_vol` (feuille qui glisse dans l'air, très léger) | `b3@وهادشي` | 0,00 | −24 | 0,1 | 0,4 | elle traverse la ligne |
| S2 | `papier_dechire` (une feuille déchirée en deux, lentement) | `b3@حماهاش` | 0,03 | −12 | 0,1 | 0,5 | elle se déchire |
| S3 | `scotch` (un bout de ruban adhésif appuyé du pouce) | `i1` | 0,05 | −20 | — | 0,3 | le polaroïd est scotché |
| S3 | `crayon_carton` (crayon gras sur du carton, un mot) | `i1@ياسين` | 0,00 | −22 | 0,1 | 0,5 | « Yassine » s'écrit |
| S4 | `papier_deplie` (une carte routière qu'on déplie) | `b4@حدا` | 0,00 | −18 | 0,1 | 0,5 | le cartouche se déplie |
| S4 | `epingle` (épingle plantée dans du liège, sourd) | `b4@Bodensee` | 0,35 | −14 | — | 0,3 | l'épingle sur Friedrichshafen |
| S4 | `journal` (coupure de journal posée, trois fois) | `b4@وكنعرفوها` | 0,05 | −16 | 0,2 | 0,6 | les coupures tombent |
| S5 | `lampadaire` (ballast qui claque puis bourdonne) | `b5@نص` | 0,00 | −20 | 0,3 | 1,0 | le lampadaire s'allume |
| S5 | `roue_libre` (cliquetis de roue libre d'un vélo qui approche, irrégulier) | `b5@الليل` | 0,00 | −16 | 0,2 | 1,3 | il arrive en zigzag |
| S5 | `ebike` (léger sifflement de moteur de vélo électrique + pneus) | `b5@عندو` | 0,00 | −20 | 0,1 | 0,7 | l'autre cycliste |
| S5 | `choc_velos` (deux vélos qui se heurtent : métal, caoutchouc ; un vélo qui tombe ; une roue qui tourne dans le vide) | `b5@طاح` | 0,00 | −10 | 0,6 | 1,6 | le choc — **sans cri** |
| S5 | `gravier_genoux` (quelqu'un qui tombe à genoux sur du gravier) | `b5@طاح` | 0,22 | −16 | — | 0,4 | il est à genoux |
| S5 | `pas_incertains` (pas traînants, irréguliers, sur le bitume) | `b6@ومشى` | 0,00 | −18 | 0,3 | 0,8 | il s'éloigne en titubant |
| S6 | `herbe` (herbe haute froissée par un genou) | `b7` | −0,05 | −22 | 0,2 | 0,6 | l'autre cycliste à genoux près de lui |
| S6 | `craquement_sec` (un craquement bref et sec, comme une branche morte ; rien d'organique) | `b7@الراس` | 0,02 | −14 | — | 0,25 | la fracture se trace |
| S7 | `ambulance_arrive` (fourgon diesel qui arrive au pas et s'arrête ; **pas de sirène**) | `b8` | 0,00 | −14 | 0,3 | 1,0 | l'ambulance |
| S7 | `porte_fourgon` (porte arrière de fourgon) | `b8@للمستعجلات` | 0,25 | −18 | — | 0,4 | la porte arrière |
| S7 | `porte_auto` (porte vitrée automatique qui coulisse) | `b8@للمستعجلات` | 0,30 | −20 | 0,1 | 0,6 | l'entrée des urgences |
| S7 | `brancard_roule` (roulettes de brancard sur un seuil) | `b8@Friedrichshafen` | 0,00 | −18 | 0,2 | 0,7 | il entre |
| S8 | `lampe_stylo` (clic d'une lampe-stylo) | `b9@غير` | 0,00 | −20 | — | 0,15 | elle l'examine |
| S9 | `stylo_papier` (stylo-bille sur papier, une ligne) | `b10@وكتباتها` | 0,00 | −16 | 0,1 | 0,7 | elle écrit « Verdacht » |
| S9 | `stylo_papier` (deux signes) | `b10@بلا` | 0,00 | −20 | — | 0,3 | « CT: — » |
| S9 | `planchette` (planchette à pince accrochée à une barrière de lit, métal léger) | `b10@غير` | 0,10 | −16 | 0,2 | 0,5 | la feuille reste au pied du lit |
| S9 | `pas_sabots` (pas en sabots de bloc qui s'éloignent) | `b10@المراقبة` | 0,10 | −20 | 0,3 | 0,7 | elle sort |
| S9 | `interrupteur` (variateur : un clic) | `b10@المراقبة` | 0,12 | −22 | — | 0,15 | la lumière baisse |
| S10 | `goutte` (une goutte épaisse qui tombe dans un liquide) | `b11@الدم` | 0,00 | −14 | 0,3 | 0,5 | la première perle d'encre |
| S10 | `goutte` (deux autres, espacées de 0,7 s) | `b11@كيتجمع` | 0,10 | −16 | 0,3 | 1,4 | elle s'étale |
| S11 | `pas_sabots` (pas qui approchent) | `b12` | −0,10 | −20 | 0,1 | 0,8 | la soignante entre |
| S11 | `draps_agites` (draps froissés, un sommier à roulettes qui tressaute) | `b12@شافتو` | −0,30 | −14 | 0,3 | 1,6 | il s'agite — **aucun gémissement** |
| S12 | `pas_sabots` (un autre pas, plus lourd) | `b14` | 0,00 | −20 | 0,1 | 0,75 | l'anesthésiste entre |
| S12 | `blouse` (tissu : quelqu'un qui se penche) | `b14@شافو` | 0,00 | −24 | — | 0,4 | il le regarde |
| S12 | `autocollant_pose` (un autocollant appliqué du plat de la main sur du plastique) | `b14@خليوه` | 0,48 | −12 | — | 0,3 | « betrunken » se colle sur le lit |
| S13 | `goutte` (trois gouttes, de plus en plus rapprochées : 0,5 · 0,4 · 0,3 s) | `b15@كينعسش` | 0,00 | −14 | 0,3 | 1,3 | le sang ne dort pas |
| S13 | `bois_tension` (un bois qui travaille sous la pression : un seul craquement sourd et long) | `b15@كيضغط` | 0,05 | −16 | 0,4 | 0,8 | la boîte ne cède pas ; la ligne penche |
| S14 | `horloge_tic` (tic-tac d'une horloge murale, régulier) | `b16` | 0,00 | −18 | 0,2 | jusqu'à `b17-0.45` | les trois heures ; il s'arrête net au début de S15 |
| S14 | `pas_couloir` (quelqu'un passe dans un couloir, sans ralentir) | `b16@سوايع` | 0,00 | −22 | 0,2 | 0,9 | première ombre |
| S14 | `pas_couloir_arret` (des pas, un arrêt, des pas qui repartent) | `b16@واحد` | 0,30 | −20 | 0,2 | 1,0 | la deuxième ombre s'arrête au seuil |
| S14 | `pas_couloir` | `b16@مزيان` | 0,00 | −24 | 0,2 | 0,6 | troisième ombre |
| S15 | `course_sabots` (deux personnes qui courent en sabots sur du lino) | `b17` | −0,25 | −12 | 0,1 | 0,7 | elles arrivent en courant |
| S15 | `bouton_alarme` (gros bouton-poussoir frappé du plat de la main) | `b17@دارو` | 0,00 | −10 | — | 0,2 | l'alarme |
| S15 | `appel_rea` (sonnerie de bip d'équipe : trois notes brèves, répétées deux fois, comme dans un vrai hôpital ; pas une sirène) | `b17@دارو` | 0,15 | −16 | 0,4 | 1,6 | le gyrophare jaune |
| S15 | `ballon` (ballon de ventilation pressé : un souffle d'air, puis le retour) | `b17@Réanimation` | 0,10 | −16 | 0,2 | 0,9 | elle le ventile |
| S16 | `neon` (un tube qui s'allume : deux hésitations puis le bourdonnement) | `b18@الساعة` | 0,00 | −16 | 0,3 | 0,8 | la plaque « CT » s'allume enfin |
| S16 | `porte_lourde` (porte plombée qui s'ouvre) | `b18@دارو` | 0,00 | −16 | 0,2 | 0,5 | la porte du scanner |
| S16 | `lit_roule` (lit à roulettes poussé vite sur du lino, deux personnes) | `b18@دارو` | 0,05 | −14 | 0,2 | 0,7 | le lit roule |
| S16 | `autocollant_tombe` (un bout de papier collant qui tombe au sol) | `b18@دارو` | 0,30 | −22 | — | 0,3 | « betrunken » se détache |
| S17 | `rotor_sol` (hélicoptère au sol, rotor qui tourne, entendu de loin) | `b19@داوه` | 0,00 | −20 | 0,5 | jusqu'à `b19@end` | l'hélicoptère est alerté, il ne décolle pas |
| S17 | `crayon_pointille` (crayon qui trace des tirets sur une carte) | `b19@لسبيطار` | 0,00 | −22 | 0,1 | 0,9 | le pointillé vers Ravensburg |
| S17 | `horloge_tic` (trois tics, le dernier plus appuyé) | `b19@8:40` | −0,40 | −18 | — | 0,5 | les aiguilles s'arrêtent sur 8 h 40 |
| S19 | `lampadaire_off` (ballast qui claque à l'extinction) | `b20@قدام` | 0,00 | −22 | — | 0,2 | le lampadaire s'éteint : il fait jour |
| S19 | `pas_pave` (pas de femme sur des pavés, lents) | `b20@الطبيبة` | 0,00 | −20 | 0,2 | 1,5 | elle marche vers le tribunal |
| S20 | `papier_main` (une lettre serrée dans une main) | `b21@قبلاتش` | 0,00 | −22 | — | 0,3 | la lettre |
| S20 | `porte_double` (double porte en bois qui s'ouvre : loquet, gonds) | `b21@جلسة` | 0,00 | −12 | 0,3 | 0,7 | la salle s'ouvre |
| S20 | `ficelle_casse` (une ficelle qui casse, sec, + une étiquette en carton qui tombe) | `b21@جلسة` | 0,12 | −16 | — | 0,4 | la ficelle casse |
| S21 | `page` (une page tournée) | `b22@المتهمة` | 0,20 | −24 | — | 0,3 | la juge |
| S21 | `sanglot_etouffe` (un sanglot de femme retenu dans un mouchoir + un reniflement d'homme ; très discret) | `b22@وكيبكيو` | 0,00 | −18 | 0,4 | 1,2 | les parents |
| S21 | `banc_craque` (un banc de bois qui craque quand on se penche) | `b22@وكيبكيو` | 0,30 | −22 | — | 0,4 | le père se penche vers elle |
| S22 | `neon` (allumage d'un caisson lumineux) | `b23@قالو` | 0,00 | −18 | 0,2 | 0,5 | la rangée du haut |
| S22 | `neon` | `b23@بحال` | 0,00 | −18 | 0,2 | 0,5 | la rangée du bas |
| S22 | `toc_caisson` (un petit marteau en caoutchouc qui tapote une vitre, deux coups) | `b23@8` | 0,00 | −20 | — | 0,3 | il montre la tache |
| S23 | `plume` (stylo-plume qui gratte) | `b24@والقاضية` | 0,00 | −22 | 0,1 | 0,6 | elle écrit |
| S23 | `horloge_tic` (un seul tic appuyé) | `b24@3` | 0,35 | −16 | — | 0,15 | l'horloge s'arrête sur 3 h |
| S23 | `neon` | `b24@Scanner` | 0,00 | −18 | 0,2 | 0,5 | la plaque « CT » |
| S23 | `stylo_pose` (stylo posé sur du bois) | `b24@ضروري` | 0,20 | −22 | — | 0,2 | elle pose sa plume |
| S24 | `grille_legere` (la même qu'en S1) | `b25@4` | 0,40 | −12 | 0,5 | 1,0 | la grille tombe |
| S24 | `portillon` (charnière de petit portillon de fer qui s'ouvre) | `b25@sursis` | 0,00 | −14 | 0,2 | 0,6 | elle s'ouvre : sursis |
| S24 | `billets` (quatre billets comptés un à un, papier-monnaie) | `b26@و20000` | 0,00 | −14 | 0,1 | 1,0 | quatre versements |
| S25 | `feuille_posee` (feuille épaisse glissée dans un support) | `b27@والحكم` | 0,00 | −20 | — | 0,3 | le jugement |
| S25 | `plume` (une signature) | `b27@والحكم` | 0,10 | −18 | 0,1 | 0,5 | la signature |
| S25 | `goutte_papier` (une goutte qui tombe sur du papier, mat) | `b27@نهائي` | 0,30 | −20 | — | 0,2 | l'encre n'est pas sèche |
| S25 | `pinces_fil` (trois pinces à linge qui glissent sur un fil) | `b27@وما` | 0,00 | −20 | 0,1 | 0,5 | les coupures de presse |
| S26 | `carton_pose` (une fiche cartonnée posée) | `b28@ضربة` | 0,05 | −20 | — | 0,3 | carte 1 |
| S26 | `carton_pose` | `b28@ولا` | 0,05 | −20 | — | 0,3 | carte 2 |
| S26 | `neon` + `porte_lourde` | `b28@Scanner` | 0,00 | −14 | 0,3 | 0,6 | « CT » s'allume, la porte s'ouvre |
| S27 | `feuille_posee` | `b29` | 0,05 | −20 | — | 0,3 | la feuille de surveillance |
| S27 | `stylo_coche` (une coche au stylo-bille) | `b29@فيّقو` | 0,00 | −18 | — | 0,15 | conscience |
| S27 | `lampe_stylo` | `b29@شوف` | 0,00 | −20 | — | 0,15 | les pupilles |
| S27 | `stylo_coche` | `b29@pupilles` | 0,00 | −18 | — | 0,15 | pupilles |
| S27 | `stylo_papier` (cinq chiffres) | `b29@وكتب` | 0,00 | −16 | 0,1 | 0,35 | l'heure |
| S27 | `stylo_papier` (série rapide) | `b29@الساعة` | 0,00 | −18 | 0,1 | 0,45 | les rangées suivantes |
| S28 | `feuille_bloc` | `b30@زميل` | 0,00 | −20 | — | 0,3 | la feuille « Rat » revient |
| S28 | `elastique_tend` (un élastique qu'on étire) | `b30@المسؤولية` | 0,00 | −20 | — | 0,45 | l'étiquette part |
| S28 | `elastique_claque` (l'élastique lâché : un claquement sec contre du carton) | `b30@كتبقى` | 0,00 | −10 | — | 0,25 | elle revient |
| S29 | `autocollant_decolle` (un coin d'autocollant qu'on décolle lentement) | `b31@5` | 0,00 | −14 | 0,1 | 0,5 | « Verdacht » reparaît |
| S30 | `feutre_carton` (feutre sur carton, deux lignes) | `b31@end` | 2,80 | −22 | 0,2 | 0,8 | la question s'écrit |

Rien sur : les lavis d'encre, la ligne, l'horloge de la ligne (sauf le tic-tac de S14), les pastilles, les
médaillons, les rayons, le cœur et le bouton de l'intro, la barre de balayage du scanner (c'est l'ambiance
`scanner` qui la porte), le dézoom de l'affiche.

## 4. Le moniteur (synthétisé : `son/bip_moniteur.py`, sinus 1 kHz, bips de 70 ms)

Le patient est branché à un moniteur (sourcé). Son bip est le fil sonore de la nuit ; il doit être assez bas
pour qu'on l'oublie, et assez présent pour qu'on entende qu'il s'arrête.

| Séquence | De | À | Rythme | Niveau | Remarque |
|---|---|---|---|---|---|
| le box, « dehors » | `b9+0.3` | `b11-0.30` | 76 bips/min, régulier | −30 sous la voix | S8, S9 |
| « dedans » | `b11-0.30` | `b12-0.15` | le même | −36, filtré (passe-bas 800 Hz) | S10 |
| le box | `b12-0.15` | `b15-0.30` | le même (**il n'accélère pas** quand le garçon s'agite : rien n'est publié) | −30 | S11, S12 |
| « dedans » | `b15-0.30` | `b16-0.08` | le même | −36, filtré | S13 |
| trois heures | `b16-0.08` | `b17-0.45` | le même | −28 | S14 ; pendant la respiration de la voix, on n'entend que lui et l'horloge |
| 6 h | `b17-0.45` | `b18@Scanner-0.10` | le même, **sans alarme** | −32 | S15, début de S16 ; il s'arrête quand la ligne monte |
| **scène muette** | `b19@end+0.45` | — | **trois bips**, de plus en plus espacés : à `b19@end+0.45`, `b19@end+1.0`, `b19@end+1.65` ; le troisième à −3 dB | −22 dBFS | calés à l'image près sur les trois complexes de la ligne |
| ligne plate | `b19@end+2.05` | `b20-0.25` | **note tenue** à 1 kHz, attaque douce (80 ms), qui s'éteint en 0,8 s à partir de `b19@end+2.15` (quand la ligne se redresse) | −26 dBFS → silence | puis 0,2 s de silence complet avant les merles de S19 |
| dernière image | `b31-0.3` | `b31@end+0.15` | 60 bips/min | −34 | S29 : il dort ; le bip continue 0,3 s sous l'affiche puis s'efface |

À recaler dès que `timings.js` change (les trois bips doivent tomber sur les trois complexes de S18).

## 5. Musique (ElevenLabs Music, `composition_plan`, à composer sur la frise RÉELLE après la voix)

**Un violoncelle seul, d'un bout à l'autre.** Pas de piano (c'est AKTE 04), pas de nappe de cordes ni de
tic-tac musical (AKTE 05), pas de pizzicati mécaniques (AKTE 06), pas de contrebasse jazz (AKTE 07), pas de
clarinette (AKTE 08). Prise de son proche, sèche, on entend l'archet et la respiration du musicien.
**Deux registres pour deux récits** : le dehors = le médium et l'aigu (phrases courtes, chantées) ; le dedans =
la corde de do à vide, grave, tenue, presque sans vibrato — elle entre à chaque « من الداخل » et monte d'un cran à
chaque fois. Tempo libre, autour de 52 à la noire. Tonalité : ré mineur. Niveau ≈ −25 dBFS, −7 dB sous la voix.

Négatifs à donner au modèle : percussion, impacts, booms, risers, whooshes, swells, beeps, nappes de
synthétiseur, piano, chœur, batterie, basse électrique, réverbération de cathédrale.

| Section | De | À | Durée prov. | Ce qu'on entend | Intensité |
|---|---|---|---|---|---|
| M1 — accroche | `0` | `i1-0.30` | 8,9 s | une note grave attaquée dès la première image (la lettre), puis un motif de trois notes qui DESCEND (ré – do – la) sur « 15 شهر » ; il reste suspendu sur la feuille déchirée | 5/10 |
| M2 — intro | `i1-0.30` | `b4-0.30` | 9,5 s | le même violoncelle, plus chaud : une phrase simple en majeur relatif, archet léger, deux pizzicati sur `i3@j'aime` et `i3@abonne` (ce sont des notes, pas des effets) | 3/10 |
| M3 — le lac, la route | `b4-0.30` | `b7-0.30` | 8,6 s | le motif descendant revient, lent, dans le médium ; une note tenue sur la brume ; **silence d'une demi-seconde au choc** (`b5@طاح`), puis une note seule, hésitante | 3/10 |
| M4 — la nuit, deux voix | `b7-0.30` | `b16-0.08` | 23,7 s | alternance stricte. À `b7-0.30`, `b11-0.30`, `b15-0.30` : **la corde grave entre seule** (do à vide tenu, sul tasto), un peu plus fort à chaque fois (pp, p, mp) et, la troisième fois, avec un léger tremolo d'archet sur `b15@كيضغط`. À `b8-0.15`, `b12-0.15` : le médium reprend, phrases de deux ou trois notes qui ne se terminent pas. Sur b13–b14, une phrase un peu plus chantée (l'espoir du conseil) qui retombe sur « ينعس » | 3 → 5/10 |
| M5 — trois heures | `b16-0.08` | `b17-0.45` | 2,5 s | la corde grave et une harmonique aiguë très lointaine, ensemble, tenues ; elles s'effacent pendant la respiration de la voix : à la fin, il ne reste que l'horloge et le moniteur | 2 → 0/10 |
| M6 — 6 h | `b17-0.45` | `b19@end` | 8,6 s | l'archet revient d'un coup, serré, notes répétées dans le grave (détaché), de plus en plus pressé jusqu'au scanner ; à `b18@بان` une seule longue note aiguë, nue ; sur la carte, le motif descendant, une dernière fois, s'arrête sur l'avant-dernière note à « 8:40 » | 6 → 4/10 |
| M7 — silence | `b19@end` | `b20-0.25` | 3,1 s | **RIEN.** Pas une note. Seuls les trois bips, la note tenue du moniteur, puis le silence complet | 0/10 |
| M8 — le tribunal | `b20-0.25` | `b25-0.2` | 14,0 s | reprise très douce, en doubles cordes lentes (un choral à deux voix), lumière de matin ; une respiration sur `b22@وكيبكيو` (un temps de silence) ; plus de corde grave seule : le dedans est connu | 3/10 |
| M9 — la peine, le statut | `b25-0.2` | `b28-0.2` | 7,8 s | notes isolées, espacées ; un petit élan sur la grille qui s'ouvre (`b25@sursis`) qui ne résout pas ; sur b27, une note tenue qui reste en l'air (rien n'est définitif) | 3/10 |
| M10 — la règle | `b28-0.2` | `b31-0.3` | 10,3 s | un pizzicato calme et régulier (une note par temps) + une ligne d'archet simple par-dessus (re-recording autorisé : c'est toujours un seul instrument) ; ferme, sans triomphe ; un accent sur `b30@كتبقى` | 4/10 |
| M11 — la dernière phrase, l'affiche | `b31-0.3` | fin | 8,1 s | silence sur « السكران كيفيق… » ; la corde grave du dedans revient seule sur `b31@إلا` ; le motif descendant, complet cette fois, sur l'affiche ; dernière note qui s'éteint avant la fin | 2 → 3 → 0/10 |

## 6. Silences voulus (ne pas les combler)

- le souffle avant chaque « من الداخل » (0,28 s) : la musique du dehors s'arrête, la corde grave n'est pas
  encore entrée ;
- au choc des vélos (`b5@طاح`) : une demi-seconde sans musique ;
- la respiration après « 3 سوايع » (`b16@end` → `b17`) : horloge et moniteur seuls ;
- la scène muette (`b19@end` → `b20-0.25`) : ni musique, ni ambiance ; trois bips, une note, puis rien ;
- avant la dernière phrase (`b31-0.3` → `b31`) : rien.

## 7. Mixage et suite

- Ordre : voix (−15 LUFS) → moniteur → ambiances → bruitages → musique ; ducking de la musique −7 dB sous la
  voix (attaque 60 ms, retour 350 ms) ; pas de ducking dans la scène muette (il n'y a pas de voix).
- Filtre « dedans » : appliqué aux pistes `box_nuit`, `nuit_campagne` et moniteur pendant S6, S10, S13 ; les
  gouttes et la corde grave restent pleines.
- Sortie : `loudnorm` deux passes −14 LUFS, crête −1,5 dB ; remuxage sur la vidéo rendue (`-c:v copy`).
- À refaire après la vraie voix : `timings.js` → repères de ce plan (`tools/cuetimes.mjs`) → `bip_moniteur.py`
  → durées des onze sections de musique (les RECOMPOSER, ne pas étirer).
- ElevenLabs `sound-generation` : 4 requêtes en parallèle au plus, `duration_seconds` ≥ 0,5 ; écouter chaque
  son : tout ce qui ressemble à un effet (montée, souffle, impact « cinéma ») est refait ou supprimé.
