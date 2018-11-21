<template lang="html">
   <div class="entryInvoice-form">
  
    <el-card class="simpleCard"  shadow="never"  body-style="padding:12px">
      <el-form  :model="searchForm"  ref="searchForm" label-width="70px" label-position="left">
      
          <el-col :span="6">
            <el-form-item label="业务类型" >
              <el-input type="text" size="small"  @keyup.enter.native="submit"    placeholder="请输入业务类型"    v-model="searchForm.busiType" ></el-input>
            </el-form-item>
          </el-col>

           <el-col :span="6">
            <el-form-item label="业务子类型" label-width="80px" >
              <el-input type="text" size="small"   @keyup.enter.native="submit"  placeholder="请输入业务子类型"    v-model="searchForm.subType" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="业务唯一编码"  label-width="90px">
              <el-input type="text" size="small"  @keyup.enter.native="submit"  placeholder="请输入业务唯一编码"    v-model="searchForm.busiKey" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="成功标识" >
                <el-select v-model="searchForm.successFlag" 
                 @change="submit"
                size="small"  filterable clearable placeholder="请输入成功标识" prefix-icon="el-icon-search">
                  <el-option
                    v-for="item in successFlag"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
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
import { successFlag } from '@/utils/enum'
export default {
  data() {
    return {
      successFlag
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

    submit(){
       this.$refs['searchForm'].validate((valid) => {
          if (valid) {
             this.$emit('submit',this.searchForm)
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
        &:nth-child(2){
          min-width: 100px;
        }
      }
    }

</style>
