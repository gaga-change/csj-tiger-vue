<template>
  <div class="ComponentNameClass">
    <base-list
      ref="baseList"
      :tableConfig="tableConfig"
      :searchConfig="searchConfig"
      :api="listApi"
      :showControl="true"
      :controlWidth="160"
    >
      <template slot-scope="scope">
        <el-link
          type="primary"
          @click="handleDel(scope.row)"
        >删除</el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link
          type="primary"
          @click="handleModify(scope.row)"
        >修改</el-link>
      </template>
      <template slot="btns">
        <el-button
          type="primary"
          size="mini"
          @click="handleModify(null)"
        >
          新建款项
        </el-button>
      </template>
    </base-list>
    <addDialogForm
      :visible.sync="dialogVisible"
      :row="selectedRow"
      @submited="getTableData()"
    />
  </div>
</template>

<script>
import { queryLogisticsExpense, deleteLogisticsExpenseInfo } from '@/api'
import addDialogForm from './components/addDialogForm'
const tableConfig = [
  { label: '款项编码', prop: 'expenseCode' },
  { label: '款项名称', prop: 'expenseName' },
  { label: '款项性质', prop: 'expenseType', type: 'enum', enum: 'getExpenseTypeList' }
]
const searchConfig = [
  { label: '款项编码', prop: 'expenseCode' },
  { label: '款项名称', prop: 'expenseName' },
  { label: '款项性质', prop: 'expenseType', type: 'enum', enum: 'getExpenseTypeList' }
]
export default {
  components: {
    addDialogForm,
  },
  data() {
    return {
      dialogVisible: false,
      selectedRow: null,
      tableConfig,
      searchConfig,
      listApi: queryLogisticsExpense,
      // 可选 附加查询条件
      appendSearchParams: {},
    }
  },
  methods: {
    /** 删除 */
    handleDel(row) {
      this.$delConfirm('此操作将永久删除该模板, 是否继续?', () => deleteLogisticsExpenseInfo(row.id).then(res => {
        if (!res) return
        this.$message.success('删除成功！')
        this.getTableData()
      }))
    },
    /** 修改 */
    handleModify(row) {
      this.selectedRow = row
      this.dialogVisible = true
    },
    /** 刷新列表 */
    getTableData() {
      this.$refs['baseList'].fetchData()
    },
    /** 可选 返回列表添加字段 */
    parseData(res) {
      let data = res.data.list || []
      let total = res.data.total
      data.forEach(v => {
        v.updateLockStatusOutLoading = false
        v.updateLockStatusInLoading = false
      })
      return { data, total }
    },
  }
}
</script>