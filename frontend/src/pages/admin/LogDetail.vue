<template>
  <div class="space-y-6">
    <!-- Back Button -->
    <router-link
      :to="`/admin/webhooks/${webhookId}`"
      class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
    >
      <ArrowLeft class="w-4 h-4" />
      <span>Back to Webhook Details</span>
    </router-link>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="text-neutral-600 dark:text-neutral-400 mt-4">Loading log details...</p>
    </div>

    <template v-else-if="log">
      <!-- Log Header -->
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Log #{{ logId }}</h1>
          <span
            class="px-4 py-2 text-sm font-medium rounded-full"
            :class="log.status === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'"
          >
            {{ log.status }}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span class="text-neutral-600 dark:text-neutral-400">Timestamp:</span>
            <p class="font-medium text-neutral-900 dark:text-white mt-1">{{ formatDate(log.created_at) }}</p>
          </div>
          <div>
            <span class="text-neutral-600 dark:text-neutral-400">IP Address:</span>
            <p class="font-medium text-neutral-900 dark:text-white mt-1">{{ log.ip }}</p>
          </div>
          <div>
            <span class="text-neutral-600 dark:text-neutral-400">Attempts:</span>
            <p class="font-medium text-neutral-900 dark:text-white mt-1">{{ log.attempts }}</p>
          </div>
        </div>

        <div v-if="log.last_error" class="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p class="text-sm font-medium text-red-700 dark:text-red-400 mb-1">Error:</p>
          <p class="text-sm text-red-600 dark:text-red-300">{{ log.last_error }}</p>
        </div>
      </div>

      <!-- Payload Visualization -->
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-6">Payload Data</h2>

        <!-- Render different types of data -->
        <div class="space-y-6">
          <!-- Uploaded Files (Images & Videos) -->
          <div v-if="hasUploadedFiles" class="space-y-4">
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Uploaded Files</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="(file, index) in uploadedFiles"
                :key="index"
                class="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4"
              >
                <!-- Image -->
                <div v-if="file.type === 'image'" class="space-y-2">
                  <img 
                    :src="file.url" 
                    :alt="file.originalName" 
                    class="w-full h-auto rounded-lg shadow-lg"
                  />
                  <div class="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
                    <span>{{ file.originalName }}</span>
                    <span>{{ (file.size / 1024).toFixed(2) }} KB</span>
                  </div>
                </div>
                
                <!-- Video -->
                <div v-else-if="file.type === 'video'" class="space-y-2">
                  <video 
                    :src="file.url" 
                    controls 
                    preload="metadata"
                    class="w-full h-auto rounded-lg shadow-lg"
                    @error="(e) => console.error('Video load error:', e, 'URL:', file.url)"
                    @loadedmetadata="() => console.log('Video loaded:', file.url)"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div class="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
                    <span>{{ file.originalName }}</span>
                    <span>{{ (file.size / 1024 / 1024).toFixed(2) }} MB</span>
                  </div>
                  <div class="text-xs text-neutral-500 dark:text-neutral-400 font-mono break-all">
                    URL: {{ file.url }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Image Data (Base64 or URL) -->
          <div v-if="hasImageData" class="space-y-4">
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Image</h3>
            <div class="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
              <img 
                :src="imageDataUrl" 
                alt="Webhook Image" 
                class="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          <!-- Text/String Data -->
          <div v-if="hasTextData" class="space-y-4">
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Text Data</h3>
            <div class="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
              <pre class="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">{{ textData }}</pre>
            </div>
          </div>

          <!-- Structured Data (Objects/Arrays) -->
          <div v-if="hasStructuredData" class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Structured Data</h3>
              <button
                @click="copyPayload"
                class="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <Copy class="w-4 h-4" />
                Copy JSON
              </button>
            </div>
            <div class="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 overflow-x-auto">
              <pre class="text-sm text-neutral-700 dark:text-neutral-300">{{ formattedPayload }}</pre>
            </div>
          </div>

          <!-- Key-Value Pairs -->
          <div v-if="keyValuePairs.length > 0" class="space-y-4">
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Fields</h3>
            <div class="grid grid-cols-1 gap-3">
              <div
                v-for="(item, index) in keyValuePairs"
                :key="index"
                class="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4"
              >
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">{{ item.key }}</p>
                    <p class="text-sm text-neutral-900 dark:text-white break-all">{{ item.value }}</p>
                  </div>
                  <span
                    class="px-2 py-1 text-xs font-medium rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                  >
                    {{ item.type }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, Copy } from 'lucide-vue-next'
import api from '@/utils/api'
import { useToast } from '@/composables/useToast'

const route = useRoute()
const toast = useToast()
const webhookId = ref(route.params.id)
const logId = ref(route.params.logId)
const loading = ref(false)
const log = ref(null)

// Fetch log details
const fetchLogDetail = async () => {
  loading.value = true
  try {
    const response = await api.get(`/api/webhooks/${webhookId.value}/logs/${logId.value}`)
    log.value = response.data.log
  } catch (error) {
    console.error('Failed to fetch log detail:', error)
    toast.error('Failed to load log details')
  } finally {
    loading.value = false
  }
}

// Check if payload contains uploaded files
const hasUploadedFiles = computed(() => {
  if (!log.value?.payload) return false
  return log.value.payload.files && Array.isArray(log.value.payload.files) && log.value.payload.files.length > 0
})

// Get uploaded files
const uploadedFiles = computed(() => {
  if (!hasUploadedFiles.value) return []
  console.log('Uploaded files:', log.value.payload.files)
  return log.value.payload.files
})

// Check if payload contains image data (base64 or URL)
const hasImageData = computed(() => {
  if (!log.value?.payload) return false
  const payload = log.value.payload
  
  // Check for base64 image or URL
  if (typeof payload === 'object') {
    return payload.image || payload.screenshot || payload.photo || payload.picture
  }
  
  return false
})

// Get image data URL
const imageDataUrl = computed(() => {
  if (!hasImageData.value) return ''
  
  const payload = log.value.payload
  const imageData = payload.image || payload.screenshot || payload.photo || payload.picture
  
  // If it's already a data URL
  if (typeof imageData === 'string' && imageData.startsWith('data:')) {
    return imageData
  }
  
  // If it's a regular URL
  if (typeof imageData === 'string' && (imageData.startsWith('http://') || imageData.startsWith('https://'))) {
    return imageData
  }
  
  // If it's base64 without prefix
  if (typeof imageData === 'string') {
    return `data:image/png;base64,${imageData}`
  }
  
  return ''
})

// Check if payload has text data
const hasTextData = computed(() => {
  if (!log.value?.payload) return false
  const payload = log.value.payload
  
  if (typeof payload === 'object') {
    return payload.text || payload.message || payload.content || payload.description
  }
  
  return typeof payload === 'string'
})

// Get text data
const textData = computed(() => {
  if (!hasTextData.value) return ''
  
  const payload = log.value.payload
  
  if (typeof payload === 'string') return payload
  
  return payload.text || payload.message || payload.content || payload.description || ''
})

// Check if payload has structured data
const hasStructuredData = computed(() => {
  if (!log.value?.payload) return false
  return typeof log.value.payload === 'object'
})

// Format payload as JSON
const formattedPayload = computed(() => {
  if (!log.value?.payload) return ''
  return JSON.stringify(log.value.payload, null, 2)
})

// Extract key-value pairs
const keyValuePairs = computed(() => {
  if (!log.value?.payload || typeof log.value.payload !== 'object') return []
  
  const pairs = []
  const payload = log.value.payload
  
  // Skip image fields, files array, and large data
  const skipKeys = ['image', 'screenshot', 'photo', 'picture', 'files']
  
  for (const [key, value] of Object.entries(payload)) {
    if (skipKeys.includes(key)) continue
    
    let displayValue = value
    let type = typeof value
    
    if (value === null) {
      displayValue = 'null'
      type = 'null'
    } else if (Array.isArray(value)) {
      displayValue = JSON.stringify(value)
      type = 'array'
    } else if (typeof value === 'object') {
      displayValue = JSON.stringify(value)
      type = 'object'
    } else if (typeof value === 'boolean') {
      displayValue = value.toString()
      type = 'boolean'
    } else if (typeof value === 'number') {
      displayValue = value.toString()
      type = 'number'
    } else {
      displayValue = String(value)
      type = 'string'
    }
    
    pairs.push({ key, value: displayValue, type })
  }
  
  return pairs
})

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// Copy payload to clipboard
const copyPayload = () => {
  navigator.clipboard.writeText(formattedPayload.value).then(() => {
    toast.success('Payload copied to clipboard!')
  }).catch(() => {
    toast.error('Failed to copy')
  })
}

onMounted(() => {
  fetchLogDetail()
})
</script>
