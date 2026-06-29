const fs = require('fs');
const path = require('path');

const rootTsxPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let code = fs.readFileSync(rootTsxPath, 'utf8');

// The ultimate bug finding for the weird "rounded white cutoff" on mobile menu!
// The structure:
// <motion.header className="fixed top-0 left-0 right-0 z-[9999] ...">
//    <AnimatePresence> {menuOpen && <motion.div className="fixed inset-0 top-0 pt-0 bg-white z-[99999] ...">...
// 
// IF the mobile overlay is rendered INSIDE the `motion.header`, it inherits the Stacking Context and bounding boxes of the `motion.header`.
// In iOS Safari and some mobile views, if a child (fixed inset-0) is inside a `header` that doesn't have 100vh, weird clipping or rendering artifacts can happen.
// MORE IMPORTANTLY:
// Did I miss an `overflow-hidden` somewhere?
// The overlay container is `<motion.div className=".... overflow-hidden">` (line 275).
// What is inside?
// `<div className="flex flex-col h-full bg-cream overflow-y-auto pb-safe">`
// Wait. A `fixed inset-0` div nested INSIDE a `fixed h-[6.5rem]` header might get trapped if there is any `clip` or `border-radius` mask applied by framer-motion or browser rendering bugs.
// BUT there's another thing: Look at the screenshot! The bottom of the beige area has a PINK BORDER CURVE.
// Where is that curve coming from??
// Let's search for `rounded-[...` or `border-strawberry` in index.tsx or __root.tsx that might be bleeding.
// Actually, earlier in this chat, we injected:
// `bg-white/90 backdrop-blur-2xl rounded-[3rem] border border-white overflow-hidden` inside the product page.
// IS THAT BLEEDING INTO THE MOBILE MENU?
// If the user meant "clicking Hamburger menu", maybe it's just the `y: '-10%'` animation pulling the container up and exposing the bottom edge?
// NO! Look at the screenshot. It has a WHITE background below a CREAM box with rounded inverted corners (like an Apple dynamic island or a tab bar)!

// Let's completely un-nest the `<AnimatePresence>` from inside the `<motion.header>`!
// It should be a sibling to `<Header />` or rendered via a proper portal, or just moved to the end of the Header component but OUTSIDE the `<motion.header>` tag.

// Current Structure in Header():
// return (
//   <motion.header> ... </motion.header>
//   {/* Oh wait! In my code, the `<AnimatePresence>` IS currently INSIDE `<motion.header>`! */}
// ); // End of Header.

// Let's change the return of Header to be:
// return (
//   <>
//     <motion.header> ... </motion.header>
//     <AnimatePresence> ... </AnimatePresence>
//   </>
// );

const regexTarget = /\s*\{\/\* Mobile Menu Overlay \*\/\}\s*<AnimatePresence>/g;
if (code.match(regexTarget)) {
  // Move it out of `<motion.header>` 
  // First, find the closing `    </motion.header>`
  code = code.replace(
      /(\s*)\{\/\* Mobile Menu Overlay \*\/\}[\s\S]*?<\/AnimatePresence>\s*<\/motion\.header>/,
      (match, indent) => {
          // Inside match, we have the overlay code and then `</motion.header>`
          // We swap their order.
          let contentWithoutHeaderClose = match.replace(/<\/motion\.header>/, '');
          return `</motion.header>\n${contentWithoutHeaderClose}`;
      }
  );
}

// Ensure the Header returns a fragment now `<>` and `</>`
code = code.replace(/return \(\s*<motion\.header/, 'return (\n    <>\n      <motion.header');
code = code.replace(/<\/AnimatePresence>\s*\);\s*\}/, '</AnimatePresence>\n    </>\n  );\n}');

// Let's also check the actual backdrop bug.
// `className="flex flex-col h-full bg-cream overflow-y-auto pb-safe"`
// Let's make the absolute base `bg-white`, so there's no weird gaps.
code = code.replace(/bg-white z-\[99999\] lg:hidden overflow-hidden/, 'bg-cream z-[99999] lg:hidden overflow-hidden');

fs.writeFileSync(rootTsxPath, code);
console.log("Mobile Drawer completely detatched from Header constraints.");
