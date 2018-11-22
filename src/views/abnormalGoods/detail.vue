<template>
  <div  class="abnormalGoods">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button type="success"  size="small">修改</el-button>
         <el-button type="success"  size="small">提交</el-button>
         <el-button type="success"  size="small">驳回</el-button>
         <el-button type="success"  size="small">删除</el-button>
         <el-button type="success"  size="small">同意并提交采购申请</el-button>
      </template>
    </sticky>

    <item-title text="基本信息"/>
    <item-card :config="detailBaseInfo" :loading="loading"   :cardData="cardData"  />

    <item-title text="订单结算信息"/>   
    <web-pagination-table 
      :loading="loading"
      :config="detailorderSettlement" 
      :allTableData="detailorderSettlementData"/>

  </div> 
</template>

<script>
import Sticky from '@/components/Sticky'
import webPaginationTable from '@/components/Table/webPaginationTable'
import { detailBaseInfo,detailorderSettlement } from './components/config';
export default {
  components: { Sticky,webPaginationTable},
   data() {
    return {
      loading:false,
      cardData:{},
      detailBaseInfo,

      detailorderSettlement,
      detailorderSettlementData:[],//订单结算信息


    }
  },

  mounted(){
  
  },

  created(){

  },

  methods:{

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .abnormalGoods{
    
  }
</style>

