<template lang="html">
  <el-card shadow="hover">
    <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
      <el-row>
          <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="'业务单号' in searchForm">
            <el-form-item label="业务单号:">
              <el-input v-model="searchForm.业务单号" placeholder="请输入业务单号" size="small" class="formitem"></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="'订正类型' in searchForm">
            <el-form-item label="订正类型" >
              <el-select  v-model="searchForm.订正类型" clearable  placeholder="请选择订正类型：" size="small" class="formitem">
                 <el-option v-for="item in []" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col> 

          <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="'货主' in searchForm">
            <el-form-item label="货主:">
              <el-input v-model="searchForm.货主" placeholder="请输入货主" size="small" class="formitem"></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="'单据状态' in searchForm">
            <el-form-item label="单据状态" >
              <el-select  v-model="searchForm.单据状态" clearable  placeholder="请选择单据状态：" size="small" class="formitem">
                 <el-option v-for="item in []" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="'time' in searchForm">
              <el-form-item label="订正日期" prop="time">
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
