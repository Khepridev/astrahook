import db from '../config/database.js'

class CompanyPage {
  // Get all company pages
  static async getAll() {
    const result = await db.query(
      'SELECT * FROM company_pages ORDER BY display_order ASC, created_at DESC'
    )
    return result.rows
  }

  // Get published company pages
  static async getPublished() {
    const result = await db.query(
      'SELECT * FROM company_pages WHERE is_published = true ORDER BY display_order ASC'
    )
    return result.rows
  }

  // Get company page by ID
  static async getById(id) {
    const result = await db.query(
      'SELECT * FROM company_pages WHERE id = $1',
      [id]
    )
    return result.rows[0]
  }

  // Get company page by slug
  static async getBySlug(slug) {
    const result = await db.query(
      'SELECT * FROM company_pages WHERE slug = $1 AND is_published = true',
      [slug]
    )
    return result.rows[0]
  }

  // Create new company page
  static async create(pageData) {
    const { slug, title, content, meta_description, is_published, display_order } = pageData
    
    const result = await db.query(
      `INSERT INTO company_pages (slug, title, content, meta_description, is_published, display_order)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [slug, title, content, meta_description || null, is_published !== false, display_order || 0]
    )
    
    return this.getById(result.rows[0].id)
  }

  // Update company page
  static async update(id, pageData) {
    const { slug, title, content, meta_description, is_published, display_order } = pageData
    
    await db.query(
      `UPDATE company_pages 
       SET slug = $1, title = $2, content = $3, meta_description = $4, 
           is_published = $5, display_order = $6
       WHERE id = $7`,
      [slug, title, content, meta_description, is_published, display_order, id]
    )
    
    return this.getById(id)
  }

  // Delete company page
  static async delete(id) {
    const result = await db.query(
      'DELETE FROM company_pages WHERE id = $1',
      [id]
    )
    return result.rowCount > 0
  }

  // Check if slug exists
  static async slugExists(slug, excludeId = null) {
    let query = 'SELECT COUNT(*) as count FROM company_pages WHERE slug = $1'
    const params = [slug]
    
    if (excludeId) {
      query += ' AND id != $2'
      params.push(excludeId)
    }
    
    const result = await db.query(query, params)
    return parseInt(result.rows[0].count) > 0
  }
}

export default CompanyPage
