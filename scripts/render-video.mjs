// Render an HTML visual or a Mermaid diagram to a short MP4: headless Chromium steps the
// page's animations frame by frame, and the frames are piped straight into ffmpeg.
//
// Usage:
//   node scripts/render-video.mjs <input.html|input.mmd> <output.mp4>
//        [--size wide|portrait|square|landscape] [--duration 6] [--fps 30] [--look hand]
//
// - .html input: any visual built on templates/brand.css. The script adds `.motion` to the
//   stage, which switches on the entrance animations defined there; the still PNG from
//   render-html.mjs is the same file's finished frame.
// - .mmd input: the diagram is rendered to SVG with the brand theme, placed on a stage, and
//   revealed in source order: each node fades in, each edge draws itself.
// - Animations are seeked, not played, so every frame is exact and the output is repeatable.
//   Whatever finishes early holds until --duration.
// - No audio track. 1× pixel density: wide 1600×900, portrait 1080×1350.
// Needs ffmpeg on PATH (exits 2 if missing).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SIZES = {
  portrait: { w: 1080, h: 1350 },
  square: { w: 1200, h: 1200 },
  wide: { w: 1600, h: 900 },
  landscape: { w: 1200, h: 628 },
};

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) { out[argv[i].slice(2)] = argv[i + 1]; i++; }
    else out._.push(argv[i]);
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const [input, output] = args._;
if (!input || !output) {
  console.error('Usage: node scripts/render-video.mjs <input.html|input.mmd> <output.mp4> [--size wide|portrait|square|landscape] [--duration 6] [--fps 30] [--look hand]');
  process.exit(1);
}
if (!fs.existsSync(input)) { console.error(`Input not found: ${input}`); process.exit(1); }
const size = args.size || 'wide';
if (!SIZES[size]) { console.error(`Unknown --size "${size}". Use one of: ${Object.keys(SIZES).join(', ')}`); process.exit(1); }
const { w, h } = SIZES[size];
const duration = parseFloat(args.duration || '6');
const fps = parseInt(args.fps || '30', 10);

if (spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' }).status !== 0) {
  console.error('ffmpeg not found on PATH. Install it (winget install Gyan.FFmpeg) and retry.');
  process.exit(2);
}

// A Mermaid source becomes an SVG on a brand stage, as a temp page that is removed afterwards.
let pageFile = path.resolve(input);
const cleanup = [];
if (/\.mmd$/i.test(input)) {
  const svg = path.join(os.tmpdir(), `mm-${process.pid}.svg`);
  const r = spawnSync(process.execPath, [path.join(__dirname, 'render-mermaid.mjs'), input, svg,
    ...(args.look ? ['--look', args.look] : [])], { stdio: ['ignore', 'ignore', 'inherit'] });
  if (r.status !== 0) { console.error('Mermaid render failed.'); process.exit(r.status || 1); }
  // Deliberately not linking brand.css, and dropping the SVG's own web-font import: the label
  // boxes were measured with the fonts mmdc had, and loading different ones here clips the text.
  const { w: sw, h: sh } = SIZES[size];
  pageFile = path.join(os.tmpdir(), `mm-${process.pid}.html`);
  fs.writeFileSync(pageFile, `<!DOCTYPE html><meta charset="utf-8"><style>
html,body{margin:0;background:#aaa}
.stage{position:relative;width:${sw}px;height:${sh}px;background:#E2E2DF;overflow:hidden}
.mm-wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:${Math.round(sw * 0.06)}px}
.mm-wrap svg{max-width:100%;max-height:100%;height:auto}
</style><div class="stage"><div class="mm-wrap">${fs.readFileSync(svg, 'utf8').replace(/@import url([^)]*);?/g, '')}</div></div>`);
  cleanup.push(svg, pageFile);
}

fs.mkdirSync(path.dirname(path.resolve(output)), { recursive: true });
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-movflags', '+faststart',
  '-vf', 'pad=ceil(iw/2)*2:ceil(ih/2)*2', path.resolve(output)], { stdio: ['pipe', 'inherit', 'inherit'] });
const ffDone = new Promise((res) => ff.on('close', res));

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(pageFile).href, { waitUntil: 'networkidle' });
  await page.evaluate(({ size, all }) => {
    const stage = document.querySelector('.stage');
    if (!document.querySelector('.mm-wrap')) { stage.classList.remove(...all); stage.classList.add(size); }
    stage.classList.add('motion');
    // Stagger index for the CSS delays: each row, bar and list item counts from its siblings.
    for (const sel of ['.cmp li', '.steps li', '.bars .row']) {
      document.querySelectorAll(sel).forEach((el) => {
        el.style.setProperty('--i', [...el.parentElement.children].indexOf(el));
      });
    }
    // Mermaid: nodes fade in and edges draw, in the order they appear in the source.
    const svg = document.querySelector('.mm-wrap svg');
    if (svg) {
      svg.removeAttribute('style');
      const ease = 'cubic-bezier(.2,.7,.2,1)';
      const nodes = [...svg.querySelectorAll('g.node, g.cluster')];
      const edges = [...svg.querySelectorAll('.edgePaths path, path.flowchart-link, .messageLine0, .messageLine1, .transition')];
      const labels = [...svg.querySelectorAll('.edgeLabels .edgeLabel, .messageText')];
      const gap = Math.min(450, 3200 / Math.max(1, nodes.length));
      nodes.forEach((n, i) => n.animate([{ opacity: 0 }, { opacity: 1 }],
        { duration: 400, delay: 300 + i * gap, fill: 'both', easing: ease }));
      const after = 300 + nodes.length * gap;
      const egap = Math.min(350, 1800 / Math.max(1, edges.length));
      edges.forEach((p, i) => {
        // Hand-drawn strokes are several overlapping paths; fade those, draw the clean ones.
        const len = p.getTotalLength?.() || 0;
        const hasDash = getComputedStyle(p).strokeDasharray !== 'none';
        if (!len || hasDash) {
          p.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: after * 0.5 + i * egap, fill: 'both' });
          return;
        }
        p.style.strokeDasharray = len;
        p.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
          { duration: 600, delay: after * 0.5 + i * egap, fill: 'both', easing: ease });
        // The arrowhead is a marker on the path; hide it until the line arrives.
        const mk = p.getAttribute('marker-end');
        if (mk) {
          p.removeAttribute('marker-end');
          p.dataset.markerEnd = mk;
          p.dataset.markerAt = after * 0.5 + i * egap + 560;
        }
      });
      labels.forEach((l, i) => l.animate([{ opacity: 0 }, { opacity: 1 }],
        { duration: 400, delay: after * 0.5 + i * egap + 300, fill: 'both' }));
    }
  }, { size, all: Object.keys(SIZES) });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.drawPlate?.());
  await page.waitForTimeout(200);

  const stage = await page.$('.stage');
  const frames = Math.round(duration * fps);
  for (let f = 0; f < frames; f++) {
    const t = (f / fps) * 1000;
    await page.evaluate((t) => {
      for (const a of document.getAnimations()) { a.pause(); a.currentTime = t; }
      for (const p of document.querySelectorAll('[data-marker-end]')) {
        if (t >= +p.dataset.markerAt) p.setAttribute('marker-end', p.dataset.markerEnd);
        else p.removeAttribute('marker-end');
      }
    }, t);
    const buf = await stage.screenshot({ type: 'png' });
    if (!ff.stdin.write(buf)) await new Promise((res) => ff.stdin.once('drain', res));
  }
} finally {
  ff.stdin.end();
  await browser.close();
  for (const f of cleanup) fs.rmSync(f, { force: true });
}
const code = await ffDone;
if (code !== 0) { console.error('ffmpeg failed.'); process.exit(code || 1); }
console.log(`✓ Video rendered → ${output} (${w}×${h}, ${duration}s @ ${fps}fps)`);
