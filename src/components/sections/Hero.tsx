import { HERO_SIZES, IMAGES } from '../../content/site';
import { useTranslation } from '../../i18n/useTranslation';
import { Icon } from '../ui/Icon';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden lg:min-h-screen">
      {/* Full-bleed forest ground. The composition sits left of centre, so the
          crop keeps it there and leaves the right side free for the type. */}
      <Picture
        image={IMAGES.forest}
        alt=""
        sizes={HERO_SIZES}
        priority
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[30%_center] md:object-[25%_center]"
      />

      {/* Two scrims: one darkens the whole frame for legibility, the second
          deepens the edge the copy sits against. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep/70 via-forest-deep/45 to-forest-deep/80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/75 via-transparent to-forest-deep/45 lg:bg-gradient-to-r lg:from-forest-deep/55 lg:via-forest-deep/25 lg:to-forest-deep/75"
      />

      <div className="shell relative flex min-h-[92vh] items-end pb-20 pt-[calc(var(--nav-height)+6rem)] md:items-center md:pb-24 lg:min-h-screen">
        <div className="ml-auto w-full max-w-xl text-paper lg:max-w-2xl">
          <Reveal immediate>
            <p className="eyebrow text-terracotta-soft before:bg-terracotta-soft/60">
              {t.hero.eyebrow}
            </p>
          </Reveal>

          <Reveal immediate delay={0.08}>
            <h1 className="mt-7 font-display text-display-xl font-medium text-balance text-paper">
              {t.hero.headline}
            </h1>
          </Reveal>

          <Reveal immediate delay={0.16}>
            <p className="mt-7 max-w-xl text-lead text-pretty text-paper/80">
              {t.hero.subheadline}
            </p>
          </Reveal>

          <Reveal immediate delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#booking" className="btn-accent btn-lg">
                {t.hero.cta}
                <Icon name="arrowRight" className="h-4 w-4" />
              </a>
              <a href="#services" className="btn-ghost-light btn-lg">
                {t.nav.services}
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ---- Scroll cue ---- */}
      <Reveal
        immediate
        delay={0.5}
        className="absolute inset-x-0 bottom-8 hidden lg:block"
      >
        <div className="shell">
          <a
            href="#about"
            className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-paper"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/30 transition-colors group-hover:border-terracotta-soft">
              <Icon
                name="chevronDown"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </span>
            {t.ui.scrollCue}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
