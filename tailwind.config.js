/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: 'rgb(var(--color-forest) / <alpha-value>)',
        terracotta: 'rgb(var(--color-terracotta) / <alpha-value>)',
        ochre: 'rgb(var(--color-ochre) / <alpha-value>)',
        cream: 'rgb(var(--color-cream) / <alpha-value>)',
        'dark-slate': 'rgb(var(--color-slate) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        card: 'var(--shadow-card)',
      },
      borderRadius: {
        card: 'var(--radius-card)',
        'card-lg': 'var(--radius-card-lg)',
        pill: 'var(--radius-pill)',
      },
      borderColor: {
        subtle: 'var(--border-subtle)',
        muted: 'var(--border-default)',
      },
    },
  },
  plugins: [],
}