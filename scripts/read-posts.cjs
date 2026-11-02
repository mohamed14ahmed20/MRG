const fs = require('fs');
const readline = require('readline');

async function readPosts() {
  const rl = readline.createInterface({ input: fs.createReadStream('u251392587_6i2oe.sql'), crlfDelay: Infinity });
  let inPosts = false;
  const items = [];

  for await (const line of rl) {
    if (line.startsWith('INSERT INTO `wp_posts`')) {
      inPosts = true;
    } else if (line.startsWith('CREATE TABLE') && inPosts) {
      break;
    }

    if (inPosts) {
      // Find rows that have 'publish' and 'page' or 'post'
      // Post types: page, post, etc.
      // Match ID, title, post_type, post_status
      // In wp_posts: ID is first number, post_title, post_name, post_type
      if (line.includes("'publish'") && (line.includes("'page'") || line.includes("'post'") || line.includes("'gs_bookshowcase'"))) {
        // extract post_type
        const typeMatch = line.match(/'(page|post|gs_bookshowcase)'/);
        // extract title
        // In wp_posts: VALUES (ID, author, date, date_gmt, content, title, excerpt, status, ...)
        items.push({
          linePreview: line.slice(0, 180),
          type: typeMatch ? typeMatch[1] : 'unknown'
        });
      }
    }
  }

  console.log(`Found ${items.length} matching rows.`);
  const pages = items.filter(i => i.type === 'page');
  console.log('Pages count:', pages.length);
  pages.forEach(p => console.log('PAGE:', p.linePreview));

  const books = items.filter(i => i.type === 'gs_bookshowcase');
  console.log('Books count:', books.length);
  books.forEach(b => console.log('BOOK:', b.linePreview));

  console.log('Sample posts (first 10):');
  items.filter(i => i.type === 'post').slice(0, 10).forEach(p => console.log('POST:', p.linePreview));
}

readPosts();
