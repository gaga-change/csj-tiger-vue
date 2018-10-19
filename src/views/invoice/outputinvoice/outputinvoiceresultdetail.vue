<template lang="html">
  <div class="createPost-container">
    <sticky :className="'sub-navbar published'" >
      <template v-if="fetchSuccess">

        <template v-if="planform.OutputInvoice.status == -1 || planform.OutputInvoice.status == -2">
          <el-button  style="margin-left: 10px;" type="warning" size="small"
            @click="Modify(3, 'OutputInvoice')" :disabled="!$haspermission('outputInvoiceResultDelete')">删除</el-button>
          <!-- <el-button  style="margin-left: 10px;" type="primary"  @click="Edit">修改</el-button> -->
        </template>
        <template v-else-if="planform.OutputInvoice.status == 0">
          <el-button  style="margin-left: 10px;" type="primary"  size="small"@click="Modify(0, 'OutputInvoice', true)" :disabled="!$haspermission('outputInvoiceResultCheck')">审核</el-button>
          <el-button size="small"  style="margin-left: 10px;" type="error"  @click="Modify(1, 'OutputInvoice', true)" :disabled="!$haspermission('outputInvoiceResultReject')">驳回</el-button>
        </template>
        <template v-else>
          <el-tag >暂无操作</el-tag>
        </template>

      </template>
      <template v-else>
        <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
      </template>

    </sticky>
    <el-form  class="form-container" :model="planform" ref="postForm" label-position="left" label-width="86px">
      <div class="createPost-main-container">
        <item-title text="基本信息"/>
        <el-card v-loading="loading"  element-loading-text="加载中..." shadow="never" body-style="padding:12px" >
        <el-row>
          <el-col>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="开票单号:" class="postInfo-container-item">
                    {{planform.OutputInvoice.ticketno}}
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label="客户:" class="postInfo-container-item">
                    {{planform.OutputInvoice.customername}}
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label-width="110px" label="最迟开票日期:" class="postInfo-container-item">
                    {{planform.OutputInvoice.lastinvoicedate}}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label-width="110px" label="实际开票金额:" class="postInfo-container-item">
                    ￥{{planform.OutputInvoice.invoiceamount}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="单据状态:" class="postInfo-container-item">
                    {{planform.OutputInvoice.status|statusFilter}}
                  </el-form-item>
                </el-col>

                <el-col :span="6" >
                  <el-form-item label="申请人:" class="postInfo-container-item">
                    {{planform.OutputInvoice.createuser}}
                  </el-form-item>
                </el-col>
                <el-col :span="6" >
                  <el-form-item label="发票号:" class="postInfo-container-item">
                    {{planform.OutputInvoice.invoiceno}}
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-show="planform.OutputInvoice.checkuser">
                  <el-form-item label="审核人:" class="postInfo-container-item">
                    {{planform.OutputInvoice.checkuser}}
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row>
                <el-col :span="6" v-show="planform.OutputInvoice.checkdate">
                  <el-form-item label="审核日期:" class="postInfo-container-item">
                    {{planform.OutputInvoice.checkdate}}
                  </el-form-item>
                </el-col>
              </el-row>

            </div>
          </el-col>
        </el-row>
        </el-card>
       <item-title text="销项开票明细" style="margin-top:10px"/>

        <el-form-item style="margin-bottom: 40px;" label-width="0">
          <el-table
            :data="planform.OutputInvoiceItems"
            ref="OutputInvoiceTable"
            style="width: 100%"
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
              label="税率"
              width="60">
              <template slot-scope="scope">
                <span >{{ scope.row.taxrate }}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="110"
              label="大类">
              <template slot-scope="scope">
                <span >{{ scope.row.bigcategoryname }}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="110"
              label="开票数量">
              <template slot-scope="scope">
                <span >{{ scope.row.invoicenum }}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="110"
              label="税额">
              <template slot-scope="scope">
                <span >{{ scope.row.taxamount }}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="110"
              label="税前金额">
              <template slot-scope="scope">
                <span >{{ scope.row.pretaxamount }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="开票金额"
              width="175">
              <template slot-scope="scope">
                <span>{{ scope.row.invoiceamount }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </div>
    </el-form>

  </div>
</template>

<script>
import { getOutItemDetail, getOutMainDetail } from '@/api/invoice'
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
      loading: false
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
    needfresh() {
      this.getOutputInvoiceDetail()
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
      await getOutMainDetail({
        ticketno: this.$route.params.ticketno
      }).then(res => {
        console.log(res)
        this.planform.OutputInvoice = res.data.data[0]
      }).catch(err => {
        console.log(err)
        this.fetchSuccess = false
      })
      await getOutItemDetail({
        ticketno: this.$route.params.ticketno
      }).then(res => {
        console.log(res)
        this.planform.OutputInvoiceItems = res.data
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
