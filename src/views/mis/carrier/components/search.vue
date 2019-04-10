<template lang="html">
  <el-card shadow="hover">
    <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
      <el-row>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="承运商编码:">
              <el-input v-model="searchForm.consoildatorCode" placeholder="请输入承运商编码" size="small" class="formitem"></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="承运商名称:">
              <el-input v-model="searchForm.consoildatorName" placeholder="请输入承运商名称" size="small" class="formitem"></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="承运商状态" >
              <el-select  v-model="searchForm.consoildatorState" clearable  placeholder="请选择承运商状态：" size="small" class="formitem">
                 <el-option v-for="item in mapConfig['getConsoildatorState']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>  
    </el-row>

      <el-row>
        <el-button @click="submit" type="primary">查询</el-button>
        <el-button @click="resetForm" >重置</el-button>
      </el-row>

    </el-form>
  </el-card>
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
             this.$emit('submit',this.searchForm)
          }
       })
    },

    resetForm(){
      let json={};
      for(let i in this.searchForm){
         if(Array.isArray(this.searchForm[i])){
           json[i]=[]
         } else{
           json[i]=''
         }
      }
      this.$emit('submit',{...json, pageSize:10,pageNum:1})
    }

  }
}

</script>

<style lang="css">
</style>
