<template>
  <div class="outgoing-quiry-container">
  <div style="margin:12px">
    <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">
        <el-button  style="margin-left: 10px;" size="small" 
        v-if="cardData.ticketStatus == 2 || cardData.ticketStatus == 3" type="success" :disabled="buttonDisabled||!$haspermission('salesinvoicebilling')"
            @click="submitBilling" >提交
            <!-- :disabled="buttonDisabled||!$haspermission('salesinvoicebilling')" -->
        </el-button>
        <template v-else>
          <el-tag >暂无操作</el-tag>
        </template>
  </sticky>
    <invoice-detail :applyinfoConfig="applyinfoConfigDetail" :detailinfoConfig="detailinfoConfigDetail"  :cardData="cardData"  :finaSaleInvoiceDetailDOList="finaSaleInvoiceDetailDOList" :cardConfig="cardConfig" :name="name" ref="billings"/>
  </div>
  
  </div>
</template>

<script>
    import moment from 'moment';
    import { getSalesInvoiceDetails, getSalesInvoiceFinancialBilling } from '@/api/invoicetigger'
    // import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { detailtableConfig, applyinfoConfig, detailinfoConfig, recordConfig} from '../components/config';
    const name = "billing"
    const detailinfoConfigDetail = [], applyinfoConfigDetail = [];

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

    import InvoiceDetail from '../components/detail'
    import Modify from '@/utils/modify'
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
      submitBilling(){
        let {invoiceDate, invoiceCode, remark} = this.$refs.billings.searchForm
        if(!invoiceCode){
          this.$message({type:'error',message:'请填写发票号'})
          return false
        }
        if(!invoiceDate){
          
          this.$message({type:'error',message:'请选择发票日期'})
          return false
        }
        invoiceDate= +(new Date(invoiceDate))
        let params = {invoiceDate, invoiceCode, remark,id:this.$route.query.id}
        let msg = '财务开票',page='', path = ''
        if(this.cardData.ticketStatus == 2){
          msg = '财务开票'
          path = 'invoiceregistration'
          page = ',去发票登记详情页'
        }else if(this.cardData.ticketStatus == 3){
          msg = '修改财务开票'
          path = 'invoiceregistration'
          page = ',去发票登记详情页'
        }
        getSalesInvoiceFinancialBilling(params).then(res=>{
          // invoice/outputinvoice/invoiceregistration/detail+invoice/outputinvoice/invoiceapply/detail
          this.$message({type:'success', message:msg + '成功' + page,duration:2000, onClose: ()=> {
            this.$router.push({path:`/invoice/outputinvoice/${path}/detail`,query:{id:this.$route.query.id}})
          }})
          this.needfresh()
        }).catch(err=> {
          this.$message({type:'error',message:msg + '失败，请重试'})
          console.err(err);
        })
      },
      Modify,
      needfresh() {
        this.getCurrentTableData()
      },
      linkToInvoice(){
        this.$confirm('去新建发票页创建', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$router.push({
            path:`/invoice/outputinvoice/newoutputinvoice?id=${this.$route.query.id}&from=copy&time=${moment().valueOf()}`,
          })
        }).catch(err => {
          this.$message({
            type: 'warn',
            message: '审核失败!'
          })
        })
         
      },
      getCurrentTableData(){
        this.loading=true;
       getSalesInvoiceDetails({id:this.$route.query.id}).then(res=>{
       if(res.success){
          let data=res.data;
          
          
          this.tableData=data.list||[];
          this.finaSaleInvoiceDetailDOList = res.data && res.data.finaSaleInvoiceDetailDOList || []
          this.cardData = res.data
          
          this.cardData.finaSaleInvoiceDetailDOList = []
        
          this.detailConfig.name = 'apply'
       }
        this.loading=false;
        this.buttonDisabled = false

     }).catch(err=>{
         this.loading=false;
         this.buttonDisabled = false
     })
      }
    }
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

