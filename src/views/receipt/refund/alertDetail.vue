<template>
    <el-dialog
     title="来源单据信息"
     custom-class="shouDetailsDialog"
     :visible.sync="alertDisplay"
     top="6vh"
     width="80%"
     :before-close="close">
        <div  class="alertDetail">
            <div>
            <item-title text="基本信息"/>
            <item-card :config="alertBaseInfoConfig" :loading="alertLoding"   :cardData="cardData"  />
            </div>
        
            <div style="margin-bottom:12px">
            <item-title text="相关明细" />  
            <web-pagination-table 
                :loading="alertLoding"
                :maxHeight="300"
                :config="alertTableConfig" 
                :allTableData="tableData"/>
            </div>
        </div> 
    </el-dialog>
</template>

<script>
import webPaginationTable from '@/components/Table/webPaginationTable' 
import { alertBaseInfoConfig,alertTableConfig } from '../components/config'; 
import { orderDetail } from '@/api/refund.js'
export default {
  components: { webPaginationTable},
   data() {
    return {
      alertBaseInfoConfig,
      alertTableConfig,
      tableData:[],
      cardData:{},
      alertLoding:false,
    }
  },

  watch:{
    alertDisplay:function(newVal, oldVal){
        if(newVal){
            this.alertLoding=true;
            orderDetail({
              busiBillNo:this.busiBillNo
            }).then(res=>{
               this.alertLoding=false;
              if(res.success){
                 this.tableData=res.data&&res.data.items||[];
                 this.cardData=res.data||{}
              }
            }).catch(err=>{
              this.alertLoding=false;
              console.err(err)
            })
        }
    }
  },

  props:{
     alertDisplay:{
       type:Boolean,
       default:false
     },
     busiBillNo:{
       type:String,
       default:''  
     }
  },

  methods:{
    close(){
       this.$emit('close')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .alertDetail{
    .tableTotal{
      span{
         font-size: 12px;
         color:#606266;
         &:nth-child(2n-1){
          font-weight: 600;
         }
         &:nth-child(2n){
          padding-right: 20px; 
         }
      }
     
    }
  }
</style>

