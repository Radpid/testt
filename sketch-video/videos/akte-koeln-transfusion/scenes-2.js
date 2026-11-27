/* scenes-2.js — PARTIE 2 (storyboard.md § 4, scènes 7 à 13) : le samedi soir dans le couloir (> 12 h), le tableau du personnel
 * (débutante, 9 mois, pas de Blutführerschein), le passe-plat du labo (deux poches pareilles), le Begleitdokument, puis la chambre
 * (21:50 · 0 contre A · dimanche 13:37, muette). Mise en place fixe : X.lieux.chambre (scènes 11–13). Aides : X.aides (story.js).
 * Repères numériques par RANG : b8@6 = « 12 », b9@6 = « 9 », b13@6 = « 63 », b14@2 = « 0 », b14@4 = « A », b15@3 = « 10 ».
 */
(window.EP_PARTS = window.EP_PARTS || []).push(function (X) {
  "use strict";
  const { st, T, E, prog, lerp, clamp, el, U, PE, PP, D, M, CAST, TENUE, kit, blinkAt, rnd, breathe, aides: A, lieux: L } = X;
  const f = (v) => Math.round(v * 10) / 10, INK = "#1C1A1C", PAPER = "#F7F7F1";
  const doc = (p) => Object.assign({}, CAST.DOC, TENUE.hopital, p);
  // texte .tw tapé lettre par lettre (même aide que scenes-1.js) ; o.halo = contour papier
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
  const blink2 = (t, a, hz) => (t < a ? 0 : Math.floor((t - a) * 2 * (hz || 2)) % 2 ? 0.3 : 1);   // voyant qui clignote
  // marche calée sur la distance (aucune glissade) : renvoie la pose Persona du moment
  const gait = (x, x0, s, facing) => Object.assign({}, PP.walk(rnd(A.stride(x - x0, s, facing), 16)), { view: "side", facing });
  // niveau de la poche et sang dans la tubulure (scènes 11–12) : la roulette s'ouvre à b13@poche+0.2, elle est fermée à b15@ووقفو
  const OPEN = () => T("b13@poche") + 0.2, STOP = () => T("b15@ووقفو");
  const bagLevel = (t) => lerp(1, 0.67, clamp((t - OPEN()) / (STOP() - OPEN()), 0, 1));
  const tubeFill = (t) => clamp((t - OPEN()) / 2.5, 0, 1);

  /* ═══════ 7 · SAMEDI SOIR, LE COULOIR : plus de 12 heures (b8) ═══════ */
  st.scene({ from: "b8", in: "swipe", inDur: 0.42, build(c) {
    const k = X.use(c), m = M.of(c); k.bg();
    const t0 = T("b8"), t1 = T("b9"), t5 = T("b8@5"), tD = T("b8@دازت"), tK = T("b8@كثر");
    // revue : cy 905 et citation 40 px plus bas (o.dy) : ses pieds restent au-dessus de la citation, le voyant de la porte 2 sous l'arabe de la pastille
    c.camera([{ at: "b8", s: 1, cx: 500, cy: 905 }, { at: "b8+0.1", s: 1.03, cx: 580, cy: 905, d: 2.1, ease: "lin" }]);
    // le couloir ; la nuit monte dans les angles (deuxième tracé identique, « nuit », en fondu)
    const DOORS = [{ x: 200, num: 1 }, { x: 480, num: 2 }, { x: 760, num: 3 }];
    const wall = m.obj(D.corridor04, 0, 0, 1, { doors: DOORS, night: 0 });
    m.obj(D.corridor04, 0, 0, 1, { doors: DOORS, night: 1 }).on((t, s) => { s.o *= E.inOut(prog(t, t0 + 0.3, t1 - t0 - 0.3)); });
    // voyants d'appel (jaunes) au-dessus des portes : 1 à b8+0.35, 2 à b8@دازت, 3 à b8@كثر ; ils clignotent à 2 Hz
    [t0 + 0.35, tD, tK].forEach((a, i) => { const [x, y] = wall.out.calls[i]; c.sk((g, p) => D.callLight(g, p), (t) => ({ on: blink2(t, a, 2) }), x, y, 1).pop(a, 0.25); });
    // appliques entre les portes (elles s'allument, le halo vacille) ; horloge dont les aiguilles tournent vite (9 h 30 → 21 h 45)
    [[415, t0 + 0.7], [695, t0 + 1.1]].forEach(([x, a], i) => { const n = c.sk((g, p) => D.sconce(g, p), (t) => ({ on: t < a ? 0 : rnd(0.94 + 0.06 * Math.sin(t * 11 + i * 2), 20) }), x, 640, 1); m.build(n, t0 + 0.05 + i * 0.06, "drop", { dist: 120, dur: 0.35 }); });
    const ck = (t) => ({ time: lerp(9.5, 21.75, prog(t, t0, t1 - t0)), s: Math.round(t * 30) * 12 % 360 });
    const face = c.sk((g, p) => D.clock04(g, p), () => ({ part: "face" }), 850, 520, 1), hands = c.sk((g, p) => D.clock04(g, p), (t) => Object.assign({ part: "hands" }, ck(t)), 850, 520, 1);
    [face, hands].forEach((n) => m.build(n, t0 + 0.1, "grow", { pivot: [850, 520], dur: 0.4 }));
    // elle : marche pressée (x −60 → 690), puis de face entre les portes 2 et 3, regarde à gauche puis à droite, sueur, worried
    const XA = t0 + 0.05, XB = 690, xAt = (t) => lerp(-60, XB, clamp((t - XA) / (t5 - XA), 0, 1));
    A.ppC(0, 0, 0.95, (t) => {
      const x = xAt(t), mv = t > XA && t < t5;
      const p = mv ? Object.assign(gait(x, -60, 0.95, 1), { look2: [0.4, -0.5 + 0.3 * Math.sin(t * 5)] })
        : Object.assign({}, PP.stand, { view: "front", facing: 1, look2: [rnd(t < t5 ? 0.4 : -0.8 + 1.6 * E.inOut(prog(t, t5 + 0.1, 0.5)), 10), -0.2] });
      return A.tired(t, doc(Object.assign(p, { expr: t < tK ? "focused" : "worried", talk: 0, blink: rnd(blinkAt(t, 0.7), 10) })));
    }).on((t, s) => { s.x += xAt(t); s.y += 1300; }).on(breathe(0.7));
    A.quote(c, "»mit Notfallpatienten mehr oder weniger allein« — laut Urteil", "تقريبا بوحدها", "b8@بالليل", { dy: 40 });
    A.chip(c, "mehr als 12 Stunden", "كثر من 12 ساعة", 32, tK, null, { yellow: true });
    c.kick("b8@6", 0.06);
  } });

  /* ═══════ 8 · LE TABLEAU DU PERSONNEL : débutante, 9 mois, pas de Blutführerschein (b9–b10) ═══════ */
  st.scene({ from: "b9", in: "swipe", inDur: 0.42, build(c) {
    const k = X.use(c), m = M.of(c); k.bg();
    const t0 = T("b9"), t10 = T("b10"), t9 = T("b9@6"), tAs = T("b9@Assistenzärztin"), tB = T("b10@Blutführerschein"), tY = T("b9@شهور");
    c.camera([{ at: "b9", s: 1, cx: 520, cy: 920 }, { at: "b9+0.1", s: 1.02, cx: 560, cy: 920, d: 3.0, ease: "lin" }, { at: "b10", s: 1.05, cx: 565, cy: 940, d: 0.5 }]);
    m.obj(D.corridor04, 0, 0, 1, { doors: [], night: 1 });
    c.sk((g, p) => D.sconce(g, p), (t) => ({ on: rnd(0.94 + 0.06 * Math.sin(t * 9), 20) }), 180, 600, 1);
    // le tableau et tout ce qui y est fixé tombent ensemble
    const board = c.group(), BG = board.g; m.build(board, t0 + 0.03, "drop", { dist: 260, dur: 0.45 });
    c.sk((g, p) => D.dutyBoard(g, p), () => ({ w: 610, h: 620, tray: false, magnets: [[44, 560], [88, 572], [566, 562]] }), 330, 540, 1, 0, BG);
    A.halo(c.text("TEAM", 635, 590, 24, "tw", "middle", BG), 4).hide(t10 - 0.2, 0.2);
    // 9 mois : grille 3 × 3 de cases numérotées, qui se noircissent une à une (le geste de la frise des heures) ; elle frémit (± 1°)
    const MG = c.group(BG); m.sway(MG, 1, 2.6, [760, 646]);
    c.sk((g, p) => D.hourGrid(g, p), () => ({ cols: 3, rows: 3, cell: 46 }), 691, 646, 1, 0, MG.g);
    for (let i = 0; i < 9; i++) {
      const x = 691 + (i % 3) * 46, y = 646 + Math.floor(i / 3) * 46;
      c.sk((g, p) => D.monthCell(g, p), () => ({ num: i + 1, fill: 0 }), x, y, 1, 0, MG.g);
      c.sk((g, p) => D.monthCell(g, p), () => ({ num: i + 1, fill: 1 }), x, y, 1, 0, MG.g).wipe(t9 + i * 0.07, 0.07, "down");
    }
    tape(c, "9 Monate", 760, 850, 26, t9 + 0.7, 0.3, { parent: BG });
    A.halo(c.text("9 شهور", 760, 892, 28, "ar strong", "middle", BG), 5).wipe(t9 + 0.95, 0.35, "rtl");
    // le Blutführerschein : pochette vide (contour pointillé) ; la carte apparaît 0,15 s puis redevient fantôme
    c.sk((g, p) => D.licenceCard(g, p), (t) => ({ ghost: t >= tB && t < tB + 0.15 ? 0 : t < tB ? 1 : rnd(prog(t, tB + 0.15, 0.4), 10), glint: rnd(((t / 3) % 1), 20) }), 640, 1040, 1, 0, BG);
    tape(c, "Schulung: Transfusion", 640, 925, 18, "b10@formation", 0.4, { parent: BG, halo: 4 });
    const nn = el("g", { transform: "translate(640 1052) rotate(-4)" }, BG);
    tape(c, "noch nicht erhalten", 0, 0, 24, tB + 0.35, 0.45, { parent: nn, halo: 6 });
    A.ring(c, 640, 1046, 182, 102, "b10@ناقصاها", { dur: 0.35 });
    // sa fiche du personnel sur la punaise (470, 620) : sa tête en photo, bande jaune VIERGE, deux lignes tapées ; elle se balance
    const card = c.group(BG); m.build(card, t0 + 0.5, "swing", { pivot: [470, 620], deg: -30, dur: 0.5 }); m.pend(card, t0 + 0.9, 3, [470, 620], { idle: 0.5 });
    c.sk((g, p) => D.staffCard(g, p), () => ({}), 470, 620, 1, 0, card.g);
    c.sk((g, p) => PE.head(g, p), () => Object.assign({}, CAST.DOC, { view: "front", expr: "neutral", talk: 0 }), 470, 728, 0.5, 0, card.g);
    tape(c, "Assistenzärztin", 470, 840, 20, tAs, 0.4, { parent: card.g });
    tape(c, "seit 15.10.2010", 470, 872, 18, tAs + 0.5, 0.4, { parent: card.g });
    A.marker(c, 386, 866, 168, "b9@السبيطار", { parent: card.g, h: 16, rot: 0 });
    // elle entre (x −80 → 235), puis trois quarts : bâille à b9@شهور ; à b10@Blutführerschein elle baisse les yeux et tâte sa poche
    const XA = t0 + 0.05, XB = t0 + 0.85, xAt = (t) => lerp(-80, 255, clamp((t - XA) / (XB - XA), 0, 1)), S8 = 1;   // revue : 255 (coude dans la marge à 235)
    const st0 = Object.assign({}, CAST.DOC, TENUE.hopital, PP.stand, { view: "three-quarter", facing: 1 }), R0 = PE.util.rig(st0);
    const pocket = [rnd(R0.belly[0] + 30, 2), rnd(R0.hip[1] + 14, 2)];
    A.ppC(0, 0, S8, (t) => {
      const x = xAt(t), mv = t > XA && t < XB, pat = t >= tB + 0.1 && t < tB + 1.1;
      const p = mv ? gait(x, -80, S8, 1) : Object.assign({}, PP.stand, { view: "three-quarter", facing: 1, look2: t >= tB ? [0.7, 0.5] : [0.6, -0.3] });
      if (pat) { const q = (t - tB - 0.1) / 0.5; p.reachR = [pocket[0], rnd(pocket[1] - 4 * Math.abs(Math.sin(q * Math.PI * 2)), 2)]; p.bendR = -1; }
      const yawn = t >= tY && t < tY + 0.5;
      return A.tired(t, doc(Object.assign(p, { expr: t >= tB ? "worried" : "calm", talk: 0, mouth: yawn ? "o" : undefined, blink: yawn ? 1 : rnd(blinkAt(t, 2.3), 10) })));
    }).on((t, s) => { s.x += xAt(t); s.y += 1300; }).on(breathe(2.3));
    A.chip(c, "Assistenzärztin", "طبيبة مقيمة", 34, tAs, T("b9@عاد") - 0.12);
    A.chip(c, "Berufsanfängerin", "عاد بدات", 32, "b9@عاد", t10);
    A.chip(c, "Blutführerschein", "« رخصة » ديال الدم", 34, tB, null, { yellow: true });
    A.quote(c, "»Diese Schulung hatte die Angeklagte … noch nicht erhalten« — laut Urteil", "مازال ناقصاها", "b10@ناقصاها");
    c.kick(tB, 0.06);
  } });

  /* ═══════ 9 · LE PASSE-PLAT DU LABO : deux poches pareilles, en une fois (b11) — Rekonstruktion ═══════ */
  st.scene({ from: "b11", in: "swipe", inDur: 0.42, build(c) {
    const k = X.use(c), m = M.of(c); k.bg();
    const t0 = T("b11"), tG = T("b11@عطاها"), tP = T("b11@poches"), tI = T("b11@بحال"), tF = T("b11@فدقة"), tL = T("b11@لجوج");
    c.camera([{ at: "b11", s: 1, cx: 500, cy: 920 }, { at: "b11+0.1", s: 1.03, cx: 570, cy: 920, d: 3.0, ease: "lin" }]);
    m.obj(D.corridor04, 0, 0, 1, { doors: [], night: 1 });
    // le passe-plat (ouverture x 440–860, y 660–920) : l'intérieur (vitre dépolie, ombre, frigo à diode), le volet qui remonte, la façade
    const shX = (t) => lerp(240, 40, E.inOut(prog(t, t0 + 0.3, tG - t0 - 0.3)));
    c.sk((g, p) => D.labHatch(g, p), (t) => ({ part: "inside", shadowX: Math.round(shX(t)), shadow: rnd(1 - 0.7 * prog(t, tG, 0.8), 10), diode: Math.floor(t) % 2 ? 0.25 : 1 }), 440, 760, 1);
    c.sk((g, p) => D.labHatch(g, p), (t) => ({ part: "shutter", shutter: rnd(1 - E.inOut(prog(t, t0 + 0.07, 0.38)), 20) }), 440, 760, 1);
    const front = m.obj(D.labHatch, 440, 760, 1, { part: "front", sign: false });
    const sgl = (t) => (t < t0 + 0.2 ? 1 : (t > t0 + 0.28 && t < t0 + 0.34) || (t > t0 + 0.42 && t < t0 + 0.47) ? 0.15 : rnd(0.92 + 0.08 * Math.sin(t * 7), 20));
    const sign = c.sk((g, p) => D.labSign(g, p), (t) => ({ glow: sgl(t) }), 440 + front.out.sign[0], 760 + front.out.sign[1], 1); m.build(sign, t0 + 0.03, "drop", { dist: 160, dur: 0.35 });
    c.sk((g, p) => D.callLight(g, p), (t) => ({ on: rnd(0.6 + 0.4 * Math.sin(t * 3.1), 10) }), 440 + front.out.lamp[0], 760 + front.out.lamp[1], 1);
    // le portoir glisse sur la tablette (x 760 → 580) avec les deux poches IDENTIQUES et le « ؟ » ; elles se balancent ensemble
    const rx = (t) => lerp(760, 580, E.inOut(prog(t, t0 + 0.3, tG - t0 - 0.3))), jolt = (t) => 4 * Math.sin(Math.PI * prog(t, tF, 0.2));
    const RK = c.group(); RK.on((t, s) => { s.x += rx(t) - 580; s.y -= jolt(t); });
    const RY = 1020, rack = c.sk((g, p) => D.rack(g, p), () => ({}), 580, RY, 1, 0, RK.g);
    const ang = (t) => pendA(t, t0 + 0.3, 3, 0.6) + pendA(t, tG, 8, 0, 0) + pendA(t, tF, 4, 0);
    rack.out.hooks.forEach(([hx, hy]) => {
      const x = 580 + hx, y = RY + hy + 6;
      c.sk((g, p) => D.bloodBag(g, p), (t) => ({ level: 0.95, sway: rnd(t * 2.2, 5), slope: rnd(ang(t), 2) }), x, y, 0.62, 0, RK.g).on((t, s) => { s.px = x; s.py = y; s.r += ang(t); });
    });
    const [px, py] = [580 + rack.out.post[0], RY + rack.out.post[1]];
    const tag = c.sk((g, p) => D.loopTag(g, p), () => ({ len: 34 }), px, py + 61, 1, 0, RK.g);
    tag.on((t, s) => { s.px = px; s.py = py; s.r += pendA(t, t0 + 0.3, 10, 3); const q = prog(t, tP + 0.05, 0.45); s.y += 420 * q * q; s.o *= 1 - prog(t, tP + 0.3, 0.2); });
    A.snip(c, px, py + 10, "b11@poches", { parent: RK.g });
    // bien pareilles : un cercle autour de chaque poche, puis « = »
    A.ring(c, 530, 952, 44, 70, tI, { dur: 0.2 }).hide(tF, 0.2);
    A.ring(c, 630, 952, 44, 70, tI + 0.2, { dur: 0.2 }).hide(tF, 0.2);
    A.halo(c.text("=", 580, 980, 60, "de", "middle"), 6).pop(tI + 0.4, 0.25).hide(tF + 0.6, 0.2);
    // deux lits, deux flèches en pointillés qui ne se croisent pas
    [[600, 1215, 1, [530, 1013]], [760, 1215, 2, [630, 1013]]].forEach(([x, y, num, [ax, ay]], i) => {
      const ar = el("g"); el("path", { d: `M${ax} ${ay + 8} Q${f((ax + x) / 2 - 10)} ${f((ay + y) / 2)} ${x} ${y - 44}`, fill: "none", stroke: INK, "stroke-width": 3, "stroke-dasharray": "8 8", "stroke-linecap": "round" }, ar);
      el("path", { d: `M${x - 9} ${y - 58} L${x} ${y - 42} L${x + 9} ${y - 58}`, fill: "none", stroke: INK, "stroke-width": 3, "stroke-linecap": "round", "stroke-linejoin": "round" }, ar);
      c.node(ar).wipe(tL + i * 0.12, 0.3, "down");
      c.sk((g, p) => D.bedIcon(g, p), () => ({ num }), x, y, 1).pop(tL + i * 0.12 + 0.1, 0.3);
    });
    // elle arrive (x 180 → 345) et tend la main droite d'écran vers la poignée du portoir (dans la portée du bras)
    const S9 = 1.05, XA = t0 + 0.05, xAt = (t) => lerp(180, 345, clamp((t - XA) / (tG - XA), 0, 1));
    const grip = [580 + rack.out.grip[0], RY + rack.out.grip[1]];
    A.ppC(0, 0, S9, (t) => {
      const x = xAt(t), mv = t > XA && t < tG, q = E.inOut(prog(t, tG + 0.05, 0.3));
      const p = mv ? gait(x, 180, S9, 1) : Object.assign({}, PP.stand, { view: "three-quarter", facing: 1, look2: [0.7, -0.2] });
      if (!mv && q > 0) { const gp = [rnd((grip[0] - 345) / S9, 2), rnd((grip[1] - jolt(t) - 1300) / S9, 2)]; p.reachR = [rnd(lerp(20, gp[0], q), 2), rnd(lerp(-200, gp[1], q), 2)]; p.bendR = 1; }
      return A.tired(t, doc(Object.assign(p, { expr: t < tF ? "focused" : "worried", talk: 0, blink: rnd(blinkAt(t, 3.3), 10) })));
    }).on((t, s) => { s.x += xAt(t); s.y += 1300; }).on(breathe(3.3));
    A.chip(c, "Labor", "المختبر", 36, t0 + 0.15, tI - 0.12);
    A.chip(c, "quasi identisch", "بحال بحال", 34, tI, tF - 0.12, { yellow: true });
    A.chip(c, "gleichzeitig", "فدقة وحدة", 34, tF, null);
    A.rekon(c, t0 + 0.3);
  } });

  /* ═══════ 10 · LE BEGLEITDOKUMENT (b12) ═══════ */
  st.scene({ from: "b12", in: "cut", inDur: 0, build(c) {
    const k = X.use(c), m = M.of(c); k.bg();
    const t0 = T("b12"), tG = T("b12@groupe"), tGh = T("b12@غير"), tF = T("b12@فورقة"), tA1 = T("b12@عامرة"), tA2 = T("b12@بالمعلومات");
    c.camera([{ at: "b12", s: 1, cx: 520, cy: 920 }, { at: "b12+0.1", s: 1.03, cx: 565, cy: 920, d: 3.2, ease: "lin" }]);
    m.shapes({ seed: 12, pts: [[150, 440], [340, 900], [930, 440]] });
    // les deux poches sur leur barre (×0,7), à gauche ; elles se balancent (1°)
    const bar = m.obj(D.wallBar, 245, 560, 1, { w: 260, hooks: [-55, 55] }); m.build(bar, t0 - 0.1, "drop", { dist: 200, dur: 0.4 });
    [190, 300].forEach((x, i) => { const b = m.obj(D.bloodBag, x, 566, 0.7, { level: 0.95 }); m.build(b, t0 - 0.1, "drop", { dist: 200, dur: 0.4 }); m.sway(b, 1, 2.4, [x, 566], i * 1.7);
      A.ring(c, x + 15, 620, 18, 17, tG + i * 0.08, { sw: 4, dur: 0.2 }).hide(tG + 0.7, 0.2); });
    // la feuille (×0,85, −1,5°) : x 420–845, y 560–1265 ; elle flotte ; elle se brouille deux fois
    const S = 0.83, SX = 420, SY = 560, holder = el("g", { transform: `translate(${SX} ${SY}) rotate(-1.5) scale(${S})` }), sheet = c.node(holder);
    // contre-revue : la cascade commence 0,15 s AVANT la coupe (entrée cut) : la 1re image n'est plus une page vide
    m.build(sheet, t0 - 0.15, "drop", { dist: 500, dur: 0.45 }); sheet.float(4, 3);
    const pulse = (t, a) => Math.sin(Math.PI * prog(t, a, 0.5));
    const ds = c.sk((g, p) => D.docSheet(g, p), (t) => ({ blur: rnd(Math.max(pulse(t, tA1), pulse(t, tA2)), 10) }), 0, 0, 1, 0, holder);
    const LN = ds.out.lines, FD = ds.out.field;
    // le surligneur saute de ligne en ligne (0,14 s par saut), puis s'arrête sur le petit champ « Blutgruppe: »
    const hlIdx = (t) => clamp(Math.floor((t - tG) / 0.14), 0, LN.length - 1);
    const hg = el("g"), hr = el("rect", { x: 0, y: -11, width: 180, height: 22, rx: 6, fill: "#F8CE4E", opacity: 0.55 }, hg);
    c.node(hg, holder).on((t, s) => {
      s.o *= t >= tG ? 1 : 0; if (t < tG) return;
      if (t >= tF) { s.x += FD[0] - 6; s.y += FD[1] - 6; hr.setAttribute("width", 112); return; }
      const [x, y, w] = LN[hlIdx(t)]; s.x += x; s.y += y; hr.setAttribute("width", Math.min(180, w));
    });
    const lp = c.sk((g, p) => D.loupeSmall(g, p), () => ({ r: 70, handle: 135 }), FD[0] + 62, FD[1] - 8, 1 / S, 0, holder);
    lp.pop(tF + 0.1, 0.35);
    // sa tête (×1,25) : focused, paupières lourdes, sueur ; ses yeux suivent le surligneur, clignement long quand la feuille se brouille
    const head = A.phC(262, 1060, 1.25, (t) => {
      const sweep = t >= tG && t < tGh ? -0.5 + ((t - tG) % 0.14) / 0.14 : t >= tF ? 0.3 : 0.2;
      const longBlink = (t >= tA1 && t < tA1 + 0.25) || (t >= tA2 && t < tA2 + 0.25);
      return A.tired(t, Object.assign({}, CAST.DOC, { view: "three-quarter", facing: 1, expr: "focused", talk: 0, headTilt: 3, look2: [rnd(sweep, 10), 0.15], blink: longBlink ? 1 : rnd(blinkAt(t, 1.1), 10) }));
    }, { outfit: "coat", badge: true, w: 58, bottom: 160 });   // revue : buste (la tête seule flottait, cou coupé net)
    m.build(head, t0 - 0.05, "rise", { dist: 160, dur: 0.4 }); head.on(breathe(1.1));
    A.chip(c, "Begleitdokument", "الورقة اللي مع الكيس", 32, t0 + 0.2, tGh);
    A.chip(c, "Blutgruppe", "فصيلة الدم", 36, tF, null, { yellow: true });
    A.quote(c, "laut Urteil: Blutgruppe »an der Konserve selbst … nicht gekennzeichnet«", "حسب الحكم", "b12@وحسب");
  } });

  /* ═══════ 11 · 21:50, LA CHAMBRE : elle accroche la poche (b13) ═══════ */
  st.scene({ from: "b13", in: "swipe", inDur: 0.42, build(c) {
    X.use(c); const m = M.of(c);
    const tC = T("b13@21:50"), tH = T("b13@علقات"), tHook = tH + 0.4, tO = OPEN(), tM = T("b13@لمريض"), t63 = T("b13@6"), tA = T("b13@عام");
    const R = L.chambre(c, { at: "b13", bag: { level: bagLevel, hang: false },
      tube: (t) => ({ fill: rnd(tubeFill(t), 50), clamp: rnd(1 - prog(t, tO, 0.3), 20) }),
      pat: (t) => ({ look2: [0.45, -0.05], expr: t >= tM ? "smile" : "calm" }) });
    c.camera([{ at: "b13", s: 1, cx: 545, cy: 920 }, { at: "b13+0.1", s: 1.03, cx: 572, cy: 920, d: 2.1, ease: "lin" }]);   // revue : 545 → 572 (dos ≤ x 912, horloge ≥ x 95)
    R.face.pulse(tC, 0.45, 0.14);
    // elle (×0,95, trois quarts, facing −1) : la poche dans la main tendue → bras levé jusqu'au crochet → la main descend ouvrir la roulette
    // elle se tient à x 850 (pas de pas en arrière : à 850 la poche, au crochet, ne passe plus devant son visage) ; la main suit des cibles
    // (Persona IK, portée < 105 px × échelle) : la poche tenue devant elle → le crochet → la roulette → bras le long du corps
    const S11 = 0.95, X11 = 850, xAt = () => X11;
    const wheel = R.tubeGeom.wheel, base = { view: "three-quarter", facing: -1 };
    const loc = (p) => [rnd((p[0] - X11) / S11, 2), rnd((p[1] - 1300) / S11, 2)];
    const HOLD = loc([760, 1022]), HOOK = loc([757, 926]), WHL = loc(wheel), REST = [-22, -192];
    const mixP = (a, b, q) => [rnd(lerp(a[0], b[0], E.inOut(q)), 2), rnd(lerp(a[1], b[1], E.inOut(q)), 2)];
    const handTarget = (t) => t < tH ? HOLD : t < tHook ? mixP(HOLD, HOOK, prog(t, tH, 0.4)) : t < tO - 0.05 ? HOOK : t < tO + 0.7 ? mixP(HOOK, WHL, prog(t, tO - 0.05, 0.3))
      : t < tO + 1.0 ? mixP(WHL, REST, prog(t, tO + 0.7, 0.3)) : null;
    const pose = (t) => { const p = Object.assign({}, PP.stand, base), r = handTarget(t); if (r) { p.reachR = r; p.bendR = 1; } return p; };
    const her = A.ppC(0, 0, S11, (t) => A.tired(t, doc(Object.assign(pose(t), { expr: t >= tM && t < t63 + 0.6 ? "calm" : "focused", talk: 0, look2: t >= tM ? [0.8, 0.2] : [0.6, -0.5], blink: rnd(blinkAt(t, 0.4), 10) }))), R.actors.g);
    her.on((t, s) => { s.x += xAt(t); s.y += 1300 + Math.sin(t * 2.6 + 0.4) * 2; });
    // la poche suit l'ancre de sa main jusqu'au crochet, puis pend et se balance
    R.bag.on((t, s) => { if (t >= tHook) return; const h = PE.util.rig(A.tired(t, doc(pose(t)))).handR, hx = xAt(t) + h[0] * S11, hy = 1300 + Math.sin(t * 2.6 + 0.4) * 2 + h[1] * S11; s.x += hx - 756; s.y += hy - 921; });
    m.pend(R.bag, tHook, 6, [756, 921], { idle: 0.8 });
    A.chip(c, "gegen 21.50 Uhr", "مع 21:50", 34, tC, t63 - 0.12);
    A.chip(c, "63 Jahre", "63 عام", 36, t63, null, { yellow: true });
    c.kick(t63, 0.05);
  } });

  /* ═══════ 12 · 0 CONTRE A : la loupe · dix minutes · on arrête (b14–b15) — l'explication médicale ═══════ */
  st.scene({ from: "b14", in: "cut", inDur: 0, build(c) {
    const k = X.use(c), m = M.of(c);
    const tG = T("b14@groupe"), t0g = T("b14@2"), tP = T("b14@poche"), tA = T("b14@4"), tW = T("b14@مريضة"), tMin = T("b15@من"), tBa = T("b15@بعد"), t10 = T("b15@3"),
      tDq = T("b15@دقايق"), tBd = T("b15@بدا"), tV = T("b15@كيتقيا"), tS = STOP(), tLi = T("b15@ليه");
    const sector = (t) => E.inOut(prog(t, tMin, tDq + 0.3 - tMin));
    // il a des haut-le-cœur : le buste se penche par à-coups, de moins en moins (2 Hz)
    const retch = (t) => (t < tV ? 0 : 4 * Math.abs(Math.sin(Math.PI * 2 * (t - tV))) * Math.exp(-(t - tV) / 1.6));
    const R = L.chambre(c, { at: null, bag: { level: bagLevel },
      tube: (t) => ({ fill: rnd(tubeFill(t), 50), clamp: rnd(prog(t, tS, 0.25), 20), drop: t < tS ? rnd((t / 1.2) % 1, 20) : 0.35 }),
      clock: (t) => ({ time: 21 + (50 + 10 * sector(t)) / 60, sector: rnd(sector(t), 20), s: Math.round(t * 10) * 36 % 360 }),
      pat: (t) => t < tBd ? { expr: "calm", look2: [0.3, 0.1] } : t < tV ? { expr: "worried", look2: [0.1, 0.3] }
        : Object.assign({}, PP.handOnBelly, { view: "front", expr: "pain", torsoLean: rnd(10 * E.out(prog(t, tV, 0.3)) + retch(t), 2), headTilt: rnd(12 * E.out(prog(t, tV, 0.3)) + 1.5 * retch(t), 2), reachR: undefined, armL: [-10, 12] }) });
    c.camera([{ at: "b14", s: 1, cx: 545, cy: 910 }, { at: "b14+0.1", s: 1.02, cx: 562, cy: 910, d: 2.2, ease: "lin" }, { at: "b15@بدا", s: 1.04, cx: 572, cy: 940, d: 0.4 }]);
    // elle, toujours là (x 858) : calm → worried → shock ; sa main ferme la roulette à b15@ووقفو
    const S12 = 0.95, X12 = 850, wheel = R.tubeGeom.wheel;
    A.ppC(X12, 1300, S12, (t) => {
      const p = Object.assign({}, PP.stand, { view: "three-quarter", facing: -1 });
      const r = prog(t, tS - 0.25, 0.25) * (1 - prog(t, tS + 0.9, 0.3));
      if (r > 0) { const tg = [rnd((wheel[0] - X12) / S12, 2), rnd((wheel[1] - 1300) / S12, 2)]; p.reachR = [rnd(lerp(-20, tg[0], E.inOut(r)), 2), rnd(lerp(-190, tg[1], E.inOut(r)), 2)]; p.bendR = 1; }
      return A.tired(t, doc(Object.assign(p, { expr: t < tBd ? "calm" : t < tV ? "worried" : "shock", talk: 0, look2: t < tP ? [0.8, 0.2] : t < tV ? [0.9, -0.3] : [0.9, 0.1], blink: rnd(blinkAt(t, 0.4), 10) })));
    }, R.actors.g).on(breathe(0.4));
    // annotations de la série (à côté des objets : rien n'est imprimé sur la poche)
    c.sk((g, p) => D.groupMark(g, p), (t) => ({ letter: "0", p: rnd(E.out(prog(t, tG, 0.35)), 20), show: rnd(prog(t, t0g, 0.2), 10), arrow: [62, 22] }), 270, 1010, 1).on((t, s) => { s.o *= t >= tG ? 1 : 0; });
    c.sk((g, p) => D.groupMark(g, p), (t) => ({ letter: "A", p: rnd(E.out(prog(t, tA, 0.35)), 20), show: rnd(prog(t, tA + 0.15, 0.2), 10), arrow: [60, -14] }), 640, 990, 1).on((t, s) => { s.o *= t >= tA ? 1 : 0; });
    const lab = el("g"); el("path", { d: "M812 856 Q800 890 778 914", fill: "none", stroke: INK, "stroke-width": 2.6, "stroke-dasharray": "7 7", "stroke-linecap": "round" }, lab);
    c.node(lab).wipe(tW + 0.2, 0.3, "down");
    c.sk((g, p) => D.womanIcon(g, p), () => ({}), 812, 826, 1).pop(tW, 0.3);
    tape(c, "für eine andere Patientin", 650, 806, 18, tW, 0.35, { halo: 5 });
    A.halo(c.text("ديال مريضة أخرى", 650, 848, 30, "ar strong", "middle"), 6).wipe(tW + 0.15, 0.35, "rtl");
    // la loupe jaillit du point de liaison sur la tubulure : globules qui entrent, pinces qui se referment, globules qui éclatent
    const lk = el("g"); el("path", { d: "M478 802 L640 1172", fill: "none", stroke: INK, "stroke-width": 2.6, "stroke-dasharray": "6 8", "stroke-linecap": "round" }, lk);
    el("circle", { cx: 640, cy: 1172, r: 7, fill: "#F8CE4E", stroke: INK, "stroke-width": 2.4 }, lk);
    c.node(lk).wipe(tP, 0.25, "rtl");
    const lp = c.sk((g, p) => D.loupe(g, p), (t) => ({ flow: rnd(prog(t, tP + 0.1, tW - tP), 20), grab: rnd(E.inOut(prog(t, tBa, t10 + 0.2 - tBa)), 20), burst: rnd(prog(t, tDq, 0.7), 20),
      wig: rnd((t * 1.5) % 1, 20), drift: rnd((t * 0.25) % 1, 20) }), 345, 712, 1);
    m.build(lp, tP, "grow", { pivot: [640, 1172], dur: 0.45 });
    // dix minutes : secteur de l'horloge (dans le lieu) + « ≈ 10 min » ; le haricot ; trois petits traits ondulés près de sa bouche
    tape(c, "≈ 10 min", 307, 478, 22, tMin, 0.35, { halo: 5, anchor: "start" });   // revue : suit l'horloge (x 240)
    const dish = c.sk((g, p) => D.kidneyDish(g, p), () => ({}), 430, 1108, 1); dish.pop(tV, 0.3);
    const wv = el("g"); [0, 1, 2].forEach((i) => el("path", { d: `M${470 + i * 4} ${985 + i * 16} q 8 -6 16 0 t 16 0`, fill: "none", stroke: "#6E6E68", "stroke-width": 3, "stroke-linecap": "round" }, wv));
    c.node(wv).on((t, s) => { const p = prog(t, tV + 0.1, 1.2); s.o *= p > 0 && p < 1 ? Math.sin(Math.PI * p) : 0; s.x += 6 * p; });
    A.chip(c, "Hämolyse", "تكسر كريات الدم الحمراء", 36, tDq, tLi - 0.12, { yellow: true });
    A.chip(c, "1/3", "الثلث", 40, tLi, null);
    c.shake(tDq, 5, 0.4); c.kick(tV, 0.04);
    // contre-revue : dès qu'il vomit (b15@كيتقيا) et non à b15@الدم + 0,2 : elle ne restait que 0,5 s lisible avant le balayage
    A.quote(c, "»schwerst vorgeschädigt« (Leberzirrhose, Anämie) — laut Urteil", "كان مريض بزاف من قبل", tV + 0.15);
    void k;
  } });

  /* ═══════ 13 · DIMANCHE, 13:37… puis MUETTE 1 : le patient seul, tout se fige (b16 + silence) ═══════
   * Elle n'est PAS là. Pas de moniteur : ce qui « bat », c'est la roue du compteur (HUD), la trotteuse, la goutte, la couette. */
  st.scene({ from: "b16", in: "swipe", inDur: 0.42, build(c) {
    X.use(c); const m = M.of(c);
    const t37 = T("b16@13:37"), calme = T("b16@end") + 0.2, vie = (t) => 1 - E.inOut(prog(t, calme, 0.8));
    const R = L.chambre(c, { at: "b16", day: true, vie,
      pat: (t) => ({ expr: "sleep", talk: 0, headTilt: rnd(lerp(6, 14, E.inOut(prog(t, calme, 0.8))), 4), look2: [0, 0.3], reachR: [rnd(lerp(105, 118, prog(t, calme, 0.8)), 2), -212] }),
      clock: (t) => ({ time: 13 + (t < t37 ? 36 : 37) / 60, s: Math.round(Math.min(t, calme + 0.3) * 10) * 36 % 360 }) });
    c.camera([{ at: "b16", s: 1, cx: 520, cy: 930 }, { at: "b16+0.1", s: 1.04, cx: 520, cy: 930, d: 2.9, ease: "lin" }]);
    m.dust({ x: 520, y: 770, w: 190, h: 230 }, 9, { seed: 13, op: 0.7, speed: 6, to: calme + 0.6 });
    void R;
    A.grey(c, calme + 0.2, 1, 0.85);
    A.typed(c, "13:37", 540, 480, 96, "b16@13:37", { parent: c.hud, dur: 0.25, halo: 8 });
    A.halo(c.text("المريض ما عاشش", 540, 1440, 72, "ttl", "middle", c.hud), 8).wipe(T("b16@end") + 0.6, 0.5, "rtl");
  } });
});
