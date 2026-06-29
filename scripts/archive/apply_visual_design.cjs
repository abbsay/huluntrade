const fs = require('fs');
const path = require('path');

/* -------------------------------------------------------------------------- */
/* 1. Tailored Semantic Tailwind Configuration                                  */
/* -------------------------------------------------------------------------- */
const tailwindPath = path.join(__dirname, 'tailwind.config.js');
let twCode = fs.readFileSync(tailwindPath, 'utf8');

// Inject our appetizing colors and typography into Tailwind
const customTheme = `
      colors: {
        cream: '#FCF8F3',      /* Vanilla Ice Cream base */
        choco: '#3D2C23',      /* Deep Dark Chocolate for strong text */
        mocha: '#705A4F',      /* Light Milk Chocolate for body text */
        strawberry: '#FF6B9D', /* Brand Pink */
        mint: '#A0E8D5',
      },
      fontFamily: {
        display: ['"Baloo 2"', 'cursive'], /* Bouncy, fun, bold */
        sans: ['"Quicksand"', 'ui-sans-serif', 'system-ui', 'sans-serif'], /* Clean, round, modern */
      },`;

if (!twCode.includes('cream:')) {
  twCode = twCode.replace(/extend:\s*\{/, `extend: {\n${customTheme}`);
  fs.writeFileSync(tailwindPath, twCode);
}


/* -------------------------------------------------------------------------- */
/* 2. Global CSS Injection for Typography Hierarchy                           */
/* -------------------------------------------------------------------------- */
const cssPath = path.join(__dirname, 'src', 'index.css');
let cssCode = fs.readFileSync(cssPath, 'utf8');

if (!cssCode.includes('@apply bg-cream')) {
  const typographyCSS = `
@layer base {
  body {
    @apply bg-cream text-mocha font-sans;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-display text-choco tracking-tight;
  }
  /* Ensure bold stuff gets our display font to make it pop */
  strong, .font-black, .font-extrabold {
    @apply font-display;
  }
}
`;
  // Prepend after tailwind imports
  cssCode = cssCode.replace(/@tailwind utilities;/, `@tailwind utilities;\n${typographyCSS}`);
  fs.writeFileSync(cssPath, cssCode);
}


/* -------------------------------------------------------------------------- */
/* 3. Sweeping Class Replacements (Slate -> Choco/Mocha/Cream)                */
/* -------------------------------------------------------------------------- */
function replaceCorporateWithCandy(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Colors
  content = content.replace(/text-slate-800/g, 'text-choco');
  content = content.replace(/text-slate-700/g, 'text-choco/80');
  content = content.replace(/text-slate-600/g, 'text-mocha');
  content = content.replace(/text-slate-500/g, 'text-mocha/80');
  content = content.replace(/text-slate-400/g, 'text-mocha/60');
  
  content = content.replace(/bg-slate-50/g, 'bg-cream');
  content = content.replace(/border-slate-100/g, 'border-choco/5');
  content = content.replace(/border-slate-200/g, 'border-choco/10');
  
  // Specific typo boosters
  content = content.replace(/font-black/g, 'font-black font-display');
  // Typography loosening for readability
  content = content.replace(/leading-relaxed/g, 'leading-[1.8]');

  fs.writeFileSync(filePath, content);
}

replaceCorporateWithCandy(path.join(__dirname, 'src', 'routes', '__root.tsx'));
replaceCorporateWithCandy(path.join(__dirname, 'src', 'routes', 'index.tsx'));

console.log("🎨 Visual DNA Overhauled: Goodbye SaaS Slate, Hello Chocolate & Vanilla!");
