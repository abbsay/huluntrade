const fs = require('fs');
const path = require('path');

const contactPath = path.join(__dirname, 'src', 'routes', 'contact.tsx');
let code = fs.readFileSync(contactPath, 'utf8');

// The 500 error is typically caused by a stray character or invalid Syntax breaking the build, similar to what we fixed before.
// I removed `whileHover={{ x: 4, transition... }}` mechanically using regex:
// code = code.replace(/whileHover=\{\{ x: 4, transition: \{ type: 'spring', stiffness: 400, damping: 14 \} \}\}/g, '');
// Wait, if `<motion.div` originally had `whileHover={{...}}` and I replaced it with `''`, it might leave a malformed tag like `<motion.div   >`? Actually, that's valid JS/JSX.

// Let's check where the syntax error might be.
// "shadow-xl shadow-sm border border-black/5" -> Tailwind error? No, just redundant.
// Let's look at the remaining code for any broken objects.

// Oh, I see it! In step 5, I did:
// code.replace(/className="flex items-start gap-4"/g, 'className="flex items-center gap-5 p-4 rounded-2xl hover:bg-apple-card/50 transition-colors duration-300"');
// But I also had a regex removal:
// code.replace(/whileHover=\{\{ x: 4, transition: \{ type: 'spring', stiffness: 400, damping: 14 \} \}\}/g, '');
// If the regex didn't match perfectly, or left something hanging...

// Let's just do a clean pass over the contact items mapping. 
const badMapRegex = /\{infoItems\.map\(\(item, i\) => \([\s\S]*?\}\)\}/;

// Wait, let's look at the actual error in eslint or compiler:
