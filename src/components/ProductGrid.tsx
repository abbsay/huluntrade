import { Link } from '@tanstack/react-router';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useI18n } from '../i18n';
import { mockProducts } from '../data/mockProducts';
import React from 'react';

// Pick 6 representative products across different categories
const FEATURED_IDS = [
  'hl-marsh-010',   // marshmallow
  'hl-marsh-014',   // marshmallow
  'yt24051401',     // 50g jelly
  'hl-jelly-005',   // 48g jelly
  'hl24050701',     // 35g bear candy
  'bbw24042929',    // 15g lollipop
];

const FEATURED = FEATURED_IDS
  .map(id => mockProducts.find(p => p.id === id))
  .filter(Boolean);

const CATEGORY_LABELS: Record<string, string> = {
  marshmallow: 'Marshmallow',
  jelly: 'Jelly Candy',
  hard_candy: 'Hard Candy',
  candy_toy: 'Candy Toy',
};

// Stagger container variants
const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Each card rises and fades in from below
const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 22,
    },
  },
};

// Title scroll-reveal variant
const titleVariants = {
  hidden: { opacity: 0, y: -32, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

// CTA button scroll-reveal variant
const ctaVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 18,
      delay: 0.2,
    },
  },
};

function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  return (
    <div style={{ perspective: 1200 }} onMouseMove={handleMouseMove} onMouseLeave={() => {x.set(0); y.set(0)}} className="h-full w-full">
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="h-full w-full relative">
        {children}
      </motion.div>
    </div>
  );
}

function ProductGrid() {
  const { t } = useI18n();

  return (
    <section className="py-16 md:py-24 bg-cream" id="featured-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Ribbon Title Area — scroll reveal */}
        <motion.div
          className="text-center mb-12 relative z-10"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="inline-block relative">
            <h2 className="text-3xl md:text-5xl font-extrabold text-chocolate drop-shadow-md tracking-tight px-8 py-3 bg-white rounded-full shadow-lg border-2 border-mocha/10">
              {t('home.featured_products', 'Featured Products')}
            </h2>
            <span className="absolute top-1/2 -left-3 w-6 h-6 bg-yellow-400 rounded-full -translate-y-1/2 border-2 border-white shadow-sm z-[-1]"></span>
            <span className="absolute top-1/2 -right-3 w-6 h-6 bg-pink-400 rounded-full -translate-y-1/2 border-2 border-white shadow-sm z-[-1]"></span>
          </div>
        </motion.div>

        {/* Staggered Responsive Grid */}
        <motion.div
          className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-12"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {FEATURED.map((item, index) => (
            <div key={item?.id} className={`${index % 2 !== 0 ? 'mt-8 md:mt-16' : ''}`}><TiltCard>
              <motion.div
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  boxShadow: '0 20px 40px -8px rgba(59,130,246,0.22)',
                  transition: { type: 'spring', stiffness: 400, damping: 10 },
                }}
                whileTap={{
                  scale: 0.97,
                  transition: { type: 'spring', stiffness: 400, damping: 10 },
                }}
                className="relative flex flex-col bg-white rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(61,44,35,0.06)] border border-choco/5 overflow-hidden"
              >
                <Link
                  to={`/product/${item?.id}`}
                  className="group relative flex flex-col flex-1"
                  aria-label={item?.name}
                >
                  <div className="relative aspect-[4/3] sm:aspect-square w-full bg-white overflow-hidden pt-4 px-4 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/40 to-pink-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <motion.img
                      src={item?.image}
                      alt={item?.name}
                      className="w-full h-full object-contain relative z-10 p-2 drop-shadow-md"
                      whileHover={{
                        scale: 1.12,
                        transition: { type: 'spring', stiffness: 300, damping: 14 },
                      }}
                    />
                  </div>

                  <div className="flex flex-col flex-1 p-4 sm:p-5 pt-4 text-center sm:text-start h-[160px] justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-bold tracking-wider text-strawberry uppercase mb-1 sm:mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        {item?.categoryId ? (CATEGORY_LABELS[item.categoryId] || item.categoryId) : 'Candy'}
                      </p>
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-choco font-display tracking-wide line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                        {item?.name}
                      </h3>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cream text-mocha border border-mocha/10 whitespace-nowrap">
                        ⚖️ {item?.weight || 'N/A'}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-mocha/80 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                        📦 {item?.packaging || 'Standard'}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </TiltCard></div>
          ))}
        </motion.div>

        {/* View All Button — scroll reveal with jelly tap */}
        <motion.div
          className="mt-16 text-center"
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div
            whileHover={{
              scale: 1.06,
              y: -4,
              transition: { type: 'spring', stiffness: 400, damping: 10 },
            }}
            whileTap={{
              scale: 0.95,
              transition: { type: 'spring', stiffness: 400, damping: 10 },
            }}
            className="inline-block"
          >
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-choco text-cream rounded-full shadow-lg hover:bg-mocha hover:shadow-mocha/30 jelly-highlight transition-colors duration-300"
            >
              {t('home.view_all', 'View All Candies')}
              <svg className="w-5 h-5 ms-2 rtl:-scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

export default ProductGrid;
