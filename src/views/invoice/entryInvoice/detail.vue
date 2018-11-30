<template>
   <div class="entryInvoice-detail">
      <sticky  :className="'sub-navbar published'" style="margin-bottom: 8px">
        <template >
          <el-button   v-if="cardData.ticketStatus===0||cardData.ticketStatus===2"  @click="Modify({type:1})"   style="margin-left: 10px;"  size="small" type="success" >提交
          </el-button>
          <el-button    v-if="cardData.ticketStatus===1"  @click="Modify({type:0,status:0,prompt:'请输入审核意见',successTips:'审核成功',errorTips:'审核失败'})" style="margin-left: 10px;"  size="small"  type="success" >审核
          </el-button>
           <el-button  v-if="cardData.ticketStatus===1"  @click="Modify({type:0,status:1,prompt:'请输入驳回意见',successTips:'驳回成功',errorTips:'驳回失败'})"    style="margin-left: 10px;"  size="small" type="success" >驳回
          </el-button>
          <el-button   v-if="cardData.ticketStatus===3&&(cardData.cancelApplyStatus===0||cardData.cancelApplyStatus===3)"  @click="Modify({type:3,status:0,prompt:'确定要申请作废吗?'})"   style="margin-left: 10px;"  size="small"  type="success" >作废申请
          </el-button>
          <el-button   v-if="cardData.ticketStatus===3&&cardData.cancelApplyStatus===1"  @click="Modify({type:3,status:1,prompt:'确定要作废吗?'})"   style="margin-left: 10px;"  size="small"  type="success" >确认作废
          </el-button>
          <el-button   v-if="cardData.ticketStatus===3&&cardData.cancelApplyStatus===1"  @click="Modify({type:3,status:2,prompt:'确定要驳回作废吗?'})"   style="margin-left: 10px;"  size="small"  type="success" >驳回作废
          </el-button>
          <el-button  v-if="cardData.ticketStatus===0||cardData.ticketStatus===2"  @click="modify"  style="margin-left: 10px;" size="small"  type="success" >修改 </el-button>
        </template> 
      </sticky>
      <item-title text="基本信息"/>
       <item-card :config="listDetailConfig" :loading="loading"   :cardData="cardData"  />   
       <item-title text="相关明细"/>
       <web-pagination-table 
       :loading="loading"
       :config="listDetailTableConfig" 
       :allTableData="tableData"/>
   </div>
</template>

<script>
import { listDetailConfig,listDetailTableConfig } from './components/config';
import Modify from './components/modify'
import webPaginationTable from '@/components/Table/webPaginationTable'
import { findFinaPurchaseInvoice } from '@/api/void/list'
import Sticky from '@/components/Sticky' 
import _  from 'lodash';
export default {
  components: { webPaginationTable,Sticky},
  data(){
    return {
      loading:false,
      listDetailConfig,
      cardData:{},
      listDetailTableConfig,
      tableData:[]
    }
  },
  methods: {
    Modify,
    modify(){
       this.$router.push({
        path:`/invoice/entryInvoice/registrationAdd?finaPurchaseInvoiceId=${this.$route.query.finaPurchaseInvoiceId}`,
      })
    },
    findFinaPurchaseInvoiceApi(){
      let { finaPurchaseInvoiceId }=this.$route.query||{};
      this.loading=true;
      findFinaPurchaseInvoice({
        finaPurchaseInvoiceId
      }).then(res=>{
        if(res.success){
          this.tableData=res.data&&res.data.finaPurchaseInvoiceDetailBOList;
          this.cardData=res.data;
          this.cardData.notInvoiceAmt=Number(res.data.invoiceAmt-res.data.invoiceTaxAmt).toFixed(2);

          if(!this.cardData.oldInvoiceNo){
            let listDetailConfig=_.cloneDeep(this.listDetailConfig);
            let index=listDetailConfig.findIndex(v=>v.prop==='oldInvoiceNo');
            listDetailConfig.splice(index,1);
            this.listDetailConfig=listDetailConfig;
          }
        }
          this.loading=false;
      }).catch(err=>{
          this.loading=false;
      })
    }
  },
  mounted(){
    this.findFinaPurchaseInvoiceApi();
    let dom=document.querySelectorAll('.sub-navbar >div');
    [...dom].forEach(item=>{
      if(item.innerHTML==='sticky'){
         item.innerHTML= '<button type="button" class="el-button  el-button--small" style="margin-left: 10px;"><span>暂无操作</span></button>'
      }
    })
  },

}


</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 .entryInvoice-detail{

 }

</style>

