# AKTE 04 — « 63 ساعة » — PLAN SON (aucune génération maintenant)

À exécuter APRÈS le montage de la voix (`montage_voix.py` → `timings.js` réel). Tous les sons sont calés sur des
repères « bN@mot » (les mêmes que `storyboard.md`, § 6) : ils se recalent seuls quand le minutage change.
Les instants entre parenthèses viennent du minutage PROVISOIRE (93,5 s).

> **À REFAIRE avant toute génération (contrôle des ressemblances, 26.11.2026 — `storyboard.md` fait foi).**
> Scène 8, `b9@6` : plus de feuillets qui se posent → neuf traits de stylo qui noircissent neuf cases (le son de
> la frise des heures, plus court). Scène 16 : plus de feuillets de calendrier arrachés → rien (la pièce, la
> branche contre la vitre). Scène 21 : plus de loupe ni de tampon qui tremble ni de crayon → le rouleau du
> compteur qui tourne à vide de `b25@وما` à la fin (§ 3, sans jamais le « clac » d'arrêt), deux à-coups à
> `b25@واش`, et à `b25@نهائي` une petite étiquette de carton qui tape une fois le dossier au bout de sa ficelle.

## 1. Principes

- **Sons NATURELS de la scène, rien d'autre.** Interdits : pop, whoosh, ding, chime, buzzer, « reveal », swell,
  boom, riser, souffle de transition, son inversé. Pas de sonnette d'appel de chambre (c'est un carillon) : le
  voyant ne fait qu'un petit déclic de relais.
- **La transition signature a un vrai bruit** : une page de planning cartonnée qu'on tourne (`swipe`), la même
  page qu'on rabat en arrière (`swipeR`, prise différente, plus sèche). Quatre prises de chaque pour ne pas
  répéter. Les `cut` et le `fade` sont muets.
- **Pas de moniteur dans cet épisode**, donc pas de bip. Le « cœur » sonore est **le cliquetis du compteur à
  rouleaux** (§ 3) : il compte les 63 heures, bat doucement pendant toute l'histoire, ralentit et s'arrête à
  13 h 37. C'est son silence qui dit la mort.
- **Machine à écrire** : chaque texte « tapé » à l'écran (classe `.tw`) a ses frappes, une par signe, calées
  sur la même cadence que l'image (0,035 à 0,05 s par signe) ; retour de chariot seulement en fin de carte.
- **Niveaux** (voix masterisée à −15 LUFS) : bruitages forts (tampons, chutes, clacs du compteur) −10 à −12 dB
  sous la voix ; gestes (papier, pas, stylo) −16 à −22 dB ; ambiances −28 à −34 dB. Dans la scène muette, sans
  voix : gestes à −14 dB (équivalent), ambiance éteinte.
- **Aucun personnage ne parle** : pas de voix, pas de murmure intelligible. Seulement des souffles, des
  sanglots retenus, un bâillement.
- Outils (plus tard) : ElevenLabs `sound-generation` (4 requêtes en parallèle au plus, `duration_seconds` ≥ 0,5),
  `son/plan_bruitages.py` (placement sur les repères), `son/tic_compteur.py` (synthèse, § 3),
  `son/musique_plan.json` (§ 4), `son/mixage.py` (loudnorm deux passes −14 LUFS, crête −1,5 dB).

## 2. Bruitages, scène par scène

Niveau = dB sous la voix. « → » = son tenu jusqu'au repère suivant.

### Scène 1 — la balance (b1)
| repère | son | niveau |
|---|---|---|
| 0 → `b2` | salle d'audience vide : air de la pièce, un bois qui craque au loin | −30 |
| `b1@مذنبة+0.02` (0,17) | un bloc lourd qui tombe sur un plateau de laiton + les chaînes qui tintent | −10 |
| 0,25 → 0,9 | le fléau qui grince en basculant, puis les chaînes qui se calment | −20 |
| 0,30 → `b1@صفر` | un rouleau mécanique qui défile (cliquetis serré) | −16 |
| `b1@صفر` (0,96) | le rouleau qui se bloque : un clac net | −12 |
| `b1@محكمة` → + 1,5 s | machine à écrire : 43 frappes | −20 |
| `b1@طبيبة` | elle : une inspiration coupée, puis un sanglot retenu | −22 |

### Scène 2 — la salle, puis le rembobinage (b2–b3)
| repère | son | niveau |
|---|---|---|
| `b2+0.1` | une carte épaisse qui tombe à plat sur du bois | −18 |
| `b2+0.25` → + 0,9 s ; `b2@لا-0.3` → + 0,5 s | machine à écrire : deux lignes, puis deux lignes | −20 |
| `b2@مات` | elle : souffle tremblé | −24 |
| `b2@لا` | un tampon encreur frappé sur du papier | −10 |
| `b3@علاش` | rien : une demi-seconde où tout se retient (couper l'ambiance de 6 dB) | — |
| `b3@نرجعو` → `i1` | des pages de planning feuilletées à rebours, en rafale ; le compteur qui défile (§ 3) ; trois pas à reculons sur du parquet | −14 / −16 / −20 |

### Scène 3 — l'intro (i1–i3)
| repère | son | niveau |
|---|---|---|
| `i1-0.1` | la page qu'on rabat (transition) | −16 |
| `i1` → `b4` | couloir d'hôpital, très loin (ventilation, un chariot qui passe une fois) | −34 |
| `i1` | une punaise qu'on enfonce dans du liège ; à + 0,5 s la fiche qui bat une fois contre le tableau | −18 / −24 |
| `i1@ياسين` | un feutre qui trace (le ruban) | −24 |
| `i3`, `i3+0.1` | deux aimants qui claquent sur un tableau métallique (le cœur, le bouton) | −16 |
| `i3@j'aime`, `i3@abonne` | un doigt qui tape une fois sur le tableau (très léger) | −24 |

### Scène 4 — Köln, la feuille (b4)
| repère | son | niveau |
|---|---|---|
| `b4` | page rabattue | −16 |
| `b4` → `b6@كلشي` | le compteur qui défile à l'envers (§ 3) | −20 |
| `b4@Köln` | une épingle plantée dans une carte en carton | −18 |
| `b4@Köln+0.2` → `b5` | l'eau d'un fleuve contre un quai, calme ; à `b4@Köln+0.3` UN coup de cloche de cathédrale, très loin | −28 / −24 |
| `b4@ورقة-0.1` | une feuille qui glisse sur une table | −18 |
| `b4@سنات` → + 0,5 s | une plume qui gratte (la signature qui se défait) | −22 |

### Scène 5 — les deux poches (b5)
| repère | son | niveau |
|---|---|---|
| `b5` | page rabattue | −16 |
| `b5+0.1` | deux poches de plastique souple qui se touchent en se balançant | −22 |
| `b5+0.3` → `b5@الدم` | deux gouttes dans une chambre compte-gouttes (espacées de 0,6 s) | −24 |

### Scène 6 — la frise des heures (b6–b7)
| repère | son | niveau |
|---|---|---|
| `b6` | page rabattue, la dernière | −16 |
| `b6@كلشي` | le compteur s'arrête : clac (§ 3) | −12 |
| `b6@كلشي+0.05` → `b6@وحدة` | un feutre qui hachure des cases, par petits coups (21 colonnes) ; les 63 clics du compteur (§ 3) | −18 / −20 |
| `b6` → `b7@زادت+0.6` | ses pas sur du linoléum, de moins en moins vifs | −24 |
| `b6@وحدة` | clac du compteur sur 63 | −10 |
| `b7@الإدارة` | un tampon encreur frappé sur le tableau | −10 |
| `b7@زادت+0.45` | un bandeau magnétique et une plaque qui claquent sur le tableau ; un feutre qui roule dans la gouttière | −10 / −26 |
| `b7@garde` | un glissement métallique court + un clic (le bloc B) | −16 |
| `b7@7+0.3` | elle : un soupir | −24 |

### Scène 7 — le couloir, la nuit (b8)
| repère | son | niveau |
|---|---|---|
| `b8` | page tournée | −16 |
| `b8` → `b9` | couloir d'hôpital la nuit : ventilation, un néon | −30 |
| `b8+0.05` → `b8@5` | pas pressés sur le linoléum | −18 |
| `b8+0.35`, `b8@دازت`, `b8@كثر` | le déclic d'un relais (un voyant qui s'allume) | −24 |
| `b8@دازت` → `b8@6` | 12 clics du compteur ; à `b8@6` le clac | −18 / −12 |
| `b8@6+0.2` | elle : respiration courte | −24 |

### Scène 8 — le tableau du personnel (b9–b10)
| repère | son | niveau |
|---|---|---|
| `b9` | page tournée | −16 |
| `b9+0.05` → + 0,85 | ses pas, lents | −20 |
| `b9@Assistenzärztin` | machine à écrire : une ligne | −22 |
| `b9@6` → + 0,6 s | neuf petits feuillets de papier qui se posent | −22 |
| `b9@شهور` | un bâillement étouffé | −24 |
| `b10@formation` | machine à écrire : une ligne | −22 |
| `b10@Blutführerschein` | une pochette plastique qu'on froisse ; puis deux tapes sur une poche de tissu | −18 / −24 |

### Scène 9 — le passe-plat (b11)
| repère | son | niveau |
|---|---|---|
| `b11` | page tournée | −16 |
| `b11` → `b13` | le bourdonnement d'un frigo (il se prolonge sous la scène 10, plus bas) | −30 |
| `b11+0.07` → + 0,45 | un volet roulant métallique qui remonte | −12 |
| `b11+0.3` → `b11@عطاها` | un portoir en inox qui glisse sur une tablette ; les poches qui se touchent | −14 / −22 |
| `b11@poches` | un coup de ciseaux | −20 |
| `b11@فدقة` | le portoir qui tressaute sur l'inox | −18 |

### Scène 10 — le Begleitdokument (b12)
| repère | son | niveau |
|---|---|---|
| `b12` | une feuille qui se pose | −18 |
| `b12@groupe` → `b12@غير` | un surligneur qui frotte le papier, six petits traits | −22 |
| `b12@فورقة` | une loupe posée sur le papier | −26 |
| `b12@عامرة` | elle : une longue expiration | −24 |

### Scène 11 — 21:50, la chambre (b13)
| repère | son | niveau |
|---|---|---|
| `b13` | page tournée | −16 |
| `b13` → `b16` | chambre d'hôpital la nuit (air feutré) ; le tic-tac de l'horloge | −32 / −26 |
| `b13@علقات+0.4` | une poche accrochée à un crochet de métal | −16 |
| `b13@poche+0.2` | le petit clic d'une roulette de perfusion | −22 |
| `b13@poche+0.4` → `b15@ووقفو` | la goutte, régulière (une par seconde) | −28 |

### Scène 12 — 0 contre A (b14–b15)
| repère | son | niveau |
|---|---|---|
| `b14@2`, `b14@4` | un marqueur qui trace un cercle (les annotations) | −22 |
| `b15@دقايق` | rien de plus : l'éclatement des globules est MUET (pas d'impact) ; le tic-tac continue | — |
| `b15@كيتقيا` | un haut-le-cœur discret, un sommier qui grince, un haricot de métal qu'on pose | −18 / −24 / −22 |
| `b15@ووقفو` | deux pas rapides ; le clic de la roulette qu'on ferme ; la goutte s'arrête | −20 / −14 |

### Scène 13 — dimanche 13:37, muette 1
| repère | son | niveau |
|---|---|---|
| `b16` | page tournée | −16 |
| `b16` → `b16@end+0.9` | chambre de jour : air calme, un oiseau très loin ; la trotteuse (nette) ; une goutte de perfusion ; le cliquetis du compteur (§ 3) | −32 / −22 / −28 / −24 |
| `b16@13:37` | l'aiguille des minutes qui saute d'un cran ; quatre frappes de machine à écrire | −18 / −20 |
| `b16@end+0.2` → `+0.8` | tout ralentit : la goutte ne tombe plus, la trotteuse s'arrête (dernier tic à + 0,5), le compteur s'arrête (dernier clic à + 0,8) | — |
| `b16@end+0.9` → `+1.9` | **silence complet** : l'ambiance descend de −32 à rien en 0,8 s | — |

### Scène 14 — muette 2, puis b17–b18
| repère | son | niveau (équivalent) |
|---|---|---|
| `b16@end+2.3` → `+3.2` | du tissu qui frotte un mur en descendant | −16 |
| `b16@end+2.75` | un stéthoscope qui tombe sur du linoléum (un rebond) | −14 |
| `b16@end+3.2` → `b18@الإدارة` | sanglots retenus, respiration hachée | −20 |
| `b18@الإدارة` | une poignée, une porte qui s'ouvre au fond d'un couloir | −14 |
| `b18@عليها` | sa main qui prend appui, du tissu | −26 |

### Scène 15 — le bureau (b19)
| repère | son | niveau |
|---|---|---|
| `b19` | page tournée | −16 |
| `b19` → `b20` | bureau fermé : un store qui cliquette à peine | −32 |
| `b19@وخلاتها` | un fauteuil de cuir qui grince | −18 |
| `b19@ورقة` | une feuille qu'on fait glisser sur un bureau | −18 |
| `b19@بلي` → `b19@formation` | machine à écrire : une ligne | −20 |
| `b19@formation+0.3` → + 0,5 s | un stylo qui signe | −14 |
| `b19@وهادشي` | tampon encreur | −10 |
| `b19@ماشي` | un classeur poussé sur le bureau | −16 |

### Scène 16 — des mois (b20)
| repère | son | niveau |
|---|---|---|
| `b20` | page tournée | −16 |
| `b20` → `b21` | par la fenêtre, enchaînés sur la durée de la scène : le vent dans des feuilles sèches → le calme feutré de la neige → des oiseaux de printemps | −26 |
| `b20+0.2` et quatre fois tous les 0,28 s | un feuillet de calendrier qu'on arrache | −20 |

### Scène 17 — retour au tribunal (b21)
| repère | son | niveau |
|---|---|---|
| `b21` | deux pages tournées coup sur coup | −16 |
| `b21` → `b26` | salle d'audience (comme la scène 1) | −30 |
| `b21+0.5` | un mouchoir tiré de sa boîte ; un sanglot | −26 / −22 |
| `b21@النيابة` | une carte qui tombe sur le bois | −18 |
| `b21@النيابة`, `b21@طلبات`, `b21@7` | machine à écrire : trois lignes (la deuxième, « 90 Tagessätze », plus lente) | −20 |

### Scènes 18–20 — la balance (b22–b24)
| repère | son | niveau |
|---|---|---|
| `b22` | un poids posé sur une console de bois | −20 |
| `b22@المحكمة` | les roulettes d'un chariot qui arrive et s'arrête | −16 |
| `b22@شافت`, `b22@الإدارة`, `b23@وغلطة` | un surligneur qui frotte | −24 |
| `b22@Organisationsverschulden` | le compteur qui se décroche (déclic) ; à + 0,6 s, posé sur le chariot (métal sur métal) | −16 / −12 |
| `b22@يعني+0.45`, `b22@غلطة+0.45`, `b22@كبيرة+0.45`, `b22@فالتنظيم+0.45` | une plaque de pierre posée sur le chariot ; à chaque fois, les chaînes de la balance qui bougent | −14 / −22 |
| `b23@صغيرة` | un tout petit poids de laiton qui tinte dans le plateau | −22 |
| `b23@مذنبة` | tampon encreur (sur métal : plus sec) | −10 |
| `b24@عاقباتهاش+0.3` | une étiquette en carton qui tombe par terre | −22 |
| `b24@كتبات`, `b24@genug`, `b24@bestraft` | un caillou posé dans un plateau de laiton | −16 |
| `b24@يعني` → `b24@كافي` | les chaînes qui se calment, puis plus rien | −24 |
| `b24@كافي` | tampon encreur ; à + 0,4 s, elle : une longue expiration | −10 / −20 |

### Scène 21 — le dossier (b25)
| repère | son | niveau |
|---|---|---|
| `b25` | un dossier cartonné posé sur un banc | −16 |
| `b25@وما` → `b25@واش` | une loupe qui glisse sur du carton | −28 |
| `b25@واش` | le manche d'un tampon qui tremble contre l'encrier (bois) | −26 |
| `b25@نهائي` | AUCUNE frappe (le tampon repart) ; un crayon qui trace un « ? » | −22 |

### Scènes 22–24 — la règle (b26–b28)
| repère | son | niveau |
|---|---|---|
| `b26` | page tournée | −16 |
| `b26@قبل` | une carte épaisse qui se pose | −18 |
| `b26@كل` | machine à écrire : deux lignes courtes | −22 |
| `b26@حدا` | un lit à roulettes qu'on approche | −20 |
| `b26@السمية`, `b26@groupe`, `b26@والنمرة`, `b27@groupe`, `b28@درتيهاش` | un crayon qui coche une case | −16 |
| `b27@ودير` | une petite carte qui se pose | −20 |
| `b27@Bedside+0.2`, `+0.4` | une goutte sur du carton | −20 |
| `b27@groupe` | un stylo qui écrit deux signes | −18 |
| `b28@وعمرك` | une feuille et un stylo qui glissent sur une table | −16 |
| `b28@تسني` | un stylo qui roule | −24 |
| `b28@درتيهاش` | la feuille repoussée ; un gros trait de feutre (le ✗) | −14 |

### Scène 25 — le sang ne revient pas (b29)
| repère | son | niveau |
|---|---|---|
| `b29` | page rabattue | −16 |
| `b29@القصة` | une touche de magnétophone qu'on enfonce (clac mécanique) | −12 |
| `b29@القصة` → `b29@اللور` | pages feuilletées à rebours + compteur qui défile | −16 |
| `b29@اللور` | la touche qui remonte ; puis 0,2 s de **silence** | −16 |
| `b29@الدم` | UNE goutte, nette, seule | −12 |
| `b29@دخل` | un écoulement très léger dans un tuyau | −24 |
| `b29@7`, `b29@7+0.2` | la touche enfoncée deux fois (rien d'autre ne répond) | −14 |
| `b29@كيرجعش` | la touche qui remonte ; à + 0,25 s une dernière goutte | −16 / −12 |

### Scène 26 — l'affiche
| repère | son | niveau |
|---|---|---|
| `b29@end+0.15` | rien (pas de son sur le flash ni sur le dézoom) | — |
| `b29@end+2.7` | une carte qui se pose | −20 |
| `b29@end+2.8` → `+3.5` | un feutre qui écrit (la question) ; le petit compteur qui tourne doucement | −24 / −28 |

## 3. Le compteur — synthétisé (`son/tic_compteur.py`, à écrire plus tard)

Comme le bip du moniteur des autres épisodes : la génération par ElevenLabs ne donne pas de clics nets ni
calés. Un **clic** = 3 ms de bruit filtré (passe-bande autour de 2,5 kHz) + un corps de 25 ms à 180 Hz ; un
**clac** = le même, deux fois plus fort, avec une résonance de 60 ms (boîtier de métal).

| période (repères) | ce qu'on entend | niveau |
|---|---|---|
| `b3@نرجعو` → `i1-0.1` | défilement rapide (40 clics par seconde), les rouleaux tournent à l'envers | −16 |
| intro | rien | — |
| `b4` → `b6@كلشي` | le même défilement, un peu plus bas | −20 |
| `b6@كلشي` | **clac** (00) | −12 |
| `b6@كلشي+0.05` → `b6@وحدة-0.05` | **63 clics**, un par heure, trois par colonne noircie, à la cadence exacte de l'image | −20 |
| `b6@وحدة` | **clac** (63) | −10 |
| `b6@وحدة` → `b16@end+0.2` | la petite roue : deux clics par seconde, presque imperceptibles, sous toutes les scènes de l'histoire | −30 |
| `b8@دازت` → `b8@6` | par-dessus : 12 clics distincts ; **clac** à `b8@6` | −18 / −12 |
| `b16` → `b16@end+0.2` | la petite roue remonte à −24 (la pièce est silencieuse, on doit l'entendre AVANT qu'elle s'arrête) | −24 |
| `b16@end+0.2` → `+0.8` | les intervalles s'allongent : 0,5 s, 0,7 s, puis un dernier clic à + 0,8 | −24 |
| ensuite | plus jamais de cliquetis régulier | — |
| `b22@Organisationsverschulden`, `+0.6` | un déclic (il se décroche), un clac (il se pose) | −16 / −12 |
| `b29@القصة` → `b29@اللور` | bref défilement à l'envers (le rappel) | −18 |

## 4. Musique — piano seul, grave puis apaisé (`son/musique_plan.json`, plus tard)

ElevenLabs Music, `composition_plan` par sections calées sur la frise réelle ; à **recomposer à chaque
changement de durée**. Un seul instrument : piano droit feutré, pris de près, un peu de bruit de mécanique
(marteaux, pédale) — ça va avec les rouleaux et la machine à écrire. Environ 60 à la noire, ré mineur, fin en
fa majeur. Niveau ≈ −25 dBFS, −7 dB sous la voix.
Négatifs : impacts, whooshes, risers, swells, booms, beeps, percussions, cordes, nappes de synthétiseur,
chœurs, sons inversés, « cinematic hit ». La musique ne souligne JAMAIS un tampon ni une chute : ce sont les
bruits qui le font.

| section | repères (provisoire) | ambiance | écriture | intensité |
|---|---|---|---|---|
| M1 Accroche | 0 → `i1-0.1` (0–7,8 s) | grave, suspendue | deux notes basses espacées, pédale tenue ; un silence d'une demi-mesure à `b3@علاش` | 3/10 |
| M2 Intro | `i1` → `b4-0.1` (7,9–17,1) | simple, proche | petit motif au médium, en majeur relatif, sans effet | 4/10 |
| M3 Rembobinage | `b4` → `b6@كلشي` (17,2–22,1) | léger, à reculons | arpèges DESCENDANTS rapides, détachés (écrits ainsi : aucun son inversé) ; s'arrêtent net sur une note à `b6@كلشي` | 5/10 |
| M4 Les heures | `b6@كلشي` → `b11-0.1` (22,1–36,8) | régulier, fatigué | ostinato de croches à la main gauche (une horloge), quelques notes aiguës ; la basse descend d'un degré à `b7@زادت`, s'alourdit à `b8@كثر` | 4 → 5/10 |
| M5 Les jumelles | `b11` → `b13-0.1` (36,9–43,4) | trouble | l'ostinato se dédouble : deux voix identiques, d'abord ensemble, puis décalées d'une croche | 5/10 |
| M6 21:50 | `b13` → `b16-0.1` (43,5–51,2) | tension contenue | une note grave répétée, de plus en plus espacée ; une seconde mineure douce à `b15@دقايق` ; rien de plus fort que 6 | 6/10 |
| M7 13:37 | `b16` → `b16@end+0.9` (51,3–53,3) | arrêt | UNE note tenue, qui s'éteint | 2 → 0/10 |
| — silence | `b16@end+0.9` → `b16@end+3.2` (53,3–55,6) | **aucune musique** (2,3 s) | — | 0 |
| M8 Après | `b16@end+3.2` → `b21-0.1` (55,6–64,6) | fragile | notes aiguës isolées, très lentes, mineur ; un accord suspendu plus clair à `b20@شهور` | 2 → 3/10 |
| M9 Tribunal | `b21` → `b24@genug` (64,7–77,8) | grave, posé | accords en blanches dans le grave ; pendant b22 la basse monte d'un degré quatre fois (le poids qui s'en va) | 4/10 |
| M10 Apaisé | `b24@genug` → `b26-0.1` (77,8–82,0) | soulagement, sans joie | résolution en fa majeur, arpège lent et large ; laisser respirer sous b25 | 4 → 3/10 |
| M11 La règle | `b26` → `b29-0.1` (82,1–90,4) | clair, sûr | motif régulier au médium, en majeur, sobre | 4/10 |
| M12 Dernière phrase | `b29` → `b29@end` (90,5–93,2) | retour du début | les deux notes basses de l'accroche ; silence à `b29@اللور` ; UNE note aiguë seule juste après la goutte (`b29@الدم+0.3`) | 3/10 |
| M13 Affiche | `b29@end+0.15` → fin (93,3–98,9) | repos | accord final tenu, rappel doux du motif de M10, fondu de 1,5 s | 3 → 0/10 |

## 5. Mixage (rappel du skill)

Voix −15 LUFS ; musique −25 dBFS avec −7 dB d'atténuation sous la voix (pas d'atténuation pendant la scène
muette : il n'y a ni voix ni musique) ; bruitages aux niveaux ci-dessus ; `loudnorm` deux passes à −14 LUFS,
crête −1,5 dB ; remuxer sur la vidéo rendue (`-c:v copy`). Vérifier à l'oreille : le dernier clic du compteur
à `b16@end+0.8`, puis une vraie seconde de silence ; la goutte seule de `b29@الدم`.

## 6. À décider avec l'auteur avant de générer

1. Le coup de cloche de cathédrale (scène 4) : un seul, très loin. Le garder ou non.
2. Le cliquetis permanent du compteur (−30 dB) : s'il gêne la voix à l'écoute, le garder seulement de b6 à b8
   et de b13 à b16.
3. Les sons humains (sanglot, souffle, bâillement, haut-le-cœur) : sobres, jamais appuyés ; à retirer un par
   un s'ils paraissent joués.
