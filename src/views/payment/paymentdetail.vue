<template lang="html">
  <div class="app-container">
    <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">
      <template v-if="fetchSuccess">

        <template v-if="planform.payment.status == -1 || planform.payment.status == -2">
          <el-button  style="margin-left: 10px;" type="warning"
            @click="Modify(3, 'payment')" :disabled="!$haspermission('paymentDelete')">删除</el-button>
          <el-button  style="margin-left: 10px;" type="primary"  @click="Edit" :disabled="!$haspermission('paymentEdit')">修改</el-button>
        </template>
        <template v-else-if="planform.payment.status == 0">
          <div>
            <el-button  style="margin-left: 10px;" type="primary"
              @click="Modify(0, 'payment', true)" :disabled="!$haspermission('paymentCheck')">审核</el-button>
            <el-button  style="margin-left: 10px;" type="error"  @click="Modify(1, 'payment', true)" :disabled="!$haspermission('paymentReject')">驳回</el-button>
          </div>
        </template>
        <template v-else>
          <el-tag >暂无操作</el-tag>
        </template>

      </template>
      <template v-else>
        <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
      </template>

    </sticky>
    <el-form :model="planform" ref="ruleForm" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="付款单号" prop="payment.ticketno">
            <el-input type="text" v-model="planform.payment.ticketno" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="付款方" prop="payment.payername">
            <el-input type="text" v-model="planform.payment.payername" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收款方" prop="payment.receivablesname">
            <el-input type="text" :value="planform.payment.receivablesname" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="款项性质" prop="payment.fundnature">
            <el-input type="text" :value="planform.payment.fundnature|fundnatureFilter" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="planform.payment.fundtype">
          <el-form-item label="款项类型" >
            <el-input type="text" :value="planform.payment.fundtype|fundtypeFilter" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="本次实付金额" prop="payment.payamount">
            <el-input type="text" v-model="planform.payment.payamount" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="现金折扣" prop="payment.interestrate">
            <el-input type="text" v-model="planform.payment.interestrate" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结算金额" >
            <el-input type="text" v-model="planform.payment.settlementamount" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结算方式" prop="payment.settlementmethod">
            <el-input type="text" :value="planform.payment.settlementmethod|settlementmethodFilter"
                      disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="备注" prop="payment.memos">
              <el-input type="text" v-model="planform.payment.memos" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款日期" prop="payment.paydate">
              <el-input type="text"  :value="planform.payment.paydate" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联采购单号" prop="payment.purchorder">
              <el-input type="text"  :value="planform.payment.purchorder" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="制单人" prop="payment.createuser">
              <el-input type="text" v-model="planform.payment.createuser" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="制单日期" prop="payment.createdate">
              <el-input type="text" :value="planform.payment.createdate" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="附件" >
              <template v-for="(enclosure, index) in enclosures" v-if="enclosures.length">
                <a :href="`/planapi/api/download/file?pathUrl=${enclosure.url}&pathName=${enclosure.name}`" target="_blank" style="padding-right:4px;color:#128fe7;">{{enclosure.name}}</a><br/>
              </template>
              <span v-else>暂无附件</span>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="审核人" prop="payment.checkuser">
              <el-input type="text" v-model="planform.payment.checkuser" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核日期" prop="payment.checkdate">
              <el-input type="text" :value="planform.payment.checkdate" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核结果" prop="payment.status">
              <el-input type="text" :value="planform.payment.status|statusFilter" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务板块" >
              <el-input type="text" :value="planform.payment.businesstype|businesstypeFilter" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
    </el-form>
  </div>
</template>

<script>
  import { getPaymentDetail } from '@/api/payment'
  import { mapGetters } from 'vuex'
  import { parseTime, downloadFile, PayFundnature, SettlementMethod } from '@/utils'
  import Sticky from '@/components/Sticky' // 粘性header组件
  import Modify from '@/utils/modify'
  export default {
    components: {
      Sticky
    },
    data() {
      return {
        planform: {
          payment: {
            createuser: '', // 创建人
            enclosure: '', // 金额
            enterprise: '', // 企业
            enterprisename: '', // 企业名称
            fundnature: '', // 款项性质 1货款 2服务费
            memos: '', // 备注
            payamount: '', // 付款金额
            paydate: '', // 付款日期
            payer: '', // 付款企业
            payername: '', // 付款人姓名
            purchorder: '', // 采购单
            receivables: '', // 收款方
            receivablesname: '', // 收款方名称
            settlementmethod: '', // 结算方式 1现金 2银行转账 3银行承兑 4商业承兑
            status: '', // 状态
            checkdate: '',
            checkuser: '',
            createdate: ''
          }
        },
        list: [],
        pagesize: 10,
        pageindex: 1,
        total: 0,
        currentPage: 1,
        fundnature: PayFundnature,
        settlementmethod: SettlementMethod,
        fetchSuccess: true
      }
    },
    computed: {
      enclosures() {
        if (this.planform.payment.enclosure) {
          if (this.planform.payment.enclosure.includes('[')) {
            return JSON.parse(this.planform.payment.enclosure)
          } else {
            const se = this.planform.payment.enclosure.split(',')
            const enclosures = []
            se.forEach((enc, index) => {
              enclosures.push({
                name: '附件' + (index + 1),
                url: downloadFile(enc)
              })
            })
            return enclosures
          }
        }
      },
      getEntName() {
        let tname = ''
        if (this.gridData.length) {
          this.gridData.map(d => {
            if (d.requestid === this.planform.payment.enterprise) {
              tname = d.name
            }
          })
        }
        return tname
      },
      getCusname() {
        let tname = ''
        if (this.gridData.length) {
          this.gridData.map(d => {
            if (d.requestid === this.planform.payment.receivables) {
              tname = d.name
            }
          })
        }
        return tname
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
    filters: {
      parseTime
    },
    watch: {
      '$route': 'getDetail'
    },
    created() {
      if (!this.gridData.length) {
        this.$store.dispatch('GetGysList')
      }
      this.getDetail()
    },
    methods: {
      Modify,
      downloadFile,
      getDetail() {
        getPaymentDetail({
          pagesize: this.pagesize,
          pageindex: this.pageindex,
          ticketno: this.$route.params.ticketno
        }).then(res => {
          this.list = res.data.data
          this.total = res.data.total
          this.currentPage = res.data.currentPage
          this.planform.payment = this.list[0]
          console.log(res,'getPaymentDetail')
        }).catch(err => {
          this.fetchSuccess = false
          console.log(err)
        })
      },
      needfresh() {
        this.getDetail()
      },
      Edit() {
        this.$router.push({
          name: 'newpaymentsDelivery',
          query: {
            id: this.$route.params.ticketno
          }
        })
      }
    }
  }
</script>

<style scoped>
  .line {
    text-align: center;
  }

  .dlink {
    color: #409EFF;
  }

  h3 {
    font-size: 14px;
    font-weight: normal;
  }
</style>
