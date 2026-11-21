// Exporte les pièces Open Peeps (Pablo Stanley, licence CC0) en SVG pour le navigateur, sans React.
//   npm run build:peeps   ->  serie/lib/peeps-parts.js
// Les couleurs sont remplacées par des variables CSS (--ink, --skin, --main…) pour suivre la palette choisie.
const fs = require("fs");
const path = require("path");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

const root = path.dirname(require.resolve("react-peeps/package.json"));
const lib = (p) => require(path.join(root, "lib/peeps", p));
const Pose = lib("pose/index.js").default;
const Hair = lib("hair/index.js").default;
const Face = lib("face/index.js").default;
const FacialHair = lib("facialHair/index.js").default;
const Acc = lib("accessories/index.js").default;
const P = require("react-peeps");

const INK = "#010203", BG = "#FDFEFD";
const seen = new Map();
function recolor(svg) {
  return svg.replace(/(fill|stroke)="(#[0-9a-fA-F]{3,6})"/g, (m, attr, col) => {
    const c = col.toUpperCase();
    seen.set(c, (seen.get(c) || 0) + 1);
    if (c === INK.toUpperCase()) return `${attr}="var(--ink)"`;
    if (c === BG.toUpperCase()) return `${attr}="var(--skin)"`;
    return `${attr}="var(--peep-${c.slice(1)}, ${col})"`;
  });
}
function render(Comp, props) {
  // les composants rendent un <g> : on l'enveloppe dans un <svg> pour le rendu serveur
  const s = renderToStaticMarkup(React.createElement("svg", null, React.createElement(Comp, { ...props, strokeColor: INK, backgroundColor: BG })));
  return recolor(s.replace(/^<svg>/, "").replace(/<\/svg>$/, ""));
}

const out = { body: {}, hair: {}, face: {}, facialHair: {}, accessory: {}, kind: {} };
for (const [kind, set] of [["standing", P.StandingPose], ["sitting", P.SittingPose], ["bust", P.BustPose]]) {
  for (const name of Object.keys(set)) { out.body[name] = render(Pose, { piece: name }); out.kind[name] = kind; }
}
for (const name of Object.keys(P.Hair)) out.hair[name] = render(Hair, { piece: name });
for (const name of Object.keys(P.Face)) out.face[name] = render(Face, { piece: name });
for (const name of Object.keys(P.FacialHair)) out.facialHair[name] = render(FacialHair, { piece: name });
for (const name of Object.keys(P.Accessories)) out.accessory[name] = render(Acc, { piece: name });

const dest = path.join(__dirname, "../lib/peeps-parts.js");
fs.writeFileSync(dest,
  "/* Open Peeps par Pablo Stanley — https://www.openpeeps.com — licence CC0 (domaine public).\n" +
  " * Fichier généré par serie/tools/build-peeps.cjs (via react-peeps, MIT). Ne pas modifier à la main. */\n" +
  "window.PEEPS_PARTS = " + JSON.stringify(out) + ";\n");
const n = (o) => Object.keys(o).length;
console.log(`OK -> ${path.relative(process.cwd(), dest)} (${(fs.statSync(dest).size / 1024).toFixed(0)} Ko) : ` +
  `${n(out.body)} corps, ${n(out.hair)} coiffures, ${n(out.face)} visages`);
console.log("couleurs fixes rencontrées :", [...seen.entries()].filter(([c]) => c !== INK.toUpperCase() && c !== BG.toUpperCase()).map(([c, k]) => `${c}×${k}`).join(" "));
