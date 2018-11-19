<template>
  <div class="outgoing-quirydetail-container">

  <item-title text="付款单详情"/>
  <item-card :config="paymentInfoConfig" :loading="loading"   :cardData="cardData"  />
  <slot></slot>
     <item-title text="操作记录"/>
     	
    <web-pagination-table 
      :loading="loading"
      :config="recordConfig" 
      :allTableData="recordData"/>
  </div>
</template>

<script>
  import _ from 'lodash'
 import webPaginationTable from '@/components/Table/webPaginationTable'
  import { recordConfig, paymentInfoConfig } from './config'
 export default {
    name: 'InvoiceDetail', 
    components: { webPaginationTable },
    data() {
      return {
        config:{},
        recordConfig,
        paymentInfoConfig,
        searchForm:{},
        recordData:[],
        loading:false,

        card:{},
        deConfig:{}        
      }
    },
    watch:{
      tableData(){
        console.log(this.tableData,123);
        this.recordData = [...this.tableData]
      }
    },
    created(){
      this.recordData = [...this.tableData]
    },
    props:{
      name:{
        type:String,
        default:''
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

