<template lang="html">
  <div>
    <el-form :model="searchForm" ref="searchForm" labelWidth="60px">
      <el-card shadow="hover">
        <el-row>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="货主" prop="ownerCode">
              <el-select  v-model="searchForm.ownerCode" clearable  placeholder="请选择货主" size="small" class="formitem">
                <el-option v-for="item in mapConfig['ownerInfoMap']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="客户编码" prop="arrivalCode">
              <el-input v-model="searchForm.arrivalCode" class="formitem" size="small" placeholder="请输入客户编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="出库单号" prop="warehouseExeCode">
              <el-input v-model="searchForm.warehouseExeCode" class="formitem" size="small" placeholder="请输入出库单号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="外部订单号" prop="busiBillNo"  labelWidth="75px">
              <el-input v-model="searchForm.busiBillNo" class="formitem" size="small" placeholder="请输入外部订单号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-button @click="submit" size="small" type="primary">查询</el-button>
          <el-button @click="resetForm" size="small">重置</el-button>
        </el-row>
      </el-card>
    </el-form>
    <el-table
      :data="tableData"
      border
      class="mt10 cantselectall"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      row-key="id"
      max-height="400"
    >
      <el-table-column type="selection" :selectable="checkSelectable" reserve-selection></el-table-column>
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column v-for="column in columns" :label="column.label" :prop="column.prop" :key="column.prop"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getOutStoreList } from '@/api/mis'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      searchForm: {},
      tableData: [],
      columns: [
        {label:'货主',prop:'ownerName'},
        {label:'客户编码',prop:'arrivalCode'},
        {label:'客户名称',prop:'arrivalName'},
        {label:'业务单号',prop:'billNo'},
        {label:'出库单号',prop:'warehouseExeCode'},
        {label:'外部订单号',prop:'busiBillNo'},
        {label:'配送地址',prop:'arrivalAddress'},
      ],
      loading: false,
      multipleData: []
    }
  },
  computed: {
    ...mapGetters(['mapConfig'])
  },
  methods: {
    checkSelectable(row, index) {
      // 1、当选择的明细客户不一致时，提示：请选择同一客户的出库单；
      // 2、当选择的客户的配送地址不一致时，提示：请选择同一配送地址的出库单；
      if (this.multipleData.length) {
        return row.arrivalCode === this.multipleData[0].arrivalCode && row.arrivalAddress === this.multipleData[0].arrivalAddress
      }
      return true
    },
    fetchData() {
      this.loading = true
      getOutStoreList(this.searchForm).then(res => {
        this.tableData = res.data
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    submit() {
      this.fetchData()
    },
    resetForm() {
      this.$refs.searchForm.resetFields()
    },
    handleSelectionChange(val) {
      this.multipleData = val
      this.$emit('selectionChange', val)
    }
  }
}
</script>

<style lang="css">
.cantselectall tr th .el-checkbox__inner{
  display: none;
}
</style>
