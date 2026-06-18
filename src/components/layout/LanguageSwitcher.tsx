import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import type { Language } from '../../i18n/translations';

interface LanguageSwitcherProps {
  compact?: boolean;
}

export function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectLanguage = (lang: Language) => {
    setLanguage(lang);
    setOpen(false);
  };

  if (compact) {
    return (
      <div
        ref={containerRef}
        className="relative"
        aria-label={t.language.switchLabel}
      >
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex items-center gap-1 rounded-full border border-charcoal/10 bg-cream px-3 py-1.5 text-xs font-semibold tracking-wide text-charcoal transition-colors hover:border-terracotta/30"
        >
          <span className={language === 'hu' ? 'text-terracotta' : 'text-charcoal/40'}>
            {t.language.hu}
          </span>
          <span className="text-charcoal/25">|</span>
          <span className={language === 'en' ? 'text-terracotta' : 'text-charcoal/40'}>
            {t.language.en}
          </span>
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-2 min-w-[88px] overflow-hidden rounded-xl border border-charcoal/10 bg-cream shadow-card">
            {(['hu', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => selectLanguage(lang)}
                className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-terracotta/10 ${
                  language === lang
                    ? 'font-semibold text-terracotta'
                    : 'text-charcoal/70'
                }`}
              >
                {lang === 'hu' ? t.language.hu : t.language.en}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      aria-label={t.language.switchLabel}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-full border border-charcoal/10 bg-cream/80 px-4 py-2 text-sm font-medium text-charcoal transition-all hover:border-terracotta/30 hover:shadow-soft"
      >
        <span className={language === 'hu' ? 'text-terracotta' : 'text-charcoal/40'}>
          {t.language.hu}
        </span>
        <span className="text-charcoal/20">|</span>
        <span className={language === 'en' ? 'text-terracotta' : 'text-charcoal/40'}>
          {t.language.en}
        </span>
        <svg
          className={`h-3.5 w-3.5 text-charcoal/40 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[120px] overflow-hidden rounded-xl border border-charcoal/10 bg-cream shadow-card">
          {(['hu', 'en'] as Language[]).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => selectLanguage(lang)}
              className={`block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-terracotta/10 ${
                language === lang
                  ? 'font-semibold text-terracotta'
                  : 'text-charcoal/70'
              }`}
            >
              {lang === 'hu' ? 'Magyar' : 'English'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
