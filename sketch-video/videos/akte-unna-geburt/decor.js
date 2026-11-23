/* AKTE 02 — décors dessinés propres à l'épisode (même encre que SketchCast / Persona).
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

  window.UnnaDecor = { bedBack, bedFront, cellWall, cellBars, uterus, monitor, wings, halo, iconBars, iconBan, iconMoney, banknote };
})();
