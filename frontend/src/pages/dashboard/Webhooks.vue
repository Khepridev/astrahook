<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">{{ $t('webhooks.title') }}</h1>
      <button @click="createWebhook" :disabled="loading"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50">
        <Plus class="w-4 h-4" />
        <span>{{ $t('webhooks.createWebhook') }}</span>
      </button>
    </div>

    <!-- Webhooks Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="webhook in webhooks" :key="webhook.id"
        class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 hover:shadow-lg transition-shadow">
        <!-- Header -->
        <div class="flex items-start justify-between mb-4">
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">{{ webhook.name }}</h3>
          <button @click="deleteWebhook(webhook.id)" class="text-red-500 hover:text-red-600 transition-colors">
            <Trash2 class="w-4 h-4" />
          </button>
        </div>

        <!-- Webhook URL -->
        <div class="mb-4">
          <label class="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1 block">{{
            $t('webhooks.webhookUrl') }}</label>
          <div
            class="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2">
            <input type="text" :value="webhook.url" readonly
              class="flex-1 bg-transparent text-sm text-neutral-700 dark:text-neutral-300 outline-none truncate" />
            <button @click="copyToClipboard(webhook.url)"
              class="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
              <Copy class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Secret Key -->
        <div class="mb-4">
          <label class="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1 block">{{
            $t('webhooks.secretKey') }}</label>
          <div
            class="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2">
            <input type="text" :value="getDisplayedSecret(webhook)" readonly
              class="flex-1 bg-transparent text-sm text-neutral-700 dark:text-neutral-300 outline-none" />
            <button @click="toggleSecretVisibility(webhook.id)"
              class="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              :title="secretVisibility[webhook.id] ? $t('webhooks.hideSecret') : $t('webhooks.showSecret')">
              <Eye v-if="!secretVisibility[webhook.id]" class="w-4 h-4" />
              <EyeOff v-else class="w-4 h-4" />
            </button>
            <button @click="copyToClipboard(webhook.secret)"
              class="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              :title="$t('webhooks.copySecret')">
              <Copy class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Created Date -->
        <p class="text-xs text-neutral-500 dark:text-neutral-400 mb-4">{{ $t('webhooks.created') }}: {{ webhook.created
        }}</p>

        <!-- Actions -->
        <div class="flex gap-2">
          <router-link :to="`/webhooks/${webhook.id}`"
            class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors text-center">
            {{ $t('webhooks.viewLogs') }}
          </router-link>
          <button @click="openJsonModal(webhook)"
            class="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
            <FileJson class="w-4 h-4" />
            {{ $t('webhooks.viewJson') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && webhooks.length === 0" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="text-neutral-600 dark:text-neutral-400 mt-4">{{ $t('webhooks.loading') }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="webhooks.length === 0" class="text-center py-12">
      <Webhook class="w-16 h-16 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-2">{{ $t('webhooks.empty.title') }}</h3>
      <p class="text-neutral-600 dark:text-neutral-400 mb-4">{{ $t('webhooks.empty.description') }}</p>
      <button @click="createWebhook"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
        {{ $t('webhooks.empty.button') }}
      </button>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      @click="showDeleteModal = false">
      <div class="bg-white dark:bg-neutral-900 rounded-xl shadow-2xl max-w-md w-full" @click.stop>
        <!-- Modal Header -->
        <div class="p-6 border-b border-neutral-200 dark:border-neutral-800">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <Trash2 class="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-neutral-900 dark:text-white">{{ $t('webhooks.delete.title') }}</h2>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">{{ $t('webhooks.delete.subtitle') }}</p>
            </div>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <p class="text-neutral-700 dark:text-neutral-300 mb-4">
            {{ deleteMessage }}
          </p>
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            {{ $t('webhooks.delete.warning') }}
          </p>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t border-neutral-200 dark:border-neutral-800">
          <button @click="showDeleteModal = false"
            class="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors">
            {{ $t('webhooks.delete.cancel') }}
          </button>
          <button @click="confirmDelete"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2">
            <Trash2 class="w-4 h-4" />
            {{ $t('webhooks.delete.confirm') }}
          </button>
        </div>
      </div>
    </div>

    <!-- JSON Modal -->
    <div v-if="showJsonModal"
      class="!mt-0 fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click="closeJsonModal">
      <div
        class="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden"
        @click.stop>

        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <div class="flex-1 min-w-0 mr-3">
            <h2 class="text-lg font-bold text-neutral-900 dark:text-white">{{ $t('webhooks.json.title') }}</h2>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 truncate">{{ selectedWebhook?.url }}</p>
          </div>
          <button @click="closeJsonModal"
            class="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
            <X class="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
          </button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-3 p-3 bg-neutral-50 dark:bg-neutral-900/50">
          <div class="bg-white dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700">
            <p class="text-xs text-neutral-600 dark:text-neutral-400 mb-1">{{ $t('webhooks.json.totalLogs') }}</p>
            <p class="text-xl font-bold text-neutral-900 dark:text-white">{{ jsonData.pagination.total }}</p>
          </div>
          <div class="bg-white dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700">
            <p class="text-xs text-neutral-600 dark:text-neutral-400 mb-1">{{ $t('webhooks.json.currentPage') }}</p>
            <p class="text-xl font-bold text-neutral-900 dark:text-white">{{ jsonData.pagination.page }}</p>
          </div>
          <div class="bg-white dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700">
            <p class="text-xs text-neutral-600 dark:text-neutral-400 mb-1">{{ $t('webhooks.json.totalPages') }}</p>
            <p class="text-xl font-bold text-neutral-900 dark:text-white">{{ jsonData.pagination.pages }}</p>
          </div>
        </div>

        <!-- JSON Content -->
        <div class="flex-1 overflow-y-auto p-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{{ $t('webhooks.json.jsonResponse')
            }}</h3>
            <button @click="copyJsonToClipboard"
              class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors">
              <Copy class="w-3.5 h-3.5" />
              {{ $t('webhooks.json.copyFullJson') }}
            </button>
          </div>
          <div class="bg-neutral-900 dark:bg-black rounded-lg p-4 overflow-x-auto">
            <pre class="text-xs text-green-400 font-mono"><code>{{ formattedJson }}</code></pre>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
          <button @click="refreshJson"
            class="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <RefreshCw class="w-4 h-4" />
            {{ $t('webhooks.json.refresh') }}
          </button>
          <button @click="closeJsonModal"
            class="px-4 py-2 text-sm font-medium bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors">
            {{ $t('webhooks.json.close') }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Plus, Trash2, Copy, Webhook, FileJson, X, RefreshCw, Eye, EyeOff } from 'lucide-vue-next'
import api from '@/utils/api'
import { useToast } from '@/composables/useToast'
import { useLocaleStore } from '@/stores/locale'

const localeStore = useLocaleStore()
const $t = localeStore.t
const toast = useToast()
const webhooks = ref([])
const loading = ref(false)
const showJsonModal = ref(false)
const showDeleteModal = ref(false)
const webhookToDelete = ref(null)
const selectedWebhook = ref(null)
const secretVisibility = ref({}) // Track visibility for each webhook
const jsonData = ref({
  success: true,
  webhook: {},
  logs: [],
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    pages: 1
  }
})

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3080'

const formattedJson = computed(() => {
  return JSON.stringify(jsonData.value, null, 2)
})

const deleteMessage = computed(() => {
  const message = $t('webhooks.delete.message')
  return message.replace('ID', webhookToDelete.value?.id || '')
})

// Fetch webhooks from API
const fetchWebhooks = async () => {
  loading.value = true
  try {
    const response = await api.get('/api/webhooks')
    webhooks.value = response.data.webhooks.map(webhook => ({
      id: webhook.id,
      name: `Webhook #${webhook.id}`,
      url: `${API_URL}/webhook/${webhook.url_key}`,
      url_key: webhook.url_key,
      secret: webhook.secret || webhook.secret_key || '',
      created: new Date(webhook.created_at).toLocaleDateString('en-GB')
    }))
    // Initialize visibility state for all webhooks
    webhooks.value.forEach(webhook => {
      secretVisibility.value[webhook.id] = false
    })
  } catch (error) {
    console.error('Failed to fetch webhooks:', error)
    toast.error($t('webhooks.loadFailed'))
  } finally {
    loading.value = false
  }
}

// Toggle secret visibility
const toggleSecretVisibility = (webhookId) => {
  secretVisibility.value[webhookId] = !secretVisibility.value[webhookId]
}

// Get displayed secret (masked or real)
const getDisplayedSecret = (webhook) => {
  return secretVisibility.value[webhook.id] ? webhook.secret : '••••••••••••••••••••••••••••••••'
}

// Create new webhook
const createWebhook = async () => {
  try {
    const response = await api.post('/api/webhooks')
    toast.success($t('webhooks.createSuccess'))
    await fetchWebhooks()
  } catch (error) {
    console.error('Failed to create webhook:', error)
    toast.error($t('webhooks.createFailed'))
  }
}

// Show delete confirmation modal
const deleteWebhook = (webhookId) => {
  webhookToDelete.value = webhooks.value.find(w => w.id === webhookId)
  showDeleteModal.value = true
}

// Confirm delete webhook
const confirmDelete = async () => {
  if (!webhookToDelete.value) return

  try {
    await api.delete(`/api/webhooks/${webhookToDelete.value.id}`)
    toast.success($t('webhooks.delete.success'))
    showDeleteModal.value = false
    webhookToDelete.value = null
    await fetchWebhooks()
  } catch (error) {
    console.error('Failed to delete webhook:', error)
    toast.error($t('webhooks.delete.failed'))
    showDeleteModal.value = false
    webhookToDelete.value = null
  }
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success($t('webhooks.copyToClipboard'))
  }).catch(() => {
    toast.error($t('webhooks.copyFailed'))
  })
}

const openJsonModal = async (webhook) => {
  selectedWebhook.value = webhook
  showJsonModal.value = true

  try {
    const response = await api.get(`/api/webhooks/${webhook.id}/logs?page=1&limit=20`)
    jsonData.value = {
      success: true,
      webhook: {
        url_key: webhook.url_key,
        created_at: webhook.created
      },
      logs: response.data.logs,
      pagination: response.data.pagination
    }
  } catch (error) {
    console.error('Failed to fetch logs:', error)
    toast.error($t('webhooks.json.loadFailed'))
  }
}

const closeJsonModal = () => {
  showJsonModal.value = false
  selectedWebhook.value = null
}

const copyJsonToClipboard = () => {
  navigator.clipboard.writeText(formattedJson.value).then(() => {
    toast.success($t('webhooks.json.copied'))
  }).catch(() => {
    toast.error($t('webhooks.copyFailed'))
  })
}

const refreshJson = async () => {
  if (!selectedWebhook.value) return

  try {
    const response = await api.get(`/api/webhooks/${selectedWebhook.value.id}/logs?page=1&limit=20`)
    jsonData.value = {
      success: true,
      webhook: {
        url_key: selectedWebhook.value.url_key,
        created_at: selectedWebhook.value.created
      },
      logs: response.data.logs,
      pagination: response.data.pagination
    }
    toast.success($t('webhooks.json.refreshed'))
  } catch (error) {
    console.error('Failed to refresh logs:', error)
    toast.error($t('webhooks.json.refreshFailed'))
  }
}

onMounted(() => {
  fetchWebhooks()
})
</script>
