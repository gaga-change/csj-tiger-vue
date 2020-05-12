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
          @click="$router.push({path:`/qualityTesting/detail`,query:{id: scope.row.id}})"
        >查看</el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link
          type="primary"
          @click="handleDel(scope.row)"
        >删除</el-link>
      </template>
      <template slot="btns">
        <el-button
          type="primary"
          size="mini"
          @click="handleCreate"
        >
          新增杂收
        </el-button>
      </template>
    </base-list>
  </div>
</template>

<script>
import { basicAuditConfigList } from '@/api'
const tableConfig = [
  { label: '业务单号 ', prop: 'AA', width: 140 },
  { label: '单据类型 ', prop: 'AA' },
  { label: '货主', prop: 'AA' },
  { label: '供应商', prop: 'AA' },
  { label: '单据状态', prop: 'AA', type: 'enum', enum: 'yesOrNoEnum' },
  { label: '执行状态', prop: 'AA', type: 'enum', enum: 'yesOrNoEnum' },
  { label: '创建时间', prop: 'gmtCreate', type: 'time', width: 140 },
]
const searchConfig = [
  { label: '业务单号 ', prop: 'AA' },
  { label: '单据类型 ', prop: 'AA' },
  { label: '货主', prop: 'AA' },
  { label: '供应商', prop: 'AA' },
  { label: '单据状态', prop: 'AA', type: 'enum', enum: 'yesOrNoEnum' },
  { label: '执行状态', prop: 'AA', type: 'enum', enum: 'yesOrNoEnum' },
  { label: '创建时间', prop: 'createTimeArea', props: ['startDate', 'endDate'], type: 'timeArea' },
]
export default {
  data() {
    return {
      tableConfig,
      searchConfig,
      listApi: basicAuditConfigList,
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
      this.$router.push({ path: '/otherOrder/otherOrderOutForm/add' })
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