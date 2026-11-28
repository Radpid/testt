/* decor-3.js — AKTE 07 « الگروپ » : décors et objets PROPRES à l'épisode, 3e et dernière partie (scènes 17 à 21).
 * Mêmes conventions, mêmes matières et mêmes aides que decor.js (lire son en-tête : ancrages « écran » / « objet » / « meuble »,
 * trait à main levée, ombre #D2D2CB, textes tx(…) au côté VISUEL). Liste d'état de tout l'inventaire : en tête de decor.js.
 * Essai : node tools/essai_decor.mjs videos/akte-siegburg-whatsapp --only coffre,cle,… --cols 2 --cell 800 --per 4
 *
 * Contenu (dans l'ordre des scènes) :
 *  B. la sanction (sc. 17–18)  D.interdit D.aPayer D.ticketCaisse D.compteRecherche D.pointInterro
 *  A. la règle (sc. 19)        D.avatarToi
 *  C. le coffre (sc. 20)       D.coffre D.cle (+ partie « crochet ») D.feuilleDiag
 *  D. le jugement (sc. 21)     D.pageJugement D.chrono
 *  E. ajouts partie 4          D.badgeCle (sc. 20) D.bulleJugement (sc. 21) — en fin de fichier
 *  La scène 22 (affiche-résumé) n'a besoin d'aucun dessin : elle est faite par le socle (story.js, st.summary).
 *
 * ATTENTION : tools/essai_decor.mjs charge ce fichier AVANT decor.js (ordre alphabétique) ; D.outils, D.caviar,
 * D.gribouillis… ne sont lus qu'À L'INTÉRIEUR des fonctions (jamais au chargement du fichier).
 * Couleurs : encre, papier, gris, jaune ; AUCUN vert (la teinte est réservée à SA bulle), aucun bleu, aucun rouge.
 * Textes : tous dans storyboard.md (annexe C) ou scenario.md ; aucune chaîne arabe dans ce fichier.
 */
(function () {
  "use strict";
  const SC = SketchCast, U = SC.util, PE = window.Persona, MAT = (PE && PE.MAT) || SC.MAT, NS = "http://www.w3.org/2000/svg";
  const INK = "#1C1A1C", YEL = "#F8CE4E", OMBRE = "#D2D2CB", ECRAN = "#FCFCF9", GRIS = "#B4B4AE", SOMBRE = "#3A3A37";
  const el = (tag, a, p) => { const n = document.createElementNS(NS, tag); for (const k in a || {}) if (a[k] != null) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; };
  const D = window.EpDecor = window.EpDecor || {};
  const f = (v) => Math.round(v * 10) / 10, clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, p) => a + (b - a) * p;
  const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const ln = (g, d, w, col, extra) => el("path", Object.assign({ d, fill: "none", stroke: col || INK, "stroke-width": w || 2, "stroke-linecap": "round", "stroke-linejoin": "round" }, extra || {}), g);
  const rond = (cx, cy, r) => `M${f(cx - r)} ${f(cy)}A${f(r)} ${f(r)} 0 1 1 ${f(cx + r)} ${f(cy)}A${f(r)} ${f(r)} 0 1 1 ${f(cx - r)} ${f(cy)}Z`;
  const rr = (x, y, w, h, r) => U.rrect(x, y, w, h, r);
  const rad = (a) => (a * Math.PI) / 180;
  // aides de decor.js, lues À L'APPEL
  const tx = (...a) => D.outils.tx(...a), mesure = (...a) => D.outils.mesure(...a), nid = (p) => D.outils.nid(p);
  // texte qui tient dans une largeur : la taille descend (jamais sous « min ») si le texte est trop long
  const txFit = (g, s, x, y, size, kind, anchor, wMax, min, o) => { const w = mesure(s, size, kind), k = w > wMax ? Math.max(min || size * 0.8, (size * wMax) / w) : size; return tx(g, s, x, y, f(k), kind, anchor, o); };
  // trait à main levée qui se trace (o.p 0..1) : arc d'ellipse d'un peu plus d'un tour (cercle jaune autour d'un mot, d'un chiffre)
  const arcMain = (cx, cy, rx, ry, p, s0) => {
    const n = 30, tours = 1.1, pts = [], m = Math.max(2, Math.round(n * clamp(p, 0, 1)));
    for (let i = 0; i <= m; i++) { const u = (i / n) * tours, a = -2.3 + u * Math.PI * 2, k = 1 + (hash(s0 + i * 3) - 0.5) * 0.05 + (u > 1 ? 0.12 * (u - 1) * 10 : 0); pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); }
    return U.curve(pts);
  };

  /* ═══════════════════════════ B. LA SANCTION DANS LE FIL (scènes 17–18) ═══════════════════════════ */

  /* D.interdit — l'interdiction de recommencer : petite bulle de message (trois traits gris) barrée d'un panneau d'interdiction
   * (rond + barre, encre épaisse, liseré papier). 80 × 80, ancrage = centre ; scène 17 : (322, 829) ; version 44 px : échelle 0,55.
   * o.partie "bulle" | "panneau" | défaut : les deux — deux nœuds pour que le panneau CLAQUE sur la bulle (slam, sans secousse). */
  D.interdit = (g, o = {}) => {
    const part = o.partie || "tout";
    if (part !== "panneau") {
      const C = U.ctx(g, 4810, false, 1), d = D.outils.bullePath(0, -4, 54, 38, 12, [-15, 25], 6);
      el("path", { d, fill: OMBRE, transform: "translate(3 4)" }, g);
      U.shape(C, "bul", d, MAT.white, { sw: 2.6, r: 0.4 });
      ln(g, "M-16 -12 h30 M-16 -4 h24 M-16 4 h15", 2.6, GRIS);
    }
    if (part !== "bulle") {
      el("circle", { cx: 0, cy: 0, r: 35, fill: "none", stroke: ECRAN, "stroke-width": 13 }, g);          // liseré papier : le panneau se détache
      ln(g, "M-22 -22 L22 22", 13, ECRAN);
      el("circle", { cx: 0, cy: 0, r: 35, fill: "none", stroke: INK, "stroke-width": 8 }, g);
      ln(g, "M-23.5 -23.5 L23.5 23.5", 8, INK, { "stroke-linecap": "butt" });
    }
    return { r: 39 };
  };
  D.interdit.essais = [{}, { partie: "bulle" }, { partie: "panneau" }];

  /* D.aPayer — la somme est ORDONNÉE, pas payée : une petite HORLOGE « en attente » (cadran blanc, douze repères, deux aiguilles)
   * et, à droite, une étiquette arrondie « zu zahlen » (Kalam 26 px). ≈ 210 × 50, ancrage = coin haut-gauche ; scène 17 : (290, 1034).
   * o.h = angle de la grande aiguille en degrés (un tour en 1,6 s ; la petite avance d'un douzième) · o.r = rayon du cadran
   * (22 → 34 en scène 18 ; le centre reste en (25, 25)). Renvoie { horloge } (centre du cadran). */
  D.aPayer = (g, o = {}) => {
    const r = clamp(o.r || 22, 14, 40), h = o.h || 0, C = U.ctx(g, 4820, false, 1), lx = Math.round(Math.max(60, 25 + r + 9)), lw = Math.round(mesure("zu zahlen", 26, "de")) + 40;
    el("path", { d: rr(lx + 3, 6, lw, 46, 23), fill: OMBRE }, g);
    U.shape(C, "eti", rr(lx, 2, lw, 46, 23), MAT.white, { sw: 2.4, r: 0.4 });
    tx(g, "zu zahlen", lx + lw / 2, 34, 26, "de");
    const k = el("g", { transform: "translate(25 25)" }, g), q = r / 22;
    el("rect", { x: -3.5, y: f(-r - 7), width: 7, height: 6, rx: 2, fill: INK }, k);                                 // le petit bouton du haut
    el("circle", { cx: 2.5, cy: 3.5, r, fill: OMBRE }, k);
    el("circle", { cx: 0, cy: 0, r, fill: "#FFFFFF", stroke: INK, "stroke-width": f(2.2 + 0.4 * q) }, k);
    let d = "";
    for (let i = 0; i < 12; i++) { const a = rad(i * 30), l = i % 3 ? 0.12 : 0.22; d += `M${f(Math.sin(a) * r * 0.86)} ${f(-Math.cos(a) * r * 0.86)}L${f(Math.sin(a) * r * (0.86 - l))} ${f(-Math.cos(a) * r * (0.86 - l))}`; }
    ln(k, d, f(1.4 * q), "#55524B");
    const main = (ang, l, w) => ln(k, `M0 0 L${f(Math.sin(rad(ang)) * l)} ${f(-Math.cos(rad(ang)) * l)}`, w);
    main(300 + h / 12, r * 0.48, f(3 * q)); main(h, r * 0.74, f(2.3 * q));
    el("circle", { cx: 0, cy: 0, r: f(2.6 * q), fill: INK }, k);
    return { w: lx + lw, h: 50, horloge: [25, 25] };
  };
  D.aPayer.essais = [{}, { h: 130 }, { r: 34, h: 250 }];

  /* D.ticketCaisse — le ticket de caisse COMPLET (même papier que D.ticketPoche de la scène 2) : en-tête illisible (deux traits gris),
   * ligne 1 « Wochenende » … « 549 € » + micro « laut ihrer Nachricht », pointillés, ligne 2 « Nachricht » … « 1.000 € » (la somme,
   * surlignée de jaune) ; bord bas en dents de scie ; AUCUNE ligne « total » (frais non chiffrés dans les sources).
   * 300 × 166, ancrage = milieu du bord haut, sur la fente du bas de la bulle « à payer » ; scène 17 : (430, 1112).
   * o.sorti 0..1 : il sort par la fente (découpe au ras de l'ancrage) · o.lignes 0..2 (défaut 2) : la 2e ligne apparaît en fondu
   * · o.fente false : sans la fente. Ensuite m.pend (±2°, pivot = l'ancrage). */
  D.ticketCaisse = (g, o = {}) => {
    const W = 300, H = 166, s = clamp(o.sorti == null ? 1 : o.sorti, 0, 1), n = o.lignes == null ? 2 : o.lignes, x0 = -W / 2, x1 = W / 2;
    const id = nid("tc"), cp = el("clipPath", { id }, g); el("rect", { x: x0 - 20, y: 0, width: W + 50, height: H + 30 }, cp);
    const P = el("g", { transform: `translate(0 ${f(-(1 - s) * (H + 4))})` }, el("g", { "clip-path": `url(#${id})` }, g)), C = U.ctx(P, 4830, false, 1);
    D.outils.papierTicket(P, C, "ticket", x0, -6, W, H + 6);
    ln(P, "M-64 18 h128 M-42 30 h84", 2.6, "#C9C9C2");                                                              // en-tête illisible
    const poin = (y) => ln(P, `M${x0 + 18} ${y} H${x1 - 18}`, 2, "#77776F", { "stroke-dasharray": "2 7" });
    poin(44);
    const ligne = (gg, de, som, y) => {
      tx(gg, de, x0 + 22, y, 24, "de", "start"); const ws = mesure(som, 24, "de");
      ln(gg, `M${f(x0 + 30 + mesure(de, 24, "de"))} ${y - 2} H${f(x1 - 30 - ws)}`, 1.6, "#B4B4AE", { "stroke-dasharray": "1 6" });
      return ws;
    };
    ligne(P, "Wochenende", "549 €", 76); tx(P, "549 €", x1 - 22, 76, 24, "de", "end");
    tx(P, "laut ihrer Nachricht", x1 - 22, 97, 15, "light", "end", { fill: "#55524B" });
    poin(110);
    const op = clamp(n - 1, 0, 1);
    if (op > 0) {
      const l2 = el("g", { opacity: op < 1 ? f(op) : null }, P), ws = mesure("1.000 €", 24, "de");
      if (o.surligne !== false) el("path", { d: rr(f(x1 - 26 - ws), 124, f(ws + 10), 20, 5), fill: YEL, opacity: 0.85, transform: "rotate(-1.5 100 134)" }, l2);
      ligne(l2, "Nachricht", "1.000 €", 142); tx(l2, "1.000 €", x1 - 22, 142, 24, "de", "end");
    }
    if (o.fente !== false) { ln(g, `M${x0 - 8} 1 H${x1 + 8}`, 5, INK); ln(g, `M${x0 - 2} 6 H${x1 + 2}`, 1.6, "#8A8A84"); }
    return { w: W, h: H, bas: [0, H] };
  };
  D.ticketCaisse.essais = [{}, { sorti: 0.45, lignes: 1 }, { lignes: 1.5, fente: false }];

  /* D.compteRecherche — la fin du champ de recherche du fil (scène 18) : d'abord trois points d'attente qui rebondissent
   * (o.etat "attente", o.t = phase 0..1, 2 Hz), puis le compteur « 0 / 0 » (Kalam 26 px, o.etat "rien", défaut) ; à droite, les
   * deux flèches « précédent / suivant », grises (rien à parcourir). 110 × 40, ancrage = centre ; scène 18 : (790, 393). */
  D.compteRecherche = (g, o = {}) => {
    const t = o.t || 0;
    if (o.etat === "attente") [0, 1, 2].forEach((i) => el("circle", { cx: -38 + i * 16, cy: f(-7 * Math.max(0, Math.sin(t * Math.PI * 2 - i * 0.9))), r: 5, fill: "#55524B" }, g));
    else tx(g, "0 / 0", -22, 9, 26, "de");
    ln(g, "M10 -15 V15", 1.6, "#C9C9C2");
    ln(g, "M28 -3 L36 -11 L44 -3 M28 4 L36 12 L44 4", 3, GRIS);
    return { w: 110, h: 40 };
  };
  D.compteRecherche.essais = [{ etat: "attente", t: 0.2 }, {}];

  /* D.pointInterro — grand « ? » manuscrit (Kalam 92 px) et son ombre. ≈ 60 × 100, ancrage = centre ; scène 18 : (700, 1200).
   * pop, puis il se balance (±10°, pivot = le haut : ancre « haut »). */
  D.pointInterro = (g) => {
    tx(g, "?", 4, 20, 62, "de", "middle", { fill: OMBRE });
    tx(g, "?", 0, 15, 62, "de", "middle", { halo: ECRAN, haloW: 7 });
    return { bas: [0, 50], haut: [0, -50] };
  };

  /* ═══════════════════════════ A. LA RÈGLE (scène 19) ═══════════════════════════ */

  /* D.avatarToi — « toi » : buste blanc SANS visage (tête ronde, cou, épaules), anneau jaune. Rayon o.r (30 en scène 19), ancrage = centre.
   * Ni la collègue sans visage (grise, au carré), ni le patient (chemise à pois) : un buste blanc, neutre. pop, puis il flotte. */
  D.avatarToi = (g, o = {}) => {
    const r = o.r || 30, sw = Math.max(2.4, r * 0.07), k = r / 82, b = Math.max(6, r * 0.16);
    el("circle", { cx: f(r * 0.09), cy: f(r * 0.12), r: f(r + b), fill: OMBRE }, g);
    el("circle", { cx: 0, cy: 0, r, fill: "#E9E9E3" }, g);
    const id = nid("toi"), cp = el("clipPath", { id }, g); el("circle", { cx: 0, cy: 0, r: f(r - sw / 2) }, cp);
    const s = el("g", { transform: `scale(${k.toFixed(4)})` }, el("g", { "clip-path": `url(#${id})` }, g)), C = U.ctx(s, 4800, false, r < 45 ? 1.9 : 1.1);
    U.shape(C, "epaules", "M-72 104 C-72 56 -44 38 -18 33 Q0 42 18 33 C44 38 72 56 72 104 Z", MAT.white, { sw: 2.8 });
    U.shape(C, "cou", "M-12 6 L-13 34 Q0 42 13 34 L12 6 Z", MAT.white, { sw: 2.4 });
    U.stroke(C, "col", "M-23 34 Q0 48 23 34", { sw: 2.6 });
    U.shape(C, "tete", rond(0, -20, 33), MAT.white, { sw: 2.8 });
    el("circle", { cx: 0, cy: 0, r: f(r + b / 2), fill: "none", stroke: YEL, "stroke-width": f(b) }, g);
    el("circle", { cx: 0, cy: 0, r: f(r + b), fill: "none", stroke: INK, "stroke-width": f(sw * 0.8) }, g);
    el("circle", { cx: 0, cy: 0, r, fill: "none", stroke: INK, "stroke-width": f(sw) }, g);
    return { bord: f(r + b) };
  };
  D.avatarToi.essais = [{ r: 30 }, { r: 78 }];

  /* ═══════════════════════════ C. LE COFFRE (scène 20) ═══════════════════════════ */

  /* D.coffre — le coffre « Gesundheitsdaten » : caisse épaisse hachurée sur deux pieds, porte à double cadre, 4 rivets, plaque
   * « Gesundheitsdaten » (26 px), molette crantée graduée (o.molette = angle en degrés ; un repère fixe au-dessus), poignée à trois
   * branches (o.poignee = angle), deux charnières à gauche ; sous la molette, le texte de loi en deux lignes (17 px, réduit s'il ne
   * tient pas) « Die Verarbeitung … von … Gesundheitsdaten … » / « ist untersagt. » + « Art. 9 Abs. 1 DSGVO » (15 px).
   * o.ouvert 0..1 : la porte pivote sur ses charnières (0 → 100°) : sa face se resserre vers la gauche, puis on voit son revers,
   * à gauche de la charnière ; derrière : l'intérieur dans l'ombre, une étagère, deux chemises debout.
   * 360 × 356, ancrage = centre ; scène 20 : (525, 776) (x 345 → 705, y 598 → 954). Renvoie { interieur, porte, molette, poignee }. */
  D.coffre = (g, o = {}) => {
    const ouv = clamp(o.ouvert || 0, 0, 1), C = U.ctx(g, 4850, false, 1);
    const X0 = -180, Y0 = -178, W = 360, Hb = 336, DX = -156, DY = -156, DW = 312, DH = 292;
    // pieds, ombre, caisse
    [-126, 126].forEach((x, i) => { el("path", { d: rr(x - 26 + 4, 150 + 5, 52, 24, 5), fill: OMBRE }, g); U.shape(C, "pied" + i, rr(x - 26, 150, 52, 24, 5), MAT.dark, { sw: 2.2, r: 0.4 }); });
    el("path", { d: rr(X0 + 9, Y0 + 11, W, Hb, 24), fill: OMBRE }, g);
    U.shape(C, "caisse", rr(X0, Y0, W, Hb, 24), MAT.mid, { sw: 3.2, r: 0.5 });
    ln(g, `M${X0 + 8} ${Y0 + 14} Q${X0 + 8} ${Y0 + 8} ${X0 + 22} ${Y0 + 8} H${-X0 - 30}`, 2.2, "#E8E8E2");              // arête claire
    // l'intérieur (visible quand la porte s'ouvre)
    if (ouv > 0.01) {
      U.shape(C, "creux", rr(DX, DY, DW, DH, 12), { base: "#5E5E59", hatch: SOMBRE, gap: 5, fw: 1.2 }, { sw: 2.6, r: 0.4 });
      el("path", { d: rr(DX + 24, DY + 22, DW - 48, DH - 44, 6), fill: "#77776F", opacity: 0.55 }, g);              // le fond, un peu plus clair
      U.shape(C, "etagere", rr(DX + 10, -6, DW - 20, 12, 3), MAT.light, { sw: 2.2, r: 0.4 });
      const chemise = (x, y, w, h, r, mat, k) => { const q = el("g", { transform: `rotate(${r} ${x + w / 2} ${y + h})` }, g), Q = U.ctx(q, 4855 + k, false, 1);
        U.shape(Q, "ch", rr(x, y, w, h, 4), mat, { sw: 2.2, r: 0.4 }); ln(q, `M${x + 8} ${y + 16} h${w - 22}`, 2, "#8A8A84"); };
      chemise(-34, 46, 58, 90, -4, MAT.white, 0); chemise(30, 52, 54, 84, 5, MAT.grey, 1);
      el("path", { d: rr(DX, DY, DW, DH, 12), fill: "none", stroke: INK, "stroke-width": 2.8 }, g);
    } else el("path", { d: rr(DX - 3, DY - 3, DW + 6, DH + 6, 14), fill: "none", stroke: "#55524B", "stroke-width": 2 }, g);   // la feuillure
    // la porte : angle 0 → 100° ; c = cos (largeur apparente), c < 0 : on voit son revers, à gauche de la charnière
    const th = rad(100 * ouv), c = Math.cos(th), sn = Math.sin(th);
    const tr = (k) => `translate(${DX} 0) scale(${k.toFixed(4)} 1) translate(${-DX} 0)`;
    if (c > 0.02) {
      const P = el("g", { transform: tr(c) }, g), Cp = U.ctx(P, 4851, false, 1), det = clamp((c - 0.45) / 0.4, 0, 1);
      el("path", { d: rr(DX + 6, DY + 8, DW, DH, 12), fill: "rgba(28,26,28,.18)" }, P);
      U.shape(Cp, "porte", rr(DX, DY, DW, DH, 12), MAT.light, { sw: 3, r: 0.5 });
      U.stroke(Cp, "cadre2", rr(DX + 18, DY + 18, DW - 36, DH - 36, 8), { sw: 2, r: 0.4, single: true, stroke: "#77776F" });
      [[DX + 11, DY + 11], [DX + DW - 11, DY + 11], [DX + 11, DY + DH - 11], [DX + DW - 11, DY + DH - 11]].forEach(([x, y]) => {
        el("circle", { cx: x, cy: y, r: 4.6, fill: "#CFCFCA", stroke: INK, "stroke-width": 1.6 }, P); el("circle", { cx: x - 1.2, cy: y - 1.4, r: 1.3, fill: "#FFFFFF" }, P); });
      const dd = el("g", { opacity: det < 1 ? f(det) : null }, P);
      if (det > 0) {
        // plaque
        const wp = Math.round(mesure("Gesundheitsdaten", 26, "de")) + 34;
        el("path", { d: rr(-wp / 2 + 4, -128 + 5, wp, 42, 8), fill: OMBRE }, dd);
        U.shape(U.ctx(dd, 4852, false, 1), "plaque", rr(-wp / 2, -128, wp, 42, 8), MAT.white, { sw: 2.4, r: 0.4 });
        el("circle", { cx: -wp / 2 + 9, cy: -107, r: 2.2, fill: "#8A8A84" }, dd); el("circle", { cx: wp / 2 - 9, cy: -107, r: 2.2, fill: "#8A8A84" }, dd);
        tx(dd, "Gesundheitsdaten", 0, -98, 26, "de");
        // molette crantée (elle tourne) + repère fixe
        const mx = -40, my = -18, mo = el("g", { transform: `translate(${mx} ${my}) rotate(${f(o.molette || 0)})` }, dd);
        el("circle", { cx: 4, cy: 5, r: 49, fill: "rgba(28,26,28,.18)" }, el("g", { transform: `rotate(${f(-(o.molette || 0))})` }, mo));
        let dent = ""; const nD = 28;
        for (let i = 0; i < nD; i++) { const a0 = (i / nD) * Math.PI * 2, a1 = ((i + 0.5) / nD) * Math.PI * 2;
          dent += `${i ? "L" : "M"}${f(Math.cos(a0) * 48)} ${f(Math.sin(a0) * 48)}L${f(Math.cos(a1) * 48)} ${f(Math.sin(a1) * 48)}L${f(Math.cos(a1) * 43.5)} ${f(Math.sin(a1) * 43.5)}L${f(Math.cos(((i + 1) / nD) * Math.PI * 2) * 43.5)} ${f(Math.sin(((i + 1) / nD) * Math.PI * 2) * 43.5)}`; }
        el("path", { d: dent + "Z", fill: "#B9B9B3", stroke: INK, "stroke-width": 2.2, "stroke-linejoin": "round" }, mo);
        el("circle", { cx: 0, cy: 0, r: 37, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, mo);
        let gr = ""; for (let i = 0; i < 20; i++) { const a = (i / 20) * Math.PI * 2, l = i % 5 ? 5 : 10; gr += `M${f(Math.sin(a) * 34)} ${f(-Math.cos(a) * 34)}L${f(Math.sin(a) * (34 - l))} ${f(-Math.cos(a) * (34 - l))}`; }
        ln(mo, gr, 1.8, "#55524B");
        el("circle", { cx: 0, cy: 0, r: 14, fill: "#CFCFCA", stroke: INK, "stroke-width": 2.2 }, mo);
        ln(mo, "M0 -12 L0 -4", 3);
        el("path", { d: `M${mx - 7} ${my - 60} L${mx + 7} ${my - 60} L${mx} ${my - 51} Z`, fill: YEL, stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" }, dd);
        // poignée à trois branches
        const po = el("g", { transform: `translate(88 ${my}) rotate(${f(o.poignee || 0)})` }, dd);
        [0, 120, 240].forEach((a) => { const x = f(Math.sin(rad(a)) * 32), y = f(-Math.cos(rad(a)) * 32);
          ln(po, `M0 0 L${x} ${y}`, 8.5, INK); ln(po, `M0 0 L${x} ${y}`, 4.2, "#CFCFCA");
          el("circle", { cx: x, cy: y, r: 7, fill: SOMBRE, stroke: INK, "stroke-width": 1.8 }, po); });
        el("circle", { cx: 0, cy: 0, r: 11, fill: "#CFCFCA", stroke: INK, "stroke-width": 2.2 }, po);
        el("circle", { cx: 0, cy: 0, r: 3.2, fill: INK }, po);
        // le texte de loi, sous la molette
        const wl = DW - 48;
        txFit(dd, "Die Verarbeitung … von … Gesundheitsdaten …", 0, 58, 17, "light", "middle", wl, 13.5);
        txFit(dd, "ist untersagt.", 0, 80, 17, "light", "middle", wl, 13.5);
        ln(dd, "M-60 90 H60", 1.4, "#B4B4AE");
        tx(dd, "Art. 9 Abs. 1 DSGVO", 0, 108, 15, "de", "middle", { fill: "#55524B" });
      }
      if (ouv > 0.01) el("path", { d: rr(DX, DY, DW, DH, 12), fill: INK, opacity: f(0.2 * (1 - c)) }, P);
      if (sn > 0.05) el("path", { d: `M${f(DX + DW * c)} ${DY + 6} L${f(DX + DW * c + 15 * sn)} ${DY + 14} L${f(DX + DW * c + 15 * sn)} ${DY + DH - 14} L${f(DX + DW * c)} ${DY + DH - 6} Z`, fill: "#B9B9B3", stroke: INK, "stroke-width": 2.2, "stroke-linejoin": "round" }, g);
    } else if (c < -0.02) {
      // le revers de la porte (plaque d'acier unie, barre de verrous), à gauche de la charnière
      const P = el("g", { transform: tr(c) }, g), Cp = U.ctx(P, 4853, false, 1);
      U.shape(Cp, "revers", rr(DX, DY, DW, DH, 12), MAT.grey, { sw: 3, r: 0.5 });
      U.shape(Cp, "barre", rr(DX + 40, -14, DW - 80, 28, 6), MAT.mid, { sw: 2.2, r: 0.4 });
      [-90, 90].forEach((y) => U.stroke(Cp, "v" + y, rr(DX + 60, y - 10, DW - 120, 20, 5), { sw: 1.8, r: 0.4, single: true, stroke: "#77776F" }));
      el("path", { d: `M${f(DX + DW * c)} ${DY + 6} L${f(DX + DW * c - 15 * sn)} ${DY + 14} L${f(DX + DW * c - 15 * sn)} ${DY + DH - 14} L${f(DX + DW * c)} ${DY + DH - 6} Z`, fill: "#CFCFCA", stroke: INK, "stroke-width": 2.2, "stroke-linejoin": "round" }, g);
    }
    // deux charnières, à gauche, par-dessus la caisse et la porte
    [-104, 60].forEach((y, i) => { el("path", { d: rr(DX - 8 + 3, y + 4, 16, 46, 6), fill: "rgba(28,26,28,.2)" }, g);
      U.shape(C, "charn" + i, rr(DX - 8, y, 16, 46, 6), MAT.dark, { sw: 2, r: 0.4 }); ln(g, `M${DX - 8} ${y + 23} h16`, 1.4, "#8A8A84"); });
    return { interieur: [0, 20], porte: [DX, DY, DW, DH], molette: [-40, -18], poignee: [88, -18], bas: [0, 174] };
  };
  D.coffre.essais = [{}, { ouvert: 0.35, molette: 40 }, { ouvert: 1 }, { ouvert: 0.75 }];

  /* D.cle — une clé qui pend à un crochet : anneau rond (ancrage = le point d'accroche, en haut de l'anneau : pivot du balancement),
   * tête percée, tige, panneton ; une étiquette attachée à l'anneau par une ficelle pend à côté de la tige (o.cote "g", défaut,
   * ou "d"), texte dans le sens de l'étiquette : o.texte (« Einwilligung ») ou o.picto "stetho" (petite étiquette au stéthoscope).
   * o.jaune : clé jaune (celle de l'accord), sinon grise. ≈ 70 × 160 avec l'étiquette ; scène 20 : anneaux en (770, 650) et (812, 760).
   * o.partie "crochet" : SEULEMENT le crochet (une vis au trait + un crochet), au même ancrage — posé avant que la clé n'y tombe.
   * m.pend (±16°) à l'accrochage ; puis vol en arc vers un avatar (la scène). */
  D.cle = (g, o = {}) => {
    if (o.partie === "crochet") {
      el("circle", { cx: 2, cy: -12, r: 7.5, fill: OMBRE }, g);
      el("circle", { cx: 0, cy: -14, r: 7.5, fill: "#E1E1DC", stroke: INK, "stroke-width": 2.2 }, g);
      ln(g, "M-4 -14 h8 M0 -18 v8", 1.6, "#55524B");
      ln(g, "M0 -7 L0 1 Q0 7 6 5", 3.6, SOMBRE);
      return { point: [0, 0] };
    }
    const jaune = !!o.jaune, mat = jaune ? MAT.yellow : MAT.grey, C = U.ctx(g, jaune ? 4861 : 4860, false, 1), sg = o.cote === "d" ? 1 : -1;
    // étiquette (derrière la clé) + ficelle
    const tag = el("g", {}, g), Ct = U.ctx(tag, jaune ? 4863 : 4862, false, 1), tagX = sg * 28, haut = 44;
    const long = o.picto === "stetho" ? 52 : Math.round(mesure(o.texte || "Einwilligung", 17, "de")) + 26, w = 30, x = tagX - w / 2;
    const dt = `M${x + 7} ${haut} L${x + w - 7} ${haut} L${x + w} ${haut + 8} L${x + w} ${haut + long} L${x} ${haut + long} L${x} ${haut + 8} Z`;
    el("path", { d: dt, fill: OMBRE, transform: "translate(4 5)" }, tag);
    U.shape(Ct, "tag", dt, MAT.white, { sw: 2.2, r: 0.4 });
    el("circle", { cx: tagX, cy: haut + 9, r: 3.6, fill: ECRAN, stroke: INK, "stroke-width": 1.6 }, tag);
    ln(g, `M${sg * 8} 20 Q${f(sg * 22)} 26 ${tagX} ${haut + 7}`, 1.8, "#55524B");
    if (o.picto === "stetho") {
      const b = el("g", { transform: `translate(${tagX} ${haut + 32}) scale(0.95)` }, tag);
      ln(b, "M-8 -10 Q-9 2 -1 3 Q7 2 6 -10", 2.4); ln(b, "M-1 3 Q-1 11 5 10 Q9 9 9 5", 2.4);
      el("circle", { cx: 9, cy: 2.5, r: 3.6, fill: "#CFCFCA", stroke: INK, "stroke-width": 2 }, b);
    } else tx(tag, o.texte || "Einwilligung", 0, 0, 17, "de", "middle", { transform: `translate(${tagX - 6} ${haut + 16 + (long - 16) / 2}) rotate(90)` });
    // la clé : tige, panneton, tête percée, anneau
    U.shape(C, "tige", rr(-5, 50, 10, 64, 3), mat, { sw: 2.2, r: 0.4 });
    U.shape(C, "dents", "M5 88 L18 88 L18 94 L13 94 L13 99 L19 99 L19 108 L5 108 Z", mat, { sw: 2.2, r: 0.4 });
    el("circle", { cx: 2, cy: 43, r: 15, fill: "rgba(28,26,28,.18)" }, g);
    U.shape(C, "tete", rond(0, 40, 15), mat, { sw: 2.4, r: 0.4 });
    el("circle", { cx: 0, cy: 36, r: 5, fill: ECRAN, stroke: INK, "stroke-width": 2 }, g);
    el("circle", { cx: 0, cy: 14, r: 13, fill: "none", stroke: INK, "stroke-width": 7 }, g);
    el("circle", { cx: 0, cy: 14, r: 13, fill: "none", stroke: jaune ? YEL : "#CFCFCA", "stroke-width": 3.2 }, g);
    return { point: [0, 0], tete: [0, 40], bas: [0, 114] };
  };
  D.cle.essais = [{ jaune: true, texte: "Einwilligung" }, { picto: "stetho" }, { partie: "crochet" }];

  /* D.feuilleDiag — la petite feuille qui entre dans le coffre : coin corné, « Diagnose » (20 px), deux barres de caviar (jamais
   * lisible dessous), deux lignes illisibles. 120 × 150, ancrage = centre. Vole dans le coffre (move + scaleTo 0,5). */
  D.feuilleDiag = (g) => {
    const C = U.ctx(g, 4870, false, 1), x0 = -60, y0 = -75, w = 120, h = 150;
    const d = `M${x0} ${y0} L${x0 + w - 24} ${y0} L${x0 + w} ${y0 + 24} L${x0 + w} ${y0 + h} L${x0} ${y0 + h} Z`;
    el("path", { d, fill: OMBRE, transform: "translate(5 7)" }, g);
    U.shape(C, "feuille", d, MAT.white, { sw: 2.4, r: 0.45 });
    el("path", { d: `M${x0 + w - 24} ${y0} L${x0 + w - 24} ${y0 + 24} L${x0 + w} ${y0 + 24} Z`, fill: "#E6E6E0", stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" }, g);
    tx(g, "Diagnose", x0 + 12, y0 + 34, 20, "de", "start");
    ln(g, `M${x0 + 12} ${y0 + 44} h66`, 1.6, "#B4B4AE");
    D.caviar(el("g", { transform: `translate(${x0 + 12} ${y0 + 56}) scale(0.62)` }, g), { w: 152, seed: 41 });
    D.caviar(el("g", { transform: `translate(${x0 + 12} ${y0 + 82}) scale(0.62)` }, g), { w: 118, seed: 43 });
    D.gribouillis(el("g", { transform: `translate(${x0 + 12} ${y0 + 108}) scale(0.6)` }, g), { w: 160, seed: 47 });
    D.gribouillis(el("g", { transform: `translate(${x0 + 12} ${y0 + 124}) scale(0.6)` }, g), { w: 120, seed: 49 });
    return { w, h };
  };

  /* ═══════════════════════════ D. LE MESSAGE DANS LE JUGEMENT (scène 21) ═══════════════════════════ */

  /* D.pageJugement — une page du jugement, posée sur deux feuilles décalées : trombone en haut à gauche, en-tête en trois lignes
   * (« Arbeitsgericht Siegburg » 22 px, « Urteil vom 22.05.2026 » 17 px, « 1 Ca 1741/25 » 17 px), filet ; numéros de marge « 6 »,
   * « 7 », « 8 », « 9 » (Kalam 20 px, gris) ; lignes illisibles (D.gribouillis) en face de 6, 7 et 9 ; emplacement VIDE en face de 8
   * (290 × 120 : la bulle viendra s'y poser — aucun cadre, aucun pointillé). 350 × 500, ancrage = centre ; scène 21 : (690, 880),
   * inclinée de 2° par la scène (page x 515 → 865, y 630 → 1130).
   * o.cercle 0..1 : un cercle jaune à main levée se trace autour du « 8 » · o.brille 0..1 : un reflet blanc glisse sur le trombone
   * · o.feuilles false : sans les deux feuilles du dessous · o.entete false : sans l'en-tête.
   * Renvoie { huit, place: [x, y, w, h], trombone } (repère de la page). */
  D.pageJugement = (g, o = {}) => {
    const C = U.ctx(g, 4880, false, 1), x0 = -175, y0 = -250, W = 350, H = 500, fe = rr(x0, y0, W, H, 4);
    if (o.feuilles !== false) [[-3.2, -10, 12, 4881], [2.4, 12, 6, 4882]].forEach(([r, dx, dy, s]) => {
      const q = el("g", { transform: `translate(${dx} ${dy}) rotate(${r})` }, g);
      el("path", { d: fe, fill: OMBRE, transform: "translate(6 8)" }, q); U.shape(U.ctx(q, s, false, 1), "f", fe, { base: "#FBFBF7" }, { sw: 2.2, r: 0.5 }); });
    el("path", { d: fe, fill: OMBRE, transform: "translate(7 9)" }, g);
    U.shape(C, "page", fe, MAT.white, { sw: 2.6, r: 0.5 });
    if (o.entete !== false) {
      tx(g, "Arbeitsgericht Siegburg", 0, -204, 22, "de");
      tx(g, "Urteil vom 22.05.2026", 0, -178, 17, "de", "middle", { fill: "#3A3A37" });
      tx(g, "1 Ca 1741/25", 0, -156, 17, "light", "middle", { fill: "#3A3A37" });
    }
    ln(g, "M-150 -138 H150", 1.8, "#8A8A84");
    [["6", -110], ["7", -54], ["8", 20], ["9", 160]].forEach(([s, y]) => tx(g, s, -152, y, 20, "de", "middle", { fill: "#77776F" }));
    [[-118, 286], [-96, 262], [-62, 290], [-40, 214], [152, 288], [174, 276], [196, 290], [218, 170]].forEach(([y, w], i) => D.gribouillis(el("g", { transform: `translate(-130 ${y - 8})` }, g), { w, seed: 500 + i * 13 }));
    // trombone, à cheval sur le bord haut
    const tb = el("g", { transform: "translate(-150 -252) rotate(8)" }, g), dTb = "M-6 34 L-6 -14 Q-6 -24 4 -24 Q14 -24 14 -14 L14 40 Q14 52 1 52 Q-12 52 -12 40 L-12 -4";
    el("path", { d: dTb, fill: "none", stroke: "rgba(28,26,28,.18)", "stroke-width": 4.5, transform: "translate(3 4)", "stroke-linecap": "round" }, tb);
    ln(tb, dTb, 4.2, "#77776F"); ln(tb, dTb, 1.6, "#E1E1DC");
    const br = clamp(o.brille || 0, 0, 1);
    if (br > 0 && br < 1) { const y = lerp(-16, 40, br); ln(tb, `M14 ${f(y)} L14 ${f(y + 9)}`, 2.6, "#FFFFFF"); }
    const ce = clamp(o.cercle || 0, 0, 1);
    if (ce > 0) ln(g, arcMain(-152, 13, 22, 21, ce, 7), 5.5, YEL);
    return { huit: [-152, 13], place: [-130, -14, 290, 120], trombone: [-150, -252] };
  };
  D.pageJugement.essais = [{}, { cercle: 1, brille: 0.5 }, { cercle: 0.5, feuilles: false }];

  /* D.chrono — chronomètre mécanique : anneau et couronne en haut (o.couronne 0..1 : elle s'enfonce de 4 px), poussoir à droite,
   * boîtier rond hachuré, cadran blanc gradué (60 repères, 12 forts), petit compteur, UNE aiguille (o.a, en degrés : un tour en
   * 0,74 s) avec contrepoids. r 54, ancrage = centre ; scène 21 : (190, 520). */
  D.chrono = (g, o = {}) => {
    const a = o.a || 0, cr = clamp(o.couronne || 0, 0, 1), C = U.ctx(g, 4890, false, 1), dy = f(4 * cr);
    el("circle", { cx: 0, cy: f(-86 + dy), r: 11, fill: "none", stroke: INK, "stroke-width": 5.5 }, g);
    el("circle", { cx: 0, cy: f(-86 + dy), r: 11, fill: "none", stroke: "#CFCFCA", "stroke-width": 2.2 }, g);
    U.shape(C, "couronne", rr(-11, -76 + 4 * cr, 22, 16, 4), MAT.mid, { sw: 2.2, r: 0.4 });
    ln(g, `M-6 ${f(-73 + dy)} V${f(-63 + dy)} M0 ${f(-73 + dy)} V${f(-63 + dy)} M6 ${f(-73 + dy)} V${f(-63 + dy)}`, 1.4, "#55524B");
    el("rect", { x: -6, y: -60, width: 12, height: 8, fill: "#B9B9B3", stroke: INK, "stroke-width": 1.8 }, g);
    const pu = el("g", { transform: "rotate(42)" }, g); el("rect", { x: -6, y: -66, width: 12, height: 13, rx: 3, fill: "#B9B9B3", stroke: INK, "stroke-width": 1.8 }, pu);
    el("circle", { cx: 5, cy: 7, r: 54, fill: OMBRE }, g);
    U.shape(C, "boite", rond(0, 0, 54), MAT.grey, { sw: 3, r: 0.5 });
    el("circle", { cx: 0, cy: 0, r: 45, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, g);
    let fort = "", fin = "";
    for (let i = 0; i < 60; i++) { const q = rad(i * 6), big = i % 5 === 0, l = big ? 8 : 4, s = `M${f(Math.sin(q) * 41)} ${f(-Math.cos(q) * 41)}L${f(Math.sin(q) * (41 - l))} ${f(-Math.cos(q) * (41 - l))}`; if (big) fort += s; else fin += s; }
    ln(g, fin, 1.1, "#8A8A84"); ln(g, fort, 2.4, INK);
    el("path", { d: "M0 -41 A41 41 0 0 1 20.5 -35.5", fill: "none", stroke: YEL, "stroke-width": 4 }, g);
    el("circle", { cx: 0, cy: 17, r: 9, fill: "none", stroke: "#8A8A84", "stroke-width": 1.6 }, g);
    ln(g, `M0 17 L${f(Math.sin(rad(a / 10)) * 7)} ${f(17 - Math.cos(rad(a / 10)) * 7)}`, 1.6, "#55524B");
    const ai = el("g", { transform: `rotate(${f(a)})` }, g);
    ln(ai, "M0 9 L0 -37", 2.6, INK); el("circle", { cx: 0, cy: 11, r: 3.8, fill: INK }, ai);
    el("circle", { cx: 0, cy: 0, r: 4.6, fill: INK }, g); el("circle", { cx: 0, cy: 0, r: 1.7, fill: "#FFFFFF" }, g);
    return { centre: [0, 0], couronne: [0, -68] };
  };
  D.chrono.essais = [{}, { a: 130, couronne: 1 }];
  /* ═══════════════════════════ AJOUTS PARTIE 4 (étape « scènes, partie 4 ») ═══════════════════════════ */

  /* D.badgeCle — la petite clé jaune dans un rond blanc, EXACTEMENT le badge « cle » de D.avatar (scène 20) : à poser sur
   * D.avatarPatient, qui n'a pas de badge. Rayon o.rb (18 ; pour un avatar r 46 : 18), ancrage = centre du badge
   * (pour un avatar de rayon r : (0,72 r ; 0,72 r) depuis son centre). */
  D.badgeCle = (g, o = {}) => {
    const q = (o.rb || 18) / 18, b = el("g", { transform: `scale(${f(q)})` }, g);
    el("circle", { cx: 2, cy: 2.5, r: 18, fill: OMBRE }, b); el("circle", { cx: 0, cy: 0, r: 18, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, b);
    el("circle", { cx: -5, cy: -5, r: 5.5, fill: YEL, stroke: INK, "stroke-width": 2.2 }, b); el("circle", { cx: -5, cy: -5, r: 1.6, fill: "#FFFFFF", stroke: INK, "stroke-width": 1 }, b);
    ln(b, "M-1 -1 L9 9 M5 5 L8 2 M8 8 L11 5", 2.6);
    return { r: 18 * q };
  };
  D.badgeCle.essais = [{}, { rb: 26 }];

  /* D.bulleJugement — SON message, réduit, qui voyage du téléphone jusque dans la page du jugement (scène 21) : bulle VERTE (D.VERT)
   * 290 × 116, sans queue ; dedans, deux lignes illisibles, une barre de caviar, puis la seule ligne lisible sur deux lignes :
   * « … Vielleicht sitzt aber » / « ein Pups quer. » (Kalam 400, 17 px). Ancrage = centre.
   * o.n 0..5 : combien d'éléments du contenu sont visibles (elle « se remplit » sur l'écran du petit téléphone)
   * o.fond 0..1 (défaut 1) : la hachure verte, le fond et le contour s'effacent (il ne reste que le texte : un paragraphe de la page). */
  D.bulleJugement = (g, o = {}) => {
    const w = 290, h = 116, x0 = -w / 2, y0 = -h / 2, n = o.n == null ? 5 : clamp(o.n, 0, 5), fo = clamp(o.fond == null ? 1 : o.fond, 0, 1), V = D.VERT;
    if (fo > 0) {
      const b = el("g", { opacity: fo < 1 ? f(fo) : null }, g), C = U.ctx(b, 4895, false, 1), d = rr(x0, y0, w, h, 22);
      el("path", { d, fill: "#CFCFC8", transform: "translate(5 7)" }, b);
      U.shape(C, "bul", d, V, { sw: 3, r: 0.5 });
    }
    const L = [
      () => D.gribouillis(el("g", { transform: `translate(${x0 + 20} ${y0 + 10}) scale(0.8)` }, g), { w: 300, seed: 611 }),
      () => D.gribouillis(el("g", { transform: `translate(${x0 + 20} ${y0 + 26}) scale(0.8)` }, g), { w: 250, seed: 623 }),
      () => D.caviar(el("g", { transform: `translate(${x0 + 20} ${y0 + 44}) scale(0.55)` }, g), { w: 280, seed: 637 }),
      () => tx(g, "… Vielleicht sitzt aber", x0 + 20, y0 + 82, 17, "light", "start"),
      () => tx(g, "ein Pups quer.", x0 + 20, y0 + 104, 17, "light", "start"),
    ];
    L.slice(0, Math.round(n)).forEach((fn) => fn());
    return { w, h };
  };
  D.bulleJugement.essais = [{}, { n: 2 }, { fond: 0.4 }, { fond: 0 }];

})();
