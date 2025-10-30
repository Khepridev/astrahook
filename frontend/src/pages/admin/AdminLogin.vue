<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-2xl mb-4">
          <Shield class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Admin Panel</h1>
        <p class="text-neutral-600 dark:text-neutral-400 mt-2">Sign in to access admin dashboard</p>
      </div>

      <!-- Login Form -->
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-8 shadow-lg">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Admin Email
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-600 transition-all"
              placeholder="admin@astrahook.com"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Password
            </label>
            <input
              v-model="form.password"
              type="password"
              required
              class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-600 transition-all"
              placeholder="••••••••"
            />
          </div>

          <!-- Error Message -->
          <div v-if="error" class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium rounded-lg transition-colors"
          >
            {{ loading ? 'Signing in...' : 'Sign In as Admin' }}
          </button>
        </form>

        <!-- Back to User Login -->
        <div class="mt-6 text-center">
          <router-link
            to="/login"
            class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            ← Back to User Login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Shield } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check if admin credentials
    if (form.value.email.includes('admin')) {
      // Mock admin login
      authStore.user = {
        email: form.value.email,
        role: 'admin'
      }
      router.push('/admin/dashboard')
    } else {
      error.value = 'Invalid admin credentials'
    }
  } catch (err) {
    error.value = 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
