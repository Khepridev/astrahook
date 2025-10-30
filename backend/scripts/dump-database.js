import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execAsync = promisify(exec);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '5432';
const DB_NAME = process.env.DB_NAME || 'astrahook';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';

const dumpFile = path.join(__dirname, '../database/dump.sql');

async function dumpDatabase() {
  console.log('🔄 Starting database dump...');
  console.log(`📦 Database: ${DB_NAME}`);
  console.log(`📁 Output: ${dumpFile}`);
  console.log('');

  try {
    // Set PGPASSWORD environment variable for pg_dump
    const env = {
      ...process.env,
      PGPASSWORD: DB_PASSWORD
    };

    // Create pg_dump command
    const command = `pg_dump -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} --clean --if-exists --no-owner --no-privileges`;

    console.log('⏳ Dumping database...');
    
    // Execute pg_dump
    const { stdout, stderr } = await execAsync(command, { 
      env,
      maxBuffer: 10 * 1024 * 1024 // 10MB buffer
    });

    if (stderr && !stderr.includes('NOTICE')) {
      console.warn('⚠️  Warnings:', stderr);
    }

    // Write to file
    fs.writeFileSync(dumpFile, stdout, 'utf8');

    // Get file size
    const stats = fs.statSync(dumpFile);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);

    console.log('');
    console.log('✅ Database dump completed successfully!');
    console.log(`📊 File size: ${fileSizeInKB} KB`);
    console.log(`📍 Location: ${dumpFile}`);
    console.log('');
    console.log('💡 To restore this dump, run:');
    console.log(`   psql -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} -f ${dumpFile}`);

  } catch (error) {
    console.error('');
    console.error('❌ Database dump failed!');
    console.error('');
    
    if (error.message.includes('pg_dump')) {
      console.error('💡 Make sure PostgreSQL client tools are installed:');
      console.error('   - Windows: Install PostgreSQL from https://www.postgresql.org/download/windows/');
      console.error('   - macOS: brew install postgresql');
      console.error('   - Linux: sudo apt-get install postgresql-client');
    } else {
      console.error('Error:', error.message);
    }
    
    process.exit(1);
  }
}

// Run the dump
dumpDatabase();
