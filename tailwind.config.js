/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2c5f2d',
        'primary-dark': '#234d24',
        secondary: '#8b9b5f',
        'secondary-dark': '#7a8a54',
        accent: '#c19a6b',
        'barn-red': '#8b3a3a',
        'dark-bg': '#2d2520',
        'light-bg': '#d4c4a8',
        'card-bg': '#f5f0e8',
        'body-bg': '#b8a98a',
      },
    },
  },
  plugins: [],
}

