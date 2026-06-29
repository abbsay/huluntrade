const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'routes', 'product.$productId.tsx');
let code = fs.readFileSync(filePath, 'utf8');

/* ==============================================================
   1. STRIP SLATE & REPLACE WITH CANDY TOKENS (Cream/Choco/Mocha)
   ============================================================== */
code = code.replace(/text-slate-800/g, 'text-choco');
code = code.replace(/text-slate-700/g, 'text-choco/90');
code = code.replace(/text-slate-600/g, 'text-mocha');
code = code.replace(/text-slate-500/g, 'text-mocha/80');
code = code.replace(/text-slate-400/g, 'text-mocha/60');

code = code.replace(/border-slate-200\/50/g, 'border-choco/10');
code = code.replace(/border-slate-100\/80/g, 'border-choco/5');
code = code.replace(/border-slate-100/g, 'border-choco/5');
code = code.replace(/border-slate-50/g, 'border-choco/5');

code = code.replace(/bg-slate-50/g, 'bg-cream');
code = code.replace(/text-blue-600/g, 'text-strawberry');

code = code.replace(/shadow-slate-200\/50/g, 'shadow-[0_20px_40px_-15px_rgba(61,44,35,0.06)]');
code = code.replace(/shadow-xl border border-slate-100/g, 'shadow-[0_20px_40px_-15px_rgba(61,44,35,0.06)] border border-choco/5');

// Typography Polish
code = code.replace(/font-black/g, 'font-black font-display');
code = code.replace(/font-extrabold/g, 'font-extrabold font-display');
code = code.replace(/font-bold/g, 'font-bold font-sans');


/* ==============================================================
   2. FIX PADDING COLLISION & BACKGROUND GRADIENTS
   ============================================================== */
// Fix Header Collision
code = code.replace(/py-12 md:py-20/g, 'pt-32 md:pt-40 pb-20');

// Replace standard tailwind gradients with brand color palettes.
const oldThemeColorsRegex = /const getThemeColors = \(catId\?: string\) => \{[\s\S]*?\}\;/;
const newThemeColors = `const getThemeColors = (catId?: string) => {
    switch (catId) {
      case 'marshmallow': return { bg: 'bg-strawberry/5', accent: 'text-strawberry', btn: 'bg-strawberry', shadow: 'shadow-strawberry/30', imgBg: 'bg-strawberry/5' };
      case 'jelly': return { bg: 'bg-lemon/10', accent: 'text-choco', btn: 'bg-lemon text-choco', shadow: 'shadow-lemon/30', imgBg: 'bg-lemon/10' };
      case 'hard_candy': return { bg: 'bg-mint/10', accent: 'text-mint', btn: 'bg-mint text-choco', shadow: 'shadow-mint/30', imgBg: 'bg-mint/5' };
      case 'candy_toy': return { bg: 'bg-blue-50', accent: 'text-blue-500', btn: 'bg-blue-400', shadow: 'shadow-blue-400/30', imgBg: 'bg-blue-50' };
      default: return { bg: 'bg-cream', accent: 'text-strawberry', btn: 'bg-strawberry', shadow: 'shadow-strawberry/30', imgBg: 'bg-cream' };
    }
  };`;
code = code.replace(oldThemeColorsRegex, newThemeColors);

code = code.replace(/bg-gradient-to-b \$\{theme\.bg\}/, '${theme.bg}');


/* ==============================================================
   3. UPGRADE PRODUCT PRESENTATION (Glassmorphic + Minimal SVGs)
   ============================================================== */
// Add Magnetic wrapper
if (!code.includes('import Magnetic')) {
  code = code.replace("import { motion } from 'framer-motion'", "import { motion } from 'framer-motion'\nimport Magnetic from '../components/Magnetic'");
}
const oldLinkContainerRegex = /<motion\.button\n\s*onClick=\{.*?\}\n\s*className="inline-flex.*?">\s*<span.*?<\/span>.*?Back.*?\n\s*<\/motion\.button>/;

code = code.replace(oldLinkContainerRegex, `<Magnetic>
            <motion.button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md text-mocha shadow-sm border border-choco/5 font-bold text-sm w-fit"
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 8px 24px rgba(61,44,35,0.06)' }}
              whileTap={springTap}
              transition={springTransition}
            >
              <span className="rtl:rotate-180">←</span> {t('product_details.back_to_categories', 'Back')}
            </motion.button>
          </Magnetic>`);

// Fix the ugly absolute blur background blob
code = code.replace(
  /className="absolute top-0 right-0 w-\[600px\] h-\[600px\] bg-white opacity-60 rounded-full mix-blend-overlay filter blur-3xl -translate-y-1\/3 translate-x-1\/3 pointer-events-none"/,
  'className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-70 rounded-full mix-blend-overlay filter blur-[80px] -translate-y-1/3 translate-x-1/3 pointer-events-none"'
);
code = code.replace(
  /className="absolute bottom-0 left-0 w-\[400px\] h-\[400px\] bg-white opacity-40 rounded-full mix-blend-overlay filter blur-3xl translate-y-1\/3 -translate-x-1\/3 pointer-events-none"/,
  'className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-white opacity-50 rounded-full mix-blend-overlay filter blur-[60px] pointer-events-none"'
);

// Enhance Image Card Container
code = code.replace(/className="relative aspect-square w-full bg-white\/80 backdrop-blur-sm rounded-\[3rem\] shadow-xl shadow-slate-200\/50 border border-white flex items-center justify-center p-8 md:p-12 overflow-hidden"/, 'className={`relative aspect-square w-full ${theme.imgBg} backdrop-blur-sm rounded-[3rem] shadow-[0_20px_40px_-15px_rgba(61,44,35,0.06)] border border-white flex items-center justify-center p-8 md:p-14 overflow-hidden`}');

// Swap Emojis for 3D SVGs natively generated
code = code.replace(/<span className="text-3xl filter drop-shadow-sm">🍬<\/span>/, '<img src="/images/categories/minimal_jelly.svg" className="w-10 h-10 object-contain drop-shadow-sm" alt="sweet" />');
// Replace the feature bullet
code = code.replace(/<span className="text-pink-400 font-bold mt-0\.5">•<\/span>/g, '<img src="/images/categories/minimal_marshmallow.svg" className="w-4 h-4 object-contain mt-1 filter drop-shadow-sm" />');

// Feature Card Tweak
code = code.replace(/<div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl">⚖️<\/div>/g, '<div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xl"><img src="/images/categories/minimal_hard_candy.svg" className="w-6 h-6 object-contain"/></div>');
code = code.replace(/<div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl">📦<\/div>/g, '<div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xl"><img src="/images/categories/minimal_toy.svg" className="w-6 h-6 object-contain"/></div>');


/* ==============================================================
   4. JELLY HIGHLIGHT CTA & POLISH
   ============================================================== */
code = code.replace(/<span className="mr-2">✉️<\/span>/g, '');
code = code.replace(/className={\`flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg \$\{theme\.btn\} \$\{theme\.shadow\}\`}/, 'className={`flex items-center justify-center w-full sm:w-auto px-10 py-5 rounded-full font-black text-lg shadow-xl jelly-highlight transition-all duration-300 ${theme.btn} ${theme.shadow}`}');

fs.writeFileSync(filePath, code);
console.log("Product Page Overhauled!");
