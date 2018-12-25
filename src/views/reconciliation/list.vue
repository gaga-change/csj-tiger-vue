<template>
    <div>
      <search-from :searchForm="searchForm" @submit="submit"></search-from>
    </div>
</template>

<script>
  import SearchFrom from './components/search'
  import { listIndexConfig } from './components/config';
  import BaseTable from '@/components/Table'
  import moment from 'moment';
  export default {
  components: { SearchFrom,BaseTable },
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

  methods:{

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
        json.startTime=moment(json.time[0]).valueOf()
        json.endTime=moment(json.time[1]).valueOf()
      }

      console.log({...json,pageSize:this.pageSize,pageNum:this.pageNum})

  
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">


</style>