<template>
  <div class="space-y-1">
    <label v-if="label" :for="id" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed"
      :class="{ 'border-error focus:ring-error': error }"
    />
    <p v-if="error" class="text-sm text-error">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  label: String,
  type: { type: String, default: 'text' },
  modelValue: [String, Number],
  placeholder: String,
  error: String,
  disabled: Boolean,
})

defineEmits(['update:modelValue'])
</script>
