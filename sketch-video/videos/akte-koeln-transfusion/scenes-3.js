/* scenes-3.js — PARTIE 3 (storyboard.md § 4, scènes 14 à 20) : la muette 2 (elle glisse le long du pilier, l'effondrement, la
 * convocation), le bureau de l'administration (la feuille, le stylo — Rekonstruktion), les mois, le retour au tribunal (90 Tagessätze
 * DEMANDÉS), puis la balance en trois temps : la faute se vide vers l'organisation, ce qui reste est petit mais coupable, la peine se
 * remplit de ce qu'elle a déjà subi (§ 60). Mises en place fixes : X.lieux.salle (17), X.lieux.balance (18–20). Aides : X.aides.
 * Repères numériques par RANG : b21@7 = « 90 ». Les scènes 18, 19, 20 partagent UNE fonction (balance3) : tout y est fonction du temps,
 * les scènes 19 et 20 héritent donc exactement de l'état laissé par la scène 18.
 */
(window.EP_PARTS = window.EP_PARTS || []).push(function (X) {
  "use strict";
  const { st, T, E, prog, lerp, clamp, el, PE, PP, D, M, CAST, TENUE, blinkAt, rnd, pp, breathe, aides: A, lieux: L } = X;
  const f = (v) => Math.round(v * 10) / 10, INK = "#1C1A1C", YEL = "#F8CE4E", PAPER = "#F7F7F1";
  const doc = (p) => Object.assign({}, CAST.DOC, p);
  const bounce = M.bounce;
  // texte .tw tapé lettre par lettre (même aide que scenes-2.js) ; o.halo = contour papier
  const tape = (c, text, x, y, size, a, dur, o) => {
    o = o || {};
    const g = el("g"), t = el("text", { x, y, "font-size": size, "text-anchor": o.anchor || "middle", class: "tw" }, g);
    if (o.halo) { t.setAttribute("stroke", PAPER); t.setAttribute("stroke-width", o.halo); t.setAttribute("stroke-linejoin", "round"); t.setAttribute("paint-order", "stroke"); }
    const sa = el("tspan", {}, t), sb = el("tspan", { "fill-opacity": 0, "stroke-opacity": 0 }, t);
    const n = c.node(g, o.parent), N = text.length, t0 = T(a), per = dur / Math.max(1, N);
    let last = -1;
    n.add((tt, s) => {
      const k = clamp(Math.round(N * prog(tt, t0, dur)), 0, N);
      if (k !== last) { sa.textContent = text.slice(0, k); sb.textContent = text.slice(k); last = k; }
      s.o *= tt >= t0 && k > 0 ? 1 : 0;
      if (k > 0 && k < N) s.y += Math.floor((tt - t0) / per) % 2 ? 1.5 : -1.5;
    });
    return n;
  };
  const pendA = (t, a, deg, idle, ph) => (t < a ? 0 : deg * Math.exp(-2.2 * (t - a)) * Math.sin(7.5 * (t - a))) + idle * Math.sin(t * 1.3 + (ph || 0));
  const mixP = (a, b, q) => [rnd(lerp(a[0], b[0], q), 2), rnd(lerp(a[1], b[1], q), 2)];

  /* ═══════ 14 · MUETTE 2 : elle glisse le long du pilier · l'effondrement · la convocation (silence + b17–b18) ═══════
   * Autre lieu, autre moment, SANS date ni heure (onglet masqué par le HUD, aucune horloge). Une seule scène, sans coupe. */
  st.scene({ from: "b16@end+2.5", in: "fade", inDur: 0.4, build(c) {   // +0,6 s (retour auteur : moniteur, ligne plate, bip continu)
    const k = X.use(c), m = M.of(c); k.bg();
    const tE = T("b16@end"), t0 = tE + 2.5, tS = tE + 2.9, tC = tE + 3.8, tI = T("b17@انهيار"), tW = T("b18@وفي"), tA = T("b18@الإدارة"), tCall = T("b18@عيطات"), tU = T("b18@ليها");
    c.camera([{ at: t0, s: 1, cx: 520, cy: 930 }, { at: "b17", s: 1.1, cx: 490, cy: 1010, d: 0.6 }, { at: tA, s: 1, cx: 560, cy: 950, d: 0.8 }]);   // revue : cx 450 → 490
    m.obj(D.corridor04, 0, 0, 1, { doors: [], night: 0 });
    m.obj(D.pillar, 150, 380, 1, {});
    // le petit cadre, un peu de travers, qui oscille (± 0,5°) ; il arrive en balancier
    const fr = m.obj(D.frame04, 470, 760, 1, {}); fr.on((t, s) => { s.px = 470; s.py = 760; s.r += 2.5 + 0.5 * Math.sin((t / 3.2) * 6.283); });
    m.build(fr, t0 + 0.15, "swing", { pivot: [470, 760], deg: -16, dur: 0.6 });
    // la porte « Verwaltung » (fermée), sa plaque à part (elle pulse à b18@عيطات) ; à b18@الإدارة elle s'ouvre, la lumière vacille (± 5 %)
    c.sk((g, p) => D.adminDoor(g, p), (t) => ({ open: rnd(E.inOut(prog(t, tA, 0.5)), 20), plate: false, reach: t < tA + 0.5 ? 1 : rnd(0.95 + 0.05 * Math.sin(t * 7.3) * Math.sin(t * 2.1 + 1), 50) }), 600, 720, 1);   // revue : 700 → 600 (pendant le zoom de b17, la porte et sa plaque sortaient par la droite)
    const plate = m.obj(D.doorPlate, 675, 684, 1, { text: "Verwaltung" }); m.build(plate, t0 + 0.3, "drop", { dist: 60, dur: 0.4 }); plate.pulse(tCall, 0.3, 0.15);
    // elle (scrubs, de profil), le dos contre le pilier : la hanche ne bouge pas en x, les pieds glissent vers l'avant (storyboard R2)
    const DEBOUT = { view: "side", armL: [-4, 10], armR: [4, 8], legL: [-1, 0], legR: [1, 0], torsoLean: 0, headTilt: 0, look2: [0.3, 0.2] };
    const AU_SOL = { view: "side", armL: [58, 62], armR: [66, 56], legL: [132, -92], legR: [138, -96], torsoLean: -5, headTilt: 24, look2: [0, 0.9] };
    const slide = (t) => E.inOut(prog(t, tS, 0.9)) - 0.25 * E.inOut(prog(t, tU, 0.4));
    const pose = (t) => {
      const kk = slide(t), kb = clamp((kk - 0.55) / 0.45, 0, 1), arms = PE.mix(DEBOUT, AU_SOL, kb);
      const p = Object.assign(PE.mix(DEBOUT, AU_SOL, kk), { armL: arms.armL, armR: arms.armR });
      // la main au visage (b17@انهيار), elle la baisse quand elle relève la tête vers la porte (b18@الإدارة + 0,15)
      const hf = E.inOut(prog(t, tI, 0.35)) * (1 - E.inOut(prog(t, tA + 0.15, 0.4)));
      if (hf > 0) p.armR = [lerp(p.armR[0], 84, hf), lerp(p.armR[1], 98, hf)];
      const up = E.inOut(prog(t, tA + 0.15, 0.4));
      if (up > 0) { p.headTilt = lerp(p.headTilt, 6, up); p.look2 = [lerp(p.look2[0], 0.9, up), lerp(p.look2[1], -0.1, up)]; }
      ["armL", "armR", "legL", "legR", "look2"].forEach((q) => { p[q] = [rnd(p[q][0], 2), rnd(p[q][1], 2)]; });
      p.torsoLean = rnd(p.torsoLean, 4); p.headTilt = rnd(p.headTilt, 2);
      return p;
    };
    const her = pp(262, 1300, 1, (t) => {
      const ex = t < tS + 0.18 ? "shock" : t < tS + 0.72 ? "sad" : t < tA + 0.15 ? "cry" : "worried";
      return doc(Object.assign({}, TENUE.sol, pose(t), { expr: ex, tears: rnd(prog(t, tS + 0.6, 0.4) * (t < tA + 0.15 ? 1 : 0.8), 10), talk: 0, blink: rnd(blinkAt(t, 1.7), 10) }));
    });
    // les épaules secouées (± 1,5 px, 6 Hz, une demi-seconde sur deux) à partir de la pastille
    her.on(breathe(1.7)).on((t, s) => { if (t >= tC && t < tA && Math.floor((t - tC) * 2) % 2 === 0) s.y += 1.5 * Math.sin((t - tC) * 6 * 6.283); });
    // le stéthoscope : autour de son cou (vertical), il glisse et tombe à mi-glissade, rebondit (8 px)
    const tF = tS + 0.45, chest = (t) => { const a = PE.util.rig(doc(Object.assign({}, TENUE.sol, pose(t)))).chest; return [262 + a[0] + 10, 1300 + a[1] + 18]; };
    const P0 = chest(tF), P1 = [455, 1292];
    c.sk((g, p) => D.stetho(g, p), () => ({}), 0, 0, 0.9).on((t, s) => {
      s.px = 0; s.py = 0;
      if (t < tF) { const q = chest(t); s.x += q[0]; s.y += q[1]; s.r += 90; return; }
      const u = clamp((t - tF) / 0.35, 0, 1), v = clamp((t - tF - 0.35) / 0.3, 0, 1);
      s.x += lerp(P0[0], P1[0], u); s.y += lerp(P0[1], P1[1], u * (0.45 + 0.55 * u)) - (v > 0 && v < 1 ? 8 * Math.sin(Math.PI * v) : 0); s.r += lerp(90, -8, u) + (v > 0 ? 8 * E.out(v) : 0);
    });
    A.chip(c, "nervlich zusammengebrochen", "انهيار عصبي", 30, tC, tW);
    A.typed(c, "laut Urteil", 790, 457, 15, tC + 0.25, { parent: c.hud, anchor: "start", halo: 4, per: 0.03 }).hide(tW, 0.15);
    A.chip(c, "Klinikverwaltung", "الإدارة ديال السبيطار", 32, tA, null);
    A.rekon(c, tA);
  } });

  /* ═══════ 15 · LE BUREAU : la feuille, le stylo — et ce n'est pas vrai (b19) — Rekonstruktion, aucune date, aucune parole ═══════
   * Par-dessus l'épaule de quelqu'un qu'on ne voit pas : un fauteuil de dos, une manche de costume. */
  st.scene({ from: "b19", in: "swipe", inDur: 0.42, build(c) {
    const k = X.use(c), m = M.of(c); k.bg();
    const t0 = T("b19"), tOff = Math.max(T("b19@وخلاتها"), t0 + 0.35), tTake = Math.max(T("b19@تسني"), tOff + 0.42), tGot = tTake + 0.3, tP = T("b19@ورقة"), tB = T("b19@بلي"),
      tF = T("b19@formation"), tSg = tF + 0.3, tX = T("b19@هادشي"), tM = T("b19@صحيحش");
    c.camera([{ at: "b19", s: 1, cx: 510, cy: 920 }, { at: "b19+0.1", s: 1.03, cx: 552, cy: 920, d: 3.2, ease: "lin" }]);
    m.obj(D.officeBack, 0, 0, 1, {});
    // le store (cadre fixe, lames qui respirent), la plante sur l'appui, les raies de lumière sur le mur
    const BX = 130, BY = 568;   // revue : 540 → 568 (le haut du store touchait « ورقة ماشي صحيحة »)
    const blF = m.obj(D.blinds, BX, BY, 1, { part: "frame" });
    const blS = c.sk((g, p) => D.blinds(g, p), (t) => ({ part: "slats", open: rnd(0.5 + 0.06 * Math.sin((t / 5) * 6.283), 50) }), BX, BY, 1);
    [blF, blS].forEach((n) => m.build(n, t0 + 0.03, "drop", { dist: 220, dur: 0.45 }));
    const plant = m.obj(D.plant04, 400, BY + 350, 1, {}); m.build(plant, t0 + 0.12, "drop", { dist: 220, dur: 0.45 }); m.sway(plant, 2, 3.4, [400, BY + 350]);
    m.obj(D.blindLight, 440, 650, 1, { w: 160, h: 300 }).on((t, s) => { s.x += 6 * Math.sin((t / 6) * 6.283); }).fade(t0 + 0.3, 0.4);
    // l'étagère de classeurs ; le 7e classeur bascule et se couche contre les autres (swing)
    const BXB = 620, BYB = 560, bnd = m.obj(D.binders, BXB, BYB, 1, { loose: false }); m.build(bnd, t0 + 0.08, "drop", { dist: 240, dur: 0.45 });
    const lean = bnd.out.lean, spine = m.obj(D.binderSpine, BXB + lean[0], BYB + lean[1], 1, {});
    spine.on((t, s) => { s.px = BXB + lean[0]; s.py = BYB + lean[1]; const p = prog(t, t0 + 0.3, 0.35); s.r += -12 * bounce(p); }); m.build(spine, t0 + 0.08, "drop", { dist: 240, dur: 0.45 });
    // sa chaise et elle (scrubs, de profil, assise au bord) : elle prend le stylo, signe, puis pleure
    m.obj(D.chair04, 330, 1300, 1, {});
    const SIGN = [434, 1138], HANDOFF = [452, 1112];
    const signMove = (t) => { const p = prog(t, tSg, 0.5); return p > 0 && p < 1 ? [SIGN[0] - 12 + 26 * p + 2 * Math.sin(t * 61), SIGN[1] + 3 * Math.sin(p * 18) + 2 * Math.sin(t * 47)] : null; };
    const LAP = [413, 1170];   // sa main sur les genoux (Pose.sitEdge), en monde
    const herP = (t) => {
      const p = Object.assign({}, PP.sitEdge, { facing: 1 });
      let lean = 3, h = null;
      if (t >= tTake && t < tGot) { const q = E.inOut(prog(t, tTake, 0.3)); lean = lerp(3, 16, q); h = mixP(LAP, HANDOFF, q); }
      else if (t >= tGot && t < tX + 0.15) { const q = E.inOut(prog(t, tGot, 0.35)); lean = lerp(16, 8, q); h = t < tGot + 0.35 ? mixP(HANDOFF, SIGN, q) : (signMove(t) || SIGN); }
      else if (t >= tX + 0.15) { const q = E.inOut(prog(t, tX + 0.15, 0.4)); lean = lerp(8, 5, q); h = mixP(SIGN, LAP, q); }
      p.torsoLean = rnd(lean, 4);
      if (h) { p.reachR = [rnd(h[0] - 330, 2), rnd(h[1] - 1300, 2)]; p.bendR = -1; }
      return p;
    };
    const her = pp(330, 1300, 1, (t) => doc(Object.assign({}, TENUE.sol, herP(t), {
      expr: t < tTake ? "sad" : t < tX ? "sad" : "cry", tears: rnd(t < tX ? 0.5 : 0.5 + 0.5 * prog(t, tX, 0.4), 10), talk: 0,
      look2: t < tTake ? [0.5, 0.4] : t < tX ? [0.7, 0.5] : [0.3, 0.8], headTilt: t < tX ? 6 : 12, blink: rnd(blinkAt(t, 0.9), 10) })));
    her.on(breathe(0.9));
    // le stylo dans SA main (de b19@تسني + 0,3 à b19@وهادشي) puis posé sur la petite feuille
    c.sk((g, p) => D.pen(g, p), () => ({ angle: -128, len: 70 }), 0, 0, 1).on((t, s) => {
      if (t < tGot) { s.o *= 0; return; }
      if (t < tX + 0.15) { const h = PE.util.rig(doc(Object.assign({}, TENUE.sol, herP(t)))).handR; s.x += 330 + h[0] + 4; s.y += 1300 + h[1] + 10; return; }
      s.x += SIGN[0] + 4; s.y += SIGN[1] + 10; s.px = 0; s.py = 0; s.r += 112 * E.out(prog(t, tX + 0.15, 0.25));
    });
    // le bureau (ses genoux passent dessous), la petite feuille vue de côté, le classeur « Verantwortung »
    const desk = m.obj(D.desk04, 385, 1150, 1, { front: 60 }); m.build(desk, t0 + 0.05, "rise", { dist: 200, dur: 0.45 });
    const small = c.sk((g, p) => D.formSheet(g, p), (t) => ({ small: true, sign: t >= tSg + 0.25 ? 1 : 0 }), 450, 1142, 1);
    small.on((t, s) => { s.o *= t < tP ? 1 : t < tP + 0.4 ? 0.35 : 1; }); m.build(small, t0 + 0.05, "rise", { dist: 200, dur: 0.45 });
    const BXn = (t) => lerp(590, 480, E.inOut(prog(t, tM, 0.5)));
    const bl = m.obj(D.binderLying, 0, 0, 1, {}); bl.on((t, s) => { s.x += BXn(t); s.y += 1150; }); m.build(bl, t0 + 0.06, "rise", { dist: 200, dur: 0.45 });
    // la manche de costume : sort de derrière le fauteuil, tend le stylo, se retire sur le classeur, puis le pousse vers elle
    const SH = [705, 1165];
    const armState = (t) => {
      const toward = (p) => { const dx = p[0] - SH[0], dy = p[1] - SH[1]; return { len: Math.hypot(dx, dy) - 18, angle: (Math.atan2(dy, dx) * 180) / Math.PI }; };
      const ext = toward([HANDOFF[0] + 32 * Math.cos(0.21), HANDOFF[1] + 32 * Math.sin(0.21)]), rest = toward([640, 1125]);
      if (ext.angle < 0) ext.angle += 360;
      let q;
      if (t < tOff) q = { len: 40, angle: 206 };
      else if (t < tGot) q = { len: lerp(40, ext.len, E.out(prog(t, tOff, 0.4))), angle: lerp(206, ext.angle, E.out(prog(t, tOff, 0.4))) };
      else if (t < tM) { const p = E.inOut(prog(t, tGot + 0.05, 0.4)); q = { len: lerp(ext.len, rest.len, p), angle: lerp(ext.angle, rest.angle + 360 * (rest.angle < 0 ? 1 : 0), p) }; }
      else { const end = toward([BXn(t) + 50, 1125]); q = end; if (q.angle < 0) q.angle += 360; }
      return { len: rnd(q.len, 2), angle: rnd(q.angle, 4), pen: t < tGot };
    };
    c.sk((g, p) => D.suitArm(g, p), armState, SH[0], SH[1], 1).on((t, s) => { s.o *= t >= tOff ? 1 : 0; });
    // le fauteuil de l'administration, vu de dos (premier plan) : il pivote un peu
    const chair = m.obj(D.chairBack, 750, 1400, 1, {}); m.build(chair, t0 + 0.1, "rise", { dist: 300, dur: 0.5 }); m.sway(chair, 1.5, 4, [750, 1400]);
    // l'insert : la grande feuille « monte » du bureau et grandit ; la case se tape, la signature s'écrit, puis le tampon
    const IC = [668, 815], IS = 0.92;
    const ins = c.group();
    ins.on((t, s) => { const p = prog(t, tP, 0.4), e = E.back(p); s.o *= t >= tP ? clamp(p * 4, 0, 1) : 0; s.x += lerp(520, IC[0], E.out(Math.min(1, p * 1.6))); s.y += lerp(1142, IC[1], p * p); s.px = 0; s.py = 0; s.s *= lerp(0.3, IS, e); });
    const IG = ins.g;
    const sheet = c.sk((g, p) => D.formSheet(g, p), (t) => ({ sign: rnd(E.inOut(prog(t, tSg, 0.5)), 64), check: t >= tB ? 1 : 0 }), 0, 0, 1, 0, IG);
    void sheet;
    // la ligne « Schulung »Transfusion« erhalten » se tape : un cache papier qui recule de gauche à droite
    const cov = el("rect", { x: -128, y: -1, width: 300, height: 27, fill: "#FFFFFF" });
    c.node(cov, IG).add((t) => { const p = prog(t, tB + 0.06, Math.max(0.2, tF - tB - 0.06)), n = Math.round(31 * p); cov.setAttribute("x", f(-128 + n * 9.6)); cov.setAttribute("width", f(Math.max(0, 300 - n * 9.6))); });
    A.marker(c, -132, 13, 306, tF, { parent: IG, h: 24, rot: 0, dur: 0.3 });
    // le stylo de l'insert suit la signature (qui s'écrit) et tremble (± 2 px)
    const sigPt = (v) => { const n = Math.round(64 * clamp(v, 0, 1)), u = n / 64; return [-122 + 236 * u + 16 * Math.sin(u * Math.PI * 7), 148 - 26 * Math.sin(u * Math.PI * 6.2) * (1 - 0.45 * u) - 9 * Math.sin(u * Math.PI)]; };
    c.sk((g, p) => D.pen(g, p), () => ({ angle: -55 }), 0, 0, 1, 0, IG).on((t, s) => {
      const v = rnd(E.inOut(prog(t, tSg, 0.5)), 64), q = sigPt(v), up = E.out(prog(t, tSg + 0.5, 0.3)), w = t >= tSg && t < tSg + 0.5 ? 2 : 0;
      s.x += q[0] + 22 * up + w * Math.sin(t * 53); s.y += q[1] - 46 * up + w * Math.cos(t * 41); s.o *= t >= tSg - 0.2 && t < tX ? 1 : 0;
    });
    // le « ؟ » de la scène 4 pend encore au coin de la feuille ; à b19@وهادشي sa ficelle est coupée, il tombe
    const CO = [200, -250], tag = c.sk((g, p) => D.loopTag(g, p), () => ({ len: 40 }), CO[0], CO[1] + 67, 1, 0, IG);
    tag.on((t, s) => { s.px = CO[0]; s.py = CO[1]; s.r += pendA(t, tP + 0.3, 12, 3); const q = prog(t, tX + 0.08, 0.45); s.y += 420 * q * q; s.o *= 1 - prog(t, tX + 0.3, 0.2); });
    A.snip(c, CO[0], CO[1] + 6, tX, { parent: IG });
    A.stamp(c, 0, 72, 0.55 / IS, { text: "UNZUTREFFEND", sub: "laut Urteil", size: 44, rot: -10 }, tX, { parent: IG, shake: 8 });
    A.chip(c, "unzutreffende Erklärung", "ورقة ماشي صحيحة", 30, tX, null, { yellow: true, x: 496 });   // à gauche de la mention « Rekonstruktion »
    A.quote(c, "»ihr organisatorisches Versagen … überzubürden« — laut Urteil", "المسؤولية", tX);   // contre-revue : tM → tX (0,4 s de lecture en plus)
    A.rekon(c, t0 + 0.3);
  } });

  /* ═══════ 16 · DES MOIS (b20) : le temps passe par la fenêtre (aucun calendrier, aucune date, aucun médicament) ═══════ */
  st.scene({ from: "b20", in: "swipe", inDur: 0.42, build(c) {
    const k = X.use(c), m = M.of(c); k.bg();
    const t0 = T("b20"), t1 = T("b21"), tMo = T("b20@شهور"), P = (t) => clamp((t - t0 - 0.1) / (t1 - t0 - 0.1), 0, 1);
    c.camera([{ at: "b20", s: 1, cx: 510, cy: 920 }, { at: "b20+0.1", s: 1.03, cx: 550, cy: 920, d: 1.7, ease: "lin" }]);
    m.obj(D.wardRoom, 0, 0, 1, { band: false });
    // la tache de lumière de la fenêtre glisse sur le sol, de gauche à droite, à chaque saison (trois passages)
    const slideL = (t) => [0, 1, 2].reduce((a, i) => a + 30 * E.inOut(prog(t, t0 + 0.2 + i * 0.5, 0.35)), 0);
    m.obj(D.lightPatch, 450, 1314, 1, { w: 300, h: 64, skew: -110, cross: 0.5 }).on((t, s) => { s.x += slideL(t); }).fade(t0 + 0.2, 0.3);
    // la fenêtre des saisons (feuilles, neige, bourgeons) : plus bas que le storyboard, hors de la bande des pastilles
    const WX = 500, WY = 590;
    const sky = c.sk((g, p) => D.seasonWindow(g, p), (t) => ({ part: "sky", p: rnd(P(t), 100), w: 300, h: 330 }), WX, WY, 1);
    const frame = m.obj(D.seasonWindow, WX, WY, 1, { part: "frame", w: 300, h: 330 });
    [sky, frame].forEach((n) => m.build(n, t0 + 0.05, "grow", { pivot: [WX + 150, WY + 165], dur: 0.4 }));
    // la patère : la blouse et le stéthoscope pendus (elle bouge à peine)
    const rack = m.obj(D.coatRack, 240, 1300, 1, { coat: false }); m.build(rack, t0 + 0.1, "rise", { dist: 200, dur: 0.45 });
    const hk = rack.out.hook, coat = m.obj(D.coatHung, 240 + hk[0], 1300 + hk[1], 1, {});
    m.build(coat, t0 + 0.1, "rise", { dist: 200, dur: 0.45 }); m.pend(coat, t0 + 0.55, 4, [240 + hk[0], 1300 + hk[1]], { idle: 1.2 });
    // elle, assise (sweater), tête basse ; à b20@شهور elle relève la tête vers la fenêtre : sad → calm (bouche plate)
    m.obj(D.chair04, 390, 1300, 1, {});
    pp(390, 1300, 1, (t) => {
      const up = E.inOut(prog(t, tMo, 0.5));
      return doc(Object.assign({}, TENUE.mois, PP.sitEdge, { facing: 1, expr: up < 0.5 ? "sad" : "calm", mouth: up >= 0.5 ? "flat" : undefined, talk: 0,
        headTilt: rnd(lerp(16, 4, up), 2), look2: [rnd(lerp(0.2, 0.8, up), 10), rnd(lerp(0.7, -0.2, up), 10)], blink: rnd(blinkAt(t, 2.6), 10), armL: [26, 40], armR: [20, 48] }));
    }).on(breathe(2.6));
    A.quote(c, "»nicht mehr in der Lage, ihrem Beruf nachzugehen« — laut Urteil", "ما بقاتش قادرة تخدم", t0 + 0.15);
    A.chip(c, "über Monate … psychotherapeutische Behandlung", "شهور ديال العلاج", 24, tMo, null);
  } });

  /* ═══════ 17 · RETOUR AU TRIBUNAL : le parquet DEMANDE 90 Tagessätze (b21) — ce n'est pas la peine ═══════ */
  st.scene({ from: "b21", in: "swipe", inDur: 0.42, build(c) {
    X.use(c); const m = M.of(c);
    const t0 = T("b21"), tC = T("b21@للمحكمة"), tN = T("b21@النيابة"), tBe = T("b21@طلبات"), t90 = T("b21@7"), tTs = T("b21@Tagessätze");
    const S = L.salle(c, { at: "b21", expert: true,
      exp: (t) => ({ headTilt: rnd(3 + 9 * Math.sin(Math.PI * prog(t, tC + 0.4, 0.5)), 2) }),
      judges: { SCM: (t) => (t > tN + 0.1 && t < tN + 0.9 ? { reachR: [12, -330], bendR: -1, look2: [0.1, 0.9] } : {}),
        JUG: (t) => ({ look2: t > tN && t < t90 + 0.6 ? [-0.6, 0.15] : [0, 0.6] }), SCF: (t) => ({ expr: t > t90 ? "sad" : "calm" }) } });
    c.camera([{ at: "b21", s: 1, cx: 538, cy: 920 }, { at: "b21+0.1", s: 1, cx: 552, cy: 920, d: 3.0, ease: "lin" }]);   // revue : travelling sans poussée (s 1), cx 570 → 552 : la salle (elle à gauche, la chaise de l’expert à droite) tient entre x 92 et 912
    // elle, derrière sa table : elle pleure (épaules secouées) ; à b21 + 0,5 elle s'essuie les yeux
    const base = doc(Object.assign({}, TENUE.tribunal, PP.stand, { view: "three-quarter", facing: 1, headTilt: 10 })), eye = PE.util.rig(base).eyes[1];
    const W0 = t0 + 0.5, wipe = (t) => Math.sin(Math.PI * prog(t, W0, 0.7));
    const her = pp(205, 1300, 1, (t) => {
      const p = Object.assign({}, base, { expr: "cry", tears: 1, talk: 0, blink: rnd(blinkAt(t, 2), 10), armL: [-6, 10], armR: [4, -12] }), w = wipe(t);
      if (w > 0.01) { p.reachR = mixP([28, -170], [eye[0] - 8, eye[1] + 14], E.inOut(clamp(w * 1.4, 0, 1))); p.bendR = -1; }
      return p;
    }, S.actors.g);
    her.on(breathe(2)).on((t, s) => { const q = (t - t0) % 1.6; if (q < 0.7) s.y += 2.2 * Math.sin(q * 40) * (1 - q / 0.7); });
    // la carte tapée À BORD EN POINTILLÉS (= une demande) : elle tombe, ses trois lignes se tapent
    const holder = el("g", { transform: "translate(495 1120) rotate(-2)" }), card = c.node(holder);
    D.typedCard(el("g", {}, holder), { w: 390, h: 240, dashed: true });
    m.build(card, tN, "drop", { dist: 420, dur: 0.45 });
    const L1 = tN + 0.42, L3 = Math.max(tBe, L1 + 0.45), L2 = Math.max(t90, L3 + 0.3);
    card.on((t, s) => { [L1, L3, L2].forEach((a) => { const p = prog(t, a, 0.12); if (p > 0 && p < 1) s.y += 2 * Math.sin(Math.PI * p); }); });
    tape(c, "Staatsanwaltschaft:", 0, -52, 22, L1, 0.4, { parent: holder });
    tape(c, "90 Tagessätze", 0, 16, 46, L2, 0.3, { parent: holder });
    tape(c, "— beantragt —", 0, 70, 22, L3, 0.3, { parent: holder });
    A.chip(c, "Amtsgericht Köln · 16.05.2012", "المحكمة الابتدائية ديال Köln", 28, tC, tN - 0.12);
    A.chip(c, "Staatsanwaltschaft", "النيابة العامة", 32, tN, t90 - 0.12);
    A.chip(c, "90 Tagessätze · beantragt", "غرامة بالأيام · طلب، ماشي حكم", 28, t90, null);
    c.kick(t90, 0.06);
    A.quote(c, "1 Tagessatz ≈ 1 Tag Nettoeinkommen", "نهار = الدخل ديال نهار", t90 + 0.1);   // contre-revue : tTs → b21@7 + 0,1 (elle n'était lisible que 0,4 s)
  } });

  /* ═══════ 18 · 19 · 20 — LA BALANCE (b22 · b23 · b24) : l'explication juridique en image ═══════
   * Plateau gauche = la faute, plateau droit = la peine. Une seule fonction pour les trois scènes : le bloc « SCHULDIG » s'ouvre en quatre
   * tranches (les défauts de l'organisation) tirées par le bas une à une vers le chariot « Klinikverwaltung » ; le petit poids « 1 » reste ;
   * le poids « 90 » demandé (pointillés) n'est jamais posé et se dissout ; trois cailloux (ce qu'elle a déjà subi) remplissent la peine. */
  const ICONS = ["hours", "licence", "twins", "sheet"];
  /* caméra des scènes 18–20 : un peu plus large que l'accroche (×0,94, cy 954) — sinon le fléau passe sous l'arabe des pastilles (en haut)
   * et la barre de la sellette sous la bande des citations (en bas) : les deux ne tiennent pas ensemble à ×1,03. Seule la respiration du
   * cadrage global pousse la caméra (pas de zoom : tout reste dans le cadre). */
  const CAM_B = (b) => [{ at: b, s: 0.94, cx: 552, cy: 954 }, { at: b + "+0.1", s: 0.94, cx: 558, cy: 954, d: Math.max(1, T(X.BEAT_IDS[X.BEAT_IDS.indexOf(b) + 1]) - T(b) - 0.1), ease: "lin" }];
  const balance3 = (c, no) => {
    const m = M.of(c);
    const tD = ["b22@يعني", "b22@غلطة", "b22@كبيرة", "b22@التنظيم"].map(T), tSaw = T("b22@شافت"), tSwap = tSaw + 0.34, tOrg = T("b22@Organisationsverschulden"),
      t23 = T("b23"), tSch = T("b23@المسؤولية"), t24 = T("b24"), tGone = T("b24@عقبتهاش"), tPeb = ["b24@كتبت", "b24@genug", "b24@bestraft"].map(T), tGen = T("b24@genug"), t60 = T("b24@كافي");
    const B = L.balance(c, { at: null, extras: true, weight: { drop: "b22", gone: (t) => E.inOut(prog(t, tGone, 0.5)) }, cart: { arrive: "b22@المحكمة" }, counter: A.COUNTER_LAND });
    const G = (t) => B.geom(t), sw = (t, side) => A.tilt(t)[side === "L" ? "swL" : "swR"];
    // un point posé sur un plateau, décalé de (dx, dy) dans le repère du plateau (qui se balance)
    const onPan = (t, side, dx, dy) => { const g = G(t), p = side === "L" ? g.panL : g.panR, a = (-sw(t, side) * Math.PI) / 180; return [p[0] + dx * Math.cos(a) - dy * Math.sin(a), p[1] + dx * Math.sin(a) + dy * Math.cos(a)]; };
    const tagAt = (t, side, dy) => { const g = G(t), p = side === "L" ? g.tagL : g.tagR; return [p[0], p[1] + dy]; };
    // l'étiquette « beantragt » tombe et disparaît quand le poids se dissout (scène 20)
    B.tag.on((t, s) => { const q = prog(t, tGone + 0.1, 0.5); s.y += 320 * q * q; s.o *= 1 - prog(t, tGone + 0.3, 0.3); });
    // elle, derrière la barre : cry → lève les yeux (18) → sad, hoche la tête (19) → yeux fermés, calm, larmes (20)
    const base = doc(Object.assign({}, TENUE.tribunal, { view: "three-quarter", facing: 1, talk: 0, reachL: [-46, -190], reachR: [46, -190], bendL: 1, bendR: -1 }));
    pp(215, 1500, 1.05, (t) => {
      let ex = "cry", tears = 1, look = [0.4, 0.3], tilt = 6, blink = rnd(blinkAt(t, 1), 10);
      if (t >= tOrg && t < t23) { ex = "worried"; tears = 0.8; look = t < tD[0] ? [0.6, -0.6] : [0.9, 0.05]; tilt = 0; }
      else if (t >= t23 && t < t24) { ex = "sad"; tears = 0.6; look = [0.6, -0.2]; tilt = rnd(4 + 3 * Math.sin((t - t23) * 2.2) + 9 * Math.sin(Math.PI * prog(t, tSch, 0.6)), 2); if (t >= tSch && t < tSch + 0.7) blink = 1; }
      else if (t >= t24) { ex = t < tGen ? "sad" : "calm"; tears = t < tGen ? 0.5 : 0.8; look = [0.5, 0.1]; tilt = rnd(t < t60 ? 4 : 4 + 4 * E.out(prog(t, t60, 0.5)), 2); if (t >= tGen) blink = 1; }
      return Object.assign({}, base, { expr: ex, tears, look2: look, headTilt: tilt, blink });
    }, B.actors.g).on(breathe(1)).on((t, s) => { s.y += 4 * E.out(prog(t, t60, 0.5)); });
    // le bloc « SCHULDIG » (scène 18 jusqu'à b22@شافت) : un trait de surligneur le balaie, ses quatre joints apparaissent
    const blk = c.sk((g, p) => D.guiltBlock(g, p), (t) => ({ seams: rnd(E.inOut(prog(t, tSaw + 0.05, 0.3)), 20) }), 0, 0, 1);
    blk.on((t, s) => { const q = onPan(t, "L", 0, 0); s.x += q[0]; s.y += q[1]; s.px = 0; s.py = 0; s.r += -sw(t, "L"); s.o *= t < tSwap ? 1 : 0; });
    const hl = A.marker(c, -84, -52, 168, tSaw, { h: 112, rot: 0, dur: 0.3, op: 0.45 });
    hl.on((t, s) => { const q = onPan(t, "L", 0, 0); s.x += q[0]; s.y += q[1]; s.o *= 1 - prog(t, tSwap, 0.25); });
    // les quatre tranches, tirées par le BAS une à une : la pile au-dessus retombe (rebond), la tranche sort, décrit un arc et se pose sur
    // le chariot (760, 1117 − 26·i), au-dessus du compteur ; le petit poids « 1 » est au sommet de la pile et finit seul sur le plateau
    const fell = (j, t) => bounce(prog(t, tD[j] + 0.06, 0.18));
    const level = (i, t) => { let n = i; for (let j = 0; j < Math.min(i, 4); j++) n -= fell(j, t); return n; };
    ICONS.forEach((icon, i) => {
      const n = c.sk((g, p) => D.slab(g, p), () => ({ icon }), 0, 0, 1), dst = [760, 1117 - 26 * i];
      n.on((t, s) => {
        s.px = 0; s.py = 0;
        if (t < tSwap) { s.o *= 0; return; }
        if (t < tD[i]) { const q = onPan(t, "L", 0, -13 - 26 * level(i, t)); s.x += q[0]; s.y += q[1]; s.r += -sw(t, "L"); return; }
        const u = prog(t, tD[i], 0.45);
        if (u < 1) {
          const p0 = onPan(tD[i], "L", 0, -13), out = E.out(clamp(u / 0.22, 0, 1)), a0 = [p0[0] + 36 * out, p0[1] - 30 * out], v = clamp((u - 0.22) / 0.78, 0, 1), e = E.inOut(v);
          const c1 = [a0[0] + 0.3 * (dst[0] - a0[0]), a0[1] + 50];   // trajet bas : la tranche passe sous l'arabe du plateau de la peine
          s.x += (1 - e) ** 2 * a0[0] + 2 * (1 - e) * e * c1[0] + e * e * dst[0]; s.y += (1 - e) ** 2 * a0[1] + 2 * (1 - e) * e * c1[1] + e * e * dst[1]; s.r += -10 * Math.sin(Math.PI * v);
          return;
        }
        s.x += dst[0]; s.y += dst[1] - 3 * Math.sin(Math.PI * prog(t, tD[i] + 0.45, 0.15));
      });
    });
    const core = c.sk((g) => D.coreWeight(g), () => ({}), 0, 0, 1);
    core.on((t, s) => { s.px = 0; s.py = 0; const q = onPan(t, "L", 0, -26 * level(4, t)); s.x += q[0]; s.y += q[1]; s.r += -sw(t, "L"); s.o *= t >= tSwap ? 1 : 0; });
    core.pop(tSwap, 0.3, 0.6);
    // sous les plaquettes : « الغلطة » (→ « مذنبة » à b23@مذنبة) et « العقوبة » (→ « الإعفاء من العقوبة » à b24@كافي) ; elles suivent les plateaux
    const under = (txt, side, dy, size, cls, from, to) => {
      const n = A.halo(c.text(txt, 0, 0, size, cls, "middle"), 7);
      n.on((t, s) => { const q = tagAt(t, side, dy); s.x += q[0]; s.y += q[1]; s.o *= t >= from && (to == null || t < to) ? 1 : 0; });
      return n;
    };
    under("الغلطة", "L", 56, 28, "ar strong", -1e9, tSch).pop(T("b22") + 0.2, 0.35);
    under("مذنبة", "L", 74, 44, "ttl", tSch, null).pop(tSch + 0.3, 0.4);
    under("العقوبة", "R", 56, 28, "ar strong", -1e9, t60).pop(T("b22") + 0.2, 0.35);
    under("الإعفاء من العقوبة", "R", 66, 30, "ar strong", t60, null).pop(t60 + 0.2, 0.35);
    // les tampons sur les plaquettes (ils suivent les plateaux) : SCHULDIG à b23@مذنبة, § 60 StGB à b24@كافي
    const onTag = (n, side, dy, dx) => n.on((t, s) => { const q = tagAt(t, side, dy); s.x += q[0] + (dx || 0); s.y += q[1]; s.px = 0; s.py = 0; s.r += -sw(t, side); });
    onTag(A.stamp(c, 0, 0, 0.4, { text: "SCHULDIG", size: 48, rot: -6 }, tSch, { shake: 8 }), "L", 0);
    onTag(A.stamp(c, 0, 0, 0.4, { text: "§ 60 StGB", sub: "ABSEHEN VON STRAFE", size: 56, rot: -5 }, t60, { shake: 8 }), "R", 0, -26);   // décalé à gauche : la fenêtre du rouleau reste visible (« 0 »)
    // trois cailloux (l'effondrement, les mois, la blouse) tombent sur le plateau de la peine (scène 20)
    [["crack", -42, 2301], ["leaf", 0, 2302], ["coat", 42, 2303]].forEach(([icon, dx, seed], i) => {
      const a = tPeb[i];
      c.sk((g, p) => D.pebble(g, p), () => ({ icon, seed }), 0, 0, 1).on((t, s) => {
        s.px = 0; s.py = 0; if (t < a) { s.o *= 0; return; }
        const p = prog(t, a, 0.4), q = onPan(t, "R", dx, 1); s.x += q[0]; s.y += q[1] - 260 * (1 - bounce(p)); s.r += -sw(t, "R") + (dx >= 0 ? 10 : -10) * E.out(p);
      });
    });
    // la plaque du chariot reçoit un trait de surligneur (b22@الإدارة)
    A.marker(c, 664, 1209, 192, "b22@الإدارة", { h: 22, rot: 0 });
    void no; void m;
    return { B, G, onPan, tagAt, core };
  };

  /* ═══════ 18 · LA BALANCE 1 : Organisationsverschulden (b22) ═══════ */
  st.scene({ from: "b22", in: "cut", inDur: 0, build(c) {
    X.use(c);
    const tSaw = T("b22@شافت"), tOrg = T("b22@Organisationsverschulden");
    balance3(c, 18);
    c.camera(CAM_B("b22"));
    A.chip(c, "90 Tagessätze · beantragt", "غرامة بالأيام · طلب، ماشي حكم", 28, T("b22") + 0.05, tSaw, { y: 398 });
    // la pastille attend que le compteur du HUD soit passé (il vole de la bande du haut jusqu'au chariot, à travers sa place)
    A.chip(c, "Organisationsverschulden", "غلطة فالتنظيم", 34, tOrg + 0.42, null, { yellow: true, y: 398 });
    c.kick(tOrg, 0.06); c.kick("b22@الإدارة", 0.05);
    A.quote(c, "»gravierendes Organisationsverschulden der Krankenhausverwaltung« — laut Urteil", "غلطة كبيرة فالتنظيم، ديال الإدارة", "b22@التنظيم");
  } });

  /* ═══════ 19 · LA BALANCE 2 : sa faute, petite — et pourtant coupable (b23) ═══════ */
  st.scene({ from: "b23", in: "cut", inDur: 0, build(c) {
    X.use(c); const m = M.of(c);
    const tS = T("b23@صغيرة"), tT = T("b23@تأكداتش"), tDk = T("b23@داكشي"), tSch = T("b23@المسؤولية");
    const R = balance3(c, 19);
    c.camera(CAM_B("b23"));
    const follow = (n, dx, dy) => n.on((t, s) => { const q = R.onPan(t, "L", dx, dy); s.x += q[0]; s.y += q[1]; });
    // un cercle jaune se trace autour du petit poids resté seul ; il pulse une fois
    follow(A.ring(c, 0, 0, 44, 36, "b23@والغلطة", { dur: 0.35 }), 0, -24);
    R.core.pulse(T("b23@والغلطة") + 0.3, 0.45, 0.22);
    // le contour en pointillés de l'ancien bloc : on mesure ce qui a été retiré
    const ghost = el("g"); el("path", { d: "M-75 -104 L75 -104 L75 0 L-75 0 Z M-75 -104 L-65 -113 L85 -113 L85 -9 L75 0 M75 -104 L85 -113", fill: "none", stroke: INK, "stroke-width": 3, "stroke-dasharray": "9 8", "stroke-linecap": "round", "stroke-linejoin": "round" }, ghost);
    follow(c.node(ghost), 0, 0).on((t, s) => { s.o *= t < tS ? 0 : Math.min(1, (t - tS) / 0.15) * (1 - prog(t, tS + 0.2, 0.8)); });
    // au-dessus du petit poids : une poche et une loupe (« pas assez bien vérifié la poche »)
    follow(c.sk((g, p) => D.checkIcon(g, p), () => ({}), 0, 0, 1), 0, -84).pop(tT + 0.1, 0.4);
    // une petite flèche jaune : le plateau gauche reste un peu plus bas
    const ar = el("g"); el("path", { d: "M0 -34 L0 10 M-14 -4 L0 14 L14 -4", fill: "none", stroke: INK, "stroke-width": 10, "stroke-linecap": "round", "stroke-linejoin": "round" }, ar);
    el("path", { d: "M0 -34 L0 10 M-14 -4 L0 14 L14 -4", fill: "none", stroke: YEL, "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, ar);
    follow(c.node(ar), -112, -40).on((t, s) => { s.y += 4 * Math.sin((t - tDk) * 6); }).pop(tDk, 0.35);
    A.quote(c, "»am untersten Rand des Denkbaren« — laut Urteil", "أصغر غلطة ممكنة", tS);
    A.chip(c, "Überprüfung der Blutkonserve: nicht sorgfältig genug", "ما تأكداتش مزيان من الـpoche", 24, tT, null, { y: 398 });
    c.kick(tSch, 0.06);
    void m;
  } });

  /* ═══════ 20 · LA BALANCE 3 : genug bestraft — § 60 (b24) : la balance revient à l'équilibre ═══════ */
  st.scene({ from: "b24", in: "cut", inDur: 0, build(c) {
    X.use(c);
    const tGen = T("b24@genug");
    balance3(c, 20);
    c.camera(CAM_B("b24"));
    A.chip(c, "genug bestraft", "اللي داز عليها كافي", 36, tGen, null, { yellow: true, y: 398 });
    A.typed(c, "laut Urteil", 712, 405, 15, tGen + 0.25, { parent: c.hud, anchor: "start", halo: 4, per: 0.03 });
    c.kick("b24@كافي", 0.07);
  } });
});
