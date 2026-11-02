const fs = require('fs');
const path = require('path');
const https = require('https');

const data = require('./mrg-data-dump.json');
const urls = new Set();

data.companies.forEach(c => {
  if (c.thumbnail && c.thumbnail.file) urls.add(c.thumbnail.file);
  const matches = (c.post_content || '').match(/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/[^"'\s<>]+/g) || [];
  matches.forEach(m => urls.add(m.replace('wp-content/uploads/', '')));
});

data.pages.forEach(p => {
  const matches = (p.post_content || '').match(/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/[^"'\s<>]+/g) || [];
  matches.forEach(m => urls.add(m.replace('wp-content/uploads/', '')));
});

if (data.chairman) {
  const matches = (data.chairman.post_content || '').match(/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/[^"'\s<>]+/g) || [];
  matches.forEach(m => urls.add(m.replace('wp-content/uploads/', '')));
}

data.mediaSample.forEach(m => {
  if (m.attached_file) urls.add(m.attached_file);
});

console.log(`Found ${urls.size} unique image files to download.`);

async function downloadFile(relPath) {
  const cleanRel = relPath.replace(/\?.*$/, '');
  const targetPath = path.join(__dirname, 'public', 'uploads', cleanRel);
  if (fs.existsSync(targetPath)) {
    return;
  }
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });

  const url = `https://mrgeg.com/wp-content/uploads/${encodeURI(cleanRel)}`;
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(targetPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log('Downloaded:', cleanRel);
          resolve(true);
        });
      } else {
        console.log(`HTTP ${res.statusCode} for ${url}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`Error downloading ${cleanRel}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  for (const rel of Array.from(urls)) {
    await downloadFile(rel);
  }
  console.log('All image downloads finished!');
}

run();
