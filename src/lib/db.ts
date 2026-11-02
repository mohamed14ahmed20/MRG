import mysql from 'mysql2/promise';

declare global {
  var _mysqlPool: mysql.Pool | undefined;
}

const pool = global._mysqlPool || mysql.createPool({
  host: process.env.DB_HOST || '77.37.35.25',
  user: process.env.DB_USER || 'u251392587_mrg_mohamed',
  password: process.env.DB_PASSWORD || 'DuUNS?b4',
  database: process.env.DB_NAME || 'u251392587_mrg_mohamed',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 5,
  idleTimeout: 30000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 5000,
  charset: 'utf8mb4'
});

if (process.env.NODE_ENV !== 'production') {
  global._mysqlPool = pool;
}

export default pool;

export async function queryDirectSql<T = any>(sql: string, values: any[] = []): Promise<T[]> {
  try {
    const [rows] = await pool.query(sql, values);
    return rows as T[];
  } catch (err: any) {
    // If the remote server reset the connection or idle socket closed, retry with fresh connection
    if (err.code === 'ECONNRESET' || err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'EPIPE' || err.fatal) {
      try {
        const [retryRows] = await pool.query(sql, values);
        return retryRows as T[];
      } catch (retryErr: any) {
        console.error('Direct SQL Retry Error:', retryErr.message);
        throw retryErr;
      }
    }
    console.error('Direct SQL Query Error:', err.message, '\nSQL:', sql);
    throw err;
  }
}

export async function checkDatabaseConnection(): Promise<{ ok: boolean; timestamp?: string; error?: string }> {
  try {
    const [rows] = await pool.query('SELECT NOW() as currentTime, DATABASE() as db');
    const result = (rows as any[])[0];
    return { ok: true, timestamp: result?.currentTime?.toISOString?.() || String(result?.currentTime) };
  } catch (error: any) {
    return { ok: false, error: error.message };
  }
}
