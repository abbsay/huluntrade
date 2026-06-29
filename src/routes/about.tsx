import { createFileRoute } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useI18n } from '../i18n'

export const Route = createFileRoute('/about')({
  component: About,
})

const springApple = { type: 'spring', stiffness: 200, damping: 12, mass: 0.8 };

function About() {
  const { t } = useI18n();
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <main className="min-h-screen bg-cream text-choco antialiased pt-40 lg:pt-48 pb-32 overflow-hidden">
      
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
          <h2 className="text-mocha font-black font-display tracking-widest uppercase text-sm mb-4">Our Core Values</h2>
          <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black font-display tracking-tighter leading-[1.05]">
            Engineering<br />happiness.
          </h1>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={springApple}
          className="space-y-12 text-2xl md:text-3xl lg:text-[40px] leading-[1.3] font-medium tracking-tight text-mocha"
        >
          <p className="text-choco">
            We believe that a simple piece of candy holds the profound power to elevate the human experience.
          </p>
          <p>
            Started as a visionary dream, Hulun Sweets focuses on the intersection of taste, geometry, and pure joy. No compromises. Just absolute perfection in every bite.
          </p>
          <p>
            From the pillowy softness of our marshmallows to the vibrant flavors of our fruit jellies, we craft every sweet to bring a smile to your face.
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
          <h3 className="text-4xl font-black font-display tracking-tighter mb-4 text-choco">The future is sweet.</h3>
          <p className="text-xl text-mocha font-medium">Join us in making the world a slightly better, vastly sweeter place.</p>
        </motion.div>

      </div>
    </main>
  )
}
