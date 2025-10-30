<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950">
    <!-- Admin Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-40 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 flex flex-col transition-all duration-300 lg:translate-x-0 overflow-visible"
      :class="[
        sidebarCollapsed ? 'w-16' : 'w-64',
        { '-translate-x-full': !sidebarOpen }
      ]">

      <!-- Logo Section -->
      <div class="h-14 px-4 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
        <router-link to="/admin/dashboard" class="flex items-center hover:opacity-80 transition-opacity">
          <!-- Custom Logo from Settings -->
          <div v-if="currentLogo && currentLogo.trim()"
            class="w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            <img :src="getImageUrl(currentLogo)" :alt="siteSettings.site_title || 'Logo'"
              class="w-full h-full object-contain" />
          </div>
          <!-- Default Zap Icon -->
          <div v-else
            class="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-700/50 border border-neutral-200 dark:border-neutral-600/50 flex items-center justify-center hover:border-neutral-300 dark:hover:border-neutral-500 transition-colors flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="text-neutral-600 dark:text-neutral-300">
              <path
                d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z">
              </path>
            </svg>
          </div>
          <span v-if="!sidebarCollapsed" class="ml-2 text-base font-semibold text-neutral-900 dark:text-white">{{
            siteSettings.site_title || $t('admin.panel') }}</span>
        </router-link>

        <!-- View Site Button -->
        <a v-if="!sidebarCollapsed" href="/" target="_blank"
          class="px-3 py-1.5 text-xs font-medium border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
          :title="$t('common.viewSite')">
          {{ $t('common.viewSite') }}
        </a>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-visible scrollbar-hide">
        <div v-for="item in menuItems" :key="item.path" class="relative group">
          <router-link :to="item.path" :ref="el => { if (el) menuRefs[item.path] = el }"
            @mouseenter="hoveredItem = item.path" @mouseleave="hoveredItem = null" :class="[
              'flex items-center rounded-lg text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-neutral-200 transition-all',
              sidebarCollapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2'
            ]" active-class="bg-neutral-100 dark:bg-neutral-900/80 text-neutral-900 dark:text-white">
            <component :is="item.icon" class="w-4 h-4 flex-shrink-0" />
            <span v-if="!sidebarCollapsed" class="font-medium">{{ $t(item.labelKey) }}</span>
          </router-link>
        </div>
      </nav>

      <!-- User Profile Section -->
      <div ref="profileMenuRef" class="p-4 border-t border-neutral-200 dark:border-neutral-800 relative">
        <button @click="profileMenuOpen = !profileMenuOpen" :class="[
          'w-full flex items-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900/50 transition-colors p-2',
          sidebarCollapsed ? 'justify-center' : 'gap-3'
        ]">
          <UserAvatar :avatar-url="authStore.user?.avatar_url"
            :username="authStore.user?.username || authStore.user?.email" size="md" class="flex-shrink-0" />
          <div v-if="!sidebarCollapsed" class="flex-1 min-w-0 text-left">
            <p class="text-sm font-medium text-neutral-900 dark:text-neutral-200 truncate">{{ authStore.user?.username
              || 'Admin' }}</p>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 truncate">{{ authStore.user?.email }}</p>
          </div>
          <svg v-if="!sidebarCollapsed" class="w-4 h-4 text-neutral-500 dark:text-neutral-400" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div v-if="profileMenuOpen"
          class="absolute bottom-4 left-full ml-2 w-56 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
          <!-- User Info Header -->
          <div class="px-3 py-2.5 border-b border-neutral-200 dark:border-neutral-800">
            <div class="flex items-center gap-2.5">
              <UserAvatar :avatar-url="authStore.user?.avatar_url"
                :username="authStore.user?.username || authStore.user?.email" size="md" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-neutral-900 dark:text-neutral-200 truncate">{{
                  authStore.user?.username || 'Admin' }}</p>
                <p class="text-xs text-neutral-500 dark:text-neutral-400 truncate">{{ authStore.user?.email }}</p>
              </div>
            </div>
          </div>

          <!-- Menu Items -->
          <div class="py-1">
            <button @click="router.push('/admin/my-settings'); profileMenuOpen = false"
              class="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <Settings class="w-4 h-4" />
              <span>{{ $t('admin.profile.mySettings') }}</span>
            </button>
          </div>

          <div class="border-t border-neutral-200 dark:border-neutral-800"></div>

          <div class="py-1">
            <button @click="handleLogout"
              class="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <LogOut class="w-4 h-4" />
              <span>{{ $t('admin.profile.logout') }}</span>
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Mobile Overlay -->
    <div v-if="sidebarOpen" class="fixed inset-0 bg-black/50 z-30 lg:hidden" @click="sidebarOpen = false"></div>

    <!-- Tooltips rendered outside sidebar using Teleport -->
    <Teleport to="body">
      <div v-if="sidebarCollapsed && hoveredItem && menuRefs[hoveredItem]" :style="getTooltipStyle(hoveredItem)"
        class="fixed px-2 py-1 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs rounded shadow-lg whitespace-nowrap z-[9999] pointer-events-none">
        {{ getItemLabel(hoveredItem) }}
      </div>
    </Teleport>

    <!-- Main Content -->
    <div class="transition-all duration-300" :class="sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'">
      <!-- Admin Header -->
      <header
        class="sticky top-0 z-20 h-14 bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200 dark:border-neutral-800/50 backdrop-blur-md">
        <div class="flex items-center justify-between h-full px-6">
          <!-- Left: Sidebar Toggle & Mobile Menu -->
          <div class="flex items-center gap-4">
            <button @click="sidebarCollapsed = !sidebarCollapsed"
              class="hidden lg:block p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 transition-all"
              title="Toggle sidebar">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M9 3v18"></path>
              </svg>
            </button>
            <button @click="sidebarOpen = !sidebarOpen"
              class="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 transition-all">
              <Menu class="w-5 h-5" />
            </button>
          </div>

          <!-- Right: Language Selector + Theme Toggle + User Profile -->
          <div class="flex items-center gap-1">
            <!-- Language Selector -->
            <div ref="langMenuRef" class="relative">
              <button @click="langMenuOpen = !langMenuOpen"
                class="inline-flex shrink-0 justify-center items-center gap-x-1 px-2 py-1.5 text-xs font-medium rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-all duration-200 ease-in-out">
                <span class="text-xs">{{ currentLocale === 'tr' ? 'Türkçe' : 'English' }}</span>
                <ChevronDown class="shrink-0 w-3 h-3" />
              </button>

              <!-- Language Dropdown -->
              <div v-if="langMenuOpen"
                class="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-lg py-1 z-50">
                <button @click="changeLanguage('tr')"
                  :class="currentLocale === 'tr' ? 'bg-neutral-50 dark:bg-neutral-700' : ''"
                  class="w-full text-left px-3 py-2 text-xs text-neutral-700 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                  🇹🇷 Türkçe
                </button>
                <button @click="changeLanguage('en')"
                  :class="currentLocale === 'en' ? 'bg-neutral-50 dark:bg-neutral-700' : ''"
                  class="w-full text-left px-3 py-2 text-xs text-neutral-500 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                  🇺🇸 English
                </button>
              </div>
            </div>

            <!-- Theme Toggle -->
            <button @click="toggleTheme"
              class="inline-flex shrink-0 justify-center items-center w-9 h-9 font-medium rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-all duration-200 ease-in-out">
              <Sun v-if="isDark" class="shrink-0 w-4 h-4" />
              <Moon v-else class="shrink-0 w-4 h-4" />
            </button>

            <!-- User Profile Dropdown (Local) -->
            <div ref="headerProfileMenuRef" class="relative">
              <button @click="headerProfileMenuOpen = !headerProfileMenuOpen"
                class="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all">
                <UserAvatar :avatar-url="authStore.user?.avatar_url"
                  :username="authStore.user?.username || authStore.user?.email" size="sm" />
                <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300 hidden sm:block">
                  {{ authStore.user?.username || authStore.user?.email?.split('@')[0] }}
                </span>
                <svg class="w-3 h-3 text-neutral-500 dark:text-neutral-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div v-if="headerProfileMenuOpen"
                class="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg py-1 z-50">
                <!-- Admin Dashboard -->
                <button @click="router.push('/admin/dashboard'); headerProfileMenuOpen = false"
                  class="w-full flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                  <Shield class="w-4 h-4" />
                  <span>{{ $t('admin.profile.adminPanel') }}</span>
                </button>

                <!-- Dashboard -->
                <button @click="router.push('/dashboard'); headerProfileMenuOpen = false"
                  class="w-full flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                  <LayoutDashboard class="w-4 h-4" />
                  <span>{{ $t('admin.profile.dashboard') }}</span>
                </button>

                <!-- My Settings -->
                <button @click="router.push('/admin/my-settings'); headerProfileMenuOpen = false"
                  class="w-full flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                  <Settings class="w-4 h-4" />
                  <span>{{ $t('admin.profile.mySettings') }}</span>
                </button>

                <hr class="my-1 border-neutral-200 dark:border-neutral-700" />

                <!-- Logout -->
                <button @click="handleLogout"
                  class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <LogOut class="w-4 h-4" />
                  <span>{{ $t('admin.profile.logout') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Shield, LayoutDashboard, Users, Webhook, Settings, LogOut, Menu, Sun, Moon, FileText, ChevronDown, ExternalLink } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import { useAuthStore } from '@/stores/auth'
import { useLocaleStore } from '@/stores/locale'
import UserAvatar from '@/components/common/UserAvatar.vue'
import api from '@/utils/api'

const router = useRouter()
const authStore = useAuthStore()
const localeStore = useLocaleStore()
const { isDark, toggleTheme } = useTheme()
const $t = localeStore.t
const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)
const profileMenuOpen = ref(false)
const headerProfileMenuOpen = ref(false)
const langMenuOpen = ref(false)
const hoveredItem = ref(null)
const menuRefs = reactive({})
const profileMenuRef = ref(null)
const headerProfileMenuRef = ref(null)
const langMenuRef = ref(null)

const currentLocale = computed(() => localeStore.currentLocale || 'en')

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

const loadSiteSettings = async () => {
  try {
    const response = await api.get('/api/settings')

    if (response.data && response.data.settings) {
      response.data.settings.forEach(setting => {
        if (['site_title', 'site_logo', 'site_logo_light', 'site_logo_dark'].includes(setting.setting_key)) {
          siteSettings.value[setting.setting_key] = setting.setting_value
        }
      })
    }
  } catch (error) {
    console.error('Failed to load site settings:', error)
  }
}

const changeLanguage = (lang) => {
  localeStore.setLocale(lang)
  langMenuOpen.value = false
}

// Load sidebar collapsed state from localStorage
onMounted(() => {
  const saved = localStorage.getItem('adminSidebarCollapsed')
  if (saved !== null) {
    sidebarCollapsed.value = saved === 'true'
  }

  // Load site settings
  loadSiteSettings()
  
  // Add click outside listener
  document.addEventListener('click', handleClickOutside)
})

// Save sidebar collapsed state to localStorage
watch(sidebarCollapsed, (newValue) => {
  localStorage.setItem('adminSidebarCollapsed', String(newValue))
})

const menuItems = [
  { path: '/admin/dashboard', labelKey: 'admin.sidebar.dashboard', icon: LayoutDashboard },
  { path: '/admin/users', labelKey: 'admin.sidebar.users', icon: Users },
  { path: '/admin/webhooks', labelKey: 'admin.sidebar.webhooks', icon: Webhook },
  { path: '/admin/docs', labelKey: 'admin.sidebar.documentation', icon: FileText },
  { path: '/admin/company-pages', labelKey: 'admin.sidebar.companyPages', icon: FileText },
  { path: '/admin/site-settings', labelKey: 'admin.sidebar.settings', icon: Settings }
]

const handleLogout = () => {
  authStore.logout()
  profileMenuOpen.value = false
  router.push('/admin/login')
}

const getTooltipStyle = (itemPath) => {
  const el = menuRefs[itemPath]
  if (!el || !el.$el) return {}

  const rect = el.$el.getBoundingClientRect()
  return {
    left: `${rect.right + 8}px`,
    top: `${rect.top + rect.height / 2}px`,
    transform: 'translateY(-50%)'
  }
}

const getItemLabel = (itemPath) => {
  const item = menuItems.find(i => i.path === itemPath)
  return item ? $t(item.labelKey) : ''
}

// Click outside handlers
const handleClickOutside = (event) => {
  if (profileMenuRef.value && !profileMenuRef.value.contains(event.target)) {
    profileMenuOpen.value = false
  }
  if (headerProfileMenuRef.value && !headerProfileMenuRef.value.contains(event.target)) {
    headerProfileMenuOpen.value = false
  }
  if (langMenuRef.value && !langMenuRef.value.contains(event.target)) {
    langMenuOpen.value = false
  }
}

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Hide scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
