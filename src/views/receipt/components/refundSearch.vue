<template lang="html">
   <div class="entryInvoice-form">
      <el-form  :model="searchForm"  ref="searchForm" label-width="70px" label-position="left">
        <el-row  class="elFormItem">
          <el-col :span="select?6:8" style="min-width:300px" v-if="searchForm.客户名称!==undefined">
            <el-form-item 
              label="客户名称" 
              label-width="80px" 
              prop="客户名称"
              :rules="useRules?[
               { required: true, message: '该项为必填'},
              ]:[]">
              <el-input type="text" size="small"  @keyup.enter.native="submit"    placeholder="请输入客户名称"    v-model="searchForm.客户名称" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8"  style="min-width:300px"  v-if="searchForm.退款原因!==undefined">
             <el-form-item 
              label="退款原因"  
              label-width="80px" 
              prop="退款原因"
              :rules="useRules?[
               { required: true, message: '该项为必填'},
              ]:[]">
              <el-select v-model="searchForm.退款原因" 
              size="small"  filterable clearable placeholder="请选择款项性质" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in []"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

           <el-col :span="8"  style="min-width:300px"  v-if="searchForm.款项性质!==undefined">
             <el-form-item 
              label="款项性质"  
              label-width="80px"  
              prop="款项性质"
              :rules="useRules?[
               { required: true, message: '该项为必填'},
              ]:[]">
              <el-select v-model="searchForm.款项性质" 
              size="small"  filterable clearable placeholder="请选择款项性质" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in []"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8"  style="min-width:300px"  v-if="searchForm.来源数据!==undefined">
             <el-form-item 
               label="来源数据"  
               label-width="80px" 
               prop="来源数据" 
               :rules="useRules?[
                { required: true, message: '该项为必填'},
               ]:[]">
              <el-select v-model="searchForm.来源数据" 
              size="small"  filterable clearable placeholder="请选择来源数据" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in []"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="select?6:8"  style="min-width:300px" v-if="searchForm.订单编号!==undefined">
            <el-form-item 
              label="订单编号"  
              label-width="80px"
              prop="订单编号" 
              :rules="useRules?[
                { required: true, message: '该项为必填'},
               ]:[]">
              <el-input type="text" size="small" :disabled="useDisplay"  @keyup.enter.native="submit"  placeholder="请输入订单编号"    v-model="searchForm.订单编号" ></el-input>
            </el-form-item>
          </el-col>

           <el-col :span="select?6:8"  style="min-width:300px" v-if="searchForm.合同编号!==undefined">
            <el-form-item 
             label="合同编号" 
             label-width="80px" 
             prop="合同编号" 
             :rules="useRules?[
               { required: true, message: '该项为必填'},
             ]:[]">
              <el-input type="text" size="small"  :disabled="useDisplay"  @keyup.enter.native="submit"  placeholder="请输入合同编号"    v-model="searchForm.合同编号" ></el-input>
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

          <el-col :span="8"  style="min-width:300px" v-if="searchForm.申请退款金额!==undefined">
            <el-form-item 
             label="申请退款金额" 
             label-width="100px" 
             prop="申请退款金额" 
             :rules="useRules?[
                { required: true, message: '该项为必填'},
             ]:[]">
              <el-input type="text" size="small"   @keyup.enter.native="submit"  placeholder="请输入申请退款金额"    v-model.number="searchForm.申请退款金额" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="select?6:8" style="min-width:300px"  v-if="searchForm.ownerCode!==undefined">
            <el-form-item label="货主"  >
              <el-select  size="small"    v-model="searchForm.ownerCode"   placeholder="请选择货主">
                <el-option   v-for="item in mapConfig['ownerInfoMap']" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          
            <el-col :span="select?6:8"  style="min-width:300px"  v-if="searchForm.单据状态!==undefined">
             <el-form-item label="单据状态"  label-width="80px"  >
              <el-select v-model="searchForm.单据状态" 
              size="small"  filterable clearable placeholder="请选择单据状态" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in []"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

            <el-col :span="8"  style="min-width:300px"  v-if="searchForm.付款方式!==undefined"> 
             <el-form-item
              label="付款方式" 
              label-width="90px" 
              prop="付款方式"
              :rules="useRules?[
                { required: true, message: '该项为必填'},
               ]:[]">
              <el-select v-model="searchForm.付款方式" 
              size="small"  filterable clearable placeholder="请选择付款方式" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in []"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        
          <el-col :span="8"  style="min-width:300px" v-if="searchForm.客户银行账户!==undefined">
            <el-form-item label="客户银行账户" label-width="100px"  >
              <el-input type="text" size="small"   @keyup.enter.native="submit"  placeholder="请输入客户银行账户"    v-model="searchForm.客户银行账户" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8"  style="min-width:300px" v-if="searchForm.客户银行!==undefined">
            <el-form-item label="客户银行" label-width="90px"  >
              <el-input type="text" size="small"   @keyup.enter.native="submit"  placeholder="请输入客户银行"    v-model="searchForm.客户银行" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" v-if="searchForm.退款日期!==undefined">
            <el-form-item 
              label="退款日期"
              label-width="90px"
              style="width:300px"
              prop="退款日期"
               :rules="useRules?[
                { required: true, message: '该项为必填'},
               ]:[]">
              <el-date-picker
                v-model="searchForm.退款日期"
                type="date"
                size="mini"
                placeholder="选择日期">
              </el-date-picker>
              </el-form-item>
          </el-col>  

          <el-col :span="8"  style="min-width:300px" v-if="searchForm.实退金额!==undefined">
            <el-form-item 
             label="实退金额" 
             label-width="90px"
             prop="实退金额"
             :rules="useRules?[
                { required: true, message: '该项为必填'},
             ]:[]">
              <el-input type="text" size="small"   @keyup.enter.native="submit"  placeholder="请输入合同编号"    v-model.number="searchForm.实退金额" ></el-input>
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
  </div>
</template>

<script>
import { busiPlateConfig,MoneyStateEnum } from '@/utils/enum'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      busiPlateConfig,
      MoneyStateEnum,
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
  },
  
  computed: {
    ...mapGetters([
      'mapConfig',
  ])},


  methods:{
     
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
  .entryInvoice-form{
    &::before,&::after{
      clear: both; 
      content: '';
      display: block;
    };
     .el-form-item{
       height:30px;
       margin-bottom: 30px
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
