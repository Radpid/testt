/* decor.js — AKTE 04 « 63 ساعة » : décors et objets PROPRES à l'épisode, 1re partie (aucun dessin repris d'un autre épisode).
 * Suite dans decor-2.js (scènes 7 à 20) et decor-3.js (scènes 21 à 25). decor-2/3 attendent D.kit (D._later) : l'outil d'essai les charge
 * avant ce fichier (tri alphabétique). Référence : storyboard.md § 2 (inventaire) — il fait foi.
 * Essai de chaque dessin, seul, sur une planche : node tools/essai_decor.mjs videos/akte-koeln-transfusion [--only nom1,nom2]
 *   D.nom.essais = [{ … }, { … }] : jeux de paramètres montrés sur la planche.
 * Convention : D.nom(g, o) dessine dans le groupe SVG g autour de son ancrage (0,0) ; o = paramètres animés (valeurs arrondies : le moteur
 * ne redessine que si o change) ; la fonction peut renvoyer des ancres, lues ensuite dans node.out. Ombre décalée #D2D2CB (6–8 px).
 * Couleurs : encre #1C1A1C, gris hachurés, jaune #F8CE4E, ROUGE SANG #B5332D / #8E1F1C sur le sang seulement (poches, tubulure). Aucun bleu.
 * Texte « machine à écrire » : aide tw() (même pile de polices que la classe .tw d'index.html, chasse fixe 0,6 em).
 * Aides partagées avec decor-2.js / decor-3.js : window.EpDecor.kit = { el, ln, tw, MAT, mixc, hs, sample, lens, cut, at, rollWindow, gear, pin, circ… }.
 *
 * ── INVENTAIRE COMPLET (storyboard § 2) et état ──────────────────────────────────────────────────────────────────────────────
 * A. Dispositifs signature
 *    1  D.rollCounter ............ fait (decor.js)   compteur à rouleaux (HUD : bloc A « WOCHE », bloc B « NOTDIENST 24 h » avec plate: true)
 *    2  D.bloodBag ............... fait (decor.js)   poche de sang (aucune lettre) ; ancres out, label, eye
 *    3  D.tube ................... fait (decor.js)   tubulure + chambre compte-gouttes + roulette
 *    4  D.hourGrid ............... fait (decor.js)   grille vide (frise 21 × 3, garde 12 × 2, mini 7 × 3, filigrane de la scène 5)
 *    5  D.hourCol ................ fait (decor.js)   une colonne de cases noircies
 *    6  D.dutyBoard .............. fait (decor.js)   tableau de garde (+ D.magnet, D.feltPen à part)
 *    7  D.pinCard ................ fait (decor.js)   fiche à coin corné + punaise jaune
 *    8  D.magnetStrip ............ fait (decor.js)   bandeau magnétique « 24-Stunden-Notdienst »
 *    9  D.dayTab ................. fait (decor.js)   onglet du jour (HUD)
 *    10 D.loopTag ................ fait (decor.js)   rond jaune « ؟ » au bout d'une ficelle
 *    11 D.rewindMark ............. fait (decor.js)   « ◀◀ » (+ D.scanLines : lignes de balayage plein cadre)
 * B. Tribunal
 *    12 D.courtRoom .............. fait (decor.js)   ·  D.wardRoom (la chambre ; o.band false = mur nu, sc. 16) ... fait (decor-2.js)
 *    13 D.tallWindow, D.lightShaft  fait (decor.js)
 *    14 D.plaque04 ............... fait (decor.js)
 *    15 D.bench04 ................ fait (decor.js)   (+ D.carafe, D.glass à part pour l'eau qui frémit)
 *    16 D.dock ................... fait (decor.js)   (+ D.tissueBox, D.glass à part)
 *    16b D.dockTable ............. fait (decor.js)
 *    17 D.scale04, D.scaleGeom ... fait (decor.js)   la balance (part: "base" | "beam" pour ne redessiner que le fléau et les plateaux)
 *    18 D.guiltBlock ............. fait (decor.js)
 *    19 D.slab ................... fait (decor-2.js)   150 × 26 (largeur du bloc), icon hours | licence | twins | sheet
 *    20 D.coreWeight ............. fait (decor-2.js)   (+ D.checkIcon : pictogramme poche + loupe, sc. 19)
 *    21 D.weight90 ............... fait (decor-2.js)   pointillés, console ; étiquette = D.stringTag (à part pour tomber)
 *    22 D.folder ................. fait (decor.js)
 *    23 D.pebble ................. fait (decor-2.js)   crack | leaf (feuille d'arbre, pas de calendrier) | coat
 *    24 D.cart ................... fait (decor-2.js)   part body | wheels
 *    25 D.loupeSmall ............. fait (decor-2.js)   ·  D.caseFile, D.deskLamp ........... fait (decor-3.js)
 *    25b D.typedCard ............. fait (decor.js)
 * C. Hôpital
 *    26 D.labHatch ............... fait (decor-2.js)   part inside | shutter | front ; + D.labSign (enseigne qui grésille) ; voyant = D.callLight
 *    27 D.rack ................... fait (decor-2.js)
 *    28 D.docSheet ............... fait (decor-2.js)   o.blur = filtre CSS (il marche sur un <g>)
 *    29 D.corridor04, D.callLight, D.sconce  fait (decor.js)   (scène 6 : le mur long, sans porte ; portes et voyants prêts pour 7, 8, 14)
 *    30 D.clock04 ................ fait (decor-2.js)   part face | hands
 *    31 D.bedBack04, D.bedFront04, D.wristband  fait (decor-2.js)   bedFront04 part duvet | frame
 *    32 D.ivPole ................. fait (decor-2.js)   (+ D.ivHook : le crochet vide, à part pour m.pend)
 *    33 D.nightstand04 ........... fait   ·  33b D.nightWindow (part frame | sky) + D.lightPatch ... fait   ·  33c D.kidneyDish ... fait (decor-2.js)
 *    34 D.loupe .................. fait (decor-2.js)   (+ D.groupMark « 0 » / « A », D.womanIcon : annotations de la scène 12)
 *    35 D.officeBack, D.blinds, D.binders  fait (decor-2.js)   (+ D.blindLight, D.plant04, D.binderSpine)
 *    36 D.desk04 ................. fait (decor-2.js)
 *    37 D.chairBack .............. fait (decor-2.js)
 *    38 D.suitArm ................ fait (decor-2.js)
 *    39 D.formSheet, D.pen ....... fait (decor.js)   ·  D.binderLying ........... fait (decor-2.js)
 *    40 D.chair04, D.coatRack, D.seasonWindow  fait (decor-2.js)   (+ D.coatHung : la blouse, à part pour m.sway)
 *    41 D.staffCard, D.monthCell, D.licenceCard  fait (decor-2.js)
 *    42 D.bedIcon ................ fait (decor-2.js)   ·  D.ruleCard, D.lessonCard, D.bedsideCard, D.sampleTube ... fait (decor-3.js)
 *    43 D.cernes ................. fait (decor.js)
 *    44 D.pillar, D.stetho, D.adminDoor, D.frame04  fait (decor-2.js)   (+ D.doorPlate, à part pour pulser)
 *    45 D.rhine, D.dom, D.riverWaves  fait (decor.js)
 *    46 D.rewKey, D.pageFlip, D.dripBig  fait (decor-3.js)
 * Hors inventaire, demandés par les scènes 3 et 5 : D.note04 (note épinglée), D.hookKey (clé au crochet), D.markerString (feutre
 *    sur ficelle), D.magnet, D.feltPen, D.wallBar (barre murale à deux crochets), D.glint (reflet qui glisse sur le cadre alu du tableau,
 *    scènes 3 et 6) ........ fait (decor.js)
 * Réglages ajoutés au contrôle (étape « socle et décors 1 », 26.11) : D.courtRoom / D.corridor04 o.bottom + o.fade (le sol se prolonge et
 *    se fond dans le papier ; scène 1 : bottom 1610 pour que la sellette et la barre restent posées) et fuyantes découpées au mur ;
 *    D.tube o.k (×1,4 à côté des poches ×1,5 de la scène 5) ; D.dayTab o.blur / o.streak (chiffres qui défilent pendant le rembobinage,
 *    texte long rétréci : « ◀◀ » + 15 signes tient dans l'onglet) ; D.folder o.page (le juge tourne une page, scène 2) ; D.hourGrid trait
 *    moins tremblé pour les cases de 16 px ; D.hookKey anneau passé dans la clé ; D.folder sangle hors de l'étiquette.
 *    Scène 2 : lignes de la carte tapée à y −56, −22, 14, 46 (repère de la carte) et tampon « § 60 » à (130, 88) : voir D.typedCard.essais.
 * Étape « décors 2 » (26.11) : decor-2.js = tout ce que demandent les scènes 7 à 20 (voir son en-tête : pièces animées o.part, pièces à
 *    part pour m.pend / m.sway) ; kit + segX et floorFade ; décors à l'échelle contrôlés avec Persona (lit + patient assis, chaise + sitEdge,
 *    potence + main levée, fauteuil + manche, balance + chariot) ; écarts et placements à revoir : storyboard.md, « Écarts de construction ».
 * Étape « décors 3, HUD, mises en place » (27.11) : decor-3.js complet (scènes 21–25 ; l'affiche réutilise D.rollCounter) ; grep des D.xxx
 *    du storyboard : TOUS définis (D.scaleGeom est une fonction non énumérable de decor.js ; « D.nom » n'est qu'un exemple de syntaxe).
 *    Le patient assis dans le lit : X.aides.ppBed (Persona sans les jambes, sinon ses pieds dépassaient sous le lit).
 * D.exemple (dessin d'exemple du gabarit) ......... abandonné : supprimé, plus aucune scène ne l'utilise.
 */
(function () {
  "use strict";
  const SC = SketchCast, U = SC.util, NS = "http://www.w3.org/2000/svg";
  const INK = "#1C1A1C", YEL = "#F8CE4E", SH = "#D2D2CB", PAPER = "#F7F7F1", RED = "#B5332D", RED2 = "#8E1F1C";
  const MAT = Object.assign({}, SC.MAT, (window.Persona && Persona.MAT) || {}, {
    wood: { base: "#E9E9E3", hatch: "#ABABA4", gap: 7, fw: 1.1 },
    dark: { base: "#4A4A46", hatch: INK, gap: 4, fw: 1.6 },
    light: { base: "#F0F0EB", hatch: "#BDBDB6", gap: 6.5, fw: 1.1 },
    brass: { base: YEL, hatch: "#D9A322", gap: 4.6, fw: 1.3 },
    alu: { base: "#E6E6E1", hatch: "#B4B4AE", gap: 5, fw: 1.1 },
    stone: { base: "#77776F", hatch: "#2B2A2B", gap: 4.6, fw: 1.3 },
    blood: { base: RED, hatch: RED2, gap: 5, fw: 1.3 },
  });
  const el = (tag, a, p) => { const n = document.createElementNS(NS, tag); for (const k in a || {}) if (a[k] != null) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; };
  const f = (v) => Math.round(v * 10) / 10, clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, t) => a + (b - a) * t;
  const hs = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };                 // bruit déterministe 0..1
  const ln = (g, d, w, c, extra) => el("path", Object.assign({ d, fill: "none", stroke: c || INK, "stroke-width": w || 2, "stroke-linecap": "round", "stroke-linejoin": "round" }, extra), g);
  const circ = (cx, cy, r) => `M${f(cx - r)} ${f(cy)} A${r} ${r} 0 1 1 ${f(cx + r)} ${f(cy)} A${r} ${r} 0 1 1 ${f(cx - r)} ${f(cy)} Z`;
  const rgb = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  const mixc = (a, b, t) => { const A = rgb(a), B = rgb(b); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * clamp(t, 0, 1)).toString(16).padStart(2, "0")).join(""); };
  const TW = "'AKTE Mono', 'Liberation Mono', 'DejaVu Sans Mono', monospace";
  const tw = (g, s, x, y, size, o) => U.text(g, s, x, y, size, Object.assign({ font: TW, weight: 700 }, o));            // machine à écrire : 0,6 em par signe
  const D = window.EpDecor = window.EpDecor || {};

  // courbe lissée (Catmull-Rom) échantillonnée en n segments ; longueurs cumulées ; morceau [a, b] ; point à la longueur s
  function sample(pts, n) {
    const out = [], m = pts.length - 1;
    for (let i = 0; i <= n; i++) {
      const u = (i / n) * m, k = Math.min(m - 1, Math.floor(u)), t = u - k;
      const p0 = pts[Math.max(0, k - 1)], p1 = pts[k], p2 = pts[k + 1], p3 = pts[Math.min(m, k + 2)];
      const c = (a, b, c2, d) => 0.5 * (2 * b + (-a + c2) * t + (2 * a - 5 * b + 4 * c2 - d) * t * t + (-a + 3 * b - 3 * c2 + d) * t * t * t);
      out.push([c(p0[0], p1[0], p2[0], p3[0]), c(p0[1], p1[1], p2[1], p3[1])]);
    }
    return out;
  }
  const lens = (P) => { const L = [0]; for (let i = 1; i < P.length; i++) L.push(L[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1])); return L; };
  function at(P, L, s) {
    s = clamp(s, 0, L[L.length - 1]); let i = 1; while (i < L.length - 1 && L[i] < s) i++;
    const t = (s - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]);
    return [lerp(P[i - 1][0], P[i][0], t), lerp(P[i - 1][1], P[i][1], t), Math.atan2(P[i][1] - P[i - 1][1], P[i][0] - P[i - 1][0])];
  }
  function cut(P, L, a, b) {
    const out = [at(P, L, a)]; for (let i = 0; i < P.length; i++) if (L[i] > a && L[i] < b) out.push(P[i]); out.push(at(P, L, b)); return out;
  }
  const poly = (pp) => "M" + pp.map((p) => f(p[0]) + " " + f(p[1])).join(" L");

  // punaise (ou aimant vu de face)
  function pin(g, x, y, r, col) {
    r = r || 11;
    el("ellipse", { cx: x + 4, cy: y + 6, rx: r, ry: f(r * 0.8), fill: "rgba(28,26,28,.22)" }, g);
    el("circle", { cx: x, cy: y, r, fill: col || YEL, stroke: INK, "stroke-width": 2.4 }, g);
    el("circle", { cx: x, cy: y, r: f(r * 0.42), fill: "none", stroke: INK, "stroke-width": 1.3, opacity: 0.55 }, g);
    ln(g, `M${f(x - r * 0.58)} ${f(y - r * 0.25)} A${f(r * 0.65)} ${f(r * 0.65)} 0 0 1 ${f(x - r * 0.05)} ${f(y - r * 0.62)}`, 2.2, "#FFFFFF");
  }
  // segment (xa, ya) → (xb, yb) découpé à la bande verticale [x0, x1] (fuyantes du sol) ; null s'il en sort
  function segX(xa, ya, xb, yb, x0, x1) {
    let t0 = 0, t1 = 1; const dx = xb - xa;
    if (Math.abs(dx) < 1e-6) { if (xa < x0 || xa > x1) return null; }
    else { const ta = (x0 - xa) / dx, tb = (x1 - xa) / dx; t0 = Math.max(t0, Math.min(ta, tb)); t1 = Math.min(t1, Math.max(ta, tb)); if (t0 >= t1) return null; }
    return `M${f(xa + dx * t0)} ${f(ya + (yb - ya) * t0)} L${f(xa + dx * t1)} ${f(ya + (yb - ya) * t1)}`;
  }
  // bas d'un sol : fondu vers le papier (bandes empilées, aucun id de dégradé : l'affiche-résumé recopie le SVG)
  function floorFade(g, x0, w, y, h) {
    h = h == null ? 70 : h; if (h <= 0) return;
    for (let i = 0; i < 7; i++) el("rect", { x: x0, y: f(y - h + (i * h) / 7), width: w, height: f(h / 7 + 0.6), fill: PAPER, opacity: f((0.14 * (i + 1)) * 100) / 100 }, g);
    el("rect", { x: x0, y, width: w, height: 3, fill: PAPER }, g);
  }
  // roue crantée
  function gear(g, cx, cy, r, ang, ink) {
    const pts = [], n = 8, ri = r * 0.74;
    for (let i = 0; i < n; i++) [[-13, ri], [-7, r], [7, r], [13, ri]].forEach(([da, rr]) => { const a = (ang + i * 360 / n + da) * Math.PI / 180; pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]); });
    el("path", { d: poly(pts) + " Z", fill: "#FFFFFF", stroke: ink || INK, "stroke-width": 1.8, "stroke-linejoin": "round" }, g);
    el("circle", { cx, cy, r: f(r * 0.3), fill: "none", stroke: ink || INK, "stroke-width": 1.6 }, g);
    const a = ang * Math.PI / 180; el("circle", { cx: f(cx + r * 0.52 * Math.cos(a)), cy: f(cy + r * 0.52 * Math.sin(a)), r: 1.9, fill: ink || INK }, g);
  }
  /* fenêtre à rouleau : un chiffre qui défile (v flottant : la partie décimale décale le chiffre vers le haut et fait entrer le suivant
   * par le bas) ; o.blur 0..1 = chiffre remplacé par 5 traits qui défilent (o.streak = phase, décroissante = à l'envers) */
  function rollWindow(g, x, y, w, h, v, o) {
    o = o || {}; const size = o.size || Math.round(h * 0.82), blur = clamp(o.blur || 0, 0, 1), ink = o.ink || INK;
    const s = el("svg", { x, y, width: w, height: h, viewBox: `0 0 ${w} ${h}`, overflow: "hidden" }, g);
    el("rect", { x: 0, y: 0, width: w, height: h, fill: o.bg || "#FFFFFF" }, s);
    const base = h / 2 + size * 0.35;
    if (blur < 0.98) {
      const d = Math.floor(v), fr = v - d, gg = el("g", { opacity: f(1 - blur) }, s);
      [0, 1].forEach((k) => { if (k && fr < 0.01) return; tw(gg, String((((d + k) % 10) + 10) % 10), w / 2, f(base + (k - fr) * h), size, { fill: ink }); });
    }
    if (blur > 0.02) {
      const gg = el("g", { opacity: f(blur) }, s), ph = o.streak || 0;
      for (let i = 0; i < 5; i++) {
        const u = (((i / 5 + ph + (o.k || 0) * 0.13) % 1) + 1) % 1, ww = w * (0.36 + 0.5 * hs(i * 3 + (o.k || 0) * 7));
        el("rect", { x: f((w - ww) / 2 + (hs(i + 9) - 0.5) * 6), y: f(u * (h + 10) - 7), width: f(ww), height: 4.6, rx: 2.3, fill: ink, opacity: f(0.4 + 0.45 * hs(i * 5 + 1)) }, gg);
      }
    }
    [[0, 0.2, 0.12], [0, 0.08, 0.16], [0.8, 0.2, 0.12], [0.92, 0.08, 0.16]].forEach(([ky, kh, op]) => el("rect", { x: 0, y: f(h * ky), width: w, height: f(h * kh), fill: INK, opacity: op }, s));   // le cylindre : bords ombrés
    el("rect", { x, y, width: w, height: h, rx: 4, fill: "none", stroke: ink, "stroke-width": o.sw || 2.6 }, g);
  }

  /* ═════════════════════════ A. DISPOSITIFS SIGNATURE ═════════════════════════ */

  /* 1 · compteur mécanique à rouleaux — ancrage : coin haut gauche ; 150 × 80 (2 fenêtres), 190 × 80 avec prefix "+>"
   * o.digits [d1, d2] flottants · o.blur, o.streak · o.lit (« > » en jaune) · o.flash 0..1 (fenêtres jaunes) · o.tick (angle de la roue, °)
   * o.dead 0..1 (tout vire au gris pâle) · o.plate (platine boulonnée à gauche : relie le bloc B au bloc A) · o.wheel, o.label, o.unit, o.n */
  D.rollCounter = (g, o = {}) => {
    o = Object.assign({ n: 2, digits: [0, 0], label: "WOCHE", unit: "h", prefix: "", wheel: true, tick: 0, blur: 0, streak: 0, lit: 0, flash: 0, dead: 0, plate: false, shadow: true, seed: 101 }, o);
    const pw = o.prefix ? o.prefix.length * 19 + 2 : 0, W = o.w || 12 + pw + o.n * 48 - 4 + (o.unit ? 34 : 0) + 12, H = 80, dead = clamp(o.dead, 0, 1);
    const ink = dead > 0 ? mixc(INK, "#A3A39C", dead) : INK, body = U.rrect(0, 0, W, H, 10), C = U.ctx(g, o.seed, false, 1);
    if (o.shadow) el("path", { d: body, fill: SH, transform: "translate(6 7)" }, g);
    if (o.plate) {
      el("path", { d: U.rrect(-15, 21, 30, 38, 5), fill: dead > 0.5 ? "#E4E4DF" : "#CFCFCA", stroke: ink, "stroke-width": 2.2 }, g);
      [31, 49].forEach((y, i) => { el("circle", { cx: -8, cy: y, r: 3.4, fill: "#F4F4EF", stroke: ink, "stroke-width": 1.5 }, g); ln(g, `M${-10 + i} ${y - 2} L${-6 - i} ${y + 2}`, 1.3, ink); });
    }
    U.shape(C, "box", body, dead > 0.5 ? MAT.light : MAT.grey, { sw: 2.8, stroke: ink });
    [[7, 7], [W - 7, 7], [7, H - 7], [W - 7, H - 7]].forEach(([x, y], i) => {   // 4 vis, fente tournée différemment
      const a = (20 + i * 47) * Math.PI / 180; el("circle", { cx: x, cy: y, r: 3.3, fill: "#F4F4EF", stroke: ink, "stroke-width": 1.4 }, g);
      ln(g, `M${f(x - 2.4 * Math.cos(a))} ${f(y - 2.4 * Math.sin(a))} L${f(x + 2.4 * Math.cos(a))} ${f(y + 2.4 * Math.sin(a))}`, 1.2, ink);
    });
    if (o.label) tw(g, o.label, 16, 14.5, 12, { anchor: "start", fill: dead > 0 ? ink : "#2E2C29", ls: 0.4 });
    const wy = o.label || o.wheel ? 19 : 12, wins = [];
    [...o.prefix].forEach((ch, i) => {
      const cx = 12 + 9.5 + i * 19;
      if (ch === ">" && o.lit) el("circle", { cx, cy: wy + 28, r: 11, fill: dead > 0.5 ? "#DADAD4" : YEL, stroke: ink, "stroke-width": 1.6 }, g);
      tw(g, ch, cx, wy + 37, 26, { fill: ink });
    });
    for (let i = 0; i < o.n; i++) {
      const wx = 12 + pw + i * 48;
      rollWindow(g, wx, wy, 44, 56, (o.digits && o.digits[i]) || 0, { blur: o.blur, streak: o.streak, k: i, ink, bg: o.flash > 0.02 && dead < 0.5 ? mixc("#FFFFFF", YEL, o.flash) : "#FFFFFF" });
      wins.push([wx + 22, wy + 28]);
    }
    if (o.unit) U.text(g, o.unit, 12 + pw + o.n * 48 + 15, wy + 47, 30, { fill: ink });
    if (o.wheel) gear(g, W - 21, 19, 11, o.tick, ink);
    if (dead > 0.02) el("path", { d: body, fill: PAPER, opacity: f(0.38 * dead) }, g);
    return { w: W, h: H, wins, wheel: [W - 21, 19] };
  };
  D.rollCounter.essais = [{ digits: [6, 3], tick: 20 }, { digits: [3.5, 7.5], tick: 65 }, { blur: 1, streak: 0.3 }, { n: 2, prefix: "+>", label: "NOTDIENST 24 h", digits: [1, 2], lit: 1, wheel: false, plate: true },
    { digits: [6, 3], dead: 1 }, { digits: [6, 3], flash: 1 }, { n: 1, unit: "", label: "", wheel: false, blur: 1, streak: 0.6 }];

  /* 2 · poche de sang — ancrage : l'œillet ; corps 110 × 170, embouts jusqu'à y 196 ; AUCUNE lettre (ni « A » ni « 0 »)
   * o.level 0..1 · o.sway (phase de l'onde de surface) · o.slope (° : la surface reste horizontale quand la poche penche)
   * o.tint 1 = rouge sang, 0 = gris · o.empty (poche plate, plis) · o.tick (coche manuscrite) · o.ghost (cadre pointillé vide du groupe) · o.peg */
  D.bloodBag = (g, o = {}) => {
    o = Object.assign({ level: 0.92, tint: 1, sway: 0, slope: 0, empty: 0, tick: 0, ghost: 1, peg: true, shadow: true, seed: 201 }, o);
    const C = U.ctx(g, o.seed, false, 1), e = o.empty ? 1 : 0, px = e ? 49 : 55;
    const body = `M-34 16 L34 16 C50 18 55 30 55 46 Q${px} 98 55 150 C55 164 46 170 34 170 L-34 170 C-46 170 -55 164 -55 150 Q${-px} 98 -55 46 C-55 30 -50 18 -34 16 Z`;
    const flange = U.rrect(-24, -14, 48, 36, 9), col = mixc("#CFCFC9", RED, o.tint), hat = mixc("#8F8F89", RED2, o.tint);
    if (o.shadow) { el("path", { d: body, fill: SH, transform: "translate(7 8)" }, g); el("path", { d: flange, fill: SH, transform: "translate(7 8)" }, g); }
    // deux embouts : la sortie (au centre, vers la tubulure) et un embout bouché
    U.shape(C, "p2", U.rrect(-34, 164, 13, 18, 3), MAT.white, { sw: 2 }); U.shape(C, "p2c", U.rrect(-36, 178, 17, 9, 3), MAT.mid, { sw: 1.8 });
    U.shape(C, "p1", U.rrect(-7, 164, 14, 26, 3), MAT.white, { sw: 2.2 }); U.shape(C, "p1c", U.rrect(-9.5, 186, 19, 10, 3), MAT.grey, { sw: 2 });
    // bride percée d'un œillet
    U.shape(C, "fl", flange, MAT.light, { sw: 2.4 });
    el("circle", { cx: 0, cy: 0, r: 6.8, fill: PAPER, stroke: INK, "stroke-width": 2.2 }, g);
    if (o.peg) { el("circle", { cx: 0, cy: -1.5, r: 3.6, fill: INK }, g); el("circle", { cx: -1.2, cy: -2.6, r: 1.1, fill: "#FFFFFF" }, g); }
    U.shape(C, "body", body, { base: "#FCFCF9" }, { sw: 2.8 });
    // le sang
    if (!e && o.level > 0.02) {
      const ys = 160 - 126 * clamp(o.level, 0, 1), sl = Math.tan(-o.slope * Math.PI / 180), xw = ys < 150 ? 47 : 40, top = [];
      for (let i = 0; i <= 8; i++) { const x = -xw + (i * 2 * xw) / 8; top.push([x, ys + x * sl + 2.4 * Math.sin(i * 1.5 + o.sway)]); }
      const d = poly(top) + (ys < 150 ? " L47 151 Q47 163 35 163 L-35 163 Q-47 163 -47 151 Z" : " Q44 163 34 163 L-34 163 Q-44 163 -40 " + f(ys) + " Z");
      U.shape(C, "blood", d, { base: col, hatch: hat, gap: 5, fw: 1.3 }, { sw: 1.4, stroke: hat, r: 0.6 });
      ln(g, poly(top), 2.2, hat);
    }
    if (e) {   // poche vidée : un fond de sang, des plis
      el("path", { d: "M-41 157 Q0 150 41 158 Q40 163 34 163 L-34 163 Q-41 163 -41 157 Z", fill: col, opacity: 0.6 }, g);
      ["M-40 44 L-14 150", "M24 36 L43 118", "M-22 128 L28 158", "M4 30 L-8 62"].forEach((d) => ln(g, d, 1.5, "#9A9A94"));
    }
    el("path", { d: U.rrect(-48, 23, 96, 141, 13), fill: "none", stroke: "rgba(28,26,28,.3)", "stroke-width": 1.3, "stroke-dasharray": "5 4" }, g);   // soudure
    // étiquette : quatre traits illisibles + code-barres, et la place du groupe… vide
    el("path", { d: U.rrect(-35, 63, 70, 58, 4), fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g);
    [[73, 6], [81, -2], [89, 27], [97, 15]].forEach(([y, x1]) => ln(g, `M-29 ${y} L${x1} ${y}`, 2.6, "#9A9A94"));
    let bx = -28; [2, 1, 3, 1, 2, 1, 1, 3, 2, 1].forEach((w, i) => { el("rect", { x: f(bx), y: 104, width: f(w * 1.7), height: 12, fill: INK }, g); bx += w * 1.7 + [2, 2, 1, 3, 1, 2, 2, 1, 2, 0][i] * 1.7; });
    if (o.ghost > 0.02) el("rect", { x: 12, y: 67.5, width: 19, height: 18, rx: 2, fill: "none", stroke: "#6E6E68", "stroke-width": 1.6, "stroke-dasharray": "3.5 3", opacity: f(o.ghost) }, g);
    if (o.tick) ln(g, "M-24 94 L-9 112 L27 68", 6.5, INK);
    ln(g, "M-46 46 Q-50 96 -46 142", 4.5, "#FFFFFF", { opacity: 0.8 });   // reflet
    return { out: [0, 196], label: [0, 92], eye: [0, 0] };
  };
  D.bloodBag.essais = [{}, { level: 0.67, sway: 1.4, slope: 6 }, { level: 0.3, tint: 0.35 }, { empty: 1, tick: 1, peg: false }];

  /* 3 · tubulure — coordonnées du parent (monde) : o.pts = points de passage (lissés, 40 segments, longueurs calculées en JS)
   * o.fill 0..1 (front rouge depuis la poche) · o.flow (phase des reflets qui défilent) · o.drop (phase de la goutte ; négative ou o.back = elle
   * remonte) · o.back (rembobinage : reflets et goutte à l'envers) · o.clamp 0..1 (la molette descend et pince) · o.chamberAt, o.clampAt (0..1)
   * o.k : épaisseur du tuyau, chambre et roulette ×k (1,4 à côté des poches ×1,5 de la scène 5 ; 1 à côté d'une poche ×1) */
  D.tube = (g, o = {}) => {
    o = Object.assign({ pts: [[0, 0], [10, 100], [-40, 220], [40, 340], [20, 570]], fill: 1, back: 0, drop: 0.5, flow: 0, clamp: 0, chamberAt: 0.14, clampAt: 0.62, tint: 1, chamber: true, roller: true, k: 1, seed: 301 }, o);
    const P = sample(o.pts, 40), L = lens(P), T = L[L.length - 1], fl = clamp(o.fill, 0, 1), back = o.back || o.drop < 0, K = o.k || 1;
    const col = mixc("#BDBDB7", RED, o.tint), dk = mixc("#77776F", RED2, o.tint);
    ln(g, poly(P), 7.5 * K, INK); ln(g, poly(P), 4.2 * K, "#FFFFFF");
    let front = P[0];
    if (fl > 0.004) {
      const R = cut(P, L, 0, fl * T); front = R[R.length - 1];
      ln(g, poly(R), 4.2 * K, col);
      ln(g, poly(R), 1.5 * K, mixc(col, "#FFFFFF", 0.5), { "stroke-dasharray": `${9 * K} ${21 * K}`, "stroke-dashoffset": f((back ? 1 : -1) * ((((o.flow % 1) + 1) % 1) * 30 * K)) });
      if (fl < 0.996) el("circle", { cx: f(front[0]), cy: f(front[1]), r: 3.3 * K, fill: dk }, g);
    }
    const pc = at(P, L, o.chamberAt * T), pr = at(P, L, o.clampAt * T);
    // o.k : la chambre et la roulette sont dessinées à l'échelle K autour de leur point (poches agrandies ×1,5 dans la scène 5)
    const sub = (p) => (K === 1 ? g : el("g", { transform: `translate(${f(p[0])} ${f(p[1])}) scale(${K}) translate(${f(-p[0])} ${f(-p[1])})` }, g));
    if (o.chamber) {   // chambre compte-gouttes : petit cylindre, niveau, goutte
      const cg = sub(pc), x = pc[0], y = pc[1], wet = fl > o.chamberAt;
      el("path", { d: U.rrect(x - 11, y - 24, 22, 48, 5), fill: "#D2D2CB", transform: "translate(4 5)" }, cg);
      el("path", { d: U.rrect(x - 11, y - 24, 22, 48, 5), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, cg);
      if (wet) el("path", { d: `M${f(x - 8.5)} ${f(y + 5)} Q${f(x)} ${f(y + 7)} ${f(x + 8.5)} ${f(y + 5)} L${f(x + 8.5)} ${f(y + 18)} Q${f(x + 8.5)} ${f(y + 21.5)} ${f(x + 5)} ${f(y + 21.5)} L${f(x - 5)} ${f(y + 21.5)} Q${f(x - 8.5)} ${f(y + 21.5)} ${f(x - 8.5)} ${f(y + 18)} Z`, fill: col }, cg);
      el("rect", { x: f(x - 2.5), y: f(y - 20), width: 5, height: 7, fill: INK }, cg);
      if (wet || fl > o.chamberAt * 0.6) {
        let ph = (((o.drop % 1) + 1) % 1); if (back) ph = 1 - ph;
        const dy = lerp(y - 11, y + 3, ph * ph);
        el("path", { d: `M${f(x)} ${f(dy - 5)} Q${f(x + 3.6)} ${f(dy)} ${f(x)} ${f(dy + 2.6)} Q${f(x - 3.6)} ${f(dy)} ${f(x)} ${f(dy - 5)} Z`, fill: col, stroke: dk, "stroke-width": 0.8 }, cg);
      }
      el("path", { d: U.rrect(x - 13, y - 29, 26, 9, 3), fill: "#CFCFCA", stroke: INK, "stroke-width": 2.2 }, cg);
      ln(cg, `M${f(x - 7)} ${f(y - 12)} L${f(x - 7)} ${f(y + 14)}`, 1.6, "#FFFFFF", { opacity: 0.9 });
    }
    let wheel = [pr[0], pr[1]];
    if (o.roller) {   // roulette de réglage : boîtier + molette
      const rg = sub(pr), x = pr[0], y = pr[1], c = clamp(o.clamp, 0, 1);
      el("path", { d: U.rrect(x - 13, y - 26, 26, 52, 6), fill: "#D2D2CB", transform: "translate(4 5)" }, rg);
      el("path", { d: U.rrect(x - 13, y - 26, 26, 52, 6), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, rg);
      ln(rg, `M${f(x - 5)} ${f(y - 19)} L${f(x + 3)} ${f(y + 19)}`, 2.6, "#B9B9B2");
      const w0 = [x + lerp(-4, 2.5, c), y + lerp(-14, 14, c)];
      el("circle", { cx: f(w0[0]), cy: f(w0[1]), r: 8.5, fill: "#CFCFCA", stroke: INK, "stroke-width": 2.2 }, rg);
      [-50, 0, 50].forEach((a) => { const r = (a + c * 200) * Math.PI / 180; ln(rg, `M${f(w0[0] + 3 * Math.cos(r))} ${f(w0[1] + 3 * Math.sin(r))} L${f(w0[0] + 7 * Math.cos(r))} ${f(w0[1] + 7 * Math.sin(r))}`, 1.6, INK); });
      if (c > 0.9) el("path", { d: `M${f(x - 9)} ${f(y + 26)} L${f(x + 9)} ${f(y + 26)} L${f(x + 3)} ${f(y + 33)} L${f(x - 3)} ${f(y + 33)} Z`, fill: INK }, rg);   // le tuyau est pincé
      wheel = [x + (w0[0] - x) * K, y + (w0[1] - y) * K];   // ancre de la molette (là où pose la main), échelle K comprise
    }
    return { chamber: [pc[0], pc[1]], clamp: [pr[0], pr[1]], wheel, end: P[P.length - 1], front: [front[0], front[1]], len: T };
  };
  D.tube.essais = [{ fill: 1, drop: 0.7 }, { fill: 0.45, drop: 0.3, back: 1, flow: 0.4 }, { fill: 0.08, clamp: 1, pts: [[0, 0], [30, 120], [-20, 260], [10, 420]] },
    { k: 1.4, fill: 0.6, back: 1, pts: [[0, 0], [10, 100], [-40, 220], [40, 340], [20, 570]] }];

  /* 4 · grille VIDE de o.cols × o.rows cases (o.cell px), tracée à main levée — ancrage : coin haut gauche
   * frise de la semaine : 21 × 3 (966 × 138) ; garde : 12 × 2 ; mini (scène 3) : cell 16 ; filigrane (scène 5) : cell 140, paper false, col gris */
  D.hourGrid = (g, o = {}) => {
    o = Object.assign({ cols: 21, rows: 3, cell: 46, paper: true, col: INK, sw: 2, seed: 401 }, o);
    const w = o.cols * o.cell, h = o.rows * o.cell, C = U.ctx(g, o.seed, false, 1), m = Math.max(3, Math.round(o.cell * 0.22));
    if (o.paper) {
      el("rect", { x: -m + 5, y: -m + 6, width: w + 2 * m, height: h + 2 * m, fill: "rgba(28,26,28,.14)" }, g);
      el("rect", { x: -m, y: -m, width: w + 2 * m, height: h + 2 * m, fill: "#FFFFFF", stroke: "#A9A9A2", "stroke-width": 1.4 }, g);
    }
    const r = Math.min(0.6, o.cell / 70);   // petites cases (mini-frise de 16 px) : trait moins tremblé, sinon les cases deviennent inégales
    for (let i = 0; i <= o.cols; i++) U.stroke(C, "v" + i, `M${i * o.cell} 0 L${i * o.cell} ${h}`, { sw: o.sw, stroke: o.col, r, single: true });
    for (let j = 0; j <= o.rows; j++) U.stroke(C, "h" + j, `M0 ${j * o.cell} L${w} ${j * o.cell}`, { sw: o.sw, stroke: o.col, r, single: true });
    return { w, h };
  };
  D.hourGrid.essais = [{}, { cols: 12, rows: 2 }, { cols: 7, rows: 3, cell: 16, sw: 1.3 }, { cols: 4, rows: 5, cell: 140, paper: false, col: "#9A9A94", sw: 2.4 }];

  /* 5 · UNE colonne de cases noircies (gribouillées au stylo, débord de 2 px) — ancrage : coin haut gauche ; o.seed = n° de colonne */
  D.hourCol = (g, o = {}) => {
    o = Object.assign({ rows: 3, cell: 46, seed: 1 }, o);
    const C = U.ctx(g, 420 + o.seed, o.seed % 2 === 1, 1), c = o.cell;
    for (let j = 0; j < o.rows; j++) {
      const q = (k) => (hs(o.seed * 17 + j * 5 + k) - 0.5) * (c > 30 ? 3 : 1.2), y = j * c, b = c > 30 ? 2 : 1;
      const d = `M${f(-b + q(1))} ${f(y - b + q(2))} L${f(c + b + q(3))} ${f(y - b + 1 + q(4))} L${f(c + b - 1 + q(5))} ${f(y + c + b + q(6))} L${f(-b + 1 + q(7))} ${f(y + c + b - 1 + q(8))} Z`;
      el("path", { d, fill: "#3A3A37", opacity: 0.55 }, g);
      U.shape(C, "c" + j, d, { hatch: INK, gap: c > 30 ? 3.3 : 2.4, fw: c > 30 ? 1.7 : 1.1 }, { sw: c > 30 ? 1.6 : 1, r: 1.2 });
    }
    return { w: c, h: c * o.rows };
  };
  D.hourCol.essais = [{}, { seed: 2 }, { seed: 7, rows: 2 }, { seed: 3, cell: 16 }];

  /* aimant rond (gris ou jaune) — ancrage : centre */
  D.magnet = (g, o = {}) => { o = Object.assign({ r: 13, yellow: false }, o); pin(g, 0, 0, o.r, o.yellow ? YEL : "#B9B9B3"); };
  D.magnet.essais = [{}, { yellow: true }];
  /* feutre couché (gouttière du tableau) — ancrage : centre ; o.roll = phase quand il roule */
  D.feltPen = (g, o = {}) => {
    o = Object.assign({ yellow: false, roll: 0 }, o);
    el("path", { d: U.rrect(-36, -6.5, 72, 13, 4), fill: "rgba(28,26,28,.18)", transform: "translate(3 4)" }, g);
    el("path", { d: U.rrect(-36, -6.5, 54, 13, 4), fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g);
    const ry = -6.5 + ((((o.roll % 1) + 1) % 1) * 13);
    el("rect", { x: -24, y: -6.5, width: 12, height: 13, fill: "#C9C9C1", stroke: INK, "stroke-width": 1.4 }, g);
    ln(g, `M-8 ${f(ry)} L10 ${f(ry)}`, 1.4, "#9A9A94");
    el("path", { d: U.rrect(15, -7.5, 22, 15, 4), fill: o.yellow ? YEL : "#3A3A37", stroke: INK, "stroke-width": 2 }, g);
    el("rect", { x: -40, y: -4, width: 5, height: 8, rx: 1.5, fill: INK }, g);
  };
  D.feltPen.essais = [{}, { yellow: true, roll: 0.3 }];

  /* 6 · tableau de garde mural — ancrage : coin haut gauche ; o.w × o.h
   * cadre alu 16 px à 4 vis, liège à points épars, bandeau d'en-tête (60 px : le titre .tw 30 s'écrit à y 52), gouttière (2 feutres, une éponge),
   * 6 aimants gris (o.magnets = [[x, y]…] ou [] ; o.pens ; o.tray, o.trayX ; o.title + o.titleX pour un titre fixe) */
  D.dutyBoard = (g, o = {}) => {
    o = Object.assign({ w: 860, h: 1040, title: "", titleX: null, tray: true, trayX: null, pens: 2, magnets: null, seed: 601 }, o);
    const { w, h } = o, C = U.ctx(g, o.seed, false, 1), B = 16, tx = o.trayX == null ? w / 2 : o.trayX;
    el("path", { d: U.rrect(0, 0, w, h, 10), fill: SH, transform: "translate(8 10)" }, g);
    el("rect", { x: B - 3, y: B - 3, width: w - 2 * B + 6, height: h - 2 * B + 6, fill: "#EFE6D4" }, g);
    for (let i = 0, n = Math.round((w * h) / 6500); i < n; i++)
      el("circle", { cx: f(B + 8 + hs(i * 3.1 + o.seed) * (w - 2 * B - 16)), cy: f(B + 70 + hs(i * 7.7 + o.seed + 2) * (h - 2 * B - 80)), r: f(1.2 + 1.7 * hs(i * 5.3 + 1)), fill: hs(i * 2.9) > 0.5 ? "#D6C9AD" : "#E2D6BD" }, g);
    el("rect", { x: B, y: B, width: w - 2 * B, height: 60, fill: "#E2D7C0" }, g);
    ln(g, `M${B} ${B + 60} L${w - B} ${B + 60}`, 2, "#8E8674"); ln(g, `M${B} ${B + 65} L${w - B} ${B + 65}`, 1, "#B9AE96");
    if (o.title) tw(g, o.title, o.titleX == null ? w / 2 : o.titleX, 55, 30, {});
    // cadre alu : deux montants, deux traverses
    U.shape(C, "fl", U.rrect(0, 0, B, h, 6), MAT.alu, { sw: 2.4 }); U.shape(C, "fr", U.rrect(w - B, 0, B, h, 6), MAT.alu, { sw: 2.4 });
    U.shape(C, "ft", U.rrect(0, 0, w, B, 6), MAT.alu, { sw: 2.4 }); U.shape(C, "fb", U.rrect(0, h - B, w, B, 6), MAT.alu, { sw: 2.4 });
    ln(g, `M${B + 6} 5 L${w - B - 6} 5`, 1.8, "#FFFFFF");
    [[B / 2, B / 2], [w - B / 2, B / 2], [B / 2, h - B / 2], [w - B / 2, h - B / 2]].forEach(([x, y], i) => {
      const a = (35 + i * 61) * Math.PI / 180; el("circle", { cx: x, cy: y, r: 4, fill: "#F4F4EF", stroke: INK, "stroke-width": 1.5 }, g);
      ln(g, `M${f(x - 3 * Math.cos(a))} ${f(y - 3 * Math.sin(a))} L${f(x + 3 * Math.cos(a))} ${f(y + 3 * Math.sin(a))}`, 1.3);
    });
    (o.magnets || [[52, h - 66], [98, h - 58], [150, h - 70], [w - 150, h - 60], [w - 98, h - 70], [w - 52, h - 62]]).forEach(([x, y]) => pin(g, x, y, 13, "#B9B9B3"));
    if (o.tray) {   // gouttière à feutres
      el("path", { d: U.rrect(tx - 150, h - 22, 300, 24, 5), fill: SH, transform: "translate(6 7)" }, g);
      for (let i = 0; i < o.pens; i++) { const pg = el("g", { transform: `translate(${f(tx - 92 + i * 84)} ${h - 29})` }, g); D.feltPen(pg, { yellow: i === 1 }); }
      el("path", { d: U.rrect(tx + 74, h - 41, 50, 19, 4), fill: "#CFCFCA", stroke: INK, "stroke-width": 2 }, g);                      // l'éponge
      el("rect", { x: tx + 74, y: h - 41, width: 50, height: 6, rx: 3, fill: "#77776F" }, g);
      U.shape(C, "tray", U.rrect(tx - 150, h - 22, 300, 24, 5), MAT.grey, { sw: 2.6 });
      ln(g, `M${tx - 142} ${h - 16} L${tx + 142} ${h - 16}`, 1.6, "#FFFFFF");
    }
    return { tray: [tx, h - 22], header: 52, inner: [B, B + 60, w - B, h - B] };
  };
  D.dutyBoard.essais = [{ title: "DIENSTPLAN" }, { w: 1100, h: 560, title: "DIENSTPLAN", titleX: 210, trayX: 420 }];

  /* 7 · fiche blanche à coin corné, punaise jaune en haut au centre — ancrage : la punaise (pivot de m.pend) ; la fiche va de y −18 à o.h − 18 */
  D.pinCard = (g, o = {}) => {
    o = Object.assign({ w: 520, h: 800, fold: 38, pin: true, seed: 701 }, o);
    const { w, h } = o, x0 = -w / 2, y0 = -18, x1 = w / 2, y1 = h - 18, k = o.fold, C = U.ctx(g, o.seed, false, 1);
    const d = `M${x0 + 8} ${y0} L${x1 - 8} ${y0} Q${x1} ${y0} ${x1} ${y0 + 8} L${x1} ${y1 - k} L${x1 - k} ${y1} L${x0 + 8} ${y1} Q${x0} ${y1} ${x0} ${y1 - 8} L${x0} ${y0 + 8} Q${x0} ${y0} ${x0 + 8} ${y0} Z`;
    el("path", { d, fill: SH, transform: "translate(8 10)" }, g);
    U.shape(C, "card", d, MAT.white, { sw: 3 });
    U.shape(C, "fold", `M${x1} ${y1 - k} L${x1 - k} ${y1 - k} L${x1 - k} ${y1} Z`, MAT.grey, { sw: 2.2 });
    if (o.pin) pin(g, 0, 0, 12, YEL);
    return { w, h, top: y0, bottom: y1 };
  };
  D.pinCard.essais = [{}, { w: 240, h: 300, fold: 26 }];

  /* 8 · bandeau magnétique sombre du planning — ancrage : centre ; o.w × 60 ; texte .tw blanc, deux rivets
   * o.hiN premiers signes grossis de o.pop (1 → 1.2 : les « 24 » qui grossissent à b7@7) */
  D.magnetStrip = (g, o = {}) => {
    o = Object.assign({ w: 440, text: "24-Stunden-Notdienst", size: 28, hiN: 2, pop: 1, seed: 801 }, o);
    const C = U.ctx(g, o.seed, false, 1), hw = o.w / 2, cw = o.size * 0.6, x0 = -(o.text.length * cw) / 2;
    el("path", { d: U.rrect(-hw, -30, o.w, 60, 8), fill: SH, transform: "translate(7 8)" }, g);
    U.shape(C, "strip", U.rrect(-hw, -30, o.w, 60, 8), MAT.dark, { sw: 2.8 });
    el("path", { d: U.rrect(-hw + 34, -22, o.w - 68, 44, 5), fill: "#2B2A2B" }, g);
    [-1, 1].forEach((s) => { el("circle", { cx: s * (hw - 18), cy: 0, r: 6.5, fill: "#DADAD4", stroke: INK, "stroke-width": 1.8 }, g); el("circle", { cx: s * (hw - 18) - 1.5, cy: -1.5, r: 1.8, fill: "#FFFFFF" }, g); });
    const n = Math.min(o.hiN, o.text.length), cx = x0 + (n * cw) / 2;
    if (n > 0) { const hg = el("g", { transform: `translate(${f(cx)} 0) scale(${f(o.pop * 100) / 100}) translate(${f(-cx)} 0)` }, g); tw(hg, o.text.slice(0, n), x0, o.size * 0.35, o.size, { anchor: "start", fill: o.pop > 1.02 ? YEL : "#FFFFFF" }); }
    tw(g, o.text.slice(n), x0 + n * cw, o.size * 0.35, o.size, { anchor: "start", fill: "#FFFFFF" });
    return { w: o.w, h: 60 };
  };
  D.magnetStrip.essais = [{}, { pop: 1.2 }];

  /* 9 · onglet du jour (HUD) — ancrage : coin haut gauche ; 262 × 56 ; texte .tw 26 px
   * o.text · o.chars (nombre de signes déjà tapés ; le texte ne bouge pas pendant la frappe) · o.rew (petit « ◀◀ » devant, 0..1 = opacité)
   * o.blur 0..1 + o.streak : les chiffres défilent, flous (b3@نرجعو → i1) ; les points et les lettres restent */
  D.dayTab = (g, o = {}) => {
    o = Object.assign({ text: "Sa · 30.07.2011", chars: null, rew: 0, seed: 901 }, o);
    const C = U.ctx(g, o.seed, false, 1), w = 262, h = 56, d = `M0 ${h} L0 14 Q0 0 14 0 L${w - 14} 0 Q${w} 0 ${w} 14 L${w} ${h} Z`;
    el("path", { d, fill: SH, transform: "translate(6 7)" }, g);
    U.shape(C, "tab", d, MAT.white, { sw: 2.8 });
    ln(g, `M8 ${h - 7} L${w - 8} ${h - 7}`, 1.4, "#B9B9B2", { "stroke-dasharray": "6 5" });   // trait de pliure
    const full = String(o.text), shown = o.chars == null ? full : full.slice(0, Math.max(0, Math.round(o.chars)));
    const left = o.rew > 0.02 ? 58 : 12, fs = Math.min(26, (w - left - 12) / (Math.max(1, full.length) * 0.6)), cw = fs * 0.6;   // un texte long rétrécit
    const x0 = o.rew > 0.02 ? left : (w - full.length * cw) / 2, by = 28 + fs * 0.35;
    if (o.rew > 0.02) { const rg = el("g", { opacity: f(clamp(o.rew, 0, 1)) }, g); el("path", { d: "M34 16 L16 28 L34 40 Z M54 16 L36 28 L54 40 Z", fill: INK }, rg); }
    const blur = clamp(o.blur || 0, 0, 1);
    if (blur < 0.02) tw(g, shown, f(x0), f(by), f(fs), { anchor: "start" });
    else {   // rembobinage : les CHIFFRES défilent, flous (2 traits par chiffre qui glissent ; o.streak = phase, décroissante = à l'envers)
      const pre = (t) => { t.style.whiteSpace = "pre"; return t; };   // garder les espaces : chaque signe reste à sa place (chasse fixe)
      pre(tw(g, shown.replace(/[0-9]/g, " "), f(x0), f(by), f(fs), { anchor: "start" }));
      if (blur < 0.98) pre(tw(el("g", { opacity: f(1 - blur) }, g), shown.replace(/[^0-9]/g, " "), f(x0), f(by), f(fs), { anchor: "start" }));
      const bg = el("g", { opacity: f(blur) }, g);
      [...shown].forEach((ch, i) => {
        if (!/[0-9]/.test(ch)) return;
        for (let k = 0; k < 2; k++) {
          const u = ((((k / 2 + (o.streak || 0) + i * 0.17) % 1) + 1) % 1), y = 12 + u * 30;
          el("rect", { x: f(x0 + i * cw + cw * 0.13), y: f(y), width: f(cw * 0.74), height: 3.6, rx: 1.8, fill: INK, opacity: f(0.45 + 0.4 * Math.sin(u * Math.PI)) }, bg);
        }
      });
    }
    return { w, h };
  };
  D.dayTab.essais = [{}, { text: "Mi · 16.05.2012", chars: 9 }, { text: "30.07.2011", rew: 1 }, { text: "··.··.····", rew: 1 }, { text: "Mi · 16.05.2012", rew: 1, blur: 1, streak: 0.3 }];

  /* reflet qui glisse sur un cadre alu (tableau de garde, scènes 3 et 6) — ancrage : centre ; o.h = épaisseur du montant (16) ; le nœud se
   * déplace d'un bout à l'autre du cadre (8 s) : dessin fixe, seul le transform bouge */
  D.glint = (g, o = {}) => {
    o = Object.assign({ h: 16, w: 46 }, o); const hh = o.h / 2 - 2, hw = o.w / 2;
    el("path", { d: `M${-hw + 8} ${-hh} L${hw} ${-hh} L${hw - 8} ${hh} L${-hw} ${hh} Z`, fill: "#FFFFFF", opacity: 0.85 }, g);
    el("path", { d: `M${hw + 6} ${-hh} L${hw + 14} ${-hh} L${hw + 6} ${hh} L${hw - 2} ${hh} Z`, fill: "#FFFFFF", opacity: 0.6 }, g);
  };

  /* 10 · rond jaune « ؟ » au bout d'une ficelle — ancrage : centre du rond (Ø 54) ; o.len = longueur de la ficelle ; ancre top = l'attache (pivot) */
  D.loopTag = (g, o = {}) => {
    o = Object.assign({ len: 60, seed: 1001 }, o);
    const C = U.ctx(g, o.seed, false, 1), top = -27 - o.len;
    ln(g, `M0 -20 C6 ${f(-27 - o.len * 0.35)} -6 ${f(-27 - o.len * 0.7)} 0 ${top}`, 2, "#55524B");
    el("circle", { cx: 0, cy: top, r: 3.6, fill: INK }, g);
    el("circle", { cx: 5, cy: 6, r: 27, fill: SH }, g);
    U.shape(C, "tag", circ(0, 0, 27), MAT.yellow, { sw: 2.8 });
    el("circle", { cx: 0, cy: -19.5, r: 3, fill: PAPER, stroke: INK, "stroke-width": 1.6 }, g);
    U.text(g, "؟", 0, 16, 36, { font: "Lalezar, 'Plex Arabic', sans-serif", weight: 400 });
    return { top: [0, top] };
  };
  D.loopTag.essais = [{}, { len: 133 }];

  /* 11 · « ◀◀ » : deux triangles pleins + trois fines lignes de balayage — ancrage : centre ; 70 × 40 ; o.scan = phase des lignes */
  D.rewindMark = (g, o = {}) => {
    o = Object.assign({ scan: 0, col: INK }, o);
    el("path", { d: "M-3 -18 L-33 0 L-3 18 Z M33 -18 L3 0 L33 18 Z", fill: o.col, stroke: o.col, "stroke-width": 2.5, "stroke-linejoin": "round" }, g);
    for (let i = 0; i < 3; i++) { const y = -20 + (((i / 3 + 1 - (((o.scan % 1) + 1) % 1)) % 1) * 40); ln(g, `M-35 ${f(y)} L35 ${f(y)}`, 2, PAPER, { opacity: 0.9 }); }
    return { w: 70, h: 40 };
  };
  D.rewindMark.essais = [{}, { scan: 0.45 }];
  /* lignes de balayage plein cadre (rembobinage, scène 2) — ancrage : centre gauche ; trois lignes fines sur o.w */
  D.scanLines = (g, o = {}) => {
    o = Object.assign({ w: 900, gap: 16 }, o);
    [0, 1, 2].forEach((i) => { el("rect", { x: 0, y: (i - 1) * o.gap - 1.5, width: o.w, height: 3, fill: INK, opacity: [0.28, 0.5, 0.2][i] }, g); el("rect", { x: f(o.w * (0.2 + 0.3 * i)), y: (i - 1) * o.gap - 1.5, width: 46, height: 3, fill: PAPER }, g); });
  };
  D.scanLines.essais = [{ w: 420 }];

  /* ═════════════════════════ C'. CADRE DE L'INTRO (scène 3) : petits objets du tableau de garde ═════════════════════════ */

  /* note épinglée (lignes vides, rond de tasse) — ancrage : la punaise grise ; 120 × 130 ; o.curl 0..1 = coin qui se soulève */
  D.note04 = (g, o = {}) => {
    o = Object.assign({ w: 120, h: 130, ring: true, curl: 0.3, seed: 3301 }, o);
    const C = U.ctx(g, o.seed, false, 1), hw = o.w / 2, y0 = -12, y1 = o.h - 12, k = 10 + 16 * clamp(o.curl, 0, 1);
    const d = `M${-hw} ${y0} L${hw} ${y0} L${hw} ${y1 - k} L${hw - k} ${y1} L${-hw} ${y1} Z`;
    el("path", { d, fill: "rgba(28,26,28,.16)", transform: "translate(5 6)" }, g);
    U.shape(C, "note", d, { base: "#FFFDF2" }, { sw: 2.2 });
    for (let y = y0 + 34; y < y1 - 10; y += 23) ln(g, `M${-hw + 12} ${y} L${hw - 12} ${y}`, 1.3, "#C9C9C1");
    if (o.ring) el("circle", { cx: 16, cy: f(y0 + o.h * 0.6), r: 23, fill: "none", stroke: "#B5AC98", "stroke-width": 3.2, "stroke-dasharray": "118 16", opacity: 0.7 }, g);
    el("path", { d: `M${hw} ${y1 - k} L${hw - k} ${y1 - k - 2} L${hw - k} ${y1} Z`, fill: "#E1E1DC", stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" }, g);
    pin(g, 0, 0, 8, "#B9B9B3");
    return { w: o.w, h: o.h };
  };
  D.note04.essais = [{}, { ring: false, curl: 1, seed: 3302 }];
  /* clé pendue à un crochet — ancrage : le crochet (pivot de m.pend) ; ≈ 60 × 110 */
  D.hookKey = (g, o = {}) => {
    const C = U.ctx(g, 3311, false, 1);
    el("circle", { cx: 0, cy: -6, r: 6.5, fill: "#DADAD4", stroke: INK, "stroke-width": 1.8 }, g); ln(g, "M-2.5 -8 L2.5 -4", 1.3);
    ln(g, "M0 -1 L0 7 Q0 14 -7 12", 4.5, INK);
    el("path", { d: "M-5 44 L7 44 L7 92 L1 98 L-5 92 Z", fill: SH, transform: "translate(4 5)" }, g);
    U.shape(C, "bow", circ(1, 42, 14), MAT.brass, { sw: 2.4 });
    el("circle", { cx: 1, cy: 36, r: 4.2, fill: PAPER, stroke: INK, "stroke-width": 1.6 }, g);
    ln(g, "M1 9 C-12 9 -14 30 -3 36 C3 39 8 36 8 30", 2.6, INK);   // l'anneau passe dans le trou de la clé
    ln(g, "M1 9 C11 9 13 19 9 26", 2.6, INK);
    U.shape(C, "shaft", "M-3 55 L5 55 L5 96 L1 101 L-3 96 Z", MAT.brass, { sw: 2.2 });
    el("path", { d: "M5 74 L14 74 L14 80 L10 80 L10 86 L14 86 L14 92 L5 92 Z", fill: YEL, stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, g);
    const tg = el("g", { transform: "rotate(24 10 24)" }, g);                                                     // étiquette vierge
    el("path", { d: U.rrect(12, 26, 34, 20, 4), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, tg); el("circle", { cx: 18, cy: 36, r: 2, fill: INK }, tg);
    ln(tg, "M24 33 L40 33 M24 39 L36 39", 1.3, "#B9B9B2");
    return { tip: [1, 101] };
  };
  /* feutre au bout d'une ficelle — ancrage : l'attache (pivot) ; o.len = longueur de la ficelle */
  D.markerString = (g, o = {}) => {
    o = Object.assign({ len: 180 }, o); const L = o.len;
    pin(g, 0, 0, 7, "#B9B9B3");
    ln(g, `M0 4 C5 ${f(L * 0.35)} -5 ${f(L * 0.7)} 0 ${L}`, 1.8, "#55524B");
    const pg = el("g", { transform: `translate(0 ${L + 36}) rotate(90)` }, g); D.feltPen(pg, { yellow: true });
    el("circle", { cx: 0, cy: L - 1, r: 3, fill: INK }, g);
    return { tip: [0, L + 74] };
  };
  D.markerString.essais = [{}, { len: 90 }];
  /* barre murale à deux crochets (scène 5 : les deux poches) — ancrage : centre de la barre ; o.w, o.hooks = [x…] ; ancres hooks */
  D.wallBar = (g, o = {}) => {
    o = Object.assign({ w: 620, hooks: [-140, 140], seed: 3401 }, o);
    const C = U.ctx(g, o.seed, false, 1), hw = o.w / 2;
    el("path", { d: U.rrect(-hw, -8, o.w, 16, 8), fill: SH, transform: "translate(6 9)" }, g);
    [-hw + 44, hw - 44].forEach((x, i) => {   // platines vissées au mur
      U.shape(C, "pl" + i, U.rrect(x - 26, -25, 52, 50, 8), MAT.grey, { sw: 2.4 });
      [[-16, -15], [16, -15], [-16, 15], [16, 15]].forEach(([dx, dy]) => el("circle", { cx: x + dx, cy: dy, r: 2.8, fill: INK }, g));
    });
    U.shape(C, "bar", U.rrect(-hw, -8, o.w, 16, 8), MAT.white, { sw: 2.8 });
    ln(g, `M${-hw + 14} -3 L${hw - 14} -3`, 1.6, "#C9C9C1");
    o.hooks.forEach((x, i) => {
      U.shape(C, "col" + i, U.rrect(x - 9, -12, 18, 24, 4), MAT.mid, { sw: 2.2 });
      ln(g, `M${x} 12 L${x} 20 Q${x} 31 ${x - 10} 28`, 5, INK);
    });
    return { hooks: o.hooks.map((x) => [x, 6]) };
  };

  /* ═════════════════════════ B. TRIBUNAL ═════════════════════════ */

  /* 12 · salle d'audience (fond, coordonnées MONDE) : mur #F1ECE2, corniche à y 380, boiseries hachurées de y 700 au sol (cadres en creux
   * tous les 150 px), plinthe, sol en perspective de y 1300 à o.bottom (1420 par défaut), puis fondu vers le papier sur o.fade px (70).
   * Scène 1 (sellette jusqu'à y 1570, barre jusqu'à 1600) : passer bottom 1610 pour que les meubles restent posés sur le sol. */
  D.courtRoom = (g, o = {}) => {
    o = Object.assign({ x0: -140, x1: 1220, top: 380, wainY: 700, floorY: 1300, bottom: 1420, fade: 70, panel: 150, vx: 540, seed: 1201 }, o);
    const { x0, x1, top, wainY, floorY, bottom } = o, C = U.ctx(g, o.seed, false, 1), W = x1 - x0;
    el("rect", { x: x0, y: top, width: W, height: wainY - top, fill: "#F1ECE2" }, g);
    // corniche à denticules
    el("rect", { x: x0, y: top, width: W, height: 30, fill: "#E2DBCC" }, g);
    for (let x = Math.floor(x0 / 34) * 34; x < x1; x += 34) el("rect", { x, y: top + 13, width: 17, height: 10, fill: "#CFC7B6" }, g);
    ln(g, `M${x0} ${top} L${x1} ${top}`, 3); ln(g, `M${x0} ${top + 9} L${x1} ${top + 9}`, 1.3, "#A39C8C"); ln(g, `M${x0} ${top + 30} L${x1} ${top + 30}`, 2, "#6E695E");
    // boiseries
    U.shape(C, "wain", `M${x0} ${wainY} L${x1} ${wainY} L${x1} ${floorY} L${x0} ${floorY} Z`, { base: "#E7E3D8", hatch: "#B3AD9F", gap: 7.5, fw: 1.1 }, { noStroke: true });
    el("rect", { x: x0, y: wainY, width: W, height: 20, fill: "#D6D0C2" }, g);
    ln(g, `M${x0} ${wainY} L${x1} ${wainY}`, 2.8); ln(g, `M${x0} ${wainY + 20} L${x1} ${wainY + 20}`, 1.6, "#6E695E");
    for (let x = Math.floor(x0 / o.panel) * o.panel; x < x1; x += o.panel) {   // cadres en creux (seulement ceux qui tiennent dans le mur)
      if (x + 14 < x0 || x + o.panel - 14 > x1) continue;
      const a = x + 14, b = x + o.panel - 14, t = wainY + 46, u = floorY - 58;
      U.stroke(C, "pn" + x, `M${a} ${t} L${b} ${t} L${b} ${u} L${a} ${u} Z`, { sw: 2, stroke: "#6E695E", r: 0.7 });
      ln(g, `M${a + 11} ${t + 11} L${b - 11} ${t + 11} L${b - 11} ${u - 11} L${a + 11} ${u - 11} Z`, 1.3, "#9C9587");
      ln(g, `M${a + 4} ${u - 4} L${b - 4} ${u - 4} L${b - 4} ${t + 4}`, 2, "#F7F3EA");
    }
    // plinthe
    el("rect", { x: x0, y: floorY - 30, width: W, height: 30, fill: "#C9C3B5" }, g); ln(g, `M${x0} ${floorY - 30} L${x1} ${floorY - 30}`, 1.8, "#6E695E");
    // sol en perspective
    el("rect", { x: x0, y: floorY, width: W, height: bottom - floorY, fill: "#E6E2D8" }, g);
    for (let i = -20; i <= 20; i++) {   // fuyantes : même pente quelle que soit la profondeur du sol (o.bottom), découpées à [x0, x1]
      const xa = o.vx + i * 84, xb = o.vx + i * 178, k = (bottom - floorY) / 120, d = segX(xa, floorY, xa + (xb - xa) * k, bottom, x0, x1);
      if (d) ln(g, d, 1.3, "#C4BEB0");
    }
    [34, 74, 130, 200, 290].forEach((d) => { if (floorY + d < bottom - 6) ln(g, `M${x0} ${floorY + d} L${x1} ${floorY + d}`, 1.2, "#C4BEB0"); });
    ln(g, `M${x0} ${floorY} L${x1} ${floorY}`, 3);
    floorFade(g, x0, W, bottom, o.fade);
    return { top, wainY, floorY, bottom };
  };
  D.courtRoom.essais = [{ x0: 0, x1: 1080, vx: 540 }, { x0: 0, x1: 1080, bottom: 1610 }];

  /* 13 · fenêtre haute à 2 × 4 carreaux, appui, poignée — ancrage : coin haut gauche ; 140 × 280 */
  D.tallWindow = (g, o = {}) => {
    o = Object.assign({ w: 140, h: 280, seed: 1301 }, o);
    const { w, h } = o, C = U.ctx(g, o.seed, false, 1), fr = U.rrect(-7, -7, w + 14, h + 14, 3);
    el("path", { d: fr, fill: SH, transform: "translate(7 8)" }, g);
    U.shape(C, "fr", fr, MAT.white, { sw: 3 });
    el("rect", { x: 6, y: 6, width: w - 12, height: h - 12, fill: "#FDFBEE" }, g);                                   // le jour
    [[0.14, 0.34, 0.4, 0.06], [0.62, 0.44, 0.9, 0.14], [0.14, 0.86, 0.36, 0.62]].forEach(([a, b, c, d]) => ln(g, `M${f(w * a)} ${f(h * b)} L${f(w * c)} ${f(h * d)}`, 3, "#FFFFFF"));
    U.stroke(C, "in", U.rrect(6, 6, w - 12, h - 12, 1), { sw: 2 });
    for (let i = 1; i < 4; i++) U.stroke(C, "t" + i, `M6 ${f(6 + ((h - 12) * i) / 4)} L${w - 6} ${f(6 + ((h - 12) * i) / 4)}`, { sw: 2.6 });
    U.shape(C, "mid", U.rrect(w / 2 - 5, 6, 10, h - 12, 1), MAT.white, { sw: 2 });
    el("rect", { x: w / 2 - 3, y: f(h * 0.5), width: 6, height: 24, rx: 3, fill: INK }, g);                          // poignée
    U.shape(C, "sill", U.rrect(-18, h + 7, w + 36, 14, 3), MAT.grey, { sw: 2.6 });                                   // appui
    return { w, h };
  };
  /* rayon de lumière : parallélogramme jaune pâle (nœud à part : il glisse de 12 px en 6 s ; m.dust dedans) — coordonnées du parent : o.from → o.to */
  D.lightShaft = (g, o = {}) => {
    o = Object.assign({ from: [0, 0], to: [320, 600], w: 150, op: 0.18, spread: 1.35 }, o);
    const [x0, y0] = o.from, [x1, y1] = o.to, w0 = o.w, w1 = o.w * o.spread;
    const band = (a, b, fill, op) => el("path", { d: `M${f(x0 + w0 * a)} ${y0} L${f(x0 + w0 * b)} ${y0} L${f(x1 + w1 * b)} ${y1} L${f(x1 + w1 * a)} ${y1} Z`, fill, opacity: f(op * 100) / 100 }, g);
    band(0, 1, YEL, o.op); band(0.16, 0.36, "#FFF6C9", o.op * 1.2); band(0.62, 0.72, "#FFF6C9", o.op);
    return { from: o.from, to: o.to };
  };
  D.lightShaft.essais = [{ op: 0.3 }];

  /* 14 · plaque ronde neutre « § », pendue à un clou par un fil — ancrage : le clou (pivot de m.pend) ; disque Ø 124 centré 75 px sous le clou */
  D.plaque04 = (g, o = {}) => {
    const C = U.ctx(g, 1401, false, 1), cy = 75;
    ln(g, `M0 0 L-34 ${cy - 51} M0 0 L34 ${cy - 51}`, 2, "#55524B");
    el("circle", { cx: 7, cy: cy + 8, r: 62, fill: SH }, g);
    U.shape(C, "out", circ(0, cy, 62), MAT.grey, { sw: 3 });
    U.shape(C, "in", circ(0, cy, 48), MAT.white, { sw: 2.2 });
    U.text(g, "§", 0, cy + 22, 60, {});
    el("circle", { cx: 0, cy: 0, r: 5, fill: INK }, g); el("circle", { cx: -1.6, cy: -1.6, r: 1.6, fill: "#FFFFFF" }, g);
    return { center: [0, cy] };
  };

  /* verre d'eau — ancrage : bas centre ; o.wave = frémissement du niveau (px) */
  D.glass = (g, o = {}) => {
    o = Object.assign({ wave: 0, level: 0.55 }, o);
    const ys = -27 * o.level, hw = (y) => 7 + 2.2 * (-y / 27);
    el("ellipse", { cx: 3, cy: 1.5, rx: 10, ry: 2.6, fill: "rgba(28,26,28,.18)" }, g);
    el("path", { d: "M-9.2 -27 L9.2 -27 L7 0 L-7 0 Z", fill: "#FFFFFF" }, g);
    el("path", { d: `M${f(-hw(ys))} ${f(ys + o.wave)} L${f(hw(ys))} ${f(ys - o.wave)} L6.6 -1 L-6.6 -1 Z`, fill: "#D6D6CF" }, g);
    ln(g, "M-9.2 -27 L-7 0 L7 0 L9.2 -27", 2.2); ln(g, "M-9.2 -27 L9.2 -27", 1.4, "#77776F");
    ln(g, "M-4.6 -21 L-3.6 -6", 1.6, "#FFFFFF");
  };
  /* carafe (+ verre) — ancrage : bas centre de la carafe ; o.wave = frémissement du niveau (2 px, 1,5 s) */
  D.carafe = (g, o = {}) => {
    o = Object.assign({ wave: 0, glass: true, seed: 1511 }, o);
    const C = U.ctx(g, o.seed, false, 1), ys = -30, body = "M-6 -62 L6 -62 L6 -47 C20 -38 19 -10 14 0 L-14 0 C-19 -10 -20 -38 -6 -47 Z";
    el("ellipse", { cx: 4, cy: 2, rx: 17, ry: 3.4, fill: "rgba(28,26,28,.18)" }, g);
    el("path", { d: body, fill: "#FFFFFF" }, g);
    el("path", { d: `M-17.4 ${f(ys + o.wave)} Q-8 ${f(ys - o.wave)} 0 ${f(ys)} Q8 ${f(ys + o.wave)} 17.4 ${f(ys - o.wave)} C18 -14 16 -6 13.5 -1 L-13.5 -1 C-16 -6 -18 -14 -17.4 ${f(ys + o.wave)} Z`, fill: "#D6D6CF" }, g);
    U.stroke(C, "car", body, { sw: 2.2, r: 0.6 });
    ln(g, "M-10 -40 Q-14 -26 -11 -9", 2, "#FFFFFF"); ln(g, "M-8 -62 L8 -62", 3.2);
    if (o.glass) { const gg = el("g", { transform: "translate(28 0)" }, g); D.glass(gg, { wave: -o.wave * 0.6 }); }
  };
  D.carafe.essais = [{}, { wave: 2 }];

  /* 15 · banc des juges — ancrage : centre du plateau (les objets se posent à y 0) ; 600 × 255 : plateau, façade à 3 panneaux, estrade,
   * 3 plaques de place vierges vissées sous le plateau (o.plates = x des sièges), pile de 3 dossiers dont un jaune (o.pile = x ou null),
   * carafe et verre (o.carafe = x ou null pour les poser à part avec D.carafe ; o.wave) */
  D.bench04 = (g, o = {}) => {
    o = Object.assign({ w: 600, plates: [-190, -30, 235], pile: 168, carafe: -130, wave: 0, seed: 1501 }, o);
    const C = U.ctx(g, o.seed, false, 1), hw = o.w / 2;
    el("path", { d: `M${-hw} 0 L${hw} 0 L${hw} 255 L${-hw} 255 Z`, fill: SH, transform: "translate(8 9)" }, g);
    U.shape(C, "est", U.rrect(-hw, 228, o.w, 27, 4), MAT.mid, { sw: 2.6 });                                            // estrade
    U.shape(C, "front", `M${-hw + 12} 14 L${hw - 12} 14 L${hw - 12} 230 L${-hw + 12} 230 Z`, MAT.wood, { sw: 2.8 });   // façade
    const pw = (o.w - 24 - 4 * 16) / 3;
    for (let i = 0; i < 3; i++) {
      const x = -hw + 12 + 16 + i * (pw + 16);
      U.stroke(C, "p" + i, U.rrect(x, 70, pw, 142, 3), { sw: 2, stroke: "#6E6E68", r: 0.7 });
      ln(g, U.rrect(x + 10, 80, pw - 20, 122, 2), 1.3, "#A9A9A2"); ln(g, `M${x + 4} ${208} L${x + pw - 4} ${208} L${x + pw - 4} ${76}`, 2, "#F7F7F1");
    }
    o.plates.forEach((x, i) => {   // plaques de place vierges
      el("path", { d: U.rrect(x - 36, 30, 72, 26, 4), fill: "rgba(28,26,28,.18)", transform: "translate(3 4)" }, g);
      U.shape(C, "pl" + i, U.rrect(x - 36, 30, 72, 26, 4), MAT.white, { sw: 2 });
      [-28, 28].forEach((dx) => el("circle", { cx: x + dx, cy: 43, r: 2.2, fill: INK }, g));
    });
    U.shape(C, "top", U.rrect(-hw, 0, o.w, 22, 6), MAT.mid, { sw: 3 });                                                // plateau
    ln(g, `M${-hw + 12} 6 L${hw - 12} 6`, 2, "#F4F4EF");
    if (o.pile != null) [[0, MAT.grey, -2], [1, MAT.yellow, 3], [2, MAT.light, -1]].forEach(([k, mat, dx]) => {         // pile de 3 dossiers
      const x = o.pile + dx, y = -13 * (k + 1);
      U.shape(C, "d" + k, U.rrect(x - 37, y, 74, 13, 3), mat, { sw: 2 });
      ln(g, `M${x - 31} ${y + 4} L${x + 20} ${y + 4}`, 1.3, "#FFFFFF"); el("rect", { x: x + 22, y: y + 3, width: 10, height: 7, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.1 }, g);
    });
    if (o.carafe != null) { const cg = el("g", { transform: `translate(${o.carafe} 0)` }, g); D.carafe(cg, { wave: o.wave }); }
    return { top: 0, seats: o.plates };
  };

  /* boîte de mouchoirs — ancrage : bas centre ; o.sway = balancement du mouchoir qui dépasse (°) */
  D.tissueBox = (g, o = {}) => {
    o = Object.assign({ w: 56, h: 30, sway: 0, seed: 1621 }, o);
    const C = U.ctx(g, o.seed, false, 1), hw = o.w / 2, h = o.h;
    el("path", { d: U.rrect(-hw, -h, o.w, h, 4), fill: SH, transform: "translate(5 5)" }, g);
    U.shape(C, "box", U.rrect(-hw, -h, o.w, h, 4), MAT.grey, { sw: 2.4 });
    el("rect", { x: -hw + 6, y: -h + 13, width: o.w - 12, height: 10, rx: 3, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.4 }, g);
    [-9, 0, 9].forEach((dx) => el("circle", { cx: dx, cy: -h + 18, r: 1.6, fill: "#9A9A94" }, g));
    el("ellipse", { cx: 0, cy: -h + 1, rx: 15, ry: 3.4, fill: INK }, g);                                              // la fente
    const tg = el("g", { transform: `rotate(${f(o.sway)} 0 ${-h})` }, g);                                             // le mouchoir
    el("path", { d: `M-11 ${-h + 2} C-17 ${-h - 15} -9 ${-h - 29} -2 ${-h - 34} C3 ${-h - 25} 9 ${-h - 31} 14 ${-h - 22} C12 ${-h - 12} 12 ${-h - 6} 10 ${-h + 2} Z`, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2, "stroke-linejoin": "round" }, tg);
    ln(tg, `M-3 ${-h - 4} Q-1 ${-h - 17} 1 ${-h - 26}`, 1.3, "#B9B9B2");
  };
  D.tissueBox.essais = [{}, { sway: 8 }];

  /* 16 · la barre — ancrage : coin haut gauche du rail (le dessus du rail est à y 0) ; o.w × o.h : rail de bois arrondi sur une façade à planches
   * o.props : verre (o.glassX) et boîte de mouchoirs (o.tissueX) posés dessus ; pour les animer, o.props false + D.glass / D.tissueBox à part */
  D.dock = (g, o = {}) => {
    o = Object.assign({ w: 340, h: 300, props: true, glassX: null, tissueX: null, wave: 0, sway: 0, seed: 1601 }, o);
    const { w, h } = o, C = U.ctx(g, o.seed, false, 1);
    el("path", { d: U.rrect(-10, 0, w + 20, h, 10), fill: SH, transform: "translate(8 9)" }, g);
    U.shape(C, "front", `M2 18 L${w - 2} 18 L${w - 2} ${h} L2 ${h} Z`, MAT.wood, { sw: 2.6 });
    for (let x = 59, i = 0; x < w - 30; x += 57, i++) U.stroke(C, "pl" + i, `M${x} 30 L${x} ${h}`, { sw: 1.8, stroke: "#6E6E68", r: 0.7 });   // planches
    el("rect", { x: 2, y: 26, width: w - 4, height: 22, fill: "#D9D9D3" }, g); ln(g, `M2 48 L${w - 2} 48`, 1.8, "#6E6E68");
    for (let x = 30; x < w - 10; x += 57) { el("circle", { cx: x, cy: 37, r: 2.4, fill: "#6E6E68" }, g); }
    U.shape(C, "rail", U.rrect(-10, 0, w + 20, 28, 14), MAT.mid, { sw: 3 });                                          // rail arrondi
    ln(g, `M8 8 L${w - 8} 8`, 2.2, "#F4F4EF");
    if (o.props) {
      const tg = el("g", { transform: `translate(${o.tissueX == null ? w - 86 : o.tissueX} 2)` }, g); D.tissueBox(tg, { sway: o.sway });
      const gg = el("g", { transform: `translate(${o.glassX == null ? w - 46 : o.glassX} 2)` }, g); D.glass(gg, { wave: o.wave });
    }
    return { w, h, rail: 0 };
  };
  D.dock.essais = [{}, { props: false, w: 240 }];

  /* 16 b · petite table de l'accusée vue de trois quarts (plateau à y −160, façade), micro sur pied — ancrage : bas centre ; 180 × 160 */
  D.dockTable = (g, o = {}) => {
    const C = U.ctx(g, 1651, false, 1);
    el("ellipse", { cx: 8, cy: 2, rx: 104, ry: 9, fill: "rgba(28,26,28,.14)" }, g);
    U.shape(C, "side", "M76 -148 L90 -164 L90 -12 L76 0 Z", MAT.mid, { sw: 2.4 });
    U.shape(C, "front", "M-90 -148 L76 -148 L76 0 L-90 0 Z", MAT.wood, { sw: 2.8 });
    U.stroke(C, "pan", U.rrect(-76, -130, 138, 108, 3), { sw: 1.8, stroke: "#6E6E68", r: 0.7 });
    ln(g, "M-72 -26 L58 -26 L58 -126", 2, "#F7F7F1");
    U.shape(C, "topf", "M-96 -160 L80 -160 L96 -178 L-80 -178 Z", MAT.light, { sw: 2.4 });                           // dessus du plateau
    U.shape(C, "edge", U.rrect(-96, -160, 176, 14, 3), MAT.mid, { sw: 2.6 });                                         // chant du plateau
    U.shape(C, "edge2", "M80 -160 L96 -178 L96 -165 L80 -146 Z", MAT.mid, { sw: 2.2 });
    // micro sur pied (col de cygne)
    el("ellipse", { cx: 26, cy: -168, rx: 15, ry: 5, fill: "#3A3A37", stroke: INK, "stroke-width": 2 }, g);
    ln(g, "M26 -170 C26 -196 20 -206 6 -214", 3.4, INK);
    const mg = el("g", { transform: "translate(0 -217) rotate(-62)" }, g);
    el("path", { d: U.rrect(-4, -8, 24, 16, 8), fill: "#4A4A46", stroke: INK, "stroke-width": 2.2 }, mg);
    ln(mg, "M4 -7 L4 7 M10 -8 L10 8 M16 -6 L16 6", 1.1, "#B9B9B2");
    return { top: -160, mic: [-6, -232] };
  };

  /* 17 · LA BALANCE — ancrage : centre du socle (dessus de la sellette) ; pivot à y −680, fléau 2 × 215, chaînes 230, plateaux Ø 156
   * (bord à y −450 à plat, fond 34 px plus bas), plaquettes pendues sous les plateaux (60 → 104 px sous le bord) : « SCHULD » à gauche,
   * « STRAFE » + fenêtre à rouleau à droite. o.tilt (°, positif = gauche en bas) · o.swL, o.swR (balancement des plateaux, °)
   * o.strafe (chiffre flottant du rouleau), o.blur, o.streak · o.stand (sellette, o.standH) · o.tags · o.lw (épaisseur des traits : ≈ 2,4 à l'échelle 0,24)
   * o.part : "all" | "base" (sellette, socle, colonne : statique) | "beam" (chaînes, plateaux, fléau : à redessiner quand tilt change)
   * D.scaleGeom(o, x, y, s) → { pivot, endL, endR, panL, panR, tagL, tagR } : fonction PURE, la même que le dessin, pour poser les objets
   *   sur les plateaux (panL / panR = centre du bord du plateau ; tagL / tagR = centre de la plaquette ; x, y, s = position et échelle du nœud). */
  const SCALE = { pivotY: -680, arm: 215, chain: 230, pan: 78, depth: 34, tag: 82 };
  function scaleGeom(o, x, y, s) {
    o = o || {}; const K = SCALE, t = ((o.tilt || 0) * Math.PI) / 180, k = s == null ? 1 : s;
    const eL = [-K.arm * Math.cos(t), K.pivotY + K.arm * Math.sin(t)], eR = [K.arm * Math.cos(t), K.pivotY - K.arm * Math.sin(t)];
    const hang = (e, sw, d) => { const a = ((sw || 0) * Math.PI) / 180; return [e[0] + d * Math.sin(a), e[1] + d * Math.cos(a)]; };
    const W = (p) => [(x || 0) + p[0] * k, (y || 0) + p[1] * k];
    return { pivot: W([0, K.pivotY]), endL: W(eL), endR: W(eR), panL: W(hang(eL, o.swL, K.chain)), panR: W(hang(eR, o.swR, K.chain)),
      tagL: W(hang(eL, o.swL, K.chain + K.tag)), tagR: W(hang(eR, o.swR, K.chain + K.tag)), rim: K.pan * k, tagBottom: (K.tag + 22) * k };
  }
  Object.defineProperty(D, "scaleGeom", { value: scaleGeom, enumerable: false });   // pas un dessin : hors de la planche d'essai
  D.scale04 = (g, o = {}) => {
    o = Object.assign({ tilt: 0, swL: 0, swR: 0, strafe: 0, blur: 0, streak: 0, stand: true, standH: 330, tags: true, part: "all", lw: 1, seed: 1701 }, o);
    const K = SCALE, lw = o.lw, C = U.ctx(g, o.seed, false, lw), G = scaleGeom(o);
    if (o.part !== "beam") {
      if (o.stand) {   // la sellette : petite table haute
        const sh = o.standH;
        el("path", { d: U.rrect(-160, 0, 320, 22, 5), fill: SH, transform: "translate(7 8)" }, g);
        U.shape(C, "legL", U.rrect(-142, 56, 24, sh - 56, 3), MAT.wood, { sw: 2.4 }); U.shape(C, "legR", U.rrect(118, 56, 24, sh - 56, 3), MAT.wood, { sw: 2.4 });
        U.shape(C, "bar", U.rrect(-120, Math.round(sh * 0.66), 240, 14, 3), MAT.wood, { sw: 2.2 });
        U.shape(C, "apron", U.rrect(-148, 20, 296, 42, 3), MAT.wood, { sw: 2.6 });
        U.stroke(C, "drw", U.rrect(-62, 28, 124, 26, 3), { sw: 1.8, stroke: "#6E6E68", r: 0.7 }); el("circle", { cx: 0, cy: 41, r: 5, fill: "#F4F4EF", stroke: INK, "stroke-width": 2 }, g);
        U.shape(C, "top", U.rrect(-160, 0, 320, 22, 5), MAT.mid, { sw: 2.8 });
        ln(g, "M-148 6 L148 6", 2, "#F4F4EF");
      }
      // socle à deux marches
      if (!o.stand) el("path", { d: U.rrect(-95, -24, 190, 24, 5), fill: SH, transform: `translate(${6 * lw} ${6 * lw})` }, g);
      U.shape(C, "s1", U.rrect(-95, -24, 190, 24, 5), MAT.mid, { sw: 2.8 }); U.shape(C, "s2", U.rrect(-66, -46, 132, 22, 5), MAT.grey, { sw: 2.6 });
      // colonne tournée : pied en vase, fût, balustre, trois bagues, chapiteau
      U.shape(C, "foot", "M-32 -46 C-32 -84 -12 -90 -11 -126 L11 -126 C12 -90 32 -84 32 -46 Z", MAT.grey, { sw: 2.6 });
      U.shape(C, "shaft", U.rrect(-10, -644, 20, 522, 4), MAT.grey, { sw: 2.6 });
      U.shape(C, "bal", "M-10 -300 C-27 -268 -27 -206 -10 -176 L10 -176 C27 -206 27 -268 10 -300 Z", MAT.grey, { sw: 2.6 });
      [-134, -312, -168, -540].forEach((y, i) => U.shape(C, "ring" + i, U.rrect(-19, y - 7, 38, 14, 6), MAT.mid, { sw: 2.2 }));
      U.shape(C, "cap", U.rrect(-23, -660, 46, 18, 6), MAT.mid, { sw: 2.4 });
      // la chape (fourche) qui porte le couteau, et le cadran de l'aiguille
      U.shape(C, "fork", "M-17 -656 L-17 -697 L-9 -703 L-9 -666 L9 -666 L9 -703 L17 -697 L17 -656 Z", MAT.mid, { sw: 2.4 });
      U.shape(C, "dial", "M-40 -596 Q0 -616 40 -596 L34 -580 Q0 -598 -34 -580 Z", MAT.white, { sw: 2 });
      [-26, -13, 0, 13, 26].forEach((x) => ln(g, `M${x} ${f(-601 + Math.abs(x) * 0.22)} L${f(x * 0.92)} ${f(-592 + Math.abs(x) * 0.22)}`, (x === 0 ? 2.6 : 1.5) * lw));
    }
    if (o.part !== "base") {
      const side = (isR) => {
        const e = scaleGeom({ tilt: o.tilt }), E = isR ? e.endR : e.endL, sw = isR ? o.swR : o.swL, y0 = K.chain, R = K.pan;
        const pg = el("g", { transform: `translate(${f(E[0])} ${f(E[1])}) rotate(${f(-sw)})` }, g), PC = U.ctx(pg, o.seed + (isR ? 7 : 3), false, lw);
        [[-R + 5, 0], [0, -7], [R - 5, 0]].forEach(([dx, dy]) => {   // trois chaînes à maillons
          const d = `M0 7 L${dx} ${y0 + dy}`; ln(pg, d, 1.3 * lw, "#55524B"); ln(pg, d, 3.8 * lw, INK, { "stroke-dasharray": `${7 * lw} ${5 * lw}` });
        });
        const bowl = `M${-R} ${y0} Q${f(-R * 0.86)} ${y0 + K.depth} 0 ${y0 + K.depth} Q${f(R * 0.86)} ${y0 + K.depth} ${R} ${y0} Z`;
        if (o.tags) {   // plaquette pendue sous le plateau
          const tw_ = isR ? 126 : 104, ty = y0 + 60;
          ln(pg, `M-30 ${y0 + 28} L-30 ${ty + 6} M30 ${y0 + 28} L30 ${ty + 6}`, 1.6 * lw, "#55524B");
          el("path", { d: U.rrect(-tw_ / 2, ty, tw_, 44, 5), fill: SH, transform: "translate(5 6)" }, pg);
          U.shape(PC, "tag", U.rrect(-tw_ / 2, ty, tw_, 44, 5), MAT.white, { sw: 2.4 });
          [-30, 30].forEach((x) => el("circle", { cx: x, cy: ty + 7, r: 2.6, fill: INK }, pg));
          if (!isR) tw(pg, "SCHULD", 0, ty + 33, 20, { ls: 1 });
          else { tw(pg, "STRAFE", -19, ty + 33, 20, {}); rollWindow(pg, tw_ / 2 - 36, ty + 7, 26, 32, o.strafe, { blur: o.blur, streak: o.streak, size: 27, sw: 2 }); }
        }
        el("path", { d: bowl, fill: SH, transform: `translate(${6 * lw} ${7 * lw})` }, pg);
        U.shape(PC, "bowl", bowl, MAT.brass, { sw: 2.8 });
        el("ellipse", { cx: 0, cy: y0, rx: R, ry: 9, fill: "#FBE9A6", stroke: INK, "stroke-width": 2.6 * lw }, pg);
        ln(pg, `M${-R + 14} ${y0 + 2} A${R - 14} 5 0 0 0 ${R - 14} ${y0 + 2}`, 1.6 * lw, "#D9A322");
        ln(pg, `M${f(-R * 0.62)} ${y0 + 16} Q${f(-R * 0.5)} ${y0 + 26} ${f(-R * 0.2)} ${y0 + 29}`, 2.4 * lw, "#FFF6C9");
        el("circle", { cx: 0, cy: 3, r: 6.5 * Math.min(lw, 1.4), fill: "#F4F4EF", stroke: INK, "stroke-width": 2.4 * lw }, pg);   // anneau d'accroche
      };
      side(false); side(true);
      const bg = el("g", { transform: `translate(0 ${K.pivotY}) rotate(${f(-o.tilt)})` }, g), BC = U.ctx(bg, o.seed + 11, false, lw);
      ln(bg, "M0 12 L0 76", 2.8 * lw); el("path", { d: "M-5.5 72 L5.5 72 L0 88 Z", fill: INK }, bg);                 // l'aiguille
      U.shape(BC, "beam", "M-215 -5 Q-108 -16 0 -18 Q108 -16 215 -5 L217 4 Q108 8 0 10 Q-108 8 -217 4 Z", MAT.dark, { sw: 2.6 });
      ln(bg, "M-190 -3 Q-100 -11 -24 -12 M24 -12 Q100 -11 190 -3", 1.6 * lw, "#9A9A94");
      U.shape(BC, "fin", "M-6 -16 L-3.5 -27 L3.5 -27 L6 -16 Z", MAT.mid, { sw: 2 });                                   // fleuron
      el("circle", { cx: 0, cy: -30, r: 7.5, fill: YEL, stroke: INK, "stroke-width": 2.4 * lw }, bg); ln(bg, "M0 -37 L0 -41", 3 * lw);
      el("circle", { cx: 0, cy: -4, r: 12.5, fill: "#F4F4EF", stroke: INK, "stroke-width": 2.6 * lw }, bg);          // moyeu
      el("path", { d: "M-6 -8 L6 -8 L0 4 Z", fill: INK }, bg);                                                        // couteau central
    }
    return G;
  };
  D.scale04.essais = [{}, { tilt: 13, swL: 3, swR: -4 }, { tilt: 5, blur: 1, streak: 0.3, strafe: 0, stand: false }, { tilt: 13, lw: 2.4, stand: false, tags: false }];

  /* 18 · bloc « SCHULDIG » : bloc sombre aux arêtes vives — ancrage : bas centre ; 150 × 104 (+ dessus et côté en perspective)
   * o.seams 0..1 : les joints horizontaux apparaissent (le bloc = 4 tranches de 26 px : D.slab) */
  D.guiltBlock = (g, o = {}) => {
    o = Object.assign({ seams: 0, text: "SCHULDIG", seed: 1801 }, o);
    const C = U.ctx(g, o.seed, false, 1), h = 104, t = 9, k = 10, front = `M-75 ${-h} L75 ${-h} L75 0 L-75 0 Z`;
    el("path", { d: `M-75 ${-h} L${-75 + k} ${-h - t} L${75 + k} ${-h - t} L${75 + k} ${-t} L75 0 L-75 0 Z`, fill: SH, transform: "translate(7 7)" }, g);
    U.shape(C, "top", `M-75 ${-h} L${-75 + k} ${-h - t} L${75 + k} ${-h - t} L75 ${-h} Z`, MAT.mid, { sw: 2.4, r: 0.5 });
    U.shape(C, "side", `M75 ${-h} L${75 + k} ${-h - t} L${75 + k} ${-t} L75 0 Z`, { base: "#2B2A2B" }, { sw: 2.4, r: 0.5 });
    U.shape(C, "front", front, { base: "#3A3A37", hatch: INK, gap: 4, fw: 1.5 }, { sw: 3, r: 0.5 });
    const tx = U.text(g, o.text, 0, -57, 25, { fill: "#FFFFFF", ls: 2 });
    tx.setAttribute("stroke", "#2B2A2B"); tx.setAttribute("stroke-width", "5"); tx.setAttribute("stroke-linejoin", "round"); tx.setAttribute("paint-order", "stroke");
    const s = clamp(o.seams, 0, 1);
    if (s > 0.02) [-26, -52, -78, -h + 1.5].forEach((y) => ln(g, `M-74 ${y} L${f(-74 + 148 * s)} ${y}`, 2.6, PAPER));
    return { w: 150, h };
  };
  D.guiltBlock.essais = [{}, { seams: 1 }];

  /* 22 · chemise cartonnée, étiquette tapée — ancrage : centre ; 110 × 80 ; o.text (« 613 Ls 3/12 », « Gutachten »…) ; o.yellow
   * o.page 0..1 : une feuille qui se tourne (le juge tourne une page, scène 2) */
  D.folder = (g, o = {}) => {
    o = Object.assign({ text: "613 Ls 3/12", yellow: false, page: 0, seed: 2201 }, o);
    const C = U.ctx(g, o.seed, false, 1), d = "M-55 -30 L-55 -37 Q-55 -40 -52 -40 L-16 -40 L-9 -32 L52 -32 Q55 -32 55 -29 L55 37 Q55 40 52 40 L-52 40 Q-55 40 -55 37 Z";
    el("path", { d, fill: SH, transform: "translate(6 7)" }, g);
    el("path", { d: "M-48 -35 L50 -35 L50 30 L-48 30 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);       // feuilles qui dépassent
    U.shape(C, "fold", d, o.yellow ? MAT.yellow : MAT.wood, { sw: 2.6 });
    const n = String(o.text).length, lw = Math.min(88, Math.max(64, n * 7.2 + 12)), lx = -5;   // l'étiquette s'arrête avant la sangle
    ln(g, "M46 -32 L46 40", 3, "#3A3A37"); ln(g, "M-44 22 L10 22 M-44 30 L-6 30", 1.4, "#9A9A94");                      // sangle, lignes
    el("path", { d: U.rrect(lx - lw / 2, -16, lw, 26, 3), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g);
    tw(g, o.text, lx, 2, Math.min(12, (lw - 8) / (n * 0.6)), {});
    if (o.page > 0.01) {   // une page qui se tourne (le juge lit : scène 2, b2 + 1,0) — o.page 0..1, le pli est à gauche
      const p = clamp(o.page, 0, 1), xr = lerp(44, -96, p), lift = 10 * Math.sin(p * Math.PI);
      el("path", { d: `M-48 -35 L${f(xr)} ${f(-35 - lift)} L${f(xr)} ${f(30 - lift)} L-48 30 Z`, fill: p < 0.5 ? "#FFFFFF" : "#F1F1EC", stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, g);
      ln(g, `M-40 ${f(-20 - lift * 0.5)} L${f(lerp(-40, xr, 0.8))} ${f(-20 - lift)} M-40 ${f(-8 - lift * 0.5)} L${f(lerp(-40, xr, 0.6))} ${f(-8 - lift)}`, 1.2, "#B9B9B2");
    }
    return { w: 110, h: 80 };
  };
  D.folder.essais = [{}, { text: "Gutachten", yellow: true }, { page: 0.35 }];

  /* 25 b · carte tapée (papier de machine : bord perforé EN HAUT pour laisser toute la largeur aux lignes) — ancrage : centre ; o.w × o.h
   * o.dashed : bord en pointillés (= une demande, pas une décision) · trombone · o.lines = [{ text, y, size, x, anchor }] pour un texte fixe
   * (dans les scènes, story.js tape les lignes lui-même : zone utile x ±(w/2 − 18), à partir de y −h/2 + 40) */
  D.typedCard = (g, o = {}) => {
    o = Object.assign({ w: 420, h: 250, dashed: false, clip: true, lines: null, seed: 2501 }, o);
    const { w, h } = o, x0 = -w / 2, y0 = -h / 2, C = U.ctx(g, o.seed, false, 1), d = U.rrect(x0, y0, w, h, 5);
    el("path", { d, fill: SH, transform: "translate(8 10)" }, g);
    if (o.dashed) { el("path", { d, fill: "#FFFFFF" }, g); el("path", { d, fill: "none", stroke: INK, "stroke-width": 3.2, "stroke-dasharray": "14 9", "stroke-linecap": "round" }, g); }
    else U.shape(C, "card", d, MAT.white, { sw: 3 });
    for (let x = x0 + 18; x < -x0 - 8; x += 24) el("circle", { cx: f(x), cy: y0 + 12, r: 4, fill: PAPER, stroke: "#8A8A84", "stroke-width": 1.4 }, g);   // perforations
    ln(g, `M${x0 + 8} ${y0 + 24} L${-x0 - 8} ${y0 + 24}`, 1.2, "#B9B9B2", { "stroke-dasharray": "3 5" });
    if (o.clip) {   // trombone
      const cx = x0 + 44, cy = y0 - 4;
      ln(g, `M${cx - 6} ${cy + 30} L${cx - 6} ${cy - 2} Q${cx - 6} ${cy - 10} ${cx + 1} ${cy - 10} Q${cx + 8} ${cy - 10} ${cx + 8} ${cy - 2} L${cx + 8} ${cy + 38} Q${cx + 8} ${cy + 44} ${cx + 3} ${cy + 44} Q${cx - 2} ${cy + 44} ${cx - 2} ${cy + 38} L${cx - 2} ${cy + 6}`, 2.6, "#55524B");
    }
    (o.lines || []).forEach((l) => tw(g, l.text, l.x == null ? 0 : l.x, l.y, l.size || 22, { anchor: l.anchor || "middle" }));
    return { w, h, left: x0 + 18, top: y0 + 40 };
  };
  // scène 2 (carte 420 × 250) : lignes à y −56, −22, 14, 46 et « laut Urteil » à (192, −84) ; le coin bas droit reste libre pour le tampon
  // « § 60 » (k.prop stamp, échelle 0,4 ≈ 108 × 69) centré à (130, 88) dans le repère de la carte
  D.typedCard.essais = [{ lines: [{ text: "Die Angeklagte ist einer", y: -56 }, { text: "fahrlässigen Tötung schuldig.", y: -22 }, { text: "Von einer Bestrafung", y: 14 }, { text: "wird abgesehen.", y: 46 }, { text: "laut Urteil", y: -84, x: 192, size: 15, anchor: "end" }] },
    { w: 400, h: 240, dashed: true, lines: [{ text: "Staatsanwaltschaft:", y: -40 }, { text: "90 Tagessätze", y: 22, size: 46 }, { text: "— beantragt —", y: 76 }] }];

  /* ═════════════════════════ C. HÔPITAL (scènes 4 à 6) ═════════════════════════ */

  /* 29 · couloir (fond, coordonnées MONDE) : mur, corniche à y 380, bande de protection, main courante à y 1120, plinthe, sol 1300 → o.bottom
   * (1420), fondu vers le papier sur o.fade px
   * o.x0, o.x1 (scène 6 : −200 → 2200) · o.doors = [{ x, num }] : portes pleines 150 × 600 à imposte, numéro sur une plaquette ; ancres calls
   * (où poser D.callLight) · o.night 0..1 : hachure de nuit dans les angles hauts de la fenêtre [o.nx0, o.nx1] */
  D.corridor04 = (g, o = {}) => {
    o = Object.assign({ x0: -140, x1: 1220, top: 380, railY: 1120, floorY: 1300, bottom: 1420, fade: 70, doors: [], night: 0, nx0: 0, nx1: 1080, seed: 2901 }, o);
    const { x0, x1, top, railY, floorY, bottom } = o, C = U.ctx(g, o.seed, false, 1), W = x1 - x0, bandY = railY - 96;
    el("rect", { x: x0, y: top, width: W, height: floorY - top, fill: "#EFEFE8" }, g);
    el("rect", { x: x0, y: top, width: W, height: 24, fill: "#DFDFD8" }, g);                                           // corniche
    ln(g, `M${x0} ${top} L${x1} ${top}`, 3); ln(g, `M${x0} ${top + 8} L${x1} ${top + 8}`, 1.3, "#A9A9A2"); ln(g, `M${x0} ${top + 24} L${x1} ${top + 24}`, 2, "#6E6E68");
    el("rect", { x: x0, y: bandY, width: W, height: floorY - bandY, fill: "#E3E3DC" }, g);                             // bande de protection
    ln(g, `M${x0} ${bandY} L${x1} ${bandY}`, 2, "#8A8A84");
    for (let x = Math.floor(x0 / 240) * 240 + 40; x < x1; x += 240) ln(g, `M${x} ${bandY + 2} L${x} ${floorY - 26}`, 1.1, "#C4C4BD");
    for (let x = Math.floor(x0 / 280) * 280 + 60; x < x1; x += 280) {   // supports de la main courante
      el("rect", { x: x - 6, y: railY + 6, width: 12, height: 20, rx: 3, fill: "#B9B9B3", stroke: INK, "stroke-width": 1.8 }, g);
      el("circle", { cx: x, cy: railY + 28, r: 7, fill: "#DADAD4", stroke: INK, "stroke-width": 1.8 }, g);
    }
    el("rect", { x: x0, y: railY + 12, width: W, height: 8, fill: "rgba(28,26,28,.12)" }, g);
    U.shape(C, "rail", U.rrect(x0 - 20, railY - 9, W + 40, 18, 9), MAT.white, { sw: 2.6, r: 0.5 });                    // main courante
    ln(g, `M${x0} ${railY - 3} L${x1} ${railY - 3}`, 1.5, "#C9C9C1");
    el("rect", { x: x0, y: floorY - 26, width: W, height: 26, fill: "#CBCBC4" }, g); ln(g, `M${x0} ${floorY - 26} L${x1} ${floorY - 26}`, 1.8, "#6E6E68");   // plinthe
    el("rect", { x: x0, y: floorY, width: W, height: bottom - floorY, fill: "#E4E4DD" }, g);                           // sol (lino à joints)
    const dk = (bottom - floorY) / 120;   // joints du lino : même pente quelle que soit la profondeur du sol (o.bottom)
    for (let x = Math.floor(x0 / 190) * 190; x < x1 + 60 * dk; x += 190) { const d = segX(x, floorY, x - 44 * dk, bottom, x0, x1); if (d) ln(g, d, 1.3, "#C6C6BF"); }
    [50, 120, 210].forEach((d) => { if (floorY + d < bottom - 6) ln(g, `M${x0} ${floorY + d} L${x1} ${floorY + d}`, 1.2, "#C6C6BF"); });
    for (let x = Math.floor(x0 / 420) * 420 + 120; x < x1; x += 420) el("path", { d: `M${x} ${floorY + 22} L${x + 150} ${floorY + 22} L${x + 132} ${floorY + 40} L${x - 18} ${floorY + 40} Z`, fill: "#FFFFFF", opacity: 0.5 }, g);   // reflets
    ln(g, `M${x0} ${floorY} L${x1} ${floorY}`, 3);
    floorFade(g, x0, W, bottom, o.fade);
    const calls = [];
    o.doors.forEach((dr, i) => {   // portes pleines à imposte
      const x = dr.x, dw = 150, dh = 600, y = floorY - dh, DC = U.ctx(g, o.seed + 10 + i, false, 1);
      el("path", { d: U.rrect(x - 10, y - 96, dw + 20, dh + 96, 3), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.6 }, g);                          // huisserie
      el("rect", { x: x + 4, y: y - 86, width: dw - 8, height: 72, fill: "#F9F9F4", stroke: INK, "stroke-width": 2 }, g); ln(g, `M${x + dw / 2} ${y - 86} L${x + dw / 2} ${y - 14}`, 2); // imposte
      ln(g, `M${x + 18} ${y - 30} L${x + 50} ${y - 72}`, 2.4, "#FFFFFF");
      U.shape(DC, "leaf", `M${x} ${y} L${x + dw} ${y} L${x + dw} ${floorY} L${x} ${floorY} Z`, MAT.light, { sw: 2.8 });
      U.stroke(DC, "p1", U.rrect(x + 16, y + 130, dw - 32, 190, 3), { sw: 1.6, stroke: "#8A8A84", r: 0.6 }); U.stroke(DC, "p2", U.rrect(x + 16, y + 350, dw - 32, 150, 3), { sw: 1.6, stroke: "#8A8A84", r: 0.6 });
      U.shape(DC, "kick", `M${x + 3} ${floorY - 62} L${x + dw - 3} ${floorY - 62} L${x + dw - 3} ${floorY - 3} L${x + 3} ${floorY - 3} Z`, MAT.mid, { sw: 1.8 });   // plaque de bas de porte
      el("rect", { x: x + dw - 44, y: y + 292, width: 30, height: 9, rx: 4, fill: "#F4F4EF", stroke: INK, "stroke-width": 2.2 }, g); el("circle", { cx: x + dw - 18, cy: y + 296, r: 6.5, fill: "#DADAD4", stroke: INK, "stroke-width": 2 }, g);
      el("path", { d: U.rrect(x + dw / 2 - 32, y + 56, 64, 38, 4), fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g);                             // plaquette du numéro
      if (dr.num != null) tw(g, String(dr.num), x + dw / 2, y + 83, 24, {});
      calls.push([x + dw / 2, y - 122]);
    });
    if (o.night > 0.02) {   // la nuit monte dans les angles hauts
      const n = clamp(o.night, 0, 1), a = 330 * n, b = 430 * n, ng = el("g", { opacity: f(0.55 * n) }, g), NC = U.ctx(ng, o.seed + 40, false, 1);
      U.shape(NC, "nl", `M${o.nx0} ${top + 26} L${o.nx0 + a} ${top + 26} L${o.nx0} ${top + 26 + b} Z`, { hatch: INK, gap: 6.5, fw: 1.3 }, { noStroke: true });
      U.shape(NC, "nr", `M${o.nx1} ${top + 26} L${o.nx1 - a} ${top + 26} L${o.nx1} ${top + 26 + b} Z`, { hatch: INK, gap: 6.5, fw: 1.3 }, { noStroke: true });
    }
    return { calls, railY, floorY };
  };
  D.corridor04.essais = [{ x0: 0, x1: 1080 }, { x0: 0, x1: 1080, doors: [{ x: 200, num: 12 }, { x: 640, num: 14 }], night: 1 }, { x0: 0, x1: 1080, bottom: 1600 }];
  /* voyant d'appel au-dessus d'une porte (JAUNE, jamais rouge) — ancrage : centre ; o.on 0..1 */
  D.callLight = (g, o = {}) => {
    o = Object.assign({ on: 0 }, o); const on = clamp(o.on, 0, 1);
    if (on > 0.02) { el("circle", { cx: 0, cy: -4, r: 34, fill: YEL, opacity: f(0.22 * on) }, g); el("circle", { cx: 0, cy: -4, r: 21, fill: YEL, opacity: f(0.3 * on) }, g); }
    el("path", { d: U.rrect(-19, 2, 38, 12, 4), fill: "#CFCFCA", stroke: INK, "stroke-width": 2 }, g);
    el("path", { d: "M-14 2 A14 14 0 0 1 14 2 Z", fill: on > 0.5 ? YEL : "#F4F4EF", stroke: INK, "stroke-width": 2.2, "stroke-linejoin": "round" }, g);
    ln(g, "M-8 -4 A9 9 0 0 1 -2 -9", 1.8, "#FFFFFF");
  };
  D.callLight.essais = [{}, { on: 1 }];
  /* applique murale — ancrage : centre de la platine ; o.on 0..1 = halo vers le haut */
  D.sconce = (g, o = {}) => {
    o = Object.assign({ on: 1, seed: 2951 }, o); const C = U.ctx(g, o.seed, false, 1), on = clamp(o.on, 0, 1);
    if (on > 0.02) { el("path", { d: "M-30 -14 L30 -14 L92 -190 L-92 -190 Z", fill: YEL, opacity: f(0.13 * on) }, g); el("ellipse", { cx: 0, cy: -16, rx: 40, ry: 13, fill: "#FFF6C9", opacity: f(0.55 * on) }, g); }
    el("path", { d: U.rrect(-9, -8, 18, 40, 5), fill: "#CFCFCA", stroke: INK, "stroke-width": 2 }, g);
    U.shape(C, "bowl", "M-32 -14 L32 -14 Q26 16 0 18 Q-26 16 -32 -14 Z", MAT.grey, { sw: 2.4 });
    ln(g, "M-32 -14 L32 -14", 3);
  };
  D.sconce.essais = [{}, { on: 0 }];

  /* 39 · la feuille à signer — ancrage : centre ; grande : 400 × 500 ; o.small : 130 × 20 (feuille posée, vue de côté)
   * en-tête « Erklärung », 4 lignes de faux texte, ligne à case « Schulung »Transfusion« erhalten », ligne de signature avec une croix
   * o.sign 0..1 : la signature (une boucle, PAS un nom) s'écrit — ou se défait · o.check : case cochée · ancres : pen (pointe du stylo), box, line */
  D.formSheet = (g, o = {}) => {
    o = Object.assign({ sign: 1, check: 1, small: false, seed: 3901 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    if (o.small) {
      el("path", { d: "M-65 8 L45 8 L65 -8 L-45 -8 Z", fill: SH, transform: "translate(5 5)" }, g);
      U.shape(C, "sheet", "M-65 8 L45 8 L65 -8 L-45 -8 Z", MAT.white, { sw: 2.2 });
      ln(g, "M-44 -3 L20 -3 M-50 2 L-4 2", 1.5, "#9A9A94");
      if (o.sign > 0.05) ln(g, "M8 3 q5 -6 9 0 t9 -1 t8 1", 1.8);
      return { pen: [34, 3] };
    }
    const d = U.rrect(-200, -250, 400, 500, 4);
    el("path", { d, fill: SH, transform: "translate(8 10)" }, g);
    U.shape(C, "sheet", d, MAT.white, { sw: 3 });
    tw(g, "Erklärung", -168, -188, 34, { anchor: "start" }); ln(g, "M-168 -172 L16 -172", 2.4);
    [[-128, 168], [-100, 150], [-72, 164], [-44, 96]].forEach(([y, x1]) => ln(g, `M-168 ${y} L${x1} ${y}`, 4, "#A9A9A2"));
    // ligne à case
    el("path", { d: U.rrect(-170, -4, 32, 32, 3), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.8 }, g);
    if (o.check) ln(g, "M-164 10 L-155 22 L-136 -8", 5);
    tw(g, "Schulung »Transfusion« erhalten", -127, 18, 16, { anchor: "start" });
    ln(g, "M-127 30 L170 30", 1.3, "#B9B9B2");
    // ligne de signature + croix
    ln(g, "M-150 172 L160 172", 2.2); ln(g, "M-174 154 L-158 170 M-158 154 L-174 170", 2.6);
    tw(g, "Unterschrift", -150, 196, 13, { anchor: "start", fill: "#6E6E68" });
    const S = []; for (let i = 0; i <= 64; i++) { const u = i / 64; S.push([-122 + 236 * u + 16 * Math.sin(u * Math.PI * 7), 148 - 26 * Math.sin(u * Math.PI * 6.2) * (1 - 0.45 * u) - 9 * Math.sin(u * Math.PI)]); }
    const n = Math.round(64 * clamp(o.sign, 0, 1));
    if (n > 0) ln(g, poly(S.slice(0, n + 1)), 3.2);
    return { pen: S[n], box: [-154, 12], line: [0, 172], corner: [200, -250] };
  };
  D.formSheet.essais = [{}, { sign: 0.45 }, { sign: 0, check: 0 }, { small: true }];
  /* stylo — ancrage : la POINTE ; o.angle = direction du corps (° ; −55 = vers le haut à droite), o.len */
  D.pen = (g, o = {}) => {
    o = Object.assign({ angle: -55, len: 124, seed: 3911 }, o);
    const r = el("g", { transform: `rotate(${o.angle})` }, g), C = U.ctx(r, o.seed, false, 1), L = o.len;
    el("path", { d: U.rrect(14, -6.5, L - 14, 13, 4), fill: "rgba(28,26,28,.16)", transform: "translate(3 5)" }, r);
    el("path", { d: "M0 0 L17 -5.5 L17 5.5 Z", fill: INK, stroke: INK, "stroke-width": 1.5, "stroke-linejoin": "round" }, r);
    U.shape(C, "grip", U.rrect(16, -6, 24, 12, 3), MAT.mid, { sw: 2 });
    U.shape(C, "body", U.rrect(39, -6.5, L - 54, 13, 4), MAT.dark, { sw: 2.2 });
    U.shape(C, "end", U.rrect(L - 17, -5.5, 13, 11, 4), MAT.yellow, { sw: 2 });
    ln(r, `M${L - 52} -9 L${L - 20} -9`, 3);
    return { top: [L * Math.cos((o.angle * Math.PI) / 180), L * Math.sin((o.angle * Math.PI) / 180)] };
  };
  D.pen.essais = [{}, { angle: -20 }];

  /* 43 · cernes — à poser sur node.out.eyes (o.eyes = [[x, y], [x, y]] dans le repère du parent, o.s = échelle du personnage)
   * o.k 0..1 = fatigue (opacité ; second arc au-delà de 0,6) · o.side : vue de profil, un seul œil (o.eyes[o.sideIndex]) */
  D.cernes = (g, o = {}) => {
    o = Object.assign({ eyes: [[-21, 0], [21, 0]], k: 1, s: 1, side: false, sideIndex: 1 }, o);
    const gg = el("g", { opacity: f(clamp(o.k, 0, 1)) }, g);
    (o.side ? [o.eyes[o.sideIndex] || o.eyes[0]] : o.eyes).forEach(([x, y]) => {
      const e = el("g", { transform: `translate(${f(x)} ${f(y)}) scale(${o.s})` }, gg);
      el("ellipse", { cx: 0, cy: 12, rx: 11, ry: 4.6, fill: "#77776F", opacity: 0.25 }, e);
      ln(e, "M-11 9 Q0 15 11 9", 2.2, "#77776F");
      if (o.k > 0.6) ln(e, "M-8 13.5 Q0 18.5 8 13.5", 1.6, "#8A8A84");
    });
  };
  D.cernes.essais = [{}, { k: 0.4 }];

  /* 45 · le Rhin : trait double ondulé qui se trace — coordonnées du parent ; o.pts (du sud au nord, par geo()), o.p 0..1 = part tracée
   * (accepte aussi D.rhine(g, [[x, y]…])) */
  D.rhine = (g, o = {}) => {
    if (Array.isArray(o)) o = { pts: o };
    o = Object.assign({ pts: [[60, 420], [112, 300], [104, 212], [62, 180], [30, 147], [21, 128], [9, 102], [-23, 48]], p: 1 }, o);
    const P = sample(o.pts, 48), L = lens(P), T = L[L.length - 1], p = clamp(o.p, 0, 1);
    if (p > 0.004) { const R = cut(P, L, 0, p * T); ln(g, poly(R), 9, "#55524B"); ln(g, poly(R), 4.4, PAPER); ln(g, poly(R), 1.2, "#9A9A94", { "stroke-dasharray": "10 14" }); }
    return { end: at(P, L, p * T).slice(0, 2), len: T };
  };
  D.rhine.essais = [{}, { p: 0.5 }];
  /* silhouette de la cathédrale (deux flèches à crochets, nef, rosace), en encre hachurée — ancrage : bas centre ; ≈ 268 × 522 */
  D.dom = (g, o = {}) => {
    o = Object.assign({ seed: 4501 }, o);
    const C = U.ctx(g, o.seed, false, 1), DK = MAT.dark, ST = MAT.stone, LT = "#E6E6E1";
    const lancet = (x, y, w, h, fill) => el("path", { d: `M${f(x - w / 2)} ${y} L${f(x - w / 2)} ${f(y - h + w)} Q${x} ${f(y - h - w * 0.4)} ${f(x + w / 2)} ${f(y - h + w)} L${f(x + w / 2)} ${y} Z`, fill: fill || LT, stroke: INK, "stroke-width": 1.4, "stroke-linejoin": "round" }, g);
    el("ellipse", { cx: 4, cy: 2, rx: 150, ry: 9, fill: "rgba(28,26,28,.16)" }, g);
    // la nef (derrière, à droite) : toit, tourelle de croisée, contreforts à pinacles, hautes fenêtres
    U.shape(C, "ridge", "M90 -214 L98 -292 L106 -214 Z", DK, { sw: 2 }); ln(g, "M98 -292 L98 -306 M93 -300 L103 -300", 2.2);
    U.shape(C, "roof", "M34 -172 L50 -220 L122 -220 L134 -172 Z", DK, { sw: 2.6 });
    U.shape(C, "nave", "M40 0 L40 -172 L130 -172 L130 0 Z", ST, { sw: 2.6 });
    [72, 101].forEach((x) => lancet(x, -34, 13, 104));
    [56, 87, 118].forEach((x, i) => U.shape(C, "but" + i, `M${x - 7} 0 L${x - 7} -150 L${x} -190 L${x + 7} -150 L${x + 7} 0 Z`, DK, { sw: 2 }));
    // travée centrale : pignon, rosace, grand portail
    U.shape(C, "mid", "M-64 0 L-64 -238 L-40 -282 L-16 -238 L-16 0 Z", ST, { sw: 2.6 });
    el("circle", { cx: -40, cy: -196, r: 16, fill: LT, stroke: INK, "stroke-width": 2.2 }, g);
    for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4; ln(g, `M${f(-40 + 5 * Math.cos(a))} ${f(-196 + 5 * Math.sin(a))} L${f(-40 + 15 * Math.cos(a))} ${f(-196 + 15 * Math.sin(a))}`, 1.4); }
    el("circle", { cx: -40, cy: -196, r: 4.5, fill: YEL, stroke: INK, "stroke-width": 1.4 }, g);
    lancet(-40, -92, 14, 66); lancet(-40, 0, 26, 70, INK); ln(g, "M-40 -4 L-40 -58", 1.4, "#9A9A94");
    // les deux tours
    [-98, 18].forEach((cx, i) => {
      U.shape(C, "tw" + i, `M${cx - 34} 0 L${cx - 34} -270 L${cx + 34} -270 L${cx + 34} 0 Z`, DK, { sw: 2.8 });
      [-90, -180].forEach((y) => ln(g, `M${cx - 34} ${y} L${cx + 34} ${y}`, 2, "#B9B9B2"));
      lancet(cx, 0, 22, 58, INK); ln(g, `M${cx} -4 L${cx} -46`, 1.3, "#9A9A94");
      [-13, 13].forEach((dx) => { lancet(cx + dx, -100, 12, 66); lancet(cx + dx, -190, 12, 70); });
      [-34, 34].forEach((dx, j) => U.shape(C, "pin" + i + j, `M${cx + dx - 7} -270 L${cx + dx} -322 L${cx + dx + 7} -270 Z`, DK, { sw: 1.8 }));   // pinacles d'angle
      U.shape(C, "oct" + i, `M${cx - 25} -270 L${cx - 25} -336 L${cx + 25} -336 L${cx + 25} -270 Z`, ST, { sw: 2.4 });
      [-10, 10].forEach((dx) => lancet(cx + dx, -278, 9, 48));
      U.shape(C, "sp" + i, `M${cx - 27} -336 L${cx} -508 L${cx + 27} -336 Z`, DK, { sw: 2.6 });                                                 // la flèche
      [-372, -410, -446].forEach((y) => { const hw = 27 * ((508 + y) / 172); ln(g, `M${f(cx - hw + 3)} ${y} L${f(cx + hw - 3)} ${y}`, 1.6, "#B9B9B2"); });
      for (let k = 1; k <= 6; k++) { const y = -336 - k * 24, hw = 27 * ((508 + y) / 172); [-1, 1].forEach((s) => el("circle", { cx: f(cx + s * (hw + 2.5)), cy: y, r: 3.2, fill: INK }, g)); }   // crochets
      ln(g, `M${cx} -508 L${cx} -524 M${cx - 6} -517 L${cx + 6} -517`, 2.4);
    });
    el("path", { d: U.rrect(-140, -7, 280, 7, 2), fill: "#CFCFCA", stroke: INK, "stroke-width": 2 }, g);
    return { top: [-98, -524], w: 268, h: 524 };
  };
  /* trois lignes d'eau au pied de la cathédrale — ancrage : haut centre ; o.w, o.phase 0..1 (l'eau dérive) */
  D.riverWaves = (g, o = {}) => {
    o = Object.assign({ w: 320, phase: 0 }, o);
    [[0, 1], [14, 0.8], [28, 0.56]].forEach(([y, k], i) => {
      const hw = (o.w * k) / 2, pts = []; for (let x = -hw; x <= hw + 0.1; x += 8) pts.push([x, y + 4 + 3.4 * Math.sin(x * 0.075 + o.phase * 6.283 + i * 1.3)]);
      ln(g, poly(pts), 3 - i * 0.4, i === 1 ? "#9A9A94" : "#55524B");
    });
    return { w: o.w, h: 36 };
  };
  D.riverWaves.essais = [{}, { phase: 0.5 }];

  // aides partagées avec decor-2.js et decor-3.js (un objet, pas une fonction : la planche d'essai l'ignore)
  D.kit = { el, ln, tw, TW, MAT, f, clamp, lerp, hs, mixc, circ, poly, sample, lens, at, cut, pin, gear, rollWindow, segX, floorFade, INK, YEL, SH, PAPER, RED, RED2 };
  // decor-2.js / decor-3.js chargés avant ce fichier (outil d'essai : tri alphabétique) attendent le kit : on les relance maintenant
  const later = D._later || []; delete D._later; later.forEach((fn) => fn());
})();
