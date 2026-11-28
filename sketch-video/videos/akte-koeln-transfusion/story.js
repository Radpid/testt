/* AKTE 04 — « 63 ساعة » (AG Köln, 16.05.2012, 613 Ls 3/12) — socle, distribution, HUD, affiche. Numéro PROVISOIRE (AKTE_NO, un seul endroit).
 * Référence pour l'image : storyboard.md (il fait foi). Texte dit et minutage : beats.js / timings.js (figés, PROVISOIRES jusqu'à la voix).
 * Les blocs « SOCLE » viennent du gabarit de la série (kit, carte, aides Persona, HUD de base, affiche) et ne changent pas.
 * Décors : decor.js, decor-2.js, decor-3.js (window.EpDecor) ; scènes : scenes-1.js … scenes-4.js (window.EP_PARTS).
 * Conventions de l'épisode (storyboard § Conventions) : caméra par défaut { s: 1, cx: 540, cy: 920 }, cadrage global
 *   view { s: 1.06, oy: -20, breathe: 0.04 } ; décor entre x 110 et 960 ; bande HUD (écran) y 262–356 : compteur x 112–468, onglet du jour
 *   x 700–962 ; UNE pastille à la fois, centrée (540, 450), dans c.hud ; citations « laut Urteil » : .tw 20 px à y 1372 + arabe gras 28 px
 *   à y 1412 (x 120–900) ; talk: 0 pour tous, AUCUNE bulle ; rouge sang #B5332D / #8E1F1C sur le sang seulement ; aucun bleu.
 * Repères numériques : un mot fait seulement de chiffres se vise par son RANG (b6@2 = « 63 », jamais b6@63) — storyboard § 6.
 * Zones Instagram : contenu entre x 90 et 990 ; rien d'important au-dessus de y 250, sous y 1470, ni dans la colonne des boutons
 * (x > 915, y 980–1650).
 */
(function () {
  "use strict";
  const AKTE_NO = "04", AKTE_NEXT = "05", TITRE = "63 ساعة";            // numéro PROVISOIRE : il n'apparaît qu'ici (et dans le teaser de l'affiche)
  // question ÉCRITE de l'affiche (jamais dite) — scenario.md « Fin » ; le storyboard (scène 26) la pose en DEUX lignes : QUESTION_LIGNES
  const QUESTION = "شحال من ساعة خدمتي فأطول سيمانة ديالك؟";
  const QUESTION_LIGNES = ["شحال من ساعة خدمتي", "فأطول سيمانة ديالك؟"], QUESTION_SUITE = "كتب ليا الرقم فالكومنتير";
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
          let tx = null, band = null;
          if (ar) {   // traduction arabe : bien détachée de la pastille (et de son ombre), avec un contour papier pour rester lisible
            const gs = Math.max(26, Math.round(size * 0.82));
            tx = SC.util.text(g, ar, 0, h / 2 + 7 + 13 + gs * 0.95, gs, { font: "'Plex Arabic', sans-serif", weight: 700, fill: "#2E2C28", rtl: true });
            tx.setAttribute("stroke", "#F7F7F1"); tx.setAttribute("stroke-width", "7"); tx.setAttribute("stroke-linejoin", "round"); tx.setAttribute("paint-order", "stroke");
            // pastille du HUD : bande de papier derrière l'arabe (ma revue : le bord du tableau de service traversait « الإدارة ديال السبيطار »)
            if (o.parent && o.parent === c.hud && o.band !== false) { band = el("rect", { fill: "#F7F7F1", opacity: 0.92, rx: 8, width: 0, height: 0 }); g.insertBefore(band, tx); }
          }
          const n = c.node(g, o.parent);
          if (band) { let done = false; n.add(() => {
            if (done || (document.fonts && document.fonts.status !== "loaded")) return;
            let b = null; try { b = tx.getBBox(); } catch (e) { return; }
            if (!b || b.width < 2) return;
            band.setAttribute("x", (b.x - 10).toFixed(1)); band.setAttribute("y", (b.y - 1).toFixed(1)); band.setAttribute("width", (b.width + 20).toFixed(1)); band.setAttribute("height", (b.height + 4).toFixed(1)); done = true;
          }); }
          return n;
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
     * Les scènes y ajoutent la pose, la tenue du moment, l'expression. talk: 0 pour tous, tout le temps (aucun dialogue sourcé).
     *   DOC  l'Assistenzärztin (héroïne) : cheveux courts châtains. Tenue par scène : tribunal (1, 2, 17–20) "sweater" ; hôpital (6–12)
     *        "coat" + badge: " " (badge jaune SANS nom) ; effondrement et bureau (14, 15) "scrubs" (obligatoire assise par terre) ; les mois (16) "sweater".
     *        Échelle 1,0 en pied (0,92 sur la frise, 0,95 dans la chambre, 1,05 au passe-plat et derrière la barre). Fatigue f(t) + D.cernes (scènes 6–12).
     *   PAT  le patient, 63 ans : toujours ASSIS dans le lit vu de face (scènes 11–13), échelle 1,0.
     *   JUG  le juge (robe), SCF la Schöffin, SCM le Schöffe (en civil) : échelle 0,8, derrière le banc ; aucun ne parle, ne pointe, ne se lève.
     *   EXP  l'expert (scène 17 seulement), assis de profil, échelle 0,85.
     *   TOI  « toi », le spectateur (scènes 22–24), échelle 0,95 — ce n'est PAS l'héroïne.
     * Sans visage (décor, pas Persona) : le labo (ombre derrière la vitre), l'administration (fauteuil de dos + manche), le parquet (carte tapée). */
    const CAST = {
      DOC: { look: "woman",    hair: "short",      hairTone: "brown", beard: "none",      glasses: false, seed: 401 },
      PAT: { look: "oldman",   hair: "shortcurly", hairTone: "grey",  beard: "moustache", glasses: false, outfit: "casual", seed: 402 },
      JUG: { look: "oldman",   hair: "bald",       hairTone: "grey",  beard: "short",     glasses: false, outfit: "robe",    seed: 403 },
      SCF: { look: "oldwoman", hair: "longwave",   hairTone: "grey",  beard: "none",      glasses: false, outfit: "sweater", seed: 404 },
      SCM: { look: "man",      hair: "short",      hairTone: "blond", beard: "none",      glasses: true,  outfit: "jacket",  seed: 405 },
      EXP: { look: "man",      hair: "crown",      hairTone: "brown", beard: "none",      glasses: true,  outfit: "suit",    seed: 406 },
      TOI: { look: "man",      hair: "shortcurly", hairTone: "dark",  beard: "stubble",   glasses: true,  outfit: "coat", badge: " ", seed: 407 },
    };
    const TENUE = {   // tenue de l'héroïne selon le lieu (storyboard § 1.1) : Object.assign({}, CAST.DOC, TENUE.hopital, …)
      tribunal: { outfit: "sweater" }, hopital: { outfit: "coat", badge: " " }, sol: { outfit: "scrubs" }, mois: { outfit: "sweater" },
    };

    /* ───────── AKTE 04 : AIDES partagées par les scènes (storyboard « Conventions », § 1.1, § 3, scènes 1, 6, 18–20) — X.aides ─────────
     * Toutes sont des fonctions pures du temps (aucun état caché). Repères : jamais « @63 » etc. (rangs : storyboard § 6). */
    const INK_ = "#1C1A1C", YEL_ = "#F8CE4E", PAPER_ = "#F7F7F1";
    const halo = (n, w) => { const t = n.textEl || n; t.setAttribute("stroke", PAPER_); t.setAttribute("stroke-width", w || 6); t.setAttribute("stroke-linejoin", "round"); t.setAttribute("paint-order", "stroke"); return n; };
    // fatigue f(t) de l'héroïne (§ 1.1) : 0,15 (b6) → 0,35 (b7) → 0,55 (b8) → 0,65 (b9–b10) → 0,75 (b11) → 0,85 (b12) → 0,9 (b13) → 1 (b15)
    const FAT = [["b6", 0.15], ["b7", 0.35], ["b8", 0.55], ["b9", 0.65], ["b11", 0.75], ["b12", 0.85], ["b13", 0.9], ["b15", 1]].map(([b, v]) => [T(b), v]);
    const fat = (t) => { let v = 0, prev = 0; for (const [a, k] of FAT) { if (t < a) break; v = lerp(prev, k, E.inOut(prog(t, a, 0.5))); prev = k; } return v; };
    // effets de la fatigue sur des paramètres Persona (paupières lourdes, sueur, buste et tête qui tombent ; o.arms : bras qui pendent)
    const tired = (t, p, o) => {
      const k = o && o.f != null ? o.f : fat(t), q = Object.assign({}, p);
      q.blink = rnd(Math.max(p.blink || 0, 0.1 + 0.3 * k), 20); q.sweat = p.sweat || k > 0.5;
      q.torsoLean = rnd((p.torsoLean || 0) + 5 * k, 4); q.headTilt = rnd((p.headTilt || 0) + 6 * k, 4); q.cernes = rnd(k, 10);
      if (o && o.arms) { q.armL = [-3, 6]; q.armR = [3, -6]; }
      return q;
    };
    // Persona + cernes (D.cernes sur les yeux, opacité p.cernes) dans le MÊME groupe : elles suivent la tête quoi qu'il arrive
    const ppC = (x, y, s, fn, parent) => c_.sk((g, p) => { const a = PE.person(g, p); if (p.cernes > 0.02 && a && a.eyes) D.cernes(g, { eyes: a.eyes, k: p.cernes }); return a; }, fn, x, y, s, 0, parent);
    // o.bust (revue visuelle) : D.bust04 dessiné par-dessus le bas du cou — la tête en gros plan ne flotte plus sur le papier (scènes 10, 23)
    const phC = (x, y, s, fn, bust) => c_.sk((g, p) => { const h = bust ? el("g", {}, g) : g; const a = PE.head(h, p); if (p.cernes > 0.02 && a && a.eyes) D.cernes(h, { eyes: a.eyes, k: p.cernes });
      if (bust) D.bust04(el("g", {}, g), bust); return a; }, fn, x, y, s, 0);
    /* personnage ASSIS DANS LE LIT (le patient, vue de face) : Persona n'a pas d'option pour cacher les jambes ; sans elles, ses pieds
     * dépassaient sous le lit entre les roulettes. On retire du dessin les deux jambes (aplat + trait + chaussure, dessinées en premier
     * en vue de face : les deux groupes « chaussure » portent un transform rotate(…) scale(…)). Si la structure change, rien n'est retiré. */
    const noLegs = (g) => {
      const root = g.firstElementChild; if (!root) return;
      const kids = Array.from(root.children), shoe = kids.map((n, i) => (n.tagName === "g" && /rotate\(.*scale\(/.test(n.getAttribute("transform") || "") ? i : -1)).filter((i) => i >= 0);
      if (shoe.length < 2) return;
      const per = shoe[1] - shoe[0], a = shoe[0] - (per - 1);
      if (a < 0 || per < 2 || per > 3) return;
      for (let i = shoe[1]; i >= a; i--) root.removeChild(kids[i]);
    };
    const ppBed = (x, y, s, fn, parent) => c_.sk((g, p) => { const a = PE.person(g, p); noLegs(g); return a; }, fn, x, y, s, 0, parent);
    // marche sans glissade : phase = distance ÷ foulée (292 px à l'échelle 1) ; elle décroît quand on recule (marche à reculons, scène 2)
    const stride = (dx, s, facing) => ((((facing || 1) * dx) / (292 * (s || 1))) % 1 + 1) % 1;
    /* personnage qui suit un trajet keys = [[repère, x], …] (vitesse constante entre deux clés), cycle Pose.walk calé sur la distance.
     * o = { keys, y, s, base(t) → paramètres (tenue, expression…), stop(t) → pose à l'arrêt (défaut Pose.stand), facing (forcé : marche à
     * reculons) , parent, cernes: true (ppC) } → nœud ; node.xAt(t) */
    const walker = (o) => {
      const K = o.keys.map(([a, x]) => [T(a), x]);
      const xAt = (t) => { if (t <= K[0][0]) return K[0][1]; for (let i = 1; i < K.length; i++) if (t < K[i][0]) return lerp(K[i - 1][1], K[i][1], (t - K[i - 1][0]) / Math.max(1e-6, K[i][0] - K[i - 1][0])); return K[K.length - 1][1]; };
      const dir = (t) => { for (let i = 1; i < K.length; i++) if (t >= K[i - 1][0] && t < K[i][0] && K[i][1] !== K[i - 1][1]) return Math.sign(K[i][1] - K[i - 1][1]); return 0; };
      const draw = o.cernes ? ppC : pp;
      const n = draw(0, 0, o.s, (t) => {
        const x = xAt(t), d = dir(t), base = o.base ? o.base(t) : {};
        if (d) { const fc = o.facing || d; return Object.assign({}, base, PP.walk(rnd(stride(x - K[0][1], o.s, fc), 16)), { view: "side", facing: fc }); }
        return Object.assign({}, base, o.stop ? o.stop(t) : PP.stand);
      }, o.parent);
      n.on((t, s) => { s.x += xAt(t); s.y += o.y; }); n.xAt = xAt;
      return n;
    };
    // les 21 colonnes de la frise (scène 6) et le compteur du HUD : même horloge (intervalle = durée ÷ 21, 0,07 s par colonne)
    const COL_A = T("b6@شي") + 0.05, COL_E = T("b6@وحدة") - 0.05, COL_STEP = (COL_E - COL_A) / 21;
    const colStart = (i) => COL_A + i * COL_STEP;
    const hours = (t) => { let v = 0; for (let i = 0; i < 21; i++) v += 3 * clamp((t - colStart(i)) / 0.07, 0, 1); return v; };   // 0 → 63
    /* la balance (scènes 1, 2 et 17 en petit, 18, 19, 20) : inclinaison = cible(t) − Σ Δᵢ·e^(−3,2 u)·cos(9 u) + 0,5·sin(1,3 t)
     * (le rebond part de l'ancienne valeur : 0 → 13 culmine vers 17) ; les plateaux : 1,5·sin(1,7 t + φ) + 0,3 × le rebond (+ sursaut du
     * plateau droit à b1@صفر) ; tout s'immobilise entre b24@يعني et b24@كافي (fléau à l'horizontale). */
    const TILT = [
      { a: T("b1@بالغلطة") + 0.02, v: 13, k: "bounce" }, { a: T("b3@نرجعو") + 0.2, v: 0, k: "ease" }, { a: T("b21"), v: 13, k: "set" },
      { a: T("b22@يعني"), v: 10.5, k: "bounce" }, { a: T("b22@غلطة"), v: 8, k: "bounce" }, { a: T("b22@كبيرة"), v: 5.5, k: "bounce" },
      { a: T("b22@التنظيم"), v: 3, k: "bounce" }, { a: T("b24@كتبت"), v: 2, k: "bounce" }, { a: T("b24@genug"), v: 1, k: "bounce" },
      { a: T("b24@bestraft"), v: 0, k: "bounce" }];
    const SETTLE_A = T("b24@يعني"), SETTLE_B = T("b24@كافي"), STRAFE_KICK = T("b1@حبس"), HOLD_A = T("b3@علاش");
    // amplitude de la « vie » du décor (b3@علاش : l'image retient son souffle 0,3 s)
    const calm = (t) => 1 - 0.8 * (t >= HOLD_A && t < HOLD_A + 0.45 ? Math.sin(Math.PI * clamp((t - HOLD_A) / 0.45, 0, 1)) : 0);
    const tilt = (t) => {
      let target = 0, prev = 0, b = 0;
      for (const q of TILT) {
        if (t < q.a) break; const u = t - q.a, d = q.v - prev;
        if (q.k === "ease") target = lerp(prev, q.v, E.inOut(prog(t, q.a, 0.35)));
        else { target = q.v; if (q.k === "bounce") b += -d * Math.exp(-3.2 * u) * Math.cos(9 * u); }
        prev = q.v;
      }
      const set = 1 - E.inOut(prog(t, SETTLE_A, Math.max(0.2, SETTLE_B - SETTLE_A))), v = calm(t) * set;
      const kick = t >= STRAFE_KICK ? 4 * Math.exp(-3 * (t - STRAFE_KICK)) * Math.cos(8 * (t - STRAFE_KICK)) : 0;
      // les plateaux suivent le rebond avec retard : 0,3 × le rebond (≈ ±4° au plus fort ; « 3 × » du storyboard faisait ±39°)
      return { tilt: rnd(target + b * (t >= SETTLE_B ? 0 : 1) + 0.5 * Math.sin(1.3 * t) * v, 20), swL: rnd(1.5 * Math.sin(1.7 * t) * v + 0.3 * b * set, 10),
        swR: rnd(1.5 * Math.sin(1.7 * t + 1.3) * v + 0.3 * b * set + kick, 10), bounce: b };
    };
    const geomAt = (t, x, y, s) => D.scaleGeom(tilt(t), x, y, s);
    // monde → écran (storyboard § 3.1) : sc = la scène, p = point monde → [x, y, échelle]
    const toScreen = (sc, t, p) => {
      const c = sc.camAt(t), V = st.view, life = isFinite(sc.end) ? Math.max(1, sc.end - sc.start) : 4;
      const k = c.s * V.s * (1 + V.breathe * E.inOut(clamp((t - sc.start) / life, 0, 1))) * sc.kickAt(t);
      return [540 + (p[0] - c.cx) * k, 960 + V.oy + (p[1] - c.cy) * k, k];
    };
    const sceneAt = (t) => { let best = null; for (const sc of st.scenes) if (sc.def.view !== false && sc.start <= t && t < sc.end && (!best || sc.start > best.start)) best = sc; return best; };
    /* texte « machine à écrire » (.tw) tapé lettre par lettre (o.per s par signe, défaut 0,05 ; o.dur = durée totale) avec un tressaut de
     * ±1,5 px à chaque signe ; la place du texte ne bouge pas pendant la frappe (le reste est transparent). o.parent (c.hud), o.anchor,
     * o.halo (contour papier, px), o.fill, o.cls ; → nœud (n.textEl) */
    const typed = (c, text, x, y, size, at, o) => {
      o = o || {};
      const g = el("g"), t = el("text", { x, y, "font-size": size, "text-anchor": o.anchor || "middle", class: o.cls || "tw" }, g);
      if (o.fill) t.style.fill = o.fill;
      const a = el("tspan", {}, t), b = el("tspan", { "fill-opacity": 0, "stroke-opacity": 0 }, t);
      const n = c.node(g, o.parent); n.textEl = t; if (o.halo) halo(n, o.halo);
      const t0 = T(at), N = text.length, dur = o.dur != null ? o.dur : (o.per || 0.05) * N, per = dur / Math.max(1, N);
      let last = -1;
      n.add((tt, s) => {
        const k = clamp(Math.floor(N * prog(tt, t0, dur) + 1e-6), 0, N);
        if (k !== last) { a.textContent = text.slice(0, k); b.textContent = text.slice(k); last = k; }
        s.o *= tt >= t0 ? 1 : 0;
        if (o.jit !== false && tt >= t0 && k < N) s.y += Math.floor((tt - t0) / per) % 2 ? 1.5 : -1.5;
      });
      return n;
    };
    /* bande des citations (écran, c.hud) : allemand .tw 20 à y 1372 (deux lignes 1352 / 1376 s'il dépasse 800 px) + arabe gras 28 à y 1412,
     * centrés x 520, contour papier ; l'allemand se tape (≤ 0,6 s), l'arabe se révèle de droite à gauche. o.until : effacement. → { de, ar } */
    /* bande de papier (opacité 0,9) derrière un texte posé sur le décor (revue visuelle) : les traits du sol, des plinthes, des corniches
     * ne traversent plus les lettres. Mesurée une fois, quand les polices sont chargées ; elle suit le nœud (frappe, révélation rtl). */
    const strip = (n, px, py) => {
      const t = n.textEl; if (!t || !t.parentNode) return n;
      const r = el("rect", { fill: PAPER_, opacity: 0.9, rx: 8, width: 0, height: 0 }); t.parentNode.insertBefore(r, t);
      let done = false;
      n.add(() => {
        if (done || (document.fonts && document.fonts.status !== "loaded")) return;
        let b = null; try { b = t.getBBox(); } catch (e) { return; }
        if (!b || b.width < 2) return;
        const q = (v) => v.toFixed(1); r.setAttribute("x", q(b.x - px)); r.setAttribute("y", q(b.y - py)); r.setAttribute("width", q(b.width + 2 * px)); r.setAttribute("height", q(b.height + 2 * py)); done = true;
      });
      return n;
    };
    const quote = (c, de, ar, at, o) => {
      o = o || {};
      const lines = de.length * 12 > 800 ? (() => { const mid = de.length / 2; let best = -1; for (let i = 0; i < de.length; i++) if (de[i] === " " && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i; return [de.slice(0, best), de.slice(best + 1)]; })() : [de];
      const dy = o.dy || 0, dur = Math.min(0.6, 0.02 * de.length), ys = (lines.length > 1 ? [1352, 1376] : [1372]).map((y) => y + dy);   // o.dy : bande décalée (scène 7)
      const nodes = lines.map((s, i) => strip(typed(c, s, 520, ys[i], 20, T(at) + (i ? dur * (lines[0].length / de.length) : 0), { parent: c.hud, halo: 6, dur: dur * (s.length / de.length) }), 8, 1));
      const arN = ar ? strip(halo(c.text(ar, 520, (lines.length > 1 ? 1414 : 1412) + dy, 28, "ar strong", "middle", c.hud), 7), 10, 0).wipe(T(at) + dur * 0.6, 0.4, "rtl") : null;
      if (o.until != null) { nodes.forEach((n) => n.hide(o.until, 0.15)); if (arN) arN.hide(o.until, 0.15); }
      return { de: nodes, ar: arN };
    };
    // UNE pastille allemande + arabe détaché, centrée (540, 450) dans c.hud ; pop à « at », s'efface à « until »
    const chip = (c, de, ar, size, at, until, o) => { const n = kit(c).chip(de, ar, (o && o.x) || 540, (o && o.y) || 450, size, Object.assign({ parent: c.hud }, o || {})).pop(at, 0.3); if (until != null) n.hide(until, 0.15); return n; };
    // mention « Rekonstruktion » / « مشهد تمثيلي » en haut à droite (écran (800, 418) et (800, 450)), dans c.hud
    const rekon = (c, at, until) => {
      const a = typed(c, "Rekonstruktion", 800, 418, 18, at, { parent: c.hud, halo: 5, per: 0.03 });
      const b = halo(c.text("مشهد تمثيلي", 800, 450, 26, "ar strong", "middle", c.hud), 6).fade(T(at) + 0.3, 0.3);
      if (until != null) { a.hide(until, 0.15); b.hide(until, 0.15); }
      return [a, b];
    };
    // trait de surligneur (jaune, opacité 0,55) qui se pose de gauche à droite : coin gauche (x, y) = milieu de la hauteur ; o.parent, o.h, o.rot
    const marker = (c, x, y, w, at, o) => { o = o || {}; const g = el("g", { transform: `translate(${x} ${y}) rotate(${o.rot == null ? -1 : o.rot})` }); el("rect", { x: -3, y: -(o.h || 20) / 2, width: w + 6, height: o.h || 20, rx: 6, fill: YEL_, opacity: o.op || 0.55 }, g); return c.node(g, o.parent).wipe(at, o.dur || 0.25, "ltr"); };
    // cercle jaune tracé à la main autour d'un objet (rx, ry), qui se dessine en o.dur s (0,3)
    const ring = (c, x, y, rx, ry, at, o) => {
      o = o || {}; const g = el("g"), pts = [];
      for (let i = 0; i <= 40; i++) { const a = -2.2 + (i / 36) * 6.283, w = 1 + 0.04 * Math.sin(i * 1.3); pts.push(`${(x + rx * w * Math.cos(a)).toFixed(1)} ${(y + ry * w * Math.sin(a)).toFixed(1)}`); }
      const p = el("path", { d: "M" + pts.join(" L"), fill: "none", stroke: o.col || YEL_, "stroke-width": o.sw || 6, "stroke-linecap": "round", "stroke-linejoin": "round", pathLength: 100, "stroke-dasharray": "0 101" }, g);
      const t0 = T(at), d = o.dur || 0.3, n = c.node(g, o.parent);
      n.add((t, s) => { const k = E.out(prog(t, t0, d)); p.setAttribute("stroke-dasharray", `${(k * 100).toFixed(1)} 101`); s.o *= t >= t0 ? 1 : 0; });
      return n;
    };
    // coup de ciseaux (deux lames qui se ferment) sur une ficelle en (x, y) : la boucle est refermée
    const snip = (c, x, y, at, o) => {
      const g = el("g"), A = el("path", { d: "M0 0 L-34 -10", stroke: INK_, "stroke-width": 4, "stroke-linecap": "round" }, g), B = el("path", { d: "M0 0 L-34 10", stroke: INK_, "stroke-width": 4, "stroke-linecap": "round" }, g);
      const t0 = T(at), n = c.node(g, o && o.parent);
      n.add((t, s) => { const k = E.out(prog(t, t0, 0.12)), a = (1 - k) * 28 + 3; A.setAttribute("transform", `rotate(${a.toFixed(1)})`); B.setAttribute("transform", `rotate(${(-a).toFixed(1)})`); s.x += x; s.y += y; s.o *= t >= t0 && t < t0 + 0.45 ? 1 - prog(t, t0 + 0.3, 0.15) : 0; });
      return n;
    };
    // lignes de balayage plein cadre (rembobinage) : montent de y 1470 à 250 en 0,3 s, o.times fois (0,35 s d'écart), dans c.hud
    const scan = (c, at, o) => {
      o = o || {}; const out = [];
      for (let i = 0; i < (o.times || 2); i++) {
        const t0 = T(at) + i * 0.35, n = c.sk((g, p) => D.scanLines(g, p), () => ({ w: 1080 }), 0, 0, 1, 0, c.hud);
        n.on((t, s) => { const p = prog(t, t0, 0.3); s.y += lerp(1470, 250, p); s.o *= p > 0 && p < 1 ? 0.7 : 0; }); out.push(n);
      }
      return out;
    };
    // la couleur s'éteint (scène 13) : grayscale du calque de la scène, de 0 à max en dur s
    const grey = (c, at, dur, max) => { const t0 = T(at); c.tick((t) => { const v = (max == null ? 0.85 : max) * E.inOut(prog(t, t0, dur || 1)); c.layer.style.filter = v > 0.004 ? `grayscale(${v.toFixed(3)})` : ""; }); };
    // tampon (SketchCast.stamp) qui claque : k.prop("stamp") + slam
    const stamp = (c, x, y, s, so, at, o) => kit(c).prop("stamp", x, y, s, () => so, 0, o && o.parent).slam(at, 0.32, (o && o.shake) == null ? 8 : o.shake);
    /* le compteur du HUD posé sur le chariot (scène 18) : bloc A « 63 h » + bloc B « + > 12 h » allumés, copie dessinée en monde
     * (coin haut gauche (652, 1130), échelle 0,62 = x 652–868, y 1130–1180) ; il apparaît à COUNTER_LAND (fondu croisé avec le HUD) */
    const COUNTER_AT = [652, 1130], COUNTER_S = 0.62, COUNTER_LAND = T("b22@Organisationsverschulden") + 0.72;
    const cartCounter = (c, at, parent) => {
      const n = c.sk((g) => { D.rollCounter(el("g", { transform: "translate(158 0)" }, g), { n: 2, prefix: "+>", label: "NOTDIENST 24 h", digits: [1, 2], lit: 1, wheel: false, plate: true });
        D.rollCounter(g, { digits: [6, 3], tick: 0 }); }, () => ({}), COUNTER_AT[0], COUNTER_AT[1], COUNTER_S, 0, parent);
      return at == null ? n : n.fade(T(at) - 0.05, 0.1);
    };
    /* Moniteur de la chambre (retour de l'auteur, 28.11.2026 : « le bip bip », que la mort se voie) : battements PARTAGÉS par l'image
     * (D.monitor04) et le son (son/mixage.py lit window.ECG04). [instant, amplitude, hauteur du bip]. Nuit : 77/min ; à « كيتقيا » il
     * s'emballe ; dimanche : 71/min, puis deux battements lents et faibles, puis LIGNE PLATE (flat). */
    const ecg04 = () => {
      if (ecg04.v) return ecg04.v;
      const B = [], add = (t, a, h) => B.push([+t.toFixed(3), a == null ? 1 : a, h == null ? 1 : h]);
      const s13 = T("b13") - 0.3, tq = T("b15@كيتقيا"), e12 = T("b16") - 0.05, s16 = T("b16"), E16 = T("b16@end");
      for (let x = s13; x < tq; x += 0.78) add(x);
      for (let x = tq, per = 0.72; x < e12; per = Math.max(0.46, per * 0.93), x += per) add(x);
      const sun = []; for (let x = s16 + 0.15; x < E16 - 0.35; x += 0.84) sun.push(x);
      sun.forEach((x, i) => add(x, 1, 1 - 0.04 * i));
      const L = sun[sun.length - 1]; add(L + 0.95, 0.75, 0.86); add(L + 1.95, 0.5, 0.76);
      return (ecg04.v = window.ECG04 = { beats: B, flat: +(L + 2.3).toFixed(3) });
    };
    const aides = { INK: INK_, YEL: YEL_, PAPER: PAPER_, halo, ecg04, fat, tired, ppC, phC, ppBed, noLegs, stride, walker, colStart, hours, tilt, calm, geomAt, toScreen, sceneAt,
      typed, quote, strip, chip, rekon, marker, ring, snip, scan, grey, stamp, cartCounter, COUNTER_AT, COUNTER_S, COUNTER_LAND };

    /* ───────── AKTE 04 : MISES EN PLACE FIXES (storyboard « Mise en place fixe ») — X.lieux ─────────
     * Chaque lieu pose le décor COMPLET aux coordonnées du storyboard, le construit en cascade à o.at (null = déjà construit), le fait vivre,
     * et renvoie ses nœuds. Les personnages propres à la scène vont dans le nœud « actors » (parent : lieu.actors.g), qui est à la bonne
     * profondeur (devant le décor, derrière ce qui doit les couvrir : la barre, la table, la couette…). Appel : const L = X.lieux.balance(c, {…}). */
    const bd = (m, n, at, dt, kind, opt) => (at == null ? n : m.build(n, T(at) + dt, kind, opt));
    const lieux = {
      /* LA BALANCE (scènes 1, 18, 19, 20) — monde, caméra cy 900. o.at : construction (null = l'accroche : tout est là dès la 1re image)
       * o.strafe(t) → { strafe, blur, streak } (rouleau « STRAFE », scène 1) · o.extras : console + poids « 90 » + chariot (scènes 18–20) ;
       * o.weight = { drop: repère | null, gone(t) → 0..1 } ; o.cart = { arrive: repère | null } ; o.counter : repère (atterrissage du compteur,
       * scène 18) | true (déjà posé) | false. Renvoie aussi geom(t) (D.scaleGeom à la position de la balance) et onPan(node, "L"|"R", dx, dy). */
      balance(c, o) {
        o = Object.assign({ at: null, extras: false, weight: {}, cart: {}, counter: false, strafe: null }, o); c_ = c; const m = M.of(c), k = kit(c);
        k.bg(); m.obj(D.courtRoom, 0, 0, 1, { bottom: 1610 });
        const shaft = m.obj(D.lightShaft, 0, 0, 1, { from: [150, 400], to: [470, 1000], w: 150 }).on((t, s) => { s.x += 6 * Math.sin((t / 6) * 6.283); });
        bd(m, shaft, o.at, 0, "grow", { pivot: [150, 400], dur: 0.4 });
        const dust = m.dust({ x: 170, y: 430, w: 300, h: 520 }, 12, { seed: 4, op: 0.8, speed: 10 });
        const base = m.obj(D.scale04, 540, 1240, 1, { part: "base" }); bd(m, base, o.at, 0.05, "rise", { dist: 120 });
        const beam = c.sk((g, p) => D.scale04(g, p), (t) => Object.assign({ part: "beam" }, tilt(t), o.strafe ? o.strafe(t) : { strafe: 0 }), 540, 1240, 1);
        bd(m, beam, o.at, 0.12, "drop", { dist: 160 });
        const geom = (t) => geomAt(t, 540, 1240, 1);
        const onPan = (n, side, dx, dy) => n.on((t, s) => { const G = geom(t), p = side === "L" ? G.panL : G.panR, sw = tilt(t)[side === "L" ? "swL" : "swR"]; s.x += p[0] + (dx || 0); s.y += p[1] + (dy || 0); s.px = 0; s.py = 0; s.r += -sw; });
        const out = { m, k, shaft, dust, base, beam, geom, onPan };
        if (o.extras) {
          const w = o.weight || {};
          out.weight = c.sk((g, p) => D.weight90(g, p), (t) => ({ dash: rnd((t * 9) % 17, 2), gone: w.gone ? rnd(w.gone(t), 20) : 0, label: false }), 900, 700, 1);
          bd(m, out.weight, w.drop, 0, "drop", { dist: 200 });
          out.tag = c.sk((g) => D.stringTag(g, {}), () => ({}), 934, 696, 1); m.pend(out.tag, w.drop == null ? -1 : T(w.drop) + 0.4, 6, [934, 696], { idle: 2 });
          bd(m, out.tag, w.drop, 0, "drop", { dist: 200 });
          const ca = o.cart || {}, A_ = ca.arrive == null ? null : T(ca.arrive), roll = (t) => (A_ == null ? 0 : (1 - E.out(prog(t, A_, 0.5))) * 300);
          out.cart = c.sk((g, p) => D.cart(g, p), () => ({ part: "body" }), 760, 1180, 1).on((t, s) => { s.x += roll(t); s.o *= A_ == null || t >= A_ ? 1 : 0; });
          out.wheels = c.sk((g, p) => D.cart(g, p), (t) => ({ part: "wheels", wheel: Math.round(roll(t) * 1.6) % 360 }), 760, 1180, 1).on((t, s) => { s.x += roll(t); s.o *= A_ == null || t >= A_ ? 1 : 0; });
          if (o.counter) out.counter = cartCounter(c, o.counter === true ? null : o.counter);
        }
        out.actors = c.group();
        out.dock = m.obj(D.dock, 60, 1300, 1, { props: false });
        out.tissue = c.sk((g, p) => D.tissueBox(g, p), (t) => ({ sway: rnd(3 * Math.sin((t / 2.4) * 6.283) * calm(t), 2) }), 300, 1302, 1);
        out.glass = c.sk((g, p) => D.glass(g, p), (t) => ({ wave: rnd(2 * Math.sin((t / 1.5) * 6.283) * calm(t), 4) }), 350, 1302, 1);
        [out.dock, out.tissue, out.glass].forEach((n, i) => bd(m, n, o.at, 0.18 + i * 0.04, "rise", { dist: 120 }));
        return out;
      },

      /* LA SALLE D'AUDIENCE (scènes 2, 17) — monde, cy 920. Les trois juges (échelle 0,8, derrière le banc) font partie de la mise en place :
       * o.judges = { JUG(t), SCF(t), SCM(t) } → paramètres ajoutés (expression, regard…) ; o.expert : chaise + EXP assis (scène 17),
       * o.exp(t) → paramètres ajoutés ; o.page(t) → 0..1 (le juge tourne une page) ; o.smallTilt(t) (défaut : X.aides.tilt) ; o.block(t) → décalage
       * vertical du bloc sur la petite balance (rembobinage) ou false. Cascade (o.at) : rayon, plaque, banc, juges, petite balance. */
      salle(c, o) {
        o = Object.assign({ at: null, judges: {}, expert: false, exp: null, page: null, smallTilt: null, block: null }, o); c_ = c; const m = M.of(c), k = kit(c);
        k.bg(); m.obj(D.courtRoom, 0, 0, 1, {});
        const win = m.obj(D.tallWindow, 120, 420, 1, {}); bd(m, win, o.at, 0, "grow", { pivot: [190, 560], dur: 0.35 });
        const shaft = m.obj(D.lightShaft, 0, 0, 1, { from: [260, 430], to: [500, 1300], w: 130, spread: 1.5 }).on((t, s) => { s.x += 6 * Math.sin((t / 6) * 6.283); });
        if (o.at != null) shaft.fade(o.at, 0.3);
        const dust = m.dust({ x: 260, y: 470, w: 230, h: 760 }, 12, { seed: 9, op: 0.75, speed: 9 });
        // clou à (600, 565) et non 525 : à 525 le fil et le haut du disque passaient sous l'arabe des pastilles (bande y 420–530 écran)
        const plaque = m.obj(D.plaque04, 600, 565, 1, {}); bd(m, plaque, o.at, 0.03, "drop", { dist: 200 }); m.pend(plaque, o.at == null ? -1 : T(o.at) + 0.4, 5, [600, 565], { idle: 0.5 });
        const J = {};
        [["SCF", 410, 1], ["JUG", 570, 2], ["SCM", 835, 3]].forEach(([id, x, i]) => {
          const extra = o.judges[id];
          J[id] = pp(x, 1150, 0.8, (t) => Object.assign({}, CAST[id], { view: "front", expr: id === "SCF" ? "calm" : "focused", look2: id === "JUG" ? [0, 0.6] : [0, 0.2],
            blink: rnd(blinkAt(t, i * 1.3), 10), talk: 0 }, PP.stand, { armL: [-6, 8], armR: [6, -8] }, extra ? extra(t) : {})).on(breathe(i));
          bd(m, J[id], o.at, 0.04 + i * 0.06, "rise", { dist: 70, dur: 0.3 });
        });
        const bench = m.obj(D.bench04, 600, 980, 1, { carafe: null, pile: 250 }); bd(m, bench, o.at, 0.05, "rise", { dist: 90 });
        const carafe = c.sk((g, p) => D.carafe(g, p), (t) => ({ wave: rnd(2 * Math.sin((t / 1.5) * 6.283) * calm(t), 4) }), 470, 980, 1); bd(m, carafe, o.at, 0.05, "rise", { dist: 90 });
        const folder = c.sk((g, p) => D.folder(g, p), (t) => ({ text: "613 Ls 3/12", page: o.page ? rnd(o.page(t), 20) : 0 }), 560, 968, 1); bd(m, folder, o.at, 0.08, "rise", { dist: 90 });
        const sT = o.smallTilt || tilt;
        const small = c.sk((g, p) => D.scale04(g, p), (t) => { const q = sT(t); return { tilt: q.tilt, swL: q.swL, swR: q.swR, stand: false, tags: false, lw: 2.4 }; }, 695, 980, 0.24);
        bd(m, small, o.at, 0.2, "grow", { pivot: [695, 980] });
        const block = o.block === false ? null : c.sk((g) => D.guiltBlock(g, {}), () => ({}), 0, 0, 0.24).on((t, s) => { const G = D.scaleGeom(sT(t), 695, 980, 0.24); s.x += G.panL[0]; s.y += G.panL[1] - (o.block ? o.block(t) : 0); });
        if (block) bd(m, block, o.at, 0.2, "grow", { pivot: [695, 900] });
        const out = { m, k, win, shaft, dust, plaque, judges: J, bench, carafe, folder, small, block };
        if (o.expert) {
          const EX = 790;   // revue visuelle : 805 → 790 (avec le travelling de la scène 17, la chaise entrait dans la colonne des boutons)
          out.chair = m.obj(D.chair04, EX, 1300, 1, { flip: true });
          // l'expert de profil, le dossier « Gutachten » debout sur ses cuisses, ses mains PAR-DESSUS (corps sans bras, dossier, puis les bras)
          const ex = (t) => Object.assign({}, CAST.EXP, PP.sitEdge, { facing: -1, expr: "focused", blink: rnd(blinkAt(t, 2.2), 10), talk: 0, look2: [0.6, 0.1] }, o.exp ? o.exp(t) : {});
          out.exp = pp(EX, 1300, 0.85, (t) => Object.assign(ex(t), { hide: ["armL", "armR"] })).on(breathe(4));
          out.gutachten = m.obj(D.folder, EX - 43, 1180, 0.72, { text: "Gutachten", yellow: true }).on(breathe(4));
          out.expArms = pp(EX, 1300, 0.85, (t) => Object.assign(ex(t), { only: "arms" })).on(breathe(4));
        }
        out.actors = c.group();
        out.table = m.obj(D.dockTable, 210, 1300, 1, {}); bd(m, out.table, o.at, 0.1, "rise", { dist: 80 });
        return out;
      },

      /* LA CHAMBRE (scènes 11, 12, 13) — monde, cy 920. Le patient PAT (assis dans le lit vu de face, échelle 1, main droite d'écran posée sur
       * la couette) fait partie de la mise en place : o.pat(t) → paramètres ajoutés. o.day (scène 13 : fenêtre de jour, tache de soleil, chevet
       * avec un verre d'eau, poche claire, tubulure sans rouge) · o.clock(t) → { time | h, m, s, sector } · o.bag : false | { level(t), tint,
       * hang (true : au crochet ; false : la scène la tient) } · o.tube(t) → { fill, clamp, drop, back, tint } · o.vie(t) → amplitude 0..1
       * (tout se fige : scène 13) · o.breath(t) → 0..1 (la couette) */
      chambre(c, o) {
        o = Object.assign({ at: null, day: false, clock: null, bag: {}, tube: null, pat: null, vie: null, breath: null }, o); c_ = c; const m = M.of(c), k = kit(c);
        const vie = o.vie || (() => 1);
        k.bg(); m.obj(D.wardRoom, 0, 0, 1, { outlet: [600, 1110] });
        let patch = null;
        if (o.day) { patch = m.obj(D.lightPatch, 520, 760, 1, { w: 150, h: 240, skew: 20 }).on((t, s) => { s.x += 5 * Math.sin((t / 3) * 3.14) * vie(t); }); if (o.at != null) patch.fade(o.at, 0.4); }
        const clockFn = o.clock || ((t) => ({ time: o.day ? 13 + 36 / 60 : 21 + 50 / 60, s: Math.round(t * 60) * 6 }));
        const CKX = 240;   // revue visuelle : 165 → 240 (avec la poussée de caméra, l'horloge sortait par le bord gauche, scènes 11–12)
        const face = c.sk((g, p) => D.clock04(g, p), (t) => { const q = clockFn(t); return { part: "face", sector: q.sector || 0 }; }, CKX, 500, 1);
        const hands = c.sk((g, p) => D.clock04(g, p), (t) => Object.assign({ part: "hands" }, clockFn(t)), CKX, 500, 1);
        [face, hands].forEach((n) => bd(m, n, o.at, 0.08, "grow", { pivot: [CKX, 500] }));
        const sky = c.sk((g, p) => D.nightWindow(g, p), (t) => ({ part: "sky", p: o.day ? 0 : 1, cloud: rnd((t * 0.045) % 1, 100) }), 710, 520, 1);
        const frame = m.obj(D.nightWindow, 710, 520, 1, { part: "frame" });
        [sky, frame].forEach((n) => bd(m, n, o.at, 0.03, "grow", { pivot: [800, 620] }));
        const ecgP = ecg04();
        const monitor = c.sk((g, p) => D.monitor04(g, p), (t) => ({ t: rnd(t, 100), beats: ecgP.beats, flat: ecgP.flat }), 600, 642, 1);
        bd(m, monitor, o.at, 0.06, "grow", { pivot: [600, 530] });
        const stand = m.obj(D.nightstand04, 155, 1300, 1, o.day ? { bags: false, glass: true } : {}); bd(m, stand, o.at, 0.1, "left", { dist: 160 });
        const back = m.obj(D.bedBack04, 400, 1300, 1, {});
        const patient = ppBed(400, 1335, 1, (t) => Object.assign({}, CAST.PAT, { view: "front", expr: "calm", blink: rnd(Math.max(0.25, blinkAt(t, 3.1)), 10), talk: 0, look2: [0.35, -0.05],
          reachR: [105, -215], armL: [-10, 12] }, o.pat ? o.pat(t) : {})).on((t, s) => { s.y += Math.sin(t * 1.85) * 1.5 * vie(t); });
        const brf = o.breath || ((t) => 0.5 + 0.5 * Math.sin(t * 1.85));
        const duvet = c.sk((g, p) => D.bedFront04(g, p), (t) => ({ part: "duvet", breath: rnd(brf(t) * vie(t), 10) }), 400, 1300, 1);
        const bedF = m.obj(D.bedFront04, 400, 1300, 1, { part: "frame", chart: ["Leberzirrhose", "Anämie"] });
        [back, patient, duvet, bedF].forEach((n) => bd(m, n, o.at, 0.05, "rise", { dist: 160 }));
        const pole = m.obj(D.ivPole, 700, 1300, 1, { sHook: false }); bd(m, pole, o.at, 0.12, "rise", { dist: 160 });
        const h2 = pole.out.hook2, hook2 = m.obj(D.ivHook, 700 + h2[0], 1300 + h2[1], 1, {}); m.pend(hook2, o.at == null ? -1 : T(o.at) + 0.5, 8, [700 + h2[0], 1300 + h2[1]], { idle: 2.4 });
        bd(m, hook2, o.at, 0.12, "rise", { dist: 160 });
        const out = { m, k, patch, face, hands, sky, frame, monitor, ecg: ecgP, stand, back, patient, duvet, bedF, pole, hook2, hook: [756, 915] };
        if (o.bag) {
          const b = o.bag, tint = b.tint == null ? (o.day ? 0 : 1) : b.tint;
          out.bag = c.sk((g, p) => D.bloodBag(g, p), (t) => ({ level: rnd(b.level ? b.level(t) : (o.day ? 0.8 : 1), 50), tint, sway: rnd(t * 1.6 * vie(t), 10), ghost: 1 }), 756, 921, 0.8);
          if (b.hang !== false) { m.pend(out.bag, o.at == null ? -1 : T(o.at) + 0.5, 3, [756, 921], { idle: 0.8 }); bd(m, out.bag, o.at, 0.16, "drop", { dist: 120 }); }
        }
        const PTS = [[756, 1073], [765, 1110], [720, 1185], [600, 1160], [505, 1120]], tfn = o.tube || (() => (o.day ? { fill: 1, tint: 0 } : { fill: 0 }));
        out.tube = c.sk((g, p) => D.tube(g, p), (t) => Object.assign({ pts: PTS, k: 0.85, chamberAt: 0.07, clampAt: 0.2, drop: rnd(((t / 1.2) % 1) * vie(t), 20) }, tfn(t)), 0, 0, 1);
        bd(m, out.tube, o.at, 0.2, "grow", { pivot: [756, 1073] });
        out.tubeGeom = D.tube(el("g"), { pts: PTS, k: 0.85, chamberAt: 0.07, clampAt: 0.2 });   // ancres (molette : wheel ; chambre : chamber)
        out.actors = c.group();
        return out;
      },

      /* LA PAGE DE LA RÈGLE (scènes 22, 23, 24) — monde, cy 920. Fond à cases en filigrane, ruban « القاعدة » dans la bande HUD (c.hud),
       * carte de la règle (coin haut gauche (432, 565), 430 × 528 : x 432–862, y 565–1093), carte jaune (432, 1110 : y 1110–1356).
       * Colonne de l'illustration (toi, le lit, la carte de test…) : x 165–420. o.at : la carte tombe (scène 22) ; null = posée.
       * o.lessonAt : la carte jaune glisse de la droite (null = posée) · o.rows(t), o.head(t) (en-tête allemand dessiné ; false = la scène le
       * tape aux ancres headLines), o.foot(t) · o.checks(t) → [4] · o.hl(t) → { pers, foot } · o.lesson(t) → [⑤, ⑥].
       * Renvoie les ancres en MONDE : rows, boxes, headLines, pers, braask, foot (règle) et lessonRows, lessonBoxes. */
      regle(c, o) {
        o = Object.assign({ at: null, lessonAt: null, rows: null, head: null, foot: null, checks: null, hl: null, lesson: null, ribbon: true }, o); c_ = c; const m = M.of(c), k = kit(c);
        k.bg();
        const grid = m.obj(D.hourGrid, -60, 300, 1, { cols: 9, rows: 11, cell: 140, paper: false, col: "#9A9A94", sw: 2.4 }).on((t, s) => { s.o *= 0.2; }); m.par(grid, 0.6);
        const RX = 432, RY = 565, LY = 1110;
        const card = c.sk((g, p) => D.ruleCard(g, p), (t) => ({ part: "card", rows: o.rows ? rnd(o.rows(t), 20) : 4, head: o.head ? !!o.head(t) : true, foot: o.foot ? rnd(o.foot(t), 20) : 1 }), RX, RY, 1);
        const marks = c.sk((g, p) => D.ruleCard(g, p), (t) => ({ part: "marks", checks: o.checks ? o.checks(t).map((v) => rnd(v, 20)) : [0, 0, 0, 0], hl: o.hl ? o.hl(t) : null }), RX, RY, 1);
        [card, marks].forEach((n) => bd(m, n, o.at, 0, "drop", { dist: 400 }));
        const lesson = c.sk((g, p) => D.lessonCard(g, p), () => ({ part: "card" }), RX, LY, 1);
        const lmarks = c.sk((g, p) => D.lessonCard(g, p), (t) => ({ part: "marks", checks: o.lesson ? o.lesson(t).map((v) => rnd(v, 20)) : [0, 0] }), RX, LY, 1);
        [lesson, lmarks].forEach((n) => bd(m, n, o.lessonAt, 0, "right", { dist: 520 }));
        const A = card.out, W = (p) => [RX + p[0], RY + p[1]], WL = (p) => [RX + p[0], LY + p[1]], L = lesson.out;
        const out = { m, k, grid, card, marks, lesson, lmarks, rows: A.rows.map(W), boxes: A.boxes.map(W), headLines: A.headLines.map(([s, x, y, sz]) => [s, RX + x, RY + y, sz]),
          pers: [RX + A.pers[0], RY + A.pers[1], A.pers[2]], braask: [RX + A.braask[0], RY + A.braask[1], A.braask[2]], foot: [RX + A.foot[0], RY + A.foot[1], A.foot[2]],
          lessonRows: L.rows.map(WL), lessonBoxes: L.boxes.map(WL) };
        if (o.ribbon) out.ribbon = k.ribbon("القاعدة", 400, 322, { size: 44, parent: c.hud });
        out.actors = c.group();
        return out;
      },
    };

    /* ───────── AKTE 04 : HUD propre à l'épisode (storyboard § 3) — calque GLOBAL #hud04 (écran), au-dessus de #stage-svg ─────────
     * Il traverse les transitions sans être rogné et n'est pas recopié dans l'affiche. État = fonction pure de t ; redessin seulement quand
     * les paramètres arrondis changent. Compteur : bloc A « WOCHE » (112, 272) et bloc B « NOTDIENST 24 h » (270, 272, il sort de derrière A) ;
     * onglet du jour (700, 284). Le HUD du socle (barre de progression, logo masqué pendant l'intro) n'est pas touché. */
    {
      const poster = document.getElementById("poster");
      const svg = el("svg", { id: "hud04", viewBox: "0 0 1080 1920", width: 1080, height: 1920, style: "position:absolute;left:0;top:0;overflow:visible;pointer-events:none" });
      poster.appendChild(svg);
      const part = (parent) => { const o = el("g", {}, parent), i = el("g", {}, o); return { o, i, last: null, tr: null, op: null }; };
      const CNT = part(svg), Bk = part(CNT.i), Ak = part(CNT.i), TAB = part(svg);   // B sous A : il sort de derrière
      const draw = (P, fn, params) => { const k = JSON.stringify(params); if (k !== P.last) { P.last = k; while (P.i.firstChild) P.i.removeChild(P.i.firstChild); fn(P.i, params); } };
      const place = (P, x, y, s, r, op) => {
        const tr = `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(r || 0).toFixed(2)}) scale(${(s == null ? 1 : s).toFixed(4)})`;
        if (tr !== P.tr) { P.o.setAttribute("transform", tr); P.tr = tr; }
        const o = clamp(op == null ? 1 : op, 0, 1).toFixed(3); if (o !== P.op) { P.o.style.opacity = o; P.o.style.display = +o <= 0.001 ? "none" : ""; P.op = o; }
      };
      const H = { tR: T("b3@نرجعو"), tI: T("i1") - 0.1, tB: T(AFTER_INTRO) - 0.1, tK: T("b6@شي"), tW: T("b6@وحدة"), tG: T("b7@garde"), tD8: T("b8@دوزات"), t12: T("b8@7"),
        t63: T("b13@9"), tDie: ecg04().flat - 0.15, tDim: T("b16@end") + 2.5, tOrg: T("b22@Organisationsverschulden"), tEnd: T(LAST + "@end") + 0.15,
        t5: T("b4@7"), tb5: T("b5"), tb6: T("b6"), tSun: T("b16@الأحد"), t21: T("b21"), t26: T("b26") };
      const tLand = COUNTER_LAND, tFly = H.tOrg + 0.12;
      const odo = (v) => { const u = ((v % 10) + 10) % 10; return [rnd(Math.floor(v / 10) + Math.max(0, u - 9), 20), rnd(u, 20)]; };   // compteur kilométrique : la dizaine tourne avec 9 → 0
      const clac = (t, a) => (t >= a && t < a + 0.15 ? -4 * Math.sin((Math.PI * (t - a)) / 0.15) : 0);
      const blinkRew = (t) => (Math.floor(t * 8) % 2 ? 0.35 : 1);
      // onglet du jour : [début, texte, à taper ?, ◀◀, flou]
      const TABS = [[-1e9, "Mi · 16.05.2012", false, 0, 0], [H.tR, "Mi · 16.05.2012", false, 1, 1], [H.tB, "Mi · 16.05.2012", false, 1, 1], [H.t5, "2012", true, 1, 0],
        [H.tb5, "30.07.2011", true, 1, 0], [H.tb6, "··.··.····", false, 1, 0], [H.tK, "Juli 2011", true, 0, 0], [H.tG, "Sa · 30.07.2011", true, 0, 0],
        [H.tSun, "So · 31.07.2011", true, 0, 0], [H.t21, "Mi · 16.05.2012", true, 0, 0]];
      const tabVis = (t) => (t < H.tI ? 1 : t < H.tB ? 0 : t < H.tDim ? 1 : t < H.t21 ? 1 - prog(t, H.tDim, 0.3) : t < H.t26 ? prog(t, H.t21, 0.2) : 0);
      sv.hooks.push((t) => {
        // ── compteur
        let vis = t < H.tR ? 0 : t < H.tI ? prog(t, H.tR, 0.2) : t < H.tB ? 0 : t < tLand ? 1 : 1 - prog(t, tLand, 0.1);
        if (t >= H.tEnd) vis = 0;
        const rew = t < H.tK;
        const tick = rew ? -360 * (t - H.tR) : t < H.tDie ? 90 * (t - H.tK) : 90 * (H.tDie - H.tK) + 90 * (Math.min(0.6, t - H.tDie) - Math.min(0.6, t - H.tDie) ** 2 / 1.2);
        const dead = t < H.tOrg ? E.inOut(prog(t, H.tDie, 0.6)) : 1 - prog(t, H.tOrg, 0.12);
        const v = rew ? 0 : hours(t);
        const pa = { digits: odo(v), blur: rew ? 1 : 0, streak: rew ? rnd(-(t - H.tR) * 3, 20) : 0, tick: Math.round(((tick % 360) + 360) % 360),
          flash: t >= H.t63 && t < H.t63 + 0.4 ? rnd(Math.sin((Math.PI * (t - H.t63)) / 0.4), 10) : 0, dead: rnd(dead, 20) };
        if (vis > 0.001) draw(Ak, (g, p) => D.rollCounter(g, p), pa);
        const bOn = t >= H.tG, vb = t < H.tD8 ? 0 : 12 * prog(t, H.tD8, Math.max(0.1, H.t12 - H.tD8));
        if (vis > 0.001 && bOn) draw(Bk, (g, p) => D.rollCounter(g, p), { n: 2, prefix: "+>", label: "NOTDIENST 24 h", digits: odo(vb), lit: t >= H.t12 ? 1 : 0, wheel: false, plate: true, dead: pa.dead });
        place(Ak, 0, clac(t, H.tK) + clac(t, H.tW), 1, 0, 1);
        place(Bk, -190 * (1 - E.back(prog(t, H.tG, 0.35))) + 158, clac(t, H.t12), 1, 0, bOn ? 1 : 0);
        // position, échelle, rotation du bloc : pulsation ×1,25 à 63 ; gris et opacité 0,6 (scènes 14–17) ; vol jusqu'au chariot (scène 18)
        let x = 112, y = 272, s = 1 + (t >= H.tW && t < H.tW + 0.4 ? 0.25 * Math.sin((Math.PI * (t - H.tW)) / 0.4) : 0), r = 0, op = t < H.tDim ? 1 : t < H.tOrg ? 1 - 0.4 * prog(t, H.tDim, 0.3) : 0.6 + 0.4 * prog(t, H.tOrg, 0.12);
        if (t >= H.tOrg && t < tFly) { const u = (t - H.tOrg) / 0.12; y -= 10 * Math.sin(Math.PI * u); r = -6 * u; }
        if (t >= tFly) {
          const sc = sceneAt(Math.min(t, tLand)), q = E.inOut(prog(t, tFly, tLand - tFly));
          const P = sc ? toScreen(sc, Math.min(t, tLand), COUNTER_AT) : [652, 1130, 1], C1 = [112 + (P[0] - 112) * 0.75, 200];
          x = (1 - q) ** 2 * 112 + 2 * (1 - q) * q * C1[0] + q * q * P[0]; y = (1 - q) ** 2 * 272 + 2 * (1 - q) * q * C1[1] + q * q * P[1];
          s = lerp(1, COUNTER_S * P[2], q); r = -6 * (1 - q);
        }
        place(CNT, x, y, s, r, vis * op);
        // ── onglet du jour
        let seg = TABS[0]; for (const q of TABS) if (t >= q[0]) seg = q;
        const tv = t >= H.tEnd ? 0 : tabVis(t);
        if (tv > 0.001) {
          const [a, text, typing, rw, bl] = seg;
          draw(TAB, (g, p) => D.dayTab(g, p), { text, chars: typing ? Math.min(text.length, Math.floor((t - a) / 0.04)) : null, rew: rw ? blinkRew(t) : 0, blur: bl, streak: bl ? rnd(-(t - H.tR) * 3, 20) : 0 });
        }
        place(TAB, 700, 284, 1, 0, tv);
      });
    }

    /* ───────── SCÈNES : elles sont écrites dans scenes-1.js … scenes-4.js (une partie de l'épisode par fichier) ─────────
     * Chaque fichier fait : (window.EP_PARTS = window.EP_PARTS || []).push(function (X) { … X.st.scene({ … }) … });
     * X = tout le socle ci-dessus. Dans une scène : const k = X.use(c);  (pose la scène courante pour pp / ph et rend le kit).
     * X.lieux = mises en place FIXES partagées entre les parties (ex. X.lieux.chambre = (c, o) => { … }). */
    const X = { sv, st, T, E, prog, lerp, clamp, el, isLatin, SC, K, U, MAT, INK, W, NS, PE, PP, D, M,
      kit, drawDE, geoAt, pinAt, blinkAt, talkAt, rnd, pp, ph, breathe, rl, walkTo,
      CAST, TENUE, BEAT_IDS, LAST, AFTER_INTRO, AKTE_NO, AKTE_NEXT, TITRE, QUESTION, QUESTION_LIGNES, QUESTION_SUITE,
      lieux, aides, FAT, TILT,
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
    // AKTE 04 (storyboard, scène 26) : 24 cases, image figée choisie par case (rang de la case, l'intro ne compte pas ; null = fin de scène)
    const FREEZE = ["b1@غرامة+0.4", "b2@end", "b4@سنات", null, null, null, null, null, "b12@بالمعلومات", null, "b15@ليه", "b16@end+2.1", "b17@end", "b19@end",
      null, null, null, null, null, null, null, null, null, null];
    st.summary({ at: LAST + "@end+0.15", in: "cut", dezoomAt: LAST + "@end+0.5", cols: 6, crop: [230, 1310], top: 372, gap: 10, side: 92, freezeAt: FREEZE,
      below(c, cells) {
        SketchUI.dots(c);
        const k = kit(c);
        // ordre logique « TITRE · AKTE NN » : dans le ruban RTL, « AKTE 04 · 63 ساعة » s'affichait « ساعة AKTE 04 · 63 » (le 63 collé à AKTE, loin de ساعة)
        k.ribbon(TITRE + " · AKTE " + AKTE_NO, 540, 312, { size: 36, w: 470 });
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
        // AKTE 04 : dans la carte, à gauche (x 150–300, y 1030–1110), un petit compteur dont les deux rouleaux tournent flous : il attend le chiffre
        c.sk((g, p) => D.rollCounter(g, p), (t) => ({ digits: [0, 0], blur: 1, streak: rnd(t * 2.2, 20), tick: Math.round(t * 120) % 360 }), 150, 1030, 1).pop(LAST + "@end+2.8", 0.4);
        // question en DEUX lignes (storyboard, scène 26) : ttl 44 px, puis l'appel à commenter en gras 40 px, puis la flèche du socle
        k.ar(QUESTION_LIGNES[0], 490, 1040, 34, "ttl").wipe(LAST + "@end+2.8", 0.5, "rtl");
        k.ar(QUESTION_LIGNES[1], 490, 1098, 34, "ttl").wipe(LAST + "@end+3.0", 0.5, "rtl");
        k.ar(QUESTION_SUITE, 490, 1185, 31, "ar strong").wipe(LAST + "@end+3.3", 0.5, "rtl");
        c.put(`<path d="M780 1150 C 860 1150, 900 1160, 918 1196 M896 1186 L918 1196 L922 1172" stroke="#1C1A1C" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).wipe(LAST + "@end+3.5", 0.4);
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
