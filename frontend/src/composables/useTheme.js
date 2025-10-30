import { useThemeStore } from '@/stores/theme'
import { computed } from 'vue'

export function useTheme() {
  const themeStore = useThemeStore()
  
  const isDark = computed(() => themeStore.theme === 'dark')
  const theme = computed(() => themeStore.theme)
  
  const toggleTheme = () => {
    themeStore.toggleTheme()
  }
  
  const setTheme = (newTheme) => {
    themeStore.setTheme(newTheme)
  }
  
  return {
    isDark,
    theme,
    toggleTheme,
    setTheme,
  }
}
