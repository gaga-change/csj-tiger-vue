<template lang="html">
   <div class="entryInvoice-form">
    <sticky  v-if="!isDisplaySubmit"  :className="'sub-navbar published'" style="margin-bottom: 8px">
        <template >
          <el-button   style="margin-left: 10px;"  size="small"  @click="submit('save')">保存
          </el-button>
          <el-button   style="margin-left: 10px;"   size="small"  type="success"  @click="submit('submit')">保存并提交
          </el-button>
        </template> 
    </sticky>

    <el-card class="simpleCard"  shadow="never"  body-style="padding:12px">
      <el-form   :model="searchForm"  ref="searchForm" label-width="70px" label-position="left">
        <el-row :gutter="6"
          <el-col :span="6" v-if="searchForm.providerCode!==undefined">
            <el-form-item 
            label="供应商名称" 
            label-width="90px"
            prop="providerCode"
            :rules="isDisplaySubmit?[]:[
              { required: true, message: '该项为必填'},
            ]">
              <el-select v-model="searchForm.providerCode"
               filterable
               placeholder="请选择供应商名称" @change="customerChange" >
              <el-option 
               value=""
               :disabled="true">
                <div class="providerList">
                  <span>企业编号</span>
                  <span >企业名称</span>
                </div>
              </el-option>
              <el-option
                v-for="item in customerConfig"
                :key="item.entNumber"
                :label="item.entName"
                :value="item.entNumber">
                 <div class="providerList">
                   <span >{{ item.entNumber }}</span>
                   <span >{{ item.entName }}</span>
                 </div>
              </el-option>
            </el-select>
           
            </el-form-item>
          </el-col>

          <el-col :span="6" v-if="searchForm.busiBillNo!==undefined">
            <el-form-item 
             label="订单编号" 
             label-width="80px"
             prop="busiBillNo"
             :rules="isDisplaySubmit?[]:[
              { required: true, message: '该项为必填'},
             ]">

            <el-select v-model="searchForm.busiBillNo"
               filterable
               placeholder="请选择订单" @change="busiBillNoChange" >
              <el-option 
                value=""
               :disabled="true">
                <div class="providerList">
                  <span>订单编号</span>
                  <span >合同编号</span>
                </div>
              </el-option>
              <el-option
                v-for="item in orderNoConfig"
                :key="item.saleorder"
                :label="item.busiBillNo"
                :value="item.busiBillNo">
                 <div class="providerList">
                   <span >{{ item.busiBillNo }}</span>
                   <span >{{ item.contractNo }}</span>
                 </div>
              </el-option>
            </el-select>

            </el-form-item>
          </el-col>

          <el-col :span="6" v-if="searchForm.invoiceType!==undefined">
            <el-form-item 
            label="发票种类" 
            label-width="80px"
             prop="invoiceType"
            :rules="isDisplaySubmit?[]:[
              { required: true, message: '该项为必填'},
            ]">
                <el-select v-model="searchForm.invoiceType" 
              size="small"  filterable clearable placeholder="请选择发票状态" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in InvoiceType"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" v-if="searchForm.contractNo!==undefined">
            <el-form-item label="合同编号" >
              <el-input type="text" size="small" placeholder="请选择合同编号"    v-model="searchForm.contractNo" ></el-input>
            </el-form-item>
          </el-col>

           <el-col :span="6" v-if="searchForm.invoiceNo!==undefined">
            <el-form-item 
            label="发票号码" 
             prop="invoiceNo"
            :rules="isDisplaySubmit?[]:[
              { required: true, message: '该项为必填'},
            ]">
              <el-input type="text" size="small"  placeholder="请输入发票号码"   v-model="searchForm.invoiceNo" ></el-input>
            </el-form-item>
          </el-col>

           <el-col :span="6" v-if="searchForm.invoiceAmt!==undefined">
            <el-form-item  
            label-width="100px" 
            label="实际开票金额" 
             prop="invoiceAmt"
            :rules="isDisplaySubmit?[]:[
              { required: true, message: '该项为必填'},
            ]">
              <el-input type="text" size="small"  v-model="searchForm.invoiceAmt" ></el-input>
            </el-form-item>
          </el-col>

            <el-col :span="6" v-if="searchForm.invoiceTaxAmt!==undefined">
            <el-form-item 
            label="税额" 
             prop="invoiceTaxAmt"
            :rules="isDisplaySubmit?[]:[
              { required: true, message: '该项为必填'},
            ]">
              <el-input type="text" size="small"  v-model="searchForm.invoiceTaxAmt" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" v-if="searchForm.invoiceTaxAmt!==undefined&&searchForm.invoiceAmt!==undefined">
            <el-form-item  label-width="90px" label="不含税金额" >
             <span > {{ Number(searchForm.invoiceAmt-searchForm.invoiceTaxAmt).toFixed(2) }} </span>
            </el-form-item>
          </el-col>

           <el-col :span="6" v-if="searchForm.makeDate!==undefined">
            <el-form-item 
            label-width="100px" 
            label="发票开具日期:"
             prop="makeDate"
            :rules="isDisplaySubmit?[]:[
              { required: true, message: '该项为必填'},
            ]">
              <el-date-picker size="small" v-model="searchForm.makeDate"  placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

            <el-col :span="6" v-if="searchForm.arriveDate!==undefined">
            <el-form-item 
            label-width="80px" 
            label="到票日期:" 
            prop="arriveDate"
            :rules="isDisplaySubmit?[]:[
              { required: true, message: '该项为必填'},
            ]">
              <el-date-picker size="small" v-model="searchForm.arriveDate"  placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

           <el-col :span="6" v-if="searchForm.invoiceStatus!==undefined">
            <el-form-item label="发票状态" >
               <el-select v-model="searchForm.invoiceStatus" 
              size="small"  filterable clearable placeholder="请选择发票状态" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in InvoiceStatus"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

    
          <el-col :span="6"  v-if="searchForm.ticketStatus!==undefined">
            <el-form-item label="单据状态" >
              <el-select v-model="searchForm.ticketStatus" 
              size="small"  filterable clearable placeholder="请选择单据状态" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in entryInvoiceTicketStatus"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

           <el-col :span="6" v-if="searchForm.invoiceNature!==undefined">
            <el-form-item
            label="发票性质"
            prop="invoiceNature"
            :rules="isDisplaySubmit?[]:[
              { required: true, message: '该项为必填'},
            ]">
                 <el-select v-model="searchForm.invoiceNature" 
              size="small"  filterable clearable placeholder="请选择发票性质" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in NatureInvoice"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>

            </el-form-item>
          </el-col>

           <el-col :span="6"  v-if="searchForm.oldInvoiceId!==undefined&&searchForm.invoiceNature===2">
            <el-form-item 
            label="蓝字发票"
            prop="oldInvoiceId"
            :rules="!isDisplaySubmit&&searchForm.invoiceNature===2?[
              { required: true, message: '该项为必填'},
            ]:[]">
              <el-input type="text" size="small"   v-model="searchForm.oldInvoiceId" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24" v-if="isDisplaySubmit">
            <el-form-item label-width="0">
              <el-button type="primary"  size="small"  @click="submit">查询</el-button>
              <el-button type="primary"  size="small" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>

        </el-row>  
    </el-form>
   </el-card>
  </div>
</template>

<script>
import _  from 'lodash';
import { InvoiceStatus,entryInvoiceTicketStatus,NatureInvoice,InvoiceType } from '@/utils/enum'
import Sticky from '@/components/Sticky' 
import { infoCustomerInfo,ordernoandcontractno} from '@/api/invoicetigger/newoutputinvoice'
export default {
  components: { Sticky},
  data() {
    return {
     InvoiceStatus,
     entryInvoiceTicketStatus,
     NatureInvoice,
     InvoiceType,

     customerConfig:[],//供应商下拉配置
     orderNoConfig:[],//订单编号下拉配置
     addFrom:{

     }
    }
  },
  props:{
     searchForm:{
       type:Object,
       default:()=>{}
     },
     isDisplaySubmit:{
       type:Boolean,
       default:true
     }
  },


  mounted(){
    if(this.searchForm.providerCode!==undefined){
       this.getInfoCustomerInfo()
    }
  },
          
  methods:{
    busiBillNoChange(value){
      this.addFrom.contractNo=this.orderNoConfig.find(v=>v.busiBillNo==value)&&this.orderNoConfig.find(v=>v.busiBillNo==value).contractNo;
      this.$emit('busiBillNoChange',value,this.addFrom.contractNo)
    },

    customerChange(value){
      this.addFrom.providerName=this.customerConfig.find(v=>v.entNumber==value)&&this.customerConfig.find(v=>v.entNumber==value).entName;
      this.getOrdernoandcontractno({entNumber:value});
    },

    getInfoCustomerInfo(){
      infoCustomerInfo().then(res=>{
        if(res.success){
          this.customerConfig=res.data;
        }
      }).catch(err=>{

      })
    },

    getOrdernoandcontractno(data){
      ordernoandcontractno(data).then(res=>{
        if(res.success){
          this.orderNoConfig=res.data;
        }
      }).catch(err=>{

      })
    },

    submit(type){
       this.$refs['searchForm'].validate((valid) => {
          if (valid) {
            if(type){
              this.$emit('submit',type,this.addFrom)
            } else{
              this.$emit('submit')
            }
            
          } else{
            return false;
          }
       })
    },
    resetForm(){
      this.$emit('reset')
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .entryInvoice-form{
     .el-form-item{
       height:30px;
       margin-bottom: 36px
     }
  }
    .providerList{
      display: flex;
      justify-content: space-between;
      >span{
        &:first-child{
          min-width: 150px;
        }
      }
    }

</style>
