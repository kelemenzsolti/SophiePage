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
grounds, `/55` on the dark forest grounds). Placeholders and parenthetical hints sit
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

## Project structure

```
scripts/
└── encode-contact.mjs   regenerates the obfuscated contact payloads

src/
├── components/
│   ├── layout/     Navbar, Footer, LanguageSwitcher
│   ├── sections/   Hero, About, Services, Pricing, Booking, Testimonials
│   └── ui/         Section, Reveal, Icon, BookingForm, ContactReveal
├── content/        site.ts — nav, contact, social, Cal.com config, asset paths
├── context/        BookingContext — shares the selected service across sections
├── hooks/          useScrolled, useActiveSection, useDismiss, useLockBodyScroll
├── i18n/           translations.ts, LanguageContext, useTranslation
├── lib/            cn (class join), motion (easing + reveal variants),
│                   contact (obfuscation codec)
└── index.css       design tokens + component layer
```

Anything a visitor reads lives in `src/i18n/translations.ts`. `src/content/site.ts`
holds only values that are identical in every language.

## Assets

```
public/assets/profile.jpg   portrait — hero
public/assets/herov2.jpg    forest scene — testimonials backdrop
```

`public/assets/hero.jpg` and `hero.png` are left over from an earlier design and are
no longer referenced.
