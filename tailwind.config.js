/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: '#C57B57',
        cream: '#FDFBF7',
        olive: '#848C72',
        charcoal: '#2F3E46',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px rgba(47, 62, 70, 0.08)',
        card: '0 8px 32px rgba(47, 62, 70, 0.1)',
      },
    },
  },
  plugins: [],
}
