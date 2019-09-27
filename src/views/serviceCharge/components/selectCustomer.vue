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
        ownerCode: this.ownerCode
      }
    }
  },
  watch: {
    ownerCode(val) {
      this.searchParams.ownerCode = val
    }
  },
  computed: {
    valueName() {
      if (!this.value) return ''
      return this.selectRow?this.selectRow.customerName:this.value
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
      if (!this.ownerCode) {
        return this.$message.error('请选择货主！')
      }
      this.selectVisiable = true
    },
    search() {
      this.$refs['baseTable'].fetchData({ pageNum: 1, ...this.searchParams })
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
