const fs = require('fs');
const path = require('path');

/* -------------------------------------------------------------------------- */
/* 1. Create Magnetic Component                                               */
/* -------------------------------------------------------------------------- */
const magneticPath = path.join(__dirname, 'src', 'components', 'Magnetic.tsx');
const magneticCode = `import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Apply 30% pull factor
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ position: 'relative', display: 'inline-flex' }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 300, damping: 15, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
`;
fs.writeFileSync(magneticPath, magneticCode);

/* -------------------------------------------------------------------------- */
/* 2. Update CSS with Liquid Blobs, Jelly UI, and Custom Scrollbar          */
/* -------------------------------------------------------------------------- */
const cssPath = path.join(__dirname, 'src', 'index.css');
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('.bg-liquid')) {
  css += `

/* ============================================
   Awwwards Level Magic Enhancements 🪄
   ============================================ */

/* 1. Morphing Liquid Blob Backgrounds */
@keyframes liquid-morph {
  0%, 100% { 
    border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; 
    transform: translate3d(0,0,0) rotate(0deg) scale(1.05); 
  }
  34% { 
    border-radius: 70% 30% 46% 54% / 30% 29% 71% 70%; 
    transform: translate3d(3%, 3%, 0) rotate(6deg) scale(0.95); 
  }
  67% { 
    border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; 
    transform: translate3d(-3%, 1%, 0) rotate(-6deg) scale(1); 
  }
}
.bg-liquid { 
  animation: liquid-morph 14s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; 
}

/* 2. Jelly Tactile Button Highlight */
.jelly-highlight { 
  box-shadow: 
    inset 0 4px 6px rgba(255,255,255,0.4), 
    inset 0 -6px 8px rgba(0,0,0,0.15), 
    0 12px 24px -6px rgba(0,0,0,0.2), 
    0 4px 8px -2px rgba(0,0,0,0.1) !important;
}

.jelly-highlight-ghost {
  box-shadow: 
    inset 0 4px 6px rgba(255,255,255,0.8), 
    inset 0 -4px 6px rgba(0,0,0,0.05), 
    0 12px 24px -6px rgba(0,0,0,0.08) !important;
}

/* 3. Magic Soft Scrollbars */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #ffb6c1, #87cefa);
  border-radius: 10px;
  border: 2px solid #fffaf5;
}
`;
  fs.writeFileSync(cssPath, css);
}

/* -------------------------------------------------------------------------- */
/* 3. Inject Magnetic into __root.tsx                                         */
/* -------------------------------------------------------------------------- */
const rootTsxPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let rootCode = fs.readFileSync(rootTsxPath, 'utf8');

if (!rootCode.includes('import Magnetic')) {
  rootCode = rootCode.replace(
    "import { MagicCursor } from '../components/MagicEffects'",
    "import { MagicCursor } from '../components/MagicEffects'\nimport Magnetic from '../components/Magnetic'"
  );
}

// Wrap Logo in Magnetic
const oldLogoRegex = /<motion\.img\s+src="\/logo\.png"\s+alt="Hulun Sweets Logo"[\s\S]*?\/>/s;
if (rootCode.match(oldLogoRegex) && !rootCode.includes('<Magnetic><motion.img')) {
  const match = rootCode.match(oldLogoRegex)[0];
  // Change image pointer-events to prevent interaction tug-of-war
  let newMatch = match.replace(/className="([^"]+)"/, 'className="$1 pointer-events-none"');
  rootCode = rootCode.replace(oldLogoRegex, `<Magnetic>\n              ${newMatch}\n            </Magnetic>`);
}
fs.writeFileSync(rootTsxPath, rootCode);


/* -------------------------------------------------------------------------- */
/* 4. Complete Overhaul of index.tsx                                          */
/* -------------------------------------------------------------------------- */
const indexTsxPath = path.join(__dirname, 'src', 'routes', 'index.tsx');
let indexCode = fs.readFileSync(indexTsxPath, 'utf8');

// A. Imports
if(indexCode.includes("import { motion } from 'framer-motion'")) {
  indexCode = indexCode.replace(
    "import { motion } from 'framer-motion'",
    "import { motion, useScroll, useTransform } from 'framer-motion'"
  );
}

// B. Home Component Setup (useScroll logic)
if (!indexCode.includes('const { scrollYProgress } = useScroll();')) {
  indexCode = indexCode.replace(
    "function Home() {",
    "function Home() {\n  const { scrollYProgress } = useScroll();"
  );
}

// C. Inject Zero-Gravity Parallax right inside <main>
if (!indexCode.includes('Zero Gravity Floating Sweets')) {
  const parallaxHTML = `
      {/* Zero Gravity Floating Sweets Layer (Parallax Setup) */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -900]), rotate: useTransform(scrollYProgress, [0, 1], [0, -180]) }} className="absolute top-[30%] left-[8%] opacity-30 mix-blend-multiply blur-[2px] scale-150">
          <span className="text-7xl filter drop-shadow-2xl">🍬</span>
        </motion.div>
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -600]), x: useTransform(scrollYProgress, [0, 1], [0, 100]), rotate: useTransform(scrollYProgress, [0, 1], [0, 120]) }} className="absolute top-[60%] right-[10%] opacity-40 mix-blend-multiply blur-[1px] scale-125">
          <span className="text-6xl filter drop-shadow-2xl">🍭</span>
        </motion.div>
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -1200]), x: useTransform(scrollYProgress, [0, 1], [0, -150]), rotate: useTransform(scrollYProgress, [0, 1], [0, 240]) }} className="absolute top-[80%] left-[20%] opacity-20 mix-blend-multiply blur-[3px] scale-[2]">
          <span className="text-5xl filter drop-shadow-2xl">🍡</span>
        </motion.div>
      </div>
  `;
  indexCode = indexCode.replace(
    /<main className="w-full flex flex-col pt-1">/,
    `<main className="w-full flex flex-col pt-1">${parallaxHTML}`
  );
}

// D. Fluid Blobs replacements
indexCode = indexCode.replace(
  /bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob/g,
  "bg-pink-300 bg-liquid mix-blend-multiply filter blur-3xl opacity-40"
);
indexCode = indexCode.replace(
  /bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000/g,
  "bg-yellow-300 bg-liquid mix-blend-multiply filter blur-3xl opacity-40 animation-delay-2000"
);
indexCode = indexCode.replace(
  /bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000/g,
  "bg-purple-300 bg-liquid mix-blend-multiply filter blur-3xl opacity-40 animation-delay-4000"
);
indexCode = indexCode.replace(
  /bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob/g,
  "bg-blue-400 bg-liquid mix-blend-multiply filter blur-2xl opacity-30"
);
indexCode = indexCode.replace(
  /bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000/g,
  "bg-yellow-400 bg-liquid mix-blend-multiply filter blur-2xl opacity-30 animation-delay-2000"
);


// E. Upgrade CTA Buttons to Jelly UI + Squish Transform
indexCode = indexCode.replace(
  /whileTap={{ scale: 0.95 }}/g, 
  `whileTap={{ scale: 0.9, scaleX: 1.05, scaleY: 0.9 }}` // Squish non-linear ratio
);
indexCode = indexCode.replace(
  /className="inline-block w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-500\/30 hover:shadow-xl hover:shadow-blue-500\/40 transition-shadow duration-200"/g,
  `className="inline-block w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg hover:brightness-110 transition-all duration-200 jelly-highlight"`
);
indexCode = indexCode.replace(
  /className="inline-block px-8 py-4 rounded-full bg-blue-600 text-white font-bold shadow-lg shadow-blue-500\/30 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500\/40 transition-colors duration-200"/g,
  `className="inline-block px-8 py-4 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 text-white font-bold transition-all duration-300 jelly-highlight hover:brightness-110"`
);
indexCode = indexCode.replace(
  /className="inline-block px-8 py-4 rounded-full bg-white text-blue-600 font-bold shadow-md shadow-slate-200\/50 border border-blue-100 hover:bg-blue-50 transition-colors duration-200"/g,
  `className="inline-block px-8 py-4 rounded-full bg-slate-50 text-blue-600 font-extrabold transition-all duration-300 border border-white jelly-highlight-ghost hover:brightness-105"`
);

// F. Categories Luminous Glow + Breathing Escaping Image Block Rewrite
const categoryRegex = /\{\s*CATEGORIES\.map\(\s*\(\s*cat\s*\)[\s\S]*?\}\s*\)\s*\}/s;
const newCategoryCode = `{CATEGORIES.map((cat) => {
              const name = t(\`products_page.\${cat.id}\`);
              return (
                <motion.div
                  key={cat.id}
                  variants={staggerChild}
                  className="relative group"
                  whileHover="hover"
                  initial="initial"
                >
                  {/* Luminous Diffuse Glow matched to category color */}
                  <motion.div 
                    className={\`absolute inset-0 bg-gradient-to-br \${cat.barColor} blur-2xl opacity-0 z-0 transition-opacity duration-700 group-hover:opacity-70\`} 
                    style={{ transform: 'scale(0.85) translateY(20px)' }}
                    layoutId={\`glow-\${cat.id}\`}
                  />

                  <Link
                    to={\`/category/\${cat.id}\`}
                    aria-label={name}
                    className="relative z-10 flex flex-col justify-end h-64 md:h-80 rounded-[2.5rem] overflow-visible transition-shadow duration-500 border border-white/80 bg-white shadow-sm"
                  >
                    <div className={\`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br \${cat.barColor} opacity-[0.03] group-hover:opacity-100 transition-all duration-500 overflow-hidden\`}>
                      <div className="absolute inset-0 bg-white opacity-100 group-hover:opacity-0 transition-opacity duration-500 delay-75" />
                      {/* Fluid spotlight reacting to hover */}
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-25 rounded-full mix-blend-overlay group-hover:scale-[3] transition-transform duration-[800ms] ease-out" />
                      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white opacity-20 rounded-full mix-blend-overlay group-hover:scale-[2.5] transition-transform duration-[1000ms] ease-out" />
                    </div>

                    <div className="absolute inset-0 p-6 pb-20 flex items-center justify-center pointer-events-none z-20">
                      {/* Escaping Image with Parallax & 3D tilt */}
                      <motion.img
                        src={cat.img}
                        alt={name}
                        className="w-full h-full object-contain max-h-[85%] filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.1)]"
                        variants={{
                          initial: { y: 0, scale: 1, rotate: 0 },
                          hover: { y: -35, scale: 1.25, rotate: -6, filter: 'drop-shadow(0 35px 25px rgba(0,0,0,0.3))' }
                        }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      />
                    </div>

                    <div className="relative z-30 m-4 px-4 py-4 rounded-2xl bg-white/95 backdrop-blur-md text-center shadow-lg transform group-hover:-translate-y-2 transition-all duration-500 border border-white">
                      <span className="block text-sm md:text-xl font-black text-slate-800 tracking-wider uppercase">{name}</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}`;
indexCode = indexCode.replace(categoryRegex, newCategoryCode);

fs.writeFileSync(indexTsxPath, indexCode);

console.log("MAGNIFICENT! All Advanced Features Injected!");
