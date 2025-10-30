import pool from '../config/database.js'
import DocCategory from '../models/DocCategory.js'
import DocPage from '../models/DocPage.js'

class DocsService {
  // Get all categories with hierarchy
  static async getAllCategories() {
    try {
      const result = await pool.query(
        'SELECT * FROM doc_categories ORDER BY sort_order ASC, id ASC'
      )
      
      return result.rows.map(row => new DocCategory(row))
    } catch (error) {
      throw error
    }
  }

  // Get category by ID
  static async getCategoryById(id) {
    try {
      const result = await pool.query(
        'SELECT * FROM doc_categories WHERE id = $1',
        [id]
      )
      
      if (result.rows.length === 0) return null
      return new DocCategory(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  // Create category
  static async createCategory(data) {
    try {
      const result = await pool.query(
        'INSERT INTO doc_categories (title, slug, parent_id, sort_order, is_published) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [data.title, data.slug, data.parent_id || null, data.sort_order || 0, data.is_published !== false]
      )
      
      return new DocCategory(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  // Update category
  static async updateCategory(id, data) {
    try {
      const result = await pool.query(
        'UPDATE doc_categories SET title = $1, slug = $2, parent_id = $3, sort_order = $4, is_published = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
        [data.title, data.slug, data.parent_id || null, data.sort_order, data.is_published, id]
      )
      
      if (result.rows.length === 0) return null
      return new DocCategory(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  // Delete category
  static async deleteCategory(id) {
    try {
      const result = await pool.query(
        'DELETE FROM doc_categories WHERE id = $1 RETURNING *',
        [id]
      )
      
      if (result.rows.length === 0) return null
      return new DocCategory(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  // Reorder categories
  static async reorderCategories(orders) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      
      for (const order of orders) {
        await client.query(
          'UPDATE doc_categories SET sort_order = $1, parent_id = $2 WHERE id = $3',
          [order.sort_order, order.parent_id || null, order.id]
        )
      }
      
      await client.query('COMMIT')
      return true
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  }

  // Get all pages
  static async getAllPages() {
    try {
      const result = await pool.query(
        'SELECT * FROM doc_pages ORDER BY category_id ASC, sort_order ASC, id ASC'
      )
      
      return result.rows.map(row => new DocPage(row))
    } catch (error) {
      throw error
    }
  }

  // Get pages by category
  static async getPagesByCategory(categoryId) {
    try {
      const result = await pool.query(
        'SELECT * FROM doc_pages WHERE category_id = $1 ORDER BY sort_order ASC, id ASC',
        [categoryId]
      )
      
      return result.rows.map(row => new DocPage(row))
    } catch (error) {
      throw error
    }
  }

  // Get page by ID
  static async getPageById(id) {
    try {
      const result = await pool.query(
        'SELECT * FROM doc_pages WHERE id = $1',
        [id]
      )
      
      if (result.rows.length === 0) return null
      return new DocPage(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  // Get page by slug
  static async getPageBySlug(slug) {
    try {
      const result = await pool.query(
        'SELECT * FROM doc_pages WHERE slug = $1 AND is_published = true',
        [slug]
      )
      
      if (result.rows.length === 0) return null
      return new DocPage(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  // Create page
  static async createPage(data) {
    try {
      const result = await pool.query(
        'INSERT INTO doc_pages (category_id, title, slug, content, sort_order, is_published) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [data.category_id, data.title, data.slug, data.content, data.sort_order || 0, data.is_published !== false]
      )
      
      return new DocPage(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  // Update page
  static async updatePage(id, data) {
    try {
      const result = await pool.query(
        'UPDATE doc_pages SET category_id = $1, title = $2, slug = $3, content = $4, sort_order = $5, is_published = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
        [data.category_id, data.title, data.slug, data.content, data.sort_order, data.is_published, id]
      )
      
      if (result.rows.length === 0) return null
      return new DocPage(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  // Delete page
  static async deletePage(id) {
    try {
      const result = await pool.query(
        'DELETE FROM doc_pages WHERE id = $1 RETURNING *',
        [id]
      )
      
      if (result.rows.length === 0) return null
      return new DocPage(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  // Reorder pages
  static async reorderPages(orders) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      
      for (const order of orders) {
        await client.query(
          'UPDATE doc_pages SET sort_order = $1, category_id = $2 WHERE id = $3',
          [order.sort_order, order.category_id, order.id]
        )
      }
      
      await client.query('COMMIT')
      return true
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  }
}

export default DocsService
