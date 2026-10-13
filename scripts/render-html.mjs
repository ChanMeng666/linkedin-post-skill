// Render ANY HTML file to a crisp 2x PNG with Playwright — for the layouts in
// templates/visuals/ and for bespoke visuals authored per post. Pair with templates/brand.css.
//
// Usage:
//   node scripts/render-html.mjs <input.html> <output.png> [--size portrait|square|wide|landscape]
//                                [--selector ".stage"] [--width 1200] [--height 628] [--full]
//
// - Default screenshots the element matching --selector (default ".stage").
// - --size swaps the stage's size class before the screenshot, so one HTML file renders for
//   both platforms: portrait 1080×1350 (LinkedIn feed) · wide 1600×900 (X feed) ·
//   square 1200×1200 · landscape 1200×628.
// - --full screenshots the whole page instead of an element.
// - --width/--height set the viewport (and are handy when using --full).
// Exits 3 if the content overflows the stage, so clipped text never ships unnoticed.
// Local assets (logo, brand.css) resolve via relative paths from the HTML file.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const SIZES = {
  portrait: { w: 1080, h: 1350 },
  square: { w: 1200, h: 1200 },
  wide: { w: 1600, h: 900 },
  landscape: { w: 1200, h: 628 },
};

function parseArgs(argv) {
  const out = { _: [], full: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--full') out.full = true;
    else if (a.startsWith('--')) { out[a.slice(2)] = argv[i + 1]; i++; }
    else out._.push(a);
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const input = args._[0];
const output = args._[1];
if (!input || !output) {
  console.error('Usage: node scripts/render-html.mjs <input.html> <output.png> [--size portrait|square|wide|landscape] [--selector ".stage"] [--width N --height N] [--full]');
  process.exit(1);
}
if (!fs.existsSync(input)) { console.error(`Input not found: ${input}`); process.exit(1); }
if (args.size && !SIZES[args.size]) {
  console.error(`Unknown --size "${args.size}". Use one of: ${Object.keys(SIZES).join(', ')}`);
  process.exit(1);
}

const selector = args.selector || '.stage';
const preset = args.size ? SIZES[args.size] : null;
const width = parseInt(args.width || preset?.w || '1200', 10);
const height = parseInt(args.height || preset?.h || '1200', 10);

const browser = await chromium.launch();
let overflow = false;
try {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(path.resolve(input)).href, { waitUntil: 'networkidle' });
  if (args.size) {
    await page.evaluate(({ selector, size, all }) => {
      const el = document.querySelector(selector);
      if (el) { el.classList.remove(...all); el.classList.add(size); }
    }, { selector, size: args.size, all: Object.keys(SIZES) });
  }
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);

  fs.mkdirSync(path.dirname(path.resolve(output)), { recursive: true });
  if (args.full) {
    await page.screenshot({ path: output, fullPage: true });
  } else {
    const el = await page.$(selector);
    if (!el) { console.error(`Selector not found: ${selector}`); process.exit(1); }
    // Anything taller/wider than its box is being clipped by the stage's overflow:hidden.
    overflow = await el.evaluate((stage) =>
      [stage, ...stage.querySelectorAll('*')].some(
        (n) => n.scrollHeight > n.clientHeight + 2 && getComputedStyle(n).overflow !== 'visible'
          || n.getBoundingClientRect().bottom > stage.getBoundingClientRect().bottom + 2
          || n.getBoundingClientRect().right > stage.getBoundingClientRect().right + 2));
    await el.screenshot({ path: output });
  }
  console.log(`✓ HTML rendered → ${output} (@2x, ${args.full ? 'full page' : args.size || selector})`);
} finally {
  await browser.close();
}
if (overflow) {
  console.error('✗ Content overflows the stage and is clipped. Cut text or rows, then re-render.');
  process.exit(3);
}
