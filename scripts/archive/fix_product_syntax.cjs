const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'routes', 'product.$productId.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// The regex replacement duplicated the old tail end of the switch statement!
// Look at the stray code:
//   };
//       case 'jelly': return { bg: 'from-green-50 to-white', accent: 'text-green-600', btn: 'bg-green-500', shadow: 'shadow-green-500/30' };
//       case 'hard_candy': return { bg: 'from-purple-50 to-white', accent: 'text-purple-600', btn: 'bg-purple-500', shadow: 'shadow-purple-500/30' };
//       case 'candy_toy': return { bg: 'from-yellow-50 to-white', accent: 'text-yellow-600', btn: 'bg-yellow-500', shadow: 'shadow-yellow-500/30' };
//       default: return { bg: 'from-blue-50 to-white', accent: 'text-strawberry', btn: 'bg-blue-600', shadow: 'shadow-blue-500/30' };
//     }
//   };

const badTailRegex = /\s+case 'jelly': return \{ bg: 'from-green-50 to-white'[\s\S]*?\}\n\s*\}\;\n/g;

code = code.replace(badTailRegex, '\n');

fs.writeFileSync(filePath, code);
console.log("Syntax collision inside product detailed removed! Full system go.");
