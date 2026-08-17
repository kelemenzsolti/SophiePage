import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  LANGUAGES,
  translations,
  type Language,
  type TranslationKeys,
} from './translations';

const STORAGE_KEY = 'cz-language';
const DEFAULT_LANGUAGE: Language = 'hu';

export interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: unknown): value is Language {
  return LANGUAGES.includes(value as Language);
}

/**
 * Resolves the initial language: an explicit earlier choice wins, otherwise we
 * fall back to the browser's preference, and finally to Hungarian.
 */
function detectLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLanguage(stored)) return stored;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies) — ignore.
  }

  const preferred = window.navigator.languages ?? [window.navigator.language];
  for (const tag of preferred) {
    const base = tag?.slice(0, 2).toLowerCase();
    if (isLanguage(base)) return base;
  }

  return DEFAULT_LANGUAGE;
}

function setMeta(selector: string, attribute: string, value: string) {
  document.querySelector(selector)?.setAttribute(attribute, value);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Persisting is a nicety; a failure must not break switching.
    }
  }, []);

  const t = useMemo(() => translations[language], [language]);

  // Keep the document metadata in sync so assistive tech, browsers and social
  // crawlers see the language that is actually rendered.
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.meta.title;

    setMeta('meta[name="description"]', 'content', t.meta.description);
    setMeta('meta[property="og:title"]', 'content', t.meta.title);
    setMeta('meta[property="og:description"]', 'content', t.meta.description);
    setMeta('meta[property="og:locale"]', 'content', t.meta.locale);
  }, [language, t]);

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}
