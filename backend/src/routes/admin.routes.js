import express from 'express'
import AdminController from '../controllers/adminController.js'
import { authenticateToken, requireAdmin } from '../middleware/auth.js'
import { requirePermission } from '../middleware/permissions.js'

const router = express.Router()

// All admin routes require authentication and admin role
router.use(authenticateToken)
router.use(requireAdmin)

// Dashboard overview
router.get('/dashboard', AdminController.getDashboard)
router.get('/stats', AdminController.getStats)
router.get('/activity', AdminController.getActivity)

// User management
router.get('/users', requirePermission('users.read'), AdminController.getUsers)
router.put('/users/:id/role', requirePermission('users.write'), AdminController.updateUserRole)
router.delete('/users/:id', requirePermission('users.delete'), AdminController.deleteUser)

// Webhook management
router.get('/webhooks/stats', requirePermission('webhooks.control'), AdminController.getWebhookStats)
router.get('/webhooks', requirePermission('webhooks.control'), AdminController.getWebhooks)
router.delete('/webhooks/:id', requirePermission('webhooks.control'), AdminController.deleteWebhook)
router.delete('/webhooks/:id/logs', requirePermission('webhooks.control'), AdminController.clearWebhookLogs)

// Log management
router.get('/logs', requirePermission('logs.read.all'), AdminController.getLogs)

export default router
