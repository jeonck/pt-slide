#!/usr/bin/env node
/**
 * Regenerate index.html — the Pages landing page — from the deck table in README.md.
 *
 * The landing page listed two decks long after there were nineteen, because it was
 * hand-written and the README table was the thing anyone actually updated. So the
 * table is the source of truth now and this script renders it. Add a deck row to
 * README.md, re-run this, and the site follows.
 *
 * The <head> (and its CSS) is preserved from the existing index.html; only the
 * <body> is regenerated.
 *
 * Usage: node scripts/build-index.mjs
 */

import { readFileSync, writeFileSync, existsSync, globSync } from 'node:fs';
import { basename } from 'node:path';

const README = readFileSync('README.md', 'utf8');

// | [`decks/<name>`](decks/<name>/) | **Title** — description | N | `style` |
const ROW = /^\| \[`decks\/([a-z0-9-]+)`\]\([^)]*\) \| \*\*(.+?)\*\*\s*—\s*(.*?) \| (\d+) \| (.+?) \|$/gm;

const decks = [...README.matchAll(ROW)].map(([, name, title, desc, count, style]) => ({
  name,
  title,
  desc: desc.trim(),
  count: Number(count),
  style: style.replace(/`/g, '').trim(),
  pdf: globSync(`decks/${name}/*.pdf`)[0],
  pptx: globSync(`decks/${name}/*.pptx`)[0],
}));

if (!decks.length) throw new Error('no deck rows matched in README.md — has the table changed shape?');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const card = (d) => `    <div class="card">
      <h3>${esc(d.title)}</h3>
      <p>${esc(d.desc)}</p>
      <p class="meta">${d.count}장 · <code>${esc(d.style)}</code></p>
      <div class="links">
        <a href="./decks/${d.name}/viewer.html">뷰어 열기</a>${
  d.pdf ? `\n        <a class="ghost" href="./${d.pdf}">PDF</a>` : ''}${
  d.pptx ? `\n        <a class="ghost" href="./${d.pptx}">PPTX</a>` : ''}
      </div>
    </div>`;

const body = `<body>
<main>
  <h1>pt-slide</h1>
  <p class="lede">
    <a href="https://github.com/NomaDamas/slides-grab">slides-grab</a>로 만든 프레젠테이션 덱 ${decks.length}종.
    슬라이드는 720pt × 405pt 시맨틱 HTML이고, 아래 뷰어에서 그대로 열린다.
    뷰어에서는 <kbd>←</kbd> <kbd>→</kbd>로 넘기고 <kbd>F</kbd>로 전체화면이 된다.
  </p>

  <h2>덱 ${decks.length}종</h2>
  <div class="cards">
${decks.map(card).join('\n')}
  </div>

  <p class="note">
    뷰어는 슬라이드를 iframe으로 띄운다. 개별 슬라이드를 직접 열려면
    <code>./decks/style-showcase/slide-07.html</code>처럼 주소를 치면 된다.
  </p>

  <footer>
    이 사이트는 저장소를 그대로 배포한다. <code>main</code>에 푸시하면
    <code>.github/workflows/pages.yml</code>이 다시 배포한다. 덱 만드는 법은 저장소 README에 있다.
  </footer>
</main>
</body>
</html>
`;

const head = readFileSync('index.html', 'utf8').split('<body>')[0];
const extraCss = head.includes('.card .meta')
  ? head
  : head.replace(
      '  .note {',
      '  .card .meta { color: var(--muted); font-size: 0.82rem; }\n' +
      '  .card .meta code { font-size: 0.95em; }\n' +
      '  kbd { font: inherit; font-size: 0.9em; border: 1px solid var(--border); padding: 0 5px; }\n' +
      '  .note {',
    );

writeFileSync('index.html', extraCss + body);
console.log(`index.html: ${decks.length} deck(s)`);
for (const d of decks) if (!d.pdf) console.warn(`  no PDF found for ${d.name}`);
