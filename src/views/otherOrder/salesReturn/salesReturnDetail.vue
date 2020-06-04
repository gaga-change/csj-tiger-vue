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
          label="出库单"
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
import { outBillDetail, outBillCheck, outPlanSelect, queryWarehouseCode } from '@/api'

const detailItemConfig = [
  { label: '业务单号 ', prop: 'billNo' },
  { label: '单据组织 ', prop: 'billOrganize' },
  { label: '单据类型 ', prop: 'outBusiBillType' },
  { label: '货主', prop: 'ownerName' },
  { label: '供应商', prop: 'arrivalName' },
  { label: '联系人', prop: 'arrivalLinkUser' },
  { label: '联系电话', prop: 'arrivalLinkTel' },
  { label: '供应商地址', prop: 'arrivalAddress' },
  { label: '仓库', prop: 'outWarehouseName' },
  { label: '退料理由', prop: 'returnReason' },
  { label: '备注', prop: 'remarkInfo' },
  { label: '创建时间', prop: 'gmtCreate', type: 'time' },
]

const detailSonListConfig = [
  { label: '序号', prop: 'index' },
  { label: '商品编码', prop: 'skuCode' },
  { label: '商品名称', prop: 'skuName' },
  { label: '货主商品编码', prop: 'customerSkuCode' },
  { label: '规格', prop: 'skuFormat' },
  { label: '型号', prop: 'skuModel' },
  { label: '数量', prop: 'realOutQty' },
  { label: '已出', prop: 'realOutQty' },
  { label: '进货价', prop: 'outStorePrice' },
]
const planListConfig = [
  { label: '计划单号', prop: 'planCode' },
  { label: '单据类型', prop: 'planState', type: 'enum', enum: 'getPlanState' },
  { label: '业务单号', prop: 'billNo' },
  { label: '货主', prop: 'ownerName' },
  { label: '供应商', prop: 'arrivalName' },
]
const orderListConfig = [
  { label: '出库单号', prop: 'warehouseExeCode' },
  { label: '计划单号', prop: 'planCode' },
  { label: '业务单号', prop: 'billNo' },
  { label: '货主', prop: 'ownerName' },
  { label: '供应商', prop: 'arrivalName' },
  { label: '入库数量', prop: 'outQty' },
  { label: '入库日期', prop: 'outStoreTime', type: 'time' },
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
      this.$auditPrompt('请输入审核意见！', ({ pass, value }) => outBillCheck({
        outWarehouseBillId: this.detail.id,
        checkAdvice: value,
        checkFlag: pass ? 1 : 2
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
      outBillDetail(id).then(res => {
        this.loading = false
        if (!res) return
        res.data.sonList = (res.data.busiBillDetails || []).map((v, i) => ({ ...v, index: i + 1 }))
        this.detail = res.data
        return res.data
      }).then(({ billNo, ownerCode }) => {
        Promise.all([
          outPlanSelect({ pageNum: 1, pageSize: 999, billNo, ownerCode }),
          queryWarehouseCode({ pageNum: 1, pageSize: 999, billNo, ownerCode })
        ]).then(resArr => {
          {
            const res = resArr[0]
            if (res)
              this.planList = res.data.list
          }
          {
            const res = resArr[1]
            if (res)
              this.orderList = res.data.list
          }
        })
      })
    },
  },
}
</script>