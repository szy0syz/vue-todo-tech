import Vue from 'vue'
import { create } from 'domain';

const Comp1 = {
  props: ['mTitle'],
  data() {
    return {
      cp1Title: 'cp1Title最厉害',
      style: {
        width: '400px',
        height: '300px',
        border: '2px solid #000',
        color: 'red'
      }
    }
  },
  // template: `
  //   <div :style="style">
  //     <p>{{cp1Title}} + {{mTitle}}</p>
  //     <slot name="slotContent"></slot>
  //   </div>
  // `
  // ,
  render(createElement) {
    return createElement('div', {
      style: this.style,
      on: {
        click: () => { this.$emit('click') }
      }
    }, [
      createElement('p', this.cp1Title + ' + ' + this.mTitle),
      this.$slots.slotContent
    ])
  }
}

new Vue({
  el: '#root',
  components: {
    cp1: Comp1
  },
  data() {
    return {
      mainTitle: 'mainTitle_' + Date.now()
    }
  },
  // template: `
  //   <div>
  //     <cp1 ref="cp1Ref" :mTitle="mainTitle" @click="handleClick">
  //       <span slot="slotContent" ref="cSpan">我是cp1的default.slot</span>
  //     </cp1>
  //   </div>
  // `,
  render(createElement) {
    return createElement('div', {}, [
      createElement('cp1', {
        props: {
          mTitle: this.mainTitle
        },
        ref: 'cp1Ref',
        on: {
          click: this.handleClick // 不需要箭头函数，只需要将对象引用地址赋值即可
        }
        //,
        // nativeOn: { // nativeOn的区别是直接绑定在子组件的根元素节点上，子组件不需要$emit触发
        //   click: this.handleClick
        // }
      }, [
        createElement('span', {
          ref: 'cSpan',
          slot: 'slotContent'
        }, `我是cp1的default.slot`)
      ])
    ])
  },
  created() {
    console.dir(this.$refs)
  },
  methods: {
    handleClick() {
      console.log('handleClick ' + this.mainTitle)
    }
  }
})
