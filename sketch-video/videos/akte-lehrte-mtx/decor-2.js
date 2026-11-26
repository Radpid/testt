/* decor-2.js — AKTE 06 « كلمة وحدة » : décors et objets PROPRES à l'épisode, 2e partie (S8–S21). Mêmes conventions que decor.js
 * (ancrage (0,0) ou coordonnées MONDE quand c'est écrit, paramètres animés dans o, ombre décalée, rotations DANS le dessin,
 * texte de machine à écrire .tw). Outils partagés : D.outils (decor.js). État de l'inventaire : en tête de decor.js.
 * Essai : node tools/essai_decor.mjs videos/akte-lehrte-mtx --cols 2 --cell 530 --per 6 [--only nom1,nom2]
 */
(function () {
  "use strict";
  const D = window.EpDecor = window.EpDecor || {};
  // decor.js doit être chargé avant (D.outils) ; l'essai de décors charge les fichiers dans l'ordre alphabétique → on attend decor.js.
  if (!D.outils) { (D._apres = D._apres || []).push(suite); return; }
  suite();
  function suite() {
  const SC = SketchCast, U = SC.util;
  const { el, f, clamp, lerp, hash, rot, mix, gris, ombre, barre, ligne, cercle, ovale, trace, tw, frappe, MAT, INK, YEL, OMB, GRIS } = D.outils;
  let uid = 0; const nid = (p) => `ep06${p}${++uid}`;                                   // id uniques (clipPath, dégradés)
  const CARTON = { base: "#F4F1E8" }, KRAFT = { base: "#E3DCC9", hatch: "#C2B9A2", gap: 9, fw: 1 }, METAL = "#6E6B62";
  const kalam = (g, s, x, y, size, o = {}) => U.text(g, s, x, y, size, Object.assign({ anchor: "start" }, o));
  const bord = (x, y0, y1, s, seed, a = 6) => {   // bord déchiré / découpé (dents) sur une verticale
    let d = ""; const k = Math.max(3, Math.round(Math.abs(y1 - y0) / 9));
    for (let i = 1; i <= k; i++) d += ` L${f(x + s * (i % 2 ? a + hash(i + seed) * 3 : 0))} ${f(y0 + (y1 - y0) * i / k)}`;
    return d;
  };
  // segment coupé au cadre des décors plein cadre (x −240…1320) : les lignes de fuite des sols ne débordent pas
  const seg = (xa, ya, xb, yb) => { const L = -240, R = 1320, cut = (x0, y0, x1, y1) => { if (x1 < L) { const t = (L - x0) / (x1 - x0); return [L, y0 + (y1 - y0) * t]; } if (x1 > R) { const t = (R - x0) / (x1 - x0); return [R, y0 + (y1 - y0) * t]; } return [x1, y1]; };
    if ((xa < L && xb < L) || (xa > R && xb > R)) return "M0 0"; const a = cut(xb, yb, xa, ya), b = cut(xa, ya, xb, yb); return `M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])}`; };
  const punaise = (g, x, y) => { el("circle", { cx: x + 3, cy: y + 4, r: 7, fill: "rgba(28,26,28,.18)" }, g); el("circle", { cx: x, cy: y, r: 7, fill: "#BDBDB6", stroke: INK, "stroke-width": 2 }, g); ligne(g, `M${x - 3} ${y - 3} L${x - 1} ${y - 4}`, 1.6, "#FFFFFF"); };

  /* ═════════════════════════ (e) PAPIER : bande, enveloppe blanche, étiquette, empreinte ═════════════════════════ */

  /* D.bande — bande de citation : papier blanc aux deux bouts déchirés, une à trois lignes .tw. Ancre = centre.
   * o : l1, l2, l3 (textes) · size, size2, size3 (corps ; l3 = 18 par défaut) · align1 "centre" | align2, align3 "gauche" | "droite" | "centre"
   *     (alignés sur le bloc de texte) · w (largeur imposée) · n (caractères frappés, toutes lignes) · cur 0/1 · punaises 0/1 (sur un mur)
   *     sous 0–1 + sousMot (trait d'encre sous un mot de la ligne 1) · grey. → { w, h, fin } */
  D.bande = (g, o = {}) => {
    o = Object.assign({ l1: "„aufgrund der Überdosierung\"", l2: "", l3: "", size: 26, size2: null, size3: 18, align1: "centre", align2: "gauche", align3: "droite", w: null, n: null, cur: 0, punaises: 0, sous: 0, sousMot: "", grey: 0, seed: 301 }, o);
    const L = [[o.l1, o.size, o.align1], [o.l2, o.size2 || o.size, o.align2], [o.l3, o.size3, o.align3]].filter((l) => l[0]);
    const larg = (l) => l[0].length * 0.6 * l[1], wT = Math.max(...L.map(larg));
    const W = o.w || Math.round(wT + 44), H = Math.round(L.reduce((s, l) => s + l[1] * 1.3, 0) + 12), C = U.ctx(g, o.seed, false, 1);
    const d = `M${f(-W / 2)} ${f(-H / 2)} L${f(W / 2)} ${f(-H / 2)}` + bord(W / 2, -H / 2, H / 2, -1, o.seed) + ` L${f(-W / 2)} ${f(H / 2)}` + bord(-W / 2, H / 2, -H / 2, 1, o.seed + 5) + " Z";
    ombre(g, d, 5, 7); U.shape(C, "bande", d, { base: mix("#FFFFFF", "#E3E3DE", o.grey) }, { sw: 2.4, r: 0.5 });
    let y = -H / 2 + 6, reste = o.n == null ? 1e9 : Math.round(o.n), fin = null;
    L.forEach((l, i) => {
      const lh = l[1] * 1.3, base = y + lh / 2 + 0.35 * l[1], w = larg(l), c = 0.6 * l[1];
      const x = l[2] === "gauche" ? -wT / 2 : l[2] === "droite" ? wT / 2 - w : -w / 2, n = Math.min(l[0].length, reste);
      y += lh; reste -= n;
      if (n > 0) fin = frappe(g, { txt: l[0], x, y: base, size: l[1], n, seed: 13 + i * 7 }).fin;
      if (i === 0 && o.sous > 0 && o.sousMot) { const i0 = l[0].indexOf(o.sousMot); if (i0 >= 0) trace(g, `M${f(x + i0 * c)} ${f(base + 6)} C${f(x + (i0 + o.sousMot.length * 0.4) * c)} ${f(base + 8)} ${f(x + (i0 + o.sousMot.length * 0.7) * c)} ${f(base + 4)} ${f(x + (i0 + o.sousMot.length) * c)} ${f(base + 6)}`, o.sous, 3.2); }
    });
    if (o.cur && fin) el("rect", { x: f(fin[0] + 2), y: f(fin[1] - 0.8 * L[0][1]), width: 3, height: f(0.8 * L[0][1]), fill: INK }, g);
    if (o.punaises) [-W / 2 + 20, W / 2 - 20].forEach((x) => punaise(g, x, -H / 2 + 9));
    return { w: W, h: H, fin };
  };
  D.bande.essais = [{}, { l1: "„Damit wären die Beschuldigten vorbestraft.\"", l2: "— Gerichtssprecher", size: 22, size2: 18, align2: "droite", sous: 1, sousMot: "wären" },
    { l1: "„jeder der vier Ärzte habe", l2: "Verantwortung zu tragen\"", l3: "— laut Presse", size: 24, punaises: 1 }, { l1: "Rote-Hand-Brief 2019 · EMA 2019 · AkdÄ 2024 · KBV 2025", size: 18, n: 30, cur: 1 }];

  /* D.enveloppeBlanche — enveloppe longue vue de dessus (dos), rabat OUVERT, la lettre pliée en trois dépasse de 60 px. 300 × 150, ancre = centre.
   * o : sortie 0–1 (la lettre sort vers le haut, 150 px) · vide 0/1 · a (angle, degrés). → { lettre (centre du pli visible), ouverture } */
  D.enveloppeBlanche = (g, o = {}) => {
    o = Object.assign({ sortie: 0, vide: 0, a: 0, seed: 311 }, o);
    const corps = "M-150 -75 L150 -75 L150 75 L-150 75 Z", rabat = "M-150 -75 L-34 -142 L34 -142 L150 -75 Z", tr = `rotate(${o.a})`;
    el("path", { d: corps + " " + rabat, fill: OMB, transform: `translate(7 9) ${tr}` }, g);
    const A = el("g", { transform: tr }, g), C = U.ctx(A, o.seed, false, 1);
    U.shape(C, "rabat", rabat, { base: "#F4F4EF" }, { sw: 2.4, r: 0.5 });
    ligne(A, "M-120 -84 L-34 -134 L34 -134 L120 -84", 1.4, "#CFCFC8");                                                   // bande de colle
    const yt = -135 - 150 * clamp(o.sortie, 0, 1);
    if (!o.vide) {                                                                                                         // la lettre pliée : le tiers du haut (en-tête)
      const d = `M-138 ${f(yt)} L138 ${f(yt)} L138 ${f(yt + 130)} L-138 ${f(yt + 130)} Z`;
      el("path", { d, fill: OMB, transform: "translate(3 4)" }, A); U.shape(C, "lettre", d, MAT.white, { sw: 2.4, r: 0.5 });
      U.shape(C, "logo", U.rrect(-124, f(yt + 10), 22, 22, 3), MAT.grey, { sw: 1.6, r: 0.5 });
      tw(A, "ENTLASSUNGSBRIEF", -92, f(yt + 27), 14); barre(A, 76, f(yt + 10), 50, 4); barre(A, 92, f(yt + 18), 34, 4);
      tw(A, "Patient:", -124, f(yt + 56), 10); el("rect", { x: -72, y: f(yt + 48), width: 62, height: 9, rx: 1.5, fill: INK }, A);
      ligne(A, `M-124 ${f(yt + 68)} L124 ${f(yt + 68)}`, 1, GRIS); barre(A, -124, f(yt + 80), 190, 5); barre(A, -124, f(yt + 92), 220, 5);
    }
    U.shape(C, "corps", corps, { base: "#FBFBF7" }, { sw: 2.8, r: 0.55 });
    ligne(A, "M-148 73 L-28 2 M148 73 L28 2", 1.8, "#9A9A94"); ligne(A, "M-148 -73 L-60 -6 L60 -6 L148 -73", 1.4, "#BDBDB6");   // coutures du dos
    return { lettre: [0, f(yt + 65)], ouverture: [0, -75] };
  };
  D.enveloppeBlanche.essais = [{}, { sortie: 0.6, a: -8 }, { vide: 1, a: -8 }];

  /* D.etiquette — étiquette de prix à ficelle (S19, S24 seulement : la sanction). Ancre = LE NŒUD (pour m.pend) ; le corps pend dessous.
   * o : w × h (150 × 92) · l1, l2 (.tw size 26) · barre 0–1 (trait d'encre qui raye l1 puis l2) · sx 1 → 0 → 1 (retournement, autour de l'axe vertical)
   *     ficelle (28 : du nœud au haut de l'étiquette) · grey. → { noeud, centre } */
  D.etiquette = (g, o = {}) => {
    o = Object.assign({ w: 150, h: 92, l1: "9 000 –", l2: "13 500 €", size: 26, barre: 0, sx: 1, ficelle: 28, grey: 0, seed: 321 }, o);
    const { w, h } = o, t = o.ficelle, sx = clamp(o.sx, -1, 1), C = U.ctx(g, o.seed, false, 1);
    const corps = `M${-w / 2 + 16} ${t} L${w / 2 - 16} ${t} L${w / 2} ${t + 16} L${w / 2} ${t + h} L${-w / 2} ${t + h} L${-w / 2} ${t + 16} Z`;
    el("path", { d: corps, fill: OMB, transform: `translate(5 7) scale(${f(Math.max(0.04, Math.abs(sx)) * 100) / 100} 1)` }, g);
    const A = el("g", { transform: `scale(${f(Math.max(0.04, Math.abs(sx)) * 100) / 100} 1)` }, g), CA = C.sub(A);
    U.shape(CA, "corps", corps, { base: mix("#F4F1E8", "#DCDCD6", o.grey) }, { sw: 2.6, r: 0.5 });
    el("circle", { cx: 0, cy: t + 15, r: 8, fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, A); el("circle", { cx: 0, cy: t + 15, r: 3.6, fill: "#CFCBBE", stroke: INK, "stroke-width": 1.4 }, A);   // œillet renforcé
    if (Math.abs(sx) > 0.25) {
      const c = 0.6 * o.size, y1 = t + Math.round(h * 0.57), y2 = t + Math.round(h * 0.88), w1 = o.l1.length * c, w2 = o.l2.length * c;
      tw(A, o.l1, -w1 / 2, y1, o.size); if (o.l2) tw(A, o.l2, -w2 / 2, y2, o.size);
      if (o.barre > 0) { const p = clamp(o.barre, 0, 1) * 2;
        trace(A, `M${f(-w1 / 2 - 6)} ${f(y1 - 0.3 * o.size)} L${f(w1 / 2 + 6)} ${f(y1 - 0.36 * o.size)}`, clamp(p, 0, 1), 3.4);
        if (o.l2) trace(A, `M${f(-w2 / 2 - 6)} ${f(y2 - 0.32 * o.size)} L${f(w2 / 2 + 6)} ${f(y2 - 0.38 * o.size)}`, clamp(p - 1, 0, 1), 3.4); }
    }
    ligne(g, `M0 0 C-7 ${f(t * 0.4)} 6 ${f(t * 0.7)} 0 ${t + 12}`, 2, METAL);                                                // ficelle → œillet
    el("circle", { cx: 0, cy: 0, r: 4, fill: METAL }, g); ligne(g, "M0 0 L-9 -5 M0 0 L8 -7", 2, METAL);                            // le nœud
    return { noeud: [0, 0], centre: [0, t + h / 2] };
  };
  D.etiquette.essais = [{}, { barre: 1 }, { sx: 0.3 }, { l1: "2 000 –", l2: "6 000 €" }];

  /* D.empreinte — empreinte de tampon : cadre 150 × 44 + mot .tw. Ancre = centre. o : mot · plein false = tout en POINTILLÉ (conditionnel : le tampon n'a pas frappé). */
  D.empreinte = (g, o = {}) => {
    o = Object.assign({ mot: "vorbestraft", plein: false, w: 150, h: 44, size: 20 }, o);
    const A = el("g", { transform: "rotate(-3)" }, g), { w, h } = o, col = o.plein ? "#3A3836" : GRIS;
    const tir = o.plein ? {} : { "stroke-dasharray": "6 5" };
    el("path", Object.assign({ d: U.rrect(-w / 2, -h / 2, w, h, 6), fill: "none", stroke: col, "stroke-width": 3 }, tir), A);
    el("path", Object.assign({ d: U.rrect(-w / 2 + 5, -h / 2 + 5, w - 10, h - 10, 4), fill: "none", stroke: col, "stroke-width": 1.4 }, tir), A);
    const t = el("text", { x: 0, y: f(o.size * 0.35), class: "tw", "font-family": D.outils.TW, "font-weight": 700, "font-size": o.size, "text-anchor": "middle" }, A);
    t.setAttribute("style", o.plein ? "fill:#3A3836" : `fill:#DEDBD2;stroke:${GRIS};stroke-width:1.2;stroke-dasharray:2.6 1.6`); t.textContent = o.mot;
    return { w, h };
  };
  D.empreinte.essais = [{}, { plein: true }];

  /* ═════════════════════════ (f) BUREAU B : téléphone, verre, formulaire d'admission, plan de médicaments ═════════════════════════ */

  /* D.telephone — téléphone de bureau vu de dessus : boîtier 120 × 150, combiné posé, 12 touches, cordon en spirale. Ancre = centre.
   * o : cordon 0/1 (le cordon dessiné avec l'appareil) · kind "cordon" = le cordon SEUL (ancre = son attache sur le combiné, pour m.pend). */
  function cordon(g) {
    let a = "", b = "";
    for (let i = 0; i <= 60; i++) {
      const t = i / 60, cx = lerp(0, -10, t) - 52 * Math.sin(Math.PI * t), cy = 100 * t, nx = Math.cos(Math.PI * t) * 0.9 + 0.1, ny = 0.5;
      const s = 7 * Math.sin(t * Math.PI * 2 * 11), px = cx + nx * s, py = cy + ny * s * 0.6;
      a += (i ? " L" : "M") + f(px) + " " + f(py); b += (i ? " L" : "M") + f(px + 2) + " " + f(py + 2.5);
    }
    ligne(g, b, 3.2, "#C9C9C2"); ligne(g, a, 2.4, INK);
  }
  D.telephone = (g, o = {}) => {
    o = Object.assign({ kind: "appareil", cordon: 1, seed: 331 }, o);
    if (o.kind === "cordon") { cordon(g); return { bout: [-10, 100] }; }
    const C = U.ctx(g, o.seed, false, 1), boite = U.rrect(-60, -75, 120, 150, 18);
    ombre(g, boite, 8, 10); U.shape(C, "boite", boite, MAT.grey, { sw: 3 });
    el("path", { d: U.rrect(-30, -4, 60, 10, 3), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);                      // fenêtre d'étiquette (vide)
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
      const x = -32 + 32 * c, y = 18 + 15 * r;
      el("rect", { x: x - 10 + 1.2, y: y - 6 + 2, width: 20, height: 12, rx: 3, fill: "#8E8B82" }, g);
      el("rect", { x: x - 10, y: y - 6, width: 20, height: 12, rx: 3, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.5 }, g);
      el("circle", { cx: x, cy: y, r: 1.5, fill: GRIS }, g);
    }
    const comb = "M-58 -62 C-58 -74 -44 -76 -36 -70 L-26 -60 L26 -60 L36 -70 C44 -76 58 -74 58 -62 L58 -36 C58 -26 46 -24 38 -30 L28 -40 L-28 -40 L-38 -30 C-46 -24 -58 -26 -58 -36 Z";
    ombre(g, comb, 6, 8); U.shape(C, "combine", comb, MAT.dark, { sw: 2.6, r: 0.5 });
    ligne(g, "M-44 -66 C-36 -68 -30 -64 -28 -58 M30 -58 C34 -64 40 -68 46 -66", 2, "#9A9A94");
    if (o.cordon) cordon(el("g", { transform: "translate(-56 -40)" }, g));
    return { attache: [-56, -40] };
  };
  D.telephone.essais = [{}, { kind: "cordon" }];

  /* D.verre — verre d'eau vu de dessus (bord r 38, surface r 30, reflets). Ancre = centre. o : eau (−2…2 : la surface ondule). */
  D.verre = (g, o = {}) => {
    o = Object.assign({ eau: 0, seed: 341 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    el("circle", { cx: 9, cy: 11, r: 38, fill: "#DADAD3" }, g);
    U.shape(C, "bord", cercle(38), { base: "#F3F6F5" }, { sw: 2.6, r: 0.5 });
    el("ellipse", { cx: 1, cy: 1, rx: f(30 + o.eau), ry: f(30 - o.eau), fill: "#E3EBEA", stroke: "#8E9A98", "stroke-width": 1.6 }, g);
    ligne(g, "M-24 -14 A28 28 0 0 1 -8 -26", 3, "#FFFFFF"); ligne(g, "M16 22 A28 28 0 0 0 26 8", 2, "#FFFFFF");
    el("circle", { r: 33.5, fill: "none", stroke: "#B9C2C0", "stroke-width": 1.2 }, g);
    return { r: 38 };
  };
  D.verre.essais = [{}, { eau: 2 }];

  /* D.formAufnahme — porte-bloc (pince en haut) + formulaire d'admission « Aufnahme », 6 lignes à case. 230 × 330, ancre = centre.
   * Cases à x −85, lignes à y −80, −40, 0, 40, 80, 120 ; o.coche 0–3 coche les lignes −40, 0, 40 (décimales = coche en cours de tracé). → { cases } */
  D.formAufnahme = (g, o = {}) => {
    o = Object.assign({ coche: 0, seed: 351 }, o);
    const C = U.ctx(g, o.seed, false, 1), board = U.rrect(-115, -175, 230, 330, 12), Y = [-80, -40, 0, 40, 80, 120];
    ombre(g, board, 8, 10); U.shape(C, "board", board, MAT.mid, { sw: 3 });
    const papier = "M-102 -164 L102 -164 L102 144 L-102 144 Z";
    el("path", { d: papier, fill: "#ECECE7", transform: "translate(2 3)" }, g); U.shape(C, "papier", papier, MAT.white, { sw: 2.2, r: 0.5 });
    tw(g, "Aufnahme", -90, -126, 22); ligne(g, "M-90 -112 L90 -112", 1.6, GRIS);
    Y.forEach((y, i) => {
      el("rect", { x: -94, y: y - 9, width: 18, height: 18, rx: 2, fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g);
      barre(g, -64, y - 4, [118, 140, 96, 150, 104, 126][i], 8); ligne(g, `M-64 ${y + 13} L90 ${y + 13}`, 1, "#DCDCD6");
    });
    for (let k = 0; k < 3; k++) { const p = clamp(o.coche - k, 0, 1); if (p > 0) trace(el("g", { transform: `translate(-93 ${Y[k + 1] - 1}) scale(0.42)` }, g), "M0 0 L18 22 L58 -30", p, 6.5); }
    // pince métallique
    ombre(g, U.rrect(-46, -190, 92, 32, 8), 5, 6);
    U.shape(C, "pince", U.rrect(-46, -190, 92, 32, 8), MAT.grey, { sw: 2.6 });
    el("path", { d: U.rrect(-24, -184, 48, 12, 5), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g); ligne(g, "M-36 -164 L36 -164", 2.2);
    return { cases: Y.map((y) => [-85, y]) };
  };
  D.formAufnahme.essais = [{}, { coche: 2.5 }];

  /* D.planSoins — plan de médicaments (paysage, 404 × 280). Ancre = centre. Ligne 2 (y −16…20) vide au départ :
   *   « Medikament » x −180…−50, « Dosierung » x −50…54, sept cases de 19 px de x 54 à 187 (centres 63,5 + 19·i) ; mini : 466 × 80.
   * o : nom 0–1 (« MTX 15 mg » écrit à la main) · mot 0–1 (« täglich », ou o.texte) · croix 0–7 · kind "mini" = bande 460 × 80 d'une seule ligne (S27).
   * → { nom, mot, cases[i], ligne } */
  D.planSoins = (g, o = {}) => {
    o = Object.assign({ kind: "plan", nom: 0, mot: 0, croix: 0, texteNom: "MTX 15 mg", texte: "täglich", seed: 361 }, o);
    const C = U.ctx(g, o.seed, false, 1), J = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"], mini = o.kind === "mini";
    const W = mini ? 466 : 404, H = mini ? 80 : 280, d = `M${-W / 2} ${-H / 2} L${W / 2} ${-H / 2} L${W / 2} ${H / 2} L${-W / 2} ${H / 2} Z`;
    ombre(g, d, 7, 9); U.shape(C, "papier", d, MAT.white, { sw: 2.6, r: 0.5 });
    // colonnes : [x début Medikament, x Dosierung, x début des jours, pas des jours], ligne à remplir [y haut, y bas]
    const K = mini ? [-222, -70, 52, 24] : [-180, -50, 54, 19], R = mini ? [-14, 30] : [-16, 20], yb = R[1] - 9;
    const xs = J.map((j, i) => K[2] + K[3] * i), cases = xs.map((x) => [f(x + K[3] / 2), f((R[0] + R[1]) / 2)]);
    const hy = mini ? -24 : -64;
    if (!mini) { tw(g, "Medikationsplan", -178, -110, 18); }
    tw(g, "Medikament", K[0] + 2, hy, mini ? 13 : 16); tw(g, "Dosierung", K[1] + 6, hy, mini ? 13 : 16);
    J.forEach((j, i) => tw(g, j, xs[i] + K[3] / 2, hy, mini ? 13 : 14, { anchor: "middle" }));
    const rows = mini ? [-36, R[0], R[1]] : [-88, -52, R[0], R[1], 56, 92];
    rows.forEach((y, i) => ligne(g, `M${-W / 2 + 8} ${y} L${K[2] + 7 * K[3]} ${y}`, i === 1 ? 2 : 1.3, i === 1 ? INK : GRIS));
    const yTop = rows[0], yBot = rows[rows.length - 1];
    [K[1], K[2], ...xs.slice(1), K[2] + 7 * K[3]].forEach((x) => ligne(g, `M${x} ${yTop} L${x} ${yBot}`, 1.2, GRIS));
    if (!mini) {   // les autres lignes du plan : barres grises, petits ronds dans les jours
      [[-34, 100, 70], [38, 118, 54], [74, 86, 62]].forEach(([y, a, b], r) => { barre(g, -176, y - 4, a, 8); barre(g, -44, y - 4, b, 8); xs.forEach((x, i) => { if ((i + r) % 3 !== 2 || r === 0) el("circle", { cx: x + 9.5, cy: y, r: 3, fill: "#BDBDB6" }, g); }); });
      tw(g, "Arzt:", -178, 124, 14); ligne(g, "M-128 126 L20 126", 1.3, GRIS);
    }
    if (o.nom > 0) kalam(g, o.texteNom.slice(0, Math.ceil(o.texteNom.length * clamp(o.nom, 0, 1))), K[0] + 4, yb, mini ? 24 : 26);
    if (o.mot > 0) kalam(g, o.texte.slice(0, Math.ceil(o.texte.length * clamp(o.mot, 0, 1))), K[1] + 6, yb, mini ? 24 : 26);
    const nC = clamp(o.croix, 0, 7);
    for (let i = 0; i < Math.ceil(nC); i++) { const [cx, cy] = cases[i], s = 6, p = clamp(nC - i, 0, 1);
      trace(g, `M${f(cx - s)} ${f(cy - s)} L${f(cx + s)} ${f(cy + s)}`, clamp(p * 2, 0, 1), 2.6); trace(g, `M${f(cx + s)} ${f(cy - s)} L${f(cx - s)} ${f(cy + s)}`, clamp(p * 2 - 1, 0, 1), 2.6); }
    return { nom: [K[0] + 4, yb], mot: [K[1] + 6, yb], cases, ligne: [[-W / 2, R[0]], [W / 2, R[1]]] };
  };
  D.planSoins.essais = [{}, { nom: 1, mot: 1, croix: 7 }, { kind: "mini" }, { kind: "mini", nom: 1, mot: 1, texte: "1 × pro Woche" }];

  /* ═════════════════════════ (g) BUREAU C (la justice) : dossier, coupure, carrousel, casier, corbeille ═════════════════════════ */

  /* D.dossier — chemise de dossier de justice vue de dessus : carton kraft, dos toilé à gauche, étiquette blanche frappée, « § » en creux.
   * w × h (330 × 440 en S17 ; 420 × 560 en S23), ancre = centre. o : titre (texte ou tableau de lignes) · ts (corps .tw) · nt (caractères frappés)
   *     ouvert 0–1 (la couverture pivote sur le dos : échelle horizontale 1 → 0,12 ; l'intérieur clair apparaît) · sangle 0–1 (élastique qui claque en travers)
   * → { interieur, label, dos } */
  D.dossier = (g, o = {}) => {
    o = Object.assign({ w: 330, h: 440, titre: ["Staatsanwaltschaft", "Hildesheim"], ts: 16, nt: null, ouvert: 0, sangle: 0, seed: 371 }, o);
    const { w, h } = o, x0 = -w / 2, y0 = -h / 2, C = U.ctx(g, o.seed, false, 1), L = [].concat(o.titre), op = clamp(o.ouvert, 0, 1), xc = x0 + 24;
    const plat = U.rrect(x0, y0, w, h, 10);
    ombre(g, plat, 9, 11); U.shape(C, "plat", plat, KRAFT, { sw: 3 });
    if (op > 0.02) {   // l'intérieur : garde claire + mécanisme d'archivage
      el("path", { d: U.rrect(xc + 12, y0 + 14, w - 50, h - 28, 6), fill: "#F7F5EE", stroke: "#B9B2A0", "stroke-width": 1.6 }, g);
      U.shape(C, "meca", U.rrect(-50, y0 + 24, 100, 16, 4), MAT.grey, { sw: 2 }); [-32, 32].forEach((x) => el("circle", { cx: x, cy: y0 + 32, r: 4, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g));
    }
    // la couverture (pivote autour de la charnière x = xc)
    const sx = f((1 - 0.88 * op) * 1000) / 1000, cw = w / 2 - xc, cov = U.rrect(xc, y0, cw, h, 10), Tr = `translate(${xc} 0) scale(${sx} 1) translate(${-xc} 0)`;
    if (op > 0.02 && op < 0.98) el("path", { d: cov, fill: OMB, transform: `translate(${f(10 + 26 * Math.sin(op * Math.PI))} ${f(12 + 20 * Math.sin(op * Math.PI))}) ${Tr}` }, g);
    const A = el("g", { transform: Tr }, g), CA = C.sub(A);
    U.shape(CA, "couv", cov, { base: "#E8E2D1", hatch: "#C2B9A2", gap: 9, fw: 1 }, { sw: 3 });
    const cx = xc + cw / 2, lw = Math.max(0.62 * w, Math.max(...L.map((t) => t.length)) * 0.6 * o.ts + 32), lh = L.length * o.ts * 1.4 + 18, ly = y0 + h * 0.25;
    el("path", { d: U.rrect(cx - lw / 2 + 3, ly - lh / 2 + 4, lw, lh, 5), fill: "#C9C1AC" }, A);
    U.shape(CA, "label", U.rrect(cx - lw / 2, ly - lh / 2, lw, lh, 5), MAT.white, { sw: 2.2, r: 0.5 });
    let reste = o.nt == null ? 1e9 : Math.round(o.nt);
    L.forEach((t, i) => { const n = Math.min(t.length, reste); reste -= n; if (n > 0) frappe(A, { txt: t, x: cx - t.length * 0.3 * o.ts, y: ly - lh / 2 + 9 + o.ts * (1.4 * i + 1.05), size: o.ts, n, seed: 17 + i }); });
    const ps = Math.round(h * 0.26), py = y0 + h * 0.7;                                                                          // « § » en creux
    [["#F4F0E5", 2], ["#B3AA92", 0]].forEach(([col, d]) => { const t = el("text", { x: cx + d, y: py + d, "font-family": "Georgia, 'DejaVu Serif', serif", "font-size": ps, "font-weight": 700, "text-anchor": "middle", fill: col }, A); t.textContent = "§"; });
    if (sx < 0.97) el("rect", { x: w / 2 - 8, y: y0 + 4, width: 6, height: h - 8, fill: "#B3AA92" }, A);                          // tranche de la couverture qui se lève
    U.shape(C, "toile", `M${x0 + 10} ${y0} L${xc} ${y0} L${xc} ${-y0} L${x0 + 10} ${-y0} Q${x0} ${-y0} ${x0} ${-y0 - 10} L${x0} ${y0 + 10} Q${x0} ${y0} ${x0 + 10} ${y0} Z`, MAT.mid, { sw: 2.4 });
    if (o.sangle > 0 && op < 0.5) {   // élastique en travers (il claque de gauche à droite)
      const p = clamp(o.sangle, 0, 1), ys = y0 + h * 0.86, xe = x0 - 5 + (w + 10) * p;
      el("path", { d: `M${x0 - 5} ${ys - 8} L${f(xe)} ${ys - 8 - 3 * (1 - p)} L${f(xe)} ${ys + 8 - 3 * (1 - p)} L${x0 - 5} ${ys + 8} Z`, fill: "#3A3836", stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, g);
      ligne(g, `M${x0 + 4} ${ys - 2} L${f(xe - 6)} ${ys - 2 - 3 * (1 - p)}`, 1.2, "#8E8B82");
    }
    return { interieur: [f(xc / 2 + w / 4), 0], label: [f(cx), f(ly)], dos: [xc, 0] };
  };
  D.dossier.essais = [{}, { ouvert: 0.5 }, { ouvert: 1 }, { w: 420, h: 560, titre: "eingestellt", ts: 40, nt: 7, sangle: 1 }];

  /* D.coupure — coupure de journal : bords découpés en zigzag, titre (2 barres noires), photo, 3 colonnes de texte, « Presse · 01/2017 ».
   * 250 × 330, ancre = centre. o : coin 0–1 (le coin bas-droit se soulève). */
  const zz = (P, s, a = 2.6) => {
    let d = "";
    P.forEach((p, i) => { const q = P[(i + 1) % P.length], L = Math.hypot(q[0] - p[0], q[1] - p[1]), k = Math.max(1, Math.round(L / 9)), nx = (q[1] - p[1]) / L, ny = -(q[0] - p[0]) / L;
      for (let j = 0; j < k; j++) { const t = j / k, e = (j % 2 ? a : -1) * (0.7 + 0.6 * hash(i * 31 + j + s)); d += (d ? " L" : "M") + f(p[0] + (q[0] - p[0]) * t + nx * e) + " " + f(p[1] + (q[1] - p[1]) * t + ny * e); } });
    return d + " Z";
  };
  D.coupure = (g, o = {}) => {
    o = Object.assign({ coin: 0, seed: 381 }, o);
    const C = U.ctx(g, o.seed, false, 1), k = 20 * clamp(o.coin, 0, 1);
    const P = k > 1 ? [[-125, -165], [125, -165], [125, 165 - k], [125 - k, 165], [-125, 165]] : [[-125, -165], [125, -165], [125, 165], [-125, 165]];
    const d = zz(P, o.seed);
    ombre(g, d, 6, 8); U.shape(C, "papier", d, { base: "#F2F0E6" }, { sw: 2.2, r: 0.5 });
    barre(g, -105, -150, 210, 13, INK); barre(g, -105, -129, 140, 13, INK); barre(g, -105, -106, 176, 6, "#9A9A94");
    U.shape(C, "photo", "M-34 -90 L105 -90 L105 -22 L-34 -22 Z", MAT.grey, { sw: 1.8, r: 0.5 });
    ligne(g, "M-20 -30 L18 -62 L44 -44 L70 -70 L96 -30", 1.6, "#55524B");
    const col = (x, w, y0, y1) => { for (let y = y0, n = 0; y <= y1; y += 11, n++) barre(g, x, y, n % 7 === 6 ? w * 0.55 : w, 5, "#BDBDB6"); };
    col(-105, 67, -90, 116); col(-34, 66, -10, 116); col(38, 67, -10, 116);
    ligne(g, "M-105 130 L105 130", 1.2, GRIS); tw(g, "Presse · 01/2017", -105, 152, 16);
    if (k > 1) { const t = `M125 ${165 - k} L${125 - k} 165 L${f(125 - k * 0.92)} ${f(165 - k * 0.92)} Z`; ombre(g, t, 3, 3, "#BDBDB6"); U.shape(C, "coin", t, { base: "#E8E6DC" }, { sw: 1.8, r: 0.4 }); }
    return { w: 250, h: 330 };
  };
  D.coupure.essais = [{}, { coin: 1 }];

  /* D.porteTampons — carrousel à tampons vu de dessus : disque r 44, six tampons en étoile (rayon 54). Ancre = centre. o : a (rotation, degrés). */
  D.porteTampons = (g, o = {}) => {
    o = Object.assign({ a: 0, seed: 391 }, o);
    const C = U.ctx(g, o.seed, false, 1), pos = [0, 1, 2, 3, 4, 5].map((i) => rot([54, 0], i * 60 + o.a));
    el("circle", { cx: 12, cy: 15, r: 46, fill: OMB }, g); pos.forEach(([x, y]) => el("circle", { cx: f(x + 14), cy: f(y + 17), r: 13, fill: OMB }, g));
    U.shape(C, "disque", cercle(44), MAT.wood, { sw: 2.8 }); el("circle", { r: 33, fill: "none", stroke: "#8E8B82", "stroke-width": 1.4 }, g);
    pos.forEach(([x, y], i) => {
      const A = el("g", { transform: `translate(${f(x)} ${f(y)}) rotate(${f(i * 60 + o.a)})` }, g), CA = C.sub(A);
      U.shape(CA, "socle" + i, U.rrect(-15, -9, 30, 18, 4), MAT.light, { sw: 2 });
      U.shape(CA, "bouton" + i, cercle(10), MAT.dark, { sw: 2, r: 0.4 }); ligne(A, "M-5 -5 A7 7 0 0 1 2 -7", 1.8, "#BDBDB6");
    });
    U.shape(C, "axe", cercle(13), MAT.mid, { sw: 2.4 }); el("circle", { r: 5, fill: "#F1F1EC", stroke: INK, "stroke-width": 1.6 }, g);
    return { r: 66 };
  };
  D.porteTampons.essais = [{}, { a: 20 }];

  /* D.casier — fiche « Führungszeugnis » : carton à coins ronds 230 × 150, ancre = centre. Emplacement du tampon 150 × 44 centré en (30, 30),
   * petit rond numéroté en haut à droite. o : n (1–4) · grey. → { slot } */
  D.casier = (g, o = {}) => {
    o = Object.assign({ n: 1, grey: 0, seed: 401 }, o);
    const C = U.ctx(g, o.seed + o.n, false, 1), d = U.rrect(-115, -75, 230, 150, 12);
    ombre(g, d, 6, 8); U.shape(C, "carte", d, { base: mix("#F4F1E8", "#DCDCD6", o.grey) }, { sw: 2.6, r: 0.5 });
    tw(g, "Führungszeugnis", -100, -44, 18); ligne(g, "M-100 -33 L62 -33", 1.4, GRIS);
    tw(g, "Name:", -100, -12, 13); el("rect", { x: -54, y: -22, width: 92, height: 11, rx: 2, fill: INK }, g);
    tw(g, "Eintrag:", -45, 3, 13);
    el("path", { d: U.rrect(-45, 8, 150, 44, 4), fill: "#FBFAF5", stroke: "#8E8B82", "stroke-width": 1.6 }, g);
    [20, 32, 44].forEach((y, i) => barre(g, -102, y - 3, [44, 38, 30][i], 5, "#CFCFC8"));
    el("circle", { cx: 89, cy: -47, r: 15, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2 }, g); U.text(g, String(o.n), 89, -40, 20, {});
    return { slot: [30, 30] };
  };
  D.casier.essais = [{ n: 1 }, { n: 4, grey: 0.5 }];

  /* D.corbeille — corbeille à courrier en fil métallique vue de dessus (300 × 210), étiquette « Amtsgericht · Eingang » sur le bord avant. Ancre = centre.
   * Le fond utile (pour empiler les enveloppes) : x −134…134, y −89…78. */
  D.corbeille = (g, o = {}) => {
    o = Object.assign({ seed: 411 }, o);
    const C = U.ctx(g, o.seed, false, 1), ext = U.rrect(-150, -105, 300, 210, 16), int = U.rrect(-134, -89, 268, 178, 8);
    el("path", { d: ext, fill: "none", stroke: OMB, "stroke-width": 14, transform: "translate(11 14)" }, g);
    el("path", { d: int, fill: "#ECEBE5" }, g);
    for (let x = -110; x <= 110; x += 22) ligne(g, `M${x} -89 L${x} 89`, 1.5, "#9A9A94");                                   // fond grillagé
    for (let y = -66; y <= 66; y += 22) ligne(g, `M-134 ${y} L134 ${y}`, 1.5, "#9A9A94");
    for (let x = -134; x <= 134; x += 13.4) { ligne(g, `M${f(x)} -105 L${f(x)} -89`, 1.6, METAL); ligne(g, `M${f(x)} 89 L${f(x)} 105`, 1.6, METAL); }   // parois (fils)
    for (let y = -89; y <= 89; y += 14.8) { ligne(g, `M-150 ${f(y)} L-134 ${f(y)}`, 1.6, METAL); ligne(g, `M134 ${f(y)} L150 ${f(y)}`, 1.6, METAL); }
    U.stroke(C, "bordExt", ext, { sw: 4.2, stroke: "#3A3836", r: 0.4 }); U.stroke(C, "bordInt", int, { sw: 2.6, stroke: METAL, r: 0.4 });
    ligne(g, "M-140 -100 L140 -100", 1.4, "#FFFFFF");
    el("path", { d: U.rrect(-120, 80, 240, 26, 4), fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g); tw(g, "Amtsgericht · Eingang", 0, 99, 18, { anchor: "middle" });
    return { fond: [-134, -89, 134, 78] };
  };

  /* ═════════════════════════ (h) LE PILULIER DU CHEVET, LA NOTICE, L'USINE DE LA MOELLE (S14–S16) ═════════════════════════ */

  /* D.pilulierMini — petit pilulier vu de trois quarts sur le chevet (116 × 40). Ancre = milieu du bas. o : n (points jaunes, 0–7) · grey 0–1. */
  D.pilulierMini = (g, o = {}) => {
    o = Object.assign({ n: 7, grey: 0, seed: 421 }, o);
    const C = U.ctx(g, o.seed, false, 1), xs = [0, 1, 2, 3, 4, 5, 6].map((i) => -45 + 15 * i);
    el("ellipse", { cx: 6, cy: 1, rx: 62, ry: 5, fill: "rgba(28,26,28,.16)" }, g);
    xs.forEach((x) => U.shape(C, "c" + x, `M${x - 6} -24 L${x + 6} -24 L${x + 5} -36 L${x - 5} -36 Z`, gris(MAT.light, o.grey), { sw: 1.4, r: 0.3 }));   // couvercles relevés
    U.shape(C, "dessus", "M-58 -18 L58 -18 L52 -30 L-52 -30 Z", { base: mix("#F4F4EF", "#E3E3DE", o.grey) }, { sw: 2, r: 0.4 });
    xs.forEach((x, i) => { el("ellipse", { cx: x, cy: -24, rx: 6, ry: 3.6, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.2 }, g);
      if (i < o.n) el("circle", { cx: x, cy: -24.5, r: 3, fill: mix(YEL, "#C9C9C4", o.grey), stroke: INK, "stroke-width": 0.9 }, g); });
    U.shape(C, "face", U.rrect(-58, -18, 116, 18, 4), gris(MAT.grey, o.grey * 0.6), { sw: 2.2, r: 0.4 });
    xs.forEach((x) => ligne(g, `M${x - 3} -9 L${x + 3} -9`, 1.4, "#55524B"));
    return { w: 116, h: 40 };
  };
  D.pilulierMini.essais = [{}, { grey: 1 }];

  /* D.notice — notice dépliée qui remplit le cadre (coordonnées MONDE ; papier de x −240 à 1320, y −240 à 2160) : plis verticaux x 360, 720 ;
   * plis horizontaux y 510, 760, 1010, 1260, 1510 ; en-tête « FACHINFORMATION · Methotrexat » (.tw 22) à (170, 600) ; petites barres grises
   * dans les marges du haut (y 630–680) et du bas (y 1350–1420). o : pli 0–1 (les plis « respirent » : opacité des ombres). */
  D.notice = (g, o = {}) => {
    o = Object.assign({ pli: 1, seed: 431 }, o);
    el("rect", { x: -240, y: -240, width: 1560, height: 2400, fill: "#F9F7EF" }, g);
    const op = f(0.35 + 0.5 * clamp(o.pli, 0, 1.3));
    [360, 720].forEach((x, i) => { el("rect", { x: i ? x : x - 22, y: -240, width: 22, height: 2400, fill: "#E9E5D8", opacity: op }, g); ligne(g, `M${x} -240 L${x} 2160`, 1.8, "#D3CDBB"); });
    [510, 760, 1010, 1260, 1510].forEach((y, i) => { el("rect", { x: -240, y: i % 2 ? y : y - 18, width: 1560, height: 18, fill: "#ECE8DC", opacity: op }, g); ligne(g, `M-240 ${y} L1320 ${y}`, 1.6, "#D8D2C1"); });
    tw(g, "FACHINFORMATION · Methotrexat", 170, 600, 22); ligne(g, "M170 612 L910 612", 1.6, GRIS);
    [[170, 500], [580, 910]].forEach(([a, b], k) => [632, 652, 672].forEach((y, i) => barre(g, a, y, (b - a) * [1, 0.86, 0.62][(i + k) % 3], 6, "#D6D2C6")));
    [[170, 500], [580, 860]].forEach(([a, b], k) => [1360, 1380, 1400, 1420].forEach((y, i) => barre(g, a, y, (b - a) * [0.94, 1, 0.8, 0.5][(i + k) % 4], 6, "#D6D2C6")));
    return { entete: [170, 600] };
  };

  /* D.usine — LA MOELLE = L'USINE DU SANG (schéma imprimé sur la notice). 700 × 520, ancre = centre.
   * Un os long couché (diaphyse + deux têtes à deux lobes), ouvert par une fenêtre (x −285…285, y −180…180) : trois tapis roulants (y −120, 0, 120 ;
   * x −220…220 ; rouleaux r 16 à x ±202), globules rouges / globules blancs / plaquettes ; pictogramme de chaque pièce à gauche (x −252) ;
   * à droite, un collecteur (x 252) et le tuyau « sang » qui sort par l'échancrure de la tête droite (y 0 → x 352), trois petites jauges SANS chiffres.
   * o : ph 0–1 (défilement ; un nombre ou [p1, p2, p3] pour figer un tapis) · stop [a, b, c] 0–1 (1 = arrêté : pièces à 35 %, bande sans tirets)
   *     tuyau 0–1 (densité des pièces dans le tuyau) · flux (phase du tuyau, défaut ph) · jauge [a, b, c] 0–1 · grey.
   * → { tapis[i] (point d'impact d'un comprimé, sur le dessus du tapis), haut (dessus de l'os), tuyau, jauges } */
  const OS = { base: "#F4F0E5", hatch: "#CBC3AD", gap: 8, fw: 1 };
  function piece(g, kind, op, s = 1) {
    const A = el("g", { opacity: f(op), transform: s !== 1 ? `scale(${s})` : null }, g);
    if (kind === 0) { el("circle", { r: 16, fill: "#CFCFCA", stroke: INK, "stroke-width": 2.2 }, A); el("ellipse", { rx: 8, ry: 6.5, fill: "#ECECE7", stroke: "#77776F", "stroke-width": 1.4 }, A); }
    else if (kind === 1) { el("circle", { r: 19, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2 }, A); [[-5, -4], [5, -4], [0, 5]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 5.4, fill: "#55524B", stroke: INK, "stroke-width": 1.2 }, A)); }
    else { el("path", { d: "M-7 -1 C-6 -5 2 -5 7 -2 C9 1 4 4 -1 4 C-5 4 -8 2 -7 -1 Z", fill: "#E9E9E4", stroke: INK, "stroke-width": 1.6 }, A); }
  }
  D.usine = (g, o = {}) => {
    o = Object.assign({ ph: 0.3, stop: [0, 0, 0], tuyau: 1, flux: null, jauge: [1, 1, 1], grey: 0, seed: 441 }, o);
    const C = U.ctx(g, o.seed, false, 1), PH = [].concat(o.ph), ph = (i) => +PH[Math.min(i, PH.length - 1)] || 0, st = (i) => clamp((o.stop || [])[i] || 0, 0, 1), TY = [-120, 0, 120];
    const os = "M-250 -212 C-120 -196 120 -196 250 -212 C262 -246 304 -266 330 -248 C356 -230 360 -170 338 -128 C330 -96 322 -30 324 0 C322 30 330 96 338 128 C360 170 356 230 330 248 C304 266 262 246 250 212"
      + " C120 196 -120 196 -250 212 C-262 246 -304 266 -330 248 C-356 230 -360 170 -338 128 C-330 96 -322 30 -324 0 C-322 -30 -330 -96 -338 -128 C-360 -170 -356 -230 -330 -248 C-304 -266 -262 -246 -250 -212 Z";
    ombre(g, os, 9, 11); U.shape(C, "os", os, gris(OS, o.grey), { sw: 3.2 });
    [[-300, -200, 28], [-312, 196, 26], [306, -206, 30], [300, 200, 24]].forEach(([x, y, r], i) => ligne(g, `M${x - r / 2} ${y} q${r / 2} ${-r / 3} ${r} 0`, 1.6, "#A89F86"));   // reliefs des têtes
    U.shape(C, "cortex", U.rrect(-297, -191, 594, 382, 34), { base: "#E6DFCD", hatch: "#A89F86", gap: 4, fw: 1.2 }, { sw: 2.6 });
    U.shape(C, "fenetre", U.rrect(-285, -180, 570, 360, 26), { base: "#FCFAF3" }, { sw: 2.6 });
    [[-270, -62, 7], [-262, 58, 9], [-276, 150, 6], [270, -150, 6], [-268, -160, 6]].forEach(([x, y, r]) => el("circle", { cx: x, cy: y, r, fill: "none", stroke: "#E3DCC8", "stroke-width": 2 }, g));   // travées spongieuses
    // le collecteur et le tuyau « sang » (double trait, coude) — derrière les tapis
    const tuy = "M240 -148 Q240 -160 252 -160 Q264 -160 264 -148 L264 -12 L352 -12 L352 12 L264 12 L264 148 Q264 160 252 160 Q240 160 240 148 Z";
    U.shape(C, "tuyau", tuy, { base: "#FFFFFF" }, { sw: 2.6, r: 0.4 }); ligne(g, "M352 -18 L352 18", 4);
    const fl = o.flux == null ? ph(0) : +o.flux, dens = clamp(o.tuyau, 0, 1);
    for (let j = 0; j < 14; j++) {   // pièces qui circulent : du haut et du bas vers le milieu, puis vers la droite
      if (hash(j * 13 + 5) > dens * 1.05) continue;
      const u = (j / 14 + fl) % 1, kind = j % 3;
      let x, y; if (u < 0.55) { const v = u / 0.55; x = 252; y = (j % 2 ? -1 : 1) * 150 * (1 - v); } else { x = 264 + (u - 0.55) / 0.45 * 82; y = 0; }
      piece(el("g", { transform: `translate(${f(x)} ${f(y)})` }, g), kind, 1, 0.42);
    }
    TY.forEach((y, i) => {
      const s = st(i), p = ph(i), A = el("g", {}, g), CA = C.sub(A);
      ligne(A, `M220 ${y - 10} L240 ${y + (y < 0 ? 8 : y > 0 ? -8 : 0)}`, 2, GRIS);                                         // la goulotte vers le collecteur
      U.shape(CA, "bande" + i, U.rrect(-220, y - 18, 440, 36, 18), gris(MAT.grey, s * 0.5), { sw: 2.4, r: 0.4 });
      el("rect", { x: -200, y: y - 13, width: 400, height: 26, fill: "#F4F4EF" }, A);
      if (s < 0.5) for (let x = -200 + ((p * 56) % 14 + 14) % 14; x < 200; x += 14) ligne(A, `M${f(x)} ${y - 12} L${f(x)} ${y + 12}`, 2, "#BDBDB6");   // lattes qui avancent
      [-202, 202].forEach((x, k) => { const a = p * 3.5 * (k ? 1 : 1); el("circle", { cx: x, cy: y, r: 16, fill: "#CFCFCA", stroke: INK, "stroke-width": 2.2 }, A);
        ligne(A, `M${x} ${y} L${f(x + Math.cos(a) * 13)} ${f(y + Math.sin(a) * 13)}`, 2.2); el("circle", { cx: x, cy: y, r: 3.5, fill: INK }, A); });
      const r = [16, 19, 5][i], yp = y - 18 - r;
      for (let k = 0; k < 7; k++) {
        const x = -196 + (((k * 56 + p * 56) % 392) + 392) % 392, fade = clamp((x + 200) / 22, 0, 1) * clamp((200 - x) / 22, 0, 1);
        if (fade <= 0.02) continue;
        piece(el("g", { transform: `translate(${f(x)} ${yp})` }, A), i, (1 - 0.65 * s) * fade);
        if (i === 2) piece(el("g", { transform: `translate(${f(x + 22)} ${yp - 1})` }, A), 2, (1 - 0.65 * s) * clamp((178 - x) / 22, 0, 1) * fade);
      }
      el("circle", { cx: -252, cy: y, r: 23, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2 }, A); piece(el("g", { transform: `translate(-252 ${y})` }, A), i, 1, i === 2 ? 1.5 : 0.85);
    });
    // trois petites jauges verticales SANS chiffres, sur le tuyau de sortie
    const J = [284, 308, 332], jg = [].concat(o.jauge);
    el("path", { d: U.rrect(268, -100, 80, 88, 8), fill: OMB, transform: "translate(4 5)" }, g);
    U.shape(C, "platine", U.rrect(268, -100, 80, 88, 8), MAT.white, { sw: 2.4, r: 0.4 });                                         // platine des jauges, sur le tuyau
    J.forEach((x, i) => { const v = clamp(jg[i] == null ? 1 : jg[i], 0, 1);
      el("path", { d: U.rrect(x - 7, -70, 14, 52, 6), fill: "#F7F7F3", stroke: INK, "stroke-width": 2 }, g);
      if (v > 0.01) el("path", { d: U.rrect(x - 4, f(-21 - 45 * v), 8, f(45 * v), 3), fill: "#77776F" }, g);
      piece(el("g", { transform: `translate(${x} -84)` }, g), i, 1, i === 2 ? 1 : 0.38); });
    return { tapis: TY.map((y) => [0, y - 18]), haut: [0, -200], tuyau: [352, 0], jauges: J.map((x) => [x, -44]) };
  };
  /* D.pieceSang — pictogramme d'une pièce de l'usine (légende de S14) : kind 0 globule rouge · 1 globule blanc · 2 plaquettes ; s (échelle). Ancre = centre. */
  D.pieceSang = (g, o = {}) => { o = Object.assign({ kind: 0, s: 0.75 }, o); piece(g, o.kind, 1, o.kind === 2 ? o.s * 1.8 : o.s); if (o.kind === 2) piece(el("g", { transform: `translate(${f(9 * o.s)} ${f(-6 * o.s)})` }, g), 2, 1, o.s * 1.4); return { r: 14 }; };
  D.pieceSang.essais = [{ kind: 0 }, { kind: 1 }, { kind: 2 }];
  D.usine.essais = [{}, { stop: [1, 1, 1], ph: [0.3, 0.6, 0.1], tuyau: 0, jauge: [0, 0, 0] }, { stop: [0, 1, 0], tuyau: 0.5, jauge: [1, 0.3, 1] }];

  /* D.plante kind « face » (S18) — plante en pot vue de face, h 260, ancre = sol, milieu. o : a = angle du feuillage (degrés, autour du haut du pot). */
  function planteFace(g, o) {
    o = Object.assign({ a: 0, seed: 451 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    el("ellipse", { cx: 10, cy: 2, rx: 56, ry: 8, fill: "rgba(28,26,28,.15)" }, g);
    const F = el("g", { transform: `rotate(${f(o.a)} 0 -104)` }, g), CF = C.sub(F);
    const LV = [[-14, -150, -128], [12, -160, -52], [-4, -196, -98], [6, -206, -70], [-20, -128, -158], [22, -132, -20], [0, -226, -86], [-12, -172, -118], [16, -182, -62]];
    LV.forEach(([x, y, a]) => ligne(F, `M0 -104 Q${f(x * 0.4)} ${f((y - 104) / 2)} ${x} ${y}`, 2, "#55524B"));
    LV.forEach(([x, y, a], i) => { const L = el("g", { transform: `translate(${x} ${y}) rotate(${a})` }, F);
      U.shape(CF.sub(L), "f" + i, "M0 0 Q30 -17 66 0 Q30 17 0 0 Z", i % 2 ? MAT.grey : MAT.light, { sw: 2.2, r: 0.5 }); ligne(L, "M6 0 L58 0", 1.3); });
    U.shape(C, "pot", "M-44 -96 L44 -96 L34 0 L-34 0 Z", MAT.mid, { sw: 2.8 });
    U.shape(C, "bord", U.rrect(-50, -110, 100, 18, 5), MAT.grey, { sw: 2.6 });
    el("ellipse", { cx: 0, cy: -110, rx: 44, ry: 4, fill: "#4A4A46" }, g);
    return { haut: [0, -260], pivot: [0, -104] };
  }
  const planteDessus = D.plante;
  D.plante = (g, o = {}) => (o.kind === "face" ? planteFace(g, o) : planteDessus(g, o));
  D.plante.essais = [{}, { kind: "face" }, { kind: "face", a: 4 }];

  /* ═════════════════════════ (i) LA CHAMBRE DE GÉRIATRIE, DE FACE (S15, S16) ═════════════════════════ */

  /* D.chambre — la pièce, coordonnées MONDE : plafond (y < 290, corniche), mur #F3F1EA (y 290–1300), barre d'appui murale (double trait, y 1010),
   * plinthe, sol en lames en perspective (y > 1300), radiateur à ailettes (x 140–390, y 950–1090), porte entrouverte à droite (x 905–1000, y 560–1300 :
   * battant + bande claire du couloir) — hors zone utile. Fixe. */
  D.chambre = (g, o = {}) => {
    o = Object.assign({ grey: 0, seed: 461 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    el("rect", { x: -240, y: -240, width: 1560, height: 1540, fill: "#F3F1EA" }, g);
    el("rect", { x: -240, y: -240, width: 1560, height: 530, fill: "#F8F7F2" }, g);                                                   // plafond
    ligne(g, "M-240 290 L1320 290", 2.6); ligne(g, "M-240 300 L1320 300", 1.4, "#BDB8A9");                                          // corniche
    for (let i = 0; i < 26; i++) { const x = -200 + hash(i) * 1460, y = 340 + hash(i + 40) * 900; ligne(g, `M${f(x)} ${f(y)} l${f(10 + hash(i + 9) * 18)} ${f(2 - hash(i + 3) * 4)}`, 1.2, "#E4E1D7"); }   // grain du mur
    // barre d'appui murale (double trait) + pattes
    ligne(g, "M-240 1004 L905 1004", 2.4); ligne(g, "M-240 1016 L905 1016", 2.4); el("rect", { x: -240, y: 1005, width: 1145, height: 10, fill: "#E7E3D7" }, g);
    [60, 470, 820].forEach((x) => { el("rect", { x: x - 6, y: 1016, width: 12, height: 16, fill: "#D8D3C4", stroke: INK, "stroke-width": 1.6 }, g); });
    // plinthe et sol en lames
    el("rect", { x: -240, y: 1278, width: 1560, height: 22, fill: "#E2DED2" }, g); ligne(g, "M-240 1278 L1320 1278", 1.6, "#A9A495");
    el("rect", { x: -240, y: 1300, width: 1560, height: 860, fill: "#E8E4D8" }, g);
    const idS = nid("sol"); el("clipPath", { id: idS }, el("defs", {}, g)).appendChild(el("rect", { x: -240, y: 1300, width: 1560, height: 860 }));
    const S = el("g", { "clip-path": `url(#${idS})` }, g);
    for (let i = -10; i <= 10; i++) ligne(S, seg(540 + i * 78, 1300, 540 + i * 78 * 2.4, 2160), 1.4, "#CFC8B6");
    [1342, 1400, 1478, 1580].forEach((y, r) => { const k = 1 + (y - 1300) / 860 * 1.4; for (let i = -10; i <= 10; i++) if ((i + r) % 3 === 0) { const x = 540 + (i + 0.5) * 78 * k; if (x > -240 && x < 1320) ligne(S, `M${f(x)} ${y - 18} L${f(x + 2)} ${y + 18}`, 1.2, "#D6D0BF"); }
      ligne(S, `M-240 ${y} L1320 ${y}`, 1, "#DDD7C7"); });
    ligne(g, "M-240 1300 L1320 1300", 3);
    // radiateur à ailettes sous la fenêtre (x 140–390, y 950–1090)
    el("path", { d: U.rrect(146, 958, 250, 140, 10), fill: OMB }, g);
    U.shape(C, "radiateur", U.rrect(140, 950, 250, 140, 10), gris(MAT.white, o.grey), { sw: 2.8 });
    for (let x = 156; x < 380; x += 14) { el("rect", { x, y: 960, width: 9, height: 120, rx: 4, fill: "#F1F0EB", stroke: "#8E8B82", "stroke-width": 1.4 }, g); }
    U.shape(C, "vanne", U.rrect(394, 1046, 26, 18, 4), MAT.grey, { sw: 2 }); ligne(g, "M407 1064 L407 1278", 6, "#8E8B82"); ligne(g, "M407 1064 L407 1278", 2.2, "#E1E1DC");
    [176, 354].forEach((x) => ligne(g, `M${x} 1090 L${x} 1112`, 4, "#8E8B82"));
    // porte entrouverte à droite (hors zone utile)
    el("rect", { x: 905, y: 560, width: 120, height: 740, fill: "#FFFDF2" }, g);                                                        // le couloir, clair
    U.shape(C, "battant", "M935 560 L1010 540 L1010 1318 L935 1300 Z", gris(MAT.light, o.grey), { sw: 2.6 });
    el("circle", { cx: 948, cy: 930, r: 6, fill: "#D9D9D3", stroke: INK, "stroke-width": 1.8 }, g); ligne(g, "M948 930 L970 928", 3.4);
    U.stroke(C, "chambranle", "M905 1300 L905 560 L1040 560", { sw: 4 }); ligne(g, "M895 1300 L895 550 L1040 550", 1.6, "#A9A495");
    return { sol: 1300, barre: 1010 };
  };

  /* D.fenetre06 — fenêtre à croisée 250 × 330 (cadre x −125…125, y −165…165), rebord en bas (y 165–181). Ancre = centre.
   * Dehors : ciel, arbres lointains, une branche qui entre par le coin haut-droit (5 feuilles), 5 feuilles mortes qui tombent en zigzag.
   * o : jour 1 → 0,55 (la lumière baisse) · br (angle de la branche, degrés) · tf (temps de chute des feuilles, s : figé = feuilles arrêtées en l'air) · grey
   * → { rebord (milieu du dessus du rebord) } */
  D.fenetre06 = (g, o = {}) => {
    o = Object.assign({ jour: 1, br: 0, tf: 0.9, grey: 0, seed: 471 }, o);
    const C = U.ctx(g, o.seed, false, 1), nuit = clamp((1 - o.jour) / 0.45, 0, 1), id = nid("fen");
    el("path", { d: U.rrect(-125, -165, 250, 330, 4), fill: OMB, transform: "translate(7 8)" }, g);
    U.shape(C, "cadre", U.rrect(-125, -165, 250, 330, 4), gris(MAT.white, o.grey), { sw: 3 });
    el("rect", { x: -111, y: -151, width: 222, height: 302, fill: mix("#F2F4F1", "#C6C9C3", nuit) }, g);
    el("clipPath", { id }, el("defs", {}, g)).appendChild(el("rect", { x: -109, y: -149, width: 218, height: 298 }));
    const V = el("g", { "clip-path": `url(#${id})` }, g);
    [[-80, 150, 60], [-20, 156, 44], [50, 150, 66], [100, 158, 40]].forEach(([x, y, r]) => el("ellipse", { cx: x, cy: y, rx: r, ry: r * 0.8, fill: mix("#E2E6E0", "#B7BAB4", nuit) }, V));   // arbres lointains
    ligne(V, "M-60 -110 q14 -8 28 0 q10 -6 20 2", 1.4, mix("#D6DAD4", "#AEB1AB", nuit));                                                // un nuage, au trait
    const B = el("g", { transform: `rotate(${f(o.br)} 125 -160)` }, V), CB = C.sub(B);                                                // la branche
    U.stroke(CB, "branche", "M140 -176 C96 -130 60 -112 10 -96 M74 -122 C70 -96 56 -80 40 -70 M40 -104 C24 -126 6 -134 -14 -136", { sw: 3.2, r: 0.6 });
    [[10, -96, 30], [40, -70, 70], [-14, -136, -10], [96, -134, 110], [62, -114, 160]].forEach(([x, y, a], i) =>
      U.shape(CB.sub(el("g", { transform: `translate(${x} ${y}) rotate(${a})` }, B)), "fe" + i, "M0 0 Q9 -7 20 0 Q9 7 0 0 Z", i % 2 ? MAT.mid : MAT.grey, { sw: 1.6, r: 0.4 }));
    for (let i = 0; i < 5; i++) {                                                                                                   // feuilles mortes qui tombent
      const u = (((o.tf + 0.64 * i) / 3.2) % 1 + 1) % 1, x = [-70, -20, 40, 80, -45][i] + 14 * Math.sin(u * Math.PI * 4 + i), y = -150 + 310 * u, a = 32 * Math.sin(u * Math.PI * 4 + i * 2);
      el("path", { d: "M-8 0 L0 -5 L8 0 L0 5 Z", transform: `translate(${f(x)} ${f(y)}) rotate(${f(a)})`, fill: i % 2 ? "#BDBDB6" : "#77776F", stroke: INK, "stroke-width": 1.2, "stroke-linejoin": "round" }, V);
    }
    ligne(V, "M-90 60 L-40 10 M-70 120 L-10 60", 3, "#FFFFFF", { opacity: f(0.75 - 0.4 * nuit) });                                    // reflets sur la vitre
    // croisée : montant + traverse, poignée
    U.shape(C, "montant", "M-6 -151 L6 -151 L6 151 L-6 151 Z", gris(MAT.white, o.grey), { sw: 2.2, r: 0.4 });
    U.shape(C, "traverse", "M-111 -38 L111 -38 L111 -26 L-111 -26 Z", gris(MAT.white, o.grey), { sw: 2.2, r: 0.4 });
    el("rect", { x: -111, y: -151, width: 222, height: 302, fill: "none", stroke: INK, "stroke-width": 2 }, g);
    el("path", { d: U.rrect(-4, 10, 8, 26, 3), fill: "#E1E1DC", stroke: INK, "stroke-width": 1.6 }, g);
    // rebord
    el("rect", { x: -140, y: 172, width: 288, height: 12, fill: OMB }, g);
    U.shape(C, "rebord", U.rrect(-142, 165, 284, 16, 3), gris(MAT.light, o.grey), { sw: 2.4 });
    return { rebord: [0, 165] };
  };
  D.fenetre06.essais = [{}, { jour: 0.55, br: 1.2, tf: 2.1 }];

  /* D.voilage — voilage clair à plis, bas ondulé, 60 × 340. Ancre = la tringle, milieu (pour m.sway). */
  D.voilage = (g, o = {}) => {
    o = Object.assign({ seed: 481 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    let bas = ""; for (let i = 0; i <= 6; i++) bas += ` Q${f(30 - i * 10 + 5)} ${i % 2 ? 350 : 336} ${f(30 - i * 10)} 340`;
    const d = `M-30 4 L30 4 L30 340${bas} L-30 4 Z`;
    U.shape(C, "voile", d, { base: "#FFFFFF" }, { sw: 1.8, r: 0.5, stroke: "#8E8B82" });
    [-18, -6, 6, 18].forEach((x, i) => ligne(g, `M${x} 10 C${x + (i % 2 ? 3 : -3)} 120 ${x + (i % 2 ? -3 : 3)} 240 ${x} 334`, 1.3, i % 2 ? "#D6D6D0" : "#B9B9B2"));
    ligne(g, "M-44 0 L44 0", 4); [-44, 44].forEach((x) => el("circle", { cx: x, cy: 0, r: 4.5, fill: "#D9D9D3", stroke: INK, "stroke-width": 1.6 }, g));
    [-24, -8, 8, 24].forEach((x) => el("circle", { cx: x, cy: 2, r: 4, fill: "none", stroke: INK, "stroke-width": 1.6 }, g));
    return { bas: [0, 340] };
  };

  /* D.tasseTisane — tasse de face sur le rebord + sachet de tisane + 2 volutes. 44 × 36 (+ soucoupe), ancre = milieu du bas.
   * o : ph 0–1 (cycle de la vapeur) · vap 0–1 (1 = elle fume ; 0 à la mort) · grey. */
  D.tasseTisane = (g, o = {}) => {
    o = Object.assign({ ph: 0.3, vap: 1, grey: 0, seed: 491 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    for (let i = 0; i < 2; i++) { const p = (o.ph + i / 2) % 1, op = Math.sin(p * Math.PI) * clamp(o.vap, 0, 1);
      if (op > 0.03) { const d = `M${f(-6 + i * 12 + 6 * p)} ${f(-42 - 36 * p)} c7 -7 -7 -13 0 -20`; ligne(g, d, 5, "#FFFFFF", { opacity: f(0.85 * op) }); ligne(g, d, 1.5, "#B9B5A9", { opacity: f(0.85 * op) }); } }
    U.shape(C, "soucoupe", "M-30 -2 Q0 4 30 -2 L26 2 Q0 7 -26 2 Z", gris(MAT.white, o.grey), { sw: 1.8, r: 0.4 });
    U.shape(C, "anse", "M18 -30 C34 -32 34 -12 16 -12 L16 -17 C26 -17 26 -26 18 -25 Z", gris(MAT.white, o.grey), { sw: 1.8, r: 0.4 });
    U.shape(C, "tasse", "M-22 -38 L22 -38 C22 -18 18 -2 0 -2 C-18 -2 -22 -18 -22 -38 Z", gris(MAT.white, o.grey), { sw: 2.2, r: 0.5 });
    ligne(g, "M-20 -38 L20 -38", 2.4); ligne(g, "M-16 -32 L-14 -16", 2, "#E4E4DF");
    ligne(g, "M-8 -38 C-14 -30 -22 -28 -27 -20", 1.2, "#77776F");                                                                    // fil du sachet
    el("path", { d: U.rrect(-34, -21, 11, 13, 2), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.4 }, g);
    return { haut: [0, -38] };
  };
  D.tasseTisane.essais = [{}, { vap: 0 }];

  /* D.litGeriatrie — LIT + PATIENT ALLONGÉ (dessin dédié, jamais une tête Persona pivotée). Vu de PROFIL, tête à gauche. Ancre = sol, milieu du lit.
   * Lit x −260…260 : tête de lit (x −260…−238, y −290…0), pied (x 238…260, y −230…0), cadre (y −120), deux roues r 14, matelas (y −170…−122),
   * barrière abaissée (y −104 et −84, x −150…200), oreiller. Le patient : tête de profil tournée vers le PLAFOND (centre ≈ (−170, −230)) — crâne nu à gauche,
   * nez vers le haut, grosse moustache blanche, œil FERMÉ + cils, oreille, touffes blanches ; cou court ; épaule en chemise de nuit ; couverture
   * (x −96…236, contour : −226 poitrine, −206 ventre, −196 jambes, bosse des pieds −224 à x 205) avec revers de drap ; bras posé sur la couverture
   * (épaule (−84, −214) → poignet (40, −196)), main en moufle (62, −194), même peau que le visage.
   * o : souffle 0–1 (la poitrine x −70…0 monte de 6 px) · grey 0–1. → { tete, main, poitrine, oeil, teteDeLit } */
  const PEAU = MAT.skin || { base: "#FFFFFF" }, POIL = MAT.hairGrey || { base: "#E6E6E1", hatch: "#96968F", gap: 4.8, fw: 1.2 };
  D.litGeriatrie = (g, o = {}) => {
    o = Object.assign({ souffle: 0, grey: 0, seed: 501 }, o);
    const C = U.ctx(g, o.seed, false, 1), k = clamp(o.grey, 0, 1), b = 6 * clamp(o.souffle, 0, 1), G = (m) => gris(m, k);
    el("ellipse", { cx: 0, cy: 2, rx: 256, ry: 9, fill: "rgba(28,26,28,.14)" }, g);
    // le lit : pieds, roues, cadre, sommier
    [-215, 215].forEach((x, i) => { U.shape(C, "pied" + i, U.rrect(x - 6, -120, 12, 96, 4), G(MAT.mid), { sw: 2.2 }); el("circle", { cx: x, cy: -14, r: 14, fill: "#3A3A37", stroke: INK, "stroke-width": 2 }, g); el("circle", { cx: x, cy: -14, r: 4.5, fill: "#BDBDB6" }, g); });
    U.shape(C, "entretoise", U.rrect(-215, -62, 430, 10, 4), G(MAT.mid), { sw: 2 });
    U.shape(C, "cadre", U.rrect(-238, -128, 476, 16, 5), G(MAT.grey), { sw: 2.6 });
    U.shape(C, "teteLit", "M-260 0 L-260 -278 Q-260 -290 -249 -290 Q-238 -290 -238 -278 L-238 0 Z", G(MAT.wood), { sw: 2.8 });
    U.shape(C, "piedLit", "M238 0 L238 -220 Q238 -230 249 -230 Q260 -230 260 -220 L260 0 Z", G(MAT.wood), { sw: 2.8 });
    U.shape(C, "matelas", U.rrect(-236, -170, 472, 48, 12), G(MAT.white), { sw: 2.6 }); ligne(g, "M-226 -140 L226 -140", 1.2, "#CFCFC8", { "stroke-dasharray": "8 6" });
    // oreiller (derrière la tête)
    U.shape(C, "oreiller", "M-236 -170 C-244 -196 -232 -216 -214 -214 C-190 -206 -150 -206 -120 -212 C-102 -216 -92 -198 -96 -170 Z", G(MAT.white), { sw: 2.4 });
    ligne(g, "M-226 -186 q10 6 22 2 M-112 -192 q-8 6 -4 14", 1.4, "#B4B4AE");
    // la tête, dessinée COUCHÉE (pas de rotation) : sommet du crâne à gauche, visage vers le haut, menton à droite, arrière du crâne sur l'oreiller
    const hx = -172, hy = -228, H = el("g", { transform: `translate(${hx} ${hy})` }, g), CH = C.sub(H), skin = G(PEAU), poil = G(POIL);
    U.shape(CH, "cou", "M44 -34 L72 -36 L74 38 L20 52 Z", skin, { sw: 2.3 });
    U.shape(CH, "tete", "M-58 -2 C-58 -34 -40 -52 -16 -56 C-6 -58 0 -58 6 -55 C9 -54 10 -53 12 -56 C15 -63 17 -73 22 -80 C25 -84 31 -82 31 -76 C31 -70 29 -66 32 -62"
      + " C38 -60 44 -58 48 -54 C51 -51 54 -50 58 -50 C63 -49 66 -45 65 -39 C64 -33 60 -29 54 -27 C47 -8 41 20 28 44 C10 58 -24 58 -42 40 C-54 28 -58 14 -58 -2 Z", skin, { sw: 2.7 });
    ligne(H, "M-44 -30 A30 30 0 0 1 -30 -44", 2.4, "#E4E4DF");                                                                         // reflet du crâne nu
    ligne(H, "M-30 -44 q4 6 2 12 M-22 -48 q4 6 2 12", 1.3, "#B4B4AE");                                                                // rides du front
    [[-18, -50, -24, -46], [-20, -45, -27, -40], [-21, -39, -28, -35], [-20, -34, -26, -31]].forEach(([a, b2, c, d]) => ligne(H, `M${a} ${b2} L${c} ${d}`, 2, "#8E8B82"));   // sourcil (poils gris)
    ligne(H, "M-4 -24 Q5 -34 -4 -45", 2.6);                                                                                              // paupière fermée
    [[-2, -27], [1, -31], [1, -38], [-2, -42]].forEach(([x, y]) => ligne(H, `M${x} ${y} l6 1.5`, 1.5));                                    // cils
    ligne(H, "M8 -22 q8 2 12 -4", 1.2, "#B4B4AE");                                                                                       // pli de la joue
    ligne(H, "M23 -71 q3 3 6 2", 1.6);                                                                                                  // narine
    ligne(H, "M20 -56 C26 -48 32 -42 40 -38", 1.3, "#B4B4AE");                                                                          // sillon
    // grosse moustache blanche : un croissant épais qui part sous le nez et tombe sur la lèvre (vers le menton, à droite)
    U.shape(CH, "moustache", "M27 -61 C29 -71 45 -72 55 -62 C59 -58 62 -53 63 -47 C58 -50 54 -51 50 -50 C46 -52 40 -53 35 -53 C30 -54 26 -57 27 -61 Z", poil, { sw: 2.2, r: 0.5 });
    ligne(H, "M33 -62 q6 -5 13 -2 M40 -57 q7 -4 14 2 M50 -60 q5 1 8 7", 1.2, "#77776F");
    U.shape(CH, "oreille", "M-10 8 C-10 -2 4 -4 16 2 C24 6 24 18 14 20 C4 22 -10 18 -10 8 Z", skin, { sw: 2.2 }); ligne(H, "M-2 8 q8 -6 14 2 q-4 6 -10 4", 1.4, "#77776F");
    U.shape(CH, "couronne", "M-55 -12 C-60 6 -56 26 -42 40 C-28 52 -6 56 18 50 L16 42 C-4 46 -24 42 -36 32 C-48 22 -50 4 -46 -10 Z", poil, { sw: 1.8, r: 0.6 });
    [[-50, 0], [-46, 22], [-30, 40], [-6, 48]].forEach(([x, y]) => ligne(H, `M${x} ${y} q5 -4 9 1`, 1.2, "#77776F"));
    // épaule en chemise de nuit (rayures fines)
    const chemise = G({ base: "#F4F6F8" });
    U.shape(C, "epaule", `M-124 -222 C-120 -240 -108 -248 -94 -${f(244 + b * 0.6)} L-90 -170 L-128 -170 C-132 -190 -130 -210 -124 -222 Z`, chemise, { sw: 2.2 });
    ligne(g, "M-122 -224 C-116 -234 -106 -238 -98 -236", 1.8, "#8E9AA5"); ligne(g, "M-112 -214 L-110 -176 M-102 -222 L-100 -176", 1.1, "#C9D2DA");
    // la couverture (le contour de la poitrine respire) + revers de drap
    const haut = (dy) => `M-96 ${-228 + dy} C-80 ${-232 - b + dy} -60 ${-226 - b + dy} -40 ${-226 - b + dy} C-12 ${-226 - b + dy} 12 ${-214 + dy} 40 ${-208 + dy}`;
    const couv = haut(0) + " C70 -203 90 -206 112 -200 C140 -194 170 -195 188 -204 C198 -220 210 -228 222 -222 C234 -214 238 -192 238 -166 C220 -160 200 -150 178 -148 C140 -146 80 -150 20 -148 C-30 -146 -70 -150 -96 -148 Z";
    U.shape(C, "couverture", couv, G(MAT.light), { sw: 2.8 });
    ligne(g, "M60 -168 q30 8 60 -2 M150 -172 q20 8 40 0 M-20 -168 q26 6 50 0", 1.5, "#A9A9A2");                                         // plis
    U.shape(C, "revers", haut(0) + ` L40 ${-186} C12 ${-192} -12 ${-204 - b} -40 ${-204 - b} C-60 ${-204 - b} -80 ${-210 - b} -96 ${-206} Z`, G(MAT.white), { sw: 2 });
    // le bras posé sur la couverture : manche (chemise de nuit) → avant-bras → main en moufle
    const ba = -0.5 * b;
    U.shape(C, "manche", `M-92 ${f(-226 + ba)} C-70 ${f(-230 + ba)} -40 ${f(-222 + ba)} -18 ${f(-214 + ba * 0.5)} L-16 -196 C-40 -198 -68 -200 -92 ${f(-202 + ba)} Z`, chemise, { sw: 2.2 });
    ligne(g, `M-24 ${f(-214 + ba * 0.5)} L-22 -197`, 1.6, "#8E9AA5");
    U.shape(C, "avantBras", "M-20 -212 C2 -210 24 -206 46 -203 L46 -187 C24 -189 2 -192 -20 -195 Z", skin, { sw: 2.2 });
    U.shape(C, "main", "M42 -206 C54 -212 72 -210 78 -200 C82 -190 72 -182 58 -182 C50 -182 44 -184 42 -186 Z", skin, { sw: 2.2 });
    ligne(g, "M60 -207 q4 -4 10 -2", 1.6); ligne(g, "M70 -192 q3 3 0 6", 1.3, "#77776F");                                                 // pouce, ride
    // barrière abaissée (devant)
    [-104, -84].forEach((y, i) => U.shape(C, "barr" + i, U.rrect(-150, y - 5, 350, 10, 4), G(MAT.grey), { sw: 2 }));
    [-150, 200].forEach((x, i) => U.shape(C, "barrP" + i, U.rrect(x - 5, -116, 10, 40, 4), G(MAT.mid), { sw: 2 }));
    return { tete: [hx, hy], main: [62, -194], poitrine: [-40, f(-226 - b)], oeil: [hx, hy - 34], nez: [hx + 26, hy - 80], teteDeLit: [-249, -290] };
  };
  D.litGeriatrie.essais = [{}, { souffle: 1 }, { grey: 1 }];

  /* D.potence — potence de lit : mât de (0, 0) à (0, −210), bras horizontal jusqu'à (109, −210). Ancre = pied du mât (sur la tête de lit). */
  D.potence = (g, o = {}) => {
    const C = U.ctx(g, 511, false, 1), d = "M-6 6 L-6 -204 Q-6 -216 6 -216 L112 -216 L112 -204 L6 -204 L6 6 Z";
    ombre(g, d, 6, 7); U.shape(C, "tube", d, MAT.grey, { sw: 2.4 });
    U.shape(C, "collier", U.rrect(-10, -6, 20, 18, 4), MAT.mid, { sw: 2 }); el("circle", { cx: 109, cy: -204, r: 4, fill: "#F1F1EC", stroke: INK, "stroke-width": 1.6 }, g);
    return { accroche: [109, -204] };
  };
  /* D.trapeze — sangle de 70 px + poignée triangulaire 60 × 50. Ancre = le point d'accroche (pour m.sway). */
  D.trapeze = (g, o = {}) => {
    const C = U.ctx(g, 521, false, 1);
    el("path", { d: "M-5 0 L5 0 L5 70 L-5 70 Z", fill: "#55524B", stroke: INK, "stroke-width": 1.8 }, g); el("rect", { x: -7, y: 34, width: 14, height: 9, fill: "#D9D9D3", stroke: INK, "stroke-width": 1.4 }, g);
    U.stroke(C, "tri", "M0 72 L-30 118 M0 72 L30 118", { sw: 3.2 });
    U.shape(C, "poignee", U.rrect(-34, 114, 68, 12, 6), MAT.dark, { sw: 2.2 });
    return { bas: [0, 126] };
  };

  /* D.chevet — table de chevet de face : plateau (y −190, x −65…65), tiroir à bouton, porte, quatre petits pieds. 130 × 190, ancre = sol, milieu. */
  D.chevet = (g, o = {}) => {
    o = Object.assign({ grey: 0 }, o);
    const C = U.ctx(g, 531, false, 1), G = (m) => gris(m, o.grey);
    ombre(g, "M-60 -180 L60 -180 L60 0 L-60 0 Z", 7, 4);
    [[-40, 1], [40, 1]].forEach(([x]) => el("rect", { x: x - 4, y: -18, width: 8, height: 16, fill: "#8E8B82", stroke: INK, "stroke-width": 1.4 }, g));   // pieds arrière
    U.shape(C, "corps", "M-60 -180 L60 -180 L60 -14 L-60 -14 Z", G(MAT.wood), { sw: 2.6 });
    [-54, 54].forEach((x) => el("rect", { x: x - 5, y: -15, width: 10, height: 15, fill: "#55524B", stroke: INK, "stroke-width": 1.6 }, g));
    U.shape(C, "plateau", U.rrect(-65, -192, 130, 14, 3), G(MAT.light), { sw: 2.4 });
    U.shape(C, "tiroir", U.rrect(-50, -168, 100, 38, 4), G(MAT.white), { sw: 2 }); el("circle", { cx: 0, cy: -149, r: 5, fill: "#D9D9D3", stroke: INK, "stroke-width": 1.6 }, g);
    U.shape(C, "porte", U.rrect(-50, -122, 100, 98, 4), G(MAT.white), { sw: 2 }); el("circle", { cx: 38, cy: -74, r: 4.5, fill: "#D9D9D3", stroke: INK, "stroke-width": 1.6 }, g);
    return { plateau: [0, -192] };
  };
  /* D.lunettesPliees — lunettes rondes pliées, posées (58 × 20). Ancre = milieu du bas. */
  D.lunettesPliees = (g, o = {}) => {
    el("ellipse", { cx: 3, cy: 0, rx: 30, ry: 3, fill: "rgba(28,26,28,.15)" }, g);
    ligne(g, "M-26 -6 L22 -14 M-22 -4 L26 -12", 2, "#55524B");                                                                         // branches repliées
    [-14, 14].forEach((x) => { el("ellipse", { cx: x, cy: -9, rx: 12, ry: 9, fill: "#F3F6F5", stroke: INK, "stroke-width": 2.2 }, g); ligne(g, `M${x - 6} -12 l5 -3`, 1.4, "#FFFFFF"); });
    ligne(g, "M-3 -11 Q0 -15 3 -11", 2);
    return { w: 58 };
  };
  /* D.canne — canne à poignée courbe, appuyée : de la pointe (0, 0) au sol jusqu'à (18, −260). Ancre = la pointe. */
  D.canne = (g, o = {}) => {
    const C = U.ctx(g, 541, false, 1);
    U.stroke(C, "fut", "M0 -4 L18 -252", { sw: 7, r: 0.3 }); ligne(g, "M1 -8 L18 -246", 3, "#8E8B82");
    U.stroke(C, "crosse", "M18 -252 C22 -280 56 -284 58 -258 C59 -248 54 -242 50 -244", { sw: 7, r: 0.3 });
    el("rect", { x: -5, y: -12, width: 11, height: 12, rx: 2, fill: "#1C1A1C" }, g);
    return { haut: [18, -260] };
  };
  /* D.pantoufles — deux pantoufles de profil, côte à côte (≈ 110 × 26). Ancre = milieu du bas. */
  D.pantoufles = (g, o = {}) => {
    const C = U.ctx(g, 551, false, 1);
    el("ellipse", { cx: 4, cy: 0, rx: 60, ry: 4, fill: "rgba(28,26,28,.15)" }, g);
    [[-18, -2, 0.92], [10, 0, 1]].forEach(([x, y, s], i) => {
      const A = el("g", { transform: `translate(${x} ${y}) scale(${s})` }, g), CA = C.sub(A);
      U.shape(CA, "p" + i, "M-40 0 L-40 -10 C-40 -18 -30 -20 -20 -18 L6 -16 C20 -24 40 -22 44 -10 C46 -4 44 0 40 0 Z", i ? MAT.mid : MAT.grey, { sw: 2.2, r: 0.5 });
      ligne(A, "M-36 -14 L6 -14", 1.6, "#FFFFFF"); ligne(A, "M-40 -3 L42 -3", 1.4, "#55524B");
    });
    return { w: 110 };
  };

  /* D.casquette, variante « pendue » (chambre) : accrochée par son bouton au montant de la tête de lit. Ancre = le crochet (pour m.pend). o : pendue 1, grey. */
  const casquetteFace = D.casquette;
  D.casquette = (g, o = {}) => {
    if (!o.pendue) return casquetteFace(g, o);
    el("path", { d: "M-3 -6 L3 -6 L3 4 Q3 9 0 9 Q-3 9 -3 4 Z", fill: "#BDBDB6", stroke: INK, "stroke-width": 1.6 }, g);                // crochet
    ligne(g, "M0 6 C-4 10 -4 14 0 16", 1.6, METAL);
    const A = el("g", { transform: "translate(0 62)" }, g);
    el("path", { d: "M-61 -12 C-66 -30 -44 -46 0 -46 C44 -46 66 -30 61 -12 C40 -4 -40 -4 -61 -12 Z", fill: OMB, transform: "translate(5 6)" }, A);
    casquetteFace(A, { grey: o.grey || 0 });
    return { crochet: [0, 0], bas: [0, 62] };
  };
  D.casquette.essais = [{}, { pendue: 1 }];

  /* ═════════════════════════ (j) LE HALL DES BOÎTES AUX LETTRES, DE FACE (S18) ═════════════════════════ */

  /* D.hall — entrée d'immeuble, coordonnées MONDE : plafond (y < 290), mur crépi #F2F0E9 (y 290–1060), soubassement carrelé (carreaux 60 px, y 1060–1300),
   * plinthe, sol en dalles en damier, en perspective (y > 1300), rail de fixation des boîtes (barre x 200–880, y 770). Fixe. */
  D.hall = (g, o = {}) => {
    o = Object.assign({ seed: 561 }, o);
    el("rect", { x: -240, y: -240, width: 1560, height: 1540, fill: "#F2F0E9" }, g);
    el("rect", { x: -240, y: -240, width: 1560, height: 530, fill: "#F7F6F1" }, g); ligne(g, "M-240 290 L1320 290", 2.4);
    for (let i = 0; i < 260; i++) el("circle", { cx: f(-200 + hash(i * 3) * 1480), cy: f(300 + hash(i * 7 + 1) * 750), r: f(0.8 + hash(i * 11) * 1.4), fill: "#DCD8CC" }, g);   // crépi
    el("rect", { x: -240, y: 1060, width: 1560, height: 240, fill: "#E9E7E0" }, g);                                                     // soubassement carrelé
    for (let y = 1060; y <= 1300; y += 60) ligne(g, `M-240 ${y} L1320 ${y}`, 1.4, "#C9C5B9");
    for (let r = 0; r < 4; r++) for (let x = -240 + (r % 2) * 30; x <= 1320; x += 60) ligne(g, `M${x} ${1060 + r * 60} L${x} ${1120 + r * 60}`, 1.4, "#C9C5B9");
    ligne(g, "M-240 1060 L1320 1060", 2.4, "#A9A495"); el("rect", { x: -240, y: 1056, width: 1560, height: 6, fill: "#DCD8CC" }, g);
    el("rect", { x: -240, y: 1282, width: 1560, height: 18, fill: "#D9D5CA" }, g);
    // sol en dalles (damier en perspective, point de fuite (540, 700))
    const idS = nid("hall"); el("clipPath", { id: idS }, el("defs", {}, g)).appendChild(el("rect", { x: -240, y: 1300, width: 1560, height: 860 }));
    const S = el("g", { "clip-path": `url(#${idS})` }, g), Y = [1300, 1350, 1420, 1520, 1660, 1860, 2160], X = (i, y) => 540 + i * 130 * (y - 700) / 600;
    el("rect", { x: -240, y: 1300, width: 1560, height: 860, fill: "#E7E4DB" }, S);
    for (let j = 0; j < Y.length - 1; j++) for (let i = -12; i < 12; i++) if ((i + j) % 2 === 0 && X(i + 1, Y[j + 1]) > -240 && X(i, Y[j + 1]) < 1320)
      el("path", { d: `M${f(X(i, Y[j]))} ${Y[j]} L${f(X(i + 1, Y[j]))} ${Y[j]} L${f(X(i + 1, Y[j + 1]))} ${Y[j + 1]} L${f(X(i, Y[j + 1]))} ${Y[j + 1]} Z`, fill: "#D8D4C8" }, S);
    for (let i = -12; i <= 12; i++) ligne(S, seg(X(i, 1300), 1300, X(i, 2160), 2160), 1.2, "#BDB8A9");
    Y.forEach((y) => ligne(S, `M-240 ${y} L1320 ${y}`, 1.2, "#BDB8A9"));
    ligne(g, "M-240 1300 L1320 1300", 3);
    // rail de fixation des boîtes
    el("rect", { x: 204, y: 774, width: 680, height: 14, fill: OMB }, g);
    el("path", { d: U.rrect(200, 763, 680, 14, 4), fill: "#CFCFCA", stroke: INK, "stroke-width": 2.2 }, g);
    [212, 868].forEach((x) => el("circle", { cx: x, cy: 770, r: 3.5, fill: "#F1F1EC", stroke: INK, "stroke-width": 1.4 }, g));
    return { rail: [200, 770, 880] };
  };

  /* D.boiteLettres — boîte aux lettres murale 140 × 200. Ancre = milieu du haut (charnière du volet). En couches, dans cet ordre :
   * couche "fond" (l'intérieur sombre de la fente, y 0–34) → l'enveloppe → "face" (le corps, y 30–200 : porte-nom avec le chiffre n SEUL, serrure,
   * trois ouïes) → "volet" (140 × 34 articulé en haut ; ouv 0–1 = il s'ouvre vers l'avant : il se raccourcit et montre son dessous).
   * couche "tout" (défaut) = les trois. o : n, ouv, grey. */
  D.boiteLettres = (g, o = {}) => {
    o = Object.assign({ couche: "tout", n: 1, ouv: 0, grey: 0, seed: 571 }, o);
    const C = U.ctx(g, o.seed + o.n, false, 1), tout = o.couche === "tout", G = (m) => gris(m, o.grey);
    if (tout || o.couche === "fond") { el("rect", { x: -62, y: 4, width: 124, height: 30, fill: "#2E2C29" }, g); el("rect", { x: -62, y: 4, width: 124, height: 8, fill: "#4A4843" }, g); }
    if (tout || o.couche === "face") {
      el("path", { d: "M-70 30 L70 30 L70 196 Q70 200 66 200 L-66 200 Q-70 200 -70 196 Z", fill: OMB, transform: "translate(7 9)" }, g);
      U.shape(C, "corps", "M-70 30 L70 30 L70 196 Q70 200 66 200 L-66 200 Q-70 200 -70 196 Z", G(MAT.grey), { sw: 2.8 });
      U.shape(C, "levre", U.rrect(-72, 28, 144, 10, 3), G(MAT.mid), { sw: 2 });
      el("path", { d: U.rrect(-58, 48, 116, 140, 5), fill: "none", stroke: INK, "stroke-width": 1.8 }, g);                              // la porte
      el("path", { d: U.rrect(-45, 60, 90, 26, 3), fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g); tw(g, String(o.n), 0, 80, 20, { anchor: "middle" });
      [118, 130, 142].forEach((y) => el("rect", { x: -40, y, width: 52, height: 5, rx: 2.5, fill: "#55524B" }, g));
      el("circle", { cx: 40, cy: 164, r: 8, fill: "#E1E1DC", stroke: INK, "stroke-width": 1.8 }, g); el("path", { d: "M40 160 L40 168", stroke: INK, "stroke-width": 2.4 }, g);
    }
    if (tout || o.couche === "volet") {
      const h = f(34 * (1 - 0.72 * clamp(o.ouv, 0, 1)));
      U.shape(C, "volet", U.rrect(-70, 0, 140, h, 3), G(MAT.mid), { sw: 2.4, r: 0.5 });
      if (o.ouv > 0.05) el("rect", { x: -68, y: f(h - 2 - 5 * clamp(o.ouv, 0, 1)), width: 136, height: f(5 * clamp(o.ouv, 0, 1)), fill: "#3A3836" }, g);   // le dessous du volet
      [-46, 46].forEach((x) => el("rect", { x: x - 8, y: -3, width: 16, height: 7, rx: 3, fill: "#D9D9D3", stroke: INK, "stroke-width": 1.4 }, g));
    }
    return { fente: [0, 18], porteNom: [0, 73] };
  };
  D.boiteLettres.essais = [{ n: 1 }, { n: 3, ouv: 0.5 }];

  /* D.applique — applique murale (patte + bras + globe r 32). Ancre = la patte au mur. o : lum 0–1 (halo du globe ; grésillement : 0,86–1). */
  D.applique = (g, o = {}) => {
    o = Object.assign({ lum: 1, seed: 581 }, o);
    const C = U.ctx(g, o.seed, false, 1), id = nid("app");
    const gr = el("radialGradient", { id }, el("defs", {}, g)); el("stop", { offset: "0%", "stop-color": "#FFFDF2", "stop-opacity": 1 }, gr); el("stop", { offset: "100%", "stop-color": "#FFFDF2", "stop-opacity": 0 }, gr);
    el("circle", { cx: 0, cy: 60, r: 120, fill: `url(#${id})`, opacity: f(0.8 * clamp(o.lum, 0, 1)) }, g);
    U.shape(C, "patte", U.rrect(-22, -14, 44, 28, 8), MAT.grey, { sw: 2.2 });
    U.stroke(C, "bras", "M0 10 C0 26 4 34 0 42", { sw: 4.5, r: 0.3 });
    U.shape(C, "col", U.rrect(-12, 38, 24, 10, 3), MAT.mid, { sw: 1.8 });
    U.shape(C, "globe", cercle(32, 0, 78), { base: mix("#FFFFFF", "#FFF7D9", clamp(o.lum, 0, 1) * 0.6) }, { sw: 2.6 });
    ligne(g, "M-18 64 A22 22 0 0 1 -6 54", 3, "#FFFFFF");
    return { globe: [0, 78] };
  };
  D.applique.essais = [{}, { lum: 0.86 }];

  /* D.interphone — plaque 70 × 110 : grille du haut-parleur, quatre boutons SANS nom (étiquettes vides). Ancre = centre. */
  D.interphone = (g, o = {}) => {
    const C = U.ctx(g, 591, false, 1), d = U.rrect(-35, -55, 70, 110, 8);
    ombre(g, d, 5, 6); U.shape(C, "plaque", d, MAT.grey, { sw: 2.6 });
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) el("circle", { cx: -15 + c * 10, cy: -40 + r * 9, r: 2.2, fill: "#3A3836" }, g);
    [-8, 8, 24, 40].forEach((y) => { el("rect", { x: -26, y: y - 6, width: 30, height: 12, rx: 2, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.4 }, g); el("circle", { cx: 16, cy: y, r: 5.5, fill: "#E1E1DC", stroke: INK, "stroke-width": 1.6 }, g); });
    return { w: 70, h: 110 };
  };
  /* D.paillasson — paillasson 300 × 40 vu de face, en légère perspective, hachuré. Ancre = centre. */
  D.paillasson = (g, o = {}) => {
    const C = U.ctx(g, 601, false, 1), d = "M-138 -20 L138 -20 L150 20 L-150 20 Z";
    el("path", { d, fill: "rgba(28,26,28,.14)", transform: "translate(4 5)" }, g); U.shape(C, "tapis", d, MAT.mid, { sw: 2.6 });
    el("path", { d: "M-124 -12 L124 -12 L132 12 L-132 12 Z", fill: "none", stroke: "#3A3836", "stroke-width": 2 }, g);
    return { w: 300 };
  };
  /* D.porteParapluies — porte-parapluies (cylindre 70 × 110) + un parapluie fermé à poignée courbe. Ancre = sol, milieu. o : a (angle du parapluie, degrés). */
  D.porteParapluies = (g, o = {}) => {
    o = Object.assign({ a: 0, seed: 611 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    el("ellipse", { cx: 6, cy: 2, rx: 40, ry: 6, fill: "rgba(28,26,28,.15)" }, g);
    const P = el("g", { transform: `rotate(${f(o.a)} 0 -100)` }, g), CP = C.sub(P);
    U.shape(CP, "toile", "M-4 -96 L4 -96 L16 -196 Q2 -206 -10 -196 Z", MAT.dark, { sw: 2.2, r: 0.5 }); ligne(P, "M3 -110 L8 -190", 1.4, "#8E8B82");
    U.stroke(CP, "tige", "M0 -196 L2 -226 C2 -246 26 -248 26 -230", { sw: 4.5, r: 0.3 });
    U.shape(C, "cylindre", "M-35 -110 L35 -110 L31 0 L-31 0 Z", MAT.grey, { sw: 2.6 });
    el("ellipse", { cx: 0, cy: -110, rx: 35, ry: 6, fill: "#3A3836", stroke: INK, "stroke-width": 2 }, g);
    [-80, -30].forEach((y) => ligne(g, `M${f(-35 + (y + 110) * 0.036)} ${y} L${f(35 - (y + 110) * 0.036)} ${y}`, 1.8, "#55524B"));
    return { haut: [0, -110] };
  };
  D.porteParapluies.essais = [{}, { a: 3 }];

  /* ═════════════════════════ (k) LE COULOIR AUX QUATRE CHAISES, DE FACE (S19, S24) ═════════════════════════ */

  /* D.couloir — couloir du tribunal, coordonnées MONDE : plafond (y < 290), mur #F1EEE6, cimaise (rail) à y 930, lambris à lattes verticales
   * (y 930–1300), parquet à bâtons rompus en perspective (y > 1300), à droite le montant d'une porte + plaque « Saal 1 » (x 880–1000 : hors zone utile). Fixe. */
  D.couloir = (g, o = {}) => {
    o = Object.assign({ seed: 621 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    el("rect", { x: -240, y: -240, width: 1560, height: 1540, fill: "#F1EEE6" }, g);
    el("rect", { x: -240, y: -240, width: 1560, height: 530, fill: "#F6F4EE" }, g); ligne(g, "M-240 290 L1320 290", 2.4); ligne(g, "M-240 302 L1320 302", 1.2, "#BDB8A9");
    for (let i = 0; i < 22; i++) { const x = -200 + hash(i + 5) * 1460, y = 330 + hash(i + 60) * 560; ligne(g, `M${f(x)} ${f(y)} l${f(12 + hash(i) * 16)} ${f(1 - hash(i + 2) * 2)}`, 1.2, "#E2DED3"); }
    // lambris à lattes verticales
    el("rect", { x: -240, y: 930, width: 1560, height: 370, fill: "#ECE8DE" }, g);
    for (let x = -240; x <= 1320; x += 40) { ligne(g, `M${x} 942 L${x} 1290`, 1.6, "#C9C3B3"); ligne(g, `M${x + 3} 942 L${x + 3} 1290`, 1, "#F7F5EF"); }
    el("rect", { x: -240, y: 922, width: 1560, height: 18, fill: "#DDD7C8" }, g); ligne(g, "M-240 922 L1320 922", 2.2); ligne(g, "M-240 940 L1320 940", 1.6, "#8E8B82");   // cimaise
    el("rect", { x: -240, y: 1284, width: 1560, height: 16, fill: "#D6D0C0" }, g);
    // parquet à bâtons rompus (en perspective)
    const idS = nid("cou"); el("clipPath", { id: idS }, el("defs", {}, g)).appendChild(el("rect", { x: -240, y: 1300, width: 1560, height: 860 }));
    const S = el("g", { "clip-path": `url(#${idS})` }, g); el("rect", { x: -240, y: 1300, width: 1560, height: 860, fill: "#E3DCCB" }, S);
    const Y = [1300, 1340, 1395, 1470, 1575, 1720, 1920, 2200], X = (i, y) => 540 + i * 90 * (y - 760) / 540;
    for (let j = 0; j < Y.length - 1; j++) for (let i = -14; i < 14; i++) {
      const a = [X(i, Y[j]), Y[j]], b = [X(i + 1, Y[j]), Y[j]], c = [X(i + 1, Y[j + 1]), Y[j + 1]], d = [X(i, Y[j + 1]), Y[j + 1]];
      ligne(S, (i + j) % 2 ? seg(a[0], a[1], c[0], c[1]) : seg(b[0], b[1], d[0], d[1]), 1.2, "#D0C7B1");
    }
    for (let i = -14; i <= 14; i++) ligne(S, seg(X(i, 1300), 1300, X(i, 2200), 2200), 1.2, "#BFB59D");
    Y.forEach((y) => ligne(S, `M-240 ${y} L1320 ${y}`, 1.1, "#CFC6B1"));
    ligne(g, "M-240 1300 L1320 1300", 3);
    // à droite : montant de porte + plaque « Saal 1 » (hors zone utile)
    el("rect", { x: 900, y: 500, width: 200, height: 800, fill: "#E3DED1" }, g);
    U.shape(C, "porte", "M920 520 L1100 520 L1100 1300 L920 1300 Z", { base: "#ECE7DA", hatch: "#CFC8B5", gap: 12, fw: 1 }, { sw: 2.6 });
    U.stroke(C, "chambranle", "M884 1300 L884 486 L1120 486", { sw: 5 }); ligne(g, "M900 1300 L900 502 L1120 502", 1.6, "#8E8B82");
    el("path", { d: U.rrect(930, 600, 100, 40, 4), fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g); tw(g, "Saal 1", 980, 627, 18, { anchor: "middle" });
    return { cimaise: 930, sol: 1300 };
  };

  /* D.chaise — chaise de bois vue de face : assise (bord avant à y −168, 130 de large), dossier à trois barreaux jusqu'à y −340, quatre pieds, entretoise.
   * Ancre = sol, milieu. → { assise (bord avant, milieu), dossier (haut, milieu) } */
  D.chaise = (g, o = {}) => {
    o = Object.assign({ grey: 0, seed: 631 }, o);
    const C = U.ctx(g, o.seed, false, 1), B = gris(MAT.wood, o.grey);
    el("ellipse", { cx: 8, cy: 2, rx: 76, ry: 7, fill: "rgba(28,26,28,.15)" }, g);
    [-44, 44].forEach((x, i) => U.shape(C, "pa" + i, U.rrect(x - 5, -176, 10, 156, 3), gris(MAT.mid, o.grey), { sw: 2 }));                 // pieds arrière
    [-56, 56].forEach((x, i) => U.shape(C, "m" + i, U.rrect(x - 7, -340, 14, 178, 4), B, { sw: 2.4 }));                                   // montants du dossier
    U.shape(C, "haut", U.rrect(-64, -344, 128, 24, 6), B, { sw: 2.6 });
    [-292, -252, -212].forEach((y, i) => U.shape(C, "b" + i, U.rrect(-50, y - 5, 100, 10, 3), B, { sw: 2 }));
    U.shape(C, "assise", "M-60 -184 L60 -184 L65 -168 L-65 -168 Z", B, { sw: 2.4 });
    U.shape(C, "ceinture", U.rrect(-65, -168, 130, 14, 3), B, { sw: 2.4 });
    [-56, 56].forEach((x, i) => U.shape(C, "pf" + i, U.rrect(x - 7, -156, 14, 156, 4), B, { sw: 2.4 }));                                  // pieds avant
    U.shape(C, "entretoise", U.rrect(-50, -64, 100, 9, 3), B, { sw: 2 });
    return { assise: [0, -168], dossier: [0, -340] };
  };

  /* D.blousePosee — vêtement posé sur le dossier d'une chaise (dessiné DEVANT la chaise) : col et épaules qui passent sur le haut du dossier, le devant
   * qui pend jusqu'à y 150, les manches de chaque côté (x ±60…±89) jusqu'à y 118. Ancre = milieu du haut du dossier. Largeur ≤ 178 : chaises au pas de 185.
   * o : who 1 (blouse, manches retroussées) · 2 (blouse longue + stylo-plume dans la poche) · 3 (haut de casaque à manches courtes, hachuré)
   *     · 4 (blouse + col de chemise rayé) · n (jeton qui pend au coin gauche du dossier) + js (angle du jeton) · ms (angle des manches, degrés) · grey. */
  D.blousePosee = (g, o = {}) => {
    o = Object.assign({ who: 1, n: null, js: 0, ms: 0, grey: 0, seed: 641 }, o);
    const w = o.who, C = U.ctx(g, o.seed + w * 7, false, 1), tissu = gris(w === 3 ? MAT.grey : MAT.white, o.grey);
    // manches (de chaque côté, pivotent un peu à l'épaule)
    [-1, 1].forEach((sg) => {
      const M = el("g", { transform: `rotate(${f(sg * o.ms)} ${sg * 70} 6)` }, g), CM = C.sub(M), L = w === 3 ? 58 : 118, x0 = sg * 72;
      const d = `M${x0 - 12} 0 L${x0 + 12} 0 L${x0 + sg * 6 + 11} ${L} L${x0 + sg * 6 - 11} ${L} Z`;
      el("path", { d, fill: OMB, transform: "translate(5 6)" }, M); U.shape(CM, "manche", d, tissu, { sw: 2.4, r: 0.5 });
      if (w === 1) { U.shape(CM, "rev1", U.rrect(x0 + sg * 6 - 14, L - 30, 28, 14, 4), tissu, { sw: 2.2 }); U.shape(CM, "rev2", U.rrect(x0 + sg * 6 - 13, L - 16, 26, 14, 4), tissu, { sw: 2.2 }); }
      if (w === 3) ligne(M, `M${x0 + sg * 6 - 11} ${L - 8} L${x0 + sg * 6 + 11} ${L - 8}`, 1.6);
      if (w === 2 || w === 4) ligne(M, `M${x0 + sg * 6 - 10} ${L - 10} L${x0 + sg * 6 + 10} ${L - 10}`, 1.4, GRIS);
    });
    // le corps : épaules arrondies sur le haut du dossier, le devant qui pend
    const corps = "M-64 18 C-64 -4 -54 -16 -28 -18 L28 -18 C54 -16 64 -4 64 18 L56 150 L-56 150 Z";
    ombre(g, corps, 6, 8); U.shape(C, "corps", corps, tissu, { sw: 2.8, r: 0.5 });
    if (w === 3) { el("path", { d: "M-18 -18 L0 22 L18 -18 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, g); U.shape(C, "poche3", U.rrect(14, 60, 32, 32, 3), tissu, { sw: 1.8 }); }
    else {
      ligne(g, "M-26 -16 L-8 40 L-8 150 M26 -16 L8 40", 2.2);                                                                         // revers et boutonnage
      [60, 96, 132].forEach((y) => el("circle", { cx: -14, cy: y, r: 3.4, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g));
      U.shape(C, "poche", U.rrect(14, 54, 34, 32, 3), tissu, { sw: 1.8 });
      if (w === 4) { el("path", { d: "M-20 -18 L0 12 L20 -18 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, g); [-12, -6, 0, 6, 12].forEach((x) => ligne(g, `M${x} -16 L${f(x * 0.4)} ${f(6 - Math.abs(x) * 0.6)}`, 1.2, GRIS)); }
      if (w === 2) { U.shape(C, "plume", U.rrect(26, 36, 9, 30, 3), MAT.robe, { sw: 1.8 }); el("rect", { x: 25, y: 48, width: 11, height: 4, fill: "#F1F1EC", stroke: INK, "stroke-width": 1.2 }, g); ligne(g, "M33 38 L33 58", 1.6, "#F1F1EC"); }
    }
    // le jeton qui pend au coin gauche du dossier
    if (o.n != null && o.n !== "") {
      const a = o.js * Math.PI / 180, J = [f(-58 + Math.sin(a) * 40), f(-6 + Math.cos(a) * 40)];
      ligne(g, `M-58 -8 L${J[0]} ${J[1] - 18}`, 2, METAL); el("circle", { cx: -58, cy: -8, r: 3, fill: METAL }, g);
      const gj = el("g", { transform: `translate(${J[0]} ${J[1]})` }, g);
      el("circle", { cx: 3, cy: 4, r: 20, fill: "#CFCFC8" }, gj); U.shape(C.sub(gj), "jeton", cercle(20), { base: "#F4F1E8" }, { sw: 2.4, r: 0.5 });
      el("circle", { cx: 0, cy: -14, r: 3.4, fill: "#F7F7F1", stroke: INK, "stroke-width": 1.6 }, gj); U.text(gj, String(o.n), 0, 9, 24, {});
    }
    return { jeton: o.n != null ? [-58, 34] : null, noeud: [-58, -8] };
  };
  D.blousePosee.essais = [{ who: 1, n: 1 }, { who: 2, n: 2, js: 12 }, { who: 3, n: 3 }, { who: 4, n: 4, ms: 2 }];
  }
})();
