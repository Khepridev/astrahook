import AuthService from '../services/authService.js'

class AuthController {
  // Register new user
  static async register(req, res) {
    try {
      const { email, password, username } = req.body

      if (!email || !password) {
        return res.status(400).json({
          error: true,
          message: 'Email and password are required',
          code: 'MISSING_FIELDS'
        })
      }

      const result = await AuthService.register(email, password, username)

      return res.status(201).json({
        success: true,
        message: result.message,
        userId: result.userId,
        user: result.user
      })
    } catch (error) {
      // Check for specific errors
      if (error.message === 'Email already registered' || error.message === 'Username already taken') {
        return res.status(409).json({
          error: true,
          message: error.message,
          code: error.message.includes('Email') ? 'EMAIL_EXISTS' : 'USERNAME_EXISTS'
        })
      }

      if (error.message.includes('Email') || error.message.includes('Password') || error.message.includes('Username')) {
        return res.status(400).json({
          error: true,
          message: error.message,
          code: 'VALIDATION_ERROR'
        })
      }

      console.error('Register error:', error)
      return res.status(500).json({
        error: true,
        message: 'Registration failed',
        code: 'REGISTER_FAILED'
      })
    }
  }

  // Login user
  static async login(req, res) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({
          error: true,
          message: 'Email and password are required',
          code: 'MISSING_FIELDS'
        })
      }

      const result = await AuthService.login(email, password)

      return res.status(200).json({
        success: true,
        token: result.token,
        user: result.user
      })
    } catch (error) {
      if (error.message === 'Invalid email or password') {
        return res.status(401).json({
          error: true,
          message: error.message,
          code: 'INVALID_CREDENTIALS'
        })
      }

      console.error('Login error:', error)
      return res.status(500).json({
        error: true,
        message: 'Login failed',
        code: 'LOGIN_FAILED'
      })
    }
  }

  // Get current user info
  static async me(req, res) {
    try {
      const userId = req.user.userId

      const user = await AuthService.getUserById(userId)

      if (!user) {
        return res.status(404).json({
          error: true,
          message: 'User not found',
          code: 'USER_NOT_FOUND'
        })
      }

      return res.status(200).json({
        success: true,
        user
      })
    } catch (error) {
      console.error('Get user error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to get user info',
        code: 'GET_USER_FAILED'
      })
    }
  }

  // Update profile
  static async updateProfile(req, res) {
    try {
      const userId = req.user.userId
      const { email, username, avatar_url } = req.body

      if (!email && !username && avatar_url === undefined) {
        return res.status(400).json({
          error: true,
          message: 'At least one field (email, username, or avatar_url) is required',
          code: 'MISSING_FIELDS'
        })
      }

      const data = {}
      if (email) data.email = email
      if (username) data.username = username
      if (avatar_url !== undefined) data.avatar_url = avatar_url

      const result = await AuthService.updateProfile(userId, data)

      return res.status(200).json({
        success: true,
        message: result.message,
        user: result.user
      })
    } catch (error) {
      if (error.message === 'Email already in use' || error.message === 'Username already in use') {
        return res.status(409).json({
          error: true,
          message: error.message,
          code: error.message.includes('Email') ? 'EMAIL_EXISTS' : 'USERNAME_EXISTS'
        })
      }

      if (error.message.includes('Email') || error.message.includes('Username')) {
        return res.status(400).json({
          error: true,
          message: error.message,
          code: 'VALIDATION_ERROR'
        })
      }

      console.error('Update profile error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to update profile',
        code: 'UPDATE_PROFILE_FAILED'
      })
    }
  }

  // Upload avatar
  static async uploadAvatar(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: true,
          message: 'No file uploaded',
          code: 'NO_FILE'
        })
      }

      const userId = req.user.userId
      const avatarUrl = `/uploads/avatars/${req.file.filename}`

      // Update user's avatar_url in database
      const result = await AuthService.updateProfile(userId, { avatar_url: avatarUrl })

      return res.status(200).json({
        success: true,
        message: 'Avatar uploaded successfully',
        avatar_url: avatarUrl,
        user: result.user
      })
    } catch (error) {
      console.error('Upload avatar error:', error)
      return res.status(500).json({
        error: true,
        message: error.message || 'Failed to upload avatar',
        code: 'UPLOAD_FAILED'
      })
    }
  }

  // Change password
  static async changePassword(req, res) {
    try {
      const userId = req.user.userId
      const { oldPassword, newPassword } = req.body

      if (!oldPassword || !newPassword) {
        return res.status(400).json({
          error: true,
          message: 'Old password and new password are required',
          code: 'MISSING_FIELDS'
        })
      }

      const result = await AuthService.changePassword(userId, oldPassword, newPassword)

      return res.status(200).json({
        success: true,
        message: result.message
      })
    } catch (error) {
      if (error.message === 'Current password is incorrect') {
        return res.status(401).json({
          error: true,
          message: error.message,
          code: 'INVALID_PASSWORD'
        })
      }

      if (error.message.includes('Password')) {
        return res.status(400).json({
          error: true,
          message: error.message,
          code: 'VALIDATION_ERROR'
        })
      }

      console.error('Change password error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to change password',
        code: 'CHANGE_PASSWORD_FAILED'
      })
    }
  }
}

export default AuthController
