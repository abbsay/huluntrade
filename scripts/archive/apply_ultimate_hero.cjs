const fs = require('fs');
const path = require('path');

// 1. UPDATE TAILWIND CONFIG TO ADD VIBRANT "APPLE DISPLAY" COLORS
const tailwindPath = path.join(__dirname, 'tailwind.config.js');
let twCode = fs.readFileSync(tailwindPath, 'utf8');

twCode = twCode.replace(
  /colors: \{\s*apple: \{[\s\S]*?\}\s*\}/,
  `colors: {
        apple: {
          bg: '#FFFFFF',
          card: '#F5F5F7',
          text: '#1D1D1F',
          sub: '#86868B',
          blue: '#2997FF',
          pink: '#FF2D55',
          orange: '#FF9500',
          yellow: '#FFCC00',
          purple: '#AF52DE',
          glass: 'rgba(255, 255, 255, 0.65)',
        }
      }`
);
fs.writeFileSync(tailwindPath, twCode);


// 2. CREATE A MIND-BLOWING FULL-SCREEN FRAMER MOTION SLIDER
const sliderPath = path.join(__dirname, 'src', 'components', 'HeroSlider.tsx');
const sliderCode = `import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@tanstack/react-router';

const SLIDES = [
  {
    id: 1,
    title: "Marshmallow Pro",
    subtitle: "Lighter than air. Sweeter than ever.",
    color: "from-[#FF2D55]/10 to-transparent",
    accent: "text-[#FF2D55]",
    bg: "bg-[#FFF0F3]",
    img: "/images/categories/other.png",
    blob: "bg-[#FF2D55]"
  },
  {
    id: 2,
    title: "Juicy Jelly M1",
    subtitle: "Bursting with next-level flavor dynamics.",
    color: "from-[#FF9500]/10 to-transparent",
    accent: "text-[#FF9500]",
    bg: "bg-[#FFF8F0]",
    img: "/images/categories/jelly.png",
    blob: "bg-[#FF9500]"
  },
  {
    id: 3,
    title: "Hard Candy Ultra",
    subtitle: "Enduring sweetness. Uncompromising crunch.",
    color: "from-[#AF52DE]/10 to-transparent",
    accent: "text-[#AF52DE]",
    bg: "bg-[#F9F0FF]",
    img: "/images/categories/hard_candy.png",
    blob: "bg-[#AF52DE]"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          className={\`absolute inset-0 flex flex-col md:flex-row items-center \${SLIDES[current].bg}\`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated Background Glow */}
          <motion.div
            className={\`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] rounded-full blur-[120px] opacity-30 \${SLIDES[current].blob}\`}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>

          <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-32 z-10 relative mt-20 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
              <h2 className={\`text-sm md:text-base font-bold tracking-widest uppercase mb-4 \${SLIDES[current].accent}\`}>
                New Arrival
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-apple-text tracking-tighter leading-[1.05] mb-6">
                {SLIDES[current].title}
              </h1>
              <p className="text-xl md:text-2xl text-apple-sub font-medium max-w-lg tracking-tight mb-10">
                {SLIDES[current].subtitle}
              </p>
              
              <div className="flex items-center gap-6">
                <Link to="/products" className="bg-apple-text text-white px-8 py-4 rounded-full text-[17px] font-medium hover:scale-105 transition-transform duration-300">
                  Shop now
                </Link>
                <Link to="/about" className={\`text-[17px] font-medium hover:underline flex items-center group \${SLIDES[current].accent}\`}>
                  Learn more <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span>
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2 h-[50vh] md:h-full relative flex items-center justify-center z-10">
            <motion.img
              src={SLIDES[current].img}
              alt={SLIDES[current].title}
              className="max-h-[80%] max-w-[80%] object-contain filter drop-shadow-2xl"
              initial={{ opacity: 0, x: 100, rotate: 15 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 0.3, duration: 1, type: "spring", bounce: 0.2 }}
              whileHover={{ scale: 1.1, rotate: -5, transition: { duration: 0.4 } }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="w-16 h-1.5 rounded-full bg-black/10 overflow-hidden relative cursor-pointer"
          >
            {current === i && (
              <motion.div
                className="absolute inset-0 bg-black/60"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
`;
fs.writeFileSync(sliderPath, sliderCode);


// 3. RE-INJECT RICH EFFECTS + SLIDER INTO INDEX.TSX
const indexTsxPath = path.join(__dirname, 'src', 'routes', 'index.tsx');

const richAppleIndexCode = `import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useI18n } from '../i18n'
import HeroSlider from '../components/HeroSlider'

const CATEGORIES = [
  { id: 'marshmallow', name: 'Marshmallow Pro', desc: 'Lighter than air.', img: '/images/categories/other.png', glow: 'from-apple-pink to-transparent' },
  { id: 'jelly',       name: 'Juicy Jelly', desc: 'Bursting with flavor.', img: '/images/categories/jelly.png', glow: 'from-apple-orange to-transparent' },
  { id: 'hard_candy',  name: 'Hard Candy', desc: 'Enduring sweetness.', img: '/images/categories/hard_candy.png', glow: 'from-apple-purple to-transparent' },
  { id: 'candy_toy',   name: 'Candy Toys', desc: 'Play meets taste.', img: '/images/categories/other.png', glow: 'from-apple-blue to-transparent' },
];

export const Route = createFileRoute('/')({
  component: Home,
})

const springApple = { type: 'spring', stiffness: 200, damping: 30, mass: 1 };

function Home() {
  const { t } = useI18n();
  const { scrollYProgress } = useScroll();

  return (
    <main className="w-full flex flex-col bg-apple-bg antialiased selection:bg-apple-blue selection:text-white pb-32">
      
      {/* 1. FULL SCREEN HERO SLIDER */}
      <HeroSlider />

      {/* ZERO GRAVITY PARALLAX (Subtle, Premium Apple Glass style) */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden mix-blend-multiply opacity-20">
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -800]), rotate: useTransform(scrollYProgress, [0, 1], [0, 90]) }} className="absolute top-[40%] left-[5%] blur-[4px] scale-[1.5]">
          <span className="text-7xl filter drop-shadow-2xl grayscale">🍬</span>
        </motion.div>
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -1000]), x: useTransform(scrollYProgress, [0, 1], [0, 100]), rotate: useTransform(scrollYProgress, [0, 1], [0, -120]) }} className="absolute top-[70%] right-[8%] blur-[2px] scale-[2]">
          <span className="text-6xl filter drop-shadow-2xl grayscale">🍭</span>
        </motion.div>
      </div>

      {/* 2. CHUNKY MINIMALIST BENTO BOX (With rich hovers) */}
      <section className="py-24 max-w-[1240px] mx-auto px-4 sm:px-6 z-20 w-full relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-apple-text tracking-tighter">Designed to delight.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Giant Showcase */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={springApple}
            className="md:col-span-8 bg-apple-card rounded-[3rem] p-10 md:p-16 flex flex-col items-start overflow-hidden relative group cursor-pointer h-[500px] md:h-[650px] border border-black/5 hover:shadow-2xl hover:shadow-apple-pink/20 transition-all duration-700"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-apple-pink/0 via-transparent to-apple-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h3 className="text-3xl md:text-5xl font-semibold text-apple-text tracking-tight z-10">Marshmallow Max.</h3>
            <p className="text-lg md:text-xl text-apple-sub font-medium mt-2 z-10 w-2/3">Experience the impossible lightness. Engineered with micro-bubble technology.</p>
            <motion.img 
              src="/images/categories/other.png" 
              alt="Marshmallow" 
              className="absolute -bottom-10 -right-10 w-[120%] lg:w-[90%] object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] origin-bottom-right"
              whileHover={{ scale: 1.08, rotate: -2 }}
              transition={springApple}
            />
          </motion.div>

          {/* Right Vertical */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{...springApple, delay: 0.1}}
            className="md:col-span-4 bg-black rounded-[3rem] p-10 md:p-12 flex flex-col items-center text-center overflow-hidden relative group cursor-pointer h-[400px] md:h-[650px] hover:shadow-2xl hover:shadow-apple-blue/30 transition-all duration-700"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-apple-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h3 className="text-3xl font-semibold text-white tracking-tight z-10">Jelly M1.</h3>
            <p className="text-gray-400 font-medium mt-2 z-10">Pro-level chewiness.</p>
            <motion.div className="flex-grow flex items-center justify-center w-full mt-8 z-10">
              <motion.img 
                src="/images/categories/jelly.png" 
                alt="Jelly" 
                className="w-[140%] object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] origin-center"
                whileHover={{ scale: 1.15, y: -20 }}
                transition={springApple}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. STICKY EDITORIAL SCROLL (The Rich Effect Gallery) */}
      <section className="py-24 bg-apple-card relative border-t border-black/5">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-start relative min-h-screen gap-12 lg:gap-8">
            
            {/* Sticky Left Pillar */}
            <div className="w-full lg:w-2/5 lg:sticky lg:top-40 lg:pr-12 z-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={springApple}
              >
                <div className="inline-block relative mb-8">
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-apple-text leading-[1.05] tracking-tighter">
                    Pick your <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-apple-purple to-apple-blue">Flavor Magic.</span>
                  </h2>
                </div>
                <p className="text-xl text-apple-sub font-medium leading-relaxed max-w-md">
                  Scroll down to discover our magical categories. From bouncy marshmallows to crunchy hard candies, every packet holds a tiny universe of joy.
                </p>
              </motion.div>
            </div>

            {/* Scrolling Right Gallery */}
            <div className="w-full lg:w-3/5 pb-12 flex flex-col space-y-12 md:space-y-24 z-10">
              {CATEGORIES.map((cat, index) => {
                const name = cat.name;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 100, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ margin: '-20%' }}
                    transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                    className="relative group w-full"
                  >
                    {/* Parallax numbering layout */}
                    <div className="absolute -top-12 -left-6 md:-left-12 text-[120px] font-semibold text-black/5 z-0 select-none pointer-events-none tracking-tighter">
                      0{index + 1}
                    </div>

                    <Link
                      to={\`/category/\${cat.id}\`}
                      className="relative z-10 flex flex-col justify-end h-80 md:h-[420px] w-full rounded-[3rem] overflow-hidden shadow-lg border border-white transition-all duration-700 bg-white group-hover:shadow-2xl"
                    >
                      {/* Luminous Core Background */}
                      <div className={\`absolute inset-0 bg-gradient-to-br \${cat.glow} opacity-[0.05] group-hover:opacity-100 transition-all duration-700\`}></div>
                      
                      <div className="absolute inset-0 p-8 pb-32 flex items-center justify-center pointer-events-none z-20">
                        {/* Escaping Image inside the elegant constraint */}
                        <motion.img
                          src={cat.img}
                          alt={name}
                          className="w-full h-full object-contain max-h-[90%] filter drop-shadow-xl origin-center"
                          variants={{
                            initial: { y: 0, scale: 1, rotate: 0 },
                            hover: { y: -30, scale: 1.15, rotate: -5, filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.2))' }
                          }}
                          initial="initial"
                          whileHover="hover"
                          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                        />
                      </div>

                      <div className="relative z-30 m-6 px-8 py-6 rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-sm transform group-hover:translate-y-2 transition-all duration-500 border border-white flex justify-between items-center">
                        <div>
                          <span className="block text-2xl md:text-3xl font-semibold text-apple-text tracking-tight mb-1">
                            {name}
                          </span>
                          <span className="text-apple-sub font-medium">{cat.desc}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-apple-card flex items-center justify-center text-apple-text group-hover:bg-apple-text group-hover:text-white transition-colors duration-300">
                          <svg className="w-5 h-5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7-7m7 7H3" /></svg>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
`;
fs.writeFileSync(indexTsxPath, richAppleIndexCode);

// 4. FIX NAVBAR HEIGHT AND PADDING SO HERO SLIDER CAN BE TRULY FULL SCREEN
const rootTsxPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let rootCode = fs.readFileSync(rootTsxPath, 'utf8');

// Replace standard pt-XX padding for <main> where outlet lives, because we want slider to hit the ceiling
rootCode = rootCode.replace(
  /<main className="flex-grow w-full z-0 pt-[^"]+">/,
  `<main className="flex-grow w-full z-0">`
);

// Optional: Give Header a transparent state at top so slider shows through
rootCode = rootCode.replace(
  /className="fixed top-0 left-0 right-0 z-\[100\] border-b backdrop-blur-md shadow-sm"/,
  'className="fixed top-0 left-0 right-0 z-[100] border-b backdrop-blur-xl shadow-sm bg-white/70"' // Increased blur to 24px and made slightly translucent
);

fs.writeFileSync(rootTsxPath, rootCode);
console.log("Ultimate Hero Slider and Rich Apple Effects deployed!");
