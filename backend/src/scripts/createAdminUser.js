import bcrypt from 'bcrypt'
import pool from '../config/database.js'

async function createAdminUser() {
  try {
    console.log('🔄 Creating admin user...\n')

    const email = 'admin@astrahook.com'
    const password = 'admin123'
    const role = 'admin'

    // Hash password
    const password_hash = await bcrypt.hash(password, 10)
    console.log('Generated hash:', password_hash)

    // Check if user exists
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email])

    if (existing.rows.length > 0) {
      // Update existing user
      await pool.query(
        'UPDATE users SET password_hash = $1, role = $2 WHERE email = $3',
        [password_hash, role, email]
      )
      console.log('✅ Admin user updated!')
    } else {
      // Create new user
      await pool.query(
        'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3)',
        [email, password_hash, role]
      )
      console.log('✅ Admin user created!')
    }

    console.log('\n📧 Email:', email)
    console.log('🔑 Password:', password)
    console.log('👤 Role:', role)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

createAdminUser()
