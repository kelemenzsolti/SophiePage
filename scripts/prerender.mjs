/**
 * Bakes the rendered page into `dist/index.html` after `vite build`.
 *
 * The app is client-rendered, so what Vite emits is a document whose body is an
 * empty `<div id="root">`. That costs twice over: Google has to execute the
 * bundle before it sees a single word of the copy, and a visitor sees nothing
 * until ~118 KB of JavaScript has downloaded, parsed and run — which is what put
 * FCP at 4.8 s and LCP at 5.2 s on a throttled connection.
 *
 * Rendering the same tree to a string here puts the real markup — headings, copy
 * and the hero <img> that is the LCP element — in the served HTML, so the page
 * paints from the document itself. React still boots normally on top; see the
 * note in `main.tsx` for why it re-renders rather than hydrates.
 *
 * Uses Vite's SSR module loader rather than a second bundle, so there is only
 * ever one build to keep in step.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HTML = join(ROOT, 'dist', 'index.html');
const MOUNT = '<div id="root"></div>';

const vite = await createServer({
  root: ROOT,
  logLevel: 'error',
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
  const body = render();

  const html = await readFile(HTML, 'utf8');
  if (!html.includes(MOUNT)) {
    throw new Error(`Could not find ${MOUNT} in dist/index.html — nothing was prerendered.`);
  }

  await writeFile(HTML, html.replace(MOUNT, `<div id="root">${body}</div>`), 'utf8');

  const kb = (n) => `${(n / 1024).toFixed(1)} KiB`;
  console.log(`Prerendered ${kb(body.length)} of markup into dist/index.html (${kb(html.length)} -> ${kb(html.length + body.length)})`);
} finally {
  await vite.close();
}
