import CompanyPage from '../models/CompanyPage.js'

class CompanyPageService {
  // Get all company pages (admin)
  async getAllPages() {
    return await CompanyPage.getAll()
  }

  // Get published company pages (public)
  async getPublishedPages() {
    return await CompanyPage.getPublished()
  }

  // Get company page by ID
  async getPageById(id) {
    const page = await CompanyPage.getById(id)
    if (!page) {
      throw new Error('Company page not found')
    }
    return page
  }

  // Get company page by slug (public)
  async getPageBySlug(slug) {
    const page = await CompanyPage.getBySlug(slug)
    if (!page) {
      throw new Error('Company page not found')
    }
    return page
  }

  // Create new company page
  async createPage(pageData) {
    // Validate required fields
    if (!pageData.slug || !pageData.title || !pageData.content) {
      throw new Error('Slug, title, and content are required')
    }

    // Check if slug already exists
    const slugExists = await CompanyPage.slugExists(pageData.slug)
    if (slugExists) {
      throw new Error('A page with this slug already exists')
    }

    // Generate slug from title if not provided
    if (!pageData.slug) {
      pageData.slug = this.generateSlug(pageData.title)
    }

    return await CompanyPage.create(pageData)
  }

  // Update company page
  async updatePage(id, pageData) {
    // Check if page exists
    await this.getPageById(id)

    // Validate required fields
    if (!pageData.slug || !pageData.title || !pageData.content) {
      throw new Error('Slug, title, and content are required')
    }

    // Check if slug already exists (excluding current page)
    const slugExists = await CompanyPage.slugExists(pageData.slug, id)
    if (slugExists) {
      throw new Error('A page with this slug already exists')
    }

    return await CompanyPage.update(id, pageData)
  }

  // Delete company page
  async deletePage(id) {
    // Check if page exists
    await this.getPageById(id)

    const deleted = await CompanyPage.delete(id)
    if (!deleted) {
      throw new Error('Failed to delete company page')
    }

    return { message: 'Company page deleted successfully' }
  }

  // Generate slug from title
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
}

export default new CompanyPageService()
