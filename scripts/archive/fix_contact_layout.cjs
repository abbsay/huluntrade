const fs = require('fs');
const path = require('path');

const contactPath = path.join(__dirname, 'src', 'routes', 'contact.tsx');
let code = fs.readFileSync(contactPath, 'utf8');

// 1. Remove the completely unnecessary redundant top padding and constraints that clash with the Apple top Nav.
// In the <main> tag, change py-12 lg:py-24 to a standard margin block.
code = code.replace(
  /className="min-h-screen bg-apple-bg relative overflow-hidden py-12 lg:py-24"/,
  'className="min-h-screen bg-apple-bg relative overflow-hidden pt-32 pb-24"' // Align padding-top with our 100px+ height header!
);

// 2. Clear out the phantom blobs at the top that are taking up space but doing nothing since I made them transparent earlier
code = code.replace(/\{\/\* Decorative blobs.*?<\/motion\.div>/gs, ''); // Remove the first one
code = code.replace(/<motion\.div\s*className="absolute bottom-0 left-0 w-\[600px\].*?<\/motion\.div>/gs, ''); // Remove the second one

// 3. Let's fix the layout of the form container. 
// "bg-apple-card/50 rounded-[2rem] border border-black/5 p-8 lg:p-12"
// That's an Apple-ish container, but maybe it needs more structural margin or shadow to pop out from the base background.
code = code.replace(
  /className="bg-apple-card\/50 rounded-\[2rem\] border border-black\/5 p-8 lg:p-12"/g,
  'className="bg-apple-card rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-black/5"'
);

// 4. Double check the Title "Let's Talk Sweet Business!" font classes
// It had redundant classes: text-4xl md:text-5xl font-semibold tracking-tighter text-apple-text tracking-tight leading-tight
code = code.replace(
  /font-semibold tracking-tighter text-apple-text tracking-tight leading-tight/g,
  'font-semibold tracking-tighter text-apple-text leading-[1.1]'
);

// 5. The Left Information Panel Icons are floating weirdly or need center alignment
// className="flex items-start gap-4" -> "flex items-center gap-5"
code = code.replace(
  /className="flex items-start gap-4"/g,
  'className="flex items-center gap-5 p-4 rounded-2xl hover:bg-apple-card/50 transition-colors duration-300"'
);

// Remove the explicit infoCards offset hover effect (whileHover={{ x: 4 }}) which feels cheap in an Apple design
code = code.replace(/whileHover=\{\{ x: 4, transition: \{ type: 'spring', stiffness: 400, damping: 14 \} \}\}/g, '');

fs.writeFileSync(contactPath, code);
console.log("Contact page layout and paddings polished.");
