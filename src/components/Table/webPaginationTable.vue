<template>
  <div class="ctabel">
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :element-loading-text="elementLoadingText"
        :element-loading-background="elementLoadingBackground"
        :data="!usePagination?allTableData:tableData"
         @current-change="handleCurrentRedioChange"
        :highlight-current-row="highlightCurrentRow"
         size="small"
        :height="height"
        :max-height="maxHeight"
        :border="border"
        :show-summary="showSummary"
        :summary-method="getSummaries||getSummarie"
         @selection-change="handleSelectionChange"
        :style="tableStyle">

        <el-table-column
          v-for="item in tableConfig"
          :formatter="item.formatter"
          :key="item.lable"
          :type="item.columnType"
          :class-name="item.className"
          :fixed="item.fixed"
          :align="item.align"
          :width="item.width"
          :min-width="item.minWidth"
          :prop="item.prop"
          :label="item.label">
        </el-table-column>
      </el-table>

      <el-pagination
        v-if="total>maxTotal&&usePagination"
        :style="paginationStyle"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[...pageSizes,total]"
        :page-size="pageSize"
        size="small"
        :layout="layout"
        :total="total">
      </el-pagination>
  </div>
</template>

<script>

import _  from 'lodash';
import moment from 'moment';
import { mapGetters } from 'vuex'
import  * as Enum from "@/utils/enum.js";
export default {
   props: {
    highlightCurrentRow:{
       type: Boolean,
       default: false
    },
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
    getSummaries:{
      type: Function,
    },
    height:{
      type: Number,
    },
    maxHeight:{
      type: Number,
    },
    showSummary:{
      type: Boolean,
      default: false
    },
    pageSizes:{
      type: Array,
      default:()=> [10, 20, 50, 100]
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
    usePagination:{
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      tableConfig:[],
      currentPage:1,
      pageSize:10,
    }
  },

  beforeMount(){
    let tableConfig=_.cloneDeep(this.config);
    for(let i in tableConfig){
       if(tableConfig[i].type){
         if(tableConfig[i].useApi){
            tableConfig[i].formatter=(row, column, cellValue, index)=>this.mapConfig[tableConfig[i].type]&&this.mapConfig[tableConfig[i].type].find(v=>v.key==cellValue)&&this.mapConfig[tableConfig[i].type].find(v=>v.key==cellValue).value||cellValue
         }  else if(tableConfig[i].useLocalEnum){
            tableConfig[i].formatter=(row, column, cellValue, index)=>Enum[tableConfig[i].type]&&Enum[tableConfig[i].type].find(v=>v.value==cellValue)&&Enum[tableConfig[i].type].find(v=>v.value==cellValue).name||cellValue
         } else{
          switch(tableConfig[i].type){
            case 'time':tableConfig[i].formatter=(row, column, cellValue, index)=>cellValue?moment(cellValue).format(tableConfig[i].format||'YYYY-MM-DD HH:mm:ss'):'';break;
            case 'rate':tableConfig[i].formatter=(row, column, cellValue, index)=>cellValue+'%';break;
            case 'Boolean':tableConfig[i].formatter=(row, column, cellValue, index)=>cellValue?'是':'否' ;break;
            case 'index':tableConfig[i].formatter=(row, column, cellValue, index)=>(this.pageSize)*(this.currentPage-1)+index+1;break;
            case 'toFixed':tableConfig[i].formatter=(row, column, cellValue, index)=>cellValue&&Number(Number(cellValue).toFixed(2));break;
            case 'code':tableConfig[i].formatter=(row, column, cellValue, index)=> <bar-code code={cellValue}/> ;break;
           }
         }
       } else if(tableConfig[i].dom){
         tableConfig[i].formatter=tableConfig[i].dom
       } else if(tableConfig[i].linkTo){
          tableConfig[i].formatter=(row, column, cellValue, index)=>{
            let json={};
            tableConfig[i].query.forEach(item=>{
                json[item.key]=row[item.value]
            })
            return  <router-link  to={{path:tableConfig[i].linkTo,query:json}} style={{color:'#3399ea'}}>{tableConfig[i].linkText?  tableConfig[i].linkText:cellValue}</router-link>
          }

        } else{
          tableConfig[i].formatter=(row, column, cellValue, index)=>cellValue!==undefined&&cellValue!==null&&cellValue!==''?cellValue:''
       }
    }
    this.tableConfig=tableConfig;
  },

  computed: {
     ...mapGetters([
      'mapConfig',
    ]),

    total:{
      get: function () {
       return this.allTableData&&this.allTableData.length||0
      },
      set:function(){

      }
    },
     tableData:{
      get: function () {
       let from = this.pageSize*(this.currentPage-1);
       let to = from + this.pageSize;
       if(!this.allTableData){
         return []
       }
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
     },

     handleSelectionChange(val){
       this.$emit('SelectionChange', val);
     },

      handleCurrentRedioChange(currentRow, oldCurrentRow){
       this.$emit('currentRedioChange', currentRow, oldCurrentRow);
     },

    getSummarie(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((items, index) => {
        let column=items;
        let json=this.config.find(citems=>citems.label===items.label)||{};
        column={...items,...json};

        if(index===0){
          sums[index] = '合计';
          return ;
        }

        if(!column.useSum){
          return ''
        }

        const values = data.map(item =>{
          if(column.useSum.includes&&column.useSum.includes(',')){
            let arr=column.useSum.split(',');
              return arr.reduce((a,b)=>{
                return Number(a)*Number(item[b])
              },1)
          } else{
              return Number(item[column.prop])
          }
        });

        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          const fix = column.toFixed === undefined ? 2 : column.toFixed
          if(column.unitName){
              sums[index]=Number(sums[index]).toFixed(fix) + column.unitName;
          } else{
              sums[index]=Number(sums[index]).toFixed(fix)
          }

        } else {
          sums[index] = '';
        }
      });
      return sums;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ctabel{
    width: 100%;
  }

</style>
