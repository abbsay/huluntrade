const fs = require('fs');
const path = require('path');

const rootTsxPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let code = fs.readFileSync(rootTsxPath, 'utf8');

// The SSR server generated output with old classes (bg-slate-50 text-slate-800, etc)
// And the client rendered output with our injected classes (bg-cream text-choco, without overflow-x-hidden)
// Wait! If the client rendered something different, why would the SERVER render the old classes?
// Because Vite SSR uses cached module graphs or `.temp` files, or maybe TanStack routeTree generated file needs to be kicked!
// Also, my previous scripts directly modified __root.tsx, but SSR might be caching the file.

// Also notice:
// -                                 className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans"
// +                                 className="antialiased min-h-screen flex flex-col bg-cream text-choco font-sans"

// But wait, the client is actually rendering `bg-cream text-choco`! Didn't we change the Apple style to use `#F5F5F7` grey and `apple-text` style?
// No! In `apply_apple_design.cjs` I only replaced things inside `index.tsx`, I forgot to wipe out `bg-cream` from `__root.tsx` entirely!
// And I probably messed up the `<body className="...">` between SSR/client or it's a caching issue.

// Since the user wanted complete Apple style, let's fix the classnames in `__root.tsx` body so there's no mismatch AND it matches the Apple style!
code = code.replace(
  /className="antialiased min-h-screen flex flex-col bg-[a-z0-9-]+ text-[a-z0-9-]+ font-sans"/g,
  'className="antialiased min-h-screen flex flex-col bg-apple-bg text-apple-text font-sans"'
);

// Remove `bg-cream` fallback from root Layout container
code = code.replace(/bg-cream/g, 'bg-apple-bg');
code = code.replace(/text-choco/g, 'text-apple-text');
code = code.replace(/text-mocha/g, 'text-apple-sub');
code = code.replace(/bg-choco/g, 'bg-apple-text');
code = code.replace(/text-strawberry/g, 'text-apple-blue');

fs.writeFileSync(rootTsxPath, code);
console.log("Hydration classes aligned in __root.tsx to sync client/server.");
