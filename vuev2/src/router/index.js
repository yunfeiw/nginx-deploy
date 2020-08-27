import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { isLogin: true },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: { isLogin: true },
    component: () => import(/* webpackChunkName: "404" */ '../views/Error.vue')
  },
  {
    path: '*',
    redirect: { name: '404' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //校验登录态
  const { isLogin } = to.meta;
  const signState = localStorage.getItem('token')
  if (isLogin) {
    next()
  } else {
    if (signState) {
      next()
    } else {
      next({ name: "Login" })
    }
  }
})
export default router
