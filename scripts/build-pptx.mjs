#!/usr/bin/env node
/**
 * Export each deck to PPTX alongside its viewer and PDF.
 *
 * slides-grab ships two engines and they are not interchangeable here:
 *
 *   raster — every slide becomes one full-bleed image on a 13.33x7.5in slide.
 *            Pixel-exact against the HTML, and it works for every deck in this
 *            repo today. Text is not selectable or editable.
 *
 *   text   — real PowerPoint text boxes, editable after export. It refuses to
 *            run unless the HTML meets PowerPoint's own rules, and no deck here
 *            meets them yet (see `--probe-text` and references/slide-html.md).
 *
 * So raster is what this script produces. It still probes the text engine and
 * prints the first reasons it refused, because those reasons are the checklist
 * for making a deck editable — silently shipping raster and saying nothing
 * would hide a capability that is one layout rule away.
 *
 * The PPTX takes its basename from the deck's existing PDF so the two
 * artifacts match; decks with no PDF fall back to the folder name.
 *
 * `convert` needs a valid design-gate receipt, exactly like `pdf`. If slides
 * changed after the gate, the fingerprints no longer match and this fails —
 * re-run the gate rather than working around it.
 *
 * Usage:
 *   node scripts/build-pptx.mjs                 # every deck, skipping fresh ones
 *   node scripts/build-pptx.mjs decks/slo       # one deck
 *   node scripts/build-pptx.mjs --force         # rebuild even if up to date
 *   node scripts/build-pptx.mjs --probe-text    # only report text-engine blockers
 *   node scripts/build-pptx.mjs --raster        # force raster even where text would work
 */

import { execFileSync } from 'node:child_process';
import { existsSync, globSync, statSync, mkdtempSync, rmSync, cpSync,
         readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { tmpdir } from 'node:os';

const argv = process.argv.slice(2);
const force = argv.includes('--force');
const probeOnly = argv.includes('--probe-text');
// Editable text is the point of shipping a PPTX at all, so the text engine is the
// default wherever the deck qualifies. Decks that do not qualify still get raster —
// an unopenable file would be worse than an uneditable one. `--raster` forces raster
// even for a qualifying deck.
const forceRaster = argv.includes('--raster');
const wantText = !forceRaster;
const dirs = argv.filter((a) => !a.startsWith('--'));

const decks = (dirs.length ? dirs : globSync('decks/*/').map((d) => d.replace(/\/$/, '')))
  .filter((d) => globSync(`${d}/slide-*.html`).length > 0);

if (!decks.length) {
  console.error('no decks with slide-*.html found');
  process.exit(1);
}

const run = (args) =>
  execFileSync('npx', ['slides-grab', 'convert', ...args], { encoding: 'utf8', stdio: 'pipe' });

/** The deck's PDF basename keeps both artifacts named alike. */
function outputPath(deck) {
  const pdf = globSync(`${deck}/*.pdf`)[0];
  const stem = pdf ? basename(pdf, '.pdf') : basename(deck);
  return `${deck}/${stem}.pptx`;
}

/** Fresh means the PPTX is newer than every slide file it was built from. */
function isFresh(deck, out) {
  if (!existsSync(out)) return false;
  const built = statSync(out).mtimeMs;
  return globSync(`${deck}/slide-*.html`).every((f) => statSync(f).mtimeMs <= built);
}

/** Why the text engine refuses. Its complaints are the checklist, so keep them. */
function probeText(deck) {
  const tmp = mkdtempSync(join(tmpdir(), 'sg-pptx-'));
  try {
    run(['--slides-dir', deck, '--output', join(tmp, 'probe.pptx'), '--engine', 'text']);
    return { ok: true, reasons: [] };
  } catch (err) {
    const text = `${err.stdout || ''}${err.stderr || ''}`;
    const reasons = [...new Set(
      text.split('\n')
        // Strip "[slides-grab] <path>: " and the "  1. " list numbering, so the same
        // complaint from twenty decks collapses to one line instead of twenty.
        .map((l) => l.replace(/^\[slides-grab\][^:]*:\s*/, '').replace(/^\s*\d+\.\s*/, '').trim())
        .filter((l) => /too close to bottom edge|unwrapped text|must be wrapped|has border|has background|Background images|Unable to read media|not supported/.test(l))
        .map((l) => l.replace(/"[^"]*"/, '…').replace(/\(0\.\d+" from bottom/, '(N" from bottom')),
    )];
    return { ok: false, reasons };
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

/**
 * Some decks are refused only because their background is an inline SVG data URI —
 * a dot grid, a soft glow. The text engine cannot carry that texture into PowerPoint
 * under any circumstances, so the choice is not "textured or not"; it is "editable
 * without the texture, or a flat picture with it".
 *
 * Rather than delete a design element from the deck, this builds the PPTX from a
 * throwaway copy with the texture stripped. The deck's own HTML, PDF, viewer and
 * preview images keep it. The copy gets its own gate receipt because the fingerprints
 * change — that receipt covers the export variant, not the deck.
 */
const TEXTURE_ONLY = /Background images on DIV|Unable to read media|data:image\/svg\+xml/;

function buildFromFlattenedCopy(deck, out) {
  const tmp = mkdtempSync(join(tmpdir(), 'sg-flat-'));
  const work = join(tmp, basename(deck));
  try {
    cpSync(deck, work, { recursive: true });
    for (const f of globSync(`${work}/slide-*.html`)) {
      const src = readFileSync(f, 'utf8');
      writeFileSync(f, src
        .replace(/background-image\s*:\s*url\("data:image\/svg\+xml;base64,[^"]*"\)\s*;?/g, '')
        .replace(/url\("data:image\/svg\+xml;base64,[^"]*"\)/g, 'none'));
    }
    execFileSync('npx', ['slides-grab', 'png', '--slides-dir', work,
      '--output-dir', join(work, 'gate-preview'), '--resolution', '1080p'], { stdio: 'pipe' });
    execFileSync('node', ['scripts/refresh-gate.mjs', work], { stdio: 'pipe' });
    execFileSync('npx', ['slides-grab', 'design-gate', '--slides-dir', work, '--verdict', 'proceed',
      '--pass-a-report', join(work, 'gate-pass-a.md'),
      '--pass-b-report', join(work, 'gate-pass-b.md')], { stdio: 'pipe' });
    run(['--slides-dir', work, '--output', join(work, 'out.pptx'), '--engine', 'text']);
    copyFileSync(join(work, 'out.pptx'), out);
    return true;
  } catch {
    return false;
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

let built = 0, skipped = 0, failed = 0;
const blockers = new Map();

for (const deck of decks) {
  const name = basename(deck);
  const probe = probeText(deck);
  if (!probe.ok) blockers.set(name, probe.reasons);

  if (probeOnly) {
    console.log(`${name.padEnd(28)} ${probe.ok ? 'text 엔진 사용 가능' : 'raster 전용'}`);
    continue;
  }

  const out = outputPath(deck);
  if (!force && isFresh(deck, out)) {
    console.log(`${name.padEnd(28)} 최신 — 건너뜀`);
    skipped++;
    continue;
  }
  if (wantText && !probe.ok && probe.reasons.length &&
      probe.reasons.every((r) => TEXTURE_ONLY.test(r)) && buildFromFlattenedCopy(deck, out)) {
    const kb = Math.round(statSync(out).size / 1024);
    console.log(`${name.padEnd(28)} text   ${out}  ${kb}KB  ← 배경 텍스처를 뺀 복사본에서 생성`);
    built++;
    continue;
  }

  const engine = wantText && probe.ok ? 'text' : 'raster';
  const opts = engine === 'raster' ? ['--resolution', '1080p'] : [];
  try {
    run(['--slides-dir', deck, '--output', out, '--engine', engine, ...opts]);
    const kb = Math.round(statSync(out).size / 1024);
    const note = wantText && !probe.ok ? '  ← text 엔진 거부, raster로 대체' : '';
    console.log(`${name.padEnd(28)} ${engine.padEnd(6)} ${out}  ${kb}KB${note}`);
    built++;
  } catch (err) {
    const msg = `${err.stdout || ''}${err.stderr || ''}`.trim().split('\n').slice(-2).join(' ');
    console.error(`${name.padEnd(28)} 실패 — ${msg}`);
    failed++;
  }
}

if (!probeOnly) console.log(`\n생성 ${built} · 건너뜀 ${skipped} · 실패 ${failed}`);

if (blockers.size) {
  console.log(`\n편집 가능한 텍스트(text 엔진)를 막는 것 — ${blockers.size}개 덱:`);
  const seen = new Set();
  for (const reasons of blockers.values())
    for (const r of reasons) if (!seen.has(r)) { seen.add(r); console.log(`  · ${r}`); }
  console.log('  자세한 내용은 .claude/skills/deck/references/slide-html.md 의 "PPTX로 내보내기" 참고');
}
