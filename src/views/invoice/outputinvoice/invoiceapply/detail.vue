<template>
  <div class="outgoing-quiry-container">
  <div style="margin:12px">
    <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">
      <template>  
       <el-button  style="margin-left: 10px;" size="small" v-if="cardData.invoiceNature==1" 
            @click="linkToInvoice()">复制 
        </el-button>
        <template v-if="cardData.ticketStatus == 1">
          <el-button  style="margin-left: 10px;" size="small" type="success" :disabled="buttonDisabled||!$haspermission('salesinvoicecheck')"
              @click="()=>{this.buttonDisabled=true;Modify(2, 'inputInvoice',needfresh)}" >审核
              <!-- :disabled="buttonDisabled||!$haspermission('invoiceCheck')" -->
          </el-button>
          <el-button  style="margin-left: 10px;" type="warning" size="small" :disabled="buttonDisabled||!$haspermission('salesinvoicereject')"
              @click="()=>{this.buttonDisabled=true;Modify(0, 'inputInvoice',needfresh)}">驳回
          </el-button>
        </template>
        <template v-if="cardData.ticketStatus == 2">
           <a :href="printUrl('supply_invoice_export', cardData.contractNo)" target="_blank">
            <el-button size="small"  style="margin-left: 10px;">导出开票清单</el-button>
          </a>
          <el-button  style="margin-left: 10px;" type="success" size="small" :disabled="buttonDisabled||!$haspermission('salesinvoicebilling')"
              @click="goToBilling">财务开票
          </el-button>
        </template>
      </template>

  </sticky>
    <invoice-detail :applyinfoConfig="applyinfoConfigDetail" :detailinfoConfig="detailinfoConfigDetail"  :cardData="cardData"  :finaSaleInvoiceDetailDOList="finaSaleInvoiceDetailDOList" :cardConfig="cardConfig" :name="name"/>
  </div>
  
  </div>
</template>

<script>
    import moment from 'moment';
    import { getSalesInvoiceDetails, getSalesInvoiceBillingReview } from '@/api/invoice'
    import { printUrl } from '@/utils'

    // import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { detailtableConfig, applyinfoConfig, detailinfoConfig, recordConfig} from '../components/tableConfig';
    import InvoiceDetail from '../components/detail'


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
      Modify(type, name) {
        // 0 驳回
        if (type === 0) {
          this.$confirm('是否确定驳回', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {
            getSalesInvoiceBillingReview({
              id: this.$route.query.id,
              ticketStatusEnum: type,
            }).then(res => {
              this.$message({
                type: 'success',
                message: '驳回成功!'
              })
              this.needfresh()
            }).catch(err => {
              this.$message({
                type: 'warn',
                message: '驳回失败!'
              })
            })
          }).catch(()=>{
             this.$message({
                type: 'info',
                message: '驳回取消'
              })
          })
        } else if (type === 2) {
          this.$confirm('是否确定审核通过?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            getSalesInvoiceBillingReview({
              id: this.$route.query.id,
              ticketStatusEnum: type,
            }).then(res => {
              this.$message({
                type: 'success',
                message: '审核成功!'
              })
              this.needfresh()
            }).catch(err => {
              console.log(err)
              this.$message({
                type: 'error',
                message: '审核失败'
              })
            })
          }).catch(()=>{})
        }
      },
      needfresh() {
        this.buttonDisabled = false
        this.getDetail()
      },
      goToBilling(){
          this.$router.push({
            path:`/invoice/outputinvoice/invoiceapply/billing?id=${this.$route.query.id}`,
          })
      },
      linkToInvoice(){
        this.$confirm('去新建发票页修改', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$router.push({
            path:`/invoice/outputinvoice/newoutputinvoice?id=${this.$route.query.id}&from="copy"`,
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
          
          this.finaSaleInvoiceDetailDOList = res.data && res.data.finaSaleInvoiceDetailDOList || []
          this.cardData = res.data
          
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

