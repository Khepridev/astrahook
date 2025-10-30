<template>
  <div class="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-6 py-12 relative">
    <!-- Back Button - Top Left -->
    <div class="absolute top-6 left-6">
      <router-link to="/login"
        class="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
        <ArrowLeft class="w-4 h-4" />
        {{ t('auth.register.backToLogin') }}
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
        <p class="text-neutral-600 dark:text-neutral-400">{{ t('auth.register.subtitle') }}</p>
      </div>
      
      <!-- Register Card -->
      <Card>
        <form @submit.prevent="handleRegister" class="space-y-4">
          <Input
            id="username"
            v-model="username"
            type="text"
            :label="t('auth.register.username')"
            :placeholder="t('auth.register.usernamePlaceholder')"
            :error="errors.username"
            required
          />

          <Input
            id="email"
            v-model="email"
            type="email"
            :label="t('auth.register.email')"
            :placeholder="t('auth.register.emailPlaceholder')"
            :error="errors.email"
            required
          />
          
          <Input
            id="password"
            v-model="password"
            type="password"
            :label="t('auth.register.password')"
            :placeholder="t('auth.register.passwordPlaceholder')"
            :error="errors.password"
            required
          />
          
          <Input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            :label="t('auth.register.confirmPassword')"
            :placeholder="t('auth.register.confirmPasswordPlaceholder')"
            :error="errors.confirmPassword"
            required
          />
          
          <Button
            type="submit"
            variant="primary"
            size="lg"
            class="w-full"
            :loading="authStore.loading"
          >
            {{ authStore.loading ? t('auth.register.registering') : t('auth.register.registerButton') }}
          </Button>
        </form>
        
        <div class="mt-6 text-center">
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            {{ t('auth.register.haveAccount') }}
            <router-link to="/login" class="text-primary hover:underline font-medium">
              {{ t('auth.register.signIn') }}
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

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = ref({})

const handleRegister = async () => {
  errors.value = {}
  
  // Validation
  if (!username.value) {
    errors.value.username = t('auth.errors.usernameRequired')
    return
  }
  if (username.value.length < 3) {
    errors.value.username = t('auth.errors.usernameTooShort')
    return
  }
  if (!email.value) {
    errors.value.email = t('auth.errors.emailRequired')
    return
  }
  if (!password.value) {
    errors.value.password = t('auth.errors.passwordRequired')
    return
  }
  if (password.value.length < 6) {
    errors.value.password = t('auth.errors.passwordTooShort')
    return
  }
  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = t('auth.errors.passwordsNotMatch')
    return
  }
  
  const success = await authStore.register(email.value, password.value, username.value)
  
  if (success) {
    toast.success(t('auth.register.registerButton') + ' ' + t('common.success'))
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  } else {
    if (authStore.error) {
      toast.error(authStore.error || t('auth.errors.registerFailed'))
    }
  }
}
</script>
