<template>
  <div>
    <!-- <h3>当前最新的count值为：{{$store.state.count}}</h3> -->
    <h3>当前最新的count值为：{{count}}</h3>
    <!-- <h3>当前最新最新的count值为：{{$store.getters.showNum}}</h3> -->
    <h3>当前最新最新的count值为：{{showNum}}</h3>
    <button @click="btnHandler1">+1</button>
    <button @click="btnHandler2(2)">+N</button>
    <button @click="btnHandler3">异步++</button>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    // 相当于this.count = this.$ .state.count
    ...mapState(['count']),
    ...mapGetters(['showNum'])
  },
  methods: {
    ...mapMutations(['countAdd']),
    ...mapActions(['countAddAsync']),
    btnHandler1 () {
      // commit用来出发某个mutations
      // this.$store.commit('countAdd')
      this.countAdd()
    },
    btnHandler2 (n) {
      this.countAdd(n)
      // this.$store.commit('countAdd', n)
    },
    btnHandler3 () {
      // 使用actions 异步处理
      // dispatch用来出发某个actions
      // this.$store.dispatch('countAddAsync')
      this.countAddAsync(3)
    }
  }
}
</script>
