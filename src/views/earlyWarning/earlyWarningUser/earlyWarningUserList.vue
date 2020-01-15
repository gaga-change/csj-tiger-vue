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
      </template>
      <template slot="btns">
        <el-button
          type="primary"
          size="mini"
          @click="dialogVisible=true"
        >
          配置
        </el-button>
      </template>
    </base-list>
    <earlyWarningUserAddFromDialog
      :visible.sync="dialogVisible"
      @submited="getTableData()"
    />
  </div>
</template>

<script>
import { exceptionReceiverList, exceptionReceiverDelete } from '@/api'
import earlyWarningUserAddFromDialog from './components/earlyWarningUserAddFromDialog'
const tableConfig = [
  { label: '序号', prop: 'index', width: 60 },
  { label: '货主', prop: 'ownerName' },
  { label: '单据类型', prop: 'billType', type: 'enum', enum: 'getBaseDateType' },
  { label: '提醒类型', prop: 'exceptionType', type: 'enum', enum: 'getIssuedState' },
  { label: '信息接收人', prop: 'receiveName' },
]
const searchConfig = [
  { label: '货主', prop: 'ownerCode', type: 'enum', enum: 'ownerInfoMap' },
  { label: '单据类型', prop: 'billType', type: 'enum', enum: 'getBaseDateType' },
  { label: '异常时间', prop: 'createTimeArea', props: ['gmtCreateBegin', 'gmtCreateEnd'], type: 'timeArea' },
]
export default {
  components: { earlyWarningUserAddFromDialog },
  data() {
    return {
      dialogVisible: false,
      tableConfig,
      searchConfig,
      listApi: exceptionReceiverList,
      // 可选 附加查询条件
      appendSearchParams: {},
    }
  },
  methods: {
    /** 刷新列表 */
    getTableData() {
      this.$refs['baseList'].fetchData()
    },
    /** 可选 返回列表添加字段 */
    parseData(res) {
      let data = res.data.list || []
      let { total, pageNum, pageSize } = res.data
      data.forEach((v, i) => {
        v.index = (pageNum - 1) * pageSize + i + 1
        v.updateLockStatusOutLoading = false
        v.updateLockStatusInLoading = false
      })
      return { data, total }
    },
    /** 新建 */
    handleCreate() {
      this.$router.push({ path: '/qualityTesting/create' })
    },
    /** 删除 */
    handleDel(row) {
      this.$delConfirm('此操作将永久删除该预警接收人设置, 是否继续?', () => exceptionReceiverDelete(row.id).then(res => {
        if (!res) return
        this.$message.success('删除成功！')
        this.getTableData()
      }))
    },
  }
}
</script>