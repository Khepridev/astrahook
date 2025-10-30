import permissionService from '../services/permissionService.js'

// Middleware to check if user has a specific permission
export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: true,
        message: 'Authentication required',
        code: 'NO_AUTH'
      })
    }

    const hasPermission = permissionService.hasPermission(req.user.role, permission)

    if (!hasPermission) {
      return res.status(403).json({
        error: true,
        message: `Permission denied. Required: ${permission}`,
        code: 'FORBIDDEN',
        requiredPermission: permission
      })
    }

    next()
  }
}

// Middleware to check if user has any of the permissions
export const requireAnyPermission = (permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: true,
        message: 'Authentication required',
        code: 'NO_AUTH'
      })
    }

    const hasAnyPermission = permissions.some(permission =>
      permissionService.hasPermission(req.user.role, permission)
    )

    if (!hasAnyPermission) {
      return res.status(403).json({
        error: true,
        message: 'Permission denied',
        code: 'FORBIDDEN',
        requiredPermissions: permissions
      })
    }

    next()
  }
}

// Middleware to check if user has all permissions
export const requireAllPermissions = (permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: true,
        message: 'Authentication required',
        code: 'NO_AUTH'
      })
    }

    const hasAllPermissions = permissions.every(permission =>
      permissionService.hasPermission(req.user.role, permission)
    )

    if (!hasAllPermissions) {
      const missingPermissions = permissions.filter(permission =>
        !permissionService.hasPermission(req.user.role, permission)
      )

      return res.status(403).json({
        error: true,
        message: 'Permission denied',
        code: 'FORBIDDEN',
        requiredPermissions: permissions,
        missingPermissions
      })
    }

    next()
  }
}

// Helper to check ownership (user can only access their own resources)
export const requireOwnership = (resourceUserIdGetter) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: true,
        message: 'Authentication required',
        code: 'NO_AUTH'
      })
    }

    // Admin can access all resources
    if (req.user.role === 'admin') {
      return next()
    }

    const resourceUserId = resourceUserIdGetter(req)

    if (resourceUserId !== req.user.userId) {
      return res.status(403).json({
        error: true,
        message: 'You can only access your own resources',
        code: 'FORBIDDEN'
      })
    }

    next()
  }
}

export default {
  requirePermission,
  requireAnyPermission,
  requireAllPermissions,
  requireOwnership
}
