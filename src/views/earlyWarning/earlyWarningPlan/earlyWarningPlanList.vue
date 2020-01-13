<template>
  <div class="ComponentNameClass">
    <base-list
      ref="baseList"
      :tableConfig="tableConfig"
      :searchConfig="searchConfig"
      :api="listApi"
      :showControl="true"
      :controlWidth="160"
      :parseData="parseData"
    >
      <template slot-scope="scope">
        <el-link
          type="primary"
          @click="$router.push({path:`/qualityTesting/detail`,query:{id: scope.row.id}})"
        >详情</el-link>
        <el-divider direction="vertical"></el-divider>
      </template>
      <template slot="btns">

      </template>
    </base-list>
  </div>
</template>

<script>
import { exceptionDataSelectListPage, ownerInfoList } from '@/api'
const tableConfig = [
  { label: '序号', prop: 'index', width: 60 },
  { label: '货主', prop: 'ownerName' },
  { label: '单据类型', prop: 'billType', type: 'enum', enum: 'getBaseDateType' },
  { label: '单据号', prop: 'billCode' },
  { label: '异常类型', prop: 'exceptionType', type: 'enum', enum: 'getIssuedState' },
  { label: '发生时间', prop: 'gmtCreate', type: 'time', width: 140 },
]
const searchConfig = [
  { label: '货主', prop: 'ownerCode', type: 'enum', enum: 'ownerInfoMap' },
  { label: '单据类型', prop: 'billType', type: 'enum', enum: 'getBaseDateType' },
  { label: '异常时间', prop: 'createTimeArea', props: ['gmtCreateBegin', 'gmtCreateEnd'], type: 'timeArea' },
]
export default {
  data() {
    return {
      tableConfig,
      searchConfig,
      listApi: exceptionDataSelectListPage,
      // 可选 附加查询条件
      appendSearchParams: {},
    }
  },
  created() {

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
      })
      return { data, total }
    },
    /** 新建 */
    handleCreate() {
      this.$router.push({ path: '/qualityTesting/create' })
    },
    /** 删除 */
    handleDel(row) {
      this.$delConfirm('此操作将永久删除该模板, 是否继续?', () => deleteLogisticsExpenseInfo(row.id).then(res => {
        if (!res) return
        this.$message.success('删除成功！')
        this.getTableData()
      }))
    },
  }
}
</script>