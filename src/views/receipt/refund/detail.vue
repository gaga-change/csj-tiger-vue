<template>
  <div  class="refundDetail">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button  type="success"
          size="small">
            审核
          </el-button>

          <el-button  type="success"
          size="small">
            驳回
          </el-button>

          <el-button  type="success"
          @click="modify"
          size="small">
            修改
          </el-button>

          <el-button  
          size="small">
            删除
          </el-button>

          <el-button  type="success"
          size="small">
            登记退款
          </el-button>

      </template>
    </sticky>
     
     <div>
       <item-title text="基本信息"/>
       <item-card :config="refundDetailBaseConfig" :loading="loading"   :cardData="cardData"  />
     </div>
   
      <div>
       <item-title text="付款信息"/>
       <item-card :config="refundDetailPayConfig" :loading="loading"   :cardData="cardData"  />
     </div>

    <div>
       <item-title text="登记退款相关表单"/>
       <el-card class="simpleCard"  shadow="never"  body-style="padding:12px">
        <search-invoice  :searchForm="searchForm" :useRules="true"  @fileListChange="fileListChange"  @submit="submit" :showPayForm="true"  ref="detailSearchFormDom" ></search-invoice>
        <el-button type="primary"  size="small"  @click="submitSure">登记确认</el-button>
        <el-button type="primary"  size="small" @click="resetForm">取消</el-button>
      </el-card>
    </div>
  </div> 
</template>

<script>
import Sticky from '@/components/Sticky'
import { refundDetailBaseConfig,refundDetailPayConfig } from '../components/config'; 
import SearchInvoice from '../components/refundSearch'
import moment from 'moment';
export default {
  components: { Sticky,SearchInvoice},
   data() {
    return {
      refundDetailBaseConfig,
      refundDetailPayConfig,
      cardData:{},
      loading:false,

      searchForm:{
        付款方式:'',
        客户银行账户:'',
        客户银行:'',
        退款日期:'',
        实退金额:'',
        files:[],
      }
    }
  },

  mounted(){
    this.getCurrentTableData();
    this.fomatDom()
  },

  updated(){
    this.fomatDom()
  },


  methods:{
    
    fileListChange(list){
      this.searchForm.files=list;
    },

    submitSure(){
      this.$refs['detailSearchFormDom'].submit('submit')
    },

    resetForm(){
      this.$refs['detailSearchFormDom'].resetForm() 
    },

    submit(value,type){
      this.searchForm=value;
      if(type==='submit'){
        console.log({...value})
      }
    },

     fomatDom(){
      let dom=document.querySelectorAll('.sub-navbar >div');
      [...dom].forEach(item=>{
        if(item.innerHTML==='sticky'){
          item.innerHTML= '<button type="button" class="el-button  el-button--small" style="margin-left: 10px;"><span>暂无操作</span></button>'
        }
      })
    },

    modify(){
     
    },


    getCurrentTableData(){
      this.loading=true;

      this.loading=false;
  
    },


  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .refundDetail{
   .tableTotal{
      display: flex;
      justify-content: flex-end;
      margin-bottom: 8px;
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

    .btnBox{
      display: flex;
      justify-content: flex-end;
    }

    .searchBox,.btnBox{
       &::before{
        content: '';
        clear:both;
        display: block;
      }
       &::after{
        content: '';
        clear:both;
        display: block;
      }
    }
  }
</style>

