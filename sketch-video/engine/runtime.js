/*
 * sketch-video runtime
 * --------------------
 * Transforme une page HTML (le "poster" 1080x1920) en vidéo animée :
 *   - chaque élément avec data-at="cue" apparaît au moment où le mot est prononcé
 *   - la caméra suit le contenu, puis dézoome à la fin pour montrer tout le poster
 *   - les sous-titres (étiquettes) suivent les "beats" du script
 *
 * Tout est déterministe : SV.seek(t) met la page exactement dans l'état du temps t.
 * Le script render.mjs appelle seek() image par image et capture l'écran.
 *
 * Cues (data-at, data-hl, data-circle, data-underline, data-strike) :
 *   "b5"               début du beat b5
 *   "b5@Pleuralinie"   moment où le mot contenant "Pleuralinie" est prononcé dans b5
 *   "b5@2"             3e mot du beat b5 (index 0)
 *   "b5@end"           fin du beat b5
 *   "b5+0.4" / "b5@Pleuralinie-0.2"  décalage en secondes
 *   "prev+0.3"         0.3 s après l'élément précédent
 *   "12.5"             temps absolu en secondes
 */
(function () {
  "use strict";
  const W = 1080, H = 1920;
  const INK = "#1C1A1C", HATCH = "#A9A9A4", YELLOW = "#F8CE4E", CARD = "#FCFCF9";
  const SV = (window.SV = window.SV || {});
  const RENDER = /[?&]render\b/.test(location.search);

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const E = {
    out: (t) => 1 - Math.pow(1 - t, 3),
    inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    back: (t) => { const c1 = 1.7, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
  };
  const prog = (t, t0, d) => (d <= 0 ? (t >= t0 ? 1 : 0) : clamp((t - t0) / d, 0, 1));
  const norm = (s) => s.toLowerCase().replace(/[ً-ْـ]/g, "").replace(/[^\p{L}\p{N}]+/gu, "");

  let seedCounter = 1;
  const seed = () => (seedCounter++ * 7919) % 2147483647;

  /* ======================= minutage ======================= */
  function words(text) { return text.split(/\s+/).filter(Boolean); }

  function estimateBeat(text, start) {
    const ws = words(text);
    const dur = Math.max(1.3, text.replace(/\s+/g, "").length * 0.075 + 0.35);
    const total = ws.reduce((a, w) => a + w.length, 0) || 1;
    let acc = 0;
    const wt = ws.map((w) => { const s = start + (dur * 0.92 * acc) / total; acc += w.length; return [s, start + (dur * 0.92 * acc) / total]; });
    return { start, end: start + dur, words: wt };
  }

  function buildTimings() {
    const beats = (window.BEATS || []).map((b) => (Array.isArray(b) ? { id: b[0], text: b[1], cap: b[2] } : b));
    const T = window.TIMINGS;
    const byId = {};
    const warnings = [];
    let t = 0.6;
    for (const b of beats) {
      const al = T && T.beats && T.beats.find((x) => x.id === b.id);
      let tm;
      if (al) {
        tm = { start: al.start, end: al.end, words: al.words };
        if (!al.words || al.words.length !== words(b.text).length) {
          warnings.push(`beat ${b.id}: le texte a changé depuis l'alignement, mots ré-estimés`);
          const est = estimateBeat(b.text, al.start);
          const k = (al.end - al.start) / (est.end - est.start);
          tm.words = est.words.map(([s, e]) => [al.start + (s - al.start) * k, al.start + (e - al.start) * k]);
        }
      } else {
        if (T && T.beats) warnings.push(`beat ${b.id}: absent de timings.js (estimé)`);
        tm = estimateBeat(b.text, t);
      }
      Object.assign(b, tm);
      byId[b.id] = b;
      t = b.end + 0.15;
    }
    const lastEnd = beats.length ? beats[beats.length - 1].end : 1;
    return { beats, byId, audio: T && T.audio, audioDuration: (T && T.duration) || lastEnd + 0.4, warnings };
  }

  function parseCue(str, prevT, tm) {
    let s = String(str).trim();
    let off = 0;
    const m = s.match(/^(.+?)([+-]\d*\.?\d+)$/);
    if (m && !/^\d*\.?\d+$/.test(s)) { s = m[1]; off = parseFloat(m[2]); }
    if (/^\d*\.?\d+$/.test(s)) return parseFloat(s) + off;
    if (s === "prev") return prevT + off;
    const at = s.indexOf("@");
    const bid = at < 0 ? s : s.slice(0, at);
    const word = at < 0 ? null : s.slice(at + 1);
    const beat = tm.byId[bid];
    if (!beat) throw new Error(`cue "${str}" : beat "${bid}" introuvable`);
    if (!word) return beat.start + off;
    if (word === "end") return beat.end + off;
    if (/^\d+$/.test(word)) {
      const w = beat.words[+word];
      if (!w) throw new Error(`cue "${str}" : le beat ${bid} n'a pas de mot n°${word}`);
      return w[0] + off;
    }
    const q = norm(word);
    const ws = words(beat.text);
    const idx = ws.findIndex((w) => norm(w).includes(q));
    if (idx < 0) throw new Error(`cue "${str}" : mot "${word}" absent du beat ${bid} ("${beat.text}")`);
    return beat.words[idx][0] + off;
  }

  /* ======================= dessins rough.js ======================= */
  function svgEl(tag, attrs) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const k in attrs || {}) el.setAttribute(k, attrs[k]);
    return el;
  }
  function roundRect(x, y, w, h, r) {
    return `M${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x + r} Q${x},${y + h} ${x},${y + h - r} V${y + r} Q${x},${y} ${x + r},${y} Z`;
  }
  function bubblePath(w, h, r, tail) {
    // tail: {side:'top'|'bottom', x: fraction, dx: décalage pointe}
    const tx = w * tail.x, tw = 34, dx = tail.dx || 20, th = 46;
    if (tail.side === "top")
      return `M${r},0 H${tx - tw / 2} L${tx + dx},${-th} L${tx + tw / 2},0 H${w - r} Q${w},0 ${w},${r} V${h - r} Q${w},${h} ${w - r},${h} H${r} Q0,${h} 0,${h - r} V${r} Q0,0 ${r},0 Z`;
    return `M${r},0 H${w - r} Q${w},0 ${w},${r} V${h - r} Q${w},${h} ${w - r},${h} H${tx + tw / 2} L${tx + dx},${h + th} L${tx - tw / 2},${h} H${r} Q0,${h} 0,${h - r} V${r} Q0,0 ${r},0 Z`;
  }
  function markPaths(g) {
    g.querySelectorAll("path").forEach((p) => {
      const filled = p.getAttribute("fill") && p.getAttribute("fill") !== "none" && (!p.getAttribute("stroke") || p.getAttribute("stroke") === "none");
      if (filled) p.dataset.fill = "1";
      else p.setAttribute("pathLength", "1");
    });
    return g;
  }
  function backdrop(el) {
    const old = el.querySelector(":scope > svg.rough-bg");
    if (old) old.remove();
    const svg = svgEl("svg", { class: "rough-bg", width: el.offsetWidth, height: el.offsetHeight });
    el.insertBefore(svg, el.firstChild);
    return svg;
  }

  function drawCard(el) {
    const w = el.offsetWidth, h = el.offsetHeight, svg = backdrop(el), rc = rough.svg(svg);
    const isBubble = el.classList.contains("bubble");
    const tail = { side: el.dataset.tail || "top", x: parseFloat(el.dataset.tailX || "0.8"), dx: parseFloat(el.dataset.tailDx || "20") };
    const d = isBubble ? bubblePath(w, h, 22, tail) : roundRect(0, 0, w, h, 20);
    const s = seed();
    // ombre décalée (bord bas/droite plus sombre, comme dans les sketchnotes)
    const sh = rc.path(d, { stroke: "#B5B5AF", strokeWidth: 3.5, roughness: 0.9, seed: s + 1 });
    sh.setAttribute("transform", "translate(4,6)");
    svg.appendChild(markPaths(sh));
    svg.appendChild(markPaths(rc.path(d, { stroke: INK, strokeWidth: 2.6, roughness: 1.0, bowing: 0.6, fill: el.dataset.fill || CARD, fillStyle: "solid", seed: s })));
  }

  function drawRibbon(el) {
    const w = el.offsetWidth, h = el.offsetHeight, svg = backdrop(el), rc = rough.svg(svg);
    const s = seed(), drop = 12, tail = 56;
    const white = el.classList.contains("white");
    const tailOpts = { stroke: INK, strokeWidth: 2.2, roughness: 1.1, fill: HATCH, fillStyle: "hachure", hachureGap: 5, fillWeight: 1.4, hachureAngle: -50, seed: s };
    const L = [[tail + 4, drop], [tail + 4, h + drop], [0, h + drop], [20, h / 2 + drop], [0, drop]];
    const R = L.map(([x, y]) => [w - x, y]);
    svg.appendChild(markPaths(rc.polygon(L, tailOpts)));
    svg.appendChild(markPaths(rc.polygon(R, { ...tailOpts, seed: s + 1 })));
    // petits plis sombres
    svg.appendChild(markPaths(rc.polygon([[tail - 8, h], [tail + 4, h], [tail + 4, h + drop]], { stroke: INK, strokeWidth: 1.5, fill: "#555", fillStyle: "solid", roughness: 0.6, seed: s + 2 })));
    svg.appendChild(markPaths(rc.polygon([[w - tail + 8, h], [w - tail - 4, h], [w - tail - 4, h + drop]], { stroke: INK, strokeWidth: 1.5, fill: "#555", fillStyle: "solid", roughness: 0.6, seed: s + 3 })));
    svg.appendChild(markPaths(rc.rectangle(tail - 8, 0, w - 2 * (tail - 8), h, { stroke: INK, strokeWidth: 2.6, roughness: 0.9, fill: white ? "#FFFFFF" : YELLOW, fillStyle: "solid", seed: s + 4 })));
  }

  function drawRobot(el) {
    const svg = backdrop(el), rc = rough.svg(svg), s = seed();
    svg.setAttribute("viewBox", "0 0 110 110");
    svg.setAttribute("width", el.offsetWidth); svg.setAttribute("height", el.offsetHeight);
    const g = (n) => svg.appendChild(markPaths(n));
    const hat = { stroke: INK, strokeWidth: 2.2, roughness: 0.8, fill: HATCH, fillStyle: "hachure", hachureGap: 3.6, fillWeight: 1.1 };
    g(rc.line(55, 8, 55, 22, { stroke: INK, strokeWidth: 2.2, roughness: 0.5, seed: s }));
    g(rc.circle(55, 7, 9, { ...hat, seed: s + 1 }));
    g(rc.rectangle(4, 46, 11, 28, { ...hat, seed: s + 2 }));
    g(rc.rectangle(95, 46, 11, 28, { ...hat, seed: s + 3 }));
    g(rc.path(roundRect(14, 22, 82, 76, 14), { stroke: "#B5B5AF", strokeWidth: 3, roughness: 0.6, seed: s + 4 })).setAttribute("transform", "translate(3,4)");
    g(rc.path(roundRect(14, 22, 82, 76, 14), { ...hat, fill: "#C9C9C4", seed: s + 5 }));
    g(rc.circle(38, 52, 22, { stroke: INK, strokeWidth: 2.2, roughness: 0.6, fill: "#FFFFFF", fillStyle: "solid", seed: s + 6 }));
    g(rc.circle(72, 52, 22, { stroke: INK, strokeWidth: 2.2, roughness: 0.6, fill: "#FFFFFF", fillStyle: "solid", seed: s + 7 }));
    g(rc.circle(40, 53, 6, { stroke: INK, fill: INK, fillStyle: "solid", roughness: 0.3, seed: s + 8 }));
    g(rc.circle(74, 53, 6, { stroke: INK, fill: INK, fillStyle: "solid", roughness: 0.3, seed: s + 9 }));
    g(rc.rectangle(34, 72, 42, 14, { stroke: INK, strokeWidth: 2, roughness: 0.6, fill: "#FFFFFF", fillStyle: "solid", seed: s + 10 }));
    for (let i = 1; i < 5; i++) g(rc.line(34 + i * 8.4, 72, 34 + i * 8.4, 86, { stroke: INK, strokeWidth: 1.4, roughness: 0.3, seed: s + 11 + i }));
    if (el.dataset.stetho !== undefined) {
      // stéthoscope autour du cou
      g(rc.curve([[30, 98], [55, 108], [80, 98]], { stroke: INK, strokeWidth: 2.4, roughness: 0.6, seed: s + 20 }));
      g(rc.circle(82, 104, 10, { stroke: INK, strokeWidth: 2, fill: YELLOW, fillStyle: "solid", roughness: 0.5, seed: s + 21 }));
    }
  }

  function drawBurst(el) {
    const w = el.offsetWidth, h = el.offsetHeight, svg = backdrop(el), rc = rough.svg(svg), s = seed();
    const cx = w * 0.5, cy = h * 0.45, rx = w * 0.5 + 18, ry = h * 0.5 + 16;
    [-150, -120, -90, -60, -30].forEach((a, i) => {
      const r = (a * Math.PI) / 180;
      const x1 = cx + Math.cos(r) * rx, y1 = cy + Math.sin(r) * ry;
      const x2 = cx + Math.cos(r) * (rx + 22), y2 = cy + Math.sin(r) * (ry + 22);
      svg.appendChild(markPaths(rc.line(x1, y1, x2, y2, { stroke: "#E0A800", strokeWidth: 4, roughness: 0.8, seed: s + i })));
    });
  }

  // formes déclaratives dans un <svg viewBox> : <g data-rough="arrow" data-from="x,y" data-to="x,y">
  function drawShape(g) {
    const svg = g.ownerSVGElement, rc = rough.svg(svg), s = seed();
    const d = g.dataset;
    const color = d.color === "yellow" ? YELLOW : d.color || INK;
    const sw = parseFloat(d.width || "4");
    const opts = { stroke: color, strokeWidth: sw, roughness: parseFloat(d.roughness || "1.1"), seed: s };
    if (d.dash) opts.strokeLineDash = d.dash.split(",").map(Number);
    const P = (str) => str.trim().split(/\s+/).map((p) => p.split(",").map(Number));
    const add = (n) => g.appendChild(markPaths(n));
    switch (d.rough) {
      case "arrow": {
        const [a] = P(d.from), [b] = P(d.to), bend = parseFloat(d.bend || "0");
        const mx = (a[0] + b[0]) / 2 - (b[1] - a[1]) * bend, my = (a[1] + b[1]) / 2 + (b[0] - a[0]) * bend;
        add(bend ? rc.curve([a, [mx, my], b], opts) : rc.line(a[0], a[1], b[0], b[1], opts));
        const ang = Math.atan2(b[1] - (bend ? my : a[1]), b[0] - (bend ? mx : a[0]));
        const L = parseFloat(d.head || String(sw * 5 + 8));
        const h1 = [b[0] - L * Math.cos(ang - 0.45), b[1] - L * Math.sin(ang - 0.45)];
        const h2 = [b[0] - L * Math.cos(ang + 0.45), b[1] - L * Math.sin(ang + 0.45)];
        add(rc.linearPath([h1, b, h2], { ...opts, seed: s + 1 }));
        break;
      }
      case "ellipse": add(rc.ellipse(+d.cx, +d.cy, +d.w, +d.h, opts)); break;
      case "line": add(rc.linearPath(P(d.points), opts)); break;
      case "curve": add(rc.curve(P(d.points), opts)); break;
      case "rect": add(rc.rectangle(+d.x, +d.y, +d.w, +d.h, opts)); break;
      case "area": {
        const fill = d.fill === "yellow" ? YELLOW : d.fill || YELLOW;
        add(rc.polygon(P(d.points), { ...opts, stroke: d.stroke || "none", fill, fillStyle: d.fillStyle || "hachure", hachureGap: parseFloat(d.gap || "10"), fillWeight: parseFloat(d.fillWeight || "3"), hachureAngle: -40 }));
        break;
      }
      default: throw new Error(`data-rough="${d.rough}" inconnu`);
    }
  }

  /* ======================= init ======================= */
  const S = { items: [], marks: [], keys: [], tm: null, duration: 0, ready: false };
  SV.state = S;

  function boxOf(el, poster) {
    const pr = poster.getBoundingClientRect(), r = el.getBoundingClientRect();
    return { x: r.left - pr.left, y: r.top - pr.top, w: r.width, h: r.height, cx: r.left - pr.left + r.width / 2, cy: r.top - pr.top + r.height / 2 };
  }

  const DUR = { fade: 0.5, pop: 0.45, slide: 0.5, wipe: 0.7, draw: 0.8, count: 1.0, write: null };
  const MARKDUR = { hl: 0.45, circle: 0.6, underline: 0.4, strike: 0.35 };

  function prepWrite(it) {
    const el = it.el;
    if (el.children.length) { it.anim = "wipe"; it.dur = DUR.wipe; return; }
    it.full = Array.from(el.textContent);
    el.textContent = "";
    it.a = document.createElement("span");
    it.b = document.createElement("span");
    it.b.style.color = "transparent";
    it.b.textContent = it.full.join(""); // garde la taille réelle pour les mesures (caméra, marques)
    el.append(it.a, it.b);
    if (!it.durSet) it.dur = clamp(it.full.length * 0.045, 0.35, 1.6);
  }

  async function init() {
    const errBox = (msg) => {
      SV.error = msg;
      const d = document.createElement("div");
      d.style.cssText = "position:fixed;left:0;right:0;top:0;padding:16px;background:#b00020;color:#fff;font:16px system-ui;z-index:9999;white-space:pre-wrap";
      d.textContent = "Erreur : " + msg;
      document.body.appendChild(d);
      console.error(msg);
    };
    try {
      if (RENDER) document.body.classList.add("render");
      const stage = document.getElementById("stage"), poster = document.getElementById("poster");
      // polices + images
      await Promise.all(["700 40px Kalam", "400 40px Kalam", "40px Lalezar", "400 40px 'Plex Arabic'", "600 40px 'Plex Arabic'"].map((f) => document.fonts.load(f, "abc ابت")));
      await document.fonts.ready;
      await Promise.all([...document.images].map((im) => (im.complete ? Promise.resolve() : new Promise((r) => { im.onload = im.onerror = r; }))));
      stage.style.transform = "none"; poster.style.transform = "none";

      const tm = (S.tm = buildTimings());
      tm.warnings.forEach((w) => console.warn(w));

      // calque d'encre pour les marques (cercles, ratures…)
      let ink = document.getElementById("ink");
      if (!ink) { ink = svgEl("svg", { id: "ink", viewBox: `0 0 ${W} ${H}` }); poster.appendChild(ink); }

      // éléments "pop" en ligne -> inline-block (les transforms ne s'appliquent pas aux inline)
      document.querySelectorAll('[data-anim~="pop"],[data-anim~="slide"]').forEach((el) => { if (getComputedStyle(el).display === "inline") el.style.display = "inline-block"; });

      // décors rough.js
      document.querySelectorAll(".card, .bubble").forEach(drawCard);
      document.querySelectorAll(".ribbon").forEach(drawRibbon);
      document.querySelectorAll(".robot").forEach(drawRobot);
      document.querySelectorAll(".burst").forEach(drawBurst);
      document.querySelectorAll("[data-rough]").forEach(drawShape);

      // apparitions
      let prevT = 0;
      document.querySelectorAll("[data-at]").forEach((el) => {
        const anim = el.dataset.anim || (el instanceof SVGElement ? "draw" : "fade");
        const t = parseCue(el.dataset.at, prevT, tm);
        prevT = t;
        const it = { el, t, anim, dur: el.dataset.dur ? parseFloat(el.dataset.dur) : DUR[anim], durSet: !!el.dataset.dur };
        if (anim === "write") prepWrite(it);
        if (anim === "count") { it.to = parseFloat(el.dataset.to || el.textContent.replace(/[^\d.]/g, "")); it.dec = parseInt(el.dataset.decimals || "0"); }
        if (it.dur == null) it.dur = 0.5;
        S.items.push(it);
      });

      // marques
      const mk = (el, type) => {
        const t = parseCue(el.dataset[type], 0, tm);
        const m = { el, type, t, dur: MARKDUR[type] };
        if (type === "hl") { el.classList.add("hl"); }
        else {
          const b = boxOf(el, poster), rc = rough.svg(ink), s = seed(), color = el.dataset.markColor || INK;
          let g;
          if (type === "circle") g = rc.ellipse(b.cx, b.cy, b.w * 1.1 + 34, b.h * 1.25 + 18, { stroke: color, strokeWidth: 3.2, roughness: 1.5, seed: s });
          if (type === "underline") g = rc.curve([[b.x - 4, b.y + b.h + 2], [b.cx, b.y + b.h + 7], [b.x + b.w + 4, b.y + b.h + 1]], { stroke: el.dataset.markColor || "#B5B5AF", strokeWidth: 7, roughness: 0.9, seed: s });
          if (type === "strike") g = rc.line(b.x - 8, b.cy + 2, b.x + b.w + 8, b.cy - 1, { stroke: color, strokeWidth: 3.6, roughness: 1.2, seed: s });
          ink.appendChild(markPaths(g));
          m.g = g;
        }
        S.marks.push(m);
      };
      for (const type of ["hl", "circle", "underline", "strike"])
        document.querySelectorAll(`[data-${type}]`).forEach((el) => mk(el, type));

      // caméra
      buildCamera(poster, tm);

      // sous-titres
      const capWrap = document.getElementById("captions") || stage.appendChild(Object.assign(document.createElement("div"), { id: "captions" }));
      S.cap = document.createElement("div");
      S.cap.className = "cap";
      S.cap.dir = "auto";
      capWrap.appendChild(S.cap);
      const cfg = config();
      capWrap.style.bottom = cfg.captionBottom + "px";
      capWrap.style.paddingRight = (cfg.capSafeRight != null ? cfg.capSafeRight : cfg.safeRight) + "px";
      if (/[?&]safe\b/.test(location.search)) showSafeZones(stage, cfg);

      S.stage = stage; S.poster = poster;
      SV.cue = (str) => parseCue(str, 0, tm);
      SV.hooks = SV.hooks || [];
      if (typeof window.SV_BUILD === "function") await window.SV_BUILD(SV);
      SV.duration = S.duration;
      fitStage();
      SV.seek(0);
      S.ready = SV.ready = true;
      if (!RENDER) setupPlayer();
    } catch (e) {
      errBox(e.message || String(e));
    }
  }

  // calque de contrôle (?safe) : zones cachées par l'interface de la plateforme
  function showSafeZones(stage, cfg) {
    const z = (css, label) => {
      const d = document.createElement("div");
      d.style.cssText = `position:absolute;z-index:500;background:rgba(220,40,60,.22);border:2px dashed rgba(200,30,50,.8);color:#a01;font:600 22px system-ui;display:flex;align-items:center;justify-content:center;${css}`;
      d.textContent = label;
      stage.appendChild(d);
    };
    z(`left:0;right:0;top:0;height:${cfg.topReserve - 40}px`, "en-tête plateforme");
    z(`left:0;right:0;bottom:0;height:${cfg.captionBottom - 50}px`, "pseudo · légende · musique");
    if (cfg.safeRight) z(`right:0;width:${cfg.safeRight}px;top:${H * 0.5}px;bottom:${cfg.captionBottom - 50}px`, "");
  }

  /* ======================= caméra ======================= */
  // Préréglages de plateforme : zones couvertes par l'interface (px sur 1080x1920)
  const PRESETS = {
    default: { captionBottom: 270, captionReserve: 470, topReserve: 90, safeRight: 0 },
    // Reels : en-tête en haut, pseudo + légende + musique en bas, boutons j'aime/partage à droite
    // mesuré sur un Reel publié (iPhone) : ~50 px rognés de chaque côté, boutons x>915 (y 980-1650), pseudo/légende y>1650
    instagram: { captionBottom: 320, captionReserve: 640, topReserve: 250, safeRight: 165 },
  };
  function config() {
    const cfg = window.SV_CONFIG || {};
    return Object.assign({}, PRESETS[cfg.preset] || PRESETS.default, cfg);
  }

  function buildCamera(poster, tm) {
    const cfg = config();
    if (cfg.mode === "scenes") {
      // les scènes gèrent leur propre caméra (serie/lib/stage.js) : poster fixe
      const id = { s: 1, cx: W / 2, cy: H / 2 };
      S.keys = [{ a: -1, d: 0.001, to: id, from: id }];
      S.outroA = Infinity;
      const last = tm.beats[tm.beats.length - 1];
      S.duration = Math.max((last ? last.end : 0) + (cfg.hold != null ? cfg.hold : 2.5), tm.audioDuration);
      return;
    }
    const capReserve = cfg.captionReserve, topReserve = cfg.topReserve;
    const maxZoom = cfg.maxZoom || 1.85;
    const events = [];
    const focusOf = (el) => (el.closest && el.closest("[data-focus]")) || el;
    for (const it of S.items) if (it.el.dataset.cam !== "none") events.push({ t: it.t, el: it.el });
    for (const m of S.marks) if (m.el.dataset.cam !== "none") events.push({ t: m.t, el: m.el, soft: true });
    events.sort((a, b) => a.t - b.t);

    const desired = (ev) => {
      const F = focusOf(ev.el), fb = boxOf(F, poster), eb = boxOf(ev.el, poster);
      const z = parseFloat(ev.el.dataset.zoom || F.dataset.zoom || "0");
      const s = z || clamp(W / (fb.w + 120), 1, maxZoom);
      const vw = W / s, vh = H / s, top = topReserve / s, bot = capReserve / s, avail = vh - top - bot;
      let cy;
      if (fb.h <= avail) cy = fb.cy + vh / 2 - top - avail / 2;
      else {
        let bandTop = eb.cy - avail * 0.4;
        bandTop = clamp(bandTop, fb.y - 20, fb.y + fb.h - avail + 20);
        cy = bandTop - top + vh / 2;
      }
      let cx = fb.cx;
      if (fb.w > vw) cx = clamp(eb.cx, fb.x + vw / 2 - 20, fb.x + fb.w - vw / 2 + 20);
      cx += cfg.safeRight / 2 / s; // centre le contenu dans la partie libre de l'écran (hors boutons à droite)
      cx = vw >= W ? W / 2 : clamp(cx, vw / 2 - 30, W - vw / 2 + 30);
      cy = clamp(cy, vh / 2 - 80, H - vh / 2 + capReserve / s);
      return { s, cx, cy, focus: F, eb };
    };
    const inside = (cam, eb) => {
      const vw = W / cam.s, vh = H / cam.s;
      const x0 = cam.cx - vw / 2, y0 = cam.cy - vh / 2;
      return eb.x >= x0 + 10 && eb.x + eb.w <= x0 + vw - 10 - cfg.safeRight / cam.s && eb.y >= y0 + topReserve / cam.s && eb.y + eb.h <= y0 + vh - capReserve / cam.s;
    };

    const keys = [];
    let cur = null, curFocus = null;
    for (const ev of events) {
      const d = desired(ev);
      if (!cur) { cur = d; curFocus = d.focus; keys.push({ a: -1, d: 0.001, to: d }); continue; }
      const sameFocus = d.focus === curFocus;
      if (inside(cur, d.eb) && (ev.soft || (sameFocus && Math.abs(d.s - cur.s) / cur.s < 0.12))) continue;
      if (ev.soft && sameFocus) continue;
      const dist = Math.hypot((d.cx - cur.cx) * d.s, (d.cy - cur.cy) * d.s) + Math.abs(Math.log(d.s / cur.s)) * 900;
      const dur = clamp(0.55 + dist / 2600, 0.6, 1.3);
      const prevA = keys[keys.length - 1].a;
      keys.push({ a: Math.max(ev.t - 0.35, prevA + 0.05), d: dur, to: d });
      cur = d; curFocus = d.focus;
    }
    // dézoom final : tout le poster
    const beats = tm.beats;
    const last = beats[beats.length - 1];
    const outroA = cfg.outroAt ? parseCue(cfg.outroAt, 0, tm) : (last ? last.start + 0.3 : 1);
    const outroD = cfg.outroDur || 1.8;
    keys.push({ a: Math.max(outroA, keys[keys.length - 1].a + 0.1), d: outroD, to: { s: 1, cx: W / 2, cy: H / 2 } });
    // états de départ de chaque segment
    keys[0].from = keys[0].to;
    for (let i = 1; i < keys.length; i++) keys[i].from = evalKey(keys[i - 1], keys[i].a);
    S.keys = keys;
    S.outroA = outroA;
    const endT = outroA + outroD + (cfg.hold != null ? cfg.hold : 1.6);
    S.capEnd = Math.max(last ? last.end + 0.25 : 0, 0);
    S.duration = Math.max(endT, tm.audioDuration);
  }
  function evalKey(k, t) {
    const p = E.inOut(prog(t, k.a, k.d));
    const ls = Math.log(k.from.s) + (Math.log(k.to.s) - Math.log(k.from.s)) * p;
    return { s: Math.exp(ls), cx: k.from.cx + (k.to.cx - k.from.cx) * p, cy: k.from.cy + (k.to.cy - k.from.cy) * p };
  }
  function camAt(t) {
    const keys = S.keys;
    let k = keys[0];
    for (let i = 1; i < keys.length && keys[i].a <= t; i++) k = keys[i];
    return evalKey(k, t);
  }

  /* Dans une phrase arabe, isole chaque passage latin (allemand) pour que sa ponctuation
     reste du bon côté : "ويقولو ليك: Was sehen Sie?" et non "?Was sehen Sie". */
  const LAT = "A-Za-zÀ-ÖØ-öø-ÿĀ-ž0-9";
  // le point final reste hors de l'îlot latin (fin de la phrase arabe) ; « ? » et « ! » restent avec l'allemand
  const LATIN_RUN = new RegExp(`[${LAT}][${LAT} .\\-–·/]*[${LAT}][?!]*|[${LAT}][?!]*`, "g");
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  /* Glossaire optionnel (window.GLOSSARY = { "Spritze": "حقنة", … }) : chaque mot allemand des sous-titres
     reçoit sa traduction arabe en petit (ruby), et une phrase entièrement allemande sa traduction en dessous. */
  // en allemand la majuscule compte (« Spritzen » = des seringues, « spritzen » = injecter) :
  // on cherche d'abord la forme exacte, puis sans tenir compte de la casse
  const normKey = (t) => t.replace(/[„“"«».,;:!?()]/g, "").replace(/\s+/g, " ").trim();
  let GL = null, GLi = null;
  function gloss(term) {
    if (!window.GLOSSARY) return null;
    if (!GL) {
      GL = {}; GLi = {};
      for (const k in window.GLOSSARY) { GL[normKey(k)] = window.GLOSSARY[k]; GLi[normKey(k).toLowerCase()] ??= window.GLOSSARY[k]; }
    }
    const k = normKey(term);
    return GL[k] || GLi[k.toLowerCase()] || null;
  }
  const ruby = (t, g) => g ? `<ruby>${esc(t)}<rt>${esc(g)}</rt></ruby>` : esc(t);
  function glossRun(run) {
    const whole = gloss(run);
    if (whole) return ruby(run, whole);
    // sinon mot par mot (en gardant les groupes de 2 mots connus, ex. « fahrlässige Tötung »)
    const ws = run.split(/(\s+)/);
    let out = "";
    for (let i = 0; i < ws.length; i++) {
      if (/^\s+$/.test(ws[i])) { out += ws[i]; continue; }
      const two = i + 2 < ws.length ? ws[i] + " " + ws[i + 2] : null;
      if (two && gloss(two)) { out += ruby(two, gloss(two)); i += 2; continue; }
      out += ruby(ws[i], gloss(ws[i]));
    }
    return out;
  }
  function bidiHTML(text) {
    if (!/[؀-ۿ]/.test(text)) {
      const tr = gloss(text);
      return `<span dir="ltr" style="unicode-bidi:isolate">${esc(text)}</span>` + (tr ? `<span class="cap-tr" dir="rtl">${esc(tr)}</span>` : "");
    }
    let out = "", last = 0;
    for (const m of text.matchAll(LATIN_RUN)) {
      out += esc(text.slice(last, m.index)) + `<span dir="ltr" style="unicode-bidi:isolate">${glossRun(m[0])}</span>`;
      last = m.index + m[0].length;
    }
    return out + esc(text.slice(last));
  }
  SV.bidiHTML = bidiHTML;

  /* Sous-titres « karaoké » (SV_CONFIG.captions = "karaoke") : la phrase est coupée en pages courtes,
     chaque mot surgit quand il est prononcé, le mot en cours est surligné en jaune. */
  const LATSEG = new RegExp(`[${LAT}][${LAT}\\-'’]*[?!]*`, "g");
  function capPages(b) {
    if (b._pages) return b._pages;
    const toks = (b.cap || b.text).split(/\s+/).filter(Boolean), W = b.words || [];
    if (W.length !== toks.length) return (b._pages = null);
    const pages = []; let cur = [], len = 0;
    toks.forEach((tk, i) => {
      cur.push(i); len += tk.length + 1;
      const brk = /[،,.:؛?؟!]$/.test(tk), nx = toks[i + 1] || "";
      const isLat = (x) => x && !/[؀-ۿ]/.test(x);
      const glue = (isLat(tk) && isLat(nx) && !brk) || /^(La|Le|Les|der|die|das|Da|في|من|ديال|الـ)$/.test(tk);
      const C = config(), MAXC = C.capChars || 30, MAXW = C.capWords || 6;
      if (!glue && ((len >= MAXC * 0.72 && brk) || len >= MAXC || cur.length >= MAXW)) { pages.push(cur); cur = []; len = 0; }
    });
    if (cur.length) { if (cur.length === 1 && pages.length && toks[cur[0]].length < 5) pages[pages.length - 1].push(...cur); else pages.push(cur); }
    return (b._pages = pages.map((ix) => ({ ix, toks, start: W[ix[0]][0], end: W[ix[ix.length - 1]][1] })));
  }
  function tokHTML(tk, i, j) {
    const g2 = j != null ? null : null;
    if (!/[؀-ۿ]/.test(tk) || !new RegExp(`[${LAT}]`).test(tk)) {
      if (!new RegExp(`[${LAT}]`).test(tk)) return `<span class="w" data-i="${i}">${esc(tk)}</span>`;
    }
    let out = "", last = 0;
    for (const m of tk.matchAll(LATSEG)) {
      out += esc(tk.slice(last, m.index));
      const core = m[0].replace(/[?!]+$/, ""), g = gloss(core), tail = m[0].slice(core.length);
      out += `<span class="lat" dir="ltr">${ruby(core, g)}${esc(tail)}</span>`;
      last = m.index + m[0].length;
    }
    out += esc(tk.slice(last));
    return `<span class="w" data-i="${i}">${out}</span>`;
  }
  function pageHTML(pg, b) {
    const toks = pg.toks, arabic = /[؀-ۿ]/.test(toks.join(" "));
    const body = pg.ix.map((i) => tokHTML(toks[i], i)).join(" ");
    let tr = "";
    if (!arabic && config().capTr !== false) { const g = gloss((b.cap || b.text)); if (g) tr = `<span class="cap-tr" dir="rtl">${esc(g)}</span>`; }
    return `<div class="kline" dir="${arabic ? "rtl" : "ltr"}">${body}</div>${tr}`;
  }
  function karaoke(t, cur) {
    const pages = capPages(cur);
    if (!pages) return false;
    let k = 0;
    for (let i = 0; i < pages.length; i++) if (t >= pages[i].start - 0.08) k = i;
    const pg = pages[k], key = cur.id + ":" + k;
    if (S.capKey !== key) {
      S.capKey = key; S.capText = null;
      S.cap.innerHTML = pageHTML(pg, cur);
      S.capSpans = [...S.cap.querySelectorAll(".w")].map((el) => ({ el, i: +el.dataset.i }));
      S.cap.style.rotate = ((k + cur.id.length) % 2 ? 1 : -1) * 0.8 + "deg";
    }
    const W = cur.words;
    const pin = prog(t, pg.start - 0.08, 0.16);
    S.cap.style.opacity = clamp(pin * 2, 0, 1);
    S.cap.style.scale = String(0.86 + 0.14 * E.back(pin));
    for (const { el, i } of S.capSpans) {
      const [ws, we] = W[i], p = prog(t, ws - 0.04, 0.22);
      // mot pas encore dit : en filigrane ; dit : surgit (petit rebond) puis reste à l'encre
      el.style.opacity = (0.22 + 0.78 * clamp(p * 2.5, 0, 1)).toFixed(3);
      el.style.translate = `0 ${(p > 0 && p < 1 ? -Math.sin(p * Math.PI) * 12 : 0).toFixed(1)}px`;
      el.style.scale = String(p > 0 && p < 1 ? 1 + 0.16 * Math.sin(p * Math.PI) : 1);
      const nx = W[i + 1] ? W[i + 1][0] - 0.03 : we + 0.25;
      el.classList.toggle("on", t >= ws - 0.03 && t < Math.min(we + 0.12, nx));
    }
    return true;
  }

  /* ======================= seek ======================= */
  function setDash(root, p) {
    root.querySelectorAll("path").forEach((path) => {
      if (path.dataset.fill) path.style.opacity = clamp(p * 2 - 0.6, 0, 1);
      else { path.style.strokeDasharray = "1 1"; path.style.strokeDashoffset = String(1 - p); }
    });
  }

  function applyItem(it, t) {
    const el = it.el, on = t >= it.t, p = prog(t, it.t, it.dur);
    switch (it.anim) {
      case "fade": el.style.opacity = E.out(p); break;
      case "pop": el.style.opacity = clamp(p * 2.5, 0, 1); el.style.scale = String(0.7 + 0.3 * E.back(p)); break;
      case "slide": el.style.opacity = E.out(p); el.style.translate = `0 ${(1 - E.out(p)) * 34}px`; break;
      case "write": {
        el.style.opacity = on ? 1 : 0;
        const n = Math.round(p * it.full.length);
        it.a.textContent = it.full.slice(0, n).join("");
        it.b.textContent = it.full.slice(n).join("");
        break;
      }
      case "wipe": {
        el.style.opacity = on ? 1 : 0;
        const rtl = getComputedStyle(el).direction === "rtl", r = (1 - E.out(p)) * 100;
        el.style.clipPath = p >= 1 ? "none" : rtl ? `inset(-20% 0 -20% ${r}%)` : `inset(-20% ${r}% -20% 0)`;
        break;
      }
      case "draw": {
        el.style.opacity = on ? 1 : 0;
        const bg = el.matches("svg, g, path") ? el : el.querySelector(":scope > svg.rough-bg");
        if (bg) setDash(bg, E.inOut(p));
        if (!(el instanceof SVGElement)) for (const c of el.children) if (c !== bg) c.style.opacity = clamp(p * 1.6 - 0.4, 0, 1);
        break;
      }
      case "count": {
        el.style.opacity = clamp(p * 4, 0, 1);
        const v = it.to * E.out(p);
        el.textContent = (el.dataset.prefix || "") + v.toLocaleString("en-US", { minimumFractionDigits: it.dec, maximumFractionDigits: it.dec }) + (el.dataset.suffix || "");
        break;
      }
      default: el.style.opacity = on ? 1 : 0;
    }
  }

  function applyMark(m, t) {
    const p = prog(t, m.t, m.dur);
    if (m.type === "hl") m.el.style.backgroundSize = `${E.out(p) * 100}% 62%`;
    else { m.g.style.opacity = p > 0 ? 1 : 0; setDash(m.g, E.out(p)); }
  }

  SV.seek = function (t) {
    if (!S.keys.length) return;
    S.t = t;
    for (const it of S.items) applyItem(it, t);
    for (const m of S.marks) applyMark(m, t);
    const c = camAt(t);
    S.poster.style.transform = `translate(${W / 2 - c.cx * c.s}px, ${H / 2 - c.cy * c.s}px) scale(${c.s})`;
    // sous-titres
    const beats = S.tm.beats;
    let cur = null;
    for (let i = 0; i < beats.length; i++) {
      const b = beats[i], next = beats[i + 1];
      const end = next ? Math.min(next.start, b.end + 0.6) : b.end + 0.25;
      if (t >= b.start && t < end) { cur = b; break; }
    }
    if (cur && config().captions === "karaoke" && karaoke(t, cur)) {
      /* rendu karaoké fait */
    } else if (cur) {
      S.capKey = null;
      const txt = cur.cap || cur.text;
      if (S.capText !== txt) { S.capText = txt; S.cap.innerHTML = bidiHTML(txt); }
      const p = prog(t, cur.start, 0.15);
      S.cap.style.opacity = p;
      S.cap.style.translate = `0 ${(1 - p) * 8}px`;
    } else S.cap.style.opacity = 0;
    for (const f of SV.hooks || []) f(t);
    if (S.onTime) S.onTime(t, cur);
  };

  /* ======================= prévisualisation ======================= */
  function fitStage() {
    if (RENDER) return;
    const f = Math.min(innerWidth / W, (innerHeight - 52) / H);
    S.stage.style.transform = `scale(${f})`;
    S.stage.style.left = `${(innerWidth - W * f) / 2}px`;
  }
  function setupPlayer() {
    addEventListener("resize", fitStage);
    const bar = document.createElement("div");
    bar.id = "controls";
    bar.innerHTML = `<button id="pp">▶ Lecture</button><input id="sl" type="range" min="0" step="0.01"><span id="tl"></span><span id="bl" style="opacity:.75;max-width:30%;overflow:hidden;white-space:nowrap"></span>`;
    document.body.appendChild(bar);
    const pp = bar.querySelector("#pp"), sl = bar.querySelector("#sl"), tl = bar.querySelector("#tl"), bl = bar.querySelector("#bl");
    sl.max = S.duration;
    const audio = S.tm.audio ? new Audio(S.tm.audio) : null;
    let playing = false, t = 0, last = 0;
    S.onTime = (tt, beat) => { sl.value = tt; tl.textContent = `${tt.toFixed(1)} / ${S.duration.toFixed(1)} s`; bl.textContent = beat ? beat.id + " · " + beat.text : ""; };
    const loop = (now) => {
      if (!playing) return;
      if (audio && !audio.paused && audio.currentTime < (audio.duration || 1e9) - 0.01) t = audio.currentTime;
      else t += (now - last) / 1000;
      last = now;
      if (t >= S.duration) { t = S.duration; toggle(false); }
      SV.seek(t);
      requestAnimationFrame(loop);
    };
    const toggle = (on) => {
      playing = on;
      pp.textContent = on ? "❚❚ Pause" : "▶ Lecture";
      if (on) {
        if (t >= S.duration) t = 0;
        if (audio) { audio.currentTime = t; audio.play().catch(() => {}); }
        last = performance.now();
        requestAnimationFrame(loop);
      } else if (audio) audio.pause();
    };
    pp.onclick = () => toggle(!playing);
    sl.oninput = () => { t = parseFloat(sl.value); if (audio) audio.currentTime = t; SV.seek(t); };
    addEventListener("keydown", (e) => {
      if (e.code === "Space") { e.preventDefault(); toggle(!playing); }
      if (e.code === "ArrowRight" || e.code === "ArrowLeft") { t = clamp(t + (e.code === "ArrowRight" ? 2 : -2), 0, S.duration); if (audio) audio.currentTime = t; SV.seek(t); }
    });
    SV.seek(0);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
