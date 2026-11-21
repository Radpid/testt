/* AKTE 01 — Die weiße Spritze : les scènes animées.
 * Chaque scène démarre sur une cue (beat ou mot) et dure jusqu'au début de la suivante.
 * Zone utile à l'écran (Reel) : y 210 → 1300 (en dessous : sous-titres puis interface Instagram), x < 960 pour les textes.
 * Les textes allemands ont toujours leur traduction arabe en petit dessous (glossaire de la série).
 */
(function () {
  "use strict";
  const P = Props, W = 1080;
  const MILKY = { liquid: "milky", fill: 0.85, label: "?", tip: "stopper" };

  function room(c, o = {}) {
    const parent = o.parent || c.cam;
    c.put(P.roomBackdrop({ w: W, h: 1920, floorY: 1280 }), 0, 0, 1, 0, parent);
    c.put(P.door({ number: "204" }), 14, 1272, 0.84, 0, parent);
    if (!o.bare) {
      c.put(P.wallClock({ time: o.time || "08:40", r: 58 }), 440, 420, 1, 0, parent);
      c.put(P.kidsDrawings(), 210, 420, 0.66, 0, parent);
    }
    c.put(P.ivPole({ lineTo: [120, -215] }), 330, 1276, 0.86, 0, parent);
    c.put(P.hospitalBed({ w: 520 }), 110, 1290, 1, 0, parent);
    if (!o.noPeople) {
      c.actor({ x: 400, y: 1302, scale: 0.205, body: "CrossedLegs", hair: "Long", cls: "sil", seed: 3 }, parent);
      c.put(P.babyBundle({}), 432, 1092, 0.78, -72, parent);
    }
    if (o.cabinet !== false) c.put(P.bedsideCabinet({}), 790, 1290, 0.9, 0, parent);
  }
  function corner(c, sub, ar, at) {
    c.text("AKTE 01", 64, 250, 34, "de", "start", c.hud).fade(at);
    c.de(sub, 64, 292, 26, ar, "start", c.hud).fade(at);
  }
  // point le long d'une polyligne
  function along(pts, q) {
    const seg = []; let tot = 0;
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); tot += l; }
    let d = q * tot;
    for (let i = 0; i < seg.length; i++) {
      if (d <= seg[i] || i === seg.length - 1) { const k = seg[i] ? Math.min(1, d / seg[i]) : 0; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k]; }
      d -= seg[i];
    }
    return pts[pts.length - 1];
  }

  window.SV_BUILD = (sv) => {
    const st = Stage.create(sv), T = (x) => st.T(x), E = Stage.E, prog = Stage.prog, lerp = Stage.lerp;

    /* 1 · Accroche ------------------------------------------------------ */
    st.scene({ from: 0, in: "cut", inDur: 0, build(c) {
      c.camera([{ at: 0, s: 1.2, cx: 560, cy: 780 }, { at: "b1@Spritze", s: 1, cx: 540, cy: 900, d: 1.3 }, { at: "b3", s: 1.07, cx: 540, cy: 990, d: 1 }]);
      c.put(P.tag({ text: "Deutschland · 2011", kind: "main" }), 250, 300, 1, 0, c.hud).pop("b1@ألمانيا");
      c.text("ألمانيا · 2011", 250, 362, 30, "ar", "middle", c.hud).fade("b1@ألمانيا+0.2");
      c.put(P.calendarPage({ date: "22.08.2011" }), 860, 350, 0.78, 6, c.hud).slide("b1@ألمانيا+0.3", 0, -420, 0.7, "back");
      c.put(P.syringe(MILKY), 150, 780, 1.55, -8).slide(0.05, 900, 0, 0.9).float(5, 3.4);
      c.put(`<ellipse cx="331" cy="755" rx="128" ry="82" fill="none" stroke="var(--accent)" stroke-width="7" transform="rotate(-8 331 755)"/>`).wipe("b2@مكتوب", 0.5);
      c.put(`<ellipse cx="128" cy="812" rx="11" ry="15" fill="#fff" stroke="var(--ink)" stroke-width="4"/>`).on((t, s) => {
        const a = T("b2@الحليب"), p = prog(t, a, 0.9);
        s.o *= p > 0 && p < 1 ? 1 : 0; s.y += 300 * E.in(p);
      });
      c.put(P.stamp({ text: "SCHULDIG", sub: "fahrlässige Tötung", rot: -7 }), 540, 1090, 1.35).slam("b3@بالقتل");
      c.text("مُدان · القتل غير العمدي", 540, 1232, 34, "ar").fade("b3@بالقتل+0.4");
    } });

    /* 2 · Le dossier ---------------------------------------------------- */
    st.scene({ from: "b4", in: "slideUp", inDur: 0.55, build(c) {
      c.camera([{ at: "b4", s: 1, cx: 540, cy: 960 }, { at: "b4+0.7", s: 1.05, cx: 560, cy: 900, d: 4, ease: "lin" }]);
      const openAt = T("b4@حقيقية");
      c.dyn((t) => P.akteFolder({ title: "AKTE 01", sub: "Bielefeld · 2011", open: E.inOut(prog(t, openAt, 0.9)) }), 740, 680, 1).slide("b4", 0, -1100, 0.7);
      c.shake(T("b4") + 0.68, 10, 0.35);
      c.write(c.text("Die weiße Spritze", 742, 560, 46), "b4@حقيقية+0.8", 0.7);
      c.text("الحقنة البيضا", 742, 612, 30, "ar").fade("b4@حقيقية+1.4");
      c.de("LG Bielefeld · rechtskräftig", 742, 700, 24, "محكمة Bielefeld · حكم نهائي").fade("b4@حقيقية+1.6");
      for (let i = 0; i < 4; i++) {
        c.box(70 + i * 240, 1040, 220, 110, 18).pop(`b4@أربع+${(i * 0.12).toFixed(2)}`);
        c.text("?", 180 + i * 240, 1120, 66, "de accent").pop(`b4@أربع+${(i * 0.12 + 0.1).toFixed(2)}`);
      }
      c.text("أربع كلمات… غادي تشوفهم ف اللخر", 540, 1212, 30, "ar").fade("b4@كلمات+0.3");
    } });

    /* 3 · Le décor : chambre 204 ---------------------------------------- */
    st.scene({ from: "b5", in: "iris", inDur: 0.7, build(c) {
      room(c);
      c.camera([{ at: "b5", s: 2.2, cx: 216, cy: 780 }, { at: "b5@ألفين", s: 1, cx: 540, cy: 960, d: 1.4 },
        { at: "b6", s: 1.28, cx: 430, cy: 1085, d: 1.1 }, { at: "b7", s: 1, cx: 540, cy: 960, d: 1 }]);
      // fiche du Bébé
      const info = c.box(590, 240, 430, 330, 22, "var(--white)", "var(--ink)", 4, c.hud).pop("b6", 0.5).hide("b7", 0.3);
      [["Baby · 10 Monate", "Bébé · عشرة د الشهور", "b6@عشرة"], ["Leukämie (AML)", "سرطان الدم", "b6@سرطان"], ["Chemotherapie", "العلاج الكيميائي", "b6@الكيميو"]].forEach(([d, a, at], i) => {
        c.de(d, 620, 310 + i * 100, 36, a, "start", c.hud).slide(at, 30, 0, 0.4).hide("b7", 0.3);
      });
      // l'étudiant arrive
      c.actor({ x: -140, y: 1318, scale: 0.21, body: "Doc", hair: "ShortVolumed", face: "Calm", seed: 7 })
        .walk("b7", 680, 2.0).turn("b7@سيمانة", true).face("b7@سيمانة", "Serious");
      c.box(590, 250, 430, 230, 22, "var(--white)", "var(--ink)", 4, c.hud).pop("b7@طالب", 0.5);
      c.de("PJler · 29 Jahre", 620, 320, 36, "طالب ف آخر عام · 29 عام", "start", c.hud).slide("b7@طالب", 30, 0, 0.4);
      c.de("1 Woche auf Station", 620, 420, 36, "عاد سيمانة ف القسم", "start", c.hud).slide("b7@سيمانة", 30, 0, 0.4);
    } });

    /* 4 · Le malentendu (écran partagé) ---------------------------------- */
    st.scene({ from: "b8", in: "wipe", inDur: 0.6, build(c) {
      c.put(`<path d="M40 770 H1040" stroke="var(--ink)" stroke-width="4" stroke-dasharray="14 12" stroke-linecap="round"/>`).wipe("b8", 0.6);
      c.de("Was sie meinte", 1016, 262, 30, "شنو قصدات هي", "end").fade("b8");
      const top = c.clipped(0, 220, W, 530);
      c.actor({ x: 250, y: 1160, scale: 0.3, body: "DocProtectiveClothe", hair: "Bun", face: "Calm", cls: "nurse", seed: 11 }, top)
        .talk("b8", "b8@end").slide("b8", -300, 0, 0.6);
      c.put(P.bubble({ w: 470, h: 180, tail: "left" }), 520, 360).pop("b8+0.3");
      c.box(590, 398, 330, 76, 14, "var(--main2)", "var(--ink)", 3).pop("b8@الدم");
      c.text("Blutentnahme", 755, 450, 40).pop("b8@الدم");
      c.text("أخذ الدم", 755, 508, 28, "ar").fade("b8@الدم+0.2");

      c.de("Was er verstand", 1016, 822, 30, "شنو فهم هو", "end").fade("b9");
      const bot = c.clipped(0, 780, W, 520);
      c.actor({ x: 250, y: 1720, scale: 0.3, body: "Doc", hair: "ShortVolumed", face: "Calm", seed: 12 }, bot)
        .slide("b9", -300, 0, 0.6).face("b9@Refobacin", "Smile");
      c.put(P.thought({ w: 540, h: 250 }), 470, 872).pop("b9+0.2");
      const boxes = [[510, 100, "Blut", "الدم", "b9@فهم", "var(--white)"], [650, 200, "Refobacin", "دوا ف العرق", "b9@يعطيه", "var(--accent2)"], [890, 100, "Blut", "الدم", "b9@Refobacin+0.3", "var(--white)"]];
      boxes.forEach(([x, w, de, ar, at, fill]) => {
        const b = c.box(x, 947, w, 70, 12, fill, "var(--ink)", 3).pop(at);
        c.text(de, x + w / 2, 994, 32).pop(at);
        c.text(ar, x + w / 2, 1052, 22, "ar").fade(at + "+0.15");
        if (de === "Refobacin") b.pulse("b9@Refobacin", 0.7, 0.14, 2);
      });
      c.text("→", 630, 994, 30, "de").fade("b9@يعطيه");
      c.text("→", 870, 994, 30, "de").fade("b9@Refobacin+0.3");
    } });

    /* 5 · La seringue posée --------------------------------------------- */
    st.scene({ from: "b10", in: "fade", inDur: 0.5, build(c) {
      room(c, { cabinet: false });
      c.camera([{ at: "b10", s: 1.35, cx: 860, cy: 980 }, { at: "b10@ظهرو", s: 1, cx: 540, cy: 960, d: 1.2 }]);
      const nurseG = c.group();
      nurseG.g.setAttribute("class", "nurse");
      c.actor({ x: 1260, y: 1300, scale: 0.205, body: "DocProtectiveClothe", hair: "Bun", face: "Calm", flip: true, seed: 13 }, nurseG.g)
        .walk("b10", 985, 1.5).face("b11", "Explaining").talk("b11", "b11@end").face("b11@end", "Calm")
        .turn("b11@end+0.3", false).walk("b11@end+0.4", 1320, 1.4);
      c.put(P.bedsideCabinet({}), 790, 1290, 0.9);
      c.put(P.syringe(MILKY), 838, 1006, 0.27).slide("b10@حطات", 0, -60, 0.45);
      c.actor({ x: 680, y: 1318, scale: 0.21, body: "Doc", hair: "ShortVolumed", face: "Serious", flip: true, seed: 7 });
      c.de("kein Blickkontakt", 470, 640, 32, "ما تشافوش").pop("b10@ظهرو").hide("b11", 0.25);
      c.put(`<path d="M600 652 Q 650 662 668 742" fill="none" stroke="var(--accent)" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 12"/>`).wipe("b10@ظهرو+0.2", 0.5, "down").hide("b11", 0.25);
      c.put(P.bubble({ w: 500, h: 190, tail: "right" }), 520, 470).pop("b11");
      c.write(c.text("Hier ist das orale", 770, 548, 40), "b11", 0.6);
      c.write(c.text("Antibiotikum.", 770, 596, 40), "b11+0.6", 0.5);
      c.text("ها هو المضاد الحيوي ديال الفم", 770, 640, 26, "ar").fade("b11+0.9");
      c.put(P.tag({ text: "laut Urteil", kind: "main" }), 640, 440, 0.9).pop("b11+0.2");
      c.text("حسب الحكم", 755, 448, 24, "ar", "end").fade("b11+0.3");
    } });

    /* 6a · Il prend la seringue ----------------------------------------- */
    st.scene({ from: "b12", in: "cut", inDur: 0, build(c) {
      room(c);
      c.camera([{ at: "b12", s: 2.3, cx: 880, cy: 1000 }, { at: "b12+0.1", s: 2.6, cx: 880, cy: 985, d: 3.5, ease: "lin" }]);
      c.put(`<ellipse cx="910" cy="1006" rx="92" ry="32" fill="none" stroke="var(--accent)" stroke-width="5"/>`).wipe("b12@شافها", 0.4).hide("b12@خاطرو", 0.3);
      c.put(P.syringe(MILKY), 838, 1006, 0.27).pulse("b12@شافها", 0.7, 0.1, 2)
        .move("b12@خاطرو", 0, -110, 0.9).rotateTo("b12@خاطرو", -12, 0.9);
      c.put(P.thought({ w: 380, h: 170 }), 80, 330, 1, 0, c.hud).pop("b12@خاطرو");
      c.text("Refobacin?", 270, 432, 50, "de", "middle", c.hud).pop("b12@خاطرو+0.1");
      c.put(P.tag({ text: "Rekonstruktion", kind: "accent" }), 250, 300, 0.85, 0, c.hud).fade("b12@خاطرو");
      c.text("مشهد تمثيلي", 400, 308, 24, "ar", "end", c.hud).fade("b12@خاطرو");
    } });

    /* 6b · STOP : l'image se fige, plan subjectif ------------------------ */
    st.scene({ from: "b13", in: "cut", inDur: 0, build(c) {
      const bg = c.group(); bg.g.setAttribute("class", "faded");
      room(c, { parent: bg.g, bare: true, noPeople: true });
      c.camera([{ at: "b13", s: 1, cx: 540, cy: 960 }, { at: "b13+0.3", s: 1.06, cx: 560, cy: 940, d: 5, ease: "lin" }]);
      c.put(P.syringe(MILKY), 140, 900, 1.5, -10).slide("b13", 0, 600, 0.55).float(6, 3);
      c.put(`<ellipse cx="314" cy="869" rx="128" ry="84" fill="none" stroke="var(--accent)" stroke-width="7" transform="rotate(-10 314 869)"/>`).wipe("b13@بلاصتو", 0.45).pulse("b13@شنو", 0.9, 0.08, 3);
      c.put(`<rect x="24" y="24" width="1032" height="1872" rx="34" fill="none" stroke="var(--accent)" stroke-width="18"/>`, 0, 0, 1, 0, c.hud).fade("b13", 0.15);
      c.put(P.stamp({ text: "STOP", rot: 8 }), 800, 470, 1.5, 0, c.hud).slam("b13+0.05");
      c.put(P.thought({ w: 360, h: 160 }), 70, 300, 1, 0, c.hud).pop("b13+0.4");
      c.text("Refobacin?", 250, 400, 50, "de", "middle", c.hud).pop("b13+0.5");
      c.de("Du bist dran.", 800, 622, 40, "دابا نتا لي ف بلاصتو", "middle", c.hud).fade("b13@بلاصتو");
      const card = (y, letter, word, ar, fill, cls, at) => {
        const g = c.group(c.hud);
        Stage.el("rect", { x: 650, y, width: 340, height: 150, rx: 22, fill, stroke: "var(--ink)", "stroke-width": 4 }, g.g);
        const t1 = Stage.el("text", { x: 700, y: y + 100, "font-size": 74, "text-anchor": "middle", class: "de " + cls }, g.g); t1.textContent = letter;
        const t2 = Stage.el("text", { x: 850, y: y + 72, "font-size": 40, "text-anchor": "middle", class: "de " + cls }, g.g); t2.textContent = word;
        const t3 = Stage.el("text", { x: 850, y: y + 120, "font-size": 32, "text-anchor": "middle", class: "ar " + cls }, g.g); t3.textContent = ar;
        g.slide(at, 420, 0, 0.5, "back");
      };
      card(930, "A", "Spritzen", "ينجيكتيها", "var(--white)", "", "b13@شنو");
      card(1105, "B", "Nachfragen", "يسول", "var(--main)", "on-main", "b13@شنو+0.3");
    } });
    st.flash("b13", 0.35, 0.95);

    /* 7 · Le geste : injection ------------------------------------------ */
    st.scene({ from: "b14", in: "zoom", inDur: 0.5, build(c) {
      c.put(`<circle cx="560" cy="880" r="520" fill="var(--main2)" fill-opacity=".45"/>`);
      c.camera([{ at: "b14", s: 1.05, cx: 540, cy: 860 }, { at: "b14@دفعها", s: 1.25, cx: 560, cy: 840, d: 2 }, { at: "b15", s: 1, cx: 540, cy: 960, d: 0.9 }]);
      const a = T("b14@دفعها"), b = Math.max(a + 1.2, T("b14@end"));
      const X = 300, Y = 820, K = 1.25;
      const push = (t) => Math.round(E.inOut(prog(t, a, b - a)) * 60) / 60;
      // cathéter (part vers la gauche, vers le Bébé) puis seringue branchée dessus
      c.put(P.catheterLine({ len: 520 }), X + 12, Y, -1);
      c.de("Broviac-Katheter", 160, 800, 34, "قسطرة مركزية", "middle", c.hud).fade("b14@Katheter");
      c.dyn((t) => P.syringe({ liquid: "milky", fill: 0.85, push: push(t), label: "?", tip: "none" }), X, Y, K);
      // flèche qui pousse le piston
      c.put(`<path d="M0 0 h70 M0 0 l22 -18 M0 0 l22 18" stroke="var(--accent)" stroke-width="10" stroke-linecap="round" fill="none"/>`)
        .on((t, st) => { const stop = 48 + 200 * 0.85 * (1 - push(t)); st.x += X + K * (stop + 300); st.y += Y; st.o *= t >= a - 0.2 && t < b + 0.4 ? 1 : 0; });
      // gouttes blanches qui partent dans le cathéter
      const path = P.catheterPath({ len: 520 }).points.map(([x, y]) => [X + 12 - x, Y - y]);
      path.unshift([X - 4, Y]);
      for (let i = 0; i < 14; i++) {
        c.put(`<circle cx="0" cy="0" r="10" fill="#fff" stroke="var(--ink)" stroke-width="3"/>`).on((t, s) => {
          const q = prog(t, a + i * 0.14, 2.6);
          s.o *= q > 0 && q < 1 ? 1 : 0;
          const [x, y] = along(path, E.inOut(q)); s.x += x; s.y += y;
        });
      }
      c.de("oral", 330, 1180, 56, "ديال الفم").pop("b15@الفم");
      c.text("≠", 540, 1190, 84, "de accent").pop("b15@الفم+0.2");
      c.de("i.v.", 750, 1180, 56, "ف العرق").pop("b15@الفم+0.35");
    } });

    /* 8 · Le moniteur, l'horloge ---------------------------------------- */
    st.scene({ from: "b16", in: "cut", inDur: 0, build(c) {
      const alarm = T("b16@زرق"), flat = T("b17@بقاش"), r0 = T("b17");
      c.camera([{ at: "b16", s: 1.12, cx: 540, cy: 860 }, { at: "b16@زرق", s: 1, cx: 540, cy: 900, d: 0.5 }]);
      c.dyn((t) => {
        const ecg = t >= flat ? "flat" : t >= alarm ? "alarm" : "normal";
        const hr = t >= flat ? "0" : t >= alarm ? String(Math.round(lerp(142, 198, prog(t, alarm, 1.5)))) : "142";
        return P.monitor({ ecg, t: Math.round(((t * 0.55) % 1) * 30) / 30, hr, stand: true });
      }, 540, 1080, 2.1);
      const time = (t) => { const m = Math.round(lerp(8 * 60 + 46, 12 * 60 + 28, E.inOut(prog(t, r0, Math.max(1, flat - r0))))); return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`; };
      c.dyn((t) => P.wallClock({ time: time(t), r: 70 }), 300, 340, 1);
      const dig = c.text("08:46", 420, 362, 64, "de", "start");
      dig.on((t) => { const s = time(t); if (dig.textEl.textContent !== s) dig.textEl.textContent = s; });
      c.de("Reanimation", 540, 1160, 46, "الإنعاش").pop("b17@Reanimation");
      c.shake("b16@زرق", 9, 0.6);
      // tout s'efface après « و ما بقاش »
      c.put(`<rect x="0" y="0" width="1080" height="1920" fill="var(--paper)"/>`, 0, 0, 1, 0, c.hud).on((t, s) => { s.o *= E.inOut(prog(t, flat + 0.5, 1.3)); });
    } });
    st.vignette("b16@زرق", 2.4, 3);

    /* 9 · Le lendemain --------------------------------------------------- */
    st.scene({ from: "b18", in: "fade", inDur: 0.6, build(c) {
      c.put(P.calendarPage({ date: "23.08.2011" }), 540, 400, 0.9).pop("b18", 0.6);
      c.text("النهار لي من موراه", 540, 590, 32, "ar").fade("b18+0.3");
      c.put(P.syringe({ liquid: "none", fill: 0, label: null, tip: "none" }), 120, 760, 0.85).fade("b18+0.3");
      c.de("passt in den Katheter", 600, 750, 30, "كتدخل ف القسطرة", "start").fade("b18+0.4");
      c.put(`<path d="M96 690 L590 830 M96 830 L590 690" stroke="var(--accent)" stroke-width="10" stroke-linecap="round" fill="none"/>`).wipe("b18@بدل", 0.45);
      c.put(P.oralSyringe({}), 120, 990, 0.85).slide("b18@الفم", -700, 0, 0.6);
      c.de("passt nicht in den Katheter", 600, 980, 30, "ما كتدخلش ف القسطرة", "start").fade("b18@الفم+0.3");
      c.put(`<path d="M600 1080 l26 26 l52 -60" stroke="var(--main)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`).wipe("b18@كاملين", 0.4);
      c.de("Oralspritze", 700, 1100, 34, "حقنة ديال الفم", "start").fade("b18@كاملين+0.1");
    } });

    /* 10 · Le tribunal --------------------------------------------------- */
    st.scene({ from: "b19", in: "wipe", inDur: 0.6, build(c) {
      c.put(P.courtBackdrop({ w: W, h: 1920, floorY: 1280, panelTop: 640 }));
      c.camera([{ at: "b19", s: 1, cx: 540, cy: 960 }, { at: "b21", s: 1.08, cx: 540, cy: 930, d: 1.2 }]);
      c.actor({ x: 540, y: 1160, scale: 0.4, body: "Turtleneck", hair: "GrayShort", face: "Serious", accessory: "GlassRound", seed: 21 })
        .talk("b21", "b21@end");
      c.put(P.judgeBench({ w: 760, h: 360, label: "Landgericht Bielefeld" }), 160, 1290);
      const strike = T("b19@fahrlässige");
      c.dyn((t) => P.gavel({ angle: t < strike - 0.5 ? 0 : t < strike ? 30 * E.out(prog(t, strike - 0.5, 0.35)) : 30 * (1 - E.in(prog(t, strike, 0.12))) }), 830, 930, 0.55);
      c.shake(strike + 0.12, 12, 0.4);
      st.flash(strike + 0.12, 0.25, 0.5);
      c.put(P.stamp({ text: "fahrlässige Tötung", sub: "AG Bielefeld · 2012" }), 540, 420, 0.8, 0, c.hud).slam(strike + 0.1, 0.3, 0).hide("b20", 0.3);
      c.text("القتل غير العمدي · المحكمة الابتدائية", 540, 545, 30, "ar", "middle", c.hud).fade(strike + 0.5).hide("b20", 0.3);
      c.put(P.tag({ text: "Berufung · LG 2013", kind: "main", size: 32 }), 540, 330, 1, 0, c.hud).pop("b20").hide("b21", 0.3);
      c.text("الاستئناف · 2013", 540, 392, 28, "ar", "middle", c.hud).fade("b20+0.2").hide("b21", 0.3);
      c.put(P.tag({ text: "Organisationsmitverantwortung", kind: "accent", size: 30 }), 540, 470, 1, 0, c.hud).pop("b20@نصيب").hide("b21", 0.3);
      c.text("السبيطار حتى هو مسؤول", 540, 532, 28, "ar", "middle", c.hud).fade("b20@نصيب+0.2").hide("b21", 0.3);
      // la citation
      c.box(64, 354, 952, 300, 26, "var(--white)", "var(--ink)", 4, c.hud).pop("b21", 0.45);
      c.put(P.tag({ text: "Zitat Gericht", kind: "ink" }), 230, 354, 0.9, 0, c.hud).pop("b21+0.1");
      c.text("كلام المحكمة", 992, 396, 24, "ar", "start", c.hud).fade("b21+0.2");
      const d = T("b21@end") - T("b21");
      c.write(c.text("„Da hätte der Angeklagte", 540, 444, 52, "de", "middle", c.hud), "b21", d * 0.42);
      const hl = c.put(`<rect x="0" y="0" width="1" height="52" rx="10" fill="var(--accent2)"/>`, 0, 0, 1, 0, c.hud);
      const l2a = c.text("zumindest", 0, 524, 52, "de", "start", c.hud), l2b = c.text("nachfragen", 0, 524, 52, "de", "start", c.hud);
      c.write(l2a, `b21+${(d * 0.42).toFixed(2)}`, d * 0.18); c.write(l2b, `b21+${(d * 0.6).toFixed(2)}`, d * 0.2);
      c.write(c.text("müssen.“", 540, 599, 52, "de", "middle", c.hud), `b21+${(d * 0.8).toFixed(2)}`, d * 0.2);
      c.text("كان خاص المتهم على الأقل يسول", 540, 638, 28, "ar", "middle", c.hud).fade("b21@end");
      let laid = false;
      c.tick(() => {
        if (laid) return; laid = true;
        // mise en page de la 2e ligne (mesure du texte complet)
        const keep = [l2a.textEl.textContent, l2b.textEl.textContent];
        l2a.textEl.textContent = "zumindest"; l2b.textEl.textContent = "nachfragen";
        const w1 = l2a.textEl.getComputedTextLength() + 18, w2 = l2b.textEl.getComputedTextLength(), x0 = 540 - (w1 + w2) / 2;
        l2a.textEl.setAttribute("x", x0); l2b.textEl.setAttribute("x", x0 + w1);
        l2a.textEl.textContent = keep[0]; l2b.textEl.textContent = keep[1];
        hl.g.firstChild.setAttribute("transform", `translate(${x0 + w1 - 8} 485)`);
        hl.g.firstChild.firstChild.setAttribute("width", w2 + 16);
      });
      hl.wipe("b21@nachfragen", 0.5);
    } });

    /* 10b · Les parents quittent la salle -------------------------------- */
    st.scene({ from: "b22@الواليدين", in: "fade", inDur: 0.5, build(c) {
      c.put(P.courtBackdrop({ w: W, h: 1920, floorY: 1280, panelTop: 640 }));
      c.put(P.courtChairs({ n: 3 }), 60, 1290, 1);
      c.put(P.courtDoor({ label: "Saal 1" }), 620, 1290, 0.9);
      const go = T("b22@الواليدين") + 0.2;
      c.actor({ x: 330, y: 1305, scale: 0.2, body: "WalkingBW", hair: "Short", cls: "sil", seed: 31 }).walk(go, 820, 2.4).hide(go + 2.3, 0.5);
      c.actor({ x: 170, y: 1300, scale: 0.19, body: "WalkingWB", hair: "Long", cls: "sil", seed: 32 }).walk(go + 0.35, 760, 2.4).hide(go + 2.6, 0.5);
      c.de("Anwalt der Eltern:", 540, 290, 30, "محامي الوالدين", "middle", c.hud).fade("b22@باغيين-0.3");
      c.text("„Sie hätten sich eine", 540, 390, 46, "de", "middle", c.hud).fade("b22@باغيين");
      c.text("Freiheitsstrafe gewünscht.“", 540, 446, 46, "de", "middle", c.hud).fade("b22@باغيين+0.15");
      c.text("كانو باغيين الحبس", 540, 496, 30, "ar", "middle", c.hud).fade("b22@باغيين+0.3");
    } });

    /* 11 · L'Approbation, et le casier ------------------------------------ */
    st.scene({ from: "b23", in: "slideLeft", inDur: 0.55, build(c) {
      c.actor({ x: 270, y: 1290, scale: 0.23, body: "Doc", hair: "ShortVolumed", face: "Solemn", seed: 41 });
      c.box(520, 380, 500, 200, 24).pop("b23@خداها");
      c.de("Approbation · 01/2013", 550, 455, 40, "رخصة الطب · خداها", "start").pop("b23@خداها");
      c.put(`<path d="M940 520 l22 22 l44 -52" stroke="var(--main)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`).wipe("b23@خداها+0.3", 0.4);
      c.box(520, 650, 500, 240, 24, "var(--white)", "var(--accent)", 6).pop("b23@مسجل");
      c.de("Bundeszentralregister", 550, 725, 40, "السجل العدلي", "start").pop("b23@مسجل");
      c.de("fahrlässige Tötung", 550, 830, 32, "القتل غير العمدي", "start").fade("b23@مسجل+0.3");
    } });

    /* 12 · La règle ------------------------------------------------------- */
    st.scene({ from: "b24", in: "fade", inDur: 0.5, build(c) {
      corner(c, "Die Regel", "القاعدة", "b24");
      ["Was", "ist", "da", "drin?"].forEach((w, i) => {
        const at = `b24@${w.replace("?", "")}`;
        c.box(70 + i * 240, 330, 220, 110, 18, i === 3 ? "var(--main)" : "var(--white)").pop(at);
        c.text(w, 180 + i * 240, 405, 56, "de" + (i === 3 ? " on-main" : "")).pop(at);
      });
      c.text("شنو كاين فيها؟", 540, 495, 38, "ar strong").fade("b24@drin+0.3");
      const lab = T("b24@drin");
      c.dyn((t) => P.syringe({ liquid: "milky", fill: 0.85, label: t >= lab ? "ORAL" : "?", tip: "stopper" }), 270, 600, 1).fade("b24", 0.4);
      c.de("Cotrim-K Saft · oral", 540, 690, 28, "شراب ديال الفم").fade("b24@drin+0.4");
      c.box(70, 760, 940, 520, 28).slide("b25", 0, 260, 0.6);
      c.text("القاعدة", 540, 850, 62, "ar strong").fade("b25+0.2");
      [["1", "Selbst aufgezogen?", "عمرتيها بيدك؟", "b25@عمرتيهاش"], ["2", "Beschriftet?", "مكتوب عليها؟", "b25@مكتوب"], ["3", "i.v. oder oral?", "للعرق ولا للفم؟", "b25@تدخلهاش"]].forEach(([n, d, a, at], i) => {
        const y = 935 + i * 88;
        c.put(`<circle cx="145" cy="${y - 14}" r="30" fill="var(--main)" stroke="var(--ink)" stroke-width="4"/>`).pop(at);
        c.text(n, 145, y, 36, "de on-main").pop(at);
        c.text(d, 200, y, 44, "de", "start").slide(at, 40, 0, 0.4);
        c.text(a, 975, y, 32, "ar", "start").fade(at + "+0.15");
      });
      c.box(110, 1160, 860, 100, 16, "var(--accent2)", "none", 0).wipe("b25@سول", 0.5);
      c.text("Nein? → nicht spritzen. Nachfragen.", 540, 1202, 38).fade("b25@سول+0.1");
      c.text("لا؟ ← ما تنجيكتيهاش. سول.", 540, 1244, 26, "ar").fade("b25@سول+0.25");
    } });

    /* 13 · Fin ------------------------------------------------------------ */
    st.scene({ from: "b26", in: "fade", inDur: 0.6, build(c) {
      c.put(P.tag({ text: "@dr.aguilo", kind: "main", size: 30 }), 540, 280, 1).pop("b26");
      const nurseG = c.group(); nurseG.g.setAttribute("class", "nurse");
      c.actor({ x: 260, y: 860, scale: 0.16, body: "DocProtectiveClothe", hair: "Bun", face: "Smile", seed: 51 }, nurseG.g).slide("b26", 0, 60, 0.6);
      c.actor({ x: 540, y: 860, scale: 0.16, body: "CrossedArmsWB", hair: "Long", face: "Calm", seed: 52 }).slide("b26+0.15", 0, 60, 0.6);
      c.actor({ x: 820, y: 860, scale: 0.16, body: "Doc", hair: "ShortVolumed", face: "Calm", flip: true, seed: 53 }).slide("b26+0.3", 0, 60, 0.6);
      c.text("Fragen ist erlaubt.", 540, 950, 64).pop("b26@السؤال");
      c.text("السؤال ماشي عيب", 540, 1012, 40, "ar strong").fade("b26@السؤال+0.2");
      c.dyn(() => P.akteFolder({ title: "AKTE 02", sub: "bald · قريبا", open: 0 }), 540, 1140, 0.38).slide("b27", 0, 500, 0.7, "back");
      c.text("Quelle: AG Bielefeld 22.10.2012 · LG Bielefeld 14.08.2013 (rechtskräftig)", 540, 1274, 19, "de light").fade("b27+0.4");
      c.text("Namen anonymisiert · Szenen nachgestellt · Keine Rechtsberatung", 540, 1298, 19, "de light").fade("b27+0.5");
    } });

    st.finish();
  };
})();
