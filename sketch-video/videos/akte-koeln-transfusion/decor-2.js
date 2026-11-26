/* decor-2.js — AKTE 04 « 63 ساعة » : décors et objets PROPRES à l'épisode, 2e partie = tout ce que demandent les scènes 7 à 20
 * (couloir du samedi soir, tableau du personnel, passe-plat du labo, Begleitdokument, la chambre et la loupe, l'effondrement, le bureau
 * de l'administration, les mois, le retour au tribunal, la balance qui se vide puis se remplit). Aucun dessin repris d'un autre épisode.
 * Mêmes conventions que decor.js (lire son en-tête) : D.nom(g, o) dessine autour de son ancrage (0,0) ; o = paramètres animés (arrondis) ;
 * ombre décalée #D2D2CB ; rouge sang sur le sang seulement ; texte « machine à écrire » par tw(). Aides partagées : D.kit (decor.js).
 * Pièces animées : quand un objet a une partie qui bouge à chaque image, o.part sépare le statique (tracé rough, coûteux) du mobile
 * (tracé net, peu coûteux) : clock04 « face » / « hands » · nightWindow, seasonWindow « frame » / « sky » · bedFront04 « duvet » / « frame »
 * · labHatch « inside » / « shutter » / « front » · blinds « frame » / « slats » · cart « body » / « wheels ».
 * Les petites pièces qui se balancent ou tombent sont des fonctions à part, à poser dans leur propre nœud (m.pend, m.sway, m.build) :
 * ivHook, coatHung, binderSpine, labSign, stringTag, doorPlate.
 * Essai : node tools/essai_decor.mjs videos/akte-koeln-transfusion --cols 2 --per 6 (le cadre #stage rogne la planche à 1080 px de large).
 */
(function boot() {
  "use strict";
  // l'outil d'essai charge decor-2.js AVANT decor.js (tri alphabétique) : sans le kit, on attend que decor.js nous relance
  if (!(window.EpDecor && window.EpDecor.kit)) { const W = window.EpDecor = window.EpDecor || {}; (W._later = W._later || []).push(boot); return; }
  const SC = SketchCast, U = SC.util, D = window.EpDecor, K = D.kit;
  const { el, ln, tw, MAT, f, clamp, lerp, hs, mixc, circ, poly, pin, segX, floorFade, INK, YEL, SH, PAPER, RED, RED2 } = K;
  const rad = (a) => (a * Math.PI) / 180, E = (t) => t * t * (3 - 2 * t);
  const shadow = (g, d, dx, dy) => el("path", { d, fill: SH, transform: `translate(${dx == null ? 7 : dx} ${dy == null ? 8 : dy})` }, g);
  // zone découpée (rectangle) sans id : un <svg> imbriqué dans le même repère (l'affiche-résumé recopie le SVG des scènes)
  const clipRect = (g, x, y, w, h) => el("svg", { x, y, width: w, height: h, viewBox: `${x} ${y} ${w} ${h}`, overflow: "hidden" }, g);
  // hachure nette à 45° dans un rectangle (un seul chemin : peu coûteux, stable d'une image à l'autre)
  function hatch(g, x, y, w, h, gap, col, sw, op) {
    let d = "";
    for (let x0 = x - h; x0 < x + w; x0 += gap) {
      const s0 = Math.max(0, x - x0), s1 = Math.min(h, x + w - x0); if (s1 <= s0) continue;
      d += `M${f(x0 + s0)} ${f(y + h - s0)}L${f(x0 + s1)} ${f(y + h - s1)}`;
    }
    return el("path", { d, fill: "none", stroke: col, "stroke-width": sw, opacity: op == null ? 1 : op }, g);
  }
  const star4 = (x, y, r) => `M${f(x)} ${f(y - r)} L${f(x + r * 0.28)} ${f(y - r * 0.28)} L${f(x + r)} ${f(y)} L${f(x + r * 0.28)} ${f(y + r * 0.28)} L${f(x)} ${f(y + r)} L${f(x - r * 0.28)} ${f(y + r * 0.28)} L${f(x - r)} ${f(y)} L${f(x - r * 0.28)} ${f(y - r * 0.28)} Z`;

  /* ═════════════════════════ C. HÔPITAL — couloir, tableau du personnel (scènes 7, 8) ═════════════════════════ */

  /* 30 · horloge ronde à bord épais — ancrage : centre ; Ø 100 (o.r 50) ; 12 traits, aiguilles, trotteuse jaune
   * o.time (heures décimales : 21.83 = 21 h 50) ou o.h / o.m (angles, °) · o.s (angle de la trotteuse, °)
   * o.sector 0..1 : secteur jaune pâle des o.sectorLen minutes à partir de o.sectorFrom (les 10 minutes de la scène 12)
   * o.part : "all" | "face" (cadran, secteur : statique) | "hands" (aiguilles : à chaque image) */
  D.clock04 = (g, o = {}) => {
    o = Object.assign({ r: 50, time: 21 + 50 / 60, h: null, m: null, s: 90, sector: 0, sectorFrom: 50, sectorLen: 10, part: "all", seed: 3001 }, o);
    const R = o.r, P = o.part, pt = (a, r) => [f(r * Math.sin(rad(a))), f(-r * Math.cos(rad(a)))];
    const ha = o.h != null ? o.h : ((((o.time % 12) + 12) % 12) * 30), ma = o.m != null ? o.m : ((((o.time % 1) + 1) % 1) * 360);
    if (P !== "hands") {
      const C = U.ctx(g, o.seed, false, 1);
      el("circle", { cx: 6, cy: 7, r: R, fill: SH }, g);
      U.shape(C, "rim", circ(0, 0, R), MAT.mid, { sw: 3 });
      el("circle", { cx: 0, cy: 0, r: R - 9, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2 }, g);
      ln(g, `M${f(-R * 0.62)} ${f(-R * 0.62)} A${R - 4.5} ${R - 4.5} 0 0 1 ${f(-R * 0.12)} ${f(-R + 4.8)}`, 2.4, "#FFFFFF");   // reflet sur le bord
      const sc = clamp(o.sector, 0, 1);
      if (sc > 0.01) {
        const a0 = o.sectorFrom * 6, a1 = a0 + o.sectorLen * 6 * sc, rr = R - 11, p0 = pt(a0, rr), p1 = pt(a1, rr);
        el("path", { d: `M0 0 L${p0[0]} ${p0[1]} A${rr} ${rr} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${p1[0]} ${p1[1]} Z`, fill: YEL, opacity: 0.6, stroke: "#D9A322", "stroke-width": 1.4 }, g);
      }
      for (let i = 0; i < 12; i++) { const big = i % 3 === 0, a = pt(i * 30, R - 12), b = pt(i * 30, R - (big ? 23 : 17)); ln(g, `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`, big ? 3.6 : 2, INK); }
    }
    if (P !== "face") {
      const hand = (a, len, w) => { const p = pt(a, len), q = pt(a + 180, len * 0.16); ln(g, `M${q[0]} ${q[1]} L${p[0]} ${p[1]}`, w, INK); };
      hand(ha, R * 0.5, 5.6); hand(ma, R * 0.74, 3.6);
      const s1 = pt(o.s, R * 0.78), s0 = pt(o.s + 180, R * 0.22);
      ln(g, `M${s0[0]} ${s0[1]} L${s1[0]} ${s1[1]}`, 4.2, INK); ln(g, `M${s0[0]} ${s0[1]} L${s1[0]} ${s1[1]}`, 2, YEL);
      el("circle", { cx: 0, cy: 0, r: 4.8, fill: YEL, stroke: INK, "stroke-width": 2 }, g);
    }
    return { r: R };
  };
  D.clock04.essais = [{}, { time: 13 + 37 / 60, s: 200 }, { time: 21 + 55 / 60, s: 300, sector: 0.6 }, { part: "face", sector: 1 }];

  /* 41 · sa fiche du personnel (posée SUR D.pinCard 240 × 300 : la fonction dessine la fiche elle-même si o.card) — ancrage : la punaise
   * cadre de la photo (la tête Persona y est posée par story.js : ancre head), bande jaune VIERGE à la place du nom (aucun nom),
   * deux lignes .tw tapées par story.js (ancres line1, line2) ; o.lines = [{ text, y, size }] pour un texte fixe */
  D.staffCard = (g, o = {}) => {
    o = Object.assign({ w: 240, h: 300, card: true, lines: null, seed: 4101 }, o);
    if (o.card) D.pinCard(g, { w: o.w, h: o.h, fold: 26, pin: false, seed: o.seed });
    const C = U.ctx(g, o.seed + 1, false, 1);
    el("rect", { x: -58, y: 52, width: 116, height: 112, rx: 3, fill: "#F1F1EC", stroke: INK, "stroke-width": 2.2 }, g);
    [[-58, 52, 1, 1], [58, 52, -1, 1], [-58, 164, 1, -1], [58, 164, -1, -1]].forEach(([x, y, sx, sy]) =>
      el("path", { d: `M${x} ${y} l${14 * sx} 0 l${-14 * sx} ${14 * sy} Z`, fill: "#77776F", stroke: INK, "stroke-width": 1.2, "stroke-linejoin": "round" }, g));   // coins photo
    U.shape(C, "name", U.rrect(-86, 176, 172, 22, 4), MAT.yellow, { sw: 2 });
    ln(g, "M-98 205 L98 205", 1.2, "#D2D2CB");
    (o.lines || []).forEach((l) => tw(g, l.text, 0, l.y, l.size || 18, {}));
    pin(g, 0, 0, 12, YEL);
    return { head: [0, 108], name: [0, 187], line1: [0, 220], line2: [0, 252] };
  };
  D.staffCard.essais = [{}, { lines: [{ text: "Assistenzärztin", y: 220, size: 20 }, { text: "seit 15.10.2010", y: 252, size: 18 }] }];

  /* 41 · une case de planning (46 px) numérotée dans le coin (.tw 14) — ancrage : coin haut gauche
   * o.fill 0 : case vide, juste le numéro · 1 : noircie au stylo (le geste de D.hourCol) et le numéro dans une petite pastille blanche
   * (scène 8 : la grille 3 × 3 = D.hourGrid { cols: 3, rows: 3 } ; dessous les 9 numéros fill 0 ; dessus 9 nœuds fill 1 révélés par wipe) */
  D.monthCell = (g, o = {}) => {
    o = Object.assign({ num: 1, fill: 1, cell: 46 }, o);
    if (o.fill) {
      D.hourCol(g, { rows: 1, cell: o.cell, seed: 30 + o.num });
      el("rect", { x: 3, y: 3, width: 15, height: 18, rx: 3, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.2 }, g);
    }
    tw(g, String(o.num), 10.5, 17, 14, {});
    return { w: o.cell, h: o.cell };
  };
  D.monthCell.essais = [{ num: 1, fill: 0 }, { num: 9, fill: 1 }];

  /* 41 · Blutführerschein : carte au format permis (coins ronds, case photo VIDE, goutte AU TRAIT — pas en rouge —, trois lignes) dans une
   * pochette plastique (300 × 180, perforations) — ancrage : centre ; o.ghost 0..1 : la carte s'efface, il reste son contour en pointillés
   * (= jamais reçue) ; o.glint 0..1 : reflet qui glisse sur la pochette ; o.sleeve false : la carte seule */
  D.licenceCard = (g, o = {}) => {
    o = Object.assign({ ghost: 0, sleeve: true, glint: 0.3, seed: 4121 }, o);
    const C = U.ctx(g, o.seed, false, 1), gh = clamp(o.ghost, 0, 1), slv = U.rrect(-150, -90, 300, 180, 6), card = U.rrect(-122, -64, 244, 146, 14);
    const drop = (x, y, s) => `M${x} ${f(y - 13 * s)} C${f(x + 4 * s)} ${f(y - 6 * s)} ${f(x + 9 * s)} ${f(y - 1 * s)} ${f(x + 9 * s)} ${f(y + 4 * s)} A${f(9 * s)} ${f(9 * s)} 0 0 1 ${f(x - 9 * s)} ${f(y + 4 * s)} C${f(x - 9 * s)} ${f(y - 1 * s)} ${f(x - 4 * s)} ${f(y - 6 * s)} ${x} ${f(y - 13 * s)} Z`;
    if (o.sleeve) { shadow(g, slv, 6, 7); el("path", { d: slv, fill: "#FBFBF8" }, g); }
    if (gh < 0.98) {
      const cg = el("g", { opacity: f(1 - gh) }, g), CC = U.ctx(cg, o.seed + 2, false, 1);
      el("path", { d: card, fill: "rgba(28,26,28,.14)", transform: "translate(4 5)" }, cg);
      U.shape(CC, "card", card, MAT.white, { sw: 2.6 });
      el("path", { d: "M-122 -40 L-122 -50 Q-122 -64 -108 -64 L108 -64 Q122 -64 122 -50 L122 -40 Z", fill: "#E6E6E1", stroke: INK, "stroke-width": 1.6 }, cg);
      el("path", { d: drop(-102, -50, 0.8), fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, cg);
      ln(cg, "M-84 -56 L-22 -56 M-84 -47 L-46 -47", 2.4, "#9A9A94");
      el("rect", { x: -106, y: -26, width: 70, height: 90, rx: 4, fill: "#F1F1EC", stroke: INK, "stroke-width": 2 }, cg);   // case photo vide
      [[-14, 98], [10, 72], [34, 56]].forEach(([y, x1]) => ln(cg, `M-18 ${y} L${x1} ${y}`, 3.4, "#A9A9A2"));
      ln(cg, "M-18 64 L52 64", 1.4, "#B9B9B2");
      el("path", { d: drop(88, 54, 1.4), fill: "none", stroke: INK, "stroke-width": 2.4 }, cg);
      ln(cg, "M84 46 Q80 52 82 58", 1.8, "#9A9A94");
    }
    if (gh > 0.02) el("path", { d: card, fill: "none", stroke: INK, "stroke-width": 2.8, "stroke-dasharray": "11 8", "stroke-linecap": "round", opacity: f(gh) }, g);
    if (o.sleeve) {
      el("path", { d: slv, fill: "#FFFFFF", opacity: 0.16 }, g);
      U.stroke(C, "slv", slv, { sw: 2.2, r: 0.6 });
      ln(g, "M-146 -74 L146 -74", 1.3, "#B9B9B2");
      [-110, 0, 110].forEach((x) => el("circle", { cx: x, cy: -82, r: 3.4, fill: PAPER, stroke: "#8A8A84", "stroke-width": 1.4 }, g));
      const gx = lerp(-118, 92, clamp(o.glint, 0, 1));
      el("path", { d: `M${f(gx)} -66 L${f(gx + 26)} -66 L${f(gx + 6)} 84 L${f(gx - 20)} 84 Z`, fill: "#FFFFFF", opacity: 0.55 }, g);
      el("path", { d: `M${f(gx + 34)} -66 L${f(gx + 42)} -66 L${f(gx + 22)} 84 L${f(gx + 14)} 84 Z`, fill: "#FFFFFF", opacity: 0.45 }, g);
    }
    return { w: 300, h: 180, top: [0, -90] };
  };
  D.licenceCard.essais = [{}, { ghost: 0.5, glint: 0.8 }, { ghost: 1 }];

  /* ═════════════════════════ C. HÔPITAL — le passe-plat du labo (scène 9) ═════════════════════════ */

  /* 26 · passe-plat du laboratoire — ancrage : coin haut gauche de l'OUVERTURE (420 × 260) ; tablette en saillie (dessus à y 260, x −24…444),
   * coffre du volet au-dessus (y −28…0), cadre inox. À l'intérieur (découpé par l'ouverture) : vitre dépolie (x 0–262) derrière laquelle
   * passe l'OMBRE grise sans traits (o.shadowX = centre, o.shadow = opacité), comptoir, frigo à poches à porte vitrée (x 266–412 : deux
   * étagères, six petites poches rouges, diode JAUNE o.diode). o.shutter 1 = volet fermé → 0 = remonté (lames nettes).
   * o.part : "all" | "inside" | "shutter" | "front" (coffre, cadre, tablette ; + l'enseigne si o.sign). L'enseigne LABOR = D.labSign (à part
   * pour grésiller), le voyant jaune = D.callLight (decor.js) posé à l'ancre lamp. Ancres : tray (centre de la tablette), sign, lamp. */
  D.labHatch = (g, o = {}) => {
    o = Object.assign({ shutter: 0, shadowX: 150, shadow: 1, diode: 1, sign: true, part: "all", seed: 2601 }, o);
    const W = 420, H = 260, P = o.part, all = P === "all";
    if (all || P === "inside") {
      const s = clipRect(g, 0, 0, W, H), CS = U.ctx(s, o.seed + 1, false, 1);
      el("rect", { x: 0, y: 0, width: W, height: H, fill: "#F4F3EC" }, s);
      const sx = o.shadowX, so = clamp(o.shadow, 0, 1);
      if (so > 0.02) el("path", { d: `M${f(sx - 66)} 200 C${f(sx - 64)} 150 ${f(sx - 40)} 132 ${f(sx - 18)} 128 C${f(sx - 34)} 116 ${f(sx - 36)} 72 ${f(sx)} 66 C${f(sx + 36)} 72 ${f(sx + 34)} 116 ${f(sx + 18)} 128 C${f(sx + 40)} 132 ${f(sx + 64)} 150 ${f(sx + 66)} 200 Z`, fill: "#77776F", opacity: f(0.5 * so) }, s);
      el("rect", { x: 0, y: 0, width: 262, height: 200, fill: "#FFFFFF", opacity: 0.5 }, s);   // vitre dépolie
      hatch(s, 0, 0, 262, 200, 11, "#D6D6CF", 1.2, 0.9);
      ln(s, "M131 0 L131 200", 7, "#D2D2CB"); ln(s, "M127.5 0 L127.5 200 M134.5 0 L134.5 200", 1.4, INK);
      ln(s, "M18 34 L58 16 M26 60 L86 32 M156 40 L196 22", 2.4, "#FFFFFF");
      el("rect", { x: 0, y: 200, width: W, height: 60, fill: "#DADAD3" }, s); ln(s, "M0 200 L420 200", 2.4, INK); ln(s, "M0 208 L420 208", 1.2, "#8A8A84");
      U.shape(CS, "fr", U.rrect(266, 14, 146, 262, 6), MAT.light, { sw: 2.6 });                                      // le frigo
      el("rect", { x: 278, y: 40, width: 112, height: 190, rx: 4, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2 }, s);
      const minibag = (x, yb) => {
        el("path", { d: U.rrect(x - 10, yb - 26, 20, 26, 5), fill: RED, stroke: RED2, "stroke-width": 1.6 }, s);
        el("rect", { x: x - 6, y: yb - 19, width: 12, height: 8, fill: "#FFFFFF" }, s);
        el("rect", { x: x - 4, y: yb - 31, width: 8, height: 6, rx: 2, fill: "#D9D9D3", stroke: INK, "stroke-width": 1 }, s);
      };
      [112, 178].forEach((y) => { [300, 334, 368].forEach((x) => minibag(x, y)); el("rect", { x: 280, y, width: 108, height: 5, fill: "#B9B9B3" }, s); ln(s, `M280 ${y} L388 ${y}`, 1.4, INK); });
      ln(s, "M286 52 L314 44 M286 66 L302 62", 2.2, "#FFFFFF");
      el("rect", { x: 394, y: 70, width: 7, height: 120, rx: 3, fill: "#CFCFCA", stroke: INK, "stroke-width": 1.6 }, s);
      el("rect", { x: 290, y: 20, width: 40, height: 13, rx: 2, fill: "#3A3A37" }, s);
      el("circle", { cx: 350, cy: 26.5, r: 4.6, fill: o.diode > 0.5 ? YEL : "#D2D2CB", stroke: INK, "stroke-width": 1.4 }, s);
    }
    if (all || P === "shutter") {
      const k = clamp(o.shutter, 0, 1), hb = H * k;
      if (k > 0.01) {
        const s = clipRect(g, 0, 0, W, H);
        for (let y = hb - 29; y > -18; y -= 17) {
          el("rect", { x: 0, y: f(y), width: W, height: 17, fill: "#E1E1DC", stroke: INK, "stroke-width": 1.3 }, s);
          ln(s, `M0 ${f(y + 5)} L${W} ${f(y + 5)}`, 1.2, "#FFFFFF"); ln(s, `M0 ${f(y + 13)} L${W} ${f(y + 13)}`, 1.2, "#A9A9A2");
        }
        el("rect", { x: 0, y: f(hb - 12), width: W, height: 12, fill: "#B9B9B3", stroke: INK, "stroke-width": 2 }, s);
        el("rect", { x: W / 2 - 22, y: f(hb - 9), width: 44, height: 6, rx: 3, fill: INK }, s);
      }
    }
    if (all || P === "front") {
      const C = U.ctx(g, o.seed, false, 1);
      shadow(g, U.rrect(-24, 260, 468, 20, 4), 6, 10);
      U.shape(C, "box", U.rrect(-18, -28, 456, 28, 5), MAT.alu, { sw: 2.6 }); ln(g, "M-10 -9 L430 -9", 1.4, "#8A8A84");
      U.shape(C, "jl", U.rrect(-18, -2, 18, 264, 3), MAT.alu, { sw: 2.4 }); U.shape(C, "jr", U.rrect(420, -2, 18, 264, 3), MAT.alu, { sw: 2.4 });
      [60, 370].forEach((x, i) => U.shape(C, "br" + i, `M${x - 8} 280 L${x + 8} 280 L${x - 8} 316 Z`, MAT.mid, { sw: 2 }));
      U.shape(C, "tray", U.rrect(-24, 260, 468, 20, 4), MAT.alu, { sw: 2.8 }); ln(g, "M-14 265 L432 265", 1.8, "#FFFFFF");
      if (o.sign) D.labSign(el("g", { transform: "translate(210 -54)" }, g), { glow: 1 });
    }
    return { tray: [210, 260], sign: [210, -54], lamp: [445, 40] };
  };
  D.labHatch.essais = [{}, { shutter: 0.55, shadowX: 40, diode: 0 }, { part: "inside", shadowX: 220 }];
  /* enseigne lumineuse « LABOR » (à part : elle grésille) — ancrage : centre ; 180 × 56 ; o.glow 0..1 = halo jaune */
  D.labSign = (g, o = {}) => {
    o = Object.assign({ text: "LABOR", glow: 1, seed: 2611 }, o);
    const C = U.ctx(g, o.seed, false, 1), gl = clamp(o.glow, 0, 1), d = U.rrect(-90, -28, 180, 56, 8);
    if (gl > 0.02) el("path", { d: U.rrect(-106, -44, 212, 88, 18), fill: YEL, opacity: f(0.3 * gl) }, g);
    shadow(g, d, 6, 7);
    U.shape(C, "box", d, { base: mixc("#F1F1EC", "#FFFBEA", gl) }, { sw: 2.8 });
    el("path", { d: U.rrect(-80, -19, 160, 38, 4), fill: "none", stroke: "#B9B9B2", "stroke-width": 1.4 }, g);
    tw(g, o.text, 0, 12, 34, { ls: 3 });
    return { w: 180, h: 56 };
  };
  D.labSign.essais = [{}, { glow: 0 }];

  /* 27 · portoir : socle inox, deux montants, barre à deux crochets, poignée à gauche au ras du socle — ancrage : bas centre ; 220 × 164
   * (les deux poches s'y pendent : nœuds à part, œillet sur les ancres hooks) ; ancres : hooks, grip (la main), post (le « ؟ ») */
  D.rack = (g, o = {}) => {
    o = Object.assign({ seed: 2701 }, o);
    const C = U.ctx(g, o.seed, false, 1), grip = "M-108 -13 L-128 -13 Q-138 -13 -138 -3 Q-138 7 -128 7 L-108 7";
    el("ellipse", { cx: 6, cy: 2, rx: 118, ry: 6, fill: "rgba(28,26,28,.16)" }, g);
    ln(g, grip, 7.5, INK); ln(g, grip, 3.4, "#CFCFCA");
    [-93, 93].forEach((x, i) => U.shape(C, "p" + i, U.rrect(x - 5, -158, 10, 146, 4), MAT.alu, { sw: 2.2 }));
    U.shape(C, "bar", U.rrect(-106, -164, 212, 12, 6), MAT.white, { sw: 2.4 });
    [-50, 50].forEach((x) => ln(g, `M${x} -152 L${x} -140 Q${x} -129 ${x - 8} -133`, 4, INK));
    U.shape(C, "base", U.rrect(-110, -18, 220, 18, 5), MAT.alu, { sw: 2.6 }); ln(g, "M-100 -12 L100 -12", 1.4, "#FFFFFF");
    [-80, 80].forEach((x) => el("rect", { x: x - 10, y: -2, width: 20, height: 4, rx: 2, fill: INK }, g));
    return { hooks: [[-50, -134], [50, -134]], grip: [-130, -3], post: [93, -120], w: 220, h: 164 };
  };

  /* 42 · pictogramme de lit numéroté (les deux patients) — ancrage : centre ; 110 × 70 ; o.num */
  D.bedIcon = (g, o = {}) => {
    o = Object.assign({ num: 1, seed: 2801 }, o);
    const C = U.ctx(g, o.seed + o.num, false, 1), d = U.rrect(-55, -35, 110, 70, 10);
    shadow(g, d, 5, 6); U.shape(C, "tag", d, MAT.white, { sw: 2.4 });
    ln(g, "M-40 -16 L-40 20 M40 4 L40 20", 3.6, INK);
    el("rect", { x: -40, y: 2, width: 80, height: 8, rx: 2, fill: INK }, g);
    el("circle", { cx: -27, cy: -6, r: 6.5, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, g);
    el("path", { d: "M-17 2 Q-15 -10 -1 -10 L33 -8 Q38 -7 38 2 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2, "stroke-linejoin": "round" }, g);
    el("circle", { cx: 37, cy: -20, r: 12, fill: YEL, stroke: INK, "stroke-width": 2 }, g);
    tw(g, String(o.num), 37, -14, 17, {});
    return { w: 110, h: 70 };
  };
  D.bedIcon.essais = [{ num: 1 }, { num: 2 }];

  /* ═════════════════════════ C. HÔPITAL — le Begleitdokument (scène 10) ═════════════════════════ */

  /* 28 · Begleitdokument : feuille serrée 500 × 830 — ancrage : coin haut gauche. En-tête à 3 cases, 16 lignes de faux texte, tableau 5 × 4
   * coché, deux codes-barres, 6 petites cases, et le petit champ « Blutgruppe: » (.tw 14) suivi d'un gribouillis : la valeur n'est JAMAIS
   * lisible. o.blur 0..1 → filter: blur(o.blur × 1,6 px) sur le groupe. Ancres : lines (6 × [x, y, largeur] pour le surligneur), field, value */
  D.docSheet = (g, o = {}) => {
    o = Object.assign({ blur: 0, field: "Blutgruppe:", seed: 2851 }, o);
    const C = U.ctx(g, o.seed, false, 1), d = U.rrect(0, 0, 500, 830, 4);
    if (o.blur > 0.02) g.setAttribute("style", `filter: blur(${f(o.blur * 1.6)}px)`); else g.removeAttribute("style");
    shadow(g, d, 9, 11); U.shape(C, "sheet", d, MAT.white, { sw: 3 });
    [[22, 156], [186, 150], [344, 134]].forEach(([x, w], i) => el("rect", { x, y: 22, width: w, height: 60, fill: i === 0 ? "#F1F1EC" : "#FFFFFF", stroke: INK, "stroke-width": 2 }, g));
    let bx = 32; for (let i = 0; i < 18; i++) { const w = [2, 1, 3, 1][i % 4] * 1.6; el("rect", { x: f(bx), y: 34, width: f(w), height: 26, fill: INK }, g); bx += w + [2, 3, 1.5][i % 3] * 1.6; }
    ln(g, "M196 38 L320 38 M196 52 L290 52 M196 66 L306 66", 2.6, "#A9A9A2");
    for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) el("rect", { x: 356 + c * 28, y: 30 + r * 24, width: 22, height: 18, fill: "none", stroke: "#8A8A84", "stroke-width": 1.4 }, g);
    const L = [];
    for (let i = 0; i < 16; i++) {
      const y = 112 + i * 21, w = Math.round(210 + 230 * hs(i * 3.7 + 1)); L.push([30, y, w]);
      ln(g, `M30 ${y} L${30 + w} ${y}`, 3.4, "#A9A9A2");
      if (hs(i * 1.3) > 0.55 && w < 400) ln(g, `M${46 + w} ${y} L${Math.min(470, 96 + w)} ${y}`, 3.4, "#A9A9A2");
    }
    const tx = 30, ty = 462, cw = 88, rh = 30;
    el("rect", { x: tx, y: ty, width: cw * 5, height: rh, fill: "#EDEDE8" }, g);
    for (let c = 0; c <= 5; c++) ln(g, `M${tx + c * cw} ${ty} L${tx + c * cw} ${ty + rh * 4}`, 1.6, INK);
    for (let r = 0; r <= 4; r++) ln(g, `M${tx} ${ty + r * rh} L${tx + cw * 5} ${ty + r * rh}`, 1.6, INK);
    for (let c = 0; c < 5; c++) ln(g, `M${tx + c * cw + 10} ${ty + 15} L${tx + c * cw + 50} ${ty + 15}`, 2.6, "#8A8A84");
    for (let r = 1; r < 4; r++) for (let c = 0; c < 5; c++) {
      const x = tx + c * cw, y = ty + r * rh;
      if (c === 0) ln(g, `M${x + 10} ${y + 15} L${x + 64} ${y + 15}`, 2.4, "#A9A9A2"); else if (hs(r * 7 + c) > 0.4) ln(g, `M${x + 34} ${y + 14} l6 7 l12 -14`, 2.4, INK);
    }
    [30, 270].forEach((x0, k) => { let x = x0; for (let i = 0; i < 26; i++) { const w = [2, 1, 3, 1, 1, 2][(i + k) % 6] * 1.7; el("rect", { x: f(x), y: 604, width: f(w), height: 40, fill: INK }, g); x += w + [1.5, 2.5, 1][(i * 2 + k) % 3] * 1.7; } ln(g, `M${x0} 656 L${x0 + 150} 656`, 2, "#A9A9A2"); });
    for (let i = 0; i < 6; i++) { const x = 30 + i * 44; el("rect", { x, y: 676, width: 24, height: 24, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g); if (i % 3 !== 1) ln(g, `M${x + 4} 688 l6 7 l11 -14`, 2.4, INK); ln(g, `M${x + 28} 690 L${x + 40} 690`, 2, "#A9A9A2"); }
    tw(g, o.field, 30, 752, 14, { anchor: "start" });
    ln(g, "M132 748 c4 -9 8 4 12 -3 s6 -8 10 1 s7 5 11 -4 s5 7 9 -1", 2.2, INK);
    ln(g, "M30 760 L240 760", 1.2, "#B9B9B2");
    [[784, 380], [806, 300]].forEach(([y, w]) => ln(g, `M30 ${y} L${30 + w} ${y}`, 3.4, "#A9A9A2"));
    return { lines: [1, 3, 5, 8, 11, 14].map((i) => L[i]), field: [30, 748], value: [154, 746], w: 500, h: 830 };
  };
  D.docSheet.essais = [{}, { blur: 1 }];

  /* 25 · petite loupe à manche (scène 10, posée sur le champ « Blutgruppe: ») — ancrage : centre du verre ; o.r (70) ; le texte grossi tient
   * dans le verre (taille ajustée, au plus 26 px) et la valeur reste un gribouillis ; o.handle = direction du manche (°, 135 = en bas à gauche) */
  D.loupeSmall = (g, o = {}) => {
    o = Object.assign({ r: 70, text: "Blutgruppe:", handle: 135 }, o);
    const R = o.r, fs = Math.min(26, (2 * R - 30) / (o.text.length * 0.6));
    el("circle", { cx: 6, cy: 7, r: R + 7, fill: SH }, g);
    const hg = el("g", { transform: `rotate(${o.handle})` }, g);
    el("path", { d: U.rrect(R + 4, -11, 16, 22, 4), fill: "#CFCFCA", stroke: INK, "stroke-width": 2.2 }, hg);
    el("path", { d: U.rrect(R + 18, -9, 70, 18, 8), fill: "#4A4A46", stroke: INK, "stroke-width": 2.4 }, hg);
    el("circle", { cx: 0, cy: 0, r: R, fill: "#FFFFFF" }, g);
    tw(g, o.text, 0, -4, f(fs), {});
    ln(g, `M${f(-R * 0.5)} ${f(R * 0.32)} c6 -14 12 6 18 -5 s9 -12 15 2 s11 7 17 -6 s9 10 15 -3`, 3, INK);
    el("circle", { cx: 0, cy: 0, r: R + 3.5, fill: "none", stroke: INK, "stroke-width": 10 }, g);
    el("circle", { cx: 0, cy: 0, r: R + 3.5, fill: "none", stroke: "#BDBDB7", "stroke-width": 5 }, g);
    ln(g, `M${f(-R * 0.7)} ${f(-R * 0.4)} A${R - 8} ${R - 8} 0 0 1 ${f(-R * 0.28)} ${f(-R * 0.78)}`, 3.4, "#E6E6E1");
    return { r: R };
  };

  /* ═════════════════════════ C. HÔPITAL — la chambre (scènes 11, 12, 13 ; mur nu de la scène 16) ═════════════════════════ */

  /* 12 · chambre (fond, coordonnées MONDE) : mur, corniche à gorge (y 380), bande de protection en bois (o.bandY 1180, o.band false =
   * mur nu, scène 16), plinthe, sol de y 1300 à o.bottom (1420) puis fondu vers le papier (o.fade) ; o.outlet = [x, y] : prises + bouton d'appel */
  D.wardRoom = (g, o = {}) => {
    o = Object.assign({ x0: -140, x1: 1220, top: 380, band: true, bandY: 1180, floorY: 1300, bottom: 1420, fade: 70, vx: 540, outlet: null, seed: 3101 }, o);
    const { x0, x1, top, bandY, floorY, bottom } = o, W = x1 - x0, C = U.ctx(g, o.seed, false, 1);
    el("rect", { x: x0, y: top, width: W, height: floorY - top, fill: "#F2F0E8" }, g);
    el("rect", { x: x0, y: top, width: W, height: 26, fill: "#E5E2D7" }, g); el("rect", { x: x0, y: top + 26, width: W, height: 9, fill: "#EAE7DD" }, g);
    ln(g, `M${x0} ${top} L${x1} ${top}`, 3); ln(g, `M${x0} ${top + 12} L${x1} ${top + 12}`, 1.3, "#A9A69C");
    ln(g, `M${x0} ${top + 26} L${x1} ${top + 26}`, 2, "#6E6B62"); ln(g, `M${x0} ${top + 35} L${x1} ${top + 35}`, 1, "#C9C6BB");
    if (o.band) {
      el("rect", { x: x0, y: bandY, width: W, height: floorY - bandY, fill: "#E9E6DC" }, g);
      el("rect", { x: x0, y: bandY + 12, width: W, height: 8, fill: "rgba(28,26,28,.12)" }, g);
      U.shape(C, "band", U.rrect(x0 - 20, bandY - 12, W + 40, 26, 6), MAT.wood, { sw: 2.4, r: 0.5 });
      ln(g, `M${x0} ${bandY - 5} L${x1} ${bandY - 5}`, 1.6, "#F7F7F1");
    }
    el("rect", { x: x0, y: floorY - 24, width: W, height: 24, fill: "#CFCCC1" }, g); ln(g, `M${x0} ${floorY - 24} L${x1} ${floorY - 24}`, 1.8, "#6E6B62");
    el("rect", { x: x0, y: floorY, width: W, height: bottom - floorY, fill: "#E7E4DB" }, g);
    const k = (bottom - floorY) / 120;
    for (let i = -16; i <= 16; i++) { const xa = o.vx + i * 110, xb = o.vx + i * 200, d = segX(xa, floorY, xa + (xb - xa) * k, bottom, x0, x1); if (d) ln(g, d, 1.2, "#CBC8BE"); }
    [40, 92, 160, 250].forEach((dy) => { if (floorY + dy < bottom - 6) ln(g, `M${x0} ${floorY + dy} L${x1} ${floorY + dy}`, 1.1, "#CBC8BE"); });
    ln(g, `M${x0} ${floorY} L${x1} ${floorY}`, 3);
    floorFade(g, x0, W, bottom, o.fade);
    if (o.outlet) {
      const [x, y] = o.outlet;
      el("path", { d: U.rrect(x - 36, y - 16, 72, 32, 4), fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g);
      [-17, 2].forEach((dx) => { el("circle", { cx: x + dx, cy: y, r: 7, fill: "#F1F1EC", stroke: INK, "stroke-width": 1.4 }, g); [-2.4, 2.4].forEach((e) => el("circle", { cx: x + dx + e, cy: y, r: 1.4, fill: INK }, g)); });
      el("circle", { cx: x + 22, cy: y, r: 6, fill: YEL, stroke: INK, "stroke-width": 1.6 }, g);
    }
    return { top, bandY, floorY, bottom };
  };
  D.wardRoom.essais = [{ x0: 0, x1: 1080 }, { x0: 0, x1: 1080, band: false, outlet: [600, 1100] }];

  /* 33 b · fenêtre à croisillon — ancrage : coin haut gauche ; 180 × 200 ; o.p 0 = jour (soleil pâle, reflets), 1 = nuit (hachure d'encre
   * serrée — pas de bleu —, croissant de lune, 4 étoiles, un nuage qui passe devant la lune : o.cloud = phase 0..1 du défilement)
   * o.part : "all" | "frame" (cadre, croisillon, appui : statique) | "sky" (les carreaux : à chaque image) */
  D.nightWindow = (g, o = {}) => {
    o = Object.assign({ w: 180, h: 200, p: 1, cloud: 0.3, part: "all", seed: 3301 }, o);
    const { w, h } = o, P = o.part, p = clamp(o.p, 0, 1), C = U.ctx(g, o.seed, false, 1), my = Math.round(h * 0.46);
    // cadre en ANNEAU (le contour intérieur tourne à l'envers : trou) : le nœud « frame » se pose au-dessus du nœud « sky » sans le cacher
    const ring = U.rrect(-10, -10, w + 20, h + 20, 4) + ` M0 0 L0 ${h} L${w} ${h} L${w} 0 Z`;
    if (P !== "sky") shadow(g, ring, 7, 8);
    if (P !== "frame") {
      const s = clipRect(g, 0, 0, w, h);
      el("rect", { x: 0, y: 0, width: w, height: h, fill: "#FDFBEE" }, s);
      if (p < 0.98) {
        const dg = el("g", { opacity: f(1 - p) }, s);
        el("circle", { cx: f(w * 0.74), cy: f(h * 0.22), r: 20, fill: "#FBEFC0", stroke: "#E3C76A", "stroke-width": 1.6 }, dg);
        [[0.1, 0.36, 0.34, 0.1], [0.56, 0.94, 0.84, 0.64], [0.12, 0.92, 0.3, 0.72]].forEach(([a, b, c, d]) => ln(dg, `M${f(w * a)} ${f(h * b)} L${f(w * c)} ${f(h * d)}`, 3, "#FFFFFF"));
      }
      if (p > 0.02) {
        const ng = el("g", { opacity: f(p) }, s), mx = w * 0.7, mo = h * 0.24;
        el("rect", { x: 0, y: 0, width: w, height: h, fill: "#2E2D2E" }, ng);
        hatch(ng, 0, 0, w, h, 4.2, INK, 1.3, 0.8);
        el("circle", { cx: f(mx), cy: f(mo), r: 18, fill: "#FFFFFF" }, ng); el("circle", { cx: f(mx + 8), cy: f(mo - 5), r: 15, fill: "#2E2D2E" }, ng);
        [[0.16, 0.14, 5.5], [0.4, 0.3, 4], [0.24, 0.66, 5.5], [0.86, 0.72, 4]].forEach(([u, v, r]) => el("path", { d: star4(w * u, h * v, r), fill: "#FFFFFF" }, ng));
        const cx = ((((o.cloud % 1) + 1) % 1) * (w + 150)) - 75, cy = h * 0.29;
        el("path", { d: `M${f(cx - 46)} ${f(cy + 10)} C${f(cx - 50)} ${f(cy - 6)} ${f(cx - 30)} ${f(cy - 12)} ${f(cx - 18)} ${f(cy - 6)} C${f(cx - 12)} ${f(cy - 22)} ${f(cx + 16)} ${f(cy - 22)} ${f(cx + 20)} ${f(cy - 6)} C${f(cx + 36)} ${f(cy - 10)} ${f(cx + 50)} ${f(cy)} ${f(cx + 44)} ${f(cy + 10)} Z`, fill: "#8A8A84", stroke: "#B9B9B2", "stroke-width": 1.6, opacity: 0.94 }, ng);
      }
    }
    if (P !== "sky") {
      U.shape(C, "fr", ring, MAT.white, { sw: 3 });
      U.shape(C, "mv", U.rrect(w / 2 - 5, -2, 10, h + 4, 1), MAT.white, { sw: 2.2 });
      U.shape(C, "mh", U.rrect(-2, my - 5, w + 4, 10, 1), MAT.white, { sw: 2.2 });
      el("rect", { x: w - 16, y: my + 12, width: 6, height: 22, rx: 3, fill: INK }, g);
      U.shape(C, "sill", U.rrect(-20, h + 8, w + 40, 14, 3), MAT.grey, { sw: 2.6 });
    }
    return { w, h, sill: [w / 2, h + 8] };
  };
  D.nightWindow.essais = [{}, { p: 0 }, { p: 0.5, cloud: 0.62 }];

  /* tache de lumière (soleil par la fenêtre) avec l'ombre du croisillon — ancrage : coin haut gauche ; parallélogramme o.w × o.h décalé de
   * o.skew en bas ; o.cross = hauteur (0..1) de la traverse (0 : sans croisillon) ; o.op = intensité. Mur (scène 13) ou sol (scène 16 :
   * h petit, skew négatif) */
  D.lightPatch = (g, o = {}) => {
    o = Object.assign({ w: 170, h: 240, skew: 40, cross: 0.46, op: 1 }, o);
    const P = (u, v) => `${f(u * o.w + v * o.skew)} ${f(v * o.h)}`, quad = (u0, u1, v0, v1) => `M${P(u0, v0)} L${P(u1, v0)} L${P(u1, v1)} L${P(u0, v1)} Z`;
    const gg = el("g", { opacity: f(clamp(o.op, 0, 1)) }, g), c = o.cross;
    (c ? [[0, 0.47, 0, c - 0.03], [0.53, 1, 0, c - 0.03], [0, 0.47, c + 0.03, 1], [0.53, 1, c + 0.03, 1]] : [[0, 1, 0, 1]]).forEach((q) => el("path", { d: quad(...q), fill: YEL, opacity: 0.24 }, gg));
    el("path", { d: quad(0.07, 0.3, 0.06, c ? c - 0.06 : 0.4), fill: "#FFF6C9", opacity: 0.5 }, gg);
    return { w: o.w, h: o.h };
  };
  D.lightPatch.essais = [{}, { w: 300, h: 70, skew: -140, op: 1 }];

  /* 33 · table de chevet à tiroir — ancrage : bas centre ; 100 × 210 (dessus à y −210) ; o.bags : deux poches VIDES couchées, cochées
   * (scènes 11, 12 : les deux de la journée), o.cup : gobelet ; o.glass : un verre d'eau (scène 13, sans les poches) */
  D.nightstand04 = (g, o = {}) => {
    o = Object.assign({ bags: true, cup: true, glass: false, seed: 3331 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    shadow(g, U.rrect(-48, -206, 96, 206, 4), 6, 3);
    U.shape(C, "body", U.rrect(-45, -198, 90, 184, 4), MAT.light, { sw: 2.6 });
    U.stroke(C, "drw", U.rrect(-37, -188, 74, 46, 3), { sw: 1.8, stroke: "#6E6E68", r: 0.6 });
    el("rect", { x: -14, y: -169, width: 28, height: 7, rx: 3.5, fill: "#CFCFCA", stroke: INK, "stroke-width": 1.8 }, g);
    U.stroke(C, "door", U.rrect(-37, -132, 74, 108, 3), { sw: 1.8, stroke: "#6E6E68", r: 0.6 });
    el("circle", { cx: 25, cy: -80, r: 4.5, fill: "#CFCFCA", stroke: INK, "stroke-width": 1.8 }, g);
    U.shape(C, "plinth", U.rrect(-42, -16, 84, 16, 3), MAT.mid, { sw: 2 });
    U.shape(C, "top", U.rrect(-50, -210, 100, 14, 4), MAT.mid, { sw: 2.6 });
    if (o.bags) [[-40, -229, -90], [-35, -255, -86]].forEach(([x, y, r], i) => D.bloodBag(el("g", { transform: `translate(${x} ${y}) rotate(${r}) scale(0.34)` }, g), { empty: 1, tick: 1, peg: false, shadow: false, ghost: 0, seed: 211 + i }));
    if (o.cup && o.bags) {
      el("path", { d: "M29 -210 L45 -210 L47 -238 L27 -238 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, g);
      ln(g, "M27 -233 L47 -233", 1.3, "#9A9A94"); ln(g, "M31 -229 L32 -214", 1.6, "#E6E6E1");
    }
    if (o.glass) D.glass(el("g", { transform: "translate(10 -210) scale(1.3)" }, g), { level: 0.62 });
    return { top: -210 };
  };
  D.nightstand04.essais = [{}, { bags: false, glass: true }];

  /* 31 · lit d'hôpital VU DE FACE, partie arrière (dessinée AVANT le patient) — ancrage : bas centre (sol) ; 400 × 500 : tête de lit à
   * panneau (y −470…−212) entre deux montants, matelas et drap (visibles de part et d'autre du patient), oreiller creusé, barrières
   * latérales repliées. Patient PAT de face, pieds à y +35 (cachés), tête de −402 à −255 : il est adossé à l'oreiller. */
  D.bedBack04 = (g, o = {}) => {
    o = Object.assign({ seed: 3111 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    shadow(g, U.rrect(-176, -470, 352, 258, 18), 8, 9);
    [-186, 186].forEach((x, i) => { U.shape(C, "post" + i, U.rrect(x - 8, -484, 16, 330, 7), MAT.alu, { sw: 2.4 }); el("circle", { cx: x, cy: -488, r: 10, fill: "#E6E6E1", stroke: INK, "stroke-width": 2.2 }, g); });
    U.shape(C, "panel", U.rrect(-176, -470, 352, 258, 18), MAT.light, { sw: 2.8 });
    U.stroke(C, "inset", U.rrect(-152, -448, 304, 214, 12), { sw: 1.8, stroke: "#8A8A84", r: 0.6 });
    ln(g, "M-146 -242 L146 -242 L146 -440", 2, "#FAFAF6");
    U.shape(C, "mat", U.rrect(-182, -226, 364, 72, 12), MAT.white, { sw: 2.6 });
    ln(g, "M-174 -206 L174 -206", 1.4, "#B9B9B2", { "stroke-dasharray": "6 5" });
    U.shape(C, "pil", "M-128 -236 C-142 -300 -112 -356 -46 -350 Q0 -334 46 -350 C112 -356 142 -300 128 -236 C116 -214 -116 -214 -128 -236 Z", MAT.milk, { sw: 2.6 });
    ln(g, "M-94 -330 Q-72 -300 -86 -258 M94 -330 Q72 -300 86 -258", 1.6, "#B9B9B2");
    [-1, 1].forEach((sd, i) => { const x = sd * 192; U.shape(C, "rail" + i, U.rrect(x - 9, -236, 18, 88, 5), MAT.alu, { sw: 2.2 }); [-222, -196, -170].forEach((y) => ln(g, `M${x - 9} ${y} L${x + 9} ${y}`, 1.6, "#6E6E68")); });
    return { top: -488, pillow: [0, -290], panel: [0, -341] };
  };
  /* 31 · lit vu de face, partie avant (dessinée APRÈS le patient) — ancrage : bas centre ; couette à revers (dessus à y −175 : elle cache le
   * patient sous la poitrine), pied de lit bas (y −120…−38), longeron, manivelle repliée, 2 roues, pancarte accrochée au pied de lit
   * (o.chart = deux lignes .tw 15, ex. ["Leberzirrhose", "Anämie"]) ; o.breath 0..1 : la couette se soulève de 3 px.
   * o.part : "all" | "duvet" (la couette : à chaque image) | "frame" (pied de lit, pancarte : statique, dessiné après la couette).
   * Ancres : armOut (où pose la main droite d'écran du patient, sur la couette), chart, top. */
  D.bedFront04 = (g, o = {}) => {
    o = Object.assign({ breath: 0, chart: null, part: "all", seed: 3121 }, o);
    const P = o.part, all = P === "all", C = U.ctx(g, o.seed, false, 1);
    if (all || P === "duvet") {
      const y0 = -175 - clamp(o.breath, 0, 1) * 3;
      U.shape(C, "duvet", `M-198 -150 Q-196 ${f(y0 + 4)} -160 ${f(y0)} L160 ${f(y0)} Q196 ${f(y0 + 4)} 198 -150 L203 -58 Q0 -46 -203 -58 Z`, MAT.milk, { sw: 2.8 });
      ln(g, `M-122 ${f(y0 + 44)} Q-82 ${f(y0 + 56)} -42 ${f(y0 + 46)} M32 ${f(y0 + 52)} Q82 ${f(y0 + 62)} 132 ${f(y0 + 48)} M-176 ${f(y0 + 64)} Q-160 -100 -168 -72 M174 ${f(y0 + 60)} Q160 -100 170 -72`, 1.6, "#A9A9A2");
      U.shape(C, "rev", `M-166 ${f(y0 - 1)} L166 ${f(y0 - 1)} Q175 ${f(y0 + 12)} 171 ${f(y0 + 27)} Q0 ${f(y0 + 35)} -171 ${f(y0 + 27)} Q-175 ${f(y0 + 12)} -166 ${f(y0 - 1)} Z`, MAT.white, { sw: 2.4 });
      ln(g, `M-156 ${f(y0 + 20)} Q0 ${f(y0 + 27)} 156 ${f(y0 + 20)}`, 1.3, "#9A9A94", { "stroke-dasharray": "5 4" });
    }
    if (all || P === "frame") {
      [-186, 186].forEach((x, i) => U.shape(C, "fp" + i, U.rrect(x - 8, -130, 16, 108, 7), MAT.alu, { sw: 2.4 }));
      U.shape(C, "rail", U.rrect(-192, -42, 384, 14, 4), MAT.mid, { sw: 2.4 });
      [-150, 150].forEach((x) => {
        el("rect", { x: x - 7, y: -30, width: 14, height: 16, fill: "#B9B9B3", stroke: INK, "stroke-width": 1.8 }, g);
        el("circle", { cx: x, cy: -13, r: 13, fill: "#4A4A46", stroke: INK, "stroke-width": 2.2 }, g); el("circle", { cx: x, cy: -13, r: 4.5, fill: "#DADAD4", stroke: INK, "stroke-width": 1.4 }, g);
      });
      el("rect", { x: -12, y: -30, width: 24, height: 12, rx: 3, fill: "#CFCFCA", stroke: INK, "stroke-width": 1.8 }, g);   // manivelle repliée
      ln(g, "M6 -24 L30 -24 L30 -9", 4, INK); el("circle", { cx: 30, cy: -7, r: 4.5, fill: "#3A3A37", stroke: INK, "stroke-width": 1.4 }, g);
      U.shape(C, "foot", U.rrect(-176, -112, 352, 72, 10), MAT.light, { sw: 2.8 });
      U.stroke(C, "fi", U.rrect(-158, -100, 316, 50, 6), { sw: 1.6, stroke: "#8A8A84", r: 0.6 });
      U.shape(C, "top", U.rrect(-186, -122, 372, 14, 7), MAT.alu, { sw: 2.4 });
      [-46, 46].forEach((x) => ln(g, `M${x} -124 L${x} -113 Q${x} -107 ${x + 5} -109`, 3, INK));
      shadow(g, U.rrect(-72, -114, 144, 62, 5), 4, 5);
      U.shape(C, "chart", U.rrect(-72, -114, 144, 62, 5), MAT.white, { sw: 2.4 });
      el("rect", { x: -20, y: -120, width: 40, height: 11, rx: 3, fill: "#9A9A94", stroke: INK, "stroke-width": 1.6 }, g);
      if (o.chart) o.chart.forEach((s, i) => tw(g, s, 0, -85 + i * 22, 15, {}));
      else [[-88, 50], [-68, 26]].forEach(([y, x1]) => ln(g, `M-54 ${y} L${x1} ${y}`, 2.6, "#B9B9B2"));
    }
    return { armOut: [105, -180], chart: [0, -83], top: -175 };
  };
  D.bedFront04.essais = [{}, { chart: ["Leberzirrhose", "Anämie"], breath: 1 }, { part: "duvet" }];

  /* 31 · bracelet d'identité (bande blanche, 2 traits, pression) — ancrage : centre ; o.angle = direction de l'avant-bras (°, 90 = vers le bas) */
  D.wristband = (g, o = {}) => {
    o = Object.assign({ angle: 90, len: 30 }, o);
    const r = el("g", { transform: `rotate(${f(o.angle - 90)})` }, g), L = o.len / 2;
    el("path", { d: U.rrect(-L, -7, o.len, 14, 5), fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, r);
    ln(r, `M${f(-L + 5)} -2 L${f(L - 9)} -2 M${f(-L + 5)} 3 L${f(L - 14)} 3`, 1.4, "#8A8A84");
    el("circle", { cx: f(L - 4.5), cy: 0, r: 2.4, fill: "#CFCFCA", stroke: INK, "stroke-width": 1 }, r);
    return { len: o.len };
  };
  D.wristband.essais = [{}, { angle: 30 }];

  /* 32 · potence à perfusion — ancrage : bas centre ; hauteur o.h (400) ; 5 roulettes, mât télescopique (collier + molette), bras en T :
   * le crochet de la poche est à o.hook ([56, −385] : il se règle sur la main levée de la médecin, pas l'inverse), le second crochet
   * (vide) pend en o.hook2 (o.sHook : dessiné ici ; sinon D.ivHook dans son propre nœud, à l'ancre hook2, pour m.pend) */
  D.ivPole = (g, o = {}) => {
    o = Object.assign({ h: 400, hook: [56, -385], hook2: [-52, -385], sHook: true, seed: 3201 }, o);
    const C = U.ctx(g, o.seed, false, 1), armY = Math.min(o.hook[1], o.hook2[1]) - 14, feet = [[-74, -9], [-36, -6], [36, -6], [74, -9], [0, -5]];
    el("ellipse", { cx: 6, cy: 2, rx: 88, ry: 6, fill: "rgba(28,26,28,.16)" }, g);
    feet.forEach(([x, y]) => { ln(g, `M0 -26 L${x} ${y - 7}`, 7, INK); ln(g, `M0 -26 L${x} ${y - 7}`, 3, "#CFCFCA"); });
    feet.forEach(([x, y]) => { el("circle", { cx: x, cy: y, r: 7.5, fill: "#4A4A46", stroke: INK, "stroke-width": 1.8 }, g); el("circle", { cx: x, cy: y, r: 2.2, fill: "#DADAD4" }, g); });
    el("circle", { cx: 0, cy: -26, r: 10, fill: "#CFCFCA", stroke: INK, "stroke-width": 2.2 }, g);
    U.shape(C, "low", U.rrect(-7, -250, 14, 226, 5), MAT.alu, { sw: 2.4 });
    U.shape(C, "up", U.rrect(-4.5, armY - 4, 9, -246 - armY, 4), MAT.alu, { sw: 2.2 });
    U.shape(C, "col", U.rrect(-11, -262, 22, 16, 5), MAT.mid, { sw: 2.2 });
    el("circle", { cx: 16, cy: -254, r: 5, fill: "#4A4A46", stroke: INK, "stroke-width": 1.6 }, g);
    const xa = o.hook2[0], [hx, hy] = o.hook;
    U.shape(C, "arm", U.rrect(Math.min(xa, hx) - 6, armY - 4, Math.abs(hx - xa) + 12, 8, 4), MAT.alu, { sw: 2.2 });
    el("circle", { cx: 0, cy: armY - 9, r: 6, fill: "#E6E6E1", stroke: INK, "stroke-width": 2 }, g);
    ln(g, `M${hx} ${armY + 3} L${hx} ${hy - 9} Q${hx} ${hy + 3} ${hx - 9} ${hy - 1}`, 4, INK);
    if (o.sHook) D.ivHook(el("g", { transform: `translate(${xa} ${armY + 3})` }, g), {});
    return { hook: [hx, hy], hook2: [xa, armY + 3], top: [0, armY - 15] };
  };
  D.ivPole.essais = [{}, { sHook: false, hook: [70, -380] }];
  /* le second crochet de la potence (vide, il oscille) — ancrage : le point d'accroche au bras (pivot de m.pend) */
  D.ivHook = (g) => {
    ln(g, "M0 0 L0 5", 2.6, INK); el("circle", { cx: 0, cy: 9, r: 4, fill: "none", stroke: INK, "stroke-width": 2.4 }, g);
    ln(g, "M0 13 L0 27 Q0 35 -7 32", 3.4, INK);
    return { tip: [-6, 32] };
  };

  /* 33 c · haricot inox (scène 12) — ancrage : centre ; 90 × 34 */
  D.kidneyDish = (g) => {
    const C = U.ctx(g, 3341, false, 1);
    el("ellipse", { cx: 4, cy: 16, rx: 44, ry: 5, fill: "rgba(28,26,28,.16)" }, g);
    U.shape(C, "body", "M-45 -4 C-44 10 -30 17 0 17 C30 17 44 10 45 -4 C43 6 30 10 0 10 C-30 10 -43 6 -45 -4 Z", MAT.alu, { sw: 2.4 });
    U.shape(C, "rim", "M-45 -4 C-47 -15 -33 -19 -18 -14 C-7 -10 7 -10 18 -14 C33 -19 47 -15 45 -4 C43 6 30 10 0 10 C-30 10 -43 6 -45 -4 Z", { base: "#F1F1EC" }, { sw: 2.6 });
    ln(g, "M-36 -6 C-36 -12 -26 -13 -16 -9 C-6 -6 6 -6 16 -9 C26 -13 36 -12 36 -6 C34 1 22 4 0 4 C-22 4 -34 1 -36 -6 Z", 1.4, "#9A9A94");
    ln(g, "M-31 -11 Q-23 -13 -15 -10", 2, "#FFFFFF");
    return { w: 90, h: 34 };
  };

  /* 34 · LA LOUPE sur la tubulure (scène 12 : 0 contre A) — ancrage : centre ; o.r (150). Dedans, sur fond rose très pâle : 9 globules
   * (disques rouge sang à creux central, 3 picots « A » sur le bord) et 7 anticorps du patient = petites PINCES en Y (encre).
   * Pas de découpe par clipPath : les globules qui entrent par le haut s'estompent et rétrécissent près du bord (le cerclage les recouvre).
   * o.flow 0..1 : les globules entrent par le haut et descendent à leur place · o.grab 0..1 : chaque pince pivote vers son globule, s'en
   * approche et se referme sur un picot (elle devient jaune) · o.burst 0..1 : les globules pincés se fendent (trait blanc) puis éclatent en
   * 5 fragments qui s'écartent et pâlissent · o.wig : phase du frétillement des pinces libres (±8°) · o.drift : phase de la dérive des
   * globules · o.handle : direction du manche (°). Paramètres à arrondir au 1/20 (dessin net, sans rough). Ancre link : bord bas droit. */
  const GLOB = [[-60, -72], [16, -94], [80, -48], [-96, 8], [-18, -10], [60, 24], [-56, 78], [16, 74], [70, 88]];
  const ANTI = [[-20, -56], [40, -56], [-58, -22], [26, -28], [20, 32], [-30, 40], [-104, 56]];
  const ANTI_T = ANTI.map(([x, y]) => { let b = 0, bd = 1e9; GLOB.forEach(([gx, gy], i) => { const d = Math.hypot(gx - x, gy - y); if (d < bd) { bd = d; b = i; } }); return b; });
  const PICOTS = GLOB.map((gp, i) => {
    const L = []; ANTI.forEach((a, j) => { if (ANTI_T[j] === i) L.push(Math.atan2(a[1] - gp[1], a[0] - gp[0])); });
    let last = L.length ? L[L.length - 1] : hs(i * 4.1) * 6.283; while (L.length < 3) { last += 2.094; L.push(last); }
    return L.slice(0, 3);
  });
  D.loupe = (g, o = {}) => {
    o = Object.assign({ r: 150, flow: 1, grab: 0, burst: 0, wig: 0, drift: 0, handle: 135 }, o);
    const R = o.r, k = R / 150, fl = clamp(o.flow, 0, 1), gr = clamp(o.grab, 0, 1), bu = clamp(o.burst, 0, 1), inner = R - 12;
    el("circle", { cx: 8, cy: 10, r: R + 10, fill: SH }, g);
    const hg = el("g", { transform: `rotate(${o.handle})` }, g);
    el("path", { d: U.rrect(R + 6, -15 * k, 20 * k, 30 * k, 5), fill: "#CFCFCA", stroke: INK, "stroke-width": 2.4 }, hg);
    el("path", { d: U.rrect(R + 6 + 18 * k, -12 * k, 74 * k, 24 * k, 11 * k), fill: "#4A4A46", stroke: INK, "stroke-width": 2.6 }, hg);
    ln(hg, `M${f(R + 32 * k)} ${f(-5 * k)} L${f(R + 88 * k)} ${f(-5 * k)}`, 2, "#9A9A94");
    el("circle", { cx: 0, cy: 0, r: R, fill: "#F8ECE8" }, g);
    for (let i = 0; i < 16; i++) { const a = hs(i * 1.7) * 6.283, rr = (0.2 + 0.7 * hs(i * 2.9)) * R; el("circle", { cx: f(rr * Math.cos(a)), cy: f(rr * Math.sin(a)), r: 2.4, fill: "#EED6CF" }, g); }
    const pos = GLOB.map(([x, y], i) => {   // le globule i part juste au-dessus du verre (y −R − 30) et descend à sa place entre flow i×0,05 et i×0,05 + 0,55
      const e = E(clamp((fl - i * 0.05) / 0.55, 0, 1)), ph = o.drift * 6.283;
      return [x * k + 3 * Math.sin(ph + i * 1.7), lerp(-R - 30, y * k, e) + 2 * Math.cos(ph + i)];
    });
    const grabbed = new Set(ANTI_T);
    pos.forEach(([x, y], i) => {
      const d = Math.hypot(x, y), vis = clamp((inner - d - 22 * k) / (24 * k) + 1, 0, 1); if (vis < 0.03) return;
      const rr = 22 * k * (0.55 + 0.45 * vis), G = el("g", { transform: `translate(${f(x)} ${f(y)})`, opacity: f(vis) }, g), b = grabbed.has(i) ? bu : 0;
      if (b < 0.35) {
        PICOTS[i].forEach((a) => el("circle", { cx: f((rr + 3) * Math.cos(a)), cy: f((rr + 3) * Math.sin(a)), r: f(3.8 * k), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, G));
        el("circle", { cx: 0, cy: 0, r: f(rr), fill: RED, stroke: RED2, "stroke-width": 2.2 }, G);
        el("ellipse", { cx: 0, cy: 0, rx: f(rr * 0.5), ry: f(rr * 0.42), fill: "#C9584F", stroke: RED2, "stroke-width": 1.2 }, G);
        ln(G, `M${f(-rr * 0.62)} ${f(-rr * 0.42)} A${f(rr * 0.75)} ${f(rr * 0.75)} 0 0 1 ${f(rr * 0.05)} ${f(-rr * 0.74)}`, 2, "#E8A49D");
        if (b > 0.01) { const c = b / 0.35; ln(G, `M${f(-rr * 0.85 * c)} ${f(-rr * 0.2)} L${f(-rr * 0.25 * c)} ${f(rr * 0.18)} L${f(rr * 0.3 * c)} ${f(-rr * 0.22)} L${f(rr * 0.85 * c)} ${f(rr * 0.12)}`, 2.6, "#FFFFFF"); }
      } else {
        const u = (b - 0.35) / 0.65, col = mixc(RED, "#EBCBC6", u), sk = mixc(RED2, "#D6B3AD", u);
        for (let s = 0; s < 5; s++) {
          const a0 = (s / 5) * 6.283 + i, a1 = a0 + 6.283 / 5 - 0.2, am = (a0 + a1) / 2, off = 3 + 26 * k * u, ox = off * Math.cos(am), oy = off * Math.sin(am);
          el("path", { d: `M${f(ox)} ${f(oy)} L${f(ox + rr * Math.cos(a0))} ${f(oy + rr * Math.sin(a0))} A${f(rr)} ${f(rr)} 0 0 1 ${f(ox + rr * Math.cos(a1))} ${f(oy + rr * Math.sin(a1))} Z`, fill: col, stroke: sk, "stroke-width": 1.4, opacity: f(1 - 0.8 * u), transform: `rotate(${f(u * 40 * (s % 2 ? 1 : -1))} ${f(ox)} ${f(oy)})` }, G);
        }
      }
    });
    ANTI.forEach(([hx, hy], j) => {
      const t = ANTI_T[j], [tx, ty] = pos[t], ax = hx * k, ay = hy * k, ux = ax - tx, uy = ay - ty, ul = Math.hypot(ux, uy) || 1;
      const ge = E(gr), bx = lerp(ax, tx + (ux / ul) * 39 * k, ge), by = lerp(ay, ty + (uy / ul) * 39 * k, ge);
      const dir = (Math.atan2(ty - by, tx - bx) * 180) / Math.PI, wig = (1 - ge) * 8 * Math.sin(o.wig * 6.283 + j * 1.9), jaw = rad(lerp(34, 9, ge));
      const A = el("g", { transform: `translate(${f(bx)} ${f(by)}) rotate(${f(dir + wig)}) scale(${f(k)})` }, g);
      const t1 = `${f(13 * Math.cos(jaw))} ${f(-13 * Math.sin(jaw))}`, t2 = `${f(13 * Math.cos(jaw))} ${f(13 * Math.sin(jaw))}`, d = `M-15 0 L0 0 L${t1} M0 0 L${t2}`;
      ln(A, d, 6.5, INK); ln(A, d, 3, ge > 0.6 ? YEL : "#FFFFFF");
    });
    el("circle", { cx: 0, cy: 0, r: R + 5, fill: "none", stroke: INK, "stroke-width": 14 }, g);
    el("circle", { cx: 0, cy: 0, r: R + 5, fill: "none", stroke: "#CFCFCA", "stroke-width": 7 }, g);
    ln(g, `M${f(-R * 0.72)} ${f(-R * 0.42)} A${R - 10} ${R - 10} 0 0 1 ${f(-R * 0.3)} ${f(-R * 0.8)}`, 5, "#FFFFFF", { opacity: 0.8 });
    return { r: R, link: [f(Math.cos(rad(34)) * (R + 10)), f(Math.sin(rad(34)) * (R + 10))] };
  };
  D.loupe.essais = [{}, { flow: 0.4 }, { grab: 1 }, { grab: 1, burst: 0.25 }, { grab: 1, burst: 0.8 }];

  /* annotation de la série (scène 12) : cercle tracé à la main (o.r 52, o.p 0..1 = part tracée), lettre manuscrite (Kalam 90, o.letter,
   * o.show = opacité), étiquette .tw 18 au-dessus (o.label), petite flèche vers o.arrow = [dx, dy] (quand le cercle est fini) ; lettre et
   * étiquette à contour papier, disque papier pâle dans le cercle (o.disc = opacité, 0 = aucun).
   * Ce sont des annotations à côté des objets : RIEN n'est imprimé sur la poche. — ancrage : centre du cercle */
  D.groupMark = (g, o = {}) => {
    o = Object.assign({ letter: "0", label: "Blutgruppe", r: 52, p: 1, show: 1, arrow: [64, 66], disc: 0.8 }, o);
    const r = o.r, p = clamp(o.p, 0, 1), n = 54, pts = [];
    for (let i = 0; i <= n; i++) { const a = -2 + (i / 48) * 6.283, rr = r * (1 + 0.035 * Math.sin(i * 0.9)); pts.push([rr * Math.cos(a), rr * Math.sin(a)]); }
    const halo = (t) => { t.setAttribute("stroke", PAPER); t.setAttribute("stroke-width", "5"); t.setAttribute("stroke-linejoin", "round"); t.setAttribute("paint-order", "stroke"); return t; };
    if (p > 0.02 && o.disc) el("circle", { cx: 0, cy: 0, r: r - 3, fill: PAPER, opacity: f(o.disc * p) }, g);   // disque papier : la lettre se lit sur un décor chargé
    const m = Math.round(n * p); if (m > 1) ln(g, poly(pts.slice(0, m + 1)), 4.4, INK);
    if (o.show > 0.02) halo(U.text(g, o.letter, 0, 31, 90, {})).setAttribute("opacity", f(clamp(o.show, 0, 1)));
    if (o.label) halo(tw(g, o.label, 0, -r - 14, 18, {}));
    if (o.arrow && p > 0.98) {
      const [ax, ay] = o.arrow, l = Math.hypot(ax, ay) || 1, ux = ax / l, uy = ay / l, sx = ux * (r + 8), sy = uy * (r + 8), mx = (sx + ax) / 2 - uy * 10, my = (sy + ay) / 2 + ux * 10;
      ln(g, `M${f(sx)} ${f(sy)} Q${f(mx)} ${f(my)} ${f(ax)} ${f(ay)}`, 3, INK);
      const a = Math.atan2(ay - my, ax - mx), h = (s) => `${f(ax - 13 * Math.cos(a + s))} ${f(ay - 13 * Math.sin(a + s))}`;
      ln(g, `M${h(-0.45)} L${f(ax)} ${f(ay)} L${h(0.45)}`, 3, INK);
    }
    return { r };
  };
  D.groupMark.essais = [{}, { letter: "A", label: "Blutgruppe", p: 0.6, show: 0, arrow: [80, 20] }];
  /* pictogramme de femme (« für eine andere Patientin », scène 12) dans une pastille blanche — ancrage : centre ; Ø 48 */
  D.womanIcon = (g, o = {}) => {
    o = Object.assign({ r: 24 }, o);
    el("circle", { cx: 3, cy: 4, r: o.r, fill: SH }, g);
    el("circle", { cx: 0, cy: 0, r: o.r, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, g);
    el("circle", { cx: 0, cy: -10, r: 5.6, fill: INK }, g);
    el("path", { d: "M-5 -3 L5 -3 L11 13 L-11 13 Z", fill: INK, stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, g);
    ln(g, "M-3.5 13 L-3.5 18 M3.5 13 L3.5 18", 2.6, INK);
    return { r: o.r };
  };

  /* ═════════════════════════ C. HÔPITAL — l'effondrement (scène 14) ═════════════════════════ */

  /* 44 · pilier d'angle du couloir (elle s'y adosse) — ancrage : coin haut gauche (corniche) ; 82 × 920 : face avant claire, face de côté
   * hachurée, cornière de protection, plinthe ; ombre portée sur le mur à droite */
  D.pillar = (g, o = {}) => {
    o = Object.assign({ w: 82, h: 920, side: 16, seed: 4401 }, o);
    const { w, h } = o, fw = w - o.side, C = U.ctx(g, o.seed, false, 1);
    el("rect", { x: w, y: 26, width: 20, height: h - 26, fill: SH, opacity: 0.7 }, g);
    U.shape(C, "front", `M0 0 L${fw} 0 L${fw} ${h} L0 ${h} Z`, { base: "#EDECE5" }, { sw: 2.6 });
    U.shape(C, "side", `M${fw} 0 L${w} 0 L${w} ${h} L${fw} ${h} Z`, MAT.grey, { sw: 2.4 });
    el("rect", { x: 0, y: 0, width: w, height: 26, fill: "#DFDFD8" }, g); ln(g, `M0 26 L${w} 26`, 2, "#6E6E68"); ln(g, `M0 0 L${w} 0`, 3);
    U.shape(C, "guard", U.rrect(fw - 6, 260, 12, h - 300, 3), MAT.alu, { sw: 2 });
    el("rect", { x: 0, y: h - 26, width: w, height: 26, fill: "#CBCBC4" }, g); ln(g, `M0 ${h - 26} L${w} ${h - 26}`, 1.8, "#6E6E68"); ln(g, `M0 ${h} L${w} ${h}`, 3);
    return { w, h, edge: [w, h] };
  };
  /* 44 · stéthoscope (au sol, ou qui tombe : le nœud tourne) — ancrage : centre ; ≈ 110 × 54 */
  D.stetho = (g, o = {}) => {
    o = Object.assign({ seed: 4411 }, o);
    const C = U.ctx(g, o.seed, false, 1), tube = "M34 4 C22 18 -2 18 -14 8 C-22 2 -30 -2 -38 -4";
    el("ellipse", { cx: 4, cy: 16, rx: 50, ry: 4, fill: "rgba(28,26,28,.14)" }, g);
    ln(g, tube, 7, INK); ln(g, tube, 3.4, "#77776F");
    ["M-38 -4 C-48 -10 -54 -20 -48 -30", "M-38 -4 C-34 -16 -26 -24 -30 -34"].forEach((d) => { ln(g, d, 4.4, INK); ln(g, d, 1.8, "#DADAD4"); });
    el("ellipse", { cx: -48, cy: -32, rx: 4.4, ry: 3.2, fill: INK }, g); el("ellipse", { cx: -30, cy: -36, rx: 4.4, ry: 3.2, fill: INK }, g);
    el("circle", { cx: -38, cy: -4, r: 3.4, fill: "#CFCFCA", stroke: INK, "stroke-width": 1.4 }, g);
    U.shape(C, "chest", circ(46, 4, 13), MAT.alu, { sw: 2.4 }); el("circle", { cx: 46, cy: 4, r: 7, fill: "#F4F4EF", stroke: INK, "stroke-width": 1.6 }, g);
    ln(g, "M33 4 L37 4", 4, INK);
    return { w: 110, h: 54 };
  };
  /* 44 · porte « Verwaltung » — ancrage : coin haut gauche du battant ; 150 × 580 ; huisserie, battant plein à deux panneaux, poignée au bord
   * libre (à gauche), charnières à droite ; o.open 0..1 : le battant pivote vers l'intérieur, l'intérieur est éclairé (jaune pâle) et un
   * coin de lumière s'allonge sur le sol vers la gauche (vers elle ; o.reach = longueur) ; o.plate : D.doorPlate au-dessus (à part pour
   * pulser : o.plate false + D.doorPlate à l'ancre plate) */
  D.adminDoor = (g, o = {}) => {
    o = Object.assign({ w: 150, h: 580, open: 0, plate: true, text: "Verwaltung", reach: 1, seed: 4421 }, o);
    const { w, h } = o, C = U.ctx(g, o.seed, false, 1), op = clamp(o.open, 0, 1), th = rad(72 * op), gx = f(w * (1 - Math.cos(th))), sk = 14 * Math.sin(th);
    if (op > 0.02) {
      const r = clamp(o.reach, 0, 1) * E(op);
      el("path", { d: `M0 ${h} L${gx} ${h} L${f(gx - 250 * r)} ${f(h + 60 * r)} L${f(-360 * r)} ${f(h + 34 * r)} Z`, fill: YEL, opacity: 0.34 }, g);
      el("path", { d: `M${f(gx * 0.3)} ${h} L${f(gx * 0.8)} ${h} L${f(gx * 0.8 - 200 * r)} ${f(h + 44 * r)} L${f(-260 * r)} ${f(h + 26 * r)} Z`, fill: "#FFF6C9", opacity: 0.5 }, g);
    }
    shadow(g, U.rrect(-12, -12, w + 24, h + 12, 3), 7, 0);
    el("path", { d: U.rrect(-12, -12, w + 24, h + 12, 3), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.6 }, g);
    el("rect", { x: 0, y: 0, width: w, height: h, fill: op > 0.02 ? "#FFF3C4" : "#3A3A37" }, g);
    if (op > 0.02) { el("rect", { x: 0, y: 0, width: gx, height: h, fill: YEL, opacity: 0.4 }, g); ln(g, `M0 ${h - 1} L${gx} ${h - 1}`, 2, "#D9A322"); }
    const X = (x) => f(gx + (x / w) * (w - gx));
    U.shape(C, "leaf", `M${gx} ${f(sk)} L${w} 0 L${w} ${h} L${gx} ${f(h - sk * 0.6)} Z`, MAT.light, { sw: 2.8 });
    ln(g, `M${X(18)} 130 L${X(w - 18)} 130 L${X(w - 18)} 322 L${X(18)} 322 Z M${X(18)} 352 L${X(w - 18)} 352 L${X(w - 18)} 500 L${X(18)} 500 Z`, 1.6, "#8A8A84");
    el("path", { d: `M${X(3)} ${h - 60} L${X(w - 3)} ${h - 60} L${X(w - 3)} ${h - 3} L${X(3)} ${h - 3} Z`, fill: "#CFCFCA", stroke: INK, "stroke-width": 1.6 }, g);
    el("rect", { x: X(10), y: 292, width: f(Math.max(7, (30 * (w - gx)) / w)), height: 9, rx: 4, fill: "#F4F4EF", stroke: INK, "stroke-width": 2.2 }, g);
    el("circle", { cx: X(16), cy: 314, r: 3, fill: INK }, g);
    if (o.plate) D.doorPlate(el("g", { transform: `translate(${w / 2} -36)` }, g), { text: o.text });
    return { plate: [w / 2, -36], gap: gx, floor: h };
  };
  D.adminDoor.essais = [{}, { open: 0.5 }, { open: 1 }];
  /* plaque de porte (.tw) — ancrage : centre ; largeur selon le texte */
  D.doorPlate = (g, o = {}) => {
    o = Object.assign({ text: "Verwaltung", size: 20, seed: 4431 }, o);
    const w = Math.round(o.text.length * o.size * 0.6 + 28), h = o.size + 14, d = U.rrect(-w / 2, -h / 2, w, h, 4), C = U.ctx(g, o.seed, false, 1);
    shadow(g, d, 4, 5); U.shape(C, "pl", d, MAT.white, { sw: 2.4 });
    [-1, 1].forEach((s) => el("circle", { cx: s * (w / 2 - 7), cy: 0, r: 2.2, fill: INK }, g));
    tw(g, o.text, 0, f(o.size * 0.35), o.size, {});
    return { w, h };
  };
  /* 44 · petit cadre au mur (un paysage au trait), pendu à un clou — ancrage : le clou (pivot) ; 124 × 94 sous le clou */
  D.frame04 = (g, o = {}) => {
    o = Object.assign({ w: 124, h: 94, seed: 4441 }, o);
    const { w, h } = o, C = U.ctx(g, o.seed, false, 1), y0 = 26, x0 = -w / 2 + 11, x1 = w / 2 - 11, yb = y0 + h - 11;
    ln(g, `M0 0 L${f(-w * 0.3)} ${y0 + 4} M0 0 L${f(w * 0.3)} ${y0 + 4}`, 1.6, "#55524B");
    shadow(g, U.rrect(-w / 2, y0, w, h, 3), 6, 7);
    U.shape(C, "fr", U.rrect(-w / 2, y0, w, h, 3), MAT.wood, { sw: 2.6 });
    el("rect", { x: x0, y: y0 + 11, width: w - 22, height: h - 22, fill: "#FBFBF6", stroke: INK, "stroke-width": 1.6 }, g);
    ln(g, `M${x0} ${yb - 18} Q-20 ${yb - 46} 8 ${yb - 24} Q28 ${yb - 40} ${x1} ${yb - 26}`, 2, "#55524B");
    ln(g, `M${x0 + 8} ${yb - 8} L${x0 + 30} ${yb - 8} M${x1 - 34} ${yb - 12} L${x1 - 12} ${yb - 12}`, 1.4, "#9A9A94");
    el("circle", { cx: 26, cy: y0 + 30, r: 7, fill: YEL, stroke: INK, "stroke-width": 1.4 }, g);
    el("circle", { cx: 0, cy: 0, r: 3.4, fill: INK }, g);
    return { w, h };
  };

  /* ═════════════════════════ C. HÔPITAL — le bureau de l'administration (scène 15) ═════════════════════════ */

  /* 35 · bureau (fond, coordonnées MONDE) : papier peint à rayures, corniche, plinthe, parquet de y 1300 à o.bottom (1480 : le pied du
   * fauteuil du premier plan descend à y 1470) puis fondu vers le papier */
  D.officeBack = (g, o = {}) => {
    o = Object.assign({ x0: -140, x1: 1220, top: 380, floorY: 1300, bottom: 1480, fade: 80, seed: 3501 }, o);
    const { x0, x1, top, floorY, bottom } = o, W = x1 - x0;
    el("rect", { x: x0, y: top, width: W, height: floorY - top, fill: "#EFEDE5" }, g);
    for (let x = Math.floor(x0 / 44) * 44; x < x1; x += 44) el("rect", { x, y: top + 30, width: 14, height: floorY - top - 58, fill: "#E8E5DB" }, g);
    el("rect", { x: x0, y: top, width: W, height: 30, fill: "#E3E0D5" }, g);
    ln(g, `M${x0} ${top} L${x1} ${top}`, 3); ln(g, `M${x0} ${top + 10} L${x1} ${top + 10}`, 1.3, "#A9A69C"); ln(g, `M${x0} ${top + 30} L${x1} ${top + 30}`, 2, "#6E6B62");
    el("rect", { x: x0, y: floorY - 28, width: W, height: 28, fill: "#D2CCBE" }, g);
    ln(g, `M${x0} ${floorY - 28} L${x1} ${floorY - 28}`, 1.8, "#6E6B62"); ln(g, `M${x0} ${floorY - 20} L${x1} ${floorY - 20}`, 1, "#A9A396");
    el("rect", { x: x0, y: floorY, width: W, height: bottom - floorY, fill: "#E4DED0" }, g);
    const rows = [0, 16, 36, 60, 90, 126, 168, 216]; rows.forEach((dy, r) => {
      if (floorY + dy >= bottom - 4) return; ln(g, `M${x0} ${floorY + dy} L${x1} ${floorY + dy}`, 1.2, "#C9C1AE");
      const h2 = (rows[r + 1] || dy + 50) - dy; for (let x = x0 + ((r * 97) % 180); x < x1; x += 180) ln(g, `M${x} ${floorY + dy} L${x - 4} ${floorY + dy + h2}`, 1.1, "#C9C1AE");
    });
    ln(g, `M${x0} ${floorY} L${x1} ${floorY}`, 3);
    floorFade(g, x0, W, bottom, o.fade);
    return { top, floorY, bottom };
  };
  D.officeBack.essais = [{ x0: 0, x1: 1080 }];
  /* 35 · store vénitien dans sa fenêtre — ancrage : coin haut gauche ; 300 × 340 ; 14 lames ; o.open 0..1 incline les lames (1 = on voit
   * le jour entre elles) ; caisson, cordons, barre de charge, cordon à gland, appui (ancre sill : la plante s'y pose)
   * o.part : "all" | "frame" (cadre, jour, appui : statique) | "slats" (lames : elles « respirent », tracé net) */
  D.blinds = (g, o = {}) => {
    o = Object.assign({ w: 300, h: 340, n: 14, open: 0.5, part: "all", seed: 3511 }, o);
    const { w, h, n } = o, P = o.part, op = clamp(o.open, 0, 1), C = U.ctx(g, o.seed, false, 1), y0 = 22, pitch = (h - y0 - 12) / n;
    if (P !== "slats") {
      const fr = U.rrect(-10, -10, w + 20, h + 20, 3); shadow(g, fr, 7, 8); U.shape(C, "fr", fr, MAT.white, { sw: 3 });
      el("rect", { x: 0, y: 0, width: w, height: h, fill: "#FDFBEE", stroke: INK, "stroke-width": 2 }, g);
      U.shape(C, "sill", U.rrect(-22, h + 10, w + 44, 14, 3), MAT.grey, { sw: 2.6 });
    }
    if (P !== "frame") {
      const th = pitch * (1 - 0.8 * op);
      for (let i = 0; i < n; i++) { const y = y0 + i * pitch; el("path", { d: `M4 ${f(y)} L${w - 4} ${f(y)} L${w - 4} ${f(y + th)} L4 ${f(y + th)} Z`, fill: "#E8E8E3", stroke: INK, "stroke-width": 1.3, "stroke-linejoin": "round" }, g); ln(g, `M6 ${f(y + th - 1.5)} L${w - 6} ${f(y + th - 1.5)}`, 1.2, "#A9A9A2"); }
      [w * 0.27, w * 0.73].forEach((x) => ln(g, `M${f(x)} ${y0} L${f(x)} ${f(y0 + n * pitch + 6)}`, 1.2, "#77776F"));
      el("path", { d: U.rrect(0, f(y0 + n * pitch - 2), w, 9, 3), fill: "#CFCFCA", stroke: INK, "stroke-width": 1.8 }, g);
      el("path", { d: U.rrect(-6, 0, w + 12, y0, 4), fill: "#DADAD4", stroke: INK, "stroke-width": 2.2 }, g);
      ln(g, `M${w - 18} ${y0} L${w - 18} ${f(h * 0.78)}`, 1.4, "#55524B"); el("path", { d: U.rrect(w - 22, f(h * 0.78), 8, 16, 3), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
    }
    return { w, h, sill: [w / 2, h + 10] };
  };
  D.blinds.essais = [{}, { open: 0.1 }, { open: 1 }];
  /* 35 · raies de lumière du store sur le mur — ancrage : coin haut gauche ; o.w × o.h, o.n raies inclinées (o.drop) ; o.op */
  D.blindLight = (g, o = {}) => {
    o = Object.assign({ w: 160, h: 300, n: 7, drop: 34, op: 1 }, o);
    const gg = el("g", { opacity: f(clamp(o.op, 0, 1)) }, g), step = o.h / o.n, bh = step * 0.46;
    for (let i = 0; i < o.n; i++) {
      const y = i * step;
      el("path", { d: `M0 ${f(y)} L${o.w} ${f(y + o.drop)} L${o.w} ${f(y + o.drop + bh)} L0 ${f(y + bh)} Z`, fill: YEL, opacity: 0.24 }, gg);
      el("path", { d: `M0 ${f(y + bh * 0.2)} L${f(o.w * 0.6)} ${f(y + bh * 0.2 + o.drop * 0.6)} L${f(o.w * 0.6)} ${f(y + bh * 0.55 + o.drop * 0.6)} L0 ${f(y + bh * 0.55)} Z`, fill: "#FFF6C9", opacity: 0.4 }, gg);
    }
    return { w: o.w, h: o.h };
  };
  /* 35 · petite plante en pot (sur l'appui) — ancrage : bas centre ; ≈ 76 × 116 */
  D.plant04 = (g, o = {}) => {
    o = Object.assign({ seed: 3531 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    [[-30, -98, -1], [-8, -116, 0], [16, -110, 1], [34, -88, 1], [-38, -70, -1], [28, -66, 1]].forEach(([x, y, s], i) => {
      const my = (y - 46) / 2, d = `M0 -46 Q${f(x * 0.2 - 8 * s)} ${f(my)} ${x} ${y} Q${f(x * 0.85 + 10 * s)} ${f(my + 10)} 0 -46 Z`;
      U.shape(C, "lf" + i, d, i % 2 ? MAT.grey : MAT.white, { sw: 2 });
      ln(g, `M0 -48 Q${f(x * 0.45)} ${f(my + 3)} ${f(x * 0.86)} ${f(y * 0.94)}`, 1.2, "#77776F");
    });
    shadow(g, "M-24 -46 L24 -46 L18 0 L-18 0 Z", 5, 4);
    U.shape(C, "pot", "M-24 -46 L24 -46 L18 0 L-18 0 Z", MAT.light, { sw: 2.4 });
    U.shape(C, "rim", U.rrect(-27, -52, 54, 10, 3), MAT.mid, { sw: 2.2 });
    return { top: [0, -116] };
  };
  // un classeur debout (dos : étiquette, œillet) — coin bas gauche en (x, y)
  function binder(g, C, x, y, w, h, mat, k) {
    U.shape(C, "b" + k, U.rrect(x, y - h, w, h, 3), mat, { sw: 2.2 });
    el("rect", { x: x + 5, y: y - h + 16, width: w - 10, height: 46, rx: 2, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.4 }, g);
    ln(g, `M${x + 9} ${y - h + 30} L${x + w - 9} ${y - h + 30} M${x + 9} ${y - h + 42} L${x + w - 13} ${y - h + 42}`, 1.4, "#9A9A94");
    el("circle", { cx: x + w / 2, cy: y - 24, r: 5, fill: PAPER, stroke: INK, "stroke-width": 1.8 }, g);
  }
  /* 35 · étagère de classeurs — ancrage : coin haut gauche ; 280 × 200 (tablette à y 152) ; 6 classeurs debout + le 7e PENCHÉ
   * (o.loose : D.binderSpine dessiné ici ; sinon à poser à l'ancre lean et à faire basculer de 0 à −12° à la construction) */
  D.binders = (g, o = {}) => {
    o = Object.assign({ w: 280, loose: true, seed: 3521 }, o);
    const C = U.ctx(g, o.seed, false, 1), base = 152;
    shadow(g, U.rrect(0, base, o.w, 16, 3), 6, 7);
    let x = 10; [MAT.grey, MAT.mid, MAT.light, MAT.yellow, MAT.grey, MAT.dark].forEach((m, i) => { binder(g, C, x, base, 32, 128 + Math.round(hs(i * 2.3 + 1) * 18), m, i); x += 34; });
    const lx = x + 22;
    if (o.loose) D.binderSpine(el("g", { transform: `translate(${lx} ${base}) rotate(-12)` }, g), {});
    U.shape(C, "shelf", U.rrect(0, base, o.w, 16, 3), MAT.wood, { sw: 2.6 });
    [30, o.w - 30].forEach((bx, i) => U.shape(C, "br" + i, `M${bx - 4} ${base + 16} L${bx + 4} ${base + 16} L${bx + 4} ${base + 46} L${bx - 4} ${base + 46} Z`, MAT.mid, { sw: 1.8 }));
    return { lean: [lx, base], shelf: base };
  };
  D.binders.essais = [{}, { loose: false }];
  /* un classeur debout, seul — ancrage : coin bas gauche (pivot quand il bascule) ; 32 × 140 */
  D.binderSpine = (g, o = {}) => { o = Object.assign({ w: 32, h: 140, seed: 3541 }, o); binder(g, U.ctx(g, o.seed, false, 1), 0, 0, o.w, o.h, MAT.mid, 9); return { w: o.w, h: o.h }; };
  /* 36 · bureau vu de côté — ancrage : coin haut gauche du plateau ; 575 × 195 (sol à y 195) ; plateau épais, façade pleine à partir de
   * x o.front (85 : ses genoux passent dessous, devant), panneau, caisson à 3 tiroirs, plaque vissée « Klinikverwaltung » (.tw 16, x 105–277,
   * y 55–93), pot à crayons en o.pot (x ; null = sans) */
  D.desk04 = (g, o = {}) => {
    o = Object.assign({ w: 575, h: 195, front: 85, plaque: "Klinikverwaltung", pot: 300, seed: 3601 }, o);
    const { w, h } = o, x0 = o.front, C = U.ctx(g, o.seed, false, 1), px = x0 + 20, dx = w - 186;
    shadow(g, `M${x0} 20 L${w} 20 L${w} ${h} L${x0} ${h} Z`, 8, 0);
    U.shape(C, "body", `M${x0} 22 L${w - 6} 22 L${w - 6} ${h - 10} L${x0} ${h - 10} Z`, MAT.wood, { sw: 2.8 });
    el("rect", { x: x0 + 4, y: h - 10, width: w - x0 - 14, height: 10, fill: "#3A3A37" }, g);
    U.stroke(C, "pn", U.rrect(x0 + 12, 36, dx - x0 - 24, h - 60, 3), { sw: 1.8, stroke: "#6E6E68", r: 0.6 });
    [0, 1, 2].forEach((i) => { const y = 34 + i * 50; U.stroke(C, "dr" + i, U.rrect(dx, y, 168, 44, 3), { sw: 1.8, stroke: "#6E6E68", r: 0.6 }); el("rect", { x: dx + 64, y: y + 18, width: 40, height: 8, rx: 4, fill: "#F4F4EF", stroke: INK, "stroke-width": 1.8 }, g); });
    shadow(g, U.rrect(px, 55, 172, 38, 3), 4, 5); U.shape(C, "pq", U.rrect(px, 55, 172, 38, 3), MAT.white, { sw: 2.2 });
    [[px + 7, 61], [px + 165, 61], [px + 7, 87], [px + 165, 87]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 2, fill: INK }, g));
    tw(g, o.plaque, px + 86, 79, 16, {});
    U.shape(C, "top", U.rrect(0, 0, w, 24, 5), MAT.mid, { sw: 3 }); ln(g, `M10 6 L${w - 10} 6`, 2, "#F4F4EF");
    if (o.pot != null) {
      const x = o.pot;
      [[-9, -74, false], [2, -84, true], [10, -70, false]].forEach(([d, y, yel]) => { ln(g, `M${x + d * 0.6} -40 L${x + d} ${y}`, 5, INK); ln(g, `M${x + d * 0.6} -40 L${x + d} ${y}`, 2, yel ? YEL : "#9A9A94"); });
      U.shape(C, "pot", U.rrect(x - 17, -48, 34, 48, 4), MAT.grey, { sw: 2.2 });
    }
    return { top: 0, plaque: [px + 86, 74], w, h };
  };
  /* 37 · grand fauteuil de bureau VU DE DOS (premier plan : l'administration, aucun visage) — ancrage : bas centre ; 260 × 412 : dossier
   * sombre arrondi à couture centrale, appui-tête, un accoudoir (à gauche : la manche part de là, ancre arm), assise, vérin, piètement étoile */
  D.chairBack = (g, o = {}) => {
    o = Object.assign({ seed: 3701 }, o);
    const C = U.ctx(g, o.seed, false, 1), back = "M-96 -168 C-114 -230 -114 -320 -98 -356 Q0 -384 98 -356 C114 -320 114 -230 96 -168 Q0 -156 -96 -168 Z";
    el("ellipse", { cx: 8, cy: 0, rx: 112, ry: 9, fill: "rgba(28,26,28,.16)" }, g);
    [[-98, -12], [-46, -6], [46, -6], [98, -12]].forEach(([x, y]) => { ln(g, `M0 -34 L${x} ${y - 8}`, 9, INK); ln(g, `M0 -34 L${x} ${y - 8}`, 4, "#77776F"); el("circle", { cx: x, cy: y, r: 9, fill: "#3A3A37", stroke: INK, "stroke-width": 2 }, g); });
    U.shape(C, "col", U.rrect(-8, -140, 16, 108, 4), MAT.alu, { sw: 2.2 });
    U.shape(C, "boot", U.rrect(-14, -96, 28, 52, 7), MAT.dark, { sw: 2.2 });
    U.shape(C, "seat", U.rrect(-104, -176, 208, 40, 16), MAT.dark, { sw: 2.6 });
    U.shape(C, "armp", U.rrect(-118, -236, 12, 66, 4), MAT.mid, { sw: 2 });
    U.shape(C, "arm", U.rrect(-130, -250, 34, 18, 8), MAT.dark, { sw: 2.4 });
    shadow(g, back, 6, 6);
    U.shape(C, "back", back, MAT.dark, { sw: 3 });
    ln(g, "M0 -366 L0 -168", 1.8, "#9A9A94", { "stroke-dasharray": "6 5" });
    ln(g, "M-62 -352 Q-76 -260 -62 -172 M62 -352 Q76 -260 62 -172", 1.6, "#77776F");
    [-28, 28].forEach((x) => el("rect", { x: x - 4, y: -384, width: 8, height: 22, fill: "#77776F", stroke: INK, "stroke-width": 1.6 }, g));
    U.shape(C, "head", U.rrect(-58, -412, 116, 34, 15), MAT.dark, { sw: 2.6 });
    return { arm: [-114, -242], top: [0, -412] };
  };
  /* 38 · avant-bras en manche de costume sombre, poignet de chemise blanc, bouton de manchette, MAIN EN MOUFLE qui tient un stylo
   * — ancrage : l'épaule (cachée derrière le fauteuil) ; o.len (115–200) = longueur jusqu'au poignet ; o.angle = direction (°, 0 = vers la
   * droite ; 206 = vers elle, en haut à gauche) ; o.pen (stylo dans la main) ; vers la gauche, le dessin est retourné (pouce au-dessus).
   * Ancres (repère du parent) : hand, tip (pointe du stylo), cuff */
  D.suitArm = (g, o = {}) => {
    o = Object.assign({ len: 150, angle: 206, pen: true, seed: 3801 }, o);
    const L = o.len, a = o.angle, flip = Math.cos(rad(a)) < 0;
    const r = el("g", { transform: `rotate(${f(a)})${flip ? " scale(1 -1)" : ""}` }, g), C = U.ctx(r, o.seed, false, 1);
    U.shape(C, "sl", `M-6 -21 Q${f(L * 0.5)} -22 ${L - 14} -16 L${L - 14} 16 Q${f(L * 0.5)} 21 -6 21 Z`, MAT.dark, { sw: 2.6 });
    ln(r, `M${f(L * 0.3)} 8 Q${f(L * 0.5)} 12 ${f(L * 0.7)} 6 M${f(L * 0.4)} -12 Q${f(L * 0.55)} -8 ${f(L * 0.62)} -13`, 1.6, "#9A9A94");
    U.shape(C, "cuff", U.rrect(L - 16, -15, 15, 30, 3), MAT.white, { sw: 2.2 });
    el("circle", { cx: L - 8.5, cy: 9, r: 2.8, fill: YEL, stroke: INK, "stroke-width": 1.2 }, r);
    if (o.pen) D.pen(el("g", { transform: `translate(${L + 72} 2)` }, r), { angle: 180, len: 62 });   // sous la moufle : seuls la pointe et le grip dépassent
    U.shape(C, "palm", U.blob([[L - 3, -11], [L + 12, -14], [L + 28, -12], [L + 37, -4], [L + 37, 6], [L + 29, 13], [L + 12, 15], [L - 3, 11]]), MAT.white, { sw: 2.5 });
    ln(r, `M${L + 14} 6 Q${L + 24} 9 ${L + 32} 5`, 1.6, "#8A8A84");   // le pli des doigts repliés
    U.shape(C, "thumb", U.blob([[L + 8, -10], [L + 13, -21], [L + 24, -22], [L + 28, -12], [L + 22, -6]]), MAT.white, { sw: 2.4 });
    const P = (x, y) => { const yy = flip ? -y : y, c = Math.cos(rad(a)), s = Math.sin(rad(a)); return [f(x * c - yy * s), f(x * s + yy * c)]; };
    return { hand: P(L + 18, 0), tip: P(L + 72, 2), cuff: P(L - 8, 0) };
  };
  D.suitArm.essais = [{}, { len: 190 }, { len: 115, angle: 196, pen: false }, { angle: -20 }];
  /* 39 · classeur couché, dos tapé « Verantwortung » — ancrage : bas centre ; 172 × 34 */
  D.binderLying = (g, o = {}) => {
    o = Object.assign({ text: "Verantwortung", w: 172, h: 34, seed: 3911 }, o);
    const { w, h } = o, C = U.ctx(g, o.seed, false, 1);
    shadow(g, U.rrect(-w / 2 - 3, -h - 3, w + 6, h + 3, 3), 6, 4);
    U.shape(C, "body", U.rrect(-w / 2, -h, w, h, 3), MAT.grey, { sw: 2.4 });
    U.shape(C, "ct", U.rrect(-w / 2 - 3, -h - 3, w + 6, 6, 2), MAT.mid, { sw: 1.8 }); U.shape(C, "cb", U.rrect(-w / 2 - 3, -4, w + 6, 6, 2), MAT.mid, { sw: 1.8 });
    el("rect", { x: -68, y: -h + 6, width: 122, height: 22, rx: 2, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
    tw(g, o.text, -7, -h + 22, 14, {});
    el("circle", { cx: w / 2 - 15, cy: -h / 2, r: 5.5, fill: PAPER, stroke: INK, "stroke-width": 1.8 }, g);
    return { w, h };
  };

  /* ═════════════════════════ C. Les mois (scène 16) ; chaise (15, 16, 17) ═════════════════════════ */

  /* 40 · chaise à quatre pieds vue de côté (pour Persona.Pose.sitEdge : hanche à y −96, assise à o.seat −84) — ancrage : bas centre (sol,
   * sous la hanche) ; dossier incliné en arrière (−x), pieds avant en +x ; o.flip : tournée vers la gauche (personnage facing −1) */
  D.chair04 = (g, o = {}) => {
    o = Object.assign({ seat: -84, flip: false, seed: 4001 }, o);
    const r = o.flip ? el("g", { transform: "scale(-1 1)" }, g) : g, C = U.ctx(r, o.seed, o.flip, 1), s = o.seat;
    el("ellipse", { cx: 4, cy: 0, rx: 66, ry: 5, fill: "rgba(28,26,28,.14)" }, r);
    [[56, -6], [-30, -6]].forEach(([x, dy]) => el("rect", { x, y: s + 8 + dy, width: 7, height: -s - 12 - dy, fill: "#D6D6D0", stroke: "#8A8A84", "stroke-width": 1.6 }, r));   // pieds du fond
    U.shape(C, "back", `M-44 0 L-35 0 L-35 ${s} L-47 ${s - 176} L-56 ${s - 174} L-44 ${s} Z`, MAT.wood, { sw: 2.4 });
    U.shape(C, "rest", `M-60 ${s - 170} L-44 ${s - 172} L-38 ${s - 92} L-53 ${s - 90} Z`, MAT.mid, { sw: 2.2 });
    U.shape(C, "front", U.rrect(38, s + 8, 10, -s - 8, 3), MAT.wood, { sw: 2.4 });
    ln(r, `M-35 ${f(s * 0.42)} L40 ${f(s * 0.42)}`, 3, "#6E6E68");
    U.shape(C, "seat", U.rrect(-56, s - 4, 112, 15, 5), MAT.mid, { sw: 2.6 });
    return { seat: [0, s] };
  };
  D.chair04.essais = [{}, { flip: true }];
  /* 40 · la blouse blanche pendue (stéthoscope autour du col, badge JAUNE VIERGE à la poche) — ancrage : le crochet (pivot de m.sway) ;
   * o.s = échelle (0,72 : ≈ 141 × 240 sous le crochet, à la taille de la blouse que porte Persona à l'échelle 1 ; à 1 : 196 × 336) */
  D.coatHung = (g, o = {}) => {
    o = Object.assign({ s: 0.72, steth: true, badge: true, seed: 4061 }, o);
    g = el("g", { transform: `scale(${o.s})` }, g);
    const C = U.ctx(g, o.seed, false, 1), body = "M-20 10 Q0 4 20 10 L70 40 Q80 46 80 60 L86 322 Q0 332 -86 322 L-80 60 Q-80 46 -70 40 Z";
    shadow(g, body, 7, 8);
    [-1, 1].forEach((sd, i) => U.shape(C, "sv" + i, `M${sd * 66} 44 Q${sd * 92} 60 ${sd * 96} 140 L${sd * 98} 250 L${sd * 74} 254 L${sd * 72} 150 Z`, MAT.milk, { sw: 2.4 }));
    U.shape(C, "body", body, MAT.milk, { sw: 2.8 });
    U.shape(C, "lapL", "M-20 10 L-34 26 L-10 118 L0 112 Z", MAT.white, { sw: 2.2 }); U.shape(C, "lapR", "M20 10 L34 26 L10 118 L0 112 Z", MAT.white, { sw: 2.2 });
    ln(g, "M0 112 L0 326", 2, INK); ln(g, "M-6 10 Q0 -2 6 10", 2.2, INK);
    [150, 200, 250].forEach((y) => el("circle", { cx: -7, cy: y, r: 3.4, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g));
    ln(g, "M26 84 L68 84 L66 124 L28 124 Z M-70 214 L-30 214 L-32 262 L-68 262 Z M30 214 L70 214 L68 262 L32 262 Z", 1.8, INK);
    if (o.badge) { el("rect", { x: 36, y: 62, width: 24, height: 32, rx: 3, fill: YEL, stroke: INK, "stroke-width": 2 }, g); ln(g, "M48 62 L48 54", 2, INK); }
    ln(g, "M60 84 L62 70 M64 84 L67 72", 2.6, INK);
    if (o.steth) {
      ["M-24 14 C-46 42 -48 112 -30 150", "M24 14 C48 48 46 122 30 160"].forEach((d) => { ln(g, d, 6, INK); ln(g, d, 2.6, "#77776F"); });
      el("ellipse", { cx: -30, cy: 153, rx: 4.4, ry: 3.4, fill: INK }, g);
      U.shape(C, "chest", circ(30, 170, 11), MAT.alu, { sw: 2.2 }); el("circle", { cx: 30, cy: 170, r: 5.5, fill: "#F4F4EF", stroke: INK, "stroke-width": 1.4 }, g);
    }
    return { h: f(332 * o.s), w: f(196 * o.s) };
  };
  /* 40 · patère sur pied avec la blouse pendue (o.coat : D.coatHung dessinée ici ; sinon à poser à l'ancre hook pour m.sway) — ancrage :
   * bas centre ; hauteur o.h (600 : un peu plus haute qu'elle debout) ; trépied, mât, deux crochets, boule ; blouse ≈ 141 de large */
  D.coatRack = (g, o = {}) => {
    o = Object.assign({ h: 600, coat: true, seed: 4051 }, o);
    const C = U.ctx(g, o.seed, false, 1), H = o.h;
    el("ellipse", { cx: 4, cy: 2, rx: 72, ry: 5, fill: "rgba(28,26,28,.15)" }, g);
    [[-64, 0], [64, 0], [-18, 6]].forEach(([x, y], i) => { U.shape(C, "leg" + i, `M-6 -46 L6 -46 L${x + 5} ${y - 4} L${x - 5} ${y - 4} Z`, MAT.wood, { sw: 2.2 }); el("ellipse", { cx: x, cy: y - 3, rx: 9, ry: 4, fill: "#3A3A37" }, g); });
    U.shape(C, "pole", U.rrect(-6, -H, 12, H - 40, 5), MAT.wood, { sw: 2.4 });
    [-1, 1].forEach((sd) => { const d = `M0 ${-H + 30} C${sd * 18} ${-H + 30} ${sd * 34} ${-H + 18} ${sd * 32} ${-H}`; ln(g, d, 6, INK); ln(g, d, 2.6, "#CFC6B0"); el("circle", { cx: sd * 32, cy: -H, r: 5, fill: "#E9E9E3", stroke: INK, "stroke-width": 1.8 }, g); });
    el("circle", { cx: 0, cy: -H - 8, r: 10, fill: "#E9E9E3", stroke: INK, "stroke-width": 2.4 }, g);
    if (o.coat) D.coatHung(el("g", { transform: `translate(0 ${-H + 24})` }, g), {});
    return { hook: [0, -H + 24] };
  };
  /* 40 · fenêtre des saisons (aucun calendrier : AKTE 06) — ancrage : coin haut gauche ; 320 × 360 ; une branche entre par la gauche.
   * o.p 0 → 1 : les 8 feuilles se détachent et tombent (0–0,36), il neige (0,3–0,7 ; la neige se pose sur la branche), les bourgeons
   * sortent (0,66–1). o.part : "all" | "frame" | "sky" (le paysage : à chaque image). La tache de lumière au sol = D.lightPatch. */
  D.seasonWindow = (g, o = {}) => {
    o = Object.assign({ w: 320, h: 360, p: 0, part: "all", seed: 4071 }, o);
    const { w, h } = o, P = o.part, p = clamp(o.p, 0, 1), C = U.ctx(g, o.seed, false, 1), my = Math.round(h * 0.42);
    const ring = U.rrect(-10, -10, w + 20, h + 20, 4) + ` M0 0 L0 ${h} L${w} ${h} L${w} 0 Z`;   // cadre en anneau (voir nightWindow)
    if (P !== "sky") shadow(g, ring, 7, 8);
    if (P !== "frame") {
      const s = clipRect(g, 0, 0, w, h), br = "M-10 122 C60 114 120 98 190 72 C230 58 270 54 330 42";
      el("rect", { x: 0, y: 0, width: w, height: h, fill: "#FCFBF3" }, s);
      ln(s, `M0 ${h - 40} Q${w * 0.3} ${h - 58} ${w * 0.55} ${h - 46} T${w} ${h - 50}`, 1.6, "#D6D6CF");
      ln(s, br, 11, INK); ln(s, br, 6.5, "#77776F");
      ["M70 110 C80 88 92 76 104 66", "M140 94 C150 114 160 124 178 130", "M196 70 C206 48 214 36 230 26", "M250 54 C262 72 276 80 294 82"].forEach((d) => { ln(s, d, 5, INK); ln(s, d, 2.4, "#77776F"); });
      const spots = [[104, 66], [178, 130], [230, 26], [294, 82], [60, 114], [160, 90], [262, 56], [124, 102]];
      const pL = clamp(p / 0.36, 0, 1), pS = clamp((p - 0.3) / 0.4, 0, 1), pB = clamp((p - 0.66) / 0.34, 0, 1);
      spots.forEach(([x, y], i) => {
        const u = clamp((pL - (i / 8) * 0.62) / 0.38, 0, 1); if (u >= 1) return;
        const fx = x + 30 * Math.sin(u * 5 + i) * u + 40 * u, fy = y + u * (h + 40 - y), rot = (i % 2 ? 1 : -1) * (30 + 260 * u);
        const lg = el("g", { transform: `translate(${f(fx)} ${f(fy)}) rotate(${f(rot)})` }, s);
        el("path", { d: "M0 0 Q11 -11 24 0 Q11 11 0 0 Z", fill: i % 3 ? "#EFE9D2" : "#F5DE8E", stroke: INK, "stroke-width": 1.6 }, lg); ln(lg, "M1 0 L20 0", 1.1, "#8A8A84");
      });
      if (pS > 0.01 && pS < 0.999) {
        const fo = f(Math.sin(pS * Math.PI));
        for (let i = 0; i < 10; i++) {
          const x = hs(i * 3.3) * (w - 20) + 10 + 8 * Math.sin(pS * 9 + i), y = ((pS * 1.6 + hs(i * 7.1)) % 1) * (h + 20) - 10, r = 5 + 2 * hs(i);
          ln(s, `M${f(x - r)} ${f(y)} L${f(x + r)} ${f(y)} M${f(x - r * 0.5)} ${f(y - r * 0.87)} L${f(x + r * 0.5)} ${f(y + r * 0.87)} M${f(x - r * 0.5)} ${f(y + r * 0.87)} L${f(x + r * 0.5)} ${f(y - r * 0.87)}`, 1.6, "#8A8A84", { opacity: fo });
        }
      }
      const sn = Math.min(pS * 3, 1) * (1 - pB);
      if (sn > 0.02) { const cap = "M-10 114 C60 106 120 90 190 64 C230 50 270 46 330 34", cg = el("g", { opacity: f(sn) }, s); ln(cg, cap, 7.5, "#9A9A94"); ln(cg, cap, 5, "#FFFFFF"); }
      if (pB > 0.01) spots.slice(0, 6).forEach(([x, y], i) => { const r = 6.5 * clamp(pB * 1.4 - i * 0.07, 0, 1); if (r > 0.3) el("ellipse", { cx: x, cy: y - 2, rx: f(r * 0.8), ry: f(r), fill: "#F3DC8A", stroke: INK, "stroke-width": 1.4 }, s); });
    }
    if (P !== "sky") {
      U.shape(C, "fr", ring, MAT.white, { sw: 3 });
      U.shape(C, "mv", U.rrect(w / 2 - 6, -2, 12, h + 4, 1), MAT.white, { sw: 2.2 });
      U.shape(C, "mh", U.rrect(-2, my - 6, w + 4, 12, 1), MAT.white, { sw: 2.2 });
      el("rect", { x: w / 2 + 12, y: my + 14, width: 7, height: 26, rx: 3.5, fill: INK }, g);
      U.shape(C, "sill", U.rrect(-22, h + 10, w + 44, 16, 3), MAT.grey, { sw: 2.6 });
    }
    return { w, h };
  };
  D.seasonWindow.essais = [{ p: 0 }, { p: 0.2 }, { p: 0.5 }, { p: 0.92 }];

  /* ═════════════════════════ B. TRIBUNAL — la balance se vide, puis se remplit (scènes 18, 19, 20) ═════════════════════════ */

  /* 21 · poids « 90 » dessiné EN POINTILLÉS (= demandé, jamais posé), intérieur vide, étiquette à ficelle « beantragt » qui pend sous la
   * console (pas vers la balance) ; console murale (o.console) — ancrage : bas centre du poids = dessus de la console ; 80 × 84
   * o.dash : décalage des tirets (ils défilent) · o.gone 0..1 : les tirets s'écartent et s'effacent ; o.label (l'étiquette ; à part :
   * D.stringTag, pour qu'elle tombe) */
  D.weight90 = (g, o = {}) => {
    o = Object.assign({ dash: 0, gone: 0, label: true, console: true, text: "beantragt" }, o);
    const gn = clamp(o.gone, 0, 1), body = "M-28 -60 L28 -60 Q38 -60 39 -48 L40 -10 Q40 0 30 0 L-30 0 Q-40 0 -40 -10 L-39 -48 Q-38 -60 -28 -60 Z";
    if (o.console) {
      const C = U.ctx(g, 2111, false, 1);
      shadow(g, U.rrect(-54, 0, 108, 14, 3), 5, 6);
      U.shape(C, "plate", U.rrect(-8, 12, 16, 54, 3), MAT.mid, { sw: 2 }); [26, 52].forEach((y) => el("circle", { cx: 0, cy: y, r: 2.2, fill: INK }, g));
      U.shape(C, "shelf", U.rrect(-54, 0, 108, 14, 3), MAT.wood, { sw: 2.4 });
    }
    if (gn < 0.99) {
      const dg = el("g", { opacity: f(1 - gn) }, g), sp = { fill: "none", stroke: INK, "stroke-width": 3.4, "stroke-dasharray": `10 ${f(7 + 30 * gn)}`, "stroke-dashoffset": f(o.dash), "stroke-linecap": "round", "stroke-linejoin": "round" };
      el("path", Object.assign({ d: body }, sp), dg); el("circle", Object.assign({ cx: 0, cy: -72, r: 11 }, sp), dg);
      ln(dg, "M-6 -61 L-6 -63 M6 -61 L6 -63", 3, INK);
      tw(dg, "90", 0, -18, 34, {});
    }
    if (o.label) D.stringTag(el("g", { transform: "translate(34 -4)" }, g), { text: o.text });
    return { top: [0, -84], label: [34, -4] };
  };
  D.weight90.essais = [{}, { gone: 0.5, dash: 6, label: false }];
  /* étiquette à ficelle — ancrage : l'attache de la ficelle (pivot) ; la ficelle descend de o.len, l'étiquette (trou à droite) part vers
   * la gauche ; .tw o.size */
  D.stringTag = (g, o = {}) => {
    o = Object.assign({ text: "beantragt", len: 18, size: 14 }, o);
    const w = Math.round(o.text.length * o.size * 0.6 + 26), h = o.size + 12, y = o.len;
    ln(g, `M0 0 Q4 ${f(y * 0.5)} 0 ${y}`, 1.6, "#55524B");
    const d = `M8 ${y + 6} L8 ${y + h} L${8 - w} ${y + h} L${8 - w} ${y} L2 ${y} Z`;
    shadow(g, d, 3, 4); el("path", { d, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" }, g);
    el("circle", { cx: 0, cy: y + 6, r: 2.6, fill: PAPER, stroke: INK, "stroke-width": 1.2 }, g);
    tw(g, o.text, f(8 - w / 2 - 6), f(y + h / 2 + o.size * 0.35), o.size, {});
    return { w, h };
  };
  /* 24 · chariot à dossiers bas « Klinikverwaltung » — ancrage : centre du plateau (dessus) ; 240 × 120 (sol à y 120) ; tablier à plaque
   * vissée (.tw 17), étagère basse avec trois dossiers couchés, poignée de poussée à droite, deux roues (o.wheel = angle des rayons)
   * o.part : "all" | "body" | "wheels" (pendant qu'il roule, seules les roues se redessinent) */
  D.cart = (g, o = {}) => {
    o = Object.assign({ w: 240, wheel: 0, plaque: "Klinikverwaltung", part: "all", seed: 2401 }, o);
    const hw = o.w / 2, C = U.ctx(g, o.seed, false, 1), P = o.part, hd = `M${hw - 8} 6 L${hw + 6} -54 L${hw + 22} -54`;
    if (P !== "wheels") {
      el("ellipse", { cx: 8, cy: 120, rx: hw + 6, ry: 7, fill: "rgba(28,26,28,.16)" }, g);
      ln(g, hd, 7, INK); ln(g, hd, 3, "#DADAD4");
      [-hw + 8, hw - 8].forEach((x, i) => U.shape(C, "post" + i, U.rrect(x - 5, 6, 10, 90, 3), MAT.alu, { sw: 2 }));
      [[-hw + 20, 62, 110, MAT.grey], [-hw + 26, 52, 96, MAT.yellow], [10, 60, 92, MAT.light]].forEach(([x, y, w, m], i) => U.shape(C, "fd" + i, U.rrect(x, y, w, 10, 2), m, { sw: 1.8 }));
      U.shape(C, "low", U.rrect(-hw + 4, 72, o.w - 8, 10, 3), MAT.mid, { sw: 2.2 });
      U.shape(C, "apron", U.rrect(-hw + 6, 12, o.w - 12, 34, 3), MAT.light, { sw: 2.4 });
      shadow(g, U.rrect(-96, 16, 192, 26, 3), 3, 4); U.shape(C, "pq", U.rrect(-96, 16, 192, 26, 3), MAT.white, { sw: 2 });
      [-89, 89].forEach((x) => el("circle", { cx: x, cy: 29, r: 2, fill: INK }, g));
      tw(g, o.plaque, 0, 35, 17, {});
      U.shape(C, "top", U.rrect(-hw, 0, o.w, 14, 4), MAT.mid, { sw: 2.8 }); ln(g, `M${-hw + 10} 5 L${hw - 10} 5`, 1.8, "#F4F4EF");
    }
    if (P !== "body") [-hw + 30, hw - 30].forEach((x) => {
      el("rect", { x: x - 6, y: 82, width: 12, height: 16, fill: "#B9B9B3", stroke: INK, "stroke-width": 1.8 }, g);
      el("circle", { cx: x, cy: 106, r: 14, fill: "#4A4A46", stroke: INK, "stroke-width": 2.2 }, g);
      for (let k = 0; k < 3; k++) { const a = rad(o.wheel + k * 120); ln(g, `M${x} 106 L${f(x + 10 * Math.cos(a))} ${f(106 + 10 * Math.sin(a))}`, 2, "#DADAD4"); }
      el("circle", { cx: x, cy: 106, r: 3.4, fill: "#DADAD4" }, g);
    });
    return { top: 0, plaque: [0, 29], w: o.w, h: 120 };
  };
  D.cart.essais = [{}, { part: "wheels", wheel: 60 }];
  /* 19 · une tranche du bloc « SCHULDIG » (même matière, même largeur que D.guiltBlock : les 4 tranches le remplacent sans saut) avec un
   * pictogramme blanc (o.icon : "hours" = 3 cases noircies + « 63 » ; "licence" = carte barrée ; "twins" = deux poches ; "sheet" = feuille
   * noire de lignes) — ancrage : centre de la face avant ; 150 × 26 (+ dessus et côté en perspective ; o.top : dessus visible) */
  D.slab = (g, o = {}) => {
    o = Object.assign({ w: 150, h: 26, icon: "hours", top: true, seed: 1901 }, o);
    const hw = o.w / 2, hh = o.h / 2, t = 9, k = 10, C = U.ctx(g, o.seed, false, 1), W_ = "#FFFFFF";
    el("path", { d: `M${-hw} ${-hh} L${-hw + k} ${-hh - t} L${hw + k} ${-hh - t} L${hw + k} ${hh - t} L${hw} ${hh} L${-hw} ${hh} Z`, fill: SH, transform: "translate(6 6)" }, g);
    if (o.top) U.shape(C, "top", `M${-hw} ${-hh} L${-hw + k} ${-hh - t} L${hw + k} ${-hh - t} L${hw} ${-hh} Z`, MAT.mid, { sw: 2.2, r: 0.5 });
    U.shape(C, "side", `M${hw} ${-hh} L${hw + k} ${-hh - t} L${hw + k} ${hh - t} L${hw} ${hh} Z`, { base: "#2B2A2B" }, { sw: 2.2, r: 0.5 });
    U.shape(C, "front", `M${-hw} ${-hh} L${hw} ${-hh} L${hw} ${hh} L${-hw} ${hh} Z`, { base: "#3A3A37", hatch: INK, gap: 4, fw: 1.5 }, { sw: 2.6, r: 0.5 });
    if (o.icon === "hours") {
      [-44, -29, -14].forEach((x) => { el("rect", { x, y: -6.5, width: 13, height: 13, fill: "#77776F", stroke: W_, "stroke-width": 1.8 }, g); ln(g, `M${x + 2} ${4.5} L${x + 11} -4.5 M${x + 2} -1 L${x + 6} -5`, 1.4, W_); });
      tw(g, "63", 20, 6.5, 18, { fill: W_ });
    } else if (o.icon === "licence") {
      el("path", { d: U.rrect(-18, -9, 36, 18, 3), fill: "none", stroke: W_, "stroke-width": 1.8 }, g);
      el("rect", { x: -14, y: -5, width: 9, height: 11, fill: "none", stroke: W_, "stroke-width": 1.3 }, g); ln(g, "M-1 -3 L13 -3 M-1 2 L9 2", 1.3, W_);
      ln(g, "M-24 10 L24 -10", 3.2, W_);
    } else if (o.icon === "twins") {
      [-11, 11].forEach((x) => { el("path", { d: U.rrect(x - 7, -7, 14, 17, 3), fill: "none", stroke: W_, "stroke-width": 1.8 }, g); el("rect", { x: x - 3, y: -10.5, width: 6, height: 3.5, fill: W_ }, g); ln(g, `M${x - 4} 2 L${x + 4} 2`, 1.3, W_); });
    } else if (o.icon === "sheet") {
      el("rect", { x: -9, y: -10, width: 18, height: 21, fill: W_ }, g);
      [-6, -2, 2, 6].forEach((y, i) => ln(g, `M-6 ${y} L${i % 2 ? 3 : 6} ${y}`, 1.6, INK));
    }
    return { w: o.w, h: o.h };
  };
  D.slab.essais = [{ icon: "hours" }, { icon: "licence" }, { icon: "twins" }, { icon: "sheet", top: false }];
  /* 20 · tout petit poids de balance en laiton (sa faute : « 1 ») — ancrage : bas centre ; 44 × 44 */
  D.coreWeight = (g) => {
    const C = U.ctx(g, 2001, false, 1);
    el("ellipse", { cx: 3, cy: 1, rx: 22, ry: 3.4, fill: "rgba(28,26,28,.2)" }, g);
    U.shape(C, "body", "M-20 0 L-22 -24 Q-22 -29 -17 -29 L17 -29 Q22 -29 22 -24 L20 0 Z", MAT.brass, { sw: 2.4 });
    el("ellipse", { cx: 0, cy: -29, rx: 19, ry: 4, fill: "#FBE9A6", stroke: INK, "stroke-width": 2 }, g);
    el("rect", { x: -4.5, y: -36, width: 9, height: 7, fill: "#E3AE2C", stroke: INK, "stroke-width": 1.8 }, g);
    el("circle", { cx: 0, cy: -38.5, r: 5.5, fill: YEL, stroke: INK, "stroke-width": 2 }, g);
    tw(g, "1", 0, -7, 17, { fill: "#6B5313" });
    ln(g, "M-15 -22 L-14 -6", 2, "#FFF6C9");
    return { top: [0, -44] };
  };
  /* pictogramme « une poche + une loupe » (scène 19 : « pas assez bien vérifié la poche ») dans une pastille blanche — ancrage : centre ; Ø 60 */
  D.checkIcon = (g, o = {}) => {
    o = Object.assign({ r: 30 }, o);
    el("circle", { cx: 3, cy: 4, r: o.r, fill: SH }, g);
    el("circle", { cx: 0, cy: 0, r: o.r, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, g);
    el("path", { d: U.rrect(-17, -14, 22, 30, 5), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2 }, g);
    el("rect", { x: -10, y: -19, width: 8, height: 6, rx: 2, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
    ln(g, "M-13 -5 L0 -5 M-13 1 L-4 1", 1.6, "#8A8A84");
    el("circle", { cx: 5, cy: 4, r: 9.5, fill: "rgba(255,255,255,.65)", stroke: INK, "stroke-width": 3 }, g);
    ln(g, "M12 11 L20 19", 4.4, INK);
    return { r: o.r };
  };
  /* 23 · petit caillou gris irrégulier avec un pictogramme blanc (ce qu'elle a déjà subi, scène 20) — ancrage : bas centre ; Ø 46
   * o.icon : "crack" (l'effondrement, sc. 14) · "leaf" (une feuille qui tombe : les mois, sc. 16 — pas une feuille de calendrier, réservée
   * à AKTE 06) · "coat" (la blouse sur sa patère, sc. 16) */
  D.pebble = (g, o = {}) => {
    o = Object.assign({ icon: "crack", seed: 2301 }, o);
    const pts = []; for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2, rr = 23 * (0.88 + 0.16 * hs(i * 2.7 + o.seed)); pts.push([rr * Math.cos(a) * 1.1, -21 + rr * Math.sin(a) * 0.9]); }
    const d = U.blob(pts), C = U.ctx(g, o.seed, false, 1), W_ = "#FFFFFF";
    shadow(g, d, 4, 4); U.shape(C, "st", d, MAT.stone, { sw: 2.6 });
    if (o.icon === "crack") ln(g, "M-6 -37 L1 -29 L-5 -22 L4 -14 L-1 -5 M-5 -22 L-13 -18", 2.8, W_);
    else if (o.icon === "leaf") { el("path", { d: "M-12 -10 Q-15 -32 12 -34 Q14 -11 -12 -10 Z", fill: W_ }, g); ln(g, "M-10 -12 L9 -31", 1.6, "#77776F"); }
    else if (o.icon === "coat") { ln(g, "M0 -35 Q0 -40 4 -39 M-13 -27 L0 -34 L13 -27 Z", 2, W_); el("path", { d: "M-10 -27 L10 -27 L13 -7 L-13 -7 Z", fill: W_ }, g); ln(g, "M0 -27 L0 -8", 1.4, "#77776F"); }
    return { top: [0, -44] };
  };
  D.pebble.essais = [{ icon: "crack" }, { icon: "leaf", seed: 2302 }, { icon: "coat", seed: 2303 }];
})();
