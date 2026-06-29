const fs = require('fs');
const path = require('path');

const indexTsxPath = path.join(__dirname, 'src', 'routes', 'index.tsx');
let indexCode = fs.readFileSync(indexTsxPath, 'utf8');

// I see the exact syntax error!
// Line 56: <h3 className="...">Fluffy Clouds./h3>
// Missing the `<` closing bracket!

indexCode = indexCode.replace(/Fluffy Clouds\.\/h3>/g, 'Fluffy Clouds.</h3>');
indexCode = indexCode.replace(/Bouncy Bites\.\/h3>/g, 'Bouncy Bites.</h3>');

fs.writeFileSync(indexTsxPath, indexCode);
console.log("Syntax error in index.tsx fixed!");
