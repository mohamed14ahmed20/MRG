const mysql = require('mysql2/promise');

async function testConnection() {
  const configs = [
    {
      host: '77.37.35.25',
      user: 'u251392587_mrg_mohamed',
      password: 'DuUNS?b4',
      database: 'u251392587_mrg_mohamed'
    },
    {
      host: '77.37.35.25',
      user: 'u251392587_mrg_mohamed',
      password: 'DuUNS?b4',
      database: 'u251392587_6i2oe'
    },
    {
      host: '77.37.35.25',
      user: 'u251392587_mrg_mohamed',
      password: 'DuUNS?b4'
    }
  ];

  for (let i = 0; i < configs.length; i++) {
    console.log(`Testing config ${i + 1}: db=${configs[i].database || 'none'}...`);
    try {
      const conn = await mysql.createConnection(configs[i]);
      console.log(`Config ${i + 1} connected successfully!`);
      const [rows] = await conn.query('SHOW DATABASES;');
      console.log('Databases:', rows);
      if (configs[i].database) {
        const [tables] = await conn.query('SHOW TABLES;');
        console.log(`Tables in ${configs[i].database}:`, tables.map(r => Object.values(r)[0]));
      }
      await conn.end();
      return;
    } catch (err) {
      console.error(`Config ${i + 1} failed:`, err.message);
    }
  }
}

testConnection();
