/* decor-2.js — AKTE 08 « جوج حروف » (Düsseldorf) — décors et objets PROPRES à l'épisode, 2e partie (S8 à S23).
 * Mêmes conventions, mêmes matières et mêmes aides que decor.js (D.util). Liste d'état : en tête de decor.js.
 * Essai : node tools/essai_decor.mjs videos/akte-duesseldorf-titel --only livre,table … --cols 3 --cell 360 --per 15
 *
 * CONTENU
 *   Bibliothèque (S8, S9) : D.table · D.livre · D.fenetreArc · D.nuage · D.lampeTable · D.ecran · D.planche
 *   Vestiaire (S12, S15)  : D.patere · D.blouse · D.stetho · D.sabots · D.badge
 *   Lettres (S13, S16)    : D.boite · D.enveloppe · D.brief · D.lierre (hors inventaire : lierre sur treillage)
 *   Site (S14, S15, S17)  : D.navigateur · D.poste · D.fiche (aussi S26) · D.dateur · D.bac
 *   Tribunal (S18, S19)   : D.strafbefehl · D.salleFace · D.banc · D.tableProc · D.bureauGreffe · D.tableDefense ·
 *                           D.platzschild · D.dossier (hors inventaire : le dossier qui tombe sur le banc, celui de STA)
 *   Rebord (S20, S21, S23): D.rebord · D.feuille (aussi la feuille de RIC en S19 et S27)
 *   Chariot (S22)         : D.chariot · D.ordner · D.chemise
 * Les textes « parlants » (citations, noms en pointillé, « Dr. med. », compteurs, gloses arabes) restent des nœuds de
 * story.js : les dessins renvoient dans out les places où les poser.
 */
(function () {
  "use strict";
  const D = window.EpDecor = window.EpDecor || {};
  // D.util vient de decor.js : si ce fichier est chargé avant lui (essai_decor.mjs trie par nom), il attend dans D._apres.
  if (D.util) init(); else (D._apres = D._apres || []).push(init);
  function init() {
  const SC = window.SketchCast, U = SC.util;
  const { MAT, INK, OMBRE, PAPIER, CLAIR, GRIB, ACIER, CREME, HALO, GRIS, AR, el, f, rad, lerp, clamp, rr, rng, ln, ombre, cercle, ellipse, txt, mix, lw, grib, visTete } = D.util;
  let _uid = 0; const uid = (p) => "ep08b" + p + (++_uid);                       // identifiants de clipPath (jamais deux fois le même)
  const ctx = (g, seed) => U.ctx(g, seed, false, 1);
  const clipG = (g, d) => { const id = uid("c"); el("path", { d }, el("clipPath", { id }, g)); return el("g", { "clip-path": `url(#${id})` }, g); };
  const cone = (g, x, y, wHaut, wBas, H, op) => el("path", { d: `M${f(x - wHaut)} ${f(y)} L${f(x + wHaut)} ${f(y)} L${f(x + wBas)} ${f(y + H)} L${f(x - wBas)} ${f(y + H)} Z`, fill: HALO, opacity: f(op) }, g);
  // largeur d'un texte Kalam 700, un peu large exprès (mesurée dans le navigateur : « … » ≈ 0,64 em, espace ≈ 0,3 em, lettres 0,43 à 0,52 em)
  const larg = (t, s) => [...String(t)].reduce((a, ch) => a + (ch === "…" ? 0.66 : ch === " " ? 0.3 : 0.5), 0) * s;
  const fit = (t, s, w) => f(Math.min(s, s * w / Math.max(1, larg(t, s))));             // corps Kalam qui tient dans w
  // tube (tuyau, bras) : contour d'encre + âme de couleur + reflet
  const tube = (g, d, w, col, refl) => { ln(g, d, w + 3, INK); ln(g, d, w, col); if (refl) ln(g, d, Math.max(1, w * 0.22), refl, { opacity: 0.85 }); };
  // flèche de rechargement (arc de 300° + pointe), tournée de a degrés autour de (cx, cy)
  const recharger = (g, cx, cy, r, a) => {
    const b = el("g", { transform: `rotate(${f(a || 0)} ${f(cx)} ${f(cy)})` }, g), a0 = rad(-60), a1 = rad(230);
    const p0 = [cx + Math.cos(a0) * r, cy + Math.sin(a0) * r], p1 = [cx + Math.cos(a1) * r, cy + Math.sin(a1) * r];
    ln(b, `M${f(p0[0])} ${f(p0[1])} A${r} ${r} 0 1 1 ${f(p1[0])} ${f(p1[1])}`, 2.2, INK);
    const t = [-Math.sin(a0), Math.cos(a0)], n = [Math.cos(a0), Math.sin(a0)], k = r * 0.55;
    el("path", { d: `M${f(p0[0] - t[0] * k * 0.2)} ${f(p0[1] - t[1] * k * 0.2)} L${f(p0[0] + n[0] * k * 0.7 + t[0] * k)} ${f(p0[1] + n[1] * k * 0.7 + t[1] * k)} L${f(p0[0] - n[0] * k * 0.7 + t[0] * k)} ${f(p0[1] - n[1] * k * 0.7 + t[1] * k)} Z`, fill: INK, transform: `rotate(180 ${f(p0[0])} ${f(p0[1])})` }, b);
  };
  // pointeur de souris (ancrage = la pointe)
  const pointeur = (g) => {
    el("path", { d: "M3 4 L3 30 L9 24 L14 35 L19 33 L14 22 L22 22 Z", fill: "rgba(28,26,28,.2)" }, g);
    el("path", { d: "M0 0 L0 26 L6 20 L11 31 L16 29 L11 18 L19 18 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, g);
  };

  /* ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
   * D. LA BIBLIOTHÈQUE (S8, S9) — mise en place FIXE : D.mur uni · D.table bord avant (540, 1340) · D.fenetreArc (540, 720) ·
   *    D.lampeTable (800, 1340) en S8, (540, 1340) en S9 · les livres se posent à y 1340 (un livre = 46 px)
   * ═════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

  /* ───────── D.table — plateau de table en bois vu de face, un peu par-dessus ─────────
   * o = { w: 840, prof: 30 (dessus visible au-dessus du bord avant), ep: 24 (chant), pieds: true, bas: 130 (bout des pieds) }
   * Ancrage = milieu du BORD AVANT du dessus : les objets se posent à y = 0. Dessus de y −prof à 0, chant de 0 à ep.
   * S8, S9 : en (540, 1340) → x 120–960. S18 (« plateau de bureau, dalle de y 1320 à 1344 ») : D.table({ w: 900, prof: 12,
   * pieds: false }) en (540, 1320). Renvoie { dessus: [−prof, 0], chant: [0, ep] }. */
  D.table = (g, o) => {
    o = Object.assign({ w: 840, prof: 30, ep: 24, pieds: true, bas: 130, seed: 1001 }, o);
    const w = o.w, x0 = -w / 2, x1 = w / 2, P = o.prof, E = o.ep, C = ctx(g, o.seed + Math.round(w));
    if (o.pieds) {
      el("path", { d: rr(x0 + 40, E, w - 80, 40, 2), fill: "rgba(28,26,28,.10)" }, g);
      U.shape(C, "ceint", rr(x0 + 46, E - 2, w - 92, 32, 2), MAT.light, { sw: 2.4, r: 0.5 });
      ln(g, `M${f(x0 + 56)} ${E + 22} L${f(x1 - 56)} ${E + 22}`, 1.2, "#BDBDB6");
      [-1, 1].forEach((s) => {
        const xa = s * (w / 2 - 44);
        el("path", { d: rr(xa - 17 + 7, E, 34, o.bas - E, 3), fill: "rgba(28,26,28,.12)" }, g);
        U.shape(C, "pied" + s, rr(xa - 17, E - 2, 34, o.bas - E + 2, 3), MAT.wood, { sw: 2.8 });
        ln(g, `M${f(xa - 7)} ${E + 10} L${f(xa - 7)} ${o.bas - 8}`, 1.3, "#FFFFFF");
      });
    }
    el("path", { d: `M${x0} ${E} L${x1} ${E} L${x1 - 4} ${E + 9} L${x0 + 4} ${E + 9} Z`, fill: "rgba(28,26,28,.14)" }, g);
    if (P > 0) {
      U.shape(C, "dessus", `M${f(x0 + Math.min(14, P * 0.5))} ${-P} L${f(x1 - Math.min(14, P * 0.5))} ${-P} L${x1} 0 L${x0} 0 Z`, MAT.wood, { sw: 2.6, r: 0.5 });
      let v = "";
      [0.3, 0.62].forEach((t, i) => { const y = -P * (1 - t); v += `M${f(x0 + 60 + i * 90)} ${f(y)} C${f(x0 + w * 0.3)} ${f(y - 3)} ${f(x0 + w * 0.55)} ${f(y + 3)} ${f(x1 - 70 - i * 40)} ${f(y)}`; });
      ln(g, v, 1.3, "#BDBAAE");
    }
    U.shape(C, "chant", rr(x0 - 3, 0, w + 6, E, 4), MAT.wood, { sw: 3 });
    ln(g, `M${f(x0 + 8)} 6 L${f(x1 - 8)} 6`, 1.3, "#FFFFFF");
    ln(g, `M${f(x0 + w * 0.2)} ${f(E * 0.62)} c12 -3 26 -2 36 2 M${f(x1 - w * 0.3)} ${f(E * 0.55)} l46 -1`, 1.2, "#ABABA4");
    return { dessus: [-P, 0], chant: [0, E], w };
  };
  D.table.essais = [{}, { w: 900, prof: 12, pieds: false }];

  /* ───────── D.livre — livre COUCHÉ vu par le dos : dos arrondi (coiffes), deux nerfs, étiquette ─────────
   * o = { w: 300, h: 46, mat: "gris" | "blanc" | "fonce", t: "" (Kalam, corps s: 20), icone: null | "loupe",
   *       nerfs: true, pointille: false (seulement l'emplacement vide, en tirets : S8), partie: "tout" | "icone" (la loupe seule) }
   * Ancrage = centre du BAS (le livre se pose sur y = 0). Renvoie { haut: [0, −h], icone: [x, y] (centre de la loupe) }. */
  const loupeIcone = (g, x, y, r) => {
    el("circle", { cx: f(x), cy: f(y), r: f(r), fill: "#FFFFFF", stroke: INK, "stroke-width": f(Math.max(1.6, r * 0.28)) }, g);
    ln(g, `M${f(x + r * 0.7)} ${f(y + r * 0.7)} L${f(x + r * 1.7)} ${f(y + r * 1.7)}`, f(Math.max(2.4, r * 0.42)), INK);
    ln(g, `M${f(x - r * 0.45)} ${f(y - r * 0.1)} A${f(r * 0.5)} ${f(r * 0.5)} 0 0 1 ${f(x - r * 0.05)} ${f(y - r * 0.48)}`, f(Math.max(1, r * 0.16)), "#9A9A94");
  };
  D.livre = (g, o) => {
    o = Object.assign({ w: 300, h: 46, mat: "gris", t: "", s: 20, icone: null, nerfs: true, pointille: false, partie: "tout", seed: 1011 }, o);
    const w = o.w, h = o.h, x0 = -w / 2, x1 = w / 2, R = Math.min(h * 0.3, 12);
    if (o.partie === "icone") { loupeIcone(g, 0, 0, 7); return {}; }
    if (o.pointille) {
      el("path", { d: rr(x0, -h, w, h, R), fill: "#FFFFFF", opacity: 0.35 }, g);
      ln(g, rr(x0, -h, w, h, R), 2.8, "#77776F", { "stroke-dasharray": "11 8" });
      return { haut: [0, -h] };
    }
    const M = o.mat === "blanc" ? MAT.milk : o.mat === "fonce" ? MAT.mid : MAT.grey, C = ctx(g, o.seed + Math.round(w * 7 + h));
    const fonce = o.mat === "fonce";
    ombre(g, rr(x0, -h, w, h, R), 5, 4);
    U.shape(C, "dos", rr(x0, -h, w, h, R), M, { sw: 2.6, r: 0.5 });
    // coiffes (les deux bouts arrondis du dos) et mors (les bords des plats, en haut et en bas)
    ln(g, `M${f(x0 + 9)} ${f(-h + 4)} C${f(x0 + 3)} ${f(-h * 0.66)} ${f(x0 + 3)} ${f(-h * 0.34)} ${f(x0 + 9)} -4 M${f(x1 - 9)} ${f(-h + 4)} C${f(x1 - 3)} ${f(-h * 0.66)} ${f(x1 - 3)} ${f(-h * 0.34)} ${f(x1 - 9)} -4`, 1.6, fonce ? "#3A3A37" : "#77776F");
    ln(g, `M${f(x0 + 12)} ${f(-h + 5)} L${f(x1 - 12)} ${f(-h + 5)} M${f(x0 + 12)} -5 L${f(x1 - 12)} -5`, 1.2, fonce ? "#55524B" : "#9A9A94");
    ln(g, `M${f(x0 + 16)} ${f(-h + 9)} L${f(x1 - 40)} ${f(-h + 9)}`, 1.4, "#FFFFFF", { opacity: 0.8 });
    // deux nerfs (bandes en relief)
    if (o.nerfs && w >= 90) [-1, 1].forEach((s) => {
      const x = s * w * 0.32;
      ln(g, `M${f(x - 4)} ${f(-h + 3)} L${f(x - 4)} -3 M${f(x + 4)} ${f(-h + 3)} L${f(x + 4)} -3`, 1.8, INK);
      ln(g, `M${f(x - 1)} ${f(-h + 5)} L${f(x - 1)} -5`, 1.4, "#FFFFFF");
    });
    // étiquette (et la petite loupe : la recherche)
    let icone = null;
    if (o.t || o.icone) {
      const tw = o.t ? lw(o.t, o.s) : 0, iw = o.icone ? o.s * 1.25 : 0, Lw = tw + iw + (o.t && o.icone ? 8 : 0) + 22, Lh = Math.min(h - 12, o.s * 1.5);
      el("path", { d: rr(-Lw / 2, -h / 2 - Lh / 2, Lw, Lh, 4), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g);
      let x = -Lw / 2 + 11;
      if (o.icone) { icone = [f(x + o.s * 0.42), f(-h / 2 - o.s * 0.1)]; loupeIcone(g, icone[0], icone[1], o.s * 0.32); x += iw + 8; }
      if (o.t) txt(g, o.t, f(x + tw / 2), f(-h / 2 + o.s * 0.34), o.s, {});
    }
    return { haut: [0, -h], icone };
  };
  D.livre.essais = [{}, { w: 284, mat: "fonce" }, { w: 280, h: 60, mat: "blanc", icone: "loupe", t: "Dissertation" }, { w: 208, mat: "blanc", t: "thèse", s: 22 },
    { w: 280, h: 60, pointille: true }, { w: 96, h: 36, mat: "gris" }];

  /* ───────── D.fenetreArc — fenêtre cintrée de la bibliothèque : cadre, croisillon, appui ; ciel derrière ─────────
   * o = { partie: "tout" | "ciel" (le ciel seul) | "cadre" (tout sauf le ciel) } · ancrage = centre de l'arc.
   * 356 × 320 : arc de rayon 160 (y −160…0), montants jusqu'à y 148, appui de 146 à 160 (x ±178). En (540, 720) (S8, S9),
   * la fenêtre tient dans y 560–880 comme au storyboard : l'écran de S9 (y 555–885) la cache entière, appui compris.
   * Ordre des couches : partie "ciel" → nuages (D.nuage, dans un groupe découpé par out.ciel) → partie "cadre".
   * Renvoie { ciel: tracé de l'ouverture (repère local), cielBox: { x, y, w, h } }. */
  D.fenetreArc = (g, o) => {
    o = Object.assign({ partie: "tout", seed: 1021 }, o);
    const C = ctx(g, o.seed), ri = 144, yo = 138, ciel = `M${-ri} ${yo} L${-ri} 0 A${ri} ${ri} 0 0 1 ${ri} 0 L${ri} ${yo} Z`;
    if (o.partie !== "cadre") {
      el("path", { d: ciel, fill: "#EEF3F4" }, g);
      // toits lointains, très pâles, au bas du ciel
      el("path", { d: `M${-ri} ${yo} L${-ri} 108 L-100 108 L-84 90 L-60 90 L-60 102 L-20 102 L-20 84 L8 70 L36 84 L36 106 L80 106 L80 94 L112 94 L112 110 L${ri} 110 L${ri} ${yo} Z`, fill: "#DFE6E7" }, g);
      ln(g, "M-60 90 L-60 82 M88 94 L88 86", 1.4, "#C9D2D4");
      if (o.partie === "ciel") return { ciel, cielBox: { x: -ri, y: -ri, w: 2 * ri, h: ri + yo } };
    }
    const cadre = `M-160 148 L-160 0 A160 160 0 0 1 160 0 L160 148 Z ` + `M${-ri} ${yo} L${ri} ${yo} L${ri} 0 A${ri} ${ri} 0 0 0 ${-ri} 0 Z`;
    // embrasure (le mur creusé autour), ombre
    el("path", { d: `M-166 148 L-166 0 A166 166 0 0 1 166 0 L166 148`, fill: "none", stroke: "#DAD8D0", "stroke-width": 6 }, g);
    ombre(g, cadre, 5, 6, "rgba(28,26,28,.12)");
    el("path", { d: cadre, fill: "#F0F0EB", "fill-rule": "evenodd" }, g);
    U.stroke(C, "ext", "M-160 148 L-160 0 A160 160 0 0 1 160 0 L160 148", { sw: 3, r: 0.5 });
    U.stroke(C, "int", ciel, { sw: 2.4, r: 0.4 });
    // croisillon : meneau, traverse à la naissance de l'arc, deux petits rayons dans l'imposte
    const bar = (d) => { ln(g, d, 10, INK); ln(g, d, 6.5, "#F0F0EB"); };
    bar(`M0 ${-ri + 2} L0 ${yo}`); bar(`M${-ri + 2} 0 L${ri - 2} 0`);
    bar(`M0 0 L${f(-ri * 0.7)} ${f(-ri * 0.7)}`); bar(`M0 0 L${f(ri * 0.7)} ${f(-ri * 0.7)}`);
    el("circle", { cx: 0, cy: 0, r: 6, fill: "#F0F0EB", stroke: INK, "stroke-width": 2 }, g);
    // reflets sur le verre
    ln(g, "M-120 110 L-62 52 M-104 128 L-80 104 M44 -28 L96 -80 M70 112 L120 62", 3, "#FFFFFF", { opacity: 0.75 });
    // poignée (crémone) sur le meneau
    el("path", { d: rr(5, 64, 9, 26, 3), fill: ACIER, stroke: INK, "stroke-width": 1.6 }, g);
    // appui
    el("path", { d: rr(-175, 151, 356, 9, 3), fill: OMBRE }, g);
    U.shape(C, "appui", rr(-178, 146, 356, 14, 3), MAT.light, { sw: 2.6 });
    ln(g, "M-170 150 L170 150", 1.2, "#FFFFFF");
    return { ciel, cielBox: { x: -ri, y: -ri, w: 2 * ri, h: ri + yo } };
  };
  D.fenetreArc.essais = [{}, { partie: "ciel" }, { partie: "cadre" }];

  /* ───────── D.nuage — petit nuage blanc (dans la fenêtre cintrée : m.drift) ─────────
   * o = { w: 90, v: 0 | 1 | 2 (trois formes) } · ancrage = centre. */
  D.nuage = (g, o) => {
    o = Object.assign({ w: 90, v: 0 }, o);
    const k = o.w / 90, P = (x, y) => `${f(x * k)} ${f(y * k)}`;
    const formes = [
      `M${P(-40, 12)} C${P(-54, 12)} ${P(-54, -8)} ${P(-38, -8)} C${P(-36, -22)} ${P(-14, -27)} ${P(-6, -16)} C${P(0, -32)} ${P(28, -30)} ${P(28, -10)} C${P(46, -12)} ${P(52, 12)} ${P(36, 12)} Z`,
      `M${P(-42, 10)} C${P(-50, 10)} ${P(-50, -6)} ${P(-34, -4)} C${P(-30, -20)} ${P(-4, -22)} ${P(2, -10)} C${P(12, -18)} ${P(32, -14)} ${P(30, -2)} C${P(48, -2)} ${P(48, 10)} ${P(34, 10)} Z`,
      `M${P(-36, 10)} C${P(-48, 10)} ${P(-44, -10)} ${P(-26, -8)} C${P(-20, -26)} ${P(12, -26)} ${P(16, -8)} C${P(34, -12)} ${P(44, 10)} ${P(28, 10)} Z`];
    const d = formes[clamp(Math.round(o.v), 0, 2)];
    el("path", { d, fill: "#FFFFFF", stroke: "#9A9A94", "stroke-width": 2, "stroke-linejoin": "round" }, g);
    ln(g, `M${P(-30, 6)} Q${P(0, 10)} ${P(26, 6)}`, 1.3, "#C9D2D4");
    return { w: o.w };
  };
  D.nuage.essais = [{ v: 0 }, { v: 1, w: 70 }, { v: 2, w: 60 }];

  /* ───────── D.lampeTable — lampe de bibliothèque GRISE : pied, tige, abat-jour en cloche, chaînette, cône CRÈME ─────────
   * o = { cone: 0…1 (frémissement), partie: "tout" | "lampe" (sans chaînette ni cône) | "chainette" (seule, pendue à (0, 0) :
   *       m.pend repos 1,2°) | "cone" (seul) } · 100 × 180 · ancrage = centre du bas.
   * Renvoie { chainette: [22, −122] (où pendre la chaînette), abat: [0, −150], bord: −120 (bas de l'abat-jour) }. */
  D.lampeTable = (g, o) => {
    o = Object.assign({ cone: 1, partie: "tout", seed: 1031 }, o);
    const C = ctx(g, o.seed), out = { chainette: [22, -122], abat: [0, -150], bord: -120 };
    const chaine = (gg, x, y) => {
      let d = ""; for (let i = 0; i < 9; i++) d += cercle(x, y + 3 + i * 5, 1.7);
      el("path", { d, fill: "none", stroke: INK, "stroke-width": 1.3 }, gg);
      el("path", { d: `M${x - 3.5} ${y + 48} L${x + 3.5} ${y + 48} L${x + 2.5} ${y + 58} L${x - 2.5} ${y + 58} Z`, fill: ACIER, stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, gg);
    };
    if (o.partie === "chainette") { chaine(g, 0, 0); return out; }
    if (o.partie === "cone") { cone(g, 0, -118, 46, 118, 118, 0.22 * clamp(o.cone, 0, 1.2)); return out; }
    if (o.partie === "tout") cone(g, 0, -118, 46, 118, 118, 0.22 * clamp(o.cone, 0, 1.2));
    el("ellipse", { cx: 8, cy: 2, rx: 54, ry: 6, fill: "rgba(28,26,28,.18)" }, g);
    U.shape(C, "pied", "M-44 0 C-44 -10 -30 -16 0 -16 C30 -16 44 -10 44 0 Z", MAT.mid, { sw: 2.6 });
    ln(g, "M-30 -9 C-16 -13 10 -13 24 -11", 1.3, "#FFFFFF");
    U.shape(C, "tige", rr(-5, -122, 10, 108, 4), MAT.grey, { sw: 2.4, r: 0.3 });
    el("circle", { cx: 0, cy: -60, r: 6, fill: "#CFCFCA", stroke: INK, "stroke-width": 2 }, g);
    const abat = "M-50 -120 C-48 -146 -30 -176 0 -178 C30 -176 48 -146 50 -120 Z";
    el("path", { d: abat, fill: OMBRE, transform: "translate(5 5)" }, g);
    U.shape(C, "abat", abat, MAT.grey, { sw: 2.8 });
    ln(g, "M-30 -150 C-24 -164 -12 -170 0 -171", 2, "#FFFFFF");
    el("ellipse", { cx: 0, cy: -120, rx: 50, ry: 6, fill: "#4A4A46", stroke: INK, "stroke-width": 2 }, g);
    el("ellipse", { cx: 0, cy: -116, rx: 13, ry: 7, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g);
    el("circle", { cx: 0, cy: -180, r: 4.5, fill: ACIER, stroke: INK, "stroke-width": 1.8 }, g);
    if (o.partie === "tout") chaine(g, 22, -122);
    return out;
  };
  D.lampeTable.essais = [{}, { partie: "lampe" }, { partie: "chainette" }];

  /* ───────── D.ecran — l'écran « anabin » sur un BRAS MURAL articulé qui vient de la GAUCHE (aucun logo) ─────────
   * o = { w: 500, h: 330 (la coque), bras: 418 (le bras part de x −bras : en S9, x monde 122), partie: "tout" | "curseur" (barre de 3 × 28) }
   * Ancrage = centre. Coque MAT.mid (r 16), dalle blanche à fines lignes tous les 8 px, barre d'en-tête de 16 px (y −151…−135).
   * Rien ne passe au-dessus de la coque (la zone de la pastille reste nue). Les textes sont des nœuds de story.js (ancrés à x −220).
   * Renvoie { dalle: { x, y, w, h }, texteX: −220 }. */
  D.ecran = (g, o) => {
    o = Object.assign({ w: 500, h: 330, bras: 418, partie: "tout", seed: 1041 }, o);
    if (o.partie === "curseur") { el("rect", { x: -1.5, y: -24, width: 3, height: 28, fill: INK }, g); return {}; }
    const w = o.w, h = o.h, x0 = -w / 2, y0 = -h / 2, m = 14, C = ctx(g, o.seed), xb = -o.bras;
    // bras mural : platine, deux segments, trois articulations (sous le milieu de la coque)
    const coude = [f(xb + (x0 + 30 - xb) * 0.5), 58];
    tube(g, `M${xb + 8} 14 L${coude[0]} ${coude[1]} L${x0 + 40} 18`, 11, "#CFCFCA", "#FFFFFF");
    U.shape(C, "plat", rr(xb - 12, -40, 24, 84, 6), MAT.mid, { sw: 2.6 });
    visTete(g, xb, -24, 4, 30, { ombre: false }); visTete(g, xb, 28, 4, -50, { ombre: false });
    [[xb + 8, 14], coude].forEach(([x, y]) => { el("circle", { cx: x, cy: y, r: 10, fill: ACIER, stroke: INK, "stroke-width": 2.4 }, g); el("circle", { cx: x, cy: y, r: 3.4, fill: "#3A3A37" }, g); });
    // coque + dalle
    ombre(g, rr(x0, y0, w, h, 16), 8, 10);
    U.shape(C, "coque", rr(x0, y0, w, h, 16), MAT.mid, { sw: 3 });
    const dx = x0 + m, dy = y0 + m, dw = w - 2 * m, dh = h - 2 * m;
    el("path", { d: rr(dx, dy, dw, dh, 6), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2 }, g);
    const cg = clipG(g, rr(dx + 1, dy + 1, dw - 2, dh - 2, 5));
    let d = ""; for (let y = dy + 22; y < dy + dh; y += 8) d += `M${dx} ${y} L${dx + dw} ${y}`;
    ln(cg, d, 1, "#EDEDE8");
    el("rect", { x: dx, y: dy, width: dw, height: 16, fill: "#E1E1DC" }, cg);
    ln(cg, `M${dx} ${dy + 16} L${dx + dw} ${dy + 16}`, 1.4, "#8A8A84");
    [8, 18, 28].forEach((x) => el("circle", { cx: dx + x, cy: dy + 8, r: 3, fill: "#FFFFFF", stroke: "#55524B", "stroke-width": 1.2 }, cg));
    el("path", { d: rr(dx + 44, dy + 3, 220, 10, 5), fill: "#FFFFFF", stroke: "#9A9A94", "stroke-width": 1 }, cg);
    // voyant et petite grille d'aération de la coque
    el("circle", { cx: f(-x0 - 22), cy: f(-y0 - 7), r: 2.6, fill: "#9A9A94", stroke: INK, "stroke-width": 1 }, g);
    return { dalle: { x: dx, y: dy, w: dw, h: dh }, texteX: -220 };
  };
  D.ecran.essais = [{}, { partie: "curseur" }];

  /* ───────── D.planche — planchette de bois posée sur la pile : « = Ärztliche Prüfung » ─────────
   * o = { w: 250, h: 30, t: "= Ärztliche Prüfung", s: 22 } · ancrage = centre du bas (S9 : (360, 1064)). */
  D.planche = (g, o) => {
    o = Object.assign({ w: 250, h: 30, t: "= Ärztliche Prüfung", s: 22, seed: 1051 }, o);
    const w = o.w, h = o.h, x0 = -w / 2, C = ctx(g, o.seed);
    ombre(g, rr(x0, -h, w, h, 4), 4, 5);
    U.shape(C, "pl", rr(x0, -h, w, h, 4), { base: "#F2EDE0" }, { sw: 2.6, r: 0.5 });
    ln(g, `M${x0 + 5} ${-h + 8} c6 4 12 4 16 0 M${x0 + 6} -8 l14 -2 M${-x0 - 22} ${-h + 7} c5 4 11 4 16 1 M${-x0 - 20} -9 l14 1`, 1.2, "#ABABA4");
    [x0 + 11, -x0 - 11].forEach((x) => el("circle", { cx: x, cy: f(-h / 2), r: 2.6, fill: "#77776F" }, g));
    txt(g, o.t, 0, f(-h / 2 + o.s * 0.34), fit(o.t, o.s, w - 34), {});
    return { w, h };
  };
  D.planche.essais = [{}];

  /* ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
   * F1. LE VESTIAIRE (S12) ET LE PETIT BADGE (S15)
   * ═════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

  /* ───────── D.patere — tringle à patères : planche de bois, patères rondes (les crochets) ─────────
   * o = { w: 780, h: 26, crochets: [−310, −155, 0, 155, 310] (x locaux), kind: "bois" | "metal" (petite tringle d'acier, S15) }
   * Ancrage = centre ; chaque patère est un bouton rond centré sur y = 0 : c'est le point d'accroche des objets
   * (D.blouse, D.stetho, D.badge ont leur ancrage au centre de la patère). S12 : (540, 566). S15 : D.patere({ kind: "metal",
   * w: 200, h: 11, crochets: [0] }) en (540, 550). Renvoie { crochets: [[x, 0], …] }. */
  D.patere = (g, o) => {
    o = Object.assign({ w: 780, h: 26, crochets: [-310, -155, 0, 155, 310], kind: "bois", seed: 1061 }, o);
    const w = o.w, h = o.h, C = ctx(g, o.seed + Math.round(w)), metal = o.kind === "metal";
    if (metal) {
      [-1, 1].forEach((s) => { const x = s * (w / 2 - 8); el("path", { d: rr(x - 7, -h - 4, 14, 2 * h + 8, 4), fill: "#CFCFCA", stroke: INK, "stroke-width": 2 }, g); visTete(g, x, -h + 2, 2.4, 30, { ombre: false }); });
      el("path", { d: rr(-w / 2, -h / 2 + 4, w, h, h / 2), fill: OMBRE }, g);
      el("path", { d: rr(-w / 2, -h / 2, w, h, h / 2), fill: ACIER, stroke: INK, "stroke-width": 2.2 }, g);
      ln(g, `M${-w / 2 + 6} ${f(-h / 2 + 3)} L${w / 2 - 6} ${f(-h / 2 + 3)}`, 1.2, "#FFFFFF");
    } else {
      ombre(g, rr(-w / 2, -h / 2, w, h, 5), 5, 7);
      U.shape(C, "rail", rr(-w / 2, -h / 2, w, h, 5), MAT.wood, { sw: 2.8, r: 0.5 });
      ln(g, `M${-w / 2 + 8} ${f(-h / 2 + 5)} L${w / 2 - 8} ${f(-h / 2 + 5)}`, 1.3, "#FFFFFF");
      [-w / 2 + 22, w / 2 - 22].forEach((x, i) => visTete(g, x, 0, 5, 20 + i * 70, { ombre: false }));
    }
    const r = metal ? 7 : 11;
    o.crochets.forEach((x) => {
      el("circle", { cx: x + 3, cy: 5, r, fill: "rgba(28,26,28,.2)" }, g);
      el("circle", { cx: x, cy: 0, r, fill: metal ? ACIER : "#F0F0EB", stroke: INK, "stroke-width": 2.4 }, g);
      el("circle", { cx: x, cy: 0, r: f(r * 0.45), fill: metal ? "#CFCFCA" : "#D5D2C7", stroke: "#77776F", "stroke-width": 1.2 }, g);
      ln(g, `M${f(x - r * 0.6)} ${f(-r * 0.2)} A${f(r * 0.65)} ${f(r * 0.65)} 0 0 1 ${f(x - r * 0.1)} ${f(-r * 0.62)}`, 1.4, "#FFFFFF");
    });
    return { crochets: o.crochets.map((x) => [x, 0]) };
  };
  D.patere.essais = [{}, { kind: "metal", w: 200, h: 11, crochets: [0] }];

  /* ───────── D.blouse — blouse blanche VIDE sur un cintre (S12) : crochet, épaules, revers, trois boutons,
   * poche de poitrine avec deux stylos, poches basses, manches qui pendent ─────────
   * 200 × 540 (x −101…101, y −17…540) · ancrage = centre de la patère (le crochet du cintre passe par-dessus) · m.sway 0,8°. */
  D.blouse = (g, o) => {
    o = Object.assign({ seed: 1071 }, o);
    const C = ctx(g, o.seed);
    const corps = "M-24 46 L-92 76 L-90 540 L90 540 L92 76 L24 46 L0 206 Z";
    const mancheG = "M-92 76 C-101 140 -101 300 -99 432 L-70 432 C-70 320 -71 200 -66 132 C-72 108 -82 90 -92 76 Z";
    ombre(g, corps + " " + mancheG + " M92 76 C101 140 101 300 99 432 L70 432 C70 320 71 200 66 132 C72 108 82 90 92 76 Z", 8, 9);
    // crochet du cintre (par-dessus la patère) et barre du cintre
    ln(g, "M-11 7 C-16 -7 -8 -17 1 -16 C10 -15 15 -6 11 4 C8 10 2 14 0 22 L0 36", 3.4, INK);
    ln(g, "M-9 5 C-13 -6 -6 -14 1 -13", 1.2, "#FFFFFF");
    el("path", { d: "M0 34 L-88 72 L88 72 Z", fill: "none", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round" }, g);
    // fond de col (l'intérieur de la blouse, gris)
    U.shape(C, "dedans", "M-24 46 C-12 38 12 38 24 46 L8 150 L0 160 L-8 150 Z", MAT.mid, { sw: 2.2 });
    U.shape(C, "corps", corps, MAT.milk, { sw: 3, r: 0.6 });
    // revers (avec leur cran)
    U.shape(C, "revG", "M-24 46 L-50 62 L-42 108 L-54 120 L-2 206 L-16 120 Z", MAT.white, { sw: 2.6, r: 0.5 });
    U.shape(C, "revD", "M24 46 L50 62 L42 108 L54 120 L2 206 L16 120 Z", MAT.white, { sw: 2.6, r: 0.5 });
    ln(g, "M-24 46 C-12 40 12 40 24 46", 2.4, INK);
    // boutonnage, boutons
    U.stroke(C, "bord", "M3 206 L5 536", { sw: 2.2, r: 0.4, single: true });
    [250, 320, 390].forEach((y) => { el("circle", { cx: 16, cy: y, r: 5.5, fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g); el("circle", { cx: 15, cy: y - 1, r: 1.3, fill: INK }, g); });
    // poche de poitrine + deux stylos
    [[42, 128, "#3A3A37"], [53, 132, "#77776F"]].forEach(([x, y, col]) => { el("path", { d: rr(x - 3, y, 7, 28, 2.5), fill: col, stroke: INK, "stroke-width": 1.6 }, g); ln(g, `M${x + 3} ${y + 3} L${x + 5} ${y + 3} L${x + 5} ${y + 16}`, 1.4, ACIER); });
    U.shape(C, "pocheP", "M32 150 L76 148 L77 196 L33 198 Z", MAT.white, { sw: 2.4, r: 0.4 });
    ln(g, "M33 158 L76 156", 1.2, "#9A9A94");
    // poches basses
    U.shape(C, "pocheG", "M-64 362 L-22 360 L-22 424 L-63 426 Z", MAT.white, { sw: 2.4, r: 0.4 });
    U.shape(C, "pocheD", "M22 360 L64 362 L63 426 L22 424 Z", MAT.white, { sw: 2.4, r: 0.4 });
    ln(g, "M-63 372 L-22 370 M22 370 L63 372", 1.2, "#9A9A94");
    // manches qui pendent, poignets
    U.shape(C, "mG", mancheG, MAT.milk, { sw: 2.8, r: 0.5 });
    U.shape(C, "mD", "M92 76 C101 140 101 300 99 432 L70 432 C70 320 71 200 66 132 C72 108 82 90 92 76 Z", MAT.milk, { sw: 2.8, r: 0.5 });
    ln(g, "M-98 410 L-71 410 M98 410 L71 410", 1.6, "#77776F");
    ln(g, "M-84 150 C-86 240 -86 320 -85 400 M84 150 C86 240 86 320 85 400", 1.2, "#C9C9C1");
    // ourlet
    ln(g, "M-88 528 L88 528", 1.2, "#9A9A94", { "stroke-dasharray": "5 5" });
    return { crochet: [0, 0], bas: [0, 540] };
  };
  D.blouse.essais = [{}];

  /* ───────── D.stetho — stéthoscope pendu à une patère (S12) : la lyre pend au milieu, le pavillon à DROITE ─────────
   * 80 × 300 (x −16…62, y −18…278) · ancrage = centre de la patère · m.pend repos 1° autour de (0, 0).
   * Tout est à droite de x −16 : en S12 (patère x 850), rien ne passe derrière le badge (qui finit à x 820). */
  D.stetho = (g, o) => {
    o = Object.assign({ seed: 1075 }, o);
    const TUY = "#55524B";
    el("path", { d: "M14 40 C26 140 40 220 40 280 L60 282 C58 220 44 140 30 40 Z", fill: "rgba(28,26,28,.07)" }, g);
    // tuyau par-dessus la patère ; à gauche il descend vers la lyre, à droite vers le pavillon
    tube(g, "M-13 4 C-15 -10 -6 -17 0 -17 C6 -17 15 -10 13 4", 6, TUY, "#9A9A94");
    tube(g, "M-13 4 C-15 36 -8 70 -2 98", 6, TUY, "#9A9A94");
    tube(g, "M13 4 C24 60 40 140 36 212", 6, TUY, "#9A9A94");
    // lyre métallique : deux tubes d'acier, ressort, embouts
    tube(g, "M-2 100 C-8 120 -12 140 -12 162", 4, ACIER, "#FFFFFF");
    tube(g, "M-2 100 C6 120 12 140 12 162", 4, ACIER, "#FFFFFF");
    ln(g, "M-9 132 C-4 135 4 135 9 132", 1.6, INK, { "stroke-dasharray": "2 2.5" });
    el("ellipse", { cx: -12, cy: 170, rx: 5, ry: 8.5, fill: "#3A3A37", stroke: INK, "stroke-width": 1.8, transform: "rotate(8 -12 170)" }, g);
    el("ellipse", { cx: 12, cy: 170, rx: 5, ry: 8.5, fill: "#3A3A37", stroke: INK, "stroke-width": 1.8, transform: "rotate(-8 12 170)" }, g);
    el("path", { d: rr(-7, 92, 10, 14, 3), fill: ACIER, stroke: INK, "stroke-width": 1.8 }, g);
    // pavillon (la tête du stéthoscope)
    el("path", { d: rr(31, 208, 10, 20, 3), fill: ACIER, stroke: INK, "stroke-width": 2 }, g);
    el("circle", { cx: 40, cy: 254, r: 26, fill: "rgba(28,26,28,.18)" }, g);
    el("circle", { cx: 36, cy: 251, r: 26, fill: ACIER, stroke: INK, "stroke-width": 2.6 }, g);
    el("circle", { cx: 36, cy: 251, r: 18, fill: "#F0F0EB", stroke: INK, "stroke-width": 1.8 }, g);
    ln(g, "M22 242 A16 16 0 0 1 34 236", 2, "#FFFFFF");
    return { crochet: [0, 0], bas: [36, 277] };
  };
  D.stetho.essais = [{}];

  /* ───────── D.sabots — paire de sabots de service (S12, sous la blouse) ─────────
   * 120 × 50 · ancrage = centre du bas. */
  D.sabots = (g, o) => {
    o = Object.assign({ seed: 1077 }, o);
    const C = ctx(g, o.seed);
    el("ellipse", { cx: 6, cy: 1, rx: 70, ry: 6, fill: "rgba(28,26,28,.18)" }, g);
    [[-31, 0], [31, 1]].forEach(([x, i]) => {
      ln(g, `M${x - 22} -30 C${x - 30} -58 ${x + 30} -58 ${x + 22} -30`, 6, "#4A4A46");          // bride arrière
      U.shape(C, "sem" + i, rr(x - 29, -12, 58, 12, 5), MAT.dark, { sw: 2.4 });
      U.shape(C, "dessus" + i, `M${x - 27} -11 C${x - 28} -38 ${x - 16} -50 ${x} -50 C${x + 16} -50 ${x + 28} -38 ${x + 27} -11 Z`, MAT.light, { sw: 2.6, r: 0.5 });
      [[-10, -34], [0, -39], [10, -34], [-5, -24], [5, -24]].forEach(([dx, y]) => el("circle", { cx: x + dx, cy: y, r: 2.4, fill: "#3A3A37" }, g));
      ln(g, `M${x - 18} -42 C${x - 12} -47 ${x - 6} -48 ${x - 1} -48`, 1.6, "#FFFFFF");
    });
    return { w: 120 };
  };
  D.sabots.essais = [{}];

  /* ───────── D.badge — le badge d'hôpital (objet RÉEL de l'affaire, « laut Urteil ») — aucun nom d'hôpital ─────────
   * o = { mini: false, photo: 0…1 (le pictogramme apparaît dans le cadre photo), fonction: 0…1 (la bande du bas et
   *       « Assistenzarzt » s'impriment), cordon: true }
   * Ancrage = centre de la patère (le crochet) : pivot de m.pend. Grand (S12) : cordon double de (0, 0) à la pince (0, 160),
   * pince 60 × 40, carte 560 × 360 (x −280…280, y 180…540), cadre photo 160 × 220 (x −250…−90, y 234…454),
   * « Assistenzarzt » (Kalam 26) à (−66, 434), bande y 480…520 (code-barres, croix, « Krankenhaus »).
   * mini (S15) : un anneau d'acier autour de la tringle (pas de cordon), pince en (0, 32), carte 480 × 250 (y 47…297),
   * sans photo ni code-barres (la bande garde la croix et « Krankenhaus »).
   * Les textes « Dr. med. », « ( », « i », « r », « ) » et le pointillé du nom sont des nœuds de story.js.
   * Renvoie { pince, carte, photo, nom: { x0, y, pas } (6 points), l1: [x, ligne de base] (début de « Dr. med. ») }. */
  D.badge = (g, o) => {
    o = Object.assign({ mini: false, photo: 1, fonction: 1, cordon: true, seed: 1081 }, o);
    const mini = !!o.mini, W = mini ? 480 : 560, H = mini ? 250 : 360, yP = mini ? 32 : 160, pw = mini ? 44 : 60, ph = mini ? 28 : 40, yC = mini ? 47 : 180;
    const x0 = -W / 2, C = ctx(g, o.seed + W);
    // cordon (ruban plat) : boucle sur la patère, deux brins jusqu'à l'anneau
    if (o.cordon && mini) {             // petit badge : un anneau d'acier passé autour de la tringle, jusqu'à la pince
      const d = ellipse(0, 4, 10, 14);
      ln(g, d, 3.6, INK); ln(g, d, 1.6, ACIER);
    } else if (o.cordon) {
      const ya = yP - ph / 2 - 7, rub = (d) => { ln(g, d, 9, INK); ln(g, d, 6, "#77776F"); ln(g, d, 1.2, "#CFCFCA", { "stroke-dasharray": "3 4" }); };
      rub("M-10 3 C-11 -10 -5 -16 0 -16 C5 -16 11 -10 10 3");
      rub(`M-10 3 L-3 ${f(ya)}`); rub(`M10 3 L3 ${f(ya)}`);
      el("circle", { cx: 0, cy: f(ya + 1), r: 5, fill: "none", stroke: INK, "stroke-width": 2.4 }, g);
    }
    // pince métallique + languette transparente jusqu'à la fente
    const yF = yC + 12;
    el("path", { d: rr(-9, yP + ph / 2 - 4, 18, yF + 8 - (yP + ph / 2 - 4), 3), fill: "#EEF3F4", stroke: INK, "stroke-width": 1.6 }, g);
    ombre(g, rr(-pw / 2, yP - ph / 2, pw, ph, 6), 3, 4);
    el("path", { d: rr(-pw / 2, yP - ph / 2, pw, ph, 6), fill: ACIER, stroke: INK, "stroke-width": 2.4 }, g);
    el("path", { d: rr(-pw / 2 + 6, yP - ph / 2 + 5, pw - 12, ph * 0.32, 3), fill: "#CFCFCA", stroke: "#77776F", "stroke-width": 1.2 }, g);
    el("circle", { cx: 0, cy: f(yP + ph * 0.16), r: f(ph * 0.16), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
    ln(g, `M${f(-pw / 2 + 5)} ${f(yP + ph / 2 - 4)} L${f(pw / 2 - 5)} ${f(yP + ph / 2 - 4)}`, 1.2, "#FFFFFF");
    // carte
    ombre(g, rr(x0, yC, W, H, 22), 7, 9);
    U.shape(C, "carte", rr(x0, yC, W, H, 22), MAT.white, { sw: 3.2, r: 0.5 });
    ln(g, rr(x0 + 9, yC + 9, W - 18, H - 18, 15), 1.3, "#E1E1DC");
    el("path", { d: rr(-30, yF - 5, 60, 10, 5), fill: "#55524B", stroke: INK, "stroke-width": 1.6 }, g);
    el("path", { d: rr(-9, yP + ph / 2 - 4, 18, yF + 3 - (yP + ph / 2 - 4), 3), fill: "#EEF3F4", stroke: INK, "stroke-width": 1.6, opacity: 0.9 }, g);
    let photo = null;
    if (!mini) {
      const px = x0 + 30, py = yC + 54; photo = { x: px, y: py, w: 160, h: 220 };
      el("path", { d: rr(px, py, 160, 220, 6), fill: "#E1E1DC", stroke: INK, "stroke-width": 2.4 }, g);
      if (o.photo > 0) {
        const cg = clipG(g, rr(px + 2, py + 2, 156, 216, 5));
        D.silhouette(el("g", { transform: `translate(${px + 80} ${py + 120})`, opacity: f(clamp(o.photo, 0, 1)) }, cg), { r: 125, cadre: "aucun" });
      }
      ln(g, `M${px + 8} ${py + 22} L${px + 8} ${py + 8} L${px + 22} ${py + 8} M${px + 138} ${py + 212} L${px + 152} ${py + 212} L${px + 152} ${py + 198}`, 1.6, "#77776F");
    }
    // bande du bas (et la fonction) : s'impriment avec « fonction »
    const fo = clamp(o.fonction, 0, 1), yb = yC + H - (mini ? 50 : 60), hb = mini ? 32 : 40;
    if (fo > 0) {
      const b = el("g", { opacity: f(fo) }, g);
      el("rect", { x: x0 + 14, y: yb, width: W - 28, height: hb, fill: "#F0F0EB" }, b);
      ln(b, `M${x0 + 14} ${yb} L${-x0 - 14} ${yb}`, 1.4, "#C9C9C1");
      const kx = mini ? -20 : 16, ks = mini ? 9 : 11, cy = yb + hb / 2;
      el("path", { d: `M${kx - ks / 3} ${cy - ks} L${kx + ks / 3} ${cy - ks} L${kx + ks / 3} ${cy - ks / 3} L${kx + ks} ${cy - ks / 3} L${kx + ks} ${cy + ks / 3} L${kx + ks / 3} ${cy + ks / 3} L${kx + ks / 3} ${cy + ks} L${kx - ks / 3} ${cy + ks} L${kx - ks / 3} ${cy + ks / 3} L${kx - ks} ${cy + ks / 3} L${kx - ks} ${cy - ks / 3} L${kx - ks / 3} ${cy - ks / 3} Z`, fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, b);
      txt(b, "Krankenhaus", kx + ks + 10, f(cy + (mini ? 6 : 7)), mini ? 17 : 20, { anchor: "start" });
      if (!mini) {
        const R = rng(o.seed); let d = "", x = x0 + 30;
        for (let i = 0; i < 20; i++) { const e = R() < 0.4 ? 4 : 2; d += `M${f(x)} ${yb + 7} L${f(x)} ${yb + hb - 7}`; x += e + 3 + R() * 4; if (e > 2) d += `M${f(x - 5)} ${yb + 7} L${f(x - 5)} ${yb + hb - 7}`; }
        ln(b, d, 2, INK, { "stroke-linecap": "butt" });
        txt(g, "Assistenzarzt", -66, yC + 254, 26, { anchor: "start", fill: INK }).setAttribute("opacity", f(fo));
      }
    }
    return { pince: [0, yP], carte: { x: x0, y: yC, w: W, h: H }, photo, bande: [yb, yb + hb],
      nom: mini ? null : { x0: -62, y: yC + 194, pas: 28 }, l1: mini ? [-168, yC + 165] : [-66, yC + 134] };
  };
  D.badge.essais = [{}, { photo: 0, fonction: 0 }, { mini: true }];

  /* ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
   * F2. LES LETTRES DE LA KAMMER (S13, S16) — mur de brique, lierre, boîte aux lettres, enveloppes, la lettre
   * ═════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

  /* ───────── D.lierre — (hors inventaire) treillage de bois et lierre, à gauche de la boîte (S13, S16) ─────────
   * o = { w: 130, h: 320, partie: "tout" | "treillage" | "lierre" (les deux tiges et leurs feuilles : m.sway 1,2° autour de (0, 0)) }
   * Ancrage = milieu du HAUT du treillage (S13 : (195, 560) → x 130–260, y 560–880). */
  D.lierre = (g, o) => {
    o = Object.assign({ w: 130, h: 320, partie: "tout", seed: 1091 }, o);
    const w = o.w, h = o.h, x0 = -w / 2, C = ctx(g, o.seed);
    if (o.partie !== "lierre") {
      el("path", { d: rr(x0 + 6, 6, w, h, 3), fill: "rgba(28,26,28,.08)" }, g);
      // lattes en diagonale (±45°), coupées au cadre par le calcul (pas de clipPath : la boîte du dessin reste juste)
      let d = "";
      for (let k = -h; k < w; k += 44) {
        const a = Math.max(0, -k), b = Math.min(h, w - k);                       // x = x0 + k + t, y = t  pour t de a à b
        if (b > a) d += `M${f(x0 + k + a)} ${f(a)} L${f(x0 + k + b)} ${f(b)} `;
        if (b > a) d += `M${f(x0 + k + a)} ${f(h - a)} L${f(x0 + k + b)} ${f(h - b)} `;
      }
      ln(g, d, 9, INK); ln(g, d, 6, "#E9E5D8");
      ln(g, rr(x0, 0, w, h, 3), 7, INK); ln(g, rr(x0, 0, w, h, 3), 4, "#E9E5D8");
      [[x0, 0], [-x0, 0], [x0, h], [-x0, h]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 3, fill: "#77776F" }, g));
    }
    if (o.partie !== "treillage") {
      const tiges = ["M-20 4 C-34 50 6 92 -10 140 C-26 190 18 232 2 290", "M26 8 C38 48 10 90 30 128 C46 162 20 198 34 236"];
      tiges.forEach((d) => ln(g, d, 3, "#55524B"));
      const feuille = (x, y, a, s, i) => {
        const b = el("g", { transform: `translate(${f(x)} ${f(y)}) rotate(${f(a)}) scale(${f(s)})` }, g);
        const d = "M0 0 C-8 -3 -15 -10 -11 -19 C-7 -17 -4 -21 0 -27 C4 -21 7 -17 11 -19 C15 -10 8 -3 0 0 Z";
        el("path", { d, fill: "rgba(28,26,28,.12)", transform: "translate(2 3)" }, b);
        U.shape(C.sub(b), "f" + i, d, { base: "#DCDDD4" }, { sw: 1.8, r: 0.3 });
        ln(b, "M0 -2 L0 -19 M0 -9 L-6 -14 M0 -9 L6 -14", 1, "#77776F");
      };
      [[-22, 18, -30], [-14, 46, 40], [-26, 74, -60], [-4, 100, 30], [-20, 128, -40], [-6, 160, 50], [-16, 196, -30], [4, 222, 30], [-4, 258, -50], [6, 286, 20],
        [28, 30, 40], [22, 62, -30], [26, 98, 50], [36, 132, -20], [26, 168, 40], [34, 210, -40], [30, 238, 20]].forEach(([x, y, a], i) => feuille(x, y, a + 180, 0.9 + (i % 3) * 0.14, i));
    }
    return { pivot: [0, 0] };
  };
  D.lierre.essais = [{}, { partie: "treillage" }, { partie: "lierre" }];

  /* ───────── D.boite — boîte aux lettres murale : fente à clapet, fenêtre à nom, porte, serrure, porte-journal à deux anneaux ─────────
   * o = { kind: "A" (anguleuse, grise : l'affaire, S13, S16) | "B" (toit arrondi, claire, petit autocollant : celle de « toi », S28),
   *       clapet: degrés (0 = fermé ; pendule amorti de 30° quand une enveloppe passe), nom: "vide" | "points",
   *       partie: "tout" | "corps" (sans le clapet) | "clapet" (le clapet seul, même ancrage) }
   * 300 × 360 (x −150…150, y −176…184) · ancrage = centre. Fente : rectangle sombre x −95…95, y −122…−102 (centre y −112) ;
   * charnière du clapet à y −124. Ordre pour une enveloppe à demi entrée : corps → enveloppe → clapet.
   * Renvoie { fente: [0, −112], charniere: −124, nom: [0, −63] }. */
  D.boite = (g, o) => {
    o = Object.assign({ kind: "A", clapet: 0, nom: "vide", partie: "tout", seed: 1095 }, o);
    const B = o.kind === "B", C = ctx(g, o.seed + (B ? 7 : 0)), corpsMat = B ? MAT.light : MAT.grey;
    const out = { fente: [0, -112], charniere: -124, nom: [0, -63] };
    const clapet = (gg) => {
      const a = clamp(Math.abs(o.clapet || 0), 0, 85), hh = 26 * Math.cos(rad(a));
      el("path", { d: rr(-98, -124, 196, f(Math.max(3, hh)), 4), fill: a > 4 ? "#B9B9B3" : "#CFCFCA", stroke: INK, "stroke-width": 2.4 }, gg);
      if (hh > 10) ln(gg, `M-88 ${f(-124 + hh - 5)} L88 ${f(-124 + hh - 5)}`, 1.3, "#FFFFFF");
      el("path", { d: rr(-24, f(-124 + Math.max(3, hh) - 3), 48, 6, 3), fill: ACIER, stroke: INK, "stroke-width": 1.6 }, gg);
      [-104, 104].forEach((x) => el("circle", { cx: x, cy: -124, r: 3.4, fill: ACIER, stroke: INK, "stroke-width": 1.4 }, gg));
    };
    if (o.partie === "clapet") { clapet(g); return out; }
    // porte-journal : une tige d'acier sous la boîte, tenue par deux anneaux pendus à deux pattes
    [-86, 86].forEach((x) => { el("path", { d: rr(x - 4, 146, 8, 14, 2), fill: "#B9B9B3", stroke: INK, "stroke-width": 1.8 }, g); });
    el("path", { d: rr(-118, 170, 236, 9, 4.5), fill: "rgba(28,26,28,.16)", transform: "translate(3 4)" }, g);
    el("path", { d: rr(-118, 168, 236, 9, 4.5), fill: ACIER, stroke: INK, "stroke-width": 2 }, g);
    ln(g, "M-110 170.5 L110 170.5", 1, "#FFFFFF");
    [-86, 86].forEach((x) => el("ellipse", { cx: x, cy: 170, rx: 7, ry: 13, fill: "none", stroke: INK, "stroke-width": 3.2 }, g));
    [-86, 86].forEach((x) => el("ellipse", { cx: x, cy: 170, rx: 7, ry: 13, fill: "none", stroke: "#CFCFCA", "stroke-width": 1.2 }, g));
    // corps (+ toit)
    if (B) {
      ombre(g, "M-150 150 L-150 -122 C-150 -194 150 -194 150 -122 L150 150 Z", 8, 9);
      U.shape(C, "corps", rr(-150, -130, 300, 280, 10), corpsMat, { sw: 3 });
      U.shape(C, "toit", "M-158 -124 C-152 -198 152 -198 158 -124 Z", MAT.grey, { sw: 3 });
      ln(g, "M-120 -150 C-80 -176 -20 -182 30 -180", 2, "#FFFFFF");
    } else {
      ombre(g, "M-150 -176 L150 -176 L150 150 L-150 150 Z", 8, 9);
      U.shape(C, "corps", rr(-150, -150, 300, 300, 6), corpsMat, { sw: 3 });
      U.shape(C, "toit", "M-150 -176 L150 -176 L162 -144 L-162 -144 Z", MAT.mid, { sw: 3 });
      ln(g, "M-146 -170 L146 -170", 1.3, "#FFFFFF");
    }
    // fente (ouverture sombre) et sa garniture
    el("path", { d: rr(-104, -128, 208, 34, 6), fill: ACIER, stroke: INK, "stroke-width": 2.2 }, g);
    el("path", { d: rr(-95, -122, 190, 20, 3), fill: "#2E2E2B" }, g);
    // fenêtre à nom
    el("path", { d: rr(-76, -82, 152, 38, 5), fill: ACIER, stroke: INK, "stroke-width": 2.2 }, g);
    el("path", { d: rr(-68, -75, 136, 24, 2), fill: "#FFFFFF", stroke: "#8A8A84", "stroke-width": 1.2 }, g);
    if (o.nom === "points") { let d = ""; for (let i = 0; i < 9; i++) d += cercle(-48 + i * 12, -60, 2); el("path", { d, fill: INK }, g); }
    ln(g, "M-66 -73 L66 -73", 1, "#E1E1DC");
    // porte, serrure, aération
    ln(g, rr(-130, -30, 260, 162, 6), 1.8, "#77776F");
    ln(g, "M-128 -26 L128 -26", 1.2, "#FFFFFF");
    el("circle", { cx: 104, cy: 18, r: 11, fill: ACIER, stroke: INK, "stroke-width": 2.2 }, g);
    el("path", { d: "M101 13 A3.4 3.4 0 1 1 107 13 L106 24 L102 24 Z", fill: "#2E2E2B" }, g);
    ln(g, "M-108 100 L-62 100 M-108 110 L-62 110 M-108 120 L-62 120", 3, "#77776F");
    [[-136, -22], [136, -22], [-136, 138], [136, 138]].forEach(([x, y], i) => visTete(g, x, y, 4, 25 + i * 40, { ombre: false }));
    if (B) {   // petit autocollant (une fleur, aucun mot)
      el("path", { d: rr(40, 46, 54, 54, 12), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8, transform: "rotate(8 67 73)" }, g);
      for (let i = 0; i < 5; i++) { const a = rad(i * 72 - 90); el("circle", { cx: f(67 + Math.cos(a) * 9), cy: f(73 + Math.sin(a) * 9), r: 6, fill: "#E1E1DC", stroke: INK, "stroke-width": 1.4 }, g); }
      el("circle", { cx: 67, cy: 73, r: 4.5, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.4 }, g);
    }
    if (o.partie !== "corps") clapet(g);
    return out;
  };
  D.boite.essais = [{}, { clapet: 30 }, { kind: "B", nom: "points" }, { partie: "corps" }];

  /* ───────── D.enveloppe — enveloppe vue de face ─────────
   * o = { kind: "kammer" (expéditeur « Ärztekammer Nordrhein », 16 px × w/260, adresse en gribouillis, fenêtre, oblitération machine) |
   *       "neutre" (fenêtre + gribouillis, aucun texte) | "reponse" (adresse en gribouillis + petit timbre dessiné),
   *       w: 260, h: 170, ouvert: 0…1 (le rabat ouvert dépasse derrière, en triangle), rot: degrés }
   * Ancrage = centre. */
  D.enveloppe = (g, o) => {
    o = Object.assign({ kind: "kammer", w: 260, h: 170, ouvert: 0, rot: 0, seed: 1101 }, o);
    const w = o.w, h = o.h, x0 = -w / 2, y0 = -h / 2, k = w / 260, b = o.rot ? el("g", { transform: `rotate(${f(o.rot)})` }, g) : g, C = ctx(b, o.seed + Math.round(w));
    if (o.ouvert > 0.02) U.shape(C, "rabat", `M${f(x0 + 3)} ${f(y0 + 2)} L${f(-x0 - 3)} ${f(y0 + 2)} L0 ${f(y0 - h * 0.5 * clamp(o.ouvert, 0, 1))} Z`, { base: "#ECECE6" }, { sw: 2.2, r: 0.4 });
    ombre(b, rr(x0, y0, w, h, 5 * k), f(5 * k), f(6 * k));
    U.shape(C, "env", rr(x0, y0, w, h, 5 * k), { base: "#FFFFFF" }, { sw: Math.max(2, 2.8 * k), r: 0.4 });
    ln(b, `M${f(x0 + 4)} ${f(-y0 - 4)} L${f(-w * 0.12)} ${f(h * 0.08)} M${f(-x0 - 4)} ${f(-y0 - 4)} L${f(w * 0.12)} ${f(h * 0.08)}`, 1, "#E6E6E1");
    const fenetre = () => {
      el("path", { d: rr(x0 + 18 * k, y0 + 66 * k, 128 * k, 52 * k, 5 * k), fill: "#F3F6F6", stroke: "#8A8A84", "stroke-width": 1.4 }, b);
      grib(b, f(x0 + 28 * k), f(y0 + 82 * k), f(96 * k), { n: 3, pas: 13 * k, seed: 3, sw: Math.max(1.2, 2 * k), fin: 0.55 });
    };
    if (o.kind === "kammer") {
      txt(b, "Ärztekammer Nordrhein", f(x0 + 14 * k), f(y0 + 26 * k), f(Math.max(11, 16 * k)), { anchor: "start", fill: "#3A3A37" });
      ln(b, `M${f(x0 + 14 * k)} ${f(y0 + 34 * k)} L${f(x0 + 170 * k)} ${f(y0 + 34 * k)}`, 1, "#9A9A94");
      fenetre();
      el("path", { d: rr(-x0 - 66 * k, y0 + 12 * k, 52 * k, 34 * k, 3), fill: "none", stroke: "#77776F", "stroke-width": 1.4 }, b);
      ln(b, `M${f(-x0 - 120 * k)} ${f(y0 + 20 * k)} q${f(8 * k)} ${f(-5 * k)} ${f(16 * k)} 0 t${f(16 * k)} 0 t${f(16 * k)} 0 M${f(-x0 - 120 * k)} ${f(y0 + 30 * k)} q${f(8 * k)} ${f(-5 * k)} ${f(16 * k)} 0 t${f(16 * k)} 0 t${f(16 * k)} 0`, 1.2, "#9A9A94");
    } else if (o.kind === "neutre") {
      grib(b, f(x0 + 16 * k), f(y0 + 24 * k), f(90 * k), { n: 2, pas: 11 * k, seed: 5, sw: Math.max(1.2, 1.8 * k), fin: 0.6 });
      fenetre();
    } else {
      grib(b, f(-w * 0.06), f(h * 0.02), f(w * 0.46), { n: 3, pas: 16 * k, seed: 7, sw: Math.max(1.4, 2.2 * k), fin: 0.6 });
      const sx = -x0 - 54 * k, sy = y0 + 12 * k, sw = 42 * k, sh = 50 * k;
      let dent = ""; for (let i = 0; i <= 6; i++) { dent += cercle(sx + i * sw / 6, sy, 1.6 * k) + cercle(sx + i * sw / 6, sy + sh, 1.6 * k); }
      el("path", { d: rr(sx, sy, sw, sh, 1), fill: "#F0F0EB", stroke: INK, "stroke-width": 1.6 }, b);
      el("path", { d: dent, fill: "#FFFFFF" }, b);
      el("path", { d: `M${f(sx + 6 * k)} ${f(sy + sh - 8 * k)} L${f(sx + 16 * k)} ${f(sy + 22 * k)} L${f(sx + 24 * k)} ${f(sy + 34 * k)} L${f(sx + 30 * k)} ${f(sy + 26 * k)} L${f(sx + sw - 6 * k)} ${f(sy + sh - 8 * k)} Z`, fill: "#CFCFCA", stroke: INK, "stroke-width": 1.3 }, b);
      el("circle", { cx: f(sx + 30 * k), cy: f(sy + 14 * k), r: f(5 * k), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.2 }, b);
      el("circle", { cx: f(sx - 6 * k), cy: f(sy + 28 * k), r: f(17 * k), fill: "none", stroke: "#77776F", "stroke-width": 1.3 }, b);
    }
    return { w, h };
  };
  D.enveloppe.essais = [{}, { kind: "neutre" }, { kind: "reponse", ouvert: 1 }, { kind: "kammer", w: 200, h: 130, rot: -8 }];

  /* ───────── D.brief — la lettre de la Kammer : feuille, deux plis, en-tête « Ärztekammer Nordrhein » (texte seul, aucun logo) ─────────
   * o = { w: 620, h: 540, corps: [y, …] (lignes de gribouillis du corps — SEULEMENT là ; le reste est blanc pour les citations),
   *       tete: 0…1 (l'en-tête et son filet se révèlent de gauche à droite), signe: 0…1 (la signature se trace),
   *       sig: [x0, y0, x1, y1] (trait de signature ; défaut S13 : (−120, 185) → (100, 175)), gris: 0…1 (lettre ancienne),
   *       coin: 0…1 (le coin bas-droit se soulève : respiration du papier, 0 → 34 px), at: [cx, cy] (si donné, corps et sig en MONDE) }
   * plis: [−88, 104] (en S13 : monde 1037 et 1229, entre les lignes de texte ; jamais sous une ligne arabe), st: 33 (corps de l'en-tête)
   * Ancrage = centre. En-tête à (−288, −217) : en Kalam 33 il mesure 354 px et finit à x 66 (monde 606), avant le
   * tampon dateur (x monde 610–840) ; en Kalam 36 il mesurerait 386 px et toucherait le tampon. Filet à y −199.
   * S13 : D.brief({ at: [540, 1125], corps: [955, 1063, 1245, 1270], sig: [420, 1310, 640, 1300] }) en (540, 1125). */
  D.brief = (g, o) => {
    o = Object.assign({ w: 620, h: 540, corps: [-170, -62, 120, 145], plis: [-88, 104], st: 33, tete: 1, signe: 1, sig: null, gris: 0, coin: 0, at: null, seed: 1111 }, o);
    const w = o.w, h = o.h, x0 = -w / 2, y0 = -h / 2, gz = clamp(o.gris, 0, 1), ax = o.at ? o.at[0] : 0, ay = o.at ? o.at[1] : 0;
    const pap = mix("#FFFFFF", "#E9E9E4", gz), enc = mix(INK, "#9A9A94", gz), C = ctx(g, o.seed + Math.round(w + h));
    const K = 34 * clamp(o.coin, 0, 1), xr = -x0, yb = -y0;
    const feuille = K > 1.5 ? `M${x0} ${y0} L${xr} ${y0} L${xr} ${f(yb - K)} L${f(xr - K)} ${yb} L${x0} ${yb} Z` : rr(x0, y0, w, h, 3);
    ombre(g, rr(x0, y0, w, h, 3), 7, 9);
    U.shape(C, "f", feuille, { base: pap }, { sw: 2.6, stroke: enc, r: 0.4 });
    (o.plis || []).forEach((y) => { ln(g, `M${x0 + 3} ${y} L${xr - 3} ${y}`, 1.4, mix("#DCDCD4", "#D2D2CC", gz)); ln(g, `M${x0 + 3} ${y + 2} L${xr - 3} ${y + 2}`, 1, "#FFFFFF"); });
    // en-tête (texte seul) + filet, révélés de gauche à droite
    if (o.tete > 0) {
      const xe = x0 + 10 + (w - 20) * clamp(o.tete, 0, 1), cg = clipG(g, `M${x0} ${y0} L${f(xe)} ${y0} L${f(xe)} ${y0 + 90} L${x0} ${y0 + 90} Z`);
      txt(cg, "Ärztekammer Nordrhein", x0 + 22, y0 + 53, o.st, { anchor: "start", fill: enc });
      ln(cg, `M${x0 + 22} ${y0 + 71} L${xr - 22} ${y0 + 71}`, 2, enc);
    }
    // corps en gribouillis, seulement aux hauteurs données
    (o.corps || []).forEach((y, i) => grib(g, x0 + 22, f(y - ay), w - 64 - (i % 2) * 90, { seed: 11 + i, col: mix(GRIB, "#D2D2CC", gz) }));
    // signature (tracée peu à peu)
    if (o.signe > 0) {
      const s = o.sig ? [o.sig[0] - ax, o.sig[1] - ay, o.sig[2] - ax, o.sig[3] - ay] : [-120, 185, 100, 175];
      // signature en unités (u de 0 à 1 le long du trait, v en hauteur : 1 = 30 px) : initiale bouclée, deux petites boucles, paraphe
      const SIG = [[0, 0.3], [0.02, -0.9], [0.07, -1.1], [0.08, -0.2], [0.07, 0.6], [0.11, 0.5], [0.15, -0.3], [0.18, 0.2], [0.21, 0.1], [0.25, -0.5], [0.27, 0.15],
        [0.31, 0.2], [0.35, -0.35], [0.38, 0.1], [0.42, -0.2], [0.45, 0.3], [0.52, -0.6], [0.56, -0.05], [0.6, 0.25], [0.66, -0.25], [0.72, 0.15], [0.8, -0.1], [0.9, 0.05], [1, -0.05]];
      const P = SIG.map(([u, v]) => [s[0] + (s[2] - s[0]) * u, lerp(s[1], s[3], u) + v * 30]);
      let d = `M${f(P[0][0])} ${f(P[0][1])}`;
      for (let i = 1; i < P.length; i++) { const a = P[i - 1], b = P[i], m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; d += ` Q${f(a[0])} ${f(a[1])} ${f(m[0])} ${f(m[1])}`; }
      d += ` L${f(P[P.length - 1][0])} ${f(P[P.length - 1][1])} M${f(s[0] + (s[2] - s[0]) * 0.3)} ${f(lerp(s[1], s[3], 0.3) + 14)} L${f(s[0] + (s[2] - s[0]) * 0.86)} ${f(lerp(s[1], s[3], 0.86) + 10)}`;
      ln(g, d, 2.4, enc, { pathLength: 1, "stroke-dasharray": `${f(clamp(o.signe, 0, 1) * 1.001)} 2` });
    }
    // coin soulevé
    if (K > 1.5) {
      el("path", { d: `M${xr} ${f(yb - K)} L${f(xr - K)} ${yb} L${f(xr + 3)} ${f(yb + 3)} Z`, fill: "rgba(28,26,28,.14)" }, g);
      el("path", { d: `M${xr} ${f(yb - K)} L${f(xr - K)} ${yb} L${f(xr - K * 0.86)} ${f(yb - K * 0.86)} Z`, fill: mix("#E6E6E0", "#DCDCD6", gz), stroke: enc, "stroke-width": 2, "stroke-linejoin": "round" }, g);
    }
    return { entete: [x0 + 22, y0 + 53], filet: y0 + 71, bord: { x: x0, y: y0, w, h } };
  };
  D.brief.essais = [{}, { tete: 0.45, signe: 0.4, coin: 0.6 }, { gris: 0.7, corps: [-170, -62, 120], signe: 1 }];

  /* ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
   * F3. LE SITE ET LES COMPTES (S14, S15, S17) — poste sur un bureau, page de navigateur, fiches de profil
   * ═════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

  /* ───────── D.navigateur — fenêtre de navigateur au trait (ni nom de cabinet, ni prix, ni acte) ─────────
   * o = { bande: false, w: 600, h: 420 (bande : 120), rows: 0…1 (les deux colonnes se remplissent ; les titres arrivent avec),
   *       recharge: 0…1 (la flèche tourne, la page clignote), fleche: true (false : la flèche est un nœud à part),
   *       partie: "tout" | "fleche" (la flèche seule, centre (0, 0), r 9) | "curseur" (pointeur de souris, pointe en (0, 0)) }
   * Ancrage = centre. Barre de titre y −210…−170 (trois ronds, flèche en (−208, −190), champ d'adresse « ….de ») ;
   * en-tête de page y −170…−118 (pictogramme r 22) ; titres Kalam 28 à y −90 : « Preisliste » en x −140, « Impressum » en x 140 ;
   * rangées y −24 + 26 i (gribouillis, « € » sans chiffre à gauche) ; les lignes de nom (y 138 et 176) sont des nœuds de story.js.
   * bande (S15, S16) : 600 × 120, barre y −60…−20 (le champ, vide, reçoit « Preisliste · Impressum » à y −38), ligne de nom à y +30.
   * Renvoie { titres: y, cols: [x, x], noms: [y, y], fleche: [x, y], champ: { x, y, w, h }, page: { x, y, w, h } }. */
  D.navigateur = (g, o) => {
    o = Object.assign({ bande: false, w: 600, h: null, rows: 1, recharge: 0, fleche: true, partie: "tout", seed: 1121 }, o);
    if (o.partie === "fleche") { recharger(g, 0, 0, 9, 360 * (o.recharge || 0)); return {}; }
    if (o.partie === "curseur") { pointeur(g); return {}; }
    const bande = !!o.bande, w = o.w, h = o.h || (bande ? 120 : 420), x0 = -w / 2, y0 = -h / 2, C = ctx(g, o.seed + (bande ? 3 : 0));
    ombre(g, rr(x0, y0, w, h, 14), 6, 8);
    U.shape(C, "fen", rr(x0, y0, w, h, 14), MAT.white, { sw: 3, r: 0.5 });
    const cg = clipG(g, rr(x0 + 1.5, y0 + 1.5, w - 3, h - 3, 13));
    el("rect", { x: x0, y: y0, width: w, height: 40, fill: "#E6E6E1" }, cg);
    ln(g, `M${x0} ${y0 + 40} L${-x0} ${y0 + 40}`, 2, INK);
    [22, 42, 62].forEach((x, i) => el("circle", { cx: x0 + x, cy: y0 + 20, r: 6, fill: i ? "#FFFFFF" : "#CFCFCA", stroke: INK, "stroke-width": 1.8 }, g));
    const fl = [x0 + 92, y0 + 20];
    if (o.fleche) recharger(g, fl[0], fl[1], 9, 360 * (o.recharge || 0));
    const champ = { x: x0 + 112, y: y0 + 8, w: w - 132, h: 24 };
    el("path", { d: rr(champ.x, champ.y, champ.w, champ.h, 12), fill: "#FFFFFF", stroke: "#8A8A84", "stroke-width": 1.6 }, g);
    const out = { fleche: fl, champ, cols: [-140, 140], titres: -90, noms: bande ? [30] : [138, 176], page: { x: x0, y: y0 + 40, w, h: h - 40 } };
    if (bande) return out;
    // champ d'adresse : gribouillis + « .de »
    grib(g, champ.x + 16, y0 + 20, 150, { seed: 21, sw: 1.8 });
    txt(g, ".de", champ.x + 186, y0 + 26, 18, { anchor: "start", fill: "#55524B" });
    // en-tête de page : pictogramme + nom du site en gribouillis + menu
    el("rect", { x: x0, y: y0 + 40, width: w, height: 52, fill: "#F4F3EE" }, cg);
    ln(g, `M${x0} ${y0 + 92} L${-x0} ${y0 + 92}`, 1.4, "#C9C9C1");
    D.silhouette(el("g", { transform: `translate(${x0 + 46} ${y0 + 66})` }, g), { r: 22 });
    grib(g, x0 + 80, y0 + 62, 120, { seed: 23, sw: 3, col: "#9A9A94" });
    [0, 1, 2, 3].forEach((i) => grib(g, 40 + i * 62, y0 + 70, 44, { seed: 25 + i, sw: 1.8 }));
    // titres + colonnes (se remplissent avec rows)
    const R = clamp(o.rows, 0, 1);
    if (R > 0) {
      const tg = el("g", { opacity: f(Math.min(1, R * 4)) }, g);
      txt(tg, "Preisliste", -140, -90, 28, {}); txt(tg, "Impressum", 140, -90, 28, {});
      ln(g, "M0 -112 L0 196", 1.4, "#D5D2C7", { "stroke-dasharray": "6 6" });
      const n = Math.ceil(R * 5 - 0.001);
      for (let i = 0; i < n; i++) {
        const y = -24 + 26 * i, wl = 118 + ((i * 37) % 40);
        grib(g, -252, y, wl, { seed: 31 + i, sw: 2 });
        txt(g, "€", -60, y + 7, 22, { fill: "#55524B" });
        grib(g, 34, y, 150 + ((i * 53) % 70), { seed: 41 + i, sw: 2 });
      }
    }
    if (o.recharge > 0 && o.recharge < 1) el("rect", { x: x0 + 2, y: y0 + 41, width: w - 4, height: h - 43, fill: "#FFFFFF", opacity: f(0.85 * Math.sin(Math.PI * o.recharge)) }, cg);
    return out;
  };
  D.navigateur.essais = [{}, { rows: 0.5, recharge: 0.4 }, { bande: true }, { partie: "curseur" }];

  /* ───────── D.poste — poste de travail : écran (coque 632 × 452) sur pied, posé sur un bureau en perspective ─────────
   * o = { w: 632, h: 452, fond: 50, bord: 284, face: 384, bureau: true }
   * Ancrage = milieu du BAS de la coque (S14, S17 : (540, 1016) → coque x 224–856, y 564–1016). Pied : col 80 × 34, socle 240 × 16
   * posé sur le fond du plateau (y +50) ; plateau jusqu'au bord avant (y +284, x ±420) ; façade jusqu'à y +384.
   * D.navigateur se pose au centre de la dalle : out.dalle (inset 16 px), centre (0, −226).
   * Renvoie { dalle: { x, y, w, h }, centre: [0, −h/2], plateau: { fond, bord }, face }. */
  D.poste = (g, o) => {
    o = Object.assign({ w: 632, h: 452, fond: 50, bord: 284, face: 384, bureau: true, seed: 1131 }, o);
    const w = o.w, h = o.h, x0 = -w / 2, F = o.fond, B = o.bord, C = ctx(g, o.seed);
    if (o.bureau) {
      U.shape(C, "plateau", `M-392 ${F} L392 ${F} L420 ${B} L-420 ${B} Z`, MAT.wood, { sw: 3, r: 0.5 });
      ln(g, `M-330 ${F + 60} C-200 ${F + 54} -60 ${F + 66} 120 ${F + 58} M-360 ${F + 150} C-200 ${F + 144} 100 ${F + 156} 340 ${F + 148}`, 1.3, "#BDBAAE");
      U.shape(C, "chant", rr(-424, B, 848, 22, 4), MAT.wood, { sw: 3 });
      ln(g, `M-414 ${B + 6} L414 ${B + 6}`, 1.3, "#FFFFFF");
      U.shape(C, "face", rr(-408, B + 22, 816, o.face - B - 22, 2), MAT.light, { sw: 2.8, r: 0.5 });
      el("path", { d: rr(96, B + 36, 236, 52, 5), fill: "#F4F3EE", stroke: INK, "stroke-width": 2.2 }, g);       // tiroir : x monde 636–872
      el("path", { d: `M184 ${B + 56} L244 ${B + 56} C242 ${B + 74} 186 ${B + 74} 184 ${B + 56} Z`, fill: ACIER, stroke: INK, "stroke-width": 2 }, g);
      ln(g, `M-380 ${B + 40} L-380 ${o.face - 4} M66 ${B + 40} L66 ${o.face - 4}`, 1.2, "#BDBDB6");
    }
    // pied
    el("ellipse", { cx: 8, cy: F + 2, rx: 132, ry: 8, fill: "rgba(28,26,28,.16)" }, g);
    U.shape(C, "socle", rr(-120, F - 16, 240, 16, 8), MAT.mid, { sw: 2.6 });
    U.shape(C, "col", rr(-40, -8, 80, F - 6, 6), MAT.mid, { sw: 2.6 });
    ln(g, `M-28 0 L-28 ${F - 22}`, 1.3, "#FFFFFF");
    // coque + dalle
    ombre(g, rr(x0, -h, w, h, 18), 8, 10);
    U.shape(C, "coque", rr(x0, -h, w, h, 18), MAT.mid, { sw: 3.2 });
    el("path", { d: rr(x0 + 13, -h + 13, w - 26, h - 26, 7), fill: "#FBFBF8", stroke: INK, "stroke-width": 2 }, g);
    el("circle", { cx: f(w / 2 - 26), cy: -6.5, r: 3, fill: "#9A9A94", stroke: INK, "stroke-width": 1 }, g);
    return { dalle: { x: x0 + 16, y: -h + 16, w: w - 32, h: h - 32 }, centre: [0, -h / 2], plateau: { fond: F, bord: B }, face: o.face };
  };
  D.poste.essais = [{}, { bureau: false }];

  /* ───────── D.fiche — fiche de profil d'un réseau social DESSINÉ (une fiche cartonnée, pas un téléphone, aucun logo) ─────────
   * o = { kind: "fiche" (290 × 190) | "pilule" (280 × 90 : avatar r 30 + nom) | "bio" (200 × 240 : ton compte, avatar vide, nom en
   *       pointillé, « Bio: » + texte tapé), nom: "dr_………", n: "40.000" (null : le compteur est un nœud de story.js, à out.n),
   *       avatar: "picto" (D.silhouette) | "vide", bio: "" , curseur: true, pied: false (petit pied : la fiche tient debout) }
   * Ancrage = centre. Le corps du nom est réduit s'il ne tient pas. Renvoie { avatar: [x, y, r], nom: { x, y, w, size },
   * n: { x, y, size } (ligne de base du compteur, ancré à gauche), bio: [x, y] }. */
  D.fiche = (g, o) => {
    o = Object.assign({ kind: "fiche", nom: "dr_………", n: "40.000", avatar: "picto", bio: "", curseur: true, pied: false, seed: 1141 }, o);
    const C = ctx(g, o.seed + o.kind.length), out = {};
    const avatar = (x, y, r, vide) => {
      el("circle", { cx: x, cy: y, r: r + 5, fill: "none", stroke: "#9A9A94", "stroke-width": 1.6 }, g);
      if (vide) el("circle", { cx: x, cy: y, r, fill: "#F4F3EE", stroke: INK, "stroke-width": 2.6, "stroke-dasharray": "7 5" }, g);
      else D.silhouette(el("g", { transform: `translate(${x} ${y})` }, g), { r });
      out.avatar = [x, y, r];
    };
    if (o.kind === "pilule") {
      ombre(g, rr(-140, -45, 280, 90, 45), 5, 7);
      U.shape(C, "pil", rr(-140, -45, 280, 90, 45), MAT.white, { sw: 3, r: 0.5 });
      avatar(-96, 0, 30, o.avatar === "vide");
      const s = fit(o.nom, 34, 172);
      txt(g, o.nom, -56, f(s * 0.34), s, { anchor: "start" });
      out.nom = { x: -56, y: f(s * 0.34), w: f(larg(o.nom, s)), size: s };
      return out;
    }
    if (o.kind === "bio") {
      ombre(g, rr(-100, -120, 200, 240, 16), 6, 8);
      U.shape(C, "bio", rr(-100, -120, 200, 240, 16), MAT.white, { sw: 3, r: 0.5 });
      avatar(0, -62, 34, true);
      let d = ""; for (let i = 0; i < 8; i++) d += cercle(-42 + i * 12, -6, 2.4); el("path", { d, fill: INK }, g);
      txt(g, "Bio:", -80, 34, 22, { anchor: "start" });
      if (o.bio) { const s = fit(o.bio, 22, 160); txt(g, o.bio, -80, 68, s, { anchor: "start" }); out.bio = [-80, 68]; if (o.curseur) el("rect", { x: f(-80 + larg(o.bio, s) + 4), y: 48, width: 3, height: 26, fill: INK }, g); }
      else { out.bio = [-80, 68]; if (o.curseur) el("rect", { x: -78, y: 48, width: 3, height: 26, fill: INK }, g); }
      grib(g, -80, 96, 120, { seed: 51, sw: 1.8 });
      out.nom = { x: -42, y: -6, w: 84, size: 0 };
      return out;
    }
    if (o.pied) {
      el("path", { d: "M-70 95 L-58 112 L58 112 L70 95 Z", fill: "#CFCFCA", stroke: INK, "stroke-width": 2.2, "stroke-linejoin": "round" }, g);
      el("ellipse", { cx: 8, cy: 113, rx: 80, ry: 5, fill: "rgba(28,26,28,.16)" }, g);
    }
    ombre(g, rr(-145, -95, 290, 190, 16), 6, 8);
    U.shape(C, "fiche", rr(-145, -95, 290, 190, 16), MAT.white, { sw: 3, r: 0.5 });
    el("path", { d: rr(-138, -88, 276, 26, 10), fill: "#F0F0EB" }, g);
    avatar(-84, -8, 44, o.avatar === "vide");
    const s = fit(o.nom, 34, 158);
    txt(g, o.nom, -28, -26, s, { anchor: "start" });
    out.nom = { x: -28, y: -26, w: f(larg(o.nom, s)), size: s };
    const sn = 30; out.n = { x: -28, y: 14, size: sn };
    if (o.n != null && o.n !== "") txt(g, o.n, -28, 14, fit(o.n, sn, 160), { anchor: "start" });
    txt(g, "Abonnenten", -28, 40, 20, { anchor: "start", fill: "#55524B" });
    el("path", { d: rr(-28, 55, 104, 28, 14), fill: "#F4F3EE", stroke: INK, "stroke-width": 2.2 }, g);
    el("path", { d: rr(84, 55, 44, 28, 14), fill: "none", stroke: "#9A9A94", "stroke-width": 1.8 }, g);
    return out;
  };
  D.fiche.essais = [{ pied: true }, { nom: "dr.med.………", n: "über 16.000" }, { kind: "pilule", nom: "dr_………" }, { kind: "pilule", nom: "dr.med.………" },
    { kind: "bio" }, { kind: "bio", bio: "Dr" }];

  /* ───────── D.dateur — tampon DATEUR à molettes (S17) : bâti d'acier, poignée de bois, l'année lue dans sa fenêtre ─────────
   * o = { an: "2017", cran: 0…1 (la molette passe d'un cran à l'année suivante : le chiffre monte, le suivant arrive d'en bas) }
   * Pas de calendrier à feuillets (dispositif d'AKTE 06). 130 × 150 · ancrage = centre du bas. Renvoie { fenetre: [0, −68] }. */
  D.dateur = (g, o) => {
    o = Object.assign({ an: "2017", cran: 0, seed: 1151 }, o);
    const C = ctx(g, o.seed), c = clamp(o.cran, 0, 1);
    el("ellipse", { cx: 8, cy: 1, rx: 70, ry: 7, fill: "rgba(28,26,28,.18)" }, g);
    U.shape(C, "sem", rr(-62, -18, 124, 18, 5), MAT.dark, { sw: 2.6 });
    ln(g, "M-52 -6 L52 -6", 1.3, "#77776F");
    U.shape(C, "bati", "M-58 -16 L-58 -86 C-58 -110 -36 -118 -20 -118 L20 -118 C36 -118 58 -110 58 -86 L58 -16 Z", { base: ACIER }, { sw: 3, r: 0.5 });
    ln(g, "M-48 -24 L-48 -86 C-48 -102 -34 -108 -22 -108", 1.6, "#FFFFFF");
    // molettes (bandes de caoutchouc) vues par la tranche + fenêtre de l'année
    el("path", { d: rr(-46, -96, 92, 58, 6), fill: "#3A3A37", stroke: INK, "stroke-width": 2 }, g);
    for (let x = -40; x <= 40; x += 8) ln(g, `M${x} -94 L${x} -40`, 1, "#55524B");
    el("path", { d: rr(-38, -86, 76, 36, 5), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2 }, g);
    const cg = clipG(g, rr(-37, -85, 74, 34, 4)), an = String(o.an), suiv = /^\d+$/.test(an) ? String(+an + 1) : an;
    txt(cg, an, 0, f(-58 - 34 * c), 26, {});
    if (c > 0) txt(cg, suiv, 0, f(-58 + 34 * (1 - c)), 26, {});
    // molette de réglage (sur le côté)
    el("ellipse", { cx: 62, cy: -66, rx: 7, ry: 16, fill: "#CFCFCA", stroke: INK, "stroke-width": 2 }, g);
    ln(g, "M57 -76 L67 -76 M57 -70 L67 -70 M57 -64 L67 -64 M57 -58 L67 -58", 1.2, "#55524B");
    // poignée en bois
    U.shape(C, "col", rr(-10, -132, 20, 18, 4), MAT.wood, { sw: 2.4 });
    U.shape(C, "pom", "M-30 -128 C-34 -142 -18 -150 0 -150 C18 -150 34 -142 30 -128 C22 -122 -22 -122 -30 -128 Z", MAT.wood, { sw: 2.6 });
    ln(g, "M-20 -140 C-10 -146 4 -147 12 -145", 2, "#FFFFFF");
    return { fenetre: [0, -68] };
  };
  D.dateur.essais = [{}, { cran: 0.5 }, { an: "2019" }];

  /* ───────── D.bac — bannette à courrier VIDE (S17) ─────────
   * o = { w: 220, h: 70, partie: "tout" | "fond" (dos, côtés, fond) | "face" (la face avant, à poser APRÈS une enveloppe qui tombe dedans) }
   * Ancrage = centre du bas (S17 : (700, 1300) → x 590–810). */
  D.bac = (g, o) => {
    o = Object.assign({ w: 220, h: 70, partie: "tout", seed: 1161 }, o);
    const w = o.w, h = o.h, a = w / 2, C = ctx(g, o.seed);
    if (o.partie !== "face") {
      el("ellipse", { cx: 8, cy: 2, rx: a + 10, ry: 6, fill: "rgba(28,26,28,.16)" }, g);
      U.shape(C, "dos", `M${-a + 8} ${-h} L${a - 8} ${-h} L${a - 8} ${-h + 34} L${-a + 8} ${-h + 34} Z`, MAT.grey, { sw: 2.6, r: 0.5 });
      el("path", { d: `M${-a + 8} ${-h + 30} L${a - 8} ${-h + 30} L${a} -40 L${-a} -40 Z`, fill: "#BDBDB6", stroke: INK, "stroke-width": 2 }, g);
      ln(g, `M${-a + 8} ${-h} L${-a} -40 M${a - 8} ${-h} L${a} -40`, 2.6, INK);
      ln(g, `M${-a + 16} ${-h + 6} L${a - 16} ${-h + 6}`, 1.2, "#FFFFFF");
    }
    if (o.partie !== "fond") {
      U.shape(C, "face", `M${-a} -40 L-44 -40 C-40 -22 40 -22 44 -40 L${a} -40 L${a - 4} 0 L${-a + 4} 0 Z`, MAT.grey, { sw: 2.8, r: 0.5 });
      ln(g, `M${-a + 10} -10 L${a - 10} -10`, 1.2, "#8A8A84");
      ln(g, `M${-a + 8} -34 L-50 -34 M50 -34 L${a - 8} -34`, 1.2, "#FFFFFF");
    }
    return { fond: -h + 30 };
  };
  D.bac.essais = [{}, { partie: "fond" }, { partie: "face" }];

  /* ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
   * F4. LE TRIBUNAL (S18, S19) — le Strafbefehl ; le banc de l'Amtsgericht vu DE FACE, en morceaux (coordonnées MONDE)
   *     Ni balance, ni plaque au mur, ni boiserie, ni étagère, ni micro, ni marteau, ni emblème ; rien au plafond.
   * ═════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

  /* ───────── D.strafbefehl — enveloppe NEUTRE d'où sort une feuille : « Amtsgericht Düsseldorf », « Strafbefehl », « 25.06.2019 » ─────────
   * o = { sorti: 0…1 (la feuille sort de l'enveloppe), trombone: true (sur le bord droit de la feuille, en (220, −260) : l'étiquette y pend) }
   * Ancrage = milieu du bord HAUT de l'enveloppe (S18 : (540, 1020)). Enveloppe 520 × 300 (x −260…260, y 0…300) ;
   * feuille 440 × 420 (x −220…220, y −420…0 quand sorti = 1). La bande y −165…−75 de la feuille reste libre (tampon EINSPRUCH).
   * Renvoie { trombone: [220, −260], feuille: { x, y, w, h }, enveloppe: { x, y, w, h } }. */
  D.strafbefehl = (g, o) => {
    o = Object.assign({ sorti: 1, trombone: true, seed: 1171 }, o);
    const ew = 520, eh = 300, fw = 440, fh = 420, C = ctx(g, o.seed), dy = (1 - clamp(o.sorti, 0, 1)) * (fh - 20);
    U.shape(C, "rabat", `M${-ew / 2 + 4} 2 L${ew / 2 - 4} 2 L0 -128 Z`, { base: "#ECECE6" }, { sw: 2.4, r: 0.4 });
    el("path", { d: rr(-ew / 2 + 8, -3, ew - 16, 12, 3), fill: "#CFCFCA" }, g);
    const cg = clipG(g, `M${-ew / 2} -700 L${ew / 2} -700 L${ew / 2} ${eh - 10} L${-ew / 2} ${eh - 10} Z`), fg = el("g", { transform: `translate(0 ${f(dy)})` }, cg);
    const Cf = ctx(fg, o.seed + 1);
    ombre(fg, rr(-fw / 2, -fh, fw, fh + 40, 3), 6, 7);
    U.shape(Cf, "f", rr(-fw / 2, -fh, fw, fh + 40, 3), MAT.white, { sw: 2.6, r: 0.4 });
    txt(fg, "Amtsgericht Düsseldorf", 0, -370, 22, { fill: "#3A3A37" });
    ln(fg, "M-150 -358 L150 -358", 1.4, "#9A9A94");
    txt(fg, "Strafbefehl", 0, -290, 64, {});
    txt(fg, "25.06.2019", 0, -225, 40, {});
    grib(fg, -150, -192, 300, { seed: 61, sw: 2 });
    grib(fg, -190, -60, 380, { n: 3, pas: 18, seed: 63, sw: 2 });
    if (o.trombone) {
      const x = fw / 2;
      el("path", { d: `M${x - 6} -232 L${x - 6} -282 C${x - 6} -294 ${x + 12} -294 ${x + 12} -282 L${x + 12} -242 C${x + 12} -234 ${x + 2} -234 ${x + 2} -242 L${x + 2} -276`, fill: "none", stroke: INK, "stroke-width": 4.4, "stroke-linecap": "round" }, fg);
      el("path", { d: `M${x - 6} -232 L${x - 6} -282 C${x - 6} -294 ${x + 12} -294 ${x + 12} -282 L${x + 12} -242 C${x + 12} -234 ${x + 2} -234 ${x + 2} -242 L${x + 2} -276`, fill: "none", stroke: ACIER, "stroke-width": 2, "stroke-linecap": "round" }, fg);
    }
    // l'enveloppe (devant), neutre : fenêtre + gribouillis
    ombre(g, rr(-ew / 2, 0, ew, eh, 6), 7, 9);
    U.shape(C, "env", rr(-ew / 2, 0, ew, eh, 6), { base: "#FFFFFF" }, { sw: 3, r: 0.4 });
    ln(g, `M${-ew / 2 + 4} ${eh - 4} L-60 140 M${ew / 2 - 4} ${eh - 4} L60 140`, 1.2, "#E6E6E1");
    grib(g, -ew / 2 + 26, 34, 160, { n: 2, pas: 14, seed: 65, sw: 1.8 });
    el("path", { d: rr(-ew / 2 + 30, 116, 230, 84, 7), fill: "#F3F6F6", stroke: "#8A8A84", "stroke-width": 1.6 }, g);
    grib(g, -ew / 2 + 46, 140, 170, { n: 3, pas: 18, seed: 67, sw: 2, fin: 0.55 });
    return { trombone: [fw / 2, -260], feuille: { x: -fw / 2, y: -fh, w: fw, h: fh }, enveloppe: { x: -ew / 2, y: 0, w: ew, h: eh } };
  };
  D.strafbefehl.essais = [{}, { sorti: 0.4 }];

  /* ───────── D.salleFace — la salle de l'Amtsgericht vue de face (coordonnées MONDE : poser en (0, 0)) ─────────
   * Mur clair uni jusqu'à y 1000 (la zone x 235–845, y 380–535 reste nue) ; soubassement PEINT (bande grise unie, filet d'encre
   * à y 1000) jusqu'à 1150 ; sol uni dessous. Deux vasistas hauts (x 150–290 et 790–930, y 570–700) à verre dépoli, SANS store ni
   * lame ; deux rais de lumière qui descendent en biais vers le banc ; dossier haut du fauteuil du juge (x 470–610, y 760–950,
   * MAT.mid, deux clous) — à poser AVANT RIC.
   * o = { rais: 0.24 (opacité des rais ; 0 = sans — à 0,10 comme écrit au storyboard, ils ne se voient pas sur le mur clair), fauteuil: true, partie: "tout" | "rais" (les deux rais seuls, pour les faire frémir) }
   * Renvoie { soub: 1000, sol: 1150, rais: [[x0, y0, x1, y1], …] (axe de chaque rai, pour m.dust) }. */
  D.salleFace = (g, o) => {
    o = Object.assign({ x0: 40, x1: 1040, haut: 250, bas: 1470, rais: 0.24, fauteuil: true, partie: "tout", seed: 1181 }, o);
    const C = ctx(g, o.seed), x0 = o.x0, x1 = o.x1, V = [[150, 290], [790, 930]], vy0 = 570, vy1 = 700;
    const RAIS = [[[168, 700], [282, 700], [500, 932], [360, 932]], [[798, 700], [912, 700], [720, 932], [580, 932]]];
    const rais = (gg) => RAIS.forEach((p) => {
      el("path", { d: `M${p[0]} L${p[1]} L${p[2]} L${p[3]} Z`.replace(/,/g, " "), fill: "#FFFFFF", opacity: f(o.rais) }, gg);
      ln(gg, `M${p[0].join(" ")} L${p[3].join(" ")} M${p[1].join(" ")} L${p[2].join(" ")}`, 2, "#FFFFFF", { opacity: f(Math.min(1, o.rais * 1.6)), "stroke-dasharray": "14 10" });
    });
    const out = { soub: 1000, sol: 1150, rais: RAIS.map((p) => [f((p[0][0] + p[1][0]) / 2), 700, f((p[2][0] + p[3][0]) / 2), 932]) };
    if (o.partie === "rais") { rais(g); return out; }
    el("rect", { x: x0, y: o.haut, width: x1 - x0, height: 1000 - o.haut, fill: "#EFEEE8" }, g);
    ln(g, "M78 430 l26 3 M968 460 l-28 5 M110 880 l22 -4 M975 840 l-24 2 M300 760 l18 2 M760 790 l-20 3", 1.4, "#D5D2C7");
    // soubassement peint + filet
    el("rect", { x: x0, y: 1000, width: x1 - x0, height: 150, fill: "#DEDDD6" }, g);
    ln(g, `M${x0} 1000 L${x1} 1000`, 2.6, INK);
    ln(g, `M${x0} 1009 L${x1} 1009`, 1.2, "#B9B9B2");
    // sol
    el("rect", { x: x0, y: 1150, width: x1 - x0, height: o.bas - 1150, fill: "#E8E6DF" }, g);
    ln(g, `M${x0} 1150 L${x1} 1150`, 3, INK);
    ln(g, `M${x0} 1162 L${x1} 1162`, 1.2, "#C9C6BC");
    el("rect", { x: x0, y: o.bas - 10, width: x1 - x0, height: 10, fill: PAPIER, opacity: 0.6 }, g);
    // deux vasistas à verre dépoli (ouverts en soufflet : deux petits jours en haut)
    V.forEach(([a, b], i) => {
      el("path", { d: rr(a - 8, vy0 - 8, b - a + 16, vy1 - vy0 + 16, 3), fill: "#E2E0D9" }, g);
      U.shape(C, "dorm" + i, rr(a, vy0, b - a, vy1 - vy0, 3), MAT.light, { sw: 3 });
      U.shape(C, "verre" + i, rr(a + 13, vy0 + 13, b - a - 26, vy1 - vy0 - 26, 2), { base: "#EEF3F4", hatch: "#DCE3E4", gap: 7, fw: 1 }, { sw: 2.2, r: 0.4 });
      el("path", { d: `M${a + 13} ${vy0 + 13} L${a + 22} ${vy0 + 13} L${a + 13} ${vy0 + 40} Z M${b - 13} ${vy0 + 13} L${b - 22} ${vy0 + 13} L${b - 13} ${vy0 + 40} Z`, fill: "#55524B" }, g);
      ln(g, `M${a + 22} ${vy0 + 22} L${a + 60} ${vy0 + 22}`, 2, "#FFFFFF", { opacity: 0.8 });
      el("path", { d: rr((a + b) / 2 - 14, vy1 - 10, 28, 7, 3), fill: ACIER, stroke: INK, "stroke-width": 1.6 }, g);
      U.shape(C, "appui" + i, rr(a - 10, vy1 + 4, b - a + 20, 10, 3), MAT.light, { sw: 2.2 });
    });
    if (o.rais > 0) rais(g);
    // dossier haut du fauteuil du juge
    if (o.fauteuil) {
      ombre(g, "M470 950 L470 800 C470 770 490 760 540 760 C590 760 610 770 610 800 L610 950 Z", 6, 6, "rgba(28,26,28,.14)");
      U.shape(C, "fauteuil", "M470 950 L470 800 C470 770 490 760 540 760 C590 760 610 770 610 800 L610 950 Z", MAT.mid, { sw: 3 });
      ln(g, "M484 948 L484 804 C484 782 500 774 540 774 C580 774 596 782 596 804 L596 948", 1.6, "#55524B");
      [[494, 790], [586, 790]].forEach(([x, y]) => { el("circle", { cx: x, cy: y, r: 4.5, fill: ACIER, stroke: INK, "stroke-width": 1.6 }, g); });
    }
    return out;
  };
  D.salleFace.essais = [{}, { partie: "rais" }];

  /* ───────── D.banc — le banc du juge (coordonnées MONDE : poser en (0, 0)) : façade simple, dessus à y 930, pupitre incliné
   * au centre, code épais GRIS en (640, 930). o = { x0: 330, x1: 750, dessus: 930, bas: 1150, code: true }
   * Le dossier qui tombe (D.dossier) et les deux lettres de laiton sont des nœuds de story.js, posés sur y 930.
   * Renvoie { dessus, pupitre: [540, 908] (où RIC pose sa feuille), code: [640, 930] }. */
  D.banc = (g, o) => {
    o = Object.assign({ x0: 330, x1: 750, dessus: 930, bas: 1150, code: true, seed: 1191 }, o);
    const C = ctx(g, o.seed), a = o.x0, b = o.x1, y = o.dessus;
    // pupitre incliné (derrière le chant)
    U.shape(C, "pup", `M478 ${y} L602 ${y} L592 ${y - 22} L488 ${y - 22} Z`, MAT.mid, { sw: 2.6 });
    ln(g, `M492 ${y - 18} L588 ${y - 18}`, 1.3, "#FFFFFF");
    if (o.code) D.livre(el("g", { transform: `translate(640 ${y})` }, g), { w: 96, h: 36, mat: "gris", seed: 1193 });
    // façade
    ombre(g, rr(a, y, b - a, o.bas - y, 3), 8, 6);
    U.shape(C, "face", rr(a, y + 6, b - a, o.bas - y - 6, 3), MAT.light, { sw: 3, r: 0.5 });
    ln(g, `M${a + 140} ${y + 22} L${a + 140} ${o.bas - 30} M${b - 140} ${y + 22} L${b - 140} ${o.bas - 30}`, 1.4, "#BDBDB6");
    el("rect", { x: a + 2, y: o.bas - 26, width: b - a - 4, height: 24, fill: "#D9D8D1" }, g);
    ln(g, `M${a} ${o.bas - 26} L${b} ${o.bas - 26}`, 1.6, "#8A8A84");
    // dessus (chant gris)
    U.shape(C, "chant", rr(a - 12, y - 3, b - a + 24, 16, 4), MAT.grey, { sw: 2.8 });
    ln(g, `M${a - 4} ${y + 1} L${b + 4} ${y + 1}`, 1.2, "#FFFFFF");
    return { dessus: y, pupitre: [540, y - 22], code: [640, y] };
  };
  D.banc.essais = [{}];

  /* ───────── D.dossier — (hors inventaire) un dossier posé à plat, vu de face ─────────
   * o = { w: 96, h: 20, ouvert: false (true : ouvert à plat, pages en éventail — celui de STA) } · ancrage = centre du bas.
   * S19 : le dossier qui tombe sur le banc en (465, 930) (à droite des lettres, qui finissent à x 419). */
  D.dossier = (g, o) => {
    o = Object.assign({ w: 96, h: 20, ouvert: false, seed: 1197 }, o);
    const w = o.w, h = o.h, C = ctx(g, o.seed + (o.ouvert ? 1 : 0));
    el("ellipse", { cx: 4, cy: 1, rx: w / 2 + 8, ry: 4, fill: "rgba(28,26,28,.18)" }, g);
    if (o.ouvert) {
      U.shape(C, "plat", rr(-w, -6, 2 * w, 6, 2), MAT.mid, { sw: 2.2 });
      U.shape(C, "pages", `M${-w + 6} -6 C${-w / 2} -16 -10 -16 0 -7 C10 -16 ${w / 2} -16 ${w - 6} -6 Z`, MAT.white, { sw: 2, r: 0.4 });
      ln(g, `M${-w + 16} -9 C${-w / 2} -14 -16 -13 -4 -9 M4 -9 C16 -13 ${w / 2} -14 ${w - 16} -9`, 1, "#9A9A94");
      return { haut: [0, -16] };
    }
    U.shape(C, "dessous", rr(-w / 2, -6, w, 6, 2), MAT.mid, { sw: 2.2 });
    el("path", { d: rr(-w / 2 + 3, -h + 5, w - 6, h - 10, 1), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
    ln(g, `M${-w / 2 + 5} ${-h * 0.5} L${w / 2 - 5} ${-h * 0.5}`, 1, "#C9C9C1");
    U.shape(C, "dessus", rr(-w / 2 - 2, -h, w + 4, 6, 2), MAT.mid, { sw: 2.2 });
    el("path", { d: rr(w / 2 - 22, -h - 1, 6, h + 1, 2), fill: "#3A3A37" }, g);
    return { haut: [0, -h] };
  };
  D.dossier.essais = [{}, { ouvert: true, w: 64 }];

  /* ───────── D.tableProc — table de la procureure (MONDE) : x 140–330, dessus y 1090, façade jusqu'à 1230 ; un dossier ouvert
   * dessus (o.dossier) ; deux pieds courts sous la façade. À poser APRÈS STA (la table cache ses mains). */
  D.tableProc = (g, o) => {
    o = Object.assign({ x0: 140, x1: 330, dessus: 1090, bas: 1230, dossier: true, seed: 1201 }, o);
    const C = ctx(g, o.seed), a = o.x0, b = o.x1, y = o.dessus;
    if (o.dossier) D.dossier(el("g", { transform: `translate(${(a + b) / 2} ${y - 2})` }, g), { ouvert: true, w: 66 });
    [a + 14, b - 14].forEach((x, i) => U.shape(C, "pied" + i, rr(x - 6, o.bas - 6, 12, 26, 2), MAT.mid, { sw: 2 }));
    ombre(g, rr(a, y, b - a, o.bas - y, 2), 6, 6);
    U.shape(C, "face", rr(a, y + 6, b - a, o.bas - y - 6, 2), MAT.light, { sw: 2.8, r: 0.5 });
    ln(g, `M${a + 12} ${y + 30} L${b - 12} ${y + 30}`, 1.2, "#BDBDB6");
    U.shape(C, "chant", rr(a - 8, y - 3, b - a + 16, 14, 3), MAT.grey, { sw: 2.6 });
    ln(g, `M${a} ${y + 1} L${b} ${y + 1}`, 1.2, "#FFFFFF");
    return { dessus: y };
  };
  D.tableProc.essais = [{}];

  /* ───────── D.bureauGreffe — bureau de la greffière (MONDE) : x 700–860, dessus y 1090 ; petit écran x 800–850, y 1030–1090
   * (vu de trois quarts arrière : elle le regarde) ; clavier x 738–814, y 1080–1090.
   * o = { partie: "tout" | "meuble" (bureau + écran, sans clavier) | "clavier" }. Ordre conseillé : GRE → meuble → clavier →
   * mains de GRE (Persona only: "handL" / "handR") : ses mains tapent SUR le clavier (reachL / reachR vers (760, 1085), (790, 1085)). */
  D.bureauGreffe = (g, o) => {
    o = Object.assign({ x0: 700, x1: 860, dessus: 1090, bas: 1230, partie: "tout", seed: 1211 }, o);
    const C = ctx(g, o.seed), a = o.x0, b = o.x1, y = o.dessus;
    const clavier = () => {
      U.shape(C, "clav", `M740 ${y - 10} L812 ${y - 10} L816 ${y} L736 ${y} Z`, MAT.grey, { sw: 2.2, r: 0.3 });
      ln(g, `M746 ${y - 5} L806 ${y - 5}`, 2, "#77776F", { "stroke-dasharray": "4 3" });
    };
    if (o.partie !== "clavier") {
      // petit écran (dos / trois quarts) + pied
      U.shape(C, "ecr", `M800 1030 L850 1036 L850 1080 L800 1078 Z`, MAT.mid, { sw: 2.4 });
      ln(g, "M806 1040 L844 1044", 1.2, "#FFFFFF");
      el("path", { d: rr(818, 1078, 14, 10, 2), fill: "#B9B9B3", stroke: INK, "stroke-width": 1.6 }, g);
      el("ellipse", { cx: 825, cy: y - 1, rx: 18, ry: 3, fill: "#B9B9B3", stroke: INK, "stroke-width": 1.6 }, g);
      [a + 14, b - 14].forEach((x, i) => U.shape(C, "pied" + i, rr(x - 6, o.bas - 6, 12, 26, 2), MAT.mid, { sw: 2 }));
      ombre(g, rr(a, y, b - a, o.bas - y, 2), 6, 6);
      U.shape(C, "face", rr(a, y + 6, b - a, o.bas - y - 6, 2), MAT.light, { sw: 2.8, r: 0.5 });
      el("path", { d: rr(b - 70, y + 22, 56, 30, 4), fill: "#F4F3EE", stroke: INK, "stroke-width": 1.8 }, g);
      ln(g, `M${b - 52} ${y + 38} L${b - 32} ${y + 38}`, 3, ACIER);
      U.shape(C, "chant", rr(a - 8, y - 3, b - a + 16, 14, 3), MAT.grey, { sw: 2.6 });
      ln(g, `M${a} ${y + 1} L${b} ${y + 1}`, 1.2, "#FFFFFF");
    }
    if (o.partie !== "meuble") clavier();
    return { dessus: y, clavier: [776, y - 5] };
  };
  D.bureauGreffe.essais = [{}, { partie: "clavier" }];

  /* ───────── D.tableDefense — le bord de NOTRE table (MONDE) : plateau en légère plongée, bord arrière à y 1300 (x 240–840),
   * il sort par le bas du cadre (les côtés s'écartent : x 180–900 à y 1470). La caméra est assise derrière. */
  D.tableDefense = (g, o) => {
    o = Object.assign({ x0: 240, x1: 840, arriere: 1300, bas: 1470, seed: 1221 }, o);
    const C = ctx(g, o.seed), a = o.x0, b = o.x1, y = o.arriere, B = o.bas;
    el("path", { d: `M${a} ${y} L${b} ${y} L${b + 4} ${y + 10} L${a - 4} ${y + 10} Z`, fill: "rgba(28,26,28,.12)" }, g);
    U.shape(C, "plateau", `M${a} ${y} L${b} ${y} L${b + 60} ${B} L${a - 60} ${B} Z`, MAT.wood, { sw: 3, r: 0.5 });
    ln(g, `M${a + 40} ${y + 40} C${a + 200} ${y + 34} ${b - 220} ${y + 46} ${b - 30} ${y + 38} M${a + 10} ${y + 110} C${a + 220} ${y + 104} ${b - 160} ${y + 116} ${b + 20} ${y + 108}`, 1.3, "#BDBAAE");
    ln(g, `M${a} ${y} L${b} ${y}`, 3.4, INK);
    ln(g, `M${a + 6} ${y + 5} L${b - 6} ${y + 5}`, 1.2, "#FFFFFF");
    return { arriere: y };
  };
  D.tableDefense.essais = [{}];

  /* ───────── D.platzschild — chevalet de table en tôle émaillée (même émail que D.plaque email) ─────────
   * o = { text: "Verteidiger", picto: false (true : le pictogramme sans visage, D.silhouette r 20 sans cadre, à gauche du mot),
   *       w: 230, h: 64, size: 26, bascule: degrés (> 0 : la plaque bascule vers l'avant, elle « accuse le coup ») }
   * Ancrage = milieu du PIED (S19 : (385, 1300) et (695, 1300)) ; plaque de y −68 à −4, inclinée de 12° vers l'arrière
   * (on voit la tranche du dessus). */
  D.platzschild = (g, o) => {
    o = Object.assign({ text: "Verteidiger", picto: false, w: 230, h: 64, size: 26, bascule: 0, seed: 1231 }, o);
    const w = o.w, h = o.h, b = o.bascule || 0, C = ctx(g, o.seed + o.text.length);
    el("ellipse", { cx: 6, cy: 1, rx: w / 2 + 4, ry: 5, fill: "rgba(28,26,28,.18)" }, g);
    el("path", { d: rr(-w / 2 + 12, -6, w - 24, 6, 2), fill: ACIER, stroke: INK, "stroke-width": 1.8 }, g);
    const sq = clamp(1 - 0.024 * b, 0.72, 1.06), p = el("g", { transform: `rotate(${f(0.35 * b)} 0 -4) translate(0 -4) scale(1 ${f(sq)}) translate(0 4)` }, g);
    const tr = clamp(6 * (12 - b) / 12, 0, 9);
    if (tr > 0.5) el("path", { d: rr(-w / 2 + 3, f(-h - 4 - tr), w - 6, f(tr + 3), 2), fill: "#CFCFCA", stroke: INK, "stroke-width": 1.6 }, p);
    ombre(p, rr(-w / 2, -h - 4, w, h, 8), 4, 5);
    U.shape(C.sub(p), "pl", rr(-w / 2, -h - 4, w, h, 8), MAT.white, { sw: 2.8, r: 0.5 });
    ln(p, rr(-w / 2 + 6, -h + 2, w - 12, h - 12, 5), 1.4, INK);
    const tw = lw(o.text, o.size), pw = o.picto ? 34 : 0, x0 = -(tw + pw) / 2, yc = -4 - h / 2;
    if (o.picto) D.silhouette(el("g", { transform: `translate(${f(x0 + 13)} ${f(yc - 1)})` }, p), { r: 20, cadre: "aucun" });
    txt(p, o.text, f(x0 + pw + tw / 2), f(yc + o.size * 0.34), o.size, {});
    return { haut: [0, -h - 4] };
  };
  D.platzschild.essais = [{}, { text: "Angeklagter", picto: true }, { text: "Angeklagter", picto: true, bascule: 7 }];

  /* ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
   * F5. LE REBORD (S20, S21, S23) ET LES FEUILLES
   * ═════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

  /* ───────── D.rebord — tablette de pierre sur deux consoles ─────────
   * o = { w: 460, h: 24, consoles: [x, x] (défaut : ±(w/2 − 26)) } · ancrage = milieu du bord HAUT (les lettres s'y posent ;
   * les étiquettes pendent du dessous, y = h). Consoles hautes de 40 (de y h à h + 41), larges de 38 en haut.
   * S20 : w 460 en (530, 800) · S21 : w 300 en (540, 830) · S23 : w 580 en (540, 900) avec consoles: [−180, 180] (l'étiquette
   * pend en x 265, au bout gauche). Renvoie { bas: h, consoles }. */
  D.rebord = (g, o) => {
    o = Object.assign({ w: 460, h: 24, consoles: null, seed: 1241 }, o);
    const w = o.w, h = o.h, a = w / 2, C = ctx(g, o.seed + Math.round(w)), cons = o.consoles || [-(a - 26), a - 26];
    cons.forEach((x, i) => {
      // console de pierre vue de face : tailloir (y h…h+8), corps en S qui s'amincit, volute en bas
      const d = `M${x - 19} ${h - 2} L${x + 19} ${h - 2} L${x + 19} ${h + 8} L${x + 15} ${h + 8} C${x + 16} ${h + 20} ${x + 8} ${h + 22} ${x + 10} ${h + 32} C${x + 11} ${h + 41} ${x - 11} ${h + 41} ${x - 10} ${h + 32} C${x - 8} ${h + 22} ${x - 16} ${h + 20} ${x - 15} ${h + 8} L${x - 19} ${h + 8} Z`;
      ombre(g, d, 5, 4);
      U.shape(C, "cons" + i, d, MAT.pierre, { sw: 2.6, r: 0.4 });
      ln(g, `M${x - 15} ${h + 8} L${x + 15} ${h + 8}`, 1.6, "#77776F");
      el("circle", { cx: x, cy: h + 31, r: 5, fill: "none", stroke: "#77776F", "stroke-width": 1.5 }, g);
      ln(g, `M${x - 5} ${h + 14} C${x - 7} ${h + 20} ${x - 3} ${h + 24} ${x - 4} ${h + 27}`, 1.2, "#FFFFFF");
    });
    ombre(g, rr(-a, 0, w, h, 3), 6, 7);
    U.shape(C, "dessus", `M${-a + 6} -8 L${a - 6} -8 L${a} 0 L${-a} 0 Z`, { base: "#F4F2EC" }, { sw: 2.2, r: 0.4 });
    U.shape(C, "face", rr(-a, 0, w, h, 3), MAT.pierre, { sw: 2.8, r: 0.5 });
    ln(g, `M${-a + 8} 5 L${a - 8} 5`, 1.3, "#FFFFFF");
    ln(g, `M${f(-a * 0.5)} ${h - 6} l20 -3 M${f(a * 0.4)} 9 l16 4`, 1.2, "#B9B6AA");
    return { bas: h, consoles: cons };
  };
  D.rebord.essais = [{}, { w: 300 }, { w: 580, consoles: [-180, 180] }];

  /* ───────── D.feuille — feuille générique ─────────
   * o = { w: 230, h: 280, t: "" (titre Kalam st: 40), sub: "" (ss: 22), grib: true (lignes de gribouillis sous les titres),
   *       fleche: 0…1 (une flèche d'encre de 8 px pousse du bord haut vers le HAUT, longueur fl: 75),
   *       ecrit: null | 0…1 (lignes manuscrites qui s'écrivent ; n lignes : lignes: 5), coin: 0…1 (le coin bas-droit se soulève), gris: 0…1 }
   * Ancrage = centre. S21 : 230 × 280 « Berufung » + « Angeklagter » / « Staatsanwaltschaft » (flèche jusqu'à y monde 585) ·
   * S19 : la feuille de RIC, D.feuille({ w: 90, h: 120 }) · S27 : 300 × 460 avec ecrit. Renvoie { haut: [0, −h/2], pointe: [0, −h/2 − fl] }. */
  D.feuille = (g, o) => {
    o = Object.assign({ w: 230, h: 280, t: "", sub: "", st: 40, ss: 22, grib: true, fleche: 0, fl: 75, ecrit: null, lignes: 5, coin: 0, gris: 0, seed: 1251 }, o);
    const w = o.w, h = o.h, x0 = -w / 2, y0 = -h / 2, gz = clamp(o.gris, 0, 1), C = ctx(g, o.seed + Math.round(w * 3 + h));
    const pap = mix("#FFFFFF", "#E9E9E4", gz), enc = mix(INK, "#9A9A94", gz), K = Math.min(w, h) * 0.14 * clamp(o.coin, 0, 1);
    const feuille = K > 1.5 ? `M${x0} ${y0} L${-x0} ${y0} L${-x0} ${f(-y0 - K)} L${f(-x0 - K)} ${-y0} L${x0} ${-y0} Z` : rr(x0, y0, w, h, 3);
    ombre(g, rr(x0, y0, w, h, 3), w < 120 ? 3 : 6, w < 120 ? 4 : 8);
    U.shape(C, "f", feuille, { base: pap }, { sw: w < 120 ? 2 : 2.6, stroke: enc, r: 0.4 });
    let y = y0 + 18;
    if (o.t) { const s = fit(o.t, o.st, w - 30); y = y0 + 22 + s * 0.8; txt(g, o.t, 0, f(y), s, { fill: enc }); y += 8; }
    if (o.sub) { const s = fit(o.sub, o.ss, w - 26); y += s * 0.9; txt(g, o.sub, 0, f(y), s, { fill: mix("#3A3A37", "#9A9A94", gz) }); y += 6; }
    if (o.t) { ln(g, `M${f(-w * 0.3)} ${f(y + 6)} L${f(w * 0.3)} ${f(y + 6)}`, 1.6, mix("#77776F", "#B9B9B2", gz)); y += 16; }
    const marge = w < 120 ? 10 : 22, pas = w < 120 ? 13 : 22;
    if (o.ecrit == null && o.grib) {
      for (let i = 0; y + pas * i < -y0 - (w < 120 ? 12 : 26); i++) grib(g, x0 + marge, f(y + 10 + pas * i), w - 2 * marge - (i % 3) * w * 0.12, { seed: 71 + i, sw: w < 120 ? 1.4 : 2, col: mix(GRIB, "#D2D2CC", gz) });
    }
    if (o.ecrit != null) {
      const n = o.lignes, e = clamp(o.ecrit, 0, 1) * n, R = rng(o.seed + 5);
      for (let i = 0; i < n; i++) {
        const p = clamp(e - i, 0, 1), yy = y + 22 + i * 34, L = (w - 2 * marge) * (i === n - 1 ? 0.6 : 0.94), xa = x0 + marge;
        let d = "", x = xa;
        while (x < xa + L - 12) {                                        // un mot = une suite de petites arches (lettres liées)
          const Lm = Math.min(xa + L - x, 22 + R() * 40); d += `M${f(x)} ${f(yy)}`;
          for (let u = 0; u < Lm - 4; u += 6 + R() * 3) { const hh = R() < 0.18 ? 13 + R() * 5 : 6 + R() * 3; d += ` c2 ${f(-hh)} 5 ${f(-hh)} ${f(6)} ${f(R() * 1.5 - 0.5)}`; }
          x += Lm + 9 + R() * 6;
        }
        if (p <= 0) continue;
        const cg = clipG(g, `M${f(xa - 4)} ${f(yy - 26)} L${f(xa + (L + 8) * p)} ${f(yy - 26)} L${f(xa + (L + 8) * p)} ${f(yy + 8)} L${f(xa - 4)} ${f(yy + 8)} Z`);
        ln(cg, d, 2.2, enc);
      }
    }
    if (K > 1.5) el("path", { d: `M${-x0} ${f(-y0 - K)} L${f(-x0 - K)} ${-y0} L${f(-x0 - K * 0.86)} ${f(-y0 - K * 0.86)} Z`, fill: mix("#E6E6E0", "#DCDCD6", gz), stroke: enc, "stroke-width": 1.8, "stroke-linejoin": "round" }, g);
    if (o.fleche > 0.02) {
      const L = o.fl * clamp(o.fleche, 0, 1), yt = y0 - L;
      ln(g, `M0 ${f(y0 + 2)} L0 ${f(yt + Math.min(L, 22) * 0.7)}`, 8, INK, { "stroke-linecap": "butt" });
      if (L > 14) el("path", { d: `M0 ${f(yt - 4)} L-17 ${f(yt + 20)} L17 ${f(yt + 20)} Z`, fill: INK, stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, g);
    }
    return { haut: [0, y0], pointe: [0, f(y0 - o.fl)] };
  };
  D.feuille.essais = [{ t: "Berufung", sub: "Angeklagter", fleche: 1 }, { t: "Berufung", sub: "Staatsanwaltschaft", fleche: 0.5, coin: 0.7 }, { w: 90, h: 120 },
    { w: 300, h: 460, ecrit: 0.55 }];

  /* ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
   * F6. LE CHARIOT À DOSSIERS (S22) — la plage sobre : le petit dossier entre dans le gros (rien de l'autre procès)
   * ═════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

  /* ───────── D.chariot — chariot à dossiers : deux tablettes, poignée à gauche, quatre roulettes ; cinq dos VIERGES en haut,
   * trois boîtes en bas ─────────
   * o = { w: 680, roues: true, onglets: true, roule: degrés (pivot des roulettes), partie: "tout" | "roue" (une roulette : sa
   *       chape tourne de roule autour de (0, −34)) | "onglet" (un onglet de papier pendu à (0, 0) : m.sway 3°) }
   * Ancrage = milieu du SOL (S22 : (525, 1390) → x 185–865). Tablette du haut : dessus à y −270 (monde 1120 : D.ordner s'y pose en
   * x monde 600) ; tablette du bas : dessus à y −50. Dos x −305…−155 (y −460…−270).
   * Renvoie { haut: −270, basT: −50, roues: [[x, 0], …] (les deux de devant), onglets: [[x, y], …] (accroches sous la tablette du haut) }. */
  D.chariot = (g, o) => {
    o = Object.assign({ w: 680, roues: true, onglets: true, roule: 0, partie: "tout", seed: 1261 }, o);
    const w = o.w, a = w / 2, C = ctx(g, o.seed);
    const roue = (gg, x, y, ang, k, key) => {
      const b = el("g", { transform: `translate(${x} ${y}) rotate(${f(ang || 0)} 0 -34) scale(${k})` }, gg), Cb = C.sub(b);
      U.shape(Cb, "chape" + key, "M-9 -38 L9 -38 L12 -16 L-12 -16 Z", { base: "#B9B9B3" }, { sw: 2, r: 0.3 });
      el("circle", { cx: 0, cy: -16, r: 16, fill: "#3A3A37", stroke: INK, "stroke-width": 2.2 }, b);
      el("circle", { cx: 0, cy: -16, r: 5, fill: ACIER, stroke: INK, "stroke-width": 1.4 }, b);
      ln(b, "M-10 -26 A13 13 0 0 1 4 -29", 1.6, "#77776F");
    };
    const onglet = (gg, x, y, i) => {
      ln(gg, `M${x} ${y} L${x} ${y + 12}`, 1.6, INK);
      el("path", { d: rr(x - 13, y + 12, 26, 34, 3), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8, transform: `rotate(${(i % 2 ? 4 : -3)} ${x} ${y})` }, gg);
      grib(gg, x - 8, y + 24, 16, { n: 2, pas: 8, seed: 81 + i, sw: 1.3 });
    };
    if (o.partie === "roue") { roue(g, 0, 0, o.roule, 1, "r"); return {}; }
    if (o.partie === "onglet") { onglet(g, 0, 0, 0); return {}; }
    const yH = -270, yB = -50, xs = [-a + 22, a - 22];
    el("ellipse", { cx: 10, cy: 2, rx: a + 10, ry: 9, fill: "rgba(28,26,28,.16)" }, g);
    // roulettes de derrière (plus petites, plus pâles)
    if (o.roues) [-a + 58, a - 58].forEach((x, i) => roue(el("g", { opacity: 0.75 }, g), x, -8, -o.roule, 0.82, "b" + i));
    // montants (tubes d'acier) + poignée à gauche
    xs.forEach((x) => tube(g, `M${x} -34 L${x} ${yH - 10}`, 9, ACIER, "#FFFFFF"));
    tube(g, `M${xs[0]} ${yH - 10} L${xs[0]} -398 C${xs[0]} -414 ${xs[0] - 10} -420 ${xs[0] - 24} -420`, 9, ACIER, "#FFFFFF");
    el("path", { d: rr(xs[0] - 44, -428, 30, 16, 8), fill: "#4A4A46", stroke: INK, "stroke-width": 2.2 }, g);   // poignée caoutchouc
    ln(g, `M${xs[0] - 38} -424 L${xs[0] - 22} -424`, 1.3, "#9A9A94");
    // cinq dos de dossiers VIERGES (sur la tablette du haut, à gauche)
    for (let i = 0; i < 5; i++) {
      const x = -a + 35 + i * 30, mat = i % 2 ? MAT.grey : MAT.light, lean = i === 4 ? 4 : 0;
      const b = el("g", { transform: `rotate(${lean} ${x + 28} ${yH})` }, g), Cb = C.sub(b);
      U.shape(Cb, "dos" + i, rr(x, yH - 190, 28, 190, 3), mat, { sw: 2.4, r: 0.4 });
      el("path", { d: rr(x + 6, yH - 168, 16, 52, 2), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.4 }, b);
      el("circle", { cx: x + 14, cy: yH - 34, r: 6, fill: "#3A3A37", stroke: INK, "stroke-width": 1.4 }, b);
    }
    // tablettes
    [yH, yB].forEach((y, i) => {
      el("path", { d: rr(-a + 8, y + 8, w - 16, 8, 2), fill: "rgba(28,26,28,.14)" }, g);
      U.shape(C, "tab" + i, rr(-a + 6, y, w - 12, 14, 3), MAT.mid, { sw: 2.6 });
      ln(g, `M${-a + 14} ${y + 4} L${a - 14} ${y + 4}`, 1.2, "#FFFFFF");
    });
    // trois boîtes d'archive (sans un mot) sur la tablette du bas
    [[-300, -110], [-95, 95], [110, 300]].forEach(([x0, x1], i) => {
      const y0 = yB - 150;
      ombre(g, rr(x0, y0, x1 - x0, 150, 3), 5, 3);
      U.shape(C, "boite" + i, rr(x0, y0, x1 - x0, 150, 3), MAT.light, { sw: 2.6, r: 0.5 });
      el("path", { d: rr((x0 + x1) / 2 - 36, y0 + 26, 72, 34, 3), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g);
      el("path", { d: rr((x0 + x1) / 2 - 24, y0 + 104, 48, 14, 7), fill: "#3A3A37" }, g);
      ln(g, `M${x0 + 6} ${y0 + 12} L${x1 - 6} ${y0 + 12}`, 1.2, "#BDBDB6");
    });
    // traverse basse + roulettes de devant
    tube(g, `M${xs[0]} -34 L${xs[1]} -34`, 7, ACIER);
    const rx = [-a + 34, a - 34];
    if (o.roues) rx.forEach((x, i) => roue(g, x, 0, o.roule, 1, "f" + i));
    // onglets pendus sous la tablette du haut
    const og = [[-250, yH + 14], [-10, yH + 14], [230, yH + 14]];
    if (o.onglets) og.forEach(([x, y], i) => onglet(g, x, y, i));
    return { haut: yH, basT: yB, roues: rx.map((x) => [x, 0]), onglets: og };
  };
  D.chariot.essais = [{}, { partie: "roue", roule: 5 }, { partie: "onglet" }];

  /* ───────── D.ordner — le gros dossier FERMÉ de l'autre procès : boîte d'archive debout, carton MAT.mid,
   * étiquette rectangulaire VIDE (200 × 80, sans un mot), sangle à boucle, couvercle qui s'entrouvre ─────────
   * o = { w: 360, h: 420, ouvre: 0…8 (degrés : le couvercle se soulève, une fente sombre apparaît), sangle: 0…1 (0 : lâche, le bout
   *       pend ; 1 : serrée) } · ancrage = centre du bas (S22 : (600, 1120) → x 420–780, y 700–1120).
   * Jamais un titre, un numéro ni une image dessus. Renvoie { fente: y du haut du corps (où la chemise entre), etiquette }. */
  D.ordner = (g, o) => {
    o = Object.assign({ w: 360, h: 420, ouvre: 0, sangle: 1, seed: 1271 }, o);
    const w = o.w, h = o.h, a = w / 2, C = ctx(g, o.seed), yc = -h + 40, gap = clamp(o.ouvre, 0, 10) * 3, sg = clamp(o.sangle, 0, 1);
    ombre(g, rr(-a, yc, w, h - 40, 4), 8, 8);
    U.shape(C, "corps", rr(-a, yc, w, h - 40, 4), MAT.mid, { sw: 3, r: 0.5 });
    ln(g, `M${-a + 14} ${yc + 8} L${-a + 14} -8 M${a - 14} ${yc + 8} L${a - 14} -8`, 1.4, "#55524B");
    [[-a, 0, 1, -1], [a, 0, -1, -1]].forEach(([x, y, sx, sy]) => el("path", { d: `M${x} ${y + sy * 26} L${x} ${y} L${x + sx * 26} ${y} L${x + sx * 26} ${y + sy * 6} L${x + sx * 6} ${y + sy * 6} L${x + sx * 6} ${y + sy * 26} Z`, fill: ACIER, stroke: INK, "stroke-width": 1.6 }, g));
    el("path", { d: rr(-34, -64, 68, 20, 10), fill: "#2E2E2B", stroke: INK, "stroke-width": 1.6 }, g);
    // étiquette VIDE
    el("path", { d: rr(-100, -h + 100, 200, 80, 6), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, g);
    ln(g, rr(-92, -h + 108, 184, 64, 4), 1, "#E1E1DC");
    // sangle + boucle
    const ys = -186, s = 14 * (1 - sg);
    el("path", { d: `M${-a - 4} ${ys - 11} Q0 ${f(ys - 11 + s)} ${a + 4} ${ys - 11} L${a + 4} ${ys + 11} Q0 ${f(ys + 11 + s)} ${-a - 4} ${ys + 11} Z`, fill: "#4A4A46", stroke: INK, "stroke-width": 2.2 }, g);
    ln(g, `M${-a} ${ys - 6} Q0 ${f(ys - 6 + s)} ${a} ${ys - 6} M${-a} ${ys + 6} Q0 ${f(ys + 6 + s)} ${a} ${ys + 6}`, 1, "#9A9A94", { "stroke-dasharray": "4 4" });
    const yb = ys + s * 0.5;
    el("path", { d: rr(-22, f(yb - 18), 44, 36, 6), fill: ACIER, stroke: INK, "stroke-width": 2.4 }, g);
    el("path", { d: rr(-13, f(yb - 9), 26, 18, 3), fill: "#4A4A46", stroke: INK, "stroke-width": 1.6 }, g);
    ln(g, `M0 ${f(yb - 9)} L0 ${f(yb + 9)}`, 2.4, "#CFCFCA");
    const tail = 14 + 70 * (1 - sg);
    ln(g, `M22 ${f(yb)} C${f(30 + 10 * sg)} ${f(yb + 4)} ${f(34 + 20 * sg)} ${f(yb + tail * 0.5)} ${f(30 + 24 * sg)} ${f(yb + tail * (1 - sg) + 2)}`, 16, INK);
    ln(g, `M22 ${f(yb)} C${f(30 + 10 * sg)} ${f(yb + 4)} ${f(34 + 20 * sg)} ${f(yb + tail * 0.5)} ${f(30 + 24 * sg)} ${f(yb + tail * (1 - sg) + 2)}`, 12, "#4A4A46");
    // couvercle (et la fente qui s'ouvre dessous)
    if (gap > 0.5) el("path", { d: rr(-a + 4, f(yc - gap - 2), w - 8, f(gap + 6), 2), fill: "#2E2E2B" }, g);
    ombre(g, rr(-a - 6, f(-h - gap), w + 12, 46, 5), 4, 5);
    U.shape(C, "couv", rr(-a - 6, f(-h - gap), w + 12, 46, 5), MAT.grey, { sw: 3, r: 0.5 });
    ln(g, `M${-a + 4} ${f(-h - gap + 7)} L${a - 4} ${f(-h - gap + 7)}`, 1.3, "#FFFFFF");
    return { fente: yc, etiquette: [0, -h + 140] };
  };
  D.ordner.essais = [{}, { ouvre: 8, sangle: 0 }];

  /* ───────── D.chemise — la chemise mince du dossier « titre » : onglet, trois mini-lettres de laiton « D r . » (h 28),
   * mini-étiquette « 15.000 € » grisée et tamponnée « nicht rechtskräftig », « 119 Cs 426/19 » (16 px) ─────────
   * 200 × 260 (MAT.light) · ancrage = centre · elle glisse (move) derrière le gros dossier. */
  D.chemise = (g, o) => {
    o = Object.assign({ seed: 1281 }, o);
    const C = ctx(g, o.seed), w = 200, h = 260, x0 = -w / 2, y0 = -h / 2;
    U.shape(C, "onglet", rr(x0 + 12, y0 - 20, 74, 28, 7), MAT.light, { sw: 2.4 });
    el("path", { d: rr(x0 + 8, y0 + 5, w, h - 10, 2), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
    ombre(g, rr(x0, y0, w, h, 6), 6, 8);
    U.shape(C, "couv", rr(x0, y0, w, h, 6), MAT.light, { sw: 2.8, r: 0.5 });
    ln(g, `M${x0 + 14} ${y0 + 6} L${x0 + 14} ${-y0 - 6}`, 1.4, "#ABABA4");
    D.motDr(el("g", { transform: `translate(${x0 + 26} ${y0 + 82})` }, g), { h: 28 });
    el("circle", { cx: 52, cy: y0 + 52, r: 4.5, fill: ACIER, stroke: INK, "stroke-width": 1.6 }, g);
    D.etiquette(el("g", { transform: `translate(52 ${y0 + 52})` }, g), { w: 84, h: 46, L: 24, l1: "15.000 €", s1: 18, l2: "", gris: 1, rot: 5 });
    D.empreinte(el("g", { transform: `translate(0 ${y0 + 150})` }, g), { text: "nicht rechtskräftig", w: 160, h: 32, size: 15, rot: -6, fond: "#F0F0EB" });
    grib(g, x0 + 30, y0 + 196, 140, { n: 2, pas: 13, seed: 91, sw: 1.8 });
    txt(g, "119 Cs 426/19", 0, -y0 - 22, 16, { fill: "#3A3A37" });
    return { w, h };
  };
  D.chemise.essais = [{}];
  }   // fin de init()
})();
