<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950">
    <!-- Sidebar -->
    <Sidebar :is-open="sidebarOpen" :is-collapsed="sidebarCollapsed" @close="sidebarOpen = false" />
    
    <!-- Main Content -->
    <div class="transition-all duration-300" :class="sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'">
      <!-- Header -->
      <Header
        :title="pageTitle"
        :description="pageDescription"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
        @toggle-collapse="sidebarCollapsed = !sidebarCollapsed"
      />
      
      <!-- Page Content -->
      <main class="p-6">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'

const route = useRoute()
const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)

// Load sidebar collapsed state from localStorage
onMounted(() => {
  const saved = localStorage.getItem('sidebarCollapsed')
  if (saved !== null) {
    sidebarCollapsed.value = saved === 'true'
  }
})

// Save sidebar collapsed state to localStorage
watch(sidebarCollapsed, (newValue) => {
  localStorage.setItem('sidebarCollapsed', String(newValue))
})

const pageTitle = computed(() => route.meta.title || 'Dashboard')
const pageDescription = computed(() => route.meta.description || '')
</script>
