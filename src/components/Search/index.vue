<template lang="html">
<el-card shadow="hover">
  <el-form :model="searchForm" labelWidth="80px" ref="searchForm">
    <el-row>
      <el-col :sm="12" :md="8" :lg="8" :xl="6" v-for="(formitem, index) in searchConfig" :key="index">
        <el-form-item :label="formitem.label" :prop="formitem.prop" :rules="formitem.rules">
          <el-select v-if="formitem.type==='select'"  v-model="searchForm[formitem.prop]" clearable  :placeholder="formitem.placeholder" size="small" class="formitem">
            <el-option v-for="item in formitem.selectOptions" :label="item.value" :key="item.key" :value="item.key"></el-option>
          </el-select>
          <el-date-picker
            v-else-if="formitem.type==='daterange'"
            v-model="searchForm[formitem.prop]"
            type="daterange"
            size="small"
            unlink-panels
            class="formitem"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-date-picker
            v-else-if="formitem.type==='date'"
            v-model="searchForm[formitem.prop]"
            size="small"
            class="formitem"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <el-date-picker
            v-else-if="formitem.type==='datetime'"
            v-model="searchForm[formitem.prop]"
            size="small"
            class="formitem"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
          <el-input-number v-else-if="formitem.type==='number'" v-model="searchForm[formitem.prop]" :placeholder="formitem.placeholder" size="small" class="formitem"></el-input-number>
          <el-input v-else v-model="searchForm[formitem.prop]" :placeholder="formitem.placeholder" size="small" class="formitem"></el-input>
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
/*
* searchConfig的type不传则认为是text，type如果是select需传selectOptions
* type的类型有select,number,date,datetime,daterange
* 方法:submit,提交表单触发父组件submitSearchForm
* 方法:resetForm,重置表单触发父组件resetSearchForm
*
*/
export default {
  props: {
    searchConfig: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchForm: {}
    }
  },
  methods: {
    submit(){
       this.$refs['searchForm'].validate((valid) => {
          if (valid) {
             this.$emit('submitSearchForm',this.searchForm)
          }
       })
    },
    resetForm(){
      this.$refs['searchForm'].resetFields()
      this.$emit('resetSearchForm')
    }
  }
}
</script>

<style lang="css">
</style>
