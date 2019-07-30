<template>
  <div class="selectSkuTemplate">
    <div style="margin-bottom:20px" :loading="loading">
      <el-input
        v-model="searchSkuForm.warehouseExeCode"
        :placeholder="type=='outgoing'?'请输入出库单号':'请输入入库单号'"
        style="width:200px;"
        maxlength="20"
      ></el-input>
      <el-input
        v-model="searchSkuForm.billNo"
        placeholder="请输入业务单号"
        style="width:200px;margin-left: 20px;"
        maxlength="20"
      ></el-input>
      <el-button
        style="margin-left: 20px;"
        type="primary"
        size="small"
        @click="currentPage=1;gettotallist()"
      >查询</el-button>
      <el-button
        style="margin-left: 20px;"
        type="primary"
        size="small"
        @click="currentPage=1;searchSkuForm.warehouseExeCode=null;searchSkuForm.billNo=null;gettotallist()"
      >重置</el-button>

    </div>
    <el-table
      :data="data"
      size="small"
      ref="singleTable"
      highlight-current-row
      @current-change="submit"
    >
      <el-table-column
        label="序号">
      <template slot-scope="scope">
        <span>{{scope.$index+1}}</span>
      </template>
    </el-table-column>
      <el-table-column
        property="warehouseExeCode"
        :label="type=='outgoing'?'出库单号':'入库单号'"
      />
      <el-table-column
        property="billNo"
        label="业务单号"
      />
    </el-table>
    <el-pagination
      style="text-align: right;"
      v-if="!!totalLen"
      size="small"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10]"
      :page-size="currentPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalLen"
    />
  </div>
</template>

<script>
import { queryWarehouseCode, queryInWarehouseCode } from '@/api/correction'
export default {
  props:['selectOwnercode','datatype'],
  data() {
    return {
      data: [],
      currentPageSize: 10,
      currentPage: 1,
      totalLen: 0,
      searchSkuForm:{
        ownerCode:null,
        warehouseExeCode:null,
        billNo:null,
      },
      loading:false,
      type:null,
    }
  },
  watch: {
    selectOwnercode(val){  
      this.searchSkuForm.ownerCode=val
      this.gettotallist()
    }
  },
  created() {
    this.type=this.datatype
    this.searchSkuForm.ownerCode=this.selectOwnercode
    this.gettotallist()
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
      this.gettotallist()
    },
    gettotallist(){
      this.loading=true
      let api= queryWarehouseCode
      if(this.type==='inWarehouse'){
        api = queryInWarehouseCode
      }
      api({pageNum:this.currentPage,pageSize:this.currentPageSize,...this.searchSkuForm}).then(res => {
        if (res.success) {
          this.data=Array.isArray(res.data.list) && res.data.list || []
          this.loading=false
          this.totalLen=res.data.total
        }
      }).catch(err => {
      }).then(res => {
        this.loading = false
      })
    },
    submit(val) {
      if (val) {
        this.$emit('select', val.warehouseExeCode)
      }
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
</style>
