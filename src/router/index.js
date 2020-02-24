import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/',
    component: () => import('@/views/dashboard/index'),
    redirect: '/declare-index',
    hidden: true,
    children: [
      {
        path: 'declare-index',
        name: 'DeclareIndex',
        component: () => import('@/views/dashboard/declare-index'),
        hidden: true
      },
      {
        path: 'declare-form',
        name: 'DeclareForm',
        component: () => import('@/views/declare-form/index'),
        hidden: true
      }
    ]
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
