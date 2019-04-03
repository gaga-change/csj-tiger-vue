<template lang="html">
<div class="app-container">
  <el-card shadow="hover">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="出库日期">
        <el-date-picker
          v-model="searchForm.date"
          type="date"
          size="small"
          placeholder="请选择日期"
          unlink-panels>
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
        <el-button type="primary" @click="onExport" :disabled="downloadLoading" size="small">导出</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-alert
    :title="`共有：${tableData.length}条记录`"
    type="info"
    class="mt20"
    show-icon
    :closable="false">
  </el-alert>
  <base-table
    :loading="loading"
    :config="deliveryConfig"
    :tableData="tableData"
  />
</div>
</template>

<script>
import { deliveryConfig } from './components/config'
import { queryDispatchDetail } from '@/api/mis'
import BaseTable from '@/components/Table'
import { exportExcel } from '@/utils/exportexcel'
export default {
  components: { BaseTable },
  data() {
    return {
      searchForm: {
        outdate: []
      },
      loading: false,
      tableData: [],
      deliveryConfig,
      downloadLoading: false
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      const postData = {}
      if(this.searchForm.date) {
        postData.date = new Date(this.searchForm.date).getTime()
      }
      queryDispatchDetail(postData).then(res => {
        const result = res.data.detailExcelVOS
        result.forEach((item, index) => item.index = index + 1)
        this.tableData = result
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    onSubmit() {
      this.fetchData()
    },
    onExport() {
      const exportlist = this.tableData
      /* 参数{list,tHeader, filterVal} */
      exportExcel({
        list: exportlist,
        tHeader: this.deliveryConfig.map(item => item.label),
        filterVal: this.deliveryConfig.map(item => item.prop),
      })
    },
  }
}
</script>

<style lang="css">
</style>
