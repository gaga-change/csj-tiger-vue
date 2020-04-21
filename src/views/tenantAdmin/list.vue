<template>
  <div class="ComponentNameClass">
    <base-list
      ref="baseList"
      :tableConfig="tableConfig"
      :searchConfig="searchConfig"
      :api="listApi"
      :showControl="true"
      :controlWidth="80"
    >
      <template slot-scope="scope">
        <el-link
          :type="scope.row.userStatus == 1 ? 'warning': 'primary'"
          @click="handleChangeState(scope.row)"
        >{{scope.row.userStatus == 1 ? '禁用': '启用'}}</el-link>
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
import { tenantAdminList, effectTenant } from '@/api'
const tableConfig = [
  { label: '租户名称', prop: 'tenantName', width: 240, },
  { label: '用户名', prop: 'userName', width: 155 },
  { label: '手机号', prop: 'linkTel', width: 155 },
  { label: '启用状态', prop: 'userStatus', type: 'enum', enum: 'activeState' },
  { label: '创建日期', prop: 'gmtCreate', type: 'time', width: 140, },
  { label: '创建者', prop: 'createrName', width: 120 },
  { label: '最后操作日期', prop: 'gmtModify', type: 'time', width: 140, },
  { label: '最后操作者', prop: 'modifierName', width: 125 },
  { label: '来源', prop: 'fromSysCode' },
]
const searchConfig = [
  { label: '租户名称', prop: 'tenantName', width: 240, },
  { label: '用户名', prop: 'userName', width: 155 },
  { label: '手机号', prop: 'linkTel', width: 155 },
  { label: '启用状态', prop: 'userStatus', type: 'enum', enum: 'activeState' },
]
export default {
  data() {
    return {
      tableConfig,
      searchConfig,
      listApi: tenantAdminList,
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
    /** 修改状态 */
    handleChangeState(row) {
      this.$delConfirm(`此操作将${row.userStatus == 1 ? '禁用' : '启用'}租户【${row.tenantName}】，是否继续？`, () => effectTenant({ id: row.id, userStatus: row.userStatus == 1 ? 2 : 1 }).then(res => {
        if (!res) return
        this.$message.success('操作成功！')
        this.getTableData()
      }))
    },
  }
}
</script>