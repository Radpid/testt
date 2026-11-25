/* AKTE 03 (copie d'AKTE 02 + décors du bloc, du tribunal, du sang…) — décors dessinés propres à l'épisode (même encre que SketchCast / Persona).
 *   UnnaDecor.cellWall   mur de briques de la cellule + petite fenêtre à barreaux (origine : coin haut-gauche)
 *   UnnaDecor.cellBars   grille de cellule (barreaux ronds, traverses, serrure) (origine : coin haut-gauche)
 *   UnnaDecor.uterus     utérus en coupe + bébé en siège (tête en haut) ; kick, hb (cœur), ghost (tête en bas), arrow
 *   UnnaDecor.monitor    petit moniteur portable : tracé du cœur qui défile, puis ligne plate (flat 0..1)
 *   UnnaDecor.wings      ailes d'ange + auréole (origine : centre du dos)
 *   UnnaDecor.iconBars / iconBan / iconMoney   icônes de la peine (origine : centre, ≈ 120 px)
 *   UnnaDecor.banknote   billet en euros (origine : centre)
 */
(function () {
  "use strict";
  const SC = window.SketchCast, U = SC.util, MAT = SC.MAT, INK = "#1C1A1C", YEL = "#F8CE4E";
  const el = U.el, f = (v) => Math.round(v * 10) / 10;
  const SKIN = (window.Persona && Persona.MAT && Persona.MAT.skin) || { base: "#FBE9DA", hatch: "#E2B9A0", gap: 7, fw: 1 };
  const clear = (g) => { while (g.firstChild) g.removeChild(g.firstChild); };
  const ln = (g, d, w, c) => el("path", { d, fill: "none", stroke: c || INK, "stroke-width": w || 2, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);

  // ───────── cellule
  function cellWall(g, o) {
    clear(g); o = Object.assign({ w: 448, h: 512, seed: 5 }, o);
    const C = U.ctx(g, o.seed, false, 1), w = o.w, h = o.h, floorY = h - 70;
    el("rect", { x: 0, y: 0, width: w, height: h, fill: "#E7E5DC" }, g);
    // briques
    const bh = 38, bw = 92;
    for (let r = 0, y = 0; y < floorY; r++, y += bh) {
      for (let x = -((r % 2) * bw) / 2; x < w; x += bw) {
        const x0 = Math.max(0, x), x1 = Math.min(w, x + bw), y1 = Math.min(floorY, y + bh);
        if (x1 - x0 < 8) continue;
        const shade = ((r * 7 + Math.round(x)) % 5) === 0;
        el("path", { d: `M${f(x0 + 2)} ${f(y + 2)} L${f(x1 - 2)} ${f(y + 2)} L${f(x1 - 2)} ${f(y1 - 2)} L${f(x0 + 2)} ${f(y1 - 2)} Z`, fill: shade ? "#D9D6CB" : "#EEECE4", stroke: "#B5B2A6", "stroke-width": 1.6, "stroke-linejoin": "round" }, g);
      }
    }
    // petite fenêtre haute à barreaux + rayon de lumière
    const wx = w * 0.66, wy = 46, ww = 96, wh = 74;
    el("path", { d: `M${wx} ${wy + wh} L${wx + ww} ${wy + wh} L${wx - 90} ${floorY} L${wx - 260} ${floorY} Z`, fill: YEL, opacity: 0.16 }, g);
    U.shape(C, "win", U.rrect(wx, wy, ww, wh, 4), { base: "#DCE8EE" }, { sw: 3 });
    for (let i = 1; i < 4; i++) U.stroke(C, "wb" + i, `M${wx + i * ww / 4} ${wy} L${wx + i * ww / 4} ${wy + wh}`, { sw: 3.4 });
    // sol
    el("rect", { x: 0, y: floorY, width: w, height: h - floorY, fill: "#D6D3C8" }, g);
    for (let i = 0; i < 9; i++) ln(g, `M${f(i * w / 8 - 30)} ${h} L${f(i * w / 8 + 10)} ${floorY}`, 1.3, "#B5B2A6");
    U.stroke(C, "fl", `M0 ${floorY} L${w} ${floorY}`, { sw: 2.6 });
    // banc
    U.shape(C, "bench", U.rrect(18, floorY - 70, 120, 18, 4), MAT.mid, { sw: 2.4 });
    U.stroke(C, "bl", `M30 ${floorY - 52} L30 ${floorY} M126 ${floorY - 52} L126 ${floorY}`, { sw: 3 });
  }
  function cellBars(g, o) {
    clear(g); o = Object.assign({ w: 448, h: 512, n: 7, seed: 77 }, o);
    const C = U.ctx(g, o.seed, false, 1), w = o.w, h = o.h;
    const xs = []; for (let i = 1; i <= o.n; i++) xs.push(i * w / (o.n + 1));
    xs.forEach((x, i) => {
      el("rect", { x: f(x - 9 + 6), y: 22, width: 18, height: h - 44, rx: 9, fill: "rgba(28,26,28,.18)" }, g);   // ombre
      U.shape(C, "bar" + i, U.rrect(x - 9, 14, 18, h - 28, 9), { base: "#8E8E88", hatch: "#3F3F3B", gap: 4, fw: 1.3 }, { sw: 2.6 });
      ln(g, `M${f(x - 3)} 30 L${f(x - 3)} ${h - 30}`, 2.2, "#D6D6D0");                                                // reflet
    });
    [[0, 0], [1, h * 0.42], [2, h - 34]].forEach(([k, y]) => {
      U.shape(C, "rail" + k, U.rrect(-6, y, w + 12, 34, 6), { base: "#7E7E78", hatch: "#3A3A36", gap: 4.5, fw: 1.2 }, { sw: 2.8 });
      for (let x = 22; x < w; x += 64) el("circle", { cx: x, cy: y + 17, r: 4, fill: "#D6D6D0", stroke: INK, "stroke-width": 1.4 }, g);
    });
    // serrure (sur le côté, jamais devant le visage)
    const lx = w - 34, ly = h * 0.42 + 17;
    U.shape(C, "lock", U.rrect(lx - 30, ly - 44, 60, 88, 8), MAT.yellow, { sw: 2.8 });
    el("circle", { cx: lx, cy: ly - 8, r: 7, fill: INK }, g); el("path", { d: `M${lx - 4} ${ly - 4} L${lx + 4} ${ly - 4} L${lx + 6} ${ly + 16} L${lx - 6} ${ly + 16} Z`, fill: INK }, g);
  }

  // ───────── utérus en coupe + bébé en siège (tête en haut) — origine : centre de l'utérus (≈ 330 × 420)
  function uterus(g, o) {
    clear(g); o = Object.assign({ kick: 0, hb: 0, ghost: 0, arrow: 0, seed: 33, small: false }, o);
    const C = U.ctx(g, o.seed, false, 1);
    const outer = "M-160 -70 C -178 -245, 178 -245, 160 -70 C 150 60, 80 128, 40 200 L -40 200 C -80 128, -150 60, -160 -70 Z";
    const inner = "M-136 -72 C -150 -215, 150 -215, 136 -72 C 128 40, 66 110, 26 176 L -26 176 C -66 110, -128 40, -136 -72 Z";
    el("path", { d: outer, fill: "#D8D5CB", transform: "translate(7 9)" }, g);
    U.shape(C, "wall", outer, { base: "#F2C6BF", hatch: "#D9928A", gap: 6, fw: 1.1 }, { sw: 3.4 });
    el("path", { d: inner, fill: "#F3F7F8", stroke: "#C98E86", "stroke-width": 2 }, g);
    // liquide : quelques bulles
    [[-96, 40, 7], [104, -20, 5], [-70, -150, 6], [90, 70, 4]].forEach(([x, y, r]) => el("circle", { cx: x, cy: y, r, fill: "none", stroke: "#B9CED6", "stroke-width": 1.6 }, g));
    // placenta (haut gauche) + cordon
    U.shape(C, "plac", "M-128 -110 C -136 -170, -96 -196, -56 -190 C -40 -170, -70 -126, -104 -100 Z", { base: "#E3A49D", hatch: "#B86A63", gap: 4.5, fw: 1.2 }, { sw: 2.4 });
    el("path", { d: "M-92 -140 C -120 -90, -40 -70, -76 -10 C -100 30, -40 40, -14 14", fill: "none", stroke: "#C77D82", "stroke-width": 7, "stroke-linecap": "round" }, g);
    el("path", { d: "M-92 -140 C -120 -90, -40 -70, -76 -10 C -100 30, -40 40, -14 14", fill: "none", stroke: "#F1C9CC", "stroke-width": 2, "stroke-dasharray": "4 7" }, g);
    // col (en bas) : la sortie
    U.stroke(C, "cx", "M-26 176 Q 0 186 26 176", { sw: 2.4 });
    // fantôme : la bonne position (tête en bas)
    if (o.ghost > 0.02) {
      const gg = el("g", { opacity: f(o.ghost * 0.85) }, g);
      el("circle", { cx: 0, cy: 120, r: 52, fill: "none", stroke: "#5F9E6E", "stroke-width": 4, "stroke-dasharray": "10 8" }, gg);
      U.text(gg, "✓", 0, 138, 46, { fill: "#2F8F4E" });
    }
    // ── bébé : tête en haut, fesses en bas (siège), jambes repliées
    const B = el("g", { transform: `translate(0 ${f(-6 + 4 * Math.sin(o.kick * Math.PI))})` }, g), Bc = C.sub ? C.sub(B) : U.ctx(B, o.seed + 1, false, 1);
    const kick = o.kick;
    // jambe arrière
    U.shape(Bc, "legB", "M18 74 C 60 60, 92 20, 86 -6 C 80 -26, 58 -22, 56 -4 C 54 18, 30 40, 4 50 Z", SKIN, { sw: 2.4 });
    // corps (dos courbé, fesses en bas vers le col)
    U.shape(Bc, "body", "M-44 -46 C -78 -10, -72 70, -30 104 C 0 124, 40 114, 52 84 C 66 46, 60 -10, 40 -44 C 18 -66, -24 -66, -44 -46 Z", SKIN, { sw: 2.8 });
    // jambe avant (cuisse vers le haut, pied près du visage) — elle « donne un coup »
    const kx = f(10 * kick), ky = f(-14 * kick);
    U.shape(Bc, "legF", `M-6 96 C 40 96, 74 66, ${f(84 + kx)} ${f(26 + ky)} C ${f(90 + kx)} ${f(6 + ky)}, ${f(70 + kx)} ${f(-6 + ky)}, ${f(58 + kx)} ${f(8 + ky)} C 50 40, 28 62, -4 66 Z`, SKIN, { sw: 2.6 });
    U.shape(Bc, "foot", `M${f(52 + kx)} ${f(-2 + ky)} C ${f(52 + kx)} ${f(-26 + ky)}, ${f(84 + kx)} ${f(-30 + ky)}, ${f(90 + kx)} ${f(-10 + ky)} C ${f(92 + kx)} ${f(4 + ky)}, ${f(66 + kx)} ${f(10 + ky)}, ${f(52 + kx)} ${f(-2 + ky)} Z`, SKIN, { sw: 2.4 });
    // bras replié sous le menton
    U.shape(Bc, "arm", "M-20 -24 C 4 -4, 30 -10, 34 -40 C 36 -58, 20 -64, 12 -52 C 8 -40, -4 -36, -14 -40 Z", SKIN, { sw: 2.4 });
    // tête (en haut)
    U.shape(Bc, "head", "M-58 -112 C -60 -170, 50 -184, 62 -122 C 70 -80, 34 -50, -6 -52 C -42 -54, -58 -80, -58 -112 Z", SKIN, { sw: 2.9 });
    ln(B, "M6 -112 Q 18 -104 30 -112", 2.4);                       // œil fermé
    ln(B, "M44 -96 Q 52 -92 48 -86", 2);                           // nez
    ln(B, "M30 -76 Q 38 -72 44 -78", 2);                           // bouche
    el("ellipse", { cx: 20, cy: -92, rx: 10, ry: 6, fill: "#F0A99F", opacity: 0.5 }, B);
    ln(B, "M-30 -118 C -40 -100, -30 -86, -16 -92", 2, "#C9A48E"); // oreille
    // petit cœur qui bat
    const s = 1 + 0.25 * o.hb;
    el("path", { d: `M${f(-12 * s)} ${f(20 - 6 * s)} C ${f(-12 * s)} ${f(20 - 16 * s)}, 0 ${f(20 - 16 * s)}, 0 ${f(20 - 8 * s)} C 0 ${f(20 - 16 * s)}, ${f(12 * s)} ${f(20 - 16 * s)}, ${f(12 * s)} ${f(20 - 6 * s)} C ${f(12 * s)} ${f(20 + 2 * s)}, 0 ${f(20 + 8 * s)}, 0 ${f(20 + 10 * s)} C 0 ${f(20 + 8 * s)}, ${f(-12 * s)} ${f(20 + 2 * s)}, ${f(-12 * s)} ${f(20 - 6 * s)} Z`, fill: "#E05A4F", stroke: INK, "stroke-width": 1.6 }, B);
    // flèche : la tête devrait descendre
    if (o.arrow > 0.02) {
      const L = 360 * o.arrow, P = el("path", { d: "M120 -150 C 210 -80, 210 70, 70 130", fill: "none", stroke: INK, "stroke-width": 5, "stroke-linecap": "round", "stroke-dasharray": `${f(L)} 999` }, g);
      if (o.arrow > 0.95) ln(g, "M86 112 L68 132 L96 140", 5);
    }
  }

  // ───────── moniteur portable — origine : bas-centre (≈ 190 × 150)
  function monitor(g, o) {
    clear(g); o = Object.assign({ t: 0, flat: 0, seed: 55, alarm: false }, o);
    const C = U.ctx(g, o.seed, false, 1);
    el("path", { d: U.rrect(-95, -150, 190, 140, 14), fill: "#D2D2CB", transform: "translate(6 7)" }, g);
    U.shape(C, "case", U.rrect(-95, -150, 190, 140, 14), MAT.grey, { sw: 2.8 });
    el("rect", { x: -78, y: -136, width: 156, height: 94, rx: 6, fill: o.alarm ? "#FBE3DF" : "#FFFFFF", stroke: INK, "stroke-width": 2 }, g);
    // tracé : bip régulier qui ralentit puis devient plat
    let d = "", base = -89;
    for (let x = -74; x <= 74; x += 2) {
      const ph = ((x + 74) / 148 * 3 + o.t) % 1, amp = (1 - o.flat);
      let y = 0;
      if (ph > 0.42 && ph < 0.46) y = -30 * amp; else if (ph >= 0.46 && ph < 0.5) y = 22 * amp; else if (ph >= 0.5 && ph < 0.53) y = -8 * amp;
      d += (d ? " L" : "M") + `${x} ${f(base + y)}`;
    }
    ln(g, d, 3, o.flat > 0.9 ? "#C9625A" : INK);
    // petit cœur + boutons
    el("path", { d: "M-62 -28 c -6 -8 -16 0 -8 8 l 8 8 l 8 -8 c 8 -8 -2 -16 -8 -8 z", fill: o.flat > 0.9 ? "#FFFFFF" : "#E05A4F", stroke: INK, "stroke-width": 1.6 }, g);
    [10, 40, 70].forEach((x, i) => el("circle", { cx: x, cy: -24, r: 7, fill: i === 0 ? YEL : "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g));
  }

  // ───────── ailes d'ange + auréole — origine : entre les épaules
  function wings(g, o) {
    clear(g); o = Object.assign({ flap: 0, halo: true, seed: 71, size: 1 }, o);
    const C = U.ctx(g, o.seed, false, 1), k = o.size, a = 10 * o.flap;
    [-1, 1].forEach((s, i) => {
      const w = el("g", { transform: `scale(${s} 1) rotate(${f(-a)})` }, g), W = C.sub ? C.sub(w) : U.ctx(w, o.seed + i, false, 1);
      U.shape(W, "w" + i, `M0 0 C ${30 * k} ${-60 * k}, ${96 * k} ${-86 * k}, ${126 * k} ${-58 * k} C ${118 * k} ${-36 * k}, ${104 * k} ${-28 * k}, ${96 * k} ${-24 * k} C ${100 * k} ${-12 * k}, ${88 * k} ${2 * k}, ${76 * k} ${2 * k} C ${76 * k} ${16 * k}, ${58 * k} ${22 * k}, ${44 * k} ${18 * k} C ${30 * k} ${26 * k}, ${10 * k} ${16 * k}, 0 0 Z`, MAT.white, { sw: 2.4 });
      ln(w, `M${20 * k} ${-6 * k} C ${50 * k} ${-30 * k}, ${80 * k} ${-42 * k}, ${110 * k} ${-50 * k}`, 1.5, "#B4B4AE");
      ln(w, `M${18 * k} ${4 * k} C ${44 * k} ${-12 * k}, ${70 * k} ${-18 * k}, ${92 * k} ${-22 * k}`, 1.5, "#B4B4AE");
    });
  }
  function halo(g, o) {
    clear(g); o = Object.assign({ r: 48 }, o);
    el("ellipse", { cx: 0, cy: 0, rx: o.r + 10, ry: o.r * 0.32 + 8, fill: YEL, opacity: 0.25 }, g);
    el("ellipse", { cx: 0, cy: 0, rx: o.r, ry: o.r * 0.3, fill: "none", stroke: YEL, "stroke-width": 9 }, g);
    el("ellipse", { cx: 0, cy: 0, rx: o.r, ry: o.r * 0.3, fill: "none", stroke: INK, "stroke-width": 2 }, g);
  }

  // ───────── icônes de la peine (≈ 130 × 130, origine : centre)
  function iconFrame(g, C, mat) { el("path", { d: U.rrect(-66, -66, 132, 132, 22), fill: "#D2D2CB", transform: "translate(6 7)" }, g); U.shape(C, "fr", U.rrect(-66, -66, 132, 132, 22), mat || MAT.white, { sw: 3 }); }
  function iconBars(g) {
    clear(g); const C = U.ctx(g, 301, false, 1); iconFrame(g, C);
    U.stroke(C, "f", U.rrect(-44, -46, 88, 92, 6), { sw: 3.4 });
    [-22, 0, 22].forEach((x, i) => U.shape(C, "b" + i, U.rrect(x - 5, -46, 10, 92, 5), { base: "#8E8E88", hatch: "#3F3F3B", gap: 3.5, fw: 1 }, { sw: 2 }));
    U.shape(C, "r", U.rrect(-46, -8, 92, 12, 4), { base: "#7E7E78", hatch: "#3A3A36", gap: 4, fw: 1 }, { sw: 2 });
  }
  function iconBan(g) {   // sacoche de médecin barrée
    clear(g); const C = U.ctx(g, 302, false, 1); iconFrame(g, C);
    const b = el("g", { transform: "translate(0 34) scale(0.5)" }, g); Persona.props.doctorBag(b, {});
    el("circle", { cx: 0, cy: 0, r: 50, fill: "none", stroke: "#C9625A", "stroke-width": 9 }, g);
    ln(g, "M-35 35 L35 -35", 9, "#C9625A");
  }
  function iconMoney(g) {
    clear(g); const C = U.ctx(g, 303, false, 1); iconFrame(g, C, MAT.yellow);
    [[-8, 16, -8], [4, 0, 4], [-2, -16, -2]].forEach(([x, y, r], i) => { const n = el("g", { transform: `translate(${x} ${y}) rotate(${r})` }, g); banknote(n, { w: 84, seed: 310 + i }); });
  }
  function banknote(g, o) {
    clear(g); o = Object.assign({ w: 96, seed: 320 }, o);
    const C = U.ctx(g, o.seed, false, 1), w = o.w, h = w * 0.52;
    U.shape(C, "n", U.rrect(-w / 2, -h / 2, w, h, 5), { base: "#E9F0D9", hatch: "#9DB07A", gap: 7, fw: 1 }, { sw: 2.2 });
    el("ellipse", { cx: 0, cy: 0, rx: h * 0.36, ry: h * 0.36, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g);
    U.text(g, "€", 0, h * 0.17, h * 0.46, { weight: 700 });
  }


  // ───────── lit d'hôtel vu de face (la maman assise dedans) — origine : sol, centre ; deux couches :
  //   bedBack (tête de lit + oreillers) AVANT la maman, bedFront (couette) APRÈS : la couette cache ses jambes.
  function bedBack(g, o) {
    clear(g); o = Object.assign({ w: 470, seed: 91 }, o);
    const C = U.ctx(g, o.seed, false, 1), w = o.w;
    el("path", { d: U.rrect(-w / 2, -440, w, 260, 18), fill: "#D2D2CB", transform: "translate(7 8)" }, g);
    U.shape(C, "hb", U.rrect(-w / 2, -440, w, 260, 18), { base: "#E4D9C6", hatch: "#B9A98C", gap: 6, fw: 1.1 }, { sw: 3 });
    U.shape(C, "hbp", U.rrect(-w / 2 + 26, -414, w - 52, 150, 12), { base: "#EFE7D8", hatch: "#C9BCA2", gap: 7, fw: 1 }, { sw: 2.2 });
    [[-w / 4 + 6, -1], [w / 4 - 6, 1]].forEach(([x, k], i) => U.shape(C, "pil" + i, `M${x - 98} -232 C ${x - 104} -276, ${x + 104} -282, ${x + 98} -236 C ${x + 102} -204, ${x - 100} -200, ${x - 98} -232 Z`, MAT.white, { sw: 2.6 }));
  }
  function bedFront(g, o) {
    clear(g); o = Object.assign({ w: 470, seed: 92, top: -196 }, o);
    const C = U.ctx(g, o.seed, false, 1), w = o.w, y0 = o.top;
    el("path", { d: `M${-w / 2 - 14} ${y0 + 10} Q 0 ${y0 - 8} ${w / 2 + 14} ${y0 + 10} L${w / 2 + 18} 0 L${-w / 2 - 18} 0 Z`, fill: "#D2D2CB", transform: "translate(7 6)" }, g);
    U.shape(C, "duvet", `M${-w / 2 - 14} ${y0 + 10} Q 0 ${y0 - 8} ${w / 2 + 14} ${y0 + 10} L${w / 2 + 18} 0 L${-w / 2 - 18} 0 Z`, { base: "#F1F1EC", hatch: "#C2C2BA", gap: 8, fw: 1 }, { sw: 3 });
    U.shape(C, "sheet", `M${-w / 2 - 14} ${y0 + 10} Q 0 ${y0 - 8} ${w / 2 + 14} ${y0 + 10} L${w / 2 + 15} ${y0 + 44} Q 0 ${y0 + 28} ${-w / 2 - 15} ${y0 + 44} Z`, MAT.white, { sw: 2.4 });
    el("path", { d: `M${-w / 2 - 6} ${y0 + 34} Q 0 ${y0 + 18} ${w / 2 + 6} ${y0 + 34}`, fill: "none", stroke: YEL, "stroke-width": 5, "stroke-linecap": "round" }, g);
    ln(g, `M${-w / 4} ${y0 + 70} q 14 50 0 ${-y0 - 90} M${w / 5} ${y0 + 66} q -12 60 6 ${-y0 - 92}`, 1.6, "#A9A9A2");
  }

  // ───────── panneau indicateur à deux bras — origine : pied du poteau (sol) ; o.swing (°) fait bouger le bras « Klinik »
  function signpost(g, o) {
    clear(g); o = Object.assign({ h: 740, swing: 0, crossK: 0, glowA: 0, seed: 95 }, o);
    const C = U.ctx(g, o.seed, false, 1), h = o.h;
    el("ellipse", { cx: 0, cy: 2, rx: 46, ry: 10, fill: "rgba(28,26,28,.18)" }, g);
    U.shape(C, "pole", U.rrect(-11, -h, 22, h, 8), { base: "#8E8E88", hatch: "#3F3F3B", gap: 4, fw: 1.2 }, { sw: 2.8 });
    el("circle", { cx: 0, cy: -h - 8, r: 14, fill: YEL, stroke: INK, "stroke-width": 2.6 }, g);
    // bras A : vers la gauche (Hausgeburt), jaune
    const A = el("g", { transform: `translate(0 ${-h + 70})` }, g), CA = C.sub ? C.sub(A) : U.ctx(A, o.seed + 1, false, 1);
    if (o.glowA > 0.02) el("path", { d: "M14 -48 L-226 -48 L-270 0 L-226 48 L14 48 Z", fill: YEL, opacity: f(0.35 * o.glowA), transform: "scale(1.08)" }, A);
    U.shape(CA, "a", "M10 -36 L-214 -36 L-252 0 L-214 36 L10 36 Z", MAT.yellow, { sw: 3.2 });
    U.text(A, "Hausgeburt", -118, 12, 34, {});
    // bras B : vers la droite (Klinik), blanc + croix rouge ; il « appelle » (swing)
    const B = el("g", { transform: `translate(0 ${-h + 190}) rotate(${f(o.swing)})` }, g), CB = C.sub ? C.sub(B) : U.ctx(B, o.seed + 2, false, 1);
    U.shape(CB, "b", "M-10 -36 L214 -36 L252 0 L214 36 L-10 36 Z", MAT.white, { sw: 3.2 });
    el("path", { d: "M18 -12 h10 v-10 h12 v10 h10 v12 h-10 v10 h-12 v-10 h-10 Z", fill: "#E05A4F", stroke: INK, "stroke-width": 1.8 }, B);
    U.text(B, "Klinik", 130, 12, 36, {});
    if (o.crossK > 0.02) {
      const L = 300 * o.crossK;
      el("path", { d: "M0 -30 L230 30", stroke: "#C9625A", "stroke-width": 10, "stroke-linecap": "round", fill: "none", "stroke-dasharray": `${f(Math.min(L, 238))} 999` }, B);
      if (o.crossK > 0.5) el("path", { d: "M230 -30 L0 30", stroke: "#C9625A", "stroke-width": 10, "stroke-linecap": "round", fill: "none", "stroke-dasharray": `${f(Math.max(0, L - 150))} 999` }, B);
    }
  }
  // ───────── porte-documents : « راسي قاصح » qui s'écrit à la main (o.write 0..1, de droite à gauche) — origine : centre
  function clipboard(g, o) {
    clear(g); o = Object.assign({ seed: 97, write: 1, lines: ["راسي", "قاصح"] }, o);
    const C = U.ctx(g, o.seed, false, 1);
    el("path", { d: U.rrect(-70, -90, 140, 180, 10), fill: "#D2D2CB", transform: "translate(5 6)" }, g);
    U.shape(C, "board", U.rrect(-70, -90, 140, 180, 10), { base: "#D9C3A0", hatch: "#A88B5F", gap: 6, fw: 1 }, { sw: 2.8 });
    U.shape(C, "paper", U.rrect(-58, -70, 116, 148, 4), MAT.white, { sw: 2 });
    U.shape(C, "clip", U.rrect(-26, -100, 52, 26, 6), MAT.mid, { sw: 2.4 });
    if (o.write > 0.01) {
      const id = "cbw" + o.seed, cp = el("clipPath", { id }, el("defs", {}, g));
      el("rect", { x: f(58 - 116 * o.write), y: -70, width: f(116 * o.write), height: 148 }, cp);
      const tg = el("g", { "clip-path": `url(#${id})` }, g);
      o.lines.forEach((l, i) => U.text(tg, l, 0, -16 + i * 50, 40, { font: "Lalezar, 'Plex Arabic', sans-serif", weight: 400, rtl: true }));
      el("path", { d: "M-40 52 Q 0 62 40 50", fill: "none", stroke: YEL, "stroke-width": 6, "stroke-linecap": "round", opacity: o.write > 0.95 ? 1 : 0 }, tg);
    }
  }

  // ══════════════════ AKTE 03 ══════════════════
  const RED = "#C9625A", BLUE = "#CFE4EE", BLUE2 = "#9CC4D6";
  // petite balance de la justice (emblème) — origine : centre
  function scalesEmblem(g, k) {
    k = k || 1;
    ln(g, `M0 ${-34 * k} L0 ${30 * k} M${-30 * k} ${-22 * k} L${30 * k} ${-22 * k} M${-18 * k} ${30 * k} L${18 * k} ${30 * k}`, 3);
    [-1, 1].forEach((sg) => { ln(g, `M${30 * sg * k} ${-22 * k} L${(30 * sg - 12) * k} ${2 * k} M${30 * sg * k} ${-22 * k} L${(30 * sg + 12) * k} ${2 * k}`, 2);
      el("path", { d: `M${(30 * sg - 15) * k} ${2 * k} Q ${30 * sg * k} ${14 * k} ${(30 * sg + 15) * k} ${2 * k} Z`, fill: YEL, stroke: INK, "stroke-width": 2 }, g); });
    el("circle", { cx: 0, cy: -38 * k, r: 5 * k, fill: YEL, stroke: INK, "stroke-width": 2 }, g);
  }
  // banc des juges vu de face — origine : sol, centre
  function bench(g, o) {
    clear(g); o = Object.assign({ w: 640, h: 250, seed: 401 }, o);
    const C = U.ctx(g, o.seed, false, 1), w = o.w, h = o.h;
    el("path", { d: U.rrect(-w / 2, -h, w, h, 10), fill: "#D2D2CB", transform: "translate(8 8)" }, g);
    U.shape(C, "front", U.rrect(-w / 2, -h, w, h, 10), { base: "#E4D9C6", hatch: "#B9A98C", gap: 7, fw: 1.1 }, { sw: 3 });
    U.shape(C, "top", U.rrect(-w / 2 - 16, -h - 22, w + 32, 26, 8), { base: "#D9C3A0", hatch: "#A88B5F", gap: 6, fw: 1 }, { sw: 2.8 });
    [-w / 3, w / 3].forEach((x, i) => U.stroke(C, "p" + i, U.rrect(x - 70, -h + 40, 140, h - 70, 8), { sw: 2, r: 0.6 }));
    const e = el("g", { transform: `translate(0 ${-h / 2 + 4})` }, g);
    el("circle", { cx: 0, cy: 0, r: 52, fill: "#FFFFFF", stroke: INK, "stroke-width": 3 }, e); scalesEmblem(e, 1);
  }
  // façade de tribunal (colonnes + fronton) — origine : sol, centre
  function courthouse(g, o) {
    clear(g); o = Object.assign({ w: 440, h: 420, label: "OLG", seed: 403 }, o);
    const C = U.ctx(g, o.seed, false, 1), w = o.w, h = o.h;
    el("path", { d: U.rrect(-w / 2, -h, w, h, 4), fill: "#D2D2CB", transform: "translate(8 8)" }, g);
    U.shape(C, "body", U.rrect(-w / 2, -h, w, h, 4), MAT.white, { sw: 3 });
    U.shape(C, "roof", `M${-w / 2 - 24} ${-h} L0 ${-h - 120} L${w / 2 + 24} ${-h} Z`, MAT.grey, { sw: 3 });
    const e = el("g", { transform: `translate(0 ${-h - 52})` }, g); scalesEmblem(e, 0.8);
    U.shape(C, "frieze", U.rrect(-w / 2 + 14, -h + 10, w - 28, 46, 4), MAT.yellow, { sw: 2.6 });
    U.text(g, o.label, 0, -h + 46, 34, {});
    for (let i = 0; i < 5; i++) { const x = -w / 2 + 50 + i * (w - 100) / 4; U.shape(C, "col" + i, U.rrect(x - 16, -h + 70, 32, h - 110, 6), MAT.light || MAT.white, { sw: 2.4 }); }
    U.shape(C, "steps", U.rrect(-w / 2 - 20, -40, w + 40, 40, 4), MAT.grey, { sw: 2.6 });
    U.shape(C, "door", U.rrect(-34, -150, 68, 110, 6), MAT.mid, { sw: 2.4 });
  }
  // scialytique — origine : accroche au plafond ; o.on 0..1 (cône de lumière)
  function opLamp(g, o) {
    clear(g); o = Object.assign({ on: 1, drop: 230, seed: 405 }, o);
    const C = U.ctx(g, o.seed, false, 1), d = o.drop;
    if (o.on > 0.02) el("path", { d: `M-110 ${d + 30} L110 ${d + 30} L260 ${d + 520} L-260 ${d + 520} Z`, fill: YEL, opacity: f(0.16 * o.on) }, g);
    U.stroke(C, "arm", `M0 0 L0 ${d - 40}`, { sw: 6 });
    U.shape(C, "dome", `M-120 ${d + 30} C -120 ${d - 50}, 120 ${d - 50}, 120 ${d + 30} Z`, MAT.grey, { sw: 3 });
    [-60, 0, 60].forEach((x, i) => el("circle", { cx: x, cy: d + 14, r: 18, fill: o.on > 0.5 ? "#FFF6C9" : "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, g));
  }
  // table d'opération / lit de réa, vue de côté ; la patiente couverte d'un champ (tête à gauche) — origine : sol, centre
  //   renvoie les ancres { head, chest, belly } (pour dessiner la tête avec Persona.head et poser les mains)
  function opTable(g, o) {
    clear(g); o = Object.assign({ w: 560, kind: "op", seed: 407, drape: "#BFD9C9", breath: 0 }, o);
    const C = U.ctx(g, o.seed, false, 1), w = o.w, top = o.kind === "op" ? -250 : -220;
    if (o.kind === "op") {
      U.shape(C, "col", U.rrect(-30, top + 30, 60, -top - 60, 6), MAT.mid, { sw: 2.6 });
      U.shape(C, "base", U.rrect(-120, -34, 240, 34, 10), MAT.grey, { sw: 2.8 });
    } else {
      [-w / 2 + 40, w / 2 - 40].forEach((x, i) => { U.stroke(C, "leg" + i, `M${x} ${top + 30} L${x} -14`, { sw: 5 }); el("circle", { cx: x, cy: -10, r: 10, fill: DARKC, stroke: INK, "stroke-width": 2 }, g); });
      U.shape(C, "rail", U.rrect(-w / 2 + 30, top - 40, w - 60, 14, 6), MAT.grey, { sw: 2.2 });
      U.shape(C, "hb", U.rrect(-w / 2 - 6, top - 120, 26, 150, 8), MAT.grey, { sw: 2.6 });
    }
    U.shape(C, "slab", U.rrect(-w / 2, top, w, 34, 10), MAT.white, { sw: 2.8 });
    const b = 4 * o.breath;
    U.shape(C, "drape", `M${-w / 2 + 110} ${top + 2} C ${-w / 2 + 130} ${top - 58 - b}, ${-w / 2 + 250} ${top - 70 - b}, ${-w / 2 + 300} ${top - 58} C ${w / 2 - 170} ${top - 48}, ${w / 2 - 70} ${top - 66}, ${w / 2 - 30} ${top - 30} L${w / 2 + 6} ${top + 40} L${-w / 2 + 96} ${top + 40} Z`,
      { base: o.drape, hatch: "#7FA68E", gap: 7, fw: 1 }, { sw: 2.8 });
    U.shape(C, "pillow", U.rrect(-w / 2 + 14, top - 32, 110, 36, 14), MAT.white, { sw: 2.4 });
    return { head: [-w / 2 + 70, top - 54], chest: [-w / 2 + 200, top - 64], belly: [-w / 2 + 320, top - 56], hand: [-w / 2 + 250, top - 40] };
  }
  const DARKC = "#3A3A37";
  // résectoscope (appareil « à tester ») — origine : poignée ; o.sparkle 0..1
  function scope(g, o) {
    clear(g); o = Object.assign({ sparkle: 0, seed: 409 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    U.shape(C, "shaft", U.rrect(0, -7, 230, 14, 7), { base: "#E6E6E1", hatch: "#96968F", gap: 5, fw: 1 }, { sw: 2.4 });
    el("circle", { cx: 236, cy: 0, r: 7, fill: "#FFF6C9", stroke: INK, "stroke-width": 2 }, g);
    U.shape(C, "grip", "M-50 -22 L10 -22 L10 22 L-34 40 L-50 22 Z", MAT.mid, { sw: 2.6 });
    U.shape(C, "ring", "M-70 30 A18 18 0 1 1 -34 30 A18 18 0 1 1 -70 30", MAT.white, { sw: 2.4 });
    ln(g, "M-50 0 C -110 10, -120 80, -170 90", 4, "#55554F");
    if (o.sparkle > 0.02) [[150, -40], [250, -28], [200, 30]].forEach(([x, y], i) => { const k = (0.6 + 0.6 * o.sparkle) * (i === 1 ? 1.3 : 1); el("path", { d: `M${x} ${y - 14 * k} L${x + 4 * k} ${y - 4 * k} L${x + 14 * k} ${y} L${x + 4 * k} ${y + 4 * k} L${x} ${y + 14 * k} L${x - 4 * k} ${y + 4 * k} L${x - 14 * k} ${y} L${x - 4 * k} ${y - 4 * k} Z`, fill: YEL, stroke: INK, "stroke-width": 1.6 }, g); });
  }
  // poche de liquide sur pied — origine : sol ; o.level 0..1, o.flow (phase des gouttes), o.label
  function fluidBag(g, o) {
    clear(g); o = Object.assign({ level: 1, flow: 0, label: "Aqua dest.", tube: [180, 40], seed: 411 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    U.stroke(C, "pole", "M0 0 L0 -720 M-40 -720 L40 -720", { sw: 5 });
    U.shape(C, "feet", "M-60 0 L60 0 L40 -14 L-40 -14 Z", MAT.mid, { sw: 2.4 });
    const bx = -70, by = -700, bw = 140, bh = 220;
    el("path", { d: U.rrect(bx, by, bw, bh, 26), fill: "#FFFFFF", stroke: INK, "stroke-width": 3 }, g);
    const lv = Math.max(0, Math.min(1, o.level)), ly = by + 30 + (bh - 50) * (1 - lv);
    if (lv > 0.01) el("path", { d: `M${bx + 8} ${ly} L${bx + bw - 8} ${ly} L${bx + bw - 8} ${by + bh - 22} Q ${bx + bw / 2} ${by + bh - 2} ${bx + 8} ${by + bh - 22} Z`, fill: BLUE, stroke: BLUE2, "stroke-width": 2 }, g);
    U.shape(C, "lab", U.rrect(bx + 14, by + 56, bw - 28, 56, 8), MAT.yellow, { sw: 2.2 });
    U.text(g, o.label, 0, by + 94, 24, {});
    el("path", { d: `M0 ${by + bh} L0 ${by + bh + 40}`, stroke: INK, "stroke-width": 3 }, g);
    U.shape(C, "drip", U.rrect(-12, by + bh + 40, 24, 46, 8), MAT.white, { sw: 2 });
    const [tx, ty] = o.tube, tp = `M0 ${by + bh + 86} C 0 ${by + bh + 240}, ${tx - 160} ${ty - 260}, ${tx} ${ty}`;
    el("path", { d: tp, fill: "none", stroke: "#6E8B99", "stroke-width": 4 }, g);
    const P = el("path", { d: tp, fill: "none", stroke: "none" }, g);
    try { const L = P.getTotalLength(); for (let i = 0; i < 4; i++) { const q = ((o.flow + i / 4) % 1) * L, pt = P.getPointAtLength(q); el("circle", { cx: f(pt.x), cy: f(pt.y), r: 5, fill: BLUE2, stroke: INK, "stroke-width": 1.2 }, g); } } catch (e) { /* hors navigateur */ }
  }
  // utérus en coupe (sans bébé) + caméra qui entre par le col + liquide qui remplit — origine : centre
  function uterusCam(g, o) {
    clear(g); o = Object.assign({ ins: 1, fill: 1, light: 1, seed: 413 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    const outer = "M-160 -70 C -178 -245, 178 -245, 160 -70 C 150 60, 80 128, 40 200 L -40 200 C -80 128, -150 60, -160 -70 Z";
    const inner = "M-136 -72 C -150 -215, 150 -215, 136 -72 C 128 40, 66 110, 26 176 L -26 176 C -66 110, -128 40, -136 -72 Z";
    el("path", { d: outer, fill: "#D8D5CB", transform: "translate(7 9)" }, g);
    U.shape(C, "wall", outer, { base: "#F2C6BF", hatch: "#D9928A", gap: 6, fw: 1.1 }, { sw: 3.4 });
    el("path", { d: inner, fill: "#FCEFEA", stroke: "#C98E86", "stroke-width": 2 }, g);
    const id = "ucf" + o.seed, cp = el("clipPath", { id }, el("defs", {}, g)); el("path", { d: inner }, cp);
    const fy = 176 - 400 * Math.max(0, Math.min(1, o.fill));
    if (o.fill > 0.01) { el("rect", { x: -160, y: f(fy), width: 320, height: 420, fill: BLUE, opacity: 0.85, "clip-path": `url(#${id})` }, g);
      el("path", { d: `M-150 ${f(fy)} q 25 -8 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0`, fill: "none", stroke: BLUE2, "stroke-width": 2.4, "clip-path": `url(#${id})` }, g); }
    // la caméra (tige fine) entre par le bas
    const tip = 200 - 300 * Math.max(0, Math.min(1, o.ins));
    if (o.light > 0.02 && o.ins > 0.6) el("path", { d: `M0 ${f(tip)} L-70 ${f(tip - 150)} L70 ${f(tip - 150)} Z`, fill: YEL, opacity: f(0.3 * o.light), "clip-path": `url(#${id})` }, g);
    U.shape(C, "rod", U.rrect(-8, f(tip), 16, f(330 - tip), 7), { base: "#E6E6E1", hatch: "#96968F", gap: 5, fw: 1 }, { sw: 2.2 });
    el("circle", { cx: 0, cy: f(tip), r: 9, fill: "#FFF6C9", stroke: INK, "stroke-width": 2 }, g);
  }
  // vaisseau sanguin : globules rouges qui défilent ; de l'eau entre (o.water) ; ils gonflent puis éclatent (o.burst)
  function vessel(g, o) {
    clear(g); o = Object.assign({ t: 0, water: 0, burst: 0, seed: 415 }, o);
    const C = U.ctx(g, o.seed, false, 1), W = 780, H = 300;
    U.shape(C, "wall", U.rrect(-W / 2, -H / 2, W, H, H / 2), { base: "#F7D9D3", hatch: "#E3A9A1", gap: 9, fw: 1 }, { sw: 4 });
    el("path", { d: U.rrect(-W / 2 + 18, -H / 2 + 18, W - 36, H - 36, (H - 36) / 2), fill: "#FFF5F2", stroke: "#D9928A", "stroke-width": 2 }, g);
    const cells = [[-300, -40], [-210, 50], [-120, -60], [-30, 30], [60, -50], [150, 40], [240, -30], [310, 55], [-250, -80], [100, 75]];
    cells.forEach(([x0, y], i) => {
      const x = ((x0 + 340 + o.t * 180) % 680) - 340, b = Math.max(0, Math.min(1, o.burst * 1.6 - (i % 4) * 0.18)), sw = 1 + 0.35 * Math.min(1, o.water * 1.4) + 0.2 * b;
      if (b < 0.85) {
        const gg = el("g", { transform: `translate(${f(x)} ${y}) scale(${f(sw)})` }, g);
        el("ellipse", { cx: 0, cy: 0, rx: 30, ry: 22, fill: "#E05A4F", stroke: INK, "stroke-width": 2.4 }, gg);
        el("ellipse", { cx: 0, cy: 0, rx: 13, ry: 8, fill: "#C9433A", opacity: f(1 - Math.min(1, o.water)) }, gg);
      }
      if (b > 0.5) { const k = (b - 0.5) * 2; for (let j = 0; j < 6; j++) { const a = j / 6 * Math.PI * 2 + i, r = 20 + 36 * k; el("path", { d: `M${f(x + Math.cos(a) * r)} ${f(y + Math.sin(a) * r)} l ${f(8 * Math.cos(a + 1))} ${f(8 * Math.sin(a + 1))}`, stroke: "#E05A4F", "stroke-width": 5, "stroke-linecap": "round", opacity: f(1 - k * 0.6) }, g); } }
    });
    if (o.water > 0.02) for (let j = 0; j < 9; j++) { const x = -330 + j * 80 + ((o.t * 60) % 80), y = -100 + ((j * 53) % 200); el("path", { d: `M${f(x)} ${f(y - 12)} C ${f(x + 9)} ${f(y)}, ${f(x + 7)} ${f(y + 10)}, ${f(x)} ${f(y + 10)} C ${f(x - 7)} ${f(y + 10)}, ${f(x - 9)} ${f(y)}, ${f(x)} ${f(y - 12)} Z`, fill: BLUE, stroke: BLUE2, "stroke-width": 1.8, opacity: f(Math.min(1, o.water * 1.5)) }, g); }
  }
  // carte du mot caché (« Remonstrationspflicht ») : bandes jaunes qui se décollent (o.reveal), cadenas (o.lock = ouverture)
  function wordCard(g, o) {
    clear(g); o = Object.assign({ word: "Remonstrationspflicht", reveal: 0, lock: 0, shake: 0, seed: 417 }, o);
    const C = U.ctx(g, o.seed, false, 1), w = 760, h = 190;
    el("path", { d: U.rrect(-w / 2, -h / 2, w, h, 20), fill: "#D2D2CB", transform: "translate(8 10)" }, g);
    U.shape(C, "card", U.rrect(-w / 2, -h / 2, w, h, 20), MAT.white, { sw: 3.4 });
    U.text(g, o.word, 0, 22, 62, {});
    const n = 7, sw = (w - 60) / n;
    for (let i = 0; i < n; i++) { const r = Math.max(0, Math.min(1, o.reveal * 1.6 - i * 0.09)); if (r >= 1) continue;
      const x = -w / 2 + 30 + i * sw, rot = -8 * r * (i % 2 ? 1 : -1);
      el("path", { d: U.rrect(x, -48, sw - 6, 96, 6), fill: YEL, stroke: INK, "stroke-width": 2, transform: `translate(0 ${f(-160 * r * r)}) rotate(${f(rot)} ${f(x + sw / 2)} 0)`, opacity: f(1 - r) }, g);
      if (r < 0.05) U.text(g, "?", x + sw / 2 - 3, 18, 44, {}); }
    const lk = el("g", { transform: `translate(0 ${-h / 2 - 6}) rotate(${f(o.shake * 10)})` }, g);
    el("path", { d: `M-24 0 L-24 ${f(-30 - 18 * o.lock)} A24 24 0 0 1 24 ${f(-30 - 18 * o.lock)} L24 ${o.lock > 0.3 ? -40 : 0}`, fill: "none", stroke: INK, "stroke-width": 7, "stroke-linecap": "round" }, lk);
    el("path", { d: U.rrect(-38, -6, 76, 62, 10), fill: YEL, stroke: INK, "stroke-width": 3 }, lk);
    el("circle", { cx: 0, cy: 20, r: 7, fill: INK }, lk); el("path", { d: "M-3 22 L3 22 L4 38 L-4 38 Z", fill: INK }, lk);
  }
  // scotch sur la bouche — origine : centre de la bouche ; o.peel 0..1 (il se décolle par la droite)
  function tape(g, o) {
    clear(g); o = Object.assign({ peel: 0, w: 74, seed: 419 }, o);
    const C = U.ctx(g, o.seed, false, 1), w = o.w, p = o.peel;
    const t = el("g", { transform: `rotate(${f(-6 - 70 * p)} ${f(-w / 2)} 0) translate(${f(-14 * p)} ${f(-6 * p)})` }, g);
    U.shape(C.sub ? C.sub(t) : C, "t", `M${-w / 2} -14 L${w / 2} -18 L${w / 2 + 4} -10 L${w / 2} -2 L${w / 2 + 4} 6 L${w / 2} 14 L${-w / 2} 16 L${-w / 2 - 4} 8 L${-w / 2} 0 L${-w / 2 - 4} -8 Z`, { base: "#C8C8C1", hatch: "#8A8A84", gap: 4, fw: 1 }, { sw: 2.2 });
  }
  // échelle de la hiérarchie (4 barreaux) — origine : bas-centre ; renvoie la hauteur des barreaux
  function ladder(g, o) {
    clear(g); o = Object.assign({ h: 560, w: 200, seed: 421 }, o);
    const C = U.ctx(g, o.seed, false, 1), h = o.h, w = o.w;
    U.stroke(C, "l", `M${-w / 2} 0 L${-w / 2 + 20} ${-h}`, { sw: 6 }); U.stroke(C, "r", `M${w / 2} 0 L${w / 2 - 20} ${-h}`, { sw: 6 });
    const ys = []; for (let i = 0; i < 4; i++) { const y = -70 - i * (h - 120) / 3; ys.push(y); U.stroke(C, "rg" + i, `M${-w / 2 + 6} ${y} L${w / 2 - 6} ${y}`, { sw: 5 }); }
    return { rungs: ys };
  }
  // escalier 3 marches (vu de côté) + porte en haut — origine : bas-gauche
  function stairs(g, o) {
    clear(g); o = Object.assign({ step: 170, rise: 110, seed: 423, door: "Chefarzt" }, o);
    const C = U.ctx(g, o.seed, false, 1), s = o.step, r = o.rise;
    let d = "M0 0"; for (let i = 0; i < 3; i++) d += ` L${i * s} ${-(i + 1) * r} L${(i + 1) * s} ${-(i + 1) * r}`; d += ` L${3 * s + 40} ${-3 * r} L${3 * s + 40} 0 Z`;
    U.shape(C, "st", d, MAT.grey, { sw: 3 });
    const dx = 3 * s - 40, dy = -3 * r;
    U.shape(C, "door", U.rrect(dx - 10, dy - 200, 110, 200, 8), { base: "#E4D9C6", hatch: "#B9A98C", gap: 7, fw: 1 }, { sw: 2.8 });
    el("circle", { cx: dx + 80, cy: dy - 100, r: 6, fill: YEL, stroke: INK, "stroke-width": 2 }, g);
    U.shape(C, "plate", U.rrect(dx - 4, dy - 186, 98, 34, 6), MAT.white, { sw: 2 });
    U.text(g, o.door, dx + 45, dy - 162, 18, {});
    return { steps: [0, 1, 2].map((i) => [i * s + s / 2, -(i + 1) * r]), top: [dx + 45, dy] };
  }
  // icônes (≈ 130) : mégaphone / point d'interrogation / flèche vers le haut
  function iconMegaphone(g) { clear(g); const C = U.ctx(g, 431, false, 1); iconFrame(g, C); U.shape(C, "m", "M-34 -12 L10 -36 L10 36 L-34 12 Z", MAT.yellow, { sw: 3 }); U.shape(C, "h", U.rrect(-48, -14, 16, 28, 4), MAT.mid, { sw: 2.4 }); [0, 1].forEach((i) => ln(g, `M${22 + i * 12} ${-20 - i * 6} Q ${32 + i * 14} 0 ${22 + i * 12} ${20 + i * 6}`, 3)); }
  function iconQuestion(g) { clear(g); const C = U.ctx(g, 433, false, 1); iconFrame(g, C, MAT.yellow); U.text(g, "?", 0, 34, 96, {}); }
  function iconUp(g) { clear(g); const C = U.ctx(g, 435, false, 1); iconFrame(g, C); U.shape(C, "a", "M0 -46 L36 -6 L14 -6 L14 44 L-14 44 L-14 -6 L-36 -6 Z", MAT.yellow, { sw: 3 }); }
  // respirateur — origine : sol
  function ventilator(g, o) {
    clear(g); o = Object.assign({ ph: 0, seed: 437 }, o);
    const C = U.ctx(g, o.seed, false, 1);
    [-40, 40].forEach((x, i) => el("circle", { cx: x, cy: -10, r: 10, fill: DARKC, stroke: INK, "stroke-width": 2 }, g));
    U.shape(C, "box", U.rrect(-60, -230, 120, 210, 12), MAT.grey, { sw: 2.8 });
    el("rect", { x: -44, y: -212, width: 88, height: 56, rx: 6, fill: "#FFFFFF", stroke: INK, "stroke-width": 2 }, g);
    const bh = 40 + 26 * (0.5 + 0.5 * Math.sin(o.ph * Math.PI * 2));
    U.shape(C, "bel", U.rrect(-26, -140, 52, f(bh), 8), { base: "#E6E6E1", hatch: "#96968F", gap: 6, fw: 1 }, { sw: 2.2 });
    for (let i = 1; i < 4; i++) ln(g, `M-26 ${f(-140 + bh * i / 4)} L26 ${f(-140 + bh * i / 4)}`, 1.4, "#77776F");
  }

  window.UnnaDecor = { bench, courthouse, opLamp, opTable, scope, fluidBag, uterusCam, vessel, wordCard, tape, ladder, stairs, iconMegaphone, iconQuestion, iconUp, ventilator, scalesEmblem, signpost, clipboard, bedBack, bedFront, cellWall, cellBars, uterus, monitor, wings, halo, iconBars, iconBan, iconMoney, banknote };
})();
