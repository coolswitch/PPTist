import router from '@/router'
import useAuth from '@/hooks/useAuth'
import { useSlidesStore } from '@/store'

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

router.beforeEach((to, from, next) => {
  if (to.path === '/preview') {
    const slidesStore = useSlidesStore()
    if (slidesStore.slides.length) return next()
    return next('/')
  }
  next()
})
