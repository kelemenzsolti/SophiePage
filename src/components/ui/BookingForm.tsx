import { useState, type FormEvent } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

const inputClassName =
  'w-full rounded-xl border border-subtle bg-cream px-4 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/40 focus:border-terracotta/40 focus:ring-2 focus:ring-terracotta/10';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function BookingForm() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

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
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

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

      <div>
        <label htmlFor="booking-message" className="mb-1.5 block text-sm font-medium text-charcoal">
          {t.booking.form.messageLabel}
        </label>
        <textarea
          id="booking-message"
          required
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={t.booking.form.messagePlaceholder}
          className={`${inputClassName} resize-none`}
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
        className="btn-primary w-full px-6 py-3.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' ? t.booking.form.sending : t.booking.form.submit}
      </button>
    </form>
  );
}
