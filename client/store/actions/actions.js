export default {
  updateCountAsync(state, {num, time}) {
    setTimeout(() => {
      this.state.count = num
    }, time)
  }
}