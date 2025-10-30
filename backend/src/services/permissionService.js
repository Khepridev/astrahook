import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class PermissionService {
  constructor() {
    this.permissions = null
    this.loadPermissions()
  }

  // Load permissions from JSON file
  loadPermissions() {
    try {
      const permissionsPath = path.join(__dirname, '../models/Permissions.json')
      const data = fs.readFileSync(permissionsPath, 'utf8')
      this.permissions = JSON.parse(data)
      console.log('✓ Permissions loaded successfully')
    } catch (error) {
      console.error('✗ Failed to load permissions:', error.message)
      throw error
    }
  }

  // Get all permissions for a role
  getRolePermissions(role) {
    if (!this.permissions || !this.permissions.roles) {
      return []
    }
    return this.permissions.roles[role] || []
  }

  // Check if a role has a specific permission
  hasPermission(role, permission) {
    const rolePermissions = this.getRolePermissions(role)
    return rolePermissions.includes(permission)
  }

  // Check if user has permission (by user object)
  userHasPermission(user, permission) {
    if (!user || !user.role) {
      return false
    }
    return this.hasPermission(user.role, permission)
  }

  // Check if user has any of the permissions
  userHasAnyPermission(user, permissions) {
    if (!user || !user.role) {
      return false
    }
    return permissions.some(permission => this.hasPermission(user.role, permission))
  }

  // Check if user has all permissions
  userHasAllPermissions(user, permissions) {
    if (!user || !user.role) {
      return false
    }
    return permissions.every(permission => this.hasPermission(user.role, permission))
  }

  // Get all available roles
  getRoles() {
    if (!this.permissions || !this.permissions.roles) {
      return []
    }
    return Object.keys(this.permissions.roles)
  }

  // Get permission description
  getPermissionDescription(permission) {
    if (!this.permissions || !this.permissions.permissions) {
      return null
    }
    return this.permissions.permissions[permission] || null
  }

  // Get all permissions with descriptions
  getAllPermissions() {
    if (!this.permissions || !this.permissions.permissions) {
      return {}
    }
    return this.permissions.permissions
  }

  // Validate if a role exists
  isValidRole(role) {
    return this.getRoles().includes(role)
  }
}

// Create singleton instance
const permissionService = new PermissionService()

export default permissionService
