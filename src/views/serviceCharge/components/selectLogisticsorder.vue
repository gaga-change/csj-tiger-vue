<template>
  <div class="selectSkuTemplate">
    <div style="margin-bottom:20px">
      <el-input
        v-model="searchParams.busiBillNo"
        placeholder="请输入外部业务单号"
        style="width:200px;"
        maxlength="20"
      ></el-input>
       <el-input
        v-model="searchParams.logisticsOrderCode"
        placeholder="请输入物流单号"
        style="width:200px;"
        maxlength="20"
      ></el-input>
      <el-button
        style="margin-left: 20px;"
        type="primary"
        size="mini"
        @click="search()"
      >查询</el-button>
      <el-button
        style="margin-left: 20px;"
        type="primary"
        size="mini"
        @click="reset();"
      >重置</el-button>
    </div>
    <base-table2
      ref="baseTable"
      :api="outRelativeNo"
      :data.sync="tableData"
      :initSearchParams="searchParams"
      :highlight-current-row="true"
      @currentChange="chooseCustomer"
      :config="[
      {label: '外部订单号', prop: 'busiBillNo'},
      {label: '业务单号', prop: 'billNo'},
      {label: '出库单号', prop: 'warehouseExeCode'},
      {label: '物流单号', prop: 'logisticsOrderCode'},
      ]"
    >
    </base-table2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { outRelativeNo } from '@/api/outgoing'

export default {
  props: {
    ownerCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      outRelativeNo,
      tableData: [],
      searchParams: {
        busiBillNo: undefined,
        logisticsOrderCode:undefined,
        ownerCode: this.ownerCode,
      }
    }
  },
  computed: {
    ...mapGetters(['mapConfig'])
  },
  methods: {
    search() {
      this.$refs['baseTable'].fetchData({ pageNum: 1, ...this.searchParams })
    },
    reset() {
      this.searchParams = {
        busiBillNo: '',
        logisticsOrderCode:'',
        ownerCode: this.ownerCode
      }
      this.search()
    },
    chooseCustomer(val) {
      if (val) {
        this.$emit('select', val)
      }
    },
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
</style>
