/* decor-2.js — décors et objets PROPRES à l'épisode, suite (mêmes conventions que decor.js). */
(function () {
  "use strict";
  const SC = SketchCast, U = SC.util, MAT = SC.MAT, INK = SC.INK, NS = "http://www.w3.org/2000/svg";
  const el = (tag, a, p) => { const n = document.createElementNS(NS, tag); for (const k in a || {}) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; };
  const D = window.EpDecor = window.EpDecor || {};

  /* … suite de l'inventaire … */
})();
