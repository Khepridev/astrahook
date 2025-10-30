import pool from '../config/database.js'
import Webhook from '../models/Webhook.js'

class WebhookService {
  // Create a new webhook
  static async createWebhook(userId) {
    try {
      const urlKey = Webhook.generateUrlKey()
      const secret = Webhook.generateSecret()

      const result = await pool.query(
        'INSERT INTO webhooks (user_id, url_key, secret) VALUES ($1, $2, $3) RETURNING *',
        [userId, urlKey, secret]
      )

      const webhook = new Webhook(result.rows[0])
      return webhook
    } catch (error) {
      throw error
    }
  }

  // Get all webhooks for a user
  static async getWebhooksByUserId(userId) {
    try {
      const result = await pool.query(
        'SELECT * FROM webhooks WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      )

      return result.rows.map(row => new Webhook(row))
    } catch (error) {
      throw error
    }
  }

  // Get webhook by ID
  static async getWebhookById(webhookId) {
    try {
      const result = await pool.query(
        'SELECT * FROM webhooks WHERE id = $1',
        [webhookId]
      )

      if (result.rows.length === 0) {
        return null
      }

      return new Webhook(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  // Get webhook by URL key
  static async getWebhookByUrlKey(urlKey) {
    try {
      const result = await pool.query(
        'SELECT * FROM webhooks WHERE url_key = $1',
        [urlKey]
      )

      if (result.rows.length === 0) {
        return null
      }

      return new Webhook(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  // Delete webhook
  static async deleteWebhook(webhookId) {
    try {
      const result = await pool.query(
        'DELETE FROM webhooks WHERE id = $1 RETURNING *',
        [webhookId]
      )

      if (result.rows.length === 0) {
        return null
      }

      return new Webhook(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  // Get all webhooks (admin only)
  static async getAllWebhooks(filters = {}) {
    try {
      let query = 'SELECT w.*, u.email as user_email, u.username as user_username, u.avatar_url as user_avatar_url FROM webhooks w JOIN users u ON w.user_id = u.id'
      const params = []
      const conditions = []

      // Filter by user ID
      if (filters.userId) {
        params.push(filters.userId)
        conditions.push(`w.user_id = $${params.length}`)
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ')
      }

      query += ' ORDER BY w.created_at DESC'

      // Pagination
      if (filters.limit) {
        params.push(filters.limit)
        query += ` LIMIT $${params.length}`
      }

      if (filters.offset) {
        params.push(filters.offset)
        query += ` OFFSET $${params.length}`
      }

      const result = await pool.query(query, params)

      return result.rows.map(row => {
        const webhook = new Webhook(row)
        webhook.user_email = row.user_email
        webhook.user_username = row.user_username
        webhook.user_avatar_url = row.user_avatar_url
        return webhook
      })
    } catch (error) {
      throw error
    }
  }

  // Count webhooks for a user
  static async countWebhooksByUserId(userId) {
    try {
      const result = await pool.query(
        'SELECT COUNT(*) as count FROM webhooks WHERE user_id = $1',
        [userId]
      )

      return parseInt(result.rows[0].count)
    } catch (error) {
      throw error
    }
  }

  // Regenerate webhook secret
  static async regenerateSecret(webhookId) {
    try {
      const newSecret = Webhook.generateSecret()

      const result = await pool.query(
        'UPDATE webhooks SET secret = $1 WHERE id = $2 RETURNING *',
        [newSecret, webhookId]
      )

      if (result.rows.length === 0) {
        return null
      }

      return new Webhook(result.rows[0])
    } catch (error) {
      throw error
    }
  }
}

export default WebhookService
