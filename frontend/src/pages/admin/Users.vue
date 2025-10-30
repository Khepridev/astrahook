<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">{{ $t('admin.users.title') }}</h1>
        <p class="text-neutral-600 dark:text-neutral-400 mt-1">{{ $t('admin.users.subtitle') }}</p>
      </div>
      <div class="text-sm text-neutral-600 dark:text-neutral-400">
        {{ $t('admin.users.totalUsers') }}: <span class="font-semibold text-neutral-900 dark:text-white">{{ users.length }}</span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && users.length === 0" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="text-neutral-600 dark:text-neutral-400 mt-4">{{ $t('admin.users.loading') }}</p>
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
              <h2 class="text-xl font-bold text-neutral-900 dark:text-white">{{ $t('admin.users.delete.title') }}</h2>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">{{ $t('admin.users.delete.subtitle') }}</p>
            </div>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <p class="text-neutral-700 dark:text-neutral-300 mb-4">
            {{ $t('admin.users.delete.message') }} <span class="font-semibold">{{ userToDelete?.email }}</span>?
          </p>
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            {{ $t('admin.users.delete.warning') }}
          </p>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t border-neutral-200 dark:border-neutral-800">
          <button @click="showDeleteModal = false"
            class="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors">
            {{ $t('admin.users.delete.cancel') }}
          </button>
          <button @click="confirmDelete"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2">
            <Trash2 class="w-4 h-4" />
            {{ $t('admin.users.delete.confirm') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                {{ $t('admin.users.table.user') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                {{ $t('admin.users.table.email') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                {{ $t('admin.users.table.role') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                {{ $t('admin.users.table.webhooks') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                {{ $t('admin.users.table.joined') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                {{ $t('admin.users.table.actions') }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200 dark:divide-neutral-800">
            <tr v-for="user in users" :key="user.id" class="hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <UserAvatar 
                    :avatar-url="user.avatar_url"
                    :username="user.username || user.email"
                    size="md"
                  />
                  <div>
                    <p class="text-sm font-medium text-neutral-900 dark:text-white">
                      {{ user.username || user.email.split('@')[0] }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-neutral-700 dark:text-neutral-300">{{ user.email }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="user.role === 'admin' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-neutral-700 dark:text-neutral-300">{{ user.webhookCount }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-neutral-600 dark:text-neutral-400">{{ user.joinedDate }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <button 
                    @click="viewUserWebhooks(user)"
                    class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="View Webhooks"
                  >
                    <Webhook class="w-4 h-4" />
                  </button>
                  <button 
                    @click="deleteUser(user)"
                    class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete User"
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Webhook, Trash2 } from 'lucide-vue-next'
import { useLocaleStore } from '@/stores/locale'
import UserAvatar from '@/components/common/UserAvatar.vue'
import api from '@/utils/api'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const toast = useToast()
const localeStore = useLocaleStore()
const $t = localeStore.t
const loading = ref(false)
const users = ref([])
const showDeleteModal = ref(false)
const userToDelete = ref(null)

// Fetch users from backend
const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await api.get('/api/admin/users')
    users.value = response.data.users.map(user => ({
      id: user.id,
      email: user.email,
      username: user.username,
      avatar_url: user.avatar_url,
      role: user.role,
      webhookCount: user.webhook_count || 0,
      joinedDate: new Date(user.created_at).toLocaleDateString('en-GB')
    }))
  } catch (error) {
    console.error('Failed to fetch users:', error)
    toast.error($t('admin.users.loadFailed'))
  } finally {
    loading.value = false
  }
}

const viewUserWebhooks = (user) => {
  router.push(`/admin/webhooks?userId=${user.id}`)
}

const deleteUser = (user) => {
  userToDelete.value = user
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!userToDelete.value) return

  try {
    await api.delete(`/api/admin/users/${userToDelete.value.id}`)
    toast.success($t('admin.users.delete.success'))
    showDeleteModal.value = false
    userToDelete.value = null
    await fetchUsers()
  } catch (error) {
    console.error('Failed to delete user:', error)
    const errorMessage = error.response?.data?.message || $t('admin.users.delete.failed')
    toast.error(errorMessage)
    showDeleteModal.value = false
    userToDelete.value = null
  }
}

onMounted(() => {
  fetchUsers()
})
</script>
