import express from 'express';
import SettingsController from '../controllers/settingsController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import settingsUpload from '../config/settingsUpload.js';

const router = express.Router();

// Public route
router.get('/public', SettingsController.getPublicSettings);

// Admin routes
router.get('/', authenticateToken, requireAdmin, SettingsController.getAllSettings);
router.get('/category/:category', authenticateToken, requireAdmin, SettingsController.getSettingsByCategory);
router.put('/:key', authenticateToken, requireAdmin, SettingsController.updateSetting);
router.put('/', authenticateToken, requireAdmin, SettingsController.updateMultipleSettings);

// Upload routes (admin only)
router.post('/upload-logo', authenticateToken, requireAdmin, settingsUpload.single('logo'), SettingsController.uploadLogo);
router.post('/upload-favicon', authenticateToken, requireAdmin, settingsUpload.single('favicon'), SettingsController.uploadFavicon);
router.post('/upload-og-image', authenticateToken, requireAdmin, settingsUpload.single('og_image'), SettingsController.uploadOgImage);

export default router;
