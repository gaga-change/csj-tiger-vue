<template>
  <div class="outgoing-quiry-container">
  <div style="margin:12px">
    <invoice-detail :applyinfoConfig="applyinfoConfigDetail" :detailinfoConfig="detailinfoConfigDetail"  :cardData="cardData"  :finaSaleInvoiceDetailDOList="finaSaleInvoiceDetailDOList" :cardConfig="cardConfig" :name="name"/>
  </div>
  
  </div>
</template>

<script>
    import moment from 'moment';
    import { getSalesInvoiceDetails } from '@/api/invoice'
    // import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { detailtableConfig, applyinfoConfig, detailinfoConfig, recordConfig} from '../components/tableConfig';
    const name = "register"
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

