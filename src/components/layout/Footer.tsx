import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useI18n } from '../../i18n'

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative bg-white pt-20 pb-10 mt-0 z-10 overflow-hidden font-sans border-t-[8px] border-cream">
      
      {/* Playful Top Decoration (Optional abstract blob bleeding into footer) */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply opacity-50 blur-[50px] z-0 pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Adorable 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16">
          
          {/* Left: Address / Brand */}
          <motion.div 
            className="flex flex-col bg-cream/50 p-8 rounded-[2rem] border border-mocha/5 hover:border-strawberry/20 hover:bg-cream transition-colors duration-500 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="w-16 h-16 mb-4 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 origin-bottom-left filter drop-shadow-md">
              <img src="/images/categories/minimal_marshmallow.svg" className="w-full h-full object-contain" alt="Location" />
            </div>
            <h3 className="text-2xl font-black font-display text-choco tracking-tight mb-2">Hulun Sweets</h3>
            <p className="text-mocha font-medium text-lg leading-relaxed mb-6">
              Making the world a little sweeter, one candy at a time.<br/>
              Located in the heart of <strong>Yiwu, Zhejiang, China.</strong>
            </p>
            <motion.a
              href="https://maps.google.com/?q=Yiwu,Zhejiang,China"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-strawberry font-bold text-sm shadow-[0_4px_16px_rgba(61,44,35,0.06)] border border-mocha/5 w-max"
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 8px 24px rgba(255,107,157,0.2)' }}
              whileTap={{ scale: 0.96 }}
            >
              {t('footer.findus', 'Find Us on Map')} 🗺️
            </motion.a>
          </motion.div>

          {/* Right: Connect / Contact */}
          <motion.div 
            className="flex flex-col bg-pink-50/50 p-8 rounded-[2rem] border border-mocha/5 hover:border-strawberry/20 hover:bg-pink-50 transition-colors duration-500 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
          >
            <div className="w-16 h-16 mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 origin-bottom-right filter drop-shadow-md">
              <img src="/images/categories/minimal_toy.svg" className="w-full h-full object-contain" alt="Contact Us" />
            </div>
            <h3 className="text-2xl font-black font-display text-choco tracking-tight mb-4">Let's Talk Sweet!</h3>
            
            <div className="space-y-4 text-lg font-medium text-mocha/80">
              <div className="flex items-center gap-3">
                <img src="/images/categories/minimal_jelly.svg" className="w-7 h-7 mr-2 object-contain drop-shadow-sm flex-shrink-0" alt="Phone" />
                <a href="tel:+8613967427888" className="hover:text-strawberry transition-colors">+86 13967427888 / 17758069907</a>
              </div>
              <div className="flex items-center gap-3">
                <img src="/images/categories/minimal_hard_candy.svg" className="w-7 h-7 mr-2 object-contain drop-shadow-sm flex-shrink-0" alt="Email" />
                <a href="mailto:Van001@huluntrade.com" className="hover:text-strawberry transition-colors border-b-2 border-transparent hover:border-strawberry/30 pb-0.5">Van001@huluntrade.com</a>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Link to="/contact" className="text-sm font-bold text-choco bg-white px-5 py-2.5 rounded-full border border-choco/10 shadow-sm hover:border-choco/30 transition-colors">
                  Open Contact Form 🚀
                </Link>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Copyright & Playful Emojis */}
        <motion.div 
          className="border-t-[3px] border-dashed border-choco/10 pt-8 flex flex-col md:flex-row justify-center items-center text-[13px] text-mocha font-bold tracking-widest uppercase gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.span
            className="text-2xl cursor-pointer select-none filter drop-shadow-sm"
            whileHover={{ scale: 1.3, rotate: -15, y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src="/images/categories/minimal_jelly.svg" className="w-8 h-8 object-contain drop-shadow-sm" alt="sweet" />
          </motion.span>
          <p>{t('footer.copyright', '© 2026 Hulun Sweets. Made with Love.')}</p>
          <motion.span
            className="text-2xl cursor-pointer select-none filter drop-shadow-sm"
            whileHover={{ scale: 1.3, rotate: 15, y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src="/images/categories/minimal_hard_candy.svg" className="w-8 h-8 object-contain drop-shadow-sm" alt="sweet" />
          </motion.span>
        </motion.div>
      </div>
    </footer>
  );
}
