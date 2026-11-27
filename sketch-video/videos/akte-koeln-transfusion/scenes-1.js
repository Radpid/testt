/* scenes-1.js — PARTIE 1 (storyboard.md § 4, scènes 1 à 6) : l'accroche (la balance), la salle et le rembobinage, l'intro de Yassine
 * sur le tableau de garde, puis les trois pages qui reviennent en arrière (Köln → la feuille, les deux poches, la frise des 63 heures).
 * Mises en place fixes : X.lieux.balance (scène 1), X.lieux.salle (scène 2). Aides : X.aides (story.js). Décors : decor.js.
 * Repères numériques par RANG (voix de l'auteur, 28.11.2026 : b4@7 = « 2012 », b6@3 = « 63 », b7@5 = « 24 ») : storyboard § 6.
 */
(window.EP_PARTS = window.EP_PARTS || []).push(function (X) {
  "use strict";
  const { st, T, E, prog, lerp, clamp, el, U, MAT, INK, PE, PP, D, M, CAST, TENUE, kit, drawDE, pinAt, blinkAt, rnd, pp, breathe, aides: A, lieux: L } = X;
  const SC = X.SC, f = (v) => Math.round(v * 10) / 10, YEL = "#F8CE4E";
  const doc = (p) => Object.assign({}, CAST.DOC, p);
  // texte .tw tapé lettre par lettre (a, dur) puis « dé-tapé » (b, bdur : rembobinage) ; la place du texte ne bouge pas ; tressaut ±1,5 px
  const tape = (c, text, x, y, size, a, dur, b, bdur, o) => {
    o = o || {};
    const g = el("g"), t = el("text", { x, y, "font-size": size, "text-anchor": o.anchor || "middle", class: "tw" }, g);
    const sa = el("tspan", {}, t), sb = el("tspan", { "fill-opacity": 0, "stroke-opacity": 0 }, t);
    const n = c.node(g, o.parent), N = text.length, t0 = T(a), t1 = b == null ? 1e9 : T(b), per = dur / Math.max(1, N);
    let last = -1;
    n.add((tt, s) => {
      const k = clamp(Math.round(N * prog(tt, t0, dur) - N * prog(tt, t1, bdur || 0.4)), 0, N);
      if (k !== last) { sa.textContent = text.slice(0, k); sb.textContent = text.slice(k); last = k; }
      s.o *= tt >= t0 && k > 0 ? 1 : 0;
      if (k > 0 && k < N) s.y += Math.floor((tt - t0) / per) % 2 ? 1.5 : -1.5;
    });
    return n;
  };
  // pendule amorti (même formule que Motion.pend) : angle en degrés, pour les objets dont le dessin dépend de l'angle (surface du sang)
  const pendA = (t, a, deg, idle, ph) => (t < a ? 0 : deg * Math.exp(-2.2 * (t - a)) * Math.sin(7.5 * (t - a))) + idle * Math.sin(t * 1.3 + (ph || 0));

  /* ═══════ 1 · ACCROCHE — la balance (b1 · 0 → b2) ═══════
   * La 1re image est complète : le bloc SCHULDIG est déjà en train de tomber ; il frappe le plateau gauche à b1@مذنبة+0.02. */
  st.scene({ from: 0, in: "cut", inDur: 0, build(c) {
    X.use(c); const m = M.of(c);
    const tHit = T("b1@بالغلطة") + 0.02, S = T("b1@حبس"), tAla = T("b1@غرامة"), tDoc = T("b1@غرامة+0.4");
    const B = L.balance(c, { at: null, strafe: (t) => ({ strafe: t < S ? rnd(3 + Math.max(0, S - t) * 8, 20) : 0, blur: t > 0.3 && t < S - 0.06 ? 1 : 0, streak: rnd(t * 3, 20) }) });
    c.camera([{ at: 0, s: 1, cx: 540, cy: 900 }, { at: 0.2, s: 1.04, cx: 548, cy: 900, d: 3.3, ease: "lin" }]);
    // le bloc tombe de 420 px en accélérant, puis suit le plateau gauche
    const blk = c.sk((g) => D.guiltBlock(g, {}), () => ({}), 0, 0, 1);
    B.onPan(blk, "L", 0, 0); blk.on((t, s) => { const u = clamp((t - (tHit - 0.32)) / 0.32, 0, 1); s.y -= 420 * (1 - u * u); });
    // cinq petits ronds de poussière grise qui s'écartent du plateau au choc (0,4 s)
    const pg = el("g"), puffs = [[-1, 0.2], [-1, 1], [1, 0.4], [1, 1.1], [-1, 1.7]].map(([d, k]) => ({ d, k, n: el("circle", { r: 7, fill: "#BDBDB6", stroke: "#8A8A84", "stroke-width": 1.5 }, pg) }));
    const pn = c.node(pg); B.onPan(pn, "L", 0, -6);
    pn.on((t, s) => {
      const p = prog(t, tHit, 0.4); s.o *= p > 0 && p < 1 ? 1 - p * p : 0;
      puffs.forEach((q, i) => { q.n.setAttribute("cx", f(q.d * (70 + 55 * E.out(p) * (0.7 + 0.2 * q.k)))); q.n.setAttribute("cy", f(-8 - 22 * E.out(p) * q.k)); q.n.setAttribute("r", f(5 + 4 * p + i % 2)); });
    });
    c.shake(tHit, 12, 0.4); c.kick(tHit, 0.08); c.kick(S, 0.06);
    // elle, derrière la barre : worried → sursaut + shock → regard vers la peine → sad → cry, la main à la bouche
    const base = doc(Object.assign({}, TENUE.tribunal, { view: "three-quarter", facing: 1, talk: 0 }));
    const mouth = PE.util.rig(Object.assign({}, base, { expr: "cry", reachL: [-46, -190], reachR: [46, -190], bendL: 1, bendR: -1 })).mouth;
    const hand = [mouth[0] + 10, mouth[1] + 14];
    pp(215, 1500, 1.05, (t) => {
      const ex = t < tHit + 0.11 ? "worried" : t < tAla ? "shock" : t < tDoc ? "sad" : "cry", q = E.inOut(prog(t, tDoc, 0.3));
      return Object.assign({}, base, { expr: ex, tears: rnd(prog(t, tDoc, 0.6), 10), look2: t < S ? [0.7, -0.5] : t < tDoc ? [0.9, -0.4] : [0.4, 0.3], headTilt: t < tDoc ? 0 : rnd(6 * q, 2),
        reachL: [-46, -190], reachR: [rnd(lerp(46, hand[0], q), 2), rnd(lerp(-190, hand[1], q), 2)], bendL: 1, bendR: -1, blink: rnd(blinkAt(t, 1), 10) });
    }, B.actors.g).on(breathe(1)).on((t, s) => { s.y -= 14 * Math.sin(Math.PI * prog(t, tHit + 0.11, 0.25)); });
    // les deux pastilles (le storyboard les pose côte à côte : la faute à gauche, la peine à droite)
    A.chip(c, "schuldig", "مذنبة", 40, tHit, null, { x: 312, y: 398 });
    A.chip(c, "Strafe: 0", "العقوبة: صفر", 40, S, null, { x: 768, y: 398, yellow: true });
    // la référence du jugement, tapée dans la bande HUD (le compteur n'est pas encore là) ; elle finit avant x 690 (l'onglet du jour)
    A.strip(A.typed(c, "Amtsgericht Köln · 16.05.2012 · 613 Ls 3/12", 112, 318, 21, "b1@مات", { parent: c.hud, anchor: "start", per: 0.032, halo: 5 }), 8, 2);
    A.strip(A.halo(c.text("المحكمة الابتدائية ديال Köln", 680, 356, 28, "ar strong", "start", c.hud), 6), 10, 0).wipe(T("b1@مات") + 0.5, 0.45, "rtl");   // revue : bande de papier (la corniche traversait l'arabe)
  } });

  /* ═══════ 2 · LA SALLE D'AUDIENCE, puis tout repart en arrière (b2–b3) ═══════ */
  st.scene({ from: "b2", in: "cut", inDur: 0, build(c) {
    X.use(c); const m = M.of(c), k = kit(c);
    const t0 = T("b2"), tMat = T("b2@حكمت"), tLa = T("b2@طبيبة"), tWhy = T("b3@علاش"), R = T("b3@نرجعو");
    // contre-revue : la cascade de la salle part 0,2 s AVANT la coupe (entrée cut) : à la 1re image, plus de mur vide avec elle seule
    const S = L.salle(c, { at: "b2-0.2",
      judges: { SCF: (t) => ({ expr: t > tMat ? "sad" : "calm" }),
        JUG: (t) => ({ look2: t > tLa && t < R ? [-0.7, 0.15] : [0, 0.6] }),
        SCM: (t) => (t > t0 + 1.6 && t < t0 + 2.1 ? { reachR: [12, -330], bendR: -1 } : {}) },
      page: (t) => E.inOut(prog(t, t0 + 1.0, 0.6)),
      block: (t) => 260 * E.in(prog(t, R + 0.2, 0.35)) });
    c.camera([{ at: "b2", s: 1, cx: 520, cy: 920 }, { at: "b2+0.1", s: 1.03, cx: 545, cy: 920, d: 2.2, ease: "lin" }, { at: "b3@نرجعو", s: 1, cx: 500, cy: 920, d: 1.0 }]);
    // rembobinage du décor : le bloc de la petite balance remonte et disparaît, les juges redescendent derrière le banc, le rayon recule
    if (S.block) S.block.on((t, s) => { s.o *= 1 - prog(t, R + 0.42, 0.12); });
    // (contre-revue : ils s'effacent pendant qu'ils descendent — sinon leurs jambes sortaient sous le banc, 7,6 → 8,3 s)
    Object.values(S.judges).forEach((n, i) => n.on((t, s) => { const a = R + 0.45 + i * 0.04; s.y += 230 * E.in(prog(t, a, 0.35)); s.o *= 1 - prog(t, a + 0.1, 0.1); }));
    S.shaft.on((t, s) => { s.x -= 80 * E.inOut(prog(t, R + 0.2, 0.6)); s.o *= 1 - prog(t, R + 0.2, 0.6); });
    // elle : pleure, tête baissée ; épaules qui tressautent à b2@مات ; marche à reculons (toujours tournée vers la droite) à b3@نرجعو
    const her = A.walker({ keys: [[R + 0.1, 205], ["i1", -140]], y: 1300, s: 1, facing: 1, parent: S.actors.g,
      base: (t) => doc(Object.assign({}, TENUE.tribunal, { expr: "cry", tears: 1, talk: 0, blink: rnd(blinkAt(t, 2), 10) })),
      stop: () => Object.assign({}, PP.stand, { view: "three-quarter", facing: 1, headTilt: 10, armL: [-6, 10], armR: [4, -12] }) });
    her.on(breathe(2)).on((t, s) => { const p = prog(t, tMat, 1.2); if (p > 0 && p < 1) s.y += 2.5 * Math.sin((t - tMat) * 44) * (1 - p); });
    // la carte tapée : elle tombe (b2+0.1), se tape, reçoit le surligneur et le tampon ; au rembobinage tout se défait dans l'ordre inverse
    const holder = el("g", { transform: "translate(530 1130) rotate(-3)" }), card = c.node(holder);
    D.typedCard(el("g", {}, holder), {});
    m.build(card, t0 + 0.1, "drop", { dist: 420, dur: 0.45 });
    card.on((t, s) => { s.y -= 420 * E.in(prog(t, R + 0.3, 0.35)); s.o *= 1 - prog(t, R + 0.55, 0.1); });
    const L1 = t0 + 0.45, L2 = L1 + 0.32, tHl = Math.max(tMat, L2 + 0.4);
    card.on((t, s) => { [L1, L2, tLa, tLa + 0.25].forEach((a) => { const p = prog(t, a, 0.12); if (p > 0 && p < 1) s.y += 2 * Math.sin(Math.PI * p); }); });
    A.marker(c, -192, -29, 252, tHl, { parent: holder, h: 22, rot: 0 }).hide(R + 0.1, 0.2);
    tape(c, "Die Angeklagte ist einer", 0, -56, 22, L1, 0.3, R + 0.1, 0.4, { parent: holder });
    tape(c, "fahrlässigen Tötung schuldig.", 0, -22, 22, L2, 0.36, R + 0.1, 0.4, { parent: holder });
    tape(c, "laut Urteil", 192, -84, 15, L2 + 0.4, 0.3, R + 0.1, 0.3, { parent: holder, anchor: "end" });
    tape(c, "Von einer Bestrafung", 0, 14, 22, tLa, 0.3, R + 0.1, 0.4, { parent: holder });
    tape(c, "wird abgesehen.", 0, 46, 22, tLa + 0.25, 0.25, R + 0.1, 0.4, { parent: holder });
    const stp = A.stamp(c, 142, 98, 0.4, { text: "§ 60", sub: "ABSEHEN VON STRAFE", size: 78, rot: -8 }, tLa + 0.3, { parent: holder, shake: 6 });
    stp.on((t, s) => { const p = prog(t, R, 0.2); if (p > 0) { s.s *= lerp(1, 2.6, p); s.o *= 1 - p; } });
    c.kick(tLa + 0.55, 0.06);
    // pastilles (une à la fois) et la bande des citations
    A.chip(c, "fahrlässige Tötung", "القتل غير العمدي", 34, tMat, tLa);
    A.chip(c, "§ 60 StGB · Absehen von Strafe", "الإعفاء من العقوبة", 28, tLa + 0.1, tWhy, { yellow: true });
    // contre-revue : posée dès « لا حبس » et gardée jusqu'au rembobinage (de b2@غرامة à b3@علاش, 0,45 s, elle n'avait pas le temps de se taper)
    A.quote(c, "»Die Angeklagte trägt die Kosten des Verfahrens« — laut Urteil", "مصاريف المحاكمة عليها", tLa + 0.6, { until: R - 0.15 });   // après le coup du tampon (qui, en claquant, passait sur la bande)
    // « علاش؟ » sur un trait de surligneur ; l'image retient son souffle (X.aides.calm) ; il reste pendant le rembobinage
    A.marker(c, 418, 478, 244, tWhy, { parent: c.hud, h: 46, dur: 0.18 });
    A.halo(c.text("علاش؟", 540, 510, 120, "ttl", "middle", c.hud), 8).pop(tWhy, 0.35);
    c.kick(tWhy, 0.07);
    A.scan(c, "b3@نرجعو");
  } });

  /* ═══════ 3 · INTRO — la fiche de Yassine épinglée sur le tableau de garde (i1–i3, summary: false) ═══════
   * Éléments du SOCLE (photo assets/portrait.png, anneau jaune, badge Instagram, ruban « Yassine », @dr.aguilo, j'aime, s'abonner) posés
   * dans le CADRE de l'épisode : la fiche (D.pinCard) qui se balance avec tout son contenu (un seul nœud). Logo, compteur et onglet masqués. */
  st.scene({ from: "i1", in: "swipeR", inDur: 0.42, summary: false, build(c) {
    const k = X.use(c), m = M.of(c); k.bg();
    const tI = T("i1"), la = T("i3@j'aime"), fa = T("i3@abonne");
    c.camera([{ at: "i1", s: 1.05, cx: 540, cy: 800 }, { at: "i2", s: 1.0, cx: 540, cy: 820, d: 0.5 }]);
    // le tableau de garde (présent dès l'entrée) et ses petits objets vivants
    m.obj(D.dutyBoard, 110, 250, 1, { w: 860, h: 1040, title: "DIENSTPLAN", titleX: 430 });
    const glint = m.obj(D.glint, 0, 0, 1, {}).on((t, s) => { const u = (((t - tI) / 8) % 1 + 1) % 1; s.x += 140 + 800 * u; s.y += 258; s.o *= Math.sin(Math.PI * u); });
    void glint;
    const n1 = c.sk((g, p) => D.note04(g, p), (t) => ({ curl: rnd(0.3 + 0.25 * Math.sin((t / 2.2) * 6.283), 20) }), 185, 520, 1);
    m.obj(D.note04, 180, 760, 1, { ring: false, seed: 3302 });
    void n1;
    const key = m.obj(D.hookKey, 200, 980, 1, {}); m.pend(key, tI + 0.3, 6, [200, 980], { idle: 1.5 });
    m.obj(D.hourGrid, 835, 480, 1, { cols: 7, rows: 3, cell: 16, sw: 1.3 });
    [[850, 440], [900, 440], [860, 900], [905, 960]].forEach(([x, y], i) => m.obj(D.magnet, x, y, 1, { yellow: i === 1 }));
    const pen = m.obj(D.markerString, 880, 600, 1, {}); m.pend(pen, tI + 0.4, 5, [880, 600], { idle: 2 });
    // la fiche + tout son contenu dans le même nœud : elle arrive en balancier sur sa punaise, puis se balance (± 0,4°)
    const card = c.group(), P = card.g;
    m.build(card, tI, "swing", { pivot: [540, 350], deg: -40, dur: 0.6 }); m.pend(card, tI + 0.5, 3, [540, 350], { idle: 0.4 });
    c.sk((g) => D.pinCard(g, { w: 520, h: 800 }), () => ({}), 540, 350, 1, 0, P);
    // photo (socle) à l'échelle 0,78 : ombre, anneau jaune QUI SE TRACE, photo ronde, anneau au trait, badge Instagram
    const ph = el("g", { transform: "translate(540 560) scale(0.78)" }), C = U.ctx(ph, 88, false, 1);
    const cp = el("clipPath", { id: "clipPortrait04" }, el("defs", {}, ph)); el("circle", { cx: 0, cy: 0, r: 208 }, cp);
    el("circle", { cx: 9, cy: 12, r: 236, fill: "#D2D2CB" }, ph);
    el("circle", { cx: 0, cy: 0, r: 236, fill: "#FFFFFF" }, ph);
    const ring = el("circle", { cx: 0, cy: 0, r: 222, fill: "none", stroke: YEL, "stroke-width": 30, pathLength: 100, "stroke-dasharray": "0 101", transform: "rotate(-90)" }, ph);
    el("image", { href: "assets/portrait.png", x: -210, y: -210, width: 420, height: 420, "clip-path": "url(#clipPortrait04)", preserveAspectRatio: "xMidYMid slice" }, ph);
    U.shape(C, "ring1", "M-209 0 A209 209 0 1 1 209 0 A209 209 0 1 1 -209 0", {}, { sw: 5.5 });
    U.stroke(C, "ring2", "M-237 0 A237 237 0 1 1 237 0 A237 237 0 1 1 -237 0", { sw: 3.5 });
    U.stroke(C, "dash", "M-150 -196 C -90 -232, 60 -236, 140 -200", { sw: 3, stroke: "#FFFFFF" });
    const ig = el("g", { transform: "translate(160 160)" }, ph), I = U.ctx(ig, 89, false, 1);
    el("path", { d: U.rrect(-46, -46, 92, 92, 26), fill: "#D2D2CB", transform: "translate(5 6)" }, ig);
    U.shape(I, "sq", U.rrect(-46, -46, 92, 92, 26), MAT.white, { sw: 4.2 });
    U.shape(I, "c", "M-19 0 A19 19 0 1 1 19 0 A19 19 0 1 1 -19 0", MAT.yellow, { sw: 4.2 });
    el("circle", { cx: 25, cy: -25, r: 6, fill: INK }, ig);
    c.node(ph, P).pop(tI + 0.15, 0.4).on((t) => { ring.setAttribute("stroke-dasharray", `${(100 * E.inOut(prog(t, tI + 0.2, 0.6))).toFixed(1)} 101`); });
    // « Yassine » (jamais « Dr. »), Instagram + @dr.aguilo
    k.ribbon("Yassine", 540, 800, { size: 50, parent: P }).wipe("i1@ياسين", 0.35);
    const hd = el("g", { transform: "translate(425 868)" }), H = U.ctx(hd, 90, false, 1);
    U.shape(H, "sq", U.rrect(-21, -21, 42, 42, 12), MAT.white, { sw: 3 }); U.stroke(H, "c", "M-9 0 A9 9 0 1 1 9 0 A9 9 0 1 1 -9 0", { sw: 3 }); el("circle", { cx: 12, cy: -12, r: 3, fill: INK }, hd);
    c.node(hd, P).pop("i1@ياسين+0.15", 0.3);
    c.text("@dr.aguilo", 562, 882, 42, "de", "middle", P).fade("i1@ياسين+0.15", 0.3);
    // pastilles (une à la fois)
    k.chip("Arzt in Deutschland", "طبيب فألمانيا", 540, 945, 24, { parent: P }).pop("i1@فألمانيا", 0.3).hide("i2@حقيقية", 0.15);
    k.chip("echte Fälle · deutsche Gerichte", "قصص حقيقية من المحاكم", 540, 945, 24, { parent: P, yellow: true }).pop("i2@حقيقية+0.15", 0.3).hide("i3", 0.15);
    // j'aime + s'abonner : deux AIMANTS qui claquent sur le tableau (petit rebond) ; cœur plein + battement, bouton jaune « ✓ abonné »
    const magnetIn = (n, a) => n.on((t, s) => { const p = prog(t, a, 0.3); s.o *= p > 0 ? 1 : 0; if (p < 1) { s.y -= 60 * (1 - E.out(p)); s.s *= 1 + 0.12 * (1 - p); } const q = prog(t, a + 0.3, 0.25); if (q > 0 && q < 1) s.y += 4 * Math.sin(Math.PI * q); });
    const heart = c.sk((g, p) => PE.props.heart(g, { size: 1.1, fill: p.on, beat: p.b }), (t) => ({ on: t >= la, b: rnd(Math.sin(Math.min(1, prog(t, la, 0.35)) * Math.PI), 10) }), 400, 990, 1, 0, P);
    magnetIn(heart, T("i3") + 0.05);
    magnetIn(c.text("j'aime", 400, 1058, 28, "de", "middle", P), T("i3") + 0.05);
    const btn = c.sk((g, p) => {
      const B = U.ctx(g, 91, false, 1);
      el("path", { d: U.rrect(-125, -36, 250, 72, 20), fill: "#D2D2CB", transform: "translate(6 7)" }, g);
      U.shape(B, "btn", U.rrect(-125, -36, 250, 72, 20), p.on ? MAT.yellow : MAT.white, { sw: 3.2 });
      U.text(g, p.on ? "✓ abonné" : "+ s'abonner", 0, 12, 34, {});
    }, (t) => ({ on: t >= fa }), 660, 1000, 1, 0, P);
    magnetIn(btn, T("i3") + 0.15);
    c.kick(la, 0.05); c.kick(fa, 0.05);
  } });

  /* ═══════ 4 · KÖLN 2012 → LA FEUILLE SIGNÉE (b4) — rembobinage, 1re page ═══════ */
  st.scene({ from: "b4", in: "swipeR", inDur: 0.42, build(c) {
    const k = X.use(c), m = M.of(c); k.bg();
    const tK = T("b4@Köln"), tW = T("b4@ورقة") - 0.1, tS = T("b4@سنات");
    c.camera([{ at: "b4", s: 1, cx: 580, cy: 900 }, { at: "b4+0.1", s: 1.03, cx: 530, cy: 900, d: 2.4, ease: "lin" }]);
    m.shapes({ seed: 41, pts: [[150, 470], [930, 430], [140, 1230]], at: "b4+0.2" });
    const geo = drawDE(c, 400, 830, 80, "b4");
    const RH = [[7.6, 47.6], [8.4, 49.0], [8.27, 50.0], [7.6, 50.36], [7.1, 50.73], [6.96, 50.94], [6.77, 51.23], [6.25, 51.83]].map((p) => geo(...p));
    c.sk((g, p) => D.rhine(g, p), (t) => ({ pts: RH, p: rnd(E.inOut(prog(t, tK + 0.1, 0.5)), 20) }), 0, 0, 1);
    const [kx, ky] = geo(6.96, 50.94);
    // le pointillé de l'épingle au sommet de la cathédrale (il se trace), la cathédrale qui pousse du sol, l'eau qui dérive à son pied
    const dl = el("g"); el("path", { d: `M${f(kx)} ${f(ky)} Q510 560 700 612`, fill: "none", stroke: INK, "stroke-width": 3, "stroke-dasharray": "10 9", "stroke-linecap": "round" }, dl);
    c.node(dl).wipe(tK + 0.2, 0.5, "ltr");
    const dom = m.obj(D.dom, 720, 1130, 1, {}); m.build(dom, tK + 0.2, "growY", { pivot: [720, 1130], dur: 0.5 });
    c.sk((g, p) => D.riverWaves(g, p), (t) => ({ w: 320, phase: rnd(((t * 0.0625) % 1 + 1) % 1, 40) }), 720, 1140, 1).fade(tK + 0.3, 0.3);
    pinAt(c, kx, ky, "b4@Köln"); m.ripple(kx, ky, tK + 0.35, { R: 90 });
    A.chip(c, "Köln", "كولونيا", 40, tK, tW, { yellow: true });
    A.quote(c, "Amtsgericht Köln · 16.05.2012", "المحكمة الابتدائية ديال Köln", "b4@يتحكم");
    c.kick("b4@7", 0.05);
    // la feuille (grande, ×0,72, −4°) arrive par la droite ; la signature SE DÉFAIT, le stylo recule le long du trait puis se lève
    const sg = c.group(); sg.slide(tW, 500, 0, 0.35);
    const SX = 440, SY = 1010, SS = 0.72, RA = (-4 * Math.PI) / 180;
    const W2 = (p) => [SX + SS * (p[0] * Math.cos(RA) - p[1] * Math.sin(RA)), SY + SS * (p[0] * Math.sin(RA) + p[1] * Math.cos(RA))];
    const sign = (t) => 1 - E.inOut(prog(t, tS, 0.5));
    const sigPt = (v) => { const n = Math.round(64 * clamp(v, 0, 1)), u = n / 64; return [-122 + 236 * u + 16 * Math.sin(u * Math.PI * 7), 148 - 26 * Math.sin(u * Math.PI * 6.2) * (1 - 0.45 * u) - 9 * Math.sin(u * Math.PI)]; };
    c.sk((g, p) => D.formSheet(g, p), (t) => ({ sign: rnd(sign(t), 64) }), SX, SY, SS, -4, sg.g);
    c.sk((g, p) => D.pen(g, p), () => ({ angle: -55 }), 0, 0, 0.9, 0, sg.g).on((t, s) => {
      const q = W2(sigPt(rnd(sign(t), 64))), up = E.out(prog(t, tS + 0.5, 0.3));
      s.x += q[0] + 22 * up; s.y += q[1] - 46 * up;
    });
    const corner = W2([200, -250]), tag = c.sk((g, p) => D.loopTag(g, p), () => ({ len: 40 }), corner[0], corner[1] + 67, 1, 0, sg.g);
    m.pend(tag, tW + 0.35, 14, corner, { idle: 4 });
  } });

  /* ═══════ 5 · LES DEUX POCHES : le sang remonte (b5) — rembobinage, 2e page ═══════ */
  st.scene({ from: "b5", in: "swipeR", inDur: 0.42, build(c) {
    const k = X.use(c), m = M.of(c); k.bg();
    const t0 = T("b5"), tB = T("b5@الدم");
    c.camera([{ at: "b5", s: 1, cx: 590, cy: 900 }, { at: "b5+0.1", s: 1.03, cx: 510, cy: 900, d: 1.8, ease: "lin" }]);
    const grid = m.obj(D.hourGrid, -110, 290, 1, { cols: 10, rows: 9, cell: 140, paper: false, col: "#9A9A94", sw: 2.4 }).on((t, s) => { s.o *= 0.25; }); m.par(grid, 0.6);
    const bar = m.obj(D.wallBar, 540, 560, 1, { w: 620, hooks: [-140, 140] }); m.build(bar, t0 + 0.02, "drop", { dist: 200, dur: 0.4 });
    // le « ؟ » pend de la barre, entre les deux poches
    const tag = m.obj(D.loopTag, 540, 720, 1, { len: 123 }); m.build(tag, t0 + 0.1, "drop", { dist: 200, dur: 0.4 }); m.pend(tag, t0 + 0.5, 9, [540, 570], { idle: 3 });
    // deux poches IDENTIQUES (même graine), ×1,5, en opposition de phase ; la surface du sang reste horizontale (o.slope = l'angle)
    const bag = (x, a, ph, level) => {
      const ang = (t) => pendA(t, a + 0.42, 8, 1.2, ph);
      const n = c.sk((g, p) => D.bloodBag(g, p), (t) => ({ level: rnd(level(t), 50), sway: rnd(t * 2.4 + ph, 5), slope: rnd(ang(t), 2) }), x, 566, 1.5);
      n.on((t, s) => { s.px = x; s.py = 566; s.r += ang(t); });
      m.build(n, a, "drop", { dist: 300, dur: 0.42 });
      return { n, ang };
    };
    bag(400, t0 + 0.06, 0, () => 1);
    const lvl = (t) => lerp(0.67, 1, E.inOut(prog(t, t0 + 0.3, tB + 0.2 - t0 - 0.3)));
    const R = bag(680, t0 + 0.12, Math.PI, lvl);
    // la tubulure de la poche de DROITE : le front rouge REMONTE vers la poche (o.back), la goutte de la chambre remonte
    const tube = c.sk((g, p) => D.tube(g, p), (t) => {
      const a = (R.ang(t) * Math.PI) / 180, top = [680 - 294 * Math.sin(a), 566 + 294 * Math.cos(a)];
      return { pts: [[rnd(top[0], 2), rnd(top[1], 2)], [690, 960], [640, 1080], [720, 1200], [700, 1430]], k: 1.4, back: 1,
        fill: rnd(1 - E.inOut(prog(t, t0 + 0.3, tB + 0.2 - t0 - 0.3)), 50), drop: rnd((t / 0.9) % 1, 20) };
    }, 0, 0, 1);
    m.build(tube, t0 + 0.12, "drop", { dist: 300, dur: 0.42 });
    A.chip(c, "Blutkonserven", "أكياس الدم", 36, "b5@جوج", null);
    c.kick(tB, 0.05);
  } });

  /* ═══════ 6 · LA FRISE DES HEURES : 63, puis la garde de 24 heures (b6–b7) — le travelling signature ═══════
   * Le monde va de x −60 à 1980. À b6@كلشي le rembobinage s'arrête : tout va maintenant de gauche à droite. */
  st.scene({ from: "b6", in: "swipeR", inDur: 0.42, build(c) {
    const k = X.use(c), m = M.of(c); k.bg();
    const t0 = T("b6"), tK = T("b6@شي"), tW = T("b6@وحدة"), tAd = T("b7@service"), tZ = T("b7@زاد"), tG = T("b7@garde"), t24 = T("b7@5");
    const CAM = [{ at: t0, s: 1, cx: 560, cy: 900 }, { at: tK + 0.4, s: 1, cx: 1040, cy: 900, d: T("b7") - tK - 0.4 }, { at: T("b7"), s: 1, cx: 1500, cy: 900, d: 2.0 }, { at: t24, s: 1.03, cx: 1526, cy: 900, d: 0.6 }];
    c.camera(CAM);
    // la même caméra, sans secousse (pour la marcheuse) : cx(t)
    const cx = (t) => { let v = 560; for (let i = 1; i < CAM.length; i++) { const q = CAM[i]; if (t < q.at) break; v = lerp(v, q.cx, E.inOut(prog(t, q.at, q.d))); } return v; };
    m.obj(D.corridor04, 0, 0, 1, { x0: -200, x1: 2200 });
    m.obj(D.dutyBoard, -60, 520, 1, { w: 2040, h: 560, title: "DIENSTPLAN", titleX: 210, trayX: 1586, pens: 1 });
    m.obj(D.glint, 0, 0, 1, {}).on((t, s) => { const u = (((t - t0) / 8) % 1 + 1) % 1; s.x += -20 + 1980 * u; s.y += 528; });
    const nA = c.sk((g, p) => D.note04(g, p), (t) => ({ curl: rnd(0.25 + 0.25 * Math.sin((t / 2.2) * 6.283), 20) }), 1150, 860, 1);
    m.obj(D.note04, 420, 880, 1, { ring: false, seed: 3303 });
    void nA;
    // la frise de la semaine : grille vide, « 1 Woche », puis 21 colonnes noircies l'une après l'autre (même horloge que le compteur)
    m.obj(D.hourGrid, 130, 660, 1, {});
    A.halo(c.text("1 Woche", 613, 640, 28, "tw", "middle"), 5);
    for (let i = 0; i < 21; i++) c.sk((g, p) => D.hourCol(g, p), () => ({ seed: i + 1 }), 130 + i * 46, 660, 1).wipe(A.colStart(i), 0.07, "down");
    c.kick(tW, 0.07);
    A.chip(c, "63-Stunden-Woche", "سيمانة ديال 63 ساعة", 34, "b6@3", tAd, { yellow: true });
    // la Klinikverwaltung : le tampon claque sur le tableau
    A.stamp(c, 1180, 570, 0.5, { text: "KLINIKVERWALTUNG", size: 30, rot: -6 }, tAd, { shake: 8 });
    A.chip(c, "Klinikverwaltung", "الإدارة ديال السبيطار", 32, tAd, tG);
    // le bloc de la garde tombe d'en haut et claque ; les « 24 » grossissent à b7@7 ; un feutre roule dans la gouttière
    const strip = c.sk((g, p) => D.magnetStrip(g, p), (t) => ({ pop: rnd(1 + 0.2 * Math.sin(Math.PI * prog(t, t24, 0.3)), 20) }), 1526, 640, 1);
    const grid = m.obj(D.hourGrid, 1250, 690, 1, { cols: 12, rows: 2 });
    const date = A.halo(c.text("Sa 30.07.2011", 1526, 838, 24, "tw", "middle"), 5);
    [strip, grid, date].forEach((n) => m.build(n, tZ, "drop", { dist: 320, dur: 0.5 }));
    c.shake(tZ + 0.45, 6, 0.3); c.kick(t24, 0.05);
    c.sk((g, p) => D.feltPen(g, p), (t) => ({ yellow: true, roll: rnd(prog(t, tZ + 0.45, 0.7) * 2, 20) }), 1518, 1051, 1).on((t, s) => { s.x += 64 * E.out(prog(t, tZ + 0.45, 0.7)); });
    // elle : entre par la gauche (60 → 300), suit la caméra (x = cx − 180), s'arrête sous le bloc (x 1420) ; jamais de glissade
    const tStop = tZ + 0.6, tIn = tK + 0.4;
    const xAt = (t) => t < t0 ? 60 : t < tIn ? lerp(60, 300, (t - t0) / (tIn - t0)) : t < T("b7") ? Math.max(300, cx(t) - 180) : lerp(cx(t) - 180, 1420, E.inOut(prog(t, T("b7"), tStop - T("b7"))));
    const S6 = 0.92;
    A.ppC(0, 0, S6, (t) => {
      const x = xAt(t), moving = t < tStop - 0.02;
      const ex = t < tK ? "calm" : t < tZ ? "focused" : "worried";
      const p = moving
        ? Object.assign({}, PP.walk(rnd(A.stride(x - 60, S6, 1), 16)), { view: "side", facing: 1 })
        : Object.assign({}, PP.stand, { view: "three-quarter", facing: 1 }, t < tG + 0.4 ? { look2: [0.3, -0.9], headTilt: -6 } : { look2: [0.2, 0.4], headTilt: rnd(8 * prog(t, tG + 0.4, 0.5), 2) });
      return A.tired(t, doc(Object.assign({}, TENUE.hopital, p, { expr: ex, talk: 0, blink: rnd(blinkAt(t, 1.5), 10) })), { arms: !moving && t > tG + 0.4 });
    }).on((t, s) => { s.x += xAt(t); s.y += 1300; }).on(breathe(1.5));
  } });
});
