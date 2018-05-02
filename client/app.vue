<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p> ---- {{counter}} ---- {{fullName}}</p>
    <!-- <todo></todo> -->
    <router-link to="/app"> ____app____ </router-link>
    <router-link to="/login"> ____login____ </router-link>
    <router-link to="/login/exact"> ____login_exact____ </router-link>
    <transition name="fade">
      <router-view />
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    Header,
    Footer
    // Todo,
  },
  mounted() {
    console.log(this.$store)
    // setTimeout(() => {
    //   this.$store.commit('updateCount', 4)
    // }, 1500)
    this.updateCount(99)
    this.updateCountAsync({ num: 55, time: 1500 })
  },
  methods: {
    ...mapActions(['updateCountAsync']),
    ...mapMutations(['updateCount'])
  },
  computed: {
    // ...mapState(['count']),
    ...mapState({
      counter: state => state.count
    }),
    // count() {
    //   return this.$store.state.count
    // },
    ...mapGetters(['fullName'])
    // fullName() {
    //   console.log(this.$store.getters)
    //   return this.$store.getters.fullName
    // }
  }
}
</script>

<style lang="stylus" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #999;
  opacity: 0.9;
  z-index: -1;
}
</style>


