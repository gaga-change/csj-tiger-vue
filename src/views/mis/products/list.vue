<template lang="html">
  <div class="app-container">
    <search :searchConfig="searchConfig" @submitSearchForm="submitSearchForm" @resetSearchForm="resetSearchForm"></search>
    <el-row type="flex" justify="end">
      <el-button type="primary" size="small" style="margin:10px" @click="newProduct">创建商品</el-button>
      <el-button type="primary" size="small" style="margin:10px" @click="newProduct">批量导入商品</el-button>
      <el-button type="primary" size="small" style="margin:10px" @click="newProduct">批量修改</el-button>
    </el-row>
    <base-table
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :loading="loading"
      :config="productConfig"
      :total="total"
      :pageSize="pageSize"
      :currentPage="pageNum"
      :tableData="tableData"
    />
  </div>
</template>

<script>
import search from '@/components/Search'
import { productConfig } from './components/config'
import { getProductList } from '@/api/mis'
import BaseTable from '@/components/Table'
import { mapGetters } from 'vuex'
export default {
  components: { search, BaseTable },
  data() {
    return {
      searchData: {},
      pageSize: 10,
      pageNum: 1,
      total: 0,
      loading: false,
      tableData: [],
      linkstyle: {
          color: '#3399ea',
          whiteSpace: 'nowrap',
          margin: '0 10px 0 0'
      },
      productConfig
    }
  },
  computed: {
    searchConfig() {
      const selectOptions = this.mapConfig['owner']
      return  [
        { label: '商品名称:', prop: 'productName', placeholder: '请输入商品名称' },
        { label: '商品编码:', prop: 'productCode', placeholder: '请输入商品编码' },
        { label: '规格:', prop: 'productRule', placeholder: '请输入规格' },
        { label: '创建时间:', prop: 'createDate', type: 'daterange' },
        { label: '货主:', prop: 'owner', placeholder: '请选择货主', type: 'select', selectOptions },
      ]
    },
    ...mapGetters(['mapConfig'])
  },
  created() {
    this.productConfig.map(item => {
      if (item.useLink) {
        item.dom = (row, column, cellValue, index) => {
          return (
            <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
              {row.status === 0 && (
                <span>
                  <a
                    onClick={() => {
                      this.edit({ id: row.id })
                    }}
                    style={this.linkstyle}
                  >
                    修改
                  </a>
                  <a
                    onClick={() => {
                      this.edit({ id: row.id })
                    }}
                    style={this.linkstyle}
                  >
                    删除
                  </a>
                </span>
              )}
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
    newProduct() {
      this.$router.push('newproduct')
    },
    newPayment() {
      this.dialogFormVisible = true
    },
    submitSearchForm(val) {
      this.searchData = val
      this.fetchData()
    },
    resetSearchForm() {
      this.searchData = {}
      this.fetchData()
    },
    fetchData() {
      this.loading = true
      getProductList(this.searchData).then(res => {
        this.tableData = res.data
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
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

<style lang="css">
</style>
