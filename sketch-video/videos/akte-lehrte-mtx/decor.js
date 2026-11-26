/* decor.js — AKTE 06 « كلمة وحدة » (Lehrte) : décors et objets PROPRES à l'épisode, 1re partie (suite : decor-2.js, decor-3.js).
 * Aucun dessin repris d'un autre épisode. Référence : storyboard.md § 2 (inventaire) et § 3 (HUD).
 * Essai de chaque dessin, seul : node tools/essai_decor.mjs videos/akte-lehrte-mtx [--only nom1,nom2]
 *
 * Conventions : chaque fonction dessine dans g autour de son ancrage (0,0) (ou en coordonnées MONDE quand c'est écrit),
 * reçoit ses paramètres animés dans o (valeurs ARRONDIES par les scènes : le moteur ne redessine que si o change) et
 * renvoie des ancres. Ombre décalée sur chaque objet ; vu de dessus, plus l'objet est haut, plus son ombre s'écarte.
 * Les rotations d'objets posés se font DANS le dessin (paramètre a, en degrés) : l'ombre reste du même côté.
 * Texte de machine à écrire : classe .tw (index.html) ; un caractère = 0,6 × corps de large.
 * Outils partagés avec decor-2.js et decor-3.js : D.outils (tw, frappe, trace, ombre, barre, mix, MAT, hash…).
 * Jaune (#F8CE4E) : seulement D.comprime / D.rangeeDoses / la tache de D.brief / D.enveloppeJaune / D.miniLettre (3 points).
 *
 * INVENTAIRE COMPLET (storyboard § 2) — état
 *  A. Le papier
 *    D.brief            fait (decor.js)   la lettre de sortie (tous ses états)
 *    D.briefMacro       fait (decor.js)   l'insert sur la ligne du médicament
 *    D.frappe           fait (decor.js)   texte frappé caractère par caractère
 *    D.bande            à faire           bande de citation (S17, S20, S22, S25, S26)
 *    D.enveloppeJaune   fait (decor.js)
 *    D.enveloppeBlanche à faire           (S10, S11)
 *    D.fichePatient     fait (decor.js)   portrait du patient (Persona.head + casquette)
 *    D.casquette        fait (decor.js)
 *    D.trombone         fait (decor.js)
 *    D.etiquette        à faire           étiquette de prix à ficelle (S19, S24 seulement)
 *  B. Les mains
 *    D.main             fait (decor.js)   avant-bras vu de dessus, six variantes, six poses, jeton
 *    D.stylo            fait (decor.js)   plume / clic / bille (+ « crayon » pour l'intro)
 *    D.paraphe          fait (decor.js)   sig1, sig2, oa, coche, croix, boucle, barre
 *    D.loupe            à faire           (S27)
 *  C. Le pilulier, les comprimés, la moelle
 *    D.pilulier         fait (decor.js)   dispositif signature
 *    D.comprime         fait (decor.js)
 *    D.rangeeDoses      fait (decor.js)
 *    D.pilulierMini     à faire           (S15, S16)
 *    D.notice           à faire           (S14)
 *    D.usine            à faire           (S14)
 *  D. Les bureaux vus de dessus
 *    D.plateau          fait (decor.js)   kind A, B, C
 *    D.halo             fait (decor.js)
 *    D.lampe            fait (decor.js)   ronde ; kind "banquier" (+ kind "chainette" seule, pour m.pend)
 *    D.clavier          fait (decor.js)
 *    D.tasse            fait (decor.js)   (+ D.vapeur : les volutes, à part)
 *    D.plante           fait (decor.js)   vue de dessus ; kind "face" (S18) : à faire
 *    D.encreur          fait (decor.js)
 *    D.tampon           fait (decor.js)
 *    D.empreinte        à faire           (S20)
 *    D.coupelle         fait (decor.js)
 *    D.telephone, D.verre, D.formAufnahme, D.planSoins, D.dossier, D.coupure, D.porteTampons, D.casier,
 *    D.corbeille, D.formUrteil                                à faire (S11–S13, S17, S20, S21, S23)
 *  E. La carte
 *    D.cartePapier      fait (decor.js)   (+ D.aiguille : l'aiguille de la rose des vents, à part)
 *    D.medaillon        fait (decor.js)
 *    D.iconeKlinik      fait (decor.js)
 *    D.miniLettre       fait (decor.js)
 *  F. Le tribunal
 *    D.feuillet         fait (decor.js)   kind "semaine" et kind "date"
 *    D.ruban            fait (decor.js)   ruban d'étiqueteuse (HUD + monde)
 *    D.calendrier       fait (decor.js)   kind "semaine" et kind "date"
 *    D.hall, D.boiteLettres, D.applique, D.interphone, D.paillasson, D.porteParapluies, D.couloir, D.chaise,
 *    D.blousePosee, D.maisonAsso, D.zahlschein, D.salleAG, D.fenetreLames, D.pupitreAG, D.tablePrevenus   à faire
 *  G. La chambre de gériatrie
 *    D.chambre, D.fenetre06, D.voilage, D.tasseTisane, D.litGeriatrie, D.potence, D.trapeze, D.chevet,
 *    D.lunettesPliees, D.canne, D.pantoufles                  à faire (S15, S16)
 *  H. Intro, règle, transitions
 *    D.chemise          fait (decor.js)   cadre de l'intro
 *    D.bordFeuille      fait (decor.js)   bord de feuille des transitions slideLeft / slideUp
 *    D.chaineMains      fait (decor.js)   HUD : la chaîne des cinq ronds
 *    D.boiteMTX, D.fiches3                                    à faire (S25, S27)
 *  D.exemple : dessin d'exemple du gabarit, encore utilisé par les scènes d'exemple de scenes-1.js — à supprimer avec elles.
 */
(function () {
  "use strict";
  const SC = SketchCast, U = SC.util, INK = "#1C1A1C", NS = "http://www.w3.org/2000/svg";
  const MAT = Object.assign({}, SC.MAT, (window.Persona && Persona.MAT) || {});   // + dark, light, wood (Persona.MAT)
  const el = (tag, a, p) => { const n = document.createElementNS(NS, tag); for (const k in a || {}) if (a[k] != null) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; };
  const D = window.EpDecor = window.EpDecor || {};
  const YEL = "#F8CE4E", OMB = "#D2D2CB", GRIS = "#8E8B82", BARRE = "#CFCFC8";
  const f = (v) => Math.round(v * 10) / 10;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, t) => a + (b - a) * t;
  const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const rot = (p, deg) => { const r = deg * Math.PI / 180, c = Math.cos(r), s = Math.sin(r); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };
  const mix = (a, b, t) => { const h = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16)), A = h(a), B = h(b); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * clamp(t, 0, 1)).toString(16).padStart(2, "0")).join(""); };
  const gris = (mat, t) => (t > 0 ? Object.assign({}, mat, { base: mix(mat.base || "#FFFFFF", "#D6D6D1", t), hatch: mat.hatch ? mix(mat.hatch, "#A1A19B", t) : undefined }) : mat);
  const ombre = (g, d, dx = 7, dy = 9, col = OMB) => el("path", { d, fill: col, transform: `translate(${f(dx)} ${f(dy)})` }, g);
  const barre = (g, x, y, w, h = 9, col = BARRE) => (w > 1 ? el("rect", { x: f(x), y: f(y), width: f(w), height: h, rx: h / 2, fill: col }, g) : null);
  const ligne = (g, d, w = 2, col = INK, o) => el("path", Object.assign({ d, fill: "none", stroke: col, "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round" }, o), g);
  const cercle = (r, cx = 0, cy = 0) => `M${f(cx - r)} ${f(cy)} A${r} ${r} 0 1 1 ${f(cx + r)} ${f(cy)} A${r} ${r} 0 1 1 ${f(cx - r)} ${f(cy)} Z`;
  const ovale = (rx, ry, cx = 0, cy = 0) => `M${f(cx - rx)} ${f(cy)} A${rx} ${ry} 0 1 1 ${f(cx + rx)} ${f(cy)} A${rx} ${ry} 0 1 1 ${f(cx - rx)} ${f(cy)} Z`;
  // tracé d'encre révélé de son début à sa fin (p = 0..1) — signatures, boucles, coches
  const trace = (g, d, p = 1, w = 2.6, col = INK) => (p <= 0.001 ? null : ligne(g, d, w, col, p >= 0.999 ? null : { pathLength: 100, "stroke-dasharray": `${f(p * 100)} 100` }));

  /* ───────── texte de machine à écrire ───────── */
  const TW = '"Liberation Mono", "Courier New", "DejaVu Sans Mono", monospace';
  // texte .tw d'un seul tenant (libellés fixes) ; o.fill / o.op passent par style (la classe .tw fixe la couleur d'encre)
  const tw = (g, str, x, y, size, o = {}) => {
    const t = el("text", { x: f(x), y: f(y), class: "tw", "font-family": TW, "font-weight": 700, "font-size": size, "text-anchor": o.anchor || "start", fill: o.fill || INK, transform: o.transform }, g);
    if (o.fill || o.op != null) t.setAttribute("style", `${o.fill ? "fill:" + o.fill + ";" : ""}${o.op != null ? "opacity:" + o.op : ""}`);
    t.textContent = str; return t;
  };
  // texte FRAPPÉ : un <text> par caractère (x = o.x + i · 0,6 · corps), petits défauts de frappe déterministes
  function frappe(g, o) {
    o = Object.assign({ txt: "", x: 0, y: 0, size: 30, n: null, style: "encre", coup: 0, cur: 0, seed: 1, fill: INK }, o);
    const s = String(o.txt), n = o.n == null ? s.length : clamp(Math.round(o.n), 0, s.length), pas = 0.6 * o.size;
    for (let i = 0; i < n; i++) {
      if (s[i] === " ") continue;
      const h1 = hash(i * 3 + o.seed), h2 = hash(i * 7 + o.seed + 1), h3 = hash(i * 11 + o.seed + 2);
      const x = o.x + i * pas, y = o.y + (h1 - 0.5) * 0.04 * o.size, dernier = i === n - 1 && n < s.length;
      const t = el("text", { x: f(x), y: f(y), class: "tw", "font-family": TW, "font-weight": 700, "font-size": o.size, transform: `rotate(${f((h2 - 0.5) * 2)} ${f(x + pas / 2)} ${f(y - o.size * 0.3)})` }, g);
      // « pointillé » : contour en tirets (grand corps) ; en petit corps les tirets se bouchent → gris plein, plus pâle
      t.setAttribute("style", o.style === "pointille" ? (o.size > 40 ? `fill:none;stroke:${GRIS};stroke-width:1.9;stroke-dasharray:5 4` : "fill:#A9A69D")
        : `fill:${o.fill};opacity:${dernier ? 1 : f(0.86 + 0.14 * h3)}`);
      t.textContent = s[i];
    }
    if (o.coup > 0 && n > 0) el("circle", { cx: f(o.x + (n - 0.5) * pas), cy: f(o.y - o.size * 0.3), r: f(6 + 16 * o.coup), fill: "none", stroke: INK, "stroke-width": 2, opacity: f(0.5 * (1 - o.coup)) }, g);
    if (o.cur) el("rect", { x: f(o.x + n * pas + 0.08 * o.size), y: f(o.y - 0.8 * o.size), width: Math.max(3, f(o.size * 0.07)), height: f(0.8 * o.size), fill: INK }, g);
    return { fin: [f(o.x + n * pas), o.y] };
  }
  D.outils = { el, f, clamp, lerp, hash, rot, mix, gris, ombre, barre, ligne, cercle, ovale, trace, tw, frappe, MAT, INK, YEL, OMB, GRIS, TW };

  /* ═════════════════════════ (a) OBJETS SIGNATURE ═════════════════════════ */

  /* D.frappe — texte frappé (partout où l'on frappe). Ancre = début de la ligne de base.
   * o : txt, size, n (caractères visibles), style "encre" | "pointille", coup 0–1 (anneau d'impact), cur 0/1 (curseur), x, y. → { fin } */
  D.frappe = (g, o = {}) => frappe(g, Object.assign({ txt: "täglich", size: 64 }, o));
  D.frappe.essais = [{ txt: "täglich", size: 100, n: 5, coup: 0.4, cur: 1 }, { txt: "wöchentlich", size: 64, style: "pointille" }, { txt: "ENTLASSUNGSBRIEF", size: 30 }];

  /* D.paraphe — tracé d'encre. Ancre = début du tracé (kind "boucle" : centre: true pour ancrer au centre de l'ovale).
   * o : kind "sig1" | "sig2" | "oa" | "coche" | "croix" | "boucle" | "barre", p 0–1 (part tracée), w, h, sw. → { fin } */
  const SIG = {
    sig1: "M0 -6 C6 -28 20 -42 26 -28 C32 -14 16 6 10 -4 C6 -14 34 -30 46 -18 C56 -8 42 6 54 -4 C68 -18 76 -30 84 -14 C90 -2 76 4 88 -6 C102 -18 112 -26 118 -12 C122 -2 110 4 124 -6 C140 -18 152 -22 156 -10 C159 0 148 3 162 -6 C174 -14 186 -18 198 -12",
    sig2: "M0 -2 L26 -30 L38 2 L64 -24 L82 0 L126 -15 L186 -9",
    oa: "M0 0 C-2 -14 14 -16 14 -4 C14 8 0 8 2 -4 M16 2 C22 -12 34 -12 31 2 C30 10 40 8 46 -4",
    coche: "M0 0 L18 22 L58 -30",
    croix: "M0 0 L40 40 M40 0 L0 40",
  };
  const boucleD = (w, h) => `M${f(-w / 2 + 6)} ${f(-h * 0.2)} C${f(-w / 2 - 6)} ${f(-h * 0.72)} ${f(w * 0.42)} ${f(-h * 0.74)} ${f(w / 2)} ${f(-h * 0.08)} C${f(w / 2 + 8)} ${f(h * 0.62)} ${f(-w * 0.4)} ${f(h * 0.7)} ${f(-w / 2)} ${f(h * 0.1)} C${f(-w / 2 - 4)} ${f(-h * 0.3)} ${f(-w * 0.3)} ${f(-h * 0.56)} ${f(-w * 0.12)} ${f(-h * 0.56)}`;
  D.paraphe = (g, o = {}) => {
    o = Object.assign({ kind: "sig1", p: 1, w: 170, h: 44, sw: null, centre: false }, o);
    if (o.kind === "boucle") { const gg = el("g", { transform: o.centre ? null : `translate(${f(o.w / 2 - 6)} ${f(o.h * 0.2)})` }, g); trace(gg, boucleD(o.w, o.h), o.p, o.sw || 4); return { fin: [f(o.w * 0.38), f(-o.h * 0.36)], centre: o.centre ? [0, 0] : [f(o.w / 2 - 6), f(o.h * 0.2)] }; }
    if (o.kind === "barre") { trace(g, `M0 0 C${f(o.w * 0.3)} -7 ${f(o.w * 0.62)} 5 ${f(o.w)} -4`, o.p, o.sw || 5); return { fin: [o.w, -4] }; }
    trace(g, SIG[o.kind] || SIG.sig1, o.p, o.sw || (o.kind === "coche" || o.kind === "croix" ? 6 : 2.8));
    return { fin: { sig1: [198, -12], sig2: [186, -9], oa: [46, -4], coche: [58, -30], croix: [0, 40] }[o.kind] || [0, 0] };
  };
  D.paraphe.essais = [{ kind: "sig1" }, { kind: "sig2" }, { kind: "oa" }, { kind: "coche" }, { kind: "croix" }, { kind: "boucle", w: 170, h: 44 }, { kind: "boucle", w: 330, h: 40, p: 0.6 }, { kind: "barre", w: 235 }];

  /* D.brief — LA LETTRE DE SORTIE (objet-héros). 520 × 735, ancre = centre (feuille de −260…260 × −367…367).
   * o : titre 0–16 · cadre 0–1 (libellés + filets, l'un après l'autre) · age 0/1 · verl 0–1 · lignes 0–6 (barres ; décimales = barre en cours)
   *     mtx 0–17 · freq "" | "w" (pointillé gris) | "t" (encre) | "p" (bonne version) + nfreq · points 0–7 (tache jaune) · puls 0–1
   *     cercle 0–1 (boucle d'encre autour du mot) · sig1, sig2 0–1 · para 0–1 · plis 0/1 · fold 1 | 0.5 | 0 (pliée en trois)
   *     cur "titre" | "ligne" | "mtx" | "freq" | [x, y, corps] (curseur) · coup 0–1 (anneau d'impact sur le dernier caractère du titre ou du mot)
   * → { coinHG, mtx, freq, sig1, sig2, para, cur } */
  const FREQ = { t: "täglich", w: "wöchentlich", p: "1 × pro Woche, montags" };
  const LIGNES = [[-156, 380], [-132, 430], [-108, 300], [-48, 420], [-24, 360], [0, 440]];
  D.brief = (g, o = {}) => {
    o = Object.assign({ titre: 16, cadre: 1, age: 1, verl: 1, lignes: 6, mtx: 17, freq: "t", nfreq: null, points: 7, puls: 0, cercle: 0, sig1: 1, sig2: 1, para: 0, plis: 0, fold: 0, cur: null, coup: 0, seed: 21 }, o);
    const C = U.ctx(g, o.seed, false, 1), plie = o.fold > 0.01;
    const yb = !plie ? 367 : o.fold >= 0.5 ? lerp(122, -122, (o.fold - 0.5) * 2) : lerp(367, 122, o.fold * 2), vis = (y) => y < yb - 5;
    const feuille = plie ? `M-260 -367 L260 -367 L260 ${f(yb)} L-260 ${f(yb)} Z` : "M-260 -367 L260 -367 L260 333 L226 367 L-260 367 Z";
    ombre(g, plie ? `M-260 -367 L260 -367 L260 ${f(yb + 8)} L-260 ${f(yb + 8)} Z` : feuille, 8, 10);
    if (plie) for (let i = o.fold > 0.75 ? 2 : 1; i >= 1; i--) el("path", { d: `M${-257 + i} ${f(yb - 30)} L${257 - i} ${f(yb - 30)} L${257 - i} ${f(yb + i * 5)} L${-257 + i} ${f(yb + i * 5)} Z`, fill: "#F4F4EF", stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, g);   // volets repliés dessous
    U.shape(C, "feuille", feuille, MAT.white, { sw: 3, r: 0.55 });
    if (!plie) U.shape(C, "corne", "M260 333 L226 367 L226 333 Z", { base: "#E4E4DE" }, { sw: 2.2, r: 0.5 });
    if (o.plis && !plie) [-122, 122].forEach((y) => { el("rect", { x: -257, y, width: 514, height: 6, fill: "#F3F3EF" }, g); ligne(g, `M-258 ${y} L258 ${y}`, 1.2, "#CFCFC8"); });
    // en-tête imprimé : logo neutre (SANS nom) + deux lignes d'adresse
    if (vis(-289)) { U.shape(C, "logo", U.rrect(-226, -333, 44, 44, 5), MAT.grey, { sw: 2, r: 0.6 }); barre(g, 130, -333, 96, 7); barre(g, 160, -320, 66, 7); }
    // titre frappé
    const nT = clamp(Math.round(o.titre), 0, 16);
    if (vis(-292)) frappe(g, { txt: "ENTLASSUNGSBRIEF", x: -160, y: -292, size: 30, n: nT, seed: 3, coup: nT > 0 && nT < 16 ? o.coup : 0 });
    // squelette du formulaire : six éléments, l'un après l'autre
    const c6 = clamp(o.cadre, 0, 1) * 6, it = (k) => clamp(c6 - k, 0, 1);
    const lab = (txt, x, y, size, p) => { if (p > 0 && vis(y)) tw(g, txt.slice(0, Math.ceil(txt.length * p)), x, y, size); };
    const filet = (y, p, x0 = -226, x1 = 226, w = 1.5) => { if (p > 0 && vis(y)) ligne(g, `M${x0} ${y} L${f(lerp(x0, x1, p))} ${y}`, w, GRIS); };
    lab("Patient:", -226, -238, 18, it(0));
    if (it(0) > 0.5 && vis(-238)) el("rect", { x: -130, y: -252, width: f(120 * clamp(it(0) * 2 - 1, 0, 1)), height: 16, fill: INK, rx: 2 }, g);   // nom caviardé
    if (o.age && vis(-238)) tw(g, "79 J.", 0, -238, 18);
    filet(-212, it(1));
    lab("Diagnosen:", -226, -182, 18, it(2));
    lab("Verlauf:", -226, -74, 18, it(3));
    lab("Medikation:", -226, 44, 20, it(4));
    [54, 90, 137, 166].forEach((y, i) => filet(y, clamp(it(4) * 1.6 - i * 0.2, 0, 1), -226, 226, 1.3));
    if (it(4) > 0.6 && vis(151)) { barre(g, -226, 67, 300, 9); barre(g, 150, 67, 76, 9); barre(g, -226, 146, 250, 9); barre(g, 120, 146, 106, 9); }
    lab("Unterschrift:", -226, 236, 18, it(5));
    filet(290, it(5), 20, 226, 1.6); filet(290, it(5), -226, -30, 1.6);
    // cadre « VERLEGUNG → » en haut à droite
    if (o.verl > 0 && vis(-223)) {
      const p = clamp(o.verl, 0, 1);
      if (p >= 1) U.shape(C, "verl", U.rrect(85, -253, 150, 30, 4), {}, { sw: 2.2, r: 0.5 }); else trace(g, "M85 -253 L235 -253 L235 -223 L85 -223 Z", p, 2.2);
      tw(g, "VERLEGUNG".slice(0, Math.ceil(9 * p)), 96, -232, 18);
      if (p > 0.9) ligne(g, "M201 -238 L224 -238 M216 -245 L224 -238 L216 -231", 2.4);
    }
    // corps du texte : barres grises (diagnostics, déroulé)
    let cur = null;
    LIGNES.forEach(([y, w], i) => { const p = clamp(o.lignes - i, 0, 1); if (p > 0 && vis(y)) barre(g, -226, y - 5, w * p, 9); if (o.cur === "ligne" && p > 0 && (p < 1 || i === 5 || o.lignes <= i + 1)) cur = [-226 + w * p + 2, y + 4, 16]; });
    // ligne 2 du tableau : le médicament, les points de conduite, LE MOT
    const nM = clamp(Math.round(o.mtx), 0, 17), mot = FREQ[o.freq] || "", nF = o.nfreq == null ? mot.length : clamp(Math.round(o.nfreq), 0, mot.length), xF = 226 - mot.length * 10.8;
    if (vis(128)) {
      if (nM > 0) frappe(g, { txt: "Methotrexat 15 mg", x: -226, y: 112, size: 18, n: nM, seed: 5 });
      if (nM >= 17) for (let x = -30; x < (mot ? xF - 10 : 140); x += 9) el("circle", { cx: x, cy: 108, r: 1.3, fill: GRIS }, g);
      if (mot && nF > 0) frappe(g, { txt: mot, x: xF, y: 112, size: 18, n: nF, seed: 7, style: o.freq === "w" ? "pointille" : "encre", coup: nF < mot.length ? o.coup : 0 });
      // la tache jaune : petits ronds sous le mot (le seul jaune de la lettre)
      const nP = clamp(Math.round(o.points), 0, 7), pu = clamp(o.puls, 0, 1), ph = Math.round(pu * 20);
      for (let i = 0; i < nP; i++) el("circle", { cx: f(152.2 + i * 12 + (pu ? (hash(i * 5 + ph) - 0.5) * 3 * pu : 0)), cy: f(128 + (pu ? (hash(i * 9 + ph + 3) - 0.5) * 3 * pu : 0)), r: f(4.5 * (1 + 0.6 * pu)), fill: YEL, stroke: INK, "stroke-width": 1.2 }, g);
      if (o.cercle > 0 && mot) { const w = mot.length * 10.8 + 30, gg = el("g", { transform: `translate(${f(226 - mot.length * 5.4)} 108)` }, g); trace(gg, boucleD(w, 46), o.cercle, 3.2); }
    }
    // signatures (trait de DROITE : première main ; trait de GAUCHE : deuxième main) + petit paraphe du bas
    if (vis(296)) {
      if (o.sig1 > 0) trace(el("g", { transform: "translate(24 290)" }, g), SIG.sig1, o.sig1, 2.6);
      if (o.sig2 > 0) trace(el("g", { transform: "translate(-222 290)" }, g), SIG.sig2, o.sig2, 2.8);
      if (o.para > 0) trace(el("g", { transform: "translate(164 334)" }, g), SIG.oa, o.para, 2.4);
    }
    // curseur de frappe
    if (o.cur === "titre") cur = [-160 + 18 * nT + 2, -292, 30]; else if (o.cur === "mtx") cur = [-226 + 10.8 * nM + 1, 112, 18]; else if (o.cur === "freq") cur = [xF + 10.8 * nF + 1, 112, 18]; else if (Array.isArray(o.cur)) cur = [o.cur[0], o.cur[1], o.cur[2] || 18];
    if (cur && vis(cur[1])) el("rect", { x: f(cur[0]), y: f(cur[1] - 0.8 * cur[2]), width: 3, height: f(0.8 * cur[2]), fill: INK }, g);
    return { coinHG: [-260, -367], mtx: [-226, 112], freq: [170, 112], sig1: [123, 290], sig2: [-128, 290], para: [187, 330], cur: cur ? [f(cur[0]), cur[1]] : null, bas: f(yb) };
  };
  D.brief.essais = [
    { titre: 0, cadre: 0, age: 0, verl: 0, lignes: 0, mtx: 0, freq: "", points: 0, sig1: 0, sig2: 0 },
    { titre: 16, cadre: 1, age: 1, verl: 1, lignes: 3.5, mtx: 0, freq: "", points: 0, sig1: 0, sig2: 0, cur: "ligne" },
    { plis: 1 },
    { freq: "t", nfreq: 7, points: 7, puls: 1, cercle: 1, sig1: 0.6, sig2: 0, para: 1 },
    { freq: "p", points: 1, sig1: 0, sig2: 0 },
    { freq: "w", points: 0, sig1: 0, sig2: 0, mtx: 17, cur: "freq", nfreq: 6 },
    { fold: 0.5, plis: 1 }, { fold: 1 },
  ];

  /* D.briefMacro — L'INSERT sur la ligne du médicament : la même feuille vue de très près. Coordonnées MONDE (papier x 60–1020, y 520–1390).
   * o : l1 0–17 (« Methotrexat 15 mg ») · mot "" | "w" | "t" | "p" + n (caractères) · boucle 0–1 (ovale d'encre autour du mot)
   *     pts 0/1 (points de conduite à gauche du mot) · sous 0–1 (trait sous « Methotrexat ») · cur "l1" | "mot" | [x, y, corps] · coup 0–1
   * → { l1, mot (début de la ligne de base du mot), finMot, centreMot } */
  const MACRO = { t: ["täglich", 100, 880], w: ["wöchentlich", 64, 880], p: ["1 × pro Woche", 72, 840] };
  D.briefMacro = (g, o = {}) => {
    o = Object.assign({ l1: 17, mot: "t", n: null, boucle: 0, pts: 0, sous: 0, cur: null, coup: 0, seed: 23 }, o);
    const C = U.ctx(g, o.seed, false, 1), R = (x, y) => { const q = rot([x - 540, y - 955], -1); return `${f(q[0] + 540)} ${f(q[1] + 955)}`; };
    const feuille = `M${R(60, 520)} L${R(1020, 520)} L${R(1020, 1390)} L${R(60, 1390)} Z`;
    ombre(g, feuille, 10, 13); U.shape(C, "feuille", feuille, MAT.white, { sw: 3.4, r: 0.5 });
    [800, 1110].forEach((y, i) => { el("circle", { cx: 106, cy: y + 2, r: 13, fill: "#D9D6CC" }, g); U.stroke(C, "trou" + i, cercle(13, 104, y), { sw: 2, r: 0.5 }); });   // perforations de classeur
    tw(g, "Medikation:", 170, 610, 34);
    [[640, 2.2], [740, 1.6], [925, 1.6]].forEach(([y, w]) => ligne(g, `M150 ${y} L990 ${y}`, w, GRIS));
    const n1 = clamp(Math.round(o.l1), 0, 17), M = MACRO[o.mot], enMot = M && (o.n == null || o.n > 0);
    if (n1 > 0) frappe(g, { txt: "Methotrexat 15 mg", x: 170, y: 700, size: 56, n: n1, seed: 5, coup: !enMot && n1 < 17 ? o.coup : 0 });
    if (o.sous > 0) trace(g, "M172 716 C260 722 420 712 538 718", o.sous, 4.5);
    if (o.pts) for (let x = 176; x <= 420; x += 22) el("circle", { cx: x, cy: 872, r: 3.2, fill: GRIS }, g);
    let x0 = 442, y0 = 880, size = 100, nM = 0, len = 7;
    if (M) { len = M[0].length; size = M[1]; y0 = M[2]; x0 = 862 - len * 0.6 * size; nM = o.n == null ? len : clamp(Math.round(o.n), 0, len);
      if (nM > 0) frappe(g, { txt: M[0], x: x0, y: y0, size, n: nM, seed: 9, style: o.mot === "w" ? "pointille" : "encre", coup: nM < len ? o.coup : 0 }); }
    const cx = 862 - len * 0.3 * size, cy = y0 - size * 0.3;
    if (o.boucle > 0) trace(el("g", { transform: `translate(${f(cx)} ${f(cy)})` }, g), boucleD(len * 0.6 * size + 50, size * 1.3), o.boucle, 5);
    const cur = o.cur === "l1" ? [170 + n1 * 33.6 + 4, 700, 56] : o.cur === "mot" ? [x0 + nM * 0.6 * size + 0.06 * size, y0, size] : Array.isArray(o.cur) ? [o.cur[0], o.cur[1], o.cur[2] || 56] : null;
    if (cur) el("rect", { x: f(cur[0]), y: f(cur[1] - 0.8 * cur[2]), width: Math.max(4, f(cur[2] * 0.07)), height: f(0.8 * cur[2]), fill: INK }, g);
    return { l1: [170, 700], mot: [f(x0), y0], finMot: [f(x0 + nM * 0.6 * size), y0], centreMot: [f(cx), f(cy)] };
  };
  D.briefMacro.essais = [{ l1: 17, mot: "t", boucle: 1, sous: 1 }, { l1: 17, mot: "w", pts: 1 }, { l1: 17, mot: "p" }, { l1: 9, mot: "", cur: "l1", coup: 0.3 }];

  /* D.pilulier — DISPOSITIF SIGNATURE : pilulier de la semaine vu de dessus. 700 × 170, ancre = centre.
   * o : clap = indice du couvercle qui claque (−1 = aucun) · long 0–1 (« Mo » s'allonge en « Montag ») · grey 0–1. → { cases[i] }
   * Les comprimés sont des nœuds À PART (D.comprime), posés sur cases[i]. */
  D.pilulier = (g, o = {}) => {
    o = Object.assign({ clap: -1, long: 0, grey: 0, seed: 61 }, o);
    const C = U.ctx(g, o.seed, false, 1), J = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"], cases = [], boite = U.rrect(-350, -85, 700, 170, 22);
    ombre(g, boite, 9, 11); U.shape(C, "boite", boite, gris(MAT.grey, o.grey * 0.6), { sw: 3 });
    J.forEach((j, i) => {
      const x = -294 + 98 * i, lg = i === 0 ? clamp(o.long, 0, 1) : 0;
      el("path", { d: U.rrect(x - 44, -46, 88, 112, 12), fill: mix("#FFFFFF", "#E9E9E4", o.grey) }, g);
      el("path", { d: `M${x - 38} 58 L${x - 38} -32 Q${x - 38} -40 ${x - 30} -40 L${x + 38} -40`, fill: "none", stroke: "#DADAD4", "stroke-width": 7, "stroke-linecap": "round" }, g);   // profondeur de l'alvéole
      U.shape(C, "alv" + i, U.rrect(x - 44, -46, 88, 112, 12), {}, { sw: 3, r: 0.6 });
      // couvercle relevé (bande de 30 px + deux points de charnière) avec le jour (.tw 24, centré, marge de 5 px en haut) ;
      // « Montag » (6 × 14,4 = 86 px) tient dans un couvercle élargi à 100 px qui reste dans le boîtier (x ≥ −344) et ne touche pas « Di »
      const ch = i === o.clap ? 0.88 : 1, x0 = x - 44 - 6 * lg, w = 88 + 12 * lg, hc = 30 * ch, y0 = -52 - hc;
      el("path", { d: U.rrect(x0, y0, w, hc, 6), fill: OMB, transform: "translate(3 4)" }, g);
      U.shape(C, "couv" + i, U.rrect(x0, y0, w, hc, 6), gris(MAT.light, o.grey), { sw: 2.4, r: 0.6 });
      el("circle", { cx: x0 + 10, cy: -52, r: 3, fill: INK }, g); el("circle", { cx: x0 + w - 10, cy: -52, r: 3, fill: INK }, g);
      const txt = lg > 0 ? "Montag".slice(0, 2 + Math.round(4 * lg)) : j;
      tw(g, txt, x0 + w / 2, -60 + (1 - ch) * 3.5, 24, { anchor: "middle" });
      cases.push([x, 10]);
    });
    return { cases, w: 700, h: 170 };
  };
  D.pilulier.essais = [{}, { clap: 2, long: 1 }];

  /* D.comprime — comprimé jaune vu de dessus. Ancre = centre. o : r (24) · grey 0–1. */
  function comprime(g, o) {
    const r = o.r, C = U.ctx(g, o.seed || 71, false, 1);
    el("circle", { cx: f(r * 0.17), cy: f(r * 0.22), r, fill: "#C9C9C2" }, g);
    U.shape(C, "cp", cercle(r), { base: mix(YEL, "#CFCFCA", o.grey || 0), hatch: mix("#E3AE2C", "#9A9A94", o.grey || 0), gap: 5, fw: 1.2 }, { sw: 2.6, r: 0.6 });
    ligne(g, `M${f(-r * 0.62)} ${f(r * 0.12)} L${f(r * 0.62)} ${f(-r * 0.12)}`, 2.2);                                                   // barre de sécabilité
    ligne(g, `M${f(-r * 0.62)} ${f(-r * 0.3)} A${f(r * 0.7)} ${f(r * 0.7)} 0 0 1 ${f(-r * 0.2)} ${f(-r * 0.66)}`, 2.6, "#FFFFFF");       // reflet
  }
  D.comprime = (g, o = {}) => { o = Object.assign({ r: 24, grey: 0, seed: 71 }, o); comprime(g, o); return { r: o.r }; };
  D.comprime.essais = [{}, { grey: 1 }];

  /* D.rangeeDoses — rangée de 7 emplacements (pas 60) : n comprimés pleins (r 20), les autres en pointillé. 400 × 44, ancre = centre. */
  D.rangeeDoses = (g, o = {}) => {
    o = Object.assign({ n: 1, r: 20, pas: 60, grey: 0 }, o);
    for (let i = 0; i < 7; i++) {
      const x = (i - 3) * o.pas;
      if (i < o.n) comprime(el("g", { transform: `translate(${x} 0)` }, g), { r: o.r, grey: o.grey, seed: 71 + i });
      else el("circle", { cx: x, cy: 0, r: o.r, fill: "none", stroke: GRIS, "stroke-width": 2.2, "stroke-dasharray": "5 5", "stroke-linecap": "round" }, g);
    }
    return { places: [0, 1, 2, 3, 4, 5, 6].map((i) => [(i - 3) * o.pas, 0]) };
  };
  D.rangeeDoses.essais = [{ n: 1 }, { n: 7 }];

  /* D.feuillet — feuillet d'éphéméride arraché (bord haut déchiré). Ancre = centre.
   * kind "semaine" (130 × 140) : n + « WOCHE » · kind "date" (w × h) : l1, l2 (.tw, corps size) · coin 0–1 (le coin bas-droit se soulève) · grey */
  function feuilletD(w, h, seed) {
    let d = `M${-w / 2} ${f(-h / 2 + 5)}`;
    const k = Math.round(w / 11);
    for (let i = 1; i <= k; i++) d += ` L${f(-w / 2 + (w * i) / k - (i < k ? hash(i + seed) * 4 : 0))} ${f(-h / 2 + (i === k ? 4 : hash(i * 3 + seed) * 8))}`;
    return d;
  }
  D.feuillet = (g, o = {}) => {
    o = Object.assign({ kind: "semaine", n: 1, w: null, h: null, l1: "Juli 2016", l2: "", size: 28, coin: 0, grey: 0, seed: 53 }, o);
    const date = o.kind === "date", w = o.w || (date ? 190 : 130), h = o.h || (date ? 96 : 140), C = U.ctx(g, o.seed, false, 1), k = 8 + 10 * clamp(o.coin, 0, 1);
    const d = feuilletD(w, h, o.seed) + (o.coin > 0 ? ` L${w / 2} ${f(h / 2 - k)} L${f(w / 2 - k)} ${h / 2}` : ` L${w / 2} ${h / 2}`) + ` L${-w / 2} ${h / 2} Z`;
    ombre(g, d, 5, 7); U.shape(C, "f", d, { base: mix("#FFFFFF", "#E3E3DE", o.grey) }, { sw: 2.6, r: 0.5 });
    if (o.coin > 0) { ombre(g, `M${w / 2} ${f(h / 2 - k)} L${f(w / 2 - k)} ${h / 2} L${f(w / 2 - k * 0.9)} ${f(h / 2 - k * 0.9)} Z`, 3, 3, "#BDBDB6"); U.shape(C, "coin", `M${w / 2} ${f(h / 2 - k)} L${f(w / 2 - k)} ${h / 2} L${f(w / 2 - k * 0.92)} ${f(h / 2 - k * 0.92)} Z`, { base: "#ECECE7" }, { sw: 2, r: 0.4 }); }
    [-w / 4, w / 4].forEach((x) => el("path", { d: `M${f(x - 6)} ${f(-h / 2 + 7)} A6 6 0 0 0 ${f(x + 6)} ${f(-h / 2 + 7)}`, fill: "#DAD7CE", stroke: INK, "stroke-width": 1.6 }, g));   // trous de la reliure, arrachés
    if (date) {
      const s1 = o.s1 || o.size, s2 = o.s2 || o.size, b1 = o.l2 ? -s1 * 0.34 : s1 * 0.36 + 2;
      tw(g, o.l1, 0, b1, s1, { anchor: "middle" }); if (o.l2) tw(g, o.l2, 0, b1 + s2 * 1.28, s2, { anchor: "middle" });
    } else { tw(g, o.n + ".", 0, 10, 64, { anchor: "middle" }); tw(g, "WOCHE", 0, 50, 26, { anchor: "middle" }); }
    return { w, h };
  };
  D.feuillet.essais = [{ kind: "date", w: 190, h: 96, l1: "Juli 2016", l2: "Einspruch", coin: 1 }, { kind: "date", w: 150, h: 70, l1: "2013", size: 40 }, { kind: "semaine", n: 3 }];

  /* D.calendrier — bloc éphéméride pendu à un clou. Ancre = le clou (pour m.pend).
   * kind "semaine" (150 × 200, bloc de y 0 à 200 sous le clou) : grand « n. » + « WOCHE », AUCUNE date ; n 1–3, 0 = carton nu ; coin 0–1 (le coin bas-droit du feuillet se décolle)
   * kind "date" (120 × 160, S22) : « JAN 2017 », grand « 24 », « Dienstag ». */
  D.calendrier = (g, o = {}) => {
    o = Object.assign({ kind: "semaine", n: 1, coin: 0, grey: 0, seed: 57 }, o);
    const date = o.kind === "date", w = date ? 120 : 150, h = date ? 160 : 200, C = U.ctx(g, o.seed, false, 1), bh = date ? 32 : 40;
    const carton = U.rrect(-w / 2, 0, w, h, 8);
    ombre(g, carton, 7, 9); U.shape(C, "carton", carton, gris(MAT.light, o.grey), { sw: 2.8 });
    U.shape(C, "bandeau", U.rrect(-w / 2, 0, w, bh, 8), MAT.dark, { sw: 2.6 });
    [-w / 4, w / 4].forEach((x, i) => { U.stroke(C, "an" + i, `M${f(x)} ${-8} L${f(x)} ${bh * 0.55}`, { sw: 4.2, r: 0.3 }); el("circle", { cx: x, cy: bh * 0.55, r: 4.5, fill: "#F7F7F1", stroke: INK, "stroke-width": 1.6 }, g); });
    el("circle", { cx: 1.5, cy: 11, r: 6, fill: "#1C1A1C" }, g); el("circle", { cx: 0, cy: 9, r: 6, fill: "#D9D9D3", stroke: INK, "stroke-width": 2 }, g); ligne(g, "M-2.5 7 L1 6", 1.6, "#FFFFFF");   // le clou (ancre)
    const fw = w - 20, fh = h - bh - 20, fx = -fw / 2, fy = bh + 10;
    if (o.n > 0 || date) {
      const k = 10 + 16 * clamp(o.coin, 0, 1);
      for (let i = 2; i >= 1; i--) el("path", { d: U.rrect(fx + i * 1.5, fy + i * 2.5, fw, fh, 3), fill: "#F1F1EC", stroke: "#8E8B82", "stroke-width": 1.4 }, g);   // la pile de feuillets
      const d = `M${fx} ${fy} L${fx + fw} ${fy} L${fx + fw} ${fy + fh - (o.coin > 0 ? k : 0)} L${fx + fw - (o.coin > 0 ? k : 0)} ${fy + fh} L${fx} ${fy + fh} Z`;
      U.shape(C, "feuillet", d, { base: mix("#FFFFFF", "#E3E3DE", o.grey) }, { sw: 2.4, r: 0.4 });
      if (o.coin > 0) U.shape(C, "coin", `M${fx + fw} ${fy + fh - k} L${fx + fw - k} ${fy + fh} L${f(fx + fw - k * 0.9)} ${f(fy + fh - k * 0.9)} Z`, { base: "#E6E6E0" }, { sw: 1.8, r: 0.4 });
      if (date) { tw(g, "JAN 2017", 0, fy + 20, 16, { anchor: "middle" }); tw(g, "24", 0, fy + 71, 60, { anchor: "middle" }); tw(g, "Dienstag", 0, fy + 94, 16, { anchor: "middle" }); }
      else { tw(g, o.n + ".", 0, fy + 76, 64, { anchor: "middle" }); tw(g, "WOCHE", 0, fy + 116, 26, { anchor: "middle" }); }
    } else for (let i = 0; i < 4; i++) ligne(g, `M${fx + 8} ${fy + 22 + i * 26} L${fx + fw - 8} ${fy + 22 + i * 26}`, 1.4, "#BDBDB6");
    return { clou: [0, 0], feuillet: [0, fy + fh / 2], w, h };
  };
  D.calendrier.essais = [{ n: 1 }, { n: 3, coin: 1 }, { n: 0 }, { kind: "date" }];

  /* D.enveloppeJaune — l'envoi du tribunal (jaune : c'est l'un des trois seuls jaunes de l'histoire). 190 × 108, ancre = centre.
   * o : face "recto" | "verso" · mot (« STRAFBEFEHL », « EINSPRUCH ») + n (caractères frappés) · grey 0–1. */
  D.enveloppeJaune = (g, o = {}) => {
    o = Object.assign({ face: "recto", mot: "", n: null, grey: 0, seed: 41 }, o);
    const C = U.ctx(g, o.seed, false, 1), d = U.rrect(-95, -54, 190, 108, 5), jaune = gris(MAT.yellow, o.grey);
    ombre(g, d, 6, 8); U.shape(C, "env", d, jaune, { sw: 2.8, r: 0.6 });
    if (o.face === "verso") { ligne(g, "M-93 -52 L0 10 L93 -52", 2.4); ligne(g, "M-93 52 L-26 -6 M93 52 L26 -6", 1.6, "#8A6E1C"); return { w: 190, h: 108 }; }
    el("path", { d: U.rrect(-82, -8, 70, 34, 5), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2 }, g);                                  // fenêtre
    barre(g, -74, 0, 44, 4, "#BDBDB6"); barre(g, -74, 9, 54, 4, "#BDBDB6"); barre(g, -74, 18, 34, 4, "#BDBDB6");
    ligne(g, "M-82 -41 L-24 -41 M-82 -32 L-44 -32", 2, "#55524B");                                                                          // barre d'expéditeur (sans nom)
    el("rect", { x: 40, y: -44, width: 42, height: 24, fill: "none", stroke: INK, "stroke-width": 2 }, g);                                 // cadre « date de remise », vide
    if (o.mot) { const n = o.n == null ? o.mot.length : o.n; frappe(g, { txt: o.mot, x: 86 - o.mot.length * 9, y: 41, size: 15, n, seed: 11 }); }
    return { w: 190, h: 108 };
  };
  D.enveloppeJaune.essais = [{ mot: "STRAFBEFEHL" }, { face: "verso" }, { mot: "EINSPRUCH", n: 5 }];

  /* D.casquette — casquette plate vue de face (elle change la silhouette du patient). 126 × 46, ancre = milieu du bord inférieur. */
  D.casquette = (g, o = {}) => {
    o = Object.assign({ grey: 0, seed: 43 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    U.shape(C, "calotte", "M-61 -12 C-66 -30 -44 -46 0 -46 C44 -46 66 -30 61 -12 C40 -4 -40 -4 -61 -12 Z", MAT.mid, { sw: 2.6, r: 0.6 });
    ligne(g, "M-22 -44 Q-15 -26 -11 -8 M22 -44 Q15 -26 11 -8", 1.8);                                                                       // trois pans
    el("ellipse", { cx: 0, cy: -46, rx: 6, ry: 3, fill: "#55554F", stroke: INK, "stroke-width": 1.4 }, g);
    U.shape(C, "visiere", "M-42 -9 C-30 4 30 4 42 -9 C26 -4 -26 -4 -42 -9 Z", MAT.dark, { sw: 2.2, r: 0.5 });
    return { haut: [0, -46] };
  };

  /* D.fichePatient — LE PORTRAIT DU PATIENT : fiche cartonnée + photo (Persona.head à 0,40 + casquette + col de gilet). 130 × 170, ancre = centre.
   * o : expr, blink, look2 (transmis à la tête) · age 0/1 (« 79 J. ») · deuil 0/1 (coin noir) · grey 0–1 · pers = paramètres Persona (défaut : CAST.PAT) */
  const PAT = { look: "oldman", hair: "crown", hairTone: "grey", beard: "moustache", glasses: true, seed: 611 };
  D.fichePatient = (g, o = {}) => {
    o = Object.assign({ expr: "calm", blink: 0, look2: [0, 0], age: 1, deuil: 0, grey: 0, pers: null, seed: 45 }, o);
    const C = U.ctx(g, o.seed, false, 1), carte = U.rrect(-65, -85, 130, 170, 8);
    ombre(g, carte, 6, 8); U.shape(C, "carte", carte, { base: mix("#FFFFFF", "#DFDFDA", o.grey) }, { sw: 2.8, r: 0.5 });
    el("rect", { x: -53, y: -77, width: 106, height: 112, fill: mix("#EEF0EC", "#CFCFCA", o.grey) }, g);
    U.shape(C, "gilet", "M-47 35 L-47 25 Q-34 12 -12 8 L12 8 Q34 12 47 25 L47 35 Z", MAT.mid, { sw: 2, r: 0.5 });
    el("path", { d: "M-12 8 L0 31 L12 8 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, g);          // chemise dans le col en V
    const hg = el("g", { transform: "translate(0 -21) scale(0.40)" }, g);
    if (window.Persona) Persona.head(hg, Object.assign({}, PAT, o.pers || {}, { view: "front", expr: o.expr, blink: o.blink, look2: o.look2 }));
    D.casquette(el("g", { transform: "translate(0 -35) scale(0.41)" }, g), {});
    if (o.grey > 0) el("rect", { x: -53, y: -77, width: 106, height: 112, fill: "#8E8E88", opacity: f(0.34 * o.grey) }, g);
    U.shape(C, "photo", "M-53 -77 L53 -77 L53 35 L-53 35 Z", {}, { sw: 2.2, r: 0.5 });
    if (o.deuil) el("path", { d: "M53 -77 L53 -45 L21 -77 Z", fill: INK, stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, g);
    ligne(g, "M-53 44 L53 44", 1.4, GRIS);
    if (o.age) tw(g, "79 J.", 0, 70, 22, { anchor: "middle" });
    return { tete: [0, -21], haut: [0, -85], coinHG: [-46, -72] };
  };
  D.fichePatient.essais = [{ expr: "smile", look2: [0.5, 0.3] }, { expr: "calm", blink: 1, age: 0 }, { expr: "neutral", deuil: 1, grey: 1 }];

  /* D.trombone — trombone en fil d'acier. 46 × 16 × k, ancre = centre. o : k (1,5 sur la fiche ; 3,2 dans l'intro) · a (angle, degrés) · saut 0–1 */
  function trombone(g, k, a, saut) {
    const d = "M-21 -6.5 L15 -6.5 A6.7 6.7 0 0 1 15 7 L-17 7 A5 5 0 0 1 -17 -3 L11 -3 A3.2 3.2 0 0 1 11 3.5 L-12 3.5", sw = clamp(1.6 + 1.3 * k, 2.6, 6) / k, tr = `rotate(${a}) scale(${k})`, e = 1 + 1.6 * (saut || 0);
    el("path", { d, fill: "none", stroke: "#C6C6BF", "stroke-width": f(sw), "stroke-linecap": "round", "stroke-linejoin": "round", transform: `translate(${f(2.5 * Math.sqrt(k) * e)} ${f(3.5 * Math.sqrt(k) * e)}) ${tr}` }, g);
    el("path", { d, fill: "none", stroke: "#4C4A45", "stroke-width": f(sw), "stroke-linecap": "round", "stroke-linejoin": "round", transform: tr }, g);
    el("path", { d: "M-19 -6.9 L14 -6.9 M-16 -3.4 L10 -3.4", fill: "none", stroke: "#FFFFFF", "stroke-width": f(sw * 0.3), "stroke-linecap": "round", opacity: 0.85, transform: tr }, g);
  }
  D.trombone = (g, o = {}) => { o = Object.assign({ k: 1.5, a: 0, saut: 0 }, o); trombone(g, o.k, o.a, o.saut); return { w: 46 * o.k, h: 16 * o.k }; };
  D.trombone.essais = [{ k: 1.5, a: -50 }, { k: 3.2, a: -58 }];

  /* ═════════════════════════ (b) HUD PROPRE À L'ÉPISODE (storyboard § 3) ═════════════════════════ */

  /* D.ruban — ruban d'étiqueteuse : bande NOIRE, lettres blanches en relief. Ancre = bord gauche, milieu (ancre: "centre" dans le monde).
   * o : txt · size 20 (36 px de haut, largeur 13,2 × n + 28) ou 16 (30 px de haut, 10,6 × n + 24) · ancre "gauche" | "centre" */
  D.ruban = (g, o = {}) => {
    o = Object.assign({ txt: "LAUT PRESSE", size: 20, ancre: "gauche" }, o);
    const petit = o.size <= 16, size = petit ? 16 : o.size, k = size / (petit ? 16 : 20), pas = (petit ? 10.6 : 13.2) * k, pad = (petit ? 12 : 14) * k, h = (petit ? 30 : 36) * k, n = o.txt.length, w = pas * n + 2 * pad;
    const x0 = o.ancre === "centre" ? -w / 2 : 0, x1 = x0 + w, q = h / 4, t = 5 * k;
    const d = `M${f(x0)} ${f(-h / 2)} L${f(x1)} ${f(-h / 2)} L${f(x1 - t)} ${f(-q)} L${f(x1)} 0 L${f(x1 - t)} ${f(q)} L${f(x1)} ${f(h / 2)} L${f(x0)} ${f(h / 2)} L${f(x0 + t)} ${f(q)} L${f(x0)} 0 L${f(x0 + t)} ${f(-q)} Z`;
    el("path", { d, fill: "rgba(28,26,28,.22)", transform: "translate(3 4)" }, g);
    el("path", { d, fill: "#1C1A1C", stroke: "#1C1A1C", "stroke-width": 1.5, "stroke-linejoin": "round" }, g);
    ligne(g, `M${f(x0 + t + 4)} ${f(-h / 2 + 3.5)} L${f(x1 - t - 4)} ${f(-h / 2 + 3.5)}`, 1.4, "#5C5952");                                 // liseré clair du haut
    ligne(g, `M${f(x0 + t + 4)} ${f(h / 2 - 3.5)} L${f(x1 - t - 4)} ${f(h / 2 - 3.5)}`, 1, "#3A3836");
    const tx = el("text", { x: f(x0 + pad), y: f(size * 0.35), class: "tw", "font-family": TW, "font-weight": 700, "font-size": size, textLength: f(pas * n - (pas - 0.6 * size)), lengthAdjust: "spacing" }, g);
    tx.setAttribute("style", "fill:#F7F7F1;stroke:#F7F7F1;stroke-width:0.5"); tx.textContent = o.txt;
    return { w: f(w), h };
  };
  D.ruban.essais = [{ txt: "LAUT PRESSE" }, { txt: "LAUT PRESSE · REKONSTRUKTION" }, { txt: "REGEL VON HEUTE · KEINE RECHTSBERATUNG" }, { txt: "JEDER", size: 16, ancre: "centre" }, { txt: "§ 222 StGB", size: 40, ancre: "centre" }];

  /* D.chaineMains — HUD : cinq ronds r 18 (pas 46) reliés par un trait. Ancre = centre du rond 1 (écran : (780, 302)).
   * o : e = [e1, e2, e3, e4] avec 0 = vide, 1 = actif, 2 = passé (hachuré, chiffre barré) · pul = échelle du rond actif (1 ↔ 1,12)
   *     cinq 0 = absent | 1 = cercle en pointillé | 2 = plein d'encre + ✓ blanc · bat = échelle du 5e (1,35 → 1) */
  D.chaineMains = (g, o = {}) => {
    o = Object.assign({ e: [0, 0, 0, 0], pul: 1, cinq: 0, bat: 1, seed: 81 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    ligne(g, `M0 0 L${o.cinq ? 184 : 138} 0`, 2, GRIS);
    for (let i = 0; i < 4; i++) {
      const e = o.e[i] || 0, gg = el("g", { transform: `translate(${i * 46} 0)${e === 1 && o.pul !== 1 ? ` scale(${f(o.pul * 100) / 100})` : ""}` }, g), Ci = C.sub(gg);
      el("circle", { cx: 2, cy: 3, r: 18, fill: "rgba(28,26,28,.16)" }, gg);
      if (e === 2) { U.shape(Ci, "p" + i, cercle(18), MAT.mid, { sw: 2.5, r: 0.4 }); el("circle", { r: 10.5, fill: "#E4E4DF" }, gg); }
      else { el("circle", { r: 18, fill: "#FFFFFF", stroke: INK, "stroke-width": e === 1 ? 3 : 2.5 }, gg); if (e === 1) el("circle", { r: 13.6, fill: "none", stroke: INK, "stroke-width": 1.5 }, gg); }
      U.text(gg, String(i + 1), 0, 7, 20, { fill: e === 0 ? GRIS : INK });
      if (e === 2) ligne(gg, "M-12 12 L12 -12", 3);
    }
    if (o.cinq) {
      const gg = el("g", { transform: `translate(184 0)${o.bat !== 1 ? ` scale(${f(o.bat * 100) / 100})` : ""}` }, g);
      if (o.cinq >= 2) { el("circle", { cx: 2, cy: 3, r: 18, fill: "rgba(28,26,28,.16)" }, gg); el("circle", { r: 18, fill: INK, stroke: INK, "stroke-width": 2.5 }, gg); ligne(gg, "M-8 0 L-2 7 L9 -7", 3.6, "#FFFFFF"); }
      else el("circle", { r: 18, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.5, "stroke-dasharray": "5 4.4" }, gg);
    }
    return { ronds: [0, 1, 2, 3, 4].map((i) => [i * 46, 0]) };
  };
  D.chaineMains.essais = [{ e: [0, 0, 0, 0] }, { e: [2, 1, 0, 0], pul: 1.12 }, { e: [2, 2, 2, 2], cinq: 1 }, { e: [2, 2, 2, 2], cinq: 2, bat: 1.2 }];

  /* D.bordFeuille — le bord d'une grande feuille qui glisse (transitions slideLeft / slideUp) : ombre 16 px + trait d'encre + bande blanche 36 px.
   * À poser dans c.hud à (0, 0) : cote "gauche" → X −52…0 sur toute la hauteur ; cote "haut" → Y −52…0 sur toute la largeur. */
  D.bordFeuille = (g, o = {}) => {
    o = Object.assign({ cote: "gauche" }, o);
    const gg = el("g", { transform: o.cote === "haut" ? "matrix(0 1 1 0 0 0)" : null }, g), L = o.cote === "haut" ? 1160 : 2000;   // « haut » : mêmes formes, axes échangés
    el("rect", { x: -52, y: -40, width: 8, height: L, fill: "#1C1A1C", opacity: 0.06 }, gg);
    el("rect", { x: -44, y: -40, width: 8, height: L, fill: "#1C1A1C", opacity: 0.14 }, gg);
    el("rect", { x: -36, y: -40, width: 36, height: L, fill: "#FFFFFF" }, gg);
    el("rect", { x: -37.5, y: -40, width: 3, height: L, fill: INK }, gg);
    el("rect", { x: -9, y: -40, width: 1.5, height: L, fill: "#D9D9D1" }, gg);
    return { w: 52 };
  };
  D.bordFeuille.essais = [{ cote: "gauche" }, { cote: "haut" }];

  /* ═════════════════════════ (c) CADRE DE L'INTRO DE L'AUTEUR ═════════════════════════ */

  /* D.chemise — chemise cartonnée vue de dessus, sur laquelle la photo de l'auteur est tenue par un trombone. Coordonnées MONDE :
   * carton 700 × 884 (x 190–890, y 322–1206), onglet (x 230–470, y 290–324) avec une étiquette blanche VIDE, dos toilé à gauche, deux coins élastiques. */
  D.chemise = (g, o = {}) => {
    const C = U.ctx(g, 91, false, 1), carton = { base: "#DDD9CE", hatch: "#C4BFB2", gap: 12, fw: 1 };   // plus foncé que le bois du bureau A (#EDE9DF)
    const d = "M200 322 L880 322 Q890 322 890 332 L890 1196 Q890 1206 880 1206 L200 1206 Q190 1206 190 1196 L190 332 Q190 322 200 322 Z", ong = "M230 326 L238 296 Q240 290 248 290 L452 290 Q460 290 462 296 L470 326 Z";
    ombre(g, d, 11, 13); ombre(g, ong, 11, 13);
    U.shape(C, "onglet", ong, carton, { sw: 2.8 });
    el("path", { d: U.rrect(256, 297, 188, 22, 3), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g);                                 // étiquette vide
    el("path", { d: "M194 330 L886 330 L886 1200 L194 1200 Z", fill: "#F4F2EC", stroke: "#8E8B82", "stroke-width": 1.4, transform: "translate(5 5)" }, g);   // les feuilles qui dépassent
    U.shape(C, "carton", d, carton, { sw: 3.2 });
    U.shape(C, "dos", "M190 332 Q190 322 200 322 L236 322 L236 1206 L200 1206 Q190 1206 190 1196 Z", MAT.mid, { sw: 2.6 });                 // dos toilé
    for (let y = 346; y < 1196; y += 26) el("path", { d: `M243 ${y} L243 ${y + 12}`, stroke: "#8E8B82", "stroke-width": 1.6, "stroke-linecap": "round" }, g);
    [[890, 322, 1], [890, 1206, -1]].forEach(([x, y, s], i) => {                                                                              // coins élastiques
      U.shape(C, "el" + i, `M${x - 86} ${y} L${x - 66} ${y} L${x} ${y + s * 66} L${x} ${y + s * 86} Z`, MAT.dark, { sw: 2.2, r: 0.5 });
    });
    el("path", { d: "M258 344 L850 344 Q868 344 868 362 L868 1166 Q868 1184 850 1184 L258 1184 Z", fill: "none", stroke: "#A9A497", "stroke-width": 1.6, "stroke-dasharray": "9 7", "stroke-linecap": "round" }, g);   // piqûre
    return { centre: [540, 764] };
  };

  /* ═════════════════════════ (d) BUREAUX VUS DE DESSUS (S1–S7) ═════════════════════════ */

  /* D.plateau — fond qui déborde (x −240…1320, y −240…2160), coordonnées MONDE. kind "A" (Lehrte : bois clair à lames),
   * "B" (2e clinique : sous-main quadrillé x 120–960, y 520–1400), "C" (justice : sous-main sombre x 110–970, y 515–1405). Fixe. */
  D.plateau = (g, o = {}) => {
    o = Object.assign({ kind: "A" }, o);
    const C = U.ctx(g, 101, false, 1), fond = (col) => el("rect", { x: -240, y: -240, width: 1560, height: 2400, fill: col }, g);
    if (o.kind === "B") {
      fond("#E9ECEA");
      const d = U.rrect(120, 520, 840, 880, 20);
      ombre(g, d, 7, 9, "#CDD2CF"); el("path", { d, fill: "#F5F7F5" }, g);
      for (let x = 180; x < 960; x += 60) ligne(g, `M${x} 523 L${x} 1397`, 1.3, "#CBD2CF");
      for (let y = 580; y < 1400; y += 60) ligne(g, `M123 ${y} L957 ${y}`, 1.3, "#CBD2CF");
      U.shape(C, "sousmain", d, {}, { sw: 3, r: 0.5 });
      U.shape(C, "cuirG", "M120 1310 L210 1400 L140 1400 Q120 1400 120 1380 Z", MAT.mid, { sw: 2.4, r: 0.5 });
      U.shape(C, "cuirD", "M960 1310 L870 1400 L940 1400 Q960 1400 960 1380 Z", MAT.mid, { sw: 2.4, r: 0.5 });
      return { zone: [120, 520, 960, 1400] };
    }
    if (o.kind === "C") {
      fond("#E4E1DA");
      const d = U.rrect(110, 515, 860, 890, 18);
      ombre(g, d, 8, 10, "#C9C5BB"); U.shape(C, "sousmain", d, MAT.mid, { sw: 3 });
      el("path", { d: U.rrect(124, 529, 832, 862, 10), fill: "none", stroke: "#FFFFFF", "stroke-width": 3 }, g);
      el("path", { d: U.rrect(136, 541, 808, 838, 6), fill: "none", stroke: "#55554F", "stroke-width": 1.6, "stroke-dasharray": "7 6" }, g);   // piqûres
      return { zone: [110, 515, 970, 1405] };
    }
    fond("#EDE9DF");
    for (let k = -2; k < 13; k++) {                                           // lames horizontales : joint tous les 172 px
      const y = 40 + 172 * k;
      let d = `M-240 ${y}`; for (let x = -120; x <= 1320; x += 120) d += ` L${x} ${f(y + (hash(k * 13 + x) - 0.5) * 3)}`;
      ligne(g, d, 2.5, "#CFC8B8");
      const xb = 150 + Math.round(hash(k * 7 + 1) * 780); ligne(g, `M${xb} ${y} L${xb + 2} ${y + 172}`, 2, "#CFC8B8");                  // about de lame
      for (let v = 0; v < 3; v++) {                                           // trois veines fines par lame
        const yv = y + 38 + v * 46 + (hash(k * 5 + v) - 0.5) * 14, x0 = -240 + hash(k * 3 + v * 11) * 500, x1 = x0 + 500 + hash(k + v * 17) * 800;
        ligne(g, `M${f(x0)} ${f(yv)} C${f(lerp(x0, x1, 0.3))} ${f(yv - 5)} ${f(lerp(x0, x1, 0.65))} ${f(yv + 6)} ${f(x1)} ${f(yv - 1)}`, 1.2, "#DDD6C6");
      }
    }
    [[210, 380], [905, 610], [150, 905], [735, 1420], [420, 1560]].forEach(([x, y], i) => {                                               // cinq nœuds du bois
      el("ellipse", { cx: x, cy: y, rx: 18, ry: 10, fill: "#E2DBC9", stroke: "#C6BEAB", "stroke-width": 2, transform: `rotate(${i * 9 - 14} ${x} ${y})` }, g);
      el("ellipse", { cx: x + 1, cy: y, rx: 8, ry: 4, fill: "#D3CAB5", transform: `rotate(${i * 9 - 14} ${x} ${y})` }, g);
      ligne(g, `M${x - 46} ${y - 3} C${x - 22} ${y - 19} ${x + 22} ${y - 19} ${x + 46} ${y - 2} M${x - 44} ${y + 5} C${x - 20} ${y + 19} ${x + 22} ${y + 18} ${x + 46} ${y + 4}`, 1.2, "#DDD6C6");
    });
    return {};
  };
  D.plateau.essais = [{ kind: "A" }, { kind: "B" }, { kind: "C" }];

  /* D.halo — flaque de lumière de la lampe (dégradé radial blanc). Ancre = centre. o : r (300–420), op (0,34).
   * Dessiné une fois : le rayon et l'opacité s'animent sur le nœud (s.s, s.o). */
  D.halo = (g, o = {}) => {
    o = Object.assign({ r: 400, op: 0.34 }, o);
    const gr = el("radialGradient", { id: "ep06halo" }, el("defs", {}, g));
    el("stop", { offset: "0%", "stop-color": "#FFFFFF", "stop-opacity": 1 }, gr); el("stop", { offset: "45%", "stop-color": "#FFFFFF", "stop-opacity": 0.72 }, gr); el("stop", { offset: "100%", "stop-color": "#FFFFFF", "stop-opacity": 0 }, gr);
    el("circle", { r: o.r, fill: "url(#ep06halo)", opacity: o.op }, g);
    return { r: o.r };
  };

  /* D.lampe — lampe d'architecte vue de dessus. Ancre = centre de l'abat-jour (r 56) ; base à (−130, −170) (pivot du « swing »).
   * kind "banquier" (bureau C) : abat-jour allongé 150 × 60 + pied ; chaine 0/1 ; kind "chainette" = la chaînette seule (ancre = son attache). */
  function chainette(g) {
    for (let i = 0; i < 7; i++) el("circle", { cx: f(Math.sin(i * 0.9) * 1.5), cy: 5 + i * 7, r: 2.6, fill: "#F1F1EC", stroke: INK, "stroke-width": 1.4 }, g);
    el("path", { d: "M-5 56 L5 56 L3 70 L-3 70 Z", fill: "#55554F", stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, g);
  }
  D.lampe = (g, o = {}) => {
    o = Object.assign({ kind: "ronde", chaine: 1, seed: 131 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    if (o.kind === "chainette") { chainette(g); return { bout: [0, 70] }; }
    if (o.kind === "banquier") {
      el("ellipse", { cx: 8, cy: 44, rx: 50, ry: 26, fill: OMB }, g);
      U.shape(C, "pied", ovale(48, 24, 0, 34), MAT.light, { sw: 2.6 });
      ombre(g, U.rrect(-75, -30, 150, 60, 28), 14, 17);
      U.shape(C, "abat", U.rrect(-75, -30, 150, 60, 28), MAT.mid, { sw: 3 });
      ligne(g, "M-56 -16 Q0 -26 56 -16", 2.6, "#F1F1EC"); el("circle", { cx: -66, cy: 0, r: 4, fill: INK }, g); el("circle", { cx: 66, cy: 0, r: 4, fill: INK }, g);
      if (o.chaine) chainette(el("g", { transform: "translate(52 28)" }, g));
      return { attache: [52, 28], base: [0, 34] };
    }
    const bras = "M-130 -170 L-112 -62 L0 0";
    el("path", { d: bras, fill: "none", stroke: OMB, "stroke-width": 16, "stroke-linecap": "round", "stroke-linejoin": "round", transform: "translate(9 11)" }, g);
    el("circle", { cx: 17, cy: 21, r: 56, fill: OMB }, g);                                       // l'abat-jour est haut au-dessus du plateau : ombre écartée
    ombre(g, cercle(24, -130, -170), 5, 6);
    U.shape(C, "base", cercle(24, -130, -170), MAT.mid, { sw: 2.8 }); el("circle", { cx: -130, cy: -170, r: 9, fill: "#F1F1EC", stroke: INK, "stroke-width": 2 }, g);
    el("path", { d: bras, fill: "none", stroke: INK, "stroke-width": 14, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
    el("path", { d: bras, fill: "none", stroke: "#DADAD5", "stroke-width": 8.5, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
    let res = "M-141 -160"; for (let i = 1; i <= 12; i++) res += ` L${f(-141 + i * 1.5 + (i % 2 ? 7 : -1))} ${f(-160 + i * 7.6)}`;   // ressort le long du premier segment
    ligne(g, res, 1.8, "#55524B");
    el("circle", { cx: -112, cy: -62, r: 9.5, fill: "#F1F1EC", stroke: INK, "stroke-width": 2.4 }, g); ligne(g, "M-116 -66 L-108 -58", 2);
    U.shape(C, "abat", cercle(56), MAT.grey, { sw: 3 });
    el("circle", { r: 30, fill: "#FFFDF2", stroke: INK, "stroke-width": 2.2 }, g); el("circle", { r: 13, fill: "#FFFFFF", stroke: "#C9C6BC", "stroke-width": 1.6 }, g);
    ligne(g, "M-44 -22 A49 49 0 0 1 -14 -47", 3, "#FFFFFF");
    return { base: [-130, -170], coude: [-112, -62] };
  };
  D.lampe.essais = [{}, { kind: "banquier" }, { kind: "chainette" }];

  /* D.clavier — clavier vu de dessus. 470 × 96, ancre = centre. o : touche [rangée 0–2, colonne 0–11] ou [2, "espace"] = touche enfoncée. */
  D.clavier = (g, o = {}) => {
    o = Object.assign({ touche: null, seed: 111 }, o);
    const C = U.ctx(g, o.seed, false, 1), d = U.rrect(-235, -48, 470, 96, 10), x0 = -218.5, T = o.touche;
    ombre(g, d, 7, 9); U.shape(C, "boitier", d, MAT.grey, { sw: 2.8 });
    const key = (x, y, w, h, on) => { const k = on ? 0.92 : 1, cx = x + w / 2, cy = y + h / 2;
      if (!on) el("rect", { x: x + 1.5, y: y + 2.5, width: w, height: h, rx: 4, fill: "#8E8B82" }, g);
      el("rect", { x: f(cx - w * k / 2), y: f(cy - h * k / 2 + (on ? 1.5 : 0)), width: f(w * k), height: f(h * k), rx: 4, fill: on ? "#BDBDB6" : "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g); };
    for (let r = 0; r < 3; r++) for (let c = 0; c < 12; c++) { if (r === 2 && c > 2 && c < 9) continue; key(x0 + c * 37, -39 + r * 29, 30, 24, !!T && T[0] === r && T[1] === c); }
    key(x0 + 118.5, 20, 200, 22, !!T && T[0] === 2 && T[1] === "espace");
    return { w: 470, h: 96 };
  };
  D.clavier.essais = [{}, { touche: [1, 4] }];

  /* D.tasse — tasse de café vue de dessus (bord r 56, café r 44, anse à droite). Ancre = centre.
   * o : refl = angle du reflet (il tourne lentement) · onde 0–1 (onde concentrique aux chocs). La vapeur est à part : D.vapeur. */
  D.tasse = (g, o = {}) => {
    o = Object.assign({ refl: 30, onde: 0, seed: 121 }, o);
    const C = U.ctx(g, o.seed, false, 1), anse = "M46 -17 L70 -17 Q88 -17 88 0 Q88 17 70 17 L46 17 L46 7 L68 7 Q76 7 76 0 Q76 -7 68 -7 L46 -7 Z";
    el("circle", { cx: 10, cy: 12, r: 57, fill: OMB }, g); ombre(g, anse, 10, 12);
    U.shape(C, "anse", anse, MAT.white, { sw: 2.6, r: 0.6 });
    U.shape(C, "bord", cercle(56), MAT.white, { sw: 3 });
    el("circle", { r: 48, fill: "#ECECE7" }, g);
    U.shape(C, "cafe", cercle(44), MAT.dark, { sw: 2.4, r: 0.6 });
    const a0 = o.refl * Math.PI / 180, a1 = a0 + 0.95, R = 33;
    ligne(g, `M${f(Math.cos(a0) * R)} ${f(Math.sin(a0) * R)} A${R} ${R} 0 0 1 ${f(Math.cos(a1) * R)} ${f(Math.sin(a1) * R)}`, 4.5, "#C9C9C2", { opacity: 0.85 });
    if (o.onde > 0 && o.onde < 1) el("circle", { r: f(8 + 30 * o.onde), fill: "none", stroke: "#DADAD5", "stroke-width": 2.2, opacity: f(1 - o.onde) }, g);
    return { r: 56 };
  };
  D.tasse.essais = [{}, { refl: 200, onde: 0.5 }];

  /* D.vapeur — n volutes en S qui montent vers le haut-droit (60 px) et s'effacent. Ancre = centre de la tasse. o : ph 0–1 (cycle), n (3). */
  D.vapeur = (g, o = {}) => {
    o = Object.assign({ ph: 0.35, n: 3 }, o);
    for (let i = 0; i < o.n; i++) {
      const p = (((o.ph + i / o.n) % 1) + 1) % 1, x = -16 + i * 16 + 22 * p, y = -6 - 60 * p, op = Math.sin(p * Math.PI);
      const d = `M${f(x)} ${f(y)} c9 -9 -9 -17 0 -26 c9 -9 -9 -17 0 -26`;
      ligne(g, d, 6, "#FFFFFF", { opacity: f(0.85 * op) }); ligne(g, d, 1.6, "#B9B5A9", { opacity: f(0.8 * op) });
    }
    return {};
  };
  D.vapeur.essais = [{ ph: 0.2 }];

  /* D.plante — plante en pot vue de dessus (pot r 26, rosette de 7 feuilles). r 50, ancre = centre. (kind "face", S18 : à faire.) */
  D.plante = (g, o = {}) => {
    const C = U.ctx(g, 141, false, 1);
    el("circle", { cx: 9, cy: 11, r: 46, fill: OMB }, g);
    U.shape(C, "pot", cercle(26), MAT.mid, { sw: 2.6 }); el("circle", { r: 19, fill: "#4A4A46" }, g);
    for (let i = 0; i < 7; i++) U.shape(C.sub(el("g", { transform: `rotate(${f(i * 51.4 + (hash(i) - 0.5) * 16)})` }, g)), "f" + i, "M7 0 Q28 -14 53 0 Q28 14 7 0 Z", MAT.grey, { sw: 2.2, r: 0.6 });
    for (let i = 0; i < 7; i++) ligne(el("g", { transform: `rotate(${f(i * 51.4 + (hash(i) - 0.5) * 16)})` }, g), "M12 0 L46 0", 1.4);
    for (let i = 0; i < 4; i++) U.shape(C.sub(el("g", { transform: `rotate(${i * 90 + 28})` }, g)), "p" + i, "M2 0 Q14 -8 28 0 Q14 8 2 0 Z", MAT.light, { sw: 1.8, r: 0.5 });
    return { r: 50 };
  };

  /* D.encreur — boîte à encre en métal, couvercle ouvert dressé le long du bord du haut. 104 × 92, ancre = centre de la boîte. */
  D.encreur = (g, o = {}) => {
    const C = U.ctx(g, 151, false, 1), d = U.rrect(-52, -38, 104, 76, 7);
    ombre(g, U.rrect(-52, -54, 104, 92, 7), 6, 8);
    U.shape(C, "couv", U.rrect(-52, -54, 104, 18, 5), MAT.light, { sw: 2.4 }); el("circle", { cx: -34, cy: -37, r: 3, fill: INK }, g); el("circle", { cx: 34, cy: -37, r: 3, fill: INK }, g);
    U.shape(C, "boite", d, MAT.mid, { sw: 2.8 });
    U.shape(C, "feutre", U.rrect(-42, -28, 84, 56, 4), MAT.dark, { sw: 2.2, r: 0.5 });
    ligne(g, "M-34 -20 L10 -20", 2, "#8E8B82");
    return { w: 104, h: 92 };
  };

  /* D.tampon — tampon vu de dessus (socle bois 96 × 46 + bouton r 24). Ancre = centre. o : h 0–1 = hauteur (ombre 6 + 22·h, échelle 1 + 0,08·h) · a.
   * Dans cet épisode il ne frappe JAMAIS le papier. */
  D.tampon = (g, o = {}) => {
    o = Object.assign({ h: 0, a: 0, seed: 161 }, o);
    const k = 1 + 0.08 * o.h, tr = `rotate(${o.a}) scale(${f(k * 100) / 100})`, d = U.rrect(-48, -23, 96, 46, 8), e = 6 + 22 * o.h;
    el("path", { d, fill: OMB, transform: `translate(${f(e * 0.8)} ${f(e)}) ${tr}` }, g);
    const gg = el("g", { transform: tr }, g), C = U.ctx(gg, o.seed, false, 1);
    U.shape(C, "socle", d, MAT.wood, { sw: 2.8 }); ligne(gg, "M-40 -15 L40 -15 M-40 15 L40 15", 1.4, "#8E8B82");
    el("circle", { cx: 3, cy: 4, r: 24, fill: "rgba(28,26,28,.18)" }, gg);
    U.shape(C, "bouton", cercle(24), MAT.mid, { sw: 2.6 }); el("circle", { r: 11, fill: "#E9E9E3", stroke: INK, "stroke-width": 1.8 }, gg); ligne(gg, "M-16 -10 A19 19 0 0 1 -4 -18", 2.4, "#FFFFFF");
    return { w: 96, h: 46 };
  };
  D.tampon.essais = [{}, { h: 1, a: -8 }];

  /* D.coupelle — coupelle r 44 avec 5 trombones en vrac + 2 trombones libres à côté ((−25, 70) et (31, 88)). Ancre = centre.
   * o : saut 0–1 (les trombones sautent de 6 px aux chocs) · libres 0/1 */
  D.coupelle = (g, o = {}) => {
    o = Object.assign({ saut: 0, libres: 1, seed: 171 }, o);
    const C = U.ctx(g, o.seed, false, 1), dy = -6 * o.saut;
    el("circle", { cx: 7, cy: 9, r: 44, fill: OMB }, g);
    U.shape(C, "coupe", cercle(44), MAT.light, { sw: 2.8 }); el("circle", { r: 34, fill: "#F7F7F3", stroke: "#8E8B82", "stroke-width": 1.6 }, g);
    [[-12, -10, 28], [12, 6, -52], [-6, 14, 80], [14, -14, 8], [-16, 4, -20]].forEach(([x, y, a]) => trombone(el("g", { transform: `translate(${x} ${f(y + dy)})` }, g), 0.85, a, o.saut));
    if (o.libres) { trombone(el("g", { transform: `translate(-25 ${f(70 + dy)})` }, g), 1, 22, o.saut); trombone(el("g", { transform: `translate(31 ${f(88 + dy)})` }, g), 1, -34, o.saut); }
    return { r: 44, libres: [[-25, 70], [31, 88]] };
  };
  D.coupelle.essais = [{}, { saut: 1 }];

  /* D.stylo — stylo vu de dessus, longueur 190. Ancre = la POINTE ; le corps part dans la direction a (degrés : 0 = vers le bas, −24 = bas-droite).
   * kind "plume" (ouvert 0/1 ; cap "cote" | "arriere") · "clic" (clic 0/1 : poussoir enfoncé) · "bille" · "crayon" (intro). */
  function stylo(gg, C, o) {
    const kind = o.kind;
    if (kind === "plume") {
      U.shape(C, "corps", U.rrect(-8, 58, 16, 132, 7), MAT.robe, { sw: 2.2, r: 0.5 });
      el("rect", { x: -8, y: 53, width: 16, height: 7, rx: 2, fill: "#F1F1EC", stroke: INK, "stroke-width": 1.6 }, gg);
      if (o.ouvert) {
        U.shape(C, "section", U.rrect(-6, 28, 12, 26, 3), MAT.dark, { sw: 1.8, r: 0.4 });
        el("path", { d: "M0 0 L6.5 15 L4.5 30 L-4.5 30 L-6.5 15 Z", fill: "#F7F7F1", stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, gg); ligne(gg, "M0 3 L0 20", 1.2); el("circle", { cx: 0, cy: 21, r: 1.6, fill: INK }, gg);
        if (o.cap === "arriere") { U.shape(C, "cap", U.rrect(-10, 132, 20, 64, 8), MAT.robe, { sw: 2.2, r: 0.5 }); el("rect", { x: -10, y: 132, width: 20, height: 6, fill: "#F1F1EC", stroke: INK, "stroke-width": 1.4 }, gg); ligne(gg, "M5 142 L5 186", 2.4, "#F1F1EC"); }
      } else { U.shape(C, "cap", U.rrect(-10, -4, 20, 66, 8), MAT.robe, { sw: 2.2, r: 0.5 }); el("rect", { x: -10, y: 56, width: 20, height: 6, fill: "#F1F1EC", stroke: INK, "stroke-width": 1.4 }, gg); ligne(gg, "M5 4 L5 50", 2.4, "#F1F1EC"); }
    } else if (kind === "clic") {
      el("path", { d: "M0 0 L5 15 L-5 15 Z", fill: "#CFCFCA", stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, gg);
      el("rect", { x: -4, y: 174, width: 8, height: o.clic ? 6 : 15, rx: 2, fill: "#CFCFCA", stroke: INK, "stroke-width": 1.6 }, gg);
      U.shape(C, "corps", U.rrect(-7, 14, 14, 162, 4), MAT.white, { sw: 2.2, r: 0.5 });
      U.shape(C, "grip", U.rrect(-7.5, 22, 15, 36, 4), MAT.grey, { sw: 1.8, r: 0.4 });
      el("rect", { x: 3.5, y: 104, width: 5.5, height: 62, rx: 2, fill: "#CFCFCA", stroke: INK, "stroke-width": 1.5 }, gg); ligne(gg, "M-7 100 L7 100", 1.6);
    } else if (kind === "crayon") {
      el("path", { d: "M-2.6 9 L2.6 9 L7 30 L-7 30 Z", fill: "#F4F1E8", stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, gg); el("path", { d: "M0 0 L2.8 9.5 L-2.8 9.5 Z", fill: INK, stroke: INK, "stroke-width": 1.2, "stroke-linejoin": "round" }, gg);
      U.shape(C, "corps", "M-7 30 L7 30 L7 164 L-7 164 Z", MAT.light, { sw: 2, r: 0.4 }); ligne(gg, "M-2.4 32 L-2.4 162 M2.4 32 L2.4 162", 1.1, "#8E8B82");
      el("rect", { x: -7.5, y: 162, width: 15, height: 12, fill: "#CFCFCA", stroke: INK, "stroke-width": 1.6 }, gg); ligne(gg, "M-7 166 L7 166 M-7 170 L7 170", 1, "#55524B");
      el("path", { d: U.rrect(-7, 174, 14, 16, 5), fill: "#E9E9E3", stroke: INK, "stroke-width": 1.8 }, gg);
    } else {   // bille
      el("path", { d: "M0 0 L5 16 L-5 16 Z", fill: "#F1F1EC", stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, gg);
      U.shape(C, "corps", U.rrect(-7, 16, 14, 152, 3), MAT.grey, { sw: 2.2, r: 0.5 }); ligne(gg, "M-7 30 L7 30 M-7 36 L7 36 M-7 42 L7 42", 1.3, "#55524B");
      el("rect", { x: 3.5, y: 112, width: 5.5, height: 52, rx: 2, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.5 }, gg);
      U.shape(C, "bout", U.rrect(-7, 166, 14, 24, 6), MAT.dark, { sw: 2, r: 0.4 });
    }
  }
  D.stylo = (g, o = {}) => {
    o = Object.assign({ kind: "bille", a: -24, ouvert: 0, clic: 0, cap: "cote", seed: 181 }, o);
    const tr = `rotate(${o.a})`;
    el("path", { d: U.rrect(-8, 3, 16, 187, 6), fill: OMB, transform: `translate(5 7) ${tr}` }, g);
    const gg = el("g", { transform: tr }, g), C = U.ctx(gg, o.seed, false, 1);
    stylo(gg, C, o);
    if (o.kind === "plume" && o.ouvert && o.cap === "cote") {   // capuchon posé à côté
      const q = rot([34, 96], o.a), gc = el("g", { transform: `translate(${f(q[0])} ${f(q[1])}) rotate(${o.a + 16})` }, g), Cc = U.ctx(gc, o.seed + 1, false, 1);
      el("path", { d: U.rrect(-10, -32, 20, 64, 8), fill: OMB, transform: "translate(4 6)" }, gc);
      U.shape(Cc, "cap", U.rrect(-10, -32, 20, 64, 8), MAT.robe, { sw: 2.2, r: 0.5 }); el("rect", { x: -10, y: 26, width: 20, height: 6, fill: "#F1F1EC", stroke: INK, "stroke-width": 1.4 }, gc); ligne(gc, "M5 -24 L5 20", 2.4, "#F1F1EC");
    }
    return { pointe: [0, 0], bout: rot([0, 190], o.a).map(f) };
  };
  D.stylo.essais = [{ kind: "bille" }, { kind: "plume", ouvert: 1 }, { kind: "plume", ouvert: 0, a: 60 }, { kind: "clic", a: 0 }, { kind: "crayon", a: -58 }];

  /* ═════════════════════════ LA CARTE (S5) ═════════════════════════ */

  /* D.cartePapier — carte routière dépliée sur le bureau. Coordonnées MONDE : feuille 780 × 800 (x 150–930, y 545–1345), 2 plis verticaux,
   * 1 pli horizontal, coin haut-droit qui rebique (coin 0–1), rose des vents r 44 à (235, 640), barre d'échelle SANS chiffres (x 330–470, y 1308).
   * o : aiguille 0/1 (0 : l'aiguille est un nœud à part, D.aiguille, pour m.sway) · coin 0–1 */
  D.cartePapier = (g, o = {}) => {
    o = Object.assign({ aiguille: 1, coin: 0.5, seed: 191 }, o);
    const C = U.ctx(g, o.seed, false, 1), k = 44 + 14 * clamp(o.coin, 0, 1), d = `M150 545 L${930 - k} 545 L930 ${545 + k} L930 1345 L150 1345 Z`;
    ombre(g, "M150 545 L930 545 L930 1345 L150 1345 Z", 9, 12);
    U.shape(C, "carte", d, { base: "#FBFAF5" }, { sw: 3, r: 0.5 });
    el("rect", { x: 410, y: 548, width: 260, height: 396, fill: "#F3F2EB" }, g); el("rect", { x: 152, y: 946, width: 258, height: 397, fill: "#F3F2EB" }, g); el("rect", { x: 670, y: 946, width: 258, height: 397, fill: "#F3F2EB" }, g);   // panneaux dans l'ombre des plis
    [[-1, 700], [1, 860], [-1, 1040], [1, 1200]].forEach(([s, y], i) => ligne(g, `M156 ${y} C400 ${y + s * 16} 700 ${y - s * 14} 924 ${y + s * 6}`, 1.1, "#E2DFD4"));                // parallèles
    [270, 540, 800].forEach((x, i) => ligne(g, `M${x} 552 C${x + 14} 800 ${x - 12} 1100 ${x + 6} 1340`, 1.1, "#E2DFD4"));                                                        // méridiens
    ligne(g, "M410 548 L410 1343 M670 548 L670 1343 M152 945 L928 945", 1.6, "#C9C6BC");
    ombre(g, `M${930 - k} 545 L930 ${545 + k} L${930 - k * 0.86} ${545 + k * 0.86} Z`, -4, 5, "#D6D3C9");
    U.shape(C, "coin", `M${930 - k} 545 L930 ${545 + k} L${f(930 - k * 0.9)} ${f(545 + k * 0.9)} Z`, { base: "#EFEDE5" }, { sw: 2.4, r: 0.5 });
    // rose des vents
    const R = el("g", { transform: "translate(235 640)" }, g);
    el("circle", { r: 44, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, R); el("circle", { r: 36, fill: "none", stroke: GRIS, "stroke-width": 1.2, "stroke-dasharray": "2 5" }, R);
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, r0 = i % 2 ? 38 : 34; ligne(R, `M${f(Math.cos(a) * r0)} ${f(Math.sin(a) * r0)} L${f(Math.cos(a) * 43)} ${f(Math.sin(a) * 43)}`, 1.6); }
    U.text(R, "N", 0, -50, 20, {});
    if (o.aiguille) D.aiguille(R, {});
    // barre d'échelle sans chiffres
    el("rect", { x: 330, y: 1302, width: 140, height: 10, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g); el("rect", { x: 330, y: 1302, width: 35, height: 10, fill: INK }, g); el("rect", { x: 400, y: 1302, width: 35, height: 10, fill: INK }, g);
    return { rose: [235, 640], coin: [930, 545] };
  };
  /* D.aiguille — l'aiguille de la rose des vents (losange noir / blanc). Ancre = son pivot. */
  D.aiguille = (g, o = {}) => {
    el("path", { d: "M0 -31 L8 0 L-8 0 Z", fill: INK, stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, g);
    el("path", { d: "M0 31 L8 0 L-8 0 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, g);
    el("circle", { r: 3.4, fill: "#F7F7F1", stroke: INK, "stroke-width": 1.6 }, g);
    return {};
  };

  /* D.medaillon — médaillon-loupe « Region Hannover » : disque blanc r 130, double bord, relié par deux traits au point de la grande carte.
   * Ancre = centre. o : vers [dx, dy] = le point de la carte vu du centre (défaut : (400, 874) vu de (770, 760)) · traits 0/1.
   * Dedans : routes en traits gris très clairs (SCHÉMA, sans échelle, sans nom). Repères posés par la scène : Hannover (−78, 12), hôpital (42, −18). */
  D.medaillon = (g, o = {}) => {
    o = Object.assign({ vers: [-370, 114], traits: 1, seed: 201 }, o);
    const C = U.ctx(g, o.seed, false, 1), [px, py] = o.vers, dist = Math.hypot(px, py);
    if (o.traits && dist > 135) {   // les deux tangentes du point au disque
      const a = Math.atan2(py, px), b = Math.acos(130 / dist);
      [a + b, a - b].forEach((t) => ligne(g, `M${px} ${py} L${f(Math.cos(t) * 130)} ${f(Math.sin(t) * 130)}`, 2, INK, { "stroke-dasharray": "9 7" }));
    }
    el("circle", { cx: 9, cy: 11, r: 131, fill: OMB }, g);
    el("circle", { r: 130, fill: "#FFFFFF" }, g);
    el("clipPath", { id: "ep06med" }, el("defs", {}, g)).appendChild(el("circle", { r: 124 }));
    const R = el("g", { "clip-path": "url(#ep06med)" }, g);
    ["M-140 40 C-110 30 -96 18 -78 12 C-40 0 0 -10 42 -18 C80 -26 110 -30 140 -48", "M-90 -140 C-84 -80 -82 -30 -78 12 C-74 50 -60 100 -40 140", "M-140 -40 C-112 -20 -96 -4 -78 12 C-40 46 20 84 90 140",
      "M20 -140 C30 -90 36 -50 42 -18 C50 20 70 70 76 140", "M-30 -140 C10 -100 80 -80 140 -84"].forEach((d, i) => { ligne(R, d, i < 2 ? 9 : 6, "#E4E2DA"); ligne(R, d, i < 2 ? 5 : 3, "#F6F5F0"); });
    ligne(R, "M-140 96 C-60 70 40 100 140 60", 2, "#DAD8CF", { "stroke-dasharray": "10 6" });                    // voie ferrée
    el("ellipse", { cx: -78, cy: 12, rx: 40, ry: 30, fill: "none", stroke: "#E4E2DA", "stroke-width": 5 }, R);   // rocade
    U.shape(C, "bord", cercle(130), {}, { sw: 3.2, r: 0.4 }); el("circle", { r: 122, fill: "none", stroke: INK, "stroke-width": 1.4 }, g);
    ligne(g, "M-98 -62 A116 116 0 0 1 -40 -108", 3, "#FFFFFF");
    return { hannover: [-78, 12], klinik: [42, -18], lettre: [76, 32], point: [px, py] };
  };

  /* D.iconeKlinik — petit hôpital vu de face (3 × 2 fenêtres, porte, enseigne « + » à l'encre : pas de croix rouge, pas de nom). ≈ 60 × 60, ancre = milieu du bas. */
  D.iconeKlinik = (g, o = {}) => {
    const C = U.ctx(g, 211, false, 1);
    ombre(g, "M-30 -44 L30 -44 L30 0 L-30 0 Z", 5, 4);
    ligne(g, "M0 -46 L0 -52", 2.2); el("rect", { x: -8, y: -66, width: 16, height: 15, rx: 2, fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g); ligne(g, "M0 -63 L0 -54 M-4.5 -58.5 L4.5 -58.5", 2.6);
    U.shape(C, "mur", "M-30 -44 L30 -44 L30 0 L-30 0 Z", MAT.white, { sw: 2.4, r: 0.5 });
    U.shape(C, "toit", "M-33 -48 L33 -48 L33 -42 L-33 -42 Z", MAT.mid, { sw: 1.8, r: 0.4 });
    [-21, -5, 11].forEach((x) => [-37, -24].forEach((y) => el("rect", { x, y, width: 10, height: 8, fill: "#DADAD5", stroke: INK, "stroke-width": 1.4 }, g)));
    el("rect", { x: -6, y: -12, width: 12, height: 12, fill: "#4A4A46", stroke: INK, "stroke-width": 1.4 }, g);
    ligne(g, "M-36 0 L36 0", 2.2);
    return { haut: [0, -66], porte: [0, 0] };
  };

  /* D.miniLettre — la lettre en tout petit (feuille, 4 barres, tache jaune de 3 points). 86 × 122, ancre = centre.
   * pliee: true → pliée en trois dans une enveloppe blanche + mini-fiche du patient tenue par un trombone (≈ 96 × 54). */
  D.miniLettre = (g, o = {}) => {
    o = Object.assign({ pliee: false, seed: 221 }, o);
    const C = U.ctx(g, o.seed, false, 1), taches = (x, y) => [0, 1, 2].forEach((i) => el("circle", { cx: x + i * 8, cy: y, r: 3.4, fill: YEL, stroke: INK, "stroke-width": 1 }, g));
    if (o.pliee) {
      const env = U.rrect(-48, -22, 96, 49, 4);
      ombre(g, env, 5, 6);
      el("path", { d: "M-40 -33 L40 -33 L40 -10 L-40 -10 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, g); barre(g, -32, -29, 34, 4); taches(14, -27);   // la lettre pliée dépasse
      U.shape(C, "env", env, { base: "#F7F7F1" }, { sw: 2.4, r: 0.5 }); ligne(g, "M-46 -20 L0 6 L46 -20", 1.8);
      el("path", { d: U.rrect(-58, -40, 24, 30, 3), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g);                                     // mini-fiche du patient
      el("circle", { cx: -46, cy: -23, r: 5.5, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.4 }, g); el("path", { d: "M-53 -27 Q-46 -35 -39 -27 Z", fill: "#77776F", stroke: INK, "stroke-width": 1.2, "stroke-linejoin": "round" }, g);
      trombone(el("g", { transform: "translate(-42 -40)" }, g), 0.55, -60, 0);
      return { w: 96, h: 54 };
    }
    const d = "M-43 -61 L43 -61 L43 49 L31 61 L-43 61 Z";
    ombre(g, d, 4, 6); U.shape(C, "f", d, MAT.white, { sw: 2.4, r: 0.5 }); el("path", { d: "M43 49 L31 61 L31 49 Z", fill: "#E4E4DE", stroke: INK, "stroke-width": 1.4, "stroke-linejoin": "round" }, g);
    el("rect", { x: -35, y: -53, width: 12, height: 12, rx: 2, fill: "#CFCFCA" }, g); barre(g, -16, -49, 44, 5, INK);
    barre(g, -35, -30, 60, 5); barre(g, -35, -18, 68, 5); barre(g, -35, -6, 48, 5); barre(g, -35, 14, 36, 5); taches(12, 17); barre(g, -35, 40, 30, 3, GRIS);
    return { w: 86, h: 122 };
  };
  D.miniLettre.essais = [{}, { pliee: true }];

  /* ═════════════════════════ LES MAINS — les vrais acteurs (storyboard § 1.2 et § 2 B) ═════════════════════════ */

  /* D.main — AVANT-BRAS VU DE DESSUS, main en MOUFLE (pouce + bloc, jamais de doigts). Ancre = centre de la paume.
   * Repère avant rotation : la moufle pointe vers −y, l'avant-bras descend vers +y jusqu'à y 690 (il sort toujours du cadre).
   * o : who 1 | 2 | 3 | 4 | "toi" | "juge" (détail signature, voir story.js MAINS) · miroir (main gauche : pouce à droite)
   *     a = angle DANS le dessin (0 : elle vient du bas ; 90 : de la gauche ; −90 : de la droite ; 180 : du haut ; −145 : du coin haut-droit ; 145 : du coin haut-gauche)
   *     pose "plat" | "pousse" | "stylo" | "frappe" | "poing" | "ouverte" · leve 0–1 (hauteur : ombre + échelle) · appui 0–1
   *     montre 0/1 + sec 0–59 (who 1) · stylo "bille" | "plume" | "clic" + ouvert, clic (pose "stylo" ; pointe à (−30, −96) avant rotation)
   *     jeton "1"…"4" | "نتا" (rond de carton noué au poignet, chiffre toujours DROIT) + js (balancement, degrés) + jc (côté : 1 | −1 ; 0 = automatique, vers le bas de l'écran)
   *     grey 0–1 (main « fantôme », S28)
   * → { paume, pointe, poignet, jeton, bout } dans le repère du nœud (rotation a et miroir compris, échelle du nœud non comprise) */
  const MOUFLE = {
    plat: [[-34, 78], [-32, 48], [-42, 18], [-48, -18], [-46, -48], [-34, -67], [-10, -74], [16, -72], [36, -60], [47, -36], [47, -6], [42, 22], [32, 48], [34, 78]],
    poing: [[-34, 78], [-32, 52], [-40, 28], [-43, 2], [-40, -24], [-28, -42], [-4, -48], [20, -46], [36, -34], [42, -10], [41, 16], [36, 38], [32, 52], [34, 78]],
  };
  const POUCE = { plat: [-59, -20, -24], pousse: [-59, -18, -24], frappe: [-58, -14, -30], ouverte: [-68, -8, -52], poing: [-45, -8, -6], stylo: [-33, -45, 40] };
  const MANCHE = { 1: [47, 226, 62], 2: [47, 82, 62], 3: [53, 330, 62], 4: [48, 138, 64], toi: [47, 94, 62], juge: [70, 84, 95] };   // [demi-largeur au poignet, y de départ, demi-largeur au bout]
  D.main = (g, o = {}) => {
    o = Object.assign({ who: 1, a: 0, miroir: false, pose: "plat", leve: 0, appui: 0, montre: 0, sec: 0, stylo: "bille", ouvert: 1, clic: 0, jeton: null, js: 0, jc: 0, grey: 0, seed: 31 }, o);
    const who = o.who, sw = who === "toi" ? 3.4 : 3, sg = o.miroir ? -1 : 1, k = 1 + 0.05 * o.leve, ap = clamp(o.appui, 0, 1);
    const R = (x, y) => rot([sg * x * k, y * k], o.a).map(f);                       // point du repère de la main → repère du nœud
    const tr = `rotate(${o.a}) scale(${f(sg * k * 1000) / 1000} ${f(k * 1000) / 1000})`;
    // forme de la moufle selon la pose
    const ky = (o.pose === "pousse" ? 0.96 : o.pose === "frappe" ? 0.9 : 1) * (1 - 0.04 * ap), kx = 1 + 0.03 * ap;
    const pts = (MOUFLE[o.pose === "poing" ? "poing" : "plat"]).map(([x, y]) => [x * (y < 40 ? kx : 1), y < 40 ? 40 + (y - 40) * ky : y]);
    const M = MANCHE[who] || MANCHE[1], hw = (y) => 34 + (y - 78) * 0.055, yE = Math.max(84, M[1] + 14);
    const peau = U.curve(pts) + ` L${f(hw(yE))} ${yE} L${f(-hw(yE))} ${yE} Z`, manche = `M${-M[0]} ${M[1]} L${M[0]} ${M[1]} L${M[2]} 690 L${-M[2]} 690 Z`;
    const P = POUCE[o.pose] || POUCE.plat, pouceTr = `translate(${P[0]} ${f(40 + (P[1] - 40) * ky)}) rotate(${P[2]})`, pouce = ovale(15, 22);
    // ombre : la même silhouette, décalée (plus la main est haute, plus l'ombre s'écarte ; elle se resserre quand la main appuie)
    const e = (1 - 0.45 * ap), S = el("g", { transform: `translate(${f((9 + 20 * o.leve) * e)} ${f((11 + 24 * o.leve) * e)}) ${tr}`, fill: "#CFCFC8" }, g);
    el("path", { d: peau }, S); el("path", { d: manche }, S); el("path", { d: pouce, transform: pouceTr }, S);
    const A = el("g", { transform: tr }, g), C = U.ctx(A, o.seed + (typeof who === "number" ? who : who === "toi" ? 7 : 9), o.miroir, 1);
    const blanc = { base: mix("#FFFFFF", "#DFDFDA", o.grey) }, skin = { base: mix("#FFFFFF", "#E4E4DF", o.grey) };
    const dessinePouce = () => U.shape(C.sub(el("g", { transform: pouceTr }, A)), "pouce", pouce, skin, { sw, r: 0.5 });
    if (o.pose !== "stylo") dessinePouce();
    // tissu qui dépasse SOUS la manche (poignet de pull, manchette, bord-côte, poignet blanc de la robe)
    if (who === 2) { U.shape(C, "pull", U.rrect(-37, 64, 74, 26, 5), MAT.dark, { sw: 2.4, r: 0.5 }); }
    U.shape(C, "peau", peau, skin, { sw, r: 0.55 });
    if (who === 2) { U.shape(C, "pull2", U.rrect(-37, 66, 74, 22, 5), MAT.dark, { sw: 2.4, r: 0.5 }); [-22, -7, 8, 23].forEach((x) => ligne(A, `M${x} 69 L${x} 85`, 1.5, "#9A9A94")); }
    if (who === 1 && o.montre) {   // petite montre ronde à bracelet fin, trotteuse
      U.shape(C, "brac", U.rrect(-38, 112, 76, 12, 4), MAT.dark, { sw: 1.8, r: 0.4 });
      el("circle", { cx: 0, cy: 118, r: 17, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.6 }, A);
      for (let i = 0; i < 4; i++) { const q = rot([0, -13.5], i * 90), q2 = rot([0, -10], i * 90); ligne(A, `M${f(q[0])} ${f(118 + q[1])} L${f(q2[0])} ${f(118 + q2[1])}`, 1.6); }
      ligne(A, "M0 118 L-6 112 M0 118 L7 111", 2.2);
      const t = rot([0, -13], sg * o.sec * 6); ligne(A, `M0 118 L${f(t[0])} ${f(118 + t[1])}`, 1.2, "#8E8B82"); el("circle", { cx: 0, cy: 118, r: 1.8, fill: INK }, A);
    }
    if (who === 3) [2, 0, -1, -1, 0, 2].forEach((dy, i) => el("circle", { cx: -30 + i * 12, cy: 96 + dy, r: 6, fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, A));   // bracelet de six perles
    if (who === 4) {               // quatre petits traits de poils + grosse montre carrée en métal
      [-16, -6, 5, 15].forEach((x, i) => ligne(A, `M${x} ${62 + (i % 2) * 2} L${x + 3} ${69 + (i % 2) * 2}`, 1.5));
      U.shape(C, "brac", U.rrect(-38, 84, 76, 16, 3), MAT.mid, { sw: 2, r: 0.4 }); [-30, -22, 22, 30].forEach((x) => ligne(A, `M${x} 85 L${x} 99`, 1.2, "#55524B"));
      el("path", { d: U.rrect(-15, 77, 30, 30, 6), fill: "#F1F1EC", stroke: INK, "stroke-width": 2.6 }, A); el("path", { d: U.rrect(-10, 82, 20, 20, 3), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.4 }, A);
      ligne(A, "M0 92 L0 86 M0 92 L5 95", 1.8);
    }
    // manche
    if (who === 4) { U.shape(C, "manchette", U.rrect(-41, 114, 82, 30, 5), blanc, { sw: 2.4, r: 0.5 }); for (let x = -34; x <= 34; x += 7) ligne(A, `M${x} 117 L${x} 141`, 1.3, GRIS); }
    if (who === "toi") { U.shape(C, "cote", U.rrect(-40, 70, 80, 28, 6), MAT.mid, { sw: 2.8, r: 0.5 }); for (let x = -32; x <= 32; x += 8) ligne(A, `M${x} 73 L${x} 95`, 1.3, "#55524B"); }
    if (who === "juge") U.shape(C, "poignet", U.rrect(-37, 62, 74, 26, 4), blanc, { sw: 2.4, r: 0.5 });
    const tissu = who === 3 ? MAT.grey : who === "toi" ? MAT.grey : who === "juge" ? MAT.robe : blanc;
    U.shape(C, "manche", manche, o.grey && tissu !== blanc ? gris(tissu, o.grey * 0.5) : tissu, { sw, r: 0.5 });
    if (who === 1) { U.shape(C, "rev2", U.rrect(-52, 210, 104, 24, 7), blanc, { sw: 2.6, r: 0.5 }); U.shape(C, "rev1", U.rrect(-50, 190, 100, 24, 7), blanc, { sw: 2.6, r: 0.5 }); }   // manche RETROUSSÉE : deux revers
    if (who === 2) { ligne(A, "M-47 102 L47 102", 1.8); el("circle", { cx: 31, cy: 93, r: 4.5, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, A); }
    if (who === 3) ligne(A, "M-53 341 L53 341 M-54 349 L54 349", 1.8);                                                                           // manche courte de casaque : ourlet double
    if (who === 4) ligne(A, "M-48 150 L48 150", 1.6, GRIS);
    if (who === "juge") ligne(A, "M-70 98 L70 98", 2, "#9A9A94");
    for (let i = 0; i < 2; i++) { const y = M[1] + 150 + i * 190; if (y < 640) ligne(A, `M${f(-M[0] - (M[2] - M[0]) * (y - M[1]) / (690 - M[1]) + 10)} ${y} q14 8 6 30`, 1.5, who === "juge" ? "#9A9A94" : GRIS); }   // plis du tissu
    // ride de la moufle (une seule courbe : jamais de séparation de doigts) ; poing : deux plis
    const yr = 40 + (-30 - 40) * ky;
    if (o.pose === "poing") ligne(A, "M-32 -22 Q2 -32 34 -22 M-30 -2 Q2 -10 34 -2", 2);
    else ligne(A, `M-35 ${f(yr + 2)} Q2 ${f(yr - 10)} 37 ${f(yr)}`, 2);
    if (ap > 0.5) ligne(A, "M-58 -52 l-9 -7 M-20 -84 l-3 -11 M30 -80 l5 -10 M56 -46 l10 -5", 2);                                                // petits traits d'appui
    // stylo tenu : bloc → stylo → pouce par-dessus
    let pointe = R(0, -72 * ky - 2);
    if (o.pose === "stylo") {
      const gs = el("g", { transform: "translate(-30 -96) rotate(-24.8)" }, A);
      stylo(gs, C.sub(gs), { kind: o.stylo, ouvert: o.ouvert, clic: o.clic, cap: "arriere" });
      dessinePouce();
      pointe = R(-30, -96);
    }
    // jeton : rond de carton + œillet + ficelle nouée au poignet ; le chiffre reste DROIT
    let jeton = null;
    if (o.jeton != null && o.jeton !== "") {
      const cote = o.jc || (R(58, 94)[1] >= R(-58, 94)[1] ? 1 : -1), W = R(cote * 33, 66), w0 = R(0, 66);
      const q = rot([R(cote * 62, 96)[0] - w0[0], R(cote * 62, 96)[1] - w0[1]], o.js), J = [f(w0[0] + q[0]), f(w0[1] + q[1])];
      const u = [W[0] - J[0], W[1] - J[1]], L = Math.hypot(u[0], u[1]) || 1, O = [J[0] + u[0] / L * 20, J[1] + u[1] / L * 20];
      ligne(g, `M${R(-cote * 33, 64).join(" ")} L${W.join(" ")}`, 2.2, "#6E6B62");                                                                // tour de ficelle au poignet
      ligne(g, `M${W.join(" ")} Q${f((W[0] + O[0]) / 2 + u[1] / L * 5)} ${f((W[1] + O[1]) / 2 - u[0] / L * 5)} ${f(O[0])} ${f(O[1])}`, 2, "#6E6B62");
      el("circle", { cx: W[0], cy: W[1], r: 3.2, fill: "#6E6B62" }, g);
      const gj = el("g", { transform: `translate(${J[0]} ${J[1]})` }, g), Cj = U.ctx(gj, 37, false, 1);
      el("circle", { cx: 4, cy: 5, r: 28, fill: "#CFCFC8" }, gj);
      U.shape(Cj, "jeton", cercle(28), { base: "#F4F1E8" }, { sw: 2.6, r: 0.5 });
      el("circle", { cx: f(u[0] / L * 20), cy: f(u[1] / L * 20), r: 4.6, fill: "#F7F7F1", stroke: INK, "stroke-width": 1.8 }, gj);
      const arabe = /[؀-ۿ]/.test(o.jeton), c0 = [-u[0] / L * 4, -u[1] / L * 4];
      U.text(gj, String(o.jeton), f(c0[0]), f(c0[1] + (arabe ? 9 : 11)), arabe ? 28 : 32, arabe ? { font: "Lalezar, Kalam, sans-serif", weight: 400, rtl: true } : {});
      jeton = J;
    }
    return { paume: [0, 0], pointe, poignet: R(0, 64), bout: R(0, 690), jeton };
  };
  D.main.essais = [
    { who: 1, jeton: "1" }, { who: 1, miroir: true, montre: 1, sec: 20, pose: "frappe" }, { who: 2, a: 90, jeton: "2", pose: "stylo", stylo: "plume" }, { who: 3, a: -90, jeton: "3", pose: "stylo", stylo: "clic" },
    { who: 4, a: -145, jeton: "4" }, { who: "toi", jeton: "نتا", pose: "ouverte" }, { who: "juge", a: 145, pose: "plat", appui: 1 }, { who: 1, pose: "poing", leve: 1 },
    { who: 2, pose: "pousse", a: 90 }, { who: 3, pose: "ouverte", a: -90, leve: 0.4, jeton: "3" }, { who: 4, pose: "stylo", stylo: "bille", a: -145, jeton: "4" }, { who: "toi", pose: "stylo", stylo: "bille", jeton: "نتا" },
    { who: 4, a: 180, jeton: "4", grey: 1 }, { who: "toi", pose: "plat", appui: 1, jeton: "نتا" }, { who: 3, pose: "poing", a: -90 }, { who: 2, pose: "frappe", a: 0 },
  ];

  /* ═════════════════════════ EXEMPLE DU GABARIT (à supprimer avec les scènes d'exemple de scenes-1.js) ═════════════════════════ */
  D.exemple = (g, o = {}) => {
    const C = U.ctx(g, 611, false, 1), L = o.len || 110;
    el("path", { d: `M-40 ${L + 34} L40 ${L + 34} L240 ${L + 900} L-240 ${L + 900} Z`, fill: "#F8CE4E", opacity: 0.13 }, g);
    U.stroke(C, "fil", `M0 0 L0 ${L}`, { sw: 3 });
    U.shape(C, "abat", `M-16 ${L} L16 ${L} L46 ${L + 34} L-46 ${L + 34} Z`, MAT.grey, { sw: 2.6 });
    el("ellipse", { cx: 0, cy: L + 36, rx: 22, ry: 8, fill: "#FFF6C9", stroke: INK, "stroke-width": 2 }, g);
    return { ampoule: [0, L + 36] };
  };
})();
