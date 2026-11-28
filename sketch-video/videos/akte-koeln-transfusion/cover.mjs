// Rendu de la couverture Instagram : node videos/akte-koeln-transfusion/cover.mjs [sortie.png]
import { createRequire } from "node:module"; import path from "node:path"; import { pathToFileURL, fileURLToPath } from "node:url";
const require = createRequire(path.resolve("package.json"));
let chromium; try { ({ chromium } = require("playwright")); } catch { ({ chromium } = await import("playwright")); }
const here = path.dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] || path.join(here, "out", "AKTE04_couverture.png");
const b = await chromium.launch().catch(() => chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }));
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
const errs = []; p.on("pageerror", (e) => errs.push(e.message));
await p.goto(pathToFileURL(path.join(here, "cover.html")).href);
await p.waitForFunction(() => window.COVER_READY || window.COVER_ERROR, null, { timeout: 30000 });
const err = await p.evaluate(() => window.COVER_ERROR || null);
await p.screenshot({ path: out });
await b.close();
console.log(err || errs.length ? "ERREUR : " + (err || errs.join(" | ")) : "OK -> " + out);
