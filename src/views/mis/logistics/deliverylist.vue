<template lang="html">
<div class="app-container">
  <el-card shadow="hover">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="出库日期">
        <el-date-picker
          v-model="searchForm.outdate"
          type="daterange"
          size="small"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
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
import { getDeliveryList } from '@/api/mis'
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
      getDeliveryList(this.searchForm).then(res => {
        this.tableData = res.data
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    onSubmit() {

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
