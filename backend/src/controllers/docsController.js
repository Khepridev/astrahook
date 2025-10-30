import DocsService from '../services/docsService.js'

class DocsController {
  // Get all categories
  static async getCategories(req, res) {
    try {
      const categories = await DocsService.getAllCategories()
      
      return res.status(200).json({
        success: true,
        categories: categories.map(c => c.toJSON())
      })
    } catch (error) {
      console.error('Get categories error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to get categories',
        code: 'GET_CATEGORIES_FAILED'
      })
    }
  }

  // Create category
  static async createCategory(req, res) {
    try {
      const { title, slug, parent_id, sort_order, is_published } = req.body
      
      if (!title || !slug) {
        return res.status(400).json({
          error: true,
          message: 'Title and slug are required',
          code: 'MISSING_FIELDS'
        })
      }
      
      const category = await DocsService.createCategory({
        title,
        slug,
        parent_id,
        sort_order,
        is_published
      })
      
      return res.status(201).json({
        success: true,
        category: category.toJSON()
      })
    } catch (error) {
      console.error('Create category error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to create category',
        code: 'CREATE_CATEGORY_FAILED'
      })
    }
  }

  // Update category
  static async updateCategory(req, res) {
    try {
      const { id } = req.params
      const { title, slug, parent_id, sort_order, is_published } = req.body
      
      const category = await DocsService.updateCategory(id, {
        title,
        slug,
        parent_id,
        sort_order,
        is_published
      })
      
      if (!category) {
        return res.status(404).json({
          error: true,
          message: 'Category not found',
          code: 'CATEGORY_NOT_FOUND'
        })
      }
      
      return res.status(200).json({
        success: true,
        category: category.toJSON()
      })
    } catch (error) {
      console.error('Update category error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to update category',
        code: 'UPDATE_CATEGORY_FAILED'
      })
    }
  }

  // Delete category
  static async deleteCategory(req, res) {
    try {
      const { id } = req.params
      
      const category = await DocsService.deleteCategory(id)
      
      if (!category) {
        return res.status(404).json({
          error: true,
          message: 'Category not found',
          code: 'CATEGORY_NOT_FOUND'
        })
      }
      
      return res.status(200).json({
        success: true,
        message: 'Category deleted successfully'
      })
    } catch (error) {
      console.error('Delete category error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to delete category',
        code: 'DELETE_CATEGORY_FAILED'
      })
    }
  }

  // Reorder categories
  static async reorderCategories(req, res) {
    try {
      const { orders } = req.body
      
      if (!orders || !Array.isArray(orders)) {
        return res.status(400).json({
          error: true,
          message: 'Orders array is required',
          code: 'MISSING_ORDERS'
        })
      }
      
      await DocsService.reorderCategories(orders)
      
      return res.status(200).json({
        success: true,
        message: 'Categories reordered successfully'
      })
    } catch (error) {
      console.error('Reorder categories error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to reorder categories',
        code: 'REORDER_CATEGORIES_FAILED'
      })
    }
  }

  // Get all pages
  static async getPages(req, res) {
    try {
      const { category_id } = req.query
      
      const pages = category_id 
        ? await DocsService.getPagesByCategory(category_id)
        : await DocsService.getAllPages()
      
      return res.status(200).json({
        success: true,
        pages: pages.map(p => p.toJSON())
      })
    } catch (error) {
      console.error('Get pages error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to get pages',
        code: 'GET_PAGES_FAILED'
      })
    }
  }

  // Get page by ID
  static async getPage(req, res) {
    try {
      const { id } = req.params
      
      const page = await DocsService.getPageById(id)
      
      if (!page) {
        return res.status(404).json({
          error: true,
          message: 'Page not found',
          code: 'PAGE_NOT_FOUND'
        })
      }
      
      return res.status(200).json({
        success: true,
        page: page.toJSON()
      })
    } catch (error) {
      console.error('Get page error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to get page',
        code: 'GET_PAGE_FAILED'
      })
    }
  }

  // Get page by slug
  static async getPageBySlug(req, res) {
    try {
      const { slug } = req.params
      
      const page = await DocsService.getPageBySlug(slug)
      
      if (!page) {
        return res.status(404).json({
          error: true,
          message: 'Page not found',
          code: 'PAGE_NOT_FOUND'
        })
      }
      
      return res.status(200).json({
        success: true,
        page: page.toJSON()
      })
    } catch (error) {
      console.error('Get page by slug error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to get page',
        code: 'GET_PAGE_FAILED'
      })
    }
  }

  // Create page
  static async createPage(req, res) {
    try {
      const { category_id, title, slug, content, sort_order, is_published } = req.body
      
      if (!category_id || !title || !slug || !content) {
        return res.status(400).json({
          error: true,
          message: 'Category ID, title, slug, and content are required',
          code: 'MISSING_FIELDS'
        })
      }
      
      const page = await DocsService.createPage({
        category_id,
        title,
        slug,
        content,
        sort_order,
        is_published
      })
      
      return res.status(201).json({
        success: true,
        page: page.toJSON()
      })
    } catch (error) {
      console.error('Create page error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to create page',
        code: 'CREATE_PAGE_FAILED'
      })
    }
  }

  // Update page
  static async updatePage(req, res) {
    try {
      const { id } = req.params
      const { category_id, title, slug, content, sort_order, is_published } = req.body
      
      const page = await DocsService.updatePage(id, {
        category_id,
        title,
        slug,
        content,
        sort_order,
        is_published
      })
      
      if (!page) {
        return res.status(404).json({
          error: true,
          message: 'Page not found',
          code: 'PAGE_NOT_FOUND'
        })
      }
      
      return res.status(200).json({
        success: true,
        page: page.toJSON()
      })
    } catch (error) {
      console.error('Update page error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to update page',
        code: 'UPDATE_PAGE_FAILED'
      })
    }
  }

  // Delete page
  static async deletePage(req, res) {
    try {
      const { id } = req.params
      
      const page = await DocsService.deletePage(id)
      
      if (!page) {
        return res.status(404).json({
          error: true,
          message: 'Page not found',
          code: 'PAGE_NOT_FOUND'
        })
      }
      
      return res.status(200).json({
        success: true,
        message: 'Page deleted successfully'
      })
    } catch (error) {
      console.error('Delete page error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to delete page',
        code: 'DELETE_PAGE_FAILED'
      })
    }
  }

  // Reorder pages
  static async reorderPages(req, res) {
    try {
      const { orders } = req.body
      
      if (!orders || !Array.isArray(orders)) {
        return res.status(400).json({
          error: true,
          message: 'Orders array is required',
          code: 'MISSING_ORDERS'
        })
      }
      
      await DocsService.reorderPages(orders)
      
      return res.status(200).json({
        success: true,
        message: 'Pages reordered successfully'
      })
    } catch (error) {
      console.error('Reorder pages error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to reorder pages',
        code: 'REORDER_PAGES_FAILED'
      })
    }
  }
}

export default DocsController
