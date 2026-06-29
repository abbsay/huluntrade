import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation, Link } from '@tanstack/react-router'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Home, Candy, Heart, Send } from 'lucide-react'
import { useI18n, LANG_OPTIONS } from '../../i18n'
import Magnetic from '../Magnetic'

const PHONE_DISPLAY = '+86 13967427888';
const PHONE_TEL = '+8613967427888';

const SPRING_JELLY  = { ease: [0.32, 0.72, 0, 1], duration: 0.4 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 300, damping: 20 } as const;

function LangSwitcher({ variant = 'desktop' }: { variant?: 'mobile' | 'desktop' }) {
  const { lang: currentLang, setLang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      {variant === 'desktop' ? (
        <motion.button
          type="button"
          className="flex items-center cursor-pointer select-none group relative z-10 bg-transparent border-none outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-label="Change Language"
          aria-expanded={isOpen}
          whileHover={{ opacity: 0.7 }}
        >
          <img src="/images/categories/minimal_hard_candy.svg" className="w-8 h-8 object-contain drop-shadow-sm mr-1 hover:rotate-12 transition-transform" alt="Language" />
          <span className={`text-[13px] font-medium tracking-tight transition-colors duration-300 ${isOpen ? 'text-choco' : 'text-mocha group-hover:text-choco'}`}>
            {currentLang}
          </span>
        </motion.button>
      ) : (
        <motion.button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-choco/5 text-sm font-black font-display tracking-widest text-mocha focus:ring-2 focus:ring-strawberry/20 shadow-sm"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-label="Change Language"
          aria-expanded={isOpen}
          whileHover={{ scale: 1.05, backgroundColor: '#F5F5F7' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <img src="/images/categories/minimal_toy.svg" className="w-6 h-6 drop-shadow-sm object-contain" />
          <span className="uppercase tracking-wider">{currentLang}</span>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="lang-dropdown"
            className="absolute right-0 rtl:right-auto rtl:left-0 top-12 mt-2 w-36 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-15px_rgba(61,44,35,0.15)] border border-choco/5 py-2 z-[99999] origin-top-right"
            initial={{ opacity: 0, scale: 0.88, y: -8 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.88, y: -8  }}
            transition={SPRING_SMOOTH}
          >
            {LANG_OPTIONS.map((opt) => (
              <motion.button
                key={opt.code}
                className={`w-full text-start px-4 py-2.5 text-sm font-medium
                  ${currentLang === opt.code ? 'bg-white text-choco font-black font-display' : 'text-mocha'}
                `}
                onClick={() => {
                  setLang(opt.code);
                  setIsOpen(false);
                }}
                whileHover={{ backgroundColor: '#F5F5F7', color: '#1D1D1F' }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING_JELLY}
              >
                {opt.native}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const { t } = useI18n();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden', 'lg:overflow-auto');
    } else {
      document.body.classList.remove('overflow-hidden', 'lg:overflow-auto');
    }
    
    const handleResize = () => {
      if (window.innerWidth >= 1024 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const navItems = [
    { id: 'home',        path: '/',        label: t('nav.home',     'Home'),    icon: Home },
    { id: 'products',    path: '/products', label: t('nav.products', 'Products'), icon: Candy },
    { id: 'about',       path: '/about',    label: t('nav.about',   'About us'), icon: Heart },
    { id: 'contact-nav', path: '/contact',  label: t('nav.contact', 'Contact'),  icon: Send },
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[9999] border-b border-strawberry/10 bg-white/70 backdrop-blur-2xl shadow-[0_4px_30px_rgba(255,107,157,0.06)]"
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 xl:px-8">
          <div className="flex items-center justify-between h-[6.5rem]">

            {/* Logo */}
            <Link to="/" onClick={closeMenu} className="flex-shrink-0 relative z-20">
              <Magnetic>
                <motion.img
                  src="/logo.png"
                  alt="Hulun Sweets Logo"
                  className="h-14 sm:h-16 w-auto origin-left rtl:origin-right pointer-events-none filter drop-shadow-md"
                  whileHover={{ scale: 1.08, rotate: -3 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                />
              </Magnetic>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex flex-1 items-center justify-center">
              <ul className="flex items-center space-x-2 rtl:space-x-reverse bg-cream/80 px-4 py-2 rounded-[2.5rem] border border-choco/5 backdrop-blur-xl shadow-inner relative">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  let iconSrc = '/images/categories/minimal_marshmallow.svg';
                  if(item.id === 'home') iconSrc = '/images/categories/minimal_marshmallow.svg';
                  if(item.id === 'products') iconSrc = '/images/categories/minimal_jelly.svg';
                  if(item.id === 'about') iconSrc = '/images/categories/minimal_hard_candy.svg';
                  if(item.id === 'contact-nav') iconSrc = '/images/categories/minimal_toy.svg';

                  return (
                    <li key={item.id} className="relative z-10 w-24">
                      <Link to={item.path} className="block group w-full">
                        <motion.div
                          className="flex flex-col items-center justify-center py-2.5 relative z-10"
                          initial="initial"
                          whileHover="hover"
                          whileTap={{ scale: 0.9, y: 2 }}
                        >
                          <motion.div
                            variants={{
                              initial: { y: 0, scale: 1 },
                              hover: { y: -6, scale: 1.25, rotate: item.id === 'about' ? -15 : 10 }
                            }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            className="mb-1 flex items-center justify-center"
                          >
                            <img src={iconSrc} className="w-10 h-10 object-contain filter drop-shadow-md" alt={item.label} />
                          </motion.div>
                          
                          <span className={`text-[12px] font-black font-display tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-strawberry' : 'text-mocha group-hover:text-strawberry'}`}>
                            {item.label}
                          </span>
                        </motion.div>
                        
                        {isActive && (
                          <motion.div
                            layoutId="active-pill"
                            className="absolute inset-0 bg-white rounded-[2rem] shadow-[0_8px_16px_rgba(255,107,157,0.12)] border border-strawberry/20 z-0"
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold font-sans text-choco bg-cream border border-choco/5 rounded-full shadow-sm"
                whileHover={{ scale: 1.05, backgroundColor: '#FFF0F3' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <img src="/images/categories/minimal_jelly.svg" className="w-7 h-7 drop-shadow-sm object-contain" />
                <span className="tracking-tight">{PHONE_DISPLAY}</span>
              </motion.a>

              <Link to="/contact">
                <motion.div
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold font-sans text-white bg-gradient-to-r from-strawberry to-[#FF9ebb] rounded-full shadow-lg shadow-strawberry/30 cursor-pointer"
                  whileHover={{ scale: 1.08, y: -2, boxShadow: '0 12px 24px rgba(255,107,157,0.4)' }}
                  whileTap={{ scale: 0.94 }}
                >
                  <img src="/images/categories/minimal_hard_candy.svg" className="w-6 h-6 drop-shadow-sm object-contain" /> {t('nav.catalogue', 'Catalogue')}
                </motion.div>
              </Link>

              <div className="h-6 w-px bg-mocha/20 mx-1" />
              <LangSwitcher variant="desktop" />
            </div>

            {/* Mobile Right Icons */}
            <div className="flex lg:hidden items-center gap-3 relative z-20">
              <LangSwitcher variant="mobile" />
              
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-3 text-strawberry bg-cream rounded-[1rem] shadow-sm border border-strawberry/5"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                  <span className={`block h-[3px] w-full bg-current rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block h-[3px] w-full bg-current rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-[3px] w-full bg-current rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </motion.button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 top-0 pt-0 bg-cream z-[99999] lg:hidden overflow-hidden"
            initial={{ opacity: 0, y: '-10%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-10%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          >
            <div className="flex flex-col h-full bg-cream overflow-y-auto pb-safe">
              
              {/* Internal Mobile Header */}
              <div className="flex items-center justify-between h-[6.5rem] px-4 border-b border-strawberry/10 bg-white">
                <div className="h-14 w-auto pointer-events-none filter drop-shadow-md">
                   <img src="/logo.png" className="h-full object-contain" alt="Logo" />
                </div>
                <motion.button
                  onClick={() => setMenuOpen(false)}
                  className="p-3 text-strawberry bg-cream rounded-[1rem] shadow-sm border border-strawberry/5 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </motion.button>
              </div>

              <div className="flex-1 p-6 flex flex-col">
                <nav className="flex-1 mt-4">
                  <motion.ul className="space-y-4">
                    {navItems.map((item) => {
                      const isActive = location.pathname === item.path;
                      let iconSrc = '/images/categories/minimal_marshmallow.svg';
                      if(item.id === 'home') iconSrc = '/images/categories/minimal_marshmallow.svg';
                      if(item.id === 'products') iconSrc = '/images/categories/minimal_jelly.svg';
                      if(item.id === 'about') iconSrc = '/images/categories/minimal_hard_candy.svg';
                      if(item.id === 'contact-nav') iconSrc = '/images/categories/minimal_toy.svg';

                      return (
                        <motion.li key={item.id}>
                          <Link to={item.path} onClick={closeMenu}>
                            <motion.div
                              className={`flex items-center gap-4 p-5 rounded-3xl text-2xl font-black font-display tracking-tight transition-all ${isActive ? 'bg-white shadow-[0_10px_20px_rgba(255,107,157,0.15)] text-strawberry border-2 border-strawberry/20' : 'bg-transparent text-mocha border-2 border-transparent'}`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span className="w-12 h-12 flex items-center justify-center filter drop-shadow-sm"><img src={iconSrc} className="w-8 h-8 object-contain filter drop-shadow-md" alt={item.label} /></span>
                              {item.label}
                            </motion.div>
                          </Link>
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                </nav>

                {/* Mobile Actions Bottom */}
                <motion.div
                  className="mt-auto pt-8 border-t border-choco/5"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="grid grid-cols-1 gap-4 text-center">
                    <motion.a
                      href={`tel:${PHONE_TEL}`}
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white text-choco font-black font-display text-xl shadow-sm border border-choco/5"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img src="/images/categories/minimal_jelly.svg" className="w-8 h-8 object-contain drop-shadow-sm" />
                      {PHONE_DISPLAY}
                    </motion.a>

                    <Link to="/contact" onClick={closeMenu}>
                      <motion.div
                        className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-strawberry text-white font-black font-display text-xl shadow-lg shadow-strawberry/20"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img src="/images/categories/minimal_hard_candy.svg" className="w-8 h-8 object-contain drop-shadow-sm" />
                        {t('nav.catalogue', 'Catalogue')}
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
