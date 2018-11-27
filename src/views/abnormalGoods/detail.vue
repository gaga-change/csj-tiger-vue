<template>
  <div  class="abnormalGoods">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button v-if="cardData.billStatus===0||cardData.billStatus===3"  type="success"  size="small" @click="modify"  >修改</el-button>
         <el-button v-if="cardData.billStatus===0||cardData.billStatus===3" @click="Modify({ billStatus:1, prompt:'确认要提交吗?', successTips:'操作成功',errorTips:'操作失败',api:'submitPurcRejectApply'})"   type="success"  size="small">提交</el-button>
         <el-button v-if="cardData.billStatus===1"  @click="Modify({ billStatus:3, prompt:'请输入驳回意见', successTips:'驳回成功',errorTips:'驳回失败',api:'purcRejectApplyheck'})"  type="success"  size="small">驳回</el-button>
         <el-button v-if="cardData.billStatus===0"  @click="Modify({ billStatus:-1, prompt:'确定要删除吗?', successTips:'操作成功',errorTips:'操作失败',api:'deletePurcRejectApplyheck'})"  type="success"  size="small">删除</el-button>
         <el-button v-if="cardData.billStatus===1"  @click="Modify({ billStatus:2, prompt:'请输入审核意见', successTips:'审核成功',errorTips:'审核失败',api:'purcRejectApplyheck'})"   type="success"  size="small">同意并提交采购申请</el-button>
      </template>
    </sticky>
     
     <div>
       <item-title text="基本信息"/>
       <item-card :config="detailBaseInfo" :loading="loading"   :cardData="cardData"  />
     </div>
   
    <div style="margin-bottom:12px">
      <item-title text="退回商品的采购信息"/> 
      <item-card :config="detailReturnBaseInfo" :loading="loading"   :cardData="cardData"  />  
    </div>

    <div style="margin-bottom:12px">
      <item-title text="其他相关信息" />  
        <el-tabs v-model="tabActive" type="card">

         <el-tab-pane label="异常签收商品明细 " name="abnormal">
            <web-pagination-table 
              :loading="loading"
              :config="detailAbnormalReceipt" 
              :allTableData="detailAbnormalReceiptData"/>
          </el-tab-pane>

          <!-- <el-tab-pane label="采购退货单" name="returnGoods">
             <web-pagination-table 
              :loading="loading"
              :config="detailReturnGoods" 
              :allTableData="detailReturnGoodsData"/>
         </el-tab-pane> -->
        
     </el-tabs> 
    </div>

    <div class="tableTotal">
       <span>申请退回数量</span> : <span></span>
       <span>金额</span> : <span></span>
    </div>


  </div> 
</template>

<script>
import Sticky from '@/components/Sticky'
import Modify from './components/modify'
import webPaginationTable from '@/components/Table/webPaginationTable'
import { detailBaseInfo,detailAbnormalReceipt,detailReturnGoods,detailReturnBaseInfo } from './components/config';
import { getPurcRejectApply } from '@/api/abnormalGoods/index';  
export default {
  components: { Sticky,webPaginationTable,Modify},
   data() {
    return {
      loading:false,//全局loding

      detailBaseInfo,//基本信息配置
      cardData:{},//基本信息数据

      detailAbnormalReceipt,//异常签收商品明细配置
      detailAbnormalReceiptData:[],//异常签收商品明细数据

      detailReturnGoods,//采购退货申请单配置
      detailReturnGoodsData:[],//采购退货申请单数据

      detailReturnBaseInfo,//退回商品的采购信息配置
     

      tabActive:'abnormal',//tab标签页


    }
  },

  mounted(){
    this.getPurcRejectApplyApi();  
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
    Modify,
    getPurcRejectApplyApi(){
      let { id }=this.$route.query||{};
      getPurcRejectApply({
        id
      }).then(res=>{
        if(res.success){
          this.cardData=res.data
          this.detailAbnormalReceiptData=res.data.productBreakdown;
        }
      }).catch(err=>{
        console.log(err)
      });
    },

    modify(){
      this.$router.push({
        path:`/abnormalGoods/add?id=${this.$route.query.id}`,
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

