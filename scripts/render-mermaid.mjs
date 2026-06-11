// Render a Mermaid .mmd to a brand-styled PNG using mermaid-cli (mmdc) with the
// Caldera theme config + brand fonts + the existing puppeteer config.
//
// Usage:
//   node scripts/render-mermaid.mjs <input.mmd> [output.png]
// If output is omitted, writes alongside the input with a .png extension.
//
// Produces a 2x-scale PNG on a basalt (#E2E2DF) background, sized for LinkedIn.
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const input = process.argv[2];
if (!input) {
  console.error('Usage: node scripts/render-mermaid.mjs <input.mmd> [output.png]');
  process.exit(1);
}
if (!fs.existsSync(input)) {
  console.error(`Input not found: ${input}`);
  process.exit(1);
}
const output = process.argv[3] || input.replace(/\.mmd$/i, '.png');

const config = path.join(ROOT, 'templates', 'mermaid-brand-config.json');
const cssFile = path.join(ROOT, 'templates', 'mermaid-brand.css');
const puppeteer = path.join(ROOT, 'puppeteer-config.json');

const args = [
  '-i', input,
  '-o', output,
  '-c', config,
  '--cssFile', cssFile,
  '-p', puppeteer,
  '-b', '#E2E2DF',   // basalt canvas — on-brand background
  '-s', '2',          // 2x scale for crisp LinkedIn rendering
];

// Use the locally installed mermaid-cli binary.
const mmdcBin = path.join(ROOT, 'node_modules', '.bin', process.platform === 'win32' ? 'mmdc.cmd' : 'mmdc');
const bin = fs.existsSync(mmdcBin) ? mmdcBin : 'mmdc';

const res = spawnSync(bin, args, { stdio: 'inherit', shell: process.platform === 'win32' });
if (res.status !== 0) {
  console.error('mmdc failed.');
  process.exit(res.status || 1);
}
console.log(`✓ Mermaid rendered → ${output}`);
