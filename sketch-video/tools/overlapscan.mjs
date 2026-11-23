// Scan des chevauchements de textes : node tools/overlapscan.mjs videos/<episode>/index.html <t0> <t1> [pas=0.1]
// Affiche chaque paire de textes SVG visibles dont les boîtes se recouvrent (première occurrence + instant).
import { createRequire } from "node:module"; import path from "node:path"; import { pathToFileURL } from "node:url";
const require = createRequire(path.resolve("package.json"));
let chromium; try { ({ chromium } = require("playwright")); } catch { ({ chromium } = await import("playwright")); }
const b = await chromium.launch().catch(() => chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }));
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto(pathToFileURL(path.resolve(process.argv[2])).href + "?render");
await p.waitForFunction(() => window.SV && (window.SV.ready || window.SV.error));
const t0 = +process.argv[3], t1 = +process.argv[4], dt = +(process.argv[5] || 0.1);
const seen = new Map();
for (let t = t0; t <= t1 + 1e-6; t += dt) {
  const res = await p.evaluate((t) => {
    SV.seek(t);
    const op = (e) => { let o = 1; for (let n = e; n && n.nodeType === 1; n = n.parentNode) { const cs = getComputedStyle(n); if (cs.display === "none" || cs.visibility === "hidden") return 0; o *= parseFloat(cs.opacity || 1); const a = n.getAttribute && n.getAttribute("opacity"); if (a != null) o *= parseFloat(a); } return o; };
    const items = [];
    document.querySelectorAll("svg text").forEach((e) => {
      const s = (e.textContent || "").trim(); if (!s) return;
      const o = op(e); if (o < 0.35) return;
      const r = e.getBoundingClientRect(); if (r.width < 4 || r.height < 4 || r.bottom < 0 || r.top > 1920) return;
      items.push({ s, r: [r.left, r.top, r.right, r.bottom] });
    });
    const out = [];
    for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
      const a = items[i].r, c = items[j].r;
      const ix = Math.min(a[2], c[2]) - Math.max(a[0], c[0]), iy = Math.min(a[3], c[3]) - Math.max(a[1], c[1]);
      if (ix > 6 && iy > 6) out.push(items[i].s + "  <->  " + items[j].s + `  [${Math.round(ix)}x${Math.round(iy)} @${Math.round(Math.max(a[0], c[0]))},${Math.round(Math.max(a[1], c[1]))}]`);
    }
    return out;
  }, t);
  for (const k of res) { const key = k.replace(/\s+\[.*$/, ""); if (!seen.has(key)) { seen.set(key, t); console.log(t.toFixed(2), k); } }
}
await b.close();
