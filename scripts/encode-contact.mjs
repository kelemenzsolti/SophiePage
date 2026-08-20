/**
 * Generates the obfuscated payloads that `src/content/site.ts` stores for the
 * phone number and email address.
 *
 *   node scripts/encode-contact.mjs "+36 30 123 4567" "hello@example.com"
 *
 * Paste the printed payloads into CONTACT. Keep the key in sync with the one
 * declared there — decoding uses the same value.
 *
 * This only hides the details from scrapers that read the bundle or the DOM.
 * It is not encryption; see the note at the top of src/lib/contact.ts.
 */

const KEY = process.env.CONTACT_KEY || 'czs-contact-v1';

function encode(value, key) {
  const bytes = new TextEncoder().encode(value);
  const out = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    out[i] = bytes[i] ^ key.charCodeAt(i % key.length);
  }
  return Buffer.from(out).toString('base64');
}

/** Masks a phone as `+36 30 ••• ••••` — keeps the shape, drops the digits. */
function maskPhone(value) {
  const groups = value.trim().split(/\s+/);
  return groups
    .map((group, index) => (index < 2 ? group : '•'.repeat(group.length)))
    .join(' ');
}

/** Masks an email as `•••••••@gmail.com` — the domain is not harvestable alone. */
function maskEmail(value) {
  const [local, domain] = value.split('@');
  return `${'•'.repeat(Math.min(local.length, 9))}@${domain}`;
}

const values = process.argv.slice(2);

if (values.length === 0) {
  console.error(
    'Usage: node scripts/encode-contact.mjs "<phone>" "<email>"\n' +
      'Optional: CONTACT_KEY=<key> to override the default key.',
  );
  process.exit(1);
}

console.log(`key: ${JSON.stringify(KEY)}\n`);

for (const value of values) {
  const isEmail = value.includes('@');
  console.log(`${isEmail ? 'email' : 'phone'}: ${value}`);
  console.log(`  mask:    ${JSON.stringify(isEmail ? maskEmail(value) : maskPhone(value))}`);
  console.log(`  payload: ${JSON.stringify(encode(value, KEY))}\n`);
}
