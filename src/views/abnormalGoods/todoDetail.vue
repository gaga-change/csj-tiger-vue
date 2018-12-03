<template>
  <div  class="abnormalGoods">

    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button  type="success"  size="small"  @click="linkTo"  >登记供应商退款</el-button>
         <el-button  type="success"  size="small" >已完成退款</el-button>
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
import { findPurchaseOrder ,selectByBusiBillNo} from '@/api/abnormalGoods/index';
export default {
  components: { webPaginationTable,Sticky },
   data() {
    return {
     todoDetailInfoConfig,
     cardData:{},
     loading:false,


     todoDetailTableConfig,
     tableData:[],
     id:''

    }
  },

  mounted(){
    let { title }=this.$route.query||{};
    selectByBusiBillNo({
      busiBillNo:title
    }).then(res=>{
      if(res.success){
         this.id=res.data.id;
      }
    }).catch(err=>{
      console.log(err)
    })

    this.findPurchaseOrderApi();
    let dom=document.querySelectorAll('.sub-navbar >div');
    [...dom].forEach(item=>{
      if(item.innerHTML==='sticky'){
         item.innerHTML= '<button type="button" class="el-button  el-button--small" style="margin-left: 10px;"><span>暂无操作</span></button>'
      }
    })
  },

  updated(){
     let dom=document.querySelectorAll('.sub-navbar >div');
     [...dom].forEach(item=>{
      if(item.innerHTML==='sticky'){
         item.innerHTML= '<button type="button" class="el-button  el-button--small" style="margin-left: 10px;"><span>暂无操作</span></button>'
      }
    })
  },

  created(){

  },

  

  methods:{

    linkTo(){
       this.$router.push({
        path:`/payment/register/detail?id=${this.id}`,
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
         console.log(err);
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

