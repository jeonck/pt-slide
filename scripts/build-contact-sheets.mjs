#!/usr/bin/env node
/**
 * Tile a deck's rendered PNGs into 3x4 contact sheets.
 *
 * Two uses, one layout:
 *
 *   review mode (default) — large tiles for the design gate. A 92-slide deck
 *   cannot be reviewed one PNG at a time, but the gate still requires every
 *   rendered slide to actually be looked at; these sheets make that one pass.
 *
 *   --web — small, palette-quantised tiles sized to embed in a README. GitHub
 *   serves .html from a repo as source, not as a page, so committed sheets are
 *   how the slides stay viewable in the browser without cloning or Pages.
 *
 * Usage: node scripts/build-contact-sheets.mjs [pngDir] [outDir] [--web]
 */

import sharp from 'sharp';
import { readdirSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const web = args.includes('--web');
const positional = args.filter((a) => !a.startsWith('--'));

const SRC = positional[0] || 'decks/style-showcase/gate-preview';
const OUT = positional[1] || join(SRC, '..', web ? 'preview' : 'contact-sheets');
mkdirSync(OUT, { recursive: true });

const files = readdirSync(SRC).filter((f) => f.endsWith('.png')).sort();
const COLS = 3, ROWS = 4;
const { TW, TH, PAD, LBL, FONT } = web
  ? { TW: 480, TH: 270, PAD: 8, LBL: 18, FONT: 12 }
  : { TW: 620, TH: 349, PAD: 10, LBL: 22, FONT: 14 };
const per = COLS * ROWS;
const W = COLS * TW + (COLS + 1) * PAD;
const H = ROWS * (TH + LBL) + (ROWS + 1) * PAD;

let bytes = 0;
for (let s = 0; s * per < files.length; s++) {
  const batch = files.slice(s * per, s * per + per);
  const comps = [];
  for (let i = 0; i < batch.length; i++) {
    const c = i % COLS, r = Math.floor(i / COLS);
    const left = PAD + c * (TW + PAD);
    const top = PAD + r * (TH + LBL + PAD);
    const n = batch[i].replace('slide-', '').replace('.png', '');
    const label = Buffer.from(
      `<svg width="${TW}" height="${LBL}"><rect width="${TW}" height="${LBL}" fill="#16181d"/><text x="6" y="${LBL - 5}" font-family="monospace" font-size="${FONT}" fill="#e6e6e6">${web ? n : `slide-${n}`}</text></svg>`
    );
    comps.push({ input: label, left, top });
    comps.push({ input: await sharp(join(SRC, batch[i])).resize(TW, TH).toBuffer(), left, top: top + LBL });
  }
  const first = String(s * per + 1).padStart(2, '0');
  const last = String(Math.min(s * per + per, files.length)).padStart(2, '0');
  const name = join(OUT, web ? `slides-${first}-${last}.png` : `sheet-${String(s + 1).padStart(2, '0')}.png`);
  await sharp({ create: { width: W, height: H, channels: 3, background: '#2b2f36' } })
    .composite(comps)
    .png(web ? { palette: true, quality: 90, compressionLevel: 9 } : { compressionLevel: 9 })
    .toFile(name);
  bytes += statSync(name).size;
  console.log(`${name}  ${batch[0]} → ${batch[batch.length - 1]}  ${(statSync(name).size / 1024) | 0}KB`);
}
console.log(`total ${(bytes / 1024 / 1024).toFixed(2)}MB across ${Math.ceil(files.length / per)} sheet(s)`);
