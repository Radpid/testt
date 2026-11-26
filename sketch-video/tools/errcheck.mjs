// Erreurs d'exécution d'un épisode : node tools/errcheck.mjs videos/<episode>/index.html [t1 t2 …]
// Charge la page, se place à chaque instant et affiche les erreurs JS (page + console) et SV.error.
import { createRequire } from "node:module"; import path from "node:path"; import { pathToFileURL } from "node:url";
const require = createRequire(path.resolve("package.json"));
const { chromium } = require("playwright");
const b = await chromium.launch().catch(() => chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }));
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
const errs = [];
p.on("pageerror", (e) => errs.push("PAGEERR " + e.message + "\n" + (e.stack || "").split("\n").slice(0, 4).join("\n")));
p.on("console", (m) => { if (m.type() === "error") errs.push("CONSOLE " + m.text()); });
await p.goto(pathToFileURL(path.resolve(process.argv[2])).href + "?render");
await p.waitForFunction(() => window.SV && (window.SV.ready || window.SV.error), null, { timeout: 60000 }).catch((e) => errs.push("TIMEOUT " + e.message));
errs.push("SV.error=" + await p.evaluate(() => window.SV && window.SV.error));
for (const t of process.argv.slice(3).map(Number)) { await p.evaluate((tt) => window.SV.seek(tt), t).catch((e) => errs.push("SEEK " + t + " " + e.message)); }
console.log(errs.join("\n"));
await b.close();
