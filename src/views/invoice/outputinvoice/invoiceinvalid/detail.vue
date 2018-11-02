<template>
  <div class="outgoing-quiry-container">
  <div style="margin:12px">
    <!-- <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">
      <template>
        <el-button  style="margin-left: 10px;" size="small"
            @click="()=>{this.buttonDisabled=true;Modify(0, 'inputInvoice',needfresh)}" :disabled="buttonDisabled||!$haspermission('invoiceCheck')">作废申请
        </el-button>
      </template>

  </sticky> -->
    <invoice-detail :detailConfig="detailConfig" :cardData="cardData" :finaSaleInvoiceDetailDOList="finaSaleInvoiceDetailDOList"/>
  </div>
  
  </div>
</template>

<script>
    import moment from 'moment';
    import { getSalesInvoiceDetails } from '@/api/invoice'
    // import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { indexTableConfigApply } from '../components/tableConfig';
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
          detailConfig:{},
          tableConfig:indexTableConfigApply,
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
      needfresh() {
        console.log(63336);
        this.buttonDisabled = false
        this.getDetail()
      },
      linkToInvoice(){
          this.$prompt('去新建发票页修改', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(({ value }) => {
       this.$router.push({
            path:'/invoice/outputinvoice/newoutputinvoice',
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

     }).catch(err=>{
         this.loading=false;
     })
      }
    }
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

