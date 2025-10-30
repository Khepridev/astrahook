class User {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.username = data.username
    this.avatar_url = data.avatar_url
    this.password_hash = data.password_hash
    this.role = data.role || 'user'
    this.created_at = data.created_at
  }

  // Validate email format
  static validateEmail(email) {
    if (!email || typeof email !== 'string') {
      return { valid: false, error: 'Email is required' }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { valid: false, error: 'Invalid email format' }
    }

    if (email.length > 255) {
      return { valid: false, error: 'Email is too long' }
    }

    return { valid: true }
  }

  // Validate password strength
  static validatePassword(password) {
    if (!password || typeof password !== 'string') {
      return { valid: false, error: 'Password is required' }
    }

    if (password.length < 6) {
      return { valid: false, error: 'Password must be at least 6 characters long' }
    }

    if (password.length > 100) {
      return { valid: false, error: 'Password is too long' }
    }

    return { valid: true }
  }

  // Validate user registration data
  static validate(email, password) {
    const emailValidation = User.validateEmail(email)
    if (!emailValidation.valid) {
      return emailValidation
    }

    const passwordValidation = User.validatePassword(password)
    if (!passwordValidation.valid) {
      return passwordValidation
    }

    return { valid: true }
  }

  // Validate username
  static validateUsername(username) {
    if (!username || typeof username !== 'string') {
      return { valid: false, error: 'Username is required' }
    }

    if (username.length < 3) {
      return { valid: false, error: 'Username must be at least 3 characters long' }
    }

    if (username.length > 50) {
      return { valid: false, error: 'Username is too long' }
    }

    // Allow alphanumeric, underscore, and hyphen
    const usernameRegex = /^[a-zA-Z0-9_-]+$/
    if (!usernameRegex.test(username)) {
      return { valid: false, error: 'Username can only contain letters, numbers, underscore, and hyphen' }
    }

    return { valid: true }
  }

  // Validate avatar URL
  static validateAvatarUrl(url) {
    if (!url) {
      return { valid: true } // Avatar is optional
    }

    if (typeof url !== 'string') {
      return { valid: false, error: 'Avatar URL must be a string' }
    }

    if (url.length > 500) {
      return { valid: false, error: 'Avatar URL is too long' }
    }

    // Allow relative paths (starting with /) or full URLs
    if (url.startsWith('/')) {
      return { valid: true }
    }

    // Validate full URLs
    try {
      new URL(url)
      return { valid: true }
    } catch {
      return { valid: false, error: 'Invalid avatar URL format' }
    }
  }

  // Convert user to JSON (exclude password_hash)
  toJSON() {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      avatar_url: this.avatar_url,
      role: this.role,
      created_at: this.created_at
    }
  }

  // Check if user has a specific role
  hasRole(role) {
    return this.role === role
  }

  // Check if user is admin
  isAdmin() {
    return this.role === 'admin'
  }
}

export default User
