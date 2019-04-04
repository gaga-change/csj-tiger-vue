<template>
  <div class="carrier">
      <div style="margin-bottom:16px">
         <search @submit="select" :searchForm="searchForm"></search>
      </div>
      <base-table 
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        :pageSize="searchForm.pageSize"
        :currentPage="searchForm.pageNum"
        :loading="loading"
        :total="total" 
        :config="record_config"  
        :tableData="tableData"/>
  </div>
</template>

<script>
  import search from './components/search'
  import BaseTable from '@/components/Table'
  import { record_config } from './config'
  import _  from 'lodash';
  import moment from 'moment';
  export default {
    components: { search,BaseTable},
    data() {
      return {

        //搜索项
        searchForm:{
          调整类型:'',
          业务单号:'',
          调整人:'',
          time:[],
          pageSize:10,
          pageNum:1
        },
        total:0,
        
        //table配置
        loading:false,
        record_config,
        tableData:[]
      }
    },

    mounted(){
     
    },

    methods: {
      moment,
      handleSizeChange(val) {
        this.searchForm={...this.searchForm,pageSize:val,pageNum:1};
        this.fetch()
      },

      handleCurrentChange(val) {
        this.searchForm={...this.searchForm,pageNum:val};
        this.fetch()
      },

      select(value){
        this.searchForm=_.cloneDeep(value);
        this.fetch()
      },

      fetch(){
        let json= _.cloneDeep(this.searchForm);
        for(let i in json){
           if(json[i]===''){
             delete json[i]
           }
        }
        console.log(json)
      }

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .carrier{
    .operationitem{
      display: flex;
      justify-content: flex-end;
      margin: 16px 0;
    }
    .tableLinkBox{
       display: flex;
      .tableLink{
        cursor: pointer;
        color:#3399ea;
        margin-right:12px;
        &:last-child{
          margin-right: 0;
        }
      }
    }
  }
</style>


