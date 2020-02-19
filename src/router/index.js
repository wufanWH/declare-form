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
    path: '/business-form',
    component: Layout,
    meta: { title: '业务表单管理', icon: 'form' },
    redirect: '/business-form/business-list',
    children: [
      {
        path: 'business-list',
        name: 'BusinessList',
        component: () => import('@/views/business-form/index'),
        meta: { title: '业务表单管理', icon: 'form' }
      },
      {
        path: 'business-form-list',
        name: 'BusinessFormList',
        component: () => import('@/views/business-form/form-list'),
        meta: { title: '业务表单配置', icon: 'form' },
        hidden: true
      }
    ]
  },
  {
    path: '/template',
    component: Layout,
    meta: { title: '模板管理', icon: 'form' },
    redirect: '/template/template-list',
    children: [
      {
        path: 'template-list',
        name: 'TemplateList',
        component: () => import('@/views/template/index'),
        meta: { title: '模板管理', icon: 'form' }
      },
      {
        path: 'template-add',
        name: 'Template-add',
        component: () => import('@/views/template/template-add'),
        meta: { title: '新增模版', icon: 'form' },
        hidden: true
      },
      {
        path: 'template-edit',
        name: 'Template-edit',
        component: () => import('@/views/template/template-edit'),
        meta: { title: '配置模板字段', icon: 'form' },
        hidden: true
      }
    ]
  },
  {
    path: '/field-name',
    component: Layout,
    meta: { title: '字段管理', icon: 'form' },
    redirect: '/field-name/field-list',
    children: [
      {
        path: 'field-list',
        name: 'FieldList',
        component: () => import('@/views/field-name/index'),
        meta: { title: '字段管理', icon: 'form' }
      },
      {
        path: 'field-add',
        name: 'Field-add',
        component: () => import('@/views/field-name/field-add'),
        meta: { title: '新增字段', icon: 'form' },
        hidden: true
      },
      {
        path: 'field-edit',
        name: 'Field-edit',
        component: () => import('@/views/field-name/field-edit'),
        meta: { title: '修改字段', icon: 'form' },
        hidden: true
      },
      {
        path: 'field-info',
        name: 'Field-info',
        component: () => import('@/views/field-name/field-info'),
        meta: { title: '查看字段信息', icon: 'form' },
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
