import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { IMAGES } from './src/content/images'
import { HERO_SIZES, SITE_URL } from './src/site.config'

const base = '/'

/** ISO date for the sitemap's <lastmod>, stamped at build time. */
const buildDate = new Date().toISOString().slice(0, 10)

/**
 * Derives everything that has to agree with `SITE_URL` or with the image
 * manifest, so neither is written down twice.
 *
 * Before this, the domain appeared in `index.html`, `robots.txt`, `sitemap.xml`
 * and `CNAME`, and the hero's six `srcset` entries appeared both in `<Picture>`
 * and in a hand-copied `<link rel="preload">`. Nothing enforced either set —
 * a stale preload silently costs a second download of the LCP image, and a
 * stale canonical points Google at the wrong origin.
 */
function siteMetadata(): Plugin {
  const hero = IMAGES.forest
  const srcset = hero.widths
    .map((w) => `${base}assets/img/${hero.name}-${w}.avif ${w}w`)
    .join(', ')

  // Must mirror the AVIF <source> in <Picture> exactly, or the preload and the
  // <picture> resolve to two different URLs and the hero downloads twice.
  const preload = [
    '<link',
    '      rel="preload"',
    '      as="image"',
    '      type="image/avif"',
    '      fetchpriority="high"',
    `      imagesrcset="${srcset}"`,
    `      imagesizes="${HERO_SIZES}"`,
    '    />',
  ].join('\n      ')

  return {
    name: 'site-metadata',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html
          .replaceAll('%SITE_URL%', SITE_URL)
          .replace('<!--%LCP_PRELOAD%-->', preload)
      },
    },
    generateBundle() {
      const emit = (fileName: string, source: string) =>
        this.emitFile({ type: 'asset', fileName, source })

      emit(
        'robots.txt',
        [
          `# ${SITE_URL}/`,
          'User-agent: *',
          'Allow: /',
          '',
          '# The legal PDFs are linked from the footer and the booking consent. They are',
          '# public documents, but they are not what anyone searches for — keeping them',
          '# out of the index stops them outranking the page itself.',
          'Disallow: /assets/Adatvedelem_CzarthZsofia.pdf',
          'Disallow: /assets/ASZF_CzarthZsofia.pdf',
          '',
          `Sitemap: ${SITE_URL}/sitemap.xml`,
          '',
        ].join('\n'),
      )

      // Single-page site: one URL. The in-page sections (#about, #services, …)
      // are fragments, not documents, and Google ignores them in a sitemap.
      emit(
        'sitemap.xml',
        [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          '  <url>',
          `    <loc>${SITE_URL}/</loc>`,
          `    <lastmod>${buildDate}</lastmod>`,
          '    <changefreq>monthly</changefreq>',
          '    <priority>1.0</priority>',
          '  </url>',
          '</urlset>',
          '',
        ].join('\n'),
      )

      // GitHub Pages reads the custom domain from this file in the artifact.
      emit('CNAME', `${SITE_URL.replace(/^https?:\/\//, '')}\n`)
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), siteMetadata()],
  build: {
    // Vite inlines assets under 4 KiB as base64 data URIs. That is the wrong
    // trade for fonts: the smallest subset (inter latin-ext, 2.4 KiB) would be
    // baked into the render-blocking stylesheet, growing it by a third of its
    // gzipped size to save one request for a file `font-display: swap` means
    // nobody is waiting on. Keep every font a separate file.
    assetsInlineLimit: (filePath) => (filePath.endsWith('.woff2') ? false : undefined),
  },
})
