import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import pool from '../../lib/db';

// Test MySQL connection on API request
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('MySQL connection successful (API)');
    conn.release();
    process.stdout.write('MySQL connection successful (API)\n');
  } catch (err) {
    console.error('MySQL connection failed (API):', err);
    process.stdout.write('MySQL connection failed (API): ' + err.stack + '\n');
  }
})();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log('AddSchool API handler triggered');
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const form = formidable({
    uploadDir: path.join(process.cwd(), 'public', 'schoolImages'),
    keepExtensions: true
  });

  form.parse(req, async (err, fields, files) => {
    console.log('FIELDS:', fields);
    console.log('FILES:', files);
    if (err) {
      return res.status(500).json({ success: false, message: 'Form parse error' });
    }
    // Validation
    const { name, address, city, state, pincode, number, email } = fields;
    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
    // Convert array fields to strings
    const schoolName = Array.isArray(name) ? name[0] : name;
    const schoolAddress = Array.isArray(address) ? address[0] : address;
    const schoolCity = Array.isArray(city) ? city[0] : city;
    const schoolState = Array.isArray(state) ? state[0] : state;
    const schoolPincode = Array.isArray(pincode) ? pincode[0] : pincode;
    const schoolNumber = Array.isArray(number) ? number[0] : number;
    const schoolEmail = Array.isArray(email) ? email[0] : email;
    if (!schoolName || !schoolAddress || !schoolCity || !schoolState || !schoolPincode || !schoolNumber || !schoolEmail || !imageFile) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }
    if (!/^[\d]+$/.test(schoolPincode)) {
      return res.status(400).json({ success: false, message: 'Pincode must be digits only' });
    }
    // Handle image upload
    const imageName = Date.now() + '_' + imageFile.originalFilename;
    const imagePath = path.join(form.uploadDir, imageName);
    try {
      fs.renameSync(imageFile.filepath, imagePath);
    } catch (e) {
      return res.status(500).json({ success: false, message: 'Image upload failed' });
    }
    // Insert into DB
    try {
      const [result] = await pool.execute(
        'INSERT INTO schools (name, address, city, state, pincode, number, email, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [schoolName, schoolAddress, schoolCity, schoolState, schoolPincode, schoolNumber, schoolEmail, imageName]
      );
      return res.status(200).json({ success: true });
    } catch (e) {
      console.error('DB ERROR:', e);
      process.stdout.write('DB ERROR: ' + (e.stack || e.message) + '\n');
      return res.status(500).json({ success: false, message: 'Database error' });
    }
  });
}