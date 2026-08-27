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
 *   node scripts/build-pptx.mjs --text decks/slo  # editable text where the deck qualifies
 */

import { execFileSync } from 'node:child_process';
import { existsSync, globSync, statSync, mkdtempSync, rmSync } from 'node:fs';
import { basename, join } from 'node:path';
import { tmpdir } from 'node:os';

const argv = process.argv.slice(2);
const force = argv.includes('--force');
const probeOnly = argv.includes('--probe-text');
// Off by default on purpose. Raster embeds the very PNGs the design gate reviewed, so
// what ships is what was checked. The text engine re-lays the slide out of the DOM and
// there is no PowerPoint renderer here to confirm the result, so opting into it is a
// deliberate choice the author makes and then checks in PowerPoint themselves.
const wantText = argv.includes('--text');
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
        .filter((l) => /too close to bottom edge|unwrapped text|must be wrapped/.test(l))
        .map((l) => l.replace(/"[^"]*"/, '…').replace(/\(0\.\d+" from bottom/, '(N" from bottom')),
    )];
    return { ok: false, reasons };
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
  const engine = wantText && probe.ok ? 'text' : 'raster';
  const opts = engine === 'raster' ? ['--resolution', '1080p'] : [];
  try {
    run(['--slides-dir', deck, '--output', out, '--engine', engine, ...opts]);
    const kb = Math.round(statSync(out).size / 1024);
    const note = wantText && !probe.ok ? '  (text 불가 → raster)' : '';
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
