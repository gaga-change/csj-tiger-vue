<template lang="html">
    <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
      <el-row>
          <el-col :span="12">
            <el-form-item label="地址性质" prop="地址性质" :rules="[{ required: true, message: '该项为必填'}]">
              <el-select  v-model="searchForm.地址性质" clearable  placeholder="请选择地址性质" size="small" class="formitem">
                 <el-option v-for="item in []" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>  
          
          <el-col :span="12">
            <el-form-item label="所在地区" prop="所在地区" :rules="[{ required: true, message: '该项为必填'}]" >
                <el-cascader :options="options" v-model="searchForm.所在地区" size="small"  ></el-cascader>
            </el-form-item>
          </el-col>  

          <el-col :span="12">
            <el-form-item label="详细地址" prop="详细地址" :rules="[{ required: true, message: '该项为必填'}]">
              <el-input v-model="searchForm.详细地址" placeholder="请输入详细地址" size="small" class="formitem"></el-input>
            </el-form-item>
          </el-col>  

          <el-col :span="12">
            <el-form-item label="联系人:" prop="联系人" :rules="[{ required: true, message: '该项为必填'}]">
              <el-input v-model="searchForm.联系人" placeholder="请输入联系人" size="small" class="formitem"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="联系电话:" prop="联系电话" :rules="[{ required: true, message: '该项为必填'}]">
              <el-input v-model="searchForm.联系电话" placeholder="请输入联系电话" size="small" class="formitem"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="邮政编码:">
              <el-input v-model="searchForm.邮政编码" placeholder="请输入邮政编码" size="small" class="formitem"></el-input>
            </el-form-item>
          </el-col>
    </el-row>
    
      <div class="btn_box">
        <el-button @click="submit" type="primary">保存</el-button>
        <el-button @click="$emit('handleClose')" >取消</el-button>
      </div>

    </el-form>
</template>

<script>
import { Area } from '@/utils/area.js'
export default {
  
  data(){
    return {
      options:Area
    }
  },

  props:{
     searchForm:{
       type:Object,
       default:()=>{}
     },
  },

  methods: {

     submit(){
       this.$refs['searchForm'].validate((valid) => {
          if (valid) {
             this.$emit('submit','addAddress',this.searchForm)
          }
       })
    },
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
  .btn_box{
    display: flex;
    justify-content: flex-end;
  }
  .el-form-item{
    height: 40px;
  }
</style>