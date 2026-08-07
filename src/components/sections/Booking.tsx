import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { BookingForm } from '../ui/BookingForm';
//import { ProtectedContactLink } from '../ui/ProtectedContactLink';
import { Section, SectionHeader } from '../ui/Section';

const stepIcons = [
  (
    <svg
      key="message"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m3.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H19.5m-1.5 8.25H6.75A2.25 2.25 0 014.5 15.75v-7.5A2.25 2.25 0 016.75 6h10.5a2.25 2.25 0 012.25 2.25v7.5A2.25 2.25 0 0117.25 18H18z"
      />
    </svg>
  ),
  (
    <svg
      key="calendar"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M4.5 6.75h15A2.25 2.25 0 0121.75 9v9.75A2.25 2.25 0 0119.5 21h-15a2.25 2.25 0 01-2.25-2.25V9A2.25 2.25 0 014.5 6.75z"
      />
    </svg>
  ),
  (
    <svg
      key="session"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75l2.25 2.25L15 9.75m6 2.25a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
];

export function Booking() {
  const { t } = useTranslation();

  return (
    <Section id="booking" className="bg-gradient-to-b from-cream to-forest/5">
      <SectionHeader
        title={t.booking.title}
        subtitle={t.booking.subtitle}
      />

      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.95fr]">
        <div className="grid gap-5">
          {t.booking.steps.map((step, index) => (
            <motion.article
              key={step.title}
              className="card-feature"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta">
                  {stepIcons[index]}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                      {step.label}
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-2xl font-medium text-dark-slate">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-dark-slate/70">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.aside
          className="card-panel p-8 md:p-10"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-terracotta">
            {t.booking.card.eyebrow}
          </p>
          <h3 className="mt-4 font-serif text-3xl font-medium text-dark-slate">
            {t.booking.card.title}
          </h3>
          <p className="mt-4 leading-relaxed text-dark-slate/70">
            {t.booking.card.description}
          </p>

          <BookingForm />

          {/*<div className="mt-6 rounded-2xl border border-subtle bg-cream/70 p-4 text-sm text-dark-slate/75">
            <ProtectedContactLink
              type="phone"
              label={t.booking.card.phoneLabel}
              actionLabel={t.booking.card.phoneAction}
            />
          </div>*/}
        </motion.aside>
      </div>
    </Section>
  );
}