import { CONTACT } from '../../content/site';
import { cn } from '../../lib/cn';
import { Icon } from './Icon';

export function getProtectedEmail(): string {
  const [user, domain, tld] = CONTACT.emailParts;
  return `${user}@${domain}.${tld}`;
}

export function getProtectedPhone(): string {
  return CONTACT.phoneParts.join('');
}

interface ProtectedContactLinkProps {
  type: 'email' | 'phone';
  label: string;
  actionLabel: string;
  className?: string;
  /** Renders for the dark footer ground rather than the light page ground. */
  inverted?: boolean;
}

/**
 * Shows a masked contact detail and only assembles the real `mailto:`/`tel:`
 * target when the visitor asks for it, keeping the address out of the markup
 * that address-harvesting crawlers read.
 */
export function ProtectedContactLink({
  type,
  label,
  actionLabel,
  className,
  inverted = false,
}: ProtectedContactLinkProps) {
  const [user, domain, tld] = CONTACT.emailParts;
  const [country, carrier] = CONTACT.phoneParts;

  const preview =
    type === 'email'
      ? `${user} [@] ${domain} [.] ${tld}`
      : `${country} ${carrier} XXX XXXX`;

  const reveal = () => {
    window.location.href =
      type === 'email'
        ? `mailto:${getProtectedEmail()}`
        : `tel:${getProtectedPhone()}`;
  };

  return (
    <div className={className}>
      <p
        className={cn(
          'text-xs font-semibold uppercase tracking-[0.14em]',
          inverted ? 'text-paper/60' : 'text-ink/65',
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          'mt-1.5 font-display text-lg',
          inverted ? 'text-paper/85' : 'text-forest',
        )}
      >
        {preview}
      </p>
      <button
        type="button"
        onClick={reveal}
        className={cn(
          'group mt-2 inline-flex items-center gap-1.5 text-sm font-medium transition-colors',
          inverted
            ? 'text-terracotta-soft hover:text-paper'
            : 'text-terracotta-deep hover:text-forest',
        )}
      >
        <Icon
          name={type === 'email' ? 'message' : 'phone'}
          className="h-4 w-4"
        />
        {actionLabel}
        <Icon
          name="arrowRight"
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </button>
    </div>
  );
}
