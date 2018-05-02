// 我们可以简单地理解getter就是一个computed
// getter可以方便我们生成一些应用中可以直接拿的数据
// 例如，后端当给我们某些数据时，不符合我们的显示规则，此时我们就需要用getter处理
export default {
  fullName(state) {
    return `${state.firstName} - ${state.lastName}`
  }
}