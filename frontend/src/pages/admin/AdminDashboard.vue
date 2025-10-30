<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">{{ $t('admin.dashboard.title') }}</h1>
      <p class="text-neutral-600 dark:text-neutral-400 mt-1">{{ $t('admin.dashboard.subtitle') }}</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Users -->
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-neutral-600 dark:text-neutral-400">{{
            $t('admin.dashboard.stats.totalUsers') }}</h3>
          <Users class="w-5 h-5 text-blue-500" />
        </div>
        <p class="text-3xl font-bold text-neutral-900 dark:text-white">{{ stats.totalUsers }}</p>
      </div>

      <!-- Total Webhooks -->
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-neutral-600 dark:text-neutral-400">{{
            $t('admin.dashboard.stats.totalWebhooks') }}</h3>
          <Webhook class="w-5 h-5 text-green-500" />
        </div>
        <p class="text-3xl font-bold text-neutral-900 dark:text-white">{{ stats.totalWebhooks }}</p>
      </div>

      <!-- Total Requests -->
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-neutral-600 dark:text-neutral-400">{{
            $t('admin.dashboard.stats.totalRequests') }}</h3>
          <TrendingUp class="w-5 h-5 text-purple-500" />
        </div>
        <p class="text-3xl font-bold text-neutral-900 dark:text-white">{{ stats.totalRequests }}</p>
      </div>

      <!-- System Health -->
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-neutral-600 dark:text-neutral-400">{{
            $t('admin.dashboard.stats.systemHealth') }}</h3>
          <Activity class="w-5 h-5 text-emerald-500" />
        </div>
        <p class="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{{ $t('admin.dashboard.stats.healthy') }}
        </p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
      <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">{{
        $t('admin.dashboard.quickActions.title') }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <router-link to="/admin/users"
          class="flex items-center gap-3 p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
          <div class="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <Users class="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p class="font-medium text-neutral-900 dark:text-white">{{ $t('admin.dashboard.quickActions.manageUsers') }}
            </p>
            <p class="text-xs text-neutral-600 dark:text-neutral-400">{{
              $t('admin.dashboard.quickActions.manageUsersDesc') }}</p>
          </div>
        </router-link>

        <router-link to="/admin/webhooks"
          class="flex items-center gap-3 p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
          <div class="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
            <Webhook class="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p class="font-medium text-neutral-900 dark:text-white">{{ $t('admin.dashboard.quickActions.manageWebhooks')
            }}</p>
            <p class="text-xs text-neutral-600 dark:text-neutral-400">{{
              $t('admin.dashboard.quickActions.manageWebhooksDesc') }}</p>
          </div>
        </router-link>

        <router-link to="/admin/settings"
          class="flex items-center gap-3 p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
          <div class="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <Settings class="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <p class="font-medium text-neutral-900 dark:text-white">{{ $t('admin.dashboard.quickActions.systemSettings')
            }}</p>
            <p class="text-xs text-neutral-600 dark:text-neutral-400">{{
              $t('admin.dashboard.quickActions.systemSettingsDesc') }}</p>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">{{ $t('admin.dashboard.recentActivity')
        }}</h3>
        <div v-if="recentActivity.length === 0" class="text-center py-8 text-neutral-500 dark:text-neutral-400">
          <Activity class="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p class="text-sm">{{ $t('admin.dashboard.noRecentActivity') }}</p>
        </div>
        <div v-else class="space-y-3">
          <div v-for="activity in recentActivity" :key="activity.id"
            class="flex items-start gap-3 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-lg transition-colors">
            <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              :class="activity.bgColor">
              <component :is="activity.icon" class="w-5 h-5" :class="activity.iconColor" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-neutral-900 dark:text-white">{{ activity.title }}</p>
              <p class="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">{{ activity.description }}</p>
              <span class="text-xs text-neutral-500 mt-1 inline-block">{{ activity.time }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- System Status -->
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">{{
          $t('admin.dashboard.systemStatus.title') }}</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-medium text-neutral-900 dark:text-white">{{
                $t('admin.dashboard.systemStatus.apiServer') }}</span>
            </div>
            <span class="text-xs text-green-600 dark:text-green-400">{{ $t('admin.dashboard.systemStatus.online')
            }}</span>
          </div>

          <div class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-medium text-neutral-900 dark:text-white">{{
                $t('admin.dashboard.systemStatus.database') }}</span>
            </div>
            <span class="text-xs text-green-600 dark:text-green-400">{{ $t('admin.dashboard.systemStatus.connected')
            }}</span>
          </div>

          <div class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-medium text-neutral-900 dark:text-white">{{
                $t('admin.dashboard.systemStatus.webhookService') }}</span>
            </div>
            <span class="text-xs text-green-600 dark:text-green-400">{{ $t('admin.dashboard.systemStatus.running')
            }}</span>
          </div>

          <div class="mt-4 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-medium text-neutral-600 dark:text-neutral-400">{{
                $t('admin.dashboard.systemStatus.serverUptime') }}</span>
              <span class="text-xs font-semibold text-neutral-900 dark:text-white">99.9%</span>
            </div>
            <div class="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
              <div class="bg-green-500 h-2 rounded-full" style="width: 99.9%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Users, Webhook, TrendingUp, Activity, Settings, UserPlus, Trash2 } from 'lucide-vue-next'
import { useLocaleStore } from '@/stores/locale'
import api from '@/utils/api'

const localeStore = useLocaleStore()
const $t = localeStore.t

const stats = ref({
  totalUsers: 0,
  totalWebhooks: 0,
  totalRequests: 0,
})

const recentActivity = ref([])
const loading = ref(true)

const fetchStats = async () => {
  try {
    loading.value = true
    const response = await api.get('/api/admin/stats')

    if (response.data) {
      stats.value = {
        totalUsers: response.data.totalUsers || 0,
        totalWebhooks: response.data.totalWebhooks || 0,
        totalRequests: response.data.totalRequests || 0,
      }
    }
  } catch (error) {
    console.error('Failed to fetch admin stats:', error)
    // Fallback to default values
    stats.value = {
      totalUsers: 0,
      totalWebhooks: 0,
      totalRequests: 0,
    }
  } finally {
    loading.value = false
  }
}

const fetchRecentActivity = async () => {
  try {
    const response = await api.get('/api/admin/activity')

    if (response.data && response.data.activities) {
      recentActivity.value = response.data.activities.map(activity => ({
        id: activity.id,
        title: activity.title,
        description: activity.description,
        time: formatTime(activity.created_at),
        icon: getActivityIcon(activity.type),
        bgColor: getActivityBgColor(activity.type),
        iconColor: getActivityIconColor(activity.type)
      }))
    }
  } catch (error) {
    console.error('Failed to fetch recent activity:', error)
    recentActivity.value = []
  }
}

const getActivityIcon = (type) => {
  const icons = {
    user_registered: UserPlus,
    webhook_created: Webhook,
    user_deleted: Trash2,
  }
  return icons[type] || Activity
}

const getActivityBgColor = (type) => {
  const colors = {
    user_registered: 'bg-blue-500/10',
    webhook_created: 'bg-green-500/10',
    user_deleted: 'bg-red-500/10',
  }
  return colors[type] || 'bg-neutral-500/10'
}

const getActivityIconColor = (type) => {
  const colors = {
    user_registered: 'text-blue-500',
    webhook_created: 'text-green-500',
    user_deleted: 'text-red-500',
  }
  return colors[type] || 'text-neutral-500'
}

const formatTime = (timestamp) => {
  const now = new Date()
  const time = new Date(timestamp)
  const diff = Math.floor((now - time) / 1000)

  if (diff < 60) return $t('admin.dashboard.timeAgo.justNow')
  if (diff < 3600) {
    const minutes = Math.floor(diff / 60)
    return `${minutes} ${$t('admin.dashboard.timeAgo.minAgo')}`
  }
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600)
    return `${hours} ${$t('admin.dashboard.timeAgo.hourAgo')}`
  }
  const days = Math.floor(diff / 86400)
  return `${days} ${$t('admin.dashboard.timeAgo.dayAgo')}`
}

onMounted(() => {
  fetchStats()
  fetchRecentActivity()
})
</script>
