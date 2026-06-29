const fs = require('fs');
const path = require('path');

const indexTsxPath = path.join(__dirname, 'src', 'routes', 'index.tsx');
let code = fs.readFileSync(indexTsxPath, 'utf8');

// We will inject a continuous Marquee (Ticker) separating the Bento Box and Sticky Gallery.
const marqueeHTML = `
      {/* 2.5 INFINITE CANDY MARQUEE RIBBON */}
      <div className="w-full bg-strawberry text-white py-4 md:py-5 overflow-hidden flex items-center shadow-inner relative z-20 border-y border-white/20 transform -rotate-1 origin-center scale-105 my-12">
        <motion.div
          className="flex whitespace-nowrap items-center font-display font-black text-2xl md:text-3xl uppercase tracking-widest"
          animate={{ x: [0, -1035] }} // Depends on the text length
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        >
          {Array(8).fill("🍬 SWEETEST JOY 🍭 MAGICAL TASTE ✨ PURE HAPPINESS ").map((text, i) => (
             <span key={i} className="mx-4">{text}</span>
          ))}
        </motion.div>
      </div>
`;

// Insert after Bento Box
code = code.replace(
  /(\{\/\* 3\. STICKY EDITORIAL SCROLL \(The Rich Effect Gallery\) \*\/})/,
  marqueeHTML + '\n      $1'
);

fs.writeFileSync(indexTsxPath, code);
console.log("Marquee injected.");
