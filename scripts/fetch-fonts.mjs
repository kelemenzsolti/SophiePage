/**
 * Vendors the two Google Fonts families into the repo.
 *
 * Linking `fonts.googleapis.com` cost a render-blocking stylesheet on a third
 * origin (two extra DNS + TLS handshakes) before a single glyph could paint.
 * Self-hosting folds the `@font-face` rules into our own stylesheet, which is
 * already in the critical path, so the blocking request disappears rather than
 * moving. It also keeps visitor IPs off Google's servers, which matters for an
 * EU practice.
 *
 * Only `latin` and `latin-ext` are kept — `latin-ext` is what carries Hungarian
 * ő and ű. Re-run with `npm run fonts` to pick up upstream font revisions.
 */
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_FONTS = join(ROOT, 'src', 'assets', 'fonts');
const OUT_CSS = join(ROOT, 'src', 'fonts.css');

const CSS_URL =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..500&family=Inter:wght@300..600&display=swap';

// Google returns woff2 only when the UA looks modern enough to support it.
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const KEEP = new Set(['latin', 'latin-ext']);

const css = await (await fetch(CSS_URL, { headers: { 'User-Agent': UA } })).text();

await rm(OUT_FONTS, { recursive: true, force: true });
await mkdir(OUT_FONTS, { recursive: true });

// Google's CSS is a flat list of `/* subset */` comments each followed by one
// @font-face block, which makes a split on the comment a reliable parse.
const blocks = css
  .split(/\/\*\s*([\w-]+)\s*\*\//)
  .slice(1)
  .reduce((acc, part, i, arr) => {
    if (i % 2 === 0) acc.push({ subset: part, rule: arr[i + 1] });
    return acc;
  }, []);

const out = [
  '/* Self-hosted via `npm run fonts` — see scripts/fetch-fonts.mjs.',
  '   Generated file: edit the script, not this. */',
  '',
];
let total = 0;

for (const { subset, rule } of blocks) {
  if (!KEEP.has(subset)) continue;

  const remote = rule.match(/url\((https:\/\/[^)]+\.woff2)\)/)?.[1];
  if (!remote) continue;

  const family = rule.match(/font-family:\s*'([^']+)'/)[1];
  const style = rule.match(/font-style:\s*(\w+)/)?.[1] ?? 'normal';
  const file = `${family.toLowerCase()}-${subset}-${style}.woff2`;

  const bytes = Buffer.from(await (await fetch(remote)).arrayBuffer());
  await writeFile(join(OUT_FONTS, file), bytes);
  total += bytes.length;
  console.log(`${file}  ${(bytes.length / 1024).toFixed(1)} KiB`);

  // Relative URL so Vite fingerprints the file and rewrites it against `base`.
  out.push(rule.replace(remote, `./assets/fonts/${file}`).trim(), '');
}

await writeFile(OUT_CSS, out.join('\n'), 'utf8');
console.log(`\nTotal ${(total / 1024).toFixed(1)} KiB -> src/fonts.css`);
