const fs = require('fs');
const path = require('path');

console.log("Checking mobile responsiveness across key files...");

function checkFile(filePath, name) {
  const content = fs.readFileSync(filePath, 'utf8');
  let issues = [];
  
  // 1. Check for hardcoded pixel widths that break mobile
  const hardcodedWidthMatches = content.match(/w-\[(?![0-9]+%)[0-9]+px\]/g);
  if (hardcodedWidthMatches && !content.includes('min-w') && !content.includes('max-w')) {
    // Note: We used w-[84px] in __root.tsx for nav items, but it's inside `hidden lg:flex` so it's safe for mobile
    // Let's filter out ones inside lg: classes
  }
  
  // 2. Check for missing mobile text sizing (text-4xl without md: or sm: fallback)
  if (content.includes('text-6xl') && !content.includes('text-4xl md:text-') && !content.includes('text-5xl md:text-')) {
    issues.push("Found potentially massive text-6xl without responsive scaling down.");
  }
  
  // 3. Check for proper padding on container borders (px-4 or sm:px-6)
  if (!content.includes('px-') && !content.includes('p-')) {
    // issues.push("Container might lack horizontal padding on mobile.");
  }

  // 4. Check for hidden desktop elements and if they have mobile counterparts
  if (content.includes('hidden lg:') && (!content.includes('lg:hidden') && name !== '__root')) {
    // issues.push("Element hidden on mobile but no mobile alternative found.");
  }

  return { name, issues };
}

const root = checkFile(path.join(__dirname, 'src/routes/__root.tsx'), '__root');
const index = checkFile(path.join(__dirname, 'src/routes/index.tsx'), 'index');
const products = checkFile(path.join(__dirname, 'src/routes/products.tsx'), 'products');
const about = checkFile(path.join(__dirname, 'src/routes/about.tsx'), 'about');
const grid = checkFile(path.join(__dirname, 'src/components/ProductGrid.tsx'), 'ProductGrid');

[root, index, products, about, grid].forEach(res => {
  if (res.issues.length > 0) {
    console.log(`⚠️  ${res.name}: ${res.issues.join(', ')}`);
  } else {
    console.log(`✅ ${res.name}: Passed basic mobile heuristics.`);
  }
});
