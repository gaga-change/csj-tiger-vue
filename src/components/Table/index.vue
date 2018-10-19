<template>
  <div class="ctabel">
      <el-table
        v-loading="loading"
        :element-loading-text="elementLoadingText"
        :element-loading-background="elementLoadingBackground"
        :data="tableData"
        :border="border"
        size="small"
        :style="tableStyle">

        <el-table-column
          v-for="item in tableConfig"
          :formatter="item.formatter"
          :fixed="item.fixed"
          :width="item.width"
          :key="item.lable"
          :prop="item.prop"
          :label="item.label">
        </el-table-column>

      </el-table>

      <el-pagination
        :style="paginationStyle"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="tableCurrentPage"
        :page-sizes="pageSizes"
        size="small"
        :page-size="tablePageSize"
        :layout="layout"
        v-if="total>maxTotal"
        :total="total">
      </el-pagination>

  </div>
</template>

<script>

import _  from 'lodash';
import moment from 'moment';

export default {
   props: {
     loading: {
      type: Boolean,
      default: false      
    },
    tableData: {
      type: Array,
      default:()=>[]
    },
    config:{
      type: Array,
      default:()=> []
    },
    currentPage:{
      type: Number,
      default: 1
    },
    pageSizes:{
      type: Array,
      default:()=> [10, 50, 100, 500]
    },
    pageSize:{
      type: Number,
      default: 10
    },
    layout:{
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    maxTotal:{
      type: Number,
      default: 10
    },
    elementLoadingText:{
      type: String,
      default: "加载中"
    },
    elementLoadingBackground:{
      type: String,
      default: "rgba(255, 255, 255, 0.5)"
    },
    border:{
      type: Boolean,
      default: true
    },
    tableStyle:{
      type: String,
      default: "width: 100%"
    },
    paginationStyle:{
      type: String,
      default: "marginTop:16px"
    },
    total:{
      type: Number,
      default: 0
    }
   
  },

  data() {
    return {
      tableConfig:[],
    }
  },
  
  beforeMount(){
    let tableConfig=_.cloneDeep(this.config);
    for(let i in tableConfig){
       if(tableConfig[i].type){
         switch(tableConfig[i].type){
           case 'time':tableConfig[i].formatter=(row, column, cellValue, index)=>cellValue?moment(cellValue).format('YYYY-MM-DD HH:mm:ss'):'';break;
           case 'Boolean':tableConfig[i].formatter=(row, column, cellValue, index)=>cellValue?'是':'否' ;break;
           case 'index':tableConfig[i].formatter=(row, column, cellValue, index)=>index+1;break;
         }
       } else if(tableConfig[i].dom){
         tableConfig[i].formatter=tableConfig[i].dom
       } else{
          tableConfig[i].formatter=(row, column, cellValue, index)=>cellValue!==undefined&&cellValue!==null&&cellValue!==''?cellValue:'' 
       }
    }
    this.tableConfig=tableConfig;

  },

   computed: {
    tablePageSize:{
      get: function () {
       return this.pageSize
      },
      set:function(){
        
      }
    },

    tableCurrentPage: {
      get: function () {
       return this.currentPage
      },
      set:function(){

      }
    },

  },

  mounted(){
    
    
  },

  methods: { 
    
     handleSizeChange(val){
        this.$emit('sizeChange', val); 
     },
     
     handleCurrentChange(val){
        this.$emit('currentChange', val); 
     }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ctabel{
    width: 100%;
  }
  
</style>

