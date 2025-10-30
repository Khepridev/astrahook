<template>
  <div class="flex items-center">
    <!-- Avatar Image -->
    <img 
      v-if="hasAvatar && !imageError"
      :src="avatarUrl" 
      :alt="username"
      class="rounded-full object-cover"
      :class="sizeClass"
      @error="handleImageError"
    />
    <!-- Fallback Initial -->
    <div 
      v-else
      class="rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold"
      :class="[sizeClass, textSizeClass]"
    >
      {{ userInitial }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  avatarUrl: {
    type: String,
    default: null
  },
  username: {
    type: String,
    default: 'User'
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg, xl
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  }
})

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3080'
const imageError = ref(false)

const sizeClass = computed(() => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  }
  return sizes[props.size]
})

const textSizeClass = computed(() => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-xl',
    xl: 'text-2xl'
  }
  return sizes[props.size]
})

const hasAvatar = computed(() => {
  return props.avatarUrl && props.avatarUrl.trim() !== ''
})

const avatarUrl = computed(() => {
  if (!props.avatarUrl) return ''
  
  // If avatar starts with http, use it directly, otherwise prepend API_URL
  if (props.avatarUrl.startsWith('http')) {
    return props.avatarUrl
  }
  
  return `${API_URL}${props.avatarUrl}`
})

const userInitial = computed(() => {
  const name = props.username || 'User'
  // Get first 2 characters
  return name.substring(0, 2).toUpperCase()
})

const handleImageError = () => {
  imageError.value = true
}
</script>
