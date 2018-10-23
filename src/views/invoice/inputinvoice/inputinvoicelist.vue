<template lang="html">
<div class="app-container">
  <el-row>
    <el-card class="simpleCard" shadow="never" body-style="padding:12px">
      <el-form :model="ruleForm"  ref="ruleForm" label-width="80px" label-postion="left">
        <el-row>
        <el-col :span="6">
          <el-form-item label="发票号码" >
            <el-input type="text" v-model="ruleForm.invoiceno" size="small" placeholder="请输入发票号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="供应商">
            <el-input v-model="ruleForm.servicername" size="small" @focus="addServicer" prefix-icon="el-icon-search"></el-input>
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
          <el-form-item label="开票单号" >
            <el-input type="text" size="small" v-model="ruleForm.ticketno" placeholder="请输入开票单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="发票日期">
            <el-date-picker
              v-model="ruleForm.postinvoicedate"
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
              v-model="ruleForm.createdate"
              type="date"
              size="small"
              placeholder="创建日期"
              :editable="false">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" >
          <el-form-item label="创建人">
            <el-input type="text" size="small" v-model="ruleForm.createuser" placeholder="请输入创建人"></el-input>
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
     <base-table 
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :loading="loading"
      :config="tableConfig"  
      :total="total" 
      :maxTotal="10"
      :totaldata="totaldata"
      :pageSize="ruleForm.pagesize"
      :currentPage="ruleForm.pageindex"
      :tableData="tableData"/>
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
const ruleForm = {
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
    postinvoicedate: null, 
    postcreatedate: null,
    pretaxamount: '',
    receivedate: '',
    receiveuser: '',
    servicer: '',
    servicername: '',
    status: '',
    taxamount: '',
    ticketno: ''
}
import { parseTime, InvoiceType, Status } from '@/utils'
import { getMainDetail } from '@/api/invoice'
import { mapGetters } from 'vuex'
import CompanyChoice from '@/components/CompanyChoice'
import BaseTable from '@/components/Table' // table组件

export default {
  name: 'inputinvoicelist',
  components: {
    CompanyChoice,
    BaseTable
  },
  data() {
    return {
      ruleForm: ruleForm,
      invoicetype: InvoiceType,
      list: [],
      pagesize: 10,
      pageindex: 1,
      total: 0,
      currentPage: 1,
      loading: false,
      status: Status,
      addServicerShow: false,
      tableData:[],
      totaldata:{ amount:0, interestrate:0, payamount:0 },
      tableConfig:[],
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
    if(this.$route.query.data){
        this.ruleForm={...this.ruleForm,...JSON.parse(this.$route.query.data)}
    }

    if (!this.gridData.length) {
      this.$store.dispatch('GetGysList')
    }
      this.tableConfig=[
      { label:'开票单号',prop:'ticketno',dom:this.formatter('linkTo')},
      { label:'发票号码',prop:'invoiceno'},
      { label:'供应商',prop:'servicername'},
      { label:'应开票金额',prop:'planinvoiceamount'},
      { label:'实际开票金额',prop:'invoiceamount'},
      { label:'状态',prop:'status',dom:this.formatter('statusFilter')},
      { label:'发票日期',prop:'invoicedate'},
      { label:'票到日期',prop:'receivedate'},
      { label:'创建人',prop:'createuser'},
      { label:'创建日期',prop:'createdate'},
      { label:'审核人',prop:'checkuser'},
      { label:'审核日期',prop:'checkdate'},
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
       this.$router.replace({
          path:'/invoice/inputinvoice/inputinvoicelist',
          query:{data:JSON.stringify(this.ruleForm)}
        })
         this.pageindex = 1
        this.getListData()
    },
    addServicer() {
      this.addServicerShow = true
    },
    diClose() {
      this.addServicerShow = false
    },
    subCompany(row) {
      this.ruleForm.servicer = row.requestid
      this.ruleForm.servicername = row.name
    },
        formatter(type,value){
            switch(type){
              case 'fundnatureFilter':return (row, column, cellValue, index)=>{
               return this.$options.filters['fundnatureFilter'](cellValue) 
              };
              case 'fundtypeFilter':return (row, column, cellValue, index)=>{
               return this.$options.filters['fundtypeFilter'](cellValue) 
              };
               case 'settlementmethodFilter':return (row, column, cellValue, index)=>{
                return this.$options.filters['settlementmethodFilter'](cellValue) 
              };
               case 'statusFilter':return (row, column, cellValue, index)=>{
                return this.$options.filters['statusFilter'](cellValue) 
              };
              case 'businesstypeFilter':return (row, column, cellValue, index)=>{
                return this.$options.filters['businesstypeFilter'](cellValue) 
              };
              case 'linkTo' :return  (row, column, cellValue, index)=>{
              
                let linkTo={
                  path:`/invoice/inputinvoice/inputinvoicedetail/${row.ticketno}`,
                }
                return  <router-link  to={linkTo} style={{color:'#3399ea'}}>{value?value:cellValue}</router-link>
              };
              default:return value
            }
         
       },
      
    getListData() {
      const postData = this.ruleForm
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
      },
  }
}
</script>

<style lang="css">
</style>
