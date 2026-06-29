const fs = require('fs');
const path = require('path');

const rootTsxPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let rootCode = fs.readFileSync(rootTsxPath, 'utf8');

/* ==============================================================
   1. Dynamic Nav Items (Desktop & Mobile share this logic loop)
   ============================================================== */
// Change variable assignment
rootCode = rootCode.replace(/let emoji = '🍡';/g, "let iconSrc = '/images/categories/minimal_marshmallow.svg';");
rootCode = rootCode.replace(/if\(item\.id === 'home'\) emoji = '🏠';/g, "if(item.id === 'home') iconSrc = '/images/categories/minimal_marshmallow.svg';");
rootCode = rootCode.replace(/if\(item\.id === 'products'\) emoji = '🍬';/g, "if(item.id === 'products') iconSrc = '/images/categories/minimal_jelly.svg';");
rootCode = rootCode.replace(/if\(item\.id === 'about'\) emoji = '💖';/g, "if(item.id === 'about') iconSrc = '/images/categories/minimal_hard_candy.svg';");
rootCode = rootCode.replace(/if\(item\.id === 'contact-nav'\) emoji = '🚀';/g, "if(item.id === 'contact-nav') iconSrc = '/images/categories/minimal_toy.svg';");

// Replace {emoji} injection with <img>
rootCode = rootCode.replace(/\{emoji\}/g, '<img src={iconSrc} className="w-10 h-10 object-contain filter drop-shadow-md" alt={item.label} />');

// Clean up wrapping span/div classes so they don't constrain the image scale via font-size
rootCode = rootCode.replace(/className="text-2xl mb-1 filter drop-shadow-sm"/g, 'className="mb-1 flex items-center justify-center"');
rootCode = rootCode.replace(/<span className="text-3xl filter drop-shadow-sm">/g, '<span className="w-12 h-12 flex items-center justify-center filter drop-shadow-sm">');


/* ==============================================================
   2. Header Standalone Fixed Emojis (Phone, Catalog, Desktop/Mobile Globe)
   ============================================================== */
rootCode = rootCode.replace(/<span className="text-xl">📞<\/span>/g, '<img src="/images/categories/minimal_jelly.svg" className="w-7 h-7 drop-shadow-sm object-contain" />');
rootCode = rootCode.replace(/<span>📖<\/span>/g, '<img src="/images/categories/minimal_hard_candy.svg" className="w-6 h-6 drop-shadow-sm object-contain" />');
// The globe icon exists in two variations: <span className="text-xl">🌍</span> and <span className="text-lg">🌍</span>
rootCode = rootCode.replace(/<span className="text-xl">🌍<\/span>/g, '<img src="/images/categories/minimal_toy.svg" className="w-7 h-7 drop-shadow-sm object-contain" />');
rootCode = rootCode.replace(/<span className="text-lg">🌍<\/span>/g, '<img src="/images/categories/minimal_toy.svg" className="w-6 h-6 drop-shadow-sm object-contain" />');


/* ==============================================================
   3. Cute Footer Large Card Emojis
   ============================================================== */
// Left Card: 📍 Map pin
rootCode = rootCode.replace(
  /<div className="text-5xl mb-4 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 origin-bottom-left filter drop-shadow-sm">\s*📍\s*<\/div>/g, 
  `<div className="w-16 h-16 mb-4 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 origin-bottom-left filter drop-shadow-md">
    <img src="/images/categories/minimal_marshmallow.svg" className="w-full h-full object-contain" alt="Location" />
  </div>`
);

// Right Card: 💬 Speech bubble
rootCode = rootCode.replace(
  /<div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 origin-bottom-right filter drop-shadow-sm">\s*💬\s*<\/div>/g, 
  `<div className="w-16 h-16 mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 origin-bottom-right filter drop-shadow-md">
    <img src="/images/categories/minimal_toy.svg" className="w-full h-full object-contain" alt="Contact Us" />
  </div>`
);

// Right Card: Inner tiny emojis 📱 and 💌
rootCode = rootCode.replace(
  /<span className="text-2xl min-w-\[32px\]">📱<\/span>/g,
  '<img src="/images/categories/minimal_jelly.svg" className="w-7 h-7 mr-2 object-contain drop-shadow-sm flex-shrink-0" alt="Phone" />'
);
rootCode = rootCode.replace(
  /<span className="text-2xl min-w-\[32px\]">💌<\/span>/g,
  '<img src="/images/categories/minimal_hard_candy.svg" className="w-7 h-7 mr-2 object-contain drop-shadow-sm flex-shrink-0" alt="Email" />'
);

// Footer Copyright corner candies 🍬 and 🍭
rootCode = rootCode.replace(
  />\s*🍬\s*<\/motion\.span>/g,
  `><img src="/images/categories/minimal_jelly.svg" className="w-8 h-8 object-contain drop-shadow-sm" alt="sweet" /></motion.span>`
);
rootCode = rootCode.replace(
  />\s*🍭\s*<\/motion\.span>/g,
  `><img src="/images/categories/minimal_hard_candy.svg" className="w-8 h-8 object-contain drop-shadow-sm" alt="sweet" /></motion.span>`
);


fs.writeFileSync(rootTsxPath, rootCode);
console.log("All text emojis physically upgraded to 3D Glassmorphic SVGs!");
