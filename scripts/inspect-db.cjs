const mysql = require('mysql2/promise');

async function inspect() {
  const conn = await mysql.createConnection({
    host: '77.37.35.25',
    user: 'u251392587_mrg_mohamed',
    password: 'DuUNS?b4',
    database: 'u251392587_mrg_mohamed'
  });

  // Pages
  const [pages] = await conn.query(`
    SELECT ID, post_title, post_name, post_status, post_date, post_content
    FROM wp_posts 
    WHERE post_type = 'page'
  `);
  console.log(`=== PAGES (${pages.length}) ===`);
  for (const p of pages) {
    console.log(`ID: ${p.ID} | Title: "${p.post_title}" | Slug: "${p.post_name}" | Status: ${p.post_status}`);
    console.log(`Excerpt: ${p.post_content ? p.post_content.slice(0, 150).replace(/\s+/g, ' ') : ''}\n`);
  }

  // Books / Showcases / Custom types
  const [books] = await conn.query(`
    SELECT ID, post_title, post_name, post_status, post_type, post_content
    FROM wp_posts 
    WHERE post_type NOT IN ('post', 'page', 'revision', 'attachment')
  `);
  console.log(`=== CUSTOM POST TYPES (${books.length}) ===`);
  for (const b of books) {
    console.log(`Type: ${b.post_type} | ID: ${b.ID} | Title: "${b.post_title}" | Slug: "${b.post_name}"`);
  }

  // Arabic posts or genuine MRG posts
  const [arabicPosts] = await conn.query(`
    SELECT ID, post_title, post_name, post_date, post_content
    FROM wp_posts
    WHERE post_type = 'post' AND (post_title REGEXP '[\u0600-\u06FF]' OR post_content REGEXP '[\u0600-\u06FF]')
  `);
  console.log(`\n=== ARABIC / GENUINE POSTS (${arabicPosts.length}) ===`);
  for (const p of arabicPosts) {
    console.log(`ID: ${p.ID} | Title: "${p.post_title}" | Slug: "${p.post_name}"`);
  }

  // Options like logo, phone, address, etc.
  const [options] = await conn.query(`
    SELECT option_name, option_value 
    FROM wp_options 
    WHERE option_name IN ('blogname', 'blogdescription', 'admin_email', 'siteurl') 
       OR option_name LIKE '%phone%' 
       OR option_name LIKE '%address%' 
       OR option_name LIKE '%email%' 
       OR option_name LIKE '%facebook%' 
       OR option_name LIKE '%social%'
       OR option_name LIKE '%logo%'
  `);
  console.log(`\n=== OPTIONS (${options.length}) ===`);
  for (const o of options) {
    console.log(`${o.option_name}: ${o.option_value}`);
  }

  await conn.end();
}

inspect();
