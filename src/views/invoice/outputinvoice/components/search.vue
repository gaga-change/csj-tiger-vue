<template lang="html">
    <el-card class="simpleCard" shadow="never" body-style="padding:12px">
      <el-form :model="searchForm" :rules="searchRules" ref="searchForm" label-width="70px" label-position="left">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="客户名称">
            <el-select v-model="searchForm.cusName" :clearable="true"   filterable placeholder="请选择客户名称" @change="customerChange"  >
              <el-option 
                value=""
               :disabled="true"
               v-if="customerConfig.length>0" >
                <span  class="codeNoStyle">企业编号</span>
                <span  class="codeNoStyle" style="width:260px">企业名称</span>
              </el-option>

              <el-option
                v-for="item in customerConfig"
                :key="item.id"
                :label="item.name"
                :value="item.name">
                <span class="codeNoStyle" >{{ item.code }}</span>
                <span class="codeNoStyle" style="width:260px">{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="合同编号" >
            <el-input type="text" size="small" :disabled="true"  v-model="searchForm.contractNo" ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" v-if="searchForm.searchItem=='apply'">
          <el-form-item label-width="120px" label="发票最迟开票日期:"  class="postInfo-container-item">
            <el-date-picker size="small" v-model="searchForm.applyLastAllowTime" type="date" format="yyyy-MM-dd" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-else>
          <el-form-item label="发票号码" >
            <el-input type="text" size="small"  v-model="searchForm.invoiceCode" ></el-input>
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
      
      </el-row>
      <el-row :gutter="10">  
        <el-col :span="6">
          <el-form-item label="订单编号" >
             <el-select v-model="searchForm.outBusiBillNo" :clearable="true"   filterable placeholder="请选择订单编号"   @change="saleorderChange" @focus="checkCustom" >
              <el-option 
                value=""
                :disabled="true" 
                v-if="codeConfig.length>0" >
                <span  class="codeNoStyle">销售订单号</span>
                <span  class="codeNoStyle">销售合同号</span>
                <span  class="codeNoStyle" >物料名称</span>
              </el-option>
              <el-option
                v-for="item in codeConfig"
                :key="item.saleorder"
                :label="item.saleorder"
                :value="item.saleorder">
                <span class="codeNoStyle">{{ item.saleorder }}</span>
                <span class="codeNoStyle">{{ item.contractno }}</span>
                <span class="codeNoStyle">{{ item.materialname}}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="6" v-if="searchForm.searchItem=='apply'">
          <el-form-item label="开票申请单号" label-width="90px">
            <el-input type="text" size="small" :disabled="true"  v-model="searchForm.applyCode" ></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="6" v-if="searchForm.searchItem=='register'">
          <el-form-item label="开票单号" >
            <el-input type="text" size="small" :disabled="true"  v-model="searchForm.invoiceNo" ></el-input>
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
        <el-col :span="6">
          <el-form-item label="单据状态">
            <el-select v-model="searchForm.ticketStatusEnum" :clearable="true"   filterable placeholder="请选择单据状态">
              <el-option
                v-for="item in TicketStatus"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="searchForm.searchItem=='register'">
        <el-row :gutter="10">
         <!-- <el-col :span="6">
          <el-form-item label="业务板块">
            <el-select v-model="searchForm.ticketStatusEnum" :clearable="true"   filterable placeholder="请选择业务板块">
              <el-option
                v-for="item in statusConfig"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
         <el-col :span="9">
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
          <el-col :span="9">
            <el-form-item label-width="120px" label="发票开具日期:"  class="postInfo-container-item">
              <el-date-picker size="small" v-model="searchForm.invoiceIssueTimeRange" 
               format="yyyy-MM-dd" 
               default-value="new Date('201-01-01')"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
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
import { NatureInvoice, NatureInvoiceEnum, InvoiceStatus, TicketStatus, InvoiceType  as invoicetype } from '@/utils/enum'
import { getGys } from '@/api/planorder';
import { createOutputInvoice } from '@/api/invoice';
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
      TicketStatus,
      customerConfig:[],
      codeConfig:[],
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
      }
    },
  },
  created(){
    
    this.searchForm = _.cloneDeep(this.searchForms)
     getGys().then(res=>{
       this.customerConfig=res.data
     }).catch(err=>{

     })
  },

  computed: {
  
  },
  
  methods:{
    
    customerChange(value){
      this.createOutputInvoiceApi({customer:value})
    },
    checkCustom(e){    
      if(!this.searchForm.cusName){
        this.$message({type:'error',message:'请先选择客户',duration:2000})
      }
    },
    saleorderChange(value){//订单编号
      let searchForm=_.cloneDeep(this.searchForm);
      searchForm.ContractNumber=this.codeConfig.find(v=>v.saleorder==value)&&this.codeConfig.find(v=>v.saleorder==value).contractno;//合同编号
      this.searchForm=searchForm;
    },
    
    createOutputInvoiceApi(data){
       createOutputInvoice(data).then(res=>{
          this.codeConfig=res.data;
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
      this.$emit('resetSearch',this.submitForm)
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
