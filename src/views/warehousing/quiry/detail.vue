<template>
  <div class="outgoing-quirydetail-container">

    <item-title text="基本信息"/>
    <item-card :config="infoConfig" :loading="loading"   :cardData="config"  />

    <item-title text="相关入库单明细"/>
    <web-pagination-table 
      :config="tableConfig" 
      :allTableData="tableData"/>
  </div>
</template>

<script>
 import moment from 'moment';
 import {inOrderDetail} from '@/api/warehousing';
 import webPaginationTable from '@/components/Table/webPaginationTable'
 import { tableConfig,infoConfig } from './config';

 export default {
    components: { webPaginationTable },
    data() {
      return {
        config:{},
        infoConfig,
        
        loading:false,
        tableData:[],
        tableConfig,
        
      }
    },

    mounted(){
      let { warehouseExeCode}=this.$route.query||{};
      this.loading=true;
      inOrderDetail({warehouseExeCode}).then(res=>{
        if(res.success){
          let data=res.data;
          this.config=data;
          this.tableData=Array.isArray(data.iwOrderDetailList)?data.iwOrderDetailList:[]
        } 
        this.loading=false;
      }).catch(err=>{
         this.loading=false;
      })
    }
 }

</script>

