import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import createRouter from './config/router'
import createStore from './store/store'

import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)

const root = document.createElement('div')
document.body.appendChild(root)

const router = createRouter()
const store = createStore()

// 路由的全局钩子
router.beforeEach((to, from, next) => {
  console.log('before Each invoked')
  next()
  // if (to.fullPath === '/app') {
  //   console.log('您必须登录后才能访问app')
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
})

router.beforeResolve((to, from, next) => {
  console.log('before Resolve invoked')
  next()
})

router.afterEach((to, from) => {
  console.log('after Each invoked')
})

const isDev = process.env.NODE_ENV === 'development'

new Vue({
  strict: isDev,
  router,
  store,
  render: h => h(App)
}).$mount(root)
