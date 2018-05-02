import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

// 典型闭包应用，每次返回都是一个函数，执行则生成新的作用域
export default () => {
  return new Vuex.Store({
    state: defaultState,
    mutations,
    getters,
    actions
  })
}
