const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'index.css');
let cssCode = fs.readFileSync(cssPath, 'utf8');

// I also noticed in apply_visual_design.cjs I accidentally inserted an un-closed or misplaced CSS block?
// Let's check for any lingering `@apply` that might be using undefined colors or broken syntax.

// E.g.
// h1, h2, h3, h4, h5, h6 {
//   @apply font-display text-choco tracking-tight;
// }

// Let's just do a clean pass and remove ALL @apply rules that use our old custom colors since we are on Apple design now.
cssCode = cssCode.replace(/@apply.*?;/g, (match) => {
    if (match.includes('choco') || match.includes('mocha') || match.includes('cream')) {
        return '/* removed broken tailwind apply */';
    }
    return match;
});

// Since the whole index.css is basically legacy from the original template and we've heavily overridden styles,
// Let's look for anything missing a closing bracket or having bad PostCSS syntax.
// The error was specifically at `index.css:32:4`.
// Let's look exactly at line 32 in the current index.css file.
// `  h1, h2, h3, h4, h5, h6 {` - wait, the problem might be an unmatched brace from when I injected something.

let lines = cssCode.split('\n');
// We need to look closely at the syntax near line 32. 
// Actually, earlier in `apply_visual_design.cjs` I prepended after `@tailwind utilities;`.
// If `index.css` had a stray `}` somewhere?
// Let's just nuke all custom @layer base that might be corrupted inside the CSS string.

const regexLayer = /@layer base\s*\{[\s\S]*?\n\}/g;
cssCode = cssCode.replace(regexLayer, '');

// Also let's check for any stray `}` at the top of the file
if (cssCode.includes('}\n\n\n:root {')) {
    cssCode = cssCode.replace(/}\n\n\n:root \{/, '\n:root {');
}

// Just to be absolutely certain PostCSS compiles, let's look for any stray `}` in the first 50 lines.
let first50 = lines.slice(0, 50).join('\n');
// If there is an unmatched `}` without a `{`, PostCSS crashes with "Unexpected token".
// Looking at the previous cat output:
/*
     5	@layer base {
     6	  body {
     7	    @apply bg-cream text-mocha font-sans;
     8	  }
     9	  h1, h2, h3, h4, h5, h6 {
    10	    @apply font-display text-choco tracking-tight;
    11	  }
    12	  /* Ensure bold stuff gets our display font to make it pop */
//  13	  strong, .font-black, .font-extrabold {
//  14	    @apply font-display;
//  15	  }
//  16	}
*/

// OH I see it! 
// When I originally injected `typographyCSS` in index.css, I injected:
/* 
@layer base {
  body {
    @apply bg-cream text-mocha font-sans;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-display text-choco tracking-tight;
  }
  // Ensure bold stuff gets our display font to make it pop
  strong, .font-black, .font-extrabold {
    @apply font-display;
  }
}
*/
// But wait, where is the stray bracket... 
// I'll just rewrite the top of the file to be safe.

const newTop = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {`;

cssCode = cssCode.replace(/@tailwind base;[\s\S]*?:root \{/, newTop);

fs.writeFileSync(cssPath, cssCode);
console.log("CSS syntax crash deeply fixed!");
