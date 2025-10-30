<template>
  <header class="sticky top-0 inset-x-0 px-4 flex flex-wrap justify-center z-50 w-full py-4">
    <nav
      class="max-w-7xl flex flex-wrap basis-full items-center w-full mx-auto px-6 sm:px-8 lg:px-10 mt-3 border border-neutral-200 dark:border-neutral-700/50 rounded-full bg-white/90 dark:bg-neutral-950/80 shadow-sm backdrop-blur-md py-3 transition-all duration-300 ease-in-out">
      <!-- Logo -->
      <router-link to="/" class="me-3 flex-none rounded-md focus:outline-none focus:opacity-80">
        <!-- Custom Logo from Settings -->
        <div v-if="currentLogo && currentLogo.trim()" class="w-7 h-7 flex items-center justify-center overflow-hidden">
          <img :src="getImageUrl(currentLogo)" :alt="siteSettings.site_title || 'Logo'"
            class="w-full h-full object-contain" />
        </div>
        <!-- Default Zap Icon -->
        <div v-else
          class="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-700/50 border border-neutral-200 dark:border-neutral-600/50 flex items-center justify-center hover:border-neutral-300 dark:hover:border-neutral-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="text-neutral-600 dark:text-neutral-300">
            <path
              d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z">
            </path>
          </svg>
        </div>
      </router-link>

      <!-- Right Wrapper -->
      <div class="flex items-center ms-auto lg:order-3">
        <div class="flex items-center relative z-10 gap-1">
          <!-- Language Selector -->
          <div class="relative">
            <button @click="langMenuOpen = !langMenuOpen"
              class="inline-flex shrink-0 justify-center items-center gap-x-1 px-2 py-1.5 text-xs font-medium rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-all duration-200 ease-in-out">
              <span class="text-xs">{{ currentLang === 'tr' ? 'Türkçe' : 'English' }}</span>
              <ChevronDown class="shrink-0 w-3 h-3" />
            </button>

            <!-- Dropdown Menu -->
            <div v-if="langMenuOpen"
              class="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-lg py-1 z-50">
              <button @click="changeLanguage('tr')"
                :class="currentLang === 'tr' ? 'bg-neutral-50 dark:bg-neutral-700' : ''"
                class="w-full text-left px-3 py-2 text-xs text-neutral-700 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                🇹🇷 Türkçe
              </button>
              <button @click="changeLanguage('en')"
                :class="currentLang === 'en' ? 'bg-neutral-50 dark:bg-neutral-700' : ''"
                class="w-full text-left px-3 py-2 text-xs text-neutral-500 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                🇺🇸 English
              </button>
            </div>
          </div>

          <!-- Theme Toggle -->
          <button @click="handleToggleTheme"
            class="inline-flex shrink-0 justify-center items-center w-9 h-9 font-medium rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-all duration-200 ease-in-out"
            :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'">
            <Sun v-if="isDark" class="shrink-0 w-4 h-4" />
            <Moon v-else class="shrink-0 w-4 h-4" />
          </button>

          <!-- GitHub -->
          <a href="https://github.com/Khepridev" target="_blank"
            class="shrink-0 inline-flex justify-center items-center w-9 h-9 font-medium rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-all duration-200 ease-in-out">
            <svg class="shrink-0 w-3.5 h-3.5" fill="none" height="18" viewBox="0 0 15 15" width="16"
              xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd"
                d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                fill="currentColor" fill-rule="evenodd" />
            </svg>
          </a>
        </div>

        <!-- User Profile / Auth -->
        <template v-if="authStore.isAuthenticated()">
          <UserProfileDropdown class="ms-2"
            button-class="inline-flex items-center gap-x-2 px-3 py-2 text-sm font-medium rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-all" />
        </template>
        <template v-else>
          <div class="flex items-center gap-2 ms-2">
            <button @click="$router.push('/login')"
              class="px-4 py-1.5 text-sm font-medium rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-all">
              {{ t('landing.nav.login') }}
            </button>
            <button @click="$router.push('/register')"
              class="px-4 py-1.5 text-sm font-medium rounded-full bg-neutral-800 dark:bg-neutral-700/50 text-white dark:text-neutral-100 hover:bg-neutral-700 dark:hover:bg-neutral-600/50 transition-all border border-neutral-800 dark:border-neutral-600/50">
              {{ t('landing.nav.signup') }}
            </button>
          </div>
        </template>

        <!-- Mobile Menu Button -->
        <button @click="mobileMenuOpen = !mobileMenuOpen"
          class="ms-2 lg:hidden w-9 h-9 inline-flex justify-center items-center rounded-full border border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700/50">
          <Menu v-if="!mobileMenuOpen" class="shrink-0 w-4 h-4" />
          <X v-else class="shrink-0 w-4 h-4" />
        </button>
      </div>

      <!-- Header Menu -->
      <div :class="mobileMenuOpen ? 'block' : 'hidden'"
        class="overflow-hidden transition-all duration-500 ease-in-out basis-full w-full lg:block lg:w-auto lg:basis-auto lg:order-2">
        <div class="flex flex-col mt-5 lg:flex-row lg:items-center lg:justify-end lg:mt-0 lg:pe-2 gap-1">
          <router-link to="/"
            class="inline-flex items-center gap-x-3 text-neutral-600 dark:text-neutral-300 p-2 font-medium rounded-md hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
            <Home class="shrink-0 w-4 h-4 block lg:hidden" />
            {{ t('landing.nav.home') }}
          </router-link>
          <a href="#features"
            class="inline-flex items-center gap-x-3 text-neutral-600 dark:text-neutral-300 p-2 font-medium rounded-md hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
            <FileText class="shrink-0 w-4 h-4 block lg:hidden" />
            {{ t('landing.nav.features') }}
          </a>
          <router-link to="/docs"
            class="inline-flex items-center gap-x-3 text-neutral-600 dark:text-neutral-300 p-2 font-medium rounded-md hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
            <Send class="shrink-0 w-4 h-4 block lg:hidden" />
            {{ t('landing.nav.documentation') }}
          </router-link>
        </div>
      </div>

    </nav>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, X, Sun, Moon, Home, FileText, Send, ChevronDown } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { useLocaleStore } from '@/stores/locale'
import UserProfileDropdown from '@/components/common/UserProfileDropdown.vue'
import api from '@/utils/api'

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const localeStore = useLocaleStore()
const mobileMenuOpen = ref(false)
const langMenuOpen = ref(false)

const isDark = computed(() => themeStore.theme === 'dark')
const currentLang = computed(() => localeStore.currentLocale)
const t = localeStore.t

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
    const response = await api.get('/api/settings/public')

    if (response.data && response.data.settings) {
      // Settings is already an object from backend
      siteSettings.value.site_title = response.data.settings.site_title || ''
      siteSettings.value.site_logo = response.data.settings.site_logo || null
      siteSettings.value.site_logo_light = response.data.settings.site_logo_light || null
      siteSettings.value.site_logo_dark = response.data.settings.site_logo_dark || null
    }
  } catch (error) {
    console.error('Failed to load site settings:', error)
  }
}

const handleToggleTheme = () => {
  themeStore.toggleTheme()
  console.log('Theme toggled to:', themeStore.theme)
}

const changeLanguage = (lang) => {
  localeStore.setLocale(lang)
  langMenuOpen.value = false
}

onMounted(() => {
  loadSiteSettings()
})
</script>
