<template>
  <div  class="refundDetail">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button  type="success"
          @click="submitSure('save')"
          size="small">
            保存
          </el-button>

          <el-button 
           type="success"
          @click="submitSure('submit')"
          size="small">
            提交
          </el-button>
      </template>
    </sticky>

      <el-card class="simpleCard"  shadow="never"  body-style="padding:12px">
        <search-invoice  :searchForm="searchForm" :useRules="true"  :useDisplay="true"  @submit="submit"  ref="addSearchFormDom" ></search-invoice>
     </el-card>

  </div> 
</template>

<script>
import Sticky from '@/components/Sticky'
import SearchInvoice from '../components/refundSearch'
import moment from 'moment';
export default {
  name:'refundAdd',
  components: { Sticky,SearchInvoice},
   data() {
    return {
      searchForm:{
        客户名称:'',
        款项性质:'',
        来源数据:'',
        订单编号:'',
        合同编号:'',
        busiPlate:'',
        申请退款金额:'',
        退款原因:'',
      }
    }
  },

  mounted(){
    this.fomatDom()
  },

  updated(){
    this.fomatDom()
  },


  methods:{
    
    submitSure(type){
      this.$refs['addSearchFormDom'].submit(type)
    },

    submit(value,type){
      this.searchForm=value;
      if(type==='submit'){
        console.log('submit',value)
      } else if(type==="save"){
        console.log('save',value)
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
  }
</style>

