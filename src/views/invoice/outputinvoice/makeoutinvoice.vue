<template lang="html">
  <div class="createPost-container">
    <sticky :className="'sub-navbar published'" >
      <template v-if="fetchSuccess">

        <el-button  style="margin-left: 10px;" type="success"@click="submitForm" size="small" :disabled="!planform.OutputInvoiceItems.length">提交</el-button>

      </template>
      <template v-else>
        <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
      </template>

    </sticky>
    <el-form  class="form-container" :model="planform" ref="postForm" label-width="86px" label-position="left" :rules="makeoutinvoiceRules">
      <div class="createPost-main-container">
        <item-title text="基本信息"/>
        <el-card v-loading="loading"  element-loading-text="加载中..." shadow="never" body-style="padding:12px" >
          <el-row>
            <el-col>
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label-width="110px" label="申请开票单号:" class="postInfo-container-item">
                      {{planform.OutputInvoice.applyinvoice}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label-width="110px" label="最迟开票日期:" class="postInfo-container-item">
                      {{planform.OutputInvoice.lastinvoicedate}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label-width="110px" label="申请开票金额:" class="postInfo-container-item">
                      ￥{{planform.OutputInvoice.planinvoiceamount}}
                    </el-form-item>
                  </el-col>
                    <el-col :span="6">
                    <el-form-item label-width="120px" label="实际开票金额:" class="postInfo-container-item">
                      ￥{{planform.OutputInvoice.invoiceamount}}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="客户:" class="postInfo-container-item">
                      {{planform.OutputInvoice.customername}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="单据状态:" class="postInfo-container-item">
                      {{planform.OutputInvoice.status|statusFilter}}
                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item label="税前金额:" class="postInfo-container-item">
                      ￥{{planform.OutputInvoice.pretaxamount}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="税额:" class="postInfo-container-item">
                      ￥{{planform.OutputInvoice.taxamount}}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" >
                    <el-form-item label="申请人:" class="postInfo-container-item">
                      {{planform.OutputInvoice.createuser}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-show="planform.OutputInvoice.checkuser">
                    <el-form-item label="审核人:" class="postInfo-container-item">
                      {{planform.OutputInvoice.checkuser}}
                    </el-form-item>
                  </el-col>

                  <el-col :span="6" v-show="planform.OutputInvoice.checkdate">
                    <el-form-item label="审核日期:" class="postInfo-container-item">
                      {{planform.OutputInvoice.checkdate}}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" >
                    <el-form-item label="发票号:" class="postInfo-container-item" prop="OutputInvoice.invoiceno">
                      <el-input type="text" v-model="planform.OutputInvoice.invoiceno" placeholder="请输入发票号"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="6" >
                    <el-form-item label="开票日期:" class="postInfo-container-item" prop="OutputInvoice.invoicedate">
                      <el-date-picker size="small" v-model="planform.OutputInvoice.invoicedate" type="date" format="yyyy-MM-dd" placeholder="选择日期时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item  label-width="45px" label="备注:">
                  <el-input type="textarea" size="small" class="article-textarea" :rows="1" autosize placeholder="请输入内容" v-model="planform.OutputInvoice.memos">
                  </el-input>
                </el-form-item>

              </div>
            </el-col>
          </el-row>
        </el-card>
       <item-title text="财务开票明细" style="margin-top:10px"/>

        <el-form-item style="margin-bottom: 40px;" label-width="0">
          <el-table
            :data="planform.OutputInvoiceItems"
            ref="OutputInvoiceTable"
            style="width: 100%"
            size="small"
            border
            max-height="600">
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
                <span >{{ scope.row.pretaxamount }}</span>
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
              label="税额"
              width="60">
              <template slot-scope="scope">
                <span >{{ scope.row.taxamount }}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="110"
              fixed="right"
              label="计划开票数量">
              <template slot-scope="scope">
                <span >{{ scope.row.planinvoicenum }}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="110"
              fixed="right"
              label="已开票数量">
              <template slot-scope="scope">
                <span >{{ scope.row.bakinvoicenum }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="本次开票数量"
              fixed="right"
              width="175">
              <template slot-scope="scope">
                <template v-if="scope.row.edit">
                  <el-input-number v-model="scope.row.invoicenum" :min="1" :max="scope.row.planinvoicenum - scope.row.bakinvoicenum" style="max-width: 150px" @change="reflashData"></el-input-number>
                </template>
                <span v-else>{{ scope.row.invoicenum }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="开票金额"
              fixed="right"
              width="80">
              <template slot-scope="scope">
                <span >{{ (scope.row.invoicenum * scope.row.price).toFixed(2) }}</span>
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
          </el-table>
        </el-form-item>
      </div>
    </el-form>

  </div>
</template>

<script>
import { getApplyMainDetail, addOrUpdateOutputInvoice, getCanOutputInvoice } from '@/api/invoice'
import { parseTime } from '@/utils'
import Modify from '@/utils/modify'
import Sticky from '@/components/Sticky' // 粘性header组件
import { mapGetters } from 'vuex'
export default {
  components: {
    Sticky
  },
  data() {
    return {
      planform: {
        OutputInvoice: {},
        OutputInvoiceItems: []
      },
      fetchSuccess: true,
      loading: false,
      makeoutinvoiceRules: {
        OutputInvoice: {
          invoiceno: [
            { required: true, message: '请输入发票号', trigger: 'blur' }
          ],
          invoicedate: [
            { required: true, message: '请选择开票日期', trigger: 'change' }
          ]
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      company: 'company',
      companyId: 'companyId',
      userInfo: 'userInfo',
      visitedViews: 'visitedViews'
    })
  },
  created() {
    this.getOutputInvoiceDetail()
  },
  methods: {
    Modify,
    reflashData() {
      let num = 0 // 实际开票金额
      let snum = 0 // 税额
      let pretaxamount = 0
      let invoicenum = 0 // 实际开票数量
      this.planform.OutputInvoiceItems.map(d => {
        num = num + d.invoicenum * d.price
        snum = snum + d.invoicenum * d.price - d.invoicenum * d.price / (1 + d.taxrate / 100)
        pretaxamount = pretaxamount + d.invoicenum * d.price / (1 + d.taxrate / 100)
        invoicenum = invoicenum + d.invoicenum
      })
      this.planform.OutputInvoice.invoiceamount = num.toFixed(2)
      this.planform.OutputInvoice.taxamount = snum.toFixed(2)
      this.planform.OutputInvoice.invoicenum = invoicenum.toFixed(2)
      this.planform.OutputInvoice.pretaxamount = pretaxamount.toFixed(2)
    },
    submitForm() {
      this.$refs['postForm'].validate((valid) => {
        if (valid) {
          const postData = { outputInvoice: this.planform.OutputInvoice, outputInvoiceItems: this.planform.OutputInvoiceItems }
          const view = this.visitedViews.filter(v => v.path === this.$route.path)
          if (postData.outputInvoice.invoicedate) {
            postData.outputInvoice.invoicedate = parseTime(postData.outputInvoice.invoicedate)
          }
          postData.outputInvoice.updateflag = 1
          addOrUpdateOutputInvoice(postData).then(
            res => {
              console.log(res)
              if (res.code === '200' && res.data) {
                this.$confirm('开票成功！', '提示', {
                  confirmButtonText: '详情',
                  cancelButtonText: '关闭',
                  type: 'success'
                }).then(
                  _ => {
                    this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                      this.$router.push({
                        name: 'outputinvoiceresultdetailDelivery',
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
            }
          ).catch(err => {
            console.log(err)
          })
        }
      })
    },
    nextpage(name, ticketno) {
      this.$router.push({
        name: name,
        params: {
          ticketno: this.$route.params.ticketno
        }
      })
    },
    async getOutputInvoiceDetail() {
      await getApplyMainDetail({
        ticketno: this.$route.params.ticketno
      }).then(res => {
        console.log(res)
        this.planform.OutputInvoice = res.data.data[0]
        this.planform.OutputInvoice.applyinvoice = this.planform.OutputInvoice.ticketno
        this.planform.OutputInvoice.ticketno = ''
        this.planform.OutputInvoice.status = 0
      }).catch(err => {
        console.log(err)
        this.fetchSuccess = false
      })
      await getCanOutputInvoice({
        ticketNo: this.$route.params.ticketno
      }).then(res => {
        console.log(res)
        const dt = res.data
        dt.map(d => {
          d.edit = true
          d.bakinvoicenum = d.invoicenum
          d.invoicenum = d.planinvoicenum - d.bakinvoicenum
          d.invoiceamount = d.invoicenum * d.price
          d.pretaxamount = parseFloat((d.invoicenum * d.price / (1 + d.taxrate / 100)).toFixed(2))
          d.taxamount = parseFloat((d.invoicenum * d.price - d.pretaxamount).toFixed(2))
        })
        this.planform.OutputInvoiceItems = dt
        this.reflashData()
      }).catch(err => {
        console.log(err)
        this.fetchSuccess = false
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
       .el-form-item{
        margin-bottom: 0;
      }
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
</style>
