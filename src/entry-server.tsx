import { renderToString } from 'react-dom/server';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';

/**
 * Renders the page to static HTML at build time — see `scripts/prerender.mjs`.
 *
 * Mirrors `main.tsx` minus the CSS imports and the DOM mount. `LanguageProvider`
 * falls back to Hungarian without a `window`, which is exactly the language the
 * prerendered markup should carry: it is the one Google indexes.
 */
export function render(): string {
  return renderToString(
    <LanguageProvider>
      <App />
    </LanguageProvider>,
  );
}
