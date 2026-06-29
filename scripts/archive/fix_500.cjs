const fs = require('fs');
const path = require('path');

const indexTsxPath = path.join(__dirname, 'src', 'routes', 'index.tsx');
let code = fs.readFileSync(indexTsxPath, 'utf8');

// The issue isn't eslint failing the build (vite preview handles some stuff but TanStack router might choke on unexpected things).
// Let's check for any stray variables or syntax issues that cause 500 error on Vite SSR or TanStack Router
// Ah, the eslint output says: "'t' is assigned a value but never used" and "'scrollYProgress' is assigned a value but never used".
// While these are eslint errors and normally non-fatal in dev mode, if the app uses strict SSR or there's an import missing it crashes.

// Let's check if the index.tsx file has any real syntax errors.
// Looking at the applied Apple Design code:
// ProductGrid is imported but not used.
// t and scrollYProgress are declared but not used.

// I will remove the unused variables to keep it clean.
code = code.replace("const { t } = useI18n();", "");
code = code.replace("const { scrollYProgress } = useScroll();", "");
code = code.replace("import ProductGrid from '../components/ProductGrid'", "");

// Wait, let's also check if "home" or something is missing. 
// "export const Route = createFileRoute('/')" ... this all looks correct.

fs.writeFileSync(indexTsxPath, code);

console.log("Fixed unused vars in index.tsx");
