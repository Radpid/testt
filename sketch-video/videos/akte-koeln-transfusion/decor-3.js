/* decor-3.js — AKTE 04 « 63 ساعة » : décors et objets PROPRES à l'épisode, 3e partie = scènes 21 à 25 (le dossier « Rechtskraft »,
 * la règle, le sang ne revient pas). Mêmes conventions que decor.js ; aides partagées : const K = D.kit (decor.js).
 * Reste à dessiner ici (storyboard § 2) : D.caseFile, D.deskLamp (scène 21) · D.ruleCard, D.lessonCard, D.bedsideCard, D.sampleTube
 * (scènes 22–24) · D.rewKey, D.pageFlip, D.dripBig (scène 25). Déjà faits ailleurs et réutilisables : D.rollCounter (fenêtre à rouleau,
 * n: 1), D.loopTag, D.bloodBag, D.tube, D.formSheet, D.pen (decor.js) ; D.bedFront04, D.wristband, D.docSheet, D.desk04 (decor-2.js).
 */
(function boot() {
  "use strict";
  // l'outil d'essai charge decor-3.js AVANT decor.js (tri alphabétique) : sans le kit, on attend que decor.js nous relance
  if (!(window.EpDecor && window.EpDecor.kit)) { const W = window.EpDecor = window.EpDecor || {}; (W._later = W._later || []).push(boot); return; }
  const SC = SketchCast, U = SC.util, D = window.EpDecor, K = D.kit;
  const { el, ln, tw, MAT, f, clamp, lerp, hs, INK, YEL, SH, PAPER } = K;

  /* … fin de l'inventaire (scènes 21 à 25) … */
})();
