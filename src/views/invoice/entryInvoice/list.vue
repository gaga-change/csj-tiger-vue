<template>
  <div class="entryInvoice-list">
     <sticky  :className="'sub-navbar published'" style="margin-bottom: 8px">
        <template >
          <el-button style="margin-left: 10px;"  size="mini" type="success"  @click="toadd">新建发票
          </el-button>
        </template> 
      </sticky>
     <search-invoice  :searchForm="searchForm" :onlySelect="true" @busiBillNoChange="busiBillNoChange"   @submit="this.submit"  @reset="this.reset"  ></search-invoice>
    
    <div class="tableTotal" v-if="tableData.length>0">
       <span>已录入收票金额</span> : <span>{{tableData[0]&&tableData[0]['allInvoiceAmout']&&Number(tableData[0]['allInvoiceAmout']).toFixed(2)}}</span>
       <span>已审核收票金额</span> : <span>{{tableData[0]&&tableData[0]['sumInvoiceAmout']&&Number(tableData[0]['sumInvoiceAmout']).toFixed(2)}}</span>
       <span>共登记发票张数</span> : <span>{{tableData[0]&&tableData[0]['sumInvoiceQty']}}</span>
       <span>其中蓝票张数</span> : <span>{{tableData[0]&&tableData[0]['sumBuleInvoiceQty']}}</span>
       <span>其中红票张数</span> : <span>{{tableData[0]&&tableData[0]['sumRedInvoiceQty']}}</span>
    </div>

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
import { finaPurchaseInvoiceList } from '@/api/void'
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
        ownerCode:'',
        invoiceNature:'',
        contractnNo:'',
        busiPlate:'',
        time:[],
        endTime:[]
      },
      pageSize:10,
      pageNum:1,
      total:0,
      loading:false,
      listIndexConfig,
      tableData:[],
    }
  },

  mounted(){
    if(this.$route.query.data){
      this.searchForm={...this.searchForm,...JSON.parse(this.$route.query.data)}
    }
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
              case 0 : return <div><router-link  to={{path:`/invoice/entryInvoice/registrationDetail`,query:{finaPurchaseInvoiceId:finaPurchaseInvoiceId}}} style={{color:'#3399ea',marginRight:'8px'}}>提交</router-link><router-link  to={{path:`/invoice/entryInvoice/registrationDetail`,query:{finaPurchaseInvoiceId:finaPurchaseInvoiceId}}} style={{color:'#3399ea',marginRight:'8px'}}>编辑</router-link><router-link  to={{path:`/invoice/entryInvoice/registrationDetail`,query:{finaPurchaseInvoiceId:finaPurchaseInvoiceId}}} style={{color:'#3399ea'}}>删除</router-link></div>  
              case 1 : return <div><router-link  to={{path:`/invoice/entryInvoice/registrationDetail`,query:{finaPurchaseInvoiceId:finaPurchaseInvoiceId}}} style={{color:'#3399ea',marginRight:'12px'}}>审核</router-link><router-link  to={{path:`/invoice/entryInvoice/registrationDetail`,query:{finaPurchaseInvoiceId:finaPurchaseInvoiceId}}} style={{color:'#3399ea'}}>驳回</router-link></div>  
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
      json.endTime=[];
      this.searchForm=json;
      this.submit({})
    },

    toadd(){
      this.$router.push({
        path:`/invoice/entryInvoice/registrationAdd?time=${moment().valueOf()}`,
      })
    },

    getCurrentTableData(){
      this.$router.replace({
        path:'/invoice/entryInvoice/registrationList',
        query:{data:JSON.stringify(this.searchForm)}
      })
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

      if(json.endTime.length===2){
        json.arriveBeginDate=moment(json.endTime[0]).valueOf()
        json.arriveEndDate=moment(json.endTime[1]).valueOf()
      }

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


<style rel="stylesheet/scss" lang="scss">
  .entryInvoice-list{
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

