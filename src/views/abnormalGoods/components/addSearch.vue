<template lang="html">
   <div class="entryInvoice-form">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button type="success"  size="small" :disabled="disabled"   @click="submit('save')" >保存</el-button>
         <el-button type="success"  size="small" :disabled="disabled" @click="submit('submit')">提交</el-button>
      </template>
    </sticky>
    <el-card class="simpleCard"  shadow="never"  body-style="padding:12px">
      <el-form  :model="searchForm"  ref="searchForm" label-width="70px" label-position="left">
         <el-col :span="6"  style="min-width:300px"  >
            <el-form-item 
             label="客户" 
             label-width="50px"
             prop="customerCode"
            :rules="[
              { required: true, message: '该项为必填'},
             ]">
              <el-select v-model="searchForm.customerCode"
               filterable
               clearable
               @change="customerCodeChange"
               placeholder="请选择客户名称"  >
              <el-option 
               value=""
               v-if="customerConfig.length"
               :disabled="true">
                <div class="providerList">
                  <span>企业编码</span>
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

          <el-col :span="6" style="min-width:300px">
            <el-form-item label="订单编号" 
             label-width="80px" 
             prop="outBillNo"
             :rules="[
                { required: true, message: '该项为必填'},
              ]">
               <el-select v-model="searchForm.outBillNo" 
               filterable
               @focus="outBillNoFocus"
               @change="outBillNoChange"
               clearable
               placeholder="选择销售订单">
              <el-option 
                value=""
                v-if="outBillNoConfig.length"
               :disabled="true">
                <div class="providerList">
                  <span>订单编号</span>
                  <span >合同编号</span>
                </div>
              </el-option>
              <el-option
                v-for="item in outBillNoConfig"
                :key="item.outBillNo"
                :label="item.outBillNo"
                :value="item.outBillNo">
                 <div class="providerList">
                   <span >{{ item.outBillNo }}</span>
                   <span >{{ item.outContractNo }}</span>
                 </div>
              </el-option>
            </el-select>
           
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:300px">
            <el-form-item 
            label="合同编号" 
            label-width="80px" 
             prop="outContractNo"
             :rules="[
              { required: true, message: '该项为必填'},
             ]">
              <el-input type="text" size="small"  :disabled="true"     v-model="searchForm.outContractNo" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:300px;margin-right:20px">
            <el-form-item 
            label="计划退回日期"
            label-width="100px"
            prop="planReturnDate"
            :rules="[
              { required: true, message: '该项为必填'},
             ]">
              <el-date-picker
                v-model="searchForm.planReturnDate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
            </el-form-item>
          </el-col>  

          <el-col :span="6" style="min-width:300px">
            <el-form-item label="退回地址" label-width="70px" >
                <el-input type="text" size="small"      placeholder="输入退回地址"    v-model="searchForm.returnAddress" ></el-input>
            </el-form-item>
          </el-col>   
          
           <el-col :span="6" style="min-width:300px">
            <el-form-item label="联系电话" label-width="80px"  >
               <el-input type="text" size="small"      placeholder="输入联系电话"    v-model="searchForm.linkTel" ></el-input>
            </el-form-item>
          </el-col>   

          <el-col :span="24">
            <el-form-item label="异常商品处理意见" label-width="110px"  >
              <el-radio-group v-model="searchForm.handleOpinion">
                <el-radio  
                  v-for="item in handleOpinionConfig"
                  :key="item.value"
                  :label="item.value">
                     {{item.name}}
                  </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

           <el-col :span="12">
             <el-form-item label="具体原因" label-width="70px" style="margin-right:16px;height:80px" >
              <el-input
                type="textarea"
                :rows="4"
                resize="none"
                placeholder="请输入具体原因"
                v-model="searchForm.rejectReason">
              </el-input>
             </el-form-item>
          </el-col>
        
        </el-row>  
    </el-form>
   </el-card>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import { infoCustomerInfo} from '@/api/invoicetigger/newoutputinvoice';  
import { queryOutBillInfoByCustCode} from '@/api/abnormalGoods/index';  
import { handleOpinionConfig } from '@/utils/enum'
export default {
  components: { Sticky },
  data() {
    return {
      customerConfig:[],
      outBillNoConfig:[],
      handleOpinionConfig,
      searchForm:{
        customerCode:'',//客户编码
        customerName:'',//客户名称
        outBillNo:'',//销售订单号
        outContractNo:'',//销售合同号
        planReturnDate:'',//计划退回日期
        returnAddress:'',//退回地址
        linkTel:'',//联系电话
        handleOpinion:'',//异常商品建议处理意见 
        rejectReason:'',//具体原因
      }
    }
  },
  
   props:{
     disabled:{
      type:Boolean,
      default:false
     }
  },

  mounted(){
    infoCustomerInfo().then(res=>{
      if(res.success){
        this.customerConfig=res.data||[];
      }
     }).catch(err=>{
      console.log(err)
     })
  },

  methods:{

    customerCodeChange(){
       this.searchForm.outBillNo='';
       this.searchForm.outContractNo='';
       this.$emit('propChange')
    },  

    outBillNoChange(value){
      this.searchForm.outContractNo=this.outBillNoConfig.find(v=>v.outBillNo===value)&&this.outBillNoConfig.find(v=>v.outBillNo===value).outContractNo;
      this.$emit('propChange')
    },

    outBillNoFocus(){
      if(this.searchForm.customerCode){
        this.searchForm.customerName=this.customerConfig.find(v=>this.searchForm.customerCode===v.entNumber)&&this.customerConfig.find(v=>this.searchForm.customerCode===v.entNumber).entName; 
        queryOutBillInfoByCustCode({
           custCode:this.searchForm.customerCode
        }).then(res=>{
           if(res.success){
             this.outBillNoConfig=res.data;
           }
        }).catch(err=>{
          console.log(err)
        })
      } else{
         this.$message.error('请先选择客户名称');
      }
    },

     submit(type){
       this.$refs['searchForm'].validate((valid) => {
          if (valid) {
             this.$emit('submit',this.searchForm,type)
          } else{
            return false;
          }
       })
    },
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
        &:nth-child(2){
          min-width: 100px;
        }
      }
    }

</style>
