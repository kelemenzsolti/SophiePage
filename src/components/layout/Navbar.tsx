import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { LanguageSwitcher } from './LanguageSwitcher';

const navLinks = [
  { key: 'about' as const, href: '#about' },
  { key: 'services' as const, href: '#services' },
  { key: 'testimonials' as const, href: '#testimonials' },
  { key: 'contact' as const, href: '#contact' },
];

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-subtle bg-cream/90 shadow-soft backdrop-blur-md'
          : 'bg-gradient-to-b from-charcoal/40 to-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a
          href="#"
          className={`font-serif text-xl font-semibold tracking-tight transition-colors md:text-2xl ${
            scrolled
              ? 'text-charcoal hover:text-terracotta'
              : 'text-cream hover:text-terracotta'
          }`}
        >
          {t.nav.logo}
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map(({ key, href }) => (
              <li key={key}>
                <a
                  href={href}
                  className={`text-sm font-medium transition-colors hover:text-terracotta ${
                    scrolled ? 'text-charcoal/75' : 'text-cream/85'
                  }`}
                >
                  {t.nav[key]}
                </a>
              </li>
            ))}
          </ul>

          <LanguageSwitcher light={!scrolled} />

          <a
            href="#booking"
            className="btn-primary px-5 py-2.5"
          >
            {t.nav.bookSession}
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher compact light={!scrolled} />
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMobileOpen((open) => !open)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-colors ${
              scrolled
                ? 'border-charcoal/10 bg-cream text-charcoal'
                : 'border-cream/25 bg-charcoal/20 text-cream'
            }`}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              {mobileOpen ? (
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-subtle bg-cream/95 px-6 py-6 backdrop-blur-md lg:hidden"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map(({ key, href }) => (
              <li key={key}>
                <a
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-medium text-charcoal/80"
                >
                  {t.nav[key]}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#booking"
                onClick={() => setMobileOpen(false)}
                className="btn-primary px-5 py-2.5"
              >
                {t.nav.bookSession}
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
