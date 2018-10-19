<template lang="html">
<div class="app-container">
  <el-row>
    <el-card class="simpleCard" shadow="never" body-style="padding:12px" >
      <el-form :model="searchForm" ref="searchForm" label-width="48px" label-position="left">
        <el-row>
        <el-col :span="6">
          <el-form-item label="客户">
            <el-input v-model="searchForm.outputInvoice.customername" size="small" @focus="addServicer" placeholder="请选择客户" prefix-icon="el-icon-search"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-select size="small" v-model="searchForm.outputInvoice.status" filterable clearable placeholder="请选择单据状态" prefix-icon="el-icon-search">
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        
        <el-col :span="6">
          <el-form-item label="申请人" label-width="60px">
            <el-input type="text" size="small" v-model="searchForm.outputInvoice.createuser" placeholder="请输入申请人"></el-input>
          </el-form-item>
        </el-col>
          <el-col :span="6">
          <el-form-item label="申请日期" label-width="80px">
            <el-date-picker
              v-model="searchForm.outputInvoice.createdate"
              type="date"
              size="small"
              placeholder="申请日期"
              :editable="false">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开票申请单号" label-width="100px" >
            <el-input type="text" size="small" v-model="searchForm.outputInvoice.ticketno" placeholder="请输入开票单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最迟开票日期" label-width="100px">
            <el-date-picker
              v-model="searchForm.outputInvoice.postlastinvoicedate"
              type="datetimerange"
              :editable="false"
              size="small"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      
        <el-col :span="23" >
          <el-form-item label-width="0" class="simpleCardLastLine">
            <el-button type="primary" size="small" v-loading="loading" @click="onSubmit">查询</el-button>
            <el-button @click="onCancel" size="small">重置</el-button>
          </el-form-item>
        </el-col>
        </el-row>
      </el-form>
    </el-card>
  </el-row>
  <el-row>
    <el-table
      :data="list"
      v-loading="loading"
      size="small"
      style="width: 100%;margin-top:20px;"
      border>
      <el-table-column
        label="开票申请单号"
        width="220">
        <template slot-scope="scope">
          <el-button type="text" @click="viewRow(scope.row)">{{scope.row.ticketno}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        label="客户">
        <template slot-scope="scope">
          <span>{{ scope.row.customername }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="计划开票金额"
        width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.planinvoiceamount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        label="计划开票数量">
        <template slot-scope="scope">
          <span>{{ scope.row.planinvoicenum}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        label="发票类型">
        <template slot-scope="scope">
          <span>{{ scope.row.invoicetype | invoicetypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="120">
        <template slot-scope="scope">
          <span >{{ scope.row.status|statusFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最迟票日期"
        width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.lastinvoicedate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="申请日期"
        width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.createdate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="申请人"
        width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.createuser}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="currentPage"
      size="small"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-row>
  <el-dialog
    title="选择客户"
    :visible.sync="addServicerShow"
    center
    width="80%">
    <CompanyChoice @subCompany="subCompany" @diClose="diClose"></CompanyChoice>
  </el-dialog>
</div>
</template>

<script>
let OutputInvoiceSearchForm = {
  outputInvoice: {
    checkadvice: '',
    checkdate: '',
    checkuser: '',
    createdate: '',
    createuser: '',
    customer: '',
    customername: '',
    enterprise: '',
    enterprisename: '',
    invoiceamount: '',
    invoicedate: '',
    invoiceno: '',
    invoicenum: '',
    invoicetype: '',
    invoiceuser: '',
    isdelete: null,
    memos: '',
    planinvoiceamount: null,
    planinvoicenum: null,
    pretaxamount: null,
    status: null,
    taxamount: null,
    ticketno: ''
  }
}
import { parseTime, InvoiceType, Status } from '@/utils'
import { getApplyMainDetail } from '@/api/invoice'
import { mapGetters } from 'vuex'
import CompanyChoice from '@/components/CompanyChoice'
export default {
  name: 'outputinvoicelist',
  components: {
    CompanyChoice
  },
  data() {
    return {
      searchForm: Object.assign({ postlastinvoicedate: null }, OutputInvoiceSearchForm),
      postForm: {},
      invoicetype: InvoiceType,
      list: [],
      pagesize: 10,
      pageindex: 1,
      total: 0,
      currentPage: 1,
      loading: false,
      status: Status,
      addServicerShow: false
    }
  },
  computed: {
    ...mapGetters({
      company: 'company',
      companyId: 'companyId',
      userInfo: 'userInfo',
      visitedViews: 'visitedViews',
      revstoreList: 'storeList',
      gridData: 'gysList'
    })
  },
  created() {
    if (!this.gridData.length) {
      this.$store.dispatch('GetGysList')
    }
    this.getListData()
  },
  activated(){
    if (!this.gridData.length) {
      this.$store.dispatch('GetGysList')
    }
    this.getListData()
  },
  methods: {
    parseTime,
    onSubmit() {
      this.pageindex = 1
      this.postForm = this.searchForm.outputInvoice
      this.getListData()
    },
    onCancel() {
      this.pageindex = 1
      OutputInvoiceSearchForm = {
        outputInvoice: {
          checkadvice: '',
          checkdate: '',
          checkuser: '',
          createdate: '',
          createuser: '',
          customer: '',
          customername: '',
          enterprise: '',
          enterprisename: '',
          invoiceamount: '',
          invoicedate: '',
          invoiceno: '',
          invoicenum: '',
          invoicetype: '',
          invoiceuser: '',
          isdelete: null,
          memos: '',
          planinvoiceamount: null,
          planinvoicenum: null,
          pretaxamount: null,
          status: null,
          taxamount: null,
          ticketno: ''
        }
      }
      this.searchForm = Object.assign({ postlastinvoicedate: null }, OutputInvoiceSearchForm)
      this.postForm = {}
    },
    addServicer() {
      this.addServicerShow = true
    },
    diClose() {
      this.addServicerShow = false
    },
    subCompany(row) {
      this.searchForm.outputInvoice.customer = row.requestid
      this.searchForm.outputInvoice.customername = row.name
    },
    getListData() {
      const postData = this.postForm
      if (postData.postlastinvoicedate && postData.postlastinvoicedate.length) {
        postData.lastinvoicestartdate = parseTime(postData.postlastinvoicedate[0])
        postData.lastinvoiceenddate = parseTime(postData.postlastinvoicedate[1])
        postData.lastinvoicedate = ''
      }
      if (postData.createdate && typeof (postData.createdate) === 'object') {
        postData.createdate = this.parseTime(postData.createdate, '{y}-{m}-{d}')
      }
      const pData = {}
      for (const item of Object.keys(postData)) {
        if (postData[item] !== null && postData[item] !== '') {
          pData[item] = postData[item]
        }
      }
      this.loading = true
      getApplyMainDetail({ pagesize: this.pagesize, pageindex: this.pageindex, ...pData }).then(res => {
        this.list = res.data.data
        this.total = res.data.total
        this.currentPage = res.data.currentPage
        this.loading = false
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getListData()
    },
    handleCurrentPageChange(val) {
      this.pageindex = val
      this.getListData()
    },
    viewRow(row) {
      this.$router.push({
        name: 'outputinvoicedetailDelivery',
        params: {
          ticketno: row.ticketno
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
