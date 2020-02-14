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
        meta: { title: '控制台', icon: 'dashboard', affix: true }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/dynamic-form',
    component: Layout,
    meta: { title: '动态表单管理', icon: 'form' },
    redirect: '/dynamic-form/template',
    children: [
      {
        path: 'template',
        name: 'Template',
        component: () => import('@/views/dynamic-form/index'),
        meta: { title: '动态模版', icon: 'form' }
      },
      {
        path: 'df-add',
        name: 'Df-add',
        component: () => import('@/views/dynamic-form/df-add'),
        meta: { title: '新增动态模版', icon: 'form' },
        hidden: true
      },
      {
        path: 'df-edit',
        name: 'Df-edit',
        component: () => import('@/views/dynamic-form/df-edit'),
        meta: { title: '编辑动态模版', icon: 'form' },
        hidden: true
      }
    ]
  },
  {
    path: '/dictionary',
    component: Layout,
    meta: { title: '字典表管理', icon: 'form' },
    redirect: '/dictionary/dict-list',
    children: [
      {
        path: 'dict-list',
        name: 'Dict-list',
        component: () => import('@/views/dictionary/index'),
        meta: { title: '字典表', icon: 'form' }
      },
      {
        path: 'dict-add',
        name: 'Dict-add',
        component: () => import('@/views/dictionary/dict-add'),
        meta: { title: '新增字典', icon: 'form' },
        hidden: true
      },
      {
        path: 'dict-edit',
        name: 'Dict-edit',
        component: () => import('@/views/dictionary/dict-edit'),
        meta: { title: '编辑字典', icon: 'form' },
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
