const pool = require('./config/db');

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT DATABASE() AS db, NOW() AS now');
    console.log('✅ DB connection successful:', rows[0]);
    await pool.end();
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
  }
}

testConnection();
