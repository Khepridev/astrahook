import express from 'express'
import AuthController from '../controllers/authController.js'
import { authenticateToken } from '../middleware/auth.js'
import upload from '../config/upload.js'

const router = express.Router()

// Public routes
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

// Protected routes
router.get('/me', authenticateToken, AuthController.me)
router.put('/profile', authenticateToken, AuthController.updateProfile)
router.post('/upload-avatar', authenticateToken, upload.single('avatar'), AuthController.uploadAvatar)
router.post('/change-password', authenticateToken, AuthController.changePassword)

export default router
