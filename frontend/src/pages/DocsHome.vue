<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950">
    <!-- Documentation Header -->
    <div
      class="border-b border-neutral-200 dark:border-neutral-800/50 bg-white/90 dark:bg-neutral-950/80 sticky top-0 z-50 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div class="flex items-center gap-3 sm:gap-6">
          <router-link to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <!-- Custom Logo from Settings -->
            <div v-if="currentLogo && currentLogo.trim()"
              class="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center overflow-hidden">
              <img :src="getImageUrl(currentLogo)" :alt="siteSettings.site_title || 'Logo'"
                class="w-full h-full object-contain" />
            </div>
            <!-- Default Zap Icon -->
            <Zap v-else class="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600 dark:text-neutral-400" />
            <span class="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-50">{{
              siteSettings.site_title || 'AstraHook' }}</span>
          </router-link>
          <div class="hidden sm:block h-6 w-px bg-neutral-300 dark:bg-neutral-700"></div>
          <div class="hidden sm:flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
              <BookOpen class="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            </div>
            <div>
              <h1 class="text-base font-semibold text-neutral-900 dark:text-neutral-50">{{ t('docs.title') }}</h1>
              <p class="text-xs text-neutral-600 dark:text-neutral-400">{{ t('docs.subtitle') }}</p>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <!-- Language Selector -->
          <div class="relative language-dropdown">
            <button @click="langMenuOpen = !langMenuOpen"
              class="inline-flex shrink-0 justify-center items-center gap-x-1 px-3 py-1.5 text-xs font-medium rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all">
              <span class="text-xs">{{ localeStore.currentLocale === 'tr' ? 'Türkçe' : 'English' }}</span>
              <svg class="shrink-0 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div v-if="langMenuOpen"
              class="absolute top-full right-0 mt-2 w-24 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-lg py-1 z-50">
              <button @click="localeStore.setLocale('tr'); langMenuOpen = false"
                :class="localeStore.currentLocale === 'tr' ? 'bg-neutral-50 dark:bg-neutral-700' : ''"
                class="w-full text-left px-3 py-2 text-xs text-neutral-700 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                🇹🇷 TR
              </button>
              <button @click="localeStore.setLocale('en'); langMenuOpen = false"
                :class="localeStore.currentLocale === 'en' ? 'bg-neutral-50 dark:bg-neutral-700' : ''"
                class="w-full text-left px-3 py-2 text-xs text-neutral-500 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                🇺🇸 EN
              </button>
            </div>
          </div>

          <button @click="toggleTheme"
            class="px-3 py-1.5 text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 transition-all">
            <Sun v-if="isDark" class="w-4 h-4" />
            <Moon v-else class="w-4 h-4" />
          </button>
          <UserProfileDropdown v-if="authStore.isAuthenticated()" class="hidden sm:block" />
        </div>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <!-- Grid Pattern Background -->
      <div class="absolute inset-0 docs-grid"></div>

      <!-- Gradient Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-neutral-50/90 via-neutral-50/95 to-neutral-50 dark:from-neutral-950/90 dark:via-neutral-950/95 dark:to-neutral-950">
      </div>

      <!-- Decorative Blurs -->
      <div class="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 left-20 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl">
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32 relative">
        <div class="text-center mb-16">
          <!-- Main Title -->
          <div class="mb-8">
            <div
              class="inline-flex items-center gap-3 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full mb-6">
              <BookOpen class="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
              <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">{{ t('docs.title') }}</span>
            </div>

            <h1 class="text-5xl sm:text-7xl font-bold mb-6 tracking-tight">
              <span class="text-neutral-900 dark:text-white">Learn</span>
              <span class="text-blue-600 dark:text-blue-400"> AstraHook</span>
            </h1>
          </div>

          <!-- Subtitle -->
          <p class="text-xl sm:text-2xl text-neutral-600 dark:text-neutral-400 max-w-4xl mx-auto leading-relaxed mb-10">
            {{ t('docs.description') }}
          </p>

          <!-- Quick Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/docs/introduction"
              class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105">
              <Rocket class="w-5 h-5" />
              {{ t('docs.cta.getStarted') }}
            </router-link>
            <router-link to="/docs/file-uploads"
              class="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 text-neutral-900 dark:text-white font-semibold rounded-xl transition-all">
              <Code class="w-5 h-5" />
              {{ t('docs.viewExamples') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Documentation Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(category, index) in categories" :key="category.id"
          class="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 transform hover:-translate-y-1"
          :style="{ animationDelay: `${index * 100}ms` }">
          <!-- Category Header -->
          <div class="flex items-center gap-4 mb-6">
            <div
              class="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              :class="getCategoryColors(category.slug).bg">
              <component :is="getCategoryIcon(category.slug)" class="w-7 h-7 transition-all duration-300"
                :class="getCategoryColors(category.slug).icon" />
            </div>
            <div>
              <h2
                class="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {{ category.title }}
              </h2>
              <p class="text-sm text-neutral-500 dark:text-neutral-400">
                {{ pagesByCategory[category.id]?.length || 0 }} guides
              </p>
            </div>
          </div>

          <!-- Pages List -->
          <div class="space-y-3">
            <div v-for="page in pagesByCategory[category.id]?.slice(0, 4)" :key="page.id">
              <router-link :to="`/docs/${page.slug}`"
                class="block p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all duration-200 group/item border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex-1 min-w-0">
                    <h3
                      class="font-semibold text-neutral-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors truncate">
                      {{ page.title }}
                    </h3>
                    <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                      {{ getPageDescription(page.content) }}
                    </p>
                  </div>
                  <ArrowRight
                    class="w-4 h-4 text-neutral-400 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-all duration-200 transform group-hover/item:translate-x-1 flex-shrink-0 mt-1" />
                </div>
              </router-link>
            </div>

            <!-- Show more link if there are more pages -->
            <div v-if="pagesByCategory[category.id]?.length > 4" class="pt-2">
              <div class="text-sm text-neutral-500 dark:text-neutral-400 text-center">
                +{{ pagesByCategory[category.id].length - 4 }} more guides
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Start Section -->
      <div class="mt-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-neutral-900 dark:text-white mb-4">{{ t('docs.getStartedMinutes') }}</h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-400">Follow these simple steps to start using AstraHook
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="group">
            <div
              class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
              <div
                class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap class="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-3">Create Webhook</h3>
              <p class="text-neutral-600 dark:text-neutral-400 mb-4">Generate your first webhook endpoint in seconds
                with our intuitive dashboard</p>
              <router-link to="/docs/creating-webhook"
                class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                Learn more
                <ArrowRight class="w-4 h-4" />
              </router-link>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="group">
            <div
              class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
              <div
                class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload class="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-3">Send Data</h3>
              <p class="text-neutral-600 dark:text-neutral-400 mb-4">Upload images, videos, and JSON data to your
                webhook endpoints</p>
              <router-link to="/docs/file-uploads"
                class="inline-flex items-center gap-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium">
                Learn more
                <ArrowRight class="w-4 h-4" />
              </router-link>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="group">
            <div
              class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
              <div
                class="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Eye class="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-3">Monitor & Analyze</h3>
              <p class="text-neutral-600 dark:text-neutral-400 mb-4">View detailed logs, analytics, and debug your
                webhook integrations</p>
              <router-link to="/docs/monitoring"
                class="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium">
                Learn more
                <ArrowRight class="w-4 h-4" />
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="mt-20 text-center">
        <div class="bg-neutral-900 dark:bg-neutral-800 rounded-3xl p-12">
          <h2 class="text-3xl font-bold text-white mb-4">{{ t('docs.cta.title') }}</h2>
          <p class="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            {{ t('docs.cta.description') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/register"
              class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
              {{ t('docs.startFreeTrial') }}
            </router-link>
            <router-link to="/docs/introduction"
              class="px-8 py-4 bg-transparent border-2 border-neutral-600 hover:border-neutral-500 text-white font-semibold rounded-xl transition-colors">
              {{ t('docs.cta.readDocs') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { BookOpen, Sun, Moon, Zap, ArrowRight, Upload, Eye, Rocket, Shield, Code } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import { useAuthStore } from '@/stores/auth'
import { useLocaleStore } from '@/stores/locale'
import UserProfileDropdown from '@/components/common/UserProfileDropdown.vue'
import api from '@/utils/api'

const authStore = useAuthStore()
const localeStore = useLocaleStore()
const { isDark, toggleTheme } = useTheme()
const t = localeStore.t

const categories = ref([])
const pages = ref([])
const loading = ref(true)
const langMenuOpen = ref(false)

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

// Fetch site settings
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

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (langMenuOpen.value && !event.target.closest('.language-dropdown')) {
    langMenuOpen.value = false
  }
}

onMounted(() => {
  fetchSiteSettings()
  fetchDocs()
  document.addEventListener('click', handleClickOutside)
})

// Cleanup
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Fetch categories and pages
const fetchDocs = async () => {
  try {
    loading.value = true
    const [categoriesRes, pagesRes] = await Promise.all([
      api.get('/api/docs/categories'),
      api.get('/api/docs/pages')
    ])

    categories.value = categoriesRes.data.categories.filter(c => c.is_published)
    pages.value = pagesRes.data.pages.filter(p => p.is_published)
  } catch (error) {
    console.error('Failed to fetch docs:', error)
  } finally {
    loading.value = false
  }
}

// Group pages by category
const pagesByCategory = computed(() => {
  const grouped = {}
  categories.value.forEach(cat => {
    grouped[cat.id] = pages.value.filter(p => p.category_id === cat.id)
  })
  return grouped
})

// Get category icon based on slug
const getCategoryIcon = (slug) => {
  const icons = {
    'getting-started': Rocket,
    'api-reference': Code,
    'examples': Eye,
    'advanced': Shield
  }
  return icons[slug] || BookOpen
}

// Get category colors based on slug
const getCategoryColors = (slug) => {
  const colors = {
    'getting-started': {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      icon: 'text-blue-600 dark:text-blue-400'
    },
    'api-reference': {
      bg: 'bg-green-100 dark:bg-green-900/30',
      icon: 'text-green-600 dark:text-green-400'
    },
    'examples': {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      icon: 'text-purple-600 dark:text-purple-400'
    },
    'advanced': {
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      icon: 'text-orange-600 dark:text-orange-400'
    }
  }
  return colors[slug] || {
    bg: 'bg-neutral-100 dark:bg-neutral-800',
    icon: 'text-neutral-600 dark:text-neutral-400'
  }
}

// Get page description from content
const getPageDescription = (content) => {
  // Extract first paragraph or first 100 characters
  const text = content.replace(/[#*`]/g, '').trim()
  const firstLine = text.split('\n')[0]
  return firstLine.length > 100 ? firstLine.substring(0, 100) + '...' : firstLine
}

onMounted(() => {
  fetchDocs()
})
</script>

<style scoped>
/* Grid Pattern Background */
.docs-grid {
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
}

:global(.dark) .docs-grid {
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
}

/* Fade In Up Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Hover effects */
.group:hover .transform {
  transform: scale(1.05);
}
</style>