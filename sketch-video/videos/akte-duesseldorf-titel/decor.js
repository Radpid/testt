/* decor.js — AKTE 08 « جوج حروف » (Düsseldorf) — décors et objets PROPRES à l'épisode, 1re partie.
 * Aucun dessin n'est repris d'un autre épisode. Suite dans decor-2.js et decor-3.js. Référence : storyboard.md § 2 et § 3.
 * Essai de chaque dessin, seul, sur une planche : node tools/essai_decor.mjs videos/akte-duesseldorf-titel [--only nom1,nom2]
 *   D.nom.essais = [{ … }, { … }] : jeux de paramètres montrés sur la planche.
 *
 * ÉTAT DE L'INVENTAIRE (storyboard § 2 : 76 fonctions — 68 faites, 8 à faire) ──────────────────────────────────────────
 * A. Laiton, lettres, étiquettes, tampons (objets signature)
 *   D.plaque        fait (decor.js)      D.lettre        fait (decor.js)      D.etiquette     fait (decor.js)
 *   D.empreinte     fait (decor.js)      D.tampon        fait (decor.js)      D.barre         fait (decor.js)
 *   D.silhouette    fait (decor.js)      D.eclats        fait (decor.js)
 *   D.plaquette     fait (decor.js)      D.reglette      fait (decor.js)                       (HUD, § 3)
 * B. Façade (S1), porte de l'intro (S4), porte du bureau (S29)
 *   D.facade        fait (decor.js)      D.lanterne      fait (decor.js)      D.niveau        fait (decor.js)
 *   D.carton        fait (decor.js)      D.main          fait (decor.js)      D.tournevis     fait (decor.js)
 *   D.porteIntro    fait (decor.js)      D.interphone    fait (decor.js)      D.mur           fait (decor.js)
 *   D.porteBureau   à faire (S29)        D.corbeille     à faire (S29)
 * C. Cartes
 *   D.rollkarte     fait (decor.js)      D.amtsgericht   fait (decor.js)      D.globe         fait (decor.js)
 *   D.arc           fait (decor.js)      D.tube          fait (decor.js)
 * D. Diplômes et explication en image
 *   D.cimaise       fait (decor.js)      D.cadre         fait (decor.js)      D.diplome       fait (decor.js)
 *   D.valise        fait (decor.js)      D.pochette      fait (decor.js)
 *   D.livre         fait (decor-2.js)    D.table         fait (decor-2.js)    D.fenetreArc    fait (decor-2.js)
 *   D.nuage         fait (decor-2.js)    D.lampeTable    fait (decor-2.js)    D.ecran         fait (decor-2.js)
 *   D.planche       fait (decor-2.js)    D.socle         à faire (S24)
 * E. Atelier du graveur
 *   D.atelier       fait (decor.js)      D.etau          fait (decor.js)      D.casse         fait (decor.js)
 *   D.bloc          fait (decor.js)      D.encreur       fait (decor.js)      D.cartes        fait (decor.js)
 *   D.loupe         fait (decor.js)      D.fiche         fait (decor-2.js : fiche, pilule et bio — S14, S15, S26)
 * F. L'affaire (S12 à S23) — tout fait, dans decor-2.js
 *   D.patere        fait (decor-2.js)    D.blouse        fait (decor-2.js)    D.stetho        fait (decor-2.js)
 *   D.sabots        fait (decor-2.js)    D.badge         fait (decor-2.js)    D.boite         fait (decor-2.js : A et B)
 *   D.enveloppe     fait (decor-2.js)    D.brief         fait (decor-2.js)    D.navigateur    fait (decor-2.js)
 *   D.poste         fait (decor-2.js)    D.dateur        fait (decor-2.js)    D.bac           fait (decor-2.js)
 *   D.strafbefehl   fait (decor-2.js)    D.salleFace     fait (decor-2.js)    D.banc          fait (decor-2.js)
 *   D.tableProc     fait (decor-2.js)    D.bureauGreffe  fait (decor-2.js)    D.tableDefense  fait (decor-2.js)
 *   D.platzschild   fait (decor-2.js)    D.rebord        fait (decor-2.js)    D.feuille       fait (decor-2.js : aussi S19, S27)
 *   D.chariot       fait (decor-2.js)    D.ordner        fait (decor-2.js)    D.chemise       fait (decor-2.js)
 * G. La règle (S24 à S29) — tout à faire (decor-3.js)
 *   D.potence       à faire              D.chaine        à faire              D.different     à faire
 *   D.loi           à faire              D.fleche        à faire
 * HORS INVENTAIRE, ajoutés parce que les scènes S1 à S7 en ont besoin (tous « fait (decor.js) ») :
 *   D.motDr (les trois lettres posées, version statique de l'aide motDr) · D.bandeReflet et D.etincelle (reflets du laiton
 *   sortis de D.plaque : risque 16) · D.visCouchee (vis de rechange, S1) · D.papillon (S1) · D.medaillon (S5, S11) ·
 *   D.porteEtiquette (S4) · D.clou (S2 : le médaillon y pend) · D.suspension et D.cartons (S6) · D.outil et D.bon (outils et
 *   bons de l'atelier, nœuds séparés : places dans out.outils / out.bons de D.atelier).
 *   D.silhouette a une option fil (cordon qui pend au clou de S2, au rail de S3).
 * HORS INVENTAIRE, pour S8 à S23 (« fait (decor-2.js) ») : D.lierre (lierre sur treillage de S13, S16 : le storyboard le
 *   demande dans la scène, pas dans l'inventaire) · D.dossier (le dossier qui tombe sur le banc en S19 ; ouvert : celui de STA).
 *   D.exemple = dessin du gabarit, encore utilisé par les scènes d'exemple de scenes-1.js : À SUPPRIMER avec elles.
 *   D.util (objet, pas une fonction) = aides partagées avec decor-2.js / decor-3.js (matières, gribouillis, vis, ombre…).
 *   ORDRE DE CHARGEMENT : index.html charge decor.js, puis decor-2.js, puis decor-3.js ; tools/essai_decor.mjs les charge par
 *   ordre alphabétique (decor-2.js d'abord) : decor-2.js / decor-3.js commencent donc par « if (D.util) init(); else
 *   (D._apres = D._apres || []).push(init); » et decor.js lance D._apres à sa fin.
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
      // œillet (plus petit sur une petite étiquette : il laisse la place au texte)
      const rO = clamp(h * 0.2, 6, 15);
      el("circle", { cx: 0, cy: L, r: f(rO), fill: mix(ACIER, "#D6D6D1", gz), stroke: enc, "stroke-width": 1.8 }, b);
      el("circle", { cx: 0, cy: L, r: f(rO * 0.6), fill: "#FFFFFF", stroke: enc, "stroke-width": f(Math.min(2.5, rO * 0.17)) }, b);
      // textes : empilés et centrés dans la zone utile (sous l'œillet)
      const ls = [];
      if (o.l1) ls.push({ t: o.l1, s: o.s1, asc: 0.72, y: o.y1 });
      if (o.l2) ls.push({ t: o.l2, s: o.s2, asc: 0.72, y: o.y2 });
      if (o.ar) ls.push({ t: o.ar, s: o.sAr, asc: 0.8, ar: true, y: o.yAr });
      // textes trop grands pour l'étiquette (petit format, ex. 250 × 84 de S18) : réduits à la largeur, puis à la hauteur utile
      ls.forEach((l) => { if (!l.ar) l.s = Math.min(l.s, (w - Math.min(30, w * 0.18)) / Math.max(1, String(l.t).length * 0.5)); });
      const gap = (i) => (i ? ls[i].s * 0.3 + 4 : 0), somme = () => ls.reduce((a, l, i) => a + gap(i) + l.s * l.asc, 0), zone0 = top + 16 + rO, zone1 = top + h - Math.min(13, h * 0.15);
      let tot = somme(); const kz = (zone1 - zone0) / tot;
      if (kz < 1) { ls.forEach((l) => { l.s = f(l.s * kz); }); tot = somme(); }
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
   * o = { r: 56, cadre: "rond" | "aucun", fil: 0 } · ancrage = centre du médaillon. Ni yeux, ni bouche, ni cheveux, ni lunettes, ni barbe.
   * fil > 0 : un piton en haut du médaillon et un cordon qui monte de fil px (jusqu'au clou de S2, au rail de S3) : il
   * balance AVEC le médaillon (même nœud ; pivot de m.pend = (0, −r − fil)).
   * Renvoie { haut: [0, −r], bas: [0, r], accroche: [0, −r − fil] }. */
  D.silhouette = (g, o) => {
    o = Object.assign({ r: 56, cadre: "rond", fil: 0, seed: 861 }, o);
    const r = o.r, rond = o.cadre !== "aucun", C = U.ctx(g, o.seed, false, clamp(r / 56, 0.5, 1.2));
    if (o.fil > 0 && rond) {
      ln(g, `M${f(-r * 0.16)} ${f(-r + 2)} L0 ${f(-r - o.fil)} L${f(r * 0.16)} ${f(-r + 2)}`, 2.2, "#55524B");
      el("circle", { cx: 0, cy: f(-r - 3), r: 4.5, fill: ACIER, stroke: INK, "stroke-width": 2 }, g);
    }
    const ri = r * 0.955, sx = 0.65 * r, sy = rond ? Math.sqrt(Math.max(0, ri * ri - sx * sx)) : 0.8 * r;
    if (rond) { el("circle", { cx: f(r * 0.1), cy: f(r * 0.14), r: f(r), fill: OMBRE }, g); el("circle", { cx: 0, cy: 0, r: f(r), fill: "#FFFFFF" }, g); }
    // buste : cou + épaules (arc large de 1,3 r, de y 0,2 r jusqu'au bord du médaillon)
    const bas = rond ? `A${f(ri)} ${f(ri)} 0 0 1 ${f(-sx)} ${f(sy)}` : `L${f(-sx)} ${f(sy)}`;
    const buste = `M${f(-sx)} ${f(sy)} C${f(-sx)} ${f(0.42 * r)} ${f(-0.4 * r)} ${f(0.22 * r)} ${f(-0.13 * r)} ${f(0.2 * r)} L${f(-0.12 * r)} ${f(0.04 * r)} L${f(0.12 * r)} ${f(0.04 * r)} L${f(0.13 * r)} ${f(0.2 * r)} C${f(0.4 * r)} ${f(0.22 * r)} ${f(sx)} ${f(0.42 * r)} ${f(sx)} ${f(sy)} ${bas} Z`;
    const rg = r < 40 ? 0.2 : 0.4;
    U.shape(C, "bu", buste, MAT.sil, { sw: 2.4, r: rg });
    U.shape(C, "te", cercle(0, -0.18 * r, 0.3 * r), MAT.sil, { sw: 2.4, r: rg });
    if (rond) el("circle", { cx: 0, cy: 0, r: f(r), fill: "none", stroke: INK, "stroke-width": 3 }, g);
    return { haut: [0, -r], bas: [0, r], accroche: [0, f(-r - (o.fil || 0))] };
  };
  D.silhouette.essais = [{ r: 62, fil: 18 }, { r: 30 }, { r: 22 }, { r: 56, cadre: "aucun" }];

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

  /* ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
   * C. LES CARTES — carte murale (S2), petit tribunal (S2), globe (S5, S11), trajets, tube à diplôme
   * ═════════════════════════════════════════════════════════════════════════════════════════════════════════════ */
  let _uid = 0; const uid = (p) => "ep08" + p + (++_uid);                       // identifiants de clipPath (jamais deux fois le même)
  const cone = (g, x, y, wHaut, wBas, H, op) => el("path", { d: `M${f(x - wHaut)} ${f(y)} L${f(x + wHaut)} ${f(y)} L${f(x + wBas)} ${f(y + H)} L${f(x - wBas)} ${f(y + H)} Z`, fill: HALO, opacity: f(op) }, g);

  /* ───────── D.clou — un clou planté dans le mur ou la carte (S2 : le médaillon y pend par son cordon) ─────────
   * o = { r: 6 } · ancrage = centre de la tête. */
  D.clou = (g, o) => {
    o = Object.assign({ r: 6 }, o);
    const r = o.r;
    el("ellipse", { cx: f(r * 0.8), cy: f(r * 1.2), rx: f(r * 1.2), ry: f(r * 0.7), fill: "rgba(28,26,28,.2)" }, g);
    el("circle", { cx: 0, cy: 0, r, fill: ACIER, stroke: INK, "stroke-width": 2 }, g);
    ln(g, `M${f(-r * 0.55)} ${f(-r * 0.2)} A${f(r * 0.6)} ${f(r * 0.6)} 0 0 1 ${f(r * 0.05)} ${f(-r * 0.62)}`, 1.3, "#FFFFFF");
    return { r };
  };
  D.clou.essais = [{ r: 6 }];

  /* ───────── D.rollkarte — carte murale d'école : grande feuille qui descend d'AU-DESSUS du cadre, baguette de bois en bas ─────────
   * o = { w: 700, h: 1400, partie: "tout" | "feuille" (feuille + baguette, sans les deux coins) | "coin" (un coin seul, côté cote),
   *       cote: −1 (gauche) | 1 (droite), rose: true (petite rose des vents grise en haut à droite),
   *       plis: [y, …] (plis légers ; par défaut placés pour qu'aucun ne passe derrière la pastille du haut, baguette en (540, 1340),
   *       ni à la caméra AXE ni au zoom ×1,25 de S2 : monde y 1100, 870, 690, 340, 90) }
   * Ancrage = centre de la baguette. Feuille x −350…+350, y −1400…−10 (bords à l'encre, plis légers, filet de cadre) ;
   * baguette 724 × 20 (y −10…+10) + deux boutons tournés (jusqu'à x ±386).
   * Les deux coins du bas se soulèvent (triangle replié de 44 px, dos du papier plus gris) : nœuds séparés (partie "coin"),
   * pivot = out.pivot (milieu du pli). L'Allemagne (drawDE du socle), l'épingle, les textes sont des nœuds de story.js.
   * Rien au-dessus de la feuille ne bouge : la feuille entière ne se balance pas (ce qui est posé dessus ne suivrait pas). */
  D.rollkarte = (g, o) => {
    o = Object.assign({ w: 700, h: 1400, partie: "tout", cote: -1, rose: true, plis: [-240, -470, -650, -1000, -1250], seed: 951 }, o);
    const w = o.w, h = o.h, x0 = -w / 2, x1 = w / 2, yT = -h, yB = -10, K = 44;
    const C = U.ctx(g, o.seed, false, 1);
    const coin = (gg, s) => {                         // le coin replié du côté s : pli de A à B, pointe repliée en P
      const cx = s * x1, A = [cx, yB - K], B = [cx - s * K, yB], P = [cx - s * K * 0.9, yB - K * 0.9];
      el("path", { d: `M${A[0]} ${A[1]} L${B[0]} ${B[1]} L${f(P[0] + s * 4)} ${f(P[1] + 6)} Z`, fill: "rgba(28,26,28,.13)" }, gg);
      const d = `M${A[0]} ${A[1]} L${B[0]} ${B[1]} Q${f(cx - s * K * 0.62)} ${f(yB - K * 0.35)} ${f(P[0])} ${f(P[1])} Q${f(cx - s * K * 0.36)} ${f(yB - K * 0.64)} ${A[0]} ${A[1]} Z`;
      U.shape(U.ctx(gg, o.seed + (s < 0 ? 5 : 6), false, 1), "coin", d, { base: "#EAE8DE" }, { sw: 2.2, r: 0.4 });
      ln(gg, `M${f(lerp(A[0], B[0], 0.3))} ${f(lerp(A[1], B[1], 0.3) - 5)} L${f(lerp(A[0], P[0], 0.55))} ${f(lerp(A[1], P[1], 0.55))}`, 1, "#C9C6BC");
      return [f((A[0] + B[0]) / 2), f((A[1] + B[1]) / 2)];
    };
    if (o.partie === "coin") return { pivot: coin(g, o.cote < 0 ? -1 : 1) };
    // la feuille (coins du bas coupés : ils sont repliés vers nous)
    const feuille = `M${x0} ${yT} L${x1} ${yT} L${x1} ${yB - K} L${x1 - K} ${yB} L${x0 + K} ${yB} L${x0} ${yB - K} Z`;
    ombre(g, feuille, 9, 11);
    U.shape(C, "feuille", feuille, { base: "#FBFAF4" }, { sw: 2.5, r: 0.5 });
    // plis légers (la feuille a été roulée) : un trait clair + une bande d'ombre très douce au-dessus
    (o.plis || []).forEach((y) => {
      el("rect", { x: x0 + 3, y: y - 16, width: w - 6, height: 16, fill: "#F2F0E6", opacity: 0.8 }, g);
      ln(g, `M${x0 + 4} ${y} L${x1 - 4} ${y + 1.5}`, 1.6, "#DEDBD0");
    });
    // filet de cadre de la carte
    ln(g, rr(x0 + 24, yT + 24, w - 48, h - 24 - 24 - 16, 2), 1.6, "#9A9A94");
    ln(g, rr(x0 + 31, yT + 31, w - 62, h - 31 - 31 - 16, 2), 1, "#C9C6BC");
    // rose des vents (grise, en haut à droite : monde (802, 600) quand la baguette est en (540, 1340))
    if (o.rose) {
      const rx = 262, ry = yB - 730, R = 30, rs = el("g", { transform: `translate(${rx} ${ry})` }, g);
      el("circle", { cx: 0, cy: 0, r: R, fill: "none", stroke: "#9A9A94", "stroke-width": 1.6 }, rs);
      el("path", { d: "M0 -36 L7 -7 L0 0 Z M0 36 L-7 7 L0 0 Z M36 0 L7 7 L0 0 Z M-36 0 L-7 -7 L0 0 Z", fill: "#9A9A94" }, rs);
      el("path", { d: "M0 -36 L-7 -7 L0 0 Z M0 36 L7 7 L0 0 Z M36 0 L7 -7 L0 0 Z M-36 0 L-7 7 L0 0 Z", fill: "#FFFFFF", stroke: "#77776F", "stroke-width": 1.2, "stroke-linejoin": "round" }, rs);
      el("path", { d: "M0 -36 L7 -7 L36 0 L7 7 L0 36 L-7 7 L-36 0 L-7 -7 Z", fill: "none", stroke: "#77776F", "stroke-width": 1.4, "stroke-linejoin": "round" }, rs);
      txt(rs, "N", 0, -42, 18, { fill: "#77776F" });
    }
    // la baguette (la feuille s'enroule dessus) et ses deux boutons tournés
    el("path", { d: rr(-362, -10, 724, 20, 9), fill: OMBRE, transform: "translate(6 7)" }, g);
    U.shape(C, "bag", rr(-362, -10, 724, 20, 9), MAT.wood, { sw: 2.8 });
    ln(g, "M-350 -4 L350 -4", 1.4, "#FFFFFF");
    ln(g, `M${x0 + K - 4} -10 C${x0 + K} -16 ${x1 - K} -16 ${x1 - K + 4} -10`, 1.4, "#C9C6BC");
    [-1, 1].forEach((s) => {
      el("circle", { cx: s * 384 + 5, cy: 6, r: 14, fill: OMBRE }, g);
      U.shape(C, "col" + s, rr(s < 0 ? -372 : 362, -13, 10, 26, 3), MAT.mid, { sw: 2.2 });
      U.shape(C, "bou" + s, cercle(s * 384, 0, 13), MAT.wood, { sw: 2.6 });
      ln(g, `M${s * 384 - 6} -6 A8 8 0 0 1 ${s * 384 + 2} -9`, 1.4, "#FFFFFF");
    });
    if (o.partie !== "feuille") { coin(g, -1); coin(g, 1); }
    return { coinG: [f(x0 + K / 2), f(yB - K / 2)], coinD: [f(x1 - K / 2), f(yB - K / 2)], feuille: { x: x0, y: yT, w, h: h - 10 } };
  };
  D.rollkarte.essais = [{}, { partie: "coin", cote: -1 }];

  /* ───────── D.amtsgericht — petite façade de tribunal (S2) : 3 marches, 4 pilastres, fronton « § », bandeau « Amtsgericht » ─────────
   * o = { lampe: 0…1 (halo crème de la lampe de la porte : il frémit 0,85–1), partie: "tout" | "halo" (le halo seul, nœud à part) }
   * 210 × 172 · ancrage = centre du bas. Elle pousse du sol (m.build "rise"). Aucun nom de ville sur le bâtiment. */
  D.amtsgericht = (g, o) => {
    o = Object.assign({ lampe: 1, partie: "tout", seed: 955 }, o);
    const halo = (gg) => { el("ellipse", { cx: 0, cy: -84, rx: 30, ry: 22, fill: HALO, opacity: f(0.9 * clamp(o.lampe, 0, 1.2)) }, gg); el("ellipse", { cx: 0, cy: -84, rx: 15, ry: 11, fill: "#FFFFFF", opacity: f(0.8 * clamp(o.lampe, 0, 1.2)) }, gg); };
    if (o.partie === "halo") { halo(g); return { lampe: [0, -84] }; }
    const C = U.ctx(g, o.seed, false, 1);
    ombre(g, "M-105 0 L105 0 L105 -8 L95 -8 L95 -16 L85 -16 L85 -24 L80 -24 L80 -132 L98 -132 L0 -172 L-98 -132 L-80 -132 L-80 -24 L-85 -24 L-85 -16 L-95 -16 L-95 -8 L-105 -8 Z", 7, 8);
    // corps (mur hachuré clair)
    U.shape(C, "corps", "M-80 -24 L80 -24 L80 -112 L-80 -112 Z", MAT.light, { sw: 2.6 });
    // fenêtres (dans les travées extérieures)
    [-1, 1].forEach((s) => {
      const x = s * 48;
      el("path", { d: rr(x - 12, -98, 24, 46, 2), fill: "#EEF3F4", stroke: INK, "stroke-width": 2.2 }, g);
      ln(g, `M${x} -98 L${x} -52 M${x - 12} -76 L${x + 12} -76`, 1.6, INK);
      ln(g, `M${x - 8} -94 L${x - 2} -86`, 1.4, "#FFFFFF");
      el("path", { d: rr(x - 15, -53, 30, 5, 1), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
    });
    // porte cintrée (travée centrale) + sa lampe
    U.shape(C, "porte", "M-14 -24 L-14 -62 C-14 -72 14 -72 14 -62 L14 -24 Z", MAT.dark, { sw: 2.4 });
    ln(g, "M0 -68 L0 -24", 1.4, "#9A9A94");
    el("circle", { cx: 6, cy: -44, r: 1.8, fill: "#FFFFFF" }, g);
    halo(g);
    ln(g, "M0 -96 L0 -90", 1.8, INK);
    el("path", { d: "M-5 -90 L5 -90 L4 -80 L-4 -80 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" }, g);
    // quatre pilastres
    [-72, -24, 24, 72].forEach((x, i) => {
      U.shape(C, "pil" + i, rr(x - 6, -106, 12, 82, 1), MAT.white, { sw: 2 });
      el("path", { d: rr(x - 8, -110, 16, 6, 1), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
      el("path", { d: rr(x - 8, -28, 16, 5, 1), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
    });
    // bandeau (entablement) avec le mot, corniche, fronton « § »
    U.shape(C, "band", rr(-90, -132, 180, 22, 2), MAT.white, { sw: 2.4 });
    txt(g, "Amtsgericht", 0, -115, 20, {});
    U.shape(C, "front", "M-98 -132 L0 -172 L98 -132 Z", MAT.grey, { sw: 2.6 });
    el("path", { d: "M-74 -137 L0 -165 L74 -137 Z", fill: "#F0F0EB", stroke: INK, "stroke-width": 1.6 }, g);
    txt(g, "§", 0, -141, 22, {});
    // trois marches
    U.shape(C, "m3", rr(-85, -24, 170, 8, 1.5), MAT.light, { sw: 2 });
    U.shape(C, "m2", rr(-95, -16, 190, 8, 1.5), MAT.light, { sw: 2 });
    U.shape(C, "m1", rr(-105, -8, 210, 8, 1.5), MAT.light, { sw: 2 });
    return { lampe: [0, -84], haut: [0, -172], porte: [0, -24] };
  };
  D.amtsgericht.essais = [{}, { partie: "halo", lampe: 0.85 }];

  /* ───────── D.globe — globe d'école SCHÉMATIQUE (S5, S11) : aucune côte, aucune frontière (storyboard, risque 6) ─────────
   * o = { R: 330, tour: −1…1 (les méridiens glissent de ± 6 px), partie: "tout" | "sphere" (le disque, son ombre propre et la grille) |
   *       "pied" (demi-méridien de support GRIS à gauche, pivots, colonne, pied rond) }
   * Ancrage = centre de la sphère. Sphère x ±R ; demi-méridien jusqu'à x −R − 40 ; colonne de y R + 40 à R + 130 ; pied jusqu'à y R + 182.
   * La petite Allemagne (drawDE), les points de départ, les arcs et les médaillons sont posés par story.js.
   * Zone claire (pas d'ombre propre) : tout le haut et la gauche de la sphère ; le croissant d'ombre est en bas à droite. */
  D.globe = (g, o) => {
    o = Object.assign({ R: 330, tour: 0, partie: "tout", seed: 961 }, o);
    const R = o.R, C = U.ctx(g, o.seed, false, 1), r1 = R + 24, r2 = R + 40, rm = R + 32;
    if (o.partie !== "sphere") {
      const yc = r2, yf = r2 + 90;
      // pied rond + colonne tournée
      el("ellipse", { cx: 16, cy: f(yf + 50), rx: 130, ry: 14, fill: "rgba(28,26,28,.16)" }, g);
      U.shape(C, "pied", `M-120 ${yf + 30} C-120 ${yf + 4} -62 ${yf - 6} 0 ${yf - 6} C62 ${yf - 6} 120 ${yf + 4} 120 ${yf + 30} L120 ${yf + 38} C120 ${yf + 54} -120 ${yf + 54} -120 ${yf + 38} Z`, MAT.wood, { sw: 3 });
      ln(g, `M-114 ${yf + 31} C-60 ${yf + 44} 60 ${yf + 44} 114 ${yf + 31}`, 1.6, "#ABABA4");
      ln(g, `M-70 ${yf + 6} C-30 ${yf} 30 ${yf} 70 ${yf + 6}`, 1.6, "#FFFFFF");
      U.shape(C, "col", `M-17 ${yc} L17 ${yc} L22 ${yf} L-22 ${yf} Z`, MAT.wood, { sw: 2.8 });
      U.shape(C, "bague", rr(-26, yc + 34, 52, 14, 5), MAT.mid, { sw: 2.4 });
      ln(g, `M-8 ${yc + 6} L-10 ${yf - 6}`, 1.3, "#FFFFFF");
      // demi-méridien de support, côté GAUCHE, gris (jamais de laiton), gradué
      const band = `M0 ${-r2} A${r2} ${r2} 0 0 0 0 ${r2} L0 ${r1} A${r1} ${r1} 0 0 1 0 ${-r1} Z`;
      el("path", { d: band, fill: OMBRE, transform: "translate(8 10)" }, g);
      U.shape(C, "mer", band, MAT.mid, { sw: 2.6, r: 0.4 });
      let d = "";
      for (let a = 100; a <= 260; a += 10) { const c = Math.cos(rad(a)), s = Math.sin(rad(a)), L = a % 30 === 0 ? 9 : 5; d += `M${f(c * r2)} ${f(s * r2)} L${f(c * (r2 - L))} ${f(s * (r2 - L))}`; }
      ln(g, d, 1.4, INK);
      // pivots (haut et bas) : tige d'acier + écrou
      [-1, 1].forEach((s) => {
        el("path", { d: rr(-5, s < 0 ? -r1 - 2 : R - 4, 10, r1 - R + 6, 3), fill: ACIER, stroke: INK, "stroke-width": 2 }, g);
        el("circle", { cx: 0, cy: s * rm, r: 9, fill: ACIER, stroke: INK, "stroke-width": 2.4 }, g);
        el("circle", { cx: 0, cy: s * rm, r: 3, fill: INK }, g);
      });
    }
    if (o.partie !== "pied") {
      el("circle", { cx: 11, cy: 14, r: R, fill: OMBRE }, g);
      el("circle", { cx: 0, cy: 0, r: R, fill: "#FFFFFF" }, g);
      const id = uid("gl"); el("circle", { cx: 0, cy: 0, r: R - 1.5 }, el("clipPath", { id }, g));
      const cl = el("g", { "clip-path": `url(#${id})` }, g);
      // ombre propre : croissant en bas à droite + quelques hachures qui suivent le bord
      el("path", { d: `M${-R - 60} ${-R - 60} L${R + 60} ${-R - 60} L${R + 60} ${R + 60} L${-R - 60} ${R + 60} Z ` + cercle(-38, -44, R), fill: "#EEEEE9", "fill-rule": "evenodd" }, cl);
      let hd = "";
      for (let a = 8; a <= 92; a += 7) { const c = Math.cos(rad(a)), s = Math.sin(rad(a)); hd += `M${f(c * (R - 4))} ${f(s * (R - 4))} L${f(c * (R - 30))} ${f(s * (R - 30) - 6)}`; }
      ln(cl, hd, 1.3, "#D2D2CC");
      // graticule : 4 parallèles (moitié avant), 5 méridiens qui glissent avec « tour »
      const dt = clamp(o.tour, -1, 1) * 1.1; let d = "";
      [-0.68, -0.3, 0.3, 0.68].forEach((k) => { const y = k * R, rx = Math.sqrt(R * R - y * y), ry = rx * 0.16; d += `M${f(-rx)} ${f(y)} A${f(rx)} ${f(ry)} 0 0 0 ${f(rx)} ${f(y)}`; });
      [-62, -31, 0, 31, 62].forEach((l) => { const lam = l + dt, rx = Math.abs(Math.sin(rad(lam))) * R; d += rx < 0.5 ? `M0 ${-R} L0 ${R}` : `M0 ${-R} A${f(rx)} ${R} 0 0 ${lam > 0 ? 1 : 0} 0 ${R}`; });
      ln(cl, d, 2, "#C9C9C1");
      U.stroke(C, "sph", cercle(0, 0, R), { sw: 3.2, r: 0.45 });
      ln(g, `M${f(-R * 0.72)} ${f(-R * 0.52)} A${f(R * 0.9)} ${f(R * 0.9)} 0 0 1 ${f(-R * 0.42)} ${f(-R * 0.8)}`, 3, "#E6E6E1");
    }
    return { R, haut: [0, -R], bas: [0, R], pied: [0, r2 + 142] };
  };
  D.globe.essais = [{}, { partie: "sphere", tour: 1 }, { partie: "pied" }];

  /* ───────── D.arc — trajet en pointillé : courbe quadratique A → C → B (coordonnées MONDE : poser en (0, 0)) ─────────
   * o = { A, C, B, p: 0…1 (longueur déjà tracée), phase: px (défilement des tirets, 40 px/s), sw: 4, fleche: true (pointe quand p = 1),
   *       fond: "#FFFFFF" | false (liseré clair sous les tirets : ils restent lisibles sur la grille du globe) }
   * Tirets 14 / 10, encre. Renvoie { L, bout: [x, y] (le bout tracé), pos: (p) => [x, y] (pour faire suivre un médaillon) }. */
  D.arc = (g, o) => {
    o = Object.assign({ A: [350, 1000], C: [352, 770], B: [452, 730], p: 1, phase: 0, sw: 4, col: INK, fleche: true, fond: "#FFFFFF" }, o);
    const N = 48, q = (t) => [(1 - t) * (1 - t) * o.A[0] + 2 * (1 - t) * t * o.C[0] + t * t * o.B[0], (1 - t) * (1 - t) * o.A[1] + 2 * (1 - t) * t * o.C[1] + t * t * o.B[1]];
    const pts = []; for (let i = 0; i <= N; i++) pts.push(q(i / N));
    const cum = [0]; for (let i = 1; i <= N; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const L = cum[N];
    const pos = (p) => { const c = clamp(p, 0, 1) * L; let i = 1; while (i < N && cum[i] < c) i++; const k = (c - cum[i - 1]) / ((cum[i] - cum[i - 1]) || 1); return [f(lerp(pts[i - 1][0], pts[i][0], k)), f(lerp(pts[i - 1][1], pts[i][1], k))]; };
    const cut = clamp(o.p, 0, 1) * L;
    if (cut < 1) return { L: f(L), bout: pos(0), pos };
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 1; i <= N && cum[i] < cut; i++) d += ` L${f(pts[i][0])} ${f(pts[i][1])}`;
    const e = pos(o.p); d += ` L${e[0]} ${e[1]}`;
    if (o.fond) ln(g, d, o.sw + 7, o.fond, { opacity: 0.9 });
    ln(g, d, o.sw, o.col, { "stroke-dasharray": "14 10", "stroke-dashoffset": f(-(o.phase || 0) % 24), "stroke-linecap": "butt" });
    if (o.fleche && o.p >= 0.999) {
      const a = pos(0.94), b = o.B, ang = Math.atan2(b[1] - a[1], b[0] - a[0]), hp = (s) => `${f(b[0] - Math.cos(ang + s * 0.5) * 20)} ${f(b[1] - Math.sin(ang + s * 0.5) * 20)}`;
      if (o.fond) ln(g, `M${hp(1)} L${b[0]} ${b[1]} L${hp(-1)}`, o.sw + 7, o.fond, { opacity: 0.9 });
      ln(g, `M${hp(1)} L${b[0]} ${b[1]} L${hp(-1)}`, o.sw, o.col);
    }
    return { L: f(L), bout: e, pos };
  };
  D.arc.essais = [{ p: 0.55, phase: 10 }, { p: 1 }];

  /* ───────── D.tube — tube à diplôme : cylindre gris, capuchon sombre, deux bagues, boucle de sangle ─────────
   * o = { sangle: "boucle" | "aucune" } · 166 × 46 (+ la boucle, 40 au-dessus) · ancrage = centre.
   * S6, S24 : en bandoulière DERRIÈRE « toi » (incliné de 35°) ; S11 : il glisse le long d'un arc. */
  D.tube = (g, o) => {
    o = Object.assign({ sangle: "boucle", seed: 965 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    if (o.sangle === "boucle") { ln(g, "M-42 -16 C-38 -64 42 -64 46 -16", 8, INK); ln(g, "M-42 -16 C-38 -64 42 -64 46 -16", 3.4, "#77776F"); }
    ombre(g, rr(-82, -22, 162, 44, 12), 5, 7);
    U.shape(C, "corps", rr(-70, -20, 146, 40, 9), MAT.mid, { sw: 2.8 });
    ln(g, "M-60 -11 L68 -11", 2.2, "#FFFFFF", { opacity: 0.85 });
    el("ellipse", { cx: 76, cy: 0, rx: 6, ry: 19, fill: "#B9B9B3", stroke: INK, "stroke-width": 2.4 }, g);
    U.shape(C, "bouchon", rr(-82, -23, 26, 46, 7), MAT.dark, { sw: 2.8 });
    ln(g, "M-75 -15 L-75 15", 1.4, "#9A9A94");
    [-42, 46].forEach((x) => el("path", { d: rr(x - 5, -22, 10, 44, 3), fill: "#4A4A46", stroke: INK, "stroke-width": 2 }, g));
    return { w: 166, h: 46, sangle: [[-42, -16], [46, -16]] };
  };
  D.tube.essais = [{}, { sangle: "aucune" }];

  /* ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
   * D. LES DIPLÔMES — mur de diplômes (S3), le diplôme de « toi » et le hall d'arrivée (S6)
   * ═════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

  // sceau en rosette GRIS (jamais doré : le jaune est réservé au laiton) + deux rubans ; (x, y) = centre, r = rayon
  function sceau(g, C, x, y, r, key) {
    [-1, 1].forEach((s) => el("path", { d: `M${f(x + s * r * 0.25)} ${f(y + r * 0.5)} L${f(x + s * r * 0.75)} ${f(y + r * 1.75)} L${f(x + s * r * 0.42)} ${f(y + r * 1.55)} L${f(x + s * r * 0.2)} ${f(y + r * 1.85)} L${f(x - s * r * 0.08)} ${f(y + r * 0.6)} Z`, fill: "#CFCFCA", stroke: INK, "stroke-width": f(clamp(r * 0.09, 1, 2)), "stroke-linejoin": "round" }, g));
    let d = "";
    for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2, rr2 = i % 2 ? r : r * 0.84; d += (i ? "L" : "M") + f(x + Math.cos(a) * rr2) + " " + f(y + Math.sin(a) * rr2); }
    U.shape(C, key, d + "Z", MAT.grey, { sw: clamp(r * 0.1, 1.2, 2.4), r: 0.25 });
    el("circle", { cx: f(x), cy: f(y), r: f(r * 0.55), fill: "#F0F0EB", stroke: INK, "stroke-width": f(clamp(r * 0.07, 0.9, 1.8)) }, g);
    ln(g, `M${f(x - r * 0.25)} ${f(y)} L${f(x + r * 0.25)} ${f(y)} M${f(x)} ${f(y - r * 0.25)} L${f(x)} ${f(y + r * 0.25)}`, f(clamp(r * 0.07, 0.9, 1.6)), "#77776F");
  }

  /* ───────── D.cimaise — rail à tableaux (S3) : moulure claire, vis, crochets en S (coordonnées MONDE : poser en (0, 0)) ─────────
   * o = { x0: 150, x1: 930, y: 566, crochets: [350, 730] } · renvoie { y, crochets: [[x, y + 24], …] } = où pendent les fils. */
  D.cimaise = (g, o) => {
    o = Object.assign({ x0: 150, x1: 930, y: 566, crochets: [350, 730], seed: 971 }, o);
    const C = U.ctx(g, o.seed, false, 1), y = o.y;
    el("rect", { x: o.x0 + 4, y: y + 6, width: o.x1 - o.x0, height: 9, fill: OMBRE }, g);
    U.shape(C, "rail", rr(o.x0, y - 8, o.x1 - o.x0, 16, 4), MAT.light, { sw: 2.6, r: 0.4 });
    ln(g, `M${o.x0 + 8} ${y - 3} L${o.x1 - 8} ${y - 3}`, 1.3, "#FFFFFF");
    for (let x = o.x0 + 40; x < o.x1 - 20; x += 220) visTete(g, x, y + 1, 3.4, (x * 7) % 90, { ombre: false });
    o.crochets.forEach((x) => ln(g, `M${x - 3} ${y - 9} C${x + 8} ${y - 13} ${x + 11} ${y + 3} ${x + 2} ${y + 8} L${x + 2} ${y + 17} C${x + 2} ${y + 28} ${x - 10} ${y + 28} ${x - 9} ${y + 18}`, 3, INK));
    return { y, crochets: o.crochets.map((x) => [x, y + 24]) };
  };
  D.cimaise.essais = [{ x0: 150, x1: 930 }];

  /* ───────── D.cadre — diplôme encadré (S3) : cadre bois 18 px, passe-partout 16 px, document, sceau gris, fils, lampe de tableau ─────────
   * o = { w: 280, h: 360, t1 (34), t2 (24), t3 (22) (réduits s'ils ne tiennent pas), fil: 290 (du centre au crochet du rail),
   *       lampe: true, cone: 0…1 (le cône crème frémit), partie: "tout" | "cone" (le cône seul, nœud à part pour le faire frémir) }
   * Ancrage = centre ; pivot de m.pend = out.crochet. Le bas du document (y +70…+140) reste dégagé à droite : le tampon y frappe. */
  D.cadre = (g, o) => {
    o = Object.assign({ w: 280, h: 360, t1: "Approbation", t2: "Facharzt für", t3: "Innere Medizin", fil: 290, lampe: true, cone: 1, partie: "tout", seed: 973 }, o);
    const w = o.w, h = o.h, x0 = -w / 2, y0 = -h / 2, yl = y0 - 28, C = U.ctx(g, o.seed + w, false, 1);
    const coneD = (gg) => cone(gg, 0, yl + 8, 52, w / 2 - 12, h + 10, 0.24 * clamp(o.cone, 0, 1.2));
    if (o.partie === "cone") { coneD(g); return { crochet: [0, -o.fil] }; }
    // les deux fils jusqu'au crochet
    ln(g, `M${f(x0 + 26)} ${f(y0 + 8)} L0 ${-o.fil} L${f(-x0 - 26)} ${f(y0 + 8)}`, 1.8, "#55524B");
    ombre(g, rr(x0, y0, w, h, 4), 8, 10);
    U.shape(C, "bois", rr(x0, y0, w, h, 4), MAT.wood, { sw: 3 });
    ln(g, `M${x0 + 2} ${y0 + 2} L${x0 + 18} ${y0 + 18} M${-x0 - 2} ${y0 + 2} L${-x0 - 18} ${y0 + 18} M${x0 + 2} ${-y0 - 2} L${x0 + 18} ${-y0 - 18} M${-x0 - 2} ${-y0 - 2} L${-x0 - 18} ${-y0 - 18}`, 1.5, INK);
    el("path", { d: rr(x0 + 18, y0 + 18, w - 36, h - 36, 2), fill: "#FBFAF4", stroke: INK, "stroke-width": 2 }, g);
    el("path", { d: rr(x0 + 34, y0 + 34, w - 68, h - 68, 1), fill: "#FFFFFF", stroke: "#8A8A84", "stroke-width": 1.5 }, g);
    ln(g, `M${x0 + 36} ${-y0 - 36} L${-x0 - 36} ${-y0 - 36} L${-x0 - 36} ${y0 + 36}`, 2, "#E4E2DA");
    // textes du document
    const dw = w - 68 - 22, fit = (t, s) => f(Math.min(s, dw / Math.max(1, String(t).length * 0.48)));
    if (o.t1) txt(g, o.t1, 0, f(y0 + 90), fit(o.t1, 34), {});
    ln(g, `M-42 ${f(y0 + 106)} C-16 ${f(y0 + 99)} 16 ${f(y0 + 112)} 42 ${f(y0 + 105)}`, 1.6, "#77776F");
    if (o.t2) txt(g, o.t2, 0, f(y0 + 144), fit(o.t2, 24), {});
    if (o.t3) txt(g, o.t3, 0, f(y0 + 174), fit(o.t3, 22), {});
    // bas du document : sceau à gauche, gribouillis à droite (y +20…+60) ; la bande y +80…+140 reste aux tampons (S3)
    grib(g, -26, y0 + 202, 104, { n: 3, pas: 15, seed: (o.seed + w) % 37 });
    sceau(g, C, -72, y0 + 214, 17, "sceau");
    ln(g, `M28 ${f(-y0 - 52)} C40 ${f(-y0 - 64)} 52 ${f(-y0 - 42)} 64 ${f(-y0 - 56)} C72 ${f(-y0 - 64)} 80 ${f(-y0 - 50)} 92 ${f(-y0 - 54)}`, 1.8, "#55524B");
    ln(g, `M24 ${f(-y0 - 42)} L96 ${f(-y0 - 42)}`, 1.2, "#9A9A94");
    // lampe de tableau (tube sur un petit bras, au-dessus du cadre) et son cône crème
    if (o.lampe) {
      coneD(g);
      ln(g, `M0 ${y0 + 2} L0 ${y0 - 10} C0 ${yl + 4} 0 ${yl + 4} 0 ${yl + 2}`, 4, INK);
      el("path", { d: rr(-10, y0 - 4, 20, 6, 2), fill: ACIER, stroke: INK, "stroke-width": 1.6 }, g);
      U.shape(C, "lampe", rr(-60, yl - 7, 120, 15, 7), MAT.mid, { sw: 2.4 });
      el("path", { d: rr(-54, yl + 5, 108, 5, 2), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.4 }, g);
    }
    return { crochet: [0, -o.fil], haut: [0, y0], bas: [0, -y0], lampe: [0, yl] };
  };
  D.cadre.essais = [{}, { t1: "Diplom", t2: "Universität · 1997", t3: "" }, { partie: "cone" }];

  /* ───────── D.diplome — le diplôme de « toi », GÉNÉRIQUE : ni pays, ni université, ni nom ─────────
   * o = { w: 560, h: 270, k: échelle des textes (défaut min(w/560, h/270)), roule: 0…1 (les deux bouts encore enroulés),
   *       l1: "Diplôme de" (34 k), l2: "Doctorat en Médecine" (46 k) }
   * Ancrage = centre. Formats : 560 × 270 (S6, grand) · 230 × 160 (S6, dans les mains) · 200 × 130 (S9) · 250 × 180 (S24).
   * Grand format : « Doctorat en Médecine » centré, ligne de base y +14 (x −216…+216) ; son « D » est vers (−208, −5).
   * Renvoie { D: centre du « D » de « Doctorat », l2: [y de la ligne de base, demi-largeur] }. */
  D.diplome = (g, o) => {
    o = Object.assign({ w: 560, h: 270, k: null, roule: 0, l1: "Diplôme de", l2: "Doctorat en Médecine", seed: 977 }, o);
    const w = o.w, h = o.h, k = o.k || Math.min(w / 560, h / 270), R = clamp(o.roule, 0, 1);
    const fw = w * (1 - R), rk = Math.max(k, 0.5), rr0 = (6 + 14 * R) * rk, C = U.ctx(g, o.seed + Math.round(w), false, 1);
    const lw2 = Math.max(1, 2.4 * k), id = uid("dp");
    ombre(g, rr(-fw / 2 - (R > 0.02 ? 2 * rr0 : 0), -h / 2, fw + (R > 0.02 ? 4 * rr0 : 0), h, 3), f(2 + 6 * k), f(3 + 7 * k));
    if (fw > 0.5) {
      el("rect", { x: f(-fw / 2), y: f(-h / 2 - 6), width: f(fw), height: f(h + 12) }, el("clipPath", { id }, g));
      const cg = el("g", { "clip-path": `url(#${id})` }, g), Cc = U.ctx(cg, o.seed + 3, false, 1);
      U.shape(Cc, "f", rr(-w / 2, -h / 2, w, h, 3), { base: "#FFFFFE" }, { sw: Math.max(1.6, 2.8 * k), r: 0.35 });
      const i1 = 11 * k + 2, i2 = 19 * k + 3;
      ln(cg, rr(-w / 2 + i1, -h / 2 + i1, w - 2 * i1, h - 2 * i1, 2), f(lw2), INK);
      ln(cg, rr(-w / 2 + i2, -h / 2 + i2, w - 2 * i2, h - 2 * i2, 2), f(Math.max(0.8, 1.2 * k)), "#77776F");
      // fleurons d'angle
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => {
        const cx = sx * (w / 2 - i2), cy = sy * (h / 2 - i2), L = 30 * k + 4, e = 5 * k + 1;       // (−sx, −sy) = vers l'intérieur
        ln(cg, `M${f(cx - sx * L)} ${f(cy - sy * e)} Q${f(cx - sx * e)} ${f(cy - sy * e)} ${f(cx - sx * e)} ${f(cy - sy * L)}`, f(Math.max(0.9, 1.6 * k)), "#55524B");
        ln(cg, `M${f(cx - sx * L * 0.62)} ${f(cy - sy * e * 2.2)} Q${f(cx - sx * e * 2.2)} ${f(cy - sy * e * 2.2)} ${f(cx - sx * e * 2.2)} ${f(cy - sy * L * 0.62)}`, f(Math.max(0.7, 1.1 * k)), "#9A9A94");
        el("circle", { cx: f(cx - sx * e * 3.4), cy: f(cy - sy * e * 3.4), r: f(Math.max(1.2, 2.8 * k)), fill: "#55524B" }, cg);
      });
      // textes (français, libellé d'origine)
      txt(cg, o.l1, 0, f(-h * 0.17), f(34 * k), { fill: "#3A3A37" });
      txt(cg, o.l2, 0, f(h * 0.052), f(46 * k), {});
      ln(cg, `M${f(-60 * k)} ${f(h * 0.052 + 14 * k)} C${f(-20 * k)} ${f(h * 0.052 + 8 * k)} ${f(20 * k)} ${f(h * 0.052 + 20 * k)} ${f(60 * k)} ${f(h * 0.052 + 13 * k)}`, f(Math.max(0.9, 1.6 * k)), "#77776F");
      [0.2, 0.28, 0.36].forEach((t, i) => grib(cg, f(-w * 0.36), f(h * t), f(w * (i === 2 ? 0.34 : 0.46)), { seed: 5 + i, sw: Math.max(1.1, 2 * k) }));
      sceau(cg, Cc, f(w / 2 - 66 * k - 4), f(h / 2 - 54 * k - 4), f(26 * k + 2), "sceau");
      ln(cg, `M${f(w * 0.06)} ${f(h * 0.37)} C${f(w * 0.1)} ${f(h * 0.31)} ${f(w * 0.14)} ${f(h * 0.41)} ${f(w * 0.2)} ${f(h * 0.34)}`, f(Math.max(1, 1.8 * k)), "#55524B");
    }
    // les deux bouts encore enroulés
    if (R > 0.02) [-1, 1].forEach((s) => {
      const xe = s * fw / 2, xa = s < 0 ? xe - 2 * rr0 : xe;
      U.shape(C, "rl" + s, rr(xa, -h / 2 - 3, 2 * rr0, h + 6, rr0), { base: "#FFFFFE" }, { sw: Math.max(1.5, 2.6 * k), r: 0.3 });
      ln(g, `M${f(xe + s * rr0 * 1.3)} ${f(-h / 2 + rr0)} L${f(xe + s * rr0 * 1.3)} ${f(h / 2 - rr0)}`, f(Math.max(1, 2 * k)), "#DCDCD4");
      ln(g, `M${f(xe + s * rr0 * 0.6)} ${f(-h / 2 + rr0 * 0.6)} L${f(xe + s * rr0 * 0.6)} ${f(h / 2 - rr0 * 0.6)}`, f(Math.max(0.8, 1.2 * k)), "#BDBDB6");
      el("ellipse", { cx: f(xe + s * rr0), cy: f(-h / 2 + 1), rx: f(rr0 * 0.92), ry: f(rr0 * 0.34), fill: "#FFFFFE", stroke: INK, "stroke-width": f(Math.max(1, 1.8 * k)) }, g);
      el("ellipse", { cx: f(xe + s * rr0), cy: f(-h / 2 + 1), rx: f(rr0 * 0.45), ry: f(rr0 * 0.16), fill: "none", stroke: "#77776F", "stroke-width": f(Math.max(0.8, 1.2 * k)) }, g);
    });
    return { D: [f(-216 * k + 8 * k), f(h * 0.052 - 19 * k)], l2: [f(h * 0.052), f(216 * k)] };
  };
  D.diplome.essais = [{}, { roule: 0.55 }, { w: 230, h: 160 }, { w: 230, h: 160, roule: 1 }, { w: 200, h: 130 }, { w: 250, h: 180 }];

  /* ───────── D.valise — valise cabine à roulettes (S6) : poignée télescopique sortie, étiquette de bagage VIERGE ─────────
   * o = { partie: "tout" | "corps" (sans l'étiquette) | "etiquette" (l'étiquette seule : pivot = out.pivot, m.pend repos 2°) }
   * Corps 150 × 210 (y −222…−12), roulettes jusqu'à y 0, poignée jusqu'à y −346 · ancrage = centre du bas. */
  D.valise = (g, o) => {
    o = Object.assign({ partie: "tout", seed: 979 }, o);
    const C = U.ctx(g, o.seed, false, 1), piv = [34, -236];
    const etiq = (gg) => {
      const Ce = U.ctx(gg, o.seed + 1, false, 1);
      ln(gg, `M${piv[0]} ${piv[1]} C${piv[0] + 8} ${piv[1] + 14} ${piv[0] + 10} ${piv[1] + 26} ${piv[0] + 6} ${piv[1] + 36}`, 2.2, INK);
      const d = `M${piv[0] - 12} ${piv[1] + 36} L${piv[0] + 22} ${piv[1] + 36} L${piv[0] + 22} ${piv[1] + 96} L${piv[0] - 12} ${piv[1] + 96} Z`;
      ombre(gg, d, 4, 5);
      U.shape(Ce, "et", d, { base: "#FFFFFF" }, { sw: 2.2, r: 0.4 });
      el("circle", { cx: piv[0] + 5, cy: piv[1] + 44, r: 3.4, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, gg);
      ln(gg, `M${piv[0] - 6} ${piv[1] + 58} L${piv[0] + 16} ${piv[1] + 58} M${piv[0] - 6} ${piv[1] + 70} L${piv[0] + 16} ${piv[1] + 70} M${piv[0] - 6} ${piv[1] + 82} L${piv[0] + 10} ${piv[1] + 82}`, 1.2, "#C9C9C1");
    };
    if (o.partie === "etiquette") { etiq(g); return { pivot: piv }; }
    el("ellipse", { cx: 8, cy: 2, rx: 86, ry: 9, fill: "rgba(28,26,28,.18)" }, g);
    // poignée télescopique
    [-30, 30].forEach((x) => { el("path", { d: rr(x - 4, -334, 8, 116, 3), fill: ACIER, stroke: INK, "stroke-width": 2 }, g); ln(g, `M${x - 1} -326 L${x - 1} -226`, 1, "#FFFFFF"); });
    el("path", { d: rr(-34, -290, 68, 6, 2), fill: "none", stroke: "#8A8A84", "stroke-width": 1.4 }, g);
    U.shape(C, "grip", rr(-42, -348, 84, 18, 9), MAT.dark, { sw: 2.4 });
    // roulettes
    [-50, 50].forEach((x) => { el("path", { d: rr(x - 11, -20, 22, 12, 3), fill: "#4A4A46", stroke: INK, "stroke-width": 1.8 }, g); el("circle", { cx: x, cy: -8, r: 8, fill: "#3A3A37", stroke: INK, "stroke-width": 2 }, g); el("circle", { cx: x, cy: -8, r: 2.6, fill: ACIER }, g); });
    // coque
    ombre(g, rr(-75, -222, 150, 210, 16), 7, 8);
    U.shape(C, "coque", rr(-75, -222, 150, 210, 16), MAT.grey, { sw: 3 });
    ln(g, "M-38 -214 L-38 -20 M0 -216 L0 -18 M38 -214 L38 -20", 2, "#8A8A84");
    ln(g, "M-37 -214 L-37 -20 M1 -216 L1 -18 M39 -214 L39 -20", 1, "#FFFFFF");
    ln(g, "M-66 -118 L66 -118", 1.8, INK, { "stroke-dasharray": "2 4" });                     // fermeture éclair
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => ln(g, `M${sx * 75} ${sy > 0 ? -40 : -194} Q${sx * 75} ${sy > 0 ? -12 : -222} ${sx * 47} ${sy > 0 ? -12 : -222}`, 6, "#4A4A46"));
    el("path", { d: rr(-48, -226, 96, 10, 4), fill: "#4A4A46", stroke: INK, "stroke-width": 1.8 }, g);
    if (o.partie !== "corps") etiq(g);
    return { pivot: piv, poignee: [0, -340] };
  };
  D.valise.essais = [{}, { partie: "etiquette" }];

  /* ───────── D.pochette — pochette à rabat et à élastique (S6, S24) : le diplôme de la collègue est dedans ─────────
   * 110 × 80 · ancrage = centre (là où va la main de KOL). */
  D.pochette = (g, o) => {
    o = Object.assign({ seed: 985 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    ombre(g, rr(-55, -40, 110, 80, 7), 5, 6);
    U.shape(C, "corps", rr(-55, -40, 110, 80, 7), MAT.mid, { sw: 2.6 });
    el("path", { d: "M-50 30 L50 30", stroke: "#FFFFFF", "stroke-width": 1.2, fill: "none" }, g);
    U.shape(C, "rabat", "M-55 -40 L55 -40 L55 -16 C40 -4 22 2 0 4 C-22 2 -40 -4 -55 -16 Z", MAT.light, { sw: 2.4 });
    ln(g, "M-46 -34 L46 -34", 1.2, "#FFFFFF");
    el("path", { d: rr(31, -42, 9, 84, 3), fill: "#4A4A46", stroke: INK, "stroke-width": 1.8 }, g);       // l'élastique
    el("circle", { cx: 0, cy: -6, r: 5, fill: ACIER, stroke: INK, "stroke-width": 1.8 }, g);
    return { w: 110, h: 80 };
  };
  D.pochette.essais = [{}];

  /* ───────── D.suspension — suspension grise du hall (S6) : rosace, fil, abat-jour, ampoule, cône CRÈME ─────────
   * o = { L: 100 (longueur du fil), cone: 0…1, coneH: 560 } · ancrage = point d'accroche au plafond = pivot de m.pend.
   * Renvoie { abat: [0, L + 20] }. */
  D.suspension = (g, o) => {
    o = Object.assign({ L: 100, cone: 1, coneH: 560, seed: 989 }, o);
    const L = o.L, C = U.ctx(g, o.seed, false, 1);
    cone(g, 0, L + 40, 44, 230, o.coneH, 0.26 * clamp(o.cone, 0, 1.2));
    U.shape(C, "rosace", rr(-18, -6, 36, 11, 4), MAT.mid, { sw: 2.2 });
    ln(g, `M0 4 L0 ${L - 4}`, 2.4, INK);
    el("path", { d: rr(-7, L - 6, 14, 12, 3), fill: "#4A4A46", stroke: INK, "stroke-width": 1.8 }, g);
    const abat = `M-50 ${L + 40} C-48 ${L + 10} -26 ${L + 2} -8 ${L + 2} L8 ${L + 2} C26 ${L + 2} 48 ${L + 10} 50 ${L + 40} Z`;
    el("path", { d: abat, fill: OMBRE, transform: "translate(5 6)" }, g);
    U.shape(C, "abat", abat, MAT.grey, { sw: 2.6 });
    ln(g, `M-32 ${L + 14} C-22 ${L + 8} -12 ${L + 7} -4 ${L + 7}`, 1.6, "#FFFFFF");
    el("ellipse", { cx: 0, cy: L + 41, rx: 50, ry: 6, fill: "#4A4A46", stroke: INK, "stroke-width": 2 }, g);
    el("ellipse", { cx: 0, cy: L + 45, rx: 13, ry: 9, fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g);
    return { abat: [0, L + 20], pivot: [0, 0] };
  };
  D.suspension.essais = [{}];

  /* ───────── D.cartons — deux cartons de déménagement empilés (S6, à gauche de la valise) ─────────
   * 130 × 170 (x −65…+65, y −170…0) · ancrage = centre du bas. Pictogramme « haut » (deux flèches), aucun mot. */
  D.cartons = (g, o) => {
    o = Object.assign({ seed: 991 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    el("ellipse", { cx: 8, cy: 2, rx: 74, ry: 7, fill: "rgba(28,26,28,.16)" }, g);
    ombre(g, "M-65 -96 L65 -96 L65 0 L-65 0 Z M-50 -170 L60 -170 L60 -96 L-50 -96 Z", 7, 7);
    // carton du bas
    U.shape(C, "b", rr(-65, -96, 130, 96, 3), MAT.wood, { sw: 2.8 });
    el("path", { d: "M-9 -96 L9 -96 L9 -52 L-9 -52 Z", fill: "#DADAD5", stroke: "#8A8A84", "stroke-width": 1.2 }, g);
    ln(g, "M-65 -80 L-9 -80 M9 -80 L65 -80", 1.2, "#ABABA4");
    ln(g, "M30 -34 L30 -14 M24 -28 L30 -36 L36 -28 M46 -34 L46 -14 M40 -28 L46 -36 L52 -28 M24 -10 L52 -10", 1.8, INK);
    // carton du haut (un peu décalé), poignée découpée
    U.shape(C, "h", rr(-50, -170, 110, 74, 3), MAT.wood, { sw: 2.8 });
    el("path", { d: "M-4 -170 L12 -170 L12 -140 L-4 -140 Z", fill: "#DADAD5", stroke: "#8A8A84", "stroke-width": 1.2 }, g);
    el("path", { d: rr(-38, -132, 26, 9, 4.5), fill: "#4A4A46" }, g);
    ln(g, "M-46 -110 L54 -110", 1.2, "#ABABA4");
    return { haut: [5, -170] };
  };
  D.cartons.essais = [{}];

  /* ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
   * E. L'ATELIER DU GRAVEUR (S7, S10, S26) — mise en place FIXE (storyboard § 4, « Atelier du graveur »)
   * ═════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

  // places des outils pendus et des bons de commande (coordonnées MONDE) : mêmes valeurs pour D.atelier et pour les scènes
  const ATELIER_OUTILS = [
    { kind: "burin", v: 0, x: 362, y: 700 }, { kind: "burin", v: 1, x: 398, y: 700 }, { kind: "burin", v: 2, x: 434, y: 700 },
    { kind: "burin", v: 3, x: 470, y: 700 }, { kind: "compas", v: 0, x: 522, y: 700 }, { kind: "scie", v: 0, x: 252, y: 808 },
    { kind: "equerre", v: 0, x: 800, y: 828 }];
  const ATELIER_BONS = [{ v: 0, x: 394, y: 590 }, { v: 1, x: 468, y: 590 }, { v: 2, x: 872, y: 590 }];

  /* ───────── D.atelier — fond complet de l'atelier (coordonnées MONDE : poser en (0, 0)) ─────────
   * Mur uni (y 250–940), PANNEAU PERFORÉ x 170–910, y 560–900 (trous tous les 40 px) ; fil tendu à y 590 (pitons aux deux bouts) ;
   * ÉTABLI : dessus de y 940 (fond, x 150–930) à 1200 (bord avant, x 120–960), chant 1200–1228, façade à trois tiroirs
   * à poignée coquille jusqu'à 1400 ; sol 1400–1470. PAS de marteau ni de maillet.
   * o = { outils: true, bons: true } : false pour poser les outils (D.outil, m.pend repos 0,5°) et les bons (D.bon, m.sway 2°)
   * comme nœuds séparés, aux places renvoyées dans out.outils / out.bons (pivot = { x, y }).
   * Renvoie { panneau: [x0, y0, x1, y1], fil: 590, etabli: { fond: 940, bord: 1200, face: 1400 }, outils, bons }. */
  D.atelier = (g, o) => {
    o = Object.assign({ outils: true, bons: true, x0: 40, x1: 1040, haut: 250, bas: 1470, seed: 981 }, o);
    const C = U.ctx(g, o.seed, false, 1), x0 = o.x0, x1 = o.x1;
    // mur
    el("rect", { x: x0, y: o.haut, width: x1 - x0, height: 960 - o.haut, fill: "#F2F0EA" }, g);
    ln(g, "M78 420 l28 4 M960 470 l-30 6 M84 860 l22 -6 M972 820 l-26 2", 1.5, "#D5D2C7");
    // panneau perforé
    ombre(g, rr(170, 560, 740, 340, 6), 8, 10);
    U.shape(C, "pan", rr(170, 560, 740, 340, 6), { base: "#ECE8DC" }, { sw: 3, r: 0.5 });
    ln(g, rr(178, 568, 724, 324, 4), 1.4, "#B9B4A4");
    let d = ""; for (let y = 580; y <= 880; y += 40) for (let x = 190; x <= 890; x += 40) d += cercle(x, y, 3.2);
    el("path", { d, fill: "#B3AE9E" }, g);
    // fil tendu + pitons
    ln(g, "M186 590 L894 590", 2, "#55524B");
    [186, 894].forEach((x) => { el("circle", { cx: x, cy: 590, r: 5.5, fill: "none", stroke: INK, "stroke-width": 2.4 }, g); ln(g, `M${x} 584 L${x} 575`, 2.4, INK); });
    // établi : le dessus en perspective
    el("path", { d: "M150 940 L930 940 L932 952 L148 952 Z", fill: "rgba(28,26,28,.14)" }, g);
    U.shape(C, "dessus", "M150 940 L930 940 L960 1200 L120 1200 Z", MAT.wood, { sw: 3, r: 0.5 });
    let v = "";
    [0.22, 0.5, 0.78].forEach((t, i) => { const yy = lerp(940, 1200, t), xa = lerp(150, 120, t) + 40, xb = lerp(930, 960, t) - 50; v += `M${f(xa)} ${f(yy)} C${f(lerp(xa, xb, 0.3))} ${f(yy - 5 + i * 2)} ${f(lerp(xa, xb, 0.65))} ${f(yy + 5)} ${f(xb)} ${f(yy - 1)}`; });
    ln(g, v, 1.4, "#BDBAAE");
    ln(g, "M860 1150 c10 -4 22 -2 30 4 M180 990 c6 -6 18 -6 24 0 M600 1186 l40 -3", 1.6, "#ABABA4");
    // chant + façade à trois tiroirs
    U.shape(C, "chant", rr(116, 1200, 848, 28, 4), MAT.wood, { sw: 2.8 });
    ln(g, "M126 1207 L954 1207", 1.3, "#FFFFFF");
    U.shape(C, "face", rr(128, 1228, 824, 172, 2), MAT.light, { sw: 2.8, r: 0.5 });
    [[148, 392], [415, 665], [688, 932]].forEach(([a, b], i) => {
      el("path", { d: rr(a + 4, 1250, b - a, 128, 5), fill: "rgba(28,26,28,.1)" }, g);
      U.shape(C, "tir" + i, rr(a, 1246, b - a, 128, 5), { base: "#F4F3EE" }, { sw: 2.4 });
      const m = (a + b) / 2;
      el("path", { d: `M${m - 30} 1290 L${m + 30} 1290 C${m + 28} 1312 ${m - 28} 1312 ${m - 30} 1290 Z`, fill: ACIER, stroke: INK, "stroke-width": 2.2, "stroke-linejoin": "round" }, g);
      ln(g, `M${m - 20} 1296 C${m - 8} 1302 ${m + 8} 1302 ${m + 20} 1296`, 1.2, "#FFFFFF");
      el("path", { d: rr(m - 22, 1334, 44, 18, 2), fill: "#FFFFFF", stroke: "#8A8A84", "stroke-width": 1.3 }, g);
    });
    // sol
    el("rect", { x: x0, y: 1400, width: x1 - x0, height: o.bas - 1400, fill: "#E6E4DC" }, g);
    ln(g, `M${x0} 1400 L${x1} 1400`, 3, INK);
    ln(g, `M${x0} 1436 L${x1} 1436 M300 1400 L280 1470 M780 1400 L800 1470`, 1.3, "#C9C6BC");
    el("rect", { x: x0, y: o.bas - 10, width: x1 - x0, height: 10, fill: PAPIER, opacity: 0.6 }, g);
    // outils pendus et bons de commande (statiques ici ; en scène : nœuds séparés)
    if (o.outils) ATELIER_OUTILS.forEach((t) => D.outil(el("g", { transform: `translate(${t.x} ${t.y})` }, g), t));
    if (o.bons) ATELIER_BONS.forEach((b) => D.bon(el("g", { transform: `translate(${b.x} ${b.y})` }, g), b));
    return { panneau: [170, 560, 910, 900], fil: 590, etabli: { fond: 940, bord: 1200, face: 1400 },
      outils: ATELIER_OUTILS.map((t) => Object.assign({}, t)), bons: ATELIER_BONS.map((b) => Object.assign({}, b)) };
  };
  D.atelier.essais = [{}];

  /* ───────── D.outil — un outil pendu au panneau perforé (jamais de marteau ni de maillet) ─────────
   * o = { kind: "burin" (v 0…3 : quatre burins différents) | "compas" (compas à pointes) | "scie" (scie bocfil) | "equerre" }
   * Ancrage = la cheville du panneau = pivot de m.pend. Tailles : burin 16 × 150 · compas 50 × 116 · scie 150 × 104 · équerre 106 × 84. */
  D.outil = (g, o) => {
    o = Object.assign({ kind: "burin", v: 0, seed: 983 }, o);
    const C = U.ctx(g, o.seed + (o.v || 0) * 7 + o.kind.length, false, 1), sh = (d) => ombre(g, d, 5, 6, "rgba(28,26,28,.15)");
    let bas = [0, 0];
    if (o.kind === "burin") {
      const v = (o.v || 0) % 4, bw = [12, 8, 15, 6][v], hl = [58, 52, 62, 56][v], L = [150, 140, 156, 146][v], yb = 14 + hl + 8;
      const manche = rr(-8, 12, 16, hl, 6), lame = `M${-bw / 2} ${yb} L${bw / 2} ${yb} L${bw / 2} ${L - 10} L${-bw / 2 + 1} ${L} L${-bw / 2} ${L} Z`;
      sh(manche + " " + lame);
      ln(g, "M0 0 C-8 3 -8 11 -3 14 M0 0 C8 3 8 11 3 14", 2, "#55524B");                    // boucle de cuir
      U.shape(C, "manche", manche, MAT.wood, { sw: 2.4, r: 0.4 });
      ln(g, `M-3 20 L-3 ${8 + hl}`, 1.2, "#FFFFFF");
      el("path", { d: rr(-9, 10 + hl, 18, 10, 2), fill: ACIER, stroke: INK, "stroke-width": 2 }, g);
      el("path", { d: lame, fill: ACIER, stroke: INK, "stroke-width": 2.2, "stroke-linejoin": "round" }, g);
      ln(g, `M${f(-bw / 2 + 2.5)} ${yb + 4} L${f(-bw / 2 + 2.5)} ${L - 14}`, 1.1, "#FFFFFF");
      bas = [0, L];
    } else if (o.kind === "compas") {
      const legs = "M-4 18 L-21 112 M4 18 L21 112";
      ln(g, legs, 8, "rgba(28,26,28,.15)", { transform: "translate(5 6)" });
      ln(g, legs, 6.5, INK); ln(g, legs, 3, ACIER);
      ln(g, "M-21 112 L-22 118 M21 112 L22 118", 2, INK);
      ln(g, "M-15 70 C-5 66 5 66 15 70", 2.6, INK);
      el("circle", { cx: 0, cy: 16, r: 9, fill: ACIER, stroke: INK, "stroke-width": 2.4 }, g);
      el("circle", { cx: 0, cy: 16, r: 2.6, fill: INK }, g);
      el("circle", { cx: 0, cy: 4, r: 4.5, fill: "none", stroke: INK, "stroke-width": 2 }, g);
      bas = [0, 118];
    } else if (o.kind === "scie") {
      const cadre = "M-62 58 L-62 10 C-62 3 -56 0 -48 0 L48 0 C56 0 62 3 62 10 L62 58";
      ln(g, cadre, 8, "rgba(28,26,28,.15)", { transform: "translate(5 6)" });
      ln(g, cadre, 6.5, INK); ln(g, cadre, 2.8, ACIER);
      ln(g, "M-62 58 L62 58", 1.8, INK);
      ln(g, "M-56 58 l3 3 l3 -3 l3 3 l3 -3", 1, "#55524B");
      U.shape(C, "poignee", "M-66 58 C-72 70 -78 86 -82 98 C-85 106 -76 110 -72 103 C-66 90 -60 74 -56 62 Z", MAT.wood, { sw: 2.4 });
      el("circle", { cx: 62, cy: 58, r: 4.5, fill: ACIER, stroke: INK, "stroke-width": 1.8 }, g);
      ln(g, "M56 56 L52 50 M68 56 L72 50", 2, INK);
      bas = [0, 106];
    } else {     // équerre : crosse en bois (verticale) + lame d'acier graduée ; pendue par le trou de la crosse
      const crosse = rr(-10, -8, 20, 90, 3), lame = "M10 60 L104 60 L104 76 L10 76 Z";
      sh(crosse + " " + lame);
      el("path", { d: lame, fill: ACIER, stroke: INK, "stroke-width": 2.2 }, g);
      let t = ""; for (let x = 20; x <= 98; x += 8) t += `M${x} 60 L${x} ${(x - 20) % 16 === 0 ? 69 : 65}`;
      ln(g, t, 1.1, INK);
      U.shape(C, "crosse", crosse, MAT.wood, { sw: 2.4, r: 0.4 });
      el("circle", { cx: 0, cy: 0, r: 4.2, fill: "#3A3A37" }, g);
      [44, 68].forEach((y) => el("circle", { cx: 0, cy: y, r: 2.4, fill: ACIER, stroke: INK, "stroke-width": 1.2 }, g));
      bas = [50, 82];
    }
    // la cheville du panneau (par-dessus)
    el("circle", { cx: 0, cy: 0, r: 3.4, fill: "#55524B" }, g);
    return { pivot: [0, 0], bas };
  };
  D.outil.essais = [{ kind: "burin", v: 0 }, { kind: "burin", v: 3 }, { kind: "compas" }, { kind: "scie" }, { kind: "equerre" }];

  /* ───────── D.bon — bon de commande pincé sur le fil (S7, S10, S26) ─────────
   * o = { v: 0 | 1 | 2 } (croquis de la commande : plaque, cachet, cartes) · 56 × 84 · ancrage = la pince sur le fil = pivot de m.sway. */
  D.bon = (g, o) => {
    o = Object.assign({ v: 0, seed: 987 }, o);
    const v = (o.v || 0) % 3, b = el("g", { transform: `rotate(${[-3, 2.5, -1.5][v]})` }, g), C = U.ctx(b, o.seed + v, false, 1);
    ombre(b, rr(-28, 6, 56, 70, 2), 4, 5);
    U.shape(C, "p", rr(-28, 6, 56, 70, 2), MAT.white, { sw: 2.2, r: 0.4 });
    ln(b, "M-21 17 L6 17", 2.6, "#77776F");
    if (v === 0) { el("path", { d: rr(-17, 26, 34, 15, 3), fill: "none", stroke: INK, "stroke-width": 1.6 }, b); [-8, 0, 8].forEach((x) => el("circle", { cx: x, cy: 33.5, r: 1.6, fill: INK }, b)); }
    else if (v === 1) ln(b, "M-4 24 L4 24 L4 32 L13 32 L13 40 L-13 40 L-13 32 L-4 32 Z", 1.6, INK);
    else { el("path", { d: rr(-15, 25, 30, 17, 2), fill: "none", stroke: INK, "stroke-width": 1.6 }, b); ln(b, "M-10 31 L2 31 M-10 36 L8 36", 1.2, "#77776F"); }
    grib(b, -21, 52, 42, { n: 2, pas: 10, seed: v + 3, sw: 1.8 });
    U.shape(C, "pince", rr(-5, -9, 10, 25, 3), MAT.wood, { sw: 2 });
    ln(b, "M-5 3 L5 3", 1.6, INK);
    return { pivot: [0, 0] };
  };
  D.bon.essais = [{ v: 0 }, { v: 1 }, { v: 2 }];

  /* ───────── D.etau — étau d'établi vu de face : mors (avant mobile), corps de fonte, vis à barre et boules, socle boulonné ─────────
   * o = { serre: 0…1 (1 = serré ; ouvert, le mors avant descend de 10 px et laisse voir le mors fixe), barre: degrés (la barre frémit),
   *       partie: "tout" | "corps" (sans la barre) | "barre" (la barre seule : pivot = out.pivot) }
   * Ancrage = milieu du HAUT des mors (S7 : (330, 1035) ; la petite plaque 200 × 84 dépasse au-dessus). 230 × 146. */
  D.etau = (g, o) => {
    o = Object.assign({ serre: 1, barre: 0, partie: "tout", seed: 993 }, o);
    const C = U.ctx(g, o.seed, false, 1), dj = f((1 - clamp(o.serre, 0, 1)) * 10), pv = [0, 82];
    const barre = (gg) => {
      const b = el("g", { transform: `rotate(${f(o.barre || 0)} ${pv[0]} ${pv[1]})` }, gg);
      ln(b, `M-100 ${pv[1]} L100 ${pv[1]}`, 9, INK); ln(b, `M-98 ${pv[1]} L98 ${pv[1]}`, 5, ACIER);
      ln(b, `M-90 ${pv[1] - 1.5} L90 ${pv[1] - 1.5}`, 1.2, "#FFFFFF");
      [-1, 1].forEach((s) => { el("circle", { cx: s * 106, cy: pv[1], r: 11, fill: ACIER, stroke: INK, "stroke-width": 2.4 }, b); ln(b, `M${s * 106 - 6} ${pv[1] - 4} A6 6 0 0 1 ${s * 106} ${pv[1] - 8}`, 1.4, "#FFFFFF"); });
    };
    if (o.partie === "barre") { barre(g); return { pivot: pv }; }
    el("ellipse", { cx: 14, cy: 146, rx: 104, ry: 12, fill: "rgba(28,26,28,.2)" }, g);
    // mors fixe (derrière) puis corps de fonte
    U.shape(C, "fixe", rr(-90, -2, 180, 16, 3), MAT.dark, { sw: 2.2 });
    ombre(g, "M-60 34 L60 34 L52 120 L-52 120 Z", 6, 6);
    U.shape(C, "corps", "M-60 34 L60 34 L52 120 L-52 120 Z", MAT.mid, { sw: 2.8 });
    ln(g, "M-40 44 L-34 112 M40 44 L34 112", 1.6, "#FFFFFF");
    // socle boulonné
    U.shape(C, "socle", rr(-84, 118, 168, 28, 6), MAT.dark, { sw: 2.6 });
    [-64, 64].forEach((x) => {
      let h = ""; for (let i = 0; i < 6; i++) { const a = rad(30 + i * 60); h += (i ? "L" : "M") + f(x + Math.cos(a) * 9) + " " + f(126 + Math.sin(a) * 9); }
      el("path", { d: h + "Z", fill: ACIER, stroke: INK, "stroke-width": 2 }, g);
      el("circle", { cx: x, cy: 126, r: 3, fill: "#9A9A94" }, g);
    });
    // mors avant (mobile) : plaquettes striées, deux vis
    U.shape(C, "mors", rr(-94, dj, 188, 38, 4), MAT.mid, { sw: 2.8 });
    el("path", { d: rr(-88, dj + 3, 176, 11, 2), fill: "#B9B9B3", stroke: INK, "stroke-width": 1.6 }, g);
    let s = ""; for (let x = -84; x <= 84; x += 6) s += `M${x} ${dj + 4} L${x + 3} ${dj + 13}`;
    ln(g, s, 1, "#55524B");
    [-64, 64].forEach((x) => visTete(g, x, dj + 26, 4.2, x > 0 ? 30 : -20, { ombre: false }));
    // bossage de la vis
    el("circle", { cx: 0, cy: pv[1], r: 23, fill: "#B9B9B3", stroke: INK, "stroke-width": 2.6 }, g);
    el("circle", { cx: 0, cy: pv[1], r: 12, fill: ACIER, stroke: INK, "stroke-width": 2.2 }, g);
    if (o.partie !== "corps") barre(g);
    return { pivot: pv, mors: [0, 0], socle: [0, 146] };
  };
  D.etau.essais = [{}, { serre: 0, barre: 14 }, { partie: "barre", barre: -10 }];

  /* ───────── D.casse — casier à lettres en bois, 6 × 3 cases, minuscules lettres de LAITON en vrac (S7) ─────────
   * 260 × 160 · ancrage = centre ; pendu par un cordon à un clou en (0, −114) = pivot. Renvoie { lettres: deux points où poser
   * une étincelle (D.etincelle, s 6), pivot }. */
  D.casse = (g, o) => {
    o = Object.assign({ seed: 995 }, o);
    const C = U.ctx(g, o.seed, false, 1), W = 260, H = 160, x0 = -130, y0 = -80, cw = (W - 20) / 6, ch = (H - 20) / 3;
    ln(g, "M-112 -76 L0 -114 L112 -76", 2.4, "#55524B");
    D.clou(el("g", { transform: "translate(0 -114)" }, g), { r: 5 });
    ombre(g, rr(x0, y0, W, H, 6), 7, 9);
    U.shape(C, "bois", rr(x0, y0, W, H, 6), MAT.wood, { sw: 3 });
    el("path", { d: rr(x0 + 10, y0 + 10, W - 20, H - 20, 2), fill: "#E4E0D2" }, g);
    const LET = "ABDKMRSTENOLPGHIUZ", R = rng(o.seed), pts = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) {
      const cx = x0 + 10 + c * cw + cw / 2, cy = y0 + 10 + r * ch + ch / 2, n = R() < 0.55 ? 1 : 2;
      for (let i = 0; i < n; i++) {
        const x = cx + (n > 1 ? (i - 0.5) * 14 : (R() - 0.5) * 6), y = cy + 7 + (n > 1 ? (i ? 4 : -3) : (R() - 0.5) * 6), a = Math.round((R() - 0.5) * 50);
        const t = txt(g, LET[(r * 6 + c + i * 7) % LET.length], f(x), f(y), 18, { fill: YEL, transform: `rotate(${a} ${f(x)} ${f(y - 6)})` });
        t.setAttribute("stroke", INK); t.setAttribute("stroke-width", "1.4"); t.setAttribute("stroke-linejoin", "round"); t.setAttribute("paint-order", "stroke");
        pts.push([f(x + 4), f(y - 12)]);
      }
    }
    let d = "";
    for (let c = 1; c < 6; c++) d += `M${f(x0 + 10 + c * cw)} ${y0 + 10} L${f(x0 + 10 + c * cw)} ${y0 + H - 10}`;
    for (let r = 1; r < 3; r++) d += `M${x0 + 10} ${f(y0 + 10 + r * ch)} L${x0 + W - 10} ${f(y0 + 10 + r * ch)}`;
    ln(g, d, 5, "#D9D5C6"); ln(g, d, 1.4, INK);
    ln(g, rr(x0 + 10, y0 + 10, W - 20, H - 20, 2), 2, INK);
    return { lettres: [pts[2], pts[pts.length - 4]], pivot: [0, -114] };
  };
  D.casse.essais = [{}];

  /* ───────── D.bloc — bloc de papier collé en tête (S7, S26) : c'est là que le cachet frappe ─────────
   * o = { empreinte: 0…1 (opacité de l'empreinte : cadre + « Dr. » + nom en pointillé + « Arzt »), dr: 0…1 (force de l'encre sur
   *       « Dr. » : 0,6 → 1 quand il bat), onde: indice du point grossi (l'onde qui court), n: 6 points } · 220 × 170 · ancrage = centre.
   * Le pointillé du nom n'est pas « ……… » (caractère absent de Kalam) : ce sont des points dessinés. */
  D.bloc = (g, o) => {
    o = Object.assign({ empreinte: 1, dr: 1, onde: null, n: 6, seed: 997 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    ombre(g, rr(-110, -85, 224, 176, 3), 7, 9);
    ln(g, "M-104 89 L115 89 L115 -76", 1.8, "#9A9A94"); ln(g, "M-100 93 L119 93 L119 -70", 1.3, "#BDBDB6");
    U.shape(C, "f", rr(-110, -85, 220, 170, 3), { base: "#FFFFFF" }, { sw: 2.6, r: 0.4 });
    U.shape(C, "tete", rr(-113, -90, 226, 20, 3), MAT.dark, { sw: 2.4 });
    ln(g, "M-104 -83 L104 -83", 1.2, "#77776F");
    el("path", { d: "M110 62 L110 85 L87 85 Z", fill: "#EDEDE8", stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, g);
    const e = clamp(o.empreinte, 0, 1);
    if (e > 0) {
      const b = el("g", { opacity: f(0.92 * e) }, g), Cb = U.ctx(b, o.seed + 1, false, 1);
      U.stroke(Cb, "o", rr(-92, -50, 184, 122, 12), { sw: 4.5, r: 0.5, single: true });
      ln(b, rr(-84, -42, 168, 106, 8), 1.8, INK);
      txt(b, "Dr.", -74, -2, 34, { anchor: "start", fill: mix("#A9A9A2", INK, clamp(o.dr, 0, 1)) });
      for (let i = 0; i < o.n; i++) { const gros = o.onde != null && o.onde >= 0 && Math.floor(o.onde) === i; el("circle", { cx: f(-14 + i * 15), cy: -12, r: gros ? 4.6 : 2.8, fill: INK }, b); }
      txt(b, "Arzt", 0, 48, 30, {});
      const Rn = rng(o.seed + 5);
      [[-60, -50], [30, -50], [80, 10], [-90, 30], [-20, 72], [50, 72]].forEach(([x, y]) => el("ellipse", { cx: f(x + (Rn() - 0.5) * 10), cy: y, rx: f(3 + Rn() * 3), ry: f(1.8 + Rn() * 1.4), fill: "#FFFFFF" }, b));
    }
    return { centre: [0, 10], dr: [-50, -14] };
  };
  D.bloc.essais = [{ empreinte: 0 }, { empreinte: 1, dr: 0.6, onde: 2 }];

  /* ───────── D.encreur — boîte à encre en fer, couvercle ouvert (S7, S26) ─────────
   * 150 × 78 · ancrage = centre du bas. Renvoie { pad: centre du tampon encreur (où le cachet se pose) }. */
  D.encreur = (g, o) => {
    o = Object.assign({ seed: 999 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    el("ellipse", { cx: 8, cy: 2, rx: 86, ry: 7, fill: "rgba(28,26,28,.18)" }, g);
    // couvercle ouvert, rabattu en arrière : on voit son INTÉRIEUR (clair, avec un rebord), charnière au fond du dessus
    U.shape(C, "couv", "M-70 -40 L70 -40 L80 -84 L-60 -84 Z", MAT.grey, { sw: 2.6 });
    el("path", { d: "M-60 -44 L60 -44 L68 -78 L-52 -78 Z", fill: "#F0F0EB", stroke: "#8A8A84", "stroke-width": 1.4 }, g);
    ln(g, "M-46 -70 L52 -70", 1.3, "#FFFFFF");
    [-44, 44].forEach((x) => el("path", { d: rr(x - 9, -44, 18, 7, 2), fill: "#9A9A94", stroke: INK, "stroke-width": 1.4 }, g));
    el("path", { d: "M-75 -24 L75 -24 L70 -40 L-70 -40 Z", fill: ACIER, stroke: INK, "stroke-width": 2.4, "stroke-linejoin": "round" }, g);
    el("path", { d: "M-64 -27 L64 -27 L60 -37 L-60 -37 Z", fill: "#2E2C28", stroke: INK, "stroke-width": 1.4 }, g);
    ln(g, "M-48 -33 L-12 -33", 1.4, "#6E6E68");
    U.shape(C, "face", rr(-75, -24, 150, 24, 3), MAT.mid, { sw: 2.6 });
    ln(g, "M-68 -18 L68 -18", 1.2, "#FFFFFF");
    return { pad: [0, -32] };
  };
  D.encreur.essais = [{}];

  /* ───────── D.cartes — cartes de visite en éventail sur un petit socle (S7) ─────────
   * o = { dr: 0…1 (force de l'encre sur « Dr. »), onde, n: 5 } · 168 × 124 · ancrage = centre du bas.
   * La carte de devant porte « Dr. » + le nom en pointillé + deux lignes de gribouillis : rien d'autre (exemple, plaquette Beispiel). */
  D.cartes = (g, o) => {
    o = Object.assign({ dr: 1, onde: null, n: 5, seed: 1001 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    el("ellipse", { cx: 8, cy: 2, rx: 90, ry: 7, fill: "rgba(28,26,28,.18)" }, g);
    [-13, -6].forEach((a, i) => {
      const b = el("g", { transform: `rotate(${a} 0 -14)` }, g);
      el("path", { d: rr(-70, -104, 140, 86, 4), fill: i ? "#FAFAF6" : "#F0F0EB", stroke: INK, "stroke-width": 2 }, b);
      ln(b, "M-56 -86 L-20 -86", 2, "#C9C9C1");
    });
    const fr = el("g", { transform: "rotate(3 0 -14)" }, g), Cf = U.ctx(fr, o.seed + 2, false, 1);
    ombre(fr, rr(-70, -108, 140, 88, 4), 3, 4);
    U.shape(Cf, "c", rr(-70, -108, 140, 88, 4), MAT.white, { sw: 2.4, r: 0.4 });
    txt(fr, "Dr.", -58, -78, 24, { anchor: "start", fill: mix("#A9A9A2", INK, clamp(o.dr, 0, 1)) });
    for (let i = 0; i < o.n; i++) { const gros = o.onde != null && o.onde >= 0 && Math.floor(o.onde) === i; el("circle", { cx: f(-16 + i * 11), cy: -85, r: gros ? 3.6 : 2.2, fill: INK }, fr); }
    ln(fr, "M-58 -70 L58 -70", 1.2, "#9A9A94");
    grib(fr, -58, -56, 104, { n: 2, pas: 12, sw: 1.6, seed: 9 });
    U.shape(C, "socle", "M-80 -20 L80 -20 L86 0 L-86 0 Z", MAT.wood, { sw: 2.6 });
    ln(g, "M-66 -14 L66 -14", 2.2, INK);
    return { carte: [0, -64], dr: [-44, -86] };
  };
  D.cartes.essais = [{}, { dr: 0.6, onde: 1 }];

  /* ───────── D.loupe — lampe-loupe sur bras articulé (S7, S10, S26) ─────────
   * o = { vers: [120, 130] (centre de la lentille depuis le pied), r: 60 (lentille), L: 130 (longueur de chaque segment) }
   * Ancrage = le pied (platine murale) = pivot de m.sway 1°. Le bras rejoint la tête par son côté haut-gauche et le coude monte
   * à droite : avec le pied en (150, 600), le coude est vers (274, 561) — sous la zone nue de la pastille (y ≤ 535).
   * Renvoie { tete: centre de la lentille, coude }. */
  D.loupe = (g, o) => {
    o = Object.assign({ vers: [120, 130], r: 60, L: 130, seed: 1003 }, o);
    const C = U.ctx(g, o.seed, false, 1), r = o.r, V = o.vers, rb = r + 14;
    const E2 = [V[0] - 0.707 * rb, V[1] - 0.707 * rb], d = Math.hypot(E2[0], E2[1]), u = [E2[0] / d, E2[1] / d];
    const hh = Math.sqrt(Math.max(0, o.L * o.L - (d / 2) * (d / 2))), E = [f(E2[0] / 2 + u[1] * hh), f(E2[1] / 2 - u[0] * hh)];
    const bras = `M0 0 L${E[0]} ${E[1]} L${f(E2[0])} ${f(E2[1])}`;
    // ombres
    ln(g, bras, 10, "rgba(28,26,28,.14)", { transform: "translate(8 10)" });
    el("circle", { cx: V[0] + 8, cy: V[1] + 10, r: rb, fill: "rgba(28,26,28,.14)" }, g);
    // platine murale
    U.shape(C, "plat", rr(-15, -30, 30, 60, 6), MAT.mid, { sw: 2.4 });
    visTete(g, 0, -20, 3.4, 20, { ombre: false }); visTete(g, 0, 20, 3.4, -30, { ombre: false });
    // bras : deux tiges parallèles + ressort sur le premier segment
    ln(g, bras, 10, INK); ln(g, bras, 5.5, ACIER);
    const n1 = [-E[1] / o.L, E[0] / o.L]; let rs = "";
    for (let i = 0; i <= 12; i++) { const t = 0.25 + (i / 12) * 0.5, s = i % 2 ? 7 : -7; rs += (i ? "L" : "M") + f(E[0] * t + n1[0] * s) + " " + f(E[1] * t + n1[1] * s); }
    ln(g, rs, 1.6, INK);
    [[0, 0, 10], [E[0], E[1], 11], [E2[0], E2[1], 8]].forEach(([x, y, rr2]) => { el("circle", { cx: f(x), cy: f(y), r: rr2, fill: ACIER, stroke: INK, "stroke-width": 2.4 }, g); el("circle", { cx: f(x), cy: f(y), r: 3, fill: INK }, g); });
    // tête : couronne (la lampe annulaire) + lentille
    U.shape(C, "cour", cercle(V[0], V[1], rb), MAT.mid, { sw: 2.8 });
    el("circle", { cx: V[0], cy: V[1], r, fill: "#EEF3F4", stroke: INK, "stroke-width": 2.6 }, g);
    el("circle", { cx: V[0], cy: V[1], r: r - 8, fill: "none", stroke: "#FFFFFF", "stroke-width": 2, opacity: 0.8 }, g);
    ln(g, `M${f(V[0] - r * 0.6)} ${f(V[1] - r * 0.15)} A${f(r * 0.62)} ${f(r * 0.62)} 0 0 1 ${f(V[0] - r * 0.15)} ${f(V[1] - r * 0.6)}`, 5, "#FFFFFF", { opacity: 0.9 });
    el("path", { d: rr(V[0] + rb * 0.62 - 6, V[1] - rb * 0.62 - 6, 14, 10, 3), fill: "#4A4A46", stroke: INK, "stroke-width": 1.6, transform: `rotate(45 ${f(V[0] + rb * 0.62)} ${f(V[1] - rb * 0.62)})` }, g);
    return { tete: [V[0], V[1]], coude: E, pied: [0, 0] };
  };
  D.loupe.essais = [{}];

  /* Suite de l'inventaire (S8 et après) : decor-2.js, decor-3.js.
   * Ces deux fichiers utilisent D.util. index.html les charge APRÈS decor.js, mais tools/essai_decor.mjs les charge par ordre
   * alphabétique (decor-2.js avant decor.js) : un fichier chargé trop tôt se met en attente dans D._apres, lancé ici. */
  (D._apres || []).splice(0).forEach((init) => init());
})();
