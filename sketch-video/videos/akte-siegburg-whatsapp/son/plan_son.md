# AKTE 07 — « الگروپ » — PLAN SON (aucune génération maintenant)

À exécuter APRÈS le montage de la voix (`montage_voix.py` → `timings.js` réel). Tous les sons sont calés sur des
repères « bN@mot » (les mêmes que `storyboard.md`, § 6) : ils se recalent seuls quand le minutage change.
Les instants entre parenthèses viennent du minutage PROVISOIRE (69,3 s). Numéros de scène = ceux du storyboard.

> **À REFAIRE avant toute génération (contrôle des ressemblances, 26.11.2026 — `storyboard.md` fait foi).**
> Scène 2, `b2@تخلصهم` : plus d'étiquette au bout d'une ficelle → un ticket de caisse qui s'imprime par à-coups
> (papier thermique, trois crans). Scène 14, `b13@وفآخر` : plus de feuillets d'éphéméride arrachés → aucun son
> (le widget date roule en silence) ou un seul cran mécanique très bas quand il se cale. Scène 18 : plus de
> feuilles feuilletées ni de crayon qui trace un cadre → le clavier du téléphone tapé à la main (frappes
> étouffées de doigts sur du verre, PAS de clic d'interface) de `b17@لقيناش` à `b17@ولى`, puis rien.

## 1. Principes

- **Sons NATURELS de la scène, rien d'autre.** Interdits : pop, whoosh, ding, chime, buzzer, « reveal », swell,
  boom, riser, souffle de transition, son inversé.
- **Le piège de cet épisode : une histoire de messagerie SANS aucun son d'interface.** Interdits aussi, donc :
  la sonnerie de notification, le « plop » d'un message qui arrive, le souffle d'un message qui part, le clic
  synthétique du clavier, la mélodie d'un appel entrant, le son « tri-ton ». Le téléphone de l'épisode est en
  mode silencieux : il ne fait que des bruits PHYSIQUES.
- **Le son signature : le vibreur** — le moteur d'un téléphone posé sur une table en bois (bourdonnement grave
  et mécanique, le boîtier qui frotte un peu le bois). C'est lui qui remplace toutes les sonneries et qui marque
  la transition « notification qui descend ». Six prises pour ne jamais répéter :

  | prise | description | usage |
  |---|---|---|
  | V1 | deux impulsions courtes (0,2 s + 0,2 s) sur bois, sèches | image 0 |
  | V2 | une impulsion longue (0,4 s) sur bois + le téléphone qui glisse d'un centimètre | la somme (scènes 1 et 17 : LA MÊME prise, c'est un rappel) |
  | V3 | une impulsion très courte (0,12 s) sur bois | chaque T-NOTIF, chaque bannière |
  | V4 | une impulsion courte dans une main (étouffée, sans table) | scènes 2 et 13 |
  | V5 | deux impulsions longues, régulières (appel entrant, sans mélodie) | scène 15 |
  | V6 | sept impulsions minuscules, à des distances différentes (pièce voisine, couloir, sac) | le silence (scène 11) |

- **La frappe** : des pouces sur du verre (petits chocs mats de la pulpe du doigt, pas de clic). Trois prises :
  lente (LUI), rapide et appuyée (ELLE, samedi), posée (la règle). Elle suit exactement les lignes qui se tapent
  à l'écran ; elle s'arrête NET à la fin de b10.
- **Personne ne parle** : aucune voix, aucun murmure intelligible, aucun chuchotement (on ne sait pas comment
  la collègue des urgences a transmis les informations : aucun son ne doit le suggérer). Seulement des
  souffles : une inspiration coupée, un soupir par le nez.
- **Niveaux** (voix masterisée à −15 LUFS) : bruits forts (vibreur de la somme, tampons, porte du coffre)
  −10 à −12 dB sous la voix ; gestes (frappe, papier, feutre, pas) −16 à −24 dB ; ambiances −28 à −36 dB.
  Dans le silence (scène 11), sans voix : fond de pièce à −38 dB, les sept vibreurs entre −24 et −32 dB.
- **Pas de moniteur, pas de bip synthétisé** dans cet épisode : rien à synthétiser. (Si le vibreur généré
  manque de netteté, l'enregistrer avec un vrai téléphone posé sur une table plutôt que de le synthétiser.)
- Outils (plus tard) : ElevenLabs `sound-generation` (4 requêtes en parallèle au plus, `duration_seconds` ≥ 0,5),
  `son/plan_bruitages.py` (placement sur les repères), `son/musique_plan.json` (§ 3), `son/mixage.py`
  (loudnorm deux passes −14 LUFS, crête −1,5 dB).

## 2. Bruitages, scène par scène

Niveau = dB sous la voix. « → » = son tenu jusqu'au repère suivant.

### Scène 1 — le tribunal répond dans le fil (b1)
| repère | son | niveau |
|---|---|---|
| `0` → `b2` | une pièce calme, le téléphone posé sur une table en bois (air de la pièce, un frigo très loin) | −36 |
| `0` (0,00) | vibreur V1 : deux impulsions sur le bois | −10 |
| `b1@بـ1000+0.25` (1,20) | vibreur V2 : impulsion longue + le téléphone glisse d'un centimètre | −10 |
| `b1@ميساج` (1,85) | un feutre qui trace un cercle sur du papier | −22 |
| `b1@فـWhatsApp` (2,18) | un coup de surligneur | −24 |

### Scène 2 — elle, l'étiquette sur sa poche (b2)
| repère | son | niveau |
|---|---|---|
| `b2` → `b3` | salle des médecins : machine à café qui ronronne, une goutte de temps en temps, ventilation | −30 |
| `b2@والمحكمة` (4,03) | vibreur V4 dans sa main | −14 |
| `b2@حكمات` (4,50) | elle : une inspiration coupée | −22 |
| `b2@تخلصهم` (5,16) | une étiquette en carton au bout d'une ficelle qui claque contre du tissu | −18 |
| `b2@جيبها` (5,73) | un talon qui tape sur du lino | −14 |

### Scène 3 — pas un patient, un collègue (b3)
| repère | son | niveau |
|---|---|---|
| `b3` → `i1` | la pièce calme de la scène 1 | −36 |
| `b3@كتباتش` (6,41) | un feutre qui trace une flèche | −24 |
| `b3@مريض+0.12` (7,15) | deux traits de feutre rapides (la croix) | −16 |
| `b3@زميل` (7,89) | un feutre qui trace un cercle | −22 |

### Scène 4 — l'intro (i1–i3)
| repère | son | niveau |
|---|---|---|
| `i1` (8,97) | vibreur V3 (transition) | −16 |
| `i1` → `b4` | un bureau calme, très loin | −38 |
| `i1@ياسين` (9,21) | un feutre qui trace (le ruban) | −24 |
| `i3@j'aime` (15,34) | un doigt qui tape une fois sur du verre | −22 |
| `i3@abonne` (15,82) | un doigt qui tape une fois sur du verre (autre prise) | −22 |

### Scène 5 — le groupe (b4)
| repère | son | niveau |
|---|---|---|
| `b4` (18,14) | vibreur V3 | −16 |
| `b4` → `b5` | salle des médecins au loin (derrière une porte) : voix indistinctes ABSENTES, seulement la machine à café et un chariot qui passe | −34 |
| `b4@3` (19,13) | neuf petits tapotements de doigts sur du verre, en rafale (0,5 s) | −24 |
| `b4@les` (19,99) | vibreur V3 (très court) + une feuille de planning qu'on tourne | −20 / −24 |
| `b4@الكونجيات` (20,60) | vibreur V3 (autre prise) | −20 |
| `b4@الكادوات` (21,40) | vibreur V3 (autre prise) + du papier cadeau froissé | −20 / −22 |

### Scène 6 — jeudi, le canapé (b5)
| repère | son | niveau |
|---|---|---|
| `b5` (21,98) | vibreur V3 (la bannière de date) | −16 |
| `b5` → `b6` | un salon calme : la rue très loin derrière la fenêtre fermée | −32 |
| `b5+0.3` (22,28) | un canapé qui grince (il s'installe), un plaid qu'on remonte | −22 |
| `b5@مشى` (22,93) | une feuille de papier qu'on déplie | −18 |
| `b5@للمستعجلات` (23,17) | un tampon encreur frappé sur du papier | −14 |
| `b5@سبيطارهم` (24,02) | un stylo qui entoure une ligne | −24 |
| `b5@وكتب` (24,48) → `b5@بلي` | frappe LENTE : des pouces sur du verre | −22 |
| `b5@بلي` (25,19) | un dernier appui du pouce, puis une tasse reposée sur du bois | −18 / −24 |

### Scène 7 — samedi, la salle des médecins (b6)
| repère | son | niveau |
|---|---|---|
| `b6` (26,02) | vibreur V3 (la bannière de date) | −16 |
| `b6` → `b7` | salle des médecins : machine à café, goutte à goutte | −30 |
| `b6+0.1` → `b7` | frappe RAPIDE et appuyée sur du verre, par rafales | −18 |
| `b6+0.35` (26,37) | elle : un soupir par le nez | −22 |
| `b6@زميلتو+0.25` (26,60) | un feuillet autocollant qu'on colle | −26 |
| `b6@خديت` (27,49) | un aimant qui tombe dans une gouttière en métal, puis un aimant qui claque sur un tableau | −12 |
| `b6@gardes` (28,01) | même geste, autre prise | −12 |

### Scène 8 — le brouillon, 549 € (b7)
| repère | son | niveau |
|---|---|---|
| `b7+0.25`, `b7@1`, `b7@ومشى` | trois rafales de frappe rapide (une par paire de lignes) | −20 |
| `b7@1+0.3` (29,46) | un coup de surligneur | −24 |
| `b7@ومشى` (30,30) | un billet cartonné qu'on déchire le long d'une perforation | −12 |
| `b7@ومشى+0.35` (30,65) | deux morceaux de carton qui tombent sur une table | −22 |

### Scène 9 — les diagnostics (b8)
| repère | son | niveau |
|---|---|---|
| `b8` (30,98) | un feutre fin qui trace une accolade | −24 |
| `b8@كتبات` (31,74) | un gros feutre noir qui caviarde : deux coups appuyés, qui grincent | −14 |
| `b8@diagnostics+0.3` (32,61) | deux autres coups de gros feutre (autre prise) | −14 |
| `b8@عاوداتهم` (33,25) | une carte bristol posée à plat sur une table | −18 |
| `b8@ليها` (33,72) | un feutre qui trace des pointillés | −26 |
| `b8@المستعجلات+0.2` (34,73) | deux petits coups de feutre | −20 |

Aucun chuchotement, aucune voix, aucun bruit de téléphone ou de clavier d'ordinateur dans cette scène.

### Scène 10 — la dernière ligne (b9–b10)
| repère | son | niveau |
|---|---|---|
| `b9@Vielleicht-0.12` (35,41) | deux bouts de ruban adhésif qu'on colle | −20 |
| `b9@Vielleicht`, `b9@sitzt`, `b9@aber`, `b9@ein`, `b9@Pups`, `b9@quer` | à chaque mot, une courte rafale de frappe (3 à 5 appuis) | −18 |
| `b9@Pups` (36,95) | un coup de surligneur | −22 |
| `b10+0.15` (37,78) → 1,2 s | un feutre qui écrit (la traduction) | −24 |
| `b10@end-0.05` (39,66) | **UN appui net du pouce sur le verre** (l'envoi). Rien après : pas de souffle. | −12 |

### Scène 11 — le silence (fin de b10 → b11 ; 1,3 s)
| repère | son | niveau |
|---|---|---|
| `b10@end` (39,71) | la musique et la frappe sont coupées net (fondu de 60 ms) | — |
| `b10@end` → `b11` | le fond de la pièce, seul | −38 |
| `b10@end+0.3` → `+0.84` | vibreur V6 : sept impulsions minuscules, une toutes les 0,09 s, chacune à une distance différente | −24 à −32 |
| `b10@end+0.95` → `b11` | plus rien | — |

Si l'auteur ramène le silence à 0,8 s : resserrer les sept impulsions (une toutes les 0,06 s).

### Scène 12 — l'été, la lettre (b11 → milieu de b12)
| repère | son | niveau |
|---|---|---|
| `b11` (41,02) | un téléphone qu'on pose, écran contre la table (choc mat) | −14 |
| `b11` → `b12@فمشى` | l'été par une fenêtre ouverte : martinets, une tondeuse très loin | −30 |
| `b11+0.12` (41,14) | une enveloppe qui glisse sur une table | −20 |
| `b11@الطبيب` (41,40) | l'enveloppe qu'on ouvre, la lettre qu'on déplie | −16 |
| `b11@طلب` (41,78) | un stylo qui écrit une ligne | −24 |
| `b11@تكتب` (42,30) | un stylo à bille posé sur le papier | −18 |
| `b11@تعاودهاش` (43,02) | le stylo qui roule d'un demi-tour | −26 |
| `b12@كتباتش` (43,79) | un tampon encreur frappé fort | −10 |
| `b12@كتباتش+0.15` (43,94) | le stylo qui roule et tombe par terre | −18 |

### Scène 13 — « Plans », Siegburg (fin de b12)
| repère | son | niveau |
|---|---|---|
| `b12@فمشى` (44,17) | un téléphone qu'on reprend en main (frottement) | −20 |
| `b12@فمشى+0.3` (44,47) | vibreur V4 | −16 |
| `b12@Arbeitsgericht` (44,46) → 0,6 s | frappe posée sur du verre | −22 |
| `b12@فمدينة` (46,24) | une fiche cartonnée qu'on fait glisser | −24 |
| `b12@Siegburg` (46,62) | une punaise plantée dans du liège | −14 |
| `b12@Siegburg+0.3` → `b13` | une place de petite ville, calme ; des pas sur des marches en pierre ; une porte lourde. Pas de cloche. | −28 |

### Scène 14 — il part (b13)
| repère | son | niveau |
|---|---|---|
| `b13` (47,20) | vibreur V3, une seule impulsion (la ligne du système) | −16 |
| `b13` → `b14` | la salle des médecins sans la machine à café : seulement la ventilation | −34 |
| `b13+0.3`, `b13+0.55` | un aimant qui tombe dans la gouttière (deux prises) | −16 |
| `b13@وفآخر` (48,14) | trois feuillets d'éphéméride arrachés | −18 |
| `b13@خلا` (48,81) → `+1.15` | cinq pas sur du lino ; dans le carton, une tasse qui tinte contre du verre | −18 |
| `b13@خلا+0.5` (49,31) | une poignée, une porte qui s'ouvre | −16 |
| `b13@خلا+1.25` (50,06) | la porte qui revient doucement (clic du pêne) | −14 |

### Scène 15 — appel vidéo : « 70 % privé » (b14)
| repère | son | niveau |
|---|---|---|
| `b14+0.2` (50,37) | vibreur V5 : appel entrant, deux impulsions longues (aucune mélodie) | −12 |
| `b14+0.4` (50,57) | un doigt qui tape une fois sur du verre (elle décroche) | −20 |
| `b14+0.5` → `b16` | une salle d'audience : grande pièce, légère réverbération, une chaise, des feuilles | −30 |
| `b14@70%` (51,74) | un feutre qui hachure une surface (0,4 s) | −22 |

### Scène 16 — appel vidéo : « et 30 % de travail » (b15)
| repère | son | niveau |
|---|---|---|
| `b15@جاوباتها` (52,80) | un stylo posé sur une table en bois (la juge) | −22 |
| `b15@و30%` (53,26) | un gros feutre qui remplit une petite surface ; une page tournée | −20 |
| `b15@ماشي` (54,07) | un trait de feutre sec (la rature) | −16 |
| `b15@privé` (54,36) | une chaise qui grince (elle se recule) | −22 |

### Scène 17 — le jugement dans le fil (b16)
| repère | son | niveau |
|---|---|---|
| `b16` (54,80) | vibreur V3 | −14 |
| `b16` → `b18` | la pièce calme de la scène 1 (on est revenu au même endroit) | −36 |
| `b16@ممنوع` (55,51) | un tampon frappé (léger) | −16 |
| `b16@و1000+0.25` (56,51) | **vibreur V2, la même prise qu'à 1,20 s** | −10 |
| `b16@تعويض` (56,88) | un feutre qui trace des pointillés | −26 |
| `b16@ليه+0.1` (57,31) → 0,8 s | une petite imprimante à tickets (moteur, papier qui sort) | −18 |

### Scène 18 — première instance (b17)
| repère | son | niveau |
|---|---|---|
| `b17+0.4` (57,96) | le ticket qu'on arrache à moitié (il reste pendu) | −22 |
| `b17+0.25` → `b18` | une montre mécanique, très fine, très près (l'horloge « en attente ») | −30 |
| `b17@لقيناش-0.2` (58,59) → `b17@ولى` | des feuilles qu'on feuillette vite (on cherche) | −22 |
| `b17@ولى` (59,41) | un crayon qui trace un cadre en pointillé | −24 |

### Scène 19 — la règle (1) (b18)
| repère | son | niveau |
|---|---|---|
| `b18` (60,40) | vibreur V3 | −16 |
| `b18@كتب+0.1` (60,92) | frappe posée : cinq appuis | −20 |
| `b18@غير` (61,06) | deux traits de feutre (la croix) | −16 |
| `b18@krank` (61,30) | un coup de surligneur | −22 |
| `b18@وحتى` (62,20) | frappe posée : dix appuis | −20 |
| `b18@لإمتى` (62,49) | une coche au feutre | −22 |

### Scène 20 — la règle (2) : le coffre (b19)
| repère | son | niveau |
|---|---|---|
| `b19` (62,93) | une masse de métal posée sur un sol dur (sourd) | −14 |
| `b19+0.2` (63,13) | une feuille qu'on glisse sur une étagère en métal | −24 |
| `b19@diagnostic+0.55` (63,48) | une porte de coffre qui se ferme (choc grave, court) | −10 |
| `b19@diagnostic+0.85` (63,78) → 0,5 s | une molette crantée qui tourne (cliquetis) | −16 |
| `b19@كيتكتبش` (64,92) | un petit choc mat contre une tôle épaisse | −18 |
| `b19@بلا` (65,34) | deux clés qui tintent sur leurs crochets | −14 |
| `b19@الإذن` (65,58) | une clé qu'on décroche ; à `b19@الإذن+0.45` elle tombe dans une paume | −16 |
| `b19@ديالو` (65,91) | un coup de surligneur | −22 |

### Scène 21 — le message dans le jugement (b20)
| repère | son | niveau |
|---|---|---|
| `b20` (66,59) | un téléphone posé sur un bureau | −18 |
| `b20+0.1` (66,69) | une liasse de papier qui tombe à plat sur un bureau | −14 |
| `b20@كيتكتب` (67,01) → `+0.74` | un chronomètre mécanique : clic de la couronne, tic-tac serré, clic d'arrêt | −16 |
| `b20@بقى` (68,10) | une feuille posée, une main qui la lisse | −16 |
| `b20@مكتوب` (68,34) | un crayon qui entoure un chiffre | −22 |
| `b20@فالحكم` (68,67) | un trombone qu'on glisse sur une liasse | −24 |

La bulle qui vole de `b20@وهادا` à `b20@بقى` ne fait AUCUN bruit (pas de souffle).

### Scène 22 — l'affiche
| repère | son | niveau |
|---|---|---|
| `b20@end+0.5` (69,55) → 2 s | des feuilles qu'on étale sur une table (le dézoom) | −24 |
| `b20@end+2.7` (71,75) | une carte posée | −22 |
| `b20@end+2.8` (71,85) → 1 s | un feutre qui écrit | −24 |

## 3. Musique

Ton fixé par `SAISON-2.md` : **léger, ironique — contrebasse, claquements de doigts.** Petit trio de jazz
acoustique, pris de près, sec, sans réverbération longue : contrebasse (pizzicato, puis archet), claquements
de doigts, balais sur une caisse claire, une guitare de jazz étouffée ; un piano droit feutré seulement après
le silence. Tempo ≈ 104 à la noire, ternaire (swing). Aucun instrument électronique.
Ce qui la distingue des autres épisodes : 04 piano seul ; 05 tic-tac et cordes tenues ; 06 pizzicati de
cordes et machine à écrire ; 08 clarinette et rythme de marche ; 09 violoncelle seul.

| section | de → à (provisoire) | ambiance | instruments | intensité |
|---|---|---|---|---|
| M1 Accroche | `0` → `i1` (0,0 → 9,0) | malicieux, « tiens donc » | riff de contrebasse en pizzicato (2 mesures) + doigts sur les temps 2 et 4 ; **un temps de silence complet à `b1@بـ1000`** (le riff laisse un trou pour la somme, puis repart) ; à `b3` la guitare pose une question (deux accords) | 5 / 10 |
| M2 Intro | `i1` → `b4` (9,0 → 18,1) | détendu, sous la voix | le même riff, allégé : contrebasse seule 4 mesures, puis balais très doux | 3 / 10 |
| M3 Le groupe, le jeudi | `b4` → `b6` (18,1 → 26,0) | quotidien, bon enfant ; plus tendre à partir de `b5` | contrebasse qui marche (walking), doigts, guitare étouffée par petites touches ; à `b5` : contrebasse + balais seulement | 4 / 10 |
| M4 Le samedi | `b6` → `b9` (26,0 → 35,2) | l'agacement monte, comique | la contrebasse passe en croches, les doigts sur tous les temps, notes fantômes, la guitare gratte à contretemps ; la montée se fait par ACCUMULATION d'instruments, jamais par un crescendo synthétique | 6 / 10 |
| M5 La dernière ligne | `b9` → `b10@end` (35,2 → 39,7) | suspendu, pince-sans-rire | tout s'enlève sauf la contrebasse : UNE note par mot allemand (six notes, sur les six repères de b9) ; pendant b10, deux notes qui descendent ; la dernière n'est pas résolue et est COUPÉE à `b10@end-0.05` | 3 / 10 |
| M6 Le silence | `b10@end` → `b11` (39,7 → 41,0) | rien | aucune musique (coupe franche, fondu de 60 ms) | 0 / 10 |
| M7 Après | `b11` → `b14` (41,0 → 50,2) | sobre, un peu triste ; plus d'ironie | contrebasse à l'ARCHET, notes longues et graves ; piano droit feutré, deux ou trois notes espacées ; plus de doigts ; à `b13@خلا` la contrebasse reste seule | 3 / 10 |
| M8 Le tribunal | `b14` → `b16` (50,2 → 54,8) | un échange, sec | question / réponse : deux notes en pizzicato (elle, à `b14@70%`), une note à l'archet (la juge, à `b15@و30%`) ; balais très légers | 4 / 10 |
| M9 Le jugement, le statut | `b16` → `b18` (54,8 → 60,4) | grave mais sans drame, puis en suspens | le riff du début à demi-tempo, à l'archet ; pendant b17 : un accord tenu NON résolu (on ne sait pas si c'est définitif) | 4 / 10 |
| M10 La règle | `b18` → `b20` (60,4 → 66,6) | clair, apaisé, on retient | la contrebasse qui marche revient, tranquille ; doigts sur 2 et 4 ; guitare | 5 / 10 |
| M11 La fin, l'affiche | `b20` → fin (66,6 → 75) | la boucle se referme | riff d'ouverture ; la cadence se RÉSOUT sur `b20@فالحكم` ; un dernier claquement de doigts seul à `b20@end+0.15` ; reprise du riff, léger, sous l'affiche (5 s), fin nette | 5 / 10 |

- **Négatifs** (à passer tels quels au générateur) : impacts, whooshes, risers, swells, beeps, notification
  sounds, ringtones, synthesizers, sub drops, vocals, hand claps, cymbal crashes.
- Niveau : ≈ −25 dBFS, −7 dB de ducking sous la voix. Les claquements de doigts ne doivent jamais tomber sur
  un bruit fort (vibreur V2, tampon, porte du coffre) : décaler la mesure plutôt que de superposer.
- **À recomposer** dès que la durée change (la voix réelle fera 69 à 70 s) : les frontières de sections sont
  des repères ; `son/musique_plan.json` se régénère depuis `timings.js`.

## 4. Mixage et contrôles

1. Ordre : voix (−15 LUFS) → bruitages placés par `plan_bruitages.py` → musique avec ducking → `loudnorm` deux
   passes à −14 LUFS, crête −1,5 dB → remux sur la vidéo rendue (`-c:v copy`).
2. Écouter les trois moments qui portent l'épisode : 0,0 à 1,5 s (vibreur + somme), 39,0 à 41,5 s (l'appui du
   pouce, puis le silence et ses sept vibreurs lointains), 56,0 à 57,0 s (le même vibreur qu'au début).
3. Vérifier qu'il ne reste AUCUN son d'interface (ni notification, ni clavier synthétique, ni sonnerie), aucun
   chuchotement en scène 9, aucune cloche en scène 13.
4. Les 125 repères de ce plan existent dans `beats.js` (contrôle par script le 26.11.2026, même règle que le moteur). Après le montage de la
   voix : `node tools/cuetimes.mjs videos/akte-siegburg-whatsapp/index.html <repères>` pour relire les instants.
