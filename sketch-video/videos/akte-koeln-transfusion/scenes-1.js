/* scenes-1.js — ESSAI PROVISOIRE des mises en place (X.lieux) : à remplacer par les vraies scènes (étape « scènes »). */
(window.EP_PARTS = window.EP_PARTS || []).push(function (X) {
  "use strict";
  const { st, T, E, prog, lerp, clamp, el, U, MAT, INK, PE, PP, D, M, CAST, TENUE, kit, blinkAt, rnd, pp, ph, breathe, rl, AFTER_INTRO, aides: A, lieux: L } = X;
  const doc = (p) => Object.assign({}, CAST.DOC, p);

  // 1 · balance (accroche)
  st.scene({ from: 0, in: "cut", inDur: 0, build(c) {
    X.use(c);
    const S = T("b1@صفر"), B = L.balance(c, { at: null, strafe: (t) => ({ strafe: t < S ? rnd(3 + (S - t) * 8, 20) : 0, blur: t > 0.3 && t < S - 0.1 ? 1 : 0, streak: rnd(t * 3, 20) }) });
    c.camera([{ at: 0, s: 1, cx: 540, cy: 900 }, { at: 0.2, s: 1.04, cx: 548, cy: 900, d: 3.3, ease: "lin" }]);
    const blk = c.sk((g) => D.guiltBlock(g, {}), () => ({}), 0, 0, 1); B.onPan(blk, "L", 0, 2);
    pp(215, 1500, 1.05, (t) => doc(Object.assign({}, TENUE.tribunal, { view: "three-quarter", facing: 1, expr: t < 2.6 ? "shock" : "cry", tears: t < 2.9 ? 0 : 1, look2: [0.7, -0.5], reachL: [-46, -190], reachR: [46, -190], bendL: 1, bendR: -1, blink: rnd(blinkAt(t, 1), 10) })), B.actors.g).on(breathe(1));
    A.chip(c, "schuldig", "مذنبة", 40, 0.17, 0.9, { x: 312, y: 452 });
    A.chip(c, "Strafe: 0", "العقوبة: صفر", 40, S, null, { x: 768, y: 452, yellow: true });
  } });

  // 2 · salle d'audience
  st.scene({ from: "b2", in: "cut", inDur: 0, build(c) {
    X.use(c);
    const S = L.salle(c, { at: "b2", judges: { SCF: (t) => ({ expr: t > T("b2@مات") ? "sad" : "calm" }) } });
    c.camera([{ at: "b2", s: 1, cx: 520, cy: 920 }, { at: "b2+0.1", s: 1.03, cx: 545, cy: 920, d: 2.2, ease: "lin" }]);
    pp(205, 1300, 1, (t) => doc(Object.assign({}, TENUE.tribunal, { view: "three-quarter", facing: 1, expr: "cry", tears: 1, headTilt: 10, blink: rnd(blinkAt(t, 2), 10) })), S.actors.g).on(breathe(2));
    const card = c.sk((g, p) => D.typedCard(g, p), () => ({ lines: [{ text: "Die Angeklagte ist einer", y: -56 }, { text: "fahrlässigen Tötung schuldig.", y: -22 }, { text: "laut Urteil", y: -84, x: 192, size: 15, anchor: "end" }] }), 530, 1175, 1, -3);
    c.node(el("g")); A.quote(c, "»Die Angeklagte trägt die Kosten des Verfahrens« — laut Urteil", "مصاريف المحاكمة عليها", "b2@غرامة");
    void card;
  } });

  // intro (socle) — inchangée
  st.scene({ from: "i1", in: "iris", inDur: 0.3, summary: false, build(c) { const k = X.use(c); k.bg(); k.ribbon("Yassine", 540, 905, { size: 60 }).wipe("i1@ياسين", 0.35); } });

  // 11 · chambre (nuit)
  st.scene({ from: "b13", in: "swipe", inDur: 0.42, build(c) {
    X.use(c);
    const R = L.chambre(c, { at: "b13", tube: (t) => ({ fill: rnd(0.6 * prog(t, T("b13@poche") + 0.2, 1.5), 50), clamp: 1 - prog(t, T("b13@poche") + 0.2, 0.3) }) });
    c.camera([{ at: "b13", s: 1, cx: 510, cy: 920 }, { at: "b13+0.1", s: 1.03, cx: 560, cy: 920, d: 2.1, ease: "lin" }]);
    A.ppC(835, 1300, 0.95, (t) => A.tired(t, doc(Object.assign({}, TENUE.hopital, PP.wave, { facing: -1, view: "three-quarter", expr: "focused", look2: [0.4, -0.6] }))), R.actors.g).on(breathe(3));
    A.chip(c, "gegen 21.50 Uhr", "مع 21:50", 34, "b13@21:50", "b13@6");
  } });

  // 13 · chambre (jour, muette)
  st.scene({ from: "b16", in: "swipe", inDur: 0.42, build(c) {
    X.use(c);
    const calme = T("b16@end") + 0.2, vie = (t) => 1 - E.inOut(prog(t, calme, 0.8));
    L.chambre(c, { at: "b16", day: true, vie, pat: (t) => ({ expr: "sleep", headTilt: rnd(lerp(6, 14, prog(t, calme, 0.8)), 4) }), clock: (t) => ({ time: 13 + (t < T("b16@13:37") ? 36 : 37) / 60, s: Math.round(Math.min(t, calme + 0.3) * 10) * 36 }) });
    c.camera([{ at: "b16", s: 1, cx: 520, cy: 930 }, { at: "b16+0.1", s: 1.04, cx: 520, cy: 930, d: 2.9, ease: "lin" }]);
    A.grey(c, calme + 0.2, 1, 0.85);
    A.typed(c, "13:37", 540, 480, 96, "b16@13:37", { parent: c.hud, dur: 0.25, halo: 8 });
    A.halo(c.text("المريض ما عاشش", 540, 1440, 72, "ttl", "middle", c.hud), 8).wipe(T("b16@end") + 0.6, 0.5, "rtl");
  } });

  // 17 · salle + expert
  st.scene({ from: "b21", in: "swipe", inDur: 0.42, build(c) {
    X.use(c);
    const S = L.salle(c, { at: "b21", expert: true, exp: (t) => ({ headTilt: t > T("b21@للمحكمة") + 0.4 && t < T("b21@للمحكمة") + 0.8 ? 8 : 0 }) });
    c.camera([{ at: "b21", s: 1, cx: 500, cy: 920 }, { at: "b21+0.1", s: 1.03, cx: 570, cy: 920, d: 3.0, ease: "lin" }]);
    pp(205, 1300, 1, (t) => doc(Object.assign({}, TENUE.tribunal, { view: "three-quarter", facing: 1, expr: "cry", tears: 1, blink: rnd(blinkAt(t, 2), 10) })), S.actors.g).on(breathe(2));
    c.sk((g, p) => D.typedCard(g, p), () => ({ w: 400, h: 240, dashed: true, lines: [{ text: "Staatsanwaltschaft:", y: -40 }, { text: "90 Tagessätze", y: 22, size: 46 }, { text: "— beantragt —", y: 76 }] }), 520, 1175, 1, -3);
    A.chip(c, "90 Tagessätze · beantragt", "غرامة بالأيام · طلب، ماشي حكم", 28, "b21@7", null);
  } });

  // 18 · balance + console + chariot (le compteur du HUD vient s'y poser)
  st.scene({ from: "b22", in: "cut", inDur: 0, build(c) {
    X.use(c);
    const B = L.balance(c, { at: null, extras: true, weight: { drop: "b22" }, cart: { arrive: "b22@المحكمة" }, counter: A.COUNTER_LAND });
    c.camera([{ at: "b22", s: 1, cx: 560, cy: 900 }, { at: "b22+0.1", s: 1.03, cx: 575, cy: 900, d: 4.2, ease: "lin" }]);
    const blk = c.sk((g, p) => D.guiltBlock(g, p), (t) => ({ seams: rnd(prog(t, T("b22@شافت"), 0.3), 10) }), 0, 0, 1); B.onPan(blk, "L", 0, 2);
    pp(215, 1500, 1.05, (t) => doc(Object.assign({}, TENUE.tribunal, { view: "three-quarter", facing: 1, expr: "worried", look2: [0.7, -0.6], reachL: [-46, -190], reachR: [46, -190], bendL: 1, bendR: -1, blink: rnd(blinkAt(t, 1), 10) })), B.actors.g).on(breathe(1));
    A.chip(c, "Organisationsverschulden", "غلطة فالتنظيم", 34, "b22@Organisationsverschulden", null, { yellow: true });
    const lab = (s, side) => { const n = A.halo(c.text(s, 0, 0, 28, "ar strong", "middle"), 7); B.onPan(n, side, 0, 160); return n; };
    lab("الغلطة", "L"); lab("العقوبة", "R");
  } });

  // 21 · le dossier (composition des dessins de decor-3.js, pas un lieu)
  st.scene({ from: "b25", in: "cut", inDur: 0, build(c) {
    const k = X.use(c), m = M.of(c); k.bg();
    m.obj(D.courtRoom, 0, 0, 1, {}); m.obj(D.bench04, 540, 1020, 1, { w: 1000, plates: [], pile: null, carafe: null });
    c.camera([{ at: "b25", s: 1, cx: 540, cy: 900 }, { at: "b25+0.1", s: 1.03, cx: 540, cy: 900, d: 1.8, ease: "lin" }]);
    m.obj(D.caseFile, 540, 800, 1, { part: "cover" });
    const lamp = m.obj(D.deskLamp, 150, 1060, 1, { part: "lamp", k: 1.25 }); m.sway(lamp, 1, 3, [150, 1060]);
    c.sk((g, p) => D.caseFile(g, p), (t) => ({ part: "roll", streak: rnd(t * 4, 20), tick: Math.round(t * 200) % 360 }), 540, 800, 1);
    m.obj(D.deskLamp, 150, 1060, 1, { part: "cone", on: 0.8, k: 1.25 });
    m.dust({ x: 330, y: 650, w: 300, h: 300 }, 10, { seed: 21, op: 0.7, speed: 8, cone: true });
    const tag = m.obj(D.loopTag, 771, 720, 1, { len: 53 }); m.pend(tag, "b25@نهائي+0.3", 10, [771, 640], { idle: 1.5 }); m.build(tag, "b25@نهائي", "drop", { dist: 140 });
    A.chip(c, "Rechtskraft nicht veröffentlicht", "ما معروفش واش نهائي", 30, "b25@لقيناش", null);
  } });

  // 22 · la règle
  st.scene({ from: "b26", in: "swipe", inDur: 0.42, build(c) {
    X.use(c);
    const R = L.regle(c, { at: "b26@قبل", lessonAt: "b26@قبل+0.1", checks: (t) => [prog(t, T("b26@السمية"), 0.25), prog(t, T("b26@groupe"), 0.25), prog(t, T("b26@والنمرة"), 0.25), 0], hl: (t) => ({ pers: rnd(prog(t, T("b26@براسك"), 0.25), 10) }) });
    c.camera([{ at: "b26", s: 1, cx: 520, cy: 920 }, { at: "b26+0.1", s: 1.03, cx: 560, cy: 920, d: 3.2, ease: "lin" }]);
    pp(240, 1300, 0.95, (t) => Object.assign({}, CAST.TOI, PP.stand, { view: "three-quarter", facing: 1, expr: "focused", blink: rnd(blinkAt(t, 5), 10) }), R.actors.g).on(breathe(5));
  } });

  // 25 · le sang ne revient pas (composition des dessins de decor-3.js, pas un lieu)
  st.scene({ from: "b29", in: "swipeR", inDur: 0.42, build(c) {
    const k = X.use(c), m = M.of(c); k.bg();
    c.camera([{ at: "b29", s: 1, cx: 580, cy: 900 }, { at: "b29+0.1", s: 1, cx: 520, cy: 900, d: 1.0, ease: "lin" }, { at: "b29@الدم", s: 1.1, cx: 540, cy: 820, d: 1.2 }]);
    const pf = c.sk((g, p) => D.pageFlip(g, p), (t) => ({ p: rnd(prog(t, T("b29@القصة"), 0.75), 20) }), 720, 590, 1);
    void pf;
    m.obj(D.bloodBag, 540, 120, 2.2, { level: 0.67 });
    m.obj(D.dripBig, 540, 556, 1, { part: "back" });
    c.sk((g, p) => D.dripBig(g, p), (t) => ({ part: "fluid", drop: t < T("b29@الدم") ? 0.3 : rnd(Math.min(1, 0.35 + (t - T("b29@الدم")) / 0.25), 20), ripple: rnd(prog(t, T("b29@الدم") + 0.25, 0.5), 20), level: 0.34 }), 540, 556, 1);
    m.obj(D.dripBig, 540, 556, 1, { part: "front" });
    c.sk((g, p) => D.tube(g, p), (t) => ({ pts: [[540, 746], [548, 900], [530, 1060], [545, 1250], [540, 1440]], k: 2.2, chamber: false, roller: false, fill: rnd(lerp(0.22, 1, prog(t, T("b29@دخل"), 0.5)), 50) }), 0, 0, 1);
    c.sk((g, p) => D.rewKey(g, p), (t) => ({ down: t > T("b29@القصة") && t < T("b29@اللور") ? 1 : 0 }), 250, 980, 1);
  } });
});
