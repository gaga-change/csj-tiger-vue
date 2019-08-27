<template>
  <div>
    <el-form :model="form" :inline="true" ref="form" label-width="95px">
      <el-form-item label="费用模板名称" prop="templateName">
        {{form.templateName}}
      </el-form-item>
      <el-form-item label="承运商" prop="consoildatorCode">
        {{form.consoildatorName}}
      </el-form-item>
      <el-form-item label="发货点" prop="warehouseList">
        <span v-for="item in form.warehouseList">{{item.warehouseName + '  '}}</span>
      </el-form-item>
      <el-form-item label="计费模式" prop="costCalcWay" label-width="70px">
        {{form.costCalcWay === 2 ? '重量' : form.costCalcWay === 1 ? '体积' : ''}}
      </el-form-item>
      <el-form-item >
        <el-tag v-if="form.isDefault">默认模板</el-tag>
      </el-form-item>
      <template v-if="form.costCalcWay === 2">
        <div class="weightcard">          
          <el-form-item prop="firstWeight" label="首重" label-width="45px">{{form.firstWeight}}KG，
          </el-form-item>
          <span>超出首重，按照首重费用+续重费用计算</span>
        </div>
        <el-table :data="tableData" border max-height="400" style="width:100%" v-loading="loading">
          <el-table-column
            type="index"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="destinationName"
            label="运送到地区">
          </el-table-column>
          <el-table-column
            prop="firstWeightPrice"
            label="首重">
          </el-table-column>
          <el-table-column
            prop="continuousWeightPrice"
            label="续重">
          </el-table-column>
        </el-table>
      </template>
      <template v-if="form.costCalcWay === 1">
        <el-table :data="tableData" border max-height="400" style="width:100%" v-loading="loading">
          <el-table-column
            type="index"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="destinationName"
            label="运送到地区">
          </el-table-column>
          <el-table-column
            prop="firstWeightPrice"
            label="重货">
          </el-table-column>
          <el-table-column
            prop="continuousWeightPrice"
            label="轻货">
          </el-table-column>
          <el-table-column
            prop="lowestPrice"
            label="最低价格">
          </el-table-column>
        </el-table>
      </template>     
      
    </el-form>
  </div>
</template>
<script>
import { getFreightTemplateByTemplateCode } from '@/api/mis'
export default {
  data() {
    return {
      form: {},
      tableData: [],
      loading: false
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.loading = true
      getFreightTemplateByTemplateCode(this.$route.query.templateCode).then(res => {
        this.loading = false
        if (res.success) {
          const result = res.data
          const {items, ...rest} = result
          this.form = rest
          this.tableData = items
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
.weightcard {
  line-height: 26px;
  font-size: 12px;
  height: 42px;
  overflow: hidden;
}
</style>