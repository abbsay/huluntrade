const fs = require('fs');
const path = require('path');

// I finally see what's happening.
// The error refers to `index.css?transform-only:undefined:NaN` -> `SyntaxError: [postcss] Unexpected token, expected ";"`
// BUT it comes from Sucrase parser parseExportDefaultExpression. 
// This means there is EXACTLY ONE FILE in the project that is trying to export index.css AS If it was a JS file!
// Because we have `index.css?url` in `__root.tsx`, wait, `?url` is right. 
// IS THERE ANOTHER IMPORT of index.css?

const rootTsxPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let rootCode = fs.readFileSync(rootTsxPath, 'utf8');

// Looking closely at __root.tsx
// `import appCss from '../index.css?url'`
// ... and further down in <Links>
// `{ rel: 'stylesheet', href: appCss }`

// Let's replace `import appCss from '../index.css?url'` with just `import '../index.css'` which is the standard Vite way for global CSS.
rootCode = rootCode.replace(/import appCss from '\.\.\/index\.css\?url'/g, "import '../index.css'");
rootCode = rootCode.replace(/\{\s*rel:\s*'stylesheet',\s*href:\s*appCss\s*\},/g, "");

fs.writeFileSync(rootTsxPath, rootCode);
console.log("Root link tag for CSS removed. Use standard Vite CSS injection.");
