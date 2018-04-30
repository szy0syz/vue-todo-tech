import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'

import createRouter from './config/router'

import './assets/styles/global.styl'

Vue.use(VueRouter)

const root = document.createElement('div')
document.body.appendChild(root)

const router = createRouter()

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

new Vue({
  router,
  render: h => h(App)
}).$mount(root)
