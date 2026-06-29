const fs = require('fs');
const path = require('path');

const rootPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let code = fs.readFileSync(rootPath, 'utf8');

/* ============================================
   1. SWEETEN THE HEADER / NAVBAR 🍭
   ============================================ */

const oldHeaderRegex = /<motion\.header[\s\S]*?<\/motion\.header>/;
const newHeader = `<motion.header
      className="fixed top-0 left-0 right-0 z-[100] border-b border-strawberry/10 bg-white/70 backdrop-blur-2xl shadow-[0_4px_30px_rgba(255,107,157,0.06)]"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 xl:px-8">
        <div className="flex items-center justify-between h-[6.5rem]">

          {/* Logo - Bouncy */}
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

          {/* Desktop Nav - Pill Shape & Big Emojis */}
          <nav className="hidden lg:flex flex-1 items-center justify-center">
            <ul className="flex items-center space-x-2 rtl:space-x-reverse bg-cream/80 px-4 py-2 rounded-[2.5rem] border border-choco/5 backdrop-blur-xl shadow-inner relative">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                
                // Assign cute emojis dynamically
                let emoji = '🍡';
                if(item.id === 'home') emoji = '🏠';
                if(item.id === 'products') emoji = '🍬';
                if(item.id === 'about') emoji = '💖';
                if(item.id === 'contact-nav') emoji = '🚀';

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
                          className="text-2xl mb-1 filter drop-shadow-sm"
                        >
                          {emoji}
                        </motion.div>
                        
                        <span className={\`text-[12px] font-black font-display tracking-widest uppercase transition-colors duration-300 \${isActive ? 'text-strawberry' : 'text-mocha group-hover:text-strawberry'}\`}>
                          {item.label}
                        </span>
                      </motion.div>
                      
                      {/* Active Pink Bubble Background */}
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
              href={\`tel:\${PHONE_TEL}\`}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold font-sans text-choco bg-cream border border-choco/5 rounded-full shadow-sm"
              whileHover={{ scale: 1.05, backgroundColor: '#FFF0F3' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <span className="text-xl">📞</span>
              <span className="tracking-tight">{PHONE_DISPLAY}</span>
            </motion.a>

            <Link to="/contact">
              <motion.div
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold font-sans text-white bg-gradient-to-r from-strawberry to-[#FF9ebb] rounded-full shadow-lg shadow-strawberry/30 cursor-pointer"
                whileHover={{ scale: 1.08, y: -2, boxShadow: '0 12px 24px rgba(255,107,157,0.4)' }}
                whileTap={{ scale: 0.94 }}
              >
                <span>📖</span> {t('nav.catalogue', 'Catalogue')}
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
              className="p-2 -mr-2 text-strawberry bg-cream rounded-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={\`block h-[3px] w-full bg-current rounded-full transition-all duration-300 \${menuOpen ? 'rotate-45 translate-y-2' : ''}\`} />
                <span className={\`block h-[3px] w-full bg-current rounded-full transition-all duration-300 \${menuOpen ? 'opacity-0' : ''}\`} />
                <span className={\`block h-[3px] w-full bg-current rounded-full transition-all duration-300 \${menuOpen ? '-rotate-45 -translate-y-2' : ''}\`} />
              </div>
            </motion.button>
          </div>

        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 top-0 pt-[104px] bg-white z-[90] lg:hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="flex flex-col h-full bg-cream p-8 overflow-y-auto pb-safe">
              <nav className="flex-1 mt-4">
                <motion.ul className="space-y-4">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    let emoji = '🍡';
                    if(item.id === 'home') emoji = '🏠';
                    if(item.id === 'products') emoji = '🍬';
                    if(item.id === 'about') emoji = '💖';
                    if(item.id === 'contact-nav') emoji = '🚀';

                    return (
                      <motion.li key={item.id}>
                        <Link to={item.path} onClick={closeMenu}>
                          <motion.div
                            className={\`flex items-center gap-4 p-5 rounded-3xl text-2xl font-black font-display tracking-tight transition-all \${isActive ? 'bg-white shadow-[0_10px_20px_rgba(255,107,157,0.15)] text-strawberry border-2 border-strawberry/20' : 'bg-transparent text-mocha border-2 border-transparent'}\`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="text-3xl filter drop-shadow-sm">{emoji}</span>
                            {item.label}
                          </motion.div>
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>`;

code = code.replace(oldHeaderRegex, newHeader);

/* ============================================
   2. FIX LANG SWITCHER (Cute Earth Emoji)
   ============================================ */
code = code.replace(
  /<Globe className="w-5 h-5 text-gray-500" \/>/g,
  '<span className="text-lg">🌍</span>'
);
const oldDesktopLang = /<span className=\{\`text-\[13px\] font-medium tracking-tight transition-colors duration-300 \$\{isOpen \? 'text-black' : 'text-apple-sub group-hover:text-black'\`>\s*\{currentLang\}\s*<\/span>/m;
code = code.replace(
  oldDesktopLang,
  `<span className="text-xl">🌍</span>
   <span className={\`text-[13px] font-black font-sans uppercase tracking-widest transition-colors duration-300 ml-1 \${isOpen ? 'text-strawberry' : 'text-mocha group-hover:text-strawberry'}\`}>
     {currentLang}
   </span>`
);
code = code.replace(/text-black/g, 'text-choco'); // Just a sweep safety
code = code.replace(/text-white/g, 'text-white');

fs.writeFileSync(rootPath, code);
console.log("🌸 Sweet Cute Nav injected successfully!");
