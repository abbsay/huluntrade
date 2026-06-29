const fs = require('fs');
const path = require('path');

// 1. OVERHAUL TAILWIND CONFIG FOR APPLE TOKENS
const tailwindPath = path.join(__dirname, 'tailwind.config.js');
let twCode = fs.readFileSync(tailwindPath, 'utf8');

// Replace custom font and colors with Apple-specific metrics
twCode = twCode.replace(
  /extend:\s*\{[\s\S]*?\},/s,
  `extend: {
      fontFamily: {
        // Apple system stacks for absolute native pristine look
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', 'sans-serif'],
      },
      colors: {
        apple: {
          bg: '#FFFFFF',
          card: '#F5F5F7',
          text: '#1D1D1F',
          sub: '#86868B',
          blue: '#2997FF', // Standard iOS blue
        }
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      }
    },`
);
fs.writeFileSync(tailwindPath, twCode);

// 2. OVERHAUL INDEX.TSX FOR PURE APPLE MINIMALISM
const indexTsxPath = path.join(__dirname, 'src', 'routes', 'index.tsx');

const appleIndexCode = `import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useI18n } from '../i18n'
import ProductGrid from '../components/ProductGrid'

const CATEGORIES = [
  { id: 'marshmallow', name: 'Marshmallow Pro', desc: 'Lighter than air.', img: '/images/categories/other.png' },
  { id: 'jelly',       name: 'Juicy Jelly', desc: 'Bursting with flavor.', img: '/images/categories/jelly.png' },
  { id: 'hard_candy',  name: 'Hard Candy', desc: 'Enduring sweetness.', img: '/images/categories/hard_candy.png' },
  { id: 'candy_toy',   name: 'Candy Toys', desc: 'Play meets taste.', img: '/images/categories/other.png' },
];

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: [{ title: 'Hulun Sweets — Crafted to Perfection' }],
  }),
})

// Apple easing: ultra smooth, high mass, zero bounce
const springApple = { type: 'spring', stiffness: 200, damping: 30, mass: 1 };

function Home() {
  const { t } = useI18n();
  const { scrollYProgress } = useScroll();

  return (
    <main className="w-full flex flex-col bg-apple-bg pt-10 antialiased selection:bg-apple-blue selection:text-white pb-32">
      
      {/* 1. APPLE STYLE HERO: Text Minimal + Massive Scale */}
      <section className="relative pt-24 pb-12 overflow-hidden flex flex-col items-center text-center px-4">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-apple-sub font-semibold tracking-widest uppercase text-xs sm:text-sm mb-4">Hulun Sweets Series</h2>
          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-semibold text-apple-text tracking-tighter leading-[1.05] mb-6">
            Pure joy. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">Crafted to perfection.</span>
          </h1>
          <p className="text-xl md:text-2xl text-apple-sub font-medium max-w-2xl mx-auto tracking-tight mb-10">
            Engineered for smiles. Handpicked ingredients met with uncompromising pursuit of sweetness. The ultimate treat for everyday.
          </p>
          
          <div className="flex items-center justify-center gap-6">
            <Link to="/products" className="bg-apple-text text-white px-6 py-3 rounded-full text-[17px] font-medium hover:bg-black transition-colors">
              Buy Now
            </Link>
            <Link to="/about" className="text-apple-blue text-[17px] font-medium hover:underline flex items-center group">
              Learn more <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. CHUNKY MINIMALIST BENTO BOX */}
      <section className="py-16 max-w-[1240px] mx-auto px-4 sm:px-6 z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          
          {/* Main Giant Showcase */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={springApple}
            className="md:col-span-8 bg-apple-card rounded-[2rem] md:rounded-[3rem] p-10 md:p-16 flex flex-col items-start overflow-hidden relative group cursor-pointer h-[500px] md:h-[650px]"
          >
            <h3 className="text-3xl md:text-5xl font-semibold text-apple-text tracking-tight z-10">Marshmallow Max.</h3>
            <p className="text-lg md:text-xl text-apple-sub font-medium mt-2 z-10">Softer than air. Sweeter than ever.</p>
            <motion.img 
              src="/images/categories/other.png" 
              alt="Marshmallow" 
              className="absolute -bottom-10 -right-10 w-[120%] lg:w-[90%] object-contain drop-shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={springApple}
            />
          </motion.div>

          {/* Right Vertical */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{...springApple, delay: 0.1}}
            className="md:col-span-4 bg-black rounded-[2rem] md:rounded-[3rem] p-10 md:p-12 flex flex-col items-center text-center overflow-hidden relative group cursor-pointer h-[400px] md:h-[650px]"
          >
            <h3 className="text-3xl font-semibold text-white tracking-tight z-10">Jelly M1.</h3>
            <p className="text-gray-400 font-medium mt-2 z-10">Pro-level chewiness.</p>
            <motion.div className="flex-grow flex items-center justify-center w-full mt-8 z-10">
              <motion.img 
                src="/images/categories/jelly.png" 
                alt="Jelly" 
                className="w-[140%] object-contain"
                whileHover={{ scale: 1.08 }}
                transition={springApple}
              />
            </motion.div>
          </motion.div>
          
        </div>
      </section>

      {/* 3. STRUCTURAL GRID (Product Grid Cleaned Up) */}
      <div className="pt-24 border-t border-gray-100 max-w-[1240px] mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-apple-text tracking-tight">Which candy is right for you?</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 sm:px-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...springApple, delay: i * 0.1 }}
              className="flex flex-col items-center text-center border-b border-gray-200 pb-12 group cursor-pointer"
            >
              <div className="h-48 w-full flex items-center justify-center mb-8 px-8">
                <motion.img 
                  src={cat.img} 
                  autoPlay
                  className="max-h-full object-contain filter drop-shadow-xl group-hover:scale-110 transition-transform duration-500 ease-out" 
                />
              </div>
              
              <h4 className="text-2xl font-semibold text-apple-text tracking-tight mb-2">{cat.name}</h4>
              <p className="text-sm font-medium text-apple-sub mb-6">{cat.desc}</p>
              
              <div className="mt-auto">
                <p className="text-sm text-apple-text font-semibold mb-3">From $3.99</p>
                <div className="flex flex-col gap-2">
                  <Link to={\`/category/\${cat.id}\`} className="bg-apple-blue text-white px-4 py-1.5 rounded-full text-[13px] font-medium hover:bg-blue-600 transition-colors inline-block w-max mx-auto">
                    Buy
                  </Link>
                  <Link to={\`/category/\${cat.id}\`} className="text-apple-blue text-[13px] hover:underline font-medium">
                    Learn more ›
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </main>
  );
}
`;
fs.writeFileSync(indexTsxPath, appleIndexCode);

// 3. REMOVE JELLY HIGHLIGHTS FROM ROOT SO IT DOESN'T CLASH WITH MINIMALISM
const rootTsxPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let rootCode = fs.readFileSync(rootTsxPath, 'utf8');

// Replace bouncy headers with smoother transitions
rootCode = rootCode.replace(/type: 'spring', stiffness: 400, damping: 10/g, "ease: [0.32, 0.72, 0, 1], duration: 0.4");
rootCode = rootCode.replace(/rotate: .*?/g, ""); // Remove rotations from nav items

fs.writeFileSync(rootTsxPath, rootCode);

console.log("APPLIED ULTRA MINIMALIST APPLE DESIGN LANGUAGE.");
