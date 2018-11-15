<template>
   <invoice-detail :cardData="cardData"  
    :tableData="[]"  :name="name">
    <item-title text="实付信息"/>
  <item-card :config="tableConfig" :loading="loading"   :cardData="cardData"  />
    </invoice-detail>
</template>

<script>
    import moment from 'moment';
    import { getPaymentListAndDetail } from '@/api/pay'
    // import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { realPayInfoConfig } from '../components/config';
    import { MoneyStateEnum, MoneyTypeEnum } from '@/utils/enum'
    const name = "apply"
   
    let searchForm = {
      busiBillNo:'',
      contractNo:''
    }
    
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
          cardConfig:[],
          cardData:{},
          editable:true,//区分提交和编辑
          name,
          searchForm,
          realPayInfoConfig,
        }
      },

     created(){
       let cardConfig =[];
      realPayInfoConfig.map(item=>{
        if(item.prop=='realPay'){
          item.dom = this.formatter('realPay')
        }
        cardConfig.push(item)
      })
      this.cardConfig = cardConfig
      this.getCurrentTableData();  
      
    },

    computed: {
    ...mapGetters([
      'mapConfig',
    ])},

    methods: {
      Modify,
        formatter(type,value){
            switch(type){
              case 'operate' :return  (row, column, cellValue, index)=>{
                let id = row.id
                let status = Number(row.ticketStatus)
                switch(status){
                    default: return <div><router-link  to={{path:`/invoice/outputinvoice/invoiceapply/detail`,query:{id:id}}} style={{color:'#3399ea'}}>查看</router-link></div>
                }
              };
              case 'realPay': return  (row, column, cellValue, index)=>{
                
                return ((row.realPaymentAmt||0)-(row.realInterestAmt||0)).toFixed(2)
              };
              default:return value
            }
         
       },
      needfresh() {
        this.buttonDisabled = false
        this.getCurrentTableData()
      },
    
      getCurrentTableData(){
        this.loading=true;
        getPaymentListAndDetail({id:this.$route.query.id}).then(res=>{
          if(res.success){
           
              this.cardData = res.list[0]
              let fileInfos = res.list[0].fileInfos || {}
              fileInfos.map(item=>{
                if(item.url){
                  item.path = item.url//itemCard组件，文件下载的参数为path
                }
                
              })
              this.cardData.fileInfos = fileInfos
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


