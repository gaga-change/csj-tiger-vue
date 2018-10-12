<template lang="html">
<div class="app-container">
  <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">
    <template v-if="fetchSuccess">

      <el-button v-loading="loading" style="margin-left: 10px;" type="success" :disabled="!multipleSelection.length" @click="submitForm()">提交
      </el-button>

    </template>
    <template v-else>
      <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
    </template>

  </sticky>
  <el-row>
    <el-steps :active="-1"  simple >
      <el-step title="查询相应入库单" ></el-step>
      <el-step title="勾选开票相应单据" ></el-step>
      <el-step title="核对金额填写剩余信息" ></el-step>
    </el-steps>

    <el-card class="box-card" style="margin-top: 20px">
      <el-form :model="searchForm" :rules="searchRules" ref="searchForm" label-width="80px">
        <el-col :span="6">
          <el-form-item label="供应商" prop="servicer">
            <el-input v-model="searchForm.servicername" @focus="addServicer" placeholder="请选择供应商" prefix-icon="el-icon-search"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="采购单号" >
            <el-input type="text" v-model="searchForm.ticketNo" placeholder="请输入采购单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同编号" >
            <!-- <el-input type="text" v-model="searchForm.contractNo" placeholder="请输入合同编号"></el-input> -->
            <el-select v-model="searchForm.contractList" multiple placeholder="请选择">
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
          <el-form-item label="入库日期">
            <el-date-picker
              v-model="searchForm.postinstoredate"
              type="datetimerange"
              :editable="false"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="0">
            <el-button type="primary" v-loading="searchLoading" @click="onSubmit">查询</el-button>
            <el-button @click="onCancel">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
  </el-row>
    <div class="createPost-container">
      <div class="noresult" v-show="!inputInvoiceform.inputInvoiceItems.length">
        <i class="el-icon-search"></i>没有对应的入库单...
      </div>
      <el-form v-show="inputInvoiceform.inputInvoiceItems.length" class="form-container" :model="inputInvoiceform" :rules="rules" ref="postForm">
        <div class="createPost-main-container">
          <el-row>
            <el-col :span="21">

              <div class="postInfo-container">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label-width="110px" label="发票号:" class="postInfo-container-item" prop="inputInvoice.invoiceno">
                      <el-input type="text" v-model="inputInvoiceform.inputInvoice.invoiceno" placeholder="请输入发票号"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label-width="100px" label="发票日期:" class="postInfo-container-item" prop="inputInvoice.invoicedate">
                      <el-date-picker v-model="inputInvoiceform.inputInvoice.invoicedate" type="date" format="yyyy-MM-dd" placeholder="选择日期时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label-width="100px" label="到票日期:" class="postInfo-container-item" prop="inputInvoice.receivedate">
                      <el-date-picker v-model="inputInvoiceform.inputInvoice.receivedate" type="date" format="yyyy-MM-dd" placeholder="选择日期时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label-width="110px" label="实际开票金额:" class="postInfo-container-item">
                      <el-input-number :min="bakamount - 3 > 0 ? bakamount - 3 : 0" :max="bakamount + 3" v-model="invoiceamount" placeholder="请输入开票金额"  @change="setInvoiceamount($event)"></el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label-width="100px" label="税额:" class="postInfo-container-item">
                      <el-input placeholder="税额" style='min-width:220px;' :value="taxamount" disabled>
                      </el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label-width="100px" label="发票种类:" class="postInfo-container-item" prop="inputInvoice.invoicetype">
                      <el-select v-model="inputInvoiceform.inputInvoice.invoicetype" filterable clearable style="min-width:220px" placeholder="请选择发票种类" prefix-icon="el-icon-search">
                        <el-option
                          v-for="item in invoicetype"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label-width="110px" label="计划开票金额:" class="postInfo-container-item">
                      <el-input type="text" :value="planinvoiceamount" placeholder="计划开票金额" disabled></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label-width="100px" label="税前金额:" class="postInfo-container-item">
                      <el-input placeholder="税前金额" style='min-width:220px;' :value="pretaxamount" disabled>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

              </div>
            </el-col>
          </el-row>

          <el-form-item style="margin-bottom: 40px;" label-width="45px" label="备注:">
            <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入内容" v-model="inputInvoiceform.inputInvoice.memos">
            </el-input>
            <span class="word-counter" v-show="contentShortLength">{{contentShortLength}}字</span>
          </el-form-item>
          <el-form-item style="margin-bottom: 40px;" label-width="0">
            <el-table
              :data="inputInvoiceform.inputInvoiceItems"
              @selection-change="handleSelectionChange"
              ref="inputInvoiceTable"
              :row-class-name="rowClass"
              style="width: 100%"
              border
              max-height="600">
              <el-table-column
                type="selection"
                :selectable="checkSelectable"
                fixed="left"
                width="55">
              </el-table-column>
              <el-table-column
                label="入库单号"
                width="160">
                <template slot-scope="scope">
                  <span >{{ scope.row.inorder }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="采购订单号"
                width="160">
                <template slot-scope="scope">
                  <span >{{ scope.row.purchorder }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="采购合同号"
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
                width="110"
                label="大类">
                <template slot-scope="scope">
                  <template v-if="scope.row.edit">
                    <el-input v-model="scope.row.bigcategoryname" style="max-width: 150px"></el-input>
                  </template>
                  <span v-else>{{ scope.row.bigcategoryname }}</span>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                width="110"
                label="计划开票数量">
                <template slot-scope="scope">
                  <span >{{ scope.row.planinvoicenum }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="本次开票数量"
                fixed="right"
                width="175">
                <template slot-scope="scope">
                  <template v-if="scope.row.edit">
                    <el-input-number v-model="scope.row.invoicenum" :min="1" :max="scope.row.planinvoicenum" style="max-width: 150px" @change="reflashData"></el-input-number>
                  </template>
                  <span v-else>{{ scope.row.invoicenum }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="开票金额"
                fixed="right"
                width="80">
                <template slot-scope="scope">
                  <span >{{ scope.row.invoicenum * scope.row.price }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </div>
      </el-form>

    </div>
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
import CompanyChoice from '@/components/CompanyChoice'
const InputInvoiceData = {
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
    ticketno: '',
    verifyamount: 0
  },
  inputInvoiceItems: [
    // {
    //   bigcategoryname: '',
    //   contractno: '',
    //   custommaterialno: '',
    //   id: '',
    //   inorder: '',
    //   inorderitemid: '',
    //   invoiceamount: '',
    //   invoicenum: '',
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
    //   purchorder: '',
    //   taxamount: '',
    //   taxrate: '',
    //   ticketno: ''
    // }
  ]
}
let searchForm = {
  postinstoredate: null, // 入库时间
  servicer: null, // 供应商
  servicername: null,
  contractList: [], // 合同编号
  ticketNo: null // 采购单号
}
const InputInvoiceMultipleSelection = []
import Sticky from '@/components/Sticky' // 粘性header组件
import { parseTime, InvoiceType } from '@/utils'
import { createInputInvoice, addOrUpdateInputInvoice, ContractNoByService } from '@/api/invoice'
import { mapGetters } from 'vuex'
export default {
  name: 'newinputinvoice',
  components: {
    CompanyChoice,
    Sticky
  },
  data() {
    return {
      inputInvoiceform: Object.assign({}, InputInvoiceData),
      searchForm: Object.assign({}, searchForm),
      addServicerShow: false,
      fetchSuccess: true,
      invoicetype: InvoiceType,
      loading: false,
      rules: {
        inputInvoice: {
          invoicetype: [
            { required: true, message: '请选择发票类型', trigger: 'change' }
          ],
          receivedate: [
            { required: true, message: '请选择票到日期', trigger: 'change' }
          ],
          invoicedate: [
            { required: true, message: '请选择发票日期', trigger: 'change' }
          ],
          invoiceno: [
            { required: true, message: '请输入发票号', trigger: 'blur' }
          ]
        }
      },
      multipleSelection: InputInvoiceMultipleSelection,
      searchLoading: false,
      searchRules: {
        servicer: [
          { required: true, message: '请选择供应商', trigger: 'change' }
        ]
      },
      contractList: [],
      planinvoiceamount: null,
      invoiceamount: null,
      pretaxamount: null, // 税前金额
      taxamount: null // 税额合计
    }
  },
  computed: {
    contentShortLength() {
      return this.inputInvoiceform.inputInvoice.memos.length
    },
    bakamount() {
      let invoiceamount = 0
      this.inputInvoiceform.inputInvoiceItems.map(frow => {
        invoiceamount = invoiceamount + frow.invoicenum * frow.price
      })
      return invoiceamount
    },
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
    this.reflashData()
    this.$nextTick(() => {
      this.multipleSelection.map(row => {
        this.$refs['inputInvoiceTable'].toggleRowSelection(row, true)
      })
    })
  },
  methods: {
    parseTime,
    checkSelectable(row) {
      return row.planinvoicenum > 0
    },
    rowClass(row) {
      return row.edit ? 'checkedrow' : ''
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
      })
    },
    setInvoiceamount(e) {
      if (e - this.bakamount < 3 && e > 0 && e - this.bakamount > -3) {
        this.invoiceamount = e
      }
    },
    getPlaninvoiceamount() {
      let planinvoiceamount = 0
      this.multipleSelection.map(frow => {
        planinvoiceamount = planinvoiceamount + frow.planinvoiceamount
      })
      this.planinvoiceamount = planinvoiceamount.toFixed(2)
    },
    getTaxamount() {
      let taxamount = 0
      this.inputInvoiceform.inputInvoiceItems.map(frow => {
        taxamount = taxamount + frow.invoicenum * frow.price - frow.invoicenum * frow.price / (1 + frow.taxrate / 100)
      })
      this.taxamount = taxamount.toFixed(2)
    },
    getPretaxamount() {
      let pretaxamount = 0
      this.inputInvoiceform.inputInvoiceItems.map(frow => {
        pretaxamount = pretaxamount + frow.invoicenum * frow.price / (1 + frow.taxrate / 100)
      })
      this.pretaxamount = pretaxamount.toFixed(2)
    },
    getInvoiceamount() {
      let invoiceamount = 0
      this.inputInvoiceform.inputInvoiceItems.map(frow => {
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
          this.inputInvoiceform.inputInvoiceItems.map(frow => {
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
        this.inputInvoiceform.inputInvoiceItems.map(frow => {
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
      this.searchForm.servicer = row.requestid
      this.searchForm.servicername = row.name
      this.getContractList(row.requestid)
    },
    // 根据公司获取合同编号集合
    getContractList(requestid) {
      ContractNoByService({ enterprice: requestid }).then(res => {
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
            servicer: this.searchForm.servicer ? this.searchForm.servicer : null, // 供应商
            contractList: this.searchForm.contractList.length ? this.searchForm.contractList : null, // 合同编号
            ticketNo: this.searchForm.ticketNo ? this.searchForm.ticketNo : null, // 采购单号
            instartdate: this.searchForm.postinstoredate ? parseTime(this.searchForm.postinstoredate[0]) : null,
            inenddate: this.searchForm.postinstoredate ? parseTime(this.searchForm.postinstoredate[1]) : null
          }
          createInputInvoice(postData).then(
            res => {
              console.log(res)
              this.searchLoading = false
              if (res.data.length) {
                res.data.map((d, index) => {
                  d.index = index
                })
                this.inputInvoiceform.inputInvoiceItems = res.data
              } else {
                this.$message.warning('未查询到入库单,请选择其他供应商再试')
                this.inputInvoiceform.inputInvoiceItems = []
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
      searchForm = {
        postinstoredate: null, // 入库时间
        servicer: null, // 供应商
        servicername: null,
        contractList: [], // 合同编号
        ticketNo: null // 采购单号
      }
      this.contractList = []
      this.searchForm = Object.assign({}, searchForm)
    },
    submitForm() {
      this.$refs['postForm'].validate((valid) => {
        if (valid) {
          if (Date.parse(this.inputInvoiceform.inputInvoice.receivedate) < Date.parse(this.inputInvoiceform.inputInvoice.invoicedate)) {
            this.$message.error('发票日期不能在收票日期之后')
            return false
          }
          const postData = Object.assign({}, this.inputInvoiceform)
          const subitems = []
          postData.inputInvoice.servicer = this.searchForm.servicer
          postData.inputInvoice.servicername = this.searchForm.servicername
          postData.inputInvoice.enterprise = this.companyId
          postData.inputInvoice.enterprisename = this.company
          postData.inputInvoice.createuser = this.userInfo.truename
          postData.inputInvoice.invoicedate = this.parseTime(postData.inputInvoice.invoicedate)
          postData.inputInvoice.receivedate = this.parseTime(postData.inputInvoice.receivedate)
          postData.inputInvoice.invoiceamount = this.invoiceamount
          postData.inputInvoiceItems.map(item => {
            this.multipleSelection.map(mulitem => {
              if (mulitem.index === item.index) {
                subitems.push(item)
              }
            })
          })
          postData.inputInvoiceItems = subitems
          this.loading = true
          const view = this.visitedViews.filter(v => v.path === this.$route.path)
          addOrUpdateInputInvoice(postData).then(res => {
            console.log(res)
            this.loading = false
            if (res.code === '200' && res.data) {
              this.$confirm('新建进项发票成功！', '提示', {
                confirmButtonText: '详情',
                cancelButtonText: '关闭',
                type: 'success'
              }).then(
                _ => {
                  this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                    this.$router.push({
                      name: 'inputinvoicedetail',
                      params: {
                        ticketno: res.data
                      }
                    })
                  })
                }
              ).catch(_ => {
                this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                  this.$router.push('/')
                })
              })
            }
          }).catch(err => {
            console.log(err)
            this.loading = false
          })
        }
      })
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
  .checkedrow {
    background: #c0c4cc;
  }
</style>
