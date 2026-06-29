const fs = require('fs');
const path = require('path');

// Fix Header spacing and Mobile Menu Z-index/UX
const rootPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let rootCode = fs.readFileSync(rootPath, 'utf8');

// 1. Mobile Menu Overlay z-index + safe area padding
// Header is z-[100], Mobile Menu should be right under it z-[90], but wait, when scrolled the menu was top-[72px] which is hardcoded and may look weird on different phones
rootCode = rootCode.replace(
  /className="fixed inset-0 top-\[72px\] bg-white/g,
  'className="fixed inset-0 top-0 pt-[88px] bg-white' // Full cover, but push content down past the header naturally
);

// 2. Adjust Desktop Header sizing
rootCode = rootCode.replace(
  /<div className="flex items-center justify-between h-\[5\.5rem\] lg:h-\[6rem\]">/g,
  '<div className="flex items-center justify-between h-20 lg:h-[6rem]">' // h-20 (80px) is much better for mobile
);

// 3. Fix main content padding on mobile
rootCode = rootCode.replace(
  /<main className="flex-grow w-full z-0 pt-32 lg:pt-36">/g,
  '<main className="flex-grow w-full z-0 pt-24 lg:pt-36">' // Reduced padding-top on mobile
);

// 4. Parallax objects on mobile obscure text, scale them down and hide the huge ones
const indexTsxPath = path.join(__dirname, 'src', 'routes', 'index.tsx');
let indexCode = fs.readFileSync(indexTsxPath, 'utf8');

indexCode = indexCode.replace(
  /<span className="text-7xl filter drop-shadow-2xl">🍬<\/span>/g,
  '<span className="text-4xl md:text-7xl filter drop-shadow-2xl">🍬</span>'
);
indexCode = indexCode.replace(
  /<span className="text-6xl filter drop-shadow-2xl">🍭<\/span>/g,
  '<span className="text-3xl md:text-6xl filter drop-shadow-2xl">🍭</span>'
);
indexCode = indexCode.replace(
  /<span className="text-5xl filter drop-shadow-2xl">🍡<\/span>/g,
  '<span className="text-2xl md:text-5xl filter drop-shadow-2xl">🍡</span>'
);
fs.writeFileSync(indexTsxPath, indexCode);

const aboutTsxPath = path.join(__dirname, 'src', 'routes', 'about.tsx');
let aboutCode = fs.readFileSync(aboutTsxPath, 'utf8');

aboutCode = aboutCode.replace(
  /<span className="text-6xl filter drop-shadow-xl">🍡<\/span>/g,
  '<span className="text-3xl md:text-6xl filter drop-shadow-xl">🍡</span>'
);
aboutCode = aboutCode.replace(
  /<span className="text-7xl filter drop-shadow-xl">🍬<\/span>/g,
  '<span className="text-4xl md:text-7xl filter drop-shadow-xl">🍬</span>'
);
aboutCode = aboutCode.replace(
  /<span className="text-5xl filter drop-shadow-xl">🍭<\/span>/g,
  '<span className="text-2xl md:text-5xl filter drop-shadow-xl">🍭</span>'
);
fs.writeFileSync(aboutTsxPath, aboutCode);

fs.writeFileSync(rootPath, rootCode);
console.log("Mobile UX precision tuning completed.");
