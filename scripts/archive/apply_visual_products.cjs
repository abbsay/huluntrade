const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'routes', 'products.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Structural Imports
if (!code.includes('import Magnetic from')) {
  code = code.replace(
    "import { Link } from '@tanstack/react-router'",
    "import { Link } from '@tanstack/react-router'\nimport { motion } from 'framer-motion'\nimport Magnetic from '../components/Magnetic'"
  );
}

// 2. Base Wrappers & Colors (Slate -> Cream/Choco/Mocha)
code = code.replace(/bg-slate-50/g, 'bg-cream');
code = code.replace(/text-slate-800/g, 'text-choco');
code = code.replace(/text-slate-500/g, 'text-mocha/80');
code = code.replace(/text-pink-600/g, 'text-strawberry');
code = code.replace(/text-pink-500/g, 'text-strawberry');

// 3. Hero Section Typography (Using Quicksand & Baloo via font-display)
code = code.replace(/font-black text-choco/g, 'font-black font-display text-choco');
code = code.replace(/font-medium/g, 'font-semibold');

// 4. Hero Banner Magnetic Feature & Blobs
const oldHeaderRegex = /<h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-choco tracking-tight drop-shadow-md px-4 py-2 hover:scale-105 transition-transform duration-300 origin-center">[\s\S]*?<\/h1>/;
if (code.match(oldHeaderRegex) && !code.includes('<Magnetic>')) {
  const match = code.match(oldHeaderRegex)[0];
  const pointerSafeH1 = match.replace('hover:scale-105 transition-transform duration-300', 'pointer-events-none');
  code = code.replace(oldHeaderRegex, `<Magnetic>\n              ${pointerSafeH1}\n            </Magnetic>`);
}

// 5. Upgrade the Category Cards to Framer Motion + Luminous Escape Pattern
const categoryRegex = /<Link \s*key=\{cat.id\}[\s\S]*?<\/Link>/s;
const newCategoryCode = `<motion.div
                key={cat.id}
                initial="initial"
                whileHover="hover"
                className="relative group"
              >
                {/* Luminous Diffuse Glow */}
                <motion.div 
                  className={\`absolute inset-0 bg-gradient-to-br \${cat.barColor} blur-2xl opacity-0 z-0 transition-opacity duration-700 group-hover:opacity-60\`} 
                  style={{ transform: 'scale(0.85) translateY(20px)' }}
                />

                <Link 
                  to={\`/category/\${cat.id}\`} 
                  aria-label={name} 
                  className={\`relative z-10 flex flex-col justify-end h-72 md:h-96 rounded-[2.5rem] overflow-visible shadow-[0_20px_40px_-15px_rgba(61,44,35,0.06)] border border-choco/5 transition-all duration-500 bg-white\`}
                >
                  <div className={\`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br \${cat.barColor} opacity-[0.03] group-hover:opacity-100 transition-all duration-500 overflow-hidden\`}>
                    <div className="absolute inset-0 bg-white opacity-100 group-hover:opacity-0 transition-opacity duration-500 delay-75" />
                    {/* Fluid Spotlight */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-25 rounded-full mix-blend-overlay group-hover:scale-[3] transition-transform duration-[800ms] ease-out" />
                  </div>
                  
                  {/* Escaping Image Segment */}
                  <div className="absolute inset-0 p-8 pb-24 flex items-center justify-center pointer-events-none z-20">
                    <motion.img 
                      src={cat.img} 
                      alt={name} 
                      className="w-full h-full object-contain max-h-[85%] filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.1)]" 
                      variants={{
                        initial: { y: 0, scale: 1, rotate: 0 },
                        hover: { y: -30, scale: 1.2, rotate: -4, filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.25))' }
                      }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    />
                  </div>
                  
                  <div className="relative z-30 m-4 px-6 py-4 md:py-5 rounded-3xl bg-white/95 backdrop-blur-md text-center shadow-lg transform group-hover:-translate-y-2 transition-all duration-500 border border-white">
                    <span className="block text-lg md:text-xl font-black font-display text-choco tracking-widest uppercase group-hover:text-strawberry transition-colors">
                      {name}
                    </span>
                    
                    <div className="absolute -top-3 right-4 rtl:left-4 rtl:right-auto bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300">
                       <svg className="w-4 h-4 text-strawberry rtl:-scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                  </div>
                </Link>
              </motion.div>`;

// Replace map body
code = code.replace(categoryRegex, newCategoryCode);

fs.writeFileSync(filePath, code);
console.log("Products Page Unified!");
