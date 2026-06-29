const fs = require('fs');
const path = require('path');

const rootPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let code = fs.readFileSync(rootPath, 'utf8');

const brokenTailRegex = /<Link to=\{item\.path\} onClick=\{closeMenu\}>[\s\S]*?\n\}/s;

const restoredComponents = `<Link to={item.path} onClick={closeMenu}>
                          <motion.span
                            className={\`
                              flex items-center py-5 text-2xl font-medium tracking-tight
                              \${isActive
                                ? 'text-black'
                                : 'text-apple-sub border-b border-black/5 hover:text-black rounded-none shadow-none'
                              }
                            \`}
                            whileHover={{ opacity: 0.7, x: 4 }}
                            whileTap={{ opacity: 0.5 }}
                            transition={SPRING_JELLY}
                            style={{ display: 'flex' }}
                          >
                            {item.label}
                          </motion.span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>

              <motion.div
                className="mt-auto pt-8 border-t border-black/5"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, ...SPRING_SMOOTH }}
              >
                <div className="grid grid-cols-1 gap-4 text-center">
                  <motion.a
                    href={\`tel:\${PHONE_TEL}\`}
                    className="flex justify-center w-full py-4 rounded-xl bg-apple-card text-apple-text font-medium text-lg"
                    whileHover={{ opacity: 0.8 }}
                  >
                    {PHONE_DISPLAY}
                  </motion.a>

                  <Link to="/contact" onClick={closeMenu}>
                    <motion.div
                      className="flex justify-center w-full py-4 rounded-xl bg-apple-blue text-white font-medium text-lg"
                      whileHover={{ opacity: 0.8 }}
                    >
                      {t('nav.catalogue', 'Catalogue')}
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

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
          <span className={\`text-[13px] font-medium tracking-tight transition-colors duration-300 \${isOpen ? 'text-black' : 'text-apple-sub group-hover:text-black'}\`}>
            {currentLang}
          </span>
        </motion.button>
      ) : (
        <motion.button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-apple-blue/20"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-label="Change Language"
          aria-expanded={isOpen}
          whileHover={{ scale: 1.05, backgroundColor: '#F5F5F7' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Globe className="w-5 h-5 text-gray-500" />
          <span className="uppercase tracking-wider">{currentLang}</span>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="lang-dropdown"
            className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-2 w-36 bg-white rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 py-1 z-[999] origin-top-right"
            initial={{ opacity: 0, scale: 0.88, y: -8 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.88, y: -8  }}
            transition={SPRING_SMOOTH}
          >
            {LANG_OPTIONS.map((opt) => (
              <motion.button
                key={opt.code}
                className={\`w-full text-start px-4 py-2.5 text-sm font-medium
                  \${currentLang === opt.code ? 'bg-apple-card text-black font-semibold' : 'text-apple-sub'}
                \`}
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

function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative bg-apple-card pt-12 pb-8 border-t border-black/5 mt-0 z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Apple Directory Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div>
            <h4 className="text-xs font-semibold text-apple-text mb-3">Shop & Learn</h4>
            <ul className="space-y-2 text-xs font-medium text-apple-sub">
              <li><Link to="/products" className="hover:text-black transition-colors">Marshmallow Max</Link></li>
              <li><Link to="/products" className="hover:text-black transition-colors">Jelly M1</Link></li>
              <li><Link to="/products" className="hover:text-black transition-colors">Hard Candy Ultra</Link></li>
              <li><Link to="/products" className="hover:text-black transition-colors">Sweet Catalog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-apple-text mb-3">About Hulun</h4>
            <ul className="space-y-2 text-xs font-medium text-apple-sub">
              <li><Link to="/about" className="hover:text-black transition-colors">Our Story</Link></li>
              <li><Link to="/about" className="hover:text-black transition-colors">Manufacturing</Link></li>
              <li><Link to="/about" className="hover:text-black transition-colors">Quality Control</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-apple-text mb-3">For Business</h4>
            <ul className="space-y-2 text-xs font-medium text-apple-sub">
              <li><Link to="/contact" className="hover:text-black transition-colors">OEM Customization</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Global Distribution</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Partner Program</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-apple-text mb-3">Contact</h4>
            <ul className="space-y-2 text-xs font-medium text-apple-sub">
              <li>Address: Yiwu, Zhejiang, China</li>
              <li><a href="tel:+8613967427888" className="hover:text-black transition-colors">Phone: +86 13967427888</a></li>
              <li><a href="mailto:Van001@huluntrade.com" className="hover:text-black transition-colors">Van001@huluntrade.com</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-black/5 pt-4 flex flex-col md:flex-row justify-between items-start md:items-center text-[11px] text-apple-sub font-medium gap-4">
          <p>More ways to shop: Email us directly or call a representative.</p>
          <p>{t('footer.copyright', '© 2026 Hulun Sweets. All rights reserved.')}</p>
        </div>
      </div>
    </footer>
  );
}
`;

code = code.replace(brokenTailRegex, restoredComponents);
fs.writeFileSync(rootPath, code);
console.log("Root framework RESTORED safely to disk!");
