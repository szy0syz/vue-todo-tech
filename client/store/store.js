import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

// 典型闭包应用，每次返回都是一个函数，执行则生成新的作用域
export default () => {
  const store = new Vuex.Store({
    state: defaultState,
    mutations,
    getters,
    actions,
    plugins: [
      (store) => {
        // store.subscribe
        console.log('my plugin invoked')
      }
    ],
    modules: {
      A: {
        namespaced: true, // 强制启用命名空间 调用时a/title
        state: {
          title: 'planAAA',
          counter: 0
        },
        mutations: {
          updateCounter(state, num) {
            console.log('invoke A/updateCounter-mutations')
            state.counter = state.counter + num
          }
        },
        getters: {
          counterPlus(state, getters, rootState) {
            return state.counter + rootState.planB.value
          }
        },
        actions: {
          add({ state, commit, rootState }) {
            commit('updateCounter', rootState.count)
          }
        }
      },
      planB: {
        state: {
          title: 'planBBBB',
          value: 99
        },
        mutations: {
          updateBVal(state, val) {
            console.log('mutations-updateVal:', state.value)
            state.value = val
          }
        }
      }
    }
  })

  if(module.hot) {
    module.hot.accept([
      // 选择需要动态监视的路径文件
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => {
      // 加载更新后的模块 , 必须加default
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default
      // 换成新的 各个模块
      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }

  return store
}
