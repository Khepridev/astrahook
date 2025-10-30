<template>
  <div class="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-6 py-12 relative">
    <!-- Back Button - Top Left -->
    <div class="absolute top-6 left-6">
      <router-link to="/"
        class="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
        <ArrowLeft class="w-4 h-4" />
        {{ t('auth.login.backToHome') }}
      </router-link>
    </div>



    <div class="w-full max-w-md">

      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="flex items-center justify-center gap-2 mb-2">
          <!-- Custom Logo from Settings -->
          <div v-if="currentLogo && currentLogo.trim()" class="w-10 h-10 flex items-center justify-center overflow-hidden">
            <img :src="getImageUrl(currentLogo)" :alt="siteSettings.site_title || 'Logo'" class="w-full h-full object-contain" />
          </div>
          <!-- Default Zap Icon -->
          <Zap v-else class="w-10 h-10 text-primary" />
          <h1 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{{ siteSettings.site_title || 'AstraHook' }}</h1>
        </div>
        <p class="text-neutral-600 dark:text-neutral-400">{{ t('auth.login.subtitle') }}</p>
      </div>

      <!-- Login Card -->
      <Card>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <Input id="email" v-model="email" type="email" :label="t('auth.login.email')"
            :placeholder="t('auth.login.emailPlaceholder')" :error="errors.email" required />

          <Input id="password" v-model="password" type="password" :label="t('auth.login.password')"
            :placeholder="t('auth.login.passwordPlaceholder')" :error="errors.password" required />

          <Button type="submit" variant="primary" size="lg" class="w-full" :loading="authStore.loading">
            {{ authStore.loading ? t('auth.login.loggingIn') : t('auth.login.loginButton') }}
          </Button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            {{ t('auth.login.noAccount') }}
            <router-link to="/register" class="text-primary hover:underline font-medium">
              {{ t('auth.login.signUp') }}
            </router-link>
          </p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLocaleStore } from '@/stores/locale'
import { useToast } from '@/composables/useToast'
import { Zap, ArrowLeft } from 'lucide-vue-next'
import Card from '@/components/common/Card.vue'
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'
import api from '@/utils/api'

const router = useRouter()
const authStore = useAuthStore()
const localeStore = useLocaleStore()
const toast = useToast()
const t = localeStore.t

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3080'

const siteSettings = ref({
  site_title: '',
  site_logo: null,
  site_logo_light: null,
  site_logo_dark: null
})

const currentLogo = computed(() => {
  const isDark = document.documentElement.classList.contains('dark')
  if (isDark && siteSettings.value.site_logo_dark) {
    return siteSettings.value.site_logo_dark
  }
  if (!isDark && siteSettings.value.site_logo_light) {
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
      siteSettings.value.site_title = response.data.settings.site_title || ''
      siteSettings.value.site_logo = response.data.settings.site_logo || null
      siteSettings.value.site_logo_light = response.data.settings.site_logo_light || null
      siteSettings.value.site_logo_dark = response.data.settings.site_logo_dark || null
    }
  } catch (error) {
    console.error('Failed to load site settings:', error)
  }
}

onMounted(() => {
  loadSiteSettings()
})

const email = ref('')
const password = ref('')
const errors = ref({})

const handleLogin = async () => {
  errors.value = {}

  // Validation
  if (!email.value) {
    errors.value.email = t('auth.errors.emailRequired')
    return
  }
  if (!password.value) {
    errors.value.password = t('auth.errors.passwordRequired')
    return
  }

  const success = await authStore.login(email.value, password.value)

  if (success) {
    toast.success(t('auth.login.loginButton') + ' ' + t('common.success'))
    router.push('/dashboard')
  } else {
    // Show error from auth store
    if (authStore.error) {
      toast.error(authStore.error || t('auth.errors.loginFailed'))
    }
  }
}
</script>
