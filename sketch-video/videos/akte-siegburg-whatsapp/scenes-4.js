/* scenes-4.js — PARTIE 4 de l'épisode AKTE 07 « الگروپ » : scènes 17 à 21 du storyboard (§ 4) ; la scène 22 (affiche-résumé) est
 * dans story.js (st.summary).
 *  17 · Le jugement arrive dans le fil (b16)                ÉCRAN (T-NOTIF) : interdiction, « 1.000,00 EUR · zu zahlen », la flèche vers LUI
 *  18 · Première instance : définitif ? (b17)               ÉCRAN (coupe) : le ticket, « erste Instanz », la recherche « rechtskräftig » → 0 / 0
 *  19 · La règle (1) : « krank », et jusqu'à quand (b18)    ÉCRAN (T-NOTIF jaune) : le mauvais message barré, « krank bis Montag »
 *  20 · La règle (2) : le coffre (b19)                      ÉCRAN (coupe) : le coffre « Gesundheitsdaten », la clé va à son propriétaire
 *  21 · Le message dans le jugement (b20)                   PAPIER (view: false) : le chronomètre, la bulle se pose au § 8 de la page
 * Mises en place : X.lieux (fil, regle, papier) ; HUD : X.hud ; aides : X.aides.
 * Scènes ÉCRAN : tout dans c.hud (couches renvoyées par X.lieux) — pas de k.bg(), pas de c.camera / c.kick : punch et buzz.
 */
(window.EP_PARTS = window.EP_PARTS || []).push(function (X) {
  "use strict";
  const { st, T, E, prog, lerp, clamp, el, U, INK, SC, D, M, rnd } = X;
  const H = X.hud, A = X.aides, L = X.lieux, TAU = Math.PI * 2, mes = (s, size, kind) => D.outils.mesure(s, size, kind);
  const URTEIL = ["laut Urteil", "حسب الحكم"], GERICHT = ["laut Gericht", "حسب المحكمة"];
  const FIL = { titre: "Ärzte-AC", sous: "WhatsApp-Chatgruppe · 9 Mitglieder", date: "22.05.2026", batt: 0.7 };   // même jour, même pile que la scène 1

  // dessin fixe posé en (x, y) dans un parent
  const pose = (c, parent, fn, o, x, y) => { const g = el("g", { transform: `translate(${x} ${y})` }); D[fn](g, o || {}); return c.node(g, parent); };
  // « tampon » sans secousse (scènes ÉCRAN) : arrive en grand (from) et frappe, pivot donné — même geste que la somme de la scène 1
  const frappe = (n, at, px, py, dur = 0.28, from = 1.45) => { const a = T(at); return n.on((t, s) => {
    if (t < a) { s.o *= 0; return; } const p = prog(t, a, dur); s.px = px; s.py = py;
    if (p < 1) { s.o *= clamp(p * 5, 0, 1); s.s *= lerp(from, 1, E.in(p)); } else { const u = t - a - dur; s.s *= 1 + 0.05 * Math.exp(-u * 9) * Math.sin(u * 30); } }); };
  // révélation LINÉAIRE de droite à gauche (une ligne arabe qui suit la voix, de a à b)
  const revele = (n, a, b) => n.on((t, s) => { const p = prog(t, a, Math.max(0.05, b - a)); s.o *= t >= a ? 1 : 0; if (p < 1) s.clip = `inset(-10% 0 -10% ${((1 - p) * 100).toFixed(2)}%)`; });
  // flottement doux (avatars, page)
  const flotte = (amp, per, ph) => (t, s) => { s.y += amp * Math.sin((t / per) * TAU + (ph || 0)); };

  /* Le fil du jugement (scènes 17 et 18 : même fil, même instant) — construit UNE fois ici, avec les repères de b16 : en scène 18 tout
   * est déjà à sa place (état de fin de la scène 17). Composition : storyboard § 4, scène 17 (pixels, défilement 0). */
  const filJugement = (c, P) => {
    const F = P.fil.g, m = M.of(c);
    const t0 = T("b16"), aV = T("b16@ممنوع"), a1 = T("b16@و1000"), aT = T("b16@تعويض"), aL = T("b16@ليه"), t17 = T("b17");
    // SON message, envoyé (vert), qui dépasse en haut du fil : seule L9 se lit sous le bord (le brouillon, décalé de −576 : son bas à y 640)
    const sg = c.group(F).on((t, s) => { s.y -= 576; });
    // L1–L8 restent au-dessus du bord du fil (jamais visibles) : opacité 0 (sinon overlapscan les compte sous la bande)
    A.brouillon(c, sg.g, { n0: 9, envoyee: true, curseur: false, terne: () => 0, elle: (t) => (t >= a1 && t < a1 + 0.5
      ? { expr: "shock", look2: [-0.4, 0.7], headTilt: -4, dy: -8 * Math.sin(Math.PI * prog(t, a1, 0.25)) } : { expr: "angry", look2: [-0.6, 0.6] }) });

    // vendredi 22 mai 2026 : le séparateur tombe, l'expéditeur s'écrit, le sceau
    pose(c, F, "sepDate", { texte: "Freitag, 22. Mai 2026" }, 480, 700).slide(t0 + 0.35, 0, -30, 0.25);
    A.tape(c, F, "Arbeitsgericht Siegburg", 262, 748, 26, "de", t0 + 0.35, 0.25);
    A.tape(c, F, "1 Ca 1741/25", Math.round(262 + mes("Arbeitsgericht Siegburg", 26, "de") + 16), 748, 19, "de light", t0 + 0.47, 0.2);
    const sceau = c.sk((g, p) => D.sceau(g, p), (t) => { const u = t - a1; return { r: 30, a: u < 0 ? Math.round(Math.sin(t * 2.4)) : Math.round(7 * Math.exp(-2.2 * u) * Math.sin(7.5 * u) + Math.sin(t * 2.4)) }; }, 216, 1154, 1, 0, F);
    A.jaillit(sceau, t0 + 0.35, 216, 1154, 0.3);

    // 1re bulle : l'interdiction (sans queue : deux messages de suite du même expéditeur) ; le panneau claque sur la petite bulle
    const bI = c.group(F);
    A.bulleFil(c, bI.g, 262, 764, 480, 130, null);
    pose(c, bI.g, "interdit", { partie: "bulle" }, 322, 829);
    pose(c, bI.g, "interdit", { partie: "panneau" }, 322, 829).slam(aV + 0.15, 0.24, 0);
    const q1 = "« … es ab sofort zu unterlassen, … »", q2 = "« … insbesondere … wie WhatsApp … »";   // citations (annexe C) ; tailles ajustées à la bulle
    c.text(q1, 372, 818, Math.min(24, Math.floor((24 * 340) / mes(q1, 24, "light"))), "de light", "start", bI.g);
    c.text(q2, 372, 858, Math.min(21, Math.floor((21 * 340) / mes(q2, 21, "light"))), "de light", "start", bI.g);
    A.jaillit(bI, aV, 502, 894, 0.3);

    // le ticket de caisse : posé AVANT la bulle « à payer » (elle cache son haut : il sort de sous la bulle) ; il sort à « ليه », il pend
    const tk = c.sk((g, p) => D.ticketCaisse(g, p), (t) => ({ sorti: rnd(clamp((t - aL - 0.1) / (t17 + 0.4 - aL - 0.1), 0, 1), 20), lignes: rnd(1 + clamp((t - t17 - 0.35) / 0.15, 0, 1), 10) }), 430, 1112, 1, 0, F);
    m.pend(tk, t17 + 0.4, 2, [430, 1112], { idle: 0.6 });
    tk.on((t, s) => { s.o *= t >= a1 + 0.28 ? 1 : 0; });   // sa fente restait visible seule avant la bulle « à payer »

    // 2e bulle : la somme ORDONNÉE (« zu zahlen » + horloge en attente) — elle frappe ; « gefordert » rayé ; « 78 % der Kosten »
    const bP = c.group(F);
    A.bulleFil(c, bP.g, 262, 918, 480, 200, [244, 1144]);
    const mk = el("g", { transform: "translate(502 986)" }); SC.marker(mk, { w: 400, h: 56 }); c.node(mk, bP.g);
    c.text("1.000,00 EUR", 502, 1004, 64, "de", "middle", bP.g);
    // l'horloge tourne dès la frappe (un tour en 1,6 s) ; en scène 18 son cadran grossit (r 22 → 34)
    c.sk((g, p) => D.aPayer(g, p), (t) => ({ h: t < a1 ? 0 : Math.round(((t - a1) / 1.6) * 360) % 360, r: Math.round(lerp(22, 34, E.out(prog(t, t17 + 0.25, 0.3)))) }), 284, 1030, 1, 0, bP.g);
    c.text("gefordert: 2.000 €", 520, 1052, 22, "de light", "start", bP.g).fade(a1 + 0.3, 0.2);
    const ra = el("g"); D.outils.ln(ra, `M516 1047 L${Math.round(524 + mes("gefordert: 2.000 €", 22, "light"))} 1041`, 3.2, INK); c.node(ra, bP.g).wipe(a1 + 0.5, 0.2);
    c.text("78 % der Kosten", 520, 1088, 22, "de light", "start", bP.g).fade(a1 + 0.45, 0.2);
    frappe(bP, a1, 502, 1018);

    // la flèche en POINTILLÉ, de SON avatar à elle vers LUI (c'est elle qui est condamnée) : elle se trace, ses tirets avancent
    const fg = el("g"), dF = "M832 724 C 874 790, 876 912, 812 980";
    const ft = D.outils.ln(fg, dF, 3.6, INK, { "stroke-dasharray": "12 9" });
    const ang = Math.atan2(980 - 912, 812 - 876), Lp = 17;
    D.outils.ln(fg, `M${Math.round(812 + Math.cos(ang + 2.6) * Lp)} ${Math.round(980 + Math.sin(ang + 2.6) * Lp)} L812 980 L${Math.round(812 + Math.cos(ang - 2.6) * Lp)} ${Math.round(980 + Math.sin(ang - 2.6) * Lp)}`, 3.6, INK);
    c.tick((t) => ft.setAttribute("stroke-dashoffset", (-30 * t).toFixed(1)));
    c.node(fg, F).wipe(aT, 0.35, "down");
    // LUI, le destinataire, au bout de la flèche
    const lui = A.avatarVif(c, F, "LUI", 806, 1030, 40, () => ({ expr: "calm", look2: [-0.6, -0.2] }));
    A.jaillit(lui, aL, 806, 1030, 0.3);
    return { F, sg, tk };
  };

  /* ═══════ 17 · Le jugement arrive dans le fil (b16 → b17) — ÉCRAN (T-NOTIF) ═══════
   * 2026 : interdiction de recommencer, et 1 000 euros À PAYER au collègue. L'image de la première seconde, comprise. */
  st.scene({ from: "b16", in: "cut", inDur: 0.36, build(c) {
    X.use(c);
    const t0 = T("b16"), aV = T("b16@ممنوع"), a1 = T("b16@و1000"), aT = T("b16@تعويض");
    const P = L.fil(c, Object.assign({ entree: "notif", banniere: { sceau: true, titre: "Arbeitsgericht Siegburg", ligne: "Urteil vom 22.05.2026", ar: "الحكم" },
      dateAvant: "", mention: URTEIL, saisie: { curseur: false } }, FIL));
    filJugement(c, P);
    A.buzz(P.tel, a1 + 0.25, 10); A.punch(P.tel, a1 + 0.25, 0.05);
    H.pastille(c, "« ab sofort zu unterlassen »", "ممنوع تعاودها", { at: aV + 0.1, until: aT - 0.02, size: 26, parent: P.bande });
    H.pastille(c, "Schadensersatz · 1.000,00 EUR", "تعويض", { at: aT, yellow: true, size: 26, parent: P.bande });
  } });

  /* ═══════ 18 · Première instance : définitif ? (b17 → b18) — ÉCRAN (coupe) ═══════
   * Ce jugement est de première instance ; on n'a pas trouvé s'il est devenu définitif. On cherche « rechtskräftig » dans le fil :
   * « 0 / 0 ». Jamais un tampon, jamais « définitif ». */
  st.scene({ from: "b17", in: "cut", inDur: 0, build(c) {
    const k = X.use(c), m = M.of(c);
    const t17 = T("b17"), aS = T("b17@لقيناش"), aW = T("b17@ولى"), aN = T("b17@نهائي");
    const defile = (t) => 40 * Math.sin(Math.PI * prog(t, aW, 0.7));   // il a cherché : le fil monte de 40 px et revient
    const P = L.fil(c, { at: "b16", titre: null, sous: null, date: FIL.date, batt: FIL.batt, mention: GERICHT, defile, saisie: { curseur: false } });
    const J = filJugement(c, P);
    // l'en-tête : le titre glisse vers le haut, le champ de recherche descend à sa place ; « rechtskräftig » se tape ; le curseur
    const sort = (t, s) => { const p = E.inOut(prog(t, aS - 0.2, 0.2)); s.y -= 14 * p; s.o *= 1 - p; };
    c.text(FIL.titre, 294, 390, 36, "de", "start", P.tete).on(sort);
    c.text(FIL.sous, 294, 422, 21, "de light", "start", P.tete).on(sort);
    const ch = c.group(P.tete).on((t, s) => { const p = E.out(prog(t, aS - 0.2, 0.22)); s.o *= p; s.y -= 40 * (1 - p); });
    D.champRecherche(ch.g, {});
    const q = "rechtskräftig";
    A.tape(c, ch.g, q, 250, 404, 28, "de", aS, 0.45);
    A.curseur(c, ch.g, (t) => 250 + mes(q.slice(0, Math.round(q.length * prog(t, aS, 0.45))), 28, "de") + 4, 404, aS, null);
    // au bout du champ : trois points d'attente (0,2 s), puis « 0 / 0 » (pop) — rien ne se surligne
    const cpt = c.sk((g, p) => D.compteRecherche(g, p), (t) => (t < aW + 0.2 ? { etat: "attente", t: rnd((t * 2) % 1, 10) } : { etat: "rien" }), 790, 393, 1, 0, ch.g);
    cpt.on((t, s) => { s.o *= t >= aW ? 1 : 0; const p = prog(t, aW + 0.2, 0.3); if (p > 0 && p < 1) { s.px = 768; s.py = 393; s.s *= 1 + 0.35 * Math.sin(Math.PI * p); } });
    // « ? » dans le fil, à droite du ticket ; il se balance (pivot = le haut)
    const pq = pose(c, J.F, "pointInterro", {}, 700, 1200);
    A.jaillit(pq, aN, 700, 1200, 0.3);
    m.sway(pq, 10, 1.6, [700, 1150]);
    A.punch(P.tel, aW + 0.2, 0.025);   // (ajout) « 0 / 0 »
    A.punch(P.tel, t17 + 0.7, 0.025, 0.7);   // (ajout) « ابتدائي » : le téléphone se rapproche doucement (sinon b17 « figé » à 1,7 %)

    H.pastille(c, "Schadensersatz · 1.000,00 EUR", "تعويض", { until: t17 + 0.23, yellow: true, size: 26, parent: P.bande });
    H.pastille(c, "erste Instanz", "حكم ابتدائي", { at: t17 + 0.25, until: aS - 0.02, size: 30, parent: P.bande });
    H.pastille(c, "Stand Juli 2026: nicht rechtskräftig", "يوليوز 2026: مازال ماشي نهائي", { at: aS, until: aN - 0.02, size: 24, parent: P.bande });
    H.pastille(c, "Berufung möglich · LAG Köln", "الاستئناف ممكن", { at: aN, size: 26, parent: P.bande });
  } });

  /* ═══════ 19 · La règle (1) : « krank », et jusqu'à quand (b18 → b19) — ÉCRAN (T-NOTIF, bannière jaune « القاعدة ») ═══════
   * Dans le groupe du travail : seulement « malade » et jusqu'à quand. Le mauvais message (le sien, en miniature) est barré. */
  st.scene({ from: "b18", in: "cut", inDur: 0.36, build(c) {
    X.use(c);
    const t0 = T("b18"), aG = T("b18@فالگروپ"), aK = T("b18@كتب"), aR = T("b18@غير"), aN = T("b18@krank"), aH = T("b18@وحتى"), aL = T("b18@لإمتى");
    // le ruban se déroule APRÈS la remontée de la bannière jaune (même zone : à t0 + 0,92, on lisait deux « القاعدة » l'un sur l'autre)
    const P = L.regle(c, { entree: "notif", banniere: { jaune: true, ar: "القاعدة" }, dateAvant: FIL.date, batt: 0.7, rubanAt: t0 + 1.1,
      mention: ["§ 5 EFZG · Keine Rechtsberatung", ""] });
    const Cn = P.contenu;
    // le mauvais exemple : SON message en miniature (vert, pâli), lignes illisibles et deux barres ; la croix claque dessus
    const mini = c.group(Cn).on((t, s) => { s.o *= 0.6; const p = prog(t, aR + 0.18, 0.3); if (p > 0 && p < 1) s.x += 5 * Math.sin((t - aR) * 90) * (1 - p); });
    A.bulleFil(c, mini.g, 408, 600, 234, 170, [650, 800], { mat: "vert" });
    [[616, 196, 11], [642, 170, 12], [744, 120, 13]].forEach(([y, w, sd]) => pose(c, mini.g, "gribouillis", { w, seed: 90 + sd }, 426, y));
    [[666, 150], [704, 190]].forEach(([y, w], i) => pose(c, mini.g, "caviar", { w, seed: 95 + i }, 426, y));
    pose(c, Cn, "croix", { w: 150, h: 150 }, 525, 685).slam(aR, 0.22, 0);
    A.buzz(P.tel, aR + 0.2, 4);
    // le bon exemple : une bulle blanche (vers « toi »), « krank » puis « bis Montag » tapés, surligneur sous « krank », coche jaune
    A.bulleFil(c, Cn, 280, 838, 490, 120, [780, 986], { at: aK + 0.1 });
    const wK = mes("krank", 54, "de"), xB = 318 + mes("krank ", 54, "de");
    const hl = el("g"); el("path", { d: U.rrect(312, 884, Math.round(wK + 12), 40, 8), fill: "#F8CE4E", opacity: 0.9 }, hl); c.node(hl, Cn).wipe(aN, 0.25);
    A.tape(c, Cn, "krank", 318, 916, 54, "de", aK + 0.2, 0.3);
    A.tape(c, Cn, "bis Montag", Math.round(xB), 916, 54, "de", aH, 0.35);
    A.curseur(c, Cn, (t) => (t < aH ? 318 + mes("krank".slice(0, Math.round(5 * prog(t, aK + 0.2, 0.3))), 54, "de") : xB + mes("bis Montag".slice(0, Math.round(10 * prog(t, aH, 0.35))), 54, "de")) + 5,
      898, aK + 0.2, null, { h: 44 });
    const co = el("g", { transform: "translate(770 838)" }); el("circle", { cx: 2.5, cy: 3.5, r: 22, fill: "#D2D2CB" }, co);
    el("circle", { cx: 0, cy: 0, r: 22, fill: "#F8CE4E", stroke: INK, "stroke-width": 2.6 }, co); D.outils.ln(co, "M-10 1 L-3 9 L11 -8", 4.2, INK);
    A.jaillit(c.node(co, Cn), aL, 770, 838, 0.3);
    const toi = pose(c, Cn, "avatarToi", { r: 30 }, 804, 1004);
    A.jaillit(toi, aL + 0.05, 804, 1004, 0.3); toi.on(flotte(3, 2.6));
    // la règle, mot pour mot (b18) : ligne 1 ← ; ligne 2 ← au rythme de la voix
    c.text("فالگروپ ديال الخدمة", 525, 1090, 46, "ttl", "middle", Cn).wipe(aG + 0.3, 0.4, "rtl");
    revele(c.text("كتب غير krank، وحتى لإمتى", 525, 1160, 46, "ttl", "middle", Cn), aK, aL + 0.3);

    H.pastille(c, "krank", "مريض", { at: aN, until: aH + 0.08, yellow: true, size: 34, parent: P.bande });
    H.pastille(c, "krank bis Montag", "مريض حتى للإثنين", { at: aH + 0.1, size: 30, parent: P.bande });
    A.punch(P.tel, aN, 0.04);
    A.punch(P.tel, aH + 0.1, 0.03);   // (ajout) « وحتى » : sinon la fin de b18 était « figée » (1,6 %)
  } });

  /* ═══════ 20 · La règle (2) : le coffre (b19 → b20) — ÉCRAN (coupe) ═══════
   * Un diagnostic — d'un patient ou d'un collègue — est dans un coffre ; la clé, c'est l'accord de la personne : elle est à LUI. */
  st.scene({ from: "b19", in: "cut", inDur: 0, build(c) {
    X.use(c);
    const m = M.of(c), t0 = T("b19"), aD = T("b19@diagnostic"), aM = T("b19@مريض"), aZ = T("b19@زميل"), a5 = T("b19@5"), aK = T("b19@كيتكتبش"),
      aB = T("b19@بلا"), aI = T("b19@الإذن"), aY = T("b19@ديالو"), aF = aD + 0.55;
    const P = L.regle(c, { batt: 0.7, reflet: false, mention: ["DSGVO Art. 9", "قانون حماية المعطيات"] });
    const Cn = P.contenu;
    // les crochets (vis + crochet) attendent les clés. § 4 : 2e crochet en (812, 760) ; (818, 800) : la clé jaune et l'anneau de la
    // grise se chevauchaient (et plus encore en se balançant)
    [[770, 650], [818, 800]].forEach(([x, y], i) => A.jaillit(pose(c, Cn, "cle", { partie: "crochet" }, x, y), t0 + 0.3 + 0.06 * i, x, y - 10, 0.25));
    // le coffre tombe, porte OUVERTE ; la porte se ferme à « diagnostic+0,55 », la molette tourne (540°), la poignée verrouille, il frémit
    const cof = c.sk((g, p) => D.coffre(g, p), (t) => ({ ouvert: rnd(1 - E.inOut(prog(t, aF, 0.3)), 20),
      molette: Math.round(540 * E.inOut(prog(t, aF, 0.5)) + (t > aF + 0.6 ? 2 * Math.sin(t * 7) : 0)), poignee: Math.round(70 * E.inOut(prog(t, aF + 0.35, 0.25))) }), 525, 776, 1, 0, Cn);
    m.build(cof, t0, "drop", { dist: 200, dur: 0.35 });
    cof.on((t, s) => { const p = prog(t, aK + 0.25, 0.2); if (p > 0 && p < 1) s.x += 3 * Math.sin((t - aK) * 120) * (1 - p); });   // la petite bulle cogne
    A.buzz(P.tel, aF + 0.3, 5);
    // la feuille « Diagnose » vole dans le coffre (arc, ×0,5) et disparaît quand la porte se referme
    const fe = pose(c, Cn, "feuilleDiag", {}, 0, 0);
    fe.on((t, s) => { const p = E.inOut(prog(t, t0 + 0.2, 0.35)); s.px = 0; s.py = 0;
      s.x += lerp(236, 520, p); s.y += lerp(640, 800, p) - 70 * Math.sin(Math.PI * p); s.s *= lerp(1, 0.5, p) * (t < t0 + 0.2 ? Math.max(0.01, E.back(prog(t, t0, 0.2))) : 1); s.r += lerp(-10, 0, p);
      s.o *= (t >= t0 ? 1 : 0) * (1 - prog(t, aF + 0.05, 0.2)); });

    // les deux visages : un patient (sans visage) · LUI (anneau jaune) ; ils flottent
    const gp = c.group(Cn).on(flotte(3, 2.8, 0));
    A.jaillit(pose(c, gp.g, "avatarPatient", { r: 46 }, 300, 1018), aM, 300, 1018, 0.3);
    const bcP = pose(c, gp.g, "badgeCle", {}, 333, 1051); A.jaillit(bcP, aI + 0.6, 333, 1051, 0.3);
    const lui = A.avatarVif(c, Cn, "LUI", 750, 1018, 46, (t) => ({ expr: "calm", look2: [-0.2, -0.5], badge: t >= aI + 0.45 ? "cle" : null }), { anneau: "jaune" });
    A.jaillit(lui, aZ, 750, 1018, 0.3); lui.on(flotte(3, 2.8, 1.7));

    // « ما كيتكتبش » : une petite bulle de message vole vers la porte, rebondit dessus et retombe ; une petite croix au point d'impact
    const pb = pose(c, Cn, "interdit", { partie: "bulle" }, 0, 0);
    pb.on((t, s) => { if (t < aK) { s.o *= 0; return; } const u = t - aK; s.px = 0; s.py = 0; s.s *= 1.15;
      if (u < 0.25) { const p = E.in(u / 0.25); s.x += lerp(250, 396, p); s.y += lerp(900, 745, p); }
      else { const p = E.out(clamp((u - 0.25) / 0.4, 0, 1)); s.x += lerp(396, 300, p); s.y += lerp(745, 880, p) - 60 * Math.sin(Math.PI * p); s.r += -30 * Math.sin(Math.PI * p); } });
    // impact sur la porte, à gauche de la molette (en (446, 790), la croix couvrait la molette et le texte de loi)
    pose(c, Cn, "croix", { w: 36, h: 36, sw: 6 }, 412, 742).pop(aK + 0.25, 0.25).hide(aK + 0.9, 0.2);

    // les clés tombent sur leurs crochets et se balancent ; la jaune (« Einwilligung ») vole jusqu'à LUI : elle devient son badge
    const cg = pose(c, Cn, "cle", { picto: "stetho", cote: "d" }, 818, 800);
    m.build(cg, aB + 0.08, "drop", { dist: 120, dur: 0.35 }); m.pend(cg, aB + 0.43, 16, [818, 800], { idle: 2 });
    const cj = pose(c, Cn, "cle", { jaune: true, texte: "Einwilligung" }, 770, 650);
    m.build(cj, aB, "drop", { dist: 120, dur: 0.35 }); m.pend(cj, aB + 0.35, 16, [770, 650], { idle: 1 });
    cj.on((t, s) => { const p = E.inOut(prog(t, aI, 0.45)); if (p <= 0) return; s.px = 770; s.py = 650;
      s.x += (783 - 770) * p; s.y += (1035 - 650) * p - 90 * Math.sin(Math.PI * p); s.s *= lerp(1, 0.25, p); s.o *= 1 - prog(t, aI + 0.38, 0.07); });
    A.punch(P.tel, aI + 0.45, 0.04);

    // la règle (b19, mot pour mot) : lignes 1 et 2 ← au rythme de la voix ; ligne 3 + surligneur ; « Keine Rechtsberatung »
    // (lignes 4 à 6 px plus espacées que le § 4 : les boîtes de la police Lalezar se touchaient)
    revele(c.text("الـdiagnostic ديال مريض ولا زميل", 525, 1128, 44, "ttl", "middle", Cn), t0, aZ + 0.3);
    revele(c.text("ما كيتكتبش بلا الإذن ديالو", 525, 1194, 44, "ttl", "middle", Cn), a5, aY + 0.3);
    const l3 = "گروپ فيه الخدمة = ماشي privé", w3 = mes(l3, 40, "ar");
    const hl = el("g"); el("path", { d: U.rrect(Math.round(525 - w3 / 2 - 8), 1244, Math.round(w3 + 16), 26, 8), fill: "#F8CE4E", opacity: 0.85 }, hl); c.node(hl, Cn).wipe(aY + 0.15, 0.3, "rtl");
    c.text(l3, 525, 1262, 40, "ar strong", "middle", Cn).wipe(aY, 0.4, "rtl");
    c.text("Keine Rechtsberatung", 525, 1340, 20, "de light", "middle", Cn).fade(aY + 0.1, 0.3);

    H.pastille(c, "Gesundheitsdaten", "المعطيات الصحية", { at: aF, until: aB - 0.02, size: 30, parent: P.bande });
    H.pastille(c, "« ohne seine Einwilligung »", "بلا الإذن ديالو", { at: aB, yellow: true, size: 28, parent: P.bande });
  } });

  /* ═══════ 21 · Le message dans le jugement (b20 → affiche) — PAPIER (view: false) ═══════
   * Un message s'écrit en une minute ; celui-ci est resté écrit — dans un jugement, au paragraphe 8. Caméra fixe. */
  st.scene({ from: "b20", in: "cut", inDur: 0, view: false, build(c) {
    X.use(c);
    const m = M.of(c), t0 = T("b20"), aK = T("b20@كيتكتب"), aQ = T("b20@فدقيقة"), aH = T("b20@وهادا"), aB = T("b20@بقى"), aM = T("b20@مكتوب"), aF = T("b20@فالحكم");
    // § 4 : caméra fixe ; une poussée lente (×1,04, comme les autres scènes) : sans elle, le début de b20 était « figé » (2 %)
    c.camera([{ at: "b20", s: 1, cx: 540, cy: 960 }, { at: t0 + 0.3, s: 1.04, cx: 530, cy: 960, d: 2.3, ease: "lin" }]);
    // § 4 : formes en (950, 1240) (colonne des boutons Instagram) et (420, 1380) (sur l'étiquette) → (950, 930) et (560, 1372)
    L.papier(c, { mention: URTEIL, formes: { seed: 21, pts: [[110, 1300], [960, 420], [950, 930], [560, 1372]], at: t0 + 0.1 } });

    // le téléphone se range à gauche (centre (300, 900), ×0,5, −6°) ; il penche (±1°). Sa bulle d'origine est masquée (un pan d'écran
    // vide) : c'est NOTRE bulle (D.bulleJugement) qui est sur l'écran, se remplit de lignes, puis s'en va
    // § 4 : centre (300, 900) ; (320, 905) : penché de −6°, son coin gauche passait à x 86 (bord rogné)
    const TX = 320, TY = 905;
    const fan = H.fantome(c, { at: "b20", vers: [TX, TY], k: 0.5, rot: -6, dur: 0.45, reste: true, parent: c.cam, vert: true });
    fan.on((t, s) => { if (t > t0 + 0.45) s.r += Math.sin(((t - t0) / 2.6) * TAU); });
    el("rect", { x: 436, y: 1066, width: 392, height: 212, fill: "#FCFCF9" }, fan.g);
    const surTel = c.sk((g, p) => D.bulleJugement(g, p), (t) => ({ n: Math.round(1 + 4 * clamp((t - aK) / 0.6, 0, 1)) }), 620, 1150, 360 / 290, 0, fan.g);
    surTel.on((t, s) => { s.o *= t < aH ? 1 : 0; });

    // le chronomètre : pop, la couronne s'enfonce, l'aiguille fait UN tour (0,74 s), puis tremble ; « دقيقة » ←
    const ch = c.sk((g, p) => D.chrono(g, p), (t) => { const u = t - aK; return { a: u < 0 ? 0 : u < 0.74 ? Math.round((u / 0.74) * 360) : 360 + Math.round(3 * Math.exp(-3 * (u - 0.74)) * Math.sin((u - 0.74) * 30)),
      couronne: u > 0 && u < 0.25 ? 1 : 0 }; }, 190, 520);
    A.jaillit(ch, aK, 190, 520, 0.3);
    c.text("دقيقة", 330, 536, 40, "ttl", "middle").wipe(aQ, 0.25, "rtl");

    // la page du jugement (inclinée de 2°) tombe ; elle flotte ; elle « pulse » quand la bulle se pose ; cercle autour du « 8 », trombone
    // § 4 : vol de 0,5 s à « وهادا », posée à « بقى » — avec le minutage provisoire, « بقى » arrive 0,33 s après « وهادا » : le vol dure
    // 0,42 s (soulèvement 0,1 s + arc 0,36 s) et la bulle s'efface / la page pulse quand elle est posée (au plus tôt à « بقى »)
    const aP = Math.max(aB, aH + 0.42);
    const pg = c.group();
    c.sk((g, p) => D.pageJugement(g, p), (t) => ({ cercle: rnd(E.out(prog(t, aM, 0.25)), 20), brille: rnd(prog(t, aF, 0.4), 10) }), 690, 880, 1, 2, pg.g);
    m.build(pg, t0 + 0.1, "drop", { dist: 260, dur: 0.45 });
    pg.on((t, s) => { s.y += 3 * Math.sin(((t - t0) / 3.2) * TAU); const p = prog(t, aP, 0.35); if (p > 0 && p < 1) { s.px = 690; s.py = 880; s.s *= 1 + 0.04 * Math.sin(Math.PI * p); } });
    // la bulle quitte le téléphone : départ = la place de sa bulle sur l'écran rangé ; elle se soulève (×1,2), vole en arc par (480, 700)
    // jusqu'au § 8 (centre (704, 926), incliné de 2°) ; elle se pose : sa hachure verte et son contour s'effacent, il reste le paragraphe
    const r6 = (-6 * Math.PI) / 180, dep = [TX + Math.cos(r6) * 47.5 - Math.sin(r6) * 145, TY + Math.sin(r6) * 47.5 + Math.cos(r6) * 145], k0 = 0.5 * 360 / 290;
    const arr = [690 + 13.4, 880 + 46.5], via = [480, 700];
    c.sk((g, p) => D.bulleJugement(g, p), (t) => ({ fond: rnd(1 - prog(t, aP, 0.3), 10) }), 0, 0, 1, 0, pg.g).on((t, s) => {
      if (t < aH) { s.o *= 0; return; }
      const v = E.inOut(prog(t, aH + 0.06, 0.36)), le = E.out(prog(t, aH, 0.1)), u = 1 - v;
      const x = u * u * dep[0] + 2 * u * v * via[0] + v * v * arr[0], y = u * u * dep[1] + 2 * u * v * via[1] + v * v * arr[1];
      s.px = 0; s.py = 0; s.x += x; s.y += y - 3 * Math.sin(((t - t0) / 3.2) * TAU) * (1 - v);   // en vol, elle ne suit pas le flottement de la page
      s.s *= lerp(k0, 1, v) * (1 + 0.2 * le * (1 - v)); s.r += lerp(-6, 2, v); });

    H.pastille(c, "im Urteil zitiert · Rn. 8", "مكتوب فالحكم", { at: aM, x: 520, y: 420, size: 28, yellow: true });
  } });
});
