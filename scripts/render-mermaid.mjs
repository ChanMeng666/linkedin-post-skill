// Render a Mermaid .mmd to a brand-styled PNG using mermaid-cli (mmdc) with the
// Caldera theme config + brand fonts + the existing puppeteer config.
//
// Usage:
//   node scripts/render-mermaid.mjs <input.mmd> [output.png|output.svg] [--look hand]
// If output is omitted, writes alongside the input with a .png extension.
//
// Produces a 2x-scale PNG on a basalt (#E2E2DF) background (or an SVG, by extension).
// --look hand switches Mermaid to its sketched renderer: wobbly ink lines and hatched fills,
// same brand colours. Use it when the diagram should read as a whiteboard sketch.
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const argv = process.argv.slice(2);
const lookAt = argv.indexOf('--look');
const look = lookAt >= 0 ? argv.splice(lookAt, 2)[1] : null;
const input = argv[0];
if (!input || (look && look !== 'hand')) {
  console.error('Usage: node scripts/render-mermaid.mjs <input.mmd> [output.png|output.svg] [--look hand]');
  process.exit(1);
}
if (!fs.existsSync(input)) {
  console.error(`Input not found: ${input}`);
  process.exit(1);
}
const output = argv[1] || input.replace(/\.mmd$/i, '.png');

let config = path.join(ROOT, 'templates', 'mermaid-brand-config.json');
let tmpConfig = null;
if (look === 'hand') {
  // Same theme, sketched renderer. The seed keeps the wobble identical between renders.
  const cfg = JSON.parse(fs.readFileSync(config, 'utf8'));
  tmpConfig = path.join(os.tmpdir(), `mermaid-hand-${process.pid}.json`);
  fs.writeFileSync(tmpConfig, JSON.stringify({ ...cfg, look: 'handDrawn', handDrawnSeed: 7 }));
  config = tmpConfig;
}
const cssFile = path.join(ROOT, 'templates', 'mermaid-brand.css');
const puppeteer = path.join(ROOT, 'puppeteer-config.json');

const args = [
  '-i', input,
  '-o', output,
  '-c', config,
  '--cssFile', cssFile,
  '-p', puppeteer,
  '-b', '#E2E2DF',   // basalt canvas — on-brand background
  '-s', '2',          // 2x scale for crisp rendering
];

// Use the locally installed mermaid-cli binary.
const mmdcBin = path.join(ROOT, 'node_modules', '.bin', process.platform === 'win32' ? 'mmdc.cmd' : 'mmdc');
const bin = fs.existsSync(mmdcBin) ? mmdcBin : 'mmdc';

const res = spawnSync(bin, args, { stdio: 'inherit', shell: process.platform === 'win32' });
if (tmpConfig) fs.rmSync(tmpConfig, { force: true });
if (res.status !== 0) {
  console.error('mmdc failed.');
  process.exit(res.status || 1);
}
console.log(`✓ Mermaid rendered → ${output}${look ? ' (hand-drawn)' : ''}`);
