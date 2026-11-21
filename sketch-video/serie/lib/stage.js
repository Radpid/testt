/* Stage — animation par scènes pour la série AKTE (au-dessus du moteur sketch-video).
 *
 * Le moteur (engine/runtime.js, SV_CONFIG.mode = "scenes") gère le minutage des mots, les sous-titres,
 * l'audio et le rendu MP4. Stage gère tout ce qu'on voit : scènes plein écran, transitions, caméra
 * (zooms, travellings, secousses), personnages Open Peeps animés, objets (props.js) animés, textes.
 *
 * Déterministe : Stage.update(t) met l'image exactement dans l'état du temps t (aucun état caché).
 *
 *   window.SV_BUILD = (sv) => {
 *     const st = Stage.create(sv);
 *     st.scene({ from: "b1", in: "fade", build(c) { … c.put(Props.syringe(), 100, 700) … } });
 *     st.finish();
 *   };
 */
(function (global) {
  "use strict";
  const NS = "http://www.w3.org/2000/svg", W = 1080, H = 1920;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, p) => a + (b - a) * p;
  const E = {
    lin: (t) => t,
    out: (t) => 1 - Math.pow(1 - t, 3),
    in: (t) => t * t * t,
    inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    back: (t) => { const c1 = 1.7, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
    elastic: (t) => (t === 0 || t === 1 ? t : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1),
  };
  const prog = (t, a, d) => (d <= 0 ? (t >= a ? 1 : 0) : clamp((t - a) / d, 0, 1));
  // bruit déterministe
  const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

  function el(tag, attrs, parent) {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs || {}) if (attrs[k] != null) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  /* ------------------------------------------------------------------ */
  /* Nœud animable : un <g> enveloppe dont on compose la transformation */
  class Node {
    constructor(scene, parent, inner) {
      this.scene = scene;
      this.g = el("g", {}, parent);
      if (inner) this.g.appendChild(inner);
      this.tw = [];
      this.visibleFrom = -Infinity;
      scene.nodes.push(this);
    }
    pivot() {
      if (!this._pv) {
        // getBBox ne mesure rien sous display:none : on affiche le temps de la mesure
        const lay = this.scene.layer, d1 = lay.style.display, d2 = this.g.style.display;
        lay.style.display = ""; this.g.style.display = "";
        const b = this.g.getBBox();
        lay.style.display = d1; this.g.style.display = d2;
        this._pv = [b.x + b.width / 2, b.y + b.height / 2];
        this._bb = b;
      }
      return this._pv;
    }
    bbox() { this.pivot(); return this._bb; }
    add(fn) { this.tw.push(fn); return this; }
    apply(t) {
      const st = { x: 0, y: 0, s: 1, sx: 1, sy: 1, r: 0, o: 1, clip: null, px: null, py: null };
      for (const f of this.tw) f(t, st);
      const [px, py] = st.px != null ? [st.px, st.py] : (st.s !== 1 || st.r || st.sx !== 1 || st.sy !== 1 ? this.pivot() : [0, 0]);
      const tr = `translate(${(st.x + px).toFixed(2)} ${(st.y + py).toFixed(2)}) rotate(${st.r.toFixed(3)}) scale(${(st.s * st.sx).toFixed(4)} ${(st.s * st.sy).toFixed(4)}) translate(${-px} ${-py})`;
      if (tr !== this._tr) { this.g.setAttribute("transform", tr); this._tr = tr; }
      const o = clamp(st.o, 0, 1);
      if (o !== this._o) { this.g.style.opacity = o; this.g.style.display = o <= 0.001 ? "none" : ""; this._o = o; }
      if (st.clip !== this._clip) { this.g.style.clipPath = st.clip || ""; this._clip = st.clip; }
    }
    // --- animations (at = cue ou secondes) ---
    _t(at) { return this.scene.stage.T(at); }
    show(at) { const a = this._t(at); return this.add((t, s) => { s.o *= t >= a ? 1 : 0; }); }
    fade(at, dur = 0.45) { const a = this._t(at); return this.add((t, s) => { s.o *= E.out(prog(t, a, dur)); }); }
    hide(at, dur = 0.35) { const a = this._t(at); return this.add((t, s) => { s.o *= 1 - E.out(prog(t, a, dur)); }); }
    pop(at, dur = 0.5, from = 0.4) {
      const a = this._t(at);
      return this.add((t, s) => { const p = prog(t, a, dur); s.o *= clamp(p * 3, 0, 1); s.s *= from + (1 - from) * E.back(p); });
    }
    slide(at, dx, dy, dur = 0.6, ease = "out") {
      const a = this._t(at);
      return this.add((t, s) => { const p = E[ease](prog(t, a, dur)); s.x += dx * (1 - p); s.y += dy * (1 - p); s.o *= clamp(prog(t, a, dur) * 4, 0, 1); });
    }
    move(at, dx, dy, dur = 0.8, ease = "inOut") {
      // déplacement définitif (s'ajoute après)
      const a = this._t(at);
      return this.add((t, s) => { const p = E[ease](prog(t, a, dur)); s.x += dx * p; s.y += dy * p; });
    }
    scaleTo(at, k, dur = 0.8, ease = "inOut") {
      const a = this._t(at);
      return this.add((t, s) => { s.s *= lerp(1, k, E[ease](prog(t, a, dur))); });
    }
    rotateTo(at, deg, dur = 0.6, ease = "inOut") {
      const a = this._t(at);
      return this.add((t, s) => { s.r += deg * E[ease](prog(t, a, dur)); });
    }
    slam(at, dur = 0.32, shake = 14) {
      // tampon : arrive en grand et frappe
      const a = this._t(at);
      if (shake) this.scene.shake(a + dur * 0.9, shake, 0.45);
      return this.add((t, s) => {
        const p = prog(t, a, dur);
        s.o *= t >= a ? clamp(p * 4, 0, 1) : 0;
        s.s *= p < 1 ? lerp(2.6, 1, E.in(p)) : 1 + 0.06 * Math.exp(-(t - a - dur) * 9) * Math.sin((t - a - dur) * 30);
      });
    }
    pulse(at, dur = 0.6, amp = 0.12, times = 1) {
      const a = this._t(at);
      return this.add((t, s) => { const p = prog(t, a, dur); if (p > 0 && p < 1) s.s *= 1 + amp * Math.sin(p * Math.PI * times) ** 2; });
    }
    wipe(at, dur = 0.6, dir = "ltr") {
      const a = this._t(at);
      return this.add((t, s) => {
        const p = E.out(prog(t, a, dur)), r = ((1 - p) * 100).toFixed(2);
        s.o *= t >= a ? 1 : 0;
        if (p < 1) s.clip = dir === "rtl" ? `inset(-10% 0 -10% ${r}%)` : dir === "down" ? `inset(0 -10% ${r}% -10%)` : `inset(-10% ${r}% -10% 0)`;
      });
    }
    float(amp = 6, period = 3.2, phase = 0) {
      return this.add((t, s) => { s.y += amp * Math.sin((t / period) * 2 * Math.PI + phase); });
    }
    wobble(at, dur = 0.5, deg = 6) {
      const a = this._t(at);
      return this.add((t, s) => { const p = prog(t, a, dur); if (p > 0 && p < 1) s.r += deg * Math.sin(p * Math.PI * 4) * (1 - p); });
    }
    on(fn) { return this.add(fn); }
  }

  /* ------------------------------------------------------------------ */
  /* Personnage Open Peeps animé                                         */
  class Actor extends Node {
    constructor(scene, parent, o) {
      super(scene, parent);
      this.o = Object.assign({ scale: 0.21, flip: false, face: o.cls === "sil" ? null : "Calm", hair: "Short" }, o);
      this.body = el("g", {}, this.g);
      if (o.cls) this.body.setAttribute("class", o.cls);
      this.body.innerHTML = Peeps.markup(this.o);
      this.faceG = this.body.querySelector(".peep-face");
      this.box = Peeps.bodyBox(this.o.body);
      this.moves = []; this.faces = []; this.flips = []; this.talks = []; this.bodies = [];
      this.blinkSeed = (o.seed || 1) * 13.37;
      this.curFace = this.o.face;
      this.add((t, s) => this._update(t, s));
    }
    walk(at, toX, dur = 1.4, toY) { this.moves.push({ a: this.scene.stage.T(at), d: dur, x: toX, y: toY, walk: true }); return this; }
    slideTo(at, toX, dur = 0.8, toY) { this.moves.push({ a: this.scene.stage.T(at), d: dur, x: toX, y: toY }); return this; }
    face(at, name) { this.faces.push({ a: this.scene.stage.T(at), f: name }); this.faces.sort((p, q) => p.a - q.a); return this; }
    turn(at, flip) { this.flips.push({ a: this.scene.stage.T(at), f: flip }); this.flips.sort((p, q) => p.a - q.a); return this; }
    talk(from, to, mouth = "Explaining") { this.talks.push({ a: this.scene.stage.T(from), b: this.scene.stage.T(to), m: mouth }); return this; }
    setBody(at, name) { this.bodies.push({ a: this.scene.stage.T(at), b: name }); this.bodies.sort((p, q) => p.a - q.a); return this; }
    _pos(t) {
      let x = this.o.x, y = this.o.y, walking = 0;
      for (const m of this.moves) {
        const p = prog(t, m.a, m.d);
        if (p <= 0) break;
        const fx = x, fy = y;
        const e = m.walk ? p : E.inOut(p);
        x = lerp(fx, m.x, e); if (m.y != null) y = lerp(fy, m.y, e);
        if (m.walk && p > 0 && p < 1) walking = (t - m.a);
      }
      return { x, y, walking };
    }
    _update(t, s) {
      // corps (pose) éventuellement changé
      let bodyName = this.o.body;
      for (const b of this.bodies) if (t >= b.a) bodyName = b.b;
      if (bodyName !== this._body) {
        this._body = bodyName;
        this.body.innerHTML = Peeps.markup(Object.assign({}, this.o, { body: bodyName, face: this.curFace }));
        this.faceG = this.body.querySelector(".peep-face");
        this.box = Peeps.bodyBox(bodyName);
        this._face = null;
      }
      // visage : expression du moment, parole, clignement
      let f = this.o.face;
      if (!f || f === "none") f = null;   // silhouettes : pas de visage
      for (const x of this.faces) if (t >= x.a) f = x.f;
      if (!f) { if (this._face !== null) { this.faceG.innerHTML = ""; this._face = null; } }
      for (const k of this.talks) if (t >= k.a && t < k.b) { const ph = Math.floor((t - k.a) / 0.13); if (hash(ph + this.blinkSeed) > 0.45) f = k.m; }
      const cyc = 3.6 + hash(Math.floor(t / 3.6) + this.blinkSeed) * 1.4;
      const tb = (t + this.blinkSeed) % cyc;
      if (f && tb < 0.12 && !["Fear", "Awe", "EyesClosed"].includes(f)) f = "EyesClosed";
      this.curFace = f;
      if (f && f !== this._face) { this.faceG.innerHTML = PEEPS_PARTS.face[f]; this._face = f; }
      // position, orientation, marche, respiration
      const { x, y, walking } = this._pos(t);
      let flip = this.o.flip;
      for (const k of this.flips) if (t >= k.a) flip = k.f;
      const fx = flip ? -1 : 1, sc = this.o.scale, b = this.box;
      const bob = walking ? -Math.abs(Math.sin(walking * Math.PI * 2.2)) * 14 : 0;
      const sway = walking ? Math.sin(walking * Math.PI * 2.2) * 1.6 : 0;
      const breath = 1 + 0.006 * Math.sin((t + this.blinkSeed) * 1.9);
      const tr = `translate(${(x - fx * b.cx * sc).toFixed(2)} ${(y - b.bottom * sc * breath + bob).toFixed(2)}) rotate(${sway.toFixed(2)} ${fx * b.cx * sc} ${b.bottom * sc}) scale(${(fx * sc).toFixed(4)} ${(sc * breath).toFixed(4)})`;
      if (tr !== this._btr) { this.body.setAttribute("transform", tr); this._btr = tr; }
      this.pos = { x, y, top: y - b.h * sc, flip };
    }
  }

  /* ------------------------------------------------------------------ */
  class Scene {
    constructor(stage, def) {
      this.stage = stage; this.def = def;
      this.nodes = []; this.every = []; this.shakes = []; this.cams = [];
      this.layer = el("g", { class: "scene" }, stage.root);
      this.cam = el("g", {}, this.layer);
      this.hud = el("g", {}, this.layer);   // textes fixes à l'écran (hors caméra)
      this.start = stage.T(def.from);
      this.inType = def.in || "fade"; this.inDur = def.inDur != null ? def.inDur : 0.55;
      this.bg = def.bg;
    }
    T(at) { return this.stage.T(at); }
    // caméra : keys [{at, s, cx, cy, d, ease}]
    camera(keys) { this.cams = keys.map((k) => Object.assign({ d: 0.9, ease: "inOut" }, k, { a: this.T(k.at) })); return this; }
    shake(at, amp = 12, dur = 0.4) { this.shakes.push({ a: typeof at === "number" ? at : this.T(at), amp, d: dur }); return this; }
    camAt(t) {
      const ks = this.cams;
      if (!ks.length) return { s: 1, cx: W / 2, cy: H / 2 };
      let cur = { s: ks[0].s, cx: ks[0].cx, cy: ks[0].cy };
      for (let i = 1; i < ks.length; i++) {
        const k = ks[i]; if (t < k.a) break;
        const p = E[k.ease](prog(t, k.a, k.d));
        cur = { s: Math.exp(lerp(Math.log(cur.s), Math.log(k.s), p)), cx: lerp(cur.cx, k.cx, p), cy: lerp(cur.cy, k.cy, p) };
      }
      let dx = 0, dy = 0;
      for (const sh of this.shakes) {
        const p = prog(t, sh.a, sh.d);
        if (p > 0 && p < 1) { const k = (1 - p) * sh.amp; dx += Math.sin(t * 90) * k; dy += Math.cos(t * 77) * k * 0.8; }
      }
      return { s: cur.s, cx: cur.cx - dx / cur.s, cy: cur.cy - dy / cur.s };
    }
    // --- construction ---
    node(inner, parent) { return new Node(this, parent || this.cam, inner); }
    group(parent) { return this.node(null, parent); }
    put(markup, x = 0, y = 0, s = 1, rot = 0, parent) {
      const inner = el("g", { transform: `translate(${x} ${y}) rotate(${rot}) scale(${s})` });
      inner.innerHTML = markup;
      return this.node(inner, parent);
    }
    // objet redessiné quand ses paramètres changent : fn(t) -> markup
    dyn(fn, x = 0, y = 0, s = 1, rot = 0, parent) {
      const inner = el("g", { transform: `translate(${x} ${y}) rotate(${rot}) scale(${s})` });
      const n = this.node(inner, parent);
      let last = null;
      n.add((t) => { const m = fn(t); if (m !== last) { inner.innerHTML = m; last = m; } });
      inner.innerHTML = fn(-1);
      return n;
    }
    actor(o, parent) { return new Actor(this, parent || this.cam, o); }
    text(str, x, y, size, cls = "de", anchor = "middle", parent) {
      const g = el("g");
      const t = el("text", { x, y, "font-size": size, "text-anchor": anchor, class: cls }, g);
      t.textContent = str;
      const n = this.node(g, parent); n.textEl = t; return n;
    }
    // terme allemand + traduction arabe en petit (glossaire ou texte donné)
    de(str, x, y, size, ar, anchor = "middle", parent) {
      const g = el("g");
      const t = el("text", { x, y, "font-size": size, "text-anchor": anchor, class: "de" }, g);
      t.textContent = str;
      const tr = ar === undefined ? Stage.gloss(str) : ar;
      if (tr) {
        const a = el("text", { x, y: y + size * 0.92, "font-size": size >= 30 ? Math.max(22, Math.round(size * 0.58)) : Math.max(11, Math.round(size * 0.68)), "text-anchor": anchor === "start" ? "end" : anchor === "end" ? "start" : "middle", class: "ar" }, g);
        a.textContent = tr;
      }
      const n = this.node(g, parent); n.textEl = t; return n;
    }
    box(x, y, w, h, r = 18, fill = "var(--white)", stroke = "var(--ink)", sw = 4, parent) {
      const g = el("g");
      el("rect", { x, y, width: w, height: h, rx: r, fill, stroke, "stroke-width": sw }, g);
      return this.node(g, parent);
    }
    tick(fn) { this.every.push(fn); return this; }
    // dessin « au trait » (SketchCast / Cast) redessiné quand ses paramètres changent :
    //   c.sk((g, p) => SketchCast.person(g, p), (t) => ({…params}), x, y, s)
    sk(draw, paramsFn, x = 0, y = 0, s = 1, rot = 0, parent) {
      const inner = el("g", { transform: `translate(${x} ${y}) rotate(${rot}) scale(${s})` });
      const n = this.node(inner, parent);
      let last = null;
      const redraw = (t) => { const p = paramsFn(t); const k = JSON.stringify(p); if (k !== last) { last = k; while (inner.firstChild) inner.removeChild(inner.firstChild); n.out = draw(inner, p) || null; } };
      n.add((t) => redraw(t));
      redraw(-1);
      n.inner = inner;
      return n;
    }
    // groupe découpé (écran partagé…) : les enfants restent animables
    clipped(x, y, w, h, parent) {
      const id = "clip" + Math.random().toString(36).slice(2, 9);
      const cp = el("clipPath", { id }, this.stage.defs);
      el("rect", { x, y, width: w, height: h }, cp);
      return el("g", { "clip-path": `url(#${id})` }, parent || this.cam);
    }
    // typewriter sur un nœud texte
    write(n, at, dur = 0.8) {
      const full = n.textEl.textContent, a = this.T(at);
      n.add((t) => { const k = Math.round(full.length * prog(t, a, dur)); const s = full.slice(0, k); if (n.textEl.textContent !== s) n.textEl.textContent = s; });
      n.add((t, s) => { s.o *= t >= a ? 1 : 0; });
      return n;
    }
    count(n, at, dur, from, to, fmt = (v) => String(Math.round(v))) {
      const a = this.T(at);
      n.add((t) => { const v = lerp(from, to, E.out(prog(t, a, dur))); const s = fmt(v); if (n.textEl.textContent !== s) n.textEl.textContent = s; });
      return n;
    }
  }

  /* ------------------------------------------------------------------ */
  class StageImpl {
    constructor(sv, opts) {
      this.sv = sv; this.scenes = [];
      const poster = document.getElementById("poster");
      this.svg = el("svg", { id: "stage-svg", viewBox: `0 0 ${W} ${H}`, width: W, height: H, style: "position:absolute;left:0;top:0;overflow:hidden" });
      poster.appendChild(this.svg);
      this.root = el("g", {}, this.svg);
      // calque d'effets au-dessus des scènes (flash, vignette)
      this.fx = el("g", { "pointer-events": "none" }, this.svg);
      const defs = (this.defs = el("defs", {}, this.svg));
      defs.innerHTML = `<radialGradient id="vig" cx="50%" cy="45%" r="75%"><stop offset="55%" stop-color="var(--accent)" stop-opacity="0"/><stop offset="100%" stop-color="var(--accent)" stop-opacity=".55"/></radialGradient>`;
      this.flashR = el("rect", { x: 0, y: 0, width: W, height: H, fill: "#fff", opacity: 0 }, this.fx);
      this.vigR = el("rect", { x: 0, y: 0, width: W, height: H, fill: "url(#vig)", opacity: 0 }, this.fx);
      this.flashes = []; this.vigs = [];
      sv.hooks.push((t) => this.update(t));
    }
    // cue du moteur, avec un ou plusieurs décalages : "b9@Refobacin+0.3+0.15"
    T(at) {
      if (typeof at === "number") return at;
      let s = String(at).trim(), off = 0, m;
      while (!/^[+-]?\d*\.?\d+$/.test(s) && (m = s.match(/^(.+?)([+-]\d*\.?\d+)$/))) { off += parseFloat(m[2]); s = m[1]; }
      return this.sv.cue(s) + off;
    }
    scene(def) {
      const sc = new Scene(this, def);
      this.scenes.push(sc);
      if (def.bg) sc.put(def.bg, 0, 0, 1, 0, sc.cam);
      def.build(sc);
      return sc;
    }
    flash(at, dur = 0.35, strength = 0.9) { this.flashes.push({ a: this.T(at), d: dur, k: strength }); return this; }
    vignette(at, dur = 1, pulses = 3) { this.vigs.push({ a: this.T(at), d: dur, n: pulses }); return this; }
    /* Affiche-résumé finale (signature de la vidéo de référence) : chaque scène est figée à sa fin, rangée en
     * vignettes numérotées (lecture de droite à gauche), puis la caméra part de la dernière vignette (qui remplit
     * l'écran, comme la dernière scène) et recule jusqu'à l'affiche entière.
     *   st.summary({ at, dezoomAt, cols: 3, crop: [y0, y1], decorate(c, cells) {…} })
     */
    summary(o) {
      o = Object.assign({ cols: 3, crop: [170, 1310], top: 118, gap: 10, side: 16, dezoomDur: 2.2 }, o);
      const scenes = this.scenes.slice();
      const stage = this;
      const cw = (W - 2 * o.side - (o.cols - 1) * 20) / o.cols;
      const k = cw / W, ch = (o.crop[1] - o.crop[0]) * k;
      const cells = scenes.map((sc, i) => {
        const col = i % o.cols, row = Math.floor(i / o.cols);
        const x = W - o.side - cw - col * (cw + 20), y = o.top + row * (ch + o.gap);
        return { sc, i, x, y, w: cw, h: ch, k };
      });
      const ref = {};
      const sum = this.scene({ from: o.at, in: "fade", inDur: 0.45, build(c) {
        const host = [];
        if (o.below) o.below(c, cells);
        cells.forEach((cell) => {
          const id = "sumclip" + cell.i;
          const cp = el("clipPath", { id }, stage.defs);
          el("rect", { x: cell.x, y: cell.y, width: cell.w, height: cell.h, rx: 14 }, cp);
          const holder = el("g", { "clip-path": `url(#${id})` }, c.cam);
          const inner = el("g", { transform: `translate(${cell.x} ${cell.y - o.crop[0] * cell.k}) scale(${cell.k})` }, holder);
          host.push(inner);
        });
        ref.host = host;
        if (o.above) o.above(c, cells);
        const last = cells[cells.length - 1];
        const lk = 1 / last.k, lcx = last.x + last.w / 2, lcy = last.y - o.crop[0] * last.k + (H / 2) * last.k;
        c.camera([{ at: o.at, s: lk, cx: lcx, cy: lcy }, { at: o.dezoomAt || o.at + 0.6, s: 1, cx: W / 2, cy: H / 2, d: o.dezoomDur }]);
      } });
      // vignettes figées : calculées à la première image où l'affiche est visible
      const freezeAll = () => {
        if (sum._frozen) return; sum._frozen = true;
        cells.forEach((cell, i) => {
          const sc = cell.sc, t = Math.min(sc.end - 0.05, (o.freezeAt && o.freezeAt[i] != null) ? stage.T(o.freezeAt[i]) : sc.end - 0.05);
          const d0 = sc.layer.style.display; sc.layer.style.display = "";
          for (const f of sc.every) f(t, t - sc.start);
          for (const n of sc.nodes) n.apply(t);
          ref.host[i].innerHTML = sc.cam.innerHTML + sc.hud.innerHTML;
          sc.layer.style.display = d0;
        });
      };
      sum.every.unshift(() => freezeAll());
      return sum;
    }
    finish(extraHold) {
      this.scenes.sort((a, b) => a.start - b.start);
      this.scenes.forEach((sc, i) => { const nx = this.scenes[i + 1]; sc.end = nx ? nx.start + nx.inDur : Infinity; });
      const S = this.sv.state;
      if (extraHold) S.duration += extraHold;
      return this;
    }
    update(t) {
      for (const sc of this.scenes) {
        const vis = t >= sc.start - 0.0001 && t < sc.end;
        sc.layer.style.display = vis ? "" : "none";
        if (!vis) continue;
        // transition d'entrée
        const p = E.inOut(prog(t, sc.start, sc.inDur));
        let tr = "", op = 1, clip = "";
        switch (sc.inType) {
          case "fade": op = p; break;
          case "slideUp": tr = `translate(0 ${(1 - p) * H})`; break;
          case "slideLeft": tr = `translate(${(1 - p) * W} 0)`; break;
          case "zoom": op = p; tr = `translate(${W / 2} ${H / 2}) scale(${1.18 - 0.18 * p}) translate(${-W / 2} ${-H / 2})`; break;
          case "iris": clip = p < 1 ? `circle(${(p * 120).toFixed(2)}% at 50% 45%)` : ""; break;
          case "wipe": clip = p < 1 ? `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0)` : ""; break;
          default: break; // cut
        }
        sc.layer.setAttribute("transform", tr);
        sc.layer.style.opacity = op;
        sc.layer.style.clipPath = clip;
        const c = sc.camAt(t);
        sc.cam.setAttribute("transform", `translate(${(W / 2 - c.cx * c.s).toFixed(2)} ${(H / 2 - c.cy * c.s).toFixed(2)}) scale(${c.s.toFixed(4)})`);
        for (const f of sc.every) f(t, t - sc.start);
        for (const n of sc.nodes) n.apply(t);
      }
      let fo = 0;
      for (const f of this.flashes) { const q = prog(t, f.a, f.d); if (q > 0 && q < 1) fo = Math.max(fo, f.k * (1 - q)); }
      this.flashR.setAttribute("opacity", fo.toFixed(3));
      let vo = 0;
      for (const v of this.vigs) { const q = prog(t, v.a, v.d); if (q > 0 && q < 1) vo = Math.max(vo, Math.sin(q * Math.PI * v.n) ** 2 * (1 - q * 0.3)); }
      this.vigR.setAttribute("opacity", vo.toFixed(3));
    }
  }

  const Stage = {
    create: (sv, opts) => new StageImpl(sv, opts),
    E, prog, clamp, lerp, hash, el,
    gloss(str) {
      const G = global.GLOSSARY || {};
      const k = String(str).trim();
      return G[k] || G[k.replace(/[.?!:]+$/, "")] || null;
    },
  };
  global.Stage = Stage;
})(window);
