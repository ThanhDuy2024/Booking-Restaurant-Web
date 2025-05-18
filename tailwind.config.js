module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['media', 'class'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        monsterat: ['Monsterat', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        background: 'hsl(var(--background))',
        fontFamily: {
          title: 'var(--font-title)',
          mini_title: 'var(--font-mini-title)',
          text: 'var(--font-text)',
        },
        fontSize: {
          title: 'var(--font-size-title)',
          mini_title: 'var(--font-size-mini-title)',
          text: 'var(--font-size-text)',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};