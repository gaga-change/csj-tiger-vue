<template>
  <div class="outgoing-quirydetail-container">

  <item-title text="基本信息"/>
  <item-card :config="infoConfig" :loading="loading"   :cardData="config"  />

  <item-title text="相关明细"/>
    <web-pagination-table 
      :loading="loading"
      :config="tableConfig" 
      :allTableData="tableData"/>

  </div>
</template>

<script>

 import { warehouseDetail} from '@/api/customerconfiguration'
 import webPaginationTable from '@/components/Table/webPaginationTable'
 import { tableConfig,infoConfig} from './config';

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
      let { warehouseNo }=this.$route.query||{};
      this.loading=true;
      warehouseDetail({warehouseNo}).then(res=>{
        this.loading=false;
        if(res.success){
          let data=res.data;
          this.config=data;
          this.tableData=Array.isArray(data.items)?data.items:[]
        }
      }).catch(err=>{
        this.loading=false;
      })
    },
 }

</script>

