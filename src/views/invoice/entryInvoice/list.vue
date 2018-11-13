<template>
  <div class="entryInvoice-list">
     <sticky  :className="'sub-navbar published'" style="margin-bottom: 8px">
        <template >
          <el-button style="margin-left: 10px;"  size="small" type="success"  @click="toadd">新建发票
          </el-button>
        </template> 
      </sticky>
     <search-invoice  :searchForm="searchForm"  @busiBillNoChange="busiBillNoChange"   @submit="this.submit"  @reset="this.reset"  ></search-invoice>
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
import BaseTable from '@/components/Table'
import { listIndexConfig } from './components/config';
import { finaPurchaseInvoiceList } from '@/api/void/list'
import Sticky from '@/components/Sticky' 
import _  from 'lodash';

export default {
  components: { SearchInvoice,BaseTable,Sticky},
   data() {
    return {
      searchForm:{
        providerCode:'',
        contractNo:'' ,
        invoiceNo:'',
        invoiceStatus:'',
        busiBillNo:'',
        ticketStatus:'',
        invoiceNature:'',
        invoiceNature:'',
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
    this.getCurrentTableData();
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

    toadd(){
      this.$router.push({
        path:'/invoice/entryInvoice/registrationAdd',
      })
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
      finaPurchaseInvoiceList(json).then(res=>{
          if(res.success){
            let data=res.data.list||[];
            this.tableData=data.filter(v=>v);
          }
          this.loading=false
      }).catch(err=>{
          this.loading=false
      })
    }
  }
}
</script>


<style>
  .entryInvoice-list{
    
  }
</style>

