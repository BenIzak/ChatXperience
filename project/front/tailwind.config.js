/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      'primary': 'rgb(var(--engineering-orange))',
      'engineering-orange-light': 'rgb(var(--engineering-orange-light))',
      'engineering-orange-dark': 'rgb(var(--engineering-orange-dark))',
      'engineering-orange-darker': 'rgb(var(--engineering-orange-darker))',

      // Ajoute les autres couleurs comme suit
      honeydew: 'rgb(var(--honeydew))',
      'cambridge-blue': 'rgb(var(--cambridge-blue))',
      'british-racing-green': 'rgb(var(--british-racing-green))',
      night: 'rgb(var(--night))',
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('flowbite/plugin'),
    require("tailgrids/plugin")
  ],
}