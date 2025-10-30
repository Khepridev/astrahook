import { useToast } from './useToast'

export function useClipboard() {
  const toast = useToast()
  
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
      return true
    } catch (err) {
      toast.error('Failed to copy to clipboard')
      return false
    }
  }
  
  return { copy }
}
