<template>
  <div  class="abnormalGoods">

    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button  type="success"  size="small"  @click="outgoingOk"  :disabled="outgoingButtonDisabled"   >出库确认</el-button>
      </template>
    </sticky>

    <div>
       <item-title text="采购退货单详情"/>
       <item-card :config="todoDetailInfoConfig" :loading="loading"   :cardData="cardData"  />
     </div>

      <div>
       <item-title text="退货明细"/>
       <web-pagination-table 
        :loading="loading"
        :config="todoDetailTableConfig" 
        :allTableData="tableData"/>
     </div>

  </div> 
</template>

<script>
import { todoDetailInfoConfig ,todoDetailTableConfig } from './components/config';
import Sticky from '@/components/Sticky'
import webPaginationTable from '@/components/Table/webPaginationTable'
import { findPurchaseOrder ,finishOutWarehouse} from '@/api/abnormalGoods';
export default {
  components: { webPaginationTable,Sticky },
   data() {
    return {
     todoDetailInfoConfig,
     cardData:{},
     loading:false,
     outgoingButtonDisabled:false,


     todoDetailTableConfig,
     tableData:[],
    }
  },

  mounted(){
    this.findPurchaseOrderApi();
  },

  created(){

  },

  

  methods:{
    
    outgoingOk(){
      finishOutWarehouse({
        purcBackOrder:this.$route.query.title
      }).then(res=>{
        if(res.success){
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.findPurchaseOrderApi()
        } else{
           this.$message({
            type: 'error',
            message:'操作失败'
          })
        }
          this.outgoingButtonDisabled=true;
      }).catch(err=>{
        console.err(err)
        this.outgoingButtonDisabled=true;
      })
    },

    findPurchaseOrderApi(){
      let { title }=this.$route.query||{};
      this.loading=true;
      findPurchaseOrder({
        orderCode:title
      }).then(res=>{
        if(res.success){
          this.cardData=res.data||{};
          this.tableData=res.data&&res.data.purchorderBackItems||[]
        }
         this.loading=false;
      }).catch(err=>{
         console.err(err);
         this.loading=false;
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .abnormalGoods{
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

