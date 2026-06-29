const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'index.css');
let cssCode = fs.readFileSync(cssPath, 'utf8');

const newTop = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {`;

// Replace everything from `@tailwind base` down to `:root {` removing any corrupted @layer or stray braces
cssCode = cssCode.replace(/@tailwind base;[\s\S]*?:root \{/, newTop);

fs.writeFileSync(cssPath, cssCode);
console.log("CSS syntax crash deeply fixed!");
