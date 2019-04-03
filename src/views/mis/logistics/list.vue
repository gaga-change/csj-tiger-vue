<template lang="html">
<div class="app-container">
  <search @submit="searchSubmit" @cancel="searchCancel" :consoil="consoil"></search>
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
  <el-dialog :visible.sync="feeVisible" title="代支费用" width="80%">
    <SearchHead :config="headConfig" ref="searchHead" :formData="rowData" :showResetButton="false" :showConfirmButton="false" ></SearchHead>
    <el-row type="flex" justify="end">
      <el-button type="primary" size="small" style="margin:10px" @click="newFee">添加</el-button>
    </el-row>
    <el-table
      :data="feeTableData"
      :loading="feeLoading"
      border>
      <el-table-column v-for="(column, index) in subsituteConfig" :key="index" :prop="column.prop" :label="column.label" :width="column.width">
        <template slot-scope="scope">
          <span v-if="column.type === 'index'">{{index + 1}}</span>
          <span v-else-if="column.type === 'date' &&　scope.row[column.prop]">{{scope.row[column.prop] | parseTime}}</span>
          <span v-else-if="column.useLocalEnum &&column.type">{{scope.row[column.prop] | localEnum(column.type)}}</span>
          <span v-else>{{scope.row[column.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" fixed="right">
        <template slot-scope="scope">
          <a :style="linkstyle" @click="delFeeRow(scope.row)">删除</a>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      width="50%"
      title="添加代支费"
      :visible.sync="innerVisible"
      append-to-body>

    </el-dialog>
  </el-dialog>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import search from './components/search'
import SearchHead from '@/components/Search'
import BaseTable from '@/components/Table'
import { queryLogisticsList, approveLogistics, deleteLogistics, queryLogisticsExpenseConfirmed } from '@/api/mis'
import { consoilInfoList } from '@/api/carrier'
import { listIndexConfig, headConfig, subsituteConfig } from './components/config'
export default {
  components: { search, BaseTable, SearchHead },
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
      },
      loading: false,
      consoil: [],
      feeVisible: false,
      headConfig,
      rowData: {},
      feeTableData: [],
      subsituteConfig,
      feeLoading: false,
      innerVisible: false
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
                  this.view({ id: row.id })
                }}
                style={this.linkstyle}
              >
                查看
              </a>
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
                  this.delete({ id: row.id })
                }}
                style={this.linkstyle}
              >
                删除
              </a>
              {(row.invoiceState === 1 || row.invoiceState === 3) && (
                <a
                  onClick={() => {
                    this.approve({ id: row.id })
                  }}
                  style={this.linkstyle}
                >
                  审核
                </a>
              )}
              {row.invoiceState === 2 && (
                <a
                  onClick={() => {
                    this.addFee(row)
                  }}
                  style={this.linkstyle}
                >
                  代支费用
                </a>
              )}
            </div>
          )
        }
      }
    })
  },
  mounted() {
    this.getConsoilInfoList()
    this.fetchData()
  },
  methods: {
    newFee() {

    },
    addFee(row) {
      this.rowData = row
      this.feeVisible = true
      this.$nextTick(() => {
        this.$refs.searchHead.loadData()
      })
    },
    delete(params) {
      this.$confirm('此操作将永久删除该配送单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteLogistics(params.id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchData()
        })
      })
    },
    approve(params) {
      const prompt = () => {
        return new Promise((resolve, reject) => {
         this.$prompt('请输入审核意见', '提示', {
           confirmButtonText: '审核通过',
           cancelButtonText: '驳回',
           distinguishCancelAndClose: true
         }).then(({ value }) => {
           resolve({
             id: params.id,
             approveState: 2,
             approveReason: value
           })
         }).catch((action) => {
           if (action === 'cancel') {
             resolve({
               id: params.id,
               approveState: 3
             })
           }
         })
       })
      }
      prompt().then(params => {
        approveLogistics(params).then(res => {
          this.$message({
            message: params.approveState === 2 ? '审核成功~' : '驳回成功~',
            type: 'success'
          })
          this.fetchData()
        }).catch(err => {
          console.log(err)
        })
      })
    },
    view(params) {
      this.$router.push({
        name: 'logisticsDetail',
        query: params
      })
    },
    edit(params) {
      this.$router.push({
        name: 'newLogistics',
        query: params
      })
    },
    getConsoilInfoList() {
      consoilInfoList({ consoildatorState: 31 }).then(res => {
        this.consoil = res.data &&　res.data.list
      }).catch(err => {
        console.log(err)
      })
    },
    searchSubmit(formData) {
      this.searchForm = formData
      this.fetchData()
    },
    searchCancel() {
      this.searchForm = {}
      this.fetchData()
    },
    fetchData() {
      this.loading = true
      const { orderDate, ...rest } = this.searchForm
      const postData = {
        orderStartDate: orderDate && new Date(orderDate[0]).getTime(),
        orderEndDate: orderDate && new Date(orderDate[1]).getTime(),
        ...rest
      }
      queryLogisticsList({ ...postData, pageNum: this.pageNum, pageSize: this.pageSize }).then(res => {
        console.log(res)
        const result = res.data
        this.tableData = result.list
        this.pageNum = result.pageNum
        this.total = result.total
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err)
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

<style lang="css" >

</style>
