/* Props — objets et décors de la série, dessinés dans le style Open Peeps (Pablo Stanley, CC0).
 *
 * Script navigateur sans build : window.Props = { syringe(), hospitalBed(), … }.
 * Chaque fonction renvoie une CHAÎNE SVG (« <g>…</g> ») en coordonnées locales ; taille et ancre sont
 * documentées au-dessus de chaque fonction. Mêmes paramètres => même sortie (déterministe, mis en cache).
 *
 * Trait : les contours ne sont pas des « stroke » mais des rubans REMPLIS d'épaisseur légèrement variable
 * (comme l'encre d'Open Peeps), avec un tremblé très léger et fixe. Aucune couleur en dur : uniquement les
 * classes de palette.css (.ink, .f-paper, .f-white, .f-main, .f-main2, .f-accent, .f-accent2, .f-gray,
 * .f-gray2, .f-wood, .f-wood2). Le texte utilise la police « Kalam » (à charger par la page).
 *
 * Épaisseur : calibrée pour un personnage de 600–700 px de haut. Props.setWeight(k) la multiplie globalement.
 */
(function (global) {
  "use strict";

  /* ───────────────────────── moteur de trait ───────────────────────── */
  let K = 1;                       // multiplicateur global d'épaisseur
  const W = () => 5.2 * K;         // contour principal
  const W2 = () => 3.8 * K;        // détail
  const W3 = () => 2.9 * K;        // détail fin
  const FONT = "Kalam, 'Comic Sans MS', cursive";

  const r1 = (n) => Math.round(n * 10) / 10;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  function hash2(i, j) {
    const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
    return s - Math.floor(s);
  }
  // bruit de valeur 2D lisse, dans [-1, 1]
  function noise2(x, y) {
    const i = Math.floor(x), j = Math.floor(y), fx = x - i, fy = y - j;
    const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
    const a = hash2(i, j), b = hash2(i + 1, j), c = hash2(i, j + 1), d = hash2(i + 1, j + 1);
    return (a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v) * 2 - 1;
  }

  // Aplatissement d'un chemin SVG (M L H V Q C Z absolus, un seul sous-chemin) en polyligne dense.
  function flat(d) {
    const tk = d.match(/[MLHVCQZ]|-?\d*\.?\d+(?:e-?\d+)?/gi);
    let i = 0, cmd = "", x = 0, y = 0, sx = 0, sy = 0, closed = false;
    const pts = [];
    const num = () => parseFloat(tk[i++]);
    const push = (px, py) => {
      const l = pts[pts.length - 1];
      if (!l || Math.hypot(l[0] - px, l[1] - py) > 0.35) pts.push([px, py]);
    };
    const line = (nx, ny) => {
      const len = Math.hypot(nx - x, ny - y);
      if (len < 0.01) return;
      const ts = [];
      const n = Math.max(1, Math.ceil(len / 11));
      for (let k = 1; k <= n; k++) ts.push(k / n);
      if (len > 8) { ts.push(1.6 / len, 1 - 1.6 / len); ts.sort((a, b) => a - b); }
      for (const t of ts) push(x + (nx - x) * t, y + (ny - y) * t);
      x = nx; y = ny;
    };
    while (i < tk.length) {
      if (/[A-Za-z]/.test(tk[i])) cmd = tk[i++].toUpperCase();
      if (cmd === "M") { x = num(); y = num(); sx = x; sy = y; push(x, y); cmd = "L"; }
      else if (cmd === "L") line(num(), num());
      else if (cmd === "H") line(num(), y);
      else if (cmd === "V") line(x, num());
      else if (cmd === "Q") {
        const cx = num(), cy = num(), ex = num(), ey = num();
        const n = Math.max(3, Math.ceil((Math.hypot(cx - x, cy - y) + Math.hypot(ex - cx, ey - cy)) / 2.6));
        for (let k = 1; k <= n; k++) {
          const t = k / n, m = 1 - t;
          push(m * m * x + 2 * m * t * cx + t * t * ex, m * m * y + 2 * m * t * cy + t * t * ey);
        }
        x = ex; y = ey;
      } else if (cmd === "C") {
        const ax = num(), ay = num(), bx = num(), by = num(), ex = num(), ey = num();
        const n = Math.max(4, Math.ceil((Math.hypot(ax - x, ay - y) + Math.hypot(bx - ax, by - ay) + Math.hypot(ex - bx, ey - by)) / 2.6));
        for (let k = 1; k <= n; k++) {
          const t = k / n, m = 1 - t;
          push(m * m * m * x + 3 * m * m * t * ax + 3 * m * t * t * bx + t * t * t * ex,
               m * m * m * y + 3 * m * m * t * ay + 3 * m * t * t * by + t * t * t * ey);
        }
        x = ex; y = ey;
      } else if (cmd === "Z") { line(sx, sy); closed = true; cmd = ""; }
      else break;
    }
    if (closed && pts.length > 2) {
      const a = pts[0], b = pts[pts.length - 1];
      if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.36) pts.pop();
    }
    return { pts, closed };
  }

  // léger tremblé « fait main », champ fixe (dépend de la position locale => stable d'une image à l'autre)
  function wobble(pts, amp, seed) {
    if (!amp) return pts;
    const o = (seed || 0) * 13.37;
    return pts.map(([x, y]) => [
      x + amp * noise2(x / 58 + o, y / 58 - o),
      y + amp * noise2(x / 58 + 40.5 - o, y / 58 + 91.3 + o),
    ]);
  }
  function prep(d, o) {
    const g = typeof d === "string" ? flat(d) : d;
    const amp = o && o.wob != null ? o.wob : 1.15;
    return { pts: wobble(g.pts, amp, o && o.seed), closed: g.closed };
  }
  const polyD = (pts, close) => "M" + pts.map((p) => r1(p[0]) + " " + r1(p[1])).join("L") + (close ? "Z" : "");

  // Ruban d'encre : polygone rempli d'épaisseur variable autour de la polyligne.
  function ribbon(pts, closed, w, o) {
    o = o || {};
    const n = pts.length;
    if (n < 2) return "";
    const vary = o.vary != null ? o.vary : 0.26;
    const sd = (o.seed || 0) * 7.7;
    let total = 0;
    const acc = [0];
    for (let i = 1; i < n; i++) { total += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); acc.push(total); }
    const taperLen = Math.min(34, total / 3);
    const taper = closed ? 1 : (o.taper != null ? o.taper : 0.62);
    const L = [], R = [];
    for (let i = 0; i < n; i++) {
      const a = closed ? pts[(i - 1 + n) % n] : pts[Math.max(0, i - 1)];
      const b = closed ? pts[(i + 1) % n] : pts[Math.min(n - 1, i + 1)];
      let tx = b[0] - a[0], ty = b[1] - a[1];
      const tl = Math.hypot(tx, ty) || 1;
      tx /= tl; ty /= tl;
      const [x, y] = pts[i];
      let h = (w / 2) * (1 + vary * noise2(x / 74 + sd + 5.2, y / 74 - sd + 1.7));
      if (!closed && taper < 1) {
        const e = clamp(Math.min(acc[i], total - acc[i]) / (taperLen || 1), 0, 1);
        h *= taper + (1 - taper) * e * e * (3 - 2 * e);
      }
      if (o.dry) h *= clamp(0.86 + 0.95 * noise2(x / 31 + sd, y / 31 + 9.1), 0.22, 1.18);
      L.push([x - ty * h, y + tx * h, h]);
      R.push([x + ty * h, y - tx * h, h]);
    }
    if (closed) return polyD(L, true) + polyD(R.reverse(), true);
    // extrémités arrondies
    const cap = (p, q, h, back) => {
      const out = [];
      let tx = p[0] - q[0], ty = p[1] - q[1];           // direction sortante
      const tl = Math.hypot(tx, ty) || 1;
      tx /= tl; ty /= tl;
      // normale « gauche » du sens de parcours (le sens de parcours est -t au début, +t à la fin)
      const nx = back ? ty : -ty, ny = back ? -tx : tx;
      const sgn = back ? -1 : 1;
      for (let k = 1; k < 6; k++) {
        const a = (Math.PI * k) / 6, c = Math.cos(a) * sgn, sn = Math.sin(a);
        out.push([p[0] + (nx * c + tx * sn) * h, p[1] + (ny * c + ty * sn) * h]);
      }
      return out;
    };
    const endCap = cap(pts[n - 1], pts[n - 2], L[n - 1][2], false);
    const startCap = cap(pts[0], pts[1], L[0][2], true);
    return polyD(L.concat(endCap, R.reverse(), startCap), true);
  }

  /* ───────────────────────── primitives ───────────────────────── */
  // forme fermée : aplat + contour
  function S(d, f, w, o) {
    const g = prep(d, o);
    return (f ? `<path class="${f}" d="${polyD(g.pts, true)}"/>` : "") +
      `<path class="${(o && o.c) || "ink"}" d="${ribbon(g.pts, true, w || W(), o)}"/>`;
  }
  // aplat seul
  function F(d, f, o) { return `<path class="${f}" d="${polyD(prep(d, o).pts, true)}"/>`; }
  // contour seul (forme fermée ou trait ouvert)
  function O(d, w, o) {
    const g = prep(d, o);
    return `<path class="${(o && o.c) || "ink"}" d="${ribbon(g.pts, g.closed, w || W2(), o)}"/>`;
  }
  function T(s, x, y, size, o) {
    o = o || {};
    return `<text class="${o.c || "ink"}" x="${r1(x)}" y="${r1(y)}" font-family="${FONT}" font-weight="700" font-size="${r1(size)}" text-anchor="${o.a || "middle"}"${o.ls ? ` letter-spacing="${o.ls}"` : ""}${o.tr ? ` transform="${o.tr}"` : ""}>${esc(s)}</text>`;
  }
  const G = (inner, tr) => `<g${tr ? ` transform="${tr}"` : ""}>${inner}</g>`;

  // polygone à coins arrondis : points [x, y, r?]
  function pg(points, r, open) {
    const n = points.length;
    let d = "";
    for (let i = 0; i < n; i++) {
      const v = points[i];
      if (open && (i === 0 || i === n - 1)) { d += (i === 0 ? "M" : "L") + v[0] + " " + v[1]; continue; }
      const p = points[(i - 1 + n) % n], q = points[(i + 1) % n];
      const lp = Math.hypot(p[0] - v[0], p[1] - v[1]), lq = Math.hypot(q[0] - v[0], q[1] - v[1]);
      const rr_ = Math.min(v[2] != null ? v[2] : (r || 0), lp * 0.48, lq * 0.48);
      if (rr_ < 0.5) { d += (i === 0 ? "M" : "L") + v[0] + " " + v[1]; continue; }
      const ax = v[0] + ((p[0] - v[0]) / lp) * rr_, ay = v[1] + ((p[1] - v[1]) / lp) * rr_;
      const bx = v[0] + ((q[0] - v[0]) / lq) * rr_, by = v[1] + ((q[1] - v[1]) / lq) * rr_;
      d += (i === 0 ? "M" : "L") + r1(ax) + " " + r1(ay) + "Q" + v[0] + " " + v[1] + " " + r1(bx) + " " + r1(by);
    }
    return d + (open ? "" : "Z");
  }
  // rectangle arrondi ; r = nombre ou [hg, hd, bd, bg]
  function rr(x, y, w, h, r) {
    const a = Array.isArray(r) ? r : [r || 0, r || 0, r || 0, r || 0];
    return pg([[x, y, a[0]], [x + w, y, a[1]], [x + w, y + h, a[2]], [x, y + h, a[3]]]);
  }
  function ell(cx, cy, rx, ry) {
    const k = 0.5523, ox = rx * k, oy = ry * k;
    return `M${cx - rx} ${cy}C${cx - rx} ${cy - oy} ${cx - ox} ${cy - ry} ${cx} ${cy - ry}C${cx + ox} ${cy - ry} ${cx + rx} ${cy - oy} ${cx + rx} ${cy}C${cx + rx} ${cy + oy} ${cx + ox} ${cy + ry} ${cx} ${cy + ry}C${cx - ox} ${cy + ry} ${cx - rx} ${cy + oy} ${cx - rx} ${cy}Z`;
  }
  const ln = (x1, y1, x2, y2) => `M${x1} ${y1}L${x2} ${y2}`;

  /* cache : mêmes paramètres => même chaîne */
  const cache = new Map();
  function memo(name, fn) {
    return function (opts) {
      const key = name + "|" + K + "|" + JSON.stringify(opts || {});
      let v = cache.get(key);
      if (v === undefined) {
        if (cache.size > 4000) cache.clear();
        v = `<g class="prop prop-${name}">` + fn(opts || {}) + "</g>";
        cache.set(key, v);
      }
      return v;
    };
  }

  /* ═════════════════════════ 1–2. SERINGUES ═════════════════════════ */
  /* Géométrie commune (échelle 1), seringue horizontale, embout à GAUCHE, piston à droite :
   *   embout Luer (pointe)        : (0, 0)        — axe de la seringue : y = 0
   *   corps (cylindre)            : x 40 → 300, y −30 → +30
   *   ailettes                    : x 298 → 312, y −52 → +52
   *   face avant du joint (piston): x = 48 + 200 · fill · (1 − push)   (course : 200 px)
   *   poussoir (plaque du pouce)  : x = joint + 270 → +283  (max ≈ 531 px de long au total)
   *   aiguille (tip:"needle")     : pointe en (−150, 0)
   */
  const SYR = { tip: [0, 0], barrelX0: 40, barrelX1: 300, radius: 30, travel: 200, stopperMin: 48, rod: 250 };
  function stopperX(fill, push) { return 48 + 200 * clamp(fill, 0, 1) * (1 - clamp(push, 0, 1)); }

  function syringeCore(o, oral) {
    const fill = o.fill != null ? o.fill : 0.8, push = o.push || 0;
    const liquid = o.liquid || (oral ? "clear" : "milky");
    const tip = o.tip || (oral ? "none" : "stopper");
    const label = o.label === undefined ? null : o.label;
    const sx = stopperX(fill, push);
    const R = 30;
    const mir = o._mirror ? "translate(236 0) scale(-1 1)" : null;
    let s = "";
    // embout
    if (oral) {
      s += S(pg([[42, -15, 4], [16, -13, 5], [16, -8, 2], [-8, -7, 4], [-8, 7, 4], [16, 8, 2], [16, 13, 5], [42, 15, 4]]), "f-main", W2());
    } else {
      s += S(pg([[44, -9, 2], [2, -5, 3], [2, 5, 3], [44, 9, 2]]), "f-white", W2());
    }
    // corps : fond (vide) puis liquide
    const barrel = rr(40, -R, 260, 2 * R, [13, 3, 3, 13]);
    s += F(barrel, oral ? "f-white" : "f-gray2");
    if (liquid !== "none" && sx > 50) {
      s += F(rr(41, -R + 1, sx - 40, 2 * R - 2, [12, 0, 0, 12]), liquid === "milky" ? "f-white" : "f-main2", { wob: 0.4 });
      if (liquid === "clear" && sx > 90) s += O(ln(58, -R + 12, Math.min(sx - 14, 150), -R + 12), W3(), { c: "f-white", wob: 0.3 });
    }
    // équipage mobile (tige + joint + poussoir), dessiné en local puis translaté : pas de « frémissement »
    let mv = "";
    mv += S(rr(14, -8, 262, 16, 2), oral ? "f-main" : "f-white", W2());
    mv += O(ln(26, 0, 262, 0), W3() * 0.8, { taper: 1 });
    mv += S(rr(268, -37, 14, 74, 6), oral ? "f-main" : "f-white");
    mv += S(pg([[0, -27, 5], [8, -27, 2], [8, -21, 1], [13, -21, 1], [13, -27, 2], [21, -27, 4], [21, 27, 4], [13, 27, 2], [13, 21, 1], [8, 21, 1], [8, 27, 2], [0, 27, 5]]), "ink", 2, { wob: 0.5 });
    s += G(mv, `translate(${r1(sx)} 0)`);
    // graduations (bord supérieur)
    let ticks = "";
    for (let k = 0; k <= 10; k++) {
      const x = 62 + k * 19.4;
      if (label != null && x < 176) continue;
      ticks += O(ln(x, -R + 2, x, -R + (k % 5 === 0 ? 19 : k % 5 === 0 ? 19 : 11)), W3() * 0.85, { taper: 1, wob: 0.4, seed: k });
    }
    s += ticks;
    // étiquette (bandeau qui fait le tour du corps)
    if (label != null) {
      const band = rr(64, -R + 1, 108, 2 * R - 2, 2);
      if (oral) {
        s += F(band, "f-main") + T(label, 118, 11, 30, { c: "f-white", ls: 2, tr: mir });
      } else {
        s += F(band, "f-paper") + O(ln(64, -R, 64, R), W2(), { taper: 1 }) + O(ln(172, -R, 172, R), W2(), { taper: 1, seed: 3 });
        if (label === "?") s += T("?", 118, 21, 60, { c: "f-accent", tr: mir });
        else if (label) s += T(label, 118, 9, clamp(170 / (String(label).length || 1), 13, 27), { tr: mir });
      }
    }
    // contour du corps + ailettes
    s += O(barrel, W());
    s += S(rr(297, -52, 15, 104, 7), oral ? "f-main" : "f-white");
    // embout : bouchon / aiguille
    if (tip === "stopper") {
      s += S(pg([[-14, -11, 5], [20, -13, 3], [26, -18, 3], [34, -18, 3], [34, 18, 3], [26, 18, 3], [20, 13, 3], [-14, 11, 5]]), oral ? "f-white" : "f-main", W2());
      s += O(ln(-2, -6, 12, -7), W3() * 0.8, { c: oral ? "ink" : "f-main2" });
    } else if (tip === "needle") {
      s += O(ln(-150, 0.5, -30, 0), W3(), { taper: 1, wob: 0.3 });
      s += F("M-150 -1.6L-136 -1.8L-150 1.9Z", "ink", { wob: 0 });
      s += S(pg([[-34, -6, 3], [-8, -8, 2], [-6, -14, 3], [22, -14, 4], [22, 14, 4], [-6, 14, 3], [-8, 8, 2], [-34, 6, 3]]), "f-main2", W2());
    }
    return s;
  }

  /* syringe({liquid:"milky"|"clear"|"none", fill:0..1, push:0..1, label:null|"?"|"texte", tip:"stopper"|"needle"|"none"})
   * Seringue Luer 5 ml. Taille ≈ 531 × 104 (piston tiré à fond). Ancre : pointe de l'embout (0,0), axe y = 0.
   * Voir le bloc « Géométrie commune » ci-dessus ; Props.syringeGeom(fill, push) renvoie les x utiles. */
  const syringe = memo("syringe", (o) => syringeCore(o, false));

  /* oralSyringe({fill, push, liquid, label:"ORAL", tip:"none"|"stopper"})
   * Seringue orale/entérale (embout non-Luer large, piston et ailettes en couleur « main », bandeau ORAL).
   * Même géométrie et même ancre que syringe() ; l'embout va jusqu'à x = −8. */
  const oralSyringe = memo("oralSyringe", (o) => syringeCore(Object.assign({ label: "ORAL", fill: 0.6 }, o), true));

  function syringeGeom(fill, push) {
    const sx = stopperX(fill != null ? fill : 0.8, push || 0);
    return { tip: [0, 0], needleTip: [-150, 0], barrel: [40, -30, 300, 30], stopperX: sx, thumbX: sx + 283, stopperMin: 48, stopperMax: 248, travel: 200, labelCenter: [118, 0] };
  }

  /* ═════════════════════════ 3. FLACONS ═════════════════════════ */
  /* bottle({label:"Cotrim-K", sub:"Saft"}) — flacon de suspension buvable (verre ambré = wood).
   * Taille ≈ 150 × 322. Ancre : bas-centre (0,0), y négatif vers le haut. Bouchon : y −322 → −268. */
  const bottle = memo("bottle", (o) => {
    const label = o.label != null ? o.label : "Cotrim-K", sub = o.sub != null ? o.sub : "Saft";
    let s = "";
    s += S("M-30 -274L30 -274L31 -246C33 -232 74 -228 74 -196L73 -18C73 -6 66 0 52 0L-52 0C-66 0 -73 -6 -73 -18L-74 -196C-74 -228 -33 -232 -31 -246Z", "f-wood");
    s += O("M-58 -202C-58 -214 -50 -220 -40 -224", W3(), { c: "f-wood2" });
    // étiquette
    s += S(rr(-73, -178, 146, 128, 2), "f-white", W2());
    s += F(rr(-71, -176, 142, 24, 0), "f-main", { wob: 0.4 });
    s += T(label, 0, -106, clamp(250 / (label.length || 1), 16, 34));
    if (sub) s += T(sub, 0, -72, 24, { c: "f-gray" });
    // bouchon
    s += S(rr(-39, -322, 78, 54, [10, 10, 4, 4]), "f-white");
    for (let k = 0; k < 4; k++) s += O(ln(-22 + k * 15, -306, -22 + k * 15, -280), W3(), { seed: k });
    return s;
  });

  /* vial({label:"Refobacin"}) — flacon-ampoule injectable. Taille ≈ 112 × 176. Ancre : bas-centre (0,0). */
  const vial = memo("vial", (o) => {
    const label = o.label != null ? o.label : "Refobacin";
    const body = "M-26 -138L26 -138L26 -128C28 -118 55 -116 55 -98L54 -14C54 -4 48 0 38 0L-38 0C-48 0 -54 -4 -54 -14L-55 -98C-55 -116 -28 -118 -26 -128Z";
    let s = F(body, "f-white");
    s += F("M-54.5 -78L54.5 -78L54 -14C54 -4 48 0 38 0L-38 0C-48 0 -54 -4 -54 -14Z", "f-main2", { wob: 0.6 });
    s += O(body, W());
    s += S(rr(-54, -92, 108, 58, 2), "f-white", W2());
    s += T(label, 0, -54, clamp(150 / (label.length || 1), 12, 24));
    s += S(rr(-32, -160, 64, 26, 5), "f-gray2");
    s += S(rr(-27, -176, 54, 18, [7, 7, 2, 2]), "f-accent");
    return s;
  });

  /* bloodTube() — tube de prélèvement. Taille ≈ 50 × 214. Ancre : bas-centre (0,0). */
  const bloodTube = memo("bloodTube", () => {
    const body = "M-19 -176L19 -176L19 -20C19 -6 10 0 0 0C-10 0 -19 -6 -19 -20Z";
    let s = F(body, "f-white");
    s += F("M-19 -96L19 -96L19 -20C19 -6 10 0 0 0C-10 0 -19 -6 -19 -20Z", "f-accent", { wob: 0.6 });
    s += O(body, W());
    s += S(rr(-19, -150, 38, 46, 1), "f-white", W2());
    s += O(ln(-10, -136, 10, -136), W3()) + O(ln(-10, -124, 5, -124), W3(), { seed: 2 });
    s += S(rr(-25, -214, 50, 44, [9, 9, 4, 4]), "f-accent");
    s += O(ln(-11, -202, -11, -180), W3(), { c: "f-accent2" });
    return s;
  });

  /* ═════════════════════════ 4. LIT D'HÔPITAL ═════════════════════════ */
  /* hospitalBed({w:520, blanket:true, rail:true}) — lit adulte, vue de côté, tête à GAUCHE.
   * Taille : w × 322. Ancre : bas-gauche au sol (0,0).
   * Dessus du matelas : y = −210 (de x = 28 à w − 28). Oreiller : centre ≈ (92, −232), dessus ≈ −254.
   * Dessus de la couverture ≈ −236. Barrière : x 196 → w − 120, y −278 → −206. */
  const hospitalBed = memo("hospitalBed", (o) => {
    const w = o.w || 520;
    let s = "";
    // roues
    for (const x of [64, w - 64]) {
      s += S(pg([[x - 9, -62], [x + 9, -62], [x + 6, -30, 3], [x - 6, -30, 3]]), "f-gray", W2(), { seed: x });
      s += S(ell(x, -23, 21, 21), "ink", 2, { seed: x }) + F(ell(x, -23, 7.5, 7.5), "f-gray2", { seed: x });
    }
    // châssis
    s += S(rr(126, -156, 26, 92, 2), "f-gray2", W2()) + S(rr(w - 152, -156, 26, 92, 2), "f-gray2", W2(), { seed: 2 });
    s += S(rr(34, -76, w - 68, 18, 8), "f-gray");
    // tête et pied de lit
    s += S(rr(2, -322, 26, 176, [13, 13, 6, 6]), "f-wood2");
    s += S(rr(w - 28, -276, 26, 130, [13, 13, 6, 6]), "f-wood2", 0, { seed: 4 });
    // sommier + matelas
    s += S(rr(20, -170, w - 40, 22, 9), "f-main");
    s += S(rr(28, -210, w - 56, 42, [15, 15, 8, 8]), "f-white");
    // oreiller
    s += S("M40 -214C32 -240 52 -256 92 -254C134 -256 152 -240 147 -216C145 -205 120 -207 92 -207C62 -206 44 -203 40 -214Z", "f-white");
    s += O("M62 -236C78 -242 100 -242 118 -235", W3());
    if (o.blanket !== false) {
      const a = w - 34;
      s += S(`M178 -214C186 -230 198 -236 214 -238L218 -180C202 -177 186 -178 180 -186C176 -194 175 -205 178 -214Z`, "f-white");
      s += S(`M212 -238C${r1(w * 0.45)} -246 ${r1(w * 0.72)} -240 ${a - 34} -234C${a - 10} -230 ${a} -220 ${a} -200L${a - 2} -178C${a - 50} -170 ${a - 100} -186 ${a - 160} -178C${r1(w * 0.52)} -170 ${r1(w * 0.48)} -186 216 -178C212 -196 210 -220 212 -238Z`, "f-main2");
      s += O(`M${a - 70} -226C${a - 60} -212 ${a - 58} -200 ${a - 62} -186`, W3());
      s += O(`M${r1(w * 0.5)} -232C${r1(w * 0.5) + 8} -222 ${r1(w * 0.5) + 10} -212 ${r1(w * 0.5) + 6} -204`, W3(), { seed: 5 });
    }
    if (o.rail !== false) {
      const x0 = 196, x1 = w - 120;
      s += O(rr(x0, -278, x1 - x0, 72, 18), W());
      const n = Math.max(2, Math.round((x1 - x0) / 70));
      for (let k = 1; k < n; k++) { const x = x0 + ((x1 - x0) * k) / n; s += O(ln(x, -276, x, -208), W2(), { taper: 1, seed: k }); }
      s += O(ln(x0 + 26, -206, x0 + 26, -168), W(), { taper: 1 }) + O(ln(x1 - 26, -206, x1 - 26, -168), W(), { taper: 1, seed: 7 });
    }
    return s;
  });

  /* ═════════════════════════ 5. TABLE DE CHEVET ═════════════════════════ */
  /* bedsideCabinet({tray:true}) — chevet d'hôpital à roulettes. Taille ≈ 204 × 290 (+ plateau jusqu'à −352).
   * Ancre : bas-gauche au sol (0,0).
   * Dessus du chevet (plan) : y = −282, x 0 → 204.
   * PLATEAU : surface supérieure y = −298, de x = 10 à x = 194 (centre (102, −298)).
   *   tasse : x 34 → 78, bord supérieur y = −346 ; assiette : x 100 → 184, dessus y = −306. */
  const bedsideCabinet = memo("bedsideCabinet", (o) => {
    let s = "";
    for (const x of [40, 164]) s += S(ell(x, -14, 13, 13), "ink", 2, { seed: x }) + F(ell(x, -14, 4.5, 4.5), "f-gray2");
    s += S(rr(12, -266, 180, 240, [2, 2, 8, 8]), "f-white");
    s += S(rr(28, -246, 148, 58, 6), "f-main2", W2());
    s += S(rr(80, -224, 44, 12, 6), "ink", 2);
    s += S(rr(28, -174, 148, 132, 6), "f-white", W2());
    s += S(rr(148, -128, 12, 40, 6), "ink", 2);
    s += S(rr(0, -282, 204, 20, 8), "f-wood2");
    if (o.tray !== false) {
      s += S(pg([[10, -298, 6], [194, -298, 6], [186, -283, 5], [18, -283, 5]]), "f-main");
      // tasse
      s += O("M76 -338C98 -340 98 -312 74 -312", W2(), { taper: 1 });
      s += S(pg([[34, -346, 3], [78, -346, 3], [74, -299, 9], [38, -299, 9]]), "f-white");
      s += O("M48 -356C42 -366 54 -372 49 -384", W3()) + O("M63 -358C57 -368 69 -374 64 -386", W3(), { seed: 3 });
      // assiette + petit pain
      s += S("M116 -306C112 -332 168 -334 168 -306Z", "f-wood2");
      s += O("M132 -322L138 -314", W3()) + O("M146 -324L152 -316", W3(), { seed: 2 });
      s += S(rr(100, -307, 84, 9, 4), "f-white", W2());
    }
    return s;
  });

  /* ═════════════════════════ 6. PIED À PERFUSION ═════════════════════════ */
  /* ivPole({bag:true, lineTo:[150,-250]}) — potence à perfusion avec poche et tubulure.
   * Taille ≈ 170 × 726. Ancre : bas-centre du mât au sol (0,0).
   * Crochets : (±46, −694). Poche : x 20 → 72, y −680 → −566. Chambre compte-gouttes : (46, −556 → −524).
   * La tubulure part de (46, −524) et arrive en lineTo (défaut (150, −250)) : y passer la main/le lit du patient. */
  const ivPole = memo("ivPole", (o) => {
    let s = "";
    s += S("M-96 -26C-50 -52 50 -52 96 -26L92 -16C50 -36 -50 -36 -92 -16Z", "f-gray", W2());
    for (const x of [-92, 0, 92]) s += S(ell(x, -14, 14, 14), "ink", 2, { seed: x }) + F(ell(x, -14, 5, 5), "f-gray2");
    s += S(rr(-7, -700, 14, 662, 4), "f-gray2");
    s += S(rr(-10, -420, 20, 34, 5), "f-gray", W2());
    s += O("M-46 -694C-48 -722 -18 -724 0 -704C18 -724 48 -722 46 -694", W(), { taper: 0.8 });
    if (o.bag !== false) {
      const lt = o.lineTo || [150, -250];
      const bag = "M22 -668C22 -682 70 -682 70 -668L72 -592C72 -574 56 -566 46 -566C36 -566 20 -574 20 -592Z";
      s += O(`M46 -524C46 ${r1(-524 + (lt[1] + 524) * 0.55)} ${r1(46 + (lt[0] - 46) * 0.25)} ${r1(lt[1] + 70)} ${lt[0]} ${lt[1]}`, W2(), { taper: 1 });
      s += S(rr(38, -486, 16, 24, 3), "f-main", W3());
      s += F(bag, "f-white") + F("M21 -636L71 -638L72 -592C72 -574 56 -566 46 -566C36 -566 20 -574 20 -592Z", "f-main2", { wob: 0.6 });
      s += O(bag, W()) + O(ell(46, -686, 5, 6), W3());
      s += O(ln(32, -660, 60, -660), W3()) + O(ln(32, -650, 52, -650), W3(), { seed: 2 });
      s += S(rr(39, -558, 14, 34, 4), "f-white", W2());
      s += O(ln(46, -566, 46, -558), W2(), { taper: 1 });
    }
    return s;
  });

  /* ═════════════════════════ 7. MONITEUR ═════════════════════════ */
  /* monitor({ecg:"normal"|"alarm"|"flat", t:0, hr:"142", stand:true})
   * Scope patient. Taille ≈ 268 × 240 (voyant compris). Ancre : bas-centre du pied (0,0).
   * Boîtier : x −130 → 130, y −214 → −34. Écran : x −114 → 114, y −198 → −70.
   * La courbe défile avec t (secondes, 90 px/s). "alarm" : tracé rapide en accent + voyant allumé ;
   * "flat" : ligne plate + voyant allumé (hr affiché "0" par défaut). Voyant : (88, −226). */
  function ecgY(u) {
    u -= Math.floor(u);
    if (u > 0.08 && u < 0.2) return 0.13 * Math.sin(((u - 0.08) / 0.12) * Math.PI);
    const q = [[0.28, 0], [0.31, -0.14], [0.355, 1], [0.4, -0.32], [0.44, 0]];
    for (let i = 0; i < q.length - 1; i++) if (u >= q[i][0] && u < q[i + 1][0]) return q[i][1] + ((q[i + 1][1] - q[i][1]) * (u - q[i][0])) / (q[i + 1][0] - q[i][0]);
    if (u > 0.58 && u < 0.8) return 0.24 * Math.sin(((u - 0.58) / 0.22) * Math.PI);
    return 0;
  }
  const monitor = memo("monitor", (o) => {
    const mode = o.ecg || "normal", t = o.t || 0;
    const hr = o.hr != null ? String(o.hr) : mode === "flat" ? "0" : "142";
    const on = mode !== "normal";
    let s = "";
    if (o.stand !== false) s += S(rr(-13, -40, 26, 34, 2), "f-gray", W2()) + S(rr(-64, -14, 128, 14, 7), "f-gray");
    // voyant d'alarme
    s += S("M70 -212C70 -236 106 -236 106 -212Z", on ? "f-accent" : "f-gray");
    if (on) s += O(ln(60, -236, 50, -246), W2()) + O(ln(88, -244, 88, -258), W2(), { seed: 2 }) + O(ln(116, -236, 126, -246), W2(), { seed: 3 });
    s += S(rr(-130, -214, 260, 180, 18), "f-gray2");
    s += S(rr(-114, -198, 228, 128, 9), "ink", 2);
    // tracé
    const x0 = -102, x1 = 26, base = -128, amp = 40;
    const period = mode === "alarm" ? 44 : 78;
    const pts = [];
    for (let x = x0; x <= x1; x += 1.25) {
      const y = mode === "flat" ? 0 : ecgY((x + t * 90) / period);
      pts.push([x, base - amp * y]);
    }
    s += `<path class="${on ? "f-accent" : "f-main2"}" d="${ribbon(pts, false, 3.6 * K, { vary: 0, taper: 1 })}"/>`;
    // fréquence
    s += T(hr, 70, -116, hr.length > 2 ? 46 : 56, { c: on ? "f-accent" : "f-main2" });
    s += F("M44 -176C44 -184 54 -184 54 -177C54 -184 64 -184 64 -176C64 -169 54 -164 54 -161C54 -164 44 -169 44 -176Z", on ? "f-accent" : "f-main2", { wob: 0 });
    // boutons
    for (let k = 0; k < 3; k++) s += S(ell(-96 + k * 26, -52, 7, 7), k === 0 ? "f-main" : "f-white", W3(), { seed: k });
    s += S(rr(52, -59, 56, 14, 7), "f-white", W3());
    return s;
  });

  /* ═════════════════════════ 8. HORLOGE ═════════════════════════ */
  /* wallClock({time:"08:45", r:74}) — horloge murale. Taille 2r × 2r. Ancre : centre (0,0). */
  const wallClock = memo("wallClock", (o) => {
    const r = o.r || 74;
    const m = /^(\d{1,2})[:.h](\d{2})/.exec(o.time || "08:45") || [0, 8, 45];
    const hh = +m[1], mm = +m[2];
    const aM = mm * 6, aH = ((hh % 12) + mm / 60) * 30;
    let s = S(ell(0, 0, r, r), "f-white", W() * 1.5);
    for (let k = 0; k < 12; k++) {
      const a = (k * Math.PI) / 6, big = k % 3 === 0;
      const r0 = r - (big ? 20 : 15), r1_ = r - 9;
      s += O(ln(r1(Math.sin(a) * r0), r1(-Math.cos(a) * r0), r1(Math.sin(a) * r1_), r1(-Math.cos(a) * r1_)), big ? W2() : W3(), { taper: 1, wob: 0.3 });
    }
    const hand = (len, w0, w1) => F(pg([[-w0, 9, w0], [w0, 9, w0], [w1, -len, w1], [-w1, -len, w1]]), "ink", { wob: 0.3 });
    s += G(hand(r * 0.5, 4.4, 3), `rotate(${r1(aH)})`);
    s += G(hand(r * 0.76, 3.4, 2), `rotate(${r1(aM)})`);
    s += F(ell(0, 0, 6.5, 6.5), "f-accent");
    return s;
  });

  /* ═════════════════════════ 9. PORTE, FENÊTRE, DESSINS ═════════════════════════ */
  /* door({number:"204", w:330, h:760}) — porte de chambre avec oculus et plaque de numéro.
   * Taille 330 × 760. Ancre : bas-gauche au sol (0,0). Plaque : centre (240, −590). Poignée : (46…118, −372). */
  const door = memo("door", (o) => {
    const number = o.number != null ? o.number : "204";
    let s = S(pg([[0, 0], [0, -760, 7], [330, -760, 7], [330, 0]]), "f-white");
    s += S(pg([[20, 0], [20, -740, 3], [310, -740, 3], [310, 0]]), "f-main2");
    s += F("M22 -64L308 -64L308 0L22 0Z", "f-gray2", { wob: 0.5 }) + O(ln(20, -64, 310, -64), W2(), { taper: 1 });
    // oculus
    s += S(rr(52, -664, 64, 236, 9), "f-white");
    s += O(ln(66, -590, 96, -628), W3()) + O(ln(70, -548, 102, -590), W3(), { seed: 2 });
    // poignée
    s += S(rr(40, -404, 24, 74, 9), "f-gray2", W2());
    s += S(rr(46, -381, 74, 15, 7), "ink", 2);
    // plaque
    if (number) {
      s += S(rr(186, -624, 108, 64, 9), "f-white", W2());
      s += T(number, 240, -577, clamp(110 / (String(number).length || 1), 18, 42));
    }
    s += S(rr(303, -640, 9, 34, 3), "ink", 1.5) + S(rr(303, -180, 9, 34, 3), "ink", 1.5, { seed: 2 });
    return s;
  });

  /* window({w:320, h:380}) — fenêtre à deux vantaux avec tablette. Taille ≈ 364 × 414.
   * Ancre : centre du cadre (0,0). Cadre : ±160 × ±190 ; tablette : y 190 → 212. */
  const windowProp = memo("window", () => {
    let s = S(rr(-160, -190, 320, 380, 5), "f-white");
    for (const x of [-142, 10]) {
      s += S(rr(x, -172, 132, 344, 3), "f-main2", W2(), { seed: x });
    }
    s += F("M-118 -62C-126 -84 -100 -96 -88 -84C-80 -104 -46 -100 -46 -78C-28 -80 -24 -58 -38 -54L-108 -54C-116 -54 -120 -58 -118 -62Z", "f-white");
    s += O(ln(44, -96, 84, -142), W3()) + O(ln(52, -52, 104, -112), W3(), { seed: 2 });
    s += S(rr(-7, -22, 14, 46, 6), "ink", 1.5);
    s += S(rr(-182, 190, 364, 22, 7), "f-white");
    return s;
  });

  /* kidsDrawings() — trois dessins d'enfants épinglés (service de pédiatrie).
   * Taille ≈ 350 × 160. Ancre : centre (0,0). */
  const kidsDrawings = memo("kidsDrawings", () => {
    const sheet = (inner, x, y, rot, sd) =>
      G(S(rr(-50, -62, 100, 124, 2), "f-white", W2(), { seed: sd }) + inner + S(ell(0, -52, 5.5, 5.5), "f-accent", 2), `translate(${x} ${y}) rotate(${rot})`);
    // soleil
    let a = S(ell(0, -6, 17, 17), "f-accent2", W3());
    for (let k = 0; k < 8; k++) {
      const t = (k * Math.PI) / 4 + 0.3;
      a += O(ln(r1(Math.cos(t) * 24), r1(-6 + Math.sin(t) * 24), r1(Math.cos(t) * 33), r1(-6 + Math.sin(t) * 33)), W3(), { seed: k });
    }
    a += O("M-36 42C-22 34 -10 48 4 40C16 34 26 46 38 40", W3(), { c: "f-main" });
    // maison
    let b = S(pg([[-24, 44, 1], [-24, 2, 1], [24, 0, 1], [25, 44, 1]]), "f-main2", W3());
    b += S(pg([[-32, 3, 2], [-1, -28, 2], [32, 1, 2]]), "f-accent", W3());
    b += S(rr(-6, 20, 14, 24, 1), "f-white", W3());
    // fleur
    let c = O("M0 44C-2 26 3 14 0 0", W3(), { c: "f-main" }) + O("M0 28C10 24 16 18 18 10", W3(), { c: "f-main" });
    for (let k = 0; k < 5; k++) {
      const t = (k * 2 * Math.PI) / 5 - 1.2;
      c += S(ell(r1(Math.cos(t) * 15), r1(-12 + Math.sin(t) * 15), 9.5, 9.5), "f-accent2", W3(), { seed: k });
    }
    c += S(ell(0, -12, 7, 7), "f-accent", W3());
    return sheet(a, -118, 4, -6, 1) + sheet(b, 0, -8, 4, 2) + sheet(c, 120, 8, -3, 3);
  });

  /* ═════════════════════════ 10. NOURRISSON EMMAILLOTÉ ═════════════════════════ */
  /* babyBundle({wrap:"f-accent2", cap:"f-main2"}) — bébé emmailloté, debout (tête en haut), sans visage.
   * Taille ≈ 108 × 190. Ancre : centre (0,0) ; tête : centre (0, −52), sommet du bonnet y = −97, bas y = +92.
   * Pour le coucher dans le lit (tête à gauche) : rotate(−90) puis poser sur le matelas (demi-épaisseur ≈ 52). */
  const babyBundle = memo("babyBundle", (o) => {
    const wrap = o.wrap || "f-accent2", cap = o.cap || "f-main2";
    let s = S(ell(0, -52, 31, 32), "f-white");
    s += S("M-33 -34C-54 -4 -52 50 -31 76C-15 95 15 95 31 76C52 50 54 -4 33 -34C22 -22 -22 -22 -33 -34Z", wrap);
    s += O("M-30 -30C-12 -6 10 12 24 46", W2());
    s += O("M31 -31C22 -16 10 -6 -3 2", W2(), { seed: 2 });
    s += S("M-31 -62C-34 -98 34 -98 31 -62Z", cap);
    s += S("M-34 -62C-34 -72 34 -72 34 -62C34 -52 -34 -52 -34 -62Z", cap, W2());
    return s;
  });

  /* ═════════════════════════ 11. TRIBUNAL ═════════════════════════ */
  /* judgeBench({w:640, h:420, label:"Landgericht Bielefeld"}) — estrade/pupitre du juge, vue de face.
   * Taille w × h. Ancre : bas-gauche au sol (0,0).
   * DESSUS du pupitre : y = −h (−420), de x = 0 à w ; dessiner le juge AVANT le pupitre, pieds vers y ≈ −60,
   * pour qu'il dépasse à partir du milieu du buste. Plaque : centre (w/2, −h + 108). */
  const judgeBench = memo("judgeBench", (o) => {
    const w = o.w || 640, h = o.h || 420;
    const label = o.label != null ? o.label : "Landgericht Bielefeld";
    let s = S(pg([[18, 0], [18, -h + 20, 2], [w - 18, -h + 20, 2], [w - 18, 0]]), "f-wood2");
    const n = w > 500 ? 3 : 2, gap = 22, pw = (w - 36 - gap * (n + 1)) / n;
    for (let k = 0; k < n; k++) {
      const x = 18 + gap + k * (pw + gap);
      s += S(rr(x, -h + 54, pw, h - 54 - 62, 5), "f-wood", W2(), { seed: k });
    }
    s += S(pg([[6, 0], [6, -36, 5], [w - 6, -36, 5], [w - 6, 0]]), "f-wood");
    s += S(rr(0, -h, w, 28, 9), "f-wood");
    if (label) {
      const lw = Math.min(w - 90, Math.max(240, label.length * 17 + 60));
      s += S(rr(w / 2 - lw / 2, -h + 76, lw, 64, 8), "f-white", W2());
      s += T(label, w / 2, -h + 119, clamp(((lw - 40) / (label.length || 1)) * 1.85, 16, 32));
    }
    return s;
  });

  /* gavel({angle:0, block:true}) — marteau du juge + socle.
   * Taille ≈ 240 × 110 au repos. Ancre : bas-centre du socle (0,0) ; dessus du socle y = −22.
   * angle (degrés) lève le marteau autour du bout du manche, pivot (176, −61). angle = 0 : posé sur le socle. */
  const gavel = memo("gavel", (o) => {
    let s = "";
    if (o.block !== false) s += S(rr(-74, -22, 148, 22, 9), "f-wood");
    let g = S(rr(18, -68, 164, 15, 7), "f-wood2");
    g += S(rr(-30, -100, 60, 78, 9), "f-wood");
    g += F(rr(-30, -88, 60, 8, 0), "ink", { wob: 0.5 }) + F(rr(-30, -42, 60, 8, 0), "ink", { wob: 0.5, seed: 2 });
    return s + G(g, `rotate(${r1(o.angle || 0)} 176 -61)`);
  });

  /* courtChairs({n:3}) — rangée de chaises en bois, vue de face. Taille ≈ (n·150 − 20) × 262.
   * Ancre : bas-gauche au sol (0,0). Assise : y = −132 ; chaise k : x de k·150 à k·150 + 130. */
  const courtChairs = memo("courtChairs", (o) => {
    const n = o.n || 3;
    let s = "";
    for (let k = 0; k < n; k++) {
      const x = k * 150;
      s += S(rr(x + 12, -104, 15, 104, 3), "f-wood", W2(), { seed: k }) + S(rr(x + 103, -104, 15, 104, 3), "f-wood", W2(), { seed: k + 9 });
      s += S(rr(x + 12, -262, 106, 136, [20, 20, 4, 4]), "f-wood2", 0, { seed: k });
      s += O(ln(x + 46, -244, x + 46, -140), W3(), { seed: k }) + O(ln(x + 84, -244, x + 84, -140), W3(), { seed: k + 4 });
      s += S(rr(x, -132, 130, 28, 9), "f-wood", 0, { seed: k });
    }
    return s;
  });

  /* courtDoor({label:"Saal 1"}) — porte à deux battants de salle d'audience.
   * Taille 440 × 800 (+ plaque jusqu'à −858). Ancre : bas-gauche au sol (0,0). Jointure des battants : x = 220. */
  const courtDoor = memo("courtDoor", (o) => {
    const label = o.label != null ? o.label : "Saal 1";
    let s = S(pg([[0, 0], [0, -800, 8], [440, -800, 8], [440, 0]]), "f-wood");
    for (const x of [24, 222]) {
      s += S(pg([[x, 0], [x, -776, 3], [x + 194, -776, 3], [x + 194, 0]]), "f-wood2", 0, { seed: x });
      s += O(rr(x + 30, -740, 134, 300, 6), W2(), { seed: x });
      s += O(rr(x + 30, -400, 134, 340, 6), W2(), { seed: x + 1 });
    }
    s += S(rr(196, -470, 13, 92, 6), "ink", 2) + S(rr(231, -470, 13, 92, 6), "ink", 2, { seed: 2 });
    if (label) {
      const lw = Math.max(130, label.length * 20 + 50);
      s += S(rr(220 - lw / 2, -858, lw, 50, 8), "f-white", W2());
      s += T(label, 220, -823, 30);
    }
    return s;
  });

  /* ═════════════════════════ 12. DOSSIER, TAMPON ═════════════════════════ */
  /* akteFolder({title:"AKTE 01", sub:"Bielefeld · 2011", open:0..1}) — dossier kraft, vue de face.
   * Taille fermée 400 × 544 (onglet compris). Ancre : centre du dossier fermé (0,0) ; reliure en x = −200.
   * open : 0 = fermé ; 0.5 = couverture de chant ; 1 = ouvert à plat (la couverture occupe alors x −600 → −200).
   * Feuille intérieure : x −184 → 188, y −244 → 246 (y poser le texte/les pièces quand open > 0.5). */
  const akteFolder = memo("akteFolder", (o) => {
    const title = o.title != null ? o.title : "AKTE 01", sub = o.sub != null ? o.sub : "Bielefeld · 2011";
    const op = clamp(o.open || 0, 0, 1), th = op * Math.PI, c = Math.cos(th), sn = Math.sin(th);
    let s = S(pg([[-200, -260, 8], [40, -260, 6], [58, -284, 8], [184, -284, 8], [200, -260, 6], [200, 260, 8], [-200, 260, 8]]), "f-wood");
    if (op > 0.02) {
      s += G(S(rr(-182, -240, 372, 490, 3), "f-gray2", W2()), "rotate(1.2)");
      s += S(rr(-184, -244, 372, 490, 3), "f-white", W2());
      s += F(rr(-150, -206, 150, 13, 6), "f-gray");
      for (let k = 0; k < 9; k++) s += F(rr(-150, -160 + k * 38, k % 4 === 3 ? 190 : 300 - ((k * 37) % 50), 9, 4), "f-gray2", { seed: k });
    }
    const xe = -200 + 400 * c, ye = 260 + 34 * sn;
    const cover = pg([[-200, -260, 6], [r1(xe), r1(-ye), 8], [r1(xe), r1(ye), 8], [-200, 260, 6]]);
    if (Math.abs(c) < 0.03) return s + O(ln(-200, -ye, -200, ye), W() * 1.6, { taper: 1 });
    s += S(cover, c > 0 ? "f-wood2" : "f-wood");
    if (c > 0.12) {
      let in_ = F(rr(3, -257, 30, 514, 0), "f-wood", { wob: 0 }) + O(ln(34, -258, 34, 258), W2(), { taper: 1 });
      in_ += S(rr(74, -176, 280, 172, 8), "f-white", W2());
      in_ += F(rr(76, -174, 276, 20, 0), "f-main", { wob: 0.3 });
      in_ += T(title, 214, -82, clamp(430 / (title.length || 1), 24, 62));
      if (sub) in_ += T(sub, 214, -34, clamp(400 / (sub.length || 1), 14, 26), { c: "f-gray" });
      in_ += O(ln(88, 150, 300, 150), W3(), { c: "f-wood" }) + O(ln(88, 186, 240, 186), W3(), { c: "f-wood", seed: 2 });
      s += G(in_, `matrix(${r1(c * 100) / 100} ${r1((34 * sn) / 4) / 100} 0 1 -200 0)`);
    }
    return s;
  });

  /* stamp({text:"VERURTEILT", sub:null, rot:-7}) — empreinte de tampon encreur (accent), encrage irrégulier.
   * Taille ≈ (texte·34 + 70) × 96 (124 avec sub). Ancre : centre (0,0). Props.stampWidth(text) donne la largeur. */
  const stampWidth = (text) => Math.max(200, String(text || "").length * 34 + 70);
  const stamp = memo("stamp", (o) => {
    const text = String(o.text != null ? o.text : "VERURTEILT").toUpperCase(), sub = o.sub;
    const w = stampWidth(text), h = sub ? 124 : 96;
    const oo = { c: "f-accent", dry: true, vary: 0.35, wob: 1.6 };
    let s = O(rr(-w / 2, -h / 2, w, h, 14), 8 * K, oo);
    s += O(rr(-w / 2 + 13, -h / 2 + 13, w - 26, h - 26, 6), 3.4 * K, Object.assign({ seed: 3 }, oo));
    s += T(text, 0, sub ? 4 : 19, 54, { c: "f-accent", ls: 3 });
    if (sub) s += T(sub, 0, 38, 25, { c: "f-accent", ls: 1 });
    return G(s, `rotate(${o.rot != null ? o.rot : -7})`);
  });

  /* ═════════════════════════ 13. CALENDRIER ═════════════════════════ */
  /* calendarPage({date:"22.08.2011"}) — feuille d'éphéméride. Taille ≈ 240 × 296. Ancre : centre (0,0). */
  const MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  const calendarPage = memo("calendarPage", (o) => {
    const date = o.date != null ? o.date : "22.08.2011";
    const m = /^(\d{1,2})\.(\d{1,2})\.(\d{2,4})$/.exec(date);
    let s = G(S(rr(-112, -128, 230, 268, 8), "f-gray2", W2()), "rotate(2.5)");
    const page = pg([[-115, -135, 10], [115, -135, 10], [115, 135, 8], [-115, 135, 8]]);
    s += F(page, "f-white");
    s += F(pg([[-115, -135, 10], [115, -135, 10], [115, -72], [-115, -72]]), "f-accent");
    s += O(ln(-115, -72, 115, -72), W2(), { taper: 1 }) + O(page, W());
    for (const x of [-56, 56]) s += S(rr(x - 7, -156, 14, 40, 7), "f-gray2", W2(), { seed: x });
    if (m) {
      s += T(MONTHS[+m[2] - 1] || "", 0, -90, 34, { c: "f-white", ls: 1 });
      s += T(String(+m[1]), 0, 62, 128);
      s += T(m[3], 0, 110, 32, { c: "f-gray", ls: 2 });
    } else s += T(date, 0, 40, clamp(360 / (date.length || 1), 20, 90));
    return s;
  });

  /* ═════════════════════════ 14. BULLES, ÉTIQUETTES ═════════════════════════ */
  /* bubble({w:420, h:200, tail:"left"|"right"|"down"|"none"}) — bulle de parole.
   * Ancre : coin haut-gauche de la zone de texte (0,0) ; corps 0…w × 0…h ; la pointe descend jusqu'à y = h + 50
   * (pointe en (w·0.14, h+50) pour "left", (w·0.86, h+50) pour "right", (w/2, h+50) pour "down"). */
  const bubble = memo("bubble", (o) => {
    const w = o.w || 420, h = o.h || 200, tail = o.tail || "left", r = Math.min(36, h / 2.4, w / 2.4);
    const pts = [[0, 0, r], [w, 0, r], [w, h, r]];
    if (tail === "left") pts.push([w * 0.14 + 62, h, 2], [w * 0.14, h + 50, 3], [w * 0.14 + 14, h, 2]);
    else if (tail === "right") pts.push([w * 0.86 - 14, h, 2], [w * 0.86, h + 50, 3], [w * 0.86 - 62, h, 2]);
    else if (tail === "down") pts.push([w / 2 + 26, h, 2], [w / 2 - 4, h + 50, 3], [w / 2 - 24, h, 2]);
    pts.push([0, h, r]);
    return S(pg(pts), "f-white", 0, { seed: w });
  });

  /* thought({w:420, h:220}) — bulle de pensée (nuage) + deux petites bulles en bas à gauche.
   * Ancre : coin haut-gauche de la boîte du nuage (0,0) ; nuage 0…w × 0…h ; zone de texte utile ≈ marge de 34 px.
   * Petites bulles : (w·0.16, h + 22) et (w·0.08, h + 52). */
  const thought = memo("thought", (o) => {
    const w = o.w || 420, h = o.h || 220;
    const cx = w / 2, cy = h / 2, rx = w / 2 - 16, ry = h / 2 - 16;
    const n = Math.max(8, Math.round((w + h) / 52));
    const P = [], dense = [], e = 2 / 2.6;
    let tot = 0;
    for (let k = 0; k <= 360; k++) {
      const a = (k / 360) * Math.PI * 2 + 0.5, ca = Math.cos(a), sa = Math.sin(a);
      const p = [cx + rx * Math.sign(ca) * Math.pow(Math.abs(ca), e), cy + ry * Math.sign(sa) * Math.pow(Math.abs(sa), e)];
      if (k) tot += Math.hypot(p[0] - dense[k - 1][0], p[1] - dense[k - 1][1]);
      p[2] = tot; dense.push(p);
    }
    for (let k = 0, j = 0; k < n; k++) {
      const target = ((k + (hash2(k, n) - 0.5) * 0.3) / n) * tot;
      while (j < 360 && dense[j][2] < target) j++;
      P.push(dense[j]);
    }
    let d = `M${r1(P[0][0])} ${r1(P[0][1])}`;
    for (let k = 0; k < n; k++) {
      const a = P[k], b = P[(k + 1) % n];
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      let nx = mx - cx, ny = (my - cy) * (rx / ry);
      const nl = Math.hypot(nx, ny) || 1;
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const bulge = len * 0.42;
      d += `Q${r1(mx + (nx / nl) * bulge)} ${r1(my + (ny / nl) * bulge * 0.9)} ${r1(b[0])} ${r1(b[1])}`;
    }
    d += "Z";
    return S(d, "f-white", 0, { seed: w }) + S(ell(w * 0.16, h + 22, 15, 13), "f-white", W2()) + S(ell(w * 0.08, h + 52, 8.5, 7.5), "f-white", W2());
  });

  /* tag({text:"laut Urteil", kind:"main"|"accent"|"ink", size:28}) — petite étiquette « pilule » :
   * fond blanc, contour encre, pastille de couleur (pas de jaune). Hauteur 54 ; largeur = Props.tagWidth(text, size).
   * Ancre : centre (0,0). */
  const tagWidth = (text, size) => Math.round(String(text || "").length * (size || 28) * 0.5 + 78);
  const tag = memo("tag", (o) => {
    const text = o.text != null ? String(o.text) : "laut Urteil", size = o.size || 28;
    const w = tagWidth(text, size), kind = o.kind || "main";
    let s = S(rr(-w / 2, -27, w, 54, 27), "f-white", W2(), { seed: w });
    s += F(ell(-w / 2 + 28, 0, 8.5, 8.5), kind === "accent" ? "f-accent" : kind === "ink" ? "ink" : "f-main");
    s += T(text, -w / 2 + 48, size * 0.34, size, { a: "start" });
    return s;
  });

  /* ═════════════════════════ 15. FONDS ═════════════════════════ */
  /* roomBackdrop({w:1080, h:1920, floorY:1400, floor:"f-main2", wall:"f-paper"}) — chambre d'hôpital :
   * mur uni, plinthe claire (34 px) et sol. Ancre : coin haut-gauche (0,0). Les objets se posent à y = floorY. */
  const roomBackdrop = memo("roomBackdrop", (o) => {
    const w = o.w || 1080, h = o.h || 1920, fy = o.floorY != null ? o.floorY : 1400;
    let s = `<rect class="${o.wall || "f-paper"}" x="0" y="0" width="${w}" height="${h}"/>`;
    s += `<rect class="${o.floor || "f-main2"}" x="0" y="${fy}" width="${w}" height="${h - fy}"/>`;
    s += `<rect class="f-white" x="0" y="${fy - 34}" width="${w}" height="34"/>`;
    s += O(ln(-10, fy - 34, w + 10, fy - 34), W3(), { taper: 1, wob: 1.6 });
    s += O(ln(-10, fy, w + 10, fy), W(), { taper: 1, wob: 1.6, seed: 2 });
    return s;
  });

  /* courtBackdrop({w:1080, h:1920, floorY:1400, panelTop:floorY−620}) — salle d'audience :
   * mur clair en haut, lambris bois (panneaux verticaux) de panelTop jusqu'au sol, sol neutre.
   * Ancre : coin haut-gauche (0,0). Cimaise (dessus du lambris) : y = panelTop. */
  const courtBackdrop = memo("courtBackdrop", (o) => {
    const w = o.w || 1080, h = o.h || 1920, fy = o.floorY != null ? o.floorY : 1400;
    const pt = o.panelTop != null ? o.panelTop : fy - 620;
    let s = `<rect class="f-paper" x="0" y="0" width="${w}" height="${h}"/>`;
    s += `<rect class="f-wood2" x="0" y="${pt}" width="${w}" height="${fy - pt}"/>`;
    s += `<rect class="f-gray2" x="0" y="${fy}" width="${w}" height="${h - fy}"/>`;
    const n = Math.max(3, Math.round(w / 190)), pw = w / n;
    for (let k = 0; k < n; k++) {
      s += O(rr(k * pw + 26, pt + 62, pw - 52, fy - pt - 62 - 76, 6), W3(), { seed: k });
    }
    s += `<rect class="f-wood" x="0" y="${pt}" width="${w}" height="30"/>`;
    s += O(ln(-10, pt, w + 10, pt), W2(), { taper: 1, wob: 1.6 }) + O(ln(-10, pt + 30, w + 10, pt + 30), W3(), { taper: 1, wob: 1.6, seed: 2 });
    s += `<rect class="f-wood" x="0" y="${fy - 40}" width="${w}" height="40"/>`;
    s += O(ln(-10, fy - 40, w + 10, fy - 40), W3(), { taper: 1, wob: 1.6, seed: 3 });
    s += O(ln(-10, fy, w + 10, fy), W(), { taper: 1, wob: 1.6, seed: 4 });
    return s;
  });


  /* ═════════════════════════ 16. CATHÉTER, MAINS (gros plans) ═════════════════════════ */
  function sausage(d, width, f, o) {
    o = o || {};
    const g = prep(d, { wob: o.wob != null ? o.wob : 0.6, seed: o.seed });
    const poly = ribbon(g.pts, false, width, { vary: 0, taper: o.tp != null ? o.tp : 0.86 });
    return S(poly, f, o.w || W(), { wob: 0, seed: o.seed });
  }

  /* catheterPath({len:420}) -> { d, points:[[x,y]…], start:[66,0], end:[len,0] }
   * Axe de la tubulure de catheterLine() (mêmes coordonnées locales) : pour animer le liquide blanc, tracer ce
   * `d` avec un stroke blanc (≈ 5 px) et stroke-dasharray, ou parcourir `points` (un point tous les ~3 px). */
  function catheterPath(o) {
    const len = (o && o.len) || 420, a = 66, L = len - a;
    const d = `M${a} 0C${r1(a + L * 0.22)} 0 ${r1(a + L * 0.34)} 22 ${r1(a + L * 0.55)} 20C${r1(a + L * 0.76)} 18 ${r1(a + L * 0.84)} 2 ${len} 0`;
    return { d, points: flat(d).pts.map((p) => [r1(p[0]), r1(p[1])]), start: [a, 0], end: [len, 0] };
  }
  /* catheterLine({len:420, hub:true}) — tubulure fine de cathéter central avec embase (hub) Luer.
   * Taille ≈ len × 44. Ancre : entrée de l'embase (0,0) — y emboîter la pointe de la seringue (l'embout de
   * syringe() entre de ~24 px). Embase : x 0 → 66 ; tubulure (Ø ≈ 9, fond gray2 = vide) : de (66,0) à (len,0).
   * Axe exact : Props.catheterPath({len}). */
  const catheterLine = memo("catheterLine", (o) => {
    const cp = catheterPath(o);
    let s = sausage(cp.d, 9.5 * K + 2, "f-gray2", { w: W3(), tp: 1, wob: 0 });
    if (o.hub !== false) {
      s += S(pg([[0, -13, 4], [30, -13, 3], [38, -7, 3], [68, -5.5, 2], [68, 5.5, 2], [38, 7, 3], [30, 13, 3], [0, 13, 4]]), "f-main2", W2());
      s += S(rr(20, -21, 12, 42, 5), "f-main", W2());
    }
    return s;
  });

  /* handHoldingSyringe({side:"right"|"left", syringe:{…paramètres de syringe()}})
   * Main (peau blanche) + manchette de blouse blanche qui tient le corps de syringe(), bras venant du bas.
   * Mêmes coordonnées et même ancre que syringe() : pointe de l'embout (0,0), axe y = 0.
   * Taille ≈ 531 × 400 (y −56 → +340 ; la manche est coupée en bas, à sortir du cadre ou à masquer).
   * "right" : pouce côté embout (main droite vue paume) ; "left" : miroir autour de x = 245.
   * Doigts : x 190 → 300 ; le « ? » / l'étiquette (x 64 → 172) reste visible. */
  const handHoldingSyringe = memo("handHoldingSyringe", (o) => {
    const so = Object.assign({ liquid: "milky", fill: 0.8, label: "?", tip: "stopper" }, o.syringe || {});
    const flip = (m) => (o.side === "left" ? G(m, "translate(490 0) scale(-1 1)") : m);
    // manche + paume (derrière la seringue)
    let back = S(pg([[200, 152, 12], [312, 146, 12], [336, 340], [184, 340]]), "f-white");
    back += O("M203 188C236 196 278 194 315 183", W2());
    back += S(ell(292, 218, 6.5, 6.5), "f-white", W3());
    back += S("M196 6L296 6C306 50 304 102 296 158L214 162C210 124 190 82 196 6Z", "f-white");
    // quatre doigts repliés par-dessus le corps (une seule silhouette) + pouce
    let front = S("M190 -28C190 -49 215 -49 217 -33C219 -51 242 -51 244 -34C246 -51 269 -50 271 -33C273 -48 299 -46 299 -27L299 12C299 29 274 30 272 16C271 35 246 37 245 21C244 37 219 37 218 21C216 33 190 31 190 14Z", "f-white");
    front += O("M217 -32C218 -12 218 4 218 20", W2(), { taper: 0.8 }) + O("M244 -33C245 -12 245 4 245 20", W2(), { taper: 0.8, seed: 2 }) + O("M271 -32C272 -12 272 2 272 15", W2(), { taper: 0.8, seed: 3 });
    front += S("M232 112C200 104 168 72 162 34C159 10 188 2 194 24C199 44 216 58 240 66C252 84 248 106 232 112Z", "f-white", 0, { seed: 4 });
    front += O("M206 76C214 72 222 72 230 76", W3());
    return flip(back) + syringeCore(so, false) + flip(front);
  });

  /* handsInjecting({push:0..1, fill:0.45, label:null, liquid:"milky"})
   * Gros plan clinique : deux mains (peau blanche, manchettes de blouse). La main de gauche tient la seringue
   * (index + majeur sur les ailettes) et pousse le piston avec le pouce ; la main de droite pince l'embase du
   * cathéter ; la tubulure sort vers la droite. Pas de patient, pas de sang.
   * Taille ≈ 980 × 480 : x 0 → 982, y −60 → 420 (manches coupées en bas, à sortir du cadre).
   * Ancre : (0,0) à gauche sur l'axe de la seringue (y = 0). La seringue est EN MIROIR : embout vers la droite,
   * pointe en (560, 0) ; corps x 260 → 520 ; ailettes x 248 → 263 ;
   * joint (face avant) : x = 512 − 200·fill·(1 − push) ; poussoir (face extérieure) : x = 229 − 200·fill·(1 − push).
   * Cathéter : catheterLine translaté de (536, 0), len 424 -> tubulure de (602, 0) à (960, 0) ;
   * axe en coordonnées de la scène : Props.catheterPath({len:424}) décalé de +536 en x. */
  const handsInjecting = memo("handsInjecting", (o) => {
    const push = clamp(o.push || 0, 0, 1), fill = o.fill != null ? o.fill : 0.45;
    const TX = 560, plate = TX - (stopperX(fill, push) + 283);
    let s = "";
    // manches
    s += S(pg([[160, 134, 12], [260, 242, 12], [106, 396], [4, 292]]), "f-white");
    s += O("M140 160C172 184 210 226 236 264", W2());
    s += S(ell(132, 244, 6.5, 6.5), "f-white", W3());
    s += S(pg([[826, 132, 12], [728, 250, 12], [882, 404], [982, 288]]), "f-white", 0, { seed: 5 });
    s += O("M848 158C820 190 782 236 756 276", W2(), { seed: 5 });
    // seringue (miroir) + cathéter
    s += G(syringeCore({ liquid: o.liquid || "milky", fill, push, label: o.label === undefined ? null : o.label, tip: "none", _mirror: true }, false), `translate(${TX} 0) scale(-1 1)`);
    s += G(catheterLine({ len: 424 }), "translate(536 0)");
    // main gauche : pouce sur le poussoir (mobile), puis paume + index/majeur devant le corps
    const tx = plate - 13, ty = 8;
    s += sausage(`M246 96C${r1(tx + 72)} 86 ${r1(tx + 26)} 52 ${r1(tx + 3)} ${ty}`, 40, "f-white", { seed: 4, wob: 0.3, tp: 0.9 });
    s += S("M266 56L264 -18C264 -42 296 -42 297 -20C297 -47 330 -47 331 -24L333 44C356 46 360 76 341 86C357 95 352 125 330 127C322 154 300 182 276 202L246 230L170 150C192 134 206 108 222 84C234 68 250 60 266 56Z", "f-white", 0, { seed: 2 });
    s += O("M297 -20C298 4 298 24 300 46", W2(), { taper: 0.8 });
    s += O("M333 44C326 48 321 54 319 62", W2()) + O("M341 86C332 88 326 93 323 100", W2(), { seed: 2 });
    s += O("M270 2C276 5 284 5 291 2", W3()) + O("M303 -2C309 1 317 1 325 -2", W3(), { seed: 2 });
    // main droite : index + pouce pincent l'embase, paume et doigts repliés
    s += sausage("M684 78C672 38 646 -12 598 -21", 37, "f-white", { seed: 5, tp: 0.9 });
    let rh = S("M712 66C748 64 780 90 798 116L846 166L770 260L730 228C712 228 694 218 688 205C668 205 654 189 660 171C644 165 640 141 656 131C646 114 660 93 680 92C688 77 700 68 712 66Z", "f-white", 0, { seed: 6 });
    rh += O("M688 205C692 198 698 194 706 192", W2()) + O("M660 171C666 167 674 166 682 168", W2(), { seed: 2 }) + O("M656 131C664 130 672 132 678 137", W2(), { seed: 3 });
    s += G(rh, "translate(-30 -22)");
    s += sausage("M676 126C652 110 634 62 596 32", 39, "f-white", { seed: 6, tp: 0.9 });
    s += O("M634 70C641 67 648 68 654 73", W3(), { seed: 3 });
    return s;
  });

  global.Props = {
    syringe, oralSyringe, syringeGeom, SYRINGE: SYR,
    bottle, vial, bloodTube,
    hospitalBed, bedsideCabinet, ivPole, monitor, wallClock,
    door, window: windowProp, kidsDrawings, babyBundle,
    judgeBench, gavel, courtChairs, courtDoor,
    akteFolder, stamp, stampWidth, calendarPage,
    bubble, thought, tag, tagWidth,
    catheterLine, catheterPath, handHoldingSyringe, handsInjecting,
    roomBackdrop, courtBackdrop,
    setWeight(k) { K = k || 1; cache.clear(); },
    FONT,
  };
})(window);
