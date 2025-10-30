import pool from '../config/database.js';

class SettingsService {
  // Get all settings
  static async getAllSettings() {
    try {
      const result = await pool.query(
        'SELECT * FROM site_settings ORDER BY category, setting_key'
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Get settings by category
  static async getSettingsByCategory(category) {
    try {
      const result = await pool.query(
        'SELECT * FROM site_settings WHERE category = $1 ORDER BY setting_key',
        [category]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Get single setting
  static async getSetting(key) {
    try {
      const result = await pool.query(
        'SELECT * FROM site_settings WHERE setting_key = $1',
        [key]
      );
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Update setting
  static async updateSetting(key, value) {
    try {
      const result = await pool.query(
        'UPDATE site_settings SET setting_value = $1, updated_at = CURRENT_TIMESTAMP WHERE setting_key = $2 RETURNING *',
        [value, key]
      );
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Update multiple settings
  static async updateMultipleSettings(settings) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const updatedSettings = [];
      for (const { key, value } of settings) {
        const result = await client.query(
          'UPDATE site_settings SET setting_value = $1, updated_at = CURRENT_TIMESTAMP WHERE setting_key = $2 RETURNING *',
          [value, key]
        );
        if (result.rows[0]) {
          updatedSettings.push(result.rows[0]);
        }
      }
      
      await client.query('COMMIT');
      return updatedSettings;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Get public settings (for frontend)
  static async getPublicSettings() {
    try {
      const result = await pool.query(
        `SELECT setting_key, setting_value, setting_type 
         FROM site_settings 
         WHERE category IN ('general', 'landing', 'seo', 'branding')
         ORDER BY category, setting_key`
      );
      
      // Convert to key-value object
      const settings = {};
      result.rows.forEach(row => {
        settings[row.setting_key] = row.setting_value;
      });
      
      return settings;
    } catch (error) {
      throw error;
    }
  }
}

export default SettingsService;
