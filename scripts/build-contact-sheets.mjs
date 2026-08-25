#!/usr/bin/env node
/**
 * Tile a deck's rendered PNGs into 3x4 contact sheets.
 *
 * A 92-slide deck cannot be reviewed one PNG at a time, but the design gate
 * still requires every rendered slide to actually be looked at. This produces
 * eight labelled sheets that a reviewer (human or agent) can scan in one pass.
 *
 * Usage: node scripts/build-contact-sheets.mjs [pngDir] [outDir]
 */

import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = process.argv[2] || 'decks/style-showcase/gate-preview';
const OUT = process.argv[3] || join(SRC, '..', 'contact-sheets');
mkdirSync(OUT, { recursive: true });

const files = readdirSync(SRC).filter(f => f.endsWith('.png')).sort();
const COLS = 3, ROWS = 4, TW = 620, TH = 349, PAD = 10, LBL = 22;
const per = COLS * ROWS;
const W = COLS * TW + (COLS + 1) * PAD;
const H = ROWS * (TH + LBL) + (ROWS + 1) * PAD;

for (let s = 0; s * per < files.length; s++) {
  const batch = files.slice(s * per, s * per + per);
  const comps = [];
  for (let i = 0; i < batch.length; i++) {
    const c = i % COLS, r = Math.floor(i / COLS);
    const left = PAD + c * (TW + PAD);
    const top = PAD + r * (TH + LBL + PAD);
    const n = batch[i].replace('slide-', '').replace('.png', '');
    const label = Buffer.from(
      `<svg width="${TW}" height="${LBL}"><rect width="${TW}" height="${LBL}" fill="#111"/><text x="6" y="16" font-family="monospace" font-size="14" fill="#fff">slide-${n}</text></svg>`
    );
    comps.push({ input: label, left, top });
    comps.push({ input: await sharp(join(SRC, batch[i])).resize(TW, TH).toBuffer(), left, top: top + LBL });
  }
  const name = join(OUT, `sheet-${String(s + 1).padStart(2, '0')}.png`);
  await sharp({ create: { width: W, height: H, channels: 3, background: '#4a4a4a' } })
    .composite(comps).png({ compressionLevel: 9 }).toFile(name);
  console.log(name, batch[0], '→', batch[batch.length - 1]);
}
