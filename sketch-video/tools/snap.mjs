// Capture d'une page de dessin (sans moteur d'animation) en PNG 1080×1920.
//   node tools/snap.mjs videos/ep01-spritze/design/personnages.html [sortie.png] [--scale 1]
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

let chromium;
try { ({ chromium } = await import("playwright")); }
catch { ({ chromium } = createRequire(import.meta.url)("playwright")); }

const args = process.argv.slice(2);
const scaleIdx = args.indexOf("--scale");
const scale = scaleIdx >= 0 ? parseFloat(args.splice(scaleIdx, 2)[1]) : 1;
const [input, output] = args;
if (!input) { console.error("usage: node tools/snap.mjs page.html [out.png] [--scale 1]"); process.exit(1); }
const out = output || input.replace(/\.html(\?.*)?$/, ".png");

// si la version locale de Playwright n'a pas son navigateur, on prend le Chromium déjà installé
const FALLBACK = "/opt/pw-browsers/chromium";
const browser = await chromium.launch().catch(async (e) => {
  const fs = await import("node:fs");
  if (fs.existsSync(FALLBACK)) return chromium.launch({ executablePath: FALLBACK });
  throw e;
});
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: scale });
page.on("pageerror", (e) => console.error("erreur page :", e.message));
const [file, query] = input.split("?");
await page.goto(pathToFileURL(path.resolve(file)).href + (query ? "?" + query : ""));
await page.waitForFunction(() => window.READY === true, null, { timeout: 20000 });
await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1080, height: 1920 } });
await browser.close();
console.log("OK ->", out);
