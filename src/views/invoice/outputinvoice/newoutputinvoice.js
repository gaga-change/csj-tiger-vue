import Sticky from '@/components/Sticky' 
import {  InvoiceType  as invoicetype ,NatureInvoice } from '@/utils'
import { infoCustomerInfo ,ordernoandcontractno,getSigningInformation,getSigningDetail } from '@/api/newoutputinvoice';  

import _  from 'lodash';
import { tableConfig } from './config';
import webPaginationTable from '@/components/Table/webPaginationTable';
export default {
  name: 'newoutputinvoice',
  components: { Sticky ,webPaginationTable},
  data() {
    return {
      fetchSuccess:true,
      loading:false,
      searchForm:{
        cusName:'',//客户名称 
        cusCode:'',//客户编号
        orderNo:'',//订单编号
        contractNo:'',//合同编号

        invoicetype:'',
        lastinvoicedate:'',
        aplaydate:'',
        saleorder:'',
        noticketNo:'',
        ContractNumber:'',
        ticket:'',
        details:[
         {
           skuSort:'23323',
         },
         {
           skuSort:'23323',
         }
        ]
      },
      searchRules: { 

      },
      id:'',//签收单号下拉索引
      invoicetype,
      NatureInvoice,

      customerConfig:[],
      customerFilterMark:'',

      orderNoConfig:[],
      orderNoFilterMark:'',

      signNoConfig:[],

     

      shouDetails:false,
      alertLoding:false,
      tableConfig,
      tableData:[]


    }
  },
  mounted(){
     infoCustomerInfo().then(res=>{
        if(res.success){
          this.customerConfig=res.data
        }
     }).catch(err=>{

     })
  },

  computed: {
    nowCustomerConfig:{
       get: function () {
        let value=this.customerFilterMark;
        if(value==''||!this.customerConfig.length){
          return this.customerConfig
        } else{
          return this.customerConfig.filter(v=>v.entNumber.includes(value)||v.entName.includes(value))
        }
       },
       set:function(){
 
       }
    },

    nowOrderNoConfig:{
      get: function () {
        let value=this.orderNoFilterMark;
        if(value==''||!this.orderNoConfig.length){
          return this.orderNoConfig
        } else{
          return this.orderNoConfig.filter(v=>v.busiBillNo.includes(value)||v.contractNo.includes(value))
        }
       },
       set:function(){
 
       }
    }
  },
  
  methods:{
    submitForm(formName){
        this.$refs[formName].validate((valid) => { 
           if(valid){
              console.log({...this.searchForm})
           } else{

           }
        })
    },

    customerChange(value){
      let searchForm=_.cloneDeep(this.searchForm);
      searchForm.saleorder='';
      searchForm.cusName=this.customerConfig.find(v=>v.entNumber==value)&&this.customerConfig.find(v=>v.entNumber==value).entName;
      this.searchForm=searchForm;
      this.ordernoandcontractnoApi({entNumber:value})
    },

    saleorderChange(value){
      let searchForm=_.cloneDeep(this.searchForm);
      searchForm.contractNo=this.orderNoConfig.find(v=>v.busiBillNo==value)&&this.orderNoConfig.find(v=>v.busiBillNo==value).contractNo;
      this.searchForm=searchForm;
      getSigningInformation({
        signatureNumber:'SO20181011000363'
      }).then(res=>{
        if(res.success){
          this.signNoConfig=res.data;
        }
      }).catch(err=>{

      })


    },
    
    ordernoandcontractnoApi(data){
      ordernoandcontractno(data).then(res=>{
        if(res.success){
          this.orderNoConfig=res.data;
         }
       }).catch(err=>{

       })
    },

    goeditrow(index) {
      let searchForm=_.cloneDeep(this.searchForm);
      searchForm.details[index].edit = !searchForm.details[index].edit
      this.searchForm=searchForm;
    },

     handleDelete(index, row) {
        let searchForm=_.cloneDeep(this.searchForm);
        searchForm.details.splice(index, 1)
        this.searchForm=searchForm;
    },

    handleClose(){
      this.shouDetails = false
    },

    handleSuccess(){

    },

    cusCodeFilter(value){
       this.customerFilterMark=value;
    },

    orderNoFilter(value){
      this.orderNoFilterMark=value;
    },

    signNoChange(id){
      this.alertLoding=true;
      getSigningDetail({id}).then(res=>{
        if(res.success){
           this.tableData=res.data.filter(v=>!v.whetherToInvoice);
        }
        this.alertLoding=false
      }).catch(err=>{
        this.alertLoding=false
      })
    }





  }

}
