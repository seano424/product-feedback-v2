module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        open: '"Open Sans", serif',
      },
      colors: {
        primary: '#ec008c',
        secondary: '#0070f3',
        light: '#F9FAFB',
        dark: '#030507',
        'neutral-superlight': '#F7F7F7',
        'dark-secondary': '#0e1217',
      },
      container: {
        center: true,
        padding: '1.5rem',
      },
    },
    debugScreens: {
      position: ['bottom', 'right'],
      prefix: 'screen: ',
    },
  },
  plugins: [
    require('tailwindcss-debug-screens'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}
