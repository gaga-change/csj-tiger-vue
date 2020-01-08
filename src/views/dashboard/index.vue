<template>
  <div class="dashboard-container">
    <item-title text="待办事项" />
    <div v-loading="todoListLoading">
      <base-table
        :config="messageTableConfig"
        :data="messageList"
      >
      </base-table>
    </div>
  </div>
</template>

<script>
import { todoList } from '@/api'
import { mapGetters } from 'vuex'
export default {
  name: 'dashboard',
  data() {
    return {
      messageTableConfig: [],
      todoListLoading: false,
      activeName: 'message',
      messageList: [],
    };
  },
  created() {
    this.initData()
    this.messageTableConfig = [
      { label: '业务类型', prop: 'busiBillType', type: 'enum', enum: 'toDoTypeEnum' },
      {
        label: '单号',
        prop: 'planCode',
        dom: (row, column, cellValue, index) => {
          const configItem = {
            linkTo: '',
            query: [{ key: 'planCode', value: 'planCode' }]
          }
          if (row.busiBillType == 0) { // 入库
            configItem.linkTo = '/warehousing/plan-detail'
          } else { // 出库
            configItem.linkTo = '/outgoing/plan-detail'
          }
          let json = {};
          configItem.query && configItem.query.forEach(item => {
            json[item.key] = row[item.value]
          })
          let linkTo = configItem.linkTo
          if (configItem.linkTo.constructor === Function) {
            linkTo = configItem.linkTo(row)
          }
          return <router-link to={{ path: linkTo, query: json }} style={{ color: '#3399ea' }}>{configItem.linkText ? configItem.linkText : cellValue}</router-link>
        }
      },
      { label: '货主', prop: 'ownerName' },
      { label: '外部订单号', prop: 'busiBillNo' },
      { label: '处理动作', prop: 'planState', type: 'enum', enum: 'getPlanState' },
      { label: '创建日期', prop: 'gmtCreate', type: 'time' },
    ]
  },
  methods: {
    initData() {
      this.todoListLoading = true
      todoList().then(res => {
        this.todoListLoading = false
        if (!res) return
        this.messageList = res.data || []
      })
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
}

</script>

<style rel="stylesheet/scss" lang="scss">
</style>
