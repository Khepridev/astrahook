<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 flex flex-col transition-all duration-300 lg:translate-x-0 overflow-visible"
    :class="[
      isCollapsed ? 'w-16' : 'w-64',
      { '-translate-x-full': !isOpen }
    ]">

    <!-- Logo Section -->
    <div class="h-14 px-4 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
      <router-link to="/dashboard" class="flex items-center hover:opacity-80 transition-opacity">
        <!-- Custom Logo from Settings -->
        <div v-if="currentLogo && currentLogo.trim()" class="w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
          <img :src="getImageUrl(currentLogo)" :alt="siteSettings.site_title || 'Logo'" class="w-full h-full object-contain" />
        </div>
        <!-- Default Zap Icon -->
        <div v-else class="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-700/50 border border-neutral-200 dark:border-neutral-600/50 flex items-center justify-center hover:border-neutral-300 dark:hover:border-neutral-500 transition-colors flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-neutral-600 dark:text-neutral-300">
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
          </svg>
        </div>
        <span v-if="!isCollapsed" class="ml-2 text-base font-semibold text-neutral-900 dark:text-white transition-opacity">{{ siteSettings.site_title || 'AstraHook' }}</span>
      </router-link>
      
      <!-- View Site Button -->
      <a v-if="!isCollapsed" href="/" target="_blank" 
        class="px-3 py-1.5 text-xs font-medium border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
        :title="$t('common.viewSite')">
        {{ $t('common.viewSite') }}
      </a>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-visible scrollbar-hide">
      <!-- Dashboards Section -->
      <div class="mb-4">
        <p v-if="!isCollapsed" class="px-3 mb-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
          {{ $t('sidebar.dashboards') }}</p>
        <div v-for="item in dashboardItems" :key="item.path" class="relative group">
          <router-link :to="item.path" :ref="el => { if (el) menuRefs[item.path] = el }"
            @mouseenter="hoveredItem = item.path"
            @mouseleave="hoveredItem = null"
            :class="[
              'flex items-center rounded-lg text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-neutral-200 transition-all',
              isCollapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2'
            ]"
            active-class="bg-neutral-100 dark:bg-neutral-900/80 text-neutral-900 dark:text-white">
            <component :is="item.icon" class="w-4 h-4 flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-medium">{{ $t(item.labelKey) }}</span>
          </router-link>
        </div>
      </div>

      <!-- Apps Section -->
      <div class="mb-4">
        <p v-if="!isCollapsed" class="px-3 mb-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">{{ $t('sidebar.apps') }}</p>
        <div v-for="item in appItems" :key="item.path" class="relative group">
          <router-link :to="item.path" :ref="el => { if (el) menuRefs[item.path] = el }"
            @mouseenter="hoveredItem = item.path"
            @mouseleave="hoveredItem = null"
            :class="[
              'flex items-center rounded-lg text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-neutral-200 transition-all',
              isCollapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2'
            ]"
            active-class="bg-neutral-100 dark:bg-neutral-900/80 text-neutral-900 dark:text-white">
            <component :is="item.icon" class="w-4 h-4 flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-medium">{{ $t(item.labelKey) }}</span>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- User Profile Section -->
    <div ref="userMenuRef" class="p-4 border-t border-neutral-200 dark:border-neutral-800 relative">
      <button @click="userMenuOpen = !userMenuOpen"
        :class="[
          'w-full flex items-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900/50 transition-colors p-2',
          isCollapsed ? 'justify-center' : 'gap-3'
        ]">
        <UserAvatar 
          :avatar-url="authStore.user?.avatar_url" 
          :username="userName"
          size="md"
          class="flex-shrink-0"
        />
        <div v-if="!isCollapsed" class="flex-1 min-w-0 text-left">
          <p class="text-sm font-medium text-neutral-900 dark:text-neutral-200 truncate">{{ userName }}</p>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 truncate">{{ authStore.user?.email }}</p>
        </div>
        <MoreVertical v-if="!isCollapsed" class="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
      </button>

      <!-- Dropdown Menu -->
      <div v-if="userMenuOpen"
        class="absolute bottom-4 left-full ml-2 w-56 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
        <!-- User Info Header -->
        <div class="px-3 py-2.5 border-b border-neutral-200 dark:border-neutral-800">
          <div class="flex items-center gap-2.5">
            <UserAvatar 
              :avatar-url="authStore.user?.avatar_url" 
              :username="userName"
              size="md"
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-neutral-900 dark:text-neutral-200 truncate">{{ userName }}</p>
              <p class="text-xs text-neutral-500 dark:text-neutral-400 truncate">{{ authStore.user?.email }}</p>
            </div>
          </div>
        </div>

        <!-- Menu Items -->
        <div class="py-1">
          <button @click="router.push('/my-settings'); userMenuOpen = false"
            class="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <User class="w-4 h-4" />
            <span>{{ $t('common.mySettings') }}</span>
          </button>
        </div>

        <div class="border-t border-neutral-200 dark:border-neutral-800"></div>

        <div class="py-1">
          <button @click="handleLogout"
            class="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <LogOut class="w-4 h-4" />
            <span>{{ $t('common.logout') }}</span>
          </button>
        </div>
      </div>
    </div>
  </aside>

  <!-- Mobile Overlay -->
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-30 lg:hidden" @click="closeSidebar"></div>

  <!-- Tooltips rendered outside sidebar using Teleport -->
  <Teleport to="body">
    <div v-if="isCollapsed && hoveredItem && menuRefs[hoveredItem]" 
      :style="getTooltipStyle(hoveredItem)"
      class="fixed px-2 py-1 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs rounded shadow-lg whitespace-nowrap z-[9999] pointer-events-none">
      {{ getItemLabel(hoveredItem) }}
    </div>
  </Teleport>
</template>

<script setup>
import { computed, ref, reactive, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLocaleStore } from '@/stores/locale'
import { useTheme } from '@/composables/useTheme'
import {
  LayoutDashboard,
  Webhook,
  Settings,
  LogOut,
  Zap,
  FileText,
  User,
  MoreVertical,
  ExternalLink
} from 'lucide-vue-next'
import UserAvatar from '@/components/common/UserAvatar.vue'
import api from '@/utils/api'

const localeStore = useLocaleStore()
const $t = localeStore.t
const { isDark } = useTheme()
const userMenuOpen = ref(false)
const hoveredItem = ref(null)
const menuRefs = reactive({})
const userMenuRef = ref(null)

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

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  isCollapsed: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const router = useRouter()
const authStore = useAuthStore()

const dashboardItems = computed(() => [
  { path: '/dashboard', labelKey: 'sidebar.default', icon: LayoutDashboard }
])

const appItems = computed(() => [
  { path: '/webhooks', labelKey: 'sidebar.webhooks', icon: Webhook },
  { path: '/my-settings', labelKey: 'sidebar.mySettings', icon: Settings },
  { path: '/docs', labelKey: 'sidebar.documentation', icon: FileText },
])

const userName = computed(() => {
  const email = authStore.user?.email || ''
  return email.split('@')[0] || 'User'
})

const userInitial = computed(() => {
  return authStore.user?.email?.charAt(0).toUpperCase() || 'U'
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const closeSidebar = () => {
  emit('close')
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
  const allItems = [...dashboardItems.value, ...appItems.value]
  const item = allItems.find(i => i.path === itemPath)
  return item ? $t(item.labelKey) : ''
}

// Click outside handler for user menu
const handleClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    userMenuOpen.value = false
  }
}

onMounted(() => {
  loadSiteSettings()
  document.addEventListener('click', handleClickOutside)
})

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
