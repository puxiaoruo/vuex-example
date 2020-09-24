<template>
  <div id="app">
    <a-input v-model="inputValue" placeholder="请输入任务" class="my_ipt"
    @change="handleInputChange"></a-input>
    <a-button type="primary" @click="addItemToList">添加事项</a-button>
    <a-list bordered :dataSource="infolist" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-checkbox :checked="item.done" @change="(e) => {cbStatusChanged(e, item.id)}">{{item.info}}</a-checkbox>
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>
      <div slot="footer" class="footer">
        <span>{{unDoneLength}}条剩余</span>
        <a-button-group>
          <a-button :type="viewKey === 'all' ? 'primary' : 'default'" @click="changeList('all')">全部</a-button>
          <a-button  :type="viewKey === 'undone' ? 'primary' : 'default'" @click="changeList('undone')">未完成</a-button>
          <a-button  :type="viewKey === 'done' ? 'primary' : 'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['inputValue', 'viewKey']),
    ...mapGetters(['unDoneLength', 'infolist'])
  },
  methods: {
    ...mapMutations(['setInputValue', 'addItem', 'removeItem', 'changeStatus', 'cleanDone', 'changeViewKey']),
    // 监听文本框内容变化
    handleInputChange (e) {
      this.setInputValue(e.target.value)
    },
    // 添加事项
    addItemToList () {
      // trim() 去除空格
      if (this.inputValue.trim().length <= 0) {
        this.$message.warning('文本框内容不能为空')
        return
      }
      this.addItem()
    },
    // 根据id删除对应的事项
    removeItemById (id) {
      this.removeItem(id)
    },
    // 监听复选框选中状态变化的事件
    cbStatusChanged (e, id) {
      console.log(e.target.checked)
      const param = {
        id: id,
        status: e.target.checked
      }
      this.changeStatus(param)
    },
    // 清除已完成的任务
    clean () {
      this.cleanDone()
    },
    changeList (type) {
      console.log(type)
      this.changeViewKey(type)
    }
  }
}
</script>

<style>
#app {
  padding: 10px;
}
.my_ipt {
  width: 500px !important;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
