/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Grounds — warm paper tones, lightest to deepest.
        paper: 'rgb(var(--c-paper) / <alpha-value>)',
        shell: 'rgb(var(--c-shell) / <alpha-value>)',
        sand: 'rgb(var(--c-sand) / <alpha-value>)',

        // Text
        ink: 'rgb(var(--c-ink) / <alpha-value>)',

        forest: {
          DEFAULT: 'rgb(var(--c-forest) / <alpha-value>)',
          deep: 'rgb(var(--c-forest-deep) / <alpha-value>)',
          soft: 'rgb(var(--c-forest-soft) / <alpha-value>)',
        },
        terracotta: {
          DEFAULT: 'rgb(var(--c-terracotta) / <alpha-value>)',
          deep: 'rgb(var(--c-terracotta-deep) / <alpha-value>)',
          soft: 'rgb(var(--c-terracotta-soft) / <alpha-value>)',
        },
        ochre: 'rgb(var(--c-ochre) / <alpha-value>)',
      },

      fontFamily: {
        display: ['Fraunces', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },

      // Fluid editorial type scale. Sizes interpolate between 360px and ~1440px.
      fontSize: {
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.2em' }],
        'display-xl': [
          'clamp(2.75rem, 1.45rem + 5.6vw, 5.75rem)',
          { lineHeight: '0.97', letterSpacing: '-0.032em' },
        ],
        'display-lg': [
          'clamp(2.25rem, 1.5rem + 3.2vw, 4rem)',
          { lineHeight: '1.03', letterSpacing: '-0.028em' },
        ],
        'display-md': [
          'clamp(1.75rem, 1.35rem + 1.8vw, 2.75rem)',
          { lineHeight: '1.12', letterSpacing: '-0.022em' },
        ],
        'display-sm': [
          'clamp(1.3125rem, 1.15rem + 0.8vw, 1.75rem)',
          { lineHeight: '1.22', letterSpacing: '-0.016em' },
        ],
        quote: [
          'clamp(1.375rem, 1.05rem + 1.5vw, 2.25rem)',
          { lineHeight: '1.32', letterSpacing: '-0.018em' },
        ],
        lead: [
          'clamp(1.0625rem, 1.01rem + 0.28vw, 1.1875rem)',
          { lineHeight: '1.68' },
        ],
      },

      boxShadow: {
        soft: 'var(--shadow-soft)',
        card: 'var(--shadow-card)',
        lift: 'var(--shadow-lift)',
      },

      borderRadius: {
        card: 'var(--radius-card)',
        panel: 'var(--radius-panel)',
        arch: 'var(--radius-arch)',
      },

      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },

      maxWidth: {
        shell: '84rem',
        measure: '38rem',
      },

      backgroundImage: {
        grain: 'var(--texture-grain)',
      },
    },
  },
  plugins: [],
};
