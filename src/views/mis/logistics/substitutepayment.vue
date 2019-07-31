<template lang="html">
  <div class="app-container">
    <el-row :gutter="16">
      <el-form
        :inline="true"
        ref="ruleForm"
        :model="searchData"
        size="small"
        label-width="70px"
        label-position="left"
        class="demo-form-inline"
      >
        <el-col
          :span="6"
          style="min-width:300px"
        >
          <el-form-item
            label="款项编码"
            prop="expenseCode"
          >
            <el-input
              v-model.lazy.trim="searchData.expenseCode"
              placeholder="请输入款项编码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="6"
          style="min-width:300px"
        >
          <el-form-item
            label="款项名称"
            prop="expenseName"
          >
            <el-input
              v-model.lazy.trim="searchData.expenseName"
              placeholder="请输入款项名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="6"
          style="min-width:300px"
        >
          <el-form-item
            label="款项性质"
            prop="busiBillType"
          >
            <el-select
              v-model="searchData.expenseType"
              placeholder="请选择款项性质"
            >
              <el-option
                v-for="item in mapConfig['getExpenseTypeList']"
                :label="item.value"
                :key="item.key"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              @click="submitSearchForm"
            >查询</el-button>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="small"
              @click="resetSearchForm"
            >重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row type="flex" justify="end">
      <el-button type="primary" size="small" style="margin:10px" @click="newPayment">新建款项</el-button>
    </el-row>
    <el-table
      :data="tableData"
      v-loading="loading"
      border>
      <el-table-column v-for="(column, index) in searchConfig" :key="index" :prop="column.prop" :label="column.label" :width="column.width">
        <template slot-scope="scope">
          <span v-if="column.apiEnum">{{scope.row[column.prop]|apiEnum(mapConfig, column.apiEnum) }}</span>
          <span v-else-if="column.localEnum">{{ scope.row[column.prop]|localEnum(column.localEnum) }}</span>
          <span v-else>{{scope.row[column.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" fixed="right">
        <template slot-scope="scope">
          <span v-if="scope.row.expenseState === 1">
            <a :style="linkstyle" @click="delFeeRow(scope.row)">删除</a>
            <a :style="linkstyle" @click="editFeeRow(scope.row)">修改</a>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="paymentForm" labelWidth="80px">
        <el-form-item label="款项名称">
          <el-input v-model="paymentForm.expenseName" autocomplete="off" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="款项性质">
          <el-select v-model="paymentForm.expenseType" placeholder="请选择款项性质">
            <el-option v-for="item in mapConfig['getExpenseTypeList']" :label="item.value" :value="item.key" :key="item.key"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm(2)" :disabled="submitloading">确 定</el-button>
        <el-button type="primary" @click="submitForm(1)" :disabled="submitloading">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryLogisticsExpenseAll, createLogisticsExpense, deleteLogisticsExpenseInfo, updateLogisticsExpenseInfo } from '@/api/mis'
import { dealNameValueToKeyValue } from '@/utils'
import { expenseType } from '@/utils/enum'
import BaseTable from '@/components/Table'
import { mapGetters } from 'vuex'
export default {
  components: { BaseTable },
  data() {
    return {
      searchConfig: [
        { label: '款项编码', prop: 'expenseCode' },
        { label: '款项名称', prop: 'expenseName' },
        { label: '款项性质', prop: 'expenseType', localEnum:'expenseType' }
      ],
      searchData: {},
      loading: false,
      tableData: [],
      linkstyle: {
          color: '#3399ea',
          whiteSpace: 'nowrap',
          margin: '0 10px 0 0'
      },
      dialogFormVisible: false,
      submitloading: false,
      paymentForm: {},
      expenseType
    }
  },
  computed: {
    ...mapGetters(['mapConfig'])
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    submitForm(status) {
      this.submitloading = true
      const postData = {
        ...this.paymentForm,
        expenseState: status
      }
      const FUNCTION = postData.id ? updateLogisticsExpenseInfo : createLogisticsExpense
      FUNCTION(postData).then(res => {
        if (res.success) {
          this.$message.success('操作成功~'),
          this.dialogFormVisible = false
          this.submitloading = false
          this.paymentForm = {}
          this.fetchData()
        }
      }).catch(err => {
        console.error(err)
        this.submitloading = false
      })
    },
    editFeeRow(row) {
      this.dialogFormVisible = true
      this.paymentForm = JSON.parse(JSON.stringify(row))
    },
    delFeeRow(row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        deleteLogisticsExpenseInfo(row.id).then(res => {
          this.loading = false
          if (res.success) {
            this.$message.success('删除成功~')
            this.fetchData()
          }
        }).catch(err => {
          console.error(err)
          this.loading = false
        })
      })
    },
    newPayment() {
      this.dialogFormVisible = true
    },
    submitSearchForm() {
      function filterTable(tableData, attr, searchData) {
        return tableData.filter(data => {
          if (typeof data[attr] === 'number') {
            return data[attr] === searchData[attr]
          }
          return data[attr].includes(searchData[attr])
        })
      }
      for (let key in this.searchData) {
        this.tableData = filterTable(this.tableData, key, this.searchData)
      }
    },
    resetSearchForm() {
      this.searchData = {}
      this.fetchData()
    },
    fetchData() {
      this.loading = true
      queryLogisticsExpenseAll(this.searchData).then(res => {
        this.tableData = res.data
        this.loading = false
      }).catch(err => {
        console.error(err)
        this.loading = false
      })
    }
  }
}
</script>

<style lang="css">
</style>
