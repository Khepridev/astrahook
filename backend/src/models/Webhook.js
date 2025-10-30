import crypto from 'crypto'

class Webhook {
  constructor(data) {
    this.id = data.id
    this.user_id = data.user_id
    this.url_key = data.url_key
    this.secret = data.secret
    this.created_at = data.created_at
  }

  // Generate a unique URL key
  static generateUrlKey() {
    return crypto.randomBytes(16).toString('hex')
  }

  // Generate HMAC secret for signature verification
  static generateSecret() {
    return crypto.randomBytes(32).toString('hex')
  }

  // Get full webhook URL
  getFullUrl(baseUrl = 'http://localhost:3080') {
    return `${baseUrl}/incoming/${this.url_key}`
  }

  // Verify HMAC signature
  verifySignature(payload, signature) {
    if (!this.secret) {
      return false
    }

    try {
      const payloadString = typeof payload === 'string' 
        ? payload 
        : JSON.stringify(payload)

      const expectedSignature = crypto
        .createHmac('sha256', this.secret)
        .update(payloadString)
        .digest('hex')

      return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      )
    } catch (error) {
      return false
    }
  }

  // Generate signature for a payload (for testing)
  generateSignature(payload) {
    if (!this.secret) {
      return null
    }

    const payloadString = typeof payload === 'string' 
      ? payload 
      : JSON.stringify(payload)

    return crypto
      .createHmac('sha256', this.secret)
      .update(payloadString)
      .digest('hex')
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this.id,
      user_id: this.user_id,
      url_key: this.url_key,
      url: this.getFullUrl(),
      secret: this.secret,
      secret_key: this.secret, // Add for backward compatibility
      created_at: this.created_at
    }
  }

  // Convert to JSON without secret (for public display)
  toPublicJSON() {
    return {
      id: this.id,
      url_key: this.url_key,
      url: this.getFullUrl(),
      created_at: this.created_at
    }
  }
}

export default Webhook
