# Reprise du chantier — Saison 2 AKTE

Mis en pause le 27.11.2026 à la demande de l'auteur (quota de la semaine). Tout le travail est dans git, branche
`claude/awesome-shannon-2sa9g5`. Rien n'est perdu ; seules les étapes interrompues sont à relancer.

## Ce qui est fini

- **Écriture des six épisodes** : `recherche.md` (dossier vérifié), `scenario.md` (texte à enregistrer, relu),
  `beats.js`, minutage provisoire, `storyboard.md` (scène par scène), `son/plan_son.md`.
  Différences entre épisodes contrôlées ; tableau dans `SERIE.md`, direction dans `SAISON-2.md`.
- **Scripts à enregistrer** pour l'auteur : `serie/saison-2-scripts.html`
  (publié : https://claude.ai/artifact/Htc7uHGNtP7NsmeMEosU41). Régénérer avec `python3 tools/scripts_page.py`
  si un texte change.
- **Gabarit et outils** : `videos/_gabarit/` (socle en plusieurs fichiers), `tools/essai_decor.mjs`,
  `tools/planche.mjs`, `tools/mouvement.mjs`, `tools/preview_timings.mjs`, `tools/sauvegarde.sh`, etc.

## Où en est la construction (décors et scènes, avant la voix)

Les comptes rendus détaillés de chaque étape sont dans `videos/<épisode>/etat-construction.md`.

| Épisode | Dossier | Étapes finies | Reprendre à |
|---|---|---|---|
| 04 | `akte-koeln-transfusion` | **tout (1 à 9) + revue finale de Claude** | attend l'audio de l'auteur (voir « Après la construction ») |
| 05 | `akte-krefeld-nacht` | décors 1, décors 2 | étape 3 : décors 3 + HUD (decor-3.js fait, story.js en cours) |
| 06 | `akte-lehrte-mtx` | décors 1, décors 2 | étape 3 : décors 3 + HUD (decor-3.js et dessins délicats faits, story.js en cours) |
| 07 | `akte-siegburg-whatsapp` | décors 1, 2 et 3 (+ HUD, lieux) | étape 4 : scènes, partie 1 (scenes-1.js commencé) |
| 08 | `akte-duesseldorf-titel` | décors 1, décors 2 | étape 3 : décors 3 + HUD (decor-3.js fait, story.js en cours) |
| 09 | `akte-friedrichshafen-nacht` | décors 1, décors 2 | étape 3 : décors 3 + HUD (decor-3.js en cours) |

Étapes du chantier : 1 décors 1 · 2 décors 2 · 3 décors 3 + HUD + mises en place · 4 à 7 scènes (quatre parties) ·
8 revue par captures · 9 contre-revue + description Instagram + fiche de suite.

## Comment reprendre (pour Claude)

Le script du chantier est dans le dépôt : `sketch-video/serie/workflows/construction.js` (celui de l'écriture :
`serie/workflows/ecriture.js`). Il accepte « épisode@étape » pour reprendre où on s'est arrêté. Lancer trois
chantiers de deux épisodes (la machine a 4 cœurs), avec l'outil Workflow et `scriptPath` vers ce fichier :

- `args: ["08@3", "04@3"]`
- `args: ["07@4", "06@3"]`
- `args: ["05@3", "09@3"]`

Chaque étape lit `etat-construction.md`, regarde les fichiers, complète, ajoute son compte rendu au même fichier
et sauvegarde avec `tools/sauvegarde.sh` (commit + envoi). Si le chantier s'arrête encore, mettre à jour le
tableau ci-dessus à partir des `etat-construction.md` et relancer de la même façon.

Avant de relancer : `node tools/errcheck.mjs videos/<épisode>/index.html 1 6` sur chaque épisode (tous chargeaient
sans erreur au moment de la pause). La photo de l'auteur (`assets/portrait.png`) n'est pas dans git : la recopier
depuis un épisode qui l'a, ou la redemander à l'auteur si le conteneur est neuf.

## Après la construction

1. Revue finale par Claude : planches de chaque épisode regardées, envoi des planches à l'auteur.
2. L'auteur enregistre les six textes (page des scripts) et envoie l'audio.
3. Montage de la voix (modèle : `videos/akte-koeln-schweigen/montage_voix.py`), `timings.js` remplacé, repères
   fragiles revérifiés (storyboard § 6), son (`son/plan_son.md`), rendu final, `instagram.md`.

## Décisions qui attendent l'auteur

- 08 : son pseudo @dr.aguilo (dans l'affaire, des comptes « dr… » ont compté comme port du titre) ; la fiche anabin
  du Maroc à ouvrir une fois ; dire plus clairement ou non l'autre procès du médecin.
- 05 (une seule source de presse) et 09 (jugement pas définitif en mai 2026) : publier ainsi ou attendre.
- 07 phrase 10 : à dire avec ses mots.
- Ordre de publication conseillé : 04, 07, 06, 08, 05, 09.
