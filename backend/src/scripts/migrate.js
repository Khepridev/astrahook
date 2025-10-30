import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import pool, { testConnection } from '../config/database.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function runMigrations() {
  try {
    console.log('🔄 Starting database migration...\n')
    
    // Test connection first
    await testConnection()
    
    // Read migration file
    const migrationPath = path.join(__dirname, '../../migrations/001_create_tables.sql')
    const sql = fs.readFileSync(migrationPath, 'utf8')
    
    console.log('📝 Running migration: 001_create_tables.sql')
    
    // Execute migration
    await pool.query(sql)
    
    console.log('\n✅ Migration completed successfully!')
    console.log('📊 Tables created: users, webhooks, logs')
    console.log('👤 Default admin: admin@astrahook.com / admin123\n')
    
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message)
    console.error(error)
    process.exit(1)
  }
}

runMigrations()
