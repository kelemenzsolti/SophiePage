import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { Section, SectionHeader } from '../ui/Section';

export function VideoSection() {
  const { t } = useTranslation();

  return (
    <Section className="bg-gradient-to-b from-cream to-terracotta/5">
      <SectionHeader title={t.video.label} subtitle={t.video.description} />

      <motion.div
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[1.75rem] border border-charcoal/5 shadow-card"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative aspect-video bg-gradient-to-br from-terracotta/20 via-olive/15 to-cream">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(197,123,87,0.25),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(132,140,114,0.2),transparent_50%)]" />

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
            <p className="font-serif text-xl text-charcoal md:text-2xl">
              {t.video.label}
            </p>
            <p className="max-w-md text-sm text-charcoal/60">{t.video.description}</p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-terracotta via-olive to-terracotta/50" />
        </div>
      </motion.div>
    </Section>
  );
}
