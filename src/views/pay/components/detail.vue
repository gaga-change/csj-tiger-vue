<template>
  <div class="outgoing-quirydetail-container">

  <item-title text="付款单详情"/>
  <item-card :config="paymentInfoConfig" :loading="loading"   :cardData="cardData"  ><el-col  class="card-list"    :span="6" >
        <span class="card-title">申请付款金额:</span> <span class="card-text">{{this.cardData.applyPaymentAmt}}</span> <template v-if="cardData.moneyState == 2"><a style="color:#409eff;font-size:14px;" @click="toBill">付款来源</a></template></el-col></item-card>
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
  import { recordConfig } from './config'
  import { getBillId } from '@/api/pay'
 export default {
    name: 'InvoiceDetail', 
    components: { webPaginationTable },
    data() {
      return {
        config:{},
        recordConfig,
        // paymentInfoConfig,
        searchForm:{},
        recordData:[],
        loading:false,
        billClick:false,
        card:{},
        deConfig:{}        
      }
    },
    watch:{
      tableData(){
        this.recordData = [...this.tableData]
      }
    },
    created(){
      this.recordData = [...this.tableData]
    },
    methods:{
      toBill(){
        this.billClick = true
        getBillId({finaPaymentId:this.cardData.id}).then(res=>{
          this.billClick = false
          if(res.success&&res.data&&res.data[0]){
            this.$router.push({
              path:'/reconciliation/detail',
              query:{id:res.data[0].id}
            })
          }else{
            this.$message({type:'info',message:'跳转对账单详情页失败，请重试'})
          }
        }).catch(err=>{
          this.billClick = false
          this.$message({type:'info',message:'跳转对账单详情页失败，请重试'})
        })
      }
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
      paymentInfoConfig:{
        type: Array,
        required:true,
        default:()=> [] 
      }
    },
    
 }

</script>

