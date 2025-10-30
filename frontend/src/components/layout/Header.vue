<template>
  <header class="sticky top-0 z-20 h-14 bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200 dark:border-neutral-800/50 backdrop-blur-md">
    <div class="flex items-center justify-between h-full px-6">
      <!-- Left: Sidebar Toggle & Mobile Menu -->
      <div class="flex items-center gap-4">
        <button
          @click="$emit('toggle-collapse')"
          class="hidden lg:block p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 transition-all"
          title="Toggle sidebar"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M9 3v18"></path>
          </svg>
        </button>
        <button
          @click="$emit('toggle-sidebar')"
          class="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 transition-all"
        >
          <Menu class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Right: Language Selector + Theme Toggle + User Profile -->
      <div class="flex items-center gap-1">
        <!-- Language Selector -->
        <div class="relative">
          <button
            @click="langMenuOpen = !langMenuOpen"
            class="inline-flex shrink-0 justify-center items-center gap-x-1 px-2 py-1.5 text-xs font-medium rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-all duration-200 ease-in-out"
          >
            <span class="text-xs">{{ currentLocale === 'tr' ? 'Türkçe' : 'English' }}</span>
            <ChevronDown class="shrink-0 w-3 h-3" />
          </button>

          <!-- Language Dropdown -->
          <div
            v-if="langMenuOpen"
            class="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-lg py-1 z-50"
          >
            <button
              @click="changeLanguage('tr')"
              :class="currentLocale === 'tr' ? 'bg-neutral-50 dark:bg-neutral-700' : ''"
              class="w-full text-left px-3 py-2 text-xs text-neutral-700 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            >
              🇹🇷 Türkçe
            </button>
            <button
              @click="changeLanguage('en')"
              :class="currentLocale === 'en' ? 'bg-neutral-50 dark:bg-neutral-700' : ''"
              class="w-full text-left px-3 py-2 text-xs text-neutral-500 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            >
              🇺🇸 English
            </button>
          </div>
        </div>

        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="inline-flex shrink-0 justify-center items-center w-9 h-9 font-medium rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-all duration-200 ease-in-out"
          :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="isDark" class="shrink-0 w-4 h-4" />
          <Moon v-else class="shrink-0 w-4 h-4" />
        </button>

        <!-- User Profile Dropdown -->
        <UserProfileDropdown 
          class="ms-2"
          button-class="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all"
          dropdown-class="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg py-1 z-50"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Menu, Sun, Moon, ChevronDown } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import { useLocaleStore } from '@/stores/locale'
import UserProfileDropdown from '@/components/common/UserProfileDropdown.vue'

defineProps({
  title: {
    type: String,
    default: 'Dashboard',
  },
  description: {
    type: String,
    default: '',
  },
})

defineEmits(['toggle-sidebar', 'toggle-collapse'])

const { isDark, toggleTheme } = useTheme()
const localeStore = useLocaleStore()
const langMenuOpen = ref(false)

const currentLocale = computed(() => localeStore.currentLocale || 'en')

const changeLanguage = (lang) => {
  localeStore.setLocale(lang)
  langMenuOpen.value = false
}

// Close dropdown when clicking outside
if (typeof window !== 'undefined') {
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      langMenuOpen.value = false
    }
  })
}
</script>
