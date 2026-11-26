/* decor.js — AKTE 09 « غير سكران » : décors et objets PROPRES à l'épisode, 1re partie (window.EpDecor = D).
 * Aucun dessin repris d'un autre épisode. Suite dans decor-2.js et decor-3.js. Référence : storyboard.md § 2 et § 3.
 * Essai de chaque dessin : node tools/essai_decor.mjs videos/akte-friedrichshafen-nacht [--only nom1,nom2]
 *
 * ── INVENTAIRE COMPLET (storyboard § 2) ET ÉTAT ───────────────────────────────────────────────────────────────
 * État contrôlé à la fin de l'étape « socle et décors 1 » : chaque fonction « fait » existe, dessine sans erreur
 * (tools/essai_decor.mjs) et a été vue à l'échelle réelle à côté des personnages Persona, aux places des scènes S1 à S7.
 * Les écarts avec le storyboard sont listés à la fin de storyboard.md (« Écarts de construction »).
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
   * o.fantome  0..1 (≥ 0,5 = fantôme) : cadran en pointillés, graduations grises, PAS d'aiguilles, un grand « ? » au centre
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
    if (fa) tx(g, "?", 0, 11 * k, 32 * k, { fill: "#77776F" });   // fantôme : AUCUNE aiguille (des aiguilles grises montraient encore « 3 h »)
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
    if (ce >= 0.99) el("circle", { cx: mx, cy: my, r: R, fill: "none", stroke: INK, "stroke-width": 3.2, "stroke-dasharray": "7 7" }, g);   // cercle complet (un arc fermé ne se dessine pas)
    else if (ce > 0.01) { const a1 = -90 + 359.9 * ce, p1 = [mx + R * Math.cos(rad(a1)), my + R * Math.sin(rad(a1))];
      ln(g, `M${mx} ${my - R} A${R} ${R} 0 ${ce > 0.5 ? 1 : 0} 1 ${pt(p1)}`, 3.2, INK, { "stroke-dasharray": "7 7" }); }
    return { marque: [mx, my], r: R };
  };
  D.teteProfil.essais = [{}, { cercle: 0.6 }, { cercle: 1 }];

  /* ═══════════════════════════════ B. ACCROCHE ET INTRO ═══════════════════════════════ */
  // o.part : sans o.part (ou "tout"), tout est dessiné ; avec o.part, SEULEMENT cette partie, dans le même repère
  const partie = (o, n) => !o.part || o.part === "tout" || o.part === n;
  // sol en perspective : lames (ou fuyantes) qui s'ouvrent vers le bord avant, joints transversaux décalés
  const sol = (g, C, x0, x1, y0, y1, key, mat, n) => {
    n = n || 7; const cx = (x0 + x1) / 2, k = 1.22, X = (x, y) => cx + (x - cx) * (1 + (k - 1) * (y - y0) / (y1 - y0));
    U.shape(C, key, poly([[x0, y0], [x1, y0], [X(x1, y1), y1], [X(x0, y1), y1]]), mat || BOIS, { sw: 1.6, r: 0.4 });
    for (let i = 1; i < n; i++) { const x = x0 + (x1 - x0) * i / n; ln(g, `M${f(x)} ${y0} L${f(X(x, y1))} ${y1}`, 1.5, "#9E9B90"); }
    for (let i = 0; i < n; i++) { const xa = x0 + (x1 - x0) * i / n, xb = x0 + (x1 - x0) * (i + 1) / n, y = y0 + (y1 - y0) * (0.25 + 0.5 * hsh(i * 3.3 + key.length));
      ln(g, `M${f(X(xa, y))} ${f(y)} L${f(X(xb, y))} ${f(y)}`, 1.3, "#A9A59A"); }
    ln(g, `M${x0} ${y0} L${x1} ${y0}`, 2.2, INK);
  };
  const MUR = "#F1EFE8";

  /* B1 — l'entrée de son appartement, vue de l'intérieur (S1, moitié haute). 1000 × 600.
   * Ancrage = coin bas gauche du mur, au sol (S1 : (40, 790)) : mur de −520 à 0 (élargi de 60 px de chaque côté pour ne
   * jamais laisser de papier nu au bord du cadre), parquet de 0 à +80. Porte x 66–304 ; fente à lettres y −193…−173 ;
   * patère x 724–868 (crochets x 750, 796, 842 à y −404) ; blouse x 739–853 jusqu'à −172 ; console x 730–900 (plateau à −138) ;
   * lampe (872, −138…−210), à droite de la blouse (le storyboard les superposait : la blouse cachait la lampe).
   * Parties (o.part) : "fond" · "clapet" (o.ouv 0..1 : le clapet se soulève vers nous et découvre la fente — le faire battre
   * par une oscillation amortie de ouv, c'est un battant vu de face) · "blouse" (blouse blanche + stéthoscope pendus au
   * crochet du milieu : m.sway, pivot = ancre crochet) · "halo" (halo de la lampe : faire respirer l'opacité du nœud ; à
   * poser au-dessus du fond). Ancres : fente, clapet, crochet, lampe, console, porte. */
  D.entree = (g, o = {}) => {
    const C = U.ctx(g, 1101, false, 1), HK = [796, -404];
    if (partie(o, "fond")) {
      fl(g, "M-60 -520 L1060 -520 L1060 0 L-60 0 Z", MUR);
      for (let i = 0; i < 26; i++) ln(g, `M${f(-60 + i * 7)} -520 l${f(-30 - i * 2)} ${f(40 + i * 3)}`, 1, "#D9D6CB", { opacity: 0.7 });   // pénombre de l'angle
      sol(g, C, -60, 1060, 0, 80, "parquet", BOIS, 8);
      U.shape(C, "plinthe", "M-60 -16 L1060 -16 L1060 0 L-60 0 Z", MAT.white, { sw: 1.8, r: 0.3 });
      // la porte : chambranle, battant à quatre panneaux, charnières, judas, poignée, fente à lettres
      ombre(g, rr(66, -476, 238, 476, 4), 8, 0);
      U.shape(C, "chambranle", rr(66, -476, 238, 476, 4), MAT.white, { sw: 2.8 });
      U.shape(C, "battant", rr(80, -462, 210, 462, 3), { base: "#F4F2EA" }, { sw: 2.6 });
      [[100, -440, 78, 168], [192, -440, 78, 168], [100, -158, 78, 140], [192, -158, 78, 140]].forEach(([x, y, w, h], i) => {
        U.shape(C, "panneau" + i, rr(x, y, w, h, 3), CLAIR, { sw: 2 });
        ln(g, `M${x + 7} ${y + h - 7} L${x + 7} ${y + 7} L${x + w - 7} ${y + 7}`, 1.6, "#FFFFFF"); });
      [-422, -84].forEach((y) => el("rect", { x: 77, y, width: 7, height: 30, rx: 2, fill: "#55524B" }, g));
      el("circle", { cx: 185, cy: -334, r: 9, fill: "#E1E1DC", stroke: INK, "stroke-width": 2 }, g); el("circle", { cx: 185, cy: -334, r: 3.2, fill: INK }, g);
      U.shape(C, "rosace", rr(255, -252, 16, 48, 7), MAT.grey, { sw: 2 });
      U.shape(C, "bequille", "M264 -240 L232 -238 Q225 -237 226 -231 L264 -230 Z", MAT.grey, { sw: 2.2 });
      el("rect", { x: 260.5, y: -218, width: 5, height: 9, rx: 2, fill: INK }, g);
      U.shape(C, "plaqueFente", rr(128, -201, 114, 36, 7), MAT.grey, { sw: 2.2 });
      fl(g, rr(142, -193, 86, 20, 3), "#2A2826");
      // interrupteur
      U.shape(C, "inter", rr(326, -282, 22, 34, 4), MAT.white, { sw: 2 }); el("rect", { x: 332, y: -274, width: 10, height: 16, rx: 2, fill: "#E1E1DC", stroke: INK, "stroke-width": 1.4 }, g);
      // un petit cadre au mur (collines au trait)
      ombre(g, rr(430, -440, 112, 90, 4), 5, 6);
      U.shape(C, "cadre", rr(430, -440, 112, 90, 4), BOIS, { sw: 2.4 });
      fl(g, rr(442, -428, 88, 66, 2), "#FFFFFF"); ln(g, "M446 -376 Q468 -404 490 -384 Q508 -398 526 -380", 1.8, "#55524B"); el("circle", { cx: 508, cy: -412, r: 7, fill: "none", stroke: "#55524B", "stroke-width": 1.6 }, g);
      // patère : planche + trois crochets
      ombre(g, rr(724, -420, 144, 22, 6), 5, 6);
      U.shape(C, "patere", rr(724, -420, 144, 22, 6), BOIS, { sw: 2.4 });
      [750, 796, 842].forEach((x, i) => { el("circle", { cx: x, cy: -409, r: 5, fill: "#55524B" }, g); ln(g, `M${x} -409 L${x} -398 Q${x} -390 ${x + 8} -394`, 3, INK); });
      // console : plateau, tiroir, deux pieds, tablette ; lampe à abat-jour jaune, coupelle, clés
      ombre(g, "M730 -138 L900 -138 L900 -124 L886 -124 L880 0 L868 0 L874 -98 L756 -98 L762 0 L750 0 L744 -124 L730 -124 Z", 7, 6);
      U.shape(C, "piedG", "M746 -100 L760 -100 L762 0 L750 0 Z", BOIS, { sw: 2.2 });
      U.shape(C, "piedD", "M870 -100 L884 -100 L880 0 L868 0 Z", BOIS, { sw: 2.2 });
      U.shape(C, "tablette", rr(752, -36, 126, 9, 3), BOIS, { sw: 2 });
      U.shape(C, "tiroir", rr(740, -124, 150, 26, 3), MAT.white, { sw: 2.2 }); el("circle", { cx: 815, cy: -111, r: 4, fill: "#55524B" }, g);
      U.shape(C, "plateau", rr(728, -140, 174, 16, 4), BOIS, { sw: 2.6 });
      el("ellipse", { cx: 872, cy: -141, rx: 17, ry: 5, fill: "#55524B" }, g);
      U.shape(C, "pied", "M864 -142 C858 -152 858 -166 866 -176 L878 -176 C886 -166 886 -152 880 -142 Z", MAT.grey, { sw: 2.2 });
      ln(g, "M872 -176 L872 -184", 3, INK);
      U.shape(C, "abatjour", "M849 -180 L895 -180 L885 -210 L859 -210 Z", MAT.yellow, { sw: 2.6 });
      U.shape(C, "coupelle", "M760 -146 Q772 -134 786 -146 Z", MAT.grey, { sw: 2 });
      el("circle", { cx: 801, cy: -147, r: 5, fill: "none", stroke: INK, "stroke-width": 2 }, g); ln(g, "M805 -145 L818 -143 M813 -143 l0 3 M817 -143 l0 3", 2.2, INK);
    }
    if (partie(o, "halo")) {
      el("circle", { cx: 872, cy: -196, r: 110, fill: YEL, opacity: 0.1 }, g);
      el("circle", { cx: 872, cy: -196, r: 64, fill: YEL, opacity: 0.18 }, g);
      fl(g, "M852 -178 L892 -178 L904 -140 L840 -140 Z", "#FFF6C9", { opacity: 0.55 });
    }
    if (partie(o, "blouse")) {
      const [X, Y] = HK, G = el("g", {}, g), CB = U.ctx(G, 1107, false, 1);
      const corps = `M${X - 14} ${Y + 8} L${X - 42} ${Y + 28} L${X - 45} ${Y + 232} L${X + 45} ${Y + 232} L${X + 42} ${Y + 28} L${X + 14} ${Y + 8} Q${X} ${Y + 16} ${X - 14} ${Y + 8} Z`;
      ombre(G, corps, 6, 6);
      U.shape(CB, "corps", corps, MAT.white, { sw: 2.6 });
      [-1, 1].forEach((s) => U.shape(CB, "manche" + s, `M${X + s * 42} ${Y + 28} Q${X + s * 55} ${Y + 34} ${X + s * 57} ${Y + 62} L${X + s * 57} ${Y + 192} L${X + s * 40} ${Y + 194} L${X + s * 40} ${Y + 66} Z`, MAT.white, { sw: 2.3 }));
      [-1, 1].forEach((s) => ln(G, `M${X + s * 44} ${Y + 180} L${X + s * 55} ${Y + 180}`, 1.4, "#A9A9A2"));
      ln(G, `M${X - 14} ${Y + 8} L${X - 26} ${Y + 42} L${X - 2} ${Y + 98} M${X + 14} ${Y + 8} L${X + 26} ${Y + 42} L${X + 2} ${Y + 98} M${X + 2} ${Y + 98} L${X + 3} ${Y + 232}`, 2, INK);
      [126, 166, 206].forEach((dy) => el("circle", { cx: X + 9, cy: Y + dy, r: 3.2, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, G));
      [[-36, 176], [10, 176]].forEach(([dx, dy], i) => U.shape(CB, "poche" + i, rr(X + dx, Y + dy, 26, 30, 3), MAT.white, { sw: 1.8 }));
      U.shape(CB, "pocheP", rr(X + 16, Y + 70, 20, 22, 3), MAT.white, { sw: 1.8 }); ln(G, `M${X + 22} ${Y + 72} L${X + 22} ${Y + 58}`, 3, "#55524B");
      ln(G, `M${X - 5} ${Y + 9} Q${X} ${Y - 6} ${X + 5} ${Y + 9}`, 2, INK);                                        // la boucle sur le crochet
      // stéthoscope sur les épaules : deux tubes qui pendent, le pavillon à gauche, les embouts à droite
      ln(G, `M${X - 16} ${Y + 14} C${X - 30} ${Y + 40} ${X - 26} ${Y + 80} ${X - 14} ${Y + 112}`, 3.2, "#3A3A37");
      ln(G, `M${X + 16} ${Y + 14} C${X + 28} ${Y + 34} ${X + 26} ${Y + 52} ${X + 20} ${Y + 66}`, 3.2, "#3A3A37");
      U.shape(CB, "pavillon", cercle(X - 12, Y + 122, 10), MAT.grey, { sw: 2.2 }); el("circle", { cx: X - 12, cy: Y + 122, r: 4, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.2 }, G);
      ln(G, `M${X + 20} ${Y + 66} l-6 8 M${X + 20} ${Y + 66} l7 7`, 2.4, "#3A3A37");
    }
    if (partie(o, "clapet")) {
      const u = clamp(o.ouv || 0, 0, 1), h = Math.max(3, 20 * Math.cos(rad(82 * u)));
      el("rect", { x: 142, y: -193, width: 86, height: f(h), rx: 3, fill: u > 0.05 ? "#D6D6D0" : "#E9E9E4", stroke: INK, "stroke-width": 2.2 }, g);
      if (h > 9) ln(g, `M150 ${f(-193 + h * 0.45)} L220 ${f(-193 + h * 0.45)}`, 1.2, "#A1A19B");
    }
    return { fente: [185, -183], clapet: [185, -193], crochet: HK, lampe: [872, -196], console: [815, -140], porte: [80, 290] };
  };
  D.entree.essais = [{}, { part: "clapet", ouv: 0.7 }, { part: "blouse" }];

  /* B2 — le Strafbefehl, feuille vue de face. Ancrage = centre. 300 × 360 (o.petit : 150 × 190, titre + montant seulement).
   * En-tête « Amtsgericht » (Kalam 22), « STRAFBEFEHL » (Kalam 40, espacé), quatre lignes grises, « Geldstrafe: » (24),
   * « 41.250 € » (Kalam 72), un pli au tiers, un cachet rond VIDE (en haut à droite : le bas est la place de « Einspruch »).
   * o.souligne 0..1 : trait de soulignement à main levée sous le montant
   * o.plume    0..1 : « Einspruch » s'écrit À LA MAIN, à l'encre, en travers du bas (Kalam 56, −9°), goutte au bout du « h »
   *            (pas de tampon : le tampon « EINSPRUCH » appartient à AKTE 08)
   * o.montant  false : le montant n'est pas dessiné (S20 : D.encreMontant le dessine à part, centre = ancre montant)
   * Ancres : titre, montant, plume, goutte. */
  D.lettre = (g, o = {}) => {
    const pe = !!o.petit, W = pe ? 150 : 300, H = pe ? 190 : 360, x0 = -W / 2, y0 = -H / 2, C = U.ctx(g, pe ? 1122 : 1121, false, 1);
    const sou = clamp(o.souligne || 0, 0, 1), pl = clamp(o.plume || 0, 0, 1), mont = o.montant !== false;
    ombre(g, rr(x0, y0, W, H, 6), 7, 9);
    U.shape(C, "feuille", rr(x0, y0, W, H, 6), MAT.white, { sw: 2.8, r: 0.6 });
    const yp = f(y0 + H / 3); fl(g, `M${x0 + 2} ${yp} L${-x0 - 2} ${yp} L${-x0 - 2} ${f(yp + 7)} L${x0 + 2} ${f(yp + 7)} Z`, "#F0F0EA"); ln(g, `M${x0 + 3} ${yp} L${-x0 - 3} ${f(yp + 1)}`, 1.2, "#BDBDB6");
    let mY, plY, plS;
    if (!pe) {
      tx(g, "Amtsgericht", x0 + 20, y0 + 32, 22, { anchor: "start", fill: "#55524B" });
      ln(g, `M${x0 + 20} ${y0 + 42} L${-x0 - 20} ${y0 + 42}`, 1.4, "#BDBDB6");
      tx(g, "STRAFBEFEHL", 0, y0 + 86, 40, { ls: 1.5 });
      [0.92, 0.7, 0.86, 0.5].forEach((k, i) => ln(g, `M${x0 + 20} ${-52 + i * 10} L${f(x0 + 20 + (W - 40) * k)} ${-52 + i * 10}`, 2.4, "#D2D2CB"));
      tx(g, "Geldstrafe:", x0 + 20, 10, 24, { anchor: "start" });
      mY = 47; plY = 136; plS = 56;
      if (mont) tx(g, "41.250 €", 0, 72, 72);
      if (sou > 0.01) ln(g, `M${x0 + 16} 86 C-60 81 60 92 ${-x0 - 14} 83`, 4.2, INK, { "stroke-dasharray": `${f(300 * sou)} 400` });
      // cachet rond, vide (en haut à droite : le bas de la feuille est la place de « Einspruch »)
      el("circle", { cx: 116, cy: -150, r: 18, fill: "none", stroke: "#A9A9A2", "stroke-width": 2 }, g);
      el("circle", { cx: 116, cy: -150, r: 13, fill: "none", stroke: "#C9C9C3", "stroke-width": 1.4, "stroke-dasharray": "3 4" }, g);
    } else {
      tx(g, "STRAFBEFEHL", 0, y0 + 30, 18, { ls: 1 });
      [0.9, 0.62].forEach((k, i) => ln(g, `M${x0 + 14} ${y0 + 44 + i * 9} L${f(x0 + 14 + (W - 28) * k)} ${y0 + 44 + i * 9}`, 2.2, "#D2D2CB"));
      mY = 25; plY = 68; plS = 25;
      if (mont) tx(g, "41.250 €", 0, 36, 30);
    }
    let goutte = null;
    if (pl > 0.005) {
      const G = el("g", { transform: `translate(0 ${plY}) rotate(-9)` }, g), tw = larg("Einspruch", plS), id = uid("plume");
      const cp = el("clipPath", { id }, G); el("rect", { x: f(-tw / 2 - 10), y: -plS, width: f((tw + 24) * pl), height: plS * 2 }, cp);
      const T = tx(el("g", { "clip-path": `url(#${id})` }, G), "Einspruch", 0, f(plS * 0.34), plS); T.setAttribute("stroke", INK); T.setAttribute("stroke-width", f(plS / 60));
      const gx = f(tw / 2 - plS * 0.06), gy = f(plS * 0.36);
      if (pl > 0.97) { fl(G, `M${gx - 3} ${gy - 4} C${gx - 3} ${gy + 4} ${gx - 5} ${gy + 8} ${gx} ${gy + 12} C${gx + 5} ${gy + 8} ${gx + 3} ${gy + 4} ${gx + 3} ${gy - 4} Z`, INK); el("circle", { cx: gx, cy: gy + 11, r: f(plS / 14), fill: INK }, G); }
      const a = rad(-9); goutte = [f(gx * Math.cos(a) - (gy + 11) * Math.sin(a)), f(plY + gx * Math.sin(a) + (gy + 11) * Math.cos(a))];
    }
    return { titre: [0, pe ? y0 + 24 : y0 + 72], montant: [0, mY], plume: [0, plY], goutte, w: W, h: H };
  };
  D.lettre.essais = [{}, { souligne: 1, plume: 1 }, { plume: 0.5 }, { petit: true, plume: 1 }, { petit: true, plume: 1, montant: false }];

  /* B3 — un coin de salle d'audience (S1 et S2, moitié basse). 1000 × 600. Ancrage = coin haut gauche, sous la ligne
   * (S1 : (40, 870)). Mur 0…280, lambris 280…510, parquet 510…600 ; dossier du fauteuil de la juge x 708–832, y 168–318 (derrière
   * elle) ; estrade x 580–865, y 450–510 ; pupitre x 588–870 (dessus à 302), façade jusqu'à 450 ; lampe (630, 262–302) ;
   * micro (722, 302) ; dossier (780, 296).
   * Parties : "fond" (mur, lambris, parquet, fauteuil) · "rayon" (rayon de lumière d'une fenêtre hors champ ; o.dx : glissement,
   * 0 → 12 en 6 s) · "pupitre" (estrade + pupitre + lampe + micro + dossier : DEVANT la juge) · "halo" (lampe du pupitre).
   * Ordre : fond, rayon, [la juge], pupitre, halo. Ancres : pupitre, lampe, micro, sol, rayon (boîte de la poussière). */
  D.pretoireCoin = (g, o = {}) => {
    const C = U.ctx(g, 1131, false, 1);
    if (partie(o, "fond")) {
      fl(g, "M-60 0 L1060 0 L1060 290 L-60 290 Z", "#EFEFEA");
      ln(g, "M-60 34 L1060 34 M-60 40 L1060 40", 1.6, "#C9C9C1");                                              // cimaise
      U.shape(C, "lambris", "M-60 280 L1060 280 L1060 512 L-60 512 Z", BOIS, { sw: 2.2, r: 0.4 });
      for (let x = -60, i = 0; x < 1060; x += 125, i++) { U.shape(C, "pann" + i, rr(x + 14, 306, 97, 186, 3), { base: "#EFEFE9", hatch: "#BDBDB5", gap: 9, fw: 1 }, { sw: 1.8, r: 0.5 });
        ln(g, `M${x + 20} 486 L${x + 20} 312 L${x + 105} 312`, 1.4, "#FFFFFF"); }
      U.shape(C, "lisse", rr(-60, 276, 1120, 14, 3), MAT.white, { sw: 2.2, r: 0.4 });
      sol(g, C, -60, 1060, 512, 600, "parquetS", { base: "#E5E2D8", hatch: "#ABA89E", gap: 8, fw: 1 }, 9);
      // le dossier du fauteuil de la juge
      ombre(g, rr(708, 168, 124, 150, 22), 6, 6);
      U.shape(C, "fauteuil", rr(708, 168, 124, 150, 22), BOIS, { sw: 2.6 });
      U.shape(C, "garniture", rr(722, 182, 96, 122, 16), MAT.grey, { sw: 2 });
      [[740, 200], [800, 200], [740, 286], [800, 286], [770, 243]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 2.6, fill: "#55524B" }, g));
    }
    if (partie(o, "rayon")) {
      const dx = o.dx || 0, P = (x, y) => [x + dx, y];
      fl(g, poly([P(80, 10), P(230, 10), P(540, 510), P(390, 510)]), "#FFFFFF", { opacity: 0.5 });
      fl(g, poly([P(390, 512), P(540, 512), P(600, 600), P(432, 600)]), "#FFFFFF", { opacity: 0.45 });
      ln(g, `M${f(130 + dx)} 10 L${f(440 + dx)} 510 M${f(180 + dx)} 10 L${f(490 + dx)} 510`, 3, "#D8D8D0", { opacity: 0.45 });   // l'ombre des montants de la fenêtre
    }
    if (partie(o, "pupitre")) {
      ombre(g, "M580 450 L865 450 L865 510 L580 510 Z", 6, 0);
      U.shape(C, "estrade", rr(580, 450, 285, 60, 3), BOIS, { sw: 2.6 });
      ln(g, "M584 458 L861 458", 1.6, "#FFFFFF");
      ombre(g, rr(600, 316, 260, 134, 3), 7, 6);
      U.shape(C, "facade", rr(600, 316, 260, 134, 3), BOIS, { sw: 2.6 });
      [[612, 330], [696, 330], [780, 330]].forEach(([x, y], i) => { U.shape(C, "pp" + i, rr(x, y, 72, 106, 3), { base: "#EFEFE9", hatch: "#BDBDB5", gap: 9, fw: 1 }, { sw: 1.8, r: 0.5 }); ln(g, `M${x + 6} ${y + 100} L${x + 6} ${y + 6} L${x + 66} ${y + 6}`, 1.4, "#FFFFFF"); });
      U.shape(C, "dessus", rr(588, 302, 282, 16, 4), { base: "#D9D9D2", hatch: "#8A8A84", gap: 5, fw: 1.2 }, { sw: 2.6 });
      // lampe de bureau (pied, tige, abat-jour jaune)
      el("ellipse", { cx: 630, cy: 302, rx: 20, ry: 5, fill: "#55524B" }, g);
      ln(g, "M630 300 L630 284", 4, INK);
      U.shape(C, "abat", "M600 288 L660 288 L652 270 L608 270 Z", MAT.yellow, { sw: 2.4 });
      // micro col-de-cygne
      el("ellipse", { cx: 722, cy: 302, rx: 13, ry: 4, fill: "#3A3A37" }, g);
      ln(g, "M722 300 C722 278 714 266 698 264", 3.4, INK);
      U.shape(C, "micro", rr(682, 258, 18, 12, 5), MAT.mid, { sw: 1.8 });
      // le dossier fermé, avec son élastique
      U.shape(C, "dossier", rr(744, 292, 76, 10, 2), MAT.white, { sw: 2 });
      ln(g, "M748 296 L816 296 M748 299 L816 299", 1, "#A9A9A2"); ln(g, "M786 291 L786 303", 2.2, "#55524B");
    }
    if (partie(o, "halo")) { el("ellipse", { cx: 630, cy: 300, rx: 78, ry: 24, fill: YEL, opacity: 0.22 }, g); el("circle", { cx: 630, cy: 282, r: 52, fill: YEL, opacity: 0.12 }, g); }
    return { pupitre: [729, 302], lampe: [630, 282], micro: [690, 264], sol: 510, estrade: 450, rayon: { x: 90, y: 30, w: 300, h: 470 } };
  };
  D.pretoireCoin.essais = [{}, { part: "pupitre" }];

  /* B4 — LE SURSIS : une grille dont les 5 barreaux et la traverse sont en POINTILLÉS (tirets 14 / 12, encre 6 px), le cadre en
   * trait continu fin : on voit à travers, elle n'enferme pas. Ancrage = bas du montant gauche. o.w × o.h : 230 × 370 (S1) ou
   * 260 × 430 (S24). o.plaque : texte de la plaque accrochée au-dessus (défaut « 15 Monate » ; null = sans, comme en S1 où
   * « 15 Monate » est écrit en grand par la scène). o.dash : décalage des tirets en px (12 px/s : ils défilent, la grille n'est
   * jamais « fermée »). o.trou [x, y, r] (repère de la grille fermée) : les tirets s'écartent de 10 px autour de la main qui passe.
   * o.ouv 0..1 : la grille s'ouvre comme un portillon autour de son montant gauche (vue en perspective, jusqu'à 70°).
   * Ancres : haut (haut du montant gauche), libre (milieu du bord libre), plaque. */
  D.grillePointillee = (g, o = {}) => {
    const w = o.w || 230, h = o.h || 370, u = clamp(o.ouv || 0, 0, 1), ph = rad(70 * u), dash = (((o.dash || 0) % 26) + 26) % 26;
    const plaque = o.plaque === undefined ? "15 Monate" : o.plaque, trou = o.trou || null, sn = Math.sin(ph), cs = Math.cos(ph);
    const Pp = (x, y) => { const k = x / w; return [x * cs, y * (1 + 0.16 * k * sn) + 12 * k * sn]; };
    const tirets = (a, b) => { const L = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L; let d = "";
      const st = trou ? (trou[0] - a[0]) * ux + (trou[1] - a[1]) * uy : 0;
      for (let s = -26 + dash; s < L; s += 26) { let s0 = Math.max(0, s), s1 = Math.min(L, s + 14); if (s1 - s0 < 2) continue;
        if (trou) { const m = (s0 + s1) / 2, dd = Math.hypot(a[0] + ux * m - trou[0], a[1] + uy * m - trou[1]), r = trou[2] || 40;
          if (dd < r) { const sh = 10 * (1 - dd / r) * (m >= st ? 1 : -1); s0 = clamp(s0 + sh, 0, L); s1 = clamp(s1 + sh, 0, L); } }
        d += `M${pt(Pp(a[0] + ux * s0, a[1] + uy * s0))} L${pt(Pp(a[0] + ux * s1, a[1] + uy * s1))} `; }
      return d; };
    let dB = ""; for (let i = 1; i <= 5; i++) { const x = w * i / 6; dB += tirets([x, -h + 4], [x, -4]); }
    dB += tirets([6, -h * 0.52], [w - 6, -h * 0.52]);
    const cadre = poly([Pp(0, 0), Pp(w, 0), Pp(w, -h), Pp(0, -h)]);
    ln(g, cadre, 3.2, OMB, { transform: "translate(5 6)" }); ln(g, dB, 6, OMB, { transform: "translate(5 6)" });
    ln(g, cadre, 3, INK);
    ln(g, dB, 6, INK, { "stroke-linecap": "round" });
    [[-h * 0.82], [-h * 0.18]].forEach(([y]) => el("rect", { x: -5, y: f(y - 12), width: 9, height: 24, rx: 3, fill: "#55524B", stroke: INK, "stroke-width": 1.4 }, g));
    let pq = null;
    if (plaque) {
      const top = Pp(w / 2, -h), pw = Math.max(150, Math.round(larg(plaque, 34) + 34)), G = el("g", { transform: `translate(${pt(top)}) scale(${f(Math.max(0.78, cs))} 1)` }, g), CP = U.ctx(G, 1141, false, 1);
      ln(G, `M${-pw / 2 + 18} -48 L-34 -2 M${pw / 2 - 18} -48 L34 -2`, 1.8, "#55524B");
      ombre(G, rr(-pw / 2, -96, pw, 48, 9), 5, 6);
      U.shape(CP, "plaque", rr(-pw / 2, -96, pw, 48, 9), MAT.white, { sw: 2.6, r: 0.5 });
      tx(G, plaque, 0, -60, 34); pq = [top[0], top[1] - 72];
    }
    return { haut: Pp(0, -h), libre: Pp(w, -h / 2), plaque: pq, w, h };
  };
  D.grillePointillee.essais = [{ plaque: null }, {}, { trou: [115, -200, 44], plaque: null }, { w: 260, h: 430, ouv: 0.5 }, { w: 260, h: 430, ouv: 1 }];

  /* B5 — la feuille « Rat vom Kollegen » (bloc-notes) : « Rat vom Kollegen » (Kalam 26) et « سولات طبيب » (Plex gras 34),
   * coin corné. Ancrage = centre ; 190 × 150 (élargie au texte : ≈ 230 × 150).
   * o.dechire 0..1 : elle se déchire en deux moitiés dentelées qui s'écartent et tournent (± 14°). */
  D.feuilleRat = (g, o = {}) => {
    const de = "Rat vom Kollegen", a = "سولات طبيب", w = Math.max(190, Math.round(larg(de, 26) + 34)), h = 150, X = w / 2, Y = h / 2, dch = clamp(o.dechire || 0, 0, 1);
    const dessin = (G) => {
      const C = U.ctx(G, 1151, false, 1), d = `M${-X} ${-Y + 6} L${X} ${-Y + 6} L${X} ${Y - 22} L${X - 22} ${Y} L${-X} ${Y} Z`;
      ombre(G, d, 5, 7);
      U.shape(C, "rat", d, MAT.white, { sw: 2.6, r: 0.6 });
      for (let x = -X + 12; x < X - 6; x += 15) el("circle", { cx: x, cy: -Y + 14, r: 2.4, fill: "#D2D2CB" }, G);
      [-Y + 74, -Y + 130].forEach((y) => ln(G, `M${-X + 12} ${y} L${X - 14} ${y}`, 1.2, "#DADAD4"));
      tx(G, de, 0, -Y + 62, 26);
      ar(G, a, 0, -Y + 120, 34);
      U.shape(C, "corne", `M${X} ${Y - 22} L${X - 22} ${Y} L${X - 18} ${Y - 18} Z`, { base: "#E6E6E0" }, { sw: 2, r: 0.4 });
    };
    if (dch < 0.01) { dessin(g); return { w, h }; }
    const zig = [[4, -Y - 4], [-6, -Y + 14], [7, -Y + 32], [-5, -Y + 52], [6, -Y + 72], [-6, -Y + 92], [5, -Y + 112], [-4, -Y + 132], [3, Y + 4]];
    [[-1, [[-X - 30, -Y - 30]].concat(zig, [[-X - 30, Y + 30]])], [1, [[X + 30, -Y - 30]].concat(zig, [[X + 30, Y + 30]])]].forEach(([s, pts]) => {
      const G = el("g", { transform: `translate(${f(s * 26 * dch)} ${f(12 * dch)}) rotate(${f(s * 14 * dch)} ${f(s * X / 2)} 0)` }, g);
      dessin(clipPoly(G, pts)); ln(G, poly(zig, false), 1.4, "#A9A9A2");
    });
    return { w, h };
  };
  D.feuilleRat.essais = [{}, { dechire: 0.4 }, { dechire: 1 }];

  /* B6 — couloir des urgences, la nuit (S2, moitié haute). 1000 × 600. Ancrage = coin bas gauche, au sol (S2 : (40, 790)) :
   * mur de −520 à 0 (#EEF0EC, élargi de 60 px de chaque côté), bande de protection −182…−164, sol 0…80 ; porte battante
   * x 80–210, y −390…0 (hublot (145, −290)) ; panneau « Notaufnahme » x 110–290, y −460…−414, pendu au plafond ; applique
   * (460, −350) ; deux plafonniers (x 250 et 860, y −520…−506 : jamais derrière la pastille A).
   * o.nu : le mur et le sol seuls, mur de −1200 à 0 (fond des scènes de la règle, S26–S28 : ancrage (40, 1300)).
   * Parties : "fond" · "porte" (le battant : oscille de 2°, pivot = ancre porte) · "panneau" (m.pend, pivot = ancre panneau) ·
   * "halos" (applique, hublot, plafonniers : faire respirer l'opacité 0,86–1 ; À POSER APRÈS la porte). */
  D.couloirNuit = (g, o = {}) => {
    const nu = !!o.nu, H = nu ? 1200 : 520, C = U.ctx(g, 1161, false, 1);
    if (partie(o, "fond")) {
      fl(g, `M-60 ${-H} L1060 ${-H} L1060 0 L-60 0 Z`, "#EEF0EC");
      for (let i = 0; i < 9; i++) ln(g, `M${-60 + i * 140} ${-H} L${-60 + i * 140} -182`, 1, "#DDE0DA");                     // joints des panneaux muraux
      sol(g, C, -60, 1060, 0, 80, "solC", { base: "#E3E5DF", hatch: "#B4B7AE", gap: 10, fw: 1 }, 9);
      U.shape(C, "bande", "M-60 -182 L1060 -182 L1060 -164 L-60 -164 Z", MAT.grey, { sw: 2.2, r: 0.4 });
      ln(g, "M-60 -177 L1060 -177", 1.2, "#FFFFFF", { opacity: 0.8 });
      fl(g, "M-60 -11 L1060 -11 L1060 0 L-60 0 Z", "#D2D4CC"); ln(g, "M-60 -11 L1060 -11", 1.4, "#8A8A84");
      if (!nu) {
        ombre(g, rr(70, -398, 150, 398, 3), 7, 0);
        U.shape(C, "huisserie", rr(70, -398, 150, 398, 3), MAT.grey, { sw: 2.6 });
        fl(g, rr(80, -390, 130, 390, 2), "#3A3A37", { opacity: 0.35 });
        [250, 860].forEach((x, i) => { U.shape(C, "plaf" + i, rr(x - 46, -520, 92, 14, 4), MAT.white, { sw: 2.2 }); fl(g, rr(x - 40, -508, 80, 3, 1.5), "#FFF6C9"); });
        U.shape(C, "applique", "M440 -372 L480 -372 Q488 -350 480 -330 L440 -330 Q432 -350 440 -372 Z", MAT.white, { sw: 2.2 });
        ln(g, "M444 -362 L476 -362 M444 -340 L476 -340", 1.2, "#C9C9C1");
        U.shape(C, "inter", rr(232, -262, 18, 28, 3), MAT.white, { sw: 2 }); el("rect", { x: 237, y: -255, width: 8, height: 13, rx: 2, fill: "#E1E1DC", stroke: INK, "stroke-width": 1.2 }, g);
        U.shape(C, "prise", rr(560, -150, 30, 22, 4), MAT.white, { sw: 1.8 }); [568, 582].forEach((x) => el("circle", { cx: x, cy: -139, r: 2.4, fill: INK }, g));
      }
    }
    if (!nu && partie(o, "porte")) {
      const G = el("g", {}, g), CP = U.ctx(G, 1163, false, 1);
      U.shape(CP, "battant", rr(80, -390, 130, 390, 2), { base: "#F6F6F2" }, { sw: 2.6 });
      U.shape(CP, "plinthe", rr(84, -58, 122, 50, 3), MAT.grey, { sw: 2 });
      el("circle", { cx: 145, cy: -290, r: 31, fill: "#E1E1DC", stroke: INK, "stroke-width": 2.6 }, G);
      el("circle", { cx: 145, cy: -290, r: 24, fill: "#FFF3C4", stroke: INK, "stroke-width": 2 }, G);
      ln(G, "M131 -298 L143 -310 M134 -286 L154 -306", 2, "#FFFFFF");
      U.shape(CP, "pousse", rr(184, -236, 12, 64, 4), MAT.grey, { sw: 2 });
    }
    if (!nu && partie(o, "panneau")) {
      const G = el("g", {}, g), CP = U.ctx(G, 1165, false, 1);
      ln(G, "M150 -520 L156 -460 M290 -520 L284 -460", 1.8, "#55524B");
      ombre(G, rr(110, -460, 180, 46, 8), 5, 6);
      U.shape(CP, "plaque", rr(110, -460, 180, 46, 8), MAT.white, { sw: 2.6, r: 0.5 });
      tx(G, "Notaufnahme", 200, -428, 26);
    }
    if (!nu && partie(o, "halos")) {
      el("circle", { cx: 460, cy: -350, r: 64, fill: YEL, opacity: 0.16 }, g); el("circle", { cx: 460, cy: -350, r: 34, fill: YEL, opacity: 0.22 }, g);
      el("circle", { cx: 145, cy: -290, r: 44, fill: "#FFF6C9", opacity: 0.45 }, g);
      [250, 860].forEach((x) => el("ellipse", { cx: x, cy: -498, rx: 74, ry: 16, fill: "#FFF6C9", opacity: 0.6 }, g));
    }
    return { porte: [80, -390], panneau: [220, -520], applique: [460, -350], hublot: [145, -290], H };
  };
  D.couloirNuit.essais = [{}, { nu: true }, { part: "panneau" }];

  /* B7 — le polaroïd de l'intro (S3). Ancrage = centre du carton (480 × 580), dessin incliné de o.rot (−3°).
   * Fenêtre 420 × 420 (fond hachuré clair) ; la photo o.photo (défaut « assets/portrait.png », chemin relatif à index.html)
   * découpée en rond r 186 au centre (0, −50) ; ANNEAU JAUNE r 186 → 204 ; badge Instagram dessiné (92 px) en (150, 100) ;
   * deux bouts de scotch gris translucide (110 × 38) sur les coins du haut, à ± 35°. o.scotch 0..1 : le coin du scotch droit se
   * soulève (2 px). La marge du bas (y 160…290) reste vide : « Yassine » y est écrit par la scène (centre (0, 242)).
   * Ancres (repère non tourné) : photo, r, badge, nom, scotchs, pivot (milieu du bord haut, pour m.pend). */
  D.polaroid = (g, o = {}) => {
    const rot = o.rot == null ? -3 : o.rot, sc = clamp(o.scotch || 0, 0, 1), G = el("g", { transform: `rotate(${rot})` }, g), C = U.ctx(G, 1171, false, 1);
    ombre(G, rr(-240, -290, 480, 580, 8), 9, 12);
    U.shape(C, "carton", rr(-240, -290, 480, 580, 8), { base: "#FFFFFF", hatch: "#ECECE6", gap: 13, fw: 0.8 }, { sw: 3, r: 0.6 });
    U.shape(C, "fenetre", rr(-210, -260, 420, 420, 2), { base: "#E8E8E2", hatch: "#C4C4BD", gap: 7, fw: 1 }, { sw: 2.4, r: 0.4 });
    el("circle", { cx: 7, cy: -41, r: 206, fill: "#A9A9A2", opacity: 0.45 }, G);
    const cg = clipRond(G, 186, 0, -50);
    fl(cg, cercle(0, -50, 186), "#DADAD4");
    el("circle", { cx: 0, cy: -96, r: 66, fill: "#C4C4BD" }, cg); el("ellipse", { cx: 0, cy: 106, rx: 150, ry: 118, fill: "#C4C4BD" }, cg);   // buste de remplacement (sous la photo)
    el("image", { href: o.photo || "assets/portrait.png", x: -186, y: -236, width: 372, height: 372, preserveAspectRatio: "xMidYMid slice" }, cg);
    fl(G, `${cercle(0, -50, 204)} ${cercle(0, -50, 186)}`, YEL, { "fill-rule": "evenodd" });
    for (let i = 0; i < 36; i++) { const a = i * 10, p = (r) => [r * Math.cos(rad(a)), -50 + r * Math.sin(rad(a))], q = (r) => [r * Math.cos(rad(a + 6)), -50 + r * Math.sin(rad(a + 6))]; ln(G, `M${pt(p(188))} L${pt(q(202))}`, 1.2, "#E3AE2C"); }
    U.stroke(C, "anneauE", cercle(0, -50, 204), { sw: 3.4, r: 0.5 }); U.stroke(C, "anneauI", cercle(0, -50, 186), { sw: 4.6, r: 0.5 });
    ln(G, "M-150 -188 C-110 -228 -40 -246 24 -240", 3.4, "#FFFFFF", { opacity: 0.9 });
    const ig = el("g", { transform: "translate(150 100)" }, G), I = U.ctx(ig, 1172, false, 1);
    ombre(ig, rr(-46, -46, 92, 92, 26), 5, 6);
    U.shape(I, "sq", rr(-46, -46, 92, 92, 26), MAT.white, { sw: 4.2 });
    U.shape(I, "c", cercle(0, 0, 19), MAT.yellow, { sw: 4.2 });
    el("circle", { cx: 25, cy: -25, r: 6, fill: INK }, ig);
    const scotch = (x, y, r, lift, key) => { const T = el("g", { transform: `translate(${x} ${y}) rotate(${r})` }, G);
      const d = "M-55 -19 L55 -19 L51 -12 L55 -6 L51 1 L55 7 L51 13 L55 19 L-55 19 L-51 12 L-55 6 L-51 -1 L-55 -7 L-51 -13 Z";
      fl(T, d, "#C9C9C1", { opacity: 0.62 }); ln(T, d, 1.3, "#8A8A84", { opacity: 0.8 });
      ln(T, "M-44 -10 L30 -10 M-38 4 L44 4", 1.2, "#FFFFFF", { opacity: 0.7 });
      if (lift > 0.02) { const k = 4 + 10 * lift; fl(T, `M55 ${f(19 - k)} L55 19 L${f(55 - k)} 19 Z`, "#E1E1DC", { stroke: "#8A8A84", "stroke-width": 1.2, transform: `translate(${f(2 * lift)} ${f(-2 * lift)})` }); } };
    scotch(-195, -278, -35, 0); scotch(195, -278, 35, sc);
    return { photo: [0, -50], r: 186, badge: [150, 100], nom: [0, 242], scotchs: [[-195, -278], [195, -278]], pivot: [0, -290] };
  };
  D.polaroid.essais = [{ photo: "../../assets/portrait.png" }, { scotch: 1, rot: 0 }];   // essai : chemin vu depuis out/essais/

  /* ═══════════════════════════════ C. CARTES, PRESSE ═══════════════════════════════ */
  // contour simplifié du Bodensee (storyboard, annexe F) et projection du cartouche (coin haut gauche du cartouche = (0,0) ;
  // à l'écran, S4 / S17 : cartouche en (110, 690) → Friedrichshafen (580, 994), Tettnang (690, 970), Ravensburg (713, 802))
  const LAC = [[9.75, 47.505], [9.75, 47.53], [9.68, 47.545], [9.63, 47.57], [9.60, 47.585], [9.54, 47.595], [9.52, 47.62], [9.48, 47.65], [9.42, 47.66], [9.36, 47.665],
    [9.32, 47.675], [9.27, 47.69], [9.23, 47.72], [9.16, 47.765], [9.09, 47.795], [9.05, 47.815], [9.03, 47.80], [9.08, 47.77], [9.13, 47.745], [9.16, 47.725], [9.19, 47.705],
    [9.21, 47.685], [9.21, 47.665], [9.19, 47.65], [9.24, 47.63], [9.29, 47.605], [9.38, 47.565], [9.43, 47.515], [9.49, 47.48], [9.56, 47.49], [9.61, 47.52], [9.65, 47.51], [9.69, 47.495]];
  const geoLac = (lon, lat) => [f(390 + (lon - 9.40) * 0.674 * 1500), f(310 - (lat - 47.65) * 1500)];
  const lisse = (pts) => { const n = pts.length, m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; let d = "M" + pt(m(pts[0], pts[1]));
    for (let i = 1; i <= n; i++) d += ` Q${pt(pts[i % n])} ${pt(m(pts[i % n], pts[(i + 1) % n]))}`; return d + " Z"; };
  const LAC_PTS = LAC.map((p) => geoLac(p[0], p[1])), LAC_D = lisse(LAC_PTS);
  const VILLES = { F: geoLac(9.479, 47.654), T: geoLac(9.588, 47.670), R: geoLac(9.611, 47.782) };
  const vague = (x, y, s) => `M${f(x - 16 * s)} ${f(y)} q${f(5 * s)} ${f(-6 * s)} ${f(10 * s)} 0 t${f(10 * s)} 0 t${f(10 * s)} 0`;

  /* C1 — LE BODENSEE dans un cartouche (795 × 650, coins ronds, bord d'encre 4 px, fond #FBFBF6). Ancrage = coin haut gauche du
   * cartouche. Le lac (aplat #E9EEF0, contour lissé des 33 points de l'annexe F), hachure légère des rives, petites montagnes au
   * sud, trois villes (points gris r 7, noms Kalam 24 ; Friedrichshafen : point seul, son nom est une pastille de la scène).
   * Parties : "cadre" (cartouche + montagnes) · "lac" (eau, rives, contour ; à révéler par wipe) · "vagues" (o.ph 0..1 : six
   * vagues qui dérivent de 26 px dans le lac — ph = (t × 14 / 26) mod 1, arrondi au 1/20) · "nom" (« Bodensee » Kalam 40 +
   * « بحيرة » Plex gras 34, sur l'eau) · "villes" (o.villes : liste parmi "F", "T", "R" — défaut les trois ; o.actif = { tett, rav } :
   * encre + halo jaune ; o.nomF : écrire aussi « Friedrichshafen ») · "route" (o.route 0..1 : pointillé Friedrichshafen →
   * Ravensburg, tirets 4/12, un point en tête). Ancres : F, T, R, voilier (sur l'eau), nom, routeTete, geo(lon, lat). */
  D.carteLac = (g, o = {}) => {
    const C = U.ctx(g, 1201, false, 1), W = 795, H = 650, { F, T, R } = VILLES;
    if (partie(o, "cadre")) {
      ombre(g, rr(0, 0, W, H, 22), 8, 10);
      U.shape(C, "cartouche", rr(0, 0, W, H, 22), { base: "#FBFBF6" }, { sw: 4, r: 0.5 });
      // la terre : pointillé très léger + petites montagnes au sud
      for (let i = 0; i < 70; i++) { const x = 24 + 750 * hsh(i * 2.7), y = 24 + 600 * hsh(i * 5.3 + 1); el("circle", { cx: f(x), cy: f(y), r: 1.4, fill: "#D2D2CB" }, g); }
      [[300, 26, 14], [352, 34, 18], [410, 30, 16], [470, 42, 22], [536, 36, 20], [598, 46, 24], [664, 38, 20], [724, 30, 16]].forEach(([x, hP, w], i) => {
        const y = 630, d = `M${x - w * 1.6} ${y} L${x} ${y - hP} L${x + w * 1.6} ${y}`;
        fl(g, d + " Z", "#F1F1EC"); ln(g, d, 2.2, "#55524B");
        for (let k = 1; k < 5; k++) ln(g, `M${f(x + k * 4)} ${f(y - hP + k * 7)} l${f(w * 0.4)} ${f(hP * 0.22)}`, 1.1, "#A1A19B");
        if (hP > 33) ln(g, `M${f(x - 6)} ${f(y - hP + 8)} L${x} ${f(y - hP)} L${f(x + 6)} ${f(y - hP + 8)}`, 3, "#FFFFFF"); });
      ln(g, "M40 634 q30 -14 60 0 t60 0 t60 0", 1.8, "#77776F");
    }
    if (partie(o, "lac")) {
      // rives : petites hachures côté terre
      for (let i = 0; i < LAC_PTS.length; i++) { const a = LAC_PTS[i], b = LAC_PTS[(i + 1) % LAC_PTS.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L / 20));
        let nx = (b[1] - a[1]) / L, ny = -(b[0] - a[0]) / L; for (let k = 0; k < n; k++) { const x = a[0] + (b[0] - a[0]) * (k + 0.5) / n, y = a[1] + (b[1] - a[1]) * (k + 0.5) / n;
          ln(g, `M${f(x - nx * 6)} ${f(y - ny * 6)} l${f(-nx * 9 + 3)} ${f(-ny * 9 - 3)}`, 1.2, "#B9B9B3"); } }
      fl(g, LAC_D, "#E9EEF0");
      U.stroke(C, "rive", LAC_D, { sw: 3.5, r: 0.5 });
      ln(g, lisse(LAC_PTS.map(([x, y]) => [x + (390 - x) * 0.03, y + (330 - y) * 0.03])), 1.2, "#C4CBCE");
    }
    if (partie(o, "vagues")) {
      const ph = o.ph || 0, id = uid("lac"), cp = el("clipPath", { id }, g); el("path", { d: LAC_D }, cp);
      const G = el("g", { "clip-path": `url(#${id})` }, g);
      [[115, 165], [175, 210], [320, 318], [380, 362], [455, 352], [620, 468]].forEach(([x, y], i) => { const u = (ph + i * 0.37) % 1;
        ln(G, vague(x - 13 + 26 * u, y, 1.15), 2.4, "#77776F", { opacity: f(Math.sin(u * Math.PI) * 0.9) }); });
    }
    if (partie(o, "nom")) { tx(g, "Bodensee", 480, 440, 40, { halo: "#E9EEF0", hw: 6 }); ar(g, "بحيرة", 480, 486, 34, { halo: "#E9EEF0", hw: 6 }); }
    if (partie(o, "route")) {
      const r = clamp(o.route == null ? 1 : o.route, 0, 1), Q = [F[0] + 40, F[1] - 120], B = (t) => [(1 - t) * (1 - t) * F[0] + 2 * t * (1 - t) * Q[0] + t * t * R[0], (1 - t) * (1 - t) * F[1] + 2 * t * (1 - t) * Q[1] + t * t * R[1]];
      if (r > 0.01) { const pts = []; for (let i = 0; i <= 30; i++) pts.push(B(r * i / 30));
        ln(g, "M" + pts.map(pt).join(" L"), 4, INK, { "stroke-dasharray": "4 12" });
        if (r < 0.99) { const h = B(r); el("circle", { cx: f(h[0]), cy: f(h[1]), r: 7, fill: INK }, g); } }
    }
    if (partie(o, "villes")) {
      const vs = o.villes || ["F", "T", "R"], ac = o.actif || {};
      const ville = (p, nom, on) => { if (on) el("circle", { cx: p[0], cy: p[1], r: 16, fill: YEL, opacity: 0.9 }, g);
        el("circle", { cx: p[0], cy: p[1], r: 7, fill: on ? INK : "#77776F", stroke: on ? INK : "#55524B", "stroke-width": 2 }, g);
        if (nom) tx(g, nom, p[0] + 16, p[1] + 8, 24, { anchor: "start", fill: on ? INK : "#55524B", halo: true, hw: 5 }); };
      if (vs.includes("F")) ville(F, o.nomF ? "Friedrichshafen" : null, true);
      if (vs.includes("T")) ville(T, "Tettnang", !!ac.tett);
      if (vs.includes("R")) ville(R, "Ravensburg", !!ac.rav);
    }
    return { F, T, R, voilier: [238, 300], nom: [480, 440], routeTete: R, geo: geoLac, w: W, h: H };
  };
  D.carteLac.essais = [{}, { actif: { rav: true }, route: 0.6, ph: 0.5 }, { part: "lac" }];

  /* C6 — un petit voilier au trait (coque, mât, deux voiles, fanion). 40 × 46. Ancrage = ligne de flottaison, milieu.
   * Il tangue (m.sway 5°, 2,4 s, pivot = ancrage). */
  D.voilier = (g, o = {}) => {
    const C = U.ctx(g, 1206, false, 1);
    U.shape(C, "coque", "M-22 -9 L22 -9 L15 2 L-15 2 Z", MAT.white, { sw: 2.2, r: 0.4 });
    ln(g, "M0 -9 L0 -46", 2, INK);
    U.shape(C, "gv", "M2 -44 L2 -12 L19 -12 Z", MAT.white, { sw: 1.8, r: 0.3 });
    U.shape(C, "foc", "M-2 -40 L-2 -12 L-17 -12 Z", { base: "#F0F0EB" }, { sw: 1.8, r: 0.3 });
    fl(g, "M0 -46 L8 -43 L0 -40 Z", INK);
    ln(g, "M-26 5 q4 -3 8 0 M14 5 q4 -3 8 0", 1.4, "#77776F");
    return { mat: [0, -46] };
  };

  /* C2 — rappel de la carte en vignette (200 × 150) : le lac simplifié, la ville (point ; épingle jaune pour Friedrichshafen),
   * son nom (Kalam 20). Ancrage = centre. o.ville : "Friedrichshafen" (défaut) ou "Tettnang". Ancre point (pour m.ripple). */
  D.miniCarte = (g, o = {}) => {
    const C = U.ctx(g, 1211, false, 1), v = o.ville || "Friedrichshafen", k = 0.19, M = ([x, y]) => [f((x - 380) * k), f((y - 325) * k - 14)];
    ombre(g, rr(-100, -75, 200, 150, 16), 6, 8);
    U.shape(C, "carte", rr(-100, -75, 200, 150, 16), { base: "#FBFBF6" }, { sw: 3, r: 0.5 });
    const d = lisse(LAC_PTS.map(M)); fl(g, d, "#E9EEF0"); ln(g, d, 2, INK);
    ln(g, "M-84 34 l7 -8 l7 8 l7 -9 l7 9 M50 34 l7 -8 l7 8 l7 -7 l7 7", 1.4, "#77776F");
    const p = M(v === "Tettnang" ? VILLES.T : VILLES.F);
    if (v === "Tettnang") { el("circle", { cx: p[0], cy: p[1], r: 10, fill: YEL }, g); el("circle", { cx: p[0], cy: p[1], r: 5, fill: INK }, g); }
    else { el("ellipse", { cx: p[0], cy: p[1] + 1, rx: 7, ry: 2.5, fill: "rgba(28,26,28,.25)" }, g);
      fl(g, `M${p[0]} ${p[1]} C${p[0] - 3} ${p[1] - 7} ${p[0] - 11} ${p[1] - 14} ${p[0] - 11} ${p[1] - 22} A11 11 0 1 1 ${p[0] + 11} ${p[1] - 22} C${p[0] + 11} ${p[1] - 14} ${p[0] + 3} ${p[1] - 7} ${p[0]} ${p[1]} Z`, YEL, { stroke: INK, "stroke-width": 2.2 });
      el("circle", { cx: p[0], cy: p[1] - 22, r: 4, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g); }
    tx(g, v, 0, 60, 20, { halo: "#FBFBF6", hw: 5 });
    return { point: p };
  };
  D.miniCarte.essais = [{}, { ville: "Tettnang" }];

  /* C3 — coupures de presse : papier journal à bord dentelé, un titre en pavé noir ILLISIBLE, des colonnes de lignes grises,
   * AUCUN nom de journal. Ancrage = coin haut gauche. o.w × o.h : 170 × 130 (S4) ou 80 × 104 (S25).
   * o.n : nombre de coupures empilées (décalées de 8 px, tournées de −4°, 3°, 7°) — pour les faire tomber une à une, poser
   * n nœuds avec o.i (0, 1, 2 : même place et même angle que dans la pile). o.dates / o.date : texte écrit en haut (Kalam 20).
   * o.vide : rectangle en pointillés avec « ? ». o.coin 0..1 : le coin haut droit se soulève (il bat). */
  D.coupures = (g, o = {}) => {
    const w = o.w || 170, h = o.h || 130, ROT = [-4, 3, 7], dates = o.dates || (o.date ? [o.date] : []);
    const une = (G, i, date, vide, coin) => {
      const C = U.ctx(G, 1221 + i, false, 1);
      if (vide) { el("rect", { x: 0, y: 0, width: w, height: h, rx: 4, fill: "none", stroke: "#77776F", "stroke-width": 2.4, "stroke-dasharray": "8 7" }, G);
        tx(G, "?", w / 2, h / 2 + h * 0.16, h * 0.44, { fill: "#77776F" }); return; }
      const pts = [], J = (k) => (hsh(k * 7.7 + i * 13) - 0.5) * 2.2;
      for (let x = 0; x <= w; x += 9) pts.push([x, J(x)]); for (let y = 9; y <= h; y += 9) pts.push([w + J(y + 50), y]);
      for (let x = w; x >= 0; x -= 9) pts.push([x, h + J(x + 90)]); for (let y = h - 9; y > 0; y -= 9) pts.push([J(y + 140), y]);
      const d = poly(pts), cn = clamp(coin || 0, 0, 1);
      ombre(G, d, 5, 6);
      fl(G, d, "#F4F3EE"); ln(G, d, 1.8, INK);   // trait net : rough.js retraçait chaque dent du bord
      const top = date ? 30 : 8, pad = Math.max(6, w * 0.06);
      if (date) tx(G, date, pad, 22, 20, { anchor: "start" });
      fl(G, rr(pad, top, w - 2 * pad, h * 0.1, 2), INK, { opacity: 0.85 }); fl(G, rr(pad, top + h * 0.14, (w - 2 * pad) * 0.62, h * 0.07, 2), INK, { opacity: 0.7 });
      const nc = w > 120 ? 3 : 2, cw = (w - 2 * pad - (nc - 1) * 8) / nc, y0 = top + h * 0.28;
      for (let c = 0; c < nc; c++) { const x = pad + c * (cw + 8);
        if (c === 0 && h > 110) { U.shape(C, "img", rr(x, y0, cw, h * 0.22, 2), MAT.grey, { sw: 1.4, r: 0.3 }); }
        for (let y = y0 + (c === 0 && h > 110 ? h * 0.26 : 0); y < h - 8; y += Math.max(5, h * 0.055)) ln(G, `M${f(x)} ${f(y)} L${f(x + cw * (0.8 + 0.2 * hsh(y + c)))} ${f(y)}`, 1.8, "#BDBDB6"); }
      if (cn > 0.02) { const k = 10 + 22 * cn; fl(G, `M${w - k} 0 L${w} ${k} L${w - k * 0.9} ${k * 0.9} Z`, "#E4E3DC", { stroke: INK, "stroke-width": 1.6 }); }
    };
    const n = o.n || 1;
    if (o.i != null) { const i = o.i; une(el("g", { transform: `translate(${i * 8} ${i * 8}) rotate(${ROT[i % 3]} ${w / 2} ${h / 2})` }, g), i, dates[0], o.vide, o.coin); }
    else for (let i = 0; i < n; i++) une(el("g", { transform: `translate(${i * 8} ${i * 8}) rotate(${n > 1 ? ROT[i % 3] : (o.rot || 0)} ${w / 2} ${h / 2})` }, g), i, dates[i], o.vide, i === n - 1 ? o.coin : 0);
    return { w, h };
  };
  D.coupures.essais = [{ n: 3, coin: 0.6 }, { w: 80, h: 104, date: "28.04." }, { w: 80, h: 104, vide: true }];

  /* ═══════════════════════════════ D. LA ROUTE, LE PRÉ, L'ENTRÉE DES URGENCES ═══════════════════════════════ */
  const NUIT_H = { base: "#55554F", hatch: INK, gap: 3.6, fw: 1.3 };   // masses sombres de la nuit (arbres, collines, haie)

  /* D1 — le ciel de nuit EN ENCRE (ni lune ni étoiles : ciel couvert). Ancrage = coin bas gauche ; o.w × o.h (1000 × 560),
   * élargi de 60 px de chaque côté. Trois bandes de hachures obliques d'encre (opacité 0,66 / 0,48 / 0,3 de haut en bas),
   * quelques traînées de nuages bas, une ligne de collines sombres en bas (jusqu'à −74).
   * Parties : "fond" · "fenetres" (trois fenêtres allumées minuscules, 8 × 10, sur les collines ; o.on = [1, 1, 1] : mettre 0 pour
   * en éteindre une à mi-scène). Ancres : collines (y du haut des collines). */
  D.nuit = (g, o = {}) => {
    const w = o.w || 1000, h = o.h || 560, C = U.ctx(g, 1301, false, 1);
    if (partie(o, "fond")) {
      const id = uid("nuit"), pat = el("pattern", { id, width: 9, height: 9, patternUnits: "userSpaceOnUse", patternTransform: "rotate(-38)" }, el("defs", {}, g));
      el("path", { d: "M0 0 L0 9", stroke: "#2E2C2A", "stroke-width": 2.1 }, pat);
      fl(g, `M-60 ${-h} L${w + 60} ${-h} L${w + 60} 0 L-60 0 Z`, "#ECECE6");
      [[0, 0.36, 0.66], [0.36, 0.7, 0.48], [0.7, 1, 0.3]].forEach(([a, b, op]) => fl(g, `M-60 ${f(-h + h * a)} L${w + 60} ${f(-h + h * a)} L${w + 60} ${f(-h + h * b + 1)} L-60 ${f(-h + h * b + 1)} Z`, `url(#${id})`, { opacity: op }));
      [[0.12, 120, 420], [0.22, 560, 380], [0.42, 60, 300], [0.5, 640, 340]].forEach(([k, x, L], i) => ln(g, `M${x} ${f(-h + h * k)} q${f(L / 2)} ${-10 - 6 * i} ${L} 0`, 9, "#3A3A37", { opacity: 0.22 }));
      const hp = [[-60, -40], [60, -62], [190, -48], [310, -74], [430, -54], [560, -66], [690, -42], [800, -70], [930, -50], [1060, -60]];
      U.shape(C, "collines", U.curve(hp) + ` L${w + 60} 2 L-60 2 Z`, NUIT_H, { sw: 2.2, r: 0.6 });
    }
    if (partie(o, "fenetres")) { const on = o.on || [1, 1, 1];
      [[210, -38], [556, -44], [842, -34]].forEach(([x, y], i) => { const v = on[i] == null ? 1 : on[i];
        if (v > 0.05) el("circle", { cx: x, cy: y, r: 11, fill: YEL, opacity: f(0.3 * v) }, g);
        el("rect", { x: x - 4, y: y - 5, width: 8, height: 10, fill: v > 0.05 ? YEL : "#3A3A37", "fill-opacity": v > 0.05 ? f(0.4 + 0.6 * v) : 1, stroke: INK, "stroke-width": 1 }, g); }); }
    return { collines: -74, w, h };
  };
  D.nuit.essais = [{ h: 560 }, { h: 300, part: "fenetres", on: [1, 0, 1] }];

  /* D2 — le lampadaire de route. Hauteur 440, crosse de 72 vers la droite. Ancrage = pied. Dessous de la lanterne : (74, −431).
   * o.on 0..1 : halo rond jaune r 60 (50 %), CÔNE de lumière jaune (0,2 × on) qui tombe jusqu'au sol o.sol (défaut +42 : la
   * chaussée de S5, ellipse claire x −70…240). Parties : "lumiere" (halo, cône, tache au sol — à poser DEVANT les personnages qui
   * doivent « entrer dans la lumière ») · "mat" (socle, mât, crosse, lanterne ; le verre suit o.on). Ancres : lanterne, sol. */
  D.lampadaire = (g, o = {}) => {
    const C = U.ctx(g, 1311, false, 1), on = clamp(o.on == null ? 1 : o.on, 0, 1), sy = o.sol == null ? 42 : o.sol, L = [74, -431];
    if (partie(o, "lumiere") && on > 0.01) {
      fl(g, poly([[L[0] - 24, L[1] + 2], [L[0] + 24, L[1] + 2], [240, sy], [-70, sy]]), YEL, { opacity: f(0.2 * on) });
      fl(g, poly([[L[0] - 12, L[1] + 2], [L[0] + 12, L[1] + 2], [168, sy], [2, sy]]), YEL, { opacity: f(0.12 * on) });
      el("ellipse", { cx: 85, cy: sy, rx: 155, ry: 22, fill: "#FFF6C9", opacity: f(0.6 * on) }, g);
      el("circle", { cx: L[0], cy: L[1] + 4, r: 60, fill: YEL, opacity: f(0.5 * on) }, g);
    }
    if (partie(o, "mat")) {
      ombre(g, "M-8 -14 L8 -14 L5 -400 L-5 -400 Z", 6, 0);
      U.shape(C, "socle", "M-17 0 L17 0 L12 -16 L-12 -16 Z", MAT.mid, { sw: 2.2 });
      U.shape(C, "mat", "M-8 -15 L8 -15 L5 -400 L-5 -400 Z", MAT.grey, { sw: 2.4 });
      el("rect", { x: -4, y: -92, width: 8, height: 24, rx: 2, fill: "#E1E1DC", stroke: INK, "stroke-width": 1.4 }, g);
      U.stroke(C, "crosse", "M0 -398 C0 -432 22 -446 50 -444 L64 -443", { sw: 7, r: 0.5 });
      ln(g, "M0 -398 C0 -430 22 -443 50 -441 L62 -440", 2.4, "#E1E1DC");
      U.shape(C, "lanterne", "M44 -452 C60 -463 96 -460 108 -446 L104 -435 L46 -434 Z", MAT.mid, { sw: 2.4 });
      el("ellipse", { cx: 75, cy: -433, rx: 27, ry: 5, fill: on > 0.05 ? "#FFF3C4" : "#E1E1DC", stroke: INK, "stroke-width": 2 }, g);
    }
    return { lanterne: L, sol: [85, sy] };
  };
  D.lampadaire.essais = [{}, { on: 0 }];

  /* D3 — la route vue de côté. Ancrage = coin bas gauche de la chaussée (S5 : (40, h 80)). Chaussée −90…0 (#DAD9D2 hachuré,
   * tirets au milieu, bordure), bas-côté du fond −122…−88 (herbe), six piquets x 550–960 (−176…−118) reliés par deux fils ;
   * bas-côté avant 0…o.avant (80) pour que le bas de la bande ne soit jamais du papier nu.
   * Parties : "fond" · "touffes" (touffes d'herbe des deux bas-côtés, o.vent 0..1 : phase du balancement, ± 3°). */
  D.route = (g, o = {}) => {
    const w = o.w || 1000, av = o.avant == null ? 80 : o.avant, C = U.ctx(g, 1321, false, 1), xs = [550, 632, 714, 796, 878, 960];
    if (partie(o, "fond")) {
      U.shape(C, "basCote", `M-60 -124 L${w + 60} -124 L${w + 60} -88 L-60 -88 Z`, { base: "#D3D5C9", hatch: "#8F9187", gap: 6, fw: 1 }, { sw: 1.4, r: 0.5 });
      [-162, -140].forEach((y, k) => { let d = `M${xs[0]} ${y}`; for (let i = 1; i < xs.length; i++) d += ` Q${(xs[i - 1] + xs[i]) / 2} ${y + 7} ${xs[i]} ${y}`; ln(g, d, 1.5, "#3A3A37"); });
      xs.forEach((x, i) => { ombre(g, rr(x - 5, -176, 10, 58, 2), 4, 3); U.shape(C, "piquet" + i, rr(x - 5, -176, 10, 58, 2), BOIS, { sw: 2 }); });
      U.shape(C, "chaussee", `M-60 -90 L${w + 60} -90 L${w + 60} 0 L-60 0 Z`, { base: "#DAD9D2", hatch: "#ABABA4", gap: 7, fw: 1 }, { sw: 1.6, r: 0.4 });
      for (let x = -40; x < w + 40; x += 88) U.shape(C, "tiret" + x, rr(x, -48, 46, 6, 2), MAT.white, { sw: 1.3, r: 0.3 });
      U.shape(C, "bordure", rr(-60, -3, w + 120, 9, 2), MAT.white, { sw: 2, r: 0.3 });
      if (av) { U.shape(C, "avant", `M-60 6 L${w + 60} 6 L${w + 60} ${av} L-60 ${av} Z`, { base: "#D9DBD0", hatch: "#9A9C92", gap: 9, fw: 1 }, { sw: 0.01, noStroke: true });
        for (let i = 0; i < 18; i++) el("ellipse", { cx: f(-40 + (w + 80) * hsh(i * 4.3)), cy: f(16 + (av - 24) * hsh(i * 2.9)), rx: 3 + 2 * hsh(i), ry: 2, fill: "#A1A19B" }, g); }
    }
    if (partie(o, "touffes")) {
      const ph = o.vent || 0, touffe = (x, y, s, i) => { let d = ""; [-30, -14, 0, 14, 30].forEach((a, j) => { const A = rad(a + 3 * Math.sin(TAU * (ph + i * 0.13)) + 3 * Math.sin(TAU * ph + j)), L = s * (14 + 8 * hsh(i * 3 + j));
        d += `M${f(x + (j - 2) * 2)} ${y} Q${f(x + Math.sin(A) * L * 0.4)} ${f(y - L * 0.6)} ${f(x + Math.sin(A) * L)} ${f(y - Math.cos(A) * L)} `; }); ln(g, d, 1.8, "#55524B"); };
      for (let i = 0; i < 12; i++) touffe(-20 + i * 92 + 30 * hsh(i * 1.9), -88, 1, i);
      if (av) for (let i = 0; i < 10; i++) touffe(10 + i * 106 + 40 * hsh(i * 7.1), av - 4, 1.4, i + 20);
    }
    return { chaussee: [0, -90], piquets: xs, w };
  };
  D.route.essais = [{}];

  /* D4 — arbre de nuit : houppier en masse sombre (hachures serrées), tronc clair. Hauteur o.h (330). Ancrage = pied.
   * Il se balance en entier (m.sway 1,2°, 4 s, pivot = pied). */
  D.arbreNuit = (g, o = {}) => {
    const H = o.h || 330, k = H / 330, C = U.ctx(g, 1331 + (o.seed || 0), false, 1), cy = -225 * k;
    el("ellipse", { cx: 8 * k, cy: 2, rx: 74 * k, ry: 8 * k, fill: OMB }, g);
    U.shape(C, "tronc", `M${f(-19 * k)} 0 Q${f(-10 * k)} ${f(-8 * k)} ${f(-10 * k)} ${f(-40 * k)} L${f(-8 * k)} ${f(-150 * k)} L${f(8 * k)} ${f(-150 * k)} L${f(10 * k)} ${f(-40 * k)} Q${f(10 * k)} ${f(-8 * k)} ${f(19 * k)} 0 Z`, { base: "#ECECE6", hatch: "#A1A19B", gap: 6, fw: 1 }, { sw: 2.4 });
    U.shape(C, "br1", `M${f(-6 * k)} ${f(-104 * k)} L${f(-50 * k)} ${f(-150 * k)} L${f(-44 * k)} ${f(-156 * k)} L${f(-2 * k)} ${f(-120 * k)} Z`, { base: "#ECECE6" }, { sw: 2 });
    U.shape(C, "br2", `M${f(5 * k)} ${f(-118 * k)} L${f(46 * k)} ${f(-160 * k)} L${f(52 * k)} ${f(-154 * k)} L${f(8 * k)} ${f(-104 * k)} Z`, { base: "#ECECE6" }, { sw: 2 });
    const pts = []; for (let i = 0; i < 20; i++) { const a = (i / 20) * TAU, r = 1 + 0.22 * (hsh(i * 3.7 + (o.seed || 0)) - 0.5) + 0.08 * Math.cos(2 * a); pts.push([f(Math.cos(a) * 104 * k * r), f(cy + Math.sin(a) * 98 * k * r)]); }
    U.shape(C, "houppier", bosses(pts, 6 * k), NUIT_H, { sw: 2.6, r: 0.7 });
    const p2 = []; for (let i = 0; i < 10; i++) { const a = (i / 10) * TAU; p2.push([f(-34 * k + Math.cos(a) * 42 * k), f(cy - 40 * k + Math.sin(a) * 36 * k)]); }
    U.shape(C, "reflet", bosses(p2, 4 * k), { base: "#77776F", hatch: "#3A3A37", gap: 4.2, fw: 1.2 }, { sw: 1.6, r: 0.7 });
    return { h: H, cime: [0, f(cy)] };
  };
  D.arbreNuit.essais = [{}, { h: 300, seed: 3 }];

  /* D5 — nappe de brume : trois rangées de traits courts blanc cassé, opacité 0,35. 400 × 60 (o.w). Ancrage = centre.
   * Elle dérive (m.drift, 12 px/s). Sur le papier clair elle ne se voit presque pas : elle est faite pour la nuit hachurée. */
  D.brume = (g, o = {}) => {
    const w = o.w || 400, G = el("g", { opacity: 0.35 }, g);
    fl(G, rr(-w / 2, -24, w, 48, 24), "#FFFFFF", { opacity: 0.5 });
    for (let r = 0; r < 3; r++) for (let x = -w / 2 + 10 + 30 * hsh(r); x < w / 2 - 20;) { const L = 18 + 26 * hsh(x * 0.13 + r), y = -18 + r * 18 + 3 * Math.sin(x / 40);
      ln(G, `M${f(x)} ${f(y)} l${f(L)} 0`, 5, "#FFFFFF"); x += L + 10 + 18 * hsh(x + r * 7); }
    return { w };
  };
  D.brume.essais = [{}];

  /* D6 — trois papillons de nuit autour de la lanterne (zone 120 × 120). Ancrage = dessous de la lanterne. o.t = temps (s),
   * arrondi au 1/30 : orbites elliptiques (1,3 / 1,7 / 2,2 s), ailes qui battent. Tracés nets (redessinés à chaque image). */
  D.papillons = (g, o = {}) => {
    const t = o.t || 0;
    [[50, 30, 1.3, 0], [40, 38, 1.7, 2.1], [58, 24, 2.2, 4.2]].forEach(([rx, ry, P, ph], i) => {
      const a = TAU * t / P + ph, x = rx * Math.cos(a), y = 24 + ry * Math.sin(a), op = Math.sin(TAU * 11 * t + i * 2) > 0;
      const G = el("g", { transform: `translate(${f(x)} ${f(y)}) rotate(${f(Math.cos(a) * 25)})` }, g);
      const ailes = op ? "M0 0 L-10 -7 L-8 3 Z M0 0 L10 -7 L8 3 Z" : "M0 0 L-4 -10 L-2 2 Z M0 0 L4 -10 L2 2 Z";
      fl(G, ailes, "#E8E8E2", { stroke: INK, "stroke-width": 1.3, "stroke-linejoin": "round" });
      el("ellipse", { cx: 0, cy: 0, rx: 1.9, ry: 4.2, fill: INK }, G);
    });
    return {};
  };
  D.papillons.essais = [{ t: 0 }, { t: 0.37 }];

  /* D7 — le vélo vu de côté, À L'ÉCHELLE DES PERSONNAGES (roues r 77 à l'échelle 1, géométrie de l'essai de la pose « à vélo » :
   * hanche sur la selle, mains au guidon). Ancrage = contact de la roue arrière ; roue avant à +237, l'ensemble ≈ 390 × 250.
   * o.flip : tourné vers la GAUCHE (ancres déjà retournées). o.rot : rotation des roues (°) ; o.ped : angle du pédalier (°).
   * o.ebike : vélo électrique (cadre épais, batterie, moteur, garde-boue, porte-bagages, PHARE + cône #FFF6C9 de o.phareL px, 260 ;
   * en S6, garé, le cône traverse le ciel : le raccourcir à ≈ 120).
   * o.bequille : debout sur sa béquille (S6). Bascule au sol : rotation du nœud autour de l'ancrage (0 → 84°).
   * Parties : "phare" (le cône, derrière) · "roues" (o.rot) · "cadre" · "pedalier" (o.ped, devant le cadre).
   * Ancres : selle (dessus), guidon (poignée), guidonL, pedales [droite, gauche], moyeuAr, moyeuAv, pedalier, phare. */
  const VELO = { R: 77, ar: [0, -77], av: [237, -77], bb: [119, -77], sj: [81, -187], ht: [194, -190], hb: [203, -158], potence: [184, -236], cintre: [221, -246] };
  D.velo = (g, o = {}) => {
    const eb = !!o.ebike, fp = o.flip ? -1 : 1, V = VELO, R = V.R, G = el("g", fp < 0 ? { transform: "scale(-1 1)" } : {}, g), C = U.ctx(G, eb ? 1342 : 1341, false, 1);
    const rot = o.rot || 0, pa = rad(o.ped == null ? 30 : o.ped), sw = eb ? 8.5 : 5.5;
    const pR = [V.bb[0] + 26 * Math.cos(pa), V.bb[1] + 26 * Math.sin(pa)], pL = [V.bb[0] - 26 * Math.cos(pa), V.bb[1] - 26 * Math.sin(pa)];
    const PL = o.phareL == null ? 260 : o.phareL;
    if (eb && PL > 0 && partie(o, "phare")) fl(G, poly([[222, -182], [222, -170], [222 + PL, -176 + PL * 0.24], [222 + PL, -176 - PL * 0.24]]), "#FFF6C9", { opacity: 0.3 });
    if (partie(o, "roues")) [V.ar, V.av].forEach((c) => {
      el("circle", { cx: c[0], cy: c[1], r: R - 3.5, fill: "none", stroke: "#2E2C2A", "stroke-width": 7 }, G);
      el("circle", { cx: c[0], cy: c[1], r: R - 10, fill: "none", stroke: INK, "stroke-width": 1.8 }, G);
      let d = ""; for (let i = 0; i < 8; i++) { const a = rad(rot + i * 45); d += `M${f(c[0] + 6 * Math.cos(a))} ${f(c[1] + 6 * Math.sin(a))} L${f(c[0] + (R - 11) * Math.cos(a + 0.14))} ${f(c[1] + (R - 11) * Math.sin(a + 0.14))} `; }
      ln(G, d, 1.3, "#55524B");
      const a = rad(rot); el("rect", { x: f(c[0] + (R - 14) * Math.cos(a) - 2), y: f(c[1] + (R - 14) * Math.sin(a) - 2), width: 4, height: 4, fill: INK }, G);   // la valve : on voit la roue tourner
      el("circle", { cx: c[0], cy: c[1], r: eb && c === V.ar ? 10 : 6, fill: "#E1E1DC", stroke: INK, "stroke-width": 2 }, G);
    });
    if (partie(o, "cadre")) {
      if (eb) { // garde-boue + porte-bagages
        [[V.ar, 195, 300], [V.av, 215, 345]].forEach(([c, a0, a1]) => { const P = (a) => [c[0] + (R + 7) * Math.cos(rad(a)), c[1] + (R + 7) * Math.sin(rad(a))]; ln(G, `M${pt(P(a0))} A${R + 7} ${R + 7} 0 0 1 ${pt(P(a1))}`, 4, "#55524B"); });
        ln(G, "M-6 -160 L80 -160 M8 -160 L0 -77 M44 -160 L60 -178", 3, INK);
      }
      if (o.bequille) U.stroke(C, "bequille", `M108 -74 L88 -2 L80 -2`, { sw: 4, r: 0.3 });
      const tube = (a, b, key, k) => { U.stroke(C, key, `M${pt(a)} L${pt(b)}`, { sw: sw * (k || 1), r: 0.4 }); if (eb) ln(G, `M${pt(a)} L${pt(b)}`, 2.2, "#C9C9C3"); };
      tube(V.bb, V.ar, "chainstay", 0.8); tube(V.sj, V.ar, "seatstay", 0.7);
      tube(V.bb, [78, -206], "seattube"); tube(V.sj, V.ht, "toptube"); tube(V.hb, V.bb, "downtube", eb ? 1.15 : 1); tube(V.ht, V.hb, "headtube", 1.3);
      U.stroke(C, "fourche", `M${pt(V.hb)} Q232 -122 ${pt(V.av)}`, { sw: sw * 0.85, r: 0.3 });
      if (eb) { const a = Math.atan2(V.bb[1] - V.hb[1], V.bb[0] - V.hb[0]) * 180 / Math.PI, B = el("g", { transform: `translate(${f((V.hb[0] + V.bb[0]) / 2 - 6)} ${f((V.hb[1] + V.bb[1]) / 2 - 8)}) rotate(${f(a)})` }, G);
        U.shape(U.ctx(B, 1343, false, 1), "batterie", rr(-40, -13, 80, 22, 8), MAT.mid, { sw: 2.2 }); [-20, -12, -4].forEach((x) => el("circle", { cx: x, cy: -2, r: 2, fill: "#FFFFFF" }, B));
        U.shape(C, "moteur", cercle(V.bb[0], V.bb[1], 18), MAT.grey, { sw: 2.2 });
        U.shape(C, "phare", rr(208, -184, 16, 13, 4), MAT.white, { sw: 2 }); el("circle", { cx: 222, cy: -177.5, r: 4, fill: "#FFF6C9", stroke: INK, "stroke-width": 1.4 }, G); }
      ln(G, "M78 -206 L79 -213", 4, INK);
      U.shape(C, "selle", "M56 -212 Q58 -222 80 -222 L106 -218 Q109 -211 100 -210 L62 -208 Z", { base: "#3A3A37" }, { sw: 2, r: 0.3 });
      U.stroke(C, "potence", `M${pt(V.ht)} L${pt(V.potence)}`, { sw: 5, r: 0.3 });
      U.stroke(C, "cintre", `M${pt(V.potence)} Q200 -248 216 -247 L224 -245`, { sw: 4.4, r: 0.3 });
      ln(G, "M210 -247 L230 -244", 8, "#3A3A37");
      ln(G, "M119 -94 L0 -85 M119 -60 L0 -69", 1.4, "#55524B", { "stroke-dasharray": "3 3" });
    }
    if (partie(o, "pedalier")) {
      ln(G, `M${pt(V.bb)} L${pt(pL)}`, 4, "#55524B"); el("rect", { x: f(pL[0] - 8), y: f(pL[1] - 3), width: 16, height: 6, rx: 2, fill: "#55524B" }, G);
      el("circle", { cx: V.bb[0], cy: V.bb[1], r: 16, fill: "#E1E1DC", stroke: INK, "stroke-width": 2.2, "stroke-dasharray": eb ? null : "4 2" }, G);
      ln(G, `M${pt(V.bb)} L${pt(pR)}`, 5, INK); el("rect", { x: f(pR[0] - 9), y: f(pR[1] - 3.5), width: 18, height: 7, rx: 2, fill: INK }, G);
      el("circle", { cx: V.bb[0], cy: V.bb[1], r: 4, fill: INK }, G);
    }
    const X = (p) => [f(p[0] * fp), f(p[1])];
    return { selle: X([81, -222]), guidon: X([221, -246]), guidonL: X([214, -243]), pedales: [X(pR), X(pL)], moyeuAr: X(V.ar), moyeuAv: X(V.av), pedalier: X(V.bb), phare: X([222, -177]) };
  };
  D.velo.essais = [{}, { ebike: true, flip: true, rot: 20, ped: 120 }, { ebike: true, bequille: true }];

  /* D8 — trois accessoires qui suivent une ancre Persona (personnages de PROFIL, tournés vers la droite ; o.flip = vers la gauche).
   * D.casque (ancre top) : coque à trois fentes, petite visière, jugulaire — à tourner comme la tête (headTilt + 0,55 × torsoLean,
   * × facing). D.capuche (ancre neck) : capuche en bourrelet derrière la nuque + deux cordons sur la poitrine. D.sacDos (ancre
   * chest, À POSER DERRIÈRE le personnage) : petit sac à dos dans le dos. */
  D.casque = (g, o = {}) => {
    const G = el("g", o.flip ? { transform: "scale(-1 1)" } : {}, g), C = U.ctx(G, 1371, false, 1);
    ln(G, "M8 38 L-16 102 M-44 46 L-16 102 Q8 126 36 134", 2.2, "#3A3A37");
    const coque = "M-68 50 C-74 6 -48 -26 -2 -27 C42 -28 70 -4 68 34 L58 40 C34 30 -24 34 -68 50 Z";
    ombre(G, coque, 4, 5);
    U.shape(C, "coque", coque, MAT.grey, { sw: 2.6, r: 0.5 });
    [[-34, -6, -24], [-2, -14, 0], [30, -8, 22]].forEach(([x, y, a]) => el("rect", { x: x - 10, y: y - 4, width: 20, height: 8, rx: 4, fill: "#3A3A37", transform: `rotate(${a} ${x} ${y})` }, G));
    U.shape(C, "visiere", "M56 30 L80 30 Q82 38 74 40 L58 40 Z", MAT.mid, { sw: 2 });
    ln(G, "M-60 42 C-30 30 30 26 60 34", 1.6, "#FFFFFF");
    return {};
  };
  D.capuche = (g, o = {}) => {
    const G = el("g", o.flip ? { transform: "scale(-1 1)" } : {}, g), C = U.ctx(G, 1375, false, 1);
    U.shape(C, "capuche", "M-2 -8 C-26 -22 -60 -20 -68 2 C-72 22 -52 36 -24 32 C-10 30 -2 20 -2 8 Z", MAT.mid, { sw: 2.4 });
    ln(G, "M-20 -12 Q-36 4 -28 26 M-44 -14 Q-56 4 -46 26", 1.5, "#55524B");
    ln(G, "M-6 -4 C4 2 14 4 22 4", 3.4, "#77776F");
    ln(G, "M20 4 L23 48 M28 2 L32 42", 2.4, "#FFFFFF"); ln(G, "M20 4 L23 48 M28 2 L32 42", 1.3, "#55524B");
    [[23, 48], [32, 42]].forEach(([x, y]) => el("rect", { x: x - 2.2, y, width: 4.4, height: 8, rx: 1.5, fill: "#55524B" }, G));
    return {};
  };
  D.sacDos = (g, o = {}) => {
    const G = el("g", o.flip ? { transform: "scale(-1 1)" } : {}, g), C = U.ctx(G, 1381, false, 1);
    ombre(G, rr(-80, -50, 50, 88, 14), 4, 5);
    U.shape(C, "sac", rr(-80, -50, 50, 88, 14), MAT.grey, { sw: 2.4 });
    U.shape(C, "poche", rr(-86, -6, 22, 38, 8), MAT.mid, { sw: 2 });
    ln(G, "M-74 -32 L-36 -32", 1.4, "#77776F"); el("rect", { x: -40, y: -36, width: 4, height: 9, rx: 1, fill: "#55524B" }, G);
    ln(G, "M-64 -50 q8 -12 16 0", 2.6, INK);
    U.stroke(C, "bretelle", "M-36 -44 C-24 -60 0 -60 12 -44", { sw: 5, r: 0.3 });
    return {};
  };

  /* D9 — le pré, la nuit. 1000 × 212. Ancrage = coin bas gauche, SUR LA LIGNE (S6 : (40, h 0)) : le pré monte jusqu'à −212
   * (sentier au fond, fleurs fermées). Parties : "fond" · "trace" (o.trace 0..1 : la trace de pas en pointillés de (170, −150)
   * à (360, −130), puis « ≈ 100 m » (Kalam 24) en (260, −178)) · "herbes" (24 brins + 5 touffes au premier plan, 0…−120,
   * DEVANT le corps ; o.vent 0..1 : balancement ± 4°, phases décalées). */
  D.pre = (g, o = {}) => {
    const C = U.ctx(g, 1361, false, 1);
    if (partie(o, "fond")) {
      U.shape(C, "pre", "M-60 -214 L1060 -214 L1060 2 L-60 2 Z", { base: "#D4D6CB", hatch: "#8E9086", gap: 9, fw: 1 }, { sw: 0.01, noStroke: true });
      U.shape(C, "sentier", "M-60 -198 C200 -188 420 -202 640 -192 C820 -184 960 -196 1060 -190 L1060 -174 C940 -180 820 -168 640 -176 C420 -186 200 -172 -60 -182 Z", { base: "#E6E4DA", hatch: "#B9B6A9", gap: 8, fw: 1 }, { sw: 1.6, r: 0.6 });
      for (let i = 0; i < 70; i++) { const x = -40 + 1080 * hsh(i * 3.3), y = -166 + 150 * hsh(i * 5.9 + 2); ln(g, `M${f(x)} ${f(y)} l-3 -9 M${f(x + 4)} ${f(y)} l2 -10`, 1.2, "#8E9086"); }
      for (let i = 0; i < 14; i++) { const x = 20 + 960 * hsh(i * 3.1 + 7), y = -150 + 40 * hsh(i * 1.7);
        ln(g, `M${f(x)} ${f(y)} q-2 -10 1 -18`, 1.4, "#55524B"); el("ellipse", { cx: f(x + 1), cy: f(y - 21), rx: 3, ry: 5, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.2 }, g); }
    }
    if (partie(o, "trace")) {
      const tr = clamp(o.trace == null ? 1 : o.trace, 0, 1), A = [170, -150], B = [360, -130];
      if (tr > 0.01) { const P = (u) => [A[0] + (B[0] - A[0]) * u, A[1] + (B[1] - A[1]) * u - 10 * Math.sin(Math.PI * u)];
        let d = "M" + pt(P(0)); for (let i = 1; i <= 20; i++) d += " L" + pt(P(tr * i / 20)); ln(g, d, 2.4, "#3A3A37", { "stroke-dasharray": "2 9" });
        for (let u = 0.04, k = 0; u <= tr; u += 0.1, k++) { const p = P(u), s = k % 2 ? 6 : -6; el("ellipse", { cx: f(p[0]), cy: f(p[1] + s), rx: 5, ry: 2.6, fill: "#3A3A37", opacity: 0.7 }, g); }
        if (tr > 0.6) tx(g, "≈ 100 m", 260, -178, 24, { halo: true, hw: 6, op: f((tr - 0.6) / 0.4) }); }
    }
    if (partie(o, "herbes")) {
      const ph = o.vent || 0, brin = (x, H, a, c) => { const A = rad(a), tx2 = x + Math.sin(A) * H, ty = -Math.cos(A) * H;
        fl(g, `M${f(x - 5)} 4 Q${f(x - 4 + Math.sin(A) * H * 0.5)} ${f(ty * 0.5)} ${f(tx2)} ${f(ty)} Q${f(x + 4 + Math.sin(A) * H * 0.45)} ${f(ty * 0.5)} ${f(x + 5)} 4 Z`, c, { stroke: INK, "stroke-width": 1.3, "stroke-linejoin": "round" }); };
      for (let i = 0; i < 24; i++) brin(10 + i * 42 + 14 * hsh(i), 64 + 56 * hsh(i * 2.3), 4 * Math.sin(TAU * (ph + i * 0.11)) + (hsh(i * 5) - 0.5) * 18, i % 3 ? "#B4B6AB" : "#8E9086");
      [90, 300, 520, 700, 910].forEach((x, i) => [-26, -12, 0, 12, 26].forEach((a, j) => brin(x + (j - 2) * 5, 40 + 12 * hsh(i * 3 + j), a + 4 * Math.sin(TAU * (ph + i * 0.2)), "#77776F")));
    }
    return { trace: [[170, -150], [360, -130]], label: [260, -178] };
  };
  D.pre.essais = [{}, { part: "herbes", vent: 0.3 }];

  /* D10 — l'entrée des urgences, de nuit. Ancrage = coin bas gauche du mur, au sol (S7 : (380, h 80)). Mur x 0–700 jusqu'à −540
   * (dalles de béton, trois fenêtres dont une allumée), acrotère ; AUVENT x 50–520 (−374…−342) sur deux poteaux ; CAISSON
   * « Notaufnahme » x 140–440 (−434…−372) ; portes vitrées coulissantes dans l'ouverture x 206–414 (−324…0) ; applique (580, −290) ;
   * à gauche, hors du mur : trois bornes (x −80, −50, −20) et une haie (x −270…−120) ; trottoir 0…+80 de x −300 à 700.
   * Parties : "fond" · "portes" (o.ouv 0..1 : les deux battants s'effacent dans le mur, la lumière chaude se répand au sol) ·
   * "caisson" (o.lum 0..1 : caisson allumé + halo jaune + applique ; le faire grésiller). Ancres : portes, caisson, entree. */
  D.urgencesFacade = (g, o = {}) => {
    const C = U.ctx(g, 1391, false, 1), u = clamp(o.ouv || 0, 0, 1), lum = clamp(o.lum == null ? 1 : o.lum, 0, 1);
    if (partie(o, "fond")) {
      U.shape(C, "trottoir", "M-300 0 L700 0 L700 80 L-300 80 Z", { base: "#E2E2DB", hatch: "#ABABA4", gap: 9, fw: 1 }, { sw: 1.6, r: 0.4 });
      for (let x = -280; x < 700; x += 70) ln(g, `M${x} 2 L${x - 14} 80`, 1.2, "#A9A9A2");
      ln(g, "M-300 40 L700 40", 1.2, "#A9A9A2");
      // la haie et les bornes, à gauche
      const hp = []; for (let i = 0; i <= 10; i++) hp.push([-270 + 15 * i, f(-70 - 22 * Math.sin(Math.PI * i / 10) - 8 * hsh(i * 2.1))]);
      U.shape(C, "haie", bosses(hp.concat([[-120, 0], [-270, 0]]), 5), NUIT_H, { sw: 2.4, r: 0.7 });
      [-80, -50, -20].forEach((x, i) => { ombre(g, rr(x - 8, -46, 16, 46, 6), 3, 3); U.shape(C, "borne" + i, rr(x - 8, -46, 16, 46, 6), MAT.white, { sw: 2 }); fl(g, rr(x - 8, -34, 16, 7, 1), "#A9A9A2"); });
      // le mur
      fl(g, "M0 -540 L700 -540 L700 0 L0 0 Z", "#E9EAE4");
      for (let y = -450; y < 0; y += 90) ln(g, `M2 ${y} L700 ${y}`, 1.2, "#C9C9C1");
      for (let x = 140; x < 700; x += 140) ln(g, `M${x} -540 L${x} -470`, 1.2, "#C9C9C1");
      U.stroke(C, "arete", "M0 -540 L0 0", { sw: 2.6 });
      U.shape(C, "acrotere", rr(-8, -556, 716, 18, 3), MAT.grey, { sw: 2.2 });
      [[30, 0], [250, 1], [480, 0]].forEach(([x, on], i) => { U.shape(C, "fen" + i, rr(x, -526, 96, 56, 4), { base: on ? "#FFF3C4" : "#5E5E58", hatch: on ? null : INK, gap: 5, fw: 1 }, { sw: 2.2 }); ln(g, `M${x + 48} -526 L${x + 48} -470`, 2, INK); });
      // l'auvent sur deux poteaux, une lampe dessous
      [66, 492].forEach((x, i) => { ombre(g, rr(x, -342, 12, 342, 3), 4, 0); U.shape(C, "poteau" + i, rr(x, -342, 12, 342, 3), MAT.white, { sw: 2 }); });
      ombre(g, rr(50, -374, 470, 32, 4), 6, 8);
      U.shape(C, "auvent", rr(50, -374, 470, 32, 4), MAT.grey, { sw: 2.6 });
      ln(g, "M52 -350 L518 -350", 1.4, "#FFFFFF");
      // l'ouverture des portes (encadrement)
      U.shape(C, "encadrement", rr(196, -334, 228, 334, 3), MAT.mid, { sw: 2.6 });
    }
    if (partie(o, "portes")) {
      fl(g, rr(206, -324, 208, 324, 2), "#FFF3C4");
      ln(g, "M206 -120 L414 -120", 1.6, "#E3D08E"); fl(g, rr(236, -320, 148, 8, 3), "#FFFFFF", { opacity: 0.9 });
      fl(g, poly([[206, 0], [414, 0], [480, 74], [140, 74]]), YEL, { opacity: f(0.12 + 0.3 * u) });
      const G = clipPoly(g, [[206, -326], [414, -326], [414, 2], [206, 2]]);
      [[206 - 100 * u, 104], [310 + 100 * u, 104]].forEach(([x, w]) => { fl(G, rr(x, -324, w, 324, 2), "#F6F8F7", { opacity: 0.55, stroke: INK, "stroke-width": 2.6 });
        ln(G, `M${f(x + 18)} -250 L${f(x + 56)} -300 M${f(x + 24)} -214 L${f(x + 78)} -282`, 2.2, "#FFFFFF"); ln(G, `M${f(x + 6)} -170 L${f(x + w - 6)} -170`, 3, "#77776F", { "stroke-dasharray": "6 6" }); });
    }
    if (partie(o, "caisson")) {
      if (lum > 0.02) { el("ellipse", { cx: 290, cy: -403, rx: 200, ry: 62, fill: YEL, opacity: f(0.28 * lum) }, g); el("circle", { cx: 580, cy: -290, r: 40, fill: YEL, opacity: f(0.25 * lum) }, g);
        fl(g, poly([[250, -342], [330, -342], [380, -20], [200, -20]]), YEL, { opacity: f(0.08 * lum) }); }
      const G = el("g", {}, g), CC = U.ctx(G, 1393, false, 1);
      ombre(G, rr(140, -434, 300, 62, 8), 5, 6);
      U.shape(CC, "caisson", rr(140, -434, 300, 62, 8), { base: lum > 0.5 ? "#FFF6C9" : "#E1E1DC" }, { sw: 3, r: 0.4 });
      tx(G, "Notaufnahme", 290, -389, 40, { fill: lum > 0.5 ? INK : "#77776F" });
      U.shape(CC, "applique", rr(568, -304, 24, 18, 4), MAT.white, { sw: 2 }); el("ellipse", { cx: 580, cy: -286, rx: 10, ry: 3, fill: lum > 0.5 ? "#FFF3C4" : "#E1E1DC", stroke: INK, "stroke-width": 1.4 }, G);
      el("ellipse", { cx: 290, cy: -340, rx: 16, ry: 4, fill: lum > 0.5 ? "#FFF3C4" : "#E1E1DC", stroke: INK, "stroke-width": 1.6 }, G);
    }
    return { portes: [310, -160], caisson: [290, -403], entree: [310, 0] };
  };
  D.urgencesFacade.essais = [{}, { ouv: 1, lum: 0.3 }];

  /* D11 — l'ambulance (fourgon-caisse) vue de côté, avant à DROITE (o.flip : avant à gauche, comme en S7). Ancrage = contact de
   * la roue arrière ; ≈ 380 × 235 (x −70…310 ; caisse −220…−36, cabine jusqu'à −200, rampe de feux −226). À l'échelle du monde
   * de S7 (silhouette × 0,6, brancard × 0,5). Bande « RETTUNGSDIENST » (Kalam 20, aucun logo), deux roues (o.rot), rampe de
   * deux feux sur le toit (o.feu : 0 éteints · 1 · 2 = alternance blanc / jaune, JAMAIS de bleu), porte arrière (o.porte 0..1).
   * Parties : "caisse" · "roues" · "feux". Ancres (retournées si flip) : feux, porte, arriere, roueAr, roueAv. */
  D.rtw = (g, o = {}) => {
    const fp = o.flip ? -1 : 1, G = el("g", fp < 0 ? { transform: "scale(-1 1)" } : {}, g), C = U.ctx(G, 1401, false, 1), rot = o.rot || 0, pr = clamp(o.porte || 0, 0, 1), feu = o.feu || 0;
    if (partie(o, "caisse")) {
      el("ellipse", { cx: 120, cy: 3, rx: 200, ry: 8, fill: OMB }, G);
      if (pr > 0.02) fl(G, poly([[-70, -40], [-70, 0], [-70 - 120 * pr, 40], [-70 - 120 * pr, -10]]), YEL, { opacity: f(0.2 * pr) });
      const caisse = rr(-70, -220, 264, 186, 12), cab = "M194 -198 L236 -198 Q246 -197 252 -186 L276 -134 L300 -126 Q310 -122 310 -110 L310 -46 Q310 -36 300 -36 L194 -36 Z";
      ombre(G, caisse, 6, 0);
      U.shape(C, "cabine", cab, MAT.white, { sw: 2.8 });
      U.shape(C, "caisse", caisse, MAT.white, { sw: 2.8 });
      fl(G, "M-70 -122 L310 -122 L310 -98 L-70 -98 Z", "#E1E1DC"); ln(G, "M-70 -122 L310 -122 M-70 -98 L310 -98", 2, INK);
      for (let x = -60; x < 300; x += 16) ln(G, `M${x} -120 l10 20`, 1, "#A1A19B");
      tx(g, "RETTUNGSDIENST", 62 * fp, -103, 20, { halo: "#E1E1DC", hw: 5 });   // hors du groupe retourné : jamais en miroir
      U.shape(C, "vitreC", "M204 -188 L238 -188 L258 -140 L204 -140 Z", { base: "#EEF1F0", hatch: "#C4CBCE", gap: 6, fw: 0.8 }, { sw: 2.2 });
      ln(G, "M214 -180 L226 -150 M226 -182 L240 -152", 1.6, "#FFFFFF");
      U.shape(C, "vitreK", rr(112, -200, 52, 36, 6), { base: "#E4E7E6", hatch: "#B4B9BB", gap: 5, fw: 0.9 }, { sw: 2.2 });
      ln(G, "M100 -210 L100 -40 M176 -210 L176 -40", 1.6, "#77776F"); ln(G, "M198 -138 L198 -42 M262 -134 L262 -42", 1.4, "#77776F");
      el("rect", { x: 236, y: -88, width: 16, height: 5, rx: 2, fill: "#55524B" }, G); el("rect", { x: 158, y: -82, width: 14, height: 5, rx: 2, fill: "#55524B" }, G);
      U.shape(C, "retro", rr(250, -184, 8, 26, 3), MAT.mid, { sw: 1.8 });
      U.shape(C, "phareAv", rr(298, -96, 12, 16, 4), { base: "#FFF6C9" }, { sw: 1.8 });
      U.shape(C, "pare", rr(296, -50, 18, 14, 4), MAT.mid, { sw: 1.8 }); U.shape(C, "pareAr", rr(-76, -50, 22, 14, 4), MAT.mid, { sw: 1.8 });
      [0, 240].forEach((x) => fl(G, `M${x - 38} -36 A38 38 0 0 1 ${x + 38} -36 Z`, "#3A3A37"));
      U.shape(C, "rampe", rr(200, -208, 50, 9, 3), MAT.mid, { sw: 1.8 });
      ln(G, "M-70 -36 L310 -36", 2.4, INK);
      if (pr > 0.02) { const wv = 64 * pr; U.shape(C, "porteAr", rr(-70 - wv, -214, wv, 176, 4), MAT.white, { sw: 2.4 }); if (wv > 24) U.shape(C, "vitreAr", rr(-62 - wv * 0.85, -196, wv * 0.6, 40, 4), { base: "#E4E7E6" }, { sw: 1.8 });
        fl(G, rr(-70, -214, 6, 176, 2), "#FFF3C4"); }
      else ln(G, "M-62 -214 L-62 -40", 1.6, "#77776F");
    }
    if (partie(o, "feux")) [[212, -217], [238, -217]].forEach(([x, y], i) => { const on = (feu === 1 && i === 0) || (feu === 2 && i === 1);
      el("path", { d: `M${x - 10} ${y + 9} L${x - 10} ${y - 2} A10 10 0 0 1 ${x + 10} ${y - 2} L${x + 10} ${y + 9} Z`, fill: on ? YEL : feu ? "#FFFFFF" : "#E1E1DC", stroke: INK, "stroke-width": 2 }, G);
      if (on) el("circle", { cx: x, cy: y, r: 20, fill: YEL, opacity: 0.35 }, G); });
    if (partie(o, "roues")) [0, 240].forEach((x) => { el("circle", { cx: x, cy: -30, r: 30, fill: "#2E2C2A", stroke: INK, "stroke-width": 2 }, G); el("circle", { cx: x, cy: -30, r: 16, fill: "#E1E1DC", stroke: INK, "stroke-width": 2 }, G);
      for (let i = 0; i < 5; i++) { const a = rad(rot + i * 72); el("circle", { cx: f(x + 9 * Math.cos(a)), cy: f(-30 + 9 * Math.sin(a)), r: 2.2, fill: INK }, G); } });
    const X = (p) => [f(p[0] * fp), f(p[1])];
    return { feux: [X([212, -217]), X([238, -217])], porte: X([-70, -120]), arriere: X([-70, 0]), roueAr: X([0, -30]), roueAv: X([240, -30]) };
  };
  D.rtw.essais = [{ feu: 1 }, { flip: true, porte: 1, feu: 2, rot: 30 }];

  /* D12 — figurant SANS VISAGE : aplat hachuré (MAT.sil), tête ronde, corps, aucun trait de visage. Hauteur 300, ancrage = pieds.
   * o.pose : "marche" (o.ph 0..1 : phase du pas ; deux états suffisent : 0,25 et 0,75 — à 0 et 0,5 les pieds sont joints) ou "pousse" (penché, bras vers l'avant et
   * vers le bas, mains à l'ancre main : y caler la poignée du brancard). Profil tourné vers la droite ; o.flip = vers la gauche. */
  D.silhouette = (g, o = {}) => {
    const fp = o.flip ? -1 : 1, pousse = o.pose === "pousse", ph = o.ph || 0, s = Math.sin(TAU * ph), G = el("g", fp < 0 ? { transform: "scale(-1 1)" } : {}, g), C = U.ctx(G, 1411, false, 1);
    const lean = rad(pousse ? 14 : 3), hip = [0, -140], T = (p) => { const dx = p[0] - hip[0], dy = p[1] - hip[1]; return [hip[0] + dx * Math.cos(lean) - dy * Math.sin(lean), hip[1] + dx * Math.sin(lean) + dy * Math.cos(lean)]; };
    const jambe = (a, b) => { const k = [hip[0] + 72 * Math.sin(rad(a)), hip[1] + 72 * Math.cos(rad(a))]; return [hip, k, [k[0] + 70 * Math.sin(rad(a - b)), k[1] + 70 * Math.cos(rad(a - b))]]; };
    const bras = (sh, a, b) => { const e = [sh[0] + 56 * Math.sin(rad(a)), sh[1] + 56 * Math.cos(rad(a))]; return [sh, e, [e[0] + 52 * Math.sin(rad(a + b)), e[1] + 52 * Math.cos(rad(a + b))]]; };
    const JA = pousse ? jambe(-22, -4) : jambe(-20 * s, 6 + 12 * Math.max(0, s)), JB = pousse ? jambe(20, 8) : jambe(20 * s, 6 + 12 * Math.max(0, -s));
    const sh = T([4, -226]), BA = pousse ? bras(sh, 24, 40) : bras(sh, 22 * s, 18), BB = pousse ? bras(sh, 30, 36) : bras(sh, -22 * s, 18);
    const dy = -Math.max(JA[2][1], JB[2][1]); const S = (J) => J.map((p) => [p[0], p[1] + dy]);
    el("ellipse", { cx: 6, cy: 2, rx: 52, ry: 6, fill: OMB, opacity: 0.8 }, G);
    const H = el("g", { transform: `translate(0 ${f(dy)})` }, G), CH = U.ctx(H, 1412, false, 1);
    membre(CH, "jambeB", JB, [30, 24, 18], MAT.silD); el("ellipse", { cx: f(JB[2][0] + 8), cy: f(JB[2][1] - 4), rx: 15, ry: 7, fill: "#9A9A94", stroke: "#6E6E68", "stroke-width": 2 }, H);
    membre(CH, "brasB", BB, [20, 17, 15], MAT.silD);
    U.shape(CH, "torse", U.blob([T([-22, -138]), T([24, -138]), T([30, -200]), T([26, -230]), T([-22, -230]), T([-28, -200])], 0.9), MAT.sil, { sw: 2.4 });
    membre(CH, "jambeA", JA, [32, 26, 19], MAT.sil); el("ellipse", { cx: f(JA[2][0] + 8), cy: f(JA[2][1] - 4), rx: 15, ry: 7, fill: "#B9B9B3", stroke: "#6E6E68", "stroke-width": 2 }, H);
    const tc = T([8, -264]); ln(H, `M${pt(T([4, -232]))} L${pt(T([6, -240]))}`, 12, "#B9B9B3");
    U.shape(CH, "tete", cercle(tc[0], tc[1], 30), MAT.sil, { sw: 2.4 });
    membre(CH, "brasA", BA, [21, 18, 16], MAT.sil); el("circle", { cx: f(BA[2][0]), cy: f(BA[2][1]), r: 9, fill: "#DDDDD8", stroke: "#6E6E68", "stroke-width": 2 }, H);
    const X = (p) => [f(p[0] * fp), f(p[1] + dy)];
    return { main: X(BA[2]), tete: X(tc), h: f(-(tc[1] - 30 + dy)) };
  };
  D.silhouette.essais = [{ ph: 0.25 }, { ph: 0.75 }, { pose: "pousse" }, { pose: "pousse", flip: true }];

  /* ═══════════════════════════════ E. LE BOX (premières pièces, utiles dès S2 et S7) ═══════════════════════════════ */

  /* E5 — le lit d'observation / brancard, vu de côté, tête à GAUCHE. 440 × 180. Ancrage = sol, milieu ; dessus du matelas à −118.
   * Roues à frein, piètement en ciseaux, châssis, tête et pied de lit, matelas à bords ronds, oreiller (x −212…−104, sous la tête
   * du gisant : ancre tete = ancrage de D.gisant).
   * Parties : "lit" · "roues" (o.rot : elles tournent quand le lit roule, S16) · "barriere" (barrière latérale abaissée à mi-hauteur,
   * côté pied, x 30–210, DEVANT le garçon, avec le crochet de la planchette en (135, −144)). Ordre : roues, lit, [D.gisant], barriere. */
  D.brancard = (g, o = {}) => {
    const C = U.ctx(g, 1421, false, 1), rot = o.rot || 0;
    if (partie(o, "roues")) [-170, 170].forEach((x) => { ln(g, `M${x} -34 L${x} -22`, 4, INK);
      el("circle", { cx: x, cy: -13, r: 13, fill: "#3A3A37", stroke: INK, "stroke-width": 2 }, g); el("circle", { cx: x, cy: -13, r: 5, fill: "#E1E1DC", stroke: INK, "stroke-width": 1.4 }, g);
      const a = rad(rot); ln(g, `M${f(x + 6 * Math.cos(a))} ${f(-13 + 6 * Math.sin(a))} L${f(x + 11 * Math.cos(a))} ${f(-13 + 11 * Math.sin(a))}`, 2, "#E1E1DC");
      el("rect", { x: x + 12, y: -30, width: 12, height: 6, rx: 2, fill: "#55524B", stroke: INK, "stroke-width": 1.2 }, g); });
    if (partie(o, "lit")) {
      el("ellipse", { cx: 8, cy: 3, rx: 214, ry: 7, fill: OMB }, g);
      U.shape(C, "base", rr(-196, -38, 392, 10, 4), MAT.grey, { sw: 2.2 });
      ln(g, "M-120 -32 L120 -94 M-120 -94 L120 -32", 7, INK); ln(g, "M-120 -32 L120 -94 M-120 -94 L120 -32", 2.6, "#E1E1DC");
      el("circle", { cx: 0, cy: -63, r: 5, fill: "#E1E1DC", stroke: INK, "stroke-width": 2 }, g);
      U.shape(C, "chassis", rr(-216, -102, 432, 12, 4), MAT.grey, { sw: 2.4 });
      U.shape(C, "tete", rr(-228, -180, 14, 92, 5), MAT.mid, { sw: 2.2 });
      U.shape(C, "pied", rr(214, -152, 14, 64, 5), MAT.mid, { sw: 2.2 });
      U.shape(C, "matelas", rr(-212, -120, 424, 22, 10), MAT.white, { sw: 2.6 });
      ln(g, "M-200 -105 L198 -105", 1.2, "#C9C9C3");
      U.shape(C, "oreiller", "M-212 -118 C-214 -140 -200 -148 -160 -148 C-120 -148 -104 -140 -104 -124 C-104 -118 -110 -116 -116 -118 L-206 -118 Z", MAT.white, { sw: 2.4 });
      ln(g, "M-190 -134 q20 6 46 -2", 1.4, "#B4B4AE");
    }
    if (partie(o, "barriere")) {
      ombre(g, rr(30, -146, 180, 8, 3), 3, 4);
      U.shape(C, "barre", rr(30, -146, 180, 8, 3), MAT.grey, { sw: 2 });
      [40, 120, 200].forEach((x) => ln(g, `M${x} -138 L${x} -100`, 3.4, "#55524B"));
      ln(g, "M135 -146 L135 -152 Q135 -158 142 -156", 2.6, INK);
    }
    return { matelas: -120, oreiller: [-158, -134], crochet: [135, -150], tete: [-203, -118], roues: [[-170, -13], [170, -13]], tetiere: [-221, -180] };
  };
  D.brancard.essais = [{}, { part: "barriere" }];

  /* E10 (début) — accessoires de S2. D.styloChignon (ancre top de DOC, vue de face ou de trois-quarts) : le stylo JAUNE planté en
   * biais dans le chignon, des mèches par-dessus (o.flip = penché dans l'autre sens) ; elle le tire en S9. D.masqueCou (ancre neck,
   * ou, pour une tête Persona.head seule, le point (0, 54) de la tête) : masque chirurgical baissé SOUS le menton (+12…+48 sous
   * l'ancre, qui est à hauteur de bouche), deux élastiques
   * qui remontent vers les oreilles. Ancres : pointe (stylo). */
  D.styloChignon = (g, o = {}) => {
    const fp = o.flip ? -1 : 1, G = el("g", { transform: `scale(${fp} 1) translate(0 -12) rotate(-24)` }, g);
    fl(G, rr(-29, -5, 48, 10, 4), YEL, { stroke: INK, "stroke-width": 2 });
    fl(G, "M19 -4.5 L29 0 L19 4.5 Z", "#F4F4EE", { stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" }); el("circle", { cx: 28, cy: 0, r: 1.4, fill: INK }, G);
    fl(G, rr(-31, -5, 6, 10, 2), "#3A3A37"); ln(G, "M-20 -5 L2 -5 L2 -1", 2, "#3A3A37");
    ln(G, "M-6 -10 q4 10 -1 20 M3 -10 q-4 10 2 20", 2.4, "#232321");
    const a = rad(-24); return { pointe: [f(fp * 28 * Math.cos(a)), f(-12 + 28 * Math.sin(a))] };
  };
  D.masqueCou = (g, o = {}) => {
    const C = U.ctx(g, 1431, false, 1);
    ln(g, "M-30 24 C-42 6 -50 -20 -52 -44 M30 24 C42 6 50 -20 52 -44", 1.8, "#77776F");
    U.shape(C, "masque", "M-32 18 C-14 12 14 12 32 18 L30 40 C12 48 -12 48 -30 40 Z", { base: "#EEF0EE", hatch: "#C9CCCA", gap: 5, fw: 0.9 }, { sw: 2.2, r: 0.4 });
    ln(g, "M-26 25 L26 25 M-24 32 L24 32", 1.3, "#A1A19B");
    return {};
  };

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
