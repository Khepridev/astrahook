import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // Default to dark theme
  const theme = ref(localStorage.getItem('theme') || 'dark')
  
  const setTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    applyTheme()
  }
  
  const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }
  
  const applyTheme = () => {
    const html = document.documentElement
    console.log('Applying theme:', theme.value)
    console.log('HTML classes before:', html.className)
    
    if (theme.value === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    
    console.log('HTML classes after:', html.className)
  }
  
  // Apply theme on store initialization
  applyTheme()
  
  return { theme, setTheme, toggleTheme }
})
