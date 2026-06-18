export type Language = 'hu' | 'en';

export type TranslationKeys = (typeof translations)[Language];

export const translations = {
  hu: {
    meta: {
      title: 'Czárth Zsófia – Pszichológus',
      description:
        'Pszichológus. Támogató, biztonságos térben segítek feldolgozni a nehézségeket és megtalálni a belső egyensúlyt.',
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
      eyebrow: 'Pszichológus',
      headline: 'Tér az önismerethez és a lelki egyensúlyhoz',
      subheadline:
        'Biztonságos, meleg és támogató térben segítek feldolgozni a nehézségeket, megérteni az érzelmeket és megtalálni a belső erőforrásokat.',
      cta: 'Konzultáció igénylése',
      imageAlt: 'Czárth Zsófia - Pszichológus',
    },
    video: {
      label: 'Bemutatkozó videó',
      description:
        'Ismerje meg pszichológiai megközelítésemet és a közös munka folyamatát rövid videómban.',
      playAria: 'Videó lejátszása',
    },
    services: {
      title: 'Szakterületek',
      subtitle:
        'Személyre szabott pszichológiai támogatással segítek Önnek a változás és az önismeret útján.',
      items: [
        {
          title: 'Egyéni pszichológiai tanácsadás',
          description:
            'Támogatom az önismeret fejlődését, a belső konfliktusok feldolgozását és a személyes növekedést.',
        },
        {
          title: 'Szorongás és hangulati zavarok',
          description:
            'Segítek megérteni és kezelni a szorongást, a depresszív tüneteket és az érzelmi nehézségeket.',
        },
        {
          title: 'Pár- és családkapcsolati tanácsadás',
          description:
            'Biztonságos térben dolgozunk a kapcsolati dinamikák megértésén, a kommunikáció javításán és a bizalom helyreállításán.',
        },
        {
          title: 'Stressz- és kríziskezelés',
          description:
            'Gyakorlati eszközöket adok a mindennapi feszültség, a krízishelyzetek és a lelki terhelés kezelésére.',
        },
      ],
    },
    testimonials: {
      title: 'Vélemények',
      subtitle: 'Ügyfeleim tapasztalatai anonim módon, hálás szívvel megosztva.',
      items: [
        {
          quote:
            'Zsófia meleg és megértő jelenléte segített, hogy végre őszintén beszélhessek magamról. Újra bízom önmagamban.',
          author: 'Anonim ügyfél',
          role: 'Egyéni tanácsadás',
        },
        {
          quote:
            'A párkapcsolati üléseken mindketten meghallgatásra találtunk. Végre értjük egymást, és nyugodtabbak a mindennapjaink.',
          author: 'Anonim ügyfél',
          role: 'Párkapcsolati tanácsadás',
        },
        {
          quote:
            'A szorongásom kezelhetővé vált. Megtanultam felismerni a trigger pontjaimat és egészségesen reagálni rájuk.',
          author: 'Anonim ügyfél',
          role: 'Szorongáskezelés',
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
      tagline: 'Pszichológus',
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
      title: 'Zsófia Czárth – Psychologist',
      description:
        'Psychologist. In a supportive, safe space, I help you process challenges and find inner balance.',
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
      eyebrow: 'Psychologist',
      headline: 'Space for Self-Discovery and Emotional Balance',
      subheadline:
        'In a warm, safe, and supportive space, I help you process challenges, understand your emotions, and reconnect with your inner resources.',
      cta: 'Request a Consultation',
      imageAlt: 'Zsófia Czárth - Psychologist',
    },
    video: {
      label: 'Introduction Video',
      description:
        'Learn about my psychological approach and what to expect from our work together in my short introduction video.',
      playAria: 'Play video',
    },
    services: {
      title: 'Areas of Practice',
      subtitle:
        'With personalized psychological support, I guide you on the path to change and self-understanding.',
      items: [
        {
          title: 'Individual Psychological Counseling',
          description:
            'I support self-discovery, processing inner conflicts, and personal growth.',
        },
        {
          title: 'Anxiety and Mood Disorders',
          description:
            'I help you understand and manage anxiety, depressive symptoms, and emotional difficulties.',
        },
        {
          title: 'Couples and Family Counseling',
          description:
            'In a safe space, we work on understanding relationship dynamics, improving communication, and rebuilding trust.',
        },
        {
          title: 'Stress and Crisis Management',
          description:
            'I provide practical tools for managing daily tension, crisis situations, and emotional overload.',
        },
      ],
    },
    testimonials: {
      title: 'Testimonials',
      subtitle: 'Shared with gratitude — anonymous experiences from my clients.',
      items: [
        {
          quote:
            "Zsófia's warm and understanding presence helped me finally speak honestly about myself. I trust myself again.",
          author: 'Anonymous Client',
          role: 'Individual Counseling',
        },
        {
          quote:
            'In couples sessions, we both felt heard. We finally understand each other, and our daily life is calmer.',
          author: 'Anonymous Client',
          role: 'Couples Counseling',
        },
        {
          quote:
            'My anxiety became manageable. I learned to recognize my triggers and respond to them in healthier ways.',
          author: 'Anonymous Client',
          role: 'Anxiety Support',
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
      tagline: 'Psychologist',
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
