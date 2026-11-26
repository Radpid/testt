/* decor.js — AKTE 09 « غير سكران » : décors et objets PROPRES à l'épisode, 1re partie (window.EpDecor = D).
 * Aucun dessin repris d'un autre épisode. Suite dans decor-2.js et decor-3.js. Référence : storyboard.md § 2 et § 3.
 * Essai de chaque dessin : node tools/essai_decor.mjs videos/akte-friedrichshafen-nacht [--only nom1,nom2]
 *
 * ── INVENTAIRE COMPLET (storyboard § 2) ET ÉTAT ───────────────────────────────────────────────────────────────
 * A. Dispositif signature et HUD propre (§ 3)
 *   A1  D.ligne              fait (decor.js)      A7  D.lavis             fait (decor.js)
 *   A2  D.horlogeLigne       fait (decor.js)      A8  D.autocollant       fait (decor.js)
 *   A3  D.etiquetteTemps     fait (decor.js)      A9  D.medaillon         fait (decor.js)  (+ D._.clipRond pour le contenu)
 *   A4  D.refrain            fait (decor.js)      A10 D.gisant            fait (decor.js)
 *   A5  D.crane              fait (decor.js)      A11 D.teteProfil        fait (decor.js)
 *       D.craneNoms          fait (decor.js)  — les trois étiquettes de A5 (o.noms), à poser AU-DESSUS de D.dedans
 *   A6  D.dedans             fait (decor.js)
 *       D.mention            fait (decor.js)  — hors inventaire : l'étiquette de vérité du coin haut gauche (§ Conventions)
 * B. Accroche et intro
 *   B1  D.entree             fait (decor.js)      B5  D.feuilleRat        fait (decor.js)
 *   B2  D.lettre             fait (decor.js)      B6  D.couloirNuit       fait (decor.js)
 *   B3  D.pretoireCoin       fait (decor.js)      B7  D.polaroid          fait (decor.js)
 *   B4  D.grillePointillee   fait (decor.js)
 * C. Cartes, presse, horloge
 *   C1  D.carteLac           fait (decor.js)      C4  D.helico            à faire
 *   C2  D.miniCarte          fait (decor.js)      C5  D.horlogeGrande     à faire (D.horlogeLigne accepte déjà o.r)
 *   C3  D.coupures           fait (decor.js)      C6  D.voilier           fait (decor.js)
 * D. La route, le pré, l'entrée des urgences
 *   D1  D.nuit               fait (decor.js)      D7  D.velo              fait (decor.js)
 *   D2  D.lampadaire         fait (decor.js)      D8  D.casque, D.capuche, D.sacDos   faits (decor.js)
 *   D3  D.route              fait (decor.js)      D9  D.pre               fait (decor.js)
 *   D4  D.arbreNuit          fait (decor.js)      D10 D.urgencesFacade    fait (decor.js)
 *   D5  D.brume              fait (decor.js)      D11 D.rtw               fait (decor.js)
 *   D6  D.papillons          fait (decor.js)      D12 D.silhouette        fait (decor.js)
 * E. Le box des urgences
 *   E1  D.boxMur             à faire              E7  D.porteFond         à faire
 *   E2  D.rail, D.rideau     à faire              E8  D.alarmeMurale      à faire
 *   E3  D.lampeExamen        à faire              E9  D.ballon            à faire
 *   E4  D.scope              à faire              E10 D.styloChignon, D.masqueCou   faits (decor.js)
 *   E5  D.brancard           fait (decor.js)          D.lampeStylo, D.montreBroche  à faire
 *   E6  D.planchette         à faire              E11 D.feuilleGros       à faire
 *                                                 E12 ombres du couloir : pas de dessin (D.silhouette, fait)
 * F. La scène muette
 *   F1  D.chambreNeutre      à faire              F3  D.chaiseSweat       à faire
 *   F2  D.litNeutre          à faire              F4  D.veilleuse         à faire
 * G. Le tribunal
 *   G1  D.aube               à faire              G10 D.bancParties       à faire
 *   G2  D.amtsgericht        à faire              G11 D.negatoscope       à faire
 *   G3  D.tilleul            à faire              G12 D.marteauReflexes, D.lunettesLecture, D.plume, D.foulard   à faire
 *   G4  D.rue                à faire              G13 D.pupitreJuge       à faire
 *   G5  D.hall               à faire              G14 D.plaqueCT          à faire
 *   G6  D.porteSalle         à faire              G15 D.billet            à faire
 *   G7  D.encreMontant       à faire              G16 D.urteilBlatt       à faire
 *   G8  D.salle              à faire              G17 D.encrier           à faire
 *   G9  D.dos                à faire
 * H. La règle
 *   H1  D.carteDeclencheur   à faire              H4  D.etiquetteBagage   à faire
 *   H2  D.porteCT            à faire              H5  D.pips              à faire
 *   H3  D.feuilleSurveillance à faire
 *   (D.exemple : dessin du gabarit, encore utilisé par les scènes d'exemple de scenes-1.js — à supprimer avec elles.)
 *
 * ── CONVENTIONS ──────────────────────────────────────────────────────────────────────────────────────────────
 * Chaque fonction dessine dans le groupe SVG g, autour de son point d'ancrage (0,0), reçoit ses paramètres animés dans o
 * (valeurs ARRONDIES par l'appelant : le moteur ne redessine que si o change) et renvoie des ancres (node.out).
 * Toutes ont des valeurs par défaut : D.nom(g, {}) dessine l'objet entier.
 *   o.part — les grands décors ont des parties mobiles. Sans o.part (ou "tout") on dessine tout ; avec o.part on ne
 *            dessine QUE cette partie, dans le même repère : on pose le fond une fois (m.obj, statique) et chaque partie
 *            mobile dans son propre nœud (m.pend, m.sway, c.sk…). Les parties de chaque décor sont listées au-dessus de lui.
 *   o.flip — pour les objets orientés (vélo, ambulance, casque, capuche…) : true = tourné vers la GAUCHE ; les ancres
 *            renvoyées sont déjà retournées.
 *   Contenu d'un médaillon : const cg = D._.clipRond(parent, out.clip) puis dessiner dans cg.
 * Trait à main levée : U.ctx / U.shape / U.stroke ; tracés nets (el("path")) pour ce qui se redessine en continu
 * (la ligne, l'encre, l'intérieur du crâne, les herbes, les papillons). Ombre décalée #D2D2CB. Jaune = lumière ou alerte.
 * Aides partagées avec decor-2.js / decor-3.js : D._ (un objet, pas une fonction : l'outil d'essai ne le dessine pas).
 */
(function () {
  "use strict";
  const SC = SketchCast, U = SC.util, MAT = SC.MAT, NS = "http://www.w3.org/2000/svg";
  const PM = (window.Persona && Persona.MAT) || {};
  const INK = "#1C1A1C", YEL = "#F8CE4E", OMB = "#D2D2CB", PAPIER = "#F7F7F1", GRIS = "#8A8A84";
  const KAL = "Kalam, 'Comic Sans MS', cursive", PLEX = "'Plex Arabic', sans-serif", LAL = "Lalezar, Kalam, sans-serif";
  const el = (tag, a, p) => { const n = document.createElementNS(NS, tag); for (const k in a || {}) if (a[k] != null) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; };
  const D = window.EpDecor = window.EpDecor || {};
  const f = (v) => Math.round(v * 10) / 10, pt = (p) => f(p[0]) + " " + f(p[1]);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, t) => a + (b - a) * t;
  const TAU = Math.PI * 2, rad = (a) => a * Math.PI / 180;
  const hsh = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };   // bruit déterministe 0..1
  const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  let UID = 0; const uid = (p) => "ep09" + p + (++UID);
  // traits et aplats nets
  const ln = (g, d, w, c, o) => el("path", Object.assign({ d, fill: "none", stroke: c || INK, "stroke-width": w || 2, "stroke-linecap": "round", "stroke-linejoin": "round" }, o), g);
  const fl = (g, d, c, o) => el("path", Object.assign({ d, fill: c, stroke: "none" }, o), g);
  const ombre = (g, d, dx, dy) => el("path", { d, fill: OMB, transform: `translate(${dx == null ? 6 : dx} ${dy == null ? 8 : dy})` }, g);
  const rr = U.rrect, cercle = (cx, cy, r) => `M${f(cx - r)} ${f(cy)} A${r} ${r} 0 1 1 ${f(cx + r)} ${f(cy)} A${r} ${r} 0 1 1 ${f(cx - r)} ${f(cy)} Z`;
  const poly = (pts, ferme) => "M" + pts.map(pt).join(" L") + (ferme === false ? "" : " Z");
  // textes : allemand manuscrit (Kalam gras), arabe (Plex gras, rtl), titre arabe (Lalezar)
  const tx = (g, s, x, y, size, o) => { o = o || {};
    const t = el("text", { x: f(x), y: f(y), "font-family": o.font || KAL, "font-weight": o.weight || 700, "font-size": size, fill: o.fill || INK, "text-anchor": o.anchor || "middle", "letter-spacing": o.ls, opacity: o.op, transform: o.rot ? `rotate(${o.rot} ${f(x)} ${f(y)})` : null }, g);
    if (o.halo) { t.setAttribute("stroke", o.halo === true ? PAPIER : o.halo); t.setAttribute("stroke-width", o.hw || 7); t.setAttribute("stroke-linejoin", "round"); t.setAttribute("paint-order", "stroke"); }
    t.textContent = s; return t; };
  const ar = (g, s, x, y, size, o) => { const t = tx(g, s, x, y, size, Object.assign({ font: PLEX }, o)); t.setAttribute("direction", "rtl"); if (/[A-Za-z]/.test(s)) t.setAttribute("style", "unicode-bidi: plaintext"); return t; };
  const lal = (g, s, x, y, size, o) => { const t = tx(g, s, x, y, size, Object.assign({ font: LAL, weight: 400 }, o)); t.setAttribute("direction", "rtl"); return t; };
  // largeur estimée d'un texte (getComputedTextLength vaut 0 dans une scène masquée) — calée sur des mesures réelles
  const larg = (s, size) => { let w = 0; for (const ch of String(s)) w += ch === " " ? 0.26 : /[iljtfr:.,;·'|!]/.test(ch) ? 0.36 : /[mwMW—]/.test(ch) ? 0.74 : /[A-ZÄÖÜ€≈]/.test(ch) ? 0.58 : 0.52; return w * size; };
  const largAr = (s, size) => String(s).length * 0.47 * size;
  // contour festonné (boucles, feuillages, haies) : une bosse par segment, vers l'extérieur du polygone
  const bosses = (pts, amp, ferme) => { const n = pts.length; let cx = 0, cy = 0; pts.forEach((p) => { cx += p[0] / n; cy += p[1] / n; });
    let d = "M" + pt(pts[0]);
    for (let i = 0; i < (ferme === false ? n - 1 : n); i++) { const a = pts[i], b = pts[(i + 1) % n], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      let nx = (b[1] - a[1]) / L, ny = -(b[0] - a[0]) / L; if ((mx - cx) * nx + (my - cy) * ny < 0) { nx = -nx; ny = -ny; }
      d += ` Q${f(mx + nx * amp * 2)} ${f(my + ny * amp * 2)} ${pt(b)}`; }
    return d + (ferme === false ? "" : " Z"); };
  // groupe découpé en rond (contenu d'un médaillon) ; l'identifiant est unique à chaque dessin
  const clipRond = (parent, r, cx, cy) => { const id = uid("rond"), cp = el("clipPath", { id }, parent); el("circle", { cx: cx || 0, cy: cy || 0, r }, cp); return el("g", { "clip-path": `url(#${id})` }, parent); };
  const clipPoly = (parent, pts) => { const id = uid("poly"), cp = el("clipPath", { id }, parent); el("path", { d: poly(pts) }, cp); return el("g", { "clip-path": `url(#${id})` }, parent); };
  const SKIN = PM.skin || MAT.skin || { base: "#FFFFFF" };
  const BLOND = PM.hairBlond || { base: "#FCFBF4", hatch: "#B9B6A6", gap: 6, fw: 1.1 };
  const SOMBRE = PM.dark || { base: "#4A4A46", hatch: INK, gap: 4, fw: 1.6 };
  const CLAIR = PM.light || { base: "#F0F0EB", hatch: "#BDBDB6", gap: 6.5, fw: 1.1 };
  const BOIS = PM.wood || { base: "#E9E9E3", hatch: "#ABABA4", gap: 7, fw: 1.1 };
  const JAUNE = { base: YEL };                                                   // jaune en aplat (lumière, autocollant, stylo)
  const DRAP = { base: "#ECECE7", hatch: "#B4B4AE", gap: 8, fw: 1 };
  D._ = { el, f, pt, clamp, lerp, hsh, sstep, uid, ln, fl, ombre, rr, cercle, poly, tx, ar, lal, larg, largAr, bosses, clipRond, clipPoly,
    INK, YEL, OMB, PAPIER, GRIS, KAL, PLEX, LAL, SKIN, BLOND, SOMBRE, CLAIR, BOIS, JAUNE, DRAP };

  /* ═══════════════════════════════ A. LE DISPOSITIF SIGNATURE ET LE HUD PROPRE ═══════════════════════════════ */

  /* A1 — la ligne de séparation de l'écran : un trait d'encre à la plume. Ancrage = milieu du trait (longueur 1240).
   * o.ep       épaisseur (6 → 11 : 6 + 5 × ENC)
   * o.gouttes  0..1 : trois gouttes pendent sous le trait (x −330, −40, 250 ; 0 → 18 px)
   * o.ecg      null, ou liste de complexes [[x, pic], …] (x de −430 à 430, pic en px, 34 par défaut) : entre −430 et 430
   *            le trait est remplacé par une ligne de base + ces complexes (scène muette : la ligne EST le tracé).
   * Position et rotation : par le nœud (LY, PENTE). Jamais de graduation ni de chiffre. Tracés nets (redessinée souvent). */
  D.ligne = (g, o = {}) => {
    const ep = o.ep == null ? 6 : o.ep, L = o.L || 1240, x0 = -L / 2, x1 = L / 2, go = clamp(o.gouttes || 0, 0, 1), ecg = o.ecg || null;
    const plume = (a, b, w, seed, k) => { const n = Math.max(2, Math.round((b - a) / 44)), up = [], dn = [];
      for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; up.push([x, -w / 2 - k * hsh(seed + i * 3.1)]); dn.push([x, w / 2 + k * hsh(seed + 50 + i * 1.7)]); }
      return poly(up.concat(dn.reverse())); };
    const trait = (a, b) => { fl(g, plume(a, b, ep + 4, 7, 1.6), "#3A3A37", { opacity: 0.35 }); fl(g, plume(a, b, ep, 3, 0.9), INK); ln(g, `M${a + 6} ${f(-ep * 0.18)} L${b - 6} ${f(-ep * 0.22)}`, 1.1, "#55524B", { opacity: 0.55 }); };
    if (!ecg) trait(x0, x1);
    else {
      trait(x0, -430); trait(430, x1);
      const cs = ecg.map((c) => (Array.isArray(c) ? c : [c, 34])).filter((c) => c[0] > -470 && c[0] < 470).sort((a, b) => a[0] - b[0]);
      let d = "M-432 0";
      const P = (x, y) => { const xx = clamp(x, -430, 430); d += ` L${f(xx)} ${f(xx === x ? y : 0)}`; };
      cs.forEach(([cx, pic]) => { const a = pic / 34;   // petite bosse, pic, creux, bosse
        [[-52, 0], [-44, -4 * a], [-36, -7 * a], [-28, -4 * a], [-20, 0], [-9, 0], [-5, 5 * a], [0, -pic], [6, 12 * a], [11, 0], [22, 0], [30, -5 * a], [38, -9 * a], [46, -5 * a], [54, 0]].forEach(([dx, dy]) => P(cx + dx, dy)); });
      d += " L432 0";
      ln(g, d, ep + 4, "#3A3A37", { opacity: 0.3 }); ln(g, d, ep, INK);
    }
    if (go > 0.02) [[-330, 1], [-40, 0.8], [250, 0.92]].forEach(([x, k]) => { const len = 18 * go * k, y = ep / 2 - 1;
      fl(g, `M${x - 3.4} ${f(y)} C${x - 3.2} ${f(y + len * 0.5)} ${x - 5} ${f(y + len * 0.75)} ${x} ${f(y + len + 4)} C${x + 5} ${f(y + len * 0.75)} ${x + 3.2} ${f(y + len * 0.5)} ${x + 3.4} ${f(y)} Z`, INK);
      if (len > 7) el("circle", { cx: x, cy: f(y + len), r: f(2.6 + 2 * go * k), fill: INK }, g); });
    return { ep, x0, x1 };
  };
  D.ligne.essais = [{}, { ep: 9, gouttes: 0.8 }, { ep: 11, gouttes: 1, ecg: [[-250, 34], [60, 34], [330, 20]] }, { ecg: [] }];

  /* A2 — l'horloge sans chiffres, posée à cheval sur la ligne. Ancrage = centre ; rayon o.r (44).
   * o.h        heure décimale (0,33 = 0 h 20 ; 2,08 ; 3 ; 6 ; 6,5)
   * o.fantome  0..1 (≥ 0,5 = fantôme) : cadran en pointillés, aiguilles grises et détachées, « ? » à la place de l'axe
   *            → l'heure de la consultation n'est pas publiée : rien de lisible pendant b13–b14.
   * o.secteur  [h0, h1] : part jaune entre deux heures (les « 3 heures ») */
  D.horlogeLigne = (g, o = {}) => {
    const r = o.r || 44, k = r / 44, h = o.h == null ? 0.33 : o.h, fa = (o.fantome || 0) >= 0.5, sec = o.secteur || null, C = U.ctx(g, 921, false, 1);
    const P = (ang, d) => [Math.sin(rad(ang)) * d, -Math.cos(rad(ang)) * d];
    el("circle", { cx: f(5 * k), cy: f(6 * k), r: r + 1, fill: OMB }, g);
    if (fa) { el("circle", { cx: 0, cy: 0, r, fill: "#FFFFFF", stroke: GRIS, "stroke-width": f(3.4 * k), "stroke-dasharray": `${f(7 * k)} ${f(6 * k)}` }, g); }
    else { U.shape(C, "cadran", cercle(0, 0, r), MAT.white, { sw: 3.8 * k, r: 0.7 }); el("circle", { cx: 0, cy: 0, r: f(r - 6.5 * k), fill: "none", stroke: GRIS, "stroke-width": f(1.4 * k) }, g); }
    if (sec && !fa && sec[1] > sec[0] + 0.01) { const a0 = sec[0] * 30, a1 = Math.min(sec[1] * 30, a0 + 359.9), R = r - 9 * k, p0 = P(a0, R), p1 = P(a1, R);
      fl(g, `M0 0 L${pt(p0)} A${f(R)} ${f(R)} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${pt(p1)} Z`, YEL, { opacity: 0.92 }); ln(g, `M0 0 L${pt(p0)} M0 0 L${pt(p1)}`, 1.6 * k, "#B98F1E"); }
    for (let i = 0; i < 12; i++) { const q = i % 3 === 0, a = P(i * 30, r - (q ? 17 : 12.5) * k), b = P(i * 30, r - 8 * k); ln(g, `M${pt(a)} L${pt(b)}`, (q ? 3.2 : 2) * k, fa ? "#C9C9C3" : INK); }
    const ah = ((h % 12) / 12) * 360, am = ((h * 60) % 60) * 6, col = fa ? "#B9B9B3" : INK;
    if (fa) { ln(g, `M${pt(P(ah, 9 * k))} L${pt(P(ah, 20 * k))}`, 4.4 * k, col, { "stroke-dasharray": `${f(4 * k)} ${f(5 * k)}` }); ln(g, `M${pt(P(am, 11 * k))} L${pt(P(am, 30 * k))}`, 3 * k, col, { "stroke-dasharray": `${f(4 * k)} ${f(5 * k)}` });
      tx(g, "?", 0, 8 * k, 24 * k, { fill: "#77776F" }); }
    else { ln(g, `M${pt(P(ah + 180, 4 * k))} L${pt(P(ah, 20 * k))}`, 5.2 * k, col); ln(g, `M${pt(P(am + 180, 6 * k))} L${pt(P(am, 30 * k))}`, 3.2 * k, col); el("circle", { cx: 0, cy: 0, r: f(4.6 * k), fill: INK }, g); el("circle", { cx: 0, cy: 0, r: f(1.6 * k), fill: "#FFFFFF" }, g); }
    return { r };
  };
  D.horlogeLigne.essais = [{ h: 0.33 }, { h: 2.08 }, { h: 3, fantome: 1 }, { h: 4.6, secteur: [3, 4.6] }, { h: 6, secteur: [3, 6] }];

  /* A3 — l'étiquette de temps, accrochée à droite de l'horloge. Ancrage = centre de l'étiquette STANDARD (250 de large).
   * o.de (Kalam 28), o.ar facultatif (Plex gras 26, 2e ligne) → 250 × 52 ou 250 × 88.
   * Un texte plus long que 250 (« Uhrzeit: nicht berichtet ») élargit l'étiquette VERS LA DROITE : le bord gauche (−125) reste
   * accroché à l'horloge. Renvoie { w, h, x0, x1, cx }. o.encoche: false = plaque simple (plaque d'un médaillon). */
  D.etiquetteTemps = (g, o = {}) => {
    const de = o.de == null ? "nach Mitternacht" : o.de, a = o.ar || null, C = U.ctx(g, 925, false, 1);
    const w = o.w || Math.max(250, Math.round(larg(de, 28) + 40), a ? Math.round(largAr(a, 26) + 44) : 0), h = a ? 88 : 52, x0 = -125, y0 = -h / 2, R = 12, cx = x0 + w / 2;
    const d = o.encoche === false ? rr(x0, y0, w, h, R)
      : `M${x0 + R} ${y0} L${x0 + w - R} ${y0} Q${x0 + w} ${y0} ${x0 + w} ${y0 + R} L${x0 + w} ${y0 + h - R} Q${x0 + w} ${y0 + h} ${x0 + w - R} ${y0 + h} L${x0 + R} ${y0 + h} Q${x0} ${y0 + h} ${x0} ${y0 + h - R} L${x0} 9 L${x0 + 9} 0 L${x0} -9 L${x0} ${y0 + R} Q${x0} ${y0} ${x0 + R} ${y0} Z`;
    ombre(g, d, 5, 6); U.shape(C, "etq", d, MAT.white, { sw: 3, r: 0.6 });
    tx(g, de, cx, a ? y0 + 36 : 10, 28);
    if (a) ar(g, a, cx, y0 + 73, 26);
    return { w, h, x0, x1: x0 + w, cx };
  };
  D.etiquetteTemps.essais = [{ de: "nach Mitternacht", ar: "من بعد نص الليل" }, { de: "kurz nach 2 Uhr" }, { de: "3 Uhr" }, { de: "Uhrzeit: nicht berichtet", ar: "الساعة ما معروفاش" }, { de: "3 Stunden" }, { de: "≈ 6:30 Uhr" }, { de: "erfahrener Kollege", ar: "طبيب عندو الخبرة", encoche: false }];

  /* A4 — les deux étiquettes-refrain. Ancrage = centre. o.cote "dehors" → « من برا » (160 × 50) ; "dedans" → « من الداخل » (180 × 52).
   * o.actif (défaut true) : surligneur jaune sous le texte ; false : étiquette à 45 %. */
  D.refrain = (g, o = {}) => {
    const ded = o.cote === "dedans", s = ded ? "من الداخل" : "من برا", w = ded ? 180 : 160, h = ded ? 52 : 50, tw = ded ? 148 : 84, actif = o.actif !== false;
    const G = el("g", actif ? {} : { opacity: 0.45 }, g), C = U.ctx(G, ded ? 932 : 931, false, 1), d = rr(-w / 2, -h / 2, w, h, 11);
    if (actif) ombre(G, d, 5, 6);
    U.shape(C, "ref", d, MAT.white, { sw: 3, r: 0.6 });
    if (actif) fl(G, `M${-tw / 2 - 7} 3 L${tw / 2 + 8} 1 L${tw / 2 + 6} 17 L${-tw / 2 - 9} 18 Z`, YEL, { opacity: 0.95 });
    lal(G, s, 0, 14, 40);
    return { w, h };
  };
  D.refrain.essais = [{ cote: "dehors" }, { cote: "dedans" }, { cote: "dehors", actif: false }, { cote: "dedans", actif: false }];

  /* hors inventaire — la MENTION de vérité (coin haut gauche du HUD : x 104, y 282–316). Ancrage = coin haut gauche.
   * o.de (« laut Presse », « laut Presse · Rekonstruktion », « Schema »), Kalam o.size (22), encre #55524B ;
   * o.ar : traduction à droite de l'étiquette (Plex gras 26 — S1 : « حسب الصحافة », S6 : « رسم توضيحي »). Renvoie { w, h }. */
  D.mention = (g, o = {}) => {
    const s = o.de == null ? "laut Presse" : o.de, size = o.size || 22, w = o.w || Math.round(larg(s, size) + 34), h = size + 12;
    el("rect", { x: 3, y: 4, width: w, height: h, rx: 8, fill: OMB }, g);
    el("rect", { x: 0, y: 0, width: w, height: h, rx: 8, fill: "#FFFFFF", stroke: "#55524B", "stroke-width": 2 }, g);
    tx(g, s, w / 2, h - 10, size, { fill: "#55524B" });
    if (o.ar) ar(g, o.ar, w + 40 + largAr(o.ar, 26) / 2, h - 8, 26, { halo: true });
    return { w, h };
  };
  D.mention.essais = [{}, { de: "laut Presse", ar: "حسب الصحافة" }, { de: "laut Presse · Rekonstruktion" }, { de: "Schema", ar: "رسم توضيحي" }];

  /* A7 — le lavis des transitions d'encre. Ancrage = milieu du bord accroché à la ligne (ou au bas du cadre pour « tout »).
   * o.w, o.h   taille de la zone à couvrir (1080 × 620)
   * o.bord     "haut" : la nappe s'étend vers le HAUT à partir de l'ancrage (moitié haute, ou tout le cadre) ; "bas" : vers le bas
   * o.r        0..1, phase 1 : cinq taches grandissent depuis cinq points du bord (rayon 0 → 900) ; null = pas de taches
   * o.p        0..1, phase 2 : part de la zone couverte par la nappe (1 = tout ; elle redescend vers 0, bue par la ligne)
   * o.onde     phase de l'ondulation du bord (8 lobes, ± 6 px) : t × 2 arrondi ; o.traine 0..1 : six gouttes en retard
   * Un seul aplat par état, tracés nets. À poser dans le groupe DÉCOUPÉ de la zone (dp.haut / dp.bas). */
  D.lavis = (g, o = {}) => {
    const w = o.w || 1080, h = o.h || 620, up = o.bord !== "bas", sg = up ? -1 : 1, ph = o.onde || 0, tr = clamp(o.traine || 0, 0, 1);
    const ENC = "#1C1A1C";
    if (o.r != null && o.r < 1) { const R = 900 * clamp(o.r, 0, 1); if (R < 1) return {};
      [-420, -210, 0, 220, 420].forEach((x, i) => { const rr2 = R * (0.8 + 0.4 * hsh(i * 9.3)); el("circle", { cx: x, cy: 0, r: f(rr2 + 12), fill: "#3A3A37", opacity: 0.5 }, g); });
      [-420, -210, 0, 220, 420].forEach((x, i) => { const rr2 = R * (0.8 + 0.4 * hsh(i * 9.3)); el("circle", { cx: x, cy: 0, r: f(rr2), fill: ENC, opacity: 0.96 }, g); });
      return {}; }
    const p = clamp(o.p == null ? 1 : o.p, 0, 1); if (p <= 0.003) return {};
    const yE = (x) => sg * (p >= 0.995 ? h + 40 : p * h + 6 * Math.sin(TAU * (8 * (x + w / 2) / w + ph)) + 4 * Math.sin(TAU * (2.6 * x / w - ph * 0.6)) * Math.min(1, p * 6));
    const N = 54, E = []; for (let i = 0; i <= N; i++) { const x = -w / 2 - 10 + (w + 20) * i / N; E.push([x, yE(x)]); }
    let dE = "M" + pt(E[0]); for (let i = 1; i < E.length; i++) { const a = E[i - 1], b = E[i]; dE += ` Q${pt(a)} ${f((a[0] + b[0]) / 2)} ${f((a[1] + b[1]) / 2)}`; } dE += " L" + pt(E[N]);
    ln(g, dE, 28, "#3A3A37", { opacity: 0.55 });                                                           // halo humide (14 px de part et d'autre du bord)
    fl(g, dE + ` L${f(w / 2 + 10)} ${f(-sg * 8)} L${f(-w / 2 - 10)} ${f(-sg * 8)} Z`, ENC, { opacity: 0.96 });
    [[-380, 0.34, 150], [-140, 0.7, 120], [70, 0.42, 170], [270, 0.78, 110], [430, 0.3, 130]].forEach(([x, ky, rx]) => el("ellipse", { cx: x, cy: f(sg * p * h * ky), rx, ry: f(Math.min(46, p * h * 0.16)), fill: "#070607", opacity: 0.55 }, g));   // cinq flaques plus sombres
    if (p < 0.995) for (let i = 0; i < 10; i++) { const x = -w / 2 + 40 + (w - 80) * hsh(i * 5.7 + 1), d2 = 12 + 34 * hsh(i * 3.3 + 2); el("circle", { cx: f(x), cy: f(yE(x) + sg * d2), r: f(2.5 + 4.5 * hsh(i * 2.1)), fill: ENC, opacity: 0.9 }, g); }   // gouttelettes au-delà du bord
    if (tr > 0.02 && p < 0.995) for (let i = 0; i < 6; i++) { const x = -w / 2 + 90 + (w - 180) * (i + 0.5 * hsh(i * 7.7)) / 6, y0 = yE(x), len = (50 + 70 * hsh(i * 4.1)) * tr;   // gouttes en retard
      ln(g, `M${f(x)} ${f(y0)} L${f(x)} ${f(y0 + sg * len)}`, 7 + 4 * hsh(i), ENC, { opacity: 0.92 }); el("circle", { cx: f(x), cy: f(y0 + sg * len), r: f(6 + 3 * hsh(i * 1.3)), fill: ENC }, g); }
    return { bord: sg * p * h };
  };
  D.lavis.essais = [{ r: 0.12, w: 1080, h: 620 }, { p: 1 }, { p: 0.6, onde: 0.3, traine: 0.6 }, { p: 0.25, onde: 0.7, traine: 1 }, { p: 0.5, bord: "bas", onde: 0.2 }];

  /* A8 — l'autocollant « betrunken / سكران ». Ancrage = centre (230 × 110).
   * o.rot   inclinaison dessinée (−8° par défaut ; passer 0 si le nœud tourne lui-même pendant la chute)
   * o.peel  0..1 : le coin bas droit se décolle (triangle replié gris clair + ombre) — PEEL(t) */
  D.autocollant = (g, o = {}) => {
    const rot = o.rot == null ? -8 : o.rot, peel = clamp(o.peel || 0, 0, 1), w = 230, h = 110, X = w / 2, Y = h / 2, R = 16;
    const G = el("g", { transform: `rotate(${rot})` }, g), C = U.ctx(G, 941, false, 1), c = peel < 0.03 ? 0 : 14 + 52 * peel;
    const body = c ? `M${-X + R} ${-Y} L${X - R} ${-Y} Q${X} ${-Y} ${X} ${-Y + R} L${X} ${Y - c} L${X - c} ${Y} L${-X + R} ${Y} Q${-X} ${Y} ${-X} ${Y - R} L${-X} ${-Y + R} Q${-X} ${-Y} ${-X + R} ${-Y} Z` : rr(-X, -Y, w, h, R);
    ombre(G, rr(-X, -Y, w, h, R), 6, 8);
    U.shape(C, "stick", body, JAUNE, { sw: 4, r: 0.6 });
    ln(G, `M${-X + 14} ${-Y + 26} Q${-X + 13} ${-Y + 13} ${-X + 28} ${-Y + 12} L${-X + 62} ${-Y + 11}`, 5, "#FFFFFF", { opacity: 0.85 });   // reflet
    tx(G, "betrunken", 0, -6, 40);
    ar(G, "سكران", -4, 34, 30);
    if (c) { fl(G, poly([[X - c, Y], [X, Y - c], [X - c * 0.82 + 5, Y - c * 0.82 + 7]]), "#1C1A1C", { opacity: 0.22 });      // ombre du coin replié
      U.shape(C, "coin", poly([[X - c, Y], [X, Y - c], [X - c * 0.86, Y - c * 0.86]]), { base: "#EDEADC" }, { sw: 3, r: 0.5 });
      ln(G, `M${f(X - c * 0.7)} ${f(Y - c * 0.36)} L${f(X - c * 0.36)} ${f(Y - c * 0.7)}`, 1.4, "#B9B6A6"); }
    return { w, h };
  };
  D.autocollant.essais = [{}, { peel: 0.5 }, { peel: 1 }, { rot: 0 }];

  /* A9 — le médaillon : un cadre rond « dans le cadre » (gros plan sans recadrage). Ancrage = centre ; o.r (110 à 125).
   * o.vers  [dx, dy] : direction de la queue en trois ronds décroissants (r 12, 8, 5) — comme une pensée, pas une loupe.
   * Le CONTENU est dessiné par l'appelant, par-dessus, dans D._.clipRond(parent, out.clip) : l'anneau reste visible autour. */
  D.medaillon = (g, o = {}) => {
    const r = o.r || 110, v = o.vers || null, C = U.ctx(g, o.seed || 951, false, 1), queue = [];
    if (v) { const d = Math.hypot(v[0], v[1]) || 1, ux = v[0] / d, uy = v[1] / d;
      [[r + 22, 12], [r + 48, 8], [r + 66, 5]].forEach(([dist, q]) => { const x = f(ux * dist), y = f(uy * dist); queue.push([x, y]);
        el("circle", { cx: x + 3, cy: y + 4, r: q, fill: OMB }, g); el("circle", { cx: x, cy: y, r: q, fill: "#FFFFFF", stroke: INK, "stroke-width": 3 }, g); }); }
    el("circle", { cx: 7, cy: 9, r: r + 2, fill: OMB }, g);
    el("circle", { cx: 0, cy: 0, r, fill: "#FBFBF6" }, g);
    U.shape(C, "anneau", cercle(0, 0, r), {}, { sw: 5, r: 0.6 });
    el("circle", { cx: 0, cy: 0, r: r - 6.5, fill: "none", stroke: YEL, "stroke-width": 3 }, g);
    return { r, clip: r - 9, queue };
  };
  D.medaillon.essais = [{ vers: [140, 110] }, { r: 118, vers: [60, 200] }, { r: 125 }];
  D._.clipRond = clipRond;

  /* ── géométrie commune à D.crane, D.dedans et D.craneNoms. Repère : centre de la boîte crânienne (0,0) ; 520 × 560.
   * La boîte est une « super-ellipse » : ronde en haut (la voûte), plus plate en bas (la base). L'os fait 22 px. */
  const CR = { a: 204, cy: -38, b: 190, nH: 2.2, nB: 3.0, os: 22, yF: -58 };
  const crPts = (d, n) => { const pts = []; n = n || 60;
    for (let i = 0; i < n; i++) { const t = (i / n) * TAU, c = Math.cos(t), s = Math.sin(t), e = 2 / (s < 0 ? CR.nH : CR.nB);
      pts.push([(CR.a + d) * Math.sign(c) * Math.pow(Math.abs(c), e), CR.cy + (CR.b + d) * Math.sign(s) * Math.pow(Math.abs(s), e)]); }
    return pts; };
  // x de la paroi (décalée de d vers l'extérieur) à la hauteur y, côté droit ; côté gauche = −crX
  const crX = (y, d) => { d = d || 0; const u = (y - CR.cy) / (CR.b + d), n = u < 0 ? CR.nH : CR.nB, q = 1 - Math.pow(Math.min(1, Math.abs(u)), n); return q <= 0 ? 0 : (CR.a + d) * Math.pow(q, 1 / n); };
  const FRAC = [[-229, -72], [-221, -66], [-224, -60], [-213, -56], [-216, -49], [-200, -44]];   // la fracture : zigzag à travers l'os, tempe gauche de l'écran

  /* A5 — la coupe du crâne, vue de face (un SCHÉMA, pas une planche d'anatomie). Ancrage = centre de la boîte crânienne.
   * De dehors en dedans : la peau (œuf renversé, deux petites oreilles, amorce du cou), l'os (bande hachurée de 22 px qui se
   * ferme en bas par la base du crâne), la petite marque de la peau à la tempe gauche (tout ce qu'on voit du dehors).
   * o.frac    0..1 : la fracture se trace à travers l'os (défaut 1) ; o.eclat 0..1 : les deux éclats d'os s'écartent (4 px)
   * o.rigide  0..1 : cinq petits traits DANS l'os, côté droit, qui pulsent (« la boîte ne cède pas »)
   * o.epais   0..1 : contour de l'os + 1,5 px          o.noms : true = les trois étiquettes (voir D.craneNoms)
   * Statique (m.obj) sauf pendant S6 (frac) et S13 (rigide, epais). D.dedans se pose par-dessus, dans le même nœud parent.
   * Renvoie { marque, fracture, haut, noms } (points pour les flèches et le rond jaune de S6). */
  D.crane = (g, o = {}) => {
    const C = U.ctx(g, 971, false, 1), frac = clamp(o.frac == null ? 1 : o.frac, 0, 1), ec = clamp(o.eclat || 0, 0, 1), rig = clamp(o.rigide || 0, 0, 1), ep = clamp(o.epais || 0, 0, 1);
    // oreilles (derrière la peau)
    [-1, 1].forEach((s) => U.shape(C, "oreille" + s, U.blob([[s * 240, 30], [s * 258, 28], [s * 266, 52], [s * 262, 82], [s * 250, 98], [s * 238, 92]]), SKIN, { sw: 2.6 }));
    [-1, 1].forEach((s) => ln(g, `M${s * 250} 44 Q${s * 258} 60 ${s * 250} 82`, 1.5, GRIS));
    // la peau
    const half = [[0, -276], [72, -270], [142, -246], [198, -198], [234, -126], [247, -44], [244, 30], [238, 96], [222, 150], [186, 204], [140, 240], [122, 262], [118, 284]];
    const skin = half.slice().reverse().map((p) => [-p[0], p[1]]).concat(half.slice(1)), dS = U.curve(skin);
    fl(g, dS + " Z", "#FFFFFF");
    U.stroke(C, "peau", dS, { sw: 3.4, r: 0.6 });
    // amorce du cou : deux vertèbres esquissées sous la base
    [[196, 26], [232, 24]].forEach(([y, hh], i) => el("rect", { x: -17 + i, y, width: 34 - 2 * i, height: hh, rx: 7, fill: "#F1F1EC", stroke: "#B4B4AE", "stroke-width": 1.6 }, g));
    ln(g, "M-70 268 Q-40 252 -22 262 M70 268 Q40 252 22 262", 1.4, "#C4C4BE");
    // l'os : bande hachurée, puis l'intérieur de la boîte
    U.shape(C, "os", U.blob(crPts(CR.os)), MAT.grey, { sw: 2.9 + 1.5 * ep, r: 0.55 });
    U.shape(C, "boite", U.blob(crPts(0)), { base: "#F6F6F1" }, { sw: 2.5 + 1.2 * ep, r: 0.5 });
    // « la boîte ne cède pas » : cinq traits courts dans l'épaisseur de l'os, côté droit
    if (rig > 0.02) [-150, -96, -40, 16, 72].forEach((y, i) => { const xi = crX(y, 3), xo = crX(y, CR.os - 3), k = 0.55 + 0.45 * rig, m = (xi + xo) / 2, hL = (xo - xi) / 2 * k + 3 * rig, sl = (y - CR.cy) / 190 * 6;
      ln(g, `M${f(m - hL)} ${f(y - sl)} L${f(m + hL)} ${f(y + sl)}`, 4, INK, { opacity: f(rig) });
      ln(g, `M${f(xo + 7)} ${f(y + sl)} l${f(7 + 6 * rig)} ${f(sl * 0.4)}`, 2.4, INK, { opacity: f(rig * 0.8) }); });
    // la marque de la peau (« Prellpunkt ») : petite, hachurée, ni plaie ni sang
    el("ellipse", { cx: -253, cy: CR.yF, rx: 5.5, ry: 8.5, fill: "#CFCFCA", stroke: "#55524B", "stroke-width": 1.6 }, g);
    ln(g, `M-256 ${CR.yF - 4} l5 4 M-256 ${CR.yF + 1} l5 4`, 1.1, "#77776F");
    // la fracture : un zigzag d'encre à travers l'os, tracé selon frac ; deux éclats de 5 px
    if (frac > 0.01) { let L = 0; for (let i = 1; i < FRAC.length; i++) L += Math.hypot(FRAC[i][0] - FRAC[i - 1][0], FRAC[i][1] - FRAC[i - 1][1]);
      const d = poly(FRAC, false);
      ln(g, d, 7.5, "#F6F6F1", { "stroke-dasharray": `${f(L * frac)} 999` });
      ln(g, d, 3.4, INK, { "stroke-dasharray": `${f(L * frac)} 999` });
      if (frac > 0.85) { const k = 4 * ec;
        fl(g, poly([[-226 - k, -60 - k * 0.3], [-219 - k, -63 - k * 0.3], [-221 - k, -56 - k * 0.3]]), "#E1E1DC", { stroke: INK, "stroke-width": 1.5, "stroke-linejoin": "round" });
        fl(g, poly([[-212 + k * 0.6, -50 + k], [-206 + k * 0.6, -52 + k], [-209 + k * 0.6, -45 + k]]), "#E1E1DC", { stroke: INK, "stroke-width": 1.5, "stroke-linejoin": "round" }); } }
    if (o.noms) D.craneNoms(g, o.noms === true ? {} : o.noms);
    return { marque: [-253, CR.yF], fracture: [-214, CR.yF], fractureDedans: [-200, -44], haut: -276, bas: 284, osHaut: [0, CR.cy - CR.b - CR.os / 2] };
  };
  D.crane.essais = [{}, { frac: 0 }, { frac: 0.5 }, { rigide: 1, epais: 1, eclat: 1 }, { noms: true }];

  /* A6 — l'intérieur du crâne, redessiné selon l'encre (tracés NETS, sans rough : il se redessine en continu). Même repère que A5.
   * o.enc    0..1 : quantité d'encre = ENC(t) arrondi au 1/80. Une perle à la fracture, puis une lentille noire entre l'os et la
   *          dure-mère (épaisseur 0 → 86, hauteur 40 → 300), bord baveux, 8 gouttelettes. Le cerveau CÈDE : le bord de l'hémisphère
   *          gauche suit l'encre, son ventricule s'écrase, la ligne du milieu se bombe vers la droite (0 → 34 px).
   * o.pouls  0..1 : le cerveau « bat » de ± 1 px        o.tr : phase 0..1 du tremblement des gouttelettes (3 Hz)
   * o.plein  0..1 : l'encre envahit toute la boîte, de gauche à droite (scène muette) */
  D.dedans = (g, o = {}) => {
    const e = clamp(o.enc || 0, 0, 1.12), pl = clamp(o.plein || 0, 0, 1), pu = o.pouls == null ? 0.5 : o.pouls, tr = o.tr || 0, yF = CR.yF;
    if (o.avecCrane) D.crane(g, {});                                               // pour les essais : la coupe dessous
    const th = e <= 0 ? 0 : 86 * Math.pow(e, 0.9), hh = 40 + 260 * Math.min(e, 1.06), y0 = yF - hh / 2, y1 = yF + hh / 2;
    const bulge = (y) => (e <= 0 || y <= y0 || y >= y1 ? 0 : th * Math.pow(Math.sin(Math.PI * (y - y0) / (y1 - y0)), 0.75));
    const xEnc = (y) => -crX(y) + bulge(y);                                        // bord intérieur de la lentille
    const M = 34 * sstep(0.3, 0.82, e), mid = (y) => M * Math.exp(-Math.pow((y - yF) / 150, 2));   // la ligne du milieu se bombe
    const xL0 = (y) => -crX(y, -12), xR0 = (y) => crX(y, -12);
    const xL = (y) => Math.max(xL0(y), bulge(y) > 0 ? xEnc(y) + 6 : -1e9);
    const warp = (p) => { const x = p[0], y = p[1], m = mid(y);
      if (x <= 0) { const a = xL0(y); return a >= -1 ? [x, y] : [lerp(xL(y), m, clamp((x - a) / -a, 0, 1)), y]; }
      const b = xR0(y); return b <= 1 ? [x, y] : [lerp(m, b, clamp(x / b, 0, 1)), y]; };
    const W = (pts) => pts.map(warp);
    // dure-mère : trait fin à 5 px sous l'os ; elle est décollée par l'encre
    { const pts = []; for (let y = CR.cy - CR.b + 5; y <= CR.cy + CR.b - 5; y += 9) pts.push([crX(y, -5), y]);
      const left = []; for (let y = CR.cy + CR.b - 5; y >= CR.cy - CR.b + 5; y -= 9) left.push([Math.max(-crX(y, -5), bulge(y) > 0 ? xEnc(y) : -1e9), y]);
      ln(g, poly(pts.concat(left)), 1.5, "#77776F"); }
    const B = el("g", { transform: `translate(0 ${CR.cy}) scale(${(1 + 0.01 * (pu - 0.5)).toFixed(4)}) translate(0 ${-CR.cy})` }, g);
    // le tronc, en bas, qui traverse la base
    { const dx = mid(110) * 0.45; fl(B, U.blob([[-20 + dx, 74], [20 + dx, 74], [18 + dx * 0.6, 122], [13, 186], [-13, 186], [-18 + dx * 0.6, 122]], 0.7), "#FFFFFF", { stroke: INK, "stroke-width": 2.2, "stroke-linejoin": "round" });
      ln(B, `M${f(-6 + dx * 0.5)} 120 q6 8 0 18 M${f(6 + dx * 0.4)} 142 q-6 8 0 16`, 1.3, "#A1A19B"); }
    // deux hémisphères
    const hemi = (s) => { const out = [[s * 4, -213], [s * 28, -214.5]];
      for (let y = -210; y <= 88; y += 17) out.push([s * crX(y, -12), y]);
      return out.concat([[s * 140, 108], [s * 100, 119], [s * 62, 110], [s * 32, 92], [s * 9, 70], [s * 4, 30], [s * 4, -40], [s * 4, -120], [s * 4, -190]]); };
    [-1, 1].forEach((s) => fl(B, U.blob(W(hemi(s)), 0.9), "#FFFFFF", { stroke: INK, "stroke-width": 2.5, "stroke-linejoin": "round" }));
    // six sillons par hémisphère (une plage sans sillons est réservée au mot « Gehirn », à droite)
    const SD = [[[28, -168], [52, -150], [40, -122]], [[92, -188], [108, -160], [88, -132]], [[152, -140], [132, -118], [150, -94]], [[170, 8], [142, 26], [152, 58]], [[56, 68], [86, 50], [118, 66]], [[72, 14], [50, 32], [40, 8]]];
    const SG = [[[-28, -168], [-52, -150], [-40, -122]], [[-92, -188], [-108, -160], [-88, -132]], [[-152, -132], [-128, -110], [-146, -84]], [[-122, -52], [-96, -34], [-114, -8]], [[-170, 8], [-142, 26], [-152, 58]], [[-56, 68], [-86, 50], [-118, 66]]];
    SD.concat(SG).forEach((s) => ln(B, U.curve(W(s)), 2, "#55524B"));
    // un ventricule en « corne » par hémisphère ; celui de gauche s'écrase
    const V = [[10, -40], [30, -62], [52, -58], [41, -44], [27, -30], [21, -8], [12, -13]], sq = 1 - 0.65 * sstep(0.25, 0.85, e);
    fl(B, U.blob(W(V), 0.9), "#DADAD5", { stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" });
    fl(B, U.blob(W(V.map((p) => [-30 + (-p[0] + 30) * sq, p[1]])), 0.9), "#DADAD5", { stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" });
    // la faux : du sommet jusqu'à 60 % de la hauteur
    { const pts = []; for (let y = CR.cy - CR.b + 3; y <= -2; y += 16) pts.push([mid(y), y]); ln(g, U.curve(pts), 2.2, INK); }
    // l'encre : perle à la fracture, puis lentille sous l'os
    if (e > 0) {
      const N = 34, wall = [], inn = [];
      for (let i = 0; i <= N; i++) { const y = y0 + (y1 - y0) * i / N; wall.push([-crX(y) - 1.5, y]); inn.push([xEnc(y), y]); }
      const dIn = U.curve(inn);
      ln(g, dIn, 24, INK, { opacity: 0.18 }); ln(g, dIn, 12, INK, { opacity: 0.35 });                       // bord baveux
      fl(g, poly(wall.concat(inn.slice().reverse())), INK);
      const pr = 2 + 6 * sstep(0, 0.05, e); el("circle", { cx: -200 + pr * 0.4, cy: -45, r: f(pr), fill: INK }, g);      // la perle
      if (e > 0.03) for (let i = 0; i < 8; i++) { const s = (i + 0.5) / 8, y = y0 + (y1 - y0) * (0.08 + 0.84 * s), d2 = 5 + 9 * hsh(i * 3.7 + 1);
        el("circle", { cx: f(xEnc(y) + d2 + 1.5 * Math.sin(TAU * (tr + i * 0.37))), cy: f(y + 1.5 * Math.cos(TAU * (tr * 1.3 + i * 0.21))), r: f((1.4 + 2.2 * hsh(i * 5.1)) * Math.min(1, e * 6 + 0.4)), fill: INK }, g); }
    }
    // l'encre remplit toute la boîte (scène muette) : front ondulé, de gauche à droite
    if (pl > 0.005) { const L = [], R = [];
      for (let y = CR.cy - CR.b + 2; y <= CR.cy + CR.b - 2; y += 8) { const w = crX(y) - 1, xf = -CR.a - 30 + pl * (2 * CR.a + 70) + 12 * Math.sin(y / 34 + pl * 7) + 6 * Math.sin(y / 13);
        if (xf > -w) { L.push([-w, y]); R.push([Math.min(w, xf), y]); } }
      if (L.length > 1) { fl(g, poly(L.concat(R.reverse())), INK); } }
    if (o.avecCrane && o.noms) D.craneNoms(g, {});
    return { lentille: [f(-crX(yF) + th * 0.5), yF], bord: [f(xEnc(yF)), yF], haut: [f(xEnc(y0 + 6)), f(y0)], th: f(th), hh: f(hh) };
  };
  D.dedans.essais = [{ enc: 0, avecCrane: true }, { enc: 0.04, avecCrane: true }, { enc: 0.22, avecCrane: true }, { enc: 0.62, avecCrane: true, noms: true }, { enc: 0.78, avecCrane: true }, { enc: 1, avecCrane: true }, { enc: 1, plein: 0.5, avecCrane: true }, { enc: 1, plein: 1, avecCrane: true }, { enc: 0.5 }];

  /* les trois étiquettes de la coupe (A5, o.noms) : « Knochen / العظم » au-dessus de la voûte, « Blut / الدم » à gauche dehors
   * (trait court vers la lentille), « Gehirn / المخ » dans l'hémisphère droit. Même repère que A5 ; À POSER AU-DESSUS de D.dedans.
   * o.knochen, o.blut, o.gehirn : 0 / 1 (défaut : les trois). Allemand Kalam 26, arabe Plex gras 30, contour papier. */
  D.craneNoms = (g, o = {}) => {
    const on = (k) => o[k] == null ? !("knochen" in o || "blut" in o || "gehirn" in o) : !!o[k];
    if (on("knochen")) { ln(g, "M0 -286 L0 -256", 2.4, INK); el("circle", { cx: 0, cy: -254, r: 4, fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g);
      tx(g, "Knochen", -60, -291, 26, { halo: true }); ar(g, "العظم", 52, -290, 30, { halo: true }); }
    if (on("blut")) { ln(g, "M-270 -30 L-198 -30", 2.4, INK); el("circle", { cx: -194, cy: -30, r: 4.5, fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g);
      tx(g, "Blut", -302, -32, 26, { halo: true }); ar(g, "الدم", -302, 4, 30, { halo: true }); }
    if (on("gehirn")) { tx(g, "Gehirn", 112, -46, 26, { halo: "#FFFFFF", hw: 6 }); ar(g, "المخ", 112, -12, 30, { halo: "#FFFFFF", hw: 6 }); }
    return { knochen: [0, -300], blut: [-302, -14], gehirn: [112, -30] };
  };
  D.craneNoms.essais = [{}];

  /* ── le garçon de PROFIL (dessin dédié : jamais une tête Persona pivotée). Repère « debout » : centre de la tête (0,0),
   * visage vers +x. Le groupe G est tourné de −90° par l'appelant : le visage regarde le plafond, la tête est à gauche.
   * Front, nez, lèvres, menton, œil fermé + trois cils, sourcil clair, joue ; boucles blondes qui couvrent l'oreille et
   * s'écrasent sur l'oreiller ; cou court. o.marque (petite marque hachurée à la tempe), o.teint 1 → 0, o.masque. */
  const TEMPE = [27, -31];
  const profilGar = (G, o) => {
    const C = U.ctx(G, o.seed || 961, false, 1), teint = o.teint == null ? 1 : clamp(o.teint, 0, 1);
    U.shape(C, "cou", "M-32 40 C-22 50 4 58 16 58 L18 96 L-36 96 Z", SKIN, { sw: 2.4, r: 0.6 });
    U.shape(C, "visage", "M0 -66 C26 -67 46 -54 52 -34 C55 -24 55 -14 53 -6 C55 0 60 8 65 16 C67 20 64 24 58 25 C57 28 58 30 60 32 C62 35 59 37 57 38 C60 40 61 44 57 46 C54 48 54 51 56 55 C58 62 50 68 38 68 C26 68 12 62 -4 56 C-24 50 -44 40 -56 22 C-66 4 -64 -30 -44 -52 C-30 -64 -14 -66 0 -66 Z", SKIN, { sw: 2.6, r: 0.55 });
    // joue : le rose s'éteint avec o.teint
    if (teint > 0.02) el("ellipse", { cx: 33, cy: 23, rx: 11, ry: 7, fill: "#F0A99F", opacity: f(0.55 * teint) }, G);
    for (let k = -1; k <= 1; k++) ln(G, `M${30.5 + k * 5} 26.5 l5 -7`, 1.4, teint > 0.5 ? "#D98478" : "#C4C4BE");
    ln(G, "M29 -4 Q39 5 49 -3", 2.5); [[32.5, -1, -1.4], [38.5, 1.8, -0.4], [44.5, 0.8, 0.8]].forEach(([x, y, dx]) => ln(G, `M${x} ${y} l${dx} 5.2`, 1.6));   // paupière fermée + trois cils
    ln(G, "M31 -17 Q42 -23.5 53 -15", 3.2, "#A5A292");                                                   // sourcil clair
    ln(G, "M59.5 21 Q62.5 23.5 64.5 20.5", 1.6); ln(G, "M48 38.5 Q53 40.5 57 38", 2.1);                  // narine, bouche fermée
    ln(G, "M44 58 Q49 61 54 58", 1.2, "#B4B4AE");
    if (o.marque) { el("ellipse", { cx: TEMPE[0], cy: TEMPE[1], rx: 5.2, ry: 3.8, fill: "#C9C9C3", stroke: "#55524B", "stroke-width": 1.3, transform: `rotate(-28 ${TEMPE[0]} ${TEMPE[1]})` }, G);
      ln(G, `M${TEMPE[0] - 3} ${TEMPE[1] + 1.5} l3.5 -3.5 M${TEMPE[0]} ${TEMPE[1] + 2.5} l3.5 -3.5`, 0.9, "#77776F"); }
    // les boucles : contour festonné du front à la nuque, bord avant lisse (tempe → devant l'oreille → nuque)
    const O = [[45, -53], [36, -67], [18, -77], [-6, -80], [-30, -75], [-49, -63], [-62, -45], [-67, -23], [-67, 1], [-64, 24], [-56, 42], [-42, 54]];
    U.shape(C, "boucles", bosses(O, 4.5, false) + " C-34 50 -24 44 -18 34 C-10 22 -2 14 2 2 C5 -8 6 -20 13 -31 C19 -40 30 -47 45 -53 Z", BLOND, { sw: 2.4, r: 0.7 });
    [[-20, -62], [-44, -42], [-54, -10], [-42, 24], [-8, -48], [-24, -16], [8, -62], [-28, 6]].forEach(([cx, cy]) => ln(G, `M${cx} ${cy} q7 -7 12 1 q3 7 -4 10`, 1.6, "#8D8A7A"));
    if (o.masque) { fl(G, "M47 6 C66 2 82 14 83 31 C84 48 70 60 48 58 Z", "#FFFFFF", { opacity: 0.78, stroke: INK, "stroke-width": 2.3, "stroke-linejoin": "round" });
      ln(G, "M52 12 C64 12 74 20 76 31", 1.3, "#B4B4AE"); el("rect", { x: 81, y: 24, width: 15, height: 14, rx: 3, fill: "#E1E1DC", stroke: INK, "stroke-width": 2 }, G); }
  };
  // membre à trois articulations (contour lisse), pour les bras et les jambes du gisant
  const membre = (C, key, J, w, mat, o) => { const seg = (a, b) => { const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1; return [(b[1] - a[1]) / L, -(b[0] - a[0]) / L]; };
    const n1 = seg(J[0], J[1]), n2 = seg(J[1], J[2]), nm = [(n1[0] + n2[0]) / 2, (n1[1] + n2[1]) / 2], q = Math.hypot(nm[0], nm[1]) || 1, m = [nm[0] / q, nm[1] / q];
    const P = (p, n, k) => [p[0] + n[0] * k, p[1] + n[1] * k], mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const A = [P(J[0], n1, w[0] / 2), P(mid(J[0], J[1]), n1, (w[0] + w[1]) / 4 + 0.5), P(J[1], m, w[1] / 2), P(mid(J[1], J[2]), n2, (w[1] + w[2]) / 4 + 0.5), P(J[2], n2, w[2] / 2)];
    const Bq = [P(J[2], n2, -w[2] / 2), P(mid(J[1], J[2]), n2, -(w[1] + w[2]) / 4 - 0.5), P(J[1], m, -w[1] / 2), P(mid(J[0], J[1]), n1, -(w[0] + w[1]) / 4 - 0.5), P(J[0], n1, -w[0] / 2)];
    return U.shape(C, key, U.blob(A.concat(Bq), 0.9), mat, Object.assign({ sw: 2.4, r: 0.7 }, o)); };
  const BLOUSE = { base: "#F6F6F1", hatch: "#D2D2CB", gap: 9, fw: 0.9 };

  /* A10 — le garçon ALLONGÉ. Dessin dédié (profil tourné vers le plafond, tête à GAUCHE). Longueur 400, hauteur ≈ 100.
   * Ancrage = dessous de la tête, au ras du matelas ou du sol : la tête occupe x 0…96, les pieds sont à x 400.
   * o.tenue   "drap" (défaut) : couverture gris clair du haut de la poitrine aux pieds, revers, un bras posé dessus (manche de
   *           sweat, main en moufle), bosse des pieds · "dehors" : corps entier (sweat, jean foncé, baskets, une jambe à demi pliée)
   * o.col     "blouse" : chemise d'hôpital à la place du sweat et de la capuche (S18)
   * o.souffle 0..1 : la poitrine monte de 4 px         o.teint 1 → 0 : la joue rose s'éteint
   * o.agite   −1..1 (SIGNÉ : AGITE(t) × bruit(t), arrondi au 1/12) : la tête roule de ± 6°, trois plis de la couverture se déplacent
   * o.agite2  −1..1 (2e fréquence ; défaut = agite) : l'avant-bras se soulève et retombe, le genou bouge
   * o.marque  petite marque hachurée à la tempe (10 × 7, sans sang ni bosse)      o.masque 0/1 : masque de ventilation sur le visage
   * Renvoie { tete, tempe, bouche, poitrine, main, pieds, haut } dans le repère de l'ancrage. */
  D.gisant = (g, o = {}) => {
    const drap = o.tenue !== "dehors", blouse = o.col === "blouse", b = 4 * clamp(o.souffle || 0, 0, 1), ag = clamp(o.agite || 0, -1, 1), ag2 = clamp(o.agite2 == null ? ag : o.agite2, -1, 1);
    const C = U.ctx(g, o.seed || 963, false, 1), K = 0.75, HX = 48, HY = -47, HAUT = blouse ? BLOUSE : MAT.mid;
    // la capuche en bourrelet derrière la nuque (pas avec la chemise d'hôpital)
    if (!blouse) { U.shape(C, "capuche", "M80 2 C76 -16 90 -31 108 -32 C124 -33 137 -25 140 -11 C142 -3 139 2 134 4 Z", MAT.mid, { sw: 2.4 }); ln(g, "M92 -22 Q104 -14 100 0 M112 -27 Q124 -18 121 2", 1.4, "#77776F"); }
    // le haut du corps (sweat ou chemise)
    if (drap) U.shape(C, "haut", `M108 -53 C118 -66 136 ${f(-71 - b)} 158 ${f(-71 - b)} L182 ${f(-67 - b)} L182 4 L110 4 C104 -10 104 -37 108 -53 Z`, HAUT, { sw: 2.5 });
    else {   // dehors : la jambe du fond (tendue) et sa basket, puis le sweat
      membre(C, "jambeF", [[236, -24], [308, -17], [376, -15]], [44, 31, 24], SOMBRE);
      U.shape(C, "basketF", "M372 -30 C376 -52 392 -60 399 -50 C403 -40 401 -14 399 1 L373 1 Z", MAT.white, { sw: 2.4 }); ln(g, "M377 -8 L398 -8 M380 -36 l9 3 M381 -28 l9 3", 1.5, "#77776F");
      U.shape(C, "haut", `M108 -53 C118 -66 138 ${f(-71 - b)} 168 ${f(-70 - b)} C198 ${f(-68 - b)} 224 -60 244 -52 L246 2 L110 4 C104 -10 104 -37 108 -53 Z`, HAUT, { sw: 2.5 });
      ln(g, "M236 -52 L238 2", 1.6, "#55524B"); ln(g, "M241 -44 l0 40", 1.1, "#77776F");
      // la jambe de devant, à demi pliée, pied à plat
      membre(C, "jambeD", [[240, -22], [300 + 3 * ag2, -80 - 5 * Math.abs(ag2)], [346, -15]], [42, 32, 23], SOMBRE);
      U.shape(C, "basketD", "M334 -24 C348 -30 370 -22 384 -10 C390 -5 388 1 380 1 L334 1 Z", MAT.white, { sw: 2.4 }); ln(g, "M338 -6 L384 -6 M352 -22 l5 7 M360 -19 l5 7", 1.5, "#77776F");
    }
    // la tête (cou compris) : elle roule de ± 6° sur place quand il s'agite
    const H = el("g", { transform: `translate(${HX} ${HY}) rotate(${f(-90 + 6 * ag)}) scale(${K})` }, g);
    profilGar(H, { marque: !!o.marque, teint: o.teint, masque: !!o.masque, seed: (o.seed || 963) + 2 });
    // le col (bord-côte du sweat, ou encolure de la chemise) et les deux cordons de la capuche
    if (!blouse) { U.shape(C, "col", "M101 -58 C107 -64 115 -64 120 -59 C123 -46 122 -30 118 -19 C112 -15 104 -17 99 -22 C103 -34 103 -46 101 -58 Z", { base: "#BDBDB7", hatch: "#77776F", gap: 4, fw: 1.2 }, { sw: 2.3 });
      ln(g, `M117 -57 C128 -58 133 -50 132 -38 L131 -24 M120 -61 C134 -66 147 ${f(-62 - b)} 148 -48 L147 -36`, 2.2, "#FFFFFF"); ln(g, `M117 -57 C128 -58 133 -50 132 -38 L131 -24 M120 -61 C134 -66 147 ${f(-62 - b)} 148 -48 L147 -36`, 1.2, "#55524B");
      [[131, -22], [147, -34]].forEach(([x, y]) => el("rect", { x: x - 2.2, y: y - 1, width: 4.4, height: 8, rx: 1.5, fill: "#55524B" }, g)); }
    else { ln(g, `M104 -58 C112 -50 118 -36 116 -20`, 2.2, "#77776F"); [[126, -52], [140, -40], [124, -28], [150, -58]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 2.2, fill: "#A9A9A2" }, g)); }
    let main;
    if (drap) {
      // la couverture : du haut de la poitrine aux pieds ; elle retombe un peu sur le bord du matelas
      const kn = 8 * Math.abs(ag2), top = `C170 ${f(-74 - b)} 196 ${f(-71 - b)} 216 ${f(-62 - b * 0.5)} C238 -55 262 -53 286 ${f(-51 - kn * 0.4)} C304 ${f(-50 - kn)} 322 ${f(-52 - kn)} 342 -47 C358 -43 366 -50 373 -64 C378 -76 392 -76 396 -63 C400 -47 401 -20 400 7`;
      U.shape(C, "drap", `M150 7 L150 ${f(-63 - b)} ${top} Z`, DRAP, { sw: 2.7 });
      U.shape(C, "revers", `M150 ${f(-63 - b)} C170 ${f(-74 - b)} 196 ${f(-71 - b)} 216 ${f(-62 - b * 0.5)} L214 ${f(-49 - b * 0.5)} C196 ${f(-59 - b)} 170 ${f(-61 - b)} 150 ${f(-50 - b)} Z`, MAT.white, { sw: 2.1 });
      const sh = 6 * ag;
      ln(g, `M${f(246 + sh)} -40 q20 9 44 2 M${f(300 - sh)} -22 q22 8 46 0 M${f(226 + sh * 0.6)} -30 q10 14 6 30`, 1.6, "#A9A9A2");
      ln(g, "M152 6 L399 6", 1.4, "#A9A9A2");
      // un bras posé sur la couverture : manche, poignet, main en moufle ; l'avant-bras se soulève quand il s'agite
      const lift = Math.max(0, ag2) * 24, El = [190, -33];
      if (blouse) { membre(C, "manche", [[134, -47], [158, -41], [176, -36]], [30, 27, 25], BLOUSE); }
      const F = el("g", { transform: `rotate(${f(-lift)} ${El[0]} ${El[1]})` }, g), CF = U.ctx(F, (o.seed || 963) + 5, false, 1);
      if (blouse) { membre(CF, "avbras", [[168, -37], [206, -33], [244, -34]], [21, 20, 17], SKIN); }
      else { membre(C, "bras", [[134, -47], [164, -40], El], [31, 28, 25], MAT.mid); membre(CF, "avbras", [[184, -34], [214, -33], [240, -34]], [25, 23, 21], MAT.mid);
        U.shape(CF, "poignet", "M236 -45 L245 -45 L245 -23 L236 -23 Z", { base: "#BDBDB7", hatch: "#77776F", gap: 3.4, fw: 1.1 }, { sw: 2 }); }
      U.shape(CF, "main", "M244 -44 C256 -48 268 -43 270 -35 C271 -27 262 -22 250 -23 L244 -24 Z", SKIN, { sw: 2.3, r: 0.6 }); ln(F, "M259 -44 q6 3 5 9", 1.3, "#A1A19B");
      const a = rad(-lift), mx = 258 - El[0], my = -34 - El[1]; main = [f(El[0] + mx * Math.cos(a) - my * Math.sin(a)), f(El[1] + mx * Math.sin(a) + my * Math.cos(a))];
    } else {
      // le bras le long du corps, main posée par terre
      membre(C, "bras", [[134, -47], [186, -30], [234, -15]], [31, 27, 23], MAT.mid);
      U.shape(C, "poignet", "M229 -28 L238 -25 L233 -5 L224 -8 Z", { base: "#BDBDB7", hatch: "#77776F", gap: 3.4, fw: 1.1 }, { sw: 2 });
      U.shape(C, "main", "M236 -25 C248 -26 258 -19 258 -11 C258 -4 250 0 240 -1 L233 -4 Z", SKIN, { sw: 2.3, r: 0.6 }); ln(g, "M250 -22 q5 4 3 10", 1.3, "#A1A19B");
      main = [246, -12];
    }
    const L = (p) => [f(HX + K * p[1]), f(HY - K * p[0])];   // point du repère « debout » → repère couché (sans le roulis)
    return { tete: [HX, HY], tempe: L(TEMPE), bouche: L([57, 39]), nez: L([66, 18]), poitrine: [176, f(-70 - b)], main, pieds: [388, -64], haut: -97 };
  };
  D.gisant.essais = [{ marque: true }, { tenue: "dehors", marque: true }, { col: "blouse", teint: 0 }, { marque: true, agite: 1, agite2: 1, souffle: 1 }, { marque: true, agite: -1, agite2: -0.6 }, { marque: true, masque: 1 }];

  /* A11 — la même tête de profil, seule, pour les gros plans (contenu d'un médaillon r 110–118). Ancrage = centre du médaillon.
   * Boucles, œil fermé, la petite marque à la tempe (près du centre), un bout d'oreiller. o.cercle 0..1 : un cercle en
   * pointillés se trace autour de la marque. Renvoie { marque, r }. */
  D.teteProfil = (g, o = {}) => {
    const k = o.k || 1.5, ce = clamp(o.cercle || 0, 0, 1), cx = 34, cy = 34, C = U.ctx(g, 967, false, 1);
    U.shape(C, "oreiller", "M-150 150 L-150 92 C-150 66 -110 58 -40 60 C40 60 150 64 150 98 L150 150 Z", MAT.white, { sw: 2.6 });
    ln(g, "M-122 96 q22 10 44 4 M-60 112 q30 8 62 2", 1.6, "#B4B4AE");
    const H = el("g", { transform: `translate(${cx} ${cy}) rotate(-90) scale(${k})` }, g);
    profilGar(H, { marque: o.marque !== false, teint: o.teint, seed: 968 });
    const mx = f(cx + k * TEMPE[1]), my = f(cy - k * TEMPE[0]), R = 25;
    if (ce > 0.01) { const a1 = -90 + 359.9 * ce, p1 = [mx + R * Math.cos(rad(a1)), my + R * Math.sin(rad(a1))];
      ln(g, `M${mx} ${my - R} A${R} ${R} 0 ${ce > 0.5 ? 1 : 0} 1 ${pt(p1)}`, 3.2, INK, { "stroke-dasharray": "7 7" }); }
    return { marque: [mx, my], r: R };
  };
  D.teteProfil.essais = [{}, { cercle: 0.6 }, { cercle: 1 }];

  /* @@SUITE@@ */

  // EXEMPLE du gabarit (encore utilisé par les scènes d'exemple de scenes-1.js ; à supprimer avec elles)
  D.exemple = (g, o = {}) => {
    const C = U.ctx(g, 611, false, 1), L = o.len || 110;
    el("path", { d: `M-40 ${L + 34} L40 ${L + 34} L240 ${L + 900} L-240 ${L + 900} Z`, fill: "#F8CE4E", opacity: 0.13 }, g);
    U.stroke(C, "fil", `M0 0 L0 ${L}`, { sw: 3 });
    U.shape(C, "abat", `M-16 ${L} L16 ${L} L46 ${L + 34} L-46 ${L + 34} Z`, MAT.grey, { sw: 2.6 });
    el("ellipse", { cx: 0, cy: L + 36, rx: 22, ry: 8, fill: "#FFF6C9", stroke: INK, "stroke-width": 2 }, g);
    return { ampoule: [0, L + 36] };
  };
})();
