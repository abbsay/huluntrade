const fs = require('fs');
const path = require('path');

const rootTsxPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let code = fs.readFileSync(rootTsxPath, 'utf8');

// I notice you said: "移动版顶部的导航显示有点问题"
// What is the problem? 
// The problem is likely the mobile Lang Switcher / Hamburger button alignment.
// Looking at the mobile navbar icons code:
// <div className="flex lg:hidden items-center gap-3 relative z-20">
//   <LangSwitcher variant="mobile" />
//   <motion.button ...
// The problem might be the LangSwitcher is pushing things around or has ugly white background that clashes.
// But another big issue is the logo scale on mobile!
// The mobile dropdown overlay is `top-0 pt-[104px]`. This is correct to clear the header.
// BUT because I replaced emojis with `<img>` in the navbar map, did I maybe mess up the logo alignment?
// No, logo class is: `h-14 sm:h-16 w-auto origin-left rtl:origin-right pointer-events-none filter drop-shadow-md`

// Wait, the actual Mobile Menu bottom buttons (Phone, Contact) inside the overlay were LOST during my earlier restoration when I fixed the `</main>` error!
// Look at `cat -n madasweet-clone/src/routes/__root.tsx | sed -n '280,310p'`:
// After the `</nav>`, it just closes the `</div>` and `</motion.div>`. The action buttons at the bottom of the mobile overlay are gone!
// Let's restore them.

const mobileNavRegex = /<\/nav>\s*<\/div>\s*<\/motion\.div>/;
const mobileNavWithActions = `</nav>

              {/* Mobile Actions Bottom */}
              <motion.div
                className="mt-auto pt-8 border-t border-choco/5"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="grid grid-cols-1 gap-4 text-center">
                  <motion.a
                    href={\`tel:\${PHONE_TEL}\`}
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
          </motion.div>`;

code = code.replace(mobileNavRegex, mobileNavWithActions);

// Secondly, check if the LangSwitcher has issues on mobile:
// <LangSwitcher variant="mobile" /> returns a <button> with `px-3 py-1.5 bg-gray-50`. It looks fine.
// What about the "Header Collision"? Does the absolute positioned mobile menu cover the header? 
// <motion.div className="fixed inset-0 top-0 pt-[104px] bg-white z-[90] lg:hidden">
// The header is `bg-white/70 backdrop-blur-2xl`. So if the menu is under it (z-[90] < z-[100]), it's fine.

fs.writeFileSync(rootTsxPath, code);
console.log("Mobile Nav Bottom Actions Restored!");
