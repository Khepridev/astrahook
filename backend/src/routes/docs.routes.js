import express from 'express'
import DocsController from '../controllers/docsController.js'
import { authenticateToken, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// Public routes - for viewing docs
router.get('/categories', DocsController.getCategories)
router.get('/pages', DocsController.getPages)
router.get('/pages/:id', DocsController.getPage)
router.get('/slug/:slug', DocsController.getPageBySlug)

// Admin routes - for managing docs
router.post('/categories', authenticateToken, requireAdmin, DocsController.createCategory)
router.put('/categories/:id', authenticateToken, requireAdmin, DocsController.updateCategory)
router.delete('/categories/:id', authenticateToken, requireAdmin, DocsController.deleteCategory)
router.post('/categories/reorder', authenticateToken, requireAdmin, DocsController.reorderCategories)

router.post('/pages', authenticateToken, requireAdmin, DocsController.createPage)
router.put('/pages/:id', authenticateToken, requireAdmin, DocsController.updatePage)
router.delete('/pages/:id', authenticateToken, requireAdmin, DocsController.deletePage)
router.post('/pages/reorder', authenticateToken, requireAdmin, DocsController.reorderPages)

export default router
