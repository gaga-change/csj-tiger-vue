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
  import {outBillImproveList} from '@/api/outgoing';
  import { record_config } from './config'
  import _  from 'lodash';
  import moment from 'moment';
  export default {
    name: 'out-quiry-record',
    components: { search,BaseTable},
    data() {
      return {

        //搜索项
        searchForm:{
          improveReason:'',
          billNo:'',
          createrName:'',
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
      this.fetch()
    },

    created(){
      this.record_config.forEach(item=>{
        if(item.prop==='billNo'){
            item.dom=(row, column, cellValue, index)=>{
              return(
                <div class="tableLinkBox">
                     {
                       <router-link to={`/outgoing/recordDetail?id=${row.id}`}  class="tableLink">{cellValue}</router-link>
                     }
                </div>
              )
            }
        }
      })
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
        this.loading=true;
        let json= _.cloneDeep(this.searchForm);
        for(let i in json){
           if(json[i]===''){
             delete json[i]
           } else if(Array.isArray(json[i])&&json[i].length){
             json['start']= moment(json[i][0]).valueOf();
             json['end']= moment(json[i][1]).valueOf();
           }
        }
        outBillImproveList(json).then(res=>{
          this.loading=false;
          if(res.success){
            this.total=res.data&&res.data.total;
            this.tableData=res.data&&Array.isArray(res.data.list)&&res.data.list;
          }
        }).catch(err=>{
          this.loading=false;
          console.log(err)
        })
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
