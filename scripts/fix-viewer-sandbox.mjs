#!/usr/bin/env node
/**
 * Make the fonts load in a built viewer.html.
 *
 * `slides-grab build-viewer` inlines each slide into an <iframe srcdoc> with
 * sandbox="allow-scripts". Without allow-same-origin that iframe gets an opaque
 * origin, so its document reports origin "null" — and @font-face fetches are
 * always CORS requests. A plain static host (GitHub Pages, python -m http.server)
 * answers them with no Access-Control-Allow-Origin, so every woff2 fails and the
 * slides render in fallback faces. Nothing errors visibly; the deck just looks wrong.
 *
 * The slides are static HTML with no <script> of their own, so allow-scripts buys
 * nothing. Trading it for allow-same-origin makes the font requests same-origin —
 * and keeps the sandbox meaningful, which "allow-scripts allow-same-origin" would
 * not, since together they let framed content remove its own sandbox.
 *
 * Re-run this after every `build-viewer`; it rewrites the generated file.
 *
 * Usage: node scripts/fix-viewer-sandbox.mjs [deck-dir ...]   (default: all of decks/*)
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { globSync } from 'node:fs';
import { join } from 'node:path';

const FROM = 'sandbox="allow-scripts"';
const TO = 'sandbox="allow-same-origin"';

const targets = process.argv.slice(2).length
  ? process.argv.slice(2).map((d) => join(d, 'viewer.html'))
  : globSync('decks/*/viewer.html');

let touched = 0;
for (const file of targets) {
  if (!existsSync(file)) {
    console.error(`skip ${file} — not found`);
    continue;
  }
  const before = readFileSync(file, 'utf8');
  const after = before.split(FROM).join(TO);
  if (after === before) continue;
  writeFileSync(file, after);
  const n = before.split(FROM).length - 1;
  console.log(`${file}: ${n} iframe(s) fixed`);
  touched++;
}
console.log(touched ? `\n${touched} viewer(s) rewritten` : '\nnothing to fix');
