#!/usr/bin/env node
/**
 * Build one representative specimen slide per bundled slides-grab design style.
 *
 * Every value on a slide is read from the style's own spec in the slides-grab
 * package (`src/design-styles-data.js` + `src/design-diversity-data.js`) — the
 * palette hexes, the typography axis and the layout axis. Nothing is invented.
 * Where a spec's literal token would be unreadable on its own background, a
 * contrast-safe substitute is used and recorded in `palette-report.json`.
 *
 * Usage: node scripts/build-style-showcase.mjs [outDir]
 */

import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';

const require = createRequire(import.meta.url);
// listSelectableDesignStyles() is the same set `slides-grab list-styles` prints:
// the raw data holds 95 entries, three of which are source-aliases of a builtin id.
const { listSelectableDesignStyles } = await import('slides-grab/src/design-styles.js');

const OUT = resolve(process.argv[2] || 'decks/style-showcase');

/* ------------------------------------------------------------------ color */

const HEX = /#[0-9A-Fa-f]{6}\b/g;

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const hex = ([r, g, b]) =>
  '#' + [r, g, b].map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('').toUpperCase();

function luminance(h) {
  const [r, g, b] = rgb(h).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

const mix = (a, b, t) => hex(rgb(a).map((v, i) => v + (rgb(b)[i] - v) * t));
const isDark = (h) => luminance(h) < 0.4;
const readableInk = (bg) => (contrast('#FFFFFF', bg) >= contrast('#0A0A0A', bg) ? '#FFFFFF' : '#0A0A0A');

/* ------------------------------------------------------------ style specs */

function firstHex(lines = [], match) {
  for (const line of lines) {
    if (match && !match.test(line)) continue;
    const found = String(line).match(HEX);
    if (found) return found[0].toUpperCase();
  }
  return null;
}

/**
 * Spec `hex` fields are prose as often as they are values — `#FF6B35 → #FF0080`,
 * `RGBA(200,255,180,0.85)`, `TRANSPARENT → #00C8FF`. Take the first real 6-digit
 * hex and drop anything that carries none; an unsanitised string reaches CSS as
 * an invalid color and the element silently falls back to black.
 */
function normHex(value) {
  const found = String(value || '').match(/#[0-9A-Fa-f]{6}\b/);
  return found ? found[0].toUpperCase() : null;
}

function byRole(colors, re) {
  const found = (colors || []).find((c) => normHex(c.hex) && re.test(String(c.role || '')));
  return found ? normHex(found.hex) : null;
}

/** Resolve the six slide tokens from a style spec, then make them legible. */
function resolvePalette(style) {
  const colors = style.colors || [];
  const bgSource =
    firstHex(style.background, /^\s*bg\b/i) || firstHex(style.background) || byRole(colors, /^bg$/i) || '#FFFFFF';
  const notes = [];

  let bg = bgSource;
  let surface =
    firstHex(style.background, /surface/i) || byRole(colors, /surface/i) || null;
  let text = byRole(colors, /^text$/i) || byRole(colors, /title.*text|text.*title|^body text$/i) || byRole(colors, /text/i);
  let muted = byRole(colors, /muted|secondary|subtle/i);
  let accent =
    byRole(colors, /^accent$/i) || byRole(colors, /^accent 1$/i) || byRole(colors, /accent|highlight|primary|neon|glow/i);
  let border = byRole(colors, /border|hairline|rule|stroke/i);

  const pool = [...new Set(colors.map((c) => normHex(c.hex)).filter(Boolean))];

  if (!text || contrast(text, bg) < 4.5) {
    const best = pool.filter((c) => contrast(c, bg) >= 4.5).sort((a, b) => contrast(b, bg) - contrast(a, bg))[0];
    const replacement = best || readableInk(bg);
    if (text && text !== replacement) notes.push(`text ${text} → ${replacement} (contrast ${contrast(text, bg).toFixed(2)}:1 on ${bg})`);
    text = replacement;
  }

  if (!muted || contrast(muted, bg) < 4) {
    const replacement = mix(text, bg, 0.22);
    if (muted && muted !== replacement) notes.push(`muted ${muted} → ${replacement} (contrast ${contrast(muted, bg).toFixed(2)}:1 on ${bg})`);
    muted = replacement;
  }

  if (!accent || contrast(accent, bg) < 2.2) {
    const best = pool
      .filter((c) => c !== bg && c !== text && contrast(c, bg) >= 2.2)
      .sort((a, b) => contrast(b, bg) - contrast(a, bg))[0];
    const replacement = best || mix(accent || text, isDark(bg) ? '#FFFFFF' : '#000000', 0.35);
    if (accent && accent !== replacement) notes.push(`accent ${accent} → ${replacement} (contrast ${contrast(accent, bg).toFixed(2)}:1 on ${bg})`);
    accent = replacement;
  }

  if (!surface || surface === bg) surface = mix(bg, text, 0.07);
  if (!border) border = mix(bg, text, 0.22);

  const onAccent = readableInk(accent);
  const onSurface = contrast(text, surface) >= 4.5 ? text : readableInk(surface);
  // A spec whose surface is far darker/lighter than its bg (memphis-retro, swiss-editorial-bold)
  // would otherwise render panel copy in the on-bg ink and lose it entirely.
  const onSurfaceMuted = contrast(muted, surface) >= 4 ? muted : mix(onSurface, surface, 0.22);

  return {
    bg, surface, text, muted, accent, border, onAccent, onSurface, onSurfaceMuted,
    swatches: [...new Set([...pool, bg, surface, accent, text, border])].slice(0, 6),
    notes,
  };
}

/* -------------------------------------------------------------- typography */

const TYPE_AXES = ['minimal-sans', 'heavy-display', 'serif-editorial', 'mono', 'mixed'];

/**
 * design-diversity moods are positional: `<palette> · <type> · <layout> · <density> · <motion>`.
 * Read the slot, not the first matching word — `mono` is a palette value as well as a type value.
 */
function moodSlot(style, slot) {
  if (!style.collection) return null;
  const parts = String(style.mood || '').split('·').map((s) => s.trim());
  return parts[slot] || null;
}

function typeAxis(style) {
  const declared = moodSlot(style, 1);
  if (TYPE_AXES.includes(declared)) return declared;

  const spec = (style.fonts || []).join(' ');
  if (/mono|courier/i.test(spec)) return 'mono';
  if (/bebas|impact|arial black|anton|oswald|archivo black/i.test(spec)) return 'heavy-display';
  if (/playfair|didot|bodoni|garamond|georgia|serif/i.test(spec)) return 'serif-editorial';
  return 'minimal-sans';
}

const KO = `'Pretendard', 'Noto Sans KR', sans-serif`;
const FACES = {
  'minimal-sans': { display: KO, body: KO, tracking: '-0.02em' },
  'heavy-display': { display: `'ArchivoBlack', ${KO}`, body: KO, tracking: '-0.01em' },
  'serif-editorial': { display: `'PlayfairDisplay', ${KO}`, body: `'SourceSerif4', ${KO}`, tracking: '-0.01em' },
  mono: { display: `'JetBrainsMono', ${KO}`, body: `'JetBrainsMono', ${KO}`, tracking: '0' },
  mixed: { display: `'ArchivoBlack', ${KO}`, body: KO, tracking: '-0.01em' },
};

/* ------------------------------------------------------------------ layout */

const LAYOUT_AXES = ['strict-grid', 'full-bleed', 'centered', 'asymmetric', 'block-grid'];

function layoutAxis(style) {
  const declared = moodSlot(style, 2);
  if (LAYOUT_AXES.includes(declared)) return declared;

  const spec = [...(style.layout || []), ...(style.signature || [])].join(' ');
  if (/full[- ]bleed|edge[- ]to[- ]edge|full width image/i.test(spec)) return 'full-bleed';
  if (/center|symmetr/i.test(spec)) return 'centered';
  if (/asymmetr|diagonal|tilt|offset|overlap/i.test(spec)) return 'asymmetric';
  if (/grid|card|bento|modular|column/i.test(spec)) return 'block-grid';
  return 'strict-grid';
}

/** Hard-edged signature traits worth showing: thick borders and unblurred offset shadows. */
function chrome(style, p) {
  const spec = [...(style.layout || []), ...(style.signature || [])].join(' ');
  const brutal = /(hard|offset).{0,24}shadow|shadow.{0,24}(no blur|hard)|thick .{0,12}border|brutal/i.test(spec);
  if (brutal) return { border: `3px solid ${p.text}`, shadow: `6pt 6pt 0 ${p.text}`, radius: '0' };
  const rounded = /rounded|radius (1[2-9]|[2-9][0-9])|pill|soft ui|clay/i.test(spec);
  return {
    border: `1px solid ${p.border}`,
    shadow: 'none',
    radius: rounded ? '10pt' : '0',
  };
}

/* ------------------------------------------------------------------ render */

const CLASS_LABELS = { builtin: 'builtin', 'source-new': 'new', 'source-variant': 'variant' };
const classLabel = (style) => CLASS_LABELS[style.classification] || 'builtin';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** `bestFor` is a real audience note for builtin styles and a collection slug for the rest. */
function secondaryLine(style) {
  const bestFor = String(style.bestFor || '');
  if (!/design-diversity (standard|premium)/i.test(bestFor)) return bestFor;
  const related = style.relatedStyleIds || [];
  if (related.length) return `related · ${related.join(', ')}`;
  return `design-diversity · ${bestFor.split('·').pop().trim()}`;
}

const SAMPLE = '인공지능이 업무를 대신 실행하기 시작하면, 조직이 먼저 정해야 하는 것은 도구가 아니라 사람이 개입할 지점이다.';

function fontFaces() {
  return `
  @font-face { font-family:'Pretendard'; src:url('./assets/fonts/Pretendard-Regular.woff2') format('woff2'); font-weight:400; font-display:block; }
  @font-face { font-family:'Pretendard'; src:url('./assets/fonts/Pretendard-SemiBold.woff2') format('woff2'); font-weight:600; font-display:block; }
  @font-face { font-family:'Pretendard'; src:url('./assets/fonts/Pretendard-Bold.woff2') format('woff2'); font-weight:700; font-display:block; }
  @font-face { font-family:'Pretendard'; src:url('./assets/fonts/Pretendard-ExtraBold.woff2') format('woff2'); font-weight:800; font-display:block; }
  @font-face { font-family:'ArchivoBlack'; src:url('./assets/fonts/ArchivoBlack-400.woff2') format('woff2'); font-weight:400 900; font-display:block; }
  @font-face { font-family:'JetBrainsMono'; src:url('./assets/fonts/JetBrainsMono-400.woff2') format('woff2'); font-weight:400; font-display:block; }
  @font-face { font-family:'JetBrainsMono'; src:url('./assets/fonts/JetBrainsMono-700.woff2') format('woff2'); font-weight:700; font-display:block; }
  @font-face { font-family:'SourceSerif4'; src:url('./assets/fonts/SourceSerif4-400.woff2') format('woff2'); font-weight:400; font-display:block; }
  @font-face { font-family:'SourceSerif4'; src:url('./assets/fonts/SourceSerif4-700.woff2') format('woff2'); font-weight:700; font-display:block; }
  @font-face { font-family:'PlayfairDisplay'; src:url('./assets/fonts/PlayfairDisplay-400.woff2') format('woff2'); font-weight:400; font-display:block; }
  @font-face { font-family:'PlayfairDisplay'; src:url('./assets/fonts/PlayfairDisplay-900.woff2') format('woff2'); font-weight:900; font-display:block; }`;
}

/** Title size that keeps long names inside the frame without an autofit pass. */
function displaySize(title, layout) {
  const n = [...String(title)].length;
  const base = { 'full-bleed': 52, centered: 42, asymmetric: 40, 'strict-grid': 36, 'block-grid': 34 }[layout];
  if (n > 26) return Math.round(base * 0.62);
  if (n > 18) return Math.round(base * 0.74);
  if (n > 12) return Math.round(base * 0.87);
  return base;
}

function swatchRow(p, { compact = false } = {}) {
  const cells = p.swatches
    .slice(0, compact ? 4 : 6)
    .map(
      (h) => `<li style="flex:1 1 0; min-width:0; overflow:hidden;">
        <div style="height:${compact ? 14 : 20}pt; background:${h}; border:1px solid ${p.border};"></div>
        <p style="font-family:'JetBrainsMono', ${KO}; font-size:10pt; color:${p.muted}; margin-top:4pt; letter-spacing:0; white-space:nowrap;">${h}</p>
      </li>`,
    )
    .join('\n        ');
  return `<ul style="list-style:none; display:flex; gap:6pt;">\n        ${cells}\n      </ul>`;
}

function metaRow(style, p, tAxis, lAxis) {
  const item = (k, v) => `<div style="min-width:0;">
        <p style="font-size:10pt; color:${p.muted}; letter-spacing:0.08em; margin-bottom:3pt;">${esc(k)}</p>
        <p style="font-family:'JetBrainsMono', ${KO}; font-size:10pt; font-weight:700; color:${p.text};">${esc(v)}</p>
      </div>`;
  return `<div style="display:flex; gap:26pt;">
      ${item('TYPE', tAxis)}
      ${item('LAYOUT', lAxis)}
      ${item('ID', style.id)}
    </div>`;
}

function body(style, p, faces, tAxis, lAxis, ch, index, total) {
  const eyebrow = `${String(index).padStart(2, '0')} / ${total} · ${classLabel(style)}`;
  const size = displaySize(style.title, lAxis);
  const title = `<h1 style="font-family:${faces.display}; font-size:${size}pt; font-weight:800; letter-spacing:${faces.tracking}; line-height:1.34; color:${p.text};">${esc(style.title)}</h1>`;
  const mood = `<p style="font-size:13pt; font-weight:600; line-height:1.45; color:${p.accent};">${esc(style.mood || '')}</p>`;
  const sampleOn = (ink) => `<p style="font-family:${faces.body}; font-size:14pt; line-height:1.6; color:${ink};">${esc(SAMPLE)}</p>`;
  const secondaryOn = (ink) => `<p style="font-size:11pt; line-height:1.45; color:${ink};">${esc(secondaryLine(style))}</p>`;
  const sample = sampleOn(p.text);
  const samplePanel = sampleOn(p.onSurface);
  const bestForPanel = secondaryOn(p.onSurfaceMuted);
  const bestFor = secondaryOn(p.muted);
  const kicker = `<div style="background:${p.accent}; padding:4pt 9pt; display:inline-block;"><p style="font-family:'JetBrainsMono', ${KO}; font-size:10pt; font-weight:700; letter-spacing:0.1em; color:${p.onAccent};">${esc(eyebrow)}</p></div>`;
  const panel = `background:${p.surface}; border:${ch.border}; border-radius:${ch.radius}; box-shadow:${ch.shadow};`;

  switch (lAxis) {
    case 'full-bleed':
      return `
  <div style="padding:30pt 40pt 0 40pt; flex:1; display:flex; flex-direction:column; justify-content:space-between;">
    <div>${kicker}</div>
    <div>
      ${title}
      <div style="height:4pt; width:120pt; background:${p.accent}; margin:16pt 0 14pt 0;"></div>
      ${mood}
    </div>
    <div style="padding-bottom:22pt; display:flex; gap:34pt; align-items:flex-end;">
      <div style="flex:1; min-width:0;">${sample}</div>
      <div style="width:236pt; flex:none;">${swatchRow(p, { compact: true })}</div>
    </div>
  </div>
  <div style="flex:none; padding:0 40pt 42pt 40pt; display:flex; align-items:center; justify-content:space-between;">
    <p style="font-family:'JetBrainsMono', ${KO}; font-size:10pt; font-weight:700; color:${p.accent};">${esc(style.id)}</p>
    <p style="font-size:10pt; font-weight:600; color:${p.muted};">${esc(tAxis)} · ${esc(lAxis)}</p>
  </div>
  <div style="height:10pt; flex:none; background:${p.accent};"></div>`;

    case 'centered':
      return `
  <div style="flex:1; padding:32pt 62pt 42pt 62pt; display:flex; flex-direction:column; align-items:center; justify-content:space-between; text-align:center;">
    <div>${kicker}</div>
    <div style="max-width:560pt;">
      ${title}
      <div style="height:1px; background:${p.border}; margin:16pt auto; width:220pt;"></div>
      ${mood}
      <div style="margin-top:12pt;">${bestFor}</div>
    </div>
    <div style="width:100%;">
      <div style="${panel} padding:14pt 18pt; margin-bottom:14pt; text-align:left;">${samplePanel}</div>
      ${swatchRow(p, { compact: true })}
    </div>
  </div>`;

    case 'asymmetric':
      return `
  <div style="flex:1; display:flex;">
    <div style="width:57%; padding:32pt 26pt 42pt 40pt; display:flex; flex-direction:column; justify-content:space-between;">
      <div>${kicker}</div>
      <div>
        ${title}
        <div style="height:4pt; width:96pt; background:${p.accent}; margin:14pt 0 12pt 0;"></div>
        ${mood}
      </div>
      ${metaRow(style, p, tAxis, lAxis)}
    </div>
    <div style="width:43%; padding:32pt 40pt 42pt 0; display:flex; flex-direction:column; gap:14pt;">
      <div style="${panel} padding:16pt; flex:1; display:flex; flex-direction:column; justify-content:center;">
        ${samplePanel}
        <div style="margin-top:12pt;">${bestForPanel}</div>
      </div>
      ${swatchRow(p, { compact: true })}
    </div>
  </div>`;

    case 'block-grid':
      return `
  <div style="flex:1; padding:30pt 40pt 42pt 40pt; display:flex; flex-direction:column; gap:16pt;">
    <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:20pt;">
      <div style="min-width:0;">
        ${title}
        <div style="margin-top:10pt;">${mood}</div>
      </div>
      <div style="flex:none;">${kicker}</div>
    </div>
    <div style="flex:1; display:flex; gap:14pt;">
      <div style="${panel} flex:1; min-width:0; padding:16pt; display:flex; flex-direction:column; justify-content:center;">${samplePanel}</div>
      <div style="width:212pt; flex:none; display:flex; flex-direction:column; gap:14pt;">
        <div style="${panel} padding:14pt; flex:1; display:flex; align-items:center;">${bestForPanel}</div>
        <div>${swatchRow(p, { compact: true })}</div>
      </div>
    </div>
    ${metaRow(style, p, tAxis, lAxis)}
  </div>`;

    default: // strict-grid
      return `
  <div style="flex:1; display:flex;">
    <div style="width:104pt; flex:none; border-right:1px solid ${p.border}; padding:30pt 0 42pt 40pt; display:flex; flex-direction:column; justify-content:space-between;">
      <p style="font-family:'JetBrainsMono', ${KO}; font-size:28pt; font-weight:700; color:${p.accent}; line-height:1.34;">${String(index).padStart(2, '0')}</p>
      <p style="font-family:'JetBrainsMono', ${KO}; font-size:10pt; font-weight:700; letter-spacing:0.08em; color:${p.muted};">${esc(classLabel(style).toUpperCase())}</p>
    </div>
    <div style="flex:1; min-width:0; padding:30pt 40pt 42pt 26pt; display:flex; flex-direction:column; justify-content:space-between;">
      <div>
        ${title}
        <div style="margin-top:12pt;">${mood}</div>
      </div>
      <div style="${panel} padding:14pt 16pt;">${samplePanel}</div>
      <div style="display:flex; gap:24pt; align-items:flex-end;">
        <div style="flex:1; min-width:0;">${swatchRow(p, { compact: true })}</div>
        <div style="flex:none;">${metaRow(style, p, tAxis, lAxis)}</div>
      </div>
    </div>
  </div>`;
  }
}

function renderSlide(style, index, total) {
  const p = resolvePalette(style);
  const tAxis = typeAxis(style);
  const lAxis = layoutAxis(style);
  const faces = FACES[tAxis] || FACES['minimal-sans'];
  const ch = chrome(style, p);

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>${esc(style.title)} — ${esc(style.id)}</title>
<style>${fontFaces()}
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:720pt; height:405pt; overflow:hidden;
    background:${p.bg}; color:${p.text};
    font-family:${faces.body}; word-break:keep-all;
    display:flex; flex-direction:column;
  }
</style>
</head>
<body>
${body(style, p, faces, tAxis, lAxis, ch, index, total)}
</body>
</html>
`;

  return { html, report: { id: style.id, title: style.title, index, typeAxis: tAxis, layoutAxis: lAxis, classification: classLabel(style), palette: { bg: p.bg, surface: p.surface, text: p.text, muted: p.muted, accent: p.accent, border: p.border }, substitutions: p.notes } };
}

/* -------------------------------------------------------------------- main */

const styles = listSelectableDesignStyles();

mkdirSync(OUT, { recursive: true });
for (const f of readdirSync(OUT)) {
  if (/^slide-\d+\.html$/.test(f)) rmSync(join(OUT, f));
}

const width = String(styles.length).length;
const reports = [];
styles.forEach((style, i) => {
  const { html, report } = renderSlide(style, i + 1, styles.length);
  writeFileSync(join(OUT, `slide-${String(i + 1).padStart(width, '0')}.html`), html);
  reports.push(report);
});

writeFileSync(join(OUT, 'palette-report.json'), JSON.stringify({ total: styles.length, styles: reports }, null, 2) + '\n');

const substituted = reports.filter((r) => r.substitutions.length).length;
console.log(`wrote ${styles.length} specimen slides to ${OUT}`);
console.log(`contrast substitutions applied on ${substituted} slide(s) — see palette-report.json`);
for (const axis of LAYOUT_AXES) {
  console.log(`  layout ${axis}: ${reports.filter((r) => r.layoutAxis === axis).length}`);
}
for (const axis of TYPE_AXES) {
  console.log(`  type   ${axis}: ${reports.filter((r) => r.typeAxis === axis).length}`);
}
