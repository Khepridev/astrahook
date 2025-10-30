<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">{{ $t('admin.webhooks.title') }}</h1>
        <p class="text-neutral-600 dark:text-neutral-400 mt-1">{{ $t('admin.webhooks.subtitle') }}</p>
      </div>
      <div class="text-sm text-neutral-600 dark:text-neutral-400">
        {{ $t('admin.webhooks.totalWebhooks') }}: <span class="font-semibold text-neutral-900 dark:text-white">{{ webhooks.length }}</span>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium text-neutral-600 dark:text-neutral-400">{{ $t('admin.webhooks.stats.totalWebhooks') }}</h3>
          <Webhook class="w-5 h-5 text-blue-500" />
        </div>
        <p class="text-3xl font-bold text-neutral-900 dark:text-white">{{ stats.total_webhooks }}</p>
      </div>

      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium text-neutral-600 dark:text-neutral-400">{{ $t('admin.webhooks.stats.active') }}</h3>
          <Activity class="w-5 h-5 text-green-500" />
        </div>
        <p class="text-3xl font-bold text-neutral-900 dark:text-white">{{ activeWebhooks }}</p>
      </div>

      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium text-neutral-600 dark:text-neutral-400">{{ $t('admin.webhooks.stats.totalRequests') }}</h3>
          <TrendingUp class="w-5 h-5 text-purple-500" />
        </div>
        <p class="text-3xl font-bold text-neutral-900 dark:text-white">{{ stats.total_requests || 0 }}</p>
      </div>

      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium text-neutral-600 dark:text-neutral-400">{{ $t('admin.webhooks.stats.successRate') }}</h3>
          <CheckCircle class="w-5 h-5 text-emerald-500" />
        </div>
        <p class="text-3xl font-bold text-neutral-900 dark:text-white">{{ stats.success_rate || 0 }}%</p>
      </div>
    </div>

    <!-- Webhooks Table -->
    <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                {{ $t('admin.webhooks.table.webhook') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                {{ $t('admin.webhooks.table.owner') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                {{ $t('admin.webhooks.table.url') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                {{ $t('admin.webhooks.table.status') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                {{ $t('admin.webhooks.table.requests') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                {{ $t('admin.webhooks.table.created') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                {{ $t('admin.webhooks.table.actions') }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200 dark:divide-neutral-800">
            <tr v-for="webhook in webhooks" :key="webhook.id" class="hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm font-medium text-neutral-900 dark:text-white">{{ webhook.name }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <UserAvatar 
                    :avatar-url="webhook.owner_avatar"
                    :username="webhook.owner_username || webhook.owner"
                    size="sm"
                  />
                  <p class="text-sm text-neutral-700 dark:text-neutral-300">{{ webhook.owner_username || webhook.owner }}</p>
                </div>
              </td>
              <td class="px-6 py-4">
                <p class="text-xs text-neutral-600 dark:text-neutral-400 font-mono truncate max-w-xs">
                  {{ webhook.url }}
                </p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="webhook.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'"
                >
                  {{ $t(`admin.webhooks.status.${webhook.status}`) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-neutral-700 dark:text-neutral-300">{{ webhook.requests }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-neutral-600 dark:text-neutral-400">{{ webhook.created }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <button 
                    @click="viewDetails(webhook)"
                    class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye class="w-4 h-4" />
                  </button>
                  <button 
                    @click="deleteWebhook(webhook)"
                    class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete Webhook"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Webhook, Activity, TrendingUp, CheckCircle, Eye, Trash2 } from 'lucide-vue-next'
import { useLocaleStore } from '@/stores/locale'
import UserAvatar from '@/components/common/UserAvatar.vue'
import api from '@/utils/api'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const localeStore = useLocaleStore()
const $t = localeStore.t
const loading = ref(false)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3080'

const webhooks = ref([])
const stats = ref({
  total_webhooks: 0,
  total_requests: 0,
  successful: 0,
  success_rate: 0
})

const activeWebhooks = computed(() => {
  return webhooks.value.length
})

// Fetch webhooks from backend
const fetchWebhooks = async () => {
  loading.value = true
  try {
    const userId = route.query.userId
    const url = userId ? `/api/admin/webhooks?userId=${userId}` : '/api/admin/webhooks'
    const response = await api.get(url)
    
    webhooks.value = response.data.webhooks.map(webhook => ({
      id: webhook.id,
      name: `Webhook #${webhook.id}`,
      owner: webhook.user_email,
      owner_username: webhook.user_username,
      owner_avatar: webhook.user_avatar_url,
      url: `${API_URL}/webhook/${webhook.url_key}`,
      status: 'active',
      requests: 0,
      created: new Date(webhook.created_at).toLocaleDateString('en-GB'),
      url_key: webhook.url_key
    }))
  } catch (error) {
    console.error('Failed to fetch webhooks:', error)
    toast.error($t('admin.webhooks.loadFailed'))
  } finally {
    loading.value = false
  }
}

// Fetch webhook statistics
const fetchStats = async () => {
  try {
    const response = await api.get('/api/admin/webhooks/stats')
    stats.value = response.data.stats
  } catch (error) {
    console.error('Failed to fetch stats:', error)
  }
}

const viewDetails = (webhook) => {
  router.push(`/admin/webhooks/${webhook.id}`)
}

const deleteWebhook = async (webhook) => {
  if (!confirm(`${$t('admin.webhooks.deleteConfirm')} ${webhook.name}?`)) return

  try {
    await api.delete(`/api/admin/webhooks/${webhook.id}`)
    toast.success($t('admin.webhooks.deleteSuccess'))
    await fetchWebhooks()
    await fetchStats()
  } catch (error) {
    console.error('Failed to delete webhook:', error)
    toast.error($t('admin.webhooks.deleteFailed'))
  }
}

onMounted(async () => {
  await fetchWebhooks()
  await fetchStats()
})
</script>
