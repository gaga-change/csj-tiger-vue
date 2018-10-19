<template lang="html">
<div class="app-container">
  <el-row>
    <el-card class="simpleCard" shadow="never">
      <el-form :model="searchForm"  ref="searchForm" label-width="80px" label-postion="left">
        <el-row>
        <el-col :span="6">
          <el-form-item label="发票号码" >
            <el-input type="text" v-model="searchForm.inputInvoice.invoiceno" size="small" placeholder="请输入发票号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="供应商">
            <el-input v-model="searchForm.inputInvoice.servicername" size="small" @focus="addServicer" prefix-icon="el-icon-search"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-select v-model="searchForm.inputInvoice.status" size="small" filterable clearable placeholder="请选择单据状态" prefix-icon="el-icon-search">
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
          <el-form-item label="开票单号" >
            <el-input type="text" size="small" v-model="searchForm.inputInvoice.ticketno" placeholder="请输入开票单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="发票日期">
            <el-date-picker
              v-model="searchForm.inputInvoice.postinvoicedate"
              type="datetimerange"
              :editable="false"
              size="small"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建日期">
            <el-date-picker
              v-model="searchForm.inputInvoice.createdate"
              type="date"
              size="small"
              placeholder="创建日期"
              :editable="false">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" >
          <el-form-item label="创建人">
            <el-input type="text" size="small" v-model="searchForm.inputInvoice.createuser" placeholder="请输入创建人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="23" >
          <el-form-item label-width="0" class="simpleCardLastLine">
            <el-button type="primary" size="small" v-loading="loading" @click="onSubmit">查询</el-button>
            <el-button size="small" @click="onCancel">重置</el-button>
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
        label="开票单号"
        width="220">
        <template slot-scope="scope">
          <el-button type="text" @click="viewRow(scope.row)">{{scope.row.ticketno}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        label="发票号码">
        <template slot-scope="scope">
          <span>{{ scope.row.invoiceno }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        label="供应商">
        <template slot-scope="scope">
          <span>{{ scope.row.servicername }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="应开票金额"
        width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.planinvoiceamount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        label="实际开票金额">
        <template slot-scope="scope">
          <span>{{ scope.row.invoiceamount}}</span>
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
        label="发票日期"
        width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.invoicedate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="票到日期"
        width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.receivedate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建人"
        width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.createuser}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建日期"
        width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.createdate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核人"
        width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.checkuser }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核日期"
        width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.checkdate}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      size="small"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-row>
  <el-dialog
    title="选择供应商"
    :visible.sync="addServicerShow"
    center
    width="80%">
    <CompanyChoice @subCompany="subCompany" @diClose="diClose"></CompanyChoice>
  </el-dialog>
</div>
</template>

<script>
const InputInvoiceSearchForm = {
  inputInvoice: {
    checkadvice: '',
    checkdate: '',
    checkuser: '',
    createdate: '',
    createuser: '',
    enterprise: '',
    enterprisename: '',
    invoiceamount: '',
    invoicedate: '',
    invoiceno: '',
    invoicenum: '',
    invoicetype: '',
    invoiceuser: '',
    isdelete: '',
    memos: '',
    planinvoiceamount: '',
    planinvoicenum: '',
    pretaxamount: '',
    receivedate: '',
    receiveuser: '',
    servicer: '',
    servicername: '',
    status: '',
    taxamount: '',
    ticketno: ''
  }
}
import { parseTime, InvoiceType, Status } from '@/utils'
import { getMainDetail } from '@/api/invoice'
import { mapGetters } from 'vuex'
import CompanyChoice from '@/components/CompanyChoice'
export default {
  name: 'inputinvoicelist',
  components: {
    CompanyChoice
  },
  data() {
    return {
      searchForm: Object.assign({ postinvoicedate: null, postcreatedate: null }, InputInvoiceSearchForm),
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
  beforeMount() {
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
      this.getListData()
    },
    onCancel() {
      this.pageindex = 1
      this.searchForm = {
        inputInvoice: {
          checkadvice: '',
          checkdate: '',
          checkuser: '',
          createdate: '',
          createuser: '',
          enterprise: '',
          enterprisename: '',
          invoiceamount: '',
          invoicedate: '',
          invoiceno: '',
          invoicenum: '',
          invoicetype: '',
          invoiceuser: '',
          isdelete: '',
          memos: '',
          planinvoiceamount: '',
          planinvoicenum: '',
          pretaxamount: '',
          receivedate: '',
          receiveuser: '',
          servicer: '',
          servicername: '',
          status: '',
          taxamount: '',
          ticketno: ''
        }
      }
    },
    addServicer() {
      this.addServicerShow = true
    },
    diClose() {
      this.addServicerShow = false
    },
    subCompany(row) {
      this.searchForm.inputInvoice.servicer = row.requestid
      this.searchForm.inputInvoice.servicername = row.name
    },
    getListData() {
      const postData = this.searchForm.inputInvoice
      if (postData.postinvoicedate && postData.postinvoicedate.length) {
        postData.invoicestartdate = parseTime(postData.postinvoicedate[0])
        postData.invoiceenddate = parseTime(postData.postinvoicedate[1])
        postData.invoicedate = ''
      }
      if (postData.createdate && typeof (postData.createdate) === 'object') {
        postData.createdate = this.parseTime(postData.createdate, '{y}-{m}-{d}')
      }
      // if (postData.postcreatedate && postData.postcreatedate.length) {
      //   postData.createstartdate = parseTime(postData.postcreatedate[0])
      //   postData.createenddate = parseTime(postData.postcreatedate[1])
      //   postData.createdate = ''
      // }
      const pData = {}
      for (const item of Object.keys(postData)) {
        if (postData[item] !== null && postData[item] !== '') {
          pData[item] = postData[item]
          console.log(item,postData[item],'item');
          
        }
      }
      
      this.loading = true
      getMainDetail({ pagesize: this.pagesize, pageindex: this.pageindex, ...pData }).then(res => {
        
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
        name: 'inputinvoicedetailDelivery',
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
