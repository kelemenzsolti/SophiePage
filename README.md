# Czárth Zsófia – Psychologist Website

Bilingual single-page site for a school- and sport-psychology practice, built with
**React 19**, **Vite**, **TypeScript**, **Tailwind CSS** and **Framer Motion**.

## Design system

The visual language is *warm editorial*: a cream paper ground, deep forest ink,
a terracotta accent, large Fraunces display type and generous whitespace.

Every colour, shadow, radius and texture is a CSS custom property declared in
`src/index.css` and surfaced to Tailwind through `tailwind.config.js`. Colours are
stored as raw RGB channels so Tailwind's opacity modifiers (`text-ink/70`) keep
working. To re-skin the site, change the tokens — not the components.

| Token group | Where |
| --- | --- |
| Colour, elevation, radii, texture | `:root` in `src/index.css` |
| Type scale (fluid `clamp()` steps) | `theme.extend.fontSize` in `tailwind.config.js` |
| Reusable classes (`.btn-*`, `.field`, `.surface-*`, `.eyebrow`) | `@layer components` in `src/index.css` |

Muted text tints are held at or above WCAG AA contrast (roughly `/65` on the light
grounds, `/55` on the dark forest grounds). `--c-terracotta` is constrained further:
it carries paper-coloured text on `.btn-accent` and the pricing badge, so it has to
clear 4.5:1 against `--c-paper` on its own. It sits at 4.76:1 — **lightening it
breaks WCAG AA for both.** Placeholders and parenthetical hints sit
below that deliberately — every field also carries a visible `<label>`.

## Features

- Hungarian (default) and English, chosen via React context; the selection is stored
  in `localStorage` and otherwise inferred from the browser's language
- Scroll-spy navigation, a full-screen mobile menu with focus return and scroll lock
- Booking enquiry form (Web3Forms) with a honeypot, plus a Cal.com scheduling embed
- Choosing a pricing plan pre-selects the matching service in the booking form
- Motion collapses to plain fades under `prefers-reduced-motion`
- Skip link, keyboard-operable testimonial carousel, live-region form status
- Schema.org `Psychologist` JSON-LD and Open Graph metadata

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run preview
```

## Configuration

Copy `.env.example` to `.env` and set your Web3Forms key:

```
VITE_WEB3FORMS_ACCESS_KEY=...
```

Two placeholders in `src/content/site.ts` must be replaced before launch — both are
marked `TODO(launch)`:

- `CONTACT` — the phone number and email address are development stand-ins
- `CAL.links` — the Cal.com event types point at the developer's account

### Changing the phone number or email

The details are stored obfuscated, so they cannot be edited by hand. Regenerate
the payloads and paste them into `CONTACT`:

```bash
node scripts/encode-contact.mjs "+36 30 123 4567" "hello@example.com"
```

The script also prints the masked form shown before a visitor reveals the value.
Keep `CONTACT.key` in sync with the key the payloads were generated with
(override it with `CONTACT_KEY=...` if you want a different one).

## Contact protection

Phone numbers and email addresses published in plain HTML get harvested. This
site keeps them out of reach of the scrapers that actually do that work:

- No literal address or number appears in the served HTML, the JavaScript bundle,
  or the DOM. Values are XOR-obfuscated at rest (`src/lib/contact.ts`).
- Decoding happens inside the click handler, never during render — so a crawler
  that renders the page and reads the DOM still sees only `+36 30 ••• ••••`.
- The handler ignores untrusted events, so a script calling `.click()` on the
  reveal button gets nothing. Real clicks — including keyboard activation and
  assistive tech — are trusted and work normally.
- Revealed links carry `rel="nofollow"`.

**What this is not.** It is not encryption. The key ships with the page, so
anyone willing to read `src/lib/contact.ts` can recover the address; the point is
to raise the cost above what bulk harvesting is willing to pay. The only way to
keep an address genuinely private is to never send it to the browser — which is
what the booking form already does, by posting to Web3Forms rather than exposing
an inbox. If spam ever becomes a real problem, remove `CONTACT` entirely and let
the form be the only channel.

## SEO

**The domain is written down once**, as `SITE_URL` in `src/site.config.ts`. The
`site-metadata` plugin in `vite.config.ts` substitutes it into every `%SITE_URL%`
in `index.html` and generates `robots.txt`, `sitemap.xml` and `CNAME` from it at
build time. Changing domain is a one-line edit.

| Concern | Where |
| --- | --- |
| The domain | `SITE_URL` in `src/site.config.ts` — the only copy |
| Canonical URL, robots directives | `<head>` of `index.html`, via `%SITE_URL%` |
| Open Graph / Twitter cards | `<head>` — absolute URLs, crawlers reject relative ones |
| Structured data | `<head>` JSON-LD `@graph`: WebSite, WebPage, ImageObject, Person, Psychologist |
| `robots.txt`, `sitemap.xml`, `CNAME` | generated into `dist/` by `vite.config.ts` |

The hero's `<link rel="preload">` is generated by the same plugin, from the same
image manifest `<Picture>` renders from. That pairing is load-bearing: the preload
only collapses into the same request as the `<picture>` if the `srcset` and `sizes`
match exactly, and a hand-copied list that drifts costs a second download of the
LCP image with nothing to catch it.

### Prerendering

`vite build` emits a document whose body is an empty `<div id="root">`, so a crawler
has to execute 118 KiB of JavaScript before it sees a word of the copy.
`scripts/prerender.mjs` renders the same tree with `react-dom/server` and bakes the
markup into `dist/index.html`, putting every heading, paragraph and price in the served
HTML. React still boots on top and replaces the tree — see the comment in `main.tsx`
for why it renders rather than hydrates.

Measured cost: **+300 ms FCP, −70 ms TBT, −1 Lighthouse point** (the extra ~8 KiB of
gzipped HTML is on the critical path, and framer-motion renders the copy at `opacity: 0`
so the extra markup buys no earlier *visible* paint). Kept because reliable indexing on
a brand-new domain is worth more than one synthetic point, and non-Google crawlers are
far weaker at JavaScript. To drop it, remove `&& node scripts/prerender.mjs` from the
build script.

### Deliberately not in the structured data

`telephone` and `email`. Both are obfuscated in `site.ts` to keep them from scrapers,
and both are still `TODO(launch)` placeholders. Add them to the `Psychologist` node in
`index.html` once they are real — a wrong number in structured data is worse than none.

## Project structure

```
assets-src/              camera originals — never deployed, input to `npm run images`

scripts/
├── build-images.mjs     assets-src/ -> public/assets/img/ responsive derivatives
├── fetch-fonts.mjs      vendors + subsets Fraunces and Inter into src/assets/fonts/
├── prerender.mjs        bakes the rendered page into dist/index.html after build
└── encode-contact.mjs   regenerates the obfuscated contact payloads

src/
├── assets/fonts/   self-hosted woff2 (generated — see `npm run fonts`)
├── components/
│   ├── layout/     Navbar, Footer, LanguageSwitcher
│   ├── sections/   Hero, About, Services, Pricing, Booking, Testimonials
│   └── ui/         Section, Reveal, Icon, Picture, BookingForm, ContactReveal
├── content/        site.ts — nav, contact, social, Cal.com config
│                   images.ts — generated image manifest (npm run images)
├── context/        BookingContext — shares the selected service across sections
├── hooks/          useScrolled, useActiveSection, useDismiss, useLockBodyScroll,
│                   useNearViewport
├── i18n/           translations.ts, LanguageContext, useTranslation
├── lib/            cn (class join), motion (easing + reveal variants),
│                   contact (obfuscation codec)
├── site.config.ts  SITE_URL + image `sizes`; shared with vite.config.ts
├── entry-server.tsx  render entry used by the prerender step
├── fonts.css       generated @font-face rules
└── index.css       design tokens + component layer
```

Anything a visitor reads lives in `src/i18n/translations.ts`. `src/content/site.ts`
holds only values that are identical in every language.

## Assets

Full-resolution originals live in `assets-src/` and are **not** deployed. What ships
is generated from them:

```
assets-src/herov2.jpg    5399x3648 forest scene  ->  public/assets/img/hero-*
assets-src/profile.jpg   3648x5472 portrait      ->  public/assets/img/portrait-*
assets-src/hero.jpg      leftovers from an earlier design, unreferenced
assets-src/hero.png
```

```bash
npm run images   # rebuild public/assets/img/ after changing anything in assets-src/
npm run fonts    # re-vendor Fraunces + Inter from Google Fonts
```

Both commands write files that are **committed to the repo**, so the Pages build stays
a plain `vite build` with no image or font toolchain in CI. `sharp` is only needed to
run `npm run images` locally.

`scripts/build-images.mjs` writes `src/content/images.ts` alongside the files it
generates, so the widths the app renders and the widths that exist on disk are the
same list. A width in a `srcset` with no file behind it 404s, and browsers swallow
that silently — hence generating it rather than maintaining two copies.

### Why the originals are not served

Serving them cost 5.3 MB on first paint and a Lighthouse performance score of 48. Each
image is now emitted as AVIF and WebP across six widths plus one JPEG fallback, picked
per visitor through `<Picture>`'s `srcset`/`sizes`. A 1920px desktop downloads 148 KiB of
hero instead of 2.8 MB.

### Fonts

Fraunces and Inter are self-hosted rather than linked from `fonts.googleapis.com`. The
link version was a render-blocking stylesheet on a third origin; the vendored version is
folded into the app's own CSS, so nothing extra blocks the first paint and no visitor IP
reaches Google. Only the `latin` and `latin-ext` subsets are kept — `latin-ext` is what
carries Hungarian ő and ű.

`npm run fonts` also **subsets each file to the characters the site actually renders**,
read out of `translations.ts` and `site.ts` at build time. Google's stock subsets carry
~700 glyphs each and cost 403 KiB; the site uses 159 distinct characters and costs 154 KiB.
That was worth 8 Lighthouse points on its own. Because the character set is derived from
the source rather than hard-coded, adding copy cannot silently outrun the fonts — but the
fonts do not regenerate on their own, so **re-run `npm run fonts` after adding a language
or an unusual character**. `scripts/fetch-fonts.mjs` also carries a floor of ASCII plus
Hungarian and common accents for strings built at runtime.
