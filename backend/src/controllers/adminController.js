import AdminService from '../services/adminService.js'
import WebhookService from '../services/webhookService.js'
import LogService from '../services/logService.js'

class AdminController {
  // Get dashboard overview
  static async getDashboard(req, res) {
    try {
      const overview = await AdminService.getDashboardOverview()

      return res.status(200).json({
        success: true,
        overview
      })
    } catch (error) {
      console.error('Get dashboard error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to get dashboard data',
        code: 'GET_DASHBOARD_FAILED'
      })
    }
  }

  // Get all users
  static async getUsers(req, res) {
    try {
      const filters = {
        role: req.query.role,
        limit: parseInt(req.query.limit) || 50,
        offset: parseInt(req.query.offset) || 0
      }

      const users = await AdminService.getAllUsers(filters)

      return res.status(200).json({
        success: true,
        users: users.map(u => ({
          ...u.toJSON(),
          webhook_count: u.webhook_count || 0
        }))
      })
    } catch (error) {
      console.error('Get users error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to get users',
        code: 'GET_USERS_FAILED'
      })
    }
  }

  // Update user role
  static async updateUserRole(req, res) {
    try {
      const userId = parseInt(req.params.id)
      const { role } = req.body

      if (!role) {
        return res.status(400).json({
          error: true,
          message: 'Role is required',
          code: 'MISSING_ROLE'
        })
      }

      const user = await AdminService.updateUserRole(userId, role)

      if (!user) {
        return res.status(404).json({
          error: true,
          message: 'User not found',
          code: 'USER_NOT_FOUND'
        })
      }

      return res.status(200).json({
        success: true,
        message: 'User role updated successfully',
        user: user.toJSON()
      })
    } catch (error) {
      if (error.message.includes('Invalid role')) {
        return res.status(400).json({
          error: true,
          message: error.message,
          code: 'INVALID_ROLE'
        })
      }

      console.error('Update user role error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to update user role',
        code: 'UPDATE_ROLE_FAILED'
      })
    }
  }

  // Delete user
  static async deleteUser(req, res) {
    try {
      const userId = parseInt(req.params.id)

      // Prevent deleting yourself
      if (userId === req.user.userId) {
        return res.status(400).json({
          error: true,
          message: 'You cannot delete your own account',
          code: 'CANNOT_DELETE_SELF'
        })
      }

      const user = await AdminService.deleteUser(userId)

      if (!user) {
        return res.status(404).json({
          error: true,
          message: 'User not found',
          code: 'USER_NOT_FOUND'
        })
      }

      return res.status(200).json({
        success: true,
        message: 'User deleted successfully'
      })
    } catch (error) {
      console.error('Delete user error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to delete user',
        code: 'DELETE_USER_FAILED'
      })
    }
  }

  // Get all webhooks
  static async getWebhooks(req, res) {
    try {
      const filters = {
        userId: req.query.userId ? parseInt(req.query.userId) : null,
        limit: parseInt(req.query.limit) || 50,
        offset: parseInt(req.query.offset) || 0
      }

      const webhooks = await WebhookService.getAllWebhooks(filters)

      return res.status(200).json({
        success: true,
        webhooks: webhooks.map(w => ({
          ...w.toJSON(),
          user_email: w.user_email,
          user_username: w.user_username,
          user_avatar_url: w.user_avatar_url
        }))
      })
    } catch (error) {
      console.error('Get webhooks error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to get webhooks',
        code: 'GET_WEBHOOKS_FAILED'
      })
    }
  }

  // Delete webhook
  static async deleteWebhook(req, res) {
    try {
      const webhookId = parseInt(req.params.id)

      const webhook = await WebhookService.deleteWebhook(webhookId)

      if (!webhook) {
        return res.status(404).json({
          error: true,
          message: 'Webhook not found',
          code: 'WEBHOOK_NOT_FOUND'
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Webhook deleted successfully'
      })
    } catch (error) {
      console.error('Delete webhook error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to delete webhook',
        code: 'DELETE_WEBHOOK_FAILED'
      })
    }
  }

  // Clear webhook logs
  static async clearWebhookLogs(req, res) {
    try {
      const webhookId = parseInt(req.params.id)

      // Verify webhook exists
      const webhook = await WebhookService.getWebhookById(webhookId)
      if (!webhook) {
        return res.status(404).json({
          error: true,
          message: 'Webhook not found',
          code: 'WEBHOOK_NOT_FOUND'
        })
      }

      // Delete all logs for this webhook
      const deletedCount = await AdminService.clearWebhookLogs(webhookId)

      return res.status(200).json({
        success: true,
        message: `${deletedCount} logs cleared successfully`,
        deletedCount
      })
    } catch (error) {
      console.error('Clear webhook logs error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to clear webhook logs',
        code: 'CLEAR_LOGS_FAILED'
      })
    }
  }

  // Get all logs
  static async getLogs(req, res) {
    try {
      const filters = {
        webhookId: req.query.webhookId ? parseInt(req.query.webhookId) : null,
        userId: req.query.userId ? parseInt(req.query.userId) : null,
        status: req.query.status
      }
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 50

      const result = await LogService.getAllLogs(filters, page, limit)

      return res.status(200).json({
        success: true,
        logs: result.logs.map(log => ({
          ...log.toJSON(),
          url_key: log.url_key,
          user_id: log.user_id,
          user_email: log.user_email
        })),
        pagination: result.pagination
      })
    } catch (error) {
      console.error('Get logs error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to get logs',
        code: 'GET_LOGS_FAILED'
      })
    }
  }

  // Get webhook statistics
  static async getWebhookStats(req, res) {
    try {
      const stats = await AdminService.getWebhookStats()

      return res.status(200).json({
        success: true,
        stats
      })
    } catch (error) {
      console.error('Get webhook stats error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to get webhook statistics',
        code: 'GET_STATS_FAILED'
      })
    }
  }

  // Get admin dashboard stats
  static async getStats(req, res) {
    try {
      const stats = await AdminService.getAdminStats()

      return res.status(200).json({
        success: true,
        ...stats
      })
    } catch (error) {
      console.error('Get admin stats error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to get admin statistics',
        code: 'GET_ADMIN_STATS_FAILED'
      })
    }
  }

  // Get recent activity
  static async getActivity(req, res) {
    try {
      const activities = await AdminService.getRecentActivity()

      return res.status(200).json({
        success: true,
        activities
      })
    } catch (error) {
      console.error('Get activity error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to get recent activity',
        code: 'GET_ACTIVITY_FAILED'
      })
    }
  }
}

export default AdminController
