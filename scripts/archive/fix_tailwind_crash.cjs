const fs = require('fs');
const path = require('path');

const twPath = path.join(__dirname, 'tailwind.config.js');
let twCode = fs.readFileSync(twPath, 'utf8');

// I see the root cause for the 500 error!
// IN TAILWIND.CONFIG.JS:
//       letterSpacing: { ... }
//     },
//       fontFamily: {
//         display: ['"Baloo 2"', 'cursive'], /* Bouncy, fun, bold */
//         sans: ['"Quicksand"', 'ui-sans-serif', 'system-ui', 'sans-serif'], /* Clean, round, modern */
//       },},
//   },

// I injected my Apple config string OVER the top of the tailwind extend block but left a dangling trailing `},` and duplicate keys which completely broke the Javascript AST of `tailwind.config.js`!
// When Vite boots, it tells PostCSS to compile CSS. PostCSS runs Tailwind. Tailwind tries to parse `tailwind.config.js` and crashes with a syntax error because of the unbalanced brackets.
// This causes PostCSS to crash, which ripples back up Vite's pipeline as a 500 error for `index.css`.

const pristineTailwind = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', 'sans-serif'],
      },
      colors: {
        apple: {
          bg: '#FFFFFF',
          card: '#F5F5F7',
          text: '#1D1D1F',
          sub: '#86868B',
          blue: '#2997FF', // Standard iOS blue
        }
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      }
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}`;

fs.writeFileSync(twPath, pristineTailwind);
console.log("Tailwind Config syntax restored.");
