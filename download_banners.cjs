const http = require('http');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'images', 'slider');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const banners = [
  { url: 'http://huluntrade.com/wp-content/uploads/2024/07/默认标题__2024-07-2513_30_33.png', name: 'banner1.png' },
  { url: 'http://huluntrade.com/wp-content/uploads/2024/07/默认标题__2024-07-2512_58_30.png', name: 'banner2.png' }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download banner: ${res.statusCode}`));
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

async function run() {
  for (const b of banners) {
    const dest = path.join(targetDir, b.name);
    console.log(`Downloading banner ${b.name} from ${b.url} ...`);
    try {
      await downloadFile(b.url, dest);
      console.log(`Banner ${b.name} downloaded successfully!`);
    } catch (err) {
      console.error(`Failed to download ${b.name}:`, err.message);
    }
  }
}

run();
