<template lang="html">
<div class="app-container">
  <el-row>
    <el-card class="simpleCard" shadow="never" body-style="padding:12px" >
      <el-form :model="ruleForm" ref="searchForm" label-width="68px" label-position="left">
        <el-col :span="6">
          <el-form-item label="客户">
            <el-input v-model="ruleForm.customername" size="small" @focus="addServicer" placeholder="请选择客户" prefix-icon="el-icon-search"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-select v-model="ruleForm.status" size="small" filterable clearable placeholder="请选择单据状态" prefix-icon="el-icon-search">
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
          <el-form-item label="开票单号">
            <el-input type="text" size="small" v-model="ruleForm.ticketno" placeholder="请输入开票单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发票号">
            <el-input type="text" size="small" v-model="ruleForm.invoiceno" placeholder="请输入开票单号"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="6">
          <el-form-item label="开票人">
            <el-input type="text" size="small" v-model="ruleForm.createuser" placeholder="请输入开票人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开票日期">
            <el-date-picker
              v-model="ruleForm.createdate"
              type="date"
              size="small"
              placeholder="开票日期"
              :editable="false">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="最迟开票日期" label-width="110px">
            <el-date-picker
              v-model="ruleForm.postlastinvoicedate"
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
          <el-form-item label-width="0">
            <el-button type="primary" size="small" v-loading="loading" @click="onSubmit">查询</el-button>
            <el-button @click="onCancel" size="small">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
  </el-row>
  <el-row>
    <base-table 
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :loading="loading"
      :config="tableConfig"  
      :total="total" 
      :maxTotal="10"
      :pageSize="ruleForm.pagesize"
      :currentPage="ruleForm.pageindex"
      :tableData="tableData"/>
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
const ruleForm = {
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
    pagesize:10,
    pageindex:1,
    planinvoiceamount: null,
    planinvoicenum: null,
    postlastinvoicedate: null,
    pretaxamount: null,
    status: null,
    taxamount: null,
    ticketno: ''
}
import { parseTime, InvoiceType, Status } from '@/utils'
import { getOutMainDetail } from '@/api/invoice'
import { mapGetters } from 'vuex'
import CompanyChoice from '@/components/CompanyChoice'
import BaseTable from '@/components/Table' // table组件
export default {
  name: 'outputinvoicelist',
  components: {
    CompanyChoice,
    BaseTable
  },
  data() {
    return {
      ruleForm: ruleForm,
      invoicetype: InvoiceType,
      pagesize: 10,
      pageindex: 1,
      total: 0,
      currentPage: 1,
      loading: false,
      status: Status,
      addServicerShow: false,
      tableData:[],
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
    if(this.$route.query.data){
      this.ruleForm={...this.ruleForm,...JSON.parse(this.$route.query.data)}
    }
    if (!this.gridData.length) {
      this.$store.dispatch('GetGysList')
    }
    this.tableConfig=[
      { label:'开票单号',prop:'ticketno',dom:this.formatter('linkTo')},
      { label:'开票申请单号',prop:'applyinvoice',dom:this.formatter('linkToApply')},
      { label:'客户',prop:'customername'},
      { label:'发票号',prop:'invoiceno'},
      { label:'开票金额',prop:'invoiceamount'},
      { label:'开票数量',prop:'invoicenum'},
       { label:'发票类型',prop:'invoicetype',dom:this.formatter('invoicetypeFilter')},
      { label:'状态',prop:'status',dom:this.formatter('statusFilter')},
      { label:'最迟票日期',prop:'lastinvoicedate'},
      { label:'开票人',prop:'createuser'},
      { label:'开票日期',prop:'createdate'},
    ]
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
      this.ruleForm.pageindex = 1
      this.getListData()
    },
    onCancel() {
      this.ruleForm = ruleForm
      this.getListData()
    },
    addServicer() {
      this.addServicerShow = true
    },
    diClose() {
      this.addServicerShow = false
    },
    subCompany(row) {
      this.ruleForm.customer = row.requestid
      this.ruleForm.customername = row.name
    },
    formatter(type,value){
      switch(type){
        case 'invoicetypeFilter': return (row, column, cellValue, index)=>{
          return this.$options.filters['invoicetypeFilter'](cellValue) 
        };
        case 'statusFilter':return (row, column, cellValue, index)=>{
          return this.$options.filters['statusFilter'](cellValue) 
        };
        case 'linkToApply' :return  (row, column, cellValue, index)=>{
          let linkTo={
            path:`/invoice/outputinvoice/outputinvoicedetail/${row.applyinvoice}`,
          }
          return  <router-link  to={linkTo} style={{color:'#3399ea'}}>{value?value:cellValue}</router-link>
        };
        case 'linkTo':return  (row, column, cellValue, index)=>{
          let linkTo={
            path:`/invoice/outputinvoice/outputinvoiceresultdetail/${row.ticketno}`,
          }
          return  <router-link  to={linkTo} style={{color:'#3399ea'}}>{value?value:cellValue}</router-link>
        };
        default:return value
      }   
    },
    getListData() {
      const postData = this.ruleForm
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
       this.$router.replace({
          path:'/invoice/outputinvoice/outputinvoiceresultlist',
          query:{data:JSON.stringify(this.ruleForm)}
      })
      getOutMainDetail({ ...pData }).then(res => {
        this.tableData = res.data.data
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
      this.ruleForm={...this.ruleForm,pagesize:val,pageindex:1}
      this.getListData()
    },
    handleCurrentChange(val) {
      this.ruleForm={...this.ruleForm,pageindex:val}
      this.getListData()
    }
  }
}
</script>

<style lang="css">
</style>
