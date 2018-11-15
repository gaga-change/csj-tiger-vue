<template>
  <div class="outgoing-quirydetail-container">

  <item-title :text='infoName'/>
  <item-card :config="realPayInfoConfig" :loading="loading"   :cardData="cardData"  />
 

     <item-title :text='tableName'/>
      <el-table
          :data="tableData"
          border
          :span-method="nInOne"
          max-height="600">
          <el-table-column
            label="商品编码"
            :prop="aa1"
            width="120">
          </el-table-column>
          <el-table-column
            label="商品名称"
            :prop="aa2"
            width="120">
          </el-table-column>
           <el-table-column
            label="规格型号"
            :prop="aa3"
            width="200">
          </el-table-column>
          <el-table-column
            label="品牌"
            :prop="aa4"
            width="120">
          </el-table-column>
         
          <el-table-column
            label="数量"
            :prop="aa5"
            width="80">
          </el-table-column>
          <el-table-column
            label="单位"
            :prop="aa6"
            width="80">
          </el-table-column>
          <el-table-column
            label="单价"
            :prop="aa7"
            width="100">
          </el-table-column>
          <el-table-column
            label="采购数量"
            :prop="aa8"
            width="100">
          </el-table-column>
          <el-table-column
            label="入库总量9"
            :prop="aa"
            width="100">
          </el-table-column>
           <el-table-column
            label="入库单号"
            :prop="aa"
            width="100">
          </el-table-column>
           <el-table-column
            label="入库日期"
            :prop="aa"
            width="100">
          </el-table-column>
           <el-table-column
            label="入库数量"
            :prop="aa"
            width="100">
          </el-table-column>
           <el-table-column
            label="入库金额"
            :prop="aa"
            width="100">
          </el-table-column>
         
        </el-table>
  </div>
</template>

<script>
  import _ from 'lodash'
 import webPaginationTable from '@/components/Table/webPaginationTable'
 let count = 0
  import { realPayInfoConfig,  } from './config'
 export default {
    name: 'InvoiceDetail', 
    components: { webPaginationTable },
    data() {
      return {
        config:{},
        realPayInfoConfig,
        
        searchForm:{},
        recordData:[],
        loading:false,

        card:{},
        deConfig:{}        
      }
    },
    props:{
      name:{
        type:String,
        default:''
      },
      detailtableConfig:{
        type:Array,
        required:false,
        default:()=>[]
      },
      cardData:{
        type: Object,
        required:false,
        default:()=>{}
      },

      tableData:{
        type: Array,
        required:false,
        default:()=> [] 
      },
    },
    methods:{
      nInOne({ row, column, rowIndex, columnIndex }) {
      
            
        let tableData = this.tableData
        let equalRow = 0
        tableData.map(item=>{
          if(item.id == row.id){
            ++equalRow
          }
        })
        
        if (/0|1|2|3|4|5|6|7|8/.test(columnIndex)) {
          if (rowIndex-count === 0) {
         
            return {
              rowspan: equalRow,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        if(columnIndex==9){
          if (rowIndex-count === 0) {
               count += equalRow       
            return {
              rowspan: equalRow,
              colspan: 1,
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      addTotal({...params}) {          
        let total=0
        this.tableData.map(item=>{
          if(item.id == params.id){
            total += Number(item.amount1)
          }
        })
        return total
      }
    }
 }

</script>

