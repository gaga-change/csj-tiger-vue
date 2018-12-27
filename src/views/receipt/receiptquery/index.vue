<template>
  <div  class="abnormalGoods">
      <search-invoice  :searchForm="searchForm"   @submit="this.submit"  ></search-invoice>
      <base-table 
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :loading="loading"
      :config="queryTableConfig"  
      :total="total" 
      :maxTotal="10"
      :pageSize="pageSize"
      :currentPage="pageNum"
      :tableData="tableData"/>
  </div> 
</template>

<script>
import SearchInvoice from '../components/querySearch'
import { queryTableConfig } from '../components/config';
import BaseTable from '@/components/Table'
import _  from 'lodash';
export default {
  components: { SearchInvoice,BaseTable, },
   data() {
    return {
      searchForm:{
        客户名称:'',
        订单编号:'',
        合同编号:'',
        业务板块:'',
        货主:'',
        款项性质:'',
      },
      pageSize:10,
      pageNum:1,
      total:0,
      loading:false,
      queryTableConfig,
      tableData:[]
    }
  },

  mounted(){
    this.getCurrentTableData()
  },


  methods:{

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
      // this.loading=true;
      let json={};
      for(let i in this.searchForm){
        if(this.searchForm[i]!==''){
          json[i]=this.searchForm[i]
        }
      }
      
      console.log({...json,pageSize:this.pageSize,pageNum:this.pageNum})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .abnormalGoods{
    
  }
</style>

