/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Quicksand"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Baloo 2"', 'cursive'],
      },
      colors: {
        glowPink: '#FF95B5',
        glowOrange: '#FFB703',
        glowPurple: '#9D4EDD',
        glowBlue: '#00B4D8',
        cream: '#FCF8F3',      /* Vanilla Ice Cream base */
        choco: '#3D2C23',      /* Deep Dark Chocolate */
        mocha: '#705A4F',      /* Milk Chocolate */
        strawberry: '#FF6B9D', /* Brand Pink */
        mint: '#A0E8D5',
        lemon: '#FFE066',
        apple: { 
          bg: '#FCF8F3', card: '#FFFFFF', text: '#3D2C23', sub: '#705A4F', blue: '#FF6B9D' // Safe fallbacks
        }
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}