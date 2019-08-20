<template>
  <div class="selectSkuTemplate">
    <div style="margin-bottom:20px">
      <el-input
        v-model="skuCode"
        placeholder="请输入商品编码"
        style="width:200px;"
        maxlength="20"
      ></el-input>
      <el-input
        v-model="skuName"
        placeholder="请输入商品名称"
        style="width:200px;margin-left: 20px;"
        maxlength="20"
      ></el-input>
      <el-button
        style="margin-left: 20px;"
        type="primary"
        size="small"
        @click="currentPage=1;updateData()"
      >查询</el-button>
      <el-button
        style="margin-left: 20px;"
        type="primary"
        size="small"
        @click="currentPage=1;skuCode='';skuName='',updateData()"
      >重置</el-button>

    </div>
    <el-table
      :data="data"
      size="small"
      ref="singleTable"
      highlight-current-row
      @current-change="chooseCustomer"
    >
      <el-table-column
        property="skuCode"
        label="商品编码"
      />
      <el-table-column
        property="skuName"
        label="商品名称"
      />
      <el-table-column
        property="providerSkuCode"
        label="商品供应商编码"
      />
      <el-table-column
        property="providerSkuName"
        label="商品供应商名称"
      />
      <el-table-column
        property="saleType"
        label="在库区分"
      >
        <template slot-scope="scope">
          {{ saleTypeMap[scope.row.saleType || ''] || '' }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: right;"
      v-if="!!totalLen"
      size="small"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30]"
      :page-size="currentPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalLen"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    commodityList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      data: [],
      skuName: '',
      skuCode: '',
      currentPageSize: 10,
      currentPage: 1,
      totalLen: 0
    }
  },
  computed: {
    saleTypeMap() {
      let obj = {}
      let getSaleType = this.mapConfig['getSaleType'] || []
      getSaleType.forEach(v => {
        obj[v.key + ''] = v.value
      })
      return obj
    },
    ...mapGetters(['mapConfig'])
  },
  watch: {
    commodityList(val) {
      this.updateData()
    }
  },
  created() {
    this.updateData()
  },
  methods: {
    handleSizeChange(val) {
      this.currentPageSize = val
      this.currentPage = 1
      this.updateData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.updateData()
    },
    updateData() {
      let start = (this.currentPage - 1) * this.currentPageSize
      let length = this.currentPageSize
      let total = [...this.commodityList].filter(v => {
        let skuName = v.skuName || ''
        let skuCode = v.skuCode || ''
        if (this.skuName && skuName.indexOf(this.skuName) < 0) return false
        if (this.skuCode && skuCode.indexOf(this.skuCode) < 0) return false
        return true
      })
      this.totalLen = total.length
      this.data = total.splice(start, length)
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
