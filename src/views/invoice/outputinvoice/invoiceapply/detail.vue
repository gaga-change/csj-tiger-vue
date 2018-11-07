<template>
  <div class="outgoing-quiry-container">
  <div style="margin:12px" v-loading="loading">
    <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">
      <template>  
        <el-button  style="margin-left: 10px;" size="small" v-if="cardData.invoiceCancelStatus == 2"  :disabled="buttonDisabled||!$haspermission('salseinvoicecreate')"
            @click="linkToInvoice(0)">复制 
        </el-button>
        <template v-if="cardData.ticketStatus == 0">
          <el-button  style="margin-left: 10px;" type="success" size="small" v-if="cardData.ticketStatus == 0" :disabled="buttonDisabled||!$haspermission('salseinvoicecreate')"
              @click="linkToInvoice(1)">编辑 
          </el-button>
          <el-button  style="margin-left: 10px;" type="success" size="small"  :disabled="buttonDisabled||!$haspermission('salseinvoicecreate')"
              @click="submitInvoice">提交 
          </el-button>
        </template>
      
        <template v-else-if="cardData.ticketStatus == 1">
          <el-button  style="margin-left: 10px;" size="small" type="success" :disabled="buttonDisabled||!$haspermission('salesinvoicecheck')"
              @click="()=>{this.buttonDisabled=true;Modify(2)}" >审核
              <!-- :disabled="buttonDisabled||!$haspermission('invoiceCheck')" -->
          </el-button>
          <el-button  style="margin-left: 10px;" type="warning" size="small" :disabled="buttonDisabled||!$haspermission('salesinvoicereject')"
              @click="()=>{this.buttonDisabled=true;Modify(0)}">驳回
          </el-button>
        </template>
         <el-button  style="margin-left: 10px;" type="success" size="small" v-else-if="cardData.ticketStatus == 2" :disabled="buttonDisabled||!$haspermission('salesinvoicebilling')"
              @click="goToBilling">财务开票
          </el-button>
        <template v-if="cardData.ticketStatus>1">
           <a :href="printUrl('supply_invoice_export', cardData.contractNo)" target="_blank">
            <el-button size="small"  style="margin-left: 10px;">导出开票清单</el-button>
          </a>
         
        </template>
         <!-- <template v-if="cardData.ticketStatus > 3">
          <el-tag >暂无操作</el-tag>
        </template> -->
      </template>

  </sticky>
    <invoice-detail :applyinfoConfig="applyinfoConfigDetail" :detailinfoConfig="detailinfoConfigDetail"  :cardData="cardData"  :finaSaleInvoiceDetailDOList="finaSaleInvoiceDetailDOList" :cardConfig="cardConfig" :name="name"/>
  </div>
  
  </div>
</template>

<script>
    import moment from 'moment';
    import { getSalesInvoiceDetails, getSalesInvoiceBillingReview, getSalesInvoiceSubmit } from '@/api/invoicetigger/invoice'
    import { printUrl } from '@/utils'

    // import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { detailtableConfig, applyinfoConfig, detailinfoConfig, recordConfig} from '../components/config';
    import InvoiceDetail from '../components/detail'
    import Modify from '../components/modify'


    const name = "apply"
    const detailinfoConfigDetail = [], applyinfoConfigDetail = []//子组件卡片对应的name值
        applyinfoConfig.map(item=>{
          if(name&&(item.show.indexOf(name)!=-1)){
            applyinfoConfigDetail.push(item)
          }
        })
        detailinfoConfig.map(item=>{
          if(name&&(item.show.indexOf(name)!=-1)){
            detailinfoConfigDetail.push(item)
          }
        })

    export default {
      components: { InvoiceDetail, Sticky },
      data() {
        return {
          total:0,
          rules: {},
          loading:false,
          buttonDisabled:false,
          tableData: [],
          cardData:{},
          finaSaleInvoiceDetailDOList:[],
          applyinfoConfigDetail,
          detailinfoConfigDetail,
          cardConfig:{},
          name,
        }
      },

     created(){
      this.getCurrentTableData();  
    },

    computed: {
    ...mapGetters([
      'mapConfig',
    ])},

    methods: {
      printUrl,
      Modify,
      needfresh() {
        this.buttonDisabled = false
        
        this.getCurrentTableData()
      },
      submitInvoice(){
        getSalesInvoiceSubmit({id:this.$route.query.id}).then((res)=>{
          if(res.success){
              this.$message({type:'success',message:'提交成功',duration:2000})
          }else{
              this.$message({type:'err',message:'提交失败',duration:2000})
          }
           
            this.needfresh()
        }).catch((err)=>{
          this.$message({type:'err',message:'提交失败,'+err.msg,duration:2000})
          this.needfresh()
        })
        
        
      },
      goToBilling(){
          this.$router.push({
            path:`/invoice/outputinvoice/invoiceapply/billing?id=${this.$route.query.id}`,
          })
      },
      linkToInvoice(type){
        let msg = '创建'
        if(type=='0'){
          msg = '创建'
        }else{
          msg = '编辑'
        }
        this.$confirm('去申请销项发票页'+msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$router.push({
            path:`/invoice/outputinvoice/newoutputinvoice?id=${this.$route.query.id}&from=${type?'rebuild':'copy'}`,
          })
        })
         
      },
      getCurrentTableData(){
        this.loading=true;
       getSalesInvoiceDetails({id:this.$route.query.id}).then(res=>{
       if(res.success){
          let data=res.data;
          
          this.finaSaleInvoiceDetailDOList = res.data && res.data.finaSaleInvoiceDetailDOList || []
          this.cardData = {...res.data}
          console.log(this.cardData);
          
          
          this.cardData.finaSaleInvoiceDetailDOList = []
       }
        this.loading=false;

     }).catch(err=>{
         this.loading=false;
     })
      }
    }
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

