// Measure and lint the copy blocks in a post.md handoff.
//
// Usage:
//   node scripts/count.mjs output/<date>-<slug>/post.md
//
// Reads every fenced block whose info string is `text linkedin` or `text x`.
//   - linkedin: character count against the 3,000 cap, the "see more" preview, hashtag count,
//               and the bold budget (bold is look-alike Unicode letters; see scripts/style.mjs).
//   - x: one post per block, or a thread with posts separated by a line containing only `---`.
//        Length is X's weighted count (URL = 23, emoji and CJK = 2, everything else = 1).
// Also flags the house-style bans from references/voice.md. Exits 1 on any hard failure
// (over a platform limit); warnings alone exit 0.
import fs from 'node:fs';

const file = process.argv[2];
if (!file) { console.error('Usage: node scripts/count.mjs <post.md>'); process.exit(1); }
if (!fs.existsSync(file)) { console.error(`Not found: ${file}`); process.exit(1); }

const LINKEDIN_CAP = 3000;
const LINKEDIN_PREVIEW = 210; // roughly what shows before "see more" on desktop; less on mobile
const X_CAP = 280;
const URL_RE = /https?:\/\/\S+/g;

// X weights code points in these ranges as 1 and everything else as 2 (twitter-text v3).
const LIGHT = [[0, 4351], [8192, 8205], [8208, 8223], [8242, 8247]];
const seg = new Intl.Segmenter('en', { granularity: 'grapheme' });

function xLength(text) {
  let n = 0;
  const rest = text.replace(URL_RE, () => { n += 23; return ''; });
  for (const { segment } of seg.segment(rest.normalize('NFC'))) {
    if (/\p{Extended_Pictographic}/u.test(segment)) { n += 2; continue; }
    for (const ch of segment) {
      const cp = ch.codePointAt(0);
      n += LIGHT.some(([a, b]) => cp >= a && cp <= b) ? 1 : 2;
    }
  }
  return n;
}

// Bold look-alike letters and digits (Mathematical Sans-Serif Bold), as written by style.mjs.
const B = '[\u{1D5D4}-\u{1D607}\u{1D7EC}-\u{1D7F5}]';
const BOLD_CHAR = new RegExp(B, 'gu');
const BOLD_RUN = new RegExp(`${B}(?:[^A-Za-z0-9\n]*${B})*`, 'gu');
const LETTER = /[\p{L}\p{N}]/gu;
const BOLD_RUNS_MAX = 6;       // label lines and lead-ins, not sentences
const BOLD_SHARE_MAX = 0.12;   // of all letters and digits in the post
const BOLD_RUN_CHARS_MAX = 60;

const hashtags = (t) => (t.match(/(^|\s)#[\p{L}\p{N}_]+/gu) || []).length;
const emoji = (t) => [...seg.segment(t)].filter((s) => /\p{Extended_Pictographic}/u.test(s.segment)).length;

function lint(text, platform) {
  const w = [];
  if (/—/.test(text)) w.push('em dash found: use a comma, a colon or a full stop');
  if (/👇/.test(text)) w.push('👇 found: no pointing at the list or the comments');
  if (/[✅❌]/u.test(text)) w.push('✅/❌ found: write the contrast as sentences');
  if (/^\s*→/m.test(text)) w.push('arrow bullets found: write sentences or a plain list');
  if (/\*\*/.test(text)) w.push(platform === 'linkedin' ? '** markers still in the copy: run scripts/style.mjs to turn them into bold' : '** markers found: X takes no bold');
  if (/^#{1,6} /m.test(text)) w.push('markdown heading found: neither platform renders it');
  const runs = text.match(BOLD_RUN) || [];
  if (platform === 'x' && runs.length) w.push('bold letters found: X posts stay plain');
  if (platform === 'linkedin' && runs.length) {
    const share = (text.match(BOLD_CHAR) || []).length / Math.max(1, (text.match(LETTER) || []).length);
    if (runs.length > BOLD_RUNS_MAX) w.push(`${runs.length} bold runs: keep to ${BOLD_RUNS_MAX} or fewer, or nothing stands out`);
    if (share > BOLD_SHARE_MAX) w.push(`${Math.round(share * 100)}% of the post is bold: keep it under ${BOLD_SHARE_MAX * 100}%`);
    for (const r of runs) if ([...r].length > BOLD_RUN_CHARS_MAX) w.push(`a bold run of ${[...r].length} characters: bold a label or a lead-in, not a whole sentence`);
    if (text.split('\n')[0].match(BOLD_CHAR)) w.push('bold in the first line: the opening stays plain so search and the preview read it as words');
  }
  if (/(^|\n)@\w/.test(text) && platform === 'linkedin') w.push('"@" in LinkedIn copy: names go in as plain text, Chan tags them by hand');
  const tags = hashtags(text);
  const tagMax = platform === 'x' ? 1 : 5;
  if (tags > tagMax) w.push(`${tags} hashtags: ${platform === 'x' ? 'X takes 0, or 1 for an event tag' : 'LinkedIn takes 0, or 3 to 5'}`);
  const e = emoji(text);
  const emojiMax = platform === 'x' ? 1 : 4;
  if (e > emojiMax) w.push(`${e} emoji: keep to ${emojiMax} or fewer unless they mark a list of people or times`);
  return w;
}

const md = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
const blocks = [...md.matchAll(/^```text[ \t]+(linkedin|x)[^\n]*\n([\s\S]*?)\n```[ \t]*$/gm)]
  .map((m) => ({ platform: m[1], body: m[2].trim() }));

if (!blocks.length) {
  console.error('No ```text linkedin or ```text x blocks found.');
  process.exit(1);
}

let failed = false;
for (const { platform, body } of blocks) {
  if (platform === 'linkedin') {
    const len = [...body].length;
    const ok = len <= LINKEDIN_CAP;
    if (!ok) failed = true;
    const runs = (body.match(BOLD_RUN) || []).length;
    console.log(`\nLinkedIn  ${len} / ${LINKEDIN_CAP} chars  ${ok ? 'ok' : 'OVER'}  ·  ${hashtags(body)} hashtags  ·  ${emoji(body)} emoji  ·  ${runs} bold run${runs === 1 ? '' : 's'}`);
    // A bold letter is one character on screen but two UTF-16 units. If LinkedIn counts units,
    // the post is body.length long.
    if (runs && body.length > LINKEDIN_CAP) console.log(`  ! ${body.length} if bold letters count double: trim, or use less bold`);
    console.log(`  preview before "see more": ${JSON.stringify([...body].slice(0, LINKEDIN_PREVIEW).join(''))}`);
    for (const w of lint(body, 'linkedin')) console.log(`  ! ${w}`);
  } else {
    const posts = body.split(/\n[ \t]*---[ \t]*\n/).map((p) => p.trim()).filter(Boolean);
    console.log(`\nX  ${posts.length > 1 ? `thread of ${posts.length}` : 'single post'}`);
    posts.forEach((p, i) => {
      const len = xLength(p);
      const ok = len <= X_CAP;
      if (!ok) failed = true;
      console.log(`  ${String(i + 1).padStart(2)}. ${String(len).padStart(3)} / ${X_CAP}  ${ok ? 'ok' : 'OVER'}  ${JSON.stringify(p.split('\n')[0].slice(0, 60))}`);
      if (i > 0 && URL_RE.test(p) === false && /\blink\b.*\b(below|above)\b/i.test(p)) console.log('      ! refers to a link that is not in this post');
      URL_RE.lastIndex = 0;
    });
    if (URL_RE.test(posts[0])) console.log('  ! link in the first post: put it in the last post or a reply');
    URL_RE.lastIndex = 0;
    for (const w of lint(body.replace(/\n[ \t]*---[ \t]*\n/g, '\n'), 'x')) console.log(`  ! ${w}`);
  }
}
console.log('');
process.exit(failed ? 1 : 0);
