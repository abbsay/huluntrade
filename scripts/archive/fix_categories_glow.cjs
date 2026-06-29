const fs = require('fs');
const path = require('path');

const indexTsxPath = path.join(__dirname, 'src', 'routes', 'index.tsx');
let code = fs.readFileSync(indexTsxPath, 'utf8');

// I see the problem:
// glow: 'from-apple-pink to-transparent'
// glow: 'from-apple-orange to-transparent'
// glow: 'from-apple-purple to-transparent'
// glow: 'from-apple-blue to-transparent'
// When we restored the Candy Theme config in tailwind.config.js, we wiped out `apple-pink`, `apple-orange`, `apple-purple` because we only left a safe fallback `apple: { bg: ..., card: ..., text: ..., sub: ..., blue: ... }`.
// That's why ONLY `apple-blue` (which is mapped to #FF6B9D) worked! The rest were uncompiled/missing colors!

// Let's replace those with our real, delicious candy theme colors!
code = code.replace(
  /glow: 'from-apple-pink to-transparent'/g,
  "glow: 'from-strawberry to-transparent'"
);
code = code.replace(
  /glow: 'from-apple-orange to-transparent'/g,
  "glow: 'from-lemon to-transparent'"
);
code = code.replace(
  /glow: 'from-apple-purple to-transparent'/g,
  "glow: 'from-mocha to-transparent'"
);
// Hard Candy Ultra -> let's make it a nice mint or purple. We don't have purple in tw config now, let's use mint!
code = code.replace(
  /glow: 'from-mocha to-transparent'/g,
  "glow: 'from-mint to-transparent'"
);
// Candy Toys -> stick to strawberry or mint
code = code.replace(
  /glow: 'from-apple-blue to-transparent'/g,
  "glow: 'from-choco to-transparent'"
);

// We need to also check the Sticky Editorial Scroll glow element to ensure it uses these properly
// bg-gradient-to-br ${cat.glow} opacity-[0.05] group-hover:opacity-100 transition-all duration-700
// It should work perfectly since they are now valid Tailwind gradient stops.

fs.writeFileSync(indexTsxPath, code);
console.log("Fixed the missing hover colors in the sticky gallery!");
