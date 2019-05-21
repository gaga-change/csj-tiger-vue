<template lang="html">
<el-card shadow="hover">
  <el-form :model="searchForm" :labelWidth="labelWidth + 'px'" ref="tcfForm">
    <el-row>
      <el-col :sm="12" :md="8" :lg="8" :xl="6" v-for="(formitem, index) in config" :key="index">
        <el-form-item :label="formitem.label" :prop="formitem.prop" :rules="formitem.rules||[]">
          <el-select v-if="formitem.type==='select' && formitem.selectOptions" :disabled="formitem.disabled" v-model="searchForm[formitem.prop]" clearable  :placeholder="formitem.placeholder" size="small" class="formitem">
            <el-option v-for="item in formitem.selectOptions" :label="item.value" :key="item.key" :value="item.key"></el-option>
          </el-select>
          <el-date-picker
            v-else-if="formitem.type==='daterange'"
            v-model="searchForm[formitem.prop]"
            type="daterange"
            :disabled="formitem.disabled"
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
            :disabled="formitem.disabled"
            size="small"
            class="formitem"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <el-date-picker
            v-else-if="formitem.type==='datetime'"
            v-model="searchForm[formitem.prop]"
            :disabled="formitem.disabled"
            size="small"
            class="formitem"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
          <el-input v-else-if="formitem.type==='number'" type="number" v-model="searchForm[formitem.prop]" :disabled="formitem.disabled" :placeholder="formitem.placeholder" size="small" class="formitem"></el-input>
          <el-input v-else-if="formitem.type==='textarea'" type="textarea" v-model="searchForm[formitem.prop]" :disabled="formitem.disabled" :rows="formitem.rows||1" :placeholder="formitem.placeholder" size="small" ></el-input>
          <el-cascader
            v-else-if="formitem.type==='cascader'"
            :options="formitem.options"
            :disabled="formitem.disabled"
            v-model="searchForm[formitem.prop]"
            size="small"
            class="formitem"
          >
          </el-cascader>
          <el-input v-else v-model="searchForm[formitem.prop]" :disabled="formitem.disabled" :placeholder="formitem.placeholder" size="small" class="formitem"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" :justify="justify" v-show="showResetButton || showConfirmButton">
      <el-button @click="submit" type="primary" :loading="loading" :disabled="loading" v-show="showConfirmButton">{{confirmText}}</el-button>
      <el-button @click="resetForm" v-show="showResetButton">重置</el-button>
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
    config: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      default: () =>{}
    },
    labelWidth: {
      type: Number,
      default: 80
    },
    justify: {
      type: String,
      default: 'start'
    },
    confirmText: {
      type: String,
      default: '查询'
    },
    showResetButton: {
      type: Boolean,
      default: true
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchForm: {}
    }
  },

  methods: {
    loadData() {
      this.$nextTick(() => {
        this.searchForm = JSON.parse(JSON.stringify(this.formData))
      })
    },
    submit(){
       this.$refs['tcfForm'].validate((valid) => {
          if (valid) {
             this.$emit('submitForm',this.searchForm)
          }
       })
    },
    resetForm(){
      this.$refs['tcfForm'].resetFields()
      this.searchForm = {}
      this.$emit('resetForm')
    }
  }
}
</script>

<style lang="css">
</style>
