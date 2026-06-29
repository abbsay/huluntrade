const fs = require('fs');
const path = require('path');

const rootTsxPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let code = fs.readFileSync(rootTsxPath, 'utf8');

// ISSUE 1: "挤到边上了" (Pushed to the edge)
// Let's look at the mobile right icons wrapping div:
// `<div className="flex lg:hidden items-center gap-3 relative z-20">`
// Wait, the wrapper in Header has `px-4 md:px-6 xl:px-8`. This applies 16px of padding on small screens.
// But the hamburger button has `-mr-2` which pulls it to the right!
// `<motion.button onClick={() => setMenuOpen(!menuOpen)} className="p-2 -mr-2 text-strawberry bg-cream rounded-xl"`
// Let's remove `-mr-2` to make it sit properly inside the padded container, not touching the absolute screen edge.

code = code.replace(
  /className="p-2 -mr-2 text-strawberry bg-cream rounded-xl"/,
  'className="p-3 text-strawberry bg-cream rounded-[1rem] shadow-sm border border-strawberry/5"' // Added some subtle styling too
);

// ISSUE 2: "点击后，变成图二那样了" (Clicking it makes it look like a weird cut-off white box like Image 2)
// Why does the menu look like a weird white block at the top?
// Ah! Look at the Mobile Menu Overlay definition:
// `className="fixed inset-0 top-0 pt-[110px] bg-cream z-[9000] lg:hidden"`
// Wait, the `<AnimatePresence>` overlay is `bg-cream`. The header is `bg-white/70 backdrop-[2xl]`.
// If the Header is `z-[9999]` and the Mobile Menu is `z-[9000]` starting from `top-0` but has `pt-[110px]`...
// When you open it, the `bg-cream` from the overlay passes UNDER the translucent header (`bg-white/70`).
// This makes the header area look weirdly mixed (white + cream = muddy cut-off lines).
// AND, what is that pink border curve in Image 2?
// Oh! It's our Mobile Menu overlay opening animation!
// `initial={{ opacity: 0, scale: 0.98 }}` -> If it scales UP, a giant colored box scaling up behind a translucent header looks terrible.

// Let's fix the animation to be a slide-down curtain (from top), NOT a scale-up.
// And let's make the mobile menu start exactly BELOW the header so they don't overlap, OR make the mobile overlay solid white with `z-[99999]` over everything including the header.
// A full-screen overlay over the header is much cleaner. We just need to add a "Close (X)" button inside the overlay, or keep the header visible but solid.

// Let's go with: The Mobile Menu takes over the entire screen OVER the header.
code = code.replace(
  /className="fixed inset-0 top-0 pt-\[110px\] bg-cream z-\[9000\] lg:hidden"/,
  'className="fixed inset-0 top-0 pt-0 bg-white z-[99999] lg:hidden overflow-hidden"'
);

// Now, since it covers the header, we must provide a custom top-bar INSIDE the mobile menu with the Logo and an X (Close) button!
// We'll replace the `<nav className="flex-1 mt-4">` with a custom header + nav.

const oldMobileNavRegex = /<div className="flex flex-col h-full bg-cream p-8 overflow-y-auto pb-safe">[\s\S]*?<nav className="flex-1 mt-4">/;
const newMobileNav = `<div className="flex flex-col h-full bg-cream overflow-y-auto pb-safe">
              
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
                <nav className="flex-1 mt-4">`;

code = code.replace(oldMobileNavRegex, newMobileNav);

// Since we opened a flex wrapper `<div className="flex-1 p-6 flex flex-col">`, we must close it before the end of the mobile menu `</motion.div>`.
// The end of the mobile actions was:
//               </motion.div>
//             </div>
//           </motion.div>
code = code.replace(
  /<\/motion\.div>\n\s*<\/div>\n\s*<\/motion\.div>/g,
  `</motion.div>\n              </div>\n            </div>\n          </motion.div>`
);

// Modify the overlay animation so it pulls down smoothly like a premium app drawer:
code = code.replace(
  /initial=\{\{ opacity: 0, scale: 0\.98 \}\}\s*animate=\{\{ opacity: 1, scale: 1 \}\}\s*exit=\{\{ opacity: 0, scale: 0\.98 \}\}\s*transition=\{\{ type: 'spring', stiffness: 300, damping: 25 \}\}/,
  `initial={{ opacity: 0, y: '-10%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-10%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}`
);

fs.writeFileSync(rootTsxPath, code);
console.log("Mobile Nav hamburger clipping and layout bugs squashed!");
