import router from '@/router'
import useAuth from '@/hooks/useAuth'

/* 路由前置守卫:权限校验 */
router.beforeEach((to, from, next) => {
  const { getToken } = useAuth()
  if (to.path === '/') {
    if (getToken()) next('/home')
    else next()
  } else {
    if (getToken()) next()
    else next('/')
  }
  // next()
})
