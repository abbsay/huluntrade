const fs = require('fs');
const path = require('path');

/* -----------------------------------------------
   1. OVERHAUL /products.tsx
   Make it a sleek grid, like an Apple Store "Buy Mac" page
----------------------------------------------- */
const productsPath = path.join(__dirname, 'src', 'routes', 'products.tsx');
const productsCode = `import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n'

const CATEGORIES = [
  { id: 'marshmallow', name: 'Marshmallow Pro', desc: 'Lighter than air.', img: '/images/categories/minimal_marshmallow.svg' },
  { id: 'jelly',       name: 'Juicy Jelly M1', desc: 'Bursting with flavor dynamics.', img: '/images/categories/minimal_jelly.svg' },
  { id: 'hard_candy',  name: 'Hard Candy Ultra', desc: 'Enduring sweetness. Unmatched crunch.', img: '/images/categories/minimal_hard_candy.svg' },
  { id: 'candy_toy',   name: 'Candy Toys', desc: 'Where taste meets play.', img: '/images/categories/minimal_toy.svg' }
];

export const Route = createFileRoute('/products')({
  component: Products,
})

const springApple = { type: 'spring', stiffness: 200, damping: 30, mass: 1 };

function Products() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-apple-bg pt-20 pb-32 flex flex-col items-center antialiased">
      
      {/* Header */}
      <div className="w-full max-w-[1240px] px-4 md:px-6 mb-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springApple}
          className="text-5xl md:text-7xl font-semibold text-apple-text tracking-tighter"
        >
          Shop Sweets
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springApple, delay: 0.1 }}
          className="text-xl text-apple-sub mt-4 font-medium"
        >
          Select a category to explore our crafted treats.
        </motion.p>
      </div>

      {/* Modern minimal grid */}
      <div className="w-full max-w-[1240px] px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springApple, delay: i * 0.1 }}
            >
              <Link 
                to={\`/category/\${cat.id}\`} 
                className="group flex flex-col items-center bg-apple-card rounded-[2rem] pt-16 px-8 pb-12 transition-all duration-500 hover:shadow-2xl overflow-hidden relative"
              >
                <h2 className="text-3xl lg:text-4xl font-semibold text-apple-text tracking-tight z-10">{cat.name}</h2>
                <p className="text-lg text-apple-sub font-medium mt-2 mb-10 z-10">{cat.desc}</p>
                
                <div className="relative w-full aspect-square max-h-[300px] flex items-center justify-center z-10">
                  <motion.img 
                    src={cat.img} 
                    alt={cat.name}
                    className="object-contain max-h-full max-w-full drop-shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
                  />
                </div>
                
                {/* Minimal "Buy" Call to action */}
                <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-apple-text group-hover:bg-apple-blue group-hover:text-white transition-colors duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7-7m7 7H3" /></svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
`;
fs.writeFileSync(productsPath, productsCode);

/* -----------------------------------------------
   2. OVERHAUL /about.tsx
   Apple Values Page vibe. Text heavy, massive, minimal.
----------------------------------------------- */
const aboutPath = path.join(__dirname, 'src', 'routes', 'about.tsx');
const aboutCode = `import { createFileRoute } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useI18n } from '../i18n'

export const Route = createFileRoute('/about')({
  component: About,
})

const springApple = { type: 'spring', stiffness: 200, damping: 30, mass: 1 };

function About() {
  const { t } = useI18n();
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <main className="min-h-screen bg-apple-bg text-apple-text antialiased pt-24 pb-32 overflow-hidden">
      
      {/* Abstract Background geometry to look like Apple "Mac Pro" smoke/glass */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-30">
        <motion.img 
          style={{ y: yParallax, rotate: 15 }} 
          src="/images/categories/minimal_jelly.svg" 
          className="w-[800px] h-[800px] blur-[80px] opacity-20" 
        />
      </div>

      <div className="max-w-[900px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springApple}
          className="mt-20 mb-32"
        >
          <h2 className="text-apple-sub font-semibold tracking-widest uppercase text-sm mb-4">Our Core Values</h2>
          <h1 className="text-5xl md:text-7xl lg:text-[90px] font-semibold tracking-tighter leading-[1.05]">
            Engineering<br />happiness.
          </h1>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={springApple}
          className="space-y-12 text-2xl md:text-3xl lg:text-[40px] leading-[1.3] font-medium tracking-tight text-apple-sub"
        >
          <p className="text-apple-text">
            We believe that a simple piece of candy holds the profound power to elevate the human experience.
          </p>
          <p>
            Started as a visionary dream, Hulun Sweets focuses on the intersection of taste, geometry, and pure joy. No compromises. Just absolute perfection in every bite.
          </p>
          <p>
            From the aerodynamic fluffiness of our Marshmallow Pro to the rigorous flavor architecture of our Hard Candy Ultra, our team obsesses over the details that others ignore.
          </p>
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={springApple}
          className="mt-32 pt-16 border-t border-black/10"
        >
          <h3 className="text-4xl font-semibold tracking-tighter mb-4 text-apple-text">The future is sweet.</h3>
          <p className="text-xl text-apple-sub font-medium">Join us in making the world a slightly better, vastly sweeter place.</p>
        </motion.div>

      </div>
    </main>
  )
}
`;
fs.writeFileSync(aboutPath, aboutCode);

/* -----------------------------------------------
   3. CLEANUP __root.tsx
   Remove colorful borders, confetti, baby emojis, make footer/header PRO.
----------------------------------------------- */
const rootTsxPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let rootCode = fs.readFileSync(rootTsxPath, 'utf8');

// Strip out confetti
rootCode = rootCode.replace(/import confetti from 'canvas-confetti'/g, "");
rootCode = rootCode.replace(/const triggerConfetti = \(\) => \{[\s\S]*?\}\;/g, "");
rootCode = rootCode.replace(/onClick=\{triggerConfetti\}/g, "");
rootCode = rootCode.replace(/🍬/g, '⌘'); // Replace candy emojis in footer with apple cmd symbol or minimal dots
rootCode = rootCode.replace(/🍭/g, '');

// Footer colorful address blocks: bg-blue-50 -> bg-apple-card
rootCode = rootCode.replace(/bg-blue-50/g, 'bg-apple-card');
rootCode = rootCode.replace(/border-blue-100\/50/g, 'border-transparent');
rootCode = rootCode.replace(/text-blue-900/g, 'text-apple-text');
rootCode = rootCode.replace(/text-blue-700\/80/g, 'text-apple-sub');
rootCode = rootCode.replace(/text-blue-600/g, 'text-apple-text');

rootCode = rootCode.replace(/bg-pink-50/g, 'bg-apple-card');
rootCode = rootCode.replace(/border-pink-100\/50/g, 'border-transparent');
rootCode = rootCode.replace(/text-pink-900\/80/g, 'text-apple-sub');
rootCode = rootCode.replace(/text-pink-900/g, 'text-apple-text');
rootCode = rootCode.replace(/text-pink-700/g, 'text-apple-text');
rootCode = rootCode.replace(/text-pink-600/g, 'text-apple-text');

// Footer playful SVG wave
rootCode = rootCode.replace(/\{(\/\* Playful Top Wave Element \*\/)\}[\s\S]*?<\/svg>\s*<\/div>/g, "");

// Header gradient active state removal for mobile
rootCode = rootCode.replace(/bg-gradient-to-r from-pink-500 to-pink-600/g, 'bg-apple-blue');
rootCode = rootCode.replace(/shadow-pink-500\/25/g, 'shadow-apple-blue/25');

fs.writeFileSync(rootTsxPath, rootCode);
console.log("Products, About, and Root components upgraded to Apple architecture.");
