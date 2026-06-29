const fs = require('fs');
const path = require('path');

const rootTsxPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let code = fs.readFileSync(rootTsxPath, 'utf8');

// The glitch is definitely caused by appending or failing to fully delete the previous Apple Footer block.
// In the grep output we see:
//     </footer>
//   );
// }
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
//           
//           <div>
//             <h4 className="text-xs font-black font-display text-choco mb-3">Shop & Learn</h4>
//
// This means the old Apple Footer code was left dangling AFTER the component was closed!
// This invalid JSX at the root level breaks Vite SSR completely (500 Error).

// Let's strip away everything hanging loose at the bottom of the file after the LAST properly closed `}` of the file.
// Or we can just use a regex to delete everything from the rogue `<div className="grid grid-cols-1 md:grid-cols-4...` to the end.

const garbageRegex = /<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">[\s\S]*$/;
code = code.replace(garbageRegex, '');

fs.writeFileSync(rootTsxPath, code);
console.log("Dangling Apple Footer code surgically removed!");
