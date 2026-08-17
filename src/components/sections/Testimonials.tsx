import { useCallback, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { asset, IMAGES } from '../../content/site';
import { useTranslation } from '../../i18n/useTranslation';
import { cn } from '../../lib/cn';
import { EASE_EDITORIAL } from '../../lib/motion';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/Section';

export function Testimonials() {
  const { t } = useTranslation();
  const reduced = useReducedMotion() ?? false;
  const items = t.testimonials.items;

  const [index, setIndex] = useState(0);
  // Which way the next slide should travel, so paging back feels like going back.
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (next: number, from = index) => {
      const total = items.length;
      const target = (next + total) % total;
      setDirection(target === from ? 0 : target > from ? 1 : -1);
      setIndex(target);
    },
    [index, items.length],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1);
    }
  };

  const active = items[index];
  const offset = reduced ? 0 : 48;

  return (
    <section id="testimonials" className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Forest ground. The photograph carries the section, so the scrim is
          tuned for text contrast rather than mood alone. */}
      <img
        src={asset(IMAGES.forest)}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-forest-deep/85 mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-deep via-forest-deep/70 to-forest-deep"
      />

      <div className="shell relative text-paper">
        <SectionHeading
          eyebrow={t.nav.testimonials}
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
          inverted
        />

        <Reveal delay={0.1} className="mt-16">
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label={t.ui.carouselLabel}
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="mx-auto max-w-4xl rounded-panel border border-paper/10 bg-paper/[0.06] p-8 backdrop-blur-md md:p-14"
          >
            <div
              aria-live="polite"
              aria-atomic="true"
              className="relative min-h-[16rem] md:min-h-[14rem]"
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.blockquote
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * offset }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -offset }}
                  transition={{ duration: reduced ? 0.2 : 0.45, ease: EASE_EDITORIAL }}
                  className="text-center"
                >
                  <p className="mx-auto max-w-3xl font-display text-quote font-medium text-balance text-paper">
                    &ldquo;{active.quote}&rdquo;
                  </p>

                  <footer className="mt-9">
                    <span
                      aria-hidden="true"
                      className="mx-auto mb-5 block h-px w-12 bg-terracotta-soft/60"
                    />
                    <cite className="not-italic">
                      <span className="block text-sm font-medium text-paper">
                        {active.author}
                      </span>
                      <span className="mt-1.5 block text-xs uppercase tracking-[0.16em] text-terracotta-soft">
                        {active.role}
                      </span>
                    </cite>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* ---- Controls ---- */}
            <div className="mt-10 flex items-center justify-center gap-5">
              <button
                type="button"
                aria-label={t.ui.previous}
                onClick={() => goTo(index - 1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 text-paper/70 transition-colors hover:border-terracotta-soft hover:text-paper"
              >
                <Icon name="chevronLeft" className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                {items.map((item, dotIndex) => (
                  <button
                    key={item.author}
                    type="button"
                    aria-label={t.ui.goToSlide.replace('{n}', String(dotIndex + 1))}
                    aria-current={dotIndex === index ? 'true' : undefined}
                    onClick={() => goTo(dotIndex)}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-500 ease-editorial',
                      dotIndex === index
                        ? 'w-9 bg-terracotta-soft'
                        : 'w-1.5 bg-paper/30 hover:bg-paper/60',
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label={t.ui.next}
                onClick={() => goTo(index + 1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 text-paper/70 transition-colors hover:border-terracotta-soft hover:text-paper"
              >
                <Icon name="chevronRight" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
