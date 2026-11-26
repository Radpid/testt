/* decor-3.js — AKTE 08 « جوج حروف » (Düsseldorf) — décors et objets PROPRES à l'épisode, 3e partie (S24 à S29 : la règle).
 * Mêmes conventions, mêmes matières et mêmes aides que decor.js (D.util). Liste d'état : en tête de decor.js.
 * À faire ici : D.porteBureau, D.corbeille (S29) · D.socle (S24) · D.potence, D.chaine, D.different, D.loi, D.fleche (S24 à S28).
 */
(function () {
  "use strict";
  const D = window.EpDecor = window.EpDecor || {};
  // D.util vient de decor.js : si ce fichier est chargé avant lui (essai_decor.mjs trie par nom), il attend dans D._apres.
  if (D.util) init(); else (D._apres = D._apres || []).push(init);
  function init() {
  const SC = window.SketchCast, U = SC.util;
  const { MAT, INK, OMBRE, PAPIER, ACIER, HALO, el, f, rad, lerp, clamp, rr, ln, ombre, txt, grib, visTete } = D.util;   // eslint-disable-line no-unused-vars
  void U; void MAT; void INK; void OMBRE; void PAPIER; void ACIER; void HALO; void el; void f; void rad; void lerp; void clamp; void rr; void ln; void ombre; void txt; void grib; void visTete;

  /* … fin de l'inventaire (groupe G et S29) … */
  }   // fin de init()
})();
