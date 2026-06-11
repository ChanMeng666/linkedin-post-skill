// Generate a LinkedIn image with the OpenAI image API (gpt-image-1).
//
// Usage:
//   node scripts/gen-image.mjs "<prompt>" <output.png> [--size square|landscape|portrait]
//
// Reads OPENAI_API_KEY from the real env or the project .env (scripts/lib/load-env.mjs).
// Exit codes: 0 ok · 2 no API key (caller can fall back to a Mermaid/card visual) · 1 other error.
import fs from 'node:fs';
import path from 'node:path';
import { getOpenAIKey } from './lib/load-env.mjs';

const prompt = process.argv[2];
const output = process.argv[3];
const sizeFlagIdx = process.argv.indexOf('--size');
const sizeName = sizeFlagIdx !== -1 ? process.argv[sizeFlagIdx + 1] : 'square';

if (!prompt || !output) {
  console.error('Usage: node scripts/gen-image.mjs "<prompt>" <output.png> [--size square|landscape|portrait]');
  process.exit(1);
}

const SIZES = {
  square: '1024x1024',     // 1:1 — safe in-feed default
  landscape: '1536x1024',  // ~1.5:1 — closest landscape gpt-image-1 supports
  portrait: '1024x1536',   // 2:3 — taller, more feed real estate
};
const size = SIZES[sizeName] || SIZES.square;

const apiKey = getOpenAIKey();
if (!apiKey) {
  console.error(
    '\nNO OPENAI_API_KEY found.\n' +
    'Set it once via either:\n' +
    '  • copy .env.example to .env and put OPENAI_API_KEY=sk-... in it, or\n' +
    '  • set the OPENAI_API_KEY environment variable.\n' +
    'Falling back is recommended: use a brand Mermaid diagram or HTML card instead.\n'
  );
  process.exit(2);
}

const { default: OpenAI } = await import('openai');
const client = new OpenAI({ apiKey });
const model = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';

try {
  console.log(`Generating ${size} image with ${model}…`);
  const res = await client.images.generate({ model, prompt, size, n: 1 });
  const b64 = res.data?.[0]?.b64_json;
  if (!b64) throw new Error('No image data returned.');
  fs.mkdirSync(path.dirname(path.resolve(output)), { recursive: true });
  fs.writeFileSync(output, Buffer.from(b64, 'base64'));
  console.log(`✓ Image written → ${output}`);
} catch (err) {
  console.error('OpenAI image generation failed:', err?.message || err);
  process.exit(1);
}
