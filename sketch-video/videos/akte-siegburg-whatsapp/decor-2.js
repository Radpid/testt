/* decor-2.js — AKTE 07 « الگروپ » : décors et objets PROPRES à l'épisode, 2e partie (scènes 6 à 16).
 * Mêmes conventions, mêmes matières et mêmes aides que decor.js (lire son en-tête : ancrages « écran » / « objet » / « meuble »,
 * trait à main levée, ombre #D2D2CB, textes tx(…) au côté VISUEL). Liste d'état de tout l'inventaire : en tête de decor.js.
 * Essai : node tools/essai_decor.mjs videos/akte-siegburg-whatsapp --only fenetre,rideau,… --cols 2 --cell 540 --per 6
 *
 * Contenu (dans l'ordre des scènes) :
 *  F. le salon (sc. 6)          D.fenetre D.rideau D.lampadaire D.canapeDos D.canapeDevant D.gueridon D.tasseFumante D.tapis D.certificat
 *  D. le widget date (7, 12, 14) D.widgetDate
 *  B. le billet (sc. 8)          D.billetWeekend
 *  A. le fil (sc. 9, 10, 14)     D.avatarSil D.loupeCitation D.pouce D.ligneSysteme
 *     + (ajouts) D.accolade D.fleche — traits à main levée des scènes 9 et 10, écrits une fois comme dessins
 *  D. papier (sc. 12)            D.soleilEte D.enveloppe D.lettre D.stylo
 *  C. « Plans » (sc. 13)         D.champRecherche D.plansUI D.ficheLieu
 *  E. le départ (sc. 14)         D.carton  (les aimants gris sans pictogramme : D.aimant({ qui: "gris" }), dans decor.js)
 *  C. l'appel vidéo (sc. 15–16)  D.tuile D.salleAudience D.fondNeutre D.commandes D.plaqueNom ; B. D.camembert
 *
 * ATTENTION : tools/essai_decor.mjs charge ce fichier AVANT decor.js (ordre alphabétique) ; D.outils, D.TEL, D.gribouillis,
 * D.avatar, D.vapeur… ne sont lus qu'À L'INTÉRIEUR des fonctions (jamais au chargement du fichier).
 * Couleurs : encre, papier, gris, jaune ; AUCUN vert (la teinte est réservée à SA bulle), aucun bleu.
 */
(function () {
  "use strict";
  const SC = SketchCast, U = SC.util, PE = window.Persona, MAT = (PE && PE.MAT) || SC.MAT, NS = "http://www.w3.org/2000/svg";
  const INK = "#1C1A1C", YEL = "#F8CE4E", OMBRE = "#D2D2CB", ECRAN = "#FCFCF9", PAPIER = "#F7F7F1", GRIS = "#B4B4AE", SOMBRE = "#3A3A37";
  const el = (tag, a, p) => { const n = document.createElementNS(NS, tag); for (const k in a || {}) if (a[k] != null) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; };
  const D = window.EpDecor = window.EpDecor || {};
  const f = (v) => Math.round(v * 10) / 10, clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, p) => a + (b - a) * p;
  const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const ln = (g, d, w, col, extra) => el("path", Object.assign({ d, fill: "none", stroke: col || INK, "stroke-width": w || 2, "stroke-linecap": "round", "stroke-linejoin": "round" }, extra || {}), g);
  const rond = (cx, cy, r) => `M${f(cx - r)} ${f(cy)}A${f(r)} ${f(r)} 0 1 1 ${f(cx + r)} ${f(cy)}A${f(r)} ${f(r)} 0 1 1 ${f(cx - r)} ${f(cy)}Z`;
  const ovale = (cx, cy, rx, ry) => `M${f(cx - rx)} ${f(cy)}A${f(rx)} ${f(ry)} 0 1 1 ${f(cx + rx)} ${f(cy)}A${f(rx)} ${f(ry)} 0 1 1 ${f(cx - rx)} ${f(cy)}Z`;
  const rr = (x, y, w, h, r) => U.rrect(x, y, w, h, r);
  // aides de decor.js, lues À L'APPEL
  const tx = (...a) => D.outils.tx(...a), mesure = (...a) => D.outils.mesure(...a), nid = (p) => D.outils.nid(p), rrectInv = (...a) => D.outils.rrectInv(...a);
  // paramètres Persona pour les essais (les scènes passent CAST.X)
  const P_LUI = { look: "man", hair: "shortcurly", hairTone: "brown", beard: "stubble", seed: 702 };
  const P_ELLE = { look: "woman", hair: "longwave", hairTone: "blond", seed: 701 };

  // matières de cette partie : gris chauds et papier seulement
  const TISSU = { base: "#DEDCD3", hatch: "#97948A", gap: 6.2, fw: 1.2 };     // le canapé (plus clair que son pull « mid »)
  const VOILE = { base: "#FAF9F4", hatch: "#D3D1C7", gap: 8, fw: 1.1 };      // rideaux, abat-jour
  const CARTON = { base: "#E6E2D6", hatch: "#A8A190", gap: 6, fw: 1.2 };
  const AU = { base: YEL, hatch: "#E3B13A", gap: 8.5, fw: 1.05 };             // le certificat jaune (hachure lâche : le texte reste lisible)
  const CUIR = { base: "#D6D4CC", hatch: "#8E8B80", gap: 5.5, fw: 1.3 };     // dossiers des fauteuils du tribunal

  /* ═══════════════════════════ F. LE SALON (scène 6) — monde ═══════════════════════════
   * Caméra { s: 1, cx: 540, cy: 920 } ; D.piece({ sol: "parquet", solY: 1150, rayures: true }). Mur nu réservé au certificat puis à
   * la bulle : x 365 → 745, y 572 → 810. Ordre : pièce · fenêtre · rideaux · lampadaire · tapis · canapeDos · LUI · canapeDevant
   * · guéridon · tasse ; le cône de lumière peut se poser par-dessus (D.lampadaire({ partie: "cone" })). */

  /* D.fenetre — fenêtre à deux vantaux, tringle à rideaux au-dessus, ciel gris très pâle (aucun bleu), un nuage, des toits au loin,
   * appui en bas. Cadre 180 × 330. Ancrage = centre du cadre ; monde : D.fenetre.at (cadre x 150 → 330, y 560 → 890 ; tringle y 540).
   * o.nuage = position x du nuage dans la vitre (−130 … 130 ; il dérive de 12 px/s : arrondir à 1 px), découpé par l'ouverture. Entrée : grow. */
  D.fenetre = (g, o = {}) => {
    const C = U.ctx(g, 4500, false, 1), nx = o.nuage == null ? 14 : o.nuage;
    // tringle à rideaux (monde y 540) : deux supports, deux embouts
    el("path", { d: rr(-124, -189, 248, 8, 4), fill: OMBRE, transform: "translate(3 6)" }, g);
    [-104, 104].forEach((x) => ln(g, `M${x} -199 L${x} -186`, 3.6, SOMBRE));
    U.shape(C, "tringle", rr(-124, -189, 248, 8, 4), MAT.mid, { sw: 2, r: 0.4 });
    [-127, 127].forEach((x) => el("circle", { cx: x, cy: -185, r: 7, fill: SOMBRE, stroke: INK, "stroke-width": 1.8 }, g));
    el("path", { d: rr(-90 + 8, -165 + 9, 180, 330, 4), fill: OMBRE }, g);                                        // ombre du dormant
    // la vue : ciel, nuage, toits (découpés par l'ouverture)
    const id = nid("fe"), cp = el("clipPath", { id }, g); el("rect", { x: -76, y: -151, width: 152, height: 302 }, cp);
    const v = el("g", { "clip-path": `url(#${id})` }, g);
    el("rect", { x: -76, y: -151, width: 152, height: 302, fill: "#ECEEEA" }, v);
    const cl = el("g", { transform: `translate(${f(nx)} -78)` }, v);
    el("path", { d: "M-46 14 C-60 14 -60 -4 -46 -6 C-46 -22 -24 -27 -16 -14 C-10 -31 18 -31 22 -12 C34 -19 49 -8 40 4 C52 6 50 14 40 14 Z", fill: "#FFFFFF", stroke: "#A9A9A2", "stroke-width": 2.2, "stroke-linejoin": "round" }, cl);
    el("path", { d: "M-76 152 L-76 96 L-54 96 L-41 78 L-28 96 L-8 96 L-8 108 L16 108 L16 84 L27 84 L27 108 L42 108 L57 90 L72 108 L76 108 L76 152 Z", fill: "#DCDDD8", stroke: "#B9BAB4", "stroke-width": 1.6, "stroke-linejoin": "round" }, v);
    ln(v, "M-60 -100 L-36 -128 M-56 -84 L-44 -98 M16 -40 L40 -68", 2.6, "#FFFFFF", { opacity: 0.85 });           // reflets sur la vitre
    // dormant (anneau), deux vantaux, la crémone
    U.shape(C, "dormant", rr(-90, -165, 180, 330, 4) + " " + rrectInv(-76, -151, 152, 302, 2), MAT.white, { sw: 2.6, r: 0.5 });
    U.shape(C, "vg", rr(-76, -151, 76, 302, 2) + " " + rrectInv(-66, -141, 58, 282, 2), MAT.white, { sw: 2.2, r: 0.5 });
    U.shape(C, "vd", rr(0, -151, 76, 302, 2) + " " + rrectInv(8, -141, 58, 282, 2), MAT.white, { sw: 2.2, r: 0.5 });
    el("rect", { x: 2, y: -6, width: 6, height: 26, rx: 3, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g);
    el("path", { d: rr(-100 + 4, 165 + 5, 200, 14, 3), fill: OMBRE }, g);                                            // appui
    U.shape(C, "appui", rr(-100, 165, 200, 14, 3), MAT.white, { sw: 2.4, r: 0.5 });
    return { ouverture: [-76, -151, 152, 302], tringle: [0, -185] };
  };
  D.fenetre.at = [240, 725];
  D.fenetre.essais = [{}, { nuage: -90 }];

  /* D.rideau — rideau clair à plis, suspendu à la tringle par cinq anneaux, ourlet ondulé ; il s'évase vers le mur (côté extérieur).
   * 54 × 370 environ. Ancrage = milieu du haut (sur la tringle) = pivot du balancement (swing, puis m.sway ±1,2°, 4,2 s).
   * o.cote "g" (défaut) | "d" (miroir). Monde : D.rideau.at (gauche, x 122 → 176) et D.rideau.atDroite (droite, x 304 → 358), y 540 → 910. */
  D.rideau = (g, o = {}) => {
    const dr = o.cote === "d", h = o.h || 370, b = el("g", { transform: dr ? "scale(-1 1)" : null }, g), C = U.ctx(b, dr ? 4511 : 4510, dr, 1);
    const d = `M-24 4 L24 4 C26 ${f(h * 0.4)} 28 ${f(h * 0.75)} 30 ${h - 8} Q22 ${h - 1} 14 ${h - 7} Q6 ${h + 1} -3 ${h - 6} Q-12 ${h + 2} -21 ${h - 5} Q-29 ${h + 1} -36 ${h - 6} C-32 ${f(h * 0.75)} -27 ${f(h * 0.4)} -24 4 Z`;
    el("path", { d, fill: OMBRE, transform: "translate(5 6)" }, b);
    U.shape(C, "voile", d, VOILE, { sw: 2.4, r: 0.6 });
    ln(b, `M-13 10 C-15 ${f(h * 0.4)} -18 ${f(h * 0.7)} -21 ${h - 12} M2 10 C2 ${f(h * 0.4)} 1 ${f(h * 0.7)} -2 ${h - 10} M15 10 C17 ${f(h * 0.4)} 19 ${f(h * 0.7)} 18 ${h - 12}`, 1.6, "#A9A79C");
    for (let i = 0; i < 5; i++) el("circle", { cx: -20 + i * 10, cy: 0, r: 4.4, fill: "none", stroke: SOMBRE, "stroke-width": 2 }, b);
    return { bas: [0, h] };
  };
  D.rideau.at = [149, 540]; D.rideau.atDroite = [331, 540];
  D.rideau.essais = [{}, { cote: "d" }];

  /* D.lampadaire — lampadaire à arc : socle rond, tige, arc, abat-jour ; cône de lumière jaune (opacité 0,13) vers le canapé.
   * Ancrage = centre du socle (le pivot du balancement) ; monde : D.lampadaire.at (socle (836, 1175), abat-jour x 745 → 835, y 535 → 595).
   * o.partie : "lampe" (sans le cône) | "cone" (le cône seul, à poser par-dessus le canapé) | défaut : les deux. o.lumiere 0..1.
   * Renvoie { abat, pied, cone: { x, y, w, h } } (boîte du cône, repère local : m.dust dedans). Entrée : drop + m.pend. */
  D.lampadaire = (g, o = {}) => {
    const part = o.partie, C = U.ctx(g, 4520, false, 1), lum = o.lumiere == null ? 1 : clamp(o.lumiere, 0, 1);
    const cone = "M-87 -580 L-5 -580 L-22 -76 L-292 -76 Z";
    if (part !== "lampe" && lum > 0) el("path", { d: cone, fill: YEL, opacity: f(0.13 * lum) }, g);
    if (part === "cone") return { abat: [-46, -580], cone: { x: -292, y: -580, w: 287, h: 504 } };
    el("ellipse", { cx: 10, cy: 3, rx: 50, ry: 9, fill: "rgba(28,26,28,.13)" }, g);                                // ombre au sol
    const tige = "M0 -8 L3 -560 C6 -654 -26 -686 -46 -652";
    ln(g, tige, 7.5, INK); ln(g, tige, 3.2, "#8A8A84");
    U.shape(C, "socle", "M-40 -4 Q-40 -16 0 -16 Q40 -16 40 -4 Q40 6 0 6 Q-40 6 -40 -4 Z", MAT.dark, { sw: 2.2, r: 0.5 });
    el("ellipse", { cx: -46, cy: -579, rx: 39, ry: 6.5, fill: "#FFF6C9", stroke: INK, "stroke-width": 1.6 }, g);   // la lumière sous l'abat-jour
    U.shape(C, "abat", "M-66 -642 L-26 -642 L-2 -581 L-90 -581 Z", VOILE, { sw: 2.6, r: 0.5 });
    ln(g, "M-63 -632 L-29 -632 M-82 -594 L-10 -594", 1.4, "#A9A79C");
    el("circle", { cx: -46, cy: -647, r: 5, fill: SOMBRE, stroke: INK, "stroke-width": 1.6 }, g);
    el("rect", { x: -1.5, y: -312, width: 9, height: 16, rx: 3, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);   // l'interrupteur
    return { abat: [-46, -580], pied: [0, 0], cone: { x: -292, y: -580, w: 287, h: 504 } };
  };
  D.lampadaire.at = [836, 1175];
  D.lampadaire.essais = [{}, { partie: "lampe" }];

  /* D.canapeDos — dossier (deux coussins, passepoil) + deux accoudoirs du canapé, tissu hachuré gris chaud. 524 × 355.
   * Ancrage = milieu du bas, au sol ; monde : D.canapeDos.at (x 250 → 770 ; haut du dossier y 935 ; dessus des accoudoirs y 1040).
   * LUI s'assied DEVANT (de face, pieds à y 1276, échelle 1,05), puis D.canapeDevant le cache à partir des hanches (R8).
   * Le canapé (dos + LUI + devant) monte d'un seul bloc (rise). Renvoie l'accoudoir droit (où se pose le certificat : monde (738, 1040)). */
  D.canapeDos = (g) => {
    const C = U.ctx(g, 4530, false, 1);
    el("path", { d: rr(-252 + 11, -357 + 7, 512, 357, 32), fill: OMBRE }, g);                                      // ombre sur le mur
    U.shape(C, "dossier", rr(-238, -355, 476, 262, 34), TISSU, { sw: 2.8, r: 0.6 });
    [[-224, 214], [10, 214]].forEach(([x, w], i) => {
      el("path", { d: rr(x + 3, -339 + 5, w, 188, 28), fill: "rgba(28,26,28,.10)" }, g);
      U.shape(C, "cd" + i, rr(x, -339, w, 188, 28), TISSU, { sw: 2.4, r: 0.6 });
      ln(g, `M${x + 20} -325 Q${x + w / 2} -333 ${x + w - 20} -325`, 1.6, "#77776F");                              // passepoil
      ln(g, `M${x + w / 2 - 30} -250 q30 10 60 0`, 1.4, "#8A877C");                                                  // creux du coussin
    });
    [-262, 178].forEach((x0, i) => {                                                                                // accoudoirs
      el("path", { d: rr(x0 + 5, -250 + 6, 84, 244, 30), fill: "rgba(28,26,28,.12)" }, g);
      U.shape(C, "acc" + i, rr(x0, -250, 84, 244, 30), TISSU, { sw: 2.8, r: 0.6 });
      ln(g, `M${x0 + 12} -233 Q${x0 + 42} -247 ${x0 + 72} -233`, 1.6, "#77776F");
      ln(g, `M${x0 + 7} -204 Q${x0 + 42} -193 ${x0 + 77} -204`, 1.9, "#55524B");                                   // l'arête : dessus / face avant
    });
    return { accoudoirD: [228, -250], accoudoirG: [-220, -250], dossier: [0, -355] };
  };
  D.canapeDos.at = [510, 1290];

  /* D.canapeDevant — l'assise vue de face (deux coussins, socle, quatre pieds) + le PLAID à carreaux gris posé sur ses genoux (il cache
   * les jambes de LUI), franges en bas. Ancrage = milieu du bas, au sol ; monde : D.canapeDevant.at (assise y 1085 → 1290 ;
   * plaid x 390 → 640, y 1085 → 1290). o.t 0..1 : phase des franges (elles ondulent ; arrondir à 0,05). */
  D.canapeDevant = (g, o = {}) => {
    const C = U.ctx(g, 4540, false, 1), t = o.t || 0;
    [[-182, 182], [0, 182]].forEach(([x, w], i) => {
      U.shape(C, "as" + i, rr(x, -205, w, 140, 22), TISSU, { sw: 2.6, r: 0.6 });
      ln(g, `M${x + 14} -186 Q${x + w / 2} -174 ${x + w - 14} -186`, 1.9, "#55524B");                              // arête du coussin
    });
    el("path", { d: rr(-262 + 5, -72 + 6, 524, 52, 8), fill: "rgba(28,26,28,.12)" }, g);
    U.shape(C, "socle", rr(-262, -72, 524, 52, 8), MAT.mid, { sw: 2.6, r: 0.5 });
    [-232, -122, 122, 232].forEach((x, i) => U.shape(C, "pied" + i, `M${x - 9} -21 L${x + 9} -21 L${x + 5} 0 L${x - 5} 0 Z`, MAT.dark, { sw: 1.8, r: 0.4 }));
    // le plaid : posé sur les genoux (bord haut bombé), il retombe jusqu'au sol
    const pd = "M-124 -196 C-80 -216 64 -216 134 -198 C140 -140 146 -66 142 -10 Q100 -4 60 -9 Q10 -3 -40 -9 Q-90 -4 -130 -10 C-134 -66 -132 -140 -124 -196 Z";
    el("path", { d: pd, fill: "rgba(28,26,28,.13)", transform: "translate(6 5)" }, g);
    el("path", { d: pd, fill: "#F4F3EE" }, g);
    const id = nid("pl"), cp = el("clipPath", { id }, g); el("path", { d: pd }, cp);
    const k = el("g", { "clip-path": `url(#${id})` }, g);
    for (let x = -118; x < 150; x += 42) { el("rect", { x, y: -220, width: 13, height: 220, fill: "#8C897F", opacity: 0.3 }, k); el("rect", { x: x + 18, y: -220, width: 3, height: 220, fill: "#8C897F", opacity: 0.35 }, k); }
    for (let y = -184; y < 0; y += 42) { el("rect", { x: -140, y, width: 290, height: 13, fill: "#8C897F", opacity: 0.3 }, k); el("rect", { x: -140, y: y + 18, width: 290, height: 3, fill: "#8C897F", opacity: 0.35 }, k); }
    ln(k, "M-42 -200 C-48 -140 -52 -70 -50 -8 M64 -204 C70 -140 74 -70 72 -8", 1.6, "#6E6B62", { opacity: 0.7 });  // plis
    U.stroke(C, "plaid", pd, { sw: 2.6, r: 0.5 });
    ln(g, "M-120 -184 C-78 -200 62 -200 132 -186", 1.7, "#55524B");                                                // le bord roulé
    let fr = ""; for (let x = -124; x <= 138; x += 9) { const a = Math.sin((t + x / 70) * Math.PI * 2) * 2.4; fr += `M${x} -9 L${f(x + a)} 5`; }
    ln(g, fr, 2.2, "#6E6B62");
    return { plaid: [5, -200] };
  };
  D.canapeDevant.at = [510, 1290];
  D.canapeDevant.essais = [{}, { t: 0.5 }];

  /* D.gueridon — petit guéridon rond : plateau (ellipse + chant), tige, socle. 100 × 160.
   * Ancrage = centre du plateau ; monde : D.gueridon.at (plateau x 138 → 238, y 1100 ; socle au sol y 1246). Entrée : rise. */
  D.gueridon = (g) => {
    const C = U.ctx(g, 4550, false, 1);
    el("ellipse", { cx: 8, cy: 150, rx: 42, ry: 8, fill: "rgba(28,26,28,.13)" }, g);
    ln(g, "M0 8 L0 140", 7.5, INK); ln(g, "M0 10 L0 138", 3, "#8A8A84");
    U.shape(C, "socle", ovale(0, 144, 30, 7), MAT.mid, { sw: 2.2, r: 0.4 });
    U.shape(C, "chant", "M-50 0 L-50 8 A50 11 0 0 0 50 8 L50 0 A50 11 0 0 1 -50 0 Z", MAT.wood, { sw: 2.2, r: 0.4 });
    U.shape(C, "plateau", ovale(0, 0, 50, 11), MAT.white, { sw: 2.4, r: 0.4 });
    return { plateau: [0, 0] };
  };
  D.gueridon.at = [188, 1100];

  /* D.tasseFumante — tasse à anse + vapeur continue. 46 × 40 (+ vapeur). Ancrage = milieu du bas ; monde : D.tasseFumante.at
   * (x 166 → 212, y 1060 → 1100, posée sur le guéridon). o.t 0..1 : phase de la vapeur (cycle ≈ 1,8 s ; arrondir à 0,05). Entrée : drop. */
  D.tasseFumante = (g, o = {}) => {
    const C = U.ctx(g, 4560, false, 1);
    el("ellipse", { cx: 3, cy: 1, rx: 24, ry: 4, fill: "rgba(28,26,28,.14)" }, g);
    ln(g, "M19 -31 q15 0 14 12 q-1 11 -16 9", 4.6); ln(g, "M19 -31 q15 0 14 12 q-1 11 -16 9", 1.6, "#FFFFFF");
    U.shape(C, "tasse", "M-22 -40 L22 -40 L19 -6 Q18 0 12 0 L-12 0 Q-18 0 -19 -6 Z", MAT.white, { sw: 2.5, r: 0.4 });
    el("ellipse", { cx: 0, cy: -40, rx: 21, ry: 4.5, fill: "#8A867C", stroke: INK, "stroke-width": 2 }, g);
    ln(g, "M-20 -25 L20 -25 M-19 -19 L19 -19", 2.2, GRIS);
    D.vapeur(el("g", { transform: "translate(0 -44)" }, g), { t: o.t == null ? 0.35 : o.t });
    return { haut: [0, -44] };
  };
  D.tasseFumante.at = [189, 1100];
  D.tasseFumante.essais = [{ t: 0.2 }, { t: 0.7 }];

  /* D.tapis — tapis ovale à bordure (pointillé + liseré + motif central). 660 × 88. Ancrage = centre ; monde : D.tapis.at (520, 1340).
   * Entrée : grow. */
  D.tapis = (g) => {
    const C = U.ctx(g, 4570, false, 1);
    el("ellipse", { cx: 6, cy: 7, rx: 330, ry: 44, fill: OMBRE }, g);
    U.shape(C, "tapis", ovale(0, 0, 330, 44), { base: "#ECEAE2", hatch: "#C4C1B5", gap: 9, fw: 1 }, { sw: 2.6, r: 0.6 });
    el("ellipse", { cx: 0, cy: 0, rx: 302, ry: 33, fill: "none", stroke: "#8A8A84", "stroke-width": 2, "stroke-dasharray": "10 7" }, g);
    el("ellipse", { cx: 0, cy: 0, rx: 268, ry: 24, fill: "#F3F2EC", stroke: "#8A8A84", "stroke-width": 1.6 }, g);
    ln(g, "M-150 0 l18 -9 l18 9 l18 -9 l18 9 M78 0 l18 -9 l18 9 l18 -9 l18 9", 2, "#A9A79C");
    el("path", { d: "M-22 0 L0 -12 L22 0 L0 12 Z", fill: "#E0DED5", stroke: "#8A8A84", "stroke-width": 1.8 }, g);
    return { w: 660, h: 88 };
  };
  D.tapis.at = [520, 1340];

  /* D.certificat — l'arrêt de travail : feuille JAUNE (le seul jaune franc du salon), trombone, « Arbeitsunfähigkeits- » /
   * « bescheinigung » (17 px), cases de formulaire, « bis 02.06.2025 » (26 px), tampon rond « Notaufnahme » (14 px). 180 × 236.
   * Ancrage = centre. o.cercle 0..1 : un cercle d'encre se trace autour de la date (0,3 s) · o.tampon 0..1 (défaut 1) : le tampon claque
   * (de ×1,6 à ×1, il fonce). Aucun nom, aucun hôpital, aucun diagnostic. pop (incliné de −5°), float, puis ×0,42 vers l'accoudoir. */
  D.certificat = (g, o = {}) => {
    const C = U.ctx(g, 4580, false, 1), ce = clamp(o.cercle || 0, 0, 1), ta = o.tampon == null ? 1 : clamp(o.tampon, 0, 1);
    const fe = "M-90 -118 L90 -118 L90 118 L-90 118 Z";
    el("path", { d: fe, fill: OMBRE, transform: "translate(6 8)" }, g);
    U.shape(C, "feuille", fe, AU, { sw: 2.6, r: 0.5 });
    const t1 = "Arbeitsunfähigkeits-", t2 = "bescheinigung", fs = Math.min(17, Math.floor((17 * 158) / Math.max(1, mesure(t1, 17, "de"))));
    tx(g, t1, -79, -84, fs, "de", "start"); tx(g, t2, -79, -65, fs, "de", "start");
    ln(g, "M-79 -56 L79 -56", 1.8, INK);
    [[-79, -48, 74, 19], [5, -48, 74, 19], [-79, -24, 158, 19]].forEach(([x, y, w, h]) => {
      el("rect", { x, y, width: w, height: h, fill: "rgba(255,255,255,.5)", stroke: "#8F7A2E", "stroke-width": 1.3 }, g);
      ln(g, `M${x + 6} ${y + 10} h${Math.round(w * 0.55)}`, 2.4, "#B9A25A");
    });
    // « bis 02.06.2025 » : sur une ligne si elle tient en 26 px, sinon « bis » au-dessus de la date
    const s = "bis 02.06.2025", ws = mesure(s, 26, "de"), uneLigne = ws <= 160;
    if (uneLigne) tx(g, s, 0, 30, 26, "de");
    else { tx(g, "bis", -62, 12, 18, "light", "start"); tx(g, "02.06.2025", 0, 34, 26, "de"); }
    const cy = uneLigne ? 21 : 19;
    if (ce > 0) {   // cercle à main levée, un tour et un peu plus
      const rx = (uneLigne ? ws : mesure("02.06.2025", 26, "de")) / 2 + 12, ry = uneLigne ? 22 : 27, pts = [], n = 30;
      for (let i = 0; i <= n; i++) { const a = -2.6 + (i / n) * Math.PI * 2.15 * ce, q = 1 + 0.03 * Math.sin(a * 3); pts.push([Math.cos(a) * rx * q, cy + Math.sin(a) * ry * q]); }
      ln(g, U.curve(pts), 3.2, INK);
    }
    ln(g, "M-76 96 q7 -16 13 -2 t13 -4 t11 2 q6 -10 12 0", 2, "#55524B");                                          // signature (gribouillis)
    if (ta > 0) {   // tampon rond, encre grise ; « Notaufnahme » court le long du bord (textPath)
      const k = lerp(1.6, 1, ta), tg = el("g", { transform: `translate(50 80) rotate(-12) scale(${f(k)})`, opacity: f(0.25 + 0.65 * ta) }, g);
      el("circle", { cx: 0, cy: 0, r: 36, fill: "rgba(255,255,255,.22)", stroke: SOMBRE, "stroke-width": 3 }, tg);
      el("circle", { cx: 0, cy: 0, r: 31, fill: "none", stroke: SOMBRE, "stroke-width": 1.3 }, tg);
      const pid = nid("ta"), R = 20.5, a0 = (150 * Math.PI) / 180, a1 = (30 * Math.PI) / 180;
      el("path", { id: pid, d: `M${f(Math.cos(a0) * R)} ${f(Math.sin(a0) * R)} A${R} ${R} 0 1 1 ${f(Math.cos(a1) * R)} ${f(Math.sin(a1) * R)}`, fill: "none" }, tg);
      const t = el("text", { "font-family": D.outils.FONT.de[0], "font-weight": 700, "font-size": 14, fill: SOMBRE, "letter-spacing": 0.4 }, tg);
      el("textPath", { href: `#${pid}`, startOffset: "50%", "text-anchor": "middle" }, t).textContent = "Notaufnahme";
      ln(tg, "M-13 14 H13 M-9 21 H9", 2, SOMBRE);
    }
    const clip = "M52 -132 L52 -111 Q52 -104 58 -104 Q64 -104 64 -111 L64 -127 Q64 -132 60 -132 Q56 -132 56 -127 L56 -114";
    ln(g, clip, 4.6, INK); ln(g, clip, 2, "#DADAD3");
    return { date: [0, cy], tampon: [50, 80], w: 180, h: 236 };
  };
  D.certificat.essais = [{ tampon: 0 }, { cercle: 1 }, { tampon: 0.4, cercle: 0.5 }];

  /* ═══════════════════════════ LE WIDGET « DATE » (scènes 7, 12, 14) ═══════════════════════════ */

  /* D.widgetDate — le widget « date » du téléphone, agrandi, posé à plat (sur le mur ou sur le papier) comme une vignette d'écran :
   * coins arrondis (r 22), bandeau gris + o.haut, grand o.jour (Kalam 64 px à 170 px de haut), petit o.bas. AUCUN clou, aucun bloc
   * de feuilles, rien qui s'arrache (l'éphéméride est le dispositif d'AKTE 06). 150 × 170 (défaut) ou o.petit : 110 × 136 (au mur).
   * Ancrage = milieu du bord haut. Alias : o.mois = o.haut, o.an = o.bas.
   *   scène 7 : { petit: true, haut: "SA", jour: "31", bas: "MAI" } · scène 12 : { haut: "JULI", jour: "25", bas: "2025" }
   *   scène 14 : { petit: true, haut: "DEZ", jour: "31", bas: "2025", roule, pos }
   * o.roule 0..1 : < 1 = la roue tourne (lignes floues, ILLISIBLES ; plus la valeur est basse, plus c'est flou) ; 1 (défaut) = calée.
   * o.pos (px) : position de la roue (pendant qu'elle tourne : pos = t × 600, arrondi) ou petit décalage du rebond une fois calée. */
  D.widgetDate = (g, o = {}) => {
    const w = o.w || (o.petit ? 110 : 150), h = o.h || (o.petit ? 136 : 170), k = h / 170, r = 22 * k, x0 = -w / 2, bh = Math.round(h * 0.27);
    const haut = o.haut != null ? o.haut : o.mois != null ? o.mois : "JULI", jour = o.jour != null ? String(o.jour) : "25", bas = o.bas != null ? o.bas : o.an != null ? o.an : "2025";
    const roule = o.roule == null ? 1 : clamp(o.roule, 0, 1), pos = o.pos || 0, C = U.ctx(g, 4600, false, 1);
    el("path", { d: rr(x0 + 5, 6, w, h, r), fill: OMBRE }, g);
    U.shape(C, "fond", rr(x0, 0, w, h, r), MAT.white, { sw: 2.6, r: 0.5 });
    const id = nid("wd"), cp = el("clipPath", { id }, g); el("path", { d: rr(x0 + 1.6, 1.6, w - 3.2, h - 3.2, r - 1.6) }, cp);
    const v = el("g", { "clip-path": `url(#${id})` }, g);
    el("rect", { x: x0, y: 0, width: w, height: bh, fill: "#D9D9D2" }, v);
    // [y0, y1, couleur, largeur, épaisseur, pas] : chaque ligne tourne comme une roue de sélection ; ce qui défile = des traits
    // horizontaux (la convention « texte illisible » de l'épisode), jamais des formes verticales (qui liraient « pause »)
    const rows = [[0, bh, "#FFFFFF", 0.5, 0.05, 0.5], [bh, h * 0.75, SOMBRE, 0.56, 0.085, 0.36], [h * 0.75, h, "#8A8A84", 0.44, 0.04, 0.55]];
    if (roule < 1) {   // la roue tourne : des traits flous montent, s'amincissent au bord de la ligne (cylindre), laissent une traînée
      const fl = 1 - roule;
      rows.forEach(([y0, y1, col, lw, ep, pk], ri) => {
        const H = y1 - y0, rid = nid("wr"), rc = el("clipPath", { id: rid }, v); el("rect", { x: x0, y: y0, width: w, height: H }, rc);
        const rg = el("g", { "clip-path": `url(#${rid})` }, v), pas = H * pk, off = ((pos * (1 + ri * 0.18)) % pas + pas) % pas;
        for (let j = -3; j <= 3; j++) {
          const cy = y0 + H / 2 + j * pas - off, e = clamp(1 - Math.abs(cy - (y0 + H / 2)) / (H * 0.6), 0, 1);   // 1 au centre de la ligne, 0 au bord
          if (e <= 0) continue;
          const ww = w * lw * (0.6 + 0.4 * hash(j + Math.floor(pos / pas) * 3 + ri * 7)), th = Math.max(2, h * ep * (0.3 + 0.7 * e));
          el("rect", { x: f(-ww / 2), y: f(cy - th / 2), width: f(ww), height: f(th), rx: f(th / 2), fill: col, opacity: f((0.3 + 0.6 * e) * (1 - 0.3 * fl)) }, rg);
          el("rect", { x: f(-ww * 0.42), y: f(cy + th * 0.2), width: f(ww * 0.84), height: f(th * (1 + 2.2 * fl)), rx: f(th / 2), fill: col, opacity: f(0.2 * fl * e) }, rg);   // traînée
        }
        ln(rg, `M${f(x0 + 9)} ${f(y0 + H * 0.22)} V${f(y1 - H * 0.22)} M${f(-x0 - 9)} ${f(y0 + H * 0.22)} V${f(y1 - H * 0.22)}`, 2, ri ? "#B4B4AE" : "#FFFFFF", { opacity: f(0.8 * fl) });   // traits de vitesse
      });
    } else {
      tx(v, haut, 0, f(bh / 2 + 9 * k + pos), Math.round(25 * k), "de");
      tx(v, jour, 0, f(bh + 70 * k + pos), Math.round(64 * k), "de");
      tx(v, bas, 0, f(h - 17 * k + pos), Math.round(20 * k), "light", "middle", { fill: "#55524B" });
    }
    ln(g, `M${x0} ${bh} H${-x0}`, 2, INK);
    return { w, h, bas: [0, h] };
  };
  D.widgetDate.essais = [{}, { petit: true, haut: "SA", jour: "31", bas: "MAI" }, { petit: true, haut: "DEZ", jour: "31", bas: "2025", roule: 0.2, pos: 37 }, { petit: true, roule: 0.8, pos: 120 }];

  /* ═══════════════════════════ B. LE BILLET (scène 8) ═══════════════════════════ */

  /* D.billetWeekend — billet à bords crantés : à gauche une montagne + un soleil, à droite « Wochenende » et « 549 € » (Kalam 44 px) ;
   * ligne perforée au milieu (encoches en haut et en bas). 300 × 130, ancrage = centre.
   * o.dechire 0..1 : il se déchire le long de la perforation (bord dentelé), les deux moitiés s'écartent (± 26 px) et pivotent (± 9°).
   * o.moitie "g" | "d" : ne dessiner qu'UNE moitié (à sa place) — deux nœuds pour qu'elles tombent chacune de leur côté. */
  D.billetWeekend = (g, o = {}) => {
    const d = clamp(o.dechire || 0, 0, 1), W2 = 150, H2 = 65, C = U.ctx(g, 4610, false, 1);
    const zig = (x, y0, y1, dir) => { let s = ""; const n = 12; for (let i = 1; i <= n; i++) s += ` L${f(x + (i % 2 ? dir * 6 : 0))} ${f(lerp(y0, y1, i / n))}`; return s; };
    const jag = []; for (let i = 0; i <= 12; i++) jag.push([i === 0 || i === 12 ? 0 : (hash(i * 3.7 + 2) - 0.5) * 10, lerp(-55, 55, i / 12)]);
    const moitieD = (side) => {   // side −1 : gauche, +1 : droite (bord de la déchirure commun aux deux)
      const sw = side < 0 ? 0 : 1, X = side * W2;
      let p = `M${X} ${-H2} L${side * 10} ${-H2} A10 10 0 0 ${sw} 0 ${-H2 + 10}`;
      jag.forEach(([x, y]) => { p += ` L${f(x)} ${f(y)}`; });
      return p + ` A10 10 0 0 ${sw} ${side * 10} ${H2} L${X} ${H2}` + zig(X, H2, -H2, -side) + " Z";
    };
    const contenu = (gg, side) => {
      if (side < 0) {   // montagne + soleil
        el("circle", { cx: -46, cy: -26, r: 12, fill: YEL, stroke: INK, "stroke-width": 2.4 }, gg);
        const Cm = U.ctx(gg, 4612, false, 1);
        U.shape(Cm, "mont", "M-128 38 L-96 -16 L-78 8 L-62 -6 L-30 38 Z", MAT.grey, { sw: 2.6, r: 0.5 });
        el("path", { d: "M-104 -2 L-96 -16 L-88 -3 L-93 0 L-97 -4 L-101 0 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, gg);
        ln(gg, "M-134 38 L-22 38", 2.6);
      } else {
        tx(gg, "Wochenende", 75, -20, 22, "de");
        tx(gg, "549 €", 75, 36, 44, "de");
      }
      ln(gg, side < 0 ? rr(-140, -55, 126, 110, 8) : rr(14, -55, 126, 110, 8), 1.3, "#C9C9C2");
    };
    if (d === 0 && !o.moitie) {
      const p = `M${-W2} ${-H2} L-10 ${-H2} A10 10 0 0 0 10 ${-H2} L${W2} ${-H2}` + zig(W2, -H2, H2, -1) + ` L10 ${H2} A10 10 0 0 0 -10 ${H2} L${-W2} ${H2}` + zig(-W2, H2, -H2, 1) + " Z";
      el("path", { d: p, fill: OMBRE, transform: "translate(5 7)" }, g);
      U.shape(C, "billet", p, MAT.white, { sw: 2.8, r: 0.5 });
      contenu(g, -1); contenu(g, 1);
      ln(g, "M0 -52 L0 52", 2.4, "#8A8A84", { "stroke-dasharray": "5 6" });
    } else {
      [-1, 1].forEach((side) => {
        if (o.moitie && (o.moitie === "g") !== (side < 0)) return;
        const hg = el("g", { transform: `translate(${f(side * 26 * d)} ${f(5 * d)}) rotate(${f(side * 9 * d)} ${side * 75} 0)` }, g), Ch = U.ctx(hg, 4610 + side, false, 1), p = moitieD(side);
        el("path", { d: p, fill: OMBRE, transform: "translate(5 7)" }, hg);
        U.shape(Ch, "moitie", p, MAT.white, { sw: 2.8, r: 0.5 });
        contenu(hg, side);
      });
    }
    return { w: 300, h: 130, gauche: [-75, 0], droite: [75, 0] };
  };
  D.billetWeekend.essais = [{}, { dechire: 0.5 }, { dechire: 1 }, { dechire: 1, moitie: "d" }];

  /* ═══════════════════════════ A. LE FIL (scènes 9, 10, 11, 14) ═══════════════════════════ */

  /* D.avatarSil — « une collègue des urgences » : buste de femme SANS visage, coupe au carré, aplat hachuré gris, contour encre ; aucun
   * métier (ni blouse, ni stéthoscope), aucun téléphone, aucun écran. Rayon o.r (56 en scène 9), ancrage = centre. Elle flotte (float). */
  D.avatarSil = (g, o = {}) => {
    const r = o.r || 56, k = r / 82, sw = Math.max(2.4, r * 0.07);
    el("circle", { cx: f(r * 0.09), cy: f(r * 0.12), r, fill: OMBRE }, g);
    el("circle", { cx: 0, cy: 0, r, fill: "#ECECE7" }, g);
    const id = nid("si"), cp = el("clipPath", { id }, g); el("circle", { cx: 0, cy: 0, r: f(r - sw / 2) }, cp);
    const b = el("g", { transform: `translate(0 ${f(r * 0.08)}) scale(${k.toFixed(4)})` }, el("g", { "clip-path": `url(#${id})` }, g)), C = U.ctx(b, 4620, false, 1);
    U.shape(C, "buste", "M-80 104 C-80 60 -56 42 -26 37 Q0 49 26 37 C56 42 80 60 80 104 Z", MAT.mid, { sw: 2.8, stroke: INK });
    U.shape(C, "cou", "M-12 8 L-13 39 Q0 47 13 39 L12 8 Z", MAT.grey, { sw: 2.4, stroke: INK });
    U.shape(C, "carre", "M-41 -28 C-46 -68 -20 -82 0 -82 C20 -82 46 -68 41 -28 L44 22 Q32 30 22 21 L-22 21 Q-32 30 -44 22 Z", MAT.silD, { sw: 2.6, stroke: INK });
    U.shape(C, "tete", ovale(0, -18, 30, 36), MAT.grey, { sw: 2.6, stroke: INK });
    U.shape(C, "frange", "M-33 -24 C-35 -60 -14 -68 2 -66 C22 -66 35 -54 33 -27 C22 -42 8 -44 -4 -40 C-16 -44 -26 -38 -33 -24 Z", MAT.silD, { sw: 2.4, stroke: INK });
    el("circle", { cx: 0, cy: 0, r, fill: "none", stroke: INK, "stroke-width": f(sw) }, g);
    return { bord: r };
  };
  D.avatarSil.essais = [{ r: 56 }, { r: 30 }];

  /* D.accolade (ajout) — accolade « { » à main levée (scène 9 : UN seul message, x 196, y 920 → 1216). o.h (296), o.w (16), o.sw (4,5).
   * Ancrage = coin haut-gauche de sa boîte (la pointe est à gauche, au milieu). Elle se trace de haut en bas (wipe "ttb", 0,3 s). */
  D.accolade = (g, o = {}) => {
    const h = o.h || 296, w = o.w || 16, m = h / 2, q = w * 0.3;
    ln(g, `M${w} 0 Q${q} 0 ${q} ${f(h * 0.08)} L${q} ${f(m - 18)} Q${q} ${f(m - 3)} 0 ${f(m)} Q${q} ${f(m + 3)} ${q} ${f(m + 18)} L${q} ${f(h * 0.92)} Q${q} ${h} ${w} ${h}`, o.sw || 4.5, o.col || INK);
    return { h, pointe: [0, m] };
  };

  /* D.fleche (ajout) — flèche à main levée de o.de [x, y] à o.vers [x, y] (repère du groupe), courbée (o.courbe, part de la longueur,
   * + ou −), pleine ou o.pointille, pointe ouverte au bout. o.p 0..1 : la flèche se trace (la pointe apparaît à la fin). o.sw (4), o.col.
   * Scène 9 : L7 → avatar de LUI ; silhouette → ELLE (pointillé) ; pastille → silhouette (petite, courbe). */
  D.fleche = (g, o = {}) => {
    const a = o.de || [0, 0], b = o.vers || [220, -80], bend = o.courbe == null ? 0.18 : o.courbe, p = clamp(o.p == null ? 1 : o.p, 0, 1), sw = o.sw || 4, col = o.col || INK;
    const dx = b[0] - a[0], dy = b[1] - a[1], cx = (a[0] + b[0]) / 2 - dy * bend, cy = (a[1] + b[1]) / 2 + dx * bend;
    const Q = (t) => [(1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * cx + t * t * b[0], (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * cy + t * t * b[1]];
    const n = 48, m = Math.max(1, Math.round(n * p)), pts = []; for (let i = 0; i <= m; i++) pts.push(Q(i / n));
    if (o.pointille) {   // tirets de 14 px, espaces de 10 px, le long de la courbe
      let d = "", acc = 0, on = true, seg = [pts[0]];
      for (let i = 1; i < pts.length; i++) {
        const L = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); acc += L;
        if (on) seg.push(pts[i]);
        if (acc >= (on ? 14 : 10)) { if (on && seg.length > 1) d += "M" + seg.map((q) => `${f(q[0])} ${f(q[1])}`).join(" L"); on = !on; acc = 0; seg = [pts[i]]; }
      }
      if (on && seg.length > 1) d += "M" + seg.map((q) => `${f(q[0])} ${f(q[1])}`).join(" L");
      ln(g, d, sw, col);
    } else ln(g, "M" + pts.map((q) => `${f(q[0])} ${f(q[1])}`).join(" L"), sw, col);
    if (p >= 0.98) {
      const e = Q(1), e2 = Q(0.93), ang = Math.atan2(e[1] - e2[1], e[0] - e2[0]), L = 9 + sw * 2;
      ln(g, `M${f(e[0] + Math.cos(ang + 2.6) * L)} ${f(e[1] + Math.sin(ang + 2.6) * L)} L${f(e[0])} ${f(e[1])} L${f(e[0] + Math.cos(ang - 2.6) * L)} ${f(e[1] + Math.sin(ang - 2.6) * L)}`, sw, col);
    }
    return { de: a, vers: b, milieu: Q(0.5).map(f) };
  };
  D.fleche.essais = [{}, { de: [0, 0], vers: [346, 0], pointille: true, courbe: -0.1 }, { vers: [60, 120], courbe: 0.4, sw: 3.4, p: 0.6 }];

  /* D.loupeCitation — la carte qui « grossit » la dernière ligne : carte blanche (rayon 22) tenue par deux bouts de scotch gris,
   * liseré intérieur fin, reliée par un trait courbe à une ligne du fil (o.vers, RELATIF à l'ancrage ; un petit anneau l'y marque).
   * 658 × 190 (o.w, o.h : 230 si la traduction tient sur deux lignes, R5). Ancrage = coin haut-gauche ; scène 10 : (196, 596),
   * vers: [42, 584] (= L9 en (238, 1180)). o.j (°) : les scotchs frémissent. pop avec pivot = o.vers (absolu : ancrage + vers). */
  D.loupeCitation = (g, o = {}) => {
    const w = o.w || 658, h = o.h || 190, v = o.vers || [42, 584], j = o.j || 0, C = U.ctx(g, 4640, false, 1);
    const sx = clamp(v[0] + 96, 60, w - 60);
    ln(g, `M${f(sx)} ${h - 4} C${f(sx)} ${f(h + (v[1] - h) * 0.55)} ${f(v[0] + 34)} ${f(v[1] - 44)} ${f(v[0] + 9)} ${f(v[1] - 10)}`, 2.6, INK);
    el("circle", { cx: v[0], cy: v[1], r: 13, fill: YEL, opacity: 0.35 }, g);
    el("circle", { cx: v[0], cy: v[1], r: 13, fill: "none", stroke: INK, "stroke-width": 2.6 }, g);
    el("path", { d: rr(7, 9, w, h, 22), fill: OMBRE }, g);
    U.shape(C, "carte", rr(0, 0, w, h, 22), MAT.white, { sw: 3, r: 0.5 });
    ln(g, rr(10, 10, w - 20, h - 20, 15), 1.4, "#C9C9C2");
    [[36, 2, -22], [w - 36, 2, 20]].forEach(([x, y, a], i) => {
      const s = el("g", { transform: `translate(${x} ${y}) rotate(${f(a + (i ? -j : j))})` }, g);
      el("rect", { x: -38, y: -12, width: 76, height: 24, fill: "rgba(190,190,182,.86)" }, s);
      ln(s, "M-38 -12 l3 6 l-3 6 l3 6 l-3 6 M38 -12 l-3 6 l3 6 l-3 6 l3 6", 1.2, "rgba(140,140,132,.9)");
    });
    return { w, h, vers: v, centre: [w / 2, h / 2] };
  };
  D.loupeCitation.essais = [{}, { h: 230, j: 4 }];

  /* D.pouce — SON pouce (scènes 10–11) : main en moufle (même peau que Persona : blanc cerné d'encre, aucun doigt, aucun ongle) dont le
   * pouce pointe vers la gauche, manchette de sa blouse blanche à droite. 160 × 76. Ancrage = le BOUT du pouce (sur le bouton
   * d'envoi (822, 1342)). Il entre par le bord droit du téléphone : la scène le DÉCOUPE à x 906 (sinon la main passe dans la colonne
   * des boutons Instagram, x > 915). o.appui 0..1 : il appuie (−6 px) et trois petits traits de pression apparaissent. */
  D.pouce = (g, o = {}) => {
    const ap = clamp(o.appui || 0, 0, 1), b = el("g", { transform: `translate(${f(-6 * ap)} 0)` }, g), C = U.ctx(b, 4650, false, 1);
    const main = "M0 0 C-1 -9 7 -15 18 -15 L44 -17 C56 -34 98 -40 128 -31 L128 37 C100 45 62 42 48 23 L18 15 C7 15 0 9 0 0 Z";
    el("path", { d: main, fill: OMBRE, transform: "translate(5 7)" }, b);
    U.shape(C, "main", main, MAT.skin, { sw: 2.6, r: 0.6 });
    ln(b, "M44 -12 Q53 -1 46 13", 2.2, "#55524B");                                                                  // pli à la base du pouce
    ln(b, "M78 -30 Q86 -22 96 -32", 1.6, "#8A8A84");
    U.shape(C, "manche", "M126 -36 L162 -40 L162 44 L126 40 Q120 2 126 -36 Z", MAT.white, { sw: 2.6, r: 0.5 });
    ln(b, "M135 -35 Q129 2 135 39", 1.6, "#8A8A84");
    if (ap > 0.3) ln(g, "M-12 -15 l-9 -7 M-14 0 l-11 0 M-12 15 l-9 7", 2.6, "#8A8A84", { opacity: f(ap) });
    return { bout: [0, 0], w: 162, h: 84 };
  };
  D.pouce.essais = [{}, { appui: 1 }];

  /* D.ligneSysteme — la ligne grise du système (scène 14), SANS date ni heure : pastille grise allongée, mini-avatar (r 22) qui devient
   * un rond pointillé (o.parti 0..1), « … hat die Gruppe verlassen » (de light 26 px, gris) et « خرج من الگروپ » (ar gras 28 px),
   * micro « Rekonstruktion » (17 px) sous le coin droit. 600 × 84, ancrage = coin haut-gauche ; posée en (240, 300) dans c.hud.
   * o.p = paramètres Persona de LUI (CAST.LUI) · o.texte, o.ar, o.micro (null = sans). Tombe, reste, remonte. */
  D.ligneSysteme = (g, o = {}) => {
    const w = o.w || 600, h = o.h || 84, pa = clamp(o.parti || 0, 0, 1), C = U.ctx(g, 4720, false, 1);
    const de = o.texte == null ? "… hat die Gruppe verlassen" : o.texte, ar = o.ar == null ? "خرج من الگروپ" : o.ar, micro = o.micro === undefined ? "Rekonstruktion" : o.micro;
    el("path", { d: rr(4, 6, w, h, h / 2), fill: "#C9C9C2" }, g);
    U.shape(C, "ligne", rr(0, 0, w, h, h / 2), { base: "#ECECE6" }, { sw: 2.2, r: 0.4 });
    const av = el("g", { transform: `translate(46 ${h / 2})` }, g);
    if (pa < 1) D.avatar(el("g", { opacity: f(1 - pa) }, av), { r: 22, p: o.p || P_LUI });
    if (pa > 0) D.avatar(el("g", { opacity: f(pa) }, av), { r: 22, vide: true });
    const wa = mesure(ar, 28, "ar"), dispo = w - 82 - 24 - wa - 16, fs = Math.min(26, Math.floor((26 * dispo) / Math.max(1, mesure(de, 26, "light"))));
    tx(g, de, 82, h / 2 + 9, fs, "light", "start", { fill: "#55524B" });
    tx(g, ar, w - 24, h / 2 + 10, 28, "ar", "end");
    if (micro) tx(g, micro, w - 20, h + 22, 17, "light", "end", { fill: "#55524B", halo: true, haloW: 6 });
    return { w, h, avatar: [46, h / 2] };
  };
  D.ligneSysteme.essais = [{}, { parti: 1 }];

  /* ═══════════════════════════ D. PAPIER (scène 12) — monde = pixels, caméra { s: 1, cx: 540, cy: 960 } ═══════════════════════════ */

  /* D.soleilEte — petit soleil d'été : rond jaune cerné d'encre, reflet, dix petits rayons d'encre (o.a : leur rotation, en degrés ;
   * o.rayons false : sans). r 34, ancrage = centre ; scène 12 : (190, 492), m.rays derrière (R 62, 10 rayons, vitesse 14). */
  D.soleilEte = (g, o = {}) => {
    const r = o.r || 34, C = U.ctx(g, 4660, false, 1);
    if (o.rayons !== false) { const ra = el("g", { transform: `rotate(${f(o.a || 0)})` }, g); let d = "";
      for (let i = 0; i < 10; i++) { const a = (i * Math.PI) / 5; d += `M${f(Math.cos(a) * (r + 9))} ${f(Math.sin(a) * (r + 9))} L${f(Math.cos(a) * (r + 19))} ${f(Math.sin(a) * (r + 19))}`; }
      ln(ra, d, 3.6); }
    el("circle", { cx: 3, cy: 4, r, fill: OMBRE }, g);
    U.shape(C, "soleil", rond(0, 0, r), MAT.yellow, { sw: 3, r: 0.5 });
    ln(g, `M${f(-r * 0.6)} ${f(-r * 0.12)} A${f(r * 0.62)} ${f(r * 0.62)} 0 0 1 ${f(-r * 0.12)} ${f(-r * 0.6)}`, 3.6, "#FFF6C9");
    return { r };
  };
  D.soleilEte.essais = [{}, { a: 18 }];

  /* D.enveloppe — enveloppe blanche vue de face, côté adresse : timbre au trait (dentelé) + oblitération, trois lignes d'adresse
   * illisibles, bord haut creusé au milieu ; le rabat est DERRIÈRE : o.ouvert 0..1, il se relève au-dessus du bord (triangle) ; par
   * l'ouverture on voit l'intérieur hachuré. 460 × 240 (o.w, o.h — le § 2 disait 400 × 230 : la lettre de 440 px doit tenir dedans).
   * Ancrage = centre ; scène 12 : (620, 1230). Ordre : D.enveloppe({ partie: "dos" }) → la lettre → D.enveloppe({ partie: "devant" }).
   * Arrive de la droite (m.build right, 320 px). */
  D.enveloppe = (g, o = {}) => {
    const w = o.w || 460, h = o.h || 240, x0 = -w / 2, y0 = -h / 2, ouv = clamp(o.ouvert || 0, 0, 1), part = o.partie || "tout", C = U.ctx(g, 4670, false, 1);
    if (part !== "devant") {
      el("path", { d: rr(x0 + 7, y0 + 9, w, h, 6), fill: OMBRE }, g);
      if (ouv > 0.02) {   // le rabat relevé (il pivote sur le bord haut)
        const ay = y0 - 6 - h * 0.5 * ouv;
        U.shape(C, "rabat", `M${x0 + 2} ${y0 - 2} L-16 ${f(ay + 6)} Q0 ${f(ay - 3)} 16 ${f(ay + 6)} L${-x0 - 2} ${y0 - 2} Z`, VOILE, { sw: 2.4, r: 0.5 });
      }
      U.shape(C, "dos", rr(x0, y0 - 6, w, h + 6, 6), { base: "#DAD9D2", hatch: "#8A8A84", gap: 5, fw: 1.2 }, { sw: 2.4, r: 0.5 });
    }
    if (part !== "dos") {
      const dv = `M${x0} ${y0} L-48 ${y0} Q0 ${y0 + 28} 48 ${y0} L${-x0} ${y0} L${-x0} ${-y0} L${x0} ${-y0} Z`;
      U.shape(C, "devant", dv, MAT.white, { sw: 2.8, r: 0.5 });
      // timbre dentelé + petit paysage + oblitération
      const tg = el("g", { transform: `translate(${-x0 - 62} ${y0 + 56}) rotate(3)` }, g);
      el("rect", { x: -29, y: -35, width: 58, height: 70, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2, "stroke-dasharray": "4.5 2.5" }, tg);
      el("rect", { x: -21, y: -27, width: 42, height: 54, fill: "#ECECE6", stroke: INK, "stroke-width": 1.4 }, tg);
      el("circle", { cx: 8, cy: -12, r: 6, fill: YEL, stroke: INK, "stroke-width": 1.4 }, tg);
      el("path", { d: "M-21 20 L-8 2 L2 12 L10 4 L21 18 L21 27 L-21 27 Z", fill: "#B9B9B3", stroke: INK, "stroke-width": 1.4, "stroke-linejoin": "round" }, tg);
      el("circle", { cx: -58, cy: 6, r: 22, fill: "none", stroke: "#8A8A84", "stroke-width": 2 }, tg);
      ln(tg, "M-118 -12 q8 -6 16 0 t16 0 t16 0 M-122 6 q8 -6 16 0 t16 0 t16 0 t16 0 M-118 24 q8 -6 16 0 t16 0 t16 0", 2, "#8A8A84");
      // expéditeur (en haut à gauche) et adresse : lignes illisibles
      ln(g, `M${x0 + 26} ${y0 + 34} h86 M${x0 + 26} ${y0 + 48} h62`, 2.6, "#C9C9C2");
      [[22, 230], [52, 200], [82, 150]].forEach(([y, lw], i) => D.gribouillis(el("g", { transform: `translate(-60 ${y - 8})` }, g), { w: lw, seed: 50 + i * 13 }));
    }
    return { w, h, haut: [0, y0] };
  };
  D.enveloppe.essais = [{}, { ouvert: 1 }, { partie: "dos", ouvert: 0.6 }, { partie: "devant" }];

  /* D.lettre — feuille A4 : en-tête (emplacement rond pour l'avatar de LUI, trois traits gris), filet, emplacement du titre, cinq lignes
   * illisibles (D.gribouillis), bloc signature en bas (« ✗ » + un trait long, qui reste VIDE) ; deux plis horizontaux légers.
   * 440 × 570, ancrage = centre ; scène 12 : centre final (620, 865) (x 400 → 840, y 580 → 1150).
   * o.date / o.titre : null (défaut) = la scène les tape elle-même (c.write) aux ancres renvoyées · o.plie 0..1 (1 = encore pliée :
   * les plis se marquent) · o.signature 0..1 (défaut 1) : la croix puis le trait se tracent. Les avatars (LUI en haut, ELLE au
   * bloc signature) sont posés par la scène aux ancres { avatar, signature } (r 34). Monte hors de l'enveloppe (move −365 px). */
  D.lettre = (g, o = {}) => {
    const W = 440, H = 570, x0 = -220, y0 = -285, pl = clamp(o.plie || 0, 0, 1), sg = clamp(o.signature == null ? 1 : o.signature, 0, 1), C = U.ctx(g, 4680, false, 1);
    const fe = `M${x0} ${y0} L${-x0} ${y0} L${-x0} ${-y0} L${x0} ${-y0} Z`;
    el("path", { d: fe, fill: OMBRE, transform: "translate(7 9)" }, g);
    U.shape(C, "feuille", fe, MAT.white, { sw: 2.6, r: 0.5 });
    [-95, 95].forEach((y) => {   // plis (en trois)
      el("rect", { x: x0 + 2, y, width: W - 4, height: 26, fill: INK, opacity: f(0.025 + 0.09 * pl) }, g);
      ln(g, `M${x0 + 3} ${y} H${-x0 - 3}`, 1.3, "#C4C4BD", { opacity: f(0.5 + 0.5 * pl) });
    });
    el("circle", { cx: -174, cy: -233, r: 37, fill: "#EFEFEA", stroke: "#C4C4BD", "stroke-width": 2, "stroke-dasharray": "6 5" }, g);
    [[-126, -250, 150], [-126, -233, 118], [-126, -216, 86]].forEach(([x, y, w]) => ln(g, `M${x} ${y} h${w}`, 3, "#C9C9C2"));
    if (o.date) tx(g, o.date, 192, -225, 24, "de", "end");
    ln(g, `M${x0 + 30} -184 H${-x0 - 30}`, 1.6, "#C9C9C2");
    if (o.titre) tx(g, o.titre, 0, -130, 34, "de");
    [[-75, 380], [-35, 364], [5, 376], [45, 340], [85, 236]].forEach(([y, w], i) => D.gribouillis(el("g", { transform: `translate(-190 ${y - 8})` }, g), { w, seed: 300 + i * 17 }));
    if (sg > 0) {
      ln(g, "M-183 192 L-165 210 M-165 192 L-183 210", 3.4, INK, { opacity: f(Math.min(1, sg * 3)) });
      ln(g, `M-150 207 L${f(-150 + 270 * sg)} 207`, 2.4, INK);
    }
    return { avatar: [-174, -233], date: [192, -225], titre: [0, -130], signature: [170, 185], trait: [-150, 207, 120, 207], haut: [0, y0] };
  };
  D.lettre.essais = [{ plie: 1, signature: 0 }, { date: "25.07.2025", titre: "Unterlassungserklärung" }];

  /* D.stylo — stylo à bille : pointe à gauche (cône + bille), corps gris hachuré, capuchon JAUNE emboîté à l'arrière, agrafe.
   * 190 × 22, ancrage = centre ; scène 12 : (600, 1048), incliné de −6°. Tombe sur le trait (rebond), oscille, puis roule et tombe. */
  D.stylo = (g) => {
    const C = U.ctx(g, 4690, false, 1);
    el("path", { d: "M-94 0 L-62 -8 L94 -10 L94 10 L-62 8 Z", fill: "rgba(28,26,28,.16)", transform: "translate(4 7)" }, g);
    U.shape(C, "cone", "M-62 -8 L-85 -2.5 L-85 2.5 L-62 8 Z", MAT.white, { sw: 2, r: 0.4 });
    el("path", { d: "M-85 -2.5 L-95 0 L-85 2.5 Z", fill: INK, stroke: INK, "stroke-width": 1.2, "stroke-linejoin": "round" }, g);
    U.shape(C, "corps", rr(-63, -9, 108, 18, 6), MAT.grey, { sw: 2.4, r: 0.4 });
    ln(g, "M-56 -3 H32", 1.6, "#FFFFFF");
    U.shape(C, "cap", rr(30, -11, 64, 22, 8), MAT.yellow, { sw: 2.6, r: 0.4 });
    el("path", { d: rr(40, -18, 46, 6, 3), fill: SOMBRE, stroke: INK, "stroke-width": 1.4 }, g);
    ln(g, "M86 -15 Q90 -15 90 -10", 2.6, INK);
    return { pointe: [-95, 0], w: 190 };
  };

  /* ═══════════════════════════ C. L'APPLICATION « PLANS » (scène 13) — ancrage « écran » ═══════════════════════════ */

  /* D.champRecherche — champ de recherche arrondi (196 → 854, 360 → 426), petite loupe à gauche ; o.p (paramètres Persona) : mini-avatar
   * (r 22) à droite en (826, 393) — scène 13 : CAST.LUI ; scène 18 : sans (D.compteRecherche à sa place). o.texte : texte posé (la
   * scène le tape d'habitude elle-même à l'ancre « texte », de 28 px). o.y : autre hauteur (défaut 360). Ancrage « écran ». */
  D.champRecherche = (g, o = {}) => {
    const x = 196, y = o.y == null ? 360 : o.y, w = 658, h = 66, C = U.ctx(g, 4700, false, 1);
    el("path", { d: rr(x + 3, y + 4, w, h, 33), fill: "#E1E1DB" }, g);
    U.shape(C, "champ", rr(x, y, w, h, 33), MAT.white, { sw: 2.6, r: 0.45 });
    el("circle", { cx: x + 34, cy: y + 30, r: 11, fill: "none", stroke: INK, "stroke-width": 3 }, g);
    ln(g, `M${x + 42} ${y + 38} L${x + 51} ${y + 47}`, 4.2);
    if (o.texte) tx(g, o.texte, 250, y + 44, 28, "de", "start");
    if (o.p) D.avatar(el("g", { transform: `translate(826 ${y + 33})` }, g), { r: 22, p: o.p });
    return { texte: [250, y + 44], bout: [826, y + 33] };
  };
  D.champRecherche.essais = [{ texte: "Arbeitsgericht Siegburg", p: P_LUI }, { texte: "rechtskräftig" }];

  /* D.plansUI — habillage de la carte de « Plans », ancrage « écran », couvre (172, 440, 706, 730).
   * o.partie "fond" : quadrillage très pâle + deux routes pâles (SOUS la carte) · "dessus" : boutons « + » / « − » (820, 620 / 680),
   * boussole (232, 640 ; o.a : angle de l'aiguille, ±7°), échelle graduée (210 → 330, y 1130), sans chiffre · défaut : les deux. */
  D.plansUI = (g, o = {}) => {
    const part = o.partie || "tout";
    if (part !== "dessus") {
      el("rect", { x: 172, y: 440, width: 706, height: 730, fill: "#F5F5F0" }, g);
      let d = ""; for (let x = 196; x < 878; x += 48) d += `M${x} 440V1170`; for (let y = 464; y < 1170; y += 48) d += `M172 ${y}H878`;
      ln(g, d, 1.3, "#E5E5DE");
      ln(g, "M172 742 C300 712 410 812 560 790 S790 690 878 712 M372 440 C390 600 340 760 392 930 S470 1100 452 1170", 10, "#EAEAE3");
    }
    if (part !== "fond") {
      [[620, "+"], [680, "−"]].forEach(([y, s]) => {
        el("path", { d: rr(799, y - 21, 48, 48, 12), fill: OMBRE }, g);
        el("path", { d: rr(796, y - 24, 48, 48, 12), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, g);
        ln(g, s === "+" ? `M809 ${y} H831 M820 ${y - 11} V${y + 11}` : `M809 ${y} H831`, 3.6);
      });
      const bo = el("g", { transform: "translate(232 640)" }, g);
      el("circle", { cx: 3, cy: 4, r: 28, fill: OMBRE }, bo);
      el("circle", { cx: 0, cy: 0, r: 28, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, bo);
      ln(bo, "M0 -24 V-19 M24 0 H19 M0 24 V19 M-24 0 H-19", 2, "#8A8A84");
      const ai = el("g", { transform: `rotate(${f(o.a || 0)})` }, bo);
      el("path", { d: "M0 -21 L6 0 L-6 0 Z", fill: YEL, stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" }, ai);
      el("path", { d: "M0 21 L6 0 L-6 0 Z", fill: "#B9B9B3", stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" }, ai);
      el("circle", { cx: 0, cy: 0, r: 3, fill: INK }, bo);
      tx(bo, "N", 0, -32, 15, "de");
      [0, 1, 2, 3].forEach((i) => el("rect", { x: 210 + i * 30, y: 1125, width: 30, height: 9, fill: i % 2 ? "#FFFFFF" : INK, stroke: INK, "stroke-width": 1.6 }, g));
      ln(g, "M210 1118 V1138 M330 1118 V1138", 2);
    }
    return { plus: [820, 620], moins: [820, 680], boussole: [232, 640], echelle: [210, 1130] };
  };
  D.plansUI.essais = [{}, { partie: "dessus", a: 7 }];

  /* D.ficheLieu — la feuille du lieu qui monte du bas de l'écran : poignée grise, titre « Arbeitsgericht Siegburg » (28 px), deux lignes
   * séparées par un pointillé : « Klage · 10.09.2025 » + « دعوى », « gefordert: 2.000 € » + « طلب 2000 أورو » (allemand 24 px à
   * gauche, arabe gras 28 px calé à droite). 706 × 214, ancrage = coin haut-gauche ; scène 13 : (172, 1170) (le bas est découpé par
   * l'écran). o.lignes 0..2 (défaut 2) : combien de lignes sont visibles (la 2e apparaît en fondu). Entrée : rise 240 px. */
  D.ficheLieu = (g, o = {}) => {
    const w = 706, h = 214, n = o.lignes == null ? 2 : o.lignes, C = U.ctx(g, 4710, false, 1);
    const d = `M0 ${h} L0 28 Q0 0 28 0 L${w - 28} 0 Q${w} 0 ${w} 28 L${w} ${h} Z`;
    el("path", { d, fill: "rgba(28,26,28,.13)", transform: "translate(0 -7)" }, g);
    U.shape(C, "fiche", d, MAT.white, { sw: 2.8, r: 0.45 });
    el("rect", { x: w / 2 - 36, y: 11, width: 72, height: 8, rx: 4, fill: GRIS }, g);
    tx(g, o.titre || "Arbeitsgericht Siegburg", 32, 50, 28, "de", "start");
    ln(g, `M32 66 H${w - 32}`, 1.6, "#C9C9C2");
    (o.textes || [["Klage · 10.09.2025", "دعوى", 102], ["gefordert: 2.000 €", "طلب 2000 أورو", 160]]).forEach(([de, ar, y], i) => {
      const op = clamp(n - i, 0, 1); if (op <= 0) return;
      const lg = el("g", { opacity: op < 1 ? f(op) : null }, g);
      tx(lg, de, 32, y, 24, "de", "start"); tx(lg, ar, w - 32, y + 2, 28, "ar", "end");
      if (i === 0) ln(lg, `M32 ${y + 24} H${w - 32}`, 1.6, "#B4B4AE", { "stroke-dasharray": "2 7" });
    });
    return { w, h };
  };
  D.ficheLieu.essais = [{}, { lignes: 1 }];

  /* ═══════════════════════════ E. LE DÉPART (scène 14) ═══════════════════════════ */

  /* D.carton — carton ouvert : deux rabats écartés, une tasse, deux feuilles de plante (grises) et le tube d'un stéthoscope qui
   * dépassent (le tube pend par-dessus le bord). 110 × 74 (le contenu dépasse au-dessus). Ancrage = centre de la face avant.
   * o.dy (px) : le contenu tressaute à chaque pas (±2). Il suit les mains de LUI (de profil vers la gauche, centré en (−120, −240)). */
  D.carton = (g, o = {}) => {
    const dy = o.dy || 0, C = U.ctx(g, 4730, false, 1);
    el("path", { d: rr(-55 + 5, -37 + 6, 110, 74, 3), fill: OMBRE }, g);
    U.shape(C, "rabatG", "M-55 -37 L-80 -60 L-42 -64 L-30 -37 Z", CARTON, { sw: 2.2, r: 0.5 });
    U.shape(C, "rabatD", "M55 -37 L82 -58 L46 -65 L30 -37 Z", CARTON, { sw: 2.2, r: 0.5 });
    el("path", { d: "M-55 -37 L55 -37 L47 -46 L-47 -46 Z", fill: "#8A8A84", stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, g);
    const c = el("g", { transform: `translate(0 ${f(dy)})` }, g), K = U.ctx(c, 4731, false, 1);
    U.shape(K, "f1", "M10 -40 Q4 -68 20 -82 Q32 -62 20 -40 Z", MAT.mid, { sw: 2, r: 0.5 });
    ln(c, "M15 -42 Q17 -62 20 -78", 1.2, "#55524B");
    U.shape(K, "f2", "M24 -40 Q38 -62 58 -64 Q50 -46 30 -38 Z", MAT.grey, { sw: 2, r: 0.5 });
    ln(c, "M-12 -56 q11 0 10 9 q-1 7 -11 6", 3);
    U.shape(K, "tasse", "M-42 -62 L-12 -62 L-14 -38 L-40 -38 Z", MAT.white, { sw: 2.2, r: 0.4 });
    ln(c, "M-38 -53 H-16", 1.4, GRIS);
    ln(c, "M-4 -40 C-2 -62 14 -60 12 -46", 3.6, SOMBRE);                                                           // le tube, dedans…
    U.shape(C, "face", rr(-55, -37, 110, 74, 3), CARTON, { sw: 2.6, r: 0.5 });
    el("path", { d: rr(-16, -25, 32, 10, 5), fill: "#77776F", stroke: INK, "stroke-width": 1.6 }, g);                // poignée découpée
    ln(g, "M-55 6 H55", 1.4, "#A8A190");
    const tube = `M34 ${f(-40 + dy)} C40 ${f(-30 + dy * 0.5)} 42 -12 46 4`;                                          // … et par-dessus le bord
    ln(g, tube, 3.8, SOMBRE);
    el("circle", { cx: 47, cy: 10, r: 6.5, fill: "#CFCFCA", stroke: INK, "stroke-width": 2 }, g);
    return { w: 110, h: 74 };
  };
  D.carton.essais = [{}, { dy: -2 }];

  /* ═══════════════════════════ C. L'APPEL VIDÉO (scènes 15–16) ═══════════════════════════
   * Tuile A (le tribunal) : (196, 496, 658 × 384) ; tuile B (elle) : (196, 896, 658 × 384). Contenu découpé par la tuile (c.clipped :
   * rectangle) ; D.tuile, posée PAR-DESSUS, masque les coins carrés et pose le cadre. Bande des pastilles remontée (y 346 → 486). */

  /* D.tuile — cadre arrondi (rayon 26) d'une tuile vidéo : coins masqués (couleur o.fond, défaut celle de l'écran), ombre qui dépasse,
   * trait d'encre. o.actif 0..1 : liseré jaune de 9 px par-dessus. o.lisere "seul" : SEULEMENT le liseré jaune (les deux nœuds qui se
   * croisent en fondu quand la parole passe d'une tuile à l'autre). o.w × o.h (658 × 384), ancrage = coin haut-gauche.
   * Renvoie { d } : le rectangle arrondi (pour une découpe arrondie, si la scène en veut une). Entrée : grow (pivot : son centre). */
  D.tuile = (g, o = {}) => {
    const w = o.w || 658, h = o.h || 384, r = o.r || 26, ac = o.lisere === "seul" ? 1 : clamp(o.actif || 0, 0, 1), d = rr(0, 0, w, h, r);
    if (o.lisere !== "seul") {
      el("path", { d: `M-3 -3 H${w + 3} V${h + 3} H-3 Z ` + rrectInv(0, 0, w, h, r), fill: o.fond || ECRAN }, g);
      const id = nid("tu"), cp = el("clipPath", { id }, g); el("path", { d: `M-20 -20 H${w + 30} V${h + 30} H-20 Z ` + rrectInv(0, 0, w, h, r) }, cp);
      el("path", { d: rr(4, 6, w, h, r), fill: "#CFCFC8", "clip-path": `url(#${id})` }, g);
      el("path", { d, fill: "none", stroke: INK, "stroke-width": 3 }, g);
    }
    if (ac > 0) {
      el("path", { d: rr(5.5, 5.5, w - 11, h - 11, r - 5), fill: "none", stroke: YEL, "stroke-width": 9, opacity: ac < 1 ? f(ac) : null }, g);
      el("path", { d: rr(10.5, 10.5, w - 21, h - 21, r - 9), fill: "none", stroke: INK, "stroke-width": 1.4, opacity: ac < 1 ? f(ac) : null }, g);
    }
    return { w, h, d };
  };
  D.tuile.essais = [{}, { actif: 1 }, { lisere: "seul" }];

  /* D.salleAudience — le tribunal dans la tuile A, en DEUX appels (la table passe DEVANT les trois bustes). 658 × 384, ancrage = coin
   * haut-gauche de la tuile (196, 496).
   *   o.partie "fond"  : mur clair, corniche, deux appliques, lambris de bois clair à planches VERTICALES jusqu'à mi-hauteur, cimaise,
   *                      dossiers des trois fauteuils (celui de la présidente plus haut) — o.chaises false : sans.
   *   o.partie "table" : pile de dossiers à gauche (o.dossier 0..1 : la chemise du dessus glisse de 4 px), carafe et verre à droite
   *                      (o.eau : le niveau tremble, ±2 px), micro sur pied devant la présidente, plateau (y 264 = monde 760), façade
   *                      jusqu'en bas, plaque « Arbeitsgericht Siegburg · 1. Kammer » (18 px, centre (329, 326) = monde (525, 822)).
   *   défaut : les deux (essai). Bustes : JUG pieds (329, 404) × 0,72 ; AS1 (134, 396) × 0,64 ; AS2 (524, 396) × 0,64 (repère tuile).
   * Aucun marteau, aucune balance, aucun drapeau. */
  D.salleAudience = (g, o = {}) => {
    const w = 658, h = 384, part = o.partie || "tout";
    if (part !== "table") {
      const C = U.ctx(g, 4740, false, 1);
      el("rect", { x: 0, y: 0, width: w, height: h, fill: "#EFEEE8" }, g);
      ln(g, `M0 20 H${w}`, 1.8, "#C4C4BD"); ln(g, `M0 28 H${w}`, 1.2, "#DADAD3");
      [64, 594].forEach((x) => {
        el("ellipse", { cx: x, cy: 96, rx: 42, ry: 30, fill: YEL, opacity: 0.16 }, g);
        ln(g, `M${x} 70 V82`, 3, SOMBRE);
        el("path", { d: `M${x - 17} 102 Q${x - 15} 80 ${x} 80 Q${x + 15} 80 ${x + 17} 102 Z`, fill: "#FFF6C9", stroke: INK, "stroke-width": 2.2, "stroke-linejoin": "round" }, g);
      });
      U.shape(C, "lambris", `M0 196 H${w} V${h} H0 Z`, MAT.wood, { sw: 2, r: 0.4 });
      let pl = ""; for (let x = 28; x < w; x += 34) pl += `M${x} 206 V${h}`; ln(g, pl, 1.5, "#B9B8AE");
      U.shape(C, "cimaise", rr(-4, 188, w + 8, 14, 3), MAT.white, { sw: 2.2, r: 0.4 });
      if (o.chaises !== false) [[134, 104, 168], [524, 104, 168], [329, 152, 122]].forEach(([cx, bw, top], i) => {
        el("path", { d: rr(cx - bw / 2 + 6, top + 6, bw, 270 - top, 20), fill: "rgba(28,26,28,.12)" }, g);
        U.shape(C, "ch" + i, rr(cx - bw / 2, top, bw, 270 - top, 20), CUIR, { sw: 2.4, r: 0.5 });
        ln(g, rr(cx - bw / 2 + 10, top + 10, bw - 20, 250 - top, 13), 1.4, "#6E6B62");
      });
    }
    if (part !== "fond") {
      const C = U.ctx(g, 4741, false, 1), eau = o.eau || 0, dos = clamp(o.dossier || 0, 0, 1);
      // pile de dossiers (posée sur le plateau)
      [[10, 246, 80, MAT.grey], [14, 238, 76, MAT.white]].forEach(([x, y, cw, m], i) => U.shape(C, "dos" + i, rr(x, y, cw, 10, 2), m, { sw: 2, r: 0.4 }));
      const dg = el("g", { transform: `translate(${f(4 * dos)} 0) rotate(${f(-2 - dos)} 50 232)` }, g), Cd = U.ctx(dg, 4742, false, 1);
      U.shape(Cd, "dessus", rr(8, 226, 82, 11, 2), CARTON, { sw: 2, r: 0.4 });
      ln(dg, "M16 231 h40", 1.4, "#8A8A84");
      // carafe + verre
      el("path", { d: "M584 258 L584 222 Q584 207 592 201 L592 188 L606 188 L606 201 Q614 207 614 222 L614 258 Z", fill: "#FAFAF6", stroke: INK, "stroke-width": 2.4, "stroke-linejoin": "round" }, g);
      el("path", { d: `M586 ${f(230 + eau)} Q593 ${f(227 + eau)} 599 ${f(230 + eau)} T612 ${f(230 + eau)} L612 256 L586 256 Z`, fill: "#DCDDDA" }, g);
      ln(g, `M586 ${f(230 + eau)} Q593 ${f(227 + eau)} 599 ${f(230 + eau)} T612 ${f(230 + eau)}`, 1.4, "#8A8A84");
      ln(g, "M614 212 q11 2 9 16 q-2 9 -9 10", 2.6);
      el("path", { d: "M626 258 L624 232 L644 232 L642 258 Z", fill: "#FAFAF6", stroke: INK, "stroke-width": 2.2, "stroke-linejoin": "round" }, g);
      el("path", { d: `M625 ${f(244 + eau * 0.5)} L643 ${f(244 + eau * 0.5)} L642 256 L626 256 Z`, fill: "#DCDDDA" }, g);
      // micro sur pied (col de cygne) devant la présidente
      el("ellipse", { cx: 382, cy: 257, rx: 15, ry: 4, fill: SOMBRE, stroke: INK, "stroke-width": 1.6 }, g);
      ln(g, "M382 255 C380 238 368 228 354 224", 3.2, SOMBRE);
      el("path", { d: rr(338, 216, 18, 11, 5), fill: SOMBRE, stroke: INK, "stroke-width": 1.6, transform: "rotate(-18 347 221)" }, g);
      // façade + plateau
      U.shape(C, "facade", `M0 270 H${w} V${h + 4} H0 Z`, MAT.wood, { sw: 2.4, r: 0.4 });
      ln(g, `M0 296 H${w} M${f(w / 3)} 296 V${h} M${f((2 * w) / 3)} 296 V${h}`, 1.4, "#B9B8AE");
      el("path", { d: rr(-8, 256, w + 16, 16, 4), fill: "rgba(28,26,28,.12)", transform: "translate(0 6)" }, g);
      U.shape(C, "plateau", rr(-8, 256, w + 16, 16, 4), MAT.white, { sw: 2.6, r: 0.4 });
      const s = "Arbeitsgericht Siegburg · 1. Kammer", pw = Math.round(mesure(s, 18, "de")) + 34;
      el("path", { d: rr(329 - pw / 2 + 3, 309 + 4, pw, 34, 6), fill: "rgba(28,26,28,.18)" }, g);
      U.shape(C, "plaque", rr(329 - pw / 2, 309, pw, 34, 6), MAT.white, { sw: 2.2, r: 0.4 });
      tx(g, s, 329, 332, 18, "de");
    }
    return { w, h, plateau: 264, juge: [329, 404], as1: [134, 396], as2: [524, 396], micro: [347, 221] };
  };
  D.salleAudience.essais = [{}, { partie: "table", dossier: 1, eau: 2 }];

  /* D.fondNeutre — fond de la tuile B (elle) : mur hachuré très clair, un petit cadre au mur (en haut à gauche), une étagère basse à
   * droite avec deux boîtes, le dossier d'une chaise derrière elle (centre x 204 du repère tuile = monde 400). 658 × 384, ancrage = coin
   * haut-gauche de la tuile (196, 896). Sa bulle occupe (319 → 609, 14 → 214) : rien d'important dessous. */
  D.fondNeutre = (g) => {
    const w = 658, h = 384, C = U.ctx(g, 4750, false, 1);
    el("rect", { x: 0, y: 0, width: w, height: h, fill: "#F1F0EA" }, g);
    U.shape(C, "mur", `M0 0 H${w} V${h} H0 Z`, { hatch: "#E0DFD7", gap: 12, fw: 1 }, { noStroke: true });
    el("path", { d: rr(31, 35, 104, 78, 4), fill: OMBRE }, g);
    U.shape(C, "cadre", rr(26, 30, 104, 78, 4), MAT.white, { sw: 2.2, r: 0.4 });
    ln(g, rr(36, 40, 84, 58, 2), 1.4, "#8A8A84"); ln(g, "M40 90 L60 68 L74 80 L90 60 L116 92", 2, "#8A8A84");
    U.shape(C, "b1", rr(470, 262, 40, 38, 3), MAT.grey, { sw: 2, r: 0.4 }); U.shape(C, "b2", rr(518, 276, 58, 24, 3), MAT.white, { sw: 2, r: 0.4 });
    el("path", { d: rr(444, 304, 200, 10, 3), fill: "rgba(28,26,28,.12)" }, g);
    U.shape(C, "etagere", rr(440, 300, 200, 10, 3), MAT.wood, { sw: 2, r: 0.4 });
    el("path", { d: rr(204 - 104 + 7, 248 + 7, 208, 190, 40), fill: "rgba(28,26,28,.12)" }, g);
    U.shape(C, "chaise", rr(204 - 104, 248, 208, 190, 40), MAT.mid, { sw: 2.6, r: 0.5 });
    ln(g, rr(204 - 88, 262, 176, 170, 30), 1.4, "#55524B");
    return { w, h, chaise: [204, 248] };
  };

  /* D.commandes — les trois boutons ronds de l'appel (r 30) : micro, caméra, raccrocher (foncé #3A3A37, combiné blanc). Ancrage
   * « écran » : centres (400, 525, 650 ; 1336) (o.y). o.micro 0..1 : le micro « pulse » (anneau jaune) quand quelqu'un parle. */
  D.commandes = (g, o = {}) => {
    const y = o.y || 1336, mi = clamp(o.micro || 0, 0, 1);
    const combine = "M-11 -10 Q-14 -3 -9 4 Q-3 11 5 13 Q10 13 11 9 L8.5 5.5 Q6.5 3.8 4.2 5.6 Q-1.5 3.5 -4.5 -2.2 Q-2.6 -4.4 -4 -6.6 L-7 -10.6 Q-9.5 -12 -11 -10 Z";
    [[400, "micro"], [525, "camera"], [650, "fin"]].forEach(([x, k]) => {
      const b = el("g", { transform: `translate(${x} ${y})` }, g);
      if (k === "micro" && mi > 0) el("circle", { cx: 0, cy: 0, r: f(36 + 5 * mi), fill: "none", stroke: YEL, "stroke-width": 6, opacity: f(mi) }, b);
      el("circle", { cx: 4, cy: 5, r: 30, fill: OMBRE }, b);
      el("circle", { cx: 0, cy: 0, r: 30, fill: k === "fin" ? SOMBRE : "#FFFFFF", stroke: INK, "stroke-width": 2.6 }, b);
      if (k === "micro") { el("path", { d: rr(-7, -17, 14, 23, 7), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.6 }, b); ln(b, "M-12 -1 Q-12 12 0 12 Q12 12 12 -1 M0 12 V18 M-7 18 H7", 2.6); }
      else if (k === "camera") { el("path", { d: rr(-17, -10, 23, 20, 4), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.6 }, b); el("path", { d: "M8 -4 L17 -9 L17 9 L8 4 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4, "stroke-linejoin": "round" }, b); }
      else el("path", { d: combine, fill: "#FFFFFF", stroke: "#FFFFFF", "stroke-width": 1.2, "stroke-linejoin": "round", transform: "rotate(135) scale(1.15)" }, b);
    });
    return { micro: [400, y], camera: [525, y], fin: [650, y] };
  };
  D.commandes.essais = [{}, { micro: 1 }];

  /* D.plaqueNom — étiquette blanche arrondie en bas à gauche d'une tuile : o.de (24 px) à gauche, o.ar (26 px gras) à droite ; elle
   * s'élargit si le texte le demande (o.w minimum : 300 ou 380). o.micro : micro-texte de source (17 px) collé sous le coin droit, contour
   * papier. 300 × 46, ancrage = coin haut-gauche ; scène 15 : (212, 1222). Elle bascule (retournement vertical, 0,25 s) quand le texte change. */
  D.plaqueNom = (g, o = {}) => {
    const de = o.de == null ? "Stationsärztin" : o.de, ar = o.ar == null ? "طبيبة القسم" : o.ar, h = 46, C = U.ctx(g, 4770, false, 1);
    const w = Math.max(o.w || 300, Math.round(mesure(de, 24, "de") + mesure(ar, 26, "ar") + 52));
    el("path", { d: rr(4, 5, w, h, 14), fill: OMBRE }, g);
    U.shape(C, "plaque", rr(0, 0, w, h, 14), MAT.white, { sw: 2.4, r: 0.45 });
    tx(g, de, 16, 31, 24, "de", "start"); tx(g, ar, w - 14, 33, 26, "ar", "end");
    if (o.micro) tx(g, o.micro, w - 6, h + 19, 17, "light", "end", { fill: "#55524B", halo: true, haloW: 6 });
    return { w, h };
  };
  D.plaqueNom.essais = [{}, { de: "uneinsichtig", ar: "ما اعترفات بوالو", w: 380, micro: "laut Gericht" }];

  /* D.camembert — 70 / 30 (scènes 15–16). Disque blanc cerné d'encre ; part de 30 % de −90° à +18° ; part de 70 % (de 18° à 270°)
   * dont la hachure grise se remplit en balayant (o.rempli 0..1, défaut 1). Rayon o.r (70 dans sa bulle, 96 à cheval sur les tuiles),
   * ancrage = centre.  o.jaune 0..1 : la part de 30 % devient jaune · o.ecart 0..1 : elle glisse de 24 px vers l'extérieur ·
   * o.barre 0..1 : un trait d'encre raye « privat ». Textes (o.textes false : aucun) : « 70 % » (o.v70 0..1), « privat » (o.privat
   * 0..1 : il s'écrit lettre à lettre), « 30 % » (o.v30 0..1 ; o.gros 0..1 : de 22 à 40 px), « mindestens » (o.mindestens 0..1).
   * Renvoie { ico } : où poser la petite D.icoDienst (44 px = échelle 0,54) de la scène 16 — à cheval sur le bord haut de la part jaune
   * (à r 96, la part ne loge pas à la fois l'icône, « mindestens » et « 30 % » en 40 px). L'ancre suit o.ecart. */
  D.camembert = (g, o = {}) => {
    const r = o.r || 70, k = r / 70, rem = clamp(o.rempli == null ? 1 : o.rempli, 0, 1), ja = clamp(o.jaune || 0, 0, 1), ec = clamp(o.ecart || 0, 0, 1), ba = clamp(o.barre || 0, 0, 1);
    const rad = (a) => (a * Math.PI) / 180, P = (a, R) => [f(Math.cos(rad(a)) * R), f(Math.sin(rad(a)) * R)];
    const sect = (a0, a1, R) => { const [x0, y0] = P(a0, R), [x1, y1] = P(a1, R); return `M0 0 L${x0} ${y0} A${f(R)} ${f(R)} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1} Z`; };
    const C = U.ctx(g, 4780, false, 1), halo = { halo: "#FFFFFF", haloW: 5 };
    el("circle", { cx: 5, cy: 6, r, fill: OMBRE }, g);
    el("path", { d: sect(18, 270, r), fill: "#FFFFFF" }, g);
    if (rem > 0.005) {
      const id = nid("cm"), cp = el("clipPath", { id }, g); el("path", { d: sect(18, 18 + 252 * rem, r) }, cp);
      let d = ""; for (let i = -2 * r; i < 2 * r; i += 7.5) d += `M${f(i - r)} ${f(r)} L${f(i + r)} ${f(-r)}`;
      ln(el("g", { "clip-path": `url(#${id})` }, g), d, 1.5, "#A1A19B");
    }
    U.shape(C, "p70", sect(18, 270, r), {}, { sw: 3, r: 0.4 });
    const bis = rad(-36), dx = Math.cos(bis) * 24 * ec, dy = Math.sin(bis) * 24 * ec;
    const p3 = el("g", { transform: `translate(${f(dx)} ${f(dy)})` }, g), C3 = U.ctx(p3, 4781, false, 1);
    if (ec > 0.01) el("path", { d: sect(-90, 18, r), fill: OMBRE, transform: "translate(5 6)" }, p3);
    el("path", { d: sect(-90, 18, r), fill: "#FFFFFF" }, p3);
    if (ja > 0) el("path", { d: sect(-90, 18, r), fill: YEL, opacity: ja < 1 ? f(ja) : null }, p3);
    U.shape(C3, "p30", sect(-90, 18, r), {}, { sw: 3, r: 0.4 });
    if (o.textes !== false) {
      const v70 = o.v70 == null ? 1 : o.v70, pv = o.privat == null ? 1 : o.privat, v30 = o.v30 == null ? 1 : o.v30, mi = o.mindestens || 0;
      const s70 = Math.round(30 * Math.min(k, 1.3)), sP = Math.round(20 * Math.min(k, 1.25)), xL = f(-0.45 * r), y70 = f(0.36 * r);
      if (v70 > 0) tx(g, "70 %", xL, y70, s70, "de", "middle", Object.assign({ op: v70 < 1 ? f(v70) : null }, halo));
      const wP = mesure("privat", sP, "light"), sp = "privat".slice(0, Math.round(6 * pv)), yP = f(y70 + sP + 5);
      if (sp) tx(g, sp, f(xL - wP / 2), yP, sP, "light", "start", halo);
      if (ba > 0) { const yb = yP - sP * 0.32, xa = xL - wP / 2 - 7; ln(g, `M${f(xa)} ${f(yb + 3)} L${f(xa + (wP + 14) * ba)} ${f(yb + 3 - 6 * ba)}`, 3.6, INK); }
      // « 30 % » dans le bas de la part (vers 18°), « mindestens » juste au-dessus ; le haut de la part reste libre pour l'icône
      const s30 = Math.round(lerp(22, 40, clamp(o.gros || 0, 0, 1))), [qx, qy] = P(-10, 0.56 * r), b30 = f(qy + s30 * 0.36), sm = r >= 90 ? 17 : 15;
      if (v30 > 0) tx(p3, "30 %", qx, b30, s30, "de", "middle", Object.assign({ op: v30 < 1 ? f(v30) : null }, halo));
      if (mi > 0) tx(p3, "mindestens", f(qx - 4), f(b30 - s30 * 0.78 - 4), sm, "light", "middle", Object.assign({ op: mi < 1 ? f(mi) : null }, halo));
    }
    const [ix, iy] = P(-62, 0.98 * r);   // ancre de l'icône « Dienst » (44 px) : à cheval sur le bord de la part, elle ne couvre aucun texte
    return { r, part30: [f(0.47 * r + dx), f(-0.3 * r + dy)], ico: [f(ix + dx), f(iy + dy)], centre: [0, 0] };
  };
  D.camembert.essais = [{ rempli: 0, v30: 0, v70: 0, privat: 0 }, { rempli: 0.5, privat: 0.5, v30: 0 }, {}, { r: 96, jaune: 1, ecart: 1, gros: 1, mindestens: 1, barre: 1 }];
})();
