export const constantRoutes = [
    {
      path: '/redirect',
      component: Layout,
      hidden: true,
      children: [
        {
          path: '/redirect/:path(.*)',
          component: () => import('@/views/redirect/index')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('./src/views/login/index'),
      hidden: true
    },
    {
      path: '/auth-redirect',
      component: () => import('./src/views/login/index'),
      hidden: true
    },
    {
      path: '/404',
      component: () => import('./src/views/error-page/404'),
      hidden: true
    },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index'),
          name: 'Dashboard',
          meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
        }
      ]
    },
    {
      path: '/documentation',
      component: Layout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/documentation/index'),
          name: 'Documentation',
          meta: { title: 'Documentation', icon: 'documentation', affix: true }
        }
      ]
    }
  ]