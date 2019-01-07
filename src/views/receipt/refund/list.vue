<template>
  <div  class="refund">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button type="success"  size="small"  @click="addRefund"  >创建退款单</el-button>
      </template>
    </sticky>
     <el-card class="simpleCard"  shadow="never"  body-style="padding:12px">
        <search-invoice  :searchForm="searchForm"   @submit="submit"  :select="true" ref="listSearchFormDom" ></search-invoice>
        <el-col :span="24" style="margin-bottom:12px;">
            <el-button type="primary"  size="small"  @click="select">查询</el-button>
            <el-button type="primary"  size="small" @click="resetForm">重置</el-button>
        </el-col>
     </el-card>
      <base-table 
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :loading="loading"
      :config="refundConfig"  
      :total="total" 
      :maxTotal="10"
      :pageSize="pageSize"
      :currentPage="pageNum"
      :tableData="tableData"/>
  </div> 
</template>

<script>
import SearchInvoice from '../components/refundSearch'
import { refundConfig } from '../components/config';
import BaseTable from '@/components/Table'
import Sticky from '@/components/Sticky'
import _  from 'lodash';
import moment from 'moment'; 
export default {
  components: { SearchInvoice,BaseTable,Sticky },
   data() {
    return {
      searchForm:{
        客户名称:'',
        busiPlate:'',
        订单编号:'',
        合同编号:'',
        ownerCode:'',
        单据状态:''
      },
      pageSize:10,
      pageNum:1,
      total:0,
      loading:false,
      refundConfig,
      tableData:[]
    }
  },

  mounted(){
    this.getCurrentTableData()
  },

  created(){
    this.refundConfig.forEach(item=>{
       if(item.useLink){
          item.dom=(row, column, cellValue, index)=>{
              const path=`/receipt/refundDetail?refundNo=${row.refundNo}`
              return <div style={{display:'flex',flexWrap: 'nowrap'}}>
                  <router-link  to={path} class="routerLink" >查看</router-link>
              </div>
            }
       }
    })
  },

  methods:{

    addRefund(){
      this.$router.push({
        path:`/receipt/refundAdd?time=${moment().valueOf()}`,
      })
    },

    select(){
       this.$refs['listSearchFormDom'].submit()
    },

    resetForm(){
      this.$refs['listSearchFormDom'].resetForm() 
    },

    submit(value){
      this.searchForm=value;
      this.getCurrentTableData()
    },

    handleSizeChange(val) {
      this.pageSize=val;
      this.pageNum=1;
      this.getCurrentTableData();
    },

    handleCurrentChange(val) {
     this.pageNum=val;
     this.getCurrentTableData();
    },

    getCurrentTableData(){
      this.loading=true;
      let json={};
      for(let i in this.searchForm){
        if(this.searchForm[i]!==''){
          json[i]=this.searchForm[i]
        }
      }

      console.log({...json,pageSize:this.pageSize,pageNum:this.pageNum})
      this.loading=false;
    
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .refund{
    .routerLink{
      color:#3399ea;
      white-space:nowrap;
      margin-right: 10px;
    }
  }
</style>

