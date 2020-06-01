<template>
  <div class="">
    <base-list
      ref="baseList"
      :tableConfig="tableConfig"
      :searchConfig="searchConfig"
      :appendSearchParams="appendSearchParams"
      :api="listApi"
      :showControl="true"
      :controlWidth="160"
    >
      <template slot-scope="scope">
        <el-link
          type="primary"
          @click="$router.push({path:`/otherOrder/salesReturnDetail`,query:{id: scope.row.id}})"
        >查看</el-link>
        <template v-if="scope.row.billStatus === 1">
          <el-divider direction="vertical"></el-divider>
          <el-link
            type="primary"
            @click="$router.push({path:`/otherOrder/salesReturnDetail`,query:{id: scope.row.id}})"
          >审核</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link
            type="primary"
            @click="handleDel(scope.row)"
          >删除</el-link>
        </template>
      </template>
      <template slot="btns">
        <el-button
          type="primary"
          size="mini"
          @click="handleCreate"
        >
          新增采购退货单
        </el-button>
      </template>
    </base-list>
  </div>
</template>

<script>
import { outBillList, outBillDelete } from '@/api'

const tableConfig = [
  { label: '业务单号 ', prop: 'billNo', width: 140 },
  { label: '单据类型 ', prop: 'outBusiBillType' },
  { label: '货主', prop: 'ownerName' },
  { label: '供应商', prop: 'arrivalName' },
  { label: '单据状态', prop: 'billStatus', type: 'enum', enum: 'billStatusInEnum' },
  { label: '执行状态', prop: 'billState', type: 'enum', enum: 'billStateEnum' },
  { label: '创建时间', prop: 'gmtCreate', type: 'time', width: 140 },
]
const searchConfig = [
  { label: '业务单号 ', prop: 'billNo', width: 140 },
  { label: '单据类型 ', prop: 'outBusiBillType', type: 'outBusiBillType', busiTypeCode: 22 },
  { label: '货主', prop: 'ownerName' },
  { label: '供应商', prop: 'providerName' },
  { label: '单据状态', prop: 'billStatus', type: 'enum', enum: 'billStatusInEnum' },
  { label: '执行状态', prop: 'billState', type: 'enum', enum: 'billStateEnum' },
  { label: '创建时间', prop: 'createTimeArea', props: ['createTimeFrom', 'createTimeTo'], type: 'timeArea', default: [new Date(Date.now() - 24 * 60 * 60 * 1000 * 7), new Date()] },
]
export default {
  data() {
    return {
      tableConfig,
      searchConfig,
      listApi: outBillList,
      // 可选 附加查询条件
      appendSearchParams: {
        fromSystemId: 'QLL',
        busiBillType: 22,
      },
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
      this.$router.push({ path: '/otherOrder/salesReturnForm/add' })
    },
    /** 删除 */
    handleDel(row) {
      this.$delConfirm('请再次确认是否要删除该单据?', () => outBillDelete(row.id).then(res => {
        if (!res) return
        this.$message.success('删除成功！')
        this.getTableData()
      }))
    },
  }
}
</script>