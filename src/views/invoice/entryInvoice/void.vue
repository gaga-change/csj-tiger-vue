<template>
  <div class="entryInvoice-list">
     <search-invoice   :searchForm="searchForm"  :onlySelect="true"  @busiBillNoChange="busiBillNoChange"   @submit="this.submit"  @reset="this.reset"  ></search-invoice>
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
import { finaPurchaseInvoiceList } from '@/api/void/list'
import _  from 'lodash';
export default {
  components: { SearchInvoice,BaseTable},
   data() {
    return {
      searchForm:{
        providerCode:'',
        invoiceNo:'',
        busiBillNo:'',
        cancelApplyStatus:'',
        invoiceNature:''
      },
      pageSize:10,
      pageNum:1,
      total:0,
      loading:false,
      voidIndexConfig,
      tableData:[]
    }
  },

  mounted(){
    if(this.$route.query.data){
      this.searchForm={...this.searchForm,...JSON.parse(this.$route.query.data)}
    }
    this.getCurrentTableData();
  },

  created(){
    this.voidIndexConfig.forEach(item=>{
       if(item.useLink){
          item.dom=this.formatter();
       }
    })
  },
  
  methods:{
    formatter(){
     return  (row, column, cellValue, index)=>{
            let finaPurchaseInvoiceId = row.finaPurchaseInvoiceId
            let status = Number(row.cancelApplyStatus)
            switch(status){
              case 1 : return <div><router-link  to={{path:`/invoice/entryInvoice/registrationDetail`,query:{finaPurchaseInvoiceId:finaPurchaseInvoiceId}}} style={{color:'#3399ea',marginRight:'12px'}}>查看</router-link><router-link  to={{path:`/invoice/entryInvoice/registrationDetail`,query:{finaPurchaseInvoiceId:finaPurchaseInvoiceId}}} style={{color:'#3399ea'}}>确认作废</router-link></div>  
              default: return <div><router-link  to={{path:`/invoice/entryInvoice/registrationDetail`,query:{finaPurchaseInvoiceId:finaPurchaseInvoiceId}}} style={{color:'#3399ea'}}>查看</router-link></div>
            }
          };
    },

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
      this.$router.replace({
        path:'/invoice/entryInvoice/registrationVoid',
        query:{data:JSON.stringify(this.searchForm)}
      })
      this.loading=true;
      let json={};
      for(let i in this.searchForm){
        if(this.searchForm[i]!==''){
          json[i]=this.searchForm[i]
        }
      }
      json.ticketStatus=3;
      json.isInvalid=0;
      // console.log({...json,pageSize:this.pageSize,pageNum:this.pageNum})
      finaPurchaseInvoiceList({...json,pageSize:this.pageSize,pageNum:this.pageNum}).then(res=>{
          if(res.success){
            let data=res.data.list||[];
            this.tableData=data.filter(v=>v);
            this.total=res.data.total;
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

