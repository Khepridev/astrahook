<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">{{ $t('admin.siteSettings.title') }}</h1>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          {{ $t('admin.siteSettings.subtitle') }}
        </p>
      </div>
      <button @click="saveAllSettings" :disabled="saving"
        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30">
        <span v-if="saving" class="animate-spin">⏳</span>
        <span>{{ saving ? $t('admin.siteSettings.saving') : $t('admin.siteSettings.save') }}</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin text-4xl">⏳</div>
    </div>

    <!-- Tabs -->
    <div v-else
      class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
      <!-- Tab Headers -->
      <div
        class="flex border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto bg-neutral-50 dark:bg-neutral-800/50">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
          'px-8 py-4 font-semibold transition-all whitespace-nowrap relative',
          activeTab === tab.id
            ? 'text-blue-600 dark:text-blue-400 bg-white dark:bg-neutral-900'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
        ]">
          {{ tab.label }}
          <span v-if="activeTab === tab.id"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></span>
        </button>
      </div>

      <!-- Tab Content -->
      <div class="p-8">
        <!-- General Settings -->
        <div v-show="activeTab === 'general'" class="space-y-6">
          <div
            class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p class="text-sm text-blue-800 dark:text-blue-300">
              💡 {{ $t('admin.siteSettings.general.infoText') }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              {{ $t('admin.siteSettings.general.siteTitle') }}
            </label>
            <input v-model="settings.site_title" type="text"
              class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              :placeholder="$t('admin.siteSettings.general.siteTitlePlaceholder')" />
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5">
              {{ $t('admin.siteSettings.general.siteTitleHelp') }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {{ $t('admin.siteSettings.general.siteDescription') }}
            </label>
            <textarea v-model="settings.site_description" rows="3"
              class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 transition-colors resize-none"
              :placeholder="$t('admin.siteSettings.general.siteDescriptionPlaceholder')"></textarea>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              {{ $t('admin.siteSettings.general.siteDescriptionHelp') }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {{ $t('admin.siteSettings.general.footerText') }}
            </label>
            <input v-model="settings.footer_text" type="text"
              class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
              :placeholder="$t('admin.siteSettings.general.footerTextPlaceholder')" />
          </div>

          <div class="flex items-center gap-3 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <input v-model="settings.enable_registration" type="checkbox" id="enable_registration"
              class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
            <label for="enable_registration"
              class="text-sm font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer">
              {{ $t('admin.siteSettings.general.enableRegistration') }}
            </label>
          </div>

          <div class="flex items-center gap-3 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <input v-model="settings.maintenance_mode" type="checkbox" id="maintenance_mode"
              class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
            <label for="maintenance_mode"
              class="text-sm font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer">
              {{ $t('admin.siteSettings.general.maintenanceMode') }}
            </label>
          </div>
        </div>

        <!-- Landing Page Settings -->
        <div v-show="activeTab === 'landing'" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {{ $t('admin.siteSettings.landing.heroTitle') }}
            </label>
            <input v-model="settings.hero_title" type="text"
              class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
              :placeholder="$t('admin.siteSettings.landing.heroTitlePlaceholder')" />
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {{ $t('admin.siteSettings.landing.heroSubtitle') }}
            </label>
            <input v-model="settings.hero_subtitle" type="text"
              class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
              :placeholder="$t('admin.siteSettings.landing.heroSubtitlePlaceholder')" />
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {{ $t('admin.siteSettings.landing.heroCtaText') }}
            </label>
            <input v-model="settings.hero_cta_text" type="text"
              class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
              :placeholder="$t('admin.siteSettings.landing.heroCtaTextPlaceholder')" />
          </div>
        </div>

        <!-- Branding Settings -->
        <div v-show="activeTab === 'branding'" class="space-y-6">
          <!-- Light Theme Logo -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {{ $t('admin.siteSettings.branding.siteLogoLight') }}
            </label>
            <div v-if="settings.site_logo_light" class="mb-3 p-4 bg-white border border-neutral-200 rounded-lg">
              <img :src="getImageUrl(settings.site_logo_light)" alt="Site logo light" class="h-16 object-contain" />
            </div>
            <input ref="logoLightInput" type="file" accept="image/*" @change="handleLogoLightChange" class="hidden" />
            <div class="flex items-center gap-3">
              <button type="button" @click="$refs.logoLightInput.click()"
                class="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors">
                {{ $t('admin.siteSettings.branding.chooseLogoLight') }}
              </button>
              <span v-if="logoLightFile" class="text-sm text-neutral-600 dark:text-neutral-400">
                {{ logoLightFile.name }}
              </span>
            </div>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              {{ $t('admin.siteSettings.branding.logoLightHelp') }}
            </p>
          </div>

          <!-- Dark Theme Logo -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {{ $t('admin.siteSettings.branding.siteLogoDark') }}
            </label>
            <div v-if="settings.site_logo_dark" class="mb-3 p-4 bg-neutral-900 border border-neutral-700 rounded-lg">
              <img :src="getImageUrl(settings.site_logo_dark)" alt="Site logo dark" class="h-16 object-contain" />
            </div>
            <input ref="logoDarkInput" type="file" accept="image/*" @change="handleLogoDarkChange" class="hidden" />
            <div class="flex items-center gap-3">
              <button type="button" @click="$refs.logoDarkInput.click()"
                class="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors">
                {{ $t('admin.siteSettings.branding.chooseLogoDark') }}
              </button>
              <span v-if="logoDarkFile" class="text-sm text-neutral-600 dark:text-neutral-400">
                {{ logoDarkFile.name }}
              </span>
            </div>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              {{ $t('admin.siteSettings.branding.logoDarkHelp') }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {{ $t('admin.siteSettings.branding.favicon') }}
            </label>
            <div v-if="settings.site_favicon" class="mb-3">
              <img :src="getImageUrl(settings.site_favicon)" alt="Favicon" class="h-8 object-contain" />
            </div>
            <input ref="faviconInput" type="file" accept="image/*" @change="handleFaviconChange" class="hidden" />
            <div class="flex items-center gap-3">
              <button type="button" @click="$refs.faviconInput.click()"
                class="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors">
                {{ $t('admin.siteSettings.branding.chooseFavicon') }}
              </button>
              <span v-if="faviconFile" class="text-sm text-neutral-600 dark:text-neutral-400">
                {{ faviconFile.name }}
              </span>
            </div>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              {{ $t('admin.siteSettings.branding.faviconHelp') }}
            </p>
          </div>
        </div>

        <!-- SEO Settings -->
        <div v-show="activeTab === 'seo'" class="space-y-8">
          <!-- Basic Meta Tags -->
          <div class="space-y-4">
            <h3
              class="text-lg font-semibold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700 pb-2">
              {{ $t('admin.siteSettings.seo.basicMetaTags') }}
            </h3>

            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {{ $t('admin.siteSettings.seo.metaDescription') }}
              </label>
              <textarea v-model="settings.meta_description" rows="3" maxlength="160"
                class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 transition-colors resize-none"
                :placeholder="$t('admin.siteSettings.seo.metaDescriptionPlaceholder')"></textarea>
              <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {{ (settings.meta_description || '').length }}/160 {{ $t('admin.siteSettings.seo.characters') }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {{ $t('admin.siteSettings.seo.metaKeywords') }}
              </label>
              <input v-model="settings.meta_keywords" type="text"
                class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                :placeholder="$t('admin.siteSettings.seo.metaKeywordsPlaceholder')" />
              <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {{ $t('admin.siteSettings.seo.metaKeywordsHelp') }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {{ $t('admin.siteSettings.seo.metaAuthor') }}
              </label>
              <input v-model="settings.meta_author" type="text"
                class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                :placeholder="$t('admin.siteSettings.seo.metaAuthorPlaceholder')" />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {{ $t('admin.siteSettings.seo.canonicalUrl') }}
              </label>
              <input v-model="settings.canonical_url" type="url"
                class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                :placeholder="$t('admin.siteSettings.seo.canonicalUrlPlaceholder')" />
              <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {{ $t('admin.siteSettings.seo.canonicalUrlHelp') }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {{ $t('admin.siteSettings.seo.robotsMetaTag') }}
              </label>
              <select v-model="settings.robots"
                class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 transition-colors">
                <option value="index, follow">{{ $t('admin.siteSettings.seo.robotsIndexFollow') }}</option>
                <option value="noindex, follow">{{ $t('admin.siteSettings.seo.robotsNoIndexFollow') }}</option>
                <option value="index, nofollow">{{ $t('admin.siteSettings.seo.robotsIndexNoFollow') }}</option>
                <option value="noindex, nofollow">{{ $t('admin.siteSettings.seo.robotsNoIndexNoFollow') }}</option>
              </select>
              <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {{ $t('admin.siteSettings.seo.robotsHelp') }}
              </p>
            </div>
          </div>

          <!-- Open Graph (Facebook) -->
          <div class="space-y-4">
            <h3
              class="text-lg font-semibold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700 pb-2">
              {{ $t('admin.siteSettings.seo.openGraph') }}
            </h3>

            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {{ $t('admin.siteSettings.seo.ogTitle') }}
              </label>
              <input v-model="settings.og_title" type="text"
                class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                :placeholder="$t('admin.siteSettings.seo.ogTitlePlaceholder')" />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {{ $t('admin.siteSettings.seo.ogDescription') }}
              </label>
              <textarea v-model="settings.og_description" rows="3"
                class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 transition-colors resize-none"
                :placeholder="$t('admin.siteSettings.seo.ogDescriptionPlaceholder')"></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {{ $t('admin.siteSettings.seo.ogImage') }}
              </label>
              <div v-if="settings.og_image" class="mb-3">
                <img :src="getImageUrl(settings.og_image)" alt="OG Image"
                  class="h-32 object-cover rounded-lg border border-neutral-200 dark:border-neutral-700" />
              </div>
              <input ref="ogImageInput" type="file" accept="image/*" @change="handleOgImageChange" class="hidden" />
              <div class="flex items-center gap-3">
                <button type="button" @click="$refs.ogImageInput.click()"
                  class="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors">
                  {{ $t('admin.siteSettings.seo.chooseImage') }}
                </button>
                <span v-if="ogImageFile" class="text-sm text-neutral-600 dark:text-neutral-400">
                  {{ ogImageFile.name }}
                </span>
              </div>
              <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {{ $t('admin.siteSettings.seo.ogImageHelp') }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {{ $t('admin.siteSettings.seo.ogType') }}
              </label>
              <select v-model="settings.og_type"
                class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 transition-colors">
                <option value="website">{{ $t('admin.siteSettings.seo.ogTypeWebsite') }}</option>
                <option value="article">{{ $t('admin.siteSettings.seo.ogTypeArticle') }}</option>
                <option value="product">{{ $t('admin.siteSettings.seo.ogTypeProduct') }}</option>
                <option value="profile">{{ $t('admin.siteSettings.seo.ogTypeProfile') }}</option>
              </select>
            </div>
          </div>

          <!-- Twitter Card -->
          <div class="space-y-4">
            <h3
              class="text-lg font-semibold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700 pb-2">
              {{ $t('admin.siteSettings.seo.twitterCard') }}
            </h3>

            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {{ $t('admin.siteSettings.seo.twitterCardType') }}
              </label>
              <select v-model="settings.twitter_card"
                class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 transition-colors">
                <option value="summary">{{ $t('admin.siteSettings.seo.twitterCardSummary') }}</option>
                <option value="summary_large_image">{{ $t('admin.siteSettings.seo.twitterCardLargeImage') }}</option>
                <option value="app">{{ $t('admin.siteSettings.seo.twitterCardApp') }}</option>
                <option value="player">{{ $t('admin.siteSettings.seo.twitterCardPlayer') }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {{ $t('admin.siteSettings.seo.twitterSite') }}
              </label>
              <input v-model="settings.twitter_site" type="text"
                class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                :placeholder="$t('admin.siteSettings.seo.twitterSitePlaceholder')" />
              <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {{ $t('admin.siteSettings.seo.twitterSiteHelp') }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {{ $t('admin.siteSettings.seo.twitterCreator') }}
              </label>
              <input v-model="settings.twitter_creator" type="text"
                class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                :placeholder="$t('admin.siteSettings.seo.twitterCreatorPlaceholder')" />
              <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {{ $t('admin.siteSettings.seo.twitterCreatorHelp') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  @apply w-full px-4 py-3 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all;
}

.textarea-field {
  @apply w-full px-4 py-3 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none;
}

.label-field {
  @apply block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2;
}

.help-text {
  @apply text-xs text-neutral-500 dark:text-neutral-400 mt-1.5;
}

.section-header {
  @apply text-lg font-semibold text-neutral-900 dark:text-white border-b-2 border-neutral-200 dark:border-neutral-700 pb-3 mb-4;
}

.info-box {
  @apply bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { useLocaleStore } from '@/stores/locale'
import api from '@/utils/api'
import { useToast } from '@/composables/useToast'

const toast = useToast()
const localeStore = useLocaleStore()
const $t = localeStore.t
const loading = ref(true)
const saving = ref(false)
const activeTab = ref('general')
const logoFile = ref(null)
const logoLightFile = ref(null)
const logoDarkFile = ref(null)
const faviconFile = ref(null)
const ogImageFile = ref(null)
const logoInput = ref(null)
const logoLightInput = ref(null)
const logoDarkInput = ref(null)
const faviconInput = ref(null)
const ogImageInput = ref(null)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3080'

const tabs = [
  { id: 'general', label: $t('admin.siteSettings.tabs.general') },
  { id: 'landing', label: $t('admin.siteSettings.tabs.landing') },
  { id: 'branding', label: $t('admin.siteSettings.tabs.branding') },
  { id: 'seo', label: $t('admin.siteSettings.tabs.seo') }
]

const settings = ref({
  site_title: '',
  site_description: '',
  site_logo: null,
  site_logo_light: null,
  site_logo_dark: null,
  site_favicon: null,
  hero_title: '',
  hero_subtitle: '',
  hero_cta_text: '',
  meta_keywords: '',
  meta_author: '',
  meta_description: '',
  og_title: '',
  og_description: '',
  og_image: null,
  og_type: 'website',
  twitter_card: 'summary_large_image',
  twitter_site: '',
  twitter_creator: '',
  canonical_url: '',
  robots: 'index, follow',
  footer_text: '',
  enable_registration: true,
  maintenance_mode: false
})

const getImageUrl = (path) => {
  if (!path) return ''
  return path.startsWith('http') ? path : `${API_URL}${path}`
}

const loadSettings = async () => {
  loading.value = true
  try {
    const response = await api.get('/api/settings')

    // Convert array to object
    response.data.settings.forEach(setting => {
      if (setting.setting_type === 'boolean') {
        settings.value[setting.setting_key] = setting.setting_value === 'true'
      } else {
        settings.value[setting.setting_key] = setting.setting_value
      }
    })
  } catch (error) {
    console.error('Failed to load settings:', error)
    toast.error($t('admin.siteSettings.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleLogoChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      toast.error($t('settings.profile.fileSizeError'))
      return
    }
    logoFile.value = file
  }
}

const handleLogoLightChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      toast.error($t('settings.profile.fileSizeError'))
      return
    }
    logoLightFile.value = file
  }
}

const handleLogoDarkChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      toast.error($t('settings.profile.fileSizeError'))
      return
    }
    logoDarkFile.value = file
  }
}

const handleFaviconChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 1 * 1024 * 1024) {
      toast.error($t('settings.profile.fileSizeError'))
      return
    }
    faviconFile.value = file
  }
}

const handleOgImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      toast.error($t('settings.profile.fileSizeError'))
      return
    }
    ogImageFile.value = file
  }
}

const saveAllSettings = async () => {
  saving.value = true
  try {
    // Upload logo if selected
    if (logoFile.value) {
      const formData = new FormData()
      formData.append('logo', logoFile.value)
      
      const uploadResponse = await api.post('/api/settings/upload-logo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (uploadResponse.data && uploadResponse.data.path) {
        settings.value.site_logo = uploadResponse.data.path
      }
    }
    
    // Upload light logo if selected
    if (logoLightFile.value) {
      const formData = new FormData()
      formData.append('logo', logoLightFile.value)
      
      const uploadResponse = await api.post('/api/settings/upload-logo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (uploadResponse.data && uploadResponse.data.path) {
        settings.value.site_logo_light = uploadResponse.data.path
      }
    }
    
    // Upload dark logo if selected
    if (logoDarkFile.value) {
      const formData = new FormData()
      formData.append('logo', logoDarkFile.value)
      
      const uploadResponse = await api.post('/api/settings/upload-logo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (uploadResponse.data && uploadResponse.data.path) {
        settings.value.site_logo_dark = uploadResponse.data.path
      }
    }
    
    // Upload favicon if selected
    if (faviconFile.value) {
      const formData = new FormData()
      formData.append('favicon', faviconFile.value)
      
      const uploadResponse = await api.post('/api/settings/upload-favicon', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (uploadResponse.data && uploadResponse.data.path) {
        settings.value.site_favicon = uploadResponse.data.path
      }
    }
    
    // Upload OG image if selected
    if (ogImageFile.value) {
      const formData = new FormData()
      formData.append('og_image', ogImageFile.value)
      
      const uploadResponse = await api.post('/api/settings/upload-og-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (uploadResponse.data && uploadResponse.data.path) {
        settings.value.og_image = uploadResponse.data.path
      }
    }

    // Prepare settings array
    const settingsArray = Object.entries(settings.value).map(([key, value]) => ({
      key,
      value: typeof value === 'boolean' ? value.toString() : value
    }))

    await api.put('/api/settings', { settings: settingsArray })
    
    // Clear file selections
    logoFile.value = null
    logoLightFile.value = null
    logoDarkFile.value = null
    faviconFile.value = null
    ogImageFile.value = null

    toast.success($t('admin.siteSettings.saveSuccess'))
  } catch (error) {
    console.error('Failed to save settings:', error)
    toast.error($t('admin.siteSettings.saveFailed'))
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  loadSettings()
})
</script>
