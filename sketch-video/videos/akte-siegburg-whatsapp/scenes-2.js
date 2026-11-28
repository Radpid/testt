/* scenes-2.js — PARTIE 2 de l'épisode AKTE 07 « الگروپ » : scènes 6 à 11 du storyboard (§ 4).
 *   6 · Jeudi : le canapé (b5)                                       PIÈCE, salon (sortie du téléphone vers SES mains)
 *   7 · Samedi : la salle des médecins (b6)                          PIÈCE (slideUp), elle tape, les aimants changent de case
 *   8 · Le brouillon : 549 € (b7)                                    ÉCRAN (plongée depuis sa main)
 *   9 · Dans le même message : ses diagnostics (b8)                  ÉCRAN (coupe)
 *  10 · La dernière ligne (b9–b10)                                   ÉCRAN (coupe) : la loupe, le pouce
 *  11 · Envoyé : le silence (b10@end → b11)                          ÉCRAN (coupe) : la bulle devient verte, sept avatars, tout s'arrête
 * Mises en place : X.lieux (salon, salle, fil) ; HUD : X.hud ; aides : X.aides (brouillon, avatarVif, bulleFil…).
 * Scènes 9, 10, 11 : même fil, même instant que la scène 8 → telephone({ at: "b7" }) : le semis continue sans saut d'une coupe à l'autre
 * (et le reflet ne repasse pas à chaque coupe).
 */
(window.EP_PARTS = window.EP_PARTS || []).push(function (X) {
  "use strict";
  const { st, T, E, prog, lerp, clamp, el, U, D, M, CAST, blinkAt, rnd, pp, breathe, GROS_MOT } = X;
  const H = X.hud, A = X.aides, L = X.lieux, TAU = Math.PI * 2, mes = (s, size, kind) => D.outils.mesure(s, size, kind);
  const URTEIL = ["laut Urteil", "حسب الحكم"], EXTRAIT = ["laut Urteil (Auszug der Nachricht)", "حسب الحكم"], REKO = ["Rekonstruktion", "مشهد تمثيلي"];
  const FIL = { titre: "Ärzte-AC", sous: "WhatsApp-Chatgruppe · 9 Mitglieder", date: "Sa · 31.05.2025" };
  // b10 est une phrase [FR] : traduction PROVISOIRE (scenario.md, « Phrases [FR] »), à remplacer par les mots de l'auteur (storyboard R5)
  const TRAD_B10 = "يعني: غير شي ريح حاصل ليه.";

  // dessin fixe posé en (x, y) dans un parent
  const pose = (c, parent, fn, o, x, y, s) => { const g = el("g", { transform: `translate(${x} ${y})${s ? ` scale(${s})` : ""}` }); D[fn](g, o || {}); return c.node(g, parent); };
  // flèche à main levée qui se trace (D.fleche, o.p animé)
  const trace = (c, parent, de, vers, at, dur, o = {}) => { const a = T(at);
    return c.sk((g, p) => D.fleche(g, p), (t) => ({ de, vers, courbe: o.courbe == null ? 0.15 : o.courbe, sw: o.sw || 4.5, pointille: !!o.pointille, col: o.col, p: rnd(E.out(prog(t, a, dur)), 20) }), 0, 0, 1, 0, parent)
      .on((t, s) => { s.o *= t >= a ? 1 : 0; }); };
  // chemin quelconque qui se trace (pathLength 1 + pointillé décalé), pointe ouverte au bout quand il est fini
  const chemin = (c, parent, d, pointe, at, dur, sw = 4.5) => { const a = T(at), g = el("g");
    const p = D.outils.ln(g, d, sw); p.setAttribute("pathLength", "1"); p.setAttribute("stroke-dasharray", "1 1");
    const tete = D.outils.ln(g, pointe, sw);
    c.tick((t) => { const q = E.out(prog(t, a, dur)); p.setAttribute("stroke-dashoffset", (1 - q).toFixed(3)); tete.setAttribute("opacity", q > 0.97 ? 1 : 0); });
    return c.node(g, parent).on((t, s) => { s.o *= t >= a ? 1 : 0; }); };
  // les mains qui tapent : deux états seulement, en opposition, 7 Hz (storyboard § 1.1)
  const frappe = (t) => (Math.floor(t * 14) % 2 ? { armL: [-20, 101], armR: [20, -105] } : { armL: [-20, 105], armR: [20, -101] });
  // petit « coup » d'échelle autour d'un pivot (la loupe tressaute à chaque mot)
  const coup = (n, ats, px, py, amp, dur, rot = 0) => n.on((t, s) => { ats.forEach((a, i) => { const p = prog(t, a, dur); if (p > 0 && p < 1) { s.px = px; s.py = py;
    const k = Math.sin(Math.PI * p); s.s *= 1 + amp * k; s.r += (i % 2 ? -rot : rot) * k; } }); });   // rot : elle penche un coup à gauche, un coup à droite
  // traduction arabe posée seule dans c.hud (sous une pastille sans arabe) : bande de papier derrière, contour papier, révélée ←
  const arHud = (c, txt, x, y, size, at) => { const g = el("g"), w = mes(txt, size, "ar");
    el("rect", { x: Math.round(x - w / 2 - 12), y: Math.round(y - size * 0.95), width: Math.round(w + 24), height: Math.round(size * 1.35), rx: 8, fill: "#F7F7F1", opacity: 0.92 }, g);
    D.outils.tx(g, txt, x, y, size, "ar", "middle", { halo: "#F7F7F1", haloW: 7 });
    return c.node(g, c.hud).wipe(at, 0.45, "rtl"); };

  /* ═══════ 6 · Jeudi : le canapé (b5 → b6) — PIÈCE (salon) ═══════
   * L'un des neuf passe aux urgences de leur propre hôpital, reçoit un VRAI arrêt de travail, et écrit seulement au groupe qu'il est
   * malade. Sortie du téléphone vers ses mains ; le salon se construit ; le certificat jaune ; il tape ; sa bulle. */
  st.scene({ from: "b5", in: "cut", inDur: 0, build(c) {
    const k = X.use(c); k.bg();
    const m = M.of(c), t0 = T("b5");
    const aM = T("b5@مشى"), aU = T("b5@للمستعجلات"), aS = T("b5@سبيطارهم"), aK = T("b5@وكتب"), aB = T("b5@بلي");
    // § 4 : ×1,12 centré sur (545, 880) ; cy 925 : à 880, le bas du canapé passait sous l'étiquette de mention (y 1404)
    c.camera([{ at: "b5", s: 1.0, cx: 540, cy: 920 }, { at: "b5+0.1", s: 1.03, cx: 540, cy: 920, d: 2.3, ease: "lin" }, { at: aK - 0.1, s: 1.12, cx: 545, cy: 925, d: 0.45 }]);
    const tape = (t) => t >= aK && t < aB + 0.15;
    const R = L.salon(c, { lui: (t) => {
      let e = { expr: "worried", look2: [0, 0.85], headTilt: 4 };                                   // il regarde son téléphone
      if (t >= aM && t < aK) e = { expr: "worried", look2: [-0.5, -0.6], headTilt: -4 };           // le certificat
      if (t >= aK) e = { expr: "focused", look2: [0, 0.9], headTilt: 6 };                          // il tape
      if (t >= aB + 0.2) e = { expr: "worried", look2: [0.25, -0.8], headTilt: 2 };                 // il relit son message
      return Object.assign(e, tape(t) ? frappe(t) : {});
    } });
    // son téléphone, dans ses deux mains (mains en (±1, −227) × 1,05) : il respire avec lui ; visible quand le fantôme s'y pose
    c.sk((g, p) => D.telMini(g, p), (t) => ({ lueur: t >= aB - 0.05 && t < aB + 0.3 ? 1 : 0 }), 510, 1027, 1.05, 0, R.lui).on(breathe(1)).on((t, s) => { s.o *= t >= t0 + 0.42 ? 1 : 0; });

    // le certificat jaune : pop (−5°), il flotte ; tampon « Notaufnahme » qui claque ; cercle autour de la date ; puis il va sur l'accoudoir
    // (§ 4 : en (455, 690) ; 20 px plus à droite, sinon il touche le rideau de droite)
    const CX = 475, CY = 690;
    const cert = c.sk((g, p) => D.certificat(g, p), (t) => ({ tampon: rnd(E.out(prog(t, aU, 0.2)), 10), cercle: rnd(prog(t, aS, 0.3), 20) }), CX, CY, 1, -5);
    A.jaillit(cert, aM, CX, CY, 0.35);
    cert.on((t, s) => { const p = E.inOut(prog(t, aK, 0.4)); s.px = CX; s.py = CY; s.y += 4 * Math.sin(t * 2.2) * (1 - p);
      s.s *= lerp(1, 0.42, p); s.x += (738 - CX) * p; s.y += (1032 - CY) * p; s.r += -9 * p; });

    // il écrit : « … » au-dessus de son téléphone, puis SA bulle (« krank · Vertretung? » : les deux notions du jugement)
    A.bulleFil(c, undefined, 588, 928, 104, 64, [540, 1022], { at: aK + 0.05, until: aB - 0.02 });
    m.typing(640, 960, aK + 0.12, aB - 0.02);
    const msg = c.group();
    A.bulleFil(c, msg.g, 375, 625, 370, 150, [507, 808]);
    const l1 = "krank · Vertretung?", fs1 = Math.min(38, Math.floor((38 * 318) / mes(l1, 38, "de")));
    c.text(l1, 560, 694, fs1, "de", "middle", msg.g);
    D.outils.tx(msg.g, "مريض · شكون ياخد بلاصتو؟", 560, 748, 28, "ar");
    const pic = el("g", { transform: "translate(386 634) rotate(-12) scale(0.5)" }); D.telMini(pic, {}); c.node(pic, msg.g);   // collé au coin haut-gauche
    A.jaillit(msg, aB, 507, 808, 0.32);
    msg.on((t, s) => { if (t > aB + 0.32) s.y += 2 * Math.sin((t - aB) * 2.2); });

    // c.hud : fantôme (sortie du téléphone vers ses mains), bannière de date, pastilles, étiquette de mention
    H.fantome(c, { at: "b5", vers: [508, 1053], k: 0.07 });
    H.banniere(c, { at: "b5", until: "b5+1.1", y: 284, titre: "Donnerstag, 29. Mai 2025", ar: "الخميس" });
    H.pastille(c, "Notaufnahme", "المستعجلات", { at: aU, until: aS - 0.04, x: 520, y: 412, size: 30 });
    H.pastille(c, "Arbeitsunfähigkeitsbescheinigung · bis 02.06.2025", "شهادة طبية حتى 02.06", { at: aS, x: 520, y: 412, size: 22 });
    H.mention(c, [{ at: "b5", de: "laut Urteil", ar: "حسب الحكم" }, { at: aB, de: "Rekonstruktion", ar: "مشهد تمثيلي" }], { forme: "etiquette" });
  } });

  /* ═══════ 7 · Samedi : la salle des médecins (b6 → b7) — PIÈCE (glissement vers le haut) ═══════
   * C'est elle qui écrit : elle a repris ses gardes. Les aimants de LUI tombent, les siens claquent à leur place ; elle tape, furieuse. */
  st.scene({ from: "b6", in: "slideUp", inDur: 0.34, build(c) {
    X.use(c);
    // papier du fond limité au cadre (k.bg() monte jusqu'à y −1500 : pendant le glissement, il cachait le salon qui doit rester visible au-dessus)
    SketchUI.dots(c, -1500, -150, 4080, 2700);
    const m = M.of(c), t0 = T("b6");
    const aZ = T("b6@زميلتو"), aK = T("b6@كتبات"), aH = T("b6@حتى"), aF = T("b6@خديت"), aG = T("b6@gardes");
    // § 4 : poussée ×1,03 puis ×1,08 à « خديت » ; sans ce zoom (et cy 916) : à ×1,08, le haut du tableau montait sous la traduction
    // de la pastille et ses pieds descendaient sur l'étiquette de mention (les deux à la fois : la pièce est trop haute pour ×1,08)
    c.camera([{ at: "b6", s: 1.0, cx: 540, cy: 916 }, { at: "b6+0.1", s: 1.03, cx: 540, cy: 916, d: 1.2, ease: "lin" }]);
    const R = L.salle(c, { cascade: false, tableauDrop: true, widget: { petit: true, haut: "SA", jour: "31", bas: "MAI" }, widgetAt: "b6",
      aimants: [{ qui: "lui", case: "fr" }, { qui: "lui", case: "so" }] });
    // ses aimants à LUI pivotent et tombent dans la gouttière (rebond) ; les siens à ELLE claquent à leur place
    const chute = (n, at, x0, y0, x1, y1, rot) => { const a = T(at); n.on((t, s) => { const p = prog(t, a, 0.38); if (p <= 0) return;
      s.px = x0; s.py = y0; s.r += rot * E.out(Math.min(1, p * 1.8)); s.x += (x1 - x0) * E.out(p); s.y += (y1 - y0) * M.bounce(p); }); };
    chute(R.aimants[0], aF, 478, 690, 455, 770, 40);
    chute(R.aimants[1], aG, 650, 690, 604, 770, -40);
    const aimantElle = (x, y, at) => { const g = el("g", { transform: `translate(${x} ${y})` }); D.aimant(g, { qui: "elle" }); return c.node(g, R.tableau.g).slam(at, 0.25, 6); };
    aimantElle(478, 690, aF + 0.12); aimantElle(650, 690, aG + 0.12);
    // le post-it du jugement, collé au coin du tableau (il suit son balancement)
    const pg = el("g", { transform: "translate(720 795)" }); D.postit(pg, {});
    const pi = c.node(pg, R.tableau.g); A.jaillit(pi, aZ + 0.25, 720, 795, 0.3); m.sway(pi, 3, 2.4, [720, 752]);

    // ELLE, de face, elle tape (téléphone en (0, −237) × 1,04) ; corps et téléphone respirent ensemble
    const S = 1.04, X0 = 530, Y0 = 1320, corps = c.group().on(breathe(2));
    pp(X0, Y0, S, (t) => Object.assign({}, CAST.ELLE, { view: "front", headTilt: 6, look2: [0, 0.9], expr: "angry", blink: blinkAt(t, 1) > 0.5 ? 1 : 0, talk: 0 }, frappe(t)), corps.g);
    c.sk((g, p) => D.telMini(g, p), () => ({}), X0, Y0 - 237 * S, S, 0, corps.g);
    // deux marques de colère qui tremblent ; la bulle « … » au-dessus de son téléphone, jusqu'à la fin
    [[440, 868, t0 + 0.35], [634, 846, aH]].forEach(([x, y, a], i) => m.obj(D.colere, x, y, 1.1).pop(a, 0.3).on((t, s) => { s.px = x; s.py = y; s.r += 9 * Math.sin(t * 11 + i * 2); }));
    A.bulleFil(c, undefined, 612, 873, 104, 64, [572, 1040], { at: aK });   // § 4 : x 598 ; 14 px plus à droite, elle touchait ses cheveux
    m.typing(664, 905, aK + 0.08);

    // c.hud : bannière de date, pastilles (citations : entre « »), traduction commune qui reste, étiquette
    H.banniere(c, { at: "b6", until: "b6+1.0", y: 284, titre: "Samstag, 31. Mai 2025", ar: "السبت" });
    H.pastille(c, "« … seinen Dienst am Freitag übernommen »", null, { at: aF + 0.1, until: aG + 0.12, x: 520, y: 404, size: 22 });
    H.pastille(c, "« Auch diesen Dienst am Sonntag Tag habe ich übernommen »", null, { at: aG + 0.15, x: 520, y: 404, size: 22 });
    arHud(c, "خديت la garde ديال الجمعة وديال الأحد", 520, 466, 28, aF + 0.2);
    H.mention(c, ["laut ihrer Nachricht", "حسب الميساج ديالها"], { forme: "etiquette" });
  } });

  /* ═══════ 8 · Le brouillon : 549 € (b7 → b8) — ÉCRAN (plongée depuis sa main) ═══════
   * Dans son message, elle écrit sa colère : un week-end payé 549 euros, fichu. UNE bulle, contour en pointillé (brouillon). */
  st.scene({ from: "b7", in: "cut", inDur: 0.4, build(c) {
    X.use(c);
    const t0 = T("b7"), a1 = T("b7@1"), aE = T("b7@أورو"), aW = T("b7@ومشى"), l3 = Math.max(a1, t0 + 0.42);
    // départ : son téléphone à la fin de la scène 7 (monde (530, 1073), caméra cy 916, ×1,135 à l'écran)
    const P = L.fil(c, Object.assign({ entree: "plongee", depuis: [529, 1119, 0.07], batt: 0.8, mention: EXTRAIT, saisie: { curseur: false } }, FIL));
    const F = P.fil.g;
    pose(c, F, "sepDate", { texte: "Samstag, 31. Mai 2025" }, 525, 606);
    const B = A.brouillon(c, F, { n0: 2, etapes: [{ at: a1, n: 4 }, { at: aW, n: 6 }],
      // § 4 : L1 et L2 à b7+0,25 (0,25 s chacune) ; mais « 549 » (L3) arrive 0,33 s après b7 : L1, L2 plus tôt et plus vite, L3 après L2
      ecrit: { 0: [t0 + 0.1, 0.16], 1: [t0 + 0.26, 0.16], 2: [l3, 0.3], 3: [l3 + 0.3, 0.3], 4: [aW, 0.3], 5: [aW + 0.3, 0.3] },
      elle: (t) => (t < aW ? { expr: "angry", look2: [-0.4, -0.3] } : { expr: "angry", look2: [0, -1], headTilt: -5 }) });
    B.souligne(2, "Obwohl ich einen Wochenendausflug für ", "549 €", l3 + 0.32);

    // le billet du week-end : pop (−5°), il flotte ; à « ومشى » il se déchire, ses moitiés tombent hors du fil
    const bx = 420, by = 706, bil = c.group(F);
    c.sk((g, p) => D.billetWeekend(g, p), (t) => ({ dechire: rnd(E.out(prog(t, aW, 0.3)), 20) }), bx, by, 1, -5, bil.g).on((t, s) => { s.o *= t < aW + 0.3 ? 1 : 0; });
    [["g", -330, 250, -34], ["d", 440, 230, 30]].forEach(([mo, dx, dy, rr]) => {
      c.sk((g, p) => D.billetWeekend(g, p), () => ({ dechire: 1, moitie: mo }), bx, by, 1, -5, bil.g).on((t, s) => {
        if (t < aW + 0.3) { s.o *= 0; return; } const e = E.in(prog(t, aW + 0.3, 0.5));
        s.px = bx + (mo === "g" ? -75 : 75); s.py = by; s.x += dx * e; s.y += dy * e; s.r += rr * e; s.o *= 1 - prog(t, aW + 0.68, 0.12); });
    });
    A.jaillit(bil, a1 + 0.05, bx, by, 0.3);
    bil.on((t, s) => { if (t < aW) s.y += 3 * Math.sin((t - a1) * 2.6); });
    A.buzz(P.tel, aW + 0.02, 5, 0.3);   // la déchirure secoue le téléphone

    H.pastille(c, "« Wochenendausflug für 549 € »", "خرجة ديال الويكاند: 549 أورو", { at: aE, until: aW + 0.13, size: 26, parent: P.bande });
    H.pastille(c, GROS_MOT ? "« … mein WE eh im Arsch war … »" : "« … mein WE eh im A… war … »", "الويكاند ديالي مشى فيها", { at: aW + 0.15, size: 24, parent: P.bande });
  } });

  /* ═══════ 9 · Dans le même message : ses diagnostics (b8 → b9) — ÉCRAN (coupe) ═══════
   * Le même message contient les diagnostics du collègue (barres noires) ; elle les tenait d'une collègue des urgences (sans visage). */
  st.scene({ from: "b8", in: "cut", inDur: 0, build(c) {
    const k = X.use(c);
    const t0 = T("b8"), aK = T("b8@كتبات"), aD = T("b8@diagnostics"), aY = T("b8@ديالو"), aA = T("b8@عاوداتهم"), aL = T("b8@ليها"), aZ = T("b8@زميلة"), aU = T("b8@المستعجلات");
    const P = L.fil(c, Object.assign({ at: "b7", batt: 0.7, mention: URTEIL, saisie: { curseur: false } }, FIL));
    const F = P.fil.g;
    pose(c, F, "sepDate", { texte: "Samstag, 31. Mai 2025" }, 525, 606);
    const B = A.brouillon(c, F, { n0: 6, etapes: [{ at: aK, n: 7 }, { at: aD + 0.3, n: 8 }], ecrit: { 6: aK, 7: aD + 0.3 },
      elle: (t) => ({ expr: "angry", look2: [t < aA ? -0.4 : -0.6, t < aA ? -0.2 : -0.8] }) });
    // UN seul message : l'accolade suit le haut de la bulle ; la bulle (avec tout le fil) pulse ; le fil passe à 45 % sous la carte
    const acc = c.sk((g, p) => D.accolade(g, p), (t) => ({ h: B.h(t) }), 192, 0, 1, 0, F).on((t, s) => { s.y += B.haut(t); });
    acc.wipe(t0, 0.3, "down"); acc.hide(aY, 0.2);
    P.fil.on((t, s) => { const p = prog(t, t0 + 0.05, 0.4); if (p > 0 && p < 1) { s.px = 506; s.py = 1068; s.s *= 1 + 0.03 * Math.sin(Math.PI * p); }
      s.o *= t < aA ? 1 : t < aU + 0.2 ? lerp(1, 0.45, E.out(prog(t, aA, 0.15))) : lerp(0.45, 1, prog(t, aU + 0.2, 0.2)); });
    H.pastille(c, "Diagnosen · Laborwerte", "التشخيصات · التحاليل", { at: aD, until: aZ - 0.04, size: 28, parent: P.bande });

    // « ديالو » : SES diagnostics — son avatar, et une flèche qui part de L7 (par la marge droite, sans couvrir le texte)
    const lui = A.avatarVif(c, P.contenu, "LUI", 300, 716, 50, () => ({ expr: "worried", look2: [0.5, 0.6] }));
    A.jaillit(lui, aY, 300, 716, 0.25); lui.hide(aA, 0.15);
    const x7 = Math.round(238 + 150 + 12 + mes("Diagnosen", 26, "de") + 12 + 220 + 10);
    chemin(c, P.contenu, `M${x7} 1128 C 846 1118, 858 840, 700 794 S 430 770, 358 742`, "M376 730 L358 742 L375 756", aY + 0.02, 0.28, 4).hide(aA, 0.15);

    // la carte « source » tombe par-dessus le haut du fil : la collègue des urgences (sans visage) → ELLE
    const carte = c.group(P.dessus);
    k.card(196, 596, 658, 224, { parent: carte.g, seed: 907 });
    // la silhouette « envoie » (elle enfle quand les barres partent) ; les deux avatars flottent (±5 px)
    const sg = el("g", { transform: "translate(290 708)" }); D.avatarSil(sg, { r: 56 });
    c.node(sg, carte.g).float(5, 2.2, 0).on((t, s) => { const p = prog(t, aL + 0.06, 0.4); if (p > 0 && p < 1) { s.px = 290; s.py = 708; s.s *= 1 + 0.09 * Math.sin(Math.PI * p); } });
    A.avatarVif(c, carte.g, "ELLE", 760, 708, 56, (t) => (t < aL + 0.7 ? { expr: "focused", look2: [-0.7, 0] } : t < aL + 1.0 ? { expr: "shock", look2: [-0.5, 0] } : { expr: "angry", look2: [-0.4, 0.4] }), { k: 2 }).float(5, 2.2, 1.6).on((t, s) => { for (const a of [aL + 0.58, aL + 0.7]) { const p = prog(t, a, 0.25); if (p > 0 && p < 1) { s.px = 760; s.py = 708; s.s *= 1 + 0.06 * Math.sin(Math.PI * p); } } });
    trace(c, carte.g, [352, 708], [698, 708], aL, 0.4, { pointille: true, courbe: -0.12, sw: 4 });
    M.of(c).build(carte, aA, "drop", { dist: 90, dur: 0.3 });
    carte.on((t, s) => { const p = prog(t, aU + 0.45, 0.2); if (p > 0) { s.y -= 140 * E.in(p); s.o *= 1 - p; } });
    // deux petites barres noires glissent le long de la flèche, entrent dans SON avatar, puis tombent dans L7 et L8
    const Q = (u) => { const a = [352, 708], b = [698, 708], q = [525, 666.5]; return [(1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * q[0] + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * q[1] + u * u * b[1]]; };
    const x2 = (i) => 238 + (i ? 90 : 150) + 12 + mes(i ? "Laborwerte" : "Diagnosen", 26, "de") + 12 + (i ? 135 : 110);   // milieu de la 2e barre de L7 / L8
    [0, 1].forEach((i) => {
      const g = el("g", { transform: "translate(-35 -11)" }); D.caviar(el("g", { transform: "scale(1 0.73)" }, g), { w: 70, seed: 140 + i });
      const dest = [x2(i), 1133 + 42 * i];
      c.node(g, P.dessus).on((t, s) => {
        const u = clamp((t - (aL + 0.1) - 0.12 * i) / 0.48, 0, 1), f = E.inOut(prog(t, aU + 0.2 + 0.06 * i, 0.35));
        if (t < aL + 0.1 + 0.12 * i) { s.o *= 0; return; }
        const [qx, qy] = Q(u), sx = qx - (u >= 1 ? 30 : 0), sy = qy - 22 + 24 * i;   // elles s'arrêtent au bord de son avatar (pas sur son visage)
        s.x += lerp(sx, dest[0], f); s.y += lerp(sy, dest[1], f) - 60 * Math.sin(Math.PI * f) * 0.4;
        s.s *= u >= 1 && f <= 0 ? 0.8 : 1; s.o *= clamp(u * 6, 0, 1) * (1 - prog(t, aU + 0.55 + 0.06 * i, 0.1));
      });
    });
    H.pastille(c, "« eine Kollegin aus der Notaufnahme »", "زميلة من المستعجلات", { at: aZ, size: 24, parent: P.bande });
    A.punch(P.tel, aZ, 0.025);   // coup de zoom sur « زميلة » : la source
    trace(c, P.dessus, [256, 500], [262, 650], aZ + 0.12, 0.25, { courbe: 0.32, sw: 3.4 }).on((t, s) => { s.o *= 1 - prog(t, aU + 0.45, 0.2); });
  } });

  /* ═══════ 10 · La dernière ligne (b9 → b10@end) — ÉCRAN (coupe) ═══════
   * Sa dernière phrase, la seule qu'on puisse lire : elle s'écrit mot à mot dans la bulle ET dans la loupe ; la traduction (provisoire) ;
   * la loupe rentre dans la ligne ; son pouce va sur le bouton d'envoi. */
  st.scene({ from: "b9", in: "cut", inDur: 0, build(c) {
    X.use(c);
    const t0 = T("b9"), aV = T("b9@Vielleicht"), aP = T("b9@Pups"), aQ = T("b9@quer"), t10 = T("b10"), aFin = T("b10@end");
    const mots = ["b9@Vielleicht", "b9@sitzt", "b9@aber", "b9@ein", "b9@Pups", "b9@quer"].map(T);
    const appui = (t) => clamp((t - (aFin - 0.05)) / 0.08, 0, 1);
    const P = L.fil(c, Object.assign({ at: "b7", batt: 0.6, mention: EXTRAIT, saisie: { curseur: false, appui } }, FIL));
    const F = P.fil.g;
    // le séparateur dépassait au-dessus de la loupe : il s'efface sous elle, et revient quand elle rentre dans L9
    pose(c, F, "sepDate", { texte: "Samstag, 31. Mai 2025" }, 525, 606).on((t, s) => { s.o *= 1 - prog(t, aV - 0.12, 0.15) + prog(t, aFin - 0.3, 0.2); });
    const terne = (t) => (t < aFin - 0.35 ? lerp(1, 0.55, E.out(prog(t, t0, 0.25))) : lerp(0.55, 1, prog(t, aFin - 0.35, 0.25)));
    A.brouillon(c, F, { n0: 8, etapes: [{ at: t0, n: 9 }], mots9: mots, terne,
      elle: (t) => (t < aQ ? { expr: "angry", look2: [-0.5, -0.6] } : { expr: "smile", look2: [-0.4, -0.6], dy: -6 * Math.sin(Math.PI * prog(t, aQ, 0.3)) }) });

    // la loupe (carte tenue par deux scotchs, reliée à L9) : elle jaillit de L9, tressaute à chaque mot, flotte
    const loupe = c.group(P.dessus);
    c.sk((g, p) => D.loupeCitation(g, p), (t) => ({ vers: [28, 576], marge: 6, rAnneau: 9, j: Math.round(3 * Math.sin(t * 7)) }), 196, 596, 1, 0, loupe.g);   // lien par la marge
    const deux = c.group(loupe.g), tsp = [];
    [[0, 3, 668], [3, 6, 738]].forEach(([i0, i1, y]) => {
      const tt = el("text", { x: 525, y, "font-size": 54, "text-anchor": "middle", class: "de" });
      for (let j = i0; j < i1; j++) { const s = el("tspan", {}, tt); s.textContent = (j > i0 ? " " : "") + A.MOTS9[j]; tsp[j] = s; }
      if (y === 738) {   // coup de surligneur sous « Pups » (derrière le texte)
        const full = A.MOTS9.slice(3).join(" "), x0 = 525 - mes(full, 54, "de") / 2, xp = x0 + mes("ein ", 54, "de"), wp = mes("Pups", 54, "de");
        const hg = el("g"); el("path", { d: U.rrect(xp - 6, y - 38, wp + 12, 48, 10), fill: "#F8CE4E", opacity: 0.9 }, hg);
        c.node(hg, deux.g).wipe(aP, 0.25);
      }
      c.node(tt, deux.g);
    });
    c.tick((t) => tsp.forEach((s, j) => { const v = t >= mots[j] ? "1" : "0"; if (s.getAttribute("fill-opacity") !== v) s.setAttribute("fill-opacity", v); }));
    // b10 : les deux lignes se resserrent en UNE (34 px), puis la traduction ← (ttl 46 px, 40 au-delà de 26 signes : R5)
    deux.on((t, s) => { const p = E.inOut(prog(t, t10, 0.3)); if (p > 0) { s.px = 525; s.py = 660; s.s *= lerp(1, 0.63, p); s.y += (650 - 700) * p; s.o *= 1 - p; } });
    c.text(A.MOTS9.join(" "), 525, 650, 34, "de", "middle", loupe.g).fade(t10 + 0.12, 0.25);
    const tr = TRAD_B10.length > 26 ? 40 : 46, ftr = Math.min(tr, Math.floor((tr * 600) / mes(TRAD_B10, tr, "ttl")));
    c.text(TRAD_B10, 525, 740, ftr, "ttl", "middle", loupe.g).wipe(t10 + 0.15, 1.2, "rtl");
    A.jaillit(loupe, aV - 0.12, 224, 1172, 0.3);
    coup(loupe, mots, 525, 691, 0.045, 0.28, 1.6);   // § 4 : +3 % en 0,14 s ; +4,5 % en 0,28 s : la loupe bat au rythme des mots (sinon la scène est « figée » entre deux mots)
    loupe.on((t, s) => { s.y += 3 * Math.sin(t * 3.9); const p = E.in(prog(t, aFin - 0.35, 0.25)); if (p > 0) { s.px = 224; s.py = 1172; s.s *= lerp(1, 0.03, p); s.o *= 1 - p; } });
    A.punch(P.tel, aV, 0.025, 0.9);   // (ajout) le téléphone « se penche » doucement quand la citation commence
    A.punch(P.tel, aP, 0.04);
    H.pastille(c, "« … um den Kläger in der Abteilung bloßzustellen »", "باش تحشمو قدام السرفيس", { at: t10 + 0.9, size: 22, parent: P.bande });

    // son pouce : il entre par la droite (découpé à x 906 : colonne des boutons Instagram), puis appuie sur le bouton d'envoi
    const zone = c.clipped(0, 0, 906, 1920, P.dessus);
    c.sk((g, p) => D.pouce(g, p), (t) => ({ appui: rnd(appui(t), 10) }), 822, 1342, 1, 0, zone)
      .on((t, s) => { const a = aFin - 0.35; s.o *= t >= a ? 1 : 0; s.x += 90 * (1 - E.out(prog(t, a, 0.2))); });
  } });

  /* ═══════ 11 · Envoyé : le silence (b10@end → b11) — ÉCRAN (coupe) ═══════
   * C'est parti, chez sept collègues. La bulle devient verte (la teinte de l'épisode), le fil monte une dernière fois, sept traits, sept
   * avatars au visage neutre reçoivent leur pastille « transmis » ; puis PLUS RIEN ne bouge (seulement des clignements). */
  st.scene({ from: "b10@end", in: "cut", inDur: 0, build(c) {
    X.use(c);
    const t0 = T("b10@end"), t11 = T("b11"), dt = t11 - t0 < 1.1 ? 0.06 : 0.09, gel = t0 + 0.95;   // § 6.3 : silence plus court → 0,06 s
    const defile = A.defileur(0, [{ at: t0, dy: 150, d: 0.4 }]);
    const P = L.fil(c, Object.assign({ at: "b7", batt: 0.5, mention: REKO, defile, semisStop: t0, pale: (t) => clamp((t - t0 - 0.4) / 0.3, 0, 1),
      saisie: { curseur: false, parti: (t) => t >= t0, appui: (t) => 1 - clamp((t - t0) / 0.08, 0, 1) } }, FIL));
    const F = P.fil.g;
    pose(c, F, "sepDate", { texte: "Samstag, 31. Mai 2025" }, 525, 606);
    A.brouillon(c, F, { n0: 9, envoi: t0, elle: () => ({ expr: "calm", look2: [-0.3, -0.3] }) });
    // le silence : les petites formes du fond s'arrêtent avec le fil (leur temps est figé à t0 + 0,95)
    const fg = P.fond.g.firstChild;   // le <g> du fond (papier + formes) dans le nœud P.fond
    c.nodes.filter((n) => n.g.parentNode === fg).forEach((n) => { const tw = n.tw.slice(); n.tw = [(t, s) => tw.forEach((f) => f(Math.min(t, gel), s))]; });

    // le pouce relâche et sort
    const zone = c.clipped(0, 0, 906, 1920, P.dessus);
    c.sk((g, p) => D.pouce(g, p), (t) => ({ appui: rnd(1 - clamp((t - t0) / 0.08, 0, 1), 10) }), 822, 1342, 1, 0, zone)
      .on((t, s) => { s.x += 130 * E.in(prog(t, t0 + 0.05, 0.2)); s.o *= 1 - prog(t, t0 + 0.22, 0.04); });

    H.pastille(c, "« an jedenfalls sieben Mitglieder … übermittelt »", "وصل لـ7 ديال الزملاء", { at: t0 + 0.2, size: 22, micro: "laut Urteil", parent: P.bande });
    // sept traits fins en pointillé, du bas de la bulle (après la montée) vers sept avatars hors du fil ; pastille « transmis » ; « 7 »
    ["K1", "K2", "K3", "K4", "K5", "K6", "K7"].forEach((q, i) => {
      const a = t0 + 0.3 + dt * i, x = 250 + 84 * i, y = 1196;
      c.sk((g, p) => { D.outils.ln(g, `M506 1072 L${Math.round(lerp(506, x, p.p))} ${Math.round(lerp(1072, y - 34, p.p))}`, 2.4, "#8A8A84", { "stroke-dasharray": "2 8" }); },
        (t) => ({ p: rnd(prog(t, a, 0.08), 10) }), 0, 0, 1, 0, P.contenu).on((t, s) => { s.o *= t >= a ? 1 : 0; });
      const av = A.avatarVif(c, P.contenu, q, x, y, 30, (t) => ({ expr: "neutral", look2: [0, 0], badge: t >= a + 0.12 ? "point" : null }), { k: i + 3 });
      A.jaillit(av, a + 0.05, x, y, 0.2);
    });
    H.compteur(c, P.contenu, t0 + 0.42, { n: 7, dt });
  } });
});
