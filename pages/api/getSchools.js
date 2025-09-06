import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  try {
    const [rows] = await pool.execute('SELECT id, name, address, city, state, pincode, number, email, image FROM schools');
    res.status(200).json(rows);
  } catch (e) {
    console.error('DB ERROR (getSchools):', e);
    process.stdout.write('DB ERROR (getSchools): ' + (e.stack || e.message) + '\n');
    res.status(500).json({ success: false, message: 'Database error' });
  }
}