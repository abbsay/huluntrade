const fs = require('fs');
const path = require('path');

const tailwindPath = path.join(__dirname, 'tailwind.config.js');
let twCode = fs.readFileSync(tailwindPath, 'utf8');

// I realized using 'choco' for candy toys glow is too dark (it's #3D2C23)! We need bright, vibrant colors for the glowing cards.
// I will quickly inject a couple of vibrant glow colors to Tailwind config specifically designed to match our 4 custom SVGs.
if (!twCode.includes('glowPink')) {
  twCode = twCode.replace(
    /colors: \{/,
    `colors: {
        glowPink: '#FF95B5',
        glowOrange: '#FFB703',
        glowPurple: '#9D4EDD',
        glowBlue: '#00B4D8',`
  );
  fs.writeFileSync(tailwindPath, twCode);
}

const indexTsxPath = path.join(__dirname, 'src', 'routes', 'index.tsx');
let code = fs.readFileSync(indexTsxPath, 'utf8');

// Map the cards to match their new SVG colors exactly so the ambient light blooms beautifully!
// Marshmallow: Soft Pink
// Jelly: Orange Amber
// Hard Candy: Deep Purple
// Candy Toy: Playful Blue

code = code.replace(/glow: 'from-strawberry to-transparent'/g, "glow: 'from-glowPink to-transparent'");
code = code.replace(/glow: 'from-lemon to-transparent'/g, "glow: 'from-glowOrange to-transparent'");
code = code.replace(/glow: 'from-mint to-transparent'/g, "glow: 'from-glowPurple to-transparent'");
code = code.replace(/glow: 'from-choco to-transparent'/g, "glow: 'from-glowBlue to-transparent'");

fs.writeFileSync(indexTsxPath, code);
console.log("Tailored radiant glow colors configured and applied.");
