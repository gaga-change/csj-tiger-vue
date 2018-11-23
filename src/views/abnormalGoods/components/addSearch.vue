<template lang="html">
   <div class="entryInvoice-form">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button type="success"  size="small" @click="submit('save')" >保存</el-button>
         <el-button type="success"  size="small" @click="submit('submit')">提交</el-button>
      </template>
    </sticky>
    <el-card class="simpleCard"  shadow="never"  body-style="padding:12px">
      <el-form  :model="searchForm"  ref="searchForm" label-width="70px" label-position="left">
      
          <el-col :span="6">
            <el-form-item label="客户" label-width="40px" style="width:260px" >
              <el-input type="text" size="small"      placeholder="请选择客户"    v-model="searchForm.客户" ></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="6">
            <el-form-item label="订单编号"  label-width="80px" style="width:300px">
              <el-input type="text" size="small"    placeholder="选择销售订单"    v-model="searchForm.busiBillNo" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="合同编号" label-width="80px" style="width:300px" >
              <el-input type="text" size="small"  :disabled="true"     v-model="searchForm.contractNo" ></el-input>
            </el-form-item>
          </el-col>

         
          <el-col :span="6">
            <el-form-item label="计划退回日期" label-width="100px" style="width:300px" >
              <el-date-picker
                v-model="searchForm.计划退回日期"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
            </el-form-item>
          </el-col>  

          <el-col :span="6">
            <el-form-item label="退回地址" label-width="70px" style="width:300px" >
                <el-input type="text" size="small"      placeholder="输入退回地址"    v-model="searchForm.退回地址" ></el-input>
            </el-form-item>
          </el-col>   
          
           <el-col :span="6">
            <el-form-item label="联系电话" label-width="80px" style="width:300px" >
               <el-input type="text" size="small"      placeholder="输入联系电话"    v-model="searchForm.联系电话" ></el-input>
            </el-form-item>
          </el-col>   

          <el-col :span="24">
            <el-form-item label="异常商品处理意见" label-width="110px"  >
              <el-radio-group v-model="searchForm.resource">
                <el-radio :label="0">客户已拒收 ，建议退回供应商</el-radio>
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
                v-model="searchForm.具体原因">
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
export default {
  components: { Sticky },
  data() {
    return {
 
    }
  },

  props:{
     searchForm:{
       type:Object,
       default:()=>{}
     },
  },
  
  mounted(){

  },

  methods:{

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
