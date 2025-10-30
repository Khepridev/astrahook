<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-6">
    <div class="max-w-[1800px] mx-auto bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-lg">
      <!-- Top Bar -->
      <div class="border-b border-neutral-200 dark:border-neutral-800 rounded-t-xl">
        <div class="flex items-center justify-between px-6 py-3">
          <!-- Left -->
          <div class="flex items-center gap-4">
            <button @click="router.push('/admin/company-pages')"
              class="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
              <ArrowLeft class="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
            <div class="flex items-center gap-3">
              <FileText class="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              <div>
                <h1 class="text-sm font-semibold text-neutral-900 dark:text-white">
                  {{ form.title || 'Untitled Page' }}
                </h1>
                <p class="text-xs text-neutral-500 dark:text-neutral-400">
                  {{ isEditMode ? 'Editing company page' : 'Creating new page' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Right -->
          <div class="flex items-center gap-3">
            <button @click="showPreview = !showPreview" :class="[
              'px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-2',
              showPreview
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            ]">
              <Eye class="w-4 h-4" />
              Preview
            </button>
            <div class="w-px h-6 bg-neutral-200 dark:bg-neutral-700"></div>
            <button @click="router.push('/admin/company-pages')"
              class="px-4 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors">
              Cancel
            </button>
            <button @click="handleSubmit"
              :disabled="!form.title || !form.slug || !form.content || saving"
              class="px-4 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              <Save class="w-4 h-4" />
              {{ saving ? 'Saving...' : (isEditMode ? 'Update' : 'Publish') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Editor Layout -->
      <div class="flex min-h-[600px]">
        <!-- Left Sidebar - Metadata -->
        <div class="w-80 border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto">
          <div class="p-6 space-y-6">
            <div>
              <h2 class="text-sm font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                <Settings class="w-4 h-4" />
                Page Settings
              </h2>

              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">Title *</label>
                  <input v-model="form.title" type="text"
                    class="w-full px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    placeholder="About Us" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">Slug *</label>
                  <input v-model="form.slug" type="text"
                    class="w-full px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 font-mono"
                    placeholder="about-us" />
                  <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5">
                    <span class="opacity-60">URL:</span> /company/<span class="font-medium">{{ form.slug || 'slug' }}</span>
                  </p>
                </div>

                <div>
                  <label class="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">Meta Description</label>
                  <textarea v-model="form.meta_description" rows="3"
                    class="w-full px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 resize-none"
                    placeholder="Brief description for SEO"></textarea>
                  <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5">
                    {{ form.meta_description?.length || 0 }}/160 characters
                  </p>
                </div>

                <div class="flex items-center gap-4">
                  <div class="flex-1">
                    <label class="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">Display Order</label>
                    <input v-model.number="form.display_order" type="number" min="0"
                      class="w-full px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20" />
                  </div>
                </div>

                <div class="flex items-center gap-2 pt-2">
                  <input v-model="form.is_published" type="checkbox" id="published"
                    class="w-4 h-4 text-green-600 border-neutral-300 rounded focus:ring-green-500" />
                  <label for="published" class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Published
                  </label>
                </div>
              </div>
            </div>

            <div class="pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <h3 class="text-xs font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                <Info class="w-4 h-4" />
                Statistics
              </h3>
              <div class="space-y-2 text-xs">
                <div class="flex items-center justify-between py-1.5 px-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <span class="text-neutral-600 dark:text-neutral-400">Characters</span>
                  <span class="font-medium text-neutral-900 dark:text-white">{{ form.content.length }}</span>
                </div>
                <div class="flex items-center justify-between py-1.5 px-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <span class="text-neutral-600 dark:text-neutral-400">Words</span>
                  <span class="font-medium text-neutral-900 dark:text-white">{{ wordCount }}</span>
                </div>
                <div class="flex items-center justify-between py-1.5 px-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <span class="text-neutral-600 dark:text-neutral-400">Lines</span>
                  <span class="font-medium text-neutral-900 dark:text-white">{{ form.content.split('\n').length }}</span>
                </div>
              </div>
            </div>

            <div class="pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <h3 class="text-xs font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                <BookOpen class="w-4 h-4" />
                Markdown Guide
              </h3>
              <div class="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                <div class="font-mono bg-neutral-50 dark:bg-neutral-800 p-2 rounded text-xs">
                  <div># Heading 1</div>
                  <div>## Heading 2</div>
                  <div>**bold** *italic*</div>
                  <div>[link](url)</div>
                  <div>`code`</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Editor Area -->
        <div class="flex-1 flex">
          <!-- Editor -->
          <div :class="[
            'overflow-hidden flex flex-col',
            showPreview ? 'w-1/2 border-r border-neutral-200 dark:border-neutral-800' : 'w-full'
          ]">
            <div class="flex items-center justify-between px-6 py-3 border-b border-neutral-200 dark:border-neutral-800">
              <div class="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                <Code class="w-4 h-4" />
                Markdown Editor
              </div>
            </div>
            <div class="flex-1 overflow-hidden">
              <textarea v-model="form.content"
                class="w-full h-full px-6 py-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono text-sm resize-none outline-none border-none"
                placeholder="# Your Page Title&#10;&#10;Start writing your content here...&#10;&#10;## Section Title&#10;&#10;Your content with **bold**, *italic*, and [links](https://example.com)"></textarea>
            </div>
          </div>

          <!-- Preview -->
          <div v-if="showPreview" class="w-1/2 overflow-hidden flex flex-col bg-neutral-50 dark:bg-neutral-900">
            <div class="flex items-center justify-between px-6 py-3 border-b border-neutral-200 dark:border-neutral-800">
              <div class="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                <Eye class="w-4 h-4" />
                Live Preview
              </div>
            </div>
            <div class="flex-1 overflow-y-auto px-6 py-4">
              <div class="prose prose-neutral dark:prose-invert max-w-none" v-html="markdownPreview"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Eye, Save, FileText, Settings, Info, BookOpen, Code } from 'lucide-vue-next'
import MarkdownIt from 'markdown-it'
import api from '@/utils/api'
import { useToast } from '@/composables/useToast'

const route = useRoute()
const router = useRouter()
const { showToast } = useToast()

const md = new MarkdownIt()

const loading = ref(false)
const saving = ref(false)
const showPreview = ref(true)
const isEditMode = computed(() => !!route.params.id && route.params.id !== 'new')

const form = ref({
  title: '',
  slug: '',
  content: '',
  meta_description: '',
  is_published: true,
  display_order: 0
})

// Auto-generate slug from title
watch(() => form.value.title, (newTitle) => {
  if (!isEditMode.value && newTitle) {
    form.value.slug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
})

// Word count
const wordCount = computed(() => {
  return form.value.content.trim().split(/\s+/).filter(word => word.length > 0).length
})

// Markdown preview
const markdownPreview = computed(() => {
  if (!form.value.content) return '<p class="text-neutral-400">Preview will appear here...</p>'
  return md.render(form.value.content)
})

const fetchPage = async () => {
  if (!isEditMode.value) return

  try {
    loading.value = true
    const response = await api.get(`/api/company-pages/${route.params.id}`)
    form.value = { ...response.data.page }
  } catch (error) {
    console.error('Failed to fetch page:', error)
    showToast('Failed to load page', 'error')
    router.push('/admin/company-pages')
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  try {
    saving.value = true

    if (isEditMode.value) {
      await api.put(`/api/company-pages/${route.params.id}`, form.value)
      showToast('Company page updated successfully', 'success')
    } else {
      await api.post('/api/company-pages', form.value)
      showToast('Company page created successfully', 'success')
    }

    router.push('/admin/company-pages')
  } catch (error) {
    console.error('Failed to save page:', error)
    showToast(error.response?.data?.error || 'Failed to save page', 'error')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchPage()
})
</script>

<style scoped>
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: transparent;
}

textarea::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.dark textarea::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
}

textarea::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

.dark textarea::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
