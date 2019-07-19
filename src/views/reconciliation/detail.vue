<template>
  <div  class="abnormalGoods">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >

         <el-button  type="success"
          v-if="detailBaseInfoData.finaPaymentId===null&&$haspermission('reconciliationEidt')"
          @click="modify"
          size="small">
            修改
          </el-button>

          <el-button  
          v-if="detailBaseInfoData.finaPaymentId===null&&$haspermission('reconciliationDelete')"
          @click="deleteorider"
          v-loading="deleLoding"
          size="small">
            删除
          </el-button>

          <el-button  type="success"
           v-if="detailBaseInfoData.finaPaymentId===null&&$haspermission('reconciliationPayAplay')"
          @click="applay"
          size="small">
            生成付款申请
          </el-button>

          

      </template>
    </sticky>
     
     <div>
       <item-title text="基本信息"/>
       <item-card :config="detailBaseInfoConfig" :loading="loading"   :cardData="detailBaseInfoData"  />
     </div>
   
    <div style="margin-bottom:12px">
      <item-title text="对账单明细" /> 
      <div class="tableTotal" v-if="totalData&&totalData.billAmt!==undefined||totalData.serviceCharge!==undefined">
       <span>该段时间内销售发票金额</span> : <span>{{totalData&&totalData.billAmt&&Number(totalData.billAmt).toFixed(2)}}</span>
       <span>服务费金额</span> : <span>{{totalData&&totalData.serviceCharge&&Number(totalData.serviceCharge).toFixed(2)}}</span>
      </div>
      <web-pagination-table 
       :loading="tableLoading"
       :config="detailTableConfig" 
       :allTableData="detailTableData"/> 
    </div>


  </div> 
</template>

<script>
import Sticky from '@/components/Sticky'
import { detailBaseInfoConfig,detailTableConfig } from './components/config';
import { queryAccountBill,getInvoiceAmmount,deleteAccountBill } from '@/api/reconciliation.js'; 
import webPaginationTable from '@/components/Table/webPaginationTable'; 
import { mapGetters } from 'vuex'
import moment from 'moment';
export default {
  components: { Sticky,webPaginationTable},
   data() {
    return {
      detailBaseInfoConfig,
      loading:false,
      detailBaseInfoData:{},

      tableLoading:false,
      detailTableConfig,
      detailTableData:[],

      totalData:{},
      deleLoding:false

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

    deleteorider(){
       const view = this.visitedViews.filter(v => v.path === this.$route.path)
       this.$confirm('确定要删除吗?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消'
       }).then(()=>{
          this.deleLoding=true;
          deleteAccountBill({
            id:this.$route.query.id
          }).then(res=>{
            this.deleLoding=false;
            if(res.success){
              this.$message({
                type:'success',
                message:'操作成功,1.5s后跳往列表页',
                duration:1500,
                onClose:()=>{
                  this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                      this.$router.push({
                        path:'/reconciliation/list',
                      })
                  }).catch(err=>{ 
                    console.err(err)
                  })  
                }
              })
            } else{
              this.$message.error('操作失败');
            }
          }).catch(err=>{
            this.deleLoding=false;
            this.$message.error('操作失败');
            console.err(err)
          })
       }).catch(err=>{
         console.err(err)
       })
    },

    modify(){
      this.$router.push({
        path:`/reconciliation/add?id=${this.$route.query.id}&time=${moment().valueOf()}`,
      }) 
    },

    applay(){
      this.$router.push({
        path:`/payment/newpayment?applyTitle=${this.detailBaseInfoData.billTitle}&moneyState=2&applyPaymentAmt=${this.totalData.serviceCharge}&byOut=true&reaconcliliationId=${this.$route.query.id}&time=${moment().valueOf()}`,
      }) 
    },

    getCurrentTableData(){
      this.loading=true;
      this.tableLoading=true;
      queryAccountBill({
        id:this.$route.query.id
      }).then(res=>{
         this.loading=false;
         if(res.success){
           if(res.data&&res.data[0]){
              this.detailBaseInfoData=res.data[0];
              let {startTime,endTime,ownerName,ownerCode,serviceRate}=this.detailBaseInfoData;
              getInvoiceAmmount({
                 startTime,
                 endTime,
                 ownerCode,
                 ownerName,
                 serviceRate
              }).then(res=>{
                this.tableLoading=false;
                if(res.success){
                  this.totalData=res.data;
                  if(res.data&&Array.isArray(res.data.items)){
                     this.detailTableData=res.data.items.filter(v=>v!==null)
                  }
                }
              }).catch(err=>{
                console.err(err)
                this.tableLoading=false;
              })

           }
         }
      }).catch(err=>{
        console.err(err)
        this.loading=false;
        this.tableLoading=false;
      })

    },


  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .abnormalGoods{
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

