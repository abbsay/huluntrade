const fs = require('fs');
const path = require('path');

// I finally figured out the exact obscure Vite/TanStack issue!
// The error `SyntaxError: [postcss] Unexpected token... parseExportDefaultExpression` from `sucrase` inside Vite means that exactly ONE file in the project imports `index.css` incorrectly OR some config is pointing the compiler blindly at the CSS file as if it was a route!
// Wait. TanStack Router automatically scans for routes in `src/routes`.
// Did I accidentally write something inside `src/routes/` that touches index.css like an export?
// The problem is `__root.tsx`. 
// In React 19 / Vite / TanStack Start, the way we import global CSS in `__root.tsx` is specifically expected to return a URL string, to inject as `<link href={url} rel="stylesheet" />`.
// I removed `?url` earlier, which breaks SSR!

const rootTsxPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let rootCode = fs.readFileSync(rootTsxPath, 'utf8');

// The original import was: `import appCss from '../index.css?url'`
// And then used inside Links: `{ rel: 'stylesheet', href: appCss }`

// Let's restore the safe `?url` import correctly!
rootCode = rootCode.replace(
  "import '../index.css'",
  "import appCss from '../index.css?url'"
);

// We also need to restore the `<link>` tag in the Head Links
const linksArrayStart = rootCode.indexOf('links: [');
if (linksArrayStart !== -1) {
  // Let's find the closing bracket of links array
  const linksArrayEnd = rootCode.indexOf('],', linksArrayStart);
  if (linksArrayEnd !== -1) {
    let linksContent = rootCode.substring(linksArrayStart, linksArrayEnd);
    if (!linksContent.includes('appCss')) {
      rootCode = rootCode.substring(0, linksArrayEnd) + 
      `\n      { rel: 'stylesheet', href: appCss }` + 
      rootCode.substring(linksArrayEnd);
    }
  }
}

fs.writeFileSync(rootTsxPath, rootCode);
console.log("Restored ?url in index.css import for TanStack SSR");
