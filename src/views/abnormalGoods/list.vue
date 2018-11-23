<template>
  <div  class="abnormalGoods">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button type="success"  size="small" ><router-link :to="{path:'/abnormalGoods/add'}" >创建异常签收商品登记单</router-link></el-button>
      </template>
    </sticky>
     <search-invoice  :searchForm="searchForm"   @submit="this.submit"  ></search-invoice>
      <base-table 
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :loading="loading"
      :config="listIndexConfig"  
      :total="total" 
      :maxTotal="10"
      :pageSize="pageSize"
      :currentPage="pageNum"
      :tableData="tableData"/>
  </div> 
</template>

<script>
import SearchInvoice from './components/search'
import { listIndexConfig } from './components/config';
import BaseTable from '@/components/Table'
import Sticky from '@/components/Sticky'
import _  from 'lodash';
export default {
  components: { SearchInvoice,BaseTable,Sticky },
   data() {
    return {
      searchForm:{
        客户名称:'',
        contractNo:'',
        busiBillNo:'',
        ticketStatus:'',
        异常登记签收单号:'',
        退回日期:''
      },
      pageSize:10,
      pageNum:1,
      total:0,
      loading:false,
      listIndexConfig,
      tableData:[]
    }
  },

  mounted(){
    this.getCurrentTableData()
  },

  created(){
    this.listIndexConfig.forEach(item=>{
       if(item.useLink){
          item.dom=this.formatter();
       }
    })
  },

  methods:{

   formatter(){
     return  (row, column, cellValue, index)=>{
            let id = row.索引
            let status = Number(row.状态)
            switch(status){
              case 0 : return <div><router-link  to={{path:`/abnormalGoods/detail`,query:{}}} style={{color:'#3399ea',marginRight:'12px'}}>查看</router-link><router-link  to={{path:`/abnormalGoods/detail`,query:{}}} style={{color:'#3399ea'}}>提交</router-link></div>  
              default: return <div><router-link  to={{path:`/abnormalGoods/detail`,query:{}}} style={{color:'#3399ea'}}>查看</router-link></div>
            }
          };
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
  .abnormalGoods{
    
  }
</style>

