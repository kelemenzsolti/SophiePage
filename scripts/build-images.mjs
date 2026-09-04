/**
 * Generates the responsive image derivatives the site actually ships.
 *
 * The originals in `assets-src/` are camera-resolution (5399x3648 and up) and
 * weigh ~5 MB together. Nothing in `assets-src/` is deployed; this script is the
 * only bridge between it and `public/assets/img/`, whose output IS committed so
 * the Pages build stays a plain `vite build` with no image toolchain in CI.
 *
 * Re-run with `npm run images` after replacing anything in `assets-src/`.
 */
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'assets-src');
const OUT = join(ROOT, 'public', 'assets', 'img');

/**
 * `widths` are intrinsic pixel widths for the `srcset`. `fallbackWidth` is the
 * single JPEG a browser without AVIF/WebP gets, so it is sized for a mid-range
 * display rather than the largest one.
 *
 * Quality is tuned per image: the hero sits under two opaque scrims and is
 * never read for detail, so it tolerates far more compression than the portrait,
 * which is the one photograph a visitor actually looks at.
 */
const TARGETS = [
  {
    src: 'herov2.jpg',
    name: 'hero',
    widths: [640, 960, 1280, 1600, 1920, 2560],
    fallbackWidth: 1600,
    quality: { avif: 42, webp: 58, jpeg: 68 },
  },
  {
    src: 'profile.jpg',
    name: 'portrait',
    widths: [384, 512, 768, 1024, 1536],
    fallbackWidth: 768,
    quality: { avif: 50, webp: 68, jpeg: 78 },
  },
];

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const manifest = {};

for (const target of TARGETS) {
  const input = join(SRC, target.src);
  const { width: srcWidth, height: srcHeight } = await sharp(input).metadata();

  // Never upscale: a `srcset` entry wider than the original is pure bytes for
  // no extra detail.
  const widths = target.widths.filter((w) => w <= srcWidth);
  const aspect = srcHeight / srcWidth;

  console.log(`\n${target.src}  ${srcWidth}x${srcHeight}`);

  for (const width of widths) {
    const pipeline = sharp(input).resize({ width, withoutEnlargement: true });

    const avif = await pipeline
      .clone()
      .avif({ quality: target.quality.avif, effort: 6 })
      .toBuffer();
    await writeFile(join(OUT, `${target.name}-${width}.avif`), avif);

    const webp = await pipeline
      .clone()
      .webp({ quality: target.quality.webp, effort: 6 })
      .toBuffer();
    await writeFile(join(OUT, `${target.name}-${width}.webp`), webp);

    console.log(`  ${width}w  avif ${kb(avif.length)}  webp ${kb(webp.length)}`);
  }

  // Single progressive JPEG for browsers with neither modern format.
  const fallbackWidth = Math.min(target.fallbackWidth, srcWidth);
  const jpeg = await sharp(input)
    .resize({ width: fallbackWidth, withoutEnlargement: true })
    .jpeg({ quality: target.quality.jpeg, progressive: true, mozjpeg: true })
    .toBuffer();
  await writeFile(join(OUT, `${target.name}.jpg`), jpeg);
  console.log(`  fallback ${fallbackWidth}w jpeg ${kb(jpeg.length)}`);

  manifest[target.name] = {
    widths,
    fallbackWidth,
    // Intrinsic size of the fallback, used for the `width`/`height` attributes
    // so the box is reserved before the bytes arrive.
    width: fallbackWidth,
    height: Math.round(fallbackWidth * aspect),
  };
}

const total = (await readdir(OUT, { withFileTypes: true })).length;
console.log(`\nWrote ${total} files to public/assets/img`);
console.log(JSON.stringify(manifest, null, 2));
