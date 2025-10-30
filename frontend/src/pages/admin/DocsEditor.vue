<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-6">
    <div class="max-w-[1800px] mx-auto bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-lg">
      <!-- Top Bar -->
      <div class=" border-b border-neutral-200 dark:border-neutral-800">
        <div class="flex items-center justify-between px-6 py-3">
          <!-- Left -->
          <div class="flex items-center gap-4">
            <button @click="router.push('/admin/docs')"
              class="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
              <ArrowLeft class="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
            <div class="flex items-center gap-3">
              <FileText class="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              <div>
                <h1 class="text-sm font-semibold text-neutral-900 dark:text-white">
                  {{ pageForm.title || $t('admin.docsEditor.untitledDocument') }}
                </h1>
                <p class="text-xs text-neutral-500 dark:text-neutral-400">
                  {{ isEditing ? $t('admin.docsEditor.editing') : $t('admin.docsEditor.creatingNewPage') }}
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
              {{ $t('admin.docsEditor.preview') }}
            </button>
            <div class="w-px h-6 bg-neutral-200 dark:bg-neutral-700"></div>
            <button @click="router.push('/admin/docs')"
              class="px-4 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors">
              {{ $t('admin.docsEditor.cancel') }}
            </button>
            <button @click="savePage"
              :disabled="!pageForm.title || !pageForm.slug || !pageForm.category_id || !pageForm.content"
              class="px-4 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              <Save class="w-4 h-4" />
              {{ isEditing ? $t('admin.docsEditor.update') : $t('admin.docsEditor.publish') }}
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
                {{ $t('admin.docsEditor.pageSettings') }}
              </h2>

              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">{{ $t('admin.docsEditor.title') }} *</label>
                  <input v-model="pageForm.title" type="text" @input="autoGenerateSlug"
                    class="w-full px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    :placeholder="$t('admin.docsEditor.titlePlaceholder')" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">{{ $t('admin.docsEditor.slug') }} *</label>
                  <input v-model="pageForm.slug" type="text"
                    class="w-full px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 font-mono"
                    :placeholder="$t('admin.docsEditor.slugPlaceholder')" />
                  <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5">
                    <span class="opacity-60">{{ $t('admin.docsEditor.url') }}:</span> /docs/<span class="font-medium">{{ pageForm.slug || 'slug'
                    }}</span>
                  </p>
                </div>

                <div>
                  <label class="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">{{ $t('admin.docsEditor.category') }}
                    *</label>
                  <select v-model="pageForm.category_id"
                    class="w-full px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20">
                    <option :value="null" disabled>{{ $t('admin.docsEditor.selectCategory') }}</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                      {{ cat.parent_id ? '└─ ' : '' }}{{ cat.title }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <h3 class="text-xs font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                <Info class="w-4 h-4" />
                {{ $t('admin.docsEditor.statistics') }}
              </h3>
              <div class="space-y-2 text-xs">
                <div class="flex items-center justify-between py-1.5 px-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <span class="text-neutral-600 dark:text-neutral-400">{{ $t('admin.docsEditor.characters') }}</span>
                  <span class="font-medium text-neutral-900 dark:text-white">{{ pageForm.content.length }}</span>
                </div>
                <div class="flex items-center justify-between py-1.5 px-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <span class="text-neutral-600 dark:text-neutral-400">{{ $t('admin.docsEditor.words') }}</span>
                  <span class="font-medium text-neutral-900 dark:text-white">{{ wordCount }}</span>
                </div>
                <div class="flex items-center justify-between py-1.5 px-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <span class="text-neutral-600 dark:text-neutral-400">{{ $t('admin.docsEditor.lines') }}</span>
                  <span class="font-medium text-neutral-900 dark:text-white">{{ pageForm.content.split('\n').length
                  }}</span>
                </div>
              </div>
            </div>

            <div class="pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <h3 class="text-xs font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                <BookOpen class="w-4 h-4" />
                {{ $t('admin.docsEditor.markdownGuide') }}
              </h3>
              <div class="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                <div class="font-mono bg-neutral-50 dark:bg-neutral-800 p-2 rounded">
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
            <div
              class="flex items-center justify-between px-6 py-3 border-b border-neutral-200 dark:border-neutral-800">
              <div class="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                <Code class="w-4 h-4" />
                {{ $t('admin.docsEditor.markdownEditor') }}
              </div>
              <div class="flex items-center gap-2">
                <button @click="insertMarkdown('**', '**')"
                  class="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded" :title="$t('admin.docsEditor.bold')">
                  <Bold class="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </button>
                <button @click="insertMarkdown('*', '*')"
                  class="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded" :title="$t('admin.docsEditor.italic')">
                  <Italic class="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </button>
                <button @click="insertMarkdown('[', '](url)')"
                  class="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded" :title="$t('admin.docsEditor.link')">
                  <Link class="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </button>
                <button @click="insertMarkdown('`', '`')"
                  class="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded" :title="$t('admin.docsEditor.code')">
                  <Code2 class="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </button>
                <div class="w-px h-4 bg-neutral-200 dark:bg-neutral-700 mx-1"></div>
                <button @click="insertMarkdown('# ', '')"
                  class="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded text-xs font-bold"
                  :title="$t('admin.docsEditor.heading')">
                  H1
                </button>
                <button @click="insertMarkdown('## ', '')"
                  class="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded text-xs font-bold"
                  :title="$t('admin.docsEditor.heading2')">
                  H2
                </button>
              </div>
            </div>
            <textarea ref="editorRef" v-model="pageForm.content"
              class="flex-1 w-full px-6 py-4 bg-transparent text-neutral-900 dark:text-white outline-none resize-none font-mono text-sm leading-relaxed"
              :placeholder="$t('admin.docsEditor.editorPlaceholder')" spellcheck="false"></textarea>
          </div>

          <!-- Preview -->
          <div v-if="showPreview" class="w-1/2 overflow-hidden flex flex-col">
            <div
              class="flex items-center justify-between px-6 py-3 border-b border-neutral-200 dark:border-neutral-800">
              <div class="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                <Eye class="w-4 h-4" />
                {{ $t('admin.docsEditor.preview') }}
              </div>
            </div>
            <div class="flex-1 overflow-y-auto">
              <div v-if="!pageForm.content"
                class="flex items-center justify-center h-full text-neutral-500 dark:text-neutral-400">
                <div class="text-center">
                  <FileText class="w-16 h-16 mx-auto mb-3 opacity-30" />
                  <p class="text-sm">{{ $t('admin.docsEditor.startWriting') }}</p>
                </div>
              </div>
              <div v-else class="px-8">
                <div class="max-w-3xl mx-auto bg-white dark:bg-neutral-900 rounded-xl p-4 shadow-sm">
                  <div class="markdown-preview" v-html="markdownPreview"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft, Save, FileText, Eye, Settings as SettingsIcon, Info, BookOpen, Code, Bold, Italic, Link, Code2 } from 'lucide-vue-next'

// Rename to avoid conflict
const Settings = SettingsIcon

import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

import api from '@/utils/api'
import { useToast } from '@/composables/useToast'
import { useLocaleStore } from '@/stores/locale'

// Initialize markdown-it with highlight.js
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
      } catch (__) { }
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})

const router = useRouter()
const route = useRoute()
const toast = useToast()
const localeStore = useLocaleStore()
const $t = localeStore.t

const categories = ref([])
const showPreview = ref(true)
const editorRef = ref(null)
const isEditing = computed(() => !!route.params.id)

const pageForm = ref({
  category_id: null,
  title: '',
  slug: '',
  content: ''
})

const wordCount = computed(() => {
  return pageForm.value.content.trim().split(/\s+/).filter(word => word.length > 0).length
})

const markdownPreview = computed(() => {
  if (!pageForm.value.content) return ''
  return md.render(pageForm.value.content)
})

const autoGenerateSlug = () => {
  if (!isEditing.value && pageForm.value.title) {
    pageForm.value.slug = pageForm.value.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
}

const insertMarkdown = (before, after) => {
  const textarea = editorRef.value
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = pageForm.value.content.substring(start, end)
  const newText = before + selectedText + after

  pageForm.value.content =
    pageForm.value.content.substring(0, start) +
    newText +
    pageForm.value.content.substring(end)

  // Set cursor position
  setTimeout(() => {
    textarea.focus()
    textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
  }, 0)
}

const fetchCategories = async () => {
  try {
    const response = await api.get('/api/docs/categories')
    categories.value = response.data.categories
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    toast.error($t('admin.docsEditor.loadCategoriesFailed'))
  }
}

const fetchPage = async () => {
  if (!route.params.id) return

  try {
    const response = await api.get(`/api/docs/pages/${route.params.id}`)
    const page = response.data.page
    pageForm.value = {
      category_id: page.category_id,
      title: page.title,
      slug: page.slug,
      content: page.content
    }
  } catch (error) {
    console.error('Failed to fetch page:', error)
    toast.error($t('admin.docsEditor.loadPageFailed'))
    router.push('/admin/docs')
  }
}

const savePage = async () => {
  try {
    if (isEditing.value) {
      await api.put(`/api/docs/pages/${route.params.id}`, pageForm.value)
      toast.success($t('admin.docsEditor.pageUpdated'))
    } else {
      await api.post('/api/docs/pages', pageForm.value)
      toast.success($t('admin.docsEditor.pageCreated'))
    }

    router.push('/admin/docs')
  } catch (error) {
    console.error('Failed to save page:', error)
    toast.error(error.response?.data?.message || $t('admin.docsEditor.savePageFailed'))
  }
}

onMounted(async () => {
  await fetchCategories()
  if (isEditing.value) {
    await fetchPage()
  }
})
</script>

<style scoped>
.markdown-preview {
  font-size: 1rem;
  line-height: 1.75;
  color: #171717;
}

.dark .markdown-preview {
  color: #fafafa;
}

.markdown-preview :deep(h1) {
  font-size: 2rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e5e5;
  color: #171717;
}

.dark .markdown-preview :deep(h1) {
  border-bottom-color: #404040;
  color: #fafafa;
}

.markdown-preview :deep(h2) {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #262626;
}

.dark .markdown-preview :deep(h2) {
  color: #e5e5e5;
}

.markdown-preview :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  color: #404040;
}

.dark .markdown-preview :deep(h3) {
  color: #d4d4d4;
}

.markdown-preview :deep(p) {
  margin-bottom: 1rem;
  color: #525252;
}

.dark .markdown-preview :deep(p) {
  color: #a3a3a3;
}

.markdown-preview :deep(ul),
.markdown-preview :deep(ol) {
  margin-left: 2rem;
  margin-bottom: 1rem;
  color: #525252;
}

.dark .markdown-preview :deep(ul),
.dark .markdown-preview :deep(ol) {
  color: #a3a3a3;
}

.markdown-preview :deep(li) {
  margin-bottom: 0.5rem;
}

.markdown-preview :deep(code) {
  background-color: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.9em;
  font-family: 'Courier New', monospace;
  color: #dc2626;
}

.dark .markdown-preview :deep(code) {
  background-color: #262626;
  color: #fca5a5;
}

.markdown-preview :deep(pre.hljs) {
  background-color: #0d1117;
  padding: 1.25rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  margin-bottom: 1rem;
  border: 1px solid #30363d;
}

.dark .markdown-preview :deep(pre.hljs) {
  background-color: #0d1117;
  border-color: #30363d;
}

.markdown-preview :deep(pre.hljs code) {
  background-color: transparent;
  padding: 0;
  border: none;
  font-size: 0.875rem;
  line-height: 1.6;
  color: inherit;
}

.markdown-preview :deep(blockquote) {
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  margin-left: 0;
  margin-bottom: 1rem;
  color: #737373;
  font-style: italic;
}

.dark .markdown-preview :deep(blockquote) {
  border-left-color: #60a5fa;
  color: #a3a3a3;
}

.markdown-preview :deep(a) {
  color: #2563eb;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.dark .markdown-preview :deep(a) {
  color: #60a5fa;
}

.markdown-preview :deep(a:hover) {
  color: #1d4ed8;
}

.dark .markdown-preview :deep(a:hover) {
  color: #93c5fd;
}

.markdown-preview :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.markdown-preview :deep(th),
.markdown-preview :deep(td) {
  border: 1px solid #e5e5e5;
  padding: 0.75rem;
  text-align: left;
}

.dark .markdown-preview :deep(th),
.dark .markdown-preview :deep(td) {
  border-color: #404040;
}

.markdown-preview :deep(th) {
  background-color: #f5f5f5;
  font-weight: 600;
}

.dark .markdown-preview :deep(th) {
  background-color: #262626;
}

.markdown-preview :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.markdown-preview :deep(hr) {
  border: none;
  border-top: 2px solid #e5e5e5;
  margin: 2rem 0;
}

.dark .markdown-preview :deep(hr) {
  border-top-color: #404040;
}
</style>
