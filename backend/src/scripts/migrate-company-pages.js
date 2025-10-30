import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import pool, { testConnection } from '../config/database.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function runMigration() {
  try {
    console.log('🔄 Starting company_pages migration...\n')
    
    // Test connection first
    await testConnection()
    
    // Read migration file
    const migrationPath = path.join(__dirname, '../../database/migrations/create_company_pages.sql')
    const sql = fs.readFileSync(migrationPath, 'utf8')
    
    console.log('📝 Running migration: create_company_pages.sql')
    
    // Execute migration
    await pool.query(sql)
    
    console.log('\n✅ Migration completed successfully!')
    console.log('📊 Table created: company_pages')
    console.log('📄 Sample pages added:')
    console.log('   - About Us (/company/about-us)')
    console.log('   - Privacy Policy (/company/privacy-policy)')
    console.log('   - Terms of Service (/company/terms-of-service)\n')
    
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message)
    console.error(error)
    process.exit(1)
  }
}

runMigration()
