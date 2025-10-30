import companyPageService from '../services/companyPageService.js'

class CompanyPageController {
  // Get all company pages (admin only)
  async getAllPages(req, res) {
    try {
      const pages = await companyPageService.getAllPages()
      res.json({ pages })
    } catch (error) {
      console.error('Get all company pages error:', error)
      res.status(500).json({ error: 'Failed to fetch company pages' })
    }
  }

  // Get published company pages (public)
  async getPublishedPages(req, res) {
    try {
      const pages = await companyPageService.getPublishedPages()
      res.json({ pages })
    } catch (error) {
      console.error('Get published company pages error:', error)
      res.status(500).json({ error: 'Failed to fetch company pages' })
    }
  }

  // Get company page by ID (admin only)
  async getPageById(req, res) {
    try {
      const { id } = req.params
      const page = await companyPageService.getPageById(id)
      res.json({ page })
    } catch (error) {
      console.error('Get company page by ID error:', error)
      if (error.message === 'Company page not found') {
        return res.status(404).json({ error: error.message })
      }
      res.status(500).json({ error: 'Failed to fetch company page' })
    }
  }

  // Get company page by slug (public)
  async getPageBySlug(req, res) {
    try {
      const { slug } = req.params
      const page = await companyPageService.getPageBySlug(slug)
      res.json({ page })
    } catch (error) {
      console.error('Get company page by slug error:', error)
      if (error.message === 'Company page not found') {
        return res.status(404).json({ error: error.message })
      }
      res.status(500).json({ error: 'Failed to fetch company page' })
    }
  }

  // Create new company page (admin only)
  async createPage(req, res) {
    try {
      const pageData = req.body
      const page = await companyPageService.createPage(pageData)
      res.status(201).json({ page, message: 'Company page created successfully' })
    } catch (error) {
      console.error('Create company page error:', error)
      if (error.message.includes('required') || error.message.includes('already exists')) {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: 'Failed to create company page' })
    }
  }

  // Update company page (admin only)
  async updatePage(req, res) {
    try {
      const { id } = req.params
      const pageData = req.body
      const page = await companyPageService.updatePage(id, pageData)
      res.json({ page, message: 'Company page updated successfully' })
    } catch (error) {
      console.error('Update company page error:', error)
      if (error.message === 'Company page not found') {
        return res.status(404).json({ error: error.message })
      }
      if (error.message.includes('required') || error.message.includes('already exists')) {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: 'Failed to update company page' })
    }
  }

  // Delete company page (admin only)
  async deletePage(req, res) {
    try {
      const { id } = req.params
      const result = await companyPageService.deletePage(id)
      res.json(result)
    } catch (error) {
      console.error('Delete company page error:', error)
      if (error.message === 'Company page not found') {
        return res.status(404).json({ error: error.message })
      }
      res.status(500).json({ error: 'Failed to delete company page' })
    }
  }
}

export default new CompanyPageController()
