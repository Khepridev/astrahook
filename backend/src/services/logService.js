import pool from '../config/database.js'
import Log from '../models/Log.js'

class LogService {
  // Create a new log entry
  static async createLog(webhookId, payload, ip, status, lastError = null) {
    try {
      const result = await pool.query(
        'INSERT INTO logs (webhook_id, payload, ip, status, last_error) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [webhookId, JSON.stringify(payload), ip, status, lastError]
      )

      return new Log(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  // Get logs for a webhook with pagination
  static async getLogsByWebhookId(webhookId, page = 1, limit = 50) {
    try {
      const offset = (page - 1) * limit

      const result = await pool.query(
        'SELECT * FROM logs WHERE webhook_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
        [webhookId, limit, offset]
      )

      const countResult = await pool.query(
        'SELECT COUNT(*) as total FROM logs WHERE webhook_id = $1',
        [webhookId]
      )

      const total = parseInt(countResult.rows[0].total)
      const pages = Math.ceil(total / limit)

      return {
        logs: result.rows.map(row => new Log(row)),
        pagination: {
          page,
          limit,
          total,
          pages
        }
      }
    } catch (error) {
      throw error
    }
  }

  // Get log by ID
  static async getLogById(logId) {
    try {
      const result = await pool.query(
        'SELECT * FROM logs WHERE id = $1',
        [logId]
      )

      if (result.rows.length === 0) {
        return null
      }

      return new Log(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  // Get recent logs for a webhook
  static async getRecentLogs(webhookId, limit = 10) {
    try {
      const result = await pool.query(
        'SELECT * FROM logs WHERE webhook_id = $1 ORDER BY created_at DESC LIMIT $2',
        [webhookId, limit]
      )

      return result.rows.map(row => new Log(row))
    } catch (error) {
      throw error
    }
  }

  // Get logs by status
  static async getLogsByStatus(webhookId, status, page = 1, limit = 50) {
    try {
      const offset = (page - 1) * limit

      const result = await pool.query(
        'SELECT * FROM logs WHERE webhook_id = $1 AND status = $2 ORDER BY created_at DESC LIMIT $3 OFFSET $4',
        [webhookId, status, limit, offset]
      )

      const countResult = await pool.query(
        'SELECT COUNT(*) as total FROM logs WHERE webhook_id = $1 AND status = $2',
        [webhookId, status]
      )

      const total = parseInt(countResult.rows[0].total)
      const pages = Math.ceil(total / limit)

      return {
        logs: result.rows.map(row => new Log(row)),
        pagination: {
          page,
          limit,
          total,
          pages
        }
      }
    } catch (error) {
      throw error
    }
  }

  // Get log statistics for a webhook
  static async getWebhookStats(webhookId) {
    try {
      const result = await pool.query(
        `SELECT 
          COUNT(*) as total_requests,
          COUNT(CASE WHEN status = 'success' THEN 1 END) as successful,
          COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed,
          COUNT(CASE WHEN status = 'invalid_signature' THEN 1 END) as invalid_signature,
          MAX(created_at) as last_request
        FROM logs 
        WHERE webhook_id = $1`,
        [webhookId]
      )

      const stats = result.rows[0]

      return {
        total_requests: parseInt(stats.total_requests),
        successful: parseInt(stats.successful),
        failed: parseInt(stats.failed),
        invalid_signature: parseInt(stats.invalid_signature),
        success_rate: stats.total_requests > 0 
          ? ((stats.successful / stats.total_requests) * 100).toFixed(2) 
          : 0,
        last_request: stats.last_request
      }
    } catch (error) {
      throw error
    }
  }

  // Delete old logs (cleanup)
  static async deleteOldLogs(daysOld = 30) {
    try {
      const result = await pool.query(
        `DELETE FROM logs 
        WHERE created_at < NOW() - INTERVAL '${daysOld} days' 
        RETURNING id`,
      )

      return result.rows.length
    } catch (error) {
      throw error
    }
  }

  // Get all logs for admin (with webhook info)
  static async getAllLogs(filters = {}, page = 1, limit = 50) {
    try {
      const offset = (page - 1) * limit
      let query = `
        SELECT l.*, w.url_key, w.user_id, u.email as user_email 
        FROM logs l 
        JOIN webhooks w ON l.webhook_id = w.id 
        JOIN users u ON w.user_id = u.id
      `
      const params = []
      const conditions = []

      // Filter by webhook ID
      if (filters.webhookId) {
        params.push(filters.webhookId)
        conditions.push(`l.webhook_id = $${params.length}`)
      }

      // Filter by user ID
      if (filters.userId) {
        params.push(filters.userId)
        conditions.push(`w.user_id = $${params.length}`)
      }

      // Filter by status
      if (filters.status) {
        params.push(filters.status)
        conditions.push(`l.status = $${params.length}`)
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ')
      }

      query += ' ORDER BY l.created_at DESC'

      // Add pagination
      params.push(limit)
      query += ` LIMIT $${params.length}`

      params.push(offset)
      query += ` OFFSET $${params.length}`

      const result = await pool.query(query, params)

      // Get total count
      let countQuery = 'SELECT COUNT(*) as total FROM logs l JOIN webhooks w ON l.webhook_id = w.id'
      const countParams = []
      const countConditions = []

      if (filters.webhookId) {
        countParams.push(filters.webhookId)
        countConditions.push(`l.webhook_id = $${countParams.length}`)
      }

      if (filters.userId) {
        countParams.push(filters.userId)
        countConditions.push(`w.user_id = $${countParams.length}`)
      }

      if (filters.status) {
        countParams.push(filters.status)
        countConditions.push(`l.status = $${countParams.length}`)
      }

      if (countConditions.length > 0) {
        countQuery += ' WHERE ' + countConditions.join(' AND ')
      }

      const countResult = await pool.query(countQuery, countParams)
      const total = parseInt(countResult.rows[0].total)
      const pages = Math.ceil(total / limit)

      return {
        logs: result.rows.map(row => {
          const log = new Log(row)
          log.url_key = row.url_key
          log.user_id = row.user_id
          log.user_email = row.user_email
          return log
        }),
        pagination: {
          page,
          limit,
          total,
          pages
        }
      }
    } catch (error) {
      throw error
    }
  }
}

export default LogService
