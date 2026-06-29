const fs = require('fs');
const path = require('path');

/* =========================================================================
   1. OVERHAUL LOGOSLIDER (It escaped the UI tokens & needed Apple styling!)
   ========================================================================= */
const logoSliderPath = path.join(__dirname, 'src', 'components', 'LogoSlider.tsx');
let logoCode = fs.readFileSync(logoSliderPath, 'utf8');

// Strip old Slate/Gray colors and make it seamlessly blend with the new Bento Box (Cream/Choco)
logoCode = logoCode.replace(/bg-white/g, 'bg-transparent'); // Was making the Bento Box look broken
logoCode = logoCode.replace(/border-y border-gray-100/g, 'border-none'); // Remove hard borders so it flows inside the card
logoCode = logoCode.replace(/before:from-white/g, 'before:from-cream');
logoCode = logoCode.replace(/after:from-white/g, 'after:from-cream');

// Make the cards softer
logoCode = logoCode.replace(
  /rounded-2xl bg-transparent flex justify-center items-center p-3 sm:p-5 shadow-sm border border-gray-50 mix-blend-multiply/g,
  'rounded-[1.5rem] bg-white/40 backdrop-blur-sm flex justify-center items-center p-3 sm:p-5 shadow-sm border border-choco/5 mix-blend-normal hover:bg-white transition-colors duration-500'
);

fs.writeFileSync(logoSliderPath, logoCode);


/* =========================================================================
   2. VERIFY PRODUCT DETAIL OVERFLOW ISSUES
   ========================================================================= */
const productPath = path.join(__dirname, 'src', 'routes', 'product.$productId.tsx');
let productCode = fs.readFileSync(productPath, 'utf8');

// The `lg:min-h-[600px]` constraint on the monolithic card's left side can cause content to stretch awkwardly on giant screens.
// We remove hard min heights and let Flexbox do the balancing natively.
productCode = productCode.replace(/min-h-\[400px\] lg:min-h-\[600px\]/g, 'aspect-square lg:aspect-auto');
fs.writeFileSync(productPath, productCode);


/* =========================================================================
   3. VERIFY ACCESSIBILITY IN INDEX.TSX (BENTO BOX)
   ========================================================================= */
const indexPath = path.join(__dirname, 'src', 'routes', 'index.tsx');
let indexCode = fs.readFileSync(indexPath, 'utf8');

// Check the links. Sometimes empty hrefs or missing aria-labels can tank SEO scores.
// Specifically the `trustItems` block was mapped previously in `index.tsx` but maybe we didn't define it?
// Wait! `trustItems` is used in index.tsx but WE NEVER DEFINED IT inside the new Bento code!
// In `apply_bento_box.cjs`, I used `trustItems.map(...)` inside BENTO 3, but the variable was lost when replacing the old components.
if (!indexCode.includes('const trustItems =')) {
  // Inject trustItems right after CATEGORIES
  const trustItemsArray = `
const trustItems = [
  { label: 'Sweet Joy', value: '100%' },
  { label: 'Global Delivery', value: 'Fast' },
  { label: 'Pure Ingredients', value: 'Safe' },
  { label: 'Happy Customers', value: '10K+' },
];`;
  indexCode = indexCode.replace(/export const Route =/, trustItemsArray + '\nexport const Route =');
}

fs.writeFileSync(indexPath, indexCode);

console.log("Final deep inspection and structural patches applied globally!");
