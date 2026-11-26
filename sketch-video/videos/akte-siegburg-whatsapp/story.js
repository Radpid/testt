/* AKTE 07 — « الگروپ » (ArbG Siegburg, 22.05.2026, 1 Ca 1741/25) — socle, distribution, HUD et affiche.
 * Copie du gabarit (videos/_gabarit/story.js). Les blocs « SOCLE » appliquent le skill et ne changent pas :
 *   kit (rubans, pastilles avec arabe détaché, cartes), carte de l'Allemagne + épingle, aides Persona,
 *   HUD (barre de progression + logo masqué pendant l'intro), affiche-résumé finale.
 * PROPRE à l'épisode (storyboard.md) : la distribution (§ 1), les constantes du téléphone et les aides des scènes ÉCRAN
 *   (X.aides : TEL, VERT, MEMBRES, punch, buzz, defileur, semisY, zoomTel, decoupe — « Conventions » du storyboard),
 *   les décors (decor.js, decor-2.js, decor-3.js) et les scènes (scenes-1.js … scenes-4.js).
 * Trois familles de scènes : ÉCRAN (tout dans c.hud, pixels exacts de la vidéo), PIÈCE (c.cam, cadrage global habituel),
 *   PAPIER (c.cam, scène déclarée avec view: false). Le cadrage global reste donc celui du gabarit.
 * Zones Instagram : contenu entre x 90 et 990 (décor entre 110 et 960) ; rien d'important au-dessus de y 250, sous y 1470,
 * ni dans la colonne des boutons (x > 915, y 980–1650).
 */
(function () {
  "use strict";
  const AKTE_NO = "07", AKTE_NEXT = "08", TITRE = "الگروپ";            // numéro PROVISOIRE : il n'apparaît qu'ici (et dans le teaser de l'affiche)
  const QUESTION = "الگروپ ديال الخدمة ديالكم: privé ولا خدمة؟";        // question ÉCRITE de l'affiche (jamais dite) — scenario.md « Fin »
  const QUESTION_LIGNES = ["الگروپ ديال الخدمة ديالكم:", "privé ولا خدمة؟"];   // la même, coupée en deux lignes pour l'affiche (storyboard, scène 22)
  const GROS_MOT = true;   // false : « … mein WE eh im A… war … » (ligne L6 du message et sa pastille) — décision de l'auteur (storyboard § 7, R17)
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

    /* ───────── DISTRIBUTION (storyboard § 1) — personnages NEUFS, paramètres Persona EXACTS ─────────
     * Les scènes y ajoutent pose, tenue du moment, expression, regard. Dans cet épisode : elle seule est blonde, lui seul est bouclé.
     * talk : 0 pour tout le monde, sauf ELLE en b14 et JUG en b15 (§ 1.5). Écrire un message n'est pas parler. */
    const CAST = {
      ELLE: { look: "woman", hair: "longwave", hairTone: "blond", glasses: false, outfit: "coat", seed: 701 },                        // la Stationsärztin (l'expéditrice) — coat partout
      LUI: { look: "man", hair: "shortcurly", hairTone: "brown", beard: "stubble", glasses: false, outfit: "sweater", seed: 702 },    // le médecin en formation — sweater (salon, sc. 6) ; outfit: "jacket" au départ (sc. 14)
      K1: { look: "woman", hair: "bun", hairTone: "brown", glasses: false, seed: 711 },                                               // les sept collègues du groupe : têtes seules (avatars)
      K2: { look: "man", hair: "bald", hairTone: "dark", beard: "short", glasses: true, seed: 712 },
      K3: { look: "woman", hair: "bob", hairTone: "brown", glasses: false, seed: 713 },
      K4: { look: "man", hair: "short", hairTone: "dark", beard: "moustache", glasses: false, seed: 714 },
      K5: { look: "oldwoman", hair: "short", hairTone: "grey", glasses: true, seed: 715 },
      K6: { look: "man", hair: "crown", hairTone: "brown", beard: "stubble", glasses: true, seed: 716 },
      K7: { look: "woman", hair: "short", hairTone: "dark", glasses: false, seed: 717 },
      JUG: { look: "woman", hair: "bun", hairTone: "dark", glasses: true, outfit: "robe", seed: 761 },                                // la présidente de la chambre (seule en robe)
      AS1: { look: "oldman", hair: "crown", hairTone: "dark", beard: "short", glasses: false, outfit: "sweater", seed: 762 },         // assesseur (côté salariés), en civil
      AS2: { look: "oldwoman", hair: "ponytail", hairTone: "grey", glasses: false, outfit: "suit", seed: 763 },                       // assesseure (côté employeurs), en civil
    };
    // Sans visage (dessins de decor*.js, pas Persona) : D.avatarSil (la collègue des urgences), D.avatarPatient, D.avatarToi, D.sceau (le tribunal dans le fil).

    /* ───────── AIDES DES SCÈNES ÉCRAN (storyboard « Conventions ») — écrites UNE fois ici, lues par toutes les parties ─────────
     * Une scène ÉCRAN dessine tout dans c.hud : c.camera / c.kick / c.shake n'y font rien → punch (coup de zoom) et buzz (vibreur)
     * sur le nœud-groupe du téléphone. Les nœuds de Motion (m.obj, m.speech, m.typing, m.dust, m.rays…) naissent dans c.cam :
     * les re-parenter aussitôt (parent.appendChild(noeud.g)). */
    const TEL = D.TEL, VERT = D.VERT;                                                   // constantes du téléphone et teinte de l'épisode (decor.js)
    const MEMBRES = ["ELLE", "LUI", "K1", "K2", "K3", "K4", "K5", "K6", "K7"];          // les neuf membres du groupe, dans l'ordre de la rangée (scène 5)
    const punch = (n, at, amt = 0.04, dur = 0.5) => { const a = T(at); n.on((t, s) => { const p = prog(t, a, dur);
      if (p > 0 && p < 1) { s.px = 525; s.py = 860; s.s *= 1 + amt * (p < 0.18 ? E.out(p / 0.18) : 1 - E.inOut((p - 0.18) / 0.82)); } }); return n; };
    const buzz = (n, at, amp = 8, dur = 0.38) => { const a = T(at); n.on((t, s) => { const p = prog(t, a, dur);   // le vibreur
      if (p > 0 && p < 1) { s.x += Math.sin((t - a) * 150) * amp * (1 - p); s.px = 525; s.py = 860; s.r += Math.sin((t - a) * 120) * 0.45 * (1 - p); } }); return n; };
    // défilement du fil : position de départ y0 + sauts amortis { at, dy, d } ; le glissement continu est celui du SEMIS
    const defileur = (y0, sauts) => (t) => y0 + sauts.reduce((y, k) => y + k.dy * E.out(prog(t, T(k.at), k.d || 0.35)), 0);
    const semisY = (t0, stop = 1e9) => (t) => ((Math.min(t, stop) - t0) * 6) % 240;     // motif de 240 px de haut, répété (D.semis)
    // plongée dans le téléphone (ou sortie, avec sortie = true) : le nœud passe de (x0, y0, échelle k0) à sa place (525, 860, 1)
    const zoomTel = (n, at, x0, y0, k0 = 0.072, dur = 0.4, sortie = false) => { const a = T(at); n.on((t, s) => {
      const e = sortie ? 1 - E.inOut(prog(t, a, dur)) : E.out(prog(t, a, dur));
      s.px = 525; s.py = 860; s.s *= lerp(k0, 1, e); s.x += (x0 - 525) * (1 - e); s.y += (y0 - 860) * (1 - e); }); return n; };
    // découpe animée de la page (T-NOTIF) — NE PAS utiliser Node.wipe sur la page : son inset() se mesure sur la boîte englobante,
    // qui déborde dès que le fil défile. id unique par scène ("pg" + numéro) ; at = null : découpe pleine dès le début.
    const decoupe = (c, id, at, dur = 0.32) => { const cp = el("clipPath", { id }, st.defs), r = el("rect", { x: 172, y: 302, width: 706, height: 1082, rx: 42 }, cp);
      if (at != null) { const a = T(at); c.tick((t) => r.setAttribute("height", Math.max(0.01, 1082 * E.out(prog(t, a, dur))).toFixed(1))); } return `url(#${id})`; };

    /* ───────── SCÈNES : elles sont écrites dans scenes-1.js … scenes-4.js (une partie de l'épisode par fichier) ─────────
     * Chaque fichier fait : (window.EP_PARTS = window.EP_PARTS || []).push(function (X) { … X.st.scene({ … }) … });
     * X = tout le socle ci-dessus. Dans une scène : const k = X.use(c);  (pose la scène courante pour pp / ph et rend le kit).
     * X.lieux = mises en place FIXES partagées entre les parties (ex. X.lieux.chambre = (c, o) => { … }). */
    const X = { sv, st, T, E, prog, lerp, clamp, el, isLatin, SC, K, U, MAT, INK, W, NS, PE, PP, D, M,
      kit, drawDE, geoAt, pinAt, blinkAt, talkAt, rnd, pp, ph, breathe, rl, walkTo,
      CAST, BEAT_IDS, LAST, AFTER_INTRO, AKTE_NO, AKTE_NEXT, TITRE, QUESTION, QUESTION_LIGNES, GROS_MOT,
      lieux: {}, aides: { TEL, VERT, MEMBRES, punch, buzz, defileur, semisY, zoomTel, decoupe },
      use(c) { c_ = c; return kit(c); } };
    (window.EP_PARTS || []).forEach((part) => part(X));

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
