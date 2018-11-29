<template>
  <div class="outgoing-quirydetail-container">

  <item-title text='订单入库信息'/>
  <item-card :config="config" :loading="loading"   :cardData="cardData"  />
      <el-table
          :data="tableData"
          border
          :span-method="nInOne"
          max-height="600">
          <el-table-column
            label="商品编码"
            prop="skuCode"
            width="120">
          </el-table-column>
          <el-table-column
            label="商品名称"
            prop="skuName"
            width="120">
          </el-table-column>
           <el-table-column
            label="规格型号"
            prop="skuFormat"
            minWidth="80">
          </el-table-column>
          <el-table-column
            label="品牌"
            prop="skuBrandName"
            width="120">
          </el-table-column>
         
          <el-table-column
            label="单位"
            prop="skuUnitName"
            width="60">
          </el-table-column>
          <el-table-column
            label="单价"
            prop="taxPrice"
            width="100">
          </el-table-column>
          <el-table-column
            label="采购数量"
            prop="purchaseQtySum"
            width="100">
          </el-table-column>
          <el-table-column
            label="入库总量"
            prop="inStoreQtySum"
            :formatter="addTotal"
            width="100">
          </el-table-column>
         
           <el-table-column
            label="入库单号"
            
            prop="warehouseExeCode"
            width="200">
          </el-table-column>
           <el-table-column
            label="入库日期"
            prop="inWarehouseTime"
            :formatter="timeChange"
            width="120">
          </el-table-column>
           <el-table-column
            label="入库数量"
            prop="inStoreQty"
            width="100">
          </el-table-column>
           <el-table-column
            label="入库金额"
            prop="inStoreAmt"
            width="100">
          </el-table-column>
         
        </el-table>
  </div>
</template>

<script>
  import _ from 'lodash'
  import moment from 'moment'
 import webPaginationTable from '@/components/Table/webPaginationTable'
 let count = 0
  import { titleInfo,  } from '../components/config'
  import { inOrderSelect } from '@/api/pay'
  import { paramSortArray } from '@/utils/arrayHandler'
 export default {
    name: 'InvoiceDetail', 
    components: { webPaginationTable },
    data() {
      return {
        config:titleInfo,
        searchForm:{},
        tableData:[],
        cardData:{},
        recordData:[],
        loading:false,

        card:{},      
      }
    },
    created(){
      count = 0
      
      this.getInfo()
    },
    actived(){
      this.tableData = [] 
      count = 0
      this.getInfo()
    },
    methods:{
      timeChange(a,b,c,d){
          return moment(c).format('YYYY-MM-DD')
      },
      nInOne({ row, column, rowIndex, columnIndex }) {

        let tableData = this.tableData
        let equalRow = 0
        tableData.map(item=>{
          if(item.skuCode == row.skuCode){
            ++equalRow
          }
        })
        
        if (columnIndex==0||columnIndex==1||columnIndex==2||columnIndex==3||columnIndex==4||columnIndex==5||columnIndex==6) {
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
        }else if(columnIndex==7){
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
        }else{
          return {
              rowspan: 1,
              colspan: 1
            };
        }
      },
      addTotal({...params}) {          
        let total=0
        this.tableData.map(item=>{
          if(item.skuCode == params.skuCode){
            total += Number(item.inStoreQty||0)
          }
        })
        return total
      },
      getInfo(){
        inOrderSelect({id:this.$route.query.id,busiBillNo:this.$route.query.busiBillNo}).then(res=>{
          if(res.success&&res.data){
            this.tableData = paramSortArray(res.data.items, 'skuCode')
            console.log(this.tableData,'kkk');
            
            this.cardData = res.data
          }
        })
      }
    }
 }

</script>

