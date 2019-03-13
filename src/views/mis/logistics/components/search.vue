<template lang="html">
  <el-card shadow="hover">
    <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="承运商：" prop="warehouseCode">
            <el-select  v-model="searchForm.warehouseCode" clearable  placeholder="请选择承运商" size="small" class="formitem">
              <el-option v-for="item in mapConfig['getWarehouse']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="配送单号：" prop="warehouseCode" :rules="[{max:20, message:'最长20位', trigger: 'blur'}]">
            <el-input v-model="searchForm.warehouseCode" placeholder="请输入配送单号" size="small" class="formitem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="物流单号：" prop="warehouseCode">
            <el-input v-model="searchForm.warehouseCode" placeholder="请输入物流单号" size="small" class="formitem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="业务单号：" prop="warehouseCode">
            <el-input v-model="searchForm.warehouseCode" placeholder="请输入业务单号" size="small" class="formitem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="下单日期：" prop="warehouseCode">
            <el-date-picker
              v-model="searchForm.ReceivTime"
              type="daterange"
              size="small"
              unlink-panels
              class="formitem"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="客户名称：" prop="warehouseCode">
            <el-input v-model="searchForm.warehouseCode" placeholder="请输入客户名称" size="small" class="formitem"></el-input>
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
  data() {
    return {
      searchForm: {}
    }
  },
  computed: {
    ...mapGetters(['mapConfig'])
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
      this.$refs['searchForm'].resetFields()
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="css">
</style>
