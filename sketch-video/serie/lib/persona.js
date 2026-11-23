/* persona.js — personnages expressifs dessinés « à la main » (rough.js), même encre que SketchCast.
 * Global : window.Persona   (nécessite window.rough + window.SketchCast pour util/MAT ; ne modifie pas SketchCast)
 *
 *   Persona.person(g, params) -> ancres { head, mouth, eyes:[[x,y],[x,y]], handL, handR, hip, chest, belly,
 *                                         shoulderL, shoulderR, top, neck, chin, forehead, footL, footR, height }
 *   Persona.head(g, params)   -> tête seule pour gros plans (origine = centre de la tête) -> { head, mouth, eyes, top }
 *   Persona.couple(g, params) -> { woman:{…ancres}, man:{…ancres}, heart:[x,y], hands:[x,y] }
 *   Persona.baby(g, params)   -> { head, chest, length }
 *   Persona.props.suitcase / hotelBed / nightstand / phone / clockWall / window / doctorBag / babyBlanket / candle / heart
 *   Persona.Pose.*   Persona.mix(a, b, t)   Persona.EXPR / LOOKS / OUTFITS / HAIR / CFG   Persona.util.rig(params) (ancres sans dessiner)
 *
 * params de person() (tous optionnels) :
 *   look "woman"|"man"|"oldwoman"|"oldman" · hair "longwave"|"ponytail"|"bun"|"bob"|"shortcurly"|"short"|"crown"|"bald"
 *   hairTone "dark"|"brown"|"grey"|"blond" · beard "none"|"stubble"|"short"|"moustache" · glasses bool
 *   outfit "casual"|"sweater"|"jacket"|"maternity"|"coat"|"scrubs"|"robe"|"suit" · pregnant bool · badge "Dr"
 *   facing 1|-1 · view "front"|"three-quarter"|"side" (bodyView "front"|"side" pour forcer le corps)
 *   expr neutral|smile|bigsmile|love|worried|pain|sad|cry|shock|angry|focused|calm|sleep|kiss
 *   blink 0..1 · talk 0..1 · look2 [dx,dy] (regard, dx>0 = vers l'avant du personnage) · headTilt ° · blush bool · tears 0..1 · sweat bool
 *   armL/armR [épaule, coude] · legL/legR [hanche, genou] · torsoLean · lift · armLen [kBras, kAvantBras] (raccourci)
 *   reachL/reachR [x,y] (main vers un point, repère des ancres) + bendL/bendR ±1 · armLBack/armRBack · hide ["armL","armR","head"] · only "armL"|"armR"|"arms"|"handL"|"handR"|"head"
 *   mouth (force une bouche : soft|smile|smallsmile|grin|frown|wavy|flat|tight|o|pain|wail|kiss) · seed · lw
 *
 * Repère personnage : pieds en (0,0), y vers le bas, hauteur ≈ 430.
 * Angles en degrés : 0 = membre pendant, positif = vers +x (l'avant quand facing = 1). Coude/genou = angle relatif.
 * Dessin déterministe pour des paramètres donnés (graines rough.js fixes). Mains = moufles, jamais de doigts.
 */
(function () {
  "use strict";
  const SC = window.SketchCast, U = SC.util;
  const el = U.el, text = U.text, stroke = U.stroke, shape = U.shape, ctx = U.ctx, blob = U.blob, curve = U.curve, rrect = U.rrect;
  const INK = "#1C1A1C", GREY = "#9A9A94", YEL = "#F8CE4E", PAPER = "#F7F7F1", DARK = "#3A3A37";
  const CFG = { blush: "#F0A99F", tear: "#D5E6F2" };

  const MAT = Object.assign({}, SC.MAT, {
    hairDark: { base: "#5E5E58", hatch: "#232321", gap: 4.7, fw: 1.45 },
    hairBrown: { base: "#A3A39C", hatch: "#44443F", gap: 4.6, fw: 1.35 },
    hairGrey: { base: "#E6E6E1", hatch: "#96968F", gap: 4.8, fw: 1.2 },
    hairBlond: { base: "#FCFBF4", hatch: "#B9B6A6", gap: 6, fw: 1.1 },
    dark: { base: "#4A4A46", hatch: INK, gap: 4, fw: 1.6 },
    light: { base: "#F0F0EB", hatch: "#BDBDB6", gap: 6.5, fw: 1.1 },
    wood: { base: "#E9E9E3", hatch: "#ABABA4", gap: 7, fw: 1.1 },
  });
  const TONE = {
    dark: { mat: "hairDark", brow: INK, strand: "#9A9A94" },
    brown: { mat: "hairBrown", brow: "#3A3A37", strand: "#55554F" },
    grey: { mat: "hairGrey", brow: "#7C7C76", strand: "#77776F" },
    blond: { mat: "hairBlond", brow: "#8D8A7A", strand: "#8D8A7A" },
  };

  // ───────────────────────── utilitaires
  const rad = (a) => a * Math.PI / 180;
  const dirOf = (a) => [Math.sin(rad(a)), Math.cos(rad(a))];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const mid = (a, b, t) => { t = t == null ? 0.5 : t; return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; };
  const norm = (a) => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const rot2 = (v, deg) => { const c = Math.cos(rad(deg)), s = Math.sin(rad(deg)); return [v[0] * c - v[1] * s, v[0] * s + v[1] * c]; };
  const f = (n) => Math.round(n * 10) / 10;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const mirror = (pts) => pts.map((p) => [-p[0], p[1]]);
  const sym = (half) => half.concat(mirror(half.slice(1, -1)).reverse());   // demi-contour (haut -> menton) -> contour fermé
  function P(T) {
    let d = "";
    for (let i = 1; i < arguments.length; i++) {
      const a = arguments[i];
      if (typeof a === "string") d += a; else { const p = T ? T(a) : a; d += f(p[0]) + " " + f(p[1]) + " "; }
    }
    return d;
  }
  function ellPts(cx, cy, rx, ry, n, rotDeg) {
    const out = [];
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; let p = [Math.cos(a) * rx, Math.sin(a) * ry]; if (rotDeg) p = rot2(p, rotDeg); out.push([cx + p[0], cy + p[1]]); }
    return out;
  }
  // trait net (détails du visage : précis même en petit)
  function ln(g, d, w, col, o) {
    return el("path", Object.assign({ d, fill: "none", stroke: col || INK, "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round" }, o), g);
  }
  function fill(g, d, col, o) { return el("path", Object.assign({ d, fill: col, stroke: "none" }, o), g); }
  const bez = (p0, p1, p2, p3, t) => { const u = 1 - t; return [u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]]; };
  function rnd(seed) { let s = seed >>> 0 || 1; return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }

  // contour « bouclé » : rééchantillonne puis fait gonfler un point sur deux
  function bumpy(pts, step, amp) {
    const n = pts.length, out = []; let cx = 0, cy = 0;
    pts.forEach((p) => { cx += p[0] / n; cy += p[1] / n; });
    for (let i = 0; i < n; i++) {
      const a = pts[i], b = pts[(i + 1) % n], L = Math.hypot(b[0] - a[0], b[1] - a[1]), k = Math.max(1, Math.round(L / step));
      for (let j = 0; j < k; j++) {
        const q = mid(a, b, j / k), q2 = mid(a, b, (j + 0.5) / k);
        const d = norm(sub(b, a)); let nn = [d[1], -d[0]];
        if ((q2[0] - cx) * nn[0] + (q2[1] - cy) * nn[1] < 0) nn = mul(nn, -1);
        out.push(q, add(q2, mul(nn, amp)));
      }
    }
    return out;
  }

  function limbPath(J, w) {
    const d1 = norm(sub(J[1], J[0])), d2 = norm(sub(J[2], J[1]));
    const n1 = [d1[1], -d1[0]], n2 = [d2[1], -d2[0]];
    let nm = add(n1, n2); if (Math.hypot(nm[0], nm[1]) < 0.3) nm = n1; nm = norm(nm);
    const k = Math.min(1.12, 1 / Math.max(0.5, nm[0] * n1[0] + nm[1] * n1[1]));
    const rows = [[J[0], n1, w[0]], [mid(J[0], J[1]), n1, (w[0] + w[1]) / 2 + 1], [J[1], nm, w[1] * k], [mid(J[1], J[2]), n2, (w[1] + w[2]) / 2 + 0.5], [J[2], n2, w[2]]];
    const L = rows.map((r) => add(r[0], mul(r[1], r[2] / 2))), Rr = rows.map((r) => sub(r[0], mul(r[1], r[2] / 2))).reverse();
    return blob(L.concat([add(J[2], mul(d2, w[2] * 0.3))], Rr, [sub(J[0], mul(d1, w[0] * 0.22))]));
  }
  function joints(p0, a1, l1, a2, l2) { const p1 = add(p0, mul(dirOf(a1), l1)); return [p0, p1, add(p1, mul(dirOf(a2), l2))]; }
  // cinématique inverse à 2 os : épaule s -> poignet t ; bend = ±1 (côté du coude)
  function ik(s, t, l1, l2, bend) {
    let v = sub(t, s), d = Math.hypot(v[0], v[1]);
    d = clamp(d, Math.abs(l1 - l2) + 2, l1 + l2 - 1); v = mul(norm(v), d);
    const a = Math.acos(clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1)) * 180 / Math.PI;
    const e = add(s, mul(rot2(norm(v), bend * a), l1));
    return [s, e, add(s, v)];
  }

  // ───────────────────────── types de personnes
  const LOOKS = {
    woman: {
      female: true, hair: "longwave", hairTone: "dark", beard: "none", glasses: false,
      head: [[0, -63], [30, -57], [50, -35], [55, -5], [52, 21], [41, 43], [21, 60], [0, 66]],
      sw: 39, hw: 36, hipW: 16, armW: [24, 20.5, 17.5], legW: [31, 26, 20], neckW: 9,
      eyeW: 12.8, eyeH: 10.4, iris: 7.3, lidW: 3.3, lashes: true, slant: -1.4, browT: 3.1, browGap: 19, lips: true, nose: "small", earR: 9,
    },
    man: {
      female: false, hair: "short", hairTone: "dark", beard: "stubble", glasses: false,
      head: [[0, -64], [32, -58], [52, -35], [56, -3], [55, 25], [48, 47], [27, 63], [0, 67]],
      sw: 47, hw: 39, hipW: 19, armW: [29, 25, 21], legW: [34, 29, 23], neckW: 12,
      eyeW: 11.4, eyeH: 8.6, iris: 6.4, lidW: 2.7, lashes: false, slant: 0, browT: 5.2, browGap: 16.5, lips: false, nose: "mid", earR: 11,
    },
    oldwoman: {
      female: true, old: true, hair: "bun", hairTone: "grey", beard: "none", glasses: true,
      head: [[0, -61], [32, -54], [52, -31], [57, -1], [57, 27], [46, 49], [23, 62], [0, 65]],
      sw: 40, hw: 40, hipW: 17, armW: [25, 21.5, 18], legW: [32, 27, 21], neckW: 9.5,
      eyeW: 10.6, eyeH: 7.6, iris: 6, lidW: 2.6, lashes: false, slant: 0.8, browT: 2.6, browGap: 17, lips: true, nose: "small", earR: 10,
    },
    oldman: {
      female: false, old: true, hair: "crown", hairTone: "grey", beard: "moustache", glasses: false,
      head: [[0, -65], [31, -59], [50, -35], [53, -3], [53, 27], [47, 49], [26, 66], [0, 70]],
      sw: 45, hw: 40, hipW: 19, armW: [28, 24, 20.5], legW: [33, 28, 22], neckW: 11,
      eyeW: 10.2, eyeH: 7, iris: 5.8, lidW: 2.5, lashes: false, slant: 1, browT: 6, browGap: 16, lips: false, nose: "big", earR: 13,
    },
  };

  // ───────────────────────── expressions
  // open : ouverture de l'œil · hi/ho : paupière haute côté nez / côté tempe · low : paupière basse remontée (joues)
  // slant : coin externe qui tombe (+) · brow : [intérieur↑, extérieur↑, hauteur, arc] · mode : open | closed | happy | squeeze
  const EXPR = {
    neutral: { open: 1, brow: [0, 0, 0, 0], mouth: "soft" },
    smile: { open: 0.95, low: 0.35, brow: [0.5, 0, 1.5, 1], mouth: "smile" },
    bigsmile: { open: 0.86, low: 0.65, brow: [0.5, 0, 3.5, 2], mouth: "grin" },
    love: { open: 0.6, low: 0.55, brow: [2.5, 0, 1.5, 1], mouth: "smile", blush: true, hl: 1.35 },
    worried: { open: 1.06, slant: 1.6, brow: [6.5, -2, 2, 0], mouth: "wavy" },
    pain: { mode: "squeeze", brow: [-4, 4, -3, 0], mouth: "pain", sweat: true, blush: true, knit: true },
    sad: { open: 0.76, ho: 0.8, slant: 3, brow: [7.5, -2.5, 0, 0], mouth: "frown", gaze: [0, 0.55] },
    cry: { mode: "closed", slant: 2.5, brow: [8.5, -3, 0, 0], mouth: "wail", tears: 1, blush: true },
    shock: { open: 1.42, iris: 0.76, brow: [2, 2, 9, 2.5], mouth: "o" },
    angry: { open: 0.8, hi: 0.42, brow: [-7.5, 3.5, -3.5, -1.5], mouth: "tight", knit: true },
    focused: { open: 0.72, hi: 0.8, brow: [-3, 1, -2, 0], mouth: "flat" },
    calm: { open: 0.82, low: 0.25, brow: [1, 0, 1, 1], mouth: "smallsmile" },
    sleep: { mode: "closed", brow: [1, 0, 0, 0.5], mouth: "soft" },
    kiss: { mode: "closed", brow: [2, 0, 1, 1], mouth: "kiss" },
  };

  // ───────────────────────── coiffures (repère tête, regard vers +x en profil)
  const OUT = [[-61, 2], [-63, -24], [-49, -54], [-23, -70], [0, -73], [23, -70], [49, -54], [63, -24], [61, 2]];
  const SHORT_F = [[-58, -2], [-62, -26], [-50, -55], [-26, -71], [2, -77], [26, -72], [50, -55], [62, -26], [58, -2], [53, -19], [46, -37], [26, -45], [4, -37], [-20, -49], [-42, -39], [-53, -19]];
  const SHORT_S = [[48, -40], [30, -61], [0, -73], [-36, -66], [-62, -37], [-67, 0], [-57, 34], [-39, 42], [-35, 24], [-27, 9], [-23, -7], [-7, -9], [-3, 8], [5, 6], [8, -13], [26, -29], [42, -31]];
  const FEM_S = [[50, -40], [30, -61], [0, -73], [-36, -66], [-62, -37], [-65, -6], [-51, 20], [-31, 22], [-25, 2], [-7, -9], [5, -25], [30, -38]];
  const HAIR = {
    longwave: {
      front: {
        coverEar: true,
        behind: [[[0, -75], [36, -69], [61, -42], [67, 0], [64, 34], [72, 62], [68, 90], [50, 104], [32, 94], [0, 86], [-32, 94], [-50, 104], [-68, 90], [-72, 62], [-64, 34], [-67, 0], [-61, -42], [-36, -69]]],
        cap: [[-55, 26], [-62, 2], [-61, -26], [-48, -55], [-23, -71], [0, -74], [23, -71], [48, -55], [61, -26], [62, 2], [55, 26], [53, 6], [49, -18], [34, -40], [8, -52], [-14, -57], [-32, -44], [-48, -22], [-53, 4]],
        strands: [[[-14, -56], [-40, -51], [-55, -24], [-57, 8]], [[-8, -67], [24, -63], [49, -40], [57, 0]], [[4, -59], [30, -52], [48, -28]], [[63, 30], [70, 60], [61, 92]], [[-63, 30], [-70, 60], [-61, 92]], [[56, 46], [59, 72], [47, 96]], [[-56, 46], [-59, 72], [-47, 96]]],
      },
      side: {
        coverEar: true,
        behind: [[[-4, -74], [-48, -63], [-70, -27], [-74, 26], [-84, 64], [-75, 100], [-47, 110], [-24, 96], [-10, 60], [-4, 20]]],
        cap: [[48, -42], [30, -62], [0, -74], [-36, -67], [-62, -39], [-68, -4], [-60, 32], [-30, 46], [-7, 32], [2, 6], [12, -18], [30, -34]],
        strands: [[[20, -52], [-14, -50], [-40, -22], [-46, 20]], [[36, -40], [8, -30], [-8, 0], [-14, 30]], [[-68, 20], [-78, 62], [-66, 98]], [[-52, 40], [-58, 76], [-44, 104]]],
      },
    },
    ponytail: {
      front: {
        behind: [[[-30, -64], [-64, -62], [-90, -32], [-97, 14], [-88, 52], [-73, 62], [-71, 30], [-66, 0], [-54, -30]]],
        cap: OUT.concat([[56, -6], [50, -29], [30, -46], [4, -41], [-20, -51], [-44, -35], [-56, -6]]),
        strands: [[[-20, -50], [-2, -64], [30, -60], [54, -34]], [[-22, -52], [-44, -44], [-57, -18]], [[-80, -30], [-88, 14], [-80, 48]]],
        tie: [-58, -47],
      },
      side: {
        behind: [[[-50, -52], [-78, -55], [-101, -24], [-105, 24], [-93, 60], [-78, 54], [-80, 20], [-74, -10], [-58, -28]]],
        cap: FEM_S,
        strands: [[[34, -44], [0, -58], [-40, -46], [-58, -30]], [[20, -34], [-10, -30], [-40, -10]], [[-88, -22], [-94, 20], [-86, 50]]],
        tie: [-62, -40],
      },
    },
    bun: {
      front: {
        bun: [0, -86, 24], cap: OUT.concat([[56, -6], [49, -30], [27, -49], [0, -45], [-27, -49], [-49, -30], [-56, -6]]),
        strands: [[[0, -46], [-24, -62], [-52, -30]], [[0, -46], [24, -62], [52, -30]], [[-10, -70], [0, -62], [10, -70]]],
      },
      side: {
        bun: [-58, -54, 22], cap: FEM_S,
        strands: [[[34, -44], [0, -58], [-40, -52], [-56, -44]], [[20, -34], [-14, -34], [-46, -30]]],
      },
    },
    short: {
      front: { cap: SHORT_F, strands: [[[-18, -50], [-4, -66], [22, -66], [48, -44]], [[-20, -50], [-40, -52], [-56, -24]], [[0, -40], [20, -54], [44, -40]]], tuft: [[-12, -72], [-2, -86], [14, -78]] },
      side: { cap: SHORT_S, strands: [[[40, -36], [10, -56], [-30, -50], [-58, -22]], [[20, -30], [-16, -34], [-48, -6]], [[-40, 34], [-50, 10], [-46, -14]]], tuft: [[10, -70], [22, -84], [34, -72]] },
    },
    crown: {
      front: { tufts: [[[43, -42], [60, -32], [68, -6], [65, 12], [55, -4], [51, -24]], [[-43, -42], [-60, -32], [-68, -6], [-65, 12], [-55, -4], [-51, -24]]], lines: [[[-22, -59], [0, -66], [24, -58]], [[-10, -53], [8, -58], [26, -50]]] },
      side: { cap: [[-8, -38], [-40, -44], [-65, -16], [-66, 18], [-54, 38], [-37, 41], [-33, 23], [-25, 7], [-10, -6]], lines: [[[-4, -62], [18, -64], [38, -52]]] },
    },
    bald: { front: { lines: [[[20, -56], [34, -48], [42, -36]]] }, side: { lines: [[[-30, -56], [-44, -44], [-52, -30]]] } },
  };
  HAIR.shortcurly = {
    front: { cap: bumpy(SHORT_F.map((q) => [q[0] * 1.05, q[1] * 1.04 + 1]), 15, 6), curls: [[-30, -58], [-6, -64], [20, -62], [40, -50], [-48, -38], [52, -32], [8, -50], [-18, -54]] },
    side: { cap: bumpy(SHORT_S.map((q) => [q[0] * 1.04 - 1, q[1] * 1.04 + 1]), 15, 6), curls: [[20, -54], [-6, -60], [-32, -52], [-50, -30], [-52, -4], [-44, 22], [-14, -36], [8, -40], [-30, -22]] },
  };
  HAIR.bob = {
    front: {
      coverEar: true,
      behind: [[[0, -74], [40, -66], [64, -38], [70, 4], [66, 44], [50, 54], [0, 40], [-50, 54], [-66, 44], [-70, 4], [-64, -38], [-40, -66]]],
      cap: [[-58, 44], [-66, 4], [-63, -26], [-49, -55], [-23, -71], [0, -74], [23, -71], [49, -55], [63, -26], [66, 4], [58, 44], [50, 20], [48, -14], [40, -30], [10, -34], [-20, -32], [-44, -28], [-50, 16]],
      strands: [[[-30, -34], [-10, -60], [20, -62]], [[-56, -10], [-60, 20], [-56, 40]], [[56, -10], [60, 20], [56, 40]]],
    },
    side: {
      coverEar: true,
      cap: [[50, -36], [30, -62], [0, -74], [-36, -67], [-62, -39], [-68, -4], [-62, 40], [-30, 50], [-4, 44], [0, 10], [14, -8], [34, -18], [48, -22]],
      strands: [[[30, -50], [-10, -52], [-44, -20], [-50, 30]], [[30, -24], [0, -10], [-10, 30]]],
    },
  };

  // ───────────────────────── tenues
  const OUTFITS = {
    casual: { top: "grey", sleeve: "short", legs: "mid", neck: "round" },
    sweater: { top: "mid", sleeve: "long", legs: "dark", neck: "roll", cuffs: true, rib: true },
    jacket: { top: "white", sleeve: "long", legs: "mid", open: true, inner: "tee", hem: 18, cuffs: true },
    maternity: { top: "grey", sleeve: "short", legs: "skin", neck: "scoop", hem: 78, flare: 50, pregnant: true, bow: true },
    coat: { top: "white", sleeve: "long", legs: "grey", open: true, inner: "scrubs", hem: 62, cuffs: true, stetho: true, buttons: true, pocket: true },
    scrubs: { top: "grey", sleeve: "short", legs: "grey", neck: "v", pocket: true },
    robe: { top: "dark", sleeve: "bell", legs: "dark", hem: 138, flare: 62, inner: "jabot" },
    suit: { top: "dark", sleeve: "long", legs: "dark", open: true, inner: "tie", hem: 16, cuffs: true },
  };

  const DEF = {
    look: "woman", outfit: "casual", view: "front", facing: 1, expr: "neutral", seed: 1,
    armL: [-8, 10], armR: [8, -10], legL: [-1, 0], legR: [1, 0],
    torsoLean: 0, headTilt: 0, look2: [0, 0], lift: 0, blink: 0, talk: 0, tears: null,
  };

  function resolve(params) {
    const q = params || {};
    const L = LOOKS[q.look] || LOOKS.woman;
    const O = Object.assign({}, OUTFITS[q.outfit] || OUTFITS.casual);
    const p = Object.assign({}, DEF, { hair: L.hair, hairTone: L.hairTone, beard: L.beard, glasses: L.glasses }, q);
    if (q.look2 == null && q.gaze) p.look2 = q.gaze;
    p.facing = p.facing === -1 ? -1 : 1;
    p.view = p.view === "side" || p.view === "three-quarter" ? p.view : "front";
    p.bodyView = p.bodyView || (p.view === "side" ? "side" : "front");
    p.pregnant = p.pregnant != null ? !!p.pregnant : !!O.pregnant;
    if (!HAIR[p.hair]) p.hair = L.hair;
    if (!TONE[p.hairTone]) p.hairTone = L.hairTone;
    return { p, L, O };
  }

  // ───────────────────────── squelette
  const TH = 80, SH = 76, UA = 58, FA = 54, HEAD_UP = 54;
  function rig(p, L) {
    const side = p.bodyView === "side", lean = p.torsoLean || 0, facing = p.facing;
    const hipW = side ? 5 : L.hipW;
    const mkLeg = (a, x) => joints([x, 0], a[0], TH, a[0] + a[1], SH);
    const JL = mkLeg(p.legL, -hipW), JR = mkLeg(p.legR, hipW);
    const low = Math.max(JL[2][1] + 12, JR[2][1] + 12, JL[1][1] + 14, JR[1][1] + 14);
    const maxFoot = Math.max(JL[2][1], JR[2][1]);
    const hipY = -low - (p.lift || 0);
    const W = (v) => [v[0], v[1] + hipY];
    const T = (v) => { const r = rot2(v, lean); return [r[0], r[1] + hipY]; };
    const sw = side ? 28 : L.sw, hw = side ? 26 : L.hw;
    const shL = side ? [-3, -123] : [-(sw - 4), -119], shR = side ? [3, -121] : [sw - 4, -119];
    const mkArm = (a, s, reach, bend) => {
      const s0 = T(s);
      if (reach) {
        const t = [reach[0] * facing, reach[1]], d = norm(sub(t, s0));
        return ik(s0, sub(t, mul(d, 8)), UA, FA, bend);
      }
      const k = p.armLen || [1, 1];
      return joints(s0, a[0] - lean, UA * k[0], a[0] + a[1] - lean, FA * k[1]);
    };
    const AL = mkArm(p.armL, shL, p.reachL, p.bendL || (side ? -1 : 1));
    const AR = mkArm(p.armR, shR, p.reachR, p.bendR || -1);
    const handOf = (J) => add(J[2], mul(norm(sub(J[2], J[1])), 10));
    const nk = side ? 5 : 0;
    const headRot = lean * 0.55 + (p.headTilt || 0);
    const neck = T([nk, -141]);
    const hc = add(neck, rot2([0, -HEAD_UP], headRot));
    const H = (v) => add(hc, rot2(v, headRot));
    const lay = faceLayout(p.view);
    const out = (v) => [f(v[0] * facing), f(v[1])];
    const top = H([0, -74]);
    const anchors = {
      head: out(hc), mouth: out(H(lay.mouth)), eyes: lay.eyes.map((e) => out(H([e[0], e[1]]))),
      handL: out(handOf(AL)), handR: out(handOf(AR)), hip: out([0, hipY]),
      chest: out(T([side ? 14 : 0, -95])), belly: out(T(side ? [sw + (p.pregnant ? 28 : 4), -44] : [0, -42])),
      shoulderL: out(T(shL)), shoulderR: out(T(shR)),
      top: out(top), neck: out(neck), chin: out(H([side ? 40 : 0, 66])), forehead: out(H([side ? 50 : 0, -34])),
      footL: out(W(JL[2])), footR: out(W(JR[2])), height: f(-top[1]),
    };
    return { side, lean, hipW, JL, JR, maxFoot, hipY, W, T, sw, hw, AL, AR, handOf, nk, headRot, neck, hc, anchors };
  }

  // ───────────────────────── visage
  function faceLayout(view) {
    if (view === "side") return { eyes: [[32, 4, 0.72, 1]], mouth: [42.5, 41], mw: 0.56, cheeks: [[22, 27]], noseX: null };
    if (view === "three-quarter") return { eyes: [[-15, 5, 1, 1], [29, 5, 0.78, -1]], mouth: [9, 41], mw: 0.92, cheeks: [[-31, 28], [37, 27]], noseX: 12, tq: true };
    return { eyes: [[-22, 5, 1, 1], [22, 5, 1, -1]], mouth: [0, 41], mw: 1, cheeks: [[-36, 28], [36, 28]], noseX: 0 };
  }

  // œil : (cx,cy) centre, sx largeur relative, inn = +1 si le coin interne est du côté +x
  function drawEye(g, cx, cy, sx, inn, E, L, gaze, old) {
    const w = L.eyeW * sx, blinkOpen = E.open;
    const out = [cx - inn * w, cy - 0.5 + (E.slant || 0) + (L.slant || 0)], inP = [cx + inn * w, cy + 1.2];
    const lidW = L.lidW;
    if (E.mode === "squeeze") {
      const a = [cx - inn * w * 0.95, cy - 6.5], b = [cx + inn * w * 0.75, cy + 0.8], c = [cx - inn * w * 0.95, cy + 6.5];
      ln(g, P(null, "M", a, "Q", [cx, cy - 1.5], b, "Q", [cx, cy + 3], c), lidW + 0.2);
      ln(g, P(null, "M", [cx - inn * (w + 3), cy - 1], "L", [cx - inn * (w + 8), cy - 3], "M", [cx - inn * (w + 3), cy + 3], "L", [cx - inn * (w + 8), cy + 5]), 1.5, "#55554F");
      return;
    }
    if (E.mode === "happy") {
      ln(g, P(null, "M", [out[0], cy + 3], "Q", [cx, cy - 9], [inP[0], cy + 3]), lidW + 0.2);
      return;
    }
    if (E.mode === "closed" || blinkOpen < 0.14) {
      const dip = 6.5;
      const c1 = [cx - inn * w * 0.45, cy + dip], c2 = [cx + inn * w * 0.5, cy + dip];
      const o2 = [out[0], out[1] + 1];
      ln(g, P(null, "M", o2, "C", c1, c2, inP), lidW + 0.1);
      if (L.lashes) [0.1, 0.3, 0.52].forEach((t, i) => { const q = bez(o2, c1, c2, inP, t); ln(g, P(null, "M", q, "L", [q[0] - inn * (3.6 - i * 0.6), q[1] + 4.6 - i * 0.5]), 1.7); });
      else if (old) ln(g, P(null, "M", [out[0] - inn * 3, cy + 1], "L", [out[0] - inn * 7, cy + 3]), 1.3, "#77776F");
      return;
    }
    const hU = L.eyeH * Math.min(blinkOpen, 1.45), hL = 4.6 * (1 - (E.low || 0) * 0.75) * (blinkOpen > 1.2 ? 1.25 : 1);
    const hi = E.hi == null ? 1 : E.hi, ho = E.ho == null ? 1 : E.ho;
    const c1 = [cx - inn * w * 0.55, out[1] - hU * 1.36 * ho], c2 = [cx + inn * w * 0.5, inP[1] - hU * 1.36 * hi];
    const lowC = [cx, cy + hL * 2];
    const dUp = P(null, "M", out, "C", c1, c2, inP), dLow = P(null, "Q", lowC, out);
    fill(g, dUp + dLow + "Z", "#FFFFFF");
    // iris + pupille + reflets
    const r = L.iris * (E.iris || 1) * (sx < 0.9 ? 0.92 : 1);
    const ix = cx + gaze[0] * (w - r + 2.5) * 0.8, iy = cy - 0.4 + gaze[1] * 3.4 + (blinkOpen > 1.2 ? 0.6 : 0);
    el("ellipse", { cx: f(ix), cy: f(iy), rx: f(r * (sx < 0.9 ? 0.86 : 1)), ry: f(r), fill: "#5E5E58", stroke: INK, "stroke-width": 1.7 }, g);
    el("ellipse", { cx: f(ix), cy: f(iy + 0.3), rx: f(r * 0.5), ry: f(r * 0.54), fill: INK }, g);
    const hl = E.hl || 1;
    el("circle", { cx: f(ix + r * 0.36), cy: f(iy - r * 0.42), r: f(r * 0.3 * hl), fill: "#FFFFFF" }, g);
    el("circle", { cx: f(ix - r * 0.42), cy: f(iy + r * 0.4), r: f(r * 0.14 * hl), fill: "#FFFFFF" }, g);
    // caches paupières (peau) pour couper l'iris
    const x0 = out[0] - inn * 3, x1 = inP[0] + inn * 3;
    fill(g, P(null, "M", [x0, out[1]], "L", out, "C", c1, c2, inP, "L", [x1, inP[1]], "L", [x1, cy - hU - 13], "L", [x0, cy - hU - 13], "Z"), "#FFFFFF");
    fill(g, P(null, "M", [x1, inP[1]], "L", inP, "Q", lowC, out, "L", [x0, out[1]], "L", [x0, cy + hL + 11], "L", [x1, cy + hL + 11], "Z"), "#FFFFFF");
    // pli de paupière, paupière basse, trait de paupière, cils
    if (blinkOpen > 0.5) ln(g, P(null, "M", [out[0] + inn * 1.5, out[1] - 4.5 - (old ? 0 : 0.5)], "C", [c1[0], c1[1] - 4.6], [c2[0], c2[1] - 4], [inP[0] - inn * 2.5, inP[1] - 4.2]), 1.25, "#8A8A84");
    const q0 = bez(out, mid(out, lowC, 0.667), mid(inP, lowC, 0.667), inP, 0.06), q1 = bez(out, mid(out, lowC, 0.667), mid(inP, lowC, 0.667), inP, 0.62);
    ln(g, P(null, "M", q0, "Q", [mid(q0, q1)[0], mid(q0, q1)[1] + hL * 0.42], q1), 1.35, "#55554F");
    ln(g, dUp, lidW);
    if (L.lashes) {
      ln(g, P(null, "M", out, "Q", [out[0] - inn * 3, out[1] - 0.6], [out[0] - inn * 5.2, out[1] - 3.6]), 2.3);
      if (blinkOpen > 0.7) { const q = bez(out, c1, c2, inP, 0.16); ln(g, P(null, "M", q, "L", [q[0] - inn * 3, q[1] - 3.6]), 1.6); }
    }
    if (old) {  // poche + patte d'oie
      ln(g, P(null, "M", [cx - inn * w * 0.7, cy + hL + 4.5], "Q", [cx, cy + hL + 8], [cx + inn * w * 0.6, cy + hL + 4.5]), 1.2, "#8A8A84");
      ln(g, P(null, "M", [out[0] - inn * 3.5, out[1] - 1], "L", [out[0] - inn * 8.5, out[1] - 3.5], "M", [out[0] - inn * 3.5, out[1] + 2.5], "L", [out[0] - inn * 8.5, out[1] + 4.5]), 1.2, "#8A8A84");
    }
  }

  function drawBrow(g, cx, cy, sx, inn, E, L, col) {
    const b = E.brow || [0, 0, 0, 0], bw = 12.6 * sx, by = cy - L.browGap - b[2] - (E.open > 1.2 ? 3 : 0);
    const pin = [cx + inn * bw * (E.knit ? 1.02 : 0.92), by - b[0] + 1], pout = [cx - inn * bw * 1.12, by - b[1] + 2.6];
    const pm = [cx - inn * 1.5, by - 4.2 - b[3] - (b[0] + b[1]) * 0.42];
    const t = L.browT;
    const d = P(null, "M", [pin[0], pin[1] - t / 2], "Q", [pm[0], pm[1] - t * 0.32], pout, "Q", [pm[0], pm[1] + t * 0.62], [pin[0], pin[1] + t / 2], "Z");
    el("path", { d, fill: col, stroke: col, "stroke-width": 1.5, "stroke-linejoin": "round" }, g);
    if (L.old && !L.female) {  // sourcils broussailleux
      [0.25, 0.5, 0.75].forEach((k) => { const q = [lerp(pin[0], pout[0], k), lerp(pin[1], pout[1], k) - 3.5 + Math.abs(k - 0.5) * 3]; ln(g, P(null, "M", q, "L", [q[0] - inn * 2.6, q[1] - 3.4]), 1.5, col); });
    }
  }

  function drawMouth(g, mx, my, mw, kind, L, talk, sideV) {
    const M = (q) => [mx + q[0] * mw, my + q[1]];
    const lipW = L.female ? 2.9 : 2.7, lipCol = INK, soft = "#55554F";
    const openShape = (w, up, dn, cornerY, teeth, tongue) => {
      const a = M([-w, cornerY]), b = M([w, cornerY]), top = M([0, up]), depth = cornerY * 0.25 + dn * 0.75;
      const d = P(null, "M", a, "Q", top, b, "C", M([w * 0.9, dn]), M([-w * 0.9, dn]), a, "Z");
      fill(g, d, DARK);
      if (tongue) fill(g, P(null, "M", M([-w * 0.42, depth - 3.2]), "Q", M([0, depth - 10]), M([w * 0.42, depth - 3.2]), "Q", M([0, depth + 0.6]), M([-w * 0.42, depth - 3.2]), "Z"), "#8D8D86");
      if (teeth) fill(g, P(null, "M", a, "Q", top, b, "Q", M([0, up + teeth + (cornerY - up) * 1.2]), a, "Z"), "#FFFFFF");
      ln(g, d, 2.3);
      if (L.lips && !sideV) ln(g, P(null, "M", M([-w * 0.4, depth + 4]), "Q", M([0, depth + 6.5]), M([w * 0.4, depth + 4])), 1.3, soft);
    };
    if (talk > 0.1 && ["grin", "pain", "wail", "o", "kiss"].indexOf(kind) < 0) {
      const smileY = (kind === "smile" || kind === "smallsmile" || kind === "soft") ? -2 : (kind === "frown" || kind === "tight" || kind === "wavy" ? 2.5 : 0);
      openShape(11 - talk * 2.5, -1.5 - talk * 1.5 + smileY * 0.2, 4 + talk * 19, smileY, talk > 0.45 ? 3.2 : 0, talk > 0.6);
      return;
    }
    const corner = (s, dy) => { const c = M([s * 12, dy]); ln(g, P(null, "M", [c[0] - s * 1.2 * mw, c[1] - 2.6], "Q", [c[0] + s * 1.6 * mw, c[1]], [c[0] + s * 0.4 * mw, c[1] + 2.4]), 1.5, soft); };
    const lower = (y, w) => { if (L.lips && !sideV) ln(g, P(null, "M", M([-(w || 5.5), y]), "Q", M([0, y + 3]), M([w || 5.5, y])), 1.4, soft); };
    switch (kind) {
      case "smile": ln(g, P(null, "M", M([-12, -2.5]), "Q", M([0, 11]), M([12, -2.5])), lipW, lipCol); if (!sideV) { corner(-1, -2.5); corner(1, -2.5); } lower(9.5); break;
      case "smallsmile": ln(g, P(null, "M", M([-9.5, -1]), "Q", M([0, 7]), M([9.5, -1])), lipW, lipCol); lower(7.5, 4.5); break;
      case "grin": openShape(15, 1, 21, -3.5, 5, true); if (!sideV) { corner(-1.24, -4); corner(1.24, -4); } break;
      case "frown": ln(g, P(null, "M", M([-10.5, 5]), "Q", M([0, -5.5]), M([10.5, 5])), lipW, lipCol); lower(5.5, 5); break;
      case "wavy": ln(g, curveD([M([-11, 3]), M([-5, -2.5]), M([0, 1]), M([5.5, 3.5]), M([11, 0.5])]), lipW, lipCol); lower(7, 4.5); break;
      case "flat": ln(g, P(null, "M", M([-8.5, 1]), "Q", M([0, 0.2]), M([8.5, 1])), lipW, lipCol); lower(5.5, 4.5); break;
      case "tight": ln(g, P(null, "M", M([-11, 5.5]), "Q", M([0, -4.5]), M([11, 5.5])), lipW + 0.5, lipCol); ln(g, P(null, "M", M([-5, 8.5]), "L", M([5, 8.5])), 1.4, soft); break;
      case "o": {
        const c = M([0, 4]);
        el("ellipse", { cx: f(c[0]), cy: f(c[1]), rx: f(7 * mw), ry: 10, fill: DARK, stroke: INK, "stroke-width": 2.3 }, g);
        el("ellipse", { cx: f(c[0]), cy: f(c[1] + 5), rx: f(4 * mw), ry: 3.6, fill: "#8D8D86" }, g); break;
      }
      case "pain": {
        const a = M([-13, 4]), b = M([13, 4]), d = P(null, "M", a, "C", M([-9, -8]), M([9, -8]), b, "C", M([10, 24]), M([-10, 24]), a, "Z");
        fill(g, d, DARK);
        fill(g, P(null, "M", a, "C", M([-9, -8]), M([9, -8]), b, "Q", M([0, 1]), a, "Z"), "#FFFFFF");
        fill(g, P(null, "M", M([-6, 13]), "Q", M([0, 8]), M([6, 13]), "Q", M([0, 20]), M([-6, 13]), "Z"), "#8D8D86");
        ln(g, d, 2.4);
        if (!sideV) { ln(g, P(null, "M", M([-16.5, 1]), "L", M([-14.5, 7])), 1.5, soft); ln(g, P(null, "M", M([16.5, 1]), "L", M([14.5, 7])), 1.5, soft); }
        break;
      }
      case "wail": {
        const a = M([-11.5, 9]), b = M([11.5, 9]), d = P(null, "M", a, "C", M([-8, -7]), M([8, -7]), b, "C", M([7, 19]), M([-7, 19]), a, "Z");
        fill(g, d, DARK); fill(g, P(null, "M", M([-5, 12]), "Q", M([0, 7]), M([5, 12]), "Q", M([0, 16]), M([-5, 12]), "Z"), "#8D8D86"); ln(g, d, 2.4);
        lower(19, 4.5); break;
      }
      case "kiss": {
        const c = M([sideV ? 9 : 0, 2]);
        ln(g, P(null, "M", [c[0] - 3 * mw, c[1] - 5], "Q", [c[0] + 5 * mw, c[1] - 3], [c[0] - 1 * mw, c[1]], "Q", [c[0] + 5 * mw, c[1] + 3], [c[0] - 3 * mw, c[1] + 5]), 2.4); break;
      }
      default: ln(g, P(null, "M", M([-8.5, 0]), "Q", M([0, 4.2]), M([8.5, 0])), lipW, lipCol); lower(6, 4.5);
    }
  }
  function curveD(pts) { return curve(pts); }

  function drop(g, x, y, s, fillCol) {
    el("path", { d: P(null, "M", [x, y - 9 * s], "Q", [x + 6.5 * s, y + 1 * s], [x, y + 4.5 * s], "Q", [x - 6.5 * s, y + 1 * s], [x, y - 9 * s], "Z"), fill: fillCol, stroke: INK, "stroke-width": 1.7, "stroke-linejoin": "round" }, g);
  }

  function sidePts(L) {
    const ns = L.nose === "big" ? 6 : (L.nose === "mid" ? 3 : 0), ch = L.female ? 0 : 3, jw = L.female ? 0 : 3;
    return [[-2, -64], [30, -58], [49, -37], [54, -14], [53, -1], [57 + ns * 0.5, 9], [63 + ns, 18 + ns * 0.3], [56, 24 + ns * 0.3], [55, 32], [55, 42], [51 + ch, 55 + ch * 0.5], [38 + ch, 64 + ch], [14, 61 + jw], [-10, 52 + jw * 0.5], [-34, 44], [-54, 26], [-62, 0], [-59, -28], [-39, -53]];
  }
  function tqPts(half) {
    return sym(half).map((q) => { let x = q[0]; const y = q[1]; if (y > 36) x += 8 * (y - 36) / 30; if (x > 30 && y < 12 && y > -22) x -= 4.5; if (q[0] > 30 && y >= 12 && y < 36) x += 1; if (q[0] < 0 && y < 34) x -= 4; return [x, y]; });
  }

  function drawHead(C, p, L, view) {
    const g = C.g, side = view === "side", tq = view === "three-quarter";
    const tone = TONE[p.hairTone], hm = MAT[tone.mat], skin = MAT.skin;
    const Hd = (HAIR[p.hair] || HAIR.short)[side ? "side" : "front"] || {};
    const hx = tq ? -5 : 0, HP = (pts) => hx ? pts.map((q) => [q[0] + hx, q[1]]) : pts;
    const E = Object.assign({ open: 1, mode: "open" }, EXPR[p.expr] || EXPR.neutral);
    if (p.blink) { if (E.mode === "open") E.open = E.open * (1 - clamp(p.blink, 0, 1)); }
    const gz0 = p.look2 || [0, 0], gz = [clamp(gz0[0] + (E.gaze ? E.gaze[0] : 0), -1, 1), clamp(gz0[1] + (E.gaze ? E.gaze[1] : 0), -1, 1)];
    const lay = faceLayout(view);

    // cheveux derrière
    if (Hd.behind) Hd.behind.forEach((b, i) => shape(C, "hairB" + i, blob(HP(b)), hm));
    if (Hd.bun) shape(C, "bun", blob(ellPts(Hd.bun[0] + hx, Hd.bun[1], Hd.bun[2], Hd.bun[2] * 0.92, 9)), hm);
    // oreilles (face / trois-quarts)
    const er = L.earR;
    if (!side && !Hd.coverEar) {
      if (!tq) { shape(C, "earR", blob(ellPts(57, 9, er, er + 3, 7)), skin, { sw: 2.3 }); ln(g, P(null, "M", [58, 4], "Q", [63, 9], [58, 14]), 1.3, "#77776F"); }
      shape(C, "earL", blob(ellPts(tq ? -55 : -57, 9, er, er + 3, 7)), skin, { sw: 2.3 });
      if (!tq) ln(g, P(null, "M", [-58, 4], "Q", [-63, 9], [-58, 14]), 1.3, "#77776F");
    }
    // tête
    const pts = side ? sidePts(L) : (tq ? tqPts(L.head) : sym(L.head));
    shape(C, "head", blob(pts, side ? 0.85 : 1), skin, { sw: 2.7 });

    // barbe (sous les traits du visage)
    const bcol = p.hairTone === "grey" ? "#8A8A84" : (p.hairTone === "blond" ? "#A5A292" : "#55554F");
    const mx = lay.mouth[0], my = lay.mouth[1];
    if (p.beard === "short") {
      const bm = { base: hm.base === "#5E5E58" ? "#77776F" : hm.base, hatch: hm.hatch, gap: 3.6, fw: 1.3 };
      let bp;
      if (side) bp = [[-6, 10], [10, 20], [30, 22], [48, 26], [56, 34], [55, 46], [52, 58], [38, 67], [14, 63], [-8, 54], [-14, 30]];
      else { const k = tq ? 7 : 0; bp = [[-55, 6], [-46, 20], [-26, 24], [mx, 22], [26 + k, 24], [46 + k * 0.4, 20], [55 - (tq ? 3 : 0), 6], [56, 26], [48 + k * 0.5, 48], [27 + k, 64], [k, 68], [-27 + k * 0.6, 64], [-48, 48], [-56, 26]]; }
      shape(C, "beard", blob(bp, 0.9), bm, { sw: 2.2, r: 1.3 });
      el("ellipse", { cx: mx + (side ? 4 : 0), cy: my + 2, rx: (side ? 9 : 15) * lay.mw + 2, ry: 8.5, fill: "#FFFFFF" }, g);
    } else if (p.beard === "stubble") {
      const R = rnd(977 + (p.seed || 1) * 31), dots = [];
      for (let i = 0; i < 150; i++) {
        const x = (R() * 2 - 1) * 56, y = 16 + R() * 52;
        let ok;
        if (side) { const xs = (x + 56) * 0.6 - 8; ok = (y > 26 && y < 64 && xs < 54 - Math.max(0, y - 52) * 1.2 && xs > -10 + (64 - y) * 0.1) && !(Math.abs(xs - mx - 3) < 9 && Math.abs(y - my - 2) < 8) && (y > 44 || xs > 20 || y > 30 && xs < 20); if (ok) dots.push([xs, y]); continue; }
        const xx = x + (tq ? 4 : 0), lim = 54 - Math.max(0, y - 30) * 0.95;
        ok = Math.abs(x) < lim && (y > 47 || Math.abs(x) > 26 || (y > 27 && y < 34 && Math.abs(x - (tq ? 8 : 0)) < 15)) && !(Math.abs(xx - mx) < 15 && Math.abs(y - my - 2) < 8);
        if (ok) dots.push([xx + (tq && y > 40 ? 4 : 0), y]);
      }
      dots.forEach((d) => el("line", { x1: f(d[0]), y1: f(d[1]), x2: f(d[0] + 0.6), y2: f(d[1] + 2.2), stroke: bcol, "stroke-width": 1.35, "stroke-linecap": "round" }, g));
    }

    // joues : rose léger (blush) ou petites hachures grises
    const blushOn = p.blush != null ? p.blush : !!E.blush;
    lay.cheeks.forEach((c) => {
      if (blushOn) el("ellipse", { cx: c[0], cy: c[1], rx: side ? 9 : 10.5, ry: 6.5, fill: CFG.blush, opacity: 0.55 }, g);
      for (let k = -1; k <= 1; k++) el("line", { x1: c[0] + k * 5 - 2.6, y1: c[1] + 3.6, x2: c[0] + k * 5 + 2.6, y2: c[1] - 3.6, stroke: blushOn ? "#D98478" : "#C4C4BE", "stroke-width": 1.5, "stroke-linecap": "round" }, g);
    });

    // yeux + sourcils
    lay.eyes.forEach((e) => drawEye(g, e[0], e[1], e[2], e[3], E, L, gz, L.old));
    lay.eyes.forEach((e) => drawBrow(g, e[0], e[1], e[2], e[3], E, L, tone.brow));
    if (E.knit && !side) { const nx = lay.noseX; ln(g, P(null, "M", [nx - 2.5, -17], "L", [nx - 1.5, -10], "M", [nx + 3, -17], "L", [nx + 2, -11]), 1.4, "#55554F"); }

    // nez
    const ey = lay.eyes[0][1];
    if (!side) {
      const nx = lay.noseX, big = L.nose === "big" ? 1.35 : (L.nose === "mid" ? 1.15 : 1);
      if (tq) {
        ln(g, P(null, "M", [nx - 1, ey - 1], "Q", [nx + 2 * big, ey + 10], [nx + 8.5 * big, ey + 17 * big], "Q", [nx + 8 * big, ey + 22 * big], [nx + 0.5, ey + 21.5 * big]), 2.1, "#3A3A37");
        ln(g, P(null, "M", [nx - 5, ey + 19 * big], "Q", [nx - 3, ey + 22.5 * big], [nx, ey + 21.5 * big]), 1.6, "#55554F");
      } else {
        ln(g, P(null, "M", [nx + 2.5, ey + (L.female ? 11 : 6)], "Q", [nx + 7.5 * big, ey + 18 * big], [nx + 0.5, ey + 20.5 * big]), 2.1, "#3A3A37");
        ln(g, P(null, "M", [nx - 5 * big, ey + 18 * big], "Q", [nx - 3.5, ey + 21.5 * big], [nx + 0.5, ey + 20.5 * big]), 1.6, "#55554F");
        if (L.nose === "big") ln(g, P(null, "M", [nx + 7, ey + 15], "Q", [nx + 11, ey + 20], [nx + 6, ey + 23]), 1.5, "#55554F");
      }
    } else {
      ln(g, P(null, "M", [52, 22], "Q", [49, 19], [51, 16]), 1.6, "#55554F");
    }
    // rides
    if (L.old) {
      const wc = "#8A8A84";
      if (side) { ln(g, P(null, "M", [22, -36], "Q", [34, -39], [44, -34], "M", [26, -28], "Q", [36, -31], [46, -26]), 1.3, wc); ln(g, P(null, "M", [44, 22], "Q", [36, 32], [38, 44]), 1.4, wc); }
      else {
        const k = tq ? 7 : 0;
        ln(g, P(null, "M", [-20 + k, -37], "Q", [k, -41], [20 + k, -37], "M", [-14 + k, -30], "Q", [k, -33], [14 + k, -30]), 1.3, wc);
        ln(g, P(null, "M", [mx - 13, 24], "Q", [mx - 19, 34], [mx - 17, 45], "M", [mx + 13, 24], "Q", [mx + 19, 34], [mx + 17, 45]), 1.4, wc);
        if (L.female) ln(g, P(null, "M", [mx - 34, 46], "Q", [mx - 30, 54], [mx - 22, 57], "M", [mx + 34, 46], "Q", [mx + 30, 54], [mx + 22, 57]), 1.2, wc);
      }
    }
    // moustache
    if (p.beard === "moustache") {
      const mc = p.hairTone === "grey" ? { base: "#E6E6E1", hatch: "#96968F", gap: 3.4, fw: 1.2 } : { base: "#77776F", hatch: INK, gap: 3.2, fw: 1.3 };
      const w = side ? 13 : 23 * lay.mw, cx = mx + (side ? 2 : 0), cy = my - 8;
      shape(C, "mous", blob([[cx - w, cy + 8], [cx - w * 0.62, cy - 2], [cx, cy - 5], [cx + w * 0.62, cy - 2], [cx + w, cy + 8], [cx + w * 0.5, cy + 6], [cx, cy + 3], [cx - w * 0.5, cy + 6]]), mc, { sw: 2, r: 0.8 });
    }
    // bouche
    const mouthKind = p.mouth || E.mouth;
    const gm = p.beard === "moustache" ? el("g", { transform: "translate(0 6)" }, g) : g;
    drawMouth(gm, mx, my, lay.mw, mouthKind, L, clamp(p.talk === true ? 0.7 : (p.talk || 0), 0, 1), side);

    // coiffe
    if (Hd.cap) shape(C, "cap", blob(HP(Hd.cap), 0.9), hm);
    if (Hd.tufts) Hd.tufts.forEach((t, i) => { if (!(tq && i === 0 && false)) shape(C, "tuft" + i, blob(HP(t)), hm, { sw: 2.3 }); });
    if (Hd.strands) Hd.strands.forEach((s, i) => stroke(C, "strand" + i, curve(HP(s)), { sw: 1.7, stroke: tone.strand, r: 0.7, single: true }));
    if (Hd.lines) Hd.lines.forEach((s, i) => stroke(C, "hl" + i, curve(HP(s)), { sw: 1.8, stroke: "#8A8A84", r: 0.6, single: true }));
    if (Hd.curls) Hd.curls.forEach((c, i) => ln(g, P(null, "M", [c[0] + hx - 5, c[1] + 2], "Q", [c[0] + hx - 2, c[1] - 6], [c[0] + hx + 4, c[1] - 1], "Q", [c[0] + hx + 6, c[1] + 4], [c[0] + hx + 1, c[1] + 4]), 1.6, tone.strand));
    if (Hd.tuft) stroke(C, "tuftl", curve(HP(Hd.tuft)), { sw: 2.5, r: 0.6 });
    if (Hd.tie) el("ellipse", { cx: Hd.tie[0] + hx, cy: Hd.tie[1], rx: 6, ry: 8, fill: YEL, stroke: INK, "stroke-width": 2, transform: `rotate(-35 ${Hd.tie[0] + hx} ${Hd.tie[1]})` }, g);
    // oreille de profil
    if (side && !Hd.coverEar) {
      shape(C, "ear", blob(ellPts(-12, 9, er - 1.5, er + 2.5, 7)), skin, { sw: 2.2, r: 0.6 });
      ln(g, P(null, "M", [-10, 4], "Q", [-16, 9], [-11, 14]), 1.4, "#77776F");
    }
    // lunettes
    if (p.glasses) {
      const eyes = lay.eyes, gy = eyes[0][1] + 1;
      eyes.forEach((e, i) => g.appendChild(C.rc.ellipse(e[0], gy, 34 * e[2], 30, { roughness: 0.5, stroke: INK, strokeWidth: 2.3, seed: 500 + i + (C.seed || 1), fill: "rgba(255,255,255,0.22)", fillStyle: "solid" })));
      if (eyes.length > 1) ln(g, P(null, "M", [eyes[0][0] + 17, gy - 3], "Q", [(eyes[0][0] + eyes[1][0]) / 2 + 2, gy - 8], [eyes[1][0] - 17 * eyes[1][2], gy - 3]), 2.1);
      if (side) ln(g, P(null, "M", [eyes[0][0] - 12, gy - 3], "L", [-10, 4]), 2.1);
      else { ln(g, P(null, "M", [eyes[0][0] - 17, gy - 3], "L", [tq ? -52 : -56, gy - 4]), 2.1); if (!tq) ln(g, P(null, "M", [eyes[1][0] + 17, gy - 3], "L", [56, gy - 4]), 2.1); }
    }
    // larmes
    const tears = p.tears != null ? p.tears : (E.tears || 0);
    if (tears > 0.02) lay.eyes.forEach((e, i) => {
      const s = e[3], x = e[0] - s * 4 * e[2], y0 = e[1] + 9;
      ln(g, P(null, "M", [x, y0], "Q", [x - s * 2, y0 + 8 * tears], [x - s * 1, y0 + 14 * tears]), 1.5, "#6F93AD");
      drop(g, x - s * 1, y0 + 12 + 16 * tears, 0.95, CFG.tear);
      if (tears > 0.6 && !side) drop(g, e[0] + s * 7 * e[2], y0 + 6 + 8 * tears, 0.6, CFG.tear);
    });
    // sueur
    if (p.sweat != null ? p.sweat : E.sweat) {
      if (side) { drop(g, 8, -40, 1, "#FFFFFF"); drop(g, -4, -22, 0.7, "#FFFFFF"); }
      else { drop(g, tq ? -44 : 44, -34, 1, "#FFFFFF"); drop(g, tq ? -34 : 52, -16, 0.7, "#FFFFFF"); }
    }
    if (E.mode === "squeeze" && p.emph !== false) {
      const pts = side ? [[70, -30, 86, -40], [74, -8, 92, -10]] : [[-66, -52, -82, -64], [66, -52, 82, -64], [-72, -30, -90, -34], [72, -30, 90, -34]];
      pts.forEach((l, i) => stroke(C, "emph" + i, P(null, "M", [l[0], l[1]], "L", [l[2], l[3]]), { stroke: YEL, sw: 4.5, r: 0.8 }));
    }
  }

  // main : moufle (jamais de doigts)
  function drawHand(C, key, wrist, d, th, skin) {
    const nrm = [d[1] * th, -d[0] * th];
    const pts = [[-6, -8], [2, -12], [9, -16.5], [14, -12.5], [22, -9], [25, 0], [22, 9], [13, 12.5], [3, 12], [-6, 8]].map((q) => add(wrist, add(mul(d, q[0] - 2), mul(nrm, -q[1]))));
    shape(C, key + "hand", blob(pts), skin, { sw: 2.5 });
  }

  // ───────────────────────── personnage
  function person(g, params) {
    const r0 = resolve(params), p = r0.p, L = r0.L, O = r0.O;
    while (g.firstChild) g.removeChild(g.firstChild);
    const facing = p.facing;
    const root = el("g", facing === -1 ? { transform: "scale(-1,1)" } : null, g);
    const C = ctx(root, p.seed, facing === -1, p.lw);
    const R = rig(p, L), side = R.side, lean = R.lean, T = R.T, W = R.W, sw = R.sw, hw = R.hw;
    const skin = MAT.skin, preg = p.pregnant, hunch = clamp(lean * 0.35, 0, 18);
    const topM = MAT[O.top], legM = O.legs === "skin" ? MAT.skin : MAT[O.legs];
    const hide = p.hide || [], only = p.only || null;
    const vis = (k) => hide.indexOf(k) < 0;

    function drawLeg(J, key, mirrorShoe) {
      const Jw = J.map(W), bare = O.legs === "skin";
      shape(C, key, limbPath(Jw, bare ? [26, 21.5, 15.5] : L.legW), legM);
      const s = (key === "legL" ? p.legL : p.legR), sa = s[0] + s[1];
      const air = clamp((R.maxFoot - J[2][1]) / 16 + (p.lift || 0) / 16, 0, 1);
      let rotS = side ? (sa < 0 ? -sa * 0.8 : -sa * 0.45) * air : 0;
      if (side && sa < -70) rotS = 38;
      const sg = el("g", { transform: `translate(${f(Jw[2][0])} ${f(Jw[2][1])}) rotate(${f(rotS)}) scale(${side ? 1 : (mirrorShoe ? -0.82 : 0.82)},1)` }, C.g);
      const Cs = C.sub(sg);
      if (bare) { shape(Cs, key + "shoe", blob([[-12, 3], [-10, -5], [4, -5], [20, -3], [31, 3], [32, 9], [20, 12], [-9, 12]]), MAT.mid, { sw: 2.3 }); }
      else shape(Cs, key + "shoe", blob([[-14, 2], [-12, -9], [2, -12], [18, -8], [31, -2], [34, 7], [22, 12], [-9, 12]]), MAT.shoe, { sw: 2.4 });
    }
    function drawArm(J, key, handOnly) {
      const type = O.sleeve, aw = L.armW;
      const d = norm(sub(J[2], J[1])), th = (side || key === "armL") ? 1 : -1;
      if (!handOnly) {
        if (type === "bell") shape(C, key, limbPath(J, [31, 33, 38]), topM);
        else if (type === "long") shape(C, key, limbPath(J, [aw[0] + 3, aw[1] + 3, aw[2] + 3.5]), topM);
        else {
          shape(C, key, limbPath(J, aw), skin);
          const e = mid(J[0], J[1], 0.52);
          shape(C, key + "sl", limbPath([J[0], mid(J[0], e), e], [aw[0] + 2.5, aw[0] + 2.5, aw[0] + 3]), topM, { sw: 2.4 });
        }
      }
      drawHand(C, key, J[2], d, p["thumb" + key.slice(3)] || th, skin);
      if (!handOnly && O.cuffs) {
        const n = [d[1], -d[0]], c = sub(J[2], mul(d, 7)), hwd = (aw[2] + 4) / 2 + 1;
        stroke(C, key + "cuff", P(null, "M", add(c, mul(n, hwd)), "L", sub(c, mul(n, hwd))), { sw: 2.2, r: 0.5, stroke: O.top === "dark" ? "#000" : INK });
        if (O.rib) { const c2 = sub(J[2], mul(d, 13)); stroke(C, key + "cuff2", P(null, "M", add(c2, mul(n, hwd)), "L", sub(c2, mul(n, hwd))), { sw: 1.6, r: 0.5, stroke: "#55554F", single: true }); }
      }
    }

    function drawNeckHead() {
      const nk = R.nk, nw = L.neckW;
      el("path", { d: P(T, "M", [nk - nw, -152], "L", [nk - nw, -134], "L", [nk + nw, -134], "L", [nk + nw, -152], "Z"), fill: skin.base }, C.g);
      const hg = el("g", { transform: `translate(${f(R.hc[0])} ${f(R.hc[1])}) rotate(${f(R.headRot)})` }, C.g);
      drawHead(C.sub(hg), p, L, p.view);
    }
    const armLBack = p.armLBack != null ? p.armLBack : side;
    const armRBack = !!p.armRBack;
    if (only) {
      const list = Array.isArray(only) ? only : [only];
      list.forEach((k) => {
        if (k === "armL" || k === "arms") drawArm(R.AL, "armL");
        if (k === "armR" || k === "arms") drawArm(R.AR, "armR");
        if (k === "handL") drawArm(R.AL, "armL", true);
        if (k === "handR") drawArm(R.AR, "armR", true);
        if (k === "head") drawNeckHead();
      });
      return R.anchors;
    }
    if (armLBack && vis("armL")) drawArm(R.AL, "armL");
    if (armRBack && vis("armR")) drawArm(R.AR, "armR");
    drawLeg(R.JL, "legL", true);
    drawLeg(R.JR, "legR", false);

    // ── torse
    const hem = O.hem || 0, fl = O.flare || (L.female ? 44 : 48);
    const bust = L.female && side ? 4 : 0;
    const lineCol = O.top === "dark" ? "#000" : INK;
    const hp = (x, y) => rot2([x, y == null ? hem : y], -lean * 0.55);
    let hemR = 0, hemL = 0;
    if (hem) {
      const sR = Math.sin(rad(Math.max(p.legL[0], p.legR[0]))), sL = Math.sin(rad(Math.min(p.legL[0], p.legR[0])));
      const reach = Math.min(hem, TH);
      if (side) { hemR = Math.max(fl - 15, reach * sR * 0.9 + 19) + (preg ? 12 : 0); hemL = Math.max(fl - 17, -reach * sL * 0.8 + 17); }
      else { hemR = Math.max(fl, reach * sR + R.hipW + 22) + (preg ? 4 : 0); hemL = Math.max(fl, -reach * sL + R.hipW + 22) + (preg ? 4 : 0); }
    }
    let d;
    if (side) {
      d = P(T, "M", [-8, -139], "C", [-30 - hunch, -140], [-sw - 4 - hunch, -104], [-sw - hunch * 0.3, -60], "Q", [-hw - 2, -20], [-hw, 8]);
      const thA = Math.max(p.legL[0], p.legR[0]);
      if (hem && thA > 40) {   // assis : la jupe suit les cuisses
        const dd = dirOf(thA), nD = [-dd[1], dd[0]], len = Math.min(hem + 8, TH - 2), E = mul(dd, len);
        d += P(W, "L", [-hw + 8, 30], "L", add(E, mul(nD, 19)), "Q", add(E, mul(dd, 5)), add(E, mul(nD, -20)));
        d += preg ? P(T, "C", [hw + 34, -8], [sw + 44, -66], [sw + 3 + bust, -94]) : P(T, "Q", [sw + 8, -30], [sw + 3 + bust, -84]);
      } else if (hem) {
        d += P(T, "L", hp(-hemL), "Q", add(hp(0), [0, 7]), hp(hemR));
        d += preg ? P(T, "C", [hw + 26, 20], [sw + 46, -62], [sw + 3 + bust, -94]) : P(T, "Q", [sw + 5, -30], [sw + 3 + bust, -84]);
      } else {
        d += P(T, "Q", [0, 20], [hw, 8]);
        d += preg ? P(T, "C", [hw + 34, 4], [sw + 44, -66], [sw + 3 + bust, -94]) : P(T, "Q", [sw + 5, -30], [sw + 3 + bust, -84]);
      }
      d += P(T, "C", [sw + 3 + bust, -120], [sw - 4, -138], [10, -139], "Z");
    } else {
      const wc = preg ? hw + 27 : (L.female ? hw - 3 : (sw + hw) / 2);
      d = P(T, "M", [-20, -139], "Q", [-sw - 2, -141], [-sw - 2, -114], "Q", [-wc, -52], [-hw - 2, 8]);
      d += hem ? P(T, "L", hp(-hemL), "Q", add(hp(0), [0, 8]), hp(hemR), "L", [hw + 2, 8]) : P(T, "Q", [0, 22], [hw + 2, 8]);
      d += P(T, "Q", [wc, -52], [sw + 2, -114], "Q", [sw + 2, -141], [20, -139], "Z");
    }
    shape(C, "torso", d, topM);

    // ── détails de la tenue
    if (side) {
      if (O.open) {
        stroke(C, "open", P(T, "M", [sw - 9, -128], "Q", [sw - 6 + (preg ? 20 : 0), -40], hem > 30 ? hp(hemR - 12) : [hw - 8 + (preg ? 12 : 0), hem + 6]), { sw: 2.2, r: 0.6, stroke: lineCol });
        if (O.inner === "tie" || O.inner === "tee" || O.inner === "scrubs") shape(C, "inner", P(T, "M", [9, -139], "L", [sw + 2, -127], "L", [sw + 1, -104], "Z"), O.inner === "tie" ? MAT.white : MAT.grey, { sw: 2 });
        if (O.inner === "jabot") shape(C, "jabot", P(T, "M", [10, -139], "L", [sw + 1, -128], "L", [sw - 2, -96], "L", [14, -118], "Z"), MAT.white, { sw: 2.2 });
      } else if (O.inner === "jabot") shape(C, "jabot", P(T, "M", [10, -139], "L", [sw + 1, -128], "L", [sw - 2, -96], "L", [14, -118], "Z"), MAT.white, { sw: 2.2 });
      else if (O.neck === "roll") shape(C, "roll", blob(mapT([[-10, -146], [12, -147], [18, -138], [10, -131], [-10, -132], [-15, -139]], T)), topM, { sw: 2.2 });
      else if (O.neck) shape(C, "vneck", P(T, "M", [8, -139], "L", [sw + 1, -128], "L", [sw - 1, O.neck === "v" ? -110 : -118], "Z"), skin, { sw: 2 });
      if (O.stetho && p.stetho !== false) { stroke(C, "st1", P(T, "M", [-4, -137], "Q", [10, -112], [sw - 4, -106]), { sw: 3.2, r: 0.5, stroke: DARK }); const c = T([sw - 2, -100]); el("circle", { cx: f(c[0]), cy: f(c[1]), r: 6.5, fill: "#CFCFCA", stroke: INK, "stroke-width": 2.2 }, C.g); }
      if (O.bow) stroke(C, "bust", P(T, "M", [-sw + 1, -88], "Q", [0, -82], [sw + 6, -90]), { sw: 1.8, r: 0.5, stroke: "#55554F", single: true });
      if (preg) stroke(C, "bellyc", P(T, "M", [sw + 14, -72], "Q", [sw + 26, -40], [sw + 10, -10]), { sw: 1.5, r: 0.5, stroke: "#8A8A84", single: true });
      if (O.rib) stroke(C, "ribh", P(T, "M", [-hw + 2, -2], "Q", [0, 9], [hw - 1, -2]), { sw: 1.7, r: 0.5, stroke: "#55554F", single: true });
    } else {
      if (O.open) {
        const innerM = O.inner === "tie" ? MAT.white : MAT.grey;
        if (O.inner === "jabot") { /* (robe : voir plus bas) */ }
        else {
          shape(C, "vneck", P(T, "M", [-14, -139], "L", [2, -84], "L", [14, -139], "Q", [0, -133], [-14, -139], "Z"), innerM, { sw: 2 });
          if (O.inner === "tee") shape(C, "tee", P(T, "M", [-9, -139], "Q", [0, -126], [9, -139], "Q", [0, -135], [-9, -139], "Z"), skin, { sw: 1.8 });
          if (O.inner === "scrubs") shape(C, "vsk", P(T, "M", [-9, -139], "L", [0, -120], "L", [9, -139], "Q", [0, -135], [-9, -139], "Z"), skin, { sw: 1.8 });
          if (O.inner === "tie") el("path", { d: P(T, "M", [-3, -134], "L", [6, -134], "L", [5, -126], "L", [8, -100], "L", [2, -90], "L", [-3, -100], "L", [-1, -126], "Z"), fill: "#77776F", stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" }, C.g);
          shape(C, "lapL", P(T, "M", [-15, -140], "L", [-28, -108], "L", [1, -83], "Z"), topM, { sw: 2.3, stroke: lineCol });
          shape(C, "lapR", P(T, "M", [15, -140], "L", [29, -108], "L", [3, -83], "Z"), topM, { sw: 2.3, stroke: lineCol });
          stroke(C, "open", P(T, "M", [2, -83], "L", hem ? hp(3) : [3, 14]), { sw: 2.2, r: 0.6, stroke: lineCol });
          if (O.buttons) [[9, -40], [9, -14]].forEach((b) => { const c = T(b); el("circle", { cx: f(c[0]), cy: f(c[1]), r: 2.6, fill: INK }, C.g); });
          if (O.inner === "tie") { const c = T([9, -52]); el("circle", { cx: f(c[0]), cy: f(c[1]), r: 2.4, fill: "#000" }, C.g); }
          if (O.pocket) stroke(C, "pock", P(T, "M", [-36, 6], "L", [-14, 7]), { sw: 2, r: 0.5, single: true });
        }
      }
      if (O.inner === "jabot") {
        shape(C, "jabot", P(T, "M", [-17, -140], "L", [0, -120], "L", [17, -140], "Q", [0, -133], [-17, -140], "Z"), MAT.white, { sw: 2.2 });
        shape(C, "jabot2", P(T, "M", [-6, -124], "L", [6, -124], "L", [9, -86], "L", [0, -76], "L", [-9, -86], "Z"), MAT.white, { sw: 2.2 });
      }
      if (!O.open && O.neck === "roll") {
        shape(C, "roll", blob(mapT([[-17, -146], [0, -150], [17, -146], [19, -136], [0, -130], [-19, -136]], T)), topM, { sw: 2.2 });
        [-9, -3, 3, 9].forEach((x, i) => stroke(C, "rr" + i, P(T, "M", [x, -147], "L", [x * 1.1, -133]), { sw: 1.3, r: 0.4, stroke: "#55554F", single: true }));
        stroke(C, "ribh", P(T, "M", [-hw + 1, -1], "Q", [0, 10], [hw - 1, -1]), { sw: 1.7, r: 0.5, stroke: "#55554F", single: true });
      } else if (!O.open && O.neck === "v") shape(C, "vneck", P(T, "M", [-14, -140], "L", [0, -108], "L", [14, -140], "Q", [0, -134], [-14, -140], "Z"), skin, { sw: 2.2 });
      else if (!O.open && O.neck === "scoop") shape(C, "vneck", P(T, "M", [-17, -140], "Q", [0, -106], [17, -140], "Q", [0, -134], [-17, -140], "Z"), skin, { sw: 2.2 });
      else if (!O.open && O.neck === "round") shape(C, "vneck", P(T, "M", [-13, -140], "Q", [0, -120], [13, -140], "Q", [0, -134], [-13, -140], "Z"), skin, { sw: 2.2 });
      if (O.pocket && !O.open) stroke(C, "pock", P(T, "M", [10, -84], "L", [10, -66], "L", [30, -66], "L", [30, -84]), { sw: 2, r: 0.5, single: true });
      if (O.bow) {
        stroke(C, "bust", P(T, "M", [-sw + 2, -88], "Q", [0, -80], [sw - 2, -88]), { sw: 1.9, r: 0.5, stroke: "#55554F", single: true });
        const c = T([0, -84]);
        el("path", { d: `M${f(c[0])} ${f(c[1])} l-10 -6 l0 12 Z M${f(c[0])} ${f(c[1])} l10 -6 l0 12 Z`, fill: YEL, stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" }, C.g);
      }
      if (preg) {
        stroke(C, "bellyc", P(T, "M", [-hw - 3, -46], "C", [-hw - 2, 4], [hw + 2, 4], [hw + 3, -46]), { sw: 1.9, r: 0.6, stroke: "#55554F", single: true });
        stroke(C, "bellyc2", P(T, "M", [hw - 12, -52], "Q", [hw - 7, -40], [hw - 12, -26]), { sw: 1.4, r: 0.5, stroke: "#8A8A84", single: true });
      }
      if (O.stetho && p.stetho !== false) {
        stroke(C, "st1", P(T, "M", [-19, -137], "C", [-28, -110], [-21, -86], [-18, -70], "M", [19, -137], "C", [27, -120], [23, -106], [18, -95]), { sw: 3.2, r: 0.5, stroke: DARK });
        const c = T([-18, -63]); el("circle", { cx: f(c[0]), cy: f(c[1]), r: 7, fill: "#CFCFCA", stroke: INK, "stroke-width": 2.3 }, C.g);
      }
      if (p.badge) {
        const c = T([20, -68]);
        const bg = el("g", { transform: `translate(${f(c[0])} ${f(c[1])}) rotate(${f(lean - 4)})` }, C.g);
        el("rect", { x: -14, y: -8, width: 28, height: 17, rx: 3, fill: YEL, stroke: INK, "stroke-width": 2 }, bg);
        text(bg, String(p.badge).slice(0, 4), 0, 5.5, 12.5, { transform: facing === -1 ? "scale(-1,1)" : null });
      }
    }

    if (vis("head")) drawNeckHead();

    if (!armLBack && vis("armL")) drawArm(R.AL, "armL");
    if (!armRBack && vis("armR")) drawArm(R.AR, "armR");
    return R.anchors;
  }
  function mapT(pts, T) { return pts.map(T); }

  // tête seule (gros plan) : origine au centre de la tête
  function head(g, params) {
    const r0 = resolve(params), p = r0.p, L = r0.L;
    while (g.firstChild) g.removeChild(g.firstChild);
    const root = el("g", { transform: `${p.facing === -1 ? "scale(-1,1) " : ""}rotate(${f(p.headTilt || 0)})` }, g);
    const C = ctx(root, p.seed, p.facing === -1, p.lw);
    if (p.neck !== false) {
      const nx = p.view === "side" ? 5 : 0, nw = L.neckW + 1;
      shape(C, "neckS", P(null, "M", [nx - nw, 50], "L", [nx - nw - 1, 84], "Q", [nx, 90], [nx + nw + 1, 84], "L", [nx + nw, 50], "Z"), MAT.skin, { sw: 2.3 });
    }
    drawHead(C, p, L, p.view);
    const lay = faceLayout(p.view), o = (v) => { const q = rot2(v, p.headTilt || 0); return [f(q[0] * p.facing), f(q[1])]; };
    return { head: [0, 0], mouth: o(lay.mouth), eyes: lay.eyes.map((e) => o([e[0], e[1]])), top: o([0, -74]) };
  }

  // ───────────────────────── poses
  const TAU = Math.PI * 2;
  const Pose = {
    stand: { view: "front", armL: [-8, 10], armR: [8, -10], legL: [-1, 0], legR: [1, 0], torsoLean: 0, headTilt: 0, lift: 0 },
    walk(ph) {
      const th = ph * TAU, s = Math.sin(th), c = Math.cos(th);
      const knee = (cc) => -(7 + 52 * Math.pow(Math.max(0, cc), 1.2));
      return {
        view: "side", torsoLean: 4, headTilt: -2 + 1.5 * Math.sin(th * 2), lift: 0,
        legR: [28 * s + 4, knee(c)], legL: [-28 * s + 4, knee(-c)],
        armR: [-26 * s + 2, 16 + 10 * Math.max(0, -s)], armL: [26 * s + 2, 16 + 10 * Math.max(0, s)],
      };
    },
    handOnBelly: { view: "front", armL: [-8, 10], armR: [16, -92], legL: [-1, 0], legR: [1, 0], headTilt: 3, look2: [0, 0.5] },
    handOnBellySide: { view: "side", armL: [-6, 14], armR: [10, 62], legL: [-2, 0], legR: [2, -2], headTilt: 6, look2: [0.2, 0.7] },
    bothHandsOnBelly: { view: "front", armL: [-20, 86], armR: [14, -96], legL: [-1, 0], legR: [1, 0], headTilt: 4, look2: [0, 0.7] },
    bothHandsOnBellySide: { view: "side", armL: [18, 44], armR: [6, 70], armLBack: false, legL: [-2, 0], legR: [2, -2], headTilt: 8, look2: [0.2, 0.8] },
    hug: { view: "side", torsoLean: 5, armL: [72, 12], armR: [58, 24], legL: [-3, 0], legR: [3, -2], headTilt: 4 },
    holdHandOut: { view: "front", armL: [-8, 10], armR: [40, -8], legL: [-1, 0], legR: [1, 0] },
    holdHandOutSide: { view: "side", armL: [-6, 12], armR: [44, 10], legL: [-2, 0], legR: [2, -2] },
    armAround: { view: "front", armL: [-8, 10], armR: [96, 26], legL: [-1, 0], legR: [1, 0], headTilt: 4 },
    facepalm: { view: "side", torsoLean: 8, headTilt: 16, armL: [-4, 14], armR: [84, 98], legL: [-2, 0], legR: [2, -2], look2: [0, 0.8] },
    cry: { view: "front", armL: [-50, -157], armR: [50, 157], armLen: [0.32, 0.72], legL: [-2, 0], legR: [2, 0], headTilt: 0, expr: "cry" },
    point: { view: "front", armL: [-8, 10], armR: [84, 22], legL: [-2, 0], legR: [3, 0], torsoLean: 2, look2: [1, 0] },
    wave: { view: "front", armL: [-8, 10], armR: [138, 34], legL: [-1, 0], legR: [1, 0], headTilt: 3 },
    sitEdge: { view: "side", torsoLean: 3, armL: [22, 44], armR: [18, 52], legL: [84, -84], legR: [88, -86], headTilt: 3 },
    sitEdge34: { view: "three-quarter", bodyView: "side", torsoLean: 3, armL: [22, 44], armR: [18, 52], legL: [84, -84], legR: [88, -86], headTilt: 2 },
    kneel: { view: "side", torsoLean: 6, armL: [30, 40], armR: [52, 30], legL: [-6, -82], legR: [80, -108], headTilt: 4 },
  };
  function mix(a, b, t) {
    const o = Object.assign({}, a, b);
    ["armL", "armR", "legL", "legR", "look2"].forEach((k) => { if (a[k] && b[k]) o[k] = [lerp(a[k][0], b[k][0], t), lerp(a[k][1], b[k][1], t)]; });
    ["torsoLean", "headTilt", "lift", "blink", "talk"].forEach((k) => { o[k] = lerp(a[k] || 0, b[k] || 0, t); });
    if (t < 0.5) { o.view = a.view || o.view; o.bodyView = a.bodyView; o.expr = a.expr || o.expr; }
    return o;
  }

  // ───────────────────────── cœur
  function heartPath(s) { return `M0 ${f(9 * s)} C ${f(-20 * s)} ${f(-6 * s)} ${f(-9 * s)} ${f(-20 * s)} 0 ${f(-9 * s)} C ${f(9 * s)} ${f(-20 * s)} ${f(20 * s)} ${f(-6 * s)} 0 ${f(9 * s)} Z`; }
  function heart(g, o) {
    o = Object.assign({ size: 1, seed: 21, fill: true, beat: 0 }, o);
    while (g.firstChild) g.removeChild(g.firstChild);
    const C = ctx(g, o.seed, false, o.lw), s = o.size * 2.2 * (1 + 0.12 * o.beat);
    shape(C, "heart", heartPath(s), o.fill ? MAT.yellow : MAT.white, { sw: 2.6, r: 0.9 });
    ln(g, `M${f(-9 * s)} ${f(-9 * s)} q ${f(2 * s)} ${f(-4 * s)} ${f(5 * s)} ${f(-3 * s)}`, 1.8, "#FFFFFF");
    return { w: 40 * s, h: 30 * s };
  }

  // ───────────────────────── couple (femme enceinte à gauche, homme à droite)
  function couple(g, params) {
    const o = Object.assign({ mode: "holdHands", exprA: null, exprB: null, heart: 0, blink: 0, talk: 0, talkA: null, talkB: null, seed: 1, manScale: 1.06 }, params);
    while (g.firstChild) g.removeChild(g.firstChild);
    const sB = o.manScale, mode = o.mode;
    const A0 = Object.assign({ look: "woman", outfit: "maternity", hair: "longwave", hairTone: "dark", seed: o.seed * 7 + 1, facing: 1, blink: o.blink, talk: o.talkA != null ? o.talkA : 0 }, o.a);
    const B0 = Object.assign({ look: "man", outfit: "sweater", hair: "short", hairTone: "dark", beard: "stubble", seed: o.seed * 7 + 2, facing: -1, blink: o.blink, talk: o.talkB != null ? o.talkB : o.talk }, o.b);
    const layer = (x, s, prm) => { const gg = el("g", { transform: `translate(${f(x)} 0)${s !== 1 ? ` scale(${s})` : ""}` }, g); const a = person(gg, prm), m = {}; for (const k in a) { const v = a[k]; m[k] = typeof v === "number" ? f(v * s) : (Array.isArray(v[0]) ? v.map((q) => [f(x + q[0] * s), f(q[1] * s)]) : [f(x + v[0] * s), f(v[1] * s)]); } return m; };
    const loc = (pt, x, s) => [(pt[0] - x) / s, pt[1] / s];
    let xA, xB, A, B, ancA, ancB, hands = null;
    const eA = o.exprA, eB = o.exprB;

    if (mode === "hug") {
      xA = -50; xB = 72;
      A = Object.assign({}, Pose.hug, A0, { expr: eA || "love", torsoLean: 5, headTilt: 3, look2: [0.5, 0], reachR: loc([xB + 26, -246], xA, 1), bendR: -1, reachL: loc([xB + 2, -226], xA, 1), bendL: -1, armLBack: true });
      B = Object.assign({}, Pose.hug, B0, { expr: eB || "sleep", torsoLean: 7, headTilt: 12, reachR: [(xA - 34 - xB) / sB, -268 / sB], bendR: 1, reachL: [(xA - 22 - xB) / sB, -236 / sB], bendL: 1, armLBack: true });
      if (!eA) A.expr = "sleep", A.mouth = "smile", A.blush = true;
      if (!eB) B.mouth = "smallsmile";
      layer(xB, sB, Object.assign({}, B, { hide: ["armR"] }));
      ancA = layer(xA, 1, Object.assign({}, A, { hide: ["armR"] }));
      ancB = layer(xB, sB, Object.assign({}, B, { only: "armR" }));
      layer(xA, 1, Object.assign({}, A, { only: "armR" }));
      const b2 = rig(resolve(B).p, resolve(B).L).anchors; ancB = scaleAnch(b2, xB, sB);
    } else if (mode === "forehead") {
      xA = -52; const s2 = sB * 1.04;
      A = Object.assign({}, Pose.bothHandsOnBellySide, A0, { expr: eA || "sleep", torsoLean: 4, headTilt: 12, blush: true });
      if (!eA) A.mouth = "smile";
      B = Object.assign({}, Pose.hug, B0, { expr: eB || "kiss", torsoLean: 9, headTilt: 10, armLBack: true });
      const ra = resolve(A), fa = rig(ra.p, ra.L).anchors.forehead, rb0 = resolve(B), mb = rig(rb0.p, rb0.L).anchors.mouth;
      xB = xA + fa[0] - mb[0] * s2 + 9;
      B.reachR = [(xA - 8 - xB) / s2, -262 / s2]; B.bendR = 1; B.reachL = [(xA + 8 - xB) / s2, -238 / s2]; B.bendL = 1;
      layer(xB, s2, Object.assign({}, B, { hide: ["armR", "head"] }));
      ancA = layer(xA, 1, A);
      layer(xB, s2, Object.assign({}, B, { only: "head" }));
      layer(xB, s2, Object.assign({}, B, { only: "armR" }));
      const rb = resolve(B); ancB = scaleAnch(rig(rb.p, rb.L).anchors, xB, s2);
    } else if (mode === "armAround") {
      xA = -62; xB = 62;
      A = Object.assign({}, Pose.handOnBelly, A0, { view: "three-quarter", expr: eA || "love", headTilt: 9, look2: [0.4, 0.1] });
      const tgt = [xA - 40, -292];
      B = Object.assign({}, Pose.stand, B0, { view: "three-quarter", expr: eB || "smile", headTilt: 7, look2: [0.6, 0.3], reachR: [(tgt[0] - xB) / sB, tgt[1] / sB], bendR: 1 });
      layer(xB, sB, Object.assign({}, B, { only: "armR" }));
      ancA = layer(xA, 1, A);
      ancB = layer(xB, sB, Object.assign({}, B, { hide: ["armR"] }));
      layer(xB, sB, Object.assign({}, B, { only: "handR" }));
      const rb = resolve(B); ancB = scaleAnch(rig(rb.p, rb.L).anchors, xB, sB);
    } else if (mode === "lookEachOther") {
      xA = -96; xB = 104; hands = [6, -176];
      A = Object.assign({}, Pose.holdHandOutSide, A0, { expr: eA || "love", headTilt: -4, look2: [0.7, -0.25], reachR: loc([hands[0] - 4, hands[1]], xA, 1), bendR: -1, reachL: loc([hands[0] - 6, hands[1] + 22], xA, 1), bendL: -1, armLBack: false });
      B = Object.assign({}, Pose.holdHandOutSide, B0, { expr: eB || "smile", headTilt: 6, look2: [0.7, 0.3], reachR: [(hands[0] + 6 - xB) / sB, (hands[1] + 2) / sB], bendR: 1, reachL: [(hands[0] + 8 - xB) / sB, (hands[1] + 24) / sB], bendL: 1, armLBack: false });
      ancB = layer(xB, sB, B);
      ancA = layer(xA, 1, A);
    } else { // holdHands
      xA = -92; xB = 96; hands = [2, -148];
      A = Object.assign({}, Pose.stand, A0, { view: "three-quarter", expr: eA || "smile", headTilt: 5, look2: [0.35, 0], armL: [-22, 96], reachR: loc([hands[0] - 5, hands[1]], xA, 1), bendR: -1 });
      B = Object.assign({}, Pose.stand, B0, { view: "three-quarter", expr: eB || "smile", headTilt: 4, look2: [0.35, 0.1], reachR: [(hands[0] + 7 - xB) / sB, (hands[1] + 3) / sB], bendR: 1 });
      ancB = layer(xB, sB, B);
      ancA = layer(xA, 1, A);
    }
    // petit cœur entre les deux têtes
    const far = ancB.head[0] - ancA.head[0] > 150;
    const hx = (ancA.head[0] + ancB.head[0]) / 2, hy = (far ? (ancA.head[1] + ancB.head[1]) / 2 - 34 : Math.min(ancA.top[1], ancB.top[1]) - 4) - 26 * clamp(o.heart, 0, 1);
    if (o.heart > 0.02) {
      const hgp = el("g", { transform: `translate(${f(hx)} ${f(hy)}) rotate(${f(-8 + 6 * o.heart)}) scale(${f(0.35 + 0.65 * clamp(o.heart, 0, 1))})`, opacity: f(clamp(o.heart * 3, 0, 1)) }, g);
      heart(hgp, { size: 1.15, seed: 23 });
    }
    return { woman: ancA, man: ancB, heart: [f(hx), f(hy)], hands: hands || [f((ancA.handR[0] + ancB.handR[0]) / 2), f((ancA.handR[1] + ancB.handR[1]) / 2)] };
  }
  function scaleAnch(a, x, s) { const m = {}; for (const k in a) { const v = a[k]; m[k] = typeof v === "number" ? f(v * s) : (Array.isArray(v[0]) ? v.map((q) => [f(x + q[0] * s), f(q[1] * s)]) : [f(x + v[0] * s), f(v[1] * s)]); } return m; }

  // ───────────────────────── nouveau-né emmailloté (origine : centre du paquet, longueur ≈ 200)
  function baby(g, o) {
    o = Object.assign({ state: "sleep", seed: 3, flip: false, hat: true, expr: null }, o);
    while (g.firstChild) g.removeChild(g.firstChild);
    const root = el("g", o.flip ? { transform: "scale(-1,1)" } : null, g);
    const C = ctx(root, o.seed, !!o.flip, o.lw);
    // lange
    shape(C, "wrap", blob([[-34, -40], [4, -44], [52, -34], [92, -12], [106, 14], [92, 36], [48, 44], [-4, 42], [-40, 26], [-48, -8]]), MAT.light);
    shape(C, "wrap2", blob([[-44, -16], [-10, 6], [30, 14], [70, 8], [100, 2], [104, 20], [90, 36], [48, 44], [-4, 42], [-40, 26]], 0.9), MAT.grey, { sw: 2.3 });
    stroke(C, "fold1", curve([[-30, -36], [0, -8], [44, 6], [98, 0]]), { sw: 2, r: 0.6, stroke: "#55554F", single: true });
    stroke(C, "fold2", curve([[20, 16], [50, 28], [84, 30]]), { sw: 1.6, r: 0.6, stroke: "#77776F", single: true });
    stroke(C, "fold3", curve([[40, -34], [58, -18], [60, 4]]), { sw: 1.6, r: 0.6, stroke: "#8A8A84", single: true });
    [[30, -22], [70, -10], [10, -30]].forEach((s, i) => ln(root, `M${s[0] - 4} ${s[1]} l8 0 M${s[0]} ${s[1] - 4} l0 8`, 1.5, "#B4B4AE"));
    // tête
    const hc = [-62, -26], hg = el("g", { transform: `translate(${hc[0]} ${hc[1]}) rotate(-14)` }, root), H = C.sub(hg);
    shape(H, "bearL", blob(ellPts(-42, 6, 7, 9, 6)), MAT.skin, { sw: 2.1 });
    shape(H, "bearR", blob(ellPts(42, 6, 7, 9, 6)), MAT.skin, { sw: 2.1 });
    shape(H, "bhead", blob([[0, -40], [28, -31], [42, -6], [43, 16], [29, 35], [0, 41], [-29, 35], [-43, 16], [-42, -6], [-28, -31]]), MAT.skin, { sw: 2.6 });
    // joues
    [[-27, 18], [27, 18]].forEach((c) => {
      el("ellipse", { cx: c[0], cy: c[1], rx: 9, ry: 6, fill: CFG.blush, opacity: 0.5 }, hg);
      for (let k = -1; k <= 1; k++) el("line", { x1: c[0] + k * 4 - 2, y1: c[1] + 3, x2: c[0] + k * 4 + 2, y2: c[1] - 3, stroke: "#D98478", "stroke-width": 1.3, "stroke-linecap": "round" }, hg);
    });
    // yeux
    const open = o.state === "normal" || o.state === "awake";
    [-17, 17].forEach((x, i) => {
      const s = i === 0 ? -1 : 1;
      if (open) {
        el("ellipse", { cx: x, cy: 5, rx: 6.2, ry: 6.8, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, hg);
        el("ellipse", { cx: x + 0.6, cy: 5.6, rx: 4.3, ry: 4.8, fill: INK }, hg);
        el("circle", { cx: x + 2.2, cy: 3.4, r: 1.6, fill: "#FFFFFF" }, hg); el("circle", { cx: x - 1.4, cy: 7.6, r: 0.8, fill: "#FFFFFF" }, hg);
        ln(hg, `M${x - 7} 2 Q${x} -5 ${x + 7} 2`, 2.2);
      } else {
        ln(hg, `M${x - 7.5} 4 Q${x} 11.5 ${x + 7.5} 4`, 2.5);
        [0, 1, 2].forEach((k) => { const px = x + s * (2 + k * 2.6), py = 8.6 - k * 1.5; ln(hg, `M${f(px)} ${f(py)} l${f(s * 1.8)} ${f(3.4 - k * 0.5)}`, 1.4); });
      }
      ln(hg, `M${x - 6} ${open ? -9 : -7} Q${x} ${open ? -13 : -10} ${x + 6} ${open ? -9 : -7}`, 1.5, "#8A8A84");
    });
    // nez + bouche
    ln(hg, "M-2 15 Q0 18.5 3 15", 1.7, "#55554F");
    const m = o.mouth || (o.state === "cry" ? "cry" : (open ? "smile" : "sleep"));
    if (m === "cry") { el("ellipse", { cx: 0, cy: 28, rx: 6, ry: 6.5, fill: DARK, stroke: INK, "stroke-width": 1.8 }, hg); }
    else if (m === "smile") ln(hg, "M-6 24 Q0 31 6 24", 2.2);
    else { ln(hg, "M-4.5 25 Q-2 23 0 25 Q2 23 4.5 25", 2); ln(hg, "M-2.5 28 Q0 30 2.5 28", 1.4, "#77776F"); }
    // bonnet tricoté ou mèche
    if (o.hat) {
      shape(H, "hat", blob([[-42, -12], [-36, -34], [-14, -50], [14, -50], [36, -34], [42, -12], [22, -19], [0, -21], [-22, -19]]), MAT.grey, { sw: 2.4 });
      shape(H, "hatband", blob([[-44, -9], [-22, -22], [0, -25], [22, -22], [44, -9], [42, 0], [22, -11], [0, -14], [-22, -11], [-42, 0]]), MAT.white, { sw: 2.2 });
      [-30, -18, -6, 6, 18, 30].forEach((x, i) => ln(hg, `M${x} ${-12 - (1 - Math.abs(x) / 34) * 9} l${x * 0.04} 8`, 1.2, "#8A8A84"));
      el("circle", { cx: 0, cy: -54, r: 8, fill: YEL, stroke: INK, "stroke-width": 2 }, hg);
    } else ln(hg, "M-2 -39 C -8 -52 10 -58 12 -48 C 13 -42 4 -42 5 -47", 2.3);
    // petit poing
    shape(C, "bfist", blob(ellPts(-22, 8, 10, 9, 7)), MAT.skin, { sw: 2.2 });
    ln(root, "M-27 6 q5 -3 9 1", 1.3, "#8A8A84");
    const sg = o.flip ? -1 : 1;
    return { head: [hc[0] * sg, hc[1]], chest: [10 * sg, 0], length: 200 };
  }

  // ───────────────────────── accessoires
  function prep(g, seed, lw) { while (g.firstChild) g.removeChild(g.firstChild); return ctx(g, seed || 5, false, lw); }
  const props = {
    heart,
    // valise à roulettes — origine : sol, centre
    suitcase(g, o) {
      o = Object.assign({ w: 150, h: 200, seed: 31, handle: 1 }, o);
      const C = prep(g, o.seed, o.lw), w = o.w, h = o.h, hh = 46 * o.handle;
      stroke(C, "hd", `M${-w * 0.2} ${-h - 12} L${-w * 0.2} ${-h - 12 - hh} Q0 ${-h - 22 - hh} ${w * 0.2} ${-h - 12 - hh} L${w * 0.2} ${-h - 12}`, { sw: 3.4, r: 0.7 });
      [-w * 0.3, w * 0.3].forEach((x, i) => el("circle", { cx: x, cy: -8, r: 9, fill: DARK, stroke: INK, "stroke-width": 2.2 }, g));
      shape(C, "body", rrect(-w / 2, -h - 12, w, h, 16), MAT.grey, { sw: 2.9 });
      shape(C, "band1", rrect(-w / 2 + w * 0.2, -h - 12, 16, h, 2), MAT.mid, { sw: 2 });
      shape(C, "band2", rrect(w / 2 - w * 0.2 - 16, -h - 12, 16, h, 2), MAT.mid, { sw: 2 });
      stroke(C, "zip", `M${-w / 2 + 4} ${-h * 0.52} L${w / 2 - 4} ${-h * 0.52}`, { sw: 1.8, r: 0.5, stroke: "#55554F", single: true });
      shape(C, "grip", rrect(-22, -h - 24, 44, 14, 6), MAT.shoe, { sw: 2 });
      const tg = el("g", { transform: `translate(${w * 0.36} ${-h - 4}) rotate(14)` }, g);
      ln(tg, "M0 -8 L2 8", 1.6); el("path", { d: "M-9 8 L11 8 L11 34 L1 40 L-9 34 Z", fill: YEL, stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, tg); el("circle", { cx: 1, cy: 14, r: 2, fill: INK }, tg);
      return { top: [0, -h - 12 - hh], w, h };
    },
    // lit d'hôtel vu de côté — origine : sol, centre ; tête de lit à gauche
    hotelBed(g, o) {
      o = Object.assign({ w: 520, seed: 33, blanket: 0.62 }, o);
      const C = prep(g, o.seed, o.lw), w = o.w, x0 = -w / 2, x1 = w / 2, top = -92;
      shape(C, "hb", rrect(x0 - 8, -214, 30, 214, 10), MAT.wood, { sw: 2.9 });
      shape(C, "hbp", rrect(x0 + 18, -206, 22, 120, 9), MAT.grey, { sw: 2.4 });
      [x0 + 34, x1 - 26].forEach((x, i) => shape(C, "leg" + i, rrect(x, -26, 16, 26, 3), MAT.mid, { sw: 2.2 }));
      shape(C, "frame", rrect(x0 + 14, -50, w - 14, 26, 6), MAT.wood, { sw: 2.7 });
      shape(C, "matt", rrect(x0 + 20, top, w - 22, 46, 14), MAT.white, { sw: 2.8 });
      stroke(C, "mline", `M${x0 + 30} ${top + 30} L${x1 - 12} ${top + 30}`, { sw: 1.5, r: 0.5, stroke: "#B4B4AE", single: true });
      // oreillers
      shape(C, "pil2", blob([[x0 + 30, top - 6], [x0 + 40, top - 50], [x0 + 100, top - 58], [x0 + 136, top - 40], [x0 + 130, top - 4], [x0 + 80, top + 2]]), MAT.light, { sw: 2.4 });
      shape(C, "pil1", blob([[x0 + 44, top + 2], [x0 + 52, top - 34], [x0 + 112, top - 40], [x0 + 158, top - 26], [x0 + 154, top + 2], [x0 + 100, top + 6]]), MAT.white, { sw: 2.6 });
      stroke(C, "pilc", curve([[x0 + 70, top - 26], [x0 + 100, top - 22], [x0 + 130, top - 26]]), { sw: 1.4, r: 0.5, stroke: "#B4B4AE", single: true });
      // couverture
      const bx = x1 - (w - 40) * o.blanket;
      shape(C, "blank", P(null, "M", [bx, top - 8], "Q", [(bx + x1) / 2, top - 16], [x1 + 4, top - 6], "L", [x1 + 6, -36], "Q", [(bx + x1) / 2 + 20, -26], [bx + 6, -40], "Z"), MAT.grey, { sw: 2.7 });
      shape(C, "bfold", P(null, "M", [bx - 4, top - 10], "Q", [bx + 16, top - 20], [bx + 36, top - 10], "L", [bx + 38, -42], "Q", [bx + 16, -34], [bx, -42], "Z"), MAT.white, { sw: 2.4 });
      el("path", { d: P(null, "M", [bx + 60, top + 22], "L", [x1 - 20, top + 24]), stroke: YEL, "stroke-width": 7, "stroke-linecap": "round", fill: "none", opacity: 0.9 }, g);
      return { seat: [x1 - 70, top - 4], pillow: [x0 + 100, top - 30], top, w };
    },
    // table de nuit + lampe — origine : sol, centre
    nightstand(g, o) {
      o = Object.assign({ on: true, seed: 35 }, o);
      const C = prep(g, o.seed, o.lw);
      if (o.on) { el("ellipse", { cx: 0, cy: -196, rx: 100, ry: 82, fill: YEL, opacity: 0.2 }, g); el("ellipse", { cx: 0, cy: -196, rx: 62, ry: 50, fill: YEL, opacity: 0.22 }, g); }
      [-40, 32].forEach((x, i) => shape(C, "leg" + i, rrect(x, -22, 9, 22, 2), MAT.mid, { sw: 2 }));
      shape(C, "box", rrect(-52, -108, 104, 88, 6), MAT.wood, { sw: 2.8 });
      shape(C, "tp", rrect(-58, -116, 116, 12, 4), MAT.white, { sw: 2.5 });
      shape(C, "dr", rrect(-40, -94, 80, 30, 4), MAT.white, { sw: 2.2 });
      el("circle", { cx: 0, cy: -79, r: 4.5, fill: YEL, stroke: INK, "stroke-width": 1.8 }, g);
      stroke(C, "dr2", "M-40 -50 L40 -50", { sw: 1.6, r: 0.5, stroke: "#8A8A84", single: true });
      // lampe
      shape(C, "lbase", blob(ellPts(0, -121, 20, 6, 8)), MAT.mid, { sw: 2.2 });
      stroke(C, "lstem", "M0 -124 L0 -168", { sw: 3.4, r: 0.4 });
      shape(C, "shade", P(null, "M", [-22, -226], "L", [22, -226], "L", [38, -166], "L", [-38, -166], "Z"), o.on ? MAT.yellow : MAT.grey, { sw: 2.7 });
      if (o.on) [[-52, -206, -72, -214], [52, -206, 72, -214], [-50, -180, -70, -176], [50, -180, 70, -176], [0, -236, 0, -256]].forEach((l, i) => stroke(C, "ray" + i, `M${l[0]} ${l[1]} L${l[2]} ${l[3]}`, { sw: 3.6, r: 0.8, stroke: YEL }));
      ln(g, "M14 -166 L14 -148", 1.6); el("circle", { cx: 14, cy: -146, r: 2.6, fill: INK }, g);
      return { top: [0, -116], lamp: [0, -196] };
    },
    // téléphone portable — origine : centre
    phone(g, o) {
      o = Object.assign({ ring: false, on: true, label: "", seed: 37 }, o);
      const C = prep(g, o.seed, o.lw);
      if (o.ring) [[-58, -40, 1], [58, -40, -1]].forEach((r, i) => { stroke(C, "v" + i, `M${r[0]} -22 Q${r[0] - r[2] * -10} 0 ${r[0]} 22`, { sw: 3.4, r: 0.7, stroke: YEL }); stroke(C, "w" + i, `M${r[0] * 1.3} -34 Q${r[0] * 1.3 + r[2] * 14} 0 ${r[0] * 1.3} 34`, { sw: 3.4, r: 0.7, stroke: YEL }); });
      shape(C, "body", rrect(-40, -76, 80, 152, 13), MAT.shoe, { sw: 2.8 });
      el("path", { d: rrect(-33, -62, 66, 120, 6), fill: o.on ? "#FFFFFF" : "#77776F", stroke: INK, "stroke-width": 1.8 }, g);
      el("rect", { x: -9, y: -71, width: 18, height: 4, rx: 2, fill: "#77776F" }, g);
      if (o.on) {
        if (o.label) { text(g, o.label, 0, -26, 17, { weight: 700 }); }
        else { el("circle", { cx: 0, cy: -34, r: 13, fill: "#E1E1DC", stroke: INK, "stroke-width": 1.8 }, g); el("circle", { cx: 0, cy: -38, r: 4.5, fill: INK }, g); ln(g, "M-8 -27 Q0 -35 8 -27", 2); }
        ln(g, "M-20 -8 L20 -8", 2.2, "#8A8A84"); ln(g, "M-14 2 L14 2", 1.8, "#B4B4AE");
        el("circle", { cx: -15, cy: 36, r: 9.5, fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g); ln(g, "M-19 32 L-11 40 M-11 32 L-19 40", 2);
        el("circle", { cx: 15, cy: 36, r: 9.5, fill: YEL, stroke: INK, "stroke-width": 2 }, g); ln(g, "M11 36 L14 39.5 L19.5 32.5", 2);
      }
      return { w: 80, h: 152 };
    },
    // horloge murale — origine : centre ; time = [h, m]
    clockWall(g, o) {
      o = Object.assign({ time: [3, 10], r: 62, seed: 39 }, o);
      const C = prep(g, o.seed, o.lw), r = o.r;
      el("circle", { cx: 5, cy: 6, r: r + 2, fill: "#CDCDC6" }, g);
      shape(C, "rim", blob(ellPts(0, 0, r, r, 14)), MAT.mid, { sw: 2.9 });
      shape(C, "face", blob(ellPts(0, 0, r - 10, r - 10, 14)), MAT.white, { sw: 2.3 });
      for (let i = 0; i < 12; i++) { const a = i / 12 * TAU, big = i % 3 === 0, r1 = r - 15, r2 = r - (big ? 26 : 21); ln(g, `M${f(Math.sin(a) * r1)} ${f(-Math.cos(a) * r1)} L${f(Math.sin(a) * r2)} ${f(-Math.cos(a) * r2)}`, big ? 2.8 : 1.6); }
      const hh = (o.time[0] % 12 + o.time[1] / 60) / 12 * TAU, mm = o.time[1] / 60 * TAU;
      ln(g, `M0 0 L${f(Math.sin(hh) * (r - 36))} ${f(-Math.cos(hh) * (r - 36))}`, 4.6);
      ln(g, `M0 0 L${f(Math.sin(mm) * (r - 22))} ${f(-Math.cos(mm) * (r - 22))}`, 3);
      el("circle", { cx: 0, cy: 0, r: 4.6, fill: YEL, stroke: INK, "stroke-width": 1.8 }, g);
      return { r };
    },
    // fenêtre (cadre seul, vitres transparentes) — origine : centre
    window(g, o) {
      o = Object.assign({ w: 260, h: 320, curtains: true, seed: 41 }, o);
      const C = prep(g, o.seed, o.lw), w = o.w, h = o.h, t = 14;
      const frame = `${rrect(-w / 2, -h / 2, w, h, 6)} M${-w / 2 + t} ${-h / 2 + t} L${-w / 2 + t} ${h / 2 - t} L${-t / 3} ${h / 2 - t} L${-t / 3} ${-h / 2 + t} Z M${t / 3} ${-h / 2 + t} L${t / 3} ${h / 2 - t} L${w / 2 - t} ${h / 2 - t} L${w / 2 - t} ${-h / 2 + t} Z`;
      el("path", { d: frame, fill: "#FFFFFF", "fill-rule": "evenodd" }, g);
      stroke(C, "fo", rrect(-w / 2, -h / 2, w, h, 6), { sw: 2.9 });
      stroke(C, "fl", rrect(-w / 2 + t, -h / 2 + t, w / 2 - t - t / 3, h - 2 * t, 2), { sw: 2.1, r: 0.7 });
      stroke(C, "fr", rrect(t / 3, -h / 2 + t, w / 2 - t - t / 3, h - 2 * t, 2), { sw: 2.1, r: 0.7 });
      stroke(C, "bar1", `M${-w / 2 + t} ${-h * 0.08} L${-t / 3} ${-h * 0.08}`, { sw: 2.4, r: 0.6 }); stroke(C, "bar2", `M${t / 3} ${-h * 0.08} L${w / 2 - t} ${-h * 0.08}`, { sw: 2.4, r: 0.6 });
      el("circle", { cx: -t / 3 - 5, cy: h * 0.1, r: 3, fill: INK }, g);
      shape(C, "sill", rrect(-w / 2 - 16, h / 2, w + 32, 16, 4), MAT.wood, { sw: 2.6 });
      if (o.curtains) {
        stroke(C, "rod", `M${-w / 2 - 44} ${-h / 2 - 22} L${w / 2 + 44} ${-h / 2 - 22}`, { sw: 3.6, r: 0.6 });
        [-1, 1].forEach((s, i) => {
          const xa = s * (w / 2 + 34), xb = s * (w / 2 - 34);
          shape(C, "cur" + i, P(null, "M", [xa, -h / 2 - 22], "L", [xb, -h / 2 - 22], "Q", [xb + s * 16, -h * 0.1], [xb + s * 34, h * 0.2], "Q", [xb + s * 6, h * 0.34], [xb + s * 20, h / 2 + 26], "L", [xa + s * 4, h / 2 + 28], "Z"), MAT.grey, { sw: 2.6 });
          stroke(C, "cf" + i, P(null, "M", [s * (w / 2), -h / 2 - 16], "Q", [s * (w / 2 + 8), 0], [s * (w / 2 + 2), h / 2 + 22]), { sw: 1.5, r: 0.6, stroke: "#77776F", single: true });
          el("path", { d: P(null, "M", [xb + s * 26, h * 0.18], "L", [xa + s * 2, h * 0.22]), stroke: YEL, "stroke-width": 6, "stroke-linecap": "round", fill: "none" }, g);
        });
      }
      return { w, h, panes: [[-w / 2 + t, -h / 2 + t, w / 2 - t - t / 3, h - 2 * t], [t / 3, -h / 2 + t, w / 2 - t - t / 3, h - 2 * t]] };
    },
    // sacoche de médecin — origine : sol, centre
    doctorBag(g, o) {
      o = Object.assign({ seed: 43 }, o);
      const C = prep(g, o.seed, o.lw);
      stroke(C, "hd", "M-30 -104 Q-30 -140 0 -140 Q30 -140 30 -104", { sw: 5, r: 0.6 });
      shape(C, "body", P(null, "M", [-84, -4], "Q", [-92, -60], [-62, -96], "L", [62, -96], "Q", [92, -60], [84, -4], "Q", [0, 4], [-84, -4], "Z"), MAT.dark, { sw: 2.9 });
      shape(C, "topb", P(null, "M", [-66, -96], "Q", [0, -116], [66, -96], "Q", [0, -84], [-66, -96], "Z"), MAT.mid, { sw: 2.5 });
      shape(C, "clasp", rrect(-11, -98, 22, 18, 4), MAT.yellow, { sw: 2.2 });
      el("circle", { cx: 0, cy: -46, r: 22, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, g);
      el("path", { d: "M-5 -60 L5 -60 L5 -51 L14 -51 L14 -41 L5 -41 L5 -32 L-5 -32 L-5 -41 L-14 -41 L-14 -51 L-5 -51 Z", fill: DARK, stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, g);
      return { top: [0, -140] };
    },
    // petite couverture de bébé pliée, tricotée — origine : base, centre
    babyBlanket(g, o) {
      o = Object.assign({ seed: 45, w: 150 }, o);
      const C = prep(g, o.seed, o.lw), w = o.w, k = w / 150;
      shape(C, "b1", rrect(-w / 2, -30 * k, w, 30 * k, 12 * k), MAT.grey, { sw: 2.7 });
      shape(C, "b2", rrect(-w / 2 + 5, -58 * k, w - 10, 30 * k, 12 * k), MAT.light, { sw: 2.7 });
      shape(C, "b3", P(null, "M", [-w / 2 + 8, -56 * k], "Q", [0, -74 * k], [w / 2 - 8, -58 * k], "Q", [w / 2 + 2, -48 * k], [w / 2 - 10, -40 * k], "Q", [0, -52 * k], [-w / 2 + 12, -40 * k], "Q", [-w / 2 - 2, -48 * k], [-w / 2 + 8, -56 * k], "Z"), MAT.white, { sw: 2.5 });
      for (let i = 0; i < 7; i++) { const x = -w / 2 + 22 * k + i * (w - 44 * k) / 6; ln(g, `M${f(x - 5 * k)} ${f(-22 * k)} l${f(5 * k)} ${f(7 * k)} l${f(5 * k)} ${f(-7 * k)}`, 1.5, "#77776F"); ln(g, `M${f(x - 5 * k)} ${f(-13 * k)} l${f(5 * k)} ${f(7 * k)} l${f(5 * k)} ${f(-7 * k)}`, 1.5, "#8A8A84"); }
      el("path", { d: P(null, "M", [-w / 2 + 14, -45 * k], "Q", [0, -57 * k], [w / 2 - 14, -45 * k]), stroke: YEL, "stroke-width": 5 * k, "stroke-linecap": "round", fill: "none" }, g);
      return { top: [0, -70 * k] };
    },
    // bougie allumée — origine : base, centre ; flicker 0..1
    candle(g, o) {
      o = Object.assign({ lit: true, flicker: 0, h: 90, seed: 47 }, o);
      const C = prep(g, o.seed, o.lw), h = o.h, fx = (o.flicker - 0.5) * 8;
      if (o.lit) { el("ellipse", { cx: 0, cy: -h - 30, rx: 62, ry: 58, fill: YEL, opacity: 0.18 }, g); el("ellipse", { cx: 0, cy: -h - 30, rx: 36, ry: 36, fill: YEL, opacity: 0.25 }, g); }
      shape(C, "dish", blob(ellPts(0, -6, 46, 9, 10)), MAT.mid, { sw: 2.4 });
      shape(C, "wax", P(null, "M", [-17, -8], "L", [-17, -h], "Q", [0, -h - 6], [17, -h], "L", [17, -8], "Q", [0, -2], [-17, -8], "Z"), MAT.white, { sw: 2.7 });
      ln(g, `M-17 ${-h + 4} q4 14 0 24 M9 ${-h + 2} q5 10 1 20`, 1.5, "#8A8A84");
      ln(g, `M0 ${-h - 2} L0 ${-h - 13}`, 2.2);
      if (o.lit) {
        el("path", { d: `M0 ${-h - 8} C -15 ${-h - 22} ${f(-6 + fx)} ${-h - 40} ${f(fx)} ${-h - 56} C ${f(8 + fx)} ${-h - 40} 15 ${-h - 22} 0 ${-h - 8} Z`, fill: YEL, stroke: INK, "stroke-width": 2.3, "stroke-linejoin": "round" }, g);
        el("path", { d: `M0 ${-h - 11} C -6 ${-h - 18} ${f(-2 + fx * 0.5)} ${-h - 26} ${f(fx * 0.5)} ${-h - 32} C ${f(4 + fx * 0.5)} ${-h - 26} 6 ${-h - 18} 0 ${-h - 11} Z`, fill: "#FFFFFF" }, g);
      }
      return { flame: [0, -h - 30] };
    },
  };

  window.Persona = { person, head, couple, baby, props, Pose, mix, EXPR, LOOKS, OUTFITS, HAIR, MAT, CFG, HEIGHT: 432, util: { rig: (params) => { const r = resolve(params); return rig(r.p, r.L).anchors; } } };
})();
