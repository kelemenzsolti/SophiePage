import { EXTERNAL_BOOKING } from '../../content/site';
import { useTranslation } from '../../i18n/useTranslation';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';

/**
 * Stands in for `<Booking />` while that section is commented out of `App.tsx`.
 *
 * It deliberately claims `id="booking"`, because every call to action on the
 * page — the hero button, the navbar's "Kapcsolat" link, `SECTION_IDS`, the
 * footer button — points at `#booking`. Taking the id over means none of them
 * had to change, and none of them scroll into nothing.
 *
 * When `<Booking />` comes back, delete this component and its line in
 * `App.tsx` rather than keeping both: two elements sharing one id would make
 * the anchor resolve to whichever renders first.
 *
 * `shell` is the tone `<Booking />` uses, so the page's band rhythm — paper,
 * forest, shell, forest-deep footer — stays the same as when the real booking
 * section is in place.
 */
export function ExternalBooking() {
  const { t } = useTranslation();
  const copy = t.externalBooking;

  const details = [
    { icon: 'clock', label: copy.whenLabel, value: copy.whenValue },
    { icon: 'mapPin', label: copy.whereLabel, value: copy.whereValue },
  ] as const;

  return (
    <Section id="booking" tone="shell">
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
      />

      <Reveal delay={0.12} className="mx-auto mt-14 max-w-2xl">
        <div className="surface-panel overflow-hidden">
          {/* A terracotta hairline across the top ties the card to the accent
              colour without tinting the whole fill, which on the shell ground
              would muddy the paper surface. */}
          <span aria-hidden="true" className="block h-1 bg-terracotta" />

          <div className="p-7 md:p-9">
            <dl className="grid gap-6 sm:grid-cols-2 sm:gap-7">
              {details.map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-terracotta/[0.09] text-terracotta-deep">
                    <Icon name={icon} className="h-[1.125rem] w-[1.125rem]" />
                  </span>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
                      {label}
                    </dt>
                    <dd className="mt-1.5 font-medium leading-snug text-pretty text-forest-deep">
                      {value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-8 border-t hairline pt-7">
              {/* `leading-none` on `.btn` suits the short labels used
                  elsewhere, but this one is a sentence and wraps on a narrow
                  phone — at line-height 1 the accented capitals (Ő, Á) of the
                  second line collide with the first. `leading-snug` and a
                  centred text block are the only overrides needed. */}
              <a
                href={EXTERNAL_BOOKING.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent btn-lg w-full text-center leading-snug"
              >
                {copy.cta}
                <Icon name="arrowRight" className="h-4 w-4 shrink-0" />
              </a>

              <p className="mt-3.5 text-center text-xs text-ink/50">
                {copy.ctaNote} · {EXTERNAL_BOOKING.host}
              </p>
            </div>
          </div>
        </div>

        {/* The enquiry form went away with `<Booking />`, so the only remaining
            route for someone who wants to ask before booking is the contact
            block in the footer. */}
        <div className="mt-8 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-terracotta-deep"
          >
            <Icon name="message" className="h-4 w-4" />
            {copy.secondary}
          </a>
          <p className="mx-auto mt-2.5 max-w-md text-xs leading-relaxed text-ink/55">
            {copy.secondaryNote}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
