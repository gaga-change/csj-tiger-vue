<template lang="html">
   <div class="refund-form">
      <el-form  :model="searchForm"  ref="searchForm" label-width="70px" label-position="left">
        <el-row  class="elFormItem">
          <el-col :span="select?6:8" style="min-width:300px" v-if="searchForm.customerCode!==undefined">
             <el-form-item 
              label="客户名称"  
              label-width="80px" 
              prop="customerCode"
              :rules="useRules?[
               { required: true, message: '该项为必填'},
              ]:[]">
              <el-select v-model="searchForm.customerCode" 
              @change="customerChange"
              size="small"  filterable clearable placeholder="请选择客户名称" prefix-icon="el-icon-search">
              
              <el-option 
               value=""
               :disabled="true"
               v-if="customerInfo.length>0" >
                <span  class="codeNoStyle">企业编号</span>
                <span  class="codeNoStyle" style="width:260px">企业名称</span>
              </el-option>

              <el-option
                v-for="item in customerInfo"
                :key="item.entNumber"
                :label="item.entName"
                :value="item.entNumber">
                <span class="codeNoStyle" >{{ item.entNumber }}</span>
                <span class="codeNoStyle" style="width:260px">{{ item.entName }}</span>
              </el-option>
              </el-select>
            </el-form-item>
          </el-col>

           <el-col :span="6"  style="min-width:300px" v-if="searchForm.refundNo!==undefined">
            <el-form-item 
             label="客户退款号" 
             label-width="100px" >
              <el-input type="text" size="small"    placeholder="请输入客户退款号"    v-model.trim="searchForm.refundNo" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="min-width:300px"  v-if="searchForm.moneyState!==undefined">
            <el-form-item 
             label="款项性质" 
             label-width="80px"
             prop="moneyState"
             :rules="useRules?[
               { required: true, message: '该项为必填'},
             ]:[]">
              <el-select  size="small"    v-model="searchForm.moneyState"   placeholder="请选择款项性质">
                <el-option   v-for="item in mapConfig['getMoneyState']" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8"  style="min-width:300px"  v-if="searchForm.busiBillNo!==undefined&&this.$route.path.includes('refundAdd')">
             <el-form-item 
               label="来源单据"  
               label-width="80px" 
               prop="busiBillNo" 
               :rules="useRules?[
                { required: true, message: '该项为必填'},
               ]:[]">
              <el-select v-model="searchForm.busiBillNo" 
              @focus="busiBillNoFoucs"
              @change="busiBillNoChange"
              size="small"  filterable clearable placeholder="请选择来源单据" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in busiBillNoConfig"
                  :key="item.busiBillNo"
                  :label="item.busiBillNo"
                  :value="item.busiBillNo">
                </el-option>
              </el-select>
               <span class="card-text" v-if="searchForm.busiBillNo"  @click="()=>this.alertDisplay=true" >单据明细</span>
            </el-form-item>
          </el-col>

            <el-col :span="8"  style="min-width:300px" v-if="searchForm.sourceOrderNo!==undefined&&this.$route.path.includes('refundAdd')">
            <el-form-item 
              label="订单编号"  
              label-width="80px"
              prop="sourceOrderNo" 
              :rules="useRules?[
                { required: true, message: '该项为必填'},
               ]:[]">
              <el-input type="text" size="small" :disabled="useDisplay"    placeholder="请输入订单编号"    v-model.trim="searchForm.sourceOrderNo" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6"  style="min-width:300px" v-if="searchForm.sourceOrderNo!==undefined&&this.$route.path.includes('refundList')">
            <el-form-item 
              label="订单编号"  
              label-width="80px"
              prop="sourceOrderNo"  >
              <el-input type="text" size="small"    placeholder="请输入订单编号"    v-model.trim="searchForm.sourceOrderNo" ></el-input>
            </el-form-item>
          </el-col>

           <el-col :span="select?6:8"  style="min-width:300px" v-if="searchForm.contractNo!==undefined">
            <el-form-item 
             label="合同编号" 
             label-width="80px" 
             prop="contractNo" 
             :rules="useRules?[
               { required: true, message: '该项为必填'},
             ]:[]">
              <el-input type="text" size="small"  :disabled="useDisplay"   placeholder="请输入合同编号"    v-model.trim="searchForm.contractNo" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="select?6:8"  style="min-width:300px" v-if="searchForm.busiPlate!==undefined">
             <el-form-item 
               label="业务板块" 
               label-width="80px" 
               prop="busiPlate" 
               :rules="useRules?[
                { required: true, message: '该项为必填'},
               ]:[]">
              <el-select v-model="searchForm.busiPlate" 
              :disabled="useDisplay"
              size="small"  filterable clearable placeholder="请选择业务板块" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in busiPlateConfig"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="min-width:300px"  v-if="searchForm.refundReason!==undefined">
            <el-form-item 
               label="退款原因"  
               label-width="80px"
               prop="refundReason"
               :rules="useRules?[
                 { required: true, message: '该项为必填'},
               ]:[]">
              <el-select  size="small"    v-model="searchForm.refundReason"   placeholder="请选择退款原因">
                <el-option   v-for="item in mapConfig['getRefundReason']" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8"  style="min-width:300px" v-if="searchForm.applyRefundAmt!==undefined">
            <el-form-item 
             label="申请退款金额" 
             label-width="100px" 
             prop="applyRefundAmt" 
             :rules="useRules?[
                { required: true, validator: this.numberValidator.bind(this,'applyRefundAmt'), },
             ]:[]">
              <el-input type="text" size="small"   placeholder="请输入申请退款金额"    v-model.trim="searchForm.applyRefundAmt" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="select?6:8" style="min-width:300px"  v-if="searchForm.ownerCode!==undefined&&this.$route.path.includes('refundList')">
            <el-form-item label="货主"  >
              <el-select  size="small"    v-model="searchForm.ownerCode"   placeholder="请选择货主">
                <el-option   v-for="item in mapConfig['ownerInfoMap']" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="select?6:8" style="min-width:300px"  v-if="searchForm.refundStatus!==undefined">
            <el-form-item label="单据状态"  >
              <el-select  size="small"    v-model="searchForm.refundStatus"   placeholder="请选择单据状态">
                <el-option   v-for="item in mapConfig['getRefundStatus']" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="min-width:300px"  v-if="searchForm.payWay!==undefined">
            <el-form-item 
             label="退款方式" 
             prop="payWay"
            :rules="useRules?[
              { required: true, message: '该项为必填'},
             ]:[]">
              <el-select  size="small"    v-model="searchForm.payWay"   placeholder="请选择付款方式">
                <el-option   v-for="item in mapConfig['getPaymentMode']" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          
      
          <el-col :span="8"  style="min-width:300px" v-if="searchForm.bankCode!==undefined">
            <el-form-item label="客户银行账户" label-width="100px"  >
              <el-input type="text" size="small"     placeholder="请输入客户银行账户"    v-model.trim="searchForm.bankCode" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8"  style="min-width:300px" v-if="searchForm.bankName!==undefined">
            <el-form-item label="客户银行" label-width="90px"  >
              <el-input type="text" size="small"    placeholder="请输入客户银行"    v-model.trim="searchForm.bankName" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" v-if="searchForm.refundDate!==undefined">
            <el-form-item 
              label="退款日期"
              label-width="90px"
              style="width:300px"
              prop="refundDate"
               :rules="useRules?[
                { required: true, message: '该项为必填'},
               ]:[]">
              <el-date-picker
                v-model="searchForm.refundDate"
                type="date"
                size="mini"
                placeholder="选择日期">
              </el-date-picker>
              </el-form-item>
          </el-col>  

          <el-col :span="8"  style="min-width:300px" v-if="searchForm.realRefundAmt!==undefined">
            <el-form-item 
             label="实退金额" 
             label-width="90px"
             prop="realRefundAmt"
             :rules="useRules?[
                { required: true,validator: this.numberValidator.bind(this,'realRefundAmt'),},
             ]:[]">
              <el-input type="text" size="small"     placeholder="请输入实退金额"    v-model.trim="searchForm.realRefundAmt" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="min-width:300px" v-if="searchForm.files!==undefined" >
            <el-form-item label="上传附件" 
              label-width="70px" 
              style="width:300px" >
              <upload-mode
                @fileListChange="fileListChange" 
                :defailFileList="searchForm.files||[]" >
              </upload-mode>
            </el-form-item>
         </el-col>
      </el-row>  
    </el-form>

    <alert-detail 
    :alertDisplay="alertDisplay"
    :busiBillNo="searchForm.busiBillNo"
    @close="close"/>

  </div>
</template>

<script>
import { busiPlateConfig,MoneyStateEnum } from '@/utils/enum'
import { infoCustomerInfo} from '@/api/newoutputinvoice';
import { refundGetOrder } from '@/api/refund.js'
import { mapGetters } from 'vuex'
import AlertDetail from '../refund/alertDetail'
export default {
  components: { AlertDetail},
  data() {
    return {
      busiPlateConfig,
      MoneyStateEnum,

      busiBillNoConfig:[],
      customerInfo:[],
      
      applyRefundAmtMax:Infinity,

      alertDisplay:false
    }
  },

  props:{
     searchForm:{
       type:Object,
       default:()=>{}
     },
     select:{
       type:Boolean,
       default:false
     },
     useRules:{
       type:Boolean,
       default:false
     },
     useDisplay:{
       type:Boolean,
       default:false
     },
     useType:{//用途，新增时过滤仅退货来源订单
       type:String,
       default:'notAdd'
     }
  },
  
  computed: {
    ...mapGetters([
      'mapConfig',
  ])},

  mounted(){
     infoCustomerInfo().then(res=>{
       if(res.success){
          this.customerInfo=res.data;
       }
     }).catch(err=>{
       console.error(err)
     })
  },


  methods:{

    close(){
      this.alertDisplay=false;
    },

     numberValidator(prop,rule, value, callback){
      if (value ==='') {
         callback(new Error('该项为必填'));
      } else if(isNaN(value)){
        callback(new Error('请输入数字类型'));
      } else if(Number(value)<=0){
        callback(new Error('申请退款金额必须大于0'))
      } else{
        callback()
      }
     }, 

    customerChange(value){
      let json=this.customerInfo.find(v=>v.entNumber===value);
      this.$emit('propChange','customerChange',json||{})
    },

    busiBillNoChange(value){
      let json=this.busiBillNoConfig.find(v=>v.busiBillNo===value);
      this.$emit('propChange','busiBillNoChange',json||{})
    },
    
    busiBillNoFoucs(){
      if(!this.searchForm.customerCode){
        this.$message.error('请先选择客户');
        return ''
      }

      refundGetOrder({
        customerCode:this.searchForm.customerCode
      }).then(res=>{
        if(res.success){
          
          let busiBillNoConfig=res.data;
          if(this.useType=='add'){            
            busiBillNoConfig = busiBillNoConfig.filter(item=> item.refundType!=1)
          }
          this.busiBillNoConfig = [...busiBillNoConfig]
        }
      }).catch(err=>{
        console.error(err)
      })
    },

    fileListChange(list){
      this.$emit('fileListChange',list)
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

    resetForm(type){
      let data = _.cloneDeep(this.searchForm);
      let json={};
      for(let i in data){
        json[i]=''
      }
      this.$emit('submit',{...json},type)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .refund-form{
    &::before,&::after{
      clear: both; 
      content: '';
      display: block;
    };
     .el-form-item{
       height:30px;
       margin-bottom: 30px
     }

     .card-text{
        color: rgb(51, 153, 234);
        margin-left: 12px;
        cursor: pointer;
     }


  }

  .codeNoStyle{
    float: left; 
    color: #8492a6; 
    font-size: 12px;
    width:150px;
    &:last-child{
      float: right;
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
