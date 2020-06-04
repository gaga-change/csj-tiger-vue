<template>
  <div v-loading="loading">
    <div
      class="mb20 text-right"
      v-if="detail.billStatus === 0"
    >
      <el-button
        type="primary"
        @click="handleAudit"
      >
        审核
      </el-button>
    </div>
    <div>
      <item-title>基本信息</item-title>
      <detail-item
        :config="detailItemConfig"
        :detail="detail"
        :labelWidth="100"
      />
    </div>
    <div class="mt25">
      <item-title>商品明细</item-title>

      <el-tabs
        v-model="activeName"
        type="card"
      >
        <el-tab-pane
          label="业务单"
          name="items"
        >
          <base-table
            :config="detailSonListConfig"
            :data="detail.sonList"
            :showControl="false"
            :controlWidth="160"
            :select="false"
          >
          </base-table>
        </el-tab-pane>
        <el-tab-pane
          label="计划单"
          name="planList"
        >
          <base-table
            :config="planListConfig"
            :data="planList"
            :showControl="false"
            :controlWidth="160"
            :select="false"
          >
          </base-table>
        </el-tab-pane>
        <el-tab-pane
          label="出/入库单"
          name="orderList"
        >
          <base-table
            :config="orderListConfig"
            :data="orderList"
            :showControl="false"
            :controlWidth="160"
            :select="false"
          >
          </base-table>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>
<script>
import { inBillDetail, inPlanSelect, queryInWarehouseCode, inBillAudit } from '@/api'

const detailItemConfig = [
  { label: '业务单号 ', prop: 'billNo' },
  { label: '单据组织 ', prop: 'billOrganize' },
  { label: '单据类型 ', prop: 'outBusiBillType' },
  { label: '货主', prop: 'ownerName' },
  { label: '供应商', prop: 'providerName' },
  { label: '是否生产相关', prop: 'isProduct', type: 'enum', enum: 'isPrint' },
  { label: '受益部门', prop: 'benefitDepartment' },
  { label: '工作号', prop: 'workNo' },
  { label: '研发项目', prop: 'developProject' },
  { label: '服务与费用', prop: 'serviceCost' },
  { label: '仓库', prop: 'outWarehouseName' },
  { label: '创建时间', prop: 'gmtCreate', type: 'time' },
]

const detailSonListConfig = [
  { label: '序号', prop: 'index' },
  { label: '商品编码', prop: 'skuCode' },
  { label: '商品名称', prop: 'skuName' },
  { label: '货主商品编码', prop: 'customerSkuCode' },
  { label: '规格', prop: 'skuFormat' },
  { label: '型号', prop: 'skuModel' },
  { label: '数量', prop: 'skuInQty' },
  { label: '已出/入', prop: 'realInQty' },
  { label: '进货价', prop: 'inPrice' },
  { label: '生产订单号', prop: 'ownerOrderNo' },
  { label: '零成本', prop: 'zoroCost', type: 'enum', enum: 'isPrint' },
]

// export const detail_planTableConfig = [
//   { label: '计划单号', prop: 'planCode', width: 150, fixed: true, linkTo: '/warehousing/plan-detail', query: [{ key: 'planCode', value: 'planCode' }] },
//   { label: '业务单号', prop: 'billNo', width: 170 },
//   { label: '单据状态', prop: 'planState', type: 'getPlanState', useApi: true, width: 80 },
//   { label: '供应商名称', prop: 'providerName', width: 180 },
//   { label: '货主', prop: 'ownerName', width: 180 },
//   { label: '制单人', prop: 'createrName' },
//   { label: '计划入库仓库', prop: 'planWarehouseName' },
//   { label: '执行状态', width: 80, prop: 'execStatus', type: 'getExecState', useApi: true },
//   { label: '计划入库日期', prop: 'planTime', type: 'time', width: 140 }
// ]

const planListConfig = [
  { label: '计划单号', prop: 'planCode' },
  { label: '单据类型', prop: 'planState', type: 'enum', enum: 'getPlanState' },
  { label: '业务单号', prop: 'billNo' },
  { label: '货主', prop: 'ownerName' },
  { label: '供应商', prop: 'providerName' },
]

// export const detail_warehousingTableConfig = [
//   { label: '入库单号', fixed: true, prop: 'warehouseExeCode', linkTo: '/warehousing/quiry-detail', width: 150, query: [{ key: 'warehouseExeCode', value: 'warehouseExeCode' }] },
//   { label: '业务单号', prop: 'billNo', width: 180 },
//   { label: '计划单号', prop: 'planCode', width: 150, linkTo: '/warehousing/plan-detail', query: [{ key: 'planCode', value: 'planCode' }] },
//   { label: '合同编号', prop: 'contractNo', width: 100 },
//   { label: '供应商名称', prop: 'providerName', width: 180 },
//   { label: '货主', prop: 'ownerName', width: 180 },
//   { label: '仓库', prop: 'warehouseName', width: 140 },
//   { label: '入库金额', prop: 'inAmt' },
//   { label: '入库数量', prop: 'inQty' },
//   { label: '业务板块', prop: 'busiPlate', width: 100, useLocalEnum: true, type: 'busiPlateConfig' },
//   { label: '入库日期', prop: 'inWarehouseTime', type: 'time', width: 140 },
// ]

const orderListConfig = [
  { label: '出/入库单号', prop: 'warehouseExeCode' },
  { label: '计划单号', prop: 'planCode' },
  { label: '业务单号', prop: 'billNo' },
  { label: '货主', prop: 'ownerName' },
  { label: '供应商', prop: 'providerName' },
  { label: '出/入库数量', prop: 'inQty' },
  { label: '出/入库日期', prop: 'inWarehouseTime', type: 'time' },
]

export default {
  components: {},
  data() {
    return {
      loading: true,
      detailItemConfig,
      detailSonListConfig,
      planListConfig,
      orderListConfig,
      activeName: 'items',
      planList: [],
      orderList: [],
      detail: {
        sonList: [],
      },
    }
  },
  created() {
    this.initData()
  },
  methods: {
    /** 审核 */
    handleAudit() {
      this.$auditPrompt('请输入审核意见！', ({ pass, value }) => inBillAudit({
        inWarehouseBillId: this.detail.id,
        auditOpinion: value,
        billStatus: pass ? 1 : 2
      }).then(res => {
        if (!res) return
        this.$message.success('操作成功！')
        this.initData()
      }))
    },
    /** 获取详情内容 */
    initData() {
      this.loading = true
      const id = this.$route.query.id
      inBillDetail(id).then(res => {
        if (!res) return
        res.data.sonList = (res.data.items || []).map((v, i) => ({ ...v, index: i + 1 }))
        return this.detail = res.data
      }).then((res) => {
        if (!res) return
        const { billNo, ownerCode } = res
        return Promise.all([
          inPlanSelect({ billNo, ownerCode, pageNum: 1, pageSize: 999 }),
          queryInWarehouseCode({ billNo, ownerCode, pageNum: 1, pageSize: 999 })
        ]).then(resArr => {
          {
            const res = resArr[0]
            if (res) {
              this.planList = res.data.list
            }
          }
          {
            const res = resArr[1]
            if (res) {
              this.orderList = res.data.list
            }
          }
        })
      }).then(res => {
        this.loading = false
      })
    },
  },
}
</script>