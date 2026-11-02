const data = require('../mrg-data-dump.json');

for (const c of data.companies) {
  console.log('--------------------------------------------------');
  console.log('ID:', c.ID, '| Title:', c.post_title);
  console.log('Thumbnail:', c.thumbnail);
  const imgs = (c.post_content || '').match(/https?:\/\/[^\s"'<>]+\.(png|jpg|jpeg|webp)/gi) || [];
  console.log('Images inside content:', imgs);
}
