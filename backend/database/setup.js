import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../src/config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupDatabase() {
  try {
    console.log('🚀 Starting database setup...\n');
    
    // Read the SQL dump file
    const dumpPath = path.join(__dirname, 'dump.sql');
    const sql = fs.readFileSync(dumpPath, 'utf8');
    
    console.log('📄 Executing SQL dump...');
    await db.query(sql);
    
    console.log('✅ Database schema created successfully!');
    console.log('✅ Seed data inserted successfully!');
    console.log('✅ Default admin user created!\n');
    
    console.log('📊 Database setup completed!\n');
    console.log('🔐 Default Admin Credentials:');
    console.log('   Email:    admin@admin.com');
    console.log('   Password: 123123\n');
    console.log('⚠️  IMPORTANT: Change the password after first login!\n');
    console.log('Next steps:');
    console.log('1. Start the backend: npm run dev');
    console.log('2. Start the frontend: cd ../frontend && npm run dev');
    console.log('3. Login at: http://localhost:5173/admin/login\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('\nPlease check:');
    console.error('1. PostgreSQL is running');
    console.error('2. Database credentials in .env are correct');
    console.error('3. Database exists and is accessible\n');
    process.exit(1);
  }
}

setupDatabase();
