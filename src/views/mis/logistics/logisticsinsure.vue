<template>
  <div class="app-container">
    <insure-search
      @submit="searchSubmit"
      @cancel="searchCancel"
      :consoil="consoil"
    ></insure-search>
    <el-row
      type="flex"
      justify="end"
    >
      <el-button
        type="primary"
        size="mini"
        style="margin:10px"
        :loading="insureloading"
        @click="insureSubmit('insure')"
      >投保</el-button>
      <el-button
        type="primary"
        size="mini"
        style="margin:10px"
        :loading="unInsureloading"
        @click="insureSubmit('unInsure')"
      >解除投保</el-button>
    </el-row>
    <el-table
      :data="tableData"
      ref="listTable"
      v-loading="loading"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        fixed="left"
      >
      </el-table-column>
      <el-table-column
        v-for="(column, index) in insureConfig"
        :key="index"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
      >
        <template slot-scope="scope">
          <span v-if="column.type === 'index'">{{ scope.$index + 1 }}</span>
          <span v-else-if="column.type === 'time' && scope.row[column.prop]">{{
            scope.row[column.prop] | parseTime
          }}</span>
          <span v-else-if="column.useLocalEnum && column.type">{{
            scope.row[column.prop] | localEnum(column.type)
          }}</span>
          <span v-else>{{ scope.row[column.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import insureSearch from './components/insureSearch'
import BaseTable from '@/components/Table'
import {
  insureListInfo,
  insureConfirm,
  unInsureConfirm
} from '@/api/mis'
import { consoilInfoList } from '@/api/carrier'
import {
  insureConfig
} from './components/config'
export default {
  name: 'logisticsinsure',
  components: { insureSearch, BaseTable },
  data() {
    return {
      searchForm: {},
      pageSize: 10,
      pageNum: 1,
      total: 0,
      loading: false,
      insureConfig,
      tableData: [],
      linkstyle: {
        color: '#3399ea',
        whiteSpace: 'nowrap',
        margin: '0 10px 0 0'
      },
      loading: false,
      consoil: [],
      submitData: null,
      insureloading: false,
      unInsureloading: false
    }
  },
  computed: {
    ...mapGetters(['mapConfig']),
    mapConfigloaded() {
      return !!Object.keys(this.mapConfig).length
    }
  },
  watch: {
  },
  mounted() {
    this.getConsoilInfoList()
    this.fetchData()
  },
  methods: {
    handleSelectionChange(val) {
      this.submitData = val
    },
    insureSubmit(type) {
      const Methods = {
        insure: insureConfirm,
        unInsure: unInsureConfirm
      }
      if (this.submitData && this.submitData.length > 0) {
        let ids = []
        let message = null
        if (type == 'insure') {
          this.submitData.map(item => {
            if (item.insureState == 0) {
              ids.push(item.id)
            }
          })
          this.insureloading = true
          this.unInsureloading = false
          message = '请勾选未投保选项'
        } else {
          this.submitData.map(item => {
            if (item.insureState == 1) {
              ids.push(item.id)
            }
          })
          this.insureloading = false
          this.unInsureloading = true
          message = '请勾选已投保选项'
        }
        if (ids.length > 0) {
          Methods[type](ids).then(res => {
            if (res.success) {
              this.$message.success('操作成功！')
              this.$refs.listTable.clearSelection()
              this.fetchData()
              this.submitData = []
              this.insureloading = false
              this.unInsureloading = false
            }
          })
        } else {
          this.$message.error(message)
          this.insureloading = false
          this.unInsureloading = false
        }
      } else {
        this.insureloading = false
        this.unInsureloading = false
        this.$message.error('请先勾选选项！')
      }
    },
    getConsoilInfoList() {
      consoilInfoList({ consoildatorState: 31, pageSize: 9999 })
        .then(res => {
          this.consoil = res.data && res.data.list
        })
        .catch(err => {
          console.error(err)
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
      const { insureDate, orderDate, ...rest } = this.searchForm
      const postData = {
        gmtInsureBegin: insureDate && new Date(insureDate[0]).getTime(),
        gmtInsureEnd: insureDate && new Date(insureDate[1]).getTime(),
        gmtCreateBegin: orderDate && new Date(orderDate[0]).getTime(),
        gmtCreateEnd: orderDate && new Date(orderDate[1]).getTime(),
        ...rest
      }
      insureListInfo({
        ...postData,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then(res => {
          const result = res.data
          this.tableData = result.list
          this.pageNum = result.pageNum
          this.total = result.total
          this.loading = false
        })
        .catch(err => {
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
    }
  }
}
</script>

<style lang="css">
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>
