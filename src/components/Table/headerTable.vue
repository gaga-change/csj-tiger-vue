<template>
  <div class="headerTable">
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :element-loading-text="elementLoadingText"
        :element-loading-background="elementLoadingBackground"
        :data="!usePagination?allTableData:tableData"
        :size="size"
        :border="border"
        :show-summary="showSummary"
        :summary-method="getSummaries||getSummarie"
         @selection-change="handleSelectionChange"
        :style="tableStyle"> 
         <el-table-column
            v-for="item in config"
            :fixed="item.fixed"
            :width="item.width"
            align="center"
            :min-width="item.minWidth"
            :key="item.label"
            :label="item.label">
            <el-table-column
              v-for="childrenItem in item.children"
              :fixed="childrenItem.fixed"
              :width="childrenItem.width"
              :min-width="childrenItem.minWidth"
              :key="childrenItem.label"
              :label="childrenItem.label">
                <template slot-scope="scope">
                    <template v-if="childrenItem.useEdit">
                      <template v-if="scope.row&&scope.row.edit">
                        <el-input
                            size="mini"
                            v-if="childrenItem.editType"
                            :style="`width:${childrenItem.width-20}px`"
                            :type="childrenItem.editType"
                            :max="childrenItem.max&&Array.isArray(childrenItem.max)&&scope.row[childrenItem.max[0]]-scope.row[childrenItem.max[1]]"
                            :min="childrenItem.min||0"
                            v-model="scope.row[childrenItem.prop]" >
                        </el-input>
                        <el-input-number
                            size="mini"
                            v-else
                            :max="childrenItem.max&&Array.isArray(childrenItem.max)&&scope.row[childrenItem.max[0]]-scope.row[childrenItem.max[1]]"
                            :min="childrenItem.min||0"
                            :style="`width:${childrenItem.width-20}px`"
                            v-model="scope.row[childrenItem.prop]" >
                        </el-input-number>
                      </template>
                      <span v-else>
                        {{formatter(scope.row,childrenItem,scope.row[childrenItem.prop],scope.$index)}}
                      </span>
                    </template>
                    <span v-else-if="childrenItem.linkTo">
                      <router-link :to="{path:childrenItem.linkTo,query:mapFormatter(childrenItem.query,scope.row)}" style="color:#3399ea">{{childrenItem.linkText?  childrenItem.linkText:scope.row[childrenItem.prop]}}</router-link>
                    </span>
                    <span v-else>
                      {{formatter(scope.row,childrenItem,scope.row[childrenItem.prop],scope.$index)}}
                    </span>
                </template>
            </el-table-column>
          </el-table-column>

          <el-table-column
            v-if="useEdit"
            width="160"
            fixed="right"
            label="操作" >
            <template slot-scope="scope">
                <div style="width:160px">
                    <el-button v-if="scope.row.edit" type="success" @click="goeditrow(scope.$index,'sure')" size="mini" >确定</el-button>
                    <el-button v-else @click="goeditrow(scope.$index,'edit')" size="mini" >编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </div>
            </template>
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
import moment from 'moment';
import { mapGetters } from 'vuex'
import  * as Enum from "@/utils/enum.js";
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
    size:{
      type: String,
      default: "small"
    },
    pageSizes:{
      type: Array,
      default:()=> [10, 20, 50, 100]
    },

    getSummaries:{
      type: Function,
    },
    showSummary:{
      type: Boolean,
      default: false    
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
      default: "width: 100%;table-layout:fixed"
    },
    paginationStyle:{
      type: String,
      default: "marginTop:16px"
    },
    useEdit:{
      type: Boolean,
      default: false
    },
    usePagination:{
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      currentPage:1,
      pageSize:10,
    }
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

      formatter(row, column,cellValue, index){
        if(column.type){
         if(column.useApi){
            return this.mapConfig[column.type]&&this.mapConfig[column.type].find(v=>v.key==cellValue)&&this.mapConfig[column.type].find(v=>v.key==cellValue).value||cellValue
         }  else if(column.useLocalEnum){
            return Enum[column.type]&&Enum[column.type].find(v=>v.value==cellValue)&&Enum[column.type].find(v=>v.value==cellValue).name||cellValue
         } else{
          switch(column.type){
            case 'time':return cellValue?moment(cellValue).format(column.format||'YYYY-MM-DD HH:mm:ss'):'';break;
            case 'rate':return cellValue+'%';break;
            case 'Boolean':return cellValue?'是':'否' ;break;
            case 'index':return (this.pageSize)*(this.currentPage-1)+index+1;break;
            case 'bracketsIndex':return `( ${(this.pageSize)*(this.currentPage-1)+index+1} )`;break;
            case 'toFixed':return cellValue&&Number(Number(cellValue).toFixed(2));break;
            case 'code':tableConfig[i].formatter=(row, column, cellValue, index)=> <bar-code code={cellValue}/> ;break;
           }
         }
       } else if(column.dom){
         return column.dom(row, column,cellValue, index)
       } else{
          return cellValue!==undefined&&cellValue!==null&&cellValue!==''?cellValue:'' 
         }
       },

      mapFormatter(target, data){
        let json={};
        target.forEach(item=>{
          json[item.key]=data[item.value]
        })
        return json
      },

      goeditrow(index,type) {
        this.$emit('goeditrow', index,type); 
      },

      handleDelete(index, row) {
        this.$emit('handleDelete', index, row); 
      },

      handleSizeChange(val){
        this.pageSize=val
      },
     
      handleCurrentChange(val){
        this.currentPage=val
      },

      handleSelectionChange(val){
        this.$emit('SelectionChange', val); 
      },

      getSummarie(param) {
        const { columns, data } = param;
        const sums = [];
        let configArr=[];
        this.config.forEach(item=>{
          if(item.children&&Array.isArray(item.children)){
              configArr.push(...item.children)
          } else{
            configArr.push(item)
          }
        })

        columns.forEach((items, index) => {
          let column=items;
          let json=configArr.find(citems=>citems.label===items.label)||{};
          column={...items,...json};

          if(index===0){
            sums[index] = '合计';
            return ;
          } 
          
          if(!column.useSum){
            return ''
          } 

          const values = data.map(item =>{
            if(typeof column.useSum === 'string' && column.useSum.includes(',')){
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
            if(column.unitName){
               sums[index]=Number(sums[index]).toFixed(column.fixed||2) + column.unitName;
            } else{
               sums[index]=Number(sums[index]).toFixed(column.fixed||2)
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

<style rel="stylesheet/scss" lang="scss" >
  .headerTable{
    width: 100%;
    .el-table--border{
    border-color:#dbdee3; 
    *{
      border-color:#dbdee3 !important;
    }
    
    }
    border-bottom: 1px solid #dbdee3;
    margin-bottom: -4px;
  }
</style>
