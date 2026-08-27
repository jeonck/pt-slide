#!/usr/bin/env node
/**
 * Refresh the fingerprint and evidence lines in a deck's gate reports.
 *
 * Editing a slide changes its sha256, which invalidates the receipt and blocks
 * pdf/convert/figma. The reports then have to name the current fingerprints. That
 * part is bookkeeping and is what this script does.
 *
 * It does NOT re-review anything. The verdict, the checks and the findings are
 * still yours to re-establish by re-rendering and looking — a receipt whose
 * fingerprints were refreshed without anyone re-reading the slides is exactly the
 * rubber stamp the gate exists to prevent. Re-render first, look, update the
 * report text, then run this and the gate.
 *
 * Usage: node scripts/refresh-gate.mjs decks/<name>
 */

import { readFileSync, writeFileSync, existsSync, globSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { basename } from 'node:path';

const deck = process.argv[2]?.replace(/\/$/, '');
if (!deck) {
  console.error('usage: node scripts/refresh-gate.mjs decks/<name>');
  process.exit(1);
}

const slides = globSync(`${deck}/slide-*.html`).sort();
if (!slides.length) {
  console.error(`no slide-*.html under ${deck}`);
  process.exit(1);
}

const fingerprints = slides
  .map((f) => `${basename(f)}: ${createHash('sha256').update(readFileSync(f)).digest('hex')}`)
  .join(', ');

const evidence = globSync(`${deck}/gate-preview/slide-*.png`).sort().join(', ');

let touched = 0;
for (const report of [`${deck}/gate-pass-a.md`, `${deck}/gate-pass-b.md`]) {
  if (!existsSync(report)) {
    console.error(`skip ${report} — not found`);
    continue;
  }
  const before = readFileSync(report, 'utf8');
  let after = before.replace(/^Slide fingerprints:.*$/m, `Slide fingerprints: ${fingerprints}`);
  if (evidence) after = after.replace(/^Evidence:.*$/m, `Evidence: ${evidence}`);
  if (after === before) continue;
  writeFileSync(report, after);
  console.log(`${report}: refreshed`);
  touched++;
}
console.log(touched ? `\n${touched} report(s) updated — now re-review, then run design-gate` : '\nnothing changed');
