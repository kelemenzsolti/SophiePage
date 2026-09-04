import { useTranslation } from '../../i18n/useTranslation';
import { Icon, type IconName } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';

/** One icon per service, in the order the copy defines them. */
const SERVICE_ICONS: IconName[] = ['school', 'trophy', 'compass', 'family'];

export function Services() {
  const { t } = useTranslation();

  return (
    // The one dark band on the page. Between the paper `about` above and the
    // sand `pricing` below it breaks up a run of five near-identical warm
    // grounds, and it sits far enough from the forest footer not to pair with
    // it. `Section`'s `forest` tone and `SectionHeading`'s `inverted` flag both
    // exist for exactly this.
    <Section id="services" tone="forest">
      <SectionHeading
        eyebrow={t.nav.services}
        title={t.services.title}
        subtitle={t.services.subtitle}
        inverted
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:gap-7">
        {t.services.items.map((item, index) => (
          <Reveal
            key={item.title}
            delay={index * 0.08}
            as="article"
            className="surface-interactive-dark group flex flex-col p-8 md:p-9"
          >
            <div className="flex items-start justify-between gap-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta-soft/15 text-terracotta-soft transition-colors duration-500 group-hover:bg-terracotta group-hover:text-paper">
                <Icon name={SERVICE_ICONS[index] ?? 'spark'} className="h-6 w-6" />
              </span>
              <span
                aria-hidden="true"
                className="font-display text-2xl text-paper/20 transition-colors duration-500 group-hover:text-terracotta-soft/60"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <h3 className="mt-7 font-display text-display-sm font-medium text-balance text-paper">
              {item.title}
            </h3>
            <p className="mt-4 leading-relaxed text-pretty text-paper/70">
              {item.description}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
