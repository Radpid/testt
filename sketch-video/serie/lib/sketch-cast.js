/* sketch-cast.js — personnages et accessoires dessinés « à la main » (rough.js)
 * Style : encre fine + hachures grises + blanc, accent jaune surligneur.
 * Global : window.SketchCast  (nécessite window.rough)
 *
 *   SketchCast.person(g, params)  -> {handL, handR, head, hip, chest, top, height}
 *   SketchCast.baby(g, opts)      -> {chest, head}
 *   SketchCast.syringe / crib / monitor / dock / stamp (g, opts)
 *   SketchCast.Pose.*  SketchCast.Face.*  SketchCast.paper / ribbon / marker / ground
 *
 * Repère personnage : pieds en (0,0), y vers le bas, hauteur ≈ 420 unités.
 * Angles en degrés : 0 = membre pendant vers le bas, positif = vers +x
 * (l'avant du personnage quand facing = 1). Coude/genou = angle relatif.
 */
(function () {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const INK = "#1d1d1b", GREY = "#9A9A94", YEL = "#F8CE4E", PAPER = "#F7F7F1";
  const BLUE = { base: "#C3D3E2", hatch: "#869DB5", lip: "#5E7893" };
  const R = { roughness: 1.15, bowing: 1, sw: 2.7 };

  // ───────────────────────── matières
  const MAT = {
    skin:   { base: "#FFFFFF" },
    white:  { base: "#FFFFFF" },
    paper:  { base: PAPER },
    grey:   { base: "#E1E1DC", hatch: "#A1A19B", gap: 5.2, fw: 1.25 },
    mid:    { base: "#CFCFCA", hatch: "#77776F", gap: 5, fw: 1.4 },
    hair:   { base: "#6C6C66", hatch: "#262624", gap: 4.4, fw: 1.5 },
    hairG:  { base: "#DADAD5", hatch: "#8A8A84", gap: 4.5, fw: 1.3 },
    robe:   { base: "#4A4A46", hatch: INK, gap: 4, fw: 1.6 },
    shoe:   { base: "#3A3A37" },
    sil:    { base: "#DDDDD8", hatch: GREY, gap: 5, fw: 1.3, stroke: "#6E6E68" },
    silD:   { base: "#B9B9B3", hatch: "#77776F", gap: 4.2, fw: 1.4, stroke: "#6E6E68" },
    yellow: { base: YEL, hatch: "#E3AE2C", gap: 5, fw: 1.3 },
    milk:   { base: "#FFFFFF", hatch: "#DCDCD4", gap: 7, fw: 1.2 },
    blue:   { base: BLUE.base, hatch: BLUE.hatch, gap: 5, fw: 1.2 },
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

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0) % 100000; }

  let _svg = null, _rc = null;
  function ctx(g, seed, flip, lw) {
    const svg = g.ownerSVGElement || g;
    if (svg !== _svg) { _svg = svg; _rc = rough.svg(svg); }
    return { g, rc: _rc, seed: seed || 1, flip: !!flip, lw: lw || 1, sub(g2) { return { g: g2, rc: _rc, seed: this.seed, flip: this.flip, lw: this.lw, sub: this.sub }; } };
  }
  const seedOf = (C, key) => 1 + ((C.seed * 131 + hash(key)) % 2000000);

  // courbe fermée lisse passant par les points (Catmull-Rom)
  function blob(pts, tension) {
    const n = pts.length, t = (tension == null ? 1 : tension) / 6;
    let d = "M" + f(pts[0][0]) + " " + f(pts[0][1]);
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      d += "C" + f(p1[0] + (p2[0] - p0[0]) * t) + " " + f(p1[1] + (p2[1] - p0[1]) * t) + " " +
        f(p2[0] - (p3[0] - p1[0]) * t) + " " + f(p2[1] - (p3[1] - p1[1]) * t) + " " + f(p2[0]) + " " + f(p2[1]);
    }
    return d + "Z";
  }
  // courbe ouverte lisse
  function curve(pts) {
    const n = pts.length; let d = "M" + f(pts[0][0]) + " " + f(pts[0][1]);
    for (let i = 0; i < n - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(n - 1, i + 2)];
      d += "C" + f(p1[0] + (p2[0] - p0[0]) / 6) + " " + f(p1[1] + (p2[1] - p0[1]) / 6) + " " +
        f(p2[0] - (p3[0] - p1[0]) / 6) + " " + f(p2[1] - (p3[1] - p1[1]) / 6) + " " + f(p2[0]) + " " + f(p2[1]);
    }
    return d;
  }
  // chemin "M",[x,y],"Q",[..],[..] … avec transformation T optionnelle
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
  const mapT = (pts, T) => pts.map(T);

  // forme : aplat net + trait rough (+ hachures)
  function shape(C, key, d, mat, o) {
    o = o || {};
    if (mat.base) el("path", { d, fill: mat.base, stroke: "none" }, C.g);
    const opt = { roughness: o.r == null ? R.roughness : o.r, bowing: R.bowing, stroke: o.stroke || mat.stroke || INK, strokeWidth: (o.sw == null ? R.sw : o.sw) * C.lw, seed: seedOf(C, key) };
    if (o.noStroke) opt.stroke = "none";
    if (mat.hatch) { opt.fill = mat.hatch; opt.fillStyle = "hachure"; opt.hachureGap = (o.gap || mat.gap || 6) * C.lw; opt.fillWeight = (mat.fw || 1.3) * C.lw; opt.hachureAngle = C.flip ? 41 : -41; }
    const n = C.rc.path(d, opt); C.g.appendChild(n); return n;
  }
  function stroke(C, key, d, o) {
    o = o || {};
    const n = C.rc.path(d, { roughness: o.r == null ? 0.9 : o.r, bowing: R.bowing, stroke: o.stroke || INK, strokeWidth: (o.sw == null ? R.sw : o.sw) * C.lw, seed: seedOf(C, key), fill: "none", disableMultiStroke: !!o.single });
    C.g.appendChild(n); return n;
  }
  function text(g, str, x, y, size, o) {
    o = o || {};
    const t = el("text", { x, y, "font-family": o.font || "Kalam, 'Comic Sans MS', cursive", "font-weight": o.weight || 700, "font-size": size, fill: o.fill || INK, "text-anchor": o.anchor || "middle", "letter-spacing": o.ls, direction: o.rtl ? "rtl" : null, transform: o.transform }, g);
    t.textContent = str; return t;
  }

  // membre effilé (3 articulations) -> contour lisse
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

  // ───────────────────────── expressions
  const Face = {
    neutral: { eyes: "dot", brows: [0, 0, 0], mouth: "smile" },
    calm: { eyes: "dot", brows: [0.5, 0.5, 2], mouth: "bigsmile" },
    focused: { eyes: "squint", brows: [-3.5, -3.5, -2], mouth: "flat" },
    unsure: { eyes: "dot", brows: [5, -1, 2], mouth: "wavy", sweat: true },
    shock: { eyes: "wide", brows: [3, 3, 9], mouth: "open", emph: true },
    sad: { eyes: "sad", brows: [6, 6, 1], mouth: "frown" },
    talk: { eyes: "dot", brows: [1, 1, 2], mouth: "talk" },
    blink: { eyes: "closed", brows: [0, 0, 0], mouth: "smile" },
  };

  // ───────────────────────── coiffures (repère tête, regard vers +x)
  const mirror = (pts) => pts.map((p) => [-p[0], p[1]]);
  const CAP_OUT = [[-63, 0], [-61, -30], [-41, -57], [0, -67], [41, -57], [61, -30], [63, 0]];
  const HAIR = {
    short: {
      front: { cap: CAP_OUT.concat([[55, -16], [47, -33], [25, -39], [5, -30], [-16, -40], [-40, -35], [-55, -16]]), tuft: [[-8, -64], [-2, -80], [12, -74]] },
      side: { cap: [[52, -36], [32, -58], [0, -67], [-36, -59], [-62, -28], [-64, 8], [-56, 38], [-45, 37], [-43, 14], [-35, -6], [-15, -14], [2, -27], [28, -32], [45, -27]], tuft: [[-2, -65], [8, -80], [20, -72]] },
      back: { cap: [[-64, 8], [-61, -30], [-41, -57], [0, -67], [41, -57], [61, -30], [64, 8], [50, 40], [0, 50], [-50, 40]] },
    },
    bun: {
      front: { bun: [0, -78, 22], cap: CAP_OUT.concat([[56, -12], [48, -32], [24, -47], [0, -42], [-24, -47], [-48, -32], [-56, -12]]) },
      side: { bun: [-46, -56, 20], cap: [[50, -40], [30, -59], [0, -67], [-36, -59], [-62, -28], [-64, 8], [-56, 37], [-45, 36], [-43, 14], [-35, -6], [-15, -16], [6, -31], [30, -40]] },
      back: { bun: [0, -74, 22], cap: [[-64, 8], [-61, -30], [-41, -57], [0, -67], [41, -57], [61, -30], [64, 8], [50, 40], [0, 50], [-50, 40]] },
    },
    receding: {
      front: { cap: CAP_OUT.concat([[57, -12], [51, -34], [33, -49], [12, -51], [0, -46], [-12, -51], [-33, -49], [-51, -34], [-57, -12]]) },
      side: { cap: [[34, -53], [10, -65], [-30, -61], [-61, -30], [-64, 8], [-56, 38], [-45, 37], [-43, 14], [-35, -6], [-17, -17], [2, -37], [20, -47]] },
      back: { cap: [[-64, 8], [-61, -30], [-41, -57], [0, -67], [41, -57], [61, -30], [64, 8], [50, 40], [0, 50], [-50, 40]] },
    },
    crown: { // chauve dessus, couronne de cheveux
      front: { tufts: [[[40, -44], [58, -34], [67, -8], [64, 6], [55, -8], [50, -26]]], strands: [[[-22, -57], [0, -64], [24, -56]], [[-12, -51], [8, -57], [28, -48]]] },
      side: { cap: [[-16, -50], [-44, -48], [-65, -16], [-63, 20], [-54, 38], [-45, 36], [-43, 14], [-35, -4], [-22, -14], [-13, -32]], strands: [[[-6, -60], [16, -62], [36, -50]]] },
      back: { cap: [[-65, 0], [-40, -16], [0, -22], [40, -16], [65, 0], [54, 40], [0, 50], [-54, 40]] },
    },
    long: {
      front: { behind: [[0, -69], [52, -55], [70, -6], [73, 52], [60, 88], [-60, 88], [-73, 52], [-70, -6], [-52, -55]], cap: CAP_OUT.concat([[56, -8], [46, -30], [22, -46], [0, -40], [-22, -46], [-46, -30], [-56, -8]]) },
      side: { behind: [[-10, -67], [-58, -44], [-73, 8], [-72, 70], [-44, 92], [-14, 74], [-8, 20]], cap: [[50, -40], [30, -59], [0, -67], [-36, -59], [-62, -28], [-64, 8], [-56, 37], [-45, 36], [-43, 14], [-35, -6], [-15, -16], [6, -31], [30, -40]] },
      back: { cap: [[-66, 8], [-61, -30], [-41, -57], [0, -68], [41, -57], [61, -30], [66, 8], [72, 60], [50, 90], [-50, 90], [-72, 60]] },
    },
  };
  HAIR.crown.front.tufts.push(mirror(HAIR.crown.front.tufts[0]));

  // ───────────────────────── tenues
  const OUTFITS = {
    coat:     { torso: "coat", hem: 60, arm: "sleeve", legs: "grey", hair: "short", hairMat: "hair", inner: "scrubs", badge: "PJ", stetho: true },
    scrubs:   { torso: "top", arm: "short", legs: "grey", hair: "bun", hairMat: "hair", pocket: true },
    oberarzt: { torso: "coat", hem: 64, arm: "sleeve", legs: "mid", hair: "receding", hairMat: "hairG", inner: "tie", glasses: true, pens: true },
    robe:     { torso: "coat", hem: 132, flare: 62, arm: "bell", legs: "robe", hair: "crown", hairMat: "hairG", inner: "jabot", glasses: true, mat: "robe" },
    civil:    { torso: "top", arm: "sil", legs: "silD", hair: "short", hairMat: "silD", sil: true },
    mother:   { torso: "coat", hem: 92, flare: 56, arm: "sil", legs: "sil", hair: "long", hairMat: "silD", sil: true, mat: "sil" },
  };

  const DEF = {
    outfit: "coat", view: "front", facing: 1, expr: "neutral", seed: 1,
    armL: [-10, 13], armR: [10, -13], legL: [0, 0], legR: [0, 0],
    torsoLean: 0, headTilt: 0, look: [0, 0], lift: 0,
  };

  // ───────────────────────── visage
  function drawFace(C, p, side) {
    const E = Object.assign({}, Face[p.expr] || Face.neutral);
    if (p.eyes) E.eyes = p.eyes; if (p.mouth) E.mouth = p.mouth; if (p.brows) E.brows = p.brows;
    if (p.blink) E.eyes = "closed";
    if (p.talk != null && p.talk !== false) E.mouth = p.talk === true || p.talk > 0.5 ? "talk" : (p.talk > 0.15 ? "o" : E.mouth);
    const lk = p.look || [0, 0], g = C.g;
    const fx = (side ? 18 : 0) + lk[0] * 5, fy = lk[1] * 4;
    const eyes = side ? [[fx - 13, 1], [fx + 19, 0.78]] : [[fx - 21, 1], [fx + 21, 1]];
    const ey = 8 + fy;
    // joues : petites hachures
    const cheeks = side ? [[fx - 31, 27]] : [[fx - 39, 27], [fx + 39, 27]];
    cheeks.forEach((c, i) => {
      for (let k = -1; k <= 1; k++) el("line", { x1: c[0] + k * 5 - 3, y1: c[1] + 4, x2: c[0] + k * 5 + 3, y2: c[1] - 4, stroke: "#B9B9B3", "stroke-width": 1.6, "stroke-linecap": "round" }, g);
    });
    // yeux
    eyes.forEach((e, i) => {
      const x = e[0], sx = e[1];
      if (E.eyes === "wide") {
        g.appendChild(C.rc.ellipse(x, ey - 1, 25 * sx, 26, { roughness: 0.5, stroke: INK, strokeWidth: 2.3, fill: "#fff", fillStyle: "solid", seed: seedOf(C, "eye" + i) }));
        el("circle", { cx: x + lk[0] * 4, cy: ey - 1 + lk[1] * 4, r: 4.2, fill: INK }, g);
      } else if (E.eyes === "closed") {
        stroke(C, "eyec" + i, P(null, "M", [x - 7 * sx, ey - 1], "Q", [x, ey + 6], [x + 7 * sx, ey - 1]), { sw: 2.6, r: 0.5 });
      } else if (E.eyes === "happy") {
        stroke(C, "eyeh" + i, P(null, "M", [x - 7 * sx, ey + 3], "Q", [x, ey - 6], [x + 7 * sx, ey + 3]), { sw: 2.6, r: 0.5 });
      } else {
        const ry = E.eyes === "squint" ? 5 : 7.6, dy = E.eyes === "sad" ? 1.5 : 0;
        el("ellipse", { cx: f(x + lk[0] * 2), cy: f(ey + dy + lk[1] * 2), rx: f(5.6 * sx), ry, fill: INK }, g);
        if (E.eyes !== "squint") el("circle", { cx: f(x + lk[0] * 2 + 1.8 * sx), cy: f(ey + dy + lk[1] * 2 - 2.8), r: 1.7, fill: "#fff" }, g);
      }
    });
    // sourcils : [gauche, droit, hauteur] ; tilt > 0 = extrémité intérieure relevée (triste)
    const b = E.brows || [0, 0, 0], by = ey - (E.eyes === "wide" ? 24 : 19) - b[2];
    eyes.forEach((e, i) => {
      const x = e[0], w = 9.5 * e[1], t = (i === 0 ? b[0] : b[1]), s = i === 0 ? 1 : -1;
      // côté intérieur = vers le centre du visage
      const inner = [x + s * w, by - t], outer = [x - s * w, by + t * 0.6];
      stroke(C, "brow" + i, P(null, "M", outer, "Q", [x, by - 3 - Math.abs(t) * 0.1], inner), { sw: 3, r: 0.5 });
    });
    // nez
    if (side) {
      el("path", { d: P(null, "M", [58, 10], "Q", [72, 16], [59, 25], "Z"), fill: "#fff" }, g);
      stroke(C, "nose", P(null, "M", [59, 9], "Q", [72, 16], [60, 25]), { sw: 2.4, r: 0.5 });
    } else {
      stroke(C, "nose", P(null, "M", [fx + 1, ey + 9], "Q", [fx + 6, ey + 14], [fx, ey + 16]), { sw: 2, r: 0.4, stroke: "#55554F", single: true });
    }
    // bouche
    const mx = fx + (side ? 9 : 0), my = 36 + fy, mw = side ? 0.8 : 1;
    const M = (pts) => pts.map((q) => [mx + q[0] * mw, my + q[1]]);
    const dark = "#3A3A37";
    switch (E.mouth) {
      case "bigsmile": { const q = M([[-13, -3], [0, 11], [13, -3]]); stroke(C, "mouth", P(null, "M", q[0], "Q", q[1], q[2]), { sw: 2.8, r: 0.5 }); break; }
      case "flat": { const q = M([[-8, 1], [0, 0], [8, 1]]); stroke(C, "mouth", P(null, "M", q[0], "Q", q[1], q[2]), { sw: 2.8, r: 0.5 }); break; }
      case "frown": { const q = M([[-10, 5], [0, -5], [10, 5]]); stroke(C, "mouth", P(null, "M", q[0], "Q", q[1], q[2]), { sw: 2.8, r: 0.5 }); break; }
      case "wavy": { const q = M([[-11, 2], [-5, -4], [0, 1], [5, 5], [11, 0]]); stroke(C, "mouth", curve(q), { sw: 2.8, r: 0.5 }); break; }
      case "o": el("ellipse", { cx: mx, cy: my + 2, rx: 5 * mw, ry: 6, fill: dark, stroke: INK, "stroke-width": 1.5 }, g); break;
      case "open": el("ellipse", { cx: mx, cy: my + 4, rx: 9 * mw, ry: 12, fill: dark, stroke: INK, "stroke-width": 2 }, g); break;
      case "talk": { const q = M([[-10, -3], [0, -4], [10, -3], [8, 9], [0, 12], [-8, 9]]); el("path", { d: blob(q), fill: dark, stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, g); break; }
      default: { const q = M([[-9, -2], [0, 7], [9, -2]]); stroke(C, "mouth", P(null, "M", q[0], "Q", q[1], q[2]), { sw: 2.8, r: 0.5 }); }
    }
    if (E.sweat) {
      const sxp = side ? -20 : 70, syp = side ? -30 : -6;
      el("path", { d: P(null, "M", [sxp, syp - 16], "Q", [sxp + 9, syp - 2], [sxp, syp + 2], "Q", [sxp - 9, syp - 2], [sxp, syp - 16], "Z"), fill: "#fff", stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, g);
    }
    return { eyes, ey, emph: E.emph };
  }

  function drawGlasses(C, eyes, ey, side) {
    eyes.forEach((e, i) => C.g.appendChild(C.rc.ellipse(e[0], ey, 32 * e[1], 30, { roughness: 0.6, stroke: INK, strokeWidth: 2.4, seed: seedOf(C, "gl" + i), fill: "rgba(255,255,255,0.35)", fillStyle: "solid" })));
    stroke(C, "glb", P(null, "M", [eyes[0][0] + 16 * eyes[0][1], ey - 2], "Q", [(eyes[0][0] + eyes[1][0]) / 2 + 2, ey - 7], [eyes[1][0] - 16 * eyes[1][1], ey - 2]), { sw: 2.2, r: 0.4, single: true });
    if (side) stroke(C, "glt", P(null, "M", [eyes[0][0] - 16, ey - 2], "L", [-30, 7]), { sw: 2.2, r: 0.4, single: true });
    else { stroke(C, "glt0", P(null, "M", [eyes[0][0] - 16, ey - 2], "L", [-58, ey - 2]), { sw: 2.2, r: 0.4, single: true }); stroke(C, "glt1", P(null, "M", [eyes[1][0] + 16, ey - 2], "L", [58, ey - 2]), { sw: 2.2, r: 0.4, single: true }); }
  }

  const HEAD_PTS = [[0, -59], [40, -47], [60, -12], [58, 24], [38, 51], [0, 60], [-38, 51], [-58, 24], [-60, -12], [-40, -47]];

  function drawHead(C, p, O, view) {
    const side = view === "side", back = view === "back", sil = O.sil;
    const skin = sil ? MAT.sil : MAT.skin, hm = MAT[O.hairMat];
    const H = HAIR[p.hair || O.hair][view] || {};
    if (H.behind) shape(C, "hairB", blob(H.behind), hm);
    if (H.bun) shape(C, "bun", blob(ellPts(H.bun[0], H.bun[1], H.bun[2], H.bun[2] * 0.92, 8)), hm);
    // oreilles
    if (!side && !(H.behind)) { shape(C, "earL", blob(ellPts(-60, 10, 10, 12, 6)), skin, { sw: 2.4 }); shape(C, "earR", blob(ellPts(60, 10, 10, 12, 6)), skin, { sw: 2.4 }); }
    shape(C, "head", blob(HEAD_PTS), skin);
    let fa = null;
    if (!back && !sil) fa = drawFace(C, p, side);
    if (H.cap) shape(C, "cap", blob(H.cap, 0.9), hm);
    if (H.tufts) H.tufts.forEach((t, i) => shape(C, "tuft" + i, blob(t), hm, { sw: 2.4 }));
    if (H.strands) H.strands.forEach((s, i) => stroke(C, "strand" + i, curve(s), { sw: 2, stroke: sil ? "#6E6E68" : "#77776F", r: 0.6 }));
    if (H.tuft) stroke(C, "tuft", curve(H.tuft), { sw: 2.6, r: 0.6 });
    if (side) { shape(C, "ear", blob(ellPts(-33, 13, 7.5, 10.5, 6)), skin, { sw: 2.3, r: 0.6 }); if (!sil) stroke(C, "earIn", P(null, "M", [-31, 9], "Q", [-36, 13], [-32, 17]), { sw: 1.8, r: 0.4, single: true }); }
    if (fa && O.glasses && p.glasses !== false) drawGlasses(C, fa.eyes, fa.ey, side);
    if (fa && fa.emph && p.emph !== false) {
      [[-52, -78, -64, -100], [-14, -84, -18, -110], [26, -82, 34, -106]].forEach((l, i) => stroke(C, "emph" + i, P(null, "M", [l[0], l[1]], "L", [l[2], l[3]]), { stroke: YEL, sw: 5, r: 0.8 }));
    }
  }

  // ───────────────────────── personnage
  function person(g, params) {
    const O0 = OUTFITS[(params && params.outfit) || DEF.outfit] || OUTFITS.coat;
    const p = Object.assign({}, DEF, params), O = O0;
    while (g.firstChild) g.removeChild(g.firstChild);
    const facing = p.facing === -1 ? -1 : 1;
    const root = el("g", facing === -1 ? { transform: "scale(-1,1)" } : null, g);
    const C = ctx(root, p.seed, facing === -1, p.lw);
    const view = p.view === "side" || p.view === "back" ? p.view : "front";
    const side = view === "side", back = view === "back", sil = !!O.sil;
    const skin = sil ? MAT.sil : MAT.skin, lean = p.torsoLean || 0;

    // jambes (repère hanche) puis mise au sol
    const hipW = side ? 5 : 19, TH = 76, SH = 72;
    const mkLeg = (a, x) => joints([x, 0], a[0], TH, a[0] + a[1], SH);
    const JL = mkLeg(p.legL, -hipW), JR = mkLeg(p.legR, hipW);
    const maxFoot = Math.max(JL[2][1], JR[2][1]);
    const hipY = -(maxFoot + 12) - (p.lift || 0);
    const W = (v) => [v[0], v[1] + hipY];                       // hanche -> monde
    const T = (v) => { const r = rot2(v, lean); return [r[0], r[1] + hipY]; }; // torse -> monde
    const sw = side ? 29 : 45, hw = side ? 27 : 39, hunch = clamp(lean * 0.35, 0, 18);

    // bras
    const UA = 56, FA = 52;
    const shL = side ? [-3, -123] : [-(sw - 4), -119], shR = side ? [3, -121] : [sw - 4, -119];
    const mkArm = (a, s) => joints(T(s), a[0] - lean, UA, a[0] + a[1] - lean, FA);
    const AL = mkArm(p.armL, shL), AR = mkArm(p.armR, shR);
    const handOf = (J) => add(J[2], mul(norm(sub(J[2], J[1])), 10));
    const legMat = MAT[O.legs];

    function drawLeg(J, key, mirrorShoe) {
      const Jw = J.map(W);
      shape(C, key, limbPath(Jw, [33, 28, 22]), legMat);
      const s = (key === "legL" ? p.legL : p.legR), sa = s[0] + s[1];
      const air = clamp((maxFoot - J[2][1]) / 16 + (p.lift || 0) / 16, 0, 1);   // pied à plat s'il touche le sol
      const rotS = side ? (sa < 0 ? -sa * 0.8 : -sa * 0.45) * air : 0;
      const sg = el("g", { transform: `translate(${f(Jw[2][0])} ${f(Jw[2][1])}) rotate(${f(rotS)}) scale(${side ? 1 : (mirrorShoe ? -0.82 : 0.82)},1)` }, C.g);
      const Cs = C.sub(sg);
      shape(Cs, key + "shoe", blob([[-14, 2], [-12, -9], [2, -12], [18, -8], [31, -2], [34, 7], [22, 12], [-9, 12]]), sil ? MAT.silD : MAT.shoe, { sw: 2.4 });
    }
    function drawArm(J, key) {
      const type = O.arm;
      if (type === "bell") shape(C, key, limbPath(J, [31, 33, 38]), MAT.robe);
      else if (type === "sil") shape(C, key, limbPath(J, [26, 22, 18.5]), MAT.sil);
      else {
        shape(C, key, limbPath(J, type === "sleeve" ? [28, 25, 22] : [26, 22, 18.5]), MAT.white);
        if (type === "short") { const e = mid(J[0], J[1], 0.66); shape(C, key + "sl", limbPath([J[0], mid(J[0], e), e], [29, 29, 29]), MAT.grey); }
      }
      // main : moufle
      const d = norm(sub(J[2], J[1])), ang = Math.atan2(d[1], d[0]) * 180 / Math.PI - 90, hc = handOf(J);
      const th = (side || key === "armL") ? 1 : -1, nrm = [d[1] * th, -d[0] * th];
      const pts = [[-6, -8], [2, -12], [9, -16.5], [14, -12.5], [22, -9], [25, 0], [22, 9], [13, 12.5], [3, 12], [-6, 8]].map((q) => add(J[2], add(mul(d, q[0] - 2), mul(nrm, -q[1]))));
      shape(C, key + "hand", blob(pts), skin, { sw: 2.5 });
      if (type === "sleeve") { const n = [d[1], -d[0]], c = sub(J[2], mul(d, 7)); stroke(C, key + "cuff", P(null, "M", add(c, mul(n, 12)), "L", sub(c, mul(n, 12))), { sw: 2.2, r: 0.5 }); }
    }

    // ── ordre de dessin
    const armLBack = p.armLBack != null ? p.armLBack : side;
    const armRBack = !!p.armRBack;
    const outPt = (v) => [f(v[0] * facing), f(v[1])];
    if (p.only === "arms") {   // seulement les bras de devant (à redessiner par-dessus un décor)
      if (!armLBack) drawArm(AL, "armL"); if (!armRBack) drawArm(AR, "armR");
      return { handL: outPt(handOf(AL)), handR: outPt(handOf(AR)) };
    }
    if (armLBack) drawArm(AL, "armL");
    if (armRBack) drawArm(AR, "armR");
    drawLeg(JL, "legL", true);
    drawLeg(JR, "legR", false);

    // torse
    const tm = O.mat ? MAT[O.mat] : (O.torso === "coat" ? MAT.white : (sil ? MAT.sil : MAT.grey));
    if (O.torso === "coat") {
      const hem = O.hem, fl = O.flare || 50;
      const sR = Math.sin(rad(Math.max(p.legL[0], p.legR[0]))), sL = Math.sin(rad(Math.min(p.legL[0], p.legR[0])));
      const reach = Math.min(hem, TH);
      let hemR, hemL;
      if (side) { hemR = Math.max(fl - 15, reach * sR * 0.5 + 17); hemL = Math.max(fl - 17, -reach * sL * 0.8 + 17); }
      else { hemR = Math.max(fl, reach * sR + hipW + 22); hemL = Math.max(fl, -reach * sL + hipW + 22); }
      const hp = (x) => rot2([x, hem], -lean * 0.55);   // l'ourlet pend un peu
      const d = side
        ? P(T, "M", [-8, -139], "C", [-30 - hunch, -140], [-sw - 4 - hunch, -104], [-sw - hunch * 0.3, -60], "Q", [-sw + 1, -10], hp(-hemL), "Q", hp(0).map((v, i) => v + (i ? 7 : 0)), hp(hemR), "Q", [sw + 5, -30], [sw + 3, -84], "C", [sw + 3, -120], [sw - 4, -138], [10, -139], "Z")
        : P(T, "M", [-22, -139], "Q", [-sw - 2, -141], [-sw - 2, -114], "L", hp(-hemL), "Q", hp(0).map((v, i) => v + (i ? 8 : 0)), hp(hemR), "L", [sw + 2, -114], "Q", [sw + 2, -141], [22, -139], "Z");
      shape(C, "torso", d, tm);
      if (!sil) {
        const lineCol = O.mat === "robe" ? "#000" : INK;
        if (back) stroke(C, "seam", P(T, "M", [0, -134], "L", hp(0)), { sw: 2, r: 0.6, stroke: lineCol });
        else if (side) {
          stroke(C, "open", P(T, "M", [sw - 9, -128], "Q", [sw - 6, -40], hp(hemR - 12)), { sw: 2.2, r: 0.6, stroke: lineCol });
          if (O.inner === "jabot") shape(C, "jabot", P(T, "M", [10, -139], "L", [sw + 1, -128], "L", [sw - 2, -96], "L", [14, -118], "Z"), MAT.white, { sw: 2.2 });
          if (O.stetho) { stroke(C, "st1", P(T, "M", [-4, -137], "Q", [10, -112], [sw - 4, -106]), { sw: 3.2, r: 0.5, stroke: "#3A3A37" }); const c = T([sw - 2, -100]); el("circle", { cx: f(c[0]), cy: f(c[1]), r: 6.5, fill: "#CFCFCA", stroke: INK, "stroke-width": 2.2 }, C.g); }
        } else {
          // encolure
          if (O.inner === "scrubs") shape(C, "vneck", P(T, "M", [-14, -139], "L", [2, -84], "L", [14, -139], "Q", [0, -133], [-14, -139], "Z"), MAT.grey, { sw: 2 });
          if (O.inner === "tie") {
            shape(C, "vneck", P(T, "M", [-14, -139], "L", [2, -84], "L", [14, -139], "Q", [0, -133], [-14, -139], "Z"), MAT.white, { sw: 2 });
            el("path", { d: P(T, "M", [-3, -134], "L", [6, -134], "L", [5, -126], "L", [8, -100], "L", [2, -90], "L", [-3, -100], "L", [-1, -126], "Z"), fill: "#55554F", stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" }, C.g);
          }
          if (O.inner === "jabot") {
            shape(C, "jabot", P(T, "M", [-17, -140], "L", [0, -120], "L", [17, -140], "Q", [0, -133], [-17, -140], "Z"), MAT.white, { sw: 2.2 });
            shape(C, "jabot2", P(T, "M", [-6, -124], "L", [6, -124], "L", [9, -86], "L", [0, -76], "L", [-9, -86], "Z"), MAT.white, { sw: 2.2 });
          } else {
            shape(C, "lapL", P(T, "M", [-15, -140], "L", [-28, -108], "L", [1, -83], "Z"), MAT.white, { sw: 2.3 });
            shape(C, "lapR", P(T, "M", [15, -140], "L", [29, -108], "L", [3, -83], "Z"), MAT.white, { sw: 2.3 });
            stroke(C, "open", P(T, "M", [2, -83], "L", hp(3)), { sw: 2.2, r: 0.6 });
            [[9, -40], [9, -14]].forEach((b) => { const c = T(b); el("circle", { cx: f(c[0]), cy: f(c[1]), r: 2.6, fill: INK }, C.g); });
            stroke(C, "pock", P(T, "M", [-36, 6], "L", [-14, 7]), { sw: 2, r: 0.5, single: true });
          }
          if (O.stetho && p.stetho !== false) {
            stroke(C, "st1", P(T, "M", [-19, -137], "C", [-28, -110], [-21, -86], [-18, -70], "M", [19, -137], "C", [27, -120], [23, -106], [18, -95]), { sw: 3.2, r: 0.5, stroke: "#3A3A37" });
            const c = T([-18, -63]); el("circle", { cx: f(c[0]), cy: f(c[1]), r: 7, fill: "#CFCFCA", stroke: INK, "stroke-width": 2.3 }, C.g);
          }
          if (O.pens) { stroke(C, "bp", P(T, "M", [-36, -98], "L", [-16, -97]), { sw: 2, r: 0.5, single: true }); stroke(C, "pen1", P(T, "M", [-31, -98], "L", [-31, -110]), { sw: 2.6, r: 0.3, single: true }); stroke(C, "pen2", P(T, "M", [-24, -98], "L", [-24, -108]), { sw: 2.6, r: 0.3, single: true, stroke: "#77776F" }); }
          if (O.badge && p.badge !== false) {
            const c = T([19, -68]);
            const bg = el("g", { transform: `translate(${f(c[0])} ${f(c[1])}) rotate(${f(lean - 4)})` }, C.g);
            el("rect", { x: -13, y: -8, width: 26, height: 17, rx: 3, fill: YEL, stroke: INK, "stroke-width": 2 }, bg);
            text(bg, typeof p.badge === "string" ? p.badge : O.badge, 0, 5.5, 13, { transform: facing === -1 ? "scale(-1,1)" : null });
          }
        }
      }
    } else {
      const d = side
        ? P(T, "M", [-8, -139], "C", [-30 - hunch, -140], [-sw - 4 - hunch, -104], [-sw - hunch * 0.3, -60], "Q", [-hw - 2, -20], [-hw, 8], "Q", [0, 20], [hw, 8], "Q", [sw + 5, -30], [sw + 3, -84], "C", [sw + 3, -120], [sw - 4, -138], [10, -139], "Z")
        : P(T, "M", [-22, -139], "Q", [-sw - 1, -140], [-sw - 1, -116], "L", [-hw - 2, 10], "Q", [0, 22], [hw + 2, 10], "L", [sw + 1, -116], "Q", [sw + 1, -140], [22, -139], "Z");
      shape(C, "torso", d, tm);
      if (!sil && !back) {
        if (side) shape(C, "vneck", P(T, "M", [8, -139], "L", [sw + 1, -128], "L", [sw - 1, -112], "Z"), MAT.skin, { sw: 2 });
        else shape(C, "vneck", P(T, "M", [-14, -140], "L", [0, -108], "L", [14, -140], "Q", [0, -134], [-14, -140], "Z"), MAT.skin, { sw: 2.2 });
        if (O.pocket && !side) { stroke(C, "pock", P(T, "M", [10, -84], "L", [10, -66], "L", [30, -66], "L", [30, -84]), { sw: 2, r: 0.5, single: true }); stroke(C, "hemline", P(T, "M", [-hw + 2, -2], "Q", [0, 8], [hw - 2, -2]), { sw: 1.8, r: 0.5, single: true, stroke: "#77776F" }); }
      }
    }

    // cou + tête
    const nk = side ? 5 : 0;
    el("path", { d: P(T, "M", [nk - 10, -150], "L", [nk - 10, -134], "L", [nk + 10, -134], "L", [nk + 10, -150], "Z"), fill: skin.base }, C.g);
    const headRot = lean * 0.55 + (p.headTilt || 0);
    const neck = T([nk, -141]);
    const hc = add(neck, rot2([0, -50], headRot));
    const hg = el("g", { transform: `translate(${f(hc[0])} ${f(hc[1])}) rotate(${f(headRot)})` }, C.g);
    drawHead(C.sub(hg), p, O, view);

    if (!armLBack) drawArm(AL, "armL");
    if (!armRBack) drawArm(AR, "armR");
    if (p.baby) {   // bébé porté : par-dessus les bras, une main le soutient
      const c = T([side ? 22 : 0, -100]);
      const bg = el("g", { transform: `translate(${f(c[0])} ${f(c[1])}) scale(0.9)` }, C.g);
      baby(bg, Object.assign({ pose: "held", seed: p.seed, _flip: facing === -1, lw: p.lw }, p.baby === true ? {} : p.baby));
      const hc2 = handOf(AL);
      shape(C, "supp", blob(ellPts(hc2[0], hc2[1] + 2, 14, 12, 8)), skin, { sw: 2.5 });
    }

    const out = (v) => [f(v[0] * facing), f(v[1])];
    return {
      handL: out(handOf(AL)), handR: out(handOf(AR)), head: out(hc), hip: out([0, hipY]),
      chest: out(T([side ? 14 : 0, -95])), top: out(add(hc, rot2([0, -66], headRot))), neck: out(neck),
      footL: out(W(JL[2])), footR: out(W(JR[2])), height: f(-add(hc, rot2([0, -66], headRot))[1]),
    };
  }

  // ───────────────────────── poses
  const TAU = Math.PI * 2;
  const Pose = {
    stand: { view: "front", armL: [-10, 13], armR: [10, -13], legL: [-1, 0], legR: [1, 0], torsoLean: 0, headTilt: 0, lift: 0 },
    walk(ph) {
      const th = ph * TAU, s = Math.sin(th), c = Math.cos(th);
      const knee = (cc) => -(7 + 52 * Math.pow(Math.max(0, cc), 1.2));
      return {
        view: "side", torsoLean: 4, headTilt: -2 + 1.5 * Math.sin(th * 2), lift: 0,
        legR: [28 * s + 4, knee(c)], legL: [-28 * s + 4, knee(-c)],
        armR: [-26 * s + 2, 16 + 10 * Math.max(0, -s)], armL: [26 * s + 2, 16 + 10 * Math.max(0, s)],
      };
    },
    run(ph) {
      const th = ph * TAU, s = Math.sin(th), c = Math.cos(th);
      const knee = (cc, ss) => -(55 + 45 * cc + 22 * ss);
      return {
        view: "side", torsoLean: 16, headTilt: -9, lift: 6 + 16 * Math.abs(s),
        legR: [46 * s + 12, knee(c, s)], legL: [-46 * s + 12, knee(-c, -s)],
        armR: [-50 * s + 16, 84 + 10 * s], armL: [50 * s + 16, 84 - 10 * s],
      };
    },
    point: { view: "front", armL: [-10, 13], armR: [84, 22], legL: [-2, 0], legR: [3, 0], torsoLean: 2, look: [1, 0] },
    holdObject: { view: "front", armL: [-10, 13], armR: [26, -150], legL: [-1, 0], legR: [1, 0], look: [0.3, 0.6], headTilt: 3 },
    carryBaby: { view: "front", armL: [-30, 112], armR: [34, -112], legL: [-1, 0], legR: [1, 0], headTilt: -6, look: [-0.3, 0.8] },
    leanOverCrib: { view: "side", torsoLean: 38, headTilt: 2, armR: [60, 24], armL: [80, 14], legL: [-16, -4], legR: [4, -20], look: [0.2, 1], armLBack: true },
    handsOnHead: { view: "front", armL: [-150, -52], armR: [150, 52], legL: [-4, 0], legR: [4, 0], headTilt: 0 },
    sitBench: { view: "side", torsoLean: 4, armL: [28, 48], armR: [24, 52], legL: [84, -84], legR: [88, -86], headTilt: 4 },
    standDock: { view: "front", armL: [-22, 38], armR: [22, -38], legL: [-1, 0], legR: [1, 0], headTilt: 4, look: [0, 0.6] },
  };
  // interpolation de poses (pour l'animateur)
  function mix(a, b, t) {
    const o = Object.assign({}, a, b);
    ["armL", "armR", "legL", "legR", "look"].forEach((k) => { if (a[k] && b[k]) o[k] = [lerp(a[k][0], b[k][0], t), lerp(a[k][1], b[k][1], t)]; });
    ["torsoLean", "headTilt", "lift"].forEach((k) => { o[k] = lerp(a[k] || 0, b[k] || 0, t); });
    if (t < 0.5) { o.view = a.view || o.view; }
    return o;
  }

  // ───────────────────────── bébé
  function baby(g, o) {
    o = Object.assign({ pose: "lying", state: "normal", eyes: "closed", mouth: null, seed: 3, flip: false }, o);
    while (g.firstChild) g.removeChild(g.firstChild);
    const root = el("g", o.flip ? { transform: "scale(-1,1)" } : null, g);
    const C = ctx(root, o.seed, !!o.flip !== !!o._flip, o.lw);
    const blue = o.state === "blue";
    const skin = blue ? MAT.blue : MAT.skin, lip = blue ? BLUE.lip : INK;
    const held = o.pose === "held";
    let hc, hr, tilt, chest;
    if (held) {
      hc = [-36, -14]; hr = 29; tilt = -14; chest = [0, 0];
      shape(C, "bundle", blob([[-26, -34], [16, -34], [56, -14], [68, 12], [50, 30], [2, 30], [-34, 18]]), MAT.milk);
      stroke(C, "fold", curve([[-18, -30], [8, -6], [50, 8]]), { sw: 2, r: 0.6, stroke: "#77776F" });
      stroke(C, "fold2", curve([[-30, 12], [0, 10], [20, -2]]), { sw: 2, r: 0.6, stroke: "#77776F" });
    } else {
      hc = [-66, -41]; hr = 39; tilt = -12; chest = [-10, -52];
      // grenouillère (haut du corps)
      shape(C, "body", blob([[-40, -8], [-36, -44], [-8, -56], [30, -54], [44, -30], [40, -4], [0, 0]]), blue ? MAT.blue : { base: "#FFFFFF" });
      // couverture
      shape(C, "blanket", blob([[4, -2], [0, -34], [10, -58], [48, -58], [84, -46], [102, -22], [98, -3], [50, 0]], 0.8), MAT.grey);
      shape(C, "blfold", blob([[0, -34], [10, -60], [22, -60], [12, -32], [14, -4], [3, -3]], 0.7), MAT.white, { sw: 2.2 });
      // petit bras + poing posé sur la couverture
      shape(C, "barm", limbPath([[-26, -46], [-8, -58], [8, -54]], [17, 15, 13]), blue ? MAT.blue : MAT.white, { sw: 2.3 });
      shape(C, "bfist", blob(ellPts(13, -53, 9.5, 9, 7)), skin, { sw: 2.3 });
    }
    const hg = el("g", { transform: `translate(${hc[0]} ${hc[1]}) rotate(${tilt}) scale(${hr / 39})` }, root);
    const H = C.sub(hg);
    shape(H, "bearL", blob(ellPts(-38, 4, 7, 9, 6)), skin, { sw: 2.2 });
    shape(H, "bearR", blob(ellPts(38, 4, 7, 9, 6)), skin, { sw: 2.2 });
    // grosse tête ronde, joues potelées
    shape(H, "bhead", blob([[0, -38], [27, -29], [39, -4], [40, 16], [26, 34], [0, 39], [-26, 34], [-40, 16], [-39, -4], [-27, -29]]), skin);
    // boucle
    stroke(H, "curl", "M-2 -37 C -8 -50 10 -56 12 -46 C 13 -40 4 -40 5 -45", { sw: 2.4, r: 0.4 });
    // joues
    if (!blue) [[-25, 17], [25, 17]].forEach((c) => { for (let k = -1; k <= 1; k++) el("line", { x1: c[0] + k * 4 - 2.5, y1: c[1] + 3.5, x2: c[0] + k * 4 + 2.5, y2: c[1] - 3.5, stroke: blue ? "#7C93AB" : "#B9B9B3", "stroke-width": 1.5, "stroke-linecap": "round" }, hg); });
    // yeux
    [-15, 15].forEach((x, i) => {
      if (o.eyes === "open") { el("ellipse", { cx: x, cy: 5, rx: 4.2, ry: 5.4, fill: INK }, hg); el("circle", { cx: x + 1.4, cy: 3, r: 1.3, fill: "#fff" }, hg); }
      else stroke(H, "beye" + i, P(null, "M", [x - 6, 4], "Q", [x, 10], [x + 6, 4]), { sw: 2.4, r: 0.4 });
    });
    const m = o.mouth || (blue ? "o" : "smile");
    if (m === "o") el("ellipse", { cx: 0, cy: 22, rx: 3.6, ry: 4.4, fill: blue ? BLUE.lip : "#3A3A37", stroke: lip, "stroke-width": 1.4 }, hg);
    else if (m === "flat") stroke(H, "bm", "M-4 22 L4 22", { sw: 2.2, r: 0.3, stroke: lip });
    else stroke(H, "bm", "M-5 20 Q0 26 5 20", { sw: 2.2, r: 0.3, stroke: lip });
    if (held) { shape(C, "bfist", blob(ellPts(-6, 6, 8.5, 8, 7)), skin, { sw: 2.2 }); }
    const sgn = o.flip ? -1 : 1;
    return { chest: [chest[0] * sgn, chest[1]], head: [hc[0] * sgn, hc[1]], length: 142 };
  }

  // ───────────────────────── accessoires
  function prep(g, seed, lw) { while (g.firstChild) g.removeChild(g.firstChild); return ctx(g, seed || 5, false, lw); }
  function softShadow(g, d, dx, dy) { el("path", { d, fill: "#CDCDC6", transform: `translate(${dx == null ? 6 : dx} ${dy == null ? 7 : dy})` }, g); }
  const rrect = (x, y, w, h, r) => `M${x + r} ${y}L${x + w - r} ${y}Q${x + w} ${y} ${x + w} ${y + r}L${x + w} ${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}L${x + r} ${y + h}Q${x} ${y + h} ${x} ${y + h - r}L${x} ${y + r}Q${x} ${y} ${x + r} ${y}Z`;

  // seringue 5 ml — origine au centre du corps, embout vers +x. Longueur ≈ 330.
  function syringe(g, o) {
    o = Object.assign({ milky: true, label: "?", push: 0, seed: 11 }, o);
    const C = prep(g, o.seed, o.lw), x0 = -100, x1 = 62, hh = 23;
    const push = clamp(o.push, 0, 1), sx = x0 + 8 + push * 128;        // position du joint
    const rodL = 118 * (1 - push) + 14;
    // tige + poussoir
    shape(C, "rod", rrect(x0 - rodL, -7, rodL + (sx - x0), 14, 3), MAT.white, { sw: 2.3 });
    shape(C, "thumb", rrect(x0 - rodL - 9, -27, 10, 54, 4), MAT.grey, { sw: 2.5 });
    // corps
    const body = rrect(x0, -hh, x1 - x0, hh * 2, 6);
    el("path", { d: body, fill: PAPER }, g);
    // liquide
    if (sx < x1 - 4) shape(C, "liq", rrect(sx + 6, -hh + 3, x1 - sx - 8, hh * 2 - 6, 3), o.milky ? MAT.milk : { base: "#F1F1EC" }, { noStroke: true });
    shape(C, "barrel", body, {}, { sw: 2.8 });
    // joint
    shape(C, "stop", rrect(sx - 6, -hh + 3, 13, hh * 2 - 6, 3), MAT.hair, { sw: 2 });
    // graduations
    for (let i = 0; i <= 5; i++) { const x = x0 + 32 + i * 24; el("line", { x1: x, y1: -hh + 1, x2: x, y2: -hh + (i % 5 === 0 ? 15 : 10), stroke: INK, "stroke-width": 1.8, "stroke-linecap": "round" }, g); }
    // collerette
    shape(C, "flange", rrect(x0 - 5, -36, 9, 72, 4), MAT.white, { sw: 2.5 });
    // cône + embout
    shape(C, "cone", P(null, "M", [x1, -13], "L", [x1 + 16, -6], "L", [x1 + 34, -5], "L", [x1 + 34, 5], "L", [x1 + 16, 6], "L", [x1, 13], "Z"), MAT.white, { sw: 2.4 });
    if (o.needle) stroke(C, "needle", `M${x1 + 34} 0 L${x1 + 110} 0`, { sw: 2, r: 0.3 });
    // étiquette
    if (o.label) {
      const big = o.label.length <= 2, lw = big ? 62 : Math.max(86, o.label.length * 15 + 26), lx = -34;
      const lg = el("g", { transform: `translate(${lx} 3) rotate(-5)` }, g), CL = C.sub(lg);
      softShadow(lg, rrect(-lw / 2, -30, lw, 60, 5), 4, 5);
      shape(CL, "label", rrect(-lw / 2, -30, lw, 60, 5), MAT.white, { sw: 2.4 });
      if (big) { el("path", { d: rrect(-19, -17, 38, 36, 12), fill: YEL }, lg); text(lg, o.label, 0, 17, 50); }
      else text(lg, o.label, 0, 9, 25);
    }
    return { tip: [x1 + (o.needle ? 110 : 34), 0], thumb: [x0 - rodL - 9, 0] };
  }

  // lit pédiatrique — sol en y=0, centré. Matelas : y = -150. part: "back" | "front" | "all"
  function crib(g, o) {
    o = Object.assign({ w: 360, part: "all", seed: 21 }, o);
    const C = prep(g, o.seed, o.lw), w = o.w, x0 = -w / 2, x1 = w / 2, bed = -150;
    const steel = "#55554F";
    if (o.part !== "front") {
      // barreaux arrière (relevés)
      const n = Math.max(4, Math.round(w / 34));
      for (let i = 1; i < n; i++) { const x = x0 + i * w / n; stroke(C, "bb" + i, `M${f(x)} ${bed - 96} L${f(x + 0.5)} ${bed}`, { sw: 2, r: 0.5, stroke: GREY, single: true }); }
      stroke(C, "brail", `M${x0} ${bed - 98} L${x1} ${bed - 98}`, { sw: 3, r: 0.7, stroke: steel });
      // matelas
      shape(C, "matt", rrect(x0 + 6, bed, w - 12, 24, 8), MAT.white, { sw: 2.6 });
      stroke(C, "mline", `M${x0 + 14} ${bed + 12} L${x1 - 14} ${bed + 12}`, { sw: 1.6, r: 0.6, stroke: GREY, single: true });
    }
    if (o.part !== "back") {
      // sommier + barreaux avant (barrière abaissée)
      shape(C, "frame", rrect(x0 + 2, bed + 24, w - 4, 12, 4), MAT.mid, { sw: 2.4 });
      const n = Math.max(4, Math.round(w / 34));
      for (let i = 1; i < n; i++) { const x = x0 + i * w / n; stroke(C, "fb" + i, `M${f(x)} ${bed + 38} L${f(x + 0.5)} ${-52}`, { sw: 2.2, r: 0.5, stroke: steel, single: true }); }
      stroke(C, "frail", `M${x0} -52 L${x1} -52`, { sw: 3, r: 0.7, stroke: steel });
      // montants + roulettes
      [x0, x1].forEach((x, i) => {
        shape(C, "post" + i, rrect(x - 7, bed - 110, 14, 236, 7), MAT.white, { sw: 2.6 });
        shape(C, "wheel" + i, blob(ellPts(x, -12, 12, 12, 8)), MAT.mid, { sw: 2.4 });
        el("circle", { cx: x, cy: -12, r: 2.6, fill: INK }, g);
      });
    }
    return { bed: [0, bed], w, top: bed - 110 };
  }

  // moniteur — origine au centre de l'écran. w × h (300 × 210 par défaut)
  function monitor(g, o) {
    o = Object.assign({ ecg: "normal", t: 0, hr: null, w: 300, h: 210, seed: 31, stand: 0 }, o);
    const C = prep(g, o.seed, o.lw), w = o.w, h = o.h, x0 = -w / 2, y0 = -h / 2;
    const alarm = o.ecg === "alarm", flat = o.ecg === "flat";
    if (o.stand) {
      shape(C, "pole", rrect(-6, h / 2 - 4, 12, o.stand, 3), MAT.mid, { sw: 2.3 });
      shape(C, "foot", rrect(-56, h / 2 + o.stand - 8, 112, 12, 6), MAT.mid, { sw: 2.4 });
    }
    const card = rrect(x0, y0, w, h, 18);
    softShadow(g, card, 7, 8);
    shape(C, "card", card, MAT.grey);
    const scr = rrect(x0 + 14, y0 + 14, w - 28, h - 44, 10);
    shape(C, "screen", scr, MAT.white, { sw: 2.3 });
    // boutons
    [0, 1, 2].forEach((i) => el("circle", { cx: x0 + 30 + i * 20, cy: y0 + h - 15, r: 5, fill: i === 0 && alarm ? YEL : "#fff", stroke: INK, "stroke-width": 1.8 }, g));
    // tracé
    const tx0 = x0 + 24, tx1 = x0 + w - 24, ty = y0 + h * 0.56, amp = h * 0.2;
    const period = alarm ? 40 : 96, speed = alarm ? 160 : 90;
    const gauss = (u, c, s) => Math.exp(-((u - c) * (u - c)) / (2 * s * s));
    let d = "";
    for (let x = tx0; x <= tx1; x += 2) {
      const u = (x - tx0) + (o.t || 0) * speed; let y = 0;
      if (flat) y = 0.02 * Math.sin(u * 0.05);
      else if (alarm) { const ph = (u % period) / period, k = Math.floor(u / period); const a = 0.75 + 0.35 * Math.sin(k * 2.1); y = a * (gauss(ph, 0.45, 0.07) * 1.0 - gauss(ph, 0.62, 0.08) * 0.55) + 0.1 * Math.sin(u * 0.9); }
      else { const ph = (u % period) / period; y = 0.14 * gauss(ph, 0.2, 0.035) - 0.12 * gauss(ph, 0.36, 0.012) + 1.0 * gauss(ph, 0.4, 0.016) - 0.28 * gauss(ph, 0.44, 0.014) + 0.24 * gauss(ph, 0.64, 0.05); }
      d += (d ? "L" : "M") + f(x) + " " + f(ty - y * amp);
    }
    el("path", { d, fill: "none", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round", "stroke-linecap": "round" }, g);
    // valeur
    const hr = o.hr != null ? String(o.hr) : (flat ? "0" : alarm ? "186" : "124");
    text(g, "HF", x0 + 28, y0 + 44, 20, { anchor: "start", fill: "#77776F" });
    if (alarm || flat) el("path", { d: rrect(x0 + w - 122, y0 + 22, 98, 40, 14), fill: YEL, transform: "rotate(-2 " + (x0 + w - 70) + " " + (y0 + 42) + ")" }, g);
    text(g, hr, x0 + w - 73, y0 + 55, 40);
    if (alarm) {
      [[x0 - 6, y0 + 4, x0 - 30, y0 - 12], [x0 + 16, y0 - 12, x0 + 4, y0 - 40], [x0 - 14, y0 + 34, x0 - 42, y0 + 30],
       [-x0 + 6, y0 + 4, -x0 + 30, y0 - 12], [-x0 - 16, y0 - 12, -x0 - 4, y0 - 40], [-x0 + 14, y0 + 34, -x0 + 42, y0 + 30]]
        .forEach((l, i) => stroke(C, "al" + i, `M${l[0]} ${l[1]} L${l[2]} ${l[3]}`, { stroke: YEL, sw: 6, r: 0.8 }));
    }
    return { w, h };
  }

  // banc des accusés — sol en y=0, centré, dessus de la main courante : y = -h (188)
  function dock(g, o) {
    o = Object.assign({ w: 300, h: 188, seed: 41 }, o);
    const C = prep(g, o.seed, o.lw), w = o.w, h = o.h, x0 = -w / 2;
    const panel = rrect(x0, -h + 16, w, h - 16, 4);
    softShadow(g, panel, 7, 0);
    shape(C, "panel", panel, MAT.grey, { gap: 6.5 });
    // cadres en creux
    const n = Math.max(3, Math.round(w / 62));
    for (let i = 1; i < n; i++) { const x = x0 + i * w / n; stroke(C, "plank" + i, `M${f(x)} ${-h + 24} L${f(x + 1)} -16`, { sw: 2.1, r: 0.7 }); }
    // plinthe
    shape(C, "base", rrect(x0 - 6, -14, w + 12, 14, 3), MAT.mid, { sw: 2.4 });
    // main courante
    const rail = rrect(x0 - 12, -h, w + 24, 20, 7);
    softShadow(g, rail, 5, 6);
    shape(C, "rail", rail, MAT.white, { sw: 2.8 });
    return { rail: [0, -h], w, h };
  }

  // tampon — centré, incliné. Retourne {w,h}
  function stamp(g, o) {
    o = Object.assign({ text: "SCHULDIG", sub: null, size: 78, rot: -8, color: INK, band: true, seed: 51 }, o);
    const C = prep(g, o.seed, o.lw);
    const w = o.text.length * o.size * 0.64 + 70, h = o.size * 1.25 + (o.sub ? o.size * 0.5 : 0) + 36;
    const r = el("g", { transform: `rotate(${o.rot})` }, g), CR = C.sub(r);
    if (o.band) el("path", { d: rrect(-w / 2 + 22, -h / 2 + 22, w - 44, o.size * 1.02, o.size * 0.3), fill: YEL, transform: "rotate(-1.2)" }, r);
    shape(CR, "outer", rrect(-w / 2, -h / 2, w, h, 12), {}, { sw: 7, stroke: o.color, r: 1.3 });
    shape(CR, "inner", rrect(-w / 2 + 11, -h / 2 + 11, w - 22, h - 22, 7), {}, { sw: 2.4, stroke: o.color, r: 1 });
    text(r, o.text, 0, -h / 2 + 26 + o.size * 0.82, o.size, { fill: o.color, ls: 3 });
    if (o.sub) text(r, o.sub, 0, h / 2 - 24, o.size * 0.36, { fill: o.color, ls: 1 });
    // usure de l'encre
    [[-0.5, -0.2, 0.07], [0.36, 0.5, 0.08], [0.42, -0.42, 0.06]].forEach((s, i) => stroke(CR, "wear" + i, `M${f(s[0] * w)} ${f(s[1] * h)} l${f(s[2] * w)} ${f(-s[2] * w * 0.8)}`, { stroke: PAPER, sw: 2.2, r: 1.2, single: true }));
    return { w, h };
  }

  // ───────────────────────── habillage (papier, ruban, surligneur, sol)
  function paper(svg, w, h) {
    const defs = el("defs", null, svg), pt = el("pattern", { id: "sk-dots", width: 27, height: 27, patternUnits: "userSpaceOnUse" }, defs);
    el("circle", { cx: 13.5, cy: 13.5, r: 1.35, fill: "#D9D9D1" }, pt);
    el("rect", { width: w, height: h, fill: PAPER }, svg);
    el("rect", { width: w, height: h, fill: "url(#sk-dots)" }, svg);
  }
  function marker(g, o) {
    o = Object.assign({ w: 300, h: 70, rot: -1.5 }, o);
    const w = o.w, h = o.h, r = h * 0.42;
    return el("path", { d: `M${-w / 2 + r} ${-h / 2 + 2}L${w / 2 - r * 0.8} ${-h / 2}Q${w / 2 + 4} ${-h / 2 + 2} ${w / 2} ${0}Q${w / 2 + 2} ${h / 2} ${w / 2 - r} ${h / 2 - 1}L${-w / 2 + r * 0.9} ${h / 2}Q${-w / 2 - 3} ${h / 2 - 3} ${-w / 2} ${2}Q${-w / 2 - 1} ${-h / 2 + 4} ${-w / 2 + r} ${-h / 2 + 2}Z`, fill: YEL, transform: `rotate(${o.rot})` }, g);
  }
  // ruban titre : style "white" (bandeau blanc + mot surligné) ou "yellow"
  function ribbon(g, o) {
    o = Object.assign({ w: 420, h: 120, text: "", size: 84, font: "Lalezar, Kalam, sans-serif", style: "white", rot: -2, seed: 61, rtl: false }, o);
    while (g.firstChild) g.removeChild(g.firstChild);
    const r = el("g", { transform: `rotate(${o.rot})` }, g), C = ctx(r, o.seed, false, o.lw);
    const w = o.w, h = o.h, tw = Math.max(60, h * 0.7), dy = h * 0.2;
    [-1, 1].forEach((s, i) => {
      const xa = s * (w / 2 - 22), xb = s * (w / 2 + tw);
      shape(C, "tail" + i, P(null, "M", [xa, -h / 2 + dy], "L", [xb, -h / 2 + dy], "L", [xb - s * h * 0.32, dy], "L", [xb, h / 2 + dy], "L", [xa, h / 2 + dy], "Z"), MAT.mid, { sw: 2.6, gap: 4.5 });
      el("path", { d: P(null, "M", [s * (w / 2 - 22), h / 2 + dy], "L", [s * (w / 2), h / 2], "L", [s * (w / 2 - 22), h / 2 - 2], "Z"), fill: "#55554F", stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, r);
    });
    const band = P(null, "M", [-w / 2, -h / 2], "L", [w / 2, -h / 2], "L", [w / 2, h / 2], "L", [-w / 2, h / 2], "Z");
    shape(C, "band", band, o.style === "yellow" ? MAT.yellow : MAT.white, { sw: 2.8 });
    if (o.style !== "yellow") marker(r, { w: Math.min(w - 50, o.text.length * o.size * 0.5 + 90), h: h * 0.62, rot: -1 });
    text(r, o.text, 0, o.size * 0.33, o.size, { font: o.font, weight: o.font.indexOf("Lalezar") === 0 ? 400 : 700, rtl: o.rtl });
    return { w, h };
  }
  function ground(g, o) {
    o = Object.assign({ w: 300, seed: 71 }, o);
    const C = ctx(g, o.seed, false), w = o.w;
    stroke(C, "gl", `M${-w / 2} 0 L${w / 2} 0`, { sw: 2.2, stroke: GREY, r: 1 });
    for (let i = 0; i < 5; i++) { const x = -w / 2 + 20 + (w - 60) * (i / 4) + (i % 2) * 14; stroke(C, "gt" + i, `M${f(x)} 10 l14 -9`, { sw: 1.6, stroke: "#B9B9B3", r: 0.6, single: true }); }
  }

  window.SketchCast = { person, baby, syringe, crib, monitor, dock, stamp, paper, marker, ribbon, ground, Pose, Face, mix, OUTFITS, MAT, INK, GREY, YEL, PAPER, HEIGHT: 416, util: { el, text, stroke, shape, ctx, blob, curve, rrect } };
})();
