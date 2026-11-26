/* decor-3.js — AKTE 06 « كلمة وحدة » : décors et objets PROPRES à l'épisode, 3e et dernière partie (S22–S28). Mêmes conventions que decor.js
 * (ancrage (0,0) ou coordonnées MONDE quand c'est écrit, paramètres animés dans o, ombre décalée, rotations DANS le dessin, texte .tw).
 * Outils partagés : D.outils (decor.js). État de l'inventaire : en tête de decor.js.
 * Essai : node tools/essai_decor.mjs videos/akte-lehrte-mtx --cols 2 --cell 530 --per 6 [--only nom1,nom2]
 * Jaune : AUCUN dans ce fichier (le seul jaune de l'histoire = comprimés, enveloppes du tribunal, épingles).
 */
(function () {
  "use strict";
  const D = window.EpDecor = window.EpDecor || {};
  // decor.js doit être chargé avant (D.outils) ; l'essai de décors charge les fichiers dans l'ordre alphabétique → on attend decor.js.
  if (!D.outils) { (D._apres = D._apres || []).push(suite); return; }
  suite();
  function suite() {
  const SC = SketchCast, U = SC.util;
  const { el, f, clamp, lerp, hash, rot, mix, gris, ombre, barre, ligne, cercle, ovale, trace, tw, frappe, MAT, INK, OMB, GRIS } = D.outils;
  let uid = 0; const nid = (p) => `ep06c${p}${++uid}`;                                     // id uniques (clipPath, dégradés)
  const CARTON = { base: "#F7F5EE" }, METAL = "#6E6B62";
  const W = (n, size) => n * 0.6 * size;                                                    // largeur d'un texte .tw de n caractères

  /* ═════════════════════════ (l) LA SALLE D'AUDIENCE, DE FACE (S22) ═════════════════════════ */

  /* D.salleAG — petite salle d'audience, coordonnées MONDE : plafond (y < 262, corniche), mur #F0EEE7 (y 262–900), lambris à lattes MAT.wood
   * (y 900–1150), estrade (plateau à y 1150, contremarche jusqu'à 1168), parquet en perspective (y > 1168), néon suspendu au plafond, centre (540, 300),
   * 400 × 16. Aucun emblème, aucune plaque, aucune horloge. o : lum 0,86–1 (le néon grésille) · lueur 0/1 (0 : sans la lueur sous le néon —
   * la scène la pose à part pour la faire grésiller sans redessiner la salle) · grey. → { neon, estrade, sol } */
  D.salleAG = (g, o = {}) => {
    o = Object.assign({ lum: 1, lueur: 1, grey: 0, seed: 701 }, o);
    const C = U.ctx(g, o.seed, false, 1), lum = clamp(o.lum, 0, 1);
    el("rect", { x: -240, y: -240, width: 1560, height: 1420, fill: mix("#F0EEE7", "#E6E6E2", o.grey) }, g);
    el("rect", { x: -240, y: -240, width: 1560, height: 502, fill: "#F7F6F1" }, g);                                                    // plafond
    ligne(g, "M-240 262 L1320 262", 2.4); ligne(g, "M-240 273 L1320 273", 1.2, "#BDB8A9");                                          // corniche
    for (let i = 0; i < 24; i++) { const x = -200 + hash(i + 11) * 1460, y = 300 + hash(i + 70) * 580; ligne(g, `M${f(x)} ${f(y)} l${f(10 + hash(i + 4) * 18)} ${f(1 - hash(i + 8) * 2)}`, 1.2, "#E2DFD4"); }   // grain du mur
    // néon : deux suspentes, boîtier, tube (il grésille : opacité du tube et de sa lueur)
    const lueur = nid("neon"), gr = el("radialGradient", { id: lueur, cx: "50%", cy: "0%", r: "70%" }, el("defs", {}, g));
    el("stop", { offset: "0%", "stop-color": "#FFFFFF", "stop-opacity": 0.95 }, gr); el("stop", { offset: "100%", "stop-color": "#FFFFFF", "stop-opacity": 0 }, gr);
    if (o.lueur) el("ellipse", { cx: 540, cy: 312, rx: 330, ry: 120, fill: `url(#${lueur})`, opacity: f(0.55 * lum) }, g);
    ligne(g, "M380 262 L380 292 M700 262 L700 292", 1.8, "#55524B");
    el("path", { d: U.rrect(346, 296, 400, 16, 4), fill: OMB }, g);
    U.shape(C, "neon", U.rrect(340, 290, 400, 16, 4), gris(MAT.light, o.grey), { sw: 2.4 });
    el("rect", { x: 352, y: 302, width: 376, height: 7, rx: 3.5, fill: mix("#D9D9D3", "#FFFFFF", lum), stroke: "#8E8B82", "stroke-width": 1.2 }, g);
    // lambris à lattes (y 900–1150) : cimaise, lattes verticales en bois, plinthe
    el("rect", { x: -240, y: 900, width: 1560, height: 250, fill: "#E9E5DA" }, g);
    const L = el("g", {}, g), CL = C.sub(L);
    for (let x = -240, i = 0; x < 1320; x += 46, i++) {
      U.shape(CL, "latte" + i, `M${x + 2} 912 L${x + 44} 912 L${x + 44} 1140 L${x + 2} 1140 Z`, gris({ base: "#EDE9DF", hatch: "#C9C1AE", gap: 11, fw: 1 }, o.grey), { sw: 1.4, r: 0.4 });
      ligne(L, `M${x + 6} 918 L${x + 6} 1134`, 1, "#F8F6F0");
    }
    el("rect", { x: -240, y: 892, width: 1560, height: 20, fill: "#DDD6C6" }, g); ligne(g, "M-240 892 L1320 892", 2.4); ligne(g, "M-240 912 L1320 912", 1.6, "#8E8B82");   // cimaise
    // estrade : plateau (bord avant y 1150) + contremarche (y 1150–1168)
    el("rect", { x: -240, y: 1140, width: 1560, height: 10, fill: "#D9D2C1" }, g);
    U.shape(C, "estrade", "M-240 1150 L1320 1150 L1320 1168 L-240 1168 Z", gris(MAT.wood, o.grey), { sw: 2.6 });
    ligne(g, "M-240 1150 L1320 1150", 3);
    // parquet en perspective sous l'estrade (presque tout est caché par la table)
    const idS = nid("sol"); el("clipPath", { id: idS }, el("defs", {}, g)).appendChild(el("rect", { x: -240, y: 1168, width: 1560, height: 992 }));
    const S = el("g", { "clip-path": `url(#${idS})` }, g); el("rect", { x: -240, y: 1168, width: 1560, height: 992, fill: "#E3DCCB" }, S);
    for (let i = -8; i <= 8; i++) ligne(S, `M${f(540 + i * 70)} 1168 L${f(540 + i * 70 * 1.6)} 1700`, 1.2, "#CDC4AE");
    [1196, 1240, 1310, 1420].forEach((y) => ligne(S, `M-240 ${y} L1320 ${y}`, 1, "#D3CAB5"));
    ligne(g, "M-240 1168 L1320 1168", 2.4);
    // détails du mur : prise et interrupteur près de la fenêtre (rien d'écrit)
    [[110, 1052], [368, 1050]].forEach(([x, y], i) => { el("path", { d: U.rrect(x - 13, y - 13, 26, 26, 4), fill: "#F7F7F1", stroke: INK, "stroke-width": 1.8 }, g);
      if (i) ligne(g, `M${x} ${y - 6} L${x} ${y + 6}`, 3); else { el("circle", { cx: x - 4, cy: y, r: 2, fill: INK }, g); el("circle", { cx: x + 4, cy: y, r: 2, fill: INK }, g); } });
    return { neon: [540, 300], estrade: 1150, sol: 1168 };
  };
  D.salleAG.essais = [{}, { lum: 0.86 }];

  /* D.fenetreLames — fenêtre à lamelles verticales (8 lames), 150 × 260 (cadre x −75…75, y −130…130), rebord en bas (y 130–142). Ancre = centre.
   * Chaque lame pend de son rail et se balance (sway 0,8°, 2,6 s, déphasées) : o.ph = phase 0–1 (arrondie par la scène), amp (0,8°).
   * o : jour 0–1 (lumière du ciel) · grey. → { rebord (milieu du dessus du rebord), lumiere (bas de la vitre, d'où part le rai de lumière) } */
  D.fenetreLames = (g, o = {}) => {
    o = Object.assign({ ph: 0, amp: 0.8, jour: 1, grey: 0, seed: 711 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    ombre(g, "M-82 -137 L82 -137 L82 137 L-82 137 Z", 7, 9);
    U.shape(C, "cadre", "M-82 -137 L82 -137 L82 137 L-82 137 Z", gris(MAT.white, o.grey), { sw: 3 });
    // ciel + toits lointains (on les voit entre les lames)
    el("rect", { x: -72, y: -127, width: 144, height: 254, fill: mix("#E3E7E6", "#F4F6F2", o.jour) }, g);
    el("path", { d: "M-72 60 L-40 40 L-10 58 L20 30 L52 52 L72 44 L72 127 L-72 127 Z", fill: "#DADAD3" }, g);
    ligne(g, "M-72 60 L-40 40 L-10 58 L20 30 L52 52 L72 44", 1.4, "#A9A69D");
    ligne(g, "M-40 -70 q8 -8 16 0 q6 -6 12 0 M18 -96 q7 -7 14 0 q5 -5 10 0", 1.4, "#B9B6AC");                                          // deux nuages au trait
    // rail du haut + 8 lames verticales qui pendent (pas 18, largeur 14 : les lames sont entrouvertes)
    U.shape(C, "rail", U.rrect(-76, -131, 152, 10, 3), MAT.grey, { sw: 2 });
    for (let i = 0; i < 8; i++) {
      const x = -63 + i * 18, a = o.amp * Math.sin((o.ph + i / 8) * Math.PI * 2), gl = el("g", { transform: `rotate(${f(a * 10) / 10} ${x} -121)` }, g);
      el("path", { d: `M${x - 4} -121 L${x + 7} -121 L${x + 7} 114 L${x - 4} 114 Z`, fill: "rgba(28,26,28,.10)", transform: "translate(2 0)" }, gl);
      U.shape(C.sub(gl), "lame" + i, `M${x - 5} -121 L${x + 5} -121 L${x + 5} 114 Q${x} 117 ${x - 5} 114 Z`, gris({ base: "#F4F3EE", hatch: "#CFCBBE", gap: 9, fw: 1 }, o.grey), { sw: 1.8, r: 0.4 });
      ligne(gl, `M${x - 2} -116 L${x - 2} 108`, 1, "#FFFFFF");
      el("circle", { cx: x, cy: 104, r: 2.2, fill: "#8E8B82" }, gl);
    }
    ligne(g, "M-63 104 L63 104", 1.2, "#8E8B82", { "stroke-dasharray": "2 3" });                                                          // chaînette du bas
    // rebord
    ombre(g, U.rrect(-92, 130, 184, 12, 3), 5, 6);
    U.shape(C, "rebord", U.rrect(-92, 130, 184, 12, 3), gris(MAT.white, o.grey), { sw: 2.4 });
    return { rebord: [0, 130], lumiere: [0, 127] };
  };
  D.fenetreLames.essais = [{}, { ph: 0.3, amp: 3 }];

  /* D.pupitreAG — pupitre du juge vu de face : façade lambrissée 460 × 191 (trois panneaux), plateau débordant 488 × 14 (y −205…−191),
   * petite plaque « Amtsgericht » (.tw 16) sur le panneau du milieu. Ancre = milieu du bas. Dessus (o.pile, o.lampe) : une pile de trois chemises
   * fermées vue de face (centre x −140) et une petite lampe de bureau (x o.lampeX = 178 : à 160, la main droite du juge qui s'ouvre la touchait). o : pile 0/1 · lampe 0/1 · lampeX · grey.
   * → { plateau (milieu du dessus, y −205), pile (dessus de la pile), lampe (bas de l'abat-jour) } */
  D.pupitreAG = (g, o = {}) => {
    o = Object.assign({ pile: 1, lampe: 1, lampeX: 178, grey: 0, seed: 721 }, o);
    const C = U.ctx(g, o.seed, false, 1), BOIS = gris(MAT.wood, o.grey);
    ombre(g, "M-230 -191 L230 -191 L230 0 L-230 0 Z", 8, 6);
    U.shape(C, "facade", "M-230 -191 L230 -191 L230 0 L-230 0 Z", BOIS, { sw: 3 });
    [[-214, -80], [-66, 66], [80, 214]].forEach(([a, b], i) => {                                                                   // panneaux en creux
      el("path", { d: `M${a} -176 L${b} -176 L${b} -16 L${a} -16 Z`, fill: mix("#EDEDE7", "#E4E4DF", o.grey), stroke: INK, "stroke-width": 2 }, g);
      el("path", { d: `M${a + 8} -168 L${b - 8} -168 L${b - 8} -24 L${a + 8} -24 Z`, fill: "none", stroke: "#A9A497", "stroke-width": 1.4 }, g);
      ligne(g, `M${a + 1} -175 L${b - 1} -175`, 2.2, "#C9C4B6");                                                                        // ombre du haut du creux
    });
    // plaque « Amtsgericht » (pas de laiton : grise, aucun emblème)
    el("path", { d: U.rrect(-58, -138, 124, 30, 4), fill: OMB, transform: "translate(3 4)" }, g);
    el("path", { d: U.rrect(-62, -140, 124, 30, 4), fill: "#F4F4EF", stroke: INK, "stroke-width": 2 }, g);
    [[-54, -132], [54, -132], [-54, -118], [54, -118]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 1.8, fill: "#8E8B82" }, g));
    tw(g, "Amtsgericht", 0, -119, 16, { anchor: "middle" });
    // plinthe
    el("rect", { x: -230, y: -10, width: 460, height: 10, fill: "#D6D0C0", stroke: INK, "stroke-width": 1.6 }, g);
    // plateau débordant
    U.shape(C, "plateau", U.rrect(-244, -205, 488, 14, 3), BOIS, { sw: 2.6 });
    ligne(g, "M-240 -193 L240 -193", 1.2, "#8E8B82");
    // la pile de trois chemises (fermées), vue de face
    if (o.pile) {
      const P = el("g", { transform: "translate(-140 -205)" }, g), CP = C.sub(P);
      [[-62, 62, -10, "#E3DCC9"], [-58, 64, -20, "#F4F1E8"], [-64, 58, -30, "#D8D2C2"]].forEach(([a, b, y, col], i) => {
        U.shape(CP, "ch" + i, `M${a} ${y} L${b} ${y} L${b} ${y + 10} L${a} ${y + 10} Z`, { base: mix(col, "#DEDED9", o.grey) }, { sw: 2, r: 0.4 });
        ligne(P, `M${a + 6} ${y + 5} L${a + 22} ${y + 5}`, 1.4, "#8E8B82");
      });
    }
    // petite lampe de bureau, vue de face : socle, tige, abat-jour en demi-cylindre
    if (o.lampe) {
      const Lp = el("g", { transform: `translate(${o.lampeX} -205)` }, g), CLp = C.sub(Lp);
      el("ellipse", { cx: 0, cy: -2, rx: 26, ry: 5, fill: "rgba(28,26,28,.18)" }, Lp);
      U.shape(CLp, "socle", "M-22 0 L22 0 L18 -10 L-18 -10 Z", gris(MAT.mid, o.grey), { sw: 2 });
      ligne(Lp, "M0 -10 L0 -52", 4, INK); ligne(Lp, "M0 -10 L0 -52", 1.6, "#CFCFCA");
      U.shape(CLp, "abat", "M-30 -52 L30 -52 Q30 -72 0 -74 Q-30 -72 -30 -52 Z", gris(MAT.mid, o.grey), { sw: 2.4 });
      el("ellipse", { cx: 0, cy: -51, rx: 26, ry: 3.5, fill: "#FFFDF2", stroke: INK, "stroke-width": 1.4 }, Lp);
      ligne(Lp, "M10 -50 L10 -38", 1.4, "#55524B"); el("circle", { cx: 10, cy: -36, r: 2.4, fill: "#55524B" }, Lp);
    }
    return { plateau: [0, -205], pile: [-140, -235], lampe: [o.lampeX, -52] };
  };
  D.pupitreAG.essais = [{}, { pile: 0, lampe: 0 }];

  /* D.tablePrevenus — la table des quatre (nous y sommes assis), vue en légère plongée : bord arrière à y 0 (trait épais), plateau en trapèze
   * MAT.light qui descend hors cadre (bord avant à y 1000, x ±700). Lames du bois en fuite. Ancre = milieu du bord arrière. o : grey. → { bord } */
  D.tablePrevenus = (g, o = {}) => {
    o = Object.assign({ grey: 0, seed: 731 }, o);
    const C = U.ctx(g, o.seed, false, 1), d = "M-390 0 L390 0 L700 1000 L-700 1000 Z";
    U.shape(C, "plateau", d, { base: mix("#EEECE4", "#E6E6E2", o.grey) }, { sw: 2.6 });
    const id = nid("tab"); el("clipPath", { id }, el("defs", {}, g)).appendChild(el("path", { d }));
    const T = el("g", { "clip-path": `url(#${id})` }, g);
    for (let i = -6; i <= 6; i++) ligne(T, `M${f(i * 65)} 0 L${f(i * 117)} 1000`, 1.3, "#D3CEC0");                                         // joints des lames, en fuite
    for (let i = 0; i < 9; i++) { const x0 = -330 + hash(i + 3) * 660, y0 = 30 + hash(i + 9) * 300; ligne(T, `M${f(x0)} ${f(y0)} l${f(x0 * 0.05)} ${f(40 + hash(i) * 60)}`, 1, "#DCD8CB"); }   // veines
    el("rect", { x: -390, y: 0, width: 780, height: 10, fill: "rgba(28,26,28,.07)" }, T);                                                 // ombre portée du pupitre
    ligne(g, "M-392 0 L392 0", 5);
    return { bord: [0, 0] };
  };

  /* ═════════════════════════ (m) LE DOSSIER CLASSÉ (S23) ═════════════════════════ */

  /* D.formUrteil — formulaire VIERGE titré « URTEIL » (.tw 30) : 8 lignes vides, emplacement de signature vide. 220 × 300 (w, h réglables),
   * ancre = centre. Il ne sera jamais rempli : il quitte le bureau. o : w, h · a (angle, degrés) · grey. → { stylo (où poser un stylo), coin } */
  D.formUrteil = (g, o = {}) => {
    o = Object.assign({ w: 220, h: 300, a: 0, grey: 0, seed: 741 }, o);
    const { w, h } = o, x0 = -w / 2, y0 = -h / 2, d = U.rrect(x0, y0, w, h, 4);
    el("path", { d, fill: OMB, transform: `translate(7 9) rotate(${o.a})` }, g);                                                         // ombre d'abord (sous la feuille)
    const G = el("g", { transform: `rotate(${o.a})` }, g), C = U.ctx(G, o.seed, false, 1);
    el("path", { d: U.rrect(x0 + 4, y0 + 5, w, h, 4), fill: "#EFEFEA", stroke: "#8E8B82", "stroke-width": 1.4 }, G);                         // la feuille du dessous
    U.shape(C, "feuille", d, { base: mix("#FFFFFF", "#E3E3DE", o.grey) }, { sw: 2.6, r: 0.5 });
    tw(G, "URTEIL", 0, y0 + 50, 30, { anchor: "middle" });
    ligne(G, `M${x0 + 22} ${y0 + 64} L${-x0 - 22} ${y0 + 64}`, 1.8); ligne(G, `M${x0 + 22} ${y0 + 69} L${-x0 - 22} ${y0 + 69}`, 1, GRIS);
    const pas = (h - 150) / 8;
    for (let i = 0; i < 8; i++) { const y = y0 + 96 + i * pas; ligne(G, `M${x0 + 22} ${f(y)} L${-x0 - 22} ${f(y)}`, 1.2, "#C9C6BC"); }      // 8 lignes VIDES
    // emplacement de signature, vide
    const ys = y0 + h - 28;
    ligne(G, `M${f(w * 0.06)} ${f(ys)} L${-x0 - 22} ${f(ys)}`, 1.6, "#55524B");
    barre(G, w * 0.06, ys + 7, 52, 5, "#D6D6D0");
    return { stylo: rot([w * 0.18, h * 0.12], o.a).map(f), coin: rot([-x0, y0], o.a).map(f) };
  };
  D.formUrteil.essais = [{}, { w: 200, h: 280, a: 6 }];

  /* ═════════════════════════ (n) L'ASSOCIATION ET LES BULLETINS (S24) ═════════════════════════ */

  /* D.maisonAsso — petite maison d'association vue de face : mur blanc, toit à deux pentes hachuré, cheminée, porte avec fente à courrier,
   * deux fenêtres, enseigne « gemeinnützig » (.tw 16) au-dessus de la porte. AUCUN nom. 190 × 200, ancre = milieu du bas (pour growY).
   * o : fente 0–1 (le volet de la fente s'ouvre : il bat quand un bulletin arrive) · grey. → { fente (milieu de la fente) } */
  D.maisonAsso = (g, o = {}) => {
    o = Object.assign({ fente: 0, grey: 0, seed: 751 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    el("ellipse", { cx: 6, cy: 2, rx: 112, ry: 8, fill: "rgba(28,26,28,.14)" }, g);
    ligne(g, "M-108 0 L108 0", 2.4);
    [-100, -88, 84, 96, 70].forEach((x, i) => ligne(g, `M${x} 0 l${i % 2 ? 3 : -3} -9 M${x + 6} 0 l1 -12`, 1.4, "#77776F"));             // herbe au pied du mur
    // cheminée (derrière le toit)
    U.shape(C, "chem", "M40 -186 L60 -186 L60 -146 L40 -146 Z", gris(MAT.grey, o.grey), { sw: 2.2 });
    // mur
    ombre(g, "M-80 -120 L80 -120 L80 0 L-80 0 Z", 6, 4);
    U.shape(C, "mur", "M-80 -120 L80 -120 L80 0 L-80 0 Z", gris(MAT.white, o.grey), { sw: 2.8 });
    // toit à deux pentes, débordant
    U.shape(C, "toit", "M-98 -116 L0 -200 L98 -116 Z", gris(MAT.mid, o.grey), { sw: 2.8 });
    ligne(g, "M-98 -116 L98 -116", 2.4);
    el("circle", { cx: 0, cy: -150, r: 10, fill: "#F7F7F1", stroke: INK, "stroke-width": 2 }, g); ligne(g, "M-10 -150 L10 -150 M0 -160 L0 -140", 1.4);   // œil-de-bœuf
    // enseigne au-dessus de la porte
    el("path", { d: U.rrect(-62, -112, 124, 22, 3), fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g);
    tw(g, "gemeinnützig", 0, -96, 16, { anchor: "middle" });
    // deux fenêtres à croisillon
    [-56, 56].forEach((x, i) => {
      U.shape(C, "fen" + i, `M${x - 16} -78 L${x + 16} -78 L${x + 16} -44 L${x - 16} -44 Z`, { base: "#EEF0EE" }, { sw: 2.2 });
      ligne(g, `M${x} -78 L${x} -44 M${x - 16} -61 L${x + 16} -61`, 1.6);
      ligne(g, `M${x - 20} -42 L${x + 20} -42`, 3, "#8E8B82");
    });
    // porte + fente à courrier (le volet s'ouvre de o.fente)
    U.shape(C, "porte", "M-22 -82 L22 -82 L22 0 L-22 0 Z", gris(MAT.light, o.grey), { sw: 2.4 });
    el("circle", { cx: 14, cy: -38, r: 2.6, fill: INK }, g);
    el("rect", { x: -14, y: -54, width: 28, height: 8, rx: 2, fill: "#3A3A37" }, g);
    const k = 1 - 0.7 * clamp(o.fente, 0, 1);
    el("rect", { x: -15, y: -55, width: 30, height: f(9 * k), rx: 2, fill: "#E1E1DC", stroke: INK, "stroke-width": 1.6 }, g);
    return { fente: [0, -50] };
  };
  D.maisonAsso.essais = [{}, { fente: 1 }];

  /* D.zahlschein — bulletin de paiement en papier, 110 × 60 : bande d'en-tête, deux cases (dont « EUR »), case du montant « 2 000 – 6 000 »
   * (.tw 12, texte d'ambiance : la pastille le dit en grand), ligne de signature, coin plié. Ancre = centre. o : a (angle, degrés) · grey. */
  D.zahlschein = (g, o = {}) => {
    o = Object.assign({ a: 0, grey: 0, seed: 761 }, o);
    const d = "M-55 -30 L55 -30 L55 20 L45 30 L-55 30 Z";
    el("path", { d, fill: OMB, transform: `translate(5 7) rotate(${o.a})` }, g);
    const G = el("g", { transform: `rotate(${o.a})` }, g), C = U.ctx(G, o.seed, false, 1);
    U.shape(C, "papier", d, { base: mix("#FBFAF5", "#E3E3DE", o.grey) }, { sw: 2.2, r: 0.4 });
    el("path", { d: "M55 20 L45 30 L45 20 Z", fill: "#E4E4DE", stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, G);       // coin plié
    el("rect", { x: -50, y: -26, width: 100, height: 6, rx: 2, fill: "#CFCFC8" }, G);                                                      // en-tête
    el("rect", { x: -50, y: -16, width: 44, height: 12, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.3 }, G); barre(G, -46, -12, 30, 4, "#D6D6D0");
    el("rect", { x: -2, y: -16, width: 52, height: 12, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.3 }, G); tw(G, "EUR", 2, -6, 11);
    el("rect", { x: -53, y: 0, width: 106, height: 15, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.3 }, G);
    tw(G, "2 000 – 6 000", 0, 12, 12, { anchor: "middle" });                                                                            // .tw 12 (13 touchait le bord de la case)
    ligne(G, "M-48 24 L20 24", 1, "#8E8B82");
    return { centre: [0, 0] };
  };
  D.zahlschein.essais = [{}, { a: -10 }];

  /* ═════════════════════════ (o) LA RÈGLE, SUR TA PAGE (S25–S27) ═════════════════════════ */

  /* D.boiteMTX — boîte de médicament vue de dessus : carton blanc 300 × 150, bande grise à gauche, « Methotrexat » (.tw 24), et l'inscription
   * officielle (EMA 2019, recopiée) « Nur einmal wöchentlich » / « einnehmen, am » + trait à compléter. Le texte officiel complet porte en plus
   * « (Wochentag der Einnahme ungekürzt eintragen) » : il est sur la bande de S26, pas sur la boîte (illisible à cette taille).
   * Ancre = centre. o : jour 0–1 (« Montag » écrit à la main sur le trait, révélé de gauche à droite) · a (angle) · grey. → { trait (début du trait) } */
  D.boiteMTX = (g, o = {}) => {
    o = Object.assign({ jour: 0, a: 0, grey: 0, seed: 771 }, o);
    const d = U.rrect(-150, -75, 300, 150, 6);
    el("path", { d, fill: OMB, transform: `translate(11 14) rotate(${o.a})` }, g);                                                        // boîte épaisse : ombre écartée
    const G = el("g", { transform: `rotate(${o.a})` }, g), C = U.ctx(G, o.seed, false, 1);
    U.shape(C, "carton", d, gris(CARTON, o.grey), { sw: 3 });
    U.shape(C, "bande", "M-150 -69 Q-150 -75 -144 -75 L-112 -75 L-112 75 L-144 75 Q-150 75 -150 69 Z", gris(MAT.grey, o.grey), { sw: 2.2 });
    ligne(G, "M-104 -66 L-104 66", 1, "#C9C6BC");                                                                                          // rabat (pli du carton)
    tw(G, "Methotrexat", -94, -38, 24);
    barre(G, -94, -28, 82, 6, "#D6D6D0");
    // encadré officiel
    el("path", { d: U.rrect(-98, -16, 236, 74, 3), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, G);
    tw(G, "Nur einmal wöchentlich", -90, 8, 15);
    tw(G, "einnehmen, am", -90, 36, 15);
    const xt = -90 + W(13, 15) + 8;
    ligne(G, `M${f(xt)} 38 L128 38`, 1.6, "#55524B", { "stroke-dasharray": "3 3" });
    if (o.jour > 0) {
      const id = nid("jour"), cp = el("clipPath", { id }, el("defs", {}, G)); el("rect", { x: f(xt - 4), y: 6, width: f((132 - xt) * clamp(o.jour, 0, 1) + 4), height: 40 }, cp);
      const gj = el("g", { "clip-path": `url(#${id})` }, G); U.text(gj, "Montag", f(xt + 4), 34, 26, { anchor: "start", transform: `rotate(-3 ${f(xt + 4)} 34)` });
    }
    for (let i = 0; i < 16; i++) el("rect", { x: 84 + i * 3.6, y: 50 + 12, width: hash(i + 5) > 0.5 ? 2.2 : 1, height: 10, fill: "#8E8B82" }, G);   // code-barres
    return { trait: rot([xt, 38], o.a).map(f) };
  };
  D.boiteMTX.essais = [{}, { jour: 0.6 }, { jour: 1, a: -4 }];

  /* D.fiches3 — trois fiches à onglet l'une sous l'autre (220 × 84, pas 110 : centres y −110, 0, 110), chacune avec un pictogramme au trait et
   * un mot .tw 24 : Aufnahme (porte + flèche qui entre) · Verlegung (deux maisons + flèche) · Entlassung (porte + flèche qui sort).
   * 220 × 304, ancre = centre. o : actif 0–3 (la fiche active a un double cadre d'encre et avance de 14 px vers la gauche ; décimales = transition).
   * → { fiches: [centres] } */
  const PICTO = [
    (g) => { ligne(g, "M-2 -18 L16 -18 L16 18 L-2 18 Z", 2.4); el("circle", { cx: 12, cy: 2, r: 1.8, fill: INK }, g); ligne(g, "M-24 0 L4 0 M-4 -7 L4 0 L-4 7", 2.6); },
    (g) => { [-14, 12].forEach((x) => ligne(g, `M${x - 9} 16 L${x - 9} 2 L${x} -7 L${x + 9} 2 L${x + 9} 16 Z`, 2.2)); ligne(g, "M-12 -14 Q0 -24 12 -14 M6 -18 L12 -14 L7 -9", 2.2); },
    (g) => { ligne(g, "M-18 -18 L0 -18 L0 18 L-18 18 Z", 2.4); el("circle", { cx: -4, cy: 2, r: 1.8, fill: INK }, g); ligne(g, "M-8 0 L22 0 M14 -7 L22 0 L14 7", 2.6); },
  ];
  D.fiches3 = (g, o = {}) => {
    o = Object.assign({ actif: 0, grey: 0, seed: 781, mots: ["Aufnahme", "Verlegung", "Entlassung"] }, o);
    const C = U.ctx(g, o.seed, false, 1), fiches = [];
    [0, 1, 2].forEach((i) => {
      const k = clamp(1 - Math.abs(o.actif - (i + 1)), 0, 1), dx = -14 * k, y = -110 + i * 110, G = el("g", { transform: `translate(${f(dx)} ${y})` }, g), Ci = C.sub(G);
      const carte = "M-110 -42 L-98 -42 L-94 -54 L-40 -54 L-36 -42 L110 -42 L110 42 L-110 42 Z";                                       // carte + onglet en haut à gauche
      el("path", { d: carte, fill: OMB, transform: `translate(${f(6 + 4 * k)} ${f(7 + 4 * k)})` }, G);
      U.shape(Ci, "fiche" + i, carte, gris(i === 1 ? { base: "#F1EFE7" } : CARTON, o.grey), { sw: 2.4, r: 0.5 });
      if (k > 0.5) el("path", { d: U.rrect(-104, -36, 208, 72, 5), fill: "none", stroke: INK, "stroke-width": 2.4 }, G);           // double cadre de la fiche active
      ligne(G, "M-92 -48 L-44 -48", 1.2, "#A9A497");
      PICTO[i](el("g", { transform: "translate(-78 2)" }, G));
      tw(G, o.mots[i], -50, 11, 24);
      fiches.push([f(dx), y]);
    });
    return { fiches };
  };
  D.fiches3.essais = [{}, { actif: 2 }, { actif: 2.5 }];

  /* D.loupe — loupe vue de dessus, tenue au-dessus du papier : anneau r 110 (trait épais + liseré clair), verre, deux reflets, manche 150 × 26 vers
   * le bas-droite (bague métal). o.txt = texte grossi (.tw, corps o.size 40) au centre du verre, coupé en lignes pour tenir dans le verre ;
   * o.voile = opacité du verre (0,35 sans texte ; 0,9 avec un texte : le texte de la feuille dessous ne se mêle pas au texte grossi).
   * Haute au-dessus de la feuille : ombre très écartée. Ancre = centre du verre. → { centre, manche (bout du manche) } */
  D.loupe = (g, o = {}) => {
    o = Object.assign({ txt: "", size: 40, voile: null, seed: 791 }, o);
    const C = U.ctx(g, o.seed, false, 1), voile = o.voile != null ? o.voile : o.txt ? 0.9 : 0.35, A = 42;               // angle du manche (degrés, depuis +x)
    const ux = Math.cos(A * Math.PI / 180), uy = Math.sin(A * Math.PI / 180), manche = (x, y) => `translate(${x} ${y}) rotate(${A})`;
    // ombres (loupe haute : décalage 20, 26)
    el("circle", { cx: 20, cy: 26, r: 116, fill: "none", stroke: OMB, "stroke-width": 16, opacity: 0.85 }, g);
    el("path", { d: U.rrect(118, -13, 152, 26, 12), fill: OMB, transform: manche(20, 26), opacity: 0.85 }, g);
    // manche + bague
    const M = el("g", { transform: manche(0, 0) }, g), CM = C.sub(M);
    U.shape(CM, "manche", U.rrect(150, -13, 120, 26, 12), MAT.dark, { sw: 2.6 });
    ligne(M, "M162 -6 L258 -6", 2.4, "#8E8B82");
    U.shape(CM, "bague", U.rrect(112, -15, 42, 30, 5), MAT.mid, { sw: 2.4 }); ligne(M, "M124 -15 L124 15 M140 -15 L140 15", 1.4, "#55524B");
    // verre + texte grossi (coupé au verre)
    el("circle", { r: 104, fill: "#FFFFFF", opacity: voile }, g);
    if (o.txt) {
      const id = nid("loupe"), cp = el("clipPath", { id }, el("defs", {}, g)); el("circle", { r: 102 }, cp);
      const T = el("g", { "clip-path": `url(#${id})` }, g), max = Math.max(1, Math.floor(184 / (0.6 * o.size)));
      const lignes = []; String(o.txt).split(" ").forEach((m) => { const l = lignes.length ? lignes[lignes.length - 1] : null; if (l != null && (l + " " + m).length <= max) lignes[lignes.length - 1] = l + " " + m; else lignes.push(m); });
      const lh = o.size * 1.15, y0 = -((lignes.length - 1) * lh) / 2 + o.size * 0.35;
      lignes.forEach((l, i) => tw(T, l, 0, f(y0 + i * lh), o.size, { anchor: "middle" }));
    }
    // anneau (métal) : trait épais + liseré clair + contour à main levée
    el("circle", { r: 110, fill: "none", stroke: INK, "stroke-width": 14 }, g);
    el("circle", { r: 110, fill: "none", stroke: "#CFCFCA", "stroke-width": 7 }, g);
    U.stroke(C, "anneauExt", cercle(118), { sw: 2.4, r: 0.6 }); U.stroke(C, "anneauInt", cercle(102.5), { sw: 1.8, r: 0.5 });
    // reflets
    ligne(g, "M-76 -40 A86 86 0 0 1 -38 -78", 6, "#FFFFFF", { opacity: 0.95 }); ligne(g, "M-82 -14 A86 86 0 0 1 -80 -26", 5, "#FFFFFF", { opacity: 0.9 });
    return { centre: [0, 0], manche: [f(270 * ux), f(270 * uy)] };
  };
  D.loupe.essais = [{ txt: "1 × pro Woche" }, {}];
  }
})();
