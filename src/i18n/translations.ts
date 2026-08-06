export type Language = 'hu' | 'en';

export type TranslationKeys = (typeof translations)[Language];

export const translations = {
  hu: {
    meta: {
      title: 'Czárth Zsófia – Iskolapszichológus & Sportpszichológiai Tanácsadó',
      description:
        'Iskolapszichológus és sportpszichológiai tanácsadó. Segítek a gyermekek, fiatalok, szülők és sportolók mentális felkészülésében és elakadásaikban.',
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
      eyebrow: 'Iskolapszichológus | Sportpszichológiai Tanácsadó',
      headline: 'Támogatás a fejlődésben, fókusz a teljesítményben.',
      subheadline:
        'Segítek a gyermekeknek és fiataloknak leküzdeni az iskolai elakadásokat, a szülőknek megtalálni az egyensúlyt, a sportolóknak pedig kihozni magukból a maximális mentális teljesítményt.',
      cta: 'Időpontfoglalás 1 perc alatt',
      imageAlt: 'Czárth Zsófia - Iskolapszichológus és Sportpszichológus portréja',
    },
    profile: {
      eyebrow: 'Rólam',
      name: 'Czárth Zsófia',
      role: 'Iskolapszichológus & Sportpszichológiai Tanácsadó',
      imageAlt:
        'Czárth Zsófia portréja – mosolygó pszichológus modern, meleg hangulatú környezetben',
      paragraphs: [
        'Iskolapszichológusként a 6–18 éves korosztállyal, pedagógusokkal és szülőkkel dolgozom nap mint nap. Ismerem a tanulási gátak, a kortársi kapcsolatok és a serdülőkori váltások sajátosságait.',
        'Sportpszichológiai szakosodásom révén kiemelt figyelmet fordítok a mentális felkészítésre, a versenynyomás kezelésére és a teljesítményszorongás kioldására – legyen szó fiatal tehetségekről vagy felnőtt sportolókról.',
        'Célom, hogy közvetlen, érthető és gyakorlatias eszközöket adjak a hozzám fordulók kezébe a mindennapi és a sportbeli sikerekhez.',
      ],
      highlights: [
        'Gyermek-, serdülő- és szülőkonzultáció (1–12. osztály)',
        'Sportpszichológiai felkészítés & Teljesítményszorongás',
        'Online konzultáció',
      ],
    },
    video: {
      label: 'Bemutatkozó videó',
      description:
        'Ismerd meg a munkamódszeremet, valamint a diákokkal, szülőkkel és sportolókkal való közös munka menetét.',
      playAria: 'Videó lejátszása',
    },
    services: {
      title: 'Miben tudok segíteni?',
      subtitle:
        'Célzott pszichológiai támogatás az iskolai évektől a sportteljesítményig.',
      items: [
        {
          title: 'Iskolapszichológia & Gyermek tanácsadás',
          description:
            'Tanulási gátak, motivációhiány, kortárs kapcsolatok és iskolai beilleszkedési nehézségek kezelése (1–12. osztály).',
        },
        {
          title: 'Sportpszichológia & Mentáltréning',
          description:
            'Versenynyomás és teljesítményszorongás kezelése, mentális fókusz, önbizalomépítés és sérülés utáni visszatérés.',
        },
        {
          title: 'Serdülőkori & Fiatal felnőtt elakadások',
          description:
            'Identitáskeresés, pályaválasztási stressz, önértékelési zavarok és érzelemszabályozás támogatása.',
        },
        {
          title: 'Szülői konzultáció & Családi dinamikák',
          description:
            'Támogató beszélgetések szülőknek a nevelési elakadásokról, a határok meghúzásáról és a családi egyensúlyról.',
        },
      ],
    },
    booking: {
      title: 'Időpontfoglalás',
      subtitle:
        'Gyors, egyszerű és átlátható kapcsolatfelvétel diákoknak, szülőknek és sportolóknak egyaránt.',
      steps: [
        {
          label: '1. lépés',
          title: 'Kapcsolatfelvétel',
          description:
            'Válassz időpontot a naptárban, és jelöld meg, hogy iskolai, szülői vagy sportpszichológiai témában érkezel.',
        },
        {
          label: '2. lépés',
          title: 'Részletek egyeztetése',
          description:
            'Rövid időn belül visszaigazolom a foglalást, és átbeszéljük a gyakorlati kereteket (kiskorú esetén a szülői jelenlétet).',
        },
        {
          label: '3. lépés',
          title: 'Első konzultáció',
          description:
            'Feltérképezzük az aktuális helyzetet, megfogalmazzuk a célokat, és felépítjük a közös munka menetét.',
        },
      ],
      card: {
        eyebrow: 'Kapcsolat',
        title: 'Foglalj első alkalmat',
        description:
          'Töltsd ki az alábbi űrlapot, és 24 órán belül felveszem veled a kapcsolatot.',
        phoneLabel: 'Telefon',
        phoneAction: 'Hívás indítása',
      },
      form: {
        subject: 'Időpontfoglalás',
        nameLabel: 'Név',
        namePlaceholder: 'Teljes név (vagy Szülő neve)',
        emailLabel: 'E-mail',
        emailPlaceholder: 'pelda@email.hu',
        phoneLabel: 'Telefon',
        phonePlaceholder: '+36 30 123 4567',
        messageLabel: 'Üzenet',
        messagePlaceholder: 'Röviden írd le, miben kértek támogatást (pl. tanulás, szorongás, sport)...',
        optional: 'opcionális',
        notProvided: 'Nincs megadva',
        fromName: 'Időpontfoglalás űrlap',
        submit: 'Küldés',
        sending: 'Küldés...',
        success: 'Köszönöm! Az üzenetet megkaptam, hamarosan válaszolok.',
        error:
          'Az üzenet küldése nem sikerült. Kérlek próbáld újra, vagy hívj telefonon.',
      },
    },
    testimonials: {
      title: 'Klienseim & Szülők tapasztalatai',
      subtitle: 'Néhány gondolat diákoktól, szülőktől és sportolóktól.',
      items: [
        {
          quote:
            'Zsófia segített a fiamnak leküzdeni a dolgozatok előtti blokkokat. Sokkal magabiztosabb az iskolában, és a jegyei is javultak.',
          author: 'Egy 7. osztályos diák anyukája',
          role: 'Szülői konzultáció',
        },
        {
          quote:
            'A versenyek előtt mindig leblokkoltam a tét miatt. A közös mentáltréning után végre úgy tudok teljesíteni, ahogy az edzéseken.',
          author: 'Anonim sportoló',
          role: 'Sportpszichológia',
        },
        {
          quote:
            'A gimis felvételi és a pályaválasztási stressz alatt Zsófia volt a legjobb támaszom. Megtanultam kezelni a szorongásomat.',
          author: 'Középiskolás diák',
          role: 'Egyéni tanácsadás',
        },
        {
          quote:
            'Közvetlen, fiatalos hangulatú ülések, ahol nem éreztem úgy, hogy ki lennék oktatva. Nagyon sokat segített a továbblépésben.',
          author: 'Anonim fiatal felnőtt',
          role: 'Életvezetési tanácsadás',
        },
      ],
    },
    footer: {
      tagline: 'Iskolapszichológus | Sportpszichológiai Tanácsadó',
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
      title: 'Zsófia Czárth – School Psychologist & Sport Psychology Consultant',
      description:
        'School Psychologist and Sport Psychology Consultant. Supporting children, adolescents, parents, and athletes in overcoming mental hurdles.',
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
      eyebrow: 'School Psychologist | Sport Psychology Consultant',
      headline: 'Support for growth, focus for peak performance.',
      subheadline:
        'Helping children and teens navigate school challenges, guiding parents toward balance, and empowering athletes to reach their mental potential.',
      cta: 'Book a Session in 1 min',
      imageAlt: 'Zsófia Czárth - School and Sport Psychologist Portrait',
    },
    profile: {
      eyebrow: 'About Me',
      name: 'Zsófia Czárth',
      role: 'School Psychologist & Sport Psychology Consultant',
      imageAlt:
        'Portrait of Zsófia Czárth – smiling psychologist in a warm, modern office setting',
      paragraphs: [
        'As a school psychologist, I work daily with students (grades 1–12), teachers, and parents. I specialize in learning obstacles, peer dynamics, and adolescent transitions.',
        'With specialized training in sport psychology, I focus on mental preparation, coping with competitive pressure, and overcoming performance anxiety for both young talents and adult athletes.',
        'My goal is to provide accessible, practical tools for personal development, academic growth, and athletic success.',
      ],
      highlights: [
        'Child, teen & parent counseling (Grades 1–12)',
        'Sport psychology, mental training & performance anxiety',
        'Online sessions',
      ],
    },
    video: {
      label: 'Introduction Video',
      description:
        'Learn about my approach and what to expect when working together as a student, parent, or athlete.',
      playAria: 'Play video',
    },
    services: {
      title: 'Areas of Practice',
      subtitle:
        'Targeted psychological support from academic years to athletic achievements.',
      items: [
        {
          title: 'School Psychology & Child Counseling',
          description:
            'Addressing learning barriers, lack of motivation, peer relationships, and school integration (Grades 1–12).',
        },
        {
          title: 'Sport Psychology & Mental Training',
          description:
            'Managing competition pressure, performance anxiety, building confidence, and post-injury mental recovery.',
        },
        {
          title: 'Adolescent & Youth Transitions',
          description:
            'Navigating identity formation, career choices, self-esteem challenges, and emotional regulation.',
        },
        {
          title: 'Parent Consultation & Family Dynamics',
          description:
            'Supportive guidance for parents on developmental milestones, setting boundaries, and family harmony.',
        },
      ],
    },
    booking: {
      title: 'Booking',
      subtitle:
        'Quick, clear, and easy scheduling for students, parents, and athletes.',
      steps: [
        {
          label: 'Step 1',
          title: 'Get in Touch',
          description:
            'Choose a slot in the calendar and indicate whether you are booking for school support, parenting, or sports.',
        },
        {
          label: 'Step 2',
          title: 'Confirm Details',
          description:
            'I will confirm your request shortly and share practical details (including parental presence for minors).',
        },
        {
          label: 'Step 3',
          title: 'First Consultation',
          description:
            'We assess your current situation, set meaningful goals, and map out our plan together.',
        },
      ],
      card: {
        eyebrow: 'Contact',
        title: 'Book Your First Session',
        description:
          'Fill in the form below and I will get back to you within 24 hours.',
        phoneLabel: 'Phone',
        phoneAction: 'Start call',
      },
      form: {
        subject: 'Booking Request',
        nameLabel: 'Name',
        namePlaceholder: 'Full name (or Parent name)',
        emailLabel: 'Email',
        emailPlaceholder: 'you@example.com',
        phoneLabel: 'Phone',
        phonePlaceholder: '+36 30 123 4567',
        messageLabel: 'Message',
        messagePlaceholder: 'Briefly describe your goals (e.g. school anxiety, sports performance, parenting)...',
        optional: 'optional',
        notProvided: 'Not provided',
        fromName: 'Booking form',
        submit: 'Send Message',
        sending: 'Sending...',
        success: 'Thank you! Your message has been sent. I will reply soon.',
        error:
          'Your message could not be sent. Please try again or call by phone.',
      },
    },
    testimonials: {
      title: 'Client & Parent Feedback',
      subtitle: 'Reflections from students, parents, and athletes I have worked with.',
      items: [
        {
          quote:
            'Zsófia helped my son overcome his test-taking anxiety. He is much more confident at school, and his grades improved.',
          author: 'Mother of a 7th Grader',
          role: 'Parent Consultation',
        },
        {
          quote:
            'I used to freeze up before competitions. After our mental training sessions, I can finally perform under pressure just like in practice.',
          author: 'Anonymous Athlete',
          role: 'Sport Psychology',
        },
        {
          quote:
            'During high school finals and career choices, Zsófia was my greatest support. I learned to manage my anxiety effectively.',
          author: 'High School Student',
          role: 'Individual Counseling',
        },
        {
          quote:
            'A modern, friendly space where I never felt judged. It helped me tremendously during a tough transition period.',
          author: 'Anonymous Young Adult',
          role: 'Youth Counseling',
        },
      ],
    },
    footer: {
      tagline: 'School Psychologist | Sport Psychology Consultant',
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