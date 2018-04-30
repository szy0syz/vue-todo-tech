import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: Todo,
  },
  {
    path: '/app/:qid',
    props: true, // 路由解耦
    component: Todo,
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
