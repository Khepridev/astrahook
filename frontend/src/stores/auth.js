import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/utils/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)
  const error = ref(null)
  
  const login = async (email, password) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.post('/api/auth/login', { email, password })
      
      const { token: authToken, user: userData } = response.data
      
      token.value = authToken
      user.value = userData
      
      localStorage.setItem('token', authToken)
      localStorage.setItem('user', JSON.stringify(userData))
      
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'
      return false
    } finally {
      loading.value = false
    }
  }
  
  const register = async (email, password, username) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.post('/api/auth/register', { email, password, username })
      
      // Auto login after registration
      if (response.data.success) {
        return await login(email, password)
      }
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      return false
    } finally {
      loading.value = false
    }
  }
  
  const fetchUser = async () => {
    if (!token.value) return
    
    loading.value = true
    try {
      const response = await api.get('/api/auth/me')
      user.value = response.data.user
      localStorage.setItem('user', JSON.stringify(response.data.user))
    } catch (err) {
      console.error('Failed to fetch user:', err)
      logout()
    } finally {
      loading.value = false
    }
  }
  
  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
  
  const isAuthenticated = () => !!token.value
  const isAdmin = () => user.value?.role === 'admin'
  
  return { 
    user, 
    token, 
    loading, 
    error, 
    login, 
    register, 
    fetchUser, 
    logout, 
    isAuthenticated, 
    isAdmin 
  }
})
