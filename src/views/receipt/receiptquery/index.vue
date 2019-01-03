<template>
  <div  class="abnormalGoods">
      <search-invoice  :searchForm="searchForm"   @submit="this.submit"  ></search-invoice>
      <div class="tableTotal" v-if="totalData&&totalData.totalPayableAmt!==undefined||totalData.totalInterestAmt!==undefined||totalData.totalPaymentAmt!==undefined">
       <span>货款合计</span> : <span>{{totalData&&totalData.totalPayableAmt&&Number(totalData.totalPayableAmt).toFixed(2)}}</span>
       <span>贴息合计</span> : <span>{{totalData&&totalData.totalInterestAmt&&Number(totalData.totalInterestAmt).toFixed(2)}}</span>
       <span>实收合计</span> : <span>{{totalData&&totalData.totalPaymentAmt&&Number(totalData.totalPaymentAmt).toFixed(2)}}</span>
     </div>
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
import { orderList,orderListTotal } from '@/api/receipt'
import _  from 'lodash';
export default {
  components: { SearchInvoice,BaseTable, },
   data() {
    return {
      searchForm:{
        paymenterName:'',
        busiBillNo:'',
        contractNo:'',
        busiPlate:'',
        ownerCode:'',
        moneyState:'',
      },
      pageSize:10,
      pageNum:1,
      total:0,
      loading:false,
      queryTableConfig,
      tableData:[],

      totalData:{}
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
      orderList({
        ...json,
        pageSize:this.pageSize,
        pageNum:this.pageNum
      }).then(res=>{
        if(res.success){
           this.tableData=res.data&&res.data.list||[];
           this.total=res.data.total;
        }
      }).catch(err=>{
        console.log(err)
      })

      orderListTotal({
        ...json,
        pageSize:this.pageSize,
        pageNum:this.pageNum
      }).then(res=>{
         if(res.success){
            this.totalData=res.data;
         }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .abnormalGoods{
    .tableTotal{
      display: flex;
      justify-content: flex-end;
      margin-bottom: 8px;
      span{
         font-size: 12px;
         color:#606266;
         &:nth-child(2n-1){
          font-weight: 600;
         }
         &:nth-child(2n){
          padding-right: 20px; 
         }
      }
     
    }
  }
</style>

