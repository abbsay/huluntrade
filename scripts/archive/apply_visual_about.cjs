const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'routes', 'about.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Structural Imports
if (!code.includes('import Magnetic from')) {
  code = code.replace(
    "import { useI18n } from '../i18n'",
    "import { useI18n } from '../i18n'\nimport Magnetic from '../components/Magnetic'"
  );
}

// 2. Base Wrappers & Colors (Slate/Pink 50 -> Cream/Choco/Mocha)
code = code.replace(/bg-gradient-to-b from-purple-50 via-white to-pink-50/g, 'bg-cream'); // Our new base
code = code.replace(/text-slate-700/g, 'text-mocha/90'); // Body text
code = code.replace(/text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 drop-shadow-sm/g, 'text-choco drop-shadow-md'); // Title
code = code.replace(/bg-gradient-to-r from-purple-400 to-pink-400/g, 'bg-choco'); // Title Separator Line
code = code.replace(/text-pink-600/g, 'text-strawberry'); // Quote Text
code = code.replace(/bg-gradient-to-r from-purple-50 to-pink-50/g, 'bg-white'); // Quote Card Bg
code = code.replace(/border-pink-100/g, 'border-choco/10'); // Quote Card Border
code = code.replace(/text-pink-500/g, 'text-strawberry'); // First Letter Text Color
code = code.replace(/shadow-pink-500\/10/g, 'shadow-[0_20px_40px_-15px_rgba(61,44,35,0.06)]'); // Main Card Box-shadow

// 3. Typographical Polish (Font Weights & Faces)
code = code.replace(/prose-lg md:prose-xl prose-pink max-w-none text-slate-700 leading-relaxed font-medium/g, 'text-lg md:text-xl text-mocha leading-[2] font-sans font-medium space-y-8 tracking-wide');
code = code.replace(/first-letter:font-black/g, 'first-letter:font-black first-letter:font-display');
code = code.replace(/font-bold/g, 'font-bold font-display');

// 4. Parallax Hero Setup (Same physics as index.tsx for consistency)
if (!code.includes('const { scrollYProgress } = useScroll();')) {
  code = code.replace(
    "function About() {",
    "import { useScroll, useTransform } from 'framer-motion'\n\nfunction About() {\n  const { scrollYProgress } = useScroll();"
  );
}

// 5. Replace floatingemojis with robust ZeroGravity System internally
const oldFloatingRegex = /\{\/\* Framer Motion floating background decorations \*\/\}[\s\S]*?\(\)\)\}/;
const zeroGravityCode = `{/* Zero Gravity Floating Sweets Layer (Parallax Setup) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -500]), rotate: useTransform(scrollYProgress, [0, 1], [0, -90]) }} className="absolute top-[10%] left-[10%] opacity-40 mix-blend-multiply blur-[2px] scale-[2]">
          <span className="text-6xl filter drop-shadow-xl">🍡</span>
        </motion.div>
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -800]), x: useTransform(scrollYProgress, [0, 1], [0, 200]), rotate: useTransform(scrollYProgress, [0, 1], [0, 180]) }} className="absolute top-[50%] right-[5%] opacity-30 mix-blend-multiply blur-[4px] scale-[2.5]">
          <span className="text-7xl filter drop-shadow-xl">🍬</span>
        </motion.div>
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -400]), x: useTransform(scrollYProgress, [0, 1], [0, -100]), rotate: useTransform(scrollYProgress, [0, 1], [0, 120]) }} className="absolute bottom-[10%] left-[8%] opacity-20 mix-blend-multiply blur-[1px] scale-150">
          <span className="text-5xl filter drop-shadow-xl">🍭</span>
        </motion.div>
      </div>`;
code = code.replace(oldFloatingRegex, zeroGravityCode);

// 6. Magnetic Title wrapper
const oldTitleRegex = /<motion\.h1[\s\S]*?<\/motion\.h1>/;
if (code.match(oldTitleRegex) && !code.includes('<Magnetic><motion.h1')) {
  const match = code.match(oldTitleRegex)[0];
  code = code.replace(oldTitleRegex, `<Magnetic>\n              ${match}\n            </Magnetic>`);
}

// 7. Update Liquid Backgrounds on the card
code = code.replace(
  /bg-pink-100 rounded-full mix-blend-multiply opacity-50 blur-3xl -z-10/g,
  'bg-strawberry/20 bg-liquid mix-blend-multiply opacity-60 blur-[60px] -z-10'
);

fs.writeFileSync(filePath, code);
console.log("About Us Page Reborn!");
