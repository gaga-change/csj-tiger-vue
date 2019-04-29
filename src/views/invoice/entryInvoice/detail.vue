<template>
   <div class="entryInvoice-detail">
      <sticky  :className="'sub-navbar published'" style="margin-bottom: 8px">
        <template >
          <el-button   v-if="[0,2].includes(cardData.ticketStatus)"    @click="Modify({type:1})"   style="margin-left: 10px;"  size="small" type="success" >提交
          </el-button>
          <el-button   v-if="[1].includes(cardData.ticketStatus)"    @click="Modify({type:0,status:0,prompt:'请输入审核意见',successTips:'审核成功',errorTips:'审核失败'})" style="margin-left: 10px;"  size="small"  type="success" >审核
          </el-button>
           <el-button v-if="[1].includes(cardData.ticketStatus)"    @click="Modify({type:0,status:1,prompt:'请输入驳回意见',successTips:'驳回成功',errorTips:'驳回失败'})"    style="margin-left: 10px;"  size="small" type="success" >驳回
          </el-button>
          <el-button  v-if="[3].includes(cardData.ticketStatus)&&[0,3].includes(cardData.cancelApplyStatus)&&!(cardData.invoiceType===1&&cardData.invoiceStatus===1)"  @click="Modify({type:3,status:0,prompt:'确定要申请作废吗?'})"   style="margin-left: 10px;"  size="small"  type="success" >作废申请
          </el-button>
          <el-button   v-if="cardData.ticketStatus===3&&cardData.cancelApplyStatus===1&&!(cardData.invoiceType===1&&cardData.invoiceStatus===1)"  @click="Modify({type:3,status:1,prompt:'确定要作废吗?'})"   style="margin-left: 10px;"  size="small"  type="success" >确认作废
          </el-button>
          <el-button   v-if="cardData.ticketStatus===3&&cardData.cancelApplyStatus===1&&!(cardData.invoiceType===1&&cardData.invoiceStatus===1)"  @click="Modify({type:3,status:2,prompt:'确定要驳回作废吗?'})"   style="margin-left: 10px;"  size="small"  type="success" >驳回作废
          </el-button>
          <el-button   v-if="[0,2].includes(cardData.ticketStatus)"  @click="modify"  style="margin-left: 10px;" size="small"  type="success" >修改 </el-button>
          <el-button    v-if="[0,2].includes(cardData.ticketStatus)"   @click="dropPurInvoiceApi"  style="margin-left: 10px;" size="small"   >删除 </el-button>
        </template> 
      </sticky>
      <item-title text="基本信息"/>
       <item-card :config="listDetailConfig" :loading="loading"   :cardData="cardData"  />   
       <item-title text="相关明细"/>
       <web-pagination-table 
       :loading="loading"
       :showSummary="true"
       :config="listDetailTableConfig" 
       :allTableData="tableData"/>
   </div>
</template>

<script>
import { listDetailConfig,listDetailTableConfig } from './components/config';
import Modify from './components/modify'
import webPaginationTable from '@/components/Table/headerTable'
import { findFinaPurchaseInvoice,dropPurInvoice } from '@/api/void'
import Sticky from '@/components/Sticky' 
import moment from 'moment';
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
    dropPurInvoiceApi(){
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        dropPurInvoice({
          id:this.$route.query.finaPurchaseInvoiceId
        }).then(res=>{
          if(res.success){
              this.$message({type:'success',message:'操作成功'})
              this.$router.push({
                path:`/invoice/entryInvoice/registrationList`,
              })
          } else{
            this.$message({type:'err',message:'操作失败'})
          }
        }).catch(err=>{
          this.$message({type:'err',message:'操作失败'})
          console.log(err)
          })
        }).catch(err=>{
          this.$message({type:'info',message:'操作取消'})
      })
    },
    modify(){
       this.$router.push({
        path:`/invoice/entryInvoice/registrationAdd?finaPurchaseInvoiceId=${this.$route.query.finaPurchaseInvoiceId}&time=${moment().valueOf()}`,
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
          if(this.cardData.taxRate){
            this.cardData.taxRate=this.cardData.taxRate/100
          }
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
  },

}


</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 .entryInvoice-detail{

 }

</style>

