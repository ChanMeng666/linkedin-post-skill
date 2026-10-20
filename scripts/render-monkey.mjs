// Render a Chan monkey illustration for a post, through the chan-monkey-illustrations skill
// (an image model anchored on the logo as a reference image). The brief is a prompt file
// written from that skill's references/prompt-template.md and the post profile in
// references/visuals.md §8.
//
// Usage:
//   node scripts/render-monkey.mjs <brief.txt> <output.png> --size portrait|wide [--from <image.png>]
//
// - --size portrait → 1080×1350 (LinkedIn) · wide → 1600×900 (X). Always on the basalt ground.
// - --from recomposes an existing monkey visual into the other shape, so both platforms get
//   the same picture instead of two different generations.
// - Overwrites <output.png>; the brief is copied to <output dir>/prompts/<name>.txt.
//
// The skill is found at $CHAN_MONKEY_SKILL, else ~/.claude/skills/chan-monkey-illustrations,
// else the sibling repo ../chan-monkey-illustrations/chan-monkey-illustrations.
// Needs Python 3 with `openai`, `pillow`, `numpy`, and OPENAI_API_KEY (environment, a .env in
// this repo, or a .env in the skill folder).
// Exits 2 when the skill, Python or the key is missing: fall back to the hero plate (§6).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SIZES = { portrait: 'linkedin', wide: 'x' };
const SHAPES = { portrait: 'a 4:5 portrait', wide: 'a 16:9 landscape' };

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) { out[a.slice(2)] = argv[i + 1]; i++; }
    else out._.push(a);
  }
  return out;
}

function findSkill() {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    process.env.CHAN_MONKEY_SKILL,
    path.join(os.homedir(), '.claude', 'skills', 'chan-monkey-illustrations'),
    path.resolve(here, '..', '..', 'chan-monkey-illustrations', 'chan-monkey-illustrations'),
  ].filter(Boolean);
  return candidates.find((dir) => fs.existsSync(path.join(dir, 'scripts', 'generate_image.py')));
}

function findPython() {
  for (const cmd of ['python', 'python3', 'py']) {
    const r = spawnSync(cmd, ['--version'], { encoding: 'utf8' });
    if (r.status === 0) return cmd;
  }
  return null;
}

const args = parseArgs(process.argv.slice(2));
const [brief, output] = args._;
if (!brief || !output || !SIZES[args.size]) {
  console.error('Usage: node scripts/render-monkey.mjs <brief.txt> <output.png> --size portrait|wide [--from <image.png>]');
  process.exit(1);
}
if (!fs.existsSync(brief)) { console.error(`Brief not found: ${brief}`); process.exit(1); }
if (args.from && !fs.existsSync(args.from)) { console.error(`--from image not found: ${args.from}`); process.exit(1); }

const skill = findSkill();
if (!skill) {
  console.error('chan-monkey-illustrations skill not found (set CHAN_MONKEY_SKILL). Use the hero plate instead.');
  process.exit(2);
}
const python = findPython();
if (!python) { console.error('Python 3 not found on PATH. Use the hero plate instead.'); process.exit(2); }

let prompt = fs.readFileSync(brief, 'utf8');
if (args.from) {
  prompt = `Recompose the first image into ${SHAPES[args.size]} frame. Keep the same character, pose and
action, the same objects, the same labels with identical spelling, the same colours and line
style, on a pure white background. Change only the layout so it fits the new shape; add nothing.

The original brief, for reference:

${prompt}`;
}

// Hand the prompt over as a file so it lands in prompts/ beside the image.
const tmp = path.join(os.tmpdir(), `monkey-brief-${process.pid}.txt`);
fs.writeFileSync(tmp, prompt);
const cliArgs = [
  path.join(skill, 'scripts', 'generate_image.py'),
  '--prompt-file', tmp,
  '--out', output,
  '--size', SIZES[args.size],
  '--ground', 'basalt',
  '--overwrite',
];
if (args.from) cliArgs.push('--edit', args.from);

const r = spawnSync(python, cliArgs, { stdio: 'inherit' });
fs.rmSync(tmp, { force: true });
// generate_image.py exits 2 for a missing key or input; pass it through.
process.exit(r.status ?? 1);
