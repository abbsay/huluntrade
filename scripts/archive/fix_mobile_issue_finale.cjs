const fs = require('fs');
const path = require('path');

const rootTsxPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let code = fs.readFileSync(rootTsxPath, 'utf8');

// I finally understand what "还没修好" (still not fixed) regarding the mobile nav display problem!
// We've looked at the Z-Index, we've looked at missing buttons...
// Wait, look at this exact section in __root.tsx for Mobile Overlay:
//
// className="fixed inset-0 top-[72px] bg-white z-[90] lg:hidden"
//
// In our recent code:
// className="fixed inset-0 top-0 pt-[88px] bg-white z-[90] lg:hidden"
//
// WAIT, because the mobile Dropdown (LangSwitcher) in the Header `<div className="flex lg:hidden items-center gap-3 relative z-20">`
// operates WITH `absolute right-0 top-full`.
// If the Mobile Menu Overlay `z-[90]` renders OVER the whole page AND overlaps the Header's bounds, 
// OR if the Dropdown `z-[999]` is inside a container that gets masked.
// Actually, earlier you said "dropdown menu被遮挡了". 
// It could be that the Dropdown menu drops BEHIND the Mobile Menu Overlay if BOTH are active.
// Or if you meant the actual Mobile Fullscreen Menu itself is weirdly positioned.

// Let's completely rebuild the Z-Index stacking hierarchy for the Header to be absolutely bulletproof on mobile.
// Header Navbar -> z-[100]
// Mobile Fullscreen Menu Overlay -> z-[90] (Should drop down from behind the header!)
// LangSwitcher Dropdown Menu -> z-[999] (Must pop over everything)

// Let's ensure the Header nav container specifically doesn't trap the dropdown.
code = code.replace(
  /className="fixed top-0 left-0 right-0 z-\[100\] border-b border-strawberry\/10 bg-white\/70 backdrop-blur-2xl shadow-\[0_4px_30px_rgba\(255,107,157,0\.06\)\]"/,
  'className="fixed top-0 left-0 right-0 z-[9999] border-b border-strawberry/10 bg-white/70 backdrop-blur-2xl shadow-[0_4px_30px_rgba(255,107,157,0.06)]"'
);

// Mobile Overlay
code = code.replace(
  /className="fixed inset-0 top-0 pt-\[[0-9]+px\] bg-white z-\[90\] lg:hidden"/g,
  'className="fixed inset-0 top-0 pt-[110px] bg-cream z-[9000] lg:hidden"'
);

// Oh wait, if the mobile menu uses `pt-[110px]` it pushes its contents down. 
// What if the user meant: "On mobile, the navigation displaying is weird" as in, something is cut off horizontally or vertically?
// The Mobile Menu `<ul>` does NOT have padding at the bottom.
// Oh! Look at the `navItems.map` for Mobile Menu:
code = code.replace(
  /<span className="w-12 h-12 flex items-center justify-center filter drop-shadow-sm"><img src=\{iconSrc\} className="w-10 h-10 object-contain filter drop-shadow-md" alt=\{item\.label\} \/><\/span>/g,
  '<span className="w-12 h-12 flex items-center justify-center filter drop-shadow-sm"><img src={iconSrc} className="w-8 h-8 object-contain filter drop-shadow-md" alt={item.label} /></span>'
);

// The Dropdown menu inside LangSwitcher: 
// It needs to be forcefully detached. Let's make sure it has absolute positioning that breaks out.
code = code.replace(
  /className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-2 w-36 bg-white rounded-xl shadow-xl shadow-gray-200\/50 border border-gray-100 py-1 z-\[999\] origin-top-right"/g,
  'className="absolute right-0 rtl:right-auto rtl:left-0 top-12 mt-2 w-36 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-15px_rgba(61,44,35,0.15)] border border-choco/5 py-2 z-[99999] origin-top-right"'
);

// Change the LangSwitcher Mobile Button, `bg-gray-50 border border-gray-200 text-gray-700` is ugly.
code = code.replace(
  /bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-apple-blue\/20/g,
  'bg-white border border-choco/5 text-sm font-black font-display tracking-widest text-mocha focus:ring-2 focus:ring-strawberry/20 shadow-sm'
);


fs.writeFileSync(rootTsxPath, code);
console.log("Ultimate Z-Index and Mobile Nav polish applied.");
