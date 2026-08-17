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

/**
 * Contact details are stored in fragments and only assembled in the browser on
 * user interaction, which keeps them out of reach of naive address scrapers.
 *
 * TODO(launch): replace with Czárth Zsófia's real address and number — the
 * values below are development placeholders.
 */
export const CONTACT = {
  emailParts: ['zsolti.kelemen1999', 'gmail', 'com'],
  phoneParts: ['+36', '30', '123', '4567'],
} as const;

export const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://www.instagram.com/czarth.zsofia/' },
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
    individual: 'zsolt-kelemen-brcxcl/30min',
    sports: 'zsolt-kelemen-brcxcl/secret',
    parenting: 'zsolt-kelemen-brcxcl/15min',
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
