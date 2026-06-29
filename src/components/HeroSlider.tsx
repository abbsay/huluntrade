import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@tanstack/react-router';

const SLIDES = [
  {
    id: 1,
    title: "Cloud Marshmallow",
    subtitle: "Lighter than air. Sweeter than ever.",
    color: "from-[#FF2D55]/10 to-transparent",
    accent: "text-[#FF2D55]",
    bg: "bg-[#FFF0F3]",
    img: '/images/categories/minimal_marshmallow.svg',
    blob: "bg-[#FF2D55]"
  },
  {
    id: 2,
    title: "Juicy Fruit Jelly",
    subtitle: "Bursting with sweet and fruity joy.",
    color: "from-[#FF9500]/10 to-transparent",
    accent: "text-[#FF9500]",
    bg: "bg-[#FFF8F0]",
    img: '/images/categories/minimal_jelly.svg',
    blob: "bg-[#FF9500]"
  },
  {
    id: 3,
    title: "Crystal Hard Candy",
    subtitle: "Enduring sweetness. Magical crunch.",
    color: "from-[#AF52DE]/10 to-transparent",
    accent: "text-[#AF52DE]",
    bg: "bg-[#F9F0FF]",
    img: '/images/categories/minimal_hard_candy.svg',
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
          className={`absolute inset-0 flex flex-col md:flex-row items-center ${SLIDES[current].bg}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated Background Glow */}
          <motion.div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] rounded-full blur-[120px] opacity-30 ${SLIDES[current].blob}`}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>

          <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-32 z-10 relative mt-20 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
              <h2 className={`text-sm md:text-base font-bold tracking-widest uppercase mb-4 ${SLIDES[current].accent}`}>
                New Arrival
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-choco font-display tracking-tighter leading-[1.05] mb-6">
                {SLIDES[current].title}
              </h1>
              <p className="text-xl md:text-2xl text-mocha font-medium max-w-lg tracking-tight mb-10">
                {SLIDES[current].subtitle}
              </p>
              
              <div className="flex items-center gap-6">
                <Link to="/products" className="bg-choco text-white px-8 py-4 rounded-full text-[17px] font-medium hover:scale-105 transition-transform duration-300">
                  Shop now
                </Link>
                <Link to="/about" className={`text-[17px] font-medium hover:underline flex items-center group ${SLIDES[current].accent}`}>
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
