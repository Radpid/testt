/* AKTE 03 — « ما قالت والو » (OLG Köln, Urteil v. 27.01.2025, 5 U 69/24 · LG Köln 21.05.2024, 3 O 51/20).
 * Refait entièrement dans le style du skill : personnages Persona neufs (Assistenzärztin, Oberärztin, Dr. K, patiente,
 * mari, juge, Chefarzt), décors decor.js (tribunal, bloc, poche d'eau distillée, utérus + caméra, globules, mot caché,
 * scotch, échelle de la hiérarchie, escalier de la règle), intro de l'auteur, scène muette du décès.
 * Zones Instagram : contenu entre x 90 et 990 ; rien dans la colonne de boutons (x > 915, y 980–1650).
 */
(function () {
  "use strict";
  const SC = SketchCast, K = Cast, W = 1080, U = SC.util, MAT = SC.MAT, INK = SC.INK;
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, a, p) => { const n = document.createElementNS(NS, tag); for (const k in a || {}) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; };
  const isLatin = (s) => /[A-Za-z0-9]/.test(s) && !/[؀-ۿ]/.test(s);
  const SKY_D = [214, 232, 240], SKY_E = [246, 196, 140], SKY_N = [52, 60, 92];
  const mixc = (a, b, t) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;

  window.SV_BUILD = (sv) => {
    const st = Stage.create(sv, { view: { s: 1.06, oy: -20, breathe: 0.04 } }), T = (x) => st.T(x), E = Stage.E, prog = Stage.prog, lerp = Stage.lerp, clamp = Stage.clamp;

    function kit(c) {
      const k = {
        bg() { SketchUI.dots(c); },
        ground(x, y, w) { return c.sk((g, p) => SC.ground(g, p), () => ({ w, seed: Math.round(x) }), x, y, 1); },
        person(x, y, s, fn, parent) { return c.sk((g, p) => SC.person(g, p), fn, x, y, s, 0, parent); },
        baby(x, y, s, fn, parent) { return c.sk((g, p) => SC.baby(g, p), fn, x, y, s, 0, parent); },
        prop(kind, x, y, s, fn, rot = 0, parent) { return c.sk((g, p) => SC[kind](g, p), fn, x, y, s, rot, parent); },
        cast(kind, o, parent) { const g = el("g"); K[kind](g, o); return c.node(g, parent); },
        // ruban titre (blanc + surligneur jaune) ou jaune
        ribbon(text, x, y, o = {}) {
          const size = o.size || 76, lat = isLatin(text);
          const w = o.w || Math.max(260, text.length * size * (lat ? 0.5 : 0.42) + 150);
          return c.sk((g, p) => SC.ribbon(g, p), () => ({ text, w, h: size * 1.45, size, style: o.style || "white", rot: o.rot != null ? o.rot : -2,
            font: lat ? "Kalam, sans-serif" : "Lalezar, Kalam, sans-serif", rtl: !lat, seed: o.seed || 61 }), x, y, 1, 0, o.parent);
        },
        // bandeau surligneur jaune derrière un texte
        marker(x, y, w, h, rot = -1.5) { const g = el("g", { transform: `translate(${x} ${y})` }); SC.marker(g, { w, h, rot }); return c.node(g); },
        // pastille grise hachurée (comme NumPy / Python dans la référence) + traduction arabe dessous
        chip(de, ar, x, y, size = 44, o = {}) {
          const g = el("g", { transform: `translate(${x} ${y})` });
          const w = o.w || Math.max(120, de.length * size * 0.52 + 60), h = size * 1.5;
          const C = SC.util.ctx(g, o.seed || Math.round(x + y), false, 1);
          el("path", { d: SC.util.rrect(-w / 2, -h / 2, w, h, 14), fill: "#CDCDC6", transform: "translate(6 7)" }, g);
          SC.util.shape(C, "chip", SC.util.rrect(-w / 2, -h / 2, w, h, 14), o.yellow ? SC.MAT.yellow : SC.MAT.grey, { sw: 2.8 });
          const arab = /[؀-ۿ]/.test(de);
          SC.util.text(g, de, 0, size * 0.36, size, arab ? { rtl: true, font: "'Plex Arabic', Kalam, sans-serif", weight: 700 } : {});
          if (ar) {   // traduction arabe : bien détachée de la pastille (et de son ombre), avec un contour papier pour rester lisible
            const gs = Math.max(26, Math.round(size * 0.82));
            const tx = SC.util.text(g, ar, 0, h / 2 + 7 + 13 + gs * 0.95, gs, { font: "'Plex Arabic', sans-serif", weight: 700, fill: "#2E2C28", rtl: true });
            tx.setAttribute("stroke", "#F7F7F1"); tx.setAttribute("stroke-width", "7"); tx.setAttribute("stroke-linejoin", "round"); tx.setAttribute("paint-order", "stroke");
          }
          return c.node(g, o.parent);
        },
        // carte (rectangle à main levée + ombre)
        card(x, y, w, h, o = {}) {
          const g = el("g"); const C = SC.util.ctx(g, o.seed || Math.round(x * 3 + y), false, 1);
          el("path", { d: SC.util.rrect(x, y, w, h, 18), fill: "#D2D2CB", transform: "translate(7 9)" }, g);
          SC.util.shape(C, "card", SC.util.rrect(x, y, w, h, 18), o.yellow ? SC.MAT.yellow : SC.MAT.white, { sw: 3 });
          return c.node(g, o.parent);
        },
        title(text, x, y, size = 96, o = {}) {
          const lat = isLatin(text);
          const n = c.text(text, x, y, size, lat ? "de" : "ttl", o.anchor || "middle", o.parent);
          return n;
        },
        ar(text, x, y, size = 34, cls = "ar strong", parent) { return c.text(text, x, y, Math.max(40, Math.round(size * 1.3)), cls === "ar" ? "ar strong" : cls, "middle", parent); },
        // personnage qui marche de x0 à x1 (cycle de marche), puis pose finale
        walker(o) {
          const a = T(o.at), d = o.dur || 1.6;
          const n = k.person(0, 0, o.s, (t) => {
            const p = prog(t, a, d), moving = p > 0 && p < 1;
            const base = Object.assign({ outfit: o.outfit, seed: o.seed || 3, facing: o.x1 >= o.x0 ? 1 : -1, expr: o.expr || "neutral" }, o.extra || {});
            if (moving) return Object.assign(base, SC.Pose[o.run ? "run" : "walk"](((t - a) * (o.run ? 1.8 : 1.25)) % 1));
            const after = o.after ? o.after(t) : null;
            return Object.assign(base, p >= 1 ? (after || SC.Pose.stand) : (o.before || SC.Pose.stand), p >= 1 && o.endFacing ? { facing: o.endFacing } : {});
          }, o.parent);
          n.add((t, s) => { const p = clamp((t - a) / d, 0, 1); s.x += lerp(o.x0, o.x1, p); s.y += o.y; });
          return n;
        },
        // bulle de dialogue / pensée (style trait)
        bubble(o) { const g = el("g"); K.bubble(g, o); return c.node(g); },
      };
      return k;
    }





    /* ---------- décors dessinés pour cet épisode ---------- */
    function building(g, o) {   // origine : bas-centre
      const C = U.ctx(g, o.seed || 7, false, 1), w = o.w, h = o.h;
      el("path", { d: U.rrect(-w / 2, -h, w, h, 6), fill: "#D2D2CB", transform: "translate(8 8)" }, g);
      U.shape(C, "wall", U.rrect(-w / 2, -h, w, h, 6), o.mat || MAT.white, { sw: 3.4 });
      U.shape(C, "roof", `M${-w / 2 - 14} ${-h} L${w / 2 + 14} ${-h} L${w / 2} ${-h - 22} L${-w / 2} ${-h - 22} Z`, MAT.grey, { sw: 3 });
      const cols = o.cols || 3, rows = o.rows || 3, ww = 44, wh = 52, gx = (w - cols * ww) / (cols + 1), gy = (h - 150 - rows * wh) / (rows + 1);
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const x = -w / 2 + gx + c * (ww + gx), y = -h + 70 + gy + r * (wh + gy), lit = o.lit && o.lit(r, c);
        U.shape(C, `w${r}${c}`, U.rrect(x, y, ww, wh, 4), lit ? MAT.yellow : { base: "#EAF1F4" }, { sw: 2.4 });
      }
      U.shape(C, "door", U.rrect(-30, -96, 60, 96, 6), MAT.grey, { sw: 2.8 });
      if (o.sign) { U.shape(C, "sign", U.rrect(-o.sign.length * 15 - 20, -h + 14, o.sign.length * 30 + 40, 46, 8), o.signMat || MAT.yellow, { sw: 2.8 }); U.text(g, o.sign, 0, -h + 48, 32, {}); }
      if (o.cross) { el("path", { d: `M-14 ${-h + 18} h28 v18 h18 v28 h-18 v18 h-28 v-18 h-18 v-28 h18 Z`, fill: "#E05A4F", stroke: INK, "stroke-width": 2.5, transform: `translate(${w / 2 - 50} 0)` }, g); }
    }
    function windowSky(g, o) {  // fenêtre de la chambre : o.p 0 (matin) → 1 (nuit)
      const C = U.ctx(g, 23, false, 1), p = o.p;
      const sky = p < 0.6 ? mixc(SKY_D, SKY_E, p / 0.6) : mixc(SKY_E, SKY_N, (p - 0.6) / 0.4);
      el("rect", { x: -150, y: -200, width: 300, height: 240, rx: 8, fill: sky }, g);
      const ang = Math.PI * (0.15 + 0.85 * p), cx = -110 * Math.cos(ang), cy = -40 - 130 * Math.sin(ang);
      if (p < 0.78) el("circle", { cx: cx.toFixed(1), cy: cy.toFixed(1), r: 26, fill: "#FFD45A", stroke: INK, "stroke-width": 2.5 }, g);
      else { el("circle", { cx: 70, cy: -140, r: 24, fill: "#F3F0DD", stroke: INK, "stroke-width": 2.5 }, g); [[-90, -150], [-40, -120], [20, -170], [110, -95]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 3, fill: "#F3F0DD" }, g)); }
      U.shape(C, "frame", U.rrect(-150, -200, 300, 240, 8), {}, { sw: 5 });
      U.stroke(C, "mv", "M0 -200 L0 40 M-150 -80 L150 -80", { sw: 3.5 });
      U.shape(C, "sill", U.rrect(-170, 40, 340, 18, 5), MAT.grey, { sw: 2.6 });
    }
    function car(g) {
      const C = U.ctx(g, 43, false, 1);
      U.shape(C, "body", "M-60 0 L-60 -26 L-36 -30 L-20 -52 L26 -52 L42 -30 L60 -26 L60 0 Z", MAT.yellow, { sw: 3 });
      U.shape(C, "win", "M-14 -46 L20 -46 L32 -31 L-28 -31 Z", { base: "#EAF1F4" }, { sw: 2 });
      [-34, 34].forEach((x, i) => el("circle", { cx: x, cy: 0, r: 13, fill: "#3A3A37", stroke: INK, "stroke-width": 2.5 }, g));
    }
    function uterusBreech(g, o) {   // utérus + bébé en siège (tête en haut)
      const C = U.ctx(g, 33, false, 1);
      U.shape(C, "ut", "M-150 -40 C -165 -230, 165 -230, 150 -40 C 140 50, 60 100, 34 170 L -34 170 C -60 100, -140 50, -150 -40 Z", { base: "#FBE6E4" }, { sw: 3.4 });
      const b = el("g", { transform: "translate(0 -20) rotate(90) scale(0.95)" }, g); SC.baby(b, { pose: "lying", state: "normal", eyes: "closed" });
      if (o.arrow) { U.stroke(C, "ar", "M190 -120 C 230 -60, 230 40, 190 100", { sw: 4 }); U.stroke(C, "ah", "M176 86 L190 104 L206 84", { sw: 4 }); }
    }
    function scale(g, o) {      // balance : gauche « الخطة », droite « المريض » ; o.tilt en degrés (positif = droite plus lourde)
      const C = U.ctx(g, 59, false, 1);
      U.shape(C, "base", U.rrect(-90, -20, 180, 20, 6), MAT.grey, { sw: 3 });
      U.shape(C, "post", U.rrect(-10, -300, 20, 282, 6), MAT.white, { sw: 3 });
      const a = (o.tilt || 0) * Math.PI / 180, L = 230, c0 = L * Math.cos(a), s0 = L * Math.sin(a);
      U.stroke(C, "beam", `M${(-c0).toFixed(1)} ${(-300 - s0).toFixed(1)} L${c0.toFixed(1)} ${(-300 + s0).toFixed(1)}`, { sw: 5 });
      [[-L * Math.cos(a), -300 - L * Math.sin(a), o.left, 0], [L * Math.cos(a), -300 + L * Math.sin(a), o.right, 1]].forEach(([x, y, lab, i]) => {
        U.stroke(C, "c" + i, `M${x.toFixed(1)} ${y.toFixed(1)} L${(x - 60).toFixed(1)} ${(y + 110).toFixed(1)} M${x.toFixed(1)} ${y.toFixed(1)} L${(x + 60).toFixed(1)} ${(y + 110).toFixed(1)}`, { sw: 2.4 });
        U.shape(C, "p" + i, `M${(x - 80).toFixed(1)} ${(y + 110).toFixed(1)} L${(x + 80).toFixed(1)} ${(y + 110).toFixed(1)} C ${(x + 60).toFixed(1)} ${(y + 150).toFixed(1)}, ${(x - 60).toFixed(1)} ${(y + 150).toFixed(1)}, ${(x - 80).toFixed(1)} ${(y + 110).toFixed(1)} Z`, i ? MAT.yellow : MAT.white, { sw: 3 });
        U.text(g, lab, x, y + 96, 34, { font: "Lalezar, 'Plex Arabic', sans-serif", weight: 400, rtl: true });
      });
      el("circle", { cx: 0, cy: -300, r: 12, fill: "#fff", stroke: INK, "stroke-width": 3 }, g);
    }
    function warn(g, o) {
      const C = U.ctx(g, 61 + (o.n || 0), false, 1);
      U.shape(C, "t", "M0 -70 L64 44 L-64 44 Z", MAT.yellow, { sw: 4 });
      U.text(g, "!", 0, 30, 70, {});
      if (o.n) { el("circle", { cx: 54, cy: -50, r: 22, fill: "#fff", stroke: INK, "stroke-width": 3 }, g); U.text(g, String(o.n), 54, -40, 28, {}); }
    }
    function bars(g) {
      const C = U.ctx(g, 77, false, 1);
      U.shape(C, "frame", U.rrect(0, 0, 560, 640, 10), {}, { sw: 6 });
      for (let i = 1; i < 8; i++) U.shape(C, "bar" + i, U.rrect(i * 70 - 7, 6, 14, 628, 6), MAT.mid, { sw: 2.4 });
      U.shape(C, "cross", U.rrect(6, 230, 548, 16, 6), MAT.mid, { sw: 2.4 });
    }
    function licence(g, o) {    // « Approbation » déchirée en deux (o.cut 0..1)
      const C = U.ctx(g, 83, false, 1), d = 26 * (o.cut || 0);
      [[-1, "M-170 -110 L-6 -110 L8 -60 L-10 -10 L6 40 L-8 110 L-170 110 Z"], [1, "M-6 -110 L170 -110 L170 110 L-8 110 L6 40 L-10 -10 L8 -60 Z"]].forEach(([sgn, d0], i) => {
        const gg = el("g", { transform: `translate(${(sgn * d).toFixed(1)} ${(i ? d * 0.4 : 0).toFixed(1)}) rotate(${(sgn * d * 0.25).toFixed(1)})` }, g);
        U.shape(U.ctx(gg, 84 + i, false, 1), "half", d0, MAT.white, { sw: 3 });
      });
      U.text(g, "APPROBATION", 0, -56, 30, {}); U.text(g, "Ärztin · Hebamme", 0, -14, 22, { weight: 400 });
      [20, 50, 80].forEach((y, i) => U.stroke(C, "l" + i, `M-120 ${y} L120 ${y}`, { sw: 1.6, stroke: "#9A9A93" }));
    }

    const DE = [[8.6,54.9],[9.4,54.8],[10.0,54.5],[10.9,54.05],[11.6,54.15],[12.3,54.3],[13.0,54.45],[13.6,54.6],[14.2,53.9],
      [14.4,53.3],[14.6,52.6],[14.7,51.8],[15.0,51.1],[14.3,50.9],[13.5,50.6],[12.6,50.4],[12.1,50.3],[12.5,49.8],[13.0,49.3],
      [13.8,48.8],[13.4,48.3],[13.0,47.6],[12.2,47.6],[11.3,47.4],[10.5,47.5],[9.7,47.6],[8.6,47.6],[7.6,47.6],[7.6,48.1],
      [8.2,48.97],[7.0,49.1],[6.4,49.5],[6.1,50.1],[6.0,50.8],[6.1,51.2],[5.9,51.8],[6.8,52.1],[7.0,52.6],[7.2,53.2],
      [7.0,53.6],[8.0,53.7],[8.5,53.5],[8.9,53.9],[8.8,54.3]];

    const geoAt = (MX, MY, KM) => (lon, lat) => [MX + (lon - 10.5) * 0.626 * KM, MY - (lat - 51.2) * KM];
    const drawDE = (c, MX, MY, KM, fade) => {
      const geo = geoAt(MX, MY, KM), map = el("g"); const C = U.ctx(map, 4242, false, 1);
      el("path", { d: "M" + DE.map((p) => geo(...p).map((v) => v + 7).join(" ")).join(" L") + " Z", fill: "#D2D2CB" }, map);
      U.shape(C, "de", "M" + DE.map((p) => geo(...p).join(" ")).join(" L") + " Z", MAT.grey, { sw: 3.2 });
      const [lx, ly] = geo(13.4, 52.52); el("circle", { cx: lx, cy: ly, r: 7, fill: INK }, map); U.text(map, "Berlin", lx, ly - 16, 24, { fill: "#55524B" });
      const n = c.node(map); if (fade) n.fade(fade, 0.3); return geo;
    };
    const pinAt = (c, x, y, at) => {
      const pin = el("g", { transform: `translate(${x} ${y})` }); const P = U.ctx(pin, 77, false, 1);
      el("ellipse", { cx: 0, cy: 2, rx: 14, ry: 5, fill: "rgba(28,26,28,.25)" }, pin);
      U.shape(P, "pin", "M0 0 C-6 -14 -24 -30 -24 -48 A24 24 0 1 1 24 -48 C24 -30 6 -14 0 0 Z", MAT.yellow, { sw: 3 });
      el("circle", { cx: 0, cy: -48, r: 9, fill: "#FFFFFF", stroke: INK, "stroke-width": 3 }, pin);
      return c.node(pin).slide(at, 0, -160, 0.4, "back").wobble(st.T(at) + 0.4, 0.5, 6);
    };
    /* ---------- personnages (serie/lib/persona.js) : tous nouveaux pour AKTE 03 ---------- */
    const PE = Persona, PP = Persona.Pose, D = UnnaDecor;
    const blinkAt = (t, k) => { const q = (t + (k || 0) * 0.77) % 3.4; return q < 0.07 ? q / 0.07 : q < 0.14 ? (0.14 - q) / 0.07 : 0; };
    const talkAt = (t, a, b) => (t >= a && t < b ? (Math.floor(t / 0.11) % 3 === 0 ? 0.15 : 0.75) : 0);
    const rnd = (v, k = 20) => Math.round(v * k) / k;
    const pp = (x, y, s, fn, parent) => c_.sk((g, p) => PE.person(g, p), fn, x, y, s, 0, parent);
    const ph = (x, y, s, fn, rot) => c_.sk((g, p) => PE.head(g, p), fn, x, y, s, rot || 0);
    let c_ = null;   // scène courante
    const ASS = { look: "woman", hair: "ponytail", hairTone: "brown", outfit: "scrubs", seed: 71 };          // l'Assistenzärztin
    const OBE = { look: "woman", hair: "bob", hairTone: "dark", glasses: true, outfit: "scrubs", seed: 72 };  // l'Oberärztin (depuis 1 mois)
    const DRK = { look: "oldman", hair: "short", hairTone: "grey", beard: "moustache", outfit: "coat", badge: "Dr", seed: 73 };   // Oberarzt Dr. K
    const PAT = { look: "woman", hair: "shortcurly", hairTone: "brown", outfit: "casual", seed: 74 };        // la patiente (40 ans et quelques)
    const HUS = { look: "man", hair: "short", hairTone: "brown", beard: "short", outfit: "jacket", seed: 75 }; // son mari
    const JUD = { look: "oldwoman", hair: "bob", hairTone: "grey", glasses: true, outfit: "robe", seed: 76 }; // la juge
    const CHF = { look: "oldman", hair: "bald", hairTone: "grey", glasses: true, outfit: "coat", badge: "Dr", seed: 77 };   // Chefarzt
    const breathe = (k) => (t, s) => { s.y += Math.sin(t * 2.6 + (k || 0)) * 2; };
    const bgd = (c, fn, x, y, s, o) => { const g = el("g"); fn(g, o || {}); return c.node(g).on((t, st2) => { st2.x += x || 0; st2.y += y || 0; if (s && s !== 1) st2.s *= s; }); };
    const CAP_O = { col: "#DCEAF0", hatch: "#8FB5C4" }, CAP_A = { col: "#EDE3F2", hatch: "#B49CC4", dot: "#F8CE4E" };
    // bonnet de bloc posé sur la tête d'un personnage (suit la tête, même mouvement que le corps : mod)
    const capOn = (c, node, X, Y, S, opt, mod) => c.sk((g, p) => D.scrubCap(g, opt), () => ({}), 0, 0, 1).on((t, s2) => {
      const h = node.out && node.out.head; if (!h) { s2.o *= 0; return; }
      s2.x += X + h[0] * S; s2.y += Y + h[1] * S; s2.s *= S; if (mod) mod(t, s2); });
    const rl = (o, sc, pt) => [rnd((pt[0] - o[0]) / sc, 2), rnd((pt[1] - o[1]) / sc, 2)];
    const walkTo = (base, t, a, d, facing) => Object.assign({}, base, prog(t, a, d) > 0 && prog(t, a, d) < 1 ? PP.walk((((t - a) * 1.7) % 1 + 1) % 1) : PP.stand, prog(t, a, d) > 0 && prog(t, a, d) < 1 ? { view: "side", facing } : {});
    const tapeOn = (c, node, X, Y, S, at, peelAt) => c.sk((g, p) => D.tape(g, p), (t) => ({ peel: peelAt ? rnd(E.inOut(prog(t, peelAt, 0.45)), 20) : 0 }), 0, 0, 1)
      .on((t, s) => { const m = node.out && node.out.mouth; if (!m) { s.o *= 0; return; } s.x += X + m[0] * S; s.y += Y + m[1] * S + 2; s.s *= S * 0.95; })
      .pop(at, 0.22, 1.35);
    const bubble = (c, x, y, w, h, tail) => c.put(`<g><path d="${U.rrect(x - w / 2, y - h / 2, w, h, 28)}" fill="#D2D2CB" transform="translate(6 7)"/><path d="${U.rrect(x - w / 2, y - h / 2, w, h, 28)}" fill="#FFFFFF" stroke="${INK}" stroke-width="3.4"/>`
      + (tail ? `<path d="M${tail[0] - 18} ${y + h / 2 - 2} L${tail[0]} ${tail[1]} L${tail[0] + 18} ${y + h / 2 - 2} Z" fill="#FFFFFF" stroke="${INK}" stroke-width="3.4" stroke-linejoin="round"/><path d="M${tail[0] - 15} ${y + h / 2 - 2} L${tail[0] + 15} ${y + h / 2 - 2}" stroke="#FFFFFF" stroke-width="6"/>` : "") + `</g>`);
    const cloud = (c, x, y, w, h, from) => c.put(`<g>${[[from[0], from[1], 10], [from[0] + (x - from[0]) * 0.3, from[1] + (y + h / 2 - from[1]) * 0.35, 16], [from[0] + (x - from[0]) * 0.55, from[1] + (y + h / 2 - from[1]) * 0.68, 24]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#FFFFFF" stroke="${INK}" stroke-width="3"/>`).join("")}
      <path d="M${x - w / 2 + 40} ${y + h / 2} C ${x - w / 2 - 30} ${y + h / 2}, ${x - w / 2 - 30} ${y - h / 2 + 60}, ${x - w / 2 + 50} ${y - h / 2 + 30} C ${x - w / 2 + 70} ${y - h / 2 - 40}, ${x + w / 2 - 70} ${y - h / 2 - 40}, ${x + w / 2 - 50} ${y - h / 2 + 30} C ${x + w / 2 + 30} ${y - h / 2 + 60}, ${x + w / 2 + 30} ${y + h / 2}, ${x + w / 2 - 40} ${y + h / 2} Z" fill="#FFFFFF" stroke="${INK}" stroke-width="3.4"/></g>`);

    /* ═══════ 1 · l'accroche : au tribunal, « tu es personnellement responsable de la mort d'une patiente » ═══════ */
    st.scene({ from: 0, in: "cut", inDur: 0, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const m = T("b2@مسؤولة"), dth = T("b2@الموت"), sh = T("b2@شخصيا");
      c.camera([{ at: 0, s: 1.0, cx: 540, cy: 930 }, { at: sh, s: 1.04, cx: 520, cy: 940, d: 0.4 }]);
      bgd(c, D.room, 0, 0, 1, { wall: "#F1ECE2", tileTop: 900, tileFill: "#E4D9C6", tileLine: "#C9B99B", tile: 120, floor: "#DCCFB8", floorLine: "#C2B293" });
      bgd(c, D.bookshelf, 830, 470, 0.8, { seed: 516 });
      c.put(`<g><rect x="96" y="440" width="170" height="150" rx="6" fill="#E4D9C6" stroke="${INK}" stroke-width="3"/><rect x="110" y="454" width="142" height="122" rx="4" fill="#EFE7D8" stroke="#B9A98C" stroke-width="2"/></g>`);
      c.text("Im Namen des Volkes", 181, 492, 17, "de"); c.text("§", 181, 556, 50, "de");
      // le mur : l'emblème de la justice, derrière la juge
      c.put(`<g transform="translate(640 650)"><circle r="80" fill="#FFFFFF" stroke="${INK}" stroke-width="4"/><circle r="70" fill="none" stroke="#D2D2CB" stroke-width="3"/></g>`);
      const em = el("g"); D.scalesEmblem(em, 1.4); c.node(em).on((t, s) => { s.x += 640; s.y += 655; });
      k.ground(540, 1300, 980);
      pp(640, 1300, 1.08, (t) => Object.assign({}, JUD, t >= m - 0.1 ? PP.point : PP.stand, { facing: -1, expr: t >= m - 0.1 ? "angry" : "focused", blink: rnd(blinkAt(t, 1)), talk: rnd(talkAt(t, T("b2@أنت"), T("b2@end")), 10), look2: [0.7, 0.1] }));
      const bn = el("g"); D.bench(bn, { w: 540 }); c.node(bn).on((t, s) => { s.x += 630; s.y += 1300; s.s *= 0.64; });
      // sur le banc : dossiers, micro, plaque
      c.put(`<g><rect x="490" y="1108" width="74" height="12" rx="2" fill="#FFFFFF" stroke="${INK}" stroke-width="2" transform="rotate(-4 527 1114)"/><rect x="494" y="1098" width="70" height="12" rx="2" fill="#F8CE4E" stroke="${INK}" stroke-width="2" transform="rotate(3 529 1104)"/>`
        + `<path d="M720 1114 L720 1074 Q 720 1060 706 1052" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><ellipse cx="702" cy="1049" rx="9" ry="6" fill="#3A3A37"/><rect x="706" y="1110" width="30" height="8" rx="3" fill="#3A3A37"/>`
        + `<rect x="566" y="1128" width="130" height="30" rx="5" fill="#FFFFFF" stroke="${INK}" stroke-width="2.2"/></g>`);
      c.text("OLG Köln · 5. Senat", 631, 1149, 15, "de");
      c.kick(m, 0.06);
      // l'Assistenzärztin entre, inquiète → choc → larmes ; elle recule d'un pas
      const ex = (t) => t < m ? "worried" : t < dth ? "shock" : t < sh ? "cry" : (t < sh + 0.4 ? "shock" : "cry");
      const wIn = 1.15, xA = (t) => lerp(-130, 290, E.out(prog(t, 0, wIn))) - 24 * E.out(prog(t, m + 0.05, 0.25));
      pp(0, 0, 1.12, (t) => Object.assign({}, ASS, { outfit: "coat" }, t < wIn ? Object.assign(PP.walk(((t * 1.7) % 1)), { view: "side" }) : PP.stand, t < wIn ? {} : { view: "three-quarter" }, { facing: 1, expr: ex(t), tears: t >= dth ? rnd(Math.min(1, prog(t, dth, 0.6)), 10) : 0, sweat: t < dth, look2: [0.7, 0], blink: rnd(blinkAt(t, 2)), headTilt: t >= dth ? rnd(4 * Math.sin(t * 6), 2) : 0 }))
        .on((t, s) => { s.x += xA(t); s.y += 1300 + Math.sin(t * 2.6) * 2; });
      k.chip("Assistenzärztin", "طبيبة فطور الاختصاص", 290, 690, 30).pop("b1@طور");
      k.prop("stamp", 540, 470, 0.5, () => ({ text: "HAFTET PERSÖNLICH", size: 48, rot: -5 })).slam(sh + 0.1, 0.28, 12);
    } });

    /* ═══════ 2 · « ce n'est pas elle qui a décidé ; le problème : elle s'est tue » ═══════ */
    st.scene({ from: "b3", in: "whip", inDur: 0.25, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const dec = T("b3@قررت"), sil = T("b3@سكتات");
      c.camera([{ at: "b3", s: 1.0, cx: 540, cy: 930 }, { at: sil - 0.15, s: 1.75, cx: 330, cy: 880, d: 0.35 }]);
      bgd(c, D.room, 0, 0, 1, { tileTop: 1020, tile: 60 });
      c.put(`<path d="M40 1100 L1040 1100" stroke="#9FB2AC" stroke-width="8" stroke-linecap="round"/><path d="M40 1106 L1040 1106" stroke="#7E948D" stroke-width="2"/>`);
      bgd(c, D.corridorDoor, 160, 1300, 1, { label: "OP 2" });
      bgd(c, D.corridorDoor, 845, 1300, 1, { label: "Gyn" });
      c.put(`<g><rect x="430" y="520" width="220" height="44" rx="8" fill="#2F8F4E" stroke="${INK}" stroke-width="2.4"/><text x="540" y="551" text-anchor="middle" font-family="Kalam" font-weight="700" font-size="24" fill="#FFFFFF">Gynäkologie →</text></g>`);
      // Dr. K, c'est lui qui décide (il montre, sûr de lui)
      pp(730, 1300, 1.05, (t) => Object.assign({}, DRK, PP.point, { facing: -1, expr: "smile", blink: rnd(blinkAt(t, 3)), look2: [0.6, 0] })).on(breathe(1));
      k.chip("Entscheidung", "القرار ماشي ديالها", 730, 730, 30, { yellow: true }).pop(dec);
      // elle, à côté : elle se tait — un scotch vient lui fermer la bouche
      const an = pp(330, 1300, 1.05, (t) => Object.assign({}, ASS, PP.stand, { expr: t < sil ? "worried" : "sad", look2: t < sil ? [0.6, 0.1] : [0, 0.8], headTilt: t >= sil ? 6 : 0, blink: rnd(blinkAt(t, 4)) }));
      an.on(breathe(2));
      bubble(c, 470, 700, 170, 110, [400, 790]).pop(T("b3") + 0.4, 0.3).hide(sil, 0.3);
      c.text("…", 470, 715, 64, "de").pop(T("b3") + 0.4, 0.3).hide(sil, 0.3);
      tapeOn(c, an, 330, 1300, 1.05, sil + 0.05);
      k.chip("geschwiegen", "سكتات", 330, 560, 30).pop(sil + 0.2);
    } });

    /* ═══════ 3 · la boucle : un mot allemand que chaque médecin doit connaître… (dit à la fin) ═══════ */
    st.scene({ from: "b4", in: "zoom", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const end = T("b4@الآخر");
      c.camera([{ at: "b4", s: 1.08, cx: 540, cy: 860 }, { at: "b4@طبيب", s: 1.0, cx: 540, cy: 900, d: 0.4 }]);
      k.chip("1 Wort", "كلمة وحدة", 540, 500, 32, { yellow: true }).pop("b4@كلمة");
      c.sk((g, p) => D.wordCard(g, p), (t) => ({ reveal: 0, lock: 0, shake: rnd(t >= end ? Math.sin((t - end) * 22) * Math.max(0, 1 - prog(t, end, 0.6)) : 0, 10) }), 540, 760, 1).pop(T("b4") + 0.15, 0.4);
      [[ASS, 270, 0], [OBE, 520, 1], [DRK, 770, 2]].forEach(([who, x, i]) => {
        ph(x, 1090, 1.05, (t) => Object.assign({}, who, { expr: "worried", look2: [0, -0.9], blink: rnd(blinkAt(t, 5 + i)) })).pop(T("b4@طبيب") + i * 0.12, 0.35);
        c.text("?", x + 58, 990, 56, "de").pop(T("b4@طبيب") + 0.2 + i * 0.12, 0.3).float(6, 1.4, i);
      });
      k.chip("→ am Ende", "غادي نقولها فالآخر", 540, 1260, 28).pop(end - 0.2);
    } });

    /* 2 · l'intro de l'auteur : sa photo (bord dessiné), Instagram, j'aime + s'abonner ---------------- */
    st.scene({ from: "i1", in: "iris", inDur: 0.3, summary: false, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      c.camera([{ at: "i1", s: 1.05, cx: 540, cy: 820 }, { at: "i2", s: 1.0, cx: 540, cy: 860, d: 0.5 }]);
      const ph = el("g"), C = U.ctx(ph, 88, false, 1);
      const cp = el("clipPath", { id: "clipPortrait" }, el("defs", {}, ph)); el("circle", { cx: 0, cy: 0, r: 208 }, cp);
      el("circle", { cx: 9, cy: 12, r: 236, fill: "#D2D2CB" }, ph);
      U.shape(C, "ring", "M-236 0 A236 236 0 1 1 236 0 A236 236 0 1 1 -236 0", MAT.yellow, { sw: 4 });
      el("image", { href: "assets/portrait.png", x: -210, y: -210, width: 420, height: 420, "clip-path": "url(#clipPortrait)", preserveAspectRatio: "xMidYMid slice" }, ph);
      U.shape(C, "ring1", "M-209 0 A209 209 0 1 1 209 0 A209 209 0 1 1 -209 0", {}, { sw: 5.5 });
      U.stroke(C, "dash", "M-150 -196 C -90 -232, 60 -236, 140 -200", { sw: 3, stroke: "#FFFFFF" });
      // badge Instagram dessiné, accroché au cadre
      const ig = el("g", { transform: "translate(160 160)" }, ph), I = U.ctx(ig, 89, false, 1);
      el("path", { d: U.rrect(-46, -46, 92, 92, 26), fill: "#D2D2CB", transform: "translate(5 6)" }, ig);
      U.shape(I, "sq", U.rrect(-46, -46, 92, 92, 26), MAT.white, { sw: 4.2 });
      U.shape(I, "c", "M-19 0 A19 19 0 1 1 19 0 A19 19 0 1 1 -19 0", MAT.yellow, { sw: 4.2 });
      el("circle", { cx: 25, cy: -25, r: 6, fill: INK }, ig);
      c.node(ph).on((t, s) => { s.x += 540; s.y += 600; }).pop("i1", 0.4);
      k.ribbon("Yassine", 540, 905, { size: 60 }).wipe("i1@ياسين", 0.35);
      const hd = el("g"), H = U.ctx(hd, 90, false, 1);
      U.shape(H, "sq", U.rrect(-21, -21, 42, 42, 12), MAT.white, { sw: 3 }); U.stroke(H, "c", "M-9 0 A9 9 0 1 1 9 0 A9 9 0 1 1 -9 0", { sw: 3 }); el("circle", { cx: 12, cy: -12, r: 3, fill: INK }, hd);
      c.node(hd).on((t, s) => { s.x += 410; s.y += 996; }).pop("i1@ياسين+0.15", 0.3);
      c.text("@dr.aguilo", 560, 1012, 46, "de").fade("i1@ياسين+0.15", 0.3);
      k.chip("Arzt in Deutschland", "طبيب فألمانيا", 540, 1078, 26).pop("i1@فألمانيا").hide("i2@حقيقية", 0.15);
      k.chip("echte Fälle · deutsche Gerichte", "قصص حقيقية من المحاكم", 540, 1078, 26, { yellow: true }).pop("i2@حقيقية+0.15").hide("i3", 0.15);
      // j'aime + s'abonner
      const la = T("i3@j'aime"), fa = T("i3@abonne");
      c.sk((g, p) => PE.props.heart(g, { size: 1.25, fill: p.on, beat: p.b }), (t) => ({ on: t >= la, b: rnd(Math.sin(Math.min(1, prog(t, la, 0.35)) * Math.PI), 10) }), 330, 1185, 1).pop("i3", 0.3);
      c.text("j'aime", 330, 1258, 30, "de").pop("i3", 0.3);
      c.sk((g, p) => {
        while (g.firstChild) g.removeChild(g.firstChild);
        const B = U.ctx(g, 91, false, 1);
        el("path", { d: U.rrect(-150, -42, 300, 84, 22), fill: "#D2D2CB", transform: "translate(6 7)" }, g);
        U.shape(B, "btn", U.rrect(-150, -42, 300, 84, 22), p.on ? MAT.yellow : MAT.white, { sw: 3.4 });
        U.text(g, p.on ? "✓ abonné" : "+ s'abonner", 0, 14, 40, {});
      }, (t) => ({ on: t >= fa }), 640, 1190, 1).pop("i3+0.1", 0.3);
      c.kick(la, 0.05); c.kick(fa, 0.05);
    } });


    /* ═══════ 4 · la patiente, la quarantaine, vient pour un examen simple : Hysteroskopie ═══════ */
    st.scene({ from: "b5", in: "iris", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const a = T("b5") + 0.05, d = 1.5, BASE = 1165, FG = 1330;
      c.camera([{ at: "b5", s: 1.0, cx: 540, cy: 920 }, { at: a + d, s: 1.12, cx: 480, cy: 960, d: 0.5 }]);
      c.put(`<rect x="40" y="290" width="1000" height="${BASE - 290}" fill="#EAF3F6"/>`);
      [[250, 420, 160], [760, 470, 120], [520, 380, 90]].forEach(([x, y, w], i) => bgd(c, D.cloud, x, y, 1, { w }).float(5, 4 + i, i));
      bgd(c, D.tree, 205, BASE, 1, { h: 300 });
      bgd(c, D.lamppost, 470, BASE, 1, { h: 330 });
      k.ground(540, BASE, 1000);
      c.put(`<rect x="40" y="${BASE}" width="1000" height="${FG - BASE}" fill="#ECEBE4"/><path d="M40 ${BASE + 70} L1040 ${BASE + 70}" stroke="#CFCEC6" stroke-width="2.4" stroke-dasharray="44 30"/>`);
      k.ground(540, FG, 1000);
      c.put(`<rect x="40" y="${FG}" width="1000" height="120" fill="#E2E4DE"/>`);
      const hs = el("g"); building(hs, { w: 340, h: 380, rows: 3, cols: 3, sign: "KLINIK", cross: true, signMat: MAT.white, seed: 31 }); c.node(hs).on((t, s) => { s.x += 665; s.y += BASE; s.s *= 0.8; });
      pp(0, 0, 0.95, (t) => Object.assign(walkTo(PAT, t, a, d, 1), { expr: "smile", blink: rnd(blinkAt(t, 6)) }, prog(t, a, d) >= 1 ? { view: "front", look2: [0, 0] } : {}))
        .on((t, s) => { s.x += lerp(-120, 420, E.out(prog(t, a, d))); s.y += FG; });
      k.chip("40+ Jahre", "فالأربعينات", 420, 770, 28).pop("b5@الأربعينيات");
      k.chip("Hysteroskopie", "فحص بسيط فالرحم", 540, 500, 34, { yellow: true }).pop("b5@Hysteroskopie");
    } });

    /* ═══════ 5 · ce que c'est : une petite caméra entre dans l'utérus, on le remplit de liquide pour bien voir ═══════ */
    st.scene({ from: "b6", in: "zoom", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const ci = T("b6@الكاميرا") - 0.2, fi = T("b6@وكيعمروه");
      c.camera([{ at: "b6", s: 1.0, cx: 540, cy: 880 }, { at: fi, s: 1.08, cx: 540, cy: 860, d: 0.6 }]);
      c.sk((g, p) => D.uterusCam(g, p), (t) => ({ ins: rnd(E.inOut(prog(t, ci, 1.0)), 30), fill: rnd(E.inOut(prog(t, fi, 1.3)), 30), light: rnd(prog(t, ci + 0.7, 0.3), 10) }), 540, 820, 1.12).pop(T("b6"), 0.4);
      k.chip("Kamera", "كاميرا صغيرة", 250, 1150, 30).pop(ci + 0.3);
      k.chip("Flüssigkeit", "سائل", 830, 560, 30, { yellow: true }).pop(fi + 0.2);
      c.put(`<path d="M760 610 C 720 640, 690 660, 650 690" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M660 672 L648 692 L672 694" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`).wipe(fi + 0.35, 0.3);
      k.chip("um gut zu sehen", "باش يشوفو مزيان", 540, 1290, 26).pop("b6@مزيان");
    } });

    /* ═══════ le bloc opératoire : une mise en place FIXE (chaque élément a sa place, rien ne se chevauche) ═══════
     *   lampe au centre · poche d'eau à gauche (tuyau vers le pied de la table) · moniteur au mur à droite ·
     *   table au milieu, patiente allongée (tête à droite) · Oberärztin + Assistenzärztin derrière la table ·
     *   étiquettes dans la bande du haut (y ≈ 470) */
    const ORc = { BX: 500, BW: 460, SY: 1272, S: 0.95, OX: 345, AX: 515, MX: 830, MY: 620 };
    const BED_A = D.bed2(el("g"), { flip: true, w: ORc.BW });
    const orBack = (c, k, o) => {
      o = o || {};
      bgd(c, D.room, 0, 0, 1, { tileTop: 880 });
      bgd(c, D.wallCabinet, 100, 400, 1, { w: 170, h: 140 });
      c.sk((g, p) => D.opLamp(g, Object.assign(p, { drop: 150 })), (t) => ({ on: o.lampAt != null ? rnd(t < o.lampAt ? 0 : (Math.floor((t - o.lampAt) / 0.07) % 2 && t < o.lampAt + 0.3 ? 0.3 : 1), 10) : 1 }), 500, 230, 1);
      k.ground(520, 1300, 980);
      c.put(`<path d="M${ORc.MX} ${ORc.MY - 108} L${ORc.MX} ${ORc.MY - 160} L${ORc.MX + 60} ${ORc.MY - 160}" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>`);
      c.sk((g, p) => D.monitor(g, p), o.mon || ((t) => ({ t: rnd((t * 1.2) % 1, 30) })), ORc.MX, ORc.MY, 0.72);
    };
    const handsO = () => ({}), handsA = () => ({});   // bras naturels : ils pendent, la table cache les mains (jamais de bras croisés)
    // la patiente allongée (decor.js : profil vers le haut, cheveux sur l'oreiller, blouse, drap) — elle respire
    const orCart = (c) => bgd(c, D.instrumentCart, 290, 1360, 0.9, {});
    const orBed = (c, tubeFn) => c.sk((g, p) => D.bed2(g, Object.assign({ flip: true, w: ORc.BW }, p)), (t) => ({ breath: rnd((Math.sin(t * 2.2) + 1) / 2, 5), tube: tubeFn ? tubeFn(t) : false }), ORc.BX, 1300, 1);
    const bagAt = (c, fn) => c.sk((g, p) => D.fluidBag(g, p), fn, 165, 1300, 1);

    /* ═══════ 6 · le bloc : Oberärztin (depuis 1 mois) + Assistenzärztin ; Dr. K entre avec son appareil ;
     *          l'eau distillée ; l'Oberärztin doute… et continue ; l'Assistenzärztin ne dit rien ═══════ */
    st.scene({ from: "b7", in: "slideLeft", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const oA = T("b7@Oberärztin"), aA = T("b7@Assistenzärztin"), dk = T("b8"), wa = T("b9@destilliertes"), dbt = T("b10@شكات"), cnt = T("b10@كملات"), sl = T("b11"), sl2 = T("b11@والو");
      c.camera([{ at: "b7", s: 1.0, cx: 520, cy: 920 }, { at: sl, s: 1.28, cx: 600, cy: 960, d: 0.45 }]);
      orBack(c, k, { lampAt: T("b7") + 0.1 });
      bagAt(c, (t) => ({ level: rnd(1 - 0.75 * prog(t, wa + 0.4, 9), 40), flow: rnd(t >= wa + 0.4 ? ((t - wa) * 1.2) % 1 : 0, 30), tube: [135, -200] })).slide(wa - 0.1, 0, -600, 0.45, "out");
      const nO = pp(ORc.OX, ORc.SY, ORc.S, (t) => Object.assign({}, OBE, PP.stand, { expr: t >= dbt && t < cnt ? "worried" : "focused", look2: t >= dbt && t < cnt ? [-0.6, -0.6] : [-0.2, 0.7], blink: rnd(blinkAt(t, 7)) }, handsO(t, 6))).on(breathe(3));
      capOn(c, nO, ORc.OX, ORc.SY, ORc.S, CAP_O, breathe(3));
      const as = pp(ORc.AX, ORc.SY, ORc.S, (t) => Object.assign({}, ASS, PP.stand, { expr: t >= sl ? "worried" : "calm", sweat: t >= sl, look2: t >= sl ? [Math.sin((t - sl) * 5) > 0 ? -0.8 : 0.8, 0] : [-0.4, 0.6], blink: rnd(blinkAt(t, 8)) }, handsA(t)));
      capOn(c, as, ORc.AX, ORc.SY, ORc.S, CAP_A, breathe(4));
      as.on(breathe(4));
      orBed(c);
      orCart(c);
      // Dr. K entre par la droite et montre fièrement son appareil
      const kIn = dk + 0.05, KX = 782, KS = 0.95, kX = (t) => lerp(1180, KX, E.out(prog(t, kIn, 1.0)));
      const kPose = (t) => Object.assign({}, DRK, { facing: -1 }, prog(t, kIn, 1.0) < 1 ? Object.assign(PP.walk((((t - kIn) * 1.7) % 1 + 1) % 1), { view: "side" })
        : Object.assign({}, PP.stand, { view: "three-quarter" }), { expr: "bigsmile", blink: rnd(blinkAt(t, 9)), look2: [0.5, 0.4] });
      const kd = pp(0, 0, KS, kPose).on((t, s) => { s.x += kX(t); s.y += 1300; });
      c.sk((g, p) => D.scope(g, p), (t) => ({ sparkle: rnd((Math.sin(t * 6) + 1) / 2, 5) }), 0, 0, 0.45, 150).on((t, s) => { const h = kd.out && kd.out.handL; if (!h || prog(t, kIn, 1.0) < 1) { s.o *= 0; return; } s.x += kX(t) + h[0] * KS; s.y += 1300 + h[1] * KS; });
      // étiquettes : bande du haut, une à la fois
      k.chip("Oberärztin · seit 1 Monat", "عاد شهر وهي Oberärztin", 540, 470, 28).pop(oA).hide(aA, 0.2);
      k.chip("Assistenzärztin", "طبيبة فطور الاختصاص", 540, 470, 30).pop(aA).hide(dk, 0.2);
      k.chip("will das Gerät testen", "بغا يجرب الجهاز", 540, 470, 28, { yellow: true }).pop(T("b8@يجرب")).hide(wa, 0.2);
      k.chip("destilliertes Wasser", "الماء المقطر", 540, 470, 30, { yellow: true }).pop(wa + 0.15).hide(dbt, 0.2);
      // l'Oberärztin doute : « ? » au-dessus de sa tête ; Dr. K : « keine Bedenken » ; elle continue
      bubble(c, 300, 742, 100, 90, null).pop(dbt, 0.35).hide(cnt, 0.3);
      c.put(`<g fill="#FFFFFF" stroke="${INK}" stroke-width="3"><circle cx="324" cy="806" r="11"/><circle cx="334" cy="834" r="7"/></g>`).pop(dbt, 0.3).hide(cnt, 0.3);
      c.text("?", 300, 765, 60, "de").pop(dbt, 0.35).wobble(dbt + 0.3, 0.4, 10).hide(cnt, 0.3);
      bubble(c, 720, 720, 280, 112, [790, 860]).pop(dbt + 0.5, 0.3).hide(sl, 0.2);
      c.text("keine Bedenken", 720, 712, 32, "de").pop(dbt + 0.5, 0.3).hide(sl, 0.2);
      c.text("ما عندو حتى مشكل", 720, 758, 22, "ar strong").pop(dbt + 0.6, 0.3).hide(sl, 0.2);
      // l'Assistenzärztin : rien — une petite bulle vide, puis le scotch
      bubble(c, 560, 760, 110, 78, [530, 830]).pop(sl + 0.3, 0.3).hide(sl2, 0.25);
      c.text("…", 560, 772, 50, "de").pop(sl + 0.3, 0.3).hide(sl2, 0.25);
      tapeOn(c, as, ORc.AX, ORc.SY, ORc.S, sl2 + 0.05);
    } });

    /* ═══════ 7 · dans sa tête : la hiérarchie — « le Oberarzt a l'expérience, moi je ne suis qu'Assistenzärztin »
     *          … et elle savait que l'Oberärztin n'avait jamais fait cette opération ═══════ */
    st.scene({ from: "b12", in: "fade", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const ex = T("b12@الخبرة"), only = T("b12@غير"), knew = T("b13@عارفة"), never = T("b13@عمرها");
      c.camera([{ at: "b12", s: 1.0, cx: 540, cy: 900 }]);
      // la bulle de pensée : une carte propre + trois petits ronds qui partent de sa tête
      k.card(300, 440, 600, 560, { seed: 811 }).pop(T("b12"), 0.4);
      c.put(`<g fill="#FFFFFF" stroke="${INK}" stroke-width="3"><circle cx="300" cy="1062" r="11"/><circle cx="324" cy="1030" r="15"/></g>`).pop(T("b12"), 0.3);
      const ld = el("g"); D.ladder(ld, { h: 430, w: 150 }); c.node(ld).on((t, s) => { s.x += 420; s.y += 980; }).wipe(T("b12") + 0.2, 0.4, "up");
      const R = [980 - 70, 980 - 70 - 290 / 3, 980 - 70 - 580 / 3, 980 - 360];
      [[CHF, 3, "Chefarzt", "الشاف"], [DRK, 2, "Oberarzt", "عندو الخبرة"], [OBE, 1, "Oberärztin", "عاد شهر"], [ASS, 0, "Assistenzärztin", "غير Assistenzärztin"]].forEach(([who, i, de, ar], j) => {
        const at = T("b12") + 0.35 + j * 0.15, y = R[i] - 28;
        ph(420, y, 0.5, (t) => Object.assign({}, who, { expr: i === 0 && t >= knew ? "worried" : "calm", blink: rnd(blinkAt(t, 10 + j)) })).pop(at, 0.3);
        c.text(de, 680, y + 2, 26, "de").pop(at + 0.05, 0.3);
        const g2 = c.text(ar, 680, y + 40, 22, "ar strong").pop(at + 0.1, 0.3);
        if (i === 1) g2.hide(never, 0.15);
      });
      c.put(`<circle cx="420" cy="${R[2] - 28}" r="46" fill="none" stroke="#F8CE4E" stroke-width="9" opacity=".9"/>`).pop(ex, 0.3).hide(knew, 0.2);
      c.put(`<circle cx="420" cy="${R[0] - 28}" r="46" fill="none" stroke="#F8CE4E" stroke-width="9" opacity=".9"/>`).pop(only, 0.3).hide(knew, 0.2);
      // elle savait : l'Oberärztin ne l'avait jamais faite → la ligne devient jaune
      c.text("أول مرة كدير هاد العملية", 680, R[1] + 12, 22, "ar strong").wipe(never + 0.1, 0.35, "rtl");
      c.put(`<circle cx="420" cy="${R[1] - 28}" r="46" fill="none" stroke="#C9625A" stroke-width="7"/>`).pop(never, 0.3);
      // elle, en bas à gauche
      ph(220, 1180, 1.2, (t) => Object.assign({}, ASS, { expr: t < knew ? "calm" : "worried", look2: t < knew ? [0.6, -0.7] : [0.2, -0.2], sweat: t >= knew, blink: rnd(blinkAt(t, 14)) }));
      c.text("!", 320, 1100, 80, "de").pop(knew + 0.1, 0.3).wobble(knew + 0.4, 0.4, 10);
    } });

    /* ═══════ 8 · l'eau distillée dans le sang : les globules rouges éclatent (Hämolyse) ═══════ */
    st.scene({ from: "b14", in: "zoom", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const w = T("b14@للدم"), b = T("b14@كيفرقها");
      c.camera([{ at: "b14", s: 1.0, cx: 540, cy: 860 }, { at: b, s: 1.05, cx: 540, cy: 840, d: 0.5 }]);
      k.card(180, 430, 720, 150, { seed: 501 }).pop("b14", 0.35);
      c.text("✓ NaCl / Glycin    ✗ Aqua dest.", 540, 495, 36, "de").pop(T("b14") + 0.1);
      c.text("laut Gutachten — الما المقطر ممنوع فالدم", 540, 548, 24, "ar strong").wipe(T("b14") + 0.3, 0.5, "rtl");
      c.sk((g, p) => D.vessel(g, p), (t) => ({ t: rnd(t * 0.6, 40), water: rnd(prog(t, w - 0.2, 0.6), 20), burst: rnd(prog(t, b, 1.1), 20) }), 540, 860, 0.9);
      k.chip("Hämolyse", "الكريات الحمرا كيتفرقعو", 540, 1130, 36, { yellow: true }).pop(b + 0.2);
    } });

    /* ═══════ 9 · 11:30 — le cœur s'arrête (même bloc) ═══════ */
    st.scene({ from: "b15", in: "cut", inDur: 0, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const st0 = T("b15@وقف");
      c.camera([{ at: "b15", s: 1.03, cx: 520, cy: 900 }, { at: st0 - 0.1, s: 1.0, cx: 520, cy: 920, d: 0.35 }]);
      orBack(c, k, { mon: (t) => ({ t: rnd((t * 1.2) % 1, 30), flat: t >= st0 ? 1 : 0, alarm: t >= st0 && Math.floor(t / 0.25) % 2 === 0 }) });
      c.sk((g, p) => PE.props.clockWall(g, { time: [11, p.m], r: 50 }), (t) => ({ m: Math.round(lerp(25, 30, prog(t, T("b15"), st0 - T("b15")))) }), 650, 610, 1);
      bagAt(c, (t) => ({ level: 0.25, flow: rnd((t * 1.2) % 1, 30), tube: [135, -200] }));
      const nO = pp(ORc.OX, ORc.SY, ORc.S, (t) => Object.assign({}, OBE, PP.stand, { expr: t >= st0 ? "shock" : "focused", blink: rnd(blinkAt(t, 7)), look2: t >= st0 ? [0.8, -0.5] : [-0.2, 0.7] }, handsO(t, 6)));
      capOn(c, nO, ORc.OX, ORc.SY, ORc.S, CAP_O, null);
      const nA = pp(ORc.AX, ORc.SY, ORc.S, (t) => Object.assign({}, ASS, PP.stand, { expr: t >= st0 ? "shock" : "worried", sweat: true, blink: rnd(blinkAt(t, 8)), look2: t >= st0 ? [0.8, -0.6] : [-0.4, 0.6] }, handsA(t)));
      capOn(c, nA, ORc.AX, ORc.SY, ORc.S, CAP_A, null);
      orBed(c);
      orCart(c);
      k.chip("11:30 · Asystolie", "القلب وقف", 540, 470, 30, { yellow: true }).pop(st0);
      st.vignette(st0, 1.2, 2); c.kick(st0, 0.07);
    } });

    /* ═══════ 10 · 25 minutes de réanimation ; le cœur repart… mais elle ne se réveille pas ═══════ */
    st.scene({ from: "b16", in: "cut", inDur: 0, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const a = T("b16"), back = T("b16@رجع"), nw = T("b16@فاقتش");
      const cpr = (t) => t >= a && t < back;
      c.camera([{ at: "b16", s: 1.0, cx: 520, cy: 920 }, { at: nw - 0.2, s: 1.06, cx: 560, cy: 960, d: 0.4 }]);
      orBack(c, k, { mon: (t) => ({ t: rnd((t * 1.2) % 1, 30), flat: t < back ? 1 : 0, alarm: t < back }) });
      // massage cardiaque : les deux mains sur la poitrine, tout le corps pousse
      const push = (t) => cpr(t) ? Math.max(0, Math.sin((t - a) * Math.PI * 3.6)) : 0, CH = [ORc.BX + BED_A.chest[0], 1300 + BED_A.chest[1]];
      const CX = CH[0], CY = CH[1] + 184;   // debout sur un marchepied (caché par la table) : épaules au-dessus de la poitrine
      const cprP = (t) => Object.assign({}, OBE, PP.stand, { expr: "focused", sweat: true, blink: rnd(blinkAt(t, 7)), look2: [0, 0.9] },
        cpr(t) ? { reachL: rl([CX, CY], ORc.S, [CX - 10, CH[1] + 6]), reachR: rl([CX, CY], ORc.S, [CX + 10, CH[1] + 6]), bendL: 1, bendR: -1 } : {});
      c.put(`<g><path d="${U.rrect(CX - 58, CY - 4, 116, 1300 - CY + 4, 8)}" fill="#D2D2CB" transform="translate(6 6)"/><path d="${U.rrect(CX - 58, CY - 4, 116, 1300 - CY + 4, 8)}" fill="#E6E6E1" stroke="${INK}" stroke-width="3"/><path d="M${CX - 50} ${CY + 30} L${CX + 50} ${CY + 30}" stroke="#9A9A94" stroke-width="2"/></g>`);
      const nC = pp(CX, CY, ORc.S, cprP).on((t, s) => { s.y += 9 * push(t); });
      capOn(c, nC, CX, CY, ORc.S, CAP_O, (t, s) => { s.y += 9 * push(t); });
      const nA2 = pp(300, ORc.SY, ORc.S, (t) => Object.assign({}, ASS, PP.stand, { expr: t < back ? "worried" : "sad", sweat: true, blink: rnd(blinkAt(t, 8)), look2: [-0.7, 0.5] }));
      capOn(c, nA2, 300, ORc.SY, ORc.S, CAP_A, null);
      orBed(c, (t) => t >= back + 0.3);
      // le respirateur arrive près de la tête (à droite), tuyau jusqu'à la bouche
      c.sk((g, p) => D.ventilator(g, p), (t) => ({ ph: rnd((t * 0.5) % 1, 20) }), 825, 1300, 0.85).slide(back, 300, 0, 0.4, "out");
      c.put(`<path d="M782 1150 C 790 1060, ${ORc.BX + BED_A.tubeIn[0] + 40} ${1300 + BED_A.tubeIn[1] - 30}, ${ORc.BX + BED_A.tubeIn[0]} ${1300 + BED_A.tubeIn[1]}" fill="none" stroke="#6E8B99" stroke-width="6" stroke-linecap="round"/>`).fade(back + 0.35, 0.3);
      const tm = c.text("0 min", 540, 630, 76, "de"); tm.fade(a, 0.2).hide(back + 0.2, 0.3).on((t) => { const m2 = Math.min(25, Math.floor(25 * prog(t, a + 0.1, back - a - 0.3))), txt = m2 + " min"; if (tm.textEl.textContent !== txt) tm.textEl.textContent = txt; });
      k.chip("Reanimation", "إنعاش", 540, 470, 30).pop(a + 0.1).hide(back + 0.2, 0.3);
      k.chip("Herz schlägt wieder", "القلب رجع", 540, 470, 30).pop(back + 0.5).hide(nw - 0.2, 0.2);
      k.chip("Koma", "ما فاقتش", 540, 470, 32, { yellow: true }).pop(nw);
    } });

    /* ═══════ scène muette : le lendemain, presque 24 h après — elle meurt. Son mari lui tient la main ═══════ */
    st.scene({ from: "b16@end+0.1", in: "fade", inDur: 0.4, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const quiet = T("b16@end") + 1.1;
      c.camera([{ at: "b16@end", s: 1.0, cx: 520, cy: 920 }, { at: quiet, s: 1.05, cx: 520, cy: 950, d: 2.4, ease: "lin" }]);
      bgd(c, D.room, 0, 0, 1, { wall: "#F2F0E9", floor: "#E6E2D8", floorLine: "#CFC9BB" });
      bgd(c, D.blindsWindow, 600, 690, 1, { w: 230, h: 200 });
      bgd(c, D.flowers, 668, 804, 0.8, {});
      bgd(c, D.curtain, 830, 420, 1, { w: 150, h: 760 });
      bgd(c, D.gasPanel, 290, 800, 1, {});
      c.sk((g, p) => PE.props.clockWall(g, { time: [11, 53], r: 44 }), () => ({}), 400, 600, 1);
      k.chip("+ 24 h", "النهار اللي من بعد", 600, 470, 28).pop(T("b16@end") + 0.3);
      c.put(`<path d="M175 752 L175 700 L115 700" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>`);
      c.sk((g, p) => D.monitor(g, p), (t) => ({ t: rnd((t * (t < quiet ? 0.8 : 0)) % 1, 30), flat: t >= quiet ? 1 : 0, alarm: t >= quiet }), 175, 860, 0.72);
      c.sk((g, p) => D.ventilator(g, p), (t) => ({ ph: rnd(t < quiet ? (t * 0.5) % 1 : 0.5, 20) }), 170, 1300, 0.9);
      const BX = 530, B0 = D.bed2(el("g"), { kind: "icu", arm: true, tube: true, w: 420 }), hand = [BX + B0.hand[0], 1300 + B0.hand[1]], HX = 560;
      const hus = (t) => Object.assign({}, HUS, { beard: "stubble" }, PP.stand, { view: "three-quarter", facing: 1, expr: t >= quiet ? "cry" : "sad", tears: t >= quiet ? 1 : 0.4, headTilt: t >= quiet ? 12 : 6, look2: [0.4, 0.9], blink: rnd(blinkAt(t, 15)), reachR: rl([HX, 1262], 1, [hand[0] - 2, hand[1] - 6]), bendR: 1 });
      pp(HX, 1262, 1.0, hus).on(breathe(6));
      c.sk((g, p) => D.bed2(g, Object.assign({ kind: "icu", arm: true, tube: true, w: 420 }, p)), (t) => ({ breath: t < quiet ? rnd((Math.sin(t * 2.2) + 1) / 2, 5) : 0 }), BX, 1300, 1);
      c.put(`<path d="M222 1120 C 300 1110, ${BX + B0.tubeIn[0] - 40} ${1300 + B0.tubeIn[1] - 40}, ${BX + B0.tubeIn[0]} ${1300 + B0.tubeIn[1]}" fill="none" stroke="#6E8B99" stroke-width="6" stroke-linecap="round"/>`);
      pp(HX, 1262, 1.0, (t) => Object.assign(hus(t), { only: "handR" })).on(breathe(6));
      // l'Assistenzärztin, à droite, tête baissée
      pp(795, 1300, 0.85, (t) => Object.assign({}, ASS, PP.stand, { view: "side", facing: -1, expr: "sad", tears: 0.6, headTilt: 16, look2: [0, 1], blink: rnd(blinkAt(t, 16)) })).fade(quiet + 0.2, 0.4);
      k.ar("ماتت", 540, 1440, 72, "ttl", c.hud).wipe(quiet + 0.5, 0.6, "rtl").hide("b17", 0.2);
      c.tick((t) => { const g = E.inOut(prog(t, quiet + 0.3, 1.2)); c.layer.style.filter = g > 0 ? `grayscale(${(g * 0.85).toFixed(2)})` : ""; });
    } });

    /* ═══════ 11 · la famille va au tribunal ═══════ */
    st.scene({ from: "b17", in: "fade", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const a = T("b17") + 0.05, d = 1.3, BASE = 1165, FG = 1330;
      c.camera([{ at: "b17", s: 1.0, cx: 540, cy: 920 }]);
      c.put(`<rect x="40" y="290" width="1000" height="${BASE - 290}" fill="#EAF3F6"/>`);
      [[230, 430, 150], [880, 400, 110]].forEach(([x, y, w], i) => bgd(c, D.cloud, x, y, 1, { w }).float(5, 4 + i, i));
      bgd(c, D.tree, 170, BASE, 1, { h: 280, seed: 519 });
      bgd(c, D.lamppost, 410, BASE, 1, { h: 320 });
      k.ground(540, BASE, 1000);
      c.put(`<rect x="40" y="${BASE}" width="1000" height="${FG - BASE}" fill="#ECEBE4"/><path d="M40 ${BASE + 70} L1040 ${BASE + 70}" stroke="#CFCEC6" stroke-width="2.4" stroke-dasharray="44 30"/>`);
      k.ground(540, FG, 1000);
      c.put(`<rect x="40" y="${FG}" width="1000" height="120" fill="#E2E4DE"/>`);
      const ch = el("g"); D.courthouse(ch, { label: "OLG Köln" }); c.node(ch).on((t, s) => { s.x += 680; s.y += BASE; s.s *= 0.75; });
      pp(0, 0, 0.95, (t) => Object.assign(walkTo(HUS, t, a, d, 1), { expr: "sad", blink: rnd(blinkAt(t, 17)) }, prog(t, a, d) >= 1 ? { view: "side", facing: 1 } : {}))
        .on((t, s) => { s.x += lerp(-120, 400, E.out(prog(t, a, d))); s.y += FG; });
      k.chip("Klage der Familie", "العائلة مشات للمحكمة", 540, 520, 30, { yellow: true }).pop("b17@للمحكمة");
    } });

    /* ═══════ 12 · 2025, OLG Köln : même l'Assistenzärztin est personnellement responsable ═══════ */
    st.scene({ from: "b18", in: "iris", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const kn = T("b18@Köln"), sh = T("b18@شخصيا");
      const geo = drawDE(c, 330, 860, 40, "b18"), [kx, ky] = geo(6.96, 50.94);
      c.camera([{ at: "b18", s: 1.0, cx: 540, cy: 880 }, { at: kn, s: 1.25, cx: 360, cy: 860, d: 0.4 }, { at: kn + 0.9, s: 1.0, cx: 540, cy: 880, d: 0.4 }]);
      pinAt(c, kx, ky, kn);
      k.chip("OLG Köln · 2025", "محكمة الاستئناف", 330, 560, 28).pop(kn + 0.2);
      // la carte « Assistenzärztin » : tamponnée
      k.card(610, 700, 270, 360, { seed: 601 }).pop(kn + 0.8, 0.35);
      ph(745, 830, 0.95, (t) => Object.assign({}, ASS, { expr: t >= sh ? "shock" : "worried", blink: rnd(blinkAt(t, 18)) })).pop(kn + 0.9, 0.35);
      c.text("Assistenzärztin", 745, 990, 26, "de").pop(kn + 0.95);
      c.text("طبيبة فطور الاختصاص", 745, 1028, 22, "ar strong").pop(kn + 1.0);
      k.prop("stamp", 745, 1140, 0.42, () => ({ text: "HAFTET PERSÖNLICH", size: 48, rot: -8 })).slam(sh + 0.05, 0.28, 10);
    } });

    /* ═══════ 13 · le mot : Remonstrationspflicht (le cadenas s'ouvre) ═══════ */
    st.scene({ from: "b19", in: "zoom", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const op = T("b19@واجب") - 0.1, rv = T("b19@Remonstrationspflicht") - 0.15;
      c.camera([{ at: "b19", s: 1.12, cx: 540, cy: 760 }, { at: rv + 0.9, s: 1.0, cx: 540, cy: 880, d: 0.5 }]);
      c.sk((g, p) => D.wordCard(g, p), (t) => ({ lock: rnd(E.out(prog(t, op, 0.3)), 10), shake: rnd(t < op ? Math.sin(t * 20) * 0.5 : 0, 10), reveal: rnd(E.inOut(prog(t, rv, 0.8)), 30) }), 540, 700, 1);
      c.text("= واجب الاعتراض", 540, 880, 46, "ttl").wipe(rv + 0.7, 0.5, "rtl");
      [[ASS, 270, 0], [OBE, 520, 1], [DRK, 770, 2]].forEach(([who, x, i]) => {
        ph(x, 1080, 1.0, (t) => Object.assign({}, who, { expr: t >= rv + 0.6 ? "smile" : "worried", look2: [0, -0.9], blink: rnd(blinkAt(t, 5 + i)) })).pop(T("b19") + i * 0.1, 0.3);
        c.text("!", x + 58, 985, 60, "de").pop(rv + 0.8 + i * 0.1, 0.3);
      });
      c.kick(rv + 0.5, 0.07);
    } });

    /* ═══════ 14 · au moins poser la question ═══════ */
    st.scene({ from: "b20", in: "slideLeft", inDur: 0.25, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const q = T("b20@تطرح") - 0.2;
      c.camera([{ at: "b20", s: 1.0, cx: 520, cy: 920 }]);
      orBack(c, k, {});
      bagAt(c, () => ({ level: 0.9, flow: 0, tube: [135, -200] }));
      const nO = pp(ORc.OX, ORc.SY, ORc.S, (t) => Object.assign({}, OBE, PP.stand, { expr: t >= q + 0.6 ? "worried" : "focused", look2: t >= q ? [0.9, 0] : [-0.2, 0.7], blink: rnd(blinkAt(t, 7)) }, handsO(t, 0)));
      capOn(c, nO, ORc.OX, ORc.SY, ORc.S, CAP_O, null);
      const as = pp(ORc.AX, ORc.SY, ORc.S, (t) => Object.assign({}, ASS, t >= q ? PP.wave : PP.stand, { expr: t >= q ? "focused" : "worried", look2: [-0.8, 0], talk: rnd(talkAt(t, q + 0.1, q + 1.2), 10), blink: rnd(blinkAt(t, 8)) }, t >= q ? {} : handsA(t)));
      capOn(c, as, ORc.AX, ORc.SY, ORc.S, CAP_A, breathe(5));
      as.on(breathe(5));
      orBed(c);
      orCart(c);
      k.chip("die Frage stellen", "طرح السؤال", 540, 470, 28, { yellow: true }).pop(q + 0.3);
      bubble(c, 600, 704, 380, 136, [545, 836]).pop(q, 0.35);
      c.text("Warum Aqua dest.?", 600, 690, 38, "de").pop(q + 0.05, 0.3);
      c.text("علاش الما المقطر؟", 600, 748, 28, "ar strong").wipe(q + 0.2, 0.4, "rtl");
    } });

    /* ═══════ 15 · la sanction : l'Assistenzärztin, l'Oberärztin et la clinique dédommagent la famille ═══════ */
    st.scene({ from: "b21", in: "whip", inDur: 0.25, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const a1 = T("b21@عليها"), a2 = T("b21@Oberärztin"), a3 = T("b21@والمصحة"), pay = T("b21@بالتعويض");
      c.camera([{ at: "b21", s: 1.0, cx: 540, cy: 900 }]);
      bgd(c, D.room, 0, 0, 1, { wall: "#F1ECE2", tileTop: 900, tileFill: "#E4D9C6", tileLine: "#C9B99B", tile: 120, floor: "#DCCFB8", floorLine: "#C2B293" });
      k.prop("stamp", 540, 470, 0.5, () => ({ text: "HAFTEN", size: 60, rot: -5 })).slam(a3 + 0.35, 0.26, 8);
      const cards = [[ASS, 250, a1, "Assistenzärztin"], [OBE, 470, a2, "Oberärztin"], [null, 690, a3, "Klinik"]];
      cards.forEach(([who, x, at, de], i) => {
        k.card(x - 95, 550, 190, 230, { seed: 701 + i }).pop(at, 0.35);
        if (who) ph(x, 650, 0.72, (t) => Object.assign({}, who, { expr: "sad", blink: rnd(blinkAt(t, 20 + i)) })).pop(at + 0.05, 0.35);
        else { const hs = el("g"); building(hs, { w: 150, h: 150, rows: 1, cols: 2, sign: "", cross: true, seed: 33 }); c.node(hs).on((t, s) => { s.x += x; s.y += 720; s.s *= 0.85; }).pop(at + 0.05, 0.35); }
        c.text(de, x, 758, de.length > 12 ? 20 : 24, "de").pop(at + 0.1);
      });
      // la famille (le mari) reçoit le dédommagement : les billets partent SOUS chaque carte et arrivent dans sa main
      const HX = 800, MP = Object.assign({}, HUS, PP.holdHandOutSide, { facing: -1, expr: "sad" }), ma = PE.util.rig(MP), mh = [HX + ma.handR[0], 1300 + ma.handR[1]];
      pp(HX, 1300, 1.0, (t) => Object.assign({}, MP, { blink: rnd(blinkAt(t, 23)) }));
      cards.forEach(([w, x], i) => { for (let j = 0; j < 2; j++) {
        const n = el("g"); D.banknote(n, { seed: 340 + i * 2 + j, w: 76 }); const st0 = pay + i * 0.2 + j * 0.1, end = [mh[0] + (j ? 5 : -5), mh[1] - 6 - (i * 2 + j) * 5];
        c.node(n).on((t, s) => { const p = E.inOut(prog(t, st0, 0.7)); s.x += lerp(x, end[0], p); s.y += lerp(830, end[1], p); s.r += lerp(-12, j ? 5 : -4, p); s.o *= t >= st0 ? 1 : 0; });
      } });
      k.chip("Schadensersatz an die Familie", "تعويض للعائلة", 380, 1210, 28, { yellow: true }).pop(pay + 0.2);
    } });

    /* ═══════ 16 · la règle : trois marches — le dire, demander pourquoi, monter au Oberarzt / Chefarzt ═══════ */
    st.scene({ from: "b22", in: "fade", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const s1 = T("b22@بصوت") - 0.2, s2 = T("b22@سول") - 0.1, s3 = T("b22@طلع") - 0.1, chf = T("b22@Chefarzt");
      c.camera([{ at: "b22", s: 1.0, cx: 540, cy: 920 }]);
      bgd(c, D.room, 0, 0, 1, { tileTop: 1020, tile: 60 });
      c.put(`<path d="M40 1100 L1040 1100" stroke="#9FB2AC" stroke-width="8" stroke-linecap="round"/>`);
      const SX = 110, stp = c.sk((g, p) => D.stairs(g, p), (t) => ({ door: "Chefarzt", open: rnd(E.out(prog(t, chf - 0.25, 0.35)), 10) }), SX, 1300, 1);
      const SA = D.stairs(el("g"), {});
      // le Chefarzt sort sur le palier, devant sa porte
      pp(SX + SA.door[0] - 10, 1300 + SA.door[1], 0.72, (t) => Object.assign({}, CHF, PP.stand, { view: "three-quarter", facing: -1, expr: t >= chf + 0.3 ? "smile" : "calm", blink: rnd(blinkAt(t, 24)) })).fade(chf - 0.05, 0.3);
      // elle monte marche après marche
      const P0 = [SX - 50, 1300], Pk = SA.steps.map(([x, y]) => [SX + x, 1300 + y]), P4 = [SX + SA.landing[0] - 40, 1300 + SA.landing[1]];
      const legs = [[P0, Pk[0], s1], [Pk[0], Pk[1], s2], [Pk[1], Pk[2], s3], [Pk[2], P4, chf - 0.5]];
      const posAt = (t) => { let p = P0; for (const [a, b, at] of legs) { const q = prog(t, at, 0.55); if (q <= 0) break; p = [lerp(a[0], b[0], E.inOut(q)), lerp(a[1], b[1], E.inOut(q)) - Math.sin(q * Math.PI) * 14]; } return p; };
      const moving = (t) => legs.some(([, , at]) => t > at && t < at + 0.55);
      pp(0, 0, 0.8, (t) => Object.assign({}, ASS, moving(t) ? PP.walk(((t * 1.8) % 1)) : PP.stand, { view: "side", facing: 1, expr: "focused", blink: rnd(blinkAt(t, 25)), talk: rnd(talkAt(t, s1 + 0.6, s1 + 1.3), 10) }))
        .on((t, s) => { const p = posAt(t); s.x += p[0]; s.y += p[1]; });
      [[D.iconMegaphone, 270, s1, "laut sagen", "قولها بصوت عالي"], [D.iconQuestion, 540, s2, "Warum?", "سول علاش"], [D.iconUp, 810, s3, "Oberarzt / Chefarzt", "طلع للفوق"]].forEach(([ic, x, at, de, ar], i) => {
        const g = el("g"); ic(g); c.node(g).on((t, s) => { s.x += x; s.y += 460; s.s *= 0.8; }).pop(at, 0.35);
        c.text(de, x, 568, de.length > 12 ? 22 : 28, "de").pop(at + 0.05);
        c.text(ar, x, 608, 22, "ar strong").pop(at + 0.1);
        c.text(String(i + 1), x - 62, 420, 34, "de").pop(at, 0.3);
      });
    } });

    /* ═══════ 17 · « le silence ne te protégera jamais » : elle arrache le scotch ═══════ */
    st.scene({ from: "b23", in: "zoom", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const pl = T("b23@السكوت") + 0.35;
      c.camera([{ at: "b23", s: 1.0, cx: 540, cy: 880 }]);
      const hd = ph(540, 780, 2.0, (t) => Object.assign({}, ASS, { expr: t < pl + 0.3 ? "worried" : "smile", blink: rnd(blinkAt(t, 26)), talk: rnd(talkAt(t, pl + 0.6, T("b23@end")), 10) }));
      c.sk((g, p) => D.tape(g, p), (t) => ({ peel: rnd(E.inOut(prog(t, pl, 0.4)), 20) }), 0, 0, 1)
        .on((t, s) => { const m = hd.out && hd.out.mouth; if (!m) { s.o *= 0; return; } const q = prog(t, pl + 0.35, 0.4); s.x += 540 + m[0] * 2 + 300 * q; s.y += 780 + m[1] * 2 - 200 * q; s.s *= 2 * 0.95; s.o *= 1 - q; });
      k.ribbon("Schweigen schützt nicht.", 540, 1150, { size: 46 }).wipe(pl + 0.3, 0.45);
      c.text("السكوت عمرو ما غادي يحميك", 540, 1250, 38, "ar strong").wipe(pl + 0.5, 0.5, "rtl");
    } });

    /* ---------- HUD : barre de progression + logo (masqué pendant l'intro) ---------- */
    {
      const progEl = document.getElementById("prog"), bar = progEl.firstElementChild, total = T("b23@end"), endT = total + 0.15;
      const brand = document.getElementById("brand");
      sv.hooks.push((t) => {
        progEl.style.opacity = t > 0.2 && t < endT ? "1" : "0";
        bar.style.width = (100 * clamp(t / total, 0, 1)).toFixed(2) + "%";
        const intro = t >= T("i1") - 0.1 && t < T("b5") - 0.1;
        brand.style.opacity = intro ? "0" : (t < 0.25 ? t / 0.25 : t < endT ? 1 : Math.max(0, 1 - (t - endT) / 0.3)).toFixed(3);
      });
    }

    /* ---------- affiche finale + appel à commenter (écrit, pas dit) ---------- */
    st.flash("b23@end+0.15", 0.35, 0.85);
    st.summary({ at: "b23@end+0.15", in: "cut", dezoomAt: "b23@end+0.5", cols: 6, crop: [230, 1310], top: 372, gap: 10, side: 92,
      below(c, cells) {
        SketchUI.dots(c);
        const k = kit(c);
        k.ribbon("AKTE 03 · ما قالت والو", 540, 312, { size: 36, w: 470 });
        k.chip("@dr.aguilo", null, 180, 312, 20);
        k.chip("AKTE 04 · قريبا", null, 885, 312, 18, { yellow: true });
        cells.forEach((cell) => {
          const g = el("g");
          el("path", { d: SC.util.rrect(cell.x, cell.y, cell.w, cell.h, 14), fill: "#D2D2CB", transform: "translate(6 8)" }, g);
          el("path", { d: SC.util.rrect(cell.x, cell.y, cell.w, cell.h, 14), fill: "#F7F7F1" }, g);
          c.node(g);
        });
      },
      above(c, cells) {
        const k = kit(c);
        k.card(110, 960, 760, 300, { seed: 990 }).pop("b23@end+2.7", 0.4);
        k.ar("ونتا، واش عمرك سكتّي حيت خفتي؟", 490, 1060, 36, "ttl").wipe("b23@end+2.8", 0.6, "rtl");
        k.ar("كتب ليا فالكومنتير", 490, 1170, 32, "ar strong").wipe("b23@end+3.2", 0.5, "rtl");
        c.put(`<path d="M780 1150 C 860 1150, 900 1160, 918 1196 M896 1186 L918 1196 L922 1172" stroke="#1C1A1C" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).wipe("b23@end+3.4", 0.4);
        cells.forEach((cell) => {
          const g = el("g"); const C = SC.util.ctx(g, 950 + cell.i, false, 1);
          SC.util.shape(C, "o", SC.util.rrect(cell.x, cell.y, cell.w, cell.h, 14), {}, { sw: 3 });
          SC.util.shape(C, "b", SC.util.rrect(cell.x + cell.w - 46, cell.y + 8, 38, 38, 19), SC.MAT.yellow, { sw: 2.4 });
          SC.util.text(g, String(cell.i + 1), cell.x + cell.w - 27, cell.y + 35, 22, {});
          c.node(g);
        });
      } });

    st.finish(0.3);
  };
})();
