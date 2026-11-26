# AKTE 05 — « بوحدهم فالليل » (Krefeld, 2008) — PLAN SON

**Rien n'est généré maintenant.** Ce plan se lit avec `storyboard.md` (mêmes numéros de scènes, mêmes repères) et sera
exécuté après la vraie voix : `montage_voix.py` remplacera `timings.js`, puis on écrira `son/plan_bruitages.py`,
`son/bip_moniteur.py`, `son/musique_plan.json` et `son/mixage.py` sur le modèle d'AKTE 02 / 03.
Tous les instants ci-dessous sont PROVISOIRES (92,2 s + 5,5 s d'affiche) ; seuls les repères comptent.

> **À REFAIRE avant toute génération (contrôle des ressemblances, 26.11.2026 — `storyboard.md` fait foi).**
> 1. Il n'y a plus de moniteur dans la chambre du patient ni de ligne plate (c'est la scène muette d'AKTE 02 / 03) :
>    les lignes « moniteur (synthétisé) » de S12, S14 et S15, le § 4 et `son/bip_moniteur.py` tombent. À la place,
>    aux MÊMES instants : S12 = la goutte de la perfusion (une goutte / 0,6 s, très bas) ; S14 = les derniers tics de
>    l'horloge qui s'espacent (`b14@end-0.70`, `-0.05`, `+0.65`) ; S15 = une dernière goutte à `b14@end+1.50`, puis
>    plus rien (l'interrupteur à `+0.95` reste).
> 2. S3 : plus d'éphéméride (pas de feuilles arrachées) ; la petite fenêtre s'allume et s'éteint trois fois, sans son.
> 3. S21 : plus de loupe ni de tampon ; une tache de lumière glisse sur la feuille, sans son (garder le papier posé).
> 4. S24 : le formulaire est sur une planchette pendue au mur (planchette contre le mur, stylo au bout de sa
>    ficelle) ; plus de tasse ni de bannette posée : un casier mural (clapet métallique).

## 1. Principes

- **Sons NATURELS seulement** : les vrais bruits de ce qu'on voit (interrupteur, pas, roulettes, papier, combiné,
  stylo, billets, chaise). **Jamais** de pop, whoosh, ding, carillon, buzzer, « reveal », swell, boom, souffle de
  transition. Les entrées `iris` et les éclats de fenêtre sont MUETS. La caméra-ascenseur est MUETTE (aucun moteur,
  aucun glissement).
- Deux exceptions qui restent des sons de la scène, pas des effets : la **tonalité d'appel** dans l'écouteur du
  téléphone (S13, S23) et le **moniteur** du patient (synthétisé, § 4). Le bip de ceinture ne « bipe » pas : il VIBRE.
- Niveaux : exprimés en dB SOUS la voix (voix à −15 LUFS) ; bruitages entre −10 et −25, ambiances entre −26 et −30.
  Jamais un bruit plus fort que −10 sous la voix, sauf pendant la scène muette (valeurs en dBFS).
- Ton de l'épisode (fiche `SAISON-2.md`) : **tension lente, tic-tac, cordes tenues**. Le tic-tac est un VRAI bruit
  d'horloge murale (bruitage), il n'est pas dans la musique.
- Colonne « fin » : fondu de sortie en secondes ; « max » : durée maximale gardée.

## 2. Ambiances (lits continus)

| Clé | Ce que c'est | De | À | Niveau | Remarque |
|---|---|---|---|---|---|
| `nuit_dehors` | extérieur de nuit : ville très lointaine, vent léger, un ou deux bruits de feuilles | `0` | `i1` | −28 | fondu d'entrée 0,2 s, de sortie 0,5 s sous l'intro |
| `hopital_nuit` | hôpital la nuit, de l'intérieur : ventilation basse, néon, un chariot très loin | `b6` | `b14@end+0.3` | −28 | lit de toute la nuit (S6–S14) ; baisse de 4 dB dans les pièces (S8, S9, S12, S13) ; fondu de sortie 1,0 s vers le silence |
| `horloge_tic` | horloge murale, tic-tac lent et régulier (1 par seconde) | `b6` | `b14@end+0.9` | −22 | **la signature sonore** ; de `b14@end` à `b14@end+0.9` les trois derniers tics s'espacent (0,7 · 0,9 · 1,2 s) puis plus rien : l'horloge du bandeau s'arrête au même instant |
| `salle_audience` | grande salle boisée, de jour : bancs qui craquent, une toux lointaine, papiers | `b15` | `b20@end` | −28 | entre sèchement après le silence (pas de fondu long) |
| `hopital_nuit` | le même lit | `b23` | `b25@ولكن` | −30 | la règle se passe au poste de nuit (S23, S24), puis la coupe (S25) |
| `salle_audience` | le même lit | `b25@ولكن` | `b25@end+0.15` | −28 | dernière image |

Aucune ambiance sous l'intro (S4), la carte (S5 : seulement le vent de `nuit_dehors` à −30 de `b5` à `b6`), la
planche de la règle médicale (S22) et l'affiche.

## 3. Bruitages par scène

Format prévu pour `plan_bruitages.py` : (son, repère, décalage s, niveau dB sous la voix, fin s, max s).

| Scène | Son | Repère | Décalage | Niveau | Fin | Max | Ce qu'on voit |
|---|---|---|---|---|---|---|---|
| S1 | `interrupteurs` (rangée d'interrupteurs qui claquent en cascade) | `b1@0` | 0,00 | −16 | 0,2 | 0,8 | les fenêtres écrivent « 7500 » |
| S1 | `interrupteur_seul` | `b1@5` | 0,00 | −18 | — | 0,2 | le battement des vitres sur « القتل » |
| S1 | `papier_tremble` (feuille qui tremble dans une main) | `b1@5` | 0,10 | −18 | 0,4 | 2,5 | la feuille du jugement |
| S2 | `interrupteurs` (cascade plus longue, plus serrée) | `b3` | 0,25 | −18 | 0,3 | 1,7 | les 105 fenêtres s'allument une à une |
| S2 | `porte_auto` (porte vitrée automatique qui coulisse) | `b3@2` | −0,05 | −18 | 0,2 | 0,6 | ils sortent |
| S2 | `pas_lino_2` (deux personnes, quelques pas) | `b3@2` | 0,10 | −22 | 0,2 | 0,6 | idem |
| S3 | `piece_nuit` (ventilation d'une petite pièce, très bas) | `b4` | 0,00 | −30 | 0,4 | 3,2 | la pièce de garde |
| S3 | `ephemeride` (trois feuilles d'éphéméride arrachées) | `b4@7` | 0,00 | −14 | 0,2 | 0,6 | « كل نهار » |
| S4 | `badge_cordon` (mousqueton + carte plastique qui tape deux fois) | `i1` | 0,30 | −18 | 0,3 | 0,9 | le badge tombe et pend |
| S5 | `epingle` (épingle plantée dans du liège, sourd) | `b5@Krefeld` | 0,35 | −14 | — | 0,3 | l'épingle sur Krefeld |
| S5 | `interrupteur_seul` | `b5@Krefeld` | 0,38 | −18 | — | 0,2 | sa fenêtre s'allume |
| S5 | `journal` (coupure de journal posée, papier sec) | `b5@كيما` | 0,40 | −14 | 0,2 | 0,6 | la coupure tombe |
| S6 | `interrupteurs` (quatre claquements espacés) | `b6` | 0,40 | −18 | 0,2 | 0,5 | les pièces s'allument de bas en haut |
| S6 | `porte_palier` (porte coupe-feu d'escalier, lourde) | `b6@4` | −0,10 | −18 | 0,3 | 0,7 | ils entrent par l'escalier |
| S6 | `pas_lino_2` | `b6@4` | 0,00 | −20 | 0,2 | 0,8 | ils marchent |
| S7 | `course_escalier` (deux personnes qui dévalent un escalier en béton, baskets) | `b7@5` | 0,15 | −16 | 0,2 | 0,9 | premier « وزيد » |
| S7 | `respirateur` (soufflet de respirateur, deux cycles) | `b7@Intensivstation` | 0,10 | −24 | 0,5 | 1,4 | l'Intensivstation |
| S7 | `course_escalier` | `b7@9` | 0,15 | −16 | 0,2 | 0,9 | second « وزيد » |
| S7 | `rideau_roulant` (rideau métallique qui se lève) | `b7@المستعجلات` | −0,20 | −16 | 0,2 | 0,6 | la Liegendanfahrt |
| S7 | `ambulance_arrive` (fourgon diesel qui entre au pas dans un garage, frein, sans sirène) | `b7@المستعجلات` | 0,00 | −14 | 0,4 | 1,2 | l'ambulance entre |
| S8 | `portes_battantes` | `b8` | 0,05 | −16 | 0,3 | 0,8 | le brancard pousse les portes |
| S8 | `brancard_roues` (brancard qui roule, roulettes qui cliquettent, arrêt) | `b8` | 0,05 | −14 | 0,2 | 1,0 | le brancard entre |
| S8 | `bloc_notes` (planchette à pince passée de main en main) | `b8@عندو` | −0,10 | −20 | — | 0,4 | le protocole |
| S8 | `pas_lino_1` (une personne s'éloigne) | `b8@فيه` | 0,20 | −22 | 0,3 | 0,7 | l'ambulancière repart |
| S9 | `drap_bras` (drap froissé, un bras qui retombe contre le métal du brancard, sourd) | `b9@كيدخل` | 0,10 | −16 | 0,2 | 0,6 | le bras glisse |
| S9 | `seringue` (capuchon retiré, petit clic plastique) | `b9@كتعطيه` | −0,10 | −18 | — | 0,4 | l'insuline |
| S10 | `bip_vibreur` (bip de ceinture qui VIBRE contre une boucle, deux fois) | `b10` | 0,00 | −16 | 0,1 | 0,6 | son bip |
| S10 | `course_couloir` (course en baskets sur lino) | `b10@المرضى` | 0,00 | −18 | 0,1 | 0,75 | elle traverse l'étage |
| S10 | `course_escalier` | `b10@المرضى` | 0,75 | −16 | 0,2 | 0,6 | étage 2 → 1 |
| S10 | `course_escalier` | `b10@المرضى` | 1,80 | −16 | 0,2 | 0,6 | étage 1 → 0 |
| S10 | `horloge_remontoir` (aiguilles qu'on fait tourner vite : cliquetis du mécanisme) | `b10@8` | 0,00 | −12 | 0,1 | 0,6 | **premier saut « + 2 h »** |
| S10 | `rideau_roulant` + `ambulance_arrive` | `b10@كل` | 0,00 | −20 | 0,4 | 1,0 | une autre ambulance (loin) |
| S11 | `horloge_remontoir` | `b11` | 0,10 | −12 | 0,1 | 0,6 | **deuxième saut** |
| S11 | `ambulance_porte` (porte arrière de fourgon qui claque) | `b11@وهي` | 0,45 | −18 | — | 0,4 | en bas, pendant qu'elle est ailleurs |
| S12 | moniteur (synthétisé, § 4) | `b12` | — | −26 | — | — | le moniteur de la chambre |
| S12 | `autopiqueur` (clic sec d'un autopiqueur) | `b12` | 0,25 | −14 | — | 0,2 | elle pique le doigt |
| S12 | `bandelette` (petite pièce plastique enfoncée) | `b12@Schnelltest` | 0,05 | −18 | — | 0,3 | la bandelette entre |
| S12 | `tube_verre` (tube de verre qui tinte dans son portoir) | `b12@laboratoire` | 0,00 | −16 | 0,3 | 0,5 | le tube vide reste là |
| S13 | `combine_mur` (combiné plastique qui cogne doucement un mur, cordon qui se détend) | `b13` | 0,35 | −18 | 0,3 | 0,9 | le combiné pend |
| S13 | `tonalite` (tonalité d'appel entendue DANS l'écouteur, lointaine : deux « tuut ») | `b13@الطبيب` | 0,00 | −18 | 0,05 | 1,7 | on sonne — coupée net à `b13@7` : personne |
| S14 | `horloge_remontoir` | `b14@2` | 0,00 | −12 | 0,1 | 0,6 | **troisième saut** |
| S14 | moniteur (synthétisé, § 4) | `b14@end` | −0,70 | — | — | — | le moniteur du Zimmer ralentit |
| S14 | `interrupteur_seul` | `b14@end` | 0,95 | −20 dBFS (voix absente, § 4) | — | 0,2 | **la lumière de sa chambre s'éteint** |
| S15 | moniteur (synthétisé, § 4) | `b14@end` | 1,50 puis 2,00 | — | — | — | dernier bip, puis ligne plate |
| S16 | `chaise_bois` (deux chaises qu'on tire, on s'assoit) | `b15` | 0,40 | −20 | 0,3 | 0,8 | les deux accusés |
| S16 | `papiers_juge` (feuilles tournées) | `b15@قدام` | 0,00 | −22 | 0,3 | 0,7 | le juge lève les yeux |
| S17 | `sachet` (sachet plastique soulevé, froissé) | `b16@Schnelltest` | 0,00 | −16 | 0,2 | 0,6 | la pièce à conviction |
| S17 | `tube_verre` | `b16@وما` | 0,00 | −18 | 0,2 | 0,4 | le tube vide |
| S18 | `feutre` (feutre épais qui trace un cercle sur un panneau) | `b17@السبيطار` | 0,00 | −16 | 0,1 | 0,5 | le cercle jaune |
| S18 | `baguette_tableau` (baguette en bois qui tape un panneau, deux coups) | `b17@schweres` | 0,00 | −12 | — | 0,5 | il tape le schéma |
| S19 | `papiers_juge` | `b18` | 0,20 | −22 | 0,2 | 0,5 | il lève la feuille |
| S19 | `chaise_parquet` (chaise repoussée sur un parquet, quelqu'un se lève) | `b18@عليها` | 0,00 | −12 | 0,2 | 0,7 | **elle se lève, seule** |
| S20 | `billets` (billets comptés et posés un à un, 15 fois) | `b19@1` | 0,00 | −14 | 0,2 | 2,9 | les quinze billets (à resserrer sur la cadence réelle de l'image) |
| S20 | `pas_parquet` (pas qui s'éloignent sur un parquet) | `b19@Assistenzarzt` | 0,00 | −20 | 0,3 | 1,5 | le collègue marche vers la porte |
| S20 | `porte_bois` (porte en bois qui s'ouvre, poignée) | `b19@Freispruch` | 0,10 | −16 | 0,3 | 0,9 | il sort |
| S21 | `feuille_table` (feuille posée à plat sur du bois) | `b20` | 0,25 | −18 | — | 0,3 | le jugement sur la table |
| S22 | `tube_verre` | `b21@خاصو` | 0,00 | −16 | 0,2 | 0,4 | le tube du laboratoire |
| S22 | `horloge_tic` (quatre tics nets, un par marque) | `b22@كل` | 0,00 | −16 | 0,1 | 1,3 | « toutes les heures » |
| S23 | `combine_decroche` (combiné décroché de son support) | `b23@عيّط` | −0,05 | −14 | — | 0,3 | tu décroches |
| S23 | `tonalite` (deux « tuut ») | `b23@عيّط` | 0,25 | −18 | 0,05 | 0,9 | pas de réponse (coupée à `b23@لقيتيهش`) |
| S23 | `tonalite` (un « tuut ») + `combine_decroche` (on répond : clic) | `b23@طلع` | 0,10 | −18 / −14 | — | 0,5 | l'échelon du dessus décroche à `b23@فوق` |
| S24 | `stylo_ecrit` (stylo-bille qui écrit vite sur du papier) | `b24@Überlastungsanzeige` | 0,30 | −14 | 0,2 | 1,8 | tu remplis le formulaire |
| S24 | `bannette` (feuille glissée dans une bannette plastique) | `b24@للإدارة` | 0,10 | −18 | — | 0,4 | pour l'administration |
| S24 | `stylo_coche` (un trait de stylo, sec) | `b24@فخطر` | 0,00 | −12 | — | 0,2 | la case cochée |
| S25 | `feutre` | `b25@غلط` | 0,00 | −18 | 0,1 | 0,5 | le cercle autour de l'hôpital |
| S26 | `chaise_parquet` | `b25@كتوقف` | 0,00 | −12 | 0,3 | 0,7 | **tu te lèves** |
| affiche | — | — | — | — | — | — | aucun bruitage (la musique finit seule) |

Pas de son pour : les pastilles, les rubans, les fanions, les cercles d'ondes, la jauge, les zooms, les transitions.

## 4. Le moniteur (synthétisé — `son/bip_moniteur.py`, à écrire après la voix)

Comme dans AKTE 02 / 03 : sinus 1 kHz + harmonique 2 kHz à 0,18, bip de 0,11 s (attaque 8 ms, chute 12 ms), mono
48 kHz, calé sur les MÊMES instants que l'image (`storyboard.md`, S12, S14, S15).

| Moment | Instants | Niveau | Image |
|---|---|---|---|
| S12 (la chambre, pendant la voix) | un bip toutes les 1,1 s de `b12+0.2` à `b12@end` | −26 dB sous la voix | tracé de `D.moniteurMural` |
| S14 (la voix finit) | `b14@end-0.70` · `b14@end-0.05` | −22 puis −20 dB sous la voix | mini-moniteur du Zimmer (la caméra y monte à `b14@ومن`) |
| silence | `b14@end+0.65` · `b14@end+1.50` (les intervalles s'allongent : 0,65 · 0,70 · 0,85 s) | −24 dBFS crête | Zimmer, puis moniteur mural de S15 |
| ligne plate | de `b14@end+2.0` (`quiet`) pendant 1,45 s, fondu de sortie 0,5 s — fini 0,15 s avant `b15` | −28 dBFS | ligne plate, la couleur s'éteint |

Pendant le silence (de `b14@end` à `b15`, ≈ 3,6 s) on n'entend QUE : les trois derniers tics de l'horloge qui
s'espacent (jusqu'à `+0.9`), l'interrupteur de la chambre (`+0.95`, −20 dBFS, sec), deux bips, la ligne plate, et
une seule note tenue de la musique (§ 5). Aucun autre bruit : ni pas, ni porte, ni respiration.
Si le silence monté ne fait pas 3,2 s, tous ces décalages se compriment en proportion (comme dans le storyboard).

## 5. Musique (une composition par sections, calée sur la frise)

Outil prévu plus tard : ElevenLabs Music, `composition_plan` (`son/musique_plan.json`). À RECOMPOSER dès que la
durée change. Niveau ≈ −25 dBFS, −7 dB de ducking sous la voix.

**Styles globaux (positifs)** : cinematic documentary underscore · true story narration bed · instrumental ·
slow-burning tension · night stillness · sustained muted strings (con sordino) · low cello drone · sparse felt piano ·
soft pizzicato pulse like a slow heartbeat · clean mix with space for a voice-over.
**Négatifs globaux** : vocals · choir · lyrics · drums · EDM · trailer impacts · whooshes · risers · sound effects ·
clock sound effects · beeps · alarms · loud cymbals · happy upbeat pop.

| # | Section | De → à (provisoire) | Durée (ms) | Ambiance, instruments | Intensité (0–5) |
|---|---|---|---|---|---|
| 1 | Accroche — le chiffre dans les fenêtres | `0` → `i1` (0,00 → 10,65) | 10 650 | une note de violoncelle tenue dès la première image, cordes aiguës en sourdine qui entrent sur « القتل », pouls de pizzicati très lent (≈ 50 à la minute) ; pas de mélodie | 3 |
| 2 | Intro de l'auteur | `i1` → `b5` (10,65 → 19,55) | 8 900 | piano feutré chaud, léger, accueillant ; les cordes se retirent | 2 |
| 3 | La nuit commence | `b5` → `b8` (19,55 → 31,80) | 12 250 | retour des cordes tenues, graves, calmes ; le pouls de pizzicati reprend, régulier ; une note de piano isolée à chaque étage nommé (b7) | 2 → 3 |
| 4 | La nuit se resserre | `b8` → `b14` (31,80 → 51,12) | 19 320 | la même tenue, un demi-ton plus haut toutes les 6–7 s ; trémolo de cordes très doux sous b11–b13 ; le pouls accélère à peine ; aucune percussion | 3 → 4 |
| 5 | Seuls, puis le silence | `b14` → `b15` (51,12 → 56,81) | 5 690 | tout se retire en 2 s ; à partir de `b14@end` il ne reste qu'UNE note aiguë tenue (harmonique de violon), à peine audible (−34 dBFS), qui s'éteint avant `b15` | 4 → 0 |
| 6 | Le tribunal | `b15` → `b19` (56,81 → 71,35) | 14 540 | cordes graves lentes, solennelles ; accords de piano espacés et lourds ; un accord plus plein sur « ولكن المحكمة » (b18), sans coup | 3 |
| 7 | La sanction, le statut | `b19` → `b21` (71,35 → 76,64) | 5 290 | dépouillé, amer : piano seul, notes détachées (une par mesure) ; rien sur b20 qu'une tenue | 2 |
| 8 | La règle | `b21` → `b25` (76,64 → 88,47) | 11 830 | plus clair, résolu : cordes plus chaudes, le pouls de pizzicati revient régulier et CALME (c'est le « toutes les heures »), petit motif de piano qui monte | 3 |
| 9 | Dernière phrase et affiche | `b25` → fin (88,47 → 97,67) | 9 200 | un accord grave tenu sur « السبيطار… », silence d'un souffle, puis l'accord final sur « كتوقف » ; résolution douce au piano pendant l'affiche, dernière note qui meurt avant la fin | 4 → 1 |

Total : 97 670 ms (voix 92,17 s + affiche 5,5 s). Avec la vraie voix (probablement 94–96 s), recalculer chaque durée
à partir des repères de la colonne « De → à ».

Points de calage à respecter dans la composition : le premier temps fort dès 0,15 s (le chiffre) ; un creux d'une
demi-seconde à `b4@end` (avant l'intro) ; le retrait complet à `b14@end` ; la reprise à `b15` (pas avant : la phrase
écrite « مات » se lit dans le silence) ; l'accord final sur `b25@كتوقف`.

## 6. Sons à générer plus tard (liste et consignes)

ElevenLabs `sound-generation`, 4 requêtes en parallèle au plus, `duration_seconds` ≥ 0,5 ; consignes en anglais,
toujours avec « no music, no reverb tail, close and dry » ; réécouter chacun : s'il sonne comme un effet (pop,
whoosh, ding), le refaire ou le remplacer par une prise réelle.

| Clé | Consigne | Durée |
|---|---|---|
| `nuit_dehors` | quiet night outside a building, very distant city hum, light wind, no cars passing, no voices | 12 s |
| `hopital_nuit` | hospital corridor at night from inside, low ventilation hum, faint fluorescent buzz, a cart rolling far away once | 30 s (bouclé) |
| `piece_nuit` | small staff room at night, soft ventilation, almost silent | 4 s |
| `horloge_tic` | old wall clock ticking slowly, one tick per second, close, dry | 12 s (bouclé) |
| `horloge_remontoir` | clock hands being turned fast by hand, mechanical ratchet clicking, short | 0,7 s |
| `interrupteurs` | a row of old light switches flipped quickly one after another, plastic clicks | 2 s |
| `interrupteur_seul` | one wall light switch flipped off, dry click | 0,5 s |
| `papier_tremble` | a single sheet of paper trembling in a hand, light rustle | 3 s |
| `porte_auto` | automatic glass sliding door opening, soft motor | 0,8 s |
| `porte_palier` | heavy stairwell fire door pushed open | 0,8 s |
| `pas_lino_1` · `pas_lino_2` | one person / two persons walking a few steps in sneakers on linoleum | 1 s |
| `course_couloir` | one person running in sneakers on a linoleum hospital corridor | 1 s |
| `course_escalier` | two people running down a concrete stairwell in sneakers, slight echo | 1 s |
| `respirateur` | intensive care ventilator bellows, two slow cycles, soft | 1,5 s |
| `rideau_roulant` | metal roller shutter going up | 0,8 s |
| `ambulance_arrive` | diesel van driving slowly into a garage and braking, no siren, no horn | 1,5 s |
| `ambulance_porte` | rear door of a van slammed shut | 0,5 s |
| `portes_battantes` | hospital swing doors pushed open and flapping back | 1 s |
| `brancard_roues` | hospital stretcher rolling on a hard floor, rattling wheels, coming to a stop | 1,2 s |
| `bloc_notes` | clipboard with paper handed over | 0,5 s |
| `drap_bras` | bed sheet rustle and an arm dropping softly against a metal rail | 0,7 s |
| `seringue` | plastic syringe cap pulled off, small click | 0,5 s |
| `bip_vibreur` | small pager vibrating twice against a belt buckle, no beep | 0,7 s |
| `autopiqueur` | lancing device click, sharp and tiny | 0,5 s |
| `bandelette` | small plastic strip pushed into a slot | 0,5 s |
| `tube_verre` | glass test tube clinking in a plastic rack | 0,5 s |
| `combine_mur` | plastic telephone handset knocking softly against a wall, coiled cord stretching | 1 s |
| `combine_decroche` | telephone handset lifted from its cradle, plastic click | 0,5 s |
| `tonalite` | telephone ringback tone heard faintly through a handset, two rings, European tone | 2 s |
| `ephemeride` | three pages torn off a block calendar, quick | 0,7 s |
| `badge_cordon` | metal lanyard clip and a plastic card tapping twice | 1 s |
| `epingle` | push pin pressed into a cork board, dull | 0,5 s |
| `journal` | newspaper clipping laid on a table, dry paper | 0,7 s |
| `salle_audience` | large wood-panelled courtroom room tone, benches creaking, one distant cough, paper shuffling | 15 s (bouclé) |
| `chaise_bois` · `chaise_parquet` | two wooden chairs pulled and sat on / one wooden chair pushed back on parquet as someone stands up | 1 s |
| `papiers_juge` | a few sheets of paper turned on a wooden desk | 0,8 s |
| `sachet` | plastic evidence bag lifted and crinkled | 0,7 s |
| `feutre` | thick marker drawing a circle on a whiteboard | 0,6 s |
| `baguette_tableau` | wooden pointer stick tapping a board twice | 0,6 s |
| `billets` | banknotes counted and laid down one by one, steady, fifteen notes | 3 s |
| `pas_parquet` | one person walking away on a parquet floor | 1,5 s |
| `porte_bois` | wooden door opened by its handle | 1 s |
| `feuille_table` | one sheet of paper dropped flat on a wooden table | 0,5 s |
| `stylo_ecrit` · `stylo_coche` | ballpoint pen writing quickly on paper / one firm pen stroke | 2 s · 0,5 s |
| `bannette` | sheet of paper slid into a plastic letter tray | 0,5 s |

## 7. Mixage et suite

1. Voix masterisée (−15 LUFS) ; ambiances et bruitages aux niveaux ci-dessus ; musique ≈ −25 dBFS avec −7 dB de
   ducking ; `loudnorm` deux passes −14 LUFS, crête −1,5 dB ; remux sur la vidéo rendue (`-c:v copy`).
2. Quand `timings.js` vient de la vraie voix : régénérer les instants des bruitages (repères), le bip du moniteur
   (mêmes repères que l'image), les durées des neuf sections de musique, puis recomposer la musique.
3. À réécouter en priorité : l'accroche (les interrupteurs ne doivent pas sonner « effet »), les trois sauts
   d'horloge, le silence (rien ne doit y rester que l'horloge qui s'arrête, l'interrupteur, le moniteur, une note).
