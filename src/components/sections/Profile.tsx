import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { Section, fadeUp } from '../ui/Section';

export function Profile() {
  const { t } = useTranslation();
  const profileImageSrc = `${import.meta.env.BASE_URL}assets/profile.jpg`;

  return (
    <Section id="about" className="bg-white/60">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <motion.div
        className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:mx-0 lg:max-w-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        custom={0}
        variants={fadeUp}
      >
        <div className="overflow-hidden rounded-card-lg border border-subtle bg-cream/50 shadow-card">
          <img
            src={profileImageSrc}
            alt={t.profile.imageAlt}
            className="block h-auto w-full object-cover object-[center_20%]"
          />
        </div>
          {/* Subtle Glow Background 
          <div className="absolute -inset-3 rounded-card-lg bg-gradient-to-br from-terracotta/15 via-forest/10 to-transparent" />
          */}

          {/* Edge-to-Edge Image Card Container
          <div className="relative overflow-hidden rounded-card-lg border border-subtle shadow-card">
            <img
              src={profileImageSrc}
              alt={t.profile.imageAlt}
              className="h-auto w-full object-cover object-[center_20%]"
            />
          </div>
          */}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          custom={0.1}
          variants={fadeUp}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-terracotta">
            {t.profile.eyebrow}
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-dark-slate md:text-4xl lg:text-5xl">
            {t.profile.name}
          </h2>
          <p className="mt-2 font-serif text-xl text-forest/80 md:text-2xl">
            {t.profile.role}
          </p>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-dark-slate/75 md:text-lg">
            {t.profile.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-8 space-y-3">
            {t.profile.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-dark-slate/80 md:text-base"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-terracotta" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}