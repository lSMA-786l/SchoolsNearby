const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test MySQL connection on server startup
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('MySQL connection successful');
    conn.release();
  } catch (err) {
    console.error('MySQL connection failed:', err);
  }
})();

module.exports = pool;