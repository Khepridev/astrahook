import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

// PostgreSQL connection pool configuration
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'astrahook',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
})

// Error handling for the pool
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// Test database connection
export const testConnection = async () => {
  try {
    const client = await pool.connect()
    console.log('✓ Database connected successfully')
    client.release()
    return true
  } catch (err) {
    console.error('✗ Database connection failed:', err.message)
    throw err
  }
}

// Query helper function
export const query = async (text, params) => {
  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('Executed query', { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error('Query error:', error.message)
    throw error
  }
}

// Get a client from the pool for transactions
export const getClient = async () => {
  const client = await pool.connect()
  const query = client.query.bind(client)
  const release = client.release.bind(client)
  
  // Set a timeout of 5 seconds, after which we will log this client's last query
  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 5 seconds!')
  }, 5000)
  
  // Monkey patch the release method to clear our timeout
  client.release = () => {
    clearTimeout(timeout)
    client.release = release
    return release()
  }
  
  return client
}

export default pool
