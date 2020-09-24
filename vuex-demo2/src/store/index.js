import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios' // 异步操作，定义到actions中

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    inputValue: 'aaa',
    // 下一个id
    nextId: 4,
    viewKey: 'all'
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    setInputValue (state, value) {
      state.inputValue = value
    },
    addItem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue,
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    removeItem (state, id) {
      // 根据id找到索引
      const index = state.list.findIndex(item => {
        if (item.id === id) {
          return true
        }
      })
      // 根据索引删除事项
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    // 修改列表项的选中状态
    changeStatus (state, param) {
      // 根据id找到索引
      const index = state.list.findIndex(item => {
        if (item.id === param.id) {
          return true
        }
      })
      // 根据索引删除事项
      if (index !== -1) {
        state.list[index].done = param.status
      }
      console.log(state.list)
    },
    cleanDone (state) {
      state.list = state.list.filter(item => {
        if (item.done === false) {
          return true
        }
      })
    },
    changeViewKey (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList (context) {
      axios.get('/list.json').then(res => {
        console.log(res.data)
        context.commit('initList', res.data)
      })
    }
  },
  getters: {
    // 统计未完成条数
    unDoneLength (state) {
      return state.list.filter(x => x.done === false).length
    },
    infolist (state) {
      if (state.viewKey === 'all') {
        return state.list
      } else if (state.viewKey === 'undone') {
        return state.list.filter(x => x.done === false)
      } else if (state.viewKey === 'done') {
        return state.list.filter(x => x.done === true)
      }
      return state.list
    }
  },
  modules: {
  }
})
