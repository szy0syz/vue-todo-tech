import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history', // 路由模式为非hash路由,
    // base: '/base/' // 统一加前缀域名
    // linkActiveClass: 'active-link', // 只要包含就算匹配就加class
    // linkExactActiveClass: 'exact-link' // 必须精确匹配后才加class
    // scrollBehavior(to, from, savePosition) {
    //   // 页面跳转时，是否接受滚动数值的记录
    //   // 三个参数都是对象！
    //   // console.dir(arguments)
    //   // if (savePosition) {
    //   //   return savePosition
    //   // } else {
    //   //   return { x: 0, y: 0 }
    //   // }
    // }
    // parseQuery(query) {  // 拿参数
    //   console.log(query)
    //   return ''
    // },
    // stringifyQuery(obj) { // 拿参数，对象格式
    //   console.dir(obj)
    //   return ''
    // }
    // fallback: true // 自动识别开启history模式，失败就hash模式
  })
}