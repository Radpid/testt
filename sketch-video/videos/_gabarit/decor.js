/* decor.js — décors et objets PROPRES à l'épisode, 1re partie (aucun dessin repris d'un autre épisode) ; suite dans decor-2.js et decor-3.js.
 * Essai de chaque dessin, seul, sur une planche : node tools/essai_decor.mjs videos/<episode> [--only nom1,nom2]
 *   D.nom.essais = [{ … }, { … }] (facultatif) : jeux de paramètres à montrer (états ouvert / fermé, 0 / 0.5 / 1…).
 * Convention : chaque fonction dessine dans le groupe SVG g, autour de son point d'ancrage (0,0), et reçoit ses
 * paramètres animés dans o (valeurs arrondies : le moteur ne redessine que si o change). Elle peut renvoyer des ancres
 * (ex. { main: [x, y] }) que story.js lit ensuite dans node.out.
 * Trait à main levée : U.ctx(g, graine) puis U.shape(C, clé, chemin, matière, { sw }) et U.stroke(C, clé, chemin, { sw }).
 * Matières : MAT.white, MAT.grey (hachuré), MAT.yellow, MAT.dark, MAT.light, MAT.wood… ; aplats simples avec el("rect", …).
 * Chaque objet a une ombre décalée (#D2D2CB, translate 6–8 px) et des détails : pas de forme nue.
 * Les parties qui bougent sont pilotées par o (0..1) ou dessinées à part pour être animées avec Motion (m.build, m.sway…).
 */
(function () {
  "use strict";
  const SC = SketchCast, U = SC.util, MAT = SC.MAT, INK = SC.INK, NS = "http://www.w3.org/2000/svg";
  const el = (tag, a, p) => { const n = document.createElementNS(NS, tag); for (const k in a || {}) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; };
  const D = window.EpDecor = window.EpDecor || {};

  // EXEMPLE (à supprimer) : suspension avec son cône de lumière — ancrage = point d'accroche au plafond
  D.exemple = (g, o = {}) => {
    const C = U.ctx(g, 611, false, 1), L = o.len || 110;
    el("path", { d: `M-40 ${L + 34} L40 ${L + 34} L240 ${L + 900} L-240 ${L + 900} Z`, fill: "#F8CE4E", opacity: 0.13 }, g);
    U.stroke(C, "fil", `M0 0 L0 ${L}`, { sw: 3 });
    U.shape(C, "abat", `M-16 ${L} L16 ${L} L46 ${L + 34} L-46 ${L + 34} Z`, MAT.grey, { sw: 2.6 });
    el("ellipse", { cx: 0, cy: L + 36, rx: 22, ry: 8, fill: "#FFF6C9", stroke: INK, "stroke-width": 2 }, g);
    return { ampoule: [0, L + 36] };
  };


})();
