<template lang="html">
    <el-card class="simpleCard" shadow="never" body-style="padding:12px">
      <el-form :model="searchForm" :rules="searchRules" ref="searchForm" label-width="70px" label-position="left">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="客户名称"  prop="cusName">
            <el-select v-model="searchForm.paymenterId"
              :filter-method="cusCodeFilter" 
              clearable
              filterable placeholder="请选择客户名称" @focus="clearCustomerFilterMark" @change="customerChange"  >
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

        <!-- <el-col :span="6">
          <el-form-item label="合同编号" >
            <el-input type="text" size="small" :disabled="true"  v-model="searchForm.contractNo" ></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="款项性质">
            <el-select v-model="searchForm.moneyState" :clearable="true"   filterable placeholder="请选择款项性质">
              <el-option
                v-for="item in MoneyStateEnum"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> 
        <el-col :span="6" v-if="searchForm.searchItem == 'register'">
            <el-form-item label-width="70px" label="执行状态:" class="postInfo-container-item">
              <el-select v-model="searchForm.RelationStatusEnum" 
              size="small" style='min-width:220px;' filterable clearable placeholder="请选择执行状态" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in RelationStatusEnum"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6" v-if="searchForm.searchItem == 'associate'">
          <el-form-item label="收款单号" label-width="90px">
            <el-input type="text" size="small"  v-model="searchForm.receiveNo" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">  
         <el-col :span="6">
          <el-form-item label="业务员" label-width="70px" v-if="searchForm.searchItem == 'register'">
            <el-input type="text" size="small"  v-model="searchForm.salesman" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="searchForm.searchItem == 'associate'">
          <el-form-item label="财务登记人" label-width="90px">
            <el-input type="text" size="small"  v-model="searchForm.inputUserName" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label-width="70px" label="单据状态:" class="postInfo-container-item" prop="invoicetype">
              <el-select v-model="searchForm.approveStatus" 
              size="small" style='min-width:220px;' filterable clearable placeholder="请选择单据状态" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in ApproveStatusEnum"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>  
        <el-col :span="6">
          <el-form-item label-width="70px" label="收款日期:"  class="postInfo-container-item">
            <el-date-picker size="small" v-model="searchForm.paymentDate" type="daterange" format="yyyy-MM-dd"start-placeholder="开始日期"
      end-placeholder="结束日期">
            </el-date-picker>
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
import { MoneyStateEnum,RelationStatusEnum,ApproveStatusEnum } from '@/utils/enum'
import { infoCustomerInfo ,ordernoandcontractno,getSigningInformation,getSigningDetail,infoTaxno,saveFinaSaleInvoice,billingTypeDetails } from '@/api/invoicetigger/newoutputinvoice';  
import _  from 'lodash';

export default {
  name: 'SearchInvoice',
  data() {
    return {
      searchRules: { 
      },
      searchForm:{},
      MoneyStateEnum,
      RelationStatusEnum,
      ApproveStatusEnum,
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
      paymenterId:{//客户名称.
        type: String,
        default: ''
      },
      moneyState:{//款项性质.
        type: String,
        default: ''
      },
      receiveNo:{//收款单号.
        type: String,
        default: ''
      },
      inputUserName:{//财务登记人.
        type: String,
        default: ''
      },
      salesman:{//业务员.
        type: String,
        default: ''
      },
      approveStatus:{//单据状态。
        type: String,
        default: ''
      },
      paymentStartDate:{//收款开始
        type: String,
        default: ''
      },
      paymentEndDate:{//收款结束
        type: String,
        default: ''
      },
    },
  },
  created(){
    
    this.searchForm = _.cloneDeep(this.searchForms)
    // this.searchForm.paymentDate = [];
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
    clearCustomerFilterMark(){
      this.customerChange()
      
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
      searchForm.orderNo='';
      this.id='';
      this.tableData=[];
      this.searchForm=searchForm;
      this.ordernoandcontractnoApi({entNumber:value})
      this.customerFilterMark = ''
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
