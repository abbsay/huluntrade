const fs = require('fs');
const path = require('path');

const rootPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let code = fs.readFileSync(rootPath, 'utf8');

// 1. RootLayout has overflow-x-hidden which creates a new block formatting context and CAN clip
// fixed/absolute content that bleeds out horizontally if it's considered part of the flow.
code = code.replace(
  /<div className="flex flex-col flex-grow relative w-full overflow-x-hidden">/g,
  '<div className="flex flex-col flex-grow relative w-full">'
);

// 2. The mobile menu container inside Header might be clipping it because it's rendered in DOM
// inside a relative div setup. But let's check Header.
// In Header:
// <div className="flex lg:hidden items-center gap-3 relative z-20">
//   <LangSwitcher variant="mobile" />

// If LangSwitcher emits an absolute box, it's relative to "flex lg:hidden items-center gap-3 relative z-20".
// On Mobile, this wrapper is near the right edge of the screen!
// "absolute right-0" means it drops OUT of the right, but the parent is already near the right.
// Wait! "absolute right-0" means flush with the *right* edge of its relative parent. That's fine.
// BUT! To be absolutely safe with stacking contexts, especially with Motion elements and z-indexes, 
// using a Portal for dropdowns is the best, but requires React.createPortal which is heavy.

// Let's modify the LangSwitcher parent wrapper in the mobile nav section.
// Ensure it doesn't have clipping or zero height/width issues.
const mobileNavWrapper = /<div className="flex lg:hidden items-center gap-3 relative z-20">/;
// It's correct.

// 3. What if it's the `motion.header` generating a clipping context?
// `motion.div` and `motion.header` sometimes generate translate3d or will-change, which creates a new Stacking Context.
// If the Dropdown is in the flow of the Header, and the Header is creating a Stacking Context, 
// then the Dropdown can NEVER break out of the Header's z-index tree.
// Is `dropdown` being cut by something *outside* the header, or *inside*?
// "Dropdown被遮挡" Usually means it drops down *behind* the main body content or carousels!
// If it drops behind the main content, why?
// The header IS z-[100]. But wait! Header's `style={{ padding... }}` from Framer uses GPU acceleration.
// When Framer applies Transform or GPU props to `<motion.header>`, it STRICTLY confines everything inside it to a new local Z-axis!
// So if the rest of the page (like Hero Slider) has its own stacking context, it might battle.
// Actually, Swiper creates very aggressive stacking contexts.

// Let's make sure the Header itself remains unclipped, but the dropdown position is 100% immune.
// We change:
// `className="relative" ref={rootRef}`
// to
// `className="relative group" ref={rootRef}`
// And we'll just make the dropdown use fixed positioning or rely on standard absolute.

// WAIT! Look at __root.tsx LangSwitcher again:
// It uses `transform` from Framer Motion. 
// "AnimatePresence" -> "motion.div"
// Let's remove the "overflow-hidden" from the DROPDOWN itself just in case it's clipping its own text.
code = code.replace(
  /bg-white rounded-xl shadow-xl shadow-gray-200\/50 border border-gray-100 overflow-hidden py-1 z-\[999\] origin-top-right/g,
  'bg-white rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 py-1 z-[999] origin-top-right'
);

// We need to FIX the wrapping issue if the right edge of the screen cuts it.
// Right now it's: `right-0 rtl:right-auto rtl:left-0`
// On a small phone screen, right-0 aligns it to the button's right. It might still go off-screen if the button is too close to the edge.
// Let's give it a slight offset: `right-0 -mr-2` or change to `right-0`

fs.writeFileSync(rootPath, code);

console.log("Applied absolute clipping bypass.");
