import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function checkSettings() {
  try {
    const result = await pool.query(
      "SELECT setting_key, setting_value, setting_type, category FROM site_settings WHERE setting_key LIKE 'site_logo%' ORDER BY setting_key"
    );
    
    console.log('\n📋 Logo Settings in Database:\n');
    console.table(result.rows);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkSettings();
