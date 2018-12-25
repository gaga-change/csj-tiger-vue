<template>
    <div>
      <search-from :searchForm="searchForm" @submit="submit"></search-from>
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
  import SearchFrom from './components/search'
  import { listIndexConfig } from './components/config';
  import BaseTable from '@/components/Table'
  import { registerList } from '@/api/provider'
  import moment from 'moment';
  export default {
  components: { SearchFrom,BaseTable },
   data() {
    return {
      searchForm:{
        ownerCode:'',//交易主体编号
        time:[],//对账日期
        serviceRate:''//服务百分比
      },
      listIndexConfig,
      pageSize:10,
      pageNum:1,
      total:0,
      tableData:[],
      loading:false,
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
      this.loading=true;
      let json={};
      for(let i in this.searchForm){
        if(this.searchForm[i]!==''){
          json[i]=this.searchForm[i]
        }
      }
      
      //收货日期
      if(json.time&&Array.isArray(json.time)&&json.time.length>0){
        json.startTime=moment(json.time[0]).valueOf()
        json.endTime=moment(json.time[1]).valueOf()
      }

      //创建日期
      if(json.establishTime&&Array.isArray(json.establishTime)&&json.establishTime.length>0){
        json.createBeginDate=moment(json.createBeginDate).valueOf()
        json.createEndDate=moment(json.createEndDate).valueOf()
      }

      console.log({...json,pageSize:this.pageSize,pageNum:this.pageNum})
      registerList({
          ...json,
          pageSize:this.pageSize,
          pageNum:this.pageNum
        }).then(res=>{
        this.loading=false;
        if(res.success){
          this.tableData=res.data&&res.data.list||[];
          this.total=res.data&&res.data.total;
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