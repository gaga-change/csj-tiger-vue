<template>
  <div v-loading="loading">
    <div
      class="mb20 text-right"
      v-if="detail.billStatus === 1"
    >
      <el-button
        type="primary"
        @click="handleTryPush"
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
          name="palnList"
        >
          <base-table
            :config="planListConfig"
            :data="detail.palnList"
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
            :data="detail.orderList"
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
import { inBillDetail, inBillUpdateStatus } from '@/api'

const detailItemConfig = [
  { label: '业务单号 ', prop: 'billNo' },
  { label: '单据组织 ', prop: 'billOrganize' },
  { label: '单据类型 ', prop: 'busiBillType', type: 'enum', enum: 'getInBillType' },
  { label: '货主', prop: 'ownerName' },
  { label: '供应商', prop: 'providerName' },
  { label: '联系人', prop: 'AAA' },
  { label: '联系电话', prop: 'AAA' },
  { label: '供应商地址', prop: 'AAA' },
  { label: '仓库', prop: 'warehouseName' },
  { label: '退料理由', prop: 'AAA' },
  { label: '备注', prop: 'AAA' },
  { label: '创建时间', prop: 'gmtCreate', type: 'time' },
]

const detailSonListConfig = [
  { label: '序号', prop: 'index' },
  { label: '商品编码', prop: 'skuCode' },
  { label: '商品名称', prop: 'skuName' },
  { label: '货主商品编码', prop: 'providerSkuCode' },
  { label: '规格', prop: 'skuFormat' },
  { label: '型号', prop: 'skuModel' },
  { label: '数量', prop: 'planInQty' },
  { label: '已出', prop: 'realInQty' },
  { label: '进货价', prop: 'inPrice' },
]
const planListConfig = [
  { label: '计划单号', prop: 'AAA' },
  { label: '单据状态', prop: 'AAA' },
  { label: '业务单号', prop: 'AAA' },
  { label: '货主', prop: 'AAA' },
  { label: '供应商', prop: 'AAA' },
]
const orderListConfig = [
  { label: '出库单号', prop: 'AAA' },
  { label: '计划单号', prop: 'AAA' },
  { label: '业务单号', prop: 'AAA' },
  { label: '货主', prop: 'AAA' },
  { label: '供应商', prop: 'AAA' },
  { label: '入库数量', prop: 'AAA' },
  { label: '入库日期', prop: 'AAA' },
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
      detail: {
        sonList: [],
        planList: [],
        orderList: []
      },
    }
  },
  created() {
    this.initData()
  },
  methods: {
    /** 手动推送点击事件 */
    handleTryPush() {

      this.$prompt('审核意见', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{0,50}$/,
        inputErrorMessage: '意见长度最多50个字'
      }).then(({ value }) => {
        this.loading = true
        inBillUpdateStatus({
          inWarehouseBillId: this.$route.query.id,
          statusFlag: 1,
        }).then(res => {
          if (!res) {
            this.loading = false
            return
          }
          this.$message.success('操作成功！')
          this.initData()
        })
      }).catch(() => {
      })
    },
    /** 获取详情内容 */
    initData() {
      this.loading = true
      const id = this.$route.query.id
      inBillDetail(id).then(res => {
        this.loading = false
        if (!res) return
        res.data.sonList = (res.data.items || []).map((v, i) => ({ ...v, index: i + 1 }))
        res.data.planList = res.data.planList || []
        res.data.orderList = res.data.orderList || []
        this.detail = res.data
      })
    },
  },
}
</script>