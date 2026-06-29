const fs = require('fs');
const path = require('path');

// I got it. The error:
// `SyntaxError: [postcss] Unexpected token, expected ";"` comes directly from PostCSS, 
// BUT the stack trace talks about `sucrase/dist/parser/traverser`.
// This usually means there's an invisible/illegal character, or maybe a `<script>` or HTML tag inside index.css!!
// Let me look at index.css carefully from a previous readout...
// Oh wait! 
// When I originally did `cat madasweet-clone/src/index.css | head -n 40`, line 13 was:
// `strong, .font-black, .font-extrabold {`
// And lines 5-16 were the `@layer base` block which I thought I completely removed, but maybe not successfully in the v3 script.
// Let's completely wipe index.css and put back ONLY the pristine tailwind lines + safe tokens.

const cssPath = path.join(__dirname, 'src', 'index.css');

const pristineCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #1D1D1F;
  --color-primary-dark: #000000;
  --color-accent: #2997FF;
  --color-yellow: #F5F5F7;
  --color-text: #1D1D1F;
  --color-text-dark: #000000;
  --color-muted: #86868B;
  --color-bg: #FFFFFF;
  --color-border: #E5E5EA;
  --color-footer: #F5F5F7;
}

html, body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--color-bg);
  color: var(--color-text);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

img {
  display: block;
  max-width: 100%;
}

/* Magic Soft Scrollbars */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #E5E5EA;
  border-radius: 10px;
}

/* Apple Specific Overrides */
.filter {
  will-change: filter, transform;
}
`;

fs.writeFileSync(cssPath, pristineCss);
console.log("CSS file entirely rewritten to pristine Apple baseline.");
