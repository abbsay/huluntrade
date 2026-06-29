const fs = require('fs');
const path = require('path');

const rootPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let code = fs.readFileSync(rootPath, 'utf8');

// 1. Mobile Menu Overlay z-index structure. 
// Right now, the Header is z-[100]. 
// The Mobile Menu backdrop is rendered OUTSIDE the Header DOM structure ? Let's check.
// Wait! The Mobile Menu Overlay (<AnimatePresence> {menuOpen && <motion.div>}) is rendered INSIDE the <header> tag!
// BUT the header has z-[100] and overflow-hidden was removed, which is good.
// The dropdown menu is z-50.

// The issue: "Language dropdown menu on mobile is obscured/cut off/behind something"
// If it's inside the dropdown or header, maybe it's cut off by the screen edge (if on the right)
// OR the Mobile Menu Overlay has a z-index [90] while LangSwitcher dropdown has z-50!
// So if you open LangSwitcher *inside* the mobile menu or when the mobile menu is open, z-50 < z-[90].
// Let's upgrade all z-index values for Dropdowns.

// Let's fix the LangSwitcher dropdown z-index
code = code.replace(
  /className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-2 w-36 bg-white rounded-xl shadow-xl shadow-gray-200\/50 border border-gray-100 overflow-hidden py-1 z-50 origin-top-right"/g,
  'className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-2 w-36 bg-white rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden py-1 z-[999] origin-top-right"'
);

// Another issue: On mobile screens, `right-0` might make the dropdown touch the edge of the phone screen exactly, or get clipped by standard browser margins if not careful.
// But z-index is the most likely culprit here.

fs.writeFileSync(rootPath, code);
console.log("Fixed LangSwitcher drop-down z-index issue.");
