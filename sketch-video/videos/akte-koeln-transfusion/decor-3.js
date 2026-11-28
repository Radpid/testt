/* decor-3.js — AKTE 04 « 63 ساعة » : décors et objets PROPRES à l'épisode, 3e partie = scènes 21 à 25 (le dossier « Rechtskraft »,
 * la règle, le sang ne revient pas). Mêmes conventions que decor.js ; aides partagées : const K = D.kit (decor.js).
 * Dessins de ce fichier : D.caseFile, D.deskLamp (scène 21) · D.ruleCard, D.lessonCard, D.bedsideCard, D.sampleTube (scènes 22–24)
 * · D.rewKey, D.pageFlip, D.dripBig (scène 25). Déjà faits ailleurs et réutilisés : D.rollCounter (aussi pour l'affiche), D.loopTag,
 * D.bloodBag, D.tube (o.k, chamber: false, roller: false pour la tubulure large de la scène 25), D.formSheet, D.pen (decor.js) ;
 * D.bedFront04, D.wristband, D.docSheet, D.desk04 (decor-2.js).
 * Pièces animées (o.part, comme dans decor-2.js) : caseFile « cover » / « roll » · deskLamp « lamp » / « cone » · ruleCard et lessonCard
 * « card » / « marks » · pageFlip « board » / « pages » · dripBig « back » / « fluid » / « front ».
 * Arabe : les chaînes sont recopiées du storyboard (scènes 22–24), lettre pour lettre. Gras, encre ; ≥ 40 px pour les mots de ligne,
 * ≥ 26 px pour les sous-phrases (largeur de la carte : voir storyboard.md, « Écarts de construction »).
 */
(function boot() {
  "use strict";
  // l'outil d'essai charge decor-3.js AVANT decor.js (tri alphabétique) : sans le kit, on attend que decor.js nous relance
  if (!(window.EpDecor && window.EpDecor.kit)) { const W = window.EpDecor = window.EpDecor || {}; (W._later = W._later || []).push(boot); return; }
  const SC = SketchCast, U = SC.util, D = window.EpDecor, K = D.kit;
  const { el, ln, tw, MAT, f, clamp, lerp, hs, mixc, circ, poly, rollWindow, gear, INK, YEL, SH, PAPER, RED, RED2 } = K;
  const rad = (a) => (a * Math.PI) / 180, E = (t) => t * t * (3 - 2 * t);
  const shadow = (g, d, dx, dy) => el("path", { d, fill: SH, transform: `translate(${dx == null ? 7 : dx} ${dy == null ? 8 : dy})` }, g);
  const AR = "'Plex Arabic', sans-serif";
  // arabe gras, encre ; anchor "right" = aligné à droite sur x (RTL), "left" = aligné à gauche, "middle"
  const ar = (g, s, x, y, size, anchor, o) => U.text(g, s, x, y, size, Object.assign({ font: AR, weight: 700, fill: INK, rtl: true, anchor: anchor === "right" ? "start" : anchor === "left" ? "end" : "middle" }, o));
  const CARTON = { base: "#E8E1CF", hatch: "#BDB49C", gap: 7, fw: 1.1 };
  // coche manuscrite qui se trace (p 0..1) : un seul trait, longueur proportionnelle
  function tick(g, x, y, s, p, col) {
    p = clamp(p, 0, 1); if (p < 0.02) return;
    const a = [x - 13 * s, y - 1 * s], b = [x - 3 * s, y + 11 * s], c = [x + 17 * s, y - 17 * s];
    const l1 = Math.hypot(b[0] - a[0], b[1] - a[1]), l2 = Math.hypot(c[0] - b[0], c[1] - b[1]), L = (l1 + l2) * p;
    const pts = [a]; if (L <= l1) pts.push([lerp(a[0], b[0], L / l1), lerp(a[1], b[1], L / l1)]); else { pts.push(b); const u = (L - l1) / l2; pts.push([lerp(b[0], c[0], u), lerp(b[1], c[1], u)]); }
    ln(g, poly(pts), 5.2 * s, col || INK);
  }
  // case à cocher (cadre net) — coin haut gauche (x, y), côté c
  const box = (g, x, y, c) => { el("path", { d: U.rrect(x + 3, y + 4, c, c, 5), fill: "rgba(28,26,28,.14)" }, g); el("path", { d: U.rrect(x, y, c, c, 5), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.6 }, g); };

  /* ═════════════════════════ B. TRIBUNAL — le dossier « Rechtskraft » (scène 21) ═════════════════════════ */

  /* 25 · le dossier du tribunal VU DE FACE, debout sur le banc — ancrage : centre ; 560 × 440 (x −280…280, y −220…220)
   * couverture cartonnée (dos plus sombre à gauche, feuillets qui dépassent en bas et à droite), sangle élastique verticale à droite (anneau
   * d'attache du « ؟ » : ancre strap), étiquette tapée de 3 lignes (o.lines, .tw 24), « Rechtskraft: » (.tw 18) puis UNE fenêtre à rouleau
   * large (190 × 64, sans unité ni étiquette, la même mécanique que le rouleau « STRAFE ») et sa petite roue crantée.
   * Le rouleau tourne TOUJOURS flou : aucun chiffre n'est jamais dessiné (vérité : le caractère définitif n'est pas connu).
   * o.streak = phase des traits (décroissante = à l'envers) · o.tick = angle de la roue (°)
   * o.part : "all" | "cover" (couverture, étiquette, cadre du rouleau : statique) | "roll" (la fenêtre et la roue : à chaque image) */
  D.caseFile = (g, o = {}) => {
    o = Object.assign({ lines: ["Amtsgericht Köln", "613 Ls 3/12", "Urteil vom 16.05.2012"], streak: 0, tick: 0, part: "all", seed: 2511 }, o);
    const P = o.part, C = U.ctx(g, o.seed, false, 1), RX = -35, RY = 98, RW = 190, RH = 64;
    if (P !== "roll") {
      const cover = U.rrect(-280, -220, 552, 432, 10);
      shadow(g, U.rrect(-280, -220, 564, 444, 10), 10, 11);
      // feuillets qui dépassent (à droite et en bas) : l'épaisseur du dossier
      el("path", { d: U.rrect(-268, -208, 552, 432, 6), fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g);
      [[-272, 216, 548], [-276, 220, 552]].forEach(([x, y, w]) => ln(g, `M${x + 12} ${y - 1} L${x + w} ${y - 1}`, 1.2, "#9A9A94"));
      for (let i = 0; i < 5; i++) ln(g, `M${276 + i * 1.6} ${-200 + i * 3} L${276 + i * 1.6} ${206 + i * 2}`, 1, i % 2 ? "#B9B9B2" : "#8A8A84");
      U.shape(C, "cover", cover, CARTON, { sw: 3 });
      // le dos (bande plus sombre, deux œillets)
      U.shape(C, "spine", U.rrect(-280, -220, 40, 432, 8), MAT.mid, { sw: 2.4 });
      [-120, 110].forEach((y) => { el("circle", { cx: -260, cy: y, r: 7, fill: PAPER, stroke: INK, "stroke-width": 2 }, g); el("circle", { cx: -260, cy: y, r: 3, fill: "#9A9A94" }, g); });
      ln(g, "M-228 -210 L-228 202", 1.4, "#A39C88");
      // lignes imprimées du formulaire (pas de texte)
      [[-200, -20, 170], [-200, 6, 120], [-200, 32, 150]].forEach(([x, y, w]) => ln(g, `M${x} ${y} L${x + w} ${y}`, 1.8, "#B5AC96"));
      el("rect", { x: 60, y: -22, width: 110, height: 56, rx: 3, fill: "none", stroke: "#B5AC96", "stroke-width": 1.8 }, g);
      // l'étiquette tapée
      shadow(g, U.rrect(-204, -190, 364, 140, 4), 4, 5);
      U.shape(C, "label", U.rrect(-204, -190, 364, 140, 4), MAT.white, { sw: 2.4 });
      ln(g, "M-190 -168 L146 -168", 1.2, "#C9C9C1", { "stroke-dasharray": "4 5" });
      o.lines.forEach((s, i) => tw(g, s, -22, -136 + i * 34, 24, {}));
      // « Rechtskraft: » + le cadre vissé du rouleau
      tw(g, "Rechtskraft:", -210, 136, 18, { anchor: "start" });
      ln(g, "M-210 146 L-82 146", 1.4, "#8A8A84");
      shadow(g, U.rrect(RX - 12, RY - 10, RW + 24 + 34, RH + 20, 8), 5, 6);
      U.shape(C, "bezel", U.rrect(RX - 12, RY - 10, RW + 24 + 34, RH + 20, 8), MAT.grey, { sw: 2.6 });
      [[RX - 5, RY - 3], [RX - 5, RY + RH + 3], [RX + RW + 39, RY + RH + 3]].forEach(([x, y], i) => {
        const a = rad(30 + i * 55); el("circle", { cx: x, cy: y, r: 3.2, fill: "#F4F4EF", stroke: INK, "stroke-width": 1.4 }, g);
        ln(g, `M${f(x - 2.3 * Math.cos(a))} ${f(y - 2.3 * Math.sin(a))} L${f(x + 2.3 * Math.cos(a))} ${f(y + 2.3 * Math.sin(a))}`, 1.2);
      });
      // la sangle élastique (passe par-dessus le haut et le bas) + l'anneau d'attache du « ؟ »
      U.shape(C, "strap", U.rrect(221, -228, 20, 448, 6), MAT.dark, { sw: 2.4 });
      ln(g, "M231 -220 L231 212", 1.4, "#9A9A94", { "stroke-dasharray": "6 6" });
      el("circle", { cx: 231, cy: -160, r: 9, fill: "none", stroke: INK, "stroke-width": 4.4 }, g);
      el("circle", { cx: 231, cy: -160, r: 9, fill: "none", stroke: "#DADAD4", "stroke-width": 2 }, g);
    }
    if (P !== "cover") {
      rollWindow(g, RX, RY, RW, RH, 0, { blur: 1, streak: o.streak, sw: 3 });   // TOUJOURS flou : aucun chiffre
      gear(g, RX + RW + 19, RY + 14, 11, o.tick);
    }
    return { roll: [RX + RW / 2, RY + RH / 2], strap: [231, -160], w: 560, h: 440 };
  };
  D.caseFile.essais = [{}, { streak: 0.4, tick: 60 }, { part: "roll", streak: 0.7 }];

  /* 25 · lampe de bureau articulée (scène 21 : elle éclaire le dossier) — ancrage : bas centre du socle (posé sur le banc) ; tête (abat-jour)
   * vers (110, −420) ; le cône de lumière part de la bouche de l'abat-jour dans la direction o.dir (°, 34 = vers le bas à droite) sur o.len.
   * o.on 0..1 = intensité du cône · o.part : "all" | "lamp" (la lampe : m.sway 1°, pivot au socle) | "cone" (le cône seul, à poser par-dessus
   * le dossier : lumière très pâle) · o.k : longueur des bras (×). Ancres : mouth (bouche de l'abat-jour), head. Pas de suspension : ce n'est pas la
   * lampe d'AKTE 03. Scène 21 : pied (150, 1060), o.k 1,25 (tête ≈ (268, 556)), la lampe POSÉE DEVANT le dossier (sinon l'abat-jour disparaît derrière). */
  D.deskLamp = (g, o = {}) => {
    o = Object.assign({ dir: 34, len: 420, spread: 30, on: 1, k: 1, part: "all", seed: 2521 }, o);
    const P = o.part, C = U.ctx(g, o.seed, false, 1), ka = o.k || 1;   // o.k : longueur des deux bras (1,25 : la tête passe au-dessus d'un dossier de 440)
    const P0 = [0, -30], P1 = [f(-26 * ka), f(-30 - 206 * ka)], P2 = [f(-26 * ka + 120 * ka), f(-30 - 206 * ka - 168 * ka)], d = [Math.cos(rad(o.dir)), Math.sin(rad(o.dir))], n = [-d[1], d[0]];
    const S = (p, a, b) => [f(p[0] + d[0] * a + n[0] * b), f(p[1] + d[1] * a + n[1] * b)];   // repère de l'abat-jour : a le long de l'axe, b en travers
    const mouth = S(P2, 74, 0);
    if (P !== "lamp" && o.on > 0.02) {
      const sp = rad(o.spread), L = o.len, gg = el("g", { opacity: f(clamp(o.on, 0, 1)) }, g);
      const e1 = [mouth[0] + L * Math.cos(rad(o.dir) - sp), mouth[1] + L * Math.sin(rad(o.dir) - sp)], e2 = [mouth[0] + L * Math.cos(rad(o.dir) + sp), mouth[1] + L * Math.sin(rad(o.dir) + sp)];
      const m1 = S(P2, 74, -30), m2 = S(P2, 74, 30);
      el("path", { d: `M${m1[0]} ${m1[1]} L${f(e1[0])} ${f(e1[1])} Q${f((e1[0] + e2[0]) / 2 + d[0] * 40)} ${f((e1[1] + e2[1]) / 2 + d[1] * 40)} ${f(e2[0])} ${f(e2[1])} L${m2[0]} ${m2[1]} Z`, fill: YEL, opacity: 0.14 }, gg);
      const c1 = [mouth[0] + L * 0.8 * Math.cos(rad(o.dir) - sp * 0.45), mouth[1] + L * 0.8 * Math.sin(rad(o.dir) - sp * 0.45)], c2 = [mouth[0] + L * 0.8 * Math.cos(rad(o.dir) + sp * 0.45), mouth[1] + L * 0.8 * Math.sin(rad(o.dir) + sp * 0.45)];
      el("path", { d: `M${S(P2, 74, -12).join(" ")} L${f(c1[0])} ${f(c1[1])} L${f(c2[0])} ${f(c2[1])} L${S(P2, 74, 12).join(" ")} Z`, fill: "#FFF6C9", opacity: 0.32 }, gg);
    }
    if (P !== "cone") {
      el("ellipse", { cx: 6, cy: 2, rx: 66, ry: 7, fill: "rgba(28,26,28,.18)" }, g);
      U.shape(C, "base", "M-58 0 L-50 -20 Q0 -30 50 -20 L58 0 Z", MAT.dark, { sw: 2.6 });
      ln(g, "M-44 -18 Q0 -26 44 -18", 1.6, "#9A9A94");
      // deux bras à tiges doubles + ressorts
      const rod = (A, B, k) => {
        const dx = B[0] - A[0], dy = B[1] - A[1], l = Math.hypot(dx, dy), ux = -dy / l * 5, uy = dx / l * 5;
        [-1, 1].forEach((s) => { const dd = `M${f(A[0] + ux * s)} ${f(A[1] + uy * s)} L${f(B[0] + ux * s)} ${f(B[1] + uy * s)}`; ln(g, dd, 4.4, INK); ln(g, dd, 1.6, "#DADAD4"); });
        let z = `M${f(A[0] + dx * 0.22 + ux * 2.6)} ${f(A[1] + dy * 0.22 + uy * 2.6)}`;   // le ressort (zigzag le long d'une tige)
        for (let i = 1; i <= 12; i++) { const t = 0.22 + i * 0.03, s = i % 2 ? 1 : -1; z += ` L${f(A[0] + dx * t + ux * (2.6 + 2.4 * s))} ${f(A[1] + dy * t + uy * (2.6 + 2.4 * s))}`; }
        ln(g, z, 1.6, "#55524B");
        return k;
      };
      rod(P0, P1, 0); rod(P1, P2, 1);
      [P0, P1].forEach((p) => { el("circle", { cx: p[0], cy: p[1], r: 9, fill: "#CFCFCA", stroke: INK, "stroke-width": 2.2 }, g); el("circle", { cx: p[0], cy: p[1], r: 3, fill: INK }, g); });
      // l'abat-jour (cône métallique) et l'ampoule
      const sh = [S(P2, -10, -14), S(P2, 18, -24), S(P2, 74, -36), S(P2, 74, 36), S(P2, 18, 24), S(P2, -10, 14)];
      shadow(g, "M" + sh.map((p) => p.join(" ")).join(" L") + " Z", 6, 7);
      U.shape(C, "shade", "M" + sh.map((p) => p.join(" ")).join(" L") + " Z", MAT.grey, { sw: 2.8 });
      ln(g, `M${S(P2, 20, -16).join(" ")} L${S(P2, 66, -27).join(" ")}`, 2.4, "#FFFFFF");
      el("ellipse", { cx: mouth[0], cy: mouth[1], rx: 9, ry: 36, transform: `rotate(${o.dir} ${mouth[0]} ${mouth[1]})`, fill: "#FFF6C9", stroke: INK, "stroke-width": 2.4 }, g);
      el("circle", { cx: P2[0], cy: P2[1], r: 10, fill: "#CFCFCA", stroke: INK, "stroke-width": 2.2 }, g); el("circle", { cx: P2[0], cy: P2[1], r: 3.2, fill: INK }, g);
      const kn = S(P2, -16, 0); el("circle", { cx: kn[0], cy: kn[1], r: 6.5, fill: "#4A4A46", stroke: INK, "stroke-width": 1.8 }, g);   // molette de réglage
    }
    return { mouth, head: P2, w: 200, h: 440 };
  };
  D.deskLamp.essais = [{}, { part: "lamp", k: 1.25 }, { part: "cone", on: 1 }];

  /* ═════════════════════════ C. LA RÈGLE (scènes 22 à 24) ═════════════════════════ */

  // pictogrammes des lignes de la règle (≈ 52 × 52, centre (x, y))
  const PICTO = {
    band(g, x, y, k) {   // avant-bras + main en moufle + bracelet d'identité (jaune) au poignet
      const s = k || 1, P_ = (dx, dy) => `${f(x + dx * s)} ${f(y + dy * s)}`;
      el("path", { d: `M${P_(-28, -9)} L${P_(8, -10)} L${P_(8, 10)} L${P_(-28, 9)}`, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2 * s, "stroke-linejoin": "round" }, g);
      el("path", { d: `M${P_(6, -11)} Q${P_(20, -15)} ${P_(29, -6)} Q${P_(32, 2)} ${P_(26, 9)} Q${P_(16, 14)} ${P_(6, 10)} Z`, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2 * s, "stroke-linejoin": "round" }, g);
      el("path", { d: `M${P_(12, -12)} Q${P_(16, -20)} ${P_(23, -17)} Q${P_(24, -11)} ${P_(19, -9)}`, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 * s, "stroke-linejoin": "round" }, g);
      el("path", { d: U.rrect(x - 6 * s, y - 14 * s, 9 * s, 28 * s, 2.5 * s), fill: YEL, stroke: INK, "stroke-width": 1.8 * s }, g);
      ln(g, `M${P_(-3, -8)} L${P_(-3, 7)}`, 1.2 * s, "#6B5313");
    },
    bag(g, x, y) {   // poche + étiquette (sans lettre)
      el("path", { d: U.rrect(x - 17, y - 20, 34, 42, 8), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2 }, g);
      el("rect", { x: x - 6, y: y - 26, width: 12, height: 7, rx: 2, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
      el("path", { d: `M${x - 14} ${y + 6} Q${x} ${y + 2} ${x + 14} ${y + 6} L${x + 14} ${y + 16} Q${x + 14} ${y + 19} ${x + 10} ${y + 19} L${x - 10} ${y + 19} Q${x - 14} ${y + 19} ${x - 14} ${y + 16} Z`, fill: RED, stroke: RED2, "stroke-width": 1.2 }, g);
      el("rect", { x: x - 11, y: y - 12, width: 22, height: 14, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
      el("rect", { x: x + 1, y: y - 10, width: 8, height: 7, fill: "none", stroke: "#6E6E68", "stroke-width": 1.2, "stroke-dasharray": "2 1.6" }, g);
    },
    code(g, x, y) {   // code-barres = code-barres (poche = document)
      let bx = x - 24; [2, 1, 3, 1, 1, 2, 1, 3].forEach((w) => { el("rect", { x: f(bx), y: y - 18, width: w * 1.6, height: 16, fill: INK }, g); bx += w * 1.6 + 1.8; });
      ln(g, `M${x - 6} ${y + 6} L${x + 6} ${y + 6} M${x - 6} ${y + 12} L${x + 6} ${y + 12}`, 2.6, INK);
      el("path", { d: U.rrect(x + 10, y - 20, 16, 22, 2), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g); ln(g, `M${x + 13} ${y - 14} L${x + 23} ${y - 14} M${x + 13} ${y - 9} L${x + 21} ${y - 9}`, 1.2, "#8A8A84");
      el("path", { d: U.rrect(x - 26, y + 2, 16, 22, 4), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g); el("rect", { x: x - 22, y: y + 14, width: 8, height: 6, fill: RED }, g);
    },
    test(g, x, y) {   // la carte de test : deux champs ronds
      el("path", { d: U.rrect(x - 26, y - 17, 52, 34, 5), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2 }, g);
      [-12, 12].forEach((dx) => { el("circle", { cx: x + dx, cy: y - 1, r: 8.5, fill: "#F8ECE8", stroke: INK, "stroke-width": 1.6 }, g); el("circle", { cx: x + dx, cy: y - 1, r: 4.6, fill: RED }, g); });
    },
    one(g, x, y) {   // UNE seule poche
      PICTO.bag(g, x - 4, y);
      el("circle", { cx: x + 18, cy: y - 16, r: 10, fill: YEL, stroke: INK, "stroke-width": 1.8 }, g); tw(g, "1", x + 18, y - 11, 14, {});
    },
    nopen(g, x, y) {   // stylo barré
      const pg = el("g", { transform: `translate(${x - 20} ${y + 14})` }, g); D.pen(pg, { angle: -40, len: 54 });
      ln(g, `M${x - 22} ${y - 20} L${x + 22} ${y + 22}`, 7, "#FFFFFF"); ln(g, `M${x - 22} ${y - 20} L${x + 22} ${y + 22}`, 4.2, INK);
      el("circle", { cx: x, cy: y, r: 25, fill: "none", stroke: INK, "stroke-width": 3.4 }, g);
    },
  };

  /* 42 · LA CARTE DE LA RÈGLE — ancrage : coin haut gauche ; 430 × 512. En-tête (.tw 16 sur deux lignes + arabe gras 26), quatre lignes
   * [case à cocher 40 · pictogramme · allemand .tw 15 · arabe gras 40], la 4e (Bedside-Test, Kalam 28, deux lignes d'arabe gras 32 sur toute
   * la largeur), pied (« auch im Notfall » .tw 18 + arabe gras 30 ; la source en .tw 12). Rien d'inventé : textes du storyboard.
   * o.rows 0..4 (lignes visibles ; la partie décimale = fondu de la suivante) · o.head : en-tête allemand dessiné (false : à taper par la
   * scène, ancres headLines) · o.foot (pied visible, 0..1)
   * o.part : "all" | "card" (statique) | "marks" (coches o.checks [4 × 0..1] ; surligneurs o.hl = { pers, foot } 0..1, posés PAR-DESSUS le texte)
   * Ancres : rows (centre de chaque ligne), boxes (centre des cases), headLines, pers / braask / foot (zones de surligneur) */
  const RULE = { w: 430, head: 108, rows: [70, 70, 70, 136], foot: 74 };
  D.ruleCard = (g, o = {}) => {
    o = Object.assign({ rows: 4, head: true, foot: 1, checks: [0, 0, 0, 0], hl: null, part: "all", seed: 4201 }, o);
    const P = o.part, W = RULE.w, H = RULE.head + RULE.rows.reduce((a, b) => a + b, 0) + RULE.foot, C = U.ctx(g, o.seed, false, 1);
    const ys = []; let y = RULE.head; RULE.rows.forEach((h) => { ys.push([y, h]); y += h; });
    const footY = y, X0 = 14, BX = X0, PX = 104, TX = 136, XR = W - 14;
    const headLines = [["Vor JEDER Konserve ·", 18, 28, 16], ["am Patienten · persönlich", 18, 49, 16]];
    const braaskW = 66, arW = 395;   // largeurs mesurées (Plex Arabic gras 26 px) : « براسك » et la ligne entière
    const anchors = { w: W, h: H, rows: ys.map(([yy, h]) => [W / 2, yy + h / 2]), boxes: ys.map(([yy]) => [BX + 20, yy + 30]), headLines,
      pers: [18 + 15 * 9.6, 53, 10 * 9.6], braask: [W / 2 - arW / 2, 87, braaskW], foot: [X0 + 4, footY + 36, 15 * 10.8] };
    if (P !== "marks") {
      shadow(g, U.rrect(0, 0, W, H, 12), 9, 11);
      U.shape(C, "card", U.rrect(0, 0, W, H, 12), MAT.white, { sw: 3 });
      el("path", { d: U.rrect(4, 4, W - 8, RULE.head - 8, 9), fill: "#F1F1EC" }, g);
      if (o.head) headLines.forEach(([s, x, yy, sz]) => tw(g, s, x, yy, sz, { anchor: "start" }));
      ar(g, "قبل كل poche · حدا المريض · براسك", W / 2, 89, 26, "middle");
      ln(g, `M10 ${RULE.head} L${W - 10} ${RULE.head}`, 2.4);
      const rows = [
        { pic: "band", ar: "ديالو؟", de: ["für diesen", "Patienten?"] },
        { pic: "bag", ar: "الـgroupe؟", de: ["Blutgruppe", "passt?"] },
        { pic: "code", ar: "النمرة؟", de: ["Präparatenummer =", "Begleitdokument?"] },
        { pic: "test", title: "Bedside-Test", ar2: ["ديرو نتا ولا قدام عينيك،", "وكتب النتيجة"] },
      ];
      rows.forEach((r, i) => {
        const [yy, h] = ys[i], op = clamp(o.rows - i, 0, 1); if (op < 0.02) return;
        const rg = el("g", { opacity: f(op) }, g);
        if (i) ln(rg, `M${X0} ${yy} L${W - X0} ${yy}`, 1.3, "#C9C9C1", { "stroke-dasharray": "5 5" });
        box(rg, BX, yy + 10, 40);
        PICTO[r.pic](rg, BX + 40 + 38, yy + 30);
        if (r.title) {
          U.text(rg, r.title, TX, yy + 40, 28, { anchor: "start" });
          r.ar2.forEach((s, k) => ar(rg, s, XR, yy + 84 + k * 38, 32, "right"));
        } else {
          r.de.forEach((s, k) => tw(rg, s, TX, yy + 29 + k * 19, 15, { anchor: "start" }));
          ar(rg, r.ar, XR, yy + 46, 40, "right");
        }
      });
      if (o.foot > 0.02) {
        const fg = el("g", { opacity: f(clamp(o.foot, 0, 1)) }, g);
        ln(fg, `M10 ${footY} L${W - 10} ${footY}`, 2.4);
        tw(fg, "auch im Notfall", X0 + 4, footY + 34, 18, { anchor: "start" });
        ar(fg, "حتى فالاستعجال", XR, footY + 36, 30, "right");
        tw(fg, "Richtlinie Hämotherapie 2023 · 4.9.2 · 4.9.2.1", W / 2, footY + 60, 12, { fill: "#55524B" });
      }
    }
    if (P !== "card") {
      (o.checks || []).forEach((c, i) => tick(g, BX + 22, ys[i][0] + 30, 1, c));
      const hl = o.hl || {}, bar = (x, yy, w, p) => { if (p > 0.02) el("rect", { x: f(x - 3), y: f(yy - 13), width: f((w + 6) * clamp(p, 0, 1)), height: 17, rx: 4, fill: YEL, opacity: 0.55 }, g); };
      bar(anchors.pers[0], anchors.pers[1] - 2, anchors.pers[2], hl.pers || 0);
      if (hl.pers) bar(anchors.braask[0], anchors.braask[1] + 4, anchors.braask[2], hl.pers);   // « براسك » : à gauche de la ligne arabe
      bar(anchors.foot[0], anchors.foot[1], anchors.foot[2], hl.foot || 0);
    }
    return anchors;
  };
  D.ruleCard.essais = [{ checks: [1, 1, 0.6, 0], hl: { pers: 1 } }, { rows: 2.5, head: false, foot: 0 }, { part: "marks", checks: [1, 1, 1, 1], hl: { pers: 1, foot: 1 } }];

  /* 42 · la carte JAUNE des deux leçons de l'affaire (pas un texte officiel) — ancrage : coin haut gauche ; 430 × 246 ; titre .tw 15
   * « aus diesem Fall » + « درس من هاد القصة » (gras 30) ; ⑤ une seule poche « poche وحدة فكل مرة » (gras 32) ; ⑥ stylo barré « عمرك ما تسني على »
   * / « formation ما درتيهاش » (gras 30). o.part "card" | "marks" (o.checks [⑤, ⑥]) ; ancres rows, boxes */
  D.lessonCard = (g, o = {}) => {
    o = Object.assign({ checks: [0, 0], part: "all", seed: 4211 }, o);
    const P = o.part, W = 430, H = 246, C = U.ctx(g, o.seed, false, 1), XR = W - 14, BX = 14, ys = [[50, 82], [132, 112]];
    if (P !== "marks") {
      shadow(g, U.rrect(0, 0, W, H, 12), 9, 11);
      U.shape(C, "card", U.rrect(0, 0, W, H, 12), MAT.yellow, { sw: 3 });
      tw(g, "aus diesem Fall", BX + 4, 32, 15, { anchor: "start" });
      ar(g, "درس من هاد القصة", XR, 36, 30, "right");
      ln(g, `M10 50 L${W - 10} 50`, 2.2);
      ln(g, `M${BX} 132 L${W - BX} 132`, 1.3, "#B58A12", { "stroke-dasharray": "5 5" });
      [[0, "one"], [1, "nopen"]].forEach(([i, pic]) => {
        const [yy] = ys[i]; box(g, BX, yy + 14, 40);
        el("circle", { cx: BX + 40 + 38, cy: yy + 34, r: 30, fill: "#FFFFFF", opacity: 0.7 }, g);
        PICTO[pic](g, BX + 40 + 38, yy + 34);
      });
      ar(g, "poche وحدة فكل مرة", XR, 50 + 52, 32, "right");
      ar(g, "عمرك ما تسني على", XR, 132 + 46, 30, "right");
      ar(g, "formation ما درتيهاش", XR, 132 + 88, 30, "right");
    }
    if (P !== "card") (o.checks || []).forEach((c, i) => tick(g, BX + 22, ys[i][0] + 34, 1, c));
    return { w: W, h: H, rows: ys.map(([yy, h]) => [W / 2, yy + h / 2]), boxes: ys.map(([yy]) => [BX + 20, yy + 34]) };
  };
  D.lessonCard.essais = [{}, { checks: [0, 1] }];

  /* 42 · carte du Bedside-Test (test AB0 au lit) — ancrage : centre ; 340 × 220 ; deux champs ronds « Anti-A », « Anti-B » (.tw 16) ;
   * légende : goutte lisse « − » / goutte en grumeaux « + » ; ligne « Ergebnis: » (.tw 18) et « = 0 » manuscrit (Kalam 60).
   * o.drops [2 × 0..1] : le sang du PATIENT s'étale dans chaque champ · o.react 0..1 : on mélange — ici les champs restent LISSES (pas
   * d'agglutination = groupe 0) · o.legend 0..1 : la légende « − » s'allume (anneau jaune) · o.result 0..1 : « = 0 » s'écrit (de gauche à
   * droite). Ancres : fields (centres des champs, repère de la carte), result */
  D.bedsideCard = (g, o = {}) => {
    o = Object.assign({ drops: [0, 0], react: 0, legend: 0, result: 0, seed: 4221 }, o);
    const C = U.ctx(g, o.seed, false, 1), FL = [[-82, -16], [82, -16]], R = 42;
    shadow(g, U.rrect(-170, -110, 340, 220, 12), 8, 9);
    U.shape(C, "card", U.rrect(-170, -110, 340, 220, 12), MAT.white, { sw: 3 });
    el("rect", { x: -166, y: -106, width: 332, height: 22, rx: 8, fill: "#EDEDE8" }, g);
    let bx = -152; for (let i = 0; i < 14; i++) { const w = [2, 1, 3, 1][i % 4] * 1.4; el("rect", { x: f(bx), y: -102, width: f(w), height: 14, fill: INK }, g); bx += w + [1.6, 2.4, 1.2][i % 3] * 1.4; }
    ["Anti-A", "Anti-B"].forEach((s, i) => {
      const [x, y] = FL[i];
      tw(g, s, x, y - R - 10, 16, {});
      el("circle", { cx: x, cy: y, r: R, fill: "#FAF6F2", stroke: INK, "stroke-width": 2.6 }, g);
      el("circle", { cx: x, cy: y, r: R - 8, fill: "none", stroke: "#B9B9B2", "stroke-width": 1.4, "stroke-dasharray": "4 4" }, g);
      const d = clamp((o.drops || [])[i] || 0, 0, 1);
      if (d > 0.02) {   // la goutte s'étale ; mélangée (react), elle devient un disque lisse et uniforme : aucun grumeau
        const rr = lerp(6, R - 11, E(d)), rc = clamp(o.react, 0, 1), pts = [];
        for (let k = 0; k < 10; k++) { const a = (k / 10) * 6.283, w = 1 + (1 - rc) * 0.16 * Math.sin(k * 2.3 + i); pts.push([x + rr * w * Math.cos(a), y + rr * w * Math.sin(a) * 0.96]); }
        el("path", { d: U.blob(pts), fill: mixc("#C2473F", RED, rc), stroke: RED2, "stroke-width": 1.6 }, g);
        ln(g, `M${f(x - rr * 0.5)} ${f(y - rr * 0.45)} Q${f(x - rr * 0.1)} ${f(y - rr * 0.7)} ${f(x + rr * 0.3)} ${f(y - rr * 0.55)}`, 2, "#E8A49D");
      }
    });
    // légende : « lisse = − » / « grumeaux = + »
    const lx = -160, ly = 76;
    if (o.legend > 0.02) el("ellipse", { cx: lx + 25, cy: ly - 4, rx: 29, ry: 19, fill: YEL, opacity: f(0.55 * clamp(o.legend, 0, 1)) }, g);
    el("circle", { cx: lx + 12, cy: ly - 4, r: 9, fill: RED, stroke: RED2, "stroke-width": 1.4 }, g); tw(g, "−", lx + 36, ly + 3, 20, {});
    el("circle", { cx: lx + 76, cy: ly - 4, r: 11, fill: "#FAF6F2", stroke: INK, "stroke-width": 1.4 }, g);
    [[-4, -4], [4, -6], [-1, 3], [5, 3], [-6, 3]].forEach(([dx, dy], k) => el("circle", { cx: lx + 76 + dx, cy: ly - 4 + dy, r: k % 2 ? 2.6 : 3.2, fill: RED2 }, g));
    tw(g, "+", lx + 100, ly + 3, 20, {});
    // « Ergebnis: » + « = 0 » manuscrit
    tw(g, "Ergebnis:", -28, ly + 2, 18, { anchor: "start" });
    ln(g, `M-28 ${ly + 12} L158 ${ly + 12}`, 1.4, "#8A8A84");
    const r = clamp(o.result, 0, 1);   // « = 0 » (Kalam 56 ≈ 88 px) s'écrit de gauche à droite (découpe par un <svg> imbriqué : aucun id)
    if (r > 0.02) { const s = el("svg", { x: 74, y: ly - 56, width: f(94 * r), height: 82, overflow: "hidden" }, g); U.text(s, "= 0", 2, 62, 56, { anchor: "start" }); }
    return { fields: FL, result: [118, ly - 12], w: 340, h: 220 };
  };
  D.bedsideCard.essais = [{}, { drops: [1, 0.5], react: 0.3 }, { drops: [1, 1], react: 1, legend: 1, result: 1 }];

  /* 42 · tube d'échantillon du PATIENT (son bracelet en pictogramme sur l'étiquette), tenu pointe en bas : bouchon en haut, sang, embout
   * compte-gouttes en bas — ancrage : la POINTE (d'où tombent les gouttes) ; 30 × 112 au-dessus de la pointe
   * o.level 0..1 · o.slope (°) : la surface reste horizontale quand le nœud est incliné (passer l'angle du nœud) · o.drop 0..1 : goutte qui
   * se forme à la pointe (taille) */
  D.sampleTube = (g, o = {}) => {
    o = Object.assign({ level: 0.7, slope: 0, drop: 0, seed: 4231 }, o);
    const C = U.ctx(g, o.seed, false, 1), body = "M-14 -96 L14 -96 L14 -28 Q14 -16 6 -12 L-6 -12 Q-14 -16 -14 -28 Z";
    shadow(g, body, 4, 5);
    el("path", { d: body, fill: "#FFFFFF" }, g);
    const lv = clamp(o.level, 0, 1), ys = lerp(-16, -88, lv), sl = Math.tan(rad(o.slope || 0));
    if (lv > 0.02) {   // le sang suit l'intérieur du tube ; sa surface reste horizontale (o.slope)
      const yl = clamp(ys - 12 * sl, -94, -18), yr = clamp(ys + 12 * sl, -94, -18);
      el("path", { d: `M-12 ${f(yl)} L12 ${f(yr)} L12 -28 Q12 -18 5 -14 L-5 -14 Q-12 -18 -12 -28 Z`, fill: RED, stroke: RED2, "stroke-width": 1.2 }, g);
    }
    U.stroke(C, "tube", body, { sw: 2.4, r: 0.4 });
    ln(g, "M-9 -88 L-9 -32", 2.2, "#FFFFFF", { opacity: 0.85 });
    // étiquette + bracelet (c'est le sang du patient)
    el("path", { d: U.rrect(-13, -78, 26, 34, 2), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
    PICTO.band(g, -2, -61, 0.36);
    // bouchon en haut, embout compte-gouttes en bas
    U.shape(C, "cap", U.rrect(-17, -112, 34, 18, 4), MAT.mid, { sw: 2.2 }); ln(g, "M-12 -106 L12 -106", 1.4, "#F4F4EF");
    el("path", { d: "M-6 -13 L6 -13 L3 -2 L-3 -2 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" }, g);
    const dp = clamp(o.drop, 0, 1);
    if (dp > 0.04) { const r = 2 + 3.6 * dp; el("path", { d: `M0 -1 Q${f(r * 0.6)} ${f(r * 0.5)} ${f(r)} ${f(r * 1.4)} A${f(r)} ${f(r)} 0 1 1 ${f(-r)} ${f(r * 1.4)} Q${f(-r * 0.6)} ${f(r * 0.5)} 0 -1 Z`, fill: RED, stroke: RED2, "stroke-width": 1 }, g); }
    return { tip: [0, 0], top: [0, -112] };
  };
  D.sampleTube.essais = [{}, { level: 0.5, slope: 35, drop: 1 }];

  /* ═════════════════════════ D. LE SANG NE REVIENT PAS (scène 25) ═════════════════════════ */

  /* 46 · touche « ◀◀ » de magnétophone, entre ses deux voisines (▶ et ■, plus basses) — ancrage : centre ; 150 × 110
   * o.down 0..1 : la touche s'enfonce de 18 px dans sa fente · o.grey 0..1 : son « ◀◀ » devient gris (fin de la scène) */
  D.rewKey = (g, o = {}) => {
    o = Object.assign({ down: 0, grey: 0, seed: 4601 }, o);
    const C = U.ctx(g, o.seed, false, 1), dn = 18 * clamp(o.down, 0, 1), ic = mixc(INK, "#A9A9A2", o.grey);
    shadow(g, U.rrect(-75, 0, 150, 52, 8), 6, 7);
    U.shape(C, "plate", U.rrect(-75, 0, 150, 52, 8), MAT.mid, { sw: 2.8 });
    ln(g, "M-66 44 L66 44", 1.6, "#F4F4EF");
    // les deux voisines (vues plus basses)
    [[-62, "play"], [62, "stop"]].forEach(([x, k]) => {
      el("path", { d: U.rrect(x - 12, -8, 24, 22, 4), fill: "#DADAD4", stroke: INK, "stroke-width": 2 }, g);
      if (k === "play") el("path", { d: `M${x - 4} -2 L${x + 5} 3 L${x - 4} 8 Z`, fill: "#77776F" }, g); else el("rect", { x: x - 4, y: -1, width: 8, height: 8, fill: "#77776F" }, g);
    });
    // la touche : face avant (s'enfonce) + dessus
    const top = -56 + dn;
    el("rect", { x: -44, y: f(top + 14), width: 88, height: f(Math.max(2, 60 - dn)), fill: "rgba(28,26,28,.22)", transform: "translate(5 0)" }, g);
    U.shape(C, "front", `M-44 ${f(top + 14)} L44 ${f(top + 14)} L44 6 L-44 6 Z`, MAT.light, { sw: 2.6 });
    U.shape(C, "top", `M-40 ${f(top)} L40 ${f(top)} L44 ${f(top + 14)} L-44 ${f(top + 14)} Z`, { base: "#FBFBF8" }, { sw: 2.4 });
    el("path", { d: `M-4 ${f(top + 22)} L-28 ${f(top + 34)} L-4 ${f(top + 46)} Z M24 ${f(top + 22)} L0 ${f(top + 34)} L24 ${f(top + 46)} Z`, fill: ic, stroke: ic, "stroke-width": 2, "stroke-linejoin": "round" }, g);
    el("rect", { x: -48, y: 4, width: 96, height: 6, rx: 2, fill: "#2B2A2B" }, g);   // la fente
    return { w: 150, h: 110, top: [0, top] };
  };
  D.rewKey.essais = [{}, { down: 1 }, { grey: 1 }];

  /* 46 · trois pages de planning sur une planchette à pince, qui REVIENNENT (rembobinage : elles redescendent de la pince l'une après
   * l'autre) — ancrage : coin haut gauche ; 200 × 260. Pages = grilles de cases (aucune date, aucun jour : ce n'est pas un calendrier).
   * o.p 0..1 : la page k (0, 1, 2) redescend entre p = k/3 et (k+1)/3 (elle « vient vers nous » en bas, puis se plaque)
   * o.part : "all" | "board" (planchette, page du fond, pince : statique) | "pages" (les pages qui tournent : à chaque image ; nœud posé
   * entre « board » et la pince → passer o.clip false à "board" et dessiner la pince avec part "clip") */
  const PAGE_FILL = [[0, 1, 2, 4, 5, 9, 10, 13], [1, 2, 3, 6, 8, 11, 14], [0, 3, 4, 5, 7, 12, 13, 15]];
  function pageGrid(g, x0, y0, w, h, k, cell) {   // grille 4 × 4 « déformée » (page en perspective) : coins [haut gauche, haut droit, bas droit, bas gauche]
    const Q = (u, v) => [lerp(lerp(x0[0], y0[0], u), lerp(h[0], w[0], u), v), lerp(lerp(x0[1], y0[1], u), lerp(h[1], w[1], u), v)];
    let d = ""; const n = 4;
    for (let i = 0; i <= n; i++) { const a = Q(0.1 + (i / n) * 0.8, 0.14), b = Q(0.1 + (i / n) * 0.8, 0.9); d += `M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}`; }
    for (let j = 0; j <= n; j++) { const a = Q(0.1, 0.14 + (j / n) * 0.76), b = Q(0.9, 0.14 + (j / n) * 0.76); d += `M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}`; }
    let fd = "";
    (PAGE_FILL[k % 3]).forEach((c) => { const i = c % 4, j = Math.floor(c / 4), u0 = 0.1 + i * 0.2, v0 = 0.14 + j * 0.19, P1 = Q(u0, v0), P2 = Q(u0 + 0.2, v0), P3 = Q(u0 + 0.2, v0 + 0.19), P4 = Q(u0, v0 + 0.19); fd += `M${f(P1[0])} ${f(P1[1])}L${f(P2[0])} ${f(P2[1])}L${f(P3[0])} ${f(P3[1])}L${f(P4[0])} ${f(P4[1])}Z`; });
    el("path", { d: fd, fill: "#4A4A46", opacity: 0.75 }, g);
    el("path", { d, fill: "none", stroke: INK, "stroke-width": cell || 1.6 }, g);
    const t1 = Q(0.1, 0.07), t2 = Q(0.6, 0.07); ln(g, `M${f(t1[0])} ${f(t1[1])} L${f(t2[0])} ${f(t2[1])}`, 2.4, "#9A9A94");
  }
  D.pageFlip = (g, o = {}) => {
    o = Object.assign({ p: 0, part: "all", clip: true, seed: 4611 }, o);
    const P = o.part, C = U.ctx(g, o.seed, false, 1), HX = 100, HY = 30, PW = 176, PH = 214;
    if (P === "all" || P === "board") {
      shadow(g, U.rrect(0, 0, 200, 260, 12), 8, 10);
      U.shape(C, "board", U.rrect(0, 0, 200, 260, 12), MAT.mid, { sw: 2.8 });
      ln(g, "M10 250 L190 250", 1.6, "#F4F4EF");
      el("path", { d: U.rrect(12, 30, PW, PH + 4, 3), fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g);
      pageGrid(g, [12, 30], [188, 30], [188, 248], [12, 248], 2, 1.6);
    }
    if (P === "all" || P === "pages") {
      const pp = clamp(o.p, 0, 1);
      for (let k = 0; k < 3; k++) {
        const u = clamp(pp * 3 - k, 0, 1); if (u <= 0.001) continue;
        const e = E(u), bulge = Math.sin(u * Math.PI), yb = HY + PH * e, wb = PW * (1 + 0.14 * bulge), xb = HX - wb / 2;
        const TL = [HX - PW / 2, HY], TR = [HX + PW / 2, HY], BR = [xb + wb, yb + 12 * bulge], BL = [xb, yb + 12 * bulge];
        el("path", { d: `M${f(TL[0] + 6)} ${f(TL[1] + 8)} L${f(TR[0] + 6)} ${f(TR[1] + 8)} L${f(BR[0] + 8)} ${f(BR[1] + 10)} L${f(BL[0] + 8)} ${f(BL[1] + 10)} Z`, fill: "rgba(28,26,28,.16)" }, g);
        el("path", { d: `M${f(TL[0])} ${f(TL[1])} L${f(TR[0])} ${f(TR[1])} L${f(BR[0])} ${f(BR[1])} L${f(BL[0])} ${f(BL[1])} Z`, fill: u < 0.98 ? mixc("#E6E6E1", "#FFFFFF", e) : "#FFFFFF", stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, g);
        if (e > 0.18) pageGrid(g, TL, TR, BR, BL, k, 1.4);
      }
    }
    if ((P === "all" && o.clip) || P === "clip") {   // la pince
      U.shape(C, "clip", U.rrect(56, 8, 88, 34, 8), MAT.grey, { sw: 2.6 });
      el("path", { d: "M74 8 Q100 -10 126 8", fill: "none", stroke: INK, "stroke-width": 4 }, g);
      el("circle", { cx: 100, cy: 25, r: 6, fill: "#F4F4EF", stroke: INK, "stroke-width": 1.8 }, g);
    }
    return { w: 200, h: 260, hinge: [HX, HY] };
  };
  D.pageFlip.essais = [{}, { p: 0.15 }, { p: 0.55 }, { p: 1 }];

  /* 46 · grande chambre compte-gouttes (gros plan) — ancrage : haut centre (raccord à l'embout de la poche) ; 110 × 190 : perforateur
   * (y 0…30), cylindre transparent (y 30…170), sang au fond (o.level), sortie qui rétrécit vers la tubulure (y 170…190 ; ancre bottom)
   * o.drop : −1 = aucune goutte ; 0…0,35 = la goutte se forme à l'orifice (taille) ; 0,35…1 = elle tombe jusqu'à la surface · o.hang (px :
   * la goutte qui pend tremble : décalage) · o.ripple 0..1 : onde sur la surface après la chute · o.tint 1 = sang
   * o.part : "all" | "back" (fond du cylindre) | "fluid" (sang, goutte, onde : à chaque image) | "front" (contour, reflets, perforateur) */
  D.dripBig = (g, o = {}) => {
    o = Object.assign({ drop: 0.3, hang: 0, ripple: 0, level: 0.3, tint: 1, part: "all", seed: 4621 }, o);
    const P = o.part, C = U.ctx(g, o.seed, false, 1), col = mixc("#CFCFC9", RED, o.tint), dk = mixc("#8F8F89", RED2, o.tint);
    const cyl = "M-46 42 Q-46 30 -34 30 L34 30 Q46 30 46 42 L46 158 Q46 170 34 170 L-34 170 Q-46 170 -46 158 Z";
    const ys = lerp(166, 70, clamp(o.level, 0, 1)), orif = 52;
    if (P === "all" || P === "back") {
      shadow(g, cyl, 7, 8);
      el("path", { d: cyl, fill: "#FCFCF9" }, g);
      el("path", { d: "M-40 44 L-40 160", stroke: "#EDEDE8", "stroke-width": 8, fill: "none" }, g);
    }
    if (P === "all" || P === "fluid") {
      el("path", { d: `M-44 ${f(ys)} Q-22 ${f(ys - 4)} 0 ${f(ys)} Q22 ${f(ys + 4)} 44 ${f(ys)} L44 158 Q44 168 34 168 L-34 168 Q-44 168 -44 158 Z`, fill: col, stroke: dk, "stroke-width": 1.6 }, g);
      ln(g, `M-44 ${f(ys)} Q-22 ${f(ys - 4)} 0 ${f(ys)} Q22 ${f(ys + 4)} 44 ${f(ys)}`, 2.4, dk);
      const rp = clamp(o.ripple, 0, 1);
      if (rp > 0.02 && rp < 0.99) [0, 0.35].forEach((k) => { const q = clamp(rp - k, 0, 1) / (1 - k); if (q > 0.02 && q < 0.99) el("ellipse", { cx: 0, cy: f(ys), rx: f(6 + 34 * q), ry: f(2 + 6 * q), fill: "none", stroke: "#F3C9C4", "stroke-width": 2.4, opacity: f(1 - q) }, g); });
      const dr = o.drop;
      if (dr >= 0) {
        let cy, r;
        if (dr < 0.35) { r = 3 + 6 * (dr / 0.35); cy = orif + r * 0.9; }
        else { const q = (dr - 0.35) / 0.65; r = 9; cy = lerp(orif + 8, ys - 8, q * q); }
        const x = o.hang || 0;
        el("path", { d: `M${f(x)} ${f(cy - r * 1.5)} Q${f(x + r)} ${f(cy - r * 0.2)} ${f(x + r * 0.95)} ${f(cy + r * 0.3)} Q${f(x + r * 0.8)} ${f(cy + r)} ${f(x)} ${f(cy + r)} Q${f(x - r * 0.8)} ${f(cy + r)} ${f(x - r * 0.95)} ${f(cy + r * 0.3)} Q${f(x - r)} ${f(cy - r * 0.2)} ${f(x)} ${f(cy - r * 1.5)} Z`, fill: col, stroke: dk, "stroke-width": 1.4 }, g);
        ln(g, `M${f(x - r * 0.4)} ${f(cy - r * 0.2)} Q${f(x - r * 0.3)} ${f(cy + r * 0.4)} ${f(x)} ${f(cy + r * 0.6)}`, 1.8, "#F3C9C4");
      }
    }
    if (P === "all" || P === "front") {
      U.stroke(C, "cyl", cyl, { sw: 3, r: 0.4 });
      ln(g, "M-34 40 L-34 160", 3.4, "#FFFFFF", { opacity: 0.9 }); ln(g, "M30 46 L30 100", 2, "#FFFFFF", { opacity: 0.8 });
      [60, 100, 140].forEach((y) => ln(g, `M38 ${y} L46 ${y}`, 1.6, "#9A9A94"));
      // le perforateur (en haut) : col, ailettes, orifice
      U.shape(C, "spike", "M-12 0 L12 0 L14 30 L-14 30 Z", MAT.white, { sw: 2.4 });
      U.shape(C, "wing", U.rrect(-30, 18, 60, 14, 5), MAT.mid, { sw: 2.4 });
      el("path", { d: `M-6 30 L6 30 L4 ${orif} L-4 ${orif} Z`, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g);
      // la sortie (vers la tubulure)
      el("path", { d: "M-16 170 L16 170 L10 190 L-10 190 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4, "stroke-linejoin": "round" }, g);
      el("path", { d: "M-10 172 L10 172 L7 188 L-7 188 Z", fill: col, opacity: 0.9 }, g);
    }
    return { top: [0, 0], bottom: [0, 190], surface: ys, orifice: [0, orif], w: 110, h: 190 };
  };
  D.dripBig.essais = [{}, { drop: 0.7 }, { drop: -1, ripple: 0.4, level: 0.34 }, { part: "front" }];

  /* ═════════════════════════ ajouts partie 4 (étape « scènes, partie 4 ») ═════════════════════════ */

  /* plateau du banc des juges vu de face (scène 21 : le dossier y est posé) — ancrage : coin haut gauche du plateau ; o.w × o.h ;
   * chant arrondi, façade à panneaux en creux, ombre du dossier sur le bois (o.shadowX, o.shadowW) */
  D.benchTop = (g, o = {}) => {
    o = Object.assign({ w: 1360, h: 420, panel: 220, shadowX: null, shadowW: 560, seed: 4701 }, o);
    const { w, h } = o, C = U.ctx(g, o.seed, false, 1);
    U.shape(C, "front", `M0 26 L${w} 26 L${w} ${h} L0 ${h} Z`, MAT.wood, { sw: 2.6 });
    for (let x = 40, i = 0; x + o.panel - 40 < w; x += o.panel, i++) U.stroke(C, "pn" + i, U.rrect(x, 62, o.panel - 40, h - 100, 4), { sw: 1.8, stroke: "#8A7F68", r: 0.6 });
    if (o.shadowX != null) el("path", { d: `M${o.shadowX} 26 L${o.shadowX + o.shadowW} 26 L${o.shadowX + o.shadowW - 30} 60 L${o.shadowX - 30} 60 Z`, fill: "rgba(28,26,28,.14)" }, g);
    U.shape(C, "edge", U.rrect(-6, 0, w + 12, 28, 10), MAT.mid, { sw: 2.8 });
    ln(g, `M8 7 L${w - 8} 7`, 2, "#F4F4EF");
    return { top: 0, w, h };
  };
  D.benchTop.essais = [{ w: 900, h: 300, shadowX: 200 }];

  /* coin de lit d'hôpital (scène 22) d'où sort l'avant-bras du patient avec son bracelet d'identité — ancrage : bas gauche (sol) ;
   * 125 × 180 ; couette (pli qui recouvre le bras à droite), cadre métallique, un pied à roulette. Ancres : band (le bracelet), hand */
  D.bedCorner = (g, o = {}) => {
    o = Object.assign({ w: 125, seed: 4711 }, o);
    const w = o.w, C = U.ctx(g, o.seed, false, 1);
    el("ellipse", { cx: 22, cy: 2, rx: 26, ry: 4, fill: "rgba(28,26,28,.15)" }, g);
    U.shape(C, "leg", U.rrect(12, -66, 14, 56, 3), MAT.alu, { sw: 2 });
    el("circle", { cx: 19, cy: -8, r: 8, fill: "#4A4A46", stroke: INK, "stroke-width": 2 }, g); el("circle", { cx: 19, cy: -8, r: 2.6, fill: "#DADAD4" }, g);
    U.shape(C, "frame", U.rrect(0, -76, w + 12, 18, 4), MAT.grey, { sw: 2.4 });
    shadow(g, `M0 -70 Q-4 -160 30 -168 L${w + 12} -170 L${w + 12} -66 Q60 -58 0 -70 Z`, 6, 7);
    U.shape(C, "duvet", `M0 -70 Q-4 -160 30 -168 L${w + 12} -170 L${w + 12} -66 Q60 -58 0 -70 Z`, MAT.milk, { sw: 2.8 });
    ln(g, "M14 -96 Q40 -104 70 -98 M8 -128 Q22 -150 44 -156", 1.6, "#A9A9A2");
    // l'avant-bras posé sur la couette (même peau blanche que Persona), la main en moufle à gauche, le bracelet au poignet
    U.shape(C, "arm", `M44 -156 L${w + 12} -160 L${w + 12} -134 L46 -134 Q38 -145 44 -156 Z`, MAT.white, { sw: 2.4 });
    U.shape(C, "hand", U.blob([[46, -157], [30, -160], [16, -154], [10, -145], [14, -135], [28, -131], [46, -134]]), MAT.white, { sw: 2.4 });
    ln(g, "M18 -146 Q26 -142 34 -147", 1.4, "#8A8A84");
    D.wristband(el("g", { transform: "translate(60 -145)" }, g), { angle: 180, len: 30 });
    // le pli de la couette retombe sur le bras, à droite
    U.shape(C, "fold", `M${w - 22} -174 Q${w - 34} -146 ${w - 20} -120 L${w + 12} -118 L${w + 12} -174 Z`, MAT.milk, { sw: 2.4 });
    return { band: [60, -145], hand: [28, -145], w: w + 12, h: 180 };
  };
  D.bedCorner.essais = [{}];

  /* coin de table (scène 24 : la feuille y glisse) — ancrage : coin haut gauche du plateau ; o.w × 150 (sol à y 150) */
  D.tableCorner = (g, o = {}) => {
    o = Object.assign({ w: 125, seed: 4721 }, o);
    const w = o.w, C = U.ctx(g, o.seed, false, 1);
    el("ellipse", { cx: 22, cy: 150, rx: 24, ry: 4, fill: "rgba(28,26,28,.15)" }, g);
    U.shape(C, "leg", U.rrect(10, 40, 16, 110, 3), MAT.wood, { sw: 2.2 });
    U.shape(C, "apron", U.rrect(0, 16, w + 12, 30, 3), MAT.wood, { sw: 2.4 });
    U.shape(C, "top", U.rrect(-6, 0, w + 18, 18, 5), MAT.mid, { sw: 2.6 });
    ln(g, `M6 5 L${w + 6} 5`, 1.8, "#F4F4EF");
    return { top: 0, w: w + 12 };
  };
  D.tableCorner.essais = [{}];

  /* ═════════════════════════ ajouts revue visuelle ═════════════════════════ */

  /* buste sous une tête Persona en gros plan (scènes 10 et 23 : la tête seule « flottait » sur le papier, cou coupé net) — repère =
   * celui de Persona.head (origine = centre de la tête, à la même échelle) ; dessiné PAR-DESSUS la tête : le col (y ≈ 76) recouvre le bas
   * du cou (y 84–90), le menton (y 66) reste libre. Épaules arrondies, bas du buste coupé en arrondi (« avatar »).
   * o.outfit "coat" (blouse blanche ouverte sur un haut gris, revers) | "scrubs" (haut gris, col en V) ; o.badge (badge jaune VIERGE) ;
   * o.w : demi-largeur aux épaules (66) ; o.bottom : bas du buste (196). */
  D.bust04 = (g, o = {}) => {
    o = Object.assign({ outfit: "coat", badge: false, w: 66, bottom: 196, seed: 4731 }, o);
    const w = o.w, b = o.bottom, C = U.ctx(g, o.seed, false, 1);
    const body = `M-15 74 Q-44 74 ${-w} 100 Q${-w - 9} 118 ${-w - 8} 150 L${-w - 6} ${b - 8} Q0 ${b + 14} ${w + 6} ${b - 8} L${w + 8} 150 Q${w + 9} 118 ${w} 100 Q44 74 15 74 Z`;
    el("path", { d: body, fill: "rgba(28,26,28,.10)", transform: "translate(6 7)" }, g);
    if (o.outfit === "coat") {
      U.shape(C, "coat", body, MAT.white, { sw: 2.6 });
      // le haut gris entre les revers, le col en V (peau), les deux revers
      U.shape(C, "top", `M-17 76 L-30 118 L-12 ${b + 2} L12 ${b + 2} L30 118 L17 76 Q0 82 -17 76 Z`, MAT.grey, { sw: 2.2 });
      U.shape(C, "vneck", "M-12 77 L0 104 L12 77 Q0 83 -12 77 Z", MAT.skin, { sw: 2 });
      U.stroke(C, "lapL", `M-17 76 L-34 116 L-22 124 L-14 ${b + 3}`, { sw: 2.2 });
      U.stroke(C, "lapR", `M17 76 L34 116 L22 124 L14 ${b + 3}`, { sw: 2.2 });
      ln(g, `M${-w + 12} 112 Q${-w + 8} 150 ${-w + 12} ${b - 12} M${w - 12} 112 Q${w - 8} 150 ${w - 12} ${b - 12}`, 1.5, "#A9A9A2");   // plis des manches
      el("rect", { x: -w + 22, y: 140, width: 26, height: 4, rx: 2, fill: "#A9A9A2" }, g);                                               // poche de poitrine
      if (o.badge) { el("path", { d: U.rrect(w - 52, 132, 28, 36, 4), fill: YEL, stroke: INK, "stroke-width": 2 }, g); el("rect", { x: w - 44, y: 128, width: 12, height: 8, rx: 2, fill: "#DADAD4", stroke: INK, "stroke-width": 1.6 }, g); }
    } else {
      U.shape(C, "top", body, MAT.grey, { sw: 2.6 });
      U.shape(C, "vneck", "M-14 75 L0 112 L14 75 Q0 82 -14 75 Z", MAT.skin, { sw: 2 });
      ln(g, `M${-w + 10} 110 Q${-w + 6} 150 ${-w + 10} ${b - 12} M${w - 10} 110 Q${w - 6} 150 ${w - 10} ${b - 12}`, 1.5, "#8A8A84");
    }
    return { neck: [0, 76], bottom: b, w };
  };
  D.bust04.essais = [{}, { badge: true }, { outfit: "scrubs" }];

  /* ───────── moniteur de chevet AU MUR (retour de l'auteur, 28.11.2026 : « le bip bip », la mort qui se voit) — origine : centre du boîtier.
   * Écran sombre, tracé ECG jaune qui BALAIE de gauche à droite comme un vrai moniteur (barre d'effacement devant le stylet), FC à droite,
   * petit cœur qui bat. o.t (s), o.beats = [[instant, amplitude], …] (les mêmes que le son), o.flat = instant de la ligne plate (null = jamais).
   * Boîtier 176 × 124 + bras et platine au-dessus (≈ y −112). */
  D.monitor04 = (g, o) => {
    g.innerHTML = ""; o = Object.assign({ t: 0, beats: [], flat: null, W: 2.0, seed: 404 }, o);
    const C = U.ctx(g, o.seed, false, 1), t = o.t, dead = o.flat != null && t >= o.flat;
    // bras articulé + platine murale
    U.shape(C, "plate", U.rrect(-26, -118, 52, 14, 4), MAT.grey, { sw: 2.2 });
    ln(g, "M0 -104 L0 -86 M-10 -86 L10 -86", 6, INK); el("circle", { cx: 0, cy: -95, r: 5, fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g);
    shadow(g, U.rrect(-88, -62, 176, 124, 14));
    U.shape(C, "case", U.rrect(-88, -62, 176, 124, 14), MAT.grey, { sw: 2.8 });
    const SX = -78, SY = -52, SW = 122, SH = 92;                          // écran (tracé) ; colonne des chiffres à droite
    el("rect", { x: SX, y: SY, width: 156, height: SH, rx: 6, fill: "#26282A", stroke: INK, "stroke-width": 2.2 }, g);
    if (dead) el("rect", { x: SX + 2, y: SY + 2, width: 152, height: SH - 4, rx: 5, fill: "none", stroke: "#E0574A", "stroke-width": 3, opacity: 0.55 + 0.45 * Math.round((t * 2) % 1) }, g);
    // ECG à l'instant tau : somme des complexes P-QRS-T des battements passés (rien après la ligne plate)
    const ecg = (tau) => {
      if (o.flat != null && tau >= o.flat) return 0;
      let v = 0;
      for (const [b, a] of o.beats) { const d = tau - b; if (d < -0.25 || d > 0.4) continue;
        v += a * (0.13 * Math.exp(-(((d + 0.16) / 0.04) ** 2)) - 0.16 * Math.exp(-(((d + 0.03) / 0.014) ** 2)) + Math.exp(-((d / 0.018) ** 2))
          - 0.32 * Math.exp(-(((d - 0.035) / 0.016) ** 2)) + 0.26 * Math.exp(-(((d - 0.23) / 0.055) ** 2))); }
      return v;
    };
    const pen = ((t % o.W) / o.W) * SW, gap = 10, base = SY + SH * 0.62;
    let d = "", prevOn = false;
    for (let x = 0; x <= SW; x += 1.5) {
      const back = (pen - x + SW) % SW; if (back < gap && back > 0.01) { prevOn = false; continue; }   // barre d'effacement devant le stylet
      const tau = t - (back / SW) * o.W, y = base - 46 * ecg(tau);
      d += (prevOn ? " L" : " M") + `${f(SX + 4 + x * (SW - 8) / SW)} ${f(y)}`; prevOn = true;
    }
    if (d) el("path", { d: d.trim(), fill: "none", stroke: dead ? "#F0F0EA" : "#F8CE4E", "stroke-width": 2.6, "stroke-linejoin": "round", "stroke-linecap": "round" }, g);
    // fréquence : 60 / dernier intervalle
    const past = o.beats.filter(([b]) => b <= t).map(([b]) => b);
    const hr = dead ? "0" : past.length > 1 ? String(Math.round(60 / (past[past.length - 1] - past[past.length - 2]))) : "78";
    U.text(g, "HR", 60, SY + 18, 13, { weight: 700, fill: "#BFC3BC" });
    U.text(g, hr, 60, SY + 50, 30, { weight: 700, fill: dead ? "#FF8A7E" : "#F8CE4E" });
    // petit cœur : il bat (0,13 s) à chaque battement ; vide après la ligne plate
    const last = past.length ? past[past.length - 1] : -9, k = !dead && t - last < 0.13 ? 1.3 : 1;
    el("path", { d: "M0 0 c -5 -7 -14 0 -7 7 l 7 7 l 7 -7 c 7 -7 -2 -14 -7 -7 z", fill: dead ? "none" : "#E0574A", stroke: dead ? "#BFC3BC" : "#1C1A1C", "stroke-width": 1.4,
      transform: `translate(60 ${SY + 66}) scale(${k})` }, g);
    // boutons du boîtier ; voyant d'alarme qui clignote après la ligne plate
    [-50, -26, -2].forEach((x, i) => el("circle", { cx: x, cy: 50, r: 5, fill: i === 0 ? YEL : "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g));
    el("circle", { cx: 70, cy: 50, r: 6, fill: dead && (t * 2) % 1 < 0.5 ? "#E0574A" : "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
  };
  D.monitor04.essais = [{ t: 1.2, beats: [[0.3, 1], [1.08, 1]] }, { t: 3, beats: [[1, 1], [1.9, 0.6]], flat: 2.4 }];
})();
