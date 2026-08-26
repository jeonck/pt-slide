#!/usr/bin/env node
/**
 * Patch a built viewer.html. Two fixes, both idempotent, both undone every time
 * `slides-grab build-viewer` regenerates the file — so run this right after it.
 *
 * 1. FONTS. build-viewer inlines each slide into an <iframe srcdoc> with
 *    sandbox="allow-scripts". Without allow-same-origin that frame gets an opaque
 *    origin and reports itself as "null", and @font-face fetches are always CORS
 *    requests — so a plain static host (GitHub Pages included) answers them with no
 *    Access-Control-Allow-Origin and every woff2 fails. Nothing errors visibly; the
 *    slides just render in fallback faces. The slides carry no <script> of their own,
 *    so allow-scripts buys nothing; trading it for allow-same-origin makes the font
 *    requests same-origin. Never grant both — together they let framed content
 *    remove its own sandbox.
 *
 * 2. ARROW KEYS. The viewer binds ArrowLeft/ArrowRight/Space/Home/End/F on its own
 *    document, which works until you click a slide. That moves focus into the iframe,
 *    and key events in a framed document do not bubble to the parent, so navigation
 *    silently stops. Scripts inside the frame are blocked by the sandbox, but the
 *    parent may reach in — same-origin, thanks to fix 1 — and attach the listener
 *    from outside.
 *
 * Usage: node scripts/patch-viewer.mjs [deck-dir ...]   (default: all of decks/*)
 */

import { readFileSync, writeFileSync, existsSync, globSync } from 'node:fs';
import { join } from 'node:path';

const SANDBOX_FROM = 'sandbox="allow-scripts"';
const SANDBOX_TO = 'sandbox="allow-same-origin"';
const MARKER = 'slides-grab-patch: key-forwarding';

const KEY_FORWARDING = `
<script>
  // ${MARKER}
  // Clicking a slide focuses its iframe; key events there never reach this document.
  // The frames are same-origin, so bind the parent's handler onto each framed
  // document from out here. Re-bound on load: srcdoc frames can reparse.
  (() => {
    const NAV = ['ArrowRight', 'ArrowLeft', ' ', 'Home', 'End'];
    const forward = (frame) => {
      let doc;
      try { doc = frame.contentDocument; } catch { return; }
      if (!doc || doc.__sgKeys) return;
      doc.__sgKeys = true;
      doc.addEventListener('keydown', (e) => {
        if (NAV.includes(e.key)) e.preventDefault();
        document.dispatchEvent(new KeyboardEvent('keydown', { key: e.key, bubbles: true }));
      });
    };
    for (const frame of document.querySelectorAll('iframe')) {
      forward(frame);
      frame.addEventListener('load', () => forward(frame));
    }
  })();
</script>
`;

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
  let after = before.split(SANDBOX_FROM).join(SANDBOX_TO);

  if (!after.includes(MARKER)) {
    const close = after.lastIndexOf('</body>');
    if (close === -1) {
      console.error(`skip ${file} — no </body> to insert before`);
      continue;
    }
    after = after.slice(0, close) + KEY_FORWARDING + after.slice(close);
  }

  if (after === before) continue;
  writeFileSync(file, after);
  const frames = before.split(SANDBOX_FROM).length - 1;
  console.log(`${file}: sandbox ${frames}, keys ${before.includes(MARKER) ? 'already' : 'added'}`);
  touched++;
}
console.log(touched ? `\n${touched} viewer(s) patched` : '\nnothing to patch');
