import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { LANGUAGES } from '../../i18n/translations';
import { useTranslation } from '../../i18n/useTranslation';

interface LanguageSwitcherProps {
  className?: string;
  /** Renders for a dark ground (the footer) instead of the light page ground. */
  inverted?: boolean;
}

/**
 * A two-option segmented control. With only Hungarian and English to choose
 * from, showing both is faster and more discoverable than a dropdown.
 */
export function LanguageSwitcher({ className, inverted = false }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useTranslation();

  return (
    <div
      role="group"
      aria-label={t.language.switchLabel}
      className={cn(
        'relative inline-flex items-center rounded-full border p-0.5',
        inverted ? 'border-paper/20 bg-paper/5' : 'border-ink/10 bg-shell/70',
        className,
      )}
    >
      {LANGUAGES.map((lang) => {
        const active = language === lang;

        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            aria-pressed={active}
            aria-label={lang === 'hu' ? t.language.huFull : t.language.enFull}
            className={cn(
              'relative rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.08em] transition-colors duration-300',
              active
                ? inverted
                  ? 'text-forest-deep'
                  : 'text-paper'
                : inverted
                  ? 'text-paper/55 hover:text-paper'
                  : 'text-ink/65 hover:text-ink',
            )}
          >
            {active && (
              <motion.span
                layoutId={inverted ? 'lang-pill-inverted' : 'lang-pill'}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                className={cn(
                  'absolute inset-0 rounded-full',
                  inverted ? 'bg-paper' : 'bg-forest',
                )}
              />
            )}
            <span className="relative">{t.language[lang]}</span>
          </button>
        );
      })}
    </div>
  );
}
