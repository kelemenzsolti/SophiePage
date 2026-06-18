# Czárth Zsófia – Psychologist Website

Production-ready single-page homepage built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Features

- Bilingual support (Hungarian default, English) via React Context + `useTranslation` hook
- Responsive, mobile-first layout with warm earthy palette
- Hero section with integrated portrait image
- Services grid, testimonial slider, video placeholder, and contact footer

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Image Asset

The hero image is located at:

```
public/assets/hero.png
```

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, LanguageSwitcher
│   ├── sections/     # Hero, Video, Services, Testimonials, Footer
│   └── ui/           # Shared UI primitives
├── hooks/
│   └── useTranslation.ts
└── i18n/
    ├── LanguageContext.tsx
    └── translations.ts
```
