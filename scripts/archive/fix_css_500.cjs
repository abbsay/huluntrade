const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'index.css');
let cssCode = fs.readFileSync(cssPath, 'utf8');

// I injected: 
// @layer base {
//   body {
//     @apply bg-cream text-mocha font-sans;
//   }
// ...
// THE BUG IS HERE!
// Tailwind PostCSS chokes heavily if you use custom colors in `@apply` that don't exist yet or are incorrectly structured.
// When I wrote `apply_apple_design.cjs` earlier, I WIPED OUT `cream`, `mocha` etc from `tailwind.config.js`!
// I changed it to `apple: { bg: '#FFFFFF', ... }`.
// BUT index.css still has `@apply bg-cream text-mocha;` !!!
// This is exactly why Vite PostCSS is vomiting a 500 error when trying to serve `index.css`.

// Solution: Remove the old @layer base injection entirely to let Tailwind compile normally under the Apple regime.

// Find the @layer block
const layerRegex = /@layer base\s*\{[\s\S]*?\}\n/g;
cssCode = cssCode.replace(layerRegex, '');

// Also let's clean the very bottom where I added `.bg-liquid` and scrollbars, these are fine but let's make sure there are no other @apply breaking rules.

fs.writeFileSync(cssPath, cssCode);

console.log("CSS @apply crash fixed!");
