import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { fadeUp } from '../ui/Section';

export function Hero() {
  const { t } = useTranslation();
  const heroImageSrc = `${import.meta.env.BASE_URL}assets/herov2.jpg`;

  return (
    <section className="relative min-h-[90vh] overflow-hidden lg:min-h-screen">
      <img
        src={heroImageSrc}
        alt={t.hero.imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-[30%_center] md:object-[25%_center]"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-dark-slate/55 via-dark-slate/35 to-dark-slate/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-slate/40 via-transparent to-dark-slate/20 lg:bg-gradient-to-r lg:from-dark-slate/50 lg:via-dark-slate/20 lg:to-dark-slate/65" />

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-end px-6 pb-16 pt-32 md:items-center md:pb-20 md:pt-36 lg:min-h-screen lg:px-8">
        <motion.div
          className="ml-auto w-full max-w-xl text-cream lg:max-w-2xl"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-cream/80">
            {t.hero.eyebrow}
          </p>
          <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight text-balance md:text-5xl lg:text-6xl">
            {t.hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg">
            {t.hero.subheadline}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#booking"
              className="btn-primary px-7 py-3.5"
            >
              {t.hero.cta}
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-cream/30 bg-cream/10 px-7 py-3.5 text-sm font-medium text-cream backdrop-blur-sm transition-all hover:border-cream/50 hover:bg-cream/20"
            >
              {t.nav.services}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}