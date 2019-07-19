import _  from 'lodash';
import Sticky from '@/components/Sticky' 
import moment from 'moment';

import webPaginationTable from '@/components/Table/webPaginationTable';
import { infoCustomerInfo ,ordernoandcontractno,getSigningInformation,getSigningDetail,infoTaxno,saveFinaSaleInvoice,billingTypeDetails } from '@/api/newoutputinvoice';  
import { getSalesInvoiceDetails  } from '@/api/invoicetigger';  
import { tableConfig,alertConfig } from './config';
import {NatureInvoiceEnum , InvoiceType ,NatureInvoice } from "@/utils/enum.js"
import BaseTable from '@/components/Table'

import { mapGetters } from 'vuex'

export default {
  name: 'newoutputinvoiceDelivery',
  components: { Sticky ,webPaginationTable,BaseTable},
  data() {
    return {
      disabled:false,
      radioState:'',
      fetchSuccess:true,
      loading:false,
      searchForm:{
        cusName:'',//客户名称    
        cusCode:'',//客户编号
        
        orderNo:'',//订单编号  

        applyLastAllowTime:'',//最迟开票日期
        applyTime:'',//发票申请日期

        invoiceType:'',//发票种类

        invoiceNature:'',//发票性质
        productBreakdown:[],//明细数组
        saleSignId:'',//回单id

        oldInvoiceCode:'',//蓝票   invoice_no
        oldInvoiceId:'',// 蓝票Id

        contractNo:'',//合同编号


        allActualTicketTax:'',//总税额提交值
        allTaxAmount:'',//总含税发票金额提交值
        allNotTaxAmount:'',//总不含税发票金额提交值
      },

      blueTicketstate:{
        invoiceStatus:0,
        invoiceCancelStatus:0
      },

      NatureInvoiceEnum,//发票性质
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

      restaurants:[],//税务编码配置,

      expandRowKeysArr:[],//table展开的数组

      alertConfig,//弹框表格配置
      alertData:[],//弹框数据

      taxNoByWaresId:'',//税务编码表格行数id
      shouTaxNoByWares:false, //弹框是否显示
    
      taxNoByWaresIdSeach:{
        pageNum: 1,
        pageSize:10,
        taxCode:'',
        taxCategoryName :''
      }, //弹框搜索

      taxNoByWaresLoading:false,
      taxNoByWaresTotal:0,

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
          { required: true, message: '请选择发票性质', trigger: 'change' },
        ]
      },

    }
  },

  mounted(){
    this.onLoad()
  },

  // activated(){
  //   this.onLoad()
  // },

  computed: {
    ...mapGetters({
      visitedViews: 'visitedViews',
    }),

    allNotTaxAmount:{
       get: function () { 
          return this.allTaxAmount-this.allActualTicketTax>0?this.allTaxAmount-this.allActualTicketTax:0
       },
       set:function(){
          
       }
    },

    allActualTicketTax:{
      get: function () { 
        let data=this.searchForm.productBreakdown||[];
          let resData=data.reduce((a,b)=>{
          return a+Number(b.actualTicketTax)
          },0);
          return resData;
      },
      set:function(){
        
      }
    },

    allTaxAmount:{
      get: function () { 
        let data=this.searchForm.productBreakdown||[];
        let resData=data.reduce((a,b)=>{
        return a+b.skuPrice*b.invoicedQuantity
        },0);
        return resData;
      },
      set:function(){
        
      }
    },

    nowCustomerConfig:{
       get: function () {
        let value=this.customerFilterMark;
        if((value!==0&&!value)||!this.customerConfig.length){
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
        if((value!==0&&!value)||!this.orderNoConfig.length){
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

    onLoad(){
      let { from,id }=this.$route.query||{};
      if(from){
        getSalesInvoiceDetails({id}).then(res=>{
          if(res.success){
            let data=_.cloneDeep(this.searchForm);
            if(res.data&&res.data.cusCode){
              this.ordernoandcontractnoApi({entNumber:res.data.cusCode})
            }
            if(res.data&&res.data.outBusiBillNo){
              getSigningInformation({
                signatureNumber:res.data.outBusiBillNo
              }).then(res=>{
                if(res.success){
                  this.signNoConfig=res.data;
                }
              }).catch(err=>{
                console.error(err)
              });
        
              billingTypeDetails({
                outBusiBillNo:res.data.outBusiBillNo
              }).then(res=>{
                if(res.success){
                  this.outBusiBillNoConfig=res.data;
                }
              }).catch(err=>{
                 console.error(err)
              })
            }
  
            for(let i in data){
              if(i==='orderNo'){
                data[i]=res.data['outBusiBillNo'];
              } else if(i==='invoiceNature'){
                let name=NatureInvoice&&NatureInvoice.find(v=>v.value===res.data['invoiceNature']).name;
                data[i]=NatureInvoiceEnum&&NatureInvoiceEnum.find(item=>item.name===name).value
              }   else{
                data[i]=res.data[i];
              }
            }
            
            data['productBreakdown']=res.data['finaSaleInvoiceDetailDOList'].map(v=>{
              let json=v;
              json['invoicedQty']=json['numberOfReceipts'];
              json['invoicedQuantity']=json['actualInvoiceNumber']; 
  
              json['skuPrice']=json['taxPrice'];
              json['actualTicketTax']=json['invoiceTax'];
              return json;
            })
            this.searchForm=data;
          }
        }).catch(err=>{
           console.error(err)
        })
      }
  
       infoCustomerInfo().then(res=>{
          if(res.success){
            this.customerConfig=res.data||[]
          }
       }).catch(err=>{
        console.error(err)
       })
    },

    cusCodeFilter(value){
      this.customerFilterMark=value;
    },

    handleSizeChange(val) {
      this.taxNoByWaresIdSeach={...this.taxNoByWaresIdSeach,pageSize:val,pageNum:1}
      this.infoTaxnoSesct()
    },

    handleCurrentChange(val) {
      this.taxNoByWaresIdSeach={...this.taxNoByWaresIdSeach,pageNum:val}
      this.infoTaxnoSesct()
    },
    
    submitForm(formName,type){
        let { from,id }=this.$route.query||{};
        this.$refs[formName].validate((valid) => { 
           if(valid){
              let data=_.cloneDeep(this.searchForm);
              data.applyLastAllowTime=moment(data.applyLastAllowTime).valueOf()
              data.applyTime=moment(data.applyTime).valueOf();
              data.allActualTicketTax=this.allActualTicketTax;
              data.allTaxAmount=this.allTaxAmount;
              data.allNotTaxAmount=this.allNotTaxAmount;

              // if(data.productBreakdown.some(v=>!v.taxCode)){
              //   this.$message.error('税务编码必填');
              //   return ''
              // }



              data.productBreakdown=data.productBreakdown.map(v=>{
                 let json=v;
                 json.taxAmount=v.taxPrice*v.invoicedQuantity;
                 json.saleSignDetailId=v.id;
                 return json;
              })
              
              
              // let invoiceStatus=0;
              let ticketStatus=type=="save"?'SAVING':'SUBMIT_FOR_REVIEW';

              if(from==='rebuild'){
                data.id=id;
              } else{
                delete  data.id
              }
              
              if(data.invoiceNature==='CREDIT_NOTE'){
                 if(!this.searchForm.oldInvoiceCode){
                   this.$message.error('红字发票不能为空');
                   return 
                 }
 
               if(this.blueTicketstate.invoiceCancelStatus>0&&this.blueTicketstate.invoiceCancelStatus<3||this.blueTicketstate.invoiceStatus===2){
                this.$message.error('对应蓝票存在作废状态,无法开具相应红票');
                 return ''
               }
              }

              if(data.productBreakdown.length===0){
                this.$message.error('请先选择明细');
                return ''
              }

              const view = this.visitedViews.filter(v => v.path === this.$route.path)  
              saveFinaSaleInvoice({...data,ticketStatus:ticketStatus,invoiceStatus:0}).then(res=>{
                if(res.success){
                  this.disabled=true;
                  this.$message({
                    type:'success',
                    message:'操作成功,1.5s后跳往详情页',
                    duration:1500,
                    onClose:()=>{
                      this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                        this.$router.push({
                          path: '/invoice/outputinvoice/invoiceapply/detail',
                          query:{
                            id:res.data.id,
                          }
                        })
                      }).catch(err=>{
                        console.error(err)
                      })
                    }
                  })
                }else{
                  this.$message.error('操作失败');
                }
              }).catch(err=>{
                console.error(err)
              })
    
           } else{

           }
        })
    },

    customerChange(value){
      if(!value){
        return ;
      }
      let searchForm=_.cloneDeep(this.searchForm);
      searchForm.cusName=this.customerConfig.find(v=>v.entNumber==value)&&this.customerConfig.find(v=>v.entNumber==value).entName;
      searchForm.orderNo='';
      this.id='';
      this.tableData=[];
      searchForm.productBreakdown=[];
      searchForm.oldInvoiceCode='';
      searchForm.oldInvoiceId='';
      this.searchForm=searchForm;
      this.outBusiBillNoConfig=[];

      this.ordernoandcontractnoApi({entNumber:value})
    },

    invoiceChange(){
      let searchForm=_.cloneDeep(this.searchForm);
      searchForm.oldInvoiceCode='';
      searchForm.oldInvoiceId='';
      this.searchForm=searchForm;
    },

    saleorderChange(value){
      if(!value){
        return ;
      }
      let searchForm=_.cloneDeep(this.searchForm);
      searchForm.contractNo=this.orderNoConfig.find(v=>v.busiBillNo==value)&&this.orderNoConfig.find(v=>v.busiBillNo==value).contractNo;
      searchForm.productBreakdown=[];
      searchForm.oldInvoiceCode='';
      searchForm.oldInvoiceId='';
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
        console.error(err)
      });

      billingTypeDetails({
        outBusiBillNo:value
      }).then(res=>{
        if(res.success){
          this.outBusiBillNoConfig=res.data;
        }
      }).catch(err=>{
        console.error(err)
      })
    },
    
    ordernoandcontractnoApi(data){
      ordernoandcontractno(data).then(res=>{
        if(res.success){
          this.orderNoConfig=res.data;
         }
       }).catch(err=>{
        console.error(err)  
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
      this.taxNoByWaresIdSeach={
        pageNum: 1,
        pageSize:10,
        taxCode:'',
        taxCategoryName :''
      };
      this.shouDetails = false;
      this.shouTaxNoByWares=false;
    },

    handleSuccess(){
      let searchForm=_.cloneDeep(this.searchForm);
      let configArr=searchForm.productBreakdown.map(v=>v.id);
      let details=this.details.filter(v=>!configArr.includes(v.id));

      searchForm.productBreakdown=[...searchForm.productBreakdown,...details].map(v=>{
        let json=v;
        json.saleSignDetailId=v.id;
        json.actualTicketTax=(json.taxRate)*(json.skuPrice*json.invoicedQty)/(1+json.taxRate)||0
        return json;
      });
      this.searchForm=searchForm;
      this.shouDetails = false
    },

    orderNoFilter(value){
      this.orderNoFilterMark=value;
    },

    oldInvoiceCodeChange(invoiceCode){
      let searchForm=_.cloneDeep(this.searchForm); 
      let data=this.outBusiBillNoConfig.find(v=>v.invoiceCode==invoiceCode);
      this.blueTicketstate.invoiceStatus=data.invoiceStatus;
      this.blueTicketstate.invoiceCancelStatus=data.invoiceCancelStatus;
      if(data){
        searchForm.oldInvoiceId=data.id;
        searchForm.saleSignId=data.saleSignId;
        searchForm.productBreakdown=data.saleSignDetailVOList&&data.saleSignDetailVOList.map(v=>{
           let json=v;
           json.taxRate=Number(json.taxRate/100);
           json.invoicedQuantity=json.invoicedQty;
           json.actualTicketTax=(json.taxRate)*(json.skuPrice*json.invoicedQuantity)/(1+json.taxRate)||0;
           return json;    
        })
      } 
      this.searchForm=searchForm;
    },


    invoicedQtyChange(row){
      let id=row.id;
      let actualTicketTax=(row.taxRate)*(row.skuPrice*row.invoicedQuantity)/(1+row.taxRate)||0;
      let searchForm=_.cloneDeep(this.searchForm); 
      searchForm.productBreakdown.find(v=>v.id===id).actualTicketTax=actualTicketTax;
      this.searchForm=searchForm;
    },

    signNoChange(id){
      if(!id){
        this.tableData=[];
        return ''
      };
      this.alertLoding=true;
      this.searchForm.saleSignId=id;
      //修改于2019-3-5 吴宗庙让加了个signNo字段
      let  signNo=this.signNoConfig.find(v=>v.id===id)&&this.signNoConfig.find(v=>v.id===id).signNo||''
      getSigningDetail({id,signNo}).then(res=>{
        if(res.success){
           if(this.searchForm.invoiceNature==='CREDIT_NOTE'){
            this.tableData=res.data.filter(v=>v.whetherToInvoice).map(v=>{
              let json=v;
              json.taxRate=Number(json.taxRate/100);
              json.invoicedQuantity= json.invoicedQty
              return json;
            });
           } else{
            this.tableData=res.data.filter(v=>!v.whetherToInvoice).map(v=>{
              let json=v;
              json.taxRate=Number(json.taxRate/100);
              json.invoicedQuantity= json.invoicedQty
              return json;
            });
           }
        }
        this.alertLoding=false
      }).catch(err=>{
        console.error(err)
        this.alertLoding=false
      })
    },

    handleSelectionChange(value){
      this.details=value;
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
    },

    selectTaxNoByWares(id){
      this.shouTaxNoByWares=true;
      this.taxNoByWaresId=id;
      this.taxNoByWaresIdSeach={
        pageNum: 1,
        pageSize:10,
        taxCode:'',
        taxCategoryName :''
      };
      this.infoTaxnoSesct();
    },

    currentRedioChange(value){
      if(value){
        let searchForm=_.cloneDeep(this.searchForm);
        this.taxNoByWaresIdSeach.taxCode=value.taxCode;
        this.taxNoByWaresIdSeach.taxCategoryName=value.taxCategoryName;
      }
    },


    shouTaxNoByWaresSuccess(){
      let searchForm=_.cloneDeep(this.searchForm);
      if(this.taxNoByWaresId){
        searchForm.productBreakdown.find(v=>v.id===this.taxNoByWaresId).taxCode=this.taxNoByWaresIdSeach.taxCode;
      }
      this.searchForm=searchForm;
      this.shouTaxNoByWares=false;
    },



    infoTaxnoSesct(){
      this.taxNoByWaresLoading=true;
      let data=_.cloneDeep(this.taxNoByWaresIdSeach);
      for(let i in data){
        if(data[i]===undefined||data[i]===''){
          delete data[i]
        }
      }
      infoTaxno(data).then(res=>{
        if(res.success){
           this.alertData=res.data.list;
           this.taxNoByWaresTotal=res.data.total
        }
        this.taxNoByWaresLoading=false;
      }).catch(err=>{
        console.error(err)
        this.taxNoByWaresLoading=false;
      })
    },

    taxNoByWaresIdSeachSubmitForm(){
      this.infoTaxnoSesct();
    },

    taxNoByWaresIdSeachCancel(){
      this.taxNoByWaresIdSeach={
        pageNum: 1,
        pageSize:10,
        taxCode:'',
        taxCategoryName :''
      };
      this.infoTaxnoSesct();
    },




    taxNoByWaresChange(value){
      this.searchForm=searchForm;
      this.infoTaxnoSesct();
    },

 



 


  
  }
}
