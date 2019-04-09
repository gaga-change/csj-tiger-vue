<template lang="html">
  <el-card shadow="hover">
    <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
      <el-row>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="调整类型" >
              <el-select  v-model="searchForm.improveReason" clearable  placeholder="请选择调整类型：" size="small" class="formitem">
                 <el-option v-for="item in ['录入错误','客户业务单信息变动']" :label="item" :key="item"  :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>  

          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="业务单号:">
              <el-input v-model="searchForm.billNo" placeholder="请输入业务单号" size="small" class="formitem"></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="调整人:">
              <el-input v-model="searchForm.createrName" placeholder="请输入调整人" size="small" class="formitem"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
             <el-form-item label="调整日期" >
                 <el-date-picker
                    v-model="searchForm.time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                 </el-date-picker>
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
