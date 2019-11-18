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
      :select="true"
      @selectionChange="selectionChange"
      :selectable="() => true"
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
          @click="handleAdd"
        >
          加入结算表
        </el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
        >
          确定结算
        </el-button>
        <el-button
          type="primary"
          @click="hanldeRemove"
        >
          从结算表中移除
        </el-button>
        <el-button
          type="primary"
          @click="handlePreview"
        >
          去报表中预览
        </el-button>
      </template>
    </base-list>
    <addSettlement
      :visible.sync="addSettlementVisible"
      :rows="selectRowsStatus0"
      @submited="getTableData()"
    />
  </div>
</template>

<script>
import addSettlement from './components/addSettlement'
import { queryCostSattleList, selectAllConsolidator } from '@/api'
const tableConfig = [
  { label: '序号', prop: '_index', width: 80 },
  { label: '结算状态', prop: 'costSettlementStatus', type: 'enum', enum: 'costSettlementStatusEnum' },
  { label: '结算日期', prop: 'costSettlementDate', type: 'time', format: 'YYYY-MM-DD' },
  { label: '承运商编码', prop: 'consoildatorCode', width: 140 },
  { label: '承运商名称', prop: 'consoildatorName' },
  { label: '出库日期', prop: 'settlementDate', type: 'time', format: 'YYYY-MM-DD' },
  { label: '物流单号', prop: 'logisticsOrderCode' },
  { label: '客户名称', prop: 'customerName' },
  { label: '客户地址', prop: 'dispatchAddr' },
  { label: '件数', prop: 'packagesQty' },
  { label: '重量', prop: 'skuWeight' },
  { label: '体积', prop: 'skuVolume' },
  { label: '运费', prop: 'dispatchCost' },
  { label: '运费区分', prop: 'expenseName' },
]
const searchConfig = [
  { label: '承运商', prop: 'consoildatorCode', type: 'enum', enum: '_consoildatorNameApi' },
  { label: '出库日期', prop: 'createTimeArea', props: ['startDate', 'endDate'], type: 'timeArea' },
  { label: '配送单号', prop: 'dispatchNo' },
  { label: '结算状态 ', prop: 'costSettlementStatus', type: 'enum', enum: 'costSettlementStatusEnum' },
]
export default {
  components: { addSettlement },
  data() {
    return {
      tableConfig,
      searchConfig,
      listApi: queryCostSattleList,
      // 可选 附加查询条件
      appendSearchParams: {},
      selectRows: [],
      addSettlementVisible: false,
    }
  },
  computed: {
    selectRowsStatus0() {
      return this.selectRows.filter(v => v.costSettlementStatus === 0)
    }
  },
  created() {
    this.selectAllConsolidator()
  },
  methods: {
    /** 加入结算 */
    handleAdd() {
      if (!this.selectRowsStatus0.length) {
        return this.$message.warning('勾选项中没有未结算状态')
      }
      this.addSettlementVisible = true
    },
    /** 确定结算 */
    handleConfirm() {

    },
    /** 从结算表中移除 */
    hanldeRemove() {

    },
    /** 去报表中预览 */
    handlePreview() {

    },
    /** 获取所有承运商 */
    selectAllConsolidator() {
      selectAllConsolidator().then(res => {
        if (res) {
          this.$store.commit('SET_MAP', {
            _consoildatorNameApi: res.data.map(v => {
              return {
                value: v.consoildatorName,
                key: v.consoildatorCode,
              }
            })
          })
        }
      })
    },
    /** 主表多选 */
    selectionChange(selectRows) {
      this.selectRows = [...selectRows]
    },
    /** 刷新列表 */
    getTableData() {
      this.$refs['baseList'].fetchData()
    },
    /** 可选 返回列表添加字段 */
    parseData(res) {
      let data = res.data.list || []
      let total = res.data.total
      const { pageNum, pageSize } = res.data
      data.forEach((v, i) => {
        v._index = (pageNum - 1) * pageSize + i + 1
      })
      return { data, total }
    },
    /** 新建 */
    handleCreate() {
      this.$router.push({ path: '/qualityTesting/create' })
    }
  }
}
</script>