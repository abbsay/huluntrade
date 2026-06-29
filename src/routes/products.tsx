import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n'

const CATEGORIES = [
  { id: 'marshmallow', name: 'Soft Marshmallow', desc: 'Lighter than air.', img: '/images/categories/minimal_marshmallow.svg' },
  { id: 'jelly',       name: 'Juicy Fruit Jelly', desc: 'Bursting with flavor dynamics.', img: '/images/categories/minimal_jelly.svg' },
  { id: 'hard_candy',  name: 'Crystal Hard Candy', desc: 'Enduring sweetness. Unmatched crunch.', img: '/images/categories/minimal_hard_candy.svg' },
  { id: 'candy_toy',   name: 'Candy Toys', desc: 'Where taste meets play.', img: '/images/categories/minimal_toy.svg' }
];

export const Route = createFileRoute('/products')({
  component: Products,
})

const springApple = { type: 'spring', stiffness: 200, damping: 12, mass: 0.8 };

function Products() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-cream pt-40 lg:pt-48 pb-32 flex flex-col items-center antialiased">
      
      {/* Header */}
      <div className="w-full max-w-[1240px] px-4 md:px-6 mb-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springApple}
          className="text-5xl md:text-7xl font-black font-display text-choco tracking-tighter"
        >
          Shop Sweets
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springApple, delay: 0.1 }}
          className="text-xl text-mocha mt-4 font-medium"
        >
          Select a category to explore our crafted treats.
        </motion.p>
      </div>

      {/* Modern minimal grid */}
      <div className="w-full max-w-[1240px] px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springApple, delay: i * 0.1 }}
            >
              <Link 
                to={`/category/${cat.id}`} 
                className="group flex flex-col items-center bg-white rounded-[2rem] pt-16 px-8 pb-12 transition-all duration-500 hover:shadow-2xl overflow-hidden relative"
              >
                <h2 className="text-3xl lg:text-4xl font-black font-display text-choco tracking-tight z-10">{cat.name}</h2>
                <p className="text-lg text-mocha font-medium mt-2 mb-10 z-10">{cat.desc}</p>
                
                <div className="relative w-full aspect-square max-h-[300px] flex items-center justify-center z-10">
                  <motion.img 
                    src={cat.img} 
                    alt={cat.name}
                    className="object-contain max-h-full max-w-full drop-shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, duration: 0.8 }}
                  />
                </div>
                
                {/* Minimal "Buy" Call to action */}
                <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-choco group-hover:bg-strawberry group-hover:text-white transition-colors duration-300">
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
