/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0a',
          800: '#171717',
          700: '#262626',
        },
        primary: {
          500: '#10b981', // Emerald
          600: '#059669',
        }
      }
    },
  },
  plugins: [],
}

