<template>
  <div id="app">
    <router-view />
    <Toast />
  </div>
</template>

<script setup>
import Toast from '@/components/common/Toast.vue'
import { useThemeStore } from '@/stores/theme'
import { useFavicon } from '@/composables/useFavicon'

// Initialize theme
const themeStore = useThemeStore()

// Initialize favicon and title
useFavicon()
</script>
