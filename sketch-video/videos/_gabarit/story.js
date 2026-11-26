/* GABARIT d'épisode AKTE — saison 2 (voir serie/SAISON-2.md).
 * Copier ce dossier en videos/akte-<ville>-<sujet>/, puis remplacer tout ce qui est marqué « À REMPLACER ».
 * Les blocs marqués « SOCLE » appliquent le skill et restent les mêmes dans tous les épisodes :
 *   kit (rubans, pastilles avec arabe détaché, cartes), carte de l'Allemagne + épingle, aides Persona,
 *   éléments obligatoires de l'intro (photo + anneau jaune + Instagram + « Yassine » + j'aime / s'abonner),
 *   HUD (barre de progression + logo masqué pendant l'intro), affiche-résumé finale.
 * Tout le reste — décors (decor.js), personnages, scènes, caméra, transitions, HUD propre — est PROPRE à l'épisode.
 * Zones Instagram : contenu entre x 90 et 990 (décor entre 110 et 960) ; rien d'important au-dessus de y 250, sous y 1470,
 * ni dans la colonne des boutons (x > 915, y 980–1650).
 */
(function () {
  "use strict";
  const AKTE_NO = "00", AKTE_NEXT = "00", TITRE = "عنوان الحلقة";      // À REMPLACER (le numéro n'apparaît qu'ici)
  const QUESTION = "السؤال المكتوب فالآخر؟";                            // À REMPLACER : question ÉCRITE de l'affiche (jamais dite)
  const SC = SketchCast, K = Cast, W = 1080, U = SC.util, MAT = SC.MAT, INK = SC.INK;
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, a, p) => { const n = document.createElementNS(NS, tag); for (const k in a || {}) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; };
  const isLatin = (s) => /[A-Za-z0-9]/.test(s) && !/[\u0600-\u06FF]/.test(s);
  const BEAT_IDS = window.BEATS.map((b) => b[0]), LAST = BEAT_IDS[BEAT_IDS.length - 1], AFTER_INTRO = BEAT_IDS[BEAT_IDS.indexOf("i3") + 1];

  window.SV_BUILD = (sv) => {
    const st = Stage.create(sv, { view: { s: 1.06, oy: -20, breathe: 0.04 } }), T = (x) => st.T(x), E = Stage.E, prog = Stage.prog, lerp = Stage.lerp, clamp = Stage.clamp;

    /* ───────── SOCLE : kit (rubans, pastilles allemand + arabe détaché, cartes, titres, marcheur) ───────── */
    function kit(c) {
      const k = {
        bg() { SketchUI.dots(c); },
        ground(x, y, w) { return c.sk((g, p) => SC.ground(g, p), () => ({ w, seed: Math.round(x) }), x, y, 1); },
        person(x, y, s, fn, parent) { return c.sk((g, p) => SC.person(g, p), fn, x, y, s, 0, parent); },
        baby(x, y, s, fn, parent) { return c.sk((g, p) => SC.baby(g, p), fn, x, y, s, 0, parent); },
        prop(kind, x, y, s, fn, rot = 0, parent) { return c.sk((g, p) => SC[kind](g, p), fn, x, y, s, rot, parent); },
        cast(kind, o, parent) { const g = el("g"); K[kind](g, o); return c.node(g, parent); },
        // ruban titre (blanc + surligneur jaune) ou jaune
        ribbon(text, x, y, o = {}) {
          const size = o.size || 76, lat = isLatin(text);
          const w = o.w || Math.max(260, text.length * size * (lat ? 0.5 : 0.42) + 150);
          return c.sk((g, p) => SC.ribbon(g, p), () => ({ text, w, h: size * 1.45, size, style: o.style || "white", rot: o.rot != null ? o.rot : -2,
            font: lat ? "Kalam, sans-serif" : "Lalezar, Kalam, sans-serif", rtl: !lat, seed: o.seed || 61 }), x, y, 1, 0, o.parent);
        },
        // bandeau surligneur jaune derrière un texte
        marker(x, y, w, h, rot = -1.5) { const g = el("g", { transform: `translate(${x} ${y})` }); SC.marker(g, { w, h, rot }); return c.node(g); },
        // pastille grise hachurée (comme NumPy / Python dans la référence) + traduction arabe dessous
        chip(de, ar, x, y, size = 44, o = {}) {
          const g = el("g", { transform: `translate(${x} ${y})` });
          const w = o.w || Math.max(120, de.length * size * 0.52 + 60), h = size * 1.5;
          const C = SC.util.ctx(g, o.seed || Math.round(x + y), false, 1);
          el("path", { d: SC.util.rrect(-w / 2, -h / 2, w, h, 14), fill: "#CDCDC6", transform: "translate(6 7)" }, g);
          SC.util.shape(C, "chip", SC.util.rrect(-w / 2, -h / 2, w, h, 14), o.yellow ? SC.MAT.yellow : SC.MAT.grey, { sw: 2.8 });
          const arab = /[؀-ۿ]/.test(de);
          SC.util.text(g, de, 0, size * 0.36, size, arab ? { rtl: true, font: "'Plex Arabic', Kalam, sans-serif", weight: 700 } : {});
          if (ar) {   // traduction arabe : bien détachée de la pastille (et de son ombre), avec un contour papier pour rester lisible
            const gs = Math.max(26, Math.round(size * 0.82));
            const tx = SC.util.text(g, ar, 0, h / 2 + 7 + 13 + gs * 0.95, gs, { font: "'Plex Arabic', sans-serif", weight: 700, fill: "#2E2C28", rtl: true });
            tx.setAttribute("stroke", "#F7F7F1"); tx.setAttribute("stroke-width", "7"); tx.setAttribute("stroke-linejoin", "round"); tx.setAttribute("paint-order", "stroke");
          }
          return c.node(g, o.parent);
        },
        // carte (rectangle à main levée + ombre)
        card(x, y, w, h, o = {}) {
          const g = el("g"); const C = SC.util.ctx(g, o.seed || Math.round(x * 3 + y), false, 1);
          el("path", { d: SC.util.rrect(x, y, w, h, 18), fill: "#D2D2CB", transform: "translate(7 9)" }, g);
          SC.util.shape(C, "card", SC.util.rrect(x, y, w, h, 18), o.yellow ? SC.MAT.yellow : SC.MAT.white, { sw: 3 });
          return c.node(g, o.parent);
        },
        title(text, x, y, size = 96, o = {}) {
          const lat = isLatin(text);
          const n = c.text(text, x, y, size, lat ? "de" : "ttl", o.anchor || "middle", o.parent);
          return n;
        },
        ar(text, x, y, size = 34, cls = "ar strong", parent) { return c.text(text, x, y, Math.max(40, Math.round(size * 1.3)), cls === "ar" ? "ar strong" : cls, "middle", parent); },
        // personnage qui marche de x0 à x1 (cycle de marche), puis pose finale
        walker(o) {
          const a = T(o.at), d = o.dur || 1.6;
          const n = k.person(0, 0, o.s, (t) => {
            const p = prog(t, a, d), moving = p > 0 && p < 1;
            const base = Object.assign({ outfit: o.outfit, seed: o.seed || 3, facing: o.x1 >= o.x0 ? 1 : -1, expr: o.expr || "neutral" }, o.extra || {});
            if (moving) return Object.assign(base, SC.Pose[o.run ? "run" : "walk"](((t - a) * (o.run ? 1.8 : 1.25)) % 1));
            const after = o.after ? o.after(t) : null;
            return Object.assign(base, p >= 1 ? (after || SC.Pose.stand) : (o.before || SC.Pose.stand), p >= 1 && o.endFacing ? { facing: o.endFacing } : {});
          }, o.parent);
          n.add((t, s) => { const p = clamp((t - a) / d, 0, 1); s.x += lerp(o.x0, o.x1, p); s.y += o.y; });
          return n;
        },
        // bulle de dialogue / pensée (style trait)
        bubble(o) { const g = el("g"); K.bubble(g, o); return c.node(g); },
      };
      return k;
    }

    /* ───────── SOCLE : carte de l'Allemagne (Berlin en repère) + épingle jaune ─────────
     * const geo = drawDE(c, 330, 860, 40, "b3"); const [x, y] = geo(lon, lat); pinAt(c, x, y, "b3@المدينة");  + m.ripple(x, y, …) */
    const DE = [[8.6,54.9],[9.4,54.8],[10.0,54.5],[10.9,54.05],[11.6,54.15],[12.3,54.3],[13.0,54.45],[13.6,54.6],[14.2,53.9],
      [14.4,53.3],[14.6,52.6],[14.7,51.8],[15.0,51.1],[14.3,50.9],[13.5,50.6],[12.6,50.4],[12.1,50.3],[12.5,49.8],[13.0,49.3],
      [13.8,48.8],[13.4,48.3],[13.0,47.6],[12.2,47.6],[11.3,47.4],[10.5,47.5],[9.7,47.6],[8.6,47.6],[7.6,47.6],[7.6,48.1],
      [8.2,48.97],[7.0,49.1],[6.4,49.5],[6.1,50.1],[6.0,50.8],[6.1,51.2],[5.9,51.8],[6.8,52.1],[7.0,52.6],[7.2,53.2],
      [7.0,53.6],[8.0,53.7],[8.5,53.5],[8.9,53.9],[8.8,54.3]];

    const geoAt = (MX, MY, KM) => (lon, lat) => [MX + (lon - 10.5) * 0.626 * KM, MY - (lat - 51.2) * KM];
    const drawDE = (c, MX, MY, KM, fade) => {
      const geo = geoAt(MX, MY, KM), map = el("g"); const C = U.ctx(map, 4242, false, 1);
      el("path", { d: "M" + DE.map((p) => geo(...p).map((v) => v + 7).join(" ")).join(" L") + " Z", fill: "#D2D2CB" }, map);
      U.shape(C, "de", "M" + DE.map((p) => geo(...p).join(" ")).join(" L") + " Z", MAT.grey, { sw: 3.2 });
      const [lx, ly] = geo(13.4, 52.52); el("circle", { cx: lx, cy: ly, r: 7, fill: INK }, map); U.text(map, "Berlin", lx, ly - 16, 24, { fill: "#55524B" });
      const n = c.node(map); if (fade) n.fade(fade, 0.3); return geo;
    };
    const pinAt = (c, x, y, at) => {
      const pin = el("g", { transform: `translate(${x} ${y})` }); const P = U.ctx(pin, 77, false, 1);
      el("ellipse", { cx: 0, cy: 2, rx: 14, ry: 5, fill: "rgba(28,26,28,.25)" }, pin);
      U.shape(P, "pin", "M0 0 C-6 -14 -24 -30 -24 -48 A24 24 0 1 1 24 -48 C24 -30 6 -14 0 0 Z", MAT.yellow, { sw: 3 });
      el("circle", { cx: 0, cy: -48, r: 9, fill: "#FFFFFF", stroke: INK, "stroke-width": 3 }, pin);
      return c.node(pin).slide(at, 0, -160, 0.4, "back").wobble(st.T(at) + 0.4, 0.5, 6);
    };

    /* ───────── SOCLE : aides Persona + motion design ───────── */
    const PE = Persona, PP = Persona.Pose, D = window.EpDecor, M = Motion;
    const blinkAt = (t, k) => { const q = (t + (k || 0) * 0.77) % 3.4; return q < 0.07 ? q / 0.07 : q < 0.14 ? (0.14 - q) / 0.07 : 0; };
    const talkAt = (t, a, b) => (t >= a && t < b ? (Math.floor(t / 0.11) % 3 === 0 ? 0.15 : 0.75) : 0);   // lèvres : seulement quand le personnage parle vraiment
    const rnd = (v, k = 20) => Math.round(v * k) / k;                                                     // arrondir les paramètres animés (moins de redessins)
    let c_ = null;                                                                                        // scène courante (à poser au début de chaque build)
    const pp = (x, y, s, fn, parent) => c_.sk((g, p) => PE.person(g, p), fn, x, y, s, 0, parent);         // personnage en pied
    const ph = (x, y, s, fn, rot) => c_.sk((g, p) => PE.head(g, p), fn, x, y, s, rot || 0);               // tête seule (gros plan, avatar)
    const breathe = (k) => (t, s) => { s.y += Math.sin(t * 2.6 + (k || 0)) * 2; };                        // respiration : node.on(breathe(1))
    const rl = (o, sc, pt) => [rnd((pt[0] - o[0]) / sc, 2), rnd((pt[1] - o[1]) / sc, 2)];                 // point monde -> repère du personnage (reachL / reachR)
    const walkTo = (base, t, a, d, facing) => Object.assign({}, base, prog(t, a, d) > 0 && prog(t, a, d) < 1 ? PP.walk(rnd((((t - a) * 1.7) % 1 + 1) % 1, 16)) : PP.stand, prog(t, a, d) > 0 && prog(t, a, d) < 1 ? { view: "side", facing } : {});

    /* ───────── DISTRIBUTION — À REMPLACER : personnages NEUFS (jamais ceux d'un autre épisode) ───────── */
    const DOC = { look: "woman", hair: "bob", hairTone: "dark", outfit: "coat", seed: 11 };

    /* ═══════ 1 · ACCROCHE — À REMPLACER : la sanction chiffrée, décor complet, mouvement fort dès la 1re image ═══════ */
    st.scene({ from: 0, in: "cut", inDur: 0, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const m = M.of(c);
      c.camera([{ at: 0, s: 1.0, cx: 540, cy: 860 }, { at: "b2@end", s: 1.03, cx: 540, cy: 860, ease: "lin" }]);   // poussée lente continue
      const lamp = m.obj(D.exemple, 540, 300, 1); m.build(lamp, 0.05, "drop", { dist: 160, dur: 0.45 }); m.pend(lamp, 0.5, 5, [540, 300], { idle: 1.2 });
      pp(0, 0, 1.1, (t) => Object.assign({}, DOC, PP.stand, { view: "three-quarter", facing: 1, expr: t < T("b2") ? "worried" : "shock", blink: rnd(blinkAt(t, 1)) }))
        .on((t, s) => { s.x += 540; s.y += 1300; }).on(breathe(1));
      k.chip("Geldstrafe", "غرامة", 540, 470, 40, { yellow: true }).pop("b1", 0.3);
      c.kick("b2", 0.06);
    } });

    /* ═══════ 2 · INTRO DE L'AUTEUR — SOCLE pour les éléments (photo, anneau, Instagram, « Yassine », @dr.aguilo, j'aime,
     *  s'abonner, summary:false) ; le CADRE autour (tableau de garde, badge, téléphone, plaque, polaroïd…) est propre à l'épisode ═══════ */
    st.scene({ from: "i1", in: "iris", inDur: 0.3, summary: false, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      c.camera([{ at: "i1", s: 1.05, cx: 540, cy: 820 }, { at: "i2", s: 1.0, cx: 540, cy: 860, d: 0.5 }]);
      const m = M.of(c); m.rays(540, 600, { op: 0.15, R: 560, speed: 6, at: "i1" });
      const ph = el("g"), C = U.ctx(ph, 88, false, 1);
      const cp = el("clipPath", { id: "clipPortrait" }, el("defs", {}, ph)); el("circle", { cx: 0, cy: 0, r: 208 }, cp);
      el("circle", { cx: 9, cy: 12, r: 236, fill: "#D2D2CB" }, ph);
      U.shape(C, "ring", "M-236 0 A236 236 0 1 1 236 0 A236 236 0 1 1 -236 0", MAT.yellow, { sw: 4 });
      el("image", { href: "assets/portrait.png", x: -210, y: -210, width: 420, height: 420, "clip-path": "url(#clipPortrait)", preserveAspectRatio: "xMidYMid slice" }, ph);
      U.shape(C, "ring1", "M-209 0 A209 209 0 1 1 209 0 A209 209 0 1 1 -209 0", {}, { sw: 5.5 });
      U.stroke(C, "dash", "M-150 -196 C -90 -232, 60 -236, 140 -200", { sw: 3, stroke: "#FFFFFF" });
      // badge Instagram dessiné, accroché au cadre
      const ig = el("g", { transform: "translate(160 160)" }, ph), I = U.ctx(ig, 89, false, 1);
      el("path", { d: U.rrect(-46, -46, 92, 92, 26), fill: "#D2D2CB", transform: "translate(5 6)" }, ig);
      U.shape(I, "sq", U.rrect(-46, -46, 92, 92, 26), MAT.white, { sw: 4.2 });
      U.shape(I, "c", "M-19 0 A19 19 0 1 1 19 0 A19 19 0 1 1 -19 0", MAT.yellow, { sw: 4.2 });
      el("circle", { cx: 25, cy: -25, r: 6, fill: INK }, ig);
      c.node(ph).on((t, s) => { s.x += 540; s.y += 600; }).pop("i1", 0.4);
      k.ribbon("Yassine", 540, 905, { size: 60 }).wipe("i1@ياسين", 0.35);
      const hd = el("g"), H = U.ctx(hd, 90, false, 1);
      U.shape(H, "sq", U.rrect(-21, -21, 42, 42, 12), MAT.white, { sw: 3 }); U.stroke(H, "c", "M-9 0 A9 9 0 1 1 9 0 A9 9 0 1 1 -9 0", { sw: 3 }); el("circle", { cx: 12, cy: -12, r: 3, fill: INK }, hd);
      c.node(hd).on((t, s) => { s.x += 410; s.y += 996; }).pop("i1@ياسين+0.15", 0.3);
      c.text("@dr.aguilo", 560, 1012, 46, "de").fade("i1@ياسين+0.15", 0.3);
      k.chip("Arzt in Deutschland", "طبيب فألمانيا", 540, 1078, 26).pop("i1@فألمانيا").hide("i2@حقيقية", 0.15);
      k.chip("echte Fälle · deutsche Gerichte", "قصص حقيقية من المحاكم", 540, 1078, 26, { yellow: true }).pop("i2@حقيقية+0.15").hide("i3", 0.15);
      // j'aime + s'abonner
      const la = T("i3@j'aime"), fa = T("i3@abonne");
      c.sk((g, p) => PE.props.heart(g, { size: 1.25, fill: p.on, beat: p.b }), (t) => ({ on: t >= la, b: rnd(Math.sin(Math.min(1, prog(t, la, 0.35)) * Math.PI), 10) }), 330, 1185, 1).pop("i3", 0.3);
      c.text("j'aime", 330, 1258, 30, "de").pop("i3", 0.3);
      c.sk((g, p) => {
        while (g.firstChild) g.removeChild(g.firstChild);
        const B = U.ctx(g, 91, false, 1);
        el("path", { d: U.rrect(-150, -42, 300, 84, 22), fill: "#D2D2CB", transform: "translate(6 7)" }, g);
        U.shape(B, "btn", U.rrect(-150, -42, 300, 84, 22), p.on ? MAT.yellow : MAT.white, { sw: 3.4 });
        U.text(g, p.on ? "✓ abonné" : "+ s'abonner", 0, 14, 40, {});
      }, (t) => ({ on: t >= fa }), 640, 1190, 1).pop("i3+0.1", 0.3);
      c.kick(la, 0.05); c.kick(fa, 0.05);
    } });

    /* ═══════ 3 · CARTE — exemple (À ADAPTER : forme propre à l'épisode, voir SAISON-2.md) ═══════ */
    st.scene({ from: AFTER_INTRO, in: "iris", inDur: 0.3, build(c) {
      const k = kit(c); k.bg(); c_ = c;
      const m = M.of(c); m.shapes({ seed: 5 });
      const geo = drawDE(c, 330, 860, 40, AFTER_INTRO), [x, y] = geo(6.96, 50.94);
      pinAt(c, x, y, AFTER_INTRO + "+0.4"); m.ripple(x, y, T(AFTER_INTRO) + 0.8);
      k.chip("Köln", "كولونيا", x + 150, y - 40, 34).pop(AFTER_INTRO + "+0.6");
      c.camera([{ at: AFTER_INTRO, s: 1.0, cx: 540, cy: 860 }, { at: AFTER_INTRO + "+0.5", s: 1.25, cx: x + 80, cy: y, d: 0.6 }]);
    } });

    /* ═══════ … SCÈNES DE L'ÉPISODE — À ÉCRIRE (une idée par scène, décor qui se construit puis qui vit) ═══════ */

    /* ───────── SOCLE : HUD — barre de progression + logo (masqué pendant l'intro) ───────── */
    {
      const progEl = document.getElementById("prog"), bar = progEl.firstElementChild, total = T(LAST + "@end"), endT = total + 0.15;
      const brand = document.getElementById("brand");
      sv.hooks.push((t) => {
        progEl.style.opacity = t > 0.2 && t < endT ? "1" : "0";
        bar.style.width = (100 * clamp(t / total, 0, 1)).toFixed(2) + "%";
        const intro = t >= T("i1") - 0.1 && t < T(AFTER_INTRO) - 0.1;
        brand.style.opacity = intro ? "0" : (t < 0.25 ? t / 0.25 : t < endT ? 1 : Math.max(0, 1 - (t - endT) / 0.3)).toFixed(3);
      });
    }

    /* ───────── SOCLE : affiche-résumé + question ÉCRITE (jamais dite) + teaser ─────────
     * cols / top / side selon le nombre de scènes (AKTE 02 : 18 cases, 6 colonnes) ; la grille finit avant la carte « commentaire ». */
    st.flash(LAST + "@end+0.15", 0.35, 0.85);
    st.summary({ at: LAST + "@end+0.15", in: "cut", dezoomAt: LAST + "@end+0.5", cols: 6, crop: [230, 1310], top: 372, gap: 10, side: 92,
      below(c, cells) {
        SketchUI.dots(c);
        const k = kit(c);
        k.ribbon("AKTE " + AKTE_NO + " · " + TITRE, 540, 312, { size: 36, w: 470 });
        k.chip("@dr.aguilo", null, 180, 312, 20);
        k.chip("AKTE " + AKTE_NEXT + " · قريبا", null, 885, 312, 18, { yellow: true });
        cells.forEach((cell) => {
          const g = el("g");
          el("path", { d: SC.util.rrect(cell.x, cell.y, cell.w, cell.h, 14), fill: "#D2D2CB", transform: "translate(6 8)" }, g);
          el("path", { d: SC.util.rrect(cell.x, cell.y, cell.w, cell.h, 14), fill: "#F7F7F1" }, g);
          c.node(g);
        });
      },
      above(c, cells) {
        const k = kit(c);
        k.card(110, 960, 760, 300, { seed: 990 }).pop(LAST + "@end+2.7", 0.4);
        k.ar(QUESTION, 490, 1060, 36, "ttl").wipe(LAST + "@end+2.8", 0.6, "rtl");
        k.ar("كتب ليا فالكومنتير", 490, 1170, 32, "ar strong").wipe(LAST + "@end+3.2", 0.5, "rtl");
        c.put(`<path d="M780 1150 C 860 1150, 900 1160, 918 1196 M896 1186 L918 1196 L922 1172" stroke="#1C1A1C" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).wipe(LAST + "@end+3.4", 0.4);
        cells.forEach((cell) => {
          const g = el("g"); const C = SC.util.ctx(g, 950 + cell.i, false, 1);
          SC.util.shape(C, "o", SC.util.rrect(cell.x, cell.y, cell.w, cell.h, 14), {}, { sw: 3 });
          SC.util.shape(C, "b", SC.util.rrect(cell.x + cell.w - 46, cell.y + 8, 38, 38, 19), SC.MAT.yellow, { sw: 2.4 });
          SC.util.text(g, String(cell.i + 1), cell.x + cell.w - 27, cell.y + 35, 22, {});
          c.node(g);
        });
      } });

    st.finish(0.3);
  };
})();
