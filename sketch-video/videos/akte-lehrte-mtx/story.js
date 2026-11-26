/* AKTE 06 (numéro provisoire) — Lehrte 2013 · « كلمة وحدة » — socle + distribution + HUD + affiche (copie de videos/_gabarit).
 * Tournure : on suit un OBJET (la lettre de sortie) de main en main. Plongée à 90° sur un bureau, des MAINS (D.main), du papier.
 * Les blocs marqués « SOCLE » appliquent le skill et restent ceux du gabarit ; les scènes sont dans scenes-1.js … scenes-4.js,
 * les dessins dans decor.js, decor-2.js, decor-3.js (window.EpDecor), le déroulé dans storyboard.md (il fait foi).
 * Le seul jaune des scènes de l'histoire = les comprimés, les quatre enveloppes du tribunal, les épingles de la carte :
 *   dans ces scènes, PAS de k.chip(…, { yellow: true }), k.ribbon, k.marker, m.rays, m.shapes, st.vignette (storyboard, conventions).
 * Zones Instagram : contenu entre x 90 et 990 (décor entre 110 et 960) ; rien d'important au-dessus de y 250, sous y 1470,
 * ni dans la colonne des boutons (x > 915, y 980–1650).
 */
(function () {
  "use strict";
  const AKTE_NO = "06", AKTE_NEXT = "07", TITRE = "كلمة وحدة";          // numéros PROVISOIRES : ils n'apparaissent qu'ici
  // question ÉCRITE de l'affiche (jamais dite), sur DEUX lignes (scenario.md § Fin ; storyboard § Affiche-résumé)
  const QUESTION = ["واش عمرك سنيتي على ورقة", "بلا ما تقراها كاملة؟"];
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

    /* ───────── DISTRIBUTION (storyboard § 1) — deux visages Persona seulement ; les quatre médecins ne sont que des MAINS ─────────
     * PAT : le patient, 79 ans. Tête seule (Persona.head, échelle 0,40) dans D.fichePatient, TOUJOURS avec la casquette plate
     *       (D.casquette) : sans elle, c'est la tête du juge d'AKTE 02. Dans le lit (S15–S16) : dessin dédié D.litGeriatrie.
     * RIC : le juge de l'audience (S22 seulement), un seul juge, aucun assesseur ; lèvres seulement de b22@قال à b22@end.
     * Réglages communs : blink: rnd(blinkAt(t, k)) (k = 1 pour PAT, 2 pour RIC) ; respiration .on(breathe(2)) pour RIC.
     * MAINS : paramètres de D.main (decor.js) — who = détail signature, s = échelle du nœud, jeton = chiffre du rond de carton.
     *   M1 Stationsärztin (entre par le BAS, deux mains pour la frappe ; montre ronde à la main GAUCHE : miroir + montre),
     *   M2 contresigne (par la GAUCHE ; stylo-plume ; AUCUN signe de genre), M3 médecin de l'admission (par la DROITE, y ≤ 900 ;
     *   bracelet de perles, stylo à clic), M4 Oberarzt (coin HAUT-DROIT, a −145 ; montre carrée), MT « نتا » (par le BAS,
     *   trait plus épais), MJ la main du juge (coin haut-GAUCHE, a 145, S23 seulement, sans jeton). */
    const CAST = {
      PAT: { look: "oldman", hair: "crown", hairTone: "grey", beard: "moustache", glasses: true, seed: 611 },
      RIC: { look: "man", hair: "bald", hairTone: "brown", beard: "none", glasses: true, outfit: "robe", seed: 606 },
    };
    const MAINS = {
      M1: { who: 1, s: 0.92, jeton: "1" },
      M2: { who: 2, s: 1.0, jeton: "2" },
      M3: { who: 3, s: 0.92, jeton: "3" },
      M4: { who: 4, s: 1.10, jeton: "4" },
      MT: { who: "toi", s: 1.06, jeton: "نتا" },
      MJ: { who: "juge", s: 1.0 },
    };

    /* ═══════════════════════════ HUD PROPRE À L'ÉPISODE (storyboard § 3) ═══════════════════════════
     * Tout est dans c.hud (repère ÉCRAN), recréé dans chaque scène par les quatre aides ci-dessous et piloté par le TEMPS GLOBAL : d'une scène
     * à l'autre rien ne saute. Le HUD du SOCLE (barre de progression #prog, logo #brand masqué pendant l'intro) est plus bas, inchangé.
     * L'intro (S4) n'appelle ni mention ni chaine ; S28 n'a pas de mention.
     *   mention(c, txt, o)   ruban d'étiqueteuse (D.ruban) au bord gauche : X 100, Y 274–310, présent dès la 1re image de la scène (aucun fondu).
     *                        Textes : "LAUT PRESSE" · "REKONSTRUKTION" · "LAUT PRESSE · REKONSTRUKTION" · "ALLGEMEIN · LAUT FACHINFORMATION"
     *                        · "REGEL VON HEUTE · KEINE RECHTSBERATUNG". o.ar = texte arabe à droite du ruban (S14 : « بصفة عامة »), 26 px.
     *   chaine(c)            la chaîne des cinq ronds (D.chaineMains), centre du rond 1 en (780, 302) ; état = etatChaine(t) (tableau du § 3) ;
     *                        absente avant b4@ربعة, puis « pop » 0,3 s à b4@ربعة.
     *   pastille(c, de, ar, at, until, o)   pastille GRISE du haut (k.chip, jamais jaune), centre (o.x || 540, 420), corps o.size || 30,
     *                        « pop » 0,3 s à at (o.show : apparaît sans pop, S1 à t = 0), « hide » 0,15 s à until (null : elle reste).
     *   bord(c, cote)        bord de feuille (D.bordFeuille) : "gauche" pour une entrée slideLeft, "haut" pour slideUp — il passe en tête de la
     *                        feuille qui glisse, puis il est hors champ. */
    const memo = new Map(), TT = (x) => { if (typeof x === "number") return x; if (!memo.has(x)) memo.set(x, T(x)); return memo.get(x); };   // repère → s (une fois)
    const HUD_CH = (() => {
      const q = (x) => TT(x), b4 = q("b4");
      return { pop: q("b4@ربعة"), relaisA: [0.07, 0.50, 0.90, 1.30].map((d) => b4 + d), relaisP: [0.45, 0.85, 1.25, 1.65].map((d) => b4 + d),
        b5: q("b5"), b8: q("b8"), b10: q("b10"), m2a: q("b10@الثانية"), m2p: q("b10@الغلطة"), m3a: q("b12@الثالثة"), m3p: q("b12@شافتهاش+0.3"),
        m4a: q("b13@الرابعة"), m4p: q("b13@8+0.2"), cinq: q("b26-0.30"), fin: q("b29@كتوقفها") };
    })();
    // état de la chaîne à l'instant t (global) : null = absente ; sinon { e: [r1..r4] (0 vide · 1 actif · 2 passé), cinq (0 · 1 pointillé · 2 plein ✓), bat }
    const etatChaine = (t) => {
      const H = HUD_CH;
      if (t < H.pop) return null;
      const e = [0, 0, 0, 0];
      if (t < H.b5 - 0.3) { for (let i = 0; i < 4; i++) e[i] = t >= H.relaisP[i] ? 2 : t >= H.relaisA[i] ? 1 : 0; }               // S3 : le relais
      else if (t < H.b8) { for (let i = 0; i < 4; i++) e[i] = t >= H.b5 + 0.08 * i ? 0 : 2; }                                       // S5 : on reprend au début
      else {
        e[0] = t < H.b10 ? 1 : 2;
        e[1] = t < H.m2a ? 0 : t < H.m2p ? 1 : 2;
        e[2] = t < H.m3a ? 0 : t < H.m3p ? 1 : 2;
        e[3] = t < H.m4a ? 0 : t < H.m4p ? 1 : 2;
      }
      let cinq = 0, bat = 1;
      if (t >= H.fin) { cinq = 2; bat = 1.35 - 0.35 * E.out(prog(t, H.fin, 0.4)); }
      else if (t >= H.cinq) { cinq = 1; bat = 0.4 + 0.6 * E.back(prog(t, H.cinq, 0.3)); }
      return { e, cinq, bat: rnd(bat, 50) };
    };
    const papierTexte = (n) => { const t = n.textEl; t.setAttribute("stroke", "#F7F7F1"); t.setAttribute("stroke-width", "6"); t.setAttribute("stroke-linejoin", "round"); t.setAttribute("paint-order", "stroke"); return n; };
    const mention = (c, txt, o = {}) => {
      const g = el("g", { transform: `translate(${o.x || 100} ${o.y || 292})` }), r = D.ruban(g, { txt });
      const n = c.node(g, c.hud);
      if (o.ar) papierTexte(c.text(o.ar, o.arX || Math.round((o.x || 100) + r.w + 18 + (o.arW || 62)), (o.y || 292) + 9, 26, "ar strong", "middle", c.hud));
      n.w = r.w; return n;
    };
    const chaine = (c) => c.sk((g, p) => D.chaineMains(g, p), (t) => {
      const s = etatChaine(t); if (!s) return { e: [0, 0, 0, 0], cache: 1 };
      return { e: s.e, cinq: s.cinq, bat: s.bat, pul: s.e.includes(1) ? rnd(1 + 0.06 * (1 - Math.cos(t * Math.PI * 4)), 50) : 1 };
    }, 780, 302, 1, 0, c.hud).on((t, s) => { s.o *= t >= HUD_CH.pop ? 1 : 0; }).pop(HUD_CH.pop, 0.3);
    const pastille = (c, de, ar, at, until, o = {}) => {
      const n = kit(c).chip(de, ar, o.x || 540, o.y || 420, o.size || 30, { parent: c.hud, w: o.w, seed: o.seed });
      if (o.show) n.show(at); else n.pop(at, 0.3);
      if (until != null) n.hide(until, 0.15);
      return n;
    };
    const bord = (c, cote = "gauche") => { const g = el("g"); D.bordFeuille(g, { cote }); return c.node(g, c.hud); };

    /* ═══════════════════════════ AIDES PARTAGÉES — X.aides (conventions du storyboard + § 2 « Mobile ») ═══════════════════════════
     *   TT(repère)                 repère → secondes, mis en mémoire (à utiliser dans les fonctions de t : T() relit le minutage à chaque appel)
     *   lettre(c, fn, x, y, s, rot, parent)   LA LETTRE (D.brief) : fn(t) → paramètres de D.brief (ARRONDIS : entiers pour titre, lignes, mtx,
     *                              nfreq, points ; pas de 0,05 pour le reste) ; nœud placé en (x, y), échelle s, rotation rot (n.centre = [x, y]).
     *                              Dans un bureau, parent = L.papier.g (la lettre passe SOUS la fiche du patient et sous les mains).
     *   mainDe(c, cle, fn, o)      UNE MAIN (D.main) : cle "M1"…"M4" | "MT" | "MJ" (MAINS : who, jeton, échelle). fn(t) → { x, y (paume, MONDE),
     *                              a, pose, leve, appui, miroir, montre, sec, stylo, ouvert, clic, jeton (null = sans), js (défaut : balancement
     *                              2°, 1,3 rad/s), grey, op (opacité), souffle (défaut 1 : ± 2 px, 2,4 rad/s ; 0 = immobile), tremble (0–1 :
     *                              ± 3 px à 47 rad/s, ± 1,2° à 53 rad/s) }. o : k (échelle en plus : 0,78 en S22), parent, phase.
     *                              Renvoie le nœud ; n.ancre(nom) → point MONDE d'une ancre (paume, pointe, poignet, jeton) à la dernière image.
     *                              On ne tourne jamais le nœud : l'angle est a (dans le dessin). Portée d'un bras : rester près de la paume.
     *   axe(a)                     vecteur unité le long de l'avant-bras, de la paume vers le coude (a = angle de D.main) : pour entrer / reculer
     *   depuis(t, at, dur, dist, a, ease)  décalage [dx, dy] d'une main qui ENTRE depuis dist px plus loin dans l'axe de son bras (0 à l'arrivée)
     *   pendule(t, at, deg, o)     angle d'un pendule amorti lâché à at (même loi que m.pend) + balancement idle o.idle : jetons, étiquettes…
     *   frappe(c, txt, x, y, size, at, dur, o)   texte FRAPPÉ (D.frappe) : n caractères de at à at + dur (défaut 0,06 s par lettre), anneau
     *                              d'impact, curseur qui clignote (0,5 s) pendant la frappe et jusqu'à o.curJusqua ; o.style, o.parent, o.seed.
     *   comprime(c, x, y, o)       un comprimé jaune (D.comprime) qui respire (± 2 %, 2,2 s) ; o.at : il tombe (drop, o.dist 140, o.dur 0,3) ;
     *                              o.r, o.grey (nombre ou fonction de t), o.i (déphasage), o.parent.
     *   fiche(c, x, y, s, rot, o)  le portrait du patient (D.fichePatient) VIVANT : clignement (1 / 3,4 s), regard qui bouge (± 0,2, 4 s) ;
     *                              o.p(t) → paramètres en plus (expr, look2, deuil, grey, age, blink) ; o.fige : plus aucun mouvement (deuil).
     *   souffle(k), tremble(at, dur)   à poser avec node.on(…) : respiration ± 2 px ; tremblement ± 3 px / ± 1,2°.
     *   figeur(quiet, dur)         la scène muette : { live(t) (1 → 0), tv(t) (horloge qui ralentit puis s'arrête : tout se fige EN PLACE) }.
     *   + HUD : mention, chaine, pastille, bord, etatChaine ; papierTexte(n) (contour papier sous un texte). */
    const axe = (a) => { const r = a * Math.PI / 180; return [-Math.sin(r), Math.cos(r)]; };
    const depuis = (t, at, dur, dist, a, ease = "out") => { const k = (1 - E[ease](prog(t, TT(at), dur))) * dist, u = axe(a); return [u[0] * k, u[1] * k]; };
    const pendule = (t, at, deg, o = {}) => { const u = t - TT(at), k = o.damp || 2.2, w = o.freq || 7.5; return (u < 0 ? 0 : deg * Math.exp(-k * u) * Math.sin(w * u)) + (o.idle || 0) * Math.sin(t * 1.3 + (o.phase || 0)); };
    const souffle = (k) => (t, s) => { s.y += 2 * Math.sin(t * 2.4 + (k || 0)); };
    const tremble = (at, dur = 0.5) => (t, s) => { const a = TT(at); if (t >= a && t < a + dur) { const q = 1 - (t - a) / dur * 0.3; s.x += 3 * q * Math.sin(t * 47); s.y += 2 * q * Math.cos(t * 41); s.r += 1.2 * q * Math.sin(t * 53); } };
    const figeur = (quiet, dur = 0.8) => {
      const q = TT(quiet), live = (t) => 1 - E.inOut(prog(t, q, dur));
      const tv = (t) => { if (t <= q) return t; const u = Math.min(t, q + dur), n = 16; let s = 0; for (let i = 0; i < n; i++) s += live(q + (u - q) * (i + 0.5) / n); return q + s * (u - q) / n; };
      return { live, tv };
    };
    const lettre = (c, fn, x, y, s = 1, rot = 0, parent) => { const n = c.sk((g, p) => D.brief(g, p), fn, x, y, s, rot, parent); n.centre = [x, y]; return n; };
    const mainDe = (c, cle, fn, o = {}) => {
      const M0 = MAINS[cle] || {}, s = (M0.s || 1) * (o.k || 1), ph = o.phase != null ? o.phase : String(cle).charCodeAt(1) * 0.7;
      let cur = { x: 0, y: 0, op: 1, souffle: 1, tremble: 0 };
      const n = c.sk((g, p) => D.main(g, p), (t) => {
        const q = Object.assign({}, fn(t) || {});
        cur = { x: q.x || 0, y: q.y || 0, op: q.op == null ? 1 : q.op, souffle: q.souffle == null ? 1 : q.souffle, tremble: q.tremble || 0 };
        ["x", "y", "op", "souffle", "tremble"].forEach((k) => delete q[k]);
        const p = Object.assign({ who: M0.who, jeton: M0.jeton || null }, q);
        if (p.js == null) p.js = Math.round(2 * Math.sin(t * 1.3 + ph));
        ["leve", "appui", "grey"].forEach((k) => { if (p[k] != null) p[k] = rnd(p[k]); });
        return p;
      }, 0, 0, s, 0, o.parent);
      n.on((t, st) => {
        st.x += cur.x; st.y += cur.y; st.o *= cur.op;
        if (cur.souffle) st.y += 2 * Math.sin(t * 2.4 + ph) * cur.souffle;
        if (cur.tremble) { st.px = 0; st.py = 0; st.x += 3 * cur.tremble * Math.sin(t * 47); st.y += 3 * cur.tremble * Math.cos(t * 41); st.r += 1.2 * cur.tremble * Math.sin(t * 53); }
      });
      n.ancre = (nom) => { const a = (n.out && n.out[nom]) || [0, 0]; return [cur.x + a[0] * s, cur.y + a[1] * s]; };
      n.s = s; return n;
    };
    const frappe = (c, txt, x, y, size, at, dur, o = {}) => {
      const a = TT(at), L = txt.length, d = dur == null ? L * 0.06 : dur, b = o.curJusqua != null ? TT(o.curJusqua) : a + d;
      const n = c.sk((g, p) => D.frappe(g, p), (t) => {
        const q = prog(t, a, d) * L, k = Math.min(L, Math.floor(q + 1e-6)), p = { txt, x: 0, y: 0, size, n: k, style: o.style || "encre", coup: k > 0 && k < L ? rnd(q - k, 5) : 0, cur: t >= a && t < b && (t * 2) % 1 < 0.5 ? 1 : 0, seed: o.seed || 1 };
        if (o.fill) p.fill = o.fill; return p;
      }, x, y, 1, 0, o.parent);
      n.fin = () => (n.out && n.out.fin ? [x + n.out.fin[0], y + n.out.fin[1]] : [x, y]);
      return n;
    };
    const comprime = (c, x, y, o = {}) => {
      const m = M.of(c), gr = o.grey || 0;
      const n = c.sk((g, p) => D.comprime(g, p), (t) => ({ r: o.r || 24, grey: rnd(typeof gr === "function" ? gr(t) : gr) }), x, y, 1, 0, o.parent);
      if (o.at != null) m.build(n, o.at, "drop", { dist: o.dist || 140, dur: o.dur || 0.3 });
      return n.on((t, s) => { s.px = x; s.py = y; s.s *= 1 + 0.02 * Math.sin(t * Math.PI * 2 / 2.2 + (o.i || 0) * 0.9); });
    };
    const fiche = (c, x, y, s = 1, rot = 0, o = {}) => {
      const n = c.sk((g, p) => D.fichePatient(g, p), (t) => {
        const vif = o.fige ? {} : { blink: rnd(blinkAt(t, 1)), look2: [rnd(0.2 * Math.sin(t * Math.PI / 2), 10), rnd(0.1 * Math.sin(t * Math.PI / 2 + 1), 10)] };
        return Object.assign({ expr: "calm", blink: 0, look2: [0, 0] }, vif, o.p ? o.p(t) : {});
      }, x, y, s, rot, o.parent);
      n.centre = [x, y]; return n;
    };

    /* ═══════════════════════════ MISES EN PLACE FIXES — X.lieux (storyboard § 4, « Mises en place FIXES » et « Ce qui vit… ») ═══════════════════════════
     * Chaque lieu pose le décor COMPLET à ses coordonnées monde, le construit en cascade et le fait vivre ; il ne règle pas la caméra et ne
     * pose ni la lettre, ni les mains, ni les textes (la scène le fait, dans les groupes renvoyés, pour garder le bon ordre des couches).
     * Options communes : o.at = début de la cascade (repère ; défaut = début de la scène) · o.cascade false = tout est déjà là (scènes en « cut »
     * qui continuent le même lieu : S7, S9, S12, S13, S16, S21, S23).
     *   X.lieux.bureau(c, m, "A" | "B" | "C", o)   S1–S3, S6–S9, S28 (A) · S11–S13 (B) · S17, S20, S21, S23 (C)
     *   X.lieux.chambre(c, m, o)                   S15, S16          X.lieux.couloir(c, m, o)   S19, S24
     *   X.lieux.hall(c, m, o)                      S18               X.lieux.salle(c, m, o)     S22
     *   X.lieux.page(c, m, o)                      S25–S27 (TA page : le papier à points)
     * Groupes renvoyés (calques, de l'arrière vers l'avant) : papier (la lettre et les feuilles), dessus (fiche du patient), mains (les mains), … */
    const PLACES = {
      A: { lettre: { x: 500, y: 890, s: 0.80, rot: -1.5 }, fiche: { x: 300, y: 640, rot: -6 }, trombone: { x: 355, y: 624, a: 84, k: 1.2 } },
      B: { lettre: { x: 420, y: 960, s: 0.80, rot: 1 }, fiche: { x: 228, y: 715, rot: -5 }, trombone: { x: 281, y: 652, a: 85, k: 1.1 } },
    };
    const lieux = {}, f2 = (v) => Math.round(v * 10) / 10, hash = Stage.hash;
    const cascade = (c, m, o) => { const a0 = o.at != null ? TT(o.at) : c.start, on = o.cascade !== false;
      return (node, dt, kind, opt) => { if (on && kind) m.build(node, a0 + dt, kind, opt); return node; }; };
    const chocsDe = (o) => (o.chocs || []).map(TT);
    const sautAt = (t, chocs) => { let v = 0; for (const a of chocs) { const u = t - a; if (u >= 0 && u < 0.3) v = Math.max(v, Math.sin(u / 0.3 * Math.PI)); } return rnd(v, 10); };

    /* bureau(c, m, kind, o) — LE BUREAU VU DE DESSUS.
     *  A (Lehrte) complet : plateau · halo (500, 890) r 400 + poussière · lampe (tête (190, 500), base (60, 330)) · plante (885, 470) · tasse (840, 640)
     *    + vapeur · encreur (205, 820) · tampon (205, 905) · coupelle (205, 1030) (+ 2 trombones libres) · stylo bille (pointe (775, 725)) ·
     *    clavier (500, 1240) · [papier : la lettre, PLACES.A.lettre] · fiche du patient (300, 640) rot −6° + trombone (355, 624) a 84, k 1,2.
     *    Cascade (S6, relative à o.at) : 0 lampe (swing) · 0,05 clavier (rise 200) · 0,10 tasse (drop ; onde à 0,45) · 0,12 plante (grow) ·
     *    0,15 encreur + tampon (left) · 0,20 coupelle (left) · 0,25 stylo (right, puis 12° de roulis).
     *  A version "accroche" (S1, S3, S28) : plateau, halo, lampe, tasse (770, 1185), coupelle (215, 1045), encreur (215, 1215) ; rien d'autre.
     *    o.tasse false (S28) · o.encreur false (S3). Cascade (S1) : 0 lampe · 0,05 tasse (drop 200, 0,35 s ; onde à 0,40) · 0,10 coupelle (left 200) · 0,16 encreur.
     *  B (2e clinique) : plateau B · ombres du store (8 bandes −20°, 26 px, 6 %, ± 6 px / 3 s) · porte-bloc Aufnahme (770, 760) · téléphone (760, 1150)
     *    + cordon (m.pend 6° puis 1°) · verre (790, 1300) · [papier : PLACES.B.lettre] · enveloppe vide (290, 1320) rot −8° si o.enveloppe ·
     *    fiche (228, 715) rot −5° + trombone (281, 652) a 85, k 1,1. Cascade (S11) : 0,05 porte-bloc (drop 220) · 0,12 téléphone (right 200) · 0,18 verre (drop).
     *  C (justice) : plateau C · lampe de banquier (215, 575) + chaînette (m.pend 1,2°) · carrousel à tampons (860, 600) (± 3°, 4 s) ·
     *    halo (500, 900) r 380 + poussière. Cascade (S17, S20) : 0 lampe (drop 140) · 0,10 carrousel (grow). Le reste change à chaque scène.
     * o (en plus de at, cascade, version) : haloR (t → rayon ; S1 : 420 → 330) · halo (t → facteur d'opacité, S28 : +10 %) · chocs [repères] (les
     *   trombones sautent) · touche (t → [rangée, colonne] du clavier) · coche (nombre ou t → 0–3, porte-bloc B) · fiche false | { entre (repère :
     *   elle glisse depuis la gauche, 0,4 s), trombone (repère : il se pose, 0,2 s), p (t → expression…), fige } · enveloppe (B) · onde (repère : onde du café)
     * → { plateau, halo, poussiere, lampe, chainette, tasse, vapeur, plante, encreur, tampon, coupelle, stylo, clavier, form, telephone, cordon, verre,
     *     enveloppe, carrousel, store, fiche, trombone, papier, dessus, mains, place } */
    lieux.bureau = (c, m, kind = "A", o = {}) => {
      m = m || M.of(c); c_ = c;
      const B = cascade(c, m, o), a0 = o.at != null ? TT(o.at) : c.start, acc = o.version === "accroche", R = { kind, place: PLACES[kind] || null }, chocs = chocsDe(o);
      R.plateau = m.obj(D.plateau, 0, 0, 1, { kind });
      if (kind === "B") {   // ombres d'un store : la lumière de ce bureau (pas de lampe)
        const g = el("g"); for (let i = -3; i < 9; i++) el("path", { d: `M${-200 + i * 150} -240 l26 0 l${f2(-2400 * Math.tan(20 * Math.PI / 180))} 2400 l-26 0 Z`, fill: "#1C1A1C", opacity: 0.06 }, g);
        R.store = c.node(g).on((t, s) => { s.x += 6 * Math.sin(t * Math.PI * 2 / 3); });
      }
      // halo + poussière (A, C)
      if (kind !== "B") {
        const hx = kind === "C" ? 500 : 500, hy = kind === "C" ? 900 : 890, hr = kind === "C" ? 380 : 400;
        R.halo = m.obj(D.halo, hx, hy, 1, { r: hr }).on((t, s) => { s.px = hx; s.py = hy; if (o.haloR) s.s *= o.haloR(t) / hr; s.o *= (1 + 0.04 * Math.sin(t * 2.1)) * (o.halo ? o.halo(t) : 1); });
        R.poussiere = m.dust({ x: 240, y: 620, w: 520, h: 560 }, 10, { speed: 8, op: 0.7, stroke: "#B9B9B2", seed: kind === "C" ? 17 : 7 });
      }
      if (kind === "A") {
        // lampe d'architecte : la tête oscille autour de sa base
        R.lampe = m.obj(D.lampe, 190, 500, 1, {}).on((t, s) => { s.px = 60; s.py = 330; s.r += 0.6 * Math.sin(t * 1.3); });
        B(R.lampe, 0, "swing", { pivot: [60, 330], dur: 0.4 });
        const tasse = o.tasse === false ? null : o.tasse || (acc ? [770, 1185] : [840, 640]);
        if (tasse) {
          const onde = o.onde != null ? TT(o.onde) : a0 + (acc ? 0.40 : 0.45);
          R.tasse = c.sk((g, p) => D.tasse(g, p), (t) => ({ refl: Math.round((t / 14 * 360) % 360 / 6) * 6, onde: rnd(prog(t, onde, 0.6), 10) }), tasse[0], tasse[1]);
          R.vapeur = c.sk((g, p) => D.vapeur(g, p), (t) => ({ ph: rnd((t / 2.4) % 1, 25) }), tasse[0], tasse[1]);
          B(R.tasse, acc ? 0.05 : 0.10, "drop", { dist: 200, dur: 0.35 }); B(R.vapeur, (acc ? 0.05 : 0.10) + 0.3, "grow", { pivot: tasse });
        }
        if (!acc) { R.plante = m.obj(D.plante, 885, 470, 1, {}); m.sway(R.plante, 1.5, 3.2, [885, 470]); B(R.plante, 0.12, "grow", { pivot: [885, 470] }); }
        const enc = o.encreur === false ? null : o.encreur || (acc ? [215, 1215] : [205, 820]);
        if (enc) { R.encreur = m.obj(D.encreur, enc[0], enc[1], 1, {}); B(R.encreur, acc ? 0.16 : 0.15, "left", { dist: 220 }); }
        if (!acc) { R.tampon = c.sk((g, p) => D.tampon(g, p), () => ({ h: 0 }), 205, 905); B(R.tampon, 0.15, "left", { dist: 220 }); }
        const cp = o.coupelle === false ? null : o.coupelle || (acc ? [215, 1045] : [205, 1030]);
        if (cp) { R.coupelle = c.sk((g, p) => D.coupelle(g, p), (t) => ({ saut: sautAt(t, chocs) }), cp[0], cp[1]); B(R.coupelle, acc ? 0.10 : 0.20, "left", { dist: 200 }); }
        if (!acc) {
          const ar = a0 + 0.25;   // le stylo arrive en roulant : 12° de roulis qui s'amortit
          R.stylo = c.sk((g, p) => D.stylo(g, p), (t) => ({ kind: "bille", a: o.cascade === false ? -24 : Math.round(-24 - 12 * (1 - E.out(prog(t, ar + 0.2, 0.4)))) }), 775, 725);
          B(R.stylo, 0.25, "right", { dist: 260 });
          R.clavier = c.sk((g, p) => D.clavier(g, p), (t) => ({ touche: o.touche ? o.touche(t) : null }), 500, 1240);
          B(R.clavier, 0.05, "rise", { dist: 200 });
        }
      }
      if (kind === "B") {
        R.form = c.sk((g, p) => D.formAufnahme(g, p), (t) => ({ coche: rnd(typeof o.coche === "function" ? o.coche(t) : o.coche || 0, 10) }), 770, 760);
        B(R.form, 0.05, "drop", { dist: 220 });
        const at = a0 + 0.12;
        R.cordon = m.obj((g) => D.telephone(g, { kind: "cordon" }), 704, 1110, 1, {}); m.pend(R.cordon, o.cascade === false ? -10 : at + 0.3, 6, [704, 1110], { idle: 1 });
        R.telephone = m.obj((g) => D.telephone(g, { cordon: 0 }), 760, 1150, 1, {});
        B(R.cordon, 0.12, "right", { dist: 200 }); B(R.telephone, 0.12, "right", { dist: 200 });
        R.verre = c.sk((g, p) => D.verre(g, p), (t) => ({ eau: Math.round(2 * Math.sin(t * Math.PI * 2 / 2.2)) }), 790, 1300);
        B(R.verre, 0.18, "drop", { dist: 200 });
      }
      if (kind === "C") {
        R.lampe = m.obj((g) => D.lampe(g, { kind: "banquier", chaine: 0 }), 215, 575, 1, {});
        R.chainette = m.obj((g) => D.lampe(g, { kind: "chainette" }), 267, 603, 1, {}); m.pend(R.chainette, o.cascade === false ? -10 : a0 + 0.3, 8, [267, 603], { idle: 1.2 });
        B(R.lampe, 0, "drop", { dist: 140 }); B(R.chainette, 0, "drop", { dist: 140 });
        R.carrousel = c.sk((g, p) => D.porteTampons(g, p), (t) => ({ a: Math.round(3 * Math.sin(t * Math.PI * 2 / 4)) }), 860, 600);
        B(R.carrousel, 0.10, "grow", { pivot: [860, 600] });
      }
      // calques pour la scène : papier (lettre, feuilles) → dessus (fiche du patient) → mains
      R.papier = c.group();
      if (kind === "B" && o.enveloppe) R.enveloppe = m.obj((g) => D.enveloppeBlanche(g, { vide: 1, a: -8 }), 290, 1320, 1, {});
      R.dessus = c.group();
      const P = PLACES[kind];
      if (P && o.fiche !== false && !(kind === "A" && acc && !o.fiche)) {
        const F = o.fiche || {};
        R.fiche = fiche(c, P.fiche.x, P.fiche.y, 1, P.fiche.rot, { p: F.p, fige: F.fige, parent: R.dessus.g });
        R.trombone = c.sk((g, p) => D.trombone(g, p), (t) => ({ k: P.trombone.k, a: P.trombone.a, saut: sautAt(t, chocs) }), P.trombone.x, P.trombone.y, 1, 0, R.dessus.g);
        if (F.entre != null) { R.fiche.slide(F.entre, -300, 0, 0.4); }
        if (F.trombone != null) R.trombone.slide(F.trombone, 40, -40, 0.2, "back"); else if (F.entre != null) R.trombone.slide(F.entre, -300, 0, 0.4);
      }
      R.mains = c.group();
      return R;
    };
    /* chambre(c, m, o) — LA CHAMBRE DE GÉRIATRIE, de face (S15, S16). Tout suit le § 4 : chambre · fenêtre (265, 740) + tache de lumière au sol +
     *   poussière · voilage (tringle (422, 565)) · tisane (330, 905) · calendrier « semaine » (clou (590, 618)) · potence (361, 1010) + trapèze ·
     *   chevet (262, 1300) + pilulier (262, 1108) + lunettes (290, 1104) · canne (178, 1300) · LIT + PATIENT (610, 1300) · casquette pendue
     *   (crochet (356, 1004), échelle 0,5) · pantoufles (518, 1294). Personne d'autre.
     * o : tv (t → horloge de la vie : figeur(…).tv ; défaut t) · live (t → 1…0 : amplitude des mouvements) · grey (t → 0…1) · jour (t → 1…0,55) ·
     *   souffle (t → 0…1, poitrine ; défaut : (sin(2π t / 2,9) + 1) / 2) · cal (t → { n, coin }) · calAt (repère : le calendrier tombe sur son clou ;
     *   absent = il est déjà là) · pendAt (repère : trapèze et casquette lâchés, 6° et 5°) · pilulier (n, défaut 7) · quiet (repère : la poussière
     *   s'immobilise à quiet + 0,6 — S16)
     * → { chambre, fenetre, lumiere, poussiere, voilage, tisane, calendrier, potence, trapeze, chevet, pilulier, lunettes, canne, lit, casquette,
     *     pantoufles, avant (groupe pour les feuillets qui tombent, devant tout) } */
    lieux.chambre = (c, m, o = {}) => {
      m = m || M.of(c); c_ = c;
      const tv = o.tv || ((t) => t), live = o.live || (() => 1), gr = (t) => rnd(o.grey ? o.grey(t) : 0, 20), jour = (t) => (o.jour ? o.jour(t) : 1);
      const R = {};
      R.chambre = m.obj(D.chambre, 0, 0, 1, {});
      // tache de lumière au sol : opacité 0,28 (jour 1) → 0,10 (jour 0,55), ± 6 % (2,3 s)
      R.lumiere = c.put(`<path d="M250 905 L400 905 L560 1300 L330 1300 Z" fill="#FFFDF2"/>`)
        .on((t, s) => { s.o *= lerp(0.10, 0.28, clamp((jour(t) - 0.55) / 0.45, 0, 1)) * (1 + 0.06 * Math.sin(tv(t) * Math.PI * 2 / 2.3)); });
      R.fenetre = c.sk((g, p) => D.fenetre06(g, p), (t) => ({ jour: rnd(jour(t)), br: rnd(1.2 * Math.sin(tv(t) * Math.PI * 2 / 3.4), 10), tf: rnd(tv(t), 25), grey: gr(t) }), 265, 740);
      R.poussiere = m.dust({ x: 300, y: 920, w: 240, h: 360 }, 8, { speed: 7, to: o.quiet != null ? TT(o.quiet) + 0.6 : 1e9 });
      R.voilage = m.obj(D.voilage, 422, 565, 1, {}).on((t, s) => { const u = tv(t); s.px = 422; s.py = 565; s.r += 0.9 * Math.sin(u * Math.PI * 2 / 3.1) * live(t); s.sx *= 1 + 0.02 * Math.sin(u * 1.7) * live(t); });
      R.tisane = c.sk((g, p) => D.tasseTisane(g, p), (t) => ({ ph: rnd((tv(t) / 2.6) % 1, 25), vap: rnd(live(t), 10), grey: gr(t) }), 330, 905);
      R.calendrier = c.sk((g, p) => D.calendrier(g, p), (t) => Object.assign({ kind: "semaine", n: 1, coin: 0, grey: gr(t) }, o.cal ? o.cal(t) : {}), 590, 618);
      if (o.calAt != null) { m.build(R.calendrier, o.calAt, "drop", { dist: 120, dur: 0.3 }); m.pend(R.calendrier, TT(o.calAt) + 0.3, 4, [590, 618], { idle: 0 }); }
      R.potence = m.obj(D.potence, 361, 1010, 1, {});
      R.trapeze = m.obj(D.trapeze, 470, 806, 1, {}).on((t, s) => { s.px = 470; s.py = 806; s.r += (2 * Math.sin(tv(t) * Math.PI * 2 / 3) + (o.pendAt != null ? pendule(tv(t), o.pendAt, 6) : 0)) * live(t); });
      R.chevet = c.sk((g, p) => D.chevet(g, p), (t) => ({ grey: gr(t) }), 262, 1300);
      R.pilulier = c.sk((g, p) => D.pilulierMini(g, p), (t) => ({ n: o.pilulier != null ? o.pilulier : 7, grey: gr(t) }), 262, 1108);
      R.lunettes = m.obj(D.lunettesPliees, 290, 1104, 1, {});
      R.canne = m.obj(D.canne, 178, 1300, 1, {});
      R.lit = c.sk((g, p) => D.litGeriatrie(g, p), (t) => ({ souffle: rnd(o.souffle ? o.souffle(t) : (Math.sin(t * Math.PI * 2 / 2.9) + 1) / 2, 10), grey: gr(t) }), 610, 1300);
      R.casquette = c.sk((g, p) => D.casquette(g, p), (t) => ({ pendue: 1, grey: gr(t) }), 356, 1004, 0.5)
        .on((t, s) => { s.px = 356; s.py = 1004; s.r += (1.5 * Math.sin(tv(t) * 1.3) + (o.pendAt != null ? pendule(tv(t), o.pendAt, 5) : 0)) * live(t); });
      R.pantoufles = m.obj(D.pantoufles, 518, 1294, 1, {});
      R.avant = c.group();
      return R;
    };

    /* couloir(c, m, o) — LE COULOIR AUX QUATRE CHAISES, de face (S19, S24) : couloir · quatre chaises au sol (x = 235, 420, 605, 790 ; y 1300) ·
     *   sur chaque dossier, le vêtement de la main i avec son jeton i (D.blousePosee, ancre (x, 960)) · fiche du patient en deuil ×1,2 pendue au mur,
     *   centre (300, 745), punaise + halo blanc. Les étiquettes de prix, le ruban « § 222 StGB » et la maison de l'association : la scène.
     *   Cascade (S19) : 0,06·i chaises (rise 220) · 0,20 + 0,06·i vêtements (drop 200), jetons lâchés.
     * o : fiche (false | true | repère : elle apparaît en fondu 0,4 s) · grey (t → 0…1)
     * → { couloir, chaises[4], blouses[4], fiche, halo, x: [235, 420, 605, 790], assise: 1132 (bord avant des assises), devant (groupe) } */
    lieux.couloir = (c, m, o = {}) => {
      m = m || M.of(c); c_ = c;
      const B = cascade(c, m, o), a0 = o.at != null ? TT(o.at) : c.start, X4 = [235, 420, 605, 790], gr = (t) => rnd(o.grey ? o.grey(t) : 0, 20), R = { x: X4, assise: 1132 };
      R.couloir = m.obj(D.couloir, 0, 0, 1, {});
      if (o.fiche !== false && o.fiche != null) {
        R.halo = c.put(`<circle cx="300" cy="745" r="150" fill="#FFFFFF" opacity="0.3"/>`);
        R.fiche = fiche(c, 300, 745, 1.2, 0, { fige: true, p: () => ({ deuil: 1, grey: 1, blink: 0, expr: "neutral" }) })
          .on((t, s) => { s.px = 300; s.py = 643; s.r += 0.8 * Math.sin(t * 1.3); });
        R.punaise = c.put(`<circle cx="303" cy="647" r="7" fill="rgba(28,26,28,.18)"/><circle cx="300" cy="643" r="7" fill="#BDBDB6" stroke="#1C1A1C" stroke-width="2"/>`);
        if (o.fiche !== true) [R.halo, R.fiche, R.punaise].forEach((n) => n.fade(o.fiche, 0.4));
      }
      R.chaises = X4.map((x, i) => B(c.sk((g, p) => D.chaise(g, p), (t) => ({ grey: gr(t) }), x, 1300), 0.06 * i, "rise", { dist: 220 }));
      R.blouses = X4.map((x, i) => {
        const lache = o.cascade === false ? -10 : a0 + 0.20 + 0.06 * i + 0.3;
        return B(c.sk((g, p) => D.blousePosee(g, p), (t) => ({ who: i + 1, n: i + 1, js: Math.round(pendule(t, lache, 14, { idle: 2, phase: i })), ms: rnd(Math.sin(t * Math.PI * 2 / 3 + i), 2), grey: gr(t) }), x, 960), 0.20 + 0.06 * i, "drop", { dist: 200 });
      });
      R.devant = c.group();
      return R;
    };

    /* hall(c, m, o) — LE HALL AUX QUATRE BOÎTES AUX LETTRES, de face (S18) : hall · quatre boîtes (haut y 760, x = 288, 456, 624, 792, porte-noms 1…4)
     *   en couches fond → courrier (groupe : la scène y glisse l'enveloppe) → face → volet · applique (180, 520) · interphone (900, 640) ·
     *   plante de face (190, 1300) · paillasson (540, 1332) · porte-parapluies (835, 1300).
     *   Cascade (S18) : 0,05·i boîtes (drop 260, 0,4 s) puis m.pend 2° · 0,10 applique (grow) · 0,15 plante (growY) · 0,20 paillasson (rise) ·
     *   0,25 porte-parapluies (rise).
     * o : ouv ((i, t) → 0…1 : volet de la boîte i) · claque ((i) → repère où le volet claque (m.pend 24°), ou null)
     * → { hall, boites: [{ x, fond, courrier, face, volet }], applique, interphone, plante, paillasson, parapluies } */
    lieux.hall = (c, m, o = {}) => {
      m = m || M.of(c); c_ = c;
      const B = cascade(c, m, o), a0 = o.at != null ? TT(o.at) : c.start, R = {};
      R.hall = m.obj(D.hall, 0, 0, 1, {});
      R.applique = c.sk((g, p) => D.applique(g, p), (t) => { const k = Math.floor(t * 9); return { lum: hash(k) > 0.82 ? 0.86 : hash(k + 3) > 0.9 ? 0.92 : 1 }; }, 180, 520);
      B(R.applique, 0.10, "grow", { pivot: [180, 520] });
      R.interphone = m.obj(D.interphone, 900, 640, 1, {});
      R.boites = [288, 456, 624, 792].map((x, i) => {
        const tenue = (n) => { B(n, 0.05 * i, "drop", { dist: 260, dur: 0.4 }); return m.pend(n, o.cascade === false ? -10 : a0 + 0.05 * i + 0.4, 2, [x, 760], { idle: 0.15 }); };
        const bx = { x };
        bx.fond = tenue(m.obj((g) => D.boiteLettres(g, { couche: "fond", n: i + 1 }), x, 760, 1, {}));
        bx.courrier = tenue(c.group());
        bx.face = tenue(m.obj((g) => D.boiteLettres(g, { couche: "face", n: i + 1 }), x, 760, 1, {}));
        bx.volet = tenue(c.sk((g, p) => D.boiteLettres(g, p), (t) => ({ couche: "volet", n: i + 1, ouv: rnd(o.ouv ? o.ouv(i, t) : 0, 20) }), x, 760));
        const cl = o.claque ? o.claque(i) : null; if (cl != null) m.pend(bx.volet, cl, 24, [x, 760], { idle: 0 });
        return bx;
      });
      R.plante = c.sk((g, p) => D.plante(g, p), (t) => ({ kind: "face", a: rnd(1.6 * Math.sin(t * Math.PI * 2 / 3.4), 5) }), 190, 1300);
      B(R.plante, 0.15, "growY", { pivot: [190, 1300] });
      R.paillasson = B(m.obj(D.paillasson, 540, 1332, 1, {}), 0.20, "rise", { dist: 160 });
      R.parapluies = B(c.sk((g, p) => D.porteParapluies(g, p), (t) => ({ a: rnd(Math.sin(t * Math.PI * 2 / 3.2), 2) }), 835, 1300), 0.25, "rise", { dist: 160 });
      return R;
    };

    /* salle(c, m, o) — LA SALLE D'AUDIENCE, de face (S22) : salle (lambris y 900–1150, estrade 1150–1168) · néon (540, 300) qui grésille ·
     *   fenêtre à lamelles (215, 720) + rai de lumière sur le lambris + poussière · calendrier « date » (clou (850, 620)) · [juge : groupe pour RIC,
     *   pp(540, 1150, 0.9, …)] · pupitre (540, 1150) avec la pile de chemises et la petite lampe · table des quatre (bord arrière y 1180) ·
     *   [table : groupe pour les rubans JEDER et les mains].
     *   Cascade (S22, relative à o.at = b22-0.30) : +0,05 pupitre (rise) · +0,10 fenêtre (grow) · +0,15 calendrier (drop + m.pend 4°).
     * o : cal (t → { coin }) · neon (t → 0,86…1 ; défaut : grésillement par salves ≈ 9 Hz)
     * → { salle, neon, fenetre, rai, poussiere, calendrier, juge, pupitre, table, devant } */
    lieux.salle = (c, m, o = {}) => {
      m = m || M.of(c); c_ = c;
      const B = cascade(c, m, o), a0 = o.at != null ? TT(o.at) : c.start, R = {};
      const lum = o.neon || ((t) => { const k = Math.floor(t * 9); return hash(Math.floor(t * 1.3)) > 0.55 && hash(k * 7) > 0.5 ? 0.86 : 1; });
      R.salle = m.obj(D.salleAG, 0, 0, 1, { lueur: 0 });
      R.neon = c.put(`<defs><radialGradient id="ep06neonL" cx="50%" cy="0%" r="70%"><stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/><stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient></defs>`
        + `<ellipse cx="540" cy="312" rx="330" ry="120" fill="url(#ep06neonL)" opacity="0.55"/>`).on((t, s) => { s.o *= lum(t) < 0.95 ? 0.45 : 1; });
      R.tube = c.put(`<rect x="352" y="302" width="376" height="7" rx="3.5" fill="#BDBDB6"/>`).on((t, s) => { s.o *= lum(t) < 0.95 ? 0.8 : 0; });
      R.rai = c.put(`<path d="M150 852 L285 852 L470 1150 L262 1150 Z" fill="#FFFDF2" opacity="0.30"/>`);
      R.fenetre = c.sk((g, p) => D.fenetreLames(g, p), (t) => ({ ph: rnd((t / 2.6) % 1, 25) }), 215, 720);
      B(R.fenetre, 0.10, "grow", { pivot: [215, 720] }); B(R.rai, 0.25, "grow", { pivot: [215, 852] });
      R.poussiere = m.dust({ x: 180, y: 860, w: 200, h: 280 }, 10, { speed: 8, op: 0.75, stroke: "#B9B9B2", seed: 22 });
      R.calendrier = c.sk((g, p) => D.calendrier(g, p), (t) => Object.assign({ kind: "date" }, o.cal ? o.cal(t) : {}), 850, 620);
      B(R.calendrier, 0.15, "drop", { dist: 160, dur: 0.35 }); m.pend(R.calendrier, o.cascade === false ? -10 : a0 + 0.5, 4, [850, 620], { idle: 0.3 });
      R.juge = c.group();
      R.pupitre = B(m.obj(D.pupitreAG, 540, 1150, 1, {}), 0.05, "rise", { dist: 260 });
      R.table = m.obj(D.tablePrevenus, 540, 1180, 1, {});
      R.devant = c.group();
      return R;
    };

    /* page(c, m, o) — TA PAGE (S25–S27) : le papier à points de la série (k.bg). Rien d'autre : c'est ta feuille et ta main. → { fond } */
    lieux.page = (c, m, o = {}) => { c_ = c; return { fond: SketchUI.dots(c) }; };

    const aides = { TT, lettre, mainDe, axe, depuis, pendule, frappe, comprime, fiche, souffle, tremble, figeur, mention, chaine, pastille, bord, etatChaine, papierTexte };

    /* ───────── SCÈNES : elles sont écrites dans scenes-1.js … scenes-4.js (une partie de l'épisode par fichier) ─────────
     * Chaque fichier fait : (window.EP_PARTS = window.EP_PARTS || []).push(function (X) { … X.st.scene({ … }) … });
     * X = tout le socle ci-dessus. Dans une scène : const k = X.use(c);  (pose la scène courante pour pp / ph et rend le kit).
     * X.lieux = mises en place FIXES partagées entre les parties (ex. X.lieux.chambre = (c, o) => { … }). */
    const X = { sv, st, T, E, prog, lerp, clamp, el, isLatin, SC, K, U, MAT, INK, W, NS, PE, PP, D, M,
      kit, drawDE, geoAt, pinAt, blinkAt, talkAt, rnd, pp, ph, breathe, rl, walkTo,
      CAST, MAINS, BEAT_IDS, LAST, AFTER_INTRO, AKTE_NO, AKTE_NEXT, TITRE, QUESTION,
      lieux, aides, places: PLACES,
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
        k.ar(QUESTION[0], 490, 1040, 36, "ttl").wipe(LAST + "@end+2.8", 0.5, "rtl");      // 47 px, deux lignes (storyboard § Affiche-résumé)
        k.ar(QUESTION[1], 490, 1100, 36, "ttl").wipe(LAST + "@end+3.0", 0.5, "rtl");
        k.ar("كتب ليا فالكومنتير", 490, 1185, 32, "ar strong").wipe(LAST + "@end+3.3", 0.5, "rtl");
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
