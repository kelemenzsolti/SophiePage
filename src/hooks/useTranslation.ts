import { useLanguageContext } from '../i18n/LanguageContext';

export function useTranslation() {
  const { language, setLanguage, t } = useLanguageContext();
  return { language, setLanguage, t };
}
