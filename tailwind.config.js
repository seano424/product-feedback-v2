module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        jost: '"Jost", serif',
      },
      colors: {
        fuschia: '#AD1FEA',
        blue: '#4661E6',
        'blue-dark': '#4661E6',
        'blue-navy': '#373F68',
        'blue-light': '#62BCFA',
        orange: '#F49F85',
        red: '#D73737',
        gray: '#647196',
        'gray-light': '#F2F4FF',
        'gray-lightest': '#F7F8FD',
        'gray-dark': '#3A4374',
      },
      container: {
        center: true,
        padding: '2.5rem',
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
