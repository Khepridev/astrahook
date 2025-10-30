import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../config/database.js'
import User from '../models/User.js'

const SALT_ROUNDS = 10

class AuthService {
  // Register a new user
  static async register(email, password, username = null) {
    try {
      // Validate input
      const validation = User.validate(email, password)
      if (!validation.valid) {
        throw new Error(validation.error)
      }

      // Generate username if not provided
      const finalUsername = username || email.split('@')[0]

      // Validate username
      const usernameValidation = User.validateUsername(finalUsername)
      if (!usernameValidation.valid) {
        throw new Error(usernameValidation.error)
      }

      // Check if email already exists
      const existingUser = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [email.toLowerCase()]
      )

      if (existingUser.rows.length > 0) {
        throw new Error('Email already registered')
      }

      // Check if username already exists
      const existingUsername = await pool.query(
        'SELECT id FROM users WHERE username = $1',
        [finalUsername]
      )

      if (existingUsername.rows.length > 0) {
        throw new Error('Username already taken')
      }

      // Hash password
      const password_hash = await bcrypt.hash(password, SALT_ROUNDS)

      // Insert new user
      const result = await pool.query(
        'INSERT INTO users (email, username, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, email, username, avatar_url, role, created_at',
        [email.toLowerCase(), finalUsername, password_hash, 'user']
      )

      const userData = result.rows[0]
      const user = new User(userData)

      return {
        success: true,
        message: 'User registered successfully',
        userId: user.id,
        user: user.toJSON()
      }
    } catch (error) {
      throw error
    }
  }

  // Login user
  static async login(email, password) {
    try {
      // Validate input
      if (!email || !password) {
        throw new Error('Email and password are required')
      }

      console.log('🔐 Login attempt:', email)

      // Find user by email
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email.toLowerCase()]
      )

      if (result.rows.length === 0) {
        console.log('❌ User not found:', email)
        throw new Error('Invalid email or password')
      }

      const userData = result.rows[0]
      const user = new User(userData)

      console.log('👤 User found:', user.email, 'Role:', user.role)
      console.log('🔑 Comparing password...')

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, userData.password_hash)

      console.log('✅ Password valid:', isPasswordValid)

      if (!isPasswordValid) {
        console.log('❌ Invalid password for:', email)
        throw new Error('Invalid email or password')
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET || 'your-secret-key-change-this-in-production',
        {
          expiresIn: process.env.JWT_EXPIRES_IN || '24h'
        }
      )

      return {
        success: true,
        token,
        user: user.toJSON()
      }
    } catch (error) {
      throw error
    }
  }

  // Verify JWT token
  static verifyToken(token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
      )
      return { valid: true, decoded }
    } catch (error) {
      return { valid: false, error: error.message }
    }
  }

  // Get user by ID
  static async getUserById(userId) {
    try {
      const result = await pool.query(
        'SELECT id, email, username, avatar_url, role, created_at FROM users WHERE id = $1',
        [userId]
      )

      if (result.rows.length === 0) {
        return null
      }

      const user = new User(result.rows[0])
      return user.toJSON()
    } catch (error) {
      throw error
    }
  }

  // Update user profile
  static async updateProfile(userId, data) {
    try {
      const updates = []
      const values = []
      let paramCount = 1

      // Validate and add email if provided
      if (data.email) {
        const emailValidation = User.validateEmail(data.email)
        if (!emailValidation.valid) {
          throw new Error(emailValidation.error)
        }

        // Check if email is already in use by another user
        const existingUser = await pool.query(
          'SELECT id FROM users WHERE email = $1 AND id != $2',
          [data.email.toLowerCase(), userId]
        )

        if (existingUser.rows.length > 0) {
          throw new Error('Email already in use')
        }

        updates.push(`email = $${paramCount}`)
        values.push(data.email.toLowerCase())
        paramCount++
      }

      // Validate and add username if provided
      if (data.username) {
        const usernameValidation = User.validateUsername(data.username)
        if (!usernameValidation.valid) {
          throw new Error(usernameValidation.error)
        }

        // Check if username is already in use by another user
        const existingUsername = await pool.query(
          'SELECT id FROM users WHERE username = $1 AND id != $2',
          [data.username, userId]
        )

        if (existingUsername.rows.length > 0) {
          throw new Error('Username already in use')
        }

        updates.push(`username = $${paramCount}`)
        values.push(data.username)
        paramCount++
      }

      // Validate and add avatar_url if provided
      if (data.avatar_url !== undefined) {
        if (data.avatar_url) {
          const avatarValidation = User.validateAvatarUrl(data.avatar_url)
          if (!avatarValidation.valid) {
            throw new Error(avatarValidation.error)
          }
        }

        updates.push(`avatar_url = $${paramCount}`)
        values.push(data.avatar_url || null)
        paramCount++
      }

      if (updates.length === 0) {
        throw new Error('No fields to update')
      }

      // Add userId to values
      values.push(userId)

      // Update user
      const query = `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING id, email, username, avatar_url, role, created_at`
      const result = await pool.query(query, values)

      if (result.rows.length === 0) {
        throw new Error('User not found')
      }

      const user = new User(result.rows[0])

      return {
        success: true,
        message: 'Profile updated successfully',
        user: user.toJSON()
      }
    } catch (error) {
      throw error
    }
  }

  // Change user password
  static async changePassword(userId, oldPassword, newPassword) {
    try {
      // Validate new password
      const validation = User.validatePassword(newPassword)
      if (!validation.valid) {
        throw new Error(validation.error)
      }

      // Get user with password hash
      const result = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [userId]
      )

      if (result.rows.length === 0) {
        throw new Error('User not found')
      }

      const userData = result.rows[0]

      // Verify old password
      const isPasswordValid = await bcrypt.compare(oldPassword, userData.password_hash)
      if (!isPasswordValid) {
        throw new Error('Current password is incorrect')
      }

      // Hash new password
      const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS)

      // Update password
      await pool.query(
        'UPDATE users SET password_hash = $1 WHERE id = $2',
        [newPasswordHash, userId]
      )

      return {
        success: true,
        message: 'Password changed successfully'
      }
    } catch (error) {
      throw error
    }
  }
}

export default AuthService
