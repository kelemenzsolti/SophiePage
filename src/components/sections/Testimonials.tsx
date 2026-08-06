import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { Section, SectionHeader } from '../ui/Section';

export function Testimonials() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const items = t.testimonials.items;
  const total = items.length;

  const goTo = (index: number) => {
    setActiveIndex((index + total) % total);
  };

  return (
    <Section id="testimonials" className="bg-gradient-to-b from-terracotta/5 to-cream">
      <SectionHeader
        title={t.testimonials.title}
        subtitle={t.testimonials.subtitle}
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="card-panel p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={`${activeIndex}-${items[activeIndex].quote.slice(0, 20)}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <svg
                className="mx-auto mb-6 h-8 w-8 text-terracotta/40"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.016 3.016 0 01-3.016 3.016c-1.518 0-2.74-1.066-3.004-2.521zm12 0c-1.03-1.094-1.583-2.321-1.583-4.31 0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.016 3.016 0 01-3.016 3.016c-1.518 0-2.74-1.066-3.004-2.521z" />
              </svg>
              <p className="font-serif text-xl leading-relaxed text-dark-slate md:text-2xl">
                &ldquo;{items[activeIndex].quote}&rdquo;
              </p>
              <footer className="mt-8">
                <cite className="not-italic">
                  <span className="block text-sm font-medium text-dark-slate">
                    {items[activeIndex].author}
                  </span>
                  <span className="mt-1 block text-sm text-forest">
                    {items[activeIndex].role}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => goTo(activeIndex - 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-dark-slate/10 text-dark-slate transition-colors hover:border-terracotta/30 hover:text-terracotta"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <div className="flex gap-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? 'w-8 bg-terracotta'
                      : 'w-2 bg-dark-slate/20 hover:bg-dark-slate/35'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => goTo(activeIndex + 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-dark-slate/10 text-dark-slate transition-colors hover:border-terracotta/30 hover:text-terracotta"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-10 hidden gap-6 md:grid md:grid-cols-2">
          {items.map((item, index) => (
            <motion.div
              key={item.quote.slice(0, 24)}
              className={`card p-6 transition-all ${
                index === activeIndex
                  ? 'border-terracotta/30 shadow-soft'
                  : 'border-subtle bg-cream/60'
              }`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <p className="text-sm leading-relaxed text-dark-slate/75">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="mt-4 text-xs font-medium text-forest">{item.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}