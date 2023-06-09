/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#449F3C"
      },
      fontFamily: {
        'barrio': ['Barrio', 'sans-serif']
      }
    },
  },
  plugins: [],
}

