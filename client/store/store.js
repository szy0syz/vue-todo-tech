import Vuex from 'vuex'

// 典型闭包应用，每次返回都是一个函数，执行则生成新的作用域
export default () => {
  return new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      updateCount(state, num) {
        state.count = num
      }
    }
  })
}
