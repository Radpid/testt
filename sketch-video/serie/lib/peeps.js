/* Peeps — assemble les pièces Open Peeps (CC0) en personnages SVG, sans React.
 * Nécessite serie/lib/peeps-parts.js (généré par `npm run build:peeps`).
 *
 *   Peeps.markup({ body, face, hair, facialHair, accessory })  -> "<g>…</g>" dans le repère Open Peeps
 *   Peeps.place(parent, { x, y, scale, flip, body, face, hair, … , cls, vars })
 *       -> <g> posé avec le bas du corps (pieds ou bas du buste) au point (x, y)
 * Les couleurs suivent les variables CSS : --ink (traits), --skin (fond blanc des corps et visages),
 * --peep-9FD8E5 / --peep-8FA7DF / --peep-4F66AF (vêtements colorés de certains corps).
 */
(function (global) {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const parts = () => {
    if (!global.PEEPS_PARTS) throw new Error("peeps-parts.js manquant (npm run build:peeps)");
    return global.PEEPS_PARTS;
  };

  function markup(o) {
    const P = parts();
    const pick = (set, name, what) => {
      if (!name) return "";
      if (!(name in P[set])) throw new Error(`Open Peeps : ${what} « ${name} » inconnu. Choix : ${Object.keys(P[set]).join(", ")}`);
      return P[set][name];
    };
    return `<g class="peep">${pick("body", o.body, "corps")}` +
      `<g transform="translate(225 0)">` +
      `<g class="peep-hair">${pick("hair", o.hair, "coiffure")}</g>` +
      `<g class="peep-face" transform="translate(159 186)">${pick("face", o.face, "visage")}</g>` +
      `<g transform="translate(123 338)">${pick("facialHair", o.facialHair, "barbe")}</g>` +
      `<g transform="translate(47 241)">${pick("accessory", o.accessory, "accessoire")}</g>` +
      `</g></g>`;
  }

  // boîte englobante de chaque corps (mesurée une fois dans le navigateur)
  const boxCache = {};
  let probe;
  function bodyBox(body) {
    if (boxCache[body]) return boxCache[body];
    if (!probe) {
      probe = document.createElementNS(NS, "svg");
      probe.setAttribute("style", "position:absolute;left:-99999px;top:0;width:10px;height:10px;overflow:hidden");
      document.body.appendChild(probe);
    }
    probe.innerHTML = markup({ body, hair: "Short", face: "Calm" });
    const b = probe.firstChild.getBBox();
    boxCache[body] = { x: b.x, y: b.y, w: b.width, h: b.height, cx: b.x + b.width / 2, bottom: b.y + b.height };
    probe.innerHTML = "";
    return boxCache[body];
  }

  function place(parent, o) {
    const b = bodyBox(o.body);
    const s = o.scale || 0.3, fx = o.flip ? -1 : 1;
    const g = document.createElementNS(NS, "g");
    const tx = o.x - fx * b.cx * s, ty = o.y - b.bottom * s;
    g.setAttribute("transform", `translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${(fx * s).toFixed(4)} ${s.toFixed(4)})`);
    if (o.cls) g.setAttribute("class", o.cls);
    if (o.vars) g.setAttribute("style", Object.entries(o.vars).map(([k, v]) => `${k}:${v}`).join(";"));
    g.innerHTML = markup(o);
    parent.appendChild(g);
    g.peepBox = { x: o.x, y: o.y, top: o.y - b.h * s, height: b.h * s, width: b.w * s };
    return g;
  }

  const list = (set) => Object.keys(parts()[set]);
  global.Peeps = { markup, place, bodyBox, list, kind: (b) => parts().kind[b] };
})(window);
