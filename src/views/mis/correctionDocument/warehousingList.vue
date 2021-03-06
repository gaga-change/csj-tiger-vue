<template>
  <div class="carrier">
    <search @submit="select" :searchForm="searchForm"></search>

    <div class="operationitem">
      <router-link :to="`/correctionDocument/warehousingAdd?time=${moment().valueOf()}`">
        <el-button type="primary" size="mini">创建订正单</el-button>
      </router-link>
    </div>

    <base-table @sizeChange="handleSizeChange" @currentChange="handleCurrentChange" :pageSize="searchForm.pageSize"
      :currentPage="searchForm.pageNum" :loading="loading" :total="total" :config="carrierListConfig" :tableData="tableData" />
    <el-dialog title="请审核" :visible.sync="dialogVisible" width="30%">
      <el-switch v-model="approve" active-text="审核通过" inactive-text="审核不通过">
      </el-switch>
      <el-input type="textarea" :rows="2" placeholder="请输入审核意见" v-model="approveReason" style="margin-top:20px;">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;approveRevisalConfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import search from './components/search'
import BaseTable from '@/components/Table'
import { carrierListConfig } from './components/config'
import { inwarehouseList, deleteInwarehouseRevisal, inwarehouseApproveRevisal } from '@/api/correction'
import _ from 'lodash';
import moment from 'moment';
export default {
  name: 'warehousingList',
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
      tableData: [],
      dialogVisible: false,
      approve: true,
      approveRow: null,
      approveReason: '',
    }
  },

  mounted() {
    this.fetch()
  },

  created() {
    this.carrierListConfig.forEach(item => {
      if (item.useLink) {
        item.dom = (row, column, cellValue, index) => {
          return (row.revisalState == 1) ? (
            <div class="tableLinkBox">
               <router-link to={`/correctionDocument/warehousingAdd?id=${row.id}&readOnly=true&time=${moment().valueOf()}`} class="tableLink">查看</router-link>
              {
                <router-link to={`/correctionDocument/warehousingAdd?time=${moment().valueOf()}&id=${row.id}`} class="tableLink">修改</router-link>
              }

              {
                <span class="tableLink" onClick={this.deleteOrder.bind(this, row)}>删除</span>
              }

              {
                <span class="tableLink" onClick={this.approveRevisalOpen.bind(this, row)}>审核</span>
              }

            </div>
          ) : (<div class="tableLinkBox">
              {
                <router-link to={`/correctionDocument/warehousingAdd?id=${row.id}&readOnly=true&time=${moment().valueOf()}`} class="tableLink">查看</router-link>
              }
            </div>)
        }
      }
    })
  },

  methods: {
    moment,
    /** 审核 */
    approveRevisalOpen(row) {
      this.dialogVisible = true
      this.approve = true
      this.approveRow = row
      this.approveReason = ''
    },
    approveRevisalConfirm() {
      const row = this.approveRow
      const params = {
        id: row.id,
        approveState: this.approve ? 2 : 3,
        approveReason: this.approveReason
      }
      inwarehouseApproveRevisal(params).then(res => {
        if (res.code == 200) {
          this.$message({
            type: 'success', message: '订正单审核完成！', duration: 1000
          })
          row.revisalState = params.approveState
        } else {
          this.$message({
            type: 'success', message: res.data || '审核失败！', duration: 1000
          })
        }
      }).catch(err => {

      })
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
      this.loading=true;
      let json = _.cloneDeep(this.searchForm);
      for (let i in json) {
        if (json[i] === '') {
          delete json[i]
        }
      }
      let params = { ...json }
      if (params.time && params.time.length) {
        params.startDate = moment(new Date(params.time[0]).getTime()).format('YYYY-MM-DD')
        params.endDate = moment(new Date(params.time[1]).getTime()).format('YYYY-MM-DD')
        delete params.time
      }
      inwarehouseList(params).then(res => {
        this.tableData = res.data.list;
        this.total=res.data.total
        this.loading=false;
      }).catch(err=>{
        this.loading=false;
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
