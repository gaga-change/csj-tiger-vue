<template>
  <div class="entryInvoice-list">
     <sticky  :className="'sub-navbar published'" style="margin-bottom: 8px">
        <template >
          <el-button style="margin-left: 10px;"  size="small" type="success"  @click="toadd">新建发票
          </el-button>
        </template> 
      </sticky>
     <search-invoice  :searchForm="searchForm" :onlySelect="true" @busiBillNoChange="busiBillNoChange"   @submit="this.submit"  @reset="this.reset"  ></search-invoice>
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
import moment from 'moment';

export default {
  components: { SearchInvoice,BaseTable,Sticky},
   data() {
    return {
      searchForm:{
        providerCode:'',
        invoiceNo:'',
        invoiceStatus:'',
        busiBillNo:'',
        ticketStatus:'',
        invoiceNature:'',
        busiPlate:'',
        time:[]
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
            let finaPurchaseInvoiceId = row.finaPurchaseInvoiceId
            let status = Number(row.ticketStatus)
            switch(status){
              case 0 : return <div><router-link  to={{path:`/invoice/entryInvoice/registrationDetail`,query:{finaPurchaseInvoiceId:finaPurchaseInvoiceId}}} style={{color:'#3399ea',marginRight:'12px'}}>查看</router-link><router-link  to={{path:`/invoice/entryInvoice/registrationDetail`,query:{finaPurchaseInvoiceId:finaPurchaseInvoiceId}}} style={{color:'#3399ea'}}>提交</router-link></div>  
              case 1 : return <div><router-link  to={{path:`/invoice/entryInvoice/registrationDetail`,query:{finaPurchaseInvoiceId:finaPurchaseInvoiceId}}} style={{color:'#3399ea',marginRight:'12px'}}>查看</router-link><router-link  to={{path:`/invoice/entryInvoice/registrationDetail`,query:{finaPurchaseInvoiceId:finaPurchaseInvoiceId}}} style={{color:'#3399ea'}}>审核</router-link></div>  
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
      json.time=[];
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

      if(json.time.length===2){
        json.makeBeginDate=moment(json.time[0]).valueOf()
        json.makeEndDate=moment(json.time[1]).valueOf()
      }

      console.log({...json,pageSize:this.pageSize,pageNum:this.pageNum})
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

