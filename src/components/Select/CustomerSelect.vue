<template>
  <div
    class="selectCustomerTemplate"
    style="min-height: 28px;line-height: 28px;width: 200px"
  >
    <span
      style="display: inline-block;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;"
      :title="name"
    >
      <a
        href="JavaScript:void(0)"
        style="color:#409EFF;white-space: nowrap;"
        @click="showDialogTable"
      > {{!!value ? name : '请选择' + label}}</a>
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
        <base-list
          ref="baseList"
          :tableConfig="tableConfig"
          :searchConfig="searchConfig"
          :api="getCustomerInfoPage"
          :showControl="false"
          :controlWidth="160"
          :appendSearchParams="appendSearchParams"
          :select="true"
          @selectionChange="selectionChange"
          :selectable="() => true"
        >
        </base-list>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { getCustomerInfoPage } from '@/api'

export default {
  props: {
    params: {
      type: Object,
      default: () => ({})
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
  },
  data() {
    const tableConfig = [
      { label: this.label + '编号', prop: 'customerCode' },
      { label: this.label + '名称', prop: 'customerName' }
    ]
    const searchConfig = [
      { label: this.label + '编号', prop: 'customerCode' },
      { label: this.label + '名称', prop: 'customerName' }
    ]
    return {
      tableConfig,
      searchConfig,
      getCustomerInfoPage,
      selectVisiable: false,
      oldParams: '',
      appendSearchParams: {},
    }
  },
  watch: {
    params(val) {
      if (this.oldParams !== JSON.stringify(val)) {
        this.init()
      }
    },
  },
  created() {
    this.init()
  },
  methods: {
    getTableData() {
      this.$refs['baseList'].fetchData()
    },
    init() {
      this.oldParams = JSON.stringify(this.params)
      this.appendSearchParams = this.params
      this.$emit('input', undefined)
      this.$emit('update:name', '')
      this.$emit('change', undefined)
    },
    selectionChange(selectRows) {
      if (!selectRows.length) return
      let record = selectRows[0]
      this.selectVisiable = false
      this.$emit('input', record.customerCode)
      this.$emit('update:name', record.customerName)
      this.$emit('change', record.customerCode)
    },

    showDialogTable() {
      if (!this.params.busiBillType) {
        return this.$message.error('请选择业务单类型！')
      }
      if (!this.params.ownerCode) {
        return this.$message.error('请选择货主！')
      }
      this.selectVisiable = true
    },
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
</style>
