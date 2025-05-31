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
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(1.2)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        slideInLeft: 'slideInLeft 0.8s ease-in forwards',
        zoomIn: 'zoomIn 1s ease-in forwards',
      },
    },
  },
};
