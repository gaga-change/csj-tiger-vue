<template>
  <div class="carrier">
    <search @submit="select" :searchForm="searchForm"></search>

    <div class="operationitem">
      <router-link :to="`/correctionDocument/warehousingAdd?time=${moment().valueOf()}`">
        <el-button type="primary" size="small">创建订正单</el-button>
      </router-link>
    </div>

    <base-table @sizeChange="handleSizeChange" @currentChange="handleCurrentChange" :pageSize="searchForm.pageSize"
      :currentPage="searchForm.pageNum" :loading="loading" :total="total" :config="carrierListConfig" :tableData="tableData" />
  </div>
</template>

<script>
import search from './components/search'
import BaseTable from '@/components/Table'
import { carrierListConfig } from './components/config'
import { inwarehouseList, deleteInwarehouseRevisal, approveRevisal } from '@/api/correction'
import _ from 'lodash';
import moment from 'moment';
export default {
  components: { search, BaseTable },
  data() {
    return {

      //搜索项
      searchForm: {
        busiBillNo: '',
        revisalType: '',
        ownerCode: '',
        revisalState: '',
        time: '',
        pageSize: 10,
        pageNum: 1
      },
      total: 0,

      //table配置
      loading: false,
      carrierListConfig,
      tableData: []
    }
  },

  mounted() {
    this.fetch()
  },

  created() {
    this.carrierListConfig.forEach(item => {
      if (item.useLink) {
        item.dom = (row, column, cellValue, index) => {
          return (row.revisalState == 1) && (
            <div class="tableLinkBox">
              {
                <router-link to={`/correctionDocument/warehousingAdd?time=${moment().valueOf()}`} class="tableLink">修改</router-link>
              }

              {
                <span class="tableLink" onClick={this.deleteOrder.bind(this, row)}>删除</span>
              }

              {
                <span class="tableLink" onClick={this.approveRevisal.bind(this, row)}>审核</span>
              }

            </div>
          )
        }
      }
    })
  },

  methods: {
    moment,
    /** 审核 */
    approveRevisal(row) {
      // approveRevisal
    },
    /** 删除修正单 */
    deleteOrder(row) {

      this.$confirm('此操作将永久删除该订正单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData = this.tableData.filter(item => item.id !== row.id)
        deleteInwarehouseRevisal(row.id).then(res => {
          this.$message({
            type: 'success', message: '入库订正单删除成功！', duration: 1000
          })
        }).catch(err => {
          this.$message({
            type: 'error', message: '服务器异常，请联系管理员！', duration: 1000
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange(val) {
      this.searchForm = { ...this.searchForm, pageSize: val, pageNum: 1 };
      this.fetch()
    },

    handleCurrentChange(val) {
      this.searchForm = { ...this.searchForm, pageNum: val };
      this.fetch()
    },

    select(value) {
      this.searchForm = _.cloneDeep(value);
      this.fetch()
    },

    fetch() {
      let json = _.cloneDeep(this.searchForm);
      for (let i in json) {
        if (json[i] === '') {
          delete json[i]
        }
      }
      let params = { ...json }
      if (params.time) {
        params.startDate = params.time[0]
        params.endDate = params.time[1]
        delete params.time
      }
      inwarehouseList(params).then(res => {
        this.tableData = res.data.list
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.carrier {
  .operationitem {
    display: flex;
    justify-content: flex-end;
    margin: 16px 0;
  }
  .tableLinkBox {
    display: flex;
    .tableLink {
      cursor: pointer;
      color: #3399ea;
      margin-right: 12px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>


