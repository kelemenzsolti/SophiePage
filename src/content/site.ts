/**
 * Non-translated site configuration: navigation targets, contact details,
 * social profiles and third-party scheduling links.
 *
 * Anything a visitor reads lives in `src/i18n/translations.ts`; this file only
 * holds the values that are identical in every language.
 */

/** Service categories. These ids key the booking form, the pricing cards and
 *  the Cal.com scheduling links, so they must stay in sync across all three. */
export const SERVICE_CATEGORIES = ['individual', 'sports', 'parenting'] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export const NAV_LINKS = [
  { key: 'about', href: '#about' },
  { key: 'services', href: '#services' },
  { key: 'pricing', href: '#pricing' },
  { key: 'testimonials', href: '#testimonials' },
  { key: 'contact', href: '#contact' },
] as const;

/** Section ids the navigation highlights while scrolling. */
export const SECTION_IDS = ['about', 'services', 'pricing', 'booking', 'testimonials'];

export type ContactChannel = 'phone' | 'email';

/**
 * Contact details, stored obfuscated so no literal address or number appears
 * in the bundle, the served HTML, or the DOM. They are decoded only inside the
 * click handler that reveals them — see `src/lib/contact.ts` for what this does
 * and does not protect against.
 *
 * Regenerate the payloads after changing any value:
 *   node scripts/encode-contact.mjs "<phone>" "<email>"
 *
 * TODO(launch): replace with Czárth Zsófia's real address and number — the
 * values below are development placeholders.
 */
export const CONTACT = {
  /** Must match the key the payloads were generated with. */
  key: 'czs-contact-v1',
  phone: {
    /** Shown before the visitor asks to see the real value. */
    mask: '+36 30 ••• ••••',
    payload: 'SElFDVRfTkZUUVQYRghR',
  },
  email: {
    mask: '•••••••••@gmail.com',
    payload: 'AAASXxcHQA4SDBJEFwFROhRAAgYCWgIMGQ==',
  },
} as const satisfies {
  key: string;
} & Record<ContactChannel, { mask: string; payload: string }>;

export const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://www.instagram.com/psychologysophie/' },
  { name: 'Facebook', href: 'https://www.facebook.com/csengezsofia.czarth.3' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/czarthcsengezsofia/' },
] as const;

/**
 * Cal.com embed configuration.
 *
 * TODO(launch): these event types belong to the developer's Cal.com account.
 * Point them at the practice's own account before going live.
 */
export const CAL = {
  namespace: 'booking',
  brandColor: '#b85c3c',
  links: {
    individual: 'zsofia-czarth-rohber/30min',
    sports: 'zsofia-czarth-rohber/secret',
    parenting: 'zsofia-czarth-rohber/15min',
  } satisfies Record<ServiceCategory, string>,
} as const;

/** Resolves an asset in `public/` against Vite's configured base path. */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`;
}

export const IMAGES = {
  portrait: 'assets/profile.jpg',
  forest: 'assets/herov2.jpg',
} as const;
