// Planche d'essai des décors d'un épisode : chaque fonction de window.EpDecor dessinée SEULE, avec son nom,
// sa taille et son point d'ancrage (croix rouge), pour la contrôler avant de monter les scènes.
//   node tools/essai_decor.mjs videos/<episode> [--only nom1,nom2] [--cols 4] [--cell 500] [--per 12] [--out dir]
// Paramètres : D.nom.essais = [{ … }, { … }] (facultatif, déclaré dans decor.js) donne les états à montrer ;
// sinon la fonction est appelée avec {} (elle doit donc avoir des valeurs par défaut).
// Écrit <episode>/out/essais/decor_NN.png et signale les fonctions qui plantent ou ne dessinent rien.
import { createRequire } from "node:module"; import fs from "node:fs"; import path from "node:path"; import { pathToFileURL } from "node:url";
const require = createRequire(path.resolve("package.json"));
let chromium; try { ({ chromium } = require("playwright")); } catch { ({ chromium } = await import("playwright")); }
const args = process.argv.slice(2), opt = (n, d) => { const i = args.indexOf("--" + n); return i < 0 ? d : args[i + 1]; };
const dir = path.resolve(args[0] || "");
if (!fs.existsSync(path.join(dir, "decor.js"))) { console.error("usage : node tools/essai_decor.mjs videos/<episode> [--only a,b] [--cols 4] [--cell 500]"); process.exit(1); }
const outDir = path.resolve(opt("out", path.join(dir, "out", "essais"))); fs.mkdirSync(outDir, { recursive: true });
const cols = +opt("cols", 4), cell = +opt("cell", 500), per = +opt("per", 12), only = opt("only", null) ? opt("only").split(",") : null;
const root = pathToFileURL(path.resolve(".")).href, ep = pathToFileURL(dir).href;
const libs = ["engine/vendor/rough.js", "serie/lib/cast.js", "serie/lib/sketch-cast.js", "serie/lib/persona.js"].map((f) => `<script src="${root}/${f}"></script>`).join("");
const decs = fs.readdirSync(dir).filter((f) => /^decor(-\d+)?\.js$/.test(f)).sort().map((f) => `<script src="${ep}/${f}"></script>`).join("");
const html = `<!doctype html><html lang="ar" data-palette="reference"><head><meta charset="utf-8">
<link rel="stylesheet" href="${root}/engine/sketch.css"><link rel="stylesheet" href="${root}/serie/lib/palette.css">
<style>html,body{margin:0;background:#F7F7F1}#stage{--skin:#FFFFFF}.de{font-family:Kalam;font-weight:700;fill:#1C1A1C}.ttl{font-family:Lalezar;fill:#1C1A1C;direction:rtl}
.ar{font-family:"Plex Arabic";font-weight:700;fill:#1C1A1C;direction:rtl}</style></head>
<body><div id="stage"><svg id="s" xmlns="http://www.w3.org/2000/svg"></svg></div>${libs}${decs}</body></html>`;
const page = path.join(outDir, "_decor.html"); fs.writeFileSync(page, html);
const b = await chromium.launch().catch(() => chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }));
const p = await b.newPage({ viewport: { width: cols * cell, height: 800 } });
const errs = []; p.on("pageerror", (e) => errs.push("PAGE " + e.message));
await p.goto(pathToFileURL(page).href); await p.waitForLoadState("load"); await p.evaluate(() => document.fonts.ready);
const names = await p.evaluate(() => Object.keys(window.EpDecor || {}).filter((k) => typeof window.EpDecor[k] === "function"));
const list = []; for (const n of names) if (!only || only.includes(n)) list.push(n);
if (!list.length) { console.error("Aucune fonction dans window.EpDecor" + (only ? " pour --only " + only.join(",") : "") + (errs.length ? "\n" + errs.join("\n") : "")); await b.close(); process.exit(1); }
const items = await p.evaluate((ns) => ns.flatMap((n) => { const v = window.EpDecor[n].essais; return (Array.isArray(v) && v.length ? v : [{}]).map((o, i, a) => ({ n, i, k: a.length, o })); }), list);
const files = [], bad = [];
for (let s = 0, sheet = 1; s < items.length; s += per, sheet++) {
  const part = items.slice(s, s + per), rows = Math.ceil(part.length / cols);
  await p.setViewportSize({ width: cols * cell, height: rows * cell });
  const res = await p.evaluate(({ part, cols, cell }) => {
    const NS = "http://www.w3.org/2000/svg", svg = document.getElementById("s"); while (svg.firstChild) svg.removeChild(svg.firstChild);
    const rows = Math.ceil(part.length / cols); svg.setAttribute("width", cols * cell); svg.setAttribute("height", rows * cell); svg.setAttribute("viewBox", `0 0 ${cols * cell} ${rows * cell}`);
    const el = (t, a, par) => { const n = document.createElementNS(NS, t); for (const k in a) n.setAttribute(k, a[k]); (par || svg).appendChild(n); return n; };
    const out = [];
    part.forEach((it, idx) => {
      const cx = (idx % cols) * cell, cy = Math.floor(idx / cols) * cell, pad = 46, box = cell - 2 * pad;
      el("rect", { x: cx + 4, y: cy + 4, width: cell - 8, height: cell - 8, fill: "#F7F7F1", stroke: "#B9B9B2", "stroke-width": 2 });
      const wrap = el("g", {}), g = el("g", {}, wrap); let err = null, ret = null;
      try { ret = window.EpDecor[it.n](g, JSON.parse(JSON.stringify(it.o))); } catch (e) { err = e.message; }
      let bb = { x: 0, y: 0, width: 0, height: 0 }; try { bb = g.getBBox(); } catch (e) {}
      const empty = !(bb.width > 0 && bb.height > 0), k = empty ? 1 : Math.min(box / bb.width, (box - 30) / bb.height, 3);
      const ox = cx + cell / 2 - (bb.x + bb.width / 2) * k, oy = cy + pad + 30 + (box - 30) / 2 - (bb.y + bb.height / 2) * k;
      wrap.setAttribute("transform", `translate(${ox} ${oy}) scale(${k})`);
      el("path", { d: `M${ox - 12} ${oy} L${ox + 12} ${oy} M${ox} ${oy - 12} L${ox} ${oy + 12}`, stroke: "#E02020", "stroke-width": 3 });
      const lab = el("text", { x: cx + 14, y: cy + 34, "font-size": 24, "font-family": "sans-serif", "font-weight": 700, fill: err || empty ? "#C00000" : "#1C1A1C" });
      lab.textContent = "D." + it.n + (it.k > 1 ? ` [${it.i + 1}/${it.k}]` : "") + (err ? "  ERREUR" : empty ? "  VIDE" : "");
      const sub = el("text", { x: cx + 14, y: cy + 60, "font-size": 17, "font-family": "sans-serif", fill: "#55524B" });
      sub.textContent = err ? err.slice(0, 60) : `${Math.round(bb.width)} × ${Math.round(bb.height)} · x ${Math.round(bb.x)}…${Math.round(bb.x + bb.width)} · y ${Math.round(bb.y)}…${Math.round(bb.y + bb.height)} · ×${k.toFixed(2)}` + (ret && typeof ret === "object" ? " · ancres : " + Object.keys(ret).join(", ").slice(0, 40) : "");
      out.push({ n: it.n, i: it.i, err, empty, w: Math.round(bb.width), h: Math.round(bb.height) });
    });
    return out;
  }, { part, cols, cell });
  for (const r of res) if (r.err || r.empty) bad.push(`D.${r.n}${r.i ? " [" + (r.i + 1) + "]" : ""} : ${r.err || "ne dessine rien"}`);
  const f = path.join(outDir, `decor_${String(sheet).padStart(2, "0")}.png`); await p.screenshot({ path: f, fullPage: true }); files.push(f);
}
await b.close();
console.log(`${list.length} fonction(s), ${items.length} dessin(s) -> ${files.length} planche(s) :\n` + files.join("\n")
  + (bad.length ? "\nÀ CORRIGER :\n" + bad.join("\n") : "\nOK : toutes les fonctions dessinent.") + (errs.length ? "\nERREURS PAGE :\n" + errs.join("\n") : ""));
