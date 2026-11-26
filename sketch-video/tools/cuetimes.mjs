// Instant (s) d'un ou plusieurs repères : node tools/cuetimes.mjs videos/<episode>/index.html b3 "b7@الدم" b21@end
import { createRequire } from "node:module"; import path from "node:path"; import { pathToFileURL } from "node:url";
const require = createRequire(path.resolve("package.json"));
let chromium; try { ({ chromium } = require("playwright")); } catch { ({ chromium } = await import("playwright")); }
const b = await chromium.launch().catch(() => chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }));
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto(pathToFileURL(path.resolve(process.argv[2])).href + "?render");
await p.waitForFunction(() => window.SV && (window.SV.ready || window.SV.error));
console.log(await p.evaluate((cs) => JSON.stringify(cs.map(c => [c, +window.SV.cue(c).toFixed(3)])), process.argv.slice(3)));
await b.close();
