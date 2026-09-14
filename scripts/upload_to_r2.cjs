const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imagesDir = path.join(__dirname, '..', 'public', 'images');
const bucketName = 'huluntrade';
const accountId = '3c79e6ae374b917afed4a7aa8625b8d4';

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else {
      // Exclude JSON lists or lock files
      if (!file.endsWith('.json') && !file.endsWith('.DS_Store')) {
        fileList.push(filePath);
      }
    }
  });
  return fileList;
}

const allFiles = getFiles(imagesDir);
console.log(`Found ${allFiles.length} images to upload to R2...`);

allFiles.forEach((file, index) => {
  const relativePath = path.relative(imagesDir, file);
  const r2Key = `images/${relativePath}`;
  
  console.log(`[${index + 1}/${allFiles.length}] Uploading ${relativePath} to R2 (key: ${r2Key})...`);
  
  try {
    const cmd = `CLOUDFLARE_ACCOUNT_ID=${accountId} npx wrangler r2 object put "${bucketName}/${r2Key}" --file="${file}" --remote`;
    execSync(cmd, { stdio: 'ignore' });
  } catch (err) {
    console.error(`❌ Failed to upload ${relativePath}:`, err.message);
  }
});

console.log('🎉 All assets synced successfully to R2!');
