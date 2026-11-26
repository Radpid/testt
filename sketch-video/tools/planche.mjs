// Planches-contact LISIBLES d'un épisode, avec l'instant, le beat et (option) la maquette Instagram.
//   node tools/planche.mjs videos/<episode> [--beats] [--times 1.2,4,9.5] [--from s --to s --step 0.1]
//                          [--ig] [--cols 4] [--per 12] [--w 400] [--out videos/<episode>/out/planches]
//   --beats  : 2 images par beat (25 % et 80 % de sa durée) — défaut si rien n'est précisé
//   --from/--to/--step : image par image (contrôle d'un début de scène, ex. --step 0.1)
//   --ig     : zones Instagram en rouge sur chaque image (bords rognés, barre du haut, boutons, légende)
// Écrit planche_01.png, planche_02.png… (--per images par planche) et affiche la liste.
import { createRequire } from "node:module"; import fs from "node:fs"; import path from "node:path"; import { pathToFileURL } from "node:url";
const require = createRequire(path.resolve("package.json"));
let chromium; try { ({ chromium } = require("playwright")); } catch { ({ chromium } = await import("playwright")); }
const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf("--" + n); return i < 0 ? d : args[i + 1]; };
const flag = (n) => args.includes("--" + n);
const dir = path.resolve(args[0] || "");
if (!fs.existsSync(path.join(dir, "index.html"))) { console.error("usage : node tools/planche.mjs videos/<episode> [--beats|--times …|--from --to --step] [--ig]"); process.exit(1); }
const outDir = path.resolve(opt("out", path.join(dir, "out", "planches"))); fs.mkdirSync(outDir, { recursive: true });
const cols = +opt("cols", 4), per = +opt("per", 12), w = +opt("w", 400), h = Math.round(w * 1920 / 1080);
const b = await chromium.launch().catch(() => chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }));
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
const errs = []; p.on("pageerror", (e) => errs.push(e.message));
await p.goto(pathToFileURL(path.join(dir, "index.html")).href + "?render=1");
await p.waitForFunction(() => window.SV && (window.SV.ready || window.SV.error), null, { timeout: 60000 });
const info = await p.evaluate(() => ({ err: window.SV.error, dur: window.SV.duration, beats: (window.TIMINGS || {}).beats || [] }));
if (info.err) { console.error("Erreur dans la page : " + info.err); await b.close(); process.exit(1); }
let shots = [];
if (opt("times", null)) shots = opt("times").split(",").map((x) => ({ t: +x }));
else if (opt("from", null) != null) { const f = +opt("from"), to = +opt("to", info.dur), st = +opt("step", 0.1); for (let t = f; t <= to + 1e-6; t += st) shots.push({ t: +t.toFixed(3) }); }
else { for (const be of info.beats) for (const k of [0.25, 0.8]) shots.push({ t: +(be.start + (be.end - be.start) * k).toFixed(2), id: be.id }); shots.push({ t: +(info.dur - 0.3).toFixed(2), id: "fin" }); }
const beatAt = (t) => { let id = ""; for (const be of info.beats) if (t >= be.start - 0.05) id = be.id; return id; };
const frames = [];
for (const s of shots) {
  await p.evaluate((t) => window.SV.seek(t), s.t);
  const buf = await p.screenshot({ type: "jpeg", quality: 88 });
  frames.push({ label: `${s.t.toFixed(2)} s · ${s.id || beatAt(s.t)}`, src: "data:image/jpeg;base64," + buf.toString("base64") });
}
const q = await b.newPage();
const files = [];
for (let i = 0, n = 1; i < frames.length; i += per, n++) {
  const part = frames.slice(i, i + per), rows = Math.ceil(part.length / cols);
  const k = w / 1080, z = (x, y, ww, hh) => `<i style="left:${x * k}px;top:${y * k}px;width:${ww * k}px;height:${hh * k}px"></i>`;
  const zones = flag("ig") ? z(0, 0, 50, 1920) + z(1030, 0, 50, 1920) + z(50, 0, 980, 250) + z(915, 980, 115, 670) + z(50, 1650, 980, 270) : "";
  const html = `<style>body{margin:0;background:#222;font:600 17px sans-serif;color:#fff}.g{display:grid;grid-template-columns:repeat(${cols},${w}px);gap:8px;padding:8px}
    .c{position:relative;width:${w}px;height:${h + 26}px}.c img{width:${w}px;height:${h}px;display:block}.c b{display:block;height:26px;line-height:26px;text-align:center}
    .c i{position:absolute;background:rgba(255,30,30,.22);outline:2px solid rgba(255,30,30,.9);outline-offset:-2px}</style>
    <div class="g">${part.map((f) => `<div class="c"><b>${f.label}</b><img src="${f.src}">${zones.replace(/top:([\d.]+)px/g, (m, y) => `top:${+y + 26}px`)}</div>`).join("")}</div>`;
  await q.setViewportSize({ width: cols * (w + 8) + 8, height: rows * (h + 34) + 8 });
  await q.setContent(html); await q.waitForLoadState("load");
  const f = path.join(outDir, `planche_${String(n).padStart(2, "0")}${flag("ig") ? "_ig" : ""}.png`);
  await q.screenshot({ path: f, fullPage: true }); files.push(f);
}
await b.close();
console.log(`${frames.length} images -> ${files.length} planche(s) :\n` + files.join("\n") + (errs.length ? "\nERREURS PAGE :\n" + errs.join("\n") : ""));
