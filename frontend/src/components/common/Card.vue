<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
      <slot name="header" />
    </div>
    <div class="p-6">
      <slot />
    </div>
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  hover: Boolean,
})

const cardClasses = computed(() => {
  const base = 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-all'
  const hoverEffect = props.hover ? 'hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-700 hover:-translate-y-1 cursor-pointer' : ''
  return `${base} ${hoverEffect}`
})
</script>
