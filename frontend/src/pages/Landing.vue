<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950">
    <!-- Navigation -->
    <LandingNav />

    <!-- Hero Section -->
    <section class="pt-10 md:pt-24 pb-32 px-6 relative overflow-hidden">
      <div class="hero-grid max-w-7xl mx-auto text-center relative z-10 p-5">
        <!-- Badge -->
        <div class="flex justify-center mb-6">
          <div
            class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-neutral-900/5 dark:bg-neutral-100/5 border border-neutral-300/50 dark:border-neutral-700/50">
            <span
              class="px-2.5 py-0.5 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-md">{{
                t('landing.hero.badge') }}</span>
            <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">{{ t('landing.hero.badgeText')
            }}</span>
          </div>
        </div>

        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
          {{ heroTitle }}
          <span class="block text-neutral-600 dark:text-neutral-300">
            {{ heroSubtitle }}
          </span>
        </h1>
        <p class="text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
          {{ heroDescription }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button @click="$router.push('/register')"
            class="px-8 py-3 rounded-lg text-base font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all">
            {{ heroCTA }}
          </button>
          <button @click="$router.push('/docs')"
            class="px-8 py-3 rounded-lg text-base font-medium bg-white dark:bg-neutral-800/50 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-all border border-neutral-300 dark:border-neutral-700/50">
            {{ t('landing.hero.viewDocs') }}
          </button>
        </div>
      </div>

      <!-- Dashboard Preview -->
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="dashboard-preview relative rounded-2xl overflow-hidden shadow-2xl">
          <!-- Light theme image -->
          <img v-if="!isDark" src="/dashboard-preview-light.png" alt="Dashboard Preview" class="w-full h-auto" />
          <!-- Dark theme image -->
          <img v-else src="/dashboard-preview-dark.png" alt="Dashboard Preview" class="w-full h-auto" />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 px-6 bg-neutral-100 dark:bg-neutral-900/50">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-neutral-900 dark:text-neutral-50 mb-12">
          {{ t('landing.features.title') }}
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            class="p-6 rounded-lg bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/50 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-md dark:hover:shadow-neutral-900/50 transition-all text-center">
            <Zap class="w-12 h-12 text-neutral-600 dark:text-neutral-400 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
              {{ t('landing.features.instant.title') }}
            </h3>
            <p class="text-neutral-600 dark:text-neutral-400">
              {{ t('landing.features.instant.description') }}
            </p>
          </div>

          <div
            class="p-6 rounded-lg bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/50 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-md dark:hover:shadow-neutral-900/50 transition-all text-center">
            <Activity class="w-12 h-12 text-neutral-600 dark:text-neutral-400 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
              {{ t('landing.features.monitoring.title') }}
            </h3>
            <p class="text-neutral-600 dark:text-neutral-400">
              {{ t('landing.features.monitoring.description') }}
            </p>
          </div>

          <div
            class="p-6 rounded-lg bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/50 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-md dark:hover:shadow-neutral-900/50 transition-all text-center">
            <Shield class="w-12 h-12 text-neutral-600 dark:text-neutral-400 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
              {{ t('landing.features.secure.title') }}
            </h3>
            <p class="text-neutral-600 dark:text-neutral-400">
              {{ t('landing.features.secure.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-20 px-6 bg-white dark:bg-neutral-950">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
            {{ t('landing.howItWorks.title') }}
          </h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            {{ t('landing.howItWorks.description') }}
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div
            class="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all hover:shadow-lg">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Plus class="w-7 h-7 text-blue-500" />
              </div>
              <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                {{ t('landing.howItWorks.step1.title') }}
              </h3>
            </div>
            <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {{ t('landing.howItWorks.step1.description') }}
            </p>
          </div>

          <!-- Step 2 -->
          <div
            class="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all hover:shadow-lg">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <Send class="w-7 h-7 text-purple-500" />
              </div>
              <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                {{ t('landing.howItWorks.step2.title') }}
              </h3>
            </div>
            <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {{ t('landing.howItWorks.step2.description') }}
            </p>
          </div>

          <!-- Step 3 -->
          <div
            class="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all hover:shadow-lg">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <BarChart3 class="w-7 h-7 text-emerald-500" />
              </div>
              <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                {{ t('landing.howItWorks.step3.title') }}
              </h3>
            </div>
            <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {{ t('landing.howItWorks.step3.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-6 bg-neutral-100 dark:bg-neutral-900/50">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
          {{ t('landing.cta.title') }}
        </h2>
        <p class="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
          {{ t('landing.cta.description') }}
        </p>
        <button @click="$router.push('/register')"
          class="px-8 py-3 rounded-lg text-base font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all">
          {{ t('landing.cta.button') }}
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-6 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800/50">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <!-- Custom Logo from Settings -->
              <div v-if="currentLogo && currentLogo.trim()"
                class="w-6 h-6 flex items-center justify-center overflow-hidden">
                <img :src="getImageUrl(currentLogo)" :alt="siteSettings.site_title || 'Logo'"
                  class="w-full h-full object-contain" />
              </div>
              <!-- Default Zap Icon -->
              <Zap v-else class="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
              <span class="text-lg font-bold text-neutral-900 dark:text-neutral-50">{{ siteSettings.site_title ||
                'AstraHook' }}</span>
            </div>
            <p class="text-neutral-600 dark:text-neutral-400 text-sm">
              {{ t('landing.footer.tagline') }}
            </p>
          </div>

          <div>
            <h4 class="text-neutral-900 dark:text-neutral-50 font-semibold mb-3">{{ t('landing.footer.product') }}</h4>
            <ul class="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
              <li><a href="#features" class="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">{{
                t('landing.footer.features') }}</a></li>
              <li><router-link to="/docs"
                  class="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">{{
                    t('landing.footer.docs') }}</router-link>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-neutral-900 dark:text-neutral-50 font-semibold mb-3">{{ t('landing.footer.company') }}</h4>
            <ul class="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
              <li>
                <router-link to="/company/about-us"
                  class="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
                  {{ t('landing.footer.about') }}
                </router-link>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-neutral-900 dark:text-neutral-50 font-semibold mb-3">{{ t('landing.footer.legal') }}</h4>
            <ul class="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
              <li>
                <router-link to="/company/privacy-policy"
                  class="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
                  {{ t('landing.footer.privacy') }}
                </router-link>
              </li>
              <li>
                <router-link to="/company/terms-of-service"
                  class="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
                  {{ t('landing.footer.terms') }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="pt-8 border-t border-neutral-200 dark:border-neutral-800/50 text-center text-neutral-600 dark:text-neutral-400 text-sm">
          <p>&copy; {{ t('landing.footer.rights') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Zap, Activity, Shield, Plus, Send, BarChart3 } from 'lucide-vue-next'
import LandingNav from '@/components/layout/LandingNav.vue'
import { useLocaleStore } from '@/stores/locale'
import { useThemeStore } from '@/stores/theme'
import api from '@/utils/api'

const localeStore = useLocaleStore()
const themeStore = useThemeStore()
const t = localeStore.t
const siteSettings = ref({})

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3080'

const isDark = computed(() => themeStore.theme === 'dark')

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
onMounted(async () => {
  try {
    const response = await api.get('/api/settings/public')
    siteSettings.value = response.data.settings
  } catch (error) {
    console.error('Failed to load site settings:', error)
  }
})

// Use site settings if available, otherwise use translations
const heroTitle = computed(() => siteSettings.value.hero_title || t('landing.hero.title'))
const heroSubtitle = computed(() => siteSettings.value.hero_subtitle || t('landing.hero.subtitle'))
const heroDescription = computed(() => siteSettings.value.site_description || t('landing.hero.description'))
const heroCTA = computed(() => siteSettings.value.hero_cta_text || t('landing.hero.getStarted'))
</script>

<style scoped>
.hero-grid {
  background-image:
    linear-gradient(to right, rgba(64, 64, 64, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(64, 64, 64, 0.08) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
}

/* Light mode grid */
:global(html:not(.dark)) .hero-grid {
  background-image:
    linear-gradient(to right, rgba(200, 200, 200, 0.12) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(200, 200, 200, 0.12) 1px, transparent 1px);
}

/* Dashboard Preview with fade effect */
.dashboard-preview {
  border: 2px solid rgb(86 86 86 / 40%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, black 50%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 0%, black 50%, transparent 100%);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
}

:global(.dark) .dashboard-preview {
  border-color: rgb(64 64 64 / 0.5);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}
</style>
