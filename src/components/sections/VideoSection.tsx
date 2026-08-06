import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { Section, SectionHeader } from '../ui/Section';

export function VideoSection() {
  const { t } = useTranslation();

  return (
    <Section className="bg-gradient-to-b from-cream to-terracotta/5">
      <SectionHeader title={t.video.label} subtitle={t.video.description} />

      <motion.div
        className="relative mx-auto max-w-4xl overflow-hidden rounded-card-lg border border-subtle shadow-card"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative aspect-video bg-gradient-to-br from-terracotta/20 via-forest/15 to-cream">
          <div className="absolute inset-0 bg-gradient-terracotta-glow" />
          <div className="absolute inset-0 bg-gradient-forest-glow" />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <button
              type="button"
              aria-label={t.video.playAria}
              className="group flex h-20 w-20 items-center justify-center rounded-full bg-cream/95 text-terracotta shadow-card transition-all hover:scale-105 hover:bg-cream"
            >
              <svg
                className="ml-1 h-8 w-8 transition-transform group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <p className="font-serif text-xl text-dark-slate md:text-2xl">
              {t.video.label}
            </p>
            <p className="max-w-md text-sm text-dark-slate/60">{t.video.description}</p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-terracotta via-forest to-terracotta/50" />
        </div>
      </motion.div>
    </Section>
  );
}