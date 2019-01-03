<template>
    <div>
      <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button  type="success" size="small" @click="add">新增对账单 </el-button>
      </template>
    </sticky>
     
      <search-from :searchForm="searchForm" @submit="submit"></search-from>
      <web-pagination-table 
        :loading="loading"
        :config="listIndexConfig" 
        :allTableData="tableData"/> 
    </div>
</template>

<script>
  import SearchFrom from './components/search'
  import { listIndexConfig } from './components/config';
  import moment from 'moment';
  import webPaginationTable from '@/components/Table/webPaginationTable';
  import { queryAccountBill } from '@/api/reconciliation.js';  
  import Sticky from '@/components/Sticky'
  export default {
  components: { Sticky,SearchFrom, webPaginationTable},
   data() {
    return {
      searchForm:{
        ownerCode:'',//交易主体编号
        time:[],//对账日期
      },
      listIndexConfig,
      tableData:[],
      loading:false,
    }
  },

  mounted(){
    this.getCurrentTableData()
  },

  created(){
    this.listIndexConfig.forEach(item=>{
      if(item.useLink){
          item.dom=(row, column, cellValue, index)=>{
            return <div style={{display:'flex',flexWrap:'nowrap'}}>
                <router-link  to={{path:'/reconciliation/detail',query:{id:row.id,}}} style={{color:'#3399ea',whiteSpace:'nowrap',margin:'0 10px 0 0'}}>查看</router-link>
                {
                  row.finaPaymentId===null&&
                  <router-link  to={{path:'/reconciliation/detail',query:{id:row.id,}}} style={{color:'#3399ea',whiteSpace:'nowrap',margin:'0 10px 0 0'}}>生成付款申请</router-link>
                }
            </div>
          }
      }
    })
  },

  methods:{

    add(){
      this.$router.push({
        path:`/reconciliation/add?time=${moment().valueOf()}`,
      })
    },

    submit(value){
      this.searchForm=value;
      this.getCurrentTableData()
    },

    getCurrentTableData(){
      this.loading=true;
      let json={};
      for(let i in this.searchForm){
        if(this.searchForm[i]!==''){
          json[i]=this.searchForm[i]
        }
      }
      
      //对账日期
      if(json.time&&Array.isArray(json.time)&&json.time.length>0){
        json.startCreateTime=moment(json.time[0]).valueOf()
        json.endCreateTime=moment(json.time[1]).valueOf()
      }

      queryAccountBill(json).then(res=>{
         this.loading=false;
         if(res.success){
           this.tableData=res.data||[]
         }
      }).catch(err=>{
        console.log(err)
         this.loading=false;
      })

  
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">


</style>