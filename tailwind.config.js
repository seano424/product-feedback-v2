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
        fuschia: '#AD1FEA',
        'blue-dark': '#4661E6',
        'blue-light': '#62BCFA',
        orange: '#F49F85',
        red: '#D73737',
        gray: '#647196',
        'gray-light': '#F2F4FF',
        'gray-lightest': '#F7F8FD',
        'gray-dark': '#3A4374',
        'gray-darkest': '#4661E6',
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
