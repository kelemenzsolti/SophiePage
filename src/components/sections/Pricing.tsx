import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { Section, SectionHeader } from '../ui/Section';

export function Pricing() {
  const { t } = useTranslation();

  return (
    <Section id="pricing" className="bg-gradient-to-b from-cream to-terracotta/5">
      <SectionHeader title={t.pricing.title} subtitle={t.pricing.subtitle} />

      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        {t.pricing.items.map((item, index) => (
          <motion.article
            key={item.title}
            className={`relative flex flex-col rounded-card-lg border p-8 transition-all duration-300 ${
              item.featured
                ? 'border-terracotta/40 bg-white shadow-card lg:-translate-y-1'
                : 'border-subtle bg-white/80 shadow-soft hover:-translate-y-1 hover:border-terracotta/25 hover:shadow-card'
            }`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {item.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-terracotta px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-cream">
                {t.pricing.featuredLabel}
              </span>
            )}

            <h3 className="font-serif text-2xl font-medium text-dark-slate">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-dark-slate/70">
              {item.description}
            </p>

            <div className="mt-6 border-t border-subtle pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                {t.pricing.durationLabel}
              </p>
              <p className="mt-1 text-sm text-dark-slate/75">{item.duration}</p>
            </div>

            <div className="mt-5">
              <p className="font-serif text-4xl font-medium text-terracotta">
                {item.price}
              </p>
              <p className="mt-1 text-sm text-dark-slate/60">{t.pricing.perSession}</p>
            </div>

            <ul className="mt-6 flex-1 space-y-3">
              {item.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-dark-slate/80"
                >
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-terracotta"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href="#booking"
              className={`mt-8 w-full text-center ${
                item.featured ? 'btn-primary px-6 py-3.5' : 'btn-secondary px-6 py-3.5'
              }`}
            >
              {t.pricing.cta}
            </a>
          </motion.article>
        ))}
      </div>

      <motion.p
        className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-dark-slate/60"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {t.pricing.note}
      </motion.p>
    </Section>
  );
}
