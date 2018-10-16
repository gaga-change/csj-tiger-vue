<template lang="html">
  <div>
    <el-form :inline="true" :model="postForm" class="demo-form-inline" labelWidth="120px">
      <el-form-item label="合同编号">
        <el-input v-model="postForm.contractno" placeholder="合同编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="text"  @click="onPuls" :icon="ispul ? 'el-icon-arrow-up' : 'el-icon-arrow-down'">{{ispul ? '收起' : '展开'}}条件</el-button>
      </el-form-item>
      <div v-show="ispul">
        <el-form-item label="来源计划单">
          <el-input v-model="postForm.enquiryorder" placeholder="来源计划单号"></el-input>
        </el-form-item>
        <el-form-item label="供应商">
          <el-select v-model="postForm.servicer" filterable clearable placeholder="请选择供应商"  prefix-icon="el-icon-search">
            <el-option
              v-for="item in gridData"
              :key="item.id"
              :label="item.name"
              :value="item.requestid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="付款方式">
          <el-select v-model="postForm.paymethod" placeholder="请选择付款方式">
            <el-option
              v-for="item in paymethod"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <div class="filter-container">
      <el-checkbox-group v-model="checkboxVal">
        <el-checkbox label="enquiryorder">来源计划单</el-checkbox>
        <el-checkbox label="contractno">合同编号</el-checkbox>
      </el-checkbox-group>
    </div>
    <el-table
      ref="singleTable"
      @current-change="handleCurrentChange"
      highlight-current-row
      max-height="600"
      :key='key'
      :data="orderList" :loading="loading">
      <el-table-column property="ticketno" label="采购单号" width="160"></el-table-column>
      <el-table-column :key='fruit.value' v-for='fruit in formThead' :label="fruit.name" width="150">
        <template slot-scope="scope">
          {{scope.row[fruit.value]}}
        </template>
      </el-table-column>
      <el-table-column property="sumamount" label="采购金额" ></el-table-column>
      <el-table-column property="planarrivedate" label="计划到货日期" width="200"></el-table-column>
      <el-table-column property="status" label="状态" width="160">
        <template slot-scope="scope">
          {{scope.row.status|statusFilter}}
        </template>
      </el-table-column>
      <el-table-column property="memos" label="备注" ></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onConfirm">确 定</el-button>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import { createPayment } from '@/api/payment'
import { mapGetters } from 'vuex'
const defaultFormThead = []
export default {
  data() {
    return {
      orderList: [],
      pagesize: 10,
      pageindex: 1,
      total: 0,
      currentPage: 1,
      loading: false,
      postData: {},
      postForm: {
        status: '',
        enquiryorder: '',
        contractno: '',
        servicer: '',
        paymethod: ''
      },
      currentRow: null,
      ispul: false,
      checkboxVal: defaultFormThead, // checkboxVal
      key: 1, // table key
      formTheadOptions: [{ name: '来源计划单', value: 'enquiryorder' }, { name: '合同编号', value: 'contractno' }],
      formThead: defaultFormThead, // 默认表头 Default header
      statusList: [
        {
          name: '待审核', value: '0'
        },
        {
          name: '确认通过', value: '1'
        },
        {
          name: '驳回', value: '-2'
        }
      ],
      paymethod: [
        {
          name: '货到付款',
          value: '1'
        },
        {
          name: '货到票到付款',
          value: '2'
        },
        {
          name: '先款后货',
          value: '3'
        }
      ]
    }
  },
  watch: {
    checkboxVal(valArr) {
      this.formThead = this.formTheadOptions.filter(i => valArr.includes(i.value))
      this.key = this.key + 1// 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
    }
  },
  computed: {
    ...mapGetters({
      gridData: 'gysList'
    })
  },
  created() {
    if (!this.orderList.length) {
      this.getList()
    }
    if (!this.gridData.length) {
      this.$store.dispatch('GetGysList')
    }
  },
  methods: {
    onConfirm() {
      this.$emit('subOrder', this.currentRow)
      // this.$refs.singleTable.setCurrentRow()
      this.$emit('diClose')
    },
    onCancel() {
      this.$refs.singleTable.setCurrentRow()
    },
    onPuls() {
      this.ispul = !this.ispul
    },
    getList() {
      this.loading = true
      const pData = {}
      for (const item of Object.keys(this.postData)) {
        if (this.postData[item] !== '') {
          pData[item] = this.postData[item]
        }
      }
      createPayment({
        pagesize: this.pagesize,
        pageindex: this.pageindex,
        ...pData
      }).then(res => {
        console.log(res, 123)
        this.orderList = res.data.data
        this.total = res.data.total
        this.currentPage = res.data.currentPage
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getList()
    },
    handleCurrentPageChange(val) {
      this.pageindex = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    onSubmit() {
      this.postData = Object.assign({}, this.postForm)
      this.getList()
    }
  }
}
</script>

<style lang="css" scoped>
.dialog-footer {
  float: right;
}
.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden;}
.clearfix{zoom:1;}
.clear{clear:both;display:block;height:0;overflow:hidden;font-size:0;}
</style>
