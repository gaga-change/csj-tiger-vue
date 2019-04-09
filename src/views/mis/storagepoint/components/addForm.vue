<template lang="html">
    <div class="addform">
        <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
          <el-row>
              <el-col>
                <el-form-item label="区域中心:" prop="regionalCenter" :rules="[{ required: true, message: '该项为必填'}]" >
                  <el-select  v-model="searchForm.regionalCenter" clearable  placeholder="请选择区域中心" size="small" class="formitem">
                    <el-option v-for="item in mapConfig['getRegional']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>  

              <el-col>
                <el-form-item label="仓配点名称:" prop="warehouseName" :rules="[{ required: true, message: '该项为必填'}]">
                  <el-input v-model="searchForm.warehouseName" placeholder="请输入仓配点名称" size="small" class="formitem"></el-input>
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
