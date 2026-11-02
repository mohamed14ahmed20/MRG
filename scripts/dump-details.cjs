const mysql = require('mysql2/promise');
const fs = require('fs');

async function dumpAllDetails() {
  const conn = await mysql.createConnection({
    host: '77.37.35.25',
    user: 'u251392587_mrg_mohamed',
    password: 'DuUNS?b4',
    database: 'u251392587_mrg_mohamed'
  });

  // Get all attachments / media files
  const [attachments] = await conn.query(`
    SELECT p.ID, p.post_title, p.guid, pm.meta_value as attached_file
    FROM wp_posts p
    LEFT JOIN wp_postmeta pm ON p.ID = pm.post_id AND pm.meta_key = '_wp_attached_file'
    WHERE p.post_type = 'attachment'
  `);
  console.log(`Found ${attachments.length} attachments.`);

  const mediaMap = {};
  attachments.forEach(a => {
    mediaMap[a.ID] = {
      title: a.post_title,
      guid: a.guid,
      file: a.attached_file
    };
  });

  // Get pages
  const [pages] = await conn.query(`
    SELECT ID, post_title, post_name, post_content
    FROM wp_posts
    WHERE post_type = 'page' AND post_status = 'publish'
  `);

  // Get company posts
  const companyIds = [272, 308, 342, 381, 384, 388, 390, 394, 396, 425, 432, 434];
  const [companies] = await conn.query(`
    SELECT p.ID, p.post_title, p.post_name, p.post_content, pm.meta_value as thumb_id
    FROM wp_posts p
    LEFT JOIN wp_postmeta pm ON p.ID = pm.post_id AND pm.meta_key = '_thumbnail_id'
    WHERE p.ID IN (${companyIds.join(',')})
  `);

  // Chairman page (416)
  const [chairman] = await conn.query(`
    SELECT ID, post_title, post_content 
    FROM wp_posts 
    WHERE ID = 416
  `);

  // Flipbooks / Magazine
  const [magazines] = await conn.query(`
    SELECT ID, post_title, post_content, post_type
    FROM wp_posts
    WHERE post_type IN ('dflip', 'gs_bookshowcase')
  `);

  const output = {
    pages,
    companies: companies.map(c => ({
      ...c,
      thumbnail: c.thumb_id ? mediaMap[c.thumb_id] : null
    })),
    chairman: chairman[0],
    magazines,
    mediaSample: attachments.slice(0, 30)
  };

  fs.writeFileSync('mrg-data-dump.json', JSON.stringify(output, null, 2), 'utf8');
  console.log('Saved mrg-data-dump.json successfully!');
  await conn.end();
}

dumpAllDetails().catch(console.error);
