// Render ANY HTML file to a crisp 2x PNG with Playwright — for bespoke, beautiful
// branded LinkedIn visuals authored per post. Pair with templates/brand.css.
//
// Usage:
//   node scripts/render-html.mjs <input.html> <output.png> [--selector ".stage"]
//                                [--width 1200] [--height 628] [--full]
//
// - Default screenshots the element matching --selector (default ".stage").
// - --full screenshots the whole page instead of an element.
// - --width/--height set the viewport (and are handy when using --full).
// Local assets (logo, brand.css) resolve via relative paths from the HTML file.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

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
  console.error('Usage: node scripts/render-html.mjs <input.html> <output.png> [--selector ".stage"] [--width N --height N] [--full]');
  process.exit(1);
}
if (!fs.existsSync(input)) { console.error(`Input not found: ${input}`); process.exit(1); }

const selector = args.selector || '.stage';
const width = parseInt(args.width || '1200', 10);
const height = parseInt(args.height || '1200', 10);

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(path.resolve(input)).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);

  fs.mkdirSync(path.dirname(path.resolve(output)), { recursive: true });
  if (args.full) {
    await page.screenshot({ path: output, fullPage: true });
  } else {
    const el = await page.$(selector);
    if (!el) { console.error(`Selector not found: ${selector}`); process.exit(1); }
    await el.screenshot({ path: output });
  }
  console.log(`✓ HTML rendered → ${output} (@2x, ${args.full ? 'full page' : selector})`);
} finally {
  await browser.close();
}
