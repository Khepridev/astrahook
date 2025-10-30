import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { messages, defaultLocale } from '@/i18n'

export const useLocaleStore = defineStore('locale', () => {
  const currentLocale = ref(localStorage.getItem('locale') || defaultLocale)

  const t = computed(() => {
    return (key) => {
      const keys = key.split('.')
      let value = messages[currentLocale.value]
      
      for (const k of keys) {
        if (value && typeof value === 'object') {
          value = value[k]
        } else {
          return key // Return key if translation not found
        }
      }
      
      return value || key
    }
  })

  const setLocale = (locale) => {
    if (messages[locale]) {
      currentLocale.value = locale
      localStorage.setItem('locale', locale)
      document.documentElement.lang = locale
    }
  }

  const getLocale = () => currentLocale.value

  const availableLocales = computed(() => Object.keys(messages))

  return {
    currentLocale,
    t,
    setLocale,
    getLocale,
    availableLocales
  }
})
