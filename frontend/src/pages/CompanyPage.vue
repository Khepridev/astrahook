<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950">
    <!-- Header -->
    <div
      class="border-b border-neutral-200 dark:border-neutral-800/50 bg-white/90 dark:bg-neutral-950/80 sticky top-0 z-50 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <!-- Custom Logo from Settings -->
          <div v-if="currentLogo && currentLogo.trim()"
            class="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center overflow-hidden">
            <img :src="getImageUrl(currentLogo)" :alt="siteSettings.site_title || 'Logo'"
              class="w-full h-full object-contain" />
          </div>
          <!-- Default Zap Icon -->
          <Zap v-else class="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600 dark:text-neutral-400" />
          <span class="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-50">{{ siteSettings.site_title
            || 'AstraHook' }}</span>
        </router-link>
        <div class="flex items-center gap-2">
          <button @click="toggleTheme"
            class="px-3 py-1.5 text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 transition-all">
            <Sun v-if="isDark" class="w-4 h-4" />
            <Moon v-else class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
      <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Page Not Found</h1>
      <p class="text-neutral-600 dark:text-neutral-400 mb-6">{{ error }}</p>
      <router-link to="/" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
        ← Back to Home
      </router-link>
    </div>

    <!-- Page Content -->
    <div v-else-if="page" class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <article class="prose prose-neutral dark:prose-invert max-w-none">
        <div v-html="renderedContent"></div>
      </article>

      <!-- Back to Home -->
      <div class="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <router-link to="/"
          class="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
          <ArrowLeft class="w-4 h-4" />
          Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Zap, Sun, Moon, ArrowLeft } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import MarkdownIt from 'markdown-it'
import api from '@/utils/api'

const route = useRoute()
const { isDark, toggleTheme } = useTheme()

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const page = ref(null)
const loading = ref(true)
const error = ref('')

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3080'

const siteSettings = ref({
  site_title: '',
  site_logo: null,
  site_logo_light: null,
  site_logo_dark: null
})

const currentLogo = computed(() => {
  if (isDark.value && siteSettings.value.site_logo_dark) {
    return siteSettings.value.site_logo_dark
  }
  if (!isDark.value && siteSettings.value.site_logo_light) {
    return siteSettings.value.site_logo_light
  }
  return siteSettings.value.site_logo
})

const getImageUrl = (path) => {
  if (!path) return ''
  return path.startsWith('http') ? path : `${API_URL}${path}`
}

const renderedContent = computed(() => {
  if (!page.value?.content) return ''
  return md.render(page.value.content)
})

const fetchSiteSettings = async () => {
  try {
    const response = await api.get('/api/settings/public')
    if (response.data && response.data.settings) {
      siteSettings.value.site_title = response.data.settings.site_title || ''
      siteSettings.value.site_logo = response.data.settings.site_logo || null
      siteSettings.value.site_logo_light = response.data.settings.site_logo_light || null
      siteSettings.value.site_logo_dark = response.data.settings.site_logo_dark || null
    }
  } catch (error) {
    console.error('Failed to load site settings:', error)
  }
}

const fetchPage = async () => {
  try {
    loading.value = true
    const response = await api.get(`/api/company-pages/slug/${route.params.slug}`)
    page.value = response.data.page

    // Update page title
    if (page.value) {
      const siteName = siteSettings.value.site_title || 'AstraHook'
      document.title = `${page.value.title} - ${siteName}`
    }
  } catch (err) {
    console.error('Failed to fetch page:', err)
    error.value = err.response?.status === 404 ? 'Page not found' : 'Failed to load page'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchSiteSettings()
  await fetchPage()
})
</script>

<style scoped>
.prose :deep(h1) {
  font-size: 2.5rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #171717;
}

.dark .prose :deep(h1) {
  color: #fafafa;
}

.prose :deep(h2) {
  font-size: 1.875rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #262626;
}

.dark .prose :deep(h2) {
  color: #e5e5e5;
}

.prose :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #404040;
}

.dark .prose :deep(h3) {
  color: #d4d4d4;
}

.prose :deep(p) {
  margin-bottom: 1rem;
  color: #525252;
  line-height: 1.75;
  font-size: 1.125rem;
}

.dark .prose :deep(p) {
  color: #a3a3a3;
}

.prose :deep(ul),
.prose :deep(ol) {
  margin-left: 2rem;
  margin-bottom: 1rem;
  color: #525252;
}

.dark .prose :deep(ul),
.dark .prose :deep(ol) {
  color: #a3a3a3;
}

.prose :deep(li) {
  margin-bottom: 0.5rem;
}

.prose :deep(a) {
  color: #2563eb;
  text-decoration: underline;
}

.dark .prose :deep(a) {
  color: #60a5fa;
}

.prose :deep(strong) {
  font-weight: 600;
  color: #171717;
}

.dark .prose :deep(strong) {
  color: #fafafa;
}

.prose :deep(hr) {
  margin: 2rem 0;
  border-color: #e5e5e5;
}

.dark .prose :deep(hr) {
  border-color: #404040;
}
</style>
