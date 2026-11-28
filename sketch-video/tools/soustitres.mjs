// Sous-titres karaoké, mot par mot : signale ce qui sort de la zone Instagram (x < 90, ou x > 915 à hauteur des boutons)
// et toute ligne qui déborde (une seule ligne par sous-titre). Usage : node tools/soustitres.mjs videos/<épisode>
import { createRequire } from "node:module";
const require = createRequire(new URL("../package.json", import.meta.url));
let chromium; try { ({ chromium } = require("playwright")); } catch { ({ chromium } = await import("playwright")); }
import path from "node:path"; import { pathToFileURL } from "node:url";
const dir = path.resolve(process.argv[2]);
const b = await chromium.launch().catch(() => chromium.launch({ executablePath: "/opt/pw-browsers/chromium" })); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto(pathToFileURL(path.join(dir, "index.html")).href + "?render=1");
await p.waitForFunction(() => window.SV && (window.SV.ready || window.SV.error), null, { timeout: 60000 });
const words = await p.evaluate(() => { const T = window.TIMINGS || {}; const out = []; (T.beats || []).forEach((be) => (be.words || []).forEach((w, i) => out.push({ id: be.id, t: Array.isArray(w) ? (w[0] + w[1]) / 2 : (w.start + w.end) / 2, w: i }))); return out; });
const bad = new Map(), shr = new Set();
for (const w of words) {
  await p.evaluate((t) => window.SV.seek(t), w.t);
  const r = await p.evaluate(() => { const c = document.getElementById("captions"); if (!c) return null; let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    c.querySelectorAll("*").forEach((e) => { const q = e.getBoundingClientRect(); if (!q.width || !q.height) return; const cs = getComputedStyle(e); if (cs.opacity === "0" || cs.visibility === "hidden") return; x0 = Math.min(x0, q.left); x1 = Math.max(x1, q.right); y0 = Math.min(y0, q.top); y1 = Math.max(y1, q.bottom); });
    const k = c.querySelector(".kline"); const natW = (k) => { let a = 1e9, b = -1e9; for (const e of k.children) { a = Math.min(a, e.offsetLeft); b = Math.max(b, e.offsetLeft + e.offsetWidth); } return b - a; }; const over = k ? natW(k) > k.clientWidth + 1 : false, fs = k ? (k.style.fontSize || "100%") : "";
    return x1 < 0 ? null : { over, fs, x0: Math.round(x0), x1: Math.round(x1), y0: Math.round(y0), y1: Math.round(y1) }; });
  if (!r) continue;
  if (r.over) console.log("DEBORDE", w.id, w.t.toFixed(2), JSON.stringify(r));
  if (r.fs && r.fs !== "100%") shr.add(w.id + " " + r.fs);
  if (r.x0 < 90 || (r.x1 > 915 && r.y1 > 980)) { const k = w.id; if (!bad.has(k) || bad.get(k).x1 - bad.get(k).x0 < r.x1 - r.x0) bad.set(k, { ...r, t: +w.t.toFixed(2), w: w.w }); }
}
console.log(words.length + " mots vérifiés ; rétrécis : " + [...shr].join(", ")); for (const [k, v] of bad) console.log(k, JSON.stringify(v));
await b.close();
