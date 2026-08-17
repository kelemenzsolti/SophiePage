import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { CONTACT, type ContactChannel } from '../../content/site';
import { useTranslation } from '../../i18n/useTranslation';
import { cn } from '../../lib/cn';
import { decodeContact, mailtoHref, telHref } from '../../lib/contact';
import { Icon, type IconName } from './Icon';

type CopyState = 'idle' | 'copied' | 'failed';

const CHANNEL_ICON: Record<ContactChannel, IconName> = {
  phone: 'phone',
  email: 'mail',
};

interface ContactRevealProps {
  channel: ContactChannel;
  /** Renders for a dark ground (the footer) rather than the light page ground. */
  inverted?: boolean;
  className?: string;
}

/**
 * Shows a masked contact detail and only decodes the real value when a visitor
 * asks for it. Until then the address exists nowhere a scraper can read it —
 * not in the HTML, not in the bundle, not in the DOM.
 */
export function ContactReveal({
  channel,
  inverted = false,
  className,
}: ContactRevealProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<CopyState>('idle');

  const linkRef = useRef<HTMLAnchorElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hand keyboard users the revealed link rather than leaving focus on a
  // button that has just disappeared.
  useEffect(() => {
    if (value) linkRef.current?.focus({ preventScroll: true });
  }, [value]);

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

  const reveal = (event: MouseEvent<HTMLButtonElement>) => {
    // A real click — including one synthesised by assistive tech or by pressing
    // Enter on the focused button — is trusted. A script calling .click() is
    // not, so a headless scraper cannot help itself to the address.
    if (!event.isTrusted) return;
    setValue(decodeContact(CONTACT[channel].payload, CONTACT.key));
  };

  const copy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopyState('copied');
    } catch {
      // Clipboard access needs a secure context and can be blocked outright.
      // The link stays usable either way.
      setCopyState('failed');
    }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState('idle'), 2400);
  };

  const label = channel === 'phone' ? t.contact.phoneLabel : t.contact.emailLabel;
  const revealLabel =
    channel === 'phone' ? t.contact.revealPhone : t.contact.revealEmail;

  return (
    <div className={className}>
      <p
        className={cn(
          'flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]',
          inverted ? 'text-paper/55' : 'text-ink/65',
        )}
      >
        <Icon
          name={CHANNEL_ICON[channel]}
          className={cn(
            'h-4 w-4',
            inverted ? 'text-terracotta-soft' : 'text-terracotta',
          )}
        />
        {label}
      </p>

      {/* The swap from mask to real value is announced, so the reveal is not
          silent for screen reader users. */}
      <div aria-live="polite">
        {value ? (
          <a
            ref={linkRef}
            href={channel === 'phone' ? telHref(value) : mailtoHref(value)}
            rel="nofollow noreferrer"
            className={cn(
              'mt-1.5 inline-block font-display text-lg underline-offset-4 transition-colors hover:underline',
              inverted
                ? 'text-paper hover:text-terracotta-soft'
                : 'text-forest hover:text-terracotta-deep',
            )}
          >
            {value}
          </a>
        ) : (
          <p
            className={cn(
              'mt-1.5 select-none font-display text-lg',
              inverted ? 'text-paper/55' : 'text-ink/50',
            )}
          >
            {CONTACT[channel].mask}
          </p>
        )}
      </div>

      {value ? (
        <button
          type="button"
          onClick={copy}
          className={cn(
            'mt-2 inline-flex items-center gap-1.5 text-sm font-medium transition-colors',
            inverted
              ? 'text-terracotta-soft hover:text-paper'
              : 'text-terracotta-deep hover:text-forest',
          )}
        >
          <Icon
            name={copyState === 'copied' ? 'check' : 'copy'}
            className="h-4 w-4"
          />
          {copyState === 'copied'
            ? t.contact.copied
            : copyState === 'failed'
              ? t.contact.copyFailed
              : t.contact.copy}
        </button>
      ) : (
        <button
          type="button"
          onClick={reveal}
          className={cn(
            'mt-2 inline-flex items-center gap-1.5 text-sm font-medium transition-colors',
            inverted
              ? 'text-terracotta-soft hover:text-paper'
              : 'text-terracotta-deep hover:text-forest',
          )}
        >
          <Icon name="eye" className="h-4 w-4" />
          {revealLabel}
        </button>
      )}
    </div>
  );
}

/**
 * Explains why the details are masked. It belongs to a group of reveals rather
 * than to each one, so callers render it once beneath the set.
 */
export function ContactRevealNote({
  inverted = false,
  className,
}: {
  inverted?: boolean;
  className?: string;
}) {
  const { t } = useTranslation();

  return (
    <p
      className={cn(
        'text-xs',
        inverted ? 'text-paper/55' : 'text-ink/65',
        className,
      )}
    >
      {t.contact.hiddenNote}
    </p>
  );
}
