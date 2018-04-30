import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // path: '/app/:qid',
    path: '/app',
    //props: true, // 路由解耦
    component: Todo,
    beforeEnter(to, from, next) { // 这里路由配置里的钩子
      console.log('routes before Enter')
      next()
    },
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'app desc'
    },
    // children: [ // 嵌套路由，需要放在Todo组件中<router-view></router-view>
    //   {
    //     path: '/cc1',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: Login
  }
]
