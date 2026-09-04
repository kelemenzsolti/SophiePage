/**
 * Build-time constants shared by the app and by `vite.config.ts`.
 *
 * Deliberately free of imports and of `import.meta.env`, because Vite evaluates
 * this file while loading its own config, before any of that exists. Anything
 * added here must stay just as inert.
 */

/**
 * Canonical origin, no trailing slash.
 *
 * The single place the domain is written down. `vite.config.ts` substitutes it
 * into `%SITE_URL%` in `index.html` and generates `robots.txt`, `sitemap.xml`
 * and `CNAME` from it, so changing the domain is a one-line edit here.
 */
export const SITE_URL = 'https://czarthzsofia.hu';

/**
 * How wide the hero renders — it is full-bleed, so it is always the viewport.
 *
 * Shared between `<Hero>` and the `<link rel="preload">` that `vite.config.ts`
 * injects. The preload only collapses into the same request as the `<picture>`
 * if the `srcset` and `sizes` match exactly; keeping one copy of `sizes` is what
 * stops the two drifting apart and quietly downloading the hero twice.
 */
export const HERO_SIZES = '100vw';

/** How wide the portrait renders: capped by `max-w-sm`, then a 5/12 grid column. */
export const PORTRAIT_SIZES = '(min-width: 1024px) 500px, 384px';
