/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        'lvrg-green': '#37b34a',
        'lvrg-green-2': '#61ce70'
      },
      fontFamily: {
        nunito: ['Nunito Sans', 'open-sans']
      }
    }
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms')
  ]
}
