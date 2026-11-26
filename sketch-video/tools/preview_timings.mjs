// Minutage PROVISOIRE sans voix, pour préparer les scènes avant l'enregistrement.
//   node tools/preview_timings.mjs videos/<episode>
// Lit beats.js et écrit timings.js (même format que montage_voix.py), au débit moyen de l'auteur à ×1,3
// (≈ 3,05 mots/s parlés, mesuré sur AKTE 02 et 03). Réglages facultatifs dans <episode>/preview.json :
//   { "sceneStart": ["i1","b5"],      pauses de changement de contexte (0,42 s au lieu de 0,11 s)
//     "pauseBefore": { "b9": 0.35 },  pause précise avant un beat
//     "extra": { "b16": 3.2 },        silence APRÈS un beat (scène muette)
//     "wps": 3.05, "lead": 0.15, "tail": 5.5 }   tail = durée de l'affiche finale après le dernier mot
// Ne remplace JAMAIS un timings.js issu de la vraie voix (seulement un fichier absent ou déjà provisoire).
import fs from "node:fs"; import path from "node:path"; import vm from "node:vm";

const dir = path.resolve(process.argv[2] || "");
const beatsFile = path.join(dir, "beats.js"), outFile = path.join(dir, "timings.js");
if (!fs.existsSync(beatsFile)) { console.error("usage : node tools/preview_timings.mjs videos/<episode>   (beats.js introuvable)"); process.exit(1); }
const MARK = "PROVISOIRE";
if (fs.existsSync(outFile) && !fs.readFileSync(outFile, "utf8").includes(MARK)) {
  console.error("timings.js vient de la vraie voix : je n'y touche pas."); process.exit(2);
}
const ctx = { window: {} }; vm.runInNewContext(fs.readFileSync(beatsFile, "utf8"), ctx);
const beats = ctx.window.BEATS;
const cfgFile = path.join(dir, "preview.json");
const cfg = Object.assign({ sceneStart: [], pauseBefore: {}, extra: {}, wps: 3.05, lead: 0.15, tail: 5.5 }, fs.existsSync(cfgFile) ? JSON.parse(fs.readFileSync(cfgFile, "utf8")) : {});
const r3 = (x) => Math.round(x * 1000) / 1000;
// poids d'un mot : ses lettres (sans signes) + un plancher, pour que « و » ne dure pas autant que « Remonstrationspflicht »
const weight = (w) => 2.2 + w.replace(/[^\p{L}\p{N}]/gu, "").length;
const all = beats.flatMap((b) => b[1].trim().split(/\s+/));
const perUnit = (all.length / cfg.wps) / all.reduce((s, w) => s + weight(w), 0);
let t = cfg.lead; const out = [];
beats.forEach((b, i) => {
  const id = b[0], words = b[1].trim().split(/\s+/);
  if (i > 0) t += cfg.pauseBefore[id] != null ? cfg.pauseBefore[id] : (cfg.sceneStart.includes(id) ? 0.42 : 0.11);
  const start = t, ws = [];
  for (const w of words) { const d = weight(w) * perUnit; ws.push([r3(t), r3(t + d * 0.9)]); t += d; }
  out.push({ id, start: r3(start), end: r3(t), words: ws, conf: 0 });
  if (cfg.extra[id]) t += cfg.extra[id];
});
const tm = { audio: null, duration: r3(t + 0.3), source: `minutage ${MARK} sans voix (tools/preview_timings.mjs) — sera remplacé par montage_voix.py`, beats: out };
fs.writeFileSync(outFile, `// ${MARK} — généré par tools/preview_timings.mjs (pas de voix)\nwindow.TIMINGS = ${JSON.stringify(tm)};\n`);
console.log(`OK -> ${outFile}  (${beats.length} beats, ${all.length} mots, voix estimée ${tm.duration.toFixed(1)} s à ×1,3)`);
