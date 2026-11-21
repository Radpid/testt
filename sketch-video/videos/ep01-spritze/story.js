/* AKTE 01 — Die weiße Spritze · refonte au style de la vidéo de référence.
 * 15 scènes plein écran (personnages au trait SketchCast, papier à points, jaune surligneur),
 * caméra qui zoome dans chaque scène, puis affiche-résumé finale avec dézoom.
 * Zone utile : y 210 → 1300 (sous-titres dessous), textes à x < 960.
 */
(function () {
  "use strict";
  const SC = SketchCast, K = Cast, W = 1080;
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, a, p) => { const n = document.createElementNS(NS, tag); for (const k in a || {}) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; };
  const isLatin = (s) => /[A-Za-z0-9]/.test(s) && !/[؀-ۿ]/.test(s);

  window.SV_BUILD = (sv) => {
    const st = Stage.create(sv), T = (x) => st.T(x), E = Stage.E, prog = Stage.prog, lerp = Stage.lerp, clamp = Stage.clamp;

    /* ---------- boîte à outils de scène ---------- */
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
          SC.util.text(g, de, 0, size * 0.36, size, {});
          if (ar) SC.util.text(g, ar, 0, h / 2 + size * 0.78, Math.round(size * 0.66), { font: "'Plex Arabic', sans-serif", weight: 400, fill: "#6E6E6A", rtl: true });
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
        ar(text, x, y, size = 34, cls = "ar", parent) { return c.text(text, x, y, size, cls, "middle", parent); },
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

    // seringue tenue : redessinée au point de la main
    const MILKY = { milky: true, label: "?" };

    /* 1 · condamné ------------------------------------------------------------- */
    st.scene({ from: 0, in: "cut", inDur: 0, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: 0, s: 1.55, cx: 400, cy: 800 }, { at: "b1@تحكم", s: 1, cx: 540, cy: 900, d: 1.1 }]);
      k.ribbon("مُدان", 400, 330, { size: 92, w: 360 }).wipe("b1@تحكم+0.3", 0.5, "rtl");
      k.ground(400, 1250, 600);
      const stu = k.person(400, 1250, 1.45, (t) => Object.assign({ outfit: "coat", seed: 7, expr: t > T("b1@تحكم") ? "sad" : "unsure" }, SC.Pose.standDock));
      k.prop("dock", 400, 1262, 1.45, () => ({ w: 380, h: 188 }));
      k.person(400, 1250, 1.45, (t) => Object.assign({ outfit: "coat", seed: 7, only: "arms" }, SC.Pose.standDock));
      k.prop("stamp", 790, 560, 0.9, () => ({ text: "SCHULDIG", sub: "§ 222 StGB", size: 70, rot: -8 })).slam("b1@تحكم", 0.3, 12);
      k.chip("fahrlässige Tötung", "القتل غير العمدي", 790, 760, 38).pop("b1@غير", 0.45);
      k.ar("كرسي المتهم", 400, 1218, 30, "ar strong").fade("b1@ألمانيا");
    } });

    /* 2 · le risque : la prison ----------------------------------------------- */
    st.scene({ from: "b2", in: "slideLeft", inDur: 0.5, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b2", s: 1, cx: 540, cy: 900 }, { at: "b2+0.2", s: 1.08, cx: 540, cy: 880, d: 3, ease: "lin" }]);
      k.ribbon("حتى 5 سنين ف الحبس", 540, 330, { size: 70 }).wipe("b2", 0.6, "rtl");
      k.ground(540, 1250, 640);
      k.person(540, 1250, 1.4, (t) => Object.assign({ outfit: "coat", seed: 7, expr: t > T("b2@للحبس") ? "shock" : "sad" }, t > T("b2@للحبس") ? SC.Pose.handsOnHead : SC.Pose.stand));
      // barreaux dessinés à la main, qui descendent
      const bars = el("g");
      const C = SC.util.ctx(bars, 77, false, 1);
      SC.util.shape(C, "frame", SC.util.rrect(250, 520, 580, 740, 10), {}, { sw: 6 });
      for (let i = 1; i < 8; i++) SC.util.shape(C, "bar" + i, SC.util.rrect(250 + i * 72 - 7, 526, 14, 728, 6), SC.MAT.mid, { sw: 2.4 });
      SC.util.shape(C, "cross", SC.util.rrect(256, 760, 568, 16, 6), SC.MAT.mid, { sw: 2.4 });
      c.node(bars).wipe("b2@للحبس", 0.7, "down");
      k.chip("§ 222 StGB · bis zu 5 Jahre Haft", "القانون: حتى 5 سنين حبس", 540, 470, 34).pop("b2@خمس");
    } });

    /* 3 · la seringue, l'énigme ------------------------------------------------ */
    st.scene({ from: "b3", in: "zoom", inDur: 0.5, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b3", s: 1, cx: 540, cy: 900 }, { at: "b3@بيضا", s: 1.5, cx: 420, cy: 680, d: 1 }, { at: "b4", s: 1, cx: 540, cy: 900, d: 0.9 }]);
      k.ribbon("و السبب؟", 540, 320, { size: 84 }).wipe("b3", 0.5, "rtl");
      k.prop("syringe", 560, 680, 2.2, () => MILKY, -8).slide("b3@Spritze", 700, 0, 0.7).float(5, 3.2);
      k.marker(368, 700, 230, 120, -8).wipe("b3@مكتوب", 0.4).on((t, s) => { s.o *= 0.55; });
      for (let i = 0; i < 4; i++) {
        k.card(90 + i * 230, 960, 200, 150, { seed: 300 + i }).pop(`b4@أربع+${(i * 0.12).toFixed(2)}`);
        k.title("?", 190 + i * 230, 1068, 96).pop(`b4@أربع+${(i * 0.12 + 0.08).toFixed(2)}`);
      }
      k.ar("أربع كلمات… غادي تشوفهم ف اللخر", 540, 1200, 40).fade("b4@كلمات");
    } });

    /* 4 · Bielefeld, le Bébé --------------------------------------------------- */
    st.scene({ from: "b5", in: "iris", inDur: 0.7, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b5", s: 1.45, cx: 430, cy: 880 }, { at: "b5@عشرة-0.4", s: 1, cx: 540, cy: 900, d: 1 }]);
      k.ribbon("Bielefeld · 2011", 540, 320, { size: 64 }).wipe("b5", 0.5);
      k.ar("ألمانيا · قسم سرطان الأطفال", 540, 430, 34).fade("b5+0.3");
      k.cast("bed", { x: 90, y: 1250, w: 520 });
      k.ground(540, 1252, 900);
      k.person(420, 1250, 1.35, () => Object.assign({ outfit: "mother", seed: 21, baby: { state: "normal", eyes: "closed" } }, SC.Pose.carryBaby)).fade("b5+0.2");
      k.chip("10 Monate", "عشرة د الشهور", 800, 620, 40).pop("b5@عشرة");
      k.chip("Leukämie", "سرطان الدم", 800, 800, 40, { yellow: true }).pop("b5@سرطان");
    } });

    /* 5 · l'étudiant arrive ---------------------------------------------------- */
    st.scene({ from: "b6", in: "slideLeft", inDur: 0.5, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b6", s: 1.15, cx: 540, cy: 900 }, { at: "b6@سيمانة", s: 1.35, cx: 560, cy: 860, d: 1 }]);
      k.ribbon("الطالب", 540, 320, { size: 84 }).wipe("b6", 0.5, "rtl");
      k.ground(540, 1250, 900);
      k.walker({ at: "b6", dur: 2.2, x0: -150, x1: 380, y: 1250, s: 1.4, outfit: "coat", seed: 7, expr: "calm", after: () => SC.Pose.stand });
      k.chip("PJ · 29 Jahre", "طالب ف آخر عام ديال الطب", 780, 640, 40).pop("b6@طالب");
      k.chip("1 Woche", "عاد سيمانة ف القسم", 780, 860, 44, { yellow: true }).pop("b6@سيمانة");
    } });

    /* 6 · le malentendu -------------------------------------------------------- */
    st.scene({ from: "b7", in: "wipe", inDur: 0.6, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b7", s: 1.3, cx: 360, cy: 860 }, { at: "b8", s: 1.3, cx: 720, cy: 860, d: 1 }, { at: "b8@Refobacin", s: 1, cx: 540, cy: 900, d: 0.9 }]);
      k.ground(540, 1250, 980);
      k.person(250, 1250, 1.3, (t) => Object.assign({ outfit: "scrubs", seed: 11, facing: 1, expr: "talk", talk: t >= T("b7") && t < T("b7@end") ? (Math.floor(t / 0.14) % 2 ? 1 : 0) : 0 }, SC.Pose.point));
      k.bubble({ x: 340, y: 470, w: 380, h: 150, tail: [-120, 70], text: "", size: 44 }).pop("b7+0.2");
      c.de("Blutentnahme", 340, 470, 50, "أخذ الدم").pop("b7@الدم");
      k.person(830, 1250, 1.3, (t) => Object.assign({ outfit: "coat", seed: 7, facing: -1, expr: t > T("b8@Refobacin") ? "calm" : "focused" }, SC.Pose.stand));
      k.bubble({ x: 760, y: 700, w: 430, h: 200, tail: [80, 60], think: true }).pop("b8+0.2");
      c.de("Blut", 650, 700, 44, "الدم").pop("b8@فهم");
      k.title("+", 712, 712, 50).pop("b8@يعطيه");
      k.marker(840, 690, 210, 60).wipe("b8@Refobacin", 0.4);
      c.de("Refobacin", 840, 700, 44, "دوا ف العرق").pop("b8@يعطيه");
    } });

    /* 7 · la seringue posée ---------------------------------------------------- */
    st.scene({ from: "b9", in: "fade", inDur: 0.5, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b9", s: 1, cx: 540, cy: 900 }, { at: "b10", s: 1.25, cx: 640, cy: 800, d: 0.9 }]);
      k.ground(540, 1250, 1000);
      k.person(170, 1250, 1.1, () => Object.assign({ outfit: "mother", seed: 21, baby: { state: "normal", eyes: "closed" } }, SC.Pose.carryBaby));
      k.person(420, 1250, 1.2, () => Object.assign({ outfit: "coat", seed: 7, view: "back" }, SC.Pose.stand, { view: "back" }));
      k.cast("cabinet", { x: 600, y: 1250 });
      k.walker({ at: "b9", dur: 1.6, x0: 1250, x1: 900, y: 1250, s: 1.2, outfit: "scrubs", seed: 11, expr: "neutral",
        after: (t) => (t >= T("b10") ? Object.assign({}, SC.Pose.point, { expr: "talk", talk: t < T("b10@end") ? (Math.floor(t / 0.14) % 2 ? 1 : 0) : 0, facing: -1 }) : Object.assign({}, SC.Pose.stand, { facing: -1 })) });
      k.prop("syringe", 700, 1000, 0.45, () => MILKY).slide("b9@حطات", 0, -60, 0.4);
      k.chip("kein Blickkontakt", "ما تشافوش", 420, 520, 34).pop("b9@ظهرو").hide("b10", 0.3);
      k.bubble({ x: 640, y: 500, w: 560, h: 200, tail: [180, 90] }).pop("b10");
      c.text("Hier ist das orale", 640, 480, 44, "de").pop("b10+0.1");
      c.text("Antibiotikum.", 640, 532, 44, "de").pop("b10+0.25");
      k.ar("ها هو المضاد الحيوي ديال الفم", 640, 650, 30).fade("b10+0.4");
      k.chip("laut Urteil", "حسب الحكم", 210, 400, 30).pop("b10+0.5");
    } });

    /* 8 · STOP ----------------------------------------------------------------- */
    st.scene({ from: "b11", in: "cut", inDur: 0, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b11", s: 1.4, cx: 400, cy: 860 }, { at: "b12", s: 1, cx: 540, cy: 900, d: 0.6 }]);
      k.ground(380, 1250, 520);
      const stu = k.person(380, 1250, 1.4, (t) => Object.assign({ outfit: "coat", seed: 7, expr: t > T("b12") ? "unsure" : "focused" }, SC.Pose.holdObject));
      k.prop("syringe", 0, 0, 0.75, () => MILKY, -20).on((t, s) => { const h = stu.out && stu.out.handR; if (h) { s.x += 380 + h[0] * 1.4; s.y += 1250 + h[1] * 1.4; } });
      k.bubble({ x: 330, y: 400, w: 380, h: 150, think: true }).pop("b11@خاطرو");
      c.text("Refobacin?", 330, 418, 54, "de").pop("b11@خاطرو+0.1");
      k.prop("stamp", 810, 430, 0.95, () => ({ text: "STOP", size: 90, rot: 8 })).slam("b12", 0.28, 14);
      st.flash("b12", 0.3, 0.8);
      k.chip("A · Spritzen", "ينجيكتيها", 800, 760, 42).slide("b12@شنو", 400, 0, 0.45, "back");
      k.chip("B · Nachfragen", "يسول", 800, 960, 42, { yellow: true }).slide("b12@شنو+0.3", 400, 0, 0.45, "back");
    } });

    /* 9 · l'injection, dans la chambre ----------------------------------------- */
    st.scene({ from: "b13", in: "fade", inDur: 0.5, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b13", s: 1.25, cx: 520, cy: 980 }, { at: "b13@دفعها", s: 1.7, cx: 500, cy: 1020, d: 1 }, { at: "b13@sirop", s: 1.25, cx: 520, cy: 980, d: 0.8 }]);
      k.ground(540, 1252, 980);
      k.prop("crib", 330, 1250, 1.2, () => ({ w: 380, part: "back" }));
      const bb = k.baby(300, 1250 - 150 * 1.2, 1.2, () => ({ pose: "lying", state: "normal", eyes: "closed" }));
      k.prop("crib", 330, 1250, 1.2, () => ({ w: 380, part: "front" }));
      const stu = k.person(760, 1250, 1.3, (t) => Object.assign({ outfit: "coat", seed: 7, facing: -1, expr: "focused" }, SC.Pose.leanOverCrib));
      const a = T("b13@دفعها");
      const syr = k.prop("syringe", 0, 0, 0.62, (t) => ({ milky: true, label: null, push: Math.round(E.inOut(prog(t, a, 1.3)) * 30) / 30 }), 180)
        .on((t, s) => { const h = stu.out && (stu.out.handR || stu.out.handL); if (h) { s.x += 760 + h[0] * 1.3; s.y += 1250 + h[1] * 1.3; } });
      // ligne vers la poitrine du Bébé + gouttes blanches
      const path = c.put(`<path d="" fill="none" stroke="#1d1d1b" stroke-width="2.6"/>`);
      const drops = [];
      for (let i = 0; i < 9; i++) drops.push(c.put(`<circle r="7" fill="#fff" stroke="#1d1d1b" stroke-width="2"/>`));
      c.tick((t) => {
        const h = stu.out && (stu.out.handR || stu.out.handL), ch = bb.out && bb.out.chest;
        if (!h || !ch) return;
        const p0 = [760 + h[0] * 1.3 - 80, 1250 + h[1] * 1.3], p1 = [300 + ch[0] * 1.2, 1250 - 180 + ch[1] * 1.2];
        const mid = [(p0[0] + p1[0]) / 2, Math.max(p0[1], p1[1]) + 40];
        path.g.firstChild.firstChild.setAttribute("d", `M${p0[0]} ${p0[1]} Q${mid[0]} ${mid[1]} ${p1[0]} ${p1[1]}`);
        drops.forEach((d, i) => {
          const q = prog(t, a + i * 0.16, 1.4); const on = q > 0 && q < 1;
          const x = (1 - q) * (1 - q) * p0[0] + 2 * (1 - q) * q * mid[0] + q * q * p1[0], y = (1 - q) * (1 - q) * p0[1] + 2 * (1 - q) * q * mid[1] + q * q * p1[1];
          d.g.firstChild.setAttribute("transform", `translate(${x} ${y})`); d.g.firstChild.style.display = on ? "" : "none";
        });
      });
      k.chip("oral ≠ i.v.", "ديال الفم ≠ ديال العرق", 540, 420, 56, { yellow: true, parent: c.hud }).pop("b13@الفم");
    } });

    /* 10 · le Bébé décompense --------------------------------------------------- */
    st.scene({ from: "b14", in: "cut", inDur: 0, build(c) {
      const k = kit(c); k.bg();
      const blue = T("b14@زرق");
      c.camera([{ at: "b14", s: 1, cx: 540, cy: 900 }, { at: "b14@زرق-0.2", s: 1.6, cx: 360, cy: 980, d: 0.6 }, { at: "b15", s: 1, cx: 540, cy: 900, d: 0.7 }]);
      k.marker(540, 330, 360, 120).wipe("b14@زرق", 0.4);
      k.title("08:46", 540, 370, 110).pop("b14@زرق");
      k.ar("الـBébé ولى زرق، و كيتنفس بالجهد", 540, 470, 36, "ar strong").fade("b14@زرق+0.3");
      k.ground(540, 1252, 1000);
      k.prop("monitor", 150, 760, 0.85, (t) => ({ ecg: t >= blue ? "alarm" : "normal", t: Math.round(((t * 0.6) % 1) * 24) / 24, hr: t >= blue ? "!" : "", stand: 420 })).pulse("b14@زرق", 0.8, 0.06, 3);
      k.prop("crib", 440, 1250, 1.2, () => ({ w: 380, part: "back" }));
      k.baby(410, 1250 - 180, 1.2, (t) => ({ pose: "lying", state: t >= blue ? "blue" : "normal", eyes: "closed" }));
      k.prop("crib", 440, 1250, 1.2, () => ({ w: 380, part: "front" }));
      k.walker({ at: "b14@الفرملية", dur: 1.2, x0: 1250, x1: 820, y: 1250, s: 1.25, outfit: "scrubs", seed: 11,
        after: (t) => Object.assign({}, t >= blue ? SC.Pose.leanOverCrib : SC.Pose.stand, { facing: -1, expr: t >= blue ? "shock" : "neutral" }) });
      k.walker({ at: "b15@جريين", dur: 1.0, x0: 1300, x1: 980, y: 1250, s: 1.2, outfit: "oberarzt", seed: 13, run: true, expr: "shock",
        after: () => Object.assign({}, SC.Pose.point, { facing: -1, expr: "focused" }) });
      k.chip("Oberarzt", "الطبيب المسؤول", 900, 620, 34).pop("b15@جريين+0.8");
      st.vignette("b14@زرق", 2.2, 3);
      c.shake("b15@جريين", 8, 0.5);
    } });

    /* 11 · réanimation ---------------------------------------------------------- */
    st.scene({ from: "b16", in: "fade", inDur: 0.6, build(c) {
      const k = kit(c); k.bg();
      const r0 = T("b16"), flat = T("b16@بقاش");
      c.camera([{ at: "b16", s: 1, cx: 540, cy: 900 }, { at: "b16+0.2", s: 1.1, cx: 540, cy: 880, d: 3, ease: "lin" }]);
      k.chip("K1 · Intensivstation", "قسم الإنعاش", 540, 330, 46).pop("b15@Intensivstation-0.2");
      const hm = (t) => { const m = Math.round(lerp(8 * 60 + 55, 12 * 60 + 28, E.inOut(prog(t, r0, Math.max(1, flat - r0))))); return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`; };
      c.sk((g, p) => K.clock(g, { x: 0, y: 0, r: 120, time: p.time, label: false }), (t) => ({ time: hm(t) }), 300, 720, 1);
      const dg = c.text("08:55", 300, 930, 80, "de");
      dg.on((t) => { const s = hm(t); if (dg.textEl.textContent !== s) dg.textEl.textContent = s; });
      k.prop("monitor", 760, 720, 0.85, (t) => ({ ecg: t >= flat ? "flat" : "alarm", t: Math.round(((t * 0.6) % 1) * 24) / 24, hr: t >= flat ? "0" : "!" }));
      k.chip("Reanimation · 3,5 h", "الإنعاش · 3 سوايع و نص", 540, 1120, 46).pop("b16@Reanimation");
      c.put(`<rect x="-200" y="-200" width="1480" height="2400" fill="#F7F7F1"/>`).on((t, s) => { s.o *= 0.86 * E.inOut(prog(t, flat + 0.4, 1.2)); });
      k.title("12:28", 540, 860, 150).fade(flat + 0.9, 0.8);
    } });

    /* 12 · le lendemain --------------------------------------------------------- */
    st.scene({ from: "b17", in: "slideUp", inDur: 0.5, build(c) {
      const k = kit(c); k.bg();
      k.card(380, 260, 320, 300, { seed: 812 }).pop("b17", 0.5);
      k.title("23", 540, 460, 150).pop("b17+0.1");
      c.text("August 2011", 540, 530, 36, "de").pop("b17+0.15");
      k.ar("النهار لي من موراه", 540, 640, 40, "ar strong").fade("b17+0.3");
      k.prop("syringe", 540, 820, 1.3, () => ({ milky: false, label: null }));
      c.put(`<path d="M300 740 L780 900 M300 900 L780 740" stroke="#1d1d1b" stroke-width="12" stroke-linecap="round" fill="none"/>`).wipe("b17@بدل", 0.4);
      k.prop("syringe", 540, 1060, 1.3, () => ({ milky: false, label: "ORAL" })).slide("b17@الفم", -900, 0, 0.6);
      k.marker(540, 1060, 120, 50).fade("b17@الفم+0.5").on((t, s) => { s.o *= 0.6; });
      k.chip("Oralspritze", "حقنة ديال الفم", 540, 1200, 40, { yellow: true }).pop("b17@كاملين");
    } });

    /* 13 · le tribunal ---------------------------------------------------------- */
    st.scene({ from: "b18", in: "wipe", inDur: 0.6, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b18", s: 1, cx: 540, cy: 900 }, { at: "b19", s: 1.15, cx: 540, cy: 820, d: 0.9 }]);
      const strike = T("b18@fahrlässige");
      k.person(540, 1250, 1.35, (t) => Object.assign({ outfit: "robe", seed: 17, expr: t >= T("b19") && t < T("b19@end") ? "talk" : "focused", talk: t >= T("b19") && t < T("b19@end") ? (Math.floor(t / 0.14) % 2 ? 1 : 0) : 0 }, SC.Pose.standDock));
      k.prop("dock", 540, 1262, 1.35, () => ({ w: 600, h: 188, seed: 44 }));
      k.person(540, 1250, 1.35, () => Object.assign({ outfit: "robe", seed: 17, only: "arms" }, SC.Pose.standDock));
      c.sk((g, p) => K.gavel(g, { x: 0, y: 0, rot: p.ang - 20, scale: 1.1 }), (t) => ({ ang: Math.round(t < strike - 0.4 ? 0 : t < strike ? -35 * E.out(prog(t, strike - 0.4, 0.3)) : -35 * (1 - E.in(prog(t, strike, 0.12)))) }), 820, 980, 1);
      c.shake(strike + 0.12, 10, 0.4);
      k.chip("fahrlässige Tötung · 2012", "القتل غير العمدي · المحكمة الابتدائية", 540, 340, 42).pop(strike).hide("b19", 0.3);
      k.card(70, 250, 940, 380, { seed: 913 }).pop("b19", 0.4);
      const d19 = Math.max(1.5, T("b19@end") - T("b19"));
      c.write(c.text("„Da hätte der Angeklagte", 540, 360, 60, "de"), "b19", d19 * 0.4);
      k.marker(690, 432, 300, 70).wipe("b19@nachfragen", 0.4);
      c.write(c.text("zumindest nachfragen", 540, 452, 60, "de"), `b19+${(d19 * 0.4).toFixed(2)}`, d19 * 0.35);
      c.write(c.text("müssen.“", 540, 544, 60, "de"), `b19+${(d19 * 0.75).toFixed(2)}`, d19 * 0.2);
      k.ar("كان خاص المتهم على الأقل يسول", 540, 604, 34, "ar strong").fade("b19@end");
    } });

    /* 14 · les parents, la licence ---------------------------------------------- */
    st.scene({ from: "b20", in: "fade", inDur: 0.5, build(c) {
      const k = kit(c); k.bg();
      c.camera([{ at: "b20", s: 1.25, cx: 360, cy: 860 }, { at: "b21", s: 1.25, cx: 720, cy: 860, d: 1.1 }]);
      k.ground(540, 1252, 1000);
      k.cast("door", { x: 40, y: 1250, w: 240, h: 520, label: "" });
      k.walker({ at: "b20@خرجو", dur: 2.2, x0: 560, x1: 170, y: 1250, s: 1.1, outfit: "civil", seed: 31 }).hide("b20@خرجو+2.2", 0.4);
      k.walker({ at: "b20@خرجو+0.3", dur: 2.2, x0: 660, x1: 200, y: 1250, s: 1.05, outfit: "mother", seed: 32 }).hide("b20@خرجو+2.5", 0.4);
      k.ar("كانو باغيين الحبس", 360, 470, 50, "ttl").fade("b20@باغيين");
      k.person(760, 1250, 1.25, () => Object.assign({ outfit: "coat", seed: 7, expr: "sad", badge: false }, SC.Pose.stand)).fade("b21");
      k.chip("Approbation ✓", "رخصة الطب · خداها", 760, 420, 44, { yellow: true }).pop("b21@خداها");
      k.chip("Bundeszentralregister", "مسجل ف السجل العدلي", 760, 600, 36).pop("b21@مسجل");
    } });

    /* 15 · la règle -------------------------------------------------------------- */
    st.scene({ from: "b22", in: "fade", inDur: 0.5, build(c) {
      const k = kit(c); k.bg();
      ["Was", "ist", "da", "drin?"].forEach((w, i) => {
        const at = `b22@${w.replace("?", "")}`;
        k.card(70 + i * 240, 280, 220, 140, { seed: 500 + i, yellow: i === 3 }).pop(at);
        c.text(w, 180 + i * 240, 375, 64, "de").pop(at);
      });
      k.ar("شنو كاين فيها؟", 540, 500, 48, "ar strong").fade("b22@drin+0.2");
      [["Selbst aufgezogen?", "عمرتيها بيدك؟", "b23@عمرتيهاش"], ["Beschriftet?", "مكتوب عليها؟", "b23@مكتوب"], ["Nein? → nachfragen!", "لا؟ ← سول!", "b23@سول"]].forEach(([d, a, at], i) => {
        const y = 640 + i * 150;
        k.card(100, y - 62, 76, 76, { seed: 600 + i, yellow: true }).pop(at);
        c.text(String(i + 1), 138, y, 48, "de").pop(at);
        c.text(d, 210, y - 6, 54, "de", "start").slide(at, 40, 0, 0.35);
        c.text(a, 210, y + 44, 34, "ar", "end").fade(at + "+0.15");
      });
      k.ribbon("Fragen ist erlaubt.", 540, 1130, { size: 58 }).wipe("b24@السؤال", 0.5);
      k.ar("السؤال عمرو ما كان عيب", 540, 1250, 40, "ar strong").fade("b24@السؤال+0.2");
    } });

    /* affiche-résumé finale --------------------------------------------------- */
    st.summary({ at: "b24@comments+0.2", dezoomAt: "b24@comments+0.8", cols: 3, crop: [230, 1310], top: 120, gap: 10, side: 16,
      below(c, cells) {
        SketchUI.dots(c);
        const k = kit(c);
        k.ribbon("AKTE 01 · الحقنة البيضا", 540, 64, { size: 46, w: 640 });
        k.chip("@dr.aguilo", null, 120, 64, 26);
        k.chip("AKTE 02 · قريبا", null, 950, 64, 24, { yellow: true });
        cells.forEach((cell) => {
          const g = el("g");
          el("path", { d: SC.util.rrect(cell.x, cell.y, cell.w, cell.h, 14), fill: "#D2D2CB", transform: "translate(6 8)" }, g);
          el("path", { d: SC.util.rrect(cell.x, cell.y, cell.w, cell.h, 14), fill: "#F7F7F1" }, g);
          c.node(g);
        });
      },
      above(c, cells) {
        cells.forEach((cell) => {
          const g = el("g"); const C = SC.util.ctx(g, 950 + cell.i, false, 1);
          SC.util.shape(C, "o", SC.util.rrect(cell.x, cell.y, cell.w, cell.h, 14), {}, { sw: 3 });
          SC.util.shape(C, "b", SC.util.rrect(cell.x + cell.w - 46, cell.y + 8, 38, 38, 19), SC.MAT.yellow, { sw: 2.4 });
          SC.util.text(g, String(cell.i + 1), cell.x + cell.w - 27, cell.y + 35, 22, {});
          c.node(g);
        });
      } });

    st.finish(1.0);
  };
})();
