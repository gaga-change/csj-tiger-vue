<template lang="html">
  <div>
    <el-form :model="searchForm" ref="searchForm" labelWidth="60px">
      <el-card shadow="hover">
        <el-row>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="货主" prop="sendtype">
              <el-input v-model="searchForm.logisticsNo" class="formitem" size="small" placeholder="请输入物流单号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="客户" prop="sendtype">
              <el-input v-model="searchForm.logisticsNo" class="formitem" size="small" placeholder="请输入物流单号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="出库单号" prop="sendtype">
              <el-input v-model="searchForm.logisticsNo" class="formitem" size="small" placeholder="请输入物流单号"></el-input>
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
      :loading="loading"
      row-key="id"
    >
      <el-table-column type="selection" :selectable="checkSelectable" reserve-selection></el-table-column>
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column v-for="column in columns" :label="column.label" :prop="column.prop" :key="column.prop"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getOutStoreList } from '@/api/mis'
export default {
  data() {
    return {
      searchForm: {},
      tableData: [],
      columns: [
        {label:'货主',prop:'owner'},
        {label:'客户名称',prop:'customer'},
        {label:'业务单号',prop:'orderNo'},
        {label:'出库单号',prop:'outNo'},
        {label:'配送地址',prop:'address'},
      ],
      loading: false,
      multipleData: []
    }
  },
  methods: {
    checkSelectable(row, index) {
      // 1、当选择的明细客户不一致时，提示：请选择同一客户的出库单；
      // 2、当选择的客户的配送地址不一致时，提示：请选择同一配送地址的出库单；
      if (this.multipleData.length) {
        return row.customer === this.multipleData[0].customer && row.address === this.multipleData[0].address
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
