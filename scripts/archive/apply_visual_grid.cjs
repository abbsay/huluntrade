const fs = require('fs');
const path = require('path');

const gridPath = path.join(__dirname, 'src', 'components', 'ProductGrid.tsx');
let code = fs.readFileSync(gridPath, 'utf8');

// The file had heavy Tailwind slate/blue/gray and didn't use our new visual tokens

// 1. Backgrounds & wrappers
code = code.replace(/bg-gradient-to-b from-white to-gray-50/g, 'bg-cream'); // Our new base
code = code.replace(/text-blue-600 drop-shadow-sm/g, 'text-chocolate drop-shadow-md'); 
code = code.replace(/border-blue-100/g, 'border-mocha/10');
code = code.replace(/bg-gray-50/g, 'bg-white'); // for product image base

// 2. Button texts & labels
code = code.replace(/text-pink-500/g, 'text-strawberry');
code = code.replace(/text-gray-800/g, 'text-choco font-display tracking-wide');
code = code.replace(/text-gray-600/g, 'text-mocha/80');
code = code.replace(/text-blue-700/g, 'text-mocha');
code = code.replace(/bg-blue-50/g, 'bg-cream');

// 3. CTA
code = code.replace(
  /bg-gradient-to-r from-blue-500 to-blue-600/g, 
  'bg-choco text-cream'
);
code = code.replace(
  /hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-500\/30/g, 
  'hover:bg-mocha hover:shadow-mocha/30 jelly-highlight'
);

// 4. Transform grid from standard square blocks to masonry-like staggered layout 
// by targeting the grid wrapper and adding an offset margin to even items.
const gridContainerStart = /className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8"/;
code = code.replace(
  gridContainerStart, 
  `className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-12"`
);

// 5. Update the map loop to add masonry offset classes to every odd/even child
const mapStart = /\{FEATURED\.map\(\(item\) => \(/;
code = code.replace(
  mapStart, 
  `{FEATURED.map((item, index) => (`
);

// Add offset translation to alternate items
code = code.replace(
  /<TiltCard key=\{item\?\.id\}>/,
  `<div key={item?.id} className={\`\${index % 2 !== 0 ? 'mt-8 md:mt-16' : ''}\`}><TiltCard>`
);
code = code.replace(
  /<\/TiltCard>/,
  `</TiltCard></div>`
);

// 6. Give the card a custom organic shadow instead of basic rigid tailwind shadow
code = code.replace(
  /shadow-md border border-gray-100/g,
  'shadow-[0_20px_40px_-15px_rgba(61,44,35,0.06)] border border-choco/5'
);

// 7. Dynamic glow in TiltCard container
code = code.replace(
  /className="relative flex flex-col bg-white rounded-3xl/g,
  'className="relative flex flex-col bg-white rounded-[2.5rem]'
);

fs.writeFileSync(gridPath, code);
console.log("ProductGrid refactored with visual tokens & masonry offset!");
