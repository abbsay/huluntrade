const fs = require('fs');
const path = require('path');

// 1. Clean index.tsx
const indexTsxPath = path.join(__dirname, 'src', 'routes', 'index.tsx');
let idxCode = fs.readFileSync(indexTsxPath, 'utf8');

// In CATEGORIES array
idxCode = idxCode.replace(/name: 'Marshmallow Pro'/g, "name: 'Cloud Marshmallow'");
idxCode = idxCode.replace(/name: 'Juicy Jelly M1'/g, "name: 'Juicy Fruit Jelly'");
idxCode = idxCode.replace(/name: 'Hard Candy Ultra'/g, "name: 'Crystal Hard Candy'");

// In Hero Slider
idxCode = idxCode.replace(/title: "Marshmallow Pro"/g, 'title: "Cloud Marshmallow"');
idxCode = idxCode.replace(/title: "Juicy Jelly M1"/g, 'title: "Juicy Fruit Jelly"');
idxCode = idxCode.replace(/title: "Hard Candy Ultra"/g, 'title: "Crystal Hard Candy"');

// In Bento Box titles
idxCode = idxCode.replace(/>Marshmallow Max\.</g, '>Fluffy Clouds.');
idxCode = idxCode.replace(/>Jelly M1\.</g, '>Bouncy Bites.');

fs.writeFileSync(indexTsxPath, idxCode);


// 2. Clean products.tsx
const productsTsxPath = path.join(__dirname, 'src', 'routes', 'products.tsx');
let productsCode = fs.readFileSync(productsTsxPath, 'utf8');

productsCode = productsCode.replace(/name: 'Marshmallow Pro'/g, "name: 'Cloud Marshmallow'");
productsCode = productsCode.replace(/name: 'Juicy Jelly M1'/g, "name: 'Juicy Fruit Jelly'");
productsCode = productsCode.replace(/name: 'Hard Candy Ultra'/g, "name: 'Crystal Hard Candy'");

fs.writeFileSync(productsTsxPath, productsCode);


// 3. Clean about.tsx
const aboutTsxPath = path.join(__dirname, 'src', 'routes', 'about.tsx');
let aboutCode = fs.readFileSync(aboutTsxPath, 'utf8');

aboutCode = aboutCode.replace(/Marshmallow Pro/g, "Cloud Marshmallow");
aboutCode = aboutCode.replace(/Hard Candy Ultra/g, "Crystal Hard Candy");

fs.writeFileSync(aboutTsxPath, aboutCode);


// 4. Clean __root.tsx (Footer)
const rootTsxPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let rootCode = fs.readFileSync(rootTsxPath, 'utf8');

// If the footer has links like "Marshmallow Max" etc, clean them.
// Wait, we restored the "Cute Footer" so those links are gone! 
// Let's just run a generic replace just in case.
rootCode = rootCode.replace(/Marshmallow Pro/g, "Cloud Marshmallow");
rootCode = rootCode.replace(/Marshmallow Max/g, "Cloud Marshmallow");
rootCode = rootCode.replace(/Jelly M1/g, "Juicy Jelly");
rootCode = rootCode.replace(/Hard Candy Ultra/g, "Crystal Hard Candy");

fs.writeFileSync(rootTsxPath, rootCode);


console.log("Deleted all tech jargon. Names reverted to sweet candy vibe.");
