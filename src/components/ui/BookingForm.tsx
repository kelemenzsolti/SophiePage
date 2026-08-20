import { useEffect, useId, useState, type FormEvent } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { useBooking } from '../../context/BookingContext';
import { asset, CAL, LEGAL_DOCS, SERVICE_CATEGORIES } from '../../content/site';
import { useTranslation } from '../../i18n/useTranslation';
import { Icon } from './Icon';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function BookingForm() {
  const { t } = useTranslation();
  const { category, setCategory } = useBooking();
  const fieldId = useId();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');

  // Load the Cal.com embed once and theme it to match the page.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const cal = await getCalApi({ namespace: CAL.namespace });
      if (cancelled) return;

      cal('ui', {
        styles: { branding: { brandColor: CAL.brandColor } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // The submit button is disabled without consent, but a form can also be
    // submitted by pressing Enter in a text field — so re-check it here.
    if (!consent) return;

    // Simple honeypot: real visitors never fill a hidden field. Bots get the
    // success state so they have no signal to retry with.
    if (new FormData(event.currentTarget).get('botcheck')) {
      setStatus('success');
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: t.booking.form.subject,
          name,
          email,
          phone: phone || t.booking.form.notProvided,
          category: t.booking.form.categories[category],
          message,
          from_name: t.booking.form.fromName,
        }),
      });

      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) {
        throw new Error('Form submission failed');
      }

      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setConsent(false);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const pending = status === 'submitting';
  /** Neither the form nor the calendar may be used before consent is given. */
  const blocked = !consent;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from people, tempting to bots. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />

      <div>
        <label htmlFor={`${fieldId}-name`} className="field-label">
          {t.booking.form.nameLabel}
        </label>
        <input
          id={`${fieldId}-name`}
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={t.booking.form.namePlaceholder}
          className="field"
          disabled={pending}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${fieldId}-email`} className="field-label">
            {t.booking.form.emailLabel}
          </label>
          <input
            id={`${fieldId}-email`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t.booking.form.emailPlaceholder}
            className="field"
            disabled={pending}
          />
        </div>

        <div>
          <label htmlFor={`${fieldId}-phone`} className="field-label">
            {t.booking.form.phoneLabel}
            <span className="ml-1.5 font-normal normal-case tracking-normal text-ink/50">
              ({t.booking.form.optional})
            </span>
          </label>
          <input
            id={`${fieldId}-phone`}
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder={t.booking.form.phonePlaceholder}
            className="field"
            disabled={pending}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${fieldId}-category`} className="field-label">
          {t.booking.form.categoryLabel}
        </label>
        <select
          id={`${fieldId}-category`}
          required
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as (typeof SERVICE_CATEGORIES)[number])
          }
          className="field-select"
          disabled={pending}
        >
          {SERVICE_CATEGORIES.map((key) => (
            <option key={key} value={key}>
              {t.booking.form.categories[key]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${fieldId}-message`} className="field-label">
          {t.booking.form.messageLabel}
        </label>
        <textarea
          id={`${fieldId}-message`}
          required
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={t.booking.form.messagePlaceholder}
          className="field min-h-[7rem] resize-y"
          disabled={pending}
        />
      </div>

      {/* Consent gate — unlocks both the submit button and the calendar. */}
      <div>
        <div className="flex items-start gap-3">
          <input
            id={`${fieldId}-consent`}
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            aria-describedby={`${fieldId}-consent-hint`}
            className="field-check mt-0.5"
            disabled={pending}
          />
          <label
            htmlFor={`${fieldId}-consent`}
            className="cursor-pointer text-sm leading-relaxed text-ink/75"
          >
            {t.booking.form.consentPrefix}
            <a
              href={asset(LEGAL_DOCS.privacy)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-terracotta-deep underline underline-offset-2 transition-colors hover:text-terracotta"
            >
              {t.booking.form.consentLink}
            </a>
            {t.booking.form.consentSuffix}
          </label>
        </div>

        <p
          id={`${fieldId}-consent-hint`}
          className={`mt-2 pl-7 text-xs text-ink/55 transition-opacity duration-200 ${
            blocked ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {t.booking.form.consentHint}
        </p>
      </div>

      {/* Announced to screen readers as soon as the request resolves. */}
      <div aria-live="polite" role="status">
        {status === 'success' && (
          <p className="flex items-start gap-2.5 rounded-xl border border-forest/20 bg-forest/[0.06] px-4 py-3 text-sm text-forest-deep">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
            {t.booking.form.success}
          </p>
        )}
        {status === 'error' && (
          <p className="rounded-xl border border-terracotta/30 bg-terracotta/[0.08] px-4 py-3 text-sm text-terracotta-deep">
            {t.booking.form.error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending || blocked}
        className="btn-accent btn-lg w-full"
      >
        {pending ? t.booking.form.sending : t.booking.form.submit}
      </button>

      <div className="flex items-center gap-4 py-1">
        <span className="h-px flex-1 bg-ink/10" />
        <span className="font-display text-sm italic text-ink/65">
          {t.booking.form.or}
        </span>
        <span className="h-px flex-1 bg-ink/10" />
      </div>

      {/* Opens the Cal.com calendar for whichever service is selected above.
          Cal listens through a delegated click handler and reads these
          attributes at click time, so withholding them until consent is given
          keeps the calendar shut even if the disabled state is bypassed. */}
      <button
        type="button"
        disabled={blocked}
        {...(blocked
          ? {}
          : {
              'data-cal-namespace': CAL.namespace,
              'data-cal-link': CAL.links[category],
              'data-cal-config': `{"layout":"month_view"}`,
            })}
        className="btn-outline btn-lg w-full gap-2.5"
      >
        <Icon name="calendar" className="h-4 w-4" />
        {t.booking.form.chooseDate}
      </button>
    </form>
  );
}
