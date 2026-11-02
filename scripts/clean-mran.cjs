const sharp = require('sharp');

sharp('public/logos/mran-crop-test.png')
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height, channels } = info;
    const output = Buffer.alloc(width * height * 4);

    for (let i = 0; i < width * height; i++) {
      const srcIdx = i * channels;
      const dstIdx = i * 4;
      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      // Red swoosh condition: high red, low green and blue
      const isRed = r > 100 && r > g * 1.5 && r > b * 1.5;
      
      // Dark navy text condition: dark overall
      const brightness = (r + g + b) / 3;
      const isNavy = brightness < 120 && b >= g;

      if (isRed) {
        output[dstIdx] = r;
        output[dstIdx + 1] = g;
        output[dstIdx + 2] = b;
        output[dstIdx + 3] = 255;
      } else if (isNavy) {
        output[dstIdx] = r;
        output[dstIdx + 1] = g;
        output[dstIdx + 2] = b;
        output[dstIdx + 3] = 255;
      } else {
        output[dstIdx] = 0;
        output[dstIdx + 1] = 0;
        output[dstIdx + 2] = 0;
        output[dstIdx + 3] = 0; // transparent
      }
    }

    sharp(output, { raw: { width, height, channels: 4 } })
      .trim()
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile('public/logos/mran-logo-extracted.png')
      .then(() => console.log('Extracted MRAN logo saved!'));
  });
