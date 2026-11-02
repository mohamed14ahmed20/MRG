const fs = require('fs');
const readline = require('readline');
const mysql = require('mysql2/promise');

const targetTables = new Set([
  'wp_options',
  'wp_terms',
  'wp_term_taxonomy',
  'wp_term_relationships',
  'wp_termmeta',
  'wp_posts',
  'wp_postmeta',
  'wp_users',
  'wp_usermeta',
  'wp_gs_books'
]);

async function importDatabase() {
  console.log('Connecting to MySQL 77.37.35.25:3306 ...');
  const connection = await mysql.createConnection({
    host: '77.37.35.25',
    user: 'u251392587_mrg_mohamed',
    password: 'DuUNS?b4',
    database: 'u251392587_mrg_mohamed',
    multipleStatements: true,
    charset: 'utf8mb4'
  });

  console.log('Connected! Preparing database settings...');
  await connection.query('SET NAMES utf8mb4;');
  await connection.query('SET FOREIGN_KEY_CHECKS = 0;');
  await connection.query('SET UNIQUE_CHECKS = 0;');

  const fileStream = fs.createReadStream('u251392587_6i2oe.sql', { encoding: 'utf8' });
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let currentStatement = '';
  let inTargetTable = false;
  let stmtCount = 0;

  for await (const line of rl) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('--') || trimmed.startsWith('/*')) {
      continue;
    }

    if (trimmed.startsWith('CREATE TABLE `')) {
      const match = trimmed.match(/CREATE TABLE `([^`]+)`/);
      if (match) {
        const table = match[1];
        inTargetTable = targetTables.has(table);
        if (inTargetTable) {
          console.log(`Creating table: ${table} ...`);
        }
      }
    } else if (trimmed.startsWith('INSERT INTO `')) {
      const match = trimmed.match(/INSERT INTO `([^`]+)`/);
      if (match) {
        const table = match[1];
        inTargetTable = targetTables.has(table);
      }
    }

    if (inTargetTable) {
      currentStatement += line + '\n';
      if (trimmed.endsWith(';')) {
        try {
          await connection.query(currentStatement);
          stmtCount++;
          if (stmtCount % 20 === 0) {
            console.log(`Executed ${stmtCount} statements...`);
          }
        } catch (err) {
          console.error(`Statement error (${currentStatement.slice(0, 80)}...):`, err.message);
        }
        currentStatement = '';
      }
    }
  }

  await connection.query('SET FOREIGN_KEY_CHECKS = 1;');
  await connection.query('SET UNIQUE_CHECKS = 1;');
  
  const [tables] = await connection.query('SHOW TABLES;');
  console.log('Import completed! Tables in database:', tables.map(r => Object.values(r)[0]));

  for (const t of targetTables) {
    try {
      const [count] = await connection.query(`SELECT COUNT(*) as cnt FROM \`${t}\``);
      console.log(`Table ${t}: ${count[0].cnt} rows`);
    } catch (e) {
      console.log(`Table ${t} count error:`, e.message);
    }
  }

  await connection.end();
}

importDatabase().catch(err => {
  console.error('Fatal import error:', err);
});
