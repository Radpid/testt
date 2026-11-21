# Transfusionsfehler — maquette de récit animé

Une vidéo dans le moteur `sketch-video` existant. Format 1080 × 1920, darija
et termes allemands, illustrations vectorielles originales, encre et jaune.

## Récit

1. La confusion : patient 0 Rh+, poche A Rh+, deux poches semblables et document.
2. Les défaillances : surcharge, formation non reçue, organisation hospitalière.
3. Le jugement : culpabilité pour homicide involontaire, puis dispense de peine.

Source : [AG Köln, 16 mai 2012, 613 Ls 3/12, reproduit par IWW](https://www.iww.de/quellenmaterial/id/91519).
Les chiffres de charge de travail et les motifs sont ceux de ce jugement
historique. Les illustrations sont schématiques : les groupes sanguins sont des
annotations explicatives, pas des étiquettes imprimées sur les poches du dossier.
Le schéma des barrières visualise les défaillances décrites ; il n'est pas une
figure extraite du jugement. Aucun pronostic chiffré ni recommandation médicale
actuelle n'est ajouté.

## Prévisualiser

Ouvrir `index.html` dans un navigateur : lecture/pause, curseur de temps,
et bouton **Voir le poster complet**. `index.html?poster=1` ouvre le résumé final.

`preview-timings.js` est un minutage provisoire **sans voix**, indiqué comme tel
dans le lecteur. Un vrai `timings.js`, produit par l'outil d'alignement ou de voix
du dépôt, le remplace automatiquement s'il existe.

## Animation

- Dessin progressif des poches, du patient, du lit et du moniteur.
- Apparition du groupe sanguin sur le mot correspondant.
- Tubulure dessinée, particules suivant sa courbe, symbole d'incompatibilité.
- Caméra vers la chaîne des causes, compteur de durée et horloge accélérée.
- Trois barrières en perspective, reliées par un trajet qui traverse leurs failles.
- Construction du tribunal et révélation séparée des deux éléments du jugement.
- Surlignage du message final et dézoom vers tout le poster.

Les effets propres à cette vidéo sont dans `motion.js` et `assets/illustrations.js`.
`SV.seek(t)` reste déterministe ; `engine/` n'est pas modifié.

Depuis `sketch-video/` :

```sh
node engine/render.mjs videos/transfusionsfehler --sheet
node engine/render.mjs videos/transfusionsfehler --frames 9,23,41,55,76 --safe
node engine/render.mjs videos/transfusionsfehler
```
