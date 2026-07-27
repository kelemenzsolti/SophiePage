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
    booking: {
      title: 'Időpontfoglalás',
      subtitle:
        'Az első kapcsolatfelvétel néhány egyszerű lépésben történik, hogy nyugodtan és biztonságosan indulhasson el a közös munka.',
      steps: [
        {
          label: '1. lépés',
          title: 'Kapcsolatfelvétel',
          description:
            'Töltse ki a kapcsolatfelvételi űrlapot vagy hívjon bizalommal, röviden megosztva, miben kérne támogatást.',
        },
        {
          label: '2. lépés',
          title: 'Időpont egyeztetése',
          description:
            'Közösen kiválasztjuk az Ön számára legmegfelelőbb időpontot és megbeszéljük a kereteket.',
        },
        {
          label: '3. lépés',
          title: 'Első konzultáció',
          description:
            'Az első alkalmon áttekintjük a hozott nehézségeket, a célokat és a lehetséges közös irányokat.',
        },
      ],
      card: {
        eyebrow: 'Kapcsolat',
        title: 'Foglaljon első alkalmat',
        description:
          'Ha készen áll az elindulásra, töltse ki az alábbi űrlapot, és rövid időn belül válaszolok.',
        phoneLabel: 'Telefon',
        phoneAction: 'Hívás indítása',
      },
      form: {
        subject: 'Időpontfoglalás',
        nameLabel: 'Név',
        namePlaceholder: 'Teljes név',
        emailLabel: 'E-mail',
        emailPlaceholder: 'pelda@email.hu',
        phoneLabel: 'Telefon',
        phonePlaceholder: '+36 30 123 4567',
        messageLabel: 'Üzenet',
        messagePlaceholder: 'Röviden írja le, miben kérne támogatást...',
        optional: 'opcionális',
        notProvided: 'Nincs megadva',
        fromName: 'Időpontfoglalás űrlap',
        submit: 'Üzenet küldése',
        sending: 'Küldés...',
        success: 'Köszönöm! Üzenetét megkaptam, hamarosan válaszolok.',
        error:
          'Az üzenet küldése nem sikerült. Kérjük, próbálja újra később, vagy hívjon telefonon.',
      },
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
      formLink: 'Kapcsolatfelvételi űrlap',
      phoneLabel: 'Telefon',
      phoneAction: 'Hívás indítása',
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
    booking: {
      title: 'Book a Session',
      subtitle:
        'The first contact happens in a few simple steps, so our work together can begin in a calm and safe way.',
      steps: [
        {
          label: 'Step 1',
          title: 'Get in Touch',
          description:
            'Fill in the contact form or call, and briefly share what kind of support you are looking for.',
        },
        {
          label: 'Step 2',
          title: 'Schedule a Time',
          description:
            'Together we choose a suitable time and go over the practical details of meeting.',
        },
        {
          label: 'Step 3',
          title: 'First Consultation',
          description:
            'In the first session, we review your current challenges, goals, and possible directions for our work together.',
        },
      ],
      card: {
        eyebrow: 'Contact',
        title: 'Arrange Your First Session',
        description:
          'If you feel ready to begin, fill in the form below and I will get back to you shortly.',
        phoneLabel: 'Phone',
        phoneAction: 'Start call',
      },
      form: {
        subject: 'Booking Request',
        nameLabel: 'Name',
        namePlaceholder: 'Full name',
        emailLabel: 'Email',
        emailPlaceholder: 'you@example.com',
        phoneLabel: 'Phone',
        phonePlaceholder: '+36 30 123 4567',
        messageLabel: 'Message',
        messagePlaceholder: 'Briefly describe what kind of support you are looking for...',
        optional: 'optional',
        notProvided: 'Not provided',
        fromName: 'Booking form',
        submit: 'Send Message',
        sending: 'Sending...',
        success: 'Thank you! Your message has been sent. I will get back to you soon.',
        error:
          'Your message could not be sent. Please try again later or call by phone.',
      },
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
      formLink: 'Contact form',
      phoneLabel: 'Phone',
      phoneAction: 'Start call',
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
