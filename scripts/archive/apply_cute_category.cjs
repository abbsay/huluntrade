const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'routes', 'category.$categoryId.tsx');
let code = fs.readFileSync(filePath, 'utf8');

/* ==============================================================
   1. STRIP SLATE & REPLACE WITH CANDY TOKENS (Cream/Choco/Mocha)
   ============================================================== */
code = code.replace(/text-slate-800/g, 'text-choco');
code = code.replace(/text-slate-700/g, 'text-choco/90');
code = code.replace(/text-slate-600/g, 'text-mocha');
code = code.replace(/text-slate-500/g, 'text-mocha/80');

code = code.replace(/border-slate-200\/50/g, 'border-choco/10');
code = code.replace(/border-slate-100/g, 'border-choco/5');

code = code.replace(/bg-slate-50/g, 'bg-cream');
code = code.replace(/bg-slate-800/g, 'bg-choco text-white'); // For the empty state button
code = code.replace(/text-blue-600/g, 'text-strawberry');
code = code.replace(/hover:bg-blue-600/g, 'hover:bg-mocha hover:shadow-mocha/30 jelly-highlight'); 

code = code.replace(/shadow-slate-200\/50/g, 'shadow-[0_20px_40px_-15px_rgba(61,44,35,0.06)]');
code = code.replace(/rgba\(100,116,139,0\.22\)/g, 'rgba(255,107,157,0.22)'); // Product card hover shadow

// Specific Typography Overhauls
code = code.replace(/font-black/g, 'font-black font-display');
code = code.replace(/font-extrabold/g, 'font-extrabold font-display');
code = code.replace(/font-bold/g, 'font-bold font-display');


/* ==============================================================
   2. FIX PADDING COLLISION & BACKGROUND GRADIENTS
   ============================================================== */
// The header gives back margin
code = code.replace(/pt-12 md:pt-20/g, 'pt-32 md:pt-40');

// Replace the old tailwind base backgrounds (from-pink-50... etc) with clean, brand-approved palettes
const oldGradientsRegex = /const getGradientByCat = \(id: string\) => \{[\s\S]*?\}\;/;
const newGradients = `const getGradientByCat = (id: string) => {
    switch(id) {
      case 'marshmallow': return 'bg-strawberry/5';
      case 'jelly': return 'bg-lemon/10';
      case 'hard_candy': return 'bg-mint/10';
      case 'candy_toy': return 'bg-blue-50';
      default: return 'bg-cream';
    }
  };`;
code = code.replace(oldGradientsRegex, newGradients);
// Replace how the gradient is used in <main>
code = code.replace(/bg-gradient-to-b \$\{getGradientByCat\(categoryId\)\}/, '${getGradientByCat(categoryId)}');


/* ==============================================================
   3. UPGRADE PRODUCT CARDS (Glassmorphic + Jelly Physics + Minimal SVGs)
   ============================================================== */
// Make the cards match ProductGrid
code = code.replace(/rounded-\[2rem\]/g, 'rounded-[2.5rem]');
code = code.replace(/rounded-2xl/g, 'rounded-[1.5rem]'); // For the inner image bg

// Subcategory Emojis to our 3D Candy SVG Logic
const oldSubcatIconsRegex = /const subcategoryIcons: Record<string, string> = \{[\s\S]*?\};/;
const newSubcatIcons = `const subcategoryIcons: Record<string, string> = {
    '35g_marshmallow': '/images/categories/minimal_marshmallow.svg',
    '50g_jelly': '/images/categories/minimal_jelly.svg',
    '48g_jelly': '/images/categories/minimal_jelly.svg',
    '8g_jelly': '/images/categories/minimal_jelly.svg',
    '35g_bear_candy': '/images/categories/minimal_hard_candy.svg',
    '15g_lollipop': '/images/categories/minimal_hard_candy.svg'
  };`;
code = code.replace(oldSubcatIconsRegex, newSubcatIcons);

// Now change how these icons are rendered
// 1. The small floating badge next to Hero header
code = code.replace(/\{subcategoryIcons\[activeSubcategories\[0\]\] \|\| '✨'\}/, `<img src={subcategoryIcons[activeSubcategories[0]] || '/images/categories/minimal_marshmallow.svg'} className="w-16 h-16 drop-shadow-md" alt="icon" />`);
// 2. The emoji icon before the section title
code = code.replace(/\{emojiIcon\}/, `<img src={emojiIcon} className="w-12 h-12 object-contain filter drop-shadow-md" alt="Subcategory icon" />`);


/* ==============================================================
   4. MAGNETIC BACK BUTTON & ORGANIC FLOATING BACKGROUND
   ============================================================== */
if (!code.includes('import Magnetic')) {
  code = code.replace("import { motion, Variants } from 'framer-motion'", "import { motion, Variants } from 'framer-motion'\nimport Magnetic from '../components/Magnetic'");
}
const oldLinkContainerRegex = /<motion\.div\s*whileHover=\{\{ y: -2, scale: 1\.04 \}\}\s*whileTap=\{\{ scale: 0\.96 \}\}\s*transition=\{\{ type: 'spring', stiffness: 400, damping: 10 \}\}\s*>/m;

code = code.replace(oldLinkContainerRegex, `<Magnetic>
            <motion.div
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >`);
code = code.replace(/Back to Categories'\}\s*<\/Link>\s*<\/motion\.div>\s*<\/motion\.div>/m, `Back to Categories'}\n              </Link>\n            </motion.div>\n            </Magnetic>\n          </motion.div>`);

// Fix the ugly absolute blur background blob
code = code.replace(
  /className="absolute top-0 right-0 w-\[800px\] h-\[800px\] bg-white opacity-40 rounded-full mix-blend-overlay filter blur-3xl -translate-y-1\/2 translate-x-1\/2 pointer-events-none"/,
  'className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-60 rounded-full mix-blend-overlay filter blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none"'
);

// Inner softly glowing blur inside Product cards on hover:
code = code.replace(
  /className="absolute inset-0 bg-white opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300"/g,
  'className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 blur-[30px] transition-opacity duration-300"'
);

fs.writeFileSync(filePath, code);
console.log("Category Page Overhauled!");
