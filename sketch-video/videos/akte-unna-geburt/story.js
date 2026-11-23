/* AKTE 02 — « Die Hotelgeburt » (Unna 2008 · LG Dortmund 01.10.2014, 37 Ks 3/11 · BGH 11.05.2016, 4 StR 428/15).
 * Nouveautés par rapport aux épisodes précédents : décors (voyage, hôtel jour/nuit, chambre avec fenêtre dont le ciel
 * change, cabinet, hôpital tout proche, Karlsruhe), barre des heures 05:00 → 22:00, scènes de famille, balance finale.
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
          if (ar) SC.util.text(g, ar, 0, h / 2 + size * 0.95, Math.max(26, Math.round(size * 0.82)), { font: "'Plex Arabic', sans-serif", weight: 600, fill: "#3E3C37", rtl: true });
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
    function suitcase(g) {
      const C = U.ctx(g, 41, false, 1);
      U.shape(C, "b", U.rrect(-40, -70, 80, 70, 8), MAT.yellow, { sw: 3 });
      U.stroke(C, "h", "M-14 -70 L-14 -86 L14 -86 L14 -70", { sw: 3 });
      U.stroke(C, "s", "M-40 -36 L40 -36", { sw: 2 });
    }
    function car(g) {
      const C = U.ctx(g, 43, false, 1);
      U.shape(C, "body", "M-60 0 L-60 -26 L-36 -30 L-20 -52 L26 -52 L42 -30 L60 -26 L60 0 Z", MAT.yellow, { sw: 3 });
      U.shape(C, "win", "M-14 -46 L20 -46 L32 -31 L-28 -31 Z", { base: "#EAF1F4" }, { sw: 2 });
      [-34, 34].forEach((x, i) => el("circle", { cx: x, cy: 0, r: 13, fill: "#3A3A37", stroke: INK, "stroke-width": 2.5 }, g));
    }
    function bag(g) {
      const C = U.ctx(g, 47, false, 1);
      U.shape(C, "b", U.rrect(-34, -44, 68, 44, 10), { base: "#6C6C66", hatch: "#262624", gap: 5, fw: 1.3 }, { sw: 2.8 });
      U.stroke(C, "h", "M-14 -44 C -14 -60, 14 -60, 14 -44", { sw: 3 });
      el("path", { d: "M-6 -28 h12 v6 h6 v12 h-6 v6 h-12 v-6 h-6 v-12 h6 Z", fill: "#fff", stroke: INK, "stroke-width": 1.6 }, g);
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
    const DOC = (extra) => Object.assign({ outfit: "coat", hair: "bun", badge: "Dr", seed: 61 }, extra || {});
    const pregnant = (c, n, x0, y0, s, parent) => {   // ventre de la future mère (silhouette)
      const b = c.put(`<ellipse cx="0" cy="0" rx="46" ry="54" fill="#DDDDD8" stroke="#6E6E68" stroke-width="3"/><path d="M-30 -20 l60 30 M-34 6 l60 30" stroke="#A1A19B" stroke-width="2"/>`, 0, 0, 1, 0, parent);
      b.on((t, sx) => { const h = n.out && n.out.hip; if (h) { sx.x += x0 + h[0] * s + 6 * s; sx.y += y0 + (h[1] - 62) * s; sx.s *= s; } });
      return b;
    };

    /* 1 · l'accroche : 6 ans et 9 mois + interdiction à vie ---------------------------------- */
    st.scene({ from: 0, in: "cut", inDur: 0, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: 0, s: 1.3, cx: 540, cy: 700 }, { at: "b1@بست", s: 1.1, cx: 540, cy: 860, d: 0.5 }, { at: "b1@ومنعوها", s: 1, cx: 540, cy: 900, d: 0.6 }]);
      const b = el("g"); bars(b); c.node(b).on((t, s) => { s.x += 316; s.y += 330; s.s *= 0.8; }).wipe(0.05, 0.55, "down");
      k.person(540, 830, 1.0, (t) => DOC({ expr: t > T("b1@الحبس") ? "sad" : "unsure" }), null);
      // compteur qui roule jusqu'à 6 ans / 9 mois
      const a = T("b1@بست"), yrs = c.text("0", 380, 1010, 130, "de"), mos = c.text("0", 700, 1010, 130, "de");
      [yrs, mos].forEach((n, i) => n.fade(a - 0.1, 0.2).on((t) => { const v = Math.round((i ? 9 : 6) * E.out(prog(t, a + i * 0.35, 0.8))); if (n.textEl.textContent !== String(v)) n.textEl.textContent = String(v); }));
      k.ar("سنين", 380, 1080, 34, "ttl").fade(a + 0.3); k.ar("شهور", 700, 1080, 34, "ttl").fade(a + 0.6);
      k.chip("Haft", "حبس", 540, 980, 30, { yellow: true }).pop("b1@الحبس");
      c.kick("b1@الحبس", 0.07); st.flash("b1@الحبس", 0.25, 0.4);
      // l'Approbation déchirée
      const lic = c.sk((g, p) => licence(g, p), (t) => ({ cut: Math.round(E.out(prog(t, T("b1@ومنعوها") + 0.2, 0.5)) * 10) / 10 }), 540, 1250, 0.8).pop("b1@ومنعوها", 0.4);
      k.prop("stamp", 560, 1220, 0.5, () => ({ text: "LEBENSLANGES BERUFSVERBOT", size: 44, rot: -6 })).slam("b1@حياتها", 0.3, 12);
    } });

    /* 2 · une seule décision : ne pas changer de plan ------------------------------------------ */
    st.scene({ from: "b2", in: "whip", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b2", s: 1.1, cx: 540, cy: 900 }, { at: "b2@الخطة", s: 1.25, cx: 540, cy: 860, d: 0.6 }]);
      k.ar("ماشي غلطة صغيرة", 540, 430, 46, "ttl", c.hud).wipe("b2", 0.5, "rtl");
      // fourche : le plan (tout droit) / l'hôpital (à droite)
      c.put(`<path d="M540 1240 L540 900 M540 900 C 540 760, 420 700, 330 600 M540 900 C 540 760, 660 700, 750 600" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>`).wipe("b2@قرار", 0.6, "down");
      k.chip("Plan: Hausgeburt", "الخطة: ولادة فالدار", 300, 540, 32).pop("b2@قرار+0.3");
      k.chip("Krankenhaus", "السبيطار", 780, 540, 32, { yellow: true }).pop("b2@قرار+0.45");
      k.title("✗", 780, 470, 90).pop("b2@تبدل").wobble("b2@تبدل+0.3", 0.5, 8);
      const dot = c.put(`<circle r="22" fill="#F8CE4E" stroke="${INK}" stroke-width="4"/>`, 540, 1220);
      dot.on((t, s) => { const p = E.inOut(prog(t, T("b2@قرار") + 0.4, 1.4)); const q = Math.min(1, p * 1.6); const x = p < 0.6 ? 540 : lerp(540, 330, (p - 0.6) / 0.4), y = p < 0.6 ? lerp(1220, 900, q) : lerp(900, 600, (p - 0.6) / 0.4); s.x += x - 540; s.y += y - 1220; });
      c.kick("b2@الخطة", 0.06);
    } });

    /* 3 · la carte : Unna, 2008 ; 4 · le voyage depuis la Lettonie ------------------------------- */
    st.scene({ from: "b3", in: "iris", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      const geo = drawDE(c, 560, 860, 66, "b3"), [ux, uy] = geo(7.69, 51.54);
      c.camera([{ at: "b3", s: 1.05, cx: 560, cy: 880 }, { at: "b3@Unna", s: 1.3, cx: 520, cy: 860, d: 0.6 }, { at: "b4", s: 1, cx: 560, cy: 860, d: 0.6 }]);
      k.chip("2008 · echter Fall", "قصة حقيقية", 560, 470, 32).pop("b3@حقيقية");
      pinAt(c, ux, uy, "b3@Unna");
      k.chip("Unna", null, ux - 120, uy - 40, 32, { yellow: true }).pop("b3@Unna+0.3");
      // voyage : de la Lettonie (hors carte, nord-est) jusqu'à Unna
      const path = `M960 360 C 860 420, 760 520, ${ux + 40} ${uy - 60}`;
      c.put(`<path d="${path}" fill="none" stroke="${INK}" stroke-width="5" stroke-dasharray="14 12" stroke-linecap="round"/>`).wipe("b4", 0.8, "rtl");
      k.chip("Lettland", "لاتفيا", 800, 400, 30).pop("b4+0.45");
      const cr = el("g"); car(cr); const P = el("path", { d: path }); const len = () => P.getTotalLength();
      c.node(cr).on((t, s) => { const p = E.inOut(prog(t, T("b4") + 0.2, 1.4)); const pt = P.getPointAtLength(len() * p); s.x += pt.x; s.y += pt.y - 10; s.s *= 0.8; s.o *= t >= T("b4") ? 1 : 0; });
      k.chip("Couple aus Deutschland", "زوج ألماني", 760, 1220, 28).pop("b4@Couple");
    } });

    /* 5 · la médecin qui est aussi sage-femme ------------------------------------------------------ */
    st.scene({ from: "b5", in: "whip", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b5", s: 1.2, cx: 420, cy: 900 }, { at: "b5@Hebamme", s: 1.05, cx: 540, cy: 900, d: 0.6 }]);
      k.ground(540, 1300, 900);
      const doc = k.person(330, 1300, 1.3, () => Object.assign(DOC({ expr: "calm" }), SC.Pose.stand));
      const bg_ = el("g"); bag(bg_); c.node(bg_).on((t, s) => { const h = doc.out && doc.out.handL; if (h) { s.x += 330 + h[0] * 1.3; s.y += 1300 + h[1] * 1.3 + 40; } });
      k.chip("Ärztin", "طبيبة", 330, 600, 34).pop("b5@طبيبة");
      k.chip("+ Hebamme", "قابلة", 330, 720, 34, { yellow: true }).pop("b5@Hebamme");
      const h = el("g"); building(h, { w: 260, h: 300, rows: 2, cols: 2, sign: "", seed: 9 }); c.node(h).on((t, s) => { s.x += 760; s.y += 1300; }).pop("b5@كتولد", 0.5);
      c.put(`<path d="M630 1000 L760 900 L890 1000" fill="none" stroke="${INK}" stroke-width="6"/>`).pop("b5@كتولد", 0.5);
      k.chip("Hausgeburt", "ولادة فالدار", 760, 820, 30).pop("b5@الدار");
    } });

    /* 6 · le bébé en siège ; 7 · la règle : à l'hôpital ------------------------------------------- */
    st.scene({ from: "b6", in: "zoom", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b6", s: 1.15, cx: 540, cy: 860 }, { at: "b7", s: 1, cx: 540, cy: 900, d: 0.6 }]);
      c.sk((g, p) => uterusBreech(g, p), (t) => ({ arrow: t >= T("b6@الراس") }), 540, 820, 1.1).pop("b6", 0.5);
      k.chip("Beckenlage", "البيبي جالس : الراس ماشي لتحت", 540, 470, 36, { yellow: true }).pop("b6@الوضعية");
      k.title("?", 760, 700, 80).pop("b6@الراس").wobble("b6@مقبل", 0.5, 10);
      // la règle : à l'hôpital
      const hs = el("g"); building(hs, { w: 300, h: 330, rows: 2, cols: 3, sign: "KLINIK", cross: true, signMat: MAT.white, seed: 21 });
      c.node(hs).on((t, s) => { s.x += 760; s.y += 1300; s.s *= 0.85; }).slide("b7", 500, 0, 0.5, "back");
      k.card(100, 1035, 420, 200, { seed: 71 }).pop("b7@قواعد");
      c.text("Leitlinie:", 310, 1100, 34, "de").pop("b7@قواعد");
      c.text("Beckenlage → Klinik", 310, 1150, 34, "de").pop("b7@قواعد+0.15");
      c.text("الولادة خاصها تكون فالسبيطار", 310, 1200, 28, "ar strong").wipe("b7@السبيطار", 0.6, "rtl");
    } });

    /* 8 · l'hôtel près du cabinet ; 9 · « si problème → hôpital » ---------------------------------- */
    st.scene({ from: "b8", in: "slideLeft", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b8", s: 1, cx: 540, cy: 900 }, { at: "b8@Hotel", s: 1.12, cx: 400, cy: 900, d: 0.5 }, { at: "b8@العيادة", s: 1, cx: 540, cy: 900, d: 0.5 }]);
      k.ground(540, 1300, 1000);
      const ho = el("g"); building(ho, { w: 380, h: 560, rows: 4, cols: 3, sign: "HOTEL", seed: 3, lit: (r, c2) => r === 2 && c2 === 1 }); c.node(ho).on((t, s) => { s.x += 330; s.y += 1300; }).pop("b8@Hotel", 0.5);
      const pr = el("g"); building(pr, { w: 260, h: 300, rows: 2, cols: 2, sign: "PRAXIS", signMat: MAT.white, seed: 5 }); c.node(pr).on((t, s) => { s.x += 760; s.y += 1300; }).pop("b8@العيادة", 0.5);
      c.put(`<path d="M540 1180 L640 1180 M624 1166 L640 1180 L624 1194 M540 1180 M556 1166 L540 1180 L556 1194" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`).pop("b8@قريب");
      k.chip("قريب", null, 590, 1120, 26, { yellow: true }).pop("b8@قريب");
      // le couple arrive avec la valise
      const mom = k.walker({ at: "b8@كراو", dur: 1.3, x0: -120, x1: 290, y: 1300, s: 1.0, outfit: "mother", seed: 32 });
      pregnant(c, mom, 0, 0, 1.0).on((t, s) => { s.x += lerp(-120, 290, clamp((t - T("b8@كراو")) / 1.3, 0, 1)); s.y += 1300; });
      k.walker({ at: "b8@كراو+0.2", dur: 1.3, x0: -200, x1: 190, y: 1300, s: 1.05, outfit: "civil", seed: 31 });
      const sc_ = el("g"); suitcase(sc_); c.node(sc_).on((t, s) => { s.x += lerp(-160, 120, clamp((t - T("b8@كراو") - 0.2) / 1.3, 0, 1)); s.y += 1300; });
      // la promesse des parents
      k.card(110, 370, 860, 300, { seed: 91 }).pop("b9@وقالوا", 0.4);
      k.ar("بغينا ولادة طبيعية…", 540, 455, 40, "ttl").wipe("b9@طبيعية", 0.6, "rtl");
      k.ar("ولكن إلا كان مشكل ← السبيطار + césarienne", 540, 545, 30, "ar strong").wipe("b9@مشكل", 0.8, "rtl");
      k.chip("Plan B: Krankenhaus", "الخطة ب: السبيطار", 540, 605, 26, { yellow: true }).pop("b9@césarienne");
    } });

    /* 10–12 · la chambre d'hôtel : de 5 h du matin à la nuit ---------------------------------------- */
    st.scene({ from: "b10", in: "fade", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b10", s: 1.05, cx: 520, cy: 940 }, { at: "b11", s: 1.02, cx: 580, cy: 940, d: 0.6 }, { at: "b12", s: 1.04, cx: 520, cy: 960, d: 0.7 }]);
      const a = T("b10"), arr = T("b11@زازت") + 0.4, end = T("b12@end") + 0.2;
      const P = (t) => t < arr ? 0.7 * E.inOut(prog(t, a, arr - a)) : 0.7 + 0.12 * prog(t, arr, end - arr);
      c.sk((g, p) => windowSky(g, p), (t) => ({ p: Math.round(P(t) * 40) / 40 }), 540, 810, 0.9);
      k.ground(540, 1300, 1000);
      k.cast("bed", { x: 110, y: 1300, w: 460 });
      const mom = k.person(440, 1300, 1.15, (t) => Object.assign({ outfit: "mother", seed: 32 }, t > T("b12") ? SC.Pose.handsOnHead : SC.Pose.stand));
      pregnant(c, mom, 440, 1300, 1.15);
      // ondes de douleur (contractions)
      c.put(`<path d="M330 820 q 14 -16 28 0 t 28 0 t 28 0 M490 820 q 14 -16 28 0 t 28 0 t 28 0" fill="none" stroke="#C9625A" stroke-width="4"/>`).fade("b10@الوجيعات").float(6, 0.7);
      k.person(220, 1300, 1.15, () => Object.assign({ outfit: "civil", seed: 31, facing: 1 }, SC.Pose.stand));
      // l'appel au téléphone
      k.chip("📞 Ärztin", "عيطات للطبيبة", 540, 440, 28, { parent: c.hud }).pop("b10@عيطات").hide("b11", 0.25);
      // elle arrive ~12 h plus tard
      k.walker({ at: arr - 0.2, dur: 0.9, x0: 1150, x1: 740, y: 1300, s: 1.2, outfit: "coat", seed: 61, extra: { hair: "bun", badge: "Dr" }, after: () => Object.assign({}, SC.Pose.stand, { facing: -1, hair: "bun", badge: "Dr", expr: "calm" }) });
      k.chip("~ 12 Stunden später", "تقريبا 12 ساعة من بعد", 540, 440, 28, { yellow: true, parent: c.hud }).pop("b11@ساعة").hide("b12@وقفات", 0.25);
      k.chip("Geburtsstillstand", "الولادة وقفات", 540, 440, 30, { parent: c.hud }).pop("b12@وقفات").wobble("b12@وقفات+0.4", 0.5, 6);
    } });

    /* 13 · le méconium, deux fois ; 14 · l'hôpital était tout près -------------------------------- */
    st.scene({ from: "b13", in: "cut", inDur: 0, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b13", s: 1.1, cx: 540, cy: 820 }, { at: "b14", s: 1, cx: 540, cy: 900, d: 0.6 }]);
      const w1 = el("g"); warn(w1, { n: 1 }); c.node(w1).on((t, s) => { s.x += 330; s.y += 620; }).pop("b13@جوج", 0.4).pulse("b13@جوج+0.4", 0.6, 0.08, 2);
      const w2 = el("g"); warn(w2, { n: 2 }); c.node(w2).on((t, s) => { s.x += 750; s.y += 620; }).pop("b13@Mekonium", 0.4).pulse("b13@Mekonium+0.4", 0.6, 0.08, 2);
      k.chip("Mekonium", "أول خروج ديال البيبي فالما", 540, 790, 34, { yellow: true }).pop("b13@Mekonium").hide("b14", 0.3);
      k.chip("O₂ ↓", "الأكسجين ما كيوصلش", 540, 930, 40).pop("b13@الأكسجين").hide("b14", 0.3);
      st.vignette("b13@علامة", 1.6, 2);
      // l'hôpital tout proche, mais elle continue
      const hs = el("g"); building(hs, { w: 300, h: 330, rows: 2, cols: 3, sign: "KLINIK", cross: true, signMat: MAT.white, seed: 21 });
      c.node(hs).on((t, s) => { s.x += 770; s.y += 1300; s.s *= 0.8; }).pop("b14", 0.4);
      const ho = el("g"); building(ho, { w: 260, h: 380, rows: 3, cols: 2, sign: "HOTEL", seed: 3, lit: (r, c2) => r === 1 && c2 === 0 }); c.node(ho).on((t, s) => { s.x += 280; s.y += 1300; s.s *= 0.8; }).pop("b14", 0.4);
      k.ground(540, 1300, 1000);
      c.put(`<path d="M420 1150 L640 1150 M620 1134 L640 1150 L620 1166" fill="none" stroke="${INK}" stroke-width="6" stroke-dasharray="16 10" stroke-linecap="round"/>`).wipe("b14@قريب", 0.5);
      k.chip("قريب", null, 530, 1090, 26, { yellow: true }).pop("b14@قريب");
      k.title("✗", 530, 1160, 110).pop("b14@صيفتهاش").wobble("b14@صيفتهاش+0.3", 0.5, 8);
    } });

    /* 15 · la naissance… puis le silence (aucune voix) ---------------------------------------------- */
    st.scene({ from: "b15", in: "fade", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b15", s: 1, cx: 540, cy: 880 }, { at: "b15@زادت", s: 1.08, cx: 540, cy: 860, d: 3, ease: "lin" }]);
      c.sk((g, p) => windowSky(g, p), () => ({ p: 1 }), 540, 640, 1);
      c.sk((g, p) => K.clock(g, { x: 0, y: 0, r: 70, time: "22:00", label: false }), () => ({}), 860, 520, 1).pop("b15@تمنطاشر");
      k.ground(540, 1300, 1000);
      k.cast("bed", { x: 110, y: 1300, w: 460 });
      k.person(400, 1300, 1.15, () => Object.assign({ outfit: "mother", seed: 32, facing: 1 }, SC.Pose.stand, { headTilt: 10 }));
      k.person(560, 1300, 1.2, () => Object.assign({ outfit: "civil", seed: 31, facing: -1 }, SC.Pose.handsOnHead)).fade("b15@ولكن", 0.6);
      // la petite couverture, posée sur le lit
      c.put(`<g><ellipse cx="0" cy="0" rx="62" ry="26" fill="#F3E7C9" stroke="${INK}" stroke-width="3"/><path d="M-40 -6 q 40 -18 80 0" fill="none" stroke="#C9B98F" stroke-width="2"/></g>`, 250, 1160).fade("b15@زادت", 0.6);
      const quiet = T("b15@end") + 0.6;
      k.ar("البنت ما عاشتش", 540, 430, 66, "ttl", c.hud).wipe(quiet, 0.9, "rtl").hide("b16", 0.2);
      c.tick((t) => { const g = E.inOut(prog(t, quiet, 1.4)); c.layer.style.filter = g > 0 ? `grayscale(${g.toFixed(2)})` : ""; });
    } });

    /* 16 · l'expert : 4 heures plus tôt → césarienne → bébé en bonne santé --------------------------- */
    st.scene({ from: "b16", in: "fade", inDur: 0.5, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b16", s: 1, cx: 540, cy: 900 }]);
      k.chip("Gutachter", "الخبير", 540, 470, 34).pop("b16@الخبير");
      // chemin « fantôme » : 4 h plus tôt → hôpital → césarienne → bébé ✓
      [["− 4 h", "ربعة د السوايع قبل", 210, "b16@ربعة"], ["Klinik", "السبيطار", 430, "b16@للسبيطار"], ["Kaiserschnitt", "césarienne", 650, "b16@césarienne"], ["✓", "بصحتها", 870, "b16@بصحتها"]].forEach(([d, a, x, at], i) => {
        k.card(x - 95, 640, 190, 150, { seed: 140 + i, yellow: i === 3 }).pop(at, 0.4);
        c.text(d, x, 725, i === 3 ? 70 : (d.length > 8 ? 24 : 32), "de").pop(at);
        c.text(a, x, 840, 24, "ar strong").wipe(at + "+0.1", 0.5, "rtl");
        if (i < 3) c.put(`<path d="M${x + 100} 715 L${x + 122} 715 M${x + 112} 705 L${x + 122} 715 L${x + 112} 725" stroke="${INK}" stroke-width="4" fill="none"/>`).pop(at + "+0.2");
      });
      const bb = el("g"); SC.baby(bb, { pose: "lying", state: "normal", eyes: "closed" }); c.node(bb).on((t, s) => { s.x += 540; s.y += 1080; s.s *= 1.1; }).pop("b16@بصحتها", 0.5).float(4, 2.4);
      c.put(`<ellipse cx="540" cy="1090" rx="170" ry="70" fill="none" stroke="#2F8F4E" stroke-width="5" stroke-dasharray="12 10"/>`).fade("b16@بصحتها");
    } });

    /* 17–19 · le tribunal de Dortmund : pas « négligence », mais Totschlag --------------------------- */
    st.scene({ from: "b17", in: "wipe", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b17", s: 1, cx: 540, cy: 900 }, { at: "b19", s: 1.06, cx: 540, cy: 880, d: 0.6 }]);
      const strike = T("b18@حكمات");
      k.person(540, 1300, 1.3, () => Object.assign({ outfit: "robe", seed: 17, expr: "focused" }, SC.Pose.standDock));
      k.prop("dock", 540, 1312, 1.3, () => ({ w: 600, h: 180, seed: 44 }));
      k.person(540, 1300, 1.3, () => Object.assign({ outfit: "robe", seed: 17, only: "arms" }, SC.Pose.standDock));
      c.sk((g, p) => K.gavel(g, { x: 0, y: 0, rot: p.ang - 20, scale: 1.1 }), (t) => ({ ang: Math.round(t < strike - 0.4 ? 0 : t < strike ? -35 * E.out(prog(t, strike - 0.4, 0.3)) : -35 * (1 - E.in(prog(t, strike, 0.12)))) }), 820, 1040, 1);
      c.shake(strike + 0.12, 10, 0.4); c.kick(strike + 0.12, 0.07);
      k.chip("LG Dortmund · 2014", "المحكمة ديال Dortmund", 540, 420, 34).pop("b17@Dortmund").hide("b19@عارفة", 0.25);
      k.card(110, 520, 390, 170, { seed: 171 }).pop("b17@fahrlässige");
      c.text("fahrlässige Tötung", 305, 600, 32, "de").pop("b17@fahrlässige");
      k.ar("قتل بالإهمال", 305, 650, 26, "ar strong").wipe("b17@fahrlässige+0.2", 0.5, "rtl");
      c.put(`<path d="M130 540 L480 670 M480 540 L130 670" stroke="#C9625A" stroke-width="9" stroke-linecap="round"/>`).wipe("b17@fahrlässige+0.7", 0.4);
      k.card(580, 520, 390, 170, { seed: 172, yellow: true }).pop(strike);
      c.text("Totschlag", 775, 600, 44, "de").pop(strike);
      k.ar("قتل عمد (قبلات الخطر)", 775, 650, 26, "ar strong").wipe(strike + 0.2, 0.5, "rtl");
      k.chip("sie kannte die Gefahr", "كانت عارفة بالخطر", 540, 420, 30, { yellow: true }).pop("b19@عارفة+0.1");
    } });

    /* 20–21 · la peine ; 22 · le BGH : définitif ------------------------------------------------------ */
    st.scene({ from: "b20", in: "zoom", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b20", s: 1.1, cx: 540, cy: 760 }, { at: "b22", s: 1, cx: 540, cy: 900, d: 0.6 }]);
      k.card(140, 470, 800, 200, { seed: 201 }).pop("b20", 0.4);
      c.text("6 Jahre 9 Monate Haft", 540, 565, 56, "de").pop("b20+0.1");
      c.text("ست سنين وتسع شهور ديال الحبس", 540, 630, 32, "ar strong").wipe("b20+0.3", 0.6, "rtl");
      k.chip("lebenslanges Berufsverbot", "ممنوعة تخدم طول حياتها", 540, 760, 32, { yellow: true }).pop("b20@ومنعوها");
      k.chip("≈ 50 000 € an die Eltern", "تعويض للوالدين", 540, 900, 32).pop("b21@خمسين");
      // le BGH à Karlsruhe
      const geo = drawDE(c, 340, 1150, 30, "b22"), [kx, ky] = geo(8.40, 49.01);
      pinAt(c, kx, ky, "b22@BGH");
      k.chip("BGH · Karlsruhe · 2016", "أعلى محكمة فألمانيا", 690, 1080, 24).pop("b22@BGH");
      k.prop("stamp", 690, 1230, 0.5, () => ({ text: "RECHTSKRÄFTIG", size: 54, rot: -8 })).slam("b22@نهائي", 0.3, 10);
    } });

    /* 23 · ce que le tribunal lui reproche ------------------------------------------------------------- */
    st.scene({ from: "b23", in: "slideUp", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b23", s: 1.15, cx: 540, cy: 860 }, { at: "b23@وقفي", s: 1.05, cx: 540, cy: 900, d: 0.4 }]);
      const ho = el("g"); building(ho, { w: 280, h: 360, rows: 3, cols: 2, sign: "HOTEL", seed: 3 }); c.node(ho).on((t, s) => { s.x += 300; s.y += 960; s.s *= 0.9; }).pop("b23", 0.4);
      k.title("✓", 300, 520, 90).pop("b23@Hotel");
      k.ar("ماشي هادي", 300, 1030, 30, "ar strong").wipe("b23@لامتش", 0.5, "rtl");
      const hs = el("g"); building(hs, { w: 280, h: 330, rows: 2, cols: 3, sign: "KLINIK", cross: true, signMat: MAT.white, seed: 21 }); c.node(hs).on((t, s) => { s.x += 780; s.y += 960; s.s *= 0.9; }).pop("b23@لامتها", 0.4);
      k.title("✗", 780, 560, 90).pop("b23@صيفتهاش");
      k.ar("ما صيفطاتهاش", 780, 1030, 30, "ar strong").wipe("b23@صيفتهاش", 0.5, "rtl");
      k.prop("stamp", 540, 1180, 0.8, () => ({ text: "STOP", size: 90, rot: -6 })).slam("b23@وقفي", 0.3, 12);
    } });

    /* 24–26 · la règle : le patient pèse plus que le plan ---------------------------------------------- */
    st.scene({ from: "b24", in: "fade", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b24", s: 1, cx: 540, cy: 860 }]);
      k.ar("القاعدة", 540, 420, 56, "ttl", c.hud).wipe("b24", 0.5, "rtl");
      c.sk((g, p) => scale(g, p), (t) => ({ left: "الخطة", right: "المريض", tilt: Math.round(14 * E.out(prog(t, T("b24@أهم"), 1.0)) * 10) / 10 }), 540, 1000, 1).pop("b24", 0.4);
      k.chip("Zeichen ändern sich → Plan ändern", "تبدلات الحالة ← بدل الخطة", 540, 1110, 28).pop("b25@تبدل");
      k.ribbon("Klinik ist keine Niederlage.", 540, 1220, { size: 44 }).wipe("b26", 0.5);
      k.ar("والمشية للسبيطار ماشي عيب", 540, 1310, 30, "ar strong").wipe("b26+0.2", 0.6, "rtl");
    } });

    /* ---------- HUD : barre des heures + barre de progression + logo ---------- */
    {
      const hEl = document.getElementById("hours"), fill = hEl.querySelector(".fill"), ghost = hEl.querySelector(".ghost"), now = hEl.querySelector(".now"), evs = [...hEl.querySelectorAll(".ev")];
      const W0 = 780, hx = (h) => (W0 * (h - 5) / 17);
      evs.forEach((e) => { e.style.left = hx(+e.dataset.h) + "px"; });
      const a = T("b10"), arr = T("b11@زازت") + 0.4, mk = T("b13@جوج"), birth = T("b15@زادت"), on0 = T("b10") - 0.2, off0 = T("b15@end") + 0.4, on1 = T("b16"), off1 = T("b16@end") + 0.2;
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
        brand.style.opacity = (t < 0.25 ? t / 0.25 : t < endT ? 1 : Math.max(0, 1 - (t - endT) / 0.3)).toFixed(3);
      });
    }

    /* ---------- affiche finale + appel à commenter (écrit, pas dit) ---------- */
    st.flash("b26@end+0.15", 0.35, 0.85);
    st.summary({ at: "b26@end+0.15", in: "cut", dezoomAt: "b26@end+0.5", cols: 5, crop: [230, 1310], top: 372, gap: 10, side: 60,
      below(c, cells) {
        SketchUI.dots(c);
        const k = kit(c);
        k.ribbon("AKTE 02 · الولادة فالأوطيل", 540, 312, { size: 40, w: 600 });
        k.chip("@dr.aguilo", null, 160, 312, 22);
        k.chip("AKTE 03 · قريبا", null, 915, 312, 20, { yellow: true });
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
        k.ar("ونتا، واش عمرك سكتّي حيت خفتي؟", 490, 1060, 34, "ttl").wipe("b26@end+2.8", 0.6, "rtl");
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
