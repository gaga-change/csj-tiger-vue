import _  from 'lodash';
import Sticky from '@/components/Sticky' 
import webPaginationTable from '@/components/Table/webPaginationTable';
import { infoCustomerInfo ,ordernoandcontractno,getSigningInformation,getSigningDetail,infoTaxno,saveFinaSaleInvoice,billingTypeDetails } from '@/api/newoutputinvoice';  
import { tableConfig } from './config';
import {NatureInvoiceEnum as NatureInvoice,InvoiceType} from "@/utils/enum.js"
import moment from 'moment';

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
        allTaxAmount:'',//总含税发票金额
        allNotTaxAmount:'',//总不含税发票金额
        allActualTicketTax:'',//总税额
        applyLastAllowTime:'',//最迟开票日期
        applyTime:'',//发票申请日期
        invoiceType:'',//发票种类
        invoiceNature:'',//发票性质
        productBreakdown:[],//明细数组
        saleSignId:'',//回单id
        oldInvoiceCode:'',//蓝票   invoice_no
        oldInvoiceId:'',// 蓝票Id
      },

      searchRules: { 
        cusName: [
          { required: true, message: '请选择客户名称', trigger: 'change' },
        ],  
        invoiceType:[
          { required: true, message: '请选择发票种类', trigger: 'change' },
        ],
        applyLastAllowTime:[
          { required: true, message: '请选择最迟开票日期', trigger: 'change' },
        ],
        applyTime:[
          { required: true, message: '请选择发票申请日期' , trigger: 'change'},
        ],
        orderNo:[
          { required: true, message: '请选择订单编号' , trigger: 'change'},
        ],
        invoiceNature:[
          { required: true, message: '请选择发票性质', trigger: 'blur' },
        ]
      },

      NatureInvoice,//发票性质
      InvoiceType,//发票种类

      id:'',//签收单号下拉索引
      details:[],//签收明细弹框选择的列

      customerConfig:[], //客户名称下拉配置
      customerFilterMark:'',//客户名称过滤标识

      orderNoConfig:[],//订单编号下拉配置
      orderNoFilterMark:'',//订单编号过滤标识

      signNoConfig:[],//签收单号下拉配置

      outBusiBillNoConfig:[],//红票下蓝字

      shouDetails:false,//弹框是否显示
      alertLoding:false,//弹框loding

      tableConfig, //明细table配置
      tableData:[],//明细数据

      taxCodeConfig:{},//税务编码配置,

      expandRowKeysArr:[]//table展开的数组

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
    },




  },
  
  methods:{
    submitForm(formName,type){
        this.$refs[formName].validate((valid) => { 
           if(valid){
              let data=_.cloneDeep(this.searchForm);
              data.applyLastAllowTime=moment(data.applyLastAllowTime).valueOf()
              data.applyTime=moment(data.applyTime).valueOf();
              data.productBreakdown.map(v=>{
                 let json=v;
                 json.invoicedQuantity=json.skuPrice*json.invoicedQty;
                 return json;
              })
              let isRedFlash=data.oldInvoiceId!==''?1:0;
              let ticketStatus=type=="save"?0:1;
              if(isRedFlash){
                 if(!this.searchForm.oldInvoiceCode){
                   this.$message.error('红字发票不能为空');
                   return 
                 }
              }

              saveFinaSaleInvoice({...data,ticketStatus:ticketStatus,isRedFlash:isRedFlash}).then(res=>{


              }).catch(err=>{
              
              })
    
           } else{

           }
        })
    },

    customerChange(value){
      let searchForm=_.cloneDeep(this.searchForm);
      searchForm.cusName=this.customerConfig.find(v=>v.entNumber==value)&&this.customerConfig.find(v=>v.entNumber==value).entName;
      searchForm.orderNo='';
      this.id='';
      this.tableData=[];
      this.searchForm=searchForm;
      this.ordernoandcontractnoApi({entNumber:value})
    },

    saleorderChange(value){
      let searchForm=_.cloneDeep(this.searchForm);
      searchForm.contractNo=this.orderNoConfig.find(v=>v.busiBillNo==value)&&this.orderNoConfig.find(v=>v.busiBillNo==value).contractNo;
      this.searchForm=searchForm;
      this.id='';
      this.tableData=[];

      getSigningInformation({
        signatureNumber:value
      }).then(res=>{
        if(res.success){
          this.signNoConfig=res.data;
        }
      }).catch(err=>{
        
      });

      billingTypeDetails({
        outBusiBillNo:value
      }).then(res=>{
        if(res.success){
          this.outBusiBillNoConfig=res.data;
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

    goeditrow(index,row) {
      if(!this.expandRowKeysArr.includes(row.id)){
        this.expandRowKeysArr.push(row.id);
      }
      let searchForm=_.cloneDeep(this.searchForm);
      searchForm.productBreakdown[index].edit = !searchForm.productBreakdown[index].edit
      this.searchForm=searchForm;
    },

     handleDelete(index, row) {
        let searchForm=_.cloneDeep(this.searchForm);
        searchForm.productBreakdown.splice(index, 1)
        this.searchForm=searchForm;
    },

    handleClose(){
      this.shouDetails = false
    },

    handleSuccess(){
      let searchForm=_.cloneDeep(this.searchForm);
      searchForm.productBreakdown=this.details.map(v=>{
        let json=v;
        json.saleSignDetailId=v.id;
        json.taxAmount=json.skuPrice*json.invoicedQty||0;
        json.actualTicketTax=json.taxRate*(json.skuPrice+json.invoicedQty)/(1+json.taxRate)||0
        return json;
      });
      if(searchForm.productBreakdown.length==0){
        searchForm.allTaxAmount=0;
        searchForm.allActualTicketTax=0;
        searchForm.allActualTicketTax=0;
      } else if(searchForm.productBreakdown.length==1){
        searchForm.allTaxAmount=searchForm.productBreakdown[0].allTaxAmount;
        searchForm.allActualTicketTax=searchForm.productBreakdown[0].allActualTicketTax;
        searchForm.allActualTicketTax=searchForm.productBreakdown[0].allActualTicketTax;
      } else{
        searchForm.allTaxAmount=searchForm.productBreakdown.reduce((a,b)=>{
          return a.taxAmount+b.taxAmount
        });
        searchForm.allActualTicketTax=searchForm.productBreakdown.reduce((a,b)=>{
         return a.actualTicketTax+b.actualTicketTax
        });
        searchForm.allNotTaxAmount=searchForm.allTaxAmount-searchForm.allActualTicketTax>0?searchForm.allTaxAmount-searchForm.allActualTicketTax:0
      }
      this.searchForm=searchForm;
      this.shouDetails = false
    },

    add(){

    },

    cusCodeFilter(value){
       this.customerFilterMark=value;
    },

    orderNoFilter(value){
      this.orderNoFilterMark=value;
    },

    oldInvoiceCodeChange(invoiceCode){
      let searchForm=_.cloneDeep(this.searchForm);  
      searchForm.oldInvoiceId=this.outBusiBillNoConfig.find(v=>v.invoiceCode==invoiceCode)&&this.outBusiBillNoConfig.find(v=>v.invoiceCode==invoiceCode).id;
      this.searchForm=searchForm;
    },

    signNoChange(id){
      this.alertLoding=true;
      this.searchForm.saleSignId=id;
      getSigningDetail({id}).then(res=>{
        if(res.success){
           this.tableData=res.data.filter(v=>!v.whetherToInvoice).map(v=>{
             let json=v;
             json.taxRate=Number(json.taxRate/100);
             json.taxCode='';
             return json;
           });
        }
        this.alertLoding=false
      }).catch(err=>{
        this.alertLoding=false
      })
    },

    handleSelectionChange(value){
      this.details=value;
      let searchForm=_.cloneDeep(this.searchForm);  
      searchForm.productBreakdown=[];
      this.searchForm=searchForm;
    },

    isHasCusName(){
      if(this.searchForm.cusName==''){
        this.$message.error('请先选择客户名称');
      }
    },

    isShouDetails(){
      if(this.searchForm.cusName==''){
        this.$message.error('请先选择客户名称');
      }else if(this.searchForm.orderNo==''){
        this.$message.error('请先选择订单编号');
      } else{
         this.shouDetails=true;
      }
    },

    rowKey(row){
      return row.id
    }

   //税务编码下拉数据
    // taxCodeSelect(skuName,taxCode){
    //   let taxCodeConfig=_.cloneDeep(this.taxCodeConfig);
    //   if(taxCodeConfig[taxCode]&&taxCodeConfig[taxCode].length>0){
    //     return ''
    //   } else{
    //     infoTaxno({
    //       customerPdName:skuName
    //     }).then(res=>{
    //       if(res.success){
    //         taxCodeConfig[taxCode]=res.data;
    //         this.taxCodeConfig=taxCodeConfig;
    //       }
    //     }).catch(err=>{

    //     })
    //   } 
    // }
  }
}
