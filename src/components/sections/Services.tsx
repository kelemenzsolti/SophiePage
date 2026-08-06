import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { Section, SectionHeader } from '../ui/Section';

const icons = [
  (
    <svg key="family" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  (
    <svg key="couples" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  (
    <svg key="individual" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  (
    <svg key="stress" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
];

export function Services() {
  const { t } = useTranslation();

  return (
    <Section id="services" className="bg-cream">
      <SectionHeader title={t.services.title} subtitle={t.services.subtitle} />

      <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
        {t.services.items.map((item, index) => (
          <motion.article
            key={item.title}
            className="group card-feature"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="mb-5 inline-flex rounded-xl bg-terracotta/10 p-3 text-terracotta transition-colors group-hover:bg-terracotta group-hover:text-cream">
              {icons[index]}
            </div>
            <h3 className="font-serif text-2xl font-medium text-dark-slate">
              {item.title}
            </h3>
            <p className="mt-3 leading-relaxed text-dark-slate/70">{item.description}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}