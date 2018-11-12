<template>
   <div class="entryInvoice-detail">
      <item-title text="基本信息"/>
       <item-card :config="listDetailConfig" :loading="loading"   :cardData="cardData"  />   
       <item-title text="相关明细"/>
       <web-pagination-table 
       :loading="loading"
       :config="listDetailTableConfig" 
       :allTableData="tableData"/>
   </div>
</template>

<script>
import { listDetailConfig,listDetailTableConfig } from './components/config';
import webPaginationTable from '@/components/Table/webPaginationTable'
export default {
  components: { webPaginationTable },
  data(){
    return {
      loading:false,
      listDetailConfig,
      cardData:{},
      listDetailTableConfig,
      tableData:[]

    }
  }
}
</script>


<style>
 .entryInvoice-detail{

 }

</style>

