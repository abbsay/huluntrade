const fs = require('fs');
const path = require('path');

function forceReplace(filePath) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');

  // Regex check: since my previous replace failed, the paths in `CATEGORIES` array might not match my original pattern
  code = code.replace(/img:\s*['"]\/images\/categories\/[^'"]+\.png['"]/g, (match, offset, fullText) => {
    // If it mentions marshmallow
    if (fullText.substring(offset - 100, offset).includes('marshmallow')) return "img: '/images/categories/minimal_marshmallow.svg'";
    if (fullText.substring(offset - 100, offset).includes('jelly')) return "img: '/images/categories/minimal_jelly.svg'";
    if (fullText.substring(offset - 100, offset).includes('hard_candy')) return "img: '/images/categories/minimal_hard_candy.svg'";
    if (fullText.substring(offset - 100, offset).includes('candy_toy')) return "img: '/images/categories/minimal_toy.svg'";
    
    // Safefallbacks
    return "img: '/images/categories/minimal_marshmallow.svg'";
  });

  // Specifically for Hero Slider array which has raw img links
  code = code.replace(/img: "\/images\/categories\/other.png"/g, 'img: "/images/categories/minimal_marshmallow.svg"');
  code = code.replace(/img: "\/images\/categories\/jelly.png"/g, 'img: "/images/categories/minimal_jelly.svg"');
  code = code.replace(/img: "\/images\/categories\/hard_candy.png"/g, 'img: "/images/categories/minimal_hard_candy.svg"');

  // Also replace explicit component image links in Bento Box
  code = code.replace(/src="\/images\/categories\/other\.png"/g, 'src="/images/categories/minimal_marshmallow.svg"');
  code = code.replace(/src="\/images\/categories\/jelly\.png"/g, 'src="/images/categories/minimal_jelly.svg"');

  fs.writeFileSync(filePath, code);
}

forceReplace(path.join(__dirname, 'src', 'routes', 'index.tsx'));
forceReplace(path.join(__dirname, 'src', 'components', 'HeroSlider.tsx'));
forceReplace(path.join(__dirname, 'src', 'routes', 'products.tsx'));

console.log("Forced SVG replacements applied!");
