<template lang="html">

    <el-card class="simpleCard" shadow="never" body-style="padding:12px">
      <el-form :model="searchForm" :rules="searchRules" ref="searchForm" label-width="70px" label-position="left">
      <el-row :gutter="6">

        <el-col :span="6">
          <el-form-item label="客户名称"  prop="cusName">
            <el-select v-model="searchForm.cusCode"
              :filter-method="cusCodeFilter" 
              size="small"
              clearable
              filterable placeholder="请选择客户名称" @change="customerChange"  >
              <el-option 
                value=""
               :disabled="true"
               v-if="nowCustomerConfig.length>0" >
                <span  class="codeNoStyle">企业编号</span>
                <span  class="codeNoStyle" style="width:260px">企业名称</span>
              </el-option>

              <el-option
                v-for="item in nowCustomerConfig"
                :key="item.entNumber"
                :label="item.entName"
                :value="item.entNumber">
                <span class="codeNoStyle" >{{ item.entNumber }}</span>
                <span class="codeNoStyle" style="width:260px">{{ item.entName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

       

        <el-col :span="6">
          <el-form-item label="单据状态">
            <el-select v-model="searchForm.ticketStatusEnum" 
            size="small" :clearable="true"   filterable placeholder="请选择单据状态">
              <el-option
                v-for="item in TicketStatus"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> 

        <el-col :span="6" v-if="searchForm.searchItem!='invalid'">
            <el-form-item label-width="70px" label="发票性质:" class="postInfo-container-item">
              <el-select v-model="searchForm.ticketNatureEnum" 
              size="small" style='min-width:220px;' filterable clearable placeholder="请选择发票性质" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in NatureInvoiceEnum"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>

          <el-col :span="6" v-if="searchForm.searchItem!='invalid'">
            <el-form-item label-width="70px" label="发票状态:" class="postInfo-container-item" prop="invoicetype">
              <el-select v-model="searchForm.invoiceStatus" 
              size="small" style='min-width:220px;' filterable clearable placeholder="请选择发票状态" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in InvoiceStatus"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>


        <el-col :span="6" v-else>
          <el-form-item label="发票号码" >
            <el-input type="text" size="small"  v-model="searchForm.invoiceCode" ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="订单编号"  prop="orderNo" >
            <el-input type="text" size="small" v-model="searchForm.outBusiBillNo"></el-input>

             <!-- <el-select v-model="searchForm.orderNo" 
              clearable
              :filter-method="orderNoFilter" 
              filterable placeholder="请选择订单编号" 
              @focus="isHasCusName"
              @change="saleorderChange" >
              <el-option 
                value=""
                :disabled="true" 
                v-if="nowOrderNoConfig.length>0" >
                <span  class="codeNoStyle">销售订单号</span>
                <span  class="codeNoStyle">销售合同号</span>
              </el-option>
              <el-option
                v-for="item in nowOrderNoConfig"
                :key="item.saleorder"
                :label="item.busiBillNo"
                :value="item.busiBillNo">
                <span class="codeNoStyle">{{ item.busiBillNo }}</span>
                <span class="codeNoStyle">{{ item.contractNo }}</span>
              </el-option>
            </el-select> -->
          </el-form-item>
        </el-col>


         <el-col :span="6" v-if="searchForm.searchItem=='apply'">
          <el-form-item label="开票申请单号" label-width="90px">
            <el-input type="text" size="small"  v-model="searchForm.applyCode" ></el-input>
          </el-form-item>
        </el-col>

         <el-col :span="6" v-if="searchForm.searchItem=='register'">
          <el-form-item label="开票单号" >
            <el-input type="text" size="small"  v-model="searchForm.invoiceNo" ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" v-if="searchForm.searchItem=='register'">
          <el-form-item label="合同编号" >
            <el-input type="text" size="small"  v-model="searchForm.contractNo" ></el-input>
          </el-form-item>
        </el-col>
   
        <el-col :span="6" v-if="searchForm.searchItem=='register'||searchForm.searchItem=='invalid'">
          <el-form-item label="业务板块">
            <el-select v-model="searchForm.busiPlate" :clearable="true"   filterable placeholder="请选择业务板块">
              <el-option
                v-for="item in busiPlateConfig"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" v-if="searchForm.searchItem=='invalid'">
          <el-form-item label="申请作废状态" label-width="90px">
            <el-select v-model="searchForm.invoiceCancelStatus" :clearable="true"   filterable placeholder="请选择申请作废状态">
              <el-option
                v-for="item in invoiceCancelStatusConfig"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

         <el-col :span="12" v-if="searchForm.searchItem=='apply'">
          <el-form-item label-width="120px" label="发票最迟开票日期:"  class="postInfo-container-item">
            <el-date-picker size="small" v-model="searchForm.applyLastAllowTime" type="date" format="yyyy-MM-dd" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>

 
      <template v-if="searchForm.searchItem=='register'">
          <el-col :span="12">
            <el-form-item label-width="120px" label="发票申请日期:"  class="postInfo-container-item">
              <el-date-picker size="small" v-model="searchForm.invoiceApplicationTimeRange" 
               format="yyyy-MM-dd" 
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label-width="120px" label="发票开具日期:"  class="postInfo-container-item">
              <el-date-picker size="small" v-model="searchForm.invoiceIssueTimeRange" 
               format="yyyy-MM-dd" 
              
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

      </template>
           <el-col :span="24">
            <el-form-item label-width="0">
              <el-button type="primary"  size="small"  @click="submitIt">查询</el-button>
              <el-button type="primary"  size="small" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
      </el-row>  
    </el-form>
  </el-card>
</template>

<script>
// import {  InvoiceType  as invoicetype  } from '@/utils'
import { NatureInvoice, NatureInvoiceEnum, InvoiceStatus, TicketStatus, InvoiceType  as invoicetype ,busiPlateConfig,invoiceCancelStatusConfig} from '@/utils/enum'
import { infoCustomerInfo ,ordernoandcontractno,getSigningInformation,getSigningDetail,infoTaxno,saveFinaSaleInvoice,billingTypeDetails } from '@/api/invoicetigger/newoutputinvoice';  
import _  from 'lodash';

export default {
  name: 'SearchInvoice',
  data() {
    return {
      searchRules: { 
      },
      searchForm:{},
      invoicetype,
      InvoiceStatus,
      NatureInvoice,
      NatureInvoiceEnum,
      busiPlateConfig,//业务板块配置
      invoiceCancelStatusConfig,
      TicketStatus,
      codeConfig:[],
      customerConfig:[], //客户名称下拉配置
      customerFilterMark:'',//客户名称过滤标识

      orderNoConfig:[],//订单编号下拉配置
      orderNoFilterMark:'',//订单编号过滤标识

      signNoConfig:[],//签收单号下拉配置

    }
  },
  props:{
    searchForms:{
      cusName:{//客户名称.
        type: String,
        default: ''
      },
      ticketNatureEnum:{//发票性质.
        type: String,
        default: ''
      },
      applyLastAllowTime:{//发票最迟开票日期.
        type: String,
        default: ''
      },
      outBusiBillNo:{//订单编号.
        type: String,
        default: ''
      },
      contractNo:{//合同编号.
        type: String,
        default: ''
      },
      ticketStatusEnum:{//发票状态.发票状态
        type: String,
        default: ''
      },
      invoiceStatus:{//单据状态
        type: String,
        default: ''
      },
      invoiceCode:{//发票号码
        type: String,
        default: ''
      },
      applyCode:{//开票申请单号
        type: String,
        default: ''
      },
      invoiceNo:{//开票单号
        type: String,
        default: ''
      },
      contractNo:{
        type: String,
        default: ''
      },
      busiPlate:{ //业务板块
        type: String,
        default: ''
      },
      invoiceIssueTimeRange:{
        type:Object,
        default:()=>{}
      },
      invoiceApplicationTimeRange:{
        type:Object,
        default:()=>{}
      },
    },
  },
  created(){
    
    this.searchForm = _.cloneDeep(this.searchForms)
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
    cusCodeFilter(value){
       this.customerFilterMark=value;
    },
    orderNoFilter(value){
      this.orderNoFilterMark=value;
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
     customerChange(value){
      let searchForm=_.cloneDeep(this.searchForm);
      searchForm.cusName=this.customerConfig.find(v=>v.entNumber==value)&&this.customerConfig.find(v=>v.entNumber==value).entName;
      // searchForm.orderNo='';
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
    submitIt(){//查询
      if(this.searchForm.invoiceApplicationTimeRange&&this.searchForm.invoiceApplicationTimeRange[0]){
        this.searchForm.invoiceApplicationTime = +(new Date(this.searchForm.invoiceApplicationTimeRange[0]))
        this.searchForm.invoiceApplicationTimeEnd = +(new Date(this.searchForm.invoiceApplicationTimeRange[1]))
      }
      if(this.searchForm. invoiceIssueTimeRange&&this.searchForm.invoiceIssueTimeRange[0]){
        this.searchForm. invoiceIssueTime = +(new Date(this.searchForm.invoiceIssueTimeRange[0]))
        this.searchForm. invoiceIssueTimeEnd = +(new Date(this.searchForm.invoiceIssueTimeRange[1]))
      }
      this.$emit('searchTrigger',this.searchForm)
    },
    resetForm(){//重置
      this.searchForm = {searchItem:this.searchForm.searchItem}
      if(this.searchForm.searchItem=="invalid"){
        this.searchForm.invoiceStatus = 2
      }
      this.$emit('resetSearch',this.searchForm)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .codeNoStyle{
    float: left; 
    color: #8492a6; 
    font-size: 12px;
    width:150px;
    &:last-child{
      float: right;
    } 
  }
  .el-form-item{
    height:30px;
    margin-bottom: 20px;
  }
</style>
