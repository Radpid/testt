/* SketchUI — le vocabulaire visuel de la vidéo de référence (affiche « sketchnote ») pour la série AKTE :
 * papier à points, cases dessinées à la main avec ombre, rubans de titre, pastilles (chips), grands titres
 * arabes (Lalezar), flèches à main levée, numéros de case. Couleurs = palette (palette.css), pas de jaune.
 * Toutes les fonctions renvoient un nœud Stage (animable : .fade, .pop, .wipe…).
 */
(function (global) {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, a, p) => { const n = document.createElementNS(NS, tag); for (const k in a || {}) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; };
  let seed = 500;
  const rc = (g) => rough.svg(g.ownerSVGElement || g);
  const opt = (o) => Object.assign({ stroke: "var(--ink)", strokeWidth: 3, roughness: 1.1, bowing: 0.8, seed: ++seed }, o);
  const rr = (x, y, w, h, r) => `M${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x + r} Q${x},${y + h} ${x},${y + h - r} V${y + r} Q${x},${y} ${x + r},${y} Z`;
  // les tracés rough.js ont des couleurs en attribut : on accepte les var() via style
  function fix(node) {
    node.querySelectorAll("path").forEach((p) => {
      for (const a of ["stroke", "fill"]) { const v = p.getAttribute(a); if (v && v.startsWith("var(")) { p.style[a] = v; } }
    });
    return node;
  }
  function draw(g, n) { g.appendChild(fix(n)); return n; }

  const UI = {
    // fond papier à points (dans l'espace de la caméra, déborde du poster pour le dézoom)
    dots(c, x0 = -1500, y0 = -1500, w = 4080, h = 4920) {
      const id = "dots" + (++seed);
      const pat = el("pattern", { id, width: 36, height: 36, patternUnits: "userSpaceOnUse" }, c.stage.defs);
      el("circle", { cx: 18, cy: 18, r: 2, fill: "#CFCBC0" }, pat);
      const g = el("g");
      el("rect", { x: x0, y: y0, width: w, height: h, fill: "var(--paper)" }, g);
      el("rect", { x: x0, y: y0, width: w, height: h, fill: `url(#${id})` }, g);
      return c.node(g);
    },
    // case de BD : bord dessiné + ombre décalée + numéro
    panel(c, x, y, w, h, n) {
      const g = el("g");
      const sh = rc(g).path(rr(x, y, w, h, 18), opt({ stroke: "#BDB8AC", strokeWidth: 4, roughness: 0.9 }));
      sh.setAttribute("transform", "translate(5 7)"); draw(g, sh);
      draw(g, rc(g).path(rr(x, y, w, h, 18), opt({ fill: "var(--card, #FCFBF7)", fillStyle: "solid", strokeWidth: 3.2 })));
      if (n != null) {
        draw(g, rc(g).circle(x + w - 26, y + 26, 38, opt({ fill: "var(--main)", fillStyle: "solid", strokeWidth: 2.6, roughness: 0.7 })));
        const t = el("text", { x: x + w - 26, y: y + 34, "text-anchor": "middle", "font-size": 22, class: "de on-main" }, g); t.textContent = n;
      }
      return c.node(g);
    },
    // ruban de titre (comme la référence, couleur de la palette)
    ribbon(c, text, cx, cy, w, size = 40, cls = "ttl") {
      const g = el("g"), h = size * 1.45, x = cx - w / 2, y = cy - h / 2, tail = 34, drop = 10;
      const tailO = opt({ fill: "#B7B2A6", fillStyle: "hachure", hachureGap: 5, fillWeight: 1.2, hachureAngle: -50, strokeWidth: 2.2 });
      draw(g, rc(g).polygon([[x + tail, y + drop], [x + tail, y + h + drop], [x - 12, y + h + drop], [x + 2, y + h / 2 + drop], [x - 12, y + drop]], tailO));
      draw(g, rc(g).polygon([[x + w - tail, y + drop], [x + w - tail, y + h + drop], [x + w + 12, y + h + drop], [x + w - 2, y + h / 2 + drop], [x + w + 12, y + drop]], opt(tailO)));
      draw(g, rc(g).rectangle(x + 10, y, w - 20, h, opt({ fill: "var(--main2)", fillStyle: "solid", strokeWidth: 3 })));
      const t = el("text", { x: cx, y: cy + size * 0.36, "text-anchor": "middle", "font-size": size, class: cls }, g); t.textContent = text;
      return c.node(g);
    },
    // pastille : terme allemand (+ traduction arabe en petit sous la pastille)
    chip(c, de, ar, cx, cy, size = 30, kind = "white") {
      const g = el("g");
      const t = el("text", { x: cx, y: cy + size * 0.36, "text-anchor": "middle", "font-size": size, class: kind === "main" ? "de on-main" : "de" }, g);
      t.textContent = de;
      const w = Math.max(80, de.length * size * 0.52 + 36), h = size * 1.55;
      const fill = kind === "main" ? "var(--main)" : kind === "accent" ? "var(--accent2)" : "var(--white)";
      g.insertBefore(fix(rc(g).path(rr(cx - w / 2, cy - h / 2, w, h, h / 2), opt({ fill, fillStyle: "solid", strokeWidth: 2.6, roughness: 0.8 }))), t);
      if (ar) { const a = el("text", { x: cx, y: cy + h / 2 + size * 0.75, "text-anchor": "middle", "font-size": Math.max(20, size * 0.62), class: "ar" }, g); a.textContent = ar; }
      return c.node(g);
    },
    // grand titre arabe (Lalezar) ou allemand (Kalam)
    title(c, text, x, y, size = 52, cls = "ttl", anchor = "middle") {
      const g = el("g"); const t = el("text", { x, y, "font-size": size, "text-anchor": anchor, class: cls }, g); t.textContent = text;
      const n = c.node(g); n.textEl = t; return n;
    },
    // flèche à main levée
    arrow(c, pts, color = "var(--ink)", w = 3.4) {
      const g = el("g");
      draw(g, rc(g).curve(pts, opt({ stroke: color, strokeWidth: w, roughness: 0.9 })));
      const [a, b] = [pts[pts.length - 2], pts[pts.length - 1]];
      const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), L = 18;
      for (const s of [-1, 1]) draw(g, rc(g).line(b[0], b[1], b[0] - L * Math.cos(ang + s * 0.5), b[1] - L * Math.sin(ang + s * 0.5), opt({ stroke: color, strokeWidth: w, roughness: 0.6 })));
      return c.node(g);
    },
    // cercle / soulignement dessinés sur un élément
    circle(c, cx, cy, w, h, color = "var(--accent)") {
      const g = el("g"); draw(g, rc(g).ellipse(cx, cy, w, h, opt({ stroke: color, strokeWidth: 4, roughness: 1.4 }))); return c.node(g);
    },
    underline(c, x1, x2, y, color = "var(--accent)") {
      const g = el("g"); draw(g, rc(g).curve([[x1, y], [(x1 + x2) / 2, y + 5], [x2, y - 1]], opt({ stroke: color, strokeWidth: 6, roughness: 0.9 }))); return c.node(g);
    },
    // cadrage caméra d'une case : centre la case dans la zone visible (au-dessus des sous-titres)
    frame(box, o = {}) {
      const W = 1080, top = 220, bottom = 1290, safeR = 110, pad = o.pad != null ? o.pad : 20;
      const availW = W - safeR - 2 * pad, availH = bottom - top - 2 * pad;
      const s = o.s || Math.min(availW / box.w, availH / box.h, o.max || 3.2);
      const scx = (W - safeR) / 2, scy = (top + bottom) / 2;
      const cx = box.x + box.w / 2 + (W / 2 - scx) / s, cy = box.y + box.h / 2 + (960 - scy) / s;
      return { s, cx, cy };
    },
  };
  global.SketchUI = UI;
})(window);
