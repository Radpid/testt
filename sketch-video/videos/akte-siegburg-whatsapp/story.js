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
          let tx = null, band = null;
          if (ar) {   // traduction arabe : bien détachée de la pastille (et de son ombre), avec un contour papier pour rester lisible
            const gs = Math.max(26, Math.round(size * 0.82));
            tx = SC.util.text(g, ar, 0, h / 2 + 7 + 13 + gs * 0.95, gs, { font: "'Plex Arabic', sans-serif", weight: 700, fill: "#2E2C28", rtl: true });
            tx.setAttribute("stroke", "#F7F7F1"); tx.setAttribute("stroke-width", "7"); tx.setAttribute("stroke-linejoin", "round"); tx.setAttribute("paint-order", "stroke");
            // pastille du HUD : bande de papier derrière l'arabe (AKTE 04 : un bord de décor traversait l'arabe)
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

    /* ═══════════════════════════ HUD PROPRE À L'ÉPISODE (storyboard § 3) — X.hud ═══════════════════════════
     * Le HUD du SOCLE (barre de progression + logo masqué pendant l'intro) reste plus bas, inchangé. Ici : ce que chaque scène pose dans
     * son c.hud, aux MÊMES pixels d'une scène à l'autre : le téléphone et son écran (§ 3.1), la date de la barre d'état (3.2), la bande des
     * pastilles (3.3), la mention (3.4), la bannière (3.5), l'ascenseur (3.6), le compteur « → 7 » (3.7). Le logo (3.8) ne change pas.
     *   X.hud.telephone(c, o)   le squelette d'une scène ÉCRAN (storyboard « Squelette d'une scène ÉCRAN ») — les lieux ÉCRAN le prennent
     *   X.hud.pastille(c, de, ar, o)   UNE pastille (bande du téléphone (525, 486) ; PIÈCE / PAPIER : { x: 520, y: 420 }) + micro facultatif
     *   X.hud.mention(c, items, o)     mention de source : menton (ÉCRAN) ou étiquette en bas à gauche (PIÈCE / PAPIER), une ou plusieurs à la suite
     *   X.hud.banniere(c, o)           la bannière D.notif qui tombe puis remonte (ÉCRAN : dans la découpe de l'écran ; PIÈCE : en haut du cadre)
     *   X.hud.ascenseur(c, parent, defile, o) · X.hud.compteur(c, parent, at, o) · X.hud.fantome(c, o) (sortie du téléphone vers une main) */
    let uidHud = 0;
    const motifPoints = () => { const id = "epdots" + (++uidHud), pat = el("pattern", { id, width: 36, height: 36, patternUnits: "userSpaceOnUse" }, st.defs);
      el("circle", { cx: 18, cy: 18, r: 2, fill: "#CFCBC0" }, pat); return id; };
    // pop avec un pivot donné (la pointe d'une bulle, le centre d'une pastille) : Node.pop prend le centre de la boîte englobante (R2)
    const jaillit = (n, at, px, py, dur = 0.3, from = 0.15) => { const a = T(at); return n.on((t, s) => { const p = prog(t, a, dur); if (p >= 1) return;
      s.o *= p <= 0 ? 0 : clamp(p * 4, 0, 1); s.px = px; s.py = py; s.s *= Math.max(0.01, from + (1 - from) * E.back(p)); }); };
    const dans = (parent, n) => { parent.appendChild(n.g); return n; };          // re-parenter un nœud de Motion (né dans c.cam) — R2
    const val = (v, t, d) => (typeof v === "function" ? v(t) : v == null ? d : v);

    // banniere(c, o) — o = { at, until (null : elle reste), x, y, w, h (défaut PIÈCE : 240, 300, 600 × 84 ; ÉCRAN : 215, 316, 620 × 88),
    //   parent (défaut c.hud), titre, ligne, ar, sceau, contact, jaune, appel, appui (t) → 0..1, dist (110), dur (0,16) }
    const banniere = (c, o = {}) => {
      const x = o.x == null ? 240 : o.x, y = o.y == null ? 300 : o.y, a = o.at != null ? T(o.at) : c.start, dist = o.dist || 110;
      const base = { w: o.w || 600, h: o.h || 84, titre: o.titre, ligne: o.ligne, ar: o.ar, sceau: !!o.sceau, contact: !!o.contact, jaune: !!o.jaune, appel: !!o.appel };
      const n = c.sk((g, p) => D.notif(g, p), (t) => (o.appui ? Object.assign({}, base, { appui: rnd(o.appui(t), 10) }) : base), x, y, 1, 0, o.parent || c.hud);
      n.on((t, s) => { const p = prog(t, a, o.dur || 0.16); s.o *= p > 0 ? 1 : 0; s.y -= dist * (1 - E.back(p)); });
      if (o.until != null) { const b = T(o.until); n.on((t, s) => { const p = prog(t, b, 0.2); s.y -= (dist + 20) * E.in(p); s.o *= 1 - p; }); }
      return n;
    };

    // pastille(c, de, ar, o) — k.chip du socle (arabe détaché dessous) dans un nœud qui jaillit de son centre ; UNE à la fois.
    //   o = { at, until, x, y (défaut 525, 486 : la bande du téléphone), size (30), yellow, w, micro ("laut Urteil" : 17 px sous le coin droit),
    //   parent (défaut c.hud ; scène ÉCRAN : P.bande) }. Une citation mot pour mot s'écrit entre « » (c'est la scène qui les met).
    const pastille = (c, de, ar, o = {}) => {
      const x = o.x == null ? 525 : o.x, y = o.y == null ? 486 : o.y, size = o.size || 30, wrap = el("g");
      kit(c).chip(de, ar, x, y, size, { yellow: o.yellow, parent: wrap, w: o.w });
      if (o.micro) { const w = o.w || Math.max(120, de.length * size * 0.52 + 60), h = size * 1.5;
        D.outils.tx(wrap, o.micro, x + w / 2 - 6, y + h / 2 + 25, 17, "light", "end", { fill: "#55524B", halo: "#F7F7F1", haloW: 6 }); }
      const n = c.node(wrap, o.parent || c.hud);
      if (o.at != null) jaillit(n, o.at, x, y, 0.3);
      if (o.until != null) n.hide(o.until, 0.15);
      return n;
    };

    // mention(c, items, o) — items = [de, ar] (une seule) ou [{ at, de, ar }, …] (à la suite, fondu 0,15 s) ;
    //   o.forme "menton" (ÉCRAN, centrée sur (525, 1422)) | "etiquette" (PIÈCE / PAPIER, en bas à gauche) ; o.parent (défaut c.hud)
    const mention = (c, items, o = {}) => {
      const list = typeof items[0] === "string" ? [{ de: items[0], ar: items[1] }] : items, forme = o.forme || "menton";
      return list.map((it, i) => {
        const g = el("g"); D.mention(g, { de: it.de, ar: it.ar, forme });
        const n = c.node(g, o.parent || c.hud), nx = list[i + 1];
        if (it.at != null) n.fade(it.at, i === 0 ? 0.01 : 0.15);
        if (nx && nx.at != null) n.hide(nx.at, 0.12);
        return n;
      });
    };

    // ascenseur(c, parent, defile, o) — la barre du fil (x 868) : elle suit les SAUTS du fil (0,3 px par px), pas le glissement du semis ;
    //   o.y0 (1080 : position au début) · o.pale (t) → 0..1 (le silence : elle pâlit) · o.t0
    const ascenseur = (c, parent, defile, o = {}) => { const d0 = defile(o.t0 != null ? o.t0 : c.start), y0 = o.y0 || 1080;
      return c.sk((g, p) => D.ascenseur(g, p), (t) => ({ pale: o.pale ? rnd(o.pale(t), 10) : 0 }), 868, 0, 1, 0, parent)
        .on((t, s) => { s.y += clamp(y0 + 0.3 * (defile(t) - d0), 590, 1200); }); };

    // compteur(c, parent, at, o) — le petit « 7 » de la scène 11 (Kalam 40 px, (838, 1208)) : de 1 à o.n (7), un pas toutes les o.dt (0,09 s)
    const compteur = (c, parent, at, o = {}) => { const a = T(at), n = o.n || 7, dt = o.dt || 0.09;
      const nd = c.text("1", o.x || 838, o.y || 1208, o.size || 40, "de", "middle", parent);
      return nd.on((t, s) => { const k = String(clamp(Math.floor((t - a) / dt) + 1, 1, n)); if (nd.textEl.textContent !== k) nd.textEl.textContent = k; s.o *= t >= a ? 1 : 0; }); };

    // fantome(c, o) — SORTIE du téléphone (ÉCRAN → PIÈCE) : D.tel simplifié (mini) dans c.hud, plein cadre à o.at, qui rétrécit en o.dur (0,42 s)
    //   jusqu'à o.vers = [x, y] (pixels de la vidéo : la main), échelle o.k (0,072), rotation o.rot (°) ; puis il s'efface (sauf o.reste).
    //   o.vert : sa bulle est verte · o.eteint (t) → 0..1 · o.parent. Scène 2 : { at: "b2", vers: [541, 1094], rot: 8 } ; scène 6 :
    //   { at: "b5", vers: [508, 1053], k: 0.07 }. Scènes 12 et 21 : prendre le nœud renvoyé et ajouter leur propre mouvement (o.dur: 0).
    const fantome = (c, o = {}) => {
      const a = o.at != null ? T(o.at) : c.start, dur = o.dur == null ? 0.42 : o.dur, v = o.vers || [541, 1094], k = o.k || 0.072, rot = o.rot || 0;
      const n = c.sk((g, p) => D.tel(g, p), (t) => ({ mini: true, vert: o.vert ? 1 : 0, eteint: o.eteint ? rnd(o.eteint(t), 20) : 0 }), 0, 0, 1, 0, o.parent || c.hud);
      if (dur > 0) n.on((t, s) => { const p = E.inOut(prog(t, a, dur)); s.px = 525; s.py = 860; s.s *= Math.exp(Math.log(k) * p); s.x += (v[0] - 525) * p; s.y += (v[1] - 860) * p; s.r += rot * p;
        if (!o.reste) s.o *= t < a + dur ? 1 : 0; });
      return n;
    };

    /* telephone(c, o) — le squelette de TOUTE scène ÉCRAN (storyboard « Conventions ») :
     *   c.hud ─ fond (papier à points, TROUÉ à la place de l'écran en T-NOTIF, + 4 petites formes) ─ tel (nœud-groupe : buzz, punch, entrées)
     *     [ corps D.tel · page découpée (couches : ecran, contenu, barre, tete, bande, saisie, asc, reflet) · verre D.telVerre · dessus · menton ]
     *   ─ notif (bannières, découpées par l'écran).
     *   o.entree "coupe" (défaut : même fil, même instant) | "notif" (T-NOTIF : écran troué, la page se déroule de t0 + 0,04 à + 0,36, bannière
     *            o.banniere de t0 à t0 + 0,9 — scène déclarée in: "cut", inDur: 0.36) | "plongee" (depuis la main : o.depuis = [x, y, k] ;
     *            inDur 0.4) | "montee" (il monte de 760 px en vibrant ; inDur 0.36)
     *   o.at (défaut : début de la scène) · o.date · o.dateAvant (T-NOTIF : l'ancienne date glisse vers le haut à t0 + 0,9) · o.batt (0..1)
     *   o.mention ([de, ar] ou [{ at, de, ar }…]) · o.formes { seed, pts, at } · o.reflet false
     * Renvoie { tel, fond, page, ecran, contenu, barre, tete, bande, saisie, asc, reflet, verre, dessus, menton, notif, t0, m } :
     *   tel = Node ; toutes les couches sont des <g> (parent des c.node / c.sk / c.text / k.chip({ parent }) de la scène). */
    const telephone = (c, o = {}) => {
      c_ = c;
      const m = M.of(c), t0 = o.at != null ? T(o.at) : c.start, ent = o.entree || "coupe", trou = ent === "notif";
      const fg = el("g"), pid = motifPoints(), fd = "M-300 -300 H1380 V2220 H-300 Z" + (trou ? " " + D.outils.rrectInv(TEL.ex, TEL.ey, TEL.ew, TEL.eh, TEL.er) : "");
      el("path", { d: fd, fill: "var(--paper)" }, fg); el("path", { d: fd, fill: `url(#${pid})` }, fg);
      const fond = c.node(fg, c.hud), fo = o.formes || {};
      m.shapes({ seed: fo.seed || 7, pts: fo.pts || [[108, 430], [962, 330], [962, 610], [108, 1210]], at: fo.at }).forEach((n) => fg.appendChild(n.g));
      const tel = c.group(c.hud);
      D.tel(el("g", {}, tel.g), { ecran: trou ? "trou" : "plein" });
      const page = el("g", { "clip-path": decoupe(c, "pg" + (++uidHud), trou ? t0 + 0.04 : null, 0.32) }, tel.g), P = { tel, fond, page, t0, m };
      ["ecran", "contenu", "barre", "tete", "bande", "saisie", "asc", "reflet"].forEach((k) => (P[k] = el("g", {}, page)));
      el("rect", { x: TEL.ex, y: TEL.ey, width: TEL.ew, height: TEL.eh, fill: "#FCFCF9" }, P.ecran);
      D.barreEtat(P.barre, { date: null, batt: o.batt });
      if (trou && o.dateAvant != null) {   // la date bascule à t0 + 0,9 (glisse de −20 px + fondu, 0,2 s)
        const sw = t0 + 0.9;
        if (o.dateAvant) c.text(o.dateAvant, 202, 333, 22, "de", "start", P.barre).on((t, s) => { const p = E.out(prog(t, sw, 0.2)); s.y -= 20 * p; s.o *= 1 - p; });
        if (o.date) c.text(o.date, 202, 333, 22, "de", "start", P.barre).on((t, s) => { const p = E.out(prog(t, sw, 0.2)); s.y += 20 * (1 - p); s.o *= p; });
      } else if (o.date) c.text(o.date, 202, 333, 22, "de", "start", P.barre);
      P.verre = el("g", {}, tel.g); D.telVerre(P.verre, {});
      P.dessus = el("g", {}, tel.g); P.menton = el("g", {}, tel.g);
      const nb = "nb" + (++uidHud), cp = el("clipPath", { id: nb }, st.defs); el("path", { d: U.rrect(TEL.ex, TEL.ey, TEL.ew, TEL.eh, TEL.er) }, cp);
      P.notif = el("g", { "clip-path": `url(#${nb})` }, c.hud);
      if (ent === "notif" && o.banniere !== false) P.banniere = banniere(c, Object.assign({ at: t0, until: t0 + 0.9, x: 215, y: 316, w: 620, h: 88, dist: 100, parent: P.notif }, o.banniere || {}));
      else if (ent === "plongee") { const d = o.depuis || [525, 1100, 0.072]; zoomTel(tel, t0, d[0], d[1], d[2] || 0.072, 0.4); fond.fade(t0 + 0.1, 0.3); }
      else if (ent === "montee") { tel.on((t, s) => { s.y += 760 * (1 - E.out(prog(t, t0, 0.36))); }); buzz(tel, t0 + 0.2, 8); fond.fade(t0, 0.3); }
      if (o.reflet !== false) {   // le reflet traverse l'écran au début de la scène (0,5 s), dans la découpe
        const rg = el("g"), a = t0 + (ent === "coupe" ? 0 : 0.36); D.reflet(rg, {});
        c.node(rg, P.reflet).on((t, s) => { const p = prog(t, a, 0.5); s.o *= p > 0 && p < 1 ? 1 : 0; s.x += lerp(150, 1330, E.inOut(p)); s.y += TEL.ey; });
      }
      if (o.mention) P.mentions = mention(c, o.mention, { forme: "menton", parent: P.menton });
      return P;
    };

    /* ═══════════════════════════ AIDES PARTAGÉES — X.aides (en plus de TEL, VERT, MEMBRES, punch, buzz, defileur, semisY, zoomTel, decoupe) ═══════════════════════════ */

    // avatarVif(c, parent, qui, x, y, r, fn, o) — avatar rond (D.avatar) VIVANT : clignement en deux états (décalé : o.k, défaut rang dans
    //   MEMBRES + 3), regard, expression. fn(t) → { expr, look2, headTilt, badge, anneau, vide } (valeurs arrondies ici). talk : toujours 0.
    const avatarVif = (c, parent, qui, x, y, r, fn, o = {}) => { const kb = o.k != null ? o.k : MEMBRES.indexOf(qui) + 3;
      return c.sk((g, p) => D.avatar(g, p), (t) => { const e = (fn && fn(t)) || {};
        return { r, anneau: e.anneau || o.anneau || "encre", badge: e.badge !== undefined ? e.badge : o.badge || null, vide: !!e.vide,
          p: Object.assign({}, CAST[qui], { expr: e.expr || o.expr || "neutral", blink: blinkAt(t, kb) > 0.5 ? 1 : 0, talk: 0,
            look2: e.look2 ? [rnd(e.look2[0], 2), rnd(e.look2[1], 2)] : [0, 0.5], headTilt: e.headTilt ? Math.round(e.headTilt) : 0 }) }; }, x, y, 1, 0, parent); };

    // bulleFil(c, parent, x, y, w, h, pointe, o) — D.bulle posée en (x, y) (coin haut-gauche) ; pointe en pixels ABSOLUS (null : sans queue).
    //   o = { mat ("blanc" | "vert" | "jaune"), brouillon, at (elle jaillit de sa pointe), until, seed }
    const bulleFil = (c, parent, x, y, w, h, pointe, o = {}) => {
      const pr = { w, h, tip: pointe ? [pointe[0] - x, pointe[1] - y] : null, mat: o.mat || "blanc", brouillon: !!o.brouillon, seed: o.seed || 801 };
      const n = c.sk((g, p) => D.bulle(g, p), () => pr, x, y, 1, 0, parent);
      if (o.at != null) jaillit(n, o.at, pointe ? pointe[0] : x + w / 2, pointe ? pointe[1] : y + h, 0.3);
      if (o.until != null) n.hide(o.until, 0.1);
      return n;
    };

    // tape(c, parent, str, x, y, size, cls, at, dur, anchor) — texte tapé (c.write) ; défaut : une ligne de 40 signes en 0,45 s
    const tape = (c, parent, str, x, y, size, cls, at, dur, anchor) => c.write(c.text(str, x, y, size, cls || "de", anchor || "start", parent), at, dur || Math.max(0.15, str.length * 0.0112));
    // curseur(c, parent, x, y, de, a, o) — barre 3 × 28 (encre) qui clignote à 2 Hz ; x : nombre ou fonction de t ; y = ligne de base
    const curseur = (c, parent, x, y, de, a, o = {}) => { const t1 = de != null ? T(de) : -1e9, t2 = a != null ? T(a) : 1e9, g = el("g");
      el("rect", { x: 0, y: -22, width: 3, height: o.h || 28, fill: INK }, g);
      return c.node(g, parent).on((t, s) => { s.x += typeof x === "function" ? x(t) : x; s.y += typeof y === "function" ? y(t) : y; s.o *= t >= t1 && t < t2 && ((t - t1) * 2) % 1 < 0.55 ? 1 : 0; }); };

    /* brouillon(c, parent, o) — LE brouillon des scènes 8 → 11 (storyboard § 4, « Le brouillon ») : SA bulle, w 584, en (214, 1216 − h),
     * h = 44 + 42 n (le bas reste à y 1216, pointe (806, 1246), son avatar en (832, 1262) ; le haut monte). Ligne i (0 → 8) : base à
     * haut + 52 + 42 i, x 238, « de light » 26 px. parent = le fil (P.fil.g : il défile avec lui). Texte : LIGNES (GROS_MOT pour L6).
     *   o.n0 : lignes au début · o.etapes [{ at, n, d (0,25 s) }] : la bulle grandit · o.ecrit { i: [at, durée] } pour L1–L6 (c.write) ;
     *   { 6: at } / { 7: at } : L7 / L8 (barre, mot qui saute, barre) · o.mots9 [6 repères] : L9 mot à mot (sans o.mots9 : L9 entière si n0 = 9)
     *   — une ligne d'indice < n0 sans entrée dans o.ecrit est déjà là ; une ligne ≥ n0 sans entrée reste cachée.
     *   o.terne (t) → opacité des lignes L1–L8 (scène 10 : 0,55) · o.elle (t) → { expr, look2, headTilt, dy } (son avatar)
     *   o.envoi : repère du départ (scène 11) : la bulle verte gagne de gauche à droite (wipe 0,35 s), le pointillé s'efface, le curseur aussi
     *   o.envoyee : déjà partie (verte dès le début) · o.curseur false : sans curseur
     * Renvoie { bulle, verte, lignes[9] (Node), avatar, n(t), h(t), haut(t), yLigne(i, t), xMot(i, debut), souligne(i, avant, mot, at) }. */
    const LIGNES = ["Nur zu Jedermanns Info …", "… seinen Dienst am Freitag übernommen", "Obwohl ich einen Wochenendausflug für 549 €",
      "gebucht hatte, den ich bezahlen musste.", "Auch diesen Dienst am Sonntag Tag habe ich",
      GROS_MOT ? "übernommen … mein WE eh im Arsch war …" : "übernommen … mein WE eh im A… war …", null, null, "Vielleicht sitzt aber ein Pups quer."];
    const MOTS9 = ["Vielleicht", "sitzt", "aber", "ein", "Pups", "quer."];
    const brouillon = (c, parent, o = {}) => {
      c_ = c;
      const mes = (s) => D.outils.mesure(s, 26, "light"), n0 = o.n0 || 0, et = (o.etapes || []).map((e) => ({ a: T(e.at), n: e.n, d: e.d || 0.25 }));
      const nAt = (t) => { let n = n0, prev = n0; for (const e of et) { n += (e.n - prev) * E.out(prog(t, e.a, e.d)); prev = e.n; } return n; };
      const hAt = (t) => Math.round(44 + 42 * nAt(t)), haut = (t) => 1216 - hAt(t), yLigne = (i, t) => 1224 + 42 * i - 42 * nAt(t);
      const envoi = o.envoi != null ? T(o.envoi) : o.envoyee ? -1e9 : 1e9;
      const dessin = (mat, br) => c.sk((g, p) => D.bulle(g, p), (t) => { const h = hAt(t); return { w: 584, h, tip: [592, 30 + h], mat, brouillon: br }; }, 214, 0, 1, 0, parent).on((t, s) => { s.y += haut(t); });
      const bulle = dessin("blanc", true).on((t, s) => { s.o *= t < envoi + 0.35 ? 1 : 0; });
      let verte = null;
      if (o.envoi != null || o.envoyee) { verte = dessin("vert", false); if (o.envoi != null) verte.wipe(envoi, 0.35); }
      const lg = c.group(parent).on((t, s) => { s.y -= 42 * nAt(t); });   // repère des lignes : ligne i à y 1224 + 42 i quand n = 0
      const ecrit = o.ecrit || {}, info = [], lignes = [];
      for (let i = 0; i < 9; i++) {
        const yb = 1224 + 42 * i, li = c.group(lg.g), deja = i < n0 && ecrit[i] == null; lignes.push(li);
        if (o.terne && i < 8) li.on((t, s) => { s.o *= o.terne(t); });
        if (i < 6) {
          const nd = c.text(LIGNES[i], 238, yb, 26, "de light", "start", li.g);
          if (deja) info[i] = { full: LIGNES[i], a: -1e9, d: 0 };
          else if (ecrit[i] != null) { const a = T(ecrit[i][0]), d = ecrit[i][1] || 0.45; c.write(nd, a, d); info[i] = { full: LIGNES[i], a, d }; }
          else nd.on((t, s) => { s.o *= 0; });
        } else if (i < 8) {
          const [b1, mot, b2] = i === 6 ? [150, "Diagnosen", 220] : [90, "Laborwerte", 270], wm = D.outils.mesure(mot, 26, "de");
          const a = deja ? null : ecrit[i] != null ? T(ecrit[i]) : 1e9, xm = 238 + b1 + 12, x2 = xm + wm + 12;
          const g1 = el("g", { transform: `translate(238 ${yb - 22})` }); D.caviar(g1, { w: b1, seed: 70 + i });
          const n1 = c.node(g1, li.g), mt = c.text(mot, xm, yb, 26, "de", "start", li.g);
          const g2 = el("g", { transform: `translate(${Math.round(x2)} ${yb - 22})` }); D.caviar(g2, { w: b2, seed: 80 + i });
          const n2 = c.node(g2, li.g);
          if (a != null) { n1.wipe(a, 0.25); jaillit(mt, a + 0.2, xm + wm / 2, yb - 9, 0.25); n2.wipe(a + 0.3, 0.25); }
          info[i] = a == null ? { fin: x2 + b2, a: -1e9 } : a < 1e8 ? { fin: x2 + b2, a: a + 0.3 } : null;
        } else {   // L9 : UN <text> de six <tspan> (un par mot) dont fill-opacity passe à 1 à son repère (même procédé que la loupe)
          const g9 = el("g"), tt = el("text", { x: 238, y: yb, "font-size": 26, class: "de light" }, g9);
          const tsp = MOTS9.map((w, j) => { const s = el("tspan", {}, tt); s.textContent = (j ? " " : "") + w; return s; });
          c.node(g9, li.g);
          const mt9 = o.mots9 ? o.mots9.map((x) => T(x)) : MOTS9.map(() => (n0 >= 9 ? -1e9 : 1e9));
          c.tick((t) => tsp.forEach((s, j) => { const v = t >= mt9[j] ? "1" : "0"; if (s.getAttribute("fill-opacity") !== v) s.setAttribute("fill-opacity", v); }));
          info[8] = { mots: mt9 };
        }
      }
      const xFin = (t) => {   // le bout du texte en cours d'écriture : le curseur s'y place (calcul déterministe, comme c.write)
        for (let i = 8; i >= 0; i--) { const q = info[i]; if (!q) continue;
          if (i === 8) { let k = -1; q.mots.forEach((mm, j) => { if (t >= mm) k = j; }); if (k >= 0 || nAt(t) >= 8.5) return [238 + (k >= 0 ? mes(MOTS9.slice(0, k + 1).join(" ")) + 4 : 0), 8]; continue; }
          if (t < q.a) continue;
          if (q.fin) return [q.fin + 8, i];
          return [238 + mes(q.full.slice(0, Math.round(q.full.length * prog(t, q.a, q.d)))) + 4, i];
        } return [238, 0]; };
      if (o.curseur !== false) { const g = el("g"); el("rect", { x: 0, y: -22, width: 3, height: 28, fill: INK }, g);
        c.node(g, parent).on((t, s) => { const [x, i] = xFin(t); s.x += x; s.y += yLigne(i, t); s.o *= t < envoi && (t * 2) % 1 < 0.55 ? 1 : 0; }); }
      const avatar = avatarVif(c, parent, "ELLE", 832, 1262, 32, o.elle, { k: 1 }).on((t, s) => { const e = o.elle && o.elle(t); if (e && e.dy) s.y += e.dy; });
      const xMot = (i, debut) => 238 + mes(debut);
      // surligneur jaune SOUS un mot d'une ligne (il se trace, wipe 0,25 s) : souligne(2, "Obwohl ich einen Wochenendausflug für ", "549 €", "b7@1+0.3")
      const souligne = (i, avant, mot, at) => { const g = el("g"), x = xMot(i, avant) - 4, w = mes(mot) + 8, yb = 1224 + 42 * i;
        el("path", { d: U.rrect(x, yb - 19, w, 24, 6), fill: "#F8CE4E", opacity: 0.85 }, g);
        const n = c.node(g); lignes[i].g.insertBefore(n.g, lignes[i].g.firstChild); return n.wipe(at, 0.25); };
      return { bulle, verte, lignes, avatar, n: nAt, h: hAt, haut, yLigne, xMot, souligne };
    };

    /* ═══════════════════════════ MISES EN PLACE FIXES — X.lieux (une fonction par lieu) ═══════════════════════════
     * Chaque lieu pose le décor COMPLET à ses coordonnées (storyboard § 2 et § 4), le construit (cascade) et le fait vivre, et renvoie ses
     * nœuds. Les personnages qui JOUENT (ELLE, LUI) sont posés par les scènes dans la place prévue (slot) ; le lieu ne règle pas la caméra.
     *   ÉCRAN : X.lieux.fil · contact · plans · appel · regle   (tous = X.hud.telephone + le contenu de l'écran ; mêmes options d'entrée)
     *   PIÈCE : X.lieux.salle (scènes 2, 7, 14) · salon (scène 6)        PAPIER : X.lieux.papier (scènes 12, 21) */
    const lieux = {};

    // fil(c, o) — le fil « Ärzte-AC » (scènes 1, 3, 5, 8–11, 17, 18) : en-tête, bande, semis qui remonte, fil qui défile, saisie, ascenseur.
    //   o (+ options de telephone) : titre, sous (en-tête ; titre absent = la scène l'écrit) · filY / filH (découpe du fil : 574 / 726 ;
    //   scène 5 : 690 / 610) · defile (t) → px (defileur(…)) · semisStop (repère : le semis s'arrête, scène 11) · semis false
    //   · saisie { curseur, parti, appui } (valeurs ou fonctions de t) · pale (t) → 0..1 (ascenseur) · ascY0
    //   Renvoie P (telephone) + { fil (Node qui défile ; la scène y pose bulles et avatars en coordonnées « défilement 0 »), clipFil, semis,
    //   saisieN, ascN, defile }.
    lieux.fil = (c, o = {}) => {
      const P = telephone(c, o), defile = o.defile || (() => 0), fy = o.filY || TEL.filY, fh = o.filH || TEL.filH;
      D.enTete(P.tete, { titre: o.titre, sous: o.sous });
      D.bande(P.bande, {});
      const clip = c.clipped(TEL.filX, fy, TEL.filW, fh, P.contenu);
      let semis = null;
      if (o.semis !== false) { const sg = el("g", { transform: `translate(${TEL.filX} ${fy})` }), sy = semisY(P.t0, o.semisStop != null ? T(o.semisStop) : 1e9); D.semis(sg, {});
        semis = c.node(sg, clip).on((t, s) => { s.y -= sy(t); }); }
      const fil = c.group(clip).on((t, s) => { s.y -= defile(t); }), sa = o.saisie || {};
      const saisieN = c.sk((g, p) => D.saisie(g, p), (t) => ({ curseur: val(sa.curseur, t, true) && (t * 2) % 1 < 0.55 ? 1 : 0, parti: val(sa.parti, t, 0) ? 1 : 0, appui: rnd(val(sa.appui, t, 0), 10) }), 0, 0, 1, 0, P.saisie);
      const ascN = ascenseur(c, P.asc, defile, { t0: P.t0, pale: o.pale, y0: o.ascY0 });
      return Object.assign(P, { fil, clipFil: clip, semis, saisieN, ascN, defile });
    };

    // contact(c, o) — la fiche « contact » de l'intro (scène 4) : icônes au trait en haut, barre d'accueil ; le SOCLE y pose la photo, le ruban
    //   « Yassine », @dr.aguilo, les pastilles, le cœur et le bouton (parent P.contenu). o.etoile (t) → { a, pleine } (elle tourne à i3@j'aime).
    lieux.contact = (c, o = {}) => {
      const P = telephone(c, Object.assign({ reflet: true }, o));
      P.fiche = c.sk((g, p) => D.ficheContact(g, p), (t) => { const e = o.etoile ? o.etoile(t) : {}; return { a: Math.round(e.a || 0), pleine: e.pleine ? 1 : 0 }; }, 0, 0, 1, 0, P.tete);
      return P;
    };

    // plans(c, o) — l'application « Plans » (scène 13) : champ de recherche (mini-avatar de LUI qui cligne), quadrillage, carte de
    //   l'Allemagne du socle (geoAt(500, 866, 74), Berlin), boussole qui oscille, bande de papier au-dessus de la carte.
    //   o.carteAt : la carte jaillit (pivot (500, 866)) · o.avatar false. Renvoie P + { geo, zone (découpe (172, 574, 706, 596)), carte (Node :
    //   la scène y met l'épingle et les ondes, dans(P.carte.g, …), et l'agrandit ×1,2 autour de l'épingle), champ }.
    lieux.plans = (c, o = {}) => {
      const P = telephone(c, o);
      D.champRecherche(P.tete, {});
      if (o.avatar !== false) P.avatarLui = avatarVif(c, P.tete, "LUI", 826, 393, 22, () => ({ expr: "focused" }));
      D.plansUI(el("g", {}, P.contenu), { partie: "fond" });
      const zone = c.clipped(172, 574, 706, 596, P.contenu), geo = geoAt(500, 866, 74), carte = c.group(zone);
      const map = el("g", {}, carte.g), C = U.ctx(map, 4243, false, 1);
      el("path", { d: "M" + DE.map((p) => geo(...p).map((v) => v + 7).join(" ")).join(" L") + " Z", fill: "#D2D2CB" }, map);
      U.shape(C, "de", "M" + DE.map((p) => geo(...p).join(" ")).join(" L") + " Z", MAT.grey, { sw: 3.2 });
      const [lx, ly] = geo(13.4, 52.52); el("circle", { cx: lx, cy: ly, r: 7, fill: INK }, map); U.text(map, "Berlin", lx, ly - 16, 24, { fill: "#55524B" });
      if (o.carteAt != null) jaillit(carte, o.carteAt, 500, 866, 0.35, 0.3);
      P.ui = c.sk((g, p) => D.plansUI(g, p), (t) => ({ partie: "dessus", a: Math.round(7 * Math.sin((t / 2.6) * 2 * Math.PI)) }), 0, 0, 1, 0, P.contenu);
      D.bande(P.bande, {});
      return Object.assign(P, { geo, zone, carte });
    };

    // appel(c, o) — l'appel vidéo du tribunal (scènes 15–16) : bande remontée (y 346 → 486), tuile A (salle d'audience : fond → JUG, AS1,
    //   AS2 → table), tuile B (fond neutre → ELLE), liserés jaunes, commandes, plaque de nom.
    //   o.tuilesAt : les deux tuiles grandissent (scène 15 : "b14+0.4", 0,08 s d'écart ; défaut : déjà là) · o.actif [{ at, tuile: "A" | "B" | null }]
    //   (liseré « parole », fondus croisés 0,2 s) · o.micro (t) → 0..1 · o.dossier (t), o.eau (t) · o.plaque false (la scène pose la sienne)
    //   o.jug / o.as1 / o.as2 (t) → paramètres Persona EN PLUS (talk, armR, headTilt…) · o.elle (t) → paramètres d'ELLE (sinon : la scène la pose
    //   dans P.elle : pp(400, 1500, 1.12, fn, P.elle)). Renvoie P + { tuileA, tuileB (Node), clipA, clipB, juges, elle, liseres, commandes, plaque }.
    lieux.appel = (c, o = {}) => {
      const P = telephone(c, o);
      D.bande(P.bande, { y0: 346, y1: 486 });
      const tuile = (x, y) => { const grp = c.group(P.contenu); return { grp, clip: c.clipped(x, y, 658, 384, grp.g), cadre: el("g", { transform: `translate(${x} ${y})` }) }; };
      const A = tuile(196, 496), B = tuile(196, 896);
      // A : la salle d'audience ; les trois juges dessinés une fois, seuls blink / talk / headTilt / regard changent (R23)
      D.salleAudience(el("g", { transform: "translate(196 496)" }, A.clip), { partie: "fond" });
      const juge = (qui, x, y, s, k, base, extra) => pp(x, y, s, (t) => Object.assign({}, CAST[qui], PP.stand, { view: "front", blink: blinkAt(t, k) > 0.5 ? 1 : 0, talk: 0 }, base(t), extra ? extra(t) : {}), A.clip);
      const juges = {
        AS1: juge("AS1", 330, 892, 0.64, 5, () => ({ expr: "calm", look2: [0.2, 0.3] }), o.as1),
        AS2: juge("AS2", 720, 892, 0.64, 9, () => ({ expr: "neutral", look2: [0, 0.8] }), o.as2),
        JUG: juge("JUG", 525, 900, 0.72, 7, (t) => ({ expr: "focused", look2: [0, 0.8], headTilt: (t % 1.3) < 0.3 ? 0 : 6 }), o.jug),   // elle écrit, se redresse toutes les 1,3 s
      };
      c.sk((g, p) => D.salleAudience(g, p), (t) => ({ partie: "table", dossier: o.dossier ? rnd(o.dossier(t), 10) : 0, eau: o.eau ? Math.round(o.eau(t)) : Math.round(2 * Math.sin(t * 3.1)) }), 196, 496, 1, 0, A.clip);
      A.grp.g.appendChild(A.cadre); D.tuile(A.cadre, {});
      // B : son fond ; ELLE (si o.elle) ou la place pour la scène
      D.fondNeutre(el("g", { transform: "translate(196 896)" }, B.clip));
      const elleG = el("g", {}, B.clip);
      if (o.elle) P.elleN = pp(400, 1500, 1.12, (t) => Object.assign({}, CAST.ELLE, { view: "front", armL: [-8, 10], armR: [40, -112], expr: "focused", blink: blinkAt(t, 1) > 0.5 ? 1 : 0, talk: 0 }, o.elle(t)), elleG);
      B.grp.g.appendChild(B.cadre); D.tuile(B.cadre, {});
      // liserés « parole » (deux nœuds, fondus croisés)
      const sw = (o.actif || []).map((q) => ({ a: T(q.at), q: q.tuile })).sort((p, q) => p.a - q.a);
      const opAt = (k) => (t) => { let v = 0; for (const q of sw) v = lerp(v, q.q === k ? 1 : 0, E.inOut(prog(t, q.a, 0.2))); return v; };
      const liseres = { A: [196, 496, "A"], B: [196, 896, "B"] };
      Object.keys(liseres).forEach((k) => { const [x, y] = liseres[k], g = el("g", { transform: `translate(${x} ${y})` }); D.tuile(g, { lisere: "seul" }); const op = opAt(k);
        liseres[k] = c.node(g, (k === "A" ? A : B).grp.g).on((t, s) => { s.o *= op(t); }); });
      if (o.tuilesAt != null) { const m = M.of(c); m.build(A.grp, o.tuilesAt, "grow", { pivot: [525, 688], dur: 0.3 }); m.build(B.grp, T(o.tuilesAt) + 0.08, "grow", { pivot: [525, 1088], dur: 0.3 }); }
      const commandes = c.sk((g, p) => D.commandes(g, p), (t) => ({ micro: o.micro ? rnd(o.micro(t), 10) : 0 }), 0, 0, 1, 0, P.contenu);
      let plaque = null;
      if (o.plaque !== false) { const pg = el("g", { transform: "translate(212 1222)" }); D.plaqueNom(pg, {}); plaque = c.node(pg, B.grp.g); }
      return Object.assign(P, { tuileA: A.grp, tuileB: B.grp, clipA: A.clip, clipB: B.clip, juges, elle: elleG, liseres, commandes, plaque });
    };

    // regle(c, o) — les pages de la règle (scènes 19–20) : ruban jaune « القاعدة » dans la zone de l'en-tête (il ondule ±1°, 3 s), bande,
    //   papier uni (pas de semis, pas de saisie). o.rubanAt : le ruban se déroule (wipe ←, 0,3 s ; défaut : déjà là). Renvoie P + { ruban }.
    lieux.regle = (c, o = {}) => {
      const P = telephone(c, o);
      D.bande(P.bande, {});
      const ruban = kit(c).ribbon("القاعدة", 525, 396, { size: 46, style: "yellow", parent: P.tete });
      if (o.rubanAt != null) ruban.wipe(o.rubanAt, 0.3, "rtl");
      ruban.on((t, s) => { s.px = 525; s.py = 396; s.r += Math.sin((t / 3) * 2 * Math.PI); });
      return Object.assign(P, { ruban });
    };

    // salle(c, o) — la salle des médecins (scènes 2, 7, 14), monde (caméra { s: 1, cx: 540, cy: 920 }) ; ordre du § 2 E.
    //   o.at (défaut : début de la scène) · o.cascade (défaut true : construction en cascade de la scène 2 ; false : tout est là — la pièce
    //   monte avec in: "slideUp") · o.tableauDrop (défaut = cascade ; scène 7 : true) · o.blouses 1 | 2 (2 : la sienne, avec badge, à droite —
    //   scène 14) · o.machine (défaut true : vapeur, voyant, goutte ; false : éteinte, scène 14) · o.widget : null (trois post-it au mur) |
    //   paramètres D.widgetDate { petit: true, … } (objet ou fonction de t) · o.widgetAt (il jaillit) · o.aimants [{ qui, case: "fr"|"sa"|"so" }]
    //   (nœuds DANS le tableau : ils suivent son balancement ; la scène les fait tomber / claquer) · o.porte (t) → 0..1
    //   Renvoie { piece, porte, pateres, blouses[], tableau, aimants[], postits[], widget, plan, machine, vapeur, tasses, plante }.
    lieux.salle = (c, o = {}) => {
      c_ = c;
      const m = M.of(c), t0 = o.at != null ? T(o.at) : c.start, cas = o.cascade !== false, td = o.tableauDrop != null ? o.tableauDrop : cas, R = {};
      const b = (n, dt, kind, opt) => { if (cas) m.build(n, t0 + dt, kind, opt); return n; };
      R.piece = m.obj(D.piece, 0, 0, 1, { sol: "lino", solY: 1130 });
      R.porte = b(c.sk((g, p) => D.porte(g, p), (t) => ({ ouverte: o.porte ? rnd(o.porte(t), 20) : 0 }), 195, 1130), 0.04, "growY", { pivot: [195, 1130], dur: 0.35 });
      R.pateres = b(m.obj(D.pateres, 348, 606), 0.08, "drop", { dist: 200, dur: 0.4 });
      R.blouses = [[328, 620, false], [378, 620, true]].slice(0, o.blouses === 2 ? 2 : 1).map(([x, y, badge], i) => {
        const n = b(m.obj(D.blouse, x, y, 1, { badge }), 0.14 + 0.04 * i, "drop", { dist: 200, dur: 0.4 });
        if (cas) m.pend(n, t0 + 0.54 + 0.04 * i, 7, [x, y], { idle: 0 });
        return m.sway(n, 1, 3.6, [x, y], i * 1.7); });
      R.tableau = m.obj(D.tableauGardes, 564, 540);
      if (td) m.build(R.tableau, t0 + 0.12, "drop", { dist: 260, dur: 0.45 });
      m.pend(R.tableau, t0 + 0.57, td ? 3 : 0, [564, 540], { idle: 0.3 });
      const cases = { fr: [478, 690], sa: [564, 690], so: [650, 690] };
      R.aimants = (o.aimants || []).map((q) => { const [x, y] = cases[q.case] || cases.fr, g = el("g", { transform: `translate(${x} ${y})` }); D.aimant(g, { qui: q.qui }); return c.node(g, R.tableau.g); });
      if (o.widget) {
        R.widget = c.sk((g, p) => D.widgetDate(g, p), (t) => val(o.widget, t, {}), 811, 536);
        if (o.widgetAt != null) jaillit(R.widget, o.widgetAt, 811, 604, 0.25, 0.3); else b(R.widget, 0.2, "grow", { pivot: [811, 604], dur: 0.3 });
        R.postits = [];
      } else {
        R.postits = [0, 1, 2].map((i) => { const ctr = [[-27, -45], [22, -33], [-5, 4]][i], pv = [810 + ctr[0], 600 + ctr[1]];
          const n = m.obj(D.troisPostit, 810, 600, 1, { i }); if (cas) jaillit(n, t0 + 0.2 + 0.05 * i, pv[0], pv[1] + 23, 0.3);
          return m.sway(n, 3, 2.4, pv, i * 2.1); });
      }
      R.plan = b(m.obj(D.planDeTravail, 749, 1150), 0.18, "rise", { dist: 200, dur: 0.4 });
      const allumee = o.machine !== false;
      R.machine = b(c.sk((g, p) => D.machineCafe(g, p), (t) => (allumee ? { voyant: t % 1 < 0.5 ? 1 : 0, goutte: (t % 1.4) < 0.5 ? rnd((t % 1.4) / 0.5, 20) : 0 } : { voyant: 0, goutte: 0 }), 766, 1010), 0.26, "drop", { dist: 240, dur: 0.45 });
      if (allumee) R.vapeur = c.sk((g, p) => D.vapeur(g, p), (t) => ({ t: rnd((t % 1.8) / 1.8, 20) }), 789, 964).on((t, s) => { s.o *= cas ? clamp((t - t0 - 0.7) * 4, 0, 1) : 1; });
      R.tasses = b(m.obj(D.tasses, 676, 1010), 0.32, "drop", { dist: 160, dur: 0.4 });
      R.plante = b(m.obj(D.plante, 847, 1010), 0.36, "grow", { pivot: [847, 1010], dur: 0.4 });
      m.sway(R.plante, 2, 4, [847, 1010]);
      return R;
    };

    // salon(c, o) — le salon (scène 6), monde ; ordre du § 2 F : pièce · fenêtre · rideaux · lampadaire · tapis · canapé (dossier → LUI → assise
    //   + plaid, UN seul bloc qui monte : R8) · cône de lumière + poussière · guéridon · tasse qui fume.
    //   o.at · o.cascade (défaut true) · o.lui (t) → paramètres Persona de LUI assis EN PLUS (sinon la scène le pose dans R.lui :
    //   pp(510, 1276, 1.05, fn, R.lui)). Renvoie { piece, fenetre, rideaux[], lampe, cone, poussiere, tapis, canape (Node), lui (slot <g>),
    //   luiN, devant, gueridon, tasse }. Le certificat se pose sur l'accoudoir droit (738, 1040) ; zone libre du mur : x 365 → 745, y 572 → 810.
    lieux.salon = (c, o = {}) => {
      c_ = c;
      const m = M.of(c), t0 = o.at != null ? T(o.at) : c.start, cas = o.cascade !== false, R = {};
      const b = (n, dt, kind, opt) => { if (cas) m.build(n, t0 + dt, kind, opt); return n; };
      R.piece = m.obj(D.piece, 0, 0, 1, { sol: "parquet", solY: 1150, rayures: true });
      R.fenetre = b(c.sk((g, p) => D.fenetre(g, p), (t) => ({ nuage: Math.round((((t * 12) % 260) + 260) % 260 - 130) }), 240, 725), 0.05, "grow", { pivot: [240, 725], dur: 0.35 });
      R.rideaux = [[149, 540, "g", 0.1], [331, 540, "d", 0.14]].map(([x, y, cote, dt], i) => {
        const n = b(m.obj(D.rideau, x, y, 1, { cote }), dt, "swing", { pivot: [x, y], deg: cote === "g" ? -25 : 25, dur: 0.6 });
        return m.sway(n, 1.2, 4.2, [x, y], i * 1.3); });
      const L = D.lampadaire.at;
      R.lampe = b(m.obj(D.lampadaire, L[0], L[1], 1, { partie: "lampe" }), 0.12, "drop", { dist: 260, dur: 0.45 });
      m.pend(R.lampe, t0 + 0.57, cas ? 5 : 0.8, L, { idle: 0.5 });
      R.tapis = b(m.obj(D.tapis, 520, 1340), 0.2, "grow", { pivot: [520, 1340], dur: 0.35 });
      R.canape = c.group();
      D.canapeDos(el("g", { transform: "translate(510 1290)" }, R.canape.g));
      R.lui = el("g", {}, R.canape.g);
      if (o.lui) R.luiN = pp(510, 1276, 1.05, (t) => Object.assign({}, CAST.LUI, { view: "front", armL: [-20, 105], armR: [20, -105], expr: "worried", blink: blinkAt(t, 2) > 0.5 ? 1 : 0, talk: 0 }, o.lui(t)), R.lui).on(breathe(1));
      R.devant = c.sk((g, p) => D.canapeDevant(g, p), (t) => ({ t: rnd((t % 2.2) / 2.2, 20) }), 510, 1290, 1, 0, R.canape.g);
      b(R.canape, 0.16, "rise", { dist: 240, dur: 0.45 });
      R.cone = b(m.obj(D.lampadaire, L[0], L[1], 1, { partie: "cone" }), 0.12, "drop", { dist: 260, dur: 0.45 });
      m.pend(R.cone, t0 + 0.57, cas ? 5 : 0.8, L, { idle: 0.5 });
      const bx = R.cone.out.cone;
      R.poussiere = m.dust({ x: L[0] + bx.x, y: L[1] + bx.y, w: bx.w, h: bx.h }, 10, { cone: true, col: "#FFFBEA", stroke: "#C9B46A", r: 3, speed: 12, seed: 61, from: t0 + 0.6 });
      R.gueridon = b(m.obj(D.gueridon, 188, 1100), 0.24, "rise", { dist: 200, dur: 0.4 });
      R.tasse = b(c.sk((g, p) => D.tasseFumante(g, p), (t) => ({ t: rnd((t % 1.8) / 1.8, 20) }), 189, 1100), 0.3, "drop", { dist: 160, dur: 0.4 });
      return R;
    };

    // papier(c, o) — le fond des scènes PAPIER (12, 21 ; scène déclarée view: false) : papier à points (k.bg), quatre petites formes qui
    //   dérivent (o.formes { seed, pts, at }), étiquette de mention en bas à gauche (o.mention : [de, ar] ou [{ at, de, ar }…]).
    lieux.papier = (c, o = {}) => {
      c_ = c;
      const m = M.of(c), R = { bg: kit(c).bg() }, fo = o.formes || {};
      R.formes = m.shapes({ seed: fo.seed || 12, pts: fo.pts || [[130, 880], [950, 520], [140, 1330], [930, 760]], at: fo.at });
      if (o.mention) R.mentions = mention(c, o.mention, { forme: "etiquette" });
      return R;
    };

    /* ───────── SCÈNES : elles sont écrites dans scenes-1.js … scenes-4.js (une partie de l'épisode par fichier) ─────────
     * Chaque fichier fait : (window.EP_PARTS = window.EP_PARTS || []).push(function (X) { … X.st.scene({ … }) … });
     * X = tout le socle ci-dessus. Dans une scène : const k = X.use(c);  (pose la scène courante pour pp / ph et rend le kit).
     * X.hud = le HUD propre à l'épisode (telephone, pastille, mention, banniere…) ; X.aides = aides partagées (punch, buzz, brouillon…) ;
     * X.lieux = mises en place FIXES (fil, contact, plans, appel, regle, salle, salon, papier) — voir leurs en-têtes plus haut. */
    const X = { sv, st, T, E, prog, lerp, clamp, el, isLatin, SC, K, U, MAT, INK, W, NS, PE, PP, D, M,
      kit, drawDE, geoAt, pinAt, blinkAt, talkAt, rnd, pp, ph, breathe, rl, walkTo,
      CAST, BEAT_IDS, LAST, AFTER_INTRO, AKTE_NO, AKTE_NEXT, TITRE, QUESTION, QUESTION_LIGNES, GROS_MOT,
      hud: { telephone, pastille, mention, banniere, ascenseur, compteur, fantome },
      lieux, aides: { TEL, VERT, MEMBRES, punch, buzz, defileur, semisY, zoomTel, decoupe, jaillit, dans, val, avatarVif, bulleFil, tape, curseur, brouillon, LIGNES, MOTS9 },
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
    /* Scène 22 (storyboard) : 20 cases (les 21 scènes de récit moins l'intro), 5 colonnes × 4 rangées (163 × 183, y 372 → 1134), lecture
     * de droite à gauche ; trois cases figées ailleurs qu'à leur fin (freezeAt : indice de case → repère) : la carte « source » (sc. 9),
     * la loupe et sa traduction (sc. 10), LUI qui marche (sc. 14). Question écrite sur deux lignes, flèche vers le bouton « commentaire ». */
    st.summary({ at: LAST + "@end+0.15", in: "cut", dezoomAt: LAST + "@end+0.5", cols: 5, crop: [262, 1470], top: 372, gap: 10, side: 92,
      freezeAt: { 7: "b8@المستعجلات", 8: "b10@end-0.5", 12: "b13@خلا+0.7" },
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
        k.card(110, 1160, 760, 290, { seed: 990 }).pop(LAST + "@end+2.7", 0.4);
        c.text(QUESTION_LIGNES[0], 490, 1236, 46, "ttl", "middle").wipe(LAST + "@end+2.8", 0.5, "rtl");
        c.text(QUESTION_LIGNES[1], 490, 1302, 52, "ttl", "middle").wipe(LAST + "@end+2.95", 0.5, "rtl");
        c.text("كتب ليا فالكومنتير", 490, 1392, 40, "ar strong", "middle").wipe(LAST + "@end+3.2", 0.5, "rtl");
        c.put(`<path d="M800 1392 C 870 1392, 905 1360, 916 1300 M897 1314 L916 1300 L925 1322" stroke="#1C1A1C" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).wipe(LAST + "@end+3.4", 0.4);
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
