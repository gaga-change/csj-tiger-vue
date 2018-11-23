<template>
  <div  class="abnormalGoods">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button type="success"  size="small" @click="modify"  >修改</el-button>
         <el-button type="success"  size="small">提交</el-button>
         <el-button type="success"  size="small">驳回</el-button>
         <el-button type="success"  size="small">删除</el-button>
         <el-button type="success"  size="small">同意并提交采购申请</el-button>
      </template>
    </sticky>
     
     <div>
       <item-title text="基本信息"/>
       <item-card :config="detailBaseInfo" :loading="loading"   :cardData="cardData"  />
     </div>
   
    <div style="margin-bottom:12px">
      <item-title text="退回商品的采购信息"/> 
      <item-card :config="detailReturnBaseInfo" :loading="loading"   :cardData="detailReturnBaseInfoData"  />  
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

          <el-tab-pane label="采购退货单" name="returnGoods">
             <web-pagination-table 
              :loading="loading"
              :config="detailReturnGoods" 
              :allTableData="detailReturnGoodsData"/>
         </el-tab-pane>
        
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
import webPaginationTable from '@/components/Table/webPaginationTable'
import { detailBaseInfo,detailAbnormalReceipt,detailReturnGoods,detailReturnBaseInfo } from './components/config';
export default {
  components: { Sticky,webPaginationTable},
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
      detailReturnBaseInfoData:{},//退回商品的采购信息数据

      tabActive:'abnormal',//tab标签页


    }
  },

  mounted(){
  
  },

  created(){

  },

  methods:{
    modify(){
      this.$router.push({
        path:`/abnormalGoods/add`,
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

