<template lang="html">
  <div class="app-container">
    <search
      @searchSubmit="handleSearchSubmit"
      style="margin-bottom:20px"
    ></search>
    <base-table
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :loading="loading"
      :config="listIndexConfig"
      :total="total"
      :maxTotal="10"
      :pageSize="pageSize"
      :currentPage="pageNum"
      :tableData="tableData"
    />
  </div>
</template>

<script>
import search from './components/search'
import { getProductList } from '@/api/productcenter'
import { listIndexConfig } from './components/config'
import baseTable from '@/components/Table'
import { parseTime } from '@/utils'
export default {
  components: { search, 'base-table': baseTable },
  data() {
    return {
      searchForm: {},
      loading: false,
      total: 0,
      tableData: [],
      pageSize: 10,
      pageNum: 1,
      listIndexConfig
    }
  },
  created() {
    this.getCurrentTableData()
  },
  methods: {
    handleSearchSubmit(searchdata) {
      const { createDate, ...rest } = searchdata
      this.searchForm = {
        startDate: createDate[0] ? createDate[0].getTime() : null,
        endDate: createDate[1] ? createDate[1].getTime() : null,
        ...rest
      }
      this.getCurrentTableData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNum = 1
      this.getCurrentTableData()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getCurrentTableData()
    },
    getCurrentTableData() {
      this.loading = true
      let json = {}
      for (let i in this.searchForm) {
        if (this.searchForm[i] !== '') {
          json[i] = this.searchForm[i]
        }
      }
      getProductList({
        ...json,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      })
        .then(res => {
          this.loading = false
          if (res.success) {
            this.tableData = (res.data && res.data.list) || []
            this.total = res.data && res.data.total
          }
        })
        .catch(err => {
          console.error(err)
          this.loading = false
        })
    }
  }
}
</script>

<style lang="css"></style>
