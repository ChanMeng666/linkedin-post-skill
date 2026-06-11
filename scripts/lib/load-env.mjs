// Minimal .env loader (no dependency). Reads KEY=VALUE lines from the project
// .env into process.env without overriding values already set in the real env.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

// Loads, in order of precedence, .env.local then .env (first wins, real env always wins).
export function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    const envPath = path.join(PROJECT_ROOT, file);
    if (!fs.existsSync(envPath)) continue;
    const text = fs.readFileSync(envPath, 'utf8');
    for (const rawLine of text.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eq = line.indexOf('=');
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      let val = line.slice(eq + 1).trim();
      // strip surrounding quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = val;
    }
  }
}

// Returns the OpenAI key or null (after attempting to load .env).
export function getOpenAIKey() {
  loadEnv();
  return process.env.OPENAI_API_KEY || null;
}

export { PROJECT_ROOT };
