/* scenes-1.js — PARTIE 1 de l'épisode : accroche, intro de l'auteur, premières scènes (voir storyboard.md § 4).
 * Les exemples ci-dessous sont À REMPLACER. Une idée par scène ; le décor se construit en cascade puis il vit.
 * Dans chaque scène : const k = X.use(c);  puis  const m = M.of(c);
 */
(window.EP_PARTS = window.EP_PARTS || []).push(function (X) {
  "use strict";
  const { st, T, E, prog, lerp, clamp, el, U, MAT, INK, PE, PP, D, M, CAST, kit, drawDE, pinAt, blinkAt, talkAt, rnd, pp, ph, breathe, rl, walkTo, AFTER_INTRO, LAST } = X;

  /* ═══════ 1 · ACCROCHE — À REMPLACER : la sanction chiffrée, décor complet, mouvement fort dès la 1re image ═══════ */
  st.scene({ from: 0, in: "cut", inDur: 0, build(c) {
    const k = X.use(c); k.bg();
    const m = M.of(c);
    c.camera([{ at: 0, s: 1.0, cx: 540, cy: 860 }, { at: "b2@end", s: 1.03, cx: 540, cy: 860, ease: "lin" }]);   // poussée lente continue
    const lamp = m.obj(D.exemple, 540, 300, 1); m.build(lamp, 0.05, "drop", { dist: 160, dur: 0.45 }); m.pend(lamp, 0.5, 5, [540, 300], { idle: 1.2 });
    pp(0, 0, 1.1, (t) => Object.assign({}, CAST.DOC, PP.stand, { view: "three-quarter", facing: 1, expr: t < T("b2") ? "worried" : "shock", blink: rnd(blinkAt(t, 1)) }))
      .on((t, s) => { s.x += 540; s.y += 1300; }).on(breathe(1));
    k.chip("Geldstrafe", "غرامة", 540, 470, 40, { yellow: true }).pop("b1", 0.3);
    c.kick("b2", 0.06);
  } });

  /* ═══════ 2 · INTRO DE L'AUTEUR — SOCLE pour les éléments (photo, anneau, Instagram, « Yassine », @dr.aguilo, j'aime,
   *  s'abonner, summary:false) ; le CADRE autour (tableau de garde, badge, téléphone, plaque, polaroïd…) est propre à l'épisode ═══════ */
  st.scene({ from: "i1", in: "iris", inDur: 0.3, summary: false, build(c) {
    const k = X.use(c); k.bg();
    c.camera([{ at: "i1", s: 1.05, cx: 540, cy: 820 }, { at: "i2", s: 1.0, cx: 540, cy: 860, d: 0.5 }]);
    const m = M.of(c); m.rays(540, 600, { op: 0.15, R: 560, speed: 6, at: "i1" });
    const photo = el("g"), C = U.ctx(photo, 88, false, 1);
    const cp = el("clipPath", { id: "clipPortrait" }, el("defs", {}, photo)); el("circle", { cx: 0, cy: 0, r: 208 }, cp);
    el("circle", { cx: 9, cy: 12, r: 236, fill: "#D2D2CB" }, photo);
    U.shape(C, "ring", "M-236 0 A236 236 0 1 1 236 0 A236 236 0 1 1 -236 0", MAT.yellow, { sw: 4 });
    el("image", { href: "assets/portrait.png", x: -210, y: -210, width: 420, height: 420, "clip-path": "url(#clipPortrait)", preserveAspectRatio: "xMidYMid slice" }, photo);
    U.shape(C, "ring1", "M-209 0 A209 209 0 1 1 209 0 A209 209 0 1 1 -209 0", {}, { sw: 5.5 });
    U.stroke(C, "dash", "M-150 -196 C -90 -232, 60 -236, 140 -200", { sw: 3, stroke: "#FFFFFF" });
    // badge Instagram dessiné, accroché au cadre
    const ig = el("g", { transform: "translate(160 160)" }, photo), I = U.ctx(ig, 89, false, 1);
    el("path", { d: U.rrect(-46, -46, 92, 92, 26), fill: "#D2D2CB", transform: "translate(5 6)" }, ig);
    U.shape(I, "sq", U.rrect(-46, -46, 92, 92, 26), MAT.white, { sw: 4.2 });
    U.shape(I, "c", "M-19 0 A19 19 0 1 1 19 0 A19 19 0 1 1 -19 0", MAT.yellow, { sw: 4.2 });
    el("circle", { cx: 25, cy: -25, r: 6, fill: INK }, ig);
    c.node(photo).on((t, s) => { s.x += 540; s.y += 600; }).pop("i1", 0.4);
    k.ribbon("Yassine", 540, 905, { size: 60 }).wipe("i1@ياسين", 0.35);
    const hd = el("g"), H = U.ctx(hd, 90, false, 1);
    U.shape(H, "sq", U.rrect(-21, -21, 42, 42, 12), MAT.white, { sw: 3 }); U.stroke(H, "c", "M-9 0 A9 9 0 1 1 9 0 A9 9 0 1 1 -9 0", { sw: 3 }); el("circle", { cx: 12, cy: -12, r: 3, fill: INK }, hd);
    c.node(hd).on((t, s) => { s.x += 410; s.y += 996; }).pop("i1@ياسين+0.15", 0.3);
    c.text("@dr.aguilo", 560, 1012, 46, "de").fade("i1@ياسين+0.15", 0.3);
    k.chip("Arzt in Deutschland", "طبيب فألمانيا", 540, 1078, 26).pop("i1@فألمانيا").hide("i2@حقيقية", 0.15);
    k.chip("echte Fälle · deutsche Gerichte", "قصص حقيقية من المحاكم", 540, 1078, 26, { yellow: true }).pop("i2@حقيقية+0.15").hide("i3", 0.15);
    // j'aime + s'abonner
    const la = T("i3@j'aime"), fa = T("i3@abonne");
    c.sk((g, p) => PE.props.heart(g, { size: 1.25, fill: p.on, beat: p.b }), (t) => ({ on: t >= la, b: rnd(Math.sin(Math.min(1, prog(t, la, 0.35)) * Math.PI), 10) }), 330, 1185, 1).pop("i3", 0.3);
    c.text("j'aime", 330, 1258, 30, "de").pop("i3", 0.3);
    c.sk((g, p) => {
      while (g.firstChild) g.removeChild(g.firstChild);
      const B = U.ctx(g, 91, false, 1);
      el("path", { d: U.rrect(-150, -42, 300, 84, 22), fill: "#D2D2CB", transform: "translate(6 7)" }, g);
      U.shape(B, "btn", U.rrect(-150, -42, 300, 84, 22), p.on ? MAT.yellow : MAT.white, { sw: 3.4 });
      U.text(g, p.on ? "✓ abonné" : "+ s'abonner", 0, 14, 40, {});
    }, (t) => ({ on: t >= fa }), 640, 1190, 1).pop("i3+0.1", 0.3);
    c.kick(la, 0.05); c.kick(fa, 0.05);
  } });

  /* ═══════ 3 · CARTE — exemple (À ADAPTER : forme propre à l'épisode, voir SAISON-2.md) ═══════ */
  st.scene({ from: AFTER_INTRO, in: "iris", inDur: 0.3, build(c) {
    const k = X.use(c); k.bg();
    const m = M.of(c); m.shapes({ seed: 5 });
    const geo = drawDE(c, 330, 860, 40, AFTER_INTRO), [x, y] = geo(6.96, 50.94);
    pinAt(c, x, y, AFTER_INTRO + "+0.4"); m.ripple(x, y, T(AFTER_INTRO) + 0.8);
    k.chip("Köln", "كولونيا", x + 150, y - 40, 34).pop(AFTER_INTRO + "+0.6");
    c.camera([{ at: AFTER_INTRO, s: 1.0, cx: 540, cy: 860 }, { at: AFTER_INTRO + "+0.5", s: 1.25, cx: x + 80, cy: y, d: 0.6 }]);
  } });
});
