import { ref } from 'vue'

export const toasts = ref([])

let nextId = 0

export function useToast() {
  const show = (message, type = 'info', duration = 3000) => {
    const id = nextId++
    toasts.value.push({ id, message, type })
    
    if (duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }
    
    return id
  }
  
  const success = (message, duration) => show(message, 'success', duration)
  const error = (message, duration) => show(message, 'error', duration)
  const warning = (message, duration) => show(message, 'warning', duration)
  const info = (message, duration) => show(message, 'info', duration)
  
  return { toasts, show, success, error, warning, info, remove }
}

export function remove(id) {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}
