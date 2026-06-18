/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'crm-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#0078d4',
          600: '#106ebe',
          700: '#005a9e',
          800: '#004578',
          900: '#002c4e',
        }
      }
    },
  },
  plugins: [],
}
