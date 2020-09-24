import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  /**
   * getter用于对Store中的数据进行加工处理形成新的数据
   * 1.getter可以对Store中的已有数据加工处理后形成新的数据，类似Vue的计算属性
   * 2.Store中数据发生变化，Getter的数据也会发生变化
   */
  /**
   * getter的使用
   * 1.this.$store.getters.名称
   * 2.也可以在Vue的计算属性中进行映射
   */
  getters: {
    showNum: state => {
      return `当前最新的数量是【${state.count}】`
    }
  },
  mutations: {
    countAdd (state, step = 1) {
      if (state.count >= 10) {
        state.count = 10
      } else {
        state.count = state.count + step
      }
    },
    countSub (state, step = 1) {
      if (state.count <= 0) {
        state.count = 0
      } else {
        state.count = state.count - step
      }
    }
  },
  // actions用于处理mutations中不能处理的异步函数
  // actions不能直接修改state中的数据，必须得通过mutations才能修改
  actions: {
    // context 相当于store的实例化对象
    countAddAsync (context, step = 1) {
      setTimeout(() => {
        context.commit('countAdd', step)
      }, 1000)
    }
  }
})
