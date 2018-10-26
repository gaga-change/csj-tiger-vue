<template lang="html">
<div class="app-container">
  <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">
    <template v-if="fetchSuccess">

      <el-button v-loading="loading" style="margin-left: 10px;" size="small" type="success" @click="submitForm()" :disabled="!canSubmit">提交
      </el-button>
      <!-- <el-button v-loading="loading" type="warning" @click="draftForm">保存草稿</el-button> -->

    </template>
    <template v-else>
      <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
    </template>

  </sticky>
  <el-row>
    <el-steps :active="stepActive"  simple finish-status="success">
      <el-step title="查询相应出库单" ></el-step>
      <el-step title="勾选开票相应单据" ></el-step>
      <el-step title="核对金额填写剩余信息" ></el-step>
    </el-steps>
</el-row>
    <el-card class="simpleCard" shadow="never" body-style="padding:12px;margin-top: 20px;">
      <el-form :model="searchForm" :rules="searchRules" ref="searchForm" label-width="68px" label-position="left">
      <el-row>
        <el-col :span="6">
          <el-form-item label="客户" prop="customer">
            <el-input v-model="searchForm.customername" size="small" @focus="addServicer" prefix-icon="el-icon-search" placeholder="请选择客户"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="销售单号" >
            <el-input type="text" size="small" v-model="searchForm.ticketNo" placeholder="请输入销售单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同编号" >
            <el-select size="mini" v-model="searchForm.contractList" multiple placeholder="请选择">
              <el-option
                v-for="item in contractList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出库日期">
            <el-date-picker
              v-model="searchForm.postoutstoredate"
              type="datetimerange"
              :editable="false"
              size="small"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label-width="0" class="simpleCardLastLine">
            <el-button type="primary" v-loading="searchLoading" @click="onSubmit" size="small">查询</el-button>
            <el-button @click="onCancel" size="small">重置</el-button>
          </el-form-item>
        </el-col>
         </el-row>
      </el-form>
    </el-card>
 
    <div class="createPost-container">
      <div class="noresult" v-show="!outputInvoiceform.outputInvoiceItems.length">
        <i class="el-icon-search"></i>没有对应的出库单...
      </div>
      <el-form v-show="outputInvoiceform.outputInvoiceItems.length" class="form-container" :model="outputInvoiceform" :rules="rules" ref="postForm" label-position="left">
        <div class="createPost-main-container">
          <el-row>
            <el-col>

              <div class="postInfo-container">
                <el-row>
                  <!-- <el-col :span="8">
                    <el-form-item label-width="110px" label="税额:" class="postInfo-container-item">
                      <el-input placeholder="税额" style='min-width:220px;' :value="taxamount" disabled>
                      </el-input>
                    </el-form-item>
                  </el-col> -->

                  <el-col :span="8">
                    <el-form-item label-width="110px" label="发票种类:" class="postInfo-container-item" prop="outputInvoice.invoicetype">
                      <el-select v-model="outputInvoiceform.outputInvoice.invoicetype" 
                      size="small" style='min-width:220px;' filterable clearable placeholder="请选择发票种类" prefix-icon="el-icon-search">
                        <el-option
                          v-for="item in invoicetype"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label-width="120px" label="计划开票金额:" class="postInfo-container-item">
                      <el-input type="text" size="small" :value="planinvoiceamount" style='min-width:220px;' placeholder="计划开票金额" disabled></el-input>
                    </el-form-item>
                  </el-col>

                  <!-- <el-col :span="8">
                    <el-form-item label-width="110px" label="税前金额:" class="postInfo-container-item">
                      <el-input placeholder="税前金额" style='min-width:220px;' :value="pretaxamount" disabled>
                      </el-input>
                    </el-form-item>
                  </el-col> -->
                  <el-col :span="8">
                    <el-form-item label-width="130px" size="small" label="计划开票数量:" class="postInfo-container-item">
                      <el-input placeholder="计划开票数量" style='min-width:200px;' :value="planinvoicenum" disabled>
                      </el-input>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label-width="110px" label="折扣金额合计:" class="postInfo-container-item">
                      <el-input type="number" size="small" v-model="outputInvoiceform.outputInvoice.discountamount" style='min-width:220px;'  placeholder="请输入折扣金额合计"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label-width="120px" label="最迟开票日期:" class="postInfo-container-item">
                      <el-date-picker size="small" v-model="outputInvoiceform.outputInvoice.lastinvoicedate" type="date" format="yyyy-MM-dd" placeholder="选择日期时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

              </div>
            </el-col>
          </el-row>

          <el-form-item style="margin-bottom: 40px;" label-width="45px" label="备注:">
            <el-input type="textarea" size="small"  class="article-textarea" :rows="1" autosize placeholder="请输入内容" v-model="outputInvoiceform.outputInvoice.memos">
            </el-input>
            <span class="word-counter" v-show="contentShortLength">{{contentShortLength}}字</span>
          </el-form-item>
          <el-form-item style="margin-bottom: 40px;" label-width="0">
            <el-table
              :data="outputInvoiceform.outputInvoiceItems"
              @selection-change="handleSelectionChange"
              ref="outputInvoiceTable"
              style="width: 100%"
              size="small" 
              border
              max-height="600">
              <el-table-column
                type="selection"
                fixed="left"
                :selectable="checkSelectable"
                width="55">
              </el-table-column>
              <el-table-column
                label="出库单号"
                width="160">
                <template slot-scope="scope">
                  <span >{{ scope.row.outorder }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="销售订单号"
                width="160">
                <template slot-scope="scope">
                  <span >{{ scope.row.saleorder }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="销售合同号"
                width="120">
                <template slot-scope="scope">
                  <span >{{ scope.row.contractno }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="物料名称"
                width="200">
                <template slot-scope="scope">
                  <span >{{ scope.row.materialname }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="物料规格"
                width="200">
                <template slot-scope="scope">
                  <span >{{ scope.row.materialrule }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="单位"
                width="80">
                <template slot-scope="scope">
                  <span >{{ scope.row.orderunit }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="含税单价"
                width="100">
                <template slot-scope="scope">
                  <span >{{ scope.row.price }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="含税金额"
                width="100">
                <template slot-scope="scope">
                  <span >{{ scope.row.planinvoiceamount }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="税率"
                width="60">
                <template slot-scope="scope">
                  <span >{{ scope.row.taxrate }}</span>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                width="120"
                label="可申请开票数量">
                <template slot-scope="scope">
                  <span >{{ scope.row.planinvoicenum }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="本次申请开票数量"
                fixed="right"
                width="175">
                <template slot-scope="scope">
                  <template v-if="scope.row.edit">
                    <el-input-number size="small"  v-model="scope.row.invoicenum" :min="1" :max="scope.row.planinvoicenum" style="max-width: 150px" @change="reflashData"></el-input-number>
                  </template>
                  <span v-else>{{ scope.row.invoicenum }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="申请开票金额"
                fixed="right"
                width="150">
                <template slot-scope="scope">
                  <span >{{ (scope.row.invoicenum * scope.row.price).toFixed(2) }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </div>
      </el-form>

    </div>
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
import CompanyChoice from '@/components/CompanyChoice'
let OutputInvoiceData = {
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
    ticketno: '',
    lastinvoicedate: '',
    verifyamount: 0
  },
  outputInvoiceItems: [
    // {
    //   bigcategoryname: '',
    //   contractno: '',
    //   custommaterialno: '',
    //   id: '',
    //   outorder: '',
    //   outorderitemid: '',
    //   invoiceamount: 0,
    //   invoicenum: 0,
    //   itemno: '',
    //   material: '',
    //   materialname: '',
    //   materialno: '',
    //   materialrule: '',
    //   materialsize: '',
    //   materialtag: '',
    //   orderunit: '',
    //   planinvoiceamount: '',
    //   planinvoicenum: '',
    //   pretaxamount: '',
    //   price: '',
    //   saleorder: '',
    //   taxamount: 0,
    //   taxrate: 0,
    //   ticketno: ''
    // }
  ]
}
let OutputInvoiceSearchForm = {
  postoutstoredate: null, // 出库时间
  customer: '', // 客户
  customername: '',
  contractList: null, // 合同编号
  ticketNo: null // 销售单号
}
let OutputInvoiceMultipleSelection = []
import Sticky from '@/components/Sticky' // 粘性header组件
import { parseTime, InvoiceType } from '@/utils'
import { createOutputInvoice, addOrUpdateApplyInvoice, ContractNoByCustomer } from '@/api/invoice'
import { mapGetters } from 'vuex'
export default {
  name: 'newoutputinvoice',
  components: {
    CompanyChoice,
    Sticky
  },
  data() {
    return {
      outputInvoiceform: Object.assign({}, OutputInvoiceData),
      searchForm: Object.assign({}, OutputInvoiceSearchForm),
      addServicerShow: false,
      fetchSuccess: true,
      invoicetype: InvoiceType,
      loading: false,
      stepActive:0,
      rules: {
        outputInvoice: {
          invoicetype: [
            { required: true, message: '请选择发票类型', trigger: 'change' }
          ]
        }
      },
      multipleSelection: OutputInvoiceMultipleSelection,
      searchLoading: false,
      searchRules: {
        customer: [
          { required: true, message: '请选择客户', trigger: 'change' }
        ]
      },
      contractList: [],
      planinvoiceamount: null,
      invoiceamount: null,
      pretaxamount: null, // 税前金额
      taxamount: null, // 税额合计
      planinvoicenum: null
    }
  },
  computed: {
    contentShortLength() {
      return this.outputInvoiceform.outputInvoice.memos.length
    },
    ...mapGetters({
      company: 'company',
      companyId: 'companyId',
      userInfo: 'userInfo',
      visitedViews: 'visitedViews',
      revstoreList: 'storeList',
      gridData: 'gysList'
    }),
     canSubmit(){
       if(this.multipleSelection&&this.multipleSelection.length>0){
          this.stepActive = 2
        if(this.outputInvoiceform.outputInvoice.invoicetype){
                  this.stepActive = 3
                  return true
              }else{
                this.stepActive = 2
                return false
              }
        }else{
          return false
        }
      
    }
  },
  watch:{
    multipleSelection(){
      if(this.multipleSelection&&this.multipleSelection.length>0){
        this.stepActive = 2
      }else{
        if(this.stepActive!=0){
            this.stepActive = 1
        }
        
      }
    }
  },
  // watch: {
  //   multipleSelection(val, oldvalue) {
  //     this.outputInvoiceform.outputInvoiceItems.map(frow => {
  //       frow.edit = false
  //       frow.invoicenum = 0
  //     })
  //     val.map(row => {
  //       this.outputInvoiceform.outputInvoiceItems.map(frow => {
  //         if (row.index === frow.index) {
  //           frow.edit = true
  //         }
  //       })
  //     })
  //     this.reflashData()
  //   }
  // },
  created() {
    this.reflashData()
    this.$nextTick(() => {
      this.multipleSelection.map(row => {
        this.$refs['outputInvoiceTable'].toggleRowSelection(row, true)
      })
    })
  },
  methods: {
    parseTime,
    checkSelectable(row) {
      return row.planinvoicenum > 0
    },
    reflashData() {
      this.$nextTick(() => {
        this.getPlaninvoiceamount()
        // 计算开票金额
        this.getInvoiceamount()
        // 计算税前金额
        this.getPretaxamount()
        // 计算税额
        this.getTaxamount()
        // 计算计划开票数量
        this.getPlaninvoicenum()
      })
    },
    getPlaninvoiceamount() {
      let planinvoiceamount = 0
      this.multipleSelection.map(frow => {
        planinvoiceamount = planinvoiceamount + frow.invoicenum * frow.price
      })
      this.planinvoiceamount = planinvoiceamount.toFixed(2)
    },
    getTaxamount() {
      let taxamount = 0
      this.outputInvoiceform.outputInvoiceItems.map(frow => {
        taxamount = taxamount + frow.invoicenum * frow.price - frow.invoicenum * frow.price / (1 + frow.taxrate / 100)
      })
      this.taxamount = taxamount.toFixed(2)
    },
    getPretaxamount() {
      let pretaxamount = 0
      this.outputInvoiceform.outputInvoiceItems.map(frow => {
        pretaxamount = pretaxamount + frow.invoicenum * frow.price / (1 + frow.taxrate / 100)
      })
      this.pretaxamount = pretaxamount.toFixed(2)
    },
    getPlaninvoicenum() {
      let planinvoicenum = 0
      this.outputInvoiceform.outputInvoiceItems.map(frow => {
        planinvoicenum = planinvoicenum + frow.invoicenum
      })
      this.planinvoicenum = planinvoicenum
    },
    getInvoiceamount() {
      let invoiceamount = 0
      this.outputInvoiceform.outputInvoiceItems.map(frow => {
        invoiceamount = invoiceamount + frow.invoicenum * frow.price
      })
      this.invoiceamount = invoiceamount.toFixed(2)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      const indexs = []
      val.map(frow => {
        indexs.push(frow.index)
      })
      if (val.length) {
        val.map(row => {
          this.outputInvoiceform.outputInvoiceItems.map(frow => {
            if (indexs.includes(frow.index)) {
              if (!frow.invoicenum) {
                frow.invoicenum = frow.planinvoicenum
              }
              frow.edit = true
            } else {
              frow.invoicenum = 0
              frow.edit = false
            }
          })
        })
      } else {
        this.outputInvoiceform.outputInvoiceItems.map(frow => {
          frow.invoicenum = 0
          frow.edit = false
        })
      }
      this.reflashData()
    },
    addServicer() {
      this.addServicerShow = true
    },
    diClose() {
      this.addServicerShow = false
    },
    subCompany(row) {
      this.searchForm.customer = row.requestid
      this.searchForm.customername = row.name
      this.getContractList(row.requestid)
    },
    // 根据公司获取合同编号集合
    getContractList(requestid) {
      ContractNoByCustomer({ enterprice: requestid }).then(res => {
        console.log(res)
        this.contractList = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    onSubmit() {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          this.searchLoading = true
          const postData = {
            customer: this.searchForm.customer ? this.searchForm.customer : null, // 供应商
            contractList: this.searchForm.contractList.length ? this.searchForm.contractList : null, // 合同编号
            ticketNo: this.searchForm.ticketNo ? this.searchForm.ticketNo : null, // 采购单号
            begindate: this.searchForm.postoutstoredate ? parseTime(this.searchForm.postoutstoredate[0]) : null,
            enddate: this.searchForm.postoutstoredate ? parseTime(this.searchForm.postoutstoredate[1]) : null
          }
          createOutputInvoice(postData).then(
            res => {
              console.log(res)
              this.searchLoading = false
              if (res.data.length) {
                res.data.map((d, index) => {
                  d.index = index
                })
                this.outputInvoiceform.outputInvoiceItems = res.data
                this.stepActive = 1;
                
              } else {
                this.stepActive = 0;
                this.$message({ message: '未查询到相关出库单', type: 'warning' })
                this.outputInvoiceform.outputInvoiceItems = []
              }
            }
          ).catch(err => {
            console.log(err)
            this.searchLoading = false
          })
        }
      })
    },
    onCancel() {
      OutputInvoiceSearchForm = {
        postoutstoredate: null, // 入库时间
        customer: '', // 客户
        customername: '',
        contractNo: null, // 合同编号
        ticketNo: null // 销售单号
      }
      this.searchForm = Object.assign({}, OutputInvoiceSearchForm)
    },
    submitForm() {
      this.$refs['postForm'].validate((valid) => {
        if (valid) {
          const postData = Object.assign({}, this.outputInvoiceform)
          const subitems = []
          postData.outputInvoice.customer = this.searchForm.customer
          postData.outputInvoice.customername = this.searchForm.customername
          postData.outputInvoice.enterprise = this.companyId
          postData.outputInvoice.enterprisename = this.company
          postData.outputInvoice.createuser = this.userInfo.truename
          postData.outputInvoice.lastinvoicedate = this.parseTime(postData.outputInvoice.lastinvoicedate)
          postData.outputInvoice.planinvoicenum = this.planinvoicenum
          postData.outputInvoice.planinvoiceamount = this.planinvoiceamount
          postData.outputInvoiceItems.map(item => {
            this.multipleSelection.map(mulitem => {
              if (mulitem.index === item.index) {
                item.planinvoicenum = item.invoicenum
                item.planinvoiceamount = parseFloat((item.invoicenum * item.price).toFixed(2))
                subitems.push(item)
              }
            })
          })
          postData.outputInvoiceItems = subitems
          this.loading = true
          const view = this.visitedViews.filter(v => v.path === this.$route.path)
          addOrUpdateApplyInvoice({
            applyInvoice: postData.outputInvoice,
            applyInvoiceItemList: postData.outputInvoiceItems
          }).then(res => {
            console.log(res)
            this.loading = false
            if (res.code === '200' && res.data) {
              this.$confirm('申请销项发票成功！', '提示', {
                // confirmButtonText: '详情',
                confirmButtonText: '列表页',
                cancelButtonText: '关闭',
                type: 'success'
              }).then(
                _ => {
                  this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                    this.$router.push({
                      // name: 'outputinvoicedetail',
                      // params: {
                      //   ticketno: res.data
                      // }
                      name:'outputinvoicelistDelivery'
                    })
                  })
                }
              ).catch(_ => {
                this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                  this.$router.push('/')
                })
              })
            }
            OutputInvoiceData = {
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
                ticketno: '',
                verifyamount: null
              },
              outputInvoiceItems: []
            }
            OutputInvoiceSearchForm = {
              postoutstoredate: null, // 入库时间
              customer: null, // 供应商
              customername: null,
              contractNo: null, // 合同编号
              ticketNo: null // 销售单号
            }
            OutputInvoiceMultipleSelection = []
          }).catch(err => {
            console.log(err)
            this.loading = false
          })
        }
      })
    },
    draftForm() {
      OutputInvoiceData = this.outputInvoiceform
      OutputInvoiceSearchForm = this.searchForm
      OutputInvoiceMultipleSelection = this.multipleSelection
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .title-prompt{
    position: absolute;
    right: 0px;
    font-size: 12px;
    top:10px;
    color:#ff4949;
  }
  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
        .editor-upload-btn-container {
            text-align: right;
            margin-right: 10px;
            .editor-upload-btn {
                display: inline-block;
            }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
  .noresult {
    height: 450px;
    border: #eee 1px solid;
    color: #c0c4cc;
    margin-top: 20px;
    text-align: center;
    line-height: 450px;
    background: #f7f7f7;
  }
</style>
