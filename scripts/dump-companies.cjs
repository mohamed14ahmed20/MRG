const fs = require('fs');

const content = fs.readFileSync('u251392587_6i2oe.sql', 'utf8');

// Extract post meta to map attachments to URLs
const metaRegex = /\((\d+),\s*(\d+),\s*'_wp_attached_file',\s*'([^']+)'\)/g;
const attachments = {};
let m;
while ((m = metaRegex.exec(content)) !== null) {
  attachments[m[2]] = m[3];
}

const thumbnailMetaRegex = /\((\d+),\s*(\d+),\s*'_thumbnail_id',\s*'(\d+)'\)/g;
const postThumbnails = {};
while ((m = thumbnailMetaRegex.exec(content)) !== null) {
  postThumbnails[m[2]] = m[3];
}

// Let's get terms / categories
// INSERT INTO `wp_terms` (`term_id`, `name`, `slug`, `term_group`)
const terms = {};
const termRegex = /\((\d+),\s*'([^']+)',\s*'([^']+)',\s*\d+\)/g;
const termsStart = content.indexOf("INSERT INTO `wp_terms`");
const termsEnd = content.indexOf("CREATE TABLE `wp_term_relationships`", termsStart);
if (termsStart !== -1) {
  const termsSec = content.slice(termsStart, termsEnd);
  while ((m = termRegex.exec(termsSec)) !== null) {
    terms[m[1]] = { name: m[2], slug: m[3] };
  }
}

// Extract posts
const postsIdx = content.indexOf("INSERT INTO `wp_posts`");
const postsEnd = content.indexOf("CREATE TABLE `wp_termmeta`", postsIdx);
const postsSec = content.slice(postsIdx, postsEnd);

// Let's find all rows with post_status = 'publish'
// Split carefully or use regex on SQL insert
const rows = postsSec.split(/,\s*\n\(/);
console.log('Total post chunks:', rows.length);

const extracted = [];
for (const r of rows) {
  if (r.includes("'publish'") && (r.includes("'post'") || r.includes("'page'"))) {
    // ID is first
    const idMatch = r.match(/^(\d+),/);
    const id = idMatch ? idMatch[1] : null;
    
    // extract post_title, post_name, post_type, post_content
    // We can regex for: 'post_type' at near end
    const typeMatch = r.match(/'(post|page)',\s*'[^']*',\s*\d+\)/);
    if (!typeMatch) continue;
    const postType = typeMatch[1];

    // Let's extract post_title & post_name
    // Usually: ..., 'post_title', 'post_excerpt', 'publish', ..., 'post_name', ...
    const titleMatch = r.match(/,\s*'publish',\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*'([^']*)'/);
    // Let's try matching with more flexibility
    extracted.push({ id, postType, sample: r.slice(0, 300) });
  }
}

console.log('Extracted published items:', extracted.length);
console.log('First 15 items:', extracted.slice(0, 15));
console.log('Terms (Categories):', terms);
