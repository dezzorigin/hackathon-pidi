/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- M-nya huruf besar. INI YANG BIKIN LIGHT MODE LU JALAN!
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}