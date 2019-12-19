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
          size="mini"
          @click="importFileVisible=true"
        >
          导入
        </el-button>
        <el-button
          type="primary"
          size="mini"
          @click="handelDel"
        >
          删除
        </el-button>
      </template>
    </base-list>
    <importFile
      :visible.sync="importFileVisible"
      @submited="getTableData()"
    />
  </div>
</template>

<script>
import importFile from './components/importFile'
import { queryStatementList, selectAllConsolidator, batchDeleteStatement } from '@/api'
const tableConfig = [
  { label: '序号', prop: '_index', width: 80 },
  { label: '承运商编码', prop: 'consoildatorCode', width: 120 },
  { label: '承运商名称', prop: 'consoildatorName', width: 120 },
  { label: '寄件日期', prop: 'sendDate', type: 'time', format: 'YYYY-MM-DD' },
  { label: '起始地', prop: 'startAddress' },
  { label: '车牌号', prop: 'licensePlateNo' },
  { label: '配送单号', prop: 'dispatchNo' },
  { label: '件数', prop: 'packagesQty' },
  { label: '重量', prop: 'skuWeight' },
  { label: '体积', prop: 'skuVolume' },
  { label: '运费', prop: 'freightAmt' },
  { label: '签回单费', prop: 'signAmt' },
  { label: '附加费用', prop: 'extraAmt' },
  { label: '结算金额', prop: 'settlementAmt' },
  { label: '结算方式', prop: 'settlementWay' },
  { label: '省份', prop: 'sendProvince' },
  { label: '城市', prop: 'sendCity' },
  { label: '收件人', prop: 'recieverName' },
  { label: '产品类型', prop: 'productType' },
  { label: '导入日期', prop: 'gmtCreate', type: 'time', format: 'YYYY-MM-DD' },
]
const searchConfig = [
  { label: '承运商', prop: 'consoildatorCode', type: 'enum', enum: '_consoildatorNameApi' },
  { label: '寄件日期', prop: 'createTimeArea', props: ['startDate', 'endDate'], type: 'timeArea' },
  { label: '配送单号', prop: 'dispatchNo' },
  { label: '导入日期', prop: 'importTimeArea', props: ['createBeginDate', 'createEndDate'], type: 'timeArea' },
  { label: '结算金额', prop: 'settlement', props:['minSettlementAmt', 'maxSettlementAmt'],type: 'numRange' },
]
export default {
  components: { importFile },
  data() {
    return {
      tableConfig,
      searchConfig,
      listApi: queryStatementList,
      // 可选 附加查询条件
      appendSearchParams: {},
      selectRows: [],
      delLoading: false,
      importFileVisible: false,
    }
  },
  created() {
    this.selectAllConsolidator()
  },
  methods: {
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
    },
    /** 删除 */
    handelDel() {
      if (!this.selectRows.length) {
        return this.$message.warning('请勾选对账单')
      }
      this.delLoading = true
      batchDeleteStatement({
        statementIdList: this.selectRows.map(v => v.id)
      }).then(res => {
        this.delLoading = false
        if (!res) return
        this.$message.success('删除成功！')
        this.getTableData()
      })
    }
  }
}
</script>