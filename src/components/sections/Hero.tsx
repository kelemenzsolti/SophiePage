import { asset, IMAGES } from '../../content/site';
import { useTranslation } from '../../i18n/useTranslation';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';

const HIGHLIGHT_ICONS = ['school', 'trophy', 'monitor'] as const;

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative grain overflow-hidden bg-paper pb-20 pt-[calc(var(--nav-height)+3rem)] md:pb-28 md:pt-[calc(var(--nav-height)+5rem)]">
      {/* Ambient warmth behind the portrait, kept well below the text so it
          never eats into contrast. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgb(var(--c-ochre)/0.28),transparent_62%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 -left-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgb(var(--c-forest)/0.14),transparent_60%)] blur-2xl"
      />

      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---- Type column ---- */}
          <div className="lg:col-span-7 lg:pr-8">
            <Reveal immediate>
              <p className="eyebrow">{t.hero.eyebrow}</p>
            </Reveal>

            <Reveal immediate delay={0.08}>
              <h1 className="mt-7 font-display text-display-xl font-medium text-balance text-forest-deep">
                {t.hero.headline}
              </h1>
            </Reveal>

            <Reveal immediate delay={0.16}>
              <p className="mt-7 max-w-measure text-lead text-pretty text-ink/70">
                {t.hero.subheadline}
              </p>
            </Reveal>

            <Reveal immediate delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#booking" className="btn-accent btn-lg">
                  {t.hero.cta}
                  <Icon name="arrowRight" className="h-4 w-4" />
                </a>
                <a href="#services" className="btn-outline btn-lg">
                  {t.nav.services}
                </a>
              </div>
            </Reveal>

            {/* Credentials read as a caption rule under the headline block. */}
            <Reveal immediate delay={0.32}>
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
            immediate
            delay={0.18}
            direction="left"
            className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none"
          >
            {/* Offset frame gives the portrait an editorial, printed feel. */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 -right-4 -top-4 rounded-[15rem_15rem_2.5rem_2.5rem] border border-terracotta/25 md:-bottom-6 md:-left-6 md:-right-6 md:-top-6"
            />

            <div className="relative overflow-hidden rounded-arch bg-sand shadow-lift">
              <img
                src={asset(IMAGES.portrait)}
                alt={t.hero.imageAlt}
                width={1216}
                height={1621}
                loading="eager"
                fetchPriority="high"
                decoding="async"
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
          </Reveal>
        </div>

        {/* ---- Scroll cue ---- */}
        <Reveal immediate delay={0.5} className="mt-20 hidden lg:block">
          <a
            href="#about"
            className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink/65 transition-colors hover:text-terracotta-deep"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 transition-colors group-hover:border-terracotta/50">
              <Icon
                name="chevronDown"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </span>
            {t.ui.scrollCue}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
