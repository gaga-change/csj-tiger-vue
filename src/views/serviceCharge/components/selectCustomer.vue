<template>
  <div
    class="selectCustomerTemplate"
    :title="!!value ? valueName : ''"
  >
    <el-input
      class="show-text-input"
      :value="!!value ? valueName : undefined"
      @focus="showDialogTable"
      :placeholder="'请选择' + label"
      style="width: 200px;"
    ></el-input>
    <!-- <el-link>{{!!value ? valueName : '请选择' + label}}</el-link> -->
    <!-- <span
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
    </span> -->
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
        <base-list
          ref="baseList"
          :btnInline="true"
          :tableConfig="tableConfig"
          :searchConfig="searchConfig"
          :api="getCustomerInfoPage"
          :appendSearchParams="appendSearchParams"
          :highlightCurrentRow="true"
          @currentChange="chooseCustomer"
        >
        </base-list>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { getCustomerInfoPage } from '@/api'
const tableConfig = [
  { label: '客户编号', prop: 'customerCode' },
  { label: '客户名称', prop: 'customerName' },
]
const searchConfig = [
  { label: '客户编号', prop: 'customerCode' },
  { label: '客户名称', prop: 'customerName' },
]
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
      tableConfig,
      searchConfig,
      getCustomerInfoPage,
      tableData: [],
      selectRow: null,
      selectVisiable: false,
      appendSearchParams: {
        ownerCode: this.ownerCode
      }
    }
  },
  watch: {
    ownerCode(val) {
      this.appendSearchParams.ownerCode = val
    }
  },
  computed: {
    valueName() {
      if (!this.value) return ''
      return this.selectRow ? this.selectRow.customerName : this.value
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
.selectCustomerTemplate {
  .show-text-input {
    input {
      // border: none !important ;
    }
  }
}
</style>
