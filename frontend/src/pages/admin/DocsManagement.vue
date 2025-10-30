<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">{{ $t('admin.docsManagement.title') }}</h1>
        <p class="text-neutral-600 dark:text-neutral-400 mt-1">{{ $t('admin.docsManagement.subtitle') }}</p>
      </div>
      <div class="flex items-center gap-3">
        <button @click="resetCategoryForm(); showCategoryModal = true"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2">
          <Plus class="w-4 h-4" />
          {{ $t('admin.docsManagement.addCategory') }}
        </button>
        <button @click="router.push('/admin/docs/new')"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2">
          <FileText class="w-4 h-4" />
          {{ $t('admin.docsManagement.addPage') }}
        </button>
      </div>
    </div>

    <!-- Categories & Pages -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Categories List -->
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">{{ $t('admin.docsManagement.categories') }}</h2>
        
        <div v-if="categories.length === 0" class="text-center py-8 text-neutral-500 dark:text-neutral-400">
          <FileText class="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p class="text-sm">{{ $t('admin.docsManagement.noCategoriesYet') }}</p>
        </div>
        
        <draggable 
          v-model="categories" 
          @end="handleCategoryReorder"
          item-key="id"
          class="space-y-2"
        >
          <template #item="{element}">
            <div :class="[
              'flex items-center justify-between p-3 rounded-lg cursor-move hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors',
              element.parent_id ? 'bg-neutral-50 dark:bg-neutral-800 ml-4' : 'bg-neutral-100 dark:bg-neutral-800'
            ]">
              <div class="flex items-center gap-3 flex-1 min-w-0">
                <GripVertical class="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <div class="flex-1 min-w-0">
                  <span class="text-sm font-medium text-neutral-900 dark:text-white block truncate">{{ element.title }}</span>
                  <span class="text-xs text-neutral-500 dark:text-neutral-400 truncate block">{{ element.slug }}</span>
                </div>
              </div>
              <div class="flex items-center gap-1 flex-shrink-0">
                <button @click="editCategory(element)" class="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded" :title="$t('admin.docsManagement.edit')">
                  <Edit class="w-3.5 h-3.5" />
                </button>
                <button @click="deleteCategory(element)" class="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded" :title="$t('admin.docsManagement.delete')">
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </template>
        </draggable>
      </div>

      <!-- Pages List -->
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">{{ $t('admin.docsManagement.pages') }}</h2>
        
        <div v-if="pages.length === 0" class="text-center py-8 text-neutral-500 dark:text-neutral-400">
          <FileText class="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p class="text-sm">{{ $t('admin.docsManagement.noPagesYet') }}</p>
        </div>
        
        <draggable 
          v-model="pages" 
          @end="handlePageReorder"
          item-key="id"
          class="space-y-2"
        >
          <template #item="{element}">
            <div class="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg cursor-move hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
              <div class="flex items-center gap-3 flex-1 min-w-0">
                <GripVertical class="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <div class="flex-1 min-w-0">
                  <span class="text-sm font-medium text-neutral-900 dark:text-white block truncate">{{ element.title }}</span>
                  <div class="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <span class="truncate">{{ getCategoryName(element.category_id) }}</span>
                    <span>•</span>
                    <span class="truncate">{{ element.slug }}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-1 flex-shrink-0">
                <button @click="router.push(`/admin/docs/edit/${element.id}`)" class="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded" :title="$t('admin.docsManagement.edit')">
                  <Edit class="w-3.5 h-3.5" />
                </button>
                <button @click="deletePage(element)" class="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded" :title="$t('admin.docsManagement.delete')">
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>

    <!-- Category Modal -->
    <Teleport to="body">
      <div v-if="showCategoryModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" @click.self="showCategoryModal = false; resetCategoryForm()">
        <div class="bg-white dark:bg-neutral-900 rounded-xl shadow-2xl max-w-lg w-full" @click.stop>
          <div class="p-6 border-b border-neutral-200 dark:border-neutral-800">
            <h2 class="text-xl font-bold text-neutral-900 dark:text-white">
              {{ editingCategory ? $t('admin.docsManagement.editCategory') : $t('admin.docsManagement.addCategory') }}
            </h2>
          </div>
          
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">{{ $t('admin.docsManagement.categoryTitle') }}</label>
              <input v-model="categoryForm.title" type="text"
                @input="autoGenerateSlug"
                class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                :placeholder="$t('admin.docsManagement.categoryTitlePlaceholder')" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">{{ $t('admin.docsManagement.slug') }}</label>
              <input v-model="categoryForm.slug" type="text"
                class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                :placeholder="$t('admin.docsManagement.slugPlaceholder')" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">{{ $t('admin.docsManagement.parentCategory') }}</label>
              <select v-model="categoryForm.parent_id"
                class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                <option :value="null">{{ $t('admin.docsManagement.noneTopLevel') }}</option>
                <option v-for="cat in categories.filter(c => !editingCategory || c.id !== editingCategory.id)" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
              </select>
            </div>
          </div>
          
          <div class="flex items-center justify-end gap-3 p-6 border-t border-neutral-200 dark:border-neutral-800">
            <button @click="showCategoryModal = false; resetCategoryForm()"
              class="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors">
              {{ $t('admin.docsManagement.cancel') }}
            </button>
            <button @click="saveCategory"
              :disabled="!categoryForm.title || !categoryForm.slug"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {{ editingCategory ? $t('admin.docsManagement.update') : $t('admin.docsManagement.create') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Delete Category Confirmation Modal -->
    <Teleport to="body">
      <div v-if="showDeleteCategoryModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" @click.self="showDeleteCategoryModal = false; deletingCategory = null">
        <div class="bg-white dark:bg-neutral-900 rounded-xl shadow-2xl max-w-md w-full" @click.stop>
          <div class="p-6">
            <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h3 class="text-lg font-bold text-neutral-900 dark:text-white text-center mb-2">
              {{ $t('admin.docsManagement.deleteCategoryTitle') }}
            </h3>
            
            <p class="text-sm text-neutral-600 dark:text-neutral-400 text-center mb-6">
              {{ $t('admin.docsManagement.deleteCategoryMessage') }} <span class="font-semibold text-neutral-900 dark:text-white">"{{ deletingCategory?.title }}"</span>?
              <br><br>
              <span class="text-red-600 dark:text-red-400 font-medium">
                {{ $t('admin.docsManagement.deleteCategoryWarning') }}
              </span>
            </p>
            
            <div class="flex items-center gap-3">
              <button @click="showDeleteCategoryModal = false; deletingCategory = null"
                class="flex-1 px-4 py-2.5 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors font-medium">
                {{ $t('admin.docsManagement.cancel') }}
              </button>
              <button @click="confirmDeleteCategory"
                class="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium">
                {{ $t('admin.docsManagement.delete') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Delete Page Confirmation Modal -->
    <Teleport to="body">
      <div v-if="showDeletePageModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" @click.self="showDeletePageModal = false; deletingPage = null">
        <div class="bg-white dark:bg-neutral-900 rounded-xl shadow-2xl max-w-md w-full" @click.stop>
          <div class="p-6">
            <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            
            <h3 class="text-lg font-bold text-neutral-900 dark:text-white text-center mb-2">
              {{ $t('admin.docsManagement.deletePageTitle') }}
            </h3>
            
            <p class="text-sm text-neutral-600 dark:text-neutral-400 text-center mb-6">
              {{ $t('admin.docsManagement.deletePageMessage') }} <span class="font-semibold text-neutral-900 dark:text-white">"{{ deletingPage?.title }}"</span>?
              <br><br>
              <span class="text-red-600 dark:text-red-400 font-medium">
                {{ $t('admin.docsManagement.deletePageWarning') }}
              </span>
            </p>
            
            <div class="flex items-center gap-3">
              <button @click="showDeletePageModal = false; deletingPage = null"
                class="flex-1 px-4 py-2.5 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors font-medium">
                {{ $t('admin.docsManagement.cancel') }}
              </button>
              <button @click="confirmDeletePage"
                class="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium">
                {{ $t('admin.docsManagement.delete') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, FileText, GripVertical, Edit, Trash2 } from 'lucide-vue-next'
import draggable from 'vuedraggable'
import api from '@/utils/api'
import { useToast } from '@/composables/useToast'
import { useLocaleStore } from '@/stores/locale'

const router = useRouter()
const toast = useToast()
const localeStore = useLocaleStore()
const $t = localeStore.t

const categories = ref([])
const pages = ref([])
const showCategoryModal = ref(false)
const editingCategory = ref(null)

const categoryForm = ref({
  title: '',
  slug: '',
  parent_id: null
})

const getCategoryName = (categoryId) => {
  const category = categories.value.find(c => c.id === categoryId)
  return category ? category.title : $t('admin.docsManagement.unknown')
}

const autoGenerateSlug = () => {
  if (!editingCategory.value && categoryForm.value.title) {
    categoryForm.value.slug = categoryForm.value.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
}

// Fetch data
const fetchCategories = async () => {
  try {
    const response = await api.get('/api/docs/categories')
    categories.value = response.data.categories
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    toast.error($t('admin.docsManagement.loadCategoriesFailed'))
  }
}

const fetchPages = async () => {
  try {
    const response = await api.get('/api/docs/pages')
    pages.value = response.data.pages
  } catch (error) {
    console.error('Failed to fetch pages:', error)
    toast.error($t('admin.docsManagement.loadPagesFailed'))
  }
}

// Category operations
const resetCategoryForm = () => {
  categoryForm.value = { title: '', slug: '', parent_id: null }
  editingCategory.value = null
}

const editCategory = (category) => {
  editingCategory.value = category
  categoryForm.value = {
    title: category.title,
    slug: category.slug,
    parent_id: category.parent_id
  }
  showCategoryModal.value = true
}

const saveCategory = async () => {
  try {
    if (editingCategory.value) {
      await api.put(`/api/docs/categories/${editingCategory.value.id}`, categoryForm.value)
      toast.success($t('admin.docsManagement.categoryUpdated'))
    } else {
      await api.post('/api/docs/categories', categoryForm.value)
      toast.success($t('admin.docsManagement.categoryCreated'))
    }
    
    showCategoryModal.value = false
    resetCategoryForm()
    await fetchCategories()
  } catch (error) {
    console.error('Failed to save category:', error)
    toast.error(error.response?.data?.message || $t('admin.docsManagement.saveCategoryFailed'))
  }
}

const deletingCategory = ref(null)
const showDeleteCategoryModal = ref(false)

const deleteCategory = (category) => {
  deletingCategory.value = category
  showDeleteCategoryModal.value = true
}

const confirmDeleteCategory = async () => {
  if (!deletingCategory.value) return
  
  try {
    await api.delete(`/api/docs/categories/${deletingCategory.value.id}`)
    
    // Remove from local state
    categories.value = categories.value.filter(c => c.id !== deletingCategory.value.id)
    
    // Remove associated pages
    pages.value = pages.value.filter(p => p.category_id !== deletingCategory.value.id)
    
    toast.success($t('admin.docsManagement.categoryDeleted'))
    showDeleteCategoryModal.value = false
    deletingCategory.value = null
  } catch (error) {
    console.error('Failed to delete category:', error)
    toast.error($t('admin.docsManagement.deleteCategoryFailed'))
  }
}

const handleCategoryReorder = async () => {
  try {
    const orders = categories.value.map((cat, index) => ({
      id: cat.id,
      sort_order: index,
      parent_id: cat.parent_id
    }))
    
    await api.post('/api/docs/categories/reorder', { orders })
  } catch (error) {
    console.error('Failed to reorder categories:', error)
    toast.error($t('admin.docsManagement.reorderCategoriesFailed'))
  }
}

// Page operations
const deletingPage = ref(null)
const showDeletePageModal = ref(false)

const deletePage = (page) => {
  deletingPage.value = page
  showDeletePageModal.value = true
}

const confirmDeletePage = async () => {
  if (!deletingPage.value) return
  
  try {
    await api.delete(`/api/docs/pages/${deletingPage.value.id}`)
    
    // Remove from local state
    pages.value = pages.value.filter(p => p.id !== deletingPage.value.id)
    
    toast.success($t('admin.docsManagement.pageDeleted'))
    showDeletePageModal.value = false
    deletingPage.value = null
  } catch (error) {
    console.error('Failed to delete page:', error)
    toast.error($t('admin.docsManagement.deletePageFailed'))
  }
}

const handlePageReorder = async () => {
  try {
    const orders = pages.value.map((page, index) => ({
      id: page.id,
      sort_order: index,
      category_id: page.category_id
    }))
    
    await api.post('/api/docs/pages/reorder', { orders })
  } catch (error) {
    console.error('Failed to reorder pages:', error)
    toast.error($t('admin.docsManagement.reorderPagesFailed'))
  }
}

onMounted(async () => {
  await fetchCategories()
  await fetchPages()
})
</script>
