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
            <el-form-item label="外部订单号" prop="busiBillNo" labelWidth="75px">
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
      ref="tabledata"
    >
      <el-table-column type="selection" reserve-selection></el-table-column>
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">
          {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column v-for="column in columns" :label="column.label" :prop="column.prop" :key="column.prop"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
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
      multipleData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  computed: {
    ...mapGetters(['mapConfig'])
  },
  methods: {
    checkSelectable(row, index) {
      // 1、选择出库的那个逻辑 去掉一个限制条件 
      // 2、只要客户编码一样即可，不要判断地址了
      if (this.multipleData.length) {
        return row.arrivalCode === this.multipleData[0].arrivalCode
      }
      return true
    },
    fetchData() {
      this.loading = true
      getOutStoreList({ ...this.searchForm, pageSize: this.pageSize, pageNum: this.pageNum }).then(res => {
        const result = res.data
        this.tableData = result.list
        this.pageNum = result.pageNum
        this.total = result.total
        this.loading = false
        this.$refs.tabledata.clearSelection()
      }).catch(err => {
        console.error(err)
        this.loading = false
      })
    },
    submit() {
      this.fetchData()
    },
    resetForm() {
      this.$refs.searchForm.resetFields()
      this.$refs.tabledata.clearSelection()
      this.fetchData()
    },
    handleSelectionChange(val) {
      this.multipleData = val
      this.$emit('selectionChange', val)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNum = 1
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.fetchData()
    }
  }
}
</script>

<style lang="css">
.cantselectall tr th .el-checkbox__inner{
  display: none;
}
</style>
