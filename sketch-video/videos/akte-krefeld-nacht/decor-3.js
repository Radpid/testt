/* decor-3.js — décors et objets PROPRES à l'épisode, suite et fin (mêmes conventions que decor.js). */
(function () {
  "use strict";
  const SC = SketchCast, U = SC.util, MAT = SC.MAT, INK = SC.INK, NS = "http://www.w3.org/2000/svg";
  const el = (tag, a, p) => { const n = document.createElementNS(NS, tag); for (const k in a || {}) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; };
  const D = window.EpDecor = window.EpDecor || {};

  /* … fin de l'inventaire, dessins délicats (personne allongée, mains, dos…) … */
})();
