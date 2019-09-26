<template>
  <div
    class="selectCustomerTemplate"
    style="min-height: 28px;line-height: 28px;"
  >
    <span
      style="display: inline-block;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;"
      :title="!!value ? valueName : ''"
    >

      <a
        href="JavaScript:void(0)"
        style="color:#409EFF;white-space: nowrap;"
        @click="showDialogTable"
      > {{!!value ? valueName : '请选择' + label}}</a>
    </span>
    <el-dialog
      :title="'选择' + label"
      :visible.sync="selectVisiable"
      width="80%"
      height="60%"
      append-to-body
    >
      <div
        class=""
        v-if="selectVisiable"
      >
        <!-- <div style="margin-bottom:20px">
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
            size="small"
            @click="search()"
          >查询</el-button>
          <el-button
            style="margin-left: 20px;"
            type="primary"
            size="small"
            @click="reset()"
          >重置</el-button>
        </div> -->
        <base-table2
          ref="baseTable"
          :api="getCustomerInfoPage"
          :data.sync="tableData"
          :initSearchParams="searchParams"
          :highlight-current-row="true"
          @currentChange="chooseCustomer"
          :config="[
      {label: label + '编号', prop: 'customerCode'},
      {label: label + '名称', prop: 'customerName'},
      ]"
        >
        </base-table2>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { getCustomerInfoPage } from '@/api'

export default {
  props: {
    ownerCode: {
      type: String,
      default: ''
    },
    busiBillType: {
      type: Number,
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      getCustomerInfoPage,
      tableData: [],
      selectRow: null,
      selectVisiable: false,
      searchParams: {
        skuName: undefined,
        skuCode: undefined,
        ownerCode: this.ownerCode,
        billType: this.busiBillType
      }
    }
  },
  watch: {
    ownerCode(val) {
      this.searchParams.ownerCode = val
    },
    busiBillType(val) {
      this.searchParams.billType = val
    }
  },
  computed: {
    valueName() {
      if (!this.value) return ''
      return this.selectRow?this.selectRow.customerName:this.value
    },
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
  methods: {
    selectChange(record) {
      this.selectVisiable = false
      this.selectRow = record
      this.$emit('input', record.customerCode)
      this.$emit('change', record)
    },
    showDialogTable() {
      if (!this.busiBillType) {
        return this.$message.error('请选择业务单类型！')
      }
      if (!this.ownerCode) {
        return this.$message.error('请选择货主！')
      }
      this.selectVisiable = true
    },
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
        this.selectChange(val)
      }
    },
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
</style>
