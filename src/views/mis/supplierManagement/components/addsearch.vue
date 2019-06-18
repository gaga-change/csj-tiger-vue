<template lang="html">
    <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
      <el-row>
          <el-col :span="12">
            <el-form-item label="供应商名称:" prop="providerName" :rules="[{ required: true, message: '该项为必填'}, {type: 'string', max: 40, message:'长度最多40位'}]">
              <el-input v-model="searchForm.providerName" placeholder="请输入供应商名称" size="small" class="formitem"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="供应商等级">
              <el-select  v-model="searchForm.providerLevel" clearable  placeholder="请选择供应商等级" size="small" class="formitem">
                 <el-option v-for="item in mapConfig['getEnterpriseLevel']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>  

          <el-col :span="12">
            <el-form-item label="供应商状态" >
              <el-select  v-model="searchForm.providerState" clearable  placeholder="请选择供应商状态" size="small" class="formitem">
                 <el-option v-for="item in mapConfig['getEnterpriseState']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>  

          <el-col :span="12">
           <el-form-item label="联系电话:"  prop="providerLinkuserTel" :rules="[{ required:false, message:'请输入正确的联系方式',pattern:/^[1][3,4,5,7,8][0-9]{9}$|^0\d{2,3}-?\d{7,8}$/}]">
              <el-input v-model="searchForm.providerLinkuserTel"   placeholder="请输入联系电话" size="small" class="formitem"></el-input>
           </el-form-item>
         </el-col>

          <el-col :span="12">
            <el-form-item label="FAX:">
              <el-input v-model="searchForm.providerLinkFax" placeholder="请输入FAX" size="small" class="formitem"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="联系人:">
              <el-input v-model="searchForm.providerLinkUser" placeholder="请输入联系人" size="small" class="formitem"></el-input>
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
import { mapGetters } from 'vuex'
export default {

  props:{
     searchForm:{
       type:Object,
       default:()=>{}
     },
  },

  computed: {
    ...mapGetters([
      'mapConfig',
    ])
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