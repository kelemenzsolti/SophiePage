/**
 * Reversible obfuscation for contact details.
 *
 * The goal is narrow and worth stating plainly: keep a literal phone number or
 * email address out of the shipped JavaScript, out of the served HTML, and out
 * of the DOM until a visitor actively asks for it. That defeats the scrapers
 * that matter in practice — the ones that fetch a page (or a bundle) and run a
 * regex over it, and the ones that render a page and read the DOM.
 *
 * It is NOT encryption. The key travels with the payload, so anyone who reads
 * this file can recover the address. That is unavoidable for anything the
 * browser must be able to display. The only way to keep an address genuinely
 * private is to never send it to the client — which is what the booking form
 * already does, by posting to Web3Forms instead of exposing an inbox.
 */

/** Repeating-key XOR. Symmetric: the same call encodes and decodes. */
function xorBytes(bytes: Uint8Array, key: string): Uint8Array {
  const out = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    out[i] = bytes[i] ^ key.charCodeAt(i % key.length);
  }
  return out;
}

/** Encodes a value to the opaque payload stored in `site.ts`. */
export function encodeContact(value: string, key: string): string {
  const xored = xorBytes(new TextEncoder().encode(value), key);
  let binary = '';
  for (const byte of xored) binary += String.fromCharCode(byte);
  return btoa(binary);
}

/**
 * Recovers the original value. Call this only from an event handler — calling
 * it during render would put the address back in the DOM on page load and undo
 * the whole point.
 */
export function decodeContact(payload: string, key: string): string {
  const binary = atob(payload);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(xorBytes(bytes, key));
}

/** Builds the `tel:` target, stripping the spacing used for display. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export function mailtoHref(email: string): string {
  return `mailto:${email}`;
}
