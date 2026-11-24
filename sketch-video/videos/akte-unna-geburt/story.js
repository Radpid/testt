/* AKTE 02 — « Die Hotelgeburt » (Unna 2008 · LG Dortmund 01.10.2014, 37 Ks 3/11 · BGH 11.05.2016, 4 StR 428/15).
 * Personnages : serie/lib/persona.js (visages détaillés, clignements, expressions, couple : main dans la main, bras autour,
 * regard, étreinte). Intro de l'auteur après l'accroche (photo assets/portrait.png, hors git). Décors : voyage, hôtel
 * jour/nuit, chambre (lit, table de nuit, téléphone, horloge), cabinet, hôpital tout proche, Karlsruhe, balance finale.
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
    /* ---------- personnages (serie/lib/persona.js) : nouveaux visages, clignements, paroles ---------- */
    const PE = Persona, PP = Persona.Pose, D = UnnaDecor;
    const blinkAt = (t, k) => { const q = (t + (k || 0) * 0.77) % 3.4; return q < 0.07 ? q / 0.07 : q < 0.14 ? (0.14 - q) / 0.07 : 0; };
    const talkAt = (t, a, b) => (t >= a && t < b ? (Math.floor(t / 0.11) % 3 === 0 ? 0.15 : 0.75) : 0);
    const rnd = (v, k = 20) => Math.round(v * k) / k;
    const pp = (x, y, s, fn, parent) => c_.sk((g, p) => PE.person(g, p), fn, x, y, s, 0, parent);
    let c_ = null;   // scène courante (pour pp)
    const WOMAN = { look: "woman", hair: "longwave", hairTone: "dark", outfit: "maternity", pregnant: true, seed: 31 };
    const MAN = { look: "man", hair: "short", hairTone: "dark", beard: "stubble", outfit: "sweater", seed: 32 };
    const DOCW = { look: "oldwoman", hair: "bun", hairTone: "grey", glasses: true, outfit: "coat", badge: "Dr", seed: 61 };
    const JUDGE = { look: "oldman", hair: "crown", hairTone: "grey", glasses: true, outfit: "robe", seed: 17 };
    const EXPERT = { look: "man", hair: "short", hairTone: "grey", glasses: true, outfit: "suit", beard: "short", seed: 44 };
    const couple = (c, x, y, s, fn) => c.sk((g, p) => PE.couple(g, p), fn, x, y, s);

    /* 1 · l'accroche : la cellule (les barreaux tombent), son visage qui change, 6 ans 9 mois, interdiction à vie ---- */
    st.scene({ from: 0, in: "cut", inDur: 0, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      c.camera([{ at: 0, s: 1.38, cx: 540, cy: 590 }, { at: "b1@بست", s: 1.1, cx: 540, cy: 820, d: 0.5 }, { at: "b1@ومنعوها", s: 1, cx: 540, cy: 900, d: 0.5 }]);
      const wall = el("g"); D.cellWall(wall, {}); c.node(wall).on((t, s) => { s.x += 316; s.y += 330; });
      const X = 540, Y = 830, S = 1.05, bx = (i) => 316 + i * 448 / 5, tGrip = 0.7, tLet = T("b1@ومنعوها"), tJail = T("b1@الحبس"), tLife = T("b1@حياتها");
      const doc = (t) => {
        let expr = "shock", tears = 0, tilt = 0, look = [0, 0.1], sweat = false;
        if (t >= 0.5) { expr = "worried"; sweat = true; look = [rnd(0.8 * Math.sin(t * 2.6), 10), 0.1]; tilt = rnd(3 * Math.sin(t * 1.7), 2); }
        if (t >= tJail) { expr = "cry"; sweat = false; tears = rnd(Math.min(1, prog(t, tJail, 0.8)), 10); tilt = rnd(5 * Math.sin(t * 6.5), 2); look = [0, 0.4]; }
        if (t >= tLet) { expr = "sad"; tears = 1; tilt = 12; look = [0, 1]; }
        if (t >= tLife) { expr = t < tLife + 0.45 ? "shock" : "cry"; tears = 1; tilt = t < tLife + 0.45 ? 0 : rnd(6 * Math.sin(t * 6), 2); look = [0, 0.3]; }
        const p = Object.assign({}, DOCW, PP.stand, { expr, tears, sweat, headTilt: tilt, look2: look, blink: rnd(blinkAt(t, 1)) });
        if (t >= tGrip && t < tLet) Object.assign(p, { reachL: [(bx(2) - X) / S, rnd((585 - Y) / S + 3 * Math.sin(t * 8), 2)], reachR: [(bx(3) - X) / S, rnd((585 - Y) / S - 3 * Math.sin(t * 8), 2)], bendL: -1, bendR: 1 });
        return p;
      };
      const breathe = (t, s) => { s.y += Math.sin(t * 2.4) * 2.5; };
      pp(X, Y, S, doc).on(breathe);
      const cb = el("g"); D.cellBars(cb, { n: 4 }); c.node(cb).on((t, s) => { s.x += 316; s.y += 330; }).slide(0.02, 0, -620, 0.26, "in");
      pp(X, Y, S, (t) => Object.assign(doc(t), { only: ["handL", "handR"] })).on(breathe).on((t, s) => { s.o *= t >= tGrip && t < tLet ? 1 : 0; });
      c.shake(0.28, 12, 0.35); c.kick(0.28, 0.06);
      const a = T("b1@بست"), yrs = c.text("0", 380, 1010, 130, "de"), mos = c.text("0", 700, 1010, 130, "de");
      [yrs, mos].forEach((n, i) => n.fade(a - 0.1, 0.2).on((t) => { const v = Math.round((i ? 9 : 6) * E.out(prog(t, a + i * 0.3, 0.7))); if (n.textEl.textContent !== String(v)) n.textEl.textContent = String(v); }));
      k.ar("سنين", 380, 1098, 34, "ttl").fade(a + 0.25); k.ar("شهور", 700, 1098, 34, "ttl").fade(a + 0.5);
      k.chip("Haft", "حبس", 540, 980, 30, { yellow: true }).pop("b1@الحبس");
      c.kick("b1@الحبس", 0.07);
      c.sk((g, p) => licence(g, p), (t) => ({ cut: rnd(E.out(prog(t, T("b1@ومنعوها") + 0.15, 0.45)), 10) }), 540, 1250, 0.8).pop("b1@ومنعوها", 0.35)
        .on((t, s) => { s.o *= 1 - 0.75 * E.out(prog(t, T("b1@حياتها") + 0.2, 0.2)); });
      k.prop("stamp", 540, 1220, 0.4, () => ({ text: "LEBENSLANGES BERUFSVERBOT", size: 44, rot: -6 })).slam("b1@حياتها", 0.28, 12);
    } });
    /* 1b · une seule décision : elle arrive, lève son porte-documents « راسي قاصح », refuse la Klinik et repart --------- */
    st.scene({ from: "b2", in: "whip", inDur: 0.3, summary: false, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const q = T("b2@قرار"), ch = T("b2@تبدل"), pl = T("b2@الخطة"), t0 = T("b2") + 0.05, t1 = q - 0.08, stomp = ch + 0.45, tOut = pl + 0.3;
      c.camera([{ at: "b2", s: 1.0, cx: 540, cy: 930 }, { at: q, s: 1.1, cx: 490, cy: 935, d: 0.35 }, { at: "b2@بغاتش", s: 1.0, cx: 560, cy: 920, d: 0.32 }]);
      k.ar("ماشي غلطة صغيرة", 540, 430, 46, "ttl", c.hud).wipe("b2", 0.4, "rtl");
      k.ground(540, 1300, 900);
      c.sk((g, p) => D.signpost(g, p), (t) => ({ swing: rnd(t >= ch - 0.15 && t < pl ? -6 * Math.sin((t - ch + 0.15) * 14) : 0, 2), crossK: rnd(E.out(prog(t, pl, 0.4)), 20), glowA: rnd(prog(t, pl + 0.1, 0.3), 10) }), 650, 1300, 1);
      c.text("ولادة فالدار", 532, 706, 26, "ar strong").fade(T("b2") + 0.2, 0.3);
      c.text("السبيطار", 780, 826, 26, "ar strong").fade(T("b2") + 0.3, 0.3);
      const X = 310, Y = 1300, S = 1.2, CB = [X + 4, 1050], rl = (pt) => [rnd((pt[0] - X) / S, 2), rnd((pt[1] - Y) / S, 2)];
      const front = (t) => t >= t1 && t < tOut;
      const xAt = (t) => t < t1 ? lerp(-110, X, E.out(prog(t, t0, t1 - t0))) : t < tOut ? X : lerp(X, 160, prog(t, tOut, 0.7));
      const hop = (t) => (t >= stomp && t < stomp + 0.22 ? -16 * Math.sin(Math.PI * prog(t, stomp, 0.22)) : 0);
      const lift = (t) => front(t) ? Math.sin(t * 2.6) * 2 + hop(t) : 0;
      const doc = (t) => {
        if (!front(t)) {   // elle arrive (vers la droite) / elle repart vers « Hausgeburt » (vers la gauche) : vrai cycle de marche
          const out = t >= tOut, ph = (((t - (out ? tOut : t0)) * 1.7) % 1 + 1) % 1;
          return Object.assign({}, DOCW, PP.walk(ph), { view: "side", facing: out ? -1 : 1, expr: out ? "angry" : "focused", blink: rnd(blinkAt(t, 2)) });
        }
        let expr = "focused", look = [0, 0], tilt = 0;
        if (t >= ch - 0.1) { expr = "angry"; look = [0.8, 0]; tilt = rnd(10 * Math.sin((t - ch) * 13) * Math.max(0, 1 - prog(t, ch, 0.7)), 2); }
        if (t >= pl) { look = [-0.6, 0]; tilt = -6; }
        return Object.assign({}, DOCW, PP.stand, { expr, look2: look, headTilt: tilt, blink: rnd(blinkAt(t, 2)), reachL: rl([CB[0] - 60, CB[1] + 12]), bendL: -1, reachR: rl([CB[0] + 60, CB[1] + 12]), bendR: 1 });
      };
      const docN = pp(0, 0, S, doc).on((t, s) => { s.x += xAt(t); s.y += Y + lift(t); });
      // le porte-documents : levé quand elle se tourne vers nous, « راسي قاصح » s'écrit à la main ; elle repart avec
      c.sk((g, p) => D.clipboard(g, p), (t) => ({ write: rnd(E.inOut(prog(t, q + 0.1, 0.6)), 20) }), 0, 0, 1).on((t, s) => {
        if (t < t1) { s.o *= 0; return; }
        if (t < tOut) { s.x += CB[0]; s.y += CB[1] + 80 * (1 - E.out(prog(t, t1, 0.25))) + lift(t); return; }
        const h = docN.out && docN.out.handR; if (h) { s.x += xAt(t) + h[0] * S; s.y += Y + h[1] * S + 48; s.s *= 0.72; }
      });
      pp(0, 0, S, (t) => Object.assign(doc(t), { only: ["handL", "handR"] })).on((t, s) => { s.x += xAt(t); s.y += Y + lift(t); s.o *= front(t) ? 1 : 0; });
      // elle tape du pied : un peu de poussière
      [-1, 1].forEach((sg) => c.put(`<ellipse cx="0" cy="0" rx="22" ry="9" fill="#DEDCD3" stroke="#B4B2A8" stroke-width="2"/>`).on((t, s) => { const p = prog(t, stomp + 0.18, 0.45); s.o *= p > 0 && p < 1 ? 1 - p : 0; s.x += X + sg * (50 + 34 * p); s.y += 1294 - 10 * p; }));
      // « قرار واحد » : un grand 1 qui rebondit
      c.put(`<circle cx="0" cy="0" r="46" fill="#F8CE4E" stroke="${INK}" stroke-width="4"/>`, 488, 800).pop(q, 0.35).wobble(q + 0.35, 0.4, 10);
      c.text("1", 488, 825, 72, "de").pop(q, 0.35).wobble(q + 0.35, 0.4, 10);
      c.kick(q, 0.05); c.kick(stomp, 0.04); c.kick(pl, 0.06);
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

    /* 3 · la carte : Unna 2008 ; le voyage ; le couple ------------------------------------------- */
    st.scene({ from: "b3", in: "iris", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const geo = drawDE(c, 560, 860, 66, "b3"), [ux, uy] = geo(7.69, 51.54);
      c.camera([{ at: "b3", s: 1.05, cx: 560, cy: 880 }, { at: "b3@Unna", s: 1.3, cx: 520, cy: 860, d: 0.45 }]);
      k.chip("2008 · echter Fall", "قصة حقيقية", 560, 470, 32).pop("b3@حقيقية");
      pinAt(c, ux, uy, "b3@Unna");
      k.chip("Unna", null, ux - 120, uy - 40, 32, { yellow: true }).pop("b3@Unna+0.25");
    } });
    st.scene({ from: "b4", in: "whip", inDur: 0.25, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      c.camera([{ at: "b4", s: 1.25, cx: 540, cy: 960 }, { at: "b4@بالقصد", s: 1.08, cx: 560, cy: 980, d: 0.5 }]);
      k.ground(540, 1300, 760);
      couple(c, 540, 1300, 1.15, (t) => ({ mode: "armAround", exprA: "love", exprB: "smile", heart: rnd(E.out(prog(t, T("b4") + 0.25, 0.7))), blink: rnd(blinkAt(t, 3)) }));
      k.chip("Couple aus Deutschland", "زوج ألماني", 540, 520, 30).pop("b4@Couple");
      const sc_ = el("g"); PE.props.suitcase(sc_, {}); c.node(sc_).on((t, s) => { s.x += 810; s.y += 1300; s.s *= 0.75; }).slide("b4@بالقصد", 300, 0, 0.35, "back");
      k.chip("extra nach Unna", "جاو بالقصد لـUnna", 720, 690, 28, { yellow: true }).pop("b4@بالقصد");
    } });

    /* 4 · la médecin qui est aussi sage-femme ----------------------------------------------------- */
    st.scene({ from: "b5", in: "whip", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      c.camera([{ at: "b5", s: 1.25, cx: 400, cy: 860 }, { at: "b5@Hebamme", s: 1.05, cx: 540, cy: 900, d: 0.5 }]);
      k.ground(540, 1300, 900);
      const doc = pp(330, 1300, 1.25, (t) => Object.assign({}, DOCW, PP.stand, { expr: "calm", blink: rnd(blinkAt(t, 4)), look2: [0.3, 0] }));
      const bg_ = el("g"); PE.props.doctorBag(bg_, {}); c.node(bg_).on((t, s) => { const h = doc.out && doc.out.handL; if (h) { s.x += 330 + h[0] * 1.25; s.y += 1300 + h[1] * 1.25 + 74; s.s *= 0.5; } });
      k.chip("Ärztin", "طبيبة", 330, 455, 34).pop("b5@طبيبة");
      k.chip("+ Hebamme", "قابلة", 330, 575, 34, { yellow: true }).pop("b5@Hebamme");
      const h = el("g"); building(h, { w: 260, h: 300, rows: 2, cols: 2, sign: "", seed: 9 }); c.node(h).on((t, s) => { s.x += 735; s.y += 1300; }).pop("b5@كتولد", 0.4);
      c.put(`<path d="M605 1000 L735 900 L865 1000" fill="none" stroke="${INK}" stroke-width="6"/>`).pop("b5@كتولد", 0.4);
      k.chip("Hausgeburt", "ولادة فالدار", 735, 790, 30).pop("b5@الدار");
    } });

    /* 5 · le bébé en siège : la maman, une fenêtre dans son ventre, la loupe sur l'utérus (tête en haut) ----------- */
    st.scene({ from: "b6", in: "zoom", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      c.camera([{ at: "b6", s: 1.0, cx: 520, cy: 900 }, { at: "b6@الوضعية", s: 1.04, cx: 520, cy: 880, d: 0.6 }]);
      k.ground(540, 1300, 900);
      const WX = 245, WY = 1300, WS = 1.35, WP = Object.assign({}, WOMAN, PP.bothHandsOnBellySide, { view: "side", facing: 1 });
      pp(WX, WY, WS, (t) => Object.assign({}, WP, { expr: t < T("b6@الوضعية") ? "calm" : "worried", blink: rnd(blinkAt(t, 15)), look2: [0.2, 0.8] }));
      const an = PE.util.rig(WP), bx = WX + an.belly[0] * WS + 6, by = WY + an.belly[1] * WS;
      const a = T("b6@الوضعية"), hd = T("b6@الراس");
      const fet = (t) => ({ kick: rnd(Math.pow(Math.max(0, Math.sin((t - a) * 4.2)), 3), 10), hb: rnd(Math.pow(Math.max(0, Math.sin(t * 9)), 4), 5), ghost: rnd(prog(t, hd, 0.5), 10), arrow: rnd(E.out(prog(t, hd + 0.15, 0.7)), 20) });
      c.sk((g, p) => {   // fenêtre dans le ventre
        while (g.firstChild) g.removeChild(g.firstChild);
        const cp = el("clipPath", { id: "bellyWin" }, el("defs", {}, g)); el("ellipse", { cx: 0, cy: 0, rx: 50, ry: 62 }, cp);
        const w = el("g", { "clip-path": "url(#bellyWin)" }, g); el("ellipse", { cx: 0, cy: 0, rx: 50, ry: 62, fill: "#F3F7F8" }, w);
        D.uterus(el("g", { transform: "translate(0 4) scale(0.27)" }, w), p);
        el("ellipse", { cx: 0, cy: 0, rx: 50, ry: 62, fill: "none", stroke: INK, "stroke-width": 3, "stroke-dasharray": "8 6" }, g);
      }, (t) => Object.assign(fet(t), { arrow: 0, ghost: 0 }), bx, by, 1).pop(a - 0.25, 0.35);
      const MX = 672, MY = 840, R = 222;   // la loupe
      c.put(`<path d="M${bx + 40} ${by - 50} L${MX - 150} ${MY - 170} M${bx + 40} ${by + 50} L${MX - 165} ${MY + 150}" stroke="${INK}" stroke-width="3" stroke-dasharray="10 8" fill="none"/>`).wipe(a, 0.4);
      c.sk((g, p) => {
        while (g.firstChild) g.removeChild(g.firstChild);
        el("circle", { cx: 8, cy: 10, r: R, fill: "#D2D2CB" }, g); el("circle", { cx: 0, cy: 0, r: R, fill: "#FFFFFF" }, g);
        const cp = el("clipPath", { id: "magWin" }, el("defs", {}, g)); el("circle", { cx: 0, cy: 0, r: R - 3 }, cp);
        D.uterus(el("g", { transform: "translate(0 10) scale(0.94)" }, el("g", { "clip-path": "url(#magWin)" }, g)), p);
        el("circle", { cx: 0, cy: 0, r: R, fill: "none", stroke: INK, "stroke-width": 6 }, g);
      }, fet, MX, MY, 1).pop(a + 0.15, 0.45);
      k.chip("Beckenlage", "البيبي جالس : الراس ماشي لتحت", 540, 470, 36, { yellow: true }).pop("b6@الوضعية");
    } });

    /* 5b · la règle : en siège → accouchement à l'hôpital ------------------------------------------------------------ */
    st.scene({ from: "b7", in: "slideLeft", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      c.camera([{ at: "b7", s: 1.04, cx: 540, cy: 900 }]);
      k.ground(520, 1300, 900);
      k.card(90, 470, 560, 380, { seed: 71 }).pop("b7@قواعد", 0.35);
      c.text("Leitlinie", 370, 545, 50, "de").pop("b7@قواعد");
      c.sk((g, p) => D.uterus(g, p), (t) => ({ hb: rnd(Math.pow(Math.max(0, Math.sin(t * 9)), 4), 5) }), 215, 690, 0.36).pop(T("b7@قواعد") + 0.1, 0.35);
      c.text("Beckenlage", 480, 670, 36, "de").pop(T("b7@قواعد") + 0.15);
      c.text("→ Klinik", 480, 732, 44, "de").pop(T("b7@قواعد") + 0.3);
      c.text("الولادة خاصها تكون فالسبيطار", 370, 818, 32, "ar strong").wipe("b7@السبيطار", 0.5, "rtl");
      const hs = el("g"); building(hs, { w: 300, h: 330, rows: 2, cols: 3, sign: "KLINIK", cross: true, signMat: MAT.white, seed: 21 });
      c.node(hs).on((t, s) => { s.x += 728; s.y += 1300; s.s *= 0.76; }).slide("b7", 500, 0, 0.45, "back");
      const w0 = T("b7@قواعد") + 0.4;
      pp(0, 0, 0.75, (t) => { const p = prog(t, w0, 1.4); return Object.assign({}, WOMAN, p > 0 && p < 1 ? PP.walk(((t - w0) * 1.3) % 1) : PP.stand, { view: p > 0 ? "side" : "front", facing: 1, expr: "calm", blink: rnd(blinkAt(t, 16)) }); })
        .on((t, s) => { s.x += lerp(170, 565, E.inOut(prog(t, w0, 1.4))); s.y += 1300; });
      k.title("✓", 728, 950, 80).pop(w0 + 1.45);
    } });

    /* 6 · l'hôtel près du cabinet (au fond) ; le couple arrive à pied avec la valise (devant) ; leur promesse -------- */
    st.scene({ from: "b8", in: "slideLeft", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      c.camera([{ at: "b8", s: 1, cx: 540, cy: 900 }, { at: "b8@Hotel", s: 1.06, cx: 450, cy: 920, d: 0.45 }, { at: "b8@العيادة", s: 1, cx: 540, cy: 920, d: 0.45 }]);
      const BASE = 1165, FG = 1330;
      k.ground(540, BASE, 1000);
      c.put(`<rect x="40" y="${BASE}" width="1000" height="${FG - BASE}" fill="#ECEBE4"/><path d="M40 ${BASE + 70} L1040 ${BASE + 70}" stroke="#CFCEC6" stroke-width="2.4" stroke-dasharray="44 30"/>`);
      k.ground(540, FG, 1000);
      const ho = el("g"); building(ho, { w: 380, h: 520, rows: 4, cols: 3, sign: "HOTEL", seed: 3, lit: (r, c2) => r === 2 && c2 === 1 }); c.node(ho).on((t, s) => { s.x += 320; s.y += BASE; s.s *= 0.85; }).pop("b8@Hotel", 0.45);
      const pr = el("g"); building(pr, { w: 260, h: 300, rows: 2, cols: 2, sign: "PRAXIS", signMat: MAT.white, seed: 5 }); c.node(pr).on((t, s) => { s.x += 770; s.y += BASE; s.s *= 0.85; }).pop("b8@العيادة", 0.45);
      c.put(`<path d="M522 1100 L652 1100 M637 1088 L652 1100 L637 1112 M537 1088 L522 1100 L537 1112" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`).pop("b8@قريب");
      k.chip("قريب", null, 587, 1050, 26, { yellow: true }).pop("b8@قريب");
      // ils arrivent à pied (vrai cycle de marche), la valise derrière lui ; à l'arrivée ils se tournent, main dans la main
      const a = T("b8@كراو"), d = 1.5, arrive = a + d, xw = (t) => lerp(-140, 300, E.out(prog(t, a, d)));
      const walker = (base, k0) => (t) => Object.assign({}, base, prog(t, a, d) < 1 ? PP.walk(((t - a) * 1.6 + k0) % 1) : PP.stand, { view: "side", facing: 1, expr: "smile", blink: rnd(blinkAt(t, 5 + k0 * 10)) });
      pp(0, 0, 0.8, walker(Object.assign({}, WOMAN), 0)).on((t, s) => { s.x += xw(t); s.y += FG; }).hide(arrive, 0.15);
      pp(0, 0, 0.84, walker(Object.assign({}, MAN), 0.5)).on((t, s) => { s.x += xw(t) + 120; s.y += FG; }).hide(arrive, 0.15);
      const sc0 = el("g"); PE.props.suitcase(sc0, {}); c.node(sc0).on((t, s) => { s.x += xw(t) + 205; s.y += FG; s.s *= 0.58; }).hide(arrive, 0.15);
      couple(c, 360, FG, 0.82, (t) => ({ mode: "holdHands", exprA: t >= T("b9@طبيعية") ? "love" : "smile", exprB: "smile", heart: rnd(E.out(prog(t, T("b9@طبيعية"), 0.6)), 10), blink: rnd(blinkAt(t, 5)) })).fade(arrive, 0.2);
      const sc1 = el("g"); PE.props.suitcase(sc1, {}); c.node(sc1).on((t, s) => { s.x += 540; s.y += FG; s.s *= 0.58; }).fade(arrive, 0.2);
      // leur promesse
      k.card(110, 370, 860, 320, { seed: 91 }).pop("b9@وقالوا", 0.35);
      k.ar("بغينا ولادة طبيعية…", 540, 455, 40, "ttl").wipe("b9@طبيعية", 0.5, "rtl");
      k.ar("ولكن إلا كان مشكل ← السبيطار + césarienne", 540, 545, 30, "ar strong").wipe("b9@مشكل", 0.7, "rtl");
      k.chip("Plan B: Krankenhaus", "الخطة ب: السبيطار", 540, 598, 26, { yellow: true }).pop("b9@césarienne");
    } });

    /* chambre d'hôtel vue DE FACE : la maman assise dans le lit (la couette cache ses jambes), le papa à gauche, la médecin à droite */
    const RX = 600, MS = 0.95, DXA = 340, NSX = 200;
    const wv = (t, fr, amp) => rnd(amp * Math.sin(t * fr), 2);
    const relTo = (o, sc, pt) => [rnd((pt[0] - o[0]) / sc, 2), rnd((pt[1] - o[1]) / sc, 2)];
    const breathe = (t, s) => { s.y += Math.sin(t * 2.6) * 1.8; };
    const MO = [RX, 1300];
    const momP = (t, extra) => Object.assign({}, WOMAN, PP.stand, { expr: Math.floor(t / 1.1) % 2 ? "pain" : "worried", sweat: true, blink: rnd(blinkAt(t, 18)), armL: [-20, 86], armR: [14, -96], headTilt: wv(t, 3, 3) }, extra || {});
    const momGrip = (t, extra) => momP(t, Object.assign({ expr: Math.floor(t / 1.1) % 2 ? "pain" : "cry", tears: 0.4, reachL: relTo(MO, MS, [RX - 92, 1118]), bendL: -1, reachR: relTo(MO, MS, [RX + 22, 1000]), bendR: 1 }, extra || {}));
    const dadHand = (t, extra) => Object.assign({}, MAN, PP.stand, { expr: "worried", headTilt: 6, look2: [0.6, 0.5], reachR: relTo([DXA, 1300], 1, [RX - 96, 1120 + wv(t, 3, 3)]), bendR: 1, blink: rnd(blinkAt(t, 17)) }, extra || {});
    const DOX = 815, DOS = 0.95;
    const docWork = (t, extra) => Object.assign({}, DOCW, { outfit: "scrubs", badge: null }, PP.stand, { view: "side", facing: -1, expr: "focused", sweat: true, torsoLean: 8, reachL: relTo([DOX, 1300], DOS, [RX + 64 + wv(t, 7, 6), 1068]), reachR: relTo([DOX, 1300], DOS, [RX + 78 - wv(t, 7, 6), 1032]), bendL: 1, bendR: 1, blink: rnd(blinkAt(t, 19)) }, extra || {});
    const roomBack = (c, k, skyP, clockFn, lamp) => {
      c.sk((g, p) => windowSky(g, p), (t) => ({ p: rnd(skyP(t), 40) }), RX, 790, 0.8);
      c.sk((g, p) => PE.props.clockWall(g, { time: p.tm, r: 42 }), clockFn, RX + 280, 700, 1);
      k.ground(540, 1300, 980);
      const ns = el("g"); PE.props.nightstand(ns, { on: lamp }); c.node(ns).on((t, s) => { s.x += NSX; s.y += 1300; s.s *= 0.85; });
      const bb = el("g"); D.bedBack(bb, {}); c.node(bb).on((t, s) => { s.x += RX; s.y += 1300; });
    };
    const bedFront = (c) => { const g = el("g"); D.bedFront(g, {}); return c.node(g).on((t, s) => { s.x += RX; s.y += 1300; }); };
    const hourTm = (h) => ({ tm: [Math.floor(h), Math.round((h % 1) * 12) * 5 % 60] });

    /* 7 · le matin : les douleurs ; le papa appelle la médecin ; elle arrive ~12 h plus tard ------------------------- */
    st.scene({ from: "b10", in: "fade", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      c.camera([{ at: "b10", s: 1.0, cx: 540, cy: 930 }, { at: "b11", s: 1.0, cx: 560, cy: 930, d: 0.5 }]);
      const a = T("b10"), arr = T("b11@دازت") + 0.4, end = T("b12");
      const P = (t) => t < arr ? 0.7 * E.inOut(prog(t, a, arr - a)) : 0.7 + 0.1 * prog(t, arr, end - arr);
      roomBack(c, k, P, (t) => hourTm(t < arr ? lerp(5, 17, E.inOut(prog(t, a, arr - a))) : lerp(17, 18, prog(t, arr, end - arr))), true);
      pp(RX, 1300, MS, (t) => momP(t)).on(breathe);
      bedFront(c);
      const call0 = T("b10@عيطات") - 0.3, call1 = T("b11");
      pp(DXA, 1300, 1, (t) => { const calling = t >= call0 && t < call1; return Object.assign({}, MAN, PP.stand, { expr: "worried", blink: rnd(blinkAt(t, 7)), look2: t >= arr - 0.3 ? [0.9, 0] : calling ? [0.2, 0.7] : [0.6, 0.4], talk: calling ? rnd(talkAt(t, call0 + 0.25, call1), 10) : 0 }, calling ? { reachR: [46, -260], bendR: 1 } : {}); });
      c.sk((g, p) => PE.props.phone(g, { ring: p.r }), (t) => ({ r: t < T("b10@عيطات") && Math.floor(t / 0.18) % 2 === 0 }), DXA + 52, 1020, 0.42).fade(call0, 0.15).hide(call1, 0.15);
      k.chip("📞 Ärztin", "عيطات للطبيبة", 540, 440, 28, { parent: c.hud }).pop("b10@عيطات").hide("b11", 0.2);
      pp(0, 0, DOS, (t) => { const p = prog(t, arr - 0.2, 0.9); return Object.assign({}, DOCW, p > 0 && p < 1 ? PP.walk(((t - arr) * 1.3) % 1) : PP.stand, { view: "side", facing: -1, expr: "calm", blink: rnd(blinkAt(t, 8)) }); })
        .on((t, s) => { s.x += lerp(1160, 820, E.out(prog(t, arr - 0.2, 0.9))); s.y += 1300; });
      k.chip("~ 12 Stunden später", "تقريبا 12 ساعة من بعد", 540, 440, 28, { yellow: true, parent: c.hud }).pop("b11@ساعة");
    } });

    /* 7b · le soir : le travail se bloque — le papa lui tient la main, la médecin (tenue de bloc) les mains sur son ventre */
    st.scene({ from: "b12", in: "cut", inDur: 0, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      c.camera([{ at: "b12", s: 1.06, cx: 580, cy: 990 }, { at: "b12@وقفات", s: 1.0, cx: 560, cy: 960, d: 0.7 }]);
      roomBack(c, k, () => 0.82, (t) => hourTm(lerp(18, 19.5, prog(t, T("b12"), T("b13") - T("b12")))), true);
      pp(RX, 1300, MS, (t) => momGrip(t)).on(breathe);
      bedFront(c);
      pp(DXA, 1300, 1, (t) => dadHand(t));
      pp(DOX, 1300, DOS, (t) => docWork(t, { expr: t < T("b12@وقفات") ? "focused" : "worried" }));
      k.chip("Geburtsstillstand", "الولادة وقفات", 540, 440, 30, { parent: c.hud }).pop("b12@وقفات").wobble("b12@وقفات+0.35", 0.45, 6);
    } });

    /* 8 · le méconium, deux fois ; l'hôpital était tout près ---------------------------------------- */
    st.scene({ from: "b13", in: "cut", inDur: 0, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      c.camera([{ at: "b13", s: 1.08, cx: 540, cy: 820 }, { at: "b14", s: 1, cx: 540, cy: 900, d: 0.5 }]);
      // gros plans : elle a mal, il a peur
      c.sk((g, p) => PE.head(g, p), (t) => Object.assign({}, WOMAN, { expr: "pain", sweat: true, blink: rnd(blinkAt(t, 9)) }), 330, 690, 1.25).pop("b13", 0.35).hide("b14", 0.25);
      c.sk((g, p) => PE.head(g, p), (t) => Object.assign({}, MAN, { expr: "shock", blink: rnd(blinkAt(t, 10)), look2: [-0.5, 0] }), 750, 690, 1.25).pop("b13+0.15", 0.35).hide("b14", 0.25);
      const w1 = el("g"); warn(w1, { n: 1 }); c.node(w1).on((t, s) => { s.x += 430; s.y += 960; }).pop("b13@جوج", 0.35).hide("b14", 0.25);
      const w2 = el("g"); warn(w2, { n: 2 }); c.node(w2).on((t, s) => { s.x += 650; s.y += 960; }).pop("b13@Mekonium", 0.35).hide("b14", 0.25);
      k.chip("Mekonium", "أول خروج ديال البيبي فالما", 540, 1100, 30, { yellow: true }).pop("b13@Mekonium").hide("b14", 0.25);
      k.chip("O₂ ↓", "الأكسجين ما كيوصلش", 540, 1220, 36).pop("b13@الأكسجين").hide("b14", 0.25);
      st.vignette("b13@علامة", 1.4, 2);
      const hs = el("g"); building(hs, { w: 300, h: 330, rows: 2, cols: 3, sign: "KLINIK", cross: true, signMat: MAT.white, seed: 21 });
      c.node(hs).on((t, s) => { s.x += 770; s.y += 1300; s.s *= 0.8; }).pop("b14", 0.35);
      const ho = el("g"); building(ho, { w: 260, h: 380, rows: 3, cols: 2, sign: "HOTEL", seed: 3, lit: (r, c2) => r === 1 && c2 === 0 }); c.node(ho).on((t, s) => { s.x += 280; s.y += 1300; s.s *= 0.8; }).pop("b14", 0.35);
      k.ground(540, 1300, 1000);
      c.put(`<path d="M420 1150 L640 1150 M620 1134 L640 1150 L620 1166" fill="none" stroke="${INK}" stroke-width="6" stroke-dasharray="16 10" stroke-linecap="round"/>`).wipe("b14@قريب", 0.45);
      k.chip("قريب", null, 530, 1060, 26, { yellow: true }).pop("b14@قريب");
      k.title("✗", 530, 1190, 90).pop("b14@صيفتهاش").wobble("b14@صيفتهاش+0.25", 0.45, 8);
      pp(300, 1300, 0.66, (t) => Object.assign({}, DOCW, PP.stand, { facing: -1, expr: "focused", blink: rnd(blinkAt(t, 11)) })).pop("b14@مكملة", 0.35);
    } });

    /* 9 · la naissance : la petite dans les bras de sa maman… le moniteur ralentit, puis la ligne plate.
     *     La maman pleure sur son bébé, le papa l'enlace, la médecin tombe à genoux. -------------------------------- */
    st.scene({ from: "b15", in: "fade", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const born = T("b15@زادت"), quiet = T("b15@end") + 0.45, q2 = quiet + 0.3;
      c.camera([{ at: "b15", s: 1.03, cx: 560, cy: 990 }, { at: quiet, s: 1.06, cx: 560, cy: 1020, d: 3.0, ease: "lin" }]);
      roomBack(c, k, () => 1, () => ({ tm: [22, 0] }), false);
      const ph = (t) => t < born ? t * 1.3 : born * 1.3 + (t - born) * 0.75;
      c.sk((g, p) => D.monitor(g, p), (t) => ({ t: rnd(ph(t) % 1, 30), flat: t >= quiet ? 1 : 0, alarm: t >= quiet }), NSX, 1201, 0.72);
      const BX = RX - 6, BY = 1058;
      const hold = { pregnant: false, outfit: "casual", look2: [0, 1], reachL: relTo(MO, MS, [BX - 74, BY + 16]), bendL: -1, reachR: relTo(MO, MS, [BX + 68, BY + 18]), bendR: 1 };
      const mom = (t) => t < born ? momGrip(t, { expr: "pain" })
        : Object.assign(momP(t), hold, { expr: t < quiet ? "worried" : "cry", tears: t < quiet ? 0.3 : 1, headTilt: t < quiet ? -4 : rnd(-10 + 2 * Math.sin(t * 2.5), 2) });
      const DXB = 455, dadHug = (t) => Object.assign({}, MAN, PP.stand, { expr: "cry", tears: 1, headTilt: 14, look2: [0.5, 1], reachR: relTo([DXB, 1300], 1, [RX + 56, 962]), bendR: 1, blink: rnd(blinkAt(t, 20)) });
      pp(DXB, 1300, 1, (t) => Object.assign(dadHug(t), { only: "armR" })).fade(q2, 0.35);        // son bras passe derrière elle
      pp(RX, 1300, MS, mom).on(breathe);
      bedFront(c);
      const bb = el("g"); PE.baby(bb, { state: "sleep" }); c.node(bb).on((t, s) => { s.x += BX + 15; s.y += BY + Math.sin(t * 2.6) * 1.8; s.s *= 0.92; }).pop(born, 0.4);
      pp(RX, 1300, MS, (t) => Object.assign(mom(t), { only: ["handL", "handR"] })).on(breathe).on((t, s) => { s.o *= t >= born ? 1 : 0; });
      pp(DXA, 1300, 1, (t) => t < born ? dadHand(t) : Object.assign({}, MAN, PP.stand, { expr: "worried", headTilt: 8, look2: [0.8, 0.7], blink: rnd(blinkAt(t, 17)) })).hide(quiet, 0.3);
      pp(DXB, 1300, 1, (t) => Object.assign(dadHug(t), { hide: ["armR"] })).fade(q2, 0.35);
      pp(DXB, 1300, 1, (t) => Object.assign(dadHug(t), { only: "handR" })).fade(q2, 0.35);
      pp(DOX, 1300, DOS, (t) => t < born ? docWork(t) : Object.assign({}, DOCW, { outfit: "scrubs", badge: null }, PP.stand, { view: "side", facing: -1, expr: "worried", sweat: true, look2: [0.8, 0.6], blink: rnd(blinkAt(t, 19)) })).hide(quiet, 0.3);
      pp(795, 1300, 0.85, (t) => Object.assign({}, DOCW, { outfit: "scrubs", badge: null, facing: -1 }, PP.kneel, { expr: "sad", headTilt: 22, look2: [0, 1], armL: [14, 30], armR: [22, 24], tears: 0.6, blink: rnd(blinkAt(t, 22)) })).fade(q2, 0.35);
      k.ar("البنت ما عاشتش", 540, 1440, 66, "ttl", c.hud).wipe(quiet + 0.9, 0.8, "rtl").hide("b16", 0.2);
      c.tick((t) => { const g = E.inOut(prog(t, quiet + 0.6, 1.4)); c.layer.style.filter = g > 0 ? `grayscale(${(g * 0.85).toFixed(2)})` : ""; });
    } });

    /* 10 · l'expert : 4 heures plus tôt → hôpital → césarienne → bébé en bonne santé ---------------- */
    st.scene({ from: "b16", in: "fade", inDur: 0.4, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      c.camera([{ at: "b16", s: 1, cx: 540, cy: 900 }]);
      pp(215, 1300, 0.95, (t) => Object.assign({}, EXPERT, PP.point, { facing: 1, expr: "focused", talk: rnd(talkAt(t, T("b16"), T("b16@end")), 10), blink: rnd(blinkAt(t, 13)) }));
      k.chip("Gutachter", "الخبير", 225, 760, 30).pop("b16@الخبير");
      [["− 4 h", "ربعة د السوايع قبل", 390, "b16@ربعة"], ["Klinik", "السبيطار", 560, "b16@للسبيطار"], ["Kaiserschnitt", "césarienne", 730, "b16@césarienne"]].forEach(([d, a, x, at], i) => {
        k.card(x - 78, 520, 156, 130, { seed: 140 + i }).pop(at, 0.35);
        c.text(d, x, 595, d.length > 8 ? 22 : 32, "de").pop(at);
        c.text(a, x, 690, 22, "ar strong").wipe(at + "+0.1", 0.4, "rtl");
      });
      c.sk((g, p) => {   // la petite, en ange, à côté du Gutachter
        while (g.firstChild) g.removeChild(g.firstChild);
        D.wings(el("g", { transform: "translate(18 -52)" }, g), { flap: p.f, size: 1.3 });
        PE.baby(el("g", { transform: "scale(1.15)" }, g), { state: "sleep" });
        D.halo(el("g", { transform: "translate(-72 -96)" }, g), { r: 42 });
      }, (t) => ({ f: rnd((Math.sin(t * 5) + 1) / 2, 10) }), 560, 1050, 1).pop("b16@بصحتها", 0.5).float(8, 2.6);
    } });

    /* 11 · Dortmund : pas « négligence », mais Totschlag --------------------------------------------- */
    st.scene({ from: "b17", in: "wipe", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      c.camera([{ at: "b17", s: 1, cx: 540, cy: 900 }]);
      const strike = T("b18@حكمات");
      const jp = (t) => Object.assign({}, JUDGE, PP.stand, { expr: t < strike ? "focused" : "angry", armL: [-24, 70], armR: [24, -70], blink: rnd(blinkAt(t, 14)) });
      pp(540, 1300, 1.25, (t) => Object.assign(jp(t), { hide: ["armL", "armR"] }));
      k.prop("dock", 540, 1312, 1.3, () => ({ w: 520, h: 180, seed: 44 }));
      pp(540, 1300, 1.25, (t) => Object.assign(jp(t), { only: "arms" }));
      c.sk((g, p) => K.gavel(g, { x: 0, y: 0, rot: p.ang - 20, scale: 1.1 }), (t) => ({ ang: Math.round(t < strike - 0.4 ? 0 : t < strike ? -35 * E.out(prog(t, strike - 0.4, 0.3)) : -35 * (1 - E.in(prog(t, strike, 0.12)))) }), 730, 1050, 1);
      c.shake(strike + 0.12, 10, 0.4); c.kick(strike + 0.12, 0.07);
      k.chip("LG Dortmund · 2014", "المحكمة ديال Dortmund", 540, 420, 34).pop("b17@Dortmund").hide("b19@عارفة", 0.2);
      k.card(135, 520, 345, 170, { seed: 171 }).pop("b17@fahrlässige");
      c.text("fahrlässige Tötung", 307, 600, 30, "de").pop("b17@fahrlässige");
      c.text("قتل بالإهمال", 307, 655, 26, "ar strong").wipe("b17@fahrlässige+0.15", 0.4, "rtl");
      c.put(`<path d="M150 540 L465 670 M465 540 L150 670" stroke="#C9625A" stroke-width="9" stroke-linecap="round"/>`).wipe("b17@fahrlässige+0.6", 0.35);
      k.card(600, 520, 345, 170, { seed: 172, yellow: true }).pop(strike);
      c.text("Totschlag", 772, 600, 44, "de").pop(strike);
      c.text("قتل عمد (قبلات الخطر)", 772, 655, 26, "ar strong").wipe(strike + 0.15, 0.4, "rtl");
      k.chip("sie kannte die Gefahr", "كانت عارفة بالخطر", 540, 420, 30, { yellow: true }).pop("b19@عارفة+0.1");
    } });

    /* 12 · la peine : son visage (grimaces) + une icône pour chaque sanction ------------------------------------------ */
    st.scene({ from: "b20", in: "cut", inDur: 0, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      c.camera([{ at: "b20", s: 1.0, cx: 520, cy: 820 }, { at: "b20@ومنعوها", s: 1.0, cx: 520, cy: 890, d: 0.5 }]);
      const j = T("b20@الحبس"), m = T("b20@ومنعوها"), hb = T("b20@Hebamme");
      c.sk((g, p) => PE.head(g, p), (t) => {
        let expr = "shock", tears = 0, tilt = rnd(3 * Math.sin(t * 9), 2), mouth;
        if (t >= j) { expr = "cry"; tears = rnd(Math.min(1, prog(t, j, 0.6)), 10); tilt = rnd(7 * Math.sin(t * 7), 2); mouth = "wail"; }
        if (t >= m && t < m + 0.5) { expr = "shock"; mouth = undefined; tilt = 0; }
        if (t >= m + 0.5) { expr = "pain"; tears = 1; tilt = rnd(8 * Math.sin(t * 6), 2); mouth = undefined; }
        if (t >= hb) { expr = "cry"; mouth = "wail"; }
        return Object.assign({}, DOCW, { expr, tears, sweat: true, headTilt: tilt, blink: rnd(blinkAt(t, 23)), mouth });
      }, 520, 640, 1.9).pop("b20", 0.4);
      const row = (y, icon, de, ar, at, seed) => {
        k.card(160, y - 85, 700, 170, { seed }).pop(at, 0.35);
        const ic = el("g"); icon(ic); c.node(ic).on((t, s) => { s.x += 248; s.y += y; }).pop(at + 0.05, 0.4);
        c.text(de, 572, y - 6, de.length > 20 ? 36 : 44, "de").pop(at + 0.1);
        c.text(ar, 572, y + 52, 30, "ar strong").wipe(at + 0.25, 0.45, "rtl");
      };
      row(960, D.iconBars, "6 Jahre 9 Monate Haft", "ست سنين وتسع شهور ديال الحبس", T("b20") + 0.1, 201);
      row(1170, D.iconBan, "lebenslanges Berufsverbot", "ممنوعة تخدم طول حياتها", m, 202);
      c.kick(j, 0.06); c.kick(m, 0.06);
    } });

    /* 12b · l'argent : les billets partent de la main de la médecin et arrivent dans la main du papa ------------------ */
    st.scene({ from: "b21", in: "slideLeft", inDur: 0.25, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      c.camera([{ at: "b21", s: 1.05, cx: 520, cy: 960 }]);
      k.ground(520, 1300, 900);
      const a = T("b21") + 0.2;
      const DP = Object.assign({}, DOCW, PP.holdHandOut, { expr: "sad", tears: 0.7 }), da = PE.util.rig(DP), dh = [230 + da.handR[0], 1300 + da.handR[1]];
      const MP = Object.assign({}, MAN, PP.holdHandOutSide, { facing: -1, expr: "sad" }), ma = PE.util.rig(MP), mh = [605 + ma.handR[0], 1300 + ma.handR[1]];
      pp(230, 1300, 1.0, (t) => Object.assign({}, DP, { blink: rnd(blinkAt(t, 24)), look2: [0.6, 0.2] }));
      pp(770, 1300, 0.95, (t) => Object.assign({}, WOMAN, PP.stand, { pregnant: false, outfit: "casual", expr: "sad", tears: 0.5, view: "three-quarter", facing: -1, look2: [0.5, 0.3], blink: rnd(blinkAt(t, 25)) }));
      pp(605, 1300, 1.0, (t) => Object.assign({}, MP, { blink: rnd(blinkAt(t, 26)) }));
      for (let i = 0; i < 5; i++) {
        const n = el("g"); D.banknote(n, { seed: 330 + i, w: 80 });
        const end = [mh[0] + (i % 2 ? 5 : -5), mh[1] - 8 - i * 5];
        c.node(n).on((t, s) => { const p = E.inOut(prog(t, a + i * 0.18, 0.75)); s.x += lerp(dh[0], end[0], p); s.y += lerp(dh[1] - 10, end[1], p) - Math.sin(p * Math.PI) * 120; s.r += lerp(-14, i % 2 ? 6 : -4, p); s.o *= t >= a + i * 0.18 ? 1 : 0; });
      }
      const n0 = c.text("0 €", 520, 680, 96, "de"); n0.fade(a, 0.2).on((t) => { const v = Math.round(50 * E.out(prog(t, a, 1.2))) * 1000, txt = "≈ " + v.toLocaleString("de-DE") + " €"; if (n0.textEl.textContent !== txt) n0.textEl.textContent = txt; });
      k.chip("an die Eltern", "تعويض للوالدين", 520, 790, 32, { yellow: true }).pop("b21@خمسين");
      const ic = el("g"); D.iconMoney(ic); c.node(ic).on((t, s) => { s.x += 520; s.y += 520; }).pop(a, 0.4);
    } });

    /* 12c · le BGH (Karlsruhe) confirme : définitif ---------------------------------------------------------------------- */
    st.scene({ from: "b22", in: "zoom", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      c.camera([{ at: "b22", s: 1.0, cx: 520, cy: 900 }, { at: "b22@BGH", s: 1.12, cx: 470, cy: 900, d: 0.5 }]);
      const geo = drawDE(c, 480, 900, 52, "b22"), [kx, ky] = geo(8.40, 49.01);
      pinAt(c, kx, ky, "b22@BGH");
      k.chip("BGH · Karlsruhe · 2016", "أعلى محكمة فألمانيا", 500, 520, 30).pop("b22@BGH");
      k.prop("stamp", 520, 1250, 0.6, () => ({ text: "RECHTSKRÄFTIG", size: 54, rot: -8 })).slam("b22@نهائي", 0.28, 10);
    } });

    /* 13 · ce que le tribunal lui reproche ---------------------------------------------------------------- */
    st.scene({ from: "b23", in: "slideUp", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      c.camera([{ at: "b23", s: 1.08, cx: 540, cy: 860 }, { at: "b23@وقفي", s: 1.0, cx: 540, cy: 900, d: 0.35 }]);
      const ho = el("g"); building(ho, { w: 280, h: 360, rows: 3, cols: 2, sign: "HOTEL", seed: 3 }); c.node(ho).on((t, s) => { s.x += 330; s.y += 960; s.s *= 0.9; }).pop("b23", 0.35);
      k.title("✓", 330, 520, 90).pop("b23@Hotel");
      c.text("ماشي هادي", 330, 1030, 32, "ar strong").wipe("b23@لامتش", 0.4, "rtl");
      const hs = el("g"); building(hs, { w: 280, h: 330, rows: 2, cols: 3, sign: "KLINIK", cross: true, signMat: MAT.white, seed: 21 }); c.node(hs).on((t, s) => { s.x += 722; s.y += 960; s.s *= 0.9; }).pop("b23@لامتها", 0.35);
      k.title("✗", 722, 560, 90).pop("b23@صيفتهاش");
      c.text("ما صيفطاتهاش", 722, 1030, 32, "ar strong").wipe("b23@صيفتهاش", 0.4, "rtl");
      k.prop("stamp", 540, 1255, 0.72, () => ({ text: "STOP", size: 90, rot: -6 })).slam("b23@وقفي", 0.28, 12);
    } });

    /* 14 · la règle : le patient pèse plus que le plan ------------------------------------------------------- */
    st.scene({ from: "b24", in: "fade", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      c.camera([{ at: "b24", s: 1, cx: 540, cy: 860 }]);
      k.ar("القاعدة", 540, 420, 56, "ttl", c.hud).wipe("b24", 0.45, "rtl");
      c.sk((g, p) => scale(g, p), (t) => ({ left: "الخطة", right: "المريض", tilt: rnd(14 * E.out(prog(t, T("b24@أهم"), 0.9)), 10) }), 540, 1000, 1).pop("b24", 0.35);
      k.chip("Zeichen ändern sich → Plan ändern", "تبدلات الحالة ← بدل الخطة", 540, 1088, 28).pop("b25@تبدل");
      k.ribbon("Klinik ist keine Niederlage.", 540, 1234, { size: 44 }).wipe("b26", 0.45);
      c.text("والمشية للسبيطار ماشي عيب", 540, 1322, 34, "ar strong").wipe("b26+0.15", 0.5, "rtl");
    } });

    /* ---------- HUD : barre des heures + barre de progression + logo ---------- */
    {
      const hEl = document.getElementById("hours"), fill = hEl.querySelector(".fill"), ghost = hEl.querySelector(".ghost"), now = hEl.querySelector(".now"), evs = [...hEl.querySelectorAll(".ev")];
      const W0 = 780, hx = (h) => (W0 * (h - 5) / 17);
      evs.forEach((e) => { e.style.left = hx(+e.dataset.h) + "px"; });
      const a = T("b10"), arr = T("b11@دازت") + 0.4, mk = T("b13@جوج"), birth = T("b15@زادت"), on0 = T("b10") - 0.2, off0 = T("b15@end") + 0.4, on1 = T("b16"), off1 = T("b16@end") + 0.2;
      const hourAt = (t) => t < arr ? lerp(5, 17, E.inOut(prog(t, a, arr - a))) : t < mk ? lerp(17, 19.3, prog(t, arr, mk - arr)) : lerp(19.3, 22, prog(t, mk, birth - mk));
      const evAt = [a, arr, mk, birth];
      const progEl = document.getElementById("prog"), bar = progEl.firstElementChild, total = T("b26@end"), endT = total + 0.15;
      const brand = document.getElementById("brand");
      sv.hooks.push((t) => {
        const vis = (t >= on0 && t < off0) || (t >= on1 && t < off1);
        hEl.style.opacity = vis ? "1" : "0";
        const h = t >= on1 ? 22 : hourAt(t), x = hx(h);
        fill.style.width = x + "px";
        const hh = Math.floor(h), mm = Math.round((h - hh) * 60 / 5) * 5, txt = `${String(hh + (mm === 60 ? 1 : 0)).padStart(2, "0")}:${String(mm === 60 ? 0 : mm).padStart(2, "0")}`;
        if (now.textContent !== txt) now.textContent = txt;
        now.style.left = x + "px";
        evs.forEach((e, i) => { e.style.opacity = t >= evAt[i] ? "1" : "0"; });
        // l'expert : un repère vert à 18:00 (« 4 heures plus tôt »)
        const g = prog(t, T("b16@ربعة"), 0.5); ghost.style.left = hx(18) + "px"; ghost.style.opacity = t >= on1 ? g.toFixed(2) : "0";
        progEl.style.opacity = t > 0.2 && t < endT ? "1" : "0";
        bar.style.width = (100 * clamp(t / total, 0, 1)).toFixed(2) + "%";
        const intro = t >= T("i1") - 0.1 && t < T("b3") - 0.1;
        brand.style.opacity = intro ? "0" : (t < 0.25 ? t / 0.25 : t < endT ? 1 : Math.max(0, 1 - (t - endT) / 0.3)).toFixed(3);
      });
    }

    /* ---------- affiche finale + appel à commenter (écrit, pas dit) ---------- */
    st.flash("b26@end+0.15", 0.35, 0.85);
    st.summary({ at: "b26@end+0.15", in: "cut", dezoomAt: "b26@end+0.5", cols: 6, crop: [230, 1310], top: 372, gap: 10, side: 92,
      below(c, cells) {
        SketchUI.dots(c);
        const k = kit(c);
        k.ribbon("AKTE 02 · الولادة فالأوطيل", 540, 312, { size: 36, w: 470 });
        k.chip("@dr.aguilo", null, 180, 312, 20);
        k.chip("AKTE 03 · قريبا", null, 885, 312, 18, { yellow: true });
        cells.forEach((cell) => {
          const g = el("g");
          el("path", { d: SC.util.rrect(cell.x, cell.y, cell.w, cell.h, 14), fill: "#D2D2CB", transform: "translate(6 8)" }, g);
          el("path", { d: SC.util.rrect(cell.x, cell.y, cell.w, cell.h, 14), fill: "#F7F7F1" }, g);
          c.node(g);
        });
      },
      above(c, cells) {
        // appel à commenter (écrit, pas dit) + flèche vers le bouton « commenter » d'Instagram (x≈950, y≈1194)
        const k = kit(c);
        k.card(110, 960, 760, 300, { seed: 990 }).pop("b26@end+2.7", 0.4);
        k.ar("شنو رأيك فهاد القصة؟", 490, 1060, 38, "ttl").wipe("b26@end+2.8", 0.6, "rtl");
        k.ar("كتب ليا فالكومنتير", 490, 1170, 32, "ar strong").wipe("b26@end+3.2", 0.5, "rtl");
        c.put(`<path d="M780 1150 C 860 1150, 900 1160, 918 1196 M896 1186 L918 1196 L922 1172" stroke="#1C1A1C" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).wipe("b26@end+3.4", 0.4);
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
