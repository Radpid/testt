/* decor-2.js — AKTE 05 (Krefeld, « بوحدهم فالليل ») — décors et objets PROPRES à l'épisode, 2e partie : S8 à S21.
 * E. urgences (S8, S9) · F. chambre (S12, S15) · G. poste de nuit (S13 ; listeGarde sert aussi à S23) · H. tribunal (S16–S21).
 * Même main que decor.js : mêmes outils (D.outils), mêmes matières, ombre décalée #D2D2CB, bleu nuit en HACHURES seulement.
 * Convention : chaque fonction dessine dans g autour de son ancrage (0,0), reçoit ses paramètres animés dans o (ARRONDIS par la
 * scène) et renvoie des ancres. o.flip (brancard, gisant) : dessin retourné (tête à droite), ancres déjà retournées.
 * o.part : certaines fonctions dessinent une partie seule (battants, lueur, goutte, étiquette…) pour l'animer à part
 * (m.pend, opacité) sans redessiner le grand décor.
 * Dessins délicats (règles du skill) : D.gisant = la personne allongée (jamais une tête Persona pivotée), D.dos = un personnage
 * vu de dos (jamais un visage, jamais un œil). Proportions Persona à l'échelle 1 (tête ≈ 125 px).
 * Essai : node tools/essai_decor.mjs videos/akte-krefeld-nacht --cols 2 --cell 540 --per 6 --only nom1,nom2
 */
(function () {
  "use strict";
  const D = window.EpDecor = window.EpDecor || {};
  // Les outils (D.outils) viennent de decor.js. index.html charge decor.js d'abord ; tools/essai_decor.mjs charge les fichiers par
  // ordre alphabétique (decor-2.js AVANT decor.js) : dans ce cas on attend, et decor.js lance la file D._apres à sa fin.
  if (D.outils) suite(); else (D._apres = D._apres || []).push(suite);
  function suite() {
  const SC = SketchCast, U = SC.util, O = D.outils;
  const { el, ln, f, clamp, lerp, rad, hsh, rect, circ, poly, ombre, mixc, hachNuit, MAT, CUT, INK, YEL, NUIT, OMB, MUR1, GRIS } = O;
  const rr = (x, y, w, h, r) => U.rrect(f(x), f(y), f(w), f(h), r);
  const blob = U.blob, curve = U.curve, AR = "'Plex Arabic', sans-serif";
  const sm = (t) => t * t * (3 - 2 * t);
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
  const mid = (a, b, t) => { t = t == null ? 0.5 : t; return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; };
  const norm = (a) => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const dir = (deg) => [Math.cos(rad(deg)), Math.sin(rad(deg))];
  const ell = (cx, cy, rx, ry, n) => { const p = []; for (let i = 0; i < (n || 10); i++) { const a = i / (n || 10) * Math.PI * 2; p.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]); } return p; };
  const txt = (g, s, x, y, size, o) => U.text(g, s, f(x), f(y), size, o || {});
  const arTxt = (g, s, x, y, size, o) => U.text(g, s, f(x), f(y), size, Object.assign({ font: AR, weight: 700, rtl: true }, o || {}));
  const SKIN = MAT.skin, WOOD = MAT.wood, BOIS2 = { base: "#DCDCD5", hatch: "#8F8F88", gap: 5.5, fw: 1.2 };   // bois clair / bois foncé (hachures grises)
  const JOUR = "#FFF8DE";                                                                              // lumière du jour (papier jaune très pâle)

  // membre effilé (épaule, coude, poignet) → contour lisse ; même dessin que les bras de Persona
  function limb(J, w) {
    const d1 = norm(sub(J[1], J[0])), d2 = norm(sub(J[2], J[1])), n1 = [d1[1], -d1[0]], n2 = [d2[1], -d2[0]];
    let nm = add(n1, n2); if (Math.hypot(nm[0], nm[1]) < 0.3) nm = n1; nm = norm(nm);
    const k = Math.min(1.12, 1 / Math.max(0.5, nm[0] * n1[0] + nm[1] * n1[1]));
    const rows = [[J[0], n1, w[0]], [mid(J[0], J[1]), n1, (w[0] + w[1]) / 2 + 1], [J[1], nm, w[1] * k], [mid(J[1], J[2]), n2, (w[1] + w[2]) / 2 + 0.5], [J[2], n2, w[2]]];
    const L = rows.map((r) => add(r[0], mul(r[1], r[2] / 2))), R = rows.map((r) => sub(r[0], mul(r[1], r[2] / 2))).reverse();
    return blob(L.concat([add(J[2], mul(d2, w[2] * 0.3))], R, [sub(J[0], mul(d1, w[0] * 0.22))]));
  }
  // main en moufle (jamais de doigts) : poignet, direction de l'avant-bras d, côté du pouce th (±1)
  function moufle(C, key, wrist, d, th, mat) {
    const nr = [d[1] * th, -d[0] * th];
    const pts = [[-6, -8], [2, -12], [9, -16.5], [14, -12.5], [22, -9], [25, 0], [22, 9], [13, 12.5], [3, 12], [-6, 8]].map((q) => add(wrist, add(mul(d, q[0] - 2), mul(nr, -q[1]))));
    return U.shape(C, key, blob(pts), mat || SKIN, { sw: 2.5 });
  }
  // contour « bouclé » (cheveux frisés) : un point sur deux gonfle vers l'extérieur
  function bosses(pts, step, amp) {
    const n = pts.length, o = []; let cx = 0, cy = 0; pts.forEach((p) => { cx += p[0] / n; cy += p[1] / n; });
    for (let i = 0; i < n; i++) {
      const a = pts[i], b = pts[(i + 1) % n], k = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / step));
      for (let j = 0; j < k; j++) { const q = mid(a, b, j / k), q2 = mid(a, b, (j + 0.5) / k), d = norm(sub(b, a)); let nn = [d[1], -d[0]]; if ((q2[0] - cx) * nn[0] + (q2[1] - cy) * nn[1] < 0) nn = mul(nn, -1); o.push(q, add(q2, mul(nn, amp))); }
    }
    return o;
  }
  // racine retournée (tête à droite) : hachures restent à −41° à l'écran (ctx flip), ancres renvoyées retournées
  const racine = (g, o, seed) => { const flip = !!o.flip, r = el("g", flip ? { transform: "scale(-1 1)" } : {}, g); return { r, C: U.ctx(r, seed, flip, 1), fx: (p) => [f(flip ? -p[0] : p[0]), f(p[1])], flip }; };
  const roue = (g, x, y, r, roll, col) => {                                                            // roue à 3 rayons
    el("circle", { cx: f(x), cy: f(y), r, fill: col || "#55554F", stroke: INK, "stroke-width": 2 }, g);
    el("circle", { cx: f(x), cy: f(y), r: f(r * 0.42), fill: "#E4E4DE", stroke: INK, "stroke-width": 1.5 }, g);
    let s = ""; for (let i = 0; i < 3; i++) { const q = rad((roll || 0) + i * 120); s += `M${f(x + Math.cos(q) * r * 0.42)} ${f(y + Math.sin(q) * r * 0.42)} L${f(x + Math.cos(q) * r * 0.85)} ${f(y + Math.sin(q) * r * 0.85)} `; }
    ln(g, s, 1.8, "#B9B9B2");
  };

  /* ═════════════════════ E. URGENCES (S8, S9) — box de la Notfallambulanz, monde : salleNuit (x 110–960, sol 1300) ═════════════════════ */

  // Portes battantes à hublot dans le mur du fond, à gauche : 144 × 544, ancrage bas-gauche (posé en (110, 1300)).
  // Ouverture x 24…132, y −520…0 (monde 134–242 × 780–1300) ; derrière : le dehors de nuit (hachures bleu nuit).
  //   o.part "cadre" (tout sauf battants et lueur) · "battants" (o.open 0–1 : chaque battant pivote sur son gond et s'amincit ;
  //   la scène pilote open par un amorti, 8° → 0) · "lueur" (bande jaune du gyrophare sur le chambranle droit et le mur, à faire
  //   pulser par l'opacité du nœud) ; sans o.part : cadre + battants (+ lueur si o.glow).
  D.portesBattantes = (g, o = {}) => {
    const C = U.ctx(g, 830, false, 1), part = o.part, x0 = 24, x1 = 132, top = -520, open = clamp(o.open || 0, 0, 1);
    const cadre = () => {
      el("rect", { x: x0, y: top, width: x1 - x0, height: -top, fill: "#E2E5EB" }, g);
      hachNuit(g, x0 + 3, top + 3, x1 - x0 - 6, -top - 50, { gap: 14, sw: 1.7, seed: 31 });
      el("path", { d: rect(x0, -44, x1 - x0, 44), fill: "#D3D7DF" }, g);                               // sol du sas, au-delà
      ln(g, `M${x0} -44 L${x1} -44 M${x0 + 20} -30 L${x0 + 70} -30`, 1.4, "#8F95A3");
      ombre(g, rect(x1, top - 12, 12, 532), 5, 0);
      U.shape(C, "linteau", rect(10, top - 24, 136, 14), MAT.grey, { sw: 2.2, r: 0.5 });
      U.shape(C, "jambeG", rect(12, top - 10, 12, 510), MAT.grey, { sw: 2.2, r: 0.5 });
      U.shape(C, "jambeD", rect(x1, top - 10, 12, 510), MAT.grey, { sw: 2.2, r: 0.5 });
      U.stroke(C, "seuil", `M10 0 L146 0`, { sw: 2.6 });
      el("rect", { x: 112, y: top - 64, width: 32, height: 24, rx: 4, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g);   // voyant « porte » au-dessus
      ln(g, "M120 -572 L136 -572 M128 -580 L128 -564", 2.2, INK);
    };
    const battants = () => {
      const k = 1 - 0.8 * open, w = 54 * k, dy = 20 * open;
      [[x0, 1], [x1, -1]].forEach(([hx, s], i) => {
        const fx = hx + s * w, d = poly([[hx, -500], [fx, -500 + dy], [fx, -6 - dy * 0.4], [hx, -6]]);
        ombre(g, d, 3, 4);
        U.shape(C, "battant" + i, d, MAT.light, { sw: 2.3, r: 0.5 });
        const pk = poly([[hx, -70], [fx, -70 + dy * 0.2], [fx, -8 - dy * 0.4], [hx, -8]]);        // plaque de protection
        U.shape(C, "plaque" + i, pk, MAT.mid, { sw: 1.8, r: 0.4, gap: 4 });
        const cx = (hx + fx) / 2, cy = -372 + dy * 0.4;
        el("ellipse", { cx: f(cx), cy: f(cy), rx: f(Math.max(2.5, 15 * k)), ry: 17, fill: "#DADDE6", stroke: INK, "stroke-width": 2.4 }, g);
        if (k > 0.5) ln(g, `M${f(cx - 6 * k)} ${f(cy + 8)} L${f(cx + 4 * k)} ${f(cy - 10)}`, 2, "#FFFFFF");
        ln(g, `M${f(hx + s * 4)} -300 L${f(hx + s * 4)} -230`, 1.2, "#A9A9A2");                       // gond
      });
    };
    const lueur = () => {
      el("path", { d: `M${x1 + 12} ${top} L${x1 + 70} ${top + 60} L${x1 + 70} -40 L${x1 + 12} 0 Z`, fill: YEL, opacity: 0.22 }, g);
      el("rect", { x: x1, y: top - 10, width: 12, height: 510, fill: YEL, opacity: 0.6 }, g);
      el("rect", { x: x0 + 4, y: top, width: 18, height: -top, fill: YEL, opacity: 0.25 }, g);
    };
    if (part === "battants") battants();
    else if (part === "lueur") lueur();
    else { cadre(); if (part !== "cadre") { if (o.glow) lueur(); battants(); } }
    return { ouverture: [x0, x1, top], gondG: [x0, -500], gondD: [x1, -500] };
  };
  D.portesBattantes.essais = [{}, { open: 1, glow: 1 }, { part: "battants", open: 0.5 }];

  // Lampe d'examen sur bras articulé fixé au mur : platine (0,0), deux segments, tête ronde en (−40, 100), cône de lumière jaune
  // vers le bas (o.op, défaut 0,13 ; o.on 0–1 ; longueur o.cone, défaut 420, largeur 280 en bas). Ancrage : la platine (pivot de m.pend).
  D.lampeExamen = (g, o = {}) => {
    const C = U.ctx(g, 832, false, 1), on = o.on == null ? 1 : clamp(o.on, 0, 1), op = (o.op == null ? 0.13 : o.op) * on, L = o.cone || 420, hx = -40, hy = 100;
    if (op > 0.004) el("path", { d: `M${hx - 24} ${hy + 14} L${hx + 24} ${hy + 14} L${hx + 140} ${hy + L} L${hx - 140} ${hy + L} Z`, fill: YEL, opacity: f(op) }, g);
    ombre(g, rr(-11, -18, 22, 36, 4), 4, 4);
    U.shape(C, "platine", rr(-11, -18, 22, 36, 4), MAT.mid, { sw: 2.2, r: 0.5, gap: 4 });
    const bras = "M0 0 L26 46 L-30 78";
    ln(g, bras, 10, INK); ln(g, bras, 6, "#E4E4DE");
    ln(g, "M6 12 L20 36 M-4 58 L-20 70", 1.4, "#77776F");                                                 // ressorts
    [[0, 0], [26, 46], [-30, 78]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 5.5, fill: "#CFCFCA", stroke: INK, "stroke-width": 2 }, g));
    const dome = `M${hx - 32} ${hy + 12} C${hx - 32} ${hy - 26} ${hx + 32} ${hy - 26} ${hx + 32} ${hy + 12} Z`;
    ombre(g, dome, 4, 5);
    U.shape(C, "tete", dome, MAT.grey, { sw: 2.6, r: 0.5 });
    U.shape(C, "jonc", rr(hx - 35, hy + 8, 70, 8, 3), MAT.mid, { sw: 2, r: 0.4, gap: 3 });
    el("ellipse", { cx: hx, cy: hy + 17, rx: 27, ry: 4.5, fill: on > 0.05 ? "#FFF3B8" : "#E9ECEF", stroke: INK, "stroke-width": 1.6 }, g);
    ln(g, `M${hx + 32} ${hy - 2} L${hx + 46} ${hy - 8}`, 4.5, INK);                                       // poignée
    ln(g, `M${hx - 18} ${hy - 10} Q${hx - 10} ${hy - 18} ${hx + 2} ${hy - 19}`, 2.4, "#FFFFFF");
    return { tete: [hx, hy], cone: [hx, hy + 14] };
  };
  D.lampeExamen.essais = [{}, { on: 0 }];

  // Étagère murale OUVERTE à bacs étiquetés (ni portes ni vitres) : 150 × 120, ancrage : coin haut-gauche (posé en (715, 640)).
  D.armoireMur = (g) => {
    const C = U.ctx(g, 834, false, 1);
    const planche = (y, k) => { ombre(g, rect(0, y, 150, 8), 4, 5); U.shape(C, "planche" + k, rect(0, y, 150, 8), BOIS2, { sw: 2, r: 0.5 }); [18, 132].forEach((x, i) => U.shape(C, "equerre" + k + i, `M${x - 5} ${y + 8} L${x + 5} ${y + 8} L${x + 5} ${y + 26} Z`, MAT.mid, { sw: 1.6, r: 0.4, gap: 3 })); };
    // rang du haut : trois bacs étiquetés (compresses, rouleaux, cathéters), ce qui dépasse
    [[6, 0], [54, 1], [102, 2]].forEach(([x, i]) => {
      if (i === 0) U.shape(C, "compr", rect(x + 6, 20, 30, 12), MAT.white, { sw: 1.5, r: 0.4 });
      if (i === 1) [x + 12, x + 26].forEach((cx, j) => { el("ellipse", { cx: cx, cy: 22, rx: 7, ry: 9, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.5 }, g); el("circle", { cx: cx, cy: 22, r: 2.4, fill: "#C9C9C2" }, g); });
      if (i === 2) ln(g, `M${x + 10} 30 L${x + 14} 12 M${x + 20} 30 L${x + 22} 10 M${x + 30} 30 L${x + 32} 14`, 2.2, "#77776F");
      const bac = `M${x} 24 L${x + 42} 24 L${x + 40} 52 L${x + 2} 52 Z`;
      U.shape(C, "bac" + i, bac, i === 1 ? MAT.grey : MAT.light, { sw: 2, r: 0.4 });
      el("rect", { x: x + 8, y: 32, width: 26, height: 11, rx: 1.5, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.2 }, g);
      ln(g, `M${x + 12} 37.5 L${x + 27 - i * 3} 37.5`, 1.6, "#9A9A94");
    });
    planche(52, 0);
    // rang du bas : boîte de gants, flacon pompe, pile de compresses
    U.shape(C, "gants", rect(8, 86, 44, 30), MAT.white, { sw: 2, r: 0.4 });
    el("ellipse", { cx: 30, cy: 96, rx: 11, ry: 4.5, fill: "#55554F" }, g);
    U.shape(C, "gant", "M24 95 C22 84 30 80 33 86 C36 82 40 88 36 95 Z", MAT.grey, { sw: 1.5, r: 0.5, gap: 3 });
    ln(g, "M14 108 L44 108", 1.4, "#B4B4AE");
    U.shape(C, "flacon", "M66 116 L66 92 Q66 86 72 86 L84 86 Q90 86 90 92 L90 116 Z", MAT.light, { sw: 2, r: 0.4 });
    U.shape(C, "pompe", rect(74, 74, 8, 12), MAT.mid, { sw: 1.5, r: 0.4, gap: 3 });
    ln(g, "M78 74 L78 70 L90 70", 2.2, INK);
    el("rect", { x: 70, y: 96, width: 16, height: 12, fill: YEL, stroke: INK, "stroke-width": 1.2 }, g);
    [0, 1, 2].forEach((k) => U.shape(C, "pile" + k, rect(104 - k * 1.5, 104 - k * 7, 36, 7), MAT.white, { sw: 1.5, r: 0.4 }));
    planche(116, 1);
    return { w: 150, h: 142 };
  };

  // Chariot d'urgence à tiroirs : 130 × 196, ancrage : sol, centre (posé en (800, 1300)). Boîte de gants, haricot, collecteur
  // à couvercle JAUNE, poignée à droite. Renvoie { top: −160, depot: [x, y] (où poser le bloc-notes ou la seringue) }.
  D.chariotUrgence = (g) => {
    const C = U.ctx(g, 836, false, 1);
    el("ellipse", { cx: 3, cy: 2, rx: 66, ry: 5, fill: "rgba(28,26,28,.15)" }, g);
    ln(g, "M-50 -24 L-50 -12 M50 -24 L50 -12", 3, INK);
    [-50, 50].forEach((x) => roue(g, x, -9, 9, 30, "#55554F"));
    ombre(g, rect(-58, -152, 116, 128), 6, 6);
    U.shape(C, "caisse", rect(-58, -152, 116, 128), MAT.light, { sw: 2.6, r: 0.5 });
    [[-146, 28], [-114, 28], [-82, 28], [-50, 22]].forEach(([y, h], i) => {
      U.shape(C, "tiroir" + i, rr(-52, y, 104, h, 3), MAT.white, { sw: 1.9, r: 0.4 });
      ln(g, `M-14 ${y + h / 2} L14 ${y + h / 2}`, 3.2, INK);
      el("rect", { x: -46, y: y + 5, width: 18, height: 8, fill: i === 0 ? YEL : "#E4E4DE", stroke: INK, "stroke-width": 1 }, g);
    });
    U.shape(C, "plateau", rr(-64, -162, 128, 11, 3), MAT.mid, { sw: 2.2, r: 0.4, gap: 4 });
    ln(g, "M58 -148 L72 -148 L72 -104 L58 -104", 3.4, INK);                                              // poignée
    // sur le plateau : boîte de gants (gauche), haricot (milieu), collecteur à couvercle jaune (droite)
    U.shape(C, "gants", rect(-60, -190, 36, 28), MAT.white, { sw: 1.9, r: 0.4 });
    el("ellipse", { cx: -42, cy: -181, rx: 9, ry: 3.5, fill: "#55554F" }, g);
    U.shape(C, "gant", "M-47 -181 C-49 -191 -41 -195 -39 -189 C-36 -193 -33 -187 -37 -181 Z", MAT.grey, { sw: 1.4, r: 0.5, gap: 3 });
    U.shape(C, "haricot", "M-20 -162 C-22 -172 -10 -170 -2 -168 C6 -166 18 -172 18 -162 Z", MAT.grey, { sw: 1.7, r: 0.4, gap: 3.4 });
    U.shape(C, "collecteur", "M24 -162 L26 -192 L56 -192 L58 -162 Z", MAT.light, { sw: 2, r: 0.4 });
    U.shape(C, "couvercle", rr(22, -200, 38, 10, 3), MAT.yellow, { sw: 2, r: 0.4 });
    ln(g, "M32 -195 L50 -195", 2, INK);
    return { top: -162, depot: [-1, -166], w: 130 };
  };

  // Rideau de box sur rail au plafond : rail, anneaux, tissu plissé de 50 × 680, ourlet ondulé. Ancrage : haut du rail (posé en
  // (925, 592), sous le plafond coupé) ; pivot de m.sway = (0, 18).
  D.rideauBox = (g, o = {}) => {
    const C = U.ctx(g, 838, false, 1), H = o.h || 700, w = 25;
    U.shape(C, "rail", rr(-34, 14, 68, 8, 3), MAT.mid, { sw: 2, r: 0.4, gap: 3 });
    let bord = `M${-w} 30`;
    for (let i = 0; i <= 5; i++) { const x = -w + i * 10; bord += ` Q${x + 5} ${i % 2 ? 24 : 36} ${x + 10} 30`; }
    const d = `M${-w} 30 L${w} 30 C${w + 3} ${f(H * 0.4)} ${w - 3} ${f(H * 0.7)} ${w + 2} ${H - 8} Q${w - 6} ${H + 2} ${w - 12} ${H - 6} Q${w - 18} ${H + 4} ${w - 25} ${H - 6} Q${w - 32} ${H + 4} ${w - 38} ${H - 6} Q${w - 44} ${H + 2} ${-w} ${H - 8} C${-w - 3} ${f(H * 0.7)} ${-w + 3} ${f(H * 0.4)} ${-w} 30 Z`;
    ombre(g, d, 5, 4);
    U.shape(C, "tissu", d, MAT.light, { sw: 2.3, r: 0.5 });
    [[-12, 0], [0, 1], [12, 2]].forEach(([x, i]) => { el("path", { d: `M${x - 3} 34 C${x - 1} ${f(H * 0.35)} ${x - 4} ${f(H * 0.7)} ${x - 2} ${H - 10} L${x + 3} ${H - 10} C${x + 1} ${f(H * 0.7)} ${x + 4} ${f(H * 0.35)} ${x + 3} 34 Z`, fill: "#D9D9D2" }, g); ln(g, `M${x} 34 C${x + 2} ${f(H * 0.35)} ${x - 1} ${f(H * 0.7)} ${x + 1} ${H - 10}`, 1.4, "#8F8F88"); });
    ln(g, bord, 2, INK);
    for (let x = -20; x <= 20; x += 10) el("circle", { cx: x, cy: 26, r: 3.6, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
    return { haut: [0, 18], h: H };
  };
  D.rideauBox.essais = [{ h: 700 }];

  // Brancard à l'échelle 1, tête à GAUCHE (o.flip : tête à droite) : matelas 440 (dessus y −180), plateau, châssis en X, 4 roues
  // (o.roll = angle), barrière baissée, barre de poussée côté pieds, dossier relevé de o.tilt degrés (défaut 12) autour de la
  // charnière (x0 + 200, −180). Ancrage : sol, centre (S8 : (430, 1300), flip). Pour poser D.gisant dessus :
  //   m.obj(D.gisant, x + out.tete[0], y + out.tete[1], 1, { flip: true, dossier: out.tilt, … })
  // Renvoie { top: −180, x0, x1, tete (coin haut du matelas côté tête), hinge, tilt, bar (poignée), pole (support de perfusion) }.
  D.brancard = (g, o = {}) => {
    const { r, C, fx, flip } = racine(g, o, 842), roll = o.roll || 0, tilt = o.tilt == null ? 12 : o.tilt;
    const x0 = -220, x1 = 220, top = -180, xh = x0 + 200;
    el("ellipse", { cx: 4, cy: 2, rx: 210, ry: 7, fill: "rgba(28,26,28,.15)" }, r);
    [[-176, -16], [186, -16]].forEach(([x, y]) => roue(r, x, y, 10, roll + 40, "#6E6E68"));                     // roues du fond
    U.shape(C, "base", rr(-196, -42, 392, 9, 3), MAT.mid, { sw: 2, r: 0.4, gap: 3.4 });
    ln(r, "M-172 -33 L-172 -26 M172 -33 L172 -26", 3.6, INK);
    const ciseaux = "M-150 -150 L140 -42 M150 -150 L-140 -42";
    ln(r, ciseaux, 9, INK); ln(r, ciseaux, 5, "#CFCFCA");
    el("circle", { cx: 0, cy: -96, r: 5, fill: "#E4E4DE", stroke: INK, "stroke-width": 2 }, r);
    [-172, 172].forEach((x) => roue(r, x, -13, 13, roll));
    // plateau + matelas : partie plate (pieds) puis dossier relevé (tête)
    U.shape(C, "plateau", rect(xh, -160, x1 - xh, 10), MAT.mid, { sw: 2, r: 0.4, gap: 3.4 });
    ombre(r, rr(xh, top, x1 - xh, 20, 6), 0, 6);
    U.shape(C, "matelas", rr(xh - 6, top, x1 - xh + 6, 20, 6), MAT.white, { sw: 2.4, r: 0.4 });
    const dos = el("g", { transform: `rotate(${f(tilt)} ${xh} ${top})` }, r), Cd = C.sub(dos);
    U.shape(Cd, "plateauD", rect(x0, -160, xh - x0, 10), MAT.mid, { sw: 2, r: 0.4, gap: 3.4 });
    U.shape(Cd, "matelasD", rr(x0, top, xh - x0 + 4, 20, 6), MAT.white, { sw: 2.4, r: 0.4 });
    ln(r, `M${x0 + 70} -150 L${x0 + 110} -150`, 3, INK);
    ln(r, `M${x0 + 64} ${f(-150 - (xh - x0 - 64) * Math.sin(rad(tilt)))} L${x0 + 110} -150`, 3, INK);       // vérin du dossier
    ln(r, `M${xh + 10} -170 L${x1 - 10} -170`, 1.3, "#B4B4AE");
    // barrière baissée (côté spectateur), barre de poussée côté pieds, support de perfusion côté tête
    U.shape(C, "barriere", rr(-120, -146, 230, 8, 4), MAT.grey, { sw: 1.9, r: 0.4 });
    ln(r, "M-100 -150 L-100 -146 M90 -150 L90 -146", 3, INK);
    ln(r, `M${x1 - 4} -160 L${x1 + 4} -246 M${x1 + 4} -246 L${x1 - 18} -246`, 4.6, INK);
    ln(r, `M${x1 - 4} -160 L${x1 + 4} -246 M${x1 + 4} -246 L${x1 - 18} -246`, 2, "#CFCFCA");
    const pole = [x0 + 8, f(-160 - 200 * Math.sin(rad(tilt)) + 8)];
    return { top, x0: flip ? -x1 : x0, x1: flip ? -x0 : x1, tete: fx([x0, top]), hinge: fx([xh, top]), tilt, bar: fx([x1 - 6, -246]), pole: fx(pole) };
  };
  D.brancard.essais = [{}, { flip: true, roll: 60, tilt: 0 }];

  // LE PATIENT ALLONGÉ — dessin dédié (jamais une tête Persona pivotée), proportions Persona (tête ≈ 125 px, 47 ans, couronne de
  // cheveux châtains, crâne dégarni dessus). Repère : coin haut du matelas côté TÊTE (0,0) ; le corps s'étend vers +x (≈ 460).
  // o.flip : tête à droite. o.tenue "ville" (T-shirt gris, S8–S9) · "chemise" (chemise d'hôpital à pois, S12, S15).
  // o.eye "half" (mi-clos) · "closed" (fermé + cils) ; o.breath 0–1 (poitrine +4 px) ; o.roll 0–1 (la tête roule de 9°, bouche
  // entrouverte) ; o.arm 0 = main posée sur le ventre → 1 = le bras glisse et pend au bord du matelas (avant-bras vertical, main
  // ouverte, bracelet JAUNE au poignet) ; o.dossier = angle du dossier (brancard : 12) : tête, oreiller et épaules montent.
  // Renvoie { head, mouth, chest, hand, wrist, iv (cathéter sur l'avant-bras, pour la tubulure), feet }.
  D.gisant = (g, o = {}) => {
    const { r, C, fx } = racine(g, o, 844);
    const ville = o.tenue === "ville", br = clamp(o.breath || 0, 0, 1), arm = sm(clamp(o.arm || 0, 0, 1)), roll = clamp(o.roll || 0, 0, 1);
    const tilt = o.dossier || 0, XH = 205, ZONE = 60, HX = 74, HY = -92, b = 4 * br;
    const M = (p) => { if (!tilt) return p; const k = sm(clamp((XH - p[0]) / ZONE, 0, 1)), a = rad(tilt * k), dx = p[0] - XH, dy = p[1]; return [XH + dx * Math.cos(a) - dy * Math.sin(a), dx * Math.sin(a) + dy * Math.cos(a)]; };
    const MP = (pts) => pts.map(M);
    const rig = tilt ? { transform: `rotate(${f(tilt)} ${XH} 0)` } : {};
    const shirt = ville ? MAT.grey : MAT.white;
    // oreiller (suit le dossier)
    const t1 = el("g", rig, r), C1 = C.sub(t1);
    U.shape(C1, "oreiller", "M4 -3 C-3 -17 12 -31 42 -30 L104 -31 C128 -32 138 -18 132 -5 C128 2 8 3 4 -3 Z", MAT.white, { sw: 2.4, r: 0.6 });
    ln(t1, "M22 -22 Q60 -17 108 -24 M112 -10 Q122 -12 128 -6", 1.3, "#C4C4BD");
    // cou, puis buste (T-shirt / chemise) jusqu'au revers du drap
    U.shape(C, "cou", blob(MP([[120, -134], [150, -124], [176, -104], [172, -56], [132, -48], [108, -62]]), 0.7), SKIN, { sw: 2.2, r: 0.5 });
    ln(r, "M" + MP([[146, -122], [156, -116]]).map((p) => f(p[0]) + " " + f(p[1])).join(" L"), 1.3, "#9A9A94");
    const buste = MP([[164, -102], [190, -95 - b * 0.4], [224, -88 - b], [226, 2], [140, 2], [126, -22], [132, -48], [148, -62], [156, -84]]);
    U.shape(C, "buste", blob(buste, 0.75), shirt, { sw: 2.5, r: 0.5 });
    const col = MP(ville ? [[164, -101], [151, -82], [147, -61]] : [[164, -101], [154, -86], [158, -70], [150, -60]]);
    U.stroke(C, "col", curve(col), { sw: 2.2, r: 0.4, single: true });
    if (ville) U.stroke(C, "col2", curve(MP([[171, -98], [160, -82], [155, -62]])), { sw: 1.5, r: 0.4, single: true, stroke: "#77776F" });
    else MP([[176, -86], [196, -78], [210, -60], [184, -50], [166, -28], [200, -26], [214, -40], [190, -10], [160, -8], [148, -40]]).forEach((p) => el("circle", { cx: f(p[0]), cy: f(p[1]), r: 2.3, fill: "#A9A9A2" }, r));
    // tête (repère « profil debout », visage vers +x) tournée de −90° : le nez regarde le plafond
    const t2 = el("g", rig, r), hg = el("g", { transform: `translate(${HX} ${HY}) rotate(${f(-90 + 9 * roll)})` }, t2), Ch = C.sub(hg);
    [[[-60, 14], [-71, 19], [-75, 31]], [[-63, -6], [-75, -4], [-80, 5]], [[-50, 32], [-57, 44]], [[-56, 24], [-68, 34]]].forEach((s, i) => U.stroke(Ch, "meche" + i, curve(s), { sw: 1.8, r: 0.4, single: true, stroke: "#55554F" }));   // mèches étalées sur l'oreiller
    const visage = "M2 -68 C30 -68 50 -52 54 -30 C56 -20 56 -12 54 -6 C53 -1 55 3 60 9 C66 16 73 21 69 27 C66 30 61 29 58 31 C61 34 61 37 58 39 C60 42 60 45 57 47 C59 53 58 60 50 64 C38 70 18 66 6 58 C-6 52 -18 50 -24 44 C-46 44 -62 24 -63 0 C-64 -34 -40 -68 2 -68 Z";
    U.shape(Ch, "tete", visage, SKIN, { sw: 2.7, r: 0.35 });
    [[30, 22], [35, 22], [40, 22]].forEach(([x, y]) => ln(hg, `M${x - 2.4} ${y + 3.4} L${x + 2.4} ${y - 3.4}`, 1.4, "#C4C4BE"));   // joue
    ln(hg, "M56 25 Q49 31 52 40", 1.3, "#9A9A94");                                                         // sillon
    ln(hg, "M22 0 L16 -2 M22 5 L16 7", 1.2, "#9A9A94");                                                    // pattes d'oie
    ln(hg, "M34 -40 Q42 -43 50 -38", 1.2, "#B4B4AE");                                                      // ride du front
    ln(hg, "M30 -16 Q41 -22 52 -15", 3.2, "#3A3A37");                                                      // sourcil
    if (o.eye === "half") {
      el("path", { d: "M32 0 Q38 8 45 0 Q38 3 32 0 Z", fill: INK }, hg);
      ln(hg, "M28 -3 Q38 2 48 -2", 2.8, INK); ln(hg, "M31 6 Q38 9 46 5", 1.3, "#77776F");
    } else {
      ln(hg, "M28 -2 Q38 6 48 -1", 2.5, INK);
      ln(hg, "M32 2 L30.5 7 M37 3.5 L36.5 8.5 M42 3.5 L42.5 8.5 M46.5 1.5 L48 6", 1.4, INK);
    }
    ln(hg, "M61 24 Q64 26.5 67 24", 1.6, "#55554F");                                                       // narine
    ln(hg, "M50 40 Q55 42 59 39", 2, "#3A3A37");                                                           // lèvres
    if (roll > 0.25) el("ellipse", { cx: 57, cy: 41, rx: 2.6, ry: f(0.6 + 1.6 * roll), fill: "#3A3A37" }, hg);
    // couronne de cheveux châtains (dessus du crâne dégarni) : elle passe devant et derrière l'oreille
    U.shape(Ch, "cheveux", "M-8 -40 C-24 -52 -46 -48 -58 -30 C-68 -12 -66 18 -54 36 C-46 44 -36 47 -28 42 C-28 32 -24 22 -18 14 C-22 8 -24 -2 -20 -8 C-14 -14 -8 -24 -8 -40 Z", MAT.hairBrown, { sw: 2.4, r: 0.4 });
    [[[-16, -32], [-36, -40], [-54, -22]], [[-26, 38], [-46, 30], [-58, 8]], [[-40, -10], [-50, 10]]].forEach((s, i) => U.stroke(Ch, "brin" + i, curve(s), { sw: 1.6, r: 0.5, single: true, stroke: "#55554F" }));
    ln(hg, "M-2 -60 Q10 -64 24 -58", 1.6, "#B4B4AE");                                                     // crâne dégarni
    U.shape(Ch, "oreille", "M-8 0 C-18 -4 -26 6 -24 16 C-22 26 -14 30 -8 24 C-6 20 -10 16 -9 12 C-8 8 -5 4 -8 0 Z", SKIN, { sw: 2.2, r: 0.4 });
    ln(hg, "M-11 6 Q-19 9 -17 17 Q-15 21 -12 19", 1.4, "#77776F");
    // le drap : poitrine, ventre, genoux, pieds ; il retombe sur le bord du matelas (ourlet) ; revers sur la poitrine
    const dessus = [[206, -88 - b], [240, -84 - b], [272, -77 - b * 0.7], [305, -64], [340, -52], [372, -58], [398, -50], [424, -45], [437, -70], [452, -72], [460, -38], [462, 14]];
    let ourlet = ""; for (let x = 462; x >= 214; x -= 31) ourlet += ` L${x} ${f(14 + (hsh(x) - 0.5) * 6)}`;
    const drap = curve(dessus) + ourlet + " L210 14 Z";
    U.shape(C, "drap", drap, MAT.light, { sw: 2.5, r: 0.5 });
    ln(r, "M322 -46 Q350 -26 356 2 M392 -42 Q404 -20 402 6 M268 -60 Q284 -34 280 -6", 1.4, "#B4B4AE");      // plis
    U.shape(C, "revers", `M206 ${f(-88 - b)} Q222 ${f(-87 - b)} 238 ${f(-84 - b)} L234 14 L210 14 Z`, MAT.white, { sw: 2.2, r: 0.5 });
    ln(r, `M222 ${f(-86 - b)} L222 12`, 1.2, "#C4C4BD");
    // le bras proche : épaule → coude → poignet ; manche ; bracelet jaune ; cathéter
    const S = M([172, -56 - b * 0.4]), t1a = lerp(22, 62, arm), t2a = lerp(-32, 90, arm);
    const E = add(S, mul(dir(t1a), 58)), W = add(E, mul(dir(t2a), 52)), d2 = dir(t2a), nn = [d2[1], -d2[0]];
    U.shape(C, "bras", limb([S, E, W], [25, 21.5, 18]), SKIN, { sw: 2.5 });
    U.shape(C, "manche", limb([S, mid(S, E, 0.24), mid(S, E, 0.48)], [26, 27, 28]), shirt, { sw: 2.4 });
    if (!ville) [[0.2, -5], [0.42, 6]].forEach(([k, dn]) => { const p = add(mid(S, E, k), mul(norm(sub(E, S)).reverse().map((v, i) => i ? -v : v), dn)); el("circle", { cx: f(p[0]), cy: f(p[1]), r: 2.2, fill: "#A9A9A2" }, r); });
    const iv = add(mid(E, W, 0.36), mul(nn, -8));
    el("path", { d: rr(-7, -5, 14, 10, 2), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.4, transform: `translate(${f(iv[0])} ${f(iv[1])}) rotate(${f(t2a)})` }, r);
    el("circle", { cx: f(iv[0]), cy: f(iv[1]), r: 2.6, fill: "#E4E4DE", stroke: INK, "stroke-width": 1.2 }, r);
    moufle(C, "main", W, d2, arm > 0.5 ? -1 : 1, SKIN);
    const wr = sub(W, mul(d2, 13));                                                                      // bracelet JAUNE, bien visible
    el("path", { d: rr(-5.5, -13.5, 11, 27, 3.5), fill: YEL, stroke: INK, "stroke-width": 2, transform: `translate(${f(wr[0])} ${f(wr[1])}) rotate(${f(t2a)})` }, r);
    ln(r, `M${f(wr[0] + nn[0] * 4)} ${f(wr[1] + nn[1] * 4)} L${f(wr[0] - nn[0] * 4)} ${f(wr[1] - nn[1] * 4)}`, 1.2, "#B88F1E");
    const ou = (p) => fx(p);
    return { head: ou(M([HX, HY])), mouth: ou(M([HX + 40, HY - 55])), chest: ou([240, -86 - b]), hand: ou(add(W, mul(d2, 14))), wrist: ou(wr), iv: ou(iv), feet: ou([448, -70]), len: 462 };
  };
  D.gisant.essais = [{ tenue: "ville", eye: "half" }, { tenue: "ville", eye: "closed", arm: 1, roll: 1, breath: 1 }, { tenue: "chemise", arm: 0.5 }, { tenue: "chemise", arm: 1, dossier: 12 }];

  // Pied à perfusion à roulettes : piétement à 5 branches, mât (h 420), crochets ; poche (o.level 0–1) suspendue du côté o.side
  // (+1 droite, −1 gauche : vers le patient), chambre compte-gouttes (centre (24·side, −301)), goutte (o.drop 0–1 = sa chute ;
  // absent = pas de goutte), molette, site en Y ; la tubulure vers le patient part de out.bout (la scène la prolonge jusqu'à
  // gisant.iv). Ancrage : sol, centre. Renvoie { port (site d'injection du Y), bout, bag, chambre, goutte: { x, y0, y1 } }.
  D.potence = (g, o = {}) => {
    const C = U.ctx(g, 846, false, 1), s = o.side === -1 ? -1 : 1, lv = clamp(o.level == null ? 0.7 : o.level, 0, 1), bx = 24 * s;
    el("ellipse", { cx: 2, cy: 1, rx: 44, ry: 4, fill: "rgba(28,26,28,.15)" }, g);
    ln(g, "M0 -14 L-36 -6 M0 -14 L36 -6 M0 -14 L-14 -5 M0 -14 L15 -5", 3.4, INK);
    [[-36, -5], [36, -5], [-14, -5], [15, -5]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 5, fill: "#6E6E68", stroke: INK, "stroke-width": 1.5 }, g));
    U.shape(C, "moyeu", rr(-7, -24, 14, 12, 3), MAT.mid, { sw: 1.8, r: 0.4, gap: 3 });
    U.shape(C, "mat", rect(-3, -420, 6, 398), MAT.grey, { sw: 1.8, r: 0.3 });
    U.shape(C, "bague", rr(-6, -246, 12, 10, 2), MAT.mid, { sw: 1.6, r: 0.4, gap: 3 });
    ln(g, "M-26 -418 L26 -418 M-26 -418 Q-30 -418 -30 -424 M26 -418 Q30 -418 30 -424", 2.6, INK);          // crochets
    // poche
    const top = -406, bot = -326, pw = 46;
    ln(g, `M${bx} -420 L${bx} ${top}`, 1.8, INK);
    ombre(g, rr(bx - pw / 2, top, pw, bot - top, 9), 4, 4);
    el("path", { d: rr(bx - pw / 2, top, pw, bot - top, 9), fill: "#FFFFFF" }, g);
    const yl = lerp(bot - 8, top + 10, lv);
    el("path", { d: `M${bx - pw / 2 + 3} ${f(yl)} L${bx + pw / 2 - 3} ${f(yl)} L${bx + pw / 2 - 3} ${bot - 10} Q${bx} ${bot - 3} ${bx - pw / 2 + 3} ${bot - 10} Z`, fill: "#E3E8EE" }, g);
    ln(g, `M${bx - pw / 2 + 4} ${f(yl)} L${bx + pw / 2 - 4} ${f(yl)}`, 1.4, "#8F95A3");
    U.shape(C, "poche", rr(bx - pw / 2, top, pw, bot - top, 9), {}, { sw: 2.3, r: 0.5 });
    el("rect", { x: bx - 13, y: top + 14, width: 26, height: 18, rx: 2, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.2 }, g);
    ln(g, `M${bx - 8} ${top + 20} L${bx + 8} ${top + 20} M${bx - 8} ${top + 26} L${bx + 4} ${top + 26}`, 1.3, "#9A9A94");
    ln(g, `M${bx + 14} ${top + 40} L${bx + 19} ${top + 40} M${bx + 14} ${top + 52} L${bx + 19} ${top + 52} M${bx + 14} ${top + 64} L${bx + 19} ${top + 64}`, 1.2, "#77776F");
    ln(g, `M${bx - 16} ${top + 8} L${bx - 16} ${top + 40}`, 2.2, "#FFFFFF");
    // chambre compte-gouttes
    ln(g, `M${bx} ${bot} L${bx} -318`, 3, INK);
    el("path", { d: rr(bx - 8, -318, 16, 34, 5), fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g);
    el("path", { d: `M${bx - 6} -294 L${bx + 6} -294 L${bx + 6} -289 Q${bx} -286 ${bx - 6} -289 Z`, fill: "#E3E8EE" }, g);
    ln(g, `M${bx - 6} -294 L${bx + 6} -294`, 1.2, "#8F95A3");
    if (o.drop != null) { const y = lerp(-313, -298, clamp(o.drop, 0, 1)); el("path", { d: `M${bx} ${f(y - 5)} C${bx + 3} ${f(y - 1)} ${bx + 3} ${f(y + 2)} ${bx} ${f(y + 2)} C${bx - 3} ${f(y + 2)} ${bx - 3} ${f(y - 1)} ${bx} ${f(y - 5)} Z`, fill: "#8F95A3" }, g); }
    // tubulure, molette, site en Y
    ln(g, `M${bx} -284 L${bx} -230`, 2.2, "#55554F");
    U.shape(C, "molette", rr(bx - 6, -272, 12, 16, 2), MAT.white, { sw: 1.6, r: 0.4 });
    el("circle", { cx: bx, cy: -264, r: 3, fill: "#CFCFCA", stroke: INK, "stroke-width": 1 }, g);
    const port = [bx + s * 13, -250];
    ln(g, `M${bx} -240 L${port[0]} ${port[1]}`, 3.4, INK); ln(g, `M${bx} -240 L${port[0]} ${port[1]}`, 1.6, "#FFFFFF");
    el("circle", { cx: port[0], cy: port[1], r: 4, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
    U.shape(C, "y", rr(bx - 4, -246, 8, 18, 3), MAT.white, { sw: 1.6, r: 0.3 });
    return { port, bout: [bx, -228], bag: [bx, (top + bot) / 2], chambre: [bx, -301], goutte: { x: bx, y0: -313, y1: -298 } };
  };
  D.potence.essais = [{ drop: 0.4 }, { side: -1, level: 0.3 }];

  // Seringue étiquetée « Insulin » : embout en (0,0), corps vers +x (o.dir −1 : vers −x, texte toujours à l'endroit) ;
  // piston o.push 0 (tiré) → 1 (poussé). ≈ 180 × 34 (tirée), ancrage : l'embout. Renvoie { piston: [x, y] (le pouce) }.
  D.seringue = (g, o = {}) => {
    const sd = o.dir === -1 ? -1 : 1, r = el("g", sd < 0 ? { transform: "scale(-1 1)" } : {}, g), C = U.ctx(r, 848, sd < 0, 1), p = clamp(o.push || 0, 0, 1);
    const st = lerp(92, 18, p), rod = st + 74;                                                            // bouchon, bout de la tige
    ln(r, "M0 0 L13 0", 4.4, INK); ln(r, "M1 0 L12 0", 2, "#FFFFFF");
    U.shape(C, "tige", rect(st, -4, rod - st, 8), MAT.white, { sw: 1.8, r: 0.3 });
    U.shape(C, "pouce", rr(rod, -15, 7, 30, 2), MAT.mid, { sw: 1.8, r: 0.3, gap: 3 });
    ombre(r, rr(12, -15, 92, 30, 4), 3, 4);
    el("path", { d: rr(12, -15, 92, 30, 4), fill: "#FFFFFF" }, r);
    el("path", { d: rect(14, -12, st - 14, 24), fill: "#E3E8EE" }, r);
    U.shape(C, "bouchon", rect(st, -12, 7, 24), MAT.dark, { sw: 1.5, r: 0.3 });
    U.shape(C, "corps", rr(12, -15, 92, 30, 4), {}, { sw: 2.3, r: 0.4 });
    U.shape(C, "ailettes", rr(102, -22, 6, 44, 2), MAT.grey, { sw: 1.8, r: 0.3 });
    let gr = ""; for (let x = 20; x < 100; x += 8) gr += `M${x} -15 L${x} ${x % 24 === 20 ? -8 : -11} `;
    ln(r, gr, 1.2, INK);
    el("rect", { x: 24, y: -10, width: 70, height: 20, rx: 2, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.3, opacity: 0.95 }, r);
    txt(g, "Insulin", sd * 59, 6.5, 18, {});
    return { piston: [f(sd * (rod + 4)), 0], embout: [0, 0] };
  };
  D.seringue.essais = [{ push: 0 }, { push: 1, dir: -1 }];

  // Bloc-notes de l'ambulancière : planchette à pince, feuille « Einsatzprotokoll » (titre sur deux lignes, 11,5 px), 5 lignes.
  // 70 × 104, ancrage : centre.
  D.protocole = (g) => {
    const C = U.ctx(g, 850, false, 1);
    ombre(g, rr(-35, -48, 70, 96, 5), 4, 5);
    U.shape(C, "planche", rr(-35, -48, 70, 96, 5), BOIS2, { sw: 2.2, r: 0.5 });
    U.shape(C, "feuille", rect(-29, -38, 58, 80), MAT.white, { sw: 1.6, r: 0.4 });
    txt(g, "Einsatz-", 0, -24, 11.5, {}); txt(g, "protokoll", 0, -12, 11.5, {});
    ln(g, "M-24 -2 L24 -2 M-24 8 L18 8 M-24 18 L24 18 M-24 28 L12 28 M-24 37 L22 37", 1.6, "#A9A9A2");
    U.shape(C, "pince", rr(-16, -56, 32, 13, 3), MAT.mid, { sw: 1.8, r: 0.4, gap: 3 });
    el("circle", { cx: 0, cy: -51, r: 3, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.2 }, g);
    return { pince: [0, -50] };
  };

  /* ═════════════════════ F. CHAMBRE DU PATIENT (S12, S15) — monde : salleNuit (sol 1300) ═════════════════════ */

  // Lit d'hôpital de profil, tête à GAUCHE : tête de lit (haute), pied de lit, matelas (dessus y −195), cadre, carter de la base
  // (il cache les jambes de celle qui se tient derrière), roues à frein, barrière du fond levée (derrière le patient : à dessiner
  // AVANT D.gisant) et barrière du côté spectateur baissée, feuille de soins (30 × 50) pendue au pied de lit, sans déborder. 492 × 318, ancrage : sol, centre
  // (posé en (410, 1300)). Renvoie { top: −195, x0, x1, tete (coin haut du matelas côté tête, pour D.gisant) }.
  D.litHopital = (g, o = {}) => {
    const C = U.ctx(g, 852, false, 1), top = -195, x0 = -224, x1 = 222;
    el("ellipse", { cx: 4, cy: 2, rx: 236, ry: 7, fill: "rgba(28,26,28,.15)" }, g);
    [[-176, -16], [184, -16]].forEach(([x, y]) => roue(g, x, y, 10, 50, "#6E6E68"));
    // tête de lit, pied de lit
    const tdl = "M-246 -2 L-246 -296 Q-246 -318 -224 -318 L-222 -318 L-222 -2 Z", pdl = "M222 -2 L222 -252 Q222 -262 232 -262 L246 -262 L246 -2 Z";
    ombre(g, tdl, 5, 5); U.shape(C, "tdl", tdl, BOIS2, { sw: 2.5, r: 0.5 });
    ln(g, "M-238 -290 L-238 -130", 1.4, "#77776F");
    ombre(g, pdl, 5, 5); U.shape(C, "pdl", pdl, BOIS2, { sw: 2.5, r: 0.5 });
    // barrière du fond (levée) : derrière le patient
    U.shape(C, "barriereF", rr(-150, -238, 214, 9, 4), MAT.grey, { sw: 1.9, r: 0.4 });
    ln(g, "M-136 -229 L-136 -196 M-40 -229 L-40 -196 M52 -229 L52 -196", 2.4, INK);
    // matelas, cadre, carter
    U.shape(C, "matelas", rr(x0, top, x1 - x0, 30, 8), MAT.white, { sw: 2.5, r: 0.4 });
    ln(g, `M${x0 + 10} ${top + 14} L${x1 - 10} ${top + 14}`, 1.2, "#C4C4BD");
    U.shape(C, "cadre", rect(-226, -165, 450, 12), MAT.mid, { sw: 2.2, r: 0.4, gap: 3.6 });
    ombre(g, rr(-200, -153, 400, 86, 6), 0, 5);
    U.shape(C, "carter", rr(-200, -153, 400, 86, 6), MAT.light, { sw: 2.4, r: 0.5 });
    ln(g, "M-186 -128 L186 -128 M-186 -94 L60 -94", 1.3, "#B4B4AE");
    U.shape(C, "barriereP", rr(-128, -150, 206, 9, 4), MAT.grey, { sw: 1.9, r: 0.4 });                // côté spectateur, baissée
    ln(g, "M-110 -153 L-110 -150 M60 -153 L60 -150", 3, INK);
    // pieds à roulettes, frein
    [-196, 196].forEach((x, i) => { ln(g, `M${x} -67 L${x} -30`, 5, INK); ln(g, `M${x} -67 L${x} -30`, 2, "#CFCFCA"); roue(g, x, -14, 14, 20 + i * 40); el("rect", { x: x + (i ? -30 : 14), y: -40, width: 16, height: 7, rx: 2, fill: YEL, stroke: INK, "stroke-width": 1.4 }, g); });
    // feuille de soins pendue au pied de lit
    ln(g, "M234 -250 L222 -232 M234 -250 L246 -232", 1.4, INK);
    U.shape(C, "kurve", rect(219, -232, 30, 50), MAT.white, { sw: 1.8, r: 0.4 });
    ln(g, "M223 -220 L245 -220 M223 -211 L241 -211 M223 -202 L245 -202 M223 -193 L237 -193", 1.4, "#A9A9A2");
    return { top, x0, x1, tete: [x0, top] };
  };

  // Table de chevet à tiroir, niche et roulettes : 84 × 150, ancrage : sol, centre (posée en (700, 1300)). Dessus y −150.
  D.tableChevet = (g) => {
    const C = U.ctx(g, 854, false, 1);
    el("ellipse", { cx: 3, cy: 1, rx: 44, ry: 4, fill: "rgba(28,26,28,.15)" }, g);
    [-28, 28].forEach((x) => roue(g, x, -7, 7, 30));
    ombre(g, rect(-38, -142, 76, 124), 5, 5);
    U.shape(C, "corps", rect(-38, -142, 76, 124), MAT.light, { sw: 2.4, r: 0.5 });
    U.shape(C, "tiroir", rr(-33, -136, 66, 30, 3), MAT.white, { sw: 1.9, r: 0.4 });
    ln(g, "M-10 -121 L10 -121", 3, INK);
    U.shape(C, "niche", rect(-33, -98, 66, 52), MAT.grey, { sw: 1.9, r: 0.4 });
    ln(g, "M-33 -60 L33 -60", 1.3, "#77776F");
    U.shape(C, "dessus", rr(-42, -152, 84, 11, 3), BOIS2, { sw: 2.2, r: 0.4 });
    U.shape(C, "socle", rect(-38, -24, 76, 8), MAT.mid, { sw: 1.8, r: 0.4, gap: 3 });
    return { top: -152 };
  };

  // Tube de laboratoire VIDE (o.fill 0–1 : aplat hachuré foncé, jamais rouge) dans son portoir à 3 trous, languette « Labor »,
  // bon de demande plié derrière le portoir ; o.dim 0–1 : il s'efface sous un voile gris. Ancrage : bas-centre du portoir (posé en (700, 1150)).
  //   o.rack false : le tube seul, ancrage au centre (S17 : couché, puis redressé) ; o.note : petite étiquette ficelée au bouchon,
  //   deux lignes coupées au « : » (S17 : « Labor: keine Analyse »), à droite (o.noteSide −1 : à gauche). Renvoie { tube: [x, y] (centre), note: [x, y] }.
  D.tubeLabo = (g, o = {}) => {
    const C = U.ctx(g, 856, false, 1), rack = o.rack !== false, fill = clamp(o.fill || 0, 0, 1), dim = clamp(o.dim || 0, 0, 1);
    const ty = rack ? -58 : 0, t0 = ty - 42, t1 = ty + 40, w = el("g", { opacity: f(1 - 0.45 * dim) }, g), Cw = C.sub(w);
    if (rack && o.form !== false) {                                                                       // bon de demande plié (en tente)
      U.shape(Cw, "bon", "M-34 -20 L-30 -56 L-12 -60 L-12 -20 Z", MAT.white, { sw: 1.7, r: 0.4 });         // derrière le portoir : il dépasse au-dessus
      ln(w, "M-29 -46 L-15 -49 M-30 -38 L-15 -41 M-31 -30 L-16 -32", 1.3, "#A9A9A2");
      el("path", { d: "M-30 -56 L-12 -60 L-12 -53 L-29 -50 Z", fill: YEL, opacity: 0.8 }, w);
    }
    const tube = `M-9 ${t0} L9 ${t0} L9 ${t1 - 9} Q9 ${t1} 0 ${t1} Q-9 ${t1} -9 ${t1 - 9} Z`;
    ombre(w, tube, 3, 4);
    el("path", { d: tube, fill: "#FFFFFF" }, w);
    if (fill > 0.02) { const yl = lerp(t1 - 4, t0 + 8, fill); U.shape(Cw, "sang", `M-7 ${f(yl)} L7 ${f(yl)} L7 ${t1 - 9} Q7 ${t1 - 2} 0 ${t1 - 2} Q-7 ${t1 - 2} -7 ${t1 - 9} Z`, MAT.dark, { noStroke: true, gap: 3.4 }); }
    U.shape(Cw, "verre", tube, {}, { sw: 2.2, r: 0.4 });
    ln(w, `M-4 ${t0 + 10} L-4 ${t1 - 14}`, 2.2, "#E4E8EE");
    U.shape(Cw, "bouchon", rr(-11, t0 - 15, 22, 17, 3), MAT.dark, { sw: 2, r: 0.4 });
    el("path", { d: rr(8, ty - 20, 46, 18, 2), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.5 }, w);  // languette « Labor »
    txt(w, "Labor", 31, ty - 6.5, 13.5, {});
    if (dim > 0.02) ln(w, `M-6 ${t0 + 6} L6 ${t0 + 16} M-6 ${t0 + 20} L6 ${t0 + 30} M-6 ${t0 + 34} L6 ${t0 + 44} M-6 ${t0 + 48} L6 ${t0 + 58}`, 1.4, "#8F8F88", { opacity: f(dim) });
    if (rack) {
      ombre(g, rr(-36, -24, 72, 24, 3), 4, 4);
      U.shape(C, "portoir", rr(-36, -24, 72, 24, 3), MAT.light, { sw: 2.2, r: 0.4 });
      [-22, 22].forEach((x) => el("ellipse", { cx: x, cy: -20, rx: 8, ry: 2.6, fill: "#55554F" }, g));
      U.shape(C, "plaque", rect(-36, -24, 72, 6), MAT.mid, { sw: 1.6, r: 0.3, gap: 3 });
      U.stroke(C, "pied", "M-32 0 L32 0", { sw: 2.2 });
    }
    let note = null;
    if (o.note) {                                                                                         // o.noteSide −1 : à gauche du tube
      const L = String(o.note).split(/:\s*/), l1 = L.length > 1 ? L[0] + ":" : L[0], l2 = L.length > 1 ? L.slice(1).join(": ") : "", sd = o.noteSide === -1 ? -1 : 1;
      const wN = Math.max(l1.length, l2.length) * 10 + 22, hN = l2 ? 56 : 32, ny = t0 + 16, nx = sd > 0 ? 62 : -22 - wN;
      ln(g, `M${sd * 6} ${t0 - 10} Q${sd * 34} ${t0 - 14} ${sd > 0 ? nx + 8 : nx + wN - 8} ${ny + 6}`, 1.5, "#55554F");
      ombre(g, rr(nx, ny, wN, hN, 4), 3, 4);
      U.shape(C, "note", rr(nx, ny, wN, hN, 4), MAT.white, { sw: 1.8, r: 0.4 });
      el("circle", { cx: sd > 0 ? nx + 8 : nx + wN - 8, cy: ny + 8, r: 3, fill: "#F7F7F1", stroke: INK, "stroke-width": 1.2 }, g);
      txt(g, l1, nx + 16, ny + 26, 20, { anchor: "start" });
      if (l2) txt(g, l2, nx + 16, ny + 49, 20, { anchor: "start" });
      note = [f(nx + wN / 2), f(ny + hN / 2)];
    }
    return { tube: [0, ty], note };
  };
  D.tubeLabo.essais = [{}, { dim: 1 }, { rack: false, note: "Labor: keine Analyse" }, { rack: false, note: "Labor: keine Analyse", noteSide: -1 }];

  // Porte de la chambre, ouverte : chambranle, couloir de nuit (hachures bleu nuit), battant ouvert vers le couloir (mince, à
  // droite). 110 × 452, ancrage : bas-gauche (posé en (770, 1300) : ouverture monde x 780–870, y 870–1300). Chambranle gauche
  // x 0–10 : la main de AZ s'y pose (S15, (775, 1010)).
  D.porteChambre = (g) => {
    const C = U.ctx(g, 858, false, 1);
    el("rect", { x: 10, y: -430, width: 90, height: 430, fill: "#E2E5EB" }, g);
    hachNuit(g, 12, -428, 86, 380, { gap: 15, sw: 1.7, seed: 17 });
    el("path", { d: "M10 -46 L100 -46 L100 0 L10 0 Z", fill: "#D3D7DF" }, g);
    ln(g, "M10 -46 L100 -46 M30 -46 L22 0 M74 -46 L84 0", 1.3, "#8F95A3");
    const bat = "M100 -430 L84 -418 L84 -40 L100 -2 Z";
    U.shape(C, "battant", bat, MAT.light, { sw: 2.2, r: 0.4 });
    el("circle", { cx: 88, cy: -214, r: 3, fill: INK }, g);
    ombre(g, rect(100, -440, 10, 440), 4, 0);
    U.shape(C, "jambeG", rect(0, -440, 10, 440), MAT.grey, { sw: 2.2, r: 0.4 });
    U.shape(C, "jambeD", rect(100, -440, 10, 440), MAT.grey, { sw: 2.2, r: 0.4 });
    U.shape(C, "linteau", rect(-4, -452, 118, 14), MAT.grey, { sw: 2.2, r: 0.4 });
    U.stroke(C, "seuil", "M0 0 L110 0", { sw: 2.4 });
    return { ouverture: [10, 100, -430], chambranle: [5, -290] };
  };

  /* ═════════════════════ G. POSTE DE NUIT (S13 ; D.listeGarde({ big }) et D.cordon servent aussi à S23) ═════════════════════ */

  // Poste téléphonique mural à cordon (jamais un portable) : 104 × 170, ancrage : centre (posé en (540, 785)). À gauche le
  // logement du combiné (vide quand il pend), à droite écran, voyant (o.voyant), clavier de 12 touches, grille. Le cordon part
  // de out.cord (bas). Combiné raccroché (S24) : D.combine posé en out.support, tourné de 180°.
  D.telephoneMural = (g, o = {}) => {
    const C = U.ctx(g, 860, false, 1), corps = rr(-52, -85, 104, 170, 14);
    ombre(g, corps, 6, 7);
    U.shape(C, "corps", corps, MAT.light, { sw: 2.6, r: 0.5 });
    U.shape(C, "creux", rr(-45, -72, 38, 146, 14), MAT.grey, { sw: 2, r: 0.4 });
    U.shape(C, "fourche", rr(-34, -80, 16, 11, 3), MAT.mid, { sw: 1.8, r: 0.4, gap: 3 });
    el("rect", { x: 2, y: -68, width: 42, height: 18, rx: 3, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
    ln(g, "M8 -59 L30 -59", 1.4, "#B4B4AE");
    if (o.voyant) el("circle", { cx: 39, cy: -76, r: 7.5, fill: YEL, opacity: 0.45 }, g);
    el("circle", { cx: 39, cy: -76, r: 3.4, fill: o.voyant ? YEL : "#F4F4EF", stroke: INK, "stroke-width": 1.3 }, g);
    for (let i = 0; i < 12; i++) { const x = 3 + (i % 3) * 14, y = -40 + Math.floor(i / 3) * 16; el("rect", { x, y, width: 11, height: 11, rx: 2.5, fill: i > 8 && i !== 10 ? "#E4E4DE" : "#FFFFFF", stroke: INK, "stroke-width": 1.4 }, g); }
    ln(g, "M6 34 L40 34 M6 42 L40 42 M6 50 L40 50", 1.6, "#77776F");
    [[-44, -77], [44, 77], [-44, 77]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 2, fill: "#77776F" }, g));
    el("rect", { x: -8, y: 79, width: 16, height: 10, rx: 3, fill: "#CFCFCA", stroke: INK, "stroke-width": 1.6 }, g);
    return { cord: [0, 85], support: [-26, 68], w: 104, h: 170 };
  };
  D.telephoneMural.essais = [{}, { voyant: 1 }];

  // Combiné : il PEND au bout de son cordon (micro en haut, écouteur en bas). 46 × 154, ancrage : l'attache du cordon (en haut).
  D.combine = (g) => {
    const C = U.ctx(g, 862, false, 1);
    const d = "M-8 -2 L8 -2 Q12 -2 14 4 L22 22 Q25 32 16 38 L12 40 L12 112 L16 114 Q25 120 22 130 L16 146 Q13 152 6 152 L-6 152 Q-13 152 -16 146 L-22 130 Q-25 120 -16 114 L-12 112 L-12 40 L-16 38 Q-25 32 -22 22 L-14 4 Q-12 -2 -8 -2 Z";
    ombre(g, d, 4, 5);
    U.shape(C, "combine", d, MAT.mid, { sw: 2.5, r: 0.5, gap: 4.4 });
    ln(g, "M-5 44 L-5 108", 2.4, "#E4E4DE");
    [[-7, 24], [0, 28], [7, 24], [-7, 134], [0, 140], [7, 134], [-3, 128], [4, 128]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 1.9, fill: INK }, g));
    el("rect", { x: -5, y: -7, width: 10, height: 8, rx: 2, fill: "#55554F", stroke: INK, "stroke-width": 1.4 }, g);
    return { micro: [0, 24], ecouteur: [0, 136], h: 152 };
  };

  // Cordon spiralé entre o.a et o.b (repère du parent), o.n spires (défaut 9), rayon o.r (7), affaissement o.sag (px, au milieu).
  D.cordon = (g, o = {}) => {
    const a = o.a || [0, 0], b = o.b || [0, 170], n = o.n || 9, R = o.r || 7, sag = o.sag || 0;
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, d = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], nn = [-d[1], d[0]], N = n * 16;
    let s = "";
    for (let i = 0; i <= N; i++) {
      const t = i / N, ph = t * n * Math.PI * 2, env = Math.min(1, t * 9, (1 - t) * 9);
      const p = add([lerp(a[0], b[0], t), lerp(a[1], b[1], t) + sag * Math.sin(Math.PI * t)], add(mul(nn, R * env * Math.sin(ph)), mul(d, R * 0.75 * env * Math.cos(ph))));
      s += (i ? " L" : "M") + f(p[0]) + " " + f(p[1]);
    }
    ln(g, s, 4.4, INK); ln(g, s, 1.9, "#8A8A84");
    return { a, b };
  };
  D.cordon.essais = [{ a: [0, 0], b: [0, 170] }, { a: [0, 0], b: [130, 80], sag: 30 }];

  // Lucarne d'état d'une ligne de garde (centre x, y ; w × h) : "off" (vitre claire) · "ring" (jaune + ondes) · "dead" (hachurée
  // grise) · "lit" (jaune plein + rayons). Petite icône de combiné.
  function lucarne(g, C, key, x, y, w, h, st, court) {
    const d = rr(x - w / 2, y - h / 2, w, h, 6);
    if (st === "lit") { let r = ""; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, R0 = Math.max(w, h) * 0.62, R1 = R0 + 12; r += `M${f(x + Math.cos(a) * R0)} ${f(y + Math.sin(a) * R0)} L${f(x + Math.cos(a) * R1)} ${f(y + Math.sin(a) * R1)} `; } ln(g, r, 3.4, YEL); el("rect", { x: x - w / 2 - 6, y: y - h / 2 - 6, width: w + 12, height: h + 12, rx: 9, fill: YEL, opacity: 0.35 }, g); }
    ombre(g, d, 3, 4);
    U.shape(C, key, d, st === "ring" || st === "lit" ? MAT.yellow : st === "dead" ? MAT.mid : MAT.white, { sw: 2.3, r: 0.4, gap: 4 });
    if (st === "off" || !st) ln(g, `M${f(x - w / 2 + 7)} ${f(y + h / 2 - 9)} L${f(x - w / 2 + 16)} ${f(y - h / 2 + 8)}`, 2.2, "#C9CDD4");
    if (st === "ring") { const a = x - w / 2 - 5, b = x + w / 2 + 5; ln(g, `M${f(a)} ${f(y - 9)} Q${f(a - 6)} ${f(y)} ${f(a)} ${f(y + 9)} M${f(b)} ${f(y - 9)} Q${f(b + 6)} ${f(y)} ${f(b)} ${f(y + 9)}` + (court ? "" : ` M${f(a - 7)} ${f(y - 14)} Q${f(a - 15)} ${f(y)} ${f(a - 7)} ${f(y + 14)} M${f(b + 7)} ${f(y - 14)} Q${f(b + 15)} ${f(y)} ${f(b + 7)} ${f(y + 14)}`), 2.2, INK); }
  }
  function iconeTel(g, x, y, k) {
    const t = `translate(${f(x)} ${f(y)}) scale(${k || 1}) rotate(-35)`, gg = el("g", { transform: t }, g);
    ln(gg, "M-12 0 L12 0", 7, INK);
    [-12, 12].forEach((cx) => el("path", { d: `M${cx - 6} -2 L${cx + 6} -2 L${cx + 5} 7 L${cx - 5} 7 Z`, fill: INK }, gg));
  }

  // Tableau de garde sur planchette, pendu à un clou (pivot de m.pend = out.clou).
  //   Petit (S13) : 256 × 210, ancrage : centre (posé en (310, 745)) ; « Hintergrund · Nacht », une ligne « Oberarzt » + icône
  //   de téléphone + lucarne (o.state "off" | "ring" | "dead" | "lit") ; o.hl : ligne surlignée.
  //   Grand (o.big, S23) : 520 × 520, ancrage : centre (posé en (540, 900)) ; trois lignes de haut en bas « Chefarzt » (+ « رئيس القسم »),
  //   « Oberarzt » (+ « الطبيب المسؤول »), « Assistenzarzt » (34 px) ; icônes à x +70, lucarnes 44 × 52 à x +180 reliées par un
  //   trait ; o.states = [haut, milieu, bas] ; o.hl = indice de la ligne surlignée (0 = Chefarzt). Le fanion « نتا », les ronds
  //   numérotés et les points qui montent sont posés par la scène (ancres renvoyées).
  D.listeGarde = (g, o = {}) => {
    const C = U.ctx(g, 864, false, 1), big = !!o.big, W = big ? 520 : 256, H = big ? 520 : 210;
    const x0 = -W / 2, y0 = -H / 2, m = big ? 14 : 12;
    ombre(g, rr(x0, y0, W, H, big ? 12 : 8), 7, 8);
    U.shape(C, "planche", rr(x0, y0, W, H, big ? 12 : 8), BOIS2, { sw: 2.6, r: 0.5 });
    U.shape(C, "feuille", rect(x0 + m, y0 + m + (big ? -4 : 8), W - 2 * m, H - 2 * m - (big ? -8 : 4)), MAT.white, { sw: 1.8, r: 0.4 });
    const pw = big ? 120 : 68, ph = big ? 32 : 22;
    U.shape(C, "pince", rr(-pw / 2, y0 - ph / 2, pw, ph, 6), MAT.mid, { sw: 2.2, r: 0.4, gap: 3.4 });
    const clou = [0, y0 - ph / 2 + (big ? 12 : 8)];
    el("circle", { cx: 0, cy: clou[1], r: big ? 7 : 5, fill: "#F7F7F1", stroke: INK, "stroke-width": 1.8 }, g);
    el("circle", { cx: 0, cy: clou[1], r: 2.6, fill: INK }, g);
    if (!big) {
      txt(g, "Hintergrund · Nacht", 0, -54, 19, {});
      ln(g, "M-96 -44 L96 -44", 1.6, INK);
      if (o.hl) el("rect", { x: -104, y: -14, width: 118, height: 30, fill: YEL, transform: "rotate(-1)" }, g);
      txt(g, "Oberarzt", -98, 10, 26, { anchor: "start" });
      iconeTel(g, 40, 0, 0.9);
      lucarne(g, C, "luc", 84, 0, 40, 48, o.state || "off", true);
      ln(g, "M-96 50 L60 50 M-96 72 L30 72", 2.2, "#C4C4BE");
      return { clou, ligne: [-98, 0], tel: [40, 0], lucarne: [84, 0], w: W, h: H };
    }
    txt(g, "Hintergrund · Nacht", 0, -212, 26, {});
    ln(g, "M-200 -198 L200 -198", 2, INK);
    const L = [{ de: "Chefarzt", ar: "رئيس القسم", y: -110, s: 40 }, { de: "Oberarzt", ar: "الطبيب المسؤول", y: 30, s: 40 }, { de: "Assistenzarzt", ar: null, y: 170, s: 34 }];
    const st = o.states || ["off", "off", "off"], out = [];
    ln(g, "M180 -96 L180 132", 3.2, "#77776F");
    L.forEach((l, i) => {
      const w = l.de.length * l.s * 0.5, cy = l.y - l.s * 0.32;
      if (o.hl === i) el("rect", { x: -216, y: f(l.y - l.s * 0.82), width: f(w + 14), height: f(l.s * 1.0), fill: YEL, transform: "rotate(-0.6)" }, g);
      txt(g, l.de, -210, l.y, l.s, { anchor: "start" });
      if (l.ar) arTxt(g, l.ar, -210 + w / 2, l.y + 40, 28, { anchor: "middle" });
      iconeTel(g, 70, cy, 1.5);
      lucarne(g, C, "luc" + i, 180, cy, 44, 52, st[i]);
      out.push({ texte: [-210, l.y], fin: [f(-210 + w), l.y], tel: [70, f(cy)], lucarne: [180, f(cy)] });
    });
    return { clou, lignes: out, trait: [180, -96, 132], w: W, h: H };
  };
  D.listeGarde.essais = [{ state: "ring" }, { state: "dead", hl: 1 }, { big: true, states: ["lit", "dead", "off"], hl: 0 }];

  // Cadre vide de l'Oberarzt (jamais dessiné) : cadre 184 × 190 pendu à un clou, buste en POINTILLÉS (aucun trait de visage),
  // « ? » au milieu de la tête (o.q false : sans, pour l'animer à part en out.q), plaque « Oberarzt » (24 px) dessous, ligne o.note
  // en bas du cadre (S13 : « Grund unbekannt », 18 px : 20 px débordait du cadre). Ancrage : centre (posé en (760, 720)) ; pivot de m.pend = out.clou.
  D.cadreAbsent = (g, o = {}) => {
    const C = U.ctx(g, 866, false, 1);
    ln(g, "M0 -128 L-64 -95 M0 -128 L64 -95", 1.6, "#6E6E68");
    el("circle", { cx: 0, cy: -128, r: 4.4, fill: INK }, g);
    ombre(g, rect(-92, -95, 184, 190), 6, 7);
    U.shape(C, "cadre", rect(-92, -95, 184, 190), BOIS2, { sw: 2.6, r: 0.5 });
    U.shape(C, "fond", rect(-80, -83, 160, 166), MAT.white, { sw: 1.8, r: 0.4 });
    el("circle", { cx: 0, cy: -26, r: 30, fill: "none", stroke: "#55554F", "stroke-width": 2.6, "stroke-dasharray": "7 6" }, g);
    ln(g, "M-60 56 C-58 18 -30 10 0 10 C30 10 58 18 60 56", 2.6, "#55554F", { "stroke-dasharray": "7 6" });
    if (o.q !== false) txt(g, "?", 0, -9, 46, {});
    if (o.note) txt(g, o.note, 0, 76, 18, { fill: "#55524B" });
    ln(g, "M-70 -74 L-56 -60", 2.6, "#FFFFFF");
    ombre(g, rr(-65, 99, 130, 32, 6), 3, 4);
    U.shape(C, "plaque", rr(-65, 99, 130, 32, 6), MAT.grey, { sw: 2, r: 0.4 });
    [-57, 57].forEach((x) => el("circle", { cx: x, cy: 115, r: 2, fill: "#55554F" }, g));
    txt(g, "Oberarzt", 0, 123, 24, {});
    return { clou: [0, -128], q: [0, -26], note: [0, 77], plaque: [0, 115] };
  };
  D.cadreAbsent.essais = [{}, { note: "Grund unbekannt" }];

  /* ═════════════════════ H. TRIBUNAL (S16–S21) — salle de JOUR, vue du fond ═════════════════════ */

  // Salle d'audience, coordonnées MONDE (origine (0,0)) : mur #F4F1E8 de y 300 à 1000, lambris à 7 panneaux de 780 à 1000
  // (cimaise, plinthe), parquet de 1000 à 1420 dont les lames fuient vers (540, 640) (à la hauteur de l'œil : elles se rapprochent
  // sans se rejoindre au pied du mur), murs, plafond et dalle COUPÉS (même matière que la coupe de l'hôpital). x 110–960.
  let uid = 0;
  D.salleAudience = (g, o = {}) => {
    const C = U.ctx(g, 870, false, 1), x0 = 110, x1 = 960, top = 300, lam = 780, fl = 1000, bot = 1420, e = 14, VP = [540, 640];
    el("rect", { x: x0, y: top, width: x1 - x0, height: fl - top, fill: "#F4F1E8" }, g);
    el("rect", { x: x0, y: fl, width: x1 - x0, height: bot - fl, fill: "#EAE5D6" }, g);
    const xL = x0 + e, xR = x1 - e, kf = (y) => (y - VP[1]) / (bot - VP[1]), pq = g;
    let l = "", j = "";
    for (let xb = -320; xb <= 1400; xb += 66) {                                                          // lames : du pied du mur vers le bas, coupées aux murs
      const xa = VP[0] + (xb - VP[0]) * kf(fl); let x2 = xb, y2 = bot;
      if (xa < xL || xa > xR) continue;
      if (xb < xL) { const t = (xL - xa) / (xb - xa); x2 = xL; y2 = fl + t * (bot - fl); } else if (xb > xR) { const t = (xR - xa) / (xb - xa); x2 = xR; y2 = fl + t * (bot - fl); }
      l += `M${f(xa)} ${fl} L${f(x2)} ${f(y2)} `;
    }
    [1014, 1036, 1066, 1106, 1158, 1226, 1314].forEach((y, r) => { for (let xb = -320 + (r % 2) * 33; xb <= 1400; xb += 132) { const k = kf(y), xa = clamp(VP[0] + (xb - VP[0]) * k, xL, xR), xc = clamp(VP[0] + (xb + 66 - VP[0]) * k, xL, xR); if (xc - xa > 4) j += `M${f(xa)} ${y} L${f(xc)} ${y} `; } });
    ln(pq, l, 1.5, "#B9B3A2"); ln(pq, j, 1.3, "#C9C3B2");
    ln(pq, `M300 1180 L520 1180 M640 1300 L860 1300`, 4, "#FFFFFF", { opacity: 0.7 });
    // lambris
    U.shape(C, "lambris", rect(x0 + e, lam, x1 - x0 - 2 * e, fl - lam), WOOD, { sw: 2.2, r: 0.5 });
    const n = 7, pw = (x1 - x0 - 2 * e) / n;
    for (let i = 0; i < n; i++) { const x = x0 + e + i * pw; U.shape(C, "pan" + i, rr(x + 12, lam + 26, pw - 24, fl - lam - 58, 4), {}, { sw: 1.8, r: 0.5 }); ln(g, `M${f(x + 19)} ${lam + 33} L${f(x + pw - 19)} ${lam + 33} M${f(x + 19)} ${lam + 33} L${f(x + 19)} ${fl - 39}`, 1.2, "#FFFFFF"); }
    U.shape(C, "cimaise", rect(x0 + e, lam - 9, x1 - x0 - 2 * e, 12), BOIS2, { sw: 2.2, r: 0.4 });
    U.shape(C, "plinthe", rect(x0 + e, fl - 16, x1 - x0 - 2 * e, 16), BOIS2, { sw: 2.2, r: 0.4 });
    U.stroke(C, "sol", `M${x0 + e} ${fl} L${x1 - e} ${fl}`, { sw: 2.4 });
    U.shape(C, "murG", rect(x0, top, e, bot - top), CUT, { sw: 2.2, r: 0.5 });
    U.shape(C, "murD", rect(x1 - e, top, e, bot - top), CUT, { sw: 2.2, r: 0.5 });
    U.shape(C, "plafond", rect(x0, top - 14, x1 - x0, 14), CUT, { sw: 2.2, r: 0.5 });
    U.shape(C, "dalle", rect(x0, bot, x1 - x0, 11), CUT, { sw: 2.2, r: 0.5 });
    return { x0, x1, top, lambris: lam, floorY: fl, bottom: bot, VP };
  };

  // Haute fenêtre à petits carreaux (3 × 6), jour pâle, nuages au trait ; o.vue "hopital" : au loin, un petit immeuble aux
  // 12 vitres JAUNES (renvoyées dans out.wins pour scintiller dans c.tick) et une petite croix. 160 × 360, ancrage : centre.
  D.fenetreHaute = (g, o = {}) => {
    const C = U.ctx(g, 872, false, 1), x0 = -70, y0 = -170, w = 140, h = 340, e = 9, wins = [];
    ombre(g, rect(x0, y0, w, h), 6, 7);
    U.shape(C, "cadre", rect(x0, y0, w, h), MAT.white, { sw: 2.8, r: 0.5 });
    el("rect", { x: x0 + e, y: y0 + e, width: w - 2 * e, height: h - 2 * e, fill: JOUR }, g);
    ln(g, "M-46 -118 q8 -9 16 0 q8 -8 16 0 M-50 -118 L-12 -118 M14 -40 q6 -7 12 0 q6 -6 12 0 M10 -40 L40 -40", 1.6, "#C9C6B8");
    if (o.vue === "hopital") {
      ln(g, "M-61 150 L61 150", 1.6, "#A9A9A2");
      el("rect", { x: -26, y: 54, width: 52, height: 96, fill: "#ECECE6", stroke: INK, "stroke-width": 1.8 }, g);
      el("rect", { x: -29, y: 50, width: 58, height: 6, fill: "#CFCFCA", stroke: INK, "stroke-width": 1.4 }, g);
      el("path", { d: "M-3 36 L3 36 L3 41 L8 41 L8 47 L3 47 L3 52 L-3 52 L-3 47 L-8 47 L-8 41 L-3 41 Z", fill: YEL, stroke: INK, "stroke-width": 1.2 }, g);
      for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) wins.push(el("rect", { x: -20 + c * 15, y: 62 + r * 21, width: 10, height: 13, fill: YEL, stroke: INK, "stroke-width": 1.1 }, g));
    }
    ln(g, "M-54 10 L-36 -30 M-50 34 L-30 -6", 2.6, "#FFFFFF");
    U.stroke(C, "vitre", rect(x0 + e, y0 + e, w - 2 * e, h - 2 * e), { sw: 2, r: 0.5 });
    [-20, 20].forEach((x) => el("rect", { x: x - 3, y: y0 + e, width: 6, height: h - 2 * e, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.3 }, g));
    [-107, -54, -1, 52, 105].forEach((y) => el("rect", { x: x0 + e, y: y - 3, width: w - 2 * e, height: 6, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.3 }, g));
    U.shape(C, "linteau", rr(-80, y0 - 14, 160, 12, 3), MAT.grey, { sw: 2.2, r: 0.4 });
    ombre(g, rr(-82, h / 2 - 2, 164, 12, 3), 4, 5);
    U.shape(C, "appui", rr(-82, h / 2 - 2, 164, 12, 3), MAT.grey, { sw: 2.2, r: 0.4 });
    return { wins, w: 160, h: 360 };
  };
  D.fenetreHaute.essais = [{}, { vue: "hopital" }];

  // Suspension à globe opale au bout d'un fil (pas d'abat-jour conique) : cache-fil, fil o.len (80), collerette, globe r 24.
  // Ancrage : point d'accroche au plafond (pivot de m.pend). o.on 0–1 : le globe s'allume (le jour : éteint).
  D.suspension = (g, o = {}) => {
    const C = U.ctx(g, 874, false, 1), on = clamp(o.on || 0, 0, 1), L = o.len || 80, cy = L + 34;
    if (on > 0.02) el("circle", { cx: 0, cy, r: 44, fill: YEL, opacity: f(0.25 * on) }, g);
    el("ellipse", { cx: 0, cy: 4, rx: 15, ry: 5, fill: "#CFCFCA", stroke: INK, "stroke-width": 1.8 }, g);
    ln(g, `M0 8 L0 ${L}`, 2, INK);
    U.shape(C, "collerette", `M-8 ${L} L8 ${L} L12 ${L + 11} L-12 ${L + 11} Z`, MAT.mid, { sw: 1.8, r: 0.4, gap: 3 });
    el("circle", { cx: 0, cy, r: 24, fill: mixc("#FAFAF5", "#FFF4BF", on) }, g);
    U.shape(C, "ombreG", `M6 ${cy - 23} A24 24 0 0 1 6 ${cy + 23} A30 30 0 0 0 6 ${cy - 23} Z`, { hatch: "#BDBDB6", gap: 4.4, fw: 1 }, { noStroke: true });
    U.shape(C, "globe", circ(0, cy, 24), {}, { sw: 2.4, r: 0.5 });
    ln(g, `M-14 ${cy - 8} A16 16 0 0 1 -4 ${cy - 17}`, 2.6, "#FFFFFF");
    return { globe: [0, cy] };
  };
  D.suspension.essais = [{}, { on: 1 }];

  // Estrade + pupitre du juge (sans plaque, sans marteau) : estrade 468 × 46, pupitre 420 × 152 à 3 panneaux moulurés, plateau
  // (dessus y −210), pile de dossiers à gauche, lampe de bureau à droite. 468 × 262, ancrage : bas-centre (posé en (540, 1000)).
  D.estrade = (g) => {
    const C = U.ctx(g, 876, false, 1);
    U.shape(C, "estrade", rect(-230, -40, 460, 40), BOIS2, { sw: 2.4, r: 0.5 });
    ln(g, "M-150 -34 L-150 -3 M-70 -34 L-70 -3 M10 -34 L10 -3 M90 -34 L90 -3 M170 -34 L170 -3", 1.3, "#8F8F88");
    U.shape(C, "nez", rr(-234, -46, 468, 9, 3), WOOD, { sw: 2.2, r: 0.4 });
    ombre(g, rect(-210, -200, 420, 154), 6, 0);
    U.shape(C, "pupitre", rect(-210, -200, 420, 154), WOOD, { sw: 2.6, r: 0.5 });
    [-196, -64, 68].forEach((x, i) => { U.shape(C, "panneau" + i, rr(x, -180, 128, 112, 4), {}, { sw: 1.9, r: 0.5 }); ln(g, `M${x + 7} -173 L${x + 121} -173 M${x + 7} -173 L${x + 7} -75`, 1.2, "#FFFFFF"); ln(g, `M${x + 121} -173 L${x + 121} -75 L${x + 7} -75`, 1.2, "#ABABA4"); });
    U.shape(C, "socle", rect(-214, -56, 428, 10), BOIS2, { sw: 2, r: 0.4 });
    U.shape(C, "plateau", rr(-224, -212, 448, 13, 3), BOIS2, { sw: 2.4, r: 0.4 });
    [[-178, -224, 84, MAT.light], [-184, -236, 90, MAT.white], [-174, -247, 80, MAT.grey]].forEach(([x, y, w, mt], i) => U.shape(C, "dossier" + i, rr(x, y, w, 12, 2), mt, { sw: 1.8, r: 0.4 }));
    el("rect", { x: -120, y: -244, width: 22, height: 7, fill: YEL, stroke: INK, "stroke-width": 1 }, g);
    el("ellipse", { cx: 164, cy: -214, rx: 20, ry: 5, fill: "#CFCFCA", stroke: INK, "stroke-width": 1.8 }, g);
    ln(g, "M164 -216 L170 -252", 3.2, INK);
    U.shape(C, "abatjour", "M140 -248 L196 -248 L190 -266 L146 -266 Z", MAT.mid, { sw: 2, r: 0.4, gap: 3.6 });
    return { dessus: -212, x0: -210, x1: 210 };
  };

  // Table des accusés vue de DERRIÈRE : dessus vu d'un peu au-dessus, chant, ceinture, 4 pieds (les 2 du fond plus fins), deux
  // feuilles et un verre d'eau. o.w (défaut 430) × 116, ancrage : sol, centre (S16 : (465, 1200), dessus y 1098).
  D.tableDefense = (g, o = {}) => {
    const C = U.ctx(g, 878, false, 1), w = o.w || 430, h2 = w / 2;
    el("ellipse", { cx: 4, cy: 2, rx: h2, ry: 6, fill: "rgba(28,26,28,.12)" }, g);
    [-1, 1].forEach((s, i) => U.shape(C, "pf" + i, rect(s * (h2 - 34) - 4, -98, 8, 84), BOIS2, { sw: 1.8, r: 0.4 }));
    U.shape(C, "dessus", poly([[-h2 + 12, -116], [h2 - 12, -116], [h2, -102], [-h2, -102]]), WOOD, { sw: 2.2, r: 0.4 });
    el("path", { d: poly([[-120, -104], [-62, -104], [-58, -112], [-112, -113]]), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.3 }, g);
    el("path", { d: poly([[34, -104], [92, -104], [96, -111], [40, -112]]), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.3 }, g);
    el("path", { d: rr(h2 - 62, -132, 14, 24, 2), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.5 }, g);
    ln(g, `M${h2 - 60} -122 L${h2 - 50} -122`, 1.2, "#8F95A3");
    U.shape(C, "chant", rect(-h2, -102, w, 11), BOIS2, { sw: 2.2, r: 0.4 });
    U.shape(C, "ceinture", rect(-h2 + 10, -91, w - 20, 12), WOOD, { sw: 1.8, r: 0.4 });
    [-1, 1].forEach((s, i) => U.shape(C, "pp" + i, rect(s * (h2 - 16) - 6, -91, 12, 91), BOIS2, { sw: 2.2, r: 0.4 }));
    return { top: -102, w };
  };
  D.tableDefense.essais = [{ w: 430 }];

  // Chaise vue de DOS (à poser PAR-DESSUS D.dos) : montants, traverse haute, 3 barreaux, traverse basse, assise, pieds avant.
  // 108 × 138, ancrage : sol, centre ; assise à y −88 (le bassin de D.dos assis est à −80).
  D.chaiseDos = (g) => {
    const C = U.ctx(g, 880, false, 1);
    el("ellipse", { cx: 3, cy: 2, rx: 54, ry: 5, fill: "rgba(28,26,28,.12)" }, g);
    [-36, 36].forEach((x, i) => U.shape(C, "pa" + i, rect(x - 3, -78, 6, 70), BOIS2, { sw: 1.6, r: 0.3 }));
    U.shape(C, "assise", rr(-54, -90, 108, 12, 3), WOOD, { sw: 2.2, r: 0.4 });
    [-46, 46].forEach((x, i) => U.shape(C, "montant" + i, rr(x - 5, -136, 10, 136, 3), WOOD, { sw: 2.2, r: 0.4 }));
    U.shape(C, "traverse", rr(-51, -140, 102, 15, 5), WOOD, { sw: 2.2, r: 0.4 });
    U.shape(C, "traverseB", rect(-42, -102, 84, 8), WOOD, { sw: 1.8, r: 0.4 });
    [-21, 0, 21].forEach((x, i) => U.shape(C, "barreau" + i, rect(x - 4, -125, 8, 23), WOOD, { sw: 1.7, r: 0.4 }));
    return { assise: -90, top: -140 };
  };

  // PERSONNAGE VU DE DOS — dessin dédié (Persona n'a pas de vue de dos), échelle 1 des personnages Persona. Jamais de visage,
  // jamais d'œil. Ancrage : le SOL sous la chaise. o.hair "boucle-fonce" (elle : boucles foncées serrées ; o.glasses : bouts des
  // branches aux oreilles) · "court-blond" (lui) · "neutre" (court, châtain : « نتا ») ; o.veste "blazer" (foncé) · "veste"
  // (claire) · "pull". o.stand 0 = assis (bassin y −80, sommet de la tête ≈ −349 : la chaise cache le bas du dos) → 1 = debout
  // (le corps monte de 88 px d'un bloc, les avant-bras et les mains apparaissent, les jambes s'allongent derrière la chaise) ;
  // o.bow 0–1 tête qui tombe ; o.slump 0–1 épaules qui tombent ; o.turn −1…1 la tête pivote (un peu de joue, jamais d'œil) ;
  // o.breath 0–1 épaules (+1,6 px) ; o.shake = angle (°) du haut du corps (tremblement piloté par la scène).
  // Renvoie { head, top, hip }.
  D.dos = (g, o = {}) => {
    const hair = o.hair || "neutre", fem = hair === "boucle-fonce", C = U.ctx(g, fem ? 882 : hair === "court-blond" ? 883 : 884, false, 1);
    const stand = clamp(o.stand || 0, 0, 1), bow = clamp(o.bow || 0, 0, 1), slump = clamp(o.slump || 0, 0, 1), turn = clamp(o.turn || 0, -1, 1), br = clamp(o.breath || 0, 0, 1);
    const veste = o.veste || (fem ? "blazer" : "veste"), dark = veste === "blazer";
    const topM = dark ? MAT.dark : veste === "pull" ? MAT.mid : MAT.light, legM = dark ? MAT.dark : MAT.mid, seam = dark ? "#9A9A94" : "#77776F";
    const hip = -80 - 88 * stand, sw = (fem ? 41 : 47) - 3 * slump, hw = fem ? 35 : 39, sh = hip - 119 + 9 * slump - 1.6 * br, nb = sh - 12;
    const hem = dark ? 22 : veste === "pull" ? 8 : 16, lx = fem ? 16 : 18;
    // jambes (pantalon) et talons, du bassin au sol : sous l'assise quand elle est assise
    [-1, 1].forEach((s, i) => {
      const x = s * lx;
      U.shape(C, "jambe" + i, poly([[x - 16, hip + 4], [x + 16, hip + 4], [x + 13, -14], [x - 13, -14]]), legM, { sw: 2.3, r: 0.5 });
      if (-hip > 100) ln(g, `M${x - 8} ${f(hip * 0.42)} Q${x} ${f(hip * 0.42 + 4)} ${x + 8} ${f(hip * 0.42)}`, 1.4, seam);
      U.shape(C, "talon" + i, rr(x - 14, -17, 28, 17, 6), MAT.shoe, { sw: 2.2, r: 0.4 });
    });
    const ub = el("g", o.shake ? { transform: `rotate(${f(o.shake)} 0 ${f(hip)})` } : {}, g), Cu = C.sub(ub);
    const hrx = fem ? 49 : 52, hry = 63 * (1 - 0.1 * bow), hc = sh - 76 + 22 * bow, tx = 7 * turn, nw = fem ? 11 : 13;
    U.shape(Cu, "cou", rect(-nw, f(hc + 24), 2 * nw, f(nb - hc - 18)), SKIN, { sw: 2.2, r: 0.4 });
    // torse
    const d = `M-15 ${f(nb)} Q${f(-sw * 0.62)} ${f(sh - 5)} ${f(-sw)} ${f(sh + 9)} Q${f(-sw - 3)} ${f(sh + 34)} ${-hw - 1} ${f(hip - 42)} Q${-hw - 3} ${f(hip - 10)} ${-hw - 2} ${f(hip + hem)} L${hw + 2} ${f(hip + hem)} Q${hw + 3} ${f(hip - 10)} ${hw + 1} ${f(hip - 42)} Q${f(sw + 3)} ${f(sh + 34)} ${f(sw)} ${f(sh + 9)} Q${f(sw * 0.62)} ${f(sh - 5)} 15 ${f(nb)} Q0 ${f(nb + 5)} -15 ${f(nb)} Z`;
    U.shape(Cu, "torse", d, topM, { sw: 2.6, r: 0.5 });
    if (dark) {
      U.shape(Cu, "col", `M-21 ${f(nb - 4)} Q0 ${f(nb + 8)} 21 ${f(nb - 4)} L23 ${f(nb + 7)} Q0 ${f(nb + 20)} -23 ${f(nb + 7)} Z`, MAT.dark, { sw: 2, r: 0.4 });
      ln(ub, `M0 ${f(nb + 16)} L0 ${f(hip + hem)} M${f(-sw * 0.5)} ${f(sh + 14)} Q-17 ${f(hip - 50)} -17 ${f(hip + hem)} M${f(sw * 0.5)} ${f(sh + 14)} Q17 ${f(hip - 50)} 17 ${f(hip + hem)}`, 1.5, seam);
      ln(ub, `M3 ${f(hip - 14)} L3 ${f(hip + hem)}`, 1.5, seam);
    } else if (veste === "veste") {
      U.shape(Cu, "col", `M-20 ${f(nb - 3)} Q0 ${f(nb + 7)} 20 ${f(nb - 3)} L22 ${f(nb + 8)} Q0 ${f(nb + 19)} -22 ${f(nb + 8)} Z`, MAT.white, { sw: 2, r: 0.4 });
      ln(ub, `M${f(-sw + 6)} ${f(sh + 34)} Q0 ${f(sh + 40)} ${f(sw - 6)} ${f(sh + 34)} M0 ${f(sh + 38)} L0 ${f(hip + hem - 10)}`, 1.5, seam);
      U.shape(Cu, "bas", rect(-hw - 2, f(hip + hem - 11), 2 * hw + 4, 11), MAT.grey, { sw: 1.8, r: 0.4, gap: 4 });
    } else {
      U.shape(Cu, "col", `M-16 ${f(nb - 2)} Q0 ${f(nb + 7)} 16 ${f(nb - 2)} L18 ${f(nb + 5)} Q0 ${f(nb + 15)} -18 ${f(nb + 5)} Z`, MAT.mid, { sw: 1.8, r: 0.4, gap: 3 });
      let rib = ""; for (let x = -hw + 4; x < hw; x += 7) rib += `M${x} ${f(hip + hem - 9)} L${x} ${f(hip + hem)} `;
      ln(ub, `M${-hw - 1} ${f(hip + hem - 10)} L${hw + 1} ${f(hip + hem - 10)} ` + rib, 1.4, "#55554F");
    }
    // bras : assis, les avant-bras vont vers les genoux (cachés) ; debout, ils pendent, mains en moufle
    const aw = fem ? [27, 24, 21] : [30, 26, 23];
    [-1, 1].forEach((s, i) => {
      const J0 = [s * (sw - 8), sh + 12], J1 = [s * (sw + 1 - 6 * slump), sh + 70], fa = 52 * stand;
      if (fa < 12) U.shape(Cu, "bras" + i, limb([J0, mid(J0, J1), add(J1, [0, 4])], [aw[0], aw[1], aw[1] - 1]), topM, { sw: 2.5 });
      else {
        const J2 = [s * (sw - 3 - 7 * slump), J1[1] + fa], dd = norm(sub(J2, J1));
        U.shape(Cu, "bras" + i, limb([J0, J1, J2], aw), topM, { sw: 2.5 });
        const c = sub(J2, mul(dd, 6)); ln(ub, `M${f(c[0] - aw[2] / 2)} ${f(c[1])} L${f(c[0] + aw[2] / 2)} ${f(c[1])}`, 1.6, dark ? "#000" : INK);
        if (fa > 26) moufle(Cu, "main" + i, J2, dd, -s, SKIN);
      }
      ln(ub, `M${f(s * (sw - 14))} ${f(sh + 2)} Q${f(s * (sw - 4))} ${f(sh + 14)} ${f(s * (sw - 6))} ${f(sh + 30)}`, 1.4, seam);
    });
    // tête de dos : joue si elle tourne (jamais d'œil), oreilles, crâne, cheveux
    if (Math.abs(turn) > 0.05) { const s = Math.sign(turn), k = Math.abs(turn); U.shape(Cu, "joue", blob([[s * (hrx - 18) + tx, hc - 22], [s * (hrx + 2 + 9 * k) + tx, hc + 2], [s * (hrx - 2 + 7 * k) + tx, hc + 30], [s * (hrx - 20) + tx, hc + 52], [s * (hrx - 32) + tx, hc + 12]], 0.9), SKIN, { sw: 2.3, r: 0.5 }); }
    [-1, 1].forEach((s, i) => { const near = Math.sign(turn) === s ? Math.abs(turn) : 0, far = Math.sign(turn) === -s ? Math.abs(turn) : 0; if (far > 0.85) return; const ex = s * (hrx - 3 - 9 * near + 3 * far) + tx; U.shape(Cu, "oreille" + i, blob(ell(ex, hc + 8, 9, 13.5, 8)), SKIN, { sw: 2.2, r: 0.5 }); ln(ub, `M${f(ex + s * 2)} ${f(hc + 1)} Q${f(ex + s * 6)} ${f(hc + 8)} ${f(ex + s * 2)} ${f(hc + 16)}`, 1.3, "#77776F"); });
    U.shape(Cu, "crane", blob(ell(tx, hc, hrx, hry, 12)), SKIN, { sw: 2.6 });
    const hl = fem ? 44 : 38, cap = [[-hrx - 3, -12], [-hrx - 5, -30], [-hrx + 6, -hry + 12], [-hrx * 0.5, -hry - 4], [0, -hry - 7], [hrx * 0.5, -hry - 4], [hrx - 6, -hry + 12], [hrx + 5, -30], [hrx + 3, -12], [hrx - 9, 2], [hrx - 11, 24], [hrx * 0.45, hl], [0, hl + 4], [-hrx * 0.45, hl], [-hrx + 11, 24], [-hrx + 9, 2]].map(([x, y]) => [x + tx, hc + y]);
    if (fem) {
      U.shape(Cu, "cheveux", blob(bosses(cap, 14, 5.5), 0.8), MAT.hairDark, { sw: 2.4, r: 0.45 });
      [[-30, -40], [-6, -50], [20, -44], [38, -24], [-40, -14], [-16, -22], [10, -18], [32, 6], [-26, 10], [0, 4], [18, 24], [-12, 30]].forEach(([x, y]) => { const cx = x + tx, cy = hc + y; ln(ub, `M${f(cx - 5)} ${f(cy + 2)} Q${f(cx - 2)} ${f(cy - 6)} ${f(cx + 4)} ${f(cy - 1)} Q${f(cx + 6)} ${f(cy + 4)} ${f(cx + 1)} ${f(cy + 4)}`, 1.6, "#9A9A94"); });
    } else {
      U.shape(Cu, "cheveux", blob(cap, 0.9), hair === "court-blond" ? MAT.hairBlond : MAT.hairBrown, { sw: 2.4, r: 0.6 });
      const sc = hair === "court-blond" ? "#9C9886" : "#55554F";
      [[[-30, -52], [-10, -40], [-4, -14]], [[24, -50], [14, -30], [10, -6]], [[-40, -20], [-30, 4], [-20, 26]], [[38, -18], [30, 8], [20, 30]]].forEach((s, i) => U.stroke(Cu, "brin" + i, curve(s.map(([x, y]) => [x + tx, hc + y])), { sw: 1.6, r: 0.6, single: true, stroke: sc }));
    }
    if (o.glasses) [-1, 1].forEach((s) => ln(ub, `M${f(s * (hrx - 12) + tx)} ${f(hc - 3)} L${f(s * (hrx + 2) + tx)} ${f(hc + 1)} Q${f(s * (hrx + 5) + tx)} ${f(hc + 4)} ${f(s * (hrx + 3) + tx)} ${f(hc + 10)}`, 2.8, INK));
    return { head: [f(tx), f(hc)], top: [f(tx), f(hc - hry - 7)], hip: [0, f(hip)] };
  };
  D.dos.essais = [{ hair: "boucle-fonce", glasses: true, veste: "blazer" }, { hair: "court-blond", veste: "veste", turn: 0.5 }, { hair: "boucle-fonce", glasses: true, veste: "blazer", stand: 1, slump: 1, bow: 0.9 }, { hair: "neutre", veste: "pull", stand: 1 }];

  // Balustrade (Schranke) au premier plan : main courante, balustres tournés, poteaux d'about, socle. o.w × o.h (850 × 120),
  // ancrage : coin HAUT-gauche (posée en (110, 1300) : de y 1300 à 1420, devant les accusés).
  D.barre = (g, o = {}) => {
    const C = U.ctx(g, 886, false, 1), w = o.w || 850, h = o.h || 120, yT = 17, H = h - 20 - yT;
    U.shape(C, "socle", rect(0, h - 20, w, 20), BOIS2, { sw: 2.2, r: 0.5 });
    const prof = [[0, 5], [0.08, 4], [0.18, 7], [0.3, 8.5], [0.42, 5], [0.5, 3.6], [0.6, 6], [0.74, 9], [0.86, 7], [0.94, 5], [1, 6]];
    const n = Math.round((w - 70) / 38);
    for (let i = 0; i <= n; i++) {
      const x = 35 + i * (w - 70) / n, pts = prof.map(([t, r]) => [x - r, yT + t * H]).concat(prof.slice().reverse().map(([t, r]) => [x + r, yT + t * H]));
      U.shape(C, "bal" + i, blob(pts, 0.5), WOOD, { sw: 1.8, r: 0.4 });
    }
    [[0, 0], [w - 24, 1]].forEach(([x, i]) => { U.shape(C, "poteau" + i, rect(x, 8, 24, h - 8), BOIS2, { sw: 2.2, r: 0.4 }); U.shape(C, "chap" + i, rr(x - 4, 0, 32, 12, 3), WOOD, { sw: 2, r: 0.4 }); });
    U.shape(C, "main", rr(-4, 2, w + 8, 16, 7), WOOD, { sw: 2.4, r: 0.5 });
    ln(g, `M8 7 L${w - 8} 7`, 1.6, "#FFFFFF");
    return { w, h };
  };
  D.barre.essais = [{ w: 520 }];

  // Bancs du public (S17, au fond de la salle) : deux rangs de dossiers hachurés à lattes. o.w (850) × 70, ancrage : coin haut-gauche
  // (posé en (110, 1030)). AJOUT à l'inventaire (S17 les demande).
  D.bancsPublic = (g, o = {}) => {
    const C = U.ctx(g, 888, false, 1), w = o.w || 850;
    [[14, 0, w - 28, 26, 0], [0, 36, w, 34, 1]].forEach(([x, y, ww, hh, i]) => {
      U.shape(C, "rang" + i, rr(x, y, ww, hh, 4), i ? BOIS2 : MAT.mid, { sw: 2.2, r: 0.5, gap: i ? 6 : 5 });
      let s = ""; for (let xx = x + 30; xx < x + ww - 10; xx += 46) s += `M${xx} ${y + 4} L${xx} ${y + hh - 4} `;
      ln(g, s, 1.3, "#55554F");
      ln(g, `M${x + 6} ${y + 5} L${x + ww - 6} ${y + 5}`, 1.4, "#FFFFFF");
    });
    return { w, h: 70 };
  };
  D.bancsPublic.essais = [{ w: 600 }];

  // Carte-dossier (chemise à onglet) qui porte les textes de S16 : 600 × 170 (onglet compris), ancrage : centre (posée en (540, 405)).
  // Le corps commence à out.corps (y local) ; les textes sont posés par la scène.
  D.dossierCarte = (g, o = {}) => {
    const C = U.ctx(g, 890, false, 1), w = o.w || 600, h = o.h || 170, x0 = -w / 2, y0 = -h / 2, tab = 26;
    U.shape(C, "dessous", rr(x0 + 12, y0 + tab - 9, w - 16, h - tab + 4, 10), MAT.light, { sw: 2, r: 0.5 });
    const d = `M${x0} ${y0 + tab + 10} Q${x0} ${y0 + tab} ${x0 + 10} ${y0 + tab} L${x0 + 30} ${y0 + tab} L${x0 + 44} ${y0} L${x0 + 190} ${y0} L${x0 + 204} ${y0 + tab} L${x0 + w - 10} ${y0 + tab} Q${x0 + w} ${y0 + tab} ${x0 + w} ${y0 + tab + 10} L${x0 + w} ${y0 + h - 10} Q${x0 + w} ${y0 + h} ${x0 + w - 10} ${y0 + h} L${x0 + 10} ${y0 + h} Q${x0} ${y0 + h} ${x0} ${y0 + h - 10} Z`;
    ombre(g, d, 7, 8);
    U.shape(C, "chemise", d, MAT.white, { sw: 3, r: 0.5 });
    el("rect", { x: x0 + 60, y: y0 + 7, width: 112, height: 13, rx: 3, fill: YEL, stroke: INK, "stroke-width": 1.4 }, g);
    return { x0, y0, w, h, corps: y0 + tab };
  };

  // Table vue de FACE, coordonnées MONDE : plateau en légère plongée (bande o.y0…o.y1), veinage, nœuds ; si o.y1 < o.yb (1420) :
  // chant + panneau jusqu'en bas. S17 : { x0: 110, x1: 960, y0: 1170, y1: 1260 } · S21 : { y0: 560, y1: 1420 } (le plateau remplit l'image).
  D.tableBois = (g, o = {}) => {
    const C = U.ctx(g, 892, false, 1), x0 = o.x0 == null ? 110 : o.x0, x1 = o.x1 == null ? 960 : o.x1, y0 = o.y0 == null ? 1170 : o.y0, y1 = o.y1 == null ? 1260 : o.y1, yb = o.yb || 1420;
    U.shape(C, "plateau", rect(x0, y0, x1 - x0, y1 - y0), WOOD, { sw: 2.4, r: 0.5, gap: 9 });
    const n = Math.max(2, Math.round((y1 - y0) / 30)); let v = "";
    for (let i = 1; i <= n; i++) { const y = y0 + (y1 - y0) * i / (n + 1); let x = x0 + 8 + hsh(i * 3.7) * 50; v += `M${f(x)} ${f(y)}`; while (x < x1 - 30) { const L = Math.min(x1 - 10 - x, 70 + hsh(i * 7.1 + x) * 110); v += ` q${f(L / 2)} ${f((hsh(x * 0.37 + i) - 0.5) * 9)} ${f(L)} 0`; x += L; } v += " "; }
    ln(g, v, 1.5, "#B4B4AE");
    if (y1 - y0 > 300) [[0.22, 0.3], [0.7, 0.62], [0.42, 0.86]].forEach(([kx, ky], i) => { const cx = lerp(x0, x1, kx), cy = lerp(y0, y1, ky); el("ellipse", { cx: f(cx), cy: f(cy), rx: 16, ry: 6, fill: "none", stroke: "#A9A9A2", "stroke-width": 1.5 }, g); el("ellipse", { cx: f(cx), cy: f(cy), rx: 7, ry: 2.6, fill: "#C9C9C2" }, g); });
    if (y1 < yb - 4) {
      U.shape(C, "chant", rect(x0, y1, x1 - x0, 14), BOIS2, { sw: 2.2, r: 0.4 });
      U.shape(C, "panneau", rect(x0 + 6, y1 + 14, x1 - x0 - 12, yb - y1 - 14), BOIS2, { sw: 2.2, r: 0.5, gap: 7 });
      let s = ""; for (let x = x0 + 120; x < x1 - 60; x += 170) s += `M${x} ${y1 + 22} L${x} ${yb - 4} `;
      ln(g, s, 1.4, "#77776F");
    }
    return { x0, x1, y0, y1 };
  };
  D.tableBois.essais = [{ x0: 0, x1: 600, y0: 0, y1: 90, yb: 260 }, { x0: 0, x1: 500, y0: 0, y1: 500 }];

  // Sachet de preuve transparent à zip (S17) : 150 × 112, ancrage : centre ; le contenu (D.lecteur) se pose entre "fond" et
  // "dessus". o.part "fond" (voile clair derrière le contenu) · "dessus" (contour, zip, zone d'écriture, reflet o.shine 0–1 qui
  // glisse) · "etiquette" (étiquette ficelée « Beweisstück » / « Schnelltest », 22 px, pendue au coin bas-gauche : pivot out.noeud) ;
  // sans o.part : les trois.
  D.sachetPreuve = (g, o = {}) => {
    const C = U.ctx(g, 894, false, 1), part = o.part, sh = clamp(o.shine == null ? 0.3 : o.shine, 0, 1);
    const bag = "M-72 -44 L72 -44 L74 50 Q74 56 68 56 L-68 56 Q-74 56 -74 50 Z", noeud = [-62, 46];
    const fond = () => el("path", { d: bag, fill: "#FFFFFF", opacity: 0.6 }, g);
    const dessus = () => {
      el("path", { d: bag, fill: "#E9EDF2", opacity: 0.28 }, g);
      U.shape(C, "sachet", bag, {}, { sw: 2.2, r: 0.5 });
      U.shape(C, "zip", rr(-74, -56, 148, 13, 3), MAT.grey, { sw: 2, r: 0.4 });
      ln(g, "M-70 -50 L70 -50", 1.2, "#77776F");
      el("rect", { x: 58, y: -60, width: 16, height: 20, rx: 3, fill: "#CFCFCA", stroke: INK, "stroke-width": 1.6 }, g);
      el("rect", { x: 4, y: 26, width: 62, height: 22, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.2 }, g);
      ln(g, "M10 34 L58 34 M10 41 L44 41", 1.2, "#A9A9A2");
      const x = lerp(-62, 40, sh);
      ln(g, `M${f(x)} 44 L${f(x + 24)} -36 M${f(x + 13)} 44 L${f(x + 30)} -18`, 3.2, "#FFFFFF", { opacity: 0.95 });
      el("circle", { cx: noeud[0], cy: noeud[1], r: 4, fill: "none", stroke: INK, "stroke-width": 1.6 }, g);
    };
    const etiquette = () => {
      ln(g, `M${noeud[0]} ${noeud[1]} Q-70 64 -76 76`, 1.6, "#55554F");
      const tg = "M-142 74 L-14 74 L-6 82 L-6 130 L-142 130 Z";
      ombre(g, tg, 3, 4);
      U.shape(C, "etiq", tg, MAT.white, { sw: 2, r: 0.4 });
      el("circle", { cx: -76, cy: 81, r: 3.4, fill: "#F7F7F1", stroke: INK, "stroke-width": 1.3 }, g);
      txt(g, "Beweisstück", -74, 104, 22, {});
      txt(g, "Schnelltest", -74, 126, 22, {});
    };
    if (part === "fond") fond(); else if (part === "dessus") dessus(); else if (part === "etiquette") etiquette();
    else { fond(); dessus(); etiquette(); }
    return { contenu: [0, 4], noeud };
  };
  D.sachetPreuve.essais = [{}, { part: "dessus", shine: 0.9 }];

  // Chemise cartonnée « Akte » fermée par un élastique, posée sur la table : 154 × 84, ancrage : centre ; o.coin 0–1 : le coin
  // haut-droit se soulève.
  D.chemise = (g, o = {}) => {
    const C = U.ctx(g, 896, false, 1), k = clamp(o.coin || 0, 0, 1);
    U.shape(C, "dessous", "M-72 -36 L72 -36 L78 46 L-78 46 Z", MAT.grey, { sw: 2, r: 0.4 });
    const d = `M-70 -42 L${f(54 - 4 * k)} -42 L${f(72 + 2 * k)} ${f(-26 - 6 * k)} L76 40 L-76 40 Z`;
    ombre(g, d, 5, 6);
    U.shape(C, "chemise", d, WOOD, { sw: 2.4, r: 0.5, gap: 8 });
    if (k > 0.02) U.shape(C, "coin", `M${f(54 - 4 * k)} -42 L${f(72 + 2 * k)} ${f(-26 - 6 * k)} L${f(60 + 6 * k)} ${f(-50 - 14 * k)} Z`, MAT.white, { sw: 1.8, r: 0.4 });
    el("rect", { x: -48, y: -20, width: 70, height: 30, rx: 3, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
    txt(g, "Akte", -13, 3, 24, {});
    ln(g, "M46 -42 L48 40", 5.5, INK); ln(g, "M46 -42 L48 40", 2, "#77776F");
    return { w: 154, h: 84 };
  };
  D.chemise.essais = [{}, { coin: 1 }];

  // Chevalet à trois pieds + panneau blanc 370 × 440 (centre du panneau = ancrage, posé en (605, 900)), rebord, pince, pieds
  // jusqu'au sol à y +400. Pivot de m.pend : out.haut. Le schéma se pose par-dessus (D.schemaHopital).
  D.chevalet = (g) => {
    const C = U.ctx(g, 898, false, 1), w = 370, h = 440, x0 = -185, y0 = -220;
    el("ellipse", { cx: 4, cy: 402, rx: 230, ry: 6, fill: "rgba(28,26,28,.12)" }, g);
    const pied = (d, k) => { ln(g, d, 11, INK); ln(g, d, 6.5, "#DCDCD5"); };
    pied("M0 -200 L18 392", 0); pied("M-120 -190 L-208 398", 1); pied("M120 -190 L208 398", 2);
    ombre(g, rect(x0, y0, w, h), 7, 8);
    U.shape(C, "panneau", rect(x0, y0, w, h), MAT.white, { sw: 3, r: 0.5 });
    el("rect", { x: x0 + 7, y: y0 + 7, width: w - 14, height: h - 14, fill: "none", stroke: "#C9C9C2", "stroke-width": 1.4 }, g);
    U.shape(C, "rebord", rr(x0 - 14, h / 2, w + 28, 13, 3), BOIS2, { sw: 2.2, r: 0.4 });
    ln(g, `M0 ${y0} L0 ${y0 - 30}`, 6, INK);
    U.shape(C, "pince", rr(-42, y0 - 16, 84, 18, 4), MAT.mid, { sw: 2, r: 0.4, gap: 3.4 });
    return { haut: [0, y0 - 30], pied: [0, 400], panneau: { x0, y0, w, h } };
  };

  // Mini-coupe de l'hôpital sur le panneau de l'expert : immeuble 260 × 270 à trois étages, barres « >100 Patienten »,
  // « Intensiv », « Notfall » (20 px), un téléphone et un « ? » sur le toit, dessous « 2 Ärzte · 1 Nacht » (22 px) ; DEUX petits
  // médecins font la navette d'un étage à l'autre (o.p = phase 0–1) ; o.mark 0–1 : cercle au surligneur JAUNE qui se trace
  // autour de l'immeuble. 340 × 370 (y −202…168), ancrage : centre (posé en (605, 890) : il tient dans le panneau, y 680–1120). o.part "medecins" : les deux médecins seuls
  // (o.medecins false : le schéma sans eux) — pour les animer sans redessiner le schéma.
  D.schemaHopital = (g, o = {}) => {
    const C = U.ctx(g, 900, false, 1), part = o.part, p = ((o.p || 0) % 1 + 1) % 1, mark = clamp(o.mark || 0, 0, 1);
    const bx0 = -130, by0 = -150, fh = 90, sol = (k) => by0 + fh * (k + 1) - 3;
    const medecins = () => {
      const pos = (q, seq) => { const t = q * seq.length, i = Math.floor(t), u = t - i, a = seq[i % seq.length], b = seq[(i + 1) % seq.length]; return lerp(sol(a), sol(b), sm(clamp((u - 0.62) / 0.38, 0, 1))); };
      [[-112, pos(p, [0, 1, 2, 1]), MAT.hairDark], [112, pos(p, [2, 1, 0, 1]), MAT.hairBlond]].forEach(([x, y, hm], i) => {
        U.shape(C, "blouse" + i, `M${x - 10} ${f(y)} L${x - 7} ${f(y - 22)} Q${x} ${f(y - 27)} ${x + 7} ${f(y - 22)} L${x + 10} ${f(y)} Z`, MAT.white, { sw: 2, r: 0.4 });
        U.shape(C, "tete" + i, circ(x, y - 34, 7.5), SKIN, { sw: 2, r: 0.4 });
        U.shape(C, "chev" + i, `M${x - 8} ${f(y - 35)} Q${x - 8} ${f(y - 44)} ${x} ${f(y - 43)} Q${x + 8} ${f(y - 44)} ${x + 8} ${f(y - 35)} Q${x} ${f(y - 39)} ${x - 8} ${f(y - 35)} Z`, hm, { sw: 1.6, r: 0.4, gap: 3 });
      });
    };
    if (part === "medecins") { medecins(); return {}; }
    U.shape(C, "toit", rr(bx0 - 8, by0 - 12, 276, 12, 3), MAT.mid, { sw: 2.2, r: 0.4, gap: 4 });
    U.shape(C, "immeuble", rect(bx0, by0, 260, 3 * fh), MAT.white, { sw: 3, r: 0.5 });
    U.stroke(C, "d1", `M${bx0} ${by0 + fh} L${bx0 + 260} ${by0 + fh}`, { sw: 3 });
    U.stroke(C, "d2", `M${bx0} ${by0 + 2 * fh} L${bx0 + 260} ${by0 + 2 * fh}`, { sw: 3 });
    [[">100 Patienten", 0], ["Intensiv", 1], ["Notfall", 2]].forEach(([s, k]) => { const y = by0 + fh * k + 48; U.shape(C, "barre" + k, rr(-84, y - 18, 168, 30, 6), MAT.light, { sw: 1.8, r: 0.4 }); txt(g, s, 0, y + 4, 20, {}); });
    ombre(g, rr(56, by0 - 52, 28, 30, 5), 3, 3);                                                         // sur le toit, à droite (la pince du chevalet est au milieu)
    U.shape(C, "tel", rr(56, by0 - 52, 28, 30, 5), MAT.light, { sw: 1.8, r: 0.4 });
    ln(g, `M70 ${by0 - 22} L70 ${by0 - 12}`, 2.2, INK);
    iconeTel(g, 70, by0 - 37, 0.52);
    txt(g, "?", 102, by0 - 26, 32, {});
    txt(g, "2 Ärzte · 1 Nacht", 0, 162, 22, {});
    if (o.medecins !== false) medecins();
    if (mark > 0.01) {
      // boucle « rectangle arrondi » (super-ellipse) qui serre l'immeuble : elle passe sous le téléphone et au-dessus du texte
      const a0 = -100, a1 = a0 + 372 * mark, n = Math.max(2, Math.round(80 * mark)), se = (v) => Math.sign(v) * Math.pow(Math.abs(v), 1 / 3); let s = "";
      for (let i = 0; i <= n; i++) { const a = rad(lerp(a0, a1, i / n)), rr2 = 1 + 0.02 * Math.sin(i * 0.7); s += (i ? " L" : "M") + f(se(Math.cos(a)) * 160 * rr2) + " " + f(-15 + se(Math.sin(a)) * 150 * rr2); }
      ln(g, s, 13, YEL, { opacity: 0.85 });
    }
    return { immeuble: [0, -15], etages: [sol(0), sol(1), sol(2)], texte: [0, 162] };
  };
  D.schemaHopital.essais = [{ p: 0.1 }, { p: 0.4, mark: 1 }];

  // Baguette de présentation : poignée à l'ancrage (0,0), pointe en (o.len 190, 0). La scène l'oriente (rotation du nœud).
  D.baguette = (g, o = {}) => {
    const C = U.ctx(g, 902, false, 1), L = o.len || 190;
    U.shape(C, "tige", `M0 -3.6 L${L} -1.6 L${L} 1.6 L0 3.6 Z`, MAT.white, { sw: 1.8, r: 0.3 });
    U.shape(C, "poignee", rr(-6, -5, 52, 10, 4), MAT.dark, { sw: 1.8, r: 0.3 });
    el("circle", { cx: L + 2, cy: 0, r: 4.4, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g);
    return { pointe: [L + 2, 0] };
  };

  // Ailes au trait (plumes en 3 rangs) : envergure 120 × 70, ancrage : centre (la tête de l'ange se pose au milieu, PAR-DESSUS).
  D.ailes = (g) => {
    const C = U.ctx(g, 904, false, 1);
    [1, -1].forEach((s, i) => {
      const w = el("g", s < 0 ? { transform: "scale(-1 1)" } : {}, g), Cw = U.ctx(w, 904 + i, s < 0, 1);
      const d = "M12 -4 C22 -30 44 -40 60 -36 C59 -24 56 -14 50 -8 C54 -3 53 6 45 10 C47 17 40 24 31 22 C29 30 19 31 12 22 Z";
      ombre(w, d, 3, 4);
      U.shape(Cw, "aile", d, MAT.white, { sw: 2.2, r: 0.5 });
      ln(w, "M22 -16 q4 5 9 1 q4 5 9 1 q4 4 9 0 M20 -2 q4 5 9 1 q4 5 9 1 q4 4 8 0 M18 11 q4 5 8 1 q4 4 8 0", 1.4, "#8F8F88");
    });
    return { w: 120, h: 70 };
  };
  // Auréole : anneau JAUNE cerné d'encre, halo doux. 72 × 24, ancrage : centre.
  D.aureole = (g, o = {}) => {
    el("ellipse", { cx: 0, cy: 0, rx: 38, ry: 13, fill: YEL, opacity: f(0.22 * (o.glow == null ? 1 : o.glow)) }, g);
    el("ellipse", { cx: 0, cy: 0, rx: 30, ry: 8.5, fill: "none", stroke: INK, "stroke-width": 8.5 }, g);
    el("ellipse", { cx: 0, cy: 0, rx: 30, ry: 8.5, fill: "none", stroke: YEL, "stroke-width": 5 }, g);
    return { w: 72, h: 24 };
  };

  // Billet « 500 » : cadre double, valeur aux coins et au centre, rosace hachurée (aucun nom, aucune image réelle). 92 × 50,
  // ancrage : centre. o.seed : petite variation du trait d'un billet à l'autre.
  D.billet = (g, o = {}) => {
    const C = U.ctx(g, 906 + (o.seed || 0), false, 1), d = rr(-46, -25, 92, 50, 4);
    ombre(g, d, 3, 3);
    U.shape(C, "billet", d, { base: "#F3F1E6" }, { sw: 2, r: 0.4 });
    el("rect", { x: -41, y: -20, width: 82, height: 40, rx: 2, fill: "none", stroke: "#8F8F88", "stroke-width": 1.2 }, g);
    U.shape(C, "rosace", circ(-18, 2, 12), MAT.grey, { sw: 1.5, r: 0.4, gap: 3 });
    el("circle", { cx: -18, cy: 2, r: 4.6, fill: "#F3F1E6", stroke: "#55554F", "stroke-width": 1.2 }, g);
    txt(g, "500", 16, 9, 20, {});
    txt(g, "500", -31, -9, 8.5, { fill: "#55524B" }); txt(g, "500", 32, 18, 8.5, { fill: "#55524B" });
    return { w: 92, h: 50 };
  };

  // Porte de la salle : chambranle, battant ; o.open 0 (fermée, deux panneaux, poignée) → 1 (ouverte à 80° vers la salle : mince
  // parallélogramme sur le gond droit, et derrière la lumière du jour, jaune pâle). o.w × o.h (160 × 540 ; S17 : 120 × 360),
  // ancrage : bas-centre (S20 : (770, 1300)). o.part "cadre" (sans battant) · "battant" (le battant seul, pour m.pend, pivot
  // out.gond). Renvoie { ouverture: [x0, x1, y0], gond }.
  D.porteSalle = (g, o = {}) => {
    const C = U.ctx(g, 910, false, 1), w = o.w || 160, h = o.h || 540, open = clamp(o.open == null ? 1 : o.open, 0, 1), part = o.part;
    const x0 = -w / 2 + 10, x1 = w / 2 - 10, y0 = -h + 12, xh = x1;
    const cadre = () => {
      el("rect", { x: x0, y: y0, width: x1 - x0, height: -y0, fill: open > 0.05 ? JOUR : "#E9E9E3" }, g);
      if (open > 0.05) { el("path", { d: `M${x0} -40 L${x1} -40 L${x1} 0 L${x0} 0 Z`, fill: "#F5ECC8" }, g); ln(g, `M${x0} -40 L${x1} -40 M${x0 + 22} -40 L${x0 + 12} 0 M${x1 - 30} -40 L${x1 - 22} 0`, 1.3, "#D3C79A"); el("rect", { x: x0 + 16, y: f(y0 + 60), width: f((x1 - x0) * 0.4), height: f(-y0 * 0.36), fill: "#FFFFFF", stroke: "#D3C79A", "stroke-width": 1.4 }, g); }
      ombre(g, rect(x1, -h, 10, h), 4, 0);
      U.shape(C, "jambeG", rect(-w / 2, -h, 10, h), WOOD, { sw: 2.2, r: 0.4 });
      U.shape(C, "jambeD", rect(x1, -h, 10, h), WOOD, { sw: 2.2, r: 0.4 });
      U.shape(C, "linteau", rr(-w / 2 - 6, -h - 14, w + 12, 16, 3), BOIS2, { sw: 2.2, r: 0.4 });
      U.stroke(C, "seuil", `M${-w / 2} 0 L${w / 2} 0`, { sw: 2.4 });
    };
    const battant = () => {
      if (open < 0.05) {
        U.shape(C, "battant", rect(x0, y0, x1 - x0, -y0), WOOD, { sw: 2.3, r: 0.4 });
        const ph = (-y0 - 60) / 2;
        U.shape(C, "panH", rr(x0 + 14, y0 + 20, x1 - x0 - 28, ph, 4), {}, { sw: 1.7, r: 0.4 });
        U.shape(C, "panB", rr(x0 + 14, y0 + 40 + ph, x1 - x0 - 28, ph, 4), {}, { sw: 1.7, r: 0.4 });
        ln(g, `M${x1 - 18} ${f(y0 * 0.48)} L${x1 - 34} ${f(y0 * 0.48)}`, 4, INK);
        return;
      }
      const a = rad(80 * open), W = x1 - x0, fx2 = xh - W * Math.cos(a) + 46 * Math.sin(a), up = 16 * Math.sin(a), dn = 20 * Math.sin(a);
      const d = poly([[xh, y0], [fx2, y0 - up], [fx2, dn], [xh, 0]]);
      ombre(g, d, 4, 4);
      U.shape(C, "battant", d, BOIS2, { sw: 2.3, r: 0.4 });
      ln(g, `M${f(fx2 - 3)} ${f(y0 * 0.48)} L${f(fx2 - 3)} ${f(y0 * 0.48 + 20)}`, 4, INK);
    };
    if (part === "cadre") cadre(); else if (part === "battant") battant(); else { cadre(); battant(); }
    return { ouverture: [x0, x1, y0], gond: [xh, f(y0 / 2)] };
  };
  D.porteSalle.essais = [{}, { open: 0, w: 120, h: 360 }];

  // Ombre et lumière de fenêtre sur la table (S21) : hachures bleu nuit clairsemées (un trait sur trois, opacité o.hatch × 0,5)
  // + léger voile gris PARTOUT sauf dans la tache de lumière o.pts (4 points, monde : parallélogramme de fenêtre), où la croix
  // du croisillon reste dans l'ombre ; bord de la tache souligné de jaune pâle (o.op 0–1 : la lumière pâlit quand le nuage passe).
  // Sans rough : se redessine à chaque image. AJOUT à l'inventaire (S21 : « les hachures disparaissent dans la lumière »).
  D.ombreJour = (g, o = {}) => {
    const R = o.rect || [110, 560, 850, 860], op = clamp(o.op == null ? 1 : o.op, 0, 1), hk = o.hatch == null ? 1 : o.hatch;
    const P = o.pts || (() => { const c = [520, 880], a = rad(-12), u = [Math.cos(a) * 260, Math.sin(a) * 260], v = [Math.sin(-a) * 150 + 40, Math.cos(a) * 150]; return [sub(sub(c, u), v), sub(add(c, u), v), add(add(c, u), v), add(sub(c, u), v)]; })();
    const m = (uu, vv) => [P[0][0] + uu * (P[1][0] - P[0][0]) + vv * (P[3][0] - P[0][0]), P[0][1] + uu * (P[1][1] - P[0][1]) + vv * (P[3][1] - P[0][1])];
    const croix = [[0.46, 0], [0.54, 0], [0.54, 0.45], [1, 0.45], [1, 0.55], [0.54, 0.55], [0.54, 1], [0.46, 1], [0.46, 0.55], [0, 0.55], [0, 0.45], [0.46, 0.45]].map(([a, b]) => m(a, b));
    const id = "epOmbre" + (++uid);
    el("path", { d: rect(R[0], R[1], R[2], R[3]) + " " + poly(P) + " " + poly(croix), "clip-rule": "evenodd" }, el("clipPath", { id }, el("defs", {}, g)));
    const sg = el("g", { "clip-path": `url(#${id})` }, g);
    el("rect", { x: R[0], y: R[1], width: R[2], height: R[3], fill: "#8E8E88", opacity: f(0.1 + 0.06 * (1 - op)) }, sg);
    hachNuit(sg, R[0], R[1], R[2], R[3], { gap: 13, skip: 3, sw: 2, op: f(0.5 * hk), seed: 21 });
    el("path", { d: poly(P), fill: "#FFFDF0", opacity: f(0.18 * op) }, g);
    ln(g, poly(P), 3, "#FCEFB8", { opacity: f(0.9 * op) });
    return { pts: P.map((q) => [f(q[0]), f(q[1])]) };
  };
  D.ombreJour.essais = [{ rect: [0, 0, 700, 600], pts: [[120, 60], [560, 20], [600, 300], [160, 340]] }, { rect: [0, 0, 700, 600], pts: [[120, 160], [560, 120], [600, 400], [160, 440]], op: 0.55 }];
  }
})();
