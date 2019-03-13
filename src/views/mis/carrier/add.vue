<template lang="html">
  <div class="addCarrier">
    <el-card shadow="hover">
      <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
        <el-row>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="承运商名称:"  prop="承运商名称"  :rules="[{ required: true, message: '该项为必填'}]" >
                <el-input v-model="searchForm.承运商名称" placeholder="请输入承运商名称" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="承运商状态" >
                <el-select  v-model="searchForm.承运商状态" clearable  placeholder="请选择承运商状态：" size="small" class="formitem">
                  <el-option v-for="item in []" :label="item.value" :key="item.key"  :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>  

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="结算区分" >
                <el-select  v-model="searchForm.结算区分" clearable  placeholder="请选择承结算区分：" size="small" class="formitem">
                  <el-option v-for="item in []" :label="item.value" :key="item.key"  :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>  

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="联系电话:"  prop="联系电话"  :rules="[{ required: false, message:'请输入正确格式的手机号',pattern:/^1[34578]\d{9}$/ }]" >
                <el-input v-model="searchForm.联系电话" placeholder="请输入联系电话" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="联系人:">
                <el-input v-model="searchForm.联系人" placeholder="请输入联系人" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
               <el-form-item label="合作起始日期"  label-width="100px">
                  <el-date-picker v-model="searchForm.合作起始日期" type="date" placeholder="选择日期"></el-date-picker>
               </el-form-item>
            </el-col>

             <el-col :sm="12" :md="8" :lg="8" :xl="6">
               <el-form-item label="合同起始日期"  label-width="100px">
                  <el-date-picker v-model="searchForm.合同起始日期" type="date" placeholder="选择日期"></el-date-picker>
               </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
               <el-form-item label="合同结束日期"  label-width="100px">
                  <el-date-picker v-model="searchForm.合同结束日期" type="date" placeholder="选择日期"></el-date-picker>
               </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
               <el-form-item label="支付约定"  label-width="100px">
                   <el-input type="textarea" :rows="2" placeholder="请输入支付约定内容" v-model="searchForm.支付约定"></el-input>
               </el-form-item>
            </el-col>

      </el-row>
      </el-form>
    </el-card>

    <div class="operationitem">
       <el-button @click="submit('save')" type="primary">保存</el-button>
       <el-button @click="submit('submit')" type="primary">提交</el-button>
    </div>

  </div>
</template>

<script>
export default {

  data(){
    return {
      searchForm:{

      }
    }
  },

  methods: {

     submit(type){
       this.$refs['searchForm'].validate((valid) => {
          if (valid) {
            console.log(type,this.searchForm)
          }
       })
    },

  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
  .addCarrier{
    width: 1200px;
    .operationitem{
      display: flex;
      justify-content: flex-end;
      margin: 16px 0;
    }
  }

</style>
