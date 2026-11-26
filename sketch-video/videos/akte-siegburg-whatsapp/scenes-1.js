/* scenes-1.js — PARTIE 1 de l'épisode AKTE 07 « الگروپ » : scènes 1 à 5 du storyboard (§ 4).
 *   1 · ACCROCHE — le tribunal répond dans le fil (b1)              ÉCRAN (coupe, vibreur dès l'image 0)
 *   2 · ACCROCHE — elle, et le ticket qui sort de sa poche (b2)    PIÈCE, salle des médecins (sortie du téléphone)
 *   3 · ACCROCHE — pas un patient, un collègue (b3)               ÉCRAN (plongée depuis sa main)
 *   4 · INTRO — la fiche « contact » de Yassine (i1–i3)            ÉCRAN (T-NOTIF), summary: false
 *   5 · Le groupe (b4)                                             ÉCRAN (T-NOTIF)
 * Mises en place : X.lieux (fil, contact, salle) ; HUD : X.hud (pastille, mention, bannière, fantôme) ; aides : X.aides.
 * Scènes ÉCRAN : tout dans c.hud (couches renvoyées par X.lieux) — pas de k.bg(), pas de c.camera / c.kick : punch et buzz.
 */
(window.EP_PARTS = window.EP_PARTS || []).push(function (X) {
  "use strict";
  const { st, T, E, prog, lerp, clamp, el, U, MAT, INK, PE, D, M, CAST, SC, blinkAt, rnd, pp, breathe } = X;
  const H = X.hud, A = X.aides, L = X.lieux;
  const STATUT = ["Stand Juli 2026: nicht rechtskräftig", "مازال ماشي نهائي"];   // mention de toute l'accroche (scènes 1–3)
  const TAU = Math.PI * 2;

  // dessin fixe posé en (x, y) dans un parent (nœud animable)
  const pose = (c, parent, fn, o, x, y) => { const g = el("g", { transform: `translate(${x} ${y})` }); D[fn](g, o || {}); return c.node(g, parent); };
  // « tampon » sans secousse (scènes ÉCRAN : scene.shake n'agit pas sur c.hud) : arrive en grand (from) et frappe, pivot donné
  const frappe = (n, at, px, py, dur = 0.28, from = 1.9) => { const a = T(at); return n.on((t, s) => {
    if (t < a) { s.o *= 0; return; } const p = prog(t, a, dur); s.px = px; s.py = py;
    if (p < 1) { s.o *= clamp(p * 5, 0, 1); s.s *= lerp(from, 1, E.in(p)); } else { const u = t - a - dur; s.s *= 1 + 0.05 * Math.exp(-u * 9) * Math.sin(u * 30); } }); };
  // flèche à main levée qui se trace (D.fleche, o.p animé)
  const trace = (c, parent, de, vers, at, dur, o = {}) => { const a = T(at);
    return c.sk((g, p) => D.fleche(g, p), (t) => Object.assign({ de, vers, courbe: o.courbe == null ? 0.15 : o.courbe, sw: o.sw || 4.5, p: rnd(E.out(prog(t, a, dur)), 20) }), 0, 0, 1, 0, parent)
      .on((t, s) => { s.o *= t >= a ? 1 : 0; }); };

  /* ═══════ 1 · ACCROCHE — le tribunal répond dans le fil (b1 · 0 → b2) — ÉCRAN ═══════
   * Image 0 complète (vignette du Reel) : téléphone qui vibre, SON message vert, les deux dates, la mention du statut.
   * La somme TOMBE comme une réponse (b1@بـ1000) ; l'avatar d'ELLE sursaute. Aucune coche, jamais « bezahlt ». */
  st.scene({ from: 0, in: "cut", inDur: 0, build(c) {
    X.use(c);
    const m = M.of(c);
    const aJ = T("b1@جاوبات"), aS = T("b1@بـ1000");
    const tressaut = (t) => { const p = prog(t, aS, 0.3); return p > 0 && p < 1 ? 16 * Math.sin(Math.PI * p) : 0; };   // le fil monte de 16 px et revient
    const P = L.fil(c, { titre: "Ärzte-AC", sous: "WhatsApp-Chatgruppe · 9 Mitglieder", date: "22.05.2026", batt: 0.7, defile: tressaut, mention: STATUT });
    const F = P.fil.g;
    A.buzz(P.tel, 0, 9, 0.2); A.buzz(P.tel, 0.25, 7, 0.22);                                  // le vibreur, dès l'image 0

    // samedi 31 mai 2025 : SON message, déjà envoyé (vert), réduit (L1 lisible, lignes illisibles, deux lignes caviardées)
    pose(c, F, "sepDate", { texte: "Samstag, 31. Mai 2025" }, 525, 596);
    const b0 = c.group(F);
    A.bulleFil(c, b0.g, 300, 640, 482, 254, [806, 924], { mat: "vert" });
    c.text("Nur zu Jedermanns Info …", 324, 692, 26, "de light", "start", b0.g);
    [[710, 430], [748, 410]].forEach(([y, w], i) => pose(c, b0.g, "gribouillis", { w, seed: 31 + i }, 324, y));
    [[780, 150, 220], [822, 90, 270]].forEach(([y, w1, w2], i) => { pose(c, b0.g, "caviar", { w: w1, seed: 50 + i }, 324, y); pose(c, b0.g, "caviar", { w: w2, seed: 60 + i }, 324 + w1 + 14, y); });
    b0.pulse("b1@ميساج", 0.4, 0.04);
    const elle = A.avatarVif(c, F, "ELLE", 832, 940, 32, (t) => (t < aS ? { expr: "angry", look2: [-0.6, -0.3] }
      : t < aS + 0.65 ? { expr: "shock", look2: [-0.7, 0.5], headTilt: -4 } : { expr: "worried", look2: [-0.8, 0.6] }), { k: 1 });
    elle.on((t, s) => { const p = prog(t, aS, 0.25); if (p > 0 && p < 1) s.y -= 10 * Math.sin(Math.PI * p); });   // elle sursaute

    // vendredi 22 mai 2026 : le tribunal « écrit »… puis la réponse
    pose(c, F, "sepDate", { texte: "Freitag, 22. Mai 2026" }, 525, 986);
    const wAG = D.outils.mesure("Arbeitsgericht Siegburg", 26, "de");
    A.tape(c, F, "Arbeitsgericht Siegburg", 262, 1042, 26, "de", aJ, 0.25);
    A.tape(c, F, "1 Ca 1741/25", Math.round(262 + wAG + 16), 1042, 19, "de light", aJ + 0.12, 0.2);
    const sceau = c.sk((g, p) => D.sceau(g, p), (t) => { const u = t - aJ; return { r: 30, a: u < 0 ? 0 : Math.round(6 * Math.exp(-2.2 * u) * Math.sin(7.5 * u) + Math.sin(t * 2.4)) }; }, 216, 1262, 1, 0, F);
    A.jaillit(sceau, aJ, 216, 1262, 0.3);
    A.bulleFil(c, F, 262, 1160, 116, 66, [244, 1252], { at: aJ + 0.05, until: aS - 0.02 });   // « … »
    A.dans(F, m.typing(320, 1193, aJ + 0.15, aS - 0.02));
    const b1 = c.group(F);
    A.bulleFil(c, b1.g, 262, 1058, 480, 168, [244, 1252]);
    const mk = el("g", { transform: "translate(502 1132)" }); SC.marker(mk, { w: 420, h: 62 }); c.node(mk, b1.g);
    c.text("1.000,00 EUR", 502, 1150, 76, "de", "middle", b1.g);
    c.text("verurteilt, … zu zahlen", 470, 1204, 22, "de light", "middle", b1.g);
    D.outils.tx(b1.g, "laut Urteil", 724, 1210, 17, "light", "end", { fill: "#55524B" });
    frappe(b1, aS, 502, 1142, 0.28, 1.9);
    A.buzz(P.tel, aS + 0.25, 12, 0.4); A.punch(P.tel, aS + 0.25, 0.05);

    H.pastille(c, "Schadensersatz", "تعويض", { at: "b1@أورو", yellow: true, size: 30, parent: P.bande });

    // l'anneau jaune autour de SON message (b1@ميساج), qui respire
    const ag = el("g", { transform: "translate(541 772)" }); D.anneau(ag, { w: 600, h: 288, sw: 7, seed: 9 });
    c.node(ag, F).wipe("b1@ميساج", 0.3).on((t, s) => { s.px = 541; s.py = 772; s.s *= 1 + 0.01 * Math.sin((t / 1.4) * TAU); });

    // un coup de surligneur sous « WhatsApp-Chatgruppe » (en-tête), DERRIÈRE le texte
    const hl = el("g"); el("path", { d: U.rrect(290, 411, Math.round(D.outils.mesure("WhatsApp-Chatgruppe", 21, "light")) + 9, 16, 6), fill: "#F8CE4E", opacity: 0.9 }, hl);
    const hn = c.node(hl, P.tete); P.tete.insertBefore(hn.g, P.tete.firstChild); hn.wipe("b1@فـWhatsApp", 0.25);
  } });

  /* ═══════ 2 · ACCROCHE — elle, et le ticket qui sort de sa poche (b2 → b3) — PIÈCE (salle des médecins) ═══════
   * Sortie du téléphone : le fantôme rétrécit jusque dans sa main ; la salle se construit en cascade derrière.
   * C'est ELLE que le tribunal fait payer : le ticket de caisse s'imprime hors de SA poche (« من جيبها »). */
  st.scene({ from: "b2", in: "cut", inDur: 0, build(c) {
    const k = X.use(c); k.bg();
    const m = M.of(c), t0 = T("b2");
    const aW = T("b2@والمحكمة"), aH = T("b2@حكمات"), aK = T("b2@تخلصهم"), aJ = T("b2@جيبها");
    c.camera([{ at: "b2", s: 1.0, cx: 540, cy: 920 }, { at: "b2+0.1", s: 1.03, cx: 540, cy: 920, d: 3.1, ease: "lin" }]);   // pas de zoom (le tableau passerait sous la pastille)
    c.kick("b2@حكمات", 0.05); c.kick("b2@تخلصهم", 0.04); c.kick("b2@جيبها", 0.04);   // un peu moins que le § 4 : le tableau monterait sous la pastille
    L.salle(c, {});

    // ELLE (pieds (530, 1320), échelle 1,04), « téléphone levé d'une main », trois-quarts vers la droite ; corps, téléphone et ticket
    // dans UN groupe (respiration, coup de pied au sol)
    const S = 1.04, X0 = 530, Y0 = 1320;
    const corps = c.group().on(breathe(1)).on((t, s) => { const p = prog(t, aJ, 0.18); if (p > 0 && p < 1) s.y += 6 * Math.sin(Math.PI * p); });
    pp(X0, Y0, S, (t) => {
      let e = { expr: "focused", look2: [0.3, 0.6], headTilt: 0 };                                            // elle lit son téléphone
      if (t >= aW) e = { expr: "worried", look2: [0.2, -0.8], headTilt: -3 };                                // la bannière tombe : elle lève les yeux
      if (t >= aH) e = { expr: "shock", look2: [0, -0.4], headTilt: t < aH + 0.3 ? -8 : -3, sweat: true };   // tête en arrière 0,3 s, sueur
      if (t >= aK) e = { expr: "shock", look2: [0.2, 1], headTilt: 10, sweat: true };                         // elle baisse la tête vers sa poche
      if (t >= aJ) e = { expr: "angry", look2: [0.25, 0.9], headTilt: 6 };
      const pied = t >= aJ - 0.14 && t < aJ ? { legR: [26, -64] } : {};                                       // le pied se lève… et frappe à b2@جيبها
      return Object.assign({}, CAST.ELLE, { view: "three-quarter", facing: 1, armR: [40, -112], armL: [-10, 12], blink: blinkAt(t, 1) > 0.5 ? 1 : 0, talk: 0 }, e, pied);
    }, corps.g);
    // son téléphone dans la main droite (Persona.util.rig : main en (11,4 ; −222,8)) : 22 px au-dessus, incliné de 8°
    c.sk((g, p) => D.telMini(g, p), (t) => ({ lueur: t >= aW && t < aJ ? 1 : 0 }), X0 + 11.4 * S, Y0 + (-222.8 - 22) * S, S, 8, corps.g)
      .on((t, s) => { s.o *= t >= t0 + 0.42 ? 1 : 0; const p = prog(t, aW, 0.3); if (p > 0 && p < 1) s.x += 3 * Math.sin((t - aW) * 90) * (1 - p); });
    // le ticket : fente de la poche = hanche (0, −168) + (24, 22), à l'échelle ; il s'imprime par à-coups de 12 px, puis pend
    const fx = X0 + 24 * S, fy = Y0 + (-168 + 22) * S;
    const tk = c.sk((g, p) => D.ticketPoche(g, p), (t) => ({ sorti: Math.floor(clamp((t - aK) / 0.3, 0, 1) * 9) / 9 }), fx, fy, S, 0, corps.g);
    m.pend(tk, aK + 0.32, 3, [fx, fy], { idle: 0.5 });
    tk.pulse(aJ, 0.4, 0.1);
    // le coup de pied : poussière au sol + marque de colère
    c.sk((g, p) => D.poussiere(g, p), (t) => ({ p: rnd(clamp((t - aJ) / 0.35, 0, 1), 20) }), X0 + 22, Y0 + 2, 1).on((t, s) => { s.o *= t >= aJ && t < aJ + 0.36 ? 1 : 0; });
    m.obj(D.colere, 662, 880, 1.1).pop(aJ + 0.05, 0.3).wobble(aJ + 0.35, 0.6, 10);

    // c.hud : fantôme du téléphone, bannière du tribunal, pastilles, étiquette de mention
    H.fantome(c, { at: "b2", vers: [541, 1094], rot: 8 });
    H.banniere(c, { at: "b2@والمحكمة", until: "b2@جيبها", y: 284, sceau: true, titre: "Arbeitsgericht Siegburg" });
    H.pastille(c, "Stationsärztin", "طبيبة القسم", { at: "b2@طبيبة", until: "b2@والمحكمة-0.05", x: 520, y: 402, size: 30 });
    H.pastille(c, "« verurteilt, … zu zahlen »", "المحكمة حكمات: تخلص", { at: "b2@حكمات+0.15", x: 520, y: 402, size: 28, yellow: true, micro: "laut Urteil" });
    H.mention(c, STATUT, { forme: "etiquette" });
  } });

  /* ═══════ 3 · ACCROCHE — pas un patient, un collègue (b3 → i1) — ÉCRAN (plongée depuis sa main) ═══════ */
  st.scene({ from: "b3", in: "cut", inDur: 0.4, build(c) {
    X.use(c);
    const m = M.of(c);
    const aP = T("b3@كتباتش"), aM = T("b3@مريض"), a4 = T("b3@4"), aZ = T("b3@زميل");
    const P = L.fil(c, { entree: "plongee", depuis: [541, 1105, 0.08], titre: "Ärzte-AC", sous: "WhatsApp-Chatgruppe · 9 Mitglieder", date: "22.05.2026", batt: 0.7, mention: STATUT });
    const F = P.fil.g, Cn = P.contenu;
    // le même message, réduit
    A.bulleFil(c, F, 342, 600, 440, 190, [806, 820], { mat: "vert" });
    c.text("Nur zu Jedermanns Info …", 366, 642, 26, "de light", "start", F);
    pose(c, F, "gribouillis", { w: 390, seed: 33 }, 366, 660);
    pose(c, F, "caviar", { w: 150, seed: 51 }, 366, 690); pose(c, F, "caviar", { w: 200, seed: 61 }, 530, 690);
    pose(c, F, "caviar", { w: 90, seed: 52 }, 366, 732); pose(c, F, "caviar", { w: 260, seed: 62 }, 470, 732);
    A.avatarVif(c, F, "ELLE", 832, 836, 32, (t) => ({ expr: "focused", look2: [t < a4 ? -0.6 : 0.2, 0.7] }), { k: 1 });

    // la flèche qui se divise : un tronc, puis à gauche (patient), puis à droite (collègue)
    const tg = el("g"); D.outils.ln(tg, "M404 796 Q408 822 426 846", 4.5);
    c.node(tg, P.dessus).wipe("b3+0.06", 0.25, "down");
    trace(c, P.dessus, [426, 846], [338, 904], aP, 0.25, { courbe: 0.12 });
    trace(c, P.dessus, [426, 846], [680, 890], a4, 0.3, { courbe: -0.1 });

    // un patient : barré
    const pb = c.group(Cn).float(4, 2.6, 0);
    const pg = el("g", { transform: "translate(330 1000)" }); D.avatarPatient(pg, { r: 78 });
    const pat = c.node(pg, pb.g);
    A.jaillit(pat, aP, 330, 1000, 0.3);
    pat.on((t, s) => { const p = E.out(prog(t, aM + 0.12, 0.3)); if (p > 0) { s.o *= 1 - 0.65 * p; s.px = 330; s.py = 1000; s.s *= 1 - 0.15 * p; } });
    frappe(pose(c, pb.g, "croix", { w: 150, h: 150, sw: 10 }, 330, 1000), aM + 0.12, 330, 1000, 0.22, 2.2);
    A.buzz(P.tel, aM + 0.32, 5, 0.3);
    c.text("مريض", 330, 1146, 52, "ttl", "middle", Cn).wipe(aM, 0.25, "rtl");

    // un collègue : LUI, entouré de jaune
    const lb = c.group(Cn).float(4, 2.6, 1.7);
    const lui = A.avatarVif(c, lb.g, "LUI", 700, 1000, 78, (t) => ({ expr: t >= aZ + 0.3 ? "worried" : "neutral", look2: [-0.5, -0.6] }), { badge: "stetho" });
    m.build(lui, a4, "drop", { dist: 120, dur: 0.45 });
    const rg = el("g", { transform: "translate(700 1000)" }); D.anneau(rg, { w: 184, h: 184, sw: 8, seed: 12 });
    c.node(rg, lb.g).wipe(aZ, 0.3).on((t, s) => { s.px = 700; s.py = 1000; s.s *= 1 + 0.015 * Math.sin((t / 1.4) * TAU); });
    c.text("زميل ديالها", 700, 1146, 52, "ttl", "middle", Cn).wipe(aZ, 0.3, "rtl");
    A.punch(P.tel, aZ, 0.04);
    H.pastille(c, "Gesundheitsdaten eines Kollegen", "المعطيات الصحية ديال زميل", { at: "b3@زميل+0.15", size: 26, parent: P.bande });
  } });

  /* ═══════ 4 · INTRO — la fiche « contact » de Yassine (i1 → b4) — ÉCRAN (T-NOTIF), summary: false ═══════
   * Éléments du SOCLE (photo assets/portrait.png, anneau jaune, icône Instagram, ruban « Yassine », @dr.aguilo, pastilles, cœur
   * j'aime et bouton s'abonner animés sur les mots) posés dans l'écran du téléphone ; le bloc finit à y 1272 ; logo du haut masqué
   * par le HUD du socle (story.js). */
  st.scene({ from: "i1", in: "cut", inDur: 0.36, summary: false, build(c) {
    const k = X.use(c), m = M.of(c);
    const la = T("i3@j'aime"), fa = T("i3@abonne");
    const P = L.contact(c, { entree: "notif", banniere: { contact: true }, dateAvant: "22.05.2026", date: "", batt: 0.7,
      etoile: (t) => ({ a: 360 * E.inOut(prog(t, la, 0.5)), pleine: t >= la }) });
    const Cn = P.contenu;
    A.dans(Cn, m.rays(525, 648, { op: 0.15, R: 330, speed: 6, at: "i1" }));
    // la photo dans son cadre au trait : ombre, anneau jaune r 200, photo r 176, trait d'encre r 177, reflet ; icône Instagram accrochée
    const photo = el("g"), C = U.ctx(photo, 88, false, 1);
    const cp = el("clipPath", { id: "clipPortrait07" }, el("defs", {}, photo)); el("circle", { cx: 0, cy: 0, r: 176 }, cp);
    el("circle", { cx: 8, cy: 10, r: 200, fill: "#D2D2CB" }, photo);
    U.shape(C, "ring", "M-200 0 A200 200 0 1 1 200 0 A200 200 0 1 1 -200 0", MAT.yellow, { sw: 4 });
    el("image", { href: "assets/portrait.png", x: -178, y: -178, width: 356, height: 356, "clip-path": "url(#clipPortrait07)", preserveAspectRatio: "xMidYMid slice" }, photo);
    U.shape(C, "ring1", "M-177 0 A177 177 0 1 1 177 0 A177 177 0 1 1 -177 0", {}, { sw: 5.5 });
    U.stroke(C, "dash", "M-112 -151 C -64 -186, 50 -190, 113 -150", { sw: 3, stroke: "#FFFFFF" });
    const ig = el("g", { transform: "translate(136 136)" }, photo), I = U.ctx(ig, 89, false, 1);
    el("path", { d: U.rrect(-42, -42, 84, 84, 24), fill: "#D2D2CB", transform: "translate(5 6)" }, ig);
    U.shape(I, "sq", U.rrect(-42, -42, 84, 84, 24), MAT.white, { sw: 4 });
    U.shape(I, "c", "M-17 0 A17 17 0 1 1 17 0 A17 17 0 1 1 -17 0", MAT.yellow, { sw: 4 });
    el("circle", { cx: 22, cy: -22, r: 5.5, fill: INK }, ig);
    const ph = c.node(photo, Cn).on((t, s) => { s.x += 525; s.y += 648 + 3 * Math.sin((t / 3) * TAU); }).pop("i1", 0.4);
    const dg = el("g"); el("circle", { cx: 0, cy: 0, r: 9, fill: "#F8CE4E", stroke: INK, "stroke-width": 2.6 }, dg);   // point « en ligne »
    c.node(dg, ph.g).on((t, s) => { s.x += 172; s.y += 100; s.px = 0; s.py = 0; s.s *= 1 + 0.22 * (0.5 + 0.5 * Math.sin((t / 1.2) * TAU)); });
    // « Yassine » (jamais « Dr. »), Instagram + @dr.aguilo
    k.ribbon("Yassine", 525, 900, { size: 56, parent: Cn }).wipe("i1@ياسين", 0.35);
    const hd = el("g"), H2 = U.ctx(hd, 90, false, 1);
    U.shape(H2, "sq", U.rrect(-21, -21, 42, 42, 12), MAT.white, { sw: 3 }); U.stroke(H2, "c", "M-9 0 A9 9 0 1 1 9 0 A9 9 0 1 1 -9 0", { sw: 3 }); el("circle", { cx: 12, cy: -12, r: 3, fill: INK }, hd);
    c.node(hd, Cn).on((t, s) => { s.x += 395; s.y += 990; }).pop("i1@ياسين+0.15", 0.3);
    c.text("@dr.aguilo", 545, 1006, 46, "de", "middle", Cn).fade("i1@ياسين+0.15", 0.3);
    H.pastille(c, "Arzt in Deutschland", "طبيب فألمانيا", { at: "i1@فألمانيا", until: "i2@حقيقية", x: 525, y: 1068, size: 26, parent: Cn });
    H.pastille(c, "echte Fälle · deutsche Gerichte", "قصص حقيقية من المحاكم", { at: "i2@حقيقية+0.15", until: "i3", x: 525, y: 1068, size: 26, yellow: true, parent: Cn });
    // j'aime + s'abonner
    const bat = (t) => (t < la ? 0 : t < la + 0.35 ? Math.sin((Math.PI * (t - la)) / 0.35) : 0.4 * (0.5 + 0.5 * Math.sin(((t - la - 0.35) / 0.9) * TAU)));
    c.sk((g, p) => PE.props.heart(g, { size: 1.25, fill: p.on, beat: p.b }), (t) => ({ on: t >= la, b: rnd(bat(t), 10) }), 340, 1196, 1, 0, Cn).pop("i3", 0.3);
    c.text("j'aime", 340, 1264, 30, "de", "middle", Cn).pop("i3", 0.3);
    c.sk((g, p) => {
      const B = U.ctx(g, 91, false, 1);
      el("path", { d: U.rrect(-150, -42, 300, 84, 22), fill: "#D2D2CB", transform: "translate(6 7)" }, g);
      U.shape(B, "btn", U.rrect(-150, -42, 300, 84, 22), p.on ? MAT.yellow : MAT.white, { sw: 3.4 });
      U.text(g, p.on ? "✓ abonné" : "+ s'abonner", 0, 14, 40, {});
    }, (t) => ({ on: t >= fa }), 650, 1200, 1, 0, Cn).pop("i3+0.1", 0.3);
    A.punch(P.tel, "i3@j'aime", 0.04); A.punch(P.tel, "i3@abonne", 0.04);
  } });

  /* ═══════ 5 · Le groupe (b4 → b5) — ÉCRAN (T-NOTIF) ═══════
   * Neuf médecins (rangée fixe d'avatars sous la bande) ; trois sujets qui arrivent par le bas et poussent le fil : la garde,
   * le congé, le cadeau. Le nom et le nombre sont dans le jugement (« laut Urteil ») ; le texte des bulles est reconstitué. */
  st.scene({ from: "b4", in: "cut", inDur: 0.36, build(c) {
    X.use(c);
    const t0 = T("b4"), a9 = T("b4@3"), aA = T("b4@les"), aB = T("b4@الكونجيات"), aC = T("b4@الكادوات");
    const defile = (t) => -336 + 168 * E.back(prog(t, aB, 0.3)) + 168 * E.back(prog(t, aC, 0.3));   // A arrive à y 1056, puis le fil monte deux fois
    const P = L.fil(c, { entree: "notif", banniere: { titre: "Ärzte-AC", ligne: "WhatsApp-Chatgruppe" }, dateAvant: "", date: "Mai 2025", batt: 0.9,
      filY: 690, filH: 610, defile, mention: [{ at: "b4", de: "laut Urteil", ar: "حسب الحكم" }, { at: "b4@les", de: "Rekonstruktion", ar: "مشهد تمثيلي" }] });
    const F = P.fil.g;
    // l'en-tête s'écrit ; le sous-titre compte les membres
    A.tape(c, P.tete, "Ärzte-AC", 294, 390, 36, "de", t0 + 0.3, 0.35);
    const sous = c.text("WhatsApp-Chatgruppe", 294, 422, 21, "de light", "start", P.tete).fade(t0 + 0.45, 0.3);
    sous.on((t) => { const n = t < a9 ? 0 : Math.round(lerp(1, 9, E.out(prog(t, a9, 0.55)))), s = n ? `WhatsApp-Chatgruppe · ${n} Mitglieder` : "WhatsApp-Chatgruppe";
      if (sous.textEl.textContent !== s) sous.textEl.textContent = s; });
    H.pastille(c, "Ärzte-AC", "گروپ أطباء الجراحة", { at: "b4@الجراحة", until: "b4@3-0.04", size: 30, parent: P.bande });
    H.pastille(c, "9 Mitglieder", "9 ديال الأعضاء", { at: "b4@3+0.1", size: 30, parent: P.bande });

    // la rangée des neuf (ELLE, LUI, K1…K7), hors du fil : ils clignent en désordre et regardent la dernière bulle
    const bulleX = (t) => (t >= aC ? 497 : t >= aA ? 427 : 525);
    const content = { K3: aA, K4: aB };
    A.MEMBRES.forEach((q, i) => {
      const x = 229 + 74 * i;
      const n = A.avatarVif(c, P.contenu, q, x, 634, 30, (t) => {
        let expr = "neutral";
        if (content[q] != null && t >= content[q]) expr = "smile";
        if ((q === "K1" || q === "K5") && t >= aC) expr = "bigsmile";
        return { expr, look2: [clamp((bulleX(t) - x) / 260, -0.9, 0.9), 0.8] };
      });
      A.jaillit(n, a9 + 0.06 * i, x, 634, 0.25);
    });

    // le fil (coordonnées « défilement 0 ») : deux anciens messages illisibles, puis les trois sujets
    const auteur = (q, y, at, fn) => { const n = A.avatarVif(c, F, q, 216, y, 30, fn); if (at != null) A.jaillit(n, at, 216, y, 0.25); return n; };
    // placés pour être entiers au départ et sortir ENTIÈREMENT par le haut (aucun avatar à moitié coupé sous la rangée des neuf)
    [[360, 90, 360, "K6", [300, 236]], [500, 104, 300, "K2", [250, 170]]].forEach(([y, h, w, q, ls], i) => {
      A.bulleFil(c, F, 262, y, w, h, [244, y + h + 26], { seed: 803 + i });
      ls.forEach((lw, j) => pose(c, F, "gribouillis", { w: lw, seed: 90 + i * 5 + j }, 290, y + 26 + j * 34));
      auteur(q, y + h + 36, null, () => ({ look2: [0.4, -0.3] }));
    });
    const sujet = (y, w, ico, icoFn, de, tr, lat, q, at, fnA) => {
      const bas = y + 134, grp = c.group(F);
      A.bulleFil(c, grp.g, 262, y, w, 134, [244, bas + 26]);
      c.sk((g, p) => D[ico](g, p), icoFn, 323, y + 67, 1, 0, grp.g);
      c.text(de, 384, y + 58, 30, "de", "start", grp.g);
      D.outils.tx(grp.g, tr, 262 + w - 22, y + 106, 28, lat ? "de" : "ar", "end");
      A.jaillit(grp, at, 244, bas + 26, 0.3);
      auteur(q, bas + 36, at - 0.06, fnA);
    };
    sujet(720, 330, "icoDienst", (t) => ({ k: Math.floor((t - aA) / 0.5) }), "Dienst", "la garde", true, "K3", aA, (t) => ({ expr: "smile", look2: [0.6, -0.4] }));
    sujet(888, 330, "icoUrlaub", (t) => ({ a: Math.round(5 * Math.sin((t / 2.2) * TAU)), r: Math.round(((t * 40) % 45) / 3) * 3 }), "Urlaub", "الكونجي", false, "K4", aB, (t) => ({ expr: "smile", look2: [0.6, -0.4] }));
    sujet(1056, 470, "icoCadeau", (t) => { const u = t - aC; return { a: u > 0 && u < 0.5 ? Math.round(8 * Math.sin(u * TAU * 5) * (1 - u / 0.5)) : Math.round(3 * Math.sin(t * 2.6)), saut: u > 0 && u < 0.3 ? rnd(Math.sin((Math.PI * u) / 0.3), 5) : 0 }; },
      "Geburtstagsgeschenk", "كادو ديال عيد الميلاد", false, "K1", aC, (t) => ({ expr: "bigsmile", look2: [0.6, -0.4] }));
    A.punch(P.tel, aC, 0.03);
  } });
});
