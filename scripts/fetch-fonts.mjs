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
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_FONTS = join(ROOT, 'src', 'assets', 'fonts');
const OUT_CSS = join(ROOT, 'src', 'fonts.css');

const CSS_URL =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..500&family=Inter:wght@300..600&display=swap';

// Google returns woff2 only when the UA looks modern enough to support it.
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const KEEP = new Set(['latin', 'latin-ext']);

/**
 * Every character the site can render, read straight out of the source.
 *
 * Google's `latin` + `latin-ext` subsets carry ~700 glyphs each and cost 334 KiB
 * across the six files — on a throttled connection that is two thirds of the
 * critical path, and it delays the hero image and the bundle behind it. The page
 * only ever shows the strings in `translations.ts` and `site.ts`, so everything
 * else is dead weight.
 *
 * Deriving the set from the source rather than hard-coding it means adding copy
 * cannot silently outrun the fonts: re-run `npm run fonts` and the new glyphs are
 * picked up. The ASCII + Hungarian floor below is a safety margin for strings
 * that are built at runtime (dates, numbers, the decoded contact details).
 */
// Printable ASCII, built from its range so no quote character has to be escaped
// into this literal.
const ASCII = Array.from({ length: 0x7e - 0x20 + 1 }, (_, i) =>
  String.fromCharCode(0x20 + i),
).join('');

/** Punctuation the copy uses that lives outside ASCII. */
const TYPOGRAPHIC =
  ' ' + // no-break space (used in "15 000 Ft")
  '​' + // zero-width space
  '–—' + // en dash, em dash
  '‘’“”„' + // curly quotes
  '…' + // ellipsis
  '·•' + // middle dot, bullet
  '€£' + // currency
  '→↑'; // arrows

/** Hungarian, then accents that turn up in loanwords and personal names. */
const HUNGARIAN = 'áéíóöőúüűÁÉÍÓÖŐÚÜŰ';
const EXTRA_LATIN = 'äßàâçèêëîïôùûñÄÀÂÇÈÊËÎÏÔÙÛÑ';

const ALWAYS = ASCII + TYPOGRAPHIC + HUNGARIAN + EXTRA_LATIN;

async function collectCharacters() {
  const sources = ['src/i18n/translations.ts', 'src/content/site.ts'];
  let chars = ALWAYS;
  for (const file of sources) {
    chars += await readFile(join(ROOT, file), 'utf8');
  }
  // Sort for a stable subset across runs, so identical content produces
  // byte-identical fonts and the build stays reproducible.
  return [...new Set(chars)].sort().join('');
}

const TEXT = await collectCharacters();
console.log(`Subsetting to ${TEXT.length} distinct characters
`);

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
let before = 0;

for (const { subset, rule } of blocks) {
  if (!KEEP.has(subset)) continue;

  const remote = rule.match(/url\((https:\/\/[^)]+\.woff2)\)/)?.[1];
  if (!remote) continue;

  const family = rule.match(/font-family:\s*'([^']+)'/)[1];
  const style = rule.match(/font-style:\s*(\w+)/)?.[1] ?? 'normal';
  const file = `${family.toLowerCase()}-${subset}-${style}.woff2`;

  const original = Buffer.from(await (await fetch(remote)).arrayBuffer());

  // harfbuzz keeps the variable axes intact, so Fraunces still responds to
  // optical sizing and weight after subsetting.
  const bytes = await subsetFont(original, TEXT, { targetFormat: 'woff2' });

  await writeFile(join(OUT_FONTS, file), bytes);
  total += bytes.length;
  before += original.length;
  const saved = (1 - bytes.length / original.length) * 100;
  console.log(
    `${file.padEnd(36)} ${(original.length / 1024).toFixed(1).padStart(6)} KiB -> ` +
      `${(bytes.length / 1024).toFixed(1).padStart(6)} KiB  (-${saved.toFixed(0)}%)`,
  );

  // Relative URL so Vite fingerprints the file and rewrites it against `base`.
  out.push(rule.replace(remote, `./assets/fonts/${file}`).trim(), '');
}

await writeFile(OUT_CSS, out.join('\n'), 'utf8');
console.log(`\nTotal ${(total / 1024).toFixed(1)} KiB -> src/fonts.css`);
