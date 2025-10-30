<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">{{ $t('dashboard.title') }}</h1>
      <p class="text-neutral-600 dark:text-neutral-400 mt-1">{{ $t('dashboard.welcome') }}</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Webhooks -->
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-neutral-600 dark:text-neutral-400">{{ $t('dashboard.stats.totalWebhooks') }}</h3>
          <Webhook class="w-5 h-5 text-blue-500" />
        </div>
        <p v-if="loading" class="text-3xl font-bold text-neutral-400 dark:text-neutral-600 animate-pulse">...</p>
        <p v-else class="text-3xl font-bold text-neutral-900 dark:text-white">{{ stats.totalWebhooks }}</p>
      </div>

      <!-- Active Webhooks -->
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-neutral-600 dark:text-neutral-400">{{ $t('dashboard.stats.active') }}</h3>
          <Activity class="w-5 h-5 text-green-500" />
        </div>
        <p v-if="loading" class="text-3xl font-bold text-neutral-400 dark:text-neutral-600 animate-pulse">...</p>
        <p v-else class="text-3xl font-bold text-neutral-900 dark:text-white">{{ stats.activeWebhooks }}</p>
      </div>

      <!-- Total Requests -->
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-neutral-600 dark:text-neutral-400">{{ $t('dashboard.stats.totalRequests') }}</h3>
          <TrendingUp class="w-5 h-5 text-purple-500" />
        </div>
        <p v-if="loading" class="text-3xl font-bold text-neutral-400 dark:text-neutral-600 animate-pulse">...</p>
        <p v-else class="text-3xl font-bold text-neutral-900 dark:text-white">{{ stats.totalRequests }}</p>
      </div>

      <!-- Success Rate -->
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-neutral-600 dark:text-neutral-400">{{ $t('dashboard.stats.successRate') }}</h3>
          <CheckCircle class="w-5 h-5 text-emerald-500" />
        </div>
        <p v-if="loading" class="text-3xl font-bold text-neutral-400 dark:text-neutral-600 animate-pulse">...</p>
        <p v-else class="text-3xl font-bold text-neutral-900 dark:text-white">{{ stats.successRate }}%</p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
      <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">{{ $t('dashboard.quickActions.title') }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <router-link to="/webhooks"
          class="flex items-center gap-3 p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
          <div class="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <Webhook class="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p class="font-medium text-neutral-900 dark:text-white">{{ $t('dashboard.quickActions.viewWebhooks') }}</p>
            <p class="text-xs text-neutral-600 dark:text-neutral-400">{{ $t('dashboard.quickActions.manageWebhooks') }}</p>
          </div>
        </router-link>

        <router-link to="/docs"
          class="flex items-center gap-3 p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
          <div class="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <FileText class="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <p class="font-medium text-neutral-900 dark:text-white">{{ $t('dashboard.quickActions.documentation') }}</p>
            <p class="text-xs text-neutral-600 dark:text-neutral-400">{{ $t('dashboard.quickActions.learnHowToUse') }}</p>
          </div>
        </router-link>

        <router-link to="/settings"
          class="flex items-center gap-3 p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
          <div class="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
            <Settings class="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p class="font-medium text-neutral-900 dark:text-white">{{ $t('dashboard.quickActions.settings') }}</p>
            <p class="text-xs text-neutral-600 dark:text-neutral-400">{{ $t('dashboard.quickActions.configureAccount') }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  Webhook,
  Activity,
  TrendingUp,
  CheckCircle,
  FileText,
  Settings
} from 'lucide-vue-next'
import api from '@/utils/api'
import { useToast } from '@/composables/useToast'
import { useLocaleStore } from '@/stores/locale'

const localeStore = useLocaleStore()
const $t = localeStore.t
const toast = useToast()
const loading = ref(false)

const stats = ref({
  totalWebhooks: 0,
  activeWebhooks: 0,
  totalRequests: 0,
  successRate: 0
})

// Fetch dashboard statistics
const fetchDashboardStats = async () => {
  loading.value = true
  try {
    // Fetch all webhooks
    const webhooksResponse = await api.get('/api/webhooks')
    const webhooks = webhooksResponse.data.webhooks

    stats.value.totalWebhooks = webhooks.length
    stats.value.activeWebhooks = webhooks.length // All webhooks are active by default

    // Fetch stats for each webhook and aggregate
    let totalRequests = 0
    let totalSuccessful = 0

    for (const webhook of webhooks) {
      try {
        const statsResponse = await api.get(`/api/webhooks/${webhook.id}/stats`)
        const webhookStats = statsResponse.data.stats

        totalRequests += webhookStats.total_requests || 0
        totalSuccessful += webhookStats.successful || 0
      } catch (error) {
        console.error(`Failed to fetch stats for webhook ${webhook.id}:`, error)
      }
    }

    stats.value.totalRequests = totalRequests
    stats.value.successRate = totalRequests > 0
      ? Math.round((totalSuccessful / totalRequests) * 100)
      : 0

  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error)
    toast.error($t('dashboard.loadingStats'))
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDashboardStats()
})
</script>
