const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'images', 'categories');
// Ensure directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Minimal Marshmallow (Soft Pink Glassmorphic Pill)
const marshSVG = `<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="marshGlow" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#ffb3c6"/>
      <stop offset="100%" stop-color="#e56b8f"/>
    </radialGradient>
  </defs>
  <rect x="80" y="130" width="240" height="140" rx="70" fill="url(#marshGlow)" />
  <ellipse cx="200" cy="150" rx="100" ry="25" fill="#ffffff" opacity="0.45" filter="blur(4px)"/>
  <ellipse cx="200" cy="255" rx="90" ry="15" fill="#a03056" opacity="0.3" filter="blur(6px)"/>
</svg>`;
fs.writeFileSync(path.join(publicDir, 'minimal_marshmallow.svg'), marshSVG);

// 2. Juicy Jelly M1 (Sleek Orange Amber Cuboid)
const jellySVG = `<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="jellyGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffe6a0"/>
      <stop offset="40%" stop-color="#ffb703"/>
      <stop offset="100%" stop-color="#fb8500"/>
    </linearGradient>
  </defs>
  <rect x="100" y="100" width="200" height="200" rx="65" fill="url(#jellyGlow)" />
  <path d="M 120 120 C 160 90, 240 90, 280 120" stroke="#ffffff" stroke-width="12" fill="none" opacity="0.5" stroke-linecap="round" filter="blur(3px)"/>
  <circle cx="160" cy="160" r="25" fill="#ffffff" opacity="0.75" filter="blur(3px)"/>
  <circle cx="240" cy="240" r="40" fill="#fb8500" opacity="0.4" filter="blur(5px)"/>
</svg>`;
fs.writeFileSync(path.join(publicDir, 'minimal_jelly.svg'), jellySVG);

// 3. Hard Candy Ultra (Deep Purple Crystal Sphere)
const hardCandySVG = `<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="sphereGlow" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#e0aaff"/>
      <stop offset="40%" stop-color="#9d4edd"/>
      <stop offset="100%" stop-color="#5a189a"/>
    </radialGradient>
  </defs>
  <circle cx="200" cy="200" r="120" fill="url(#sphereGlow)"/>
  <ellipse cx="160" cy="140" rx="35" ry="15" transform="rotate(-35 160 140)" fill="#ffffff" opacity="0.6" filter="blur(2px)"/>
  <path d="M 230 280 A 90 90 0 0 0 290 230" fill="none" stroke="#e0aaff" stroke-width="15" stroke-linecap="round" opacity="0.4" filter="blur(5px)"/>
</svg>`;
fs.writeFileSync(path.join(publicDir, 'minimal_hard_candy.svg'), hardCandySVG);

// 4. Candy Toys (Playful Blue Translucent Torus)
const toySVG = `<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="donutGlow" cx="25%" cy="25%" r="75%">
      <stop offset="0%" stop-color="#90e0ef"/>
      <stop offset="50%" stop-color="#00b4d8"/>
      <stop offset="100%" stop-color="#0077b6"/>
    </radialGradient>
  </defs>
  <path d="M 200 60 A 140 140 0 1 0 200 340 A 140 140 0 1 0 200 60 Z M 200 120 A 80 80 0 1 1 200 280 A 80 80 0 1 1 200 120 Z" fill="url(#donutGlow)" fill-rule="evenodd"/>
  <ellipse cx="130" cy="130" rx="45" ry="18" transform="rotate(-45 130 130)" fill="#ffffff" opacity="0.6" filter="blur(3px)"/>
  <ellipse cx="260" cy="260" rx="35" ry="10" transform="rotate(-45 260 260)" fill="#003554" opacity="0.3" filter="blur(6px)"/>
</svg>`;
fs.writeFileSync(path.join(publicDir, 'minimal_toy.svg'), toySVG);

console.log("SVGs successfully written to absolute public directory!");
