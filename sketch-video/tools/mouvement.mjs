// Mesure du mouvement de l'IMAGE (hors sous-titres) : part des pixels qui changent en 0,4 s, deux fois par beat.
//   node tools/mouvement.mjs videos/<episode> [--min 3]
// Repère : AKTE 03 v5 fait 3 à 40 % selon les scènes (sous-titres exclus). Sous le seuil (3 % par défaut) = « FIGÉ ».
// L'intro avec la photo (i1–i3) est calme par nature : ne pas la compter.
import { createRequire } from "node:module"; import fs from "node:fs"; import path from "node:path"; import { pathToFileURL } from "node:url";
const require = createRequire(path.resolve("package.json"));
let chromium; try { ({ chromium } = require("playwright")); } catch { ({ chromium } = await import("playwright")); }
const args = process.argv.slice(2), dir = path.resolve(args[0] || "");
const min = args.includes("--min") ? +args[args.indexOf("--min") + 1] : 3;
if (!fs.existsSync(path.join(dir, "index.html"))) { console.error("usage : node tools/mouvement.mjs videos/<episode> [--min 3]"); process.exit(1); }
const b = await chromium.launch().catch(() => chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }));
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto(pathToFileURL(path.join(dir, "index.html")).href + "?render=1");
await p.waitForFunction(() => window.SV && (window.SV.ready || window.SV.error), null, { timeout: 60000 });
await p.addStyleTag({ content: "#captions{visibility:hidden!important}" });
const beats = await p.evaluate(() => (window.TIMINGS || {}).beats || []);
const q = await b.newPage();
const diff = async (a, c) => q.evaluate(async ([x, y]) => {
  const load = (s) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = s; });
  const [i1, i2] = await Promise.all([load(x), load(y)]); const W = 270, H = 480;
  const px = (im) => { const cv = document.createElement("canvas"); cv.width = W; cv.height = H; const g = cv.getContext("2d"); g.drawImage(im, 0, 0, W, H); return g.getImageData(0, 0, W, H).data; };
  const d1 = px(i1), d2 = px(i2); let n = 0;
  for (let k = 0; k < d1.length; k += 4) if (Math.abs(d1[k] - d2[k]) + Math.abs(d1[k + 1] - d2[k + 1]) + Math.abs(d1[k + 2] - d2[k + 2]) > 36) n++;
  return 100 * n / (W * H);
}, [a, c]);
const shot = async (t) => { await p.evaluate((tt) => window.SV.seek(tt), t); return "data:image/png;base64," + (await p.screenshot()).toString("base64"); };
let bad = 0;
for (const be of beats) {
  const vals = [];
  for (const k of [0.3, 0.7]) { const t = be.start + (be.end - be.start) * k; vals.push(await diff(await shot(t), await shot(t + 0.4))); }
  const m = Math.min(...vals); if (m < min) bad++;
  console.log(`${be.id.padEnd(5)} ${be.start.toFixed(1).padStart(6)} s  ${vals.map((v) => v.toFixed(1).padStart(5) + " %").join("  ")}  ${m < min ? "FIGÉ" : ""}`);
}
await b.close();
console.log(bad ? `\n${bad} beat(s) sous ${min} % : ajouter du mouvement de décor.` : `\nOK : tout bouge (≥ ${min} %).`);
