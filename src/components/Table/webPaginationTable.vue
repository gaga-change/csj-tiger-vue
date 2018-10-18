<template>
  <div class="ctabel">
      <el-table
        v-loading="loading"
        :element-loading-text="elementLoadingText"
        :element-loading-background="elementLoadingBackground"
        :data="tableData"
         size="small"
        :border="border"
        :style="tableStyle">

        <el-table-column
          v-for="item in tableConfig"
          :formatter="item.formatter"
          :key="item.lable"
          :fixed="item.fixed"
          :width="item.width"
          :prop="item.prop"
          :label="item.label">
        </el-table-column>

      </el-table>

      <el-pagination
        :style="paginationStyle"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
         size="small"
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
    allTableData: {
      type: Array,
      default:()=>[]
    },
    config:{
      type: Array,
      default:()=> []
    },
    pageSizes:{
      type: Array,
      default:()=> [5,10, 15, 20, 30]
    },

    layout:{
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    maxTotal:{
      type: Number,
      default: 5
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
   
  },

  data() {
    return {
      tableConfig:[],
      currentPage:1,
      pageSize:5,
    }
  },
  
  beforeMount(){
    let tableConfig=_.cloneDeep(this.config);
    for(let i in tableConfig){
       if(tableConfig[i].type){
         switch(tableConfig[i].type){
           case 'time':tableConfig[i].formatter=(row, column, cellValue, index)=>cellValue?moment(cellValue).format('YYYY-MM-DD HH:mm:ss'):'';break;
           case 'Boolean':tableConfig[i].formatter=(row, column, cellValue, index)=>cellValue?'是':'否' ;break;
           case 'index':tableConfig[i].formatter=(row, column, cellValue, index)=>(this.pageSize)*(this.currentPage-1)+index+1;break;
         }
       } else if(tableConfig[i].dom){
         tableConfig[i].formatter=tableConfig[i].dom
       } else{
          tableConfig[i].formatter=(row, column, cellValue, index)=>cellValue!==undefined&&cellValue!==null&&cellValue!==''?cellValue:'' 
       }
    }
    this.tableConfig=tableConfig;
  },


  mounted(){
    
    
  },

  computed: {
    total:{
      get: function () {
       return this.allTableData.length
      },
      set:function(){
        
      }
    },
     tableData:{
      get: function () {
       let from = this.pageSize*(this.currentPage-1);
       let to = from + this.pageSize;
       return this.allTableData.slice(from,to)
      },
      set:function(){
        
      }
    }
  },

  methods: { 
     handleSizeChange(val){
        this.pageSize=val
     },
     
     handleCurrentChange(val){
       this.currentPage=val
     }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ctabel{
    width: 100%;
  }
</style>

