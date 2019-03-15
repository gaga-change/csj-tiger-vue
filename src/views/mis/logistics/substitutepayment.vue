<template lang="html">
  <div class="app-container">
    <search :config="searchConfig" @submitForm="submitSearchForm" @resetForm="resetSearchForm"></search>
    <el-row type="flex" justify="end">
      <el-button type="primary" size="small" style="margin:10px" @click="newPayment">新建款项</el-button>
    </el-row>
    <base-table
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :loading="loading"
      :config="subsituteConfig"
      :total="total"
      :pageSize="pageSize"
      :currentPage="pageNum"
      :tableData="tableData"
    />
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="paymentForm" labelWidth="80px">
        <el-form-item label="活动名称">
          <el-input v-model="paymentForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="款项性质">
          <el-select v-model="paymentForm.natrue" placeholder="请选择款项性质">
            <el-option label="代支款" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import search from '@/components/Search'
import { subsituteConfig } from './components/config'
import { substituteList } from '@/api/mis'
import BaseTable from '@/components/Table'
export default {
  components: { search, BaseTable },
  data() {
    return {
      searchConfig: [
        { label: '款项编码:', prop: 'paymentCode', placeholder: '请输入款项编码' },
        { label: '款项名称:', prop: 'paymentName', placeholder: '请输入款项名称' },
        { label: '款项性质:', prop: 'paymentNature', placeholder: '请选择款项性质', type: 'select', selectOptions: [{ value: '代支款', key: 1 }] },
      ],
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
      subsituteConfig,
      dialogFormVisible: false,
      paymentForm: {}
    }
  },
  created() {
    this.subsituteConfig.map(item => {
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
                    修改
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
      substituteList(this.searchData).then(res => {
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
