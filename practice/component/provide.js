import Vue from 'vue'

const Comp1 = {
  inject: ['father', 'data'],
  template: '<span>Comp1 - {{data.r1}}</span>',
  data() {
    return {
      c1: 2
    }
  }
}

new Vue({
  components: {
    Comp1: Comp1
  },
  provide() {
    const data = {}

    Object.defineProperty(data, 'r1', {
      get: () => this.r1,
      enumerable: true
    })

    return {
      father: this,
      data
    }
  },
  el: '#root',
  data: {
    r1: 'r1r1'
  },
  template: `<div><input type="text" v-model="r1"><comp1></comp1></div>`,
  mounted() {
    console.log('root mounted~')
  }
})