<template>
  <div  class="abnormalGoods">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button  type="success" size="small" >修改</el-button>
         <el-button  type="success" size="small" >提交</el-button>
         <el-button  size="small" >删除</el-button>
      </template>
    </sticky>
     
     <div>
       <item-title text="基本信息"/>
       <item-card :config="detailBaseInfoConfig" :loading="loading"   :cardData="detailBaseInfoData"  />
     </div>
   
    <div style="margin-bottom:12px">
      <item-title text="相关明细" />  
       <web-pagination-table 
        :loading="loading"
        :config="detailTableConfig" 
        :allTableData="detailTableData"/>
    </div>


  </div> 
</template>

<script>
import Sticky from '@/components/Sticky'
import webPaginationTable from '@/components/Table/webPaginationTable'
import { detailBaseInfoConfig,detailTableConfig } from './components/config';

export default {
  components: { Sticky,webPaginationTable},
   data() {
    return {
      detailBaseInfoConfig,
      loading:false,
      detailBaseInfoData:{},

      detailTableConfig,
      detailTableData:[],
    }
  },

  mounted(){
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


  methods:{
   

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

