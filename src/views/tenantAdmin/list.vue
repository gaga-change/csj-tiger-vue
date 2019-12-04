<template>
  <div>
    <search-from :searchForm="searchForm" @submit="submit"></search-from>
    <div class="msginfo" v-if="selection.length">
      <i class="el-icon-info color-108ee9"></i>
      <span style="margin-left:6px;"
        >已选择<span class="color-108ee9">{{ selection.length }}</span
        >项数据</span
      >
    </div>
    <base-table
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      @selectionPartentChange="selectionPartentChange"
      :loading="loading"
      :config="listIndexConfig"
      :total="total"
      :maxTotal="10"
      :pageSize="pageSize"
      :showMul="true"
      :currentPage="pageNum"
      :tableData="tableData"
    />
  </div>
</template>

<script>
import SearchFrom from './components/search'
import { listIndexConfig } from './components/config'
import BaseTable from '@/components/Table'
import { tenantAdminList, delTenant, effectTenant } from '@/api/tenant'
import moment from 'moment'
export default {
  components: { SearchFrom, BaseTable },
  data() {
    return {
      searchForm: {
        isAdmin: 1,
        sourceSystem: 'TIGER'
      },
      listIndexConfig,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      tableData: [],
      loading: false,
      selection: [],
      effectloading: false
    }
  },

  mounted() {
    this.getCurrentTableData()
  },

  created() {
    this.listIndexConfig.forEach(item => {

      // <router-link
      //   to={{
      //     path: '/tenant/detail',
      //     query: { id: row.id, ownerCode: row.ownerCode }
      //   }}
      //   style={{
      //     color: '#3399ea',
      //     whiteSpace: 'nowrap',
      //     margin: '0 10px 0 0'
      //   }}
      //  >
      //    查看
      // </router-link>
      
      if (item.useLink) {
        item.dom = (row, column, cellValue, index) => {
          return (
            <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
              {row.ownerState === 1 && (
                <a
                  onClick={() => {
                    this.setState({ id: row.id, ownerState: 2 })
                  }}
                  style={{
                    color: '#3399ea',
                    whiteSpace: 'nowrap',
                    margin: '0 10px 0 0'
                  }}
                >
                  禁用
                </a>
              )}
              {row.ownerState === 2 && (
                <a
                  onClick={() => {
                    this.setState({ id: row.id, ownerState: 1 })
                  }}
                  style={{
                    color: '#3399ea',
                    whiteSpace: 'nowrap',
                    margin: '0 10px 0 0'
                  }}
                >
                  启用
                </a>
              )}
            </div>
          )
        }
      }
    })
  },

  methods: {
    setState(arg) {
      const loading = this.$loading({
        lock: true,
        text: '执行中，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      effectTenant(arg)
        .then(res => {
          loading.close()
          this.getCurrentTableData()
        })
        .catch(err => {
          loading.close()
          console.error(err)
        })
    },
    delete(arg) {
      this.$confirm('此操作将永久删除租户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: '正在删除...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        delTenant(arg)
          .then(res => {
            loading.close()
            this.$message(res.data)
            this.getCurrentTableData()
          })
          .catch(err => {
            loading.close()
            console.error(err)
          })
      })
    },
    goAddRouter() {
      this.$router.push({
        name: 'tenantAdminAdd'
      })
    },
    selectionPartentChange(val) {
      this.selection = val
    },

    submit(value) {
      this.searchForm = value
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

      tenantAdminList({
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

<style rel="stylesheet/scss" lang="scss" scoped>
.msginfo {
  height: 30px;
  line-height: 30px;
  background: #e6f3fc;
  border: #d4f0fc 1px solid;
  border-radius: 5px;
  font-size: 12px;
  text-indent: 8px;
  margin-bottom: 10px;
}
.color-108ee9 {
  color: #108ee9;
}
</style>
