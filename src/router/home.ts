import { h } from 'vue'
import { RouterView, type RouteRecordRaw, type RouterOptions } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    meta: { title: '模板管理' },
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: 'account-manage',
    meta: { title: '账号管理' },
    component: () => import('@/views/Home/account-manage.vue')
    // component: { render: () => h('h2', '账号管理') },
  }
  // {
  //   path: 'test',
  //   meta: { title: '二级导航' },
  //   component: { render: () => h(RouterView) },
  //   children: [
  //     {
  //       path: 'test1',
  //       meta: { title: '二级导航111' },
  //       component: { render: () => h('h2', '403 - 无权访问') },
  //     },
  //   ],
  // },
]

export default routes
