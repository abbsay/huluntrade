const fs = require('fs');
const path = require('path');

// ============================================
// 1. OVERHAUL CONTACT.TSX SPACING & CONTRAST
// ============================================
const contactPath = path.join(__dirname, 'src', 'routes', 'contact.tsx');
let contactCode = fs.readFileSync(contactPath, 'utf8');

// Global Main Padding - Clear the header drastically (from pt-32 to pt-40 lg:pt-48)
contactCode = contactCode.replace(
  /className="min-h-screen bg-apple-bg relative overflow-hidden pt-32 pb-24 flex justify-center"/,
  'className="min-h-screen bg-apple-bg relative overflow-hidden pt-40 lg:pt-48 pb-32 flex justify-center"'
);

// Grid gap between left and right column
contactCode = contactCode.replace(
  /className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start"/,
  'className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start max-w-6xl mx-auto"'
);
// Adjust spans to 5/7 for a more premium editorial ratio instead of 2/3
contactCode = contactCode.replace(/className="lg:col-span-2"/g, 'className="lg:col-span-5 pt-4"');
contactCode = contactCode.replace(/className="lg:col-span-3 w-full"/g, 'className="lg:col-span-7 w-full"');

// Left Column cleanups (Typography margins)
contactCode = contactCode.replace(/leading-\[1\.1\] mb-6/g, 'leading-[1.1] mb-8');
contactCode = contactCode.replace(/mb-10 leading-\[1\.8\]/g, 'mb-14 leading-[1.6] text-xl');

// Info Item Cards - Remove hover background, use clean layout
contactCode = contactCode.replace(
  /className="flex items-center gap-5 p-4 rounded-2xl hover:bg-apple-card\/50 transition-colors duration-300"/g,
  'className="flex items-center gap-6 py-3"' // stripped hover bg
);
// Circular icons instead of rounded-xl
contactCode = contactCode.replace(
  /className="w-12 h-12 rounded-xl bg-apple-card text-apple-text flex items-center justify-center shadow-sm border border-black\/5 flex-shrink-0"/g,
  'className="w-14 h-14 rounded-full bg-apple-card text-apple-text flex items-center justify-center border border-black/5 flex-shrink-0"'
);

// Form Card - Solid Apple Card Grey without borders/shadows, to contrast pure white inputs
contactCode = contactCode.replace(
  /className="bg-apple-card\/50 rounded-\[2\.5rem\] shadow-sm border border-black\/5 p-8 lg:p-12 w-full"/g,
  'className="bg-apple-card rounded-[2.5rem] p-8 sm:p-10 lg:p-14 w-full"'
);

// Inputs padding & styling (Apple Style: huge inputs, white bg over gray card)
contactCode = contactCode.replace(
  /className="w-full bg-apple-bg border border-black\/10 text-apple-text rounded-xl focus:ring-2 focus:ring-apple-blue\/20 focus:border-apple-blue outline-none block pl-11 p-3 transition-all disabled:opacity-50"/g,
  'className="w-full bg-white border border-transparent text-apple-text rounded-2xl focus:ring-4 focus:ring-apple-blue/10 focus:border-apple-blue outline-none block pl-12 py-4 transition-all disabled:opacity-50 shadow-sm"'
);
// Textarea
contactCode = contactCode.replace(
  /className="w-full bg-apple-bg border border-black\/10 text-apple-text rounded-xl focus:ring-2 focus:ring-apple-blue\/20 focus:border-apple-blue outline-none block p-4 transition-all disabled:opacity-50 resize-y"/g,
  'className="w-full bg-white border border-transparent text-apple-text rounded-2xl focus:ring-4 focus:ring-apple-blue/10 focus:border-apple-blue outline-none block p-5 transition-all disabled:opacity-50 resize-y shadow-sm"'
);

fs.writeFileSync(contactPath, contactCode);
console.log("✅ Contact spacing optimized.");

// ============================================
// 2. OVERHAUL PRODUCTS.TSX SPACING
// ============================================
const productsPath = path.join(__dirname, 'src', 'routes', 'products.tsx');
let productsCode = fs.readFileSync(productsPath, 'utf8');

// Fix Header Collision: pt-20 -> pt-40 lg:pt-48
productsCode = productsCode.replace(
  /className="min-h-screen bg-apple-bg pt-20 pb-32 flex flex-col items-center antialiased"/,
  'className="min-h-screen bg-apple-bg pt-40 lg:pt-48 pb-32 flex flex-col items-center antialiased"'
);

// Add a bit more gap
productsCode = productsCode.replace(
  /className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10"/,
  'className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"'
);

fs.writeFileSync(productsPath, productsCode);
console.log("✅ Products spacing optimized.");

// ============================================
// 3. OVERHAUL ABOUT.TSX SPACING
// ============================================
const aboutPath = path.join(__dirname, 'src', 'routes', 'about.tsx');
let aboutCode = fs.readFileSync(aboutPath, 'utf8');

// Fix Header Collision: pt-24 -> pt-40 lg:pt-48
aboutCode = aboutCode.replace(
  /className="min-h-screen bg-apple-bg text-apple-text antialiased pt-24 pb-32 overflow-hidden"/,
  'className="min-h-screen bg-apple-bg text-apple-text antialiased pt-40 lg:pt-48 pb-32 overflow-hidden"'
);

fs.writeFileSync(aboutPath, aboutCode);
console.log("✅ About spacing optimized.");

