import express from 'express'
import WebhookController from '../controllers/webhookController.js'
import { authenticateToken } from '../middleware/auth.js'
import { requirePermission } from '../middleware/permissions.js'

const router = express.Router()

// All webhook routes require authentication
router.use(authenticateToken)

// Get all webhooks for current user
router.get('/', requirePermission('webhooks.own.read'), WebhookController.getWebhooks)

// Create new webhook
router.post('/', requirePermission('webhooks.own.write'), WebhookController.createWebhook)

// Get webhook by ID
router.get('/:id', requirePermission('webhooks.own.read'), WebhookController.getWebhookById)

// Delete webhook
router.delete('/:id', requirePermission('webhooks.own.delete'), WebhookController.deleteWebhook)

// Get webhook logs
router.get('/:id/logs', requirePermission('webhooks.own.read'), WebhookController.getWebhookLogs)

// Get single log detail
router.get('/:id/logs/:logId', requirePermission('webhooks.own.read'), WebhookController.getLogDetail)

// Get webhook statistics
router.get('/:id/stats', requirePermission('webhooks.own.read'), WebhookController.getWebhookStats)

// Test webhook
router.post('/:id/test', requirePermission('webhooks.own.write'), WebhookController.testWebhook)

// Regenerate webhook secret
router.post('/:id/regenerate-secret', requirePermission('webhooks.own.write'), WebhookController.regenerateSecret)

export default router
