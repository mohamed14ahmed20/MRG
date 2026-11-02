const mysql = require('mysql2/promise');

async function run() {
  const conn = await mysql.createConnection({
    host: '77.37.35.25',
    user: 'u251392587_mrg_mohamed',
    password: 'DuUNS?b4',
    database: 'u251392587_mrg_mohamed'
  });
  await conn.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(100),
      company VARCHAR(255),
      subject VARCHAR(255),
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  console.log('contact_messages table created or verified successfully!');
  await conn.end();
}

run().catch(console.error);
