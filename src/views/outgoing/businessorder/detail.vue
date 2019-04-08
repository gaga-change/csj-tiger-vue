<template>
  <div class="outgoing-quirydetail-container">
     <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button   size="small">关闭</el-button>
         <el-button   size="small">删除</el-button>
         <router-link  :to="`/outgoing/businessorderadd?type=modify&id=${$route.query.id}&time=${moment().valueOf()}`"  class="tableLink">
            <el-button  type="success" size="small">修改</el-button>
         </router-link>
          <router-link  :to="`/outgoing/businessorderadd?type=revision&id=${$route.query.id}&time=${moment().valueOf()}`"  class="tableLink">
            <el-button  type="success" size="small">调整</el-button>
         </router-link>
         <el-button  type="success" size="small">审核</el-button>
         <el-button  type="success" size="small" @click="printingVisible=true">打印</el-button>
         <router-link  :to="`/outgoing/businessorderAddPlanOrder?time=${moment().valueOf()}`"  class="tableLink">
            <el-button  type="success" size="small">创建计划单</el-button>
         </router-link>
      </template>
    </sticky>
  
     <item-title text="基本信息"/>
     <item-card :config="infoConfig" :loading="loading"   :cardData="infoData"  />

     <item-title text="相关明细"/>
     <edit-Table 
      :loading="loading"
      :config="detailTableConfig" 
      :allTableData="tableData"/>

      <el-dialog
        title="打印发货清单"
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
 import editTable from '@/components/Table/editTable';
 import Sticky from '@/components/Sticky'
 import Invoice from './conpoments/invoice'
 import moment from 'moment';
 import { outBillDetail } from '@/api/outgoing'
 import { MakePrint } from '@/utils'

 export default {
    components: { editTable,Sticky,Invoice},
    data() {
      return {
        loading:false,
        infoData:{},
        infoConfig,

        tableData:[],
        detailTableConfig:tableConfig,
        
        //打印项
        printingVisible:false,
        printingTable_data:[],
        printingTable_config
      }
    },

    created(){
      let detailTableConfig= _.cloneDeep(this.detailTableConfig);
      let index=detailTableConfig.findIndex(v=>['客户销价','进货价'].includes(v.label));
      outBillDetail(this.$route.query.id).then(res=>{
        if(res.success){
          let data= _.cloneDeep(res.data);
          if(data&&data.busiBillType===21){
            detailTableConfig[index]= { label:'客户销价',prop:'outStorePrice',}
          } else {
            detailTableConfig[index]= { label:'进货价',prop:'outStorePrice',}
          }
          this.detailTableConfig=detailTableConfig;
          this.infoData=res.data;
          this.tableData=data&&Array.isArray(data.busiBillDetails)&&data.busiBillDetails||[];
        }
      }).catch(err=>{
        console.log(err)
      })
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

