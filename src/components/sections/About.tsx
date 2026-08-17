import { useTranslation } from '../../i18n/useTranslation';
import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';

export function About() {
  const { t } = useTranslation();

  return (
    <Section id="about" tone="shell">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ---- Identity column ---- */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-height)+3rem)]">
            <Reveal>
              <p className="eyebrow">{t.profile.eyebrow}</p>
              <h2 className="mt-6 font-display text-display-lg font-medium text-balance text-forest-deep">
                {t.profile.name}
              </h2>
              <p className="mt-4 font-display text-display-sm italic text-terracotta-deep">
                {t.profile.role}
              </p>
            </Reveal>
          </div>
        </div>

        {/* ---- Narrative column ---- */}
        <div className="lg:col-span-7">
          <div className="prose-warm max-w-measure">
            {t.profile.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 32)} delay={index * 0.08} as="p">
                {paragraph}
              </Reveal>
            ))}
          </div>

          {/* The practice statement, lifted out of the body copy. */}
          <Reveal delay={0.16} className="mt-12">
            <blockquote className="relative border-l-2 border-terracotta pl-7 md:pl-9">
              <span
                aria-hidden="true"
                className="absolute -left-[0.4em] -top-8 select-none font-display text-[6rem] leading-none text-terracotta/15"
              >
                &ldquo;
              </span>
              <p className="relative font-display text-quote font-medium text-balance text-forest-deep">
                {t.profile.statement}
              </p>
              <footer className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-ink/65">
                {t.profile.name}
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
