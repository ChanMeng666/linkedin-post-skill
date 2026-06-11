// Render a branded Caldera quote/recap card (HTML → PNG) with Playwright.
// Mirrors ChanMeng666/scripts/export-linkedin-cards.mjs (2x DPI screenshot).
//
// Usage:
//   node scripts/render-card.mjs <output.png> --config <config.json>
//   node scripts/render-card.mjs <output.png> --headline "..." [--eyebrow "..."] [--sub "..."]
//                                             [--name "Chan Meng"] [--stamp "chanmeng.org"]
//                                             [--size square|landscape]
//
// config.json fields: { eyebrow, headline, sub, name, stamp, size }
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TEMPLATE = path.join(ROOT, 'templates', 'post-card.html');

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) { out[argv[i].slice(2)] = argv[i + 1]; i++; }
    else out._.push(argv[i]);
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const output = args._[0];
if (!output) {
  console.error('Usage: node scripts/render-card.mjs <output.png> (--config <json> | --headline "...")');
  process.exit(1);
}

let cfg = {};
if (args.config) cfg = JSON.parse(fs.readFileSync(args.config, 'utf8'));
cfg = {
  eyebrow: args.eyebrow ?? cfg.eyebrow ?? 'FIELD NOTE',
  headline: args.headline ?? cfg.headline ?? 'Headline goes here',
  sub: args.sub ?? cfg.sub ?? '',
  name: args.name ?? cfg.name ?? 'Chan Meng',
  stamp: args.stamp ?? cfg.stamp ?? 'chanmeng.org',
  size: args.size ?? cfg.size ?? 'square',
};

const DIMS = { square: { w: 1200, h: 1200 }, landscape: { w: 1200, h: 628 } };
const dim = DIMS[cfg.size] || DIMS.square;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: dim.w, height: dim.h },
    deviceScaleFactor: 2,
  });
  await page.goto(pathToFileURL(TEMPLATE).href, { waitUntil: 'networkidle' });

  await page.evaluate(({ cfg, dim }) => {
    const card = document.getElementById('card');
    card.style.width = dim.w + 'px';
    card.style.height = dim.h + 'px';
    if (cfg.size === 'landscape') card.style.padding = '64px';

    document.getElementById('eyebrow-text').textContent = cfg.eyebrow;
    document.getElementById('eyebrow').style.display = cfg.eyebrow ? 'flex' : 'none';
    document.getElementById('headline').textContent = cfg.headline;
    const sub = document.getElementById('sub');
    sub.textContent = cfg.sub;
    sub.style.display = cfg.sub ? 'block' : 'none';
    document.getElementById('who-name').textContent = cfg.name;
    document.getElementById('who-stamp').textContent = cfg.stamp;

    // Auto-fit the headline so long text never overflows the card.
    const headline = document.getElementById('headline');
    let size = parseInt(getComputedStyle(headline).fontSize, 10);
    let guard = 60;
    while (guard-- > 0 && size > 40 && card.scrollHeight > card.clientHeight) {
      size -= 4;
      headline.style.fontSize = size + 'px';
    }
  }, { cfg, dim });

  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150); // let webfonts paint

  fs.mkdirSync(path.dirname(path.resolve(output)), { recursive: true });
  const el = await page.$('#card');
  await el.screenshot({ path: output });
  console.log(`✓ Card rendered → ${output} (${dim.w}×${dim.h} @2x)`);
} finally {
  await browser.close();
}
