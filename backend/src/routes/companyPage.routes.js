import express from 'express'
import companyPageController from '../controllers/companyPageController.js'
import { authenticateToken, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.get('/published', companyPageController.getPublishedPages.bind(companyPageController))
router.get('/slug/:slug', companyPageController.getPageBySlug.bind(companyPageController))

// Admin routes
router.get('/', authenticateToken, requireAdmin, companyPageController.getAllPages.bind(companyPageController))
router.get('/:id', authenticateToken, requireAdmin, companyPageController.getPageById.bind(companyPageController))
router.post('/', authenticateToken, requireAdmin, companyPageController.createPage.bind(companyPageController))
router.put('/:id', authenticateToken, requireAdmin, companyPageController.updatePage.bind(companyPageController))
router.delete('/:id', authenticateToken, requireAdmin, companyPageController.deletePage.bind(companyPageController))

export default router
