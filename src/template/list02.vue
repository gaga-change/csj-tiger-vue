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
        >详情</el-link>
        <el-divider direction="vertical"></el-divider>
      </template>
      <template slot="btns">
        <el-button
          type="primary"
          size="mini"
          @click="handleCreate"
        >
          新建质检记录
        </el-button>
      </template>
    </base-list>
  </div>
</template>

<script>
import { checkOrderList } from '@/api'
const tableConfig = [
  { label: '质检单号 ', prop: 'orderCode', width: 140 },
  { label: '收货单号 ', prop: 'receiveOrderCode', width: 140 },
  { label: '创建人', prop: 'createrName' },
  { label: '创建时间', prop: 'gmtCreate', type: 'time', width: 140 },
  { label: '是否虚拟区', prop: 'isVirtual', type: 'enum', enum: 'yesOrNoEnum' },
]
const searchConfig = [
  { label: '质检单号', prop: 'orderCode' },
  { label: '创建时间', prop: 'createTimeArea', props: ['startDate', 'endDate'], type: 'timeArea' },
  { label: '库区性质', prop: 'warehouseAreaNature', type: 'enum', enum: 'warehouseAreaNatureEnum' },
]
export default {
  data() {
    return {
      tableConfig,
      searchConfig,
      listApi: checkOrderList,
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
      this.$delConfirm('此操作将永久删除该模板, 是否继续?', () => deleteLogisticsExpenseInfo(row.id).then(res => {
        if (!res) return
        this.$message.success('删除成功！')
        this.getTableData()
      }))
    },
  }
}
</script>