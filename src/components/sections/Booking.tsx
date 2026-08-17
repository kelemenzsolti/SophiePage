import { useTranslation } from '../../i18n/useTranslation';
import { BookingForm } from '../ui/BookingForm';
import { Icon, type IconName } from '../ui/Icon';
import { ProtectedContactLink } from '../ui/ProtectedContactLink';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';

const STEP_ICONS: IconName[] = ['message', 'calendar', 'spark'];

export function Booking() {
  const { t } = useTranslation();

  return (
    <Section id="booking" tone="shell">
      <SectionHeading
        eyebrow={t.booking.card.eyebrow}
        title={t.booking.title}
        subtitle={t.booking.subtitle}
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* ---- How it works ---- */}
        <div className="lg:col-span-5">
          <ol className="relative space-y-9">
            {/* The rail is drawn behind the markers to tie the steps together. */}
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-[1.4375rem] top-6 w-px bg-gradient-to-b from-terracotta/40 via-ink/10 to-transparent"
            />

            {t.booking.steps.map((step, index) => (
              <Reveal
                key={step.title}
                delay={index * 0.1}
                as="li"
                className="relative flex gap-5"
              >
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-terracotta/25 bg-paper text-terracotta-deep shadow-soft">
                  <Icon name={STEP_ICONS[index] ?? 'spark'} className="h-5 w-5" />
                </span>

                <div className="pt-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta-deep">
                    {step.label}
                  </p>
                  <h3 className="mt-2.5 font-display text-display-sm font-medium text-forest-deep">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-pretty text-ink/65">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.3} className="mt-10">
            <div className="surface p-6">
              <ProtectedContactLink
                type="phone"
                label={t.booking.card.phoneLabel}
                actionLabel={t.booking.card.phoneAction}
              />
            </div>
          </Reveal>
        </div>

        {/* ---- Enquiry form ---- */}
        <Reveal
          delay={0.12}
          direction="left"
          as="aside"
          className="lg:col-span-7"
        >
          <div id="booking-form" className="surface-panel p-7 md:p-10">
            <h3 className="font-display text-display-md font-medium text-balance text-forest-deep">
              {t.booking.card.title}
            </h3>
            <p className="mt-4 leading-relaxed text-pretty text-ink/65">
              {t.booking.card.description}
            </p>

            <div className="mt-9">
              <BookingForm />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
