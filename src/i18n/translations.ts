export type Language = 'hu' | 'en';

export type TranslationKeys = (typeof translations)[Language];

export const translations = {
  hu: {
    meta: {
      title: 'Czárth Zsófia – Holisztikus családterapeuta',
      description:
        'Holisztikus családterapeuta és tanácsadó. Út a belső békéhez és a családi harmóniához.',
    },
    nav: {
      logo: 'Czárth Zsófia',
      about: 'Rólam',
      services: 'Szakterületek',
      testimonials: 'Vélemények',
      contact: 'Kapcsolat',
      bookSession: 'Időpontfoglalás',
    },
    hero: {
      eyebrow: 'Holisztikus családterapeuta & tanácsadó',
      headline: 'Út a belső békéhez és a családi harmóniához',
      subheadline:
        'Biztonságos, meleg és támogató térben segítek feldolgozni a nehézségeket, erősíteni a kapcsolatokat és megtalálni az egyensúlyt.',
      cta: 'Konzultáció igénylése',
      imageAlt: 'Czárth Zsófia - Holisztikus családterapeuta',
    },
    video: {
      label: 'Bemutatkozó videó',
      description: 'Ismerje meg megközelítésemet és a terápiás folyamatot rövid videómban.',
      playAria: 'Videó lejátszása',
    },
    services: {
      title: 'Szakterületek',
      subtitle:
        'Személyre szabott, holisztikus megközelítéssel támogatom Önt és családját a változás útján.',
      items: [
        {
          title: 'Családterápia',
          description:
            'Segítek a családi dinamikák megértésében, a kommunikáció javításában és a konfliktusok konstruktív kezelésében.',
        },
        {
          title: 'Párterápia',
          description:
            'Biztonságos térben dolgozunk a kapcsolat mélyítésén, a bizalom helyreállításán és a közös jövő kialakításán.',
        },
        {
          title: 'Egyéni terápia',
          description:
            'Támogatom az önismeret fejlődését, a belső erőforrások feltárását és a személyes növekedést.',
        },
        {
          title: 'Stresszkezelés',
          description:
            'Gyakorlati eszközöket adok a mindennapi feszültség kezelésére és a lelki egyensúly megőrzésére.',
        },
      ],
    },
    testimonials: {
      title: 'Vélemények',
      subtitle: 'Ügyfeleim tapasztalatai anonim módon, hálás szívvel megosztva.',
      items: [
        {
          quote:
            'Zsófia meleg és megértő jelenléte segített, hogy végre őszintén beszélhessünk egymással a párommal. A kapcsolatunk újra erősebb lett.',
          author: 'Anonim ügyfél',
          role: 'Párterápia',
        },
        {
          quote:
            'A családterápiás üléseken mindenki meghallgatásra talált. Végre értjük egymást, és békésebbek a mindennapjaink.',
          author: 'Anonim ügyfél',
          role: 'Családterápia',
        },
        {
          quote:
            'Az egyéni üléseken megtanultam kezelni a stresszt és jobban figyelni magamra. Hálás vagyok a támogatásért.',
          author: 'Anonim ügyfél',
          role: 'Egyéni terápia',
        },
        {
          quote:
            'Professzionális, mégis emberi megközelítés. Biztonságban éreztem magam már az első alkalomtól kezdve.',
          author: 'Anonim ügyfél',
          role: 'Stresszkezelés',
        },
      ],
    },
    footer: {
      tagline: 'Holisztikus családterapeuta & tanácsadó',
      contactTitle: 'Kapcsolat',
      email: 'hello@czarthzsofia.hu',
      phone: '+36 30 123 4567',
      location: 'Budapest, Magyarország',
      socialTitle: 'Kövessen',
      legal: '© 2026 Czárth Zsófia. Minden jog fenntartva.',
      privacy: 'Adatvédelmi tájékoztató',
      terms: 'Felhasználási feltételek',
    },
    language: {
      hu: 'HU',
      en: 'EN',
      switchLabel: 'Nyelv váltása',
    },
  },
  en: {
    meta: {
      title: 'Zsófia Czárth – Holistic Family Therapist',
      description:
        'Holistic family therapist and counselor. Path to inner peace and family harmony.',
    },
    nav: {
      logo: 'Czárth Zsófia',
      about: 'About',
      services: 'Services',
      testimonials: 'Testimonials',
      contact: 'Contact',
      bookSession: 'Book a Session',
    },
    hero: {
      eyebrow: 'Holistic Family Therapist & Counselor',
      headline: 'Path to Inner Peace and Family Harmony',
      subheadline:
        'In a warm, safe, and supportive space, I help you process challenges, strengthen relationships, and find balance.',
      cta: 'Request a Consultation',
      imageAlt: 'Zsófia Czárth - Holistic Family Therapist',
    },
    video: {
      label: 'Introduction Video',
      description: 'Learn about my approach and the therapeutic process in my short introduction video.',
      playAria: 'Play video',
    },
    services: {
      title: 'Areas of Practice',
      subtitle:
        'With a personalized, holistic approach, I support you and your family on the path to change.',
      items: [
        {
          title: 'Family Counseling',
          description:
            'I help understand family dynamics, improve communication, and handle conflicts constructively.',
        },
        {
          title: 'Couples Therapy',
          description:
            'In a safe space, we work on deepening your relationship, rebuilding trust, and shaping a shared future.',
        },
        {
          title: 'Individual Therapy',
          description:
            'I support self-discovery, uncovering inner resources, and personal growth.',
        },
        {
          title: 'Stress Management',
          description:
            'I provide practical tools for managing daily tension and maintaining emotional balance.',
        },
      ],
    },
    testimonials: {
      title: 'Testimonials',
      subtitle: 'Shared with gratitude — anonymous experiences from my clients.',
      items: [
        {
          quote:
            "Zsófia's warm and understanding presence helped my partner and me finally speak honestly. Our relationship feels stronger again.",
          author: 'Anonymous Client',
          role: 'Couples Therapy',
        },
        {
          quote:
            'In family therapy, everyone felt heard. We finally understand each other, and our daily life is more peaceful.',
          author: 'Anonymous Client',
          role: 'Family Counseling',
        },
        {
          quote:
            'In individual sessions, I learned to manage stress and listen to myself better. I am grateful for the support.',
          author: 'Anonymous Client',
          role: 'Individual Therapy',
        },
        {
          quote:
            'Professional yet deeply human approach. I felt safe from the very first session.',
          author: 'Anonymous Client',
          role: 'Stress Management',
        },
      ],
    },
    footer: {
      tagline: 'Holistic Family Therapist & Counselor',
      contactTitle: 'Contact',
      email: 'hello@czarthzsofia.hu',
      phone: '+36 30 123 4567',
      location: 'Budapest, Hungary',
      socialTitle: 'Follow',
      legal: '© 2026 Zsófia Czárth. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
    },
    language: {
      hu: 'HU',
      en: 'EN',
      switchLabel: 'Switch language',
    },
  },
} as const;

export type TranslationKey = keyof TranslationKeys;
