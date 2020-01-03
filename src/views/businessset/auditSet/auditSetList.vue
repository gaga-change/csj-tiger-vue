<template>
  <div class="ComponentNameClass">
    <base-list
      ref="baseList"
      :tableConfig="tableConfig"
      :searchConfig="searchConfig"
      :api="listApi"
      :showControl="false"
      :controlWidth="160"
      :parseData="parseData"
    >
      <template
        slot="col"
        slot-scope="scope"
      >
        <el-radio-group
          v-model="scope.row.auditTypeSelect"
          @change="val => hanleChangeSelect(val, scope.row)"
        >
          <el-radio :label="1">自动审核</el-radio>
          <el-radio :label="2">人工审核</el-radio>
        </el-radio-group>
      </template>
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
import { basicAuditConfigList } from '@/api'
const tableConfig = [
  { label: '序号', prop: 'index', width: 50 },
  { label: '货主', prop: 'ownerName' },
  { label: '单据', prop: 'billType', type: 'enum', enum: 'auditBillTypeEnum' },
  { label: '审批设置', prop: 'auditType', type: 'slot', edit: true },
]
const searchConfig = [
  { label: '货主', prop: 'createrName' },
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
    hanleChangeSelect(val, row) {
      console.log(val, row)
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
      return { data: [{ index: 1, ownerName: 'gaga', auditType: 2, billType: 1, auditTypeSelect: 2 }], total: 1 }
    },
    /** 新建 */
    handleCreate() {
      this.$router.push({ path: '/qualityTesting/create' })
    }
  }
}
</script>