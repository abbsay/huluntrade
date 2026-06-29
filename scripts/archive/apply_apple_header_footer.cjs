const fs = require('fs');
const path = require('path');

const rootTsxPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let code = fs.readFileSync(rootTsxPath, 'utf8');

/* ============================================
   1. HEADER BECOMES ABSOLUTE APPLE (Mac/iPad style)
   ============================================ */

// Replace the glassy bouncy container with a completely flat/slightly frosted bar
// Height from h-[5.5rem] lg:h-[6rem] to an extremely thin, utilitarian h-12 to h-16
code = code.replace(
  /<div className="flex items-center justify-between h-\[5\.5rem\] lg:h-\[6rem\]">/,
  '<div className="flex items-center justify-between h-14 md:h-16">' 
);
code = code.replace(
  /className="fixed top-0 left-0 right-0 z-\[100\] border-b backdrop-blur-xl shadow-sm bg-white\/70"/,
  'className="fixed top-0 left-0 right-0 z-[100] border-b border-black/5 bg-white/80 backdrop-blur-2xl"'
);

// Remove the playful bouncy logo scale limits, make it just standard
code = code.replace(
  /className="h-12 sm:h-14 w-auto origin-left rtl:origin-right drop-shadow-sm pointer-events-none"\n\s*style=\{\{ scale: logoScale \}\}/,
  'className="h-7 sm:h-8 w-auto origin-left rtl:origin-right pointer-events-none"'
);
code = code.replace(/whileHover=\{\{ scale: 1\.08 \}\}/g, 'whileHover={{ opacity: 0.7 }}');
code = code.replace(/whileTap=\{\{ scale: 0\.95 \}\}/g, 'whileTap={{ opacity: 0.5 }}');

// Destruct the Capsule Nav background and make it a clean inline list
code = code.replace(
  /className="flex items-center space-x-1 rtl:space-x-reverse bg-gray-50\/70 px-4 py-2 rounded-\[2rem\] border border-gray-100\/60 backdrop-blur-xl shadow-\[0_8px_30px_rgb\(0,0,0,0\.04\)\] relative"/,
  'className="flex items-center space-x-6 lg:space-x-10 rtl:space-x-reverse relative"'
);

// Remove the vertical Icon+Text alignment in the menu, make it pure precision text
const oldNavLiRegex = /<li key=\{item\.id\} className="relative z-10 w-24">[\s\S]*?<\/li>/s;

const newNavLi = `<li key={item.id} className="relative z-10">
                    <Link to={item.path} className="block group">
                      <motion.div
                        className="flex flex-row items-center justify-center py-2 cursor-pointer select-none relative z-10"
                        initial="initial"
                        whileHover="hover"
                      >
                        <span className={\`text-[13px] font-medium tracking-tight transition-colors duration-300 \${isActive ? 'text-black' : 'text-apple-sub group-hover:text-black'}\`}>
                          {item.label}
                        </span>
                      </motion.div>
                    </Link>
                  </li>`;
code = code.replace(oldNavLiRegex, newNavLi);

// Replace Actions container to match the flat text style
code = code.replace(
  /className="hidden lg:flex items-center space-x-1 bg-gray-50\/70 px-4 py-2 rounded-\[2rem\] border border-gray-100\/60 backdrop-blur-xl shadow-\[0_8px_30px_rgb\(0,0,0,0\.04\)\]"/,
  'className="hidden lg:flex items-center space-x-6"'
);

// Replace Phone Action with pure text
const oldPhoneActionRegex = /<motion\.a\s*href=\{\`tel:\$\{PHONE_TEL\}\`\}[\s\S]*?<\/motion\.a>/s;
const newPhoneAction = `<motion.a
              href={\`tel:\${PHONE_TEL}\`}
              className="flex items-center cursor-pointer select-none group relative z-10"
              whileHover={{ opacity: 0.7 }}
            >
              <span className="text-[13px] font-medium tracking-tight transition-colors duration-300 text-apple-sub group-hover:text-black">
                {PHONE_DISPLAY}
              </span>
            </motion.a>`;
code = code.replace(oldPhoneActionRegex, newPhoneAction);

// Replace Catalogue Action with pure text
const oldCatalogueRegex = /<Link to="\/contact" className="block group">[\s\S]*?<\/Link>/s;
const newCatalogue = `<Link to="/contact" className="block group">
              <motion.div
                className="flex items-center cursor-pointer select-none relative z-10"
                whileHover={{ opacity: 0.7 }}
              >
                <span className="text-[13px] font-medium tracking-tight transition-colors duration-300 text-apple-sub group-hover:text-black">
                  {t('nav.catalogue', 'Catalogue')}
                </span>
              </motion.div>
            </Link>`;
code = code.replace(oldCatalogueRegex, newCatalogue);

// Remove the vertical line separator in actions
code = code.replace(/<div className="h-8 w-px bg-gray-200\/80 mx-2" \/>/, '');

// Make LangSwitcher desktop variant purely minimalist text
const oldLangRegex = /\{variant === 'desktop' \? \([\s\S]*?\) : \(/s;
const newLang = `{variant === 'desktop' ? (
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
      ) : (`;
code = code.replace(oldLangRegex, newLang);

// Flatten the mobile nav overlay layout (from fluffy capsule to sharp flat list)
code = code.replace(/className="flex flex-col h-full bg-gradient-to-b from-white to-blue-50\/50 p-6 overflow-y-auto pb-safe"/, 'className="flex flex-col h-full bg-apple-bg p-8 overflow-y-auto pb-safe"');
code = code.replace(/bg-blue-600 text-white shadow-lg shadow-blue-500\/30/g, 'text-black');
code = code.replace(/bg-white text-gray-800 shadow-sm border border-gray-100/g, 'text-apple-sub border-b border-black/5 hover:text-black rounded-none shadow-none');
code = code.replace(/gap-4 p-4 rounded-2xl text-lg font-bold/g, 'py-5 text-2xl font-medium tracking-tight');
// remove icon from mobile nav items
code = code.replace(/<span className="bg-white\/20 p-2 text-current rounded-xl backdrop-blur-sm shadow-sm border border-black\/5"><item\.icon className="w-6 h-6" strokeWidth=\{2\} \/><\/span>/g, '');

// Clean mobile footer links
code = code.replace(/bg-white border-2 border-blue-100 text-blue-700 font-bold shadow-sm/g, 'text-apple-text font-medium text-lg');
code = code.replace(/bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold shadow-lg shadow-pink-500\/25/, 'text-apple-text font-medium text-lg mt-4');
// Strip emojis/playful things from mobile buttons
code = code.replace(/<span className="text-xl">📞<\/span>/, '');
code = code.replace(/<span className="text-xl">📖<\/span>/, '');

/* ============================================
   2. FOOTER BECOMES ABSOLUTE APPLE DIRECTORY
   ============================================ */
code = code.replace(
  /className="relative bg-white pt-16 pb-8 border-t border-gray-100 mt-24"/,
  'className="relative bg-apple-card pt-12 pb-8 border-t border-black/5 mt-0"'
);

// Replace the scattered footer cards block safely by matching a broader scope
const oldFooterCardsRegex = /\{\/\* Staggered footer cards \*\/\}[\s\S]*?(?=\{\/\* Copyright Bottom)/;
const newFooterText = `{/* Apple Directory Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold text-apple-text mb-3">Shop & Learn</h4>
            <ul className="space-y-2 text-xs font-medium text-apple-sub">
              <li><Link to="/products" className="hover:text-black transition-colors">Marshmallow Max</Link></li>
              <li><Link to="/products" className="hover:text-black transition-colors">Jelly M1</Link></li>
              <li><Link to="/products" className="hover:text-black transition-colors">Hard Candy Ultra</Link></li>
              <li><Link to="/products" className="hover:text-black transition-colors">Sweet Catalog</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs font-semibold text-apple-text mb-3">About Hulun</h4>
            <ul className="space-y-2 text-xs font-medium text-apple-sub">
              <li><Link to="/about" className="hover:text-black transition-colors">Our Story</Link></li>
              <li><Link to="/about" className="hover:text-black transition-colors">Manufacturing</Link></li>
              <li><Link to="/about" className="hover:text-black transition-colors">Quality Control</Link></li>
            </ul>
          </div>

          {/* Reach Out */}
          <div>
            <h4 className="text-xs font-semibold text-apple-text mb-3">For Business</h4>
            <ul className="space-y-2 text-xs font-medium text-apple-sub">
              <li><Link to="/contact" className="hover:text-black transition-colors">OEM Customization</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Global Distribution</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Partner Program</Link></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-xs font-semibold text-apple-text mb-3">Contact</h4>
            <ul className="space-y-2 text-xs font-medium text-apple-sub">
              <li>Address: Yiwu, Zhejiang, China</li>
              <li><a href="tel:+8613967427888" className="hover:text-black transition-colors">Phone: +86 13967427888</a></li>
              <li><a href="mailto:Van001@huluntrade.com" className="hover:text-black transition-colors">Van001@huluntrade.com</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-black/5 pt-4 flex flex-col md:flex-row justify-between items-center text-[11px] text-apple-sub font-medium">
          <p className="mb-2 md:mb-0">More ways to shop: Email us directly or call a representative.</p>
        `;

code = code.replace(oldFooterCardsRegex, newFooterText);

// Clean up bottom copyright div
code = code.replace(
  /mt-16 pt-8 border-t border-gray-100 text-center font-medium text-gray-400 flex items-center justify-center gap-3/,
  'flex flex-col md:flex-row items-center justify-between w-full'
);
// Make sure to remove any remaining unicode emojis from the footer copy
code = code.replace(/<motion\.span[\s\S]*?⌘\s*<\/motion\.span>/, '');
code = code.replace(/<motion\.span[\s\S]*?\s*<\/motion\.span>/, '');

fs.writeFileSync(rootTsxPath, code);
console.log("Global Header & Footer completely replaced with Absolute Apple Architecture.");
