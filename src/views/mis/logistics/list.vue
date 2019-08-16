<template>
  <div class="app-container">
    <search
      @submit="searchSubmit"
      @cancel="searchCancel"
      :consoil="consoil"
    ></search>
    <el-row
      type="flex"
      justify="end"
    >
      <router-link :to="{ name: 'newLogistics' }">
        <el-button
          type="primary"
          size="small"
          style="margin:10px"
        >新建配送单</el-button>
      </router-link>
    </el-row>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
    >
      <el-table-column
        v-for="(column, index) in listIndexConfig"
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
      <el-table-column
        label="操作"
        width="260"
        fixed="right"
      >
        <template slot-scope="scope">
          
          <div style="display: flex; flexWrap: nowrap">
            <a
              @click="view({ id: scope.row.id })"
              :style="linkstyle"
            >
              查看
            </a>
            <a
              v-if="$haspermission('logisticsUpdate')"
              @click="edit({ id: scope.row.id })"
              :style="linkstyle"
            >
              修改
            </a>
            <a
              @click="deleteRow({ id: scope.row.id })"
              :style="linkstyle"
            >
              删除
            </a>
            <el-dropdown>
              <span class="el-dropdown-link">
                更多操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="viewLog({ id: scope.row.id })">
                  <span :style="linkstyle">
                    查看物流
                  </span>
                </el-dropdown-item>
                <el-dropdown-item @click.native="getdispatchDetail(scope.row.dispatchNo)">
                  <span :style="linkstyle" >配送明细</span>
                </el-dropdown-item>
                <el-dropdown-item @click.native="addFee(scope.row)" v-if="scope.row.invoiceState === 2">
                  <span :style="linkstyle">
                    代支费用
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
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
  <el-dialog
    :visible.sync="logisticsVisible"
    title="物流信息"
    width="500px"
  >
    <el-table
      :data="routeinfo[viewid]"
      v-loading="logloading"
      height="400"
    >
      <el-table-column
        width="150"
        label="发生时间"
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.eventTime | parseTime
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="300"
        property="remarkInfo"
        label="物流信息"
      ></el-table-column>
    </el-table>
  </el-dialog>
    <el-dialog
      :visible.sync="feeVisible"
      title="代支费用"
      width="80%"
    >
      <SearchHead
        :config="headConfig"
        ref="searchHead"
        :formData="rowData"
        :showResetButton="false"
        :showConfirmButton="false"
      ></SearchHead>
      <el-row
        type="flex"
        justify="end"
      >
        <el-button
          type="primary"
          size="small"
          style="margin:10px"
          @click="newFee"
        >添加</el-button>
      </el-row>
      <el-table
        :data="feeTableData"
        v-loading="tableLoading"
        border
        size="small"
      >
        <el-table-column
          v-for="(column, index) in subsituteConfig"
          :key="index"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
        >
          <template slot-scope="scope">
            <span v-if="column.type === 'index'">{{ scope.$index + 1 }}</span>
            <span v-else-if="column.type === 'date' && scope.row[column.prop]">{{ scope.row[column.prop] | parseTime }}</span>
            <span v-else-if="column.useLocalEnum && column.type">{{
              scope.row[column.prop] | localEnum(column.type)
            }}</span>
            <span v-else>{{ scope.row[column.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="80"
          fixed="right"
        >
          <template slot-scope="scope">
            <a
              :style="linkstyle"
              @click="delFeeRow(scope.row)"
            >删除</a>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        width="50%"
        title="添加代支费"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-form
          :model="addForm"
          label-width="80px"
        >
          <el-form-item label="代支款项">
            <el-select
              v-model="addForm.expense"
              value-key="expenseId"
              placeholder="请选择代支款项"
            >
              <el-option
                v-for="expense in expenses"
                :label="expense.expenseName"
                :value="expense"
                :key="expense.expenseId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="金额">
            <el-input-number
              type="number"
              :min="0"
              v-model="addForm.amountOfMoney"
              autocomplete="off"
            ></el-input-number>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitAddForm"
            :loading="addloading"
            :disabled="addloading"
          >确 定</el-button>
        </div>
      </el-dialog>
    </el-dialog>
    <el-dialog
    :visible.sync="deliveryVisible"
    title="配送明细"
    width="1000px"
    >
      <base-table
      :config="deliveryConfig"
      :tableData="deliveryData"
    />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import search from './components/search'
import SearchHead from '@/components/Search'
import BaseTable from '@/components/Table'
import {
  queryLogisticsList,
  approveLogistics,
  deleteLogistics,
  queryLogisticsExpenseConfirmed,
  addLogisticsExpense,
  queryExpenseInfo,
  deleteLogisticsExpense,
  queryRouteInfo,
  dispatchDetailInfo
} from '@/api/mis'
import { consoilInfoList } from '@/api/carrier'
import {
  listIndexConfig,
  headConfig,
  subsituteConfig,
  deliveryConfig
} from './components/config'
export default {
  name: 'logisticsList',
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
      innerVisible: false,
      expenses: [],
      addForm: {},
      addloading: false,
      tableLoading: false,
      routeinfo: {},
      logloading: false,
      logisticsVisible:false,
      viewid:null,
      deliveryData:[],
      deliveryConfig,
      deliveryVisible:false
    }
  },
  computed: {
    ...mapGetters(['mapConfig']),
    mapConfigloaded() {
      return !!Object.keys(this.mapConfig).length
    }
  },
  watch: {
    mapConfigloaded(val, oldval) {
      if (val) {
        // 结算方式 使用 枚举api
        let temp = this.headConfig.find(v => v.prop === 'settlementType')
        temp.selectOptions = this.mapConfig['getSettlementType']
        this.$set(this.headConfig, 1, temp)
      }
    }
  },
  mounted() {
    this.getConsoilInfoList()
    this.fetchData()
  },
  methods: {
    getdispatchDetail(dispatchNo){
      this.deliveryVisible=true
      dispatchDetailInfo({dispatchNo:dispatchNo}).then(res=>{
        this.deliveryData=res.data.detailExcelVOS?res.data.detailExcelVOS:null
      })
    },
    viewLog({ id }) {
      this.logisticsVisible=true
      this.viewid=id
      if (!this.routeinfo[id]) {
        this.logloading = true
        queryRouteInfo(id).then(res => {
          this.routeinfo[id] = res.data
          this.logloading = false
        }).catch(err => {
          this.logloading = false
        })
      }
    },
    delFeeRow(expenseRow) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableLoading = true
        deleteLogisticsExpense(expenseRow.id)
          .then(res => {
            this.tableLoading = false
            if (res.success) {
              this.$message.success('删除成功~')
              this.addFee(this.rowData)
            }
          })
          .catch(err => {
            console.err(err)
            this.tableLoading = false
          })
      })
    },
    submitAddForm() {
      this.addloading = true
      const { expense = {}, amountOfMoney } = this.addForm
      addLogisticsExpense({
        logisticsId: this.rowData.id,
        expenseId: expense.id,
        expenseType: expense.expenseType,
        expenseName: expense.expenseName,
        amountOfMoney
      }).then(res => {
        this.addloading = false
        if (res.success) {
          this.$message.success('添加成功~')
          this.innerVisible = false
          this.addForm = {}
          this.addFee(this.rowData)
        }
      })
    },
    newFee() {
      this.innerVisible = true
      this.fetchExpenses()
    },
    fetchExpenses() {
      queryLogisticsExpenseConfirmed()
        .then(res => {
          this.expenses = res.data
        })
        .catch(err => {
          console.err(err)
        })
    },
    addFee(row) {
      this.rowData = row
      this.feeVisible = true
      this.$nextTick(() => {
        this.$refs.searchHead.loadData()
      })
      this.fetchFeeTableData(row.id)
    },
    fetchFeeTableData(id) {
      this.tableLoading = true
      queryExpenseInfo(id)
        .then(res => {
          const result = res.data
          this.tableLoading = false
          this.feeTableData = result.logisticsExpenses || []
        })
        .catch(err => {
          console.err(err)
          this.tableLoading = false
        })
    },
    deleteRow(params) {
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
          })
            .then(({ value }) => {
              resolve({
                id: params.id,
                approveState: 2,
                approveReason: value
              })
            })
            .catch(action => {
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
        approveLogistics(params)
          .then(res => {
            this.$message({
              message: params.approveState === 2 ? '审核成功~' : '驳回成功~',
              type: 'success'
            })
            this.fetchData()
          })
          .catch(err => {
            console.err(err)
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
      consoilInfoList({ consoildatorState: 31, pageSize: 9999 })
        .then(res => {
          this.consoil = res.data && res.data.list
        })
        .catch(err => {
          console.err(err)
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
      queryLogisticsList({
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
          console.err(err)
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
    color: #409EFF;
  }
</style>
