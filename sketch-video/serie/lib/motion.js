/* motion.js — motion design pour les scènes AKTE (stage.js) : rien ne reste figé.
 * Global : window.Motion   (nécessite rough.js, sketch-cast.js, stage.js)
 *
 *   Motion.bubble(g, o)      bulle de parole / de pensée en UN seul tracé : la queue part du bas (ou du haut) de la
 *                            bulle et vise la bouche. o = { x, y, w, h, tip:[x,y], think, seed }
 *   const m = Motion.of(c)   outils liés à une scène (c = scène de stage.js)
 *     m.obj(fn, x, y, s, o)        décor posé en coordonnées MONDE (pivot simple) → Node
 *     m.speech(o)                  bulle + texte dans un même nœud, qui jaillit de la bouche ; o.lines, o.at, o.until
 *     m.typing(x, y, at, until)    trois points qui rebondissent (« … »)
 *     m.build(node, at, kind, o)   entrée chorégraphiée : drop | rise | left | right | grow | growY | swing
 *     m.sway(node, deg, période, pivot, phase)   balancement continu (lampe, arbre, rideau, panneau)
 *     m.pend(node, at, deg, pivot, o)            pendule amorti (objet qui vient d'être lâché)
 *     m.drift(node, x0, x1, vitesse, phase)      défilement en boucle (nuages, passants)
 *     m.par(node, profondeur)      parallaxe de caméra : < 1 = loin (bouge moins), > 1 = premier plan (bouge plus)
 *     m.dust(box, n, o)            particules qui flottent (poussière dans un faisceau : o.cone)
 *     m.rays(x, y, o)              rayons qui tournent derrière un sujet
 *     m.ripple(x, y, at, o)        ondes qui s'élargissent
 *     m.shapes(o)                  petites formes abstraites qui dérivent (fonds des scènes-schémas)
 *     m.alarm(t0, t1, o)           voile rouge qui pulse (alarme)
 */
(function (global) {
  "use strict";
  const SC = global.SketchCast, U = SC.util, MAT = SC.MAT, S = global.Stage;
  const E = S.E, prog = S.prog, lerp = S.lerp, clamp = S.clamp, hash = S.hash, el = U.el;
  const INK = "#1C1A1C", YEL = "#F8CE4E", TAU = Math.PI * 2, f = (v) => Math.round(v * 10) / 10;
  const bounce = (p) => { const n = 7.5625, d = 2.75; if (p < 1 / d) return n * p * p; if (p < 2 / d) return n * (p -= 1.5 / d) * p + 0.75; if (p < 2.5 / d) return n * (p -= 2.25 / d) * p + 0.9375; return n * (p -= 2.625 / d) * p + 0.984375; };

  // ───────────────────────── bulles
  function bubblePath(x, y, w, h, r, tip, bw) {
    const x0 = x - w / 2, x1 = x + w / 2, y0 = y - h / 2, y1 = y + h / 2;
    const up = tip && tip[1] < y;
    const bx = tip ? clamp(lerp(tip[0], x, 0.3), x0 + r + bw + 4, x1 - r - bw - 4) : 0;
    const tail = (yy, dir) => {   // dir = sens de parcours du bord (+1 : de droite à gauche, en bas ; −1 : de gauche à droite, en haut)
      const a = bx + dir * bw, b = bx - dir * bw, my = lerp(yy, tip[1], 0.55);
      return ` L${f(a)} ${f(yy)} Q${f(lerp(a, tip[0], 0.35))} ${f(my)} ${f(tip[0])} ${f(tip[1])} Q${f(lerp(b, tip[0], 0.15))} ${f(my)} ${f(b)} ${f(yy)}`;
    };
    let d = `M${f(x0 + r)} ${f(y0)}`;
    if (tip && up) d += tail(y0, -1);
    d += ` L${f(x1 - r)} ${f(y0)} Q${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + r)} L${f(x1)} ${f(y1 - r)} Q${f(x1)} ${f(y1)} ${f(x1 - r)} ${f(y1)}`;
    if (tip && !up) d += tail(y1, 1);
    d += ` L${f(x0 + r)} ${f(y1)} Q${f(x0)} ${f(y1)} ${f(x0)} ${f(y1 - r)} L${f(x0)} ${f(y0 + r)} Q${f(x0)} ${f(y0)} ${f(x0 + r)} ${f(y0)} Z`;
    return d;
  }
  function bubble(g, o) {
    o = Object.assign({ w: 200, h: 110, r: 30, bw: 17, seed: 801, think: false }, o);
    while (g.firstChild) g.removeChild(g.firstChild);
    const C = U.ctx(g, o.seed, false, 1), d = bubblePath(o.x, o.y, o.w, o.h, Math.min(o.r, o.h / 2 - 2), o.think ? null : o.tip, o.bw);
    el("path", { d, fill: "#CFCFC8", transform: "translate(6 8)" }, g);
    U.shape(C, "bub", d, MAT.white, { sw: 3.2, r: 0.55 });
    if (o.think && o.tip) {   // ronds de pensée : du bord de la bulle vers la tête, de plus en plus petits
      const up = o.tip[1] < o.y, ey = up ? o.y - o.h / 2 : o.y + o.h / 2, ex = clamp(lerp(o.tip[0], o.x, 0.45), o.x - o.w / 2 + 26, o.x + o.w / 2 - 26);
      [[0.28, 13], [0.62, 9], [0.92, 5.5]].forEach(([k, rr]) => {
        const cx = f(lerp(ex, o.tip[0], k)), cy = f(lerp(ey, o.tip[1], k));
        el("circle", { cx: cx + 3, cy: cy + 4, r: rr, fill: "#CFCFC8" }, g);
        el("circle", { cx, cy, r: rr, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.8 }, g);
      });
    }
    return { tip: o.tip };
  }

  // ───────────────────────── outils liés à une scène
  function of(c) {
    const T = (at) => c.T(at);
    const cam0 = () => (c.cams && c.cams[0]) || { cx: 540, cy: 960, s: 1 };
    const m = {
      T,
      // décor en coordonnées monde : fn(g, o) dessine à l'origine, le groupe est placé/échelonné → pivots en coordonnées monde
      obj(fn, x, y, s, o) {
        const inner = el("g", { transform: `translate(${x || 0} ${y || 0})${s && s !== 1 ? ` scale(${s})` : ""}` });
        const out = fn(inner, o || {}); const n = c.node(inner); n.out = out || null; return n;
      },
      par(node, depth) { return node.on((t, s) => { const a = cam0(), q = c.camAt(t); s.x += (q.cx - a.cx) * (1 - depth); s.y += (q.cy - a.cy) * (1 - depth); }); },
      build(node, at, kind, o) {
        o = o || {}; const a = T(at), d = o.dur || 0.5, dist = o.dist == null ? 240 : o.dist;
        return node.on((t, s) => {
          const p = prog(t, a, d);
          if (p <= 0) { s.o *= 0; return; }
          if (p >= 1) return;
          s.o *= clamp(p * 6, 0, 1);
          const pv = () => { if (o.pivot) { s.px = o.pivot[0]; s.py = o.pivot[1]; } };
          if (kind === "drop") s.y -= dist * (1 - bounce(p));
          else if (kind === "rise") s.y += dist * (1 - E.back(p));
          else if (kind === "left") s.x -= dist * (1 - E.back(p));
          else if (kind === "right") s.x += dist * (1 - E.back(p));
          else if (kind === "grow") { pv(); s.s *= Math.max(0.01, E.back(p)); }
          else if (kind === "growY") { pv(); s.sy *= Math.max(0.01, E.back(p)); }
          else if (kind === "swing") { pv(); s.r += (o.deg == null ? -70 : o.deg) * (1 - E.out(p)) * Math.cos(p * Math.PI * 2.5); }
        });
      },
      sway(node, deg, period, pivot, phase) {
        return node.on((t, s) => { if (s.px == null && pivot) { s.px = pivot[0]; s.py = pivot[1]; } s.r += deg * Math.sin((t / period) * TAU + (phase || 0)); });
      },
      pend(node, at, deg, pivot, o) {
        o = o || {}; const a = T(at), k = o.damp || 2.2, w = o.freq || 7.5, idle = o.idle == null ? 0.6 : o.idle;
        return node.on((t, s) => {
          if (s.px == null && pivot) { s.px = pivot[0]; s.py = pivot[1]; }
          const u = t - a; s.r += u < 0 ? 0 : deg * Math.exp(-k * u) * Math.sin(w * u) + idle * Math.sin(t * 1.3);
        });
      },
      drift(node, x0, x1, speed, phase) {
        const L = x1 - x0;
        return node.on((t, s) => { const u = ((((phase || 0) * L + t * speed) % L) + L) % L; s.x += x0 + u; s.o *= clamp(Math.min(u, L - u) / 70, 0, 1); });
      },
      // poussière / particules : box = { x, y, w, h } ; o.cone = le nuage se resserre vers le haut (faisceau de lampe)
      dust(box, n, o) {
        o = Object.assign({ seed: 7, col: "#FFFFFF", r: 3.2, speed: 16, cone: false, op: 0.75, from: -1e9, to: 1e9 }, o);
        const g = el("g"), cs = [];
        for (let i = 0; i < n; i++) cs.push(el("circle", { r: f(o.r * (0.6 + 0.8 * hash(i * 5 + o.seed))), fill: o.col, stroke: o.stroke || "none", "stroke-width": 1 }, g));
        const node = c.node(g);
        c.tick((t) => {
          if (t < o.from || t > o.to) { g.setAttribute("display", "none"); return; }
          g.removeAttribute("display");
          for (let i = 0; i < n; i++) {
            const h1 = hash(i * 3 + o.seed), h2 = hash(i * 7 + o.seed + 1), h3 = hash(i * 11 + o.seed + 2);
            const v = (((h2 * box.h - t * o.speed * (0.5 + h3)) % box.h) + box.h) % box.h, ky = v / box.h;
            const spread = o.cone ? 0.42 + 0.58 * ky : 1;
            const x = box.x + box.w / 2 + (h1 - 0.5) * box.w * spread + Math.sin(t * (0.6 + h3) + i) * 10, y = box.y + v;
            cs[i].setAttribute("cx", f(x)); cs[i].setAttribute("cy", f(y));
            cs[i].setAttribute("opacity", f(o.op * Math.sin(ky * Math.PI) * (0.55 + 0.45 * Math.sin(t * 2 + i * 1.7))));
          }
        });
        return node;
      },
      rays(x, y, o) {
        o = Object.assign({ n: 12, R: 620, col: YEL, op: 0.2, speed: 9, at: null }, o);
        const g = el("g", { opacity: o.op });
        for (let i = 0; i < o.n; i++) { const a0 = (i / o.n) * TAU, a1 = a0 + TAU / o.n / 2;
          el("path", { d: `M${x} ${y} L${f(x + Math.cos(a0) * o.R)} ${f(y + Math.sin(a0) * o.R)} L${f(x + Math.cos(a1) * o.R)} ${f(y + Math.sin(a1) * o.R)} Z`, fill: o.col }, g); }
        const node = c.node(g).on((t, s) => { s.px = x; s.py = y; s.r += t * o.speed; });
        if (o.at != null) { const a = T(o.at); node.on((t, s) => { const p = prog(t, a, 0.5); s.o *= p; s.s *= 0.3 + 0.7 * E.out(p); }); }
        return node;
      },
      ripple(x, y, at, o) {
        o = Object.assign({ n: 3, R: 150, col: YEL, sw: 6, dur: 0.9, gap: 0.2 }, o);
        const a = T(at), g = el("g"), cs = [];
        for (let i = 0; i < o.n; i++) cs.push(el("circle", { cx: x, cy: y, r: 1, fill: "none", stroke: o.col, "stroke-width": o.sw }, g));
        const node = c.node(g);
        c.tick((t) => cs.forEach((ci, i) => { const p = prog(t, a + i * o.gap, o.dur); ci.setAttribute("r", f(8 + (o.R - 8) * E.out(p))); ci.setAttribute("opacity", p <= 0 || p >= 1 ? 0 : f(1 - p)); }));
        return node;
      },
      // formes abstraites qui dérivent : o.pts = [[x, y], …] (dans les marges), o.seed
      shapes(o) {
        o = Object.assign({ seed: 3, pts: [[150, 520], [930, 470], [130, 1180], [940, 880], [540, 400]], op: 0.7 }, o);
        const nodes = [];
        o.pts.forEach(([x, y], i) => {
          const k = Math.floor(hash(i * 13 + o.seed) * 5), col = i % 2 ? YEL : "#C9C9C1", g = el("g", { opacity: o.op });
          if (k === 0) el("circle", { cx: x, cy: y, r: 16, fill: "none", stroke: col, "stroke-width": 5 }, g);
          else if (k === 1) el("path", { d: `M${x - 16} ${y} L${x + 16} ${y} M${x} ${y - 16} L${x} ${y + 16}`, stroke: col, "stroke-width": 6, "stroke-linecap": "round" }, g);
          else if (k === 2) el("path", { d: `M${x} ${y - 18} L${x + 17} ${y + 12} L${x - 17} ${y + 12} Z`, fill: "none", stroke: col, "stroke-width": 5, "stroke-linejoin": "round" }, g);
          else if (k === 3) el("path", { d: `M${x - 24} ${y} q 8 -14 16 0 t 16 0 t 16 0`, fill: "none", stroke: col, "stroke-width": 5, "stroke-linecap": "round" }, g);
          else [[-10, -10], [10, -10], [-10, 10], [10, 10]].forEach(([dx, dy]) => el("circle", { cx: x + dx, cy: y + dy, r: 4.5, fill: col }, g));
          const ph = hash(i * 17 + o.seed) * TAU, n = c.node(g).on((t, s) => { s.px = x; s.py = y; s.x += 10 * Math.sin(t * 0.7 + ph); s.y += 12 * Math.cos(t * 0.55 + ph); s.r += 14 * Math.sin(t * 0.5 + ph) + (k === 1 ? t * 20 : 0); });
          if (o.at != null) n.pop(T(o.at) + i * 0.06, 0.4);
          nodes.push(n);
        });
        return nodes;
      },
      alarm(t0, t1, o) {
        o = Object.assign({ col: "#E05A4F", op: 0.16, hz: 2 }, o); const a = T(t0), b = T(t1);
        return c.put(`<rect x="0" y="0" width="1080" height="1920" fill="${o.col}"/>`, 0, 0, 1, 0, c.hud).on((t, s) => { s.o *= t >= a && t < b ? o.op * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin((t - a) * TAU * o.hz))) : 0; });
      },
      typing(x, y, at, until, o) {
        o = Object.assign({ r: 6.5, gap: 22, col: INK }, o); const a = T(at), b = until == null ? 1e9 : T(until);
        const g = el("g"), cs = [-1, 0, 1].map((k) => el("circle", { cx: x + k * o.gap, cy: y, r: o.r, fill: o.col }, g));
        const node = c.node(g).on((t, s) => { s.o *= t >= a && t < b ? clamp((t - a) * 6, 0, 1) : 0; });
        c.tick((t) => cs.forEach((ci, i) => ci.setAttribute("cy", f(y - 9 * Math.max(0, Math.sin((t - a) * TAU * 1.5 - i * 0.9))))));
        return node;
      },
      // bulle + contenu dans un seul nœud ; elle jaillit de la pointe (la bouche) avec un léger rebond
      speech(o) {
        const g = el("g"); bubble(g, o);
        (o.lines || []).forEach((l) => { const t = el("text", { x: o.x + (l.dx || 0), y: o.y + (l.dy || 0), "font-size": l.size || 34, "text-anchor": "middle", class: l.cls || "de" }, g); t.textContent = l.text; });
        const a = T(o.at), tip = o.tip || [o.x, o.y + o.h / 2], n = c.node(g);
        n.on((t, s) => { const p = prog(t, a, 0.34); if (p <= 0) { s.o *= 0; return; } if (p < 1) { s.px = tip[0]; s.py = tip[1]; s.s *= Math.max(0.01, E.back(p)); s.o *= clamp(p * 5, 0, 1); } else s.y += 2.5 * Math.sin((t - a) * 2.2); });
        if (o.until != null) { const b = T(o.until); n.on((t, s) => { const p = prog(t, b, 0.18); if (p > 0) { s.px = tip[0]; s.py = tip[1]; s.s *= Math.max(0.01, 1 - E.in(p)); s.o *= 1 - p; } }); }
        return n;
      },
    };
    return m;
  }

  global.Motion = { bubble, bubblePath, of, bounce };
})(window);
