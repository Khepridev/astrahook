import { watch, onMounted } from 'vue'
import api from '@/utils/api'

export function useFavicon() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3080'

  const updateFavicon = (faviconPath) => {
    if (!faviconPath) return

    // Remove existing favicon links
    const existingLinks = document.querySelectorAll("link[rel*='icon']")
    existingLinks.forEach(link => link.remove())

    // Create new favicon link
    const link = document.createElement('link')
    link.rel = 'icon'
    
    // Determine the type based on file extension
    const extension = faviconPath.split('.').pop().toLowerCase()
    if (extension === 'svg') {
      link.type = 'image/svg+xml'
    } else if (extension === 'png') {
      link.type = 'image/png'
    } else if (extension === 'ico') {
      link.type = 'image/x-icon'
    }

    // Set the href
    link.href = faviconPath.startsWith('http') ? faviconPath : `${API_URL}${faviconPath}`
    
    // Add to document head
    document.head.appendChild(link)
  }

  const updateTitle = (title) => {
    if (title) {
      document.title = title
    }
  }

  const loadSiteSettings = async () => {
    try {
      const response = await api.get('/api/settings/public')
      
      if (response.data && response.data.settings) {
        const { site_favicon, site_title } = response.data.settings
        
        if (site_favicon) {
          updateFavicon(site_favicon)
        }
        
        if (site_title) {
          updateTitle(site_title)
        }
      }
    } catch (error) {
      console.error('Failed to load site settings for favicon:', error)
    }
  }

  onMounted(() => {
    loadSiteSettings()
  })

  return {
    updateFavicon,
    updateTitle,
    loadSiteSettings
  }
}
