<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handleInputChange"/>
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infolist" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e) => {cbstatusChanged(e, item.id)}">{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ unDoneLength }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey === 'all'? 'primary' : 'default' " @click="changelist('all')">全部</a-button>
          <a-button :type="viewKey === 'undone'? 'primary' : 'default' " @click="changelist('undone')">未完成</a-button>
          <a-button :type="viewKey === 'done'? 'primary' : 'default' " @click="changelist('done')">已全部</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {}
  },
  created() {
    // console.log(this.$store);
    this.$store.dispatch('getList')
  },
  methods: {
    handleInputChange(e) {
      // console.log(e.target.value)
      this.$store.commit('setInputValue', e.target.value)
    },
    addItemToList() {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('文本框内容不能为空！')
      }
      this.$store.commit('addItem')
    },
    // 根据id删除对应的任务事项
    removeItemById(id) {
      // console.log(id)
      this.$store.commit('removeItem', id)
    },
    cbstatusChanged(e, id) {
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeStatus', param)
    },
    clean() {
      this.$store.commit('cleanDone')
    },
    changelist(key) {
      // console.log(key);
      this.$store.commit('changeViewKey', key)
    }
  },
  computed: {
    ...mapState(['inputValue', 'viewKey']),
    ...mapGetters(['unDoneLength', 'infolist'])
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
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
