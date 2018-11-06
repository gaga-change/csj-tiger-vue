<template>
  <div class="outgoing-quiry-container">
  <div style="margin:12px">
    <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">  
       <el-button  style="margin-left: 10px;" size="small"  :disabled="buttonDisabled||!$haspermission('salseinvoicecreate')"
            @click="linkToInvoice(0)">复制 
        </el-button>  
         <el-button  style="margin-left: 10px;" type="success" size="small" v-if="cardData.ticketStatus == 0" :disabled="buttonDisabled||!$haspermission('salseinvoicecreate')"
            @click="linkToInvoice(1)">复制 
        </el-button>  
        <!-- <template v-if="cardData.ticketStatus == 3">
          <el-button  style="margin-left: 10px;" type="success" size="small" :disabled="buttonDisabled||!$haspermission('salesinvoicebilling')"
              @click="goToBilling">修改财务开票
          </el-button>
          <el-button  style="margin-left: 10px;" size="small" type="success" :disabled="buttonDisabled||!$haspermission('salesinvoicecheckreview')"
              @click="()=>{this.buttonDisabled=true;Modify(4)}" >复核
          </el-button>
        </template> -->
  </sticky>
    <invoice-detail :applyinfoConfig="applyinfoConfigDetail" :detailinfoConfig="detailinfoConfigDetail"  :cardData="cardData"  :finaSaleInvoiceDetailDOList="finaSaleInvoiceDetailDOList" :cardConfig="cardConfig" :name="name"/>
  </div>
  
  </div>
</template>

<script>
    import moment from 'moment';
    import { getSalesInvoiceDetails } from '@/api/invoicetigger/invoice'
    // import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { detailtableConfig, applyinfoConfig, detailinfoConfig, recordConfig} from '../components/config';
    const name = "invalid"
    const detailinfoConfigDetail = [], applyinfoConfigDetail = []
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
    import Modify from '../components/modify'
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
      Modify,
      goToBilling(){
        this.$router.push({
          path:`/invoice/outputinvoice/invoiceapply/billing?id=${this.$route.query.id}`,
        })
      },
      needfresh() {
        console.log(63336);
        this.buttonDisabled = false
        this.getCurrentTableData()
      },
      linkToInvoice(type){
        let msg = '创建'
        if(type=='0'){
          msg = '创建'
        }else{
          msg = '提交'
        }
        this.$confirm('去新建发票页'+msg, '提示', {
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
          
          
          this.tableData=data.list||[];
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

