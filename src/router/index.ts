import { h } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw, type RouterOptions } from 'vue-router'
import homeRoutes from './home'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/home',
    component: () => import('@/layout/Home.vue'),
    children: [...homeRoutes],
  },
  {
    path: '/md',
    component: () => import('@/views/Markdown/index.vue'),
  },
  {
    path: '/preview',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/403',
    name: '403',
    component: { render: () => h('h2', '403 - 无权访问') },
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
