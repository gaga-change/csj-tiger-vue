<template>
  <div>
    <div class="">
      <base-list
        ref="baseList"
        :tableConfig="tableConfig"
        :searchConfig="searchConfig"
        :api="listApi"
        :showControl="true"
        :controlWidth="100"
        :labelWidth="120"
        @search="handleSearch"
      >
        <template slot-scope="scope">

          <el-link
            type="primary"
            @click="handleDelete(scope.row)"
          >删除</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link
            type="primary"
            @click="handleModify(scope.row)"
          >编辑</el-link>
        </template>
        <template slot="btns">
          <div class="text-right">
            <a :href="`/webApi/serviceChargeBill/export?${linkData}`">
              <el-button type="primary">
                导出Excel
              </el-button>
            </a>
            <upload-excel
              class="ml10"
              @uploadRes="uploadRes"
              :name="'file'"
              :importText="'导入'"
              :modelUrl="'/static/templet/serviceCharge.xlsx'"
              :filesuploadUrl="'/webApi/serviceChargeBill/import/batch'"
            ></upload-excel>
            <el-button
              class="ml10"
              type="primary"
              @click="handleCreate"
            >新建</el-button>
          </div>
        </template>
      </base-list>
    </div>
    <service-charge-pick-form
      :visible.sync="serviceChargePickFormVisible"
      @confirm="confirm"
      :row="nowRow"
    />
  </div>
</template>

<script>
import { stringify } from 'qs';
import serviceChargePickForm from './components/serviceChargePickForm'
import { serviceChargeBillDelete } from '@/api'

import { serviceChargeBillQueryPageList } from '@/api'
const tableConfig = [
  { label: '单号', prop: 'chargeBillNo', width: 120 },
  { label: '货主编码', prop: 'ownerCode', width: 120 },
  { label: '货主', prop: 'ownerName', width: 120 },
  { label: '是否有外部订单号', prop: 'isHasOrder', type: 'enum', enum: 'isHasOrderEnum', width: 120 },
  { label: '费用区分', prop: 'expenseName', width: 120 },
  { label: '款项性质', prop: 'expenseType', type: 'enum', enum: 'getExpenseTypeList', width: 120 },
  { label: '外部订单号', prop: 'busiBillNo', width: 120 },
  { label: '物流单号', prop: 'logisticsOrderCode', width: 120 },
  { label: '承运商编码', prop: 'consoildatorCode', width: 120 },
  { label: '承运商名称', prop: 'consoildatorName', width: 120 },
  { label: '地址', prop: 'dispatchAddr', width: 120 },
  { label: '客户编码', prop: 'customerCode', width: 120 },
  { label: '客户名称', prop: 'customerName', width: 120 },
  { label: '结算日期', prop: 'settlementDate', type: 'time', format: 'YYYY-MM-DD', width: 120 },
  { label: '费用', prop: 'expenseAmt', width: 120 },
  { label: '结算方式', prop: 'settlementType', type: 'enum', enum: 'settlementType2', width: 120 },
  { label: '创建日期', prop: 'gmtCreate', type: 'time', format: 'YYYY-MM-DD', width: 120 },
  { label: '备注', prop: 'remarkInfo', width: 120 },
]
const searchConfig = [
  { label: '货主', prop: 'ownerCode', type: 'enum', enum: 'ownerInfoMap' },
  { label: '款项性质', prop: 'expenseType', type: 'enum', enum: 'getExpenseTypeList' },
  { label: '费用区分', prop: 'expenseName' },
  { label: '是否有外部订单号', prop: 'isHasOrder', type: 'enum', enum: 'isHasOrderEnum' },
  { label: '物流单号', prop: 'logisticsOrderCode' },
  { label: '结算日期', prop: 'settlementDate', props: ['settlementDateStart', 'settlementDateEnd'], type: 'timeArea' },
  { label: '创建日期', prop: 'gmtCreate', props: ['gmtCreateStart', 'gmtCreateEnd'], type: 'timeArea' },
]

export default {
  components: { serviceChargePickForm },
  data() {
    return {
      serviceChargePickFormVisible: false,
      tableConfig,
      searchConfig,
      listApi: serviceChargeBillQueryPageList,
      nowRow: null,
      linkData: ''
    }
  },
  methods: {
    /** 搜索事件 */
    handleSearch(params) {
      this.linkData = stringify(params)
    },
    /** 刷新列表 */
    getTableData() {
      this.$refs['baseList'].fetchData()
    },
    /** 删除 */
    handleDelete(row) {
      this.$delConfirm('此操作将永久删除改收派服务费配置, 是否继续?', () => serviceChargeBillDelete(row.id).then(res => {
        if (!res) return
        this.$message.success('删除成功！')
        this.getTableData()
      }))
    },
    /** 修改 */
    handleModify(row) {
      this.nowRow = row
      this.$nextTick(() => {
        this.serviceChargePickFormVisible = true
      })
    },
    /** 添加 */
    handleCreate() {
      this.nowRow = null
      this.$nextTick(() => {
        this.serviceChargePickFormVisible = true
      })
    },
    uploadRes(result) {
      this.getTableData()
    },
    /** 添加后刷新列表 */
    confirm() {
      this.getTableData()
    }
  },
}
</script>
