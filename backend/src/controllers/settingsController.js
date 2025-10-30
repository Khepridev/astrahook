import SettingsService from '../services/settingsService.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SettingsController {
  // Get all settings (admin only)
  static async getAllSettings(req, res) {
    try {
      const settings = await SettingsService.getAllSettings();
      
      return res.status(200).json({
        success: true,
        settings
      });
    } catch (error) {
      console.error('Get all settings error:', error);
      return res.status(500).json({
        error: true,
        message: 'Failed to get settings',
        code: 'GET_SETTINGS_FAILED'
      });
    }
  }

  // Get settings by category (admin only)
  static async getSettingsByCategory(req, res) {
    try {
      const { category } = req.params;
      const settings = await SettingsService.getSettingsByCategory(category);
      
      return res.status(200).json({
        success: true,
        settings
      });
    } catch (error) {
      console.error('Get settings by category error:', error);
      return res.status(500).json({
        error: true,
        message: 'Failed to get settings',
        code: 'GET_SETTINGS_FAILED'
      });
    }
  }

  // Update setting (admin only)
  static async updateSetting(req, res) {
    try {
      const { key } = req.params;
      const { value } = req.body;
      
      if (value === undefined) {
        return res.status(400).json({
          error: true,
          message: 'Value is required',
          code: 'MISSING_VALUE'
        });
      }
      
      const setting = await SettingsService.updateSetting(key, value);
      
      if (!setting) {
        return res.status(404).json({
          error: true,
          message: 'Setting not found',
          code: 'SETTING_NOT_FOUND'
        });
      }
      
      return res.status(200).json({
        success: true,
        setting
      });
    } catch (error) {
      console.error('Update setting error:', error);
      return res.status(500).json({
        error: true,
        message: 'Failed to update setting',
        code: 'UPDATE_SETTING_FAILED'
      });
    }
  }

  // Update multiple settings (admin only)
  static async updateMultipleSettings(req, res) {
    try {
      const { settings } = req.body;
      
      if (!settings || !Array.isArray(settings)) {
        return res.status(400).json({
          error: true,
          message: 'Settings array is required',
          code: 'MISSING_SETTINGS'
        });
      }
      
      const updatedSettings = await SettingsService.updateMultipleSettings(settings);
      
      return res.status(200).json({
        success: true,
        settings: updatedSettings
      });
    } catch (error) {
      console.error('Update multiple settings error:', error);
      return res.status(500).json({
        error: true,
        message: 'Failed to update settings',
        code: 'UPDATE_SETTINGS_FAILED'
      });
    }
  }

  // Get public settings (no auth required)
  static async getPublicSettings(req, res) {
    try {
      const settings = await SettingsService.getPublicSettings();
      
      return res.status(200).json({
        success: true,
        settings
      });
    } catch (error) {
      console.error('Get public settings error:', error);
      return res.status(500).json({
        error: true,
        message: 'Failed to get settings',
        code: 'GET_SETTINGS_FAILED'
      });
    }
  }

  // Upload logo (admin only)
  static async uploadLogo(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: true,
          message: 'No file uploaded',
          code: 'NO_FILE'
        });
      }

      const filePath = `/uploads/settings/${req.file.filename}`;
      
      return res.status(200).json({
        success: true,
        path: filePath,
        filename: req.file.filename
      });
    } catch (error) {
      console.error('Upload logo error:', error);
      return res.status(500).json({
        error: true,
        message: 'Failed to upload logo',
        code: 'UPLOAD_FAILED'
      });
    }
  }

  // Upload favicon (admin only)
  static async uploadFavicon(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: true,
          message: 'No file uploaded',
          code: 'NO_FILE'
        });
      }

      const filePath = `/uploads/settings/${req.file.filename}`;
      
      return res.status(200).json({
        success: true,
        path: filePath,
        filename: req.file.filename
      });
    } catch (error) {
      console.error('Upload favicon error:', error);
      return res.status(500).json({
        error: true,
        message: 'Failed to upload favicon',
        code: 'UPLOAD_FAILED'
      });
    }
  }

  // Upload OG image (admin only)
  static async uploadOgImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: true,
          message: 'No file uploaded',
          code: 'NO_FILE'
        });
      }

      const filePath = `/uploads/settings/${req.file.filename}`;
      
      return res.status(200).json({
        success: true,
        path: filePath,
        filename: req.file.filename
      });
    } catch (error) {
      console.error('Upload OG image error:', error);
      return res.status(500).json({
        error: true,
        message: 'Failed to upload OG image',
        code: 'UPLOAD_FAILED'
      });
    }
  }
}

export default SettingsController;
