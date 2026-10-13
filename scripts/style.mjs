// Turn **bold** markers in the LinkedIn copy of a post.md into bold that survives a paste.
//
// Usage:
//   node scripts/style.mjs output/<date>-<slug>/post.md           apply
//   node scripts/style.mjs output/<date>-<slug>/post.md --plain   undo: back to plain letters
//
// LinkedIn's post composer is plain text. It has no bold button and renders no markdown; the
// only bold that shows in a feed post is a set of look-alike Unicode letters (Mathematical
// Sans-Serif Bold). This script rewrites each **run** inside a ```text linkedin block into
// those letters, in place, so the block can be copied straight into LinkedIn.
//
// Only letters and digits have bold forms. Punctuation, spaces and accented letters pass
// through unchanged. A run that contains a hashtag, an @, or a URL is refused: styled letters
// are different characters, so a styled hashtag or link stops working.
//
// X blocks are never styled. The rules for what may be bold are in references/platforms.md,
// and scripts/count.mjs checks them.
import fs from 'node:fs';

const args = process.argv.slice(2);
const plain = args.includes('--plain');
const file = args.find((a) => !a.startsWith('--'));
if (!file) { console.error('Usage: node scripts/style.mjs <post.md> [--plain]'); process.exit(1); }
if (!fs.existsSync(file)) { console.error(`Not found: ${file}`); process.exit(1); }

// Mathematical Sans-Serif Bold: A–Z U+1D5D4, a–z U+1D5EE, 0–9 U+1D7EC.
const UP = 0x1d5d4, LOW = 0x1d5ee, DIG = 0x1d7ec;
const toBold = (s) => [...s].map((ch) => {
  const c = ch.codePointAt(0);
  if (c >= 65 && c <= 90) return String.fromCodePoint(UP + c - 65);
  if (c >= 97 && c <= 122) return String.fromCodePoint(LOW + c - 97);
  if (c >= 48 && c <= 57) return String.fromCodePoint(DIG + c - 48);
  return ch;
}).join('');
const toPlain = (s) => [...s].map((ch) => {
  const c = ch.codePointAt(0);
  if (c >= UP && c < UP + 26) return String.fromCharCode(65 + c - UP);
  if (c >= LOW && c < LOW + 26) return String.fromCharCode(97 + c - LOW);
  if (c >= DIG && c < DIG + 10) return String.fromCharCode(48 + c - DIG);
  return ch;
}).join('');

const raw = fs.readFileSync(file, 'utf8');
const eol = raw.includes('\r\n') ? '\r\n' : '\n';
let runs = 0;
const refused = [];
const out = raw.replace(/\r\n/g, '\n').replace(
  /^(```text[ \t]+linkedin[^\n]*\n)([\s\S]*?)(\n```[ \t]*)$/gm,
  (_, open, body, close) => {
    if (plain) return open + toPlain(body).replace(/\*\*([^*\n]+)\*\*/g, '$1') + close;
    const styled = body.replace(/\*\*([^*\n]+)\*\*/g, (m, run) => {
      if (/[#@]|https?:\/\//.test(run)) { refused.push(run); return run; }
      runs++;
      return toBold(run);
    });
    return open + styled + close;
  },
);

fs.writeFileSync(file, out.replace(/\n/g, eol));
if (plain) console.log(`✓ LinkedIn copy back to plain letters → ${file}`);
else console.log(`✓ ${runs} bold run${runs === 1 ? '' : 's'} applied → ${file}`);
for (const r of refused) console.error(`! left plain (a styled hashtag, mention or link stops working): ${r}`);
