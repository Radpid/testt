/* scenes-4.js — PARTIE 4 (storyboard.md § 4, scènes 21 à 25) : le dossier « Rechtskraft » (le rouleau ne s'arrête jamais, le « ؟ »
 * reste accroché), la règle en trois pages (au lit, toi-même ; le Bedside-Test ; ne signe jamais), puis le sang ne revient pas.
 * L'affiche-résumé (scène 26) est dans story.js (st.summary). Mise en place fixe : X.lieux.regle (22–24). Aides : X.aides.
 * Repères numériques par RANG : b28@1 = le premier « ما », b29@7 = le second « ما ».
 */
(window.EP_PARTS = window.EP_PARTS || []).push(function (X) {
  "use strict";
  const { st, T, E, prog, lerp, clamp, el, PE, PP, D, M, CAST, blinkAt, rnd, pp, ph, breathe, aides: A, lieux: L } = X;
  const f = (v) => Math.round(v * 10) / 10, INK = "#1C1A1C", YEL = "#F8CE4E";
  const bounce = M.bounce;
  // lien en pointillés jaunes (sur un trait d'encre) de a à b, bombé de « bow » px ; il se trace de a vers b
  const link = (c, a, b, bow, at, o) => {
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, cx = mx - (dy / l) * bow, cy = my + (dx / l) * bow;
    const d = `M${f(a[0])} ${f(a[1])} Q${f(cx)} ${f(cy)} ${f(b[0])} ${f(b[1])}`, g = el("g");
    const p1 = el("path", { d, fill: "none", stroke: INK, "stroke-width": 7, "stroke-linecap": "round", pathLength: 100, "stroke-dasharray": "0 101" }, g);
    const p2 = el("path", { d, fill: "none", stroke: YEL, "stroke-width": 4, "stroke-linecap": "round", pathLength: 100, "stroke-dasharray": "0 101" }, g);
    [a, b].forEach((p) => el("circle", { cx: f(p[0]), cy: f(p[1]), r: 6, fill: YEL, stroke: INK, "stroke-width": 2.2 }, g));
    const t0 = T(at), n = c.node(g, o && o.parent);
    n.add((t, s) => {
      const k = E.out(prog(t, t0, 0.35)) * 100, dash = (len) => { let out = "", u = 0; while (u < k) { const e = Math.min(k, u + len); out += `${f(e - u)} ${f(len * 0.8)} `; u = e + len * 0.8; } return out + "0 101"; };
      p1.setAttribute("stroke-dasharray", dash(7)); p2.setAttribute("stroke-dasharray", dash(7)); s.o *= t >= t0 ? 1 : 0;
    });
    return n;
  };

  /* ═══════ 21 · LE DOSSIER : définitif ? on ne sait pas (b25) — le rouleau « Rechtskraft » ne s'arrête jamais ═══════ */
  st.scene({ from: "b25", in: "cut", inDur: 0, build(c) {
    const k = X.use(c), m = M.of(c); k.bg();
    const t0 = T("b25"), tL = T("b25@عرفناش"), tW = T("b25@واش"), tN = T("b25@نهائي");
    c.camera([{ at: "b25", s: 1, cx: 540, cy: 900 }, { at: "b25+0.1", s: 1.03, cx: 540, cy: 900, d: 1.8, ease: "lin" }]);
    m.obj(D.courtRoom, 0, 0, 1, {});
    m.obj(D.benchTop, -140, 1020, 1, { shadowX: 300 });
    // le rouleau : il tourne flou ; à b25@واش il ralentit, deux à-coups (on croit qu'il va claquer)… et il repart
    const speed = (t) => (t < t0 + 0.3 ? 0 : 3.2 * (1 - 0.8 * Math.sin(Math.PI * prog(t, tW, 0.6))));
    const phase = (t) => { let v = 0; for (let u = t0 + 0.3; u < t; u += 0.02) v += speed(u) * Math.min(0.02, t - u); return v; };
    const jolt = (t) => [tW + 0.22, tW + 0.4].reduce((a, b) => a + (t >= b && t < b + 0.09 ? -4 * Math.sin(Math.PI * (t - b) / 0.09) : 0), 0);
    const FX = 540, FY = 800;
    // contre-revue : le dossier et la lampe partent avant la coupe (entrée cut) : la 1re image n'est plus un mur vide
    const file = c.group(); m.build(file, t0 - 0.2, "drop", { dist: 300, dur: 0.45 });
    c.sk((g, p) => D.caseFile(g, p), () => ({ part: "cover" }), FX, FY, 1, 0, file.g);
    c.sk((g, p) => D.caseFile(g, p), (t) => ({ part: "roll", streak: rnd(-phase(t), 20), tick: Math.round(phase(t) * 140) % 360 }), FX, FY, 1, 0, file.g).on((t, s) => { s.y += jolt(t); });
    // le « ؟ » tombe au bout de sa ficelle sur la sangle et se balance : la seule boucle que les ciseaux ne coupent pas
    const at = [FX + 231, FY - 160], tag = m.obj(D.loopTag, at[0], at[1] + 27 + 53, 1, { len: 53 });
    m.build(tag, tN, "drop", { dist: 140, dur: 0.45 }); m.pend(tag, tN + 0.35, 12, at, { idle: 3 });
    // la lampe (devant le dossier), son cône pâle par-dessus, la poussière dans la lumière
    const LX = 200;   // revue : 150 → 200 (le pied de la lampe sortait par le bord gauche)
    const lamp = m.obj(D.deskLamp, LX, 1060, 1, { part: "lamp", k: 1.25 }); m.sway(lamp, 1, 3, [LX, 1060]);
    const cone = m.obj(D.deskLamp, LX, 1060, 1, { part: "cone", k: 1.25, on: 1 }); m.sway(cone, 1, 3, [LX, 1060]);
    [lamp, cone].forEach((n) => m.build(n, t0 - 0.08, "rise", { dist: 200, dur: 0.4 }));
    m.dust({ x: 350, y: 600, w: 300, h: 330 }, 12, { seed: 21, op: 0.8, speed: 8, cone: true });
    A.chip(c, "Rechtskraft nicht veröffentlicht", "ما معروفش واش نهائي", 30, tL, null);
  } });

  /* ═══════ 22 · 23 · 24 — LA RÈGLE (b26–b28) : une même page ; à droite la carte qui se remplit, à gauche « toi » (pas l'héroïne) ═══════ */
  const RULE = () => {
    const tP = T("b26@poche"), tSee = T("b26@شوف"), tB = T("b26@ضروري"), tN = T("b26@السمية"), tG = T("b26@groupe"), tNr = T("b26@والنمرة"),
      tD = T("b27@ودير"), tR = T("b27@groupe"), tPat = T("b27@المريض"), tX = T("b28@درتيهاش");
    return { tP, tSee, tB, tN, tG, tNr, tD, tR, tPat, tX,
      rows: (t) => (t < tP ? 0 : t < tSee ? prog(t, tP, 0.3) : t < tB ? 1 + prog(t, tSee, 0.3) : t < tD ? 2 + prog(t, tB, 0.3) : 3 + prog(t, tD + 0.1, 0.3)),
      foot: (t) => prog(t, tR - 0.3, 0.3),
      checks: (t) => [E.out(prog(t, tN + 0.25, 0.3)), E.out(prog(t, tG + 0.25, 0.3)), E.out(prog(t, tNr + 0.25, 0.3)), E.out(prog(t, tR + 0.2, 0.3))],
      hl: (t) => ({ pers: E.out(prog(t, tB, 0.3)), foot: E.out(prog(t, tPat, 0.3)) }),
      lesson: (t) => [E.out(prog(t, tP + 0.3, 0.3)), E.out(prog(t, tX + 0.1, 0.3))] };
  };
  const toi = (p) => Object.assign({}, CAST.TOI, { talk: 0 }, p);

  /* 22 · au lit, toi-même : le nom, le groupe, le numéro (b26) — entrée swipe */
  st.scene({ from: "b26", in: "swipe", inDur: 0.42, build(c) {
    X.use(c); const m = M.of(c), R0 = RULE();
    const R = L.regle(c, { at: "b26", lessonAt: T("b26") + 0.15, rows: R0.rows, head: () => false, foot: R0.foot, checks: R0.checks, hl: R0.hl, lesson: R0.lesson });
    c.camera([{ at: "b26", s: 1, cx: 520, cy: 920 }, { at: "b26+0.1", s: 1.03, cx: 560, cy: 920, d: 3.2, ease: "lin" }]);
    // l'en-tête allemand se tape (b26@كل)
    R.headLines.forEach(([s, x, y, sz], i) => A.typed(c, s, x, y, sz, Math.max(T("b26@كل"), T("b26") + 0.55) + i * 0.5, { anchor: "start", per: 0.022 }));   // après la chute de la carte
    // la ligne ⑤ (une seule poche) : un cercle quand la poche apparaît
    const lb = R.lessonRows[0]; A.ring(c, lb[0], lb[1], 212, 44, R0.tP, { dur: 0.3 }).hide(R0.tP + 0.9, 0.25);
    // le coin de lit et l'avant-bras du patient (bracelet), qui entrent par la droite à b26@حدا
    const BC = [300, 1300], bed = m.obj(D.bedCorner, BC[0], BC[1], 1, {}); m.build(bed, "b26@حدا", "right", { dist: 200, dur: 0.45 });
    R.card.g.parentNode.insertBefore(bed.g, R.card.g);   // il sort de derrière les cartes
    const band = [BC[0] + bed.out.band[0], BC[1] + bed.out.band[1]];
    A.typed(c, "am Patienten", 290, 815, 18, "b26@حدا", { halo: 5, per: 0.03 });
    A.halo(c.text("حدا المريض", 290, 852, 28, "ar strong", "middle"), 6).wipe(T("b26@حدا") + 0.25, 0.35, "rtl");
    // UNE poche dans sa main gauche d'écran (à b26@poche), le document dans sa main droite d'écran
    const S = 0.95, X0 = 215, BAG = [138, 1080], DOC = [292, 1060], DS = 0.16, DO = [290, 985];
    const bag = c.sk((g, p) => D.bloodBag(g, p), (t) => ({ level: 0.92, sway: rnd(t * 1.8, 5) }), BAG[0], BAG[1] + 6, 0.5); bag.pop(R0.tP, 0.3);
    const doc = c.sk((g, p) => D.docSheet(g, p), () => ({}), DO[0], DO[1], DS);
    const lines = doc.out.lines, field = doc.out.field, DP = (q) => [DO[0] + q[0] * DS, DO[1] + q[1] * DS];
    // toi : de trois quarts ; tes yeux vont de la poche au document, puis au bracelet ; focused → calm à b26@والنمرة
    const loc = (p) => [rnd((p[0] - X0) / S, 2), rnd((p[1] - 1300) / S, 2)];
    pp(X0, 1300, S, (t) => {
      const q = E.inOut(prog(t, R0.tP, 0.25));
      const look = t < R0.tSee ? [0.3, 0.3] : t < R0.tSee + 0.35 ? [-0.8, 0.5] : t < R0.tSee + 0.7 ? [0.7, 0.4] : t < R0.tN ? [0.9, 0.8] : t < R0.tG ? [0.7, 0.4] : [0.2, 0.5];
      const p = toi({ view: "three-quarter", facing: 1, expr: t < R0.tNr + 0.2 ? "focused" : "calm", look2: look, blink: rnd(blinkAt(t, 0.6), 10),
        reachR: loc(DOC), bendR: 1, reachL: q > 0 ? loc([lerp(X0 - 40, BAG[0], q), lerp(1150, BAG[1], q)]) : undefined, bendL: -1 });
      if (!q) p.armL = [-8, 10];
      return p;
    }).on(breathe(0.6));
    // les trois vérifications : bracelet ↔ document, étiquette de la poche ↔ champ du groupe, code-barres ↔ code-barres du document
    link(c, band, DP(lines[0]), -24, "b26@السمية");
    link(c, [BAG[0] + 6, BAG[1] + 52], DP(field), 30, "b26@groupe");
    link(c, [BAG[0] - 2, BAG[1] + 62], DP([lines[5][0] + 60, lines[5][1] + 70]), 36, "b26@والنمرة");
    c.kick("b26@والنمرة", 0.05);
  } });

  /* 23 · le Bedside-Test (b27) — entrée cut : sa tête en gros plan, la carte de test, le tube du PATIENT */
  st.scene({ from: "b27", in: "cut", inDur: 0, build(c) {
    X.use(c); const m = M.of(c), R0 = RULE();
    const tBd = T("b27@Bedside"), tC = T("b27@تأكد"), tR = T("b27@groupe"), tPat = T("b27@المريض");
    const R = L.regle(c, { rows: R0.rows, foot: R0.foot, checks: R0.checks, hl: R0.hl, lesson: R0.lesson });
    c.camera([{ at: "b27", s: 1, cx: 540, cy: 920 }, { at: "b27+0.1", s: 1.04, cx: 540, cy: 920, d: 2.5, ease: "lin" }]);
    void R;
    // la carte de test (×0,75 : elle tient dans la colonne de gauche, x 165–420)
    const CS = 0.75, CC = [292, 1085];
    const drops = (t) => [E.out(prog(t, tBd + 0.32, 0.35)), E.out(prog(t, tBd + 0.62, 0.35))];
    const card = c.sk((g, p) => D.bedsideCard(g, p), (t) => ({ drops: drops(t).map((v) => rnd(v, 20)), react: rnd(E.inOut(prog(t, tC, 0.5)), 20), legend: rnd(prog(t, tC + 0.3, 0.3), 10), result: rnd(E.inOut(prog(t, tR, 0.45)), 20) }), CC[0], CC[1], CS);
    m.build(card, "b27", "drop", { dist: 300, dur: 0.45 });
    const FL = [[-82, -16], [82, -16]].map(([x, y]) => [CC[0] + x * CS, CC[1] + y * CS]);
    // le tube (pointe en bas) arrive, s'incline de 35°, verse une goutte dans chaque champ ; son bracelet pulse à b27@المريض
    const tipAt = (t) => { const u = E.inOut(prog(t, tBd + 0.05, 0.25)), v = E.inOut(prog(t, tBd + 0.45, 0.2)), w = E.inOut(prog(t, tBd + 0.9, 0.35)); return [lerp(lerp(lerp(385, FL[0][0], u), FL[1][0], v), 385, w), lerp(lerp(lerp(905, 990, u), 990, v), 905, w)]; };   // au repos à droite de sa tête
    const ang = (t) => 35 * E.inOut(prog(t, tBd, 0.2)) * (1 - E.inOut(prog(t, tBd + 0.9, 0.3)));
    // sa tête (gros plan) + buste (revue : la tête seule flottait, cou coupé net) ; posée AVANT le tube, qui passe devant le buste
    // ses yeux suivent les gouttes ; focused → calm
    A.phC(235, 720, 1.2, (t) => {
      const q = tipAt(t), dx = clamp((q[0] - 235) / 160, -1, 1);
      return toi({ view: "three-quarter", facing: 1, expr: t < tR ? "focused" : "calm", look2: [rnd(0.3 + 0.5 * dx, 10), 0.8], blink: rnd(blinkAt(t, 1.4), 10), headTilt: 4 });
    }, { outfit: "coat", badge: true, w: 58, bottom: 180 }).on(breathe(1.4));
    const dropK = (t) => { const a = prog(t, tBd + 0.12, 0.2) * (1 - prog(t, tBd + 0.3, 0.03)), b = prog(t, tBd + 0.42, 0.2) * (1 - prog(t, tBd + 0.6, 0.03)); return Math.max(a, b); };
    const tube = c.sk((g, p) => D.sampleTube(g, p), (t) => ({ level: rnd(lerp(0.75, 0.6, prog(t, tBd, 0.7)), 20), slope: rnd(ang(t), 2), drop: rnd(dropK(t), 10) }), 0, 0, 1.2);
    tube.on((t, s) => { const q = tipAt(t); s.x += q[0]; s.y += q[1]; s.px = 0; s.py = 0; s.r += ang(t); });
    m.build(tube, T("b27") + 0.1, "drop", { dist: 260, dur: 0.4 }); tube.pulse(tPat, 0.45, 0.12);
    // les deux gouttes qui tombent du tube dans les champs
    [0, 1].forEach((i) => {
      const a = tBd + 0.3 + i * 0.3, gd = el("g"); el("path", { d: "M0 -9 Q6 -1 5 3 Q4 8 0 8 Q-4 8 -5 3 Q-6 -1 0 -9 Z", fill: "#B5332D", stroke: "#8E1F1C", "stroke-width": 1.4 }, gd);
      c.node(gd).on((t, s) => { const p = prog(t, a, 0.16); s.o *= p > 0 && p < 1 ? 1 : 0; s.x += FL[i][0]; s.y += lerp(1000, FL[i][1], p * p); });
    });
    A.chip(c, "Bedside-Test", "اختبار الفصيلة حدا الفراش", 36, tBd, null, { yellow: true });
  } });

  /* 24 · ne signe jamais une formation que tu n'as pas faite (b28) — entrée cut */
  st.scene({ from: "b28", in: "cut", inDur: 0, build(c) {
    X.use(c); const m = M.of(c), R0 = RULE();
    const t0 = T("b28"), tM = T("b28@1"), tS = T("b28@تسني"), tF = T("b28@formation"), tX = T("b28@درتيهاش");
    const R = L.regle(c, { rows: R0.rows, foot: R0.foot, checks: R0.checks, hl: R0.hl, lesson: R0.lesson });
    c.camera([{ at: "b28", s: 1, cx: 520, cy: 920 }, { at: "b28+0.1", s: 1.03, cx: 555, cy: 920, d: 2.1, ease: "lin" }]);
    m.obj(D.tableCorner, 300, 1150, 1, {});
    // la feuille (×0,36) et le stylo sortent de derrière la carte de la règle et glissent vers toi ; tu la repousses à b28@درتيهاش
    const SS = 0.36, sx = (t) => lerp(570, 375, E.out(prog(t, t0 + 0.05, 0.4))) + 60 * E.out(prog(t, tX, 0.3)) + 10 * Math.sin(Math.PI * 4 * prog(t, tS, 0.5)) * (1 - prog(t, tS, 0.5));
    const sh = c.group(); sh.on((t, s) => { s.x += sx(t); s.y += 1062; s.px = 0; s.py = 0; s.r += 6 * E.out(prog(t, tX, 0.3)); });
    R.card.g.parentNode.insertBefore(sh.g, R.card.g);   // derrière les deux cartes
    c.sk((g, p) => D.formSheet(g, p), (t) => ({ sign: 0, check: t < tF + 0.2 ? 1 : 0 }), 0, 0, SS, 0, sh.g);
    const pulseL = el("g", { transform: `scale(${SS})` }); el("rect", { x: -132, y: -4, width: 310, height: 30, rx: 6, fill: YEL, opacity: 0.6 }, pulseL);
    c.node(pulseL, sh.g).on((t, s) => { const p = prog(t, tF, 0.5); s.o *= p > 0 && p < 1 ? Math.sin(Math.PI * p) : 0; });
    c.sk((g, p) => D.pen(g, p), () => ({ angle: -25, len: 80 }), -34, 22, 1, 0, sh.g).on((t, s) => { const p = prog(t, tS, 0.5); if (p > 0 && p < 1) { s.x -= 14 * Math.sin(Math.PI * 3 * p) * (1 - p); s.r += 6 * Math.sin(Math.PI * 4 * p); s.px = -34; s.py = 22; } });   // en travers de la feuille
    // le grand ✗ manuscrit sur la ligne de signature
    const xx = el("g", { transform: `scale(${SS})` });
    const x1 = el("path", { d: "M-150 128 L150 206", fill: "none", stroke: INK, "stroke-width": 22, "stroke-linecap": "round", pathLength: 100, "stroke-dasharray": "0 101" }, xx);
    const x2 = el("path", { d: "M-150 206 L150 128", fill: "none", stroke: INK, "stroke-width": 22, "stroke-linecap": "round", pathLength: 100, "stroke-dasharray": "0 101" }, xx);
    c.node(xx, sh.g).add((t) => { x1.setAttribute("stroke-dasharray", `${f(100 * E.out(prog(t, tX + 0.05, 0.15)))} 101`); x2.setAttribute("stroke-dasharray", `${f(100 * E.out(prog(t, tX + 0.2, 0.15)))} 101`); });
    // toi : tu lèves la main, paume en avant (b28@1), tu fais non de la tête (b28@تسني), tu repousses (b28@درتيهاش)
    const S = 0.95, X0 = 215, loc = (p) => [rnd((p[0] - X0) / S, 2), rnd((p[1] - 1300) / S, 2)];
    pp(X0, 1300, S, (t) => {
      const up = E.inOut(prog(t, tM, 0.25)), push = Math.sin(Math.PI * prog(t, tX - 0.05, 0.45));
      const pn = prog(t, tS, 0.5), no = pn > 0 && pn < 1 ? 6 * Math.sin(Math.PI * 4 * pn) * (1 - pn) : 0;
      const p = toi({ view: "three-quarter", facing: 1, expr: t < tM ? "focused" : "angry", look2: [0.8, 0.4], blink: rnd(blinkAt(t, 2.1), 10), headTilt: rnd(no, 2) });
      if (up > 0) { p.reachR = loc([lerp(285, 305, up) + 18 * push, lerp(1150, 945, up) + 30 * push]); p.bendR = 1; }   // paume levée au-dessus de la feuille (pas sur le stylo)
      return p;
    }).on(breathe(2.1));
    // la carte jaune pulse quand la coche ⑥ se trace
    R.lesson.pulse(tX + 0.1, 0.45, 0.05); R.lmarks.pulse(tX + 0.1, 0.45, 0.05);
    c.kick(tX, 0.06);
  } });

  /* ═══════ 25 · LE SANG NE REVIENT PAS (b29) — gros plan de la tubulure ; aucun texte à l'écran (la phrase est dans le sous-titre) ═══════ */
  st.scene({ from: "b29", in: "swipeR", inDur: 0.42, build(c) {
    const k = X.use(c), m = M.of(c); k.bg();
    const t0 = T("b29"), tQ = T("b29@القصة"), tL = T("b29@لور"), tB = T("b29@transfusion"), tIn = T("b29@دارت"), t7 = T("b29@12"), tK = T("b29@ترجعها");
    c.camera([{ at: "b29", s: 1, cx: 580, cy: 900 }, { at: "b29+0.1", s: 1, cx: 520, cy: 900, d: 1.0, ease: "lin" }, { at: tB, s: 1.1, cx: 540, cy: 815, d: 1.2 }]);   // revue : cy 960 → 815 (le haut de la poche passait dans la zone y < 250)
    const grid = m.obj(D.hourGrid, -110, 290, 1, { cols: 10, rows: 9, cell: 140, paper: false, col: "#9A9A94", sw: 2.4 }).on((t, s) => { s.o *= 0.18; }); m.par(grid, 0.6);
    // les pages du planning (elles reviennent pendant le « ◀◀ »)
    const PF = [680, 590], pq = (t) => E.inOut(prog(t, tQ + 0.05, tL - tQ - 0.1));
    m.obj(D.pageFlip, PF[0], PF[1], 1, { part: "board", clip: false });
    c.sk((g, p) => D.pageFlip(g, p), (t) => ({ part: "pages", p: rnd(pq(t), 40) }), PF[0], PF[1], 1);
    m.obj(D.pageFlip, PF[0], PF[1], 1, { part: "clip" });
    // les trois objets du rembobinage filent de droite à gauche, DERRIÈRE la tubulure, puis s'effacent
    const run = (t) => E.inOut(prog(t, tQ + 0.05, tL - tQ - 0.05)), gone = (t) => 1 - prog(t, tL, 0.2);
    [[600, 150, (g) => D.formSheet(g, { sign: 1 }), 0.2, 0], [700, 270, (g) => { [-26, 26].forEach((dx) => D.bloodBag(el("g", { transform: `translate(${dx * 2.6} 0)` }, g), { level: 0.95 })); }, 0.35, -60], [800, 390, (g) => D.rollCounter(g, { digits: [6, 3] }), 0.45, -40]]
      .forEach(([x0, x1, draw, s, dy], i) => { c.sk((g) => draw(g), () => ({}), 0, 0, s).on((t, st_) => { st_.x += lerp(x0, x1, run(t)); st_.y += 1210 + dy; st_.o *= gone(t) * (t < t0 + 0.1 + i * 0.06 ? 0 : 1); }); });
    // la grande poche (×2,2, niveau 0,67), la grande chambre compte-gouttes, la tubulure large
    c.sk((g, p) => D.bloodBag(g, p), (t) => ({ level: 0.67, sway: rnd(t * 0.8, 5) }), 540, 300, 2.2);   // 180 px plus bas que le storyboard : la barre de progression ne traverse plus l'étiquette
    const drop = (t) => {   // −1 : aucune ; 0…0,35 : elle se forme ; 0,35…1 : elle tombe
      if (t < tB) return 0.3;
      if (t < tB + 0.25) return 0.35 + 0.65 * prog(t, tB, 0.25);
      if (t < tK + 0.05) return 0.32 * prog(t, tB + 0.35, 0.5);
      if (t < tK + 0.3) return 0.35 + 0.65 * prog(t, tK + 0.05, 0.25);
      return 0.25 * prog(t, tK + 0.5, 0.6);
    };
    const hang = (t) => (t < tB ? 0.6 * Math.sin(t * 9) : t >= t7 && t < tK ? 2.2 * Math.sin((t - t7) * 40) : 0);
    const ripple = (t) => Math.max(prog(t, tB + 0.25, 0.6) * (t < tB + 0.85 ? 1 : 0), prog(t, tK + 0.3, 0.6) * (t < tK + 0.9 ? 1 : 0));
    const DC = [540, 740];
    m.obj(D.dripBig, DC[0], DC[1], 1, { part: "back" });
    c.sk((g, p) => D.dripBig(g, p), (t) => ({ part: "fluid", drop: rnd(drop(t), 40), hang: rnd(hang(t), 4), ripple: rnd(ripple(t), 20), level: 0.3 }), DC[0], DC[1], 1);
    m.obj(D.dripBig, DC[0], DC[1], 1, { part: "front" });
    // le front rouge : arrêté à y 900, il descend jusqu'à 1440 à b29@دخل ; à b29@7 il tressaille de 10 px vers le haut (deux fois) et retombe
    const PTS = [[540, 930], [548, 1080], [530, 1240], [545, 1430], [540, 1620]], F0 = 0.22, PX = 1 / 690;
    const twitch = (t) => [t7, t7 + 0.2].reduce((a, b) => a + 10 * Math.sin(Math.PI * prog(t, b, 0.16)), 0);
    c.sk((g, p) => D.tube(g, p), (t) => ({ pts: PTS, k: 2, chamber: false, roller: false, fill: rnd(clamp(lerp(F0, 1, E.inOut(prog(t, tIn, 0.5))) - twitch(t) * PX, 0, 1), 200), flow: 0, drop: 0 }), 0, 0, 1);
    // la touche « ◀◀ »
    const down = (t) => {
      let v = E.out(prog(t, tQ, 0.12)) * (1 - E.out(prog(t, tL, 0.15)));
      [t7, t7 + 0.2].forEach((b) => { v = Math.max(v, E.out(prog(t, b, 0.08)) * (1 - E.out(prog(t, b + 0.1, 0.08)))); });
      return v;
    };
    const key = c.sk((g, p) => D.rewKey(g, p), (t) => ({ down: rnd(down(t), 20), grey: rnd(prog(t, tK, 0.3), 10) }), 250, 980, 1);
    m.build(key, t0 + 0.2, "rise", { dist: 160, dur: 0.4 });
    A.scan(c, "b29@القصة", { times: 2 });
    c.kick(tK, 0.05);
  } });
});
