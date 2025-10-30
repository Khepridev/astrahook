<template>
  <div class="max-w-3xl space-y-6">
    <!-- Header -->
    <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Admin Settings</h1>

    <!-- Profile Card -->
    <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
      <div class="flex items-center gap-4">
        <UserAvatar 
          :avatar-url="previewAvatar || authStore.user?.avatar_url" 
          :username="authStore.user?.username || authStore.user?.email"
          size="xl"
        />
        <div class="flex-1">
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">{{ authStore.user?.username || 'Admin' }}</h2>
          <p class="text-neutral-600 dark:text-neutral-400">{{ authStore.user?.email }}</p>
          <div class="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm">
            <span class="w-2 h-2 bg-green-500 rounded-full"></span>
            <span class="text-neutral-700 dark:text-neutral-300">{{ authStore.user?.role || 'admin' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Account Information -->
    <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold text-neutral-900 dark:text-white mb-6">Account Information</h2>
      
      <form @submit.prevent="handleUpdateProfile" class="space-y-4">
        <!-- Username -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Username</label>
          <input
            v-model="profileForm.username"
            type="text"
            class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
            placeholder="Enter your username"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Email</label>
          <input
            v-model="profileForm.email"
            type="email"
            class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
            placeholder="Enter your email"
          />
        </div>

        <!-- Avatar Upload -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Avatar</label>
          
          <!-- Current Avatar Preview -->
          <div v-if="currentAvatarUrl" class="mb-3 flex items-center gap-4">
            <img :src="currentAvatarUrl" alt="Current avatar" class="w-20 h-20 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-700" />
            <span class="text-sm text-neutral-600 dark:text-neutral-400">Current avatar</span>
          </div>

          <!-- File Input -->
          <input
            ref="avatarInput"
            type="file"
            accept="image/*"
            @change="handleAvatarChange"
            class="hidden"
          />
          
          <div class="flex items-center gap-3">
            <button
              type="button"
              @click="$refs.avatarInput.click()"
              class="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors"
            >
              Choose File
            </button>
            <span v-if="selectedFile" class="text-sm text-neutral-600 dark:text-neutral-400">
              {{ selectedFile.name }}
            </span>
            <button
              v-if="selectedFile"
              type="button"
              @click="uploadAvatar"
              :disabled="uploadingAvatar"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {{ uploadingAvatar ? 'Uploading...' : 'Upload' }}
            </button>
          </div>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Max 5MB. Supported: JPEG, PNG, GIF, WebP</p>
        </div>

        <!-- Role (Read-only) -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Role</label>
          <input
            type="text"
            :value="authStore.user?.role || 'admin'"
            readonly
            class="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none cursor-not-allowed"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loadingProfile"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span v-if="loadingProfile" class="animate-spin">⏳</span>
          <span>{{ loadingProfile ? 'Updating...' : 'Update Profile' }}</span>
        </button>
      </form>
    </div>

    <!-- Change Password -->
    <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold text-neutral-900 dark:text-white mb-6">Change Password</h2>
      
      <form @submit.prevent="handleChangePassword" class="space-y-4">
        <!-- Current Password -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Current Password</label>
          <input
            v-model="passwordForm.currentPassword"
            type="password"
            class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
            placeholder="Enter current password"
          />
        </div>

        <!-- New Password -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">New Password</label>
          <input
            v-model="passwordForm.newPassword"
            type="password"
            class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
            placeholder="Enter new password (min 6 characters)"
          />
        </div>

        <!-- Confirm New Password -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Confirm New Password</label>
          <input
            v-model="passwordForm.confirmPassword"
            type="password"
            class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
            placeholder="Confirm new password"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loadingPassword"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span v-if="loadingPassword" class="animate-spin">⏳</span>
          <span>{{ loadingPassword ? 'Changing...' : 'Change Password' }}</span>
        </button>
      </form>
    </div>

    <!-- Admin Permissions -->
    <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Admin Permissions</h2>
      <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        As an admin, you have full access to all features including:
      </p>
      <ul class="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
        <li class="flex items-center gap-2">
          <span class="w-2 h-2 bg-green-500 rounded-full"></span>
          User management
        </li>
        <li class="flex items-center gap-2">
          <span class="w-2 h-2 bg-green-500 rounded-full"></span>
          Webhook control
        </li>
        <li class="flex items-center gap-2">
          <span class="w-2 h-2 bg-green-500 rounded-full"></span>
          System logs access
        </li>
        <li class="flex items-center gap-2">
          <span class="w-2 h-2 bg-green-500 rounded-full"></span>
          Dashboard analytics
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/utils/api'
import { useToast } from '@/composables/useToast'
import UserAvatar from '@/components/common/UserAvatar.vue'

const authStore = useAuthStore()
const toast = useToast()
const loadingProfile = ref(false)
const loadingPassword = ref(false)
const selectedFile = ref(null)
const uploadingAvatar = ref(false)
const avatarInput = ref(null)
const previewAvatar = ref('')

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3080'

const profileForm = ref({
  username: '',
  email: ''
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const currentAvatarUrl = ref('')

// Initialize profile form with current user data
onMounted(() => {
  if (authStore.user) {
    profileForm.value.username = authStore.user.username || ''
    profileForm.value.email = authStore.user.email
    currentAvatarUrl.value = authStore.user.avatar_url ? `${API_URL}${authStore.user.avatar_url}` : ''
  }
})

const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPEG, PNG, GIF, and WebP images are allowed')
      return
    }
    
    selectedFile.value = file
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      previewAvatar.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const uploadAvatar = async () => {
  if (!selectedFile.value) {
    toast.warning('Please select a file first')
    return
  }

  uploadingAvatar.value = true

  try {
    const formData = new FormData()
    formData.append('avatar', selectedFile.value)

    const response = await api.post('/api/auth/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    toast.success('Avatar uploaded successfully!')
    currentAvatarUrl.value = `${API_URL}${response.data.avatar_url}`
    selectedFile.value = null
    previewAvatar.value = ''
    
    // Refresh user data
    await authStore.fetchUser()
  } catch (error) {
    console.error('Failed to upload avatar:', error)
    const errorMessage = error.response?.data?.message || 'Failed to upload avatar'
    toast.error(errorMessage)
  } finally {
    uploadingAvatar.value = false
  }
}

const handleUpdateProfile = async () => {
  // Validation
  if (!profileForm.value.username && !profileForm.value.email) {
    toast.warning('At least one field is required')
    return
  }

  if (profileForm.value.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(profileForm.value.email)) {
      toast.warning('Please enter a valid email address')
      return
    }
  }

  if (profileForm.value.username && profileForm.value.username.length < 3) {
    toast.warning('Username must be at least 3 characters')
    return
  }

  loadingProfile.value = true

  try {
    const data = {}
    if (profileForm.value.email) data.email = profileForm.value.email
    if (profileForm.value.username) data.username = profileForm.value.username

    await api.put('/api/auth/profile', data)

    toast.success('Profile updated successfully!')
    
    // Refresh user data
    await authStore.fetchUser()
  } catch (error) {
    console.error('Failed to update profile:', error)
    const errorMessage = error.response?.data?.message || 'Failed to update profile'
    toast.error(errorMessage)
  } finally {
    loadingProfile.value = false
  }
}

const handleChangePassword = async () => {
  // Validation
  if (!passwordForm.value.currentPassword || !passwordForm.value.newPassword || !passwordForm.value.confirmPassword) {
    toast.warning('Please fill in all fields')
    return
  }

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    toast.warning('New passwords do not match')
    return
  }

  if (passwordForm.value.newPassword.length < 6) {
    toast.warning('New password must be at least 6 characters')
    return
  }

  if (passwordForm.value.currentPassword === passwordForm.value.newPassword) {
    toast.warning('New password must be different from current password')
    return
  }

  loadingPassword.value = true

  try {
    await api.post('/api/auth/change-password', {
      oldPassword: passwordForm.value.currentPassword,
      newPassword: passwordForm.value.newPassword
    })

    toast.success('Password changed successfully!')
    
    // Reset form
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  } catch (error) {
    console.error('Failed to change password:', error)
    const errorMessage = error.response?.data?.message || 'Failed to change password'
    toast.error(errorMessage)
  } finally {
    loadingPassword.value = false
  }
}
</script>
