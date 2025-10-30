<template>
  <div ref="dropdownRef" class="relative">
    <button @click="isOpen = !isOpen" :class="buttonClass">
      <UserAvatar :avatar-url="authStore.user?.avatar_url" :username="authStore.user?.username || authStore.user?.email"
        size="sm" />
      <span v-if="showUsername" class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {{ authStore.user?.username || authStore.user?.email?.split('@')[0] }}
      </span>
      <ChevronDown class="w-3 h-3 text-neutral-500 dark:text-neutral-400" />
    </button>

    <!-- Dropdown Menu -->
    <div v-if="isOpen" :class="dropdownClass">
      <!-- Admin Dashboard (only if user is admin) -->
      <router-link v-if="isAdmin" to="/admin/dashboard" @click="closeMenu"
        class="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
        <Shield class="w-4 h-4" />
        <span>{{ $t('common.adminPanel') }}</span>
      </router-link>

      <!-- Dashboard -->
      <router-link to="/dashboard" @click="closeMenu"
        class="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
        <LayoutDashboard class="w-4 h-4" />
        <span>{{ $t('common.dashboard') }}</span>
      </router-link>

      <!-- My Settings -->
      <router-link :to="settingsRoute" @click="closeMenu"
        class="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
        <Settings class="w-4 h-4" />
        <span>{{ $t('common.mySettings') }}</span>
      </router-link>

      <hr class="my-1 border-neutral-200 dark:border-neutral-700" />

      <!-- Logout -->
      <button @click="handleLogout"
        class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
        <LogOut class="w-4 h-4" />
        <span>{{ $t('common.logout') }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronDown, LayoutDashboard, Settings, LogOut, Shield } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useLocaleStore } from '@/stores/locale'
import UserAvatar from './UserAvatar.vue'

const localeStore = useLocaleStore()
const $t = localeStore.t

const props = defineProps({
  showUsername: {
    type: Boolean,
    default: true
  },
  buttonClass: {
    type: String,
    default: 'flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all'
  },
  dropdownClass: {
    type: String,
    default: 'absolute top-full right-0 mt-2 w-48 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg py-1 z-50'
  },
  redirectAfterLogout: {
    type: String,
    default: '/login'
  }
})

const router = useRouter()
const authStore = useAuthStore()
const isOpen = ref(false)
const dropdownRef = ref(null)

const isAdmin = computed(() => {
  return authStore.user?.role === 'admin'
})

const settingsRoute = computed(() => {
  return '/my-settings'
})

const closeMenu = () => {
  isOpen.value = false
}

const handleLogout = () => {
  authStore.logout()
  closeMenu()
  router.push(props.redirectAfterLogout)
}

// Click outside handler
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
