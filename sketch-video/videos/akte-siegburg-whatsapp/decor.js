/* decor.js — AKTE 07 « الگروپ » : décors et objets PROPRES à l'épisode, 1re partie (aucun dessin repris d'un autre épisode).
 * Suite dans decor-2.js et decor-3.js. Référence : storyboard.md § 2 (inventaire), § 3 (HUD), « Conventions » (constantes TEL).
 * Essai de chaque dessin, seul, sur une planche : node tools/essai_decor.mjs videos/akte-siegburg-whatsapp [--only nom1,nom2]
 *
 * ÉTAT DE L'INVENTAIRE (storyboard § 2) — « fait (decor.js) », « fait (decor-2.js) » ou « à faire »
 *  A. Le téléphone et son interface
 *   D.tel               fait (decor.js)      D.semis           fait (decor.js)      D.reflet          fait (decor.js)
 *   D.telMini           fait (decor.js)      D.barreEtat       fait (decor.js)      D.enTete          fait (decor.js)
 *   D.saisie            fait (decor.js)      D.bulle           fait (decor.js)      D.avatar          fait (decor.js)
 *   D.avatarSil         fait (decor-2.js)    D.avatarPatient   fait (decor.js)      D.avatarToi       à faire (sc. 19)
 *   D.sceau             fait (decor.js)      D.sepDate         fait (decor.js)      D.ligneSysteme    fait (decor-2.js)
 *   D.notif             fait (decor.js)      D.caviar          fait (decor.js)      D.gribouillis     fait (decor.js)
 *   D.pouce             fait (decor-2.js)    D.ascenseur       fait (decor.js)      D.loupeCitation   fait (decor-2.js)
 *  B. Objets du fil
 *   D.icoDienst         fait (decor.js)      D.icoUrlaub       fait (decor.js)      D.icoCadeau       fait (decor.js)
 *   D.billetWeekend     fait (decor-2.js)    D.interdit        à faire (sc. 17)     D.aPayer          à faire (sc. 17)
 *   D.ticketCaisse      à faire (sc. 17 ; le papier commun existe : D.outils.papierTicket)   D.compteRecherche à faire (sc. 18)
 *   D.pointInterro      à faire (sc. 18)     D.camembert       fait (decor-2.js)
 *  C. Appel vidéo, « Plans », fiche contact, coffre
 *   D.tuile             fait (decor-2.js)    D.salleAudience   fait (decor-2.js)    D.fondNeutre      fait (decor-2.js)
 *   D.commandes         fait (decor-2.js)    D.plaqueNom       fait (decor-2.js)    D.champRecherche  fait (decor-2.js)
 *   D.plansUI           fait (decor-2.js)    D.ficheLieu       fait (decor-2.js)    D.ficheContact    fait (decor.js)
 *   D.coffre            à faire (sc. 20)     D.cle             à faire (sc. 20)     D.feuilleDiag     à faire (sc. 20)
 *  D. Papier (scènes 12 et 21) — et le widget date (7, 12, 14)
 *   D.widgetDate        fait (decor-2.js)    D.soleilEte       fait (decor-2.js)    D.enveloppe       fait (decor-2.js)
 *   D.lettre            fait (decor-2.js)    D.stylo           fait (decor-2.js)    D.pageJugement    à faire (sc. 21)
 *   D.chrono            à faire (sc. 21)
 *  E. La salle des médecins (scènes 2, 7, 14)
 *   D.piece             fait (decor.js)      D.porte           fait (decor.js)      D.pateres         fait (decor.js)
 *   D.blouse            fait (decor.js)      D.tableauGardes   fait (decor.js)      D.aimant          fait (decor.js, + « gris » sc. 14)
 *   D.postit            fait (decor.js)      D.troisPostit     fait (decor.js)      D.planDeTravail   fait (decor.js)
 *   D.machineCafe       fait (decor.js)      D.vapeur          fait (decor.js)      D.tasses          fait (decor.js)
 *   D.plante            fait (decor.js)      D.ticketPoche     fait (decor.js)      D.colere          fait (decor.js)
 *   D.poussiere         fait (decor.js)      D.carton          fait (decor-2.js)
 *  F. Le salon (scène 6)
 *   D.fenetre           fait (decor-2.js)    D.rideau          fait (decor-2.js)    D.lampadaire      fait (decor-2.js)
 *   D.canapeDos         fait (decor-2.js)    D.canapeDevant    fait (decor-2.js)    D.gueridon        fait (decor-2.js)
 *   D.tasseFumante      fait (decor-2.js)    D.tapis           fait (decor-2.js)    D.certificat      fait (decor-2.js)
 *  AJOUTS (pièces du HUD et traits à main levée, hors inventaire — voir storyboard.md « Écarts de construction »)
 *   D.telVerre  D.bande  D.mention  D.anneau  D.croix                                  faits (decor.js)
 *   D.accolade  D.fleche                                                               faits (decor-2.js)
 *  RESTE (scènes 17 à 21, decor-3.js) : D.avatarToi, D.interdit, D.aPayer, D.ticketCaisse, D.compteRecherche, D.pointInterro,
 *   D.coffre, D.cle, D.feuilleDiag, D.pageJugement, D.chrono.
 *
 * CONVENTIONS
 *  - Chaque fonction dessine dans le groupe SVG g et reçoit ses paramètres animés dans o (valeurs arrondies : le moteur ne
 *    redessine que si o change) ; elle a des valeurs par défaut (D.nom(g, {}) dessine quelque chose) et peut renvoyer des ancres.
 *  - TROIS sortes d'ancrage :
 *      « écran »  = pixels de la vidéo, ancrage (0,0) = origine de la vidéo : D.tel, D.telVerre, D.barreEtat, D.enTete, D.bande,
 *                   D.saisie, D.mention, D.ficheContact, D.piece (monde). On les pose en (0, 0), ils tombent au bon endroit.
 *      « objet »  = autour de son ancrage local (0,0) : tout le reste (bulle : coin haut-gauche ; avatar : centre ; …).
 *      « meuble » = objet de pièce : ancrage local + position MONDE du storyboard dans D.nom.at = [x, y]
 *                   → m.obj(D.porte, D.porte.at[0], D.porte.at[1])  ou  D.outils.poser(m, "porte", o).
 *  - Trait à main levée : U.ctx(g, graine) puis U.shape / U.stroke ; ombre décalée #D2D2CB ; aucune forme nue.
 *  - Textes : tx(g, texte, x, y, taille, "de" | "light" | "ar" | "ttl", côté VISUEL "start" (gauche) | "middle" | "end" (droite)).
 *  - Partagé avec decor-2.js / decor-3.js : D.TEL, D.VERT (constantes) et D.outils (aides : tx, mesure, ln, bullePath, papierTicket…).
 *  - Teinte de l'épisode : D.VERT (hachure #9CCB98) seulement sur SA bulle envoyée ; #DCEFD9 sur le bouton d'envoi ; aucun autre vert.
 *  - ATTENTION decor-2.js / decor-3.js : tools/essai_decor.mjs les charge AVANT decor.js (ordre alphabétique) ; n'y lire
 *    D.outils, D.TEL, D.VERT qu'À L'INTÉRIEUR des fonctions (jamais au chargement du fichier).
 *  - Planches d'essai lisibles : --cols 2 --cell 540 --per 6 (le cadre #stage fait 1080 × 1920 et rogne le reste).
 */
(function () {
  "use strict";
  const SC = SketchCast, U = SC.util, PE = window.Persona, MAT = (PE && PE.MAT) || SC.MAT, NS = "http://www.w3.org/2000/svg";
  const INK = "#1C1A1C", YEL = "#F8CE4E", OMBRE = "#D2D2CB", ECRAN = "#FCFCF9", PAPIER = "#F7F7F1", GRIS = "#B4B4AE", SOMBRE = "#3A3A37";
  const el = (tag, a, p) => { const n = document.createElementNS(NS, tag); for (const k in a || {}) if (a[k] != null) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; };
  const D = window.EpDecor = window.EpDecor || {};
  const f = (v) => Math.round(v * 10) / 10, clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, p) => a + (b - a) * p;
  const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const ln = (g, d, w, col, extra) => el("path", Object.assign({ d, fill: "none", stroke: col || INK, "stroke-width": w || 2, "stroke-linecap": "round", "stroke-linejoin": "round" }, extra || {}), g);
  const rond = (cx, cy, r) => `M${f(cx - r)} ${f(cy)}A${f(r)} ${f(r)} 0 1 1 ${f(cx + r)} ${f(cy)}A${f(r)} ${f(r)} 0 1 1 ${f(cx - r)} ${f(cy)}Z`;
  const ovale = (cx, cy, rx, ry) => `M${f(cx - rx)} ${f(cy)}A${f(rx)} ${f(ry)} 0 1 1 ${f(cx + rx)} ${f(cy)}A${f(rx)} ${f(ry)} 0 1 1 ${f(cx - rx)} ${f(cy)}Z`;
  // rectangle arrondi parcouru à l'envers : ajouté à un tracé, il y perce un trou (remplissage « nonzero » comme « evenodd »)
  const rrectInv = (x, y, w, h, r) => `M${x + r} ${y}Q${x} ${y} ${x} ${y + r}L${x} ${y + h - r}Q${x} ${y + h} ${x + r} ${y + h}L${x + w - r} ${y + h}Q${x + w} ${y + h} ${x + w} ${y + h - r}L${x + w} ${y + r}Q${x + w} ${y} ${x + w - r} ${y}Z`;
  let uid = 0; const nid = (p) => p + (++uid);

  /* ───────── constantes de l'épisode (storyboard « Conventions ») ───────── */
  const TEL = D.TEL = { x: 150, y: 280, w: 750, h: 1160, r: 64,            // coque
    ex: 172, ey: 302, ew: 706, eh: 1082, er: 42, cx: 525, cy: 860,         // écran, centre
    barre: 346, tete: 440, bande: 574, fil: 1300, saisie: 1384, bas: 1440,  // bas de : barre d'état, en-tête, bande, fil, saisie, menton
    filX: 172, filY: 574, filW: 706, filH: 726 };                           // découpe du fil
  const VERT = D.VERT = { base: "#FCFCF9", hatch: "#9CCB98", gap: 9, fw: 1.3 };   // bulle ENVOYÉE (la teinte de l'épisode)

  /* ───────── textes ───────── */
  try { ["700 20px Kalam", "400 20px Kalam", "20px Lalezar", "700 20px 'Plex Arabic'"].forEach((q) => document.fonts.load(q, "abc ابت")); } catch (e) { /* polices déjà gérées par le moteur */ }
  const FONT = { de: ["Kalam, 'Comic Sans MS', cursive", 700], light: ["Kalam, 'Comic Sans MS', cursive", 400], ar: ["'Plex Arabic', sans-serif", 700], ttl: ["Lalezar, Kalam, sans-serif", 400] };
  // anchor = côté VISUEL du point (x, y) : "start" = le texte commence à gauche de x… même pour l'arabe
  function tx(g, s, x, y, size, kind, anchor, o) {
    kind = kind || "de"; anchor = anchor || "middle"; o = o || {};
    const F = FONT[kind] || FONT.de, rtl = kind === "ar" || kind === "ttl";
    const ta = anchor === "middle" ? "middle" : rtl ? (anchor === "start" ? "end" : "start") : anchor;
    const t = el("text", { x: f(x), y: f(y), "font-family": F[0], "font-weight": F[1], "font-size": size, fill: o.fill || INK, "text-anchor": ta, direction: rtl ? "rtl" : null, transform: o.transform, opacity: o.op }, g);
    if (o.halo) { t.setAttribute("stroke", o.halo === true ? PAPIER : o.halo); t.setAttribute("stroke-width", o.haloW || 6); t.setAttribute("stroke-linejoin", "round"); t.setAttribute("paint-order", "stroke"); }
    t.textContent = s; return t;
  }
  let cv = null;
  function mesure(s, size, kind) {
    const F = FONT[kind || "de"] || FONT.de;
    try { cv = cv || document.createElement("canvas").getContext("2d"); cv.font = `${F[1]} ${size}px ${F[0]}`; const w = cv.measureText(String(s)).width; if (w > 0) return w; } catch (e) { /* estimation ci-dessous */ }
    return String(s).length * size * (kind === "ar" || kind === "ttl" ? 0.46 : 0.5);
  }

  /* ───────── bulle : même tracé que Motion.bubblePath (un seul tracé, la queue part du BAS et vise la bouche / l'avatar) ───────── */
  function bullePath(x, y, w, h, r, tip, bw) {
    if (window.Motion && Motion.bubblePath) return Motion.bubblePath(x, y, w, h, r, tip, bw);
    const x0 = x - w / 2, x1 = x + w / 2, y0 = y - h / 2, y1 = y + h / 2, up = tip && tip[1] < y;
    const bx = tip ? clamp(lerp(tip[0], x, 0.3), x0 + r + bw + 4, x1 - r - bw - 4) : 0;
    const tail = (yy, dir) => { const a = bx + dir * bw, b = bx - dir * bw, my = lerp(yy, tip[1], 0.55);
      return ` L${f(a)} ${f(yy)} Q${f(lerp(a, tip[0], 0.35))} ${f(my)} ${f(tip[0])} ${f(tip[1])} Q${f(lerp(b, tip[0], 0.15))} ${f(my)} ${f(b)} ${f(yy)}`; };
    let d = `M${f(x0 + r)} ${f(y0)}`;
    if (tip && up) d += tail(y0, -1);
    d += ` L${f(x1 - r)} ${f(y0)} Q${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + r)} L${f(x1)} ${f(y1 - r)} Q${f(x1)} ${f(y1)} ${f(x1 - r)} ${f(y1)}`;
    if (tip && !up) d += tail(y1, 1);
    d += ` L${f(x0 + r)} ${f(y1)} Q${f(x0)} ${f(y1)} ${f(x0)} ${f(y1 - r)} L${f(x0)} ${f(y0 + r)} Q${f(x0)} ${f(y0)} ${f(x0 + r)} ${f(y0)} Z`;
    return d;
  }

  /* ───────── papier de ticket de caisse (commun à D.ticketPoche et, plus tard, à D.ticketCaisse) ─────────
   * bande blanche (x, y, w, h), bord bas en dents de scie, ombre décalée, deux fines marges grises. */
  function papierTicket(g, C, key, x, y, w, h, o) {
    o = o || {}; const n = Math.max(6, Math.round(w / 16)), pas = w / n, dent = o.dent || 9;
    let d = `M${f(x)} ${f(y)} L${f(x + w)} ${f(y)} L${f(x + w)} ${f(y + h - dent)}`;
    for (let i = 0; i < n; i++) d += ` L${f(x + w - (i + 0.5) * pas)} ${f(y + h)} L${f(x + w - (i + 1) * pas)} ${f(y + h - dent)}`;
    d += " Z";
    if (o.ombre !== false) el("path", { d, fill: OMBRE, transform: "translate(6 7)" }, g);
    U.shape(C, key, d, MAT.white, { sw: 2.6, r: 0.5 });
    ln(g, `M${f(x + 9)} ${f(y + 6)} L${f(x + 9)} ${f(y + h - dent - 6)} M${f(x + w - 9)} ${f(y + 6)} L${f(x + w - 9)} ${f(y + h - dent - 6)}`, 1.4, "#DADAD3");
    return d;
  }

  /* ═══════════════════════════ A. LE TÉLÉPHONE ET SON INTERFACE ═══════════════════════════ */

  /* D.tel — LE cadre fixe de l'épisode (ancrage « écran » : coordonnées TEL). 750 × 1160.
   * o.ecran "plein" (défaut) | "trou" (coque en anneau : l'écran est transparent, pour T-NOTIF)
   * o.mini  : écran simplifié du fantôme (5 barres grises + une petite bulle ; o.vert 1 = la bulle est hachurée de vert)
   * o.eteint 0..1 : voile sombre sur l'écran.
   * Ordre dans une scène ÉCRAN : D.tel → page découpée (papier, fil, barre d'état, en-tête, bande, saisie…) → D.telVerre → menton. */
  D.tel = (g, o = {}) => {
    const C = U.ctx(g, 4100, false, 1), T = TEL, trou = o.ecran === "trou";
    const ecran = U.rrect(T.ex, T.ey, T.ew, T.eh, T.er), creux = trou ? " " + rrectInv(T.ex, T.ey, T.ew, T.eh, T.er) : "";
    // boutons : volume (à gauche), marche (à droite) — glissés sous la coque
    [[143, 520, 84], [143, 624, 84], [893, 560, 110]].forEach(([x, y, h], i) => {
      el("rect", { x: x + (i < 2 ? 0 : 0), y, width: 14, height: h, rx: 5, fill: SOMBRE, stroke: INK, "stroke-width": 2.2 }, g);
    });
    el("path", { d: U.rrect(T.x + 8, T.y + 10, T.w, T.h, T.r) + creux, fill: "#CFCFC8" }, g);                         // ombre portée (8, 10)
    U.shape(C, "coque", U.rrect(T.x, T.y, T.w, T.h, T.r) + creux, MAT.light, { sw: 4, r: 0.7 });
    ln(g, U.rrect(T.x + 10, T.y + 10, T.w - 20, T.h - 20, T.r - 9), 1.5, "#A1A19B");                                   // liseré intérieur
    if (!trou) el("path", { d: ecran, fill: ECRAN }, g);
    if (o.mini && !trou) {   // écran simplifié (le fantôme rétrécit en 0,4 s : pas de détail)
      ln(g, "M172 440 L878 440", 2.6);
      el("circle", { cx: 252, cy: 393, r: 26, fill: "#E6E6E1", stroke: INK, "stroke-width": 2.6 }, g);
      el("rect", { x: 294, y: 372, width: 190, height: 20, rx: 10, fill: "#C9C9C2" }, g); el("rect", { x: 294, y: 404, width: 280, height: 12, rx: 6, fill: "#E1E1DC" }, g);
      [[262, 620, 330], [262, 706, 250], [262, 792, 380], [262, 878, 290], [262, 964, 210]].forEach(([x, y, w]) => el("rect", { x, y, width: w, height: 46, rx: 20, fill: "#E4E4DE", stroke: "#C4C4BD", "stroke-width": 2 }, g));
      const b = bullePath(620, 1150, 360, 150, 26, [806, 1262], 15);
      el("path", { d: b, fill: "#FFFFFF", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round" }, g);
      if (o.vert) { const id = nid("mb"), cp = el("clipPath", { id }, g); el("path", { d: b }, cp); const h = el("g", { "clip-path": `url(#${id})` }, g);
        for (let i = 0; i < 40; i++) ln(h, `M${330 + i * 14} 1236 l150 -170`, 1.5, VERT.hatch); el("path", { d: b, fill: "none", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round" }, g); }
      [1112, 1146, 1180].forEach((y, i) => el("rect", { x: 470, y, width: [290, 250, 180][i], height: 10, rx: 5, fill: "#C9C9C2" }, g));
      ln(g, "M172 1300 L878 1300", 2.6); el("rect", { x: 196, y: 1314, width: 574, height: 56, rx: 28, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, g);
      el("circle", { cx: 822, cy: 1342, r: 30, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.6 }, g);
    }
    if (!trou && o.eteint > 0) el("path", { d: ecran, fill: SOMBRE, opacity: f(clamp(o.eteint, 0, 1)) }, g);
    el("path", { d: ecran, fill: "none", stroke: INK, "stroke-width": 3 }, g);                                          // l'écran est cerné d'encre
    el("rect", { x: 500, y: 312, width: 50, height: 14, rx: 7, fill: INK }, g);                                         // encoche
    return { ecran: [T.ex, T.ey, T.ew, T.eh], centre: [T.cx, T.cy] };
  };
  D.tel.essais = [{}, { ecran: "trou" }, { mini: true, vert: 1 }, { mini: true, eteint: 0.6 }];

  /* D.telVerre (ajout) — le bord de l'écran et l'encoche, à reposer PAR-DESSUS la page découpée : la page (papier de l'écran)
   * recouvre sinon la moitié intérieure du trait. o.eteint 0..1 : voile sombre par-dessus la page. Ancrage « écran ». */
  D.telVerre = (g, o = {}) => {
    const ecran = U.rrect(TEL.ex, TEL.ey, TEL.ew, TEL.eh, TEL.er);
    if (o.eteint > 0) el("path", { d: ecran, fill: SOMBRE, opacity: f(clamp(o.eteint, 0, 1)) }, g);
    el("path", { d: ecran, fill: "none", stroke: INK, "stroke-width": 3 }, g);
    if (o.encoche !== false) el("rect", { x: 500, y: 312, width: 50, height: 14, rx: 7, fill: INK }, g);
  };

  /* D.semis — fond du fil : petits « + » et petits ronds gris très pâles ; motif de 706 × 240 répété 5 fois vers le bas.
   * 706 × 1200, ancrage = coin haut-gauche du fil. Il remonte de 6 px/s en boucle : s.y -= semisY(t) (période 240 px). */
  D.semis = (g, o = {}) => {
    const n = o.n || 5, col = o.col || "#E4E4DC";
    const pts = [[58, 30, 0], [196, 84, 1], [332, 26, 1], [452, 102, 0], [604, 44, 1], [660, 150, 0], [118, 166, 1], [268, 204, 0], [404, 174, 1], [540, 214, 0], [34, 112, 0], [596, 226, 1]];
    let plus = "", ronds = "";
    for (let k = 0; k < n; k++) pts.forEach(([x, y, r]) => { const Y = y + k * 240; if (r) ronds += rond(x, Y, 5.5); else plus += `M${x - 7} ${Y}h14M${x} ${Y - 7}v14`; });
    el("path", { d: plus, fill: "none", stroke: col, "stroke-width": 3.2, "stroke-linecap": "round" }, g);
    el("path", { d: ronds, fill: "none", stroke: col, "stroke-width": 2.8 }, g);
  };

  /* D.reflet — bande oblique blanche (opacité 0,22, 70 px, inclinée de 20°) + un filet ; 70 × 1200, ancrage = haut de la bande.
   * Elle traverse l'écran de gauche à droite en 0,5 s au début de chaque scène ÉCRAN (dans la découpe de l'écran). */
  D.reflet = (g, o = {}) => {
    const H = o.h || 1200, dx = -Math.tan(20 * Math.PI / 180) * H;
    const bande = (x, w) => `M${f(x)} 0 L${f(x + w)} 0 L${f(x + w + dx)} ${H} L${f(x + dx)} ${H} Z`;
    el("path", { d: bande(-35, 70), fill: "#FFFFFF", opacity: 0.22 }, g);
    el("path", { d: bande(52, 16), fill: "#FFFFFF", opacity: 0.22 }, g);
    ln(g, `M-35 0 L${f(-35 + dx)} ${H} M35 0 L${f(35 + dx)} ${H}`, 1.4, "#EDEDE6", { opacity: 0.8 });   // deux filets très pâles : la bande se lit aussi sur l'écran blanc
  };

  /* D.telMini — le petit téléphone tenu en main : coque foncée, écran clair, 3 traits gris. 44 × 84, ancrage = centre.
   * o.vert 0/1 : une mini-bulle hachurée de vert · o.lueur 0/1 : halo jaune pâle derrière (il vibre). Il suit node.out.handR. */
  D.telMini = (g, o = {}) => {
    const C = U.ctx(g, 4110, false, 1);
    if (o.lueur) { el("ellipse", { cx: 0, cy: 0, rx: 50, ry: 66, fill: YEL, opacity: 0.2 }, g); el("ellipse", { cx: 0, cy: 0, rx: 36, ry: 54, fill: YEL, opacity: 0.28 }, g); }
    el("path", { d: U.rrect(-22 + 3, -42 + 4, 44, 84, 9), fill: "rgba(28,26,28,.2)" }, g);
    U.shape(C, "coque", U.rrect(-22, -42, 44, 84, 9), MAT.dark, { sw: 2.4, r: 0.5 });
    el("path", { d: U.rrect(-17, -35, 34, 68, 4), fill: ECRAN, stroke: INK, "stroke-width": 1.6 }, g);
    el("rect", { x: -6, y: -40, width: 12, height: 3, rx: 1.5, fill: "#8A8A84" }, g);
    [[-12, -26, 20], [-12, -17, 14], [-12, -8, 22]].forEach(([x, y, w]) => ln(g, `M${x} ${y} h${w}`, 2.6, "#B4B4AE"));
    el("path", { d: U.rrect(-10, 4, 24, 20, 5), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.5 }, g);
    if (o.vert) for (let i = 0; i < 4; i++) ln(g, `M${-7 + i * 5} 21 l5 -14`, 1.3, VERT.hatch); else ln(g, "M-5 11 h13 M-5 17 h9", 1.6, "#C9C9C2");
    return { haut: [0, -42], ecran: [0, 0] };
  };
  D.telMini.essais = [{}, { vert: 1 }, { lueur: 1 }];

  /* D.barreEtat — barre d'état (y 302 → 346), ancrage « écran ». o.date (Kalam 22 px, x 202, y 333 ; null = la scène pose la date
   * elle-même pour la faire basculer) · o.batt 0..1 (0,9 → 0,5 de la scène 5 à la scène 11). Encoche, 4 barres de réseau, batterie. */
  D.barreEtat = (g, o = {}) => {
    const batt = clamp(o.batt == null ? 0.9 : o.batt, 0, 1);
    if (o.date) tx(g, o.date, 202, 333, 22, "de", "start");
    el("rect", { x: 500, y: 312, width: 50, height: 14, rx: 7, fill: INK }, g);
    for (let i = 0; i < 4; i++) el("rect", { x: 752 + i * 10, y: 332 - (6 + i * 4), width: 6, height: 6 + i * 4, rx: 1.5, fill: INK }, g);
    el("rect", { x: 804, y: 315, width: 38, height: 18, rx: 5, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, g);
    el("rect", { x: 843.5, y: 320, width: 4, height: 8, rx: 1.5, fill: INK }, g);
    el("rect", { x: 807.5, y: 318.5, width: f(31 * batt), height: 11, rx: 2, fill: INK }, g);
  };
  D.barreEtat.essais = [{ date: "Sa · 31.05.2025", batt: 0.9 }, { date: "22.05.2026", batt: 0.5 }];

  /* D.enTete — en-tête du fil (y 346 → 440), ancrage « écran » : flèche retour (x 200), pastille du groupe (252, 393, r 26),
   * o.titre (36 px, x 294, y 390 ; null = la scène l'écrit elle-même avec c.write), o.sous (21 px, y 422), trait à y 440. */
  D.enTete = (g, o = {}) => {
    ln(g, "M214 393 L190 393 M201 382 L190 393 L201 404", 4.2);
    el("circle", { cx: 254, cy: 396, r: 26, fill: OMBRE }, g);
    el("circle", { cx: 252, cy: 393, r: 26, fill: "#E6E6E1", stroke: INK, "stroke-width": 2.6 }, g);
    [[241, 400], [263, 400], [252, 385]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 9, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2 }, g));   // trois petits ronds qui se chevauchent
    if (o.titre) tx(g, o.titre, 294, 390, 36, "de", "start");
    if (o.sous) tx(g, o.sous, 294, 422, 21, "light", "start");
    ln(g, "M172 440 L878 440", 2.6);
  };
  D.enTete.essais = [{ titre: "Ärzte-AC", sous: "WhatsApp-Chatgruppe · 9 Mitglieder" }];

  /* D.bande (ajout) — la bande des pastilles (y 440 → 574) : papier de l'écran + pointillé gris en bas. Ancrage « écran ».
   * Appel vidéo : { y0: 346, y1: 486 }. Une pastille à la fois, centre (525, 486) ; son arabe détaché dessous (base ≈ y 552). */
  D.bande = (g, o = {}) => {
    const y0 = o.y0 == null ? TEL.tete : o.y0, y1 = o.y1 == null ? TEL.bande : o.y1;
    el("rect", { x: TEL.ex, y: y0 + 2, width: TEL.ew, height: y1 - y0 - 2, fill: ECRAN }, g);
    ln(g, `M196 ${y1} L854 ${y1}`, 2.6, GRIS, { "stroke-dasharray": "1 11" });
  };

  /* D.saisie — zone de saisie (y 1300 → 1384), ancrage « écran » : trait, champ arrondi blanc (196 → 770, 1314 → 1370), bouton
   * d'envoi rond (822, 1342, r 30). o.parti : bouton #DCEFD9 (un message vient de partir) · o.appui 0..1 : il s'enfonce (×0,88)
   * · o.curseur 0/1 : barre de curseur dans le champ vide (la scène la fait clignoter à 2 Hz). */
  D.saisie = (g, o = {}) => {
    const C = U.ctx(g, 4130, false, 1), ap = clamp(o.appui || 0, 0, 1);
    el("path", { d: "M172 1300 L878 1300 L878 1342 Q878 1384 836 1384 L214 1384 Q172 1384 172 1342 Z", fill: ECRAN }, g);
    ln(g, "M172 1300 L878 1300", 2.6);
    el("path", { d: U.rrect(199, 1318, 574, 56, 28), fill: "#E1E1DB" }, g);
    U.shape(C, "champ", U.rrect(196, 1314, 574, 56, 28), MAT.white, { sw: 2.6, r: 0.45 });
    if (o.curseur) el("rect", { x: 226, y: 1328, width: 3, height: 28, fill: INK }, g);
    const b = el("g", { transform: `translate(822 1342) scale(${f(1 - 0.12 * ap)})` }, g), B = U.ctx(b, 4131, false, 1);
    el("circle", { cx: f(4 * (1 - ap)), cy: f(5 * (1 - ap)), r: 30, fill: OMBRE }, b);
    U.shape(B, "envoi", rond(0, 0, 30), { base: o.parti ? "#DCEFD9" : "#FFFFFF" }, { sw: 2.8, r: 0.45 });
    ln(b, "M-13 0 L12 0 M2 -10 L13 0 L2 10", 4);
    return { bouton: [822, 1342], champ: [226, 1342] };
  };
  D.saisie.essais = [{ curseur: 1 }, { parti: 1, appui: 1 }];

  /* D.bulle — bulle de MESSAGE en un seul tracé (queue qui part du BAS). o.w × o.h, ancrage = coin haut-gauche.
   * o.tip [x, y] relatif à l'ancrage (les scènes donnent des pixels ABSOLUS : retrancher l'ancrage) ; tip: null = sans queue.
   * o.mat "blanc" | "vert" (= D.VERT) | "jaune" · o.brouillon : contour en pointillé, sans ombre. Pivot de « pop » = la pointe. */
  D.bulle = (g, o = {}) => {
    o = Object.assign({ w: 300, h: 120, mat: "blanc", brouillon: false, seed: 801 }, o);
    const tip = o.tip === undefined ? [o.w + 8, o.h + 30] : o.tip, C = U.ctx(g, o.seed, false, 1);
    const d = bullePath(o.w / 2, o.h / 2, o.w, o.h, Math.min(26, o.h / 2 - 2), tip, 15);
    const mat = o.mat === "vert" ? VERT : o.mat === "jaune" ? MAT.yellow : MAT.white;
    if (o.brouillon) {
      el("path", { d, fill: mat.base }, g);
      if (mat.hatch) U.shape(C, "bub", d, { hatch: mat.hatch, gap: mat.gap, fw: mat.fw }, { noStroke: true });
      el("path", { d, fill: "none", stroke: INK, "stroke-width": 3, "stroke-dasharray": "10 8", "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
    } else {
      el("path", { d, fill: "#CFCFC8", transform: "translate(5 7)" }, g);
      U.shape(C, "bub", d, mat, { sw: 3, r: 0.5 });
    }
    return { tip, bas: [o.w / 2, o.h] };
  };
  D.bulle.essais = [{ w: 482, h: 254, mat: "vert", tip: [506, 284] }, { w: 480, h: 168, tip: [-18, 194] }, { w: 584, h: 170, brouillon: true, tip: [592, 200] }, { w: 330, h: 134, tip: null }, { w: 116, h: 66, tip: [-18, 92] }, { w: 300, h: 110, mat: "jaune", tip: [150, 150] }];

  /* D.avatar — avatar rond du fil : rond blanc + ombre, tête Persona découpée (Persona.head, échelle r / 82, descendue de 0,14 r).
   * o.r rayon · o.p paramètres Persona (CAST.X + expr, blink, look2 arrondis) · o.anneau "encre" | "jaune" | "pointille"
   * o.badge null | "point" (pastille verte « transmis », en haut à droite) | "stetho" | "cle" (rond blanc en bas à droite)
   * o.vide : rond pointillé vide (il a quitté le groupe). Ancrage = centre. Renvoie { bouche, haut, bord }. */
  const P_ESSAI = { look: "woman", hair: "longwave", hairTone: "blond", seed: 701 };
  D.avatar = (g, o = {}) => {
    const r = o.r || 32, sw = Math.max(2.4, r * 0.07), an = o.anneau || "encre";
    if (o.vide) {
      el("circle", { cx: 0, cy: 0, r, fill: ECRAN }, g);
      el("circle", { cx: 0, cy: 0, r: r - sw / 2, fill: "none", stroke: "#8A8A84", "stroke-width": sw, "stroke-dasharray": `${f(r * 0.22)} ${f(r * 0.2)}`, "stroke-linecap": "round" }, g);
      return { bord: r };
    }
    el("circle", { cx: f(r * 0.09), cy: f(r * 0.12), r: r + (an === "jaune" ? r * 0.16 : 0), fill: OMBRE }, g);
    el("circle", { cx: 0, cy: 0, r, fill: o.fond || "#E9E9E3" }, g);
    const id = nid("av"), cp = el("clipPath", { id }, g); el("circle", { cx: 0, cy: 0, r: f(r - sw / 2) }, cp);
    const dans = el("g", { "clip-path": `url(#${id})` }, g), k = r / 82;
    const tete = el("g", {}, el("g", { transform: `translate(0 ${f(r * 0.14)}) scale(${k.toFixed(4)})` }, dans));
    const a = PE.head(tete, Object.assign({ lw: r < 45 ? 1.2 : 1 }, o.p || P_ESSAI)) || { mouth: [0, 41], top: [0, -74] };
    if (an === "jaune") { const b = Math.max(6, r * 0.16); el("circle", { cx: 0, cy: 0, r: f(r + b / 2), fill: "none", stroke: YEL, "stroke-width": f(b) }, g); el("circle", { cx: 0, cy: 0, r: f(r + b), fill: "none", stroke: INK, "stroke-width": f(sw * 0.8) }, g); }
    el("circle", { cx: 0, cy: 0, r, fill: "none", stroke: an === "pointille" ? "#6E6E68" : INK, "stroke-width": f(sw), "stroke-dasharray": an === "pointille" ? `${f(r * 0.22)} ${f(r * 0.2)}` : null, "stroke-linecap": "round" }, g);
    if (o.badge === "point") {
      const rb = o.rb || 9; el("circle", { cx: f(r * 0.72), cy: f(-r * 0.72), r: rb, fill: "#9CCB98", stroke: INK, "stroke-width": 2.4 }, g);
    } else if (o.badge === "stetho" || o.badge === "cle") {
      const rb = o.rb || Math.max(18, Math.round(r * 0.3)), q = rb / 18, b = el("g", { transform: `translate(${f(r * 0.72)} ${f(r * 0.72)}) scale(${f(q)})` }, g);
      el("circle", { cx: 2, cy: 2.5, r: 18, fill: OMBRE }, b); el("circle", { cx: 0, cy: 0, r: 18, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4 }, b);
      if (o.badge === "stetho") {   // mini-stéthoscope : deux branches, un tube, un pavillon
        ln(b, "M-8 -10 Q-9 2 -1 3 Q7 2 6 -10", 2.4); ln(b, "M-1 3 Q-1 11 5 10 Q9 9 9 5", 2.4);
        el("circle", { cx: 9, cy: 2.5, r: 3.6, fill: "#CFCFCA", stroke: INK, "stroke-width": 2 }, b); el("circle", { cx: -8, cy: -10.5, r: 1.8, fill: INK }, b); el("circle", { cx: 6, cy: -10.5, r: 1.8, fill: INK }, b);
      } else {                      // petite clé jaune
        el("circle", { cx: -5, cy: -5, r: 5.5, fill: YEL, stroke: INK, "stroke-width": 2.2 }, b); el("circle", { cx: -5, cy: -5, r: 1.6, fill: "#FFFFFF", stroke: INK, "stroke-width": 1 }, b);
        ln(b, "M-1 -1 L9 9 M5 5 L8 2 M8 8 L11 5", 2.6);
      }
    }
    return { bouche: [f(a.mouth[0] * k), f(a.mouth[1] * k + r * 0.14)], haut: [0, -r], bord: r };
  };
  D.avatar.essais = [{ r: 78, p: { look: "man", hair: "shortcurly", hairTone: "brown", beard: "stubble", seed: 702 }, badge: "stetho" }, { r: 32, p: P_ESSAI },
    { r: 30, p: { look: "man", hair: "bald", hairTone: "dark", beard: "short", glasses: true, seed: 712 }, badge: "point" }, { r: 30, p: { look: "oldwoman", hair: "short", hairTone: "grey", glasses: true, seed: 715 } },
    { r: 46, p: { look: "man", hair: "shortcurly", hairTone: "brown", beard: "stubble", seed: 702, expr: "calm" }, anneau: "jaune", badge: "cle" }, { r: 30, vide: true }, { r: 30, p: { look: "man", hair: "crown", hairTone: "brown", beard: "stubble", glasses: true, seed: 716 }, anneau: "pointille" }];

  /* D.avatarPatient — « un patient » : buste SANS visage en chemise d'hôpital (encolure nouée, petits pois), bracelet au
   * poignet levé. Rayon o.r (78 en scène 3, 46 en scène 20), ancrage = centre. */
  D.avatarPatient = (g, o = {}) => {
    const r = o.r || 78, k = r / 82, sw = Math.max(2.4, r * 0.07);
    el("circle", { cx: f(r * 0.09), cy: f(r * 0.12), r, fill: OMBRE }, g);
    el("circle", { cx: 0, cy: 0, r, fill: "#FFFFFF" }, g);
    const id = nid("pa"), cp = el("clipPath", { id }, g); el("circle", { cx: 0, cy: 0, r: f(r - sw / 2) }, cp);
    const b = el("g", { transform: `scale(${k.toFixed(4)})` }, el("g", { "clip-path": `url(#${id})` }, g)), C = U.ctx(b, 4140, false, 1);
    el("circle", { cx: 0, cy: 0, r: 82, fill: "#F3F3EE" }, b);
    // chemise d'hôpital : épaules larges, petits pois, encolure ronde nouée sur le côté
    const chemise = "M-74 96 C-74 56 -52 40 -24 34 Q0 46 24 34 C52 40 74 56 74 96 Z";
    U.shape(C, "chemise", chemise, MAT.white, { sw: 2.8 });
    [[-50, 62], [-30, 54], [-36, 76], [-12, 66], [8, 56], [2, 78], [26, 68], [44, 56], [-56, 84], [-18, 86], [22, 88], [-2, 50]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 2.7, fill: "#A1A19B" }, b));
    U.shape(C, "cou", "M-11 14 L-12 36 Q0 44 12 36 L11 14 Z", MAT.white, { sw: 2.4 });
    U.stroke(C, "col", "M-25 34 Q0 50 25 34", { sw: 3 });
    ln(b, "M-21 40 q-12 -8 -14 2 q2 9 14 -2 M-21 40 q-2 12 -11 12 M-21 40 q8 8 3 15", 2.4);                 // le nœud de l'encolure
    // tête sans visage : ovale + calotte de cheveux hachurée
    U.shape(C, "tete", ovale(0, -20, 33, 38), MAT.white, { sw: 2.8 });
    U.shape(C, "chev", "M-33 -24 C-34 -52 -16 -62 2 -60 C22 -60 36 -46 33 -24 C24 -40 6 -44 -8 -40 C-20 -38 -28 -34 -33 -24 Z", MAT.mid, { sw: 2.4 });
    // avant-bras levé + bracelet d'identification + moufle
    const br = el("g", { transform: "translate(-13 -8)" }, b), B = U.ctx(br, 4141, false, 1);
    U.shape(B, "bras", "M43 110 L45 52 Q56 46 67 52 L69 110 Z", MAT.white, { sw: 2.6 });
    U.shape(B, "main", "M43 50 C40 34 46 22 56 22 C67 22 72 34 69 50 Q56 56 43 50 Z", MAT.white, { sw: 2.6 });
    el("path", { d: "M45 38 q-10 -3 -9 -13 q7 -3 10 5 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4, "stroke-linejoin": "round" }, br);   // le pouce de la moufle
    el("path", { d: "M41 57 L71 57 L71 70 L41 70 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4, "stroke-linejoin": "round" }, br);          // le bracelet d'identification
    ln(br, "M47 63.5 h10 M61 63.5 h5", 1.8, "#77776F");
    el("circle", { cx: 0, cy: 0, r, fill: "none", stroke: INK, "stroke-width": f(sw) }, g);
    return { bord: r };
  };
  D.avatarPatient.essais = [{ r: 78 }, { r: 46 }];

  /* D.sceau — le tribunal dans le fil : rond blanc cerné d'un double trait, petite balance au trait, « § » dessous. Aucune
   * armoirie. Rayon o.r (30), ancrage = centre. o.a = angle du fléau en degrés (la balance oscille quand il « écrit »). */
  D.sceau = (g, o = {}) => {
    const r = o.r || 30, k = r / 30, a = o.a || 0;
    el("circle", { cx: f(r * 0.09), cy: f(r * 0.12), r, fill: OMBRE }, g);
    const b = el("g", { transform: `scale(${k.toFixed(4)})` }, g);
    el("circle", { cx: 0, cy: 0, r: 30, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.6 }, b);
    el("circle", { cx: 0, cy: 0, r: 25.5, fill: "none", stroke: INK, "stroke-width": 1.3 }, b);
    ln(b, "M0 -18 L0 3 M-7 4 L7 4", 2.4);                                            // colonne et pied
    const rad = a * Math.PI / 180, dx = 13 * Math.cos(rad), dy = 13 * Math.sin(rad), y0 = -15;
    ln(b, `M${f(-dx)} ${f(y0 - dy)} L${f(dx)} ${f(y0 + dy)}`, 2.4);                   // fléau
    el("circle", { cx: 0, cy: y0, r: 2.2, fill: YEL, stroke: INK, "stroke-width": 1.2 }, b);
    [[-dx, y0 - dy], [dx, y0 + dy]].forEach(([x, y]) => {                             // deux plateaux qui pendent
      ln(b, `M${f(x)} ${f(y)} L${f(x - 5)} ${f(y + 9)} M${f(x)} ${f(y)} L${f(x + 5)} ${f(y + 9)}`, 1.2);
      el("path", { d: `M${f(x - 6.5)} ${f(y + 9)} Q${f(x)} ${f(y + 15)} ${f(x + 6.5)} ${f(y + 9)} Z`, fill: "#E1E1DC", stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, b);
    });
    tx(b, "§", 0, 21.5, 15, "de");
    return { bord: r };
  };
  D.sceau.essais = [{ r: 30 }, { r: 30, a: 6 }, { r: 60, a: -6 }];

  /* D.sepDate — séparateur de date du fil : pastille gris clair cernée d'encre, o.texte en Kalam 21 px.
   * largeur = texte + 44, hauteur 36, ancrage = centre. Il tombe de 30 px (drop, 0,25 s). */
  D.sepDate = (g, o = {}) => {
    const s = o.texte || "Samstag, 31. Mai 2025", w = Math.round(mesure(s, 21, "de")) + 44, C = U.ctx(g, 4150 + s.length, false, 1);
    el("path", { d: U.rrect(-w / 2 + 3, -18 + 4, w, 36, 18), fill: "#DCDCD5" }, g);
    U.shape(C, "sep", U.rrect(-w / 2, -18, w, 36, 18), { base: "#ECECE6" }, { sw: 2, r: 0.4 });
    tx(g, s, 0, 7.5, 21, "de");
    return { w };
  };
  D.sepDate.essais = [{ texte: "Samstag, 31. Mai 2025" }, { texte: "Freitag, 22. Mai 2026" }];

  /* D.notif — la bannière de notification (transition signature) : bannière blanche arrondie (rayon 26) + ombre.
   * 620 × 88 (ÉCRAN, posée en (215, 316)) ou { w: 600, h: 84 } (PIÈCE, posée en (240, 300) dans c.hud) ; ancrage = coin haut-gauche.
   * Icône à gauche : une petite bulle au trait (aucune marque) ; o.sceau : le sceau ; o.contact : une silhouette.
   * o.titre (de 28 px, à x 76) · o.ligne (22 px, sous le titre) · o.ar (ar gras 28 px, calé à droite ; seul → titre Lalezar 40 px centré)
   * o.jaune : fond jaune · o.appel : deux boutons ronds à droite (refuser : blanc ; accepter : jaune) · o.appui 0..1 : le jaune s'enfonce. */
  D.notif = (g, o = {}) => {
    const w = o.w || 620, h = o.h || 88, C = U.ctx(g, 4160, false, 1);
    el("path", { d: U.rrect(6, 8, w, h, 26), fill: "#C9C9C2" }, g);
    U.shape(C, "ban", U.rrect(0, 0, w, h, 26), o.jaune ? MAT.yellow : MAT.white, { sw: 3, r: 0.5 });
    const ic = el("g", { transform: `translate(42 ${h / 2})` }, g);
    if (o.sceau) D.sceau(ic, { r: 25 });
    else {
      el("path", { d: U.rrect(-25 + 2.5, -25 + 3.5, 50, 50, 14), fill: OMBRE }, ic);
      el("path", { d: U.rrect(-25, -25, 50, 50, 14), fill: "#FFFFFF", stroke: INK, "stroke-width": 2.6 }, ic);
      if (o.contact) { el("circle", { cx: 0, cy: -7, r: 8, fill: "#E1E1DC", stroke: INK, "stroke-width": 2.4 }, ic); el("path", { d: "M-15 17 Q-14 3 0 3 Q14 3 15 17 Z", fill: "#E1E1DC", stroke: INK, "stroke-width": 2.4, "stroke-linejoin": "round" }, ic); }
      else { el("path", { d: bullePath(0, -3, 32, 22, 8, [-9, 15], 4), fill: "#E1E1DC", stroke: INK, "stroke-width": 2.4, "stroke-linejoin": "round" }, ic); ln(ic, "M-8 -6 h16 M-8 0 h10", 2, "#77776F"); }
    }
    if (o.appel) {
      const yb = h / 2, ap = clamp(o.appui || 0, 0, 1);
      const non = el("g", { transform: `translate(${w - 112} ${yb})` }, g);
      el("circle", { cx: 2.5, cy: 3.5, r: 25, fill: OMBRE }, non); el("circle", { cx: 0, cy: 0, r: 25, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.6 }, non); ln(non, "M-8 -8 L8 8 M8 -8 L-8 8", 3.6);
      const oui = el("g", { transform: `translate(${w - 48} ${yb}) scale(${f(1 - 0.12 * ap)})` }, g);
      el("circle", { cx: f(2.5 * (1 - ap)), cy: f(3.5 * (1 - ap)), r: 25, fill: OMBRE }, oui); el("circle", { cx: 0, cy: 0, r: 25, fill: YEL, stroke: INK, "stroke-width": 2.6 }, oui);
      // un combiné de téléphone (jamais une coche : aucune coche dans cet épisode)
      el("path", { d: "M-11 -10 Q-14 -3 -9 4 Q-3 11 5 13 Q10 13 11 9 L8.5 5.5 Q6.5 3.8 4.2 5.6 Q-1.5 3.5 -4.5 -2.2 Q-2.6 -4.4 -4 -6.6 L-7 -10.6 Q-9.5 -12 -11 -10 Z", fill: INK, stroke: INK, "stroke-width": 1.2, "stroke-linejoin": "round", transform: "translate(1 0)" }, oui);
    }
    if (o.titre) {
      tx(g, o.titre, 76, o.ligne ? h / 2 - 4 : h / 2 + 10, 28, "de", "start");
      if (o.ligne) tx(g, o.ligne, 76, h / 2 + 24, 22, "light", "start");
      if (o.ar && !o.appel) tx(g, o.ar, w - 22, h / 2 + 10, 28, "ar", "end");
    } else if (o.ar) tx(g, o.ar, w / 2 + 20, h / 2 + 14, 40, "ttl", "middle");
    return { w, h, accepter: [w - 48, h / 2] };
  };
  D.notif.essais = [{ titre: "Ärzte-AC", ligne: "WhatsApp-Chatgruppe" }, { sceau: true, titre: "Arbeitsgericht Siegburg", w: 600, h: 84 }, { contact: true },
    { titre: "Donnerstag, 29. Mai 2025", ar: "الخميس", w: 600, h: 84 }, { sceau: true, titre: "Arbeitsgericht Siegburg", appel: true }, { jaune: true, ar: "القاعدة" }];

  /* D.caviar — barre de caviardage : deux coups de feutre noir superposés, bords irréguliers. o.w × 30, ancrage = coin haut-gauche.
   * Elle se trace de gauche à droite (wipe, 0,25 s). Ce qui est dessous n'est JAMAIS lisible. */
  D.caviar = (g, o = {}) => {
    const w = o.w || 150, s0 = o.seed || Math.round(w);
    const coup = (y0, y1, dx, k) => {
      const n = Math.max(4, Math.round(w / 26)); let haut = "", bas = "";
      for (let i = 0; i <= n; i++) { const x = dx + (w * i) / n, j = (hash(s0 * 3.1 + i * 7 + k) - 0.5) * 3.6, j2 = (hash(s0 * 1.7 + i * 11 + k + 5) - 0.5) * 3.6; haut += `${i ? "L" : "M"}${f(x)} ${f(y0 + j)} `; bas = `L${f(x)} ${f(y1 + j2)} ` + bas; }
      return haut + bas + "Z";
    };
    el("path", { d: coup(1, 21, -2, 1), fill: INK, "stroke-linejoin": "round", stroke: INK, "stroke-width": 2 }, g);
    el("path", { d: coup(8, 29, 3, 9), fill: INK, "stroke-linejoin": "round", stroke: INK, "stroke-width": 2 }, g);
    // passages du feutre : deux traînées un peu plus claires, dans le sens du geste (texture, sans rien laisser voir)
    ln(g, `M${f(w * 0.06)} 7.5 L${f(w * 0.58)} 8.5 M${f(w * 0.34)} 21 L${f(w * 0.93)} 20`, 1.5, "#4A474A", { opacity: 0.9 });
    return { w };
  };
  D.caviar.essais = [{ w: 150 }, { w: 270 }, { w: 90 }];

  /* D.gribouillis — ligne de texte illisible : trait ondulé gris (3 px), coupé en « mots ». o.w × 14, ancrage = coin haut-gauche. */
  D.gribouillis = (g, o = {}) => {
    const w = o.w || 300, s0 = o.seed || Math.round(w * 1.3); let d = "", x = 0, i = 0;
    while (x < w - 14) {
      const L = Math.min(w - x, 26 + Math.round(hash(s0 + i * 5) * 58)); d += `M${f(x)} 8`;
      for (let u = 0; u < L - 4; u += 9) d += ` q2.2 ${-9 - hash(s0 + i + u) * 5} 4.5 -1 t4.5 1`;
      x += L + 13; i++;
    }
    ln(g, d, 3, o.col || GRIS);
    return { w };
  };
  D.gribouillis.essais = [{ w: 430 }, { w: 410 }, { w: 200 }];

  /* D.ascenseur — la barre de défilement du fil (6 × 90, arrondie), le long du bord droit de l'écran (x 868). Ancrage = haut-gauche.
   * Sa position suit defile(t) ; o.pale 0..1 : elle pâlit quand le fil ne bouge plus (le silence). */
  D.ascenseur = (g, o = {}) => {
    const p = clamp(o.pale || 0, 0, 1), c = Math.round(lerp(0x9a, 0xdc, p)).toString(16);
    el("rect", { x: 0, y: 0, width: 6, height: o.h || 90, rx: 3, fill: `#${c}${c}${Math.round(lerp(0x94, 0xd6, p)).toString(16)}` }, g);
  };
  D.ascenseur.essais = [{}, { pale: 1 }];

  /* D.ficheContact — la page « contact » de l'intro (le cadre propre à l'épisode) : icônes au trait en haut (retour, étoile,
   * crayon), un trait fin sous l'en-tête, la barre d'accueil en bas (180 × 8, centre (525, 1352)) ; rien d'autre : le socle pose
   * la photo, le ruban, les boutons. Ancrage « écran ». o.a = angle de l'étoile (elle tourne une fois à i3@j'aime) · o.pleine 0/1. */
  D.ficheContact = (g, o = {}) => {
    ln(g, "M214 393 L190 393 M201 382 L190 393 L201 404", 4.2);
    const st = el("g", { transform: `translate(786 392) rotate(${f(o.a || 0)})` }, g); let d = "";
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, q = i % 2 ? 8 : 19; d += `${i ? "L" : "M"}${f(Math.cos(a) * q)} ${f(Math.sin(a) * q)} `; }
    el("path", { d: d + "Z", fill: o.pleine ? YEL : "#FFFFFF", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round" }, st);
    const cr = el("g", { transform: "translate(842 393) rotate(-45)" }, g);                                   // crayon
    el("path", { d: "M-16 -5 L10 -5 L18 0 L10 5 L-16 5 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 2.8, "stroke-linejoin": "round" }, cr);
    ln(cr, "M-9 -5 L-9 5 M10 -5 L10 5", 2.2); el("path", { d: "M14 -2.5 L18 0 L14 2.5 Z", fill: INK }, cr);
    ln(g, "M196 440 L854 440", 1.8, "#C9C9C2");
    if (o.barre !== false) el("rect", { x: 435, y: 1348, width: 180, height: 8, rx: 4, fill: "#B4B4AE" }, g);
    return { etoile: [786, 392] };
  };
  D.ficheContact.essais = [{}, { a: 36, pleine: 1 }];

  /* D.mention (ajout) — la mention de source. Ancrage « écran ».
   * forme "menton" (défaut, scènes ÉCRAN) : une ligne dans le menton du téléphone, allemand 22 px puis arabe gras 26 px, l'ENSEMBLE
   *   centré sur (525, 1422) ; forme "etiquette" (PIÈCE et PAPIER, dans c.hud) : étiquette blanche en bas à gauche (à partir de x 104,
   *   y 1404 → 1450, largeur selon le texte, 366 px au moins). o.de, o.ar. */
  D.mention = (g, o = {}) => {
    const de = o.de == null ? "laut Urteil" : o.de, ar = o.ar == null ? "حسب الحكم" : o.ar, wd = mesure(de, 22, "de"), wa = ar ? mesure(ar, 26, "ar") : 0, gap = ar ? 16 : 0;
    if (o.forme === "etiquette") {
      const w = Math.max(366, Math.round(wd + gap + wa + 44)), C = U.ctx(g, 4170, false, 1);
      el("path", { d: U.rrect(104 + 5, 1404 + 6, w, 46, 14), fill: OMBRE }, g);
      U.shape(C, "eti", U.rrect(104, 1404, w, 46, 14), MAT.white, { sw: 2.4, r: 0.45 });
      tx(g, de, 124, 1435, 22, "de", "start"); if (ar) tx(g, ar, 104 + w - 20, 1437, 26, "ar", "end");
      return { w, droite: 104 + w };
    }
    const x0 = 525 - (wd + gap + wa) / 2;
    tx(g, de, x0, 1430, 22, "de", "start", { halo: "#F0F0EB", haloW: 7 }); if (ar) tx(g, ar, x0 + wd + gap + wa, 1432, 26, "ar", "end", { halo: "#F0F0EB", haloW: 7 });
    return { w: wd + gap + wa };
  };
  D.mention.essais = [{ de: "Stand Juli 2026: nicht rechtskräftig", ar: "مازال ماشي نهائي" }, { de: "laut Urteil (Auszug der Nachricht)", ar: "حسب الحكم" }, { forme: "etiquette", de: "Rekonstruktion", ar: "مشهد تمثيلي" }, { forme: "etiquette", de: "Stand Juli 2026: nicht rechtskräftig", ar: "مازال ماشي نهائي" }];

  /* D.anneau (ajout) — anneau à main levée (un tour et un peu plus, les deux bouts ne se rejoignent pas). o.w × o.h, o.sw (7), o.col (jaune).
   * Ancrage = centre. Il se trace (wipe 0,3 s) autour d'une bulle, d'un avatar, d'un mot. */
  D.anneau = (g, o = {}) => {
    const w = o.w || 520, h = o.h || 290, pts = [], n = 26, s0 = o.seed || 5;
    for (let i = 0; i <= n + 2; i++) { const a = -2.2 + (i / n) * Math.PI * 2, k = 1 + (hash(s0 + i * 3) - 0.5) * 0.022 + (i > n ? 0.035 * (i - n) : 0); pts.push([Math.cos(a) * w / 2 * k, Math.sin(a) * h / 2 * k]); }
    ln(g, U.curve(pts), o.sw || 7, o.col || YEL);
    return { w, h };
  };
  D.anneau.essais = [{ w: 520, h: 290 }, { w: 184, h: 184, sw: 8 }];

  /* D.croix (ajout) — deux traits d'encre à main levée (10 px). o.w × o.h (150), ancrage = centre. Elle claque (slam) sur ce qu'on écarte. */
  D.croix = (g, o = {}) => {
    const w = (o.w || 150) / 2, h = (o.h || 150) / 2, sw = o.sw || 10;
    ln(g, `M${-w} ${-h} Q${f(-w * 0.1)} ${f(-h * 0.2)} ${w} ${h}`, sw, o.col || INK); ln(g, `M${w} ${-h} Q${f(w * 0.12)} ${f(-h * 0.16)} ${-w} ${h}`, sw, o.col || INK);
    return { w: w * 2, h: h * 2 };
  };

  /* ═══════════════════════════ B. OBJETS DU FIL (scène 5) ═══════════════════════════ */

  /* D.icoDienst — « la garde » : grille de planning 3 × 2 dans un carré arrondi, une case jaune. 82 × 82, ancrage = centre.
   * o.k 0 | 1 | 2 : la case jaune saute d'une case à l'autre toutes les 0,5 s. (Version 44 px en scène 16 : échelle 0,54.)
   * PAS de calendrier (ni anneaux, ni bandeau de mois : le calendrier est réservé à AKTE 06) : une feuille de planning,
   * trois têtes de colonne (petits bonshommes = les médecins de garde), une grille. */
  D.icoDienst = (g, o = {}) => {
    const C = U.ctx(g, 4200, false, 1), k = ((o.k || 0) % 3 + 3) % 3, x0 = -31, y0 = -12, cw = 20.67, ch = 21;
    el("path", { d: U.rrect(-41 + 4, -41 + 5, 82, 82, 16), fill: OMBRE }, g);
    U.shape(C, "carre", U.rrect(-41, -41, 82, 82, 16), MAT.white, { sw: 2.8 });
    // têtes de colonne : un petit buste par colonne (qui est de garde)
    [0, 1, 2].forEach((i) => { const cx = x0 + (i + 0.5) * cw;
      el("circle", { cx: f(cx), cy: -29, r: 4.2, fill: i === 1 ? "#E1E1DC" : "#FFFFFF", stroke: INK, "stroke-width": 1.9 }, g);
      el("path", { d: `M${f(cx - 7)} -17.5 Q${f(cx - 7)} -24 ${f(cx)} -24 Q${f(cx + 7)} -24 ${f(cx + 7)} -17.5 Z`, fill: i === 1 ? "#E1E1DC" : "#FFFFFF", stroke: INK, "stroke-width": 1.9, "stroke-linejoin": "round" }, g); });
    const [c, r] = [[0, 0], [1, 1], [2, 0]][k];
    el("rect", { x: f(x0 + c * cw + 2), y: f(y0 + r * ch + 2), width: f(cw - 4), height: f(ch - 4), rx: 3, fill: YEL, stroke: INK, "stroke-width": 1.8 }, g);
    ln(g, `M${x0} ${y0} h62 v${2 * ch} h-62 Z M${f(x0 + cw)} ${y0} v${2 * ch} M${f(x0 + 2 * cw)} ${y0} v${2 * ch} M${x0} ${y0 + ch} h62`, 1.9, "#55524B");
    [[1, 0], [0, 1], [2, 1]].forEach(([cc, rr]) => ln(g, `M${f(x0 + cc * cw + 5)} ${f(y0 + rr * ch + 10.5)} h${f(cw - 10)}`, 2, "#B4B4AE"));
    return { w: 82, h: 82 };
  };
  D.icoDienst.essais = [{ k: 0 }, { k: 1 }, { k: 2 }];

  /* D.icoUrlaub — « le congé » : transat + parasol + petit soleil. 82 × 82, ancrage = centre.
   * o.a = angle du parasol (il oscille ±5°, 2,2 s) · o.r = rotation des rayons du soleil, en degrés. */
  D.icoUrlaub = (g, o = {}) => {
    const C = U.ctx(g, 4210, false, 1);
    const so = el("g", { transform: `translate(-29 -29)` }, g), ra = el("g", { transform: `rotate(${f(o.r || 0)})` }, so);
    for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4; ln(ra, `M${f(Math.cos(a) * 11.5)} ${f(Math.sin(a) * 11.5)} L${f(Math.cos(a) * 15.5)} ${f(Math.sin(a) * 15.5)}`, 2.4); }
    el("circle", { cx: 0, cy: 0, r: 7.5, fill: YEL, stroke: INK, "stroke-width": 2.4 }, so);
    ln(g, "M-40 35 Q-20 31 0 35 T40 34", 2.4);                                                             // le sable
    // chaise longue (de profil) : dossier relevé + couchette sur deux pieds ; toile rayée cernée d'encre
    el("path", { d: "M-36 12 L-27 26 L-3 26", fill: "none", stroke: OMBRE, "stroke-width": 8, "stroke-linecap": "round", "stroke-linejoin": "round", transform: "translate(2 3)" }, g);
    ln(g, "M-25 27 L-27 34 M-6 27 L-4 34 M-31 19 L-36 34", 2.6);                                                 // pieds + béquille du dossier
    ln(g, "M-36 12 L-27 26 L-3 26", 8.5);                                                                          // contour de la toile
    ln(g, "M-36 12 L-27 26 L-3 26", 4.6, "#FFFFFF");
    ln(g, "M-36 12 L-27 26 L-3 26", 4.6, "#8A8A84", { "stroke-dasharray": "3 3.4", "stroke-linecap": "butt" });   // rayures de la toile
    // parasol : il pivote autour de son pied
    const pa = el("g", { transform: `rotate(${f(o.a || 0)} 12 35)` }, g), P = U.ctx(pa, 4211, false, 1);
    ln(pa, "M12 35 L12 -20", 3);
    el("path", { d: "M-19 -17 Q12 -58 43 -17 Q35 -22 27.5 -17 Q20 -22 12 -17 Q4 -22 -3.5 -17 Q-11 -22 -19 -17 Z", fill: OMBRE, transform: "translate(3 4)" }, pa);
    U.shape(P, "toile", "M-19 -17 Q12 -58 43 -17 Q35 -22 27.5 -17 Q20 -22 12 -17 Q4 -22 -3.5 -17 Q-11 -22 -19 -17 Z", MAT.white, { sw: 2.5 });
    el("path", { d: "M-3.5 -17 Q0 -40 12 -46 Q12 -30 12 -17 Q4 -22 -3.5 -17 Z", fill: "#B9B9B3" }, pa);
    el("path", { d: "M27.5 -17 Q26 -38 12 -46 Q32 -42 43 -17 Q35 -22 27.5 -17 Z", fill: "#B9B9B3" }, pa);
    ln(pa, "M-3.5 -17 Q0 -40 12 -46 M27.5 -17 Q26 -38 12 -46 M12 -17 L12 -46", 1.6);
    ln(pa, "M-19 -17 Q12 -58 43 -17 Q35 -22 27.5 -17 Q20 -22 12 -17 Q4 -22 -3.5 -17 Q-11 -22 -19 -17 Z", 2.5);
    el("circle", { cx: 12, cy: -47, r: 2.6, fill: INK }, pa);
    return { w: 82, h: 82 };
  };
  D.icoUrlaub.essais = [{}, { a: 5, r: 22 }];

  /* D.icoCadeau — « le cadeau » : paquet à ruban jaune. 82 × 82, ancrage = centre.
   * o.saut 0..1 : le couvercle saute de 6 px · o.a = angle du nœud (il remue ±8° à l'arrivée). */
  D.icoCadeau = (g, o = {}) => {
    const C = U.ctx(g, 4220, false, 1), dy = -6 * clamp(o.saut || 0, 0, 1);
    el("path", { d: U.rrect(-29 + 4, -4 + 5, 58, 40, 5), fill: OMBRE }, g);
    U.shape(C, "boite", U.rrect(-29, -4, 58, 40, 5), MAT.grey, { sw: 2.6 });
    el("rect", { x: -7, y: -4, width: 14, height: 40, fill: YEL, stroke: INK, "stroke-width": 2 }, g);           // ruban vertical
    const co = el("g", { transform: `translate(0 ${f(dy)})` }, g), K = U.ctx(co, 4221, false, 1);
    if (dy < -0.5) ln(g, "M-36 -8 l-6 -4 M36 -8 l6 -4 M-34 2 l-7 1 M34 2 l7 1", 2.2, "#8A8A84");                  // petits traits : il vient de sauter
    U.shape(K, "couv", U.rrect(-33, -18, 66, 15, 4), MAT.white, { sw: 2.6 });
    el("rect", { x: -7, y: -18, width: 14, height: 15, fill: YEL, stroke: INK, "stroke-width": 2 }, co);
    const no = el("g", { transform: `translate(0 -19) rotate(${f(o.a || 0)})` }, co);                              // le nœud : deux boucles + le centre
    el("path", { d: "M0 0 C-8 -18 -26 -18 -22 -6 C-20 2 -8 2 0 0 Z", fill: YEL, stroke: INK, "stroke-width": 2.4, "stroke-linejoin": "round" }, no);
    el("path", { d: "M0 0 C8 -18 26 -18 22 -6 C20 2 8 2 0 0 Z", fill: YEL, stroke: INK, "stroke-width": 2.4, "stroke-linejoin": "round" }, no);
    el("circle", { cx: 0, cy: -1, r: 4.6, fill: YEL, stroke: INK, "stroke-width": 2.2 }, no);
    return { w: 82, h: 82 };
  };
  D.icoCadeau.essais = [{}, { saut: 1, a: 8 }];

  /* ═══════════════════════════ E. LA SALLE DES MÉDECINS (scènes 2, 7, 14) — monde ═══════════════════════════
   * Caméra des scènes PIÈCE : { s: 1, cx: 540, cy: 920 }. Zone de la pastille (monde x 240 → 800, y 410 → 515) : mur nu.
   * Rien d'important à droite de x 880 sous y 950 (colonne des boutons). Le personnage : pieds à y 1320, échelle 1,04. */

  /* D.piece — coque de pièce (ancrage « écran » = repère MONDE) : mur x 40 → 1040, y 290 → o.solY (aplat o.mur), corniche fine en
   * haut, plinthe, sol en perspective jusqu'à y 1540. o.sol "lino" (grandes dalles, petits points) | "parquet" (lames)
   * o.rayures : papier peint à fines rayures verticales (le salon). Salle des médecins : { sol: "lino", solY: 1130 }. */
  D.piece = (g, o = {}) => {
    const solY = o.solY || 1130, x0 = 40, x1 = 1040, y0 = 290, y1 = 1540, parquet = o.sol === "parquet", C = U.ctx(g, 4300, false, 1);
    el("rect", { x: x0, y: y0, width: x1 - x0, height: solY - y0, fill: o.mur || "#F0EFE9" }, g);
    if (o.rayures) { let d = ""; for (let x = x0 + 16; x < x1; x += 32) d += `M${x} ${y0 + 18}V${solY - 26}`; ln(g, d, 2, "#E6E5DD"); }
    el("rect", { x: x0, y: y0, width: x1 - x0, height: 18, fill: "#FAFAF6" }, g);                               // corniche
    ln(g, `M${x0} ${y0 + 7} H${x1}`, 1.4, "#C4C4BD"); ln(g, `M${x0} ${y0 + 18} H${x1}`, 2.2, "#77776F");
    // sol en perspective : lignes fuyantes vers un point au-dessus de l'horizon + traverses de plus en plus espacées
    // (toutes les lignes sont coupées par le calcul aux bords x0 / x1 : la boîte englobante reste celle de la pièce)
    el("rect", { x: x0, y: solY, width: x1 - x0, height: y1 - solY, fill: o.solCol || (parquet ? "#E8E5DB" : "#E4E3DC") }, g);
    const vy = solY - 460, pas = parquet ? 62 : 150, xAt = (xt, y) => 540 + (xt - 540) * ((y - vy) / (solY - vy));
    const yBord = (xt) => { const lim = xt < 540 ? x0 : x1, k = (lim - 540) / (xt - 540); return Math.min(y1, vy + k * (solY - vy)); };   // où la fuyante sort de la pièce
    let fuy = "", trav = "", pts = "";
    for (let i = -10; i <= 10; i++) { const xt = 540 + (i + 0.5) * pas; if (xt <= x0 + 2 || xt >= x1 - 2) continue; const ye = yBord(xt); fuy += `M${f(xt)} ${solY}L${f(xAt(xt, ye))} ${f(ye)}`; }
    (parquet ? [] : [solY + 44, solY + 112, solY + 214, solY + 366]).forEach((y) => { trav += `M${x0} ${y}H${x1}`; });
    ln(g, fuy, parquet ? 1.5 : 1.8, parquet ? "#C9C5B8" : "#C6C5BD"); if (trav) ln(g, trav, 1.8, "#C6C5BD");
    if (parquet) {   // joints des lames, décalés d'une lame à l'autre
      let j = "";
      for (let i = -10; i < 10; i++) for (let k2 = 0; k2 < 3; k2++) {
        const y = solY + 30 + ((i * 53 + k2 * 137) % 380 + 380) % 380, xa = clamp(xAt(540 + (i + 0.5) * pas, y), x0, x1), xb = clamp(xAt(540 + (i + 1.5) * pas, y), x0, x1);
        if (xb - xa > 4) j += `M${f(xa)} ${f(y)}L${f(xb)} ${f(y)}`;
      }
      ln(g, j, 1.5, "#C9C5B8");
    } else {         // lino : petits points
      for (let i = 0; i < 70; i++) { const x = x0 + 8 + hash(i * 3.3 + 1) * (x1 - x0 - 16), y = solY + 10 + hash(i * 7.1 + 2) * (y1 - solY - 20); pts += rond(x, y, 1.4 + (y - solY) / 260); }
      el("path", { d: pts, fill: "#CFCEC6" }, g);
    }
    el("rect", { x: x0, y: solY - 24, width: x1 - x0, height: 24, fill: "#FAFAF6" }, g);                        // plinthe
    ln(g, `M${x0} ${solY - 24} H${x1}`, 1.8, "#8A8A84");
    U.stroke(C, "sol", `M${x0} ${solY} L${x1} ${solY}`, { sw: 2.8, r: 0.5 });
    return { solY, mur: [x0, y0, x1 - x0, solY - y0] };
  };
  D.piece.essais = [{ sol: "lino", solY: 1130 }, { sol: "parquet", solY: 1150, rayures: true }];

  /* D.porte — porte pleine à poignée, chambranle, plaque « Arztzimmer » au-dessus. Battant 150 × 530.
   * Ancrage = milieu du bas du battant ; monde : D.porte.at (battant x 120 → 270, y 600 → 1130 ; plaque 124 → 266, 542 → 578).
   * o.ouverte 0..1 : le battant pivote vers l'intérieur (il se réduit en largeur, on voit un couloir gris). Entrée : growY, pivot bas. */
  D.porte = (g, o = {}) => {
    const C = U.ctx(g, 4310, false, 1), ouv = clamp(o.ouverte || 0, 0, 1), w = 150 * (1 - 0.72 * ouv), xr = -75 + w;
    el("path", { d: "M-80 -542 L94 -542 L94 0 L-80 0 Z", fill: OMBRE }, g);                                       // ombre du chambranle (vers la droite)
    U.shape(C, "chambranle", "M-87 0 L-87 -542 L87 -542 L87 0 Z", MAT.white, { sw: 2.6 });
    if (ouv > 0.02) {   // le couloir, derrière
      el("rect", { x: -75, y: -530, width: 150, height: 530, fill: "#BDBDB6" }, g);
      el("path", { d: "M-75 0 L75 0 L75 -64 L-75 -64 Z", fill: "#A9A9A2" }, g);
      ln(g, "M-75 -64 L75 -64 M20 -64 L20 -420 M20 -420 L75 -440", 1.8, "#8A8A84");
      el("rect", { x: 30, y: -300, width: 34, height: 236, fill: "#CFCFC8", stroke: "#8A8A84", "stroke-width": 1.6 }, g);
    } else el("rect", { x: -75, y: -530, width: 150, height: 530, fill: "#3A3A37" }, g);
    const kx = w / 150, B = el("g", { transform: `translate(-75 0) scale(${kx.toFixed(4)} 1) translate(75 0)` }, g), Cb = U.ctx(B, 4311, false, 1);
    U.shape(Cb, "battant", "M-75 0 L-75 -530 L75 -530 L75 0 Z", MAT.wood, { sw: 2.6, r: 0.6 });
    U.stroke(Cb, "p1", U.rrect(-55, -500, 110, 200, 8), { sw: 1.7, r: 0.5, stroke: "#77776F", single: true });      // deux panneaux
    U.stroke(Cb, "p2", U.rrect(-55, -276, 110, 190, 8), { sw: 1.7, r: 0.5, stroke: "#77776F", single: true });
    U.shape(Cb, "bas", "M-75 0 L-75 -46 L75 -46 L75 0 Z", MAT.mid, { sw: 2.2, r: 0.5 });                           // plaque de propreté
    if (ouv > 0.02) el("rect", { x: -75, y: -530, width: 150, height: 530, fill: "#1C1A1C", opacity: f(0.22 * ouv) }, B);
    // poignée (elle garde sa taille quand le battant se réduit)
    const px = xr - 20 * kx - 6;
    el("rect", { x: f(px - 7), y: -296, width: 14, height: 52, rx: 6, fill: "#FFFFFF", stroke: INK, "stroke-width": 2.2 }, g);
    ln(g, `M${f(px)} -282 L${f(px - 30 * Math.max(0.5, kx))} -282`, 6.5, SOMBRE); el("circle", { cx: f(px), cy: -282, r: 5.5, fill: SOMBRE, stroke: INK, "stroke-width": 1.6 }, g);
    el("circle", { cx: f(px), cy: -258, r: 2.6, fill: INK }, g);
    // plaque au-dessus
    el("path", { d: U.rrect(-71 + 4, -588 + 5, 142, 36, 6), fill: OMBRE }, g);
    U.shape(C, "plaque", U.rrect(-71, -588, 142, 36, 6), MAT.white, { sw: 2.2, r: 0.5 });
    tx(g, "Arztzimmer", 0, -563, 20, "de");
    return { poignee: [f(px), -282], haut: [0, -542], seuil: [0, 0] };
  };
  D.porte.at = [195, 1130];
  D.porte.essais = [{}, { ouverte: 1 }];

  /* D.pateres — tringle à DEUX patères. Ancrage = milieu de la tringle ; monde : D.pateres.at (tringle x 292 → 404, y 606).
   * Renvoie les deux points d'accroche { g, d } (monde : (328, 620) et (378, 620)) : D.blouse s'y pend. Entrée : drop. */
  D.pateres = (g) => {
    const C = U.ctx(g, 4320, false, 1);
    el("path", { d: U.rrect(-56 + 4, -8 + 5, 112, 16, 6), fill: OMBRE }, g);
    U.shape(C, "tringle", U.rrect(-56, -8, 112, 16, 6), MAT.wood, { sw: 2.4 });
    [-46, 48].forEach((x) => el("circle", { cx: x, cy: 0, r: 2.6, fill: "#8A8A84", stroke: INK, "stroke-width": 1 }, g));   // deux vis
    [-20, 30].forEach((x) => {   // patères : une tige qui descend, un crochet, un bouton
      ln(g, `M${x} 4 L${x} 12 Q${x} 21 ${x + 8} 21`, 4.6, SOMBRE);
      el("circle", { cx: x + 10, cy: 19, r: 4.6, fill: "#CFCFCA", stroke: INK, "stroke-width": 2 }, g);
    });
    return { g: [-20, 14], d: [30, 14] };
  };
  D.pateres.at = [348, 606];

  /* D.blouse — blouse blanche pendue par sa bride (étroite : elle tombe en plis), col, manche, poche ; o.badge : un badge au trait.
   * 46 × 280, ancrage = la bride (point d'accroche) ; monde : D.blouse.at (patère de gauche) ou D.blouse.atDroite (celle de LUI,
   * scène 14, avec badge). Elle se balance (m.sway ±1°, 3,6 s ; m.pend ±7° au passage de LUI), pivot = l'ancrage. */
  D.blouse = (g, o = {}) => {
    const C = U.ctx(g, o.badge ? 4331 : 4330, false, 1);
    const corps = "M-7 8 C-16 9 -21 17 -21 30 C-21 110 -22 190 -23 268 Q-12 282 0 272 Q12 284 23 266 C22 190 21 110 21 30 C21 17 16 9 7 8 Q0 13 -7 8 Z";
    el("path", { d: corps, fill: OMBRE, transform: "translate(6 6)" }, g);
    ln(g, "M0 0 Q-5 4 -3 9 M0 0 Q5 4 3 9", 2.4);                                                              // la bride
    U.shape(C, "manche", "M-17 30 C-26 50 -29 130 -28 204 Q-22 212 -15 204 C-16 140 -14 80 -12 50 Z", MAT.white, { sw: 2.2 });   // manche qui pend, derrière
    U.shape(C, "corps", corps, MAT.white, { sw: 2.5 });
    ln(g, "M-6 9 Q-15 24 -10 46 L0 64 M6 9 Q15 24 10 46 L0 64", 2.1);                                           // le col et ses revers
    ln(g, "M0 64 C1 130 1 200 0 272", 1.7, "#8A8A84");                                                          // le bord de devant
    ln(g, "M-11 70 C-13 140 -14 210 -15 262 M10 76 C12 150 13 214 14 258 M-5 120 C-6 170 -6 220 -7 266", 1.4, "#C4C4BD");   // plis
    [96, 142].forEach((y) => el("circle", { cx: 4, cy: y, r: 2.4, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.4 }, g));
    ln(g, "M5 186 L18 186 L18.5 214 Q12 219 5.5 214 Z", 1.9); ln(g, "M5 192 L18 192", 1.3, "#8A8A84");            // la poche
    ln(g, "M-28 197 Q-22 203 -15 197", 1.6, "#8A8A84");                                                          // le poignet de la manche
    if (o.badge) {   // le badge : une carte au trait pincée sur le revers
      el("path", { d: U.rrect(5, 70, 15, 20, 2.5), fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g);
      el("circle", { cx: 12.5, cy: 77, r: 3, fill: "#CFCFCA", stroke: INK, "stroke-width": 1.2 }, g); ln(g, "M8 84 h9 M8 87 h6", 1.2, "#77776F");
      el("rect", { x: 10, y: 65, width: 5, height: 7, rx: 1.5, fill: SOMBRE }, g);
    }
    return { bas: [0, 272], poche: [12, 200] };
  };
  D.blouse.at = [328, 620]; D.blouse.atDroite = [378, 620];
  D.blouse.essais = [{}, { badge: true }];

  /* D.tableauGardes — tableau blanc magnétique à cadre gris : « Dienstplan », « Wochenende », trois colonnes « Fr », « Sa »,
   * « So · Tag », une rangée d'emplacements, gouttière en bas (feutre, brosse). 280 × 266.
   * Ancrage = milieu du bord haut (le pivot du balancement) ; monde : D.tableauGardes.at (x 424 → 704, y 540 → 806).
   * Renvoie les emplacements des aimants { fr, sa, so } (monde : Fr (478, 690), Sa (564, 690), So (650, 690)) et { gouttiere }.
   * Scène 2 : VIDE (aucun aimant). Les aimants (D.aimant) sont des nœuds à part. */
  D.tableauGardes = (g, o = {}) => {
    const C = U.ctx(g, 4340, false, 1);
    ln(g, "M-46 4 L0 -9 L46 4", 1.8, "#55524B"); el("circle", { cx: 0, cy: -9, r: 4.2, fill: SOMBRE, stroke: INK, "stroke-width": 1.4 }, g);   // le fil et le clou
    el("path", { d: U.rrect(-140 + 7, 8, 280, 250, 10), fill: OMBRE }, g);
    U.shape(C, "cadre", U.rrect(-140, 0, 280, 250, 10), MAT.mid, { sw: 2.8 });
    U.shape(C, "blanc", U.rrect(-129, 11, 258, 228, 4), MAT.white, { sw: 2, r: 0.5 });
    tx(g, "Dienstplan", -118, 44, 22, "de", "start"); tx(g, "Wochenende", 118, 44, 19, "light", "end", { fill: "#55524B" });
    ln(g, "M-118 52 L-12 52", 2.2); ln(g, "M-118 104 L118 104", 1.6, "#8A8A84");
    ln(g, "M-43 66 L-43 204 M43 66 L43 204", 1.6, "#B4B4AE");
    [["Fr", -86], ["Sa", 0], ["So · Tag", 86]].forEach(([s, x]) => tx(g, s, x, 92, 20, "de"));
    [-86, 0, 86].forEach((x) => el("circle", { cx: x, cy: 150, r: 28, fill: "#F6F6F1", stroke: "#B4B4AE", "stroke-width": 1.8, "stroke-dasharray": "5 6" }, g));   // la rangée d'emplacements
    ln(g, "M-112 216 h70 M-28 216 h44 M36 216 h60", 2.4, "#DADAD3");
    // gouttière : feutre et brosse
    el("path", { d: U.rrect(-124 + 5, 244 + 6, 248, 20, 6), fill: OMBRE }, g);
    el("rect", { x: -84, y: 233, width: 54, height: 11, rx: 5, fill: SOMBRE, stroke: INK, "stroke-width": 1.6 }, g); el("rect", { x: -44, y: 233, width: 14, height: 11, rx: 4, fill: "#8A8A84", stroke: INK, "stroke-width": 1.4 }, g);
    el("rect", { x: 70, y: 228, width: 40, height: 9, rx: 2, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.6 }, g); el("rect", { x: 70, y: 237, width: 40, height: 7, rx: 2, fill: "#8A8A84", stroke: INK, "stroke-width": 1.4 }, g);
    U.shape(C, "gout", U.rrect(-124, 244, 248, 20, 6), MAT.grey, { sw: 2.4 });
    return { fr: [-86, 150], sa: [0, 150], so: [86, 150], gouttiere: [0, 244] };
  };
  D.tableauGardes.at = [564, 540];

  /* D.aimant — aimant rond du tableau des gardes, r 26, ancrage = centre. o.qui "lui" (gris, pictogramme de cheveux bouclés)
   * | "elle" (blanc cerné de jaune, pictogramme de cheveux longs) | "gris" (sans pictogramme : les autres, scène 14).
   * Aucun nom, aucune initiale. Emplacements : D.tableauGardes. */
  D.aimant = (g, o = {}) => {
    const elle = o.qui === "elle", C = U.ctx(g, elle ? 4351 : 4350, false, 1);
    el("circle", { cx: 3, cy: 4, r: 26, fill: OMBRE }, g);
    if (elle) { el("circle", { cx: 0, cy: 0, r: 26, fill: YEL, stroke: INK, "stroke-width": 2.4 }, g); el("circle", { cx: 0, cy: 0, r: 19.5, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g); }
    else U.shape(C, "aim", rond(0, 0, 26), MAT.mid, { sw: 2.4, r: 0.5 });
    if (elle) {   // cheveux longs : deux mèches qui tombent de chaque côté d'une tête ronde
      el("path", { d: "M-10 -3 C-11 -15 11 -15 10 -3 C13 4 12 11 14 15 L6 15 C7 9 7 4 6 0 L-6 0 C-7 4 -7 9 -6 15 L-14 15 C-12 11 -13 4 -10 -3 Z", fill: "#DADAD3", stroke: INK, "stroke-width": 1.8, "stroke-linejoin": "round" }, g);
      el("circle", { cx: 0, cy: 0, r: 6.5, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g);
    } else if (o.qui === "gris") {   // aimant gris SANS pictogramme (scène 14 : les gardes des autres) : un simple reflet
      el("path", { d: "M-15 -6 A16 16 0 0 1 -4 -16", fill: "none", stroke: "#FFFFFF", "stroke-width": 3.4, "stroke-linecap": "round", opacity: 0.8 }, g);
    } else {      // cheveux bouclés : une couronne de petites boucles au-dessus d'une tête ronde
      el("circle", { cx: 0, cy: 3, r: 9, fill: "#FFFFFF", stroke: INK, "stroke-width": 1.8 }, g);
      [[-10, -2], [-7, -9], [0, -12], [7, -9], [10, -2], [-3, -6], [4, -6]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 4.4, fill: "#55524B", stroke: INK, "stroke-width": 1.4 }, g));
    }
    return { r: 26 };
  };
  D.aimant.essais = [{ qui: "lui" }, { qui: "elle" }, { qui: "gris" }];

  /* D.postit — feuillet jaune pâle à coin corné : o.de (15 px), o.ar (26 px gras : la règle des traductions, ≥ 26 px — le storyboard
   * disait 24), micro « laut Urteil ». 160 × 78 au moins (il s'élargit si le texte le demande), ancrage = centre ; monde :
   * D.postit.at. Il se balance (m.sway ±3°, pivot = bord haut). */
  D.postit = (g, o = {}) => {
    const de = o.de == null ? "« zum wiederholten Male »" : o.de, ar = o.ar == null ? "ماشي أول مرة" : o.ar, micro = o.micro == null ? "laut Urteil" : o.micro;
    const w = Math.max(160, Math.round(mesure(de, 15, "de")) + 24, Math.round(mesure(ar, 26, "ar")) + 24), h = micro ? 86 : 78, x = -w / 2, y = -h / 2, C = U.ctx(g, 4360, false, 1);
    const d = `M${x} ${y} L${x + w} ${y} L${x + w} ${y + h - 16} L${x + w - 16} ${y + h} L${x} ${y + h} Z`;
    el("path", { d, fill: OMBRE, transform: "translate(5 6)" }, g);
    U.shape(C, "post", d, { base: "#FFF3B8" }, { sw: 2.2, r: 0.5 });
    el("path", { d: `M${x + w} ${y + h - 16} L${x + w - 16} ${y + h} L${x + w - 15} ${y + h - 15} Z`, fill: "#E9D98A", stroke: INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, g);
    el("rect", { x: -17, y: y - 5, width: 34, height: 12, fill: "rgba(190,190,182,.9)" }, g);                   // un bout de scotch
    tx(g, de, 0, y + 25, 15, "de"); tx(g, ar, 0, y + 56, 26, "ar");
    if (micro) tx(g, micro, x + 10, y + h - 8, 12.5, "light", "start", { fill: "#55524B" });
    return { w, h, haut: [0, y] };
  };
  D.postit.at = [720, 795];

  /* D.troisPostit — trois feuillets jaunes sans texte (traits gris), en grappe. 104 × 100, ancrage = centre ; monde : D.troisPostit.at.
   * o.i 0 | 1 | 2 : n'en dessiner qu'UN (trois nœuds à part pour un balancement désynchronisé) ; sans o.i : les trois. */
  D.troisPostit = (g, o = {}) => {
    const lots = [[-27, -22, -6], [22, -10, 5], [-5, 27, -3]];
    lots.forEach(([x, y, r], i) => {
      if (o.i != null && o.i !== i) return;
      const p = el("g", { transform: `translate(${x} ${y}) rotate(${r})` }, g), C = U.ctx(p, 4370 + i, false, 1);
      const d = "M-23 -23 L23 -23 L23 13 L13 23 L-23 23 Z";
      el("path", { d, fill: OMBRE, transform: "translate(4 5)" }, p);
      U.shape(C, "p", d, { base: i === 1 ? "#FBE9A0" : "#FFF3B8" }, { sw: 2, r: 0.5 });
      el("path", { d: "M23 13 L13 23 L14 14 Z", fill: "#E9D98A", stroke: INK, "stroke-width": 1.4, "stroke-linejoin": "round" }, p);
      ln(p, `M-15 -10 h${24 + i * 4} M-15 -1 h${30 - i * 5} M-15 8 h${18 + i * 3}`, 2.2, "#B4B4AE");
      el("circle", { cx: 0, cy: -19, r: 2.8, fill: SOMBRE }, p);                                                 // la punaise
    });
    return { centres: lots.map(([x, y]) => [x, y - 23]) };
  };
  D.troisPostit.at = [810, 600];

  /* D.planDeTravail — meuble bas : plateau, deux portes, poignées, socle. 242 × 140.
   * Ancrage = milieu du bas ; monde : D.planDeTravail.at (x 632 → 866, plateau y 1010, bas y 1150). Entrée : rise. */
  D.planDeTravail = (g) => {
    const C = U.ctx(g, 4380, false, 1);
    el("path", { d: "M-113 -126 L120 -126 L120 0 L-113 0 Z", fill: OMBRE }, g);
    U.shape(C, "socle", "M-107 0 L-107 -16 L107 -16 L107 0 Z", MAT.dark, { sw: 2.2, r: 0.5 });
    U.shape(C, "corps", "M-113 -14 L-113 -126 L113 -126 L113 -14 Z", MAT.light, { sw: 2.6 });
    [[-105, 100], [5, 100]].forEach(([x, w], i) => {
      U.stroke(C, "porte" + i, U.rrect(x, -118, w, 96, 5), { sw: 1.9, r: 0.5, single: true });
      ln(g, `M${i ? x + 14 : x + w - 14} -92 v36`, 5.5, SOMBRE);                                                 // poignées, vers le milieu
    });
    el("path", { d: U.rrect(-117 + 4, -140 + 5, 234, 14, 4), fill: "rgba(28,26,28,.14)" }, g);
    U.shape(C, "plateau", U.rrect(-117, -140, 234, 14, 4), MAT.white, { sw: 2.6 });
    return { plateau: [0, -140] };
  };
  D.planDeTravail.at = [749, 1150];

  /* D.machineCafe — machine à café : colonne, réservoir d'eau à l'arrière, tête, bec, bac, tasse. 120 × 164.
   * Ancrage = milieu du bas (posée sur le plateau) ; monde : D.machineCafe.at (x 706 → 826, y 846 → 1010).
   * o.voyant 0/1 (il clignote à 1 Hz) · o.goutte 0..1 (elle tombe du bec dans la tasse, une toutes les 1,4 s).
   * Renvoie { bec, tasse, voyant } : la vapeur (D.vapeur) se pose sur « tasse ». Entrée : drop avec rebond. */
  D.machineCafe = (g, o = {}) => {
    const C = U.ctx(g, 4390, false, 1), go = o.goutte == null ? 0 : clamp(o.goutte, 0, 1);
    el("path", { d: "M-52 -158 L-8 -158 L-8 -126 L58 -126 L58 -84 L-2 -84 L-2 -14 L60 -14 L60 0 L-52 0 Z", fill: OMBRE, transform: "translate(7 6)" }, g);
    // réservoir d'eau, à l'arrière : il dépasse au-dessus de la colonne
    el("path", { d: U.rrect(-50, -164, 40, 70, 7), fill: "#FAFAF6", stroke: INK, "stroke-width": 2.4 }, g);
    el("path", { d: "M-48 -140 Q-40 -144 -30 -140 T-12 -140 L-12 -100 L-48 -100 Z", fill: "#E4E4DE" }, g); ln(g, "M-48 -140 Q-40 -144 -30 -140 T-12 -140", 1.6, "#8A8A84");
    ln(g, "M-44 -156 h8 M-44 -150 h5", 1.4, "#8A8A84");
    U.shape(C, "colonne", U.rrect(-56, -130, 54, 118, 8), MAT.mid, { sw: 2.6 });
    ln(g, "M-46 -34 h34 M-46 -26 h34", 1.6, "#55524B");                                                          // ouïes
    U.shape(C, "tete", U.rrect(-12, -130, 70, 44, 9), MAT.white, { sw: 2.6 });
    el("circle", { cx: 6, cy: -108, r: 6, fill: "#E1E1DC", stroke: INK, "stroke-width": 2 }, g); el("circle", { cx: 24, cy: -108, r: 6, fill: "#E1E1DC", stroke: INK, "stroke-width": 2 }, g);
    if (o.voyant) el("circle", { cx: 44, cy: -108, r: 10, fill: YEL, opacity: 0.35 }, g);
    el("circle", { cx: 44, cy: -108, r: 5.5, fill: o.voyant ? YEL : "#FFFFFF", stroke: INK, "stroke-width": 2 }, g);   // le voyant
    el("path", { d: "M14 -86 L32 -86 L29 -74 L17 -74 Z", fill: SOMBRE, stroke: INK, "stroke-width": 2, "stroke-linejoin": "round" }, g);   // le bec
    U.shape(C, "bac", U.rrect(-56, -14, 116, 14, 4), MAT.dark, { sw: 2.4, r: 0.5 });
    ln(g, "M2 -7 h50", 1.6, "#B4B4AE", { "stroke-dasharray": "4 5" });
    // la tasse sous le bec
    ln(g, "M36 -37 q11 2 9 10 q-2 6 -11 5", 3);
    el("path", { d: "M8 -44 L38 -44 L35 -16 Q23 -12 11 -16 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4, "stroke-linejoin": "round" }, g);
    ln(g, "M12 -36 h22", 1.4, "#B4B4AE");
    if (go > 0.02 && go < 0.98) { const y = lerp(-72, -46, go * go); el("path", { d: `M23 ${f(y - 7)} q4.5 7 0 9.5 q-4.5 -2.5 0 -9.5 Z`, fill: "#55524B", stroke: INK, "stroke-width": 1 }, g); }
    return { bec: [23, -74], tasse: [23, -46], voyant: [44, -108] };
  };
  D.machineCafe.at = [766, 1010];
  D.machineCafe.essais = [{}, { voyant: 1, goutte: 0.6 }];

  /* D.vapeur — deux volutes qui montent et se dissipent. 40 × 60, ancrage = la source (bas, centre). o.t 0..1 = phase du cycle
   * (1,8 s pour la machine) : arrondir à 0,05. */
  D.vapeur = (g, o = {}) => {
    const t = o.t == null ? 0.35 : o.t;
    [0, 0.5].forEach((dph, i) => {
      const p = ((t + dph) % 1 + 1) % 1, x = i ? 9 : -8, a = 5 + 5 * p, y0 = -4 - 28 * p;
      ln(g, `M${x} ${f(y0)} q${f(a)} -7 0 -14 q${f(-a)} -7 0 -14`, 3.2, "#A1A19B", { opacity: f(Math.sin(p * Math.PI) * 0.9) });
    });
  };
  D.vapeur.essais = [{ t: 0.2 }, { t: 0.6 }];

  /* D.tasses — deux tasses empilées. 52 × 40, ancrage = milieu du bas ; monde : D.tasses.at (x 652 → 700, y 972 → 1010). */
  D.tasses = (g) => {
    el("path", { d: "M-16 -22 L18 -22 L15 0 L-13 0 Z", fill: OMBRE, transform: "translate(5 4)" }, g);
    ln(g, "M-15 -31 q-11 1 -9 8 q2 5 10 4", 3);                                                                  // anse de celle du dessus (à gauche)
    el("path", { d: "M-17 -38 L17 -38 L14 -16 L-14 -16 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4, "stroke-linejoin": "round" }, g);
    ln(g, "M15 -15 q11 1 9 8 q-2 5 -10 4", 3);                                                                   // anse de celle du dessous (à droite)
    el("path", { d: "M-17 -22 L17 -22 L14 0 L-14 0 Z", fill: "#FFFFFF", stroke: INK, "stroke-width": 2.4, "stroke-linejoin": "round" }, g);
    ln(g, "M-12 -14 h24", 1.4, "#B4B4AE"); ln(g, "M-12 -31 h24", 1.4, "#B4B4AE");
    return { haut: [0, -38] };
  };
  D.tasses.at = [676, 1010];

  /* D.plante — plante en pot aux feuilles dressées, hachurées GRISES (aucun vert hors de la bulle). 40 × 112.
   * Ancrage = milieu du bas du pot ; monde : D.plante.at (x 830 → 864, y 900 → 1010). Entrée : grow ; elle se balance (±2°, 4 s). */
  D.plante = (g) => {
    const C = U.ctx(g, 4400, false, 1);
    [[-9, -34, -15, -86, 7], [8, -34, 15, -96, 7], [-3, -34, -5, -110, 8], [4, -34, 7, -76, 6], [-12, -34, -20, -62, 5]].forEach(([x0, y0, x1, y1, w], i) => {
      const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, s = x1 < x0 ? -1 : 1;
      U.shape(C, "f" + i, `M${x0 - w / 2} ${y0} Q${f(mx - w * 0.9 + s * 2)} ${f(my)} ${x1} ${y1} Q${f(mx + w * 0.9 + s * 2)} ${f(my)} ${x0 + w / 2} ${y0} Z`, i % 2 ? MAT.grey : MAT.mid, { sw: 2, r: 0.6 });
      ln(g, `M${x0} ${y0 - 4} Q${f(mx + s * 2)} ${f(my)} ${x1} ${y1 + 8}`, 1.1, "#55524B");
    });
    el("path", { d: "M-15 -34 L15 -34 L11 0 L-11 0 Z", fill: OMBRE, transform: "translate(5 4)" }, g);
    U.shape(C, "pot", "M-14 -32 L14 -32 L11 0 L-11 0 Z", MAT.white, { sw: 2.4 });
    U.shape(C, "bord", U.rrect(-17, -38, 34, 9, 3), MAT.white, { sw: 2.2, r: 0.5 });
    ln(g, "M-9 -18 h18", 1.4, "#B4B4AE");
    return { haut: [0, -110] };
  };
  D.plante.at = [847, 1010];

  /* D.ticketPoche — le TICKET DE CAISSE qui sort de SA poche (même papier que D.ticketCaisse, scène 17), version une ligne :
   * « 1.000,00 EUR » (Kalam 34 px), pointillés, « zu zahlen » (20 px), bord bas en dents de scie. 200 × 110.
   * Ancrage = la FENTE de la poche, sur le bord haut du ticket, à o.ax × 200 px de son bord gauche (défaut 0,05 : le ticket dépasse
   * vers la droite, devant rien d'important ; 0,5 = milieu du bord haut). Monde, scène 2 : fente = hip + (24, 22) × 1,04.
   * o.sorti 0..1 : il s'imprime vers le bas (découpe au ras de la fente) ; ensuite m.pend (±3°, pivot = l'ancrage) et pulse.
   * o.fente false : ne pas dessiner la lèvre de la poche. Jamais d'étiquette à ficelle (objet d'AKTE 08). */
  D.ticketPoche = (g, o = {}) => {
    const W = 200, H = 110, s = clamp(o.sorti == null ? 1 : o.sorti, 0, 1), x0 = -W * (o.ax == null ? 0.05 : o.ax);
    const id = nid("tk"), cp = el("clipPath", { id }, g); el("rect", { x: x0 - 20, y: 0, width: W + 50, height: H + 30 }, cp);
    const P = el("g", { transform: `translate(0 ${f(-(1 - s) * (H + 4))})` }, el("g", { "clip-path": `url(#${id})` }, g)), C = U.ctx(P, 4410, false, 1);
    papierTicket(P, C, "ticket", x0, -6, W, H + 6);
    const somme = "1.000,00 EUR", ws = mesure(somme, 34, "de"), fs = Math.min(34, Math.floor((34 * (W - 30)) / Math.max(1, ws)));
    tx(P, somme, x0 + W / 2, 46, fs, "de");
    ln(P, `M${f(x0 + 16)} 62 H${f(x0 + W - 16)}`, 2, "#77776F", { "stroke-dasharray": "2 7" });
    tx(P, "zu zahlen", x0 + W / 2, 87, 20, "de");
    if (o.fente !== false) { ln(g, "M-20 1 Q2 -5 26 0", 5.5, INK); ln(g, "M-17 6 Q2 1 23 5", 2, "#8A8A84"); }       // la lèvre de la poche, par-dessus le ticket
    return { w: W, h: H, centre: [x0 + W / 2, H / 2], bas: [x0 + W / 2, H] };
  };
  D.ticketPoche.essais = [{}, { sorti: 0.5 }, { ax: 0.5, fente: false }];

  /* D.colere — marque de colère de BD : quatre petits arcs en croix. 34 × 34, ancrage = centre. pop + wobble. */
  D.colere = (g) => {
    for (let i = 0; i < 4; i++) ln(el("g", { transform: `rotate(${i * 90})` }, g), "M4 -16 Q4.5 -4.5 16 -4", 4.2);
    return { w: 34 };
  };

  /* D.poussiere — trois petits nuages au ras du sol (elle tape du pied). 120 × 40, ancrage = milieu du bas.
   * o.p 0..1 : ils grossissent, s'écartent et s'effacent en 0,35 s. */
  D.poussiere = (g, o = {}) => {
    const p = clamp(o.p == null ? 0.35 : o.p, 0, 1), op = f(1 - p * p), k = 0.55 + 0.6 * p;
    [[-38, -9, 13, -1], [0, -15, 16, 0], [40, -9, 12, 1]].forEach(([x, y, r, dir]) => {
      const cx = x + dir * 16 * p, cy = y - 6 * p, R = r * k;
      el("path", { d: `M${f(cx - R)} ${f(cy + R * 0.5)} Q${f(cx - R * 1.3)} ${f(cy - R * 0.3)} ${f(cx - R * 0.5)} ${f(cy - R * 0.5)} Q${f(cx - R * 0.2)} ${f(cy - R * 1.2)} ${f(cx + R * 0.4)} ${f(cy - R * 0.6)} Q${f(cx + R * 1.3)} ${f(cy - R * 0.5)} ${f(cx + R)} ${f(cy + R * 0.5)} Z`,
        fill: "#F4F4EF", stroke: "#8A8A84", "stroke-width": 2.2, "stroke-linejoin": "round", opacity: op }, g);
    });
  };
  D.poussiere.essais = [{ p: 0.1 }, { p: 0.6 }];

  D.outils = { tx, mesure, ln, el, rond, ovale, rrectInv, bullePath, papierTicket, hash, nid, FONT, INK, YEL, OMBRE, ECRAN, PAPIER, GRIS, SOMBRE, MAT,
    poser: (m, nom, o) => m.obj(D[nom], D[nom].at[0], D[nom].at[1], 1, o) };   // meuble posé à sa place du storyboard

  // EXEMPLE du gabarit (À SUPPRIMER par l'étape des scènes : il ne sert qu'aux scènes d'exemple de scenes-1.js)
  D.exemple = (g, o = {}) => {
    const C = U.ctx(g, 611, false, 1), L = o.len || 110;
    el("path", { d: `M-40 ${L + 34} L40 ${L + 34} L240 ${L + 900} L-240 ${L + 900} Z`, fill: "#F8CE4E", opacity: 0.13 }, g);
    U.stroke(C, "fil", `M0 0 L0 ${L}`, { sw: 3 });
    U.shape(C, "abat", `M-16 ${L} L16 ${L} L46 ${L + 34} L-46 ${L + 34} Z`, MAT.grey, { sw: 2.6 });
    el("ellipse", { cx: 0, cy: L + 36, rx: 22, ry: 8, fill: "#FFF6C9", stroke: INK, "stroke-width": 2 }, g);
    return { ampoule: [0, L + 36] };
  };

})();
