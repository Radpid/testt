/* decor.js — AKTE 08 « جوج حروف » (Düsseldorf) — décors et objets PROPRES à l'épisode, 1re partie.
 * Aucun dessin n'est repris d'un autre épisode. Suite dans decor-2.js et decor-3.js. Référence : storyboard.md § 2 et § 3.
 * Essai de chaque dessin, seul, sur une planche : node tools/essai_decor.mjs videos/akte-duesseldorf-titel [--only nom1,nom2]
 *   D.nom.essais = [{ … }, { … }] : jeux de paramètres montrés sur la planche.
 *
 * ÉTAT DE L'INVENTAIRE (storyboard § 2 : 76 fonctions) ─────────────────────────────────────────────────────────────
 * A. Laiton, lettres, étiquettes, tampons (objets signature)
 *   D.plaque        fait (decor.js)      D.lettre        fait (decor.js)      D.etiquette     fait (decor.js)
 *   D.empreinte     fait (decor.js)      D.tampon        fait (decor.js)      D.barre         fait (decor.js)
 *   D.silhouette    fait (decor.js)      D.eclats        fait (decor.js)
 *   D.plaquette     fait (decor.js)      D.reglette      fait (decor.js)                       (HUD, § 3)
 * B. Façade (S1), porte de l'intro (S4), porte du bureau (S29)
 *   D.facade        fait (decor.js)      D.lanterne      fait (decor.js)      D.niveau        fait (decor.js)
 *   D.carton        fait (decor.js)      D.main          fait (decor.js)      D.tournevis     fait (decor.js)
 *   D.porteIntro    fait (decor.js)      D.interphone    fait (decor.js)      D.mur           fait (decor.js)
 *   D.porteBureau   à faire              D.corbeille     à faire
 * C. Cartes
 *   D.rollkarte     fait (decor.js)      D.amtsgericht   fait (decor.js)      D.globe         fait (decor.js)
 *   D.arc           fait (decor.js)      D.tube          fait (decor.js)
 * D. Diplômes et explication en image
 *   D.cimaise       fait (decor.js)      D.cadre         fait (decor.js)      D.diplome       fait (decor.js)
 *   D.valise        fait (decor.js)      D.pochette      fait (decor.js)
 *   D.livre         à faire              D.table         à faire              D.fenetreArc    à faire
 *   D.nuage         à faire              D.lampeTable    à faire              D.ecran         à faire
 *   D.planche       à faire              D.socle         à faire
 * E. Atelier du graveur
 *   D.atelier       fait (decor.js)      D.etau          fait (decor.js)      D.casse         fait (decor.js)
 *   D.bloc          fait (decor.js)      D.encreur       fait (decor.js)      D.cartes        fait (decor.js)
 *   D.loupe         fait (decor.js)      D.fiche         à faire
 * F. L'affaire (S12 à S23)
 *   D.patere        à faire              D.blouse        à faire              D.stetho        à faire
 *   D.sabots        à faire              D.badge         à faire              D.boite         à faire
 *   D.enveloppe     à faire              D.brief         à faire              D.navigateur    à faire
 *   D.poste         à faire              D.dateur        à faire              D.bac           à faire
 *   D.strafbefehl   à faire              D.salleFace     à faire              D.banc          à faire
 *   D.tableProc     à faire              D.bureauGreffe  à faire              D.tableDefense  à faire
 *   D.platzschild   à faire              D.rebord        à faire              D.feuille       à faire
 *   D.chariot       à faire              D.ordner        à faire              D.chemise       à faire
 * G. La règle (S24 à S29)
 *   D.potence       à faire              D.chaine        à faire              D.different     à faire
 *   D.loi           à faire              D.fleche        à faire
 * HORS INVENTAIRE, ajoutés ici parce que les scènes S1 à S7 en ont besoin (tous « fait (decor.js) ») :
 *   D.motDr (les trois lettres posées, version statique de l'aide motDr) · D.bandeReflet et D.etincelle (reflets du laiton
 *   sortis de D.plaque : risque 16) · D.visCouchee (vis de rechange, S1) · D.papillon (S1) · D.medaillon (S5, S11) ·
 *   D.porteEtiquette (S4) · D.suspension et D.cartons (S6) · D.outil et D.bon (outils et bons de l'atelier, nœuds séparés).
 *   D.exemple = dessin du gabarit, encore utilisé par les scènes d'exemple de scenes-1.js : À SUPPRIMER avec elles.
 *   D.util (objet, pas une fonction) = aides partagées avec decor-2.js / decor-3.js (matières, gribouillis, vis, ombre…).
 *
 * CONVENTIONS
 *   Chaque fonction dessine dans le groupe SVG g autour de son ancrage (0,0), reçoit ses paramètres animés dans o (valeurs
 *   arrondies : le moteur ne redessine que si o change) et renvoie des ancres lues dans node.out.
 *   Les décors « plein cadre » (facade, mur, atelier) et les tracés (arc, cimaise) sont en coordonnées MONDE : les poser en (0, 0).
 *   Quand une pièce doit bouger seule (lanterne, rabat, outil…), la fonction a une option partie: "…" : un nœud par partie.
 *   Le jaune (MAT.yellow) = le LAITON, et rien d'autre : plaques, lettres-objets, hublot de l'intro, lettres du casier.
 *   Les halos de lampe sont crème (#FFFDF2), les étiquettes en papier crème (#F3EFE4), les tampons à l'encre.
 */
(function () {
  "use strict";
  const SC = window.SketchCast, U = SC.util, NS = "http://www.w3.org/2000/svg";
  const INK = "#1C1A1C", OMBRE = "#CDCDC6", PAPIER = "#F7F7F1", LAITON2 = "#B88A1E", CLAIR = "#FFF3C4", GRIB = "#B9B9B2",
    ACIER = "#E1E1DC", CREME = "#F3EFE4", HALO = "#FFFDF2", GRIS = "#9A9A94", YEL = "#F8CE4E";
  const MAT = Object.assign({}, SC.MAT, (window.Persona && window.Persona.MAT) || {});
  if (!MAT.dark) MAT.dark = { base: "#4A4A46", hatch: INK, gap: 4, fw: 1.6 };
  if (!MAT.light) MAT.light = { base: "#F0F0EB", hatch: "#BDBDB6", gap: 6.5, fw: 1.1 };
  if (!MAT.wood) MAT.wood = { base: "#E9E9E3", hatch: "#ABABA4", gap: 7, fw: 1.1 };
  MAT.acier = { base: ACIER };
  MAT.creme = { base: CREME };
  MAT.pierre = { base: "#ECEAE2", hatch: "#CFCCC2", gap: 9, fw: 1 };
  MAT.verre = { base: "#EEF3F4" };
  const el = (tag, a, p) => { const n = document.createElementNS(NS, tag); for (const k in a || {}) if (a[k] != null) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; };
  const D = window.EpDecor = window.EpDecor || {};

  /* ───────────────────────── aides ───────────────────────── */
  const f = (v) => Math.round(v * 10) / 10;
  const rad = (a) => a * Math.PI / 180;
  const lerp = (a, b, p) => a + (b - a) * p;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rot = (p, deg) => { const c = Math.cos(rad(deg)), s = Math.sin(rad(deg)); return [f(p[0] * c - p[1] * s), f(p[0] * s + p[1] * c)]; };
  const rr = (x, y, w, h, r) => U.rrect(f(x), f(y), f(w), f(h), f(Math.max(0, Math.min(r, w / 2 - 0.5, h / 2 - 0.5))));
  const rng = (seed) => { let s = (Math.round(seed) >>> 0) || 1; return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; };
  const ln = (g, d, w, col, extra) => el("path", Object.assign({ d, fill: "none", stroke: col || INK, "stroke-width": w || 2, "stroke-linecap": "round", "stroke-linejoin": "round" }, extra), g);
  const ombre = (g, d, dx, dy, col) => el("path", { d, fill: col || OMBRE, transform: `translate(${dx == null ? 7 : dx} ${dy == null ? 9 : dy})` }, g);
  const cercle = (cx, cy, r) => `M${f(cx - r)} ${f(cy)} A${f(r)} ${f(r)} 0 1 1 ${f(cx + r)} ${f(cy)} A${f(r)} ${f(r)} 0 1 1 ${f(cx - r)} ${f(cy)} Z`;
  const ellipse = (cx, cy, rx, ry) => `M${f(cx - rx)} ${f(cy)} A${f(rx)} ${f(ry)} 0 1 1 ${f(cx + rx)} ${f(cy)} A${f(rx)} ${f(ry)} 0 1 1 ${f(cx - rx)} ${f(cy)} Z`;
  const txt = (g, s, x, y, size, o) => U.text(g, s, x, y, size, o);
  const AR = { font: "'Plex Arabic', sans-serif", weight: 700, rtl: true };
  const hex = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  const mix = (a, b, p) => { const A = hex(a), B = hex(b); return "#" + A.map((v, i) => Math.round(lerp(v, B[i], clamp(p, 0, 1))).toString(16).padStart(2, "0")).join(""); };
  const lw = (t, size) => String(t).length * size * 0.47;                      // largeur approchée d'un texte Kalam 700 (mesuré : 0,43 à 0,48)

  // « gribouillis » : lignes de texte illisibles (gris, 2 px, longueurs variées, graine fixe)
  function grib(g, x, y, w, o) {
    o = Object.assign({ n: 1, pas: 14, seed: 7, col: GRIB, sw: 2, fin: 0.62 }, o);
    const R = rng(o.seed * 31 + Math.round(x * 3 + y * 7) + 11); let d = "";
    for (let i = 0; i < o.n; i++) {
      const yy = y + i * o.pas, W = (i === o.n - 1 && o.n > 1 ? o.fin : 1) * w * (0.92 + 0.08 * R());
      let cx = x;
      while (cx < x + W - 5) { const L = Math.min(x + W - cx, 7 + R() * 24); d += `M${f(cx)} ${f(yy + (R() - 0.5) * 1.4)} q${f(L / 2)} ${f((R() - 0.5) * 2.6)} ${f(L)} ${f((R() - 0.5) * 1.4)}`; cx += L + 4 + R() * 4; }
    }
    return el("path", { d: d || "M0 0", fill: "none", stroke: o.col, "stroke-width": o.sw, "stroke-linecap": "round" }, g);
  }
  // tête de vis en acier vue de face : fente tournée de a degrés (0 = horizontale)
  function visTete(g, x, y, r, a, o) {
    o = o || {};
    if (o.ombre !== false) el("circle", { cx: f(x + r * 0.16), cy: f(y + r * 0.22), r: f(r), fill: "rgba(28,26,28,.22)" }, g);
    el("circle", { cx: f(x), cy: f(y), r: f(r), fill: o.fill || ACIER, stroke: o.stroke || INK, "stroke-width": f(clamp(r * 0.22, 1.3, 3)) }, g);
    if (!o.vide) ln(g, `M${f(x - r * 0.6)} ${f(y - r * 0.18)} A${f(r * 0.64)} ${f(r * 0.64)} 0 0 1 ${f(x - r * 0.12)} ${f(y - r * 0.62)}`, f(Math.max(1, r * 0.14)), "#FFFFFF");
    const c = Math.cos(rad(a || 0)), s = Math.sin(rad(a || 0)), L = r * 0.7;
    ln(g, `M${f(x - c * L)} ${f(y - s * L)} L${f(x + c * L)} ${f(y + s * L)}`, f(clamp(r * 0.2, 1.3, 4)), o.fente || o.stroke || INK);
  }
  // transforme un tracé absolu (M L C A-less) : x' = (x + dx) · k + ox ; y' = y · k + oy
  const tr = (d, k, dx, ox, oy) => { let i = 0; return d.replace(/-?\d*\.?\d+/g, (m) => f((i++ % 2 === 0 ? (parseFloat(m) + (dx || 0)) * k + (ox || 0) : parseFloat(m) * k + (oy || 0)))); };

  D.util = { MAT, INK, OMBRE, PAPIER, LAITON2, CLAIR, GRIB, ACIER, CREME, HALO, GRIS, YEL, AR, el, f, rad, lerp, clamp, rot, rr, rng, ln, ombre, cercle, ellipse, txt, mix, lw, grib, visTete, tr };

  // EXEMPLE du gabarit — encore utilisé par les scènes d'exemple de scenes-1.js ; à supprimer avec elles.
  D.exemple = (g, o = {}) => {
    const C = U.ctx(g, 611, false, 1), L = o.len || 110;
    el("path", { d: `M-40 ${L + 34} L40 ${L + 34} L240 ${L + 900} L-240 ${L + 900} Z`, fill: HALO, opacity: 0.25 }, g);
    U.stroke(C, "fil", `M0 0 L0 ${L}`, { sw: 3 });
    U.shape(C, "abat", `M-16 ${L} L16 ${L} L46 ${L + 34} L-46 ${L + 34} Z`, MAT.grey, { sw: 2.6 });
    el("ellipse", { cx: 0, cy: L + 36, rx: 22, ry: 8, fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g);
    return { ampoule: [0, L + 36] };
  };

  /* ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
   * A. OBJETS SIGNATURE — le laiton, les lettres, les étiquettes, les tampons
   * ═════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

  /* ───────── D.lettre — lettre-OBJET en laiton, découpée dans une tôle épaisse ─────────
   * o = { ch: "D" | "r" | ".", h: 120, vis: 0 (degrés des fentes), ombre: true, fond: null (couleur pour reboucher le trou du D) }
   * Ancrage = milieu de la ligne de base. Renvoie { w, crochet (où passe une ficelle), haut, vis: [[x, y], …] }.
   * Contours en unités h = 100, origine en bas à gauche ; la contre-forme du D tourne à l'envers (le trou reste un trou). */
  const LETTRES = {
    D: { w: 84, top: 100, crochet: [0.10, -1],
      ext: "M0 -100 L38 -100 C68 -100 84 -78 84 -50 C84 -22 68 0 38 0 L0 0 Z",
      int: "M24 -78 L24 -22 L38 -22 C52 -22 60 -34 60 -50 C60 -66 52 -78 38 -78 Z",
      clair: "M5 -5 L5 -95 L38 -95 C50 -95 60 -91 67 -84", vis: [[-0.30, -0.86], [-0.30, -0.14]] },
    r: { w: 56, top: 68, crochet: [0.20, -0.66],
      ext: "M0 -68 L24 -68 L24 -56 C30 -65 40 -70 56 -68 L56 -44 C44 -48 30 -46 24 -34 L24 0 L0 0 Z",
      gras: "M0 -68 L27.6 -68 L27.6 -57 C33 -65 42 -70 56 -68 L56 -44 C46 -48 33 -46 27.6 -35 L27.6 0 L0 0 Z",
      clair: "M5 -5 L5 -63 L20 -63 M29 -58 C36 -63 44 -64 51 -63", vis: [[-0.16, -0.58], [-0.16, -0.10]] },
    ".": { w: 24, top: 24, crochet: [0, -0.24],
      ext: "M4 -24 L20 -24 C22.4 -24 24 -22.4 24 -20 L24 -4 C24 -1.6 22.4 0 20 0 L4 0 C1.6 0 0 -1.6 0 -4 L0 -20 C0 -22.4 1.6 -24 4 -24 Z",
      clair: "M4.5 -5 L4.5 -19.5 L19 -19.5", vis: [[0, -0.12]] },
  };
  const lettreTrace = (ch, h, ox, oy) => {       // contour (extérieur + trou) d'une lettre de hauteur h, ancrée en (ox, oy)
    const L = LETTRES[ch] || LETTRES.D, k = h / 100, ext = ch === "r" && h < 40 ? L.gras : L.ext;
    return tr(ext, k, -L.w / 2, ox, oy) + (L.int ? " " + tr(L.int, k, -L.w / 2, ox, oy) : "");
  };
  D.lettre = (g, o) => {
    o = Object.assign({ ch: "D", h: 120, vis: 0, ombre: true, fond: null, seed: 801 }, o);
    const L = LETTRES[o.ch] || LETTRES.D, h = o.h, k = h / 100, petit = h < 50;
    const C = U.ctx(g, o.seed + (o.ch === "D" ? 1 : o.ch === "r" ? 2 : 3), false, 1);
    const ext = tr(o.ch === "r" && h < 40 ? L.gras : L.ext, k, -L.w / 2), int = L.int ? tr(L.int, k, -L.w / 2) : "", tout = ext + (int ? " " + int : "");
    const sw = clamp(h / 36, 1.5, 3.2);
    if (o.ombre) el("path", { d: tout, fill: "rgba(28,26,28,.15)", transform: `translate(${f(9 * k)} ${f(11 * k)})` }, g);
    // tranche : le même contour décalé de (5, 6) × k
    el("path", { d: tout, fill: LAITON2, stroke: INK, "stroke-width": f(Math.min(2, sw * 0.75)), "stroke-linejoin": "round", transform: `translate(${f(5 * k)} ${f(6 * k)})` }, g);
    // face
    el("path", { d: tout, fill: YEL }, g);
    if (!petit) { const n = C.rc.path(tout, { roughness: 0.6, stroke: "none", fill: "#E3AE2C", fillStyle: "hachure", hachureGap: clamp(h / 22, 4.6, 7), fillWeight: 1.3, hachureAngle: -41, seed: 4000 + o.seed + Math.round(h) }); C.g.appendChild(n); }
    if (int && o.fond) el("path", { d: int, fill: o.fond }, g);
    U.stroke(C, "ext" + Math.round(h), ext, { sw, r: petit ? 0.25 : 0.55, single: petit });
    if (int) U.stroke(C, "int" + Math.round(h), int, { sw: sw * 0.9, r: petit ? 0.25 : 0.5, single: petit });
    // arête claire (haut et gauche)
    if (h >= 24) ln(g, tr(L.clair, k, -L.w / 2), f(clamp(h / 50, 1, 2.2)), "#FFFFFF", { opacity: 0.9 });
    // vis de fixation
    const vr = Math.max(1.6, 0.05 * h), vis = L.vis.map((p) => [f(p[0] * h), f(p[1] * h)]);
    vis.forEach(([x, y], i) => visTete(g, x, y, vr, (Array.isArray(o.vis) ? o.vis[i] || 0 : o.vis) + (i ? 35 : -20), { ombre: h >= 60 }));
    return { w: f(L.w * k), crochet: [f(L.crochet[0] * h), f(L.crochet[1] * h)], haut: [0, f(-L.top * k)], vis };
  };
  D.lettre.essais = [{ ch: "D", h: 220 }, { ch: "r", h: 220 }, { ch: ".", h: 220 }, { ch: "D", h: 64, vis: 90 }, { ch: "r", h: 46 }, { ch: "r", h: 28 }];

  /* ───────── D.motDr — « D », « r », « . » posées à la suite (version statique de l'aide motDr de story.js) ─────────
   * o = { h: 120, point: true, vis: 0 } · ancrage = bord GAUCHE du mot, sur la ligne de base.
   * Centres : D à 0,42 h · r à 1,24 h · point à 1,74 h ; largeur totale 1,86 h (1,52 h sans le point). */
  D.motDr = (g, o) => {
    o = Object.assign({ h: 120, point: true, vis: 0 }, o);
    const h = o.h, out = {};
    [["D", 0.42], ["r", 1.24], [".", 1.74]].forEach(([ch, kx], i) => {
      if (ch === "." && !o.point) return;
      out[ch === "." ? "pt" : ch] = [f(kx * h), 0];
      D.lettre(el("g", { transform: `translate(${f(kx * h)} 0)` }, g), { ch, h, vis: o.vis, ombre: o.ombre !== false, seed: 801 + i });
    });
    out.w = f((o.point ? 1.86 : 1.52) * h);
    return out;
  };
  D.motDr.pas = { D: 0.42, r: 1.24, pt: 1.74, w: 1.86, wSansPoint: 1.52 };
  D.motDr.essais = [{ h: 120 }, { h: 44, point: false }, { h: 28 }];

  /* ───────── D.plaque — plaque de porte vissée (laiton) ou plaque d'émail (tribunaux, plaquettes) ─────────
   * o = { kind: "laiton" | "email", w, h, nVis: 4 | 2 | 0, vis: degrés (nombre ou tableau),
   *       lignes: [{ t, x: 0, y, size: 40, n }]   textes GRAVÉS (n = caractères déjà gravés ; y par défaut = centré),
   *       points: { x0, y, n, pas, onde }         le NOM en pointillé ; le point n° ⌊onde⌋ est 1,6 × plus gros,
   *       trous: [[x, y], …]                      trous de vis vides,
   *       fantome: 0…1, fantomeAt: { x, y, h, point }   trace claire des lettres « D r . » (x = bord gauche, y = ligne de base),
   *       reflet: 0…1 | null                      bande claire oblique (découpée par la plaque),
   *       at: [cx, cy]   si donné, points / trous / fantomeAt sont en coordonnées MONDE (comme dans le storyboard) }
   * Ancrage = centre. Renvoie { coins: [[x, y], …] (les vis), bord: { x, y, w, h } (le filet intérieur : y découper un reflet) }.
   * Pour animer sans redessiner la plaque : le reflet = D.bandeReflet dans c.clipped(bord), les étincelles = D.etincelle. */
  D.plaque = (g, o) => {
    o = Object.assign({ kind: "laiton", w: 520, h: 190, nVis: 4, vis: 0, lignes: [], points: null, trous: [], fantome: 0, fantomeAt: null, reflet: null, at: null, seed: 811 }, o);
    const w = o.w, h = o.h, lai = o.kind !== "email", x0 = -w / 2, y0 = -h / 2, ax = o.at ? o.at[0] : 0, ay = o.at ? o.at[1] : 0;
    const C = U.ctx(g, o.seed + Math.round(w * 3 + h), false, 1), R = lai ? Math.min(16, h * 0.14) : Math.min(10, h * 0.2);
    const od = clamp(h * 0.08, 3, 7);
    ombre(g, rr(x0, y0, w, h, R), f(od), f(od * 9 / 7));
    const fi = lai ? Math.min(14, h * 0.115) : Math.min(7, h * 0.13);
    if (lai) {
      U.shape(C, "pl", rr(x0, y0, w, h, R), MAT.yellow, { sw: 3.2, r: h < 140 ? 0.55 : 0.9 });
      ln(g, rr(x0 + fi + 1.5, y0 + fi + 1.5, w - 2 * fi, h - 2 * fi, R * 0.6), 1.4, CLAIR);
      ln(g, rr(x0 + fi, y0 + fi, w - 2 * fi, h - 2 * fi, R * 0.6), 2, LAITON2);
    } else {
      U.shape(C, "pl", rr(x0, y0, w, h, R), MAT.white, { sw: h < 60 ? 2.6 : 3, r: 0.5 });
      ln(g, rr(x0 + fi, y0 + fi, w - 2 * fi, h - 2 * fi, R * 0.6), h < 60 ? 1.3 : 1.7, INK);
    }
    // trace claire des lettres parties
    if (o.fantome > 0) {
      const fa = o.fantomeAt ? { x: o.fantomeAt.x - ax, y: o.fantomeAt.y - ay, h: o.fantomeAt.h, point: o.fantomeAt.point } : { x: x0 + 40, y: h * 0.147, h: h * 0.37 };
      [["D", 0.42], ["r", 1.24], [".", 1.74]].forEach(([ch, kx]) => {
        if (ch === "." && fa.point === false) return;
        const d = lettreTrace(ch, fa.h, fa.x + kx * fa.h, fa.y);
        el("path", { d, fill: "#FFE9A0", opacity: f(clamp(o.fantome, 0, 1)) }, g);
        ln(g, d, 1.2, LAITON2, { opacity: f(0.55 * clamp(o.fantome, 0, 1)), "stroke-dasharray": "5 4" });
      });
    }
    // textes gravés (le corps est réduit si le texte ne tient pas entre les vis : jamais une lettre sur une vis)
    const vr = lai ? Math.max(7, 0.045 * h) : clamp(h * 0.11, 4.5, 7), ins = lai ? Math.max(1.2 * vr, 18) : Math.max(1.2 * vr, 12);
    const libre = w - 2 * (o.nVis === 2 ? ins + (lai ? 4 : 3) + vr + 9 : fi + 9);
    (o.lignes || []).forEach((l) => {
      const t = String(l.t == null ? "" : l.t), n = l.n == null ? t.length : clamp(Math.round(l.n), 0, t.length);
      const s0 = l.size || 40, size = l.x || l.ajuste === false ? s0 : f(Math.min(s0, libre / Math.max(1, t.length * 0.485))), x = l.x || 0, y = l.y == null ? size * 0.34 : l.y;
      const put = (dx, dy, fill) => {
        const te = el("text", { x: f(x + dx), y: f(y + dy), "font-family": "Kalam, 'Comic Sans MS', cursive", "font-weight": 700, "font-size": size, fill, "text-anchor": l.anchor || "middle" }, g);
        el("tspan", {}, te).textContent = t.slice(0, n);
        if (n < t.length) el("tspan", { "fill-opacity": 0 }, te).textContent = t.slice(n);
      };
      if (lai) put(1.5, 1.5, CLAIR);
      put(0, 0, INK);
    });
    // le nom en pointillé
    if (o.points) {
      const p = Object.assign({ x0: 0, y: 0, n: 6, pas: 40, onde: null }, o.points), pr = 0.16 * p.pas;
      for (let i = 0; i < p.n; i++) {
        const gros = p.onde != null && p.onde >= 0 && Math.floor(p.onde) === i, r = pr * (gros ? 1.6 : 1), cx = p.x0 - ax + i * p.pas, cy = p.y - ay;
        if (lai) el("circle", { cx: f(cx + 1.5), cy: f(cy + 1.5), r: f(r), fill: CLAIR }, g);
        el("circle", { cx: f(cx), cy: f(cy), r: f(r), fill: INK }, g);
      }
    }
    // trous de vis vides
    (o.trous || []).forEach(([tx, ty]) => {
      el("circle", { cx: f(tx - ax), cy: f(ty - ay), r: 4, fill: "#3A3A37" }, g);
      ln(g, `M${f(tx - ax + 4.6)} ${f(ty - ay - 1.5)} A5 5 0 0 1 ${f(tx - ax - 1.5)} ${f(ty - ay + 4.6)}`, 1.3, lai ? CLAIR : "#C9C9C1");
    });
    // reflet (bande claire oblique, découpée par la plaque)
    if (o.reflet != null && o.reflet > 0 && o.reflet < 1) {
      const id = "epPl" + Math.round(w) + "x" + Math.round(h) + (lai ? "L" : "E");
      el("path", { d: rr(x0 + 2, y0 + 2, w - 4, h - 4, R) }, el("clipPath", { id }, g));
      D.bandeReflet(el("g", { transform: `translate(${f(lerp(-w / 2 - 60, w / 2 + 60, o.reflet))} 0)` }, el("g", { "clip-path": `url(#${id})` }, g)), { h });
    }
    // vis d'acier
    const coins = o.nVis === 4 ? [[x0 + ins, y0 + ins], [-x0 - ins, y0 + ins], [x0 + ins, -y0 - ins], [-x0 - ins, -y0 - ins]]
      : o.nVis === 2 ? [[x0 + ins + (lai ? 4 : 3), 0], [-x0 - ins - (lai ? 4 : 3), 0]] : [];
    coins.forEach(([x, y], i) => visTete(g, x, y, vr, (Array.isArray(o.vis) ? o.vis[i] || 0 : o.vis || 0) + [20, -35, 70, -10][i % 4]));
    return { coins: coins.map((p) => [f(p[0]), f(p[1])]), bord: { x: f(x0 + fi), y: f(y0 + fi), w: f(w - 2 * fi), h: f(h - 2 * fi) } };
  };
  D.plaque.essais = [
    { w: 680, h: 480, at: [540, 800], points: { x0: 510, y: 716, n: 9, pas: 40, onde: 4 }, reflet: 0.62 },                                   // XL (S1)
    { w: 520, h: 190, at: [540, 800], points: { x0: 490, y: 818, n: 4, pas: 40 }, fantome: 0.8, trous: [[334, 767], [334, 818], [396, 787], [396, 821], [442, 820]] },   // M (S10, S25)
    { w: 330, h: 130, nVis: 2, at: [360, 760], points: { x0: 360, y: 772, n: 4, pas: 36 } },                                                // S (S24)
    { w: 420, h: 120, nVis: 2, lignes: [{ t: "Yassine", x: 0, y: 24, size: 72, n: 7 }] },                                                   // Yassine (S4)
    { w: 520, h: 200, at: [540, 700], points: { x0: 380, y: 672, n: 9, pas: 40 }, lignes: [{ t: "Ärztin / Arzt", x: 0, y: 62, size: 56, n: 9 }] },   // porte (S29), gravure en cours
    { w: 200, h: 84, at: [330, 990], points: { x0: 320, y: 996, n: 4, pas: 24 } },                                                          // étau (S7, S26)
    { kind: "email", w: 470, h: 120, nVis: 2, lignes: [{ t: "= 15.000 €", size: 84 }] },                                                    // S20
    { kind: "email", w: 480, h: 56, nVis: 0, lignes: [{ t: "LG Düsseldorf 16.11.2021 · BGH 02.11.2022", size: 22 }] },                      // S23
    { kind: "email", w: 300, h: 84, nVis: 2, lignes: [{ t: "Amtsgericht 2019", size: 30 }] },                                               // S25
    { kind: "email", w: 220, h: 54, nVis: 0, lignes: [{ t: "1. Instanz", size: 30 }] },                                                     // S20
  ];

  /* ───────── D.bandeReflet — la bande claire qui balaie le laiton (à poser dans un groupe découpé : c.clipped(bord)) ─────────
   * o = { h: 190 (hauteur de la plaque), larg: 26, op: 0.35 } · ancrage = centre de la bande.
   * Animation : x de (bord gauche − 60) à (bord droit + 60) en 0,7 s, toutes les 2,4 s (simple translation, aucun redessin). */
  D.bandeReflet = (g, o) => {
    o = Object.assign({ h: 190, larg: 26, op: 0.35 }, o);
    const H = o.h / 2 + 10, sh = o.h * 0.16, a = o.larg / 2;
    el("path", { d: `M${f(-a + sh)} ${-H} L${f(a + sh)} ${-H} L${f(a - sh)} ${H} L${f(-a - sh)} ${H} Z`, fill: "#FFFFFF", opacity: o.op }, g);
    el("path", { d: `M${f(a + 12 + sh)} ${-H} L${f(a + 19 + sh)} ${-H} L${f(a + 19 - sh)} ${H} L${f(a + 12 - sh)} ${H} Z`, fill: "#FFFFFF", opacity: f(o.op * 0.7) }, g);
    return { larg: o.larg + 19 };
  };
  D.bandeReflet.essais = [{ h: 190 }];

  /* ───────── D.etincelle — petite étoile blanche à quatre branches (arêtes du laiton) ─────────
   * o = { s: 10 } demi-envergure · ancrage = centre. Animation : opacité 0 ↔ 1 (1,1 s, déphasées), légère rotation. */
  D.etincelle = (g, o) => {
    o = Object.assign({ s: 10 }, o);
    const s = o.s, q = s * 0.22;
    el("path", { d: `M0 ${-s} L${f(q)} ${f(-q)} L${s} 0 L${f(q)} ${f(q)} L0 ${s} L${f(-q)} ${f(q)} L${-s} 0 L${f(-q)} ${f(-q)} Z`, fill: "#FFFFFF", stroke: LAITON2, "stroke-width": 0.9, "stroke-linejoin": "round" }, g);
    return { s };
  };
  D.etincelle.essais = [{ s: 10 }];

  /* ───────── D.etiquette — étiquette de prix à ficelle (papier crème) ─────────
   * o = { w: 300, h: 140, L: 120 (longueur de ficelle : l'œillet est en (0, L)), ecart: 0 (une ficelle) ou demi-écart des DEUX brins,
   *       dyG, dyD (décalage vertical des deux points d'accroche), rot (degrés du corps autour de l'œillet),
   *       l1, s1 · l2, s2 (Kalam) · ar, sAr (Plex Arabic 700) · y1, y2, yAr (lignes de base depuis le haut du corps, facultatif),
   *       gris: 0…1 (étiquette grisée), casse: 0…1 (la ficelle se rompt),
   *       partie: "tout" | "corps" (corps + œillet + bout de ficelle cassé) | "ficelle" (les brins du haut seulement) }
   * Ancrage (0, 0) = milieu des points d'accroche = pivot du balancement ; le corps va de y = L − 14 à L − 14 + h.
   * Renvoie { oeillet: [0, L], corps: { x, y, w, h }, bas: [0, L − 14 + h] }. */
  D.etiquette = (g, o) => {
    o = Object.assign({ w: 300, h: 140, L: 120, ecart: 0, dyG: 0, dyD: 0, rot: 0, l1: "15.000 €", s1: 64, l2: "", s2: 22, ar: "", sAr: 28, gris: 0, casse: 0, partie: "tout", seed: 821 }, o);
    const w = o.w, h = o.h, L = o.L, top = L - 14, gz = clamp(o.gris, 0, 1), ca = clamp(o.casse, 0, 1);
    const pap = mix(CREME, "#E6E6E1", gz), enc = mix(INK, "#77776F", gz);
    const pts = o.ecart ? [[-o.ecart, o.dyG || 0], [o.ecart, o.dyD || 0]] : [[0, 0]];
    const corps = o.partie !== "ficelle", brins = o.partie !== "corps", bas = [];
    // ficelle(s)
    pts.forEach(([px, py], i) => {
      const sg = px < 0 ? -1 : px > 0 ? 1 : (i ? 1 : -1), len = Math.hypot(px, L - py);
      if (ca <= 0) { if (brins) ln(g, `M${f(px)} ${f(py)} Q${f(px / 2 + sg * 5)} ${f((py + L) / 2 + 7)} 0 ${L}`, 2.5, enc); return; }
      const bx = lerp(px, 0, 0.42), by = lerp(py, L, 0.42);                                   // point de rupture
      const hx = lerp(bx, px + sg * 3, ca), hy = lerp(by, py + 0.4 * len, ca);                // bout du brin du haut : il pend
      if (brins) ln(g, `M${f(px)} ${f(py)} Q${f(lerp((px + bx) / 2, px + sg * 7, ca))} ${f(lerp((py + by) / 2, py + 0.22 * len, ca))} ${f(hx)} ${f(hy)}`, 2.5, enc);
      const lx = lerp(bx, sg * (36 + 10 * i), ca), ly = lerp(by, L + 6 + 7 * i, ca);          // bout du brin du bas : il retombe à côté de l'œillet
      if (corps) bas.push(`M0 ${L} Q${f(lerp(bx / 2, sg * 24, ca))} ${f(lerp((by + L) / 2, L - 30, ca))} ${f(lx)} ${f(ly)}`);
    });
    if (corps) {
      const b = el("g", o.rot ? { transform: `rotate(${f(o.rot)} 0 ${L})` } : {}, g), C = U.ctx(b, o.seed + Math.round(w + h), false, 1);
      const c = Math.min(30, h * 0.22, w * 0.12), x0 = -w / 2, d = `M${f(x0 + c)} ${top} L${f(-x0 - c)} ${top} L${-x0} ${f(top + c)} L${-x0} ${top + h} L${x0} ${top + h} L${x0} ${f(top + c)} Z`;
      ombre(b, d, 6, 8);
      U.shape(C, "et", d, { base: pap }, { sw: 3, stroke: enc });
      ln(b, `M${f(x0 + 9)} ${f(top + c + 4)} L${f(x0 + 9)} ${top + h - 9} L${f(-x0 - 9)} ${top + h - 9} L${f(-x0 - 9)} ${f(top + c + 4)}`, 1.4, mix("#C9C3B2", "#BDBDB6", gz));
      // œillet
      el("circle", { cx: 0, cy: L, r: 15, fill: mix(ACIER, "#D6D6D1", gz), stroke: enc, "stroke-width": 1.8 }, b);
      el("circle", { cx: 0, cy: L, r: 9, fill: "#FFFFFF", stroke: enc, "stroke-width": 2.5 }, b);
      // textes : empilés et centrés dans la zone utile (sous l'œillet)
      const ls = [];
      if (o.l1) ls.push({ t: o.l1, s: o.s1, asc: 0.72, y: o.y1 });
      if (o.l2) ls.push({ t: o.l2, s: o.s2, asc: 0.72, y: o.y2 });
      if (o.ar) ls.push({ t: o.ar, s: o.sAr, asc: 0.8, ar: true, y: o.yAr });
      const gap = (i) => (i ? ls[i].s * 0.3 + 4 : 0), tot = ls.reduce((a, l, i) => a + gap(i) + l.s * l.asc, 0), zone0 = top + 31, zone1 = top + h - 13;
      let y = zone0 + Math.max(0, (zone1 - zone0 - tot) / 2);
      ls.forEach((l, i) => {
        y += gap(i) + l.s * l.asc;
        const yy = l.y != null ? top + l.y : y;
        txt(b, l.t, 0, f(yy), l.s, l.ar ? Object.assign({ fill: enc }, AR) : { fill: enc });
      });
      ln(b, `M${f(-x0 - c - 2)} ${f(top + 3)} L${f(-x0 - 3)} ${f(top + c + 2)}`, 1.2, mix("#C9C3B2", "#BDBDB6", gz));   // petit pli du coin coupé
      bas.forEach((d) => ln(g, d, 2.5, enc));                                                                            // brins cassés : ils retombent SUR le papier
    }
    return { oeillet: [0, L], corps: { x: f(-w / 2), y: top, w, h }, bas: [0, top + h] };
  };
  D.etiquette.essais = [
    { w: 330, h: 180, L: 170, ecart: 55, dyG: -20, dyD: 21, rot: -5, l1: "15.000 €", s1: 70, l2: "Geldstrafe", s2: 28, ar: "غرامة", sAr: 30 },    // S1 : deux brins
    { w: 300, h: 140, L: 110, l1: "15.000 €", s1: 64, l2: "Geldstrafe · 1. Instanz", s2: 22 },                                                 // S3 : une ficelle
    { w: 300, h: 96, L: 50, l1: "Missbrauch von Titeln", s1: 24, l2: "§ 132a StGB", s2: 22 },                                                  // S2
    { w: 360, h: 190, L: 90, l1: "15.000 €", s1: 84, l2: "1. Instanz", s2: 26, gris: 1 },                                                      // grisée
    { w: 180, h: 110, L: 120, ecart: 40, l1: "15.000 €", s1: 36, l2: "nicht rechtskräftig", s2: 15, casse: 1 },                                // cassée
    { w: 250, h: 84, L: 60, l1: "13.500 €", s1: 34, l2: "laut Presse", s2: 18, casse: 0.5 },                                                   // en train de casser
  ];

  /* ───────── D.empreinte — empreinte de tampon à l'ENCRE (jamais rouge), sans fond ─────────
   * o = { text, sub, w, h, size, rot, coche: true (une coche TRACÉE après le mot : « ✓ » n'est pas un caractère sûr), fond: couleur des manques }
   * Ancrage = centre. Arrive par node.slam(at, 0.28, amp). */
  D.empreinte = (g, o) => {
    o = Object.assign({ text: "EINSPRUCH", sub: "", w: 320, h: 90, size: 46, rot: 0, coche: false, fond: PAPIER, seed: 831 }, o);
    const w = o.w, h = o.h, s = o.size, b = el("g", { transform: `rotate(${f(o.rot)})`, opacity: 0.92 }, g), C = U.ctx(b, o.seed + Math.round(w + h * 3), false, 1);
    const R = Math.min(14, h * 0.2);
    U.stroke(C, "o", rr(-w / 2, -h / 2, w, h, R), { sw: 5, r: 0.55, single: true });
    ln(b, rr(-w / 2 + 9, -h / 2 + 9, w - 18, h - 18, R * 0.55), 2, INK);
    const tw = lw(o.text, s), cw = o.coche ? s * 0.62 : 0, gap = o.coche ? s * 0.24 : 0, x0 = -(tw + gap + cw) / 2;
    const yb = o.sub ? s * 0.16 : s * 0.34;
    txt(b, o.text, f(x0 + tw / 2), f(yb), s, {});
    if (o.coche) { const cx = x0 + tw + gap; ln(b, `M${f(cx)} ${f(yb - s * 0.3)} L${f(cx + s * 0.2)} ${f(yb - s * 0.06)} L${f(cx + s * 0.6)} ${f(yb - s * 0.66)}`, f(s * 0.13), INK); }
    if (o.sub) txt(b, o.sub, 0, f(yb + s * 0.2 + Math.max(14, s * 0.42)), Math.max(14, s * 0.42), {});
    // six petits manques (l'encre n'a pas pris partout) — graine fixe
    const Rn = rng(o.seed + o.text.length * 13 + Math.round(w));
    [[-0.34, -0.5], [0.22, -0.5], [-0.12, 0.5], [0.4, 0.5], [-0.5, 0.1], [0.08, 0.02]].forEach(([kx, ky], i) => {
      const x = kx * w + (Rn() - 0.5) * 16, y = ky * h + (i === 5 ? (Rn() - 0.5) * s * 0.3 : 0);
      el("ellipse", { cx: f(x), cy: f(y), rx: f(3.2 + Rn() * 3.4), ry: f(1.8 + Rn() * 1.6), fill: o.fond, transform: `rotate(${Math.round(Rn() * 90 - 45)} ${f(x)} ${f(y)})` }, b);
    });
    return { w, h };
  };
  D.empreinte.essais = [
    { text: "Arzt", coche: true, w: 200, h: 76, size: 44, rot: -8 }, { text: "Doktortitel", coche: true, w: 250, h: 76, size: 38, rot: -8 },
    { text: "Berufsdoktorat", w: 230, h: 60, size: 30, rot: -7 }, { text: "08.09.2009", w: 230, h: 66, size: 36, rot: 4 },
    { text: "09.01.2017", w: 230, h: 66, size: 36, rot: 4 }, { text: "angezeigt", w: 330, h: 90, size: 50, rot: -6 },
    { text: "EINSPRUCH", w: 320, h: 90, size: 50, rot: -6 }, { text: "nicht rechtskräftig", w: 400, h: 84, size: 40, rot: -8 },
    { text: "schuldig", w: 400, h: 110, size: 64, rot: -8 }, { text: "rechtskräftig", w: 440, h: 100, size: 50, rot: 5 },
    { text: "Berufsdoktorat", w: 230, h: 56, size: 28, rot: -7 },
  ];

  /* ───────── D.tampon — le cachet (l'objet) : pommeau et col en bois, virole grise, semelle de caoutchouc ─────────
   * o = { leve: 0 (hauteur au-dessus du papier, px : l'ombre reste sur le papier et rétrécit) }
   * 220 × 250 · ancrage = centre de la face encrée. Renvoie { col: [0, −130] (où la main le tient), haut: [0, −250] }. */
  D.tampon = (g, o) => {
    o = Object.assign({ leve: 0, seed: 841 }, o);
    const C = U.ctx(g, o.seed, false, 1), k = clamp(o.leve / 130, 0, 1);
    el("ellipse", { cx: 0, cy: f(o.leve + 5), rx: f(lerp(118, 78, k)), ry: f(lerp(13, 8, k)), fill: "rgba(28,26,28," + f(lerp(0.26, 0.12, k)) + ")" }, g);
    // monture en bois + semelle de caoutchouc
    U.shape(C, "mont", rr(-104, -66, 208, 46, 8), MAT.wood, { sw: 3 });
    ln(g, "M-92 -52 L92 -52", 1.4, "#ABABA4"); ln(g, "M-92 -34 L60 -34", 1.2, "#ABABA4");
    el("path", { d: "M-8 -62 L8 -62 L0 -50 Z", fill: INK }, g);                                   // repère du sens (l'avant du cachet)
    U.shape(C, "sem", rr(-110, -22, 220, 22, 5), MAT.dark, { sw: 2.8 });
    ln(g, "M-100 -4 L100 -4", 1.6, "#77776F");
    // virole, col, pommeau
    U.shape(C, "vir", rr(-38, -88, 76, 24, 6), MAT.mid, { sw: 2.8 });
    ln(g, "M-30 -80 L30 -80", 1.4, "#FFFFFF");
    U.shape(C, "col", "M-27 -86 C-22 -120 -19 -150 -21 -176 L21 -176 C19 -150 22 -120 27 -86 Z", MAT.wood, { sw: 3 });
    ln(g, "M-12 -96 C-9 -124 -8 -150 -9 -170", 1.3, "#ABABA4"); ln(g, "M10 -100 C8 -124 7 -148 8 -166", 1.3, "#ABABA4");
    U.shape(C, "pom", "M-24 -172 C-52 -178 -56 -214 -40 -234 C-26 -252 26 -252 40 -234 C56 -214 52 -178 24 -172 Z", MAT.wood, { sw: 3 });
    ln(g, "M-34 -224 C-24 -240 -6 -244 8 -242", 2.4, "#FFFFFF");
    ln(g, "M-30 -188 C-12 -182 14 -182 32 -188", 1.4, "#ABABA4");
    return { col: [0, -130], haut: [0, -250] };
  };
  D.tampon.essais = [{ leve: 0 }, { leve: 90 }];

  /* ───────── D.barre — la barre qui barre : bande d'encre pleine, texte blanc ─────────
   * o = { w: 380, h: 54, rot: -16, text: "§ 132a StGB", size: 34 } · ancrage = centre. Arrive par node.slam(…). */
  D.barre = (g, o) => {
    o = Object.assign({ w: 380, h: 54, rot: -16, text: "§ 132a StGB", size: 34, seed: 851 }, o);
    const b = el("g", { transform: `rotate(${f(o.rot)})` }, g), R = rng(o.seed), w = o.w, h = o.h, n = Math.round(w / 38);
    let haut = "", bas = "";
    for (let i = 0; i <= n; i++) { const x = -w / 2 + (i * w) / n; haut += ` L${f(x)} ${f(-h / 2 + (R() - 0.5) * 5)}`; bas = ` L${f(x)} ${f(h / 2 + (R() - 0.5) * 5)}` + bas; }
    const d = `M${f(-w / 2 - 7)} ${f(-h * 0.1)}${haut} L${f(w / 2 + 8)} ${f(h * 0.12)}${bas} Z`;
    ombre(b, d, 5, 7);
    el("path", { d, fill: INK, stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, b);
    ln(b, `M${f(-w / 2 + 14)} ${f(-h / 2 + 9)} L${f(w / 2 - 20)} ${f(-h / 2 + 8)}`, 1.4, "#55524B");
    txt(b, o.text, 0, f(o.size * 0.34), o.size, { fill: "#FFFFFF" });
    return { w, h };
  };
  D.barre.essais = [{ rot: -16 }];

  /* ───────── D.silhouette — le médecin de l'affaire, SANS visage : toujours le même pictogramme ─────────
   * o = { r: 56, cadre: "rond" | "aucun" } · ancrage = centre du médaillon. Ni yeux, ni bouche, ni cheveux, ni lunettes, ni barbe.
   * Renvoie { haut: [0, −r], bas: [0, r] }. */
  D.silhouette = (g, o) => {
    o = Object.assign({ r: 56, cadre: "rond", seed: 861 }, o);
    const r = o.r, rond = o.cadre !== "aucun", C = U.ctx(g, o.seed, false, clamp(r / 56, 0.5, 1.2));
    const ri = r * 0.955, sx = 0.65 * r, sy = rond ? Math.sqrt(Math.max(0, ri * ri - sx * sx)) : 0.8 * r;
    if (rond) { el("circle", { cx: f(r * 0.1), cy: f(r * 0.14), r: f(r), fill: OMBRE }, g); el("circle", { cx: 0, cy: 0, r: f(r), fill: "#FFFFFF" }, g); }
    // buste : cou + épaules (arc large de 1,3 r, de y 0,2 r jusqu'au bord du médaillon)
    const bas = rond ? `A${f(ri)} ${f(ri)} 0 0 1 ${f(-sx)} ${f(sy)}` : `L${f(-sx)} ${f(sy)}`;
    const buste = `M${f(-sx)} ${f(sy)} C${f(-sx)} ${f(0.42 * r)} ${f(-0.4 * r)} ${f(0.22 * r)} ${f(-0.13 * r)} ${f(0.2 * r)} L${f(-0.12 * r)} ${f(0.04 * r)} L${f(0.12 * r)} ${f(0.04 * r)} L${f(0.13 * r)} ${f(0.2 * r)} C${f(0.4 * r)} ${f(0.22 * r)} ${f(sx)} ${f(0.42 * r)} ${f(sx)} ${f(sy)} ${bas} Z`;
    const rg = r < 40 ? 0.2 : 0.4;
    U.shape(C, "bu", buste, MAT.sil, { sw: 2.4, r: rg });
    U.shape(C, "te", cercle(0, -0.18 * r, 0.3 * r), MAT.sil, { sw: 2.4, r: rg });
    if (rond) el("circle", { cx: 0, cy: 0, r: f(r), fill: "none", stroke: INK, "stroke-width": 3 }, g);
    return { haut: [0, -r], bas: [0, r] };
  };
  D.silhouette.essais = [{ r: 62 }, { r: 30 }, { r: 22 }, { r: 56, cadre: "aucun" }];

  /* ───────── D.medaillon — disque blanc cerclé d'encre (le médaillon de « toi », S5 et S11 : la tête Persona est posée dedans) ─────────
   * o = { r: 50 } · ancrage = centre. */
  D.medaillon = (g, o) => {
    o = Object.assign({ r: 50 }, o);
    const r = o.r;
    el("circle", { cx: f(r * 0.1), cy: f(r * 0.14), r, fill: OMBRE }, g);
    el("circle", { cx: 0, cy: 0, r, fill: "#FFFFFF", stroke: INK, "stroke-width": 3 }, g);
    return { r };
  };
  D.medaillon.essais = [{ r: 50 }];

  /* ───────── D.eclats — huit petits traits d'encre autour d'un point de choc ─────────
   * o = { p: 0…1 } : ils s'écartent de 24 à 80 px et s'effacent (0,25 s). Rien n'est dessiné pour p ≤ 0 ou p ≥ 1. Ancrage = point de choc. */
  D.eclats = (g, o) => {
    o = Object.assign({ p: 0.3 }, o);
    const p = o.p; if (!(p > 0 && p < 1)) return null;
    const e = 1 - Math.pow(1 - p, 3), d0 = lerp(24, 80, e);
    let d = "";
    [-176, -150, -122, -99, -80, -57, -30, -5].forEach((a, i) => {
      const c = Math.cos(rad(a)), s = Math.sin(rad(a)), r0 = d0 * (i % 2 ? 1 : 0.86);
      d += `M${f(c * r0)} ${f(s * r0)} L${f(c * (r0 + 16))} ${f(s * (r0 + 16))}`;
    });
    ln(g, d, 3, INK, { opacity: f(1 - p) });
    return { p };
  };
  D.eclats.essais = [{ p: 0.15 }, { p: 0.6 }];

  /* ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
   * HUD PROPRE À L'ÉPISODE (§ 3) — à poser dans c.hud (repère écran)
   * ═════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

  /* ───────── D.plaquette — plaquette de mode : petite plaque d'ÉMAIL à deux vis (X 100, Y 278–326) ─────────
   * o = { w: 250, de: "Beispiel", ar: "مثال", size: 24, sAr: 26, vis: 0 (degrés : un quart de tour à chaque bascule) }
   * Ancrage = milieu du bord GAUCHE (à poser en (100, 302)) : la bascule en volet (sy 1 → 0 → 1) tourne autour de y = 0.
   * Modes : BSP 250 « Beispiel · مثال » · FALL 470 « Der Fall · laut Urteil · حسب الحكم » · REKO 400 « Rekonstruktion · مشهد تمثيلي »
   *         REGEL 530 « Keine Rechtsberatung — frag deine Ärztekammer » (size 22, ar: null — son arabe est SOUS la plaquette). */
  D.plaquette = (g, o) => {
    o = Object.assign({ w: 250, de: "Beispiel", ar: "مثال", size: 24, sAr: 26, vis: 0, seed: 871 }, o);
    const w = o.w, h = 48, C = U.ctx(g, o.seed + Math.round(w), false, 1);
    ombre(g, rr(0, -h / 2, w, h, 9), 4, 5);
    U.shape(C, "pq", rr(0, -h / 2, w, h, 9), MAT.white, { sw: 2.6 });
    ln(g, rr(5, -h / 2 + 5, w - 10, h - 10, 5), 1.3, INK);
    visTete(g, 17, 0, 6, o.vis - 25); visTete(g, w - 17, 0, 6, o.vis + 40);
    const larg = (o.de.length + (o.ar ? 3 : 0)) * o.size * 0.485 + (o.ar ? o.ar.length * o.sAr * 0.5 : 0), k = Math.min(1, (w - 58) / larg);   // jamais sur une vis
    const te = el("text", { x: f(w / 2), y: f(o.size * 0.36), "text-anchor": "middle", "font-size": f(o.size * k), "font-family": "Kalam, 'Comic Sans MS', cursive", "font-weight": 700, fill: INK }, g);
    el("tspan", {}, te).textContent = o.de;
    if (o.ar) {
      el("tspan", { fill: "#77776F" }, te).textContent = "  ·  ";
      el("tspan", { "font-family": "'Plex Arabic', sans-serif", "font-size": f(o.sAr * k), "font-weight": 700 }, te).textContent = o.ar;
    }
    return { w, h };
  };
  D.plaquette.MODES = {
    BSP: { w: 250, de: "Beispiel", ar: "مثال" },
    FALL: { w: 470, de: "Der Fall · laut Urteil", ar: "حسب الحكم" },
    REKO: { w: 400, de: "Rekonstruktion", ar: "مشهد تمثيلي" },
    REGEL: { w: 530, de: "Keine Rechtsberatung — frag deine Ärztekammer", ar: null, size: 22, sous: "ماشي استشارة قانونية — سول الهيئة ديالك" },
  };
  D.plaquette.essais = [D.plaquette.MODES.BSP, D.plaquette.MODES.FALL, D.plaquette.MODES.REKO, { w: 530, de: "Keine Rechtsberatung — frag deine Ärztekammer", ar: null, size: 22, vis: 45 }];

  /* ───────── D.reglette — réglette des années : un rail d'acier et six têtes de vis (X 610–970, Y 302) ─────────
   * o = { vis: [{ e: 0 | 1 | 2, a: degrés de la fente, k: échelle }, × 6], ans: ["2001", …] }
   *   e = 0 vide (contour gris, année grise) · 1 active (acier, la fente tourne de 0 à 90°, la tête bat : k 1,3 → 1) · 2 passée (acier, fente horizontale)
   * Ancrage = bout GAUCHE du rail (à poser en (610, 302)) : vis à x = 10 + 68 i, années sur la ligne de base y = +38. */
  D.reglette = (g, o) => {
    o = Object.assign({ vis: [{ e: 2 }, { e: 2 }, { e: 1, a: 60, k: 1.15 }, { e: 0 }, { e: 0 }, { e: 0 }], ans: ["2001", "2009", "2015", "2017", "2019", "2022"] }, o);
    el("path", { d: rr(0, -4, 360, 8, 4), fill: OMBRE, transform: "translate(3 4)" }, g);
    el("path", { d: rr(0, -4, 360, 8, 4), fill: ACIER, stroke: INK, "stroke-width": 2 }, g);
    ln(g, "M8 -1.5 L352 -1.5", 1, "#FFFFFF");
    o.ans.forEach((an, i) => {
      const v = (o.vis && o.vis[i]) || { e: 0 }, x = 10 + 68 * i, e = v.e || 0, r = 11 * (v.k || 1);
      if (e === 0) visTete(g, x, 0, r, 90, { fill: PAPIER, stroke: GRIS, fente: "#C9C9C1", vide: true, ombre: false });
      else visTete(g, x, 0, r, e === 2 ? 0 : 90 - (v.a == null ? 90 : v.a), {});
      txt(g, an, x, 38, 20, { fill: e === 0 ? GRIS : INK });
    });
    return { xs: o.ans.map((_, i) => 10 + 68 * i) };
  };
  D.reglette.essais = [{}, { vis: [{ e: 2 }, { e: 2 }, { e: 2 }, { e: 2 }, { e: 2 }, { e: 1, a: 20, k: 1.3 }] }];

  /* ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
   * B. LA FAÇADE (S1) — mur de pierre, lanternes, corniche et ses objets, la main qui visse
   * ═════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

  /* ───────── D.facade — mur de façade en pierre de taille, plein cadre (coordonnées MONDE : poser en (0, 0)) ─────────
   * o = { x0: 40, x1: 1040, haut: 250, corniche: 1160, bas: 1470, nu: [235, 280, 845, 580] }
   * Assises de 150 px depuis y 280, joints verticaux décalés tous les 260 px ; corniche = dalle de y 1160 à 1190 (x 110–960) ;
   * soubassement plus sombre de 1190 à 1470. La zone « nu » (sous la pastille du haut) est une grande dalle lisse SANS joint.
   * Aucune partie mobile : la vie vient des objets posés dessus. Renvoie { corniche: y, dalle: [x0, x1] }. */
  D.facade = (g, o) => {
    o = Object.assign({ x0: 40, x1: 1040, haut: 250, corniche: 1160, bas: 1470, nu: [235, 280, 845, 580], seed: 901 }, o);
    const C = U.ctx(g, o.seed, false, 1), x0 = o.x0, x1 = o.x1, yc = o.corniche, J = "#C9C6BC", nu = o.nu;
    el("rect", { x: x0, y: o.haut, width: x1 - x0, height: yc - o.haut, fill: "#F1EFE8" }, g);
    // quatre pierres légèrement hachurées (dans les marges que la plaque ne couvre pas)
    [[x0, 580, 300, 730], [950, 730, x1, 880], [430, 1030, 690, yc], [845, 280, x1, 430]].forEach(([a, b, c, d], i) => {
      el("rect", { x: a, y: b, width: c - a, height: d - b, fill: "#ECEAE2" }, g);
      const n = C.rc.rectangle(a + 4, b + 4, c - a - 8, d - b - 8, { roughness: 0.8, stroke: "none", fill: "#D5D2C7", fillStyle: "hachure", hachureGap: 11, fillWeight: 1, hachureAngle: -41, seed: 9100 + i });
      g.appendChild(n);
    });
    // la grande dalle lisse (sous la pastille du haut) : aucun joint dedans
    if (nu) el("rect", { x: nu[0], y: nu[1], width: nu[2] - nu[0], height: nu[3] - nu[1], fill: "#F4F2EC" }, g);
    const dansNu = (x, ya, yb) => nu && x > nu[0] && x < nu[2] && yb > nu[1] && ya < nu[3];
    let d = "";
    for (let r = 0, y = 280; y < yc; r++, y += 150) {
      const yb = Math.min(yc, y + 150);
      // joint horizontal du haut de l'assise (coupé par la dalle lisse)
      if (nu && y > nu[1] && y < nu[3]) d += `M${x0} ${y} L${nu[0]} ${y} M${nu[2]} ${y} L${x1} ${y}`; else d += `M${x0} ${y} L${x1} ${y}`;
      for (let x = x0 + (r % 2 ? 130 : 260); x < x1 - 20; x += 260) if (!dansNu(x, y, yb)) d += `M${x} ${y} L${x} ${yb}`;
    }
    if (nu) d += `M${nu[0]} ${nu[1]} L${nu[0]} ${nu[3]} M${nu[2]} ${nu[1]} L${nu[2]} ${nu[3]} M${nu[0]} ${nu[3]} L${nu[2]} ${nu[3]}`;
    ln(g, d, 2.5, J);
    // quelques éclats et veines dans la pierre (marges)
    ln(g, `M70 330 l22 6 M92 652 l-18 10 l14 8 M968 520 l26 -8 M980 962 l-20 12 M112 1088 l30 4 M905 1100 l24 -10 M610 1110 l18 6`, 1.6, "#D5D2C7");
    // soubassement
    el("rect", { x: x0, y: yc + 30, width: x1 - x0, height: o.bas - yc - 30, fill: "#E1E1DC" }, g);
    const n = C.rc.rectangle(x0 + 3, yc + 33, x1 - x0 - 6, o.bas - yc - 36, { roughness: 0.8, stroke: "none", fill: "#A1A19B", fillStyle: "hachure", hachureGap: 6.5, fillWeight: 1.2, hachureAngle: -41, seed: 9150 });
    g.appendChild(n);
    ln(g, `M${x0} ${yc + 170} L${x1} ${yc + 170} M300 ${yc + 30} L300 ${yc + 170} M780 ${yc + 30} L780 ${yc + 170} M540 ${yc + 170} L540 ${o.bas}`, 2.5, "#8E8E88");
    el("rect", { x: x0, y: o.bas - 12, width: x1 - x0, height: 12, fill: PAPIER, opacity: 0.55 }, g);
    // corniche : dalle saillante + son ombre portée sur le soubassement
    el("rect", { x: 118, y: yc + 30, width: 850, height: 13, fill: "rgba(28,26,28,.2)" }, g);
    U.shape(C, "corn", rr(110, yc, 850, 30, 5), { base: "#F7F6F1" }, { sw: 3 });
    ln(g, `M122 ${yc + 10} L948 ${yc + 10}`, 1.5, J);
    ln(g, `M122 ${yc + 21} L948 ${yc + 21}`, 1.2, "#DAD7CC");
    return { corniche: yc, dalle: [110, 960] };
  };

  /* ───────── D.lanterne — applique murale : platine, bras en col de cygne, lanterne hexagonale, halo CRÈME ─────────
   * o = { cote: ±1 (côté où part le bras), halo: 0…1, partie: "tout" | "platine" (platine + bras) | "lanterne" (la lanterne seule) }
   * Ancrage = centre de la platine (partie "tout" et "platine") ; pour "lanterne" = son point d'accroche (le bout du bras).
   * Bout du bras = (50 × cote, −10) : y poser la lanterne et la faire pendre (m.pend autour de ce point). Corps : 56 × 84. */
  D.lanterne = (g, o) => {
    o = Object.assign({ cote: 1, halo: 1, partie: "tout", seed: 911 }, o);
    const s = o.cote < 0 ? -1 : 1, bout = [50 * s, -10];
    const lant = (gg) => {
      const C = U.ctx(gg, o.seed + 3, false, 1);
      el("ellipse", { cx: 0, cy: 46, rx: 75, ry: 60, fill: HALO, opacity: f(0.25 * clamp(o.halo, 0, 1.2)) }, gg);
      el("ellipse", { cx: 0, cy: 46, rx: 40, ry: 34, fill: HALO, opacity: f(0.3 * clamp(o.halo, 0, 1.2)) }, gg);
      ln(gg, "M0 0 L0 8", 2.6, INK);
      el("circle", { cx: 0, cy: 3, r: 4.5, fill: "none", stroke: INK, "stroke-width": 2.2 }, gg);
      U.shape(C, "toit", "M-28 24 L-9 9 L9 9 L28 24 Z", MAT.dark, { sw: 2.6 });
      U.shape(C, "verre", "M-24 24 L24 24 L17 70 L-17 70 Z", MAT.white, { sw: 2.6 });
      ln(gg, "M-9 24 L-6 70 M9 24 L6 70", 2, INK);
      el("circle", { cx: 0, cy: 47, r: 7, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, gg);
      ln(gg, "M-3 50 L-1 44 L1 50 L3 44", 1.2, "#77776F");
      ln(gg, "M0 54 L0 64", 1.8, "#77776F");
      U.shape(C, "cul", "M-18 70 L18 70 L11 80 L-11 80 Z", MAT.dark, { sw: 2.4 });
      el("circle", { cx: 0, cy: 84, r: 3.2, fill: INK }, gg);
      ln(gg, "M-19 30 L-15 62", 1.6, "#FFFFFF");
    };
    if (o.partie === "lanterne") { lant(g); return { centre: [0, 46] }; }
    const C = U.ctx(g, o.seed, false, 1);
    ombre(g, rr(-10, -30, 20, 60, 5), 4, 5);
    U.shape(C, "plat", rr(-10, -30, 20, 60, 5), MAT.mid, { sw: 2.6 });
    visTete(g, 0, -19, 3.4, 30, { ombre: false }); visTete(g, 0, 19, 3.4, -20, { ombre: false });
    // bras en col de cygne + volute
    ln(g, `M${8 * s} 12 C${30 * s} 14 ${54 * s} 6 ${50 * s} -10`, 5, INK);
    ln(g, `M${8 * s} 12 C${30 * s} 14 ${54 * s} 6 ${50 * s} -10`, 1.6, "#77776F");
    ln(g, `M${10 * s} -6 C${24 * s} -8 ${30 * s} 2 ${24 * s} 6 C${20 * s} 8 ${17 * s} 4 ${20 * s} 1`, 2.4, INK);
    if (o.partie !== "platine") lant(el("g", { transform: `translate(${bout[0]} ${bout[1]})` }, g));
    return { bout, centre: [bout[0], bout[1] + 46] };
  };
  D.lanterne.essais = [{ cote: 1 }, { cote: -1, halo: 0.6 }, { partie: "lanterne" }];

  /* ───────── D.niveau — niveau à bulle posé sur la corniche ─────────
   * o = { bulle: −1…1 } : la bulle est décalée de bulle × 14 px (elle oscille, sursaute aux chocs). 230 × 34 · ancrage = centre du bas. */
  D.niveau = (g, o) => {
    o = Object.assign({ bulle: 0, seed: 913 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    ombre(g, rr(-115, -34, 230, 34, 5), 5, 5);
    U.shape(C, "regle", rr(-115, -34, 230, 34, 5), MAT.light, { sw: 2.8 });
    ln(g, "M-105 -27 L105 -27", 1.2, "#FFFFFF");
    // fiole centrale + bulle
    el("path", { d: rr(-34, -26, 68, 18, 9), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2 }, g);
    ln(g, "M-11 -26 L-11 -8 M11 -26 L11 -8", 1.6, INK);
    el("ellipse", { cx: f(clamp(o.bulle, -1, 1) * 14), cy: -17, rx: 9, ry: 5.5, fill: "#EEF3F4", stroke: INK, "stroke-width": 1.8 }, g);
    // deux fioles rondes aux bouts + graduations
    [-84, 84].forEach((x) => { el("circle", { cx: x, cy: -17, r: 9, fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g); ln(g, `M${x - 9} -17 L${x + 9} -17`, 1.3, "#77776F"); });
    let d = ""; for (let x = -62; x <= 62; x += 8) if (Math.abs(x) > 40) d += `M${x} -5 L${x} ${x % 16 ? -9 : -12}`;
    ln(g, d, 1.2, "#77776F");
    return { haut: [0, -34] };
  };
  D.niveau.essais = [{ bulle: 0 }, { bulle: 1 }];

  /* ───────── D.carton — la boîte du graveur : carton ouvert, papier de soie, étiquette « Schilder · Stempel » ─────────
   * o = { partie: "tout" | "boite" | "rabat" } : le rabat (nœud séparé, m.sway 1,5°) pivote autour de (−100, −90). 200 × 90 · ancrage = centre du bas. */
  D.carton = (g, o) => {
    o = Object.assign({ partie: "tout", seed: 915 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    const rabat = () => { U.shape(C, "rab", "M-100 -90 L-138 -124 L-52 -134 L-14 -92 Z", MAT.light, { sw: 2.6 }); ln(g, "M-120 -112 L-50 -120", 1.2, "#BDBDB6"); };
    if (o.partie === "rabat") { rabat(); return { pivot: [-100, -90] }; }
    ombre(g, rr(-100, -90, 200, 90, 4), 6, 6);
    // rabat du fond et papier de soie qui dépasse
    U.shape(C, "fond", "M-92 -90 L-80 -112 L84 -112 L96 -90 Z", MAT.light, { sw: 2.4 });
    U.shape(C, "soie", "M-70 -88 C-62 -118 -44 -98 -34 -122 C-22 -100 -4 -126 8 -104 C20 -124 40 -100 52 -118 C60 -104 70 -100 74 -88 Z", MAT.white, { sw: 2.2, r: 0.7 });
    ln(g, "M-34 -122 L-30 -96 M8 -104 L4 -90 M52 -118 L50 -94", 1.2, GRIB);
    U.shape(C, "boite", rr(-100, -90, 200, 90, 4), MAT.wood, { sw: 3 });
    ln(g, "M-100 -74 L100 -74", 1.4, "#ABABA4");
    // ruban adhésif + étiquette (deux noms communs, pas une enseigne)
    el("rect", { x: -9, y: -90, width: 18, height: 22, fill: "#DADAD5", stroke: "#8A8A84", "stroke-width": 1.2 }, g);
    el("path", { d: rr(-82, -58, 164, 36, 4), fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g);
    txt(g, "Schilder · Stempel", 0, -33, 18, {});
    U.shape(C, "rabD", "M100 -90 L132 -70 L128 -42 L100 -60 Z", MAT.light, { sw: 2.4 });
    if (o.partie !== "boite") rabat();
    return { pivot: [-100, -90] };
  };
  D.carton.essais = [{}, { partie: "rabat" }];

  /* ───────── D.visCouchee — une vis de rechange couchée (corniche de S1 ; les cinq vis qui sautent en S10) ─────────
   * o = { long: 24 } · ancrage = milieu, posée sur y = 0. Elle sautille aux chocs (translation, petite rotation). */
  D.visCouchee = (g, o) => {
    o = Object.assign({ long: 24 }, o);
    const L = o.long;
    el("ellipse", { cx: 2, cy: 1, rx: f(L / 2 + 5), ry: 2.6, fill: "rgba(28,26,28,.2)" }, g);
    el("path", { d: `M${f(-L / 2 + 5)} -8 L${f(L / 2)} -6.4 L${f(L / 2 + 5)} -5 L${f(L / 2)} -3.6 L${f(-L / 2 + 5)} -2 Z`, fill: ACIER, stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, g);
    let d = ""; for (let x = -L / 2 + 9; x < L / 2 - 1; x += 4) d += `M${f(x)} -7.6 L${f(x + 2)} -2.6`;
    ln(g, d, 1.1, "#77776F");
    el("path", { d: rr(-L / 2 - 2, -11, 7, 12, 2.5), fill: ACIER, stroke: INK, "stroke-width": 1.6 }, g);
    return { long: L };
  };
  D.visCouchee.essais = [{}];

  /* ───────── D.papillon — papillon de nuit qui tourne autour de la lanterne gauche (S1) ─────────
   * o = { aile: 0…1 (battement) } · 26 px · ancrage = centre. Gris, jamais jaune. */
  D.papillon = (g, o) => {
    o = Object.assign({ aile: 0.3 }, o);
    const k = lerp(1, 0.35, clamp(o.aile, 0, 1));
    [-1, 1].forEach((s) => {
      el("path", { d: `M0 -2 C${f(s * 6 * k)} -14 ${f(s * 15 * k)} -12 ${f(s * 13 * k)} -2 C${f(s * 12 * k)} 4 ${f(s * 5 * k)} 6 0 3 Z`, fill: "#E6E6E1", stroke: "#55524B", "stroke-width": 1.4, "stroke-linejoin": "round" }, g);
      el("circle", { cx: f(s * 8 * k), cy: -5, r: 1.6, fill: "#9A9A94" }, g);
    });
    el("ellipse", { cx: 0, cy: 0, rx: 2.2, ry: 6, fill: "#55524B" }, g);
    ln(g, "M-1 -6 L-4 -11 M1 -6 L4 -11", 1, "#55524B");
    return {};
  };
  D.papillon.essais = [{ aile: 0 }, { aile: 1 }];

  /* ───────── D.tournevis — le tournevis seul (200 px), pour sa chute (S1) ─────────
   * Dessiné debout, lame vers le HAUT (comme dans la main) · ancrage = milieu. Dans D.main, son milieu est à (0, −72) de la paume. */
  const tournevisDessin = (g, C, yBout) => {      // yBout = y du bout du manche ; la lame monte jusqu'à yBout − 200
    U.shape(C, "tvm", `M-13 ${yBout - 4} C-16 ${yBout - 30} -16 ${yBout - 62} -11 ${yBout - 88} L11 ${yBout - 88} C16 ${yBout - 62} 16 ${yBout - 30} 13 ${yBout - 4} C8 ${yBout + 2} -8 ${yBout + 2} -13 ${yBout - 4} Z`, MAT.mid, { sw: 2.6, r: 0.6 });
    ln(g, `M-6 ${yBout - 14} L-6 ${yBout - 76} M0 ${yBout - 10} L0 ${yBout - 80} M6 ${yBout - 14} L6 ${yBout - 76}`, 1.4, "#55524B");
    el("path", { d: rr(-8, yBout - 98, 16, 11, 3), fill: ACIER, stroke: INK, "stroke-width": 2 }, g);
    el("path", { d: `M-3.5 ${yBout - 98} L3.5 ${yBout - 98} L3.5 ${yBout - 186} L6 ${yBout - 194} L5 ${yBout - 200} L-5 ${yBout - 200} L-6 ${yBout - 194} L-3.5 ${yBout - 186} Z`, fill: ACIER, stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, g);
    ln(g, `M-1 ${yBout - 104} L-1 ${yBout - 184}`, 1.1, "#FFFFFF");
  };
  D.tournevis = (g, o) => {
    o = Object.assign({ seed: 917 }, o);
    el("path", { d: rr(-13, -100, 26, 200, 10), fill: "rgba(28,26,28,.13)", transform: "translate(7 8)" }, g);
    tournevisDessin(g, U.ctx(g, o.seed, false, 1), 100);
    return { pointe: [0, -100], bout: [0, 100] };
  };

  /* ───────── D.main — avant-bras + moufle vus de face, qui ENTRENT PAR LE BAS du cadre (jamais de doigts) ─────────
   * o = { manche: "veste" | "chemise", tient: "tournevis" | "tampon" | "stylo" | null, a: angle de l'avant-bras (0 = vertical ;
   *       a > 0 : la main penche à droite, la manche part vers le bas-GAUCHE), L: 460 (longueur de manche : elle sort toujours du cadre),
   *       serre: 0 (poing fermé) … 1 (main ouverte), pouce: −1 (à gauche) | 1 (à droite) = le côté du corps }
   * Ancrage = centre de la paume. Moufle 64 × 78, manche 70 de large.
   * Renvoie (repère du nœud, rotation comprise) { pointe: bout de l'outil — tournevis (0, −172), stylo, ou face du cachet (0, +130) —, bas: bout de la manche }.
   * « tournevis » et « stylo » sont dessinés dans le poing ; « tampon » ne dessine QUE la main fermée : le cachet est D.tampon, posé DESSOUS. */
  D.main = (g, o) => {
    o = Object.assign({ manche: "veste", tient: null, a: 0, L: 460, serre: 0, pouce: -1, seed: 921 }, o);
    const b = el("g", { transform: `rotate(${f(o.a)})` }, g), C = U.ctx(b, o.seed, false, 1), pc = o.pouce < 0 ? -1 : 1, ouv = clamp(o.serre, 0, 1), y0 = 40, L = o.L;
    const haut = lerp(-38, -50, ouv);
    const moufle = `M-32 4 C-34 ${f(haut + 16)} -24 ${haut} 0 ${haut} C24 ${haut} 34 ${f(haut + 16)} 32 4 C32 24 22 34 0 34 C-22 34 -32 24 -32 4 Z`;
    const px = lerp(40, 50, ouv), py = lerp(-18, -26, ouv);
    const pouce = `M${pc * 24} 22 C${pc * (px + 4)} 22 ${pc * (px + 8)} ${f(py + 14)} ${pc * px} ${py} C${pc * (px - 6)} ${f(py - 8)} ${pc * (px - 16)} ${f(py - 2)} ${pc * 22} -2 Z`;
    // ombre portée
    el("path", { d: `M-35 ${y0} L35 ${y0} L39 ${y0 + L} L-39 ${y0 + L} Z ${moufle}`, fill: "rgba(28,26,28,.13)", transform: "translate(9 9)" }, b);
    // manche
    if (o.manche === "chemise") {
      U.shape(C, "man", `M-34 ${y0 + 22} L34 ${y0 + 22} L38 ${y0 + L} L-38 ${y0 + L} Z`, MAT.white, { sw: 3 });
      ln(b, `M${-pc * 12} ${y0 + 60} L${-pc * 15} ${y0 + L - 10}`, 1.3, GRIB);
      U.shape(C, "poig", rr(-37, y0 - 4, 74, 32, 7), MAT.light, { sw: 3 });
      el("circle", { cx: -pc * 22, cy: y0 + 12, r: 4, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, b);
    } else {
      el("path", { d: rr(-31, y0 - 8, 62, 22, 6), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, b);      // poignet de chemise qui dépasse
      U.shape(C, "man", `M-35 ${y0 + 6} L35 ${y0 + 6} L39 ${y0 + L} L-39 ${y0 + L} Z`, MAT.light, { sw: 3 });
      ln(b, `M-35 ${y0 + 34} L35 ${y0 + 34}`, 1.5, "#8A8A84");
      ln(b, `M${-pc * 14} ${y0 + 34} L${-pc * 17} ${y0 + L - 10}`, 1.4, "#ABABA4");
      [16, 27].forEach((dy) => el("circle", { cx: -pc * 25, cy: y0 + dy - 2, r: 3.4, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.5 }, b));
    }
    // poignet (peau)
    el("path", { d: rr(-21, 20, 42, 26, 8), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.6 }, b);
    let pointe = [0, lerp(-38, -50, ouv)];
    if (o.tient === "tournevis") { tournevisDessin(b, C, 28); pointe = [0, -172]; }
    if (o.tient === "tampon") pointe = [0, 130];
    // pouce (derrière la moufle : seul son bout dépasse), puis la moufle
    if (o.tient !== "stylo") U.shape(C, "pouce", pouce, MAT.white, { sw: 3, r: 0.6 });
    U.shape(C, "moufle", moufle, MAT.white, { sw: 3, r: 0.6 });
    if (ouv < 0.6) ln(b, `M-23 ${f(haut + 24)} C-10 ${f(haut + 16)} 10 ${f(haut + 16)} 23 ${f(haut + 24)}`, 1.8, "#77776F");          // pli du poing fermé
    ln(b, `M-20 26 C-8 30 8 30 20 26`, 1.4, GRIB);
    if (o.tient === "stylo") {       // le stylo passe SUR la moufle, tenu par le pouce ; sa pointe dépasse en haut, du côté du pouce
      const t0 = [pc * 32, -76], t1 = [-pc * 30, 26], dx = t1[0] - t0[0], dy = t1[1] - t0[1], n = Math.hypot(dx, dy), ux = dx / n, uy = dy / n, nx = -uy * 4.6, ny = ux * 4.6;
      const P = (k, sgn) => `${f(t0[0] + ux * k + sgn * nx)} ${f(t0[1] + uy * k + sgn * ny)}`;
      el("path", { d: `M${P(14, 1)} L${P(n, 1)} L${P(n, -1)} L${P(14, -1)} Z`, fill: "#4A4A46", stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, b);
      el("path", { d: `M${f(t0[0])} ${f(t0[1])} L${P(14, 1)} L${P(14, -1)} Z`, fill: ACIER, stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" }, b);
      ln(b, `M${P(30, 0.4)} L${P(n - 8, 0.4)}`, 1.2, "#9A9A94");
      U.shape(C, "pouce", pouce, MAT.white, { sw: 3, r: 0.6 });
      pointe = t0;
    }
    return { pointe: rot(pointe, o.a), bas: rot([0, y0 + L], o.a) };
  };
  D.main.essais = [
    { manche: "veste", tient: "tournevis", a: 8 },                  // S1 : elle visse
    { manche: "veste", tient: null, a: 8, serre: 1 },               // S1 : elle lâche tout
    { manche: "veste", tient: "tampon", a: 0 },                     // S7, S26 : elle tient le cachet par son col (D.tampon dessous)
    { manche: "chemise", tient: "stylo", a: 20 },                   // S13 : la main qui signe
    { manche: "veste", tient: "stylo", a: -6, pouce: -1 },          // S27 : elle écrit la question
  ];

  /* ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
   * LE CADRE DE L'INTRO (S4) — la porte d'entrée de l'auteur, le porte-étiquette, la platine d'interphone
   * ═════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

  /* ───────── D.porteIntro — porte d'entrée vue de face, hublot rond cerclé d'un ANNEAU DE LAITON ─────────
   * o = { reflet: angle (degrés) de l'éclat blanc sur l'anneau, mur: true (mur de façade uni des deux côtés + seuil),
   *       partie: "tout" | "porte" (sans l'éclat) | "eclat" (l'éclat seul, dessiné à 0° : faire tourner le nœud autour de l'ancrage, 20°/s) }
   * Ancrage = centre du hublot. Vantail x −300…+300, y −220…+880 ; ouverture r 132, anneau r 132 → 152 (8 boulons).
   * Le champ central (x ±262, y −192…+680) est UNI : la photo, la plaque, le porte-étiquette, les pastilles et la platine s'y posent.
   * Béquille en (+260, +370), fente à courrier en (0, +770), paillasson sous +888. Aucun texte. */
  D.porteIntro = (g, o) => {
    o = Object.assign({ reflet: 215, mur: true, partie: "tout", seed: 931 }, o);
    const eclat = (gg, a) => {
      const arc = (r, a0, a1, w, op) => ln(gg, `M${f(Math.cos(rad(a0)) * r)} ${f(Math.sin(rad(a0)) * r)} A${r} ${r} 0 0 1 ${f(Math.cos(rad(a1)) * r)} ${f(Math.sin(rad(a1)) * r)}`, w, "#FFFFFF", { opacity: op });
      arc(143, a - 20, a + 20, 7, 0.9); arc(143, a + 27, a + 33, 5, 0.7);
    };
    if (o.partie === "eclat") { eclat(g, 0); return {}; }
    const C = U.ctx(g, o.seed, false, 1);
    if (o.mur) {
      el("rect", { x: -500, y: -270, width: 1000, height: 1150, fill: "#F1EFE8" }, g);
      ln(g, "M-470 -60 l34 0 M-420 250 l-30 0 M-455 520 l40 0 M440 -110 l-36 0 M400 180 l44 0 M452 470 l-30 0", 1.6, "#D5D2C7");
      el("rect", { x: -500, y: 790, width: 1000, height: 90, fill: "#E4E2DA" }, g);
      ln(g, "M-500 790 L-318 790 M318 790 L500 790", 2.2, "#B9B6AA");
      el("rect", { x: -500, y: 880, width: 1000, height: 70, fill: "#DEDCD3" }, g);
      ln(g, "M-500 915 L500 915 M-380 880 L-400 950 M-150 915 L-160 950 M150 915 L160 950 M380 880 L400 950", 1.4, "#B9B6AA");
      el("rect", { x: -500, y: 940, width: 1000, height: 10, fill: PAPIER, opacity: 0.55 }, g);
    }
    // dormant (18 px) et vantail
    ombre(g, rr(-318, -238, 636, 1118, 6), 8, 0, "rgba(28,26,28,.12)");
    U.shape(C, "dorm", rr(-318, -238, 636, 1118, 6), MAT.light, { sw: 3 });
    U.shape(C, "vant", rr(-300, -220, 600, 1100, 4), MAT.wood, { sw: 3 });
    // champ central UNI + moulure
    el("rect", { x: -262, y: -192, width: 524, height: 872, fill: "#EFEDE6" }, g);
    ln(g, rr(-262, -192, 524, 872, 3), 2, INK);
    ln(g, rr(-254, -184, 508, 856, 2), 1.2, "#B9B6AA");
    // paumelles
    [-110, 310, 730].forEach((y) => { el("path", { d: rr(-314, y, 16, 46, 4), fill: ACIER, stroke: INK, "stroke-width": 2 }, g); ln(g, `M-314 ${y + 23} L-298 ${y + 23}`, 1.4, INK); });
    // deux panneaux moulurés en bas, de part et d'autre de la fente à courrier
    [-1, 1].forEach((s) => {
      U.shape(C, "pan" + s, rr(s < 0 ? -272 : 128, 712, 144, 128, 4), MAT.light, { sw: 2.4 });
      ln(g, rr(s < 0 ? -262 : 138, 722, 124, 108, 3), 1.3, "#ABABA4");
    });
    ombre(g, rr(-100, 754, 200, 32, 7), 4, 5);
    el("path", { d: rr(-100, 754, 200, 32, 7), fill: ACIER, stroke: INK, "stroke-width": 2.6 }, g);
    el("path", { d: rr(-80, 765, 160, 10, 4), fill: "#3A3A37" }, g);
    ln(g, "M-80 765 L80 765", 1.2, "#FFFFFF");
    visTete(g, -90, 770, 3.2, 20, { ombre: false }); visTete(g, 90, 770, 3.2, -40, { ombre: false });
    // plinthe de laiton ? non : bas de porte en acier (le jaune reste à l'anneau)
    el("path", { d: rr(-292, 852, 584, 22, 3), fill: ACIER, stroke: INK, "stroke-width": 2 }, g);
    ln(g, "M-284 858 L284 858", 1.1, "#FFFFFF");
    // béquille à droite + serrure
    ombre(g, rr(244, 316, 32, 126, 12), 4, 5);
    el("path", { d: rr(244, 316, 32, 126, 12), fill: ACIER, stroke: INK, "stroke-width": 2.6 }, g);
    el("path", { d: rr(204, 362, 64, 16, 8), fill: ACIER, stroke: INK, "stroke-width": 2.6 }, g);
    el("circle", { cx: 260, cy: 370, r: 11, fill: ACIER, stroke: INK, "stroke-width": 2.4 }, g);
    ln(g, "M212 366 L250 366", 1.2, "#FFFFFF");
    el("circle", { cx: 260, cy: 414, r: 5, fill: "#3A3A37" }, g); el("path", { d: "M257 416 L263 416 L265 430 L255 430 Z", fill: "#3A3A37" }, g);
    // hublot : verre, puis l'anneau de laiton (r 132 → 152) et ses 8 boulons
    el("circle", { cx: 7, cy: 9, r: 152, fill: OMBRE }, g);
    el("circle", { cx: 0, cy: 0, r: 133, fill: "#EEF3F4" }, g);
    ln(g, "M-78 -46 L-22 -102 M-58 6 L28 -80", 5, "#FFFFFF", { opacity: 0.8 });
    const anneau = cercle(0, 0, 152) + " " + `M-132 0 A132 132 0 1 0 132 0 A132 132 0 1 0 -132 0 Z`;
    el("path", { d: anneau, fill: YEL }, g);
    g.appendChild(C.rc.path(anneau, { roughness: 0.6, stroke: "none", fill: "#E3AE2C", fillStyle: "hachure", hachureGap: 5, fillWeight: 1.3, hachureAngle: -41, seed: 9310 }));
    el("circle", { cx: 0, cy: 0, r: 152, fill: "none", stroke: INK, "stroke-width": 4 }, g);
    el("circle", { cx: 0, cy: 0, r: 132, fill: "none", stroke: INK, "stroke-width": 5.5 }, g);
    for (let i = 0; i < 8; i++) { const a = rad(22.5 + i * 45); visTete(g, Math.cos(a) * 142, Math.sin(a) * 142, 5, i * 37, { ombre: false }); }
    if (o.partie !== "porte") eclat(g, o.reflet);
    // seuil et paillasson
    ln(g, "M-336 880 L336 880", 4, INK);
    ombre(g, rr(-210, 888, 420, 44, 8), 5, 5);
    U.shape(C, "pail", rr(-210, 888, 420, 44, 8), MAT.mid, { sw: 2.6 });
    ln(g, "M-196 902 L196 902 M-196 918 L196 918", 1.2, "#55524B", { "stroke-dasharray": "3 6" });
    return { hublot: 132, anneau: 152, champ: { x: -262, y: -192, w: 524, h: 872 }, bequille: [260, 370] };
  };
  D.porteIntro.essais = [{}, { partie: "eclat" }];

  /* ───────── D.porteEtiquette — porte-étiquette d'acier (la sonnette « @dr.aguilo », S4) ─────────
   * o = { w: 360, h: 66, partie: "tout" | "cadre" (l'acier) | "papier" (l'étiquette blanche, à révéler avec le texte) } · ancrage = centre.
   * Le glyphe Instagram et « @dr.aguilo » sont des nœuds de la scène (socle), posés sur le papier. */
  D.porteEtiquette = (g, o) => {
    o = Object.assign({ w: 360, h: 66, partie: "tout", seed: 935 }, o);
    const w = o.w, h = o.h;
    if (o.partie !== "papier") {
      ombre(g, rr(-w / 2, -h / 2, w, h, 10), 5, 6);
      el("path", { d: rr(-w / 2, -h / 2, w, h, 10), fill: ACIER, stroke: INK, "stroke-width": 2.8 }, g);
      ln(g, `M${-w / 2 + 10} ${-h / 2 + 5} L${w / 2 - 10} ${-h / 2 + 5}`, 1.2, "#FFFFFF");
      el("path", { d: rr(-w / 2 + 14, -h / 2 + 8, w - 28, h - 16, 5), fill: "#C9C9C1", stroke: INK, "stroke-width": 1.8 }, g);
      [-1, 1].forEach((s) => el("circle", { cx: s * (w / 2 - 7), cy: 0, r: 2.6, fill: "#77776F" }, g));
    }
    if (o.partie !== "cadre") {
      el("path", { d: rr(-w / 2 + 16, -h / 2 + 10, w - 32, h - 20, 4), fill: "#FFFFFF", stroke: "#8A8A84", "stroke-width": 1.2 }, g);
    }
    return { papier: { x: -w / 2 + 16, y: -h / 2 + 10, w: w - 32, h: h - 20 } };
  };

  /* ───────── D.interphone — platine d'interphone en acier : elle encadre le cœur « j'aime » et le bouton « s'abonner » du socle ─────────
   * o = { w: 560, h: 150 } · ancrage = centre. Deux champs clairs et UNIS : gauche (cœur en (−160, −10), mot « j'aime » en (−160, +57)),
   * droite (bouton 300 × 84 centré en (+110, −5)). Renvoie { coeur, mot, bouton }. */
  D.interphone = (g, o) => {
    o = Object.assign({ w: 560, h: 150, seed: 937 }, o);
    const w = o.w, h = o.h, C = U.ctx(g, o.seed, false, 1);
    ombre(g, rr(-w / 2, -h / 2, w, h, 16), 7, 9);
    U.shape(C, "plat", rr(-w / 2, -h / 2, w, h, 16), MAT.grey, { sw: 3 });
    el("path", { d: rr(-w / 2 + 22, -h / 2 + 12, 196, h - 20, 12), fill: "#F0F0EB", stroke: INK, "stroke-width": 2 }, g);
    el("path", { d: rr(-w / 2 + 230, -h / 2 + 14, w - 252, h - 28, 12), fill: "#F0F0EB", stroke: INK, "stroke-width": 2 }, g);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy], i) => visTete(g, sx * (w / 2 - 11), sy * (h / 2 - 11), 4, 25 + i * 50, { ombre: false }));
    // grille du haut-parleur (entre les deux champs) : trois petites fentes
    ln(g, `M${-w / 2 + 224} ${-22} l0 44`, 1.4, "#8A8A84", { "stroke-dasharray": "2 5" });
    return { coeur: [-160, -10], mot: [-160, 57], bouton: [110, -5] };
  };

  /* ───────── D.mur — pièce de face générique : mur uni, plinthe, sol en perspective (coordonnées MONDE : poser en (0, 0)) ─────────
   * o = { sol: 1385 (ligne du SOL : les personnages et les meubles s'y posent ; la plinthe est juste au-dessus, de sol − 30 à sol),
   *       motif: "uni" | "rayures" (bandes verticales #EDEDE8 tous les 60 px) | "carreaux" (carreau: [w, h], brique: true = appareil décalé),
   *       lambris: 0 (rien) ou y du haut d'un soubassement en planches (ex. 1180), nu: [x0, y0, x1, y1] zone laissée SANS motif (pastille du haut),
   *       x0: 40, x1: 1040, haut: 250, bas: 1470 }
   * Renvoie { sol, plinthe: [y0, y1] }. */
  D.mur = (g, o) => {
    o = Object.assign({ sol: 1385, motif: "uni", lambris: 0, nu: null, carreau: [80, 80], brique: false, x0: 40, x1: 1040, haut: 250, bas: 1470, plinthe: 30, seed: 941 }, o);
    const x0 = o.x0, x1 = o.x1, sol = o.sol, yp = sol - o.plinthe, mur = "#F4F3EE", nu = o.nu;
    el("rect", { x: x0, y: o.haut, width: x1 - x0, height: yp - o.haut, fill: mur }, g);
    if (o.motif === "rayures") {
      for (let x = x0 + 30; x < x1; x += 60) el("rect", { x, y: o.haut, width: Math.min(30, x1 - x), height: yp - o.haut, fill: "#EDEDE8" }, g);
    } else if (o.motif === "carreaux") {
      const cw = o.brique ? 120 : o.carreau[0], ch = o.brique ? 46 : o.carreau[1]; let d = "";
      for (let r = 0, y = yp; y > o.haut; r++, y -= ch) {
        d += `M${x0} ${f(y)} L${x1} ${f(y)}`;
        for (let x = x0 + (o.brique && r % 2 ? cw / 2 : cw); x < x1; x += cw) d += `M${f(x)} ${f(y)} L${f(x)} ${f(Math.max(o.haut, y - ch))}`;
      }
      ln(g, d, 1.5, "#DCDAD2");
    }
    if (nu && o.motif !== "uni") el("rect", { x: nu[0], y: nu[1], width: nu[2] - nu[0], height: nu[3] - nu[1], fill: mur }, g);
    // soubassement en planches
    if (o.lambris) {
      const yl = o.lambris > 400 ? o.lambris : sol - o.lambris;
      el("rect", { x: x0, y: yl, width: x1 - x0, height: yp - yl, fill: "#E9E9E3" }, g);
      let d = ""; for (let x = x0 + 70; x < x1; x += 70) d += `M${x} ${yl + 10} L${x} ${yp}`;
      ln(g, d, 1.4, "#ABABA4");
      el("rect", { x: x0, y: yl - 6, width: x1 - x0, height: 16, fill: "#F0F0EB", stroke: "#8A8A84", "stroke-width": 1.6 }, g);
    }
    // plinthe
    el("rect", { x: x0, y: yp, width: x1 - x0, height: o.plinthe, fill: "#E4E2DA" }, g);
    ln(g, `M${x0} ${yp} L${x1} ${yp}`, 1.8, "#A9A69B");
    ln(g, `M${x0} ${yp + 8} L${x1} ${yp + 8}`, 1, "#C9C6BC");
    // sol en perspective
    el("rect", { x: x0, y: sol, width: x1 - x0, height: o.bas - sol, fill: "#E6E4DC" }, g);
    const cx = (x0 + x1) / 2, H = o.bas - sol; let d = "";
    for (let i = -9; i <= 9; i++) d += `M${f(cx + i * 62)} ${sol} L${f(cx + i * 62 * (1 + H / 260))} ${o.bas}`;
    [0.34, 0.7].forEach((t) => { d += `M${x0} ${f(sol + H * t)} L${x1} ${f(sol + H * t)}`; });
    ln(g, d, 1.3, "#C9C6BC");
    ln(g, `M${x0} ${sol} L${x1} ${sol}`, 3, INK);
    el("rect", { x: x0, y: o.bas - 10, width: x1 - x0, height: 10, fill: PAPIER, opacity: 0.6 }, g);
    return { sol, plinthe: [yp, sol] };
  };
  D.mur.essais = [{ sol: 1385 }, { sol: 1375, motif: "rayures" }, { sol: 1390, motif: "carreaux", nu: [235, 380, 845, 535] }, { sol: 1390, motif: "carreaux", brique: true, lambris: 1180 }];

  /*@@SUITE@@*/
})();
