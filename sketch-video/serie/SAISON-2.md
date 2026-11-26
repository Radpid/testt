# Saison 2 — six épisodes « ça peut t'arriver »

Préparation complète AVANT l'enregistrement de la voix : dossier vérifié, script darija, storyboard image par
image, décors et scènes animées sur un minutage provisoire. La voix de l'auteur vient ensuite ; la
synchronisation finale, le son et le rendu se feront dans un second temps.

**Demande de l'auteur (26.11.2026) :** chaque épisode doit être « vraiment très différent de l'autre : pas la
même tournure, pas les mêmes personnages, pas les mêmes décors, et surtout pas le même style — mais le même
skill ». Donc : les RÈGLES ne changent pas (`.claude/skills/serie-storytelling/SKILL.md`), la MISE EN SCÈNE
change à chaque épisode.

## Ce qui ne change jamais (le skill)

Trait à l'encre (rough.js, hachures grises), papier, jaune surligneur #F8CE4E, personnages Persona vivants,
sous-titres karaoké, accroche = la sanction chiffrée, intro « Yassine » avec sa photo juste après l'accroche
(texte i1–i3 identique à AKTE 03 : il est déjà enregistré et réutilisé), aucune question au spectateur au
milieu, la mort MONTRÉE dans une scène muette, carte dès qu'une ville est nommée, pastilles allemandes + arabe
détaché, zones Instagram, sons naturels, décor qui se construit et qui vit (motion design), affiche-résumé
finale + question ÉCRITE + « AKTE NN+1 · قريبا », vérité (rien d'inventé, dire si le jugement est définitif).

## Ce qui change à chaque épisode

| | 04 Köln | 05 Krefeld | 06 Lehrte | 07 Siegburg | 08 Düsseldorf | 09 Friedrichshafen |
|---|---|---|---|---|---|---|
| Dossier | `akte-koeln-transfusion` | `akte-krefeld-nacht` | `akte-lehrte-mtx` | `akte-siegburg-whatsapp` | `akte-duesseldorf-titel` | `akte-friedrichshafen-nacht` |
| Titre de travail | « 63 ساعة » | « بوحدها فالليل » | « كلمة وحدة » | « الگروپ » | « جوج حروف » | « غير سكران » |
| Tournure | on commence par le verdict, puis on REMBOBINE | une nuit racontée heure par heure | on suit un OBJET (la lettre) de main en main | comédie légère dans un écran de téléphone | explication à la 2e personne (« نتا ») | deux récits en parallèle (ce qu'elle voit / ce qui se passe dedans) |
| Dispositif signature | compteur d'heures mécanique + deux poches jumelles | l'hôpital en coupe (maison de poupée) + horloge | pilulier de la semaine + calendrier, bureau vu de dessus | fil WhatsApp dessiné, avatars vivants | les lettres « D » et « r » comme objets, étiquettes de prix | écran coupé en deux, tache d'encre qui s'étale |
| Caméra | travelling latéral le long d'une frise | ascenseur vertical entre les étages, plans larges | plongée à 90° (mains + objets), inserts | défilement vertical du fil | frontale, symétrique, zooms secs | cadres fixes, la ligne de séparation bouge |
| Transition signature | page de planning qui se tourne (`swipe`) | lumière d'une fenêtre qui s'allume / s'éteint (`iris`) | feuille qui glisse sur le bureau (`slideLeft`) | notification qui descend du haut (`slideUp` inversé / `wipe`) | lettre qui tombe et claque (`cut` + `c.shake`) | fondu par l'encre (`fade`) |
| Teinte signature (≤ 5 % de l'image, sur l'objet signature seulement) | rouge sang des poches | bleu nuit (ciel, ombres) | aucune : le jaune = les comprimés de MTX | vert « message envoyé » très pâle | aucune : le jaune = la plaque en laiton | aucune : noir d'encre + jaune du lampadaire |
| Ton / musique | grave, puis apaisé (piano seul) | tension lente, tic-tac, cordes tenues | mécanique, précis (pizzicati, machine à écrire) | léger, ironique (contrebasse, claquements de doigts) | vif, pédagogique (clarinette, rythme marché) | le plus triste de la saison (violoncelle seul, silences) |
| Durée voix visée (×1,3) | 85–95 s · 245–275 mots | 85–95 s · 245–275 mots | 80–90 s · 230–260 mots | 60–70 s · 170–200 mots | 65–75 s · 190–215 mots | 90–100 s · 260–290 mots |
| Décès | oui (scène muette) | oui (scène muette) | oui (scène muette) | non | non | oui (scène muette) |

Numéros 04–09 PROVISOIRES (l'auteur choisit l'ordre de publication) : le numéro n'apparaît qu'à UN endroit de
`story.js` (`const AKTE_NO = …`) et dans le teaser de l'affiche.

### Interdits de ressemblance (valables pour les six)

- Aucun personnage ne reprend la silhouette d'un autre épisode (y compris AKTE 02 et 03 : lire leurs
  distributions dans `videos/akte-unna-geburt/story.js` et `videos/akte-koeln-schweigen/story.js`). Chaque juge,
  chaque médecin, chaque patient est nouveau (coiffure, teinte, lunettes, barbe, tenue, accessoire).
- Aucun décor n'est repris d'AKTE 02/03 ni d'un autre épisode de la saison : `decor.js` est écrit pour
  l'épisode (on peut s'inspirer de la TECHNIQUE de `videos/akte-koeln-schweigen/decor.js`, pas de ses dessins).
- Les scènes « obligées » ont une forme différente dans chaque épisode :
  - **tribunal** — 04 : la balance en gros plan qui penche puis revient ; 05 : la salle vue du fond, deux
    accusés, un seul se lève ; 06 : quatre enveloppes jaunes qui tombent dans quatre boîtes aux lettres ;
    07 : la table du Arbeitsgericht (une juge + deux assesseurs sans robe) vue dans un « appel vidéo » du
    téléphone ; 08 : le guichet du Amtsgericht, le marteau frappe la lettre « D » ; 09 : petit tribunal de
    province vu de l'extérieur à l'aube, puis les parents de dos sur le banc.
  - **sanction** — 04 : le tampon « § 60 » remplace la peine (pas d'icônes) ; 05 : les billets comptés un à un
    pendant que le collègue sort libre ; 06 : quatre étiquettes de prix sur quatre chaises ; 07 : un « virement »
    de 1 000 € dans le fil ; 08 : 7 500 € accrochés à chaque lettre ; 09 : icônes (barreaux en pointillés =
    sursis, billets vers les parents).
  - **carte** — 04 : Allemagne → Rhin → silhouette de la cathédrale ; 05 : carte de nuit, une seule fenêtre
    allumée sur Krefeld ; 06 : deux épingles reliées par l'ambulance (transfert) près de Hannover ;
    07 : la carte dans l'application « Plans » du téléphone ; 08 : arc Iran → Düsseldorf, puis arc Maroc →
    Allemagne ; 09 : le Bodensee dessiné, l'épingle au bord du lac.
  - **intro Yassine** (mêmes éléments obligatoires, cadre différent) — 04 : sa fiche épinglée sur le tableau de
    garde ; 05 : son badge qui pend à un cordon ; 06 : sa photo tenue par un trombone sur une chemise
    cartonnée ; 07 : sa fiche « contact » dans le téléphone ; 08 : une plaque de porte « Yassine » (sans
    « Dr. » : clin d'œil au sujet) ; 09 : un polaroïd scotché.
  - **scène muette du décès** — 04 : le patient dans son lit, le compteur d'heures s'arrête, elle glisse le
    long du mur du couloir ; 05 : dans la coupe de l'hôpital, la fenêtre de sa chambre s'éteint, puis gros plan
    du lit au petit matin ; 06 : la chambre de gériatrie, le pilulier plein à côté du lit, la page du calendrier
    se détache ; 09 : le garçon sur le lit des urgences, les parents arrivent à l'aube et s'enlacent.
- Trois phrases d'accroche ne doivent jamais avoir la même construction d'un épisode à l'autre (lire les
  accroches des autres épisodes avant d'écrire la sienne quand elles existent).

---

## AKTE 04 — Köln · « 63 ساعة » (`videos/akte-koeln-transfusion/`)

**Source principale (jugement complet) :** AG Köln, 16.05.2012, 613 Ls 3/12 — https://www.iww.de/quellenmaterial/id/91519
(une ancienne maquette existe dans `videos/transfusionsfehler/` : autre style, ne rien en reprendre).

**Faits de départ (lus dans le jugement) :** Assistenzärztin, Approbation 01.12.2009, en poste depuis le
15.10.2010 (≈ 9 mois). 30.07.2011 vers 21 h 50, hôpital de Köln : semaine d'environ 63 h, puis Notdienst de plus
de 12 h sans interruption ; formation transfusionnelle (« Blutführerschein ») pas encore reçue. Le laboratoire
lui remet EN MÊME TEMPS deux concentrés pour deux patients ; le groupe n'est pas marqué sur les poches,
seulement sur la feuille d'accompagnement, peu lisible. Patient de 63 ans (0 Rh+, cirrhose, anémie, déjà deux
poches ce jour-là sans problème) reçoit une poche A Rh+ destinée à une autre patiente. ≈ 10 min : il vomit,
réanimation, coagulation qui déraille ; un tiers de la poche est passé. Décès le 31.07.2011 à 13 h 37.
Le lendemain, l'administration la convoque et lui fait signer qu'elle avait reçu la formation (faux).
Verdict : « Die Angeklagte ist einer fahrlässigen Tötung schuldig. » — « Von einer Bestrafung wird abgesehen »
(§ 60 StGB) ; le parquet demandait 90 Tagessätze ; « gravierendes Organisationsverschulden der
Krankenhausverwaltung » ; faute personnelle « am untersten Rand des Denkbaren » ; effondrement, mois de
psychothérapie ; l'hôpital ne remet plus plusieurs poches à la fois.

**À vérifier / compléter :** Rechtskraft ; ce que le tribunal reproche précisément à la médecin (contrôle
d'identité ? Bedside-Test ?) ; qui a posé la poche, comment l'erreur a été vue ; la règle officielle
(Richtlinie Hämotherapie de la Bundesärztekammer : contrôle d'identité + Bedside-Test par le médecin qui
transfuse, au lit du patient) ; texte du § 60 StGB. Le jugement ne mentionne ni infirmière ni famille :
n'en inventer aucune.

**Tournure — le rembobinage.** Accroche : la juge la déclare coupable d'homicide… et refuse de la punir.
« علاش؟ » n'est pas une question au public : c'est la boucle ouverte. On rembobine (le compteur d'heures
tourne à l'envers, les pages du planning reviennent) : la semaine de 63 h → la garde → 21 h 50 → 10 minutes →
le lendemain 13 h 37 → le bureau de l'administration (la signature) → retour au tribunal, et cette fois on
comprend le verdict.

**Dispositif signature.** Un compteur mécanique à rouleaux (comme un compteur kilométrique) fixé à l'écran
pendant toute l'histoire (HUD) : 00 → 63 h → +12 h ; il se fige au décès. Les DEUX POCHES jumelles : mêmes
formes, mêmes étiquettes, seul un petit papier les distingue — le spectateur doit sentir qu'il se serait
trompé aussi. Le planning hebdomadaire (grille lun → dim) dont les cases se noircissent une à une.

**Style.** Compositions en « cases de planning » ; travelling latéral gauche → droite le long de la frise de
la semaine ; chiffres et heures tapés à la machine ; rouge sang sur les poches seulement.

**Personnages (tous nouveaux).** La jeune Assistenzärztin : queue de cheval châtain, sans lunettes, blouse
ouverte ; son visage s'use au fil de la semaine (cernes, sueur, épaules qui tombent) puis larmes au tribunal.
Le technicien du dépôt de sang derrière son guichet (crâne dégarni, lunettes). Le patient (63 ans, homme,
moustache grise). L'administrateur en costume avec son stylo. La juge du Amtsgericht (une seule juge
professionnelle + deux assesseurs). L'expert.

**Décors.** Tableau de garde mural ; couloir de nuit avec horloge 21:50 ; guichet du dépôt de sang (frigo,
lampe, passe-plat) ; chambre vue de face avec potence et poche ; bureau de l'administration (stores, plante,
classeurs, la feuille à signer, le stylo qu'on lui tend) ; salle d'audience du Amtsgericht.

**Le médical en image.** Pourquoi 0 ne peut pas recevoir A : les anticorps du receveur accrochent les
globules A et les collent en grappes (PAS la coupe de vaisseau d'AKTE 03 : ici, une loupe posée sur la
tubulure, des « pinces » qui attrapent les globules).

**Règle finale.** Une poche = un patient = un contrôle AU LIT (nom, date de naissance, numéro de la poche,
Bedside-Test fait par toi) ; et ne signe jamais une formation que tu n'as pas reçue.

---

## AKTE 05 — Krefeld · « بوحدها فالليل » (`videos/akte-krefeld-nacht/`)

**Source (UNE seule pour l'instant) :** Ärzte Zeitung, 01.10.2010 —
https://www.aerztezeitung.de/Wirtschaft/Patient-nach-Hyperglykaemie-gestorben-Aerztin-verurteilt-215114.html
(d'après la Westdeutsche Zeitung).

**Faits de départ (presse, au conditionnel dans l'article) :** nuit du 1er novembre 2008, hôpital de
Krefeld. Diabétique de 47 ans admis avec une glycémie « extrêmement élevée », coma hyperglycémique. Deux
Assistenzärzte de nuit pour plus de 100 patients + les soins intensifs + les urgences. Elle donne de
l'insuline ; la glycémie ne se normalise pas ; elle se fie à un test rapide jugé imprécis et renonce au
laboratoire ; elle ne peut le voir « nur rund alle zwei Stunden » ; l'Oberarzt de garde n'est plus joignable.
Décès : œdème cérébral et pulmonaire, « zentrales Regulationsversagen ». Jugement « am Donnerstag » (fin
sept. 2010) : Assistenzärztin de 32 ans, 7 500 € pour fahrlässige Tötung ; son collègue acquitté ; un expert
reproche à l'hôpital un « schweres Organisationsverschulden ».

**À vérifier / compléter (prioritaire : une 2e source) :** Westdeutsche Zeitung, Rheinische Post, dpa 2010 ;
tribunal (AG Krefeld ?), date exacte, Tagessätze, appel / Rechtskraft, heures de la nuit, valeurs de glycémie,
rôle exact du collègue, ce qu'a dit le juge. Si aucune 2e source n'existe, le dire en tête de `recherche.md`,
écrire le script avec « حسب الصحافة » et signaler l'épisode « une seule source ». Pas d'infirmière dans la
source : le personnel de nuit ne peut être que de la figuration muette.

**Tournure — la nuit en temps réel.** Après l'accroche (7 500 € d'amende… parce qu'elle était seule), une
horloge murale avance de 22 h à 6 h ; chaque étape = une heure de la nuit. Le spectateur voit ce qu'elle ne
peut pas voir : pendant qu'elle court aux urgences, la jauge du patient ne descend pas.

**Dispositif signature.** L'hôpital en COUPE, comme une maison de poupée : trois étages (services, soins
intensifs, urgences), les fenêtres allumées en jaune, sa petite silhouette qui court dans les escaliers,
le bip à sa ceinture. Une jauge de glycémie (thermomètre) à côté de la chambre. Le téléphone de l'Oberarzt
qui sonne dans une chambre à coucher où personne ne décroche.

**Style.** Nuit : ciel et ombres en bleu nuit hachuré, lune, étoiles ; le jaune = la lumière des fenêtres.
Caméra « ascenseur » qui monte et descend entre les étages ; plans très larges (elle est minuscule) alternés
avec des gros plans de son visage. C'est l'épisode des silhouettes petites dans un grand décor.

**Personnages.** L'Assistenzärztin (32 ans) : cheveux courts bouclés foncés, lunettes, tenue de garde
(scrubs), baskets. Le collègue : blond, barbe courte. Le patient (47 ans, homme). L'Oberarzt endormi
(dégarni). Le juge (homme, cheveux gris courts).

**Décors.** Coupe de l'hôpital ; box des urgences ; chambre du patient ; lecteur de glycémie en gros plan
face au tube de laboratoire ; cage d'escalier ; chambre à coucher de l'Oberarzt (téléphone sur la table de
nuit) ; aube derrière les stores ; salle d'audience vue du fond.

**Le médical en image.** Le lecteur rapide comme une règle trop courte : au-delà d'un seuil il n'affiche
plus de chiffre (à sourcer avant de l'écrire) ; le laboratoire, lui, mesure vraiment. Le sucre qui « tire
l'eau » : simple, sans physiologie inventée.

**Règle finale (à sourcer).** Seul(e) et dépassé(e) : appelle, écris-le (Gefährdungsanzeige /
Überlastungsanzeige), et si le Hintergrund ne répond pas, monte plus haut ; une valeur hors échelle se
contrôle au laboratoire.

---

## AKTE 06 — Lehrte · « كلمة وحدة » (`videos/akte-lehrte-mtx/`)

**Source :** Ärzte Zeitung, 25.01.2017 —
https://www.aerztezeitung.de/Wirtschaft/Aerzte-wehren-sich-gegen-Geldstrafe-309121.html
Parallèle : Dachau — https://www.apotheke-adhoc.de/nachrichten/detail/panorama/toedlicher-behandlungsfehler/

**Faits de départ (presse) :** patient de 79 ans, mort en 2013. À l'hôpital de Lehrte, une médecin écrit dans
la lettre de sortie 15 mg de méthotrexate en prise QUOTIDIENNE au lieu d'hebdomadaire ; une autre médecin
contresigne sans voir l'erreur. Transfert en gériatrie dans une autre clinique : deux médecins reprennent
l'ordonnance telle quelle, 15 mg par jour. Trois semaines plus tard, il meurt. Parquet de Hildesheim :
Strafbefehle pour fahrlässige Tötung, 9 000 à 13 500 €, contre quatre médecins de 36 à 56 ans (un Leitender
Oberarzt, un Oberarzt, deux Stationsärzte). Les quatre font opposition (« Damit wären die Beschuldigten
vorbestraft »). Dachau (2000) : même erreur, deux Assistenzärzte, patiente de 74 ans ; classement contre
5 000 € au total (LG München II, 2007).

**À vérifier / compléter (prioritaire : l'issue) :** que s'est-il passé après l'opposition (audience au AG
Lehrte en 2017 : HAZ, NDR, dpa) — condamnation, classement, acquittement ? L'ACCROCHE DÉPEND DE CETTE
RÉPONSE : si l'issue reste inconnue, l'accroche dit ce qui est établi (quatre médecins poursuivis, Strafbefehle
de 9 000 à 13 500 €) et l'écran affiche « Ausgang offen ». Qui a fait quoi parmi les quatre ; cause du
décès ; source officielle de la règle (Rote-Hand-Brief « Methotrexat », BfArM / AkdÄ : une fois par semaine,
écrire le jour). Pas d'infirmière nommée : seulement une main qui donne le comprimé.

**Tournure — l'objet-héros.** Le personnage principal est une FEUILLE : la lettre de sortie. On la voit
naître (un mot tapé), recevoir une signature, être pliée, voyager, être lue, recopiée… Quatre mains, quatre
occasions de voir l'erreur. Les humains passent ; la lettre reste au centre de l'image.

**Dispositif signature.** Le pilulier de la semaine (7 cases, lun → dim) : version juste = UNE case jaune ;
version fausse = SEPT cases jaunes, trois semaines de suite (3 comprimés prévus, 21 donnés — chiffres à
confirmer avec la source). Les pages du calendrier qui s'arrachent.

**Style.** Plongée à 90° : le bureau vu de dessus (clavier, tasse, tampon, trombones, stylo), des MAINS qui
entrent dans le cadre (moufles Persona), jamais un plan « personnage debout dans une pièce » avant la chambre
de gériatrie et le tribunal. Typographie de machine à écrire. Le seul jaune de l'épisode = les comprimés.

**Personnages.** Quatre médecins qu'on reconnaît à leurs mains et à un détail (montre, bague, manche de
blouse, stylo), puis en pied à la fin : deux femmes et deux hommes de 36 à 56 ans, tous différents. Le
patient (79 ans, chauve, moustache blanche, lunettes).

**Décors.** Bureau vu de dessus ; écran avec la lettre ; enveloppe + ambulance entre deux bâtiments ;
chariot de médicaments ; chambre de gériatrie ; mur de calendrier ; l'« usine » de la moelle osseuse ;
quatre boîtes aux lettres.

**Le médical en image.** La moelle = une usine à globules avec trois tapis roulants (rouges, blancs,
plaquettes) ; chaque comprimé de trop arrête un tapis ; sans blancs, l'infection entre.

**Règle finale.** MTX = une fois par SEMAINE : écris le jour en toutes lettres ; une dose qui t'étonne, tu
la vérifies avant de la recopier ; contresigner = relire.

---

## AKTE 07 — Siegburg · « الگروپ » (`videos/akte-siegburg-whatsapp/`)

**Source (communiqué du tribunal) :** ArbG Siegburg, 22.05.2026, 1 Ca 1741/25 —
https://www.justiz.nrw/presse/2026-07-13 ; aussi beck-aktuell, Haufe, zm-online, otto-schmidt (juillet 2026).

**Faits de départ :** un « Arzt in Weiterbildung » se fait examiner dans la clinique où il travaille, puis se
déclare malade avant une garde de week-end ; la Stationsärztin doit la reprendre. Dans le groupe WhatsApp des
médecins (congés, arrêts, échanges de gardes), elle écrit ses diagnostics et qu'il n'est pas vraiment malade,
il aurait seulement « einen Pups quer sitzen ». Le tribunal : données de santé transmises sans droit,
1 000 € de dommages immatériels + interdiction de recommencer ; elle s'est montrée « uneinsichtig » à
l'audience. « Die Entscheidung ist noch nicht rechtskräftig » (appel possible au LAG Köln).

**À vérifier / compléter :** nombre de membres du groupe ; comment elle connaissait les diagnostics ; base
légale exacte (DSGVO Art. 9 et 82) ; appel déposé ou non ; sens exact de l'expression « einen Pups quer
sitzen haben » ; combien il réclamait. Rester très prudent sur le secret médical (§ 203 StGB) : ne le
mentionner que si une source le relie à l'affaire.

**Tournure — la comédie dans le téléphone.** Ton léger, presque drôle, jusqu'à la facture. Tout se passe
DANS un grand smartphone dessiné : notifications, bulles, « en train d'écrire… », coches bleues, réactions des
collègues (avatars ronds qui grimacent), le message qu'on ne peut plus effacer. Le tribunal lui-même arrive
comme un appel vidéo. Pas de mort, pas de moniteur : c'est l'épisode qui fait respirer la saison.

**Dispositif signature.** Le fil de discussion qui défile vers le haut ; le message fautif qui grossit et
devient une pièce à conviction (étiquette « Beweis ») ; le compteur « vu par N personnes ».

**Style.** Interface de téléphone entièrement au trait (jamais de capture d'écran réelle ni de logo
WhatsApp : une application de messagerie dessinée, bulle verte très pâle) ; caméra = défilement vertical ;
rectangles arrondis, bulles `Motion.bubble`. Hors du téléphone : deux décors seulement (le canapé du malade,
la salle des médecins).

**Personnages.** La Stationsärztin (longs cheveux blonds ondulés, blouse, téléphone en main, agacée). Le
jeune médecin malade chez lui (cheveux bouclés châtains, barbe de trois jours, pull, plaid, tasse). Quatre ou
cinq collègues = avatars tous différents. La juge du Arbeitsgericht (chignon foncé, lunettes) et ses deux
assesseurs en civil.

**Décors.** Le téléphone (cadre fixe) ; salle des médecins (machine à café, tableau des gardes du week-end) ;
salon avec canapé ; l'appel vidéo du tribunal ; l'application « Plans » pour la carte.

**Le juridique en image.** Un coffre « Gesundheitsdaten » : la clé appartient au malade, pas au groupe.

**Règle finale.** Un diagnostic — d'un patient ou d'un collègue — ne s'écrit jamais dans un groupe ; pour
une garde, on écrit « krank », rien de plus.

---

## AKTE 08 — Düsseldorf · « جوج حروف » (`videos/akte-duesseldorf-titel/`)

**Sources :** AG Düsseldorf, 02.08.2019, 119 Cs 426/19 — Ärzte Zeitung 04.08.2019
(https://www.aerztezeitung.de/praxis_wirtschaft/recht/article/993379/urteil-internisten-15000-euro-geldstrafe-falschen-doktortitel.html),
IWW (https://www.iww.de/astw/sonstige-steuern/strafrecht-unberechtigterweise-doktortitel-gefuehrt-15000-eur-geldstrafe-f126973),
Ärzteblatt 21/2021 « Ein Doktortitel aus dem Ausland: Vorsicht Falle », Ärzteblatt 13.12.2016 (VG Mainz).

**Faits de départ :** un interniste qui travaille comme chirurgien esthétique à Düsseldorf, titre de docteur
obtenu en Iran. L'Ärztekammer Nordrhein lui écrit qu'il ne peut pas se dire « Dr. med. » ; il ne réagit pas ;
elle le dénonce. Strafbefehl de 13 500 € ; il fait opposition ; à l'audience : 60 Tagessätze × 250 € =
15 000 € (Titelmissbrauch, § 132a StGB). Il annonce un appel. Selon l'IWW, la Kammer tient le titre iranien
pour un « Berufsdoktorat », pas l'équivalent d'une Promotion allemande.

**À vérifier / compléter (prioritaire : la règle pour le public marocain) :** où il utilisait le titre
(plaque, site, tampon…) — ne rien montrer qui ne soit pas sourcé ; suite de l'appel (LG Düsseldorf) ;
13 500 puis 15 000 : même procédure ? ; règle exacte pour un diplôme hors UE, en particulier « Doctorat en
médecine » du Maroc / Maghreb : accords de la KMK sur les grades étrangers, anabin, loi du Land (NRW :
Hochschulgesetz § 69), pages des Ärztekammern — sous quelle FORME on a le droit de l'écrire (forme
d'origine + université ? jamais « Dr. med. » ?), et comment obtenir un vrai « Dr. med. » (Promotion dans une
université allemande). Sans source primaire claire, la règle reste générale et l'écran dit « Keine
Rechtsberatung — frag deine Ärztekammer ». Le même médecin a eu d'autres procédures (décès de patientes) :
vérifier, le noter dans `recherche.md`, et NE PAS en faire le sujet (une ligne neutre au maximum).

**Tournure — l'explication à la 2e personne.** L'épisode parle à « نتا » : un jeune médecin marocain qui
vient d'arriver, diplôme sous le bras, et qui commande son tampon. L'affaire de Düsseldorf est l'exemple qui
lui tombe dessus. Rythme rapide, phrases courtes, un peu d'ironie.

**Dispositif signature.** Les deux lettres « D » et « r » sont des OBJETS : elles se vissent sur une plaque,
tombent, reçoivent chacune une étiquette de prix (7 500 € la lettre), se font marteler par le juge, puis une
parenthèse vient se poser derrière le nom. Typographie animée d'un bout à l'autre.

**Style.** Compositions frontales et symétriques comme une enseigne ; très peu de personnages en pied ;
zooms secs (pas de travelling) ; le jaune = le laiton de la plaque. C'est l'épisode « affiche ».

**Personnages.** Le médecin de l'affaire (chauve, barbe courte, costume) — neutre, pas caricatural. « نتا » :
jeune médecin (cheveux courts foncés, veste, tube à diplôme) et sa collègue (queue de cheval foncée, blouse) :
le public des deux sexes. L'employée de la Kammer (âgée, lunettes). Le juge unique du Amtsgericht (âgé).

**Décors.** Porte de cabinet + plaque ; atelier du graveur (étau, lettres en vrac) ; boîte aux lettres avec
le courrier de la Kammer qui s'empile ; guichet du tribunal ; mur de diplômes ; l'écran « anabin ».

**Règle finale (selon la recherche).** Ton doctorat d'origine s'écrit comme il a été délivré (forme
d'origine) ; « Dr. med. » = une Promotion ; avant d'imprimer une plaque, un tampon ou une carte, demande par
écrit à ta Ärztekammer.

---

## AKTE 09 — Friedrichshafen · « غير سكران » (`videos/akte-friedrichshafen-nacht/`)

**Sources :** Schwäbische Zeitung
(https://www.schwaebische.de/regional/bodensee/friedrichshafen/18-jaehriger-stirbt-vor-gericht-gibt-es-viel-kritik-am-klinikum-am-bodensee-4542045),
vol.at (https://www.vol.at/tragoedie-in-klinik-am-bodensee-schaedelbruch-uebersehen-patient-tot/10137560) ;
fiche « 02 » de `SERIE.md`.

**Faits de départ (presse, détails contradictoires) :** septembre 2023, urgences de nuit. Un jeune de
18 ans (plus de 1,9 ‰) après une chute à vélo ; Assistenzärztin de 38 ans ; surveillance sans scanner ;
aggravation vers 3 h, arrêt vers 6 h ; scanner : fracture du crâne + hématome ; décès. AG Tettnang (procès
depuis le 27.04.2026, verdict annoncé le 04.05.2026) : 15 mois avec sursis + 20 000 € aux parents ; le
parquet demandait 21 mois et un Berufsverbot (refusé) ; elle avait fait opposition à un Strafbefehl de
41 250 € ; licenciée. **Non définitif.**

**À vérifier / compléter (prioritaire : le verdict exact et l'appel) :** texte du verdict (date, peine,
motifs), appel au LG Ravensburg et son état en novembre 2026, heure du décès, l'histoire du médicament
antihypertenseur, ce que disent les experts et le tribunal sur l'organisation de la clinique, présence d'un
infirmier / d'une infirmière de nuit. Ne garder que ce que DEUX sources donnent pareil ; le reste part dans
« incertain ». La règle : indication du scanner après traumatisme crânien chez un patient alcoolisé
(S2e-Leitlinie Schädel-Hirn-Trauma, AWMF) — citer exactement.

**Tournure — deux récits en parallèle.** L'écran est coupé en deux : EN HAUT ce qu'elle voit (un jeune ivre
qui dort, « il cuve »), EN BAS ce qui se passe à l'intérieur (la coupe du crâne, la tache qui grandit). Une
seule horloge pour les deux. Les deux moitiés ne se rejoignent qu'au scanner — trop tard.

**Dispositif signature.** L'étiquette « betrunken » collée sur lui comme un autocollant qui cache la plaie.
La TACHE D'ENCRE : le saignement est de l'encre qui s'étale sur le papier (le matériau même de la série).
La ligne de séparation de l'écran penche à mesure que la pression monte.

**Style.** Diptyque fixe, pas de travelling ; noir d'encre et jaune du lampadaire ; scènes d'extérieur de
nuit (route, vélo couché, lampadaire, bruine). L'épisode le plus lent et le plus triste : laisser des
silences.

**Personnages.** L'Assistenzärztin (38 ans, chignon foncé, blouse sur tenue de garde, fatiguée). Le garçon
(18 ans, cheveux bouclés blonds, sweat à capuche). Ses parents (la mère au carré gris, le père moustachu) :
on ne les voit qu'à la fin. La procureure. Le juge du petit tribunal.

**Décors.** Route de nuit + vélo + lampadaire ; box des urgences avec rideau ; lit d'observation ; coupe du
crâne ; scanner ; salle d'attente à l'aube ; tribunal de Tettnang vu de la rue ; le Bodensee.

**Le médical en image.** La boîte crânienne ne s'agrandit pas : l'encre qui entre pousse le reste. Un seul
schéma, lent, sans chiffres inventés.

**Règle finale (à sourcer).** Alcool + coup sur la tête : l'alcool n'explique rien tant que le scanner ne
l'a pas dit ; surveiller = réveiller, tester, écrire l'heure.

**Publication :** seulement quand le jugement est définitif, ou en disant clairement « الحكم مازال ما
نهائيش » à l'écran et à l'oral.

---

## Livrables par épisode (dossier `videos/<épisode>/`)

| Fichier | Contenu |
|---|---|
| `recherche.md` | faits numérotés F1… avec source et fiabilité, chronologie, citations allemandes verbatim, incertain, statut du jugement, règle sourcée |
| `scenario.md` | fiche, TEXTE À ENREGISTRER (beats en darija + traduction française + faits utilisés), phrases [FR], pauses, relecture |
| `beats.js`, `preview.json`, `timings.js` (PROVISOIRE) | texte exact par beat ; minutage estimé par `tools/preview_timings.mjs` |
| `storyboard.md` | distribution, inventaire des décors, scène par scène (construction, mouvements, caméra, textes, repères), affiche |
| `son/plan_son.md` | sons naturels par repère + sections de musique (aucune génération avant la voix) |
| `decor.js`, `story.js`, `index.html` | décors, personnages et scènes animées sur le minutage provisoire |
| `out/planches/` | planches-contact avec la maquette Instagram (hors git) |
| `instagram.md` | brouillon de description (sources, mentions) |

Outils : `tools/preview_timings.mjs`, `tools/planche.mjs` (`--ig`, `--beats`, `--from/--to/--step`),
`tools/mouvement.mjs`, `tools/overlapscan.mjs`, `tools/errcheck.mjs`, `tools/cuetimes.mjs`,
`tools/ig_overlay.py`.
