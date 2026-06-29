const fs = require('fs');
const path = require('path');

// ============================================
// 1. RESTORE CANDY TAILWIND CONFIG
// ============================================
const tailwindPath = path.join(__dirname, 'tailwind.config.js');
let twCode = fs.readFileSync(tailwindPath, 'utf8');

twCode = twCode.replace(
  /theme: \{\s*extend: \{[\s\S]*?plugins:/,
  `theme: {
    extend: {
      fontFamily: {
        sans: ['"Quicksand"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Baloo 2"', 'cursive'],
      },
      colors: {
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
  plugins:`
);
fs.writeFileSync(tailwindPath, twCode);

// ============================================
// 2. RESTORE PURE INDEX.CSS (NO CRASHES, JUST COLORS)
// ============================================
const cssPath = path.join(__dirname, 'src', 'index.css');
let cssCode = fs.readFileSync(cssPath, 'utf8');
cssCode = cssCode.replace(/background-color: var\(--color-bg\);/g, 'background-color: #FCF8F3;');
cssCode = cssCode.replace(/color: var\(--color-text\);/g, 'color: #705A4F;');
fs.writeFileSync(cssPath, cssCode);

// ============================================
// 3. MASSIVE RENAME: APPLE CLASSES -> CANDY CLASSES
// ============================================
const routesDir = path.join(__dirname, 'src', 'routes');
const filesToConvert = ['index.tsx', 'products.tsx', 'about.tsx', 'contact.tsx', '__root.tsx'];

filesToConvert.forEach(file => {
  const filePath = path.join(routesDir, file);
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');

  // Colors
  code = code.replace(/bg-apple-bg/g, 'bg-cream');
  code = code.replace(/bg-apple-card/g, 'bg-white');
  code = code.replace(/text-apple-text/g, 'text-choco');
  code = code.replace(/text-apple-sub/g, 'text-mocha');
  code = code.replace(/text-apple-blue/g, 'text-strawberry');
  code = code.replace(/bg-apple-blue/g, 'bg-strawberry');
  code = code.replace(/shadow-apple-[a-z]+/g, 'shadow-strawberry');
  code = code.replace(/bg-black([\s"'])/g, 'bg-choco$1');
  
  // Weights & Springs
  code = code.replace(/font-semibold/g, 'font-black font-display');
  code = code.replace(/damping: 30, mass: 1/g, 'damping: 12, mass: 0.8'); // Make animations bouncy again
  code = code.replace(/ease: \[0.16, 1, 0.3, 1\]/g, 'type: "spring", stiffness: 300, damping: 15');

  fs.writeFileSync(filePath, code);
});

console.log("✅ Candy Theme Colors & Global Typography Restored!");
