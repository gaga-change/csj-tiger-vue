<template lang="html">
<div class="app-container">
  <search @submit="searchSubmit" @cancel="searchCancel"></search>
  <el-row type="flex" justify="end">
    <router-link :to="{ name: 'newLogistics' }"><el-button type="primary" size="small" style="margin:10px">新建配送单</el-button></router-link>
  </el-row>
  <base-table
    @sizeChange="handleSizeChange"
    @currentChange="handleCurrentChange"
    :loading="loading"
    :config="listIndexConfig"
    :total="total"
    :pageSize="pageSize"
    :currentPage="pageNum"
    :tableData="tableData"
  />
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import search from './components/search'
import BaseTable from '@/components/Table'
import { listIndexConfig } from './components/config'
export default {
  components: { search, BaseTable },
  data() {
    return {
      searchForm: {},
      pageSize: 10,
      pageNum: 1,
      total: 0,
      loading: false,
      listIndexConfig,
      tableData: [],
      linkstyle: {
          color: '#3399ea',
          whiteSpace: 'nowrap',
          margin: '0 10px 0 0'
      }
    }
  },
  computed: {
    ...mapGetters(['mapConfig'])
  },
  created() {
    this.listIndexConfig.map(item => {
      if (item.useLink) {
        item.dom = (row, column, cellValue, index) => {
          return (
            <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
              <a
                onClick={() => {
                  this.edit({ id: row.id })
                }}
                style={this.linkstyle}
              >
                修改
              </a>
              {row.status === 1 && (
                <a
                  onClick={() => {
                    this.view({ id: row.id })
                  }}
                  style={this.linkstyle}
                >
                  查看
                </a>
              )}
            </div>
          )
        }
      }
    })
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    searchSubmit(formData) {
      this.searchForm = formData
      this.fetchData()
    },
    searchCancel() {
      this.searchForm = {}
      this.fetchData()
    },
    fetchData() {
      this.tableData = [{id:1, ownerCode:'afee00', ownerName: 'adee'}]
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNum = 1
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.fetchData()
    },
  }
}
</script>

<style lang="css" >

</style>
