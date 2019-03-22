<template>
  <div class="outgoing-quirydetail-container">
     <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button   size="small">关闭</el-button>
         <el-button   size="small">删除</el-button>
         <router-link  :to="`/warehousing/businessorderadd?type=modify&time=${moment().valueOf()}`"  class="tableLink">
            <el-button  type="success" size="small">修改</el-button>
         </router-link>
         <el-button  type="success" size="small">审核</el-button>
         <el-button  type="success" size="small" @click="printingVisible=true">打印</el-button>
         <router-link  :to="`/warehousing/warehousingAddPlanOrder?time=${moment().valueOf()}`"  class="tableLink">
            <el-button  type="success" size="small">创建计划单</el-button>
         </router-link>
      </template>
    </sticky>
  
     <item-title text="基本信息"/>
     <item-card :config="infoConfig" :loading="loading"   :cardData="infoData"  />

     <item-title text="相关明细"/>
     <web-pagination-table 
      :loading="loading"
      :config="tableConfig" 
      :allTableData="tableData"/>

      <el-dialog
        title="打印采购订单"
        :visible.sync="printingVisible"
         width="841px"
        :before-close="handleClose">
        <invoice id="invoice" :data="printingTable_data" :config="printingTable_config"/>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="surePrinting">打印</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>

 import { tableConfig,infoConfig,printingTable_config} from './config';
 import webPaginationTable from '@/components/Table/webPaginationTable';
 import Sticky from '@/components/Sticky'
 import Invoice from './conpoments/invoice'
 import moment from 'moment';
 import { MakePrint } from '@/utils'

 export default {
    components: { webPaginationTable,Sticky,Invoice},
    data() {
      return {
        loading:false,
        infoData:{},
        infoConfig,

        tableData:[],
        tableConfig,
        
        //打印项
        printingVisible:false,
        printingTable_data:[{},{}],
        printingTable_config
      }
    },

    mounted(){

    },

    methods:{
       moment,
       //关闭弹框
       handleClose(){
        this.printingVisible=false;
       },
       surePrinting(){
          let printContainer = document.getElementById('invoice').innerHTML;
          MakePrint(printContainer);
          this.printingVisible=false;
       }
    }
 }

</script>

<style rel="stylesheet/scss" lang="scss">
  .el-dialog__body{
    padding-top: 12px;
  }
</style>

