<template>
  <div>
    <h3>当前最新的count值为：{{$store.state.count}}</h3>
    <h3>当前最新的count值为：{{count}}</h3>
    <button @click="btnHandler2">-1</button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    // 相当于this.count = this.$ .state.count
    ...mapState(['count'])
  },
  methods: {
    btnHandler2 () {
      this.$store.commit('countSub')
    }
  }
}
</script>
