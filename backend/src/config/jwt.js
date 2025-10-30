import dotenv from 'dotenv'

dotenv.config()

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-secret-key-change-this-in-production',
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  algorithm: 'HS256'
}

// Validate JWT configuration
export const validateJwtConfig = () => {
  if (jwtConfig.secret === 'your-secret-key-change-this-in-production') {
    console.warn('⚠️  WARNING: Using default JWT secret. Please set JWT_SECRET in .env file for production!')
  }

  if (!jwtConfig.secret || jwtConfig.secret.length < 32) {
    console.warn('⚠️  WARNING: JWT secret should be at least 32 characters long for security!')
  }

  return true
}

export default jwtConfig
