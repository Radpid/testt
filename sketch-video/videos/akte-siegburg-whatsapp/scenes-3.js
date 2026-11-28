/* scenes-3.js — PARTIE 3 de l'épisode AKTE 07 « الگروپ » : scènes 12 à 16 du storyboard (§ 4).
 *  12 · L'été : la lettre (b11 → b12@فمشى)                         PAPIER (view: false) : le téléphone sort, l'enveloppe, « erfolglos »
 *  13 · « Plans » : le tribunal de Siegburg (b12@فمشى → b13)        ÉCRAN (montée) : champ de recherche, épingle, fiche du lieu
 *  14 · Il n'est plus dans le groupe ; il quitte l'hôpital (b13)     PIÈCE, salle des médecins (glissement) : la ligne du système, il part
 *  15 · Appel vidéo : « le groupe est privé à 70 % » (b14)           ÉCRAN (montée + bannière d'appel) : deux tuiles, SA bulle, le camembert
 *  16 · Appel vidéo : « et 30 % de travail » (b15)                   ÉCRAN (coupe) : la part de 30 % devient jaune, « uneinsichtig »
 * Mises en place : X.lieux (papier, plans, salle, appel) ; HUD : X.hud ; aides : X.aides.
 * Scènes ÉCRAN : tout dans c.hud (couches renvoyées par X.lieux) — pas de k.bg(), pas de c.camera / c.kick : punch et buzz.
 */
(window.EP_PARTS = window.EP_PARTS || []).push(function (X) {
  "use strict";
  const { st, T, E, prog, lerp, clamp, el, D, M, CAST, PP, blinkAt, talkAt, rnd, pp, breathe, pinAt } = X;
  const H = X.hud, A = X.aides, L = X.lieux, TAU = Math.PI * 2, mes = (s, size, kind) => D.outils.mesure(s, size, kind);
  const URTEIL = ["laut Urteil", "حسب الحكم"], REKO = ["Rekonstruktion", "مشهد تمثيلي"];
  const blk = (t, k) => (blinkAt(t, k) > 0.5 ? 1 : 0);
  // aimant qui pivote et tombe dans la gouttière du tableau (rebond) — même geste qu'en scène 7
  const chute = (n, at, x0, y0, x1, y1, rot) => { const a = T(at); n.on((t, s) => { const p = prog(t, a, 0.38); if (p <= 0) return;
    s.px = x0; s.py = y0; s.r += rot * E.out(Math.min(1, p * 1.8)); s.x += (x1 - x0) * E.out(p); s.y += (y1 - y0) * M.bounce(p); }); };

  /* ═══════ 12 · L'été : la lettre (b11 → b12@فمشى) — PAPIER ═══════
   * La suite ne passe plus par le téléphone : il lui demande PAR ÉCRIT de s'engager à ne pas recommencer. Elle n'écrit rien :
   * le trait de signature reste vide, le tampon « erfolglos » tombe. Monde = pixels (view: false). */
  st.scene({ from: "b11", in: "cut", inDur: 0, view: false, build(c) {
    const k = X.use(c), m = M.of(c), t0 = T("b11");
    const aM = T("b11@الطبيب"), aT = T("b11@طلب"), aK = T("b11@تكتب"), aR = T("b11@تعاودهاش"), aC = T("b12@كتباتش");
    // § 4 : (590, 1010) à la fin ; cx 570, sinon le widget date et le soleil passent dans le bord rogné (x < 90) ; cy 990, sinon le haut
    // de la lettre touche l'arabe de la pastille « erfolglos » (y 504 contre 500) ; une poussée lente avant
    c.camera([{ at: "b11", s: 1, cx: 540, cy: 960 }, { at: t0 + 0.5, s: 1.015, cx: 545, cy: 966, d: 2.0, ease: "lin" }, { at: "b12-0.05", s: 1.06, cx: 570, cy: 990, d: 0.4 }]);
    L.papier(c, { mention: URTEIL, formes: { seed: 12, pts: [[130, 880], [950, 520], [140, 1330], [930, 760]], at: t0 + 0.2 } });

    // l'été : widget « JULI 25 » (il respire) et petit soleil (rayons qui tournent derrière) — 10 px plus à droite et plus bas que le § 4
    const SX = 200, SY = 506, WX = 240, WY = 556;
    m.rays(SX, SY, { n: 10, R: 62, op: 0.5, speed: 14, at: t0 + 0.2 });
    const wid = c.sk((g, p) => D.widgetDate(g, p), () => ({ haut: "JULI", jour: "25", bas: "2025" }), WX, WY);
    A.jaillit(wid, t0 + 0.08, WX, WY + 85, 0.25, 0.3);
    wid.on((t, s) => { if (t > t0 + 0.33) { s.px = WX; s.py = WY + 85; s.s *= 1 + 0.01 * Math.sin(((t - t0) / 2.4) * TAU); } });
    const sol = c.sk((g, p) => D.soleilEte(g, p), (t) => ({ a: Math.round((t * 14) % 36) }), SX, SY);
    A.jaillit(sol, t0 + 0.2, SX, SY, 0.3, 0.2);

    // l'enveloppe arrive de la droite : dos (rabat) → la lettre (découpée sous l'enveloppe) → devant
    const EX = 620, EY = 1230, env = c.group();
    c.sk((g, p) => D.enveloppe(g, p), (t) => ({ partie: "dos", ouvert: rnd(E.out(prog(t, aM, 0.25)), 10) }), EX, EY, 1, 0, env.g);
    const lt = c.group(c.clipped(0, -600, 1080, 1945, env.g));   // rien de la lettre sous le bas de l'enveloppe (y 1345)
    c.sk((g, p) => D.enveloppe(g, p), () => ({ partie: "devant" }), EX, EY, 1, 0, env.g);
    m.build(env, t0 + 0.12, "right", { dist: 320, dur: 0.4 });

    // la lettre : elle monte hors de l'enveloppe (540 px : au départ, son haut est caché derrière le devant), se déplie, flotte
    const LX = 620, LY = 865, aL = aM + 0.1;
    lt.on((t, s) => { s.y += 540 * (1 - E.out(prog(t, aL, 0.45))); if (t > aL + 0.45) s.y += 2 * Math.sin(((t - aL - 0.45) / 3) * TAU); });
    c.sk((g, p) => D.lettre(g, p), (t) => ({ plie: rnd(1 - E.out(prog(t, aL + 0.3, 0.35)), 10), signature: rnd(prog(t, aK, 0.35), 20) }), LX, LY, 1, 0, lt.g);
    A.avatarVif(c, lt.g, "LUI", LX - 174, LY - 233, 34, () => ({ expr: "focused", look2: [0.4, 0.3] }), { k: 4 });
    // titre tapé (ancré à gauche pour que la frappe avance), date tapée
    const ti = "Unterlassungserklärung", xT = Math.round(LX - mes(ti, 34, "de") / 2);
    A.tape(c, lt.g, ti, xT, LY - 130, 34, "de", aT, 0.5);
    const da = "25.07.2025";
    A.tape(c, lt.g, da, Math.round(LX + 192 - mes(da, 24, "de")), LY - 225, 24, "de", aT + 0.3, 0.3);
    // bloc signature : son avatar à ELLE (la croix et le trait sont dans D.lettre, o.signature) ; elle regarde ailleurs, puis détourne la tête
    const av = A.avatarVif(c, lt.g, "ELLE", LX + 170, LY + 185, 34, (t) => (t < aR ? { expr: "angry", look2: [-0.5, 0.2] } : { expr: "angry", look2: [-0.9, 0], headTilt: -8 }), { k: 1 });
    A.jaillit(av, aK + 0.05, LX + 170, LY + 185, 0.3);
    // le tampon « erfolglos » (sur la lettre) : slam + secousse
    // (revue) x 590 → 565 : posé, le coin droit du cadre touchait l'avatar d'ELLE
    k.prop("stamp", 565, 985, 0.62, () => ({ text: "erfolglos", size: 48, rot: -8 }), 0, lt.g).slam(aC, 0.28, 8);

    // le stylo : il tombe sur le trait (rebond), attend (il oscille), puis roule vers la droite et tombe hors du cadre
    const sty = m.obj(D.stylo, 600, 1048, 1);
    m.build(sty, aK + 0.12, "drop", { dist: 170, dur: 0.45 });
    sty.on((t, s) => { s.px = 600; s.py = 1048; s.r += -6;
      if (t > aL + 0.45) s.y += 2 * Math.sin(((t - aL - 0.45) / 3) * TAU);                     // il flotte avec la lettre
      const w = prog(t, aR, 0.8); if (w > 0 && w < 1) s.r += 3 * Math.sin(w * Math.PI * 3) * (1 - w * 0.5);
      const p = prog(t, aC + 0.05, 0.5); if (p > 0) { s.x += 560 * E.in(p); s.y += 40 * p + 420 * p * p * p; s.r += 160 * p; } });

    // le téléphone posé : écran qui s'éteint, il glisse vers le bas à gauche et sort du cadre
    H.fantome(c, { at: "b11", dur: 0, vert: true, eteint: (t) => clamp((t - t0) / 0.3, 0, 1) })
      .on((t, s) => { const p = E.in(prog(t, t0, 0.5)); s.px = 525; s.py = 860; s.x += -300 * p; s.y += 900 * p; s.r += -18 * p; s.o *= p < 1 ? 1 : 0; });

    H.pastille(c, "Unterlassungserklärung · 25.07.2025", "التزام مكتوب: ما نعاودش", { at: aK, until: aC - 0.02, x: 520, y: 420, size: 26 });
    H.pastille(c, "« erfolglos »", "بلا نتيجة", { at: aC + 0.03, x: 520, y: 420, size: 34 });
  } });

  /* ═══════ 13 · « Plans » : le tribunal de Siegburg (b12@فمشى → b13) — ÉCRAN (montée) ═══════
   * Il va au tribunal du travail, à Siegburg. L'épingle montre le TRIBUNAL (jamais l'hôpital) ; aucune autre ville que Berlin. */
  st.scene({ from: "b12@فمشى", in: "cut", inDur: 0.36, build(c) {
    const k = X.use(c), m = M.of(c), t0 = T("b12@فمشى");
    const aA = T("b12@Arbeitsgericht"), aY = T("b12@يعني"), aF = T("b12@فمدينة"), aS = T("b12@Siegburg");
    const P = L.plans(c, { entree: "montee", date: "10.09.2025", batt: 0.9, mention: URTEIL, carteAt: t0 + 0.2 });
    // le champ de recherche : « Arbeitsgericht Siegburg » se tape, le curseur suit la frappe
    const q = "Arbeitsgericht Siegburg", aQ = Math.max(aA, t0 + 0.3);
    A.tape(c, P.tete, q, 250, 404, 28, "de", aQ, 0.6);
    A.curseur(c, P.tete, (t) => 250 + mes(q.slice(0, Math.round(q.length * prog(t, aQ, 0.6))), 28, "de") + 4, 404, t0 + 0.36, null);

    // Siegburg geo(7.21, 50.80) = (348, 896) : ondes (sous l'épingle), épingle qui tombe et oscille ; la carte grossit ×1,2 autour d'elle
    const PX = 348, PY = 896;
    A.dans(P.carte.g, m.ripple(PX, PY, aS + 0.35, { n: 3, R: 120, sw: 5, dur: 0.8, gap: 0.18 }));
    A.dans(P.carte.g, pinAt(c, PX, PY, aS));
    // (ajout) à « فمدينة » la carte se rapproche déjà un peu de l'ouest (×1,08), comme l'application qui cherche le lieu ; puis ×1,2
    P.carte.on((t, s) => { const p1 = E.inOut(prog(t, aF - 0.1, 0.5)), p2 = E.inOut(prog(t, aS + 0.25, 0.5));
      if (p1 > 0) { s.px = PX; s.py = PY; s.s *= lerp(1, 1.08, p1) * lerp(1, 1.2 / 1.08, p2); } });
    A.punch(P.tel, aS + 0.35, 0.05);

    // la carte-légende « Siegburg · المحكمة », à côté de l'épingle
    const lg = c.group(P.contenu);
    k.card(410, 818, 280, 150, { parent: lg.g, seed: 913 });
    c.text("Arbeitsgericht", 550, 850, 20, "de light", "middle", lg.g);
    c.text("Siegburg", 550, 896, 44, "de", "middle", lg.g);
    c.text("المحكمة", 550, 948, 40, "ttl", "middle", lg.g);
    A.jaillit(lg, aS + 0.25, 550, 893, 0.3);

    // la fiche du lieu : son haut (poignée + titre) dépasse du bas dès la fin de la frappe (le résultat de la recherche : sinon le bas
    // de l'écran reste blanc 2 s) ; à « فمدينة » elle monte en entier (la plainte, ce qu'il réclamait), ses deux lignes à +0,15 et +0,3
    const aP = aQ + 0.65;
    c.sk((g, p) => D.ficheLieu(g, p), (t) => ({ lignes: rnd(clamp((t - aF - 0.1) / 0.15, 0, 2), 5) }), 172, 1170, 1, 0, P.contenu)
      .on((t, s) => { s.o *= t >= aP ? 1 : 0; s.y += t < aF ? lerp(240, 130, E.back(prog(t, aP, 0.3))) : lerp(130, 0, E.back(prog(t, aF, 0.3))); });

    H.pastille(c, "Arbeitsgericht", "محكمة الشغل", { at: aY, size: 30, parent: P.bande });
  } });

  /* ═══════ 14 · Il n'est plus dans le groupe ; il quitte l'hôpital (b13 → b14) — PIÈCE (glissement vers le haut) ═══════
   * La même pièce, sans ELLE (personne ne triomphe). La ligne du système, sans date ; la roue de la date tourne puis se cale sur
   * « 31 DEZ 2025 » ; il part avec son carton. Le message a compté (« mitursächlich »), il n'est pas la seule cause. */
  st.scene({ from: "b13", in: "slideUp", inDur: 0.34, build(c) {
    X.use(c);
    SketchUI.dots(c, -1500, -150, 4080, 2700);   // pas de k.bg() : pendant le glissement, la scène d'avant reste visible au-dessus
    const m = M.of(c), t0 = T("b13"), aF = T("b13@وفآخر"), aK = T("b13@خلا"), aS = T("b13@السبيطار");
    c.camera([{ at: "b13", s: 1.0, cx: 540, cy: 920 }, { at: "b13+0.1", s: 1.03, cx: 540, cy: 920, d: 2.8, ease: "lin" }]);
    // la roue du widget date : elle tourne (illisible) jusqu'à « وفآخر », ralentit et se cale en 0,4 s, petit rebond
    const posW = (t) => { if (t < aF) return Math.round((t - t0) * 600);
      const p = prog(t, aF, 0.4); if (p < 1) return Math.round(600 * (aF - t0) + 240 * (p - p * p / 2));
      const q = prog(t, aF + 0.4, 0.3); return Math.round(-7 * Math.sin(Math.PI * q) * (1 - q)); };
    const roule = (t) => (t < aF ? 0.15 : prog(t, aF, 0.4) < 1 ? lerp(0.15, 0.9, prog(t, aF, 0.4)) : 1);
    const porte = (t) => (t < aK + 1.15 ? E.out(prog(t, aK + 0.5, 0.35)) : lerp(1, 0.5, E.inOut(prog(t, aK + 1.15, 0.3))));
    const R = L.salle(c, { cascade: false, blouses: 2, machine: false, porte,
      widget: (t) => ({ petit: true, haut: "DEZ", jour: "31", bas: "2025", roule: rnd(roule(t), 20), pos: posW(t) }),
      aimants: [{ qui: "lui", case: "fr" }, { qui: "gris", case: "sa" }, { qui: "lui", case: "so" }] });
    // ses deux aimants se décrochent et tombent dans la gouttière ; plus tard, un aimant gris prend la case du vendredi
    chute(R.aimants[0], t0 + 0.3, 478, 690, 452, 770, 40);
    chute(R.aimants[2], t0 + 0.55, 650, 690, 610, 770, -40);
    { const g = el("g", { transform: "translate(478 690)" }); D.aimant(g, { qui: "gris" }); c.node(g, R.tableau.g).slam(aF + 0.45, 0.25, 5); }
    m.pend(R.blouses[1], aK + 0.6, 7, [378, 620], { idle: 0 });   // SA blouse, restée à la patère, se balance à son passage

    // LUI, de profil vers la gauche, son carton dans les bras ; il regarde le tableau, puis la porte ; il marche (vrai cycle) et sort
    // La marche est menée par les PIEDS : le corps avance exactement du recul du pied posé (mesuré sur Persona.util.rig, 64 phases) ;
    // une vitesse constante faisait glisser les pieds (le pied posé de PP.walk recule à vitesse sinusoïdale). ≈ 298 px par cycle
    // à l'échelle 1,02 → 1,1 cycle/s pour faire les 375 px du § 4 en 1,15 s ; il continue de marcher pendant qu'il s'efface.
    const S = 1.02, Y0 = 1320, X0 = 610, fq = 1.1, Q = 32;
    const WK = Object.assign({}, CAST.LUI, { outfit: "jacket", view: "side", facing: -1, armL: [30, 60], armR: [24, 70], armLBack: false });
    const pied = []; for (let i = 0; i <= Q; i++) { const a = X.PE.util.rig(Object.assign({}, WK, PP.walk(i / Q), { view: "side", facing: -1 })); pied.push([a.footL[0], a.footR[0]]); }
    const cum = [0]; for (let i = 1; i <= Q; i++) { const ph = (i - 0.5) / Q, j = ph >= 0.25 && ph < 0.75 ? 1 : 0; cum.push(cum[i - 1] + pied[i][j] - pied[i - 1][j]); }
    const uQ = (t) => Math.max(0, Math.round((t - aK) * fq * Q)), recul = (t) => { const n = uQ(t); return Math.floor(n / Q) * cum[Q] + cum[n % Q]; };
    const marche = (t) => t >= aK, ph = (t) => (uQ(t) % Q) / Q;
    const corps = c.group().on(breathe(1)).on((t, s) => { s.x += X0 - S * recul(t); s.o *= 1 - prog(t, aK + 1.15, 0.2); });
    const lent = (t) => { const q = (t + 0.9) % 3.1; return q < 0.22 ? 1 : 0; };   // clignement lent
    const lui = pp(0, Y0, S, (t) => {
      const regard = t < aK - 0.3 ? { look2: [0.15, -0.9], headTilt: -6 } : { look2: [0.9, 0.1], headTilt: 0 };   // le tableau, puis la porte
      const jambes = marche(t) ? PP.walk(ph(t)) : PP.stand;
      return Object.assign({}, CAST.LUI, { outfit: "jacket", expr: "sad", tears: 0, talk: 0, blink: lent(t) }, jambes, regard,
        { view: "side", facing: -1, armL: [30, 60], armR: [24, 70], armLBack: false });
    }, corps.g);
    // le carton suit ses mains (n.out.handL, repère du personnage) ; le contenu tressaute à chaque pas
    c.sk((g, p) => D.carton(g, p), (t) => ({ dy: marche(t) ? rnd(2 * Math.sin(ph(t) * 2 * TAU), 2) : 0 }), 0, 0, S, 0, corps.g)
      .on((t, s) => { const h = (lui.out && lui.out.handL) || [-95, -225]; s.x += (h[0] - 25) * S; s.y += Y0 + (h[1] - 3) * S; });

    // c.hud : la ligne grise du système (sans date) tombe en haut du cadre ; son mini-avatar devient un rond pointillé ; elle remonte
    const ls = c.sk((g, p) => D.ligneSysteme(g, p), (t) => ({ p: CAST.LUI, parti: rnd(prog(t, t0 + 0.3, 0.4), 10) }), 240, 300, 1, 0, c.hud);
    m.build(ls, t0, "drop", { dist: 110, dur: 0.2 });
    ls.on((t, s) => { const p = prog(t, aF + 0.15, 0.2); if (p > 0) { s.y -= 130 * E.in(p); s.o *= 1 - p; } });
    H.pastille(c, "« mitursächlich »", "واحد من الأسباب", { at: aS, x: 520, y: 420, size: 30, w: 400, micro: "laut Urteil" });   // w 400 : le micro ne touche plus l'arabe
    H.mention(c, URTEIL, { forme: "etiquette" });
  } });

  /* ═══════ 15 · Appel vidéo : « le groupe est privé à 70 % » (b14 → b15) — ÉCRAN (montée + bannière d'appel) ═══════
   * Devant le tribunal, elle se défend : 70 % privé. Une IMAGE d'appel vidéo (« Rekonstruktion ») : la présidente et ses deux assesseurs
   * en civil (tuile A), elle (tuile B) ; elle parle (seule fois avec la juge) ; sa bulle contient le camembert. */
  st.scene({ from: "b14", in: "cut", inDur: 0.36, build(c) {
    X.use(c);
    const t0 = T("b14"), aH = T("b14@هي"), aG = T("b14@الگروپ"), a7 = T("b14@70%"), aP = T("b14@privé"), aE = T("b14@end");
    const parle = (t) => t >= aG && t < aE;
    const P = L.appel(c, { entree: "montee", mention: REKO, batt: 0.8, tuilesAt: t0 + 0.4, actif: [{ at: aH, tuile: "B" }],
      micro: (t) => (parle(t) ? 0.65 + 0.35 * Math.sin(t * 15) : t >= aH ? 0.3 : 0) });
    P.tel.g.appendChild(P.notif);   // la bannière d'appel monte AVEC le téléphone (sa découpe est celle de l'écran, au repos)
    H.banniere(c, { at: t0, until: t0 + 0.45, parent: P.notif, x: 215, y: 316, w: 620, h: 88, sceau: true, titre: "Arbeitsgericht Siegburg", appel: true,
      appui: (t) => clamp((t - t0 - 0.3) / 0.1, 0, 1) });

    // ELLE en buste (tuile B) : elle écoute, puis explique ; main levée sur le côté qui souligne (2 Hz) pendant qu'elle parle.
    // § 1.1 « elle explique » (armR [40, −112]) : sa main passait sous la plaque de nom ; à droite, le bras croisait la queue de la bulle
    // → main GAUCHE levée sur le côté libre de la tuile (main en (291, 1199), entre le cadre au mur et la plaque)
    const leve = (t) => E.out(prog(t, aG - 0.12, 0.25)) * (1 - E.inOut(prog(t, aE + 0.02, 0.22)));
    pp(400, 1500, 1.12, (t) => {
      let e = { expr: "calm", look2: [0.1, -0.6], headTilt: 0 };                    // elle regarde la tuile du tribunal
      if (t >= aH) e = { expr: "focused", look2: [0.05, -0.1], headTilt: 3 };
      const l = leve(t), osc = parle(t) ? (Math.floor(t * 4) % 2 ? 4 : -4) : 0;
      return Object.assign({}, CAST.ELLE, PP.stand, { view: "front", blink: blk(t, 1), talk: talkAt(t, aG, aE) }, e,
        { armL: [Math.round(lerp(-8, -35, l)), Math.round(lerp(10, -125, l) + osc * l)] });   // (revue) [−136, 116] : avant-bras pendu sous un coude levé (bras cassé) → coude en bas, avant-bras qui monte
    }, P.elle).on(breathe(2));

    // sa bulle jaillit de sa bouche avec le disque vide ; la part de 70 % se remplit en balayant ; « privat », « 30 % »
    const bu = A.dans(P.tuileB.g, M.of(c).speech({ x: 660, y: 1010, w: 290, h: 200, tip: [492, 1150], at: aG }));
    c.sk((g, p) => D.camembert(g, p), (t) => ({ r: 70, rempli: rnd(E.out(prog(t, a7, 0.4)), 20), v70: rnd(prog(t, a7, 0.15), 10),
      privat: rnd(prog(t, aP, 0.3), 12), v30: rnd(prog(t, aP, 0.15), 10) }), 660, 996, 1, 0, bu.g)
      .on((t, s) => { const p = prog(t, a7, 0.3); if (p > 0 && p < 1) { s.px = 660; s.py = 996; s.s *= 1 + 0.08 * Math.sin(Math.PI * p); } });
    A.punch(P.tel, aH, 0.02);
    A.punch(P.tel, aP, 0.03);
    H.pastille(c, "« zu 70% privat und lediglich zu 30 % dienstbezogen »", "70% privé\u200F · 30% خدمة", { at: a7 + 0.1, y: 392, size: 22, micro: "laut Urteil", parent: P.bande });
  } });

  /* ═══════ 16 · Appel vidéo : « et 30 % de travail » (b15 → b16) — ÉCRAN (coupe) ═══════
   * Le tribunal retourne son chiffre : 30 % de travail suffisent. Le liseré passe à la tuile du tribunal ; le camembert sort de sa
   * bulle et se pose à cheval sur les deux tuiles ; la part de 30 % devient jaune ; « privat » est rayé ; « uneinsichtig ». */
  st.scene({ from: "b15", in: "cut", inDur: 0, build(c) {
    X.use(c);
    const t0 = T("b15"), aG = T("b14@الگروپ"), aJ = T("b15@جاوباتها"), a3 = T("b15@و30%"), aK = T("b15@خدمة"), aY = T("b15@يعني"), aM = T("b15@ماشي"), aP = T("b15@privé"), aE = T("b15@end");
    const P = L.appel(c, { mention: REKO, batt: 0.8, reflet: false, plaque: false, actif: [{ at: t0 - 5, tuile: "B" }, { at: t0, tuile: "A" }],
      micro: (t) => (t >= a3 && t < aE ? 0.65 + 0.35 * Math.sin(t * 15) : 0.3), dossier: (t) => E.inOut(prog(t, aJ + 0.5, 0.5)),
      // la présidente lève la main (bras droit, main à côté de son visage (600, 691) : à [150, −100] elle touchait l'épaule d'AS2),
      // arrête d'écrire, parle de « و30% » à la fin
      jug: (t) => { const l = E.out(prog(t, aJ, 0.3)); if (l <= 0) return {};
        return { armR: [Math.round(lerp(8, 165, l)), Math.round(lerp(-10, -120, l))], torsoLean: Math.round(4 * l), headTilt: 0, look2: [0, 0.2], talk: talkAt(t, a3, aE) }; },
      as1: (t) => (t >= aK ? { headTilt: Math.round(3 * Math.sin(((t - aK) / 1.6) * TAU)) } : {}) });

    // ELLE se tait, inquiète ; à « ماشي » : choc, puis colère, tête détournée, marque de colère. § 1.1 : « poings sur les hanches » —
    // dans la tuile (coupée sous la poitrine), on ne voyait que les avant-bras qui se rejoignaient en V sous son menton : bras le long du corps
    pp(400, 1500, 1.12, (t) => {
      let e = { expr: "worried", look2: [0.05, -0.6], headTilt: 0 };
      if (t >= aM) e = { expr: "shock", look2: [0, -0.4], headTilt: -2 };
      if (t >= aM + 0.25) e = { expr: "angry", look2: [-0.9, -0.2], headTilt: -6 };
      return Object.assign({}, CAST.ELLE, PP.stand, { view: "front", blink: blk(t, 1), talk: 0 }, e);
    }, P.elle).on(breathe(2)).on((t, s) => { const p = prog(t, aM, 0.25); if (p > 0 && p < 1) s.y -= 8 * Math.sin(Math.PI * p); });   // sursaut
    A.dans(P.tuileB.g, M.of(c).obj(D.colere, 494, 1032, 1.0)).pop(aM + 0.25, 0.3).on((t, s) => { s.px = 494; s.py = 1032; s.r += 9 * Math.sin(t * 11); });

    // sa bulle (état de fin de scène 15) se referme ; le camembert en sort et se pose à cheval sur les deux tuiles. § 4 : (690, 888), r 96 ;
    // il cachait « 1. Kammer » sur la plaque de la table → (730, 905), r 90
    const m = M.of(c);
    A.dans(P.tuileB.g, m.speech({ x: 660, y: 1010, w: 290, h: 200, tip: [492, 1150], at: aG, until: aJ }));
    const cg = c.group(P.contenu);
    const pos = (t) => { const e = E.inOut(prog(t, aJ, 0.35)); return [lerp(660, 730, e), lerp(996 + 2.5 * Math.sin((t - aG) * 2.2), 905, e), e]; };
    const cam = c.sk((g, p) => D.camembert(g, p), (t) => { const e = pos(t)[2];
      return { r: Math.round(lerp(70, 90, e)), jaune: rnd(E.out(prog(t, a3, 0.2)), 10), ecart: rnd(E.out(prog(t, a3, 0.3)), 10), gros: rnd(E.out(prog(t, a3, 0.3)), 10),
        mindestens: rnd(prog(t, a3 + 0.15, 0.2), 10), barre: rnd(prog(t, aM, 0.2), 10) }; }, 0, 0, 1, 0, cg.g)
      .on((t, s) => { const [x, y] = pos(t); s.x += x; s.y += y;
        const v = prog(t, a3, 0.3); if (v > 0 && v < 1) s.x += 3 * Math.sin((t - a3) * 90) * (1 - v);            // la part jaune vibre en sortant
        if (t > aJ + 0.35) { s.px = 0; s.py = 0; s.s *= 1 + 0.015 * Math.sin(((t - aJ) / 2) * TAU); } });     // il respire (±1,5 %)
    // la petite icône « Dienst » (44 px) sur la part jaune (ancre ico du camembert, posé)
    const ic = c.sk((g, p) => D.icoDienst(g, p), (t) => ({ k: Math.floor((t - aK) / 0.5) % 3 }), 0, 0, 0.54, 0, cg.g)
      .on((t, s) => { const o = (cam.out && cam.out.ico) || [61, -92]; s.x += 730 + o[0]; s.y += 905 + o[1]; });
    A.jaillit(ic, aK, 0, 0, 0.3);   // pivot = son centre (repère local : le nœud est déplacé par s.x / s.y)
    A.punch(P.tel, a3, 0.04);
    A.punch(P.tel, aM, 0.025);   // (ajout) le trait qui raye « privat »

    // pastilles : l'argument de la défense (fin de scène 15), puis les deux citations du jugement
    H.pastille(c, "« zu 70% privat und lediglich zu 30 % dienstbezogen »", "70% privé\u200F · 30% خدمة", { until: a3 - 0.03, y: 392, size: 22, micro: "laut Urteil", parent: P.bande });
    H.pastille(c, "« zu mindestens 30% arbeitsbezogene Inhalte »", "30% خدمة", { at: a3, until: aY - 0.02, y: 392, size: 22, micro: "laut Urteil", parent: P.bande });
    H.pastille(c, "« nicht ausschließlich persönlichen Zwecken »", "ماشي privé 100%", { at: aY + 0.02, y: 392, size: 22, micro: "laut Urteil", parent: P.bande });

    // sa plaque de nom bascule (retournement vertical, 0,25 s) : « Stationsärztin » → « uneinsichtig » (laut Gericht)
    const plaque = (o, show, micro) => { const g = el("g", { transform: "translate(212 1222)" }), r = D.plaqueNom(g, o);
      if (micro) D.outils.tx(g, micro, r.w + 12, 30, 17, "light", "start", { fill: "#55524B", halo: "#F7F7F1", haloW: 6 });   // à droite (sous la plaque, il tombait sur le bord de la tuile)
      return c.node(g, P.tuileB.g).on(show); };
    plaque({}, (t, s) => { const p = E.in(prog(t, aP, 0.125)); s.px = 400; s.py = 1245; s.sy *= Math.max(0.01, 1 - p); s.o *= p < 1 ? 1 : 0; });
    plaque({ de: "uneinsichtig", ar: "ما اعترفات بوالو", w: 380 }, (t, s) => { const p = E.out(prog(t, aP + 0.125, 0.125)); s.px = 402; s.py = 1245; s.sy *= Math.max(0.01, p); s.o *= p > 0 ? 1 : 0; }, "laut Gericht");
  } });
});
