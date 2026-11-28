// Battements du moniteur de la chambre (window.ECG04, calculés par story.js) : node videos/akte-koeln-transfusion/son/ecg_times.mjs
import { createRequire } from "node:module"; import path from "node:path"; import { pathToFileURL, fileURLToPath } from "node:url";
const require = createRequire(path.resolve("package.json"));
let chromium; try { ({ chromium } = require("playwright")); } catch { ({ chromium } = await import("playwright")); }
const here = path.dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch().catch(() => chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }));
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto(pathToFileURL(path.join(here, "..", "index.html")).href + "?render");
await p.waitForFunction(() => window.SV && (window.SV.ready || window.SV.error));
console.log(JSON.stringify(await p.evaluate(() => Object.assign({ duration: window.SV.duration }, window.ECG04 || {}))));
await b.close();
