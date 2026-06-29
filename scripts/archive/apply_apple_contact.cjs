const fs = require('fs');
const path = require('path');

const contactPath = path.join(__dirname, 'src', 'routes', 'contact.tsx');
let code = fs.readFileSync(contactPath, 'utf8');

// 1. Remove Confetti and Colorful motion delays
code = code.replace(/import confetti from 'canvas-confetti'/g, '');
code = code.replace(/function fireConfetti\(\) \{[\s\S]*?\}\n/g, '');
code = code.replace(/fireConfetti\(\)/g, ''); // inside success block

// 2. Base Container colors (pink-50 / white -> apple-bg)
code = code.replace(/bg-gradient-to-br from-pink-50 via-white to-purple-50/g, 'bg-apple-bg');
code = code.replace(/bg-pink-200\/40/g, 'bg-transparent'); // Remove blobs
code = code.replace(/bg-blue-200\/40/g, 'bg-transparent');

// 3. Typographical Polish & Slate removals
code = code.replace(/text-slate-800/g, 'text-apple-text');
code = code.replace(/text-slate-700/g, 'text-apple-text');
code = code.replace(/text-slate-600/g, 'text-apple-sub');
code = code.replace(/text-slate-400/g, 'text-apple-sub/60');
code = code.replace(/border-slate-200/g, 'border-black/10');
code = code.replace(/bg-slate-50/g, 'bg-apple-card');
code = code.replace(/text-pink-600/g, 'text-apple-blue');
code = code.replace(/decoration-pink-300/g, 'decoration-apple-blue/30');

// 4. Input Fields
code = code.replace(/focus:ring-pink-500\/30/g, 'focus:ring-apple-blue/30');
code = code.replace(/text-pink-500/g, 'text-apple-blue');
code = code.replace(/focus:border-blue-500/g, 'focus:border-apple-blue');
code = code.replace(/focus:ring-blue-500\/10/g, 'focus:ring-apple-blue/20');
code = code.replace(/focus:ring-4/g, 'focus:ring-2');

// 5. Left Information panel redesign
code = code.replace(/bg-gradient-to-br from-pink-400 to-rose-400/g, 'bg-apple-card text-apple-text');
code = code.replace(/shadow-pink-500\/30/g, 'shadow-sm border border-black/5');
code = code.replace(/bg-gradient-to-br from-blue-400 to-indigo-500/g, 'bg-apple-card text-apple-text');
code = code.replace(/shadow-blue-500\/30/g, 'shadow-sm border border-black/5');
code = code.replace(/bg-gradient-to-br from-purple-400 to-fuchsia-500/g, 'bg-apple-card text-apple-text');
code = code.replace(/shadow-purple-500\/30/g, 'shadow-sm border border-black/5');
code = code.replace(/text-white/g, 'text-apple-text'); // the generic class used for icons in infoItems

// 6. Right Panel Form (Card to flat minimalist style like Apple)
code = code.replace(/bg-white\/80 backdrop-blur-xl rounded-\[2.5rem\] shadow-2xl shadow-slate-200\/50 border border-white p-6 sm:p-10/g, 'bg-apple-card/50 rounded-[2rem] border border-black/5 p-8 lg:p-12');

// 7. Button (From blue gradient jelly to Apple Black Solid)
code = code.replace(/bg-gradient-to-r from-blue-600 to-indigo-600/g, 'bg-apple-text');
code = code.replace(/shadow-xl shadow-blue-500\/30/g, 'shadow-none hover:bg-black');
// Overriding button text white because we previously changed generic text-white to text-apple-text
code = code.replace(/disabled:from-slate-400 disabled:to-slate-400/g, 'disabled:bg-black/20');
code = code.replace(/\{status === 'loading'[\s\S]*?\}\)/, (match) => {
    // Actually simpler to just manually regex out the Rocket emoji and spinning ring color
    return match.replace(/border-white\/30 border-t-white/, 'border-white/30 border-t-white');
});
code = code.replace(/text-apple-text font-black text-lg/g, 'text-white font-medium text-lg'); // fix the button

// Remove rocket emoji 🚀
code = code.replace(/<motion\.span[\s\S]*?🚀\s*<\/motion\.span>/g, '');
code = code.replace(/Send us a message 📬/g, 'Send us a message.');

code = code.replace(/font-black/g, 'font-semibold tracking-tighter'); // Apple style headers usually semi-bold tight


fs.writeFileSync(contactPath, code);
console.log("Contact page Applefied");
