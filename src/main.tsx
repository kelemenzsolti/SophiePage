import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import './fonts.css';
import './index.css';

/**
 * `dist/index.html` ships with this tree already rendered into `#root` (see
 * `scripts/prerender.mjs`), so the page paints before this bundle arrives.
 *
 * Deliberately `createRoot().render()` and not `hydrateRoot()`: a returning
 * visitor who chose English has their language restored from `localStorage`,
 * which will not match the Hungarian markup baked in at build time. Hydration
 * treats that as a mismatch; a plain render just replaces the tree in one commit
 * before the next paint, so the prerendered markup is a head start rather than a
 * contract this has to honour.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
