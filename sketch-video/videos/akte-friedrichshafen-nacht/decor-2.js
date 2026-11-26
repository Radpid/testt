/* decor-2.js — AKTE 09 « غير سكران » : décors et objets PROPRES à l'épisode, 2e partie (S8 à S22). Mêmes conventions,
 * mêmes matières et mêmes aides que decor.js (D._) : l'épisode a UNE main. Référence : storyboard.md § 2 et § 4.
 * Essai : node tools/essai_decor.mjs videos/akte-friedrichshafen-nacht --cols 2 --cell 540 --per 6 [--only nom1,nom2]
 *
 * Contenu (l'état complet de l'inventaire est en tête de decor.js) :
 *   E. le box des urgences : D.boxMur, D.rail, D.rideau, D.lampeExamen, D.scope, D.planchette, D.porteFond, D.alarmeMurale,
 *      D.ballon, D.lampeStylo, D.montreBroche, D.feuilleGros
 *   C. D.helico, D.horlogeGrande          F. la scène muette : D.chambreNeutre, D.litNeutre, D.chaiseSweat, D.veilleuse
 *   G. le tribunal (S19 à S22) : D.aube, D.amtsgericht, D.tilleul, D.rue, D.hall, D.porteSalle, D.encreMontant, D.salle,
 *      D.dos, D.bancParties, D.negatoscope, D.marteauReflexes, D.lunettesLecture, D.plume, D.foulard
 *   hors inventaire (pièces de HUD dont les scènes S12, S14, S16, S19, S20, S21 ont besoin) : D.carteQ, D.cadreCT,
 *      D.etiquette, D.rond
 *
 * Rappels : (0,0) = ancrage ; o = paramètres animés (ARRONDIS par l'appelant) ; valeurs par défaut partout ; o.part = une
 * partie seulement, dans le même repère (fond statique avec m.obj, parties mobiles dans leurs propres nœuds).
 * Décors du haut du diptyque : ancrage (0, ligne), donc y local = −h (le storyboard écrit (x, h)) et x local = x écran.
 */
(function () {
  "use strict";
  const D = window.EpDecor = window.EpDecor || {};
  // decor.js fournit les aides (D._) ; si ce fichier est chargé avant lui (l'outil d'essai charge par ordre alphabétique),
  // on attend : decor.js lance les suites en attente à sa fin.
  if (D._ && D._.partie) suite(); else (D._attente = D._attente || []).push(suite);
  function suite() {
  const SC = SketchCast, U = SC.util, MAT = SC.MAT;
  const { el, f, pt, clamp, lerp, hsh, sstep, uid, ln, fl, ombre, rr, cercle, poly, tx, ar, larg, largAr, bosses, clipRond, clipPoly,
    INK, YEL, OMB, PAPIER, GRIS, PLEX, SKIN, CLAIR, BOIS, JAUNE, DRAP, SOMBRE, partie, sol, membre } = D._;
  const TAU = Math.PI * 2, rad = (a) => a * Math.PI / 180;
  // mélange de deux couleurs #rrggbb (t 0..1)
  const mix = (a, b, t) => { const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16), c = (s) => Math.round(((A >> s) & 255) + (((B >> s) & 255) - ((A >> s) & 255)) * clamp(t, 0, 1));
    return "#" + ((1 << 24) + (c(16) << 16) + (c(8) << 8) + c(0)).toString(16).slice(1); };
  // écriture à la main révélée de gauche à droite (p 0..1) ; ancrage du texte : début de la ligne de base (o.anchor "middle" : centre)
  const ecrit = (G, s, x, y, size, p, o) => { o = o || {}; p = clamp(p == null ? 1 : p, 0, 1); if (p <= 0.003) return null;
    const w = larg(s, size), x0 = o.anchor === "middle" ? x - w / 2 : x;
    if (p < 0.999) { const id = uid("ecr"), cp = el("clipPath", { id }, G); el("rect", { x: f(x0 - 4), y: f(y - size * 1.25), width: f((w + 10) * p), height: f(size * 1.7) }, cp); G = el("g", { "clip-path": `url(#${id})` }, G); }
    return tx(G, s, x0, y, size, Object.assign({}, o, { anchor: "start" })); };
  // forme d'un complexe du tracé cardiaque (même dessin que la ligne de l'écran, D.ligne) : y(dx) pour un pic donné
  const ECG = [[-52, 0], [-44, -4], [-36, -7], [-28, -4], [-20, 0], [-9, 0], [-5, 5], [0, -34], [6, 12], [11, 0], [22, 0], [30, -5], [38, -9], [46, -5], [54, 0]];
  const ecgY = (dx, pic, sx) => { const x = dx / sx; if (x <= -52 || x >= 54) return 0; for (let i = 1; i < ECG.length; i++) if (x <= ECG[i][0]) {
    const a = ECG[i - 1], b = ECG[i], t = (x - a[0]) / (b[0] - a[0]); return (a[1] + (b[1] - a[1]) * t) * (pic / 34); } return 0; };
  const MUR_BOX = "#EEF0EC", MUR_COUL = "#E6E8E3", SOL_BOX = { base: "#E3E5DF", hatch: "#B4B7AE", gap: 10, fw: 1 };
  const PULL = MAT.mid, VESTE = SOMBRE;                                                   // les tenues Persona « sweater » et « suit »
  const CHEV_GRIS = (window.Persona && Persona.MAT.hairGrey) || { base: "#E6E6E1", hatch: "#96968F", gap: 4.8, fw: 1.2 };
  const CHEV_BRUN = (window.Persona && Persona.MAT.hairBrown) || { base: "#A3A39C", hatch: "#44443F", gap: 4.6, fw: 1.35 };
  const LIEGE = { base: "#E6E0CF", hatch: "#B8AF95", gap: 5, fw: 0.9 }, PIERRE = { base: "#E4E2DA", hatch: "#A9A69B", gap: 6, fw: 1 };

  /* ═══════════════════════════════ E. LE BOX DES URGENCES (S8 à S16, S29) ═══════════════════════════════
   * Mise en place fixe (storyboard, « Mise en place FIXE le box ») : tous les décors du box sont posés en (x, h) dans dp.gH ;
   * l'ancrage de D.boxMur est (0, ligne) : y local = −h, x local = x écran. */

  /* E1 — le mur du box, le sol, le renfoncement du couloir. Ancrage = (0, ligne de référence). Mur #EEF0EC x −60…700 de h 80 à
   * h 820 (le cadre s'arrête à h 768) ; bande de protection h 250–264 ; rampe murale (trois prises + deux embouts de gaz gris)
   * x 372–528, h 292–338 ; plinthe ; sol #E3E5DF de h 80 à h −92 (9 fuyantes) ; à droite de x 700, le renfoncement du couloir :
   * retour du mur (x 700–716), mur du fond #E6E8E3 dont le sol remonte à h 130, sa propre bande de protection (h 236–248).
   * Statique (m.obj). Ancres : sol (y), couloir (pied du mur du fond), rampe. */
  D.boxMur = (g, o = {}) => {
    const C = U.ctx(g, 2101, false, 1), X1 = 1140;
    sol(g, C, -60, X1, -80, 92, "solBox", SOL_BOX, 9);
    // le couloir, au fond à droite : son sol, son mur, sa bande
    U.shape(C, "solCouloir", poly([[716, -130], [X1, -130], [X1, -80], [700, -80]]), { base: "#DCDED8", hatch: "#ABAEA5", gap: 8, fw: 1 }, { sw: 1.6, r: 0.4 });
    for (let i = 1; i < 5; i++) { const x = 716 + i * 92; ln(g, `M${x} -130 L${x - 8} -82`, 1.2, "#A3A69D"); }
    fl(g, `M716 -830 L${X1} -830 L${X1} -130 L716 -130 Z`, MUR_COUL);
    for (let x = 800; x < X1; x += 130) ln(g, `M${x} -830 L${x} -248 M${x} -236 L${x} -140`, 1, "#D6D9D2");
    U.shape(C, "bandeC", `M716 -248 L${X1} -248 L${X1} -236 L716 -236 Z`, MAT.grey, { sw: 1.8, r: 0.3 });
    fl(g, `M716 -140 L${X1} -140 L${X1} -130 L716 -130 Z`, "#D2D4CC"); ln(g, `M716 -140 L${X1} -140`, 1.2, "#8A8A84");
    // le bout du mur du box, vu en fuite (il donne la profondeur du couloir)
    U.shape(C, "retour", poly([[700, -830], [716, -830], [716, -130], [700, -80]]), { base: "#DCDED7", hatch: "#B4B7AE", gap: 5, fw: 0.9 }, { sw: 2.2, r: 0.3 });
    // le mur du box
    fl(g, "M-60 -830 L700 -830 L700 -80 L-60 -80 Z", MUR_BOX);
    for (let x = 90; x < 700; x += 150) ln(g, `M${x} -830 L${x} -266 M${x} -248 L${x} -94`, 1, "#DADDD6");
    for (let i = 0; i < 18; i++) ln(g, `M${f(690 - i * 7)} -830 l${f(-24 - i * 2)} ${f(30 + i * 2)}`, 1, "#DDE0D9", { opacity: 0.6 });   // pénombre de l'angle
    U.shape(C, "bande", "M-60 -264 L700 -264 L700 -250 L-60 -250 Z", MAT.grey, { sw: 2.2, r: 0.4 });
    ln(g, "M-60 -259 L700 -259", 1.2, "#FFFFFF", { opacity: 0.8 });
    fl(g, "M-60 -92 L700 -92 L700 -80 L-60 -80 Z", "#D2D4CC"); ln(g, "M-60 -92 L700 -92", 1.4, "#8A8A84");
    // rampe murale : trois prises, deux embouts de gaz (aucun texte)
    ombre(g, rr(372, -338, 156, 46, 6), 4, 5);
    U.shape(C, "rampe", rr(372, -338, 156, 46, 6), MAT.white, { sw: 2.2 });
    [396, 424, 452].forEach((x, i) => { U.shape(C, "prise" + i, rr(x - 10, -326, 20, 22, 4), { base: "#F4F4EE" }, { sw: 1.5, r: 0.3 }); [-4, 4].forEach((dx) => el("circle", { cx: x + dx, cy: -315, r: 1.9, fill: INK }, g)); });
    [484, 510].forEach((x) => { el("circle", { cx: x, cy: -315, r: 10, fill: "#E1E1DC", stroke: INK, "stroke-width": 1.8 }, g); el("circle", { cx: x, cy: -315, r: 4.6, fill: "#77776F", stroke: INK, "stroke-width": 1.2 }, g); });
    return { sol: -80, couloir: [716, -130], rampe: [450, -315] };
  };

  /* E2 — le rail de plafond et le rideau replié. D.rail : ancrage = bout gauche du rail (box : (120, h 748)) ; o.w (570) ;
   * deux tiges vers le plafond, 9 galets serrés à gauche (au-dessus du rideau). D.rideau : ancrage = haut gauche, sur le rail
   * (box : (112, h 742)) ; 120 × 646 ; filet ajouré en haut, 7 plis hachurés, embrasse à mi-hauteur, ourlet. Il se balance
   * (m.sway 0,7°, 3,8 s, pivot = (0, 0)). Ancres : pivot, embrasse, bas. */
  D.rail = (g, o = {}) => {
    const w = o.w || 570, C = U.ctx(g, 2111, false, 1);
    [44, w - 44].forEach((x) => { ln(g, `M${x} -3 L${x} -46`, 3, "#55524B"); el("rect", { x: x - 9, y: -52, width: 18, height: 6, rx: 2, fill: "#A1A19B", stroke: INK, "stroke-width": 1.2 }, g); });
    U.shape(C, "rail", rr(-4, -4, w + 8, 8, 3), MAT.grey, { sw: 2.2, r: 0.3 });
    [-7, w + 7].forEach((x) => el("rect", { x: x - 4, y: -6, width: 8, height: 12, rx: 2, fill: "#55524B" }, g));
    for (let i = 0; i < 9; i++) el("circle", { cx: f(2 + i * 13.5), cy: 6, r: 3.4, fill: "#E1E1DC", stroke: INK, "stroke-width": 1.4 }, g);
    return { w };
  };
  D.rail.essais = [{}];
  D.rideau = (g, o = {}) => {
    const w = o.w || 120, h = o.h || 646, yE = Math.round(h * 0.5), C = U.ctx(g, 2113, false, 1), T = 14, NET = 44;
    for (let i = 0; i < 9; i++) ln(g, `M${f(-6 + i * 13.5)} 0 L${f(-4 + i * 13.5)} ${T + 2}`, 1.4, "#55524B");
    // silhouette : droite en haut, resserrée à l'embrasse, évasée en bas
    const body = `M-8 ${T} L${w} ${T} C${w} ${f(yE * 0.6)} ${w - 16} ${f(yE * 0.82)} ${w - 16} ${yE} C${w - 16} ${yE + 70} ${w + 6} ${h - 90} ${w + 8} ${h} L-8 ${h} C-8 ${h - 90} 8 ${yE + 70} 8 ${yE} C8 ${f(yE * 0.82)} -8 ${f(yE * 0.6)} -8 ${T} Z`;
    ombre(g, body, 6, 4);
    U.shape(C, "toile", body, { base: "#ECEDE8", hatch: "#C6C8C0", gap: 8, fw: 0.9 }, { sw: 2.5, r: 0.5 });
    // le filet ajouré du haut (losanges)
    const cg = clipPoly(g, [[-8, T + 2], [w, T + 2], [w, T + NET], [-8, T + NET]]);
    fl(cg, rr(-8, T + 2, w + 8, NET - 2, 0), "#F7F7F3");
    for (let x = -60; x < w + 60; x += 12) ln(cg, `M${x} ${T} L${x + 46} ${T + NET + 2} M${x} ${T + NET + 2} L${x + 46} ${T}`, 1, "#A9ACA3");
    ln(g, `M-8 ${T + NET} L${w} ${T + NET}`, 2, "#55524B"); ln(g, `M-8 ${T + 2} L${w} ${T + 2}`, 2.4, INK);
    // les plis : ils convergent vers l'embrasse puis s'ouvrent
    const X = (i, y) => { const top = -4 + i * (w + 4) / 6, mid = 12 + i * (w - 28) / 6, bot = -6 + i * (w + 14) / 6; return y <= yE ? lerp(top, mid, sstep(0, yE, y)) : lerp(mid, bot, sstep(yE, h, y)); };
    for (let i = 0; i < 6; i++) { if (i % 2) { const A = [], B = []; for (let y = T + NET; y <= h - 14; y += 24) { A.push([X(i, y) + 2, y]); B.push([X(i + 1, y) - 2, y]); }
        fl(g, poly(A.concat(B.reverse())), "#C6C8C0", { opacity: 0.45 }); }
      if (i > 0) { const P = []; for (let y = T + NET; y <= h - 12; y += 30) P.push([X(i, y), y]); ln(g, U.curve(P), 1.6, "#8F928A"); } }
    // l'ourlet et l'embrasse
    ln(g, `M-8 ${h - 14} Q${w / 2} ${h - 10} ${w + 8} ${h - 14}`, 1.6, "#8F928A");
    ombre(g, rr(4, yE - 10, w - 16, 20, 8), 3, 4);
    U.shape(C, "embrasse", rr(4, yE - 10, w - 16, 20, 8), MAT.mid, { sw: 2.2 });
    ln(g, `M4 ${yE} L-14 ${yE - 4}`, 2.6, "#55524B"); el("circle", { cx: -16, cy: yE - 4, r: 4, fill: "#A1A19B", stroke: INK, "stroke-width": 1.4 }, g);
    return { pivot: [0, 0], embrasse: [f(w / 2), yE], bas: [f(w / 2), h] };
  };
  D.rideau.essais = [{}];

  /* E3 — la lampe d'examen sur bras de plafond. Ancrage = platine (box : (470, h 760)) ; tête en (−60, 180) (= (410, h 580)),
   * tournée vers l'oreiller. Parties : "lumiere" (halo + CÔNE jaune 0,13 × lum jusqu'à une tache sur l'oreiller, centre (−110, 520) —
   * À POSER DERRIÈRE les personnages) · "bras" (platine, deux segments, rotule, tête conique, poignée). o.lum 0..1 = LUM(t).
   * Les deux parties dans des nœuds frères qui pendent ensemble (m.pend, pivot (0, 0)). Ancres : tete, spot, faisceau (boîte de
   * la poussière, repère de la platine), pivot. */
  D.lampeExamen = (g, o = {}) => {
    const C = U.ctx(g, 2121, false, 1), lum = clamp(o.lum == null ? 1 : o.lum, 0, 1), H = [-60, 180], S = [-110, 520];
    const d0 = [S[0] - H[0], S[1] - H[1]], L0 = Math.hypot(d0[0], d0[1]), u = [d0[0] / L0, d0[1] / L0], n = [u[1], -u[0]];
    const Pp = (k, m) => [H[0] + u[0] * k + n[0] * m, H[1] + u[1] * k + n[1] * m];
    if (partie(o, "lumiere") && lum > 0.01) {
      fl(g, poly([Pp(24, -27), Pp(24, 27), [S[0] + 128, S[1]], [S[0] - 128, S[1]]]), YEL, { opacity: f(0.13 * lum) });
      fl(g, poly([Pp(24, -14), Pp(24, 14), [S[0] + 62, S[1]], [S[0] - 62, S[1]]]), YEL, { opacity: f(0.08 * lum) });
      el("ellipse", { cx: S[0], cy: S[1], rx: 128, ry: 24, fill: "#FFF6C9", opacity: f(0.45 * lum) }, g);
      el("circle", { cx: f(Pp(26, 0)[0]), cy: f(Pp(26, 0)[1]), r: 50, fill: YEL, opacity: f(0.3 * lum) }, g);
    }
    if (partie(o, "bras")) {
      U.shape(C, "platine", rr(-28, -10, 56, 12, 4), MAT.grey, { sw: 2.2 });
      el("path", { d: "M-12 2 Q0 14 12 2 Z", fill: "#CFCFCA", stroke: INK, "stroke-width": 1.6 }, g);
      U.stroke(C, "tige", "M0 6 L0 66", { sw: 6, r: 0.3 }); ln(g, "M-1 8 L-1 64", 2, "#C9C9C3");
      el("circle", { cx: 0, cy: 68, r: 7, fill: "#E1E1DC", stroke: INK, "stroke-width": 2 }, g);
      U.stroke(C, "bras", "M-2 72 L-46 140", { sw: 6.5, r: 0.3 }); ln(g, "M-3 74 L-44 136", 2, "#C9C9C3");
      el("circle", { cx: -48, cy: 144, r: 7, fill: "#E1E1DC", stroke: INK, "stroke-width": 2 }, g);
      U.stroke(C, "fourche", `M-48 150 L${f(Pp(-12, 0)[0])} ${f(Pp(-12, 0)[1])}`, { sw: 5, r: 0.3 });
      // la tête : cône tronqué, ouverture vers l'oreiller
      const tete = poly([Pp(-16, -13), Pp(-16, 13), Pp(24, 29), Pp(24, -29)]);
      ombre(g, tete, 4, 5);
      U.shape(C, "tete", tete, MAT.grey, { sw: 2.6 });
      el("circle", { cx: f(Pp(-17, 0)[0]), cy: f(Pp(-17, 0)[1]), r: 11, fill: "#CFCFCA", stroke: INK, "stroke-width": 2 }, g);
      const c = Pp(24, 0), a = Math.atan2(n[1], n[0]) * 180 / Math.PI;
      el("ellipse", { cx: f(c[0]), cy: f(c[1]), rx: 29, ry: 8, transform: `rotate(${f(a)} ${f(c[0])} ${f(c[1])})`, fill: lum > 0.2 ? mix("#E1E1DC", "#FFF3C4", lum) : "#E1E1DC", stroke: INK, "stroke-width": 2.2 }, g);
      const p1 = Pp(6, 24), p2 = Pp(-6, 42);
      U.stroke(C, "poignee", `M${pt(p1)} L${pt(p2)}`, { sw: 6, r: 0.3 }); ln(g, `M${pt(p1)} L${pt(p2)}`, 2, "#F4F4EE");
    }
    return { tete: H, spot: S, faisceau: { x: -230, y: 250, w: 240, h: 260 }, pivot: [0, 0] };
  };
  D.lampeExamen.essais = [{}, { lum: 0.45 }, { part: "bras", lum: 0 }];

  /* E4 — le moniteur sur pied à roulettes. Hauteur 292. Ancrage = pied (sol) ; écran 130 × 96 centré en (0, −225).
   * Tracé À L'ENCRE (pas de vert, jamais d'alarme, aucun chiffre) : complexes qui défilent (o.t = phase 0..1, t × 1,2 mod 1,
   * arrondie au 1/30) ; o.plat : ligne plate ; o.ecg = [[x, pic], …] (x de −58 à 58) : complexes donnés (scène muette, comme la
   * ligne de l'écran). Petit cœur dessiné, deuxième courbe grise (pouls), dôme-témoin ÉTEINT. o.cable [dx, dy] : câble qui pend
   * jusqu'au point donné (repère du pied). Parties : "pied" (statique) · "ecran" (redessiné) · "cable". Ancres : ecran, cable, dome. */
  D.scope = (g, o = {}) => {
    const C = U.ctx(g, 2131, false, 1);
    if (partie(o, "cable") && o.cable) { const [x, y] = o.cable, a = [76, -214];
      ln(g, `M${a[0]} ${a[1]} C${f(a[0] + 40)} ${f(a[1] + 70)} ${f(x - 50)} ${f(Math.max(a[1], y) + 60)} ${f(x)} ${f(y)}`, 3, "#3A3A37"); }
    if (partie(o, "pied")) {
      el("ellipse", { cx: 4, cy: 2, rx: 62, ry: 6, fill: OMB }, g);
      ln(g, "M0 -16 L-50 -8 M0 -16 L50 -8 M0 -16 L-24 -6 M0 -16 L24 -6", 6, INK); ln(g, "M0 -16 L-50 -8 M0 -16 L50 -8", 2, "#A1A19B");
      [-50, -24, 24, 50].forEach((x) => { el("circle", { cx: x, cy: -6, r: 6, fill: "#3A3A37", stroke: INK, "stroke-width": 1.4 }, g); el("circle", { cx: x, cy: -6, r: 2, fill: "#E1E1DC" }, g); });
      el("circle", { cx: 0, cy: -17, r: 8, fill: "#CFCFCA", stroke: INK, "stroke-width": 2 }, g);
      U.shape(C, "mat", rr(-5, -172, 10, 156, 3), MAT.grey, { sw: 2.2, r: 0.3 });
      U.shape(C, "panier", rr(-22, -112, 44, 18, 4), MAT.white, { sw: 1.8 }); ln(g, "M-16 -103 L16 -103", 1.2, "#A1A19B");
      ombre(g, rr(-76, -284, 152, 116, 10), 6, 7);
      U.shape(C, "boitier", rr(-76, -284, 152, 116, 10), MAT.white, { sw: 2.6 });
      U.stroke(C, "anse", "M-44 -284 Q-30 -300 -12 -284", { sw: 3.2, r: 0.3 });
      el("path", { d: "M37 -284 L37 -290 A9 9 0 0 1 55 -290 L55 -284 Z", fill: "#D6D6D0", stroke: INK, "stroke-width": 1.8 }, g);   // dôme-témoin, éteint
      [-36, -18, 0, 18].forEach((x) => el("rect", { x: x, y: -176, width: 12, height: 5, rx: 2, fill: "#BDBDB6", stroke: INK, "stroke-width": 1 }, g));
      el("circle", { cx: 56, cy: -174, r: 4, fill: "#E1E1DC", stroke: INK, "stroke-width": 1.2 }, g);
    }
    if (partie(o, "ecran")) {
      fl(g, rr(-65, -273, 130, 96, 5), "#F4F4EE", { stroke: INK, "stroke-width": 2.2 });
      ln(g, "M-58 -205 L58 -205", 1, "#E1E1DC");
      // petit cœur (en haut à gauche) ; aucun chiffre
      ln(g, "M-52 -258 C-56 -264 -62 -258 -52 -250 C-42 -258 -48 -264 -52 -258 Z", 1.6, INK);
      ln(g, "M-38 -258 L-14 -258 M-38 -252 L-24 -252", 2.2, "#C9C9C3");
      const base = -228, ph = ((o.t || 0) % 1 + 1) % 1, sx = 0.36;
      let cs;
      if (o.plat) cs = [];
      else if (o.ecg) cs = o.ecg.map((c) => (Array.isArray(c) ? c : [c, 26]));
      else { cs = []; for (let i = -1; i < 3; i++) cs.push([-58 + (i + ph) * 58, 24]); }
      let d = "", d2 = "";
      for (let x = -58; x <= 58; x += 1) { let y = 0; cs.forEach(([cx, pic]) => { y += ecgY(x - cx, pic, sx); }); d += (x === -58 ? "M" : " L") + x + " " + f(base + y);
        const q = (((x + 58) / 58 - ph * 2) % 1 + 1) % 1; d2 += (x === -58 ? "M" : " L") + x + " " + f(-190 - (o.plat ? 0 : 9 * Math.max(0, Math.sin(q * TAU)) * (1 - q * 0.6))); }
      ln(g, d, 2.6, INK);
      ln(g, d2, 1.8, "#A1A19B");
    }
    return { ecran: [0, -225], cable: [76, -214], dome: [46, -290], haut: -300 };
  };
  D.scope.essais = [{}, { t: 0.5, cable: [270, -40] }, { plat: true }, { ecg: [[-30, 26], [40, 15]] }];

  /* E6 — la planchette à pince avec la feuille de la nuit. 104 × 130 (élargie : « Verdacht » ne tient pas dans 96 ; Kalam 20).
   * Ancrage = haut de l'anneau de la pince (box : accrochée au crochet de la barrière du lit ; pivot de m.pend = (0, 0)).
   * « Verdacht » (Kalam 20, o.mot 0..1 : il s'écrit), « Beobachtung » (Kalam 14, o.mot2), trois lignes grises.
   * Ancres : pivot, mot ([x début, x fin, ligne de base] de « Verdacht » : l'autocollant doit couvrir « Verd »). */
  D.planchette = (g, o = {}) => {
    const C = U.ctx(g, 2141, false, 1), w = 104, h = 130, m1 = o.mot == null ? 1 : o.mot, m2 = o.mot2 == null ? 1 : o.mot2, x0 = -40, yb = 64;
    ombre(g, rr(-w / 2, 12, w, h - 12, 7), 5, 6);
    U.shape(C, "carton", rr(-w / 2, 12, w, h - 12, 7), { base: "#D9D7CE", hatch: "#A3A196", gap: 6, fw: 1 }, { sw: 2.4 });
    U.shape(C, "feuille", rr(-w / 2 + 5, 22, w - 10, h - 30, 2), MAT.white, { sw: 1.8, r: 0.4 });
    fl(g, rr(-42, 34, 44, 5, 2), "#BDBDB6"); fl(g, rr(10, 34, 30, 5, 2), "#D2D2CB");
    ecrit(g, "Verdacht", x0, yb, 20, m1);
    ecrit(g, "Beobachtung", x0, 88, 14, m2);
    [104, 115, 126].forEach((y) => ln(g, `M-42 ${y} L42 ${y}`, 1.3, "#D2D2CB"));
    ln(g, "M-9 13 C-9 -2 9 -2 9 13", 2.6, "#55524B");
    U.shape(C, "pince", "M-24 8 L24 8 L20 26 L-20 26 Z", MAT.grey, { sw: 2.2 });
    el("circle", { cx: 0, cy: 16, r: 3, fill: "#55524B" }, g);
    return { pivot: [0, 0], mot: [x0, f(x0 + larg("Verdacht", 20)), yb], w, h };
  };
  D.planchette.essais = [{}, { mot: 0.5, mot2: 0 }];

  /* E7 — la porte du fond du couloir, à hublot. 100 × 250, plaque 90 × 40 (« CT », Kalam 26) ou 104 × 40 (« Intensiv »,
   * Kalam 22) à 12 px au-dessus. Ancrage = bas, milieu (box : CT (765, h 130), Intensiv (890, h 130)).
   * o.label "CT" | "Intensiv" · o.lum 0..1 : plaque gris foncé à lettres papier (éteinte) → JAUNE à lettres d'encre (allumée),
   * halo ; hublot sombre → clair · o.ouv 0..1 : le battant s'efface vers son gond, intérieur jaune pâle (CT : l'anneau du
   * scanner, deviné), lumière au sol · o.voyant 0/1 : petit voyant au-dessus de la plaque (1 Hz) · o.liser 0..1 : un liseré
   * jaune fait le tour de la plaque (S12). Parties : "porte" · "plaque". Ancres : plaque, hublot, poignee, seuil. */
  D.porteFond = (g, o = {}) => {
    const lab = o.label || "CT", ct = lab === "CT", pw = ct ? 90 : 104, lum = clamp(o.lum || 0, 0, 1), u = clamp(o.ouv || 0, 0, 1), C = U.ctx(g, ct ? 2151 : 2153, false, 1);
    if (partie(o, "porte")) {
      ombre(g, rr(-56, -256, 112, 256, 3), 6, 0);
      U.shape(C, "huisserie", rr(-56, -256, 112, 256, 3), MAT.grey, { sw: 2.4 });
      fl(g, rr(-50, -250, 100, 250, 2), "#FFF3C4");
      if (u > 0.02) { if (ct) { const gi = clipPoly(g, [[-50, -250], [50, -250], [50, 0], [-50, 0]]);   // l'anneau du scanner, deviné au fond
          el("circle", { cx: 18, cy: -128, r: 44, fill: "none", stroke: "#E3D08E", "stroke-width": 12 }, gi); ln(gi, "M-50 -98 L50 -102", 4, "#E3D08E"); }
        fl(g, poly([[-50, 0], [50, 0], [76, 30], [-76, 30]]), YEL, { opacity: f(0.28 * u) }); }
      const bw = 100 * (1 - 0.86 * u), G = el("g", {}, g), CB = U.ctx(G, ct ? 2152 : 2154, false, 1), xr = -50 + bw;
      U.shape(CB, "battant", rr(-50, -250, bw, 250, 2), { base: "#F2F3EF" }, { sw: 2.4 });
      if (bw > 44) {
        const hx = -50 + bw / 2, k = bw / 100;
        U.shape(CB, "plinthe", rr(-46, -44, bw - 8, 36, 3), MAT.grey, { sw: 1.8 });
        el("ellipse", { cx: f(hx), cy: -178, rx: f(20 * k), ry: 20, fill: "#E1E1DC", stroke: INK, "stroke-width": 2.2 }, G);
        el("ellipse", { cx: f(hx), cy: -178, rx: f(14 * k), ry: 14, fill: mix("#5E5E58", "#FFF3C4", Math.max(lum, u)), stroke: INK, "stroke-width": 1.8 }, G);
        if (lum < 0.5 && u < 0.3) ln(G, `M${f(hx - 8 * k)} -184 L${f(hx + 2 * k)} -192 M${f(hx - 9 * k)} -174 L${f(hx + 7 * k)} -188`, 1.6, "#8A8A84");
        U.shape(CB, "poignee", rr(xr - 18, -150, 8, 46, 3), MAT.grey, { sw: 1.8 });
      }
    }
    if (partie(o, "plaque")) {
      const y0 = -302, x0 = -pw / 2;
      if (lum > 0.02) el("ellipse", { cx: 0, cy: y0 + 20, rx: f(pw * 0.9), ry: 38, fill: YEL, opacity: f(0.35 * lum) }, g);
      ombre(g, rr(x0, y0, pw, 40, 7), 4, 5);
      el("path", { d: rr(x0, y0, pw, 40, 7), fill: mix("#55554F", YEL, lum), stroke: INK, "stroke-width": 2.6 }, g);
      tx(g, lab, 0, y0 + (ct ? 30 : 28), ct ? 26 : 22, { fill: lum > 0.5 ? INK : "#F4F4EE" });
      el("rect", { x: pw / 2 - 18, y: y0 - 9, width: 12, height: 7, rx: 2, fill: "#A1A19B", stroke: INK, "stroke-width": 1 }, g);
      el("circle", { cx: pw / 2 - 12, cy: y0 - 5.5, r: 2.4, fill: o.voyant ? "#FFF3C4" : "#77776F" }, g);
      const li = clamp(o.liser || 0, 0, 1);
      if (li > 0.01) { const per = 2 * (pw + 12 + 52); el("path", { d: rr(x0 - 6, y0 - 6, pw + 12, 52, 10), fill: "none", stroke: YEL, "stroke-width": 5, "stroke-linecap": "round", "stroke-dasharray": `${f(per * li)} ${f(per + 10)}` }, g); }
    }
    return { plaque: [0, -282], hublot: [0, -178], poignee: [36, -127], seuil: [0, 0] };
  };
  D.porteFond.essais = [{}, { label: "Intensiv", voyant: 1, liser: 0.6 }, { lum: 0.25 }, { lum: 1, ouv: 0.8 }];

  /* E8 — le boîtier d'alarme au mur : plaque, GROS bouton rond gris cerclé de jaune, petit cœur dessiné (aucun texte), et au-dessus
   * le gyrophare jaune (dôme). Ancrage = centre du bouton (box : (640, h 470)) ; dôme en (0, −50). o.on 0..1 : dôme allumé + halo
   * (le faire clignoter à 3 Hz, + m.rays) ; o.appui 0..1 : le bouton s'enfonce. 44 × 96. */
  D.alarmeMurale = (g, o = {}) => {
    const C = U.ctx(g, 2161, false, 1), on = clamp(o.on || 0, 0, 1), ap = clamp(o.appui || 0, 0, 1);
    if (on > 0.02) { el("circle", { cx: 0, cy: -50, r: 44, fill: YEL, opacity: f(0.32 * on) }, g); el("circle", { cx: 0, cy: -50, r: 24, fill: YEL, opacity: f(0.35 * on) }, g); }
    ln(g, "M0 -34 L0 -26", 4, "#55524B");
    U.shape(C, "socle", rr(-15, -42, 30, 9, 2), MAT.mid, { sw: 1.8 });
    U.shape(C, "dome", "M-12 -41 L-12 -51 A12 12 0 0 1 12 -51 L12 -41 Z", { base: on > 0.4 ? YEL : "#ECE6D0", hatch: on > 0.4 ? null : "#C9C1A2", gap: 4, fw: 0.9 }, { sw: 2.2, r: 0.3 });
    ln(g, "M-6 -50 Q-5 -58 1 -60", 2, "#FFFFFF", { opacity: 0.9 });
    ombre(g, rr(-22, -27, 44, 62, 6), 4, 5);
    U.shape(C, "plaque", rr(-22, -27, 44, 62, 6), MAT.white, { sw: 2.2 });
    el("circle", { cx: 0, cy: 0, r: 15.5, fill: YEL, stroke: INK, "stroke-width": 2 }, g);
    U.shape(C, "bouton", cercle(0, f(1.6 * ap), f(10.5 - ap)), MAT.grey, { sw: 2 });
    ln(g, "M0 26 C-3 21 -9 24 0 31 C9 24 3 21 0 26 Z", 1.5, "#55524B");
    return { bouton: [0, 0], dome: [0, -50] };
  };
  D.alarmeMurale.essais = [{}, { on: 1, appui: 1 }];

  /* E9 — le masque de ventilation, sa valve et le ballon souple. Ancrage = milieu du bord du masque, posé sur le visage (S15 :
   * la bouche du gisant, ancre bouche ; le garçon regarde le plafond, le ballon part vers la droite, vers les mains de DOC).
   * o.masque (défaut true ; false si D.gisant porte déjà son masque : poser alors l'ancrage sur son raccord) ; o.p 0..1 : le ballon
   * se comprime (une pression toutes les 2,5 s). ≈ 130 × 64. Ancres : masque, sac (où presse la main), valve. */
  D.ballon = (g, o = {}) => {
    const C = U.ctx(g, 2171, false, 1), p = clamp(o.p || 0, 0, 1);
    // le ballon : œuf allongé, pincé au milieu quand on presse
    const cx = 64, cy = -46, rx = 36, ry = 18 * (1 - 0.32 * p), pin = 7 * p, pts = [];
    for (let i = 0; i < 16; i++) { const a = (i / 16) * TAU, c = Math.cos(a), s = Math.sin(a), k = 1 - (pin / ry) * Math.pow(Math.max(0, 1 - Math.abs(c) * 1.6), 2);
      pts.push([cx + rx * c * (c > 0 ? 1.06 : 0.94), cy + ry * s * k]); }
    ombre(g, U.blob(pts, 0.9), 4, 5);
    U.shape(C, "sac", U.blob(pts, 0.9), { base: "#ECECE6", hatch: "#B4B4AE", gap: 6, fw: 1 }, { sw: 2.4, r: 0.4 });
    ln(g, `M${cx - 18} ${f(cy - ry * 0.5)} Q${cx} ${f(cy - ry * 0.7 + pin)} ${cx + 18} ${f(cy - ry * 0.5)} M${cx - 14} ${f(cy + ry * 0.45)} Q${cx} ${f(cy + ry * 0.6 - pin)} ${cx + 14} ${f(cy + ry * 0.45)}`, 1.3, "#8A8A84");
    U.shape(C, "bout", rr(cx + rx - 2, cy - 6, 12, 12, 3), MAT.mid, { sw: 1.6 });
    // valve + coude
    U.shape(C, "valve", rr(12, -53, 18, 14, 4), MAT.mid, { sw: 1.8 });
    ln(g, "M0 -28 L0 -44 Q0 -46 4 -46 L14 -46", 9, INK); ln(g, "M0 -28 L0 -44 Q0 -46 4 -46 L14 -46", 5, "#E1E1DC");
    if (o.masque !== false) {
      U.shape(C, "raccord", rr(-6, -34, 12, 10, 2), MAT.grey, { sw: 1.6 });
      fl(g, "M-24 0 C-22 -16 -12 -25 0 -25 C12 -25 22 -16 24 0 Z", "#FFFFFF", { opacity: 0.78, stroke: INK, "stroke-width": 2.2, "stroke-linejoin": "round" });
      ln(g, "M-14 -6 C-12 -15 -6 -19 2 -20", 1.6, "#FFFFFF");
      el("ellipse", { cx: 0, cy: 0, rx: 25, ry: 4, fill: "#D6D6D0", stroke: INK, "stroke-width": 1.8 }, g);
    }
    return { masque: [0, -12], sac: [cx, cy], valve: [21, -46] };
  };
  D.ballon.essais = [{}, { p: 1 }, { masque: false, p: 0.5 }];

  /* E10 (fin) — D.lampeStylo (ancre = la main) : lampe-stylo jaune ; o.vers [dx, dy] = la cible du faisceau (la tempe, les yeux)
   * → le stylo s'oriente et le petit faisceau jaune va de son bout jusqu'à la cible (o.a : angle sans cible, o.L : longueur) ;
   * o.on 0..1. Le bout est à 31 px de la main. Ancre bout.
   * D.montreBroche (ancre chest de PFL, décalée vers son côté) : montre d'infirmière épinglée, barrette + rond jaune, cadran SANS
   * aiguilles (aucune heure lisible) ; 18 × 34. */
  D.lampeStylo = (g, o = {}) => {
    const on = clamp(o.on == null ? 1 : o.on, 0, 1), v = o.vers || null, a = v ? Math.atan2(v[1], v[0]) * 180 / Math.PI : (o.a || 0);
    const L = v ? Math.max(8, Math.hypot(v[0], v[1]) - 31) : (o.L || 40), G = el("g", { transform: `rotate(${f(a)})` }, g);
    if (on > 0.02) { fl(G, `M31 -3 L${f(31 + L)} ${f(-L * 0.22 - 4)} L${f(31 + L)} ${f(L * 0.22 + 4)} L31 3 Z`, YEL, { opacity: f(0.45 * on) });
      el("ellipse", { cx: f(31 + L), cy: 0, rx: 4, ry: f(L * 0.22 + 5), fill: "#FFF6C9", opacity: f(0.85 * on) }, G); }
    fl(G, rr(-24, -5, 50, 10, 4), YEL, { stroke: INK, "stroke-width": 2 });
    fl(G, "M25 -5 L31 -4 L31 4 L25 5 Z", "#E1E1DC", { stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" });
    if (on > 0.5) el("circle", { cx: 31, cy: 0, r: 2.4, fill: "#FFFFFF", stroke: INK, "stroke-width": 0.8 }, G);
    fl(G, rr(-26, -5, 5, 10, 2), "#3A3A37"); ln(G, "M-18 -5 L4 -5 L4 -1", 2, "#3A3A37");
    const ra = rad(a); return { bout: [f(31 * Math.cos(ra)), f(31 * Math.sin(ra))] };
  };
  D.lampeStylo.essais = [{ on: 0 }, { vers: [-22, 38] }, { a: -30, L: 60 }];
  D.montreBroche = (g, o = {}) => {
    el("rect", { x: -8, y: -3, width: 16, height: 5, rx: 2, fill: "#55524B", stroke: INK, "stroke-width": 1 }, g);
    ln(g, "M0 2 L0 9", 1.8, "#55524B");
    el("circle", { cx: 0, cy: 18, r: 9, fill: YEL, stroke: INK, "stroke-width": 1.8 }, g);
    el("circle", { cx: 0, cy: 18, r: 5.6, fill: "#FFFFFF", stroke: INK, "stroke-width": 1 }, g);
    [[0, -4.2], [4.2, 0], [0, 4.2], [-4.2, 0]].forEach(([dx, dy]) => el("circle", { cx: dx, cy: 18 + dy, r: 0.8, fill: INK }, g));
    el("circle", { cx: 0, cy: 18, r: 1.2, fill: INK }, g);
    return { cadran: [0, 18] };
  };

  /* E11 — le contenu des médaillons « feuille » : la page en gros plan (réglure grise, marge, en-tête imprimé illisible) et
   * l'écriture à la main. Ancrage = centre ; la page déborde (260 × 260) : le médaillon la découpe (clip r ≈ 109, tout le texte
   * tient dans ce cercle). o.mode "verdacht" : « Alkohol » (déjà écrit), puis « Verdacht: / Schädel- / verletzung ? » qui
   * s'écrit (o.p1 0..1, Kalam 26 : en Kalam 30 la ligne sortait du rond), puis « CT: — » (o.p2). o.mode "pupillen" : trois
   * lignes d'imprimé « Bewusstsein », « Motorik », « Pupillen: » ; la case des pupilles est VIDE (rien n'y est écrit : on ne
   * sait pas si le contrôle a été fait) et un trait l'entoure (o.cercle 0..1). Les deux premières lignes restent sans
   * réponse lisible (ni cochées ni vides : pointillés pâles). */
  D.feuilleGros = (g, o = {}) => {
    const mode = o.mode || "verdacht", rond = o.rond ? clipRond(g, 109) : null, G0 = g;
    if (rond) g = rond;                                                                    // essai seulement : la page vue dans le rond du médaillon
    const C = U.ctx(g, 2181, false, 1);
    fl(g, rr(-130, -130, 260, 260, 4), "#FFFFFF");
    ln(g, "M-92 -130 L-92 130", 1.4, "#D2D2CB");
    fl(g, rr(-76, -100, 66, 8, 3), "#C4C4BD"); fl(g, rr(2, -100, 44, 8, 3), "#D6D6D0");
    if (mode === "verdacht") {
      [-47, -13, 17, 47, 89].forEach((y) => ln(g, `M-130 ${y} L130 ${y}`, 1.3, "#DADAD4"));
      tx(g, "Alkohol", -74, -52, 28, { anchor: "start" });
      const p1 = o.p1 == null ? 1 : o.p1, L = [["Verdacht:", -18], ["Schädel-", 12], ["verletzung ?", 42]], W = L.map(([s]) => larg(s, 26)), tot = W.reduce((a, b) => a + b, 0);
      let acc = 0; L.forEach(([s, y], i) => { ecrit(g, s, -74, y, 26, clamp((p1 * tot - acc) / W[i], 0, 1)); acc += W[i]; });
      ecrit(g, "CT: —", -52, 84, 28, o.p2 == null ? 1 : o.p2);
    } else {
      const lab = (s, y, w8, col) => tx(g, s, -84, y, 23, { anchor: "start", font: PLEX, weight: w8, fill: col });
      [-44, -6, 52].forEach((y) => ln(g, `M-130 ${y} L130 ${y}`, 1.3, "#E1E1DC"));
      lab("Bewusstsein", -52, 400, "#77776F"); ln(g, `M${f(-84 + larg("Bewusstsein", 23) + 8)} -52 L84 -52`, 2, "#C9C9C3", { "stroke-dasharray": "2 6" });
      lab("Motorik", -14, 400, "#77776F"); ln(g, `M${f(-84 + larg("Motorik", 23) + 8)} -14 L84 -14`, 2, "#C9C9C3", { "stroke-dasharray": "2 6" });
      lab("Pupillen:", 42, 700, INK);
      U.shape(C, "case", rr(36, 16, 46, 32, 3), MAT.white, { sw: 2.2, r: 0.4 });
      const ce = clamp(o.cercle == null ? 1 : o.cercle, 0, 1);
      if (ce > 0.01) { const per = 2 * Math.PI * Math.sqrt((98 * 98 + 28 * 28) / 2) * 1.1;
        el("path", { d: "M-66 12 C-20 2 64 4 94 20 C112 32 98 60 40 64 C-20 68 -94 62 -98 40 C-100 24 -86 16 -62 12", fill: "none", stroke: INK, "stroke-width": 3.4, "stroke-linecap": "round", "stroke-dasharray": `${f(per * ce)} ${f(per + 20)}` }, g); }
    }
    if (rond) el("circle", { cx: 0, cy: 0, r: 109, fill: "none", stroke: INK, "stroke-width": 4 }, G0);
    return { r: 109 };
  };
  D.feuilleGros.essais = [{ rond: true }, { rond: true, p1: 0.45, p2: 0 }, { rond: true, mode: "pupillen" }, { rond: true, mode: "pupillen", cercle: 0.5 }];


  /* ═══════════════════════════════ C. L'HÉLICOPTÈRE ET LA GRANDE HORLOGE (S17, S23) ═══════════════════════════════ */

  /* C4 — l'hélicoptère de secours POSÉ (il ne décolle pas : « alarmiert », laut Presse). Ancrage = milieu des patins, au sol
   * (S17 : (480, 950) ; il occupe x 385–575, y 838–950). Nez à GAUCHE. Cabine arrondie, verrière, croix AU TRAIT (aucune
   * couleur, aucun texte ni logo), capot, poutre de queue, dérive, rotor de queue, deux patins ; posé sur un « H » cerclé vu en
   * perspective. Parties : "corps" (la cabine vibre de 1 px : bouger le nœud) · "pales" (o.rot : 0, 1, 2 = trois états qui
   * tournent, + flou ; null = pales immobiles, vues de profil). Le rotor est à y −112 (S17 : y 838, sous la pastille, ≤ 815). */
  D.helico = (g, o = {}) => {
    const C = U.ctx(g, 2301, false, 1), st = o.rot == null ? null : ((Math.round(o.rot) % 3) + 3) % 3;
    if (partie(o, "corps")) {
      // l'aire d'atterrissage : cercle aplati + « H » en perspective
      el("ellipse", { cx: 0, cy: 2, rx: 96, ry: 15, fill: "#F1F1EC", stroke: INK, "stroke-width": 2.4 }, g);
      el("ellipse", { cx: 0, cy: 2, rx: 82, ry: 11, fill: "none", stroke: "#A1A19B", "stroke-width": 1.4, "stroke-dasharray": "5 5" }, g);
      ln(g, "M-22 4 L-25 15 M20 4 L23 15 M-23 9.5 L21 9.5", 4, "#55524B");
      // patins et jambes
      ln(g, "M-66 -3 L54 -3 Q66 -3 70 -11 M-58 -9 L44 -9", 4, INK); ln(g, "M-60 -9 L44 -9", 1.6, "#A1A19B");
      ln(g, "M-38 -3 L-34 -26 M24 -3 L20 -26 M-30 -9 L-28 -26 M30 -9 L28 -26", 3, INK);
      // la poutre de queue, la dérive, le rotor de queue
      U.shape(C, "poutre", "M20 -78 L88 -70 L88 -62 L22 -50 Z", MAT.white, { sw: 2.4 });
      U.shape(C, "derive", "M80 -68 L90 -104 L98 -104 L96 -64 Z", MAT.grey, { sw: 2.2 });
      el("circle", { cx: 93, cy: -84, r: 3, fill: "#55524B" }, g);
      // la cabine
      const cab = "M-92 -42 C-98 -70 -72 -96 -30 -98 L12 -98 Q24 -98 28 -84 L32 -48 Q32 -28 14 -26 L-70 -26 Q-88 -28 -92 -42 Z";
      ombre(g, cab, 5, 6);
      U.shape(C, "cabine", cab, MAT.white, { sw: 2.8 });
      U.shape(C, "verriere", "M-88 -46 C-92 -68 -72 -88 -46 -90 L-46 -50 Q-60 -44 -88 -46 Z", { base: "#EEF1F0", hatch: "#C4CBCE", gap: 6, fw: 0.8 }, { sw: 2.2 });
      ln(g, "M-76 -58 L-62 -80 M-68 -54 L-56 -72", 1.8, "#FFFFFF");
      U.shape(C, "hublot", rr(-38, -86, 26, 22, 5), { base: "#E4E7E6", hatch: "#B4B9BB", gap: 5, fw: 0.9 }, { sw: 2 });
      ln(g, "M-4 -96 L-4 -30", 1.4, "#77776F"); el("rect", { x: -10, y: -58, width: 4, height: 8, rx: 1, fill: "#55524B" }, g);
      // la croix, AU TRAIT
      fl(g, "M2 -74 L10 -74 L10 -82 L18 -82 L18 -74 L26 -74 L26 -66 L18 -66 L18 -58 L10 -58 L10 -66 L2 -66 Z", "#FFFFFF", { stroke: INK, "stroke-width": 2.2, "stroke-linejoin": "round" });
      // le capot, le mât
      U.shape(C, "capot", "M-46 -98 L-40 -106 L14 -106 L22 -98 Z", MAT.grey, { sw: 2.2 });
      ln(g, "M-12 -106 L-12 -112", 4, INK);
    }
    if (partie(o, "pales")) {
      if (st == null) { ln(g, "M-124 -113 L100 -113", 4, INK); }
      else {
        el("ellipse", { cx: -12, cy: -113, rx: 118, ry: 6, fill: "#77776F", opacity: 0.14 }, g);
        const L = [[-122, 98], [-80, 56], [-40, 20]][st];
        ln(g, `M${L[0]} ${f(-113 + st)} L${L[1]} ${f(-113 - st)}`, 3.4, INK, { opacity: 0.85 });
        ln(g, `M${f(-12 - 30 * Math.cos(st * 2.1))} -113 L${f(-12 + 30 * Math.cos(st * 2.1))} -113`, 2, "#55524B", { opacity: 0.6 });
        ln(g, `M93 ${-84 - 14 + st * 7} L93 ${-84 + 14 - st * 7}`, 2, "#55524B");
      }
      el("circle", { cx: -12, cy: -113, r: 4, fill: INK }, g);
    }
    return { rotor: [-12, -113], patins: [0, 0], haut: -116 };
  };
  D.helico.essais = [{}, { rot: 1 }, { part: "pales", rot: 2 }];

  /* C5 — la grande horloge sans chiffres (S17 r 60, S23 r 105). Ancrage = centre. Boîtier rond hachuré, anneau de suspension,
   * 60 petites graduations et 12 grandes, deux aiguilles, reflet. o.h = heure décimale ; o.secteur = [h0, h1] (part jaune). */
  D.horlogeGrande = (g, o = {}) => {
    const r = o.r || 60, k = r / 60, h = o.h == null ? 6.5 : o.h, sec = o.secteur || null, C = U.ctx(g, 2311, false, 1);
    const P = (ang, d) => [Math.sin(rad(ang)) * d, -Math.cos(rad(ang)) * d];
    ln(g, `M0 ${f(-r - 8 * k)} L0 ${f(-r - 15 * k)}`, f(3 * k), "#55524B");
    el("circle", { cx: 0, cy: f(-r - 20 * k), r: f(6 * k), fill: "none", stroke: INK, "stroke-width": f(2.2 * k) }, g);
    el("circle", { cx: f(7 * k), cy: f(9 * k), r: f(r + 10 * k), fill: OMB }, g);
    U.shape(C, "boitier", cercle(0, 0, r + 10 * k), MAT.grey, { sw: 3.4 * k, r: 0.5 });
    U.shape(C, "cadran", cercle(0, 0, r), MAT.white, { sw: 2.4 * k, r: 0.5 });
    if (sec && sec[1] > sec[0] + 0.01) { const a0 = sec[0] * 30, a1 = Math.min(sec[1] * 30, a0 + 359.9), R = r - 10 * k, p0 = P(a0, R), p1 = P(a1, R);
      fl(g, `M0 0 L${pt(p0)} A${f(R)} ${f(R)} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${pt(p1)} Z`, YEL, { opacity: 0.92 }); ln(g, `M0 0 L${pt(p0)} M0 0 L${pt(p1)}`, f(1.6 * k), "#B98F1E"); }
    for (let i = 0; i < 60; i++) { const big = i % 5 === 0, q = i % 15 === 0, a = P(i * 6, r - (q ? 16 : big ? 12 : 6) * k), b = P(i * 6, r - 3 * k);
      ln(g, `M${pt(a)} L${pt(b)}`, f((q ? 3.6 : big ? 2.6 : 1.1) * k), big ? INK : "#8A8A84"); }
    const ah = ((h % 12) / 12) * 360, am = ((h * 60) % 60) * 6;
    ln(g, `M${pt(P(ah + 180, 7 * k))} L${pt(P(ah, r * 0.52))}`, f(6 * k), INK);
    ln(g, `M${pt(P(am + 180, 10 * k))} L${pt(P(am, r * 0.8))}`, f(3.6 * k), INK);
    el("circle", { cx: 0, cy: 0, r: f(5.5 * k), fill: INK }, g); el("circle", { cx: 0, cy: 0, r: f(2 * k), fill: "#FFFFFF" }, g);
    ln(g, `M${pt(P(-62, r * 0.82))} A${f(r * 0.82)} ${f(r * 0.82)} 0 0 1 ${pt(P(-22, r * 0.82))}`, f(3 * k), "#FFFFFF", { opacity: 0.9 });
    return { r };
  };
  D.horlogeGrande.essais = [{ h: 6.5 }, { h: 8.67 }, { r: 105, h: 3, secteur: [2.85, 3.15] }];

  /* ═══════════════════════════════ F. LA SCÈNE MUETTE (S18) ═══════════════════════════════
   * Un lieu NEUTRE : rien qui dise où l'on est (ni porte étiquetée, ni rideau, ni fenêtre, ni horloge, ni date). */

  /* F1 — la chambre neutre. Ancrage = coin bas gauche du mur, au sol (S18 : (40, h 80)) : mur #F2F0E9 de −680 à 0 (élargi de 60 px
   * de chaque côté), ligne du plafond, plinthe, sol jusqu'à +160 (la ligne penche de 6° : le bas droit du haut descend). Parties :
   * "fond" · "lumiere" (tache de lumière pâle, parallélogramme x 480–720 (écran 520–760), h 250–520 ; o.vie 0..1 : elle pâlit). */
  D.chambreNeutre = (g, o = {}) => {
    const C = U.ctx(g, 2401, false, 1), vie = clamp(o.vie == null ? 1 : o.vie, 0, 1);
    if (partie(o, "fond")) {
      fl(g, "M-60 -680 L1060 -680 L1060 0 L-60 0 Z", "#F2F0E9");
      fl(g, "M-60 -680 L1060 -680 L1060 -598 L-60 -598 Z", "#E8E6DE"); ln(g, "M-60 -598 L1060 -598", 1.8, "#B9B6AC");
      ln(g, "M-60 -590 L1060 -590", 1, "#D9D6CC");
      for (let i = 0; i < 30; i++) ln(g, `M${f(-60 + i * 9)} -598 l${f(-20 - i * 1.5)} ${f(26 + i * 2)}`, 1, "#E2DFD5", { opacity: 0.7 });   // pénombre de l'angle
      for (let i = 0; i < 46; i++) { const x = -40 + 1080 * hsh(i * 3.7 + 2), y = -570 + 540 * hsh(i * 5.1 + 1); ln(g, `M${f(x)} ${f(y)} l6 -2`, 1, "#E1DED4"); }   // grain du crépi
      sol(g, C, -60, 1060, 0, 160, "solN", { base: "#E6E4DC", hatch: "#BDBAB0", gap: 11, fw: 0.9 }, 8);
      U.shape(C, "plinthe", "M-60 -18 L1060 -18 L1060 0 L-60 0 Z", { base: "#E3E0D7" }, { sw: 1.8, r: 0.3 });
    }
    if (partie(o, "lumiere") && vie > 0.01) {
      fl(g, poly([[500, -440], [700, -440], [720, -170], [480, -170]]), "#FFFDF3", { opacity: f(0.75 * vie) });
      fl(g, poly([[522, -418], [680, -418], [696, -192], [504, -192]]), "#FFFFFF", { opacity: f(0.55 * vie) });
    }
    return { sol: 0, tache: [600, -305] };
  };
  D.chambreNeutre.essais = [{}, { part: "lumiere", vie: 0.4 }];

  /* F2 — le lit d'hôpital simple, vu de côté (≠ le brancard des urgences : tête et pied de lit PLEINS, pas de barrière, pas
   * d'oreiller d'examen). Ancrage = sol, milieu (S18 : (470, h 80)) ; x −238…236 ; dessus du matelas à −120 (h 200) ; oreiller
   * x −210…−104 : l'ancrage de D.gisant se pose en (−215, −120). Drap blanc tiré qui retombe sur le côté. Statique. */
  D.litNeutre = (g, o = {}) => {
    const C = U.ctx(g, 2411, false, 1), PAN = { base: "#E9E7DF", hatch: "#B5B2A7", gap: 7, fw: 1 };
    el("ellipse", { cx: 6, cy: 3, rx: 232, ry: 7, fill: OMB }, g);
    [-196, 196].forEach((x, i) => { U.shape(C, "pied" + i, rr(x - 6, -66, 12, 56, 3), MAT.grey, { sw: 2 }); el("circle", { cx: x, cy: -8, r: 8, fill: "#55524B", stroke: INK, "stroke-width": 1.6 }, g); el("circle", { cx: x, cy: -8, r: 2.6, fill: "#E1E1DC" }, g); });
    U.shape(C, "cadre", rr(-226, -80, 452, 14, 4), MAT.grey, { sw: 2.2 });
    U.shape(C, "tete", "M-240 -10 L-240 -192 Q-240 -214 -218 -214 L-214 -214 Q-206 -214 -206 -204 L-206 -10 Z", PAN, { sw: 2.6 });
    ln(g, "M-232 -196 L-232 -22", 1.6, "#FFFFFF");
    U.shape(C, "piedLit", "M206 -10 L206 -150 Q206 -166 222 -166 L226 -166 Q238 -166 238 -152 L238 -10 Z", PAN, { sw: 2.6 });
    U.shape(C, "matelas", rr(-210, -122, 418, 46, 12), MAT.white, { sw: 2.6 });
    // le drap tiré, qui retombe le long du matelas
    U.shape(C, "drap", "M-206 -114 L204 -114 L204 -70 Q160 -62 120 -70 Q70 -60 20 -70 Q-30 -60 -80 -70 Q-130 -60 -206 -70 Z", { base: "#F7F7F3", hatch: "#D6D6D0", gap: 9, fw: 0.9 }, { sw: 2.2, r: 0.4 });
    ln(g, "M-150 -104 q8 16 2 30 M-40 -108 q10 18 4 34 M80 -106 q6 16 0 32", 1.3, "#B9B9B3");
    U.shape(C, "oreiller", "M-210 -120 C-212 -142 -196 -152 -158 -152 C-118 -152 -102 -142 -102 -126 C-102 -120 -108 -118 -114 -120 L-204 -120 Z", MAT.white, { sw: 2.4 });
    ln(g, "M-190 -136 q22 6 50 -2", 1.4, "#B4B4AE");
    return { matelas: -120, gisant: [-215, -120], pied: [222, -166] };
  };
  D.litNeutre.essais = [{}];

  /* F3 — la chaise vide, son sweat à capuche plié sur le dossier (les deux cordons pendent). Ancrage = pieds (S18 : (800, h 80)) ;
   * ≈ 120 × 214 ; chaise de profil, tournée vers le lit (à gauche). Parties : "chaise" (chaise + sweat, statique) · "cordons" (les
   * deux cordons, à balancer : m.sway 2° × VIE, pivot = ancre cordons). */
  D.chaiseSweat = (g, o = {}) => {
    const C = U.ctx(g, 2421, false, 1);
    if (partie(o, "chaise")) {
      el("ellipse", { cx: 0, cy: 2, rx: 66, ry: 6, fill: OMB }, g);
      // les pieds du fond (plus clairs), puis l'assise et les pieds de devant
      ln(g, "M-30 -96 L-34 -2 M46 -96 L48 -2", 6, "#9E9B90"); ln(g, "M-30 -96 L-34 -2 M46 -96 L48 -2", 2.6, "#E9E7DF");
      U.stroke(C, "dossierF", "M50 -100 L62 -208", { sw: 6, r: 0.3 });
      U.shape(C, "assise", "M-50 -108 L44 -108 L50 -96 L-44 -96 Z", BOIS, { sw: 2.4 });
      U.stroke(C, "piedAv", "M-44 -96 L-50 0", { sw: 6, r: 0.3 }); U.stroke(C, "piedAr", "M36 -96 L38 0", { sw: 6, r: 0.3 });
      U.stroke(C, "montant", "M36 -102 L50 -214", { sw: 6.5, r: 0.3 });
      ln(g, "M-46 -60 L36 -60", 3, "#55524B");
      U.shape(C, "barre", "M38 -150 L56 -152 L54 -142 L37 -140 Z", BOIS, { sw: 1.8 });
      // le sweat plié sur le haut du dossier : derrière, un pan et une manche (poignet côtelé) ; devant, un pan et la capuche
      U.shape(C, "panAr", "M52 -216 C64 -216 74 -208 76 -196 L84 -142 C76 -136 64 -136 58 -142 L54 -196 Z", PULL, { sw: 2.2 });
      ln(g, "M59 -150 L83 -150 M60 -146 L84 -146", 1.4, "#55524B");
      membre(C, "manche", [[70, -200], [80, -160], [86, -122]], [22, 20, 18], PULL);
      U.shape(C, "poignet", "M76 -126 L96 -124 L95 -112 L76 -114 Z", { base: "#BDBDB7", hatch: "#77776F", gap: 3.4, fw: 1.1 }, { sw: 1.8 });
      U.shape(C, "pli", "M24 -208 C26 -226 64 -230 74 -212 C76 -204 70 -200 62 -200 L30 -200 Z", PULL, { sw: 2.4 });
      U.shape(C, "panAv", "M26 -206 L60 -206 L58 -146 C48 -140 30 -140 20 -146 Z", PULL, { sw: 2.4 });
      ln(g, "M21 -154 L58 -154 M21 -150 L58 -150", 1.4, "#55524B");
      // la capuche, pendue devant : forme de capuche, bord côtelé de l'ouverture
      U.shape(C, "capuche", "M26 -204 C8 -206 -6 -190 -6 -172 C-6 -154 6 -142 22 -144 C30 -146 34 -152 34 -160 C26 -170 24 -190 26 -204 Z", PULL, { sw: 2.4 });
      ln(g, "M28 -200 C22 -188 22 -170 32 -158", 4, "#EFEFEA"); ln(g, "M28 -200 C22 -188 22 -170 32 -158", 1.6, "#55524B");
      ln(g, "M2 -186 Q-2 -170 6 -156", 1.4, "#55524B");
    }
    if (partie(o, "cordons")) {
      ln(g, "M28 -164 L26 -118 M33 -162 L35 -122", 2.8, "#FFFFFF"); ln(g, "M28 -164 L26 -118 M33 -162 L35 -122", 1.4, "#55524B");
      [[26, -118], [35, -122]].forEach(([x, y]) => el("rect", { x: x - 2.4, y, width: 4.8, height: 9, rx: 1.5, fill: "#55524B" }, g));
    }
    return { cordons: [30, -164] };
  };
  D.chaiseSweat.essais = [{}];

  /* F4 — la veilleuse : petite lampe de chevet murale. Ancrage = fixation au mur (S18 : (330, h 430)). 60 × 50. o.on 0..1 = VIE(t)
   * (le dernier jaune de l'image s'éteint) : halo jaune + flaque de lumière sur le mur. */
  D.veilleuse = (g, o = {}) => {
    const C = U.ctx(g, 2431, false, 1), on = clamp(o.on == null ? 1 : o.on, 0, 1);
    if (on > 0.01) { el("ellipse", { cx: 36, cy: 30, rx: 70, ry: 54, fill: "#FFF6C9", opacity: f(0.55 * on) }, g); el("circle", { cx: 36, cy: 6, r: 30, fill: YEL, opacity: f(0.35 * on) }, g); }
    U.shape(C, "platine", rr(-7, -16, 14, 32, 4), MAT.white, { sw: 2 });
    U.stroke(C, "bras", "M4 0 C16 0 22 -8 30 -12", { sw: 3.4, r: 0.3 });
    U.shape(C, "abat", "M22 -16 L48 -16 L54 4 L16 4 Z", { base: on > 0.3 ? "#FFF3C4" : "#ECEBE4", hatch: "#C9C6B8", gap: 6, fw: 0.9 }, { sw: 2.2 });
    el("ellipse", { cx: 35, cy: 4, rx: 19, ry: 3.5, fill: on > 0.3 ? mix("#E1E1DC", YEL, on) : "#D6D6D0", stroke: INK, "stroke-width": 1.6 }, g);
    return { lampe: [35, 4] };
  };
  D.veilleuse.essais = [{}, { on: 0 }];


  /* ═══════════════════════════════ G. LE TRIBUNAL (S19 à S22) ═══════════════════════════════ */

  /* G1 — le ciel du petit matin. Ancrage = coin haut gauche (S19 : (40, 270)) ; 1000 × 880 (élargi de 60 px de chaque côté).
   * Bandes de hachures horizontales grises qui s'éclaircissent vers le bas, lueur chaude près du soleil, toits lointains très
   * pâles à l'horizon. Parties : "fond" · "soleil" (#FFE08A cerclé d'encre, r 46, en (800, 730) = écran (840, 1000) ; le nœud
   * monte de 40 px + m.rays) · "nuages" (o.i 0, 1, 2 : un seul nuage, pour m.drift ; sans o.i : les trois) · "oiseaux" (o.i 0, 1 ;
   * o.aile 0..1 : battement). Les nuages évitent la pastille, l'étiquette des dates et la mini-carte de S19.
   * Ancres : soleil, nuages, oiseaux. */
  const NUAGES = [[160, 300, 1], [540, 236, 1.25], [930, 420, 0.85]], OISEAUX = [[420, 322], [478, 300]];
  D.aube = (g, o = {}) => {
    const C = U.ctx(g, 2501, false, 1), W = 1060, H = 880;
    if (partie(o, "fond")) {
      fl(g, `M-60 0 L${W} 0 L${W} ${H} L-60 ${H} Z`, "#F7F6F0");
      const id = uid("aube"), pat = el("pattern", { id, width: 12, height: 8, patternUnits: "userSpaceOnUse" }, el("defs", {}, g));
      el("path", { d: "M0 4 L12 4", stroke: "#8A8A84", "stroke-width": 1.3 }, pat);
      [[0, 180, 0.62], [180, 380, 0.42], [380, 580, 0.26], [580, 760, 0.12]].forEach(([a, b, op]) => fl(g, `M-60 ${a} L${W} ${a} L${W} ${b + 1} L-60 ${b + 1} Z`, `url(#${id})`, { opacity: op }));
      el("ellipse", { cx: 800, cy: 730, rx: 340, ry: 190, fill: "#FFE08A", opacity: 0.22 }, g);
      el("ellipse", { cx: 800, cy: 740, rx: 180, ry: 110, fill: "#FFE08A", opacity: 0.22 }, g);
      // toits lointains, très pâles
      const t = [[-60, 846], [20, 846], [20, 818], [70, 796], [120, 818], [120, 846], [180, 846], [180, 826], [260, 826], [260, 846], [600, 846], [600, 812], [640, 790], [690, 812], [690, 846], [760, 846], [760, 824], [830, 824], [830, 806], [846, 806], [846, 824], [980, 824], [980, 846], [W, 846], [W, H], [-60, H]];
      U.shape(C, "toits", poly(t), { base: "#E7E6DF", hatch: "#C9C8BF", gap: 7, fw: 0.9 }, { sw: 1.4, r: 0.4, stroke: "#A9A89F" });
    }
    if (partie(o, "soleil")) {
      el("circle", { cx: 800, cy: 730, r: 62, fill: "#FFE08A", opacity: 0.35 }, g);
      U.shape(C, "soleil", cercle(800, 730, 46), { base: "#FFE08A" }, { sw: 3, r: 0.5 });
      ln(g, "M774 716 A30 30 0 0 1 796 700", 3, "#FFFFFF", { opacity: 0.8 });
    }
    const nuage = (i) => { const [x, y, k] = NUAGES[i], pts = [];
      for (let j = 0; j < 9; j++) { const a = (j / 9) * TAU; pts.push([x + Math.cos(a) * 78 * k, y + Math.sin(a) * 24 * k - (Math.sin(a) < 0 ? 10 * k * Math.abs(Math.cos(a * 1.5)) : 0)]); }
      const d = bosses(pts, 6 * k); ombre(g, d, 4, 5); U.shape(C, "nuage" + i, d, MAT.white, { sw: 2.4, r: 0.6 }); ln(g, `M${f(x - 44 * k)} ${f(y + 8 * k)} q${f(40 * k)} ${f(8 * k)} ${f(84 * k)} 0`, 1.4, "#C9C9C3"); };
    if (partie(o, "nuages")) { if (o.i != null) nuage(o.i); else [0, 1, 2].forEach(nuage); }
    if (partie(o, "oiseaux")) { const a = o.aile || 0, one = (i) => { const [x, y] = OISEAUX[i], k = 8 - 10 * a;
        ln(g, `M${x - 14} ${f(y - k)} Q${x - 6} ${f(y - k * 0.4)} ${x} ${y} Q${x + 6} ${f(y - k * 0.4)} ${x + 14} ${f(y - k)}`, 2.4, INK); };
      if (o.i != null) one(o.i); else [0, 1].forEach(one); }
    return { soleil: [800, 730], nuages: NUAGES.map(([x, y]) => [x, y]), oiseaux: OISEAUX };
  };
  D.aube.essais = [{}, { part: "nuages", i: 1 }, { part: "oiseaux", aile: 1 }];

  /* G2 — le petit tribunal de province (Amtsgericht), vu de la rue. Ancrage = bas, milieu (S19 : (560, 1150)) ; x −230…230,
   * y −556…0, les trois marches débordent devant jusqu'à +30. Deux niveaux (quatre fenêtres à petits carreaux et volets par
   * niveau), chaînes d'angle, avant-corps central à fronton (un œil-de-bœuf, AUCUNE armoirie, aucun drapeau), toit à croupe
   * hachuré avec une lucarne et une cheminée, porte en arc à deux battants, plaque « Amtsgericht » (Kalam 30, x −90…90,
   * y −222…−176), un banc. Parties : "fond" (m.build "growY", pivot (0, 0)) · "lanternes" (deux lanternes de part et d'autre de la
   * porte, o.lum 0..1 : elles s'éteignent avec le lampadaire). Ancres : plaque, porte, marches, lanternes. */
  D.amtsgericht = (g, o = {}) => {
    const C = U.ctx(g, 2511, false, 1), lum = clamp(o.lum == null ? 1 : o.lum, 0, 1), STUC = { base: "#EFECE4", hatch: "#CFCAB9", gap: 12, fw: 0.8 };
    const VOLET = { base: "#D3D3CC", hatch: "#77776F", gap: 4.4, fw: 1.2 }, TUILES = { base: "#6E6E68", hatch: INK, gap: 4.2, fw: 1.3 };
    const fenetre = (x, y, w, h, key) => {
      U.shape(C, key + "vg", rr(x - w / 2 - 22, y, 20, h, 2), VOLET, { sw: 1.8 }); U.shape(C, key + "vd", rr(x + w / 2 + 2, y, 20, h, 2), VOLET, { sw: 1.8 });
      [x - w / 2 - 12, x + w / 2 + 12].forEach((vx) => { for (let yy = y + 8; yy < y + h - 4; yy += 9) ln(g, `M${vx - 7} ${yy} L${vx + 7} ${yy + 2}`, 1, "#55524B"); });
      U.shape(C, key, rr(x - w / 2, y, w, h, 2), { base: "#EEF1F0", hatch: "#C4CBCE", gap: 6, fw: 0.8 }, { sw: 2.2 });
      ln(g, `M${x} ${y} L${x} ${y + h} M${x - w / 2} ${f(y + h / 3)} L${x + w / 2} ${f(y + h / 3)} M${x - w / 2} ${f(y + 2 * h / 3)} L${x + w / 2} ${f(y + 2 * h / 3)}`, 1.8, INK);
      U.shape(C, key + "ap", rr(x - w / 2 - 5, y + h, w + 10, 7, 2), MAT.white, { sw: 1.8 });
      ln(g, `M${x - w / 2 + 5} ${y + 8} L${x - 4} ${y + 22}`, 1.6, "#FFFFFF"); };
    if (partie(o, "fond")) {
      el("ellipse", { cx: 10, cy: 4, rx: 250, ry: 10, fill: OMB }, g);
      // le toit à croupe, la cheminée, la lucarne
      U.shape(C, "cheminee", rr(128, -556, 24, 52, 2), PIERRE, { sw: 2 }); U.shape(C, "chemCap", rr(124, -560, 32, 8, 2), MAT.grey, { sw: 1.8 });
      U.shape(C, "toit", "M-246 -398 L-150 -540 L150 -540 L246 -398 Z", TUILES, { sw: 2.8, r: 0.5 });
      ln(g, "M-150 -540 L150 -540", 4, INK);
      U.shape(C, "lucarne", "M-142 -430 L-142 -462 L-124 -480 L-106 -462 L-106 -430 Z", MAT.white, { sw: 2.2 });
      U.shape(C, "lucarneV", rr(-134, -460, 20, 26, 2), { base: "#EEF1F0", hatch: "#C4CBCE", gap: 5, fw: 0.8 }, { sw: 1.6 });
      // la façade, les chaînes d'angle, la corniche, le socle
      U.shape(C, "facade", "M-230 -404 L230 -404 L230 0 L-230 0 Z", STUC, { sw: 2.6, r: 0.4 });
      [-1, 1].forEach((s) => { for (let i = 0, y = -30; y > -400; y -= 34, i++) { const w = i % 2 ? 22 : 34; U.shape(C, "chaine" + s + i, rr(s < 0 ? -230 : 230 - w, y - 32, w, 32, 1), PIERRE, { sw: 1.4, r: 0.3 }); } });
      U.shape(C, "corniche", rr(-240, -412, 480, 14, 3), MAT.white, { sw: 2.2 });
      U.shape(C, "bandeau", rr(-230, -232, 460, 8, 2), MAT.white, { sw: 1.6 });
      U.shape(C, "socle", "M-232 -30 L232 -30 L232 0 L-232 0 Z", PIERRE, { sw: 2.2 });
      // les fenêtres : quatre par niveau
      [-190, -122, 122, 190].forEach((x, i) => { fenetre(x, -364, 40, 92, "fh" + i); fenetre(x, -190, 40, 116, "fb" + i); });
      // l'avant-corps central, son fronton (œil-de-bœuf, AUCUNE armoirie)
      U.shape(C, "avantCorps", "M-80 -436 L80 -436 L80 0 L-80 0 Z", { base: "#F3F1EA", hatch: "#D2CDBC", gap: 12, fw: 0.8 }, { sw: 2.6, r: 0.4 });
      fl(g, "M80 -436 L88 -430 L88 0 L80 0 Z", "#D6D3C8");
      U.shape(C, "fronton", "M-92 -436 L0 -506 L92 -436 Z", MAT.white, { sw: 2.6 });
      ln(g, "M-74 -442 L0 -496 L74 -442", 1.4, "#A9A69B");
      U.shape(C, "oeil", cercle(0, -464, 13), { base: "#EEF1F0", hatch: "#C4CBCE", gap: 5, fw: 0.8 }, { sw: 2 }); ln(g, "M0 -477 L0 -451 M-13 -464 L13 -464", 1.4, INK);
      fenetre(0, -364, 40, 92, "fc");
      // la plaque « Amtsgericht »
      ombre(g, rr(-90, -222, 180, 46, 6), 4, 5);
      U.shape(C, "plaque", rr(-90, -222, 180, 46, 6), MAT.white, { sw: 2.6, r: 0.4 });
      tx(g, "Amtsgericht", 0, -188, 30);
      // la porte en arc, à deux battants
      U.shape(C, "encadr", "M-50 0 L-50 -118 A50 50 0 0 1 50 -118 L50 0 Z", PIERRE, { sw: 2.4 });
      U.shape(C, "porte", "M-40 0 L-40 -118 A40 40 0 0 1 40 -118 L40 0 Z", BOIS, { sw: 2.4 });
      ln(g, "M0 -158 L0 0", 2.2, INK);
      [[-32, -110, 26, 50], [6, -110, 26, 50], [-32, -52, 26, 42], [6, -52, 26, 42]].forEach(([x, y, w, h], i) => U.shape(C, "pp" + i, rr(x, y, w, h, 2), { base: "#EDEDE7", hatch: "#ABABA4", gap: 6, fw: 1 }, { sw: 1.4, r: 0.3 }));
      ln(g, "M-30 -128 A30 30 0 0 1 30 -128", 1.6, "#77776F");
      [-7, 7].forEach((x) => el("circle", { cx: x, cy: -66, r: 3.2, fill: "#55524B", stroke: INK, "stroke-width": 1 }, g));
      // trois marches qui descendent sur le trottoir
      [[0, 58], [10, 64], [20, 70]].forEach(([y, w], i) => { U.shape(C, "marche" + i, rr(-w, y, 2 * w, 10, 2), PIERRE, { sw: 2 }); });
      // un banc, à droite
      U.shape(C, "bancD", rr(118, -52, 96, 10, 3), BOIS, { sw: 2 }); U.shape(C, "bancA", rr(118, -40, 96, 8, 3), BOIS, { sw: 2 });
      ln(g, "M126 -32 L124 0 M206 -32 L208 0 M128 -52 L126 -40 M204 -52 L206 -40", 3, INK);
    }
    if (partie(o, "lanternes")) [-64, 64].forEach((x, i) => {
      if (lum > 0.02) el("circle", { cx: x, cy: -140, r: 30, fill: YEL, opacity: f(0.4 * lum) }, g);
      ln(g, `M${x} -170 L${x} -164`, 2.4, INK); ln(g, `M${x + (x < 0 ? 8 : -8)} -150 L${x + (x < 0 ? 14 : -14)} -150`, 2.4, INK);
      el("path", { d: `M${x - 8} -164 L${x + 8} -164 L${x + 10} -126 L${x - 10} -126 Z`, fill: lum > 0.3 ? mix("#E1E1DC", "#FFF3C4", lum) : "#E1E1DC", stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, g);
      ln(g, `M${x} -164 L${x} -126 M${x - 9} -145 L${x + 9} -145`, 1.2, "#55524B");
      el("path", { d: `M${x - 11} -164 L${x} -174 L${x + 11} -164 Z`, fill: "#55524B", stroke: INK, "stroke-width": 1.6 }, g); });
    return { plaque: [0, -199], porte: [0, -80], marches: [0, 30], lanternes: [[-64, -145], [64, -145]] };
  };
  D.amtsgericht.essais = [{}, { part: "lanternes", lum: 0 }];

  /* G3 — le grand tilleul (c'est le jour : hachures claires), petites feuilles en cœur, banc circulaire autour du tronc.
   * Hauteur 400. Ancrage = pied (S19 : (190, 1150)). Il se balance en entier (m.sway 1,4°, 3,6 s, pivot = pied). */
  D.tilleul = (g, o = {}) => {
    const H = o.h || 400, k = H / 400, C = U.ctx(g, 2521, false, 1), cy = -270 * k;
    el("ellipse", { cx: 10 * k, cy: 4, rx: 150 * k, ry: 12 * k, fill: OMB }, g);
    // le banc circulaire : moitié arrière (derrière le tronc)
    ln(g, `M${f(-74 * k)} ${f(-58 * k)} Q0 ${f(-74 * k)} ${f(74 * k)} ${f(-58 * k)}`, f(7 * k), INK); ln(g, `M${f(-74 * k)} ${f(-58 * k)} Q0 ${f(-74 * k)} ${f(74 * k)} ${f(-58 * k)}`, f(3 * k), "#E9E9E3");
    U.shape(C, "tronc", `M${f(-24 * k)} 0 Q${f(-14 * k)} ${f(-10 * k)} ${f(-14 * k)} ${f(-50 * k)} L${f(-11 * k)} ${f(-190 * k)} L${f(11 * k)} ${f(-190 * k)} L${f(14 * k)} ${f(-50 * k)} Q${f(14 * k)} ${f(-10 * k)} ${f(24 * k)} 0 Z`, { base: "#E9E9E3", hatch: "#9E9E97", gap: 5, fw: 1 }, { sw: 2.6 });
    ln(g, `M${f(-4 * k)} ${f(-30 * k)} l${f(-2 * k)} ${f(-40 * k)} M${f(6 * k)} ${f(-80 * k)} l${f(1 * k)} ${f(-50 * k)}`, 1.4, "#77776F");
    U.shape(C, "br1", `M${f(-6 * k)} ${f(-150 * k)} L${f(-60 * k)} ${f(-210 * k)} L${f(-52 * k)} ${f(-216 * k)} L${f(-1 * k)} ${f(-168 * k)} Z`, { base: "#E9E9E3" }, { sw: 2 });
    U.shape(C, "br2", `M${f(5 * k)} ${f(-162 * k)} L${f(58 * k)} ${f(-222 * k)} L${f(64 * k)} ${f(-214 * k)} L${f(9 * k)} ${f(-146 * k)} Z`, { base: "#E9E9E3" }, { sw: 2 });
    // le houppier rond, bosselé, clair
    const pts = []; for (let i = 0; i < 24; i++) { const a = (i / 24) * TAU, r = 1 + 0.16 * (hsh(i * 3.3) - 0.5) + 0.06 * Math.cos(3 * a); pts.push([f(Math.cos(a) * 142 * k * r), f(cy + Math.sin(a) * 128 * k * r)]); }
    U.shape(C, "houppier", bosses(pts, 7 * k), { base: "#F0F0EA", hatch: "#ABACA2", gap: 6.5, fw: 1 }, { sw: 2.6, r: 0.7 });
    [[-60, -40, 50], [40, -60, 44], [70, 30, 40], [-40, 50, 42], [10, 0, 34]].forEach(([dx, dy, r], i) => { const q = []; for (let j = 0; j < 8; j++) { const a = (j / 8) * TAU; q.push([f(dx * k + Math.cos(a) * r * k), f(cy + dy * k + Math.sin(a) * r * 0.8 * k)]); }
      ln(g, bosses(q, 3.5 * k), 1.4, "#9E9F95"); });
    for (let i = 0; i < 26; i++) { const a = hsh(i * 5.3) * TAU, r = 118 * k * Math.sqrt(hsh(i * 2.9 + 1)), x = Math.cos(a) * r, y = cy + Math.sin(a) * r * 0.9;   // petites feuilles en cœur
      ln(g, `M${f(x)} ${f(y + 3)} C${f(x - 5)} ${f(y - 1)} ${f(x - 3)} ${f(y - 6)} ${f(x)} ${f(y - 3)} C${f(x + 3)} ${f(y - 6)} ${f(x + 5)} ${f(y - 1)} ${f(x)} ${f(y + 3)} Z`, 1.2, "#77776F"); }
    // le banc circulaire : moitié avant (assise + pieds)
    U.shape(C, "banc", `M${f(-84 * k)} ${f(-44 * k)} Q0 ${f(-22 * k)} ${f(84 * k)} ${f(-44 * k)} L${f(84 * k)} ${f(-34 * k)} Q0 ${f(-10 * k)} ${f(-84 * k)} ${f(-34 * k)} Z`, BOIS, { sw: 2.4 });
    [-70, -26, 26, 70].forEach((x) => ln(g, `M${f(x * k)} ${f((-30 + Math.abs(x) * -0.12) * k)} L${f(x * k)} 0`, f(3.4 * k), INK));
    return { h: H, cime: [0, f(cy)] };
  };
  D.tilleul.essais = [{}];

  /* G4 — la rue du tribunal. Ancrage = coin haut gauche (S19 : (40, 1150)) ; x −60…1060 : trottoir du fond 0…60 (dalles),
   * bordure, chaussée 68…180 (tirets, plaque d'égout), bordure, trottoir avant 190…320 (grandes dalles, deux bornes en x 100 et
   * 830 = écran 140 et 870 : hors de la colonne des boutons). Statique. */
  D.rue = (g, o = {}) => {
    const C = U.ctx(g, 2531, false, 1), W = 1060;
    U.shape(C, "trottoirF", `M-60 0 L${W} 0 L${W} 60 L-60 60 Z`, { base: "#E9E8E1", hatch: "#C4C3BA", gap: 10, fw: 0.9 }, { sw: 1.6, r: 0.4 });
    ln(g, `M-60 30 L${W} 30`, 1.2, "#B9B8AF"); for (let x = -40; x < W; x += 70) ln(g, `M${x} 0 L${x - 2} 30 M${x + 35} 30 L${x + 33} 60`, 1.2, "#B9B8AF");
    U.shape(C, "bordureF", rr(-60, 58, W + 60, 10, 2), MAT.white, { sw: 1.8, r: 0.3 });
    U.shape(C, "chaussee", `M-60 68 L${W} 68 L${W} 180 L-60 180 Z`, { base: "#DEDDD6", hatch: "#ABABA4", gap: 7, fw: 1 }, { sw: 1.6, r: 0.4 });
    for (let x = -30; x < W; x += 120) U.shape(C, "tiret" + x, rr(x, 120, 56, 7, 2), MAT.white, { sw: 1.3, r: 0.3 });
    el("ellipse", { cx: 640, cy: 156, rx: 36, ry: 9, fill: "#A9A9A2", stroke: INK, "stroke-width": 2 }, g);
    ln(g, "M616 152 L664 152 M612 157 L668 157 M618 162 L662 162", 1.2, "#55524B");
    ln(g, `M-60 172 L${W} 172`, 1.4, "#9E9D95");   // caniveau
    U.shape(C, "bordureA", rr(-60, 180, W + 60, 12, 2), MAT.white, { sw: 2, r: 0.3 });
    U.shape(C, "trottoirA", `M-60 192 L${W} 192 L${W} 320 L-60 320 Z`, { base: "#EBEAE3", hatch: "#C9C8BF", gap: 11, fw: 0.9 }, { sw: 1.6, r: 0.4 });
    ln(g, `M-60 248 L${W} 248`, 1.4, "#B9B8AF"); for (let x = -20; x < W; x += 140) ln(g, `M${x} 192 L${x - 10} 248 M${x + 70} 248 L${x + 56} 320`, 1.4, "#B9B8AF");
    [100, 830].forEach((x, i) => { ombre(g, rr(x - 10, 236, 20, 64, 8), 4, 3); U.shape(C, "borne" + i, rr(x - 10, 236, 20, 64, 8), MAT.white, { sw: 2.2 }); fl(g, rr(x - 10, 252, 20, 8, 1), "#A9A9A2"); });
    return { trottoir: 55, chaussee: [68, 180] };
  };
  D.rue.essais = [{}];

  /* G5 — le hall du tribunal. Ancrage = coin haut gauche (S20 : (40, 270)) ; mur #EFEFEA jusqu'à 1030 (écran 1300), lambris de
   * planches dès 630 (écran 900), plinthe, sol en damier en perspective 1030…1210. Tableau d'affichage en liège x 90–290,
   * y 330–570 = écran 600–840 (40 px plus bas que le storyboard : l'étiquette « § 411 » fait 3 lignes, y 430–580 ; quatre feuilles
   * punaisées, AUCUN texte lisible), banc d'attente x 80–300, y 910–1030. Parties : "fond" · "globe"
   * (o.i 0 ou 1 : un globe suspendu, x 260 et 720, fil de −14 à 78, globe centré à 104 r 26 ; m.pend, pivot = ancre globes[i]) ·
   * "coin" (le coin d'une feuille qui bat : m.sway 6°, 1,2 s, pivot = ancre coin). Ancres : globes, coin, tableau, banc. */
  D.hall = (g, o = {}) => {
    const C = U.ctx(g, 2541, false, 1), W = 1060;
    if (partie(o, "fond")) {
      fl(g, `M-60 -20 L${W} -20 L${W} 1030 L-60 1030 Z`, "#EFEFEA");
      U.shape(C, "corniche", `M-60 -20 L${W} -20 L${W} 8 L-60 8 Z`, MAT.white, { sw: 2, r: 0.3 }); ln(g, `M-60 14 L${W} 14`, 1.2, "#C9C9C1");
      U.shape(C, "lambris", `M-60 630 L${W} 630 L${W} 1018 L-60 1018 Z`, BOIS, { sw: 2.2, r: 0.4 });
      for (let x = -40; x < W; x += 46) ln(g, `M${x} 642 L${x} 1016`, 1.4, "#9E9B90");
      U.shape(C, "cimaise", rr(-60, 622, W + 60, 16, 3), MAT.white, { sw: 2.2, r: 0.3 });
      fl(g, `M-60 1018 L${W} 1018 L${W} 1030 L-60 1030 Z`, "#C9C6BB"); ln(g, `M-60 1018 L${W} 1018`, 1.6, INK);
      // le damier en perspective
      const rows = [1030, 1062, 1100, 1146, 1210], X = (x, y) => 500 + (x - 500) * (1 + 0.32 * (y - 1030) / 180);
      for (let r = 0; r < 4; r++) for (let c = 0, x = -60; x < W; x += 80, c++) { const y0 = rows[r], y1 = rows[r + 1], q = poly([[X(x, y0), y0], [X(x + 80, y0), y0], [X(x + 80, y1), y1], [X(x, y1), y1]]);
        fl(g, q, (r + c) % 2 ? "#D2D2CB" : "#F3F3EE"); if ((r + c) % 2) for (let k2 = 0; k2 < 3; k2++) ln(g, `M${f(X(x + 14 + k2 * 22, y0 + 4))} ${y0 + 4} l-10 ${f(y1 - y0 - 8)}`, 1, "#A9A9A2"); }
      for (let r = 0; r < 5; r++) ln(g, `M-60 ${rows[r]} L${W} ${rows[r]}`, 1.4, "#8A8A84");
      for (let x = -60; x <= W; x += 80) ln(g, `M${x} 1030 L${f(X(x, 1210))} 1210`, 1.4, "#8A8A84");
      // le tableau d'affichage en liège, quatre feuilles punaisées (aucun texte lisible)
      ombre(g, rr(90, 330, 200, 240, 6), 6, 8);
      U.shape(C, "cadreT", rr(90, 330, 200, 240, 6), BOIS, { sw: 2.6 });
      U.shape(C, "liege", rr(102, 342, 176, 216, 3), LIEGE, { sw: 1.8, r: 0.4 });
      [[114, 356, 70, 92, -4], [196, 352, 68, 84, 3], [118, 458, 74, 88, 2], [202, 450, 62, 90, -3]].forEach(([x, y, w, h, a], i) => {
        const G = el("g", { transform: `rotate(${a} ${x + w / 2} ${y})` }, g);
        fl(G, rr(x, y, w, h, 1), "#FFFFFF", { stroke: INK, "stroke-width": 1.6 });
        fl(G, rr(x + 8, y + 12, w - 16, 6, 2), "#BDBDB6"); for (let yy = y + 28; yy < y + h - 8; yy += 9) ln(G, `M${x + 8} ${yy} L${f(x + w - 10 - 12 * hsh(yy + i))} ${yy}`, 1.6, "#D2D2CB");
        el("circle", { cx: x + w / 2, cy: y + 4, r: 4, fill: i % 2 ? INK : "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, G); });
      // le banc d'attente
      U.shape(C, "dossierB", rr(80, 914, 220, 40, 6), BOIS, { sw: 2.2 }); ln(g, "M88 934 L292 934", 1.2, "#9E9B90");
      U.shape(C, "assiseB", rr(74, 966, 232, 14, 4), BOIS, { sw: 2.4 });
      ln(g, "M92 980 L88 1030 M288 980 L292 1030 M100 954 L100 966 M280 954 L280 966", 4, INK);
    }
    if (partie(o, "globe")) { const x = [260, 720][o.i || 0];
      ln(g, `M${x} -14 L${x} 80`, 2, "#55524B");
      U.shape(C, "capG" + x, "M" + (x - 9) + " 80 L" + (x + 9) + " 80 L" + (x + 7) + " 70 L" + (x - 7) + " 70 Z", MAT.grey, { sw: 1.6 });
      el("circle", { cx: x, cy: 104, r: 34, fill: "#FFF6C9", opacity: 0.45 }, g);
      U.shape(C, "globe" + x, cercle(x, 104, 26), { base: "#FBFBF6", hatch: "#E1E1DA", gap: 7, fw: 0.8 }, { sw: 2.4, r: 0.5 });
      ln(g, `M${x - 14} 96 A16 16 0 0 1 ${x - 2} 84`, 2.2, "#FFFFFF"); }
    if (partie(o, "coin")) { fl(g, "M262 538 L264 564 L238 560 Z", "#FFFFFF", { stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }); ln(g, "M258 544 L246 554", 1.2, "#D2D2CB"); }
    return { globes: [[260, -14], [720, -14]], coin: [262, 538], tableau: [190, 450], banc: [190, 966] };
  };
  D.hall.essais = [{}, { part: "globe", i: 1 }];

  /* G6 — la double porte de la salle d'audience. Ancrage = bas, milieu (S20 : (710, 1300)) ; 300 × 740 (x −150…150, y −740…0),
   * corniche −756…−740, plaque « Sitzungssaal » (Kalam 28) x −90…90, y −800…−755. Encadrement mouluré, deux vantaux à panneaux,
   * poignées en laiton (jaune) près du milieu à y −350. Parties : "fond" (encadrement, corniche, intérieur jaune pâle) ·
   * "vantaux" (o.ouv 0..1 : chaque vantail se referme sur son gond, largeur × 1 → 0,25, en perspective) · "plaque" (o.flash 0..1 :
   * elle clignote une fois) · "lumiere" (o.ouv : trapèze de lumière au sol, devant). Ancres : plaque, poignee, interieur, seuil. */
  D.porteSalle = (g, o = {}) => {
    const C = U.ctx(g, 2551, false, 1), u = clamp(o.ouv || 0, 0, 1), fla = clamp(o.flash || 0, 0, 1);
    if (partie(o, "lumiere") && u > 0.01) { fl(g, poly([[-132, 0], [132, 0], [230, 170], [-230, 170]]), YEL, { opacity: f(0.22 * u) }); fl(g, poly([[-90, 0], [90, 0], [140, 170], [-140, 170]]), "#FFF6C9", { opacity: f(0.4 * u) }); }
    if (partie(o, "fond")) {
      ombre(g, rr(-150, -740, 300, 740, 4), 8, 0);
      U.shape(C, "chambranle", rr(-150, -740, 300, 740, 4), BOIS, { sw: 2.8 });
      ln(g, "M-140 0 L-140 -730 L140 -730 L140 0", 2, "#9E9B90");
      U.shape(C, "corniche", rr(-166, -760, 332, 22, 3), MAT.white, { sw: 2.4 });
      ln(g, "M-158 -744 L158 -744", 1.4, "#A9A9A2");
      fl(g, rr(-132, -722, 264, 722, 2), "#FFF3C4");
      ln(g, "M-132 -380 L132 -380", 1.4, "#E3D08E"); ln(g, "M-60 -722 L-60 -600 M60 -722 L60 -600", 1.2, "#E3D08E");
    }
    if (partie(o, "vantaux")) {
      const w = 132 * (1 - 0.75 * u), dy = 26 * u, G = el("g", {}, g), CV = U.ctx(G, 2553, false, 1);
      [-1, 1].forEach((s) => { const xh = s * 132, xf = xh - s * w, q = poly([[xh, -722], [xf, -722 + dy], [xf, -dy * 0.4], [xh, 0]]);
        U.shape(CV, "vantail" + s, q, { base: "#E4E1D6", hatch: "#A3A094", gap: 7, fw: 1 }, { sw: 2.6 });
        if (w > 50) {
          [[0.14, 0.86, -696, -420], [0.14, 0.86, -330, -40]].forEach(([a, b, y0, y1], i) => { const pp = poly([[lerp(xh, xf, a), y0 + dy * a * 0.9], [lerp(xh, xf, b), y0 + dy * b * 0.9], [lerp(xh, xf, b), y1 - dy * b * 0.4], [lerp(xh, xf, a), y1 - dy * a * 0.4]]);
            U.shape(CV, "pan" + s + i, pp, { base: "#EDEBE3", hatch: "#B5B2A7", gap: 8, fw: 1 }, { sw: 1.8, r: 0.4 }); });
          const hx = lerp(xh, xf, 0.9), hy = -350 + dy * 0.6;
          el("rect", { x: f(hx - 4), y: f(hy - 26), width: 8, height: 52, rx: 3, fill: YEL, stroke: INK, "stroke-width": 2 }, G);
          ln(G, `M${f(hx - s * 2)} ${f(hy - 6)} L${f(hx - s * 22)} ${f(hy - 6)}`, 5, INK); ln(G, `M${f(hx - s * 2)} ${f(hy - 6)} L${f(hx - s * 20)} ${f(hy - 6)}`, 2.4, YEL); } });
    }
    if (partie(o, "plaque")) {
      if (fla > 0.02) el("ellipse", { cx: 0, cy: -777, rx: 130, ry: 44, fill: YEL, opacity: f(0.35 * fla) }, g);
      ombre(g, rr(-90, -800, 180, 45, 8), 5, 6);
      el("path", { d: rr(-90, -800, 180, 45, 8), fill: mix("#FFFFFF", YEL, fla), stroke: INK, "stroke-width": 2.6 }, g);
      tx(g, "Sitzungssaal", 0, -768, 28);
      [-80, 80].forEach((x) => el("circle", { cx: x, cy: -777, r: 2.6, fill: "#55524B" }, g));
    }
    return { plaque: [0, -777], poignee: [2, -350], interieur: [0, -380], seuil: [0, 0] };
  };
  D.porteSalle.essais = [{}, { ouv: 0.5, flash: 1 }, { ouv: 1 }];

  /* G7 — le montant qui se délave : « 41.250 € » (Kalam 30, comme sur la lettre `petit`), redessiné à part, à l'encre. Ancrage =
   * centre du montant (S20 : (470, 1085), sur D.lettre `petit`, `montant: false`). o.delave 0..1 : les chiffres pâlissent du noir
   * au gris très clair, de gauche à droite, puis il ne reste qu'un fantôme en pointillé ; o.gouttes 0..1 (défaut = delave) : trois
   * gouttes se détachent, coulent sur la lettre jusqu'à son bord (o.bord, 70), tombent au sol (o.sol, 215) et y sèchent (petites
   * taches qui pâlissent). Ni étiquette de prix ni ficelle (AKTE 08) : c'est l'encre. */
  D.encreMontant = (g, o = {}) => {
    const s = o.texte || "41.250 €", size = o.size || 30, dv = clamp(o.delave || 0, 0, 1), gt = clamp(o.gouttes == null ? dv : o.gouttes, 0, 1);
    const bord = o.bord == null ? 70 : o.bord, solY = o.sol == null ? 215 : o.sol, w = larg(s, size), x0 = -w / 2, yb = f(size * 0.36);
    const id = uid("delave"), lg = el("linearGradient", { id, x1: f(x0), y1: 0, x2: f(x0 + w), y2: 0, gradientUnits: "userSpaceOnUse" }, el("defs", {}, g)), e = dv * 1.3 - 0.15, CL = "#D9D9D3";
    [[0, CL], [clamp(e - 0.12, 0, 1), CL], [clamp(e + 0.12, 0, 1), INK], [1, INK]].forEach(([of, c]) => el("stop", { offset: f(of), "stop-color": c }, lg));
    const T = tx(g, s, 0, yb, size, { fill: dv > 0.001 ? `url(#${id})` : INK });
    if (dv > 0.7) { const G = tx(g, s, 0, yb, size, { fill: "none", op: f((dv - 0.7) / 0.3) }); G.setAttribute("stroke", "#77776F"); G.setAttribute("stroke-width", "1.2"); G.setAttribute("stroke-dasharray", "2 3"); }
    // trois gouttes : elles coulent, tombent, sèchent
    [0.22, 0.52, 0.8].forEach((fx, i) => { const q = clamp((gt - 0.12 * i) / 0.64, 0, 1); if (q <= 0) return;
      const x = f(x0 + w * fx + (i - 1) * 2), y1 = yb + 6;
      if (q < 0.45) { const y = lerp(y1, bord, q / 0.45); ln(g, `M${x} ${y1} L${x} ${f(y)}`, 2.6, INK, { opacity: 0.8 }); el("ellipse", { cx: x, cy: f(y + 3), rx: 3.4, ry: 4.4, fill: INK }, g); }
      else { ln(g, `M${x} ${y1} L${x} ${bord}`, 1.6, "#8A8A84", { opacity: 0.7 });
        if (q < 0.8) { const y = lerp(bord, solY, Math.pow((q - 0.45) / 0.35, 2)); el("ellipse", { cx: x, cy: f(y), rx: 3.6, ry: 5, fill: INK }, g); }
        else { const dry = (q - 0.8) / 0.2; el("ellipse", { cx: x, cy: solY, rx: f(6 + 2 * dry), ry: 2.6, fill: INK, opacity: f(1 - 0.55 * dry) }, g); } } });
    return { w: f(w), sol: solY, bord };
  };
  D.encreMontant.essais = [{}, { delave: 0.5 }, { delave: 1, gouttes: 0.55 }, { delave: 1, gouttes: 1 }];


  /* G8 — la salle d'audience. Ancrage = coin haut gauche (S21–S24 : (40, 270)) ; x −60…1060. Trois cadrages du même mur :
   * o.plan "fond" (S21) : corniche, mur, deux hautes fenêtres à petits carreaux x 90–230 et 770–910, y 60–370 (écran 130–270 et
   *   810–950, y 330–640), boiserie derrière l'estrade (x 290–710) et le haut dossier du fauteuil de la juge, lambris à panneaux
   *   dès 490 (écran 760), parquet dès 740 (écran 1010). Parties : "fond" · "rayons" (o.dx : glissement 0 → 10 en 6 s) · "estrade"
   *   (estrade x 290–710, y 730–790 ; pupitre x 320–680, dessus à 630 ; lampe (370, 580–630), micro (560, 600), dossier ouvert —
   *   DEVANT la juge) · "tables" (table du procureur x 80–270 avec sa pile de dossiers, table de la défense x 650–860 ; dessus à 730,
   *   façades jusqu'à 825 — DEVANT les personnages assis derrière) · "barriere" (balustres x 70–860, y 860–920, ouverte au milieu
   *   x 405–495 — DEVANT les tables, DERRIÈRE les parents) · "halo" (la lampe du pupitre).
   * o.plan "experts" (S22) : le même mur plus près : fenêtres x 20–200 et 800–980, y 40–470 ; lambris dès 630 (écran 900) ; sol dès
   *   1030 (écran 1300) ; l'estrade VIDE en marche basse x 180–820, y 970–1030 (on la voit autour du pied du négatoscope).
   * o.plan "nu" (S23, S24) : mur, corniche, lambris dès 630, sol dès 1030 ; aucun meuble, rien au mur (S23 y pose l'horloge et la
   *   plaque « CT ») ; "rayons" = une tache de lumière sur le mur.
   * Ancres : sol (y du sol), pupitre, lampe, micro, poussiere (boîtes de m.dust des rayons). */
  D.salle = (g, o = {}) => {
    const plan = o.plan || "fond", C = U.ctx(g, plan === "fond" ? 2561 : plan === "experts" ? 2562 : 2563, false, 1), W = 1060, dx = o.dx || 0;
    const yL = plan === "fond" ? 490 : 630, yS = plan === "fond" ? 740 : 1030;
    const FEN = plan === "fond" ? [[90, 230, 60, 370], [770, 910, 60, 370]] : plan === "experts" ? [[20, 200, 40, 470], [800, 980, 40, 470]] : [];
    const PANNEAU = { base: "#EFEFE9", hatch: "#BDBDB5", gap: 9, fw: 1 };
    const fenetre = ([x0, x1, y0, y1], i) => { const w = x1 - x0, R = w / 2, ya = y0 + R;
      const d = `M${x0} ${y1} L${x0} ${ya} A${R} ${R} 0 0 1 ${x1} ${ya} L${x1} ${y1} Z`;
      ombre(g, d, 6, 6); U.shape(C, "fenetre" + i, d, MAT.white, { sw: 2.8 });
      const di = `M${x0 + 10} ${y1 - 8} L${x0 + 10} ${ya} A${R - 10} ${R - 10} 0 0 1 ${x1 - 10} ${ya} L${x1 - 10} ${y1 - 8} Z`;
      U.shape(C, "vitre" + i, di, { base: "#F4F6F5", hatch: "#D6DCDC", gap: 8, fw: 0.8 }, { sw: 2 });
      const cols = 3, rows = Math.round((y1 - ya) / 46);
      for (let c = 1; c < cols; c++) { const x = x0 + 10 + (w - 20) * c / cols; ln(g, `M${f(x)} ${f(y0 + 10 + (R - 10) * (1 - Math.sqrt(1 - Math.pow((x - x0 - R) / (R - 10), 2))))} L${f(x)} ${y1 - 8}`, 2, INK); }
      for (let r = 0; r < rows; r++) { const y = ya + (y1 - 8 - ya) * r / rows; ln(g, `M${x0 + 10} ${f(y)} L${x1 - 10} ${f(y)}`, 2, INK); }
      ln(g, `M${x0 + 22} ${y1 - 30} L${x0 + 56} ${y1 - 90} M${x0 + 30} ${y1 - 16} L${x0 + 76} ${y1 - 96}`, 2, "#FFFFFF");
      U.shape(C, "appui" + i, rr(x0 - 10, y1, w + 20, 12, 3), MAT.white, { sw: 2.2 }); };
    if (partie(o, "fond")) {
      fl(g, `M-60 -30 L${W} -30 L${W} ${yS} L-60 ${yS} Z`, "#EFEFEA");
      for (let x = 40; x < W; x += 160) ln(g, `M${x} 24 L${x} ${yL - 8}`, 1, "#DEDED7");
      U.shape(C, "corniche", `M-60 -30 L${W} -30 L${W} 10 L-60 10 Z`, MAT.white, { sw: 2.2, r: 0.3 }); ln(g, `M-60 18 L${W} 18 M-60 24 L${W} 24`, 1.3, "#C9C9C1");
      FEN.forEach(fenetre);
      if (plan === "fond") {   // boiserie derrière l'estrade + haut dossier du fauteuil de la juge
        U.shape(C, "boiserie", rr(290, 250, 420, 480, 4), BOIS, { sw: 2.4 });
        [[306, 266, 120, 200], [440, 266, 120, 200], [574, 266, 120, 200]].forEach(([x, y, w, h], i) => { U.shape(C, "bp" + i, rr(x, y, w, h, 3), PANNEAU, { sw: 1.8, r: 0.5 }); ln(g, `M${x + 6} ${y + h - 6} L${x + 6} ${y + 6} L${x + w - 6} ${y + 6}`, 1.4, "#FFFFFF"); });
        U.shape(C, "fauteuil", rr(436, 470, 128, 170, 26), MAT.robe || SOMBRE, { sw: 2.6 });
        U.shape(C, "garniture", rr(452, 488, 96, 136, 18), MAT.mid, { sw: 1.8 });
      }
      U.shape(C, "lambris", `M-60 ${yL} L${W} ${yL} L${W} ${yS} L-60 ${yS} Z`, BOIS, { sw: 2.2, r: 0.4 });
      for (let x = -60, i = 0; x < W; x += 130, i++) { U.shape(C, "pann" + i, rr(x + 14, yL + 24, 102, yS - yL - 44, 3), PANNEAU, { sw: 1.8, r: 0.5 }); ln(g, `M${x + 20} ${yS - 26} L${x + 20} ${yL + 30} L${x + 110} ${yL + 30}`, 1.4, "#FFFFFF"); }
      U.shape(C, "lisse", rr(-60, yL - 6, W + 60, 14, 3), MAT.white, { sw: 2.2, r: 0.3 });
      sol(g, C, -60, W, yS, 1210, "parquetSalle", { base: "#E5E2D8", hatch: "#ABA89E", gap: 8, fw: 1 }, 10);
      if (plan === "experts") { ombre(g, rr(180, 970, 640, 60, 3), 6, 0); U.shape(C, "estradeVide", rr(180, 970, 640, 60, 3), BOIS, { sw: 2.6 }); ln(g, "M184 978 L816 978", 1.6, "#FFFFFF"); }
    }
    if (partie(o, "rayons")) {
      const P = (pts) => poly(pts.map(([x, y]) => [x + dx, y]));
      if (plan === "fond") { fl(g, P([[96, 66], [224, 66], [420, 800], [292, 800]]), "#FFFFFF", { opacity: 0.45 }); fl(g, P([[776, 66], [904, 66], [1100, 800], [972, 800]]), "#FFFFFF", { opacity: 0.45 }); }
      else if (plan === "experts") { fl(g, P([[26, 46], [194, 46], [420, 1100], [252, 1100]]), "#FFFFFF", { opacity: 0.42 }); fl(g, P([[806, 46], [974, 46], [1200, 1100], [1032, 1100]]), "#FFFFFF", { opacity: 0.42 }); }
      else fl(g, P([[-40, 40], [150, 40], [440, 620], [250, 620]]), "#FFFFFF", { opacity: 0.4 });
    }
    if (plan === "fond" && partie(o, "estrade")) {
      ombre(g, rr(290, 730, 420, 60, 3), 6, 0);
      U.shape(C, "estrade", rr(290, 730, 420, 60, 3), BOIS, { sw: 2.6 }); ln(g, "M294 738 L706 738", 1.6, "#FFFFFF");
      ombre(g, rr(320, 636, 360, 94, 3), 7, 6);
      U.shape(C, "facade", rr(320, 636, 360, 94, 3), BOIS, { sw: 2.6 });
      [[332, 648], [450, 648], [568, 648]].forEach(([x, y], i) => U.shape(C, "fp" + i, rr(x, y, 100, 70, 3), PANNEAU, { sw: 1.8, r: 0.5 }));
      U.shape(C, "dessus", rr(310, 624, 380, 16, 4), { base: "#D9D9D2", hatch: "#8A8A84", gap: 5, fw: 1.2 }, { sw: 2.6 });
      el("ellipse", { cx: 370, cy: 624, rx: 20, ry: 5, fill: "#55524B" }, g); ln(g, "M370 622 L370 604", 4, INK);
      U.shape(C, "abat", "M340 606 L400 606 L392 586 L348 586 Z", MAT.yellow, { sw: 2.4 });
      el("ellipse", { cx: 560, cy: 624, rx: 13, ry: 4, fill: "#3A3A37" }, g); ln(g, "M560 622 C560 600 552 590 536 588", 3.4, INK); U.shape(C, "micro", rr(520, 582, 18, 12, 5), MAT.mid, { sw: 1.8 });
      fl(g, "M432 622 L470 614 L508 622 L508 626 L432 626 Z", "#FFFFFF", { stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" }); ln(g, "M470 614 L470 624", 1.2, "#A9A9A2");
    }
    if (plan === "fond" && partie(o, "halo")) { el("ellipse", { cx: 370, cy: 622, rx: 76, ry: 22, fill: YEL, opacity: 0.22 }, g); el("circle", { cx: 370, cy: 598, r: 48, fill: YEL, opacity: 0.12 }, g); }
    if (plan === "fond" && partie(o, "tables")) [[80, 270, true], [650, 860, false]].forEach(([x0, x1, pile], i) => {
      ombre(g, rr(x0, 736, x1 - x0, 89, 3), 6, 4);
      U.shape(C, "tfac" + i, rr(x0, 736, x1 - x0, 89, 3), BOIS, { sw: 2.4 });
      U.shape(C, "tpan" + i, rr(x0 + 12, 748, x1 - x0 - 24, 64, 3), PANNEAU, { sw: 1.6, r: 0.5 });
      U.shape(C, "tdes" + i, rr(x0 - 8, 724, x1 - x0 + 16, 14, 4), { base: "#D9D9D2", hatch: "#8A8A84", gap: 5, fw: 1.2 }, { sw: 2.4 });
      if (pile) [[96, 712, 70], [92, 702, 74], [98, 692, 66], [94, 682, 72]].forEach(([x, y, w], k) => U.shape(C, "dos" + k, rr(x, y, w, 10, 2), k % 2 ? MAT.white : MAT.grey, { sw: 1.6, r: 0.3 }));
      else { fl(g, "M700 722 L760 716 L764 724 Z", "#FFFFFF", { stroke: INK, "stroke-width": 1.4 }); fl(g, "M776 724 L818 720 L820 725 Z", "#FFFFFF", { stroke: INK, "stroke-width": 1.4 }); } });
    if (plan === "fond" && partie(o, "barriere")) {
      const bal = (x) => `M${x - 4} 912 L${x + 4} 912 L${x + 3} 898 C${x + 8} 892 ${x + 8} 884 ${x + 3} 880 L${x + 4} 870 L${x - 4} 870 L${x - 3} 880 C${x - 8} 884 ${x - 8} 892 ${x - 3} 898 Z`;
      [[70, 405], [495, 860]].forEach(([a, b], i) => {
        for (let x = a + 18; x < b - 8; x += 30) U.shape(C, "bal" + i + x, bal(x), BOIS, { sw: 1.6, r: 0.3 });
        U.shape(C, "main" + i, rr(a, 860, b - a, 12, 4), BOIS, { sw: 2.4 }); U.shape(C, "pied" + i, rr(a, 910, b - a, 10, 3), BOIS, { sw: 2.2 });
        [a, b - 14].forEach((x, k) => U.shape(C, "poteau" + i + k, rr(x, 852, 14, 70, 3), BOIS, { sw: 2.2 })); });
    }
    const dust = plan === "fond" ? [{ x: 120, y: 120, w: 200, h: 560 }, { x: 800, y: 120, w: 200, h: 560 }] : plan === "experts" ? [{ x: 40, y: 120, w: 260, h: 700 }, { x: 820, y: 120, w: 200, h: 700 }] : [{ x: 40, y: 80, w: 300, h: 500 }];
    return { sol: yS, lambris: yL, pupitre: [500, 624], lampe: [370, 598], micro: [529, 588], poussiere: dust };
  };
  D.salle.essais = [{}, { plan: "experts" }, { plan: "nu" }, { part: "tables" }, { part: "barriere" }];

  /* G9 — un parent VU DE DOS, assis (dessin dédié : Persona n'a pas de vue de dos). Ancrage = milieu du dossier du banc (S21 : mère
   * (400, 1250), père (570, 1250)) ; ≈ 200 × 310 : sommet de la tête à −232, épaules à ≈ −96, le dos continue sous le dossier
   * (caché par D.bancParties). o.qui "mere" : carré gris à mi-nuque (raie, mèches), nuque, col roulé du pull (« sweater » de
   * Persona), foulard clair noué · "pere" : crâne dégarni et couronne de cheveux bruns, oreilles décollées, nuque, col de chemise
   * blanc, épaules de veste foncée (« suit »), couture du dos.
   * o.penche 0..1 : la tête s'incline vers l'autre (mère vers la droite, père vers la gauche) · o.tremble 0..1 + o.ph (phase 0..1,
   * 6 Hz) : les épaules tressautent de 3 px · o.mouchoir 0..1 (mère) : le coude se lève, la main monte au visage, un mouchoir blanc
   * dépasse de la joue · o.bras 0..1 (père, PARTIE "bras", à poser APRÈS la mère) : son bras passe derrière les épaules de sa
   * femme, main en moufle sur son épaule ; o.ecart = distance entre les deux (170).
   * Parties : "corps" (tout sauf le bras du père) · "bras". Ancres : tete, nuque, epauleG, epauleD, main. */
  D.dos = (g, o = {}) => {
    const mere = o.qui !== "pere", C = U.ctx(g, mere ? 2571 : 2575, false, 1), pe = clamp(o.penche || 0, 0, 1), tr = clamp(o.tremble || 0, 0, 1);
    const dy = 3 * tr * Math.sin(TAU * (o.ph || 0)), sens = mere ? 1 : -1, mo = mere ? clamp(o.mouchoir || 0, 0, 1) : 0, ecart = o.ecart || 170;
    const E = mere ? 66 : 74;                                                    // demi-largeur aux épaules (proportions Persona : grosse tête, épaules étroites)
    const out = { tete: [0, -176], nuque: [0, -114], epauleG: [-(E - 8), -98], epauleD: [E - 8, -98] };
    if (partie(o, "corps")) {
      const T = el("g", { transform: `translate(0 ${f(dy)})` }, g), CT = U.ctx(T, mere ? 2572 : 2576, false, 1);
      // le dos : épaules arrondies, bras le long du corps (emmanchures dessinées), il continue sous le dossier du banc
      const dos = `M-24 -112 C-40 -112 -${E - 10} -108 -${E - 2} -96 C-${E + 2} -86 -${E + 3} -64 -${E + 3} -36 L-${E + 5} 92 L${E + 5} 92 L${E + 3} -36 C${E + 3} -64 ${E + 2} -86 ${E - 2} -96 C${E - 10} -108 40 -112 24 -112 Z`;
      ombre(T, dos, 6, 4);
      U.shape(CT, "dos", dos, mere ? PULL : VESTE, { sw: 2.6 });
      [-1, 1].forEach((s2) => ln(T, `M${s2 * (E - 16)} -102 C${s2 * (E - 24)} -80 ${s2 * (E - 22)} -50 ${s2 * (E - 16)} -20`, 1.6, mere ? "#55524B" : "#8A8A84"));
      if (mere) ln(T, `M-${E} 64 L${E} 64`, 1.4, "#77776F", { "stroke-dasharray": "3 4" });
      else { ln(T, "M0 -108 L0 92", 2, INK); ln(T, "M-18 -60 C-10 -40 -10 -20 -14 0 M18 -60 C10 -40 10 -20 14 0", 1.2, "#8A8A84"); }
      // le bras levé de la mère : le coude sort sur le côté, l'avant-bras monte vers le visage (la main est cachée par la tête)
      if (mo > 0.02) { const Ec = [lerp(-E + 4, -E - 26, mo), lerp(10, -64, mo)], Hm = [lerp(-E + 8, -46, mo), lerp(40, -150, mo)];
        membre(CT, "brasM", [[-(E - 12), -94], Ec, Hm], [28, 25, 22], PULL); }
      // la nuque, le col
      U.shape(CT, "nuque", "M-17 -134 L17 -134 L19 -108 L-19 -108 Z", SKIN, { sw: 2.2 });
      if (mere) {
        U.shape(CT, "foulard", "M-32 -112 C-30 -128 30 -128 32 -112 C34 -102 18 -98 0 -100 C-18 -98 -34 -102 -32 -112 Z", { base: "#F7F6F0", hatch: "#D6D3C6", gap: 6, fw: 0.9 }, { sw: 2.2 });
        ln(T, "M-20 -110 Q0 -104 20 -110", 1.3, "#B9B6A6");
        [[-14, -116], [6, -118], [22, -112], [-24, -110], [-4, -106]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 2, fill: "#B9B6A6" }, T));
      } else {
        U.shape(CT, "col", "M-24 -110 L-20 -124 L20 -124 L24 -110 C12 -106 -12 -106 -24 -110 Z", MAT.white, { sw: 2.2 });
        ln(T, "M-28 -110 C-14 -102 14 -102 28 -110", 2.6, "#3A3A37");
      }
      // la tête (elle s'incline vers l'autre)
      const H = el("g", { transform: `rotate(${f(sens * 12 * pe)} 0 -114)` }, T), CH = U.ctx(H, mere ? 2573 : 2577, false, 1);
      if (mere) {
        const cheveux = "M-57 -172 C-59 -212 -32 -234 0 -234 C32 -234 59 -212 57 -172 C56 -150 53 -134 49 -122 C30 -118 -30 -118 -49 -122 C-53 -134 -56 -150 -57 -172 Z";
        U.shape(CH, "carre", cheveux, CHEV_GRIS, { sw: 2.6, r: 0.6 });
        ln(H, "M0 -233 C2 -222 4 -212 4 -200", 2, "#8A8A84");                                                  // la raie
        [[-6, -226, -40, -134], [-20, -222, -50, -142], [10, -226, 36, -132], [24, -220, 48, -144], [0, -214, -10, -124], [8, -212, 16, -124]].forEach(([x0, y0, x1, y1]) => ln(H, `M${x0} ${y0} Q${f((x0 + x1) / 2 + (x1 < 0 ? -10 : 10))} ${f((y0 + y1) / 2)} ${x1} ${y1}`, 1.5, "#96968F"));
        ln(H, "M-46 -126 L-40 -120 M-28 -122 L-24 -117 M26 -122 L22 -117 M44 -126 L38 -120", 1.4, "#77776F");
      } else {
        [-1, 1].forEach((s2) => U.shape(CH, "oreille" + s2, `M${s2 * 50} -182 C${s2 * 66} -188 ${s2 * 70} -162 ${s2 * 64} -148 C${s2 * 60} -140 ${s2 * 52} -142 ${s2 * 50} -148 Z`, SKIN, { sw: 2.2 }));
        [-1, 1].forEach((s2) => ln(H, `M${s2 * 56} -176 Q${s2 * 62} -166 ${s2 * 56} -154`, 1.4, "#A1A19B"));
        const crane = "M-54 -178 C-56 -216 -30 -238 0 -238 C30 -238 56 -216 54 -178 C52 -152 46 -134 38 -124 C20 -118 -20 -118 -38 -124 C-46 -134 -52 -152 -54 -178 Z";
        U.shape(CH, "crane", crane, SKIN, { sw: 2.6, r: 0.5 });
        ln(H, "M-30 -224 C-18 -234 0 -236 14 -232", 3, "#FFFFFF");                                           // reflet du crâne dégarni
        const couronne = "M-55 -188 C-40 -194 -20 -198 0 -198 C20 -198 40 -194 55 -188 C54 -162 48 -140 38 -126 C20 -120 -20 -120 -38 -126 C-48 -140 -54 -162 -55 -188 Z";
        U.shape(CH, "couronne", couronne, CHEV_BRUN, { sw: 2.2, r: 0.6 });
        ln(H, "M-30 -182 Q-34 -162 -28 -140 M0 -188 Q-2 -162 2 -138 M30 -182 Q34 -162 28 -140", 1.3, "#44443F");
      }
      if (mo > 0.6) U.shape(CT, "mouchoir", "M-50 -170 L-76 -156 L-66 -150 L-72 -138 L-52 -144 Z", MAT.white, { sw: 2, r: 0.4 });
      out.main = [f(lerp(-E + 8, -46, mo)), f(lerp(40, -150, mo) + dy)];
    }
    if (!mere && partie(o, "bras")) {
      const b = clamp(o.bras || 0, 0, 1);
      if (b > 0.03) { const S = [-(E - 12), -96], far = -ecart - 40, Hf = [lerp(-E + 6, far, b), lerp(-10, -104, b)], El = [lerp(-E - 16, (S[0] + far) / 2, b), lerp(-40, -90, b)];
        membre(C, "brasP", [S, El, Hf], [28, 25, 21], VESTE);
        const a = Math.atan2(Hf[1] - El[1], Hf[0] - El[0]) * 180 / Math.PI;
        const G = el("g", { transform: `translate(${f(Hf[0])} ${f(Hf[1])}) rotate(${f(a)})` }, g), CG = U.ctx(G, 2579, false, 1);
        U.shape(CG, "manchette", rr(-6, -11, 8, 22, 3), MAT.white, { sw: 1.6 });
        U.shape(CG, "main", "M0 -11 C12 -14 22 -8 22 2 C22 12 12 16 -1 12 Z", SKIN, { sw: 2.2, r: 0.5 });
        ln(G, "M9 -11 q8 4 6 12", 1.3, "#A1A19B");
        out.main = [f(Hf[0]), f(Hf[1])]; }
    }
    return out;
  };
  /* essais : chacun seul, puis le couple tel qu'en S21 (mère, père, bras du père, à 170 px) */
  D.dos.essais = [{}, { qui: "pere" }, { mouchoir: 1, tremble: 1, ph: 0.25, penche: 1 }, { qui: "pere", penche: 1, bras: 1 }];
  // essai du couple à l'échelle de S21 : banc devant, mère à −85, père à +85 (n'est pas utilisé par les scènes)
  D.dosCoupleEssai = (g, o = {}) => {
    const mk = (x) => el("g", { transform: `translate(${x} 0)` }, g);
    D.dos(mk(-85), { qui: "mere", penche: o.p || 0, mouchoir: o.m || 0 }); D.dos(mk(85), { qui: "pere", part: "corps", penche: o.p || 0 });
    D.dos(mk(85), { qui: "pere", part: "bras", bras: o.b || 0 }); D.bancParties(g, {});
    return {};
  };
  D.dosCoupleEssai.essais = [{}, { p: 1, m: 1, b: 1 }];

  /* G10 — le banc des parties civiles VU DE DOS : dossier à barreaux (on voit le dos des parents entre les barreaux), deux
   * montants, l'assise devinée, les pieds. Ancrage = haut, milieu (S21 : (485, 1250)) ; 480 × 220. À poser APRÈS D.dos. */
  D.bancParties = (g, o = {}) => {
    const C = U.ctx(g, 2581, false, 1);
    ombre(g, rr(-244, 0, 488, 22, 5), 5, 6);
    for (let x = -222; x < 222; x += 44) U.shape(C, "barreau" + x, rr(x, 20, 24, 104, 3), BOIS, { sw: 2 });
    U.shape(C, "traverse", rr(-240, 120, 480, 18, 3), BOIS, { sw: 2.4 });
    U.shape(C, "assise", rr(-248, 138, 496, 16, 3), { base: "#D9D7CE", hatch: "#9E9B90", gap: 6, fw: 1 }, { sw: 2.4 });
    [-232, 220].forEach((x, i) => U.shape(C, "montant" + i, rr(x, -8, 16, 228, 4), BOIS, { sw: 2.4 }));
    U.shape(C, "dossier", rr(-244, 0, 488, 22, 5), BOIS, { sw: 2.6 });
    ln(g, "M-238 6 L238 6", 1.6, "#FFFFFF");
    ln(g, "M-200 156 L-204 220 M200 156 L204 220", 6, INK);
    return { haut: 0 };
  };
  D.bancParties.essais = [{}];

  /* G11 — le négatoscope sur pied à roulettes. Ancrage = haut, milieu (S22 : (500, 470)) ; caisson 500 × 650, pied jusqu'à 830.
   * Quatre cases (2 × 2) : rangée 1 x −230…−20 et 20…230, y 70…270 ; rangée 2 y 360…560 ; en-têtes (la place des étiquettes-
   * refrain) y 20…65 et 310…355. o.l1, o.l2 0..1 = lumière de chaque rangée (faire grésiller 0,15 s) ; pinces ; o.egal 0..1 :
   * le « = » se trace entre les cases de la rangée 1 (0, 160) ; o.diff 0..1 : le « ≠ » entre celles de la rangée 2 (0, 475) — les
   * deux signes sont DESSINÉS (Kalam n'a pas « ≠ ») ; o.scan 0..1 : une barre jaune traverse la rangée 2 de gauche à droite.
   * Le contenu des cases (profils, coupes, mots) est posé par la scène. Ancres : cases (centres), entetes, egal, diff. */
  D.negatoscope = (g, o = {}) => {
    const C = U.ctx(g, 2591, false, 1), l1 = clamp(o.l1 || 0, 0, 1), l2 = clamp(o.l2 || 0, 0, 1);
    // le pied : colonne, base en T, roulettes
    U.shape(C, "colonne", rr(-12, 650, 24, 160, 4), MAT.grey, { sw: 2.2 });
    U.shape(C, "base", rr(-110, 800, 220, 14, 5), MAT.mid, { sw: 2.2 });
    [-96, -36, 36, 96].forEach((x) => { el("circle", { cx: x, cy: 822, r: 9, fill: "#3A3A37", stroke: INK, "stroke-width": 1.6 }, g); el("circle", { cx: x, cy: 822, r: 3, fill: "#E1E1DC" }, g); });
    // le caisson
    ombre(g, rr(-250, 0, 500, 650, 12), 8, 10);
    U.shape(C, "caisson", rr(-250, 0, 500, 650, 12), MAT.grey, { sw: 3 });
    U.shape(C, "face", rr(-238, 12, 476, 626, 8), { base: "#E9E9E4" }, { sw: 2, r: 0.4 });
    [[20, 65], [310, 355]].forEach(([a, b], i) => U.shape(C, "entete" + i, rr(-238, a, 476, b - a, 4), MAT.mid, { sw: 1.8, r: 0.4 }));
    const cases = [[-230, 70, l1], [20, 70, l1], [-230, 360, l2], [20, 360, l2]];
    cases.forEach(([x, y, l], i) => {
      if (l > 0.02) el("rect", { x: x - 8, y: y - 8, width: 226, height: 216, rx: 8, fill: "#FFFDF3", opacity: f(0.6 * l) }, g);
      el("rect", { x, y, width: 210, height: 200, rx: 4, fill: mix("#C9C9C3", "#FFFFFF", l), stroke: INK, "stroke-width": 2.4 }, g);
      if (l < 0.5) for (let k = 0; k < 6; k++) ln(g, `M${x + 12 + k * 34} ${y + 190} l30 -30`, 1, "#B4B4AE");
      U.shape(C, "pince" + i, rr(x + 90, y - 8, 30, 14, 3), MAT.mid, { sw: 1.6 }); });
    ln(g, "M-250 610 L250 610", 1.4, "#A1A19B"); [-200, -170].forEach((x) => el("circle", { cx: x, cy: 626, r: 5, fill: "#E1E1DC", stroke: INK, "stroke-width": 1.4 }, g));
    // les signes, tracés à l'encre
    const trait = (d, p, L) => { if (p > 0.01) ln(g, d, 5, INK, { "stroke-dasharray": `${f(L * p)} ${L + 10}` }); };
    const eg = clamp(o.egal || 0, 0, 1), df = clamp(o.diff || 0, 0, 1);
    trait("M-13 150 L13 149", clamp(eg * 2, 0, 1), 27); trait("M-13 170 L13 169", clamp(eg * 2 - 1, 0, 1), 27);
    trait("M-13 465 L13 464", clamp(df * 3, 0, 1), 27); trait("M-13 485 L13 484", clamp(df * 3 - 1, 0, 1), 27); trait("M8 452 L-8 498", clamp(df * 3 - 2, 0, 1), 49);
    const sc = o.scan;
    if (sc != null && sc > 0.001 && sc < 0.999) { const x = -230 + 460 * sc; el("rect", { x: f(x - 12), y: 356, width: 24, height: 208, fill: YEL, opacity: 0.3 }, g); el("rect", { x: f(x - 3), y: 356, width: 6, height: 208, fill: YEL }, g); }
    return { cases: [[-125, 170], [125, 170], [-125, 460], [125, 460]], entetes: [[0, 42], [0, 332]], egal: [0, 160], diff: [0, 475] };
  };
  D.negatoscope.essais = [{}, { l1: 1, egal: 1 }, { l1: 1, l2: 1, egal: 1, diff: 1, scan: 0.6 }];

  /* G12 — petits objets qui suivent une main ou la nuque. D.marteauReflexes (ancre = la main, manche vers +x ; tête triangulaire
   * au bout ; o.a : angle) · D.lunettesLecture (demi-lune, 56 × 18, ancre = centre) · D.plume (stylo-plume, 90 × 12, ancre = la
   * main ; o.goutte 0..1 : une goutte d'encre au bec ; o.a : angle) · D.foulard (MER de face, ancre `neck` de Persona — qui est à
   * hauteur de bouche — : le foulard est dessiné de +8 à +56 sous l'ancre, nœud sur le côté, deux pans). */
  D.marteauReflexes = (g, o = {}) => {
    const G = el("g", { transform: `rotate(${o.a || 0})` }, g), C = U.ctx(G, 2601, false, 1);
    U.stroke(C, "manche", "M-16 0 L54 0", { sw: 4.4, r: 0.3 }); ln(G, "M-14 -1 L52 -1", 1.4, "#E1E1DC");
    el("circle", { cx: -18, cy: 0, r: 4, fill: "none", stroke: INK, "stroke-width": 2 }, G);
    U.shape(C, "tete", "M58 -20 C60 -20 62 -18 63 -16 L70 10 C71 14 68 16 64 16 L52 16 C48 16 45 14 46 10 L53 -16 C54 -18 56 -20 58 -20 Z", MAT.mid, { sw: 2.2, r: 0.4 });
    const a = rad(o.a || 0); return { tete: [f(58 * Math.cos(a)), f(58 * Math.sin(a))] };
  };
  D.marteauReflexes.essais = [{}, { a: -40 }];
  D.lunettesLecture = (g, o = {}) => {
    [-15, 15].forEach((x) => el("path", { d: `M${x - 12} -2 L${x + 12} -2 C${x + 12} 7 ${x + 6} 10 ${x} 10 C${x - 6} 10 ${x - 12} 7 ${x - 12} -2 Z`, fill: "#F4F6F5", stroke: INK, "stroke-width": 2.2, "stroke-linejoin": "round" }, g));
    ln(g, "M-3 -1 Q0 -5 3 -1", 2, INK); ln(g, "M-27 -2 L-31 -8 M27 -2 L31 -8", 2, INK);
    ln(g, "M-20 2 L-14 0 M10 2 L16 0", 1.4, "#FFFFFF");
    return {};
  };
  D.plume = (g, o = {}) => {
    const G = el("g", { transform: `rotate(${o.a || 0})` }, g), C = U.ctx(G, 2611, false, 1), gt = clamp(o.goutte || 0, 0, 1);
    U.shape(C, "corps", "M-44 -5 L22 -6 L30 -3 L30 3 L22 6 L-44 5 Q-48 0 -44 -5 Z", { base: "#3A3A37", hatch: INK, gap: 4, fw: 1.2 }, { sw: 2, r: 0.3 });
    el("rect", { x: 6, y: -6.5, width: 4, height: 13, fill: "#C9C9C3", stroke: INK, "stroke-width": 1 }, G);
    ln(G, "M-30 -6 L-6 -6", 2, "#C9C9C3");
    fl(G, "M30 -4 L46 0 L30 4 Z", "#E1E1DC", { stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }); ln(G, "M33 0 L45 0", 1, INK);
    if (gt > 0.02) el("ellipse", { cx: 47, cy: f(2 + 5 * gt), rx: f(1.6 + 1.6 * gt), ry: f(2 + 2.6 * gt), fill: INK }, G);
    const a = rad(o.a || 0); return { bec: [f(46 * Math.cos(a)), f(46 * Math.sin(a))] };
  };
  D.plume.essais = [{}, { goutte: 1, a: 30 }];
  D.foulard = (g, o = {}) => {
    const C = U.ctx(g, 2621, false, 1), TISSU = { base: "#F7F6F0", hatch: "#D6D3C6", gap: 6, fw: 0.9 };
    U.shape(C, "tour", "M-38 8 C-24 16 24 16 38 8 L40 20 C24 28 -24 28 -40 20 Z", TISSU, { sw: 2.2 });
    U.shape(C, "pointe", "M-36 16 C-18 24 18 24 34 16 L6 54 Q0 60 -6 54 Z", TISSU, { sw: 2.4 });
    ln(g, "M-20 24 L-2 48 M14 24 L2 46", 1.3, "#B9B6A6");
    U.shape(C, "bout1", "M34 16 L48 30 L42 36 L30 22 Z", TISSU, { sw: 1.8 });
    U.shape(C, "bout2", "M34 18 L40 40 L32 42 L28 22 Z", TISSU, { sw: 1.8 });
    U.shape(C, "noeud", "M26 12 C28 6 40 6 42 12 C44 20 38 24 34 24 C28 24 24 20 26 12 Z", TISSU, { sw: 2.2 });
    [[-24, 14], [-8, 18], [10, 18], [24, 14], [-12, 30], [8, 32], [0, 44]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 1.8, fill: "#B9B6A6" }, g));
    return {};
  };

  /* ═══════════════════════════════ HORS INVENTAIRE : pièces de HUD des scènes S12 à S21 ═══════════════════════════════ */

  /* D.carteQ (S12) — la petite carte « ? » qui file le long du pointillé, de la médecin vers le médaillon de l'anesthésiste.
   * 70 × 50, « ? » Kalam 40. Ancrage = centre. */
  D.carteQ = (g, o = {}) => {
    const C = U.ctx(g, 2701, false, 1);
    ombre(g, rr(-35, -25, 70, 50, 9), 4, 5);
    U.shape(C, "carte", rr(-35, -25, 70, 50, 9), MAT.white, { sw: 2.6, r: 0.5 });
    tx(g, "?", 0, 15, 40);
    return {};
  };

  /* D.cadreCT (S16) — le cadre « CT » qui se trace autour de la coupe : rectangle arrondi o.w × o.h (780 × 860 : x 110–890,
   * y 440–1300), quatre repères d'angle, « CT » (Kalam 24) en (40, 38). Ancrage = coin haut gauche. o.p 0..1 : le tracé
   * (les repères à partir de 0,8) ; o.scan 0..1 : la barre de balayage jaune (6 px, toute la largeur) descend. */
  D.cadreCT = (g, o = {}) => {
    const w = o.w || 780, h = o.h || 860, p = clamp(o.p == null ? 1 : o.p, 0, 1), per = 2 * (w + h);
    if (p > 0.005) el("path", { d: rr(0, 0, w, h, 26), fill: "none", stroke: INK, "stroke-width": 3, "stroke-dasharray": `${f(per * p)} ${f(per + 20)}` }, g);
    if (p > 0.8) { const k = clamp((p - 0.8) / 0.2, 0, 1), L = 46 * k;
      [[0, 0, 1, 1], [w, 0, -1, 1], [0, h, 1, -1], [w, h, -1, -1]].forEach(([x, y, sx, sy]) => ln(g, `M${f(x + sx * 12)} ${f(y + sy * (12 + L))} L${f(x + sx * 12)} ${f(y + sy * 12)} L${f(x + sx * (12 + L))} ${f(y + sy * 12)}`, 6, INK));
      tx(g, "CT", 40, 38, 24, { op: f(k), anchor: "middle" }); }
    const sc = o.scan; if (sc != null && sc > 0.001 && sc < 0.999) { const y = 10 + (h - 20) * sc;
      el("rect", { x: 4, y: f(y - 16), width: w - 8, height: 32, fill: YEL, opacity: 0.25 }, g); el("rect", { x: 4, y: f(y - 3), width: w - 8, height: 6, fill: YEL }, g); }
    return { w, h };
  };
  D.cadreCT.essais = [{}, { p: 0.5 }, { scan: 0.4 }];

  /* D.etiquette — étiquette blanche du HUD à plusieurs lignes (citation de S14, dates de S19, « § 411 Abs. 4 StPO » de S20).
   * o.lignes = [{ de | ar | mn : texte, size, y }] : de = Kalam (allemand), ar = Plex gras (arabe, rtl ; latin mêlé → bidi
   * plaintext), mn = Kalam gris #55524B (source) ; y = ligne de base depuis le haut de l'étiquette (sinon empilées). o.icone
   * "moniteur" : petit moniteur dessiné à gauche (S14). o.w, o.h : taille minimale (elle s'élargit au texte). Ancrage = coin haut
   * gauche (o.centre : centre). Renvoie { w, h }. */
  D.etiquette = (g, o = {}) => {
    const L = o.lignes || [{ de: "27.04. + 04.05.2026", size: 26 }], ic = o.icone === "moniteur" ? 64 : 0, pad = 18, C = U.ctx(g, 2711, false, 1);
    let y = 0; const rows = L.map((l) => { const size = l.size || 26, wd = l.ar != null ? largAr(l.ar, size) : larg(l.de != null ? l.de : l.mn, size); y = l.y != null ? l.y : y + size * 1.35; return Object.assign({ size, wd, yb: l.y != null ? l.y : y - size * 0.25 + 6 }, l); });
    const tw = Math.max.apply(null, rows.map((r) => r.wd)), w = Math.max(o.w || 0, Math.round(ic + tw + 2 * pad)), h = Math.max(o.h || 0, Math.round(rows[rows.length - 1].yb + 16));
    const G = el("g", o.centre ? { transform: `translate(${f(-w / 2)} ${f(-h / 2)})` } : {}, g), cx = ic + (w - ic) / 2;
    ombre(G, rr(0, 0, w, h, 12), 5, 6);
    U.shape(U.ctx(G, 2712, false, 1), "etq", rr(0, 0, w, h, 12), MAT.white, { sw: 3, r: 0.6 });
    if (ic) { const M = el("g", { transform: `translate(${ic / 2 + 4} ${f(h / 2)})` }, G);
      fl(M, rr(-22, -20, 44, 32, 5), "#F4F4EE", { stroke: INK, "stroke-width": 2.2 }); ln(M, "M-16 -4 L-8 -4 L-5 -12 L0 6 L4 -4 L16 -4", 2, INK); ln(M, "M0 12 L0 20 M-10 20 L10 20", 2.2, INK); }
    rows.forEach((r) => { if (r.ar != null) ar(G, r.ar, cx, r.yb, r.size); else tx(G, r.de != null ? r.de : r.mn, cx, r.yb, r.size, r.mn != null ? { fill: "#55524B" } : {}); });
    return { w, h };
  };
  D.etiquette.essais = [{}, { icone: "moniteur", w: 510, h: 116, lignes: [{ de: "„Wenn der Monitor … warnt, ist es zu spät.“", size: 22, y: 36 }, { ar: "ملي كيصوني الـMonitor، كيكون فات الحال", size: 28, y: 78 }, { mn: "laut Presse (Gutachter)", size: 18, y: 104 }] },
    { w: 430, h: 150, lignes: [{ de: "§ 411 Abs. 4 StPO", size: 26, y: 38 }, { ar: "من بعد Einspruch،", size: 26, y: 80 }, { ar: "المحكمة ماشي مربوطة بالغرامة", size: 26, y: 120 }] }];

  /* D.rond — un rond à main levée (S21 : autour de DOC, puis autour des deux dos ; jaune surligneur). Ancrage = centre ; o.rx, o.ry
   * (75 × 180) ; o.p 0..1 : il se trace (le bout dépasse un peu le départ) ; o.c : couleur (jaune) ; o.sw (6). */
  D.rond = (g, o = {}) => {
    const rx = o.rx || 75, ry = o.ry || 180, p = clamp(o.p == null ? 1 : o.p, 0, 1); if (p < 0.005) return {};
    const pts = []; for (let i = 0; i <= 40; i++) { const a = -2.2 + (i / 40) * (TAU + 0.5), k = 1 + 0.05 * Math.sin(i * 0.9) + 0.06 * (i / 40); pts.push([Math.cos(a) * rx * k, Math.sin(a) * ry * k]); }
    const d = U.curve(pts), L = 2 * Math.PI * Math.sqrt((rx * rx + ry * ry) / 2) * 1.12;
    el("path", { d, fill: "none", stroke: o.c || YEL, "stroke-width": o.sw || 6, "stroke-linecap": "round", "stroke-dasharray": `${f(L * p)} ${f(L + 20)}` }, g);
    return { rx, ry };
  };
  D.rond.essais = [{}, { rx: 215, ry: 165, p: 0.6 }];

  /* @@SUITE-2@@ */
  }
})();
