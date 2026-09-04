import { useBooking } from '../../context/BookingContext';
import type { ServiceCategory } from '../../content/site';
import { useTranslation } from '../../i18n/useTranslation';
import { cn } from '../../lib/cn';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';

export function Pricing() {
  const { t } = useTranslation();
  const { selectAndScroll } = useBooking();

  return (
    <Section id="pricing" tone="sand">
      <SectionHeading
        eyebrow={t.nav.pricing}
        title={t.pricing.title}
        subtitle={t.pricing.subtitle}
      />

      <div className="mt-16 grid items-start gap-6 lg:grid-cols-3 lg:gap-7">
        {t.pricing.items.map((item, index) => {
          const featured = item.featured;

          return (
            <Reveal
              key={item.title}
              delay={index * 0.08}
              as="article"
              className={cn(
                'relative flex h-full flex-col rounded-panel p-8 md:p-9',
                featured
                  ? 'bg-forest-deep text-paper shadow-lift lg:-mt-6 lg:pb-12 lg:pt-14'
                  : 'border border-ink/[0.07] bg-paper shadow-soft transition-[transform,box-shadow] duration-500 ease-editorial hover:-translate-y-1 hover:shadow-card',
              )}
            >
              {featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-terracotta px-4 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-paper shadow-soft">
                  {t.pricing.featuredLabel}
                </span>
              )}

              <h3
                className={cn(
                  'font-display text-display-sm font-medium text-balance',
                  featured ? 'text-paper' : 'text-forest-deep',
                )}
              >
                {item.title}
              </h3>

              <p
                className={cn(
                  'mt-4 text-sm leading-relaxed text-pretty',
                  featured ? 'text-paper/65' : 'text-ink/70',
                )}
              >
                {item.description}
              </p>

              {/* ---- Price block ---- */}
              <div
                className={cn(
                  // Wraps rather than breaking "15 000 Ft" across two lines
                  // when the card narrows to a single mobile column.
                  'mt-8 flex flex-wrap items-end justify-between gap-x-4 gap-y-4 border-t pt-7',
                  featured ? 'border-paper/15' : 'border-ink/10',
                )}
              >
                <div>
                  <p
                    className={cn(
                      'whitespace-nowrap font-display text-[2.5rem] font-medium leading-none tracking-tight',
                      featured ? 'text-paper' : 'text-forest-deep',
                    )}
                  >
                    {item.price}
                  </p>
                  <p
                    className={cn(
                      'mt-2 text-xs uppercase tracking-[0.14em]',
                      featured ? 'text-paper/60' : 'text-ink/65',
                    )}
                  >
                    {t.pricing.perSession}
                  </p>
                </div>

                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium',
                    featured
                      ? 'bg-paper/10 text-paper/75'
                      : 'bg-shell text-ink/70',
                  )}
                >
                  <Icon name="clock" className="h-3.5 w-3.5" />
                  <span className="sr-only">{t.pricing.durationLabel}: </span>
                  {item.duration}
                </span>
              </div>

              {/* ---- Included ---- */}
              <ul className="mt-7 flex-1 space-y-3.5">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Icon
                      name="check"
                      className={cn(
                        'mt-0.5 h-4 w-4 shrink-0',
                        featured ? 'text-terracotta-soft' : 'text-terracotta',
                      )}
                    />
                    <span className={featured ? 'text-paper/80' : 'text-ink/70'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => selectAndScroll(item.id as ServiceCategory)}
                className={cn(
                  'btn-lg mt-9 w-full',
                  featured
                    ? 'btn-accent'
                    : 'btn-outline hover:border-forest hover:bg-forest hover:text-paper',
                )}
              >
                {t.pricing.cta}
              </button>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.2}>
        <p className="mx-auto mt-14 max-w-3xl text-center text-sm leading-relaxed text-pretty text-ink/65">
          {t.pricing.note}
        </p>
      </Reveal>
    </Section>
  );
}
