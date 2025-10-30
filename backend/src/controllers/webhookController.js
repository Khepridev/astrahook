import WebhookService from '../services/webhookService.js'
import LogService from '../services/logService.js'

class WebhookController {
    // Create new webhook
    static async createWebhook(req, res) {
        try {
            const userId = req.user.userId

            const webhook = await WebhookService.createWebhook(userId)

            return res.status(201).json({
                success: true,
                message: 'Webhook created successfully',
                webhook: webhook.toJSON()
            })
        } catch (error) {
            console.error('Create webhook error:', error)
            return res.status(500).json({
                error: true,
                message: 'Failed to create webhook',
                code: 'CREATE_WEBHOOK_FAILED'
            })
        }
    }

    // Get all webhooks for current user
    static async getWebhooks(req, res) {
        try {
            const userId = req.user.userId

            const webhooks = await WebhookService.getWebhooksByUserId(userId)

            return res.status(200).json({
                success: true,
                webhooks: webhooks.map(w => w.toJSON())
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

    // Get webhook by ID
    static async getWebhookById(req, res) {
        try {
            const webhookId = parseInt(req.params.id)
            const userId = req.user.userId

            const webhook = await WebhookService.getWebhookById(webhookId)

            if (!webhook) {
                return res.status(404).json({
                    error: true,
                    message: 'Webhook not found',
                    code: 'WEBHOOK_NOT_FOUND'
                })
            }

            // Check ownership (unless admin)
            if (webhook.user_id !== userId && req.user.role !== 'admin') {
                return res.status(403).json({
                    error: true,
                    message: 'Access denied',
                    code: 'FORBIDDEN'
                })
            }

            return res.status(200).json({
                success: true,
                webhook: webhook.toJSON()
            })
        } catch (error) {
            console.error('Get webhook error:', error)
            return res.status(500).json({
                error: true,
                message: 'Failed to get webhook',
                code: 'GET_WEBHOOK_FAILED'
            })
        }
    }

    // Delete webhook
    static async deleteWebhook(req, res) {
        try {
            const webhookId = parseInt(req.params.id)
            const userId = req.user.userId

            const webhook = await WebhookService.getWebhookById(webhookId)

            if (!webhook) {
                return res.status(404).json({
                    error: true,
                    message: 'Webhook not found',
                    code: 'WEBHOOK_NOT_FOUND'
                })
            }

            // Check ownership (unless admin)
            if (webhook.user_id !== userId && req.user.role !== 'admin') {
                return res.status(403).json({
                    error: true,
                    message: 'Access denied',
                    code: 'FORBIDDEN'
                })
            }

            await WebhookService.deleteWebhook(webhookId)

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

    // Get webhook logs
    static async getWebhookLogs(req, res) {
        try {
            const webhookId = parseInt(req.params.id)
            const userId = req.user.userId
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 50

            const webhook = await WebhookService.getWebhookById(webhookId)

            if (!webhook) {
                return res.status(404).json({
                    error: true,
                    message: 'Webhook not found',
                    code: 'WEBHOOK_NOT_FOUND'
                })
            }

            // Check ownership (unless admin)
            if (webhook.user_id !== userId && req.user.role !== 'admin') {
                return res.status(403).json({
                    error: true,
                    message: 'Access denied',
                    code: 'FORBIDDEN'
                })
            }

            const result = await LogService.getLogsByWebhookId(webhookId, page, limit)

            return res.status(200).json({
                success: true,
                logs: result.logs.map(log => log.toJSON()),
                pagination: result.pagination
            })
        } catch (error) {
            console.error('Get webhook logs error:', error)
            return res.status(500).json({
                error: true,
                message: 'Failed to get webhook logs',
                code: 'GET_LOGS_FAILED'
            })
        }
    }

    // Get single log detail
    static async getLogDetail(req, res) {
        try {
            const webhookId = parseInt(req.params.id)
            const logId = parseInt(req.params.logId)
            const userId = req.user.userId

            const webhook = await WebhookService.getWebhookById(webhookId)

            if (!webhook) {
                return res.status(404).json({
                    error: true,
                    message: 'Webhook not found',
                    code: 'WEBHOOK_NOT_FOUND'
                })
            }

            // Check ownership (unless admin)
            if (webhook.user_id !== userId && req.user.role !== 'admin') {
                return res.status(403).json({
                    error: true,
                    message: 'Access denied',
                    code: 'FORBIDDEN'
                })
            }

            const log = await LogService.getLogById(logId)

            if (!log) {
                return res.status(404).json({
                    error: true,
                    message: 'Log not found',
                    code: 'LOG_NOT_FOUND'
                })
            }

            // Verify log belongs to this webhook
            if (log.webhook_id !== webhookId) {
                return res.status(403).json({
                    error: true,
                    message: 'Access denied',
                    code: 'FORBIDDEN'
                })
            }

            return res.status(200).json({
                success: true,
                log: log.toJSON()
            })
        } catch (error) {
            console.error('Get log detail error:', error)
            return res.status(500).json({
                error: true,
                message: 'Failed to get log detail',
                code: 'GET_LOG_DETAIL_FAILED'
            })
        }
    }

    // Get webhook statistics
    static async getWebhookStats(req, res) {
        try {
            const webhookId = parseInt(req.params.id)
            const userId = req.user.userId

            const webhook = await WebhookService.getWebhookById(webhookId)

            if (!webhook) {
                return res.status(404).json({
                    error: true,
                    message: 'Webhook not found',
                    code: 'WEBHOOK_NOT_FOUND'
                })
            }

            // Check ownership (unless admin)
            if (webhook.user_id !== userId && req.user.role !== 'admin') {
                return res.status(403).json({
                    error: true,
                    message: 'Access denied',
                    code: 'FORBIDDEN'
                })
            }

            const stats = await LogService.getWebhookStats(webhookId)

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

    // Test webhook (send test request)
    static async testWebhook(req, res) {
        try {
            const webhookId = parseInt(req.params.id)
            const userId = req.user.userId
            const { payload } = req.body

            const webhook = await WebhookService.getWebhookById(webhookId)

            if (!webhook) {
                return res.status(404).json({
                    error: true,
                    message: 'Webhook not found',
                    code: 'WEBHOOK_NOT_FOUND'
                })
            }

            // Check ownership (unless admin)
            if (webhook.user_id !== userId && req.user.role !== 'admin') {
                return res.status(403).json({
                    error: true,
                    message: 'Access denied',
                    code: 'FORBIDDEN'
                })
            }

            // Create a test log entry
            const log = await LogService.createLog(
                webhookId,
                payload || { test: true, message: 'Test webhook request' },
                req.ip || 'test',
                'success'
            )

            return res.status(200).json({
                success: true,
                message: 'Test webhook executed successfully',
                log: log.toJSON()
            })
        } catch (error) {
            console.error('Test webhook error:', error)
            return res.status(500).json({
                error: true,
                message: 'Failed to test webhook',
                code: 'TEST_WEBHOOK_FAILED'
            })
        }
    }

    // Regenerate webhook secret
    static async regenerateSecret(req, res) {
        try {
            const webhookId = parseInt(req.params.id)
            const userId = req.user.userId

            const webhook = await WebhookService.getWebhookById(webhookId)

            if (!webhook) {
                return res.status(404).json({
                    error: true,
                    message: 'Webhook not found',
                    code: 'WEBHOOK_NOT_FOUND'
                })
            }

            // Check ownership (unless admin)
            if (webhook.user_id !== userId && req.user.role !== 'admin') {
                return res.status(403).json({
                    error: true,
                    message: 'Access denied',
                    code: 'FORBIDDEN'
                })
            }

            const updatedWebhook = await WebhookService.regenerateSecret(webhookId)

            return res.status(200).json({
                success: true,
                message: 'Webhook secret regenerated successfully',
                webhook: updatedWebhook.toJSON()
            })
        } catch (error) {
            console.error('Regenerate secret error:', error)
            return res.status(500).json({
                error: true,
                message: 'Failed to regenerate secret',
                code: 'REGENERATE_SECRET_FAILED'
            })
        }
    }
}

export default WebhookController
