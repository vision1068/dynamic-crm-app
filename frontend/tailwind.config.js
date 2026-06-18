/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dynamics: {
          blue: '#0078d4',
          'blue-dark': '#005a9e',
          'blue-light': '#deecf9',
          'blue-hover': '#106ebe',
          navy: '#243a5e',
          gray: '#f3f2f1',
          'gray-dark': '#605e5c',
          'gray-border': '#edebe9',
        }
      }
    },
  },
  plugins: [],
}
