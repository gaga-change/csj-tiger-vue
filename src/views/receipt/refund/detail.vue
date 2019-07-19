<template>
  <div  class="refundDetail">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button  type="success"
          v-if="[1].includes(cardData.refundStatus)&&$haspermission('toExamineRefund')"
          v-loading="lodingConfig.toExamine"
          :disabled="disableConfig.toExamine"
          @click="refundModify({
             flag:0,
             status:1,
             prompt:'请输入审核意见！',
             successTips:'审核成功',
             errorTips:'审核失败',
             api:'refundApprove',
             loding:'toExamine'
          })"
          size="small">
            审核
          </el-button>

          <el-button  type="success"
           v-if="[1].includes(cardData.refundStatus)&&$haspermission('rejectRefund')"
           v-loading="lodingConfig.reject"
           :disabled="disableConfig.reject"
           @click="refundModify({
             flag:1,
             status:1,
             prompt:'请输入驳回意见！',
             successTips:'驳回成功',
             errorTips:'驳回失败',
             api:'refundApprove',
             loding:'reject'
          })"
          size="small">
            驳回
          </el-button>

          <el-button  type="success"
          @click="modify"
          v-if="[0,2].includes(cardData.refundStatus)&&$haspermission('editRefund')"
          size="small">
            修改
          </el-button>
  
          <el-button  type="success"
           v-if="[0].includes(cardData.refundStatus)&&$haspermission('submitRefund')"
            v-loading="lodingConfig.submit"
           :disabled="disableConfig.submit"
           @click="refundModify({
            flag:2,
            prompt:'确定要提交吗?',
            successTips:'操作成功',
            errorTips:'操作失败',
            api:'refundApprove',
            loding:'submit'
          })"
           size="small">
            提交
          </el-button>

          <el-button  
          v-if="[0,2].includes(cardData.refundStatus)&&$haspermission('deleteRefund')"
           v-loading="lodingConfig.delete"
          :disabled="disableConfig.delete"
          @click="refundModify({
            prompt:'确定要删除吗?',
            successTips:'删除成功',
            errorTips:'删除失败',
            api:'refundRemove',
            loding:'delete'
          })"
          size="small">
            删除
          </el-button>

          <el-button  type="success"
           @click="refund"
           v-if="[3].includes(cardData.refundStatus)&&!this.$route.query.refund&&$haspermission('registerRefund')"
           size="small">
            登记退款
          </el-button>

      </template>
    </sticky>
     
     <div>
       <item-title text="基本信息"/>
       <item-card :config="refundDetailBaseConfig" :loading="loading"   :cardData="cardData"  />
     </div>
   
      <div v-if="[4].includes(cardData.refundStatus)" >
       <item-title text="退款信息"/>
       <item-card :config="refundDetailPayConfig" :loading="loading"   :cardData="cardData"  />
     </div>

    <div v-if="[3].includes(cardData.refundStatus)&&this.$route.query.refund">
       <item-title text="登记退款相关表单"/>
       <el-card class="simpleCard"  shadow="never"  body-style="padding:12px">
        <search-invoice  :searchForm="searchForm" :useRules="true"  @fileListChange="fileListChange"  @submit="submit" :showPayForm="true"  ref="detailSearchFormDom" ></search-invoice>
        <el-button type="primary"  size="small" v-loading="refundLoding" :disabled="refundDisable"  @click="submitSure">登记确认</el-button>
        <el-button type="primary"  size="small" :disabled="refundDisable" @click="resetForm">取消</el-button>
      </el-card>
    </div>
    <alert-detail 
    :alertDisplay="alertDisplay"
    :busiBillNo="cardData.busiBillNo"
    @close="close"/>
  </div> 
</template>

<script>
import Sticky from '@/components/Sticky'
import { refundDetailBaseConfig,refundDetailPayConfig } from '../components/config'; 
import SearchInvoice from '../components/refundSearch'
import { refundDetail,refundRegister } from '@/api/refund.js'
import refundModify from '../components/refundModify'
import AlertDetail from './alertDetail'
import _  from 'lodash';
import { mapGetters } from 'vuex'
import moment from 'moment';
export default {
  components: { Sticky,SearchInvoice,AlertDetail},
   data() {
    return {
      refundDetailBaseConfig,
      refundDetailPayConfig,
      cardData:{},
      loading:false,

      searchForm:{
        payWay:'',
        bankCode:'',
        bankName:'',
        refundDate:'',
        realRefundAmt:'',
        files:[],
      },

      lodingConfig:{
        toExamine:false,
        reject:false,
        submit:false,
        delete:false,
      },

      disableConfig:{
        toExamine:false,
        reject:false,
        submit:false,
        delete:false, 
      },

      refundLoding:false,
      refundDisable:false,

      alertDisplay:false,
    }
  },

  mounted(){
    this.getCurrentTableData();
  },


  computed: {
    ...mapGetters({
      visitedViews: 'visitedViews',
    }),
  },


  methods:{
    refundModify,
    close(){
      this.alertDisplay=false;
    },

    refund(){
      this.$router.replace({
        path:'/receipt/refundDetail',
        query:{refundNo:this.$route.query.refundNo,id:this.$route.query.id,refund:true}
      }) 
    },

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
      let json=value;
      json.id=this.$route.query.id;
      json.realRefundAmt=Number(json.realRefundAmt);
      if(type==='submit'){
        this.refundLoding=true;
        this.refundDisable=true;
        refundRegister(json).then(res=>{
          this.refundLoding=false;
          this.refundDisable=false;
          if(res.success){
            this.$router.replace({
              path:'/receipt/refundDetail',
              query:{refundNo:this.$route.query.refundNo,id:this.$route.query.id}
            }) 
            this.getCurrentTableData(); 
          }
        }).catch(err=>{
          this.refundLoding=false;
          this.refundDisable=false;
          console.err(err)
        })
      }
    },


    modify(){
      this.$router.push({
        path:`/receipt/refundAdd?refundNo=${this.$route.query.refundNo}&id=${this.$route.query.id}&modify=true&time=${moment().valueOf()}`,
      })
    },


    getCurrentTableData(){
      this.loading=true;
      refundDetail({
         refundNo:this.$route.query.refundNo
      }).then(res=>{
        this.loading=false;
        if(res.success){
           if(res.data&&res.data.sourceOrderNo.includes('PO')){
              let refundDetailBaseConfig= _.cloneDeep(this.refundDetailBaseConfig);
              refundDetailBaseConfig.forEach(item=>{
                if(item.prop==='sourceOrderNo'){
                  item.linkTo='/warehousing/businessorder-detail'
                }
              })
           }

           let refundDetailBaseConfig= _.cloneDeep(this.refundDetailBaseConfig);
           let index=refundDetailBaseConfig.findIndex(v=>v.prop==='approveReason');
           if(res.data){
             if(index!==-1){
               refundDetailBaseConfig.splice(index,1)
             }
             if(res.data.refundStatus===2){
               refundDetailBaseConfig.push({
                 title:'驳回意见',
                 prop:'approveReason'
               })
             } else if(res.data.refundStatus===3){
               refundDetailBaseConfig.push({
                 title:'审核意见',
                 prop:'approveReason'
               })
             }
           }
           this.refundDetailBaseConfig=refundDetailBaseConfig;
           this.cardData=res.data; 
           let busiBillNoRow=document.querySelector('.busiBillNoClick');
           let cardTextLink=busiBillNoRow.querySelector('.busiBillNoClick .card-text-link');
           if(cardTextLink){
             busiBillNoRow.removeChild(cardTextLink);
           }
           let node=document.createElement("span");
           node.classList.add("card-text");
           node.classList.add("card-text-link");
           node.innerHTML="查看来源单据"
           node.onclick=()=>{
            this.alertDisplay=true;
           }
           busiBillNoRow.appendChild(node);
        }
      }).catch(err=>{
        this.loading=false;
        console.err(err)
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
    .card-text-link{
      color: rgb(51, 153, 234);
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>

