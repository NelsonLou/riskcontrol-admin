import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/router/routes'

Vue.use(Router)

const router = new Router({routes})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    localStorage.removeItem('user')
  }
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user && to.path !== '/login') {
    next({path: '/login'})
  } else {
    next()
  }
})

export default router
