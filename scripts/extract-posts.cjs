const fs = require('fs');

async function extractPages() {
  const content = fs.readFileSync('u251392587_6i2oe.sql', { encoding: 'utf8' });
  
  // Find INSERT INTO `wp_posts`
  const postsIdx = content.indexOf("INSERT INTO `wp_posts`");
  const postsEnd = content.indexOf("CREATE TABLE `wp_termmeta`", postsIdx);
  const postsSection = content.slice(postsIdx, postsEnd);
  
  // Regex to match individual rows
  // Typical WordPress: (ID, post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count)
  
  // Let's find pages:
  console.log('--- PAGES ---');
  const pageRegex = /\((\d+),\s*\d+,\s*'[^']+',\s*'[^']+',\s*'((?:[^'\\]|\\.)*)',\s*'((?:[^'\\]|\\.)*)',\s*'((?:[^'\\]|\\.)*)',\s*'([^']+)',\s*'[^']+',\s*'[^']+',\s*'[^']+',\s*'((?:[^'\\]|\\.)*)',\s*'[^']+',\s*'[^']+',\s*'[^']+',\s*'[^']+',\s*'((?:[^'\\]|\\.)*)',\s*\d+,\s*'((?:[^'\\]|\\.)*)',\s*\d+,\s*'page'/g;
  let match;
  while ((match = pageRegex.exec(postsSection)) !== null) {
    console.log(`Page ID: ${match[1]}, Title: ${match[3]}, Slug: ${match[6]}, Status: ${match[5]}`);
    console.log(`Content Preview: ${match[2].slice(0, 200).replace(/\\r\\n|\\n/g, ' ')}\n`);
  }

  // Let's find sample posts:
  console.log('--- SAMPLE POSTS ---');
  const postRegex = /\((\d+),\s*\d+,\s*'([^']+)',\s*'[^']+',\s*'((?:[^'\\]|\\.)*)',\s*'((?:[^'\\]|\\.)*)',\s*'((?:[^'\\]|\\.)*)',\s*'publish',\s*'[^']+',\s*'[^']+',\s*'[^']+',\s*'((?:[^'\\]|\\.)*)',\s*'[^']+',\s*'[^']+',\s*'[^']+',\s*'[^']+',\s*'((?:[^'\\]|\\.)*)',\s*\d+,\s*'((?:[^'\\]|\\.)*)',\s*\d+,\s*'post'/g;
  let count = 0;
  while ((match = postRegex.exec(postsSection)) !== null && count < 10) {
    count++;
    console.log(`Post ID: ${match[1]}, Date: ${match[2]}, Title: ${match[4]}, Slug: ${match[6]}`);
    console.log(`Excerpt/Content: ${match[3].slice(0, 150).replace(/\\r\\n|\\n/g, ' ')}\n`);
  }
}

extractPages();
