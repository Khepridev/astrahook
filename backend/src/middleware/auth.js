import AuthService from '../services/authService.js'

// Middleware to verify JWT token
export const authenticateToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        error: true,
        message: 'Access token is required',
        code: 'NO_TOKEN'
      })
    }

    // Verify token
    const verification = AuthService.verifyToken(token)

    if (!verification.valid) {
      return res.status(401).json({
        error: true,
        message: 'Invalid or expired token',
        code: 'INVALID_TOKEN'
      })
    }

    // Attach user info to request
    req.user = verification.decoded

    next()
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: 'Authentication failed',
      code: 'AUTH_FAILED'
    })
  }
}

// Middleware to check if user is admin
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      error: true,
      message: 'Authentication required',
      code: 'NO_AUTH'
    })
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      error: true,
      message: 'Admin access required',
      code: 'FORBIDDEN'
    })
  }

  next()
}

// Optional authentication - doesn't fail if no token
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token) {
      const verification = AuthService.verifyToken(token)
      if (verification.valid) {
        req.user = verification.decoded
      }
    }

    next()
  } catch (error) {
    next()
  }
}

export default {
  authenticateToken,
  requireAdmin,
  optionalAuth
}
