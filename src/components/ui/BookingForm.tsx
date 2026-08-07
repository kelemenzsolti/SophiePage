import { useState, useEffect, type FormEvent } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { getCalApi } from '@calcom/embed-react';

const inputClassName =
  'w-full rounded-xl border border-subtle bg-cream px-4 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/40 focus:border-terracotta/40 focus:ring-2 focus:ring-terracotta/10';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// Összekötjük a kategóriákat a Cal.com útvonalaikkal
const calLinksMap: Record<string, string> = {
  'Egyéni tanácsadás (diák / fiatal)': 'zsolt-kelemen-brcxcl/30min',
  'Sportpszichológiai tanácsadás': 'zsolt-kelemen-brcxcl/secret',
  'Szülői konzultáció és nevelési támogatás': 'zsolt-kelemen-brcxcl/15min',
};

export function BookingForm() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  // Cal.com inicializálása
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', {
        styles: { branding: { brandColor: '#b85d41' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
          category: category || t.booking.form.notProvided,
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
      setCategory('');
      setMessage('');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  // Kiválasztott kategóriához tartozó Cal.com link meghatározása
  const currentCalLink = calLinksMap[category] || 'zsolt-kelemen-brcxcl/30min';

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <label htmlFor="booking-name" className="mb-1.5 block text-sm font-medium text-charcoal">
          {t.booking.form.nameLabel}
        </label>
        <input
          id="booking-name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={t.booking.form.namePlaceholder}
          className={inputClassName}
          disabled={status === 'submitting'}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-email" className="mb-1.5 block text-sm font-medium text-charcoal">
            {t.booking.form.emailLabel}
          </label>
          <input
            id="booking-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t.booking.form.emailPlaceholder}
            className={inputClassName}
            disabled={status === 'submitting'}
          />
        </div>
        <div>
          <label htmlFor="booking-phone" className="mb-1.5 block text-sm font-medium text-charcoal">
            {t.booking.form.phoneLabel}
            <span className="ml-1 font-normal text-charcoal/50">
              ({t.booking.form.optional})
            </span>
          </label>
          <input
            id="booking-phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder={t.booking.form.phonePlaceholder}
            className={inputClassName}
            disabled={status === 'submitting'}
          />
        </div>
      </div>

      <div>
        <label htmlFor="booking-category" className="mb-1.5 block text-sm font-medium text-charcoal">
          {t.booking.form.categoryLabel}
        </label>
        <select
          id="booking-category"
          required
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className={inputClassName}
          disabled={status === 'submitting'}
        >
          <option value="" disabled>
            {t.booking.form.categoryPlaceholder}
          </option>
          <option value={t.booking.form.categories.individual}>
            {t.booking.form.categories.individual}
          </option>
          <option value={t.booking.form.categories.sports}>
            {t.booking.form.categories.sports}
          </option>
          <option value={t.booking.form.categories.parenting}>
            {t.booking.form.categories.parenting}
          </option>
        </select>
      </div>

      <div>
        <label htmlFor="booking-message" className="mb-1.5 block text-sm font-medium text-charcoal">
          {t.booking.form.messageLabel}
        </label>
        <textarea
          id="booking-message"
          required
          rows={3}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={t.booking.form.messagePlaceholder}
          className={`${inputClassName} min-h-[100px] resize-y`}
          disabled={status === 'submitting'}
        />
      </div>

      {status === 'success' && (
        <p className="rounded-xl border border-olive/20 bg-olive/10 px-4 py-3 text-sm text-charcoal">
          {t.booking.form.success}
        </p>
      )}

      {status === 'error' && (
        <p className="rounded-xl border border-terracotta/20 bg-terracotta/10 px-4 py-3 text-sm text-charcoal">
          {t.booking.form.error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full px-6 py-3.5 text-center disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' ? t.booking.form.sending : t.booking.form.submit}
      </button>

      {/* Dinamikusan a kiválasztott kategória naptárát nyitja meg */}
      <button
        type="button"
        data-cal-link={currentCalLink}
        className="mt-2 w-full rounded-xl border border-terracotta/30 bg-white py-3 text-center text-sm font-medium text-terracotta transition-colors hover:bg-terracotta/5"
      >
        {category ? 'Időpont kiválasztása a naptárban (Valós időben)' : 'Kérlek előbb válassz kategóriát fent'}
      </button>
    </form>
  );
}