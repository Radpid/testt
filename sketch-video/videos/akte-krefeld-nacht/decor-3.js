/* decor-3.js — AKTE 05 (Krefeld, « بوحدهم فالليل ») — décors et objets PROPRES à l'épisode, 3e et dernière partie : S22 à S24.
 * G (fin). Le mur du poste de nuit vu par TES yeux (S23, S24) : mainPOV (la main de « نتا », dessin délicat), stylo, formulaire
 *    (Überlastungsanzeige + citation exacte du Marburger Bund), casierMural, planchette.
 * I. La règle médicale d'aujourd'hui (S22) : regle, tubeSang, cadranHoraire, caseEtage, pictoMedecin.
 * S25 et S26 n'ont besoin d'aucun dessin nouveau (coupe, salle, D.dos neutre, D.etiquetteQui, D.tacheLumiere existent) ;
 * l'affiche-résumé est le socle (story.js, st.summary) : rien à dessiner.
 * Mêmes conventions que decor.js : ancrage (0,0), paramètres animés dans o (ARRONDIS par la scène), ancres renvoyées ;
 * ombre décalée #D2D2CB ; le jaune = la lumière et le sucre (fente du casier, marques du cadran, coche, « 3 ») ; aucun rouge.
 * Essai : node tools/essai_decor.mjs videos/akte-krefeld-nacht --cols 2 --cell 800 --only mainPOV,formulaire
 */
(function () {
  "use strict";
  const D = window.EpDecor = window.EpDecor || {};
  // Les outils (D.outils) viennent de decor.js : tools/essai_decor.mjs charge ce fichier AVANT decor.js (ordre alphabétique),
  // on attend donc dans la file D._apres, que decor.js lance à sa fin (même mécanisme que decor-2.js).
  if (D.outils) suite(); else (D._apres = D._apres || []).push(suite);
  function suite() {
  const SC = SketchCast, U = SC.util, O = D.outils;
  const { el, ln, f, clamp, lerp, rad, hsh, rect, circ, poly, ombre, mixc, hachNuit, MAT, CUT, INK, YEL, OMB, MUR1, MUR0 } = O;
  const rr = (x, y, w, h, r) => U.rrect(f(x), f(y), f(w), f(h), r);
  const blob = U.blob, curve = U.curve;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
  const norm = (a) => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const rot = (p, deg) => { const c = Math.cos(rad(deg)), s = Math.sin(rad(deg)); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };
  const txt = (g, s, x, y, size, o) => U.text(g, s, f(x), f(y), size, o || {});
  const SKIN = MAT.skin, SCRUB = MAT.grey, BOIS2 = { base: "#DCDCD5", hatch: "#8F8F88", gap: 5.5, fw: 1.2 }, GRIS_T = "#55524B";
  const P2 = (pts) => pts.map((p) => [f(p[0]), f(p[1])]);

  /* ═════════════════════ G (fin). LE MUR DU POSTE DE NUIT, VU PAR TES YEUX (S23, S24) ═════════════════════ */

  // LA MAIN DE « نتا » — dessin dédié (jamais de doigts : une moufle), vue de DOS (le dos de la main vers nous), grande (moufle
  // ≈ 110 px), avec l'avant-bras dans la manche de scrubs qui sort par le bas de l'image. Ancrage : le CENTRE DE LA MAIN.
  //   o.angle (°) : direction de l'avant-bras depuis le poignet, 0 = vers le bas, > 0 = le coude part vers la DROITE (bras droit :
  //     le pouce est à gauche), < 0 = vers la gauche (bras gauche : le pouce est à droite) ; o.pouce (±1) force le côté du pouce.
  //   o.len (défaut 700) : longueur de l'avant-bras + manche, assez pour sortir du bas de l'écran (jamais un bout de manche coupé).
  //   o.grip "ouverte" (main ouverte, pouce écarté) · "combine" (poing qui tient le combiné : D.combine dessiné EN TRAVERS du poing,
  //     derrière lui, le pouce par-dessus ; o.objAngle = rotation du combiné, défaut −55° : attache du cordon en haut à gauche ;
//     o.objScale = échelle du combiné, défaut 1,5 : il est plus près de nous que le poste mural, et dépasse bien des deux côtés)
  //     · "stylo" (poing qui pince D.stylo entre le pouce et la moufle ; la pointe dépasse côté pouce, EN HAUT : la main reste
  //     sous et à côté de la pointe et ne cache pas ce qui s'écrit ; o.penAngle, défaut 18°).
  // Renvoie (repère de l'ancrage) { poignet, coude (bout de la manche), cord (attache du cordon), ecouteur, pointe, bout (arrière
  // du stylo : la ficelle s'y attache) }.
  D.mainPOV = (g, o = {}) => {
    const C = U.ctx(g, 920, false, 1), a = o.angle || 0, grip = o.grip || "ouverte", s = o.pouce || (a < 0 ? 1 : -1), L = o.len || 700;
    const R = (p) => rot(p, -a), RP = (pts) => P2(pts.map(R));                                      // repère de l'avant-bras → ancrage
    const out = { poignet: P2([R([0, 46])])[0], coude: P2([R([0, 46 + L])])[0] };
    // avant-bras (peau) puis manche de scrubs (poignet tricoté) : elle s'élargit vers le coude
    const bras = RP([[-31, 30], [-34, 90], [-38, 170], [38, 170], [34, 90], [31, 30]]);
    U.shape(C, "avantbras", blob(bras, 0.6), SKIN, { sw: 2.8, r: 0.5 });
    ln(g, "M" + RP([[s * 14, 70], [s * 18, 128]]).map((p) => p.join(" ")).join(" L"), 1.4, "#B4B4AE");        // tendon, côté pouce
    const manche = RP([[-44, 150], [-50, 150 + (L - 150) * 0.3], [-56, L], [56, L], [50, 150 + (L - 150) * 0.3], [44, 150]]);
    ombre(g, poly(manche), 6, 6);
    U.shape(C, "manche", poly(manche), SCRUB, { sw: 2.8, r: 0.5 });
    const poignetT = RP([[-47, 140], [47, 140], [49, 172], [-49, 172]]);
    U.shape(C, "revers", poly(poignetT), MAT.mid, { sw: 2.4, r: 0.4, gap: 4 });
    let cotes = ""; for (let x = -40; x <= 40; x += 8) { const q = RP([[x, 144], [x * 1.04, 168]]); cotes += `M${q[0][0]} ${q[0][1]} L${q[1][0]} ${q[1][1]} `; }
    ln(g, cotes, 1.2, "#77776F");
    ln(g, "M" + RP([[s * -22, 240], [s * -26, Math.min(L - 20, 420)]]).map((p) => p.join(" ")).join(" L"), 1.6, "#9A9A94");   // pli de la manche
    // l'objet tenu, DERRIÈRE le poing (on voit le dos de la main : l'objet est dans la paume)
    if (grip === "combine") {
      const th = o.objAngle == null ? -55 : o.objAngle, k = o.objScale || 1.5, d = [-Math.sin(rad(th)), Math.cos(rad(th))], att = mul(d, -76 * k);
      const hg = el("g", { transform: `translate(${f(att[0])} ${f(att[1])}) rotate(${f(th)}) scale(${k})` }, g);
      const oc = D.combine(hg) || {};
      out.cord = P2([att])[0]; out.ecouteur = P2([add(att, mul(d, (oc.ecouteur || [0, 136])[1] * k))])[0];
    }
    if (grip === "stylo") {   // la pointe sort en haut, côté pouce ; l'arrière du stylo est caché dans le poing
      const ph = o.penAngle == null ? 40 : o.penAngle, tip = [s * 104, -74], dd = [-s * Math.cos(rad(ph)), Math.sin(rad(ph))];
      const ang = Math.atan2(dd[1], dd[0]) * 180 / Math.PI, tipA = R(tip);
      const pg = el("g", { transform: `translate(${f(tipA[0])} ${f(tipA[1])}) rotate(${f(ang - a)})` }, g);
      const os = D.stylo(pg) || {};
      out.pointe = P2([tipA])[0]; out.bout = P2([R(add(tip, mul(dd, (os.bout || [120, 0])[0])))])[0];
    }
    // la main (moufle, dos de la main)
    if (grip === "ouverte") {
      const main = RP([[-30, 46], [-38, 14], [-44, -24], [-44, -62], [-32, -92], [-8, -104], [16, -100], [34, -86], [42, -58], [42, -20], [38, 16], [30, 46]].map((p) => [p[0] * s, p[1]]));
      U.shape(C, "main", blob(main, 0.7), SKIN, { sw: 3, r: 0.4 });
      const pouce = RP([[34, 10], [54, -14], [68, -40], [64, -56], [50, -54], [40, -30], [30, -12]].map((p) => [p[0] * s, p[1]]));
      U.shape(C, "pouce", blob(pouce, 0.8), SKIN, { sw: 2.8, r: 0.4 });
      U.stroke(C, "pli", curve(RP([[s * -24, -40], [s * -4, -48], [s * 18, -44]])), { sw: 1.6, r: 0.4, single: true, stroke: "#9A9A94" });
    } else {
      const poing = RP([[-40, 46], [-50, 14], [-54, -22], [-44, -50], [-18, -62], [14, -62], [42, -52], [54, -24], [52, 14], [42, 46]]);
      ombre(g, blob(poing, 0.7), 5, 6);
      U.shape(C, "poing", blob(poing, 0.7), SKIN, { sw: 3, r: 0.4 });
      U.stroke(C, "repli", curve(RP([[-42, -22], [-14, -34], [16, -34], [44, -22]])), { sw: 1.8, r: 0.4, single: true, stroke: "#9A9A94" });   // repli de la moufle (aucun doigt)
      const dy = grip === "stylo" ? 14 : 0;                                                             // stylo : le pouce plus bas, la pointe reste visible
      const pouce = RP([[40, 6], [58, -10], [66, -34], [58, -52], [42, -54], [34, -34], [32, -12]].map((p) => [p[0] * s, p[1] + dy]));
      U.shape(C, "pouce", blob(pouce, 0.8), SKIN, { sw: 2.8, r: 0.4 });
      U.stroke(C, "ongle", curve(RP([[s * 50, -46 + dy], [s * 58, -42 + dy], [s * 60, -34 + dy]])), { sw: 1.4, r: 0.4, single: true, stroke: "#B4B4AE" });
    }
    return out;
  };
  D.mainPOV.essais = [{ grip: "ouverte", angle: 20, len: 300 }, { grip: "combine", angle: -24, len: 300 }, { grip: "stylo", angle: 20, len: 300 }, { grip: "combine", angle: -24, objAngle: -40, len: 300 }];

  // Stylo-bille : pointe en (0,0), corps vers +x (120 × 14) : pointe métallique, zone de prise striée, corps, agrafe, capuchon
  // arrière foncé. Ancrage : la POINTE. La scène l'oriente (rotation du nœud) ; pendu à sa ficelle (S24), la ficelle part de out.bout.
  D.stylo = (g) => {
    const C = U.ctx(g, 924, false, 1);
    el("path", { d: "M2 0 L18 -6 L18 6 Z", fill: OMB, transform: "translate(2 3)" }, g);
    U.shape(C, "cone", "M1 0 L18 -6 L18 6 Z", MAT.white, { sw: 1.8, r: 0.3 });
    el("circle", { cx: 2, cy: 0, r: 2.2, fill: INK }, g);
    ombre(g, rr(18, -7, 102, 14, 5), 3, 4);
    U.shape(C, "corps", rr(18, -7, 84, 14, 4), MAT.light, { sw: 2, r: 0.3 });
    U.shape(C, "prise", rect(20, -7, 24, 14), MAT.mid, { sw: 1.6, r: 0.3, gap: 3 });
    ln(g, "M50 -3.5 L96 -3.5", 2, "#FFFFFF");
    U.shape(C, "capuchon", rr(100, -7.5, 20, 15, 5), MAT.dark, { sw: 1.8, r: 0.3 });
    ln(g, "M104 -7.5 L82 -10 L80 -7", 2.2, INK);                                                       // agrafe
    el("circle", { cx: 119, cy: 0, r: 2.6, fill: "#F7F7F1", stroke: INK, "stroke-width": 1.3 }, g);     // œillet de la ficelle
    return { pointe: [0, 0], bout: [120, 0], prise: [32, 0] };
  };

  // Gribouillis d'écriture (illisible : aucune donnée inventée) de xs à xe sur la ligne de base y, dessiné jusqu'à la fraction k.
  // Renvoie { d, fin } (fin = point où est la plume).
  function ecriture(xs, xe, y, k, seed) {
    if (k <= 0.005) return { d: "", fin: [xs, y] };
    const xk = xs + (xe - xs) * k; let d = "", x = xs, i = 0, fin = [xs, y], pen = false;
    while (x < xk) {
      const mot = 34 + hsh(seed + i * 7.3) * 52, x1 = Math.min(x + mot, xk);
      let s = `M${f(x)} ${f(y - 4)}`, xx = x, j = 0;
      while (xx < x1) {
        const st = 7 + hsh(seed + i * 3.1 + j * 1.7) * 4, hi = hsh(seed + i * 5.9 + j * 2.3), top = y - 9 - (hi > 0.8 ? 12 : hi > 0.55 ? 5 : 0), bot = y + (hi < 0.1 ? 8 : 0);
        const xm = Math.min(xx + st / 2, x1), xn = Math.min(xx + st, x1);
        s += ` Q${f(xx + st * 0.1)} ${f(top)} ${f(xm)} ${f(top + 2)} Q${f(xm + st * 0.2)} ${f(bot)} ${f(xn)} ${f(y - 3)}`;
        xx = xn; j++; fin = [xn, y - 3];
      }
      d += s + " "; pen = true;
      x = x1 + 12 + hsh(seed + i * 11.1) * 8; i++;
    }
    return { d: pen ? d : "", fin: [f(fin[0]), f(fin[1])] };
  }

  // Le FORMULAIRE (S24), feuille 520 × 630, ancrage : centre (posée en (510, 955) sur la planchette : x 250–770, y 640–1270).
  //   rond jaune « 3 » (local (−220, −265)) ; titre « Überlastungsanzeige » (44 px, aligné à gauche à x −190, base −235) tapé
  //   lettre par lettre (o.title 0–1) puis surligné (o.hl 0–1) ; « (= Gefährdungsanzeige) » et « schriftlich an den Arbeitgeber »
  //   (22 px) ; trois champs 24 px à x −220 : « Datum, Uhrzeit: » (−95), « Besetzung: » (−25), « Patienten: » (+45), remplis d'un
  //   gribouillis ILLISIBLE jusqu'à x +220 (o.lines 0–3) ; case à cocher (centre (−210, 120)) + « Patienten in Gefahr » (30 px,
  //   x −165, base 133), coche JAUNE (o.tick 0–1) ; note de bas de page, citation EXACTE du Marburger Bund (18 px, 3 lignes
  //   centrées, base 225 / 249 / 273) ; o.coin 0–1 : le coin bas-droit se soulève.
  // La ligne arabe « المرضى فخطر » est posée par la scène (écriture de droite à gauche) en out.ar. Renvoie { box, fields, plume, ar, titre }.
  D.formulaire = (g, o = {}) => {
    const C = U.ctx(g, 926, false, 1), x0 = -260, y0 = -315, x1 = 260, y1 = 315;
    const ti = clamp(o.title == null ? 1 : o.title, 0, 1), hl = clamp(o.hl || 0, 0, 1), lines = clamp(o.lines || 0, 0, 3), tick = clamp(o.tick || 0, 0, 1), cn = clamp(o.coin || 0, 0, 1);
    const c = 34 * cn, feuille = `M${x0} ${y0} L${x1} ${y0} L${x1} ${f(y1 - c)} L${f(x1 - c)} ${y1} L${x0} ${y1} Z`;
    ombre(g, feuille, 7, 8);
    U.shape(C, "feuille", feuille, MAT.white, { sw: 2.8, r: 0.6 });
    if (cn > 0.02) U.shape(C, "coin", `M${x1} ${f(y1 - c)} L${f(x1 - c * 1.1)} ${f(y1 - c * 1.1)} L${f(x1 - c)} ${y1} Z`, MAT.grey, { sw: 1.8, r: 0.4, gap: 4 });
    // en-tête : « 3 » + titre
    el("circle", { cx: -217, cy: -261, r: 23, fill: OMB }, g);
    el("circle", { cx: -220, cy: -265, r: 23, fill: YEL, stroke: INK, "stroke-width": 2.6 }, g);
    txt(g, "3", -220, -254, 32, {});
    const T = "Überlastungsanzeige", n = Math.round(T.length * ti), TW = 418;
    if (hl > 0.02) el("rect", { x: -194, y: -270, width: f(TW * hl), height: 42, fill: YEL, opacity: 0.9, transform: "rotate(-0.6)" }, g);
    if (n > 0) txt(g, T.slice(0, n), -190, -235, 44, { anchor: "start" });
    txt(g, "(= Gefährdungsanzeige)", -190, -197, 22, { anchor: "start", fill: GRIS_T });
    txt(g, "schriftlich an den Arbeitgeber", -190, -169, 22, { anchor: "start", fill: GRIS_T });
    ln(g, "M-232 -146 L232 -146", 2, INK);
    // les trois champs
    const F = [{ s: "Datum, Uhrzeit:", y: -95, xs: -36 }, { s: "Besetzung:", y: -25, xs: -92 }, { s: "Patienten:", y: 45, xs: -94 }], fields = [];
    let plume = [F[0].xs, F[0].y];
    F.forEach((fl, i) => {
      txt(g, fl.s, -220, fl.y, 24, { anchor: "start" });
      let pt = ""; for (let x = fl.xs; x < 220; x += 9) pt += `M${x} ${fl.y + 6} L${x + 3} ${fl.y + 6} `;
      ln(g, pt, 1.4, "#C4C4BE");
      const k = clamp(lines - i, 0, 1), e = ecriture(fl.xs + 4, 218, fl.y, k, 17 + i * 31);
      if (e.d) ln(g, e.d, 2.3, "#3A3A37");
      if (k > 0 && k < 1) plume = e.fin; else if (k >= 1) plume = [218, fl.y - 3];
      fields.push({ x0: fl.xs, x1: 220, y: fl.y });
    });
    // case à cocher + coche jaune
    ombre(g, rr(-227, 103, 34, 34, 4), 3, 4);
    U.shape(C, "case", rr(-227, 103, 34, 34, 4), MAT.white, { sw: 2.6, r: 0.4 });
    txt(g, "Patienten in Gefahr", -165, 133, 30, { anchor: "start" });
    if (tick > 0.01) {
      const d = "M-223 118 L-212 132 L-186 94";
      ln(g, d, 10, INK, { pathLength: 1, "stroke-dasharray": "1 1", "stroke-dashoffset": f(1 - tick) });
      ln(g, d, 6, YEL, { pathLength: 1, "stroke-dasharray": "1 1", "stroke-dashoffset": f(1 - tick) });
    }
    // note de bas de page : citation EXACTE (scenario.md, « Ce qui n'est PAS dit mais montré »)
    ln(g, "M-200 202 L200 202", 1.2, "#C4C4BE");
    [["Die Überlastungsanzeige entbindet den Arzt", 225], ["nicht von der Pflicht, seine Arbeitsaufgaben", 249], ["zu erfüllen. — Marburger Bund Sachsen-Anhalt", 273]].forEach(([s, y]) => txt(g, s, 0, y, 18, { fill: GRIS_T }));
    return { box: [-210, 120], fields, plume, ar: [-60, 175], titre: [-190, -235], w: 520, h: 630 };
  };
  D.formulaire.essais = [{ title: 0.4, lines: 0 }, { title: 1, hl: 1, lines: 1.6 }, { title: 1, hl: 1, lines: 3, tick: 1, coin: 1 }];

  // Casier à courrier interne fixé au MUR, vu de face : boîte 140 × 120, couvercle incliné, fente horizontale (o.on 0–1 : elle
  // s'éclaire en JAUNE, comme une petite fenêtre qui s'allume), plaque « Verwaltung », petite serrure. Ancrage : centre.
  D.casierMural = (g, o = {}) => {
    const C = U.ctx(g, 928, false, 1), on = clamp(o.on || 0, 0, 1);
    ln(g, "M-46 -66 L-46 -60 M46 -66 L46 -60", 4, "#77776F");                                          // pattes de fixation
    ombre(g, rr(-70, -58, 140, 118, 6), 6, 7);
    U.shape(C, "boite", rr(-70, -58, 140, 118, 6), MAT.light, { sw: 2.6, r: 0.5 });
    U.shape(C, "couvercle", poly([[-76, -62], [76, -62], [72, -44], [-72, -44]]), MAT.mid, { sw: 2.2, r: 0.4, gap: 3.6 });
    if (on > 0.02) {
      el("rect", { x: -62, y: -40, width: 124, height: 26, rx: 8, fill: YEL, opacity: f(0.35 * on) }, g);
      let ry = ""; [[-40, -1], [0, -1], [40, -1]].forEach(([x]) => { ry += `M${x} -44 L${x} -54 `; });
      ln(g, ry, 2.6, YEL, { opacity: f(on) });
    }
    el("rect", { x: -54, y: -33, width: 108, height: 12, rx: 5, fill: mixc("#3A3A37", YEL, on), stroke: INK, "stroke-width": 2 }, g);
    if (on > 0.3) ln(g, "M-46 -27 L44 -27", 1.6, "#FFFFFF", { opacity: f(on) });
    ombre(g, rr(-52, 0, 104, 30, 4), 3, 4);
    U.shape(C, "plaque", rr(-52, 0, 104, 30, 4), MAT.white, { sw: 1.9, r: 0.4 });
    txt(g, "Verwaltung", 0, 21, 19, {});
    el("circle", { cx: 0, cy: 45, r: 5.5, fill: "#CFCFCA", stroke: INK, "stroke-width": 1.6 }, g);
    ln(g, "M0 42 L0 48", 1.6, INK);
    [[-60, -36], [60, -36], [-60, 50], [60, 50]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 2.2, fill: "#77776F" }, g));
    return { fente: [0, -27], plaque: [0, 15], haut: [0, -62], bas: [0, 60] };
  };
  D.casierMural.essais = [{}, { on: 1 }];

  // Planchette à pince PENDUE À UN CLOU (support du formulaire, S24). Ancrage : le CLOU (posé en (510, 620)) = pivot de m.pend.
  // Planche 560 × 680 de (−280, −20) à (280, 660) ; la feuille se pose en out.feuille (centre (0, 335) : x ±260, y 20–650) ;
  // pince en haut (plaque 160 × 50, levier en fil), le clou passe dans son trou ; anneau de la ficelle du stylo en out.ficelle.
  //   o.part "planche" (dessous de la feuille) · "pince" (par-dessus la feuille) ; sans o.part : les deux.
  D.planchette = (g, o = {}) => {
    const C = U.ctx(g, 930, false, 1), part = o.part;
    const planche = () => {
      ombre(g, rr(-280, -20, 560, 680, 16), 8, 9);
      U.shape(C, "planche", rr(-280, -20, 560, 680, 16), BOIS2, { sw: 2.8, r: 0.5 });
      ln(g, "M-266 -6 L266 -6 M-268 6 L-268 640", 1.6, "#F2F2EC");
    };
    const pince = () => {
      ln(g, "M-46 -26 C-46 -46 -30 -52 0 -52 C30 -52 46 -46 46 -26", 5.5, INK); ln(g, "M-46 -26 C-46 -46 -30 -52 0 -52 C30 -52 46 -46 46 -26", 2.4, "#CFCFCA");
      el("path", { d: rr(-80, -26, 160, 50, 10), fill: OMB, transform: "translate(3 6)" }, g);
      U.shape(C, "pince", rr(-80, -26, 160, 50, 10), MAT.mid, { sw: 2.4, r: 0.4, gap: 3.6 });
      ln(g, "M-70 -16 L70 -16", 1.8, "#F2F2EC");
      [-62, 62].forEach((x) => el("circle", { cx: x, cy: 12, r: 3.4, fill: "#F7F7F1", stroke: INK, "stroke-width": 1.4 }, g));
      el("circle", { cx: 0, cy: 0, r: 10, fill: "#D2D2CB", stroke: INK, "stroke-width": 2 }, g);         // trou de la pince
      el("circle", { cx: 0, cy: 0, r: 5.5, fill: "#8F8F88", stroke: INK, "stroke-width": 1.8 }, g);      // tête du clou
      el("circle", { cx: 88, cy: 10, r: 7, fill: "none", stroke: INK, "stroke-width": 2.6 }, g);         // anneau de la ficelle
    };
    if (part === "planche") planche(); else if (part === "pince") pince(); else { planche(); pince(); }
    return { clou: [0, 0], feuille: [0, 335], ficelle: [88, 15], w: 560, h: 680 };
  };
  D.planchette.essais = [{}];

  /* ═════════════════════ I. LA RÈGLE MÉDICALE D'AUJOURD'HUI (S22) — planche sur papier ═════════════════════ */

  // Règle graduée verticale : o.len × 22, graduations SANS chiffres (une longue tous les 50 px), embout en haut. o.max : le mot
  // « max. » au-dessus de la règle COURTE ; o.maxOn 0–1 : il passe au jaune (la règle ne mesure plus). Ancrage : le BAS.
  D.regle = (g, o = {}) => {
    const C = U.ctx(g, 932, false, 1), L = o.len || 170, mo = clamp(o.maxOn || 0, 0, 1);
    ombre(g, rect(-11, -L, 22, L), 4, 5);
    U.shape(C, "regle", rect(-11, -L, 22, L), { base: "#F4F2E8", hatch: "#C9C3B2", gap: 9, fw: 1 }, { sw: 2.4, r: 0.5 });
    let t = ""; for (let y = 0, i = 0; y <= L - 4; y += 10, i++) t += `M-11 ${-y} L${i % 5 === 0 ? 1 : -4} ${-y} `;
    ln(g, t, 1.6, INK);
    U.shape(C, "embout", rr(-14, -L - 6, 28, 9, 3), MAT.mid, { sw: 2, r: 0.4, gap: 3 });
    if (o.max) {
      if (mo > 0.02) el("rect", { x: -30, y: -L - 40, width: 60, height: 26, rx: 5, fill: YEL, opacity: f(mo) }, g);
      txt(g, "max.", 0, -L - 20, 22, {});
    }
    return { haut: [0, -L], L };
  };
  D.regle.essais = [{ len: 170, max: true }, { len: 170, max: true, maxOn: 1 }, { len: 300 }];

  // Grand tube de prélèvement : bouchon à côtes, tube de verre à fond rond, étiquette « Labor » collée (code-barres), le sang qui
  // monte (o.fill 0–1, jusque sous l'étiquette) = APLAT HACHURÉ FONCÉ (jamais de rouge). 60 × 192, ancrage : centre.
  // out.liquide = zone du liquide (bulles, m.dust).
  D.tubeSang = (g, o = {}) => {
    const C = U.ctx(g, 934, false, 1), fl = clamp(o.fill || 0, 0, 1);
    const tube = "M-24 -64 L24 -64 L24 70 Q24 95 0 95 Q-24 95 -24 70 Z";
    ombre(g, tube, 5, 6);
    el("path", { d: tube, fill: "#FFFFFF" }, g);
    const yl = lerp(90, -12, fl);
    if (fl > 0.02) {
      const liq = `M-20 ${f(yl)} Q0 ${f(yl + 4)} 20 ${f(yl)} L20 70 Q20 91 0 91 Q-20 91 -20 70 Z`;
      U.shape(C, "sang", liq, MAT.dark, { noStroke: true, gap: 3.6 });
      ln(g, `M-20 ${f(yl)} Q0 ${f(yl + 4)} 20 ${f(yl)}`, 1.6, INK);
    }
    U.shape(C, "verre", tube, {}, { sw: 2.6, r: 0.4 });
    ln(g, "M-14 -54 L-14 64", 3, "#FFFFFF", { opacity: 0.9 });
    ombre(g, rr(-27, -60, 54, 46, 3), 2, 3);                                                          // étiquette haute : on voit le sang monter dessous
    el("path", { d: rr(-27, -60, 54, 46, 3), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g);
    txt(g, "Labor", 0, -41, 16, {});
    let bc = ""; for (let x = -20, i = 0; x < 20; x += 2.6 + hsh(i * 2.9) * 2.4, i++) bc += `M${f(x)} -31 L${f(x)} -19 `;
    ln(g, bc, 1.3, INK);
    U.shape(C, "bouchon", rr(-29, -97, 58, 36, 6), MAT.mid, { sw: 2.4, r: 0.4, gap: 3.6 });
    ln(g, "M-18 -92 L-18 -66 M-6 -92 L-6 -66 M6 -92 L6 -66 M18 -92 L18 -66", 1.6, "#55554F");
    return { liquide: { x: -20, y: f(yl), w: 40, h: f(Math.max(0, 90 - yl)) }, haut: [0, -97], bas: [0, 95] };
  };
  D.tubeSang.essais = [{ fill: 0 }, { fill: 0.8 }];

  // Cadran de la règle « toutes les heures » : couronne grise, face blanche, 12 graduations IDENTIQUES (aucun chiffre), o.n (0–12,
  // décimal) marques JAUNES allumées l'une après l'autre dans le sens horaire depuis le haut (la dernière apparaît en fondu), UNE
  // aiguille qui suit la dernière marque (o.a force l'angle). Rayon o.r (105), ancrage : centre.
  D.cadranHoraire = (g, o = {}) => {
    const C = U.ctx(g, 936, false, 1), r = o.r || 105, n = clamp(o.n || 0, 0, 12);
    el("circle", { cx: 6, cy: 7, r, fill: OMB }, g);
    U.shape(C, "couronne", circ(0, 0, r), MAT.grey, { sw: 3, r: 0.5, gap: 5 });
    U.shape(C, "face", circ(0, 0, r - 15), MAT.white, { sw: 2.4, r: 0.5 });
    const P = (a, R) => `${f(Math.sin(rad(a)) * R)} ${f(-Math.cos(rad(a)) * R)}`;
    for (let i = 0; i < 12; i++) {
      const a = i * 30, k = clamp(n - i, 0, 1);
      if (k > 0.02) { ln(g, `M${P(a, r - 46)} L${P(a, r - 26)}`, 13, INK, { opacity: f(k) }); ln(g, `M${P(a, r - 46)} L${P(a, r - 26)}`, 8.5, YEL, { opacity: f(k) }); }
      else ln(g, `M${P(a, r - 40)} L${P(a, r - 26)}`, 3.2, INK);
    }
    const ah = o.a != null ? o.a : n > 0.02 ? (Math.ceil(n - 0.02) - 1) * 30 : 0;
    ln(g, `M${P(ah + 180, 12)} L${P(ah, r - 54)}`, 5.5, INK);
    el("circle", { cx: 0, cy: 0, r: 8, fill: YEL, stroke: INK, "stroke-width": 2.2 }, g);
    return { r };
  };
  D.cadranHoraire.essais = [{ n: 0 }, { n: 4.5 }, { n: 12 }];

  // Une case de la coupe, en grand (S22, rang « Intensivstation ») : 320 × 270, ancrage : coin HAUT-GAUCHE (posée en (150, 1090)).
  // Murs et dalles COUPÉS (même matière que D.coupe), mur éclairé si o.on (0–1 ; éteint : nuit hachurée), voile jaune, plafonnier ;
  // deux D.litMini({ kind: "its" }) au sol (centres x 92 et 226, sol y 259) et un D.moniteurMini au-dessus de chaque lit (y 150).
  //   o.breath 0–1 (bosse des lits, en opposition) · o.t (tracé des moniteurs) · o.alarm (voyant du 2e moniteur)
  //   o.part "piece" : la pièce seule ; la scène pose lits et moniteurs en out.lits / out.moniteurs pour les animer sans redessiner.
  D.caseEtage = (g, o = {}) => {
    const C = U.ctx(g, 938, false, 1), on = clamp(o.on == null ? 1 : o.on, 0, 1), W = 320, H = 270, e = 11, fl = H - e;
    el("rect", { x: e, y: e, width: W - 2 * e, height: fl - e, fill: mixc(MUR0, MUR1, on) }, g);
    if (on < 0.98) hachNuit(g, e + 4, e + 4, W - 2 * e - 8, fl - e - 8, { gap: 20, sw: 1.7, op: f((1 - on) * 0.85), seed: 38 });
    if (on > 0.01) {
      el("rect", { x: e, y: e, width: W - 2 * e, height: fl - e, fill: YEL, opacity: f(0.16 * on) }, g);
      el("path", { d: `M${W / 2 - 11} ${e + 14} L${W / 2 + 11} ${e + 14} L${W / 2 + 70} ${e + 150} L${W / 2 - 70} ${e + 150} Z`, fill: YEL, opacity: f(0.1 * on) }, g);
    }
    ln(g, `M${W / 2} ${e} L${W / 2} ${e + 7}`, 1.8, INK);
    el("path", { d: `M${W / 2 - 11} ${e + 7} L${W / 2 + 11} ${e + 7} A11 10 0 0 1 ${W / 2 - 11} ${e + 7} Z`, fill: mixc("#DADCE2", "#FFE98A", on), stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" }, g);
    ln(g, `M${e} ${fl - 9} L${W - e} ${fl - 9}`, 1.3, "#B4B4AE");                                          // plinthe
    U.stroke(C, "sol", `M${e} ${fl} L${W - e} ${fl}`, { sw: 2.4 });
    U.shape(C, "dalleH", rect(0, 0, W, e), CUT, { sw: 2.2, r: 0.45 });
    U.shape(C, "dalleB", rect(0, fl, W, H - fl), CUT, { sw: 2.2, r: 0.45 });
    U.shape(C, "murG", rect(0, 0, e, H), CUT, { sw: 2.2, r: 0.45 });
    U.shape(C, "murD", rect(W - e, 0, e, H), CUT, { sw: 2.2, r: 0.45 });
    const lits = [[92, fl], [226, fl]], mons = [[92, 150], [226, 150]];
    if (o.part !== "piece") {
      const br = clamp(o.breath || 0, 0, 1);
      lits.forEach(([x, y], i) => D.litMini(el("g", { transform: `translate(${x} ${y})` }, g), { kind: "its", breath: f(i ? 1 - br : br) }));
      mons.forEach(([x, y], i) => D.moniteurMini(el("g", { transform: `translate(${x} ${y})` }, g), { t: f(((o.t || 0) + i * 0.37) % 1), alarm: i === 1 && o.alarm ? 1 : 0 }));
    }
    return { lits, moniteurs: mons, sol: fl, w: W, h: H };
  };
  D.caseEtage.essais = [{ on: 1, breath: 0.5, t: 0.3 }, { on: 0, part: "piece" }];

  // Pictogramme de médecin (tête ronde + blouse ouverte + stéthoscope, sans visage), 30 × 74, ancrage : les PIEDS (S22 : (440, 1350),
  // dans la case, à côté du 2e lit). o.salut 0–1 : le bras droit se lève (un petit salut au lit à chaque marque du cadran).
  D.pictoMedecin = (g, o = {}) => {
    const C = U.ctx(g, 940, false, 1), sa = clamp(o.salut || 0, 0, 1);
    el("ellipse", { cx: 1, cy: 1, rx: 14, ry: 2.6, fill: "rgba(28,26,28,.15)" }, g);
    ln(g, "M-5 -26 L-6 -1 M5 -26 L6 -1", 5.5, INK);
    ln(g, "M-5 -26 L-6 -1 M5 -26 L6 -1", 2.4, "#9A9A94");
    const bras = (x, ang) => { const e = [x + Math.sin(rad(ang)) * 22, -50 + Math.cos(rad(ang)) * 22]; ln(g, `M${x} -50 L${f(e[0])} ${f(e[1])}`, 6.5, INK); ln(g, `M${x} -50 L${f(e[0])} ${f(e[1])}`, 3.4, "#FFFFFF"); el("circle", { cx: f(e[0]), cy: f(e[1]), r: 3.8, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g); };
    bras(-11, -12);
    U.shape(C, "blouse", "M-12 -54 Q0 -59 12 -54 L15 -22 L-15 -22 Z", MAT.white, { sw: 2.2, r: 0.4 });
    ln(g, "M0 -55 L0 -22 M-6 -54 Q0 -42 6 -54", 1.4, INK);
    bras(11, lerp(14, 160, sa));
    U.shape(C, "tete", circ(0, -66, 9.5), SKIN, { sw: 2.2, r: 0.4 });
    return { tete: [0, -66], top: -76 };
  };
  D.pictoMedecin.essais = [{}, { salut: 1 }];
  }
})();
