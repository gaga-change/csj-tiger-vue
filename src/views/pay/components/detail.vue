<template>
  <div class="outgoing-quirydetail-container">

  <div style="position:relative;height:30px"><item-title text="付款单详情" style="position:absolute;left:0px;"/><template v-if="cardData.moneyState == 2"><a style="color:#67c23a;position:absolute;left:105px;line-height:24px;" @click="toBill">对账记录</a></template></div>
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
    methods:{
      toBill(){
        getBillId({finaPaymentId:this.cardData.id}).then(res=>{
          if(res.success&&res.data&&res.data[0]){
            this.$router.push({
              path:'/reconciliation/detail',
              query:{id:res.data[0].id}
            })
          }else{
            this.$message({type:'info',message:'跳转对账单详情页失败，请重试'})
          }
          
        }).catch(err=>{
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

