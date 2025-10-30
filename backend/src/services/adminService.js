import pool from '../config/database.js'
import User from '../models/User.js'
import permissionService from './permissionService.js'

class AdminService {
  // Get all users
  static async getAllUsers(filters = {}) {
    try {
      let query = `
        SELECT 
          u.id, 
          u.email,
          u.username,
          u.avatar_url,
          u.role, 
          u.created_at,
          COUNT(w.id) as webhook_count
        FROM users u
        LEFT JOIN webhooks w ON u.id = w.user_id
      `
      const params = []
      const conditions = []

      // Filter by role
      if (filters.role) {
        params.push(filters.role)
        conditions.push(`u.role = $${params.length}`)
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ')
      }

      query += ' GROUP BY u.id, u.email, u.username, u.avatar_url, u.role, u.created_at'
      query += ' ORDER BY u.created_at DESC'

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
        const user = new User(row)
        user.webhook_count = parseInt(row.webhook_count)
        return user
      })
    } catch (error) {
      throw error
    }
  }

  // Get user by ID
  static async getUserById(userId) {
    try {
      const result = await pool.query(
        'SELECT id, email, role, created_at FROM users WHERE id = $1',
        [userId]
      )

      if (result.rows.length === 0) {
        return null
      }

      return new User(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  // Update user role
  static async updateUserRole(userId, newRole) {
    try {
      // Validate role
      if (!permissionService.isValidRole(newRole)) {
        throw new Error(`Invalid role: ${newRole}`)
      }

      const result = await pool.query(
        'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, email, role, created_at',
        [newRole, userId]
      )

      if (result.rows.length === 0) {
        return null
      }

      return new User(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  // Delete user
  static async deleteUser(userId) {
    try {
      const result = await pool.query(
        'DELETE FROM users WHERE id = $1 RETURNING id, email, role',
        [userId]
      )

      if (result.rows.length === 0) {
        return null
      }

      return new User(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  // Get user statistics
  static async getUserStats() {
    try {
      const result = await pool.query(`
        SELECT 
          COUNT(*) as total_users,
          COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_count,
          COUNT(CASE WHEN role = 'user' THEN 1 END) as user_count,
          COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as new_users_week,
          COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as new_users_month
        FROM users
      `)

      const stats = result.rows[0]

      return {
        total_users: parseInt(stats.total_users),
        admin_count: parseInt(stats.admin_count),
        user_count: parseInt(stats.user_count),
        new_users_week: parseInt(stats.new_users_week),
        new_users_month: parseInt(stats.new_users_month)
      }
    } catch (error) {
      throw error
    }
  }

  // Get webhook statistics (all webhooks)
  static async getWebhookStats() {
    try {
      const webhookResult = await pool.query(`
        SELECT 
          COUNT(*) as total_webhooks,
          COUNT(DISTINCT user_id) as users_with_webhooks,
          COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as new_webhooks_week,
          COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as new_webhooks_month
        FROM webhooks
      `)

      const logResult = await pool.query(`
        SELECT 
          COUNT(*) as total_requests,
          COUNT(CASE WHEN status = 'success' THEN 1 END) as successful,
          COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed
        FROM logs
      `)

      const webhookStats = webhookResult.rows[0]
      const logStats = logResult.rows[0]

      const totalRequests = parseInt(logStats.total_requests)
      const successful = parseInt(logStats.successful)

      return {
        total_webhooks: parseInt(webhookStats.total_webhooks),
        users_with_webhooks: parseInt(webhookStats.users_with_webhooks),
        new_webhooks_week: parseInt(webhookStats.new_webhooks_week),
        new_webhooks_month: parseInt(webhookStats.new_webhooks_month),
        total_requests: totalRequests,
        successful: successful,
        failed: parseInt(logStats.failed),
        success_rate: totalRequests > 0 ? ((successful / totalRequests) * 100).toFixed(2) : 0
      }
    } catch (error) {
      throw error
    }
  }

  // Get log statistics (all logs)
  static async getLogStats() {
    try {
      const result = await pool.query(`
        SELECT 
          COUNT(*) as total_requests,
          COUNT(CASE WHEN status = 'success' THEN 1 END) as successful,
          COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed,
          COUNT(CASE WHEN created_at >= NOW() - INTERVAL '24 hours' THEN 1 END) as requests_24h,
          COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as requests_week
        FROM logs
      `)

      const stats = result.rows[0]

      return {
        total_requests: parseInt(stats.total_requests),
        successful: parseInt(stats.successful),
        failed: parseInt(stats.failed),
        requests_24h: parseInt(stats.requests_24h),
        requests_week: parseInt(stats.requests_week),
        success_rate: stats.total_requests > 0
          ? ((stats.successful / stats.total_requests) * 100).toFixed(2)
          : 0
      }
    } catch (error) {
      throw error
    }
  }

  // Get dashboard overview
  static async getDashboardOverview() {
    try {
      const [userStats, webhookStats, logStats] = await Promise.all([
        AdminService.getUserStats(),
        AdminService.getWebhookStats(),
        AdminService.getLogStats()
      ])

      return {
        users: userStats,
        webhooks: webhookStats,
        logs: logStats
      }
    } catch (error) {
      throw error
    }
  }

  // Get admin stats for dashboard
  static async getAdminStats() {
    try {
      const userResult = await pool.query('SELECT COUNT(*) as count FROM users')
      const webhookResult = await pool.query('SELECT COUNT(*) as count FROM webhooks')
      const logResult = await pool.query('SELECT COUNT(*) as count FROM logs')

      return {
        totalUsers: parseInt(userResult.rows[0].count),
        totalWebhooks: parseInt(webhookResult.rows[0].count),
        totalRequests: parseInt(logResult.rows[0].count)
      }
    } catch (error) {
      throw error
    }
  }

  // Get recent activity
  static async getRecentActivity() {
    try {
      // Get recent users
      const recentUsers = await pool.query(`
        SELECT id, email, created_at, 'user_registered' as type
        FROM users
        ORDER BY created_at DESC
        LIMIT 5
      `)

      // Get recent webhooks
      const recentWebhooks = await pool.query(`
        SELECT w.id, w.url_key, w.created_at, u.email, 'webhook_created' as type
        FROM webhooks w
        JOIN users u ON w.user_id = u.id
        ORDER BY w.created_at DESC
        LIMIT 5
      `)

      // Combine and sort by date
      const activities = [
        ...recentUsers.rows.map(row => ({
          id: `user_${row.id}`,
          type: row.type,
          title: 'New user registered',
          description: `${row.email} joined the platform`,
          created_at: row.created_at
        })),
        ...recentWebhooks.rows.map(row => ({
          id: `webhook_${row.id}`,
          type: row.type,
          title: 'Webhook created',
          description: `${row.email} created a new webhook`,
          created_at: row.created_at
        }))
      ]

      // Sort by date and return top 10
      return activities
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 10)
    } catch (error) {
      throw error
    }
  }

  // Clear all logs for a webhook
  static async clearWebhookLogs(webhookId) {
    try {
      const result = await pool.query(
        'DELETE FROM logs WHERE webhook_id = $1 RETURNING id',
        [webhookId]
      )
      return result.rows.length
    } catch (error) {
      throw error
    }
  }
}

export default AdminService
