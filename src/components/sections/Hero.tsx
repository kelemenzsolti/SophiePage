import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { fadeUp } from '../ui/Section';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 lg:min-h-screen lg:pb-0"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream to-terracotta/10" />
      <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-olive/10 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-terracotta/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        <motion.div
          className="order-2 lg:order-1"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-olive">
            {t.hero.eyebrow}
          </p>
          <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight text-charcoal text-balance md:text-5xl lg:text-6xl">
            {t.hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal/75 md:text-lg">
            {t.hero.subheadline}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-terracotta px-7 py-3.5 text-sm font-medium text-cream shadow-soft transition-all hover:bg-terracotta/90 hover:shadow-card"
            >
              {t.hero.cta}
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-charcoal/15 bg-cream/60 px-7 py-3.5 text-sm font-medium text-charcoal transition-all hover:border-olive/40 hover:bg-cream"
            >
              {t.nav.services}
            </a>
          </div>
        </motion.div>

        <motion.div
          className="order-1 lg:order-2"
          initial="hidden"
          animate="visible"
          custom={0.15}
          variants={fadeUp}
        >
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-terracotta/20 via-olive/10 to-transparent blur-sm" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-charcoal/5 bg-cream shadow-card">
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-cream/10" />
              <img
                src="/assets/image_3fab1f.jpg"
                alt={t.hero.imageAlt}
                className="h-auto w-full object-contain object-center"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-charcoal/5 bg-cream/90 px-5 py-4 shadow-soft backdrop-blur-sm md:block">
              <p className="font-serif text-lg text-charcoal">{t.nav.logo}</p>
              <p className="text-sm text-charcoal/60">{t.hero.eyebrow}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
