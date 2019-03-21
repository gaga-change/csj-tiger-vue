<template lang="html">
    <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
      <el-row>
          <el-col :span="12">
            <el-form-item label="客户名称:" :rules="[{ required: true, message: '该项为必填'}]">
              <el-input v-model="searchForm.客户名称" placeholder="请输入客户名称" size="small" class="formitem"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="客户等级" >
              <el-select  v-model="searchForm.客户等级" clearable  placeholder="请选择客户等级" size="small" class="formitem">
                 <el-option v-for="item in []" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>  

          <el-col :span="12">
            <el-form-item label="客户状态" >
              <el-select  v-model="searchForm.客户状态" clearable  placeholder="请选择客户状态" size="small" class="formitem">
                 <el-option v-for="item in []" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>  

          <el-col :span="12">
            <el-form-item label="联系电话:">
              <el-input v-model="searchForm.联系电话" placeholder="请输入联系电话" size="small" class="formitem"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="FAX:">
              <el-input v-model="searchForm.FAX" placeholder="请输入FAX" size="small" class="formitem"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="联系人:">
              <el-input v-model="searchForm.联系人" placeholder="请输入联系人" size="small" class="formitem"></el-input>
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
export default {

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
             this.$emit('submit','add',this.searchForm)
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
</style>