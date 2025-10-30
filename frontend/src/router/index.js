import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/pages/Landing.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/auth/Login.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/auth/Register.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/docs',
    name: 'DocsHome',
    component: () => import('@/pages/DocsHome.vue'),
  },
  {
    path: '/docs/:slug',
    name: 'DocsPage',
    component: () => import('@/pages/DocsPage.vue'),
  },
  {
    path: '/company/:slug',
    name: 'CompanyPage',
    component: () => import('@/pages/CompanyPage.vue'),
  },
  // Admin Routes
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/pages/admin/AdminLogin.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard',
      },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/pages/admin/AdminDashboard.vue'),
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/pages/admin/Users.vue'),
      },
      {
        path: 'webhooks',
        name: 'AdminWebhooks',
        component: () => import('@/pages/admin/WebhookManagement.vue'),
      },
      {
        path: 'webhooks/:id',
        name: 'AdminWebhookDetails',
        component: () => import('@/pages/admin/WebhookDetails.vue'),
      },
      {
        path: 'webhooks/:id/logs/:logId',
        name: 'AdminLogDetail',
        component: () => import('@/pages/admin/LogDetail.vue'),
      },
      {
        path: 'docs',
        name: 'AdminDocs',
        component: () => import('@/pages/admin/DocsManagement.vue'),
      },
      {
        path: 'docs/new',
        name: 'AdminDocsNew',
        component: () => import('@/pages/admin/DocsEditor.vue'),
      },
      {
        path: 'docs/edit/:id',
        name: 'AdminDocsEdit',
        component: () => import('@/pages/admin/DocsEditor.vue'),
      },
      {
        path: 'my-settings',
        name: 'AdminMySettings',
        component: () => import('@/pages/admin/MySettings.vue'),
      },
      {
        path: 'site-settings',
        name: 'AdminSiteSettings',
        component: () => import('@/pages/admin/SiteSettings.vue'),
      },
      {
        path: 'company-pages',
        name: 'AdminCompanyPages',
        component: () => import('@/pages/admin/CompanyPages.vue'),
      },
      {
        path: 'company-pages/:id/edit',
        name: 'AdminCompanyPageEdit',
        component: () => import('@/pages/admin/CompanyPageForm.vue'),
      },
      {
        path: 'company-pages/new',
        name: 'AdminCompanyPageNew',
        component: () => import('@/pages/admin/CompanyPageForm.vue'),
      },
    ],
  },
  // User Dashboard Routes
  {
    path: '/',
    component: () => import('@/components/layout/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard/Dashboard.vue'),
        meta: {
          requiresAuth: true,
          title: 'Dashboard',
          description: 'Overview of your webhooks and activity',
        },
      },
      {
        path: 'webhooks',
        name: 'Webhooks',
        component: () => import('@/pages/dashboard/Webhooks.vue'),
        meta: {
          requiresAuth: true,
          title: 'Webhooks',
          description: 'Manage your webhook endpoints',
        },
      },
      {
        path: 'webhooks/:id',
        name: 'WebhookDetails',
        component: () => import('@/pages/dashboard/WebhookDetails.vue'),
        meta: {
          requiresAuth: true,
          title: 'Webhook Details',
          description: 'View webhook logs and statistics',
        },
      },
      {
        path: 'webhooks/:id/logs/:logId',
        name: 'LogDetail',
        component: () => import('@/pages/dashboard/LogDetail.vue'),
        meta: {
          requiresAuth: true,
          title: 'Log Details',
          description: 'View detailed log information',
        },
      },

      {
        path: 'my-settings',
        name: 'MySettings',
        component: () => import('@/pages/dashboard/MySettings.vue'),
        meta: {
          requiresAuth: true,
          title: 'My Settings',
          description: 'Manage your account settings',
        },
      },

    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0 }
    }
  },
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Fetch user if token exists but no user data
  if (authStore.token && !authStore.user) {
    try {
      await authStore.fetchUser()
    } catch (err) {
      console.error('Failed to fetch user:', err)
    }
  }

  // Check authentication requirement
  if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
    next('/login')
    return
  }

  // Check guest requirement (redirect authenticated users away from login/register)
  if (to.meta.requiresGuest && authStore.isAuthenticated()) {
    next('/dashboard')
    return
  }

  // Check admin requirement
  if (to.meta.requiresAdmin && !authStore.isAdmin()) {
    next('/admin/login')
    return
  }

  next()
})

export default router
