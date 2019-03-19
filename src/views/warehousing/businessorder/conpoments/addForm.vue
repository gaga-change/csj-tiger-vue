<template lang="html">
    <div class="addform">
        <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
          <el-row>
              <el-col>
                <el-form-item label="商品编码:" prop="商品编码" :rules="[{ required: true, message: '该项为必填'}]" >
                  <el-select  v-model="searchForm.商品编码" clearable  placeholder="请选择商品编码" size="small" class="formitem">
                    <el-option v-for="item in []" :label="item.value" :key="item.key"  :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>  

              <el-col>
                 <el-form-item label="商品名称:" prop="商品名称" :rules="[{ required: true, message: '该项为必填'}]">
                    <el-input v-model="searchForm.商品名称" placeholder="请输入商品名称" size="small" class="formitem"></el-input>
                 </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="数量:" prop="数量" :rules="[{ required: true, message: '该项为必填'}]">
                  <el-input v-model="searchForm.数量" placeholder="请输入数量" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="供应商名称:" prop="供应商名称" :rules="[{ required: true, message: '该项为必填'}]">
                  <el-input v-model="searchForm.供应商名称" placeholder="请输入供应商名称" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="订货进价:" prop="订货进价" :rules="[{ required: true, message: '该项为必填'}]">
                  <el-input v-model="searchForm.订货进价" placeholder="请输入订货进价" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="入库仓库:" prop="出库仓库" :rules="[{ required: true, message: '该项为必填'}]" >
                  <el-select  v-model="searchForm.出库仓库" clearable  placeholder="请选择出库仓库" size="small" class="formitem">
                    <el-option v-for="item in []" :label="item.value" :key="item.key"  :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col> 
          </el-row>
        </el-form>

        <div class="btnBox">
          <el-button @click="$emit('handleClose')">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </div> 
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
             this.$emit('submit','addCommodity',this.searchForm)
          }
       })
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
  .addform{
    .btnBox{
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
