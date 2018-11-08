<template>
  <div class="outgoing-quirydetail-container">

  <item-title text="收款单详情"/>
  <item-card :config="receiptInfoConfig" :loading="loading"   :cardData="cardData"  />
  <template v-if="name=='register'&&cardData.ticketStatus==1">
    <item-title text="收款单执行情况"/>
    <item-card :config="execInfoConfig" :loading="loading"   :cardData="cardData"  />
  </template>
  <template v-if="cardData.ticketStatus==3">
    
    <item-title text="收款单相关订单"/>
    <web-pagination-table 
      :loading="loading"
      :config="detailtableConfig" 
      :allTableData="tableData"/>
  </template>
  </div>
</template>

<script>
  import _ from 'lodash'
 import webPaginationTable from '@/components/Table/webPaginationTable'
  import { receiptInfoConfig,  execInfoConfig} from './config'
 export default {
    name: 'InvoiceDetail', 
    components: { webPaginationTable },
    data() {
      return {
        config:{},
        receiptInfoConfig,
        execInfoConfig,
        
        searchForm:{},
        recordData:[],
        tableData:[],
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
    
 }

</script>

