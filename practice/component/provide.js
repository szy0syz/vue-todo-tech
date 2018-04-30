import Vue from 'vue'

const Comp1 = {
  inject: ['father', 'fr1'],
  template: '<span>Comp1 - {{fr1}}</span>',
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
    return {
      father: this,
      fr1: this.r1
    }
  },
  el: '#root',
  data: {
    r1: 'r1r1'
  },
  template: `<div><comp1></comp1></div>`,
  mounted() {
    console.log('root mounted~')
  }
})