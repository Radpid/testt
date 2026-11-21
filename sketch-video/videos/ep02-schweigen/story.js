/* AKTE 02 — « ما قالت والو » (Remonstrationspflicht, OLG Köln 27.01.2025, 5 U 69/24).
 * Même style qu'AKTE 01 (au trait, jaune, papier à points) + jeux pour retenir le spectateur :
 *   - le mot caché (barre en haut, lettres révélées au fil de l'histoire) ;
 *   - le quiz des flacons (compte à rebours) ;
 *   - le message qu'elle n'a jamais envoyé (tapé puis effacé) ;
 *   - le sondage STOP « A · نسكت / B · نسول ».
 * Zones Instagram (voir le skill) : contenu entre x 90 et 990, rien dans la colonne de boutons (x > 915, y 980–1650).
 */
(function () {
  "use strict";
  const SC = SketchCast, K = Cast, W = 1080, U = SC.util, MAT = SC.MAT, INK = SC.INK;
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, a, p) => { const n = document.createElementNS(NS, tag); for (const k in a || {}) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; };
  const isLatin = (s) => /[A-Za-z0-9]/.test(s) && !/[؀-ۿ]/.test(s);
  const WATER = { base: "#E4EEF2", hatch: "#9DB4C0", gap: 6, fw: 1.2 };
  const RED = { base: "#F2B8B3", hatch: "#C9625A", gap: 5, fw: 1.2 };

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



    /* ---------- nouveaux objets dessinés (AKTE 02) ---------- */
    // flacon : origine au bas du flacon
    function bottle(g, o) {
      const C = U.ctx(g, o.seed || 71, false, 1);
      el("path", { d: U.rrect(-36, -150, 76, 150, 16), fill: "#D2D2CB", transform: "translate(6 7)" }, g);
      U.shape(C, "body", U.rrect(-38, -150, 76, 150, 16), MAT.white, { sw: 3 });
      U.shape(C, "liq", U.rrect(-32, -96, 64, 90, 10), o.liq || WATER, { sw: 0, noStroke: true });
      U.shape(C, "neck", U.rrect(-15, -186, 30, 40, 6), MAT.white, { sw: 2.6 });
      U.shape(C, "cap", U.rrect(-19, -204, 38, 20, 5), o.cap || MAT.grey, { sw: 2.6 });
      U.shape(C, "lab", U.rrect(-33, -140, 66, 56, 6), MAT.white, { sw: 2 });
      U.text(g, o.label, 0, -114, o.size || 18, {});
      if (o.sub) U.text(g, o.sub, 0, -94, 13, { weight: 400, fill: "#55524B" });
    }
    // appareil de Dr. K. (colonne + hystéroscope)
    function device(g) {
      const C = U.ctx(g, 91, false, 1);
      el("path", { d: U.rrect(-80, -64, 160, 64, 10), fill: "#D2D2CB", transform: "translate(6 7)" }, g);
      U.shape(C, "box", U.rrect(-80, -64, 160, 64, 10), MAT.grey, { sw: 3 });
      U.shape(C, "scr", U.rrect(-64, -52, 66, 38, 5), MAT.white, { sw: 2 });
      el("circle", { cx: 38, cy: -32, r: 11, fill: "#fff", stroke: INK, "stroke-width": 2.5 }, g);
      U.stroke(C, "cable", "M80 -30 C 120 -30, 126 14, 160 2", { sw: 3 });
      U.shape(C, "scope", U.rrect(156, -6, 110, 14, 6), MAT.white, { sw: 2.5 });
    }
    // schéma : utérus + caméra + liquide (o.cam 0..1, o.fill 0..1)
    function uterus(g, o) {
      const C = U.ctx(g, 33, false, 1);
      U.shape(C, "ut", "M-130 -60 C -140 -190, 140 -190, 130 -60 C 122 10, 50 50, 30 120 L -30 120 C -50 50, -122 10, -130 -60 Z", MAT.white, { sw: 3.4 });
      if (o.fill > 0) { const n = el("g", { opacity: o.fill.toFixed(2) }, g); U.shape(U.ctx(n, 34, false, 1), "cav", "M-86 -64 C -90 -140, 90 -140, 86 -64 C 76 -4, 34 30, 20 84 L -20 84 C -34 30, -76 -4, -86 -64 Z", WATER, { sw: 2 }); }
      const tip = 300 - 330 * o.cam;
      U.shape(C, "rod", U.rrect(-9, tip, 18, 330 - (300 - tip) + 40, 6), MAT.grey, { sw: 2.4 });
      el("circle", { cx: 0, cy: tip, r: 13, fill: "#fff", stroke: INK, "stroke-width": 2.6 }, g);
      if (o.cam > 0.85) [[-34, -50], [0, -62], [34, -50]].forEach((d, i) => U.stroke(C, "ray" + i, `M0 ${tip - 14} l${d[0] * 0.6} ${d[1] * 0.6}`, { sw: 2.4 }));
    }
    // globule rouge : o.k = gonflement, o.burst 0..1
    function rbc(g, o) {
      const C = U.ctx(g, o.seed || 5, false, 1);
      if (o.burst < 0.05) {
        const r = 26 * o.k;
        U.shape(C, "c", `M${-r} 0 a${r} ${r * 0.92} 0 1 0 ${2 * r} 0 a${r} ${r * 0.92} 0 1 0 ${-2 * r} 0`, RED, { sw: 2.6 });
        el("ellipse", { cx: 0, cy: 0, rx: r * 0.42, ry: r * 0.36, fill: "#F7D6D2" }, g);
      } else {
        const R = 30 + 26 * o.burst;
        for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + 0.3; U.stroke(C, "s" + i, `M${(Math.cos(a) * 16).toFixed(1)} ${(Math.sin(a) * 16).toFixed(1)} L${(Math.cos(a) * R).toFixed(1)} ${(Math.sin(a) * R).toFixed(1)}`, { sw: 2.6, stroke: "#C9625A" }); }
        for (let i = 0; i < 4; i++) { const a = i * 1.7 + 0.5; el("circle", { cx: (Math.cos(a) * R * 0.7).toFixed(1), cy: (Math.sin(a) * R * 0.7).toFixed(1), r: 5, fill: "#F2B8B3", stroke: INK, "stroke-width": 1.6 }, g); }
      }
    }
    // jauge du liquide (o.v en litres, max 2,5)
    function gauge(g, o) {
      const C = U.ctx(g, 61, false, 1), H = 380;
      U.shape(C, "tube", U.rrect(-46, -H, 92, H, 24), MAT.white, { sw: 3.2 });
      const h = (H - 16) * clamp(o.v / 2.5, 0, 1);
      if (h > 2) U.shape(C, "lvl", U.rrect(-38, -8 - h, 76, h, 16), WATER, { sw: 0, noStroke: true });
      [0.5, 1, 1.5, 2, 2.5].forEach((v, i) => { const y = -8 - (H - 16) * v / 2.5; U.stroke(C, "t" + i, `M46 ${y.toFixed(1)} l18 0`, { sw: 2.4 }); if (v % 1 === 0 || v === 2.5) U.text(g, `${String(v).replace(".", ",")} L`, 100, y + 8, 24, { anchor: "middle" }); });
    }
    // pyramide de la hiérarchie
    function pyramid(g, o) {
      const C = U.ctx(g, 47, false, 1), rows = o.rows, Hh = 106, top = 150, bot = 700;
      rows.forEach((r, i) => {
        const w0 = lerp(top, bot, i / rows.length), w1 = lerp(top, bot, (i + 1) / rows.length), y0 = i * Hh, y1 = y0 + Hh - 8;
        U.shape(C, "r" + i, `M${-w0 / 2} ${y0} L${w0 / 2} ${y0} L${w1 / 2} ${y1} L${-w1 / 2} ${y1} Z`, i === o.hl ? MAT.yellow : MAT.white, { sw: 3 });
        U.text(g, r[0], 0, y0 + 46, i === 0 ? 26 : 30, {});
        if (r[1]) U.text(g, r[1], 0, y0 + 80, 21, { font: "'Plex Arabic', sans-serif", weight: 600, fill: "#3E3C37", rtl: true });
      });
    }
    // téléphone : message tapé puis effacé (o.txt), bouton envoyer gris
    function phone(g, o) {
      const C = U.ctx(g, 83, false, 1);
      el("path", { d: U.rrect(-170, -300, 340, 600, 46), fill: "rgba(28,26,28,.25)", transform: "translate(10 12)" }, g);
      U.shape(C, "body", U.rrect(-170, -300, 340, 600, 46), MAT.white, { sw: 4.2 });
      U.shape(C, "notch", U.rrect(-46, -284, 92, 18, 9), MAT.grey, { sw: 1.6 });
      U.text(g, "Oberärztin", 0, -226, 24, {});
      U.stroke(C, "hl", "M-150 -206 L150 -206", { sw: 2 });
      // message reçu (reconstitution : elle lui a transmis que Dr. K. jugeait l'eau sans danger, Rn. 45)
      U.shape(C, "in", U.rrect(-150, -180, 236, 92, 18), MAT.grey, { sw: 2 });
      U.text(g, "Dr. K. sagt:", -32, -146, 20, {});
      U.text(g, "kein Problem 👍", -32, -112, 20, {});
      U.shape(C, "field", U.rrect(-150, 196, 236, 66, 30), MAT.white, { sw: 2.6 });
      U.text(g, o.txt || "", 72, 238, 26, { font: "'Plex Arabic', sans-serif", weight: 700, rtl: true, anchor: "start" });
      if (o.caret) U.stroke(C, "caret", `M${(80 - (o.w || 0)).toFixed(1)} 210 L${(80 - (o.w || 0)).toFixed(1)} 250`, { sw: 2.6, r: 0.3 });
      U.shape(C, "send", "M106 229 a26 26 0 1 0 52 0 a26 26 0 1 0 -52 0", MAT.grey, { sw: 2.4 });
      U.stroke(C, "arrow", "M120 229 L146 229 M136 219 L146 229 L136 239", { sw: 2.6 });
      U.text(g, "Rekonstruktion", 0, 290 - 4, 15, { weight: 400, fill: "#77776F" });
    }
    // fermeture éclair sur la bouche (x,y = bouche)
    function zipper(g) {
      const C = U.ctx(g, 19, false, 1);
      U.stroke(C, "z", "M-30 0 L30 0", { sw: 3.4 });
      for (let i = -24; i <= 24; i += 8) U.stroke(C, "t" + i, `M${i} -6 L${i} 6`, { sw: 2 });
      U.shape(C, "pull", U.rrect(30, -7, 16, 14, 4), MAT.grey, { sw: 2 });
    }

    const DE = [[8.6,54.9],[9.4,54.8],[10.0,54.5],[10.9,54.05],[11.6,54.15],[12.3,54.3],[13.0,54.45],[13.6,54.6],[14.2,53.9],
      [14.4,53.3],[14.6,52.6],[14.7,51.8],[15.0,51.1],[14.3,50.9],[13.5,50.6],[12.6,50.4],[12.1,50.3],[12.5,49.8],[13.0,49.3],
      [13.8,48.8],[13.4,48.3],[13.0,47.6],[12.2,47.6],[11.3,47.4],[10.5,47.5],[9.7,47.6],[8.6,47.6],[7.6,47.6],[7.6,48.1],
      [8.2,48.97],[7.0,49.1],[6.4,49.5],[6.1,50.1],[6.0,50.8],[6.1,51.2],[5.9,51.8],[6.8,52.1],[7.0,52.6],[7.2,53.2],
      [7.0,53.6],[8.0,53.7],[8.5,53.5],[8.9,53.9],[8.8,54.3]];


    const mouthOf = (n, x0, y0, s) => { const h = n.out && n.out.head; return h ? [x0 + h[0] * s, y0 + (h[1] + 30) * s] : null; };

    /* 1 · l'accroche : elle est jugée responsable ------------------------------------ */
    st.scene({ from: 0, in: "cut", inDur: 0, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: 0, s: 1.5, cx: 430, cy: 960 }, { at: "b2@قالت", s: 1, cx: 540, cy: 900, d: 1 }]);
      k.ground(420, 1300, 640);
      const doc = k.person(420, 1300, 1.4, (t) => Object.assign({ outfit: "coat", hair: "long", badge: "AÄ", seed: 23, expr: t > T("b2@مسؤولة") ? "sad" : "unsure" }, SC.Pose.standDock));
      k.prop("dock", 420, 1312, 1.4, () => ({ w: 380, h: 180 }));
      k.person(420, 1300, 1.4, () => Object.assign({ outfit: "coat", hair: "long", badge: "AÄ", seed: 23, only: "arms" }, SC.Pose.standDock));
      k.chip("Assistenzärztin", "طبيبة ف طور الاختصاص", 420, 560, 34).pop("b1@الاختصاص", 0.45);
      k.prop("stamp", 700, 700, 0.6, () => ({ text: "HAFTET PERSÖNLICH", size: 52, rot: -7 })).slam("b2@شخصيا", 0.3, 12);
      st.flash("b2@شخصيا+0.25", 0.25, 0.4); c.kick("b2@شخصيا+0.25", 0.07);
      // « elle n'a pas décidé… elle s'est tue »
      k.chip("ما قررتش", null, 740, 900, 30).pop("b3@قررت");
      const z = el("g"); zipper(z); const zn = c.node(z).pop("b3@سكتات", 0.4);
      zn.on((t, s) => { const m = mouthOf(doc, 420, 1300, 1.4); if (m) { s.x += m[0]; s.y += m[1]; } });
      k.bubble({ x: 230, y: 620, w: 170, h: 110, tail: [70, 70], text: "…", size: 64 }).pop("b3@سكتات+0.15");
      c.kick("b3@سكتات", 0.06);
    } });

    /* 2 · le mot caché ------------------------------------------------------------------- */
    const WORD = "Remonstrationspflicht";
    st.scene({ from: "b4", in: "whip", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      k.ar("كلمة ألمانية وحدة", 540, 520, 46, "ttl", c.hud).wipe("b4", 0.6, "rtl");
      for (let i = 0; i < WORD.length; i++) {
        const x = 540 + (i - 10) * 38 + (i >= 14 ? 6 : 0) - 3;
        k.card(x - 16, 760, 32, 50, { seed: 700 + i }).pop(`b4+${(0.25 + i * 0.05).toFixed(2)}`, 0.3);
      }
      k.title("?", 540, 700, 110).pop("b4@خاص").wobble("b4@يعرفها", 0.6, 10);
      k.ar("خاص كل طبيب يعرفها", 540, 940, 40, "ar strong").wipe("b4@خاص", 0.6, "rtl");
      k.ar("… غادي نقولها ليكم فاللخر", 540, 1060, 40, "ar strong").wipe("b4@وغادي", 0.6, "rtl");
      c.kick("b4@يعرفها", 0.05);
    } });

    /* 3a · la carte : Köln, 2016 ------------------------------------------------------- */
    st.scene({ from: "b5", in: "iris", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      const MX = 600, MY = 800, KM = 64, geo = (lon, lat) => [MX + (lon - 10.5) * 0.626 * KM, MY - (lat - 51.2) * KM];
      c.camera([{ at: "b5", s: 1.05, cx: 560, cy: 820 }, { at: "b5+0.2", s: 1.25, cx: 520, cy: 860, d: 1.4, ease: "out" }]);
      const map = el("g"); const C = U.ctx(map, 4242, false, 1);
      el("path", { d: "M" + DE.map((p) => geo(...p).map((v) => v + 7).join(" ")).join(" L") + " Z", fill: "#D2D2CB" }, map);
      U.shape(C, "de", "M" + DE.map((p) => geo(...p).join(" ")).join(" L") + " Z", MAT.grey, { sw: 3.2 });
      const [bx, by] = geo(6.96, 50.94), [lx, ly] = geo(13.4, 52.52);
      el("circle", { cx: lx, cy: ly, r: 7, fill: INK }, map); U.text(map, "Berlin", lx, ly - 16, 24, { fill: "#55524B" });
      c.node(map).fade("b5", 0.25);
      const pin = el("g", { transform: `translate(${bx} ${by})` }); const P = U.ctx(pin, 77, false, 1);
      el("ellipse", { cx: 0, cy: 2, rx: 14, ry: 5, fill: "rgba(28,26,28,.25)" }, pin);
      U.shape(P, "pin", "M0 0 C-6 -14 -24 -30 -24 -48 A24 24 0 1 1 24 -48 C24 -30 6 -14 0 0 Z", MAT.yellow, { sw: 3 });
      el("circle", { cx: 0, cy: -48, r: 9, fill: "#FFFFFF", stroke: INK, "stroke-width": 3 }, pin);
      c.node(pin).slide("b5+0.15", 0, -160, 0.4, "back");
      k.chip("Köln", "المحكمة", bx - 150, by - 40, 34, { yellow: true }).pop("b5+0.45");
      k.chip("2016 · echter Fall", "قصة حقيقية", 600, 520, 32).pop("b5+0.3");
    } });

    /* 3b · la patiente, l'examen --------------------------------------------------------- */
    st.scene({ from: "b5@جات", in: "whip", inDur: 0.3, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b5@جات", s: 1.05, cx: 540, cy: 900 }, { at: "b5@الفحص", s: 1.1, cx: 580, cy: 890, d: 0.8 }]);
      k.ground(300, 1300, 380);
      k.person(320, 1300, 1.3, () => Object.assign({ outfit: "mother", seed: 41 }, SC.Pose.stand)).fade("b5@جات", 0.3);
      k.chip("Patientin · 40+", "مرا ف الأربعينات", 330, 520, 32).pop("b5@جات+0.1");
      k.chip("Gebärmutter", "الرحم", 880, 700, 26).pop("b5@الفحص+0.3");
      const a = T("b5@الفحص");
      c.sk((g, p) => uterus(g, p), (t) => ({ cam: Math.round(E.out(prog(t, a, 0.9)) * 20) / 20, fill: Math.round(E.inOut(prog(t, a + 0.6, 0.9)) * 10) / 10 }), 720, 820, 0.85).fade("b5@الفحص", 0.3);
      k.chip("Hysteroskopie", "كاميرا صغيرة للرحم", 720, 520, 34, { yellow: true }).pop("b5@Hysteroskopie");
    } });

    /* 4 · le bloc : l'Oberärztin (1 mois), l'Assistenzärztin, Dr. K. et son appareil ----- */
    st.scene({ from: "b6", in: "wipe", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b6", s: 1.25, cx: 420, cy: 900 }, { at: "b7", s: 1.0, cx: 560, cy: 900, d: 0.8 }, { at: "b7@جراحي", s: 1, cx: 540, cy: 900, d: 0.6 }]);
      // lampe de bloc
      c.put(`<g><path d="M540 360 L540 440" stroke="${INK}" stroke-width="5"/><ellipse cx="540" cy="470" rx="130" ry="40" fill="#F3F3EE" stroke="${INK}" stroke-width="4"/><ellipse cx="540" cy="470" rx="80" ry="22" fill="#FFF6D6" stroke="${INK}" stroke-width="2.5"/></g>`).fade("b6", 0.3);
      k.ground(540, 1300, 940);
      k.person(220, 1300, 1.25, () => Object.assign({ outfit: "coat", hair: "bun", badge: "OÄ", seed: 31, facing: 1, expr: "focused" }, SC.Pose.stand));
      k.person(450, 1300, 1.2, () => Object.assign({ outfit: "coat", hair: "long", badge: "AÄ", seed: 23, facing: 1, expr: "neutral" }, SC.Pose.stand));
      k.chip("Oberärztin", "الطبيبة المسؤولة", 230, 640, 30).pop("b6@Oberärztin").hide("b7@آخر", 0.3);
      k.chip("seit 1 Monat", "عاد شهر", 230, 760, 30, { yellow: true }).pop("b6@شهر").wobble("b6@شهر+0.4", 0.5, 6).hide("b7@آخر", 0.3);
      k.chip("Assistenzärztin", "ف طور الاختصاص", 460, 900, 28).pop("b6@Assistenzärztin").hide("b7@آخر", 0.3);
      const dk = k.walker({ at: "b7", dur: 1.0, x0: 1200, x1: 800, y: 1300, s: 1.25, outfit: "oberarzt", seed: 13, expr: "calm", after: () => Object.assign({}, SC.Pose.holdObject, { facing: -1, expr: "calm" }) });
      const dv = el("g"); device(dv);
      c.node(dv).on((t, s) => { s.x += lerp(1200, 800, clamp((t - T("b7")) / 1.0, 0, 1)) - 230; s.y += 1100; s.s *= 0.6; }).fade("b7", 0.2);
      k.chip("Oberarzt Dr. K.", "بغا يجرب الجهاز", 800, 600, 30).pop("b7@يجرب");
      k.chip("TEST", null, 610, 1180, 28, { yellow: true }).pop("b7@الجهاز").wobble("b7@الجهاز+0.3", 0.5, 8);
      c.kick("b7@يجرب", 0.05);
    } });

    /* 5 · le quiz des flacons ------------------------------------------------------------ */
    st.scene({ from: "b7@end", in: "zoom", inDur: 0.3, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b7@end", s: 1.05, cx: 540, cy: 960 }, { at: "b8@destilliertes", s: 1.3, cx: 760, cy: 1000, d: 0.5 }, { at: "b8@المقطر+0.2", s: 1.05, cx: 540, cy: 960, d: 0.6 }]);
      k.ar("شنو استعملو؟", 540, 430, 48, "ttl", c.hud).wipe("b7@end", 0.5, "rtl");
      // plateau
      c.put(`<path d="M150 1250 L930 1250" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`);
      [["NaCl 0,9 %", "ملح", 300, 101], ["Glycin", "غليسين", 540, 102], ["Aqua dest.", "ما مقطر", 780, 103]].forEach(([lab, sub, x, sd], i) => {
        const b = el("g"); bottle(b, { label: lab, sub, seed: sd, size: lab.length > 8 ? 15 : 18 });
        c.node(b, null).pop(`b7@end+${(0.1 + i * 0.12).toFixed(2)}`, 0.35).on((t, s) => { s.x += x; s.y += 1246; s.s *= 1.55; });
      });
      // compte à rebours 3-2-1 pendant la pause
      const a = T("b7@end") + 0.3, d = Math.max(0.9, T("b8") - a);
      ["3", "2", "1"].forEach((n, i) => k.title(n, 540, 760, 160).on((t, s) => { const p = (t - a) / (d / 3) - i; s.o *= p >= 0 && p < 1 ? 1 : 0; s.s *= p >= 0 && p < 1 ? 1 + 0.25 * (1 - Math.min(1, p * 3)) : 1; }));
      // la réponse : c'est l'eau distillée qu'ils ont utilisée
      k.marker(780, 1080, 150, 70).wipe("b8@destilliertes", 0.35);
      k.title("✗", 780, 860, 120).pop("b8@المقطر").on((t, s) => { s.o *= 1; });
      k.chip("خطير", null, 780, 930, 30, { yellow: true }).pop("b8@المقطر+0.1");
      k.title("✓", 300, 860, 90).pop("b8@المقطر+0.35"); k.title("✓", 540, 860, 90).pop("b8@المقطر+0.45");
      c.kick("b8@destilliertes", 0.06); st.flash("b8@المقطر", 0.25, 0.35);
    } });

    /* 6 · la hiérarchie, le silence, le message jamais envoyé ------------------------------ */
    st.scene({ from: "b9", in: "slideUp", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b9", s: 1.1, cx: 540, cy: 760 }, { at: "b10", s: 1.2, cx: 540, cy: 860, d: 0.6 }]);
      const rows = [["Chefarzt", null], ["Oberarzt Dr. K.", "صاحب الجهاز"], ["Oberärztin", "عاد شهر"], ["Assistenzärztin", "هي"]];
      c.sk((g, p) => pyramid(g, p), (t) => ({ rows, hl: t >= T("b10") ? 3 : t >= T("b9") ? 2 : -1 }), 470, 470, 1);
      // flèches de pression vers le bas
      [330, 470, 610].forEach((x, i) => c.put(`<path d="M${x} 420 L${x} 470 M${x - 12} 456 L${x} 470 L${x + 12} 456" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`).pop(`b9+${(0.2 + i * 0.1).toFixed(2)}`));
      // l'Oberärztin doute… puis continue
      k.bubble({ x: 870, y: 640, w: 110, h: 90, tail: [-40, 40], think: true }).pop("b9@شكات").hide("b9@كملات", 0.3);
      k.title("?", 870, 668, 70).pop("b9@شكات").hide("b9@كملات", 0.3);
      k.chip("كملات", null, 870, 760, 26).pop("b9@كملات");
      // l'Assistenzärztin : rien
      k.title("…", 470, 1010, 90).pop("b10@ما");
      k.chip("الـOberarzt عندو الخبرة", null, 540, 1090, 26).pop("b10@والو");
      k.chip("الـOberärztin حتى هي عمرها ما دارتها", null, 540, 1170, 24, { yellow: true }).pop("b10@والو+0.3");
      // le message qu'elle n'a jamais envoyé (tapé puis effacé), en surimpression
      const MSG = "نسولها على الما؟", a = T("b10@قالت"), b = T("b11") - 0.15, mid = a + (b - a) * 0.55;
      const veil = c.put(`<rect x="-300" y="-300" width="1680" height="2600" fill="#1C1A1C"/>`, 0, 0, 1, 0, c.hud); veil.on((t, s) => { s.o *= 0.35 * clamp((t - a) / 0.25, 0, 1); });
      c.sk((g, p) => phone(g, p), (t) => {
        const n = t < a ? 0 : t < mid ? Math.round(MSG.length * clamp((t - a - 0.15) / (mid - a - 0.25), 0, 1)) : Math.round(MSG.length * (1 - clamp((t - mid - 0.1) / (b - mid - 0.25), 0, 1)));
        return { txt: MSG.slice(0, n), caret: Math.floor(t * 3) % 2 === 0, w: n * 13 };
      }, 540, 900, 0.95, 0, c.hud).slide(a, 0, 500, 0.35, "back");
    } });

    /* 7 · STOP — le sondage A / B ---------------------------------------------------------- */
    st.scene({ from: "b11", in: "cut", inDur: 0, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b11", s: 1.0, cx: 540, cy: 900 }]);
      k.ground(540, 1300, 500);
      k.person(540, 1300, 1.2, () => Object.assign({ outfit: "coat", hair: "long", badge: "AÄ", seed: 23, expr: "unsure" }, SC.Pose.stand));
      k.prop("stamp", 790, 520, 0.85, () => ({ text: "STOP", size: 84, rot: 8 })).slam("b11", 0.28, 14);
      st.flash("b11", 0.3, 0.8);
      const a = T("b11@تهضر");
      [["A", "نسكت", 310, 0], ["B", "نسول", 750, 1]].forEach(([L, txt, x, i]) => {
        k.card(x - 125, 1010, 250, 130, { seed: 820 + i, yellow: i === 1 }).pop(`b11@تهضر+${(i * 0.15).toFixed(2)}`);
        c.text(`${L} ·`, x - 62, 1094, 56, "de").pop(`b11@تهضر+${(i * 0.15).toFixed(2)}`);
        k.ar(txt, x + 42, 1094, 40, "ttl").pop(`b11@تهضر+${(0.05 + i * 0.15).toFixed(2)}`);
      });
      k.chip("كتب A ولا B فالكومنتير 👇", null, 540, 1232, 28, { yellow: true }).pop(a + 0.3);
      // minuterie circulaire
      const tr = c.put(`<circle cx="0" cy="0" r="46" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="" fill="none" stroke="#F8CE4E" stroke-width="12" stroke-linecap="round"/>`, 540, 640, 1);
      const t0 = T("b11@end"), t1 = T("b12") - 0.1;
      tr.fade(a, 0.3).on((t) => { const p = clamp((t - t0) / Math.max(0.5, t1 - t0), 0, 1), ang = (1 - p) * 2 * Math.PI - 0.0001; const x = 46 * Math.sin(ang), y = -46 * Math.cos(ang); tr.g.firstChild.children[1].setAttribute("d", p >= 1 ? "" : `M0 -46 A46 46 0 ${ang > Math.PI ? 1 : 0} 1 ${x.toFixed(1)} ${y.toFixed(1)}`); });
      c.kick("b11@تهضر", 0.05);
    } });

    /* 8 · 2,5 L d'eau distillée → hémolyse -------------------------------------------------- */
    st.scene({ from: "b12", in: "whip", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b12", s: 1.0, cx: 540, cy: 900 }, { at: "b12@كيفرقها", s: 1.1, cx: 580, cy: 890, d: 0.5 }]);
      const a = T("b12");
      c.sk((g, p) => gauge(g, p), (t) => ({ v: Math.round(2.5 * E.out(prog(t, a, 1.4)) * 20) / 20 }), 250, 1180, 1);
      k.chip("2,5 L Aqua dest.", "جوج لترات ونص", 280, 1250, 26).pop(a + 0.9);
      const B = T("b12@كيفرقها");
      [[560, 620], [720, 560], [860, 680], [600, 800], [770, 760], [880, 880], [640, 960]].forEach(([x, y], i) => {
        c.sk((g, p) => rbc(g, p), (t) => { const sw = E.inOut(prog(t, a + 0.3, B - a)); const bu = prog(t, B + i * 0.11, 0.25); return { k: Math.round((1 + 0.55 * sw) * 20) / 20, burst: Math.round(bu * 10) / 10, seed: 5 + i }; }, x, y, 1).pop(a + i * 0.06, 0.3);
      });
      k.chip("Hämolyse", "الكريات الحمرا كيتفرقعو", 720, 1120, 40, { yellow: true }).pop("b12@الحمراء");
      k.ar("حتى الطالب كيعرفها: الما ما خاصوش يدخل للدم", 540, 430, 30, "ar strong", c.hud).wipe(B + 0.4, 0.8, "rtl");
      c.text("laut Gutachten", 540, 476, 22, "de light", "middle", c.hud).fade(B + 0.9);
      c.kick("b12@كيفرقها", 0.06);
    } });

    /* 9 · 11:30, l'arrêt ; 25 minutes de réanimation ---------------------------------------- */
    st.scene({ from: "b13", in: "cut", inDur: 0, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b13", s: 1.1, cx: 540, cy: 860 }, { at: "b14", s: 1, cx: 540, cy: 900, d: 0.6 }]);
      c.sk((g, p) => K.clock(g, { x: 0, y: 0, r: 110, time: p.time, label: false }), () => ({ time: "11:30" }), 290, 700, 1).pop("b13");
      c.text("11:30", 290, 900, 80, "de").pop("b13@ونص");
      k.prop("monitor", 760, 700, 0.85, (t) => ({ ecg: t >= T("b13@وقف") ? "alarm" : "normal", t: Math.round(((t * 0.6) % 1) * 24) / 24, hr: t >= T("b13@وقف") ? "!" : "" })).pulse("b13@وقف", 0.8, 0.06, 3);
      st.vignette("b13@وقف", 1.6, 2); c.shake("b13@وقف", 8, 0.4);
      // compteur de réanimation 00:00 → 25:00
      const a = T("b14"), cnt = c.text("00:00", 540, 1150, 120, "de");
      cnt.fade(a, 0.2).on((t) => { const m = Math.round(25 * 60 * E.out(prog(t, a + 0.1, 1.8))); const s = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`; if (cnt.textEl.textContent !== s) cnt.textEl.textContent = s; });
      k.chip("Réanimation", "25 دقيقة", 540, 1250, 30).pop(a + 0.3);
      k.ar("ما فاقتش", 540, 1040, 52, "ttl").wipe("b14@فاقتش", 0.6, "rtl");
    } });

    /* 9b · le silence : elle est morte le lendemain (aucune voix) --------------------------- */
    st.scene({ from: "b14@end+0.3", in: "fade", inDur: 0.5, summary: false, build(c) {
      const k = kit(c); k.bg();
      const a = T("b14@end+0.3"), flatT = T("b14@end+1.5");
      c.camera([{ at: a, s: 1, cx: 540, cy: 900 }, { at: a + 0.1, s: 1.08, cx: 560, cy: 900, d: 3.3, ease: "lin" }]);
      k.ground(560, 1300, 900);
      const beeps = [0.05, 0.5, 1.0].map((x) => T("b14@end") + x);
      k.prop("monitor", 300, 800, 0.95, (t) => {
        if (t >= flatT) return { ecg: "flat", t: 0, hr: "0", stand: 440 };
        const last = beeps.filter((x) => x <= t).pop(); const q = last != null ? Math.min(1, (t - last) / 0.5) : 1;
        return { ecg: "normal", t: Math.round(q * 24) / 24, hr: "", stand: 440 };
      }).pulse(flatT, 0.5, 0.05, 1);
      k.person(720, 1300, 1.15, () => Object.assign({ outfit: "civil", seed: 31, facing: -1 }, SC.Pose.handsOnHead)).fade(a + 0.4, 0.7);
      k.person(860, 1300, 1.1, () => Object.assign({ outfit: "mother", seed: 32, facing: -1 }, SC.Pose.stand)).fade(a + 0.6, 0.7);
      k.ar("ماتت", 540, 560, 70, "ttl").wipe(flatT + 0.15, 0.6, "rtl");
      k.ar("24 ساعة من بعد", 540, 660, 32, "ar strong").fade(flatT + 0.5);
      c.tick((t) => { const g = E.inOut(prog(t, flatT, 1.2)); c.layer.style.filter = g > 0 ? `grayscale(${g.toFixed(2)})` : ""; });
    } });

    /* 10 · OLG Köln : elle aussi est responsable --------------------------------------------- */
    st.scene({ from: "b15", in: "wipe", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b15", s: 1, cx: 540, cy: 900 }]);
      const strike = T("b15@OLG");
      k.person(540, 1300, 1.3, (t) => Object.assign({ outfit: "robe", seed: 17, expr: "focused" }, SC.Pose.standDock));
      k.prop("dock", 540, 1312, 1.3, () => ({ w: 600, h: 180, seed: 44 }));
      k.person(540, 1300, 1.3, () => Object.assign({ outfit: "robe", seed: 17, only: "arms" }, SC.Pose.standDock));
      c.sk((g, p) => K.gavel(g, { x: 0, y: 0, rot: p.ang - 20, scale: 1.1 }), (t) => ({ ang: Math.round(t < strike - 0.4 ? 0 : t < strike ? -35 * E.out(prog(t, strike - 0.4, 0.3)) : -35 * (1 - E.in(prog(t, strike, 0.12)))) }), 820, 1040, 1);
      c.shake(strike + 0.12, 10, 0.4);
      k.chip("OLG Köln · 2025", "محكمة الاستئناف", 540, 430, 36).pop(strike);
      k.card(110, 500, 860, 230, { seed: 913 }).pop("b15@قالت", 0.35);
      c.write(c.text("„… sowohl einen Oberarzt als auch", 540, 570, 40, "de"), "b15@قالت", 0.7);
      c.write(c.text("einen Assistenzarzt …“", 540, 625, 40, "de"), "b15@قالت+0.7", 0.5);
      k.ar("حتى الـAssistenzärztin عندها واجب", 540, 690, 30, "ar strong").wipe("b15@Assistenzärztin", 0.6, "rtl");
      k.prop("stamp", 310, 830, 0.5, () => ({ text: "HAFTET PERSÖNLICH", size: 50, rot: -8 })).slam("b15@مسؤولة", 0.3, 10);
      c.kick("b15@شخصيا", 0.06);
    } });

    /* 11 · le mot : Remonstrationspflicht ------------------------------------------------------ */
    st.scene({ from: "b16", in: "zoom", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b16", s: 1.15, cx: 540, cy: 760 }, { at: "b17", s: 1, cx: 540, cy: 900, d: 0.6 }]);
      k.marker(540, 630, 760, 92).wipe("b16@Remonstrationspflicht", 0.4);
      c.text("Remonstrations-", 540, 610, 84, "de").pop("b16@Remonstrationspflicht", 0.45);
      c.text("pflicht", 540, 700, 84, "de").pop("b16@Remonstrationspflicht+0.12", 0.45);
      k.ar("= واجب الاعتراض", 540, 790, 40, "ar strong").wipe("b16@Remonstrationspflicht+0.3", 0.6, "rtl");
      st.flash("b16@Remonstrationspflicht", 0.25, 0.35); c.kick("b16@Remonstrationspflicht+0.1", 0.07);
      // ce qu'il aurait suffi de dire (exemple)
      k.ground(300, 1300, 400);
      k.person(300, 1300, 1.15, (t) => Object.assign({ outfit: "coat", hair: "long", badge: "AÄ", seed: 23, expr: t >= T("b17") ? "talk" : "neutral", talk: t >= T("b17") && t < T("b17@end") ? (Math.floor(t / 0.14) % 2 ? 1 : 0) : 0 }, SC.Pose.point));
      k.bubble({ x: 680, y: 960, w: 470, h: 170, tail: [-200, 60] }).pop("b17@شي");
      c.text("Wieso destilliertes Wasser?", 680, 950, 34, "de").pop("b17@شي+0.1");
      k.ar("علاش الما المقطر؟", 680, 1000, 30, "ar strong").wipe("b17@شي+0.2", 0.5, "rtl");
      k.chip("على الأقل تطرح السؤال", null, 680, 1110, 28, { yellow: true }).pop("b17@السؤال");
    } });

    /* 12 · la règle ------------------------------------------------------------------------------ */
    st.scene({ from: "b18", in: "fade", inDur: 0.35, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b18", s: 1, cx: 540, cy: 900 }]);
      k.ar("القاعدة", 540, 440, 56, "ttl", c.hud).wipe("b18", 0.5, "rtl");
      [["Zweifel? → laut sagen", "شكيتي؟ قولها بصوت عالي", "b18@شكيتي"], ["Warum? → nachfragen", "سول: علاش؟", "b18@سول"], ["Unsicher? → Oberarzt / Chefarzt", "طلع للـOberarzt ولا الـChefarzt", "b18@بقيتي"]].forEach(([d, a, at], i) => {
        const y = 600 + i * 150;
        k.card(110, y - 46, 76, 76, { seed: 600 + i, yellow: true }).pop(at);
        c.text("✓", 148, y + 14, 50, "de").pop(at + "+0.15");
        c.text(d, 220, y - 4, 42, "de", "start").slide(at, 40, 0, 0.35);
        c.text(a, 220, y + 46, 32, "ar strong", "end").wipe(at + "+0.1", 0.5, "rtl");
      });
      // la flèche qui remonte la hiérarchie
      c.put(`<path d="M890 980 L890 620 M868 648 L890 620 L912 648" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>`).wipe("b18@طلع", 0.5, "down");
      k.ribbon("Schweigen schützt nicht.", 540, 1160, { size: 54 }).wipe("b19", 0.5);
      k.ar("السكوت عمرو ما غادي يحميك", 540, 1270, 34, "ar strong").wipe("b19+0.2", 0.6, "rtl");
      c.kick("b19", 0.05);
    } });

    /* ---------- HUD : le mot caché + la barre de progression ---------- */
    {
      const wordEl = document.getElementById("word"), progEl = document.getElementById("prog"), bar = progEl.firstElementChild;
      const spans = WORD.split("").map((ch, i) => { const sp = document.createElement("span"); if (i === 14) sp.className = "gap"; sp.innerHTML = "<b></b>"; wordEl.appendChild(sp); return sp; });
      const groups = [["b5", [0]], ["b6@Oberärztin", [1]], ["b7@يجرب", [2]], ["b8@destilliertes", [3]], ["b9@شكات", [4]], ["b10@قالت", [5]],
        ["b11@تهضر", [6]], ["b12@دخل", [7]], ["b13@وقف", [8]], ["b14@Réanimation", [9, 10, 11, 12, 13]], ["b15@مسؤولة", [14, 15, 16, 17, 18, 19, 20]]];
      const at = new Array(WORD.length).fill(Infinity);
      groups.forEach(([cue, ix]) => ix.forEach((i, j) => { at[i] = T(cue) + j * 0.06; }));
      const on = T("b4@الآخر"), win = T("b16@Remonstrationspflicht"), sil0 = T("b14@end+0.3"), sil1 = T("b15") - 0.2, end = T("b19@end") + 0.15, total = T("b19@end");
      sv.hooks.push((t) => {
        const vis = t >= on && t < end && !(t > sil0 && t < sil1);
        wordEl.style.opacity = vis ? Math.min(1, (t - on) / 0.3).toFixed(2) : "0";
        spans.forEach((sp, i) => {
          const b = sp.firstChild, p = (t - at[i]) / 0.3, show = t >= at[i];
          const ch = show ? WORD[i] : "";
          if (b.textContent !== ch) b.textContent = ch;
          b.style.scale = show && p < 1 ? String(1 + 0.6 * (1 - p)) : "1";
          sp.classList.toggle("win", t >= win);
        });
        wordEl.style.scale = t >= win && t < win + 0.5 ? String(1 + 0.08 * Math.sin(((t - win) / 0.5) * Math.PI)) : "1";
        progEl.style.opacity = t > 0.2 && t < end ? "1" : "0";
        bar.style.width = (100 * clamp(t / total, 0, 1)).toFixed(2) + "%";
      });
      const brand = document.getElementById("brand");
      sv.hooks.push((t) => { const o = t < 0.25 ? t / 0.25 : t < end ? 1 : Math.max(0, 1 - (t - end) / 0.3); brand.style.opacity = o.toFixed(3); });
    }

    /* ---------- affiche finale + appel à commenter (écrit, pas dit) ---------- */
    st.flash("b19@end+0.15", 0.35, 0.85);
    st.summary({ at: "b19@end+0.15", in: "cut", dezoomAt: "b19@end+0.5", cols: 5, crop: [230, 1310], top: 330, gap: 10, side: 60,
      below(c, cells) {
        SketchUI.dots(c);
        const k = kit(c);
        k.ribbon("AKTE 02 · ما قالت والو", 540, 262, { size: 40, w: 560 });
        k.chip("@dr.aguilo", null, 135, 262, 22);
        k.chip("AKTE 03 · قريبا", null, 945, 262, 20, { yellow: true });
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
        k.card(110, 960, 760, 300, { seed: 990 }).pop("b19@end+0.9", 0.4);
        k.ar("ونتا، واش عمرك سكتّي حيت خفتي؟", 490, 1060, 34, "ttl").wipe("b19@end+1.0", 0.6, "rtl");
        k.ar("كتب ليا فالكومنتير", 490, 1170, 32, "ar strong").wipe("b19@end+1.4", 0.5, "rtl");
        c.put(`<path d="M780 1150 C 860 1150, 900 1160, 918 1196 M896 1186 L918 1196 L922 1172" stroke="#1C1A1C" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).wipe("b19@end+1.6", 0.4);
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
