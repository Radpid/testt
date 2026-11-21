#!/usr/bin/env node
/*
 * Rendu d'une vidéo sketch-video en MP4.
 *
 *   node engine/render.mjs videos/pneumothorax                 -> videos/pneumothorax/out/video.mp4
 *   node engine/render.mjs videos/pneumothorax --frames 0,4.5,12  -> captures PNG à ces instants (contrôle rapide)
 *   node engine/render.mjs videos/pneumothorax --from 10 --to 20  -> rend seulement un extrait
 *   options : --fps 30  --out chemin.mp4  --crf 18  --sheet (planche-contact toutes les 2 s)
 *             --safe (affiche les zones cachées par l'interface Instagram, pour contrôle uniquement)
 */
import { createRequire } from "node:module";
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

// playwright : installation locale (npm install) ou globale (NODE_PATH)
let chromium;
try { ({ chromium } = await import("playwright")); }
catch { ({ chromium } = createRequire(import.meta.url)("playwright")); }

const args = process.argv.slice(2);
if (!args[0] || args[0].startsWith("--")) {
  console.error("usage : node engine/render.mjs <dossier-video> [--fps 30] [--out out.mp4] [--frames t1,t2] [--from s --to s] [--sheet]");
  process.exit(1);
}
const opt = (name, def) => { const i = args.indexOf("--" + name); return i < 0 ? def : args[i + 1]; };
const flag = (name) => args.includes("--" + name);

const dir = path.resolve(args[0]);
const page_ = path.join(dir, "index.html");
if (!fs.existsSync(page_)) { console.error(`introuvable : ${page_}`); process.exit(1); }
const fps = parseFloat(opt("fps", "30"));
const outDir = path.join(dir, "out");
fs.mkdirSync(outDir, { recursive: true });

const ffmpegBin = process.env.FFMPEG || "ffmpeg";
if (spawnSync(ffmpegBin, ["-version"]).status !== 0) { console.error("ffmpeg introuvable (installe-le ou définis FFMPEG=chemin)"); process.exit(1); }

const launchOpts = {};
if (process.env.CHROMIUM_PATH) launchOpts.executablePath = process.env.CHROMIUM_PATH;
// si la version locale de Playwright n'a pas son navigateur, on prend le Chromium déjà installé
const browser = await chromium.launch(launchOpts).catch((e) => {
  const fallback = "/opt/pw-browsers/chromium";
  if (fs.existsSync(fallback)) return chromium.launch({ ...launchOpts, executablePath: fallback });
  throw e;
});
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
page.on("console", (m) => { if ((m.type() === "warning" || m.type() === "error") && !m.text().startsWith("Failed to load resource")) console.log(`[page ${m.type()}] ${m.text()}`); });
page.on("requestfailed", (r) => { if (!r.url().endsWith("/timings.js")) console.log(`[page] fichier introuvable : ${decodeURIComponent(r.url())}`); });
page.on("pageerror", (e) => console.log(`[page error] ${e.message}`));
await page.goto(pathToFileURL(page_).href + "?render=1" + (args.includes("--safe") ? "&safe=1" : ""));
await page.waitForFunction(() => window.SV && (window.SV.ready || window.SV.error), null, { timeout: 60000 });
const err = await page.evaluate(() => window.SV.error);
if (err) { console.error("Erreur dans la page : " + err); await browser.close(); process.exit(1); }
const info = await page.evaluate(() => ({ duration: window.SV.duration, audio: window.SV.state.tm.audio || null, warnings: window.SV.state.tm.warnings }));
const seek = (t) => page.evaluate((tt) => window.SV.seek(tt), t);

// --- captures ponctuelles -------------------------------------------------
const framesArg = opt("frames", null);
if (framesArg || flag("sheet")) {
  const times = framesArg ? framesArg.split(",").map(Number) : Array.from({ length: Math.ceil(info.duration / 2) }, (_, i) => i * 2);
  const files = [];
  for (const t of times) {
    await seek(t);
    const f = path.join(outDir, `frame_${t.toFixed(2).padStart(6, "0")}${flag("safe") ? "_safe" : ""}.png`);
    await page.screenshot({ path: f });
    files.push(f);
  }
  console.log(`captures : ${files.length} -> ${outDir}`);
  if (flag("sheet")) {
    const cols = 8, sheet = path.join(outDir, "sheet.png");
    const list = path.join(outDir, "frames.txt");
    fs.writeFileSync(list, files.map((f) => `file '${f.replace(/'/g, "'\\''")}'`).join("\n"));
    spawnSync(ffmpegBin, ["-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", list, "-vf", `scale=270:-1,tile=${cols}x${Math.ceil(files.length / cols)}`, "-frames:v", "1", sheet], { stdio: "inherit" });
    console.log(`planche : ${sheet}`);
  }
  await browser.close();
  process.exit(0);
}

// --- rendu vidéo -----------------------------------------------------------
const from = parseFloat(opt("from", "0"));
const to = Math.min(parseFloat(opt("to", String(info.duration))), info.duration);
const out = path.resolve(opt("out", path.join(outDir, from > 0 || to < info.duration ? `video_${from}-${to}.mp4` : "video.mp4")));
const audioPath = info.audio ? path.resolve(dir, info.audio) : null;
if (audioPath && !fs.existsSync(audioPath)) console.warn(`audio introuvable : ${audioPath} (rendu sans son)`);
const withAudio = audioPath && fs.existsSync(audioPath);

const ff = [
  "-y", "-v", "error", "-stats",
  "-f", "image2pipe", "-framerate", String(fps), "-i", "-",
  ...(withAudio ? ["-ss", String(from), "-t", String(to - from), "-i", audioPath] : []),
  "-c:v", "libx264", "-preset", opt("preset", "medium"), "-crf", opt("crf", "18"), "-pix_fmt", "yuv420p",
  "-r", String(fps),
  ...(withAudio ? ["-c:a", "aac", "-b:a", "192k", "-af", `apad=whole_dur=${to - from}`] : []),
  "-movflags", "+faststart", "-t", String(to - from), out,
];
const proc = spawn(ffmpegBin, ff, { stdio: ["pipe", "inherit", "inherit"] });
const total = Math.round((to - from) * fps);
const t0 = Date.now();
for (let i = 0; i < total; i++) {
  await seek(from + i / fps);
  const buf = await page.screenshot({ type: "jpeg", quality: 95 });
  if (!proc.stdin.write(buf)) await new Promise((r) => proc.stdin.once("drain", r));
  if (i % 60 === 0) process.stdout.write(`\rimage ${i}/${total}  (${((Date.now() - t0) / 1000).toFixed(0)} s)   `);
}
proc.stdin.end();
await new Promise((r) => proc.on("close", r));
await browser.close();
console.log(`\nOK -> ${out}  (${(to - from).toFixed(1)} s, ${total} images, ${withAudio ? "avec" : "sans"} audio)`);
if (info.warnings.length) console.log("Avertissements :\n - " + info.warnings.join("\n - "));
