import { IMAGES } from '../../content/site';
import { useTranslation } from '../../i18n/useTranslation';
import { Icon, type IconName } from '../ui/Icon';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

/** One icon per highlight, in the order the copy defines them. */
const HIGHLIGHT_ICONS: IconName[] = ['school', 'trophy', 'monitor'];

export function About() {
  const { t } = useTranslation();

  return (
    <Section id="about" tone="paper" className="overflow-hidden">
      {/* Ambient warmth behind the portrait, kept well below the text so it
          never eats into contrast. The section clips them: left to bleed, they
          widen the containing block that the fixed header measures itself
          against, which pushes the mobile menu button off screen. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgb(var(--c-ochre)/0.28),transparent_62%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 -left-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgb(var(--c-forest)/0.14),transparent_60%)] blur-2xl"
      />

      <div className="relative grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
        {/* ---- Type column ---- */}
        <div className="lg:col-span-7 lg:pr-8">
          <Reveal>
            <p className="eyebrow">{t.profile.eyebrow}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-7 font-display text-display-lg font-medium text-balance text-forest-deep">
              {t.profile.name}
            </h2>
            <p className="mt-4 font-display text-display-sm italic text-terracotta-deep">
              {t.profile.role}
            </p>
          </Reveal>

          <div className="prose-warm mt-8 max-w-measure">
            {t.profile.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 32)} delay={0.16 + index * 0.08} as="p">
                {paragraph}
              </Reveal>
            ))}
          </div>

          {/* The practice statement, lifted out of the body copy. */}
          <Reveal delay={0.32} className="mt-10">
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
            </blockquote>
          </Reveal>

          {/* Credentials read as a caption rule under the narrative. */}
          <Reveal delay={0.4}>
            <ul className="mt-12 grid gap-4 border-t border-ink/10 pt-8 sm:grid-cols-3">
              {t.profile.highlights.map((item, index) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon
                    name={HIGHLIGHT_ICONS[index] ?? 'spark'}
                    className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-terracotta"
                  />
                  <span className="text-sm leading-relaxed text-ink/65">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ---- Portrait column ---- */}
        <Reveal
          delay={0.18}
          direction="left"
          className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none"
        >
          <div>
            {/* Offset frame gives the portrait an editorial, printed feel. */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 -right-4 -top-4 rounded-[15rem_15rem_2.5rem_2.5rem] border border-terracotta/25 md:-bottom-6 md:-left-6 md:-right-6 md:-top-6"
            />

            <div className="relative overflow-hidden rounded-arch bg-sand shadow-lift">
              <Picture
                image={IMAGES.portrait}
                alt={t.profile.imageAlt}
                sizes="(min-width: 1024px) 500px, 384px"
                className="aspect-[3/4] w-full object-cover object-[center_22%]"
              />
              {/* Grounds the base of the portrait so it sits on the page. */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-forest-deep/45 to-transparent"
              />
            </div>

            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-ink/10 bg-paper px-5 py-2.5 shadow-card">
              <span className="font-display text-sm text-forest-deep">
                {t.profile.role}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
