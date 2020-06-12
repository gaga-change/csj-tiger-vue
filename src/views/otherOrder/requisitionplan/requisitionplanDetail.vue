<template>
  <div class="outgoing-quirydetail-container">
    <div
      class="mb20 text-right"
      v-if="infoData.transferStatus === 0"
    >
      <el-button
        type="primary"
        @click="handleAudit"
      >
        审核
      </el-button>
    </div>
    <item-title text="基本信息" />
    <item-card
      :config="infoConfig"
      :loading="loading"
      :cardData="infoData"
    />

    <item-title text="相关明细" />
    <el-tabs
      v-model="activeName"
      type="card"
    >
      <el-tab-pane
        label="调拨单"
        name="business"
      >
        <edit-table
          :loading="loading"
          :config="detailTableConfig"
          :allTableData="tableData"
        />
      </el-tab-pane>
      <el-tab-pane
        label="计划单"
        name="plan"
      >
        <edit-table
          :loading="loading"
          :config="detail_planTableConfig"
          :allTableData="detail_planTableData"
        />
      </el-tab-pane>
      <el-tab-pane
        label="出/入库单"
        name="outgonging"
      >
        <edit-table
          :loading="loading"
          :config="detail_outGoingTableConfig"
          :allTableData="detail_outGoingTableData"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

const detail_planTableConfig = [
  { label: '序号', type: 'index', fixed: true, width: 50 },
  { label: '业务类型', prop: 'busiBillType', type: 'billTypeFilter', useLocalEnum: true },
  { label: '计划单号', prop: 'planCode' },
  { label: '数量', prop: 'planQty' },
  { label: '金额', prop: 'planAmt' }
]


const detail_outGoingTableConfig = [
  { label: '序号', type: 'index', fixed: true, width: 50 },
  { label: '业务类型', prop: 'busiBillType', type: 'billTypeFilter', useLocalEnum: true },
  { label: '单号', prop: 'warehouseExeCode' },
  { label: '计划单号', prop: 'planCode' },
  { label: '数量', prop: 'planQty' },
  { label: '金额', prop: 'planAmt' }
]

const infoConfig = [
  { title: '调拨单号', prop: 'transferNo' },
  { title: '货主', prop: 'ownerName' },
  { title: '调出仓库', prop: 'outWarehouseName' },
  { title: '调出日期', prop: 'outDate', type: 'time' },
  { title: '调入仓库', prop: 'inWarehouseName' },
  { title: '调入日期', prop: 'inDate', type: 'time' },
  { title: '接收人', prop: 'warehouseLinkName' },
  { title: '所在地区', prop: 'area' },
  { title: '详细地址', prop: 'warehouseAddress' },
  { title: '联系方式', prop: 'linkTel' },
  { title: '备注', prop: 'remarkInfo', span: 12 },
  { title: '单据组织', prop: 'inOrganize' },
  { title: '单据类型', prop: 'outBusiBillType' },
  { title: '调出组织', prop: 'outOrganize' },
  { title: '调入组织', prop: 'inOrganize' },
  { title: '供应商', prop: 'providerName' },
]

const tableConfig = [
  { label: '序号', type: 'index', width: 50 },
  { label: '商品编码', prop: 'skuCode' },
  { label: '商品名称', prop: 'skuName', width: 120 },
  { label: '调拨数量', prop: 'transferQty' },
  { label: '已出库数量', prop: 'realOutQty' },
  { label: '已出库金额', prop: 'realOutAmt' },
  { label: '已入库数量', prop: 'realInQty' },
  { label: '已入库金额', prop: 'realInAmt' },
  { label: '备注', prop: 'remarkInfo' }
];

import editTable from '@/components/Table/editTable';
import Sticky from '@/components/Sticky'
import moment from 'moment';
import { mapGetters } from 'vuex'
import { handleTransferNo } from '@/api'
import { requisitiondetail, queryPlandetail, queryOrderdetail } from '@/api/requisition'

export default {
  components: { editTable, Sticky },
  data() {
    return {
      loading: false,
      infoData: {},
      infoConfig,
      tableData: [],
      detailTableConfig: tableConfig,
      activeName: 'business',
      detail_planTableConfig,
      detail_planTableData: [],
      detail_outGoingTableConfig,
      detail_outGoingTableData: [],
    }
  },

  created() {
    this.getCurrentTableData()
  },

  computed: {
    ...mapGetters({
      visitedViews: 'visitedViews'
    })
  },

  methods: {
    moment,
    /** 审核 */
    handleAudit() {
      this.$auditPrompt('请输入审核意见！', ({ pass, value }) => handleTransferNo({
        id: this.infoData.id,
        transferStatus: pass ? 1 : 3,
        auditOpinion: value
      }).then(res => {
        if (!res) return
        this.$message.success('操作成功！')
        this.getCurrentTableData()
      }))
    },
    getCurrentTableData() {
      requisitiondetail({ id: this.$route.query.id }).then(res => {
        if (res.success) {
          let data = res.data
          this.infoData = res.data
          this.infoData.area = data.warehouseProvince ? (data.warehouseProvince + data.warehouseCity + data.warehouseArea) : null
          this.tableData = (res.data.transferBillDetailDOList && res.data.transferBillDetailDOList.length > 0) ? res.data.transferBillDetailDOList : []
          // 查询相关出入库计划单
          queryPlandetail({ transferNo: data.transferNo, }).then(res => {
            if (res.success) {
              this.detail_planTableData = (res.data && res.data.length > 0) ? res.data : []
            }
          }).catch(err => {
            console.error(err)
          })
          //查询相关出入库单
          queryOrderdetail({ transferNo: data.transferNo, }).then(res => {
            if (res.success) {
              this.detail_outGoingTableData = (res.data && res.data.length > 0) ? res.data : []
            }
          }).catch(err => {
            console.error(err)
          })
        }
      }).catch(err => {
        console.error(err)
      })
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
.el-dialog__body {
  padding-top: 12px;
}
</style>
