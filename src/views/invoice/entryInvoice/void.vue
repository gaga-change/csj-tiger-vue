<template>
  <div class="entryInvoice-list">
     <search-invoice   :searchForm="searchForm"   @busiBillNoChange="busiBillNoChange"   @submit="this.submit"  @reset="this.reset"  ></search-invoice>
    <base-table 
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :loading="loading"
      :config="voidIndexConfig"  
      :total="total" 
      :maxTotal="10"
      :pageSize="pageSize"
      :currentPage="pageNum"
      :tableData="tableData"/>
  </div> 
</template>

<script>
import SearchInvoice from './components/search'
import BaseTable from '@/components/Table'
import { voidIndexConfig } from './components/config';
import _  from 'lodash';
export default {
  components: { SearchInvoice,BaseTable},
   data() {
    return {
      searchForm:{
        providerCode:'',
        contractNo:'' ,
        invoiceNo:'',
        busiBillNo:'',
        ticketStatus:''
      },
      pageSize:10,
      pageNum:1,
      total:0,
      loading:false,
      voidIndexConfig,
      tableData:[]
    }
  },

  methods:{

    busiBillNoChange(busiBillNo,contractNo){
      let data = _.cloneDeep(this.searchForm);
      data.contractNo=contractNo;
      this.searchForm=data;
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


    submit(){
      this.getCurrentTableData()
    },

    reset(){
      let data = _.cloneDeep(this.searchForm);
      let json={};
      for(let i in data){
        json[i]=''
      }
      this.searchForm=json;
      this.submit({})
    },

    getCurrentTableData(){
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


<style>
  .entryInvoice-list{
    
  }
</style>

