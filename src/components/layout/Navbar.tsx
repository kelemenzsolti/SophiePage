import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_LINKS, SECTION_IDS } from '../../content/site';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useDismiss } from '../../hooks/useDismiss';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useScrolled } from '../../hooks/useScrolled';
import { useTranslation } from '../../i18n/useTranslation';
import { cn } from '../../lib/cn';
import { EASE_EDITORIAL } from '../../lib/motion';
import { Icon } from '../ui/Icon';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const { t } = useTranslation();
  const scrolled = useScrolled(24);
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // The trigger is included so pressing it while open closes the panel rather
  // than dismissing and reopening in the same gesture.
  const dismissTargets = useMemo(() => [panelRef, toggleRef], []);

  useLockBodyScroll(open);
  useDismiss(dismissTargets, open, close);

  // Returning focus to the trigger after closing keeps keyboard users where
  // they left off — but not on first paint, when nothing was ever opened.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (!open && wasOpen.current) {
      toggleRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = open;
  }, [open]);

  // A viewport that grows past the mobile breakpoint should not leave the
  // overlay stranded on screen.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const onChange = () => query.matches && setOpen(false);

    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE_EDITORIAL, delay: 0.1 }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500',
        scrolled || open
          ? 'border-b border-ink/[0.07] bg-paper/85 shadow-soft backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav
        aria-label={t.nav.logo}
        className="shell flex h-[var(--nav-height)] items-center justify-between gap-6"
      >
        <a
          href="#top"
          className="font-display text-xl font-medium tracking-tight text-forest-deep transition-colors hover:text-terracotta-deep md:text-[1.375rem]"
        >
          {t.nav.logo}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(({ key, href }) => {
            const isActive = active === href.slice(1);

            return (
              <li key={key}>
                <a
                  href={href}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300',
                    isActive ? 'text-forest-deep' : 'text-ink/70 hover:text-ink',
                  )}
                >
                  {t.nav[key]}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-x-3.5 -bottom-0.5 h-px bg-terracotta"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:inline-flex" />

          <a href="#booking" className="btn-primary btn-md hidden lg:inline-flex">
            {t.nav.bookSession}
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.ui.closeMenu : t.ui.openMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-shell/70 text-forest-deep transition-colors hover:border-ink/25 lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            ref={panelRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
            className="overflow-hidden border-t border-ink/[0.07] bg-paper/95 backdrop-blur-xl lg:hidden"
          >
            <div className="shell py-8">
              <ul className="flex flex-col divide-y divide-ink/[0.07]">
                {NAV_LINKS.map(({ key, href }, index) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + index * 0.05,
                      duration: 0.4,
                      ease: EASE_EDITORIAL,
                    }}
                  >
                    <a
                      href={href}
                      onClick={close}
                      className="flex items-center justify-between py-4 font-display text-2xl text-forest-deep"
                    >
                      {t.nav[key]}
                      <Icon name="arrowRight" className="h-4 w-4 text-terracotta" />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-4">
                <a href="#booking" onClick={close} className="btn-accent btn-lg w-full">
                  {t.nav.bookSession}
                </a>
                <LanguageSwitcher className="self-start sm:hidden" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
