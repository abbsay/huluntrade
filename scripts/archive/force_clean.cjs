const fs = require('fs');
const path = require('path');

// Problem: The index.css is returning 500 when fetched via the browser.
// This means the Vite Dev Server is still choking on compiling `index.css`.
// It's definitely a PostCSS / Tailwind CSS compiling error caused by my previous edits.
// When I wrote `pristineCss` to index.css earlier, I included this line at the bottom:
// .filter { will-change: filter, transform; }
// Wait, is that a syntax error in CSS?
// No, that's valid CSS (`will-change: filter, transform;`).

// But let's check what exactly is in `madasweet-clone/src/index.css` now.
let cssPath = path.join(__dirname, 'src', 'index.css');
let cssCode = fs.readFileSync(cssPath, 'utf8');

// I will overwrite index.css with the ABSOLUTE simplest valid Tailwind config
// to prove it's a CSS file issue and to fix the dev server.
const failSafeCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    background-color: #FFFFFF;
    color: #1D1D1F;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  }
}
`;

fs.writeFileSync(cssPath, failSafeCss);
console.log("Failsafe CSS applied.");
