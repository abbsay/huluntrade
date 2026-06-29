import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useI18n } from '../i18n'
import HeroSlider from '../components/HeroSlider'

const CATEGORIES = [
  { id: 'marshmallow', name: 'Marshmallow', desc: 'Lighter than air.', img: '/images/categories/minimal_marshmallow.svg', glow: 'from-glowPink to-transparent' },
  { id: 'jelly',       name: 'Jelly', desc: 'Bursting with flavor.', img: '/images/categories/minimal_jelly.svg', glow: 'from-glowOrange to-transparent' },
  { id: 'hard_candy',  name: 'Hard Candy', desc: 'Enduring sweetness.', img: '/images/categories/minimal_hard_candy.svg', glow: 'from-glowPurple to-transparent' },
  { id: 'candy_toy',   name: 'Candy Toys', desc: 'Play meets taste.', img: '/images/categories/minimal_toy.svg', glow: 'from-glowBlue to-transparent' },
];


const trustItems = [
  { label: 'Sweet Joy', value: '100%' },
  { label: 'Global Delivery', value: 'Fast' },
  { label: 'Pure Ingredients', value: 'Safe' },
  { label: 'Happy Customers', value: '10K+' },
];
export const Route = createFileRoute('/')({
  component: Home,
})

const springApple = { type: 'spring', stiffness: 200, damping: 12, mass: 0.8 };

function Home() {
  const { t } = useI18n();
  const { scrollYProgress } = useScroll();

  return (
    <main className="w-full flex flex-col bg-cream antialiased selection:bg-strawberry selection:text-white pb-32">
      
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
          <h2 className="text-4xl md:text-5xl font-black font-display text-choco tracking-tighter">Designed to delight.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Giant Showcase */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={springApple}
            className="md:col-span-8 bg-white rounded-[3rem] p-10 md:p-16 flex flex-col items-start overflow-hidden relative group cursor-pointer h-[500px] md:h-[650px] border border-black/5 hover:shadow-2xl hover:shadow-strawberry/20 transition-all duration-700"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-apple-pink/0 via-transparent to-apple-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h3 className="text-3xl md:text-5xl font-black font-display text-choco tracking-tight z-10">Fluffy Marshmallows.</h3>
            <p className="text-lg md:text-xl text-mocha font-medium mt-2 z-10 w-2/3">Experience the impossible lightness. Engineered with micro-bubble technology.</p>
            <motion.img 
              src="/images/categories/minimal_marshmallow.svg" 
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
            className="md:col-span-4 bg-choco rounded-[3rem] p-10 md:p-12 flex flex-col items-center text-center overflow-hidden relative group cursor-pointer h-[400px] md:h-[650px] hover:shadow-2xl hover:shadow-strawberry/30 transition-all duration-700"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-apple-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h3 className="text-3xl font-black font-display text-white tracking-tight z-10">Bouncy Bites.</h3>
            <p className="text-gray-400 font-medium mt-2 z-10">Pro-level chewiness.</p>
            <motion.div className="flex-grow flex items-center justify-center w-full mt-8 z-10">
              <motion.img 
                src="/images/categories/minimal_jelly.svg" 
                alt="Jelly" 
                className="w-[140%] object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] origin-center"
                whileHover={{ scale: 1.15, y: -20 }}
                transition={springApple}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      
      {/* 2.5 INFINITE CANDY MARQUEE RIBBON */}
      <div className="w-full bg-strawberry text-white py-4 md:py-5 overflow-hidden flex items-center shadow-inner relative z-20 border-y border-white/20 transform -rotate-1 origin-center scale-105 my-12">
        <motion.div
          className="flex whitespace-nowrap items-center font-display font-black text-2xl md:text-3xl uppercase tracking-widest"
          animate={{ x: [0, -1035] }} // Depends on the text length
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        >
          {Array(8).fill("🍬 SWEETEST JOY 🍭 MAGICAL TASTE ✨ PURE HAPPINESS ").map((text, i) => (
             <span key={i} className="mx-4">{text}</span>
          ))}
        </motion.div>
      </div>

      {/* 3. STICKY EDITORIAL SCROLL (The Rich Effect Gallery) */}
      <section className="py-24 bg-white relative border-t border-black/5">
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
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-black font-display text-choco leading-[1.05] tracking-tighter">
                    Pick your <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-apple-purple to-apple-blue">Flavor Magic.</span>
                  </h2>
                </div>
                <p className="text-xl text-mocha font-medium leading-relaxed max-w-md">
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
                    <div className="absolute -top-12 -left-6 md:-left-12 text-[120px] font-black font-display text-black/5 z-0 select-none pointer-events-none tracking-tighter">
                      0{index + 1}
                    </div>

                    <Link
                      to={`/category/${cat.id}`}
                      className="relative z-10 flex flex-col justify-end h-80 md:h-[420px] w-full rounded-[3rem] overflow-hidden shadow-lg border border-white transition-all duration-700 bg-white group-hover:shadow-2xl"
                    >
                      {/* Luminous Core Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${cat.glow} opacity-[0.05] group-hover:opacity-100 transition-all duration-700`}></div>
                      
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
                          <span className="block text-2xl md:text-3xl font-black font-display text-choco tracking-tight mb-1">
                            {name}
                          </span>
                          <span className="text-mocha font-medium">{cat.desc}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-choco group-hover:bg-apple-text group-hover:text-white transition-colors duration-300">
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
