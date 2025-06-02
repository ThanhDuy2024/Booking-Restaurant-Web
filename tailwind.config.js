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
        montserrat: ['Montserrat', 'sans-serif'],
        title: 'var(--font-title)',
        sub_title: 'var(--font-subTitle)',
        text: 'var(--font-text)',
      },
      fontSize: {
        title: 'var(--font-size-title)',
        sub_title: 'var(--font-size-subTitle)',
        text: 'var(--font-size-text)',
        mini_text: 'var(--font-size-mini-text)',
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
        },
        text: {
          DEFAULT: 'var(--text-color)',
        },
        border: {
          DEFAULT: 'var(--border-card)',
        },
        heading: 'var(--heading)',
        background: 'var(--background)',
      },
    },
  },
};
