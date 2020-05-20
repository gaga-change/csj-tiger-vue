<template>
  <div class="">
    <div style="margin-bottom:20px">
      <el-input
        v-model="searchParams.skuCode"
        placeholder="请输入商品编码"
        style="width:200px;"
        maxlength="20"
      ></el-input>
      <el-input
        v-model="searchParams.skuName"
        placeholder="请输入商品名称"
        style="width:200px;margin-left: 20px;"
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
        @click="reset()"
      >重置</el-button>
    </div>
    <base-table2
      ref="baseTable"
      :api="getProductList"
      :data.sync="tableData"
      :initSearchParams="searchParams"
      :highlight-current-row="true"
      @currentChange="chooseCustomer"
      :config="[
      {label: '商品编码', prop: 'skuCode'},
      {label: '商品名称', prop: 'skuName'},
      {label: '商品供应商编码', prop: 'providerSkuCode'},
      {label: '商品供应商名称', prop: 'providerSkuName'},
      {label: '销售区分', prop: 'saleType',useApi: true, type: 'getSaleType'}
      ]"
    >
    </base-table2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getProductList } from '@/api/productcenter'

export default {
  props: {
    ownerCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      getProductList,
      tableData: [],
      searchParams: {
        skuName: undefined,
        skuCode: undefined,
        ownerCode: this.ownerCode,
      }
    }
  },
  computed: {

  },
  methods: {
    search() {
      this.$refs['baseTable'].fetchData({ pageNum: 1, ...this.searchParams })
    },
    reset() {
      this.searchParams = {
        skuName: '',
        skuCode: '',
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
