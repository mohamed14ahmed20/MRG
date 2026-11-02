const fs = require('fs');
const readline = require('readline');

async function analyze() {
  const fileStream = fs.createReadStream('u251392587_6i2oe.sql', { encoding: 'utf8' });
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let inPosts = false;
  let inOptions = false;
  const postTypes = {};
  const pages = [];
  const options = {};

  for await (const line of rl) {
    if (line.startsWith("INSERT INTO `wp_options`")) {
      inOptions = true;
    } else if (line.startsWith("CREATE TABLE") && inOptions) {
      inOptions = false;
    }

    if (inOptions) {
      const match = line.match(/\(\d+,\s*'([^']+)',\s*'([^']*)'/);
      if (match) {
        const [, key, val] = match;
        if (['siteurl', 'home', 'blogname', 'blogdescription', 'admin_email'].includes(key) || key.includes('contact') || key.includes('social') || key.includes('phone') || key.includes('address')) {
          options[key] = val;
        }
      }
    }

    if (line.startsWith("INSERT INTO `wp_posts`")) {
      inPosts = true;
    } else if (line.startsWith("CREATE TABLE") && inPosts) {
      inPosts = false;
    }

    if (inPosts) {
      // Find post values
      // Structure: ID, post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count
      const typeMatches = line.matchAll(/'([a-z0-9_\-]+)',\s*'[a-z0-9_\/]*',\s*\d+\)/g);
      for (const tm of typeMatches) {
        const type = tm[1];
        postTypes[type] = (postTypes[type] || 0) + 1;
      }
    }
  }

  console.log('Options found:', options);
  console.log('Post types found:', postTypes);
}

analyze();
