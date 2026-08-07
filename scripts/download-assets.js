const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL =
  'https://raw.githubusercontent.com/Belozertsev-av/banki.shop.example/main/public';

const ASSETS = [
  'logo.png',
  'inCart.png',
  'tel.png',
  'address.png',
  'paint_1.png',
  'paint_2.png',
  'paint_3.png',
  'paint_4.png',
  'p_1_d_1.jpg',
  'p_1_d_2.jpg',
  'p_1_d_3.jpg',
  'p_2_d_1.jpg',
  'p_2_d_2.jpg',
  'p_2_d_3.jpg',
  'p_3_d_1.jpg',
  'p_3_d_2.jpg',
  'p_3_d_3.jpg',
  'p_4_d_1.jpg',
  'p_4_d_2.jpg',
  'p_4_d_3.jpg',
];

const publicDir = path.resolve(__dirname, '../public');

function downloadFile(filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(publicDir, filename);
    const file = fs.createWriteStream(filePath);

    https
      .get(`${BASE_URL}/${filename}`, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
          return;
        }

        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      })
      .on('error', (error) => {
        fs.unlink(filePath, () => reject(error));
      });
  });
}

async function main() {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('Downloading assets from Figma reference repository...');

  for (const asset of ASSETS) {
    process.stdout.write(`  ${asset}... `);
    await downloadFile(asset);
    console.log('ok');
  }

  console.log('\nAll assets downloaded to public/');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
