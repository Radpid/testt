/* decor-3.js — AKTE 08 « جوج حروف » (Düsseldorf) — décors et objets PROPRES à l'épisode, 3e partie (S24 à S29 : la règle).
 * Mêmes conventions, mêmes matières et mêmes aides que decor.js (D.util). Liste d'état : en tête de decor.js.
 * Essai : node tools/essai_decor.mjs videos/akte-duesseldorf-titel --only potence,chaine,socle … --cols 3 --cell 500
 *
 * CONTENU
 *   S24 (la potence)       : D.potence · D.chaine (aussi S25) · D.socle · D.loi (aussi S25 ; dans le HUD en S24)
 *   S25 (l'enseigne)       : D.different
 *   S27 (l'écritoire)      : D.ecritoire · D.fente (hors inventaire : le storyboard les demande dans la scène, pas dans l'inventaire)
 *   S28 (ta boîte)         : D.fleche · D.journal (hors inventaire : « son journal roulé frémit »)
 *   S29 (ta porte)         : D.porteBureau · D.corbeille
 * Les textes gravés ou posés (socle, plaques, gloses) restent des nœuds de story.js : les dessins renvoient leurs places dans out.
 */
(function () {
  "use strict";
  const D = window.EpDecor = window.EpDecor || {};
  // D.util vient de decor.js : si ce fichier est chargé avant lui (essai_decor.mjs trie par nom), il attend dans D._apres.
  if (D.util) init(); else (D._apres = D._apres || []).push(init);
  function init() {
  const SC = window.SketchCast, U = SC.util;
  const { MAT, INK, OMBRE, GRIB, ACIER, el, f, rad, clamp, rr, rng, ln, ombre, ellipse, txt, visTete } = D.util;
  let _uid = 0; const uid = (p) => "ep08c" + p + (++_uid);                       // identifiants de clipPath (jamais deux fois le même)
  const ctx = (g, seed) => U.ctx(g, seed, false, 1);
  const clipG = (g, d) => { const id = uid("c"); el("path", { d }, el("clipPath", { id }, g)); return el("g", { "clip-path": `url(#${id})` }, g); };
  // largeur d'un texte Kalam 700, un peu large exprès (mesurée dans le navigateur : « … » ≈ 0,64 em, espace ≈ 0,3 em, lettres 0,43 à 0,52 em)
  const larg = (t, s) => [...String(t)].reduce((a, ch) => a + (ch === "…" ? 0.66 : ch === " " ? 0.3 : 0.5), 0) * s;
  const fit = (t, s, w) => f(Math.min(s, s * w / Math.max(1, larg(t, s))));             // corps Kalam qui tient dans w
  // fer forgé : tube d'encre + âme gris foncé + reflet
  const FER = "#5E5E58", FER2 = "#8A8A84";
  const fer = (g, d, w) => { ln(g, d, w + 3.4, INK); ln(g, d, w, FER); ln(g, d, Math.max(1, w * 0.24), FER2, { opacity: 0.9 }); };
  const MAT_FER = { base: "#6A6A64", hatch: "#2E2E2B", gap: 4.6, fw: 1.2 };

  /* ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
   * G. LA RÈGLE (S24 à S28)
   * ═════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

  /* ───────── D.potence — barre porte-enseignes en fer : tringle de 740 px, deux consoles murales à volutes, quatre anneaux ─────────
   * o = { L: 740, anneaux: [−260, −100, 100, 260], consoles: [−330, 330] }
   * Ancrage = centre de la tringle (S24 : (540, 600) → x 170–910 ; platines de y 566 à 674 : rien au-dessus de y 566, la carte
   * « Gesetz » du HUD reste sur du mur nu). Les chaînes partent du BAS des anneaux : out.anneaux = [[x, 15], …].
   * Renvoie { anneaux, bouts: [−L/2, L/2] }. */
  D.potence = (g, o) => {
    o = Object.assign({ L: 740, anneaux: [-260, -100, 100, 260], consoles: [-330, 330], seed: 1301 }, o);
    const a = o.L / 2, C = ctx(g, o.seed);
    // ombres portées sur le mur (tringle + consoles)
    ln(g, `M${-a + 6} 9 L${a - 4} 9`, 12, OMBRE);
    o.consoles.forEach((x) => el("path", { d: rr(x - 13 + 6, -34 + 8, 26, 108, 6), fill: OMBRE }, g));
    // consoles : platine murale + volute sous la tringle (fer forgé)
    o.consoles.forEach((x, i) => {
      const s = x < 0 ? 1 : -1, X = (v) => f(x + s * v);                                   // s : vers l'intérieur
      fer(g, `M${X(0)} 60 C${X(34)} 62 ${X(66)} 46 ${X(72)} 9`, 6);                      // bras en S
      fer(g, `M${X(0)} 30 C${X(20)} 28 ${X(34)} 38 ${X(30)} 48 C${X(27)} 56 ${X(17)} 55 ${X(18)} 47`, 4.4);   // petite volute
      fer(g, `M${X(72)} 9 C${X(80)} 22 ${X(96)} 22 ${X(98)} 12`, 3.6);                    // enroulement sous la tringle
      U.shape(C, "pl" + i, rr(x - 13, -34, 26, 108, 6), MAT_FER, { sw: 2.6, r: 0.5 });
      ln(g, `M${f(x - 7)} -26 L${f(x - 7)} 64`, 1.3, FER2);
      visTete(g, x, -20, 5, 30 + i * 40, { ombre: false }); visTete(g, x, 60, 5, -20 + i * 30, { ombre: false });
    });
    // tringle + embouts boules
    const d = `M${-a + 10} 0 L${a - 10} 0`;
    ln(g, d, 17, INK); ln(g, d, 12, FER); ln(g, `M${-a + 14} -3 L${a - 14} -3`, 2.4, FER2);
    [-a + 6, a - 6].forEach((x, i) => {
      el("circle", { cx: x, cy: 0, r: 13, fill: FER, stroke: INK, "stroke-width": 3 }, g);
      ln(g, `M${f(x - 7)} -4 A8 8 0 0 1 ${f(x - 1)} -9`, 2, FER2);
      el("path", { d: rr(x + (i ? -22 : 14), -10, 8, 20, 2), fill: FER, stroke: INK, "stroke-width": 2 }, g);   // bague
    });
    // anneaux (autour de la tringle)
    const anneaux = o.anneaux.map((x) => {
      el("ellipse", { cx: x, cy: 2, rx: 8.5, ry: 13, fill: "none", stroke: INK, "stroke-width": 3.6 }, g);
      el("ellipse", { cx: x, cy: 2, rx: 8.5, ry: 13, fill: "none", stroke: FER2, "stroke-width": 1.2 }, g);
      ln(g, `M${x - 6} -6 L${x + 6} -6`, 3, FER);       // la tringle repasse devant le haut de l'anneau
      return [x, 15];
    });
    return { anneaux, bouts: [-a, a] };
  };
  D.potence.essais = [{}];

  /* ───────── D.chaine — chaîne à maillons (ovales 8 × 12 alternés de face et de chant), de (x0, y0) à (x1, y1) ─────────
   * o = { x0, y0, x1, y1, pas: 10 } — coordonnées MONDE : poser en (0, 0) (ou dans le groupe de la plaque qu'elle porte).
   * Renvoie { n } (nombre de maillons). */
  D.chaine = (g, o) => {
    o = Object.assign({ x0: 0, y0: 0, x1: 20, y1: 130, pas: 10 }, o);
    const dx = o.x1 - o.x0, dy = o.y1 - o.y0, L = Math.hypot(dx, dy), n = Math.max(2, Math.round(L / o.pas));
    const ang = Math.atan2(dy, dx) * 180 / Math.PI - 90;
    const b = el("g", { transform: `translate(${f(o.x0)} ${f(o.y0)}) rotate(${f(ang)})` }, g);
    let ombreD = "";
    for (let i = 0; i < n; i++) { const cy = (i + 0.5) * L / n; ombreD += i % 2 ? rr(-1.8, cy - 6.5, 3.6, 13, 1.8) : ellipse(0, cy, 4.2, 6.6); }
    el("path", { d: ombreD, fill: "none", stroke: "rgba(28,26,28,.2)", "stroke-width": 2.6, transform: "translate(3 4)" }, b);
    for (let i = 0; i < n; i++) {
      const cy = f((i + 0.5) * L / n);
      if (i % 2) { el("path", { d: rr(-1.8, cy - 6.5, 3.6, 13, 1.8), fill: ACIER, stroke: INK, "stroke-width": 1.5 }, b); }
      else {
        el("ellipse", { cx: 0, cy, rx: 4.2, ry: 6.6, fill: "none", stroke: INK, "stroke-width": 2.6 }, b);
        el("ellipse", { cx: 0, cy, rx: 4.2, ry: 6.6, fill: "none", stroke: ACIER, "stroke-width": 1 }, b);
      }
    }
    return { n };
  };
  D.chaine.essais = [{ x0: 0, y0: 0, x1: -25, y1: 95 }, { x0: 0, y0: 0, x1: 60, y1: 150 }];

  /* ───────── D.socle — socle de pierre à face gravée (S24) : dalle du dessus, corps, plinthe, panneau en creux ─────────
   * o = { w: 300, h: 180, rainure: true (une réglette de bois sur le dessus : le diplôme y tient debout), partie: "tout" | "levre"
   *       (la lèvre AVANT de la rainure seule, à poser APRÈS le diplôme : elle en cache le bas) }
   * Ancrage = centre du BAS (S24 : (530, 1390) → x 380–680, y 1210–1390). Le panneau en creux (x ±142, y −150…−36) reçoit les
   * textes de story.js (Kalam 20 à y −128, Kalam 18 à y −98, arabe 26 à y −50). Renvoie { face: { x, y, w, h }, dessus: −h, rainure: −h − 8 }. */
  D.socle = (g, o) => {
    o = Object.assign({ w: 300, h: 180, rainure: true, partie: "tout", seed: 1331 }, o);
    const a = o.w / 2, h = o.h, C = ctx(g, o.seed + Math.round(o.w)), out = { face: { x: -a + 8, y: -h + 30, w: o.w - 16, h: h - 66 }, dessus: -h, rainure: -h - 8 };
    const levre = (gg) => {
      el("path", { d: rr(-a + 14, -h - 9, o.w - 28, 11, 3), fill: "#D9D9D2", stroke: INK, "stroke-width": 2.2 }, gg);
      ln(gg, `M${-a + 20} ${-h - 6} L${a - 20} ${-h - 6}`, 1.2, "#FFFFFF");
    };
    if (o.partie === "levre") { levre(g); return out; }
    ombre(g, rr(-a - 10, -h, o.w + 20, h, 4), 8, 9);
    U.shape(C, "plinthe", rr(-a - 10, -18, o.w + 20, 18, 3), MAT.pierre, { sw: 2.8, r: 0.5 });
    U.shape(C, "corps", rr(-a, -h + 16, o.w, h - 34, 3), MAT.pierre, { sw: 2.8, r: 0.5 });
    U.shape(C, "dalle", rr(-a - 10, -h, o.w + 20, 18, 3), MAT.pierre, { sw: 2.8, r: 0.5 });
    ln(g, `M${-a - 4} ${-h + 4} L${a + 4} ${-h + 4}`, 1.3, "#FFFFFF");
    ln(g, `M${-a - 4} -14 L${a + 4} -14`, 1.3, "#FFFFFF");
    // panneau en creux : biseau sombre en haut à gauche, clair en bas à droite
    const F = out.face;
    el("path", { d: rr(F.x, F.y, F.w, F.h, 4), fill: "#F1EFE8" }, g);
    ln(g, `M${F.x} ${F.y + F.h} L${F.x} ${F.y} L${F.x + F.w} ${F.y}`, 2.2, "#8D8A80");
    ln(g, `M${F.x + F.w} ${F.y} L${F.x + F.w} ${F.y + F.h} L${F.x} ${F.y + F.h}`, 2.2, "#FFFFFF");
    ln(g, rr(F.x - 4, F.y - 4, F.w + 8, F.h + 8, 6), 1.2, "#B9B6AA");
    // petits éclats de la pierre (graine fixe)
    const R = rng(o.seed);
    let d = ""; for (let i = 0; i < 5; i++) { const x = -a + 8 + R() * (o.w - 16), y = i % 2 ? -h + 22 + R() * 6 : -26 + R() * 6; d += `M${f(x)} ${f(y)} l${f(6 + R() * 8)} ${f(R() * 3 - 1.5)}`; }
    ln(g, d, 1.2, "#B9B6AA");
    if (o.rainure) {   // réglette de bois : la lèvre ARRIÈRE (la lèvre avant est la partie "levre", posée après le diplôme)
      el("path", { d: rr(-a + 14, -h - 12, o.w - 28, 8, 3), fill: "#C9C9C1", stroke: INK, "stroke-width": 2 }, g);
      if (o.partie === "tout") levre(g);
    }
    return out;
  };
  D.socle.essais = [{}, { partie: "levre" }];

  /* ───────── D.loi — carte GRISE « Gesetz » : le texte de la LOI, montré comme un texte (S24 dans le HUD, S25 dans le monde) ─────────
   * o = { w: 560, h: 96, onglet: "Gesetz", par: "§ 132a StGB" (Kalam sPar 28), l1, l2 (Kalam s1, s2 : 20–22) }
   * L'onglet (blanc sur encre, Kalam 18) est DANS la carte, en haut, à gauche du paragraphe : rien ne dépasse au-dessus (en S24,
   * la ligne arabe de la plaquette REGEL est à 26 px de la carte). Les lignes sont centrées et réduites si elles ne tiennent pas.
   * Ancrage = centre. Renvoie { haut: −h/2, bas: h/2 }. */
  D.loi = (g, o) => {
    o = Object.assign({ w: 560, h: 96, onglet: "Gesetz", par: "§ 132a StGB", l1: "", l2: "", sPar: 28, s1: 20, s2: 20, seed: 1321 }, o);
    const w = o.w, h = o.h, x0 = -w / 2, y0 = -h / 2, C = ctx(g, o.seed + Math.round(w + h));
    ombre(g, rr(x0, y0, w, h, 12), 6, 8);
    U.shape(C, "carte", rr(x0, y0, w, h, 12), { base: "#E6E6E1", hatch: "#C8C8C2", gap: 7.5, fw: 1 }, { sw: 2.8, r: 0.5 });
    ln(g, rr(x0 + 6, y0 + 6, w - 12, h - 12, 8), 1.2, "#9A9A94");
    // rangée 1 : onglet + paragraphe, centrés ensemble
    const so = 18, ow = f(larg(o.onglet, so) + 22), sp = fit(o.par, o.sPar, w - ow - 60), tot = ow + 14 + larg(o.par, sp), xa = -tot / 2;
    const y1 = y0 + (o.l2 ? 34 : 36);
    el("path", { d: rr(xa, y1 - 22, ow, 28, 6), fill: INK }, g);
    txt(g, o.onglet, f(xa + ow / 2), f(y1 - 2), so, { fill: "#FFFFFF" });
    txt(g, o.par, f(xa + ow + 14), f(y1), sp, { anchor: "start" });
    // lignes
    if (o.l1) txt(g, o.l1, 0, f(o.l2 ? y0 + 72 : y0 + 74), fit(o.l1, o.s1, w - 36), { fill: "#2E2C28" });
    if (o.l2) txt(g, o.l2, 0, f(y0 + 102), fit(o.l2, o.s2, w - 36), { fill: "#2E2C28" });
    return { haut: f(y0), bas: f(-y0) };
  };
  D.loi.essais = [
    { w: 560, h: 96, par: "§ 132a StGB", l1: "Freiheitsstrafe bis zu einem Jahr oder Geldstrafe" },                                      // S24 (HUD)
    { w: 640, h: 120, onglet: "Gesetz · Landesrecht", par: "§ 69 HG NRW", l1: "„in der verliehenen Form unter Angabe", l2: "der verleihenden Institution“", s1: 22, s2: 22 },   // S25
  ];

  /* ───────── D.different — le signe « ≠ » en fer (S25) : deux barres 86 × 16 et une barre oblique 20 × 100 (20°), trois rivets ─────────
   * Ancrage = centre (S25 : (545, 1050) → x 500–590). Arrive par node.slam(…). Renvoie { w, h }. */
  D.different = (g, o) => {
    o = Object.assign({ seed: 1311 }, o);
    const C = ctx(g, o.seed), barres = [rr(-43, -26, 86, 16, 4), rr(-43, 10, 86, 16, 4)], obl = rr(-10, -50, 20, 100, 4);
    const sh = el("g", { transform: "translate(6 7)" }, g);
    barres.forEach((d) => el("path", { d, fill: OMBRE }, sh)); el("path", { d: obl, fill: OMBRE, transform: "rotate(20)" }, sh);
    barres.forEach((d, i) => { U.shape(C, "b" + i, d, MAT_FER, { sw: 2.6, r: 0.4 }); ln(g, `M-37 ${i ? 14 : -22} L37 ${i ? 14 : -22}`, 1.4, FER2); });
    const ob = el("g", { transform: "rotate(20)" }, g);
    U.shape(ctx(ob, o.seed + 1), "o", obl, MAT_FER, { sw: 2.6, r: 0.4 });
    ln(ob, "M-5 -44 L-5 44", 1.4, FER2);
    // rivets aux croisements
    [[-6.6, -18], [6.6, 18]].forEach(([x, y]) => { el("circle", { cx: x, cy: y, r: 4, fill: FER2, stroke: INK, "stroke-width": 1.6 }, g); el("circle", { cx: x - 1.2, cy: y - 1.2, r: 1.2, fill: "#FFFFFF" }, g); });
    return { w: 92, h: 104 };
  };
  D.different.essais = [{}];

  /* ───────── D.ecritoire — (hors inventaire) l'écritoire de S27 : planche de bois à pince, portée par un pied ─────────
   * o = { w: 340, h: 500, pied: 250 (du bas de la planche au sol), partie: "tout" | "planche" (pied + planche, sans la pince) |
   *       "pince" (la pince seule : à poser APRÈS la feuille, qu'elle tient par le haut) }
   * Ancrage = centre de la planche (S27 : (540, 890) → planche x 370–710, y 640–1140 ; pince y 626–670 ; pied jusqu'au sol 1390).
   * La feuille 300 × 460 (D.feuille) se pose au même centre. Renvoie { haut: −h/2, bas: h/2, sol: h/2 + pied }. */
  D.ecritoire = (g, o) => {
    o = Object.assign({ w: 340, h: 500, pied: 250, partie: "tout", seed: 1361 }, o);
    const w = o.w, h = o.h, a = w / 2, b = h / 2, sol = b + o.pied, C = ctx(g, o.seed), out = { haut: -b, bas: b, sol };
    const pince = (gg) => {
      const P = ctx(gg, o.seed + 3);
      el("path", { d: rr(-64, -b - 12, 128, 44, 9), fill: "rgba(28,26,28,.18)", transform: "translate(4 5)" }, gg);
      U.shape(P, "pince", `M-64 ${-b - 2} C-64 ${-b - 12} -56 ${-b - 14} -46 ${-b - 14} L46 ${-b - 14} C56 ${-b - 14} 64 ${-b - 12} 64 ${-b - 2} L58 ${-b + 30} L-58 ${-b + 30} Z`, MAT.grey, { sw: 2.6, r: 0.4 });
      ln(gg, `M-50 ${-b - 8} L50 ${-b - 8}`, 1.4, "#FFFFFF");
      el("path", { d: rr(-30, -b - 26, 60, 16, 8), fill: ACIER, stroke: INK, "stroke-width": 2.2 }, gg);      // ressort (rouleau)
      ln(gg, `M-22 ${-b - 18} L22 ${-b - 18}`, 1.2, "#FFFFFF");
      [-40, 40].forEach((x) => visTete(gg, x, -b + 14, 4.2, x > 0 ? 30 : -40, { ombre: false }));
    };
    if (o.partie === "pince") { pince(g); return out; }
    // pied : colonne + piètement en T, ombre au sol
    el("ellipse", { cx: 8, cy: sol + 2, rx: 120, ry: 9, fill: "rgba(28,26,28,.14)" }, g);
    U.shape(C, "col", rr(-13, b - 6, 26, o.pied - 14, 5), MAT.mid, { sw: 2.6, r: 0.4 });
    ln(g, `M-5 ${b + 4} L-5 ${sol - 26}`, 1.3, "#FFFFFF");
    U.shape(C, "pieds", `M-100 ${sol} C-70 ${sol - 10} -30 ${sol - 22} -14 ${sol - 26} L14 ${sol - 26} C30 ${sol - 22} 70 ${sol - 10} 100 ${sol} Z`, MAT.mid, { sw: 2.6, r: 0.4 });
    el("path", { d: rr(-24, b - 8, 48, 20, 5), fill: ACIER, stroke: INK, "stroke-width": 2.2 }, g);              // rotule sous la planche
    // planche de bois, biseau, rainure à crayon en bas
    ombre(g, rr(-a, -b, w, h, 14), 8, 10);
    U.shape(C, "planche", rr(-a, -b, w, h, 14), MAT.wood, { sw: 3, r: 0.5 });
    ln(g, rr(-a + 7, -b + 7, w - 14, h - 14, 10), 1.3, "#ABABA4");
    ln(g, `M${-a + 14} ${-b + 5} L${a - 14} ${-b + 5}`, 1.3, "#FFFFFF");
    el("path", { d: rr(-a + 20, b - 14, w - 40, 10, 5), fill: "#D2D2CB", stroke: INK, "stroke-width": 1.8 }, g);
    if (o.partie === "tout") pince(g);
    return out;
  };
  D.ecritoire.essais = [{}, { partie: "pince" }];

  /* ───────── D.fente — (hors inventaire) fente à courrier murale de S27 : plaque d'acier 190 × 54 à clapet (comme la boîte, réduite) ─────────
   * o = { w: 190, h: 54, clapet: degrés (0 = fermé ; pendule amorti de 30° quand l'enveloppe passe), partie: "tout" | "corps" | "clapet" }
   * Ancrage = centre (S27 : (240, 880) et (805, 880)). Ouverture sombre x ±(w/2 − 22), y −6…+8 ; charnière du clapet à y −8.
   * Ordre pour une enveloppe qui entre : corps → enveloppe → clapet. Renvoie { fente: [0, 1], charniere: −8, l: w/2 − 22 }. */
  D.fente = (g, o) => {
    o = Object.assign({ w: 190, h: 54, clapet: 0, partie: "tout", seed: 1371 }, o);
    const w = o.w, h = o.h, a = w / 2, l = a - 22, out = { fente: [0, 1], charniere: -8, l };
    const clapet = (gg) => {
      const ang = clamp(Math.abs(o.clapet || 0), 0, 85), hh = 20 * Math.cos(rad(ang));
      el("path", { d: rr(-l - 4, -8, 2 * l + 8, f(Math.max(3, hh)), 3), fill: ang > 4 ? "#B9B9B3" : "#CFCFCA", stroke: INK, "stroke-width": 2.2 }, gg);
      if (hh > 8) ln(gg, `M${-l + 4} ${f(-8 + hh - 4)} L${l - 4} ${f(-8 + hh - 4)}`, 1.2, "#FFFFFF");
      el("path", { d: rr(-16, f(-8 + Math.max(3, hh) - 3), 32, 5, 2.5), fill: ACIER, stroke: INK, "stroke-width": 1.4 }, gg);
    };
    if (o.partie === "clapet") { clapet(g); return out; }
    const C = ctx(g, o.seed + Math.round(w));
    ombre(g, rr(-a, -h / 2, w, h, 8), 5, 6);
    U.shape(C, "pl", rr(-a, -h / 2, w, h, 8), MAT.grey, { sw: 2.6, r: 0.4 });
    ln(g, `M${-a + 8} ${-h / 2 + 5} L${a - 8} ${-h / 2 + 5}`, 1.2, "#FFFFFF");
    el("path", { d: rr(-l, -6, 2 * l, 14, 2), fill: "#2E2E2B" }, g);
    [-a + 11, a - 11].forEach((x, i) => visTete(g, x, 0, 4.4, i ? 35 : -25, { ombre: false }));
    if (o.partie !== "corps") clapet(g);
    return out;
  };
  D.fente.essais = [{}, { clapet: 30 }];

  /* ───────── D.fleche — flèche de retour courbe (S28) : encre 6 px, pointe ; p 0…1 (la part déjà tracée) ─────────
   * o = { A: [640, 690], C: [700, 596], B: [722, 676], p: 1, sw: 6, pointe: 22 } — coordonnées MONDE : poser en (0, 0).
   * Courbe quadratique A → C → B (la pointe arrive au bord gauche de l'enveloppe-réponse posée en (800, 720)). Renvoie { bout }. */
  D.fleche = (g, o) => {
    o = Object.assign({ A: [640, 690], C: [700, 596], B: [722, 676], p: 1, sw: 6, pointe: 22 }, o);
    const A = o.A, Cc = o.C, B = o.B, p = clamp(o.p, 0, 1);
    const q = (t) => [(1 - t) * (1 - t) * A[0] + 2 * (1 - t) * t * Cc[0] + t * t * B[0], (1 - t) * (1 - t) * A[1] + 2 * (1 - t) * t * Cc[1] + t * t * B[1]];
    if (p <= 0.01) return { bout: A };
    const n = Math.max(2, Math.round(28 * p)); let d = "";
    for (let i = 0; i <= n; i++) { const P = q((p * i) / n); d += (i ? " L" : "M") + f(P[0]) + " " + f(P[1]); }
    const E = q(p), tx = 2 * (1 - p) * (Cc[0] - A[0]) + 2 * p * (B[0] - Cc[0]), ty = 2 * (1 - p) * (Cc[1] - A[1]) + 2 * p * (B[1] - Cc[1]);
    const L = Math.hypot(tx, ty) || 1, ux = tx / L, uy = ty / L, k = o.pointe;
    ln(g, d, o.sw, OMBRE, { transform: "translate(3 4)" });
    ln(g, d, o.sw, INK);
    if (p > 0.12) {
      const bx = E[0] - ux * k, by = E[1] - uy * k, nx = -uy * k * 0.55, ny = ux * k * 0.55;
      el("path", { d: `M${f(E[0] + ux * 4)} ${f(E[1] + uy * 4)} L${f(bx + nx)} ${f(by + ny)} L${f(bx - nx)} ${f(by - ny)} Z`, fill: INK, stroke: INK, "stroke-width": 2.4, "stroke-linejoin": "round" }, g);
    }
    return { bout: [f(E[0]), f(E[1])] };
  };
  D.fleche.essais = [{ p: 0.55 }, { p: 1 }];

  /* ───────── D.journal — (hors inventaire) le journal roulé glissé dans le porte-journal de ta boîte (S28) ─────────
   * o = { w: 220, d: 30 } · ancrage = centre du rouleau (S28 : boîte en (540, 800) → (540, 972), devant la tige du porte-journal).
   * Aucun titre : des colonnes de gribouillis et une bande. m.sway 1,5° autour d'un bout (out.pivot) : il frémit. Renvoie { pivot }. */
  D.journal = (g, o) => {
    o = Object.assign({ w: 220, d: 30, seed: 1381 }, o);
    const a = o.w / 2, r = o.d / 2, C = ctx(g, o.seed);
    el("path", { d: rr(-a, -r, o.w, o.d, r), fill: "rgba(28,26,28,.16)", transform: "translate(4 6)" }, g);
    U.shape(C, "rl", `M${-a + 8} ${-r} L${a - 6} ${-r} A6 ${r} 0 0 1 ${a - 6} ${r} L${-a + 8} ${r} Z`, { base: "#F4F3EE" }, { sw: 2.4, r: 0.4 });
    for (let i = 0; i < 4; i++) ln(g, `M${-a + 30 + i * 46} ${-r + 7} q8 -1 16 0 t16 0 M${-a + 30 + i * 46} ${-r + 13} q8 1 14 0 M${-a + 30 + i * 46} ${r - 9} q8 -1 18 0`, 1.4, GRIB);
    el("path", { d: rr(-24, -r - 1, 18, o.d + 2, 2), fill: "#D2D2CB", stroke: INK, "stroke-width": 1.6 }, g);      // bande de papier
    // bout gauche : la spirale du papier roulé
    el("ellipse", { cx: -a + 8, cy: 0, rx: 8, ry: r, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2 }, g);
    ln(g, `M${-a + 8} 0 C${-a + 11} -4 ${-a + 13} 2 ${-a + 9} 6 C${-a + 4} 9 ${-a + 2} -3 ${-a + 6} -8 C${-a + 10} -12 ${-a + 16} -4 ${-a + 14} 4`, 1.3, "#77776F");
    return { pivot: [f(-a + 8), 0] };
  };
  D.journal.essais = [{}];

  /* ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
   * B (fin). LA PORTE DE TON BUREAU (S29) — porte, corbeille
   * ═════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

  /* ───────── D.porteBureau — porte de bureau d'hôpital vue de face : dormant, vantail clair, bande vitrée à droite, béquille à gauche ─────────
   * o = { w: 480, h: 830, dormant: 22 } · ancrage = milieu du SEUIL (S29 : (540, 1390) → vantail x 300–780, y 560–1390 ; dormant
   * jusqu'à y 538 : sous la zone nue de la pastille). Bande vitrée x +170…+210, y −560…−140 (sous la plaque, qui couvre y −790…−590) ;
   * béquille à gauche (rosace en (−206, −470), levier vers l'intérieur, au-dessus de la tête de TOI) ; trois paumelles à droite ;
   * plaque de propreté en bas. AUCUN texte (la plaque « Ärztin / Arzt » est posée par story.js).
   * Renvoie { vitre: { x, y, w, h } (le reflet qui glisse se découpe dedans), vantail: { x, y, w, h }, plaque: [0, −690] }. */
  D.porteBureau = (g, o) => {
    o = Object.assign({ w: 480, h: 830, dormant: 22, seed: 1341 }, o);
    const w = o.w, h = o.h, a = w / 2, dm = o.dormant, C = ctx(g, o.seed);
    const out = { vitre: { x: 170, y: -560, w: 40, h: 420 }, vantail: { x: -a, y: -h, w, h }, plaque: [0, -690] };
    // ombre portée du dormant sur le mur + dormant
    el("path", { d: rr(-a - dm, -h - dm, w + 2 * dm, h + dm, 4), fill: OMBRE, transform: "translate(8 6)" }, g);
    U.shape(C, "dormant", `M${-a - dm} 0 L${-a - dm} ${-h - dm} L${a + dm} ${-h - dm} L${a + dm} 0 L${a} 0 L${a} ${-h} L${-a} ${-h} L${-a} 0 Z`, MAT.light, { sw: 2.8, r: 0.4 });
    ln(g, `M${-a - dm + 6} -4 L${-a - dm + 6} ${-h - dm + 6} L${a + dm - 6} ${-h - dm + 6}`, 1.3, "#FFFFFF");
    // vantail clair, quelques fils du bois
    U.shape(C, "vantail", rr(-a, -h, w, h, 2), { base: "#EFEEE8" }, { sw: 2.8, r: 0.4 });
    el("path", { d: rr(-a, -h, 10, h, 1), fill: "#E2E1DA" }, g);
    const R = rng(o.seed);
    let d = ""; for (let i = 0; i < 9; i++) { const x = -a + 30 + i * 50 + R() * 16, y0 = -h + 30 + R() * 200, L = 160 + R() * 300; d += `M${f(x)} ${f(y0)} q${f(R() * 6 - 3)} ${f(L / 2)} ${f(R() * 4 - 2)} ${f(L)}`; }
    ln(g, d, 1.2, "#D6D5CE");
    // bande vitrée (verre dépoli) dans son cadre
    const V = out.vitre;
    el("path", { d: rr(V.x - 8, V.y - 8, V.w + 16, V.h + 16, 4), fill: "#E2E1DA", stroke: INK, "stroke-width": 2.4 }, g);
    el("path", { d: rr(V.x, V.y, V.w, V.h, 2), fill: "#EEF3F4", stroke: "#77776F", "stroke-width": 1.6 }, g);
    let hv = ""; for (let y = V.y + 14; y < V.y + V.h; y += 16) hv += `M${V.x + 4} ${y + 8} L${V.x + V.w - 4} ${y}`;
    ln(g, hv, 1, "#D7E0E2");
    // paumelles (à droite)
    [-720, -420, -120].forEach((y) => { el("path", { d: rr(a - 4, y - 22, 12, 44, 3), fill: ACIER, stroke: INK, "stroke-width": 2 }, g); ln(g, `M${a + 2} ${y - 18} L${a + 2} ${y + 18}`, 1, "#FFFFFF"); });
    // béquille (à gauche) : rosace, levier vers l'intérieur, entrée de clé
    const bx = -a + 34, by = -470;
    el("path", { d: rr(bx - 11, by - 34, 22, 92, 10), fill: "rgba(28,26,28,.16)", transform: "translate(4 5)" }, g);
    el("path", { d: rr(bx - 11, by - 34, 22, 92, 10), fill: ACIER, stroke: INK, "stroke-width": 2.4 }, g);
    ln(g, `M${bx - 5} ${by - 26} L${bx - 5} ${by + 48}`, 1.2, "#FFFFFF");
    el("path", { d: `M${bx - 3} ${by - 6} L${bx + 52} ${by - 6} C${bx + 60} ${by - 6} ${bx + 62} ${by + 6} ${bx + 54} ${by + 7} L${bx - 3} ${by + 7} Z`, fill: ACIER, stroke: INK, "stroke-width": 2.6, "stroke-linejoin": "round" }, g);
    ln(g, `M${bx + 4} ${by - 2} L${bx + 48} ${by - 2}`, 1.3, "#FFFFFF");
    el("circle", { cx: bx, cy: by, r: 7, fill: ACIER, stroke: INK, "stroke-width": 2 }, g);
    el("path", { d: `M${bx - 3} ${by + 32} A3.6 3.6 0 1 1 ${bx + 3} ${by + 32} L${bx + 2} ${by + 44} L${bx - 2} ${by + 44} Z`, fill: "#2E2E2B" }, g);
    // plaque de propreté (bas) + seuil
    el("path", { d: rr(-a + 14, -112, w - 28, 92, 4), fill: "#E6E6E1", stroke: INK, "stroke-width": 2 }, g);
    ln(g, `M${-a + 20} -106 L${a - 20} -106`, 1.2, "#FFFFFF");
    [[-a + 24, -102], [a - 24, -102], [-a + 24, -30], [a - 24, -30]].forEach(([x, y], i) => visTete(g, x, y, 3.4, 20 + i * 35, { ombre: false }));
    el("path", { d: rr(-a - dm - 6, -6, w + 2 * dm + 12, 12, 3), fill: "#D9D9D2", stroke: INK, "stroke-width": 2.2 }, g);
    return out;
  };
  D.porteBureau.essais = [{}];

  /* ───────── D.corbeille — corbeille à papier en fil d'acier (treillis en losanges), 110 × 130 ─────────
   * o = { w: 110, h: 130, choc: 0…1 (elle tangue : rotation de 7° × choc autour de l'ancrage), partie: "tout" | "fond" (le fond
   *       intérieur et l'arrière du bord : à poser AVANT ce qui tombe dedans) | "devant" (le treillis et le bord avant : APRÈS) }
   * Ancrage = centre du BAS (S29 : (215, 1390) → x 160–270, y 1260–1390). Renvoie { bord: −h (y du bord), dedans: [0, −h + 30] }. */
  D.corbeille = (g, o) => {
    o = Object.assign({ w: 110, h: 130, choc: 0, partie: "tout", seed: 1351 }, o);
    const a = o.w / 2, b = a * 0.78, h = o.h, ry = 9, out = { bord: -h, dedans: [0, -h + 30] };
    const G = el("g", { transform: `rotate(${f(7 * clamp(o.choc, -1, 1))})` }, g);
    const corps = `M${-a} ${-h} L${a} ${-h} L${b} 0 L${-b} 0 Z`;
    // treillis en losanges SANS découpe (la boîte englobante reste celle de la corbeille) : droites u = c + m·v dans le repère
    // (u −1…1 en travers, v 0…1 de haut en bas), bornées à la surface, échantillonnées (le trapèze les courbe à peine)
    const P = (u, v) => [u * (a + (b - a) * v), -h + h * v];
    const treillis = (gg, dc, col, sw) => {
      let d = "";
      [1.5, -1.5].forEach((m) => {
        for (let c = -2.6 + dc; c <= 2.6; c += 0.42) {
          const va = (-1 - c) / m, vb = (1 - c) / m, v0 = Math.max(0, Math.min(va, vb)), v1 = Math.min(1, Math.max(va, vb));
          if (v1 - v0 < 0.03) continue;
          for (let i = 0; i <= 6; i++) { const v = v0 + (v1 - v0) * i / 6, p = P(c + m * v, v); d += (i ? " L" : "M") + f(p[0]) + " " + f(p[1]); }
        }
      });
      ln(gg, d, sw, col);
    };
    if (o.partie !== "devant") {
      el("ellipse", { cx: 6, cy: 2, rx: b + 14, ry: 6, fill: "rgba(28,26,28,.16)" }, G);
      el("path", { d: corps, fill: "#ECECE7" }, G);
      treillis(G, 0.21, "#C9C9C1", 1);                                                 // treillis du fond (vu à travers) : plus pâle
      ln(G, `M${-a} ${-h} A${a} ${ry} 0 0 1 ${a} ${-h}`, 2.4, "#77776F");          // arrière du bord
      el("ellipse", { cx: 0, cy: -3, rx: b, ry: 5, fill: "#DCDCD6", stroke: "#77776F", "stroke-width": 1.4 }, G);   // fond
    }
    if (o.partie !== "fond") {
      treillis(G, 0, INK, 1.8);
      ln(G, `M${-a} ${-h} L${-b} 0 M${a} ${-h} L${b} 0`, 2.8, INK);
      ln(G, `M${-b} 0 A${b} 5 0 0 0 ${b} 0`, 3, INK);                                // cerclage du bas
      ln(G, `M${f(-(a + b) / 2)} ${-h / 2} A${f((a + b) / 2)} 6 0 0 0 ${f((a + b) / 2)} ${-h / 2}`, 2, INK);   // cerclage du milieu
      ln(G, `M${-a} ${-h} A${a} ${ry} 0 0 0 ${a} ${-h}`, 3.4, INK);                   // bord avant
      ln(G, `M${-a + 8} ${-h + 4} A${a - 8} ${ry - 3} 0 0 0 ${-a + 36} ${-h + 8}`, 1.4, "#FFFFFF");
    }
    return out;
  };
  D.corbeille.essais = [{}, { partie: "fond" }, { partie: "devant", choc: 0.6 }];

  }   // fin de init()
})();
