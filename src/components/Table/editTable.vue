<template>
  <div class="ctabel">
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :element-loading-text="elementLoadingText"
        :element-loading-background="elementLoadingBackground"
        :data="this._events.SelectionChange?allTableData:tableData"
         size="small"
        :border="border"
         @selection-change="handleSelectionChange"
        :style="tableStyle">

         <el-table-column
            v-for="item in config"
            :fixed="item.fixed"
            :width="item.width"
            :min-width="item.minWidth"
            :key="item.label"
            :label="item.label">
             <template slot-scope="scope">
                <template v-if="item.useEdit">
                  <template v-if="scope.row&&scope.row.edit">
                    <el-input
                        size="mini"
                        v-if="item.editType"
                        :style="`width:${item.width-20}px`"
                        :type="item.editType"
                        :max="Array.isArray(item.max)&&scope.row[item.max[0]]-scope.row[item.max[1]]"
                        :min="item.min||0"
                        v-model="scope.row[item.prop]" >
                    </el-input>
                    <el-input-number
                        size="mini"
                        v-else
                        :max="Array.isArray(item.max)&&scope.row[item.max[0]]-scope.row[item.max[1]]"
                        :min="item.min||0"
                        :style="`width:${item.width-20}px`"
                        v-model="scope.row[item.prop]" >
                    </el-input-number>
                   </template>
                   <span v-else>
                    {{formatter(scope.row,item,scope.row[item.prop],scope.$index)}}
                   </span>
                </template>
                <span v-else-if="item.linkTo">
                  <router-link :to="{path:item.linkTo,query:mapFormatter(item.query,scope.row)}" style="color:#3399ea">{{item.linkText?  item.linkText:scope.row[item.prop]}}</router-link>
                </span>
                <span v-else>
                  {{formatter(scope.row,item,scope.row[item.prop],scope.$index)}}
                </span>
            </template>
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
        v-if="total>maxTotal&&!this._events.SelectionChange"
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
    useEdit:{
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
            case 'time':return cellValue?moment(cellValue).format(column.format||'YYYY-MM-DD'):'';break;
            case 'rate':return cellValue+'%';break;
            case 'Boolean':return cellValue?'是':'否' ;break;
            case 'index':return (this.pageSize)*(this.currentPage-1)+index+1;break;
            case 'toFixed':return cellValue&&Number(Number(cellValue).toFixed(2));break;
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
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ctabel{
    width: 100%;
  }
  
</style>

