const http = require('http');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'images', 'products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Read the parsed categories
const parsedPath = '/Users/austin/.gemini/antigravity/brain/48c77595-1565-4673-bdef-61bd26be7554/scratch/categories_parsed.json';
const parsed = JSON.parse(fs.readFileSync(parsedPath, 'utf8'));

// Define the final product mapping
const productsToDownload = [];

// 1. Marshmallow (13 items, including 1 unlinked from media library)
const marshImgs = parsed.marshmallow.map(item => item.imgUrl);
// Add the unlinked one
marshImgs.push('http://huluntrade.com/wp-content/uploads/2024/07/微信图片_20240508111212.jpg');

// Remove duplicates
const uniqueMarsh = Array.from(new Set(marshImgs));
uniqueMarsh.forEach((url, index) => {
  const code = `HL-MARSH-${String(index + 1).padStart(3, '0')}`;
  productsToDownload.push({
    id: code.toLowerCase(),
    code: code,
    category: 'marshmallow',
    originalUrl: url,
    weight: '35g',
    packaging: 'Standard Bag'
  });
});

// 2. Jelly (7 items)
parsed.jelly.forEach((item, index) => {
  let code = '';
  let weight = '50g';
  let packaging = 'Standard Bag';
  
  if (item.section.includes('50g')) {
    weight = '50g';
  } else if (item.section.includes('48g')) {
    weight = '48g';
  } else if (item.section.includes('8g')) {
    weight = '8g';
  }
  
  // Extract code from filename if available, e.g. YT24051401
  const filename = path.basename(item.imgUrl);
  const match = filename.match(/(YT\d+)/i);
  if (match) {
    code = match[1].toUpperCase();
  } else {
    code = `HL-JELLY-${String(index + 1).padStart(3, '0')}`;
  }
  
  productsToDownload.push({
    id: code.toLowerCase(),
    code: code,
    category: 'jelly',
    originalUrl: item.imgUrl,
    weight: weight,
    packaging: packaging
  });
});

// 3. Hard Candy (19 items, including unlinked / home page products)
const candyImgs = parsed['hard-candy'].map(item => ({ url: item.imgUrl, section: item.section }));
// Add home/unlinked products
candyImgs.push({ url: 'http://huluntrade.com/wp-content/uploads/2024/07/BBW24042923.jpg', section: '15g lollipop' });
candyImgs.push({ url: 'http://huluntrade.com/wp-content/uploads/2024/07/BBW24042912.jpg', section: '15g lollipop' });
candyImgs.push({ url: 'http://huluntrade.com/wp-content/uploads/2024/07/HL24042501.jpg', section: '35g bear candy' }); // HL prefix bear candy

// Deduplicate by URL
const uniqueCandies = [];
const seenUrls = new Set();
candyImgs.forEach(item => {
  if (!seenUrls.has(item.url)) {
    seenUrls.add(item.url);
    uniqueCandies.push(item);
  }
});

uniqueCandies.forEach((item, index) => {
  let code = '';
  let weight = '15g';
  let packaging = 'Display Box (24 pcs)';
  
  if (item.section.includes('35g')) {
    weight = '35g';
    packaging = 'Standard Bag';
  }
  
  const filename = path.basename(item.url);
  const match = filename.match(/((?:BBW|HL)\d+)/i);
  if (match) {
    code = match[1].toUpperCase();
  } else {
    code = `HL-CANDY-${String(index + 1).padStart(3, '0')}`;
  }
  
  productsToDownload.push({
    id: code.toLowerCase(),
    code: code,
    category: 'hard_candy',
    originalUrl: item.url,
    weight: weight,
    packaging: packaging
  });
});

// Clean up original URLs to download full resolution images (remove WordPress sizes like -769x1024)
productsToDownload.forEach(p => {
  p.downloadUrl = p.originalUrl.replace(/-[0-9]+x[0-9]+/, '');
});

// Helper to download a single file
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      if (res.statusCode !== 200) {
        // If full resolution fails, try the original url with dimensions
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function downloadAll() {
  console.log(`Starting download of ${productsToDownload.length} products...`);
  
  // Save products data list as json to easily generate mockProducts.js later
  fs.writeFileSync(path.join(__dirname, 'public', 'images', 'products', 'products_list.json'), JSON.stringify(productsToDownload, null, 2));
  
  for (const p of productsToDownload) {
    const ext = path.extname(p.downloadUrl) || '.jpg';
    const dest = path.join(targetDir, `${p.id}${ext}`);
    p.localImage = `/images/products/${p.id}${ext}`;
    
    console.log(`Downloading ${p.code} (${p.category}) from ${p.downloadUrl} ...`);
    try {
      await downloadFile(p.downloadUrl, dest);
    } catch (err) {
      console.log(`Warning: Full res download failed for ${p.code}, retrying with original URL ${p.originalUrl}`);
      try {
        await downloadFile(p.originalUrl, dest);
      } catch (err2) {
        console.error(`ERROR: Failed to download ${p.code} completely:`, err2.message);
      }
    }
  }
  
  // Re-write json with final local paths
  fs.writeFileSync(path.join(__dirname, 'public', 'images', 'products', 'products_list.json'), JSON.stringify(productsToDownload, null, 2));
  console.log('All downloads completed and products_list.json written!');
}

downloadAll();
