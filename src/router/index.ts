import { h } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw, type RouterOptions } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/Markdown/index.vue'),
  },
  {
    path: '/preview',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/403',
    name: '403',
    component: { render: () => h('h2', '403') },
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: { render: () => h('h2', '404') },
  },
] as Array<RouteRecordRaw>

const router = createRouter({
  history: createWebHistory(),
  routes,
} as RouterOptions)

export default router
