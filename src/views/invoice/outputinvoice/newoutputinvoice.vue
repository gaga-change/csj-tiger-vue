<template lang="html">
<div class="app-container">
  <sticky :className="'sub-navbar published'" style="margin-bottom: 8px">
    <template v-if="fetchSuccess">
      <el-button v-loading="loading" style="margin-left: 10px;" size="small" type="success" @click="submitForm('searchForm')" >提交
      </el-button>
    </template>
    <template v-else>
      <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
    </template>
  </sticky>

    <el-card class="simpleCard" shadow="never" body-style="padding:12px">
      <el-form :model="searchForm" :rules="searchRules" ref="searchForm" label-width="70px" label-position="left">
      <el-row>
        <el-col :span="6">
          <el-form-item label="客户名称">
            <el-select v-model="searchForm.customer" :clearable="true"   filterable placeholder="请选择客户名称" @change="customerChange"  >
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
                :value="item.requestid">
                <span class="codeNoStyle" >{{ item.code }}</span>
                <span class="codeNoStyle" style="width:260px">{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
            <el-form-item label-width="70px" label="发票种类:" class="postInfo-container-item" >
              <el-select v-model="searchForm.invoicetype"  :clearable="true" 
              size="small" style='min-width:220px;' filterable clearable placeholder="请选择发票种类" prefix-icon="el-icon-search">
                <el-option v-for="item in invoicetype" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label-width="90px" label="最迟开票日期:"  class="postInfo-container-item"   >
            <el-date-picker size="small" v-model="searchForm.lastinvoicedate" type="date" format="yyyy-MM-dd" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label-width="70px" label="申请日期:" class="postInfo-container-item" >
            <el-date-picker size="small" v-model="searchForm.aplaydate" type="date" format="yyyy-MM-dd" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
         </el-row>
         <el-row>
        <el-col :span="6">
          <el-form-item label="订单编号" >
             <el-select v-model="searchForm.saleorder" :clearable="true"   filterable placeholder="请选择订单编号"   @change="saleorderChange" >
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

        <el-col :span="6">
          <el-form-item label="合同编号" >
            <el-input type="text" size="small" :disabled="true"  v-model="searchForm.ContractNumber" ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="含税发票金额" label-width="90px" >
            <el-input type="text" size="small"  :disabled="true" v-model="searchForm.ticketNo" ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="不含税发票金额" label-width="100px" >
            <el-input type="text" size="small"  :disabled="true" v-model="searchForm.noticketNo" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="税额" label-width="70px" >
            <el-input type="text" size="small"  :disabled="true" v-model="searchForm.ticket" ></el-input>
          </el-form-item>
        </el-col>

          <el-col :span="6">
            <el-form-item label-width="70px" label="发票性质:" class="postInfo-container-item" prop="invoicetype">
              <el-select v-model="searchForm.invoicetype" 
              size="small" style='min-width:220px;' filterable clearable placeholder="请选择发票种类" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in NatureInvoice"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
         </el-col>

         <el-col :span="6">
           <el-form-item label-width="0px">
            <el-button type="primary" size="small" >选择签收单下商品明细</el-button> </el-form-item>
         </el-col>

        </el-row>
      </el-form>
    </el-card>
</div>
</template>

<script>
import Sticky from '@/components/Sticky' 
import {  InvoiceType  as invoicetype ,NatureInvoice } from '@/utils'
import { getGys } from '@/api/planorder';
import { createOutputInvoice } from '@/api/invoice';
import _  from 'lodash';

export default {
  name: 'newoutputinvoice',
  components: { Sticky},
  data() {
    return {
      fetchSuccess:true,
      loading:false,
      searchForm:{
        customer:'',
        invoicetype:'',
        lastinvoicedate:'',
        aplaydate:'',
        saleorder:'',
        noticketNo:'',
        ContractNumber:'',
        ticket:''
      },
      searchRules: { 

      },
      invoicetype,
      NatureInvoice,
      customerConfig:[],
      codeConfig:[]
    }
  },
  mounted(){
     getGys().then(res=>{
       this.customerConfig=res.data
     }).catch(err=>{

     })
  },

  computed: {

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
      this.createOutputInvoiceApi({customer:value})
    },

    saleorderChange(value){
      let searchForm=_.cloneDeep(this.searchForm);
      searchForm.ContractNumber=this.codeConfig.find(v=>v.saleorder==value)&&this.codeConfig.find(v=>v.saleorder==value).contractno;
      this.searchForm=searchForm;
    },
    
    createOutputInvoiceApi(data){
       createOutputInvoice(data).then(res=>{
          this.codeConfig=res.data;
       }).catch(err=>{

       })
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
