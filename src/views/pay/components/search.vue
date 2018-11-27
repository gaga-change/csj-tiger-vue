<template lang="html">
    <el-card class="simpleCard" shadow="never" body-style="padding:12px">
      <el-form :model="searchForm" :rules="searchRules" ref="searchForm" label-width="70px" label-position="left">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="供应商名称" label-width="85px"  prop="cusName">
            <el-select v-model="searchForm.paymenterCode"
              :filter-method="cusCodeFilter" 
              clearable
              size="small"
              @foucs="clearMark"
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
                :key="item.paymenterCode"
                :label="item.paymenterName"
                :value="item.paymenterCode">
                <span class="codeNoStyle" >{{ item.paymenterCode }}</span>
                <span class="codeNoStyle" style="width:260px">{{ item.paymenterName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单编号" prop="busiBillNo">
            <el-input type="text" size="small" v-model="searchForm.busiBillNo" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同编号" >
            <el-input type="text" size="small" v-model="searchForm.contractNo" ></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="付款状态">
            <el-select v-model="searchForm.moneyState" :clearable="true"   filterable placeholder="请选择付款状态">
              <el-option
                v-for="item in MoneyStateEnum"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>   -->
      </el-row>
      <el-row :gutter="10">  

        <el-col :span="6">
          <el-form-item label="付款申请号" label-width="85px"  >
            <el-input type="text" size="small" v-model="searchForm.applyNo" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label-width="70px" label="单据状态:" class="postInfo-container-item" prop="invoicetype">
              <el-select v-model="searchForm.paymentStatus" 
               filterable clearable placeholder="请选择单据状态" 
              size="small" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in paymentStatusEnum"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>  
        
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">
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
import { paymentStatusEnum } from '@/utils/enum'
import { infoCustomerInfo ,ordernoandcontractno,getSigningInformation,getSigningDetail,infoTaxno,saveFinaSaleInvoice,billingTypeDetails } from '@/api/invoicetigger/newoutputinvoice';  
import { getProvider } from '@/api/pay'
import _  from 'lodash';

export default {
  name: 'SearchInvoice',
  data() {
    return {
      searchRules: { 
      },
      searchForm:{},
      paymentStatusEnum,
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
      paymenterCode:{//客户名称
        type: String,
        default: ''
      },
      paymentStatus:{//单据状态
        type: String,
        default: ''
      },
      busiBillNo:{//订单编号
        type: String,
        default: ''
      },
      contractNo:{//合同编号
        type: String,
        default: ''
      },
      paymentStatus:{
        type: String,//单据状态
        default: ''
      }
    },
  },
  created(){
    
    this.searchForm = _.cloneDeep(this.searchForms)
    // this.searchForm.paymentDate = [];
    //  infoCustomerInfo().then(res=>{
    //     if(res.success){
    //       this.customerConfig=res.data
    //     }
    //  }).catch(err=>{

    //  })
     getProvider().then(res=>{
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
          return this.customerConfig.filter(v=>v.paymenterCode.includes(value)||v.paymenterName.includes(value))
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
    clearMark(){
      this.customerFilterMark=''
      this.orderNoFilterMark=''
    },
    cusCodeFilter(value){
       this.customerFilterMark=value;
    },
    orderNoFilter(value){
      this.orderNoFilterMark=value;
    },

     customerChange(value){
      let searchForm=_.cloneDeep(this.searchForm);
      console.log(value,'value');
      if(value){
        searchForm.paymenterName=this.customerConfig.find(v=>v.paymenterCode==value).paymenterName;
        searchForm.paymenterCode=value;
      }else{
        searchForm.paymenterName='';
        searchForm.paymenterCode='';
      }
      
      this.id='';
      this.tableData=[];
      this.searchForm=searchForm;
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
    
    submitIt(){//查询
      if(this.searchForm.paymentDate&&this.searchForm.paymentDate[0]){
        this.searchForm.paymentStartDate = +(new Date(this.searchForm.paymentDate[0]))
        this.searchForm.paymentEndDate = +(new Date(this.searchForm.paymentDate[1]))
      }
      this.$emit('searchTrigger',this.searchForm)
    },
    resetForm(){//重置
      this.searchForm = {searchItem:this.searchForm.searchItem}
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
</style>
