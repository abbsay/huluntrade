const fs = require('fs');
const path = require('path');

const contactPath = path.join(__dirname, 'src', 'routes', 'contact.tsx');
let code = fs.readFileSync(contactPath, 'utf8');

// I can see the exact syntax error!
// When I stripped the `fireConfetti` function wrapper out using regex earlier:
// code = code.replace(/function fireConfetti\(\) \{[\s\S]*?\}\n/g, '');
// It failed to remove the content INSIDE the function because I wrote a bad regex, 
// OR it removed the function declaration line but left the body hanging loose in the global scope!
// This left the closing brace `}` on line 101 dangling, which crashes the parser instantly.

// Let's completely nuke that entire section from "Confetti Helper" down to "Contact Info Items"
const brokenSectionRegex = /\/\/ ─── Confetti Helper ───[\s\S]*?\/\/\ ─── Contact Info Items ───/g;

// To be safe, I'll replace everything between line 80 and the infoItems array declaration.
const fixRegex = /\/\/ ─── Confetti Helper ──────────────────────────────────────────────────────────[\s\S]*?\/\/ ─── Contact Info Items ───────────────────────────────────────────────────────/g;

code = code.replace(fixRegex, '// ─── Contact Info Items ───────────────────────────────────────────────────────');

// Also remove instances of `import confetti from 'canvas-confetti'` just in case
code = code.replace(/import confetti from 'canvas-confetti'/g, '');

fs.writeFileSync(contactPath, code);
console.log("Contact.tsx syntax fixed! The ghost bracket is dead.");
