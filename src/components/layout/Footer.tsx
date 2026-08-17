import { NAV_LINKS, SOCIAL_LINKS } from '../../content/site';
import { useTranslation } from '../../i18n/useTranslation';
import { BrandIcon, Icon } from '../ui/Icon';
import { ProtectedContactLink } from '../ui/ProtectedContactLink';
import { Reveal } from '../ui/Reveal';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="relative grain bg-forest-deep text-paper">
      <div className="shell relative py-20 md:py-24">
        <Reveal className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---- Brand ---- */}
          <div className="lg:col-span-5">
            <p className="font-display text-display-sm font-medium">{t.nav.logo}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/60">
              {t.footer.tagline}
            </p>

            <a href="#booking" className="btn-accent btn-md mt-8">
              {t.nav.bookSession}
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
          </div>

          {/* ---- Sitemap ---- */}
          <nav className="lg:col-span-3" aria-label={t.ui.navigation}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/55">
              {t.ui.navigation}
            </h2>
            <ul className="mt-6 space-y-3.5 text-sm">
              {NAV_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    className="text-paper/70 transition-colors hover:text-terracotta-soft"
                  >
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---- Contact ---- */}
          <div className="lg:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/55">
              {t.footer.contactTitle}
            </h2>

            <div className="mt-6 space-y-6">
              <ProtectedContactLink
                type="phone"
                label={t.footer.phoneLabel}
                actionLabel={t.footer.phoneAction}
                inverted
              />

              <p className="flex items-center gap-2.5 text-sm text-paper/60">
                <Icon name="mapPin" className="h-4 w-4 text-terracotta-soft" />
                {t.footer.location}
              </p>
            </div>

            <h2 className="mt-9 text-xs font-semibold uppercase tracking-[0.18em] text-paper/55">
              {t.footer.socialTitle}
            </h2>
            <div className="mt-4 flex gap-2.5">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/65 transition-all duration-300 hover:border-terracotta hover:bg-terracotta hover:text-paper"
                >
                  <BrandIcon name={link.name} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ---- Legal bar ---- */}
        <div className="mt-16 flex flex-col gap-6 border-t border-paper/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-paper/55">{t.footer.legal}</p>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-4 text-xs">
            <a href="#" className="text-paper/55 transition-colors hover:text-paper">
              {t.footer.privacy}
            </a>
            <a href="#" className="text-paper/55 transition-colors hover:text-paper">
              {t.footer.terms}
            </a>

            <LanguageSwitcher inverted />

            <a
              href="#top"
              className="inline-flex items-center gap-2 text-paper/55 transition-colors hover:text-paper"
            >
              {t.ui.backToTop}
              <Icon name="arrowUp" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
