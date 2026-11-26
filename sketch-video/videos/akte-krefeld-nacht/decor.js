/* decor.js — AKTE 05 (Krefeld, « بوحدهم فالليل ») — décors et objets PROPRES à l'épisode, 1re partie.
 * Aucun dessin repris d'un autre épisode. Suite dans decor-2.js et decor-3.js (mêmes conventions).
 * Essai de chaque dessin, seul, sur une planche : node tools/essai_decor.mjs videos/akte-krefeld-nacht --cols 2 --cell 540 --per 6 [--only nom1,nom2]
 *   (avec les réglages par défaut, 4 colonnes × 500 = 2000 px : la page fait 1080 px de large, les colonnes 3 et 4 sont ROGNÉES)
 *   D.nom.essais = [{ … }, { … }] : jeux de paramètres montrés sur la planche (états 0 / 1, allumé / éteint…).
 * Convention : chaque fonction dessine dans le groupe SVG g, autour de son point d'ancrage (0,0), reçoit ses paramètres
 * animés dans o (valeurs ARRONDIES par la scène : c.sk ne redessine que si o change) et renvoie des ancres (node.out).
 * Trait à main levée U.ctx / U.shape / U.stroke ; ombre décalée #D2D2CB ; bleu nuit #2F3A66 en HACHURES seulement.
 * Les grands décors (façade, coupe, salle) sont STATIQUES (m.obj) ; ce qui change vit dans de petits nœuds à part,
 * ou dans des éléments simples renvoyés par la fonction (les 105 vitres, les battants de la porte, la lampe).
 * Outils partagés avec decor-2.js / decor-3.js : window.EpDecor.outils (hachNuit, rect, circ, ombre, couleurs…).
 *
 * INVENTAIRE COMPLET (storyboard § 2) — état après l'étape « socle et décors 1 »
 * A. Ciel et tableau de bord (repère ÉCRAN, calque c.hud)
 *    bandeauNuit ........ fait (decor.js)      lune ............... fait (decor.js)      etoile ........... fait (decor.js)
 *    nuageNuit .......... fait (decor.js)      horloge ............ fait (decor.js)      jauge ............ fait (decor.js)
 *    eclatFenetre ....... fait (decor.js)
 * B. Façade (accroche)
 *    facade ............. fait (decor.js)      enseigneToit ....... fait (decor.js)      trottoir ......... fait (decor.js)
 *    feuilleJugement .... fait (decor.js) — petite ET grande (o.big, S21)
 * C. Pièces de nuit et objets communs
 *    salleNuit .......... fait (decor.js)      fenetreNuit ........ fait (decor.js)      tacheLumiere ..... fait (decor.js)
 *    plafonnier ......... fait (decor.js)      silhouetteSoignant . fait (decor.js)      lecteur .......... fait (decor.js)
 *    loupe .............. fait (decor.js)      biper .............. fait (decor.js)      etiquetteQui ..... fait (decor.js)
 * D. La coupe de l'hôpital
 *    coupe .............. fait (decor.js)      lueurPiece ......... fait (decor.js)      litMini .......... fait (decor.js)
 *    moniteurMini ....... fait (decor.js)      rufanlage .......... fait (decor.js)      panneauEtage ..... fait (decor.js)
 *    ambulance .......... fait (decor.js)      brancardMini ....... fait (decor.js)      chariotMini ...... fait (decor.js)
 *    jaugeMurale ........ fait (decor.js)      tabouretMini ....... fait (decor.js)      trace ............ fait (decor.js)
 *    rideauRoulant ...... fait (decor.js) — AJOUT (absent de l'inventaire : le rideau de la Liegendanfahrt se lève en S7, S10)
 * E. Urgences (S8, S9)
 *    portesBattantes · lampeExamen · armoireMur · chariotUrgence · rideauBox · brancard · gisant · potence · seringue ·
 *    protocole ......................................................................................... à faire
 * F. Chambre du patient (S12, S15)
 *    litHopital · tableChevet · tubeLabo · porteChambre ................................................ à faire
 * G. Poste de nuit, téléphone, formulaire (S13, S23, S24)
 *    telephoneMural · combine · cordon · listeGarde · cadreAbsent · mainPOV · stylo · formulaire · casierMural ·
 *    planchette ........................................................................................ à faire
 * H. Tribunal (S16–S21, S26)
 *    salleAudience · fenetreHaute · suspension · estrade · tableDefense · chaiseDos · dos · barre · dossierCarte ·
 *    tableBois · sachetPreuve · chemise · chevalet · schemaHopital · baguette · ailes · aureole · billet · porteSalle
 *    ................................................................................................... à faire
 * I. Règle médicale (S22)
 *    regle · tubeSang · cadranHoraire · caseEtage · pictoMedecin ....................................... à faire
 * J. Intro et carte
 *    badge .............. fait (decor.js)      pinFenetre ......... fait (decor.js)      fenetreVille ..... fait (decor.js)
 *    coupure ............ fait (decor.js)
 * (D.exemple : reste du gabarit, utilisé par les scènes d'exemple de scenes-1.js — à supprimer avec elles.)
 */
(function () {
  "use strict";
  const SC = SketchCast, U = SC.util, NS = "http://www.w3.org/2000/svg";
  const MAT = Object.assign({}, SC.MAT, (window.Persona && Persona.MAT) || {});
  const INK = "#1C1A1C", YEL = "#F8CE4E", NUIT = "#2F3A66", OMB = "#D2D2CB", PAP = "#F7F7F1";
  const VITRE = "#E3E6EA", MUR1 = "#F6F1DE", MUR0 = "#ECEEF2", GRIS = "#9A9A94";
  const CUT = { base: "#C9C9C3", hatch: "#55554F", gap: 3.4, fw: 1.1 };                 // matière coupée (murs, dalles)
  const el = (tag, a, p) => { const n = document.createElementNS(NS, tag); for (const k in a || {}) if (a[k] != null) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; };
  const D = window.EpDecor = window.EpDecor || {};
  const f = (v) => Math.round(v * 10) / 10, clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, t) => a + (b - a) * t, rad = (a) => a * Math.PI / 180;
  const hsh = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const ln = (g, d, w, c, a) => el("path", Object.assign({ d, fill: "none", stroke: c || INK, "stroke-width": w || 2, "stroke-linecap": "round", "stroke-linejoin": "round" }, a || {}), g);
  const rr = U.rrect;
  const rect = (x, y, w, h) => `M${f(x)} ${f(y)} L${f(x + w)} ${f(y)} L${f(x + w)} ${f(y + h)} L${f(x)} ${f(y + h)} Z`;
  const circ = (cx, cy, r) => `M${f(cx - r)} ${f(cy)} A${f(r)} ${f(r)} 0 1 1 ${f(cx + r)} ${f(cy)} A${f(r)} ${f(r)} 0 1 1 ${f(cx - r)} ${f(cy)} Z`;
  const poly = (pts) => "M" + pts.map((p) => f(p[0]) + " " + f(p[1])).join(" L") + " Z";
  const ombre = (g, d, dx, dy) => el("path", { d, fill: OMB, transform: `translate(${dx == null ? 6 : dx} ${dy == null ? 7 : dy})` }, g);
  const mixc = (a, b, t) => "#" + [1, 3, 5].map((i) => Math.round(lerp(parseInt(a.substr(i, 2), 16), parseInt(b.substr(i, 2), 16), clamp(t, 0, 1))).toString(16).padStart(2, "0")).join("");
  const star4 = (cx, cy, r, k) => { let d = ""; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, q = i % 2 ? r * (k || 0.36) : r; d += (i ? " L" : "M") + f(cx + Math.sin(a) * q) + " " + f(cy - Math.cos(a) * q); } return d + " Z"; };
  let uid = 0;

  /* Hachures bleu nuit à −41° dans un rectangle : UN seul <path> léger (pas de rough, se redessine vite).
   * o = { gap (écart perpendiculaire), sw, op, seed, skip (un trait sur n), col } */
  function hachNuit(g, x, y, w, h, o) {
    o = Object.assign({ gap: 18, sw: 1.8, op: 1, seed: 1, col: NUIT, skip: 1 }, o);
    const a = rad(41), ux = Math.cos(a), uy = -Math.sin(a), nx = Math.sin(a), ny = Math.cos(a);
    const cs = [x * nx + y * ny, (x + w) * nx + y * ny, x * nx + (y + h) * ny, (x + w) * nx + (y + h) * ny];
    const c0 = Math.min.apply(null, cs), c1 = Math.max.apply(null, cs); let d = "", i = 0;
    for (let c = c0 + o.gap * 0.6; c < c1; c += o.gap, i++) {
      if (o.skip > 1 && i % o.skip) continue;
      const px = c * nx, py = c * ny;                                                  // P = c·n + s·u, découpé par le rectangle
      const ax = [(x - px) / ux, (x + w - px) / ux], ay = [(y - py) / uy, (y + h - py) / uy];
      let s0 = Math.max(Math.min(ax[0], ax[1]), Math.min(ay[0], ay[1])), s1 = Math.min(Math.max(ax[0], ax[1]), Math.max(ay[0], ay[1]));
      if (s1 - s0 < 10) continue;
      s0 += hsh(i * 3.1 + o.seed) * 5; s1 -= hsh(i * 7.7 + o.seed) * 5;
      const xa = px + s0 * ux, ya = py + s0 * uy, xb = px + s1 * ux, yb = py + s1 * uy, k = (hsh(i * 1.3 + o.seed) - 0.5) * 3;
      d += `M${f(xa)} ${f(ya)} Q${f((xa + xb) / 2 + k * nx)} ${f((ya + yb) / 2 + k * ny)} ${f(xb)} ${f(yb)} `;
    }
    return d ? ln(g, d, o.sw, o.col, { opacity: o.op }) : null;
  }
  D.outils = { el, ln, f, clamp, lerp, rad, hsh, rect, circ, poly, ombre, mixc, star4, hachNuit, MAT, CUT, INK, YEL, NUIT, OMB, PAP, VITRE, MUR1, MUR0, GRIS };

  /* ═════════════════════ A. CIEL ET TABLEAU DE BORD (repère ÉCRAN, calque c.hud) ═════════════════════ */

  // Bandeau de nuit : papier OPAQUE écran 0–1080 × 0–540 (il cache le décor qui passe dessous) + hachures bleu nuit à −41°
  // en trois rangs (256–350 serré, –450 un trait sur deux, –520 un sur quatre) + bord bas déchiré. Ancrage : coin haut-gauche.
  D.bandeauNuit = (g) => {
    const W = 1080, Y = 540, K = 1 / Math.tan(rad(41)), bord = [];
    for (let x = -12; x <= W + 12; x += 27) bord.push([x, Y + (hsh(x * 0.731) - 0.5) * 8]);
    const lb = bord.map((p) => f(p[0]) + " " + f(p[1]));
    el("path", { d: `M-12 -60 L${W + 12} -60 L` + lb.slice().reverse().join(" L") + " Z", fill: PAP }, g);
    let d = "";
    for (let i = 0, xt = -30; xt < W + 320; xt += 26, i++) {
      const yEnd = (i % 4 === 0 ? 520 : i % 2 === 0 ? 450 : 350) + (hsh(i * 2.3) - 0.5) * 14;
      let ya = 256 + hsh(i * 5.1) * 7, yb = yEnd;
      if (xt > W + 4) ya = Math.max(ya, 256 + (xt - W - 4) / K);                       // la hachure entre par le bord droit
      if (xt - (yb - 256) * K < -4) yb = 256 + (xt + 4) / K;                           // … ou sort par le bord gauche
      if (yb - ya < 14) continue;
      const xa = xt - (ya - 256) * K, xb = xt - (yb - 256) * K, k = (hsh(i * 9.7) - 0.5) * 4;
      d += `M${f(xa)} ${f(ya)} Q${f((xa + xb) / 2 + k)} ${f((ya + yb) / 2 + k)} ${f(xb)} ${f(yb)} `;
    }
    ln(g, d, 2.4, NUIT);
    ln(g, "M" + lb.join(" L"), 2, NUIT);                                               // bord bas déchiré
    let t = "";
    for (let x = 14, i = 0; x < W; x += 30 + hsh(i * 4.4) * 26, i++) { const yy = Y + (hsh(x * 0.731) - 0.5) * 6 - 3, L = 7 + hsh(i * 6.1) * 9; t += `M${f(x)} ${f(yy)} L${f(x + L * 0.75)} ${f(yy - L * 0.66)} `; }
    ln(g, t, 1.6, NUIT);
    return { bas: Y, haut: 256 };
  };

  // Lune : disque papier r 30 cerné d'encre, croissant d'ombre en hachures bleu nuit (tiers droit), halo jaune (o.halo 0–1). Ancrage : centre.
  D.lune = (g, o = {}) => {
    const C = U.ctx(g, 702, false, 1), r = o.r || 30, halo = o.halo == null ? 0.25 : o.halo;
    el("circle", { cx: 0, cy: 0, r: f(r + 9), fill: YEL, opacity: f(halo * 0.5) }, g);
    el("circle", { cx: 0, cy: 0, r: f(r + 14), fill: "none", stroke: YEL, "stroke-width": 6, opacity: f(halo) }, g);
    U.shape(C, "disque", circ(0, 0, r), { base: "#FEFEFA" }, { sw: 2.6, r: 0.6 });
    const tx = f(r * 0.3), ty = f(r * 0.95);
    U.shape(C, "ombre", `M${tx} ${-ty} A${r} ${r} 0 0 1 ${tx} ${ty} A${f(r * 1.7)} ${f(r * 1.7)} 0 0 0 ${tx} ${-ty} Z`, { hatch: NUIT, gap: 4.6, fw: 1.3 }, { noStroke: true });
    ln(g, `M${tx} ${-ty} A${f(r * 1.7)} ${f(r * 1.7)} 0 0 1 ${tx} ${ty}`, 1.3, NUIT);
    [[-0.42, -0.3, 0.16], [-0.2, 0.36, 0.11], [-0.56, 0.2, 0.08]].forEach(([x, y, k]) => el("circle", { cx: f(x * r), cy: f(y * r), r: f(k * r), fill: "none", stroke: "#B9B9B2", "stroke-width": 1.4 }, g));
    return { r };
  };
  D.lune.essais = [{ halo: 0.15 }, { halo: 0.35 }];

  // Étoile à 4 branches (encre, cœur jaune) — r 9, ancrage : centre. La scène fait scintiller l'échelle du nœud.
  D.etoile = (g, o = {}) => {
    const r = o.r || 9;
    el("path", { d: star4(0, 0, r, 0.34), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" }, g);
    el("circle", { cx: 0, cy: 0, r: f(Math.max(2, r * 0.26)), fill: YEL }, g);
    return { r };
  };

  // Nuage de nuit : trait bleu nuit, 3 bosses, 4 hachures — 120 × 36, ancrage : centre (papier opaque : il masque les hachures du ciel).
  D.nuageNuit = (g) => {
    const d = "M-52 17 C-64 17 -64 2 -50 1 C-52 -12 -30 -18 -22 -7 C-16 -21 14 -21 20 -7 C30 -15 52 -10 49 3 C62 3 62 17 52 17 Z";
    el("path", { d, fill: PAP, stroke: NUIT, "stroke-width": 2.2, "stroke-linejoin": "round" }, g);
    ln(g, "M-38 13 L-28 3 M-14 13 L-2 1 M10 13 L22 1 M32 13 L41 4", 1.6, NUIT);
    return { w: 120, h: 36 };
  };

  // Horloge SANS chiffres : 12 traits identiques, cadran penché de −14° (aucun « 12 »), clou + fil. Ancrage : centre, r 50.
  //   o.h = angle de la petite aiguille (° dans le sens horaire, repère du cadran) ; grande aiguille = 12 · o.h
  //   o.wedge = [a0, a1] secteur jaune balayé par un saut (o.wedgeOp, défaut 0,55) · o.stop = aiguilles grises
  D.horloge = (g, o = {}) => {
    const C = U.ctx(g, 710, false, 1), r = o.r || 50, h = o.h == null ? 290 : o.h, col = o.stop ? GRIS : INK;
    ln(g, `M0 ${-r - 24} L${f(-r * 0.45)} ${f(-r * 0.86)} M0 ${-r - 24} L${f(r * 0.45)} ${f(-r * 0.86)}`, 1.6, "#6E6E68");   // fil
    el("circle", { cx: 0, cy: -r - 24, r: 4.2, fill: INK }, g);                                                               // clou
    el("circle", { cx: 5, cy: 6, r, fill: OMB }, g);
    const k = el("g", { transform: "rotate(-14)" }, g), K = U.ctx(k, 711, false, 1);
    U.shape(K, "couronne", circ(0, 0, r), MAT.grey, { sw: 2.6, r: 0.5, gap: 4 });
    U.shape(K, "face", circ(0, 0, r - 9), MAT.white, { sw: 2, r: 0.5 });
    if (o.wedge) {
      const a0 = o.wedge[0], a1 = o.wedge[1], R = r - 12, p = (a) => `${f(Math.sin(rad(a)) * R)} ${f(-Math.cos(rad(a)) * R)}`;
      if (Math.abs(a1 - a0) > 0.5) el("path", { d: `M0 0 L${p(a0)} A${R} ${R} 0 ${Math.abs(a1 - a0) % 360 > 180 ? 1 : 0} ${a1 > a0 ? 1 : 0} ${p(a1)} Z`, fill: YEL, opacity: o.wedgeOp == null ? 0.55 : o.wedgeOp }, k);
    }
    let t = "";
    for (let i = 0; i < 12; i++) { const a = rad(i * 30), s = Math.sin(a), c = -Math.cos(a); t += `M${f(s * (r - 19))} ${f(c * (r - 19))} L${f(s * (r - 12.5))} ${f(c * (r - 12.5))} `; }
    ln(k, t, 2.4, INK);
    const hand = (a, L, w, back) => ln(k, `M${f(-Math.sin(rad(a)) * back)} ${f(Math.cos(rad(a)) * back)} L${f(Math.sin(rad(a)) * L)} ${f(-Math.cos(rad(a)) * L)}`, w, col);
    hand(h * 12, r * 0.6, 2.8, 6); hand(h, r * 0.4, 5, 4);
    el("circle", { cx: 0, cy: 0, r: 4.6, fill: o.stop ? "#DADAD5" : YEL, stroke: col, "stroke-width": 1.8 }, k);
    return { r, clou: [0, -r - 24] };
  };
  D.horloge.essais = [{ h: 290 }, { h: 350, wedge: [290, 350] }, { h: 470, stop: 1 }];

  // Jauge de sucre (thermomètre SANS chiffres) : tube 24 × o.h (défaut 182), réservoir r 20. Ancrage : centre du réservoir ;
  // haut du tube = −(12 + o.h). o.level 0–1 (liquide JAUNE) · o.pulse 0–1 (le liquide gonfle) · o.grey 0–1 (il se décolore)
  // accolade « normal » entre 18 % et 32 % de la hauteur (o.normal = false pour la retirer).
  D.jauge = (g, o = {}) => {
    const C = U.ctx(g, 720, false, 1), H = o.h || 182, lv = clamp(o.level == null ? 0.5 : o.level, 0, 1), pu = o.pulse || 0, gr = o.grey || 0;
    const top = -(12 + H), tw = 12, R = 20, a = 16, yb = -12, yt = top + 9, yL = lerp(yb, yt, lv);
    const liq = mixc(YEL, "#CFCFC8", gr), liq2 = mixc("#E3AE2C", "#9A9A94", gr), hw = 6.5 + 1.2 * pu;   // ≤ 7,7 : reste à l'écart du reflet (x −9)
    const verre = `M${-tw} ${top + tw} A${tw} ${tw} 0 0 1 ${tw} ${top + tw} L${tw} ${-a} A${R} ${R} 0 1 1 ${-tw} ${-a} Z`;
    ombre(g, verre, 6, 6);
    el("path", { d: verre, fill: "#FFFFFF" }, g);
    el("circle", { cx: 0, cy: 0, r: f(R - 5.5 + 1.6 * pu), fill: liq }, g);
    el("path", { d: `M${f(-hw)} 2 L${f(-hw)} ${f(yL)} Q0 ${f(yL - 5)} ${f(hw)} ${f(yL)} L${f(hw)} 2 Z`, fill: liq }, g);
    ln(g, `M${f(hw - 2.4)} -4 L${f(hw - 2.4)} ${f(yL + 4)}`, 2, liq2);                                   // ombre du liquide
    let t = ""; for (let i = 1; i <= 9; i++) { const y = lerp(yb, yt, i / 10); t += `M${-tw - (i % 5 === 0 ? 10 : 7)} ${f(y)} L${-tw - 3} ${f(y)} `; }
    ln(g, t, 1.5, "#77776F");                                                                           // graduations muettes
    U.shape(C, "verre", verre, {}, { sw: 2.6, r: 0.5 });
    ln(g, `M${-tw + 3} ${top + 16} L${-tw + 3} ${f(lerp(top + 16, -30, 0.55))}`, 2, "#FFFFFF");           // reflets du verre (hors du liquide)
    ln(g, "M-12 -3 A13 13 0 0 1 -4 -12", 2.4, "#FFFFFF");
    if (o.normal !== false) {
      const y1 = yb - 0.18 * H, y2 = yb - 0.32 * H, ym = (y1 + y2) / 2, x = tw + 5;
      ln(g, `M${x} ${f(y1)} Q${x + 6} ${f(y1)} ${x + 6} ${f(y1 - 5)} L${x + 6} ${f(ym + 4)} Q${x + 6} ${f(ym)} ${x + 11} ${f(ym)} Q${x + 6} ${f(ym)} ${x + 6} ${f(ym - 4)} L${x + 6} ${f(y2 + 5)} Q${x + 6} ${f(y2)} ${x} ${f(y2)}`, 2, INK);
      U.text(g, "normal", x + 15, f(ym + 6), 18, { anchor: "start" });
    }
    return { haut: [0, top], niveau: [0, f(yL)], normal: [tw + 20, f(yb - 0.25 * H)] };
  };
  D.jauge.essais = [{ level: 0.12 }, { level: 0.93 }, { level: 0.93, pulse: 1 }, { level: 0.93, grey: 1 }, { h: 300, level: 0.95 }];

  // Éclat de transition : fenêtre de lumière jaune 300 × 360 à croisillon (4 carreaux). Ancrage : centre.
  D.eclatFenetre = (g) => {
    [[-150, -180], [8, -180], [-150, 8], [8, 8]].forEach(([x, y]) => el("rect", { x, y, width: 142, height: 172, rx: 14, fill: YEL }, g));
    return { w: 300, h: 360 };
  };

  /* ═════════════════════ B. FAÇADE (accroche) ═════════════════════ */

  // Immeuble fermé, 750 × 760, ancrage : bas-centre (posé en monde (525, 1380)). 15 × 7 vitres 34 × 52 (pas 48 × 76) :
  // local x = −354 + 48 c, y = −724 + 76 r. Chaque vitre est un <rect> simple : la scène change son « fill » dans c.tick.
  // Renvoie { wins: [105 rect, ligne par ligne], idx(c, r), door: [-15, 0], ouvrir(k 0–1) (battants), lampe: <g> (auvent),
  //           lampePos: [-15, -197], ON, OFF }.   Chiffres « 7500 » : D.facade.CHIFFRES = [[c, r], …] (42 vitres).
  D.facade = (g, o = {}) => {
    const C = U.ctx(g, 730, false, 1), wins = [];
    el("path", { d: rect(-365, -734, 750, 734), fill: OMB }, g);                                        // ombre portée, à droite
    U.shape(C, "corps", rect(-375, -742, 750, 742), { base: "#FFFFFF", hatch: "#E9E9E3", gap: 17, fw: 0.9 }, { sw: 3 });
    ombre(g, rect(-387, -760, 774, 18), 6, 5);
    U.shape(C, "toit", rect(-387, -760, 774, 18), MAT.mid, { sw: 2.6 });
    U.stroke(C, "corniche", "M-374 -733 L374 -733", { sw: 1.8 });
    ln(g, "M362 -740 L362 -204 M368 -740 L368 -204", 1.4, "#77776F");                                  // descente d'eau
    let lignes = "", appuis = "", croix = "";
    for (let r = 0; r < 7; r++) lignes += `M-372 ${-724 + 76 * r + 65} L358 ${-724 + 76 * r + 65} `;
    ln(g, lignes, 1.1, "#C9C9C2");
    const gw = el("g", {}, g);
    for (let r = 0; r < 7; r++) for (let c = 0; c < 15; c++) {
      const x = -354 + 48 * c, y = -724 + 76 * r;
      wins.push(el("rect", { x, y, width: 34, height: 52, rx: 2, fill: VITRE, stroke: INK, "stroke-width": 2 }, gw));
      appuis += `M${x - 4} ${y + 56} L${x + 38} ${y + 56} `;
      croix += `M${x + 17} ${y + 2} L${x + 17} ${y + 50} M${x + 2} ${y + 19} L${x + 32} ${y + 19} `;
    }
    ln(g, appuis, 3, INK); ln(g, croix, 1.3, INK, { opacity: 0.4 });
    // rez-de-chaussée (192 px)
    U.shape(C, "bandeau", rect(-375, -202, 750, 10), MAT.mid, { sw: 2 });
    [[-352, 220], [100, 252]].forEach(([x, w], i) => {                                                  // deux vitrines sombres
      U.shape(C, "vitrine" + i, rect(x, -166, w, 128), { base: "#DADDE4", hatch: NUIT, gap: 10, fw: 1.3 }, { sw: 2.6 });
      ln(g, `M${x + 22} -54 L${x + 62} -150 M${x + 46} -54 L${x + 74} -122`, 3, "#FFFFFF", { opacity: 0.85 });
      U.shape(C, "appui" + i, rect(x - 5, -38, w + 10, 8), MAT.white, { sw: 2 });
    });
    el("path", { d: rect(-88, -188, 146, 188), fill: MUR1 }, g);                                        // hall éclairé derrière la porte
    ln(g, "M-88 -30 L58 -30", 1.4, "#CFC59E");
    const bL = el("g", {}, g), bR = el("g", {}, g);                                                     // battants vitrés
    [[bL, -88, 62], [bR, -15, 11]].forEach(([b, x, hx]) => {
      el("rect", { x, y: -186, width: 73, height: 186, fill: "#EEF2F5", "fill-opacity": 0.92, stroke: INK, "stroke-width": 2.4 }, b);
      ln(b, `M${x + 14} -64 L${x + 34} -160`, 3, "#FFFFFF");
      ln(b, `M${x + hx} -112 L${x + hx} -78`, 4.2, INK);
    });
    const ouvrir = (k) => { const s = f(1 - 0.82 * clamp(k, 0, 1)); bL.setAttribute("transform", `translate(-88 0) scale(${s} 1) translate(88 0)`); bR.setAttribute("transform", `translate(58 0) scale(${s} 1) translate(-58 0)`); };
    if (o.open) ouvrir(o.open);
    U.stroke(C, "porte", "M-90 0 L-90 -190 L60 -190 L60 0", { sw: 3.4 });
    ombre(g, rect(-128, -216, 226, 14), 5, 6);
    U.shape(C, "auvent", rect(-128, -216, 226, 14), MAT.grey, { sw: 2.6 });
    ln(g, "M-118 -216 L-98 -244 M88 -216 L68 -244", 2, INK);                                            // tirants de l'auvent
    const lampe = el("g", {}, g);
    el("path", { d: "M-26 -200 L-4 -200 L58 0 L-88 0 Z", fill: YEL, opacity: 0.14 }, lampe);
    el("circle", { cx: -15, cy: -197, r: 6, fill: "#FFF3B8", stroke: INK, "stroke-width": 1.8 }, lampe);
    U.shape(C, "plinthG", rect(-375, -24, 283, 24), MAT.mid, { sw: 2.2 });
    U.shape(C, "plinthD", rect(62, -24, 313, 24), MAT.mid, { sw: 2.2 });
    U.shape(C, "sonnette", rr(70, -120, 15, 32, 3), MAT.white, { sw: 1.8 });
    [-112, -104, -96].forEach((y) => el("circle", { cx: 77.5, cy: y, r: 2, fill: INK }, g));
    if (o.chiffres) D.facade.CHIFFRES.forEach(([c, r]) => wins[r * 15 + c].setAttribute("fill", YEL));
    return { wins, idx: (c, r) => r * 15 + c, door: [-15, 0], ouvrir, lampe, lampePos: [-15, -197], ON: YEL, OFF: VITRE };
  };
  // « 7500 » : 4 chiffres de 3 × 5 vitres sur les rangs 1 à 5, colonnes 0–2 · 4–6 · 8–10 · 12–14 (42 vitres)
  D.facade.CHIFFRES = (() => {
    const M = { 7: "111001001001001", 5: "111100111001111", 0: "111101101101111" }, out = [];
    [7, 5, 0, 0].forEach((ch, n) => { for (let i = 0; i < 15; i++) if (M[ch][i] === "1") out.push([n * 4 + (i % 3), 1 + Math.floor(i / 3)]); });
    return out;
  })();
  D.facade.essais = [{}, { chiffres: true, open: 1 }];

  // Enseigne du toit : « KRANKENHAUS » (mot générique, AUCUN nom d'hôpital) sur un rail 300 × 30, croix jaune (o.on 0–1),
  // antenne de 30 px avec voyant (o.blink). 420 × 34, ancrage : coin bas-gauche (posé en monde (250, 620)).
  D.enseigneToit = (g, o = {}) => {
    const C = U.ctx(g, 740, false, 1), on = o.on == null ? 1 : clamp(o.on, 0, 1);
    ln(g, "M22 0 L22 -5 M278 0 L278 -5 M150 0 L150 -5", 3, INK);
    ombre(g, rr(0, -34, 300, 29, 3), 4, 4);
    U.shape(C, "rail", rr(0, -34, 300, 29, 3), MAT.white, { sw: 2.2, r: 0.6 });
    U.text(g, "KRANKENHAUS", 150, -10.5, 26, { ls: 2.5 });
    const cx = 336, cy = -19, a = 5.5, b = 15, croix = `M${cx - a} ${cy - b} L${cx + a} ${cy - b} L${cx + a} ${cy - a} L${cx + b} ${cy - a} L${cx + b} ${cy + a} L${cx + a} ${cy + a} L${cx + a} ${cy + b} L${cx - a} ${cy + b} L${cx - a} ${cy + a} L${cx - b} ${cy + a} L${cx - b} ${cy - a} L${cx - a} ${cy - a} Z`;
    ln(g, `M${cx} 0 L${cx} -4`, 3, INK);
    el("path", { d: croix, fill: OMB, transform: "translate(3 3)" }, g);
    el("path", { d: croix, fill: "#E4E4DE" }, g);
    el("path", { d: croix, fill: YEL, opacity: f(on) }, g);
    U.shape(C, "croix", croix, {}, { sw: 2, r: 0.5 });
    ln(g, "M396 0 L396 -30 M390 -12 L402 -12 M392.5 -21 L399.5 -21", 2.2, INK);                         // antenne
    if (o.blink) el("circle", { cx: 396, cy: -31, r: 8, fill: YEL, opacity: 0.4 }, g);
    el("circle", { cx: 396, cy: -31, r: 3.6, fill: o.blink ? YEL : "#6E6E68", stroke: INK, "stroke-width": 1.4 }, g);
    return { croix: [cx, cy], voyant: [396, -31] };
  };
  D.enseigneToit.essais = [{ on: 1, blink: 1 }, { on: 0 }];

  // Trottoir : bande 850 × 30 (bordure comprise), ancrage : coin haut-gauche (posé en monde (110, 1380)).
  //   o.sol (défaut true) : la bande et sa bordure — à poser AVANT la façade / la coupe.
  //   o.mobilier (défaut true) : 2 potelets, un banc, un panneau « Notaufnahme → » — à poser APRÈS la façade, jamais dans la coupe.
  D.trottoir = (g, o = {}) => {
    const C = U.ctx(g, 742, false, 1);
    if (o.sol !== false) {
      el("rect", { x: 0, y: 0, width: 850, height: 22, fill: "#EDEDE7" }, g);
      let j = ""; for (let x = 46; x < 850; x += 62) j += `M${x} 2 L${x - 7} 21 `;
      ln(g, j, 1.3, "#BDBDB6");
      U.shape(C, "bordure", rect(0, 22, 850, 8), MAT.mid, { sw: 2, r: 0.6 });
      U.stroke(C, "arete", "M0 0 L850 0", { sw: 2.6 });
    }
    if (o.mobilier !== false) {
      [275, 530].forEach((x, i) => {                                                                    // potelets
        el("ellipse", { cx: x + 3, cy: 1, rx: 11, ry: 3.5, fill: "rgba(28,26,28,.16)" }, g);
        U.shape(C, "potelet" + i, rr(x - 6, -46, 12, 46, 5), MAT.grey, { sw: 2.2, r: 0.6 });
        el("rect", { x: x - 6, y: -37, width: 12, height: 7, fill: YEL, stroke: INK, "stroke-width": 1.4 }, g);
      });
      // banc (x 580…700)
      el("ellipse", { cx: 644, cy: 2, rx: 62, ry: 4.5, fill: "rgba(28,26,28,.14)" }, g);
      ln(g, "M592 0 L592 -30 M688 0 L688 -30 M592 -30 L589 -62 M688 -30 L691 -62", 4, INK);
      U.shape(C, "assise", rr(578, -37, 124, 9, 3), MAT.wood, { sw: 2.2, r: 0.6 });
      U.shape(C, "dossier1", rr(582, -64, 116, 9, 3), MAT.wood, { sw: 2.2, r: 0.6 });
      U.shape(C, "dossier2", rr(582, -51, 116, 8, 3), MAT.wood, { sw: 2, r: 0.6 });
      // panneau « Notaufnahme → » (h 150) : mât à x 742, panneau à gauche du mât
      el("ellipse", { cx: 744, cy: 1, rx: 14, ry: 4, fill: "rgba(28,26,28,.16)" }, g);
      U.shape(C, "mat", rr(739, -150, 7, 150, 3), MAT.mid, { sw: 2, r: 0.5 });
      ombre(g, rr(594, -150, 152, 40, 5), 5, 5);
      U.shape(C, "panneau", rr(594, -150, 152, 40, 5), MAT.white, { sw: 2.4, r: 0.6 });
      el("rect", { x: 596, y: -148, width: 9, height: 36, fill: YEL }, g);
      U.text(g, "Notaufnahme", 663, -123, 19, {});
      ln(g, "M722 -130 L738 -130 M731 -137 L738 -130 L731 -123", 2.6, INK);
    }
    return { w: 850, banc: [640, -37], panneau: [670, -130] };
  };
  D.trottoir.essais = [{}, { mobilier: false }];

  // Feuille du jugement. Petite (90 × 124) : « URTEIL », lignes grises, ligne « 7 500 € » surlignée (o.amount 0–1 = longueur
  // du surligneur). Grande (o.big, 440 × 560, S21) : URTEIL · Krefeld · 2010 · fahrlässige Tötung · Geldstrafe: 7 500 € ·
  // 4 lignes grises · dernière ligne « Rechtskraft: » + points de conduite (AUCUN cadre de tampon). Ancrage : centre.
  D.feuilleJugement = (g, o = {}) => {
    const big = !!o.big, am = o.amount == null ? 1 : clamp(o.amount, 0, 1), C = U.ctx(g, 745, false, 1);
    const w = big ? 440 : 90, h = big ? 560 : 124, x0 = -w / 2, y0 = -h / 2, pli = big ? 54 : 18;
    const d = `M${x0} ${y0} L${x0 + w - pli} ${y0} L${x0 + w} ${y0 + pli} L${x0 + w} ${y0 + h} L${x0} ${y0 + h} Z`;
    ombre(g, d, big ? 8 : 4, big ? 9 : 5);
    U.shape(C, "feuille", d, MAT.white, { sw: big ? 3 : 2.2, r: 0.7 });
    U.shape(C, "pli", `M${x0 + w - pli} ${y0} L${x0 + w - pli} ${y0 + pli} L${x0 + w} ${y0 + pli} Z`, MAT.grey, { sw: big ? 2.2 : 1.6, r: 0.5, gap: 4 });
    const grises = (ys, xa, xb, sw) => { let s = ""; ys.forEach((y, i) => { s += `M${xa} ${y} L${f(xb - (i % 2 ? 0.16 : 0) * (xb - xa))} ${y} `; }); ln(g, s, sw, "#B4B4AE"); };
    if (!big) {
      U.text(g, "URTEIL", -5, y0 + 27, 17, { ls: 1 });
      ln(g, `M${x0 + 12} ${y0 + 34} L${x0 + w - 24} ${y0 + 34}`, 1.6, INK);
      grises([y0 + 48, y0 + 59], x0 + 12, x0 + w - 12, 2.2);
      if (am > 0.02) el("rect", { x: -35, y: y0 + 67, width: f(70 * am), height: 19, fill: YEL, transform: "rotate(-1.5)" }, g);
      U.text(g, "7 500 €", 0, y0 + 82, 16, {});
      grises([y0 + 98, y0 + 109], x0 + 12, x0 + w - 12, 2.2);
      return { montant: [0, y0 + 76], w, h };
    }
    U.text(g, "URTEIL", 0, -200, 44, { ls: 3 });
    ln(g, "M-150 -186 L150 -186", 2.4, INK);
    U.text(g, "Krefeld · 2010", 0, -160, 24, { fill: "#55524B" });
    U.text(g, "fahrlässige Tötung", 0, -90, 28, {});
    if (am > 0.02) el("rect", { x: -168, y: -58, width: f(336 * am), height: 40, fill: YEL, transform: "rotate(-1)" }, g);
    U.text(g, "Geldstrafe: 7 500 €", 0, -30, 34, {});
    grises([20, 46, 73, 100], -180, 180, 3.2);
    U.text(g, "Rechtskraft:", -190, 188, 28, { anchor: "start" });
    let pts = ""; for (let x = -18; x <= 180; x += 16) pts += `M${x} 186 L${x + 0.1} 186 `;
    ln(g, pts, 4.2, INK);
    return { montant: [0, -40], rechtskraft: [-190, 188], finPoints: [180, 186], w, h };
  };
  D.feuilleJugement.essais = [{}, { amount: 0 }, { big: true }];

  /* ═════════════════════ C. PIÈCES DE NUIT ET OBJETS COMMUNS ═════════════════════ */

  // Pièce en coupe à l'échelle 1, en coordonnées MONDE (origine (0,0)) : x 110–960, plafond y 592, sol 1300–1420.
  //   o.lit 1 = mur éclairé #F6F1DE · 0 = mur éteint #ECEEF2 + hachures bleu nuit dans les deux coins hauts
  //   o.rail = y de la lisse de protection (défaut 1120 ; 0 = pas de lisse)
  // Le voile jaune de la lumière se pose à part (D.lueurPiece ou un rect), pour vaciller sans redessiner la pièce.
  D.salleNuit = (g, o = {}) => {
    const C = U.ctx(g, 750, false, 1), lit = o.lit == null ? 1 : o.lit, rail = o.rail == null ? 1120 : o.rail;
    const x0 = 110, x1 = 960, top = 592, fl = 1300, bot = 1420, e = 14;
    el("rect", { x: x0, y: top, width: x1 - x0, height: fl - top, fill: lit >= 0.5 ? MUR1 : MUR0 }, g);
    if (lit < 0.5) {
      U.shape(C, "coinG", `M${x0 + e} ${top + e} L${x0 + e + 250} ${top + e} L${x0 + e} ${top + e + 210} Z`, { hatch: NUIT, gap: 11, fw: 1.4 }, { noStroke: true });
      U.shape(C, "coinD", `M${x1 - e} ${top + e} L${x1 - e - 250} ${top + e} L${x1 - e} ${top + e + 210} Z`, { hatch: NUIT, gap: 11, fw: 1.4 }, { noStroke: true });
    }
    el("rect", { x: x0, y: fl, width: x1 - x0, height: bot - fl, fill: lit >= 0.5 ? "#EDEDE5" : "#E3E5EA" }, g);     // sol vinyle
    [[200, 1332, 240], [520, 1364, 300], [270, 1396, 230]].forEach(([x, y, w]) => { ln(g, `M${x} ${y} L${x + w} ${y}`, 5, "#FFFFFF", { opacity: 0.9 }); ln(g, `M${x + 30} ${y + 7} L${x + w - 40} ${y + 7}`, 1.3, "#C4C4BD"); });
    U.shape(C, "plinthe", rect(x0 + e, fl - 16, x1 - x0 - 2 * e, 16), MAT.grey, { sw: 2, gap: 6, r: 0.6 });
    if (rail) {
      let sup = ""; for (let x = x0 + e + 60; x < x1 - e - 30; x += 182) sup += `M${x} ${rail + 4} L${x} ${rail + 15} `;
      ln(g, sup, 5, "#77776F");
      el("path", { d: rr(x0 + e, rail - 6, x1 - x0 - 2 * e, 12, 5), fill: "#C9C3A8", transform: "translate(0 5)", opacity: lit >= 0.5 ? 0.7 : 0.4 }, g);
      U.shape(C, "lisse", rr(x0 + e, rail - 6, x1 - x0 - 2 * e, 12, 5), MAT.white, { sw: 2.2, r: 0.5 });
    }
    U.stroke(C, "sol", `M${x0 + e} ${fl} L${x1 - e} ${fl}`, { sw: 2.4 });
    U.shape(C, "murG", rect(x0, top, e, bot - top), CUT, { sw: 2.2, r: 0.5 });                                         // matière coupée
    U.shape(C, "murD", rect(x1 - e, top, e, bot - top), CUT, { sw: 2.2, r: 0.5 });
    U.shape(C, "plafond", rect(x0, top, x1 - x0, e), CUT, { sw: 2.2, r: 0.5 });
    U.shape(C, "dalle", rect(x0, bot, x1 - x0, 11), CUT, { sw: 2.2, r: 0.5 });
    return { x0, x1, top, floorY: fl, bottom: bot, rail, in: { x: x0 + e, y: top + e, w: x1 - x0 - 2 * e, h: fl - top - e } };
  };
  D.salleNuit.essais = [{ lit: 1 }, { lit: 0 }];

  // Fenêtre de nuit à deux vantaux : o.w × o.h (défaut 200 × 250), ancrage : centre. Appui, store à rouleau (o.blind 0–1),
  // nuit en hachures bleu nuit + croissant + 3 étoiles ; o.jour 0–1 : la vitre passe au jour (papier clair, petit soleil).
  // Cordon du store : dans le dessin, sauf o.cordon = false ; o.part = "cordon" le dessine SEUL (pour m.pend, pivot = out.cordon).
  D.fenetreNuit = (g, o = {}) => {
    const w = o.w || 200, h = o.h || 250, blind = clamp(o.blind || 0, 0, 1), jour = clamp(o.jour || 0, 0, 1);
    const C = U.ctx(g, 752, false, 1), x0 = -w / 2, y0 = -h / 2, e = Math.max(7, Math.round(w * 0.05)), gw = w - 2 * e, gh = h - 2 * e;
    const cx = w / 2 - e - 9, cy0 = y0 + 2, cL = Math.round(h * 0.5);
    const cordon = () => { ln(g, `M${cx} ${cy0} L${cx} ${cy0 + cL}`, 1.8, "#55554F"); el("circle", { cx, cy: cy0 + cL + 5, r: 5, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g); };
    if (o.part === "cordon") { cordon(); return { cordon: [cx, cy0], w, h }; }
    ombre(g, rect(x0, y0, w, h), 6, 7);
    U.shape(C, "cadre", rect(x0, y0, w, h), MAT.white, { sw: 3, r: 0.7 });
    if (jour < 0.99) {                                                                                  // la nuit
      const n = el("g", { opacity: f(1 - jour) }, g), N = U.ctx(n, 753, false, 1);
      el("rect", { x: x0 + e, y: y0 + e, width: gw, height: gh, fill: "#E7EAF0" }, n);
      U.shape(N, "nuit", rect(x0 + e, y0 + e, gw, gh), { hatch: NUIT, gap: 8.5, fw: 1.4 }, { noStroke: true });
      const mr = Math.max(9, w * 0.075), mx = -w * 0.22, my = -h * 0.2;
      el("circle", { cx: f(mx), cy: f(my), r: f(mr + 5), fill: "#E7EAF0" }, n);
      el("path", { d: `M${f(mx + mr * 0.25)} ${f(my - mr)} A${f(mr)} ${f(mr)} 0 1 0 ${f(mx + mr * 0.25)} ${f(my + mr)} A${f(mr * 1.5)} ${f(mr * 1.5)} 0 0 1 ${f(mx + mr * 0.25)} ${f(my - mr)} Z`, fill: "#FFFFFF", stroke: NUIT, "stroke-width": 1.8, "stroke-linejoin": "round" }, n);
      [[0.2, -0.3, 6], [0.3, 0.08, 4.5], [-0.3, 0.2, 5]].forEach(([sx, sy, r]) => { el("circle", { cx: f(sx * w), cy: f(sy * h), r: r + 3, fill: "#E7EAF0" }, n); el("path", { d: star4(sx * w, sy * h, r, 0.34), fill: "#FFFFFF", stroke: NUIT, "stroke-width": 1.3, "stroke-linejoin": "round" }, n); });
    }
    if (jour > 0.01) {                                                                                  // le jour
      const j = el("g", { opacity: f(jour) }, g);
      el("rect", { x: x0 + e, y: y0 + e, width: gw, height: gh, fill: "#FFFCEB" }, j);
      const sx = w * 0.2, sy = -h * 0.2, sr = Math.max(9, w * 0.085); let ry = "";
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; ry += `M${f(sx + Math.cos(a) * (sr + 5))} ${f(sy + Math.sin(a) * (sr + 5))} L${f(sx + Math.cos(a) * (sr + 12))} ${f(sy + Math.sin(a) * (sr + 12))} `; }
      ln(j, ry, 2, INK); el("circle", { cx: f(sx), cy: f(sy), r: f(sr), fill: YEL, stroke: INK, "stroke-width": 2 }, j);
      ln(j, `M${f(-w * 0.34)} ${f(h * 0.12)} q ${f(w * 0.05)} ${f(-h * 0.06)} ${f(w * 0.1)} 0 q ${f(w * 0.05)} ${f(-h * 0.05)} ${f(w * 0.1)} 0 M${f(-w * 0.36)} ${f(h * 0.12)} L${f(-w * 0.12)} ${f(h * 0.12)}`, 1.8, "#77776F");
    }
    ln(g, `M${x0 + e + 8} ${y0 + e + gh * 0.72} L${x0 + e + gw * 0.2} ${y0 + e + gh * 0.5}`, 2.4, "#FFFFFF", { opacity: 0.8 });   // reflet
    if (blind > 0.01) {                                                                                 // store à rouleau
      const bh = gh * blind; let lam = "";
      el("rect", { x: x0 + e, y: y0 + e, width: gw, height: f(bh), fill: "#FBFBF6" }, g);
      for (let y = y0 + e + 12; y < y0 + e + bh - 4; y += 13) lam += `M${x0 + e + 3} ${f(y)} L${x0 + e + gw - 3} ${f(y)} `;
      if (lam) ln(g, lam, 1.2, "#BDBDB6");
      U.shape(C, "barre", rect(x0 + e - 1, y0 + e + bh - 4, gw + 2, 6), MAT.mid, { sw: 1.8, r: 0.5 });
    }
    U.stroke(C, "vitre", rect(x0 + e, y0 + e, gw, gh), { sw: 2.2, r: 0.6 });
    U.shape(C, "meneau", rect(-e * 0.45, y0 + e, e * 0.9, gh), MAT.white, { sw: 2, r: 0.5 });
    ln(g, `M${f(e * 0.45 + 5)} -6 L${f(e * 0.45 + 5)} 12`, 3.4, INK);                                   // poignée
    U.shape(C, "caisson", rr(x0 - 4, y0 - 13, w + 8, 15, 4), MAT.grey, { sw: 2.2, r: 0.5 });
    ombre(g, rr(x0 - 12, h / 2, w + 24, 12, 3), 4, 5);
    U.shape(C, "appui", rr(x0 - 12, h / 2, w + 24, 12, 3), MAT.grey, { sw: 2.4, r: 0.6 });
    if (o.cordon !== false) cordon();
    return { cordon: [cx, cy0], w, h };
  };
  D.fenetreNuit.essais = [{}, { blind: 0.25 }, { jour: 1, w: 120, h: 150 }, { w: 120, h: 150, cordon: false }];

  // Tache de lumière : polygone o.pts (coordonnées MONDE), o.kind "lampe" (jaune, o.op défaut 0,22) ou "lune" (papier pâle
  // cerné de bleu nuit) ; o.croisillon : la croix d'une fenêtre reste en ombre dans la tache (4 points attendus).
  D.tacheLumiere = (g, o = {}) => {
    const pts = o.pts || [[170, 1300], [380, 1300], [470, 1400], [210, 1400]], lune = o.kind === "lune", op = o.op == null ? (lune ? 0.85 : 0.22) : o.op;
    const C = U.ctx(g, 755, false, 1), d = poly(pts), w = el("g", { opacity: f(op) }, g);
    el("path", { d, fill: lune ? "#FFFEF6" : YEL }, w);
    if (lune) ln(g, d, 1.4, NUIT, { "stroke-dasharray": "7 6", opacity: 0.7 });
    else U.shape(U.ctx(w, 756, false, 1), "grain", d, { hatch: "#E9B93A", gap: 15, fw: 1 }, { noStroke: true });
    if (o.croisillon && pts.length === 4) {
      const m = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)], band = (a, b, c2, d2) => el("path", { d: poly([a, b, c2, d2]), fill: lune ? "#DCDFE8" : "#EFE6C4" }, g);
      band(m(pts[0], pts[1], 0.47), m(pts[0], pts[1], 0.53), m(pts[3], pts[2], 0.53), m(pts[3], pts[2], 0.47));
      band(m(pts[0], pts[3], 0.46), m(pts[1], pts[2], 0.46), m(pts[1], pts[2], 0.54), m(pts[0], pts[3], 0.54));
    }
    return { pts };
  };
  D.tacheLumiere.essais = [{}, { kind: "lune", pts: [[0, 0], [260, 0], [200, 150], [-60, 150]], croisillon: true }];

  // Plafonnier : suspension courte (fil, globe opale r 22 centré à 50 px sous l'accroche), o.on 0–1. Ancrage : point d'accroche.
  D.plafonnier = (g, o = {}) => {
    const C = U.ctx(g, 758, false, 1), on = o.on == null ? 1 : clamp(o.on, 0, 1);
    if (on > 0.02) { el("circle", { cx: 0, cy: 50, r: 44, fill: YEL, opacity: f(0.2 * on) }, g); el("circle", { cx: 0, cy: 50, r: 32, fill: YEL, opacity: f(0.22 * on) }, g); }
    el("path", { d: "M-11 0 L11 0 L8 7 L-8 7 Z", fill: "#CFCFCA", stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, g);
    ln(g, "M0 7 L0 24", 2.2, INK);
    U.shape(C, "douille", rr(-7, 22, 14, 9, 2), MAT.mid, { sw: 1.8, r: 0.4 });
    el("circle", { cx: 0, cy: 50, r: 22, fill: mixc("#ECEEF2", "#FFF4BF", on) }, g);
    U.shape(C, "globe", circ(0, 50, 22), on < 0.5 ? { hatch: "#B9BCC6", gap: 6, fw: 1 } : {}, { sw: 2.4, r: 0.5 });
    ln(g, "M-13 41 A15 15 0 0 1 -4 33", 2.4, "#FFFFFF");
    return { globe: [0, 50] };
  };
  D.plafonnier.essais = [{ on: 1 }, { on: 0 }];

  // Silhouette de soignant (collègue anonyme de S3) : aplats hachurés, SANS visage ; o.kind 0 chignon · 1 cheveux courts ·
  // 2 foulard ; tient à hauteur de poitrine un petit appareil hachuré foncé. ≈ 120 × 400, ancrage : pieds.
  D.silhouetteSoignant = (g, o = {}) => {
    const C = U.ctx(g, 760 + (o.kind || 0), false, 1), kind = o.kind || 0, S = MAT.sil, SD = MAT.silD, bord = "#6E6E68";
    el("ellipse", { cx: 3, cy: 2, rx: 50, ry: 8, fill: "rgba(28,26,28,.13)" }, g);
    U.shape(C, "chG", "M-34 -10 C-34 -18 -6 -18 -4 -8 L-4 0 L-36 0 Z", SD, { sw: 2.2 });
    U.shape(C, "chD", "M4 -10 C6 -18 34 -18 34 -8 L36 0 L4 0 Z", SD, { sw: 2.2 });
    U.shape(C, "jambes", "M-36 -158 L36 -158 L32 -10 L5 -10 L0 -112 L-5 -10 L-32 -10 Z", S, { sw: 2.5 });
    U.shape(C, "tunique", "M-40 -288 C-52 -250 -48 -190 -42 -146 L42 -146 C48 -190 52 -250 40 -288 C18 -300 -18 -300 -40 -288 Z", S, { sw: 2.6 });
    ln(g, "M-14 -292 L0 -270 L14 -292", 2, bord);                                                       // encolure en V
    U.shape(C, "poche", rr(14, -200, 20, 22, 3), {}, { sw: 1.6, stroke: bord, r: 0.5 });
    // bras repliés vers la poitrine (traits épais : contour puis aplat), mains en moufle sur l'appareil
    [[-1], [1]].forEach(([s]) => {
      const d = `M${42 * s} -280 C${58 * s} -262 ${58 * s} -236 ${50 * s} -218 L${16 * s} -226`;
      ln(g, d, 25, bord); ln(g, d, 20.5, S.base);
    });
    ombre(g, rr(-14, -256, 28, 44, 7), 3, 4);
    U.shape(C, "appareil", rr(-14, -256, 28, 44, 7), MAT.dark, { sw: 2.2, r: 0.5 });
    [-1, 1].forEach((s) => el("ellipse", { cx: 15 * s, cy: -226, rx: 10.5, ry: 12, fill: S.base, stroke: bord, "stroke-width": 2.2 }, g));
    U.shape(C, "cou", rect(-11, -306, 22, 16), S, { sw: 2, noStroke: true });
    if (kind === 2) U.shape(C, "foulard", "M-56 -340 C-60 -404 60 -404 56 -340 C60 -312 46 -292 34 -284 L-34 -284 C-46 -292 -60 -312 -56 -340 Z", SD, { sw: 2.6 });
    U.shape(C, "tete", kind === 2 ? "M-36 -346 C-36 -386 36 -386 36 -346 C36 -314 20 -298 0 -298 C-20 -298 -36 -314 -36 -346 Z" : circ(0, -342, 50), { base: S.base }, { sw: 2.6, stroke: bord, r: 0.6 });
    if (kind === 0) {
      U.shape(C, "chignon", circ(4, -404, 19), SD, { sw: 2.4, r: 0.6 });
      U.shape(C, "cheveux", "M-51 -338 C-56 -404 56 -404 51 -338 C44 -368 20 -380 0 -380 C-20 -380 -44 -368 -51 -338 Z", SD, { sw: 2.5 });
    } else if (kind === 1) {
      U.shape(C, "cheveux", "M-52 -330 C-60 -408 60 -408 52 -330 C48 -352 40 -366 30 -372 C10 -360 -20 -360 -32 -374 C-42 -366 -48 -352 -52 -330 Z", SD, { sw: 2.5 });
    }
    return { appareil: [0, -234], tete: [0, -342], top: kind === 0 ? -424 : -394 };
  };
  D.silhouetteSoignant.essais = [{ kind: 0 }, { kind: 1 }, { kind: 2 }];

  // Lecteur de glycémie générique, SANS marque : 90 × 150, ancrage : centre. Écran 60 × 44, un bouton, fente en haut.
  //   o.strip 0–1 bandelette qui entre par le haut · o.drop 0–1 goutte au bout de la bandelette (encre, pas de rouge)
  //   o.disp "off" | "dots" (o.ph 0–2 = point en cours) | "approx" (« ≈ ? ») | "HI" (S22 SEULEMENT)
  //   o.jit 0–1 l'affichage tremble et se dédouble (imprécis) · o.mystery 0–1 aplat hachuré foncé qui cache tout (accroche)
  D.lecteur = (g, o = {}) => {
    const C = U.ctx(g, 765, false, 1), strip = clamp(o.strip || 0, 0, 1), drop = clamp(o.drop || 0, 0, 1), jit = clamp(o.jit || 0, 0, 1), my = clamp(o.mystery || 0, 0, 1), disp = o.disp || "off";
    const corps = "M-36 -75 L36 -75 Q45 -75 45 -64 L45 44 Q45 75 14 75 L-14 75 Q-45 75 -45 44 L-45 -64 Q-45 -75 -36 -75 Z";
    const sy = -75 - 34 * strip - 26 * (1 - strip) * (strip > 0.02 ? 1 : 0), bande = rr(-8, sy, 16, 60, 3);
    ombre(g, corps, 6, 7);
    if (strip > 0.02) {
      U.shape(C, "bande", bande, MAT.white, { sw: 2, r: 0.5 });
      el("rect", { x: -5, y: f(sy + 4), width: 10, height: 9, fill: YEL, stroke: INK, "stroke-width": 1.2 }, g);
      if (drop > 0.03) el("path", { d: `M0 ${f(sy - 3 - 15 * drop)} C${f(8 * drop)} ${f(sy - 3 - 5 * drop)} ${f(7 * drop)} ${f(sy + 3)} 0 ${f(sy + 3)} C${f(-7 * drop)} ${f(sy + 3)} ${f(-8 * drop)} ${f(sy - 3 - 5 * drop)} 0 ${f(sy - 3 - 15 * drop)} Z`, fill: "#55554F", stroke: INK, "stroke-width": 1.6 }, g);
    }
    U.shape(C, "corps", corps, MAT.grey, { sw: 2.8, r: 0.6 });
    el("rect", { x: -12, y: -77, width: 24, height: 5, rx: 2, fill: INK }, g);                           // fente
    ln(g, "M-45 -6 L-39 -6 M-45 4 L-39 4 M-45 14 L-39 14 M45 -6 L39 -6 M45 4 L39 4 M45 14 L39 14", 1.8, "#77776F");
    el("rect", { x: -30, y: -56, width: 60, height: 44, rx: 5, fill: disp === "off" ? "#E9ECEF" : "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, g);
    const aff = (dx, dy, op) => {
      const a = el("g", { transform: `translate(${f(dx)} ${f(dy)})`, opacity: op }, g);
      if (disp === "dots") [-14, 0, 14].forEach((x, i) => el("circle", { cx: x, cy: -34, r: i === (o.ph || 0) ? 5 : 3.6, fill: INK }, a));
      else if (disp === "approx") U.text(a, "≈ ?", 0, -24, 28, {});
      else if (disp === "HI") U.text(a, "HI", 0, -23, 30, { ls: 2 });
    };
    if (disp !== "off") { if (jit > 0.05) aff(4.5 * jit, -2.5 * jit, 0.4); aff(-1.5 * jit, 1 * jit, 1); }
    else ln(g, "M-22 -18 L-8 -50", 2.2, "#FFFFFF");
    el("circle", { cx: 2, cy: 38, r: 13, fill: OMB }, g);
    U.shape(C, "bouton", circ(0, 36, 13), MAT.white, { sw: 2.2, r: 0.5 });
    ln(g, "M-5 36 L5 36", 2.4, INK);
    if (my > 0.02) {                                                                                    // l'appareil caché de l'accroche
      const m = el("g", { opacity: f(my) }, g), M = U.ctx(m, 766, false, 1);
      if (strip > 0.02) el("path", { d: bande, fill: "#4A4A46" }, m);
      U.shape(M, "cache", corps, MAT.dark, { sw: 2.8, r: 0.6 });
    }
    return { ecran: [0, -34], fente: [0, -75], bout: [0, f(sy)] };
  };
  D.lecteur.essais = [{}, { mystery: 1 }, { strip: 1, drop: 1, disp: "dots", ph: 1 }, { strip: 1, disp: "approx" }, { strip: 1, disp: "approx", jit: 1 }, { disp: "HI" }];

  // Loupe (médaillon rond) : disque blanc, anneau d'encre 5 px, ombre, reflet, trait de liaison vers o.to (repère local).
  // r 110 (o.r), ancrage : centre. Le contenu se pose DANS out.contenu (groupe découpé par le rond, sous l'anneau) :
  //   const lp = m.obj(D.loupe, 500, 800, 1, { r: 105, to: [-178, 275] });  c.sk(dessin, fn, 0, 0, 1.6, 0, lp.out.contenu);
  D.loupe = (g, o = {}) => {
    const C = U.ctx(g, 768, false, 1), r = o.r || 110, id = "epLoupe" + (++uid);
    if (o.to) {
      const tx = o.to[0], ty = o.to[1], a = Math.atan2(ty, tx), p = (da) => `${f(Math.cos(a + da) * r)} ${f(Math.sin(a + da) * r)}`;
      el("path", { d: `M${tx} ${ty} L${p(-0.2)} L${p(0.2)} Z`, fill: "#FFFFFF", opacity: 0.6 }, g);
      ln(g, `M${p(-0.2)} L${tx} ${ty} L${p(0.2)}`, 2.2, INK, { "stroke-dasharray": "9 7" });
      el("circle", { cx: tx, cy: ty, r: 11, fill: "none", stroke: INK, "stroke-width": 2.4 }, g);
    }
    el("circle", { cx: 8, cy: 10, r: r + 2, fill: OMB }, g);
    el("circle", { cx: 0, cy: 0, r, fill: "#FFFFFF" }, g);
    el("circle", { cx: 0, cy: 0, r: r - 3 }, el("clipPath", { id }, el("defs", {}, g)));
    const contenu = el("g", { "clip-path": `url(#${id})` }, g);
    const dessus = el("g", {}, g), T = U.ctx(dessus, 769, false, 1);
    U.shape(T, "anneau", circ(0, 0, r), {}, { sw: 5, r: 0.45 });
    // reflet du verre : liseré gris-bleu pâle sous un trait blanc (lisible sur le disque vide comme sur le contenu)
    const ref1 = `M${f(-r * 0.74)} ${f(-r * 0.4)} A${f(r * 0.84)} ${f(r * 0.84)} 0 0 1 ${f(-r * 0.36)} ${f(-r * 0.76)}`, ref2 = `M${f(-r * 0.8)} ${f(-r * 0.2)} L${f(-r * 0.79)} ${f(-r * 0.12)}`;
    ln(dessus, ref1 + " " + ref2, 7.5, "#D5DAE2"); ln(dessus, ref1 + " " + ref2, 3.6, "#FFFFFF");
    return { contenu, r, clip: id };
  };
  D.loupe.essais = [{ to: [-178, 275] }, { r: 70 }];

  // Bip de ceinture : boîtier gris 16 × 22, clip, petit écran, voyant jaune (o.on). Ancrage : centre.
  D.biper = (g, o = {}) => {
    const C = U.ctx(g, 770, false, 1);
    el("path", { d: rr(-8, -11, 16, 22, 3), fill: OMB, transform: "translate(2 2.5)" }, g);
    ln(g, "M-4 -11 L-4 -15 L5 -15 L5 -11", 2, INK);                                                      // clip
    U.shape(C, "boitier", rr(-8, -11, 16, 22, 3), MAT.mid, { sw: 1.8, r: 0.4, gap: 3 });
    el("rect", { x: -5, y: -1, width: 10, height: 7, rx: 1, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.1 }, g);
    if (o.on) el("circle", { cx: 3.5, cy: -6.5, r: 6, fill: YEL, opacity: 0.45 }, g);
    el("circle", { cx: 3.5, cy: -6.5, r: 2.6, fill: o.on ? YEL : "#FFFFFF", stroke: INK, "stroke-width": 1.1 }, g);
    return { voyant: [3.5, -6.5] };
  };
  D.biper.essais = [{ on: 0 }, { on: 1 }];

  // Fanion « qui est qui » : étiquette jaune à pointe vers le bas, texte arabe gras o.text, taille o.size (défaut 26).
  // Ancrage : la POINTE ; o.dx décale le corps par rapport à la pointe. Renvoie x0 / x1 (bords du corps, repère local) pour
  // vérifier l'écart entre deux fanions voisins. S6 : avec les pointes (650, 695) et (715, 695), « زميل ديالها » prend dx 52
  // (corps centré x 767) — à dx 37 (storyboard) il recouvre « هي » (voir storyboard.md, « Écarts de construction »).
  D.etiquetteQui = (g, o = {}) => {
    const C = U.ctx(g, 772, false, 1), txt = o.text == null ? "هي" : o.text, size = o.size || 26, dx = o.dx || 0;
    // h 1,62 × size et ligne de base à mi-hauteur + 0,2 × size : les lettres qui descendent (ي final et ses points) restent dans le fanion
    // largeur : arabe gras ≈ (0,42 n + 0,3) × taille (mesuré dans Plex Arabic Bold), latin ≈ 0,5 n × taille ; + marge 1,1 × taille
    const ar = /[؀-ۿ]/.test(txt), est = ar ? (0.42 * txt.length + 0.3) * size : 0.5 * txt.length * size;
    const w = Math.max(size * 2.2, est + size * 1.1), h = size * 1.62, y1 = -13, y0 = y1 - h, x0 = dx - w / 2, x1 = dx + w / 2, px = clamp(0, x0 + 14, x1 - 14);
    const d = `M${f(x0 + 8)} ${f(y0)} L${f(x1 - 8)} ${f(y0)} Q${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + 8)} L${f(x1)} ${f(y1 - 8)} Q${f(x1)} ${f(y1)} ${f(x1 - 8)} ${f(y1)} L${f(px + 9)} ${f(y1)} L0 0 L${f(px - 9)} ${f(y1)} L${f(x0 + 8)} ${f(y1)} Q${f(x0)} ${f(y1)} ${f(x0)} ${f(y1 - 8)} L${f(x0)} ${f(y0 + 8)} Q${f(x0)} ${f(y0)} ${f(x0 + 8)} ${f(y0)} Z`;
    ombre(g, d, 4, 5);
    U.shape(C, "fanion", d, MAT.yellow, { sw: 2.4, r: 0.6 });
    U.text(g, txt, dx, f(y0 + h * 0.5 + size * 0.2), size, { font: "'Plex Arabic', sans-serif", weight: 700, rtl: true });
    return { w: f(w), h: f(h), x0: f(x0), x1: f(x1), top: f(y0), centre: [dx, f(y0 + h / 2)] };
  };
  D.etiquetteQui.essais = [{ text: "هي" }, { text: "زميل ديالها", dx: 52 }, { text: "نتا", size: 40 }];

  /* ═════════════════════ D. LA COUPE DE L'HÔPITAL (maison de poupée) — coordonnées MONDE ═════════════════════
   *  x :  150 |mur| 162 ........ 400|410 ............ 760|772 ..... 888 |mur| 900
   *  y 620–640 dalle de toit · étage 2 : 640–880 · dalle 880–890 · étage 1 : 890–1130 · dalle 1130–1140 · étage 0 : 1140–1380
   *  escalier : (792,1380) → (866,1255) → (792,1130) → (866,1005) → (792,880) */

  // Structure seule (statique) : murs coupés, dalles, cloisons, cage d'escalier (2 volées de 6 marches par étage, main courante,
  // paliers), ouverture du rideau roulant (mur gauche, y 1200–1380). Origine monde (0,0).
  D.coupe = (g) => {
    const C = U.ctx(g, 780, false, 1), R = (k, x, y, w, h) => U.shape(C, k, rect(x, y, w, h), CUT, { sw: 2.2, r: 0.45 });
    const FL = { f2: 880, f1: 1130, f0: 1380 }, stair = [[792, 1380], [866, 1255], [792, 1130], [866, 1005], [792, 880]];
    // embrasures des portes (au-delà du plan de coupe) : traits fins
    ln(g, "M400 690 L400 880 M410 690 L410 880 M760 690 L760 880 M772 690 L772 880 M760 940 L760 1130 M772 940 L772 1130 M760 1190 L760 1380 M772 1190 L772 1380 M430 1190 L430 1380 M440 1190 L440 1380", 1.3, "#A9A9A2");
    // escalier : 4 volées
    for (let i = 0; i < 4; i++) {
      const a = stair[i], b = stair[i + 1], n = 6, dx = (b[0] - a[0]) / n, dy = (b[1] - a[1]) / n, pts = [a];
      for (let k = 0; k < n; k++) { pts.push([a[0] + dx * k, a[1] + dy * (k + 1)]); pts.push([a[0] + dx * (k + 1), a[1] + dy * (k + 1)]); }
      pts.push([b[0], b[1] + 12]); pts.push([a[0] + dx * 0.9, a[1]]);
      U.shape(C, "volee" + i, poly(pts), CUT, { sw: 2, r: 0.4 });
      ln(g, `M${a[0]} ${a[1] - 34} L${b[0]} ${b[1] - 34}`, 2.6, INK);                                    // main courante
      ln(g, `M${a[0]} ${a[1]} L${a[0]} ${a[1] - 34} M${f((a[0] + b[0]) / 2)} ${f((a[1] + b[1]) / 2)} L${f((a[0] + b[0]) / 2)} ${f((a[1] + b[1]) / 2 - 34)} M${b[0]} ${b[1]} L${b[0]} ${b[1] - 34}`, 1.6, INK);
    }
    R("palier1", 866, 1255, 22, 9); R("palier2", 866, 1005, 22, 9);
    // dalles (elles s'arrêtent à l'escalier : x 792) et toit
    R("toit", 144, 620, 762, 20); R("acroG", 144, 608, 12, 12); R("acroD", 894, 608, 12, 12);
    R("dalle2", 150, 880, 642, 10); R("dalle1", 150, 1130, 642, 10); R("radier", 150, 1380, 750, 9);
    // murs extérieurs (mur gauche de l'étage 0 : ouvert de y 1200 à 1380 pour le rideau roulant)
    R("mG2", 150, 640, 12, 240); R("mG1", 150, 890, 12, 240); R("mG0", 150, 1140, 12, 60); R("mD", 888, 640, 12, 740);
    // cloisons : linteaux au-dessus des portes (190 de haut)
    R("lz", 400, 640, 10, 50); R("le2", 760, 640, 12, 50); R("le1", 760, 890, 12, 50); R("le0", 760, 1140, 12, 50); R("ln", 430, 1140, 10, 50);
    ln(g, "M792 880 L792 846 M792 846 L888 846", 2.2, INK);                                              // garde-corps du dernier palier
    return { floors: FL, stair,
      rooms: { zimmer: { x: 162, y: 640, w: 238, h: 240 }, stationen: { x: 410, y: 640, w: 350, h: 240 }, its: { x: 162, y: 890, w: 598, h: 240 },
        anfahrt: { x: 162, y: 1140, w: 268, h: 240 }, notfall: { x: 440, y: 1140, w: 320, h: 240 }, escalier: { x: 772, y: 640, w: 116, h: 740 } },
      rideau: [156, 1200] };
  };

  // Lumière d'une pièce de la coupe : o.w × o.h, ancrage : coin haut-gauche. o.on 0–1 : voile jaune (0,16 · on) + petit
  // plafonnier ; à 0 : mur éteint + hachures bleu nuit clairsemées. Sans rough : se redessine vite (vacillement, extinction).
  //   o.lx = x du plafonnier (défaut w/2) · o.lampe = false pour le retirer.
  D.lueurPiece = (g, o = {}) => {
    const w = o.w || 238, h = o.h || 240, on = o.on == null ? 1 : clamp(o.on, 0, 1), lx = o.lx == null ? w / 2 : o.lx;
    if (on < 0.98) { el("rect", { x: 0, y: 0, width: w, height: h, fill: MUR0, opacity: f(1 - on) }, g); hachNuit(g, 5, 5, w - 10, h - 10, { gap: 21, sw: 1.7, op: f((1 - on) * 0.85), seed: w + h }); }
    if (on > 0.01) el("rect", { x: 0, y: 0, width: w, height: h, fill: YEL, opacity: f(0.16 * on) }, g);
    if (o.lampe !== false) {
      if (on > 0.05) el("path", { d: `M${lx - 9} 12 L${lx + 9} 12 L${lx + 46} ${Math.min(h, 120)} L${lx - 46} ${Math.min(h, 120)} Z`, fill: YEL, opacity: f(0.1 * on) }, g);
      ln(g, `M${lx} 0 L${lx} 6`, 1.6, INK);
      el("path", { d: `M${lx - 9} 6 L${lx + 9} 6 A9 8 0 0 1 ${lx - 9} 6 Z`, fill: mixc("#DADCE2", "#FFE98A", on), stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, g);
    }
    return { w, h };
  };
  D.lueurPiece.essais = [{ on: 1 }, { on: 0.5 }, { on: 0 }];

  // Petit lit de profil (tête à GAUCHE) : cadre, roulettes, matelas, oreiller, bosse du dormeur (o.breath 0–1 : + 3 px).
  //   o.kind "station" | "its" (avec potence) | "zimmer" (130 px : tête de profil + point jaune du bracelet) | "vide"
  // 110 × 46 (130 pour zimmer), ancrage : sol, centre.
  D.litMini = (g, o = {}) => {
    const kind = o.kind || "station", L = kind === "zimmer" ? 130 : 110, x0 = -L / 2, x1 = L / 2, b = 3 * clamp(o.breath || 0, 0, 1);
    const C = U.ctx(g, 785, false, 1);
    el("ellipse", { cx: 2, cy: 1, rx: L / 2 + 2, ry: 3.2, fill: "rgba(28,26,28,.14)" }, g);
    if (kind === "its") {                                                                               // potence + poche
      ln(g, `M${x0 - 9} 0 L${x0 - 9} -84 M${x0 - 16} -84 L${x0 - 2} -84 M${x0 - 14} 0 L${x0 - 4} 0`, 1.8, INK);
      el("rect", { x: x0 - 20, y: -82, width: 9, height: 14, rx: 2, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.4 }, g);
      ln(g, `M${x0 - 15.5} -68 C${x0 - 15} -44 ${x0 + 4} -50 ${x0 + 30} -30`, 1.1, "#55554F");
    }
    ln(g, `M${x0 + 12} -8 L${x0 + 12} -15 M${x1 - 12} -8 L${x1 - 12} -15`, 2.2, INK);
    [x0 + 12, x1 - 12].forEach((x) => el("circle", { cx: x, cy: -4.2, r: 4, fill: "#77776F", stroke: INK, "stroke-width": 1.5 }, g));
    U.shape(C, "tete", rr(x0 - 2, -42, 6, 28, 2), MAT.mid, { sw: 1.8, r: 0.4, gap: 3 });
    U.shape(C, "pied", rr(x1 - 4, -34, 6, 20, 2), MAT.mid, { sw: 1.8, r: 0.4, gap: 3 });
    U.shape(C, "cadre", rect(x0 + 2, -18, L - 4, 4.5), MAT.mid, { sw: 1.6, r: 0.4, gap: 3 });
    U.shape(C, "matelas", rr(x0 + 4, -26, L - 8, 8.5, 3), MAT.white, { sw: 1.8, r: 0.4 });
    el("ellipse", { cx: x0 + 19, cy: -28.5, rx: 13, ry: 5, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);          // oreiller
    if (kind === "vide") { U.shape(C, "plie", rr(x1 - 36, -32, 26, 7, 2), MAT.grey, { sw: 1.5, r: 0.4, gap: 3 }); return { L, top: -26 }; }
    const bx = x0 + 28, top = -38 - b;
    if (kind === "zimmer") {   // tête de PROFIL tournée vers le plafond (jamais une tête Persona) : dessinée AVANT le drap, le cou entre dessous
      const hx = x0 + 20, hy = -32.5, K = 1.2, P = (x, y) => `${f(hx + x * K)} ${f(hy + y * K)}`;     // tête ≈ 26 px (grosse tête, proportions Persona)
      el("path", { d: `M${P(12, -2)} C${P(11, -4)} ${P(11.5, -7)} ${P(10, -8.5)} C${P(9, -9.4)} ${P(8.2, -9.6)} ${P(7.6, -10.4)} C${P(7.2, -11)} ${P(6.9, -11.3)} ${P(6.6, -11.6)} C${P(6.9, -13.4)} ${P(5.9, -14.9)} ${P(4.7, -14.8)} C${P(3.6, -14.6)} ${P(3, -12.7)} ${P(2, -12)} C${P(-3, -12.4)} ${P(-10, -8.5)} ${P(-10, -2.5)} C${P(-10, 2.5)} ${P(-5, 5)} ${P(1, 4.6)} C${P(5, 4.3)} ${P(9.5, 2.5)} ${P(12, -2)} Z`, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, g);   // front, nez arrondi vers le plafond, lèvres, menton
      el("path", { d: `M${P(-9.8, -4.5)} C${P(-9, -9.5)} ${P(-5, -11.5)} ${P(-2.5, -11.6)} C${P(-5.5, -9)} ${P(-6.5, -5)} ${P(-5.6, -1)} C${P(-4.5, 2)} ${P(-1.5, 3.6)} ${P(1.5, 4.4)} C${P(-4, 5)} ${P(-10, 2.6)} ${P(-9.8, -4.5)} Z`, fill: "#8A8A84", stroke: INK, "stroke-width": 1 }, g);   // couronne de cheveux (dessus dégarni)
      ln(g, `M${P(-3.4, -2.6)} A2.9 2.9 0 1 0 ${P(-1.2, 0.6)}`, 1.1, INK);                                  // oreille
      ln(g, `M${P(1.1, -8.4)} Q${P(2.6, -7.3)} ${P(4.2, -8.4)}`, 1.3, INK);                                // œil fermé
      ln(g, `M${P(7.9, -9.9)} L${P(9.2, -8.9)}`, 1.1, INK);                                                // bouche
    }
    U.shape(C, "drap", `M${bx} -25.5 C${bx + 2} ${f(top - 1)} ${bx + 20} ${f(top - 4)} ${bx + 36} ${f(top - 1)} C${x1 - 40} ${f(top + 3)} ${x1 - 26} ${f(top + 2)} ${x1 - 18} ${f(top - 3)} C${x1 - 10} ${f(top - 2)} ${x1 - 7} -30 ${x1 - 7} -25.5 Z`, MAT.grey, { sw: 1.8, r: 0.4, gap: 3.6 });
    if (kind === "zimmer") {                                                                            // bras posé sur le drap + bracelet jaune
      ln(g, `M${bx + 14} ${f(top + 2)} L${bx + 34} ${f(top + 4)}`, 5.5, INK); ln(g, `M${bx + 14} ${f(top + 2)} L${bx + 34} ${f(top + 4)}`, 3.2, "#FFFFFF");
      el("circle", { cx: bx + 30, cy: f(top + 3.6), r: 3.2, fill: YEL, stroke: INK, "stroke-width": 1.2 }, g);
    } else {
      el("circle", { cx: x0 + 19, cy: -34.5, r: 6.5, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
      el("path", { d: `M${x0 + 12.5} -34 A6.5 6.5 0 0 1 ${x0 + 21} -40.6 C${x0 + 18} -38 ${x0 + 15} -37 ${x0 + 12.5} -34 Z`, fill: "#8A8A84", stroke: INK, "stroke-width": 1 }, g);
    }
    return { L, top: f(top), tete: [x0 + 19, -35] };
  };
  D.litMini.essais = [{ kind: "station" }, { kind: "station", breath: 1 }, { kind: "its" }, { kind: "zimmer" }, { kind: "vide" }];

  // Petit moniteur au mur (Intensivstation SEULEMENT) : cadre, tracé qui défile (o.t = phase 0–1), voyant (o.alarm). 34 × 26, ancrage : centre.
  D.moniteurMini = (g, o = {}) => {
    const C = U.ctx(g, 787, false, 1), t = o.t || 0;
    ln(g, "M0 -13 L0 -19 M-5 -19 L5 -19", 1.8, INK);
    el("path", { d: rr(-17, -13, 34, 26, 4), fill: OMB, transform: "translate(2.5 3)" }, g);
    U.shape(C, "cadre", rr(-17, -13, 34, 26, 4), MAT.grey, { sw: 1.8, r: 0.4, gap: 3.4 });
    el("rect", { x: -13.5, y: -9.5, width: 27, height: 15, rx: 2, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.3 }, g);
    let d = "";
    for (let x = -12; x <= 12; x += 1.5) { const ph = (((x + 12) / 24 * 1.6 - t) % 1 + 1) % 1; const y = ph > 0.40 && ph < 0.47 ? -5.5 : ph >= 0.47 && ph < 0.54 ? 4 : ph >= 0.54 && ph < 0.6 ? -1.5 : 0; d += (d ? " L" : "M") + f(x) + " " + f(-2 + y); }
    ln(g, d, 1.5, INK);
    el("circle", { cx: 11, cy: 9.2, r: 2.3, fill: o.alarm ? YEL : "#FFFFFF", stroke: INK, "stroke-width": 1 }, g);
    if (o.alarm) el("circle", { cx: 11, cy: 9.2, r: 5.5, fill: YEL, opacity: 0.45 }, g);
    ln(g, "M-12 9.2 L-2 9.2", 1.3, "#77776F");
    return { voyant: [11, 9.2] };
  };
  D.moniteurMini.essais = [{ t: 0 }, { t: 0.5, alarm: 1 }];

  // Tableau d'appel des patients : cadre 90 × 50, 8 lampes (2 × 4), o.mask = lampes allumées (bit i, ligne par ligne). Ancrage : centre.
  D.rufanlage = (g, o = {}) => {
    const C = U.ctx(g, 789, false, 1), mask = o.mask || 0;
    el("path", { d: rr(-45, -25, 90, 50, 5), fill: OMB, transform: "translate(4 4)" }, g);
    U.shape(C, "cadre", rr(-45, -25, 90, 50, 5), MAT.white, { sw: 2, r: 0.5 });
    el("rect", { x: -45, y: -25, width: 90, height: 9, fill: "#CFCFCA" }, g); ln(g, "M-45 -16 L45 -16", 1.4, INK);
    for (let i = 0; i < 8; i++) {
      const x = -30 + 20 * (i % 4), y = -5 + 17 * Math.floor(i / 4), on = (mask >> i) & 1;
      if (on) el("circle", { cx: x, cy: y, r: 8.5, fill: YEL, opacity: 0.4 }, g);
      el("circle", { cx: x, cy: y, r: 5.2, fill: on ? YEL : "#F4F4EF", stroke: INK, "stroke-width": 1.4 }, g);
    }
    return { lampes: 8 };
  };
  D.rufanlage.essais = [{ mask: 0 }, { mask: 0b01001010 }, { mask: 255 }];

  // Panneau d'étage suspendu par deux chaînettes : o.text, fond jaune si o.on. 120 × 34 (+ chaînes 14) ; o.w / o.h / o.size
  // pour un texte plus long. Ancrage : haut-centre (le plafond).
  D.panneauEtage = (g, o = {}) => {
    const C = U.ctx(g, 791, false, 1), txt = o.text || "Stationen", h = o.h || 34, size = o.size || Math.round(h * 0.6), w = o.w || Math.max(120, Math.round(txt.length * size * 0.56 + 30));
    ln(g, `M${-w / 2 + 14} 0 L${-w / 2 + 14} 14 M${w / 2 - 14} 0 L${w / 2 - 14} 14`, 2, INK, { "stroke-dasharray": "3 3", "stroke-linecap": "butt" });
    el("path", { d: rr(-w / 2, 14, w, h, 5), fill: OMB, transform: "translate(4 4)" }, g);
    U.shape(C, "panneau", rr(-w / 2, 14, w, h, 5), o.on ? MAT.yellow : MAT.white, { sw: 2.2, r: 0.5 });
    U.text(g, txt, 0, f(14 + h * 0.5 + size * 0.34), size, {});
    return { w, h, centre: [0, 14 + h / 2] };
  };
  D.panneauEtage.essais = [{ text: "Stationen" }, { text: "Intensiv", on: 1 }, { text: "Notfall" }, { text: "Intensivstation", w: 230, h: 38, on: 1 }];

  // Ambulance : fourgon de profil tourné vers la DROITE, sans inscription. 230 × 120, ancrage : sol, centre.
  //   o.beacon 0/1 gyrophare JAUNE allumé · o.roll = angle des roues (°)
  D.ambulance = (g, o = {}) => {
    const C = U.ctx(g, 793, false, 1), roll = o.roll || 0;
    const caisse = "M-113 -24 L-113 -106 Q-113 -112 -107 -112 L56 -112 Q66 -112 72 -104 L94 -70 L108 -64 Q115 -61 115 -53 L115 -24 Z";
    el("ellipse", { cx: 2, cy: 1, rx: 118, ry: 6, fill: "rgba(28,26,28,.16)" }, g);
    if (o.beacon) { ln(g, "M6 -134 L-4 -144 M21 -138 L21 -152 M36 -134 L46 -144", 2.4, YEL); el("circle", { cx: 21, cy: -119, r: 19, fill: YEL, opacity: 0.4 }, g); }
    el("path", { d: "M12 -112 L12 -119 Q12 -126 21 -126 Q30 -126 30 -119 L30 -112 Z", fill: o.beacon ? YEL : "#E4E4DE", stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, g);
    U.shape(C, "caisse", caisse, MAT.white, { sw: 2.8, r: 0.6 });
    U.shape(C, "bande", "M-113 -62 L96 -62 L108 -57 L112 -48 L-113 -48 Z", MAT.mid, { sw: 1.8, r: 0.4, gap: 4 });
    el("path", { d: "M50 -103 L66 -103 L88 -70 L50 -70 Z", fill: VITRE, stroke: INK, "stroke-width": 2.2, "stroke-linejoin": "round" }, g);     // vitre de la cabine
    ln(g, "M56 -76 L62 -96", 2.2, "#FFFFFF");
    el("rect", { x: -98, y: -102, width: 34, height: 24, rx: 3, fill: VITRE, stroke: INK, "stroke-width": 2 }, g);                              // vitre arrière
    ln(g, "M42 -112 L42 -26 M-52 -108 L-52 -64", 1.6, INK);                                                                                    // portes
    ln(g, "M34 -56 L26 -56", 2.6, INK);
    const cx = -8, cy = -86, a = 5, b = 14;                                                                                                    // croix à l'encre
    el("path", { d: `M${cx - a} ${cy - b} L${cx + a} ${cy - b} L${cx + a} ${cy - a} L${cx + b} ${cy - a} L${cx + b} ${cy + a} L${cx + a} ${cy + a} L${cx + a} ${cy + b} L${cx - a} ${cy + b} L${cx - a} ${cy + a} L${cx - b} ${cy + a} L${cx - b} ${cy - a} L${cx - a} ${cy - a} Z`, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2, "stroke-linejoin": "round" }, g);
    el("rect", { x: 106, y: -58, width: 8, height: 9, rx: 2, fill: YEL, stroke: INK, "stroke-width": 1.5 }, g);                                  // phare
    U.shape(C, "pareG", rr(-118, -32, 12, 9, 3), MAT.mid, { sw: 1.6, r: 0.4, gap: 3 }); U.shape(C, "pareD", rr(106, -32, 13, 9, 3), MAT.mid, { sw: 1.6, r: 0.4, gap: 3 });
    [-62, 64].forEach((x) => {
      el("path", { d: `M${x - 23} -24 A23 23 0 0 1 ${x + 23} -24 Z`, fill: "#55554F" }, g);
      el("circle", { cx: x, cy: -18, r: 18, fill: "#3A3A37", stroke: INK, "stroke-width": 2 }, g);
      el("circle", { cx: x, cy: -18, r: 8, fill: "#E4E4DE", stroke: INK, "stroke-width": 1.6 }, g);
      let s = ""; for (let i = 0; i < 3; i++) { const q = rad(roll + i * 120); s += `M${f(x + Math.cos(q) * 8)} ${f(-18 + Math.sin(q) * 8)} L${f(x + Math.cos(q) * 15)} ${f(-18 + Math.sin(q) * 15)} `; }
      ln(g, s, 2.2, "#B9B9B2");
    });
    return { gyro: [21, -119], arriere: [-113, -60], toit: -112 };
  };
  D.ambulance.essais = [{}, { beacon: 1, roll: 40 }];

  // Mini-brancard avec bosse (tête à gauche) : 120 × 50, ancrage : sol, centre. o.roll = angle des roues.
  D.brancardMini = (g, o = {}) => {
    const C = U.ctx(g, 795, false, 1), roll = o.roll || 0;
    el("ellipse", { cx: 2, cy: 1, rx: 60, ry: 3.2, fill: "rgba(28,26,28,.14)" }, g);
    ln(g, "M-44 -27 L40 -6 M-40 -6 L44 -27", 2.2, INK);                                                  // châssis en X
    [-42, 42].forEach((x) => { el("circle", { cx: x, cy: -5, r: 5, fill: "#77776F", stroke: INK, "stroke-width": 1.5 }, g); ln(g, `M${f(x - Math.cos(rad(roll)) * 4)} ${f(-5 - Math.sin(rad(roll)) * 4)} L${f(x + Math.cos(rad(roll)) * 4)} ${f(-5 + Math.sin(rad(roll)) * 4)}`, 1.3, "#E4E4DE"); });
    U.shape(C, "plateau", rr(-58, -33, 116, 6, 2), MAT.mid, { sw: 1.6, r: 0.4, gap: 3 });
    U.shape(C, "matelas", `M-58 -33 L-54 -44 L-28 -41 L56 -41 L58 -33 Z`, MAT.white, { sw: 1.8, r: 0.4 });
    U.shape(C, "drap", "M-26 -40.5 C-22 -53 -4 -55 12 -51 C26 -48 38 -50 46 -53 C52 -52 54 -46 54 -40.5 Z", MAT.grey, { sw: 1.8, r: 0.4, gap: 3.6 });
    el("circle", { cx: -38, cy: -48, r: 6.5, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
    el("path", { d: "M-44.5 -47.5 A6.5 6.5 0 0 1 -36 -54.2 C-39 -51.5 -42 -50.5 -44.5 -47.5 Z", fill: "#8A8A84", stroke: INK, "stroke-width": 1 }, g);
    ln(g, "M58 -36 L66 -46", 2.4, INK);                                                                  // barre de poussée
    return { barre: [66, -46], top: -41 };
  };

  // Petit chariot de soins (poussé par NSW) : 40 × 50, ancrage : sol, centre ; poignée à droite.
  D.chariotMini = (g) => {
    const C = U.ctx(g, 797, false, 1);
    el("ellipse", { cx: 1, cy: 1, rx: 22, ry: 2.8, fill: "rgba(28,26,28,.14)" }, g);
    [-13, 13].forEach((x) => el("circle", { cx: x, cy: -4, r: 4, fill: "#77776F", stroke: INK, "stroke-width": 1.4 }, g));
    ln(g, "M-16 -8 L-16 -40 M16 -8 L16 -40", 2, INK);
    U.shape(C, "bas", rect(-18, -14, 36, 5), MAT.mid, { sw: 1.5, r: 0.4, gap: 3 });
    U.shape(C, "tiroir", rect(-18, -40, 36, 14), MAT.white, { sw: 1.7, r: 0.4 });
    ln(g, "M-5 -33 L5 -33", 2, INK);
    el("rect", { x: -13, y: -48, width: 9, height: 8, rx: 1.5, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.3 }, g);
    el("rect", { x: 0, y: -50, width: 7, height: 10, rx: 2, fill: YEL, stroke: INK, "stroke-width": 1.3 }, g);
    ln(g, "M18 -38 L25 -44", 2.2, INK);
    return { poignee: [25, -44] };
  };

  // Mini-jauge accrochée au mur du Zimmer (petite sœur de D.jauge) : 12 × 64, ancrage : bas. o.level · o.pulse · o.grey.
  D.jaugeMurale = (g, o = {}) => {
    const lv = clamp(o.level == null ? 0.5 : o.level, 0, 1), pu = o.pulse || 0, gr = o.grey || 0, liq = mixc(YEL, "#CFCFC8", gr), yL = lerp(-14, -58, lv);
    el("rect", { x: -9, y: -68, width: 22, height: 70, rx: 4, fill: OMB, transform: "translate(2 2)" }, g);
    el("rect", { x: -10, y: -69, width: 20, height: 70, rx: 4, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.5 }, g);        // plaquette
    el("path", { d: "M-4 -60 A4 4 0 0 1 4 -60 L4 -13 A7 7 0 1 1 -4 -13 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, g);
    el("circle", { cx: 0, cy: -8, r: f(4.6 + 1.2 * pu), fill: liq }, g);
    el("rect", { x: f(-2 - 0.8 * pu), y: f(yL), width: f(4 + 1.6 * pu), height: f(-9 - yL), rx: 1.5, fill: liq }, g);
    ln(g, "M-8 -26 L-5.5 -26 M-8 -38 L-5.5 -38 M-8 -50 L-5.5 -50", 1.1, "#77776F");
    return { haut: [0, -69] };
  };
  D.jaugeMurale.essais = [{ level: 0.12 }, { level: 0.93 }, { level: 0.93, pulse: 1 }, { level: 0.93, grey: 1 }];

  // Tabouret vide à côté du lit : 26 × 30, ancrage : sol, centre.
  D.tabouretMini = (g) => {
    const C = U.ctx(g, 799, false, 1);
    el("ellipse", { cx: 1, cy: 1, rx: 14, ry: 2.4, fill: "rgba(28,26,28,.14)" }, g);
    ln(g, "M-8 -26 L-11 0 M8 -26 L11 0 M0 -26 L0 -2 M-9.5 -12 L9.5 -12", 2, INK);
    U.shape(C, "assise", rr(-13, -31, 26, 6.5, 3), MAT.mid, { sw: 1.7, r: 0.4, gap: 3 });
    return { top: -31 };
  };

  // Tracé : pointillé jaune le long de o.pts (MONDE), dessiné de la fraction o.p0 (défaut 0) à o.p (0–1) de sa longueur.
  D.trace = (g, o = {}) => {
    const pts = o.pts || [[330, 880], [760, 880], [792, 880], [866, 1005], [792, 1130], [700, 1130]], p1 = clamp(o.p == null ? 1 : o.p, 0, 1), p0 = clamp(o.p0 || 0, 0, p1);
    const seg = []; let tot = 0;
    for (let i = 1; i < pts.length; i++) { const L = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(L); tot += L; }
    const at = (q) => { let s = q * tot; for (let i = 0; i < seg.length; i++) { if (s <= seg[i] || i === seg.length - 1) { const k = seg[i] ? clamp(s / seg[i], 0, 1) : 0; return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k), i]; } s -= seg[i]; } };
    if (p1 - p0 < 0.002) return { fin: pts[0] };
    const a = at(p0), b = at(p1); let d = `M${f(a[0])} ${f(a[1])}`;
    for (let i = a[2] + 1; i <= b[2]; i++) d += ` L${pts[i][0]} ${pts[i][1]}`;
    d += ` L${f(b[0])} ${f(b[1])}`;
    ln(g, d, 7.6, INK, { "stroke-dasharray": "1 11" });                                                  // liseré d'encre : lisible sur une pièce éclairée en jaune
    ln(g, d, 5, YEL, { "stroke-dasharray": "1 11" });
    return { fin: [f(b[0]), f(b[1])] };
  };
  D.trace.essais = [{ p: 1 }, { p: 0.6, p0: 0.2 }];

  // Rideau roulant de la Liegendanfahrt (vu en coupe, dans l'épaisseur du mur gauche) — AJOUT à l'inventaire.
  // Ancrage : haut de l'ouverture, axe du mur (monde (156, 1200)) ; o.open 0–1 (il se lève), o.voyant 0/1, o.h (défaut 180).
  D.rideauRoulant = (g, o = {}) => {
    const C = U.ctx(g, 801, false, 1), H = o.h || 180, open = clamp(o.open || 0, 0, 1), L = Math.max(10, H * (1 - open));
    el("rect", { x: -4.5, y: 0, width: 9, height: f(L), fill: "#E4E4DE", stroke: INK, "stroke-width": 1.6 }, g);
    let s = ""; for (let y = 8; y < L - 3; y += 9) s += `M-4.5 ${f(y)} L4.5 ${f(y)} `;
    if (s) ln(g, s, 1.2, "#77776F");
    el("rect", { x: -6, y: f(L - 5), width: 12, height: 5, rx: 1.5, fill: "#55554F", stroke: INK, "stroke-width": 1.3 }, g);
    U.shape(C, "caisson", rr(6, -22, 20, 20, 5), MAT.mid, { sw: 1.8, r: 0.4, gap: 3 });
    el("circle", { cx: 16, cy: -12, r: 3, fill: INK }, g);
    if (o.voyant) el("circle", { cx: 16, cy: -34, r: 8, fill: YEL, opacity: 0.45 }, g);
    el("circle", { cx: 16, cy: -34, r: 3.6, fill: o.voyant ? YEL : "#F4F4EF", stroke: INK, "stroke-width": 1.4 }, g);
    return { bas: [0, f(L)], voyant: [16, -34] };
  };
  D.rideauRoulant.essais = [{ open: 0 }, { open: 0.6, voyant: 1 }, { open: 1 }];

  /* ═════════════════════ J. INTRO ET CARTE ═════════════════════ */

  // Badge de l'intro : cordon JAUNE en deux brins (il part hors champ, 700 px au-dessus), mousqueton métallique, porte-badge
  // plastique à coins ronds 500 × 587 (fente 70 × 16, bandeau jaune 45 px « Dienstausweis »), code-barres en bas à gauche.
  // Ancrage : le MOUSQUETON (posé en monde (540, 300)) → carte x −250…250, y 18…605. Photo, anneau, « Yassine », @dr.aguilo :
  // posés par la scène dans le MÊME nœud (ancres renvoyées), pour se balancer avec le badge.
  D.badge = (g) => {
    const C = U.ctx(g, 810, false, 1), carte = rr(-250, 18, 500, 587, 30);
    // cordon : deux brins plats qui se rejoignent à l'anneau du mousqueton
    [[-1, "brinG"], [1, "brinD"]].forEach(([s, k]) => {
      const d = `M${s * 4} -34 L${s * 92} -720 L${s * 118} -720 L${s * 16} -30 Z`;
      el("path", { d, fill: OMB, transform: "translate(5 4)" }, g);
      U.shape(C, k, d, MAT.yellow, { sw: 2.4, r: 0.5, gap: 7 });
    });
    U.shape(C, "sertissage", rr(-19, -52, 38, 22, 5), MAT.mid, { sw: 2.2, r: 0.5, gap: 3.6 });           // bague qui serre les deux brins
    ombre(g, carte, 9, 10);
    U.shape(C, "etui", carte, MAT.white, { sw: 3.4, r: 0.6 });
    el("path", { d: rr(-238, 30, 476, 563, 20), fill: "#FCFCF9", stroke: "#B9B9B2", "stroke-width": 1.6 }, g);    // la carte dans son étui
    el("path", { d: "M-238 45 L238 45 L238 90 L-238 90 Z", fill: YEL }, g);                                // bandeau jaune
    ln(g, "M-238 45 L238 45 M-238 90 L238 90", 2, INK);
    U.text(g, "Dienstausweis", 0, 75, 22, { ls: 1.5 });
    el("rect", { x: -35, y: 23, width: 70, height: 16, rx: 8, fill: PAP, stroke: INK, "stroke-width": 2.4 }, g);  // fente
    // mousqueton : anneau + crochet qui passe dans la fente
    ln(g, "M0 -30 L0 -16", 5, "#77776F");
    el("circle", { cx: 0, cy: -30, r: 9, fill: "#E4E4DE", stroke: INK, "stroke-width": 2.4 }, g);
    const crochet = "M-11 -14 Q-11 -20 -5 -20 L5 -20 Q11 -20 11 -14 L11 26 Q11 37 0 37 Q-11 37 -11 26 Z";
    el("path", { d: crochet, fill: OMB, transform: "translate(4 4)" }, g);
    U.shape(C, "crochet", crochet, MAT.mid, { sw: 2.4, r: 0.5, gap: 3.4 });
    el("path", { d: "M-5 -12 L5 -12 L5 25 Q5 31 0 31 Q-5 31 -5 25 Z", fill: PAP, stroke: INK, "stroke-width": 1.8 }, g);
    ln(g, "M11 -6 L11 12", 3.4, INK);                                                                     // doigt du mousqueton
    // reflets du plastique + code-barres (décor)
    ln(g, "M-226 150 L-226 110 Q-226 104 -220 104 M226 520 L226 566 Q226 572 220 572", 3, "#FFFFFF");
    ln(g, "M-244 240 L-244 420", 1.6, "#C9C9C2"); ln(g, "M244 180 L244 330", 1.6, "#C9C9C2");
    let x = -230, i = 0, bars = "";
    while (x < -142) { const w = 1.6 + hsh(i * 3.3) * 3.2; bars += `M${f(x + w / 2)} 580 L${f(x + w / 2)} 598 `; el("rect", { x: f(x), y: 580, width: f(w), height: 18, fill: INK }, g); x += w + 1.6 + hsh(i * 5.9) * 2.6; i++; }
    return { carte: { x: -250, y: 18, w: 500, h: 587 }, photo: [0, 260], ruban: [0, 475], pseudo: [20, 568], glyphe: [-108, 556], codeBarres: [-185, 589], bas: 605 };
  };

  // Épingle de la carte dont la tête est une petite fenêtre à croisillon : o.on 0–1 (vitre jaune + rayons). 48 × 72, ancrage : la POINTE.
  D.pinFenetre = (g, o = {}) => {
    const C = U.ctx(g, 815, false, 1), on = clamp(o.on || 0, 0, 1);
    el("ellipse", { cx: 0, cy: 2, rx: 13, ry: 4.5, fill: "rgba(28,26,28,.25)" }, g);
    if (on > 0.05) { let r = ""; for (let i = 0; i < 8; i++) { const a = rad(-90 + (i - 3.5) * 36); r += `M${f(Math.cos(a) * 36)} ${f(-48 + Math.sin(a) * 36)} L${f(Math.cos(a) * 47)} ${f(-48 + Math.sin(a) * 47)} `; } ln(g, r, 3.4, YEL, { opacity: f(on) }); }
    const d = "M-24 -72 L24 -72 L24 -26 L8 -24 L0 0 L-8 -24 L-24 -26 Z";
    el("path", { d, fill: OMB, transform: "translate(4 4)" }, g);
    U.shape(C, "epingle", d, MAT.yellow, { sw: 2.8, r: 0.5 });
    el("rect", { x: -17, y: -65, width: 34, height: 34, rx: 2, fill: mixc(VITRE, "#FFF6C2", on), stroke: INK, "stroke-width": 2.2 }, g);
    if (on < 0.5) ln(g, "M-12 -38 L-2 -58 M0 -38 L10 -58", 1.5, NUIT, { opacity: 0.8 });
    ln(g, "M0 -65 L0 -31 M-17 -48 L17 -48", 2.4, INK);
    return { fenetre: [0, -48] };
  };
  D.pinFenetre.essais = [{ on: 0 }, { on: 1 }];

  // Petite fenêtre éteinte (grise) des autres villes de la carte : 14 × 14, ancrage : centre.
  D.fenetreVille = (g) => {
    el("rect", { x: -5.5, y: -5.5, width: 14, height: 14, fill: OMB }, g);
    el("rect", { x: -7, y: -7, width: 14, height: 14, rx: 1, fill: VITRE, stroke: INK, "stroke-width": 1.8 }, g);
    ln(g, "M0 -7 L0 7 M-7 -1 L7 -1", 1.4, INK);
    ln(g, "M-9 8.5 L9 8.5", 2, INK);
    return { r: 7 };
  };

  // Coupure de journal aux bords déchirés : « Ärzte Zeitung » (30 px), « 01.10.2010 » (22 px), 3 lignes grises, 1 ligne surlignée.
  // 300 × 190, ancrage : centre.
  D.coupure = (g) => {
    const C = U.ctx(g, 820, false, 1), pts = [];
    for (let x = -150; x <= 150; x += 20) pts.push([x, -95 + (hsh(x * 0.9) - 0.5) * 9]);
    for (let y = -75; y <= 75; y += 25) pts.push([150 + (hsh(y * 1.7) - 0.5) * 7, y]);
    for (let x = 150; x >= -150; x -= 20) pts.push([x, 95 + (hsh(x * 2.3) - 0.5) * 10]);
    for (let y = 75; y >= -75; y -= 25) pts.push([-150 + (hsh(y * 3.1) - 0.5) * 7, y]);
    const d = poly(pts);
    ombre(g, d, 6, 7);
    U.shape(C, "papier", d, { base: "#FBFAF3" }, { sw: 2.4, r: 0.5 });
    U.text(g, "Ärzte Zeitung", 0, -46, 30, {});
    ln(g, "M-126 -32 L126 -32 M-126 -27 L126 -27", 1.6, INK);
    U.text(g, "01.10.2010", -124, -3, 22, { anchor: "start", fill: "#55524B" });
    ln(g, "M-124 16 L124 16 M-124 34 L96 34 M-124 70 L70 70", 3.2, "#B4B4AE");
    el("rect", { x: -128, y: 42, width: 244, height: 18, fill: YEL, transform: "rotate(-0.8)" }, g);     // la ligne surlignée
    ln(g, "M-124 52 L108 52", 3.2, "#6E6E68");
    return { w: 300, h: 190 };
  };

  /* ═════════════════════ RESTE DU GABARIT (scènes d'exemple de scenes-1.js) — à supprimer avec elles ═════════════════════ */
  D.exemple = (g, o = {}) => {
    const C = U.ctx(g, 611, false, 1), L = o.len || 110;
    el("path", { d: `M-40 ${L + 34} L40 ${L + 34} L240 ${L + 900} L-240 ${L + 900} Z`, fill: "#F8CE4E", opacity: 0.13 }, g);
    U.stroke(C, "fil", `M0 0 L0 ${L}`, { sw: 3 });
    U.shape(C, "abat", `M-16 ${L} L16 ${L} L46 ${L + 34} L-46 ${L + 34} Z`, MAT.grey, { sw: 2.6 });
    el("ellipse", { cx: 0, cy: L + 36, rx: 22, ry: 8, fill: "#FFF6C9", stroke: INK, "stroke-width": 2 }, g);
    return { ampoule: [0, L + 36] };
  };
})();
