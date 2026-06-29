const fs = require('fs');
const path = require('path');

// 1. FIX HERO SLIDER (Tech Jargon & Apple Colors)
const sliderPath = path.join(__dirname, 'src', 'components', 'HeroSlider.tsx');
if (fs.existsSync(sliderPath)) {
  let sliderCode = fs.readFileSync(sliderPath, 'utf8');

  // Fix Titles
  sliderCode = sliderCode.replace(/Marshmallow Pro/g, "Cloud Marshmallow");
  sliderCode = sliderCode.replace(/Juicy Jelly M1/g, "Juicy Fruit Jelly");
  sliderCode = sliderCode.replace(/Hard Candy Ultra/g, "Crystal Hard Candy");

  // Fix Subtitles (make them sweeter)
  sliderCode = sliderCode.replace(/next-level flavor dynamics/g, "sweet and fruity joy");
  sliderCode = sliderCode.replace(/Uncompromising crunch/g, "Magical crunch");

  // Fix broken identical image paths
  sliderCode = sliderCode.replace(
    /id: 2,[\s\S]*?img: '\/images\/categories\/minimal_marshmallow\.svg'/g,
    match => match.replace('minimal_marshmallow.svg', 'minimal_jelly.svg')
  );
  sliderCode = sliderCode.replace(
    /id: 3,[\s\S]*?img: '\/images\/categories\/minimal_marshmallow\.svg'/g,
    match => match.replace('minimal_marshmallow.svg', 'minimal_hard_candy.svg')
  );

  // Fix Apple color jargon in the slider
  sliderCode = sliderCode.replace(/text-apple-text/g, "text-choco font-display");
  sliderCode = sliderCode.replace(/text-apple-sub/g, "text-mocha");
  sliderCode = sliderCode.replace(/bg-apple-text/g, "bg-choco");
  sliderCode = sliderCode.replace(/bg-apple-bg/g, "bg-cream");

  fs.writeFileSync(sliderPath, sliderCode);
  console.log("HeroSlider tech jargon & colors fixed!");
}

// 2. ENHANCE LANG SWITCHER (Candy Icon)
const rootTsxPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
if (fs.existsSync(rootTsxPath)) {
  let rootCode = fs.readFileSync(rootTsxPath, 'utf8');

  // Replace desktop Globe or Earth emoji
  // In previous steps, it might be <span className="text-xl">🌍</span> or <span className="text-[13px]...
  // Let's replace the button's first child inside variant === 'desktop'
  rootCode = rootCode.replace(/<span className="text-xl">🌍<\/span>/g, '<img src="/images/categories/minimal_jelly.svg" className="w-8 h-8 object-contain drop-shadow-md" alt="Lang" />');
  
  // Replace mobile Globe icon
  rootCode = rootCode.replace(/<Globe className="w-5 h-5 text-gray-500" \/>/g, '<img src="/images/categories/minimal_jelly.svg" className="w-6 h-6 object-contain drop-shadow-sm" alt="Lang" />');
  // Just in case it's an earth emoji in mobile
  rootCode = rootCode.replace(/<span className="text-lg">🌍<\/span>/g, '<img src="/images/categories/minimal_jelly.svg" className="w-6 h-6 object-contain drop-shadow-sm" alt="Lang" />');

  // If there's an already replaced globe from my earlier script (that got overwritten by standard text when fixing syntax):
  // Let's ensure the desktop lang switcher has the candy icon.
  const desktopLangRegex = /aria-expanded=\{isOpen\}\s*whileHover=\{\{ opacity: 0\.7 \}\}\s*>\s*<span/m;
  if(rootCode.match(desktopLangRegex)) {
     rootCode = rootCode.replace(desktopLangRegex, `aria-expanded={isOpen}
          whileHover={{ opacity: 0.7 }}
        >
          <img src="/images/categories/minimal_hard_candy.svg" className="w-8 h-8 object-contain drop-shadow-sm mr-1 hover:rotate-12 transition-transform" alt="Language" />
          <span`);
  }

  // Double check mobile variant if Globe was missed
  const mobileLangRegex = /aria-expanded=\{isOpen\}\s*whileHover.*?transition=.*?\}\s*>\s*<span/m;
  if(rootCode.match(mobileLangRegex)) {
     rootCode = rootCode.replace(mobileLangRegex, (match) => {
         return match.replace(/<span$/, `<img src="/images/categories/minimal_hard_candy.svg" className="w-6 h-6 object-contain drop-shadow-sm mr-1 hover:rotate-12 transition-transform" alt="Language" />\n          <span`);
     });
  }

  fs.writeFileSync(rootTsxPath, rootCode);
  console.log("LangSwitcher candy icon inject success!");
}
