/* Cast — personnages, objets et décors « dessinés à la main » (rough.js) pour la série AKTE.
 *
 * Tout est paramétrique : Cast.person(g, params) dessine un personnage dans le <g> donné à partir de ses
 * paramètres (pose, expression, tenue). Pour animer, on change les paramètres et on redessine : la graine
 * rough.js reste fixe, donc le trait est stable (léger « tremblé » seulement quand la pose change).
 *
 * Coordonnées locales d'un personnage : pieds en (0, 0), y négatif vers le haut ; taille adulte ≈ 600 unités.
 * Angles des membres en degrés : 0 = vers le bas, +90 = vers +x (droite de l'écran).
 */
(function (global) {
  "use strict";
  const C = {
    ink: "#1C1A1C", paper: "#F7F7F1", card: "#FCFCF9", white: "#FFFFFF", hatch: "#B9B9B4",
    light: "#DAD9D2", gray: "#8E8E89", dark: "#3A383A", yellow: "#F8CE4E", shadow: "#B5B5AF",
  };
  const NS = "http://www.w3.org/2000/svg";
  let seedN = 1000;
  const sd = () => ++seedN;
  const rad = (d) => (d * Math.PI) / 180;

  function el(tag, attrs, parent) {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs || {}) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function mark(node) {
    node.querySelectorAll("path").forEach((p) => {
      const f = p.getAttribute("fill"), st = p.getAttribute("stroke");
      if (f && f !== "none" && (!st || st === "none")) p.dataset.fill = "1";
      else p.setAttribute("pathLength", "1");
    });
    return node;
  }
  const rc = (g) => rough.svg(g.ownerSVGElement || g);
  const add = (g, n) => { g.appendChild(mark(n)); return n; };
  const base = (o) => ({ stroke: C.ink, strokeWidth: 2.4, roughness: 0.85, bowing: 0.5, seed: sd(), ...o });
  const S = {
    line: (w = 2.4, o) => ({ strokeWidth: w, ...o }),
    solid: (fill, w = 2.4, o) => ({ fill, fillStyle: "solid", strokeWidth: w, ...o }),
    hatch: (fill = C.hatch, gap = 6, angle = -41, w = 2.4, o) => ({ fill, fillStyle: "hachure", hachureGap: gap, fillWeight: 1.3, hachureAngle: angle, strokeWidth: w, ...o }),
    none: () => ({ stroke: "none" }),
  };
  // les hachures rough.js sont transparentes : on pose d'abord un fond plein (sauf opaque:false)
  function under(g, o, draw) {
    if (o && o.fillStyle === "hachure" && o.opaque !== false && o.stroke !== "none")
      add(g, draw({ stroke: "none", fill: o.under || C.card, fillStyle: "solid", seed: 1, roughness: 0.6 }));
  }
  const P = (g, d, o) => { under(g, o, (u) => rc(g).path(d, base(u))); return add(g, rc(g).path(d, base(o))); };
  const E = (g, x, y, w, h, o) => { under(g, o, (u) => rc(g).ellipse(x, y, w, h, base(u))); return add(g, rc(g).ellipse(x, y, w, h, base(o))); };
  const L = (g, x1, y1, x2, y2, o) => add(g, rc(g).line(x1, y1, x2, y2, base(o)));
  const R = (g, x, y, w, h, o) => { under(g, o, (u) => rc(g).rectangle(x, y, w, h, base(u))); return add(g, rc(g).rectangle(x, y, w, h, base(o))); };
  const PL = (g, pts, o) => add(g, rc(g).linearPath(pts, base(o)));
  const CU = (g, pts, o) => add(g, rc(g).curve(pts, base(o)));
  function T(g, txt, x, y, size, o) {
    o = o || {};
    const t = el("text", {
      x, y, "font-family": o.font || "Kalam, 'Plex Arabic', sans-serif", "font-size": size || 26,
      "font-weight": o.weight || 700, fill: o.fill || C.ink, "text-anchor": o.anchor || "middle",
      "dominant-baseline": o.baseline || "auto",
    }, g);
    if (o.transform) t.setAttribute("transform", o.transform);
    if (o.dir) t.setAttribute("direction", o.dir);
    t.textContent = txt;
    return t;
  }
  function group(parent, attrs) { return el("g", attrs || {}, parent); }
  function rr(x, y, w, h, r) {
    return `M${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x + r} Q${x},${y + h} ${x},${y + h - r} V${y + r} Q${x},${y} ${x + r},${y} Z`;
  }

  /* ---------- membres : un tube qui suit deux segments (épaule→coude→poignet) ---------- */
  function joints(p0, a1, l1, a2, l2) {
    const p1 = [p0[0] + Math.sin(rad(a1)) * l1, p0[1] + Math.cos(rad(a1)) * l1];
    const p2 = [p1[0] + Math.sin(rad(a1 + a2)) * l2, p1[1] + Math.cos(rad(a1 + a2)) * l2];
    return [p0, p1, p2];
  }
  function tube(pts, widths) {
    // contour d'un tube le long d'une polyligne, bout arrondi
    const n = pts.length, left = [], right = [];
    for (let i = 0; i < n; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
      let dx = b[0] - a[0], dy = b[1] - a[1];
      const len = Math.hypot(dx, dy) || 1; dx /= len; dy /= len;
      const w = widths[i] / 2;
      left.push([pts[i][0] - dy * w, pts[i][1] + dx * w]);
      right.push([pts[i][0] + dy * w, pts[i][1] - dx * w]);
    }
    const end = pts[n - 1], prev = pts[n - 2];
    let ex = end[0] - prev[0], ey = end[1] - prev[1];
    const el2 = Math.hypot(ex, ey) || 1; ex /= el2; ey /= el2;
    const cap = [end[0] + ex * widths[n - 1] * 0.55, end[1] + ey * widths[n - 1] * 0.55];
    let d = `M${left[0][0]},${left[0][1]}`;
    for (let i = 1; i < n; i++) d += ` L${left[i][0]},${left[i][1]}`;
    d += ` Q${cap[0]},${cap[1]} ${right[n - 1][0]},${right[n - 1][1]}`;
    for (let i = n - 2; i >= 0; i--) d += ` L${right[i][0]},${right[i][1]}`;
    return d + " Z";
  }
  function lerp(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; }

  /* ---------- proportions (unités locales, pieds en y = 0) ---------- */
  const G = { hy: -505, hrx: 46, hry: 54, shY: -418, shX: 60, hipY: -232, hipX: 22, upper: 108, fore: 96, thigh: 116, shin: 110 };

  /* ---------- tête ---------- */
  function head(g, p) {
    const hy = G.hy, view = p.view || "front";
    const skin = S.solid(C.card, 2.4);
    if (p.silhouette) {
      E(g, 0, hy, G.hrx * 2, G.hry * 2, S.hatch(C.hatch, 4.5, -41, 2.4));
      if (view === "back") hairBack(g, p.hair, hy); else hairFront(g, p.hair, hy);
      return;
    }
    E(g, -G.hrx + 2, hy + 6, 14, 24, skin); E(g, G.hrx - 2, hy + 6, 14, 24, skin);
    E(g, 0, hy, G.hrx * 2, G.hry * 2, skin);
    if (view === "back") { hairBack(g, p.hair, hy); return; }
    hairFront(g, p.hair, hy);
    face(g, p, hy);
  }
  function hairFront(g, hair, hy) {
    if (!hair || hair === "none") return;
    if (hair === "short") {
      P(g, `M-47,${hy + 8} C-56,${hy - 46} -24,${hy - 68} 6,${hy - 64} C40,${hy - 62} 58,${hy - 38} 47,${hy + 6}
             C43,${hy - 18} 32,${hy - 30} 16,${hy - 32} C2,${hy - 44} -28,${hy - 36} -47,${hy + 8} Z`,
        S.hatch(C.dark, 3.2, -60, 2.2));
    } else if (hair === "bun") {
      E(g, 0, hy - 66, 48, 34, S.hatch(C.gray, 3.4, 50, 2.2));
      P(g, `M-47,${hy + 10} C-54,${hy - 56} 54,${hy - 56} 47,${hy + 10} C42,${hy - 28} 24,${hy - 36} 0,${hy - 32}
             C-24,${hy - 36} -42,${hy - 28} -47,${hy + 10} Z`, S.hatch(C.gray, 3.4, 50, 2.2));
    } else if (hair === "gray") {
      P(g, `M-47,${hy + 8} C-51,${hy - 22} -42,${hy - 42} -26,${hy - 48} L-19,${hy - 32} C-32,${hy - 26} -40,${hy - 10} -47,${hy + 8} Z`, S.hatch(C.hatch, 3.5, 60, 2));
      P(g, `M47,${hy + 8} C51,${hy - 22} 42,${hy - 42} 26,${hy - 48} L19,${hy - 32} C32,${hy - 26} 40,${hy - 10} 47,${hy + 8} Z`, S.hatch(C.hatch, 3.5, -60, 2));
    } else if (hair === "long") {
      P(g, `M-50,${hy + 48} C-60,${hy - 48} -22,${hy - 68} 4,${hy - 64} C42,${hy - 62} 62,${hy - 32} 50,${hy + 48}
             C42,${hy + 12} 40,${hy - 22} 20,${hy - 32} C4,${hy - 42} -32,${hy - 32} -38,${hy - 6} C-42,${hy + 12} -42,${hy + 30} -50,${hy + 48} Z`,
        S.hatch(C.dark, 3.4, -55, 2.2));
    }
  }
  function hairBack(g, hair, hy) {
    const fill = hair === "bun" || hair === "gray" ? C.gray : C.dark;
    if (hair === "long") {
      P(g, `M-50,${hy + 50} C-60,${hy - 52} 60,${hy - 52} 50,${hy + 50} C30,${hy + 60} -30,${hy + 60} -50,${hy + 50} Z`, S.hatch(fill, 3.2, -60, 2.2));
      return;
    }
    P(g, `M-47,${hy + 20} C-58,${hy - 52} 58,${hy - 52} 47,${hy + 20} C32,${hy + 34} -32,${hy + 34} -47,${hy + 20} Z`, S.hatch(fill, 3.2, -60, 2.2));
    if (hair === "bun") E(g, 0, hy - 58, 48, 34, S.hatch(C.gray, 3.2, 50, 2.2));
  }
  function face(g, p, hy) {
    const e = p.eyes || "open", look = p.look || 0, brow = p.brows || "neutral", mouth = p.mouth || "closed";
    const ey = hy - 2;
    if (e === "closed") {
      CU(g, [[-26, ey], [-17, ey + 5], [-8, ey]], S.line(2.4));
      CU(g, [[8, ey], [17, ey + 5], [26, ey]], S.line(2.4));
    } else {
      const big = e === "wide" ? 1.3 : 1;
      if (e === "wide") { E(g, -17, ey, 20, 22, S.solid(C.white, 1.8)); E(g, 17, ey, 20, 22, S.solid(C.white, 1.8)); }
      E(g, -17 + look, ey, 9 * big, 12 * big, S.solid(C.ink, 1, { roughness: 0.3 }));
      E(g, 17 + look, ey, 9 * big, 12 * big, S.solid(C.ink, 1, { roughness: 0.3 }));
    }
    const by = hy - 24;
    const brows = {
      neutral: [[-28, by + 1, -9, by - 1], [9, by - 1, 28, by + 1]],
      worried: [[-28, by + 4, -9, by - 6], [9, by - 6, 28, by + 4]],
      focus: [[-28, by - 3, -9, by + 4], [9, by + 4, 28, by - 3]],
      shock: [[-28, by - 8, -9, by - 12], [9, by - 12, 28, by - 8]],
      sad: [[-28, by + 6, -9, by - 4], [9, by - 4, 28, by + 6]],
    }[brow] || [];
    brows.forEach((b) => L(g, b[0], b[1], b[2], b[3], S.line(3.2, { roughness: 0.6 })));
    P(g, `M3,${hy - 2} Q11,${hy + 15} 1,${hy + 19}`, S.line(2.2));
    const my = hy + 33;
    if (mouth === "talk") E(g, 0, my, 22, 14, S.solid(C.dark, 2));
    else if (mouth === "o") E(g, 0, my + 2, 15, 18, S.solid(C.dark, 2));
    else if (mouth === "frown") CU(g, [[-13, my + 4], [0, my - 3], [13, my + 4]], S.line(2.4));
    else if (mouth === "smile") CU(g, [[-13, my - 2], [0, my + 6], [13, my - 2]], S.line(2.4));
    else if (mouth === "flat") L(g, -10, my, 10, my, S.line(2.4));
    else CU(g, [[-10, my], [0, my + 3], [10, my]], S.line(2.4));
    if (p.glasses) {
      P(g, rr(-33, ey - 12, 28, 22, 6), S.line(2));
      P(g, rr(5, ey - 12, 28, 22, 6), S.line(2));
      L(g, -5, ey - 3, 5, ey - 3, S.line(2));
    }
  }

  /* ---------- tenues ---------- */
  const OUTFIT = {
    coat: { len: -160, style: () => S.solid(C.card, 2.6), sleeve: "long", pants: () => S.hatch(C.dark, 5, -45, 2.4) },
    scrubs: { len: -215, style: () => S.hatch(C.hatch, 6, -41, 2.6), sleeve: "short", pants: () => S.hatch(C.hatch, 6, -41, 2.4) },
    robe: { len: -40, style: () => S.solid(C.dark, 2.6), sleeve: "wide", pants: () => S.solid(C.dark, 2.4) },
    plain: { len: -215, style: () => S.hatch(C.hatch, 5, -41, 2.6), sleeve: "long", pants: () => S.hatch(C.gray, 5, -45, 2.4) },
  };

  function torsoPath(len, wide) {
    const w = wide ? 104 : 86;
    return `M-56,-432 C-76,-428 -84,-406 -84,-372 L-${w},${len} Q0,${len + 8} ${w},${len} L84,-372 C84,-406 76,-428 56,-432 Q30,-442 0,-440 Q-30,-442 -56,-432 Z`;
  }

  function arm(g, side, p, o) {
    // side : -1 = bras côté gauche de l'écran, +1 = côté droit
    const a = p[side < 0 ? "armL" : "armR"] || [6, -12];
    const sh = [side * G.shX, G.shY];
    const a1 = side * a[0], a2 = side * a[1];
    const [p0, p1, p2] = joints(sh, a1, G.upper, a2, G.fore);
    const armFill = o.style(), skin = S.solid(C.card, 2.4);
    if (o.sleeve === "short") {
      P(g, tube([p0, p1, p2], [28, 24, 22]), skin);
      P(g, tube([p0, lerp(p0, p1, 0.55)], [38, 34]), armFill);
    } else if (o.sleeve === "wide") {
      P(g, tube([p0, p1, lerp(p1, p2, 0.85)], [38, 44, 54]), armFill);
    } else {
      P(g, tube([p0, p1, lerp(p1, p2, 0.9)], [34, 31, 29]), armFill);
    }
    const hand = lerp(p1, p2, 1.06);
    if (p.holding && p.holding.side === side) p.holding.draw(g, hand, a1 + a2);
    E(g, hand[0], hand[1], 26, 26, skin);
    return { shoulder: p0, elbow: p1, wrist: p2, hand };
  }

  function legs(g, p, o) {
    const pose = p.legs || "stand";
    const pants = o.pants(), shoe = S.solid(C.dark, 2.2);
    if (pose === "sit") {
      // assis face caméra : cuisses vers nous (raccourcies), tibias vers le sol
      const hy = p.seatY;
      [-1, 1].forEach((s) => {
        P(g, tube([[s * 26, hy - 6], [s * 30, hy + 30], [s * 30, -16]], [48, 42, 34]), pants);
        E(g, s * 34, -6, 46, 18, shoe);
      });
      return;
    }
    const sw = pose === "walk" ? (p.step || 16) : 0;
    [-1, 1].forEach((s) => {
      const ang = s * sw;
      const [h, k, f] = joints([s * G.hipX, G.hipY], ang, G.thigh, -ang * 0.3, G.shin);
      P(g, tube([h, k, f], [46, 38, 32]), pants);
      E(g, f[0] + 8, f[1] + 2, 46, 18, shoe);
    });
  }

  function details(g, p, len) {
    if (p.outfit === "coat") {
      P(g, "M-22,-438 L0,-378 L22,-438 Z", S.solid(C.white, 2));
      CU(g, [[-22, -438], [-36, -392], [-5, -318]], S.line(2.4));
      CU(g, [[22, -438], [36, -392], [5, -318]], S.line(2.4));
      L(g, 3, -318, 2, len + 6, S.line(2));
      // ombre de volume côté droit
      P(g, `M72,-380 L76,${len + 4} L86,${len} L84,-372 Z`, S.hatch(C.hatch, 4, -41, 0, { stroke: "none" }));
      L(g, -70, -372, -40, -372, S.line(2.2));
      L(g, -62, -372, -60, -394, S.line(3));
      L(g, -52, -372, -51, -390, S.line(3, { stroke: C.gray }));
      L(g, -74, -236, -38, -236, S.line(2));
      L(g, 38, -236, 74, -236, S.line(2));
      if (p.stetho) {
        CU(g, [[-28, -436], [-34, -402], [-12, -364], [8, -356]], S.line(2.6));
        CU(g, [[28, -436], [34, -406], [22, -376]], S.line(2.6));
        E(g, 12, -350, 20, 20, S.solid(C.dark, 2));
      }
      if (p.badge) {
        P(g, rr(14, -398, 42, 30, 4), S.solid(C.white, 2));
        T(g, p.badge, 0, 0, 19, { transform: `translate(35,-376) scale(${p.facing < 0 ? -1 : 1},1)` });
      }
    } else if (p.outfit === "scrubs") {
      P(g, "M-28,-438 L0,-384 L28,-438", S.line(2.4));
      L(g, 36, -384, 68, -384, S.line(2));
      L(g, 48, -384, 48, -404, S.line(3));
    } else if (p.outfit === "robe") {
      P(g, "M-24,-438 L0,-362 L24,-438 Z", S.solid(C.white, 2));
      P(g, "M-6,-422 L6,-422 L9,-368 L0,-358 L-9,-368 Z", S.solid(C.white, 1.8));
      L(g, 0, -362, 0, len + 6, S.line(2, { stroke: C.gray }));
    }
  }

  /* ---------- personnage ---------- */
  function person(parent, p) {
    p = Object.assign({ x: 0, y: 0, scale: 1, facing: 1, outfit: "coat", hair: "short", legs: "stand", view: "front" }, p);
    const g = group(parent, { transform: `translate(${p.x},${p.y}) scale(${p.scale * p.facing},${p.scale})` });
    if (p.seed) seedN = p.seed;
    const o = Object.assign({}, OUTFIT[p.outfit] || OUTFIT.coat);
    if (p.silhouette) {
      const sil = S.hatch(C.hatch, 4.5, -41, 2.4);
      o.style = () => sil; o.pants = () => S.hatch(C.gray, 4.5, -41, 2.4);
    }
    const sitting = p.legs === "sit";
    const dy = sitting ? p.seatY - G.hipY : 0;
    if (!sitting && !p.noShadow) E(g, 0, 4, 180, 20, { fill: C.light, fillStyle: "solid", stroke: "none" });
    if (!p.bust) legs(g, p, o);
    const up = group(g, { transform: `translate(0,${dy})` });
    const len = sitting ? Math.min(o.len, G.hipY + 20) : o.len;
    const back = p.view === "back";
    if (p.armsBehind) { arm(up, -1, p, o); arm(up, 1, p, o); }
    P(up, torsoPath(len, p.outfit === "robe"), o.style());
    if (!back && !p.silhouette) details(up, p, len);
    if (back) L(up, 0, -436, 0, len + 6, S.line(2, { stroke: C.gray }));
    const headG = group(up, { transform: p.tilt ? `rotate(${p.tilt} 0 -450)` : "" });
    head(headG, p);
    if (!p.armsBehind && !p.bust) { g.hands = { L: arm(up, -1, p, o), R: arm(up, 1, p, o) }; }
    return g;
  }

  /* ---------- objets ---------- */
  function syringe(parent, o) {
    o = Object.assign({ x: 0, y: 0, rot: 0, scale: 1, kind: "milky", fill: 0.85, push: 0 }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y}) rotate(${o.rot}) scale(${o.scale})` });
    const bw = 250, bh = 46, stop = 18 + o.push * (bw - 60);
    // piston
    R(g, -100 + stop, -6, 120, 12, S.solid(C.light, 2));
    R(g, -112 + stop, -26, 14, 52, S.solid(C.light, 2.2));
    R(g, stop + 14, -bh / 2 + 3, 12, bh - 6, S.solid(C.dark, 2));
    // liquide
    const lx = stop + 26, lw = Math.max(0, (bw - 6) - lx);
    if (o.kind === "milky" && lw > 0) {
      R(g, lx, -bh / 2 + 3, lw, bh - 6, { ...S.solid(C.white, 0), stroke: "none" });
      R(g, lx, bh / 2 - 14, lw, 10, { ...S.hatch(C.light, 3, 0, 0), stroke: "none" });
    } else if (o.kind === "iv" && lw > 0) {
      R(g, lx, -bh / 2 + 3, lw, bh - 6, { ...S.hatch("#CFE0E6", 7, 90, 0), stroke: "none" });
    } else if (o.kind === "oral" && lw > 0) {
      R(g, lx, -bh / 2 + 3, lw, bh - 6, { ...S.solid(C.white, 0), stroke: "none" });
    }
    // corps
    R(g, 0, -bh / 2, bw, bh, S.line(2.6));
    L(g, -6, -bh / 2 - 22, -6, bh / 2 + 22, S.line(5));
    for (let i = 1; i <= 9; i++) L(g, 30 + i * 22, -bh / 2, 30 + i * 22, -bh / 2 + (i % 2 ? 10 : 16), S.line(1.6));
    // embout
    if (o.kind === "oral") {
      P(g, `M${bw},-12 L${bw + 26},-12 L${bw + 26},4 L${bw},12 Z`, S.solid(C.yellow, 2.2));
    } else {
      P(g, `M${bw},-10 L${bw + 30},-5 L${bw + 30},5 L${bw},10 Z`, S.line(2.2));
    }
    if (o.kind === "milky") {
      R(g, bw + 26, -12, 26, 24, S.solid(C.dark, 2));
      // étiquette vide
      P(g, rr(96, -bh / 2 - 6, 108, bh + 12, 6), S.line(2, { strokeLineDash: [8, 7] }));
      if (o.label) T(g, o.label, 150, 9, 24);
      else if (o.question !== false) T(g, "?", 150, 16, 44, { fill: C.yellow, font: "Kalam" });
    } else if (o.kind === "iv") {
      L(g, bw + 30, 0, bw + 150, 0, S.line(1.6));
      R(g, bw + 40, -9, 120, 18, S.hatch(C.hatch, 4, -45, 1.8));
      P(g, rr(96, -bh / 2 - 6, 108, bh + 12, 6), S.solid(C.white, 2));
      T(g, o.label || "Refobacin", 150, 3, 19);
      T(g, "40 mg i.v.", 150, 21, 15, { weight: 400 });
    } else if (o.kind === "oral") {
      P(g, rr(96, -bh / 2 - 6, 108, bh + 12, 6), S.solid(C.yellow, 2));
      T(g, "ORAL", 150, 10, 24);
    }
    return g;
  }

  function bottle(parent, o) {
    o = Object.assign({ x: 0, y: 0, scale: 1, label: "Cotrim-K", sub: "Saft" }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y}) scale(${o.scale})` });
    P(g, "M-40,0 L-40,-120 Q-40,-150 -18,-160 L-18,-184 L18,-184 L18,-160 Q40,-150 40,-120 L40,0 Z", S.hatch(C.gray, 5, -45, 2.4));
    R(g, -22, -212, 44, 30, S.solid(C.dark, 2.2));
    P(g, rr(-34, -110, 68, 70, 4), S.solid(C.white, 2));
    T(g, o.label, 0, -82, 17); T(g, o.sub, 0, -58, 17, { weight: 400 });
    return g;
  }
  function vial(parent, o) {
    o = Object.assign({ x: 0, y: 0, scale: 1, label: "Refobacin" }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y}) scale(${o.scale})` });
    P(g, "M-24,0 L-24,-70 Q-24,-80 -14,-84 L-14,-94 L14,-94 L14,-84 Q24,-80 24,-70 L24,0 Z", S.line(2.2));
    R(g, -18, -108, 36, 16, S.solid(C.gray, 2));
    P(g, rr(-22, -60, 44, 36, 3), S.solid(C.white, 1.8));
    T(g, o.label, 0, -37, 11);
    return g;
  }
  function tube_(parent, o) {
    o = Object.assign({ x: 0, y: 0, scale: 1, rot: 0 }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y}) rotate(${o.rot}) scale(${o.scale})` });
    P(g, "M-12,-80 L12,-80 L12,-6 Q12,8 0,8 Q-12,8 -12,-6 Z", S.solid(C.white, 2));
    R(g, -14, -100, 28, 22, S.solid(C.dark, 2));
    P(g, rr(-10, -66, 20, 40, 2), S.solid(C.yellow, 1.4));
    return g;
  }

  function monitor(parent, o) {
    o = Object.assign({ x: 0, y: 0, w: 260, h: 170, ecg: "normal", hr: "128", t: 0 }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y})` });
    P(g, rr(0, 0, o.w, o.h, 14), S.solid(C.dark, 2.6));
    P(g, rr(14, 14, o.w - 28, o.h - 48, 6), S.solid("#262426", 1.6));
    const y0 = 14 + (o.h - 48) / 2, x0 = 22, x1 = o.w - 22;
    const pts = [];
    for (let x = x0; x <= x1; x += 4) {
      const ph = ((x - x0) / 60 + o.t) % 1;
      let y = 0;
      if (o.ecg === "normal") y = ph > 0.42 && ph < 0.46 ? -40 : ph > 0.46 && ph < 0.5 ? 18 : ph > 0.7 && ph < 0.8 ? -8 : 0;
      else if (o.ecg === "alarm") y = Math.sin(((x - x0) / 9 + o.t * 6)) * 26;
      pts.push([x, y0 + y]);
    }
    PL(g, pts, { stroke: C.yellow, strokeWidth: 3, roughness: 0.4 });
    T(g, o.hr, o.w - 30, o.h - 12, 26, { fill: C.yellow, anchor: "end" });
    T(g, "HF", 30, o.h - 12, 18, { fill: C.hatch, anchor: "start" });
    if (o.ecg === "alarm") E(g, o.w - 16, -10, 22, 22, S.solid(C.yellow, 2));
    return g;
  }
  function clock(parent, o) {
    o = Object.assign({ x: 0, y: 0, r: 70, time: "08:45" }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y})` });
    E(g, 0, 0, o.r * 2, o.r * 2, S.solid(C.white, 3));
    for (let i = 0; i < 12; i++) {
      const a = rad(i * 30);
      L(g, Math.sin(a) * o.r * 0.8, -Math.cos(a) * o.r * 0.8, Math.sin(a) * o.r * 0.92, -Math.cos(a) * o.r * 0.92, S.line(i % 3 ? 1.6 : 3));
    }
    const [hh, mm] = o.time.split(":").map(Number);
    const am = rad(mm * 6), ah = rad((hh % 12) * 30 + mm * 0.5);
    L(g, 0, 0, Math.sin(ah) * o.r * 0.5, -Math.cos(ah) * o.r * 0.5, S.line(5, { roughness: 0.4 }));
    L(g, 0, 0, Math.sin(am) * o.r * 0.76, -Math.cos(am) * o.r * 0.76, S.line(3, { roughness: 0.4 }));
    E(g, 0, 0, 10, 10, S.solid(C.ink, 1));
    if (o.label !== false) T(g, o.time, 0, o.r + 40, 30);
    return g;
  }
  function ivPole(parent, o) {
    o = Object.assign({ x: 0, y: 0, h: 560 }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y})` });
    L(g, 0, 0, 0, -o.h, S.line(3.2));
    L(g, -50, 0, 50, 0, S.line(3));
    E(g, -50, 4, 14, 14, S.solid(C.dark, 1.6)); E(g, 50, 4, 14, 14, S.solid(C.dark, 1.6));
    L(g, -30, -o.h, 30, -o.h, S.line(2.6));
    P(g, rr(-26, -o.h + 10, 52, 90, 10), S.hatch(C.light, 5, 90, 2.2));
    return g;
  }
  function bed(parent, o) {
    o = Object.assign({ x: 0, y: 0, w: 520 }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y})` });
    const w = o.w;
    L(g, 20, -40, 20, -200, S.line(3)); L(g, w - 20, -40, w - 20, -230, S.line(3));
    R(g, 10, -170, w - 20, 26, S.solid(C.light, 2.4));
    R(g, 0, -214, w, 46, S.solid(C.white, 2.6));
    P(g, rr(w - 150, -248, 130, 40, 18), S.solid(C.white, 2.4));
    PL(g, [[40, -214], [40, -270], [w * 0.55, -270], [w * 0.55, -214]], S.line(2.4));
    for (let i = 1; i < 4; i++) L(g, 40 + i * (w * 0.55 - 40) / 4, -270, 40 + i * (w * 0.55 - 40) / 4, -214, S.line(1.6));
    E(g, 30, -22, 34, 34, S.solid(C.dark, 2)); E(g, w - 30, -22, 34, 34, S.solid(C.dark, 2));
    return g;
  }
  function cabinet(parent, o) {
    o = Object.assign({ x: 0, y: 0, tray: true }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y})` });
    R(g, 0, -230, 150, 230, S.solid(C.card, 2.6));
    L(g, 0, -170, 150, -170, S.line(2)); R(g, 56, -206, 38, 10, S.solid(C.light, 1.6));
    R(g, 56, -120, 38, 10, S.solid(C.light, 1.6));
    if (o.tray) {
      R(g, -14, -246, 178, 16, S.hatch(C.hatch, 4, -45, 2.2));
      E(g, 36, -258, 58, 14, S.solid(C.white, 2));
      P(g, "M110,-292 L114,-248 L140,-248 L144,-292 Z", S.solid(C.white, 2));
    }
    return g;
  }
  function door(parent, o) {
    o = Object.assign({ x: 0, y: 0, w: 220, h: 440, label: "" }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y})` });
    R(g, 0, -o.h, o.w, o.h, S.solid(C.card, 2.8));
    P(g, rr(40, -o.h + 50, o.w - 80, 120, 6), S.hatch(C.light, 7, -45, 2));
    E(g, o.w - 30, -o.h / 2, 18, 18, S.solid(C.dark, 1.6));
    if (o.label) { P(g, rr(o.w / 2 - 50, -o.h - 64, 100, 46, 6), S.solid(C.white, 2.2)); T(g, o.label, o.w / 2, -o.h - 32, 28); }
    return g;
  }
  function doodle(parent, o) {
    // dessins d'enfant au mur
    o = Object.assign({ x: 0, y: 0, kind: "sun", s: 1 }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y}) scale(${o.s})` });
    R(g, -60, -60, 120, 120, S.solid(C.white, 2));
    if (o.kind === "sun") {
      E(g, 0, 0, 44, 44, S.hatch(C.yellow, 4, -45, 2));
      for (let i = 0; i < 8; i++) { const a = rad(i * 45); L(g, Math.cos(a) * 30, Math.sin(a) * 30, Math.cos(a) * 44, Math.sin(a) * 44, S.line(2)); }
    } else if (o.kind === "house") {
      PL(g, [[-34, 30], [-34, -4], [0, -34], [34, -4], [34, 30], [-34, 30]], S.line(2.2));
      R(g, -8, 6, 16, 24, S.line(2));
    } else {
      CU(g, [[-30, 30], [-20, 0], [0, -10], [20, 0], [30, 30]], S.line(2.2));
      E(g, -12, -22, 14, 14, S.line(2)); E(g, 12, -22, 14, 14, S.line(2));
    }
    return g;
  }
  function babyBundle(parent, o) {
    o = Object.assign({ x: 0, y: 0, rot: -12, scale: 1, line: true }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y}) rotate(${o.rot}) scale(${o.scale})` });
    P(g, "M-90,10 C-96,-30 -60,-46 0,-44 C60,-44 92,-26 92,6 C92,36 50,46 0,44 C-56,44 -86,36 -90,10 Z", S.solid(C.white, 2.6));
    CU(g, [[-60, -30], [-20, 0], [40, 30]], S.line(1.8, { stroke: C.gray }));
    CU(g, [[-20, -40], [10, -10], [70, 10]], S.line(1.8, { stroke: C.gray }));
    E(g, -98, -2, 62, 60, S.solid(C.card, 2.4));
    P(g, "M-128,-6 C-128,-40 -70,-42 -68,-8 C-80,-20 -116,-20 -128,-6 Z", S.hatch(C.hatch, 3.5, 50, 2));
    E(g, -60, 22, 20, 18, S.solid(C.card, 2));
    return g;
  }
  function folder(parent, o) {
    o = Object.assign({ x: 0, y: 0, w: 560, h: 380, title: "AKTE 01", sub: "", open: 0 }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y})` });
    P(g, `M0,30 L0,${o.h} L${o.w},${o.h} L${o.w},30 L${o.w * 0.42},30 L${o.w * 0.36},0 L0,0 Z`, S.hatch("#C9B48A", 6, -41, 2.8));
    R(g, 0, 50, o.w, o.h - 50, S.solid("#E7D9B8", 2.8));
    P(g, rr(o.w / 2 - 170, 120, 340, 110, 8), S.solid(C.white, 2.4));
    T(g, o.title, o.w / 2, 196, 64, { font: "Kalam" });
    if (o.sub) T(g, o.sub, o.w / 2, 290, 30, { weight: 400 });
    return g;
  }
  function stamp(parent, o) {
    o = Object.assign({ x: 0, y: 0, rot: -8, text: "SCHULDIG", sub: "", w: 520, h: 150 }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y}) rotate(${o.rot})` });
    P(g, rr(-o.w / 2, -o.h / 2, o.w, o.h, 14), S.line(6, { roughness: 1.6 }));
    P(g, rr(-o.w / 2 + 12, -o.h / 2 + 12, o.w - 24, o.h - 24, 10), S.line(2.4, { roughness: 1.4 }));
    T(g, o.text, 0, o.sub ? -2 : 22, o.sub ? 64 : 72, { font: "Kalam" });
    if (o.sub) T(g, o.sub, 0, 44, 32, { weight: 400 });
    return g;
  }
  function bench(parent, o) {
    o = Object.assign({ x: 0, y: 0, w: 620, h: 260, label: "" }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y})` });
    R(g, 0, -o.h, o.w, o.h, S.hatch("#A89A84", 7, -41, 2.8));
    R(g, -14, -o.h - 18, o.w + 28, 22, S.solid("#8C7E69", 2.6));
    for (let i = 1; i < 4; i++) L(g, (o.w / 4) * i, -o.h + 10, (o.w / 4) * i, -10, S.line(2));
    if (o.label) { P(g, rr(o.w / 2 - 150, -o.h + 50, 300, 56, 6), S.solid(C.white, 2.2)); T(g, o.label, o.w / 2, -o.h + 88, 28); }
    return g;
  }
  function gavel(parent, o) {
    o = Object.assign({ x: 0, y: 0, rot: -30, scale: 1 }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y}) rotate(${o.rot}) scale(${o.scale})` });
    R(g, -6, -10, 140, 14, S.solid("#8C7E69", 2.2));
    R(g, -40, -40, 50, 74, S.hatch("#8C7E69", 4, -45, 2.4));
    return g;
  }
  function chair(parent, o) {
    o = Object.assign({ x: 0, y: 0, scale: 1 }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y}) scale(${o.scale})` });
    R(g, -60, -330, 120, 160, S.hatch(C.hatch, 6, -41, 2.4));
    R(g, -70, -180, 140, 24, S.solid(C.light, 2.4));
    L(g, -60, -156, -60, 0, S.line(3)); L(g, 60, -156, 60, 0, S.line(3));
    return g;
  }
  function bubble(parent, o) {
    o = Object.assign({ x: 0, y: 0, w: 360, h: 120, tail: [40, 70], text: "", size: 38, think: false, tag: "" }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y})` });
    if (o.think) {
      E(g, 0, 0, o.w, o.h, S.solid(C.white, 2.6));
      E(g, o.tail[0] * 0.5, o.h / 2 + 24, 30, 22, S.solid(C.white, 2.2));
      E(g, o.tail[0], o.h / 2 + 54, 18, 14, S.solid(C.white, 2));
    } else {
      const w = o.w, h = o.h, x0 = -w / 2, y0 = -h / 2, tx = o.tail[0], ty = o.tail[1];
      P(g, `M${x0 + 24},${y0} H${x0 + w - 24} Q${x0 + w},${y0} ${x0 + w},${y0 + 24} V${y0 + h - 24} Q${x0 + w},${y0 + h} ${x0 + w - 24},${y0 + h}
             H${Math.min(tx + 30, x0 + w - 30)} L${tx},${y0 + h + ty} L${Math.max(tx - 6, x0 + 30)},${y0 + h} H${x0 + 24} Q${x0},${y0 + h} ${x0},${y0 + h - 24} V${y0 + 24} Q${x0},${y0} ${x0 + 24},${y0} Z`,
        S.solid(C.white, 2.6));
    }
    if (o.text) T(g, o.text, 0, o.size * 0.36, o.size, { font: o.font });
    if (o.tag) { P(g, rr(-o.w / 2 + 10, -o.h / 2 - 22, o.tag.length * 11 + 24, 30, 6), S.solid(C.yellow, 1.8)); T(g, o.tag, -o.w / 2 + 22, -o.h / 2 - 1, 18, { anchor: "start", weight: 700 }); }
    return g;
  }
  function tag(parent, o) {
    // petite étiquette « laut Urteil » / « Rekonstruktion » / « Zitat Gericht »
    o = Object.assign({ x: 0, y: 0, text: "laut Urteil", size: 22, fill: C.yellow }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y})` });
    const w = o.text.length * o.size * 0.5 + 26;
    P(g, rr(0, 0, w, o.size + 16, 7), S.solid(o.fill, 1.8));
    T(g, o.text, 13, o.size + 3, o.size, { anchor: "start" });
    return g;
  }
  function gloss(parent, o) {
    // terme allemand + traduction darija en dessous
    o = Object.assign({ x: 0, y: 0, de: "", ar: "", size: 40 }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y})` });
    T(g, o.de, 0, 0, o.size);
    T(g, o.ar, 0, o.size * 0.95, o.size * 0.62, { weight: 400, font: "'Plex Arabic', sans-serif", fill: C.dark, dir: "rtl" });
    return g;
  }
  function floor(parent, o) {
    o = Object.assign({ y: 1300, x0: -40, x1: 1120 }, o);
    const g = group(parent);
    L(g, o.x0, o.y, o.x1, o.y, S.line(3));
    for (let i = 0; i < 14; i++) L(g, 40 + i * 80, o.y + 10, 20 + i * 80, o.y + 26, S.line(1.6, { stroke: C.hatch }));
    return g;
  }
  function germany(parent, o) {
    // silhouette simplifiée de l'Allemagne + point sur Bielefeld
    o = Object.assign({ x: 0, y: 0, s: 1, city: "Bielefeld" }, o);
    const g = group(parent, { transform: `translate(${o.x},${o.y}) scale(${o.s})` });
    P(g, "M58,0 L82,6 L92,22 L118,16 L128,30 L122,52 L136,74 L132,104 L144,128 L132,150 L106,160 L114,186 L98,206 L70,204 L44,212 L24,198 L30,174 L12,156 L18,128 L2,108 L10,84 L4,58 L22,40 L30,22 L48,18 Z",
      S.hatch(C.hatch, 5, -41, 2.4));
    E(g, 44, 82, 16, 16, S.solid(C.yellow, 2.2));
    if (o.city) T(g, o.city, 60, 76, 22, { anchor: "start" });
    return g;
  }

  global.Cast = {
    C, el, group, person, syringe, bottle, vial, tube: tube_, monitor, clock, ivPole, bed, cabinet, door, doodle,
    babyBundle, folder, stamp, bench, gavel, chair, bubble, tag, gloss, floor, germany, text: T, rr,
    reseed(n) { seedN = n; },
  };
})(window);
