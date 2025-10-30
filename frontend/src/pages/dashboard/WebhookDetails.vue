h<template>
  <div class="space-y-6">
    <!-- Back Button -->
    <router-link to="/webhooks"
      class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
      <ArrowLeft class="w-4 h-4" />
      <span>{{ $t('webhookDetails.backToWebhooks') }}</span>
    </router-link>

    <!-- Webhook Info Card -->
    <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
      <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">{{ $t('webhookDetails.webhookId') }}{{ webhookId }}</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Webhook URL -->
        <div>
          <label class="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2 block">{{ $t('webhookDetails.webhookUrl') }}</label>
          <div
            class="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-3">
            <input type="text" :value="webhook.url" readonly
              class="flex-1 bg-transparent text-sm text-neutral-700 dark:text-neutral-300 outline-none" />
            <button @click="copyToClipboard(webhook.url)"
              class="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
              <Copy class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Secret Key -->
        <div>
          <label class="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2 block">{{ $t('webhookDetails.secretKey') }}</label>
          <div
            class="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-3">
            <input type="text" :value="displayedSecret" readonly
              class="flex-1 bg-transparent text-sm text-neutral-700 dark:text-neutral-300 outline-none" />
            <button @click="toggleSecretVisibility"
              class="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              :title="secretVisible ? $t('webhookDetails.hideSecret') : $t('webhookDetails.showSecret')">
              <Eye v-if="!secretVisible" class="w-4 h-4" />
              <EyeOff v-else class="w-4 h-4" />
            </button>
            <button @click="copyToClipboard(webhook.secret)"
              class="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              :title="$t('webhookDetails.copySecret')">
              <Copy class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">{{ $t('webhookDetails.stats.totalRequests') }}</p>
        <p class="text-3xl font-bold text-neutral-900 dark:text-white">{{ stats.total }}</p>
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
        <p class="text-sm font-medium text-green-700 dark:text-green-400 mb-2">{{ $t('webhookDetails.stats.successful') }}</p>
        <p class="text-3xl font-bold text-green-700 dark:text-green-400">{{ stats.successful }}</p>
      </div>

      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
        <p class="text-sm font-medium text-red-700 dark:text-red-400 mb-2">{{ $t('webhookDetails.stats.failed') }}</p>
        <p class="text-3xl font-bold text-red-700 dark:text-red-400">{{ stats.failed }}</p>
      </div>

      <div class="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
        <p class="text-sm font-medium text-purple-700 dark:text-purple-400 mb-2">{{ $t('webhookDetails.stats.successRate') }}</p>
        <p class="text-3xl font-bold text-purple-700 dark:text-purple-400">{{ stats.successRate }}%</p>
      </div>
    </div>

    <!-- Recent Logs -->
    <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
      <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-6">{{ $t('webhookDetails.recentLogs') }}</h2>

      <!-- Empty State -->
      <div v-if="logs.length === 0" class="text-center py-12">
        <FileText class="w-16 h-16 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
        <p class="text-neutral-600 dark:text-neutral-400">{{ $t('webhookDetails.noLogs') }}</p>
      </div>

      <!-- Logs List -->
      <div v-else class="space-y-3">
        <div v-for="log in logs" :key="log.id"
          class="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:shadow-md transition-shadow">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full flex items-center justify-center"
              :class="log.status === 'success' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'">
              <CheckCircle v-if="log.status === 'success'" class="w-5 h-5 text-green-600 dark:text-green-400" />
              <XCircle v-else class="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p class="text-sm font-medium text-neutral-900 dark:text-white">{{ log.method }} {{ log.endpoint }}</p>
              <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ log.timestamp }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="px-3 py-1 text-xs font-medium rounded-full"
              :class="log.status === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'">
              {{ log.statusCode }}
            </span>
            <router-link :to="`/webhooks/${webhookId}/logs/${log.id}`"
              class="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
              <Eye class="w-4 h-4" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, Copy, FileText, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-vue-next'
import api from '@/utils/api'
import { useToast } from '@/composables/useToast'
import { useLocaleStore } from '@/stores/locale'

const route = useRoute()
const toast = useToast()
const localeStore = useLocaleStore()
const $t = localeStore.t
const webhookId = ref(route.params.id)
const loading = ref(false)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3080'

const webhook = ref({
  url: '',
  secret: '',
  url_key: ''
})

const secretVisible = ref(false)

const stats = ref({
  total: 0,
  successful: 0,
  failed: 0,
  successRate: 0
})

const logs = ref([])

const displayedSecret = computed(() => {
  return secretVisible.value ? webhook.value.secret : '••••••••••••••••••••••••••••••••'
})

const toggleSecretVisibility = () => {
  secretVisible.value = !secretVisible.value
}

// Fetch webhook details
const fetchWebhook = async () => {
  try {
    const response = await api.get(`/api/webhooks/${webhookId.value}`)
    const data = response.data.webhook
    webhook.value = {
      url: `${API_URL}/webhook/${data.url_key}`,
      secret: data.secret || data.secret_key || '',
      url_key: data.url_key
    }
  } catch (error) {
    console.error('Failed to fetch webhook:', error)
    toast.error($t('webhookDetails.loadFailed'))
  }
}

// Fetch webhook stats
const fetchStats = async () => {
  try {
    const response = await api.get(`/api/webhooks/${webhookId.value}/stats`)
    const data = response.data.stats
    console.log('📊 Stats from API:', data)
    
    // Combine failed and invalid_signature as total failures
    const totalFailed = (data.failed || 0) + (data.invalid_signature || 0)
    
    stats.value = {
      total: data.total_requests || 0,
      successful: data.successful || 0,
      failed: totalFailed,
      successRate: data.total_requests > 0
        ? Math.round((data.successful / data.total_requests) * 100)
        : 0
    }
    console.log('📊 Stats displayed:', stats.value)
  } catch (error) {
    console.error('Failed to fetch stats:', error)
    toast.error($t('webhookDetails.statsFailed'))
  }
}

// Fetch webhook logs
const fetchLogs = async () => {
  loading.value = true
  try {
    const response = await api.get(`/api/webhooks/${webhookId.value}/logs?page=1&limit=10`)
    logs.value = response.data.logs.map(log => ({
      id: log.id,
      method: log.method || 'POST',
      endpoint: log.path || '/',
      timestamp: new Date(log.created_at).toLocaleString(),
      status: log.status,
      statusCode: log.status === 'success' ? '200' : '500'
    }))
  } catch (error) {
    console.error('Failed to fetch logs:', error)
    toast.error($t('webhookDetails.logsFailed'))
  } finally {
    loading.value = false
  }
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success($t('webhookDetails.copySuccess'))
  }).catch(() => {
    toast.error($t('webhookDetails.copyFailed'))
  })
}

onMounted(async () => {
  await fetchWebhook()
  await fetchStats()
  await fetchLogs()
})
</script>
