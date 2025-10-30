<template>
    <div class="p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">{{ $t('admin.companyPages.title') }}</h1>
                <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{{ $t('admin.companyPages.subtitle') }}</p>
            </div>
            <router-link to="/admin/company-pages/new"
                class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Plus class="w-4 h-4" />
                {{ $t('admin.companyPages.createPage') }}
            </router-link>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <!-- Pages List -->
        <div v-else-if="pages.length > 0"
            class="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            <table class="w-full">
                <thead class="bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                    <tr>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                            {{ $t('admin.companyPages.table.title') }}</th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                            {{ $t('admin.companyPages.table.slug') }}</th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                            {{ $t('admin.companyPages.table.status') }}</th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                            {{ $t('admin.companyPages.table.updated') }}</th>
                        <th
                            class="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                            {{ $t('admin.companyPages.table.actions') }}</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-neutral-200 dark:divide-neutral-700">
                    <tr v-for="page in pages" :key="page.id" class="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                        <td class="px-6 py-4">
                            <div class="text-sm font-medium text-neutral-900 dark:text-white">{{ page.title }}</div>
                        </td>
                        <td class="px-6 py-4">
                            <code
                                class="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">{{ page.slug }}</code>
                        </td>
                        <td class="px-6 py-4">
                            <span v-if="page.is_published"
                                class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30 rounded-full">
                                <CheckCircle class="w-3 h-3" />
                                {{ $t('admin.companyPages.status.published') }}
                            </span>
                            <span v-else
                                class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-neutral-700 bg-neutral-100 dark:text-neutral-400 dark:bg-neutral-800 rounded-full">
                                <XCircle class="w-3 h-3" />
                                {{ $t('admin.companyPages.status.draft') }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                            {{ formatDate(page.updated_at) }}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <router-link :to="`/admin/company-pages/${page.id}/edit`"
                                    class="p-2 text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400 transition-colors">
                                    <Edit class="w-4 h-4" />
                                </router-link>
                                <button @click="confirmDelete(page)"
                                    class="p-2 text-neutral-600 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400 transition-colors">
                                    <Trash2 class="w-4 h-4" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Empty State -->
        <div v-else
            class="text-center py-12 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <FileText class="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-neutral-900 dark:text-white mb-2">{{ $t('admin.companyPages.empty.title') }}</h3>
            <p class="text-neutral-600 dark:text-neutral-400 mb-4">{{ $t('admin.companyPages.empty.description') }}</p>
            <router-link to="/admin/company-pages/new"
                class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Plus class="w-4 h-4" />
                {{ $t('admin.companyPages.empty.button') }}
            </router-link>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            @click="showDeleteModal = false">
            <div class="bg-white dark:bg-neutral-900 rounded-lg p-6 max-w-md w-full mx-4" @click.stop>
                <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-2">{{ $t('admin.companyPages.delete.confirm') }}</h3>
                <p class="text-neutral-600 dark:text-neutral-400 mb-6">
                    {{ $t('admin.companyPages.delete.confirm') }} "{{ pageToDelete?.title }}"?
                </p>
                <div class="flex gap-3 justify-end">
                    <button @click="showDeleteModal = false"
                        class="px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                        {{ $t('admin.companyPageForm.cancel') }}
                    </button>
                    <button @click="deletePage"
                        class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                        {{ $t('admin.companyPageForm.save') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Plus, Edit, Trash2, CheckCircle, XCircle, FileText } from 'lucide-vue-next'
import { useLocaleStore } from '@/stores/locale'
import api from '@/utils/api'
import { useToast } from '@/composables/useToast'

const { showToast } = useToast()
const localeStore = useLocaleStore()
const $t = localeStore.t

const pages = ref([])
const loading = ref(true)
const showDeleteModal = ref(false)
const pageToDelete = ref(null)

const fetchPages = async () => {
    try {
        loading.value = true
        const response = await api.get('/api/company-pages')
        pages.value = response.data.pages
    } catch (error) {
        console.error('Failed to fetch company pages:', error)
        showToast($t('admin.companyPages.loadFailed'), 'error')
    } finally {
        loading.value = false
    }
}

const confirmDelete = (page) => {
    pageToDelete.value = page
    showDeleteModal.value = true
}

const deletePage = async () => {
    try {
        await api.delete(`/api/company-pages/${pageToDelete.value.id}`)
        showToast($t('admin.companyPages.delete.success'), 'success')
        showDeleteModal.value = false
        pageToDelete.value = null
        await fetchPages()
    } catch (error) {
        console.error('Failed to delete company page:', error)
        showToast($t('admin.companyPages.delete.failed'), 'error')
    }
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

onMounted(() => {
    fetchPages()
})
</script>
