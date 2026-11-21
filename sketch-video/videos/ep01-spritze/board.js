/* AKTE 01 — Die weiße Spritze : l'affiche-histoire (thème de la vidéo de référence).
 * Une seule grande affiche 1080×1920 en 15 cases (lecture de droite à gauche, rangée par rangée).
 * La caméra zoome sur chaque case au rythme de la voix, fait des zooms de détail, puis recule à la fin
 * pour montrer toute l'affiche (qui sert aussi de couverture). Une case = une idée, en grand.
 */
(function () {
  "use strict";
  const P = Props, U = SketchUI;
  const has = (f) => typeof P[f] === "function";
  const COLS = [728, 372, 16], ROWS = [118, 472, 826, 1180, 1534], PW = 336, PH = 344;
  const pan = (n) => ({ x: COLS[(n - 1) % 3], y: ROWS[Math.floor((n - 1) / 3)], w: PW, h: PH });
  const MILKY = { liquid: "milky", fill: 0.85, label: "?", tip: "stopper" };

  window.SV_BUILD = (sv) => {
    const st = Stage.create(sv), T = (x) => st.T(x), E = Stage.E, prog = Stage.prog, lerp = Stage.lerp;
    st.scene({ from: 0, in: "cut", inDur: 0, build(c) {
      const A = (n, dx, dy) => { const p = pan(n); return [p.x + dx, p.y + dy]; };
      const cam = [];
      const focus = (n, at, o = {}) => { const f = U.frame(o.box || pan(n), o); cam.push(Object.assign({ at, d: o.d || 0.9 }, f)); };
      const detail = (box, at, o = {}) => focus(0, at, Object.assign({ box, max: 4.2 }, o));
      const put = (m, n, dx, dy, s = 1, r = 0, parent) => { const [x, y] = A(n, dx, dy); return c.put(m, x, y, s, r, parent); };
      const actor = (n, dx, dy, o, parent) => { const [x, y] = A(n, dx, dy); return c.actor(Object.assign({ x, y }, o), parent); };
      const title = (n, text, dx, dy, size = 40, cls = "ttl") => { const [x, y] = A(n, dx, dy); return U.title(c, text, x, y, size, cls); };
      const chip = (n, de, ar, dx, dy, size = 22, kind) => { const [x, y] = A(n, dx, dy); return U.chip(c, de, ar, x, y, size, kind); };
      const ar = (n, text, dx, dy, size = 16, cls = "ar") => { const [x, y] = A(n, dx, dy); return c.text(text, x, y, size, cls); };
      const de = (n, text, dx, dy, size = 24, gl, anchor = "middle") => { const [x, y] = A(n, dx, dy); return c.de(text, x, y, size, gl, anchor); };

      U.dots(c);
      // bandeau de titre (visible au dézoom final)
      U.ribbon(c, "AKTE 01 · الحقنة البيضا", 540, 62, 560, 38).wipe("b24@comments", 0.8, "rtl");
      U.chip(c, "@dr.aguilo", null, 120, 62, 22, "main").pop("b24@comments+0.3");
      U.chip(c, "AKTE 02 · قريبا", null, 948, 62, 20).pop("b24@comments+0.5");
      const FIRST = { 1: 0, 2: "b2", 3: "b3", 4: "b5", 5: "b6", 6: "b7", 7: "b9", 8: "b11", 9: "b13", 10: "b14", 11: "b15@Intensivstation", 12: "b17", 13: "b18", 14: "b20", 15: "b22" };
      for (let n = 1; n <= 15; n++) {
        const p = pan(n);
        U.panel(c, p.x, p.y, p.w, p.h, n).fade(n === 1 ? 0 : `${FIRST[n]}-0.45`, 0.4);
      }

      /* 1 · condamné ------------------------------------------------------------ */
      focus(1, 0, { d: 0.001 });
      put(P.stamp({ text: "SCHULDIG", sub: "fahrlässige Tötung", rot: -5 }), 1, 168, 54, 0.4).slam("b1@تحكم", 0.3, 10);
      ar(1, "مُدان · القتل غير العمدي", 168, 104, 17).fade("b1@تحكم+0.4");
      actor(1, 168, 326, { scale: 0.066, body: "Doc", hair: "ShortVolumed", face: "Solemn", seed: 101 }).fade(0.1, 0.5);
      put(P.dock({ w: 260, h: 104 }), 1, 38, 334, 1).slide(0.2, 0, 60, 0.6);
      chip(1, "Anklagebank", null, 168, 262, 16).fade("b1@ألمانيا");
      ar(1, "كرسي المتهم", 168, 312, 17, "ar on-main").fade("b1@ألمانيا+0.2");

      /* 2 · le risque : la prison ----------------------------------------------- */
      focus(2, "b2");
      title(2, "حتى 5 سنين ف الحبس", 168, 50, 28).wipe("b2", 0.6, "rtl");
      put(P.prisonBars({ w: 236, h: 214, part: "back" }), 2, 50, 300, 1).fade("b2+0.1");
      actor(2, 168, 300, { scale: 0.066, body: "Doc", hair: "ShortVolumed", face: "Fear", seed: 102 }).fade("b2+0.15");
      put(P.prisonBars({ w: 236, h: 214, part: "front" }), 2, 50, 300, 1).wipe("b2@للحبس", 0.6, "down");
      chip(2, "§ 222 StGB · bis zu 5 Jahre", null, 168, 324, 17, "accent").pop("b2@خمس");

      /* 3 · la seringue, l'énigme ----------------------------------------------- */
      focus(3, "b3");
      U.ribbon(c, "و السبب؟", ...A(3, 168, 52), 200, 30).wipe("b3", 0.5, "rtl");
      put(P.syringe(MILKY), 3, 38, 160, 0.5, -6).slide("b3@Spritze", 300, 0, 0.6).float(3, 3);
      detail({ x: pan(3).x + 20, y: pan(3).y + 95, w: 300, h: 120 }, "b3@بيضا", { d: 0.8 });
      U.circle(c, ...A(3, 98, 155), 88, 56).wipe("b3@مكتوب", 0.5);
      focus(3, "b4", { d: 0.8 });
      for (let i = 0; i < 4; i++) {
        const [x, y] = A(3, 34 + i * 70, 236);
        c.box(x, y, 60, 50, 10).pop(`b4@أربع+${(i * 0.12).toFixed(2)}`);
        c.text("?", x + 30, y + 38, 34, "de accent").pop(`b4@أربع+${(i * 0.12 + 0.08).toFixed(2)}`);
      }
      ar(3, "أربع كلمات… ف اللخر", 168, 318, 17).fade("b4@كلمات");

      /* 4 · Bielefeld, le Bébé ------------------------------------------------- */
      focus(4, "b5");
      U.ribbon(c, "Bielefeld · 2011", ...A(4, 168, 50), 230, 26, "de").wipe("b5", 0.5);
      put(P.hospitalBed({ w: 300 }), 4, 18, 322, 0.62).fade("b5+0.1");
      actor(4, 150, 330, { scale: 0.068, body: "CrossedLegs", hair: "Long", cls: "sil", seed: 104 }).fade("b5+0.2");
      put(P.baby({ pose: "held", state: "normal", eyes: "closed", line: false, ecg: false }), 4, 166, 250, 0.32).pop("b5@Bébé");
      chip(4, "10 Monate", "عشرة د الشهور", 262, 104, 17).pop("b5@عشرة");
      chip(4, "Leukämie", "سرطان الدم", 262, 176, 17, "accent").pop("b5@سرطان");

      /* 5 · l'étudiant arrive --------------------------------------------------- */
      focus(5, "b6");
      U.ribbon(c, "الطالب", ...A(5, 168, 50), 160, 30).wipe("b6", 0.5, "rtl");
      actor(5, -40, 330, { scale: 0.072, body: "Doc", hair: "ShortVolumed", face: "Calm", seed: 105 }).walk("b6", pan(5).x + 110, 1.6);
      chip(5, "PJ · 29 Jahre", "آخر عام ف الطب", 250, 130, 18).pop("b6@طالب");
      chip(5, "1 Woche", "عاد سيمانة", 250, 220, 18, "accent").pop("b6@سيمانة");

      /* 6 · le malentendu ------------------------------------------------------- */
      focus(6, "b7");
      const p6 = pan(6);
      c.put(`<path d="M${p6.x + 14} ${p6.y + 176} H${p6.x + 322}" stroke="var(--ink)" stroke-width="2.5" stroke-dasharray="8 7"/>`).wipe("b7", 0.5);
      const top6 = c.clipped(p6.x + 4, p6.y + 6, 328, 166), bot6 = c.clipped(p6.x + 4, p6.y + 180, 328, 160);
      top6.setAttribute("class", "nurse");
      actor(6, 70, 252, { scale: 0.075, body: "DocProtectiveClothe", hair: "Bun", face: "Explaining", seed: 106 }, top6).talk("b7", "b7@end").fade("b7");
      put(P.bubble({ w: 170, h: 74, tail: "left" }), 6, 140, 36, 1).pop("b7+0.2");
      de(6, "Blutentnahme", 225, 72, 20, "أخذ الدم").pop("b7@الدم");
      actor(6, 70, 408, { scale: 0.075, body: "Doc", hair: "ShortVolumed", face: "Calm", seed: 107 }, bot6).fade("b8").face("b8@Refobacin", "Smile");
      put(P.thought({ w: 220, h: 104 }), 6, 108, 192, 1).pop("b8+0.2");
      de(6, "Blut", 150, 236, 19, "الدم").pop("b8@فهم");
      c.text("+", ...A(6, 184, 236), 22, "de").pop("b8@يعطيه");
      de(6, "Refobacin", 246, 236, 19, "دوا ف العرق").pop("b8@يعطيه");
      U.circle(c, ...A(6, 246, 229), 104, 32).wipe("b8@Refobacin", 0.4);

      /* 7 · la seringue posée -------------------------------------------------- */
      focus(7, "b9");
      const nurse7 = c.group(); nurse7.g.setAttribute("class", "nurse");
      actor(7, 400, 330, { scale: 0.07, body: "DocProtectiveClothe", hair: "Bun", face: "Calm", flip: true, seed: 108 }, nurse7.g)
        .walk("b9", pan(7).x + 278, 1.3).face("b10", "Explaining").talk("b10", "b10@end");
      put(P.bedsideCabinet({}), 7, 150, 330, 0.36);
      put(P.syringe(MILKY), 7, 162, 218, 0.11).slide("b9@حطات", 0, -30, 0.4);
      actor(7, 70, 334, { scale: 0.072, body: "Doc", hair: "ShortVolumed", face: "Serious", flip: true, seed: 109 });
      de(7, "kein Blickkontakt", 120, 70, 17, "ما تشافوش").pop("b9@ظهرو").hide("b10", 0.3);
      put(P.bubble({ w: 250, h: 128, tail: "right" }), 7, 76, 10, 1).pop("b10");
      c.text("Hier ist das orale", ...A(7, 201, 48), 18, "de").pop("b10+0.1");
      c.text("Antibiotikum.", ...A(7, 201, 72), 18, "de").pop("b10+0.2");
      c.text("ها هو المضاد الحيوي ديال الفم", ...A(7, 201, 100), 14, "ar").fade("b10+0.3");
      c.text("laut Urteil", ...A(7, 160, 124), 14, "de accent").fade("b10+0.4");
      c.text("حسب الحكم", ...A(7, 248, 124), 13, "ar").fade("b10+0.45");
      detail({ x: pan(7).x + 70, y: pan(7).y + 6, w: 262, h: 190 }, "b10", { d: 0.6 });

      /* 8 · STOP ---------------------------------------------------------------- */
      focus(8, "b11");
      actor(8, 100, 334, { scale: 0.074, body: "Doc", hair: "ShortVolumed", face: "Serious", seed: 110 }).face("b12", "Concerned");
      put(P.thought({ w: 160, h: 74 }), 8, 18, 30, 1).pop("b11@خاطرو");
      c.text("Refobacin?", ...A(8, 98, 76), 21, "de").pop("b11@خاطرو+0.1");
      put(P.syringe(MILKY), 8, 150, 172, 0.2, -10).slide("b11@شافها", 0, 50, 0.4);
      put(P.stamp({ text: "STOP", rot: 8 }), 8, 262, 66, 0.48).slam("b12", 0.28, 12);
      st.flash("b12", 0.3, 0.8);
      chip(8, "A · Spritzen", "ينجيكتيها", 250, 226, 17).slide("b12@شنو", 120, 0, 0.4, "back");
      chip(8, "B · Nachfragen", "يسول", 250, 292, 17, "main").slide("b12@شنو+0.3", 120, 0, 0.4, "back");

      /* 9 · l'injection, dans la chambre ---------------------------------------- */
      focus(9, "b13");
      actor(9, 272, 334, { scale: 0.074, body: "Doc", hair: "ShortVolumed", face: "Serious", flip: true, seed: 111 });
      put(P.crib({ w: 300, part: "back", rail: 0 }), 9, 10, 332, 0.55);
      put(P.baby({ pose: "lying", state: "normal", eyes: "closed" }), 9, 92, 237, 0.45);
      put(P.crib({ w: 300, part: "front", rail: 0 }), 9, 10, 332, 0.55);
      const a9 = T("b13@دفعها");
      c.dyn((t) => P.syringe({ liquid: "milky", fill: 0.85, push: Math.round(E.inOut(prog(t, a9, 1.2)) * 40) / 40, label: "?", tip: "none" }), ...A(9, 206, 214), 0.2);
      const line = [A(9, 206, 214), A(9, 184, 210), A(9, 160, 202), A(9, 138, 198)];
      c.put(`<path d="M${line.map((p) => p.join(" ")).join(" L")}" fill="none" stroke="var(--ink)" stroke-width="2.4"/>`);
      for (let i = 0; i < 8; i++) c.put(`<circle r="4" fill="#fff" stroke="var(--ink)" stroke-width="1.6"/>`).on((t, s) => {
        const q = prog(t, a9 + i * 0.15, 1.3); s.o *= q > 0 && q < 1 ? 1 : 0;
        const k = q * (line.length - 1), j = Math.min(line.length - 2, Math.floor(k)), f = k - j;
        s.x += line[j][0] + (line[j + 1][0] - line[j][0]) * f; s.y += line[j][1] + (line[j + 1][1] - line[j][1]) * f;
      });
      detail({ x: pan(9).x + 40, y: pan(9).y + 150, w: 250, h: 140 }, "b13@دفعها-0.2", { d: 0.7 });
      focus(9, "b13@sirop", { d: 0.6 });
      chip(9, "oral ≠ i.v.", "ديال الفم ≠ ديال العرق", 168, 52, 22, "accent").pop("b13@الفم");

      /* 10 · le Bébé décompense ------------------------------------------------- */
      focus(10, "b14");
      const blue = T("b14@زرق");
      c.dyn((t) => P.monitor({ ecg: t >= blue ? "alarm" : "normal", t: Math.round(((t * 0.6) % 1) * 24) / 24, hr: t >= blue ? String(Math.round(lerp(142, 198, prog(t, blue, 1.4)))) : "142", stand: true }), ...A(10, 52, 336), 0.34);
      const nurse10 = c.group(); nurse10.g.setAttribute("class", "nurse");
      actor(10, 380, 330, { scale: 0.072, body: "DocProtectiveClothe", hair: "Bun", face: "Calm", flip: true, seed: 112 }, nurse10.g).walk("b14@الفرملية", pan(10).x + 292, 1.0).face(blue, "Fear");
      actor(10, 400, 330, { scale: 0.072, body: "Doc", hair: "GrayShort", face: "Serious", flip: true, seed: 113 }).walk("b15@جريين", pan(10).x + 236, 0.7);
      put(P.crib({ w: 300, part: "back", rail: 0 }), 10, 104, 334, 0.55);
      put(P.baby({ pose: "lying", state: "normal", eyes: "closed" }), 10, 186, 239, 0.45).hide(blue, 0.6);
      put(P.baby({ pose: "lying", state: "blue", eyes: "closed", mouth: "open" }), 10, 186, 239, 0.45).fade(blue, 0.6);
      put(P.crib({ w: 300, part: "front", rail: 0 }), 10, 104, 334, 0.55);
      title(10, "08:46 · Alarm!", 168, 56, 30, "de accent").pop("b14@زرق");
      ar(10, "الـBébé ولى زرق", 168, 86, 17).fade("b14@زرق+0.3");
      detail({ x: pan(10).x + 100, y: pan(10).y + 150, w: 190, h: 130 }, "b14@زرق-0.2", { d: 0.6 });
      focus(10, "b15", { d: 0.6 });
      st.vignette("b14@زرق", 2.2, 3);
      c.shake("b15@جريين", 7, 0.5);

      /* 11 · réanimation ------------------------------------------------------- */
      focus(11, "b16");
      const r0 = T("b16"), flat = T("b16@بقاش");
      if (has("icuSign")) put(P.icuSign({ text: "K1 · Intensivstation" }), 11, 168, 50, 0.55).pop("b15@Intensivstation");
      else chip(11, "K1 · Intensivstation", "قسم الإنعاش", 168, 50, 20, "main").pop("b15@Intensivstation");
      const hm = (t) => { const m = Math.round(lerp(8 * 60 + 55, 12 * 60 + 28, E.inOut(prog(t, r0, Math.max(1, flat - r0))))); return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`; };
      c.dyn((t) => P.wallClock({ time: hm(t), r: 46 }), ...A(11, 84, 170), 1);
      const dg = de(11, "08:55", 84, 250, 30, null);
      dg.on((t) => { const s = hm(t); if (dg.textEl.textContent !== s) dg.textEl.textContent = s; });
      c.dyn((t) => P.monitor({ ecg: t >= flat ? "flat" : "alarm", t: Math.round(((t * 0.6) % 1) * 24) / 24, hr: t >= flat ? "0" : "184", stand: true }), ...A(11, 240, 300), 0.36);
      de(11, "Reanimation · 3,5 h", 168, 322, 18, "الإنعاش · 3 سوايع و نص").pop("b16@Reanimation");
      c.put(`<rect x="${pan(11).x + 6}" y="${pan(11).y + 6}" width="${PW - 12}" height="${PH - 12}" rx="14" fill="var(--paper)"/>`).on((t, s) => { s.o *= 0.82 * E.inOut(prog(t, flat + 0.4, 1.2)); });
      title(11, "12:28", 168, 190, 54, "de").fade(flat + 0.9, 0.8);

      /* 12 · le lendemain ------------------------------------------------------ */
      focus(12, "b17");
      put(P.calendarPage({ date: "23.08.2011" }), 12, 168, 80, 0.42).pop("b17");
      put(P.syringe({ liquid: "none", fill: 0, label: null, tip: "none" }), 12, 40, 176, 0.3).fade("b17+0.2");
      c.put(`<path d="M${pan(12).x + 30} ${pan(12).y + 156} L${pan(12).x + 205} ${pan(12).y + 198} M${pan(12).x + 30} ${pan(12).y + 198} L${pan(12).x + 205} ${pan(12).y + 156}" stroke="var(--accent)" stroke-width="7" stroke-linecap="round"/>`).wipe("b17@بدل", 0.4);
      put(P.oralSyringe({}), 12, 40, 262, 0.3).slide("b17@الفم", -200, 0, 0.5);
      de(12, "Oralspritze", 120, 306, 18, "حقنة ديال الفم").fade("b17@الفم+0.2");

      /* 13 · le tribunal ------------------------------------------------------- */
      focus(13, "b18");
      actor(13, 168, 318, { scale: 0.15, body: "Turtleneck", hair: "GrayShort", face: "Serious", accessory: "GlassRound", seed: 114 }).talk("b19", "b19@end");
      put(P.judgeBench({ w: 290, h: 120, label: "LG Bielefeld" }), 13, 23, 336);
      const strike = T("b18@fahrlässige");
      c.dyn((t) => P.gavel({ angle: t < strike - 0.4 ? 0 : t < strike ? 30 * E.out(prog(t, strike - 0.4, 0.3)) : 30 * (1 - E.in(prog(t, strike, 0.12))) }), ...A(13, 270, 216), 0.22);
      c.shake(strike + 0.12, 8, 0.35);
      chip(13, "fahrlässige Tötung · 2012", "القتل غير العمدي", 168, 46, 18, "accent").pop(strike).hide("b19", 0.25);
      put(`<rect x="0" y="0" width="300" height="118" rx="14" fill="var(--white)" stroke="var(--ink)" stroke-width="2.6"/>`, 13, 18, 22).pop("b19", 0.4);
      const q1 = de(13, "„Da hätte der Angeklagte", 168, 54, 18, null), q2 = de(13, "zumindest nachfragen", 168, 80, 18, null), q3 = de(13, "müssen.“", 168, 106, 18, null);
      const d19 = Math.max(1.5, T("b19@end") - T("b19"));
      c.write(q1, "b19", d19 * 0.4); c.write(q2, `b19+${(d19 * 0.4).toFixed(2)}`, d19 * 0.35); c.write(q3, `b19+${(d19 * 0.75).toFixed(2)}`, d19 * 0.2);
      U.underline(c, ...[A(13, 178, 86)[0], A(13, 262, 86)[0]], A(13, 0, 86)[1]).wipe("b19@nachfragen", 0.4);
      ar(13, "كان خاص المتهم على الأقل يسول", 168, 158, 16).fade("b19@end");
      detail({ x: pan(13).x + 10, y: pan(13).y + 14, w: 316, h: 160 }, "b19", { d: 0.6 });

      /* 14 · les parents, la licence ------------------------------------------- */
      focus(14, "b20");
      if (has("courtDoor")) put(P.courtDoor({ label: "Saal 1" }), 14, 14, 172, 0.2);
      actor(14, 200, 176, { scale: 0.05, body: "WalkingBW", hair: "Short", cls: "sil", flip: true, seed: 115 }).walk("b20@خرجو", pan(14).x + 70, 1.6).hide("b20@خرجو+1.5", 0.4);
      actor(14, 250, 176, { scale: 0.047, body: "WalkingWB", hair: "Long", cls: "sil", flip: true, seed: 116 }).walk("b20@خرجو+0.25", pan(14).x + 80, 1.6).hide("b20@خرجو+1.75", 0.4);
      ar(14, "كانو باغيين الحبس", 220, 56, 18, "ar strong").fade("b20@باغيين");
      c.put(`<path d="M${pan(14).x + 14} ${pan(14).y + 190} H${pan(14).x + 322}" stroke="var(--ink)" stroke-width="2" stroke-dasharray="7 7"/>`).wipe("b21", 0.4);
      chip(14, "Approbation ✓", "رخصة الطب · خداها", 168, 230, 20, "main").pop("b21@خداها");
      chip(14, "Bundeszentralregister", "مسجل ف السجل العدلي", 168, 296, 17, "accent").pop("b21@مسجل");

      /* 15 · la règle ---------------------------------------------------------- */
      focus(15, "b22");
      ["Was", "ist", "da", "drin?"].forEach((w, i) => {
        const at = `b22@${w.replace("?", "")}`, [x, y] = A(15, 20 + i * 76, 24);
        c.box(x, y, 68, 46, 10, i === 3 ? "var(--main)" : "var(--white)", "var(--ink)", 2.6).pop(at);
        c.text(w, x + 34, y + 33, 22, "de" + (i === 3 ? " on-main" : "")).pop(at);
      });
      ar(15, "شنو كاين فيها؟", 168, 98, 20, "ar strong").fade("b22@drin+0.2");
      [["Selbst aufgezogen?", "عمرتيها بيدك؟", "b23@عمرتيهاش"], ["Beschriftet?", "مكتوب عليها؟", "b23@مكتوب"], ["Nein? → nachfragen!", "لا؟ ← سول!", "b23@سول"]].forEach(([d, a, at], i) => {
        const [x, y] = A(15, 24, 140 + i * 52);
        c.put(`<circle cx="${x + 12}" cy="${y - 7}" r="11" fill="var(--main)" stroke="var(--ink)" stroke-width="2"/>`).pop(at);
        c.text(String(i + 1), x + 12, y, 14, "de on-main").pop(at);
        c.text(d, x + 30, y, 19, "de", "start").slide(at, 20, 0, 0.35);
        c.text(a, x + 30, y + 22, 15, "ar", "end").fade(at + "+0.15");
      });
      U.ribbon(c, "Fragen ist erlaubt.", ...A(15, 168, 300), 250, 22, "de").wipe("b24@السؤال", 0.5);
      ar(15, "السؤال عمرو ما كان عيب", 168, 334, 15).fade("b24@السؤال+0.2");

      /* dézoom final sur toute l'affiche --------------------------------------- */
      cam.push({ at: T("b24@comments") - 0.2, d: 1.8, s: 1, cx: 540, cy: 960 });
      cam.sort((p, q) => T(p.at) - T(q.at));
      c.camera(cam);
    } });
    st.finish(1.5);
  };
})();
