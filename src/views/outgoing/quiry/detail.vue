<template>
  <div class="outgoing-quirydetail-container">

    <item-title text="基本信息"/>
    <item-card :config="infoConfig" :loading="loading"   :cardData="config"  />

     <item-title text="相关出库单明细"/>
      <web-pagination-table 
      :loading="loading"
      :config="tableConfig" 
      :allTableData="tableData"/>
  </div>
</template>

<script>
 import moment from 'moment';
 import {outOrderDetail} from '@/api/outgoing';
 import webPaginationTable from '@/components/Table/webPaginationTable'
 import {tableConfig,infoConfig } from './config';

 export default {
     components: { webPaginationTable },
    data() {
      return {
        config:{},
        infoConfig,

        tableData:[],
        tableConfig,

        loading:false
      }
    },

    mounted(){
      let { id}=this.$route.query||{};
      this.loading=true;
      outOrderDetail({orderId:id}).then(res=>{
        if(res.success){
          let data=res.data;
          this.config=data;
          this.tableData=Array.isArray(data.owOrderDetailList)?data.owOrderDetailList:[];
        } 
        this.loading=false;
      }).catch(err=>{
          this.loading=false;
      })
    },
 }

</script>
