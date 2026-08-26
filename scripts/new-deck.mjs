#!/usr/bin/env node
/**
 * Scaffold a deck folder: directory, locally embedded Korean fonts, outline stub.
 *
 * Every deck in this repo needs Pretendard copied into its own assets/fonts/ —
 * slides-grab rejects remote font URLs in saved slide HTML, and the container has
 * no Korean system font, so Hangul renders as tofu without it. Doing that by hand
 * each time is the step most likely to be forgotten or done inconsistently.
 *
 * Usage: node scripts/new-deck.mjs <deck-name> [--display]
 *   --display  also copy the Latin display faces (Archivo Black, JetBrains Mono,
 *              Source Serif 4, Playfair Display) used by the style showcase
 */

import { mkdirSync, copyFileSync, existsSync, writeFileSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const name = args.find((a) => !a.startsWith('--'));
const withDisplay = args.includes('--display');

if (!name) {
  console.error('usage: node scripts/new-deck.mjs <deck-name> [--display]');
  process.exit(1);
}

const DECK = resolve('decks', name);
const FONTS = join(DECK, 'assets', 'fonts');

if (existsSync(DECK)) {
  console.error(`decks/${name} already exists — pick another name or edit it in place.`);
  process.exit(1);
}

/**
 * Fonts come from npm because the CDN hosts (jsDelivr) are blocked by the egress proxy.
 *
 * They install into a throwaway prefix rather than the repo's node_modules: repeated
 * `npm install --no-save` calls prune each other's packages as extraneous, so installing
 * one at a time silently leaves only the last one on disk.
 */
// Unique per invocation: several decks may be scaffolded concurrently, and a shared
// staging directory would have them deleting each other's downloads mid-install.
const TMP = resolve(`.font-staging-${name}`);

function stageFonts(packages) {
  mkdirSync(TMP, { recursive: true });
  console.log(`fetching ${packages.join(', ')} ...`);
  execSync(`npm install --no-save --no-audit --no-fund --prefix ${TMP} ${packages.join(' ')}`, { stdio: 'inherit' });
}

const FACES = [
  ['pretendard', 'dist/web/static/woff2/Pretendard-Regular.woff2', 'Pretendard-Regular.woff2'],
  ['pretendard', 'dist/web/static/woff2/Pretendard-SemiBold.woff2', 'Pretendard-SemiBold.woff2'],
  ['pretendard', 'dist/web/static/woff2/Pretendard-Bold.woff2', 'Pretendard-Bold.woff2'],
  ['pretendard', 'dist/web/static/woff2/Pretendard-ExtraBold.woff2', 'Pretendard-ExtraBold.woff2'],
  ['pretendard', 'dist/LICENSE.txt', 'PRETENDARD-LICENSE.txt'],
];

const DISPLAY_FACES = [
  ['@fontsource/archivo-black', 'files/archivo-black-latin-400-normal.woff2', 'ArchivoBlack-400.woff2'],
  ['@fontsource/jetbrains-mono', 'files/jetbrains-mono-latin-400-normal.woff2', 'JetBrainsMono-400.woff2'],
  ['@fontsource/jetbrains-mono', 'files/jetbrains-mono-latin-700-normal.woff2', 'JetBrainsMono-700.woff2'],
  ['@fontsource/source-serif-4', 'files/source-serif-4-latin-400-normal.woff2', 'SourceSerif4-400.woff2'],
  ['@fontsource/source-serif-4', 'files/source-serif-4-latin-700-normal.woff2', 'SourceSerif4-700.woff2'],
  ['@fontsource/playfair-display', 'files/playfair-display-latin-400-normal.woff2', 'PlayfairDisplay-400.woff2'],
  ['@fontsource/playfair-display', 'files/playfair-display-latin-900-normal.woff2', 'PlayfairDisplay-900.woff2'],
];

mkdirSync(FONTS, { recursive: true });

const faces = withDisplay ? [...FACES, ...DISPLAY_FACES] : FACES;
try {
  stageFonts([...new Set(faces.map(([pkg]) => pkg))]);
  for (const [pkg, from, to] of faces) {
    copyFileSync(join(TMP, 'node_modules', pkg, from), join(FONTS, to));
  }
} finally {
  rmSync(TMP, { recursive: true, force: true });
}
console.log(`copied ${faces.length} font file(s) into decks/${name}/assets/fonts/`);

writeFileSync(join(DECK, 'slide-outline.md'), `# <제목> — 슬라이드 아웃라인

## meta
- deck: decks/${name}
- mode: html
- style: <bundled-style-id>          # slides-grab list-styles 로 고르고, show-design 으로 스펙 확인
- slide-size: 720pt × 405pt
- language: 한국어
- audience: <누가 듣는가>
- tone: <어떤 톤으로>
- slides: <N>
- charts: <어떤 데이터를 쓸지, 출처가 무엇인지. 없으면 "없음"이라고 적고 수치를 만들지 말 것>
- fonts: Pretendard woff2 로컬 임베드 (\`./assets/fonts/\`)

## 디자인 토큰
<show-design 출력에서 그대로 옮겨 적기 — bg/surface/text/muted/accent/border, 헤더바 비율, 콜아웃 규격>

## 비주얼 테제
<한 문단. 이 덱이 어떤 인상이어야 하는가>

## 콘텐츠 플랜
<opener → 근거/전개 → 마무리의 흐름 한 줄>

---

## slide-01 — <제목>
- 레이아웃:
- 핵심 메시지:
- 의도:
`);

console.log(`\ndecks/${name} 준비 완료`);
console.log(`  다음: slide-outline.md 를 채우고 slide-01.html 부터 작성`);
console.log(`  검증: npx slides-grab validate --slides-dir decks/${name}   (리포 루트에서 실행할 것)`);
