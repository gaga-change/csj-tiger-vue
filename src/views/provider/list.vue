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
  export default {
  components: { SearchFrom,BaseTable },
   data() {
    return {
      searchForm:{
        客户名称:'',
        销售合同编号:'',
        出库计划单:'',
        单据状态:'',
        ReceivTime:[],//收货日期
        establishTime:[],//创建日期
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

  created(){

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

      console.log({...json,pageSize:this.pageSize,pageNum:this.pageNum})
      this.loading=false;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">


</style>